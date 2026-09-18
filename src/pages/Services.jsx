import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout.jsx";
import PageMeta from "@/components/common/PageMeta.jsx";
import Icon from "@/components/common/Icon.jsx";
import StructuredData from "@/components/common/StructuredData.jsx";

/* The home redesign's own primitives. They are deliberately not in
   components/common/ - they are styled by home-redesign.css, which only
   applies inside the .home-v2 scope that Layout's variant="v2" sets up. */
import { HvSection, Reveal, SectionHead, Btn, Checks } from "@/components/home/primitives.jsx";
import ScriptNote from "@/components/home/ScriptNote.jsx";
import ServiceMockup from "@/components/home/ServiceMockups.jsx";

import {
  SVC_HERO,
  SVC_WHY,
  SVC_GRID,
  SVC_INDUSTRIES,
  SVC_PROCESS,
  SVC_RESULTS,
  SVC_CLOSING,
  SVC_FAQ,
} from "@/data/servicesV2.jsx";

/* v2 chrome (glass header, SiteFooterV2) - the same two stylesheets every
   other redesigned page loads; see Industries.jsx for why both are needed.
   services.css only adds this page's own sections on top. */
import "@/styles/home-redesign.css";
import "@/styles/home-chrome.css";
/* The service cards draw ServiceMockup scenes, and every .hv-mk-* rule they
   need lives in this stylesheet. It is the same file the home page loads for
   the same components; only the hover animations in it are scoped to
   .hv-wwd__card, so services.css supplies this page's own. */
import "@/styles/home-whatwedo.css";
import "@/styles/services.css";

/* The hub's own ItemList: exactly the cards the page shows, in the order it
   shows them. Built from SVC_GRID rather than from serviceLinks.js so the
   structured data can never describe a different set of services than the
   visitor sees - every slug in that grid has a real route now, so this is
   also the accurate list. Note GoHighLevel Sub-accounts has its own page and
   is in the sitemap without being one of these cards; an ItemList describes
   what THIS page lists, not the whole catalogue. */
const SERVICE_LIST = SVC_GRID.items.map((item) => ({ name: item.title, path: item.to }));

/**
 * /services.
 *
 * The layout follows the approved reference design; every word of the copy
 * and every link is GHLevelUp's own, from src/data/servicesV2.jsx.
 *
 * One structural note that is easy to get wrong when editing this page:
 * the v2 header is transparent at rest and its nav is light-on-dark, and
 * it achieves that by pulling the page's opening hero up underneath itself
 * (see the `.home-v2 .hv-hero, .home-v2 .page-hero, .home-v2 .sd-hero`
 * rule in styles/home-chrome.css). `.svcs-hero` is registered in that same
 * rule - if this hero is ever renamed, that rule has to be updated with it
 * or the page opens with a white strip behind the logo.
 */

/* Decorative dotted orbits and specks - the reference's faint concentric
   marks. Drawn once and reused by both the hero and the integrations map,
   which is why the viewBox is square-ish and scaled rather than matched to
   either section's real aspect ratio. Purely visual: aria-hidden, and the
   sections' own headings carry the meaning. */
function Orbits({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="200" cy="200" r="118" stroke="rgba(255,255,255,.20)" strokeWidth="1.2" strokeDasharray="2 9" />
      <circle cx="200" cy="200" r="168" stroke="rgba(255,255,255,.13)" strokeWidth="1.2" strokeDasharray="2 9" />
      <circle cx="82" cy="118" r="4" fill="rgba(53,217,160,.75)" />
      <circle cx="330" cy="272" r="3" fill="rgba(53,217,160,.6)" />
      <circle cx="314" cy="96" r="2.5" fill="rgba(255,255,255,.4)" />
    </svg>
  );
}

/* -- Sections -------------------------------------------------------------- */

/**
 * The hero: crumb, headline, lede and the two buttons, centred, with no side
 * visual. The laptop mockup, the floating capability card, the orbiting tiles
 * and the handwritten note that used to fill the right column are gone - on
 * a page whose whole job is to list services, a picture of a laptop was
 * decoration competing with the services the reader came for.
 *
 * What replaces that column is the background: three soft colour washes
 * (green, blue, violet) plus the dotted orbits, so the centred block still
 * has depth without a second element beside it.
 */
function Hero() {
  return (
    <section className="svcs-hero">
      <Orbits className="svcs-hero__orbits" />

      <div className="hv-container svcs-hero__inner">
        <Reveal className="svcs-hero__copy">
          {/* Same crumb pattern as the .page-hero pages (Home / this page),
              including the separator mark - so a reader arriving from
              Industries or About sees the hero they already know. */}
          <p className="svcs-hero__crumbs">
            <Link to="/">Home</Link>
            <span>/</span>
            {SVC_HERO.crumb}
          </p>

          <h1 className="svcs-hero__title">
            {SVC_HERO.titleLead}
            <span className="svcs-hero__accent">{SVC_HERO.titleAccent}</span>
          </h1>

          <p className="svcs-hero__lede">{SVC_HERO.lede}</p>

          <div className="svcs-hero__ctas">
            <Btn to={SVC_HERO.primary.to} variant="primary" size="lg" iconAfter={SVC_HERO.primary.icon}>
              {SVC_HERO.primary.label}
            </Btn>
            {/* A fragment link, not a route: it scrolls to the grid below.
                The browser's own smooth scroll handles it, offset by
                html { scroll-padding-top } in legacy/styles.css so the
                section heading doesn't land under the sticky header. */}
            <Btn href={SVC_HERO.secondary.href} variant="outline" size="lg">
              {SVC_HERO.secondary.label}
            </Btn>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  return (
    <HvSection className="svcs-why">
      <div className="svcs-why__inner">
        <Reveal>
          <span className="hv-eyebrow">{SVC_WHY.eyebrow}</span>
          <h2 className="svcs-why__title">
            {SVC_WHY.titleLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
          <p className="hv-lede">{SVC_WHY.lede}</p>

          <ul className="svcs-why__list">
            {SVC_WHY.items.map((item, i) => (
              <Reveal as="li" className="svcs-why__item" key={item.title} index={i} style={{ "--tone": item.tone }}>
                <span className="svcs-why__icon" aria-hidden="true">
                  <Icon name={item.icon} strokeWidth={2} />
                </span>
                <span>
                  <span className="svcs-why__name">{item.title}</span>
                  <span className="svcs-why__body">{item.body}</span>
                </span>
              </Reveal>
            ))}
          </ul>

          <div className="svcs-why__cta">
            <Btn to={SVC_WHY.cta.to} variant="primary" iconAfter="arrowRight">
              {SVC_WHY.cta.label}
            </Btn>
          </div>
        </Reveal>

        <Reveal className="svcs-why__media" index={1}>
          <picture>
            <source type="image/webp" srcSet={SVC_WHY.imageWebp} />
            <img src={SVC_WHY.image} alt={SVC_WHY.imageAlt} width={1240} height={930} loading="lazy" decoding="async" />
          </picture>

          <div className="svcs-why__note" aria-hidden="true">
            <ScriptNote direction="down-left">{SVC_WHY.note}</ScriptNote>
          </div>
        </Reveal>
      </div>
    </HvSection>
  );
}

/**
 * One service card: the product mockup, the name, what the service is for,
 * what the engagement includes, and the button through to the detail page.
 *
 * The whole card is the link, and the "Learn more" button inside it is a
 * span rather than a second link - one destination means one tab stop, and
 * the reader can click the button, the picture or the heading and land in
 * the same place. The label carries a visually hidden service name so a
 * screen reader's links list shows four distinguishable entries instead of
 * four identical "Learn more"s.
 */
function ServiceCard({ item, index }) {
  /* The art is a drawn mockup of the product, not a photograph - which slug
     is drawn comes from `mock` in servicesV2.jsx, and the scenes themselves
     are in ServiceMockups.jsx. It is decoration either way: aria-hidden, and
     the card's own title, body and list carry every word of the meaning.

     There is no icon plate floating over it any more. It was one more mark
     to read on a card that already carries a picture, a title, a paragraph,
     six list items and a button, and it sat half over the join between the
     art and the copy - so at two cards per row, where the art is large
     enough to be looked at, it was covering the thing it decorated.

     The tone is handed to CSS as a custom property; the stylesheet derives
     the deep and soft ends of it from that one value. It colours the art
     stage and the hover state only - the tick marks and the button are the
     brand green on all four cards, so the thing you click looks the same
     everywhere rather than changing colour per service. */
  return (
    <Reveal as="li" index={index} className={item.wide ? "svcs-cell--wide" : undefined}>
      <Link
        className={`svcs-card${item.wide ? " svcs-card--wide" : ""}`}
        to={item.to}
        style={{ "--tone": item.tone }}
      >
        <span className="svcs-card__media" aria-hidden="true">
          <ServiceMockup kind={item.mock} />
        </span>

        <span className="svcs-card__content">
          <span className="svcs-card__name">{item.title}</span>
          <span className="svcs-card__body">{item.body}</span>

          {/* A real list, so a screen reader announces "6 items" and the
              reader can skim it the way the eye does on screen. */}
          <ul className="svcs-card__subs">
            {item.subs.map((sub) => (
              <li className="svcs-card__sub" key={sub}>
                <Icon name="check" aria-hidden="true" strokeWidth={3} />
                {sub}
              </li>
            ))}
          </ul>

          {/* Styled as the page's primary button rather than a text link -
              it is the card's call to action, so it should look like the
              other calls to action on the page. It is a <span>, not a
              button or a second <a>: the whole card is already the link,
              and nesting an interactive element inside one is invalid and
              would put a second stop in the tab order for the same
              destination. */}
          <span className="svcs-card__cta">
            {SVC_GRID.learnLabel}
            <span className="hv-sr-only"> about {item.title}</span>
            <Icon name="arrowRight" aria-hidden="true" strokeWidth={2.4} />
          </span>
        </span>
      </Link>
    </Reveal>
  );
}

function ServiceGrid() {
  return (
    <HvSection id="services" className="svcs-grid-sec">
      <SectionHead eyebrow={SVC_GRID.eyebrow} title={SVC_GRID.title} center>
        {SVC_GRID.lede}
      </SectionHead>

      <ul className="svcs-grid">
        {SVC_GRID.items.map((item, i) => (
          <ServiceCard item={item} index={i} key={item.to} />
        ))}
      </ul>
    </HvSection>
  );
}

/**
 * "Platforms & integrations": the tile list on the left, and on the right a
 * diagram of one record moving through the whole system - a hub card with
 * the five steps, ringed by the platforms involved.
 *
 * The diagram is decoration with a job: every mark in it is a real platform
 * we connect, and the hub rows are the real hand-offs. It is still
 * aria-hidden, because the hub repeats in prose what the tile list beside
 * it already states.
 */
function Industries() {
  return (
    <HvSection dark className="svcs-int">
      <SectionHead eyebrow={SVC_INDUSTRIES.eyebrow} title={SVC_INDUSTRIES.title} center>
        {SVC_INDUSTRIES.lede}
      </SectionHead>

      <ul className="svcs-industry-grid">
        {SVC_INDUSTRIES.items.map((ind, i) => (
          <Reveal as="li" className="svcs-industry-card" key={ind.name} index={i} style={{ "--tone": ind.tone }}>
            <span className="svcs-industry-icon">
              <Icon name={ind.icon} strokeWidth={2} />
            </span>
            <span className="svcs-industry-name">{ind.name}</span>
          </Reveal>
        ))}
      </ul>

      <div style={{ textAlign: "center", marginTop: "var(--hv-s8)" }}>
        <Btn to={SVC_INDUSTRIES.cta.to} variant="primary" iconAfter="arrowRight">
          {SVC_INDUSTRIES.cta.label}
        </Btn>
      </div>
    </HvSection>
  );
}

/**
 * The process, as four colour-coded steps.
 *
 * What changed from the four plain white boxes: each step now carries its own
 * hue (--tone), and that hue runs through the whole card - the rail along its
 * top edge, the icon plate, the number, the connector that points at the next
 * step, and the lift shadow on hover. The four cards therefore read as one
 * sequence travelling left to right instead of four interchangeable panels,
 * and the faint tint on each card's own surface stops the row reading as a
 * wall of white.
 *
 * The connector is the step's own ::after rather than an element, and the
 * section stays a plain <ol> with <li> children: whether the steps are laid
 * out as one row, two columns or a stack is entirely the stylesheet's call,
 * which is what makes it responsive without a second markup path.
 *
 * The number is documented once: the big tone-tinted numeral in the corner.
 * It is aria-hidden, because the <ol> already tells a screen reader which
 * step this is - printing "Step 1" as text as well would say it twice, and
 * the words "step 1" are not what the numbered mark is for on screen.
 */
function Process() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <HvSection className="svcs-process">
      <SectionHead eyebrow={SVC_PROCESS.eyebrow} title={SVC_PROCESS.title} center>
        {SVC_PROCESS.lede}
      </SectionHead>

      <div className="svcs-process-tabs">
        <div className="svcs-process-tabs__nav" role="tablist">
          {SVC_PROCESS.steps.map((step, i) => (
            <button 
              key={step.num}
              id={`svcs-tab-${step.num}`}
              role="tab"
              aria-selected={activeStep === i}
              aria-controls={`svcs-pane-${step.num}`}
              className={`svcs-process-tab ${activeStep === i ? 'is-active' : ''}`}
              style={{ "--tone": step.tone }}
              onClick={() => setActiveStep(i)}
            >
              <span className="svcs-process-tab__num">0{step.num}</span>
              <span className="svcs-process-tab__title">{step.title}</span>
            </button>
          ))}
        </div>
        
        <div className="svcs-process-tabs__content">
          {SVC_PROCESS.steps.map((step, i) => (
            <div 
              key={step.num}
              id={`svcs-pane-${step.num}`}
              role="tabpanel"
              aria-labelledby={`svcs-tab-${step.num}`}
              className={`svcs-process-pane ${activeStep === i ? 'is-active' : ''}`}
              style={{ "--tone": step.tone }}
            >
              <span className="svcs-process-pane__icon">
                <Icon name={step.icon} strokeWidth={2} />
              </span>
              <div className="svcs-process-pane__text">
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </HvSection>
  );
}

function Results() {
  return (
    <HvSection dark className="svcs-results">
      <div className="svcs-results__inner">
        <Reveal className="svcs-results__media">
          <div className="svcs-results__photo">
            <picture>
              <source type="image/webp" srcSet={SVC_RESULTS.imageWebp} />
              <img
                src={SVC_RESULTS.image}
                alt={SVC_RESULTS.imageAlt}
                width={1240}
                height={868}
                loading="lazy"
                decoding="async"
              />
            </picture>
          </div>

          {SVC_RESULTS.cards.map((card, i) => (
            <div className={`svcs-float svcs-float--${card.tone} svcs-float--${i + 1}`} key={card.title}>
              <span className="svcs-float__icon" aria-hidden="true">
                <Icon name={card.icon} strokeWidth={2} />
              </span>
              <span className="svcs-float__text">
                <span className="svcs-float__title">{card.title}</span>
                <span className="svcs-float__body">
                  {card.live ? <span className="svcs-float__live">{card.body}</span> : card.body}
                </span>
              </span>
            </div>
          ))}
        </Reveal>

        <Reveal index={1}>
          <span className="hv-eyebrow">{SVC_RESULTS.eyebrow}</span>
          <h2 className="svcs-results__title">{SVC_RESULTS.title}</h2>
          <p className="hv-lede">{SVC_RESULTS.lede}</p>
          <Checks items={SVC_RESULTS.checks} className="svcs-results__checks" />
        </Reveal>
      </div>
    </HvSection>
  );
}

function Closing() {
  return (
    <HvSection tight className="svcs-closing">
      <Reveal className="svcs-closing__glass">
        <span className="svcs-closing__orb svcs-closing__orb--1" aria-hidden="true" />
        <span className="svcs-closing__orb svcs-closing__orb--2" aria-hidden="true" />
        <span className="svcs-closing__orb svcs-closing__orb--3" aria-hidden="true" />

        <div className="svcs-closing__content">
          <h2 className="svcs-closing__title">
            Ready to Take Your Business to the <span className="svcs-closing__accent">Next Level?</span>
          </h2>
          <p className="svcs-closing__lede">{SVC_CLOSING.lede}</p>
        </div>

        <div className="svcs-closing__actions">
          <Btn to={SVC_CLOSING.primary.to} variant="primary" size="lg" iconAfter={SVC_CLOSING.primary.icon}>
            {SVC_CLOSING.primary.label}
          </Btn>
          <Btn href={SVC_CLOSING.secondary.href} variant="outline" size="lg">
            {SVC_CLOSING.secondary.label}
          </Btn>
        </div>
      </Reveal>
    </HvSection>
  );
}

/**
 * FAQ. <details>/<summary> so the browser supplies the semantics, keyboard
 * behaviour and find-in-page expansion; React only tracks which one is open,
 * so opening a question closes the previous one. Same pattern as the home
 * page's FAQ, and the answers are published as FAQPage structured data.
 */
function Faq() {
  const [openKey, setOpenKey] = useState(null);

  return (
    <HvSection className="svcs-faq">
      <StructuredData
        faq={SVC_FAQ.items}
        collection={{
          name: "Services",
          description: SVC_GRID.lede,
          path: "/services",
          items: SERVICE_LIST,
        }}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]}
      />

      <SectionHead eyebrow={SVC_FAQ.eyebrow} title={SVC_FAQ.title} center>
        {SVC_FAQ.lede}
      </SectionHead>

      <div className="svcs-faq__inner">
        <Reveal className="svcs-faq__list" index={1}>
          {SVC_FAQ.items.map((item, i) => (
            <details
              className="svcs-faq__item"
              key={item.question}
              open={openKey === i}
              onToggle={(e) => {
                if (e.currentTarget.open) setOpenKey(i);
                else if (openKey === i) setOpenKey(null);
              }}
            >
              <summary className="svcs-faq__q">
                <span>{item.question}</span>
                <span className="svcs-faq__sign" aria-hidden="true" />
              </summary>
              <div className="svcs-faq__a">
                <p className="hv-body">{item.answer}</p>
              </div>
            </details>
          ))}
        </Reveal>
      </div>
    </HvSection>
  );
}

export default function Services() {
  return (
    <Layout
      variant="v2"
      topbar={<>Tell us what's slowing your team down - <a href="/contact">we'll say which of this fits</a></>}
    >
      <PageMeta
        title="Services: CRM, AI Automation, Funnels, Websites - GHLevelUp"
        description="CRM & GoHighLevel, AI automation, marketing, funnels, websites and reporting - every service GHLevelUp builds and runs, in one place."
        ogDescription="From CRM and automation to marketing, funnels, websites and reporting - modern systems that attract, engage and convert, supported by one team."
      />

      <Hero />
      <WhyChooseUs />
      <ServiceGrid />
      <Industries />
      <Process />
      <Results />
      <Closing />
      <Faq />
    </Layout>
  );
}
