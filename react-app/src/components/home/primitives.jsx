import { Link } from "react-router-dom";
import Icon from "@/components/common/Icon.jsx";
import useReveal from "@/hooks/useReveal";

/**
 * Shared primitives for the Home redesign.
 *
 * These live under components/home/ rather than components/common/ on
 * purpose: they're styled entirely by src/styles/home-redesign.css, which
 * only applies inside the `.home-v2` wrapper. Dropping one of these onto
 * another page would render it unstyled, so keeping them out of the
 * shared folder stops that happening by accident.
 */

/* -- Layout --------------------------------------------------------------- */

export function HvSection({
  mint = false,
  dark = false,
  tight = false,
  flushTop = false,
  wash = false,
  id,
  className = "",
  children,
  ...rest
}) {
  const classes = [
    "hv-section",
    mint && "hv-section--mint",
    dark && "hv-section--dark",
    tight && "hv-section--tight",
    flushTop && "hv-section--flush-top",
    wash && "hv-wash",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section id={id} className={classes} {...rest}>
      <div className="hv-container">{children}</div>
    </section>
  );
}

/** Scroll reveal. Wraps the existing useReveal IntersectionObserver hook
 *  but with the redesign's own `.hv-reveal` transition. */
export function Reveal({ as: Tag = "div", index = 0, className = "", children, ...rest }) {
  const ref = useReveal(index);
  return (
    <Tag ref={ref} className={`hv-reveal ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}

/** Eyebrow + h2 + optional lede. `as` lets a section drop to h3 where the
 *  document outline calls for it - heading level is a semantic decision,
 *  not a styling one, so it stays separate from the visual class. */
export function SectionHead({ eyebrow, title, children, center = false, as: Tag = "h2", index = 0 }) {
  return (
    <Reveal className={`hv-section-head ${center ? "hv-section-head--center" : ""}`.trim()} index={index}>
      {eyebrow && <span className="hv-eyebrow">{eyebrow}</span>}
      <Tag className="hv-h2">{title}</Tag>
      {children && <p className="hv-lede">{children}</p>}
    </Reveal>
  );
}

/* -- Controls ------------------------------------------------------------- */

/**
 * `to` → router Link (internal), `href` → plain anchor (tel:, mailto:,
 * external, in-page hash), neither → a real <button>. Rendering the right
 * element matters for keyboard and screen-reader behaviour, so it's
 * derived rather than left to the caller.
 */
export function Btn({
  to,
  href,
  onClick,
  variant = "primary",
  size,
  icon,
  iconAfter,
  className = "",
  children,
  ...rest
}) {
  const classes = ["hv-btn", `hv-btn--${variant}`, size === "lg" && "hv-btn--lg", className]
    .filter(Boolean)
    .join(" ");

  const inner = (
    <>
      {icon && <Icon name={icon} />}
      {children}
      {iconAfter && <Icon name={iconAfter} />}
    </>
  );

  if (to) return <Link to={to} className={classes} {...rest}>{inner}</Link>;
  if (href) return <a href={href} className={classes} {...rest}>{inner}</a>;
  return <button type="button" className={classes} onClick={onClick} {...rest}>{inner}</button>;
}

export function BtnRow({ className = "", children }) {
  return <div className={`hv-btn-row ${className}`.trim()}>{children}</div>;
}

/** Text link with a trailing arrow that nudges on hover. */
export function ArrowLink({ to, href, children, className = "" }) {
  const inner = (
    <>
      {children}
      <Icon name="arrowRight" strokeWidth={2.5} />
    </>
  );
  const classes = `hv-link ${className}`.trim();
  return to ? (
    <Link to={to} className={classes}>{inner}</Link>
  ) : (
    <a href={href} className={classes}>{inner}</a>
  );
}

/** Circular icon-only control. `label` is required - an icon with no
 *  accessible name is invisible to a screen reader. */
export function IconButton({ icon, label, onClick, disabled, className = "", ...rest }) {
  return (
    <button
      type="button"
      className={`hv-icon-btn ${className}`.trim()}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      {...rest}
    >
      <Icon name={icon} />
    </button>
  );
}

/* -- Content bits --------------------------------------------------------- */

export function IconBadge({ icon, size, round = false, className = "" }) {
  const classes = [
    "hv-badge",
    size === "sm" && "hv-badge--sm",
    round && "hv-badge--round",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <span className={classes} aria-hidden="true">
      <Icon name={icon} />
    </span>
  );
}

export function Chip({ children, className = "" }) {
  return <span className={`hv-chip ${className}`.trim()}>{children}</span>;
}

export function Checks({ items, className = "" }) {
  return (
    <ul className={`hv-checks ${className}`.trim()}>
      {items.map((item, i) => (
        <li key={i}>
          <Icon name="check" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
