/**
 * /work and /work/:slug - the portfolio hub and its case-study template.
 *
 * ILLUSTRATIVE PROJECTS, same five as the home page's "Our Work" section
 * (WORK in homeV2.jsx) - this file extends each one with the detail-page
 * content that section doesn't need (challenge, solution, tech stack,
 * outcome). Kept as one shared list rather than two, so the hub, the home
 * page teaser and a detail page can never describe the same project
 * differently.
 *
 * NO INVENTED METRICS, NO FABRICATED TESTIMONIALS - same rule as every
 * other work-shaped section on this site (see the WORK.note pattern on
 * every service page). Specifically:
 *   - `heroStatement` is a project summary written in our own voice, not a
 *     quote attributed to a fictional client or role.
 *   - `outcomePoints` describe what changed in qualitative, checkable
 *     terms (a process now exists, a call gets answered) - never a
 *     percentage, a dollar figure or a "verified" number attached to an
 *     anonymised project.
 *   - `resultTag` on the hub card is the same kind of qualitative line,
 *     kept short for the grid.
 * Swap in real, client-approved case studies (with permission to publish)
 * before this ships - the disclaimer in `note` says so on every page too.
 */

export const WORK_HUB = {
  eyebrow: "Our work",
  title: "Systems We've Built",
  lede:
    "A look at the kind of work we deliver - CRM, automation, websites and reporting, built to fit how each business actually runs.",
  note:
    "These are illustrative project types, not named client case studies - we do not publish client details without written sign-off. Swap in real, approved work here as it becomes available to share.",
  filters: [
    { id: "all", label: "All work" },
    { id: "crm", label: "CRM & Automation" },
    { id: "web", label: "Websites" },
    { id: "ai", label: "AI" },
  ],
};

export const WORK_PROJECTS = [
  {
    id: "clinic",
    filter: "crm",
    industry: "Healthcare",
    title: "Multi-Location Clinic Group",
    resultTag: "One system, four locations",
    body: "Patient intake, booking and follow-up unified across every location in one GoHighLevel system.",
    tags: ["GoHighLevel", "AI receptionist", "Reporting"],
    image: "/img/home/svc-crm",
    tone: "#3E8EF7",

    heroStatement:
      "Four locations, four different booking processes, and a front desk that couldn't see any of them at once.",
    challenge:
      "Patient intake, scheduling and follow-up ran differently at each location, with no shared view of a patient across the group. A change made at the front desk of one site had no effect on the others, and pulling a group-wide report meant calling around and comparing spreadsheets by hand.",
    solutionPoints: [
      "One GoHighLevel account structure shared across all four locations",
      "A single intake and booking flow, customised per location's hours and services",
      "An AI receptionist answering after-hours calls for every site",
      "Reporting rolled up to one dashboard the owner actually opens",
    ],
    techStack: [
      "Custom Opportunity Pipelines",
      "Multi-location sub-account structure",
      "AI voice receptionist",
      "Unified reporting dashboard",
      "SMS & email follow-up sequences",
    ],
    outcomePoints: [
      "One booking system instead of four disconnected ones",
      "After-hours calls answered at every location, not only the sites with evening staff",
      "A single dashboard the owner checks instead of four separate logins",
    ],
  },
  {
    id: "home-services",
    filter: "web",
    industry: "Home Services",
    title: "Booking-First Website",
    resultTag: "Quotes routed the moment they land",
    body: "A fast new site and quote funnel that drops every request straight into the pipeline.",
    tags: ["Website", "Funnels", "SMS"],
    image: "/img/home/svc-development",
    tone: "#A855F7",

    heroStatement: "The old site got visits. It just never turned many of them into a booked job.",
    challenge:
      "Traffic was steady, but the quote request sat three scrolls down on mobile, and every submission landed in a shared inbox that wasn't checked until the next business day - by which point most people had already called someone else.",
    solutionPoints: [
      "A rebuilt site with the quote request above the fold on every device",
      "A dedicated landing page for the highest-traffic service, split-testable on its own",
      "An instant SMS acknowledgement the moment a form is submitted",
      "Every submission written straight to the CRM with its source attached",
    ],
    techStack: [
      "Advanced Funnel Builders",
      "Website & landing page builder",
      "SMS follow-up triggers",
      "Booking calendar integration",
    ],
    outcomePoints: [
      "A quote request that's visible without scrolling on any device",
      "Every submission acknowledged in minutes instead of the next business day",
      "One pipeline showing every request instead of a shared inbox",
    ],
  },
  {
    id: "real-estate",
    filter: "ai",
    industry: "Real Estate",
    title: "24/7 AI Lead Qualifier",
    resultTag: "Buyers answered day or night",
    body: "AI agents that answer enquiries, qualify buyers and book viewings around the clock.",
    tags: ["AI agents", "Workflows"],
    image: "/img/home/svc-ai",
    tone: "#35D9A0",

    heroStatement: "Buyers browse listings at 11pm. Nobody was answering them until 9am.",
    challenge:
      "Most enquiries arrived outside office hours, and by the time anyone replied the next morning, a good share of interested buyers had already booked a viewing somewhere else or gone quiet.",
    solutionPoints: [
      "An AI chat and voice agent answering listing enquiries around the clock",
      "Qualifying questions asked automatically before a human gets involved",
      "Viewings booked directly into the agent's calendar, no back-and-forth",
      "A handoff to a human agent the moment a buyer asks something the AI shouldn't answer alone",
    ],
    techStack: [
      "AI voice & chat agents",
      "SMS Triggers",
      "Custom Opportunity Pipelines",
      "Calendar booking integration",
    ],
    outcomePoints: [
      "Enquiries answered the same hour they arrive, regardless of the time",
      "Viewings booked without a phone tag chain",
      "A qualified-buyer flag on the record before a human ever calls",
    ],
  },
  {
    id: "agency-reporting",
    filter: "crm",
    industry: "Professional Services",
    title: "Campaign & Reporting Hub",
    resultTag: "One dashboard, not three",
    body: "Email, SMS and paid campaigns run from one CRM, with a dashboard the owner actually opens.",
    tags: ["Campaigns", "Dashboards"],
    image: "/img/home/svc-marketing",
    tone: "#F59E0B",

    heroStatement: "Three campaign tools, three sets of numbers, and no single answer to what was actually working.",
    challenge:
      "Email went out from one platform, SMS from another, and paid ad spend was tracked in a spreadsheet nobody kept current. Comparing channels meant reconciling three exports by hand, so decisions were usually made on a hunch.",
    solutionPoints: [
      "Email, SMS and paid campaigns consolidated into one CRM",
      "A single reporting dashboard comparing every channel side by side",
      "Cost and lead source tracked automatically instead of exported manually",
      "A monthly review built around the dashboard, not a spreadsheet",
    ],
    techStack: [
      "Custom Opportunity Pipelines",
      "Multi-channel campaign builder",
      "Advanced reporting dashboard",
      "API integrations",
    ],
    outcomePoints: [
      "One dashboard instead of three exports reconciled by hand",
      "Channels compared on the same numbers, not three different definitions",
      "A monthly review that starts from a screen instead of a spreadsheet",
    ],
  },
  {
    id: "retail-automation",
    filter: "ai",
    industry: "E-commerce & Retail",
    title: "Cart Recovery & Support Bot",
    resultTag: "Abandoned carts followed up automatically",
    body: "Smart AI bots that rescue abandoned carts and handle post-purchase tracking support automatically.",
    tags: ["AI agents", "E-commerce", "Automation"],
    image: "/img/home/svc-ai",
    tone: "#EC4899",

    heroStatement: "Carts got abandoned. Nothing ever followed up on them.",
    challenge:
      "The store had no recovery flow for an abandoned cart, and post-purchase questions - where's my order, can I change the size - all landed in the same support inbox as everything else, with no way to tell which ones were urgent.",
    solutionPoints: [
      "An automated recovery sequence triggered the moment a cart is abandoned",
      "An AI support bot handling order-status and common post-purchase questions",
      "Urgent issues flagged and routed to a human instead of sitting in the queue",
      "The whole flow reusable for the next product line without rebuilding it",
    ],
    techStack: ["AI chat agents", "SMS Triggers", "Workflow automation", "Order & checkout integration"],
    outcomePoints: [
      "Abandoned carts followed up automatically instead of not at all",
      "Routine order-status questions answered without a person",
      "Genuinely urgent tickets separated from the routine ones",
    ],
  },
];

export function workBySlug(slug) {
  return WORK_PROJECTS.find((p) => p.id === slug) || null;
}

/* Same disclaimer shape as every service page's Work section - see
   ServiceWebsitesLanding.jsx's WEB_WORK.note for the original wording this
   is adapted from. */
export const WORK_NOTE =
  "This is a representative project type, not a named client engagement - we do not publish client details or performance figures without written sign-off.";
