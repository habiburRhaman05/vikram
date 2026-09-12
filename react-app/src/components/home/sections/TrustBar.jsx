import Icon from "@/components/common/Icon.jsx";
import { TRUST_LABEL, TRUST_LOGOS } from "@/data/homeV2";

/**
 * Client logo strip. Rendered as icon + wordmark lockups rather than
 * image files - swap in real logos by adding an `image` to each entry in
 * TRUST_LOGOS and rendering an <img> here.
 *
 * A <ul> rather than a row of <span>s: it is a list of named companies,
 * and a screen reader announcing "list, 8 items" is genuinely useful
 * context for a trust signal.
 */
export default function TrustBar() {
  return (
    <section className="hv-trust" aria-labelledby="trust-label">
      <div className="hv-container">
        <p className="hv-trust__label" id="trust-label">
          {TRUST_LABEL}
        </p>
        <ul className="hv-trust__list">
          {TRUST_LOGOS.map((logo) => (
            <li key={logo.name} className="hv-trust__item">
              <Icon name={logo.icon} strokeWidth={1.8} aria-hidden="true" />
              <span>{logo.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
