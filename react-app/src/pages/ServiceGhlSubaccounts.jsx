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
  GHL_HERO,
  GHL_SETUP,
  GHL_GRID,
  GHL_PROCESS,
  GHL_WHO,
  GHL_INTRO,
  GHL_DETAILS,
  GHL_USECASES,
  GHL_WORK,
  GHL_BENEFITS,
  GHL_ENQUIRY,
  GHL_FAQ,
} from "@/data/serviceGhlSubaccounts.jsx";

/* v2 chrome plus the shared service detail stylesheet - see Industries.jsx
   for why the first two are both needed, and the note atop
   service-detail.css for how .sd-hero couples to the transparent header. */
import "@/styles/home-redesign.css";
import "@/styles/home-chrome.css";
import "@/styles/service-detail.css";

/**
 * /services/gohighlevel-sub-accounts.
 *
 * Six sections: the hero, the full configuration list, the six areas the
 * build covers, the five steps it runs in, who it is for, and the FAQ that
 * doubles as the contact card. Each section closes with a call to action, so
 * a reader convinced by any one of them does not have to scroll back.
 *
 */

/* -- Sections -------------------------------------------------------------- */

function Hero() {
  return (
    <section className="sd-hero">
      <div className="hv-container sd-hero__inner">
        <Reveal>
          <p className="sd-hero__crumbs">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/services">Services</Link>
            <span>/</span>
            GoHighLevel Sub-accounts
          </p>

          <span className="sd-hero__eyebrow">{GHL_HERO.eyebrow}</span>

          <h1 className="sd-hero__title">
            {GHL_HERO.titleLead}
            <span>{GHL_HERO.titleAccent}</span>
          </h1>

          <p className="sd-hero__lede">{GHL_HERO.lede}</p>

          <div className="sd-hero__ctas">
            <Btn to={GHL_HERO.primary.to} variant="primary" size="lg" iconAfter={GHL_HERO.primary.icon}>
              {GHL_HERO.primary.label}
            </Btn>
            <Btn href={GHL_HERO.secondary.href} variant="outline" size="lg">
              {GHL_HERO.secondary.label}
            </Btn>
          </div>

        </Reveal>
      </div>
    </section>
  );
}

/**
 * The configuration list: twelve decisions, in two columns on a wide screen.
 * It is a real checklist rather than benefit copy, because this is the part
 * of the service a buyer is actually assessing, and the length of it is the
 * argument.
 */
function Setup() {
  return (
    <HvSection id="setup" className="sd-setup">
      <div className="sd-split">
        <Reveal>
          <span className="hv-eyebrow">{GHL_SETUP.eyebrow}</span>
          <h2 className="sd-why__title">{GHL_SETUP.title}</h2>
          <p className="hv-lede">{GHL_SETUP.lede}</p>

          <Checks items={GHL_SETUP.checks} className="sd-setup__checks" />

          <div className="sd-split__cta">
            <Btn to={GHL_SETUP.cta.to} variant="primary" iconAfter="arrowRight">
              {GHL_SETUP.cta.label}
            </Btn>
          </div>
        </Reveal>

        <Reveal className="sd-setup__media" index={1}>
          <div className="sd-figure__frame">
            <picture>
              <source type="image/webp" srcSet={GHL_SETUP.imageWebp} />
              <img
                src={GHL_SETUP.image}
                alt={GHL_SETUP.imageAlt}
                width={1240}
                height={930}
                loading="lazy"
                decoding="async"
              />
            </picture>
          </div>

          <div className="sd-setup__note" aria-hidden="true">
            <ScriptNote direction="down-left">{GHL_SETUP.note}</ScriptNote>
          </div>
        </Reveal>
      </div>
    </HvSection>
  );
}

function BuildAreas() {
  return (
    <HvSection className="sd-caps">
      <Reveal className="sd-grid-head">
        <span className="hv-eyebrow">{GHL_GRID.eyebrow}</span>
        <h2 className="hv-h2">{GHL_GRID.title}</h2>
        <p className="sd-sub">{GHL_GRID.subtitle}</p>
        <p className="hv-body">{GHL_GRID.lede}</p>
      </Reveal>

      <ul className="sd-grid">
        {GHL_GRID.items.map((item, i) => (
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

      <Reveal className="sd-cta-row">
        <Btn to={GHL_GRID.cta.to} variant="primary" size="lg" iconAfter="arrowRight">
          {GHL_GRID.cta.label}
        </Btn>
      </Reveal>
    </HvSection>
  );
}

function Process() {
  return (
    <HvSection dark className="sd-proc">
      <div className="sd-proc__inner">
        <Reveal>
          <span className="hv-eyebrow">{GHL_PROCESS.eyebrow}</span>
          <h2 className="hv-h2">{GHL_PROCESS.title}</h2>
          <p className="hv-body">{GHL_PROCESS.lede}</p>

          <ol className="sd-steps">
            {GHL_PROCESS.steps.map((step, i) => (
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
            <Btn to={GHL_PROCESS.cta.to} variant="primary" size="lg" iconAfter={GHL_PROCESS.cta.icon}>
              {GHL_PROCESS.cta.label}
            </Btn>
          </div>
        </Reveal>

        <Reveal className="sd-proc__media" index={1}>
          <div className="sd-proc__frame">
            <picture>
              <source type="image/webp" srcSet={GHL_PROCESS.imageWebp} />
              <img
                src={GHL_PROCESS.image}
                alt={GHL_PROCESS.imageAlt}
                width={1240}
                height={930}
                loading="lazy"
                decoding="async"
              />
            </picture>
          </div>

          <div className="sd-proc__chips" aria-hidden="true">
            {GHL_PROCESS.chips.map((chip) => (
              <span className="sd-proc__chip" key={chip.label}>
                <Icon name={chip.icon} />
                <span>{chip.label}</span>
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </HvSection>
  );
}

/** Who the build is for, three columns, each with the two or three things
 *  that matter most to that kind of business. */
function Who() {
  return (
    <HvSection className="sd-who">
      <Reveal className="sd-grid-head">
        <span className="hv-eyebrow">{GHL_WHO.eyebrow}</span>
        <h2 className="hv-h2">{GHL_WHO.title}</h2>
        <p className="hv-body">{GHL_WHO.lede}</p>
      </Reveal>

      <ul className="sd-who__grid">
        {GHL_WHO.groups.map((group, i) => (
          <Reveal as="li" key={group.title} index={i}>
            <article className="sd-who__card">
              <span className="sd-who__icon" aria-hidden="true">
                <Icon name={group.icon} strokeWidth={1.9} />
              </span>
              <h3>{group.title}</h3>
              <p>{group.body}</p>

              <ul className="sd-who__points">
                {group.points.map((point) => (
                  <li key={point}>
                    <Icon name="tick" aria-hidden="true" strokeWidth={3} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </ul>

      <Reveal className="sd-cta-row">
        <Btn to={GHL_WHO.cta.to} variant="primary" size="lg" iconAfter="arrowRight">
          {GHL_WHO.cta.label}
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
          <span className="hv-eyebrow">{GHL_INTRO.eyebrow}</span>
          <h2 className="sd-intro__title">{GHL_INTRO.title}</h2>

          <blockquote className="sd-intro__quote">
            <p>{GHL_INTRO.quote.text}</p>
            <span>{GHL_INTRO.quote.attribution}</span>
          </blockquote>
        </Reveal>

        <Reveal className="sd-intro__prose" index={1}>
          {GHL_INTRO.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </Reveal>
      </div>

      <Reveal as="ul" className="sd-facts" index={2}>
        {GHL_INTRO.facts.map((fact) => (
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
        <span className="hv-eyebrow">{GHL_DETAILS.eyebrow}</span>
        <h2 className="hv-h2">{GHL_DETAILS.title}</h2>
        <p className="hv-body">{GHL_DETAILS.lede}</p>
      </Reveal>

      <ul className="sd-details">
        {GHL_DETAILS.groups.map((group, i) => (
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

function UseCases() {
  return (
    <HvSection>
      <Reveal className="sd-grid-head">
        <span className="hv-eyebrow">{GHL_USECASES.eyebrow}</span>
        <h2 className="hv-h2">{GHL_USECASES.title}</h2>
        <p className="hv-lede">{GHL_USECASES.lede}</p>
      </Reveal>

      <ul className="sd-grid">
        {GHL_USECASES.items.map((item, i) => (
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
        <span className="hv-eyebrow">{GHL_WORK.eyebrow}</span>
        <h2 className="hv-h2">{GHL_WORK.title}</h2>
        <p className="hv-lede">{GHL_WORK.lede}</p>
      </Reveal>

      <ul className="sd-work">
        {GHL_WORK.items.map((item, i) => (
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
        {GHL_WORK.note}
      </Reveal>
    </HvSection>
  );
}

function Benefits() {
  return (
    <HvSection>
      <Reveal className="sd-grid-head">
        <span className="hv-eyebrow">{GHL_BENEFITS.eyebrow}</span>
        <h2 className="hv-h2">{GHL_BENEFITS.title}</h2>
        <p className="hv-body">{GHL_BENEFITS.lede}</p>
      </Reveal>

      <ul className="sd-bens">
        {GHL_BENEFITS.items.map((item, i) => (
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
      <StructuredData faq={GHL_FAQ.items} />

      <div className="sd-faq__inner">
        <Reveal>
          <span className="hv-eyebrow">{GHL_FAQ.eyebrow}</span>
          <h2 className="hv-h2">{GHL_FAQ.title}</h2>
          <p className="hv-body">{GHL_FAQ.lede}</p>

          <div className="sd-faq__list">
            <Faq items={GHL_FAQ.items} />
          </div>
        </Reveal>

        <ServiceContactCard card={GHL_FAQ.card} />
      </div>
    </HvSection>
  );
}

export default function ServiceGhlSubaccounts() {
  return (
    <Layout
      variant="v2"
      topbar={
        <>
          Platform set up years ago and never finished? <a href="/book">Book a configuration review</a>
        </>
      }
    >
      <PageMeta
        title="GoHighLevel Sub-accounts - GHLevelUp"
        description="Full sub-account builds: domain, numbers and A2P registration, calendars, pipelines, workflows, permissions and a snapshot you keep."
        ogDescription="A GoHighLevel sub-account configured end to end in the order that avoids rework, with compliance filed early, the team set up properly and a walkthrough at handover."
      />

      <div className="sd-pg">
        <Hero />
        <Intro />
        <Setup />
        <BuildAreas />
        <Process />
        <Details />
        <UseCases />
        <Work />
        <Benefits />
        <Who />
        <ServiceEnquiryForm
          service={GHL_ENQUIRY.service}
          eyebrow={GHL_ENQUIRY.eyebrow}
          title={GHL_ENQUIRY.title}
          lede={GHL_ENQUIRY.lede}
          points={GHL_ENQUIRY.points}
        />
        <RelatedServices
          slug="gohighlevel-sub-accounts"
          title="What to build on the platform first"
          lede="A configured sub-account is the starting line. These are the three builds that usually come next."
        />
        <FaqSection />
      </div>
    </Layout>
  );
}
