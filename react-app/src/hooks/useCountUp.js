import { useEffect, useRef, useState } from "react";

/**
 * Counts from 0 up to `end` the first time the element the returned ref is
 * attached to scrolls into view, then stops for good.
 *
 * Returns `{ ref, value }` - put `ref` on the element that should be
 * watched and render `value`.
 *
 * Why an IntersectionObserver rather than a scroll handler: the count is a
 * one-shot, so it only needs to know the moment the element arrives. The
 * observer fires on entry (threshold 0) without the element having to be
 * fully on screen, which is what makes a tall stats block start counting
 * as its top edge appears rather than once it is entirely visible.
 *
 * The easing is cubic ease-OUT: the number moves fast off the mark and
 * settles onto the final figure. A linear count reads like a progress bar;
 * this reads like a figure landing.
 *
 * prefers-reduced-motion skips the count entirely and prints the final
 * value, since for some people the movement is the problem, not the
 * duration.
 */
export default function useCountUp(end, { duration = 1500 } = {}) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const raf = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setValue(end);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);

          const started = performance.now();
          const tick = (now) => {
            const progress = Math.min(1, (now - started) / duration);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(end * eased));
            if (progress < 1) raf.current = requestAnimationFrame(tick);
          };
          raf.current = requestAnimationFrame(tick);
        });
      },
      { threshold: 0, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf.current);
    };
  }, [end, duration]);

  return { ref, value };
}
