import Icon from "./Icon.jsx";
import Reveal from "./Reveal.jsx";

/**
 * `.card` - the icon/index + heading + paragraph tile used in every
 * `.grid` on the site. Pass either `icon` (an Icon name) or `index` (the
 * "01" style numeral used on about.html's principles) - never both, the
 * original never combines them. `ink` matches `.card--ink` (dark-section
 * variant).
 */
export default function Card({ icon, index, ink = false, title, children, revealIndex = 0 }) {
  return (
    <Reveal as="article" className={`card ${ink ? "card--ink" : ""}`.trim()} index={revealIndex}>
      {icon && (
        <span className="card__icon" aria-hidden="true">
          <Icon name={icon} />
        </span>
      )}
      {index && <span className="card__index">{index}</span>}
      <h3>{title}</h3>
      <p>{children}</p>
    </Reveal>
  );
}
