import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

/**
 * Open/closed state for the services mega menu.
 *
 * Hover is the primary interaction, but hover alone is not enough to ship:
 *
 *  - Opening is delayed (OPEN_DELAY) so that sweeping the cursor across the
 *    nav on the way somewhere else does not flash the panel open.
 *  - Closing is delayed more (CLOSE_DELAY) because the cursor has to cross
 *    a gap between the trigger and the panel below it. Closing on the first
 *    mouseleave makes the panel impossible to reach.
 *  - Hover is only wired up for fine pointers. On a touch screen there is
 *    no hover, and a device that emulates it fires the "hover" on the same
 *    tap that would follow the link - so touch gets tap-to-toggle instead.
 *  - Escape closes and hands focus back to the trigger, and focus leaving
 *    the whole wrapper closes it, so a keyboard user is never left with an
 *    open panel they have tabbed out of.
 */

const OPEN_DELAY = 90;
const CLOSE_DELAY = 220;

export default function useMegaMenu() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const triggerRef = useRef(null);
  const timer = useRef(null);
  const location = useLocation();

  const clear = () => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  };

  const openNow = useCallback(() => {
    clear();
    setOpen(true);
  }, []);

  const closeNow = useCallback(() => {
    clear();
    setOpen(false);
  }, []);

  /* Pointer intent. `matches` is read at call time rather than captured in
     state: a hybrid laptop can switch between a trackpad and a touchscreen
     without the component ever re-rendering. */
  const finePointer = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const onPointerEnter = useCallback(() => {
    if (!finePointer()) return;
    clear();
    timer.current = setTimeout(() => setOpen(true), OPEN_DELAY);
  }, []);

  const onPointerLeave = useCallback(() => {
    if (!finePointer()) return;
    clear();
    timer.current = setTimeout(() => setOpen(false), CLOSE_DELAY);
  }, []);

  const toggle = useCallback(() => {
    clear();
    setOpen((v) => !v);
  }, []);

  /* Any navigation closes it - including a click on a link inside the panel,
     which is the most common way it gets dismissed. */
  useEffect(() => {
    closeNow();
  }, [location.pathname, location.hash, closeNow]);

  useEffect(() => () => clear(), []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key !== "Escape") return;
      closeNow();
      triggerRef.current?.focus();
    };
    /* Focus can leave for somewhere that is not a descendant (Tab off the
       last link, or a click elsewhere). relatedTarget is null when focus
       leaves the document entirely, which should not close it. */
    const onFocusOut = (e) => {
      const next = e.relatedTarget;
      if (next && !wrapRef.current?.contains(next)) closeNow();
    };
    const onPointerDown = (e) => {
      if (!wrapRef.current?.contains(e.target)) closeNow();
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    wrapRef.current?.addEventListener("focusout", onFocusOut);
    const wrap = wrapRef.current;
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      wrap?.removeEventListener("focusout", onFocusOut);
    };
  }, [open, closeNow]);

  return {
    open,
    wrapRef,
    triggerRef,
    toggle,
    close: closeNow,
    openNow,
    onPointerEnter,
    onPointerLeave,
  };
}
