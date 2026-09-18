import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout.jsx";
import PageMeta from "@/components/common/PageMeta.jsx";
import Icon from "@/components/common/Icon.jsx";
import Faq from "@/components/common/Faq.jsx";
import StructuredData from "@/components/common/StructuredData.jsx";
import { HvSection, Reveal, Btn } from "@/components/home/primitives.jsx";
import ServiceContactCard from "@/components/services/ServiceContactCard.jsx";
import ServiceEnquiryForm from "@/components/services/ServiceEnquiryForm.jsx";
import RelatedServices from "@/components/services/RelatedServices.jsx";

import {
  WL_HERO,
  WL_INTRO,
  WL_BRANDING,
  WL_PROCESS,
  WL_USECASES,
  WL_WORK,
  WL_BENEFITS,
  WL_ENQUIRY,
  WL_FAQ,
} from "@/data/serviceWhiteLabel.jsx";

/* v2 chrome plus this page's OWN stylesheet - deliberately not
   service-detail.css or any other service page's bespoke file. This page's
   visual language is a rebranded product itself: an annotated "app" mockup
   in the hero (a browser chrome with corner call-outs naming what changes),
   a four-quadrant "what gets branded" grid and a four-step rebrand pipeline
   - none of which reuse another service page's layout. See the comment
   below on why service-detail.css is still imported for two components. */
import "@/styles/home-redesign.css";
import "@/styles/home-chrome.css";
/* Only for the shared utility components (ServiceContactCard's
   .sd-contact-card, RelatedServices' .sd-rel) - see the matching note on
   the other bespoke service pages for why those two are the exception. */
import "@/styles/service-detail.css";
import "@/styles/service-white-label.css";

/**
 * /services/white-label-platform.
 *
 * Ten sections: hero, overview, what gets branded, how it works, who it's
 * for, representative work, benefits, the enquiry form and related
 * services, and FAQ.
 */

/* -- Hero: annotated "rebranded app" mockup ---------------------------------- */

function BrandMock() {
  const { domain, brandName, navTabs, stats, pipeline, pins } = WL_HERO.mock;

  return (
    <div className="wl-mockwrap">
      <div className="wl-browser">
        <div className="wl-browser__bar">
          <span className="wl-browser__dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="wl-browser__url">
            <Icon name="shieldCheck" aria-hidden="true" />
            {domain}
          </span>
        </div>

        <div className="wl-browser__body">
          <div className="wl-browser__nav">
            <span className="wl-browser__logo" aria-hidden="true">
              {brandName.charAt(0)}
            </span>
            <span className="wl-browser__brand">{brandName}</span>
            <nav className="wl-browser__tabs" aria-hidden="true">
              {navTabs.map((t, i) => (
                <span className={i === 0 ? "is-active" : ""} key={t}>
                  {t}
                </span>
              ))}
            </nav>
          </div>

          <ul className="wl-browser__stats" aria-hidden="true">
            {stats.map((s) => (
              <li key={s.label}>
                <span className="wl-browser__stat-value">{s.value}</span>
                <span className="wl-browser__stat-label">{s.label}</span>
              </li>
            ))}
          </ul>

          <ul className="wl-browser__pipeline" aria-hidden="true">
            {pipeline.map((p) => (
              <li key={p.stage}>
                <span className="wl-browser__pipeline-count">{p.count}</span>
                <span className="wl-browser__pipeline-stage">{p.stage}</span>
              </li>
            ))}
          </ul>
        </div>

        <span className="wl-browser__sample" aria-hidden="true">
          Sample account
        </span>

        {/* Decorative corner call-outs - the same information is always
            available in the legend list below, so this is aria-hidden
            rather than the primary way to reach it. Hidden under 900px via
            CSS, where there isn't room for them without overlapping the
            mock itself. */}
        {pins.map((pin) => (
          <span className={`wl-pin wl-pin--${pin.n}`} key={pin.n} aria-hidden="true">
            {pin.n}
          </span>
        ))}
      </div>

      <ul className="wl-legend">
        {pins.map((pin) => (
          <li key={pin.n}>
            <span className="wl-legend__num">{pin.n}</span>
            {pin.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Hero() {
  return (
    <section className="wl-hero">
      <div className="hv-container wl-hero__inner">
        <Reveal as="p" className="wl-hero__crumbs">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/services">Services</Link>
          <span>/</span>
          White-Label Platform
        </Reveal>

        <div className="wl-hero__copy">
          <Reveal>
            <span className="wl-hero__eyebrow">{WL_HERO.eyebrow}</span>

            <h1 className="wl-hero__title">
              {WL_HERO.titleLead}
              <span>{WL_HERO.titleAccent}</span>
            </h1>

            <p className="wl-hero__lede">{WL_HERO.lede}</p>

            <div className="wl-hero__ctas">
              <Btn to={WL_HERO.primary.to} variant="primary" size="lg" iconAfter={WL_HERO.primary.icon}>
                {WL_HERO.primary.label}
              </Btn>
              <Btn href={WL_HERO.secondary.href} variant="outline" size="lg">
                {WL_HERO.secondary.label}
              </Btn>
            </div>
          </Reveal>
        </div>

        <Reveal className="wl-hero__mock" index={1}>
          <BrandMock />
        </Reveal>
      </div>
    </section>
  );
}

/* -- Overview: facts + insight quote ------------------------------------------ */

function Intro() {
  return (
    <HvSection className="wl-intro">
      <Reveal className="wl-intro__head">
        <span className="hv-eyebrow">{WL_INTRO.eyebrow}</span>
        <h2 className="hv-h2">{WL_INTRO.title}</h2>
      </Reveal>

      <Reveal as="ul" className="wl-facts" index={1}>
        {WL_INTRO.facts.map((fact) => (
          <li key={fact.label}>
            <span className="wl-facts__icon" aria-hidden="true">
              <Icon name={fact.icon} />
            </span>
            <b>{fact.num}</b>
            <strong>{fact.label}</strong>
            <span>{fact.sub}</span>
          </li>
        ))}
      </Reveal>

      <div className="wl-intro__split">
        <Reveal className="wl-insight" index={2}>
          <span className="wl-insight__icon" aria-hidden="true">
            <Icon name="sparkle" />
          </span>
          <p>{WL_INTRO.quote.text}</p>
          <span className="wl-insight__foot">{WL_INTRO.quote.attribution}</span>
        </Reveal>

        <Reveal className="wl-intro__prose" index={3}>
          {WL_INTRO.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </Reveal>
      </div>
    </HvSection>
  );
}

/* -- What gets branded (four-quadrant grid) ------------------------------------ */

function Branding() {
  return (
    <HvSection id="branding" mint className="wl-branding">
      <Reveal className="wl-head">
        <span className="hv-eyebrow">{WL_BRANDING.eyebrow}</span>
        <h2 className="hv-h2">{WL_BRANDING.title}</h2>
        <p className="hv-lede">{WL_BRANDING.lede}</p>
      </Reveal>

      <ul className="wl-branding-grid">
        {WL_BRANDING.groups.map((group, i) => (
          <Reveal as="li" key={group.title} index={i}>
            <article className="wl-branding-card">
              <span className="wl-branding-card__icon" aria-hidden="true">
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

/* -- How it works (four-step pipeline) ----------------------------------------- */

function Process() {
  return (
    <HvSection dark className="wl-process">
      <Reveal className="wl-head">
        <span className="hv-eyebrow">{WL_PROCESS.eyebrow}</span>
        <h2 className="hv-h2">{WL_PROCESS.title}</h2>
        <p className="hv-body">{WL_PROCESS.lede}</p>
      </Reveal>

      <ol className="wl-pipeline">
        {WL_PROCESS.steps.map((step, i) => (
          <li className="wl-pipeline__step" key={step.num}>
            <Reveal index={i}>
              <span className="wl-pipeline__num">{step.num}</span>
              <span className="wl-pipeline__icon" aria-hidden="true">
                <Icon name={step.icon} />
              </span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </Reveal>
            {i < WL_PROCESS.steps.length - 1 && (
              <span className="wl-pipeline__arrow" aria-hidden="true">
                <Icon name="arrowRight" strokeWidth={2.4} />
              </span>
            )}
          </li>
        ))}
      </ol>

      <Reveal className="wl-cta-row" index={4}>
        <Btn to={WL_PROCESS.cta.to} variant="primary" size="lg" iconAfter={WL_PROCESS.cta.icon}>
          {WL_PROCESS.cta.label}
        </Btn>
      </Reveal>
    </HvSection>
  );
}

/* -- Who it's for ---------------------------------------------------------------- */

function UseCases() {
  return (
    <HvSection className="wl-usecases">
      <Reveal className="wl-head">
        <span className="hv-eyebrow">{WL_USECASES.eyebrow}</span>
        <h2 className="hv-h2">{WL_USECASES.title}</h2>
        <p className="hv-lede">{WL_USECASES.lede}</p>
      </Reveal>

      <ul className="wl-use-grid">
        {WL_USECASES.items.map((item, i) => (
          <Reveal as="li" key={item.title} index={i}>
            <span className="wl-use-grid__icon" aria-hidden="true">
              <Icon name={item.icon} />
            </span>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </Reveal>
        ))}
      </ul>
    </HvSection>
  );
}

/* -- Representative work ---------------------------------------------------------- */

function Work() {
  return (
    <HvSection mint className="wl-work-sec">
      <Reveal className="wl-head">
        <span className="hv-eyebrow">{WL_WORK.eyebrow}</span>
        <h2 className="hv-h2">{WL_WORK.title}</h2>
        <p className="hv-lede">{WL_WORK.lede}</p>
      </Reveal>

      <ul className="wl-work">
        {WL_WORK.items.map((item, i) => (
          <Reveal as="li" key={item.title} index={i}>
            <article className="wl-work__card">
              <span className="wl-work__tag">{item.tag}</span>
              <h3>{item.title}</h3>
              <p className="wl-work__problem">{item.problem}</p>

              <p className="wl-work__label">What we built</p>
              <ul className="wl-work__built">
                {item.built.map((b) => (
                  <li key={b}>
                    <Icon name="check" aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>

              <div className="wl-work__outcome">
                <p>{item.outcome}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </ul>

      <p className="wl-work__note">{WL_WORK.note}</p>
    </HvSection>
  );
}

/* -- Benefits ---------------------------------------------------------------------- */

function Benefits() {
  return (
    <HvSection dark className="wl-benefits">
      <Reveal className="wl-head">
        <span className="hv-eyebrow">{WL_BENEFITS.eyebrow}</span>
        <h2 className="hv-h2">{WL_BENEFITS.title}</h2>
        <p className="hv-body">{WL_BENEFITS.lede}</p>
      </Reveal>

      <ul className="wl-ben-grid">
        {WL_BENEFITS.items.map((item, i) => (
          <Reveal as="li" key={item.title} index={i}>
            <span className="wl-ben-grid__icon" aria-hidden="true">
              <Icon name={item.icon} />
            </span>
            <b>{item.title}</b>
            <p>{item.body}</p>
          </Reveal>
        ))}
      </ul>
    </HvSection>
  );
}

/* -- FAQ ---------------------------------------------------------------------------- */

function FaqSection() {
  return (
    <HvSection className="wl-faq">
      <StructuredData
        faq={WL_FAQ.items}
        service={SEO}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: SEO.name, path: `/services/${SEO.slug}` },
        ]}
      />

      <div className="wl-faq__inner">
        <Reveal>
          <span className="hv-eyebrow">{WL_FAQ.eyebrow}</span>
          <h2 className="hv-h2">{WL_FAQ.title}</h2>
          <p className="hv-body">{WL_FAQ.lede}</p>

          <div className="wl-faq__list">
            <Faq items={WL_FAQ.items} />
          </div>
        </Reveal>

        <ServiceContactCard card={WL_FAQ.card} />
      </div>
    </HvSection>
  );
}

/* One definition of this page's search identity, read by both its <PageMeta>
   and its Service structured data below - so the title, the description and
   the schema can never describe the same page three slightly different ways. */
const SEO = {
  slug: "white-label-platform",
  name: "White-Label Platform",
  description:
    "Every login, domain, email and app icon your clients see carries your brand, not GoHighLevel's - configured once, tested screen by screen, and kept that way as the platform updates.",
  ogDescription:
    "Your logo, your domain, your app name, your emails - the platform runs underneath, but your clients never see its name.",
};

export default function ServiceWhiteLabel() {
  return (
    <Layout
      variant="v2"
      topbar={
        <>
          Reselling GoHighLevel under your own name? <a href="/book">Book a free consultation</a>
        </>
      }
    >
      <PageMeta title={`${SEO.name} - GHLevelUp`} description={SEO.description} ogDescription={SEO.ogDescription} />

      <div className="wl-pg">
        <Hero />
        <Intro />
        <Branding />
        <Process />
        <UseCases />
        <Work />
        <Benefits />
        <ServiceEnquiryForm
          service={WL_ENQUIRY.service}
          eyebrow={WL_ENQUIRY.eyebrow}
          title={WL_ENQUIRY.title}
          lede={WL_ENQUIRY.lede}
          points={WL_ENQUIRY.points}
        />
        <RelatedServices
          slug="white-label-platform"
          title="What a white-labeled platform runs on"
          lede="Branding is what a client sees. These are what makes the platform underneath actually work."
        />
        <FaqSection />
      </div>
    </Layout>
  );
}
