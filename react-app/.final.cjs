const puppeteer = require("puppeteer-core");
const THIRD = /leadconnector|cloudflare|widgets\.|googletagmanager|google-analytics|clarity\.ms/;

const SLUGS = [
  "ai-agents-chatbots", "workflow-automation", "api-tool-integrations",
  "funnel-design-builds", "gohighlevel-sub-accounts", "websites-landing-pages",
];

async function check(browser, slug) {
  const p = await browser.newPage();
  const errs = [];
  await p.setRequestInterception(true);
  p.on("request", (r) => (THIRD.test(r.url()) ? r.abort().catch(() => {}) : r.continue().catch(() => {})));
  p.on("pageerror", (e) => errs.push("PAGEERROR " + e.message));
  p.on("console", (m) => {
    const t = m.text();
    if (m.type() === "error" && !/ERR_FAILED|ERR_ABORTED/.test(t)) errs.push("CONSOLE " + t.slice(0, 120));
  });

  await p.setViewport({ width: 1440, height: 900 });
  await p.goto(`http://localhost:5173/services/${slug}`, { waitUntil: "domcontentloaded", timeout: 30000 });
  await p.waitForSelector(".sd-hero__title", { timeout: 15000 });
  await p.addStyleTag({ content: ".reveal,.hv-reveal{opacity:1!important;transform:none!important}chat-widget,.cc,.lp{display:none!important}" });
  await new Promise((r) => setTimeout(r, 400));

  const d = await p.evaluate(() => {
    const doc = document.documentElement;
    const card = document.querySelector(".sd-contact-card");
    const faqCol = document.querySelector(".sd-faq__inner")?.firstElementChild;
    const rel = [...document.querySelectorAll(".sd-rel__card")].map((a) => a.getAttribute("href"));
    // every internal link on the page, to catch a typo'd route
    const internal = [...document.querySelectorAll('a[href^="/"]')].map((a) => a.getAttribute("href"));
    return {
      sections: document.querySelectorAll(".hv-section, .sd-hero, .sd-form-sec").length,
      chips: document.querySelectorAll(".sd-hero__chips, .sd-hero__chip").length,
      form: !!document.querySelector(".sd-form-sec form"),
      formService: document.querySelector(".sd-form__card-head strong")?.textContent || null,
      rel,
      relOk: rel.length === 3 && rel.every((h) => h && h.startsWith("/services/")),
      faqDelta: card && faqCol ? Math.round(card.getBoundingClientRect().bottom - faqCol.getBoundingClientRect().bottom) : null,
      overflow1440: doc.scrollWidth > doc.clientWidth,
      internal: [...new Set(internal)],
      h: document.body.scrollHeight,
    };
  });

  await p.setViewport({ width: 390, height: 844 });
  await new Promise((r) => setTimeout(r, 400));
  d.overflow390 = await p.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  d.errs = errs;
  await p.close();
  return d;
}

async function main() {
  const b = await puppeteer.launch({
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    headless: "new", args: ["--no-sandbox"],
  });

  const KNOWN = new Set([
    "/", "/services", "/industries", "/about", "/contact", "/book", "/privacy", "/terms", "/onboarding",
    ...SLUGS.map((s) => "/services/" + s),
  ]);

  let bad = 0;
  const allLinks = new Set();
  for (const slug of SLUGS) {
    const d = await check(b, slug);
    d.internal.forEach((l) => allLinks.add(l));
    const issues = [];
    if (d.sections < 8) issues.push(`only ${d.sections} sections`);
    if (d.chips !== 0) issues.push("hero chips still present");
    if (!d.form) issues.push("no enquiry form");
    if (!d.relOk) issues.push("related links bad: " + JSON.stringify(d.rel));
    if (d.faqDelta === null || Math.abs(d.faqDelta) > 2) issues.push("faq delta " + d.faqDelta);
    if (d.overflow1440) issues.push("overflow @1440");
    if (d.overflow390) issues.push("overflow @390");
    if (d.errs.length) issues.push("errors: " + d.errs.join(" | "));
    if (issues.length) bad++;
    console.log(`${issues.length ? "FAIL" : "ok  "} ${slug.padEnd(26)} sections=${String(d.sections).padStart(2)} chips=${d.chips} form=${d.form ? "Y" : "N"} rel=${d.rel.length} faqΔ=${d.faqDelta} h=${d.h}`);
    if (d.formService) console.log(`       form is for: "${d.formService}"`);
    issues.forEach((i) => console.log("       - " + i));
  }

  const unknown = [...allLinks].filter((l) => !KNOWN.has(l.split("#")[0]) && !l.startsWith("/#") && l !== "");
  console.log("\ninternal links seen:", [...allLinks].length);
  console.log(unknown.length ? "UNKNOWN ROUTES: " + unknown.join(", ") : "every internal link points at a real route");
  console.log(bad ? `\n${bad} page(s) with issues` : "\nALL 6 PAGES CLEAN");
  await b.close();
}
main().catch((e) => { console.error(e); process.exit(1); });
