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
  WLS_HERO,
  WLS_OVERVIEW,
  WLS_INCLUDED,
  WLS_PROCESS,
  WLS_WHO,
  WLS_WHY,
  WLS_FAQ,
  WLS_ENQUIRY,
  WLS_CLOSING,
} from "@/data/serviceWhiteLabelSupport.jsx";

/* v2 chrome plus this page's OWN stylesheet. service-detail.css is loaded
   only for RelatedServices' .sd-rel classes - every section this page owns
   is styled by service-white-label-support.css under wls- classes. */
import "@/styles/home-redesign.css";
import "@/styles/home-chrome.css";
import "@/styles/service-detail.css";
import "@/styles/service-white-label-support.css";

/**
 * /services/white-label-support.
 *
 * SECTION ORDER is the one every other service detail page follows, and is
 * deliberately not varied: hero, overview, what's included, how it works,
 * who we work with, why GHLevelUp, FAQ, client reviews, closing CTA and
 * contact, enquiry form, related services. A reader who has already read
 * two of these pages knows where to find the price question on the third.
 *
 * LAYOUT LANGUAGE is "the support desk", and is deliberately not reused
 * from any other service page:
 *   - a live TICKET QUEUE in the hero, over a stat band welded to its
 *     bottom edge, instead of the spec-sheet tree or the channel spine
 *   - a ONE TICKET / TWO VIEWS panel for the overview: the same request
 *     rendered as the client sees it and as it is actually worked, which
 *     is the only idea on the page that needs a picture
 *   - a HAIRLINE GRID for what's included: eight cells divided by single
 *     rules rather than eight floating cards, so it reads as one desk with
 *     eight lanes instead of eight separate products
 *   - a horizontal RAIL for the process, with the numbered nodes sitting
 *     on the rail and a meta chip under each card
 *   - WIDE PROFILE ROWS for who we work with, each with a tone rail
 *   - a dark SPLIT for why us: the argument on one side, the checklist on
 *     the other
 *
 * NOT TO BE CONFUSED WITH /services/white-label-platform, which is the
 * other white-label service (your brand on the software, not on the
 * helpdesk). The third FAQ answer draws the line between them, and the
 * two pages link to each other through serviceLinks.js.
 *
 * REVIEWS renders the site's existing TESTIMONIALS rather than inventing a
 * second set of client quotes - same decision as the other service pages,
 * and those identities are still placeholders that need replacing with
 * real, approved reviews before launch.
 */

/* -- 1. Hero: the branded ticket queue --------------------------------------- */

/* The queue panel. Decorative as a whole - aria-hidden - because it is a
   picture of the service rather than a source of facts, and every claim it
   makes in passing (the response time, the coverage) is also stated as
   real text in the stat band directly underneath it. The rows are sample
   data; the panel says so on its own face. */
function DeskPanel() {
  const { desk } = WLS_HERO;

  return (
    <div className="wls-desk" aria-hidden="true">
      <div className="wls-desk__bar">
        <span className="wls-desk__avatar">{desk.brand.charAt(0)}</span>
        <span className="wls-desk__id">
          <b>{desk.brand}</b>
          <i>
            <span className="wls-desk__pulse" />
            {desk.status}
          </i>
        </span>
        <span className="wls-desk__sample">Sample queue</span>
      </div>

      <ul className="wls-desk__list">
        {desk.tickets.map((t) => (
          <li className={`wls-ticket is-${t.state}`} key={t.id}>
            <span className="wls-ticket__id">{t.id}</span>
            <span className="wls-ticket__subject">{t.subject}</span>
            <span className="wls-ticket__tag">{t.tag}</span>
            <span className="wls-ticket__state">
              {t.state === "resolved" ? "Resolved" : "In progress"}
            </span>
            <span className="wls-ticket__age">{t.age}</span>
          </li>
        ))}
      </ul>

      <ul className="wls-desk__meters">
        {desk.meters.map((m) => (
          <li key={m.label}>
            <b>{m.value}</b>
            <span>{m.label}</span>
          </li>
        ))}
      </ul>

      <p className="wls-desk__note">
        <Icon name="arrowUp" strokeWidth={2.4} />
        {desk.note}
      </p>
    </div>
  );
}

function Hero() {
  return (
    <section className="wls-hero">
      <div className="hv-container wls-hero__inner">
        <Reveal as="p" className="wls-hero__crumbs">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/services">Services</Link>
          <span>/</span>
          {WLS_HERO.crumb}
        </Reveal>

        <Reveal className="wls-hero__copy">
          <span className="wls-hero__eyebrow">{WLS_HERO.eyebrow}</span>

          <h1 className="wls-hero__title">
            {WLS_HERO.titleLead}
            <span>{WLS_HERO.titleAccent}</span>
          </h1>

          <p className="wls-hero__lede">{WLS_HERO.lede}</p>

          <div className="wls-hero__ctas">
            <Btn to={WLS_HERO.primary.to} variant="primary" size="lg" iconAfter={WLS_HERO.primary.icon}>
              {WLS_HERO.primary.label}
            </Btn>
            {/* A fragment link into this page, offset by
                html { scroll-padding-top } in legacy/styles.css so the
                target heading clears the sticky header. */}
            <Btn href={WLS_HERO.secondary.href} variant="outline" size="lg">
              {WLS_HERO.secondary.label}
            </Btn>
          </div>

          <ul className="wls-hero__badges">
            {WLS_HERO.badges.map((b) => (
              <li key={b.label}>
                <Icon name={b.icon} strokeWidth={2.2} aria-hidden="true" />
                {b.label}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="wls-hero__viz" index={1}>
          <DeskPanel />
        </Reveal>

        {/* Welded to the bottom edge of the hero rather than floated as its
            own section: these four are the hero's supporting evidence, and
            a reader should meet them before they decide whether to scroll,
            not after a section break. */}
        <Reveal as="ul" className="wls-stats" index={2}>
          {WLS_HERO.stats.map((s) => (
            <li key={s.label}>
              <b>{s.value}</b>
              <span>{s.label}</span>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* -- 2. Overview: one ticket, two views -------------------------------------- */

function Overview() {
  const { split } = WLS_OVERVIEW;

  return (
    <HvSection className="wls-overview">
      <div className="wls-overview__grid">
        <Reveal className="wls-overview__copy">
          <span className="hv-eyebrow">{WLS_OVERVIEW.eyebrow}</span>
          <h2 className="hv-h2">{WLS_OVERVIEW.title}</h2>
          {WLS_OVERVIEW.paras.map((p) => (
            <p className="hv-body" key={p.slice(0, 32)}>
              {p}
            </p>
          ))}
          <div className="wls-overview__cta">
            <Btn to={WLS_OVERVIEW.cta.to} variant="primary" iconAfter={WLS_OVERVIEW.cta.icon}>
              {WLS_OVERVIEW.cta.label}
            </Btn>
          </div>
        </Reveal>

        {/* The one diagram on the page. It earns its place because the
            service's whole proposition is that two views of the same
            ticket never meet, and that is genuinely easier to show than
            to describe. Everything inside is real text, not an image, so
            it is readable rather than aria-hidden - a screen reader gets
            the same two lists a sighted reader does. */}
        <Reveal className="wls-split" index={1}>
          <div className="wls-split__ticket">
            <span className="wls-split__ticket-label">{split.ticketLabel}</span>
            <p>{split.ticket}</p>
          </div>

          <div className="wls-split__panes">
            {[split.client, split.us].map((pane, i) => (
              <div className={`wls-pane wls-pane--${i === 0 ? "client" : "us"}`} key={pane.label}>
                <div className="wls-pane__head">
                  <span className="wls-pane__eye">{pane.label}</span>
                  <b className="wls-pane__brand">{pane.brand}</b>
                </div>
                <ul className="wls-pane__rows">
                  {pane.rows.map((row) => (
                    <li key={row}>
                      <Icon name={i === 0 ? "check" : "arrowRight"} strokeWidth={2.8} aria-hidden="true" />
                      {row}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </HvSection>
  );
}

/* -- 3. What is included: the hairline grid ----------------------------------- */

/* Eight cells separated by single rules rather than eight floating cards.
   The rules are the container's own background showing through a 1px grid
   gap, so there is never a doubled border between two neighbours and the
   block reads as one desk with eight lanes. */
function Included() {
  return (
    <HvSection id="included" className="wls-included">
      <Reveal className="wls-head wls-head--center">
        <span className="hv-eyebrow">{WLS_INCLUDED.eyebrow}</span>
        <h2 className="hv-h2">{WLS_INCLUDED.title}</h2>
        <p className="hv-lede">{WLS_INCLUDED.lede}</p>
      </Reveal>

      <ul className="wls-grid">
        {WLS_INCLUDED.items.map((item, i) => (
          <Reveal as="li" className="wls-cell" key={item.title} index={i}>
            <span className="wls-cell__icon" aria-hidden="true">
              <Icon name={item.icon} strokeWidth={1.9} />
            </span>
            <h3 className="wls-cell__title">{item.title}</h3>
            <p className="wls-cell__body">{item.body}</p>
          </Reveal>
        ))}
      </ul>
    </HvSection>
  );
}

/* -- 4. The process: a rail with four nodes ----------------------------------- */

function Process() {
  return (
    <HvSection dark className="wls-process">
      <Reveal className="wls-head wls-head--center">
        <span className="hv-eyebrow">{WLS_PROCESS.eyebrow}</span>
        <h2 className="hv-h2">{WLS_PROCESS.title}</h2>
        <p className="hv-lede">{WLS_PROCESS.lede}</p>
      </Reveal>

      {/* An <ol>, so the order is in the markup rather than only in the
          drawing. The rail and the numbered nodes are decoration over the
          top of it; the number in each node is aria-hidden because the
          list already says which step this is. */}
      <ol className="wls-rail">
        {WLS_PROCESS.steps.map((step, i) => (
          <Reveal as="li" className="wls-step" key={step.num} index={i}>
            <span className="wls-step__node" aria-hidden="true">
              {step.num}
            </span>
            <div className="wls-step__card">
              <h3 className="wls-step__title">{step.title}</h3>
              <p className="wls-step__body">{step.body}</p>
              <span className="wls-step__meta">{step.meta}</span>
            </div>
          </Reveal>
        ))}
      </ol>
    </HvSection>
  );
}

/* -- 5. Who we work with ------------------------------------------------------ */

function Who() {
  return (
    <HvSection className="wls-who">
      <Reveal className="wls-head wls-head--center">
        <span className="hv-eyebrow">{WLS_WHO.eyebrow}</span>
        <h2 className="hv-h2">{WLS_WHO.title}</h2>
        <p className="hv-lede">{WLS_WHO.lede}</p>
      </Reveal>

      <ul className="wls-who__list">
        {WLS_WHO.items.map((item, i) => (
          <Reveal as="li" className="wls-profile" key={item.title} index={i}>
            <span className="wls-profile__icon" aria-hidden="true">
              <Icon name={item.icon} strokeWidth={1.9} />
            </span>
            <div>
              <h3 className="wls-profile__title">{item.title}</h3>
              <p className="wls-profile__body">{item.body}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </HvSection>
  );
}

/* -- 6. Why GHLevelUp --------------------------------------------------------- */

function Why() {
  return (
    <HvSection className="wls-why">
      <div className="wls-why__grid">
        <Reveal className="wls-why__copy">
          <span className="hv-eyebrow">{WLS_WHY.eyebrow}</span>
          <h2 className="hv-h2">{WLS_WHY.title}</h2>
          <p className="hv-lede">{WLS_WHY.lede}</p>
          <div className="wls-why__cta">
            <Btn to={WLS_WHY.cta.to} variant="primary" iconAfter={WLS_WHY.cta.icon}>
              {WLS_WHY.cta.label}
            </Btn>
          </div>
        </Reveal>

        <Reveal as="ul" className="wls-why__list" index={1}>
          {WLS_WHY.points.map((point) => (
            <li key={point}>
              <span aria-hidden="true">
                <Icon name="check" strokeWidth={3} />
              </span>
              {point}
            </li>
          ))}
        </Reveal>
      </div>
    </HvSection>
  );
}

/* -- 7. FAQ ------------------------------------------------------------------- */

function FaqSection() {
  return (
    <HvSection className="wls-faq">
      <StructuredData
        faq={WLS_FAQ.items}
        service={SEO}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: SEO.name, path: `/services/${SEO.slug}` },
        ]}
      />

      <Reveal className="wls-head wls-head--center">
        <span className="hv-eyebrow">{WLS_FAQ.eyebrow}</span>
        <h2 className="hv-h2">{WLS_FAQ.title}</h2>
        <p className="hv-lede">{WLS_FAQ.lede}</p>
      </Reveal>

      <Reveal className="wls-faq__list" index={1}>
        <Faq items={WLS_FAQ.items} />
      </Reveal>
    </HvSection>
  );
}

/* -- 8. Reviews -------------------------------------------------------------- */

function Reviews() {
  return (
    <HvSection dark className="wls-reviews">
      <Reveal className="wls-head wls-head--center">
        <span className="hv-eyebrow">{TESTIMONIALS.eyebrow}</span>
        <h2 className="hv-h2">{TESTIMONIALS.title}</h2>
        <p className="hv-body">{TESTIMONIALS.lede}</p>
      </Reveal>

      <ul className="wls-reviews__grid">
        {TESTIMONIALS.items.map((t, i) => (
          <Reveal as="li" key={t.name} index={i}>
            <figure className="wls-review">
              <span className="wls-review__mark" aria-hidden="true">
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
    <HvSection className="wls-closing">
      <div className="wls-closing__grid">
        <Reveal className="wls-closing__copy">
          <span className="hv-eyebrow">{WLS_CLOSING.eyebrow}</span>
          <h2 className="hv-h2">{WLS_CLOSING.title}</h2>
          <p className="hv-lede">{WLS_CLOSING.lede}</p>

          <div className="wls-closing__ctas">
            <Btn to={WLS_CLOSING.primary.to} variant="primary" size="lg" iconAfter={WLS_CLOSING.primary.icon}>
              {WLS_CLOSING.primary.label}
            </Btn>
            <Btn to={WLS_CLOSING.secondary.to} variant="outline" size="lg">
              {WLS_CLOSING.secondary.label}
            </Btn>
          </div>
        </Reveal>

        {/* The same contact details the /contact page lists, so a reader
            who would rather just call does not have to navigate away. */}
        <Reveal as="ul" className="wls-contact" index={1}>
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
              <b>Our own hours</b>
              <span className="wls-contact__plain">{SITE.hours}</span>
              <small>Your clients' desk is the one that runs 24/7</small>
            </div>
          </li>
        </Reveal>
      </div>
    </HvSection>
  );
}

/* One definition of this page's search identity, read by both its <PageMeta>
   and its Service structured data above - so the title, the description and
   the schema can never describe the same page three slightly different ways. */
const SEO = {
  slug: "white-label-support",
  name: "White-Label Support",
  description:
    "A 24/7 GoHighLevel helpdesk that answers as your agency - certified admins on chat, email, phone and screen-share, under your brand, with no contract and no setup fee.",
  ogDescription:
    "Certified GoHighLevel specialists answering your clients under your brand, around the clock. You keep the credit - we do the work.",
};

export default function ServiceWhiteLabelSupport() {
  return (
    <Layout
      variant="v2"
      topbar={
        <>
          Support tickets piling up after hours? <a href="/book">Get a free coverage plan</a>
        </>
      }
    >
      <PageMeta title={`${SEO.name} - GHLevelUp`} description={SEO.description} ogDescription={SEO.ogDescription} />

      <div className="wls-pg">
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
          service={WLS_ENQUIRY.service}
          eyebrow={WLS_ENQUIRY.eyebrow}
          title={WLS_ENQUIRY.title}
          lede={WLS_ENQUIRY.lede}
          points={WLS_ENQUIRY.points}
        />
        <RelatedServices
          slug="white-label-support"
          title="What your desk will be supporting"
          lede="The builds our helpdesk answers questions about every day."
        />
      </div>
    </Layout>
  );
}
