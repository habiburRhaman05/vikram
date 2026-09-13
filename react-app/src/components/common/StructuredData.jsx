import { SITE } from "@/data/site";
import { absoluteUrl } from "@/lib/seo";

/**
 * JSON-LD structured data. Valid anywhere in the document per Google's
 * spec, so it's rendered inline by whichever page/section owns the facts
 * it describes rather than being centralised into <head>.
 *
 * Usage:
 *   <StructuredData organization />         - site identity (Home)
 *   <StructuredData faq={FAQ_ITEMS} />      - FAQ rich result
 */
export default function StructuredData({ organization = false, faq }) {
  const blocks = [];

  if (organization) {
    blocks.push({
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "GHLevelUp",
      url: absoluteUrl("/"),
      logo: absoluteUrl("/img/logo@2x.png"),
      image: absoluteUrl("/og-image.png"),
      description:
        "GoHighLevel, AI automation, web development and creative production for businesses that want one connected system instead of five disconnected tools.",
      telephone: SITE.phone,
      email: SITE.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE.addressLine1,
        addressLocality: "Albany",
        addressRegion: "NY",
        postalCode: "12203",
        addressCountry: "US",
      },
      openingHours: "Mo-Fr 09:00-18:00",
      areaServed: "US",
    });

    blocks.push({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "GHLevelUp",
      url: absoluteUrl("/"),
    });
  }

  if (faq?.length) {
    blocks.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
  }

  if (!blocks.length) return null;

  return (
    <script
      type="application/ld+json"
      // Content is authored in this repo, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(blocks) }}
    />
  );
}
