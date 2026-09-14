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
 */
export default function HaloButton({ to, children, className = "" }) {
  return (
    <Link to={to} className={`hv-halo ${className}`.trim()}>
      <span className="hv-halo__ring">
        <span className="hv-halo__btn">
          <span className="hv-halo__label">
            {children}
            <MorphArrow />
          </span>
          <span className="hv-halo__sheen" aria-hidden="true" />
        </span>
      </span>
    </Link>
  );
}
