import Reveal from "./Reveal.jsx";
import BtnRow from "./BtnRow.jsx";

/**
 * `.cta-band` - the dark rounded callout that closes almost every page.
 * `actions` is an array of already-built <Button> elements (kept as
 * children rather than a data prop, since every band's buttons differ in
 * variant/icon/label and there are only ever one or two of them).
 */
export default function CtaBand({ title, children, actions, note }) {
  return (
    <Reveal className="cta-band">
      <h2 className="balance">{title}</h2>
      <p>{children}</p>
      <BtnRow>{actions}</BtnRow>
      {note && <p className="cta-band__note">{note}</p>}
    </Reveal>
  );
}
