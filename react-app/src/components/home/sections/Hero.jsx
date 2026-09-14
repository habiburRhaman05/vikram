import { Link } from "react-router-dom";
import Icon from "@/components/common/Icon.jsx";
import HaloButton from "../HaloButton.jsx";
import ProductTile from "../ProductTile.jsx";
import { HERO_ICONS } from "../heroIcons.jsx";
import { HERO, SERVICE_LINEUP, TRUST_LABEL, TRUST_LEARN, TRUST_LOGOS } from "@/data/homeV2";

/* Resting tilt per tile, straight from the reference (-5, 2, 3, -6, 6
   degrees). They straighten on hover. */
const TILTS = [-5, 2, 3, -6, 6];

/**
 * Hero + trust strip, one dark-teal section, built to the reference's
 * structure:
 *
 *   pill -> two-line headline -> subhead -> stat row -> ringed CTA
 *   -> tile row -> trust strip (label, logo marquee, learn-more link)
 *
 * THE TILE ROW IS THE SEAM. Its two lines run out to the page edges and
 * sit exactly on the top border of the trust strip, so the five tiles
 * straddle the join between the two areas, half above and half below.
 * That is done with a negative bottom margin of half a tile on the row -
 * see .hv-hero__rail in home-sections.css.
 *
 * SIZING: everything from the top of the content down to that seam is 80vh
 * (the main block plus the upper half of the tile row). The header sits
 * above it and the trust strip below, outside that budget.
 */
export default function Hero() {
  const logos = [...TRUST_LOGOS, ...TRUST_LOGOS];

  return (
    <section className="hv-hero">
      <div className="hv-hero__glow" aria-hidden="true" />

      <div className="hv-hero__main">
        <div className="hv-container hv-hero__inner">
          <Link to={HERO.pill.to} className="hv-hero__pill">
            {HERO.pill.text} <strong>{HERO.pill.strong}</strong>
          </Link>

          <h1 className="hv-hero__title">
            {HERO.titleLead}
            <br />
            <span className="hv-hero__accent">{HERO.titleAccent}</span> {HERO.titleTail}
          </h1>

          <p className="hv-hero__lede">{HERO.lede}</p>

          <ul className="hv-hero__stats">
            {HERO.stats.map((s) => (
              <li key={s.label}>
                {HERO_ICONS[s.icon]}
                {s.label}
              </li>
            ))}
          </ul>

          <HaloButton to={HERO.primary.to}>{HERO.primary.label}</HaloButton>
        </div>
      </div>

      {/* Real links: each tile goes to its service, and its name is shown
          as a tooltip on hover/focus. The name is ALSO the link's
          accessible name (the tooltip text is in the link), so the tiles
          aren't anonymous to a screen reader. */}
      <nav className="hv-hero__rail" aria-label="Our services">
        <span className="hv-hero__rail-line hv-hero__rail-line--l" aria-hidden="true" />
        <ul className="hv-hero__tiles">
          {SERVICE_LINEUP.map((s, i) => (
            <li key={s.id}>
              <Link to={s.to} className="hv-hero__tile" style={{ "--tilt": `${TILTS[i % TILTS.length]}deg` }}>
                <ProductTile icon={s.icon} tone={s.tone} size="lg" />
                <span className="hv-hero__tip">
                  <span className="hv-hero__tip-caret" aria-hidden="true" />
                  {s.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <span className="hv-hero__rail-line hv-hero__rail-line--r" aria-hidden="true" />
      </nav>

      <div className="hv-hero__trust">
        <div className="hv-container hv-hero__trust-inner">
          <p className="hv-hero__trust-label" id="trust-label">
            {TRUST_LABEL}
          </p>

          {/* Container width, with the reference's dividers between logos.
              Each divider is part of its logo item (::after), so every
              item is the same shape and the loop maths still holds. */}
          <div className="hv-marquee hv-hero__trust-marquee">
            <ul className="hv-marquee__track" aria-labelledby="trust-label" style={{ "--hv-marquee-copies": 2 }}>
              {logos.map((logo, i) => (
                <li
                  key={`${logo.name}-${i}`}
                  className="hv-hero__trust-item"
                  aria-hidden={i >= TRUST_LOGOS.length ? "true" : undefined}
                >
                  <Icon name={logo.icon} strokeWidth={1.8} aria-hidden="true" />
                  <span>{logo.name}</span>
                </li>
              ))}
            </ul>
          </div>

          <Link to={TRUST_LEARN.to} className="hv-hero__learn">
            {TRUST_LEARN.label}
            <Icon name="arrowRight" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
