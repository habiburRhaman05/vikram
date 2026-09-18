import Icon from "./Icon.jsx";

/** `.pipeline` - the "New lead -> ... -> Paid" stage strip on Platform.
 * `stages` is `{ label, on? }[]`; every item but the first is preceded by
 * an arrow (see styles.css's own comment on why the arrow groups with the
 * stage AFTER it, not before, for wrapping). */
export default function Pipeline({ stages }) {
  return (
    <div className="pipeline">
      {stages.map((stage, i) => (
        <span className="pipeline__item" key={i}>
          {i > 0 && (
            <span className="pipeline__arrow">
              <Icon name="arrowRight" strokeWidth={2.5} />
            </span>
          )}
          <span className={`pipeline__stage ${stage.on ? "pipeline__stage--on" : ""}`.trim()}>{stage.label}</span>
        </span>
      ))}
    </div>
  );
}
