import Layout from "@/components/layout/Layout.jsx";
import PageMeta from "@/components/common/PageMeta.jsx";
import PageHero from "@/components/common/PageHero.jsx";
import Section from "@/components/common/Section.jsx";
import LegalBody from "@/components/common/LegalBody.jsx";
import { PRIVACY_SECTIONS } from "@/data/legal";

export default function Privacy() {
  return (
    <Layout topbar={<>Questions about your data? <a href="/contact">Contact us</a></>}>
      <PageMeta title="Privacy Policy - GHLevelUp" description="How GHLevelUp collects, uses and protects your information." />

      <PageHero crumb="Privacy Policy" title="Privacy Policy" lede="How we collect, use and protect information you share with us." />

      <Section narrow>
        <div className="embed-slot" style={{ textAlign: "left", marginBottom: 48 }}>
          <h4>⚠ Draft - needs legal review before launch</h4>
          <p style={{ fontSize: ".94rem", margin: 0 }}>
            The text below is a working draft covering the site's actual data flows. It is not legal advice and
            has not been reviewed by an attorney. Have counsel confirm it against your obligations - including
            IRS Publication 4557 safeguards, the FTC Safeguards Rule, and New York State requirements - before
            publishing.
          </p>
        </div>

        <LegalBody sections={PRIVACY_SECTIONS} />
      </Section>
    </Layout>
  );
}
