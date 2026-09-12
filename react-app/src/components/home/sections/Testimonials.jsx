import { useEffect, useRef, useState } from "react";
import Icon from "@/components/common/Icon.jsx";
import ImageSlot from "../ImageSlot.jsx";
import { Reveal, IconButton } from "../primitives.jsx";
import { TESTIMONIALS } from "@/data/homeV2";

/**
 * Full-bleed testimonial marquee.
 *
 * The track scrolls continuously via a CSS animation on a duplicated
 * list, so the loop is seamless: the animation travels exactly -50% of
 * the track, at which point the copy has moved into the original's
 * position and the reset is invisible.
 *
 * It pauses on hover, and on focus-within so a keyboard user can read a
 * card without it sliding away. The duplicate set is aria-hidden so a
 * screen reader hears each testimonial once rather than twice.
 *
 * The prev/next buttons nudge the track manually. Doing that pauses the
 * auto-scroll, because a control that fights the animation feels broken;
 * it resumes after a few seconds of no interaction.
 */
export default function Testimonials() {
  const viewportRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const resumeTimer = useRef(null);

  useEffect(() => () => clearTimeout(resumeTimer.current), []);

  const nudge = (dir) => {
    const el = viewportRef.current;
    if (!el) return;
    setPaused(true);
    el.scrollBy({ left: dir * 340, behavior: "smooth" });
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), 4000);
  };

  // Rendered twice: the second pass is the seamless-loop duplicate.
  const cards = [...TESTIMONIALS.items, ...TESTIMONIALS.items];

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
        ref={viewportRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <ul className="hv-marquee__track">
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
