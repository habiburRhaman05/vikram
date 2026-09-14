import { Link } from "react-router-dom";
import Icon from "@/components/common/Icon.jsx";
import { HvSection, SectionHead, Reveal } from "../primitives.jsx";
import { PRICING } from "@/data/homeV2";

/**
 * Pricing - four tiers, one "Most Popular" ribbon, a reassurance strip.
 *
 * PLACEHOLDER NUMBERS. Every price and setup fee here comes straight from
 * PRICING in homeV2.jsx, which is marked as dummy data - see the comment
 * there. This component renders whatever it's given; swapping in real
 * numbers is a data-file edit, not a component change.
 *
 * Enterprise's price is `null` rather than 0 or "" - a tier with a real
 * number and a tier with "Custom" pricing are different shapes of fact,
 * and collapsing them to the same field with a magic value (0 meaning
 * "actually free" vs 0 meaning "no price") is exactly the kind of bug
 * that survives review because it looks like data, not a code path.
 */
export default function Pricing() {
  return (
    <HvSection id="pricing" dark className="hv-pricing">
      <SectionHead eyebrow={PRICING.eyebrow} title={PRICING.title} center>
        {PRICING.lede}
      </SectionHead>

      <ul className="hv-pricing__grid">
        {PRICING.tiers.map((tier, i) => (
          <Reveal
            as="li"
            key={tier.id}
            index={i}
            className={`hv-pricing__cell${tier.badge ? " is-featured" : ""}`}
          >
            <article className="hv-pricing__card">
              {tier.badge && <span className="hv-pricing__ribbon">{tier.badge}</span>}

              <h3 className="hv-pricing__name">{tier.name}</h3>
              <p className="hv-pricing__for">
                <span>Best for</span>
                {tier.bestFor}
              </p>

              <div className="hv-pricing__price">
                {tier.price == null ? (
                  <span className="hv-pricing__custom">Custom</span>
                ) : (
                  <>
                    <span className="hv-pricing__amount">${tier.price.toLocaleString()}</span>
                    <span className="hv-pricing__period">/month</span>
                  </>
                )}
              </div>
              <p className="hv-pricing__setup">
                {tier.price == null
                  ? "Custom setup & onboarding"
                  : `+ $${tier.setup.toLocaleString()} one-time setup`}
              </p>

              <Link
                to={tier.cta.to}
                className={`hv-btn ${tier.badge ? "hv-btn--primary" : "hv-btn--outline"} hv-pricing__cta`}
              >
                {tier.cta.label}
                <Icon name="arrowRight" aria-hidden="true" />
              </Link>

              <ul className="hv-pricing__features">
                {tier.features.map((f) => (
                  <li key={f}>
                    <Icon name="check" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </ul>

      <Reveal className="hv-pricing__reassurance">
        {PRICING.reassurance.map((r) => (
          <span key={r.label}>
            <Icon name={r.icon} aria-hidden="true" />
            {r.label}
          </span>
        ))}
      </Reveal>
    </HvSection>
  );
}
