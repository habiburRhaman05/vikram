import { SITE } from "./site";

const contactLine = (
  <>
    <a href={SITE.emailHref} style={{ color: "var(--aqua-600)", fontWeight: 600 }}>
      {SITE.email}
    </a>{" "}
    or {SITE.phone}.
  </>
);

export const PRIVACY_SECTIONS = [
  {
    heading: "Introduction",
    body: (
      <>
        GHLevelUp ("we", "us" or "our") operates this website and the CRM and communications platform described
        on it, from our office at {SITE.addressLine1}, {SITE.addressLine2}. This policy explains what we collect
        from visitors and clients, how we use it, and the choices you have. Using the site or giving us your
        information means you've read this policy - if you don't agree with it, please don't use the site.
      </>
    ),
  },
  {
    heading: "Information we collect",
    checklist: [
      { html: "<strong>Details you provide</strong> - name, business name, email, phone number and anything you write in our contact, booking or onboarding forms." },
      { html: "<strong>Automatic data</strong> - IP address, browser and device type, operating system, referring pages, pages viewed and links clicked, collected through cookies and similar technology." },
      { html: "<strong>Calls and messages</strong> - recordings, transcripts and consent records for calls, texts and emails exchanged with us or handled by the platform's AI receptionist, kept for support and compliance." },
    ],
  },
  {
    heading: "How we use it",
    body: "We use your information to respond to enquiries, schedule and run demonstrations, provide and support the services you sign up for, send you service messages and - where you've agreed - marketing messages, improve the site and platform, and meet our legal and record-keeping obligations.",
  },
  {
    heading: "Cookies and analytics",
    body: "This site uses cookies and analytics tools, including Google Analytics and session-behaviour tools such as Microsoft Clarity, to understand how visitors use it and where to improve. You can control cookies through the banner on this site or through your browser settings.",
  },
  {
    heading: "Service providers",
    body: "We rely on other companies to help deliver the service - GoHighLevel/LeadConnector for the CRM and communications platform, hosting and infrastructure providers, email and SMS delivery providers, and analytics tools. Each only processes your information to provide their service to us and is bound by its own privacy practices.",
  },
  {
    heading: "Text messaging and calls",
    body: "If you opt in to text messages or calls, we use them to follow up on enquiries, schedule appointments and send reminders. Reply STOP to any text to opt out at any time, or ask us directly. Your mobile opt-in and consent records are not shared with third parties or affiliates for their own marketing.",
  },
  {
    heading: "How we share information",
    body: "We do not sell your personal information. We share it only with the service providers above, with professional advisors where necessary, where the law requires it, or if GHLevelUp is ever acquired or merged - in which case your information would transfer under the same protections described here.",
  },
  {
    heading: "Data retention",
    body: "We keep personal information for as long as we need it to provide the service, keep proper records, resolve disputes and enforce our agreements, then delete or anonymise it.",
  },
  {
    heading: "Data security",
    body: "We apply administrative, technical and physical safeguards appropriate to the sensitivity of the information we handle. No method of transmission or storage is completely secure, and we can't guarantee absolute security.",
  },
  {
    heading: "Your privacy rights",
    checklist: [
      { html: "<strong>EU/UK residents</strong> - under the GDPR you can access, correct or delete your information, restrict or object to processing, and lodge a complaint with your local data protection authority." },
      { html: "<strong>California residents</strong> - under the CCPA/CPRA you can know what we collect, request access or deletion, correct inaccurate information, and opt out of the sale or sharing of your information (we don't sell it). We won't discriminate against you for exercising these rights." },
      { html: `To exercise any of these rights, email <a href="${SITE.emailHref}" style="color:var(--aqua-600);font-weight:600">${SITE.email}</a> - we may need to verify your identity first.` },
    ],
  },
  {
    heading: "International transfers",
    body: "We process and store information in the United States. If you're contacting us from outside the US, your information will be transferred to and handled in the US, where privacy laws may differ from those in your country.",
  },
  {
    heading: "Children's privacy",
    body: "Our services are for businesses and adults - we don't knowingly collect information from anyone under 16 (or under 18 where local law sets a higher age). If you believe a minor has given us information, contact us and we'll delete it.",
  },
  {
    heading: "Changes to this policy",
    body: "If we update this policy, we'll revise the date above and post the new version on this page.",
  },
  {
    heading: "Contact",
    body: (
      <>
        Questions about this policy or your information? Email {contactLine}
        <br />
        GHLevelUp, {SITE.addressLine1}, {SITE.addressLine2}.
      </>
    ),
  },
];

export const TERMS_SECTIONS = [
  {
    heading: "Acceptance of these terms",
    body: "These terms govern your use of this website and the GHLevelUp platform. By using the site or subscribing to our services, you agree to them. If you're accepting on behalf of a business, you're confirming you have the authority to bind it. Where we've agreed a separate written proposal or service agreement with you, that document controls if it conflicts with these terms.",
  },
  {
    heading: "The service",
    body: "GHLevelUp provides a CRM and communications platform for professional practices - built on GoHighLevel - together with the account setup, workflow automation, AI voice and chat agents, custom development and integrations described in your order. We may improve or change features over time; we will not materially reduce core functionality during a paid term without notice.",
  },
  {
    heading: "Who can use this site",
    body: "You must be at least 18 years old and have the legal authority to agree to these terms, whether for yourself or the business you represent.",
  },
  {
    heading: "Scope of work and quotes",
    body: "Each engagement starts with a proposal or order describing the scope, deliverables and timeline. Changes to scope may need a revised quote. Timelines are estimates - they depend on how quickly you provide access, content and approvals, and on third-party platforms outside our control.",
  },
  {
    heading: "Fees and billing",
    body: "Subscription fees are as set out in your order, billed in advance unless we agree otherwise; invoices are due on receipt. Telephony, messaging and AI usage are billed separately against your own payment method, based on your actual usage - never pooled with another practice's, never a surprise line item. Late payment may pause work until your account is current. Fees for work already completed are non-refundable, since they reflect time and resources already spent.",
  },
  {
    heading: "Your responsibilities",
    checklist: [
      "Keep account credentials secure and control who on your team has access.",
      "Give us timely access to the accounts, content and approvals a task needs.",
      "Use calling, texting and email features in line with applicable law, including consent and opt-out requirements for automated and marketing messages.",
      "Maintain your own professional obligations to your clients, including confidentiality and any regulatory duties that apply to your practice.",
    ],
  },
  {
    heading: "Professional advice",
    body: "The platform is software. It does not prepare returns, give tax advice, or assume any professional duty owed by you to your clients. Responsibility for the accuracy of work produced using the platform remains yours.",
  },
  {
    heading: "Intellectual property",
    body: "Deliverables built specifically for you are licensed or transferred as set out in your order. We keep ownership of our own pre-existing methods, templates, automations and tools, including the ones used to build your setup. You keep ownership of your own content and client data.",
  },
  {
    heading: "Third-party platforms",
    body: "The platform relies on third-party services - GoHighLevel, telephony and messaging carriers, payment processors and others. We aren't affiliated with them and aren't responsible for their outages, changes or acts; you're responsible for complying with each one's own terms.",
  },
  {
    heading: "Confidentiality",
    body: "Each of us will protect the other's confidential information with reasonable care, and use it only for the purposes of the engagement. This does not cover information that is public or that we already knew independently.",
  },
  {
    heading: "No guaranteed results",
    body: "We work to keep the service available and supported, but we do not warrant uninterrupted or error-free operation, and we can't guarantee specific results, revenue, lead volume or conversion rates - too much depends on your own offer, market and follow-through.",
  },
  {
    heading: "Limitation of liability",
    body: "To the fullest extent the law allows, neither of us is liable for indirect, incidental or consequential damages, or for lost profits or data. Our total liability arising from the service is limited to the fees you actually paid us in the three months before the claim, or as otherwise set out in your order.",
  },
  {
    heading: "Indemnification",
    body: "You agree to cover us against claims arising from your own content, your use of the service, your breach of these terms, or your violation of a third-party platform's terms or the law.",
  },
  {
    heading: "Your data",
    body: (
      <>
        Your client data remains yours. We process it to provide the service, in line with our{" "}
        <a href="/privacy" style={{ color: "var(--aqua-600)", fontWeight: 600 }}>
          Privacy Policy
        </a>
        . On termination you may export your data; we will delete or return it as described there.
      </>
    ),
  },
  {
    heading: "Term and termination",
    body: "These terms apply for as long as you use the site or the service. Either of us may end a subscription as set out in your order; we may suspend access for a serious breach of these terms. Work already performed stays billable, and anything meant to survive termination (confidentiality, intellectual property, limitation of liability) continues to apply.",
  },
  {
    heading: "Governing law",
    body: "These terms are governed by the laws of the State of New York, without regard to conflict-of-law principles. Disputes should first be raised directly with us; unresolved disputes are subject to the exclusive jurisdiction of the state and federal courts located in Albany County, New York.",
  },
  {
    heading: "Changes to these terms",
    body: "We may update these terms from time to time; the date above will change when we do. Continuing to use the site or service after an update means you accept the new terms.",
  },
  {
    heading: "Contact",
    body: (
      <>
        Questions about these terms? Email {contactLine}
        <br />
        GHLevelUp, {SITE.addressLine1}, {SITE.addressLine2}.
      </>
    ),
  },
];
