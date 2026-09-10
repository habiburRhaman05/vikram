# QuickTaxnBooks - agency website

Marketing site for Vikram's agency: the platform sold **to tax preparers**
(Build A in the GHL Prime brief), positioned against `taxoffice.ai` with
`expertly.com` as the brand bar.

Plain static HTML/CSS/JS. No build step, no dependencies, no framework -
so it can be hosted anywhere or pasted straight into GoHighLevel.

---

## Run it

Open `site/index.html` in a browser, or serve the folder:

```bash
cd site
npx serve .          # or: python -m http.server 8000
```

---

## Structure

```
site/
  index.html          Home - hero, problem, platform, spotlights, plans, FAQ
  platform.html       Feature deep-dive (#reception #inbox #portal #workflow #billing)
  industries.html     Tax now; bookkeeping / real estate / medical / freight next
  about.html          Positioning, principles, capability, Albany office
  book.html           Booking calendar  ← GHL embed (live)
  contact.html        Contact form      ← GHL embed (live)
  privacy.html        DRAFT - needs legal review
  terms.html          DRAFT - needs legal review
  assets/css/styles.css
  assets/js/main.js

_build/
  assemble.js         Generates industries/about/privacy/terms from shared header+footer
  bodies/*.html       Body fragments for those four pages
  check.js            Link / structure / a11y checks
```

`index.html`, `platform.html`, `book.html` and `contact.html` are hand-written
standalone files. The other four are generated:

```bash
node _build/assemble.js   # rebuild generated pages
node _build/check.js      # validate all 8 pages
```

`assemble.js` lifts the header and footer out of `platform.html`, so **edit the
header or footer there**, then re-run it to propagate the change. The four
hand-written pages need that edit applied manually.

---

## GoHighLevel embeds

### Wired in already

| What | Where | ID |
|---|---|---|
| Booking calendar | `book.html` | `Ki6u232MpHqSA4f6s49T` |
| Contact form | `contact.html` | `MYWMUZ9ldCVSt15rqxxL` |

**Two changes were made to the contact-form snippet.** GHL ships it with
`height:100%`, which resolves to zero in normal page flow - the form would
render as an invisible strip. The iframe now carries an explicit height
instead.

That height is `660px`, not the `1040px` from the snippet's own
`data-height` attribute. `1040` is a generic worst-case value GHL reports for
that form, not its actual size at this column width - using it left a large
blank gap below the Submit button. `660px` is sized to what this form
actually renders (name, phone, email, two consent checkboxes, submit).
`form_embed.js` can still grow the iframe via postMessage if a validation
message needs more room; it just no longer starts oversized. If you re-paste
the snippet, keep the height at `660px` (or remeasure it if the form's
fields change) rather than reverting to `data-height`.

`.ghl-embed--calendar` carries a `min-height` floor for the same
0-height-flash reason, and `.ghl-embed--form` carries a much lower one
(`420px`) than before - it's a guard against a blank flash before the
explicit height above applies, not a size to grow into.

### Still to paste - chat widget

Every page has this slot just above `</body>`:

```html
<!-- GHL EMBED SLOT - CHAT WIDGET -->
<!-- PASTE GHL CHAT WIDGET CODE HERE -->
```

Paste the snippet into **all 8 pages** (it's a per-page script tag, not shared).
For the four generated pages, paste it into `platform.html`'s footer block and
re-run `assemble.js` instead.

---

## Logo

`assets/img/logo.png` (the icon + "QuickTaxnBooks" wordmark lockup) replaced
the CSS-drawn icon and text that shipped in the first build. It's used as-is
in the header, which sits on a light background.

The wordmark text is dark navy, which would disappear against the dark
footer. Rather than recolor the artwork, the footer sits the logo on a small
white rounded plate (`.brand__logo-plate`) - the same card language used
elsewhere on the site. If a dedicated light/white version of the logo shows
up later, that plate can be dropped and the logo used directly in both
places.

Sizing lives in `.brand__logo` in `styles.css` (`height: 38px` header,
`34px` footer) - width follows automatically since the file is a fixed 3:1
aspect ratio.

---

## Content decisions worth knowing

**No prices anywhere.** The brief states pricing is Niya's and carries no
numbers, so all three plan tiers read "Talk to us" and route to the demo
booking. Feature differentiation between tiers is real; the numbers are not
invented. Drop them in when they're set - `index.html`, `.plan__price`.

**No fabricated metrics.** Stats are descriptive facts (`24/7`, `EN/ES`, `1`
inbox, unlimited seats), not invented performance claims like "3x more leads".
Nothing on the site asserts a result we can't stand behind.

**The AI receptionist is unnamed.** taxoffice.ai calls theirs "Jasmine"; the
brief says don't copy. Naming it is a branding decision - the copy reads fine
either way, and it's a find-and-replace when you decide.

**All copy is original.** Written against the reference sites' structure, not
their wording.

**Real details used:** Albany office (292 Washington Ave Ext, Ste 110, NY
12203), (518) 250-9662, TaxPrep@QuickTaxnBooks.Com - from the existing
quicktaxnbooks.com site.

---

## Before launch

- [ ] Paste the chat-widget snippet into all 8 pages
- [ ] Legal review of `privacy.html` and `terms.html` (both carry a visible draft banner - remove it once reviewed)
- [ ] Confirm office hours (currently Mon–Fri 9am–6pm ET) and the phone/email as the agency-facing contacts
- [ ] Decide whether to name the AI receptionist
- [ ] Add real pricing to the three plan tiers, or leave as "Talk to us"
- [ ] Replace `og:` URLs if the site lands on a different domain
- [ ] Add an OG share image (`og:image`) - none is set yet

---

## Design notes

Navy + aqua/violet, deliberately not the generic SaaS blue that taxoffice.ai
uses. Type is Plus Jakarta Sans (headings) + Inter (body) via Google Fonts.
No stock photography - all visuals are CSS and inline SVG, so there are no
broken images and nothing to license.

Fully responsive at 1080 / 900 / 640 breakpoints. Reduced-motion respected,
skip-link present, one `<h1>` per page, all iframes titled, focus states
visible.
