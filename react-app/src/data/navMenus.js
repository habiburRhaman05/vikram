/**
 * Navbar dropdown menus.
 *
 * Four top-level nav items, each a single-category dropdown of services -
 * replacing the earlier single "Platform" trigger that held all four
 * categories behind tabs. With each category now getting its own place in
 * the bar, a tab switcher inside the panel would be one tab holding one
 * thing - so each dropdown here is just a plain list, not a mega-menu.
 *
 * DESTINATIONS: every item now gets its own route, `/services/<slug>`,
 * with the slug derived from its own title via slugify() rather than
 * hand-written - one less place a URL and its title can drift apart.
 * None of these have a dedicated page built yet (that's a separate,
 * per-service content project), so /services/:slug currently always
 * resolves to ServiceComingSoon, which looks the title back up from
 * SERVICE_ROUTES below and shows a friendly "in progress" page instead of
 * a dead link or a silent redirect to /platform (which is what every item
 * here used to point at - genuinely indistinguishable from four separate
 * things being the same page). Giving a specific service a real page
 * later is just adding `<Route path="/services/that-slug" .../>` above
 * the :slug catch-all in App.jsx - nothing here needs to change.
 */
import { slugify } from "@/lib/slugify.js";

const service = (title, body) => ({ title, body, to: `/services/${slugify(title)}` });

export const NAV_MENUS = [
  {
    id: "ai",
    label: "AI Automation",
    to: `/services/${slugify("AI Automation")}`,
    items: [
      service("AI Agents & Chatbots", "Answer, qualify and book around the clock, in your own tone of voice"),
      service("Workflow Automation", "Hand-offs between your tools that keep running once they are configured"),
      service("API & Tool Integrations", "CRM, calendar, billing and site all reading from one source of truth"),
      service("AI Content Systems", "Briefs, drafts and repurposing on a cadence you set and control"),
    ],
  },
  {
    id: "marketing",
    label: "Marketing",
    to: `/services/${slugify("Marketing")}`,
    items: [
      service("CRM & Sub-account Setup", "Numbers, calendars, domains and A2P registration configured end to end"),
      service("Pipeline & Funnel Build", "Stages, forms and booking flows mapped to how you actually sell"),
      service("Email & SMS Campaigns", "Sequences that follow up on every lead without anyone having to remember"),
      service("Social Media Marketing", "Grow your brand with strategic, scheduled social media campaigns"),
      service("Reporting Dashboards", "Source, conversion and revenue visible without exporting a spreadsheet"),
    ],
  },
  {
    id: "development",
    label: "Funnels, Websites & GHL",
    to: `/services/${slugify("Funnels, Websites & GHL")}`,
    items: [
      service("Funnel Design & Builds", "Conversion-first funnels mapped to your offer and your pipeline stages"),
      service("Websites & Landing Pages", "Built for speed and conversion, not just to look good in a screenshot"),
      service("GoHighLevel Sub-accounts", "Domains, calendars, forms and automations configured end to end"),
      service("eCommerce Builds", "Catalogue, checkout and post-purchase automation wired together"),
    ],
  },
];

/** Every title that resolves under /services/:slug, keyed by its own slug -
 *  built from NAV_MENUS itself (group labels + each item) so it can never
 *  list a title that isn't actually linked from somewhere. ServiceComingSoon
 *  merges this with its own derived map of SERVICE_LINEUP (homeV2.jsx) to
 *  turn a bare slug back into a human title - each data file only describes
 *  its own titles; nothing here reaches into home page data or vice versa. */
export const SERVICE_ROUTES = Object.fromEntries(
  NAV_MENUS.flatMap((menu) => [
    [slugify(menu.label), menu.label],
    ...menu.items.map((item) => [slugify(item.title), item.title]),
  ])
);
