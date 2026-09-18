import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout.jsx";
import PageMeta from "@/components/common/PageMeta.jsx";
import Icon from "@/components/common/Icon.jsx";
import Faq from "@/components/common/Faq.jsx";
import StructuredData from "@/components/common/StructuredData.jsx";
import { HvSection, Reveal, Btn } from "@/components/home/primitives.jsx";
import ServiceEnquiryForm from "@/components/services/ServiceEnquiryForm.jsx";
import RelatedServices from "@/components/services/RelatedServices.jsx";
import { SITE } from "@/data/site";
import { TESTIMONIALS } from "@/data/homeV2";

import {
  CS_HERO,
  CS_OVERVIEW,
  CS_INCLUDED,
  CS_PROCESS,
  CS_WHO,
  CS_WHY,
  CS_FAQ,
  CS_ENQUIRY,
  CS_CLOSING,
} from "@/data/serviceCrmSetup.jsx";

/* v2 chrome plus this page's OWN stylesheet. service-detail.css is loaded
   only for RelatedServices' .sd-rel classes - every section this page owns
   is styled by service-crm-setup.css under cs- classes. See the note atop
   that file for how this page's layout language differs from every other
   service page's. */
import "@/styles/home-redesign.css";
import "@/styles/home-chrome.css";
import "@/styles/service-detail.css";
import "@/styles/service-crm-setup.css";

/**
 * /services/crm-sub-account-setup.
 *
 * Section order is the one specified for this page: hero overview, the
 * detailed overview with a visual, what's included, how it works (with a
 * proof panel per step and a journey bar), who we work with, why
 * GHLevelUp, FAQ, client reviews, then the closing CTA and contact block.
 *
 * Layout language is "blueprint / spec sheet" and is deliberately not
 * reused from any other service page: an architecture tree in the hero, a
 * two-panel before/after account state, a sticky category rail beside a
 * full-width checklist ledger, a stepper where each phase carries a coded
 * mock of the artefact it produces, and numbered reason rows.
 *
 * REVIEWS: renders the site's existing TESTIMONIALS (the same three on the
 * home page) rather than inventing a second set of client quotes. Those are
 * still placeholder identities and need replacing with real, approved
 * reviews before launch - see the note in data/serviceCrmSetup.jsx.
 */

/* -- 1. Hero ------------------------------------------------------------------ */


function Hero() {
  return (
    <section className="cs-hero">
      <div className="hv-container cs-hero__inner">
        <Reveal as="p" className="cs-hero__crumbs">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/services">Services</Link>
          <span>/</span>
          {CS_HERO.crumb}
        </Reveal>

        <Reveal className="cs-hero__copy">
          <span className="cs-hero__eyebrow">{CS_HERO.eyebrow}</span>
          <h1 className="cs-hero__title">
            {CS_HERO.titleLead}
            <span>{CS_HERO.titleAccent}</span>
          </h1>
          <p className="cs-hero__lede">{CS_HERO.lede}</p>
          <div className="cs-hero__ctas">
            <Btn to={CS_HERO.primary.to} variant="primary" size="lg" iconAfter={CS_HERO.primary.icon}>
              {CS_HERO.primary.label}
            </Btn>
            <Btn href={CS_HERO.secondary.href} variant="outline" size="lg">
              {CS_HERO.secondary.label}
            </Btn>
          </div>
        </Reveal>

        {/* The hero's right column is the supplied artwork: a configured
            account on screen - sidebar, pipeline board, stage cards and
            the reporting rail - which is what this service hands over.
            It replaces the coded architecture tree, which drew the same
            structure as a diagram and was competing with the before/after
            account panel in the section directly below it.

            Decorative: alt="" and aria-hidden. Every part of the build it
            shows is named in the lede and in "What's included", so a
            description of the screenshot would be a second, vaguer telling
            of the same thing.

            Not lazy and fetchPriority="high": this is the hero image on a
            page people arrive at cold, so it is the LCP candidate, and
            deferring it is deferring first paint. The 1240px sources are
            generated from public/crm-setup.png (1536px, 1.7MB) - see the
            note in service-crm-setup.css. */}
        <Reveal className="cs-hero__viz" index={1}>
          <picture className="cs-hero__art">
            <source type="image/webp" srcSet="/img/services/crm-setup-hero.webp" />
            <img
              src="/img/services/crm-setup-hero.jpg"
              alt=""
              aria-hidden="true"
              width={1240}
              height={827}
              decoding="async"
              fetchPriority="high"
            />
          </picture>
        </Reveal>
      </div>
    </section>
  );
}

/* -- 2. Overview + before/after visual --------------------------------------- */

function Overview() {
  const { states } = CS_OVERVIEW;
  return (
    <HvSection className="cs-overview">
      <div className="cs-overview__grid">
        <Reveal className="cs-overview__copy">
          <span className="hv-eyebrow">{CS_OVERVIEW.eyebrow}</span>
          <h2 className="hv-h2">{CS_OVERVIEW.title}</h2>
          {CS_OVERVIEW.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Reveal>

        <Reveal className="cs-states" index={1}>
          <div className="cs-state cs-state--before">
            <span className="cs-state__label">{states.beforeLabel}</span>
            <ul>
              {states.before.map((s) => (
                <li key={s}>
                  <Icon name="close" aria-hidden="true" strokeWidth={2.4} />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <span className="cs-states__arrow" aria-hidden="true">
            <Icon name="arrowDown" strokeWidth={2.4} />
          </span>

          <div className="cs-state cs-state--after">
            <span className="cs-state__label">{states.afterLabel}</span>
            <ul>
              {states.after.map((s) => (
                <li key={s}>
                  <Icon name="tick" aria-hidden="true" strokeWidth={3} />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </HvSection>
  );
}

/* -- 3. What's included: card grid -------------------------------------------- */

function Included() {
  return (
    <HvSection id="included" mint className="cs-included">
      <Reveal className="cs-head cs-head--center">
        <span className="hv-eyebrow">{CS_INCLUDED.eyebrow}</span>
        <h2 className="hv-h2">{CS_INCLUDED.title}</h2>
        <p className="hv-lede">{CS_INCLUDED.lede}</p>
      </Reveal>

      <ul className="cs-included__grid">
        {CS_INCLUDED.groups.map((g, i) => (
          <Reveal as="li" key={g.id} index={i}>
            <article className="cs-included__card">
              <span className="cs-included__icon" aria-hidden="true">
                <Icon name={g.icon} />
              </span>
              <span className="cs-included__tag">{g.label}</span>
              <h3>{g.title}</h3>
              <ul>
                {g.items.map((item) => (
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

/* -- 4. How it works: journey bar + stepper with proof panels ---------------- */

/** The per-phase proof panel. One component, four shapes - which one
 *  renders is driven by `proof.kind` in the data rather than by four
 *  near-identical components. */
function ProofPanel({ proof }) {
  return (
    <div className="cs-proof" aria-hidden="true">
      <span className="cs-proof__cap">{proof.caption}</span>

      {proof.kind === "notes" && (
        <ul className="cs-proof__notes">
          {proof.lines.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      )}

      {proof.kind === "pipeline" && (
        <ol className="cs-proof__pipeline">
          {proof.stages.map((s, i) => (
            <li key={s}>
              <span>{i + 1}</span>
              {s}
            </li>
          ))}
        </ol>
      )}

      {proof.kind === "status" && (
        <ul className="cs-proof__status">
          {proof.rows.map((r) => (
            <li key={r.label} className={r.state === "done" ? "is-done" : "is-pending"}>
              <Icon name={r.state === "done" ? "check" : "clock"} />
              {r.label}
            </li>
          ))}
        </ul>
      )}

      {proof.kind === "checks" && (
        <ul className="cs-proof__checks">
          {proof.items.map((c) => (
            <li key={c}>
              <Icon name="tick" strokeWidth={3} />
              {c}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Process() {
  return (
    <HvSection dark className="cs-process">
      <Reveal className="cs-head cs-head--center">
        <span className="hv-eyebrow">{CS_PROCESS.eyebrow}</span>
        <h2 className="hv-h2">{CS_PROCESS.title}</h2>
        <p className="hv-body">{CS_PROCESS.lede}</p>
      </Reveal>

      <Reveal as="ol" className="cs-journey" index={1}>
        {CS_PROCESS.journey.map((j) => (
          <li key={j.label}>
            <span className="cs-journey__dot" aria-hidden="true" />
            <b>{j.label}</b>
            <span>{j.when}</span>
          </li>
        ))}
      </Reveal>

      <ol className="cs-steps">
        {CS_PROCESS.steps.map((step, i) => (
          <Reveal as="li" className="cs-step" key={step.num} index={i}>
            <div className="cs-step__copy">
              <div className="cs-step__head">
                <span className="cs-step__num" aria-hidden="true">
                  {step.num}
                </span>
                <span className="cs-step__icon" aria-hidden="true">
                  <Icon name={step.icon} />
                </span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
              <span className="cs-step__deliverable">
                <Icon name="filePlus" aria-hidden="true" />
                {step.deliverable}
              </span>
            </div>

            <ProofPanel proof={step.proof} />
          </Reveal>
        ))}
      </ol>

      <Reveal className="cs-cta-row" index={4}>
        <Btn to={CS_PROCESS.cta.to} variant="primary" size="lg" iconAfter={CS_PROCESS.cta.icon}>
          {CS_PROCESS.cta.label}
        </Btn>
      </Reveal>
    </HvSection>
  );
}

/* -- 5. Who we work with ----------------------------------------------------- */

function Who() {
  return (
    <HvSection className="cs-who">
      <Reveal className="cs-head">
        <span className="hv-eyebrow">{CS_WHO.eyebrow}</span>
        <h2 className="hv-h2">{CS_WHO.title}</h2>
        <p className="hv-lede">{CS_WHO.lede}</p>
      </Reveal>

      <ul className="cs-who__grid">
        {CS_WHO.items.map((item, i) => (
          <Reveal as="li" key={item.title} index={i}>
           <div style={{ display: "flex",flexDirection: "column", gap: "0.5rem" }}>
             <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span className="cs-who__icon" aria-hidden="true">
              <Icon name={item.icon} />
            </span>
            <h3>{item.title}</h3>
            </div>
            <p>{item.body}</p>
           </div>
          </Reveal>
        ))}
      </ul>
    </HvSection>
  );
}

/* -- 6. Why GHLevelUp -------------------------------------------------------- */

function Why() {
  return (
    <HvSection mint className="cs-why">
      <Reveal className="cs-head">
        <span className="hv-eyebrow">{CS_WHY.eyebrow}</span>
        <h2 className="hv-h2">{CS_WHY.title}</h2>
        <p className="hv-lede">{CS_WHY.lede}</p>
      </Reveal>

      <ul className="cs-why__rows">
        {CS_WHY.items.map((item, i) => (
          <Reveal as="li" key={item.num} index={i}>
            <span className="cs-why__num" aria-hidden="true">
              {item.num}
            </span>
            <span className="cs-why__icon" aria-hidden="true">
              <Icon name={item.icon} />
            </span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </HvSection>
  );
}

/* -- 7. FAQ ------------------------------------------------------------------ */

function FaqSection() {
  return (
    <HvSection className="cs-faq">
      <StructuredData
        faq={CS_FAQ.items}
        service={SEO}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: SEO.name, path: `/services/${SEO.slug}` },
        ]}
      />
      <Reveal className="cs-head cs-head--center">
        <span className="hv-eyebrow">{CS_FAQ.eyebrow}</span>
        <h2 className="hv-h2">{CS_FAQ.title}</h2>
        <p className="hv-lede">{CS_FAQ.lede}</p>
      </Reveal>

      <Reveal className="cs-faq__list" index={1}>
        <Faq items={CS_FAQ.items} />
      </Reveal>
    </HvSection>
  );
}

/* -- 8. Reviews -------------------------------------------------------------- */

function Reviews() {
  return (
    <HvSection dark className="cs-reviews">
      <Reveal className="cs-head cs-head--center">
        <span className="hv-eyebrow">{TESTIMONIALS.eyebrow}</span>
        <h2 className="hv-h2">{TESTIMONIALS.title}</h2>
        <p className="hv-body">{TESTIMONIALS.lede}</p>
      </Reveal>

      <ul className="cs-reviews__grid">
        {TESTIMONIALS.items.map((t, i) => (
          <Reveal as="li" key={t.name} index={i}>
            <figure className="cs-review">
              <span className="cs-review__mark" aria-hidden="true">
                <Icon name="quote" />
              </span>
              <blockquote>{t.quote}</blockquote>
              <figcaption>
                <b>{t.name}</b>
                <span>{t.role}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>
    </HvSection>
  );
}

/* -- 9. Closing CTA + contact ------------------------------------------------ */

function Closing() {
  return (
    <HvSection className="cs-closing">
      <div className="cs-closing__grid">
        <Reveal className="cs-closing__copy">
          <span className="hv-eyebrow">{CS_CLOSING.eyebrow}</span>
          <h2 className="hv-h2">{CS_CLOSING.title}</h2>
          <p className="hv-lede">{CS_CLOSING.lede}</p>

          <div className="cs-closing__ctas">
            <Btn to={CS_CLOSING.primary.to} variant="primary" size="lg" iconAfter={CS_CLOSING.primary.icon}>
              {CS_CLOSING.primary.label}
            </Btn>
            <Btn to={CS_CLOSING.secondary.to} variant="outline" size="lg">
              {CS_CLOSING.secondary.label}
            </Btn>
          </div>
        </Reveal>

        {/* The same contact details the /contact page lists, so a reader
            who would rather just call does not have to navigate away. */}
        <Reveal as="ul" className="cs-contact" index={1}>
          <li>
            <span aria-hidden="true">
              <Icon name="phone" />
            </span>
            <div>
              <b>Call or text</b>
              <a href={SITE.phoneHref}>{SITE.phone}</a>
              <small>Text is usually the fastest way to reach us</small>
            </div>
          </li>
          <li>
            <span aria-hidden="true">
              <Icon name="mail" />
            </span>
            <div>
              <b>Email</b>
              <a href={SITE.emailHref}>{SITE.email}</a>
              <small>Replies within one business day</small>
            </div>
          </li>
          <li>
            <span aria-hidden="true">
              <Icon name="mapPin" />
            </span>
            <div>
              <b>Office</b>
              <a href={SITE.mapsHref} target="_blank" rel="noopener">
                {SITE.addressLine1}
                <br />
                {SITE.addressLine2}
              </a>
              <small>Visits by appointment</small>
            </div>
          </li>
          <li>
            <span aria-hidden="true">
              <Icon name="clock" />
            </span>
            <div>
              <b>Hours</b>
              <span className="cs-contact__plain">{SITE.hours}</span>
              <small>Calls answered 24/7 by the AI receptionist</small>
            </div>
          </li>
        </Reveal>
      </div>
    </HvSection>
  );
}

/* One definition of this page's search identity, read by both its <PageMeta>
   and its Service structured data below - so the title, the description and
   the schema can never describe the same page three slightly different ways. */
const SEO = {
  slug: "crm-sub-account-setup",
  name: "CRM & Sub-account Setup",
  description:
    "GoHighLevel account architecture, pipelines, calendars, A2P compliance and CRM migration - configured, tested and documented before you log in.",
  ogDescription:
    "Account structure, pipelines that match how you actually sell, compliance filed and data migrated - a working CRM instead of an empty account.",
};

export default function ServiceCrmSubaccountSetup() {
  return (
    <Layout
      variant="v2"
      topbar={
        <>
          Staring at a blank GoHighLevel account? <a href="/book">Get a free setup review</a>
        </>
      }
    >
      <PageMeta title={`${SEO.name} - GHLevelUp`} description={SEO.description} ogDescription={SEO.ogDescription} />

      <div className="cs-pg">
        <Hero />
        <Overview />
        <Included />
        <Process />
        <Who />
        <Why />
        <FaqSection />
        <Reviews />
        <Closing />
        <ServiceEnquiryForm
          service={CS_ENQUIRY.service}
          eyebrow={CS_ENQUIRY.eyebrow}
          title={CS_ENQUIRY.title}
          lede={CS_ENQUIRY.lede}
          points={CS_ENQUIRY.points}
        />
        <RelatedServices
          slug="crm-sub-account-setup"
          title="What to build once the CRM is structured"
          lede="A configured account is the starting line. These are what you run on top of it."
        />
      </div>
    </Layout>
  );
}
