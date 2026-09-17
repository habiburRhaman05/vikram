/**
 * The blog's access layer.
 *
 * THE POSTS THEMSELVES ARE NOT HERE. They are in data/blog-posts.json, which
 * holds records and nothing else: no imports, no comments inside records, no
 * derived values. This module reads that file and exposes what the pages
 * need. Everything below this comment survives a move to a database; only
 * the loading step at the top changes.
 *
 * REPLACING THE JSON WITH A DB OR CMS
 *   The shape is already the shape a table wants: one record per post, a
 *   slug as the key, and `body` as structured data rather than markup to be
 *   parsed back out of a rich-text blob.
 *
 *   For a build-time source (a CMS fetched at deploy, or a generated file),
 *   swap the import below for that source and everything else keeps working
 *   unchanged. For a runtime source, this module has to become async, and
 *   the honest scope of that is: the four value exports (POSTS,
 *   SORTED_POSTS, BLOG_CATEGORIES, LATEST_POSTS) move behind a loader or
 *   context, and the two functions become fetch calls. The pages read these
 *   through named imports in three files (Blog.jsx, BlogPost.jsx,
 *   homeV2.jsx), so that is the whole blast radius. Deliberately not done
 *   yet: an async layer would add a loading state to three pages to serve a
 *   data source that does not exist.
 *
 *   Whenever that happens, keep the exports named the same way. That is the
 *   point of this file existing at all.
 *
 * WHY THE CONTENT RULES LIVE HERE
 *   JSON cannot carry comments, so the two rules the posts are written to
 *   live in this header instead, next to the code that publishes them:
 *     1. No invented client results and no invented metrics. Where a number
 *        appears it is either a published third-party threshold with its
 *        source named in the text, or arithmetic from an assumption stated
 *        in the same paragraph. Never a performance claim about GHLevelUp.
 *     2. No em dashes. The site uses them nowhere.
 *
 * SHAPE OF A POST
 *   slug, category, title, excerpt, date, dateLabel, updated, readMins,
 *   image, imageWebp, imageAlt, tags, summary, keypoints { title, items },
 *   body [blocks], faq [{ question, answer }], relatedServices [{ slug, why }]
 *
 *   A block is `{ type, text }` or `{ type, items }` or `{ type, head, rows }`.
 *   The types are the renderer's vocabulary and the two have to stay in step:
 *   lead, p, h2, h3, ul, ol, quote, note, table. Adding one means a case in
 *   components/blog/ArticleBody.jsx and adding it to BLOCK_TYPES below, which
 *   is what the development check at the foot of this file enforces.
 *
 *   h2 and h3 blocks are the article's outline: BlogPost.jsx builds the table
 *   of contents and the anchor ids straight from them, so a heading is a
 *   navigation target with no extra bookkeeping anywhere.
 */
import postsJson from "./blog-posts.json";
import { SITE } from "./site.js";

/* -- Reading the source ---------------------------------------------------- */

/**
 * Every record, in file order.
 *
 * `postsJson.posts` is asserted rather than trusted: a JSON import is
 * `any` to the bundler, and a source file that has been edited by hand (or
 * fetched from a CMS) can arrive empty or with the wrong root shape. Failing
 * loudly at import time with a clear message beats a blank blog page and a
 * stack trace pointing at a card component.
 */
const records = Array.isArray(postsJson) ? postsJson : postsJson.posts;

if (!Array.isArray(records)) {
  throw new Error(
    "data/blog-posts.json must be an array, or an object with a `posts` array. " +
      `Received: ${typeof postsJson}.`
  );
}

/** The block types the renderer knows how to draw. Kept next to the check
 *  that uses it; see the note above about keeping it in step with
 *  ArticleBody.jsx. */
const BLOCK_TYPES = ["lead", "p", "h2", "h3", "ul", "ol", "quote", "note", "table"];

export const POSTS = records;

/* -- Derived order ---------------------------------------------------------
   POSTS is file order. "Newest first" is computed from the dates rather than
   assumed, so a backdated post added at the bottom of the file still files
   itself in the right place on the listing, the home page teaser and the
   sitemap. */
const BY_DATE = [...POSTS].sort((a, b) => String(b.date).localeCompare(String(a.date)));

/** Every post, newest first. The listing and the sitemap read this. */
export const SORTED_POSTS = BY_DATE;

/**
 * Categories, in the order they first appear going newest first, so the
 * filter row leads with the category of the current featured post.
 *
 * Derived rather than hand-listed: the filter row on /blog can then never
 * offer a topic with nothing behind it, and a new category appears the first
 * time a post uses it.
 */
export const BLOG_CATEGORIES = [];
for (const post of BY_DATE) {
  if (!BLOG_CATEGORIES.includes(post.category)) BLOG_CATEGORIES.push(post.category);
}

/** The three newest posts, for the home page's teaser. The home page can
 *  change how many it shows by changing this, not by slicing POSTS itself. */
export const LATEST_POSTS = BY_DATE.slice(0, 3);

/* -- Page copy and identity ------------------------------------------------ */

/** The listing page's own copy. Here rather than in the JSON because it
 *  describes the page, not the posts: it would not move with the posts to a
 *  database. */
export const BLOG_INDEX = {
  crumb: "Blog",
  eyebrow: "Blog & resources",
  titleLead: "Practical guides for",
  titleAccent: "systems that sell",
  lede:
    "Straight answers about CRM, follow-up, AI agents, funnels and websites, written from the work rather than from a keyword list. No gated PDFs, no webinar funnels, nothing you have to trade an email for.",
  featuredLabel: "Latest post",
  allLabel: "All posts",
};

/** The listing page's own FAQ - the questions people ask about the guides
 *  and about working with us. Rendered at the foot of /blog and published
 *  as FAQPage structured data. Kept here rather than in the JSON because,
 *  like BLOG_INDEX, it describes the page, not any one post. */
export const BLOG_FAQ = {
  eyebrow: "Common questions",
  title: "Before you go",
  lede:
    "Quick answers about the blog and about working with us. If yours is not here, the consultation form is the fastest route to an answer.",
  items: [
    {
      question: "Are the guides on this blog free to read?",
      answer:
        "Yes, all of them, with no email gate and no PDF download. Everything we publish here is the same advice we give clients on a call, written up so you can act on it yourself.",
    },
    {
      question: "How often do you publish new posts?",
      answer:
        "When there is something worth saying from real client work, usually a new guide every couple of weeks. New posts appear first on this listing, and the newest one is pinned at the top as the featured guide.",
    },
    {
      question: "What is the fastest way to find posts on a topic?",
      answer:
        "Use the topic filter at the top of this page: All posts, GoHighLevel, AI Automation, Web & Conversion and Reporting. The count on each chip shows how many guides are filed there.",
    },
    {
      question: "Do you offer done-for-you GoHighLevel setups?",
      answer:
        "Yes. We build the CRM pipelines, follow-up automation, funnels, websites and reporting dashboards the guides describe. The matched-services cards on each article point to the exact service for that topic.",
    },
    {
      question: "Can you use AI agents with my existing CRM?",
      answer:
        "In most cases, yes. Our AI agents work alongside GoHighLevel and most mainstream CRMs over API. If a system cannot support it, we say so on the first call rather than selling you a rebuild you do not need.",
    },
    {
      question: "What does a free consultation actually cover?",
      answer:
        "Twenty minutes on how you get leads today and what we would change first. You leave with a written plan whether or not you use us, and if we are not a good fit we say so.",
    },
  ],
};

/** The byline on every post, and the name the BlogPosting structured data
 *  publishes as its author. Name and role come from data/site.js so the
 *  byline, the About page and the home page's founder note cannot disagree
 *  about who the person is. */
export const BLOG_AUTHOR = { ...SITE.founder };

/* -- Lookups --------------------------------------------------------------- */

/** A post by slug, or undefined. Used by the detail page to resolve its
 *  route param and by the related-post cards. */
export function postBySlug(slug) {
  return POSTS.find((post) => post.slug === slug);
}

/**
 * Other posts to show under an article: same category first, then the
 * newest of everything else, so a reader always gets a full row even when a
 * category has only one post in it. Never includes the post being read, so
 * a page can never link to itself.
 */
export function relatedPosts(slug, limit = 3) {
  const current = postBySlug(slug);
  if (!current) return BY_DATE.slice(0, limit);

  const others = BY_DATE.filter((post) => post.slug !== slug);
  const sameCategory = others.filter((post) => post.category === current.category);
  const rest = others.filter((post) => post.category !== current.category);

  return [...sameCategory, ...rest].slice(0, limit);
}

/** The post before and after this one, newest-first, for the foot of an
 *  article. `next` is the newer piece, `prev` the older one, which is what
 *  the labels on the page assume. */
export function neighboursOf(slug) {
  const i = BY_DATE.findIndex((post) => post.slug === slug);
  if (i === -1) return { prev: null, next: null };
  return {
    next: i > 0 ? BY_DATE[i - 1] : null,
    prev: i < BY_DATE.length - 1 ? BY_DATE[i + 1] : null,
  };
}

/**
 * Rough word count for a post, from its own blocks rather than a number
 * typed into the record.
 *
 * A hand-written count goes stale the first time someone edits a paragraph,
 * and a stale count on the page is a small but visible lie. Counting the
 * blocks cannot drift. It is an estimate by design: it counts `body`, so
 * headings and table cells are included but the key-points box and the FAQ
 * are not, which is close enough for the "about N words" line and for the
 * wordCount field in the structured data.
 */
export function wordCountOf(post) {
  if (!post?.body) return 0;

  let words = 0;
  for (const block of post.body) {
    for (const value of [block.text, block.title, block.head?.join(" "), block.items?.join(" "), block.rows?.flat().join(" ")]) {
      if (value) words += String(value).split(/\s+/).filter(Boolean).length;
    }
  }
  return words;
}

/* -- Development check -----------------------------------------------------
   Runs once at import time in development only, so it costs nothing in the
   build and never runs for a visitor.

   This exists because the data is now JSON: a hand-edited file can be
   missing a field or mistype a block type, and both fail quietly. A missing
   `image` renders a card with a broken frame; an unknown block type renders
   a silent gap in the middle of an article. Loud in dev, invisible in
   production, which is the right way round. */
if (import.meta.env?.DEV) {
  const required = ["slug", "category", "title", "excerpt", "date", "dateLabel", "readMins", "image", "summary"];
  const problems = [];
  const seen = new Set();

  for (const post of POSTS) {
    const where = post?.slug || "(record with no slug)";

    for (const field of required) {
      if (!post?.[field]) problems.push(`${where}: missing "${field}"`);
    }
    if (post?.slug && seen.has(post.slug)) problems.push(`${where}: duplicate slug`);
    if (post?.slug) seen.add(post.slug);

    if (Number.isNaN(Date.parse(post?.date))) problems.push(`${where}: "date" is not a date`);

    if (!Array.isArray(post?.body) || post.body.length === 0) {
      problems.push(`${where}: "body" is missing or empty`);
    } else {
      post.body.forEach((block, i) => {
        if (!BLOCK_TYPES.includes(block?.type)) {
          problems.push(`${where}: body[${i}] has unknown type "${block?.type}"`);
        }
      });
      if (!post.body.some((b) => b.type === "h2")) problems.push(`${where}: no h2 block, so no contents list`);
    }

    for (const entry of post?.relatedServices || []) {
      if (!entry?.slug) problems.push(`${where}: a relatedServices entry has no slug`);
    }
  }

  if (problems.length) {
    console.warn(`[blog] ${problems.length} problem(s) in data/blog-posts.json:`);
    for (const problem of problems) console.warn("  - " + problem);
  }
}
