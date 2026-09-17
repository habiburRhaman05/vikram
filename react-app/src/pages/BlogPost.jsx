import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout.jsx";
import PageMeta from "@/components/common/PageMeta.jsx";
import StructuredData from "@/components/common/StructuredData.jsx";
import Icon from "@/components/common/Icon.jsx";
import Faq from "@/components/common/Faq.jsx";
import ArticleBody from "@/components/blog/ArticleBody.jsx";
import ReadingProgress from "@/components/blog/ReadingProgress.jsx";
import { buildHeadings, idMap } from "@/lib/headings.js";
import PostCard from "@/components/blog/PostCard.jsx";
import ServiceEnquiryForm from "@/components/services/ServiceEnquiryForm.jsx";
import { HvSection, Reveal, Btn, BtnRow, IconBadge } from "@/components/home/primitives.jsx";
import { postBySlug, relatedPosts, neighboursOf, wordCountOf, BLOG_AUTHOR, BLOG_INDEX } from "@/data/blog.js";
import { SERVICES } from "@/data/serviceLinks.js";

import "@/styles/home-redesign.css";
import "@/styles/home-chrome.css";
import "@/styles/blog.css";
import "@/styles/service-form.css"; // carried by the embedded enquiry form

/**
 * /blog/:slug - one article.
 *
 * Section order is the argument, not a stack of shelves: what this is, the
 * article itself, the services it is actually about, other things to read,
 * the questions people ask before they call, then the ask.
 *
 * THE BODY IS SPLIT IN TWO SO THE CONVERSION BLOCKS SIT INSIDE IT. A call
 * to action after 1,800 uninterrupted words asks a reader who has already
 * left. At the h2 nearest the middle of the body - computed rather than
 * hand-placed, so it stays sensible when a paragraph is added and no post
 * needs a magic index in its data - the reader gets the consultation band
 * AND the enquiry form itself, inside the article where they are still
 * reading. Both halves are rendered with the same id map, which is what
 * keeps the two ids the split creates from being numbered independently.
 * There is no second form at the foot of the page: the FAQ's contact card
 * and the related row carry the close, and a form that appears twice on one
 * page reads as a template accident.
 *
 * EVERY LINK OUT OF HERE IS CHECKED AGAINST A REGISTRY. The matched-service
 * cards resolve their slugs against SERVICES in data/serviceLinks.js, the
 * same registry the service pages cross-link from, so a card here can only
 * ever point at a route that exists. A post whose `relatedServices` names a
 * slug that is not in the registry simply renders fewer cards.
 *
 * SEO: this page publishes a BlogPosting, a BreadcrumbList and an FAQPage,
 * all from the post's own data. No aggregate rating, no invented review
 * counts, nothing the page cannot substantiate.
 */

/**
 * Formats an ISO date the way the page writes dates, for the "Updated"
 * stamp. The published date is a hand-written `dateLabel` in each post
 * because it also appears on the cards; a revision date does not earn a
 * second hand-written string per post, so it is derived from the value in
 * the data. Returns null rather than "Invalid Date" if the field is junk,
 * which is what makes the stamp disappear instead of printing nonsense.
 */
function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

/**
 * Which heading the reader is currently inside, for the table of contents.
 *
 * A scroll listener rather than an IntersectionObserver: what is wanted is
 * "the last heading that has passed the top of the reading area", which is
 * a one-line calculation from geometry and an awkward one to express as a
 * set of observer thresholds. Two notes on cost: the listener is passive and
 * throttled to one read per animation frame, and it only calls setState when
 * the heading actually changes, so it is not re-rendering on every frame of
 * a scroll.
 */
function useActiveHeading(headings) {
  const [activeId, setActiveId] = useState(headings[0]?.id ?? null);
  const frame = useRef(null);

  useEffect(() => {
    if (headings.length === 0) return;

    const measure = () => {
      frame.current = null;
      /* 140px is roughly the sticky header plus a line and a half: the
         heading counts as "current" just after it clears the bar. */
      const line = 140;
      let current = headings[0].id;

      for (const heading of headings) {
        const el = document.getElementById(heading.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= line) current = heading.id;
        else break;
      }

      setActiveId((previous) => (previous === current ? previous : current));
    };

    const onScroll = () => {
      if (frame.current !== null) return;
      frame.current = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [headings]);

  return activeId;
}

/**
 * The contents list.
 *
 * Open by default and shut behind a toggle on a narrow screen, where it sits
 * above the article and twelve links is most of a screen of scrolling before
 * the first paragraph. The `is-open` class and the toggle's aria-expanded
 * are the same boolean, so they cannot disagree. Desktop hides the button
 * and shows the list regardless of this state (see blog.css), which is why
 * nothing needs to know the viewport width in JavaScript.
 */
function ContentsList({ headings, activeId }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bl-toc" aria-label="On this page">
      <button
        type="button"
        className="bl-toc__toggle"
        aria-expanded={open}
        aria-controls="post-contents"
        onClick={() => setOpen((v) => !v)}
      >
        On this page ({headings.length})
        <Icon name="chevronDown" aria-hidden="true" />
      </button>

      <ul className={`bl-toc__list${open ? " is-open" : ""}`} id="post-contents">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              className={`bl-toc__link${heading.id === activeId ? " is-active" : ""}`}
              href={`#${heading.id}`}
              aria-current={heading.id === activeId ? "location" : undefined}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>

      <Link className="bl-toc__back" to="/blog">
        <Icon name="chevronLeft" aria-hidden="true" />
        All posts
      </Link>
    </nav>
  );
}


/* -- Local sections -------------------------------------------------------- */

function Hero({ post, words }) {
  /* Only shown when the post was actually revised. `updated` defaults to the
     published date in the data, and printing "Updated" beside a date that is
     the same as the published one is noise that also overstates how fresh
     the piece is. */
  const revised = post.updated && post.updated !== post.date ? formatDate(post.updated) : null;

  return (
    <section className="bl-hero bl-post__hero">
      <div className="hv-container bl-hero__inner">
        <Reveal className="bl-post__header">
          <p className="bl-hero__crumbs">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/blog">{BLOG_INDEX.crumb}</Link>
            <span>/</span>
            {post.category}
          </p>

          <span className="bl-post__cat">{post.category}</span>

          <h1 className="bl-post__title">{post.title}</h1>

          <p className="bl-post__summary">{post.summary}</p>

          <div className="bl-post__meta">
            <span>
              <Icon name="pen" aria-hidden="true" />
              By <Link to={BLOG_AUTHOR.href}>{BLOG_AUTHOR.name}</Link>, {BLOG_AUTHOR.role}
            </span>
            <span>
              <Icon name="calendar" aria-hidden="true" />
              <time dateTime={post.date}>{post.dateLabel}</time>
            </span>
            {revised && (
              <span>
                <Icon name="refresh" aria-hidden="true" />
                Updated <time dateTime={post.updated}>{revised}</time>
              </span>
            )}
            <span>
              <Icon name="clock" aria-hidden="true" />
              {post.readMins} min read, about {words.toLocaleString("en-US")} words
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** The dark summary box under the header. A reader who only wants the
 *  answer should not have to scroll 1,500 words for it, and a scannable
 *  summary is also the part a search snippet tends to lift. */
function KeyPoints({ points }) {
  return (
    <aside className="bl-keypoints">
      <p className="bl-keypoints__title">{points.title}</p>
      <ul>
        {points.items.map((item) => (
          <li key={item}>
            <Icon name="check" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
}

/** The in-article ask. Painted on .hv-card--dark rather than a bespoke dark
 *  card so the buttons inside it inherit the dark-surface treatments.
 *  `extra` adds a modifier class - the inline variant (bl-cta--inline) is
 *  the one that sits mid-article and reads as part of the flow. */
function ConsultationBand({ to = "/services", extra = "" }) {
  return (
    <div className={`hv-card hv-card--dark bl-cta${extra ? ` ${extra}` : ""}`}>
      <span className="hv-eyebrow bl-cta__eyebrow">Free consultation</span>
      <h3>Want this built rather than read about?</h3>
      <p>
        Twenty minutes on how you get leads today, and the first two things we would change. You leave with
        the plan whether or not you use us.
      </p>

      <div className="bl-cta__actions">
        <Btn to="/book" variant="primary" iconAfter="arrowRight">
          Get a free consultation
        </Btn>
        <Btn to={to} variant="outline">
          See the services
        </Btn>
      </div>

      <ul className="bl-points">
        <li>
          <Icon name="check" aria-hidden="true" />
          No obligation
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
  );
}

/** The services this article is actually about, each with the reason it
 *  applies here rather than a generic blurb. */
function MatchedServices({ items }) {
  if (!items.length) return null;

  /* No <section> and no .hv-container here: this renders inside an
     HvSection, which already supplies both. Nesting them would double the
     page gutter and give the grid a narrower measure than every other
     section on the site. */
  return (
    <>
      <Reveal className="bl-svc__head">
        <span className="hv-eyebrow">The services behind this article</span>
        <h2 className="hv-h2">Where these ideas get built</h2>
        <p className="hv-lede">
          Each of these is a page of its own, and each one covers the part of this that is work rather than
          reading.
        </p>
      </Reveal>

      <ul className="bl-svc__grid">
        {items.map((item, i) => (
          <Reveal as="li" key={item.slug} index={i}>
            <Link className="hv-card hv-card--hover bl-svc__card" to={item.to}>
              <IconBadge icon={item.icon} />
              <h3>{item.title}</h3>
              <p>{item.why}</p>
              <span className="bl-svc__go" aria-hidden="true">
                Explore
                <Icon name="arrowRight" />
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>

      <Reveal className="bl-svc__foot" index={3}>
        <Btn to="/services" variant="outline" iconAfter="arrowRight">
          All services
        </Btn>
        <Btn to="/book" variant="ghost">
          Not sure which you need?
        </Btn>
      </Reveal>
    </>
  );
}

function FaqSection({ faq }) {
  if (!faq?.length) return null;

  /* id="faq": the rail's "Questions" pick deep-links here, so the anchor
     survives the section being reordered or renamed.

     No side card and no two-column split any more: the ask already lives in
     the article (mid-article band + embedded form) and in the rail, so a
     third contact panel beside the FAQ repeated the same offer three times
     on one page. The section is a centred column instead, which is also the
     reading shape questions want. */
  return (
    <HvSection mint className="bl-faq" id="faq">
      <Reveal className="bl-faq__head">
        <span className="hv-eyebrow">Common questions</span>
        <h2 className="hv-h2">Questions this article usually raises</h2>
        <p className="hv-body">
          Short answers to the things people ask before they call. If yours is not here, the consultation
          form above is the faster route.
        </p>
      </Reveal>

      <Reveal className="bl-faq__list">
        <Faq items={faq} />
      </Reveal>
    </HvSection>
  );
}

function Related({ posts }) {
  if (!posts.length) return null;

  return (
    <HvSection className="bl-related">
      <Reveal className="bl-related__head">
        <span className="hv-eyebrow">Keep reading</span>
        <h2 className="hv-h2">More from the blog</h2>
      </Reveal>

      <ul className="bl-grid">
        {posts.map((post, i) => (
          <PostCard key={post.slug} post={post} index={i} />
        ))}
      </ul>

      <Reveal className="bl-post__back">
        <Btn to="/blog" variant="outline" icon="chevronLeft">
          All posts
        </Btn>
      </Reveal>
    </HvSection>
  );
}

/**
 * The post's own tags, at the foot of the article.
 *
 * Plain text, not links: the listing filters by category and there is no tag
 * route, so making these clickable would mean shipping a chip that either
 * goes nowhere or lands on an unfiltered list. They are here to tell the
 * reader what the piece covered, which is the job a tag does on most blogs.
 * See the note in blog.css for what changes when tag filtering exists.
 */
function Tags({ tags }) {
  if (!tags?.length) return null;

  return (
    <Reveal className="bl-tags">
      <span className="bl-tags__label">Topics</span>
      <ul>
        {tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </Reveal>
  );
}

/**
 * The neighbouring posts, in publication order.
 *
 * Reads newest-first, so "Next" is the piece published after this one and
 * "Previous" the one before it. At either end of the catalogue one of the
 * two is null and the card that remains takes the full width (see
 * blog.css), rather than sitting in half a row.
 */
function Neighbours({ prev, next }) {
  if (!prev && !next) return null;

  return (
    <Reveal as="nav" className="bl-next" aria-label="Previous and next article">
      {prev && (
        <Link className="bl-next__item bl-next__item--prev" to={`/blog/${prev.slug}`}>
          <span className="bl-next__dir">
            <Icon name="chevronLeft" aria-hidden="true" />
            Previous
          </span>
          <span className="bl-next__title">{prev.title}</span>
        </Link>
      )}

      {next && (
        <Link className="bl-next__item bl-next__item--next" to={`/blog/${next.slug}`}>
          <span className="bl-next__dir">
            Next
            <Icon name="chevronRight" aria-hidden="true" />
          </span>
          <span className="bl-next__title">{next.title}</span>
        </Link>
      )}
    </Reveal>
  );
}

/** Shown instead of a redirect when the slug matches no post. Kept in the
 *  blog's own chrome with a route back into it, which is more use than
 *  bouncing the visitor to the site-wide 404. */
function PostNotFound({ slug }) {
  return (
    <Layout variant="v2">
      <PageMeta
        title="Post not found - GHLevelUp"
        description="That article does not exist. Browse every guide on the GHLevelUp blog instead."
        noIndex
      />
      <section className="bl-hero">
        <div className="hv-container bl-hero__inner">
          <p className="bl-hero__crumbs">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/blog">{BLOG_INDEX.crumb}</Link>
          </p>
          <span className="bl-hero__eyebrow">Not found</span>
          <h1 className="bl-hero__title">
            No post at
            <span>/blog/{slug}</span>
          </h1>
          <p className="bl-hero__lede">
            It may have been renamed, or the link may have come from somewhere that is out of date. Every
            guide we have is on the blog index.
          </p>
          <BtnRow className="bl-closing__actions">
            <Btn to="/blog" variant="primary" size="lg" iconAfter="arrowRight">
              Browse all posts
            </Btn>
            <Btn to="/contact" variant="outline" size="lg">
              Tell us what you were looking for
            </Btn>
          </BtnRow>
        </div>
      </section>
    </Layout>
  );
}

/* -- Page ------------------------------------------------------------------ */

export default function BlogPost() {
  const { slug } = useParams();
  const post = postBySlug(slug);

  /* Every hook runs before the early return below. Returning early first
     would change the number of hooks between renders the moment `slug`
     resolves differently, which is the one thing React's rules of hooks
     actually forbid at runtime. */
  const headings = useMemo(() => buildHeadings(post?.body || []), [post]);
  const ids = useMemo(() => idMap(headings), [headings]);
  const activeId = useActiveHeading(headings);
  const words = useMemo(() => wordCountOf(post), [post]);

  const split = useMemo(() => {
    if (!post) return { first: [], second: [], startIndex: 0 };
    const h2s = post.body.reduce((acc, block, i) => (block.type === "h2" ? [...acc, i] : acc), []);
    /* With a single h2 there is no sensible midpoint, so the band goes after
       the article instead of tearing a one-section piece in half. */
    const mid = h2s.length > 1 ? h2s[Math.floor(h2s.length / 2)] : null;
    if (mid === null) return { first: post.body, second: [], startIndex: 0 };
    return { first: post.body.slice(0, mid), second: post.body.slice(mid), startIndex: mid };
  }, [post]);

  const matched = useMemo(() => {
    if (!post) return [];
    return (post.relatedServices || [])
      .map((entry) => {
        const service = SERVICES[entry.slug];
        if (!service) return null;
        return { ...service, why: entry.why, to: `/services/${service.slug}` };
      })
      .filter(Boolean);
  }, [post]);

  const moreToRead = useMemo(() => (post ? relatedPosts(post.slug) : []), [post]);
  const neighbours = useMemo(() => (post ? neighboursOf(post.slug) : { prev: null, next: null }), [post]);

  /* The reading-progress bar measures the article element rather than the
     page, so it needs a handle on it. A ref rather than a query selector:
     nothing here depends on a class name in a stylesheet staying put. */
  const articleRef = useRef(null);

  if (!post) return <PostNotFound slug={slug} />;

  return (
    <Layout
      variant="v2"
      topbar={
        <>
          Free 20-minute consultation, no obligation. <Link to="/book">Grab a slot</Link>
        </>
      }
    >
      <PageMeta
        title={`${post.title} - GHLevelUp`}
        description={post.excerpt}
        ogDescription={post.summary}
        image={post.image}
      />

      <StructuredData
        article={{ ...post, wordCount: words }}
        faq={post.faq}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />

      <ReadingProgress target={articleRef} />

      <Hero post={post} words={words} />

      <HvSection className="bl-post__shell">
        <div className="bl-post__inner">
          <article ref={articleRef}>
            <Reveal>
              <figure className="bl-post__figure">
                <picture>
                  <source type="image/webp" srcSet={post.imageWebp} />
                  <img
                    src={post.image}
                    alt={post.imageAlt}
                    width={1200}
                    height={675}
                    fetchPriority="high"
                    decoding="async"
                  />
                </picture>
              </figure>
            </Reveal>

            <Reveal>
              <KeyPoints points={post.keypoints} />
            </Reveal>

            <Reveal>
              <ArticleBody blocks={split.first} ids={ids} />
            </Reveal>

            {/* The mid-article conversion block, INSIDE the reading flow:
                the band makes the offer, the form under it takes the
                enquiry without sending anyone to another section of the
                page. .bl-inline-form repaints the shared enquiry form for
                the light surface (see blog.css). */}
            <Reveal>
              <ConsultationBand extra="bl-cta--inline" />
            </Reveal>

            <Reveal className="bl-inline-form">
              <ServiceEnquiryForm
                id="blog-enquiry"
                eyebrow="Free consultation"
                title="Send it over instead"
                lede="Tell us where you are now and we will come back with what we would change first, what it would take and what it would cost. One reply, from a person, within one business day."
                points={[
                  "A reply from the team that would do the work",
                  "What we would fix first, in writing",
                  "Scope and cost confirmed before anything starts",
                ]}
                service={matched[0]?.title || "GHLevelUp"}
                sourceLabel={`Blog post enquiry - ${post.title}`}
              />
            </Reveal>

            {split.second.length > 0 && (
              <Reveal>
                <ArticleBody blocks={split.second} ids={ids} startIndex={split.startIndex} />
              </Reveal>
            )}

            <Tags tags={post.tags} />

            <Neighbours prev={neighbours.prev} next={neighbours.next} />

            <Reveal className="bl-author">
              <span className="bl-author__mark" aria-hidden="true">
                {BLOG_AUTHOR.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)}
              </span>
              <div>
                <p className="bl-author__who">
                  {BLOG_AUTHOR.name}
                  <span className="bl-author__role">{BLOG_AUTHOR.role}</span>
                </p>
                <p className="bl-author__bio">
                  Writes about the systems behind getting found and getting booked: CRM setup, follow-up,
                  AI agents and the websites that feed them. <Link to={BLOG_AUTHOR.href}>More about us</Link>.
                </p>
              </div>
            </Reveal>
          </article>

          {/* Second in the DOM, moved above the article on narrow screens by
              `order` in blog.css, so a phone gets the contents list first
              without the markup differing between breakpoints.

              The rail is a flex column: the sticky group (contents + a mini
              consultation card) rides the top, and the filler blocks below
              absorb the runway the group cannot cover, so the rail is
              occupied for the article's whole length instead of dying after
              a screenful. */}
          <aside className="bl-post__aside">
            <Reveal className="bl-rail__group">
              <ContentsList headings={headings} activeId={activeId} />

              {/* A small, quiet ask that travels WITH the contents: the two
                  ride the article together inside one sticky group, so a
                  reader who decides partway down never has to hunt for the
                  button - and the space under the contents list is working
                  instead of sitting empty. Quieter than the mid-article band
                  by design: it interrupts nothing from here. */}
              <div className="bl-rail__cta">
                <span className="bl-rail__cta-eyebrow">Free consultation</span>
                <p className="bl-rail__cta-title">Want this built for you?</p>
                <p className="bl-rail__cta-text">Twenty minutes, the first two things we would change, in writing.</p>
                <Btn to="/book" variant="primary" className="bl-rail__cta-btn" iconAfter="arrowRight">
                  Grab a slot
                </Btn>
              </div>
            </Reveal>

            {/* Runway filler: three quiet, real blocks under the sticky group
                so the column is occupied for the article's whole length
                rather than blank below the fold. They scroll away naturally -
                only the group above sticks. */}
            <div className="bl-rail__fill">
              {matched.length > 0 && (
                <div className="bl-rail__pick">
                  <span className="bl-rail__pick-label">Build it with</span>
                  <Link to={matched[0].to} className="bl-rail__pick-link">
                    {matched[0].title}
                    <Icon name="arrowRight" aria-hidden="true" />
                  </Link>
                </div>
              )}

              <div className="bl-rail__pick">
                <span className="bl-rail__pick-label">Newest guide</span>
                {neighbours.next ? (
                  <Link to={`/blog/${neighbours.next.slug}`} className="bl-rail__pick-link">
                    {neighbours.next.title}
                    <Icon name="arrowRight" aria-hidden="true" />
                  </Link>
                ) : (
                  <Link to="/blog" className="bl-rail__pick-link">
                    Browse the blog
                    <Icon name="arrowRight" aria-hidden="true" />
                  </Link>
                )}
              </div>

              <div className="bl-rail__pick">
                <span className="bl-rail__pick-label">Questions</span>
                <a href="#faq" className="bl-rail__pick-link">
                  What people ask first
                  <Icon name="arrowRight" aria-hidden="true" />
                </a>
              </div>
            </div>
          </aside>
        </div>
      </HvSection>

      <HvSection mint className="bl-svc">
        <MatchedServices items={matched} />
      </HvSection>

      <Related posts={moreToRead} />

      <FaqSection faq={post.faq} />
    </Layout>
  );
}
