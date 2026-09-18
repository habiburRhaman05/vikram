import { useState } from "react";
import Icon from "@/components/common/Icon.jsx";

/**
 * An image that degrades gracefully while the real asset is missing.
 *
 * The design calls for ~20 photographic/rendered assets that have to be
 * supplied rather than coded. Rather than leaving holes (or shipping
 * broken <img> icons), this renders a labelled placeholder at the exact
 * aspect ratio the layout expects, and swaps to the real file the moment
 * it appears in public/img/. Because the box is reserved by
 * aspect-ratio + width/height, dropping the assets in causes zero layout
 * shift - the page you review now is the page you get.
 *
 * Props:
 *   src     "/img/foo.png"   - optional; placeholder shown when absent
 *   webp    "/img/foo.webp"  - optional modern source
 *   ratio   "16/10"          - CSS aspect-ratio for the reserved box
 *   alt     required when the image is meaningful; "" marks it decorative
 *   label   short text shown in the placeholder so it's obvious what goes here
 */
export default function ImageSlot({
  src,
  webp,
  alt = "",
  ratio = "16/10",
  label = "Image",
  className = "",
  eager = false,
  rounded = true,
}) {
  const [failed, setFailed] = useState(false);
  const showPlaceholder = !src || failed;

  const classes = ["hv-imgslot", rounded && "hv-imgslot--rounded", className]
    .filter(Boolean)
    .join(" ");

  if (showPlaceholder) {
    return (
      <div
        className={`${classes} hv-imgslot--empty`}
        style={{ aspectRatio: ratio }}
        role="img"
        aria-label={alt || label}
      >
        <Icon name="sparkle" aria-hidden="true" />
        <span>{label}</span>
      </div>
    );
  }

  return (
    <picture className={classes} style={{ aspectRatio: ratio }}>
      {webp && <source type="image/webp" srcSet={webp} />}
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={eager ? "high" : undefined}
        onError={() => setFailed(true)}
      />
    </picture>
  );
}
