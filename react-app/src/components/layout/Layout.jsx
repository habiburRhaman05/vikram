import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import SiteFooterV2 from "@/components/home/SiteFooterV2.jsx";
import ScrollToTop from "@/components/common/ScrollToTop.jsx";

/**
 * Skip-link + header + <main> landmark + footer.
 *
 * `variant="v2"` puts the whole shell inside the `.home-v2` scope and
 * swaps in the redesigned footer. That wrapper has to sit above the
 * header, not just around the page body, because the redesign restyles
 * the header and footer too - scoping it to <main> only would leave them
 * on the old theme.
 */
export default function Layout({ topbar, variant, children }) {
  const isV2 = variant === "v2";

  return (
    <div className={isV2 ? "home-v2" : undefined}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header topbar={topbar} />
      <main id="main">{children}</main>
      {isV2 ? <SiteFooterV2 /> : <Footer />}
      <ScrollToTop />
    </div>
  );
}
