import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout.jsx";
import PageMeta from "@/components/common/PageMeta.jsx";
import PageHero from "@/components/common/PageHero.jsx";
import Button from "@/components/common/Button.jsx";
import BtnRow from "@/components/common/BtnRow.jsx";
import { SERVICE_ROUTES } from "@/data/navMenus.js";
import { SERVICE_LINEUP_ROUTES } from "@/data/homeV2.jsx";

// The header/footer restyle (transparent glass header, SiteFooterV2) lives
// entirely behind the `.home-v2` scope in these two files - same ones
// Home.jsx imports. Both are needed: home-redesign.css defines the design
// tokens (--hv-accent, fonts, etc.) that home-chrome.css's header/footer
// rules read. This project bundles all CSS into one file regardless of
// which page imports it, so in practice this styling is already present
// on every route either way - but this page depends on it directly (via
// `variant="v2"` below), so it imports its own dependency explicitly
// rather than silently relying on Home.jsx having declared it first.
import "@/styles/home-redesign.css";
import "@/styles/home-chrome.css";

/** Every known service slug -> its real display title, merged from both
 *  places a service link is defined - the nav dropdowns (navMenus.js) and
 *  the home page's tile row / tab panel (homeV2.jsx SERVICE_LINEUP). */
const TITLES = { ...SERVICE_ROUTES, ...SERVICE_LINEUP_ROUTES };

/**
 * Where /services/:slug lands until that specific service gets a real
 * page. Every service link in the nav and on the home page used to point
 * at /platform - four (really seventeen, counting every dropdown item)
 * different things all silently landing on the same page, indistinguishable
 * from a bug. This is the honest version: its own URL, its own title, and
 * a plain statement that the page is still being built - not a dead link,
 * not a redirect, not a generic 404 (the slug IS a real, known service;
 * it just doesn't have content yet).
 *
 * An unrecognised slug (a stale link, a typo) still lands here rather than
 * on NotFound - "under development" reads fine either way, and a visitor
 * gets the same working header/nav/CTA rather than a dead end.
 */
export default function ServiceComingSoon() {
  const { slug } = useParams();
  const title = TITLES[slug] || "This service";

  return (
    <Layout
      variant="v2"
      topbar={
        <>
          Based in Albany, NY - working with businesses nationwide. <a href="/contact">Get in touch</a>
        </>
      }
    >
      <PageMeta
        title={`${title} - GHLevelUp`}
        description={`${title} is being built - book a call in the meantime and we'll walk you through it directly.`}
        noIndex
      />
      <PageHero
        crumb={title}
        title={`${title} is under development`}
        center
        lede="This page isn't live yet, but the service itself is - book a call and we'll walk you through exactly how it works for your business."
      >
        <BtnRow center style={{ marginTop: 32 }}>
          <Button to="/book" variant="accent" icon="calendar">
            Book a call
          </Button>
          <Button to="/platform" variant="outline" icon="arrowRight">
            See what's live now
          </Button>
        </BtnRow>
      </PageHero>
    </Layout>
  );
}
