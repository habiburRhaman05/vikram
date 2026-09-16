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

import {
  SVC_HERO,
  SVC_WHY,
  SVC_GRID,
  SVC_INTEGRATIONS,
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
import "@/styles/services.css";

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
 * decoration competing with the eight things the reader came for.
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
 * One service card. The whole card is the link - one destination, so there
 * is no reason to make the reader aim at a "Learn more" of its own - and
 * the visible label carries a visually hidden service name so a screen
 * reader's links list shows eight distinguishable entries instead of eight
 * identical "Learn more"s.
 */
function ServiceCard({ item, index }) {
  /* alt="" (decorative) on the card art: the card's own title and body name
     the service and say what it does, so a description of the photo would be
     a second, vaguer announcement of the same link. The tone is handed to
     CSS as a custom property - the stylesheet derives the deep and soft ends
     of it from that one value. */
  return (
    <Reveal as="li" index={index}>
      <Link className="svcs-card" to={item.to} style={{ "--tone": item.tone }}>
        <span className="svcs-card__media">
          <picture>
            <source type="image/webp" srcSet={item.imageWebp} />
            <img src={item.image} alt="" width={840} height={525} loading="lazy" decoding="async" />
          </picture>
          <span className="svcs-card__plate" aria-hidden="true">
            <Icon name={item.icon} strokeWidth={2} />
          </span>
        </span>

        <span className="svcs-card__content">
          <span className="svcs-card__name">{item.title}</span>
          <span className="svcs-card__body">{item.body}</span>
          <span className="svcs-card__link">
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
function Integrations() {
  const { hub } = SVC_INTEGRATIONS;

  return (
    <HvSection dark className="svcs-int">
      <div className="svcs-int__inner">
        <Reveal>
          <span className="hv-eyebrow">{SVC_INTEGRATIONS.eyebrow}</span>
          <h2 className="svcs-int__title">
            {SVC_INTEGRATIONS.titleLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
          <p className="hv-lede">{SVC_INTEGRATIONS.lede}</p>

          <ul className="svcs-int__tiles">
            {SVC_INTEGRATIONS.items.map((tool, i) => (
              <Reveal as="li" className="svcs-int__tile" key={tool.name} index={i}>
                <span className="svcs-logo">
                  <img src={`/img/integrations/${tool.logo}.png`} alt="" width={96} height={96} loading="lazy" decoding="async" />
                </span>
                <span>{tool.name}</span>
              </Reveal>
            ))}
          </ul>

          <div className="svcs-int__cta">
            <Btn to={SVC_INTEGRATIONS.cta.to} variant="primary" iconAfter="arrowRight">
              {SVC_INTEGRATIONS.cta.label}
            </Btn>
          </div>
        </Reveal>

        <Reveal className="svcs-int__map" index={1}>
          <Orbits className="svcs-int__orbits" />

          {hub.logos.map((logo, i) => (
            <span className={`svcs-int__node svcs-int__node--${i + 1}`} key={logo}>
              <img src={`/img/integrations/${logo}.png`} alt="" width={96} height={96} loading="lazy" decoding="async" />
            </span>
          ))}

          <ul className="svcs-hub" aria-hidden="true">
            {hub.rows.map((row) => (
              <li className="svcs-hub__row" key={row}>
                <span className="svcs-hub__dot" />
                <span className="svcs-hub__label">{row}</span>
                <span className="svcs-hub__check">
                  <Icon name="check" strokeWidth={2.6} />
                </span>
              </li>
            ))}
          </ul>

          <div className="svcs-int__note" aria-hidden="true">
            <ScriptNote direction="down-right">{SVC_INTEGRATIONS.note}</ScriptNote>
          </div>
        </Reveal>
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
  return (
    <HvSection className="svcs-process">
      <SectionHead eyebrow={SVC_PROCESS.eyebrow} title={SVC_PROCESS.title} center>
        {SVC_PROCESS.lede}
      </SectionHead>

      <ol className="svcs-steps">
        {SVC_PROCESS.steps.map((step, i) => (
          <Reveal as="li" className="svcs-step" key={step.num} index={i} style={{ "--tone": step.tone }}>
            <span className="svcs-step__ghost" aria-hidden="true">
              {step.num}
            </span>

            <span className="svcs-step__icon" aria-hidden="true">
              <Icon name={step.icon} strokeWidth={1.9} />
            </span>

            <h3 className="svcs-step__title">{step.title}</h3>
            <p className="svcs-step__body">{step.body}</p>
          </Reveal>
        ))}
      </ol>
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
      <Reveal className="svcs-closing__band">
        <div>
          <h2 className="svcs-closing__title">{SVC_CLOSING.title}</h2>
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

        <svg className="svcs-closing__scribble" viewBox="0 0 120 70" fill="none" aria-hidden="true" focusable="false">
          <path
            d="M4 6c22 4 44 14 62 30 8 7 15 15 21 26"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="7 7"
          />
          <path d="M78 54c3 5 6 9 9 12 2-4 3-9 3-14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
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
      <StructuredData faq={SVC_FAQ.items} />

      <div className="svcs-faq__inner">
        <Reveal>
          <span className="hv-eyebrow">{SVC_FAQ.eyebrow}</span>
          <h2 className="svcs-faq__title">{SVC_FAQ.title}</h2>
          <p className="hv-lede">{SVC_FAQ.lede}</p>
        </Reveal>

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
        title="Services - GHLevelUp"
        description="CRM & GoHighLevel, AI automation, marketing, funnels, websites and reporting - every service GHLevelUp builds and runs, in one place."
        ogDescription="From CRM and automation to marketing, funnels, websites and reporting - modern systems that attract, engage and convert, supported by one team."
      />

      <Hero />
      <WhyChooseUs />
      <ServiceGrid />
      <Integrations />
      <Process />
      <Results />
      <Closing />
      <Faq />
    </Layout>
  );
}
