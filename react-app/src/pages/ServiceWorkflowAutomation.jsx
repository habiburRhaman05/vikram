import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout.jsx";
import PageMeta from "@/components/common/PageMeta.jsx";
import Icon from "@/components/common/Icon.jsx";
import Faq from "@/components/common/Faq.jsx";
import StructuredData from "@/components/common/StructuredData.jsx";
import { HvSection, Reveal, Btn } from "@/components/home/primitives.jsx";
import ScriptNote from "@/components/home/ScriptNote.jsx";
import ServiceContactCard from "@/components/services/ServiceContactCard.jsx";
import ServiceEnquiryForm from "@/components/services/ServiceEnquiryForm.jsx";
import RelatedServices from "@/components/services/RelatedServices.jsx";

import {
  WF_HERO,
  WF_INTRO,
  WF_COMPARE,
  WF_GRID,
  WF_FLOW,
  WF_PROCESS,
  WF_DETAILS,
  WF_USECASES,
  WF_WORK,
  WF_BENEFITS,
  WF_ENQUIRY,
  WF_FAQ,
} from "@/data/serviceWorkflowAutomation.jsx";

/* v2 chrome (glass header, SiteFooterV2) plus the shared service detail
   stylesheet - see Industries.jsx for why the first two are both needed.
   service-detail.css carries .sd-hero (registered in home-chrome.css so the
   hero slides under the transparent header) and the card and step blocks.
   Every detail page uses the one brand green - the per-page hue system was
   removed, see section 12 of that file. */
import "@/styles/home-redesign.css";
import "@/styles/home-chrome.css";
import "@/styles/service-detail.css";

/**
 * /services/workflow-automation.
 *
 * Six sections, each closing with the next step rather than leaving the
 * reader to find the header button: a comparison, the six hand-offs we
 * build, a worked run of one lead, the build process, and the FAQ that
 * doubles as the contact card.
 *
 */

/* -- Sections -------------------------------------------------------------- */

/** The hero's flow mock: one trigger firing two parallel actions and
 *  landing on an outcome - the shape of an automation, not a screenshot of
 *  one. Hardcoded here rather than in the data file, same reasoning as the
 *  AI page's call-mock bubbles: it's decoration for this hero specifically,
 *  not page copy. */
function WfMock() {
  return (
    <div className="sd-heromock sd-wfmock" aria-hidden="true">
      <div className="sd-heromock__head">
        <span className="sd-heromock__badge">
          <Icon name="bolt" />
        </span>
        <div className="sd-heromock__who">
          <b>New booking</b>
          <span>Automation running</span>
        </div>
        <span className="sd-heromock__live">Live</span>
      </div>

      <div className="sd-wfmock__body">
        <div className="sd-wfmock__node sd-wfmock__node--trigger">
          <Icon name="bolt" />
          Booking confirmed
        </div>

        <span className="sd-wfmock__link" />

        <div className="sd-wfmock__branches">
          <div className="sd-wfmock__node">
            <Icon name="mail" />
            Confirmation sent
          </div>
          <div className="sd-wfmock__node">
            <Icon name="calendar" />
            Reminder started
          </div>
        </div>

        <span className="sd-wfmock__link" />

        <div className="sd-wfmock__node sd-wfmock__node--done">
          <Icon name="check" />
          CRM record updated
        </div>
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
            Workflow Automation
        </Reveal>

        <Reveal>
          <span className="sd-hero__eyebrow">{WF_HERO.eyebrow}</span>

          <h1 className="sd-hero__title">
            {WF_HERO.titleLead}
            <span>{WF_HERO.titleAccent}</span>
          </h1>

          <p className="sd-hero__lede">{WF_HERO.lede}</p>

          <div className="sd-hero__ctas">
            <Btn to={WF_HERO.primary.to} variant="primary" size="lg" iconAfter={WF_HERO.primary.icon}>
              {WF_HERO.primary.label}
            </Btn>
            <Btn href={WF_HERO.secondary.href} variant="outline" size="lg">
              {WF_HERO.secondary.label}
            </Btn>
          </div>
        </Reveal>

        <Reveal index={1}>
          <WfMock />
        </Reveal>
      </div>
    </section>
  );
}

/**
 * The before and after. Two columns of the same five steps, so the reader
 * can check the claim against their own week rather than take a benefit
 * bullet's word for it. On a phone the pairs stack with the "before" line
 * above its own "after" line, which is the only order that reads.
 */
function Comparison() {
  return (
    <HvSection className="sd-compare">
      <div className="sd-split">
        <Reveal>
          <span className="hv-eyebrow">{WF_COMPARE.eyebrow}</span>
          <h2 className="sd-why__title">{WF_COMPARE.title}</h2>
          <p className="hv-lede">{WF_COMPARE.lede}</p>

          <div className="sd-compare__cta">
            <Btn to={WF_COMPARE.cta.to} variant="primary" iconAfter="arrowRight">
              {WF_COMPARE.cta.label}
            </Btn>
          </div>
        </Reveal>

        <Reveal className="sd-compare__media" index={1}>
          <div className="sd-compare__head">
            <span>{WF_COMPARE.columns.before}</span>
            <span>{WF_COMPARE.columns.after}</span>
          </div>

          <ul className="sd-compare__rows">
            {WF_COMPARE.rows.map((row) => (
              <li className="sd-compare__row" key={row.before}>
                <span className="sd-compare__before">{row.before}</span>
                <span className="sd-compare__after">
                  <Icon name="arrowRight" aria-hidden="true" strokeWidth={2.4} />
                  <span>{row.after}</span>
                </span>
              </li>
            ))}
          </ul>

     
        </Reveal>
      </div>
    </HvSection>
  );
}

function WhatWeAutomate() {
  return (
    <HvSection id="capabilities" className="sd-caps">
      <Reveal className="sd-grid-head">
        <span className="hv-eyebrow">{WF_GRID.eyebrow}</span>
        <h2 className="hv-h2">{WF_GRID.title}</h2>
        <p className="sd-sub">{WF_GRID.subtitle}</p>
        <p className="hv-body">{WF_GRID.lede}</p>
      </Reveal>

      <ul className="sd-grid">
        {WF_GRID.items.map((item, i) => (
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
        <Btn to={WF_GRID.cta.to} variant="primary" size="lg" iconAfter="arrowRight">
          {WF_GRID.cta.label}
        </Btn>
      </Reveal>
    </HvSection>
  );
}

/**
 * One lead, start to finish: a numbered timeline beside the board photo.
 * It is a real sequence with real timings, which is why it gets headings and
 * a caption rather than the aria-hidden treatment the decoration gets.
 */
function Flow() {
  return (
    <HvSection dark className="sd-flow">
      <div className="sd-flow__inner">
        <Reveal>
          <span className="hv-eyebrow">{WF_FLOW.eyebrow}</span>
          <h2 className="sd-impact__title">{WF_FLOW.title}</h2>
          <p className="hv-lede">{WF_FLOW.lede}</p>

          {/* Keyed on title, not time: two steps deliberately share the same
              clock time ("08:41" twice - that is the point of the copy),
              which made `time` a duplicate React key. */}
          <ol className="sd-steps">
            {WF_FLOW.steps.map((step, i) => (
              <Reveal as="li" className="sd-step" key={step.title} index={i}>
                <span className="sd-step__num" aria-hidden="true">
                  {step.time}
                </span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>

          <div className="sd-flow__cta">
            <Btn to={WF_FLOW.cta.to} variant="primary" size="lg" iconAfter={WF_FLOW.cta.icon}>
              {WF_FLOW.cta.label}
            </Btn>
          </div>
        </Reveal>

        <Reveal className="sd-flow__media" index={1}>
          <figure className="sd-figure">
            <div className="sd-figure__frame">
              <picture>
                <source type="image/webp" srcSet={WF_FLOW.imageWebp} />
                <img
                  src={WF_FLOW.image}
                  alt={WF_FLOW.imageAlt}
                  width={1240}
                  height={930}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </div>
            <figcaption className="sd-figure__caption">{WF_FLOW.caption}</figcaption>
          </figure>
        </Reveal>
      </div>
    </HvSection>
  );
}

/** Five steps, laid out as one row rather than a column with a rail: the
 *  order matters, but nothing here has a long body, and a row lets the
 *  reader take the sequence in at once. */
function Process() {
  return (
    <HvSection className="sd-proc-plain">
      <Reveal className="sd-grid-head">
        <span className="hv-eyebrow">{WF_PROCESS.eyebrow}</span>
        <h2 className="hv-h2">{WF_PROCESS.title}</h2>
        <p className="hv-body">{WF_PROCESS.lede}</p>
      </Reveal>

      <ol className="sd-steps sd-steps--row">
        {WF_PROCESS.steps.map((step, i) => (
          <Reveal as="li" className="sd-step" key={step.num} index={i}>
            <span className="sd-step__num" aria-hidden="true">
              {step.num}
            </span>
            <div>
              <span className="sd-step__icon" aria-hidden="true">
                <Icon name={step.icon} strokeWidth={1.9} />
              </span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
          </Reveal>
        ))}
      </ol>

      <Reveal className="sd-cta-row">
        <Btn to={WF_PROCESS.cta.to} variant="primary" size="lg" iconAfter="arrowRight">
          {WF_PROCESS.cta.label}
        </Btn>
      </Reveal>
    </HvSection>
  );
}

/**
 * What automation actually is. The facts strip on this page sits INSIDE the
 * left column under the pull quote rather than as a full-width band, because
 * this page's numbers are qualitative ("every run leaves a record") and read
 * better as a tight block than as four big display figures.
 */
function Intro() {
  return (
    <HvSection className="sd-intro">
      <div className="sd-intro__inner">
        <Reveal className="sd-intro__aside">
          <span className="hv-eyebrow">{WF_INTRO.eyebrow}</span>
          <h2 className="sd-intro__title">{WF_INTRO.title}</h2>

          <blockquote className="sd-intro__quote">
            <p>{WF_INTRO.quote.text}</p>
            <span>{WF_INTRO.quote.attribution}</span>
          </blockquote>
        </Reveal>

        <Reveal className="sd-intro__prose" index={1}>
          {WF_INTRO.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </Reveal>
      </div>

      <Reveal as="ul" className="sd-facts" index={2}>
        {WF_INTRO.facts.map((fact) => (
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
        <span className="hv-eyebrow">{WF_DETAILS.eyebrow}</span>
        <h2 className="hv-h2">{WF_DETAILS.title}</h2>
        <p className="hv-body">{WF_DETAILS.lede}</p>
      </Reveal>

      <ul className="sd-details">
        {WF_DETAILS.groups.map((group, i) => (
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
        <span className="hv-eyebrow">{WF_USECASES.eyebrow}</span>
        <h2 className="hv-h2">{WF_USECASES.title}</h2>
        <p className="hv-lede">{WF_USECASES.lede}</p>
      </Reveal>

      <ul className="sd-grid">
        {WF_USECASES.items.map((item, i) => (
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
 *  says so, and no figure on this page is attached to a named engagement. */
function Work() {
  return (
    <HvSection mint>
      <Reveal className="sd-grid-head">
        <span className="hv-eyebrow">{WF_WORK.eyebrow}</span>
        <h2 className="hv-h2">{WF_WORK.title}</h2>
        <p className="hv-lede">{WF_WORK.lede}</p>
      </Reveal>

      <ul className="sd-work">
        {WF_WORK.items.map((item, i) => (
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

     
    </HvSection>
  );
}

function Benefits() {
  return (
    <HvSection>
      <Reveal className="sd-grid-head">
        <span className="hv-eyebrow">{WF_BENEFITS.eyebrow}</span>
        <h2 className="hv-h2">{WF_BENEFITS.title}</h2>
        <p className="hv-body">{WF_BENEFITS.lede}</p>
      </Reveal>

      <ul className="sd-bens">
        {WF_BENEFITS.items.map((item, i) => (
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
        faq={WF_FAQ.items}
        service={SEO}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: SEO.name, path: `/services/${SEO.slug}` },
        ]}
      />

      <div className="sd-faq__inner">
        <Reveal>
          <span className="hv-eyebrow">{WF_FAQ.eyebrow}</span>
          <h2 className="hv-h2">{WF_FAQ.title}</h2>
          <p className="hv-body">{WF_FAQ.lede}</p>

          <div className="sd-faq__list">
            <Faq items={WF_FAQ.items} />
          </div>
        </Reveal>

        <ServiceContactCard card={WF_FAQ.card} />
      </div>
    </HvSection>
  );
}

/* One definition of this page's search identity, read by both its <PageMeta>
   and its Service structured data below - so the title, the description and
   the schema can never describe the same page three slightly different ways. */
const SEO = {
  slug: "workflow-automation",
  name: "Workflow Automation",
  description:
    "Lead routing, follow-up sequences, quotes, hand-offs and appointment setting built as automations that run on time and record what they did.",
  ogDescription:
    "The repeat work your team does by hand, moved into the system: lead capture and routing, follow-up, quotes, internal hand-offs and exceptions you actually hear about.",
};

export default function ServiceWorkflowAutomation() {
  return (
    <Layout
      variant="v2"
      topbar={
        <>
          Still answering the same questions by hand? <a href="/book">Book a workflow review</a>
        </>
      }
    >
      <PageMeta title={`${SEO.name} - GHLevelUp`} description={SEO.description} ogDescription={SEO.ogDescription} />

      <div className="sd-pg">
        <Hero />
        <Intro />
        <Comparison />
        <WhatWeAutomate />
        <Flow />
        <Details />
        <Process />
        <UseCases />
        <Work />
        <Benefits />
        <ServiceEnquiryForm
          service={WF_ENQUIRY.service}
          eyebrow={WF_ENQUIRY.eyebrow}
          title={WF_ENQUIRY.title}
          lede={WF_ENQUIRY.lede}
          points={WF_ENQUIRY.points}
        />
        {/* <RelatedServices
          slug="workflow-automation"
          title="What automation needs either side of it"
          lede="A workflow is the middle of a chain. These cover the end that catches the enquiry and the end that carries the data."
        /> */}
        <FaqSection />
      </div>
    </Layout>
  );
}
