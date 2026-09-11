import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import ScrollToTop from "@/components/common/ScrollToTop.jsx";

/** Skip-link + header + <main> landmark + footer - the shell every page
 * shared in the original markup, now wrapping whatever route is active.
 * ScrollToTop is new (not in the original static site) - a floating
 * back-to-top button, added site-wide here rather than per-page. */
export default function Layout({ topbar, children }) {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header topbar={topbar} />
      <main id="main">{children}</main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
