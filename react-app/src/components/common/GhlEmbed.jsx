import { useEffect, useRef } from "react";

const FORM_EMBED_SRC = "https://link.msgsndr.com/js/form_embed.js";

/**
 * Wraps a pasted GoHighLevel iframe snippet (booking calendar or contact
 * form). Two things main.js used to do for every `.ghl-embed iframe`,
 * reimplemented here instead of as a global DOM query:
 *
 *  1. Load form_embed.js once. GHL's script both resizes the iframe via
 *     postMessage and needs to see this exact tag - loaded on mount rather
 *     than baked into index.html because only pages with an embed need it,
 *     and re-injecting it on every navigation to a GHL page's mount
 *     (instead of once ever) makes sure a booking or form embed that's
 *     re-mounted after navigating away still gets sized.
 *  2. Height-floor guard: if the iframe is still ~0 height shortly after
 *     mount (script blocked or slow), hold it at a sensible floor instead
 *     of collapsing - matched to this embed's own `variant`, exactly like
 *     the original ".ghl-embed--calendar" (760px) / other (420px) floors.
 *
 * `iframeProps` is spread onto the <iframe> as-is (src, title, the GHL
 * data-* attributes, style) so each page's embed keeps its own real
 * calendar/form id verbatim rather than this component inventing a schema
 * for them.
 */
export default function GhlEmbed({ variant, iframeProps }) {
  const iframeRef = useRef(null);

  useEffect(() => {
    if (!document.querySelector(`script[src="${FORM_EMBED_SRC}"]`)) {
      const script = document.createElement("script");
      script.src = FORM_EMBED_SRC;
      script.async = true;
      document.body.appendChild(script);
    }

    const frame = iframeRef.current;
    if (!frame) return;
    const floor = variant === "calendar" ? 760 : 420;
    const t = setTimeout(() => {
      if (frame.offsetHeight < 80) {
        frame.style.height = `${floor}px`;
      }
    }, 1200);
    return () => clearTimeout(t);
  }, [variant]);

  return (
    <div className={`ghl-embed ghl-embed--${variant}`}>
      <iframe ref={iframeRef} {...iframeProps} />
    </div>
  );
}
