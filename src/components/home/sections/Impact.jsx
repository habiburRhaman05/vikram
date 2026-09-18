import Icon from "@/components/common/Icon.jsx";
import useCountUp from "@/hooks/useCountUp";
import { HvSection, Reveal, Btn } from "../primitives.jsx";
import { IMPACT } from "@/data/homeV2";

/**
 * Splits a stat into the part that can be counted and the part that
 * cannot: "100+" -> { number: 100, suffix: "+" }, "95%" -> { 95, "%" }.
 * Anything that does not open with digits (a range, a word) returns null
 * and is printed as written - the count is an enhancement, not a
 * requirement.
 */
function splitStat(value) {
  const match = String(value).match(/^(\d+)(.*)$/);
  return match ? { number: Number(match[1]), suffix: match[2].trim() } : null;
}

/** One figure. The ref sits on the <dt> itself, so the number starts
 *  counting the moment the figure the reader is looking at arrives. */
function Stat({ value, label, index }) {
  const parts = splitStat(value);
  const { ref, value: counted } = useCountUp(parts ? parts.number : 0, {
    /* Staggered so the four figures land one after another instead of
       snapping to their totals in unison. */
    duration: 1400 + index * 180,
  });

  return (
    <div className="hv-stat">
      <dt className="hv-stat__value" ref={ref}>
        {parts ? `${counted}${parts.suffix}` : value}
      </dt>
      <dd className="hv-stat__label">{label}</dd>
    </div>
  );
}

/**
 * "Numbers That Speak for Themselves" - the dark stats band.
 *
 * Stat markup is <dl>: each figure is a value with a label, which is
 * exactly what a description list is for, and it gives assistive tech the
 * pairing ("100+ - happy clients") instead of eight loose fragments.
 *
 * The figures count up when the band scrolls into view (see Stat above);
 * the labels are static, and the final number is what stays in the DOM, so
 * copying or reading the page once the count has finished gives the real
 * figure.
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
            {IMPACT.stats.map((s, i) => (
              <Stat key={s.label} value={s.value} label={s.label} index={i} />
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
