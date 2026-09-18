import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal.jsx";

/**
 * `.faq` accordion. Port of main.js's "4. FAQ accordion": one panel open
 * at a time, height animated via an explicit max-height (styles.css
 * transitions max-height, not the newer `height: auto` interpolation,
 * which browser support was the reason for that approach originally) -
 * kept as inline max-height here too rather than switching techniques,
 * to match the exact open/close motion. Re-measures the open panel on
 * window resize so reflowed text doesn't get clipped, same as the
 * original's resize listener.
 */
export default function Faq({ items }) {
  const [openIndex, setOpenIndex] = useState(null);
  const panelRefs = useRef([]);

  useEffect(() => {
    const onResize = () => {
      if (openIndex === null) return;
      const panel = panelRefs.current[openIndex];
      if (panel) panel.style.maxHeight = `${panel.scrollHeight}px`;
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [openIndex]);

  return (
    <Reveal className="faq">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const qId = `faq-btn-${i + 1}`;
        const aId = `faq-${i + 1}`;
        return (
          <div className="faq__item" key={i}>
            <button
              className="faq__q"
              aria-expanded={isOpen}
              aria-controls={aId}
              id={qId}
              onClick={() => setOpenIndex(isOpen ? null : i)}
            >
              {item.question}
              <span className="faq__sign" aria-hidden="true" />
            </button>
            <div
              className="faq__a"
              id={aId}
              role="region"
              aria-labelledby={qId}
              ref={(el) => (panelRefs.current[i] = el)}
              style={{ maxHeight: isOpen ? panelRefs.current[i]?.scrollHeight : null }}
            >
              <div>
                <p>{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </Reveal>
  );
}
