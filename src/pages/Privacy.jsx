import Layout from "@/components/layout/Layout.jsx";
import PageMeta from "@/components/common/PageMeta.jsx";
import StructuredData from "@/components/common/StructuredData.jsx";
import PageHero from "@/components/common/PageHero.jsx";
import Section from "@/components/common/Section.jsx";
import LegalBody from "@/components/common/LegalBody.jsx";
import { PRIVACY_SECTIONS } from "@/data/legal";

// v2 chrome (glass header, SiteFooterV2) - matches the rest of the redesigned
// site rather than the legacy header/footer.
import "@/styles/home-redesign.css";
import "@/styles/home-chrome.css";

export default function Privacy() {
  return (
    <Layout variant="v2" topbar={<>Questions about your data? <a href="/contact">Contact us</a></>}>
      <PageMeta
        title="Privacy Policy - GHLevelUp"
        description="How GHLevelUp collects, uses and protects your information."
        ogDescription="What we collect when you use this site or work with us, what we do with it, and how to have it removed."
      />

      <StructuredData
        page={{
          type: "WebPage",
          name: "Privacy Policy",
          description: "How GHLevelUp collects, uses and protects your information.",
          path: "/privacy",
        }}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy" },
        ]}
      />

      <PageHero crumb="Privacy Policy" title="Privacy Policy" lede="How we collect, use and protect information you share with us." center={true} />

      <Section>
        <LegalBody sections={PRIVACY_SECTIONS} />
      </Section>
    </Layout>
  );
}
