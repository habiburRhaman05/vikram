import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

/**
 * Port of main.js's "2. Mobile navigation" behaviour: open/closed state
 * for the `.nav__links` dropdown, closing on Escape or once the viewport
 * crosses back over the desktop breakpoint. The original also closed on
 * "click a link inside the panel"; here that's just closing on route
 * change, since a Link click always causes one.
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
    const onResize = () => {
      if (window.innerWidth > 900) setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const toggle = useCallback(() => setOpen((v) => !v), []);

  return { open, toggle };
}
