import { Link } from "react-router-dom";
import Icon from "@/components/common/Icon.jsx";
import { Btn } from "./primitives.jsx";
import { SITE } from "@/data/site";
import { FOOTER_COLUMNS, FOOTER_SOCIAL } from "@/data/homeV2";

/**
 * Redesigned site footer: brand + contact block, four link columns,
 * social row and a legal bar.
 *
 * Internal destinations use <Link> so navigation stays client side;
 * tel:/mailto:/external use plain anchors. Social links carry an
 * accessible name because the glyph alone says nothing to a screen
 * reader, and rel="noopener noreferrer" because they open in a new tab.
 */
export default function SiteFooterV2() {
  const year = new Date().getFullYear();

  return (
    <footer className="hv-footer">
      <div className="hv-container">
        <div className="hv-footer__top">
          <div className="hv-footer__brand">
            <Link className="hv-footer__logo" to="/" aria-label="GHLevelUp home">
              <picture>
                <source type="image/webp" srcSet="/img/footer-logo.webp 1x, /img/footer-logo@2x.webp 2x" />
                <img
                  src="/img/footer-logo.png"
                  srcSet="/img/footer-logo.png 1x, /img/footer-logo@2x.png 2x"
                  alt="GHLevelUp"
                  width={178}
                  height={64}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </Link>

            <p className="hv-footer__pitch">
              CRM, AI automation, web development and creative, built and supported by one team so
              your systems actually talk to each other.
            </p>

            <ul className="hv-footer__contact">
              <li>
                <Icon name="phone" aria-hidden="true" />
                <a href={SITE.phoneHref}>{SITE.phone}</a>
              </li>
              <li>
                <Icon name="mail" aria-hidden="true" />
                <a href={SITE.emailHref}>{SITE.email}</a>
              </li>
              <li>
                <Icon name="mapPin" aria-hidden="true" />
                <a href={SITE.mapsHref} target="_blank" rel="noopener noreferrer">
                  {SITE.addressLine1}, {SITE.addressLine2}
                </a>
              </li>
              <li>
                <Icon name="clock" aria-hidden="true" />
                <span>{SITE.hours}</span>
              </li>
            </ul>
          </div>

          <nav className="hv-footer__nav" aria-label="Footer">
            {FOOTER_COLUMNS.map((col) => (
              <div className="hv-footer__col" key={col.title}>
                <h2 className="hv-footer__coltitle">{col.title}</h2>
                <ul>
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {link.to ? (
                        <Link to={link.to}>{link.label}</Link>
                      ) : (
                        <a href={link.href}>{link.label}</a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="hv-footer__cta">
          <div>
            <p className="hv-footer__ctatitle">Ready to build your next system?</p>
            <p className="hv-footer__ctasub">Free consultation, no obligation, straight answers.</p>
          </div>
          <Btn to="/book" variant="primary" iconAfter="arrowRight">
            Get a Free Consultation
          </Btn>
        </div>

        <div className="hv-footer__bottom">
          <p className="hv-footer__copy">
            &copy; {year} GHLevelUp. All rights reserved.
          </p>

          <ul className="hv-footer__social">
            {FOOTER_SOCIAL.map((s) => (
              <li key={s.label}>
                <a href={s.href} aria-label={s.label} target="_blank" rel="noopener noreferrer">
                  <Icon name={s.icon} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>

          <ul className="hv-footer__legal">
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms">Terms &amp; Conditions</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
