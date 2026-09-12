import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { maxWidth } from "@/lib/breakpoints";

/**
 * Open/closed state for the `.nav__links` dropdown panel.
 *
 * Closes on Escape, on route change (a Link click always causes one), and
 * once the viewport grows past the hamburger cutover. That last one reads
 * the breakpoint from src/lib/breakpoints.js rather than hard-coding it:
 * this hook used to close at 900px while the CSS switched to the dropdown
 * at 1150px, so dragging a window wider between those two widths left the
 * panel open over a desktop nav that had already come back.
 *
 * Uses matchMedia rather than a resize listener - it only fires on the
 * actual crossing instead of on every resize frame.
 */
export default function useMobileNav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    const mql = window.matchMedia(maxWidth("nav"));
    const onChange = (e) => {
      // e.matches === true means we're still narrow enough for the panel.
      if (!e.matches) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    mql.addEventListener("change", onChange);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      mql.removeEventListener("change", onChange);
    };
  }, [open]);

  const toggle = useCallback(() => setOpen((v) => !v), []);

  return { open, toggle };
}
