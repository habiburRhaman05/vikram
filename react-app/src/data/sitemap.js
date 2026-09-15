import { NAV_MENUS } from "./navMenus.js";

/** One icon per NAV_MENUS group id - navMenus.js doesn't carry an icon
 *  itself (the nav dropdowns render plain text), so the mapping lives here
 *  instead of adding a field the dropdowns would never use. */
const MENU_ICONS = { ai: "brain", marketing: "megaphone", development: "layers" };

/**
 * Every reachable page on the site, grouped for the sitemap. The three
 * service groups are built from NAV_MENUS rather than re-typed, so a new
 * service added to the nav dropdowns shows up here automatically instead of
 * needing a second, easily-forgotten edit.
 *
 * Each link is either `{ label, to }` (client-side route, rendered as a
 * router Link) or `{ label, href }` (a same-page hash landing on the home
 * page, rendered as a plain anchor) - the same split SiteFooterV2 already
 * uses for its own link columns.
 */
export const SITEMAP_GROUPS = [
  {
    title: "Main",
    icon: "house",
    links: [
      { label: "Home", to: "/" },
      { label: "Platform Overview", to: "/platform" },
      { label: "Industries", to: "/industries" },
      { label: "Contact", to: "/contact" },
      { label: "Book a Demo", to: "/book" },
    ],
  },
  ...NAV_MENUS.map((menu) => ({
    title: menu.label,
    icon: MENU_ICONS[menu.id] || "layers",
    links: [
      { label: `${menu.label} Overview`, to: menu.to },
      ...menu.items.map((item) => ({ label: item.title, to: item.to })),
    ],
  })),
  {
    title: "Company",
    icon: "users",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Our Work", href: "/#work" },
      { label: "Plans & Pricing", href: "/#plans" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    title: "Legal",
    icon: "shieldCheck",
    links: [
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms & Conditions", to: "/terms" },
      { label: "Sitemap", to: "/sitemap" },
    ],
  },
];
