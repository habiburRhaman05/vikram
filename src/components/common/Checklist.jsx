import { isValidElement } from "react";
import Icon from "./Icon.jsx";

/**
 * `.checklist` - the check-icon bullet list used throughout (spotlights,
 * plans, legal pages). `items` is an array of plain strings, JSX
 * (wherever a bullet needs an &amp;/<strong> etc.), or `{ text, html }`
 * when a bullet needs raw HTML - pass `html` only for trusted,
 * page-authored copy, never user input.
 */
export default function Checklist({ items, className = "", style }) {
  return (
    <ul className={`checklist ${className}`.trim()} style={style}>
      {items.map((item, i) => {
        const isPlain = isValidElement(item) || typeof item !== "object" || item === null;
        return (
          <li key={i}>
            <Icon name="check" />
            {isPlain ? (
              <span>{item}</span>
            ) : item.html ? (
              <span dangerouslySetInnerHTML={{ __html: item.html }} />
            ) : (
              <span>{item.text}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
