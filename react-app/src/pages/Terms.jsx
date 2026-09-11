import Layout from "@/components/layout/Layout.jsx";
import PageMeta from "@/components/common/PageMeta.jsx";
import PageHero from "@/components/common/PageHero.jsx";
import Section from "@/components/common/Section.jsx";
import LegalBody from "@/components/common/LegalBody.jsx";
import { TERMS_SECTIONS } from "@/data/legal";

export default function Terms() {
  return (
    <Layout topbar={<>Questions about these terms? <a href="/contact">Contact us</a></>}>
      <PageMeta title="Terms of Service - GHLevelUp" description="The terms that govern use of the GHLevelUp website and platform." path="/terms.html" />

      <PageHero crumb="Terms of Service" title="Terms of Service" lede="The terms that govern use of this website and the GHLevelUp platform." />

      <Section narrow>
        <div className="embed-slot" style={{ textAlign: "left", marginBottom: 48 }}>
          <h4>⚠ Draft - needs legal review before launch</h4>
          <p style={{ fontSize: ".94rem", margin: 0 }}>
            Placeholder terms covering the basics. Commercial specifics - subscription length, fees, telephony
            and AI usage billing, cancellation, refunds, service levels and liability limits - must be set by
            the business and reviewed by an attorney before this page goes live.
          </p>
        </div>

        <LegalBody sections={TERMS_SECTIONS} />
      </Section>
    </Layout>
  );
}
