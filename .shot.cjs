const puppeteer = require("puppeteer-core");
const fs = require("fs");
const SP = "C:/Users/User/AppData/Local/Temp/claude/c--Users-User-Desktop-vikram-react-app/121b2a15-4846-47d2-afa4-e42855f868da/scratchpad/sd";
fs.mkdirSync(SP, { recursive: true });
const THIRD = /leadconnector|cloudflare|widgets\.|googletagmanager|google-analytics|clarity\.ms/;

const url = process.argv[2];
const name = process.argv[3];
const width = Number(process.argv[4] || 1440);

async function main() {
  const b = await puppeteer.launch({
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    headless: "new",
    args: ["--no-sandbox"],
  });
  const p = await b.newPage();
  const errs = [];
  await p.setRequestInterception(true);
  p.on("request", (r) => (THIRD.test(r.url()) ? r.abort().catch(() => {}) : r.continue().catch(() => {})));
  p.on("pageerror", (e) => errs.push("PAGEERROR " + e.message));
  p.on("console", (m) => {
    const t = m.text();
    if (m.type() === "error" && !/ERR_FAILED|ERR_ABORTED/.test(t)) errs.push("CONSOLE " + t.slice(0, 150));
  });

  await p.setViewport({ width, height: 900 });
  await p.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
  await p.waitForSelector(".sd-hero__title", { timeout: 15000 });

  /* Screenshot-harness concern, not a product one: the scroll-reveal
     animation is a one-shot IntersectionObserver, and a scripted scroll
     races its callbacks. Force the revealed state so the capture shows the
     finished page, and hide the third-party widget/cookie overlays. */
  await p.addStyleTag({
    content: `.reveal,.hv-reveal{opacity:1!important;transform:none!important}
              chat-widget,.cc,.lp{display:none!important}`,
  });
  await new Promise((r) => setTimeout(r, 500));

  await p.screenshot({ path: `${SP}/${name}.png`, fullPage: true });
  const h = await p.evaluate(() => document.body.scrollHeight);
  console.log(`${name}: ${width}px  height=${h}  ${errs.length ? "ERRORS: " + errs.join(" | ") : "no console errors"}`);
  await b.close();
}
main().catch((e) => { console.error(e); process.exit(1); });
