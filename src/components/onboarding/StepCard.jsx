import Icon from "@/components/common/Icon.jsx";

/** The card shell every step renders inside: icon tile, "Section N" title
 *  and its one-line description, matching the reference's card header. */
export default function StepCard({ icon, heading, description, children }) {
  return (
    <div className="ob-card">
      <div className="ob-card__head">
        <span className="ob-card__icon" aria-hidden="true">
          <Icon name={icon} />
        </span>
        <div>
          <h2>{heading}</h2>
          <p>{description}</p>
        </div>
      </div>
      <div className="ob-card__body">{children}</div>
    </div>
  );
}
