/**
 * Handwritten annotation with a hand-drawn arrow - the two "Custom
 * solutions for your unique goals" / "Let's create something amazing
 * together!" marks in the reference.
 *
 * Entirely decorative: the arrow is aria-hidden, and the text is a real
 * text node so it still reads in the accessibility tree (it carries
 * meaning) but is never the only place that meaning appears.
 *
 * `direction` picks which way the arrow curves so the mark can sit on
 * either side of what it points at.
 */
export default function ScriptNote({ children, direction = "down-left", className = "" }) {
  return (
    <div className={`hv-script-note hv-script-note--${direction} ${className}`.trim()}>
      <p className="hv-script-note__text">{children}</p>
      <svg
        className="hv-script-note__arrow"
        viewBox="0 0 90 70"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        {/* a loose, slightly wobbly curve so it reads as drawn, not vector-perfect */}
        <path
          d="M78 6C74 26 63 43 44 52c-9 4-19 5-28 4"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M24 47c-4 4-7 7-8 9 3 1 7 2 11 2"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
