import { useEffect, useState } from "react";
import Icon from "./Icon.jsx";

/**
 * Floating "back to top" pill - bottom-left, so it never collides with
 * the GHL chat widget's bubble (bottom-right on every page). Appears once
 * the page has scrolled past one viewport height, styled like an outline
 * button: teal border + teal text/arrow at rest, filling solid teal
 * (text/arrow turning white) on hover - same treatment as .btn--outline.
 *
 * It also stands down once the footer is on screen. Bottom-left is exactly
 * where both footers put their copyright line, so at the bottom of a page
 * the pill used to cover it - and at that point the button has nothing left
 * to do, because the visitor is already looking at the end of the page.
 */
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [atFooter, setAtFooter] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    /* Both Layout variants end in a <footer>, so the element is found the
       same way whichever one the page is using - and ScrollToTop renders
       after it, so it is already in the DOM by the time this runs. */
    const footer = document.querySelector("footer");
    if (!footer || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setAtFooter(entry.isIntersecting));
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const shown = visible && !atFooter;

  return (
    <button
      type="button"
      className={`scroll-top-btn${shown ? " is-visible" : ""}`}
      aria-hidden={!shown}
      tabIndex={shown ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <Icon name="arrowUp" strokeWidth={2.5} />
      <span className="scroll-top-btn__label">Scroll to top</span>
    </button>
  );
}
