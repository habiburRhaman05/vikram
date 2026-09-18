import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout.jsx";
import PageMeta from "@/components/common/PageMeta.jsx";
import Icon from "@/components/common/Icon.jsx";
import Faq from "@/components/common/Faq.jsx";
import StructuredData from "@/components/common/StructuredData.jsx";
import InfoCard from "@/components/common/InfoCard.jsx";
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
  FNL_HERO,
  FNL_OVERVIEW,
  FNL_ANATOMY,
  FNL_INCLUDES,
  FNL_PROCESS,
  FNL_JOURNEY,
  FNL_WHO,
  FNL_WHY,
  FNL_FAQ,
  FNL_REVIEW,
  FNL_CLOSING,
} from "@/data/serviceFunnelBuilds.jsx";

/* v2 chrome plus this page's own stylesheet - see Industries.jsx for why
   the first two are both needed, and the note atop service-funnels.css for
   how .fnl-hero couples to the transparent header. service-detail.css is
   deliberately NOT loaded: this page no longer shares the other service
   pages' sd- layout, and its own stylesheet carries everything it needs. */
import "@/styles/home-redesign.css";
import "@/styles/home-chrome.css";
import "@/styles/service-funnels.css";

/**
 * /services/funnel-design-builds.
 *
 * Section order (specified): hero overview, detailed overview, service
 * detail with a visual, what's included, how it works with proof-of-work
 * steps and a journey, who we work with, why GHLevelUp, FAQs, a client
 * review, then the contact-page CTA and form. The layout is this page's
 * own - split hero, editorial overview, dark film-strip and process band -
 * deliberately composed differently from the other service detail pages.
 */

/* -- Sections -------------------------------------------------------------- */

function Hero() {
  return (
    <section className="fnl-hero">
      <div className="hv-container fnl-hero__inner">
        <Reveal className="fnl-hero__copy">
          <p className="fnl-hero__crumbs">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/services">Services</Link>
            <span aria-hidden="true">/</span>
            Funnel Design &amp; Builds
          </p>

          <span className="fnl-hero__eyebrow">{FNL_HERO.eyebrow}</span>

          <h1 className="fnl-hero__title">
            {FNL_HERO.titleLead}
            <span>{FNL_HERO.titleAccent}</span>
          </h1>

          <p className="fnl-hero__lede">{FNL_HERO.lede}</p>

          <div className="fnl-hero__ctas">
            <Btn to={FNL_HERO.primary.to} variant="primary" size="lg" iconAfter={FNL_HERO.primary.icon}>
              {FNL_HERO.primary.label}
            </Btn>
            <Btn href={FNL_HERO.secondary.href} variant="outline" size="lg">
              {FNL_HERO.secondary.label}
            </Btn>
          </div>

          
        </Reveal>

        <Reveal index={1}>
          <figure className="fnl-hero__photo">
            <picture>
              <source type="image/webp" srcSet="/funnel-desing.png" />
              <img
                src="/funnel-desing.pngg"
                alt=""
                width={880}
                height={1100}
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </picture>
           
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

/** The detailed overview: pull-quote aside beside the prose, and the fact
 *  strip full-width under both. */
function Overview() {
  return (
    <HvSection id="overview" className="fnl-overview">
      <div className="fnl-overview__inner">
        <Reveal className="fnl-overview__aside">
          <span className="hv-eyebrow">{FNL_OVERVIEW.eyebrow}</span>
          <h2 className="hv-h2">{FNL_OVERVIEW.title}</h2>

          <blockquote className="fnl-overview__quote">
            <p>{FNL_OVERVIEW.quote.text}</p>
            <span>{FNL_OVERVIEW.quote.attribution}</span>
          </blockquote>
        </Reveal>

        <Reveal className="fnl-overview__prose" index={1}>
          {FNL_OVERVIEW.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </Reveal>
      </div>

      <Reveal as="ul" className="fnl-facts" index={2}>
        {FNL_OVERVIEW.facts.map((fact) => (
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

/** The five stages as a dark horizontal film-strip: a rail with numbered
 *  nodes, because the sequence is the point. */
function Anatomy() {
  return (
    <HvSection dark className="fnl-anatomy">
      <Reveal className="hv-section-head">
        <span className="hv-eyebrow">{FNL_ANATOMY.eyebrow}</span>
        <h2 className="hv-h2">{FNL_ANATOMY.title}</h2>
        <p className="hv-body">{FNL_ANATOMY.lede}</p>
      </Reveal>

      <ol className="fnl-strip">
        {FNL_ANATOMY.stages.map((stage, i) => (
          <Reveal as="li" className="fnl-strip__cell" key={stage.num} index={i}>
            <span className="fnl-strip__node" aria-hidden="true">
              {stage.num}
            </span>

            <span className="fnl-strip__icon" aria-hidden="true">
              <Icon name={stage.icon} strokeWidth={1.9} />
            </span>

            <h3>{stage.title}</h3>
            <p>{stage.body}</p>

            <span className="fnl-strip__want">
              <Icon name="tick" aria-hidden="true" strokeWidth={3} />
              {stage.want}
            </span>
          </Reveal>
        ))}
      </ol>

      <Reveal className="fnl-anatomy__foot">
        <Btn to={FNL_ANATOMY.cta.to} variant="primary" size="lg" iconAfter="arrowRight">
          {FNL_ANATOMY.cta.label}
        </Btn>
      </Reveal>
    </HvSection>
  );
}

/** What's included: mint section, numbered three-column cards. */
function Includes() {
  return (
    <HvSection mint className="fnl-includes">
      <Reveal className="hv-section-head">
        <span className="hv-eyebrow">{FNL_INCLUDES.eyebrow}</span>
        <h2 className="hv-h2">{FNL_INCLUDES.title}</h2>
        <p className="fnl-sub">{FNL_INCLUDES.subtitle}</p>
        <p className="hv-body">{FNL_INCLUDES.lede}</p>
      </Reveal>

      <ul className="fnl-cards">
        {FNL_INCLUDES.items.map((item, i) => (
          <Reveal as="li" key={item.title} index={i}>
            <article className="fnl-card">
              <span className="fnl-card__icon" aria-hidden="true">
                <Icon name={item.icon} />
              </span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          </Reveal>
        ))}
      </ul>

      <Reveal className="fnl-cta-row">
        <Btn to={FNL_INCLUDES.cta.to} variant="primary" size="lg" iconAfter="arrowRight">
          {FNL_INCLUDES.cta.label}
        </Btn>
      </Reveal>
    </HvSection>
  );
}

/** How it works: dark band with four step cards, each carrying its proof
 *  line, and the wide build photo with chips overlapping its top edge. */
function Process() {
  return (
    <HvSection dark className="fnl-process">
      <Reveal className="hv-section-head">
        <span className="hv-eyebrow">{FNL_PROCESS.eyebrow}</span>
        <h2 className="hv-h2">{FNL_PROCESS.title}</h2>
        <p className="hv-body">{FNL_PROCESS.lede}</p>
      </Reveal>

      <ol className="fnl-steps">
        {FNL_PROCESS.steps.map((step, i) => (
          <Reveal as="li" className="fnl-step" key={step.num} index={i}>
            <div className="fnl-step__head">
              <span className="fnl-step__num" aria-hidden="true">
                {step.num}
              </span>
              <span className="fnl-step__icon" aria-hidden="true">
                <Icon name={step.icon} />
              </span>
            </div>

            <h3>{step.title}</h3>
            <p className="fnl-step__body">{step.body}</p>

            <p className="fnl-step__proof">
              <Icon name="shieldCheck" aria-hidden="true" />
              {step.proof}
            </p>
          </Reveal>
        ))}
      </ol>

      <Reveal className="fnl-process__media" index={4}>
        <div className="fnl-process__chips" aria-hidden="true">
          {FNL_PROCESS.chips.map((chip) => (
            <span className="fnl-process__chip" key={chip.label}>
              <Icon name={chip.icon} />
              <span>{chip.label}</span>
            </span>
          ))}
        </div>

        <div className="fnl-process__frame">
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
      </Reveal>

      <Reveal className="fnl-process__foot">
        <Btn to={FNL_PROCESS.cta.to} variant="primary" size="lg" iconAfter={FNL_PROCESS.cta.icon}>
          {FNL_PROCESS.cta.label}
        </Btn>
      </Reveal>
    </HvSection>
  );
}

/** The journey: six stages on one light path - click, land, submit, book,
 *  confirm, return. The visitor's route, not our process. */
function Journey() {
  return (
    <HvSection className="fnl-journey">
      <Reveal className="hv-section-head hv-section-head--center">
        <span className="hv-eyebrow">{FNL_JOURNEY.eyebrow}</span>
        <h2 className="hv-h2">{FNL_JOURNEY.title}</h2>
        <p className="hv-lede">{FNL_JOURNEY.lede}</p>
      </Reveal>

      <ol className="fnl-path">
        {FNL_JOURNEY.steps.map((step, i) => (
          <Reveal as="li" className="fnl-path__cell" key={step.title} index={i}>
            <span className="fnl-path__num" aria-hidden="true">
              {i + 1}
            </span>
            <span className="fnl-path__icon" aria-hidden="true">
              <Icon name={step.icon} />
            </span>
            <h3>{step.title}</h3>
            <p>{step.detail}</p>
          </Reveal>
        ))}
      </ol>

      <Reveal className="fnl-journey__foot">
        <Btn to={FNL_JOURNEY.cta.to} variant="primary" size="lg" iconAfter={FNL_JOURNEY.cta.icon}>
          {FNL_JOURNEY.cta.label}
        </Btn>
      </Reveal>
    </HvSection>
  );
}

/** Who we work with: hairline rows rather than cards, so the section reads
 *  differently from the includes grid above it. */
function Who() {
  return (
    <HvSection dark className="fnl-who">
      <Reveal className="hv-section-head">
        <span className="hv-eyebrow">{FNL_WHO.eyebrow}</span>
        <h2 className="hv-h2">{FNL_WHO.title}</h2>
        <p className="hv-body">{FNL_WHO.lede}</p>
      </Reveal>

      <ul className="fnl-who__list">
        {FNL_WHO.items.map((item, i) => (
          <Reveal as="li" className="fnl-who__row" key={item.title} index={i}>
            <span className="fnl-who__icon" aria-hidden="true">
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

/** Why GHLevelUp: mint 2x2 cells and a full-width gradient CTA band. */
function Why() {
  return (
    <HvSection className="fnl-why">
      <Reveal className="hv-section-head">
        <span className="hv-eyebrow">{FNL_WHY.eyebrow}</span>
        <h2 className="hv-h2">{FNL_WHY.title}</h2>
        <p className="hv-body">{FNL_WHY.lede}</p>
      </Reveal>

      <ul className="fnl-why__grid">
        {FNL_WHY.items.map((item, i) => (
          <Reveal as="li" key={item.title} index={i}>
            <div className="fnl-why__cell">
              <span className="fnl-why__icon" aria-hidden="true">
                <Icon name={item.icon} />
              </span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </ul>

      <Reveal className="fnl-why__band">
        <p>Ready to give one offer the page it deserves?</p>
        <Btn to={FNL_WHY.cta.to} variant="primary" size="lg" iconAfter={FNL_WHY.cta.icon}>
          {FNL_WHY.cta.label}
        </Btn>
      </Reveal>
    </HvSection>
  );
}

/** FAQs beside a sticky contact card carrying the ways to reach us. */
function FaqSection() {
  return (
    <HvSection className="fnl-faq">
      <StructuredData
        faq={FNL_FAQ.items}
        service={SEO}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: SEO.name, path: `/services/${SEO.slug}` },
        ]}
      />

      <div className="fnl-faq__inner">
        <Reveal>
          <span className="hv-eyebrow">{FNL_FAQ.eyebrow}</span>
          <h2 className="hv-h2">{FNL_FAQ.title}</h2>
          <p className="hv-body">{FNL_FAQ.lede}</p>

          <div className="fnl-faq__list">
            <Faq items={FNL_FAQ.items} />
          </div>
        </Reveal>

        <Reveal className="fnl-faq__aside" index={1}>
          <aside className="fnl-contact-card">
            <span className="fnl-contact-card__eyebrow">{FNL_FAQ.card.eyebrow}</span>
            <h2>{FNL_FAQ.card.title}</h2>
            <p>{FNL_FAQ.card.body}</p>

            <Btn to={FNL_FAQ.card.cta.to} variant="primary" iconAfter={FNL_FAQ.card.cta.icon}>
              {FNL_FAQ.card.cta.label}
            </Btn>

            <ul className="fnl-contact-card__list">
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

            <p className="fnl-contact-card__links">
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

/** The client review: one quote, given the width and quiet of a testimonial
 *  that is being read rather than skimmed. */
function Review() {
  return (
    <HvSection dark className="fnl-review">
      <div className="fnl-review__grid">
        <Reveal>
          <span className="fnl-review__mark" aria-hidden="true">
            <Icon name="quote" strokeWidth={1.6} />
          </span>
          <blockquote className="fnl-review__quote">{FNL_REVIEW.quote}</blockquote>

          <div className="fnl-review__person">
            {/* ImageSlot rather than a bare img: until the real avatar file
                exists it renders a labelled placeholder at the same ratio,
                the same deal the home page's testimonials get. */}
            <ImageSlot src={FNL_REVIEW.image} alt="" ratio="1/1" label=" " className="fnl-review__avatar" />
            <span>
              <strong>{FNL_REVIEW.name}</strong>
              <em>{FNL_REVIEW.role}</em>
            </span>
          </div>
        </Reveal>

        <Reveal className="fnl-review__aside" index={1}>
          <p>Working with us starts with a twenty-minute call about how your funnel runs today.</p>
          <Btn to={FNL_REVIEW.cta.to} variant="primary" iconAfter={FNL_REVIEW.cta.icon}>
            {FNL_REVIEW.cta.label}
          </Btn>
        </Reveal>
      </div>
    </HvSection>
  );
}

/** The closing contact: the Contact page's own components - its section
 *  head, info list, GoHighLevel contact form embed and CtaBand - reused
 *  here so the last screen of this page is the same contact experience as
 *  /contact, not a lookalike. */
function Closing() {
  return (
    <>
      <Section className="fnl-closing">
        <SectionHead eyebrow="Contact us" title={FNL_CLOSING.title} center>
          {FNL_CLOSING.body}
        </SectionHead>

      <div className="contact-grid">
        <LegacyReveal as="aside">
          <InfoCard>
            <ul className="info-list">
              <li>
                <span className="info-list__icon" aria-hidden="true">
                  <Icon name="phone" />
                </span>
                <div>
                  <dt>Call or text</dt>
                  <dd>
                    <a href={SITE.phoneHref}>{SITE.phone}</a>
                    <small>Text is usually the fastest way to reach us</small>
                  </dd>
                </div>
              </li>
              <li>
                <span className="info-list__icon" aria-hidden="true">
                  <Icon name="mail" />
                </span>
                <div>
                  <dt>Email</dt>
                  <dd>
                    <a href={SITE.emailHref}>{SITE.email}</a>
                    <small>Replies within one business day</small>
                  </dd>
                </div>
              </li>
              <li>
                <span className="info-list__icon" aria-hidden="true">
                  <Icon name="clock" />
                </span>
                <div>
                  <dt>Hours</dt>
                  <dd>
                    {SITE.hours}
                    <small>Calls answered 24/7 by the AI receptionist</small>
                  </dd>
                </div>
              </li>
            </ul>
          </InfoCard>
        </LegacyReveal>

        <LegacyReveal>
          {/* GHL EMBED - CONTACT US FORM (Form ID: rArd4GpBcPOa3tbsPAO3).
              The same embed the Contact page uses, so an enquiry from here
              lands in the same inbox with the same fields. 840px matches
              what form_embed.js actually resizes it to live. */}
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
        </LegacyReveal>
      </div>
      </Section>

      <Section tight>
        <CtaBand
          title="Or just call and ask"
          actions={
            <>
              {FNL_CLOSING.actions.map((action) => (
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
          {FNL_CLOSING.note}
        </CtaBand>
      </Section>
    </>
  );
}

/* One definition of this page's search identity, read by both its <PageMeta>
   and its Service structured data below - so the title, the description and
   the schema can never describe the same page three slightly different ways. */
const SEO = {
  slug: "funnel-design-builds",
  name: "Funnel Design & Builds",
  description:
    "Landing pages, lead forms, booking flows and follow-up built around one offer and one action, connected to your CRM and calendar.",
  ogDescription:
    "Funnel design and builds for a single offer: the promise, the page, the form, the booking and the follow-up, tested on real devices before launch.",
};

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
      <PageMeta title={`${SEO.name} - GHLevelUp`} description={SEO.description} ogDescription={SEO.ogDescription} />

      <div className="fnl-pg">
        <Hero />
        <Overview />
        {/* <Anatomy /> */}
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
