/**
 * The service detail pages that actually exist, and which ones are worth
 * cross-linking from each.
 *
 * ONE SOURCE OF TRUTH for the slugs. Every related-services module reads
 * from here, so a link can never point at a route that was renamed or never
 * built. Only the six pages below have real content - the rest of the
 * catalogue in navMenus.js still resolves to ServiceComingSoon, and linking
 * a reader from a finished page into a placeholder is a worse experience
 * than not linking at all, so those are deliberately absent.
 *
 * RELATED is keyed by the page you are ON, and each entry carries its own
 * `why` - the reason THAT service matters to someone reading THIS one. That
 * is the whole point of the module: "Workflow Automation" means something
 * different as a follow-on from the AI agent page (what happens after the
 * booking) than it does from the integrations page (what uses the pipes).
 * A generic three-card shelf repeated on six pages would say none of that.
 */

export const SERVICES = {
  "ai-agents-chatbots": {
    slug: "ai-agents-chatbots",
    title: "AI Agents & Chatbots",
    icon: "chatWindow",
    blurb: "Answer every call, text and chat around the clock, and book straight into the calendar.",
  },
  "workflow-automation": {
    slug: "workflow-automation",
    title: "Workflow Automation",
    icon: "sliders",
    blurb: "Turn the hand-offs your team does manually into automations that fire on time, every time.",
  },
  "api-tool-integrations": {
    slug: "api-tool-integrations",
    title: "API & Tool Integrations",
    icon: "layers",
    blurb: "One record per customer across every tool, updated live instead of by spreadsheet export.",
  },
  "funnel-design-builds": {
    slug: "funnel-design-builds",
    title: "Funnel Design & Builds",
    icon: "target",
    blurb: "Offer, stages and follow-up built as one path from first click to booked call.",
  },
  "gohighlevel-sub-accounts": {
    slug: "gohighlevel-sub-accounts",
    title: "GoHighLevel Sub-accounts",
    icon: "key",
    blurb: "Numbers, domains, calendars and A2P compliance configured end to end before you log in.",
  },
  "websites-landing-pages": {
    slug: "websites-landing-pages",
    title: "Websites & Landing Pages",
    icon: "globe",
    blurb: "Fast, responsive pages built to convert, not just to look right in a screenshot.",
  },
  "social-media-marketing": {
    slug: "social-media-marketing",
    title: "Social Media Marketing",
    icon: "megaphone",
    blurb: "Content planned, scheduled and posted on a cadence you don't have to think about.",
  },
  "email-sms-campaigns": {
    slug: "email-sms-campaigns",
    title: "Email & SMS Campaigns",
    icon: "mail",
    blurb: "Sequences that follow up on every lead without anyone having to remember.",
  },
  "reporting-dashboards": {
    slug: "reporting-dashboards",
    title: "Reporting Dashboards",
    icon: "lineChart",
    blurb: "Source, conversion and revenue visible in one place, without exporting a spreadsheet.",
  },
  "crm-sub-account-setup": {
    slug: "crm-sub-account-setup",
    title: "CRM & Sub-account Setup",
    icon: "building",
    blurb: "Account structure, pipelines, compliance and migration configured before you log in.",
  },
};

/** Helper so a page can ask for its own related set by slug. */
export function relatedFor(slug) {
  return (RELATED[slug] || []).map((entry) => ({
    ...SERVICES[entry.slug],
    why: entry.why,
    to: `/services/${entry.slug}`,
  }));
}

export const RELATED = {
  "ai-agents-chatbots": [
    {
      slug: "workflow-automation",
      why: "The agent books the appointment. This is what fires afterwards - the reminder, the intake form, the follow-up if they no-show.",
    },
    {
      slug: "api-tool-integrations",
      why: "An agent is only as useful as what it can see. Integrations give it live availability, pricing and customer history to answer from.",
    },
    {
      slug: "gohighlevel-sub-accounts",
      why: "The platform the agent runs on - the number it answers, the calendar it books into and the inbox it writes to.",
    },
  ],

  "workflow-automation": [
    {
      slug: "ai-agents-chatbots",
      why: "Automation handles what happens after an enquiry lands. This is what catches the enquiry in the first place, at any hour.",
    },
    {
      slug: "api-tool-integrations",
      why: "A workflow can only move data it can reach. This is how the tools either end of the hand-off get connected.",
    },
    {
      slug: "gohighlevel-sub-accounts",
      why: "Where the pipelines, triggers and calendars these automations run against actually live.",
    },
  ],

  "api-tool-integrations": [
    {
      slug: "workflow-automation",
      why: "Connections on their own just move data. This is what puts them to work - the sequences that act on the record once it updates.",
    },
    {
      slug: "ai-agents-chatbots",
      why: "The clearest payoff of a live integration: an agent that quotes real availability and real prices instead of guessing.",
    },
    {
      slug: "gohighlevel-sub-accounts",
      why: "The hub most of these integrations point at, set up properly so the connections have somewhere to land.",
    },
  ],

  "funnel-design-builds": [
    {
      slug: "websites-landing-pages",
      why: "A funnel needs pages to run on. This is the build side - speed, responsiveness and the form that actually submits.",
    },
    {
      slug: "workflow-automation",
      why: "The opt-in is the start, not the finish. This is the follow-up sequence that turns a captured lead into a booked call.",
    },
    {
      slug: "ai-agents-chatbots",
      why: "Funnels generate enquiries at odd hours. This answers them in seconds rather than on Monday morning.",
    },
  ],

  "gohighlevel-sub-accounts": [
    {
      slug: "workflow-automation",
      why: "A configured platform is the starting line. This is what you build on top of it once the plumbing is in place.",
    },
    {
      slug: "ai-agents-chatbots",
      why: "The first thing most businesses switch on once the number and calendar are live.",
    },
    {
      slug: "funnel-design-builds",
      why: "The demand side: the pages and stages that fill the pipeline your sub-account now has.",
    },
  ],

  "websites-landing-pages": [
    {
      slug: "funnel-design-builds",
      why: "A site tells people who you are. A funnel gives one offer its own dedicated path - useful when a page has a single job.",
    },
    {
      slug: "workflow-automation",
      why: "What happens to a form submission after it is submitted, so an enquiry never sits in an inbox unanswered.",
    },
    {
      slug: "ai-agents-chatbots",
      why: "The chat widget on the site, answering questions and booking instead of collecting a form nobody reads.",
    },
  ],

  "social-media-marketing": [
    {
      slug: "websites-landing-pages",
      why: "A post can only send people somewhere. This is the page it sends them to, built to actually convert.",
    },
    {
      slug: "email-sms-campaigns",
      why: "A follower is rented attention. This is how you turn one into an address and a number you actually own.",
    },
    {
      slug: "ai-agents-chatbots",
      why: "Every comment and DM a post generates lands in the same inbox this answers - none of it goes missing.",
    },
  ],

  "email-sms-campaigns": [
    {
      slug: "workflow-automation",
      why: "A sequence is an automation with a subject line. This is the rest of what triggers, waits and branches on your data.",
    },
    {
      slug: "social-media-marketing",
      why: "The list has to come from somewhere. This is how it keeps growing instead of slowly going stale.",
    },
    {
      slug: "ai-agents-chatbots",
      why: "A missed call becomes the first text in the sequence automatically - the two are built to hand off to each other.",
    },
  ],

  "reporting-dashboards": [
    {
      slug: "api-tool-integrations",
      why: "A dashboard can only show what it can reach. This is how the sources it reads from actually get connected.",
    },
    {
      slug: "gohighlevel-sub-accounts",
      why: "The platform most of this data already lives in - configured properly, it's most of the connection work already done.",
    },
    {
      slug: "workflow-automation",
      why: "A dashboard tells you what's happening. This is what acts on it automatically once you've seen it.",
    },
  ],

  "crm-sub-account-setup": [
    {
      slug: "workflow-automation",
      why: "A structured CRM is the foundation. This is what starts running on top of it once the pipelines exist.",
    },
    {
      slug: "api-tool-integrations",
      why: "Setup connects the obvious tools. This is the custom joins for anything without a ready-made connector.",
    },
    {
      slug: "reporting-dashboards",
      why: "Clean structure is what makes reporting possible at all - this is the view you get once the data has a shape.",
    },
  ],
};
