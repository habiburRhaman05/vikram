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
  FNL_HERO,
  FNL_ANATOMY,
  FNL_GRID,
  FNL_PROCESS,
  FNL_FIX,
  FNL_INTRO,
  FNL_DETAILS,
  FNL_USECASES,
  FNL_WORK,
  FNL_BENEFITS,
  FNL_ENQUIRY,
  FNL_FAQ,
} from "@/data/serviceFunnelBuilds.jsx";

/* v2 chrome plus the shared service detail stylesheet - see Industries.jsx
   for why the first two are both needed, and the note atop
   service-detail.css for how .sd-hero couples to the transparent header. */
import "@/styles/home-redesign.css";
import "@/styles/home-chrome.css";
import "@/styles/service-detail.css";

/**
 * /services/funnel-design-builds.
 *
 * Six sections: the hero, the five stages a funnel is made of, the pieces we
 * build, the design to launch process, the four leaks worth fixing first,
 * and the FAQ that doubles as the contact card. Each section carries its own
 * call to action, so a reader convinced by any one of them has somewhere to
 * go without scrolling back to the header.
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
            Funnel Design &amp; Builds
          </p>

          <span className="sd-hero__eyebrow">{FNL_HERO.eyebrow}</span>

          <h1 className="sd-hero__title">
            {FNL_HERO.titleLead}
            <span>{FNL_HERO.titleAccent}</span>
          </h1>

          <p className="sd-hero__lede">{FNL_HERO.lede}</p>

          <div className="sd-hero__ctas">
            <Btn to={FNL_HERO.primary.to} variant="primary" size="lg" iconAfter={FNL_HERO.primary.icon}>
              {FNL_HERO.primary.label}
            </Btn>
            <Btn href={FNL_HERO.secondary.href} variant="outline" size="lg">
              {FNL_HERO.secondary.label}
            </Btn>
          </div>

        </Reveal>
      </div>
    </section>
  );
}

/**
 * The five stages. Rendered as an ordered list because the order is the
 * point, with the "what it has to do" line as a separate element rather
 * than a second paragraph: it is the acceptance test for that stage, not
 * more description.
 */
function Anatomy() {
  return (
    <HvSection id="anatomy" className="sd-anatomy-sec">
      <Reveal className="sd-grid-head">
        <span className="hv-eyebrow">{FNL_ANATOMY.eyebrow}</span>
        <h2 className="hv-h2">{FNL_ANATOMY.title}</h2>
        <p className="hv-body">{FNL_ANATOMY.lede}</p>
      </Reveal>

      <ol className="sd-anatomy">
        {FNL_ANATOMY.stages.map((stage, i) => (
          <Reveal as="li" className="sd-anatomy__row" key={stage.num} index={i}>
            <span className="sd-anatomy__num" aria-hidden="true">
              {stage.num}
            </span>

            <div className="sd-anatomy__body">
              <h3>{stage.title}</h3>
              <p>{stage.body}</p>
            </div>

            <span className="sd-anatomy__want">
              <Icon name="tick" aria-hidden="true" strokeWidth={3} />
              {stage.want}
            </span>

            <span className="sd-anatomy__icon" aria-hidden="true">
              <Icon name={stage.icon} strokeWidth={1.9} />
            </span>
          </Reveal>
        ))}
      </ol>

      <Reveal className="sd-anatomy__foot">
        <Btn to={FNL_ANATOMY.cta.to} variant="primary" size="lg" iconAfter="arrowRight">
          {FNL_ANATOMY.cta.label}
        </Btn>

        <div className="sd-anatomy__note" aria-hidden="true">
          <ScriptNote direction="down-right">{FNL_ANATOMY.note}</ScriptNote>
        </div>
      </Reveal>
    </HvSection>
  );
}

function WhatWeBuild() {
  return (
    <HvSection className="sd-caps">
      <Reveal className="sd-grid-head">
        <span className="hv-eyebrow">{FNL_GRID.eyebrow}</span>
        <h2 className="hv-h2">{FNL_GRID.title}</h2>
        <p className="sd-sub">{FNL_GRID.subtitle}</p>
        <p className="hv-body">{FNL_GRID.lede}</p>
      </Reveal>

      <ul className="sd-grid">
        {FNL_GRID.items.map((item, i) => (
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
        <Btn to={FNL_GRID.cta.to} variant="primary" size="lg" iconAfter="arrowRight">
          {FNL_GRID.cta.label}
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
          <span className="hv-eyebrow">{FNL_PROCESS.eyebrow}</span>
          <h2 className="hv-h2">{FNL_PROCESS.title}</h2>
          <p className="hv-body">{FNL_PROCESS.lede}</p>

          <ol className="sd-steps">
            {FNL_PROCESS.steps.map((step, i) => (
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
            <Btn to={FNL_PROCESS.cta.to} variant="primary" size="lg" iconAfter={FNL_PROCESS.cta.icon}>
              {FNL_PROCESS.cta.label}
            </Btn>
          </div>
        </Reveal>

        <Reveal className="sd-proc__media" index={1}>
          <div className="sd-proc__frame">
            <picture>
              <source type="image/webp" srcSet={FNL_PROCESS.imageWebp} />
              <img
                src={FNL_PROCESS.image}
                alt={FNL_PROCESS.imageAlt}
                width={1240}
                height={930}
                loading="lazy"
                decoding="async"
              />
            </picture>
          </div>

          <div className="sd-proc__chips" aria-hidden="true">
            {FNL_PROCESS.chips.map((chip) => (
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

/**
 * The four leaks. A problem and its fix, paired row by row: the problem in
 * the reader's own terms, the fix as an instruction, so the section reads as
 * a checklist rather than a sales pitch.
 */
function Leaks() {
  return (
    <HvSection className="sd-leaks">
      <Reveal className="sd-grid-head">
        <span className="hv-eyebrow">{FNL_FIX.eyebrow}</span>
        <h2 className="hv-h2">{FNL_FIX.title}</h2>
        <p className="hv-body">{FNL_FIX.lede}</p>
      </Reveal>

      <ul className="sd-leaks__rows">
        {FNL_FIX.rows.map((row, i) => (
          <Reveal as="li" className="sd-leaks__row" key={row.problem} index={i}>
            <span className="sd-leaks__problem">
              <Icon name="close" aria-hidden="true" strokeWidth={2.4} />
              <span>{row.problem}</span>
            </span>

            <span className="sd-leaks__arrow" aria-hidden="true">
              <Icon name="arrowRight" strokeWidth={2.2} />
            </span>

            <span className="sd-leaks__fix">
              <Icon name="tick" aria-hidden="true" strokeWidth={3} />
              <span>{row.fix}</span>
            </span>
          </Reveal>
        ))}
      </ul>

      <Reveal className="sd-cta-row">
        <Btn to={FNL_FIX.cta.to} variant="primary" size="lg" iconAfter={FNL_FIX.cta.icon}>
          {FNL_FIX.cta.label}
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
          <span className="hv-eyebrow">{FNL_INTRO.eyebrow}</span>
          <h2 className="sd-intro__title">{FNL_INTRO.title}</h2>

          <blockquote className="sd-intro__quote">
            <p>{FNL_INTRO.quote.text}</p>
            <span>{FNL_INTRO.quote.attribution}</span>
          </blockquote>
        </Reveal>

        <Reveal className="sd-intro__prose" index={1}>
          {FNL_INTRO.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </Reveal>
      </div>

      <Reveal as="ul" className="sd-facts" index={2}>
        {FNL_INTRO.facts.map((fact) => (
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
        <span className="hv-eyebrow">{FNL_DETAILS.eyebrow}</span>
        <h2 className="hv-h2">{FNL_DETAILS.title}</h2>
        <p className="hv-body">{FNL_DETAILS.lede}</p>
      </Reveal>

      <ul className="sd-details">
        {FNL_DETAILS.groups.map((group, i) => (
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
        <span className="hv-eyebrow">{FNL_USECASES.eyebrow}</span>
        <h2 className="hv-h2">{FNL_USECASES.title}</h2>
        <p className="hv-lede">{FNL_USECASES.lede}</p>
      </Reveal>

      <ul className="sd-grid">
        {FNL_USECASES.items.map((item, i) => (
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
        <span className="hv-eyebrow">{FNL_WORK.eyebrow}</span>
        <h2 className="hv-h2">{FNL_WORK.title}</h2>
        <p className="hv-lede">{FNL_WORK.lede}</p>
      </Reveal>

      <ul className="sd-work">
        {FNL_WORK.items.map((item, i) => (
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
        {FNL_WORK.note}
      </Reveal>
    </HvSection>
  );
}

function Benefits() {
  return (
    <HvSection>
      <Reveal className="sd-grid-head">
        <span className="hv-eyebrow">{FNL_BENEFITS.eyebrow}</span>
        <h2 className="hv-h2">{FNL_BENEFITS.title}</h2>
        <p className="hv-body">{FNL_BENEFITS.lede}</p>
      </Reveal>

      <ul className="sd-bens">
        {FNL_BENEFITS.items.map((item, i) => (
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
      <StructuredData faq={FNL_FAQ.items} />

      <div className="sd-faq__inner">
        <Reveal>
          <span className="hv-eyebrow">{FNL_FAQ.eyebrow}</span>
          <h2 className="hv-h2">{FNL_FAQ.title}</h2>
          <p className="hv-body">{FNL_FAQ.lede}</p>

          <div className="sd-faq__list">
            <Faq items={FNL_FAQ.items} />
          </div>
        </Reveal>

        <ServiceContactCard card={FNL_FAQ.card} />
      </div>
    </HvSection>
  );
}

export default function ServiceFunnelBuilds() {
  return (
    <Layout
      variant="v2"
      topbar={
        <>
          Have an offer that deserves its own page? <a href="/book">Book a funnel review</a>
        </>
      }
    >
      <PageMeta
        title="Funnel Design & Builds - GHLevelUp"
        description="Landing pages, lead forms, booking flows and follow-up built around one offer and one action, connected to your CRM and calendar."
        ogDescription="Funnel design and builds for a single offer: the promise, the page, the form, the booking and the follow-up, tested on real devices before launch."
      />

      <div className="sd-pg">
        <Hero />
        <Intro />
        <Anatomy />
        <WhatWeBuild />
        <Process />
        <Details />
        <UseCases />
        <Work />
        <Benefits />
        <Leaks />
        <ServiceEnquiryForm
          service={FNL_ENQUIRY.service}
          eyebrow={FNL_ENQUIRY.eyebrow}
          title={FNL_ENQUIRY.title}
          lede={FNL_ENQUIRY.lede}
          points={FNL_ENQUIRY.points}
        />
        <RelatedServices
          slug="funnel-design-builds"
          title="What a funnel needs around it"
          lede="The path converts, then something has to build it and something has to answer it. Those three pieces are here."
        />
        <FaqSection />
      </div>
    </Layout>
  );
}
