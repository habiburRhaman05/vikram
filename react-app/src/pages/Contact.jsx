import Layout from "@/components/layout/Layout.jsx";
import PageMeta from "@/components/common/PageMeta.jsx";
import PageHero from "@/components/common/PageHero.jsx";
import Section from "@/components/common/Section.jsx";
import SectionHead from "@/components/common/SectionHead.jsx";
import Button from "@/components/common/Button.jsx";
import InfoCard from "@/components/common/InfoCard.jsx";
import Icon from "@/components/common/Icon.jsx";
import GhlEmbed from "@/components/common/GhlEmbed.jsx";
import CtaBand from "@/components/common/CtaBand.jsx";
import Reveal from "@/components/common/Reveal.jsx";
import { SITE } from "@/data/site";

const INFO_ITEMS = [
  {
    icon: "phone",
    label: "Call or text",
    value: <a href={SITE.phoneHref}>{SITE.phone}</a>,
    note: "Text is often fastest during filing season",
  },
  {
    icon: "mail",
    label: "Email",
    value: <a href={SITE.emailHref}>{SITE.email}</a>,
    note: "Replies within one business day",
  },
  {
    icon: "mapPin",
    label: "Office",
    value: (
      <a href={SITE.mapsHref} target="_blank" rel="noopener">
        {SITE.addressLine1}
        <br />
        {SITE.addressLine2}
      </a>
    ),
    note: "Visits by appointment",
  },
  {
    icon: "clock",
    label: "Hours",
    value: SITE.hours,
    note: "Calls answered 24/7 by the AI receptionist",
  },
];

export default function Contact() {
  return (
    <Layout
      topbar={
        <>
          Office hours <strong>{SITE.hours}</strong> - the AI receptionist covers everything outside them
        </>
      }
    >
      <PageMeta
        title="Contact - GHLevelUp"
        description="Talk to the team about running your tax practice on one system. Call, text, email, or send a message and we'll come back the same business day."
      />

      <PageHero
        crumb="Contact"
        title="Let's talk about your practice"
        center
        lede="Whether you want a full walkthrough or just have one question about how something works, send it over. A person reads every message, and we come back the same business day."
      />

      <Section>
        <SectionHead eyebrow="Get in touch" title="Send us a message">
          Tell us roughly how many returns you file a season and what's slowing you down - it makes the first
          reply far more useful.
        </SectionHead>

        <div className="contact-grid">
          <Reveal as="aside">
            <InfoCard>
              <ul className="info-list">
                {INFO_ITEMS.map((item, i) => (
                  <li key={i}>
                    <span className="info-list__icon" aria-hidden="true">
                      <Icon name={item.icon} />
                    </span>
                    <div>
                      <dt>{item.label}</dt>
                      <dd>
                        {item.value}
                        <small>{item.note}</small>
                      </dd>
                    </div>
                  </li>
                ))}
              </ul>
            </InfoCard>

            <InfoCard>
              <h4 style={{ marginBottom: 12 }}>Ready to see it instead?</h4>
              <p style={{ fontSize: ".95rem", color: "var(--text-mid)", marginBottom: 18 }}>
                Skip the back-and-forth and take a live twenty-minute walkthrough.
              </p>
              <Button to="/book" variant="accent" size="sm" icon="calendar" block>
                Book a demo
              </Button>
            </InfoCard>
          </Reveal>

          <Reveal>
            {/* GHL EMBED - CONTACT US FORM (Form ID: rArd4GpBcPOa3tbsPAO3).
                840px matches what form_embed.js actually resizes it to
                live (see the original contact.html comment this is ported
                from) - starting there avoids a visible grow-on-load jump.
                The rounded card + shadow visible below "Submit" is
                rendered inside this cross-origin iframe by GHL's own
                hosted form page; it isn't reachable from our CSS. */}
            <GhlEmbed
              variant="form"
              iframeProps={{
                src: "https://api.leadconnectorhq.com/widget/form/rArd4GpBcPOa3tbsPAO3",
                style: { width: "100%", height: 840, border: "none", borderRadius: 8 },
                id: "inline-rArd4GpBcPOa3tbsPAO3",
                "data-layout": "{'id':'INLINE'}",
                "data-trigger-type": "alwaysShow",
                "data-trigger-value": "",
                "data-activation-type": "alwaysActivated",
                "data-activation-value": "",
                "data-deactivation-type": "neverDeactivate",
                "data-deactivation-value": "",
                "data-form-name": "Contact Us",
                "data-height": "740",
                "data-layout-iframe-id": "inline-rArd4GpBcPOa3tbsPAO3",
                "data-form-id": "rArd4GpBcPOa3tbsPAO3",
                "data-cookie-consent": "true",
                "data-cookie-consent-provider": "auto",
                title: "Contact Us",
              }}
            />
          </Reveal>
        </div>
      </Section>

      <Section tight>
        <CtaBand
          title="Or just call and ask"
          actions={
            <>
              <Button href={SITE.phoneHref} variant="accent" size="lg" icon="phone">
                Call {SITE.phone}
              </Button>
              <Button to="/book" variant="ghost-light" size="lg" icon="calendar">
                Book a demo instead
              </Button>
            </>
          }
        >
          If a two-minute phone call would settle it faster than a form, use the number below. Outside office
          hours the receptionist will take it and we'll follow up.
        </CtaBand>
      </Section>
    </Layout>
  );
}
