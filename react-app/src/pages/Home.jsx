import Layout from "@/components/layout/Layout.jsx";
import PageMeta from "@/components/common/PageMeta.jsx";
import StructuredData from "@/components/common/StructuredData.jsx";

import Hero from "@/components/home/sections/Hero.jsx";
import TrustBar from "@/components/home/sections/TrustBar.jsx";
import GrowthStack from "@/components/home/sections/GrowthStack.jsx";
import Journey from "@/components/home/sections/Journey.jsx";
import Solutions from "@/components/home/sections/Solutions.jsx";
import Work from "@/components/home/sections/Work.jsx";
import Impact from "@/components/home/sections/Impact.jsx";
import Testimonials from "@/components/home/sections/Testimonials.jsx";
import Faq from "@/components/home/sections/Faq.jsx";
import ClosingCta from "@/components/home/sections/ClosingCta.jsx";

import "@/styles/home-redesign.css";
import "@/styles/home-sections.css";
import "@/styles/home-chrome.css";

/**
 * Home.
 *
 * Everything lives inside `.home-v2`, which is what scopes the redesign's
 * design tokens (see styles/home-redesign.css). That wrapper is the only
 * reason the other seven routes are unaffected by this page's very
 * different palette and type scale - do not remove it.
 *
 * Section order follows the reference design; each section owns its own
 * copy in src/data/homeV2.jsx.
 */
export default function Home() {
  return (
    <Layout
      variant="v2"
      topbar={
        <>
          Now booking free consultations for the coming quarter.{" "}
          <a href="/book">Grab a 30 minute slot</a>
        </>
      }
    >
      <PageMeta
        title="GHLevelUp - CRM, AI Automation & Web Development for Growing Businesses"
        description="We build digital systems that grow your business: GoHighLevel CRM, AI automation, web and software development, marketing and creative - designed, built and supported by one team."
        ogDescription="From CRM and AI automation to web development and creative - modern digital systems that attract, engage and convert."
      />
      <StructuredData organization />

      {/* The .home-v2 scope now lives on the Layout shell (variant="v2")
          so it also covers the header and footer, which this redesign
          restyles. */}
      <Hero />
      <TrustBar />
      <GrowthStack />
      <Journey />
      <Solutions />
      <Work />
      <Impact />
      <Testimonials />
      <Faq />
      <ClosingCta />
    </Layout>
  );
}
