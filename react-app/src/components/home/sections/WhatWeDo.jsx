import { Link } from "react-router-dom";
import Icon from "@/components/common/Icon.jsx";
import ServiceMockup from "../ServiceMockups.jsx";
import { HvSection, SectionHead, Reveal } from "../primitives.jsx";
import { WHAT_WE_DO } from "@/data/homeV2";

/**
 * "What We Do" - six service cards, copy on top, a device mockup rising
 * out of the bottom edge.
 *
 * HOVER
 * The card lifts, the device rises into it, a soft spotlight follows the
 * pointer, and a frosted action bar slides up over the mockup with
 * "Explore" and "Book a demo". The spotlight position is written straight
 * to CSS custom properties on pointermove - no React state, so moving the
 * mouse never re-renders the grid.
 *
 * NOT HOVER-ONLY
 * The two actions are real links, so the bar also opens on :focus-within
 * (a keyboard user tabbing in sees exactly what a mouse user sees), and on
 * devices without hover it is simply always shown - a phone user would
 * otherwise have no way to reach either button.
 *
 * The card itself is deliberately NOT a link: it contains two different
 * destinations, and nesting links is invalid and ambiguous for assistive
 * tech. Each action's accessible name carries the service ("Explore
 * Software Development") via visually hidden text, so six "Explore" links
 * are distinguishable in a links list.
 *
 * Reveal wraps the <li>, and the hover transform lives on the inner card.
 * Both animate `transform`; on one element the reveal's settled
 * `transform: none` would fight the hover lift.
 */
export default function WhatWeDo() {
  const onPointerMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <HvSection id="what-we-do" className="hv-wwd">
      <SectionHead eyebrow={WHAT_WE_DO.eyebrow} title={WHAT_WE_DO.title} center>
        {WHAT_WE_DO.lede}
      </SectionHead>

      <ul className="hv-wwd__grid">
        {WHAT_WE_DO.items.map((item, i) => (
          <Reveal as="li" key={item.id} index={i} className="hv-wwd__cell">
            <article className="hv-wwd__card" onPointerMove={onPointerMove}>
              <div className="hv-wwd__copy">
                <h3 className="hv-wwd__title">{item.title}</h3>
                <p className="hv-wwd__body">{item.body}</p>
              </div>

              <div className="hv-wwd__art" aria-hidden="true">
                <ServiceMockup kind={item.mock} />
              </div>

              <div className="hv-wwd__actions">
                <Link to={item.to} className="hv-wwd__btn hv-wwd__btn--ghost">
                  {WHAT_WE_DO.exploreLabel}
                  <span className="hv-sr-only"> {item.title}</span>
                  <Icon name="arrowRight" aria-hidden="true" />
                </Link>
                <Link to={WHAT_WE_DO.demoTo} className="hv-wwd__btn hv-wwd__btn--solid">
                  <Icon name="calendar" aria-hidden="true" />
                  {WHAT_WE_DO.demoLabel}
                  <span className="hv-sr-only"> for {item.title}</span>
                </Link>
              </div>
            </article>
          </Reveal>
        ))}
      </ul>
    </HvSection>
  );
}
