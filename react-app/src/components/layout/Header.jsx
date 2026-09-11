import { NavLink, Link } from "react-router-dom";
import Icon from "@/components/common/Icon.jsx";
import Button from "@/components/common/Button.jsx";
import Container from "@/components/common/Container.jsx";
import useStickyHeader from "@/hooks/useStickyHeader";
import useMobileNav from "@/hooks/useMobileNav";
import { NAV_LINKS } from "@/data/nav";
import { SITE } from "@/data/site";
import logo from "@/assets/img/logo.png";

/**
 * Topbar + header, identical across every page except the topbar's own
 * message - each page passes its own `topbar` node (an announcement, an
 * office-hours note, etc.) exactly like each .html file hard-coded its own
 * <div class="topbar"> text.
 */
export default function Header({ topbar }) {
  const headerRef = useStickyHeader();
  const { open, toggle } = useMobileNav();

  const navLinkClass = ({ isActive }) => `nav__link${isActive ? " is-active" : ""}`;

  return (
    <>
      <div className="topbar">
        <Container className="topbar__inner">
          <span>{topbar}</span>
        </Container>
      </div>

      <header className="site-header" ref={headerRef}>
        <Container>
          <nav className="nav" aria-label="Primary">
            <Link className="brand" to="/">
              <img className="brand__logo" src={  "/logo.png" ||logo} alt="GHLevelUp" width={1354} height={1161} />
              <span className="brand__name">
                <span className="brand__name-gh">GH</span>
                <span className="brand__name-levelup">LevelUp</span>
              </span>
            </Link>

            <div className={`nav__links${open ? " is-open" : ""}`} id="nav-links">
              {NAV_LINKS.map((link) => (
                <NavLink key={link.to} className={navLinkClass} to={link.to}>
                  {link.label}
                </NavLink>
              ))}
              <Button to="/book" variant="accent" icon="calendar" className="nav__cta-mobile">
                Book a Demo
              </Button>
            </div>

            <div className="nav__actions">
              <a className="nav__phone" href={SITE.phoneHref}>
                <Icon name="phone" />
                {SITE.phone}
              </a>
              <Button to="/book" variant="accent" size="sm" icon="calendar" className="nav__cta-desktop">
                Book a Demo
              </Button>
              <button
                className="nav__toggle"
                type="button"
                aria-expanded={open}
                aria-controls="nav-links"
                aria-label={open ? "Close navigation" : "Open navigation"}
                onClick={toggle}
              >
                <span className="nav__toggle-bars" aria-hidden="true" />
              </button>
            </div>
          </nav>
        </Container>
      </header>
    </>
  );
}
