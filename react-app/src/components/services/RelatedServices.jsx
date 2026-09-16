import { Link } from "react-router-dom";
import Icon from "@/components/common/Icon.jsx";
import { HvSection, Reveal, Btn } from "@/components/home/primitives.jsx";
import { relatedFor } from "@/data/serviceLinks.js";

/**
 * "Works well with" - the cross-links between service detail pages.
 *
 * `slug` is the page this is rendered ON, not a destination: the component
 * looks its own related set up in data/serviceLinks.js, which also supplies
 * the one-line reason each neighbour matters *from here*. So the module is
 * the same component on all six pages but never the same three sentences,
 * which is what stops it reading as a generic shelf.
 *
 * Every card is a whole-card <Link> to a route that genuinely exists (see
 * the note in serviceLinks.js about why the placeholder services are left
 * out). The visible title carries the link's accessible name, so a screen
 * reader's link list shows three distinct destinations rather than three
 * identical "Learn more"s.
 */
export default function RelatedServices({ slug, eyebrow = "Works well with", title, lede }) {
  const items = relatedFor(slug);
  if (!items.length) return null;

  return (
    <HvSection mint className="sd-rel">
      <Reveal className="sd-rel__head">
        <span className="hv-eyebrow">{eyebrow}</span>
        <h2 className="hv-h2">{title || "Pairs with the rest of the stack"}</h2>
        {lede && <p className="hv-lede">{lede}</p>}
      </Reveal>

      <ul className="sd-rel__grid">
        {items.map((item, i) => (
          <Reveal as="li" key={item.slug} index={i}>
            <Link className="sd-rel__card" to={item.to}>
              <span className="sd-rel__icon" aria-hidden="true">
                <Icon name={item.icon} />
              </span>

              <h3>{item.title}</h3>
              <p className="sd-rel__why">{item.why}</p>

              <span className="sd-rel__go" aria-hidden="true">
                Explore
                <Icon name="arrowRight" />
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>

      <Reveal className="sd-rel__foot" index={3}>
        <Btn to="/services" variant="outline" iconAfter="arrowRight">
          See all services
        </Btn>
        <Btn to="/contact" variant="ghost">
          Not sure which you need?
        </Btn>
      </Reveal>
    </HvSection>
  );
}
