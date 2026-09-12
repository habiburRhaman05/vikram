import Layout from "@/components/layout/Layout.jsx";
import PageMeta from "@/components/common/PageMeta.jsx";
import PageHero from "@/components/common/PageHero.jsx";
import Section from "@/components/common/Section.jsx";
import SectionHead from "@/components/common/SectionHead.jsx";
import Button from "@/components/common/Button.jsx";
import BtnRow from "@/components/common/BtnRow.jsx";
import Card from "@/components/common/Card.jsx";
import Checklist from "@/components/common/Checklist.jsx";
import Spotlight from "@/components/common/Spotlight.jsx";
import { Panel, DocRow } from "@/components/common/Panel.jsx";
import FeatureList from "@/components/common/FeatureList.jsx";
import Stats from "@/components/common/Stats.jsx";
import Pipeline from "@/components/common/Pipeline.jsx";
import CtaBand from "@/components/common/CtaBand.jsx";
import Reveal from "@/components/common/Reveal.jsx";
import CallFlowDiagram from "@/components/sections/CallFlowDiagram.jsx";
import FlowMobile from "@/components/sections/FlowMobile.jsx";
import {
  STATS,
  RECEPTION_CHECKLIST,
  RECEPTION_CALL_LOG,
  INBOX_CARDS,
  PORTAL_CHECKLIST,
  PORTAL_OUTSTANDING,
  PIPELINE_STAGES,
  WORKFLOW_CARDS,
  BILLING_FEATURES,
  FLOW_MOBILE_BRANCHES,
} from "@/data/platform";

export default function Platform() {
  return (
    <Layout
      topbar={
        <>
          Every feature below is configured for you before you go live - <a href="/book">see it on a demo</a>
        </>
      }
    >
      <PageMeta
        title="Platform - GHLevelUp"
        description="Reception, client documents, workflow, e-sign, invoicing and reporting - every part of the tax-practice operating system, explained."
      />

      <PageHero
        crumb="Platform"
        title="Every part of the practice, one system"
        center
        lede="Tax offices don't fail on tax knowledge. They lose time to the phone, the chasing and the not-knowing. Here's exactly what we put in place, and what each piece does."
      >
        <BtnRow style={{ marginTop: 32 }}>
          <Button to="/book" variant="accent" icon="calendar">
            Book a demo
          </Button>
          <Button href="#reception" variant="ghost-light" icon="arrowDown">
            Start with reception
          </Button>
        </BtnRow>
      </PageHero>

      {/* ── Stats ─────────────────────────────────────────────────────── */}
      <Section tight>
        <Stats items={STATS} />
      </Section>

      {/* ── 1. Reception ──────────────────────────────────────────────── */}
      <Section ink id="reception">
        <Spotlight
          copy={
            <>
              <span className="eyebrow">01 - Reception</span>
              <h2 className="balance">A dedicated line, and someone always on it</h2>
              <p>
                Your practice gets its own local number for calls and texts. Behind it sits an AI receptionist
                that knows your services, your hours and your calendar - so the caller who reaches you at 9pm
                gets a booking, not a beep.
              </p>
              <Checklist items={RECEPTION_CHECKLIST} />
            </>
          }
          media={
            <Panel title="Call log - last night" status="4 handled">
              {RECEPTION_CALL_LOG.map((row, i) => (
                <DocRow key={i} {...row} />
              ))}
            </Panel>
          }
        />
      </Section>

      {/* ── 1b. Reception automation ─────────────────────────────────── */}
      <Section ink id="automation">
        <SectionHead eyebrow="Under the hood" title="Every call takes exactly one path, decided the moment it comes in">
          No branch here guesses at something it can't yet know. The only question the system ever asks first is
          what time it is right now - business hours, after hours, or weekend - and everything downstream
          follows from the answer.
        </SectionHead>

        <Reveal className="flow-legend">
          {FLOW_MOBILE_BRANCHES.map((branch, i) => (
            <span key={i}>
              <i style={{ background: branch.color }} />
              {branch.label}
            </span>
          ))}
        </Reveal>

        <CallFlowDiagram />
        <FlowMobile />
      </Section>

      {/* ── 2. Inbox ──────────────────────────────────────────────────── */}
      <Section id="inbox">
        <SectionHead eyebrow="02 - Conversations" title="One thread per client, whatever channel they use">
          Clients don't respect channel boundaries. They call, then text, then reply to an old email. Your team
          should still see one continuous history.
        </SectionHead>
        <div className="grid grid--3">
          {INBOX_CARDS.map((card, i) => (
            <Card icon={card.icon} title={card.title} key={i} revealIndex={i}>
              {card.body}
            </Card>
          ))}
        </div>
      </Section>

      {/* ── 3. Portal ─────────────────────────────────────────────────── */}
      <Section mist id="portal">
        <Spotlight
          flip
          copy={
            <>
              <span className="eyebrow">03 - Client documents</span>
              <h2 className="balance">Documents that collect themselves</h2>
              <p>
                Every client gets a checklist built for their return type. They upload from their phone, files
                land on their record, and the follow-up runs whether or not anyone remembers to send it.
              </p>
              <Checklist items={PORTAL_CHECKLIST} />
              <p style={{ marginTop: 26, fontSize: ".93rem", color: "var(--muted)" }}>
                Need it to work a very specific way? We build custom portals too - see{" "}
                <a href="/about" style={{ color: "var(--aqua-600)", fontWeight: 600 }}>
                  how we work
                </a>
                .
              </p>
            </>
          }
          media={
            <Panel title="Outstanding across all returns" status="Live">
              {PORTAL_OUTSTANDING.map((row, i) => (
                <DocRow key={i} {...row} />
              ))}
            </Panel>
          }
        />
      </Section>

      {/* ── 4. Workflow ───────────────────────────────────────────────── */}
      <Section id="workflow">
        <SectionHead eyebrow="04 - Workflow" title="The whole season on one board">
          Each client sits in exactly one stage. Moving them fires the right message automatically - so status
          updates stop being a task someone has to remember.
        </SectionHead>

        <Reveal className="panel" style={{ marginBottom: 56 }}>
          <div className="panel__body">
            <Pipeline stages={PIPELINE_STAGES} />
          </div>
        </Reveal>

        <div className="grid grid--3">
          {WORKFLOW_CARDS.map((card, i) => (
            <Card icon={card.icon} title={card.title} key={i} revealIndex={i}>
              {card.body}
            </Card>
          ))}
        </div>
      </Section>

      {/* ── 5. Billing ────────────────────────────────────────────────── */}
      <Section ink id="billing">
        <SectionHead eyebrow="05 - Signing, billing & reputation" title="Close the loop without leaving the system" />
        <Reveal>
          <FeatureList items={BILLING_FEATURES} />
        </Reveal>
      </Section>

      {/* ── Custom builds ─────────────────────────────────────────────── */}
      <Section narrow containerStyle={{ textAlign: "center" }}>
        <Reveal>
          <span className="eyebrow">Where most agencies stop</span>
          <h2 className="balance" style={{ marginBottom: 20 }}>
            And where we keep going
          </h2>
          <p className="lede">
            Configuration only takes a practice so far. When you need something the platform genuinely can't do
            - a portal that behaves a particular way, an integration with the software you already file in - we
            design and build it ourselves and connect it to the rest of your setup. That engineering capability
            is the difference between a system shaped around your office and an office reshaped around a
            system.
          </p>
          <BtnRow center style={{ marginTop: 32 }}>
            <Button to="/book" variant="accent" icon="calendar">
              Book a demo
            </Button>
            <Button to="/about" variant="outline" icon="arrowRight">
              How we work
            </Button>
          </BtnRow>
        </Reveal>
      </Section>

      <Section tight flushTop>
        <CtaBand
          title="See the whole thing in twenty minutes"
          actions={
            <>
              <Button to="/book" variant="accent" size="lg" icon="calendar">
                Book a demo
              </Button>
              <Button to="/contact" variant="ghost-light" size="lg" icon="message">
                Ask a question first
              </Button>
            </>
          }
        >
          We'll run your actual scenarios through it - the call you keep missing, the client who never sends
          the 1095-A - and show you what happens instead.
        </CtaBand>
      </Section>
    </Layout>
  );
}
