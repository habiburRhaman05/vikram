import { useLocation } from "react-router-dom";
import { absoluteUrl } from "@/lib/seo";

/**
 * Per-page <title>/<meta description>/<link canonical>/<og:...>.
 * React 19 hoists <title>, <meta> and <link> rendered anywhere in the
 * tree up into the real document <head>, so this is just JSX in the page
 * body - no react-helmet needed.
 *
 * The canonical/og:url is derived from the live route via src/lib/seo.js.
 * It used to be built from a hard-coded domain plus hand-passed ".html"
 * paths, which meant every page pointed search engines at URLs that no
 * longer exist. Pages may still pass `path` to override, but the default
 * (the current route) is correct.
 *
 * `image` should be an absolute or root-relative path to the share image;
 * it is resolved to an absolute URL because og:image requires one.
 */
export default function PageMeta({
  title,
  description,
  path,
  ogDescription,
  image = "/og-image.png",
  noIndex = false,
}) {
  const location = useLocation();
  const url = absoluteUrl(path ?? location.pathname);

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="GHLevelUp" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={absoluteUrl(image)} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={ogDescription || description} />
      <meta name="twitter:image" content={absoluteUrl(image)} />
    </>
  );
}
