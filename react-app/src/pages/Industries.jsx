import { Link } from "react-router-dom";
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
import Icon from "@/components/common/Icon.jsx";
import { openLeadPopup } from "@/components/common/LeadPopup.jsx";
import { TAX_TAGS, TAX_CHECKLIST, ROADMAP_CARDS, ROLLOUT_STEPS, PROFESSIONS } from "@/data/industries";

/* The v2 chrome (same header and footer every other redesigned page uses - see
   ServiceComingSoon.jsx for why both stylesheets are needed). The profession
   picker below is built from that design system's own classes, so its styling
   is the only thing this page adds on top: styles/industries.css. */
import "@/styles/home-redesign.css";
import "@/styles/home-chrome.css";
import "@/styles/industries.css";

/**
 * One profession card.
 *
 * A real <button>, not a div with a click handler: it opens the lead popup
 * with that trade already answered, and a button is what makes that
 * keyboard-operable and announced as an action. The 13 trades carry an icon
 * each; "Something else" is a Link to the contact page instead, because it
 * isn't an answer either - it's a different question.
 */
function ProfessionCard({ icon, label, body, other = false, index = 0, to }) {
  const inner = (
    <>
      {icon && (
        <span className="hv-badge" aria-hidden="true">
          <Icon name={icon} />
        </span>
      )}
      <span className="hv-prof__name">{label}</span>
      <span className="hv-prof__body">{body}</span>
      <span className="hv-prof__go" aria-hidden="true">
        <Icon name="arrowRight" />
      </span>
    </>
  );

  return (
    <Reveal as="li" className="hv-prof__item" index={index}>
      {other ? (
        <Link className="hv-prof__card hv-prof__card--other" to={to}>
          {inner}
        </Link>
      ) : (
        <button
          type="button"
          className="hv-prof__card"
          onClick={() => openLeadPopup({ profession: label })}
        >
          {inner}
        </button>
      )}
    </Reveal>
  );
}

export default function Industries() {
  return (
    <Layout
      variant="v2"
      topbar={<>Tax practices are live today - <a href="/contact">tell us which industry you want next</a></>}
    >
      <PageMeta
        title="Industries - GHLevelUp"
        description="Built for tax preparers first, then the trades around them - accounting, bookkeeping, notary, mortgage, real estate, insurance, financial advice and legal practices. Tell us your profession and we'll say what's live today."
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
                <Button to="/book" variant="accent" icon="arrowRight">
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

      {/* ── What is your Profession or Service? ──────────────────────── */}
      {/* Directly after the roadmap: a visitor has just read which trades are
          ready, next and further out, so this is the moment to ask the
          question the whole page is answering. The section's own note below
          the grid repeats that promise, so 14 cards can't read as "all of
          this ships today". */}
      <section id="professions" className="hv-section">
        <div className="hv-container">
          <Reveal className="hv-section-head hv-section-head--center">
            <span className="hv-eyebrow">Who we build for</span>
            <h2 className="hv-h2">What is your Profession or Service?</h2>
            <p className="hv-lede">
              Pick yours and tell us where the day actually goes - the calls you miss, the documents you
              chase, the clients you can't track. We'll answer with what your build would look like, and how
              far off it is.
            </p>
          </Reveal>

          <ul className="hv-grid hv-grid--auto-3 hv-prof">
            {PROFESSIONS.map((p, i) => (
              <ProfessionCard icon={p.icon} label={p.label} body={p.body} index={i} key={p.label} />
            ))}
            <ProfessionCard
              other
              to="/contact"
              index={PROFESSIONS.length}
              label="Something else"
              body="Running a different kind of practice? Tell us and we'll say honestly whether we're the right fit yet."
            />
          </ul>

          <p className="hv-prof__note">
            <Icon name="check" aria-hidden="true" />
            Tax preparers are live today. Bookkeeping is next - you'll get a straight answer on your own trade
            either way.
          </p>
        </div>
      </section>

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
              <Button href="/#services" variant="ghost-light" size="lg" icon="arrowRight">
                See our services
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
