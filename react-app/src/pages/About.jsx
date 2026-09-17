import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout.jsx";
import PageMeta from "@/components/common/PageMeta.jsx";
import StructuredData from "@/components/common/StructuredData.jsx";
import Icon from "@/components/common/Icon.jsx";
import { HvSection, Reveal, Btn, BtnRow } from "@/components/home/primitives.jsx";
import { SITE } from "@/data/site";
import {
  AB_HERO,
  AB_TRUST,
  AB_LETTER,
  AB_JOURNEY,
  AB_VALUES,
  AB_CAPABILITY,
  AB_CONTACT,
  AB_CLOSING,
} from "@/data/aboutV2.jsx";

/* v2 chrome (glass header, SiteFooterV2) - the same two stylesheets every
   other redesigned page loads; see Industries.jsx for why both are needed.
   about.css only adds this page's own sections on top. */
import "@/styles/home-redesign.css";
import "@/styles/home-chrome.css";
import "@/styles/about.css";

/**
 * /about.
 *
 * Layout follows the approved reference design (hero + trust bar, founder
 * letter, journey timeline, values grid, capability section, contact strip,
 * closing CTA); every word of the copy is GHLevelUp's own. See the note at
 * the top of data/aboutV2.jsx for the "no invented facts" rule this page
 * holds to - the reference's founding year and client-count trust bar and
 * "company history" timeline do not appear here because we have no real
 * figures to publish yet.
 *
 * STRUCTURAL NOTE: the v2 header is transparent at rest with light-on-dark
 * nav, achieved by pulling the opening hero up under it (the
 * `.home-v2 .hv-hero, .home-v2 .page-hero, .home-v2 .sd-hero,
 * .home-v2 .svcs-hero, .home-v2 .ab-hero` rule in styles/home-chrome.css).
 * `.ab-hero` is registered there - renaming this hero without updating that
 * rule opens the page with a white strip behind the logo.
 */

function Hero() {
  return (
    <section className="ab-hero">
      <div className="hv-container ab-hero__inner">
        <Reveal>
          <p className="ab-hero__crumbs">
            <Link to="/">Home</Link>
            <span>/</span>
            {AB_HERO.crumb}
          </p>

          <span className="ab-hero__eyebrow">{AB_HERO.eyebrow}</span>

          <h1 className="ab-hero__title">
            {AB_HERO.titleLead}
            <span>{AB_HERO.titleAccent}</span>
          </h1>

          <p className="ab-hero__lede">{AB_HERO.lede}</p>
        </Reveal>
      </div>
    </section>
  );
}

function TrustBar() {
  return (
    <HvSection tight className="ab-trust">
      <Reveal as="ul" className="ab-trust__row">
        {AB_TRUST.map((item) => (
          <li key={item.label}>
            <div className="ab-trust__item">
              <span className="ab-trust__icon" aria-hidden="true">
                <Icon name={item.icon} />
              </span>
              <span>
                <span className="ab-trust__value">{item.value}</span>
                <span className="ab-trust__label">{item.label}</span>
              </span>
            </div>
          </li>
        ))}
      </Reveal>
    </HvSection>
  );
}

function FounderLetter() {
  return (
    <HvSection className="ab-letter">
      <div className="ab-letter__inner">
        <Reveal className="ab-letter__aside">
          <div className="ab-letter__photo">
            <img
              src={AB_LETTER.photo}
              alt={`${AB_LETTER.name}, ${AB_LETTER.role}`}
              width={560}
              height={700}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="ab-letter__who">
            <b>{AB_LETTER.name}</b>
            <span>{AB_LETTER.role}</span>
          </div>
        </Reveal>

        <Reveal className="ab-letter__card" index={1}>
          <span className="hv-eyebrow">{AB_LETTER.eyebrow}</span>

          {AB_LETTER.sections.map((s, i) => (
            <div className="ab-letter__section" key={s.heading}>
              <h3>{s.heading}</h3>
              <p>{s.body}</p>
              {/* The pull quote breaks up the letter after the middle
                  section, where the reference places its own callout. */}
              {i === 1 && (
                <blockquote className="ab-letter__quote">
                  <p>{AB_LETTER.pullQuote.text}</p>
                  <span>{AB_LETTER.pullQuote.attribution}</span>
                </blockquote>
              )}
            </div>
          ))}

          <p className="ab-letter__closing">{AB_LETTER.closing}</p>

          <p className="ab-letter__sign" aria-hidden="true">
            {AB_LETTER.signature}
          </p>
        </Reveal>
      </div>
    </HvSection>
  );
}

function Journey() {
  return (
    <HvSection>
      <Reveal className="ab-journey__head">
        <span className="hv-eyebrow">{AB_JOURNEY.eyebrow}</span>
        <h2 className="hv-h2">{AB_JOURNEY.title}</h2>
        <p className="hv-lede">{AB_JOURNEY.lede}</p>
      </Reveal>

      <div className="ab-timeline">
        <ol className="ab-timeline__list">
          {AB_JOURNEY.steps.map((step, i) => (
            <Reveal as="li" className="ab-timeline__row" key={step.num} index={i}>
              <span className="ab-timeline__dot" aria-hidden="true" />
              <div className="ab-timeline__card">
                <div className="ab-timeline__head">
                  <span className="ab-timeline__num" aria-hidden="true">
                    {step.num}
                  </span>
                  <h3>{step.title}</h3>
                </div>
                <p>{step.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </HvSection>
  );
}

function Values() {
  return (
    <HvSection className="ab-values">
      <Reveal className="ab-journey__head">
        <span className="hv-eyebrow">{AB_VALUES.eyebrow}</span>
        <h2 className="hv-h2">{AB_VALUES.title}</h2>
        <p className="hv-lede">{AB_VALUES.lede}</p>
      </Reveal>

      <ul className="ab-values__grid">
        {AB_VALUES.items.map((item, i) => (
          <Reveal as="li" key={item.title} index={i}>
            <article className="ab-value">
              <span className="ab-value__icon" aria-hidden="true">
                <Icon name={item.icon} />
              </span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          </Reveal>
        ))}
      </ul>
    </HvSection>
  );
}

function Capability() {
  return (
    <HvSection dark>
      <div className="ab-cap__inner">
        <Reveal>
          <span className="hv-eyebrow">{AB_CAPABILITY.eyebrow}</span>
          <h2 className="hv-h2">{AB_CAPABILITY.title}</h2>
          <p className="ab-cap__body">{AB_CAPABILITY.body}</p>

          <BtnRow style={{ marginTop: "var(--hv-s7)" }}>
            <Btn to={AB_CAPABILITY.cta.to} variant="primary" iconAfter="arrowRight">
              {AB_CAPABILITY.cta.label}
            </Btn>
            <Btn to="/contact" variant="outline">
              Send a message
            </Btn>
          </BtnRow>
        </Reveal>

        <Reveal className="ab-cap__grid" index={1}>
          {AB_CAPABILITY.items.map((item) => (
            <div className="ab-cap__item" key={item.title}>
              <span className="ab-cap__icon" aria-hidden="true">
                <Icon name={item.icon} />
              </span>
              <div>
                <h4>{item.title}</h4>
                <p>{item.body}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </HvSection>
  );
}

function Contact() {
  return (
    <HvSection>
      <Reveal className="ab-journey__head">
        <span className="hv-eyebrow">{AB_CONTACT.eyebrow}</span>
        <h2 className="hv-h2">{AB_CONTACT.title}</h2>
      </Reveal>

      <ul className="ab-contact__grid">
        <Reveal as="li" index={0}>
          <div className="ab-contact__card">
            <span className="ab-contact__icon" aria-hidden="true">
              <Icon name="mapPin" />
            </span>
            <h4>Office</h4>
            <p>
              {SITE.addressLine1}
              <br />
              {SITE.addressLine2}
              <br />
              <small>Visits by appointment</small>
            </p>
          </div>
        </Reveal>
        <Reveal as="li" index={1}>
          <div className="ab-contact__card">
            <span className="ab-contact__icon" aria-hidden="true">
              <Icon name="phone" />
            </span>
            <h4>Call or text</h4>
            <p>
              <a href={SITE.phoneHref}>{SITE.phone}</a>
              <br />
              <small>{SITE.hours}</small>
            </p>
          </div>
        </Reveal>
        <Reveal as="li" index={2}>
          <div className="ab-contact__card">
            <span className="ab-contact__icon" aria-hidden="true">
              <Icon name="mail" />
            </span>
            <h4>Email</h4>
            <p>
              <a href={SITE.emailHref}>{SITE.email}</a>
              <br />
              <small>Same business day</small>
            </p>
          </div>
        </Reveal>
      </ul>
    </HvSection>
  );
}

function Closing() {
  return (
    <HvSection tight>
      <Reveal className="ab-closing">
        <div className="ab-closing__inner">
          <h2>{AB_CLOSING.title}</h2>
          <p>{AB_CLOSING.body}</p>
          <BtnRow className="ab-closing__ctas">
            <Btn to={AB_CLOSING.primary.to} variant="primary" size="lg" iconAfter={AB_CLOSING.primary.icon}>
              {AB_CLOSING.primary.label}
            </Btn>
            <Btn href={SITE.phoneHref} variant="outline" size="lg">
              Call {SITE.phone}
            </Btn>
          </BtnRow>
        </div>
      </Reveal>
    </HvSection>
  );
}

export default function About() {
  return (
    <Layout variant="v2" topbar="Based in Albany, New York - working with practices across all 50 states">
      <PageMeta
        title="About GHLevelUp - The Team Behind Your Systems"
        description="An engineering team that builds and runs the operating layer for growing businesses - configuration where it fits, custom software where it doesn't."
        ogDescription="Who builds and runs the systems we sell: one team on the build, the migrations and the support afterwards, rather than a sale followed by a handover."
      />

      <StructuredData
        page={{
          type: "AboutPage",
          name: "About GHLevelUp",
          description:
            "An engineering team that builds and runs the operating layer for growing businesses - configuration where it fits, custom software where it doesn't.",
          path: "/about",
        }}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />

      <Hero />
      <TrustBar />
      <FounderLetter />
      <Journey />
      <Values />
      <Capability />
      <Contact />
      <Closing />
    </Layout>
  );
}
