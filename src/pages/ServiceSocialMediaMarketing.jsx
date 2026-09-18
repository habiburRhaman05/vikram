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
  SM_HERO,
  SM_INTRO,
  SM_PILLARS,
  SM_PLATFORMS,
  SM_PROCESS,
  SM_DETAILS,
  SM_USECASES,
  SM_WORK,
  SM_BENEFITS,
  SM_ENQUIRY,
  SM_FAQ,
} from "@/data/serviceSocialMedia.jsx";

/* v2 chrome plus this page's OWN stylesheet - deliberately not
   service-detail.css. Every section on this page (sm-* classes) is its own
   bespoke layout: a fanned post-mockup hero, a bento content-pillar grid, a
   platform badge row and a connected weekly sprint-board, none of which
   reuse the sd-* patterns from the other six service pages. See the note
   atop service-social.css for why. */
import "@/styles/home-redesign.css";
import "@/styles/home-chrome.css";
/* service-detail.css is loaded only for the two shared utility components
   below (ServiceContactCard's .sd-contact-card, RelatedServices' .sd-rel) -
   their styling lives there since all service pages reuse those components
   verbatim. Every section this page owns is styled by service-social.css,
   under its own sm- classes, not sd-. */
import "@/styles/service-detail.css";
import "@/styles/service-social.css";

/**
 * /services/social-media-marketing.
 *
 * Eleven sections: hero, intro, content pillars, platforms, the weekly
 * process, what's included, who it's for, representative work, benefits,
 * the enquiry form and related services, and FAQ. Deliberately built in its
 * own visual language (bento grids, a connected process line, platform
 * badges) rather than the list-heavy layout the other service pages share -
 * see the top-of-file comment on why.
 */


function Hero() {
  return (
    <section className="sm-hero">
      <div className="hv-container sm-hero__inner">
        <Reveal as="p" className="sm-hero__crumbs">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/services">Services</Link>
          <span>/</span>
          Social Media Marketing
        </Reveal>

        <div className="sm-hero__copy">
          <Reveal>
            <span className="sm-hero__eyebrow">{SM_HERO.eyebrow}</span>

            <h1 className="sm-hero__title">
              {SM_HERO.titleLead}
              <span>{SM_HERO.titleAccent}</span>
            </h1>

            <p className="sm-hero__lede">{SM_HERO.lede}</p>

            <div className="sm-hero__ctas">
              <Btn to={SM_HERO.primary.to} variant="primary" size="lg" iconAfter={SM_HERO.primary.icon}>
                {SM_HERO.primary.label}
              </Btn>
              <Btn href={SM_HERO.secondary.href} variant="outline" size="lg">
                {SM_HERO.secondary.label}
              </Btn>
            </div>
          </Reveal>
        </div>

        {/* The hero's right column is the supplied artwork - one person
            posting, with the networks it goes out to orbiting them. It
            replaces the stack of sample post cards that used to sit here:
            those were invented captions from invented handles, and on a
            page about content they invited the reader to judge writing
            nobody actually published.

            Decorative: alt="" and aria-hidden. The networks it draws are
            named in the platforms section further down the page.

            Centred in its own column and against the copy beside it - see
            .sm-hero__art in service-social.css. */}
        <Reveal className="sm-hero__art" index={1}>
          <picture>
            <source type="image/webp" srcSet="/social-media-images.png" />
            <img
              src="/social-media-images.png"
              alt=""
              aria-hidden="true"
              width={738}
              height={416}
              decoding="async"
              fetchPriority="high"
            />
          </picture>
        </Reveal>
      </div>
    </section>
  );
}

/* -- Intro --------------------------------------------------------------- */

function Intro() {
  return (
    <HvSection className="sm-intro">
      <Reveal className="sm-intro__head">
        <span className="hv-eyebrow">{SM_INTRO.eyebrow}</span>
        <h2 className="hv-h2">{SM_INTRO.title}</h2>
      </Reveal>

      <Reveal className="sm-intro__banner" index={1}>
        <span className="sm-intro__mark" aria-hidden="true">
          &ldquo;
        </span>
        <p className="sm-intro__banner-text">{SM_INTRO.quote.text}</p>
        <span className="sm-intro__banner-foot">{SM_INTRO.quote.attribution}</span>
      </Reveal>

      <Reveal className="sm-intro__prose" index={2}>
        {SM_INTRO.body.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </Reveal>

      <Reveal as="ol" className="sm-intro__strip" index={3}>
        {SM_INTRO.facts.map((fact, i) => (
          <li key={fact.label}>
            <span className="sm-intro__strip-dot" aria-hidden="true">
              {i + 1}
            </span>
            <b>{fact.num}</b>
            <strong>{fact.label}</strong>
            <span>{fact.sub}</span>
          </li>
        ))}
      </Reveal>
    </HvSection>
  );
}

/* -- Content pillars (bento grid) ----------------------------------------- */

function Pillars() {
  return (
    <HvSection id="pillars" className="sm-pillars">
      <Reveal className="sm-head">
        <span className="hv-eyebrow">{SM_PILLARS.eyebrow}</span>
        <h2 className="hv-h2">{SM_PILLARS.title}</h2>
        <p className="hv-lede">{SM_PILLARS.lede}</p>
      </Reveal>

      <ul className="sm-bento">
        {SM_PILLARS.items.map((item, i) => (
          <Reveal as="li" className="sm-bento__cell" key={item.title} index={i}>
            <span className="sm-bento__icon" aria-hidden="true">
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

/* -- Platforms ------------------------------------------------------------- */

function Platforms() {
  return (
    <HvSection dark className="sm-platforms">
      <Reveal className="sm-head">
        <span className="hv-eyebrow">{SM_PLATFORMS.eyebrow}</span>
        <h2 className="hv-h2">{SM_PLATFORMS.title}</h2>
        <p className="hv-body">{SM_PLATFORMS.lede}</p>
      </Reveal>

      <ul className="sm-platform-row">
        {SM_PLATFORMS.items.map((item, i) => (
          <Reveal as="li" key={item.name} index={i}>
            <span className="sm-platform-row__icon" aria-hidden="true">
              <Icon name={item.icon} />
            </span>
            <h3>{item.name}</h3>
            <p>{item.body}</p>
          </Reveal>
        ))}
      </ul>

      <Reveal className="sm-platform-note" index={5}>
        <Icon name="shieldCheck" aria-hidden="true" />
        {SM_PLATFORMS.note}
      </Reveal>
    </HvSection>
  );
}

/* -- Weekly sprint-board process -------------------------------------------- */

function Process() {
  return (
    <HvSection className="sm-process">
      <Reveal className="sm-head">
        <span className="hv-eyebrow">{SM_PROCESS.eyebrow}</span>
        <h2 className="hv-h2">{SM_PROCESS.title}</h2>
        <p className="hv-lede">{SM_PROCESS.lede}</p>
      </Reveal>

      <ol className="sm-sprint">
        {SM_PROCESS.steps.map((step, i) => (
          <Reveal as="li" className="sm-sprint__step" key={step.num} index={i}>
            <span className="sm-sprint__day">{step.day}</span>
            <span className="sm-sprint__icon" aria-hidden="true">
              <Icon name={step.icon} />
            </span>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </Reveal>
        ))}
      </ol>

      <Reveal className="sm-cta-row" index={5}>
        <Btn to={SM_PROCESS.cta.to} variant="primary" size="lg" iconAfter={SM_PROCESS.cta.icon}>
          {SM_PROCESS.cta.label}
        </Btn>
      </Reveal>
    </HvSection>
  );
}

/* -- Details --------------------------------------------------------------- */

function Details() {
  return (
    <HvSection className="sm-details-sec">
      <Reveal className="sm-head">
        <span className="hv-eyebrow">{SM_DETAILS.eyebrow}</span>
        <h2 className="hv-h2">{SM_DETAILS.title}</h2>
        <p className="hv-body">{SM_DETAILS.lede}</p>
      </Reveal>

      <ul className="sm-details">
        {SM_DETAILS.groups.map((group, i) => (
          <Reveal as="li" key={group.title} index={i}>
            <article className="sm-detail">
              <span className="sm-detail__icon" aria-hidden="true">
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

/* -- Use cases --------------------------------------------------------------- */

function UseCases() {
  return (
    <HvSection mint className="sm-usecases">
      <Reveal className="sm-head">
        <span className="hv-eyebrow">{SM_USECASES.eyebrow}</span>
        <h2 className="hv-h2">{SM_USECASES.title}</h2>
        <p className="hv-lede">{SM_USECASES.lede}</p>
      </Reveal>

      <ul className="sm-use-grid">
        {SM_USECASES.items.map((item, i) => (
          <Reveal as="li" key={item.title} index={i}>
            <span className="sm-use-grid__icon" aria-hidden="true">
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

/* -- Representative work --------------------------------------------------- */

function Work() {
  return (
    <HvSection className="sm-work-sec">
      <Reveal className="sm-head">
        <span className="hv-eyebrow">{SM_WORK.eyebrow}</span>
        <h2 className="hv-h2">{SM_WORK.title}</h2>
        <p className="hv-lede">{SM_WORK.lede}</p>
      </Reveal>

      <ul className="sm-work">
        {SM_WORK.items.map((item, i) => (
          <Reveal as="li" key={item.title} index={i}>
            <article className="sm-work__card">
              <span className="sm-work__tag">{item.tag}</span>
              <h3>{item.title}</h3>
              <p className="sm-work__problem">{item.problem}</p>

              <p className="sm-work__label">What we built</p>
              <ul className="sm-work__built">
                {item.built.map((b) => (
                  <li key={b}>
                    <Icon name="check" aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>

              <div className="sm-work__outcome">
                <p>{item.outcome}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </ul>

    
    </HvSection>
  );
}

/* -- Benefits ---------------------------------------------------------------- */

function Benefits() {
  return (
    <HvSection dark className="sm-benefits">
      <Reveal className="sm-head">
        <span className="hv-eyebrow">{SM_BENEFITS.eyebrow}</span>
        <h2 className="hv-h2">{SM_BENEFITS.title}</h2>
        <p className="hv-body">{SM_BENEFITS.lede}</p>
      </Reveal>

      <ul className="sm-ben-grid">
        {SM_BENEFITS.items.map((item, i) => (
          <Reveal as="li" key={item.title} index={i}>
            <span className="sm-ben-grid__icon" aria-hidden="true">
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

/* -- FAQ ---------------------------------------------------------------------- */

function FaqSection() {
  return (
    <HvSection className="sm-faq">
      <StructuredData
        faq={SM_FAQ.items}
        service={SEO}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: SEO.name, path: `/services/${SEO.slug}` },
        ]}
      />

      <div className="sm-faq__inner">
        <Reveal>
          <span className="hv-eyebrow">{SM_FAQ.eyebrow}</span>
          <h2 className="hv-h2">{SM_FAQ.title}</h2>
          <p className="hv-body">{SM_FAQ.lede}</p>

          <div className="sm-faq__list">
            <Faq items={SM_FAQ.items} />
          </div>
        </Reveal>

        <ServiceContactCard card={SM_FAQ.card} />
      </div>
    </HvSection>
  );
}

/* One definition of this page's search identity, read by both its <PageMeta>
   and its Service structured data below - so the title, the description and
   the schema can never describe the same page three slightly different ways. */
const SEO = {
  slug: "social-media-marketing",
  name: "Social Media Marketing",
  description:
    "Content planned, produced and posted on a weekly schedule - across the platforms your customers actually use, with comments and DMs monitored daily.",
  ogDescription:
    "A social media calendar that runs itself: planned content, consistent posting, and daily community management, wired to your CRM.",
};

export default function ServiceSocialMediaMarketing() {
  return (
    <Layout
      variant="v2"
      topbar={
        <>
          Not sure which platforms to run? <a href="/book">Book a free consultation</a>
        </>
      }
    >
      <PageMeta title={`${SEO.name} - GHLevelUp`} description={SEO.description} ogDescription={SEO.ogDescription} />

      <div className="sm-pg">
        <Hero />
        <Intro />
        <Pillars />
        <Platforms />
        <Process />
        <Details />
        <UseCases />
        <Work />
        <Benefits />
        <ServiceEnquiryForm
          service={SM_ENQUIRY.service}
          eyebrow={SM_ENQUIRY.eyebrow}
          title={SM_ENQUIRY.title}
          lede={SM_ENQUIRY.lede}
          points={SM_ENQUIRY.points}
        />
        <RelatedServices
          slug="social-media-marketing"
          title="What a post should connect to"
          lede="A calendar generates attention. These decide what happens with it."
        />
        <FaqSection />
      </div>
    </Layout>
  );
}
