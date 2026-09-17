import { slugify } from "@/lib/slugify.js";

/**
 * Renders one article's `body` array (see data/blog.js for the format).
 *
 * A switch over block types rather than a library or a Markdown parser.
 * The copy is authored in this repo by us, the type set is small, and a
 * dependency that converts strings to elements is a dependency that can
 * inject HTML. Adding a new block type is one more case here and every
 * existing post can use it the same day.
 *
 * The renderer takes an optional `startIndex` so an article can be rendered
 * in two halves with the consultation band between them (see BlogPost.jsx)
 * while still agreeing with the table of contents about heading ids. That
 * agreement is the whole reason ids are computed once by buildHeadings (in
 * lib/headings.js) and passed in rather than each half inventing its own:
 * two halves numbering from zero would produce two headings with the id
 * "the-first-five-minutes".
 */

function Table({ block }) {
  /* A table wide enough to need scrolling has to be reachable without a
     mouse. role="region" plus tabindex makes it one keyboard stop that
     arrow keys can scroll, which is the WCAG requirement for a scrollable
     region, and the label tells a screen reader what it just entered. */
  const label = block.label || `Table: ${block.head.join(", ")}`;

  return (
    <div className="bl-table" role="region" aria-label={label} tabIndex={0}>
      <table>
        {block.head && (
          <thead>
            <tr>
              {block.head.map((cell) => (
                <th key={cell} scope="col">
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {block.rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ArticleBody({ blocks = [], startIndex = 0, ids = {} }) {
  return (
    <div className="bl-prose">
      {blocks.map((block, i) => {
        const key = `${block.type}-${startIndex + i}`;

        switch (block.type) {
          case "lead":
            return (
              <p className="bl-lead" key={key}>
                {block.text}
              </p>
            );

          case "p":
            return <p key={key}>{block.text}</p>;

          case "h2":
          case "h3": {
            const Tag = block.type;
            /* ids[startIndex + i] comes from buildHeadings, which the page
               computed over the WHOLE body. The fallback keeps a bare
               ArticleBody renderable on its own, at the cost of a suffix-less
               duplicate id, which is why the page always passes ids. */
            const id = ids[startIndex + i] || slugify(block.text);
            return (
              <Tag id={id} key={key}>
                {block.text}
              </Tag>
            );
          }

          case "ul":
            return (
              <ul key={key}>
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );

          case "ol":
            return (
              <ol key={key}>
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ol>
            );

          case "quote":
            return (
              <blockquote key={key}>
                {block.text}
                {block.cite && <cite>{block.cite}</cite>}
              </blockquote>
            );

          case "note":
            return (
              <aside className="bl-note" key={key}>
                <span className="bl-note__title">{block.title}</span>
                <p>{block.text}</p>
              </aside>
            );

          case "table":
            return <Table block={block} key={key} />;

          default:
            /* Unknown type: render nothing rather than an empty element, and
               say so in development. A typo in a block's `type` should be
               loud in dev and invisible in production, never a blank gap in
               the middle of an article with no explanation. */
            if (import.meta.env.DEV) {
              console.warn(`[ArticleBody] Unknown block type "${block.type}" at index ${startIndex + i}.`);
            }
            return null;
        }
      })}
    </div>
  );
}
