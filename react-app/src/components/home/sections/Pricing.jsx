import { Link } from "react-router-dom";
import Icon from "@/components/common/Icon.jsx";
import { HvSection, SectionHead, Reveal } from "../primitives.jsx";
import { PRICING } from "@/data/homeV2";

/* Placeholder wordmarks, drawn inline so there are no image requests and
   each one inherits `currentColor` (muted ink, accent on hover). These are
   well-known companies used purely as a design stand-in - see the
   `trusted` comment in homeV2.jsx. Each viewBox is tuned to its own width
   so all five optically balance at the same rendered height. */
const LOGOS = {
  hyundai: (
    <svg viewBox="0 0 190 40" role="img" aria-label="Hyundai">
      <ellipse cx="20" cy="20" rx="17" ry="11.5" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M10 23c3.5-6.5 16.5-6.5 20 0" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <text x="46" y="28" fontFamily="'DM Sans', sans-serif" fontWeight="800" fontSize="21" letterSpacing="2" fill="currentColor">HYUNDAI</text>
    </svg>
  ),
  flexcar: (
    <svg viewBox="0 0 160 40" role="img" aria-label="Flexcar">
      <circle cx="20" cy="20" r="13" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M15 20h10M20 15v10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <text x="42" y="28" fontFamily="'DM Sans', sans-serif" fontWeight="800" fontSize="21" letterSpacing="1" fill="currentColor">FLEXCAR</text>
    </svg>
  ),
  athlon: (
    <svg viewBox="0 0 150 40" role="img" aria-label="Athlon">
      <path d="M6 33 20 7l14 26h-8l-6-12-6 12Z" fill="currentColor" />
      <text x="40" y="30" fontFamily="'DM Sans', sans-serif" fontWeight="800" fontSize="22" letterSpacing="2" fill="currentColor">THLON</text>
    </svg>
  ),
  leaselab: (
    <svg viewBox="0 0 190 40" role="img" aria-label="LeaseLab">
      <text x="0" y="29" fontFamily="'Space Mono', monospace" fontWeight="700" fontSize="25" letterSpacing="1" fill="currentColor">LEASE<tspan fontWeight="400">LAB</tspan></text>
    </svg>
  ),
  carwow: (
    <svg viewBox="0 0 160 40" role="img" aria-label="Carwow">
      <path d="M6 12l7 16 7-16h6l7 16 7-16" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <text x="48" y="29" fontFamily="'DM Sans', sans-serif" fontWeight="800" fontSize="23" fontStyle="italic" fill="currentColor">arwow</text>
    </svg>
  ),
};

/**
 * Pricing - four tiers, one "Most Popular" ribbon, and a trusted-companies
 * logo strip closing the section.
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
 *
 * The trusted-companies strip renders inside this same section, under the
 * tier grid - it closes the offer instead of standing as its own section.
 */
export default function Pricing() {
  return (
    <HvSection id="pricing" className="hv-pricing">
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

      <Reveal className="hv-pricing__trusted" index={1}>
        <h3 className="hv-pricing__trusted-title" id="trusted-title">{PRICING.trusted.title}</h3>
        <p className="hv-pricing__trusted-lede">{PRICING.trusted.lede}</p>
        <ul className="hv-pricing__logos">
          {PRICING.trusted.items.map((item) => (
            <li key={item.name} className="hv-pricing__logo" title={item.name}>
              {LOGOS[item.logo]}
            </li>
          ))}
        </ul>
      </Reveal>
    </HvSection>
  );
}
