import { Link } from "react-router-dom";
import Icon from "@/components/common/Icon.jsx";
import { Reveal } from "@/components/home/primitives.jsx";

/**
 * One post, as a card.
 *
 * Shared by the /blog grid, the listing's featured slot and the
 * related-posts row under an article, so all three are the same object and
 * there is one hover behaviour to maintain rather than three that look
 * alike until they slowly stop being alike.
 *
 * `variant="featured"` lays the same card on its side (image left, copy
 * right) on a wide screen. This changes layout only: the markup, the link
 * structure and the accessible name are identical, so nothing about how the
 * card is announced depends on which variant is rendered.
 *
 * ONE LINK, STRETCHED. The title carries the only <a>, and its ::after
 * covers the whole card, so the entire card is clickable and there is one
 * tab stop whose accessible name is the headline. The visible "Read article"
 * row is decoration that duplicates that link, so it is aria-hidden in the
 * markup rather than being a second link to the same place.
 *
 * The thumbnail is alt="": it is a stock illustration chosen for the grid,
 * and the headline beside it already says what the post is about. An
 * invented alt here would be noise in a screen reader's list of images. The
 * article page's own figure does carry `post.imageAlt`, because there the
 * image is the page's content rather than a card thumbnail.
 */
export default function PostCard({ post, index = 0, variant = "grid" }) {
  const featured = variant === "featured";

  return (
    <Reveal as="li" index={index} className={featured ? "bl-featured" : undefined}>
      <article className="hv-card hv-card--hover bl-card">
        <div className="bl-card__media">
          <picture>
            <source type="image/webp" srcSet={post.imageWebp} />
            <img
              src={post.image}
              alt=""
              width={featured ? 1000 : 800}
              height={featured ? 625 : 500}
              loading={featured ? "eager" : "lazy"}
              decoding="async"
            />
          </picture>
          <span className="bl-card__cat">{post.category}</span>
        </div>

        <div className="bl-card__body">
          {featured && (
            <span className="bl-featured__flag">
              <Icon name="sparkle" aria-hidden="true" />
              Latest post
            </span>
          )}

          <h3 className="bl-card__title">
            <Link to={`/blog/${post.slug}`} className="bl-card__link">
              {post.title}
            </Link>
          </h3>

          <p className="bl-card__excerpt">{post.excerpt}</p>

          <p className="bl-card__meta">
            <span>
              <Icon name="calendar" aria-hidden="true" />
              <time dateTime={post.date}>{post.dateLabel}</time>
            </span>
            <span>
              <Icon name="clock" aria-hidden="true" />
              {post.readMins} min read
            </span>
          </p>

          <span className="bl-card__more" aria-hidden="true">
            Read article
            <Icon name="arrowRight" />
          </span>
        </div>
      </article>
    </Reveal>
  );
}
