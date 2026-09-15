import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout.jsx";
import PageMeta from "@/components/common/PageMeta.jsx";
import PageHero from "@/components/common/PageHero.jsx";
import Section from "@/components/common/Section.jsx";
import SectionHead from "@/components/common/SectionHead.jsx";
import Button from "@/components/common/Button.jsx";
import BtnRow from "@/components/common/BtnRow.jsx";
import Icon from "@/components/common/Icon.jsx";
import Stats from "@/components/common/Stats.jsx";
import Spotlight from "@/components/common/Spotlight.jsx";
import { Panel } from "@/components/common/Panel.jsx";
import Checklist from "@/components/common/Checklist.jsx";
import Faq from "@/components/common/Faq.jsx";
import CtaBand from "@/components/common/CtaBand.jsx";
import Reveal from "@/components/common/Reveal.jsx";
import { NAV_MENUS } from "@/data/navMenus.js";
import { SERVICE_LINEUP } from "@/data/homeV2.jsx";

/* v2 chrome (glass header, SiteFooterV2) - same two stylesheets every other
   redesigned page loads; see Industries.jsx for why both are needed.
   services.css only adds this page's own clickable-tile layout on top. */
import "@/styles/home-redesign.css";
import "@/styles/home-chrome.css";
import "@/styles/services.css";

/* One icon per NAV_MENUS category - the same mapping the sitemap builds,
   kept here too since a nav dropdown has no use for an icon but this page
   does. One icon per individual service, purely decorative - chosen by
   hand since navMenus.js's own item() helper only carries a title and a
   one-line body (the dropdown never needed more than that). */
const CATEGORY_ICONS = { ai: "brain", marketing: "megaphone", development: "code" };
const ITEM_ICONS = {
  "AI Agents & Chatbots": "chatWindow",
  "Workflow Automation": "sliders",
  "API & Tool Integrations": "layers",
  "AI Content Systems": "sparkle",
  "CRM & Sub-account Setup": "target",
  "Pipeline & Funnel Build": "barChart",
  "Email & SMS Campaigns": "mail",
  "Social Media Marketing": "megaphone",
  "Reporting Dashboards": "lineChart",
  "Funnel Design & Builds": "layers",
  "Websites & Landing Pages": "globe",
  "GoHighLevel Sub-accounts": "code",
  "eCommerce Builds": "cart",
};

/* Only "AI Agents & Chatbots" has a real page today - everything else
   still resolves through ServiceComingSoon (see that file's own comment
   for why that's a deliberate, honest placeholder rather than a dead
   link). Cards for the rest carry a small "coming soon" tag so the grid
   doesn't quietly imply all thirteen are live. */
const LIVE_SLUGS = new Set(["ai-agents-chatbots"]);

const STAT_ITEMS = [
  { num: "13", label: "Services, one team" },
  { num: "24/7", label: "AI coverage, EN & ES" },
  { num: "1-2 wks", label: "Typical setup time" },
  { num: "0", label: "Vendors to coordinate between" },
];

const PROCESS_STEPS = [
  { num: "01", title: "Discover", body: "A short call about how your business actually runs today - the calls you miss, the leads that go cold, the manual steps eating your week." },
  { num: "02", title: "Configure", body: "We build the CRM, automations and AI around your real workflow - not a generic template you have to bend your business to fit." },
  { num: "03", title: "Connect", body: "Calendars, numbers, domains, payment and every tool you already use get wired into one system before you ever log in." },
  { num: "04", title: "Launch & support", body: "You go live with a walkthrough, not a login and a PDF - and the same team that built it keeps running it with you." },
];

const FAQS = [
  {
    question: "Do I need to hire someone to manage all of this?",
    answer: "No. That's the point of one team handling it end to end - configuration, connections and ongoing changes are on us, not a role you have to fill.",
  },
  {
    question: "Can you build something that isn't listed here?",
    answer: "Often, yes. Configuration covers most requests; when it doesn't, we write custom software and connect it to the rest of your setup - see the About page for how that split works.",
  },
  {
    question: "How long before something is actually live?",
    answer: "Most CRM and automation builds are ready in one to two weeks. Larger builds - a full website, a multi-stage funnel - are scoped on the call so the timeline is never a guess.",
  },
  {
    question: "Is the AI receptionist a separate product?",
    answer: "No - it's part of the same platform, reading from the same calendar and pipeline as everything else, so a booked call shows up wherever your team already looks.",
  },
  {
    question: "What does it cost?",
    answer: "It depends on which services you need and how much custom work they involve. Book a call and we'll give you real numbers for your business, confirmed in writing before anything is signed.",
  },
];

function ServiceCard({ to, icon, label, body, index }) {
  const live = LIVE_SLUGS.has(to.split("/").pop());
  return (
    <Reveal as="li" index={index}>
      <Link className="svc-card" to={to}>
        <div className="svc-card__top">
          <span className="hv-badge hv-badge--sm" aria-hidden="true">
            <Icon name={icon} />
          </span>
          <span className="svc-card__go" aria-hidden="true">
            <Icon name="arrowRight" />
          </span>
        </div>
        <span className="svc-card__name">{label}</span>
        <p className="svc-card__body">{body}</p>
        {!live && <span className="svc-card__soon">In development</span>}
      </Link>
    </Reveal>
  );
}

export default function Services() {
  return (
    <Layout
      variant="v2"
      topbar={<>Tell us what's slowing your team down - <a href="/contact">we'll say which of this fits</a></>}
    >
      <PageMeta
        title="Services - GHLevelUp"
        description="CRM & GoHighLevel, AI automation, marketing and websites - every service GHLevelUp builds and runs, in one place."
      />

      <PageHero
        crumb="Services"
        title="One team, every system your business runs on"
        center
        lede="CRM, AI automation, marketing and web - built and supported by the same team from setup through the long run, so nothing falls through the cracks between vendors."
      >
        <BtnRow style={{ marginTop: 32 }}>
          <Button to="/book" variant="accent" icon="calendar">
            Book a demo
          </Button>
          <Button to="/contact" variant="ghost-light" icon="message">
            Ask what fits your business
          </Button>
        </BtnRow>
      </PageHero>

      <Section tight>
        <Stats items={STAT_ITEMS} />
      </Section>

      {/* ── CRM & GoHighLevel (the umbrella product) ─────────────────────── */}
      <Section id="crm">
        <Spotlight
          copy={
            <>
              <span className="eyebrow">The foundation</span>
              <h2 className="balance">CRM &amp; GoHighLevel, configured before you log in</h2>
              <p>
                Every service on this page runs on the same GoHighLevel CRM - one pipeline, one calendar, one
                inbox for calls, texts, email and web chat. We set it up around your business first, then hand
                you a system that already knows your services and your hours.
              </p>
              <Checklist
                items={[
                  "Pipelines, contacts and calendars mapped to how you actually sell",
                  "Numbers, domains and A2P registration handled for you",
                  "One inbox for every channel a client can reach you on",
                ]}
              />
              <BtnRow>
                <Button to="/book" variant="accent" icon="arrowRight">
                  See it on a demo
                </Button>
              </BtnRow>
            </>
          }
          media={
            <Panel title="Configured out of the box" status="Live">
              <div className="tags">
                {SERVICE_LINEUP.map((s) => (
                  <span className="tag" key={s.id}>
                    {s.label}
                  </span>
                ))}
              </div>
              <p style={{ marginTop: 22, fontSize: ".9rem", color: "var(--muted)" }}>
                Every service below connects back into this same CRM - nothing lives on its own island.
              </p>
            </Panel>
          }
        />
      </Section>

      {/* ── The three service categories ─────────────────────────────────── */}
      {NAV_MENUS.map((menu, mi) => (
        <Section key={menu.id} mist={mi % 2 === 0} id={menu.id}>
          <div className="svc-cat-head">
            <span className="hv-badge" aria-hidden="true">
              <Icon name={CATEGORY_ICONS[menu.id]} />
            </span>
            <div>
              <span className="eyebrow" style={{ display: "block", marginBottom: 4 }}>
                {mi === 0 ? "First - AI Automation" : mi === 1 ? "Then - Marketing" : "And - Funnels, Websites & GHL"}
              </span>
              <h3>{menu.label}</h3>
            </div>
          </div>

          <ul className="svc-grid">
            {menu.items.map((item, i) => (
              <ServiceCard
                key={item.title}
                to={item.to}
                icon={ITEM_ICONS[item.title] || CATEGORY_ICONS[menu.id]}
                label={item.title}
                body={item.body}
                index={i}
              />
            ))}
          </ul>
        </Section>
      ))}

      {/* ── How we get you live ──────────────────────────────────────────── */}
      <Section ink>
        <SectionHead center eyebrow="How it works" title="Four moves from call to live system" />
        <div className="steps">
          {PROCESS_STEPS.map((step) => (
            <div className="step" key={step.num}>
              <span className="step__num">{step.num}</span>
              <h4>{step.title}</h4>
              <p>{step.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <Section narrow>
        <SectionHead center eyebrow="Questions" title="Before you book a call" />
        <Faq items={FAQS} />
      </Section>

      <Section tight flushTop>
        <CtaBand
          title="Tell us what's slowing you down"
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
          We'll say plainly which of this is live today, what's next, and what it would cost to fix the specific
          thing that's eating your week.
        </CtaBand>
      </Section>
    </Layout>
  );
}
