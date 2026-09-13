/** Primary nav, identical on every page - only which link gets `.is-active`
 * changes, and that's now derived from the router location instead of the
 * string-matching main.js used to do against `location.pathname`. */
export const NAV_LINKS = [
  { label: "Services", to: "/platform" },
  { label: "Case Studies", to: "/industries" },
  { label: "Blogs", to: "/#plans" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export const FOOTER_LINKS = NAV_LINKS;
