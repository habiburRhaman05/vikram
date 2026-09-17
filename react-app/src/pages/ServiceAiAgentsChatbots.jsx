import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout.jsx";
import PageMeta from "@/components/common/PageMeta.jsx";
import StructuredData from "@/components/common/StructuredData.jsx";
import Icon from "@/components/common/Icon.jsx";
import Faq from "@/components/common/Faq.jsx";
import { HvSection, Reveal, Btn } from "@/components/home/primitives.jsx";
import ServiceEnquiryForm from "@/components/services/ServiceEnquiryForm.jsx";
import RelatedServices from "@/components/services/RelatedServices.jsx";
import { SITE } from "@/data/site";


import {
  AI_HERO,
  AI_INTRO,
  AI_OFFERINGS,
  AI_FLOW,
  AI_DETAILS,
  AI_USECASES,
  AI_WORK,
  AI_BENEFITS,
  AI_CLOSING,
  AI_ENQUIRY,
  AI_FAQ,
} from "@/data/serviceAiAgents.jsx";

/* v2 chrome (glass header, SiteFooterV2) - the same two stylesheets every
   other redesigned page loads; see Industries.jsx for why both are needed.

   service-detail.css is imported for ONE shared component only, the
   RelatedServices shelf at the foot of the page (.sd-rel). Nothing this page
   owns is styled by it: service-ai-agents.css carries every ai- class, and
   no sd- layout class appears in any section below. */
import "@/styles/home-redesign.css";
import "@/styles/home-chrome.css";
import "@/styles/service-detail.css";
import "@/styles/service-ai-agents.css";

/**
 * /services/ai-agents-chatbots.
 *
 * Covers the whole conversational-AI offer - voice receptionist,
 * conversational AI over chat, the website widget and social/SMS DMs - as
 * four named offerings on one page. See the note at the top of
 * data/serviceAiAgents.jsx for why they are not four separate thin pages,
 * and for the two content rules this page holds to (no invented client
 * claims, no invented metrics).
 *
 * SECTION ORDER is the one established by /services/crm-sub-account-setup,
 * deliberately kept identical so the service pages read in the same order as
 * each other:
 *
 *   hero overview -> overview + the four offerings -> what's included ->
 *   how it works (journey bar, phases, a proof panel per phase, routing
 *   diagram) -> who we work with (+ representative setups) -> why GHLevelUp
 *   -> FAQ -> client reviews -> closing CTA with the contact details ->
 *   enquiry form -> related services.
 *
 * LAYOUT IS NOT SHARED WITH THAT PAGE, OR ANY OTHER. The CRM page is a
 * blueprint/spec sheet (architecture tree, before/after states, sticky rail
 * and ledger, stepper). This page is a console/signal desk: a channel spine
 * in the hero, a readout panel for the product facts, offering cards with
 * dark channel headers, a manifest of pills, phases whose proof is a coded
 * mock (transcript, readout, status, checklist), and a horizontal routing
 * lane. Same order, same brand tokens, different shapes throughout - all of
 * it in styles/service-ai-agents.css. Do not fold these sections into
 * service-detail.css or copy cs- markup into it.
 *
 * STRUCTURAL NOTE: the v2 header is transparent at rest with light-on-dark
 * nav, achieved by pulling the opening hero up under it (the
 * `.home-v2 .hv-hero, .home-v2 .page-hero, .home-v2 .sd-hero, ...` rule in
 * styles/home-chrome.css). `.ai-hero` is registered in that rule - renaming
 * this hero without updating it opens the page with a white strip behind the
 * logo.
 */

/* -- 1. Hero: copy + the channel spine --------------------------------------- */

/** The four doors one agent answers, and the one record they all write to.
 *  Decorative: aria-hidden, because the copy beside it already states the
 *  same offer in prose. */
function ChannelSpine() {
  const { spine } = AI_HERO;
  return (
    <div className="ai-spine" aria-hidden="true">
      <p className="ai-spine__cap">{spine.caption}</p>

      <ul className="ai-spine__channels">
        {spine.channels.map((channel) => (
          <li className="ai-spine__channel" key={channel.label}>
            <span className="ai-spine__icon">
              <Icon name={channel.icon} />
            </span>
            <span className="ai-spine__text">
              <b>{channel.label}</b>
              <small>{channel.note}</small>
            </span>
            <span className="ai-spine__status">{channel.status}</span>
          </li>
        ))}
      </ul>

      <p className="ai-spine__record">
        <span className="ai-spine__icon">
          <Icon name={spine.record.icon} />
        </span>
        <span className="ai-spine__text">
          <b>{spine.record.label}</b>
          <small>{spine.record.note}</small>
        </span>
      </p>
    </div>
  );
}

function Hero() {
  return (
    <section className="ai-hero">
      <div className="hv-container ai-hero__inner">
        <Reveal as="p" className="ai-hero__crumbs">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/services">Services</Link>
          <span>/</span>
          {AI_HERO.crumb}
        </Reveal>

        <Reveal className="ai-hero__copy">
          <span className="ai-hero__eyebrow">{AI_HERO.eyebrow}</span>

          <h1 className="ai-hero__title">
            {AI_HERO.titleLead}
            <span>{AI_HERO.titleAccent}</span>
          </h1>

          <p className="ai-hero__lede">{AI_HERO.lede}</p>

          <div className="ai-hero__ctas">
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

        <Reveal className="ai-hero__aside" index={1}>
          <ChannelSpine />
        </Reveal>
      </div>
    </section>
  );
}

/* -- 2. Overview ------------------------------------------------------------- */

function Overview() {
  return (
    <HvSection className="ai-overview">
      <div className="ai-overview__grid">
        {/* Heading and the one line worth remembering share the left column:
            the quote is the argument the prose beside it makes, so it sits
            as a card at reading height rather than as a band under the
            whole section. */}
        <Reveal className="ai-overview__head">
          <span className="hv-eyebrow">{AI_INTRO.eyebrow}</span>
          <h2 className="hv-h2">{AI_INTRO.title}</h2>

          <blockquote className="ai-quote">
            <p>{AI_INTRO.quote.text}</p>
            <span>{AI_INTRO.quote.attribution}</span>
          </blockquote>
        </Reveal>

        <div className="ai-overview__body">
          <Reveal>
            {AI_INTRO.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </Reveal>

          {/* The product facts as a spec list with dotted leaders - the shape
              a datasheet uses, so a reader can skim to the number they came
              for. Product facts only; see rule 2 at the top of the data
              file. */}
          <Reveal as="ul" className="ai-spec" index={1}>
            {AI_INTRO.facts.map((fact) => (
              <li className="ai-spec__row" key={fact.label}>
                <span className="ai-spec__label">{fact.label}</span>
                <span className="ai-spec__lead" aria-hidden="true" />
                <b className="ai-spec__value">{fact.num}</b>
                <span className="ai-spec__sub">{fact.sub}</span>
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </HvSection>
  );
}

/* -- 3. The four offerings --------------------------------------------------- */

function Channels() {
  return (
    <HvSection mint className="ai-channels" id="offerings">
      <Reveal className="ai-head">
        <span className="hv-eyebrow">{AI_OFFERINGS.eyebrow}</span>
        <h2 className="hv-h2">{AI_OFFERINGS.title}</h2>
        <p className="hv-lede">{AI_OFFERINGS.lede}</p>
      </Reveal>

      <ul className="ai-channels__grid">
        {AI_OFFERINGS.items.map((item, i) => (
          <Reveal as="li" key={item.name} index={i}>
            <article className="ai-channel">
              {/* The dark header is the channel this offering answers on -
                  the one thing that distinguishes the four cards at a
                  glance. */}
              <header className="ai-channel__head">
                <span className="ai-channel__icon" aria-hidden="true">
                  <Icon name={item.icon} />
                </span>
                <h3>{item.name}</h3>
                <span className="ai-channel__tag">{item.tag}</span>
              </header>

              <p className="ai-channel__body">{item.body}</p>

              <ul className="ai-channel__points">
                {item.points.map((point) => (
                  <li key={point}>
                    <Icon name="check" aria-hidden="true" />
                    {point}
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

/* -- 4. What's included ------------------------------------------------------ */

function Included() {
  return (
    <HvSection className="ai-included" id="included">
      <Reveal className="ai-head ai-head--center">
        <span className="hv-eyebrow">{AI_DETAILS.eyebrow}</span>
        <h2 className="hv-h2">{AI_DETAILS.title}</h2>
        <p className="hv-lede">{AI_DETAILS.lede}</p>
      </Reveal>

      {/* A bento of four unequal tiles on a 12-column grid (7+5, then 5+7),
          not a plain 2x2: the wide tiles carry their items in two columns so
          the pair reads as one block, and each tile carries its own ghost
          numeral and icon plate. */}
      <ul className="ai-scope">
        {AI_DETAILS.groups.map((group, i) => (
          <Reveal
            as="li"
            className={`ai-scope__tile ai-scope__tile--${i % 2 === 0 ? "wide" : "narrow"}`}
            key={group.title}
            index={i}
          >
            <span className="ai-scope__ghost" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>

            <header className="ai-scope__head">
              <span className="ai-scope__icon" aria-hidden="true">
                <Icon name={group.icon} />
              </span>
              <h3>{group.title}</h3>
            </header>

            <ul className="ai-scope__items">
              {group.items.map((item) => (
                <li key={item}>
                  <Icon name="tick" strokeWidth={3} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ul>
    </HvSection>
  );
}

/* -- 5. How it works: journey, phases, proof, routing ------------------------ */

/** One coded mock of the artefact a phase produces. `proof.kind` in the data
 *  selects the shape; a phase added with a new kind needs a case here and
 *  the matching ai-proof__* rules in the stylesheet. */
function ProofPanel({ proof }) {
  return (
    <div className="ai-proof" aria-hidden="true">
      <p className="ai-proof__cap">{proof.caption}</p>

      {proof.kind === "status" && (
        <ul className="ai-proof__status">
          {proof.rows.map((row) => (
            <li key={row.label} className={row.state === "done" ? "is-done" : "is-pending"}>
              <Icon name={row.state === "done" ? "check" : "clock"} />
              {row.label}
            </li>
          ))}
        </ul>
      )}

      {proof.kind === "record" && (
        <dl className="ai-proof__record">
          {proof.rows.map((row) => (
            <div key={row.label}>
              <dt>{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {proof.kind === "transcript" && (
        <ol className="ai-proof__transcript">
          {proof.lines.map((line, i) => (
            <li key={i} className={`is-${line.from}`}>
              {line.text}
            </li>
          ))}
        </ol>
      )}

      {proof.kind === "checks" && (
        <ul className="ai-proof__checks">
          {proof.items.map((item) => (
            <li key={item}>
              <Icon name="tick" strokeWidth={3} />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** The routing decision, laid out as a horizontal lane: what arrives, the
 *  one question the flow asks, the two answers, and where both of them end
 *  up. Drawn in markup rather than a stock photo, because this section is
 *  about the choice the system makes. Decorative - the phases beside it
 *  state the same flow in prose. */
function RoutingLane() {
  const { diagram } = AI_FLOW;
  return (
    <div className="ai-route" aria-hidden="true">
      <p className="ai-route__cap">{diagram.caption}</p>

      <div className="ai-route__lane">
        <span className="ai-route__node ai-route__node--start">
          <Icon name="phone" />
          {diagram.start}
        </span>

        <span className="ai-route__ask">{diagram.ask}</span>

        <div className="ai-route__branches">
          {diagram.branches.map((branch) => (
            <div className="ai-route__branch" key={branch.tag}>
              <span className="ai-route__tag">{branch.tag}</span>
              <ol>
                {branch.nodes.map((node) => (
                  <li key={node}>{node}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>

        <span className="ai-route__node ai-route__node--end">
          <Icon name="check" />
          {diagram.end}
        </span>
      </div>
    </div>
  );
}

function HowItWorks() {
  return (
    <HvSection dark className="ai-flow" id="how-it-works">
      <Reveal className="ai-head ai-head--center">
        <span className="hv-eyebrow">{AI_FLOW.eyebrow}</span>
        <h2 className="hv-h2">{AI_FLOW.title}</h2>
        <p className="hv-body">{AI_FLOW.lede}</p>
      </Reveal>

      {/* The build journey - phase labels with the delivery timing quoted
          elsewhere on the site. Not a guarantee; the FAQ says so. */}
      <Reveal as="ol" className="ai-journey" index={1}>
        {AI_FLOW.journey.map((phase, i) => (
          <li key={phase.label}>
            <span className="ai-journey__num" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <b>{phase.label}</b>
            <span>{phase.when}</span>
          </li>
        ))}
      </Reveal>

      <ol className="ai-phases">
        {AI_FLOW.steps.map((step, i) => (
          <Reveal as="li" className="ai-phase" key={step.num} index={i}>
            <div className="ai-phase__copy">
              <div className="ai-phase__head">
                <span className="ai-phase__num" aria-hidden="true">
                  {step.num}
                </span>
                <span className="ai-phase__icon" aria-hidden="true">
                  <Icon name={step.icon} />
                </span>
              </div>

              <h3>{step.title}</h3>
              <p>{step.body}</p>

              <span className="ai-phase__deliverable">
                <Icon name="fileCheck" aria-hidden="true" />
                {step.deliverable}
              </span>
            </div>

            <ProofPanel proof={step.proof} />
          </Reveal>
        ))}
      </ol>

      <Reveal className="ai-flow__visual" index={2}>
        <RoutingLane />
      </Reveal>

      <Reveal className="ai-flow__cta" index={3}>
        <Btn href="#enquiry" variant="primary" size="lg" iconAfter="arrowRight">
          Get this service
        </Btn>
      </Reveal>
    </HvSection>
  );
}

/* -- 6. Who we work with, and what a build looks like for them --------------- */

function Who() {
  return (
    <HvSection className="ai-who">
      <Reveal className="ai-head">
        <span className="hv-eyebrow">{AI_USECASES.eyebrow}</span>
        <h2 className="hv-h2">{AI_USECASES.title}</h2>
        <p className="hv-lede">{AI_USECASES.lede}</p>
      </Reveal>

      <ul className="ai-who__list">
        {AI_USECASES.items.map((item, i) => (
          <Reveal as="li" key={item.title} index={i}>
            <span className="ai-who__icon" aria-hidden="true">
              <Icon name={item.icon} />
            </span>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </Reveal>
        ))}
      </ul>

      {/* The representative setups sit inside this section rather than after
          it: they answer "who is this for" with the three situations we are
          called into most, so the order stays hero -> ... -> who -> why. */}
      <Reveal className="ai-head ai-setups__head">
        <span className="hv-eyebrow">{AI_WORK.eyebrow}</span>
        <h3 className="hv-h2">{AI_WORK.title}</h3>
        <p className="hv-lede">{AI_WORK.lede}</p>
      </Reveal>

      <ul className="ai-setups">
        {AI_WORK.items.map((item, i) => (
          <Reveal as="li" key={item.title} index={i}>
            <article className="ai-setup">
              <span className="ai-setup__tag">{item.tag}</span>
              <h4>{item.title}</h4>

              <p className="ai-setup__problem">{item.problem}</p>

              <p className="ai-setup__label">What gets configured</p>
              <ul className="ai-setup__built">
                {item.built.map((b) => (
                  <li key={b}>
                    <Icon name="check" aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>

              <p className="ai-setup__outcome">{item.outcome}</p>
            </article>
          </Reveal>
        ))}
      </ul>

  
    </HvSection>
  );
}

/* -- 7. Why GHLevelUp -------------------------------------------------------- */

function Why() {
  return (
    <HvSection mint className="ai-why">
      {/* Title and summary share one baseline at opposite ends of the row. */}
      <Reveal className="ai-why__head">
        <div>
          <span className="hv-eyebrow">{AI_BENEFITS.eyebrow}</span>
          <h2 className="hv-h2">{AI_BENEFITS.title}</h2>
        </div>
        <p className="hv-lede">{AI_BENEFITS.lede}</p>
      </Reveal>

      {/* Six outcomes as cards, the lead one dark so the eye has a first stop
          and the band is anchored at its top-left. */}
      <ul className="ai-why__grid">
        {AI_BENEFITS.items.map((item, i) => (
          <Reveal as="li" key={item.title} index={i}>
            <article className={`ai-result`}>
              <span className="ai-result__icon" aria-hidden="true">
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

/* -- 8. FAQ ------------------------------------------------------------------ */

function FaqSection() {
  return (
    <HvSection className="ai-faq" id="faq">
      <StructuredData
        faq={AI_FAQ.items}
        service={SEO}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: SEO.name, path: `/services/${SEO.slug}` },
        ]}
      />

      {/* Centred: heading above, questions below, on a narrower measure than
          the rest of the page so the rows stay readable when opened. The
          "not answered here" line closes the section rather than sitting
          beside the heading. */}
      <Reveal className="ai-faq__head">
        <span className="hv-eyebrow">{AI_FAQ.eyebrow}</span>
        <h2 className="hv-h2">{AI_FAQ.title}</h2>
        <p className="hv-lede">{AI_FAQ.lede}</p>
      </Reveal>

      <Reveal className="ai-faq__list" index={1}>
        <Faq items={AI_FAQ.items} />
      </Reveal>

      <Reveal as="p" className="ai-faq__alt" index={2}>
        Question not answered here? <a href={SITE.phoneHref}>{SITE.phone}</a> reaches a person during
        office hours, and the same agent answers it outside them.
      </Reveal>
    </HvSection>
  );
}

/* -- 9. Client reviews ------------------------------------------------------- */

function Reviews() {
  return (
    <HvSection mint className="ai-reviews">
      <Reveal className="ai-head ai-head--center">
        <span className="hv-eyebrow">{TESTIMONIALS.eyebrow}</span>
        <h2 className="hv-h2">{TESTIMONIALS.title}</h2>
        <p className="hv-lede">{TESTIMONIALS.lede}</p>
      </Reveal>

      <ul className="ai-reviews__grid">
        {TESTIMONIALS.items.map((t, i) => (
          <Reveal as="li" key={t.name} index={i}>
            <figure className="ai-review">
              <span className="ai-review__mark" aria-hidden="true">
                <Icon name="quote" />
              </span>

              <blockquote>{t.quote}</blockquote>

              <figcaption>
                {/* Decorative: the name is in the caption beside it. */}
                <img src={t.image} alt="" loading="lazy" />
                <span>
                  <b>{t.name}</b>
                  <small>{t.role}</small>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>
    </HvSection>
  );
}

/* -- 10. Closing CTA + the contact details from /contact --------------------- */

function Closing() {
  return (
    <HvSection dark className="ai-closing">
      <Reveal className="ai-closing__cta">
        <span className="hv-eyebrow">{AI_CLOSING.eyebrow}</span>
        <h2 className="hv-h2">{AI_CLOSING.title}</h2>
        <p className="hv-lede">{AI_CLOSING.lede}</p>

        <div className="ai-closing__btns">
          <Btn to={AI_CLOSING.primary.to} variant="primary" size="lg" iconAfter={AI_CLOSING.primary.icon}>
            {AI_CLOSING.primary.label}
          </Btn>
          <Btn to={AI_CLOSING.secondary.to} variant="outline" size="lg">
            {AI_CLOSING.secondary.label}
          </Btn>
        </div>
      </Reveal>

      {/* The same four details /contact lists, so someone who would rather
          just call does not have to navigate away to find the number. */}
      <Reveal as="ul" className="ai-closing__contact" index={1}>
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
            <span className="ai-closing__plain">{SITE.hours}</span>
            <small>The agent covers everything outside them</small>
          </div>
        </li>
      </Reveal>
    </HvSection>
  );
}

/* One definition of this page's search identity, read by both its <PageMeta>
   and its Service structured data below - so the title, the description and
   the schema can never describe the same page three slightly different ways. */
const SEO = {
  slug: "ai-agents-chatbots",
  name: "AI Agents & Chatbots",
  description:
    "Voice AI, conversational AI, website chat widget and social DMs - one agent that answers every call, text and chat around the clock, qualifies the caller and books into your calendar.",
  ogDescription:
    "An AI receptionist for calls, texts, web chat and social DMs: answers in seconds at any hour, in English or Spanish, books into your real calendar and hands off to a person when it should.",
};

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
      <PageMeta title={`${SEO.name} - GHLevelUp`} description={SEO.description} ogDescription={SEO.ogDescription} />

      <div className="ai-pg">
        <Hero />
        <Overview />
        <Channels />
        <Included />
        <HowItWorks />
        <Who />
        <Why />
        <FaqSection />
        <Closing />
        <ServiceEnquiryForm
          service={AI_ENQUIRY.service}
          eyebrow={AI_ENQUIRY.eyebrow}
          title={AI_ENQUIRY.title}
          lede={AI_ENQUIRY.lede}
          points={AI_ENQUIRY.points}
        />
        {/* <RelatedServices
          slug="ai-agents-chatbots"
          title="What to switch on next to it"
          lede="An AI agent answers the door. These are the three things that decide what happens once it has."
        /> */}
      </div>
    </Layout>
  );
}
