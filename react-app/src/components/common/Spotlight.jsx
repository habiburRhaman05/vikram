import Reveal from "./Reveal.jsx";

/**
 * `.spotlight` - the alternating two-column (copy + media mock) feature
 * row used on Home and Platform. `flip` matches `.spotlight--flip`
 * (media on the left instead of the right).
 */
export default function Spotlight({ flip = false, copy, media, index = 0 }) {
  return (
    <Reveal className={`spotlight ${flip ? "spotlight--flip" : ""}`.trim()} index={index}>
      <div className="spotlight__copy">{copy}</div>
      <div className="spotlight__media">{media}</div>
    </Reveal>
  );
}
