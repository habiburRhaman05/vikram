import Icon from "@/components/common/Icon.jsx";
import { Reveal } from "../primitives.jsx";
import { TRUST_LABEL, TRUST_LOGOS } from "@/data/homeV2";

/**
 * How many times the list is repeated on the track.
 *
 * This is load-bearing, not decoration. The animation travels exactly ONE
 * copy per lap, so the track only stays wider than the window if the
 * copies behind the current one are, together, wider than the window. Eight
 * short logos are narrower than a desktop viewport, so with the old two
 * copies the last stretch of every lap slid bare background in from the
 * right - the strip looked like a slider running out rather than a loop.
 * Four copies is one full copy of travel plus three more behind it (about
 * 3.4k px of logos), which clears every desktop width we target.
 *
 * The matching number is handed to the CSS as `--hv-marquee-copies` on the
 * track, because the keyframe divides the track by it to find one copy's
 * width. Keeping the constant here and passing it down means the two can
 * never disagree. See home-chrome.css section 21.
 */
const COPIES = 4;

/**
 * Client logo strip - a full-width auto-scrolling marquee, the same
 * technique (and the same .hv-marquee/.hv-marquee__track CSS) as the
 * testimonials strip further down the page: a repeated list on a track
 * that travels exactly one copy per lap, the point where the next copy has
 * moved into the previous one's position, so the reset lands on an
 * identical frame and is invisible. The motion is continuous - it never
 * stops at an end, because there is no end. It pauses on hover/focus so a
 * keyboard user isn't fighting a moving target.
 *
 * Every copy after the first is aria-hidden - a screen reader should hear
 * each logo once, not four times, and the list already announces its real
 * count (TRUST_LOGOS.length) via the one live copy.
 */
export default function TrustBar() {
  const logos = Array.from({ length: COPIES }, () => TRUST_LOGOS).flat();

  return (
    <section className="hv-trust" aria-labelledby="trust-label">
      <Reveal className="hv-container hv-trust__head">
        <p className="hv-trust__label" id="trust-label">
          {TRUST_LABEL}
        </p>
      </Reveal>

      {/* Full width: deliberately outside .hv-container so the track can
          bleed to both edges, exactly like the testimonials marquee. */}
      <div className="hv-marquee hv-trust__marquee">
        <ul
          className="hv-marquee__track"
          aria-label="Client logos"
          style={{ "--hv-marquee-copies": COPIES }}
        >
          {logos.map((logo, i) => (
            <li
              key={`${logo.name}-${i}`}
              className="hv-trust__item"
              aria-hidden={i >= TRUST_LOGOS.length ? "true" : undefined}
            >
              <Icon name={logo.icon} strokeWidth={1.8} aria-hidden="true" />
              <span>{logo.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
