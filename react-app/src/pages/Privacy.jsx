import Layout from "@/components/layout/Layout.jsx";
import PageMeta from "@/components/common/PageMeta.jsx";
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
      <PageMeta title="Privacy Policy - GHLevelUp" description="How GHLevelUp collects, uses and protects your information." />

      <PageHero crumb="Privacy Policy" title="Privacy Policy" lede="How we collect, use and protect information you share with us." />

      <Section>
        <LegalBody sections={PRIVACY_SECTIONS} />
      </Section>
    </Layout>
  );
}
