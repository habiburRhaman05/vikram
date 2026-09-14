import { Link } from "react-router-dom";
import Icon from "@/components/common/Icon.jsx";
import { HvSection, Reveal, Btn } from "../primitives.jsx";
import { BLOG } from "@/data/homeV2";

/**
 * "Latest insights" - three post cards.
 *
 * The whole card is one link, not three. The reference draws a card with a
 * title, an image and a "Read Article" link, which as markup would be two
 * or three tab stops all going to the same article and a screen reader
 * announcing the destination repeatedly. Here the title carries the only
 * <a>, stretched over the card by a pseudo-element (see .hv-post__link::after),
 * so the entire card is clickable, there is one tab stop, and the accessible
 * name is the headline rather than "Read Article". The visible "Read Article"
 * row stays as the affordance, marked aria-hidden since it is decoration
 * duplicating a link that already exists.
 */
export default function Insights() {
  return (
    <HvSection id="insights" className="hv-insights">
      <div className="hv-insights__head">
        <Reveal className="hv-insights__intro">
          {/* The shared .hv-eyebrow - the same class SectionHead puts on
              every other section's head (Services, Journey, Work...). This
              head had its own bespoke dot-in-a-pill badge, which was the
              only eyebrow on the page not matching the rest. */}
          <span className="hv-eyebrow">{BLOG.badge}</span>
          <h2 className="hv-insights__title">
            {BLOG.titleLead} <span> {BLOG.titleAccent}</span>
          </h2>
        </Reveal>

        <Reveal className="hv-insights__cta">
          <Btn to={BLOG.cta.to} variant="outline" iconAfter="arrowRight">
            {BLOG.cta.label}
          </Btn>
        </Reveal>
      </div>

      <ul className="hv-grid hv-grid--auto-3 hv-posts">
        {BLOG.posts.map((post, i) => (
          <Reveal as="li" key={post.slug} index={i} className="hv-post">
            <article className="hv-post__card">
              <div className="hv-post__media">
                <picture>
                  <source type="image/webp" srcSet={post.imageWebp} />
                  <img
                    src={post.image}
                    alt=""
                    width={800}
                    height={450}
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
              </div>

              <div className="hv-post__body">
                <span className="hv-post__cat">{post.category}</span>

                <h3 className="hv-post__title">
                  <Link to={`${BLOG.base}/${post.slug}`} className="hv-post__link">
                    {post.title}
                  </Link>
                </h3>

                <p className="hv-post__excerpt">{post.excerpt}</p>

                <p className="hv-post__meta">
                  <span>
                    <Icon name="calendar" aria-hidden="true" />
                    <time dateTime={post.date}>{post.dateLabel}</time>
                  </span>
                  <span>
                    <Icon name="clock" aria-hidden="true" />
                    {post.readMins} min read
                  </span>
                </p>

                <span className="hv-post__more" aria-hidden="true">
                  Read Article
                  <Icon name="arrowRight" />
                </span>
              </div>
            </article>
          </Reveal>
        ))}
      </ul>
    </HvSection>
  );
}
