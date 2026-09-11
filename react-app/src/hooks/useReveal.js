import { useEffect, useRef } from "react";

/**
 * Port of main.js's "5. Reveal on scroll" behaviour: the first time an
 * element crosses into view it gets `.is-in` added (styles.css transitions
 * .reveal -> .reveal.is-in), then stops being observed - a one-shot
 * reveal, not a repeating scroll animation. `index` reproduces the
 * original's stagger (`(i % 4) * 70ms`) for elements revealing together in
 * a grid.
 */
export default function useReveal(index = 0) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.transitionDelay = `${(index % 4) * 70}ms`;

    if (!("IntersectionObserver" in window)) {
      el.classList.add("is-in");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return ref;
}
