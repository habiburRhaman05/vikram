import { useEffect, useState } from "react";

/**
 * Subscribe to a media query.
 *
 * matchMedia rather than a resize listener: it fires only on the actual
 * crossing rather than on every resize frame, which is the same reason
 * useMobileNav uses it.
 *
 * The initial value is read synchronously in the useState initialiser, not
 * in an effect, so a component that renders a different tree per breakpoint
 * gets the right one on first paint instead of mounting the wrong one and
 * swapping it.
 */
export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e) => setMatches(e.matches);
    setMatches(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}
