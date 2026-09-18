import { useState } from "react";
import { Link } from "react-router-dom";
import { HvSection, Reveal } from "../primitives.jsx";
import StructuredData from "@/components/common/StructuredData.jsx";
import { FAQ } from "@/data/homeV2";

/**
 * Two-column FAQ accordion.
 *
 * The columns are two separate stacks, not one grid flowing across two
 * tracks. That matters: in a single grid, the items sit in shared rows,
 * so opening a question on the left stretches its row and drags the
 * right-hand item's box with it. Splitting the list in half and giving
 * each half its own column container makes the two sides completely
 * independent - opening anything on the left has no effect on the right.
 *
 * Built on <details>/<summary> so the browser supplies the semantics,
 * keyboard operation and find-in-page expansion. React only tracks which
 * one is open, so opening one closes the previous.
 */
export default function Faq() {
  const [openKey, setOpenKey] = useState(null);

  const half = Math.ceil(FAQ.items.length / 2);
  const columns = [FAQ.items.slice(0, half), FAQ.items.slice(half)];

  return (
    <HvSection id="faq">
      <StructuredData faq={FAQ.items} />

      <Reveal className="hv-section-head hv-section-head--center">
        <span className="hv-eyebrow">{FAQ.eyebrow}</span>
        <h2 className="hv-h2">{FAQ.title}</h2>
        <p className="hv-lede">{FAQ.lede}</p>
        <p className="hv-faq__aside">
          <span className="hv-body">Still have questions?</span>
          <Link to={FAQ.contact.to} className="hv-btn hv-btn--outline">
            {FAQ.contact.label}
          </Link>
        </p>
      </Reveal>

      <div className="hv-faq">
        {columns.map((col, colIndex) => (
          <div className="hv-faq__col" key={colIndex}>
            {col.map((item, i) => {
              const key = `${colIndex}-${i}`;
              return (
                <Reveal as="div" key={item.question} index={i}>
                  <details
                    className="hv-faq__item"
                    open={openKey === key}
                    onToggle={(e) => {
                      if (e.currentTarget.open) setOpenKey(key);
                      else if (openKey === key) setOpenKey(null);
                    }}
                  >
                    <summary className="hv-faq__q">
                      <span>{item.question}</span>
                      <span className="hv-faq__sign" aria-hidden="true" />
                    </summary>
                    <div className="hv-faq__a">
                      <p className="hv-body">{item.answer}</p>
                    </div>
                  </details>
                </Reveal>
              );
            })}
          </div>
        ))}
      </div>
    </HvSection>
  );
}
