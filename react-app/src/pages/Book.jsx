import Layout from "@/components/layout/Layout.jsx";
import PageMeta from "@/components/common/PageMeta.jsx";
import PageHero from "@/components/common/PageHero.jsx";
import Section from "@/components/common/Section.jsx";
import Button from "@/components/common/Button.jsx";
import Checklist from "@/components/common/Checklist.jsx";
import Card from "@/components/common/Card.jsx";
import GhlEmbed from "@/components/common/GhlEmbed.jsx";
import Reveal from "@/components/common/Reveal.jsx";
import { SITE } from "@/data/site";

const COVER_ITEMS = [
  "A live call into the AI receptionist, in English and in Spanish",
  "The client portal from your client's side and from yours",
  "How a return moves through the pipeline, and what fires at each stage",
  "What setup would look like for your practice, and what it costs",
];

const REASSURANCE_CARDS = [
  { icon: "clock", title: "Twenty minutes, honestly", body: "We keep to the time booked. If it isn't a fit, we'll say so on the call rather than put you into a follow-up sequence." },
  { icon: "shieldCheck", title: "Real pricing on the call", body: "You'll get actual numbers for your office size, and we confirm them in writing before anything is signed." },
  { icon: "usersTwo", title: "Bring your team", body: "Invite whoever answers the phone and whoever prepares the returns - they usually ask the questions that matter most." },
];

export default function Book() {
  return (
    <Layout topbar={<>Demos run <strong>Monday to Friday</strong> - evening slots available during filing season</>}>
      <PageMeta
        title="Book a Demo - GHLevelUp"
        description="Book a 20-minute walkthrough of the platform: the AI receptionist answering live, a client uploading documents, and a return moving through the board."
        path="/book.html"
      />

      <PageHero
        crumb="Book a demo"
        title="Pick a time that suits your week"
        center
        lede="Twenty minutes, screen shared, no slide deck. Tell us how your office runs today and we'll show you the same setup handling it - then answer the pricing question directly."
      />

      {/* ── What we'll cover ──────────────────────────────────────────── */}
      <Section tight flushTop style={{ paddingTop: 40, paddingBottom: 40 }}>
        <div className="grid grid--2" style={{ gap: 48, alignItems: "start" }}>
          <Reveal>
            <h2 style={{ fontSize: "1.5rem", marginBottom: 20 }}>What we'll cover</h2>
            <Checklist items={COVER_ITEMS} />
          </Reveal>

          <Reveal className="info-card">
            <h4 style={{ marginBottom: 14 }}>Rather talk now?</h4>
            <p style={{ fontSize: ".95rem", color: "var(--text-mid)", marginBottom: 18 }}>
              Call or text the office directly - we answer during business hours, and the receptionist covers
              everything else.
            </p>
            <Button href={SITE.phoneHref} variant="accent" size="sm" icon="phone">
              Call {SITE.phone}
            </Button>
          </Reveal>
        </div>
      </Section>

      {/* ── Booking calendar ──────────────────────────────────────────── */}
      <Section flushTop style={{ paddingBottom: 48 }}>
        <Reveal>
          {/* GHL EMBED - BOOKING CALENDAR (Calendar ID: jsNyJ9b3iUCqXfm9t2gP).
              Full width deliberately - see GhlEmbed.jsx / the original
              book.html comment on why this doesn't share a row with the
              "what we'll cover" content above it. */}
          <GhlEmbed
            variant="calendar"
            iframeProps={{
              src: "https://api.leadconnectorhq.com/widget/booking/jsNyJ9b3iUCqXfm9t2gP",
              allow: "payment",
              style: { width: "100%", border: "none", overflow: "hidden" },
              scrolling: "no",
              title: "Book a demo - booking calendar",
              id: "jsNyJ9b3iUCqXfm9t2gP_1789123726233",
            }}
          />
        </Reveal>
      </Section>

      {/* ── Reassurance ───────────────────────────────────────────────── */}
      <Section mist tight>
        <div className="grid grid--3">
          {REASSURANCE_CARDS.map((card, i) => (
            <Card icon={card.icon} title={card.title} key={i} revealIndex={i}>
              {card.body}
            </Card>
          ))}
        </div>
      </Section>
    </Layout>
  );
}
