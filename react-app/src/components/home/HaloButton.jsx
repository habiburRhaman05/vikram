import { Link } from "react-router-dom";
import { MorphArrow } from "./heroIcons.jsx";

/**
 * The reference's "Get Started" button: a soft halo, a thin bright ring,
 * then the solid button, with a sheen that fades in and a chevron that
 * becomes an arrow on hover.
 *
 * The reference nests <a><div><div><button>. A button inside a link is
 * invalid HTML and gives assistive tech two overlapping controls for one
 * action, so here it is a single link, with the layers as spans.
 *
 * `to` renders a router <Link> (internal route); `href` renders a plain
 * <a> instead - a react-router Link is for in-app routes, not an external
 * domain, so an outside destination (e.g. the client-onboarding site)
 * needs the plain-anchor path to actually navigate there.
 */
export default function HaloButton({ to, href, children, className = "" }) {
  const inner = (
    <span className="hv-halo__ring">
      <span className="hv-halo__btn">
        <span className="hv-halo__label">
          {children}
          <MorphArrow />
        </span>
        <span className="hv-halo__sheen" aria-hidden="true" />
      </span>
    </span>
  );

  if (href) {
    return (
      <a href={href} className={`hv-halo ${className}`.trim()}>
        {inner}
      </a>
    );
  }

  return (
    <Link to={to} className={`hv-halo ${className}`.trim()}>
      {inner}
    </Link>
  );
}
