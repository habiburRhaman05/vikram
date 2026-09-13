/**
 * Generates public/sitemap.xml from the app's real route list.
 *
 * Kept as a script rather than a hand-written file so the sitemap can't
 * drift out of sync with the router the way the old canonical URLs did
 * (they still advertised pre-migration ".html" paths).
 *
 *   SITE_URL=https://www.ghlevelup.com node scripts/generate-sitemap.mjs
 */
import { writeFile } from "node:fs/promises";
import path from "node:path";

const origin = (process.env.SITE_URL || "https://www.ghlevelup.com").replace(/\/$/, "");
const today = new Date().toISOString().slice(0, 10);

/** Mirrors the <Route> list in src/App.jsx (excluding the 404). */
const routes = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/platform", priority: "0.9", changefreq: "monthly" },
  { path: "/industries", priority: "0.8", changefreq: "monthly" },
  { path: "/about", priority: "0.7", changefreq: "monthly" },
  { path: "/contact", priority: "0.7", changefreq: "monthly" },
  { path: "/book", priority: "0.9", changefreq: "monthly" },
  { path: "/privacy", priority: "0.3", changefreq: "yearly" },
  { path: "/terms", priority: "0.3", changefreq: "yearly" },
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${origin}${r.path === "/" ? "/" : r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

const out = path.resolve(import.meta.dirname, "..", "public", "sitemap.xml");
await writeFile(out, xml, "utf8");
console.log(`sitemap.xml written for ${origin} (${routes.length} routes)`);
