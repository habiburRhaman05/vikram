import Reveal from "./Reveal.jsx";

/**
 * `.section-head` - the eyebrow + h2 + intro paragraph that opens most
 * sections. `center` matches `.section-head--center`.
 */
export default function SectionHead({ eyebrow, title, children, center = false, index = 0 }) {
  return (
    <Reveal className={`section-head ${center ? "section-head--center" : ""}`.trim()} index={index}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="balance">{title}</h2>
      {children && <p>{children}</p>}
    </Reveal>
  );
}
