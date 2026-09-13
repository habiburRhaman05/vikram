import Icon from "@/components/common/Icon.jsx";
import { HvSection, Reveal, Btn } from "../primitives.jsx";
import { IMPACT } from "@/data/homeV2";

/**
 * "Numbers That Speak for Themselves" - the dark stats band.
 *
 * Stat markup is <dl>: each figure is a value with a label, which is
 * exactly what a description list is for, and it gives assistive tech the
 * pairing ("100+ - happy clients") instead of eight loose fragments.
 */
export default function Impact() {
  return (
    <HvSection dark>
      <div className="hv-split hv-impact">
        <Reveal className="hv-impact__copy">
          <span className="hv-eyebrow">{IMPACT.eyebrow}</span>
          <h2 className="hv-h2">{IMPACT.title}</h2>
          <p className="hv-lede">{IMPACT.lede}</p>
          <Btn to={IMPACT.cta.to} variant="primary" iconAfter={IMPACT.cta.icon} className="hv-impact__cta">
            {IMPACT.cta.label}
          </Btn>
        </Reveal>

        <Reveal className="hv-impact__stats">
          <dl className="hv-stats">
            {IMPACT.stats.map((s) => (
              <div className="hv-stat" key={s.label}>
                <dt className="hv-stat__value">{s.value}</dt>
                <dd className="hv-stat__label">{s.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <Reveal className="hv-industries">
        <ul>
          {IMPACT.industries.map((ind) => (
            <li key={ind.label}>
              <Icon name={ind.icon} aria-hidden="true" />
              <span>{ind.label}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </HvSection>
  );
}
