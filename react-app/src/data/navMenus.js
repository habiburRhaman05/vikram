/**
 * Navbar dropdown menus.
 *
 * Four top-level nav items, each a single-category dropdown of services -
 * replacing the earlier single "Platform" trigger that held all four
 * categories behind tabs. With each category now getting its own place in
 * the bar, a tab switcher inside the panel would be one tab holding one
 * thing - so each dropdown here is just a plain list, not a mega-menu.
 *
 * DESTINATIONS: there are no per-service routes yet, so every item points
 * at /platform, the services hub (see the same note in the old megaMenu
 * data this replaces). Each item carries its own `to` so pointing one at a
 * real page later is a one-line change here and nowhere else.
 */

const HUB = "/platform";

export const NAV_MENUS = [
  {
    id: "ai",
    label: "AI Automation",
    to: HUB,
    items: [
      {
        title: "AI Agents & Chatbots",
        body: "Answer, qualify and book around the clock, in your own tone of voice",
        to: HUB,
      },
      {
        title: "Workflow Automation",
        body: "Hand-offs between your tools that keep running once they are configured",
        to: HUB,
      },
      {
        title: "API & Tool Integrations",
        body: "CRM, calendar, billing and site all reading from one source of truth",
        to: HUB,
      },
      {
        title: "AI Content Systems",
        body: "Briefs, drafts and repurposing on a cadence you set and control",
        to: HUB,
      },
    ],
  },
  {
    id: "creative",
    label: "Creative Design",
    to: HUB,
    items: [
      {
        title: "Brand & Identity",
        body: "Logo, palette and type system, with the rules that keep it consistent",
        to: HUB,
      },
      {
        title: "UI/UX Design",
        body: "Interfaces designed around the one decision the visitor has to make",
        to: HUB,
      },
      {
        title: "Video & Motion",
        body: "Short form, promos and motion cut for the feed and for the landing page",
        to: HUB,
      },
      {
        title: "Content Production",
        body: "Copy, graphics and assets produced on a repeatable schedule",
        to: HUB,
      },
    ],
  },
  {
    id: "marketing",
    label: "Marketing",
    to: HUB,
    items: [
      {
        title: "CRM & Sub-account Setup",
        body: "Numbers, calendars, domains and A2P registration configured end to end",
        to: HUB,
      },
      {
        title: "Pipeline & Funnel Build",
        body: "Stages, forms and booking flows mapped to how you actually sell",
        to: HUB,
      },
      {
        title: "Email & SMS Campaigns",
        body: "Sequences that follow up on every lead without anyone having to remember",
        to: HUB,
      },
      {
        title: "Social Media Marketing",
        body: "Grow your brand with strategic, scheduled social media campaigns",
        to: HUB,
      },
      {
        title: "Reporting Dashboards",
        body: "Source, conversion and revenue visible without exporting a spreadsheet",
        to: HUB,
      },
    ],
  },
  {
    id: "development",
    label: "Development",
    to: HUB,
    items: [
      {
        title: "Websites & Landing Pages",
        body: "Built for speed and conversion, not just to look good in a screenshot",
        to: HUB,
      },
      {
        title: "Web Applications",
        body: "React and Node systems for the parts off-the-shelf software will not cover",
        to: HUB,
      },
      {
        title: "Mobile Apps",
        body: "A single React Native codebase shipped to both app stores",
        to: HUB,
      },
      {
        title: "eCommerce Builds",
        body: "Catalogue, checkout and post-purchase automation wired together",
        to: HUB,
      },
    ],
  },
];
