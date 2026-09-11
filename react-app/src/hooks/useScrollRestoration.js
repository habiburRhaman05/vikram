import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * The original site was plain multi-page HTML, where every navigation is
 * a full page load that starts at the top (or jumps straight to a
 * fragment, e.g. index.html#plans from the nav's "Plans" link). A client-
 * routed SPA doesn't do either automatically - this restores both: scroll
 * to top on a normal navigation, or to the #id element when the URL
 * carries a hash (smooth-scroll already applies site-wide via html {
 * scroll-behavior: smooth } in styles.css).
 */
export default function useScrollRestoration() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
}
