import Layout from "@/components/layout/Layout.jsx";
import PageMeta from "@/components/common/PageMeta.jsx";
import StructuredData from "@/components/common/StructuredData.jsx";
import PageHero from "@/components/common/PageHero.jsx";
import Section from "@/components/common/Section.jsx";
import LegalBody from "@/components/common/LegalBody.jsx";
import { TERMS_SECTIONS } from "@/data/legal";

// v2 chrome (glass header, SiteFooterV2) - matches the rest of the redesigned
// site rather than the legacy header/footer.
import "@/styles/home-redesign.css";
import "@/styles/home-chrome.css";

export default function Terms() {
  return (
    <Layout variant="v2" topbar={<>Questions about these terms? <a href="/contact">Contact us</a></>}>
      <PageMeta
        title="Terms of Service - GHLevelUp"
        description="The terms that govern use of the GHLevelUp website and platform."
        ogDescription="What you agree to when you use this site or work with us, including billing, scope and the limits of our liability."
      />

      <StructuredData
        page={{
          type: "WebPage",
          name: "Terms of Service",
          description: "The terms that govern use of the GHLevelUp website and platform.",
          path: "/terms",
        }}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Terms of Service", path: "/terms" },
        ]}
      />

      <PageHero crumb="Terms of Service" title="Terms of Service" lede="The terms that govern use of this website and the GHLevelUp platform." />

      <Section>
        <LegalBody sections={TERMS_SECTIONS} />
      </Section>
    </Layout>
  );
}
