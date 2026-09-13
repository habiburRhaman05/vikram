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

    /* An element that is ALREADY scrolled above the viewport the moment
       this mounts - a page that loads mid-scroll, a browser restoring
       scroll position, a fast wheel flick that jumps clean past a short
       element between observer ticks - never fires "isIntersecting: true"
       here: it went from "not yet visible" straight to "already passed"
       without an observable crossing. A one-shot reveal has nothing left
       to wait for, so it stays invisible forever. Checked once,
       synchronously, on mount. */
    const rect = el.getBoundingClientRect();
    if (rect.bottom <= 0) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setShown(true);
          observer.unobserve(entry.target);
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
    return () => observer.disconnect();
  }, [index]);

  return { ref, shown };
}
