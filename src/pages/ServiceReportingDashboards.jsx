import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout.jsx";
import PageMeta from "@/components/common/PageMeta.jsx";
import Icon from "@/components/common/Icon.jsx";
import Faq from "@/components/common/Faq.jsx";
import StructuredData from "@/components/common/StructuredData.jsx";
import { HvSection, Reveal, Btn } from "@/components/home/primitives.jsx";
import ServiceEnquiryForm from "@/components/services/ServiceEnquiryForm.jsx";
import RelatedServices from "@/components/services/RelatedServices.jsx";

import {
  RD_HERO,
  RD_INTRO,
  RD_WIDGETS,
  RD_PROCESS,
  RD_DETAILS,
  RD_USECASES,
  RD_WORK,
  RD_BENEFITS,
  RD_ENQUIRY,
  RD_FAQ,
} from "@/data/serviceReportingDashboards.jsx";

/* v2 chrome plus this page's OWN stylesheet - deliberately not
   service-detail.css, service-social.css or service-email-sms.css. This
   page's visual language is the dashboard itself: a coded browser-chrome
   mockup with KPI tiles and a live-looking chart in the hero, "scorecard"
   fact tiles in the intro, a widget grid tagged by chart type, and a
   connected data-pipeline diagram for the build process - none of which
   reuse another service page's layout. See the comment below on why
   service-detail.css is still imported for two components. */
import "@/styles/home-redesign.css";
import "@/styles/home-chrome.css";
/* Only for RelatedServices' .sd-rel classes - see the matching note on the
   other new service pages for why that component is the exception. */
import "@/styles/service-detail.css";
import "@/styles/service-reporting.css";

/**
 * /services/reporting-dashboards.
 *
 * Eleven sections: hero, intro, the widget grid, the build pipeline, what's
 * included, who it's for, representative work, benefits, the enquiry form
 * and related services, and FAQ.
 */


function Hero() {
  return (
    <section className="rd-hero">
      <div className="hv-container rd-hero__inner">
        <Reveal as="p" className="rd-hero__crumbs">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/services">Services</Link>
          <span>/</span>
          Reporting Dashboards
        </Reveal>

        <div className="rd-hero__copy">
          <Reveal>
            <span className="rd-hero__eyebrow">{RD_HERO.eyebrow}</span>

            <h1 className="rd-hero__title">
              {RD_HERO.titleLead}
              <span>{RD_HERO.titleAccent}</span>
            </h1>

            <p className="rd-hero__lede">{RD_HERO.lede}</p>

            <div className="rd-hero__ctas">
              <Btn to={RD_HERO.primary.to} variant="primary" size="lg" iconAfter={RD_HERO.primary.icon}>
                {RD_HERO.primary.label}
              </Btn>
              <Btn href={RD_HERO.secondary.href} variant="outline" size="lg">
                {RD_HERO.secondary.label}
              </Btn>
            </div>
          </Reveal>
        </div>

        {/* The supplied artwork: every source feeding one live dashboard -
            which is this service in a single picture. It replaces the coded
            DashMock panel. Framed with a hairline border and a small
            radius, the same treatment as the other service heroes that
            carry an opaque image.

            Served from 1120px WebP/JPEG (47KB / 78KB) generated from
            public/reporting-dashboard.png (1672x941, 1.4MB); regenerate
            both if that file changes. Decorative: every metric it shows is
            named in the copy and the widget section below. */}
        <Reveal className="rd-hero__mock" index={1}>
          <picture className="rd-hero__art">
            <source type="image/webp" srcSet="/img/services/reporting-hero.webp" />
            <img
              src="/img/services/reporting-hero.jpg"
              alt=""
              aria-hidden="true"
              width={1120}
              height={630}
              decoding="async"
              fetchPriority="high"
            />
          </picture>
        </Reveal>
      </div>
    </section>
  );
}

/* -- Intro: scorecards + insight quote ---------------------------------------- */

function Intro() {
  return (
    <HvSection className="rd-intro">
      <Reveal className="rd-intro__head">
        <span className="hv-eyebrow">{RD_INTRO.eyebrow}</span>
        <h2 className="hv-h2">{RD_INTRO.title}</h2>
      </Reveal>

      <Reveal as="ul" className="rd-scorecards" index={1}>
        {RD_INTRO.facts.map((fact) => (
          <li key={fact.label}>
            <span className="rd-scorecards__icon" aria-hidden="true">
              <Icon name={fact.icon} />
            </span>
            <b>{fact.num}</b>
            <strong>{fact.label}</strong>
            <span>{fact.sub}</span>
          </li>
        ))}
      </Reveal>

      <div className="rd-intro__split">
        <Reveal className="rd-insight" index={2}>
          <span className="rd-insight__icon" aria-hidden="true">
            <Icon name="sparkle" />
          </span>
          <p>{RD_INTRO.quote.text}</p>
          <span className="rd-insight__foot">{RD_INTRO.quote.attribution}</span>
        </Reveal>

        <Reveal className="rd-intro__prose" index={3}>
          {RD_INTRO.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </Reveal>
      </div>
    </HvSection>
  );
}

/* -- Widget grid ---------------------------------------------------------------- */

function Widgets() {
  return (
    <HvSection id="widgets" className="rd-widgets">
      <Reveal className="rd-head">
        <span className="hv-eyebrow">{RD_WIDGETS.eyebrow}</span>
        <h2 className="hv-h2">{RD_WIDGETS.title}</h2>
        <p className="hv-lede">{RD_WIDGETS.lede}</p>
      </Reveal>

      <ul className="rd-widget-grid">
        {RD_WIDGETS.items.map((item, i) => (
          <Reveal as="li" key={item.title} index={i}>
            <article className="rd-widget">
              <div className="rd-widget__head">
                <span className="rd-widget__icon" aria-hidden="true">
                  <Icon name={item.icon} />
                </span>
                <span className="rd-widget__type">{item.type}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          </Reveal>
        ))}
      </ul>
    </HvSection>
  );
}

/* -- Data pipeline process -------------------------------------------------------- */

function Process() {
  return (
    <HvSection dark className="rd-process">
      <Reveal className="rd-head">
        <span className="hv-eyebrow">{RD_PROCESS.eyebrow}</span>
        <h2 className="hv-h2">{RD_PROCESS.title}</h2>
        <p className="hv-body">{RD_PROCESS.lede}</p>
      </Reveal>

      <ol className="rd-pipeline">
        {RD_PROCESS.steps.map((step, i) => (
          <li className="rd-pipeline__step" key={step.num}>
            <Reveal index={i}>
              <span className="rd-pipeline__num">{step.num}</span>
              <span className="rd-pipeline__icon" aria-hidden="true">
                <Icon name={step.icon} />
              </span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </Reveal>
            {i < RD_PROCESS.steps.length - 1 && (
              <span className="rd-pipeline__arrow" aria-hidden="true">
                <Icon name="arrowRight" strokeWidth={2.4} />
              </span>
            )}
          </li>
        ))}
      </ol>

      <Reveal className="rd-cta-row" index={4}>
        <Btn to={RD_PROCESS.cta.to} variant="primary" size="lg" iconAfter={RD_PROCESS.cta.icon}>
          {RD_PROCESS.cta.label}
        </Btn>
      </Reveal>
    </HvSection>
  );
}

/* -- Details ------------------------------------------------------------------------ */

function Details() {
  return (
    <HvSection className="rd-details-sec">
      <Reveal className="rd-head">
        <span className="hv-eyebrow">{RD_DETAILS.eyebrow}</span>
        <h2 className="hv-h2">{RD_DETAILS.title}</h2>
        <p className="hv-body">{RD_DETAILS.lede}</p>
      </Reveal>

      <ul className="rd-details">
        {RD_DETAILS.groups.map((group, i) => (
          <Reveal as="li" key={group.title} index={i}>
            <article className="rd-detail">
              <span className="rd-detail__icon" aria-hidden="true">
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

/* -- Use cases ---------------------------------------------------------------------- */

function UseCases() {
  return (
    <HvSection mint className="rd-usecases">
      <Reveal className="rd-head">
        <span className="hv-eyebrow">{RD_USECASES.eyebrow}</span>
        <h2 className="hv-h2">{RD_USECASES.title}</h2>
        <p className="hv-lede">{RD_USECASES.lede}</p>
      </Reveal>

      <ul className="rd-use-grid">
        {RD_USECASES.items.map((item, i) => (
          <Reveal as="li" key={item.title} index={i}>
            <span className="rd-use-grid__icon" aria-hidden="true">
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

/* -- Representative work ------------------------------------------------------------- */

function Work() {
  return (
    <HvSection className="rd-work-sec">
      <Reveal className="rd-head">
        <span className="hv-eyebrow">{RD_WORK.eyebrow}</span>
        <h2 className="hv-h2">{RD_WORK.title}</h2>
        <p className="hv-lede">{RD_WORK.lede}</p>
      </Reveal>

      <ul className="rd-work">
        {RD_WORK.items.map((item, i) => (
          <Reveal as="li" key={item.title} index={i}>
            <article className="rd-work__card">
              <span className="rd-work__tag">{item.tag}</span>
              <h3>{item.title}</h3>
              <p className="rd-work__problem">{item.problem}</p>

              <p className="rd-work__label">What we built</p>
              <ul className="rd-work__built">
                {item.built.map((b) => (
                  <li key={b}>
                    <Icon name="check" aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>

              <div className="rd-work__outcome">
                <p>{item.outcome}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </ul>

    </HvSection>
  );
}

/* -- Benefits ------------------------------------------------------------------------ */

function Benefits() {
  return (
    <HvSection dark className="rd-benefits">
      <Reveal className="rd-head">
        <span className="hv-eyebrow">{RD_BENEFITS.eyebrow}</span>
        <h2 className="hv-h2">{RD_BENEFITS.title}</h2>
        <p className="hv-body">{RD_BENEFITS.lede}</p>
      </Reveal>

      <ul className="rd-ben-grid">
        {RD_BENEFITS.items.map((item, i) => (
          <Reveal as="li" key={item.title} index={i}>
            <span className="rd-ben-grid__icon" aria-hidden="true">
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
    <HvSection className="rd-faq">
      <StructuredData
        faq={RD_FAQ.items}
        service={SEO}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: SEO.name, path: `/services/${SEO.slug}` },
        ]}
      />

      {/* One centred column. The contact card that used to sit beside the
          questions was the third call to action in the last screen of the
          page - the enquiry form and the related services are directly
          above it - so it is gone, and the questions have the section to
          themselves. */}
      <div className="rd-faq__inner">
        <Reveal className="rd-faq__head">
          <span className="hv-eyebrow">{RD_FAQ.eyebrow}</span>
          <h2 className="hv-h2">{RD_FAQ.title}</h2>
          <p className="hv-body">{RD_FAQ.lede}</p>
        </Reveal>

        <Reveal className="rd-faq__list" index={1}>
          <Faq items={RD_FAQ.items} />
        </Reveal>
      </div>
    </HvSection>
  );
}

/* One definition of this page's search identity, read by both its <PageMeta>
   and its Service structured data below - so the title, the description and
   the schema can never describe the same page three slightly different ways. */
const SEO = {
  slug: "reporting-dashboards",
  name: "Reporting Dashboards",
  description:
    "Source, conversion and revenue visible in one live dashboard, built around the decisions you actually make - not a generic template with sixty widgets nobody opens.",
  ogDescription:
    "Every number in one place, updated as it happens: leads, calls, revenue and cost, connected from your CRM, ad accounts and calendar.",
};

export default function ServiceReportingDashboards() {
  return (
    <Layout
      variant="v2"
      topbar={
        <>
          Still exporting spreadsheets to find out what's working? <a href="/book">Book a free consultation</a>
        </>
      }
    >
      <PageMeta title={`${SEO.name} - GHLevelUp`} description={SEO.description} ogDescription={SEO.ogDescription} />

      <div className="rd-pg">
        <Hero />
        <Intro />
        <Widgets />
        <Process />
        <Details />
        <UseCases />
        <Work />
        <Benefits />
        <ServiceEnquiryForm
          service={RD_ENQUIRY.service}
          eyebrow={RD_ENQUIRY.eyebrow}
          title={RD_ENQUIRY.title}
          lede={RD_ENQUIRY.lede}
          points={RD_ENQUIRY.points}
        />
        <RelatedServices
          slug="reporting-dashboards"
          title="What feeds the dashboard"
          lede="A dashboard only shows what's connected to it. These decide what it can see and what happens once you do."
        />
        <FaqSection />
      </div>
    </Layout>
  );
}
