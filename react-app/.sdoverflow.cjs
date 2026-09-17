const puppeteer = require("puppeteer-core");
const THIRD = /leadconnector|cloudflare|widgets\.|googletagmanager|google-analytics|clarity\.ms|fonts\./;
const URL = process.argv[2] || "http://localhost:5173/services/ai-agents-chatbots";
const W = Number(process.argv[3] || 390);

async function main() {
  const browser = await puppeteer.launch({
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    headless: "new",
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on("request", (r) => (THIRD.test(r.url()) ? r.abort().catch(() => {}) : r.continue().catch(() => {})));
  await page.setViewport({ width: W, height: 900 });
  await page.goto(URL, { waitUntil: "domcontentloaded" });
  await page.waitForSelector(".sd-hero__title");
  await page.evaluate(async () => {
    const h = document.body.scrollHeight;
    for (let y = 0; y < h; y += 700) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 55)); }
    window.scrollTo(0, 0);
  });
  await new Promise((r) => setTimeout(r, 500));

  const out = await page.evaluate(() => {
    const doc = document.documentElement;
    const base = doc.scrollWidth;
    const vw = doc.clientWidth;
    if (base <= vw) return { vw, base, culprits: [], note: "no overflow" };

    // Hide one top-level section at a time; whichever hide drops scrollWidth
    // is the section that owns the overflow. Catches pseudo-elements too,
    // which getBoundingClientRect() on real nodes cannot see.
    const sections = [...document.querySelectorAll("main > *, main > * > *")];
    const culprits = [];
    for (const el of sections) {
      const prev = el.style.display;
      el.style.display = "none";
      const after = doc.scrollWidth;
      el.style.display = prev;
      if (after < base) {
        culprits.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.className || "").toString().slice(0, 60),
          drop: base - after,
        });
      }
    }
    return { vw, base, culprits };
  });

  console.log(`url=${URL}`);
  console.log(`viewport=${out.vw} scrollWidth=${out.base}`);
  if (!out.culprits?.length) console.log(out.note || "no single section owns it");
  out.culprits?.forEach((c) => console.log("  " + JSON.stringify(c)));
  await browser.close();
}
main().catch((e) => { console.error(e); process.exit(1); });
