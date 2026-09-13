import { useEffect, useRef, useState } from "react";
import Icon from "@/components/common/Icon.jsx";
import ImageSlot from "../ImageSlot.jsx";
import { Reveal, IconButton } from "../primitives.jsx";
import { TESTIMONIALS } from "@/data/homeV2";

/** Copies of the card list on the track - see the note above. */
const COPIES = 4;

/**
 * Full-bleed testimonial marquee.
 *
 * The track scrolls continuously via a CSS animation on a repeated list,
 * so the loop is seamless: each lap travels exactly one copy, at which
 * point the next copy has moved into the first one's position and the
 * reset is invisible. It is repeated COPIES times (not just twice)
 * because one copy of three cards is narrower than a desktop window -
 * with only a duplicate, the tail of every lap left bare background at
 * the right edge. The count is passed to CSS as --hv-marquee-copies,
 * which is what the keyframe divides the track by; see TrustBar.jsx and
 * home-chrome.css section 21.
 *
 * It pauses on hover, and on focus-within so a keyboard user can read a
 * card without it sliding away. Every copy after the first is aria-hidden
 * so a screen reader hears each testimonial once rather than N times.
 *
 * The prev/next buttons nudge the SAME transform the auto-play animation
 * drives, rather than scrolling anything: an infinite linear CSS animation's
 * visual position is just a function of elapsed time and its
 * animation-delay, so shifting that delay jumps the track instantly to a
 * new position without ever restarting the animation (which would snap
 * back to translateX(0) and be exactly the kind of visible jump this is
 * meant to avoid). The jump is paused immediately after, then resumes
 * smoothly from the new position after a few seconds of no interaction.
 */
export default function Testimonials() {
  const trackRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const resumeTimer = useRef(null);
  // Cumulative animation-delay applied by nudging, in seconds. Negative
  // values fast-forward an animation (it behaves as though it started
  // that long ago); this just keeps adding to that as the user clicks,
  // rather than resetting it, so repeated nudges compound correctly.
  const delayRef = useRef(0);
  // How many back-to-back copies of the list the track renders. Starts at
  // the bare minimum for the wrap math to be valid; the effect below
  // grows it to however many are actually needed once it can measure.
  const [copies, setCopies] = useState(2);

  useEffect(() => () => clearTimeout(resumeTimer.current), []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const recompute = () => {
      // scrollWidth reflects the CURRENTLY rendered number of copies
      // (data-copies), never the transform applied to the track - dividing
      // it back out gives the width of one copy regardless of how many are
      // on screen right now.
      const renderedCopies = Number(track.dataset.copies) || 1;
      const oneSetWidth = track.scrollWidth / renderedCopies;
      if (!oneSetWidth) return;

      const viewportWidth = track.parentElement?.clientWidth || window.innerWidth;
      // Worst case is the instant just before the track wraps: only
      // (copies - 1) full sets remain ahead of the current view, and that
      // has to be enough to cover the viewport on its own, or the tail end
      // of the track runs out before the wrap point arrives. +1 copy of
      // headroom on top of the minimum so a mid-resize measurement doesn't
      // leave it running exactly on the edge.
      const needed = Math.max(2, Math.ceil(viewportWidth / oneSetWidth) + 1);
      setCopies((prev) => (prev === needed ? prev : needed));
    };

    recompute();

    const ro = new ResizeObserver(recompute);
    ro.observe(track);
    if (track.parentElement) ro.observe(track.parentElement);
    return () => ro.disconnect();
  }, []);

  const nudge = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const oneLoopWidth = track.scrollWidth / copies;
    if (!oneLoopWidth) return;

    const deltaSeconds = ((dir * 340) / oneLoopWidth) * MARQUEE_DURATION_S;
    delayRef.current -= deltaSeconds;
    track.style.animationDelay = `${delayRef.current}s`;

    setPaused(true);
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), 4000);
  };

  // Every pass after the first is a seamless-loop duplicate.
  const cards = Array.from({ length: COPIES }, () => TESTIMONIALS.items).flat();

  return (
    <section className="hv-section hv-section--mint hv-testi" aria-labelledby="testi-title">
      <div className="hv-container">
        <Reveal className="hv-section-head hv-section-head--center">
          <span className="hv-eyebrow">{TESTIMONIALS.eyebrow}</span>
          <h2 className="hv-h2" id="testi-title">
            {TESTIMONIALS.title}
          </h2>
          <p className="hv-lede">{TESTIMONIALS.lede}</p>
        </Reveal>
      </div>

      {/* Full width: deliberately outside .hv-container so the track can
          bleed to both edges and the loop has room to breathe. */}
      <div
        className={`hv-marquee${paused ? " is-paused" : ""}`}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <ul className="hv-marquee__track" style={{ "--hv-marquee-copies": COPIES }}>
          {cards.map((t, i) => {
            const isClone = i >= TESTIMONIALS.items.length;
            return (
              <li
                className="hv-card hv-testimonial"
                key={`${t.name}-${i}`}
                aria-hidden={isClone ? "true" : undefined}
              >
                <Icon name="quote" className="hv-testimonial__mark" aria-hidden="true" strokeWidth={1.6} />
                <blockquote className="hv-testimonial__quote">{t.quote}</blockquote>
                <figcaption className="hv-testimonial__person">
                  <ImageSlot src={t.image} alt="" ratio="1/1" label=" " className="hv-testimonial__avatar" />
                  <span>
                    <strong>{t.name}</strong>
                    <em>{t.role}</em>
                  </span>
                </figcaption>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="hv-marquee__controls">
        <IconButton icon="chevronLeft" label="Previous testimonial" onClick={() => nudge(-1)} />
        <IconButton icon="chevronRight" label="Next testimonial" onClick={() => nudge(1)} />
      </div>
    </section>
  );
}
