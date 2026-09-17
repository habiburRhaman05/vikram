/**
 * Generates public/sitemap.xml from the app's real route list.
 *
 * Kept as a script rather than a hand-written file so the sitemap can't
 * drift out of sync with the router the way the old canonical URLs did
 * (they still advertised pre-migration ".html" paths).
 *
 *   SITE_URL=https://www.ghlevelup.com node scripts/generate-sitemap.mjs
 *
 * THE BLOG IS READ FROM ITS OWN DATA, not from a second list kept here. A
 * post list copied into this file is a post list that goes stale the first
 * time somebody publishes without running the script; reading the posts
 * means a new article is in the sitemap the next time this runs, with
 * nothing to remember.
 *
 * It reads data/blog-posts.json DIRECTLY rather than going through
 * data/blog.js. That module imports the JSON the way the bundler wants it,
 * and Node's ESM loader refuses a JSON import without an import attribute,
 * so importing the access layer from here would fail. The script needs the
 * records and nothing else, so it reads the file and sorts by date the same
 * way that module does.
 *
 * WHAT IS DELIBERATELY NOT HERE
 *   /onboarding - disallowed in robots.txt and noIndex on the page.
 *   /services/<slug> placeholders - ServiceComingSoon sets noIndex, and a
 *     URL in a sitemap that asks not to be indexed is a contradiction.
 *   The 404 route.
 *   Indexing the excluded pages would be a bug; excluding an indexable one
 *     is the drift this script exists to prevent, so re-check this list
 *     against src/App.jsx whenever a route is added there.
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const postsFile = path.resolve(import.meta.dirname, "..", "src", "data", "blog-posts.json");
const { posts } = JSON.parse(await readFile(postsFile, "utf8"));
const sortedPosts = [...posts].sort((a, b) => String(b.date).localeCompare(String(a.date)));

const origin = (process.env.SITE_URL || "https://www.ghlevelup.com").replace(/\/$/, "");
const today = new Date().toISOString().slice(0, 10);

/** Mirrors the <Route> list in src/App.jsx (excluding the 404). */
const routes = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/services", priority: "0.9", changefreq: "monthly" },
  /* The service detail pages. Every one of these is a real <Route> in
     App.jsx; add the next one here as it ships, because a service page that
     is not in this list is a page nobody links to from search. */
  { path: "/services/ai-agents-chatbots", priority: "0.8", changefreq: "monthly" },
  { path: "/services/workflow-automation", priority: "0.8", changefreq: "monthly" },
  { path: "/services/api-tool-integrations", priority: "0.8", changefreq: "monthly" },
  { path: "/services/funnel-design-builds", priority: "0.8", changefreq: "monthly" },
  { path: "/services/gohighlevel-sub-accounts", priority: "0.8", changefreq: "monthly" },
  /* These three have real <Route>s in App.jsx but were missing from this
     list, which is exactly the drift the comment above warns about: a page
     that exists and is not in the sitemap is a page search has to find on
     its own. Filled in while adding the blog rather than left for later. */
  { path: "/services/websites-landing-pages", priority: "0.8", changefreq: "monthly" },
  { path: "/services/social-media-marketing", priority: "0.8", changefreq: "monthly" },
  { path: "/services/email-sms-campaigns", priority: "0.8", changefreq: "monthly" },
  /* Added later, and both missed by this list until now - same drift as the
     three above, caught the same way (by diffing the route list against what
     the file actually published). */
  { path: "/services/reporting-dashboards", priority: "0.8", changefreq: "monthly" },
  { path: "/services/crm-sub-account-setup", priority: "0.8", changefreq: "monthly" },
  { path: "/pricing", priority: "0.8", changefreq: "monthly" },

  /* /work and its case studies.

     The five slugs are MIRRORED from WORK_PROJECTS in src/data/work.jsx -
     the file the hub, the home page teaser and each detail page all read -
     because that module is .jsx and Node's ESM loader will not import it
     from here, and a regex over source is a worse contract than a list with
     a pointer. Add a project to WORK_PROJECTS and add its id here; the
     number of entries in this file is the one thing to keep level. */
  { path: "/work", priority: "0.7", changefreq: "monthly" },
  { path: "/work/clinic", priority: "0.6", changefreq: "yearly" },
  { path: "/work/home-services", priority: "0.6", changefreq: "yearly" },
  { path: "/work/real-estate", priority: "0.6", changefreq: "yearly" },
  { path: "/work/agency-reporting", priority: "0.6", changefreq: "yearly" },
  { path: "/work/retail-automation", priority: "0.6", changefreq: "yearly" },

  { path: "/industries", priority: "0.8", changefreq: "monthly" },
  { path: "/about", priority: "0.7", changefreq: "monthly" },
  { path: "/contact", priority: "0.8", changefreq: "monthly" },
  { path: "/book", priority: "0.9", changefreq: "monthly" },
  { path: "/privacy", priority: "0.3", changefreq: "yearly" },
  { path: "/terms", priority: "0.3", changefreq: "yearly" },
];

/* The blog index, then one entry per post, built from the posts themselves.
   A post list typed out here would be a post list that goes stale the first
   time somebody publishes without re-running this script. */
const blogRoutes = [
  { path: "/blog", priority: "0.8", changefreq: "weekly" },
  ...sortedPosts.map((post) => ({
    path: "/blog/" + post.slug,
    priority: "0.6",
    changefreq: "monthly",
    /* The post's own modified date rather than today's date: telling a
       crawler that every article changed every time this script runs is the
       quickest way to have lastmod ignored altogether. */
    lastmod: post.updated || post.date,
  })),
];

const allRoutes = [...routes, ...blogRoutes];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (r) => `  <url>
    <loc>${origin}${r.path === "/" ? "/" : r.path}</loc>
    <lastmod>${r.lastmod || today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

const out = path.resolve(import.meta.dirname, "..", "public", "sitemap.xml");
await writeFile(out, xml, "utf8");
console.log(`sitemap.xml written for ${origin} (${allRoutes.length} routes)`);
