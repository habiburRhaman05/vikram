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
  WEB_HERO,
  WEB_ANATOMY,
  WEB_GRID,
  WEB_PROCESS,
  WEB_FIX,
  WEB_INTRO,
  WEB_DETAILS,
  WEB_USECASES,
  WEB_WORK,
  WEB_BENEFITS,
  WEB_ENQUIRY,
  WEB_FAQ,
} from "@/data/serviceWebsitesLanding.jsx";

/* v2 chrome plus the shared service detail stylesheet - see Industries.jsx
   for why the first two are both needed, and the note atop
   service-detail.css for how .sd-hero couples to the transparent header. */
import "@/styles/home-redesign.css";
import "@/styles/home-chrome.css";
import "@/styles/service-detail.css";

/**
 * /services/websites-landing-pages.
 *
 * Six sections: the hero, the six decisions a build gets right, the pieces
 * we build, the design-to-launch process, the four things that cost the
 * enquiry, and the FAQ that doubles as the contact card. Each section
 * carries its own call to action, so a reader convinced by any one of them
 * has somewhere to go without scrolling back to the header. The hero is
 * text-only, like every service page.
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
            Websites &amp; Landing Pages
          </p>

          <span className="sd-hero__eyebrow">{WEB_HERO.eyebrow}</span>

          <h1 className="sd-hero__title">
            {WEB_HERO.titleLead}
            <span>{WEB_HERO.titleAccent}</span>
          </h1>

          <p className="sd-hero__lede">{WEB_HERO.lede}</p>

          <div className="sd-hero__ctas">
            <Btn to={WEB_HERO.primary.to} variant="primary" size="lg" iconAfter={WEB_HERO.primary.icon}>
              {WEB_HERO.primary.label}
            </Btn>
            <Btn href={WEB_HERO.secondary.href} variant="outline" size="lg">
              {WEB_HERO.secondary.label}
            </Btn>
          </div>

        </Reveal>
      </div>
    </section>
  );
}

/**
 * The six decisions. Rendered as an ordered list because the order is the
 * point, with the "what it has to pass" line as a separate element rather
 * than a second paragraph: it is the acceptance test for that decision, not
 * more description.
 */
function Anatomy() {
  return (
    <HvSection id="anatomy" className="sd-anatomy-sec">
      <Reveal className="sd-grid-head">
        <span className="hv-eyebrow">{WEB_ANATOMY.eyebrow}</span>
        <h2 className="hv-h2">{WEB_ANATOMY.title}</h2>
        <p className="hv-body">{WEB_ANATOMY.lede}</p>
      </Reveal>

      <ol className="sd-anatomy">
        {WEB_ANATOMY.stages.map((stage, i) => (
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
        <Btn to={WEB_ANATOMY.cta.to} variant="primary" size="lg" iconAfter="arrowRight">
          {WEB_ANATOMY.cta.label}
        </Btn>

        <div className="sd-anatomy__note" aria-hidden="true">
          <ScriptNote direction="down-right">{WEB_ANATOMY.note}</ScriptNote>
        </div>
      </Reveal>
    </HvSection>
  );
}

function WhatWeBuild() {
  return (
    <HvSection className="sd-caps">
      <Reveal className="sd-grid-head">
        <span className="hv-eyebrow">{WEB_GRID.eyebrow}</span>
        <h2 className="hv-h2">{WEB_GRID.title}</h2>
        <p className="sd-sub">{WEB_GRID.subtitle}</p>
        <p className="hv-body">{WEB_GRID.lede}</p>
      </Reveal>

      <ul className="sd-grid">
        {WEB_GRID.items.map((item, i) => (
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
        <Btn to={WEB_GRID.cta.to} variant="primary" size="lg" iconAfter="arrowRight">
          {WEB_GRID.cta.label}
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
          <span className="hv-eyebrow">{WEB_PROCESS.eyebrow}</span>
          <h2 className="hv-h2">{WEB_PROCESS.title}</h2>
          <p className="hv-body">{WEB_PROCESS.lede}</p>

          <ol className="sd-steps">
            {WEB_PROCESS.steps.map((step, i) => (
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
            <Btn to={WEB_PROCESS.cta.to} variant="primary" size="lg" iconAfter={WEB_PROCESS.cta.icon}>
              {WEB_PROCESS.cta.label}
            </Btn>
          </div>
        </Reveal>

        <Reveal className="sd-proc__media" index={1}>
          <div className="sd-proc__frame">
            <picture>
              <source type="image/webp" srcSet={WEB_PROCESS.imageWebp} />
              <img
                src={WEB_PROCESS.image}
                alt={WEB_PROCESS.imageAlt}
                width={1240}
                height={930}
                loading="lazy"
                decoding="async"
              />
            </picture>
          </div>

          <div className="sd-proc__chips" aria-hidden="true">
            {WEB_PROCESS.chips.map((chip) => (
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
 * The four problems. A problem and its fix, paired row by row: the problem in
 * the reader's own terms, the fix as an instruction, so the section reads as
 * a checklist rather than a sales pitch.
 */
function Leaks() {
  return (
    <HvSection className="sd-leaks">
      <Reveal className="sd-grid-head">
        <span className="hv-eyebrow">{WEB_FIX.eyebrow}</span>
        <h2 className="hv-h2">{WEB_FIX.title}</h2>
        <p className="hv-body">{WEB_FIX.lede}</p>
      </Reveal>

      <ul className="sd-leaks__rows">
        {WEB_FIX.rows.map((row, i) => (
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
        <Btn to={WEB_FIX.cta.to} variant="primary" size="lg" iconAfter={WEB_FIX.cta.icon}>
          {WEB_FIX.cta.label}
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
          <span className="hv-eyebrow">{WEB_INTRO.eyebrow}</span>
          <h2 className="sd-intro__title">{WEB_INTRO.title}</h2>

          <blockquote className="sd-intro__quote">
            <p>{WEB_INTRO.quote.text}</p>
            <span>{WEB_INTRO.quote.attribution}</span>
          </blockquote>
        </Reveal>

        <Reveal className="sd-intro__prose" index={1}>
          {WEB_INTRO.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </Reveal>
      </div>

      <Reveal as="ul" className="sd-facts" index={2}>
        {WEB_INTRO.facts.map((fact) => (
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
        <span className="hv-eyebrow">{WEB_DETAILS.eyebrow}</span>
        <h2 className="hv-h2">{WEB_DETAILS.title}</h2>
        <p className="hv-body">{WEB_DETAILS.lede}</p>
      </Reveal>

      <ul className="sd-details">
        {WEB_DETAILS.groups.map((group, i) => (
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
        <span className="hv-eyebrow">{WEB_USECASES.eyebrow}</span>
        <h2 className="hv-h2">{WEB_USECASES.title}</h2>
        <p className="hv-lede">{WEB_USECASES.lede}</p>
      </Reveal>

      <ul className="sd-grid">
        {WEB_USECASES.items.map((item, i) => (
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
        <span className="hv-eyebrow">{WEB_WORK.eyebrow}</span>
        <h2 className="hv-h2">{WEB_WORK.title}</h2>
        <p className="hv-lede">{WEB_WORK.lede}</p>
      </Reveal>

      <ul className="sd-work">
        {WEB_WORK.items.map((item, i) => (
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
        {WEB_WORK.note}
      </Reveal>
    </HvSection>
  );
}

function Benefits() {
  return (
    <HvSection>
      <Reveal className="sd-grid-head">
        <span className="hv-eyebrow">{WEB_BENEFITS.eyebrow}</span>
        <h2 className="hv-h2">{WEB_BENEFITS.title}</h2>
        <p className="hv-body">{WEB_BENEFITS.lede}</p>
      </Reveal>

      <ul className="sd-bens">
        {WEB_BENEFITS.items.map((item, i) => (
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
      <StructuredData faq={WEB_FAQ.items} />

      <div className="sd-faq__inner">
        <Reveal>
          <span className="hv-eyebrow">{WEB_FAQ.eyebrow}</span>
          <h2 className="hv-h2">{WEB_FAQ.title}</h2>
          <p className="hv-body">{WEB_FAQ.lede}</p>

          <div className="sd-faq__list">
            <Faq items={WEB_FAQ.items} />
          </div>
        </Reveal>

        <ServiceContactCard card={WEB_FAQ.card} />
      </div>
    </HvSection>
  );
}

export default function ServiceWebsitesLanding() {
  return (
    <Layout
      variant="v2"
      topbar={
        <>
          Not sure what your site is costing you? <a href="/book">Book a site review</a>
        </>
      }
    >
      <PageMeta
        title="Websites & Landing Pages - GHLevelUp"
        description="Fast, responsive websites and landing pages built to convert - wired to your CRM, calendar and analytics, and tested on real devices before launch."
        ogDescription="Websites and landing pages built around the action you want: one promise above the fold, one obvious next step, speed and accessibility checked at launch."
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
          service={WEB_ENQUIRY.service}
          eyebrow={WEB_ENQUIRY.eyebrow}
          title={WEB_ENQUIRY.title}
          lede={WEB_ENQUIRY.lede}
          points={WEB_ENQUIRY.points}
        />
        <RelatedServices
          slug="websites-landing-pages"
          title="What makes a site earn its keep"
          lede="Pages bring people in. These decide whether an enquiry gets captured, answered and followed up."
        />
        <FaqSection />
      </div>
    </Layout>
  );
}
