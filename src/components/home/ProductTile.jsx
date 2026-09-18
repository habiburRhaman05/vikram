import { useState } from "react";
import Icon from "@/components/common/Icon.jsx";

/**
 * A service's tile.
 *
 * ART MODE (default when `img` is set): the tile's drawn chrome - ring,
 * dark face, grid, glow - is stripped (`hv-ptile--art`) and ONLY the
 * service's icon art shows, because the PNGs in public/services-icons
 * carry their own background/border design.
 *
 * FALLBACK: if a service has no image, or its file 404s, art mode is
 * dropped and the tile falls back to the drawn version (glyph on the
 * toned face) - a missing asset degrades instead of breaking.
 *
 * Used by the hero's tile row and by the Services tabs, which is why it
 * lives here and not inside either section.
 */
export default function ProductTile({ icon, img, tone, size = "md", className = "" }) {
  const [broken, setBroken] = useState(false);
  const art = img && !broken;

  return (
    <span
      className={`hv-ptile hv-ptile--${size} ${art ? "hv-ptile--art" : ""} ${className}`.trim()}
      style={{ "--tone": tone }}
      aria-hidden="true"
    >
      <span className="hv-ptile__face">
        <Icon name={icon} strokeWidth={2.1} className="hv-ptile__glyph" />
        {img && (
          <img
            className="hv-ptile__img"
            src={img}
            alt=""
            width={64}
            height={64}
            loading="lazy"
            decoding="async"
            onError={() => setBroken(true)}
          />
        )}
      </span>
    </span>
  );
}
