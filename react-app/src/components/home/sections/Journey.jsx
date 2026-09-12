import Icon from "@/components/common/Icon.jsx";
import { HvSection, Reveal, Btn, IconBadge } from "../primitives.jsx";
import { JOURNEY } from "@/data/homeV2";

/**
 * "From Clicks to Customers" - the seven-stage journey.
 *
 * The reference draws this as an S: four across, then wrapping back
 * right-to-left underneath. Reproduced with a 4-column grid where the
 * second row is reversed, so the reading order still matches the DOM
 * order (an ordered list) - the visual snake is presentation only, and
 * a screen reader gets a clean 1..7 sequence.
 */
export default function Journey() {
  return (
    <HvSection mint wash>
      <div className="hv-split hv-journey">
        <Reveal className="hv-journey__copy">
          <span className="hv-eyebrow">{JOURNEY.eyebrow}</span>
          <h2 className="hv-h2">{JOURNEY.title}</h2>
          <p className="hv-lede">{JOURNEY.lede}</p>
          <Btn to={JOURNEY.cta.to} variant="primary" iconAfter={JOURNEY.cta.icon} className="hv-journey__cta">
            {JOURNEY.cta.label}
          </Btn>
        </Reveal>

        <Reveal className="hv-journey__flow">
          <ol className="hv-flow">
            {JOURNEY.steps.map((step, i) => (
              <li className="hv-flow__step" key={step.title}>
                <IconBadge icon={step.icon} round />
                <span className="hv-flow__title">{step.title}</span>
                <span className="hv-flow__sub">{step.sub}</span>
                {i < JOURNEY.steps.length - 1 && (
                  <span className="hv-flow__arrow" aria-hidden="true">
                    <Icon name="arrowRight" strokeWidth={2.5} />
                  </span>
                )}
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </HvSection>
  );
}
