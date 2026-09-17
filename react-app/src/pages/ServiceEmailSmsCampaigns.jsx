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
  ES_HERO,
  ES_INTRO,
  ES_CHANNELS,
  ES_FLOW,
  ES_SEGMENTS,
  ES_PREVIEW,
  ES_DETAILS,
  ES_USECASES,
  ES_WORK,
  ES_BENEFITS,
  ES_ENQUIRY,
  ES_FAQ,
} from "@/data/serviceEmailSms.jsx";

/* v2 chrome plus this page's OWN stylesheet - deliberately not
   service-detail.css. This page's visual language is dual-channel: a
   phone-and-inbox hero mockup, an SMS/email comparison, a branching
   automation-flow diagram and a real drip-sequence timeline, none of which
   reuse the sd-* patterns from the other service pages. See the comment
   below on why service-detail.css is still imported for two components. */
import "@/styles/home-redesign.css";
import "@/styles/home-chrome.css";
/* Only for the shared utility components (ServiceContactCard's
   .sd-contact-card, RelatedServices' .sd-rel) - see the matching note on
   the Social Media Marketing page for why those two are the exception. */
import "@/styles/service-detail.css";
import "@/styles/service-email-sms.css";

/**
 * /services/email-sms-campaigns.
 *
 * Twelve sections: hero, intro, the SMS/email channel comparison, the
 * branching automation flow, audience segmentation, a sample message
 * timeline, what's included, who it's for, representative work, benefits,
 * the enquiry form and related services, and FAQ.
 */

/* -- Hero -------------------------------------------------------------- */

function Hero() {
  return (
    <section className="es-hero">
      <div className="hv-container es-hero__inner">
        <Reveal as="p" className="es-hero__crumbs">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/services">Services</Link>
          <span>/</span>
          Email &amp; SMS Campaigns
        </Reveal>

        <div className="es-hero__copy">
          <Reveal>
            <span className="es-hero__eyebrow">{ES_HERO.eyebrow}</span>

            <h1 className="es-hero__title">
              {ES_HERO.titleLead}
              <span>{ES_HERO.titleAccent}</span>
            </h1>

            <p className="es-hero__lede">{ES_HERO.lede}</p>

            <div className="es-hero__ctas">
              <Btn to={ES_HERO.primary.to} variant="primary" size="lg" iconAfter={ES_HERO.primary.icon}>
                {ES_HERO.primary.label}
              </Btn>
              <Btn href={ES_HERO.secondary.href} variant="outline" size="lg">
                {ES_HERO.secondary.label}
              </Btn>
            </div>
          </Reveal>
        </div>

        <Reveal className="es-hero__mocks" index={1}>
          <div className="es-mock es-mock--sms">
            <div className="es-mock__bar">
              <span>Messages</span>
            </div>
            <div className="es-mock__body">
              {ES_HERO.sms.map((m, i) => (
                <p key={i} className={`es-bubble es-bubble--${m.from}`}>
                  {m.text}
                </p>
              ))}
            </div>
            <span className="es-mock__sample" aria-hidden="true">Sample thread</span>
          </div>

          <div className="es-mock es-mock--email">
            <div className="es-mock__bar">
              <span>Inbox</span>
            </div>
            <div className="es-mock__body es-mock__body--email">
              <p className="es-email__from">{ES_HERO.email.from}</p>
              <p className="es-email__subject">{ES_HERO.email.subject}</p>
              <p className="es-email__pre">{ES_HERO.email.preheader}</p>
            </div>
            <span className="es-mock__sample" aria-hidden="true">Sample email</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -- Intro --------------------------------------------------------------- */

function Intro() {
  return (
    <HvSection className="es-intro">
      <div className="es-intro__head">
        <Reveal>
          <span className="hv-eyebrow">{ES_INTRO.eyebrow}</span>
          <h2 className="es-intro__title">{ES_INTRO.title}</h2>
        </Reveal>

        <Reveal className="es-intro__note" index={1}>
          <span className="es-intro__note-tag">New message</span>
          <p>{ES_INTRO.quote.text}</p>
          <span className="es-intro__note-foot">{ES_INTRO.quote.attribution}</span>
        </Reveal>
      </div>

      <Reveal className="es-intro__prose" index={2}>
        {ES_INTRO.body.map((para, i) => (
          <p key={i} className={i === 0 ? "es-intro__lead" : undefined}>
            {para}
          </p>
        ))}
      </Reveal>

      <Reveal as="ul" className="es-intro__ticker" index={3}>
        {ES_INTRO.facts.map((fact) => (
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

/* -- Channels: SMS vs Email side by side ----------------------------------- */

function Channels() {
  return (
    <HvSection mint className="es-channels">
      <Reveal className="es-head">
        <span className="hv-eyebrow">{ES_CHANNELS.eyebrow}</span>
        <h2 className="hv-h2">{ES_CHANNELS.title}</h2>
        <p className="hv-lede">{ES_CHANNELS.lede}</p>
      </Reveal>

      <div className="es-vs">
        <Reveal className="es-vs__card">
          <span className="es-vs__icon" aria-hidden="true">
            <Icon name={ES_CHANNELS.sms.icon} />
          </span>
          <h3>{ES_CHANNELS.sms.title}</h3>
          <p className="es-vs__tag">{ES_CHANNELS.sms.tagline}</p>
          <ul>
            {ES_CHANNELS.sms.points.map((p) => (
              <li key={p}>
                <Icon name="check" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
        </Reveal>

        <span className="es-vs__divider" aria-hidden="true">+</span>

        <Reveal className="es-vs__card" index={1}>
          <span className="es-vs__icon" aria-hidden="true">
            <Icon name={ES_CHANNELS.email.icon} />
          </span>
          <h3>{ES_CHANNELS.email.title}</h3>
          <p className="es-vs__tag">{ES_CHANNELS.email.tagline}</p>
          <ul>
            {ES_CHANNELS.email.points.map((p) => (
              <li key={p}>
                <Icon name="check" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </HvSection>
  );
}

/* -- Branching automation flow --------------------------------------------- */

function Flow() {
  return (
    <HvSection dark className="es-flow">
      <Reveal className="es-head">
        <span className="hv-eyebrow">{ES_FLOW.eyebrow}</span>
        <h2 className="hv-h2">{ES_FLOW.title}</h2>
        <p className="hv-body">{ES_FLOW.lede}</p>
      </Reveal>

      <Reveal className="es-flow__trigger" index={1}>
        <span aria-hidden="true">
          <Icon name={ES_FLOW.trigger.icon} />
        </span>
        <div>
          <b>{ES_FLOW.trigger.label}</b>
          <p>{ES_FLOW.trigger.sub}</p>
        </div>
      </Reveal>

      <div className="es-flow__branches">
        {ES_FLOW.branches.map((branch, i) => (
          <Reveal className="es-branch" key={branch.label} index={i + 2}>
            <div className="es-branch__head">
              <span aria-hidden="true">
                <Icon name={branch.icon} />
              </span>
              <b>{branch.label}</b>
            </div>
            <ol className="es-branch__steps">
              {branch.steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
            <span className="es-branch__outcome">{branch.outcome}</span>
          </Reveal>
        ))}
      </div>
    </HvSection>
  );
}

/* -- Audience segmentation (tag cluster) ------------------------------------- */

function Segments() {
  return (
    <HvSection className="es-segments">
      <Reveal className="es-head">
        <span className="hv-eyebrow">{ES_SEGMENTS.eyebrow}</span>
        <h2 className="hv-h2">{ES_SEGMENTS.title}</h2>
        <p className="hv-lede">{ES_SEGMENTS.lede}</p>
      </Reveal>

      <ul className="es-tag-grid">
        {ES_SEGMENTS.groups.map((g, i) => (
          <Reveal as="li" key={g.tag} index={i}>
            <span className="es-tag-grid__pill">
              <Icon name={g.icon} aria-hidden="true" />
              {g.tag}
            </span>
            <p>{g.body}</p>
          </Reveal>
        ))}
      </ul>
    </HvSection>
  );
}

/* -- Message preview timeline ------------------------------------------------- */

function Preview() {
  return (
    <HvSection mint id="preview" className="es-preview">
      <Reveal className="es-head">
        <span className="hv-eyebrow">{ES_PREVIEW.eyebrow}</span>
        <h2 className="hv-h2">{ES_PREVIEW.title}</h2>
        <p className="hv-lede">{ES_PREVIEW.lede}</p>
      </Reveal>

      <ol className="es-timeline">
        {ES_PREVIEW.timeline.map((item, i) => (
          <Reveal as="li" className="es-timeline__row" key={item.when} index={i}>
            <span className="es-timeline__when">{item.when}</span>
            <span className={`es-timeline__chan es-timeline__chan--${item.channel}`} aria-hidden="true">
              <Icon name={item.channel === "sms" ? "phone" : "mail"} />
            </span>
            <p>{item.body}</p>
          </Reveal>
        ))}
      </ol>

      <Reveal as="p" className="es-preview__note" index={5}>
        <Icon name="shieldCheck" aria-hidden="true" />
        {ES_PREVIEW.note}
      </Reveal>
    </HvSection>
  );
}

/* -- Details ------------------------------------------------------------------ */

function Details() {
  return (
    <HvSection className="es-details-sec">
      <Reveal className="es-head">
        <span className="hv-eyebrow">{ES_DETAILS.eyebrow}</span>
        <h2 className="hv-h2">{ES_DETAILS.title}</h2>
        <p className="hv-body">{ES_DETAILS.lede}</p>
      </Reveal>

      <ul className="es-details">
        {ES_DETAILS.groups.map((group, i) => (
          <Reveal as="li" key={group.title} index={i}>
            <article className="es-detail">
              <span className="es-detail__icon" aria-hidden="true">
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

/* -- Use cases ---------------------------------------------------------------- */

function UseCases() {
  return (
    <HvSection dark className="es-usecases">
      <Reveal className="es-head">
        <span className="hv-eyebrow">{ES_USECASES.eyebrow}</span>
        <h2 className="hv-h2">{ES_USECASES.title}</h2>
        <p className="hv-body">{ES_USECASES.lede}</p>
      </Reveal>

      <ul className="es-use-grid">
        {ES_USECASES.items.map((item, i) => (
          <Reveal as="li" key={item.title} index={i}>
            <span aria-hidden="true">
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

/* -- Representative work -------------------------------------------------------- */

function Work() {
  return (
    <HvSection className="es-work-sec">
      <Reveal className="es-head">
        <span className="hv-eyebrow">{ES_WORK.eyebrow}</span>
        <h2 className="hv-h2">{ES_WORK.title}</h2>
        <p className="hv-lede">{ES_WORK.lede}</p>
      </Reveal>

      <ul className="es-work">
        {ES_WORK.items.map((item, i) => (
          <Reveal as="li" key={item.title} index={i}>
            <article className="es-work__card">
              <span className="es-work__tag">{item.tag}</span>
              <h3>{item.title}</h3>
              <p className="es-work__problem">{item.problem}</p>

              <p className="es-work__label">What we built</p>
              <ul className="es-work__built">
                {item.built.map((b) => (
                  <li key={b}>
                    <Icon name="check" aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>

              <div className="es-work__outcome">
                <p>{item.outcome}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </ul>

     
    </HvSection>
  );
}

/* -- Benefits ------------------------------------------------------------------- */

function Benefits() {
  return (
    <HvSection mint className="es-benefits">
      <Reveal className="es-head">
        <span className="hv-eyebrow">{ES_BENEFITS.eyebrow}</span>
        <h2 className="hv-h2">{ES_BENEFITS.title}</h2>
        <p className="hv-body">{ES_BENEFITS.lede}</p>
      </Reveal>

      <ul className="es-ben-grid">
        {ES_BENEFITS.items.map((item, i) => (
          <Reveal as="li" key={item.title} index={i}>
            <span className="es-ben-grid__icon" aria-hidden="true">
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

/* -- FAQ ------------------------------------------------------------------------- */

function FaqSection() {
  return (
    <HvSection className="es-faq">
      <StructuredData
        faq={ES_FAQ.items}
        service={SEO}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: SEO.name, path: `/services/${SEO.slug}` },
        ]}
      />

      <div className="es-faq__inner">
        <Reveal>
          <span className="hv-eyebrow">{ES_FAQ.eyebrow}</span>
          <h2 className="hv-h2">{ES_FAQ.title}</h2>
          <p className="hv-body">{ES_FAQ.lede}</p>

          <div className="es-faq__list">
            <Faq items={ES_FAQ.items} />
          </div>
        </Reveal>

        <ServiceContactCard card={ES_FAQ.card} />
      </div>
    </HvSection>
  );
}

/* One definition of this page's search identity, read by both its <PageMeta>
   and its Service structured data below - so the title, the description and
   the schema can never describe the same page three slightly different ways. */
const SEO = {
  slug: "email-sms-campaigns",
  name: "Email & SMS Campaigns",
  description:
    "Branching email and SMS sequences that follow up on every lead in minutes, not days - segmented by list, compliant by default, and tracked in your CRM.",
  ogDescription:
    "Sequences that text and email every lead automatically, branching on what they actually do - so a follow-up never depends on someone remembering.",
};

export default function ServiceEmailSmsCampaigns() {
  return (
    <Layout
      variant="v2"
      topbar={
        <>
          Leads going cold in the inbox? <a href="/book">Book a free consultation</a>
        </>
      }
    >
      <PageMeta title={`${SEO.name} - GHLevelUp`} description={SEO.description} ogDescription={SEO.ogDescription} />

      <div className="es-pg">
        <Hero />
        <Intro />
        <Channels />
        <Flow />
        <Segments />
        {/* <Preview /> */}
        <Details />
        <UseCases />
        <Work />
        <Benefits />
        <ServiceEnquiryForm
          service={ES_ENQUIRY.service}
          eyebrow={ES_ENQUIRY.eyebrow}
          title={ES_ENQUIRY.title}
          lede={ES_ENQUIRY.lede}
          points={ES_ENQUIRY.points}
        />
        <RelatedServices
          slug="email-sms-campaigns"
          title="What feeds the sequence"
          lede="A sequence only works on the leads it receives. These decide where they come from and what happens once one replies."
        />
        <FaqSection />
      </div>
    </Layout>
  );
}
