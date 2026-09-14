import { Fragment, useState } from "react";
import Icon from "@/components/common/Icon.jsx";
import { HvSection, Reveal } from "../primitives.jsx";
import { WHY_ICONS } from "../whyIcons.jsx";
import { WHY } from "@/data/homeV2";

/**
 * "Why choose us" - an accordion whose open item also drives the photo
 * beside it.
 *
 * Two things worth knowing:
 *
 * 1. All four photos are rendered, stacked, and crossfaded by opacity.
 *    Swapping a single <img src> would show a blank frame on first open of
 *    each item while the new file decoded, and would shift nothing into
 *    place until it landed. Stacking costs four small WebPs up front and
 *    makes the transition free afterwards. They are decorative - the
 *    accordion text carries the meaning - so they take alt="".
 *
 * 2. The panel animates on grid-template-rows 0fr -> 1fr rather than
 *    max-height. max-height has to guess a value larger than the content,
 *    which makes the timing wrong for short panels and clips long ones.
 *    0fr/1fr animates the real height with no magic number.
 */
export default function WhyChooseUs() {
  const [open, setOpen] = useState(0);
  /* Hovering a row previews its photo without opening the panel. Opening
     on hover instead would reflow the list under the cursor as you swept
     down it, which is the kind of "animation" that just feels broken. */
  const [preview, setPreview] = useState(null);
  const shown = preview ?? open;

  return (
    <HvSection id="why">
      <Reveal className="hv-why__head">
        {/* Standard .hv-eyebrow - every other section's eyebrow (Solutions,
            Stack, Work...) uses this exact class via SectionHead. This
            section used to have its own bespoke middot+italic eyebrow
            styling; the heading below stays custom (lighter weight, larger,
            centred) since that treatment was never the reported problem. */}
        <span className="hv-eyebrow hv-why__eyebrow">{WHY.eyebrow}</span>
        <h2 className="hv-why__title">{WHY.title}</h2>
      </Reveal>

      <div className="hv-why__body">
        <Reveal className="hv-why__media">
          <div className="hv-why__frame">
            {WHY.items.map((item, i) => (
              <picture
                key={item.id}
                className={`hv-why__shot${i === shown ? " is-active" : ""}`}
              >
                <source type="image/webp" srcSet={item.imageWebp} />
                <img
                  src={item.image}
                  alt=""
                  width={1040}
                  height={875}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            ))}
          </div>
        </Reveal>

        <div className="hv-why__list">
          {WHY.items.map((item, i) => {
            const isOpen = i === open;
            return (
              <Reveal
                key={item.id}
                index={i}
                className={`hv-why__item${isOpen ? " is-open" : ""}`}
              >
                <h3 className="hv-why__heading">
                  <button
                    type="button"
                    className="hv-why__trigger"
                    aria-expanded={isOpen}
                    aria-controls={`why-panel-${item.id}`}
                    id={`why-trigger-${item.id}`}
                    /* Exactly one item is always open. Clicking another
                       opens it and closes the current one; clicking the one
                       already open does nothing, so the list can never end
                       up with every item collapsed. */
                    onClick={() => setOpen(i)}
                    onMouseEnter={() => setPreview(i)}
                    onMouseLeave={() => setPreview(null)}
                    onFocus={() => setPreview(i)}
                    onBlur={() => setPreview(null)}
                  >
                    <span className="hv-why__icon">{WHY_ICONS[item.icon]}</span>
                    <span className="hv-why__label">
                      {item.titleLines.map((line, n) => (
                        <Fragment key={line}>
                          {n > 0 && <br />}
                          {line}
                        </Fragment>
                      ))}
                    </span>
                    <span className="hv-why__go" aria-hidden="true">
                      <Icon name="chevronRight" />
                    </span>
                  </button>
                </h3>

                <div
                  className="hv-why__panel"
                  id={`why-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`why-trigger-${item.id}`}
                >
                  <div className="hv-why__panel-inner">
                    <p className="hv-why__text">{item.body}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </HvSection>
  );
}
