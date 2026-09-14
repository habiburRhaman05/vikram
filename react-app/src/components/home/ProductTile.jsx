import Icon from "@/components/common/Icon.jsx";

/**
 * A service's tile: a dark rounded square with a coloured glow and a faint
 * network grid behind a white glyph - the reference's product icons,
 * redrawn in CSS so each service can take its own `tone` from
 * SERVICE_LINEUP rather than needing five separate image files.
 *
 * Used by the hero's tile row and by the Services tabs, which is why it
 * lives here and not inside either section.
 */
export default function ProductTile({ icon, tone, size = "md", className = "" }) {
  return (
    <span
      className={`hv-ptile hv-ptile--${size} ${className}`.trim()}
      style={{ "--tone": tone }}
      aria-hidden="true"
    >
      <span className="hv-ptile__face">
        <Icon name={icon} strokeWidth={2.1} />
      </span>
    </span>
  );
}
