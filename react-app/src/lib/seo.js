/**
 * Canonical origin for absolute SEO URLs (canonical, og:url, sitemap).
 *
 * Order of precedence:
 *   1. VITE_SITE_URL   - set this in Vercel's env vars to the real domain.
 *   2. window.location.origin - correct on whatever host is serving the
 *      page, which is right for preview deploys and local dev.
 *   3. A build-time fallback for the server-side/SSG case.
 *
 * Previously these URLs were hard-coded to https://www.quicktaxnbooks.com
 * with the pre-migration ".html" paths, so every page advertised a
 * canonical URL that no longer resolves - pointing search engines at dead
 * URLs and splitting ranking signals. Set VITE_SITE_URL and this is
 * correct everywhere.
 */
const FALLBACK_ORIGIN = "https://www.ghlevelup.com";

export function siteOrigin() {
  const configured = import.meta.env?.VITE_SITE_URL;
  if (configured) return String(configured).replace(/\/$/, "");
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin;
  }
  return FALLBACK_ORIGIN;
}

/** Absolute URL for a site-relative route path ("/", "/platform", ...). */
export function absoluteUrl(path = "/") {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${siteOrigin()}${clean === "/" ? "" : clean}` || siteOrigin();
}
