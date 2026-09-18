import { useState } from "react";
import HaloButton from "../HaloButton.jsx";
import { HvSection, Reveal } from "../primitives.jsx";
import { WORK } from "@/data/homeV2";

/**
 * "Our Work" - a filterable bento grid of full-bleed project cards.
 *
 * With "All work" selected the grid is a bento: the first project is a
 * tall feature card and the rest tile around it. Any other filter drops
 * to a plain even grid, because a bento laid out for five cards looks
 * broken with two.
 *
 * The list is keyed on the active filter, so switching remounts it and
 * the cards replay their staggered entrance instead of snapping.
 *
 * THE CARDS ARE NOT LINKS. The title used to carry a stretched link over
 * the whole card, opening that project's /work/:slug page; those pages
 * carried little more than the card already shows, so the card now simply
 * shows it. The arrow badge went with the link - an arrow that rotates on
 * hover and goes nowhere is worse than no arrow.
 *
 * The grid therefore has no tab stops in it at all now. The filter buttons
 * above it and the CTA below it are the only interactive things in the
 * section, which is what the keyboard order should look like.
 *
 * Hover still opens each card's description and tags. That is a reveal,
 * not a destination - and it is always open on the feature card and on
 * touch screens, which have no hover (see .hv-works__more).
 */
export default function Work() {
  const [filter, setFilter] = useState("all");
  const projects = filter === "all" ? WORK.projects : WORK.projects.filter((p) => p.filter === filter);
  const bento = filter === "all";

  return (
    <HvSection id="work" className="hv-works">
      <div className="hv-works__head">
        <Reveal className="hv-works__intro">
          <span className="hv-eyebrow">{WORK.eyebrow}</span>
          <h2 className="hv-works__title">{WORK.title}</h2>
          <p className="hv-works__lede">{WORK.lede}</p>
        </Reveal>

        <Reveal className="hv-works__filters" role="group" aria-label="Filter projects">
          {WORK.filters.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              className={`hv-works__filter${filter === f.id ? " is-on" : ""}`}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </Reveal>
      </div>

      <ul key={filter} className={`hv-works__grid${bento ? " is-bento" : ""}`}>
        {projects.map((p, i) => (
          <li key={p.id} className="hv-works__cell" style={{ "--d": `${i * 70}ms` }}>
            <article className="hv-works__card" style={{ "--tone": p.tone }}>
              <picture className="hv-works__img">
                <source type="image/webp" srcSet={`${p.image}.webp`} />
                <img src={`${p.image}.jpg`} alt="" width="960" height="600" loading="lazy" decoding="async" />
              </picture>
              <span className="hv-works__shade" aria-hidden="true" />

              <div className="hv-works__top">
                <span className="hv-works__chip">
                  <i aria-hidden="true" />
                  {p.industry}
                </span>
              </div>

              <div className="hv-works__body">
                <h3 className="hv-works__name">{p.title}</h3>
                <div className="hv-works__more">
                  <div>
                    <p className="hv-works__desc">{p.body}</p>
                    <ul className="hv-works__tags">
                      {p.tags.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <Reveal className="hv-works__foot">
        <HaloButton to={WORK.cta.to}>{WORK.cta.label}</HaloButton>
      </Reveal>
    </HvSection>
  );
}
