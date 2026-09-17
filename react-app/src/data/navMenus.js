/**
 * Services mega menu: one "Services" trigger in the bar (see MegaMenu.jsx),
 * holding these three categories as a master-detail panel - a left sidebar
 * of categories (icon + label + chevron) next to a right-hand grid of that
 * category's service cards. This replaced three separate top-level nav
 * triggers (one dropdown per category); `icon` and `accent` below are what
 * give each sidebar row its own colour/icon in that panel.
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
    icon: "brain",
    accent: "bright",
    items: [
      service("AI Agents & Chatbots", "Answer, qualify and book around the clock, in your own tone of voice"),
      service("CRM & Sub-account Setup", "Numbers, calendars, domains and A2P registration configured end to end"),
      service("Reporting Dashboards", "Source, conversion and revenue visible without exporting a spreadsheet"),
      service("Workflow Automation", "Hand-offs between your tools that keep running once they are configured"),
    ],
  },
  {
    id: "marketing",
    label: "Marketing",
    to: `/services/${slugify("Marketing")}`,
    icon: "megaphone",
    accent: "mid",
    items: [
      service("Email & SMS Campaigns", "Sequences that follow up on every lead without anyone having to remember"),
      service("Social Media Marketing", "Grow your brand with strategic, scheduled social media campaigns"),
    ],
  },
  {
    id: "development",
    label: "Funnels, Websites & GHL",
    /* Sidebar-only shortened label - the full name wraps to three lines in
       the mega menu's narrow sidebar column. `label` itself stays
       unchanged since it also drives this category's route slug
       (slugify(menu.label) below) and SERVICE_ROUTES - only MegaMenu.jsx
       reads navLabel, falling back to label for the other two categories. */
    navLabel: "Funnel Design",
    to: `/services/${slugify("Funnels, Websites & GHL")}`,
    icon: "globe",
    accent: "deep",
    /* "GoHighLevel Sub-accounts" and "eCommerce Builds" were removed from
       this menu on request. Two things worth knowing before either comes
       back:
         - eCommerce Builds existed ONLY as this menu item. It never had a
           page, so deleting the row removes the last link to
           /services/ecommerce-builds and the slug drops out of
           SERVICE_ROUTES below. Nothing else references it.
         - GoHighLevel Sub-accounts still has its real page and route
           (/services/gohighlevel-sub-accounts in App.jsx), and the other
           service pages still cross-link to it from serviceLinks.js. It is
           simply no longer listed in this dropdown. */
    items: [
      service("Funnel Design & Builds", "Conversion-first funnels mapped to your offer and your pipeline stages"),
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
