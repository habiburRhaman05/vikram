import Layout from "@/components/layout/Layout.jsx";
import PageMeta from "@/components/common/PageMeta.jsx";
import PageHero from "@/components/common/PageHero.jsx";
import Section from "@/components/common/Section.jsx";
import SectionHead from "@/components/common/SectionHead.jsx";
import Button from "@/components/common/Button.jsx";
import BtnRow from "@/components/common/BtnRow.jsx";
import Card from "@/components/common/Card.jsx";
import FeatureList from "@/components/common/FeatureList.jsx";
import InfoCard from "@/components/common/InfoCard.jsx";
import Icon from "@/components/common/Icon.jsx";
import CtaBand from "@/components/common/CtaBand.jsx";
import Reveal from "@/components/common/Reveal.jsx";
import { SITE } from "@/data/site";
import { PRINCIPLES, CAPABILITIES } from "@/data/about";

export default function About() {
  return (
    <Layout topbar="Based in Albany, New York - working with practices across all 50 states">
      <PageMeta
        title="About - GHLevelUp"
        description="An engineering team that builds and runs the operating layer for tax practices - configuration where it fits, custom software where it doesn't."
        path="/about.html"
      />

      <PageHero
        crumb="About"
        title="We build the system, then we run it with you"
        center
        lede="GHLevelUp came out of a tax practice, not a software pitch deck. We know what the second week of April feels like - and we build for that week, not for a demo."
      />

      {/* ── Story ─────────────────────────────────────────────────────── */}
      <Section narrow>
        <Reveal>
          <span className="eyebrow">Why we exist</span>
          <h2 className="balance" style={{ marginBottom: 24 }}>
            Tax offices don't need more software. They need fewer places to look.
          </h2>
          <p className="lede">
            Most practices we meet are running on four or five tools that don't speak to each other: a phone, an
            email inbox, a folder of scanned documents, a spreadsheet tracking who's where, and a separate
            calendar. None of it is broken exactly. It just leaks time - a few minutes at a stretch, several
            hundred times a season.
          </p>
          <p style={{ color: "var(--text-mid)", marginTop: 20 }}>
            We built one system that holds all of it: the number clients call, the inbox every message lands
            in, the portal they upload to, the board that tracks their return, and the automations that chase
            what's missing. One place to look, one place to update, one place that stays current whether or not
            anybody remembered to update it.
          </p>
          <p style={{ color: "var(--text-mid)" }}>
            Based in Albany, New York, we work with practices across all fifty states - and we still answer our
            own phone.
          </p>
        </Reveal>
      </Section>

      {/* ── Principles ────────────────────────────────────────────────── */}
      <Section mist>
        <SectionHead center eyebrow="How we work" title="Four things we hold to" />
        <div className="grid grid--2">
          {PRINCIPLES.map((p, i) => (
            <Card index={p.index} title={p.title} key={i} revealIndex={i}>
              {p.body}
            </Card>
          ))}
        </div>
      </Section>

      {/* ── Capability ────────────────────────────────────────────────── */}
      <Section ink>
        <div className="grid grid--2" style={{ gap: 64, alignItems: "center" }}>
          <Reveal>
            <span className="eyebrow">What's behind it</span>
            <h2 className="balance">Platform people and engineers, on the same team</h2>
            <p style={{ color: "var(--on-dark-muted)", fontSize: "1.05rem", marginTop: 18 }}>
              Plenty of agencies can assemble automations. Fewer can write the software that takes over when the
              automation runs out. We do both under one roof, which means a request like "our clients need to
              see their return status without calling us" gets a built answer instead of a workaround.
            </p>
            <BtnRow style={{ marginTop: 30 }}>
              <Button to="/book" variant="accent" icon="calendar">
                Book a demo
              </Button>
              <Button to="/contact" variant="ghost-light" icon="message">
                Send a message
              </Button>
            </BtnRow>
          </Reveal>
          <Reveal>
            <FeatureList items={CAPABILITIES} />
          </Reveal>
        </div>
      </Section>

      {/* ── Contact strip ─────────────────────────────────────────────── */}
      <Section>
        <SectionHead center eyebrow="Where to find us" title="Albany, New York" />
        <Reveal as="div" className="grid grid--3">
          <InfoCard>
            <span className="info-list__icon" style={{ marginBottom: 16 }} aria-hidden="true">
              <Icon name="mapPin" />
            </span>
            <h4 style={{ marginBottom: 8 }}>Office</h4>
            <p style={{ fontSize: ".96rem", color: "var(--text-mid)" }}>
              {SITE.addressLine1}
              <br />
              {SITE.addressLine2}
              <br />
              <small style={{ color: "var(--muted)" }}>Visits by appointment</small>
            </p>
          </InfoCard>
          <InfoCard>
            <span className="info-list__icon" style={{ marginBottom: 16 }} aria-hidden="true">
              <Icon name="phone" />
            </span>
            <h4 style={{ marginBottom: 8 }}>Call or text</h4>
            <p style={{ fontSize: ".96rem", color: "var(--text-mid)" }}>
              <a href={SITE.phoneHref} style={{ color: "var(--text)", fontWeight: 600 }}>
                {SITE.phone}
              </a>
              <br />
              <small style={{ color: "var(--muted)" }}>{SITE.hours}</small>
            </p>
          </InfoCard>
          <InfoCard>
            <span className="info-list__icon" style={{ marginBottom: 16 }} aria-hidden="true">
              <Icon name="mail" />
            </span>
            <h4 style={{ marginBottom: 8 }}>Email</h4>
            <p style={{ fontSize: ".96rem", color: "var(--text-mid)", wordBreak: "break-word" }}>
              <a href={SITE.emailHref} style={{ color: "var(--text)", fontWeight: 600 }}>
                {SITE.email}
              </a>
              <br />
              <small style={{ color: "var(--muted)" }}>Same business day</small>
            </p>
          </InfoCard>
        </Reveal>
      </Section>

      <Section tight flushTop>
        <CtaBand
          title="Twenty minutes will tell you more than this page"
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
          Bring the problem that annoys you most about running the office. We'll show you what the system does
          with it.
        </CtaBand>
      </Section>
    </Layout>
  );
}
