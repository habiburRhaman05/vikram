import { Link } from "react-router-dom";
import Icon from "./Icon.jsx";

/**
 * Every CTA on the original site is an <a class="btn ..."> with a leading
 * icon - see the styles.css comment on ".btn svg" for why the icon always
 * comes first. This component is that one reusable element: pick a
 * `variant` (accent | outline | ghost-light) instead of a color, an
 * optional `size` (sm | lg), `block` for full-width, and `icon` for the
 * leading glyph - the same handful of props cover every button on the site.
 *
 * Internal routes use `to` (renders a router <Link>); external/tel/mailto
 * links use `href` (renders a plain <a>) - matching how the original
 * mixed internal .html links with tel:/mailto: anchors.
 */
export default function Button({
  to,
  href,
  variant = "accent",
  size,
  block = false,
  icon,
  className = "",
  children,
  ...rest
}) {
  const classes = [
    "btn",
    variant && `btn--${variant}`,
    size && `btn--${size}`,
    block && "btn--block",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {icon && <Icon name={icon} />}
      {children}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} className={classes} {...rest}>
      {content}
    </a>
  );
}
