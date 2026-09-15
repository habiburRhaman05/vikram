import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout.jsx";
import PageMeta from "@/components/common/PageMeta.jsx";
import Icon from "@/components/common/Icon.jsx";
import Faq from "@/components/common/Faq.jsx";
import { HvSection, Reveal, SectionHead, Btn, BtnRow, IconBadge, Checks } from "@/components/home/primitives.jsx";
import { openLeadPopup } from "@/components/common/LeadPopup.jsx";

import "@/styles/home-redesign.css";
import "@/styles/home-chrome.css";
import "@/styles/service-detail.css";

const STATS = [
  { num: "24/7", label: "Calls, texts and chats answered" },
  { num: "EN / ES", label: "Bilingual from day one" },
  { num: "< 1 min", label: "Typical time to first reply" },
  { num: "0", label: "Calls left on voicemail" },
];

/* Decorative waveform bar delays - staggered rather than uniform so the
   row reads as speech. Kept here (not in CSS) so the bar count and the
   rhythm live in one place. */
const WAVE_BARS = [0, 0.12, 0.28, 0.06, 0.34, 0.18, 0.42, 0.1, 0.3, 0.02, 0.24, 0.38, 0.14, 0.32, 0.08, 0.2];

const CHANNELS = [
  { icon: "phone", title: "Phone calls", body: "A dedicated local number, answered live in your own tone of voice - no phone tree, no hold music." },
  { icon: "message", title: "SMS & text", body: "If a call isn't picked up, the same conversation continues by text instead of going cold." },
  { icon: "chatWindow", title: "Website chat", body: "A widget that actually answers questions and books, rather than collecting a form nobody reads." },
  { icon: "instagram", title: "Social DMs", body: "Instagram, Facebook and WhatsApp messages land in the same inbox as everything else." },
];

const FLOW = [
  { num: "Step 01", title: "Contact arrives", body: "A call, text, web chat or DM reaches your number or widget - at 9am or 9pm, it makes no difference." },
  { num: "Step 02", title: "Intent is read", body: "New lead, existing client, a quick question or an emergency: it understands before it responds." },
  { num: "Step 03", title: "Qualified or answered", body: "It asks what your front desk would ask, or answers directly from what it knows about your business." },
  { num: "Step 04", title: "Booked or handed off", body: "A confirmed slot on your real calendar, or a clean transfer to a person. Never left hanging." },
];

const CAPABILITIES = [
  { icon: "calendar", title: "Books into your real calendar", body: "It reads genuine availability and offers only open slots, then confirms by text so the client has it in writing." },
  { icon: "globe", title: "Bilingual by default", body: "English and Spanish out of the box, switching mid-conversation if the caller does. More languages on request." },
  { icon: "usersTwo", title: "Trained on your business", body: "Your services, hours, pricing answers and the exceptions that matter - configured before you ever log in." },
  { icon: "shieldCheck", title: "Knows when to stop", body: "Anything it isn't confident about goes to a person instead of a guess. A safety net, not a wall." },
  { icon: "layers", title: "Everything in one inbox", body: "Every channel writes to the same CRM thread, so your team sees one continuous history per client." },
  { icon: "trendUp", title: "Follows up on its own", body: "No-shows, unanswered quotes and stalled leads get chased automatically on the cadence you set." },
];

const COMPARE_ROWS = [
  { label: "Answers after hours", voicemail: "No", service: "Sometimes", ours: "Always" },
  { label: "Books appointments", voicemail: "No", service: "Rarely", ours: "Directly on your calendar" },
  { label: "Knows your services", voicemail: "No", service: "Reads a script", ours: "Trained on your business" },
  { label: "Speaks Spanish", voicemail: "No", service: "Extra cost", ours: "Included" },
  { label: "Monthly cost", voicemail: "Free, costs you leads", service: "Per-minute billing", ours: "Flat, usage at cost" },
];

const FAQS = [
  {
    question: "Does it sound robotic?",
    answer: "No - it holds a real conversation, not a phone tree. It handles interruptions, follow-up questions and the caller changing their mind, and it hands off to a person the moment a conversation needs one.",
  },
  {
    question: "Does this replace my front desk during business hours?",
    answer: "Only if you want it to. The normal setup rings your team first and lets the AI step in when nobody picks up; after hours and at weekends it handles everything itself, so nothing reaches voicemail.",
  },
  {
    question: "Can it actually book, or does it just take messages?",
    answer: "It books in real time against your live calendar, offers only slots that are genuinely open, and sends a confirmation text - the same outcome as if your receptionist had answered.",
  },
  {
    question: "What if someone asks something it doesn't know?",
    answer: "It says so plainly and either takes a message or transfers to a person. It is configured not to guess, because a confident wrong answer costs more than an honest handoff.",
  },
  {
    question: "How long until it's live?",
    answer: "Most businesses are live inside one to two weeks. We configure your services, hours, call flow and handoff rules first, then walk you through it on a call before it takes a single real conversation.",
  },
  {
    question: "What does it cost?",
    answer: "A flat monthly fee for the build and support, with telephony and AI usage billed to your own payment method at cost - never pooled, never marked up. You get real numbers on the demo call.",
  },
];

function CompareMark({ value, yes }) {
  return (
    <span className={`sd-compare__mark sd-compare__mark--${yes ? "yes" : "no"}`}>
      <Icon name={yes ? "check" : "close"} aria-hidden="true" />
      {value}
    </span>
  );
}

export default function ServiceAiAgentsChatbots() {
  return (
    <Layout
      variant="v2"
      topbar={<>Hear it answer a live call - <a href="/book">book a 20-minute demo</a></>}
    >
      <PageMeta
        title="AI Agents & Chatbots - GHLevelUp"
        description="An AI receptionist that answers every call, text and chat around the clock in English and Spanish, qualifies the caller and books straight into your calendar."
      />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="sd-hero">
        <div className="hv-container">
          <div className="sd-hero__grid">
            <Reveal>
              <p className="sd-hero__crumbs">
                <Link to="/">Home</Link>
                <span>/</span>
                <Link to="/services">Services</Link>
                <span>/</span>
                AI Agents &amp; Chatbots
              </p>

              <span className="sd-live">
                <span className="sd-live__dot" aria-hidden="true" />
                Live for clients today
              </span>

              <h1>
                Never miss another lead, <em>day or night</em>
              </h1>

              <p className="sd-hero__lede">
                Every call, text and chat gets answered the moment it arrives - qualified, booked, or handed to
                a person. In your tone of voice, in English or Spanish, around the clock.
              </p>

              <BtnRow>
                <Btn to="/book" variant="primary" size="lg" iconAfter="arrowRight">
                  Hear it on a demo
                </Btn>
                <Btn onClick={() => openLeadPopup({ profession: "AI Agents & Chatbots" })} variant="outline" size="lg">
                  Get a free plan
                </Btn>
              </BtnRow>
            </Reveal>

            {/* Decorative: a representative conversation, drawn in markup
                rather than a screenshot, so it stays crisp and readable at
                every width and needs no asset. */}
            <Reveal index={1} aria-hidden="true">
              <div className="sd-call">
                <div className="sd-call__head">
                  <span className="sd-call__avatar">
                    <Icon name="phone" />
                  </span>
                  <span className="sd-call__who">
                    <strong>Incoming call</strong>
                    <span>Unknown number &middot; 8:42pm</span>
                  </span>
                  <span className="sd-call__timer">00:24</span>
                </div>

                <div className="sd-wave">
                  {WAVE_BARS.map((d, i) => (
                    <i key={i} style={{ "--d": `${d}s` }} />
                  ))}
                </div>

                <div className="sd-call__body">
                  <p className="sd-bubble sd-bubble--them">Hi, are you open tomorrow? I need to come in.</p>
                  <p className="sd-bubble sd-bubble--ai">
                    We are - I have 10:00am or 2:30pm free tomorrow. Which suits you better?
                  </p>
                  <p className="sd-bubble sd-bubble--them">2:30 works.</p>
                  <p className="sd-bubble sd-bubble--ai">
                    Booked for 2:30pm tomorrow. I've texted you the confirmation - see you then.
                  </p>
                </div>

                <p className="sd-call__foot">
                  <Icon name="check" />
                  Booked and confirmed in 41 seconds, with nobody in the office
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      <HvSection tight>
        <Reveal className="sd-stats">
          {STATS.map((s) => (
            <div className="sd-stat" key={s.label}>
              <div className="sd-stat__num">{s.num}</div>
              <p className="sd-stat__label">{s.label}</p>
            </div>
          ))}
        </Reveal>
      </HvSection>

      {/* ── Channels ──────────────────────────────────────────────────────── */}
      <HvSection mint wash id="channels">
        <div className="hv-split">
          <Reveal>
            <span className="hv-eyebrow">Every channel, one conversation</span>
            <h2 className="hv-h2">However a client reaches you, someone answers</h2>
            <p className="hv-lede" style={{ marginTop: 18 }}>
              Clients don't respect channel boundaries. They call, then text, then message you on Instagram
              three days later. The agent covers all of it and keeps it as one thread - so a conversation that
              starts as a missed call can still end as a booked appointment.
            </p>
            <BtnRow style={{ marginTop: 26 }}>
              <Btn to="/book" variant="primary" iconAfter="arrowRight">
                See it live
              </Btn>
            </BtnRow>
          </Reveal>

          <Reveal index={1}>
            <ul className="sd-channels">
              {CHANNELS.map((c) => (
                <li className="sd-channel" key={c.title}>
                  <span className="sd-channel__icon" aria-hidden="true">
                    <Icon name={c.icon} />
                  </span>
                  <div>
                    <h4>{c.title}</h4>
                    <p>{c.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </HvSection>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <HvSection dark id="how">
        <SectionHead center eyebrow="How it works" title="One path, decided the moment a contact arrives">
          Nothing here guesses at something it can't yet know. The system reads who is calling and what they
          want, and everything downstream follows from that.
        </SectionHead>

        <ol className="sd-flow">
          {FLOW.map((step, i) => (
            <Reveal as="li" className="sd-flow__item" key={step.num} index={i}>
              <span className="sd-flow__dot" aria-hidden="true" />
              <span className="sd-flow__num">{step.num}</span>
              <h4>{step.title}</h4>
              <p>{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </HvSection>

      {/* ── Capabilities ──────────────────────────────────────────────────── */}
      <HvSection id="capabilities">
        <SectionHead center eyebrow="Configured, not generic" title="Built around how your business actually runs" />

        <div className="hv-grid hv-grid--auto-3">
          {CAPABILITIES.map((c, i) => (
            <Reveal className="hv-card hv-card--hover" key={c.title} index={i}>
              <IconBadge icon={c.icon} />
              <h3 className="hv-h3" style={{ margin: "16px 0 8px" }}>
                {c.title}
              </h3>
              <p className="hv-body">{c.body}</p>
            </Reveal>
          ))}
        </div>
      </HvSection>

      {/* ── Comparison ────────────────────────────────────────────────────── */}
      <HvSection mint id="compare">
        <SectionHead center eyebrow="The honest comparison" title="Against what you're probably doing now">
          Most businesses are choosing between voicemail and a traditional answering service. Here is where each
          one actually lands.
        </SectionHead>

        <Reveal>
          <p className="sd-compare-hint">
            <Icon name="arrowRight" aria-hidden="true" />
            Swipe the table to see all three
          </p>
          <div className="sd-compare-wrap">
            <table className="sd-compare">
              <thead>
                <tr>
                  <th scope="col">&nbsp;</th>
                  <th scope="col">Voicemail</th>
                  <th scope="col">Answering service</th>
                  <th scope="col" className="is-ours">
                    AI agent
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    <td>
                      <CompareMark value={row.voicemail} yes={false} />
                    </td>
                    <td>{row.service}</td>
                    <td className="is-ours">
                      <CompareMark value={row.ours} yes />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </HvSection>

      {/* ── What you get ──────────────────────────────────────────────────── */}
      <HvSection id="included">
        <div className="hv-split">
          <Reveal>
            <span className="hv-eyebrow">What's included</span>
            <h2 className="hv-h2">Set up for you, then run with you</h2>
            <p className="hv-lede" style={{ marginTop: 18 }}>
              You don't get a login and a tutorial. We configure the whole thing around your business, walk you
              through it live, and stay on it afterwards - changes to hours, services or call flow are a message
              to us, not a ticket you file.
            </p>
            <BtnRow style={{ marginTop: 26 }}>
              <Btn to="/book" variant="primary" iconAfter="arrowRight">
                Book a demo
              </Btn>
              <Btn to="/services" variant="ghost">
                All services
              </Btn>
            </BtnRow>
          </Reveal>

          <Reveal index={1} className="hv-card hv-card--raised">
            <Checks
              items={[
                "A dedicated local number, registered and compliant",
                "Voice, SMS, web chat and social DMs configured together",
                "Calendar, CRM and pipeline connected before launch",
                "Your services, hours and pricing answers trained in",
                "Handoff rules set by you, for anything it shouldn't handle",
                "Live walkthrough, then ongoing changes handled by us",
              ]}
            />
          </Reveal>
        </div>
      </HvSection>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <HvSection mint id="faq">
        <SectionHead center eyebrow="Questions" title="Before you book a call" />
        <div style={{ maxWidth: 820, marginInline: "auto" }}>
          <Faq items={FAQS} />
        </div>
      </HvSection>

      {/* ── Closing CTA ───────────────────────────────────────────────────── */}
      <HvSection dark>
        <Reveal style={{ textAlign: "center", maxWidth: "62ch", marginInline: "auto" }}>
          <span className="hv-eyebrow">Twenty minutes, no slide deck</span>
          <h2 className="hv-h2" style={{ marginBottom: 16 }}>
            Hear it answer a real conversation
          </h2>
          <p className="hv-lede">
            We'll call the number live on the demo so you hear exactly what your clients would hear - then show
            you the booking land on the calendar.
          </p>
          <BtnRow className="hv-btn-row" style={{ justifyContent: "center", marginTop: 30 }}>
            <Btn to="/book" variant="primary" size="lg" iconAfter="arrowRight">
              Book a demo
            </Btn>
            <Btn to="/contact" variant="outline" size="lg">
              Ask a question first
            </Btn>
          </BtnRow>
        </Reveal>
      </HvSection>
    </Layout>
  );
}
