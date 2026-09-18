import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout.jsx";
import PageMeta from "@/components/common/PageMeta.jsx";
import Icon from "@/components/common/Icon.jsx";
import Faq from "@/components/common/Faq.jsx";
import StructuredData from "@/components/common/StructuredData.jsx";
import { HvSection, Reveal, Btn } from "@/components/home/primitives.jsx";

import {
  PRICING_HERO,
  PRICING_TIERS,
  PRICING_MATRIX,
  PRICING_ADDONS,
  PRICING_FAQ,
  PRICING_CLOSING,
} from "@/data/pricing.jsx";

/* v2 chrome plus this page's own stylesheet - a SaaS-style product layout
   (billing toggle, tier cards, a real feature matrix) rather than the
   service-page pattern, per the brief. See pricing.css for why it doesn't
   extend service-detail.css or any of the other bespoke page stylesheets. */
import "@/styles/home-redesign.css";
import "@/styles/home-chrome.css";
import "@/styles/pricing.css";

/**
 * /pricing.
 *
 * Six sections: the plan-selector hero (with the monthly/annual toggle),
 * the tier cards, the full feature comparison matrix, add-ons, FAQ, and a
 * risk-reversal closing CTA. All PLACEHOLDER PRICING - see the top of
 * data/pricing.jsx for what that means and why the numbers match the home
 * page's "Plans" section rather than inventing a second, different set.
 */

function fmt(n) {
  return `$${n.toLocaleString()}`;
}

/* -- Hero + toggle ----------------------------------------------------------- */

function Hero({ annual, setAnnual }) {
  return (
    <section className="pr-hero">
      <div className="hv-container pr-hero__inner">
        <Reveal>
          <span className="pr-hero__eyebrow">{PRICING_HERO.eyebrow}</span>
          <h1 className="pr-hero__title">{PRICING_HERO.title}</h1>
          <p className="pr-hero__lede">{PRICING_HERO.lede}</p>

          <div className="pr-toggle" role="group" aria-label="Billing period">
            <button
              type="button"
              className={!annual ? "is-active" : ""}
              aria-pressed={!annual}
              onClick={() => setAnnual(false)}
            >
              Monthly
            </button>
            <button
              type="button"
              className={annual ? "is-active" : ""}
              aria-pressed={annual}
              onClick={() => setAnnual(true)}
            >
              Annual
              <span className="pr-toggle__save">Save {PRICING_HERO.annualDiscount}%</span>
            </button>
          </div>

          <p className="pr-hero__note">{annual ? PRICING_HERO.annualNote : PRICING_HERO.billingNote}</p>
        </Reveal>
      </div>
    </section>
  );
}

/* -- Tier cards ---------------------------------------------------------------- */

function TierCards({ annual }) {
  return (
    <HvSection className="pr-tiers">
      <ul className="pr-tier-grid">
        {PRICING_TIERS.map((tier, i) => {
          const price = annual ? tier.annualMonthly : tier.monthly;
          return (
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
                  {price == null ? (
                    <span className="pr-tier__custom">Custom</span>
                  ) : (
                    <>
                      <span className="pr-tier__amount">{fmt(price)}</span>
                      <span className="pr-tier__period">/mo</span>
                    </>
                  )}
                </div>
                <p className="pr-tier__setup">
                  {tier.setup == null ? "Custom setup & onboarding" : `+ ${fmt(tier.setup)} one-time setup`}
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
          );
        })}
      </ul>
    </HvSection>
  );
}

/* -- Feature comparison matrix --------------------------------------------------- */

function Cell({ value }) {
  if (value === true) {
    return (
      <span className="pr-matrix__yes" aria-label="Included">
        <Icon name="check" aria-hidden="true" />
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="pr-matrix__no" aria-hidden="true">
        &ndash;
      </span>
    );
  }
  return <span className="pr-matrix__val">{value}</span>;
}

function Matrix() {
  return (
    <HvSection mint className="pr-matrix-sec">
      <Reveal className="pr-head">
        <span className="hv-eyebrow">{PRICING_MATRIX.eyebrow}</span>
        <h2 className="hv-h2">{PRICING_MATRIX.title}</h2>
        <p className="hv-lede">{PRICING_MATRIX.lede}</p>
      </Reveal>

      <Reveal className="pr-matrix" index={1}>
        <div className="pr-matrix__scroll">
          <table>
            <thead>
              <tr>
                <th scope="col" className="pr-matrix__feature-col">
                  Feature
                </th>
                {PRICING_TIERS.map((t) => (
                  <th scope="col" key={t.id} className={t.badge ? "is-featured" : ""}>
                    {t.name}
                  </th>
                ))}
              </tr>
            </thead>
            {PRICING_MATRIX.groups.map((group) => (
              <tbody key={group.label}>
                <tr className="pr-matrix__group">
                  <th scope="colgroup" colSpan={PRICING_TIERS.length + 1}>
                    {group.label}
                  </th>
                </tr>
                {group.rows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    {row.values.map((v, i) => (
                      <td key={PRICING_TIERS[i].id} className={PRICING_TIERS[i].badge ? "is-featured" : ""}>
                        <Cell value={v} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>
      </Reveal>
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
            "Starter, Growth, Command and Enterprise plans for GoHighLevel setup, automation and growth, compared feature by feature.",
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
      <Reveal className="pr-closing__inner">
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
          <Link to={PRICING_CLOSING.secondary.to} className="pr-closing__link">
            {PRICING_CLOSING.secondary.label}
            <Icon name="arrowRight" aria-hidden="true" />
          </Link>
        </div>
      </Reveal>
    </HvSection>
  );
}

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <Layout variant="v2" topbar="Not sure which plan fits? Book a free consultation and we'll tell you honestly">
      <PageMeta
        title="Pricing & Plans - GHLevelUp"
        description="Simple, month-to-month plans for GoHighLevel setup, automation and growth - compare every feature side by side, no long contracts."
        ogDescription="Starter, Growth, Command and Enterprise plans, compared feature by feature - month-to-month, cancel any time."
      />

      <div className="pr-pg">
        <Hero annual={annual} setAnnual={setAnnual} />
        <TierCards annual={annual} />
        <Matrix />
        <Addons />
        <FaqSection />
        <Closing />
      </div>
    </Layout>
  );
}
