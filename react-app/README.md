# GHLevelUp - React + Vite

A pixel-for-pixel migration of the static `site/` (plain HTML/CSS/JS) marketing
site to React + Vite. Same design, same CSS, same behaviour - just
componentized and routed as an SPA. See `../site/README.md` for the design
notes, GHL embed details and content decisions that still apply here
unchanged.

## Run it

```bash
npm install
npm run dev       # dev server, http://localhost:5173
npm run build      # production build -> dist/
npm run preview    # serve the production build locally
```

## What moved, and how

- **CSS** - `site/assets/css/styles.css` is copied verbatim into
  `src/legacy/styles.css` and imported once from `src/index.css`. Nothing in
  it was rewritten; visual output is byte-for-byte the same stylesheet.
- **JS behaviour** (`site/assets/js/main.js`) - reimplemented as hooks rather
  than global DOM queries: `useStickyHeader`, `useMobileNav`, `useReveal`
  (scroll-reveal), the FAQ accordion's open/close state, and the GHL
  embed height-floor guard. Same classes toggled (`.is-stuck`, `.is-open`,
  `.reveal.is-in`, etc.), so the CSS didn't need to change to keep working.
- **Routing** - `react-router-dom`, clean paths (`/platform`, not
  `/platform.html`). Every internal link was an `<a href="...">` in the
  original; those are now `<Link>`/`<NavLink>` via the shared `Button`
  component or router components directly.
- **Per-page `<title>`/meta** - rendered as JSX (`<PageMeta>` in each page),
  relying on React 19's native hoisting of `<title>`/`<meta>`/`<link>` into
  `<head>` - no react-helmet dependency needed.
- **GoHighLevel embeds** - `<GhlEmbed>` injects `form_embed.js` on mount and
  applies the same height-floor guard the original had. The booking
  calendar (Book) and contact form (Contact) both use it with their real
  embed IDs.
- **Not changed:** the real contact email/phone/address (`src/data/site.js`),
  and the canonical/`og:url` values (still point at the original domain) -
  see the note left in that file. The GHL contact form's own consent-text
  still says "QuickTaxnBooks" inside its iframe; that's GoHighLevel's hosted
  page, not reachable from this codebase (same limitation as the static
  site).

## Structure

```
src/
  assets/img/         Logo, favicon, footer logo - copied from site/assets/img
  legacy/styles.css    The original stylesheet, untouched
  components/
    common/            Button, Icon, Card, Section, Checklist, Spotlight,
                        Timeline, Plans, Faq, GhlEmbed, etc. - the shared
                        pieces that recur across pages
    layout/            Header, Footer, Layout (skip-link + <main> + both)
    sections/          Platform-only bespoke pieces (the call-flow diagram)
  pages/               One component per route, composed from the above
  data/                Content arrays per page (nav links, card copy, FAQ
                        items, the call-flow diagram's node positions, ...)
  hooks/               useStickyHeader, useMobileNav, useReveal, useFaqAccordion,
                        useScrollRestoration
```

## Tailwind / shadcn/ui

Both are installed and configured (`vite.config.js`, `components.json`,
`src/styles/tailwind.css`) but **not activated** - `src/styles/tailwind.css`
is not imported anywhere, so Tailwind's preflight reset never runs and
nothing here uses a Tailwind class today. This was intentional: turning it
on would reset default margins/spacing/typography across the app and break
the pixel-parity goal of this migration. When the team is ready to start
using Tailwind/shadcn components for new work, import
`src/styles/tailwind.css` from `main.jsx`.
