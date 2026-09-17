import { SITE } from "@/data/site";
import { absoluteUrl } from "@/lib/seo";

/**
 * JSON-LD structured data. Valid anywhere in the document per Google's
 * spec, so it's rendered inline by whichever page/section owns the facts
 * it describes rather than being centralised into <head>.
 *
 * Usage:
 *   <StructuredData organization />            - site identity (Home, Contact)
 *   <StructuredData faq={FAQ_ITEMS} />         - FAQ rich result
 *   <StructuredData blog={POSTS} />            - the /blog listing
 *   <StructuredData article={post}             - a single post
 *                   crumbs={[{ name, path }]} />
 *   <StructuredData page={{ type, name, description, path }} />
 *                                              - the page itself (AboutPage,
 *                                                ContactPage, WebPage, ...)
 *   <StructuredData service={{ slug, name, description }} />
 *                                              - one service detail page
 *   <StructuredData collection={{ name, description, path, items }} />
 *                                              - a hub that lists things
 *                                                (/services, /work)
 *   <StructuredData extra={[BLOCK]} />         - raw blocks for shapes this
 *                                                component does not model
 *                                                yet (case studies, ...)
 *
 * Several props can be combined in one call: a post page legitimately
 * publishes an Article AND a BreadcrumbList AND an FAQPage, and they are all
 * emitted from a single <script> tag as an array, which Google accepts.
 *
 * BREADCRUMBS ON EVERY PAGE: pass `crumbs` on any indexable route (Home >
 * Section > Page). It is the cheapest schema there is - it needs no facts
 * beyond the URL structure already visible in the hero - and it is what
 * makes a search result show the path instead of a bare URL.
 *
 * ARTICLE FIELDS: `datePublished` and `dateModified` are what the post's own
 * data supplies. dateModified is deliberately separate from the publish
 * date: republishing an edited article with a fresh datePublished is how a
 * site gets a reputation for faking freshness, while an honest dateModified
 * is exactly what the field is for.
 */
export default function StructuredData({
  organization = false,
  faq,
  article,
  crumbs,
  blog,
  page,
  service,
  collection,
  extra,
}) {
  const blocks = [];

  /* @id, not just url: the organisation/website nodes are emitted from more
     than one page (Home, Contact, and every page that names GHLevelUp as a
     provider). Without an @id, each one is a separate anonymous entity and a
     crawler has to guess they are the same business; with it, they merge
     into one node no matter how many pages describe it. */
  const ORG_ID = `${absoluteUrl("/")}/#organization`;
  const SITE_ID = `${absoluteUrl("/")}/#website`;
  /* Only point at the organisation node from a page that also publishes it,
     so a crawler never has to resolve an @id that is described nowhere on
     the page it just read. */
  const aboutOrg = organization ? { about: { "@id": ORG_ID } } : {};

  if (organization) {
    blocks.push({
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": ORG_ID,
      name: "GHLevelUp",
      url: absoluteUrl("/"),
      logo: absoluteUrl("/img/logo@2x.png"),
      image: absoluteUrl("/og-image.png"),
      description:
        "GoHighLevel, AI automation, marketing, and funnel, website and GHL build services for businesses that want one connected system instead of five disconnected tools.",
      telephone: SITE.phone,
      email: SITE.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE.addressLine1,
        addressLocality: "Albany",
        addressRegion: "NY",
        postalCode: "12203",
        addressCountry: "US",
      },
      openingHours: "Mo-Fr 09:00-18:00",
      areaServed: "US",
    });

    blocks.push({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": SITE_ID,
      name: "GHLevelUp",
      url: absoluteUrl("/"),
      publisher: { "@id": ORG_ID },
    });
  }

  if (faq?.length) {
    blocks.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
  }

  if (blog?.length) {
    /* The listing. An ItemList of the posts in the order the page shows them
       is what lets a crawler read the page as a table of contents rather
       than as a wall of identical cards. */
    blocks.push({
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "GHLevelUp blog",
      description:
        "Practical guides on CRM, GoHighLevel, AI agents, follow-up, funnels and websites for businesses that want one connected system.",
      url: absoluteUrl("/blog"),
      publisher: { "@type": "Organization", name: "GHLevelUp", url: absoluteUrl("/") },
      blogPost: blog.map((post) => ({
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        url: absoluteUrl(`/blog/${post.slug}`),
        datePublished: post.date,
        image: absoluteUrl(post.image),
      })),
      mainEntity: {
        "@type": "ItemList",
        itemListElement: blog.map((post, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: absoluteUrl(`/blog/${post.slug}`),
        })),
      },
    });
  }

  if (article) {
    blocks.push({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: article.title,
      description: article.excerpt,
      url: absoluteUrl(`/blog/${article.slug}`),
      mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(`/blog/${article.slug}`) },
      image: absoluteUrl(article.image),
      datePublished: article.date,
      dateModified: article.updated || article.date,
      articleSection: article.category,
      keywords: article.tags?.join(", "),
      wordCount: article.wordCount,
      inLanguage: "en-US",
      /* Named, not anonymous. An attributed byline is part of what search
         quality raters look for on advice content, and it points at the
         About page where the person is described at length. */
      author: {
        "@type": "Person",
        name: SITE.founder.name,
        jobTitle: SITE.founder.role,
        url: absoluteUrl(SITE.founder.href),
      },
      publisher: {
        "@type": "Organization",
        name: "GHLevelUp",
        logo: { "@type": "ImageObject", url: absoluteUrl("/img/logo@2x.png") },
      },
    });
  }

  /* The page describing itself. `type` is any WebPage subtype the page
     actually is - AboutPage, ContactPage, CollectionPage, ItemPage - so the
     schema says what the page is rather than everything claiming to be a
     generic WebPage. */
  if (page) {
    blocks.push({
      "@context": "https://schema.org",
      "@type": page.type || "WebPage",
      name: page.name,
      description: page.description,
      url: absoluteUrl(page.path),
      inLanguage: "en-US",
      isPartOf: { "@id": SITE_ID },
      ...aboutOrg,
    });
  }

  /* One service detail page. Named the same way the page names it, described
     with the same sentence the page shows a searcher, and pointed at its own
     URL - so the offer is a thing with an address rather than a paragraph on
     a page about something else. */
  if (service) {
    blocks.push({
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.name,
      description: service.description,
      serviceType: service.name,
      url: absoluteUrl(service.path || `/services/${service.slug}`),
      areaServed: { "@type": "Country", name: "United States" },
      provider: { "@id": ORG_ID },
      mainEntityOfPage: absoluteUrl(service.path || `/services/${service.slug}`),
    });
  }

  /* A hub: what the page lists, in the order it lists it. An ItemList is
     what lets a crawler read /services or /work as a table of contents
     rather than as cards that happen to share a layout. */
  if (collection) {
    blocks.push({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: collection.name,
      description: collection.description,
      url: absoluteUrl(collection.path),
      inLanguage: "en-US",
      isPartOf: { "@id": SITE_ID },
      ...aboutOrg,
      mainEntity: {
        "@type": "ItemList",
        name: collection.name,
        itemListElement: (collection.items || []).map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          url: absoluteUrl(item.path),
        })),
      },
    });
  }

  if (crumbs?.length) {
    blocks.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((crumb, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: crumb.name,
        item: absoluteUrl(crumb.path),
      })),
    });
  }

  /* Escape hatch for a page shape this component does not model as a prop
     yet. Each entry is a complete schema block ("@type" included); the
     "@context" is added here so a caller never has to repeat it. */
  if (extra?.length) {
    extra.forEach((block) => {
      blocks.push({ "@context": "https://schema.org", ...block });
    });
  }

  if (!blocks.length) return null;

  return (
    <script
      type="application/ld+json"
      // Content is authored in this repo, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(blocks) }}
    />
  );
}
