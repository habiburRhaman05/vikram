import Icon from "@/components/common/Icon.jsx";
import { HvSection, Reveal, ArrowLink } from "../primitives.jsx";
import { FOUNDER } from "@/data/homeV2";

/** Initials for the fallback portrait, so the slot still looks deliberate
 *  before a real photograph exists. Two letters at most - three or more
 *  stops reading as a monogram and starts reading as an abbreviation. */
function initials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

/**
 * The founder's note - portrait on the left, a signed message on the
 * right, sitting between the numbers (Impact) and the client quotes
 * (Testimonials): the page states what it does, then who is behind it,
 * then lets clients back it up.
 *
 * The message is marked up as a <blockquote> with a <cite> rather than a
 * bare paragraph: it is attributed speech, and that is what tells a
 * screen reader where the quote ends and the attribution begins.
 *
 * THE PORTRAIT IS OPTIONAL. With no FOUNDER.photo set it renders the
 * initials on the brand gradient instead of a broken image, so the
 * section can ship and look finished before the photograph arrives.
 */
export default function Founder() {
  const { eyebrow, name, role, photo, message, signature, cta } = FOUNDER;

  return (
    <HvSection mint className="hv-founder">
      <Reveal className="hv-founder__grid">
        <div className="hv-founder__portrait">
          {photo ? (
            <picture className="hv-founder__photo">
              
              <img src={`${photo}`} alt={`${name}, ${role}`} width="560" height="640" decoding="async" />
            </picture>
          ) : (
            <span className="hv-founder__monogram" aria-hidden="true">
              {initials(name)}
            </span>
          )}
          {/* Decorative: the quote mark that anchors the note to the
              portrait. The real quotation lives in the blockquote. */}
         
        </div>

        <div className="hv-founder__body">
          <span className="hv-eyebrow">{eyebrow}</span>
          <blockquote className="hv-founder__message">
            <p>{message}</p>
            <footer className="hv-founder__attrib">
              <span className="hv-founder__sign" aria-hidden="true">
                {signature}
              </span>
              <cite>
                <strong>{name}</strong>
                <span>{role}</span>
              </cite>
            </footer>
          </blockquote>
          {cta && (
            <ArrowLink to={cta.to} className="hv-founder__cta">
              {cta.label}
            </ArrowLink>
          )}
        </div>
      </Reveal>
    </HvSection>
  );
}
