import Layout from "@/components/layout/Layout.jsx";
import PageMeta from "@/components/common/PageMeta.jsx";
import Icon from "@/components/common/Icon.jsx";
import Faq from "@/components/common/Faq.jsx";
import StructuredData from "@/components/common/StructuredData.jsx";
import { HvSection, Reveal, Btn } from "@/components/home/primitives.jsx";
import { SITE } from "@/data/site";

import {
  PRICING_HERO,
  PRICING_TIERS,
  PRICING_NOTE,
  PRICING_ADDONS,
  PRICING_FAQ,
  PRICING_CLOSING,
} from "@/data/pricing.jsx";

/* v2 chrome plus this page's own stylesheet - a SaaS-style product layout
   (tier cards, add-ons, FAQ) rather than the service-page pattern, per the
   brief. See pricing.css for why it doesn't extend service-detail.css or
   any of the other bespoke page stylesheets. */
import "@/styles/home-redesign.css";
import "@/styles/home-chrome.css";
import "@/styles/pricing.css";

/**
 * /pricing.
 *
 * Five sections: the plan hero, the tier cards (full feature list per
 * card, straight from data/pricingPlans.json), add-ons, FAQ, and a
 * risk-reversal closing CTA. Tier names, prices, setup fees and features
 * are real, sourced from data/pricingPlans.json - see the top of
 * data/pricing.jsx for how that file maps into PRICING_TIERS.
 */

function fmt(n) {
  return `$${n.toLocaleString()}`;
}

/* -- Hero ---------------------------------------------------------------------- */

function Hero() {
  return (
    <section className="pr-hero">
      <div className="hv-container pr-hero__inner">
        <Reveal>
          <span className="pr-hero__eyebrow">{PRICING_HERO.eyebrow}</span>
          <h1 className="pr-hero__title">{PRICING_HERO.title}</h1>
          <p className="pr-hero__lede">{PRICING_HERO.lede}</p>
          <p className="pr-hero__note">{PRICING_HERO.billingNote}</p>
        </Reveal>
      </div>
    </section>
  );
}

/* -- Tier cards ---------------------------------------------------------------- */

function TierCards() {
  return (
    <HvSection className="pr-tiers">
      <ul className="pr-tier-grid">
        {PRICING_TIERS.map((tier, i) => (
          <Reveal
            as="li"
            key={tier.id}
            index={i}
            className={tier.badge ? "pr-tier-cell is-featured" : "pr-tier-cell"}
          >
            <article className="pr-tier">
              {tier.badge && <span className="pr-tier__ribbon">{tier.badge}</span>}

              <h3>{tier.name}</h3>
              <p className="pr-tier__for">{tier.bestFor}</p>

              <div className="pr-tier__price">
                {tier.monthly == null ? (
                  <span className="pr-tier__custom">Custom</span>
                ) : (
                  <>
                    <span className="pr-tier__amount">{fmt(tier.monthly)}</span>
                    <span className="pr-tier__period">/mo</span>
                  </>
                )}
              </div>
              <p className="pr-tier__setup">
                {tier.setup == null
                  ? "Custom setup & onboarding"
                  : tier.setup === 0
                  ? "No setup fee"
                  : `+ ${fmt(tier.setup)} one-time setup`}
              </p>

              <Btn to={tier.cta.to} variant={tier.badge ? "primary" : "outline"} className="pr-tier__cta">
                {tier.cta.label}
              </Btn>

              <ul className="pr-tier__features">
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

      <p className="pr-tiers__note">{PRICING_NOTE}</p>
    </HvSection>
  );
}

/* -- Add-ons ---------------------------------------------------------------------- */

function Addons() {
  return (
    <HvSection className="pr-addons">
      <Reveal className="pr-head">
        <span className="hv-eyebrow">{PRICING_ADDONS.eyebrow}</span>
        <h2 className="hv-h2">{PRICING_ADDONS.title}</h2>
        <p className="hv-lede">{PRICING_ADDONS.lede}</p>
      </Reveal>

      <ul className="pr-addon-grid">
        {PRICING_ADDONS.items.map((item, i) => (
          <Reveal as="li" key={item.title} index={i}>
            <article className="pr-addon">
              <span className="pr-addon__icon" aria-hidden="true">
                <Icon name={item.icon} />
              </span>
              <div className="pr-addon__head">
                <h3>{item.title}</h3>
                <span>{item.price}</span>
              </div>
              <p>{item.body}</p>
            </article>
          </Reveal>
        ))}
      </ul>
    </HvSection>
  );
}

/* -- FAQ ---------------------------------------------------------------------------- */

function FaqSection() {
  return (
    <HvSection mint className="pr-faq">
      <StructuredData
        faq={PRICING_FAQ.items}
        page={{
          type: "WebPage",
          name: "Pricing & Plans",
          description:
            "Starter, Growth, Premium and Enterprise plans for GoHighLevel setup, automation and growth, compared feature by feature.",
          path: "/pricing",
        }}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Pricing", path: "/pricing" },
        ]}
      />
      <Reveal className="pr-head pr-head--center">
        <span className="hv-eyebrow">{PRICING_FAQ.eyebrow}</span>
        <h2 className="hv-h2">{PRICING_FAQ.title}</h2>
        <p className="hv-lede">{PRICING_FAQ.lede}</p>
      </Reveal>

      <Reveal className="pr-faq__list" index={1}>
        <Faq items={PRICING_FAQ.items} />
      </Reveal>
    </HvSection>
  );
}

/* -- Risk-reversal closing CTA ------------------------------------------------------ */

function Closing() {
  return (
    <HvSection dark className="pr-closing">
      <div className="pr-closing__grid">
        <Reveal className="pr-closing__copy">
          <span className="hv-eyebrow">{PRICING_CLOSING.eyebrow}</span>
          <h2 className="hv-h2">{PRICING_CLOSING.title}</h2>
          <p className="hv-body">{PRICING_CLOSING.lede}</p>

          <ul className="pr-closing__points">
            {PRICING_CLOSING.points.map((p) => (
              <li key={p}>
                <Icon name="shieldCheck" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>

          <div className="pr-closing__ctas">
            <Btn to={PRICING_CLOSING.primary.to} variant="primary" size="lg" iconAfter={PRICING_CLOSING.primary.icon}>
              {PRICING_CLOSING.primary.label}
            </Btn>
            <Btn to={PRICING_CLOSING.secondary.to} variant="outline" size="lg">
              {PRICING_CLOSING.secondary.label}
            </Btn>
          </div>

          <p className="pr-closing__phone">
            Prefer to talk first? Call <a href={SITE.phoneHref}>{SITE.phone}</a>
          </p>
        </Reveal>

        <Reveal className="pr-closing__card" index={1}>
          <span className="pr-closing__card-tag">How it works</span>
          <ol className="pr-closing__steps">
            {PRICING_CLOSING.steps.map((step, i) => (
              <li key={step.title}>
                <span className="pr-closing__step-num">{i + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </HvSection>
  );
}

export default function Pricing() {
  return (
    <Layout variant="v2" topbar="Not sure which plan fits? Book a free consultation and we'll tell you honestly">
      <PageMeta
        title="Pricing & Plans - GHLevelUp"
        description="Simple, month-to-month plans for GoHighLevel setup, automation and growth - compare every feature side by side, no long contracts."
        ogDescription="Starter, Growth, Premium and Enterprise plans, compared feature by feature - month-to-month, cancel any time."
      />

      <div className="pr-pg">
        <Hero />
        <TierCards />
        <Addons />
        <FaqSection />
        <Closing />
      </div>
    </Layout>
  );
}
