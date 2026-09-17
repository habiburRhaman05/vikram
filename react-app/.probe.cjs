/**
 * Verification probe for the blog design pass.
 * Drives the running dev server (5173) in headless Chrome and reports what
 * the browser actually resolved, not what the source hopes it said.
 */
const puppeteer = require("puppeteer-core");

const BASE = "http://127.0.0.1:5173";
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: "new",
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });

  const errors = [];
  const page = await browser.newPage();
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  page.on("pageerror", (e) => errors.push("pageerror: " + e.message));

  await page.setViewport({ width: 1440, height: 900 });

  // ---------------------------------------------------------------- listing
  await page.goto(BASE + "/blog", { waitUntil: "networkidle2" });
  await page.waitForSelector(".bl-card");

  const listing = await page.evaluate(() => {
    const grid = document.querySelector(".bl-grid");
    const cards = [...document.querySelectorAll(".bl-card")];
    const chip = document.querySelector(".bl-filter");
    const pressed = document.querySelector('.bl-filter[aria-pressed="true"]');
    const hero = document.querySelector(".bl-hero");
    const title = document.querySelector(".bl-hero__title");
    return {
      gridTracks: grid
        ? getComputedStyle(grid).gridTemplateColumns.split(" ").filter(Boolean).length
        : 0,
      gridGap: grid ? getComputedStyle(grid).gap : null,
      cards: cards.length,
      cardShadow: cards[0] ? getComputedStyle(cards[0]).boxShadow.slice(0, 60) : null,
      cardRadius: cards[0] ? getComputedStyle(cards[0]).borderRadius : null,
      chips: document.querySelectorAll(".bl-filter").length,
      chipShadow: chip ? getComputedStyle(chip).boxShadow.slice(0, 50) : null,
      pressedShadow: pressed ? getComputedStyle(pressed).boxShadow.slice(0, 90) : null,
      heroTextAlign: hero ? getComputedStyle(hero).textAlign : null,
      titleLeft: title ? Math.round(title.getBoundingClientRect().left) : null,
      heroCrumbsLeft: (() => {
        const c = document.querySelector(".bl-hero__crumbs");
        return c ? Math.round(c.getBoundingClientRect().left) : null;
      })(),
      heroCrumbsWidth: (() => {
        const c = document.querySelector(".bl-hero__crumbs");
        return c ? Math.round(c.getBoundingClientRect().width) : null;
      })(),
      titleWidth: title ? Math.round(title.getBoundingClientRect().width) : null,
      cardLinks: cards.map((c) => c.querySelector("a")?.getAttribute("href")).filter(Boolean),
    };
  });

  console.log("=== /blog ===");
  console.log(JSON.stringify(listing, null, 2));

  // does the filter still work
  const filterTest = await page.evaluate(async () => {
    const chips = [...document.querySelectorAll(".bl-filter")];
    const out = [];
    for (const chip of chips) {
      chip.click();
      await new Promise((r) => setTimeout(r, 60));
      out.push({
        chip: chip.textContent.trim(),
        cards: document.querySelectorAll(".bl-card").length,
        tracks: getComputedStyle(document.querySelector(".bl-grid") || document.body)
          .gridTemplateColumns.split(" ").filter(Boolean).length,
      });
    }
    chips[0].click();
    return out;
  });
  console.log("filter:", JSON.stringify(filterTest));

  // ------------------------------------------------------------ article page
  const slugs = await page.evaluate(() =>
    [...document.querySelectorAll(".bl-card__link")].map((a) => a.getAttribute("href"))
  );

  console.log("\n=== article pages ===");
  for (const href of slugs) {
    await page.goto(BASE + href, { waitUntil: "networkidle2" });
    await page.waitForSelector(".bl-prose");

    const a = await page.evaluate(() => {
      const rect = (sel) => {
        const el = document.querySelector(sel);
        return el ? el.getBoundingClientRect() : null;
      };
      const css = (sel, prop) => {
        const el = document.querySelector(sel);
        return el ? getComputedStyle(el)[prop] : null;
      };
      const header = rect(".bl-post__header");
      const prose = rect(".bl-prose");
      const fig = rect(".bl-post__figure");
      const inner = document.querySelector(".bl-hero__inner");

      return {
        url: location.pathname,
        headerLeft: header ? Math.round(header.left) : null,
        headerRight: header ? Math.round(header.right) : null,
        proseLeft: prose ? Math.round(prose.left) : null,
        proseRight: prose ? Math.round(prose.right) : null,
        figureLeft: fig ? Math.round(fig.left) : null,
        headerMaxWidth: css(".bl-post__header", "maxWidth"),
        heroAlignItems: inner ? getComputedStyle(inner).alignItems : null,
        titleTextAlign: css(".bl-post__title", "textAlign"),

        progress: !!document.querySelector(".bl-progress"),
        progressZ: css(".bl-progress", "zIndex"),
        progressFill: css(".bl-progress__fill", "transform"),

        metaItems: [...document.querySelectorAll(".bl-post__meta span")].map((s) =>
          s.textContent.trim()
        ),

        dropCap: (() => {
          const lead = document.querySelector(".bl-prose .bl-lead");
          if (!lead) return null;
          const s = getComputedStyle(lead, "::first-letter");
          return { float: s.float, fontSize: s.fontSize, color: s.color };
        })(),

        tags: [...document.querySelectorAll(".bl-tags li")].map((li) => li.textContent.trim()),
        neighbours: [...document.querySelectorAll(".bl-next__item")].map((el) => ({
          href: el.getAttribute("href"),
          label: el.querySelector(".bl-next__dir").textContent.trim(),
        })),
        related: document.querySelectorAll(".bl-related .bl-card").length,
        matched: document.querySelectorAll(".bl-svc__card").length,
        tocCount: document.querySelectorAll(".bl-toc__link").length,
        jsonLd: [...document.querySelectorAll('script[type="application/ld+json"]')].length,
        h1: document.querySelector("h1")?.textContent?.slice(0, 60),
        bodyOverflow:
          document.documentElement.scrollWidth - document.documentElement.clientWidth,
      };
    });

    // scroll halfway and read the progress bar
    await page.evaluate(() => {
      const art = document.querySelector(".bl-prose")?.closest("article");
      if (!art) return;
      const top = window.scrollY + art.getBoundingClientRect().top;
      window.scrollTo(0, top + (art.offsetHeight - window.innerHeight) * 0.5);
    });
    await sleep(350);
    const mid = await page.evaluate(
      () => getComputedStyle(document.querySelector(".bl-progress__fill")).transform
    );

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await sleep(350);
    const end = await page.evaluate(
      () => getComputedStyle(document.querySelector(".bl-progress__fill")).transform
    );
    const overHeader = await page.evaluate(() => {
      const bar = document.querySelector(".bl-progress");
      const r = bar.getBoundingClientRect();
      const el = document.elementFromPoint(window.innerWidth / 2, r.top + 1);
      return el ? el.className || el.tagName : null;
    });

    console.log(JSON.stringify({ ...a, progressMid: mid, progressEnd: end, barOnTop: overHeader }, null, 2));
  }

  // ----------------------------------------------------------------- mobile
  console.log("\n=== mobile 390 ===");
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto(BASE + "/blog", { waitUntil: "networkidle2" });
  await page.waitForSelector(".bl-card");
  const mList = await page.evaluate(() => ({
    tracks: document
      .querySelector(".bl-grid")
      .getAttribute("style") ? null : getComputedStyle(document.querySelector(".bl-grid")).gridTemplateColumns.split(" ").filter(Boolean).length,
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    cardWidth: Math.round(document.querySelector(".bl-card").getBoundingClientRect().width),
  }));
  console.log("listing:", JSON.stringify(mList));

  await page.goto(BASE + slugs[0], { waitUntil: "networkidle2" });
  await page.waitForSelector(".bl-prose");
  const mPost = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    headerLeft: Math.round(document.querySelector(".bl-post__header").getBoundingClientRect().left),
    proseLeft: Math.round(document.querySelector(".bl-prose").getBoundingClientRect().left),
    subtitleLeft: Math.round(document.querySelector(".bl-post__title").getBoundingClientRect().left),
    tocToggleText: document.querySelector(".bl-toc__toggle")?.textContent?.trim(),
    tocListVisible: getComputedStyle(document.querySelector(".bl-toc__list")).display,
    dropCap: (() => {
      const l = document.querySelector(".bl-prose .bl-lead");
      return l ? getComputedStyle(l, "::first-letter").float : null;
    })(),
    nextCols: getComputedStyle(document.querySelector(".bl-next")).gridTemplateColumns,
    tagsVisible: document.querySelectorAll(".bl-tags li").length,
    progressRight: Math.round(document.querySelector(".bl-progress").getBoundingClientRect().right),
  }));
  console.log("post:", JSON.stringify(mPost, null, 2));

  console.log("\nconsole errors:", errors.length ? errors : "none");
  await browser.close();
})().catch((e) => {
  console.error("PROBE FAILED:", e.message);
  process.exit(1);
});
