import Icon from "@/components/common/Icon.jsx";
import ScriptNote from "../ScriptNote.jsx";
import { HvSection, Reveal, Btn, BtnRow } from "../primitives.jsx";
import { CLOSING } from "@/data/homeV2";

/**
 * Closing CTA. Full-bleed dark so it runs straight into the site footer
 * (which is also dark) as one continuous block, matching the reference -
 * rather than a floating dark card on a light strip.
 */
export default function ClosingCta() {
  return (
    <HvSection dark className="hv-closing">
      <div className="hv-closing__inner">
        <Reveal className="hv-closing__copy">
          <span className="hv-eyebrow">{CLOSING.eyebrow}</span>
          <h2 className="hv-h2">{CLOSING.title}</h2>
          <p className="hv-lede">{CLOSING.lede}</p>
          <BtnRow className="hv-closing__actions">
            <Btn to={CLOSING.primary.to} variant="primary" size="lg" iconAfter={CLOSING.primary.icon}>
              {CLOSING.primary.label}
            </Btn>
            <Btn to={CLOSING.secondary.to} variant="outline" size="lg">
              {CLOSING.secondary.label}
            </Btn>
          </BtnRow>
        </Reveal>

        <div className="hv-closing__note" aria-hidden="true">
          <ScriptNote direction="down-right">{CLOSING.note}</ScriptNote>
          <Icon name="plane" className="hv-closing__plane" strokeWidth={1.8} />
        </div>
      </div>
    </HvSection>
  );
}
