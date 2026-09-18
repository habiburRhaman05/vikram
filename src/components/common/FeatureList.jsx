import Icon from "./Icon.jsx";

/**
 * `.feature-list` / `.feature-row` - an icon + heading + paragraph list,
 * used on Home ("who we build for"), About ("what's behind it") and
 * Platform ("billing & reputation"). `items` is `{ icon, iconVariant,
 * title, titleExtra, children }[]` - `iconVariant` covers the one-off
 * `feature-row__icon--live` modifier Home uses for its "available now"
 * row, and `titleExtra` the inline status pill some rows append after the
 * heading text.
 */
export default function FeatureList({ items }) {
  return (
    <div className="feature-list">
      {items.map((item, i) => (
        <div className="feature-row" key={i}>
          <span className={`feature-row__icon ${item.iconVariant ? `feature-row__icon--${item.iconVariant}` : ""}`.trim()}>
            <Icon name={item.icon} />
          </span>
          <div>
            <h4>
              {item.title}
              {item.titleExtra}
            </h4>
            <p>{item.children}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
