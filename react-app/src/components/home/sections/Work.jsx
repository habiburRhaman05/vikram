import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/common/Icon.jsx";
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
 * Each card is one link (the title, stretched over the card), so there is
 * one tab stop per project and its accessible name is the project title.
 * There are no case-study pages yet, so every card leads to the contact
 * page - see the note on WORK in homeV2.jsx about the projects themselves.
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
                <span className="hv-works__go" aria-hidden="true">
                  <Icon name="arrowUpRight" />
                </span>
              </div>

              <div className="hv-works__body">
                <h3 className="hv-works__name">
                  <Link to={WORK.cta.to} className="hv-works__link">
                    {p.title}
                  </Link>
                </h3>
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
        <p>Have a project in mind? Let's map out what it would take.</p>
        <HaloButton to={WORK.cta.to}>{WORK.cta.label}</HaloButton>
      </Reveal>
    </HvSection>
  );
}
