import Icon from "@/components/common/Icon.jsx";
import { Btn, BtnRow, IconBadge } from "../primitives.jsx";
import { HERO } from "@/data/homeV2";

/**
 * Hero: copy on the left, a "constellation" of capability cards orbiting
 * a central cloud mark on the right.
 *
 * The constellation is absolutely positioned by percentage inside an
 * aspect-ratio box (the same technique the existing CallFlowDiagram uses
 * for its node anchors), so it scales with the column instead of needing
 * a breakpoint per card.
 *
 * Below 900px it is NOT just stacked - eight floating cards in a column
 * is a wall of noise on a phone. The layout swaps to a compact grid of
 * the three `emphasis` cards plus the growth stat, which keeps the idea
 * ("these capabilities connect into one system") without the clutter.
 */
export default function Hero() {
  return (
    <section className="hv-hero hv-wash">
      <div className="hv-container hv-hero__inner">
        <div className="hv-hero__copy">
          <span className="hv-eyebrow">{HERO.eyebrow}</span>

          <h1 className="hv-display hv-hero__title">
            {HERO.titleLead} <span className="hv-script">{HERO.titleScript}</span> {HERO.titleTail}
          </h1>

          <p className="hv-lede">{HERO.lede}</p>

          <BtnRow className="hv-hero__actions">
            <Btn to={HERO.primary.to} variant="primary" size="lg" iconAfter={HERO.primary.icon}>
              {HERO.primary.label}
            </Btn>
            <Btn to={HERO.secondary.to} variant="outline" size="lg">
              {HERO.secondary.label}
            </Btn>
          </BtnRow>

          <ul className="hv-hero__proof">
            {HERO.proofPoints.map((p) => (
              <li key={p.label}>
                <IconBadge icon={p.icon} size="sm" />
                <span>{p.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="hv-hero__visual">
          {/* Decorative as a whole: every capability named here is also
              stated in the Services sections below, so nothing is lost
              to a screen reader by hiding the diagram. */}
          {/* <div className="hv-constellation" role="img" aria-label="GHLevelUp connects CRM, AI automation, web development, social media, creative design and video into one system.">
            <svg className="hv-constellation__wires" viewBox="0 0 100 95" aria-hidden="true" preserveAspectRatio="none">
              {[
                "M18,18 L46,44", "M50,10 L48,40", "M82,17 L54,42",
                "M10,46 L42,46", "M86,46 L56,48",
                "M24,76 L44,52", "M58,82 L52,54",
              ].map((d, i) => (
                <path key={i} d={d} stroke="currentColor" strokeWidth=".4" fill="none" />
              ))}
            </svg>

            <div className="hv-constellation__core" aria-hidden="true">
              <Icon name="cloud" strokeWidth={1.6} />
            </div>

            {HERO.cards.map((card, i) => (
              <div
                key={card.title}
                className={`hv-cnode hv-cnode--${i + 1}${card.emphasis ? " is-emphasis" : ""}`}
              >
                <IconBadge icon={card.icon} size="sm" />
                <span className="hv-cnode__text">
                  <strong>{card.title}</strong>
                  <em>{card.sub}</em>
                </span>
              </div>
            ))}

            <div className="hv-cstat">
              <span className="hv-cstat__value">{HERO.stat.value}</span>
              <span className="hv-cstat__label">{HERO.stat.label}</span>
              <svg className="hv-cstat__spark" viewBox="0 0 80 26" aria-hidden="true" fill="none">
                <path
                  d="M2 22 L16 16 L28 19 L42 10 L56 12 L78 3"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
