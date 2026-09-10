/* ==========================================================================
   One-off page assembler.

   The site ships as plain static HTML with no build step - but the header and
   footer are identical on every page, so this script lifts them from an
   already-finished page (platform.html) and splices body fragments around
   them. Output is ordinary standalone HTML.

   Run:  node _build/assemble.js
   ========================================================================== */

const fs = require("fs");
const path = require("path");

const ROOT   = path.join(__dirname, "..", "site");
const BODIES = path.join(__dirname, "bodies");
const SOURCE = path.join(ROOT, "platform.html");

const source = fs.readFileSync(SOURCE, "utf8");

/* Pull the shared blocks out of the reference page ----------------------- */

const slice = (start, end, label) => {
  const a = source.indexOf(start);
  const b = source.indexOf(end, a);
  if (a === -1 || b === -1) { throw new Error("Could not locate " + label + " in platform.html"); }
  return source.slice(a, b + end.length);
};

const header = slice('<a class="skip-link"', "</header>", "header");
const footer = slice('<footer class="site-footer">', "</html>", "footer");

// The topbar sits inside the header block and changes per page.
// Structure is: div.topbar > div.container > span - so exactly two closing
// tags. Asking for a third makes this run past the topbar and match nothing.
const TOPBAR_RE = /<div class="topbar">[\s\S]*?<\/div>\s*<\/div>/;

/* Pages to build --------------------------------------------------------- */

const pages = [
  {
    file: "industries.html",
    title: "Industries - QuickTaxnBooks",
    description: "Built for tax preparers first, then the offices around them - bookkeeping, real estate, medical practices and freight brokers.",
    topbar: 'Tax practices are live today - <a href="contact.html">tell us which industry you want next</a>'
  },
  {
    file: "about.html",
    title: "About - QuickTaxnBooks",
    description: "An engineering team that builds and runs the operating layer for tax practices - configuration where it fits, custom software where it doesn't.",
    topbar: 'Based in Albany, New York - working with practices across all 50 states'
  },
  {
    file: "privacy.html",
    title: "Privacy Policy - QuickTaxnBooks",
    description: "How QuickTaxnBooks collects, uses and protects your information.",
    topbar: 'Questions about your data? <a href="contact.html">Contact us</a>'
  },
  {
    file: "terms.html",
    title: "Terms of Service - QuickTaxnBooks",
    description: "The terms that govern use of the QuickTaxnBooks website and platform.",
    topbar: 'Questions about these terms? <a href="contact.html">Contact us</a>'
  }
];

const FAVICON = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>" +
  "<rect width='32' height='32' rx='8' fill='%23070D18'/>" +
  "<path d='M9 21V11h5.4c2 0 3.3 1.1 3.3 2.8 0 1.2-.7 2-1.7 2.4 1.3.3 2.2 1.3 2.2 2.7 0 1.9-1.4 3.1-3.6 3.1H9Z' fill='%233DE0C6'/>" +
  "<path d='M20.5 21v-6.5h2.2V21h-2.2Z' fill='%237C6BFF'/></svg>";

const withTopbar = (page) => {
  if (!TOPBAR_RE.test(header)) {
    throw new Error("Topbar pattern did not match - every page would silently inherit platform.html's topbar.");
  }
  return header.replace(TOPBAR_RE,
`<div class="topbar">
  <div class="container topbar__inner">
    <span>${page.topbar}</span>
  </div>
</div>`);
};

const shell = (page, body) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${page.title}</title>
<meta name="description" content="${page.description}">
<link rel="canonical" href="https://www.quicktaxnbooks.com/${page.file}">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@600;700;800&family=JetBrains+Mono:wght@700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/styles.css">
<link rel="icon" href="${FAVICON}">
</head>
<body>

${withTopbar(page)}

<main id="main">
${body}
</main>

${footer}
`;

/* Build ------------------------------------------------------------------ */

let built = 0;

for (const page of pages) {
  const fragment = path.join(BODIES, page.file);

  if (!fs.existsSync(fragment)) {
    console.warn("  skip  " + page.file + "  (no body fragment)");
    continue;
  }

  const body = fs.readFileSync(fragment, "utf8");
  fs.writeFileSync(path.join(ROOT, page.file), shell(page, body), "utf8");
  console.log("  built " + page.file);
  built++;
}

console.log("\n" + built + " page(s) written to site/");
