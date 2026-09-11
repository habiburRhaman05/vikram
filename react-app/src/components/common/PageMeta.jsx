/**
 * Per-page <title>/<meta description>/<link canonical>/<og:...>, ported
 * from each page's hand-written <head> block. React 19 hoists <title>,
 * <meta> and <link> rendered anywhere in the tree up into the real
 * document <head> automatically, so this can just be JSX in the page
 * body - no react-helmet or manual document.title juggling needed.
 *
 * `path` is the site-relative path (e.g. "/platform.html") used to build
 * the canonical/og:url - kept as the original .html paths since the
 * canonical domain/URLs are real SEO-facing values nobody asked to change,
 * not something this migration should silently alter.
 */
export default function PageMeta({ title, description, path, ogDescription }) {
  const url = `https://www.quicktaxnbooks.com${path}`;
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:url" content={url} />
    </>
  );
}
