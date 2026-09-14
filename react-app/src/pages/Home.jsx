import Layout from "@/components/layout/Layout.jsx";
import PageMeta from "@/components/common/PageMeta.jsx";
import StructuredData from "@/components/common/StructuredData.jsx";

import Hero from "@/components/home/sections/Hero.jsx";
import WhatWeDo from "@/components/home/sections/WhatWeDo.jsx";
import Services from "@/components/home/sections/Services.jsx";
import Journey from "@/components/home/sections/Journey.jsx";
import WhyChooseUs from "@/components/home/sections/WhyChooseUs.jsx";
import Work from "@/components/home/sections/Work.jsx";
import Impact from "@/components/home/sections/Impact.jsx";
import Founder from "@/components/home/sections/Founder.jsx";
import Testimonials from "@/components/home/sections/Testimonials.jsx";
import Faq from "@/components/home/sections/Faq.jsx";
import Insights from "@/components/home/sections/Insights.jsx";
import Pricing from "@/components/home/sections/Pricing.jsx";
import ClosingCta from "@/components/home/sections/ClosingCta.jsx";

import "@/styles/home-redesign.css";
import "@/styles/home-sections.css";
import "@/styles/home-chrome.css";
import "@/styles/home-whatwedo.css";
import "@/styles/home-services.css";

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
      /* Distinct from the hero's own badge just below it (which now
         carries the "book a consultation" announcement) - this stays
         short and general so the two don't repeat the same line twice in
         a row. */
      topbar={
        <>
          Based in Albany, NY - working with businesses nationwide.{" "}
          <a href="/contact">Get in touch</a>
        </>
      }
    >
      <PageMeta
        title="GHLevelUp - CRM, AI Automation & Web Development for Growing Businesses"
        description="We build digital systems that grow your business: GoHighLevel CRM, AI automation, marketing, and funnel, website and GHL build services - designed, built and supported by one team."
        ogDescription="From CRM and AI automation to funnels, websites and GoHighLevel builds - modern digital systems that attract, engage and convert."
      />
      <StructuredData organization />

      {/* The .home-v2 scope now lives on the Layout shell (variant="v2")
          so it also covers the header and footer, which this redesign
          restyles. */}
      {/* Section order (user-specified): offer first, then proof, then
          price, then trust, then reading sections. Journey ("How We
          Work") slots after What We Do and Impact after Pricing as the
          proof lead-ins; neither was named in the requested order. */}
      <Hero />
      <Services />
      <WhyChooseUs />
      <Work />
      <WhatWeDo />
      <Journey />
      <Pricing />
      <Impact />
      {/* Between the numbers and the client quotes: the page says what it
          does, then who is behind it, then lets clients back it up. */}
      <Founder />
      <Testimonials />
      <ClosingCta />
      <Insights />
      <Faq />
    </Layout>
  );
}
