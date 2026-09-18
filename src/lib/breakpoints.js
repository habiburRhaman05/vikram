/**
 * Layout breakpoints, mirrored from src/legacy/styles.css section 17.
 *
 * These exist because a couple of behaviours can't be expressed in CSS
 * alone (the mobile nav's open/closed state, for one). Any JS that needs
 * to agree with a CSS breakpoint must read it from here rather than
 * hard-coding a number - the two drifting apart is exactly what caused
 * the nav to get stuck open between 900px and 1150px.
 *
 * If you change a value here, change the matching @media query in
 * styles.css too.
 */
export const BREAKPOINTS = {
  /** Hamburger cutover: .nav__links becomes the fixed dropdown panel. */
  nav: 1150,
  /** Hero/spotlight stack to one column. */
  lg: 1080,
  /** Multi-column grids drop to two; timelines become vertical rails. */
  md: 900,
  /** Phone layout: single column, tighter gutters. */
  sm: 640,
};

/** `(max-width: Npx)` media query string for a named breakpoint. */
export const maxWidth = (name) => `(max-width: ${BREAKPOINTS[name]}px)`;
