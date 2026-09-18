import { useEffect, useRef, useState } from "react";

/**
 * Port of main.js's "5. Reveal on scroll" behaviour: the first time an
 * element crosses into view it reveals, then stops being observed - a
 * one-shot reveal, not a repeating scroll animation. `index` reproduces
 * the original's stagger (`(i % 4) * 70ms`) for elements revealing
 * together in a grid.
 *
 * Returns `{ ref, shown }`. `shown` is React state rather than an
 * imperatively added `.is-in` class on purpose:
 *
 *   A caller whose className CHANGES after mount - the Why Choose Us
 *   accordion item, which appends " is-open" when its row is selected -
 *   used to have its `is-in` class wiped the moment React wrote the new
 *   class attribute, because React knows nothing about a class something
 *   else added. The element then fell back to opacity:0 and disappeared:
 *   selecting a bottom row hid that row AND the row that had been open.
 *   Owning the flag in state means the wrapper always renders the class
 *   it should have, no matter how often it re-renders.
 */
export default function useReveal(index = 0) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.transitionDelay = `${(index % 4) * 70}ms`;

    if (!("IntersectionObserver" in window)) {
      setShown(true);
      return;
    }

    const inViewport = () => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0;
    };

    /* An element that is ALREADY on screen, or already scrolled above the
       viewport, the moment this mounts - a page that loads mid-scroll, a
       browser restoring scroll position, a fast wheel flick that jumps
       clean past a short element between observer ticks - never fires
       "isIntersecting: true" here: it went straight from "not yet
       visible" to "already visible/passed" without an observable
       crossing. A one-shot reveal has nothing left to wait for, so it
       stays invisible forever. Checked once, synchronously, on mount. */
    const rect = el.getBoundingClientRect();
    if (rect.bottom <= 0 || inViewport()) {
      setShown(true);
      return;
    }

    let settled = false;
    const reveal = () => {
      if (settled) return;
      settled = true;
      setShown(true);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      clearTimeout(fallbackId);
      if (raf) cancelAnimationFrame(raf);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) reveal();
        });
      },
      {
        threshold: 0,
        /* The top margin is the second half of the same fix: it counts
           "anywhere above the viewport" as intersecting, so an element the
           scroll jumped clean over (End key, scrollbar drag, flick) still
           gets an intersection change and reveals, rather than sitting at
           opacity:0. It is deliberately far larger than any viewport - a
           percentage would only cover a flick of that same height. The
           bottom margin still holds the reveal back until the element is a
           little way into view. */
        rootMargin: "100000px 0px -40px 0px",
      }
    );
    observer.observe(el);

    /* Safety net: IntersectionObserver can occasionally never deliver a
       callback at all - a backgrounded/throttled tab, an embedded preview
       pane that reports a zero-size viewport on first paint, or any other
       host quirk outside this hook's control. Because the reveal is
       one-shot, a single missed callback used to mean the element stayed
       invisible forever with nothing left to retry it - large stretches
       of a page silently blank while everything outside React (the chat
       widget, etc.) rendered fine. A passive scroll/resize listener plus
       a bounded timeout re-check geometry directly as a backstop; both
       are no-ops once `settled` is true, so they cost nothing once the
       observer has already done its job. */
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        if (inViewport()) reveal();
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const fallbackId = setTimeout(() => {
      if (inViewport()) reveal();
    }, 1200);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      clearTimeout(fallbackId);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [index]);

  return { ref, shown };
}
