import { useEffect, useRef } from "react";

/**
 * Port of main.js's "1. Sticky header" behaviour: expose the header's real
 * rendered height as --header-h (the mobile dropdown positions itself
 * below the header using that variable) and toggle `.is-stuck` once the
 * page has scrolled past 8px, for the border/shadow transition in
 * styles.css.
 *
 * --header-h IS LOAD-BEARING, AND NOT ONLY FOR THE DROPDOWN. Every v2 hero
 * pulls itself up under the header by exactly this value (the shared rule
 * in styles/home-chrome.css), because the v2 header paints nothing at rest
 * - it is transparent so the hero's own wash runs up behind the logo. That
 * means anything the hero fails to cover shows the BODY background
 * instead, which is white. A --header-h that is a few pixels short of the
 * real header height therefore does not misplace a dropdown; it puts a
 * white strip across the top of the page.
 *
 * Which is why this measures more than once. The original only re-measured
 * on `resize`, so any change in header height after mount left the value
 * stale and short - and on a phone the header changes height after mount
 * routinely: the brand wordmark reflows when the display font finishes
 * loading, and the nav row can rewrap. A ResizeObserver catches every one
 * of those, whatever the cause, which is the point of using one rather
 * than trying to enumerate the triggers.
 */
export default function useStickyHeader() {
  const ref = useRef(null);

  useEffect(() => {
    const header = ref.current;
    if (!header) return;

    const setHeaderH = () => {
      /* getBoundingClientRect, rounded UP, rather than offsetHeight.
         offsetHeight is an integer, so a header that is genuinely 68.4px
         tall reports 68 - and that missing .4px is a hairline of white
         across the top of every v2 page, on exactly the displays (high
         DPR, phones) where fractional layout heights are normal. Rounding
         up overlaps by a fraction of a pixel instead, which is invisible:
         the hero simply reaches a touch further under a transparent bar. */
      const h = Math.ceil(header.getBoundingClientRect().height);
      document.documentElement.style.setProperty("--header-h", `${h}px`);
    };
    const onScroll = () => {
      header.classList.toggle("is-stuck", window.scrollY > 8);
    };

    setHeaderH();
    onScroll();

    /* Fires on mount and on every subsequent change to the header's box -
       font swap, nav rewrap, orientation change, a topbar being shown or
       hidden. Replaces the resize listener rather than joining it: every
       resize that changes the header's height triggers this too. */
    const ro = new ResizeObserver(setHeaderH);
    ro.observe(header);

    /* ResizeObserver covers the font swap on every browser that reflows
       the header when it happens. This is the belt to that braces, for the
       case where the swap changes metrics without changing the header's
       own box until something else forces a layout. Optional chaining
       because `document.fonts` is absent in some embedded webviews. */
    document.fonts?.ready?.then?.(setHeaderH);

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return ref;
}
