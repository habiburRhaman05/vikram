import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * The original site was plain multi-page HTML, where every navigation is
 * a full page load that starts at the top (or jumps straight to a
 * fragment, e.g. index.html#plans from the nav's "Plans" link). A client-
 * routed SPA doesn't do either automatically - this restores both.
 *
 * INSTANT, AND APPLIED BEFORE THE FIRST PAINT OF THE NEW ROUTE. Both of
 * those are load-bearing, and both exist because of what a *smooth* reset
 * to the top did to the sticky header.
 *
 * `html { scroll-behavior: smooth }` (styles.css) applies site-wide, and an
 * unqualified `window.scrollTo(0, 0)` inherits it. So a nav click from
 * halfway down a page did not land on the new page at the top - it
 * ANIMATED there, sliding the whole document up from the old page's offset
 * and past the header's 8px threshold. Three things happen on that one
 * glide, and all of them are visible:
 *
 *   - the header's glass fades out as .is-stuck is dropped, and its nav row
 *     animates back from 64px to its tall height - a 16px reflow of
 *     everything under the bar, because a sticky element is still in flow;
 *   - the 40px topbar scrolls back into view at the very end, which pushes
 *     the sticky bar down with it;
 *   - the document is scrolling past content the reader never asked to
 *     see, on a page that is only just being read for the first time.
 *
 * Net effect: the page arrived at the top and the header appeared to blink
 * and jump on the way in. With the reset applied instantly there is no
 * crossing to animate - the new route's first paint is already at the top,
 * with the bar in its at-rest state, which is also the state
 * useStickyHeader's own mount measurement expects to find.
 *
 * The hash case is instant for the same reason, and it matches the plain
 * HTML original: index.html#plans lands on #plans, it does not tour the
 * page on the way there. `html { scroll-padding-top: 96px }` still keeps
 * the fragment clear of the sticky bar.
 */

/**
 * Scroll once, with no animation, whatever the CSS says.
 *
 * `behavior: "instant"` is the direct way to ask for this, but it is a
 * recent addition to the ScrollBehavior enum and an engine that does not
 * recognise a keyword value falls back to the default - `auto`, which
 * means "use the CSS" and hands us straight back the smooth glide this
 * exists to avoid. So the smooth behaviour is switched off inline as well,
 * and put back once the scroll has been applied. The enum value is passed
 * anyway, so engines that do support it have it stated explicitly.
 */
function scrollWithNoAnimation(run) {
  const root = document.documentElement;
  root.style.scrollBehavior = "auto";
  run();
  /* Cleared on the next frame rather than in this same task: the used value
     of scroll-behavior is resolved lazily, and putting `smooth` back before
     the browser has committed the scroll can let the reset inherit it after
     all. Nothing else scrolls in that window.

     Removed rather than restored from a saved value, because two
     navigations in one frame would otherwise leave the LAST reset's `auto`
     inline on <html> for good - which is the site-wide smooth scrolling
     switched off, silently, long after this ran. Nothing else sets this
     property inline, so removing it always lands on the stylesheet rule. */
  requestAnimationFrame(() => {
    root.style.removeProperty("scroll-behavior");
  });
}

export default function useScrollRestoration() {
  const { pathname, hash } = useLocation();

  /* A layout effect, not an effect: this has to run in the same commit as
     the new route, before the browser paints it. A passive effect paints
     the new page at the old page's offset first, so the first frame shows
     the wrong part of the page - and with the header's own state keyed off
     the scroll offset, the wrong header with it. */
  useLayoutEffect(() => {
    scrollWithNoAnimation(() => {
      if (hash) {
        const el = document.getElementById(hash.slice(1));
        if (el) {
          el.scrollIntoView({ block: "start", behavior: "instant" });
          return;
        }
      }
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    });
  }, [pathname, hash]);
}
