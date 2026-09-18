/**
 * Services mega menu: one "Services" trigger in the bar (see MegaMenu.jsx),
 * holding these four categories as a master-detail panel - a left sidebar
 * of categories (icon + label + chevron) next to a right-hand grid of that
 * category's service cards. This replaced three separate top-level nav
 * triggers (one dropdown per category); `icon` and `accent` below are what
 * give each sidebar row its own colour/icon in that panel.
 *
 * DESTINATIONS: every item gets its own route, `/services/<slug>`, with
 * the slug derived from its own title via slugify() rather than
 * hand-written - one less place a URL and its title can drift apart.
 *
 * EVERY ITEM BELOW NOW HAS A REAL PAGE. That was not true when this file
 * was written; each title used to fall through to the `/services/:slug`
 * catch-all and render ServiceComingSoon. Two things follow from it:
 *   - Adding a title here that has no <Route> in App.jsx quietly ships a
 *     "coming soon" page into a menu where every neighbour is real. Build
 *     the page first, or leave the row out.
 *   - The CATEGORY rows (`to` on each menu below) still have no pages of
 *     their own, and that is deliberate: MegaMenu.jsx renders them as
 *     <button> tab switchers, never as links, so nobody can navigate to
 *     one. `to` exists only so Header.jsx can tell whether the current
 *     route belongs to the Services menu.
 *
 * NOT LISTED HERE, ON PURPOSE:
 *   - GoHighLevel Sub-accounts (/services/gohighlevel-sub-accounts) has a
 *     real page and is cross-linked from serviceLinks.js, but was removed
 *     from this menu on request - see the note in the funnels category.
 *   - Reporting Dashboards stays listed even though the /services hub now
 *     folds it into one card with Funnels. The hub is a pitch; this menu
 *     is the catalogue, and this row is the main way a reader reaches that
 *     page directly.
 */
import { slugify } from "@/lib/slugify.js";

const service = (title, body) => ({ title, body, to: `/services/${slugify(title)}` });

export const NAV_MENUS = [
  {
    id: "ai",
    label: "CRM & AI Automation",
    to: `/services/${slugify("AI Automation")}`,
    icon: "brain",
    accent: "bright",
    items: [
      service("AI Agents & Chatbots", "Answer, qualify and book around the clock, in your own tone of voice"),
      service("CRM & Sub-account Setup", "Numbers, calendars, domains and A2P registration configured end to end"),
      service("Reporting Dashboards", "Source, conversion and revenue visible without exporting a spreadsheet"),
      service("Workflow Automation", "Hand-offs between your tools that keep running once they are configured"),
      service("White-Label Support", "A 24/7 helpdesk answering your clients under your brand, never ours"),
    
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
       reads navLabel, falling back to label for the other three. */
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
