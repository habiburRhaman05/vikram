/**
 * /about - all page copy for the v2 redesign.
 *
 * The layout follows the approved reference design (hero + trust bar,
 * founder letter, journey timeline, values grid, capability section,
 * contact strip, closing CTA). The content is entirely GHLevelUp's own,
 * and follows the same rule the service pages hold to:
 *
 * NO INVENTED FACTS. The reference this was built from runs on a founding
 * year, a client count and a task count that only the business itself can
 * state. GHLevelUp does not have those published yet, so:
 *   - AB_TRUST carries facts that are true by construction (where the team
 *     is based, which states are served, what the platform is built on) -
 *     not manufactured numbers.
 *   - AB_JOURNEY is reframed from "company history" (which we have no real
 *     milestones to publish) into the client's own path to going live - the
 *     same four-stage process already stated elsewhere on the site, given
 *     the reference's alternating-timeline treatment.
 *   - AB_LETTER expands the real FOUNDER note already used on the home page
 *     (src/data/homeV2.jsx) into a fuller letter, same voice, no new claims.
 *
 * If real founding-year and client-count figures are signed off later, they
 * belong in AB_TRUST and nowhere else needs to change.
 */

/* -- 1. Hero + trust bar ---------------------------------------------------- */

export const AB_HERO = {
  crumb: "About",
  eyebrow: "Our story",
  titleLead: "Built to run",
  titleAccent: "without you glued to it.",
  lede:
    "GHLevelUp exists because most businesses are one missed call away from a lost customer, and no amount of hustle fixes that. We build the system that answers, follows up and books - then run it with you, not hand it over and disappear.",
};

export const AB_TRUST = [
  { icon: "mapPin", value: "Albany, NY", label: "US-based team, real people" },
  { icon: "globe", value: "50 states", label: "Practices served nationwide" },
  { icon: "clock", value: "24/7", label: "AI coverage, English & Spanish" },
  { icon: "shieldCheck", value: "GoHighLevel", label: "Certified platform build" },
];

/* -- 2. Founder letter ------------------------------------------------------ */

export const AB_LETTER = {
  eyebrow: "A letter from our founder",
  photo: "/vikrom-a.jpeg",
  name: "Vikram Angurala",
  role: "Founder, GHLevelUp",
  sections: [
    {
      heading: "Why I started this",
      body: "I didn't start GHLevelUp to build another agency. I started it because I kept meeting business owners who were losing good customers to slow follow-up - not to a worse product, not to a worse price, just to whoever replied first.",
    },
    {
      heading: "The problem I saw",
      body: "The businesses I met were not short on effort. They were short on time, running five tools that did not talk to each other, chasing the same five questions all day, and finding out about a missed call only once it had already gone to a competitor.",
    },
    {
      heading: "The system we built",
      body: "So we built one system instead of five: the number people call, the inbox every message lands in, the calendar it books into, and the AI that answers when nobody else can. Configured for your business before you ever log in, and run by the same team afterwards - not handed over with a login and a PDF.",
    },
  ],
  pullQuote: {
    text: "The fix is rarely more traffic. It is a system that answers in seconds, every time, whether or not anyone is at a desk.",
    attribution: "That is the whole of what we build.",
  },
  closing:
    "That is what GHLevelUp is really about: giving you back the hours that used to go to the phone and the follow-up, so you can spend them on the part of the business only you can do.",
  signature: "Vikram Angurala",
};

/* -- 3. How we get you live (the client's own journey) --------------------- */

export const AB_JOURNEY = {
  eyebrow: "How it works",
  title: "Your path to going live",
  lede:
    "Not a company timeline - yours. The same four stages every business goes through with us, in the order they actually happen.",
  steps: [
    {
      num: "01",
      icon: "message",
      title: "Discover",
      body: "A short call about how your business actually runs today - the calls you miss, the leads that go cold, the manual steps eating your week. No slide deck.",
    },
    {
      num: "02",
      icon: "sliders",
      title: "Configure",
      body: "We build the CRM, the AI agent and the automations around your real services, hours and pricing - not a generic template you have to bend your business to fit.",
    },
    {
      num: "03",
      icon: "layers",
      title: "Connect",
      body: "Calendars, numbers, domains, payment and every tool you already use get wired into one system, tested end to end before you ever see it.",
    },
    {
      num: "04",
      icon: "usersTwo",
      title: "Launch & run it with you",
      body: "You go live with a walkthrough, not a login and a PDF. The same team that built it keeps tuning it as your business changes - we do not disappear after go-live.",
    },
  ],
};

/* -- 4. What we believe ------------------------------------------------------ */

export const AB_VALUES = {
  eyebrow: "What we believe",
  title: "The principles that guide the work",
  lede: "Four rules we hold ourselves to, and two we hold about the industry we work in.",
  items: [
    {
      icon: "sliders",
      title: "We configure it before you see it",
      body: "You don't get a login and a tutorial. You get a system already built for your services, your hours and your languages - then we adjust it with you on a call.",
    },
    {
      icon: "code",
      title: "We build what the platform can't do",
      body: "Configuration solves most problems. When it doesn't, we write software - custom portals, integrations with the tools you already use. Most agencies stop at the edge of what their platform allows.",
    },
    {
      icon: "wallet",
      title: "Your usage bills to you, transparently",
      body: "Telephony and AI usage sit on your own billing profile with your own card - never pooled with another client's, never a surprise line item.",
    },
    {
      icon: "message",
      title: "We tell you when it isn't a fit",
      body: "If your business would be better served by something else, we'll say so on the call rather than sell you a subscription you'll cancel in three months.",
    },
    {
      icon: "usersTwo",
      title: "We run it with you, not hand it over",
      body: "The team that configures your system is the team that supports it afterwards. Nobody gets passed to a ticket queue the week after launch.",
    },
    {
      icon: "shieldCheck",
      title: "Client data gets treated like it matters",
      body: "Document storage, call recordings and access are handled for material you're professionally obliged to protect - not an afterthought bolted on later.",
    },
  ],
};

/* -- 5. What's behind it (capability) --------------------------------------- */

export const AB_CAPABILITY = {
  eyebrow: "What's behind it",
  title: "Platform people and engineers, on the same team",
  body: "Plenty of agencies can assemble automations. Fewer can write the software that takes over when the automation runs out. We do both under one roof, which means a request like \"our clients need to see their status without calling us\" gets a built answer instead of a workaround.",
  items: [
    { icon: "star", title: "Conversational & voice AI", body: "Agents that hold a real conversation in two languages and know when to hand over to a person." },
    { icon: "code", title: "Full-stack development", body: "Custom portals and interfaces built in React and Next.js, connected straight into your setup." },
    { icon: "layers", title: "Workflow automation", body: "Pipelines, reminders and follow-up sequences designed around how your business actually moves." },
    { icon: "shieldCheck", title: "Secure client data handling", body: "Document storage and access designed for material you're professionally obliged to protect." },
  ],
  cta: { label: "Book a demo", to: "/book" },
};

/* -- 6. Where to find us ----------------------------------------------------- */

export const AB_CONTACT = {
  eyebrow: "Where to find us",
  title: "Albany, New York",
};

/* -- 7. Closing CTA ----------------------------------------------------------- */

export const AB_CLOSING = {
  title: "Twenty minutes will tell you more than this page",
  body: "Bring the problem that annoys you most about running the business. We'll show you what the system does with it.",
  primary: { label: "Book a demo", to: "/book", icon: "calendar" },
};
