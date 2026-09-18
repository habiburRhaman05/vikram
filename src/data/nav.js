/** The plain (non-dropdown) items in the primary nav, in bar order after
 * the Services mega menu (see MegaMenu.jsx / navMenus.js). Active state is
 * derived from the router location, not string-matched against
 * location.pathname the way the original main.js did it. */
export const NAV_LINKS = [
  { label: "Pricing", to: "/pricing" },
  { label: "About Us", to: "/about" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

/** Footer's link column - flat by nature (a footer has no room for
 * dropdowns), so it gets its own short list rather than trying to expand
 * NAV_LINKS/NAV_MENUS into something a plain <Link> can render. */
export const FOOTER_LINKS = [
  { label: "Services", to: "/#services" },
  { label: "Plans", to: "/pricing" },
  { label: "About", to: "/about" },
  /* A blog nobody links to is a blog nobody reads, and an orphaned page is
     also the one search engines crawl least. The footer link is the one
     that survives on every route. */
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];
