import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout.jsx";
import PageMeta from "@/components/common/PageMeta.jsx";
import StructuredData from "@/components/common/StructuredData.jsx";
import Icon from "@/components/common/Icon.jsx";
import PostCard from "@/components/blog/PostCard.jsx";
import { HvSection, Reveal, Btn, BtnRow } from "@/components/home/primitives.jsx";
import { BLOG_INDEX, BLOG_FAQ, BLOG_CATEGORIES, SORTED_POSTS } from "@/data/blog.js";
import Faq from "@/components/common/Faq.jsx";

/* v2 chrome (glass header, SiteFooterV2) - the same two stylesheets every
   other redesigned page loads; see Industries.jsx for why both are needed.
   blog.css only adds this page's and the article pages' own sections. */
import "@/styles/home-redesign.css";
import "@/styles/home-chrome.css";
import "@/styles/blog.css";

/**
 * /blog.
 *
 * The listing. Hero, a topic filter, the newest post laid on its side as a
 * featured card, then the rest as a grid.
 *
 * FILTERING IS CLIENT SIDE, ON PURPOSE. The whole catalogue is three posts
 * and a few kilobytes; fetching a filtered list would add a round trip and a
 * loading state to something that is already on the page. The filter state
 * is a plain useState over data that is already in the bundle. If the
 * catalogue ever grows past roughly a hundred posts, the thing to change is
 * this file: paginate or move to a server-rendered route, and the card
 * component below still does not need to know.
 *
 * FILTERED BY A CATEGORY, THE FEATURED SLOT DISAPPEARS. It is a "latest
 * post" slot, and a post from a different category sitting above a filtered
 * grid reads as the filter not working. Filtered views show results only.
 *
 * There is no pagination yet because there is nothing to paginate: three
 * cards fit in one grid and a "load more" that reveals zero more posts is
 * furniture. The featured/grid split below is the seam pagination would
 * attach to when the catalogue justifies it.
 */
export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("all");

  const counts = useMemo(() => {
    const map = { all: SORTED_POSTS.length };
    for (const category of BLOG_CATEGORIES) {
      map[category] = SORTED_POSTS.filter((post) => post.category === category).length;
    }
    return map;
  }, []);

  const posts = useMemo(
    () => (activeCategory === "all" ? SORTED_POSTS : SORTED_POSTS.filter((p) => p.category === activeCategory)),
    [activeCategory]
  );

  /* The newest post gets the wide slot, but only when it is not also going
     to appear immediately below itself in the grid. */
  const featured = activeCategory === "all" && posts.length > 1 ? posts[0] : null;
  const rest = featured ? posts.slice(1) : posts;

  return (
    <Layout
      variant="v2"
      topbar={
        SORTED_POSTS[0] ? (
          <>
            New guide: <Link to={`/blog/${SORTED_POSTS[0].slug}`}>{SORTED_POSTS[0].title}</Link>
          </>
        ) : null
      }
    >
      <PageMeta
        title="Blog: CRM, AI and Conversion Guides - GHLevelUp"
        description="Practical guides on GoHighLevel, CRM follow-up, AI agents, funnels and websites, written from client work rather than from a keyword list. No gates, no email required."
        ogDescription="Straight answers about the systems that actually bring businesses leads: pipelines that follow up, AI agents that know when to hand over, and landing pages that convert on a phone."
      />

      <StructuredData
        blog={SORTED_POSTS}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ]}
      />

      <section className="bl-hero">
        <div className="hv-container bl-hero__inner">
          <Reveal>
            <p className="bl-hero__crumbs">
              <Link to="/">Home</Link>
              <span>/</span>
              {BLOG_INDEX.crumb}
            </p>

            <span className="bl-hero__eyebrow">{BLOG_INDEX.eyebrow}</span>

            <h1 className="bl-hero__title">
              {BLOG_INDEX.titleLead}
              <span>{BLOG_INDEX.titleAccent}</span>
            </h1>

            <p className="bl-hero__lede">{BLOG_INDEX.lede}</p>
          </Reveal>
        </div>
      </section>

      <HvSection>
        <Reveal className="bl-list-head">
          <div className="bl-filters" role="group" aria-label="Filter posts by topic">
            <span className="bl-filters__label">{BLOG_INDEX.allLabel}</span>

            {["all", ...BLOG_CATEGORIES].map((category) => (
              <button
                key={category}
                type="button"
                className="bl-filter"
                /* aria-pressed is the state, so the styling and what a screen
                   reader announces can never disagree. */
                aria-pressed={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {category === "all" ? "All posts" : category}
                <span className="bl-filter__count">{counts[category]}</span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Announces the result count when a filter changes. Without it, a
            screen reader user gets no feedback that anything happened. */}
        <p className="hv-sr-only" role="status">
          {posts.length} {posts.length === 1 ? "post" : "posts"}
          {activeCategory === "all" ? "" : ` in ${activeCategory}`}
        </p>

        {featured && <PostCard post={featured} variant="featured" />}

        {rest.length > 0 ? (
          <ul className="bl-grid">
            {rest.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i} />
            ))}
          </ul>
        ) : (
          <div className="bl-empty">
            <p>Nothing filed under {activeCategory} yet. Try another topic, or the full list.</p>
            <BtnRow className="bl-actions">
              <Btn variant="outline" onClick={() => setActiveCategory("all")} icon="arrowRight">
                Show all posts
              </Btn>
            </BtnRow>
          </div>
        )}
      </HvSection>

      {/* The ask. Best-practice CTA banner shape: one card the gradient
          makes impossible to miss, ONE dominant action (the button everyone
          should press), a quiet outline companion, and reassurances beside
          the buttons rather than a second paragraph of copy. The dark wash
          around the card keeps the card's contrast doing the work. */}
      <HvSection dark tight className="bl-closing">
        <Reveal className="bl-cta-card">
          <div className="bl-cta-card__copy">
            <span className="hv-eyebrow">Free consultation</span>
            <h2 className="hv-h2">Want this built for your business rather than read about?</h2>
            <p className="hv-lede">
              Twenty minutes on how you get leads today, and what we would change first. You leave with the
              plan whether or not you use us.
            </p>
          </div>
          <div className="bl-cta-card__side">
            <BtnRow className="bl-closing__actions">
              <Btn to="/book" variant="primary" size="lg" iconAfter="arrowRight">
                Get a free consultation
              </Btn>
              <Btn to="/services" variant="outline" size="lg">
                See all services
              </Btn>
            </BtnRow>
            <ul className="bl-points">
              <li>
                <Icon name="check" aria-hidden="true" />
                No obligation, no deck
              </li>
              <li>
                <Icon name="check" aria-hidden="true" />
                Scope and cost in writing
              </li>
              <li>
                <Icon name="check" aria-hidden="true" />
                We say so if it is not a fit
              </li>
            </ul>
          </div>
        </Reveal>
      </HvSection>

      {/* Very bottom, per the brief: the listing's own FAQ after the CTA. */}
      <HvSection mint className="bl-faq" id="blog-faq">
        <StructuredData faq={BLOG_FAQ.items} />
        <Reveal className="bl-faq__head">
          <span className="hv-eyebrow">{BLOG_FAQ.eyebrow}</span>
          <h2 className="hv-h2">{BLOG_FAQ.title}</h2>
          <p className="hv-body">{BLOG_FAQ.lede}</p>
        </Reveal>
        <Reveal className="bl-faq__list">
          <Faq items={BLOG_FAQ.items} />
        </Reveal>
      </HvSection>
    </Layout>
  );
}
