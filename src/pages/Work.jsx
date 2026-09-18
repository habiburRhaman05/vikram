import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout.jsx";
import PageMeta from "@/components/common/PageMeta.jsx";
import StructuredData from "@/components/common/StructuredData.jsx";
import Icon from "@/components/common/Icon.jsx";
import { HvSection, Reveal, Btn } from "@/components/home/primitives.jsx";
import { WORK_HUB, WORK_PROJECTS } from "@/data/work.jsx";

import "@/styles/home-redesign.css";
import "@/styles/home-chrome.css";
import "@/styles/work.css";

/**
 * /work - the portfolio hub.
 *
 * A sticky filter bar (matching the home page's four categories) over an
 * asymmetrical grid: the first matching project renders as a tall feature
 * card, the rest tile around it - the same bento idea the home page teaser
 * uses, rebuilt here as this page's own layout rather than importing that
 * component, since a dedicated hub needs more per-card content (the result
 * line) than a homepage teaser does.
 *
 * THE CARDS ARE NOT LINKS. They used to open a /work/:slug detail page;
 * those pages carried little more than the card already shows, so the card
 * now simply shows it. Each one is an <article>, with no arrow badge, no
 * hover lift and no focus ring - nothing that promises a destination it
 * does not have.
 *
 * The /work/:slug route and WorkDetail.jsx still exist and still render:
 * this removes the links, not the pages. Nothing in the site points at
 * them any more, so they are also no longer published in the sitemap or
 * in this page's structured data - put the <Link> back and both should go
 * back with it.
 */
export default function Work() {
  const [filter, setFilter] = useState("all");
  const projects = filter === "all" ? WORK_PROJECTS : WORK_PROJECTS.filter((p) => p.filter === filter);
  const bento = filter === "all";

  return (
    <Layout variant="v2" topbar="Want to see how this would work for your business? Book a free consultation">
      <PageMeta
        title="Our Work: CRM, Automation & Website Builds - GHLevelUp"
        description="CRM, automation, websites and reporting systems we've built - browse by category to see the kind of work we deliver."
        ogDescription="A look at the kind of work we deliver, built to fit how each business actually runs."
      />

      {/* No `items`: an ItemList publishes a URL per entry, and the only
          URLs it could publish are detail pages this page no longer links
          to. The CollectionPage itself still describes /work. */}
      <StructuredData
        collection={{
          name: WORK_HUB.title,
          description: WORK_HUB.lede,
          path: "/work",
        }}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Our Work", path: "/work" },
        ]}
      />

      <div className="wk-pg">
        <section className="wk-hero">
          <div className="hv-container wk-hero__inner">
            <Reveal>
              <p className="wk-hero__crumbs">
                <Link to="/">Home</Link>
                <span>/</span>
                Our Work
              </p>
              <span className="wk-hero__eyebrow">{WORK_HUB.eyebrow}</span>
              <h1 className="wk-hero__title">{WORK_HUB.title}</h1>
              <p className="wk-hero__lede">{WORK_HUB.lede}</p>
            </Reveal>
          </div>
        </section>

        <HvSection className="wk-gallery" flushTop>
          <div className="wk-filterbar">
            <div className="hv-container wk-filterbar__inner">
              <div className="wk-filters" role="group" aria-label="Filter projects">
                {WORK_HUB.filters.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    aria-pressed={filter === f.id}
                    className={filter === f.id ? "is-on" : ""}
                    onClick={() => setFilter(f.id)}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <ul key={filter} className={`wk-grid${bento ? " is-bento" : ""}`}>
            {projects.map((p, i) => (
              <li key={p.id} className="wk-cell" style={{ "--d": `${i * 70}ms` }}>
                <article className="wk-card" style={{ "--tone": p.tone }}>
                  <picture className="wk-card__img">
                    <source type="image/webp" srcSet={`${p.image}.webp`} />
                    <img src={`${p.image}.jpg`} alt="" width="960" height="600" loading="lazy" decoding="async" />
                  </picture>
                  <span className="wk-card__shade" aria-hidden="true" />

                  <div className="wk-card__top">
                    <span className="wk-card__chip">{p.industry}</span>
                  </div>

                  <div className="wk-card__body">
                    <span className="wk-card__result">{p.resultTag}</span>
                    <h3>{p.title}</h3>
                    <p>{p.body}</p>
                    <ul className="wk-card__tags">
                      {p.tags.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              </li>
            ))}
          </ul>

          <Reveal as="p" className="wk-note">
            <Icon name="shieldCheck" aria-hidden="true" />
            {WORK_HUB.note}
          </Reveal>
        </HvSection>

        <HvSection dark className="wk-cta">
          <Reveal className="wk-cta__inner">
            <h2 className="hv-h2">Have a system like this in mind?</h2>
            <p className="hv-body">Tell us what you're trying to fix. We'll say what we'd actually build for it.</p>
            <Btn to="/book" variant="primary" size="lg" iconAfter="arrowRight">
              Get Free Consultation
            </Btn>
          </Reveal>
        </HvSection>
      </div>
    </Layout>
  );
}
