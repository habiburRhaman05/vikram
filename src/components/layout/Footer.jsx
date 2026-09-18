import { Link } from "react-router-dom";
import Button from "@/components/common/Button.jsx";
import { FOOTER_LINKS } from "@/data/nav";
import { SITE } from "@/data/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link className="brand brand--light" to="/">
              {/* 375 KB PNG originally; now 1x/2x WebP sized to the 64px
                  render height (see scripts/optimize-images.mjs). Lazy:
                  the footer is always below the fold. */}
              <picture>
                <source
                  type="image/webp"
                  srcSet="/img/footer-logo.webp 1x, /img/footer-logo@2x.webp 2x"
                />
                <img
                  className="footer-logo"
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
            <p>Reception, documents, workflow and follow-up - in one system.</p>
          </div>

          <nav className="footer-nav" aria-label="Footer">
            {FOOTER_LINKS.map((link) => (
              <Link key={link.to} to={link.to}>
                {link.label}
              </Link>
            ))}
          </nav>

          <Button to="/book" variant="outline" size="sm" icon="calendar">
            Book a demo
          </Button>
        </div>

        <div className="footer-bottom">
          <p className="footer-meta">
            &copy; <span>{year}</span> GHLevelUp &middot; {SITE.addressLine1}, {SITE.addressLine2} &middot;{" "}
            <a href={SITE.phoneHref}>{SITE.phone}</a> &middot; <a href={SITE.emailHref}>{SITE.email}</a>
          </p>
          <nav aria-label="Legal">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
