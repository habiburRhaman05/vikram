import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout.jsx";
import PageMeta from "@/components/common/PageMeta.jsx";
import StructuredData from "@/components/common/StructuredData.jsx";
import Icon from "@/components/common/Icon.jsx";
import Faq from "@/components/common/Faq.jsx";
import { HvSection, Reveal, Btn } from "@/components/home/primitives.jsx";
import ServiceContactCard from "@/components/services/ServiceContactCard.jsx";
import ServiceEnquiryForm from "@/components/services/ServiceEnquiryForm.jsx";
import RelatedServices from "@/components/services/RelatedServices.jsx";

import {
  AI_HERO,
  AI_INTRO,
  AI_OFFERINGS,
  AI_FLOW,
  AI_DETAILS,
  AI_USECASES,
  AI_WORK,
  AI_BENEFITS,
  AI_ENQUIRY,
  AI_FAQ,
} from "@/data/serviceAiAgents.jsx";

/* v2 chrome (glass header, SiteFooterV2) - the same two stylesheets every
   other redesigned page loads; see Industries.jsx for why both are needed.
   service-detail.css only adds this page's own sections on top. */
import "@/styles/home-redesign.css";
import "@/styles/home-chrome.css";
import "@/styles/service-detail.css";

/**
 * /services/ai-agents-chatbots.
 *
 * Covers the whole conversational-AI offer - voice receptionist,
 * conversational AI, the website widget and social/SMS DMs - as four named
 * offerings on one page. See the note at the top of data/serviceAiAgents.jsx
 * for why they are not four separate thin pages, and for the two content
 * rules this page holds to (no invented client claims, no invented metrics).
 *
 * Section order is deliberately a narrative rather than a stack of card
 * shelves: what it is, how it answers, how it works, what is included, who
 * it suits, what a build looks like, what changes, then the ask.
 *
 * STRUCTURAL NOTE: the v2 header is transparent at rest with light-on-dark
 * nav, achieved by pulling the opening hero up under it (the
 * `.home-v2 .hv-hero, .home-v2 .page-hero, .home-v2 .sd-hero` rule in
 * styles/home-chrome.css). `.sd-hero` is registered there - renaming this
 * hero without updating that rule opens the page with a white strip behind
 * the logo.
 */

/** Chat bubbles for the hero's call mock. Decorative - the card is
 *  aria-hidden and the copy beside it carries the meaning. */
function Bubbles({ lines }) {
  return lines.map((line, i) => (
    <span className={`sd-bubble sd-bubble--${line.from}`} key={i}>
      {line.text}
    </span>
  ));
}

/* Waveform bar delays. Kept here rather than in CSS so the bar count and
   the rhythm live in one place; staggered rather than uniform so the row
   reads as speech instead of a metronome. */
const WAVE = [0, 0.14, 0.3, 0.08, 0.36, 0.2, 0.44, 0.12, 0.32, 0.04, 0.26, 0.4, 0.16, 0.34, 0.1, 0.22];

function Hero() {
  return (
    <section className="sd-hero sd-hero--split">
      <div className="hv-container sd-hero__inner">
        <Reveal>
          <p className="sd-hero__crumbs">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/services">Services</Link>
            <span>/</span>
            {AI_HERO.crumb}
          </p>

          <span className="sd-hero__eyebrow">{AI_HERO.eyebrow}</span>

          <h1 className="sd-hero__title">
            {AI_HERO.titleLead}
            <span>{AI_HERO.titleAccent}</span>
          </h1>

          <p className="sd-hero__lede">{AI_HERO.lede}</p>

          <div className="sd-hero__ctas">
            {/* Both are fragment links into this page, offset by
                html { scroll-padding-top } in legacy/styles.css so the
                target heading clears the sticky header. */}
            <Btn href={AI_HERO.primary.to} variant="primary" size="lg" iconAfter={AI_HERO.primary.icon}>
              {AI_HERO.primary.label}
            </Btn>
            <Btn href={AI_HERO.secondary.href} variant="outline" size="lg">
              {AI_HERO.secondary.label}
            </Btn>
          </div>
        </Reveal>

        {/* Decorative: a representative call being answered and booked. */}
        <Reveal className="sd-call" index={1} aria-hidden="true">
          <div className="sd-call__head">
            <span className="sd-call__ring">
              <Icon name="phone" />
            </span>
            <span className="sd-call__who">
              <b>{AI_HERO.call.label}</b>
              <span>{AI_HERO.call.meta}</span>
            </span>
            <span className="sd-call__timer">{AI_HERO.call.timer}</span>
          </div>

          <div className="sd-call__wave">
            {WAVE.map((d, i) => (
              <i key={i} style={{ animationDelay: `${d}s` }} />
            ))}
          </div>

          <div className="sd-call__body">
            <Bubbles lines={AI_HERO.call.lines} />
          </div>

          <p className="sd-call__foot">
            <Icon name="check" />
            {AI_HERO.call.foot}
          </p>
        </Reveal>
      </div>
    </section>
  );
}


function Intro() {
  return (
    <HvSection className="sd-intro">
      <div className="sd-intro__inner">
        <Reveal className="sd-intro__aside">
          <span className="hv-eyebrow">{AI_INTRO.eyebrow}</span>
          <h2 className="sd-intro__title">{AI_INTRO.title}</h2>

          <blockquote className="sd-intro__quote">
            <p>{AI_INTRO.quote.text}</p>
            <span>{AI_INTRO.quote.attribution}</span>
          </blockquote>
        </Reveal>

        <Reveal className="sd-intro__prose" index={1}>
          {AI_INTRO.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </Reveal>
      </div>

      <Reveal as="ul" className="sd-facts" index={2}>
        {AI_INTRO.facts.map((fact) => (
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
        <span className="hv-eyebrow">{AI_DETAILS.eyebrow}</span>
        <h2 className="hv-h2">{AI_DETAILS.title}</h2>
        <p className="hv-body">{AI_DETAILS.lede}</p>
      </Reveal>

      <ul className="sd-details">
        {AI_DETAILS.groups.map((group, i) => (
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
        <span className="hv-eyebrow">{AI_USECASES.eyebrow}</span>
        <h2 className="hv-h2">{AI_USECASES.title}</h2>
        <p className="hv-lede">{AI_USECASES.lede}</p>
      </Reveal>

      <ul className="sd-grid">
        {AI_USECASES.items.map((item, i) => (
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

function Work() {
  return (
    <HvSection mint>
      <Reveal className="sd-grid-head">
        <span className="hv-eyebrow">{AI_WORK.eyebrow}</span>
        <h2 className="hv-h2">{AI_WORK.title}</h2>
        <p className="hv-lede">{AI_WORK.lede}</p>
      </Reveal>

      <ul className="sd-work">
        {AI_WORK.items.map((item, i) => (
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
        {AI_WORK.note}
      </Reveal>
    </HvSection>
  );
}

function Benefits() {
  return (
    <HvSection>
      <Reveal className="sd-grid-head">
        <span className="hv-eyebrow">{AI_BENEFITS.eyebrow}</span>
        <h2 className="hv-h2">{AI_BENEFITS.title}</h2>
        <p className="hv-body">{AI_BENEFITS.lede}</p>
      </Reveal>

      <ul className="sd-bens">
        {AI_BENEFITS.items.map((item, i) => (
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

function Offerings() {
  return (
    <HvSection mint id="offerings">
      <Reveal className="sd-grid-head">
        <span className="hv-eyebrow">{AI_OFFERINGS.eyebrow}</span>
        <h2 className="hv-h2">{AI_OFFERINGS.title}</h2>
        <p className="hv-lede">{AI_OFFERINGS.lede}</p>
      </Reveal>

      <ul className="sd-offers">
        {AI_OFFERINGS.items.map((item, i) => (
          <Reveal as="li" key={item.name} index={i}>
            <article className="sd-offer">
              <div className="sd-offer__head">
                <span className="sd-card__icon" aria-hidden="true">
                  <Icon name={item.icon} />
                </span>
                <h3>{item.name}</h3>
                <span className="sd-offer__tag">{item.tag}</span>
              </div>

              <p className="sd-offer__body">{item.body}</p>

              <ul className="sd-offer__points">
                {item.points.map((p) => (
                  <li key={p}>
                    <Icon name="check" aria-hidden="true" />
                    {p}
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

function HowItWorks() {
  return (
    <HvSection dark id="how-it-works">
      <div className="sd-proc__inner">
        <Reveal>
          <span className="hv-eyebrow">{AI_FLOW.eyebrow}</span>
          <h2 className="hv-h2">{AI_FLOW.title}</h2>
          <p className="hv-body">{AI_FLOW.lede}</p>

          <ol className="sd-steps">
            {AI_FLOW.steps.map((step, i) => (
              <Reveal as="li" className="sd-step" key={step.title} index={i}>
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
        </Reveal>

        {/* The routing decision itself, drawn in markup rather than a stock
            desk photo - this section is about the choice the system makes,
            and a picture of a laptop said nothing about it. aria-hidden
            because the six steps beside it already state the same flow in
            prose; this is the diagram of that, not extra information. */}
        <Reveal className="sd-proc__media" index={1}>
          <div className="sd-route" aria-hidden="true">
            <p className="sd-route__cap">{AI_FLOW.diagram.caption}</p>

            <span className="sd-route__node">
              <Icon name="phone" />
              {AI_FLOW.diagram.start}
            </span>

            <span className="sd-route__link" />

            <span className="sd-route__ask">{AI_FLOW.diagram.ask}</span>

            <div className="sd-route__split">
              {AI_FLOW.diagram.branches.map((branch) => (
                <div className="sd-route__branch" key={branch.tag}>
                  <span className="sd-route__tag">{branch.tag}</span>
                  {branch.nodes.map((node) => (
                    <span className="sd-route__node" key={node}>
                      {node}
                    </span>
                  ))}
                </div>
              ))}
            </div>

            <span className="sd-route__node sd-route__end">
              <Icon name="check" />
              {AI_FLOW.diagram.end}
            </span>
          </div>
        </Reveal>
      </div>
    </HvSection>
  );
}





function FaqSection() {
  return (
    <HvSection className="sd-faq">
      <StructuredData faq={AI_FAQ.items} />

      <div className="sd-faq__inner">
        <Reveal>
          <span className="hv-eyebrow">{AI_FAQ.eyebrow}</span>
          <h2 className="hv-h2">{AI_FAQ.title}</h2>
          <p className="hv-body">{AI_FAQ.lede}</p>

          <div className="sd-faq__list">
            <Faq items={AI_FAQ.items} />
          </div>
        </Reveal>

        <ServiceContactCard card={AI_FAQ.card} />
      </div>
    </HvSection>
  );
}

export default function ServiceAiAgentsChatbots() {
  return (
    <Layout
      variant="v2"
      topbar={
        <>
          Hear it answer a live call - <a href="/book">book a 20-minute demo</a>
        </>
      }
    >
      <PageMeta
        title="AI Agents & Chatbots - GHLevelUp"
        description="Voice AI, conversational AI, website chat widget and social DMs - one agent that answers every call, text and chat around the clock, qualifies the caller and books into your calendar."
        ogDescription="An AI receptionist for calls, texts, web chat and social DMs: answers in seconds at any hour, in English or Spanish, books into your real calendar and hands off to a person when it should."
      />

      <Hero />
      <Intro />
      <Offerings />
      <HowItWorks />
      <Details />
      <UseCases />
      <Work />
      <Benefits />
      <ServiceEnquiryForm
        service={AI_ENQUIRY.service}
        eyebrow={AI_ENQUIRY.eyebrow}
        title={AI_ENQUIRY.title}
        lede={AI_ENQUIRY.lede}
        points={AI_ENQUIRY.points}
      />
      <RelatedServices
        slug="ai-agents-chatbots"
        title="What to switch on next to it"
        lede="An AI agent answers the door. These are the three things that decide what happens once it has."
      />
      <FaqSection />
    </Layout>
  );
}
