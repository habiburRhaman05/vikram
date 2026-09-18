import { Fragment } from "react";
import Checklist from "./Checklist.jsx";
import Reveal from "./Reveal.jsx";

/** Shared renderer for Privacy/Terms - both pages are just a "Last
 * updated" line followed by a series of `<h3>` + (paragraph or
 * checklist) sections; identical structure, only the copy differs. */
export default function LegalBody({ sections }) {
  const year = new Date().getFullYear();
  return (
    <Reveal>
      <p style={{ color: "var(--muted)", fontSize: ".9rem" }}>Last updated: {year}</p>
      {sections.map((section, i) => (
        <Fragment key={i}>
          <h3 style={{ margin: "36px 0 12px" }}>{section.heading}</h3>
          {section.checklist ? (
            <Checklist items={section.checklist} />
          ) : (
            <p style={{ color: "var(--text-mid)" }}>{section.body}</p>
          )}
        </Fragment>
      ))}
    </Reveal>
  );
}
