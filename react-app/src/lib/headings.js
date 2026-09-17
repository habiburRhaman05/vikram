import { slugify } from "@/lib/slugify.js";

/**
 * Heading ids for a block-based article body (see data/blog.js).
 *
 * These live here rather than beside the renderer in
 * components/blog/ArticleBody.jsx for two reasons: a module that exports a
 * component and plain functions defeats React fast refresh, so lint is right
 * to flag it, and the ids are needed by two consumers that must agree
 * exactly. The table of contents builds its links from them and the renderer
 * stamps them on the headings. One function, two callers, no drift.
 */

/**
 * Every h2/h3 in the body, with the id it will be rendered with.
 *
 * `index` is the block's position in the WHOLE body, not in the slice being
 * rendered. That is what lets an article be rendered in two halves, with the
 * consultation band between them, and still have the second half's headings
 * numbered and anchored as if the article were one run of blocks.
 *
 * Duplicate heading text is real (two sections both called "What to do
 * next") and duplicate ids break both the anchor and the contents list, so
 * repeats get a numeric suffix. Derived from position, so it is stable
 * across renders and does not depend on state.
 */
export function buildHeadings(blocks = []) {
  const seen = new Map();
  const headings = [];

  blocks.forEach((block, index) => {
    if (block.type !== "h2" && block.type !== "h3") return;

    const base = slugify(block.text) || `section-${index + 1}`;
    const count = (seen.get(base) || 0) + 1;
    seen.set(base, count);

    headings.push({
      index,
      level: block.type,
      text: block.text,
      id: count === 1 ? base : `${base}-${count}`,
    });
  });

  return headings;
}

/** Block index (across the whole body) to heading id, for the renderer. */
export function idMap(headings) {
  return Object.fromEntries(headings.map((h) => [h.index, h.id]));
}
