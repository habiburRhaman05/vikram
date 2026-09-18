const puppeteer = require("puppeteer-core");
const fs = require("fs");
const SHOTS = "C:/Users/User/AppData/Local/Temp/claude/c--Users-User-Desktop-vikram-react-app/121b2a15-4846-47d2-afa4-e42855f868da/scratchpad/sd";
fs.mkdirSync(SHOTS, { recursive: true });

const PAGES = [
  ["ai-agents-chatbots", "ai"],
  ["workflow-automation", "flow"],
  ["api-tool-integrations", "api"],
  ["funnel-design-builds", "funnel"],
  ["gohighlevel-sub-accounts", "ghl"],
  ["websites-landing-pages", "web"],
];

const THIRD_PARTY = /leadconnector|cloudflare|widgets\.|googletagmanager|google-analytics|clarity\.ms|fonts\.gstatic|fonts\.googleapis/;

async function run(browser, slug, name) {
  const page = await browser.newPage();
  const errs = [];

  await page.setRequestInterception(true);
  page.on("request", (r) => {
    if (THIRD_PARTY.test(r.url())) return r.abort().catch(() => {});
    r.continue().catch(() => {});
  });
  page.on("pageerror", (e) => errs.push("PAGEERROR " + e.message));
  page.on("console", (m) => { if (m.type() === "error") errs.push("CONSOLE " + m.text().slice(0, 150)); });

  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`http://localhost:5173/services/${slug}`, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForSelector(".sd-hero__title", { timeout: 15000 });

  // Fire every scroll-reveal, then come back to the top.
  await page.evaluate(async () => {
    const h = document.body.scrollHeight;
    for (let y = 0; y < h; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 70)); }
    window.scrollTo(0, 0);
  });
  await new Promise((r) => setTimeout(r, 600));

  const d = await page.evaluate(() => {
    const doc = document.documentElement;
    const q = (s) => document.querySelector(s);
    const r = (el) => (el ? el.getBoundingClientRect() : null);
    const faqInner = q(".sd-faq__inner");
    const card = q(".sd-contact-card");
    const faqCol = faqInner ? faqInner.firstElementChild : null;
    const cb = r(card), fb = r(faqCol);
    const rel = [...document.querySelectorAll(".sd-rel__card")];
    return {
      overflow: doc.scrollWidth > doc.clientWidth ? `${doc.scrollWidth}>${doc.clientWidth}` : "none",
      h1w: Math.round(r(q(".sd-hero__title"))?.width || 0),
      ledew: Math.round(r(q(".sd-hero__lede"))?.width || 0),
      chips: document.querySelectorAll(".sd-hero__chips,.sd-hero__chip").length,
      relCards: rel.length,
      relHrefs: rel.map((a) => a.getAttribute("href")),
      faqDelta: cb && fb ? Math.round(cb.bottom - fb.bottom) : null,
      sections: document.querySelectorAll(".hv-section, .sd-hero").length,
    };
  });

  console.log(`\n=== ${slug}`);
  console.log(` overflow:${d.overflow} h1w:${d.h1w} ledew:${d.ledew} chips:${d.chips} rel:${d.relCards} sections:${d.sections}`);
  console.log(` faq bottom delta: ${d.faqDelta}px`);
  console.log(` rel: ${d.relHrefs.join(" | ")}`);

  await page.screenshot({ path: `${SHOTS}/${name}-desktop.png`, fullPage: true });
  await page.screenshot({ path: `${SHOTS}/${name}-hero.png`, clip: { x: 0, y: 0, width: 1440, height: 640 } });

  await page.setViewport({ width: 390, height: 844 });
  await new Promise((r) => setTimeout(r, 700));
  const m = await page.evaluate(() => {
    const doc = document.documentElement;
    return doc.scrollWidth > doc.clientWidth ? `${doc.scrollWidth}>${doc.clientWidth}` : "none";
  });
  console.log(` mobile overflow: ${m}`);
  await page.screenshot({ path: `${SHOTS}/${name}-mobile.png`, fullPage: true });

  if (errs.length) { console.log(" ERRORS:"); errs.slice(0, 5).forEach((e) => console.log("   " + e)); }
  else console.log(" no console/page errors");

  await page.close();
  return { overflow: d.overflow !== "none" || m !== "none", errs: errs.length, faqDelta: d.faqDelta, rel: d.relCards, chips: d.chips };
}

async function main() {
  const browser = await puppeteer.launch({
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    headless: "new",
    args: ["--no-sandbox"],
  });
  const results = [];
  for (const [slug, name] of PAGES) {
    try { results.push([slug, await run(browser, slug, name)]); }
    catch (e) { console.log(`\n=== ${slug}\n FAILED: ${e.message}`); results.push([slug, { fatal: true }]); }
  }
  await browser.close();

  console.log("\n---- SUMMARY ----");
  for (const [slug, r] of results) {
    if (r.fatal) { console.log(`${slug}: FATAL`); continue; }
    console.log(`${slug}: overflow=${r.overflow} errors=${r.errs} faqDelta=${r.faqDelta} rel=${r.rel} chips=${r.chips}`);
  }
}
main().catch((e) => { console.error(e); process.exit(1); });
