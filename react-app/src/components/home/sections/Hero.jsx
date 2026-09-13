import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/common/Icon.jsx";
import { HERO } from "@/data/homeV2";

/**
 * One avatar in the hero's review cluster.
 *
 * The photo is preferred; if it is missing (or fails to load - a bad path,
 * an asset that has not been supplied yet) the element falls back to the
 * person's initial on the same 40px circle. That means the cluster can
 * never render a broken-image icon and never changes size, whether or not
 * the photographs are in place.
 *
 * `alt=""` and the aria-hidden list above it are deliberate: these are
 * stock portraits of people who did not say anything, so they are
 * decoration, not content.
 */
function Face({ face }) {
  const [failed, setFailed] = useState(false);

  if (!face.image || failed) return <>{face.name.slice(0, 1)}</>;

  return (
    <picture>
      {face.imageWebp && <source type="image/webp" srcSet={face.imageWebp} />}
      <img
        src={face.image}
        alt=""
        width={40}
        height={40}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
      />
    </picture>
  );
}

/* Reel geometry. VISIBLE rows fill the window; the ACTIVE_SLOT-th of them
   is the one that is lit, always - it is a property of the POSITION, not
   of the item sitting in it. PRE is how many rows sit above that slot, and
   is also how far into the list the track starts, so those rows are filled
   with real items from the first frame instead of being blank. */
const VISIBLE = 7;
const ACTIVE_SLOT = 4;
const PRE = ACTIVE_SLOT - 1;
/** Hold on each item, then the slide to the next. */
const DWELL = 1000;
/* Slower than a snap, and eased like the rest of the site's motion
   (--hv-ease) rather than a generic curve, so the slide reads as part of
   the same design language instead of a bolted-on widget. */
const SLIDE = 520;

/**
 * Hero: copy on the left, an endlessly scrolling capability reel on the
 * right, on a dark teal field.
 *
 * The reel runs bottom to top forever: it holds an item in the centre slot
 * for DWELL, slides up exactly one row in SLIDE, and repeats.
 *
 * THE HIGHLIGHT BELONGS TO THE SLOT, NOT THE ITEM. One step counter drives
 * both the track's offset and which element gets .is-active, so the lit row
 * is always the 4th of the 7 on screen - it cannot drift out of position,
 * because there is nothing to drift against. An earlier version staggered a
 * CSS animation per item to fake this; it put the highlight on the wrong
 * row and there was no way to keep it pinned.
 *
 * The list is rendered twice. The track starts PRE rows in (so the rows
 * above the active slot are never blank) and runs one full list-length,
 * at which point the duplicate set sits exactly where the original did -
 * an identical frame, so the counter resets there with the transition
 * switched off and the loop is invisible. No empty space, ever, at either
 * end.
 *
 * The reel is decorative in the accessibility sense - every item here is
 * also a heading further down the page - so it is aria-hidden, and the
 * duplicate set costs a screen reader nothing.
 */
export default function Hero() {
  const items = HERO.marquee;
  const N = items.length;
  /* Rendered twice: the window needs rows PRE+step .. PRE+step+VISIBLE at
     the last step, which reaches into the second copy. */
  const reel = [...items, ...items];

  /* step counts 0..N. At step N the frame is pixel-identical to step 0. */
  const [step, setStep] = useState(0);
  const [snapping, setSnapping] = useState(false);
  /* Hover-pause is STATE, not a ref, and it is a dependency of the effect
     below. As a ref it deadlocked the reel: the pending timeout fired
     while paused, advanced nothing, and was never replaced, so the loop
     stopped permanently - and since the pointer often rests over the reel
     column, that read as "the marquee never runs". As state, leaving the
     reel re-runs the effect and schedules the next step. */
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (paused) return;

    if (step === N) {
      /* Landed on the duplicate. Jump back to the equivalent real row with
         the transition off - same pixels, so nothing is seen. */
      setSnapping(true);
      const id = requestAnimationFrame(() => setStep(0));
      return () => cancelAnimationFrame(id);
    }
    if (snapping) {
      const id = requestAnimationFrame(() => setSnapping(false));
      return () => cancelAnimationFrame(id);
    }
    const id = setTimeout(() => setStep((s) => s + 1), DWELL);
    return () => clearTimeout(id);
  }, [step, snapping, N, paused]);

  /* Slot 1 of the window holds row PRE+step, so the ACTIVE_SLOT-th row is
     PRE+step+PRE. */
  const activeRow = step + PRE * 2;

  return (
    <section className="hv-hero">
      <div className="hv-hero__glow" aria-hidden="true" />

      <div className="hv-container">
        <div className="hv-hero__inner">
          <div className="hv-hero__copy">
            <p className="hv-hero__eyebrow">{HERO.eyebrow}</p>

            <h1 className="hv-hero__title">
              {/* The two lines are block-level spans, so JSX drops the
                  whitespace between them - textContent came out as "...traffic
                  intobooked revenue." for a screen reader or a crawler, even
                  though the eye sees two lines. The trailing space inside
                  the first line is collapsed away at the end of its line box,
                  so it changes nothing visually. */}
              <span className="hv-hero__line">{HERO.lineOne}{" "}</span>
              <span className="hv-hero__line">
                {HERO.lineTwoLead}{" "}
                <span className="hv-hero__accent">
                  {HERO.lineTwoScript}
                  {/* Hand-drawn underline. Decorative, and drawn rather than
                    a border so it can overshoot the word at both ends the
                    way a pen would. */}
                  <svg
                    className="hv-hero__swoosh"
                    viewBox="0 0 220 18"
                    fill="none"
                    aria-hidden="true"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M3 12.5c38 4 78 4.6 118 2.2 34-2 66-6.4 96-11.2"
                      stroke="currentColor"
                      strokeWidth="3.4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </span>
            </h1>

            <p className="hv-hero__lede">{HERO.lede}</p>

            <div className="hv-hero__actions">
              <Link to={HERO.primary.to} className="hv-hero__cta">
                {HERO.primary.label}
                <Icon name="arrowUpRight" aria-hidden="true" />
              </Link>
              <Link to={HERO.secondary.to} className="hv-hero__link">
                {HERO.secondary.label}
                <Icon name="arrowUpRight" aria-hidden="true" />
              </Link>
            </div>

            <div className="hv-hero__trust">
              <ul className="hv-hero__faces" aria-hidden="true">
                {HERO.faces.map((face) => (
                  <li key={face.name} className="hv-hero__face">
                    <Face face={face} />
                  </li>
                ))}
              </ul>
              <p className="hv-hero__trust-text">
                <strong>{HERO.trustLabel}</strong>
                <span>{HERO.trustSub}</span>
              </p>
            </div>
          </div>

          <div
            className="hv-hero__stack"
            aria-hidden="true"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="hv-hero__reel">
              <ul
                className="hv-hero__track"
                style={{
                  transform: `translateY(calc(var(--hv-cap-h) * -${PRE + step}))`,
                  /* Same curve as --hv-ease everywhere else on the page
                     (cubic-bezier can't be read out of a CSS var into an
                     inline style, so it's repeated literally here). */
                  transition: snapping ? "none" : `transform ${SLIDE}ms cubic-bezier(.22,.61,.36,1)`,
                }}
              >
                {reel.map((item, n) => (
                  <li
                    key={`${item.label}-${n}`}
                    className={`hv-hero__cap${n === activeRow ? " is-active" : ""}`}
                  >
                    <span className="hv-hero__cap-icon">
                      <Icon name={item.icon} strokeWidth={2} />
                    </span>
                    <span className="hv-hero__cap-text">{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <p className="hv-hero__note">{HERO.footNote}</p>
      </div>
    </section>
  );
}
