import Layout from "@/components/layout/Layout.jsx";
import PageMeta from "@/components/common/PageMeta.jsx";
import Container from "@/components/common/Container.jsx";
import Section from "@/components/common/Section.jsx";
import SectionHead from "@/components/common/SectionHead.jsx";
import Button from "@/components/common/Button.jsx";
import BtnRow from "@/components/common/BtnRow.jsx";
import Icon from "@/components/common/Icon.jsx";
import Card from "@/components/common/Card.jsx";
import Checklist from "@/components/common/Checklist.jsx";
import Spotlight from "@/components/common/Spotlight.jsx";
import { Panel, DocRow, Chat } from "@/components/common/Panel.jsx";
import { Timeline } from "@/components/common/Timeline.jsx";
import FeatureList from "@/components/common/FeatureList.jsx";
import Plans from "@/components/common/Plans.jsx";
import Faq from "@/components/common/Faq.jsx";
import CtaBand from "@/components/common/CtaBand.jsx";
import Reveal from "@/components/common/Reveal.jsx";
import { SITE } from "@/data/site";
import {
  INBOX_MESSAGES,
  TRUST_ITEMS,
  PROBLEM_CARDS,
  PLATFORM_CARDS,
  RECEPTION_CHECKLIST,
  RECEPTION_CHAT,
  PORTAL_CHECKLIST,
  PORTAL_DOC_ROWS,
  ONBOARDING_STEPS,
  INDUSTRIES_CHECKLIST,
  INDUSTRIES_FEATURES,
  PLANS,
  FAQ_ITEMS,
} from "@/data/home";

export default function Home() {
  return (
    <Layout
      topbar={
        <>
          Now onboarding tax preparers for the upcoming filing season - <a href="/book">book a 30 minute demo</a>
        </>
      }
    >
      <PageMeta
        title="GHLevelUp - The complete operating system for your tax practice"
        description="A dedicated business line, a bilingual AI receptionist, a secure client document portal, e-sign and automated follow-up - configured for your tax firm and live in days."
        ogDescription="Answer every call, collect every document and file on time - from one screen."
        path="/"
      />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero__glow hero__glow--a" aria-hidden="true" />
        <div className="hero__glow hero__glow--b" aria-hidden="true" />
        <Container>
          <div className="hero__inner">
            <div className="hero__copy">
              <span className="hero__pill">
                <b>New</b> Bilingual AI receptionist, included
              </span>

              <h1 className="balance">
                Run your whole tax practice from <span className="text-gradient">one screen</span>.
              </h1>

              <p className="lede">
                A dedicated business line, an AI receptionist that answers in English and Spanish, a secure
                client document portal, unlimited e-sign and follow-up that runs itself - configured for your
                firm and live in days, not months.
              </p>

              <BtnRow>
                <Button to="/book" variant="accent" size="lg" icon="calendar">
                  Book a 30 Minute Demo
                </Button>
                <Button to="/platform" variant="ghost-light" size="lg" icon="arrowRight">
                  See the platform
                </Button>
              </BtnRow>

              <p className="hero__note">
                <Icon name="check" />
                No long-term contract. Your own numbers, your own branding, your own data.
              </p>
            </div>

            <div className="hero__visual">
              <div
                className="mock"
                role="img"
                aria-label="Unified inbox showing a missed call answered by the AI receptionist, a document upload and a booked consultation"
              >
                <div className="mock__bar">
                  <span className="mock__dot" />
                  <span className="mock__dot" />
                  <span className="mock__dot" />
                  <span className="mock__title">Inbox - All channels</span>
                </div>
                <div className="mock__body">
                  {INBOX_MESSAGES.map((msg, i) => (
                    <div className={`msg ${msg.active ? "msg--active" : ""}`.trim()} key={i}>
                      <span className={`msg__icon ${msg.iconVariant ? `msg__icon--${msg.iconVariant}` : ""}`.trim()}>
                        <Icon name={msg.icon} />
                      </span>
                      <div className="msg__body">
                        <div className="msg__top">
                          <span className="msg__name">{msg.name}</span>
                          <span className="msg__time">{msg.time}</span>
                        </div>
                        <p className="msg__text">{msg.text}</p>
                        {msg.tag && <span className="msg__tag">{msg.tag}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Trust bar ─────────────────────────────────────────────────── */}
      <section className="trustbar">
        <Container>
          <p className="trustbar__label">Everything a tax office needs, in one system</p>
          <div className="trustbar__items">
            {TRUST_ITEMS.map((item, i) => (
              <span className="trust-item" key={i}>
                <Icon name={item.icon} />
                {item.text}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* ── The problem ──────────────────────────────────────────────── */}
      <Section mist>
        <SectionHead center eyebrow="The busy-season problem" title="Most tax offices lose money on admin, not on returns">
          The work that costs a preparer the most is rarely the return itself. It's the phone ringing during a
          client meeting, the third email chasing a missing 1095-A, and the client whose status nobody can
          answer without opening four different tools.
        </SectionHead>
        <div className="grid grid--3">
          {PROBLEM_CARDS.map((card, i) => (
            <Card icon={["phoneOff", "filePlus", "clock"][i]} title={card.title} key={i} revealIndex={i}>
              {card.body}
            </Card>
          ))}
        </div>
      </Section>

      {/* ── Platform overview ────────────────────────────────────────── */}
      <Section ink>
        <SectionHead eyebrow="The platform" title="One system that answers, collects, tracks and files">
          Everything below is included and configured for you before you go live - not a list of add-ons to
          assemble yourself.
        </SectionHead>
        <div className="grid grid--3">
          {PLATFORM_CARDS.map((card, i) => (
            <Card ink index={card.index} title={card.title} key={i} revealIndex={i}>
              {card.body}
            </Card>
          ))}
        </div>
        <Reveal className="btn-row" style={{ marginTop: 48 }}>
          <a className="link-arrow" href="/platform">
            Explore every feature in detail
            <Icon name="arrowRight" strokeWidth={2.5} width={17} height={17} />
          </a>
        </Reveal>
      </Section>

      {/* ── Spotlights ────────────────────────────────────────────────── */}
      <Section>
        <Spotlight
          copy={
            <>
              <span className="eyebrow">AI receptionist</span>
              <h2 className="balance">The call you would have missed, answered and booked</h2>
              <p>
                Your receptionist picks up on the first ring at 9pm on a Sunday, speaks the caller's language,
                and knows your services, your hours and your calendar.
              </p>
              <Checklist items={RECEPTION_CHECKLIST} />
              <BtnRow>
                <Button to="/book" variant="outline" icon="phone">
                  Hear it on your demo call
                </Button>
              </BtnRow>
            </>
          }
          media={
            <Panel title="Incoming call - 9:12 PM" status="Live">
              <Chat lines={RECEPTION_CHAT} meta="Appointment created · contact record updated · preparer notified" />
            </Panel>
          }
        />

        <Spotlight
          flip
          copy={
            <>
              <span className="eyebrow">Client document portal</span>
              <h2 className="balance">Stop chasing documents by hand</h2>
              <p>
                Each client gets a checklist built for their return. They upload from their phone, the files
                land on their record, and the reminders go out without you writing them.
              </p>
              <Checklist items={PORTAL_CHECKLIST} />
            </>
          }
          media={
            <Panel title="J. Ellis - 2025 Form 1040" status="3 of 5 received">
              {PORTAL_DOC_ROWS.map((row, i) => (
                <DocRow key={i} {...row} />
              ))}
            </Panel>
          }
        />
      </Section>

      {/* ── Onboarding steps ─────────────────────────────────────────── */}
      <Section mist>
        <SectionHead center eyebrow="Getting started" title="Live before your next client walks in">
          We do the setup. You review it, we adjust it, and you start taking calls on it.
        </SectionHead>
        <Timeline steps={ONBOARDING_STEPS} />
      </Section>

      {/* ── Industries ────────────────────────────────────────────────── */}
      <Section>
        <div className="grid grid--2" style={{ gap: 64, alignItems: "start" }}>
          <Reveal>
            <span className="eyebrow">Who we build for</span>
            <h2 className="balance">Built for tax first - and for the offices around it next</h2>
            <p className="lede" style={{ marginTop: 18 }}>
              We build one industry at a time and go deep, so the system arrives already speaking your trade
              rather than as an empty CRM you have to shape yourself.
            </p>
            <Checklist items={INDUSTRIES_CHECKLIST} style={{ marginTop: 30 }} />
            <BtnRow style={{ marginTop: 32 }}>
              <Button to="/industries" variant="outline" icon="arrowRight">
                See all industries
              </Button>
            </BtnRow>
          </Reveal>
          <Reveal>
            <FeatureList items={INDUSTRIES_FEATURES} />
          </Reveal>
        </div>
      </Section>

      {/* ── Plans ─────────────────────────────────────────────────────── */}
      <Section ink id="plans">
        <SectionHead center eyebrow="Plans" title="Priced per office - never per seat">
          Bring your whole team in without watching the bill climb. We'll walk you through current pricing on
          your demo call and confirm it in writing before anything starts.
        </SectionHead>
        <Plans plans={PLANS} />
      </Section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <Section narrow>
        <SectionHead center eyebrow="Questions" title="Before you book" />
        <Faq items={FAQ_ITEMS} />
      </Section>

      {/* ── CTA band ──────────────────────────────────────────────────── */}
      <Section tight>
        <CtaBand
          title="See it running on your own practice"
          note={
            <>
              Prefer to write first?{" "}
              <a href="/contact" style={{ color: "var(--aqua-400)", fontWeight: 600 }}>
                Send us a message
              </a>
            </>
          }
          actions={
            <>
              <Button to="/book" variant="accent" size="lg" icon="calendar">
                Book a demo
              </Button>
              <Button href={SITE.phoneHref} variant="ghost-light" size="lg" icon="phone">
                Call {SITE.phone}
              </Button>
            </>
          }
        >
          Twenty minutes, no slide deck. We'll show you the receptionist answering, a client uploading
          documents, and a return moving through the board - then tell you what it costs.
        </CtaBand>
      </Section>
    </Layout>
  );
}
