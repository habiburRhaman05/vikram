/* TEMPORARY measurement harness - loaded only when the URL carries ?measure,
   and deleted once the hero pass is verified.

   Dumps, into a <pre id="measure"> at the end of <body>:
     - every hero section's title and lede with its rendered LINE COUNT
       (counted from the client rects of a Range over the element, which is
       what "how many lines does this actually take" means),
     - every CTA in that hero, whether it has an icon (a child <svg>) and how
       wide it renders against its own row.

   Read with: chrome --headless --dump-dom "<url>?measure" */
const out = [];

function lineCount(el) {
  const range = document.createRange();
  range.selectNodeContents(el);
  return new Set([...range.getClientRects()].map((r) => Math.round(r.top))).size;
}

function label(el, max = 58) {
  const text = (el.textContent || "").replace(/\s+/g, " ").trim();
  return text.length > max ? `${text.slice(0, max)}…` : text;
}

function run() {
  out.length = 0;
  out.push(`VIEWPORT ${window.innerWidth}x${window.innerHeight}`);

  const heroes = [...document.querySelectorAll("main *")].filter(
    (el) =>
      [...el.classList].some((c) => c.endsWith("-hero")) &&
      el.querySelector("h1") &&
      // innermost match only, so a wrapper and its inner block don't both count
      ![...el.children].some((child) => [...child.classList].some((c) => c.endsWith("-hero")) && child.querySelector("h1"))
  );

  if (!heroes.length) out.push("NO HERO FOUND");

  for (const hero of heroes) {
    out.push(`\nHERO .${[...hero.classList].filter((c) => c.endsWith("-hero")).join(".")}`);

    const title = hero.querySelector("h1");
    if (title) out.push(`  title ${lineCount(title)} lines, ${Math.round(title.getBoundingClientRect().width)}px  ${label(title)}`);

    const lede = hero.querySelector('[class*="lede"], [class*="sub"]');
    if (lede) out.push(`  lede  ${lineCount(lede)} lines, ${Math.round(lede.getBoundingClientRect().width)}px  ${label(lede)}`);

    const ctas = [...hero.querySelectorAll('a, button')].filter((el) =>
      [...el.classList].some((c) => c.includes("btn") || c.includes("cta"))
    );
    const row = ctas[0]?.parentElement;
    for (const cta of ctas) {
      out.push(
        `  cta "${label(cta, 28)}" icon=${cta.querySelector("svg") ? "yes" : "NO"} ` +
          `w=${Math.round(cta.getBoundingClientRect().width)} row=${row ? Math.round(row.getBoundingClientRect().width) : "?"} ` +
          `cls=${[...cta.classList].filter((c) => c.includes("btn") || c.includes("cta")).join(".") || "-"}`
      );
    }
  }

  let pre = document.getElementById("measure");
  if (!pre) {
    pre = document.createElement("pre");
    pre.id = "measure";
    pre.style.cssText = "position:fixed;left:0;bottom:0;z-index:9999;font:11px monospace;white-space:pre;";
    document.body.appendChild(pre);
  }
  pre.textContent = out.join("\n");
}

if (new URLSearchParams(window.location.search).has("measure")) {
  /* Re-measure as the app renders. A one-shot timer measures an empty #root:
     under --virtual-time-budget the timers are fast-forwarded while the dev
     server's modules are still arriving, so the first run always loses the
     race. Watching #root means the last write before the dump is the real
     page. The <pre> lives outside #root so this cannot feed itself. */
  let pending = 0;
  const go = () => {
    clearTimeout(pending);
    pending = setTimeout(run, 120);
  };
  const root = document.getElementById("root");
  if (root) new MutationObserver(go).observe(root, { childList: true, subtree: true });
  go();
  window.addEventListener("load", go);
  document.fonts?.ready?.then(go);
  const poll = setInterval(() => {
    run();
    if (!document.querySelector("main h1")) return;
    clearInterval(poll);
  }, 400);
}
