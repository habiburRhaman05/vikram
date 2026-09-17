import { useEffect, useRef } from "react";

/**
 * The hairline that tracks how far through an article the reader is.
 *
 * MEASURED AGAINST THE ARTICLE, NOT THE PAGE. A bar driven by document
 * scroll would read 60% when the article ended and then crawl to 100% while
 * the reader moved through the matched services, the related posts and the
 * enquiry form - all of which are after the article, not part of it. So the
 * element passed in as `target` is what sets both ends: the bar is empty when
 * the article's first line reaches the top of the viewport and full when its
 * last line does. Scrolling past it leaves it full, which is the honest
 * reading of "you have finished the article".
 *
 * WRITTEN STRAIGHT TO THE DOM. This runs on every frame of a scroll. Lifting
 * it into state would re-render the article - a few hundred elements - sixty
 * times a second to move a 3px line. The listener is passive and coalesced
 * through requestAnimationFrame, so at most one style write happens per
 * painted frame.
 *
 * Decorative, so aria-hidden: the reading position is not information a
 * screen reader user needs, and the contents list already says where they
 * are. Nothing here is focusable and it never intercepts a click.
 */
export default function ReadingProgress({ target }) {
  const fill = useRef(null);

  useEffect(() => {
    const article = target?.current;
    const bar = fill.current;
    if (!article || !bar) return;

    let frame = null;

    const measure = () => {
      frame = null;

      const { top, height } = article.getBoundingClientRect();
      /* Scroll position of the article's first and last line. */
      const start = window.scrollY + top;
      const distance = height - window.innerHeight;

      /* An article shorter than the viewport has no scroll of its own, so
         there is no progress to report and the bar stays empty until the
         reader moves past it. Guarding here rather than dividing by zero. */
      const progress = distance <= 0 ? 0 : (window.scrollY - start) / distance;

      bar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
    };

    const onScroll = () => {
      if (frame !== null) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [target]);

  return (
    <div className="bl-progress" aria-hidden="true">
      <div className="bl-progress__fill" ref={fill} />
    </div>
  );
}
