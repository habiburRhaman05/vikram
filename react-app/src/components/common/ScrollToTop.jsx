import { useEffect, useState } from "react";
import Icon from "./Icon.jsx";

/**
 * Floating "back to top" pill - bottom-left, so it never collides with
 * the GHL chat widget's bubble (bottom-right on every page). Appears once
 * the page has scrolled past one viewport height, styled like an outline
 * button: teal border + teal text/arrow at rest, filling solid teal
 * (text/arrow turning white) on hover - same treatment as .btn--outline.
 */
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      className={`scroll-top-btn${visible ? " is-visible" : ""}`}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <Icon name="arrowUp" strokeWidth={2.5} />
      Scroll to top
    </button>
  );
}
