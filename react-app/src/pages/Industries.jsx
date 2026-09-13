import Layout from "@/components/layout/Layout.jsx";
import PageMeta from "@/components/common/PageMeta.jsx";
import PageHero from "@/components/common/PageHero.jsx";
import Section from "@/components/common/Section.jsx";
import SectionHead from "@/components/common/SectionHead.jsx";
import Button from "@/components/common/Button.jsx";
import BtnRow from "@/components/common/BtnRow.jsx";
import StatusPill from "@/components/common/StatusPill.jsx";
import Card from "@/components/common/Card.jsx";
import Checklist from "@/components/common/Checklist.jsx";
import Spotlight from "@/components/common/Spotlight.jsx";
import { Panel } from "@/components/common/Panel.jsx";
import CtaBand from "@/components/common/CtaBand.jsx";
import Reveal from "@/components/common/Reveal.jsx";
import { TAX_TAGS, TAX_CHECKLIST, ROADMAP_CARDS, ROLLOUT_STEPS } from "@/data/industries";

export default function Industries() {
  return (
    <Layout topbar={<>Tax practices are live today - <a href="/contact">tell us which industry you want next</a></>}>
      <PageMeta
        title="Industries - GHLevelUp"
        description="Built for tax preparers first, then the offices around them - bookkeeping, real estate, medical practices and freight brokers."
      />

      {/* center: true - matches the page-hero--center fix applied earlier
          in this project (every other page's hero is centered; industries.html
          had fallen back out of sync with that via an external revert this
          migration doesn't want to reintroduce). */}
      <PageHero
        crumb="Industries"
        title="One industry at a time, properly"
        center
        lede="A general-purpose CRM arrives empty and asks you to become a systems administrator. We do the opposite: we go deep on one trade until the system knows its language, its deadlines and its paperwork - then we move to the next."
      >
        <BtnRow style={{ marginTop: 32 }}>
          <Button to="/book" variant="accent" icon="calendar">
            Book a demo
          </Button>
          <Button to="/contact" variant="ghost-light" icon="message">
            Ask about your industry
          </Button>
        </BtnRow>
      </PageHero>

      {/* ── Tax preparers ─────────────────────────────────────────────── */}
      <Section>
        <Spotlight
          copy={
            <>
              <StatusPill style={{ marginBottom: 18 }}>Available now</StatusPill>
              <h2 className="balance">Tax preparers &amp; e-file providers</h2>
              <p>
                Our first and deepest build. Everything is shaped around a filing season: the intake questions,
                the document checklists, the pipeline stages and the reminders that go out when a client stalls.
              </p>
              <Checklist items={TAX_CHECKLIST} />
              <BtnRow>
                <Button to="/platform" variant="accent" icon="arrowRight">
                  See the tax build
                </Button>
              </BtnRow>
            </>
          }
          media={
            <Panel title="Configured out of the box">
              <div className="tags">
                {TAX_TAGS.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <p style={{ marginTop: 22, fontSize: ".9rem", color: "var(--muted)" }}>
                Each return type arrives with its own client-document checklist and reminder sequence.
              </p>
            </Panel>
          }
        />
      </Section>

      {/* ── Other industries ─────────────────────────────────────────── */}
      <Section mist>
        <SectionHead center eyebrow="The roadmap" title="Where we're building next">
          The underlying platform is the same. What changes is the vocabulary, the workflow stages, the
          documents collected and the questions the receptionist knows how to answer.
        </SectionHead>

        <div className="grid grid--2">
          {ROADMAP_CARDS.map((card, i) => (
            <Card icon={card.icon} title={card.title} key={i} revealIndex={i}>
              {card.body}
            </Card>
          ))}
        </div>

        <Reveal style={{ textAlign: "center", marginTop: 56 }}>
          <p style={{ color: "var(--text-mid)", maxWidth: "56ch", marginInline: "auto" }}>
            Running a different kind of practice? If the shape of the problem is the same - calls you can't
            answer, documents you have to chase, clients you can't track - tell us and we'll say honestly
            whether we're the right fit yet.
          </p>
          <BtnRow center style={{ marginTop: 26 }}>
            <Button to="/contact" variant="outline" icon="message">
              Tell us about your practice
            </Button>
          </BtnRow>
        </Reveal>
      </Section>

      {/* ── Why one at a time ────────────────────────────────────────── */}
      <Section ink>
        <div className="grid grid--2" style={{ gap: 64, alignItems: "center" }}>
          <Reveal>
            <span className="eyebrow">Our approach</span>
            <h2 className="balance">Why we don't launch five industries at once</h2>
            <p style={{ color: "var(--on-dark-muted)", fontSize: "1.05rem", marginTop: 18 }}>
              Every trade has details that decide whether a system is useful or merely present. A tax office
              needs to know that a 1095-A blocks a return. A freight broker needs to know a rate confirmation
              blocks a load. Software that treats those as the same generic "missing document" saves nobody any
              time.
            </p>
            <p style={{ color: "var(--on-dark-muted)", fontSize: "1.05rem" }}>
              So we finish one industry before starting the next - and the practices already running on it keep
              getting the improvements we learn along the way.
            </p>
          </Reveal>
          <Reveal>
            <div className="steps steps--2col">
              {ROLLOUT_STEPS.map((step, i) => (
                <div className={`step ${step.on ? "step--on" : ""}`.trim()} key={i}>
                  <span className="step__num">{step.num}</span>
                  <h4>{step.title}</h4>
                  <p>{step.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tight>
        <CtaBand
          title="Start with the industry that's ready"
          actions={
            <>
              <Button to="/book" variant="accent" size="lg" icon="calendar">
                Book a demo
              </Button>
              <Button to="/platform" variant="ghost-light" size="lg" icon="arrowRight">
                See the platform
              </Button>
            </>
          }
        >
          If you prepare tax returns, we can show you a finished system this week - not a roadmap.
        </CtaBand>
      </Section>
    </Layout>
  );
}
