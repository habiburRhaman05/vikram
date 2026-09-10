/* Static sanity checks over the built site. Run: node _build/check.js */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "site");
const pages = fs.readdirSync(ROOT).filter(f => f.endsWith(".html"));

let problems = 0;
const fail = (page, msg) => { console.log("  FAIL  [" + page + "] " + msg); problems++; };

for (const page of pages) {
  const html = fs.readFileSync(path.join(ROOT, page), "utf8");

  /* Structure ---------------------------------------------------------- */
  for (const tag of ["<html", "</html>", "<body>", "</body>", "<main", "</main>", "</header>", "</footer>"]) {
    if (!html.includes(tag)) { fail(page, "missing " + tag); }
  }

  const opens  = (html.match(/<div\b/g)  || []).length;
  const closes = (html.match(/<\/div>/g) || []).length;
  if (opens !== closes) { fail(page, "div imbalance: " + opens + " open vs " + closes + " close"); }

  const titles = (html.match(/<title>/g) || []).length;
  if (titles !== 1) { fail(page, "expected 1 <title>, found " + titles); }

  /* Internal links ------------------------------------------------------ */
  const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map(m => m[1]);
  for (const href of hrefs) {
    if (/^(https?:|mailto:|tel:|data:|#)/.test(href)) { continue; }
    const file = href.split("#")[0];
    if (!file) { continue; }
    if (!fs.existsSync(path.join(ROOT, file))) { fail(page, "broken link -> " + href); }
  }

  /* Local assets -------------------------------------------------------- */
  for (const src of [...html.matchAll(/(?:src|href)="(assets\/[^"]+)"/g)].map(m => m[1])) {
    if (!fs.existsSync(path.join(ROOT, src))) { fail(page, "missing asset -> " + src); }
  }

  /* Accordion wiring ---------------------------------------------------- */
  for (const id of [...html.matchAll(/aria-controls="([^"]+)"/g)].map(m => m[1])) {
    if (!html.includes('id="' + id + '"')) { fail(page, "aria-controls target not found: " + id); }
  }

  /* Accessibility ------------------------------------------------------- */
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) { fail(page, "expected 1 <h1>, found " + h1s); }

  for (const frame of html.match(/<iframe[\s\S]*?>/g) || []) {
    if (!/title=/.test(frame)) { fail(page, "iframe without title attribute"); }
  }
}

console.log("\nChecked " + pages.length + " pages: " + pages.join(", "));
console.log(problems === 0 ? "All checks passed." : problems + " problem(s) found.");
process.exit(problems === 0 ? 0 : 1);
