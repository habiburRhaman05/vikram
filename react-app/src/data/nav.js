/** The plain (non-dropdown) items in the primary nav, in bar order after
 * the four service dropdowns from navMenus.js. Active state is derived
 * from the router location, not string-matched against location.pathname
 * the way the original main.js did it.
 *
 * Plans and About were removed from the bar on request; both still have
 * their footer entries (FOOTER_LINKS below) so nothing is orphaned. */
/* Blog is a plain bar item rather than a dropdown: it has one destination,
   and a dropdown holding one thing is the pattern navMenus.js was rewritten
   to get away from. */
export const NAV_LINKS = [
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
