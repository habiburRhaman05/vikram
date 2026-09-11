import { Link } from "react-router-dom";
import Button from "@/components/common/Button.jsx";
import { FOOTER_LINKS } from "@/data/nav";
import { SITE } from "@/data/site";
import footerLogo from "@/assets/img/footer-logo.png";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link className="brand brand--light" to="/">
              <img className="footer-logo" src={footerLogo} alt="GHLevelUp" width={2094} height={751} />
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
