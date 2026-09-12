import { Link } from "react-router-dom";
import Icon from "@/components/common/Icon.jsx";
import ImageSlot from "../ImageSlot.jsx";
import ScriptNote from "../ScriptNote.jsx";
import { HvSection, Reveal, Btn, Checks, IconBadge } from "../primitives.jsx";
import { STACK } from "@/data/homeV2";

/**
 * "The Digital Growth Stack" - four service cards, alternating dark and
 * light exactly as the reference does.
 *
 * The grid is auto-fit/minmax rather than a hard four columns: at four
 * across on a 1280px laptop the body copy in these cards drops to about
 * 13px, which is below comfortable reading size. This way they reflow to
 * two-up before that happens, with no breakpoint to maintain.
 */
export default function GrowthStack() {
  return (
    <HvSection id="services">
      <div className="hv-stack__head">
        <Reveal className="hv-stack__intro">
          <span className="hv-eyebrow">{STACK.eyebrow}</span>
          <h2 className="hv-h2">{STACK.title}</h2>
          <p className="hv-lede">{STACK.lede}</p>
          <Btn to={STACK.cta.to} variant="primary" iconAfter={STACK.cta.icon} className="hv-stack__cta">
            {STACK.cta.label}
          </Btn>
        </Reveal>

        <ScriptNote direction="down-left" className="hv-stack__note">
          {STACK.note}
        </ScriptNote>
      </div>

      <div className="hv-grid hv-grid--auto-4 hv-stack__grid">
        {STACK.cards.map((card, i) => (
          <Reveal
            key={card.title}
            index={i}
            className={`hv-card hv-card--hover hv-stack-card${card.dark ? " hv-card--dark" : ""}`}
            as="article"
          >
            <ImageSlot
              src={card.image}
              webp={card.imageWebp}
              alt=""
              ratio="16/10"
              label={card.imageLabel}
              className="hv-stack-card__media"
            />

            <div className="hv-stack-card__body">
              <IconBadge icon={card.icon} size="sm" className="hv-stack-card__icon" />
              <h3 className="hv-h3">{card.title}</h3>
              <p className="hv-body">{card.body}</p>
              <Checks items={card.checks} className="hv-stack-card__checks" />
            </div>

            {/* One link, two visual parts - a separate icon button here
                would be a second tab stop to the same destination.
                The subject is appended as visually-hidden text rather
                than an aria-label: four links all named "Learn More"
                tell a screen-reader user (and a crawler) nothing, but an
                aria-label would REPLACE the visible words, breaking
                voice control for anyone who says "click Learn More". */}
            <Link to={card.to} className="hv-stack-card__link">
              <span>
                Learn More<span className="hv-sr-only"> about {card.title}</span>
              </span>
              <span className="hv-stack-card__arrow" aria-hidden="true">
                <Icon name="arrowRight" strokeWidth={2.5} />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </HvSection>
  );
}
