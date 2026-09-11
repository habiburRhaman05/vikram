import { useEffect, useRef } from "react";

/**
 * Port of main.js's "1. Sticky header" behaviour: expose the header's real
 * rendered height as --header-h (the mobile dropdown positions itself
 * below the header using that variable) and toggle `.is-stuck` once the
 * page has scrolled past 8px, for the border/shadow transition in
 * styles.css.
 */
export default function useStickyHeader() {
  const ref = useRef(null);

  useEffect(() => {
    const header = ref.current;
    if (!header) return;

    const setHeaderH = () => {
      document.documentElement.style.setProperty("--header-h", `${header.offsetHeight}px`);
    };
    const onScroll = () => {
      header.classList.toggle("is-stuck", window.scrollY > 8);
    };

    setHeaderH();
    onScroll();
    window.addEventListener("resize", setHeaderH);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", setHeaderH);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return ref;
}
