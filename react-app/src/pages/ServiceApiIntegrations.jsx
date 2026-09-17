import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout.jsx";
import PageMeta from "@/components/common/PageMeta.jsx";
import Icon from "@/components/common/Icon.jsx";
import Faq from "@/components/common/Faq.jsx";
import StructuredData from "@/components/common/StructuredData.jsx";
import { HvSection, Reveal, Btn, Checks } from "@/components/home/primitives.jsx";
import ScriptNote from "@/components/home/ScriptNote.jsx";
import ServiceContactCard from "@/components/services/ServiceContactCard.jsx";
import ServiceEnquiryForm from "@/components/services/ServiceEnquiryForm.jsx";
import RelatedServices from "@/components/services/RelatedServices.jsx";

import {
  API_HERO,
  API_TRUTH,
  API_HUB,
  API_GRID,
  API_PROCESS,
  API_EFFECT,
  API_INTRO,
  API_DETAILS,
  API_DOCS,
  API_USECASES,
  API_WORK,
  API_BENEFITS,
  API_ENQUIRY,
  API_FAQ,
} from "@/data/serviceApiIntegrations.jsx";

/* v2 chrome plus the shared service detail stylesheet - see Industries.jsx
   for why the first two are both needed, and the note atop
   service-detail.css for how .sd-hero couples to the transparent header. */
import "@/styles/home-redesign.css";
import "@/styles/home-chrome.css";
import "@/styles/service-detail.css";

/**
 * /services/api-tool-integrations.
 *
 * The hero's visual anchor is our own mark connected to GoHighLevel's, with
 * an animated "syncing" link - not a generic hub icon - and every icon
 * plate on the page that can carry a real partner's mark (GoHighLevel,
 * Google Calendar, Twilio, Zocdoc) does, rather than a generic glyph.
 *
 * Sections: the hero, the connection hub (four concrete sync examples),
 * what a connection actually is, the joins we build most often, how one
 * gets built (with an illustrative authorization-screen mock in place of a
 * stock photo), the detail, a developer-facing tabbed code sample, who it's
 * for, representative work, benefits, what changes afterwards, and the FAQ
 * that doubles as the contact card. Every section ends with the next step,
 * so there is always a route out of the page from where the reader is.
 */

/* -- Sections -------------------------------------------------------------- */

/** The hero's central visual anchor: our own mark and GoHighLevel's,
 *  connected by a line with a bright segment that slides along it on a
 *  loop - "connected and syncing" shown rather than told. Hardcoded here
 *  rather than in the data file, same reasoning as the other heroes'
 *  mocks: it's decoration for this hero specifically, not page copy. */
function LogoSync() {
  return (
    <div className="sd-heromock sd-logosync" aria-hidden="true">
      <div className="sd-logosync__row">
        <div className="sd-logosync__badge">
          <img src="/img/logo.png" alt="" width={44} height={44} loading="eager" decoding="async" />
          <span>GHLevelUp</span>
        </div>

        <span className="sd-logosync__link" />

        <div className="sd-logosync__badge">
          <img src="/img/integrations/gohighlevel.png" alt="" width={44} height={44} loading="eager" decoding="async" />
          <span>GoHighLevel</span>
        </div>
      </div>

      <div className="sd-logosync__status">
        <span>Connected &amp; syncing</span>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="sd-hero sd-hero--split">
      <div className="hv-container sd-hero__inner">
        <Reveal as="p" className="sd-hero__crumbs">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/services">Services</Link>
            <span>/</span>
            API &amp; Tool Integrations
        </Reveal>

        <Reveal>
          <span className="sd-hero__eyebrow">{API_HERO.eyebrow}</span>

          <h1 className="sd-hero__title">
            {API_HERO.titleLead}
            <span>{API_HERO.titleAccent}</span>
          </h1>

          <p className="sd-hero__lede">{API_HERO.lede}</p>

          <div className="sd-hero__ctas">
            <Btn to={API_HERO.primary.to} variant="primary" size="lg" iconAfter={API_HERO.primary.icon}>
              {API_HERO.primary.label}
            </Btn>
            <Btn href={API_HERO.secondary.href} variant="outline" size="lg">
              {API_HERO.secondary.label}
            </Btn>
          </div>
        </Reveal>

        <Reveal index={1}>
          <LogoSync />
        </Reveal>
      </div>
    </section>
  );
}

/**
 * The connection hub: four concrete examples of what syncs, each paired
 * with the real mark of the system on the other end where we have one -
 * Google Calendar, Twilio - and a plain icon where the other side is
 * "whatever tool you use" rather than one named vendor (web forms,
 * billing). GoHighLevel's own mark anchors every card, since every example
 * here is GoHighLevel talking to something else.
 */
function ConnectionHub() {
  return (
    <HvSection className="sd-hubsec">
      <Reveal className="sd-grid-head">
        <span className="hv-eyebrow">{API_HUB.eyebrow}</span>
        <h2 className="hv-h2">{API_HUB.title}</h2>
        <p className="hv-lede">{API_HUB.lede}</p>
      </Reveal>

      <ul className="sd-hub-cards">
        {API_HUB.items.map((item, i) => (
          <Reveal as="li" key={item.category} index={i}>
            <article className="sd-hub-card">
              <div className="sd-hub-card__pair">
                <span className="sd-hub-card__mark">
                  <img src="/img/integrations/gohighlevel.png" alt="" width={18} height={18} loading="lazy" decoding="async" />
                </span>
                <span className="sd-hub-card__plus" aria-hidden="true">
                  +
                </span>
                <span className="sd-hub-card__mark">
                  {item.partnerLogo ? (
                    <img
                      src={`/img/integrations/${item.partnerLogo}.png`}
                      alt=""
                      width={18}
                      height={18}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <Icon name={item.partnerIcon} />
                  )}
                </span>
              </div>

              <h3>{item.category}</h3>
              <span className="sd-hub-card__with">with {item.partnerLabel}</span>
              <p>{item.body}</p>
            </article>
          </Reveal>
        ))}
      </ul>
    </HvSection>
  );
}

/**
 * What a connection is, in the four rules that decide whether it survives
 * contact with a real week. The platform marks sit beside the rules they
 * belong to: every one of them is named in the tile list on /services too.
 */
function OneTruth() {
  return (
    <HvSection id="connected" className="sd-truth">
      <div className="sd-split">
        <Reveal>
          <span className="hv-eyebrow">{API_TRUTH.eyebrow}</span>
          <h2 className="sd-why__title">{API_TRUTH.title}</h2>
          <p className="hv-lede">{API_TRUTH.lede}</p>

          <Checks items={API_TRUTH.checks} className="sd-truth__checks" />

          <div className="sd-split__cta">
            <Btn to={API_TRUTH.cta.to} variant="primary" iconAfter="arrowRight">
              {API_TRUTH.cta.label}
            </Btn>
          </div>
        </Reveal>

        <Reveal className="sd-truth__media" index={1}>
          <ul className="sd-tiles">
            {API_TRUTH.platforms.map((p) => (
              <li className="sd-tile" key={p.name}>
                <img src={`/img/integrations/${p.logo}.png`} alt="" width={96} height={96} loading="lazy" decoding="async" />
                <span>{p.name}</span>
              </li>
            ))}
          </ul>

          <p className="sd-truth__caption">{API_TRUTH.caption}</p>

          <div className="sd-truth__note" aria-hidden="true">
            <ScriptNote direction="down-left">{API_TRUTH.note}</ScriptNote>
          </div>
        </Reveal>
      </div>
    </HvSection>
  );
}

function WhatWeConnect() {
  return (
    <HvSection className="sd-caps">
      <Reveal className="sd-grid-head">
        <span className="hv-eyebrow">{API_GRID.eyebrow}</span>
        <h2 className="hv-h2">{API_GRID.title}</h2>
        <p className="sd-sub">{API_GRID.subtitle}</p>
        <p className="hv-body">{API_GRID.lede}</p>
      </Reveal>

      <ul className="sd-grid">
        {API_GRID.items.map((item, i) => (
          <Reveal as="li" key={item.title} index={i}>
            <article className="sd-card">
              <span className="sd-card__icon" aria-hidden="true">
                {item.logo ? (
                  <img src={`/img/integrations/${item.logo}.png`} alt="" width={24} height={24} loading="lazy" decoding="async" />
                ) : (
                  <Icon name={item.icon} />
                )}
              </span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          </Reveal>
        ))}
      </ul>

      <Reveal className="sd-cta-row">
        <Btn to={API_GRID.cta.to} variant="primary" size="lg" iconAfter="arrowRight">
          {API_GRID.cta.label}
        </Btn>
      </Reveal>
    </HvSection>
  );
}

/** The illustrative "authorize the connection" screen replacing a stock
 *  desk photo - clearly a mockup, not a reproduction of GoHighLevel's real
 *  product UI, which we have no rights to screenshot and pass off as one. */
function AuthMock() {
  return (
    <div className="sd-heromock sd-authmock" aria-hidden="true">
      <div className="sd-authmock__head">
        <b>Connect your GoHighLevel account</b>
        <span>Step 3 of 4 - Authorize</span>
      </div>

      <div className="sd-authmock__body">
        <div className="sd-authmock__field">
          <label>Location ID</label>
          <div>
            <Icon name="key" />
            loc_8f2c1a
          </div>
        </div>

        <div className="sd-authmock__field">
          <label>API key</label>
          <div>
            <Icon name="shieldCheck" />
            <span className="sd-authmock__dots">••••••••••••3f9d</span>
          </div>
        </div>

        <span className="sd-authmock__btn">
          <Icon name="check" />
          Authorize connection
        </span>
      </div>

      <span className="sd-authmock__tag">Illustrative setup screen</span>
    </div>
  );
}

function Process() {
  return (
    <HvSection dark className="sd-proc">
      <div className="sd-proc__inner">
        <Reveal>
          <span className="hv-eyebrow">{API_PROCESS.eyebrow}</span>
          <h2 className="hv-h2">{API_PROCESS.title}</h2>
          <p className="sd-sub">{API_PROCESS.subtitle}</p>
          <p className="hv-body">{API_PROCESS.lede}</p>

          <ol className="sd-steps">
            {API_PROCESS.steps.map((step, i) => (
              <Reveal as="li" className="sd-step" key={step.num} index={i}>
                <span className="sd-step__num" aria-hidden="true">
                  {step.num}
                </span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>

          <div className="sd-split__cta">
            <Btn to={API_PROCESS.cta.to} variant="primary" size="lg" iconAfter={API_PROCESS.cta.icon}>
              {API_PROCESS.cta.label}
            </Btn>
          </div>
        </Reveal>

        <Reveal className="sd-proc__media" index={1}>
          <AuthMock />
        </Reveal>
      </div>
    </HvSection>
  );
}

function WhatChanges() {
  return (
    <HvSection>
      <Reveal className="sd-grid-head">
        <span className="hv-eyebrow">{API_EFFECT.eyebrow}</span>
        <h2 className="hv-h2">{API_EFFECT.title}</h2>
        <p className="hv-body">{API_EFFECT.lede}</p>
      </Reveal>

      <ul className="sd-bens">
        {API_EFFECT.items.map((item, i) => (
          <Reveal as="li" key={item.title} index={i}>
            <div className="sd-ben">
              <span className="sd-ben__icon" aria-hidden="true">
                <Icon name={item.icon} />
              </span>
              <b>{item.title}</b>
              <p>{item.body}</p>
            </div>
          </Reveal>
        ))}
      </ul>

      <Reveal className="sd-cta-row">
        <Btn to={API_EFFECT.cta.to} variant="primary" size="lg" iconAfter="arrowRight">
          {API_EFFECT.cta.label}
        </Btn>
      </Reveal>
    </HvSection>
  );
}

function Intro() {
  return (
    <HvSection className="sd-intro">
      <div className="sd-intro__inner">
        <Reveal className="sd-intro__aside">
          <span className="hv-eyebrow">{API_INTRO.eyebrow}</span>
          <h2 className="sd-intro__title">{API_INTRO.title}</h2>

          <blockquote className="sd-intro__quote">
            <p>{API_INTRO.quote.text}</p>
            <span>{API_INTRO.quote.attribution}</span>
          </blockquote>
        </Reveal>

        <Reveal className="sd-intro__prose" index={1}>
          {API_INTRO.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </Reveal>
      </div>

      <Reveal as="ul" className="sd-facts" index={2}>
        {API_INTRO.facts.map((fact) => (
          <li key={fact.label}>
            <b>{fact.num}</b>
            <strong>{fact.label}</strong>
            <span>{fact.sub}</span>
          </li>
        ))}
      </Reveal>
    </HvSection>
  );
}

function Details() {
  return (
    <HvSection dark>
      <Reveal className="sd-grid-head">
        <span className="hv-eyebrow">{API_DETAILS.eyebrow}</span>
        <h2 className="hv-h2">{API_DETAILS.title}</h2>
        <p className="hv-body">{API_DETAILS.lede}</p>
      </Reveal>

      <ul className="sd-details">
        {API_DETAILS.groups.map((group, i) => (
          <Reveal as="li" key={group.title} index={i}>
            <article className="sd-detail">
              <span className="sd-card__icon" aria-hidden="true">
                <Icon name={group.icon} />
              </span>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>
                    <Icon name="check" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </ul>
    </HvSection>
  );
}

/**
 * Developers / API documentation: a dark, tabbed code box. Illustrative
 * REST examples, not a live endpoint - see the note under the panel and
 * the data file's own comment on why these are examples rather than a
 * public API reference.
 */
function ApiDocs() {
  const [active, setActive] = useState(0);
  const tab = API_DOCS.tabs[active];

  return (
    <HvSection dark className="sd-docs-sec">
      <Reveal className="sd-grid-head">
        <span className="hv-eyebrow">{API_DOCS.eyebrow}</span>
        <h2 className="hv-h2">{API_DOCS.title}</h2>
        <p className="hv-body">{API_DOCS.lede}</p>
      </Reveal>

      <Reveal className="sd-heromock sd-docs" index={1}>
        <div className="sd-docs__tabs" role="tablist">
          {API_DOCS.tabs.map((t, i) => (
            <button
              key={t.label}
              type="button"
              role="tab"
              aria-selected={i === active}
              className={i === active ? "is-active" : ""}
              onClick={() => setActive(i)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <pre className="sd-docs__panel">
          <code>{tab.code}</code>
        </pre>

        <p className="sd-docs__note">
          <Icon name="shieldCheck" aria-hidden="true" />
          {API_DOCS.note}
        </p>
      </Reveal>
    </HvSection>
  );
}

function UseCases() {
  return (
    <HvSection>
      <Reveal className="sd-grid-head">
        <span className="hv-eyebrow">{API_USECASES.eyebrow}</span>
        <h2 className="hv-h2">{API_USECASES.title}</h2>
        <p className="hv-lede">{API_USECASES.lede}</p>
      </Reveal>

      <ul className="sd-grid">
        {API_USECASES.items.map((item, i) => (
          <Reveal as="li" key={item.title} index={i}>
            <article className="sd-card">
              <span className="sd-card__icon" aria-hidden="true">
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

/** Representative builds, not client case studies - the note under the grid
 *  says so, and nothing here is attached to a named engagement. */
function Work() {
  return (
    <HvSection mint>
      <Reveal className="sd-grid-head">
        <span className="hv-eyebrow">{API_WORK.eyebrow}</span>
        <h2 className="hv-h2">{API_WORK.title}</h2>
        <p className="hv-lede">{API_WORK.lede}</p>
      </Reveal>

      <ul className="sd-work">
        {API_WORK.items.map((item, i) => (
          <Reveal as="li" key={item.title} index={i}>
            <article className="sd-work__card">
              <span className="sd-work__tag">{item.tag}</span>
              <h3>{item.title}</h3>
              <p className="sd-work__problem">{item.problem}</p>

              <p className="sd-work__label">What we built</p>
              <ul className="sd-work__built">
                {item.built.map((b) => (
                  <li key={b}>
                    <Icon name="check" aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>

              <div className="sd-work__outcome">
                <p>{item.outcome}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </ul>

      <Reveal as="p" className="sd-work__note" index={3}>
        <Icon name="shieldCheck" aria-hidden="true" />
        {API_WORK.note}
      </Reveal>
    </HvSection>
  );
}

function Benefits() {
  return (
    <HvSection>
      <Reveal className="sd-grid-head">
        <span className="hv-eyebrow">{API_BENEFITS.eyebrow}</span>
        <h2 className="hv-h2">{API_BENEFITS.title}</h2>
        <p className="hv-body">{API_BENEFITS.lede}</p>
      </Reveal>

      <ul className="sd-bens">
        {API_BENEFITS.items.map((item, i) => (
          <Reveal as="li" key={item.title} index={i}>
            <div className="sd-ben">
              <span className="sd-ben__icon" aria-hidden="true">
                <Icon name={item.icon} />
              </span>
              <b>{item.title}</b>
              <p>{item.body}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </HvSection>
  );
}

function FaqSection() {
  return (
    <HvSection className="sd-faq">
      <StructuredData
        faq={API_FAQ.items}
        service={SEO}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: SEO.name, path: `/services/${SEO.slug}` },
        ]}
      />

      <div className="sd-faq__inner">
        <Reveal>
          <span className="hv-eyebrow">{API_FAQ.eyebrow}</span>
          <h2 className="hv-h2">{API_FAQ.title}</h2>
          <p className="hv-body">{API_FAQ.lede}</p>

          <div className="sd-faq__list">
            <Faq items={API_FAQ.items} />
          </div>
        </Reveal>

        <ServiceContactCard card={API_FAQ.card} />
      </div>
    </HvSection>
  );
}

/* One definition of this page's search identity, read by both its <PageMeta>
   and its Service structured data below - so the title, the description and
   the schema can never describe the same page three slightly different ways. */
const SEO = {
  slug: "api-tool-integrations",
  name: "API & Tool Integrations",
  description:
    "CRM, calendars, telephony, billing, checkout and practice platforms joined up, so one record moves between the tools you already use.",
  ogDescription:
    "We connect the platforms your business already runs on and document the map, so a booking, payment or enquiry is written everywhere it matters, once.",
};

export default function ServiceApiIntegrations() {
  return (
    <Layout
      variant="v2"
      topbar={
        <>
          Running the same customer data in three places? <a href="/book">Get an integration review</a>
        </>
      }
    >
      <PageMeta title={`${SEO.name} - GHLevelUp`} description={SEO.description} ogDescription={SEO.ogDescription} />

      <div className="sd-pg">
        <Hero />
        <ConnectionHub />
        <Intro />
        <OneTruth />
        <WhatWeConnect />
        <Process />
        <Details />
        <ApiDocs />
        <UseCases />
        <Work />
        <Benefits />
        <WhatChanges />
        <ServiceEnquiryForm
          service={API_ENQUIRY.service}
          eyebrow={API_ENQUIRY.eyebrow}
          title={API_ENQUIRY.title}
          lede={API_ENQUIRY.lede}
          points={API_ENQUIRY.points}
        />
        <RelatedServices
          slug="api-tool-integrations"
          title="What to do once the tools are talking"
          lede="Connections are plumbing. These are the three things that put a joined-up record to work."
        />
        <FaqSection />
      </div>
    </Layout>
  );
}
