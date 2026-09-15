import { Link } from "react-router-dom";
import Icon from "@/components/common/Icon.jsx";
import { SITE } from "@/data/site";
import { FOOTER_COLUMNS, FOOTER_SOCIAL } from "@/data/homeV2";

/**
 * Redesigned site footer: brand, four link columns, a contact column,
 * social row and a legal bar.
 *
 * The contact details are the footer's LAST column, on the far right,
 * headed like the others. They are deliberately not stacked under the logo:
 * four lines there made the left column the tallest thing in the footer by
 * a wide margin, so the four link columns finished about 150px above it and
 * most of the footer's middle was empty space.
 *
 * Below 1100px that column drops out of the row and becomes a full-width
 * band under both columns instead (see styles/home-chrome.css) - four link
 * columns plus a contact column cannot share a tablet's width without every
 * one of them wrapping.
 *
 * There is deliberately no CTA block in here. The footer used to close on
 * a "Ready to build your next system?" band with its own button, which
 * meant every page ended twice - once in the page's own closing CTA and
 * again in the footer. Each page owns its closing CTA; the footer sticks to
 * navigation and contact details.
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
            {/* Same asset and the same wordmark as the header brand
                (layout/Header.jsx) - badge image plus live "GH LevelUp"
                text, not the older wide footer-logo lockup, so the two
                read as one mark. Colours are overridden for this dark
                surface in styles/home-chrome.css (the header's wordmark
                rules assume a light background). */}
            <Link className="hv-footer__logo" to="/" aria-label="GHLevelUp home">
              <picture>
                <source type="image/webp" srcSet="/img/logo.webp 1x, /img/logo@2x.webp 2x" />
                <img
                  src="/img/logo.png"
                  srcSet="/img/logo.png 1x, /img/logo@2x.png 2x"
                  alt=""
                  width={51}
                  height={44}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
              <span className="brand__name">
                <span className="brand__name-gh">GH</span>
                <span className="brand__name-levelup">LevelUp</span>
              </span>
            </Link>

            <p className="hv-footer__pitch">
              CRM, AI automation, marketing and funnel, website and GHL builds, all supported by one team so
              your systems actually talk to each other.
            </p>
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

          <div className="hv-footer__contactcol">
            <h2 className="hv-footer__coltitle">Contact</h2>

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
                {/* Street and city on their own lines rather than one run of
                    text the browser is left to wrap: this is the longest of
                    the four details, and a ragged break mid-address ("...,
                    Albany," / "NY 12203") is what made the row look
                    misaligned. */}
                <a href={SITE.mapsHref} target="_blank" rel="noopener noreferrer">
                  {SITE.addressLine1}
                  <br />
                  {SITE.addressLine2}
                </a>
              </li>
              <li>
                <Icon name="clock" aria-hidden="true" />
                <span>{SITE.hours}</span>
              </li>
            </ul>
          </div>
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
            <li>
              <Link to="/sitemap">Sitemap</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
