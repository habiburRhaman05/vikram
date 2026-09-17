import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout.jsx";
import PageMeta from "@/components/common/PageMeta.jsx";
import Icon from "@/components/common/Icon.jsx";
import Faq from "@/components/common/Faq.jsx";
import StructuredData from "@/components/common/StructuredData.jsx";
import CtaBand from "@/components/common/CtaBand.jsx";
import GhlEmbed from "@/components/common/GhlEmbed.jsx";
import Button from "@/components/common/Button.jsx";
import Section from "@/components/common/Section.jsx";
import SectionHead from "@/components/common/SectionHead.jsx";
import LegacyReveal from "@/components/common/Reveal.jsx";
import { HvSection, Reveal, Btn } from "@/components/home/primitives.jsx";
import ImageSlot from "@/components/home/ImageSlot.jsx";
import { SITE } from "@/data/site";

import {
  WEB_HERO,
  WEB_OVERVIEW,
  WEB_ANATOMY,
  WEB_INCLUDES,
  WEB_PROCESS,
  WEB_JOURNEY,
  WEB_WHO,
  WEB_WHY,
  WEB_FAQ,
  WEB_REVIEW,
  WEB_CLOSING,
} from "@/data/serviceWebsitesLanding.jsx";

/* v2 chrome plus this page's own stylesheet - see Industries.jsx for why
   the first two are both needed, and the note atop service-webdev.css for
   how .wb-hero couples to the transparent header. service-detail.css is
   deliberately NOT loaded: this page no longer shares the other service
   pages' sd- layout, and its own stylesheet carries everything it needs. */
import "@/styles/home-redesign.css";
import "@/styles/home-chrome.css";
import "@/styles/service-webdev.css";

/**
 * /services/websites-landing-pages.
 *
 * Section order (specified): hero overview, detailed overview, service
 * detail with a visual, what's included, how it works with proof-of-work
 * steps and a journey, who we work with, why GHLevelUp, FAQs, a client
 * review, then the contact-page CTA and form. Same section set as the
 * Funnel page, deliberately different layout: centred hero with a coded
 * browser mock, light editorial decision rows, a 2x2 process around a
 * centre photo, a chevron journey band and a dark FAQ (see
 * service-webdev.css).
 */

/* -- Sections -------------------------------------------------------------- */

/** The hero's browser-window mock: the page being judged in the first
 *  three seconds, drawn as the thing itself. Hardcoded here rather than in
 *  the data file, same reasoning as the other heroes' mocks: it's
 *  decoration for this hero specifically, not page copy, and it carries no
 *  numbers or client names. */
function BrowserMock() {
  return (
    <div className="wb-hero__mock" aria-hidden="true">
      <div className="wb-mock__bar">
        <span className="wb-mock__dots">
          <i />
          <i />
          <i />
        </span>
        <span className="wb-mock__url">yourbusiness.com</span>
      </div>

      <div className="wb-mock__body">
        <div>
          <span className="wb-mock__kicker" />
          <p className="wb-mock__h1">
            What you do, who for, and the one action worth taking
          </p>
          <p className="wb-mock__sub">
            Understood without scrolling, in the words your customers use.
          </p>
          <div className="wb-mock__ctas">
            <span className="wb-mock__btn wb-mock__btn--solid">Book now</span>
            <span className="wb-mock__btn wb-mock__btn--ghost">See pricing</span>
          </div>
        </div>

        <div className="wb-mock__side">
          <span className="wb-mock__check">
            <Icon name="tick" strokeWidth={3} />
            Above the fold
          </span>
          <span className="wb-mock__check">
            <Icon name="tick" strokeWidth={3} />
            One obvious next step
          </span>
          <span className="wb-mock__check">
            <Icon name="tick" strokeWidth={3} />
            Loads before interest fades
          </span>
          <span className="wb-mock__meta">
            <Icon name="bolt" />
            Judged in the first three seconds
          </span>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="wb-hero">
      <div className="hv-container wb-hero__inner">
        <Reveal>
          <p className="wb-hero__crumbs">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/services">Services</Link>
            <span aria-hidden="true">/</span>
            Websites &amp; Landing Pages
          </p>

          <span className="wb-hero__eyebrow">{WEB_HERO.eyebrow}</span>

          <h1 className="wb-hero__title">
            {WEB_HERO.titleLead} <span>{WEB_HERO.titleAccent}</span>
          </h1>

          <p className="wb-hero__lede">{WEB_HERO.lede}</p>

          <div className="wb-hero__ctas">
            <Btn to={WEB_HERO.primary.to} variant="primary" size="lg" iconAfter={WEB_HERO.primary.icon}>
              {WEB_HERO.primary.label}
            </Btn>
            <Btn href={WEB_HERO.secondary.href} variant="outline" size="lg">
              {WEB_HERO.secondary.label}
            </Btn>
          </div>

          <ul className="wb-hero__chips">
            {WEB_HERO.chips.map((chip) => (
              <li key={chip.label}>
                <Icon name={chip.icon} aria-hidden="true" />
                {chip.label}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal index={1}>
          <BrowserMock />
        </Reveal>
      </div>
    </section>
  );
}

/** The detailed overview: the real build photo left, prose right, and the
 *  pull-quote carried as a banner inside the prose column. */
function Overview() {
  return (
    <HvSection id="overview" className="wb-overview">
      <div className="wb-overview__inner">
        <Reveal className="wb-overview__media">
          <div className="wb-overview__frame">
            {/* The wireframe-being-sketched photo, not the process section's
                code-and-live-page shot - one photo per section, so the page
                never shows the same asset twice. */}
            <picture>
              <source type="image/webp" srcSet="/img/services/web-hero.webp" />
              <img
                src="/img/services/web-hero.jpg"
                alt="A wireframe for a web page being sketched by hand"
                width={900}
                height={675}
                loading="lazy"
                decoding="async"
              />
            </picture>
          </div>
        </Reveal>

        <Reveal className="wb-overview__prose" index={1}>
          <span className="hv-eyebrow">{WEB_OVERVIEW.eyebrow}</span>
          <h2 className="hv-h2">{WEB_OVERVIEW.title}</h2>

          <blockquote className="wb-overview__quote">
            <p>{WEB_OVERVIEW.quote.text}</p>
            <span>{WEB_OVERVIEW.quote.attribution}</span>
          </blockquote>

          {WEB_OVERVIEW.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </Reveal>
      </div>

      <Reveal as="ul" className="wb-facts" index={2}>
        {WEB_OVERVIEW.facts.map((fact) => (
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

/** The six decisions as light editorial rows: number, name, description and
 *  the right-aligned test each one has to pass. The Funnel page renders its
 *  stages as a dark film-strip, so nothing about this reads as the same
 *  section. */
function Anatomy() {
  return (
    <HvSection className="wb-anatomy">
      <Reveal className="hv-section-head">
        <span className="hv-eyebrow">{WEB_ANATOMY.eyebrow}</span>
        <h2 className="hv-h2">{WEB_ANATOMY.title}</h2>
        <p className="hv-body">{WEB_ANATOMY.lede}</p>
      </Reveal>

      <ul className="wb-decisions">
        {WEB_ANATOMY.stages.map((stage, i) => (
          <Reveal as="li" className="wb-decision" key={stage.num} index={i}>
            <span className="wb-decision__num" aria-hidden="true">
              {stage.num}
            </span>

            <div className="wb-decision__body">
              <h3>{stage.title}</h3>
              <p>{stage.body}</p>
            </div>

            <span className="wb-decision__want">
              <Icon name="tick" aria-hidden="true" strokeWidth={3} />
              {stage.want}
            </span>

            <span className="wb-decision__icon" aria-hidden="true">
              <Icon name={stage.icon} strokeWidth={1.9} />
            </span>
          </Reveal>
        ))}
      </ul>

      <Reveal className="wb-anatomy__foot">
        <Btn to={WEB_ANATOMY.cta.to} variant="primary" size="lg" iconAfter="arrowRight">
          {WEB_ANATOMY.cta.label}
        </Btn>
      </Reveal>
    </HvSection>
  );
}

/** What's included: white cards with an accent top edge, the first spanning
 *  two columns so the grid reads as composed rather than uniform. */
function Includes() {
  return (
    <HvSection className="wb-includes">
      <Reveal className="hv-section-head">
        <span className="hv-eyebrow">{WEB_INCLUDES.eyebrow}</span>
        <h2 className="hv-h2">{WEB_INCLUDES.title}</h2>
        <p className="wb-sub">{WEB_INCLUDES.subtitle}</p>
        <p className="hv-body">{WEB_INCLUDES.lede}</p>
      </Reveal>

      <ul className="wb-cards">
        {WEB_INCLUDES.items.map((item, i) => (
          <Reveal as="li" key={item.title} index={i}>
            <article className={`wb-card${i === 0 ? " wb-card--wide" : ""}`}>
              <div className="wb-card__head">
                <span className="wb-card__icon" aria-hidden="true">
                  <Icon name={item.icon} />
                </span>
                <h3>{item.title}</h3>
              </div>
              <p>{item.body}</p>
            </article>
          </Reveal>
        ))}
      </ul>

      <Reveal className="wb-anatomy__foot">
        <Btn to={WEB_INCLUDES.cta.to} variant="primary" size="lg" iconAfter="arrowRight">
          {WEB_INCLUDES.cta.label}
        </Btn>
      </Reveal>
    </HvSection>
  );
}

/** How it works: a light 2x2 of numbered steps wrapped around a centre
 *  photo, each step carrying its proof line, chips INSIDE the photo's
 *  bottom edge. */
function Process() {
  return (
    <HvSection className="wb-process">
      <Reveal className="hv-section-head hv-section-head--center">
        <span className="hv-eyebrow">{WEB_PROCESS.eyebrow}</span>
        <h2 className="hv-h2">{WEB_PROCESS.title}</h2>
        <p className="hv-lede">{WEB_PROCESS.lede}</p>
      </Reveal>

      <div className="wb-process__grid">
        {WEB_PROCESS.steps.map((step, i) => (
          <Reveal className="wb-step" key={step.num} index={i}>
            <div className="wb-step__top">
              <span className="wb-step__num" aria-hidden="true">
                {step.num}
              </span>
              <h3>{step.title}</h3>
            </div>

            <p className="wb-step__body">{step.body}</p>

            <p className="wb-step__proof">
              <Icon name="shieldCheck" aria-hidden="true" />
              {step.proof}
            </p>
          </Reveal>
        ))}

        <Reveal className="wb-process__media" index={4}>
          <div className="wb-process__frame">
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

          <div className="wb-process__chips" aria-hidden="true">
            {WEB_PROCESS.chips.map((chip) => (
              <span className="wb-process__chip" key={chip.label}>
                <Icon name={chip.icon} />
                <span>{chip.label}</span>
              </span>
            ))}
          </div>
        </Reveal>
      </div>

      <Reveal className="wb-process__foot">
        <Btn to={WEB_PROCESS.cta.to} variant="primary" size="lg" iconAfter={WEB_PROCESS.cta.icon}>
          {WEB_PROCESS.cta.label}
        </Btn>
      </Reveal>
    </HvSection>
  );
}

/** The journey: a dark band where the six stages are joined by chevrons -
 *  the arrow between the cells rather than a rail through them. */
function Journey() {
  return (
    <HvSection dark className="wb-journey">
      <Reveal className="hv-section-head hv-section-head--center">
        <span className="hv-eyebrow">{WEB_JOURNEY.eyebrow}</span>
        <h2 className="hv-h2">{WEB_JOURNEY.title}</h2>
        <p className="hv-lede">{WEB_JOURNEY.lede}</p>
      </Reveal>

      <ol className="wb-flow">
        {WEB_JOURNEY.steps.map((step, i) => (
          <li className="wb-flow__item" key={step.title}>
            <Reveal className="wb-flow__cell" index={i}>
              <span className="wb-flow__icon" aria-hidden="true">
                <Icon name={step.icon} />
              </span>
              <span className="wb-flow__step" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{step.title}</h3>
              <p>{step.detail}</p>
            </Reveal>

            {i < WEB_JOURNEY.steps.length - 1 && (
              <span className="wb-flow__arrow" aria-hidden="true">
                <Icon name="chevronRight" strokeWidth={2.4} />
              </span>
            )}
          </li>
        ))}
      </ol>

      <Reveal className="wb-journey__foot">
        <Btn to={WEB_JOURNEY.cta.to} variant="primary" size="lg" iconAfter={WEB_JOURNEY.cta.icon}>
          {WEB_JOURNEY.cta.label}
        </Btn>
      </Reveal>
    </HvSection>
  );
}

/** Who we work with: three columns of quiet tiles - the Funnel page uses
 *  hairline rows on dark, so this reads as a different section entirely. */
function Who() {
  return (
    <HvSection className="wb-who">
      <Reveal className="hv-section-head">
        <span className="hv-eyebrow">{WEB_WHO.eyebrow}</span>
        <h2 className="hv-h2">{WEB_WHO.title}</h2>
        <p className="hv-body">{WEB_WHO.lede}</p>
      </Reveal>

      <ul className="wb-who__grid">
        {WEB_WHO.items.map((item, i) => (
          <Reveal as="li" key={item.title} index={i}>
            <div className="wb-who__cell">
              <span className="wb-who__icon" aria-hidden="true">
                <Icon name={item.icon} />
              </span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </HvSection>
  );
}

/** Why GHLevelUp: a sticky intro beside a numbered spec-sheet list. */
function Why() {
  return (
    <HvSection className="wb-why">
      <div className="wb-why__inner">
        <Reveal className="wb-why__intro">
          <span className="hv-eyebrow">{WEB_WHY.eyebrow}</span>
          <h2 className="hv-h2">{WEB_WHY.title}</h2>
          <p className="hv-body">{WEB_WHY.lede}</p>

          <div className="wb-why__band">
            <Btn to={WEB_WHY.cta.to} variant="primary" size="lg" iconAfter={WEB_WHY.cta.icon}>
              {WEB_WHY.cta.label}
            </Btn>
          </div>
        </Reveal>

        <Reveal as="ul" className="wb-specs" index={1}>
          {WEB_WHY.items.map((item) => (
            <li key={item.title}>
              <div>
                <h3>
                  <Icon name={item.icon} aria-hidden="true" />
                  {item.title}
                </h3>
                <p>{item.body}</p>
              </div>
            </li>
          ))}
        </Reveal>
      </div>
    </HvSection>
  );
}

/** FAQs on a dark surface with a white contact card beside them - the
 *  emphasis flipped from the Funnel page's light FAQ with a dark card. */
function FaqSection() {
  return (
    <HvSection className="wb-faq">
      <StructuredData
        faq={WEB_FAQ.items}
        service={SEO}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: SEO.name, path: `/services/${SEO.slug}` },
        ]}
      />

      <div className="wb-faq__inner">
        <Reveal>
          <span className="hv-eyebrow">{WEB_FAQ.eyebrow}</span>
          <h2 className="hv-h2">{WEB_FAQ.title}</h2>
          <p className="hv-body">{WEB_FAQ.lede}</p>

          <div className="wb-faq__list">
            <Faq items={WEB_FAQ.items} />
          </div>
        </Reveal>

        <Reveal className="wb-faq__aside" index={1}>
          <aside className="wb-contact-card">
            <span className="wb-contact-card__eyebrow">{WEB_FAQ.card.eyebrow}</span>
            <h2>{WEB_FAQ.card.title}</h2>
            <p>{WEB_FAQ.card.body}</p>

            <Btn to={WEB_FAQ.card.cta.to} variant="primary" iconAfter={WEB_FAQ.card.cta.icon}>
              {WEB_FAQ.card.cta.label}
            </Btn>

            <ul className="wb-contact-card__list">
              <li>
                <Icon name="mail" aria-hidden="true" />
                <a href={SITE.emailHref}>{SITE.email}</a>
              </li>
              <li>
                <Icon name="phone" aria-hidden="true" />
                <a href={SITE.phoneHref}>{SITE.phone}</a>
              </li>
              <li>
                <Icon name="clock" aria-hidden="true" />
                <span>{SITE.hours}</span>
              </li>
            </ul>

            <p className="wb-contact-card__links">
              <Link to="/contact">Contact page</Link>
              <span aria-hidden="true">·</span>
              <Link to="/services">All services</Link>
            </p>
          </aside>
        </Reveal>
      </div>
    </HvSection>
  );
}

/** The client review: one quote as a light card with a star row - the
 *  Funnel page gives its quote a dark full-width band, so this is the
 *  opposite treatment. */
function Review() {
  return (
    <HvSection className="wb-review">
      <Reveal className="wb-review__card">
        <div className="wb-review__stars" aria-label="Five star review">
          {Array.from({ length: 5 }, (_, i) => (
            <Icon key={i} name="star" aria-hidden="true" />
          ))}
        </div>

        <blockquote className="wb-review__quote">{WEB_REVIEW.quote}</blockquote>

        <div className="wb-review__person">
          <div className="wb-review__who">
            {/* ImageSlot rather than a bare img: until the real avatar file
                exists it renders a labelled placeholder at the same ratio,
                the same deal the home page's testimonials get. */}
            <ImageSlot src={WEB_REVIEW.image} alt="" ratio="1/1" label=" " className="wb-review__avatar" />
            <span>
              <strong>{WEB_REVIEW.name}</strong>
              <em>{WEB_REVIEW.role}</em>
            </span>
          </div>

          <Btn to={WEB_REVIEW.cta.to} variant="primary" iconAfter={WEB_REVIEW.cta.icon}>
            {WEB_REVIEW.cta.label}
          </Btn>
        </div>
      </Reveal>
    </HvSection>
  );
}

/** The closing contact: the Contact page's own components - its section
 *  head, its GoHighLevel contact form embed, and its CtaBand - reused here
 *  so the last screen of this page is the same contact experience as
 *  /contact, not a lookalike. Centred single-column this time, so the two
 *  pages close differently too. */
function Closing() {
  return (
    <>
      <Section className="wb-closing">
        <SectionHead eyebrow="Contact us" title={WEB_CLOSING.title} center>
          {WEB_CLOSING.body}
        </SectionHead>

        <LegacyReveal>
          {/* GHL EMBED - CONTACT US FORM (Form ID: rArd4GpBcPOa3tbsPAO3).
              The same embed the Contact page uses, so an enquiry from here
              lands in the same inbox with the same fields. Capped narrower
              than the Contact page's grid column because this layout is
              centred rather than split. */}
          <div className="wb-embed">
            <GhlEmbed
              variant="form"
              iframeProps={{
                src: "https://api.leadconnectorhq.com/widget/form/rArd4GpBcPOa3tbsPAO3",
                style: { width: "100%", height: 840, border: "none", borderRadius: 8 },
                id: "inline-rArd4GpBcPOa3tbsPAO3",
                "data-layout": "{'id':'INLINE'}",
                "data-trigger-type": "alwaysShow",
                "data-trigger-value": "",
                "data-activation-type": "alwaysActivated",
                "data-activation-value": "",
                "data-deactivation-type": "neverDeactivate",
                "data-deactivation-value": "",
                "data-form-name": "Contact Us",
                "data-height": "740",
                "data-layout-iframe-id": "inline-rArd4GpBcPOa3tbsPAO3",
                "data-form-id": "rArd4GpBcPOa3tbsPAO3",
                "data-cookie-consent": "true",
                "data-cookie-consent-provider": "auto",
                title: "Contact Us",
              }}
            />
          </div>
        </LegacyReveal>
      </Section>

      <Section tight>
        <CtaBand
          title="Or just call and ask"
          actions={
            <>
              {WEB_CLOSING.actions.map((action) => (
                <Button
                  key={action.label}
                  to={action.to}
                  variant={action.variant}
                  size="lg"
                  icon={action.icon}
                >
                  {action.label}
                </Button>
              ))}
              <Button href={SITE.phoneHref} variant="ghost-light" size="lg" icon="phone">
                Call {SITE.phone}
              </Button>
            </>
          }
        >
          {WEB_CLOSING.note}
        </CtaBand>
      </Section>
    </>
  );
}

/* One definition of this page's search identity, read by both its <PageMeta>
   and its Service structured data below - so the title, the description and
   the schema can never describe the same page three slightly different ways. */
const SEO = {
  slug: "websites-landing-pages",
  name: "Websites & Landing Pages",
  description:
    "Fast, responsive websites and landing pages built to convert - wired to your CRM, calendar and analytics, and tested on real devices before launch.",
  ogDescription:
    "Websites and landing pages built around the action you want: one promise above the fold, one obvious next step, speed and accessibility checked at launch.",
};

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
      <PageMeta title={`${SEO.name} - GHLevelUp`} description={SEO.description} ogDescription={SEO.ogDescription} />

      <div className="wb-pg">
        <Hero />
        <Overview />
        <Anatomy />
        <Includes />
        <Process />
        <Journey />
        <Who />
        <Why />
        <FaqSection />
        {/* <Review /> */}
        {/* <Closing /> */}
      </div>
    </Layout>
  );
}
