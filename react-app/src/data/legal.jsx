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
    heading: "Who we are",
    body: (
      <>
        GHLevelUp operates this website and the client communication platform described on it. Our office is at{" "}
        {SITE.addressLine1}, {SITE.addressLine2}. You can reach us at {contactLine}
      </>
    ),
  },
  {
    heading: "What we collect",
    checklist: [
      { html: "<strong>Details you submit</strong> - name, business name, email, phone number and anything you write in our contact or booking forms." },
      { html: "<strong>Communications</strong> - calls, texts, emails and chat messages exchanged with us, including recordings or transcripts where the law permits and you have been notified." },
      { html: "<strong>Usage data</strong> - standard technical information such as browser type, device and pages visited, collected through cookies and similar technologies." },
    ],
  },
  {
    heading: "How we use it",
    body: "We use your information to respond to your enquiry, schedule and conduct demonstrations, provide and support the services you sign up for, and meet our legal and record-keeping obligations. We do not sell your personal information, and we do not share it with third parties for their own marketing.",
  },
  {
    heading: "Service providers",
    body: "We use third-party providers to deliver the service - including communications infrastructure, scheduling, form handling and payment processing. They may process your information only to provide services to us and are bound by contract to protect it.",
  },
  {
    heading: "Security and retention",
    body: "We apply administrative, technical and physical safeguards appropriate to the sensitivity of the information we handle, and we keep personal information only as long as needed for the purposes described here or as required by law. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
  },
  {
    heading: "Your choices",
    body: "You can ask us to access, correct or delete the personal information we hold about you, and you can opt out of marketing messages at any time by replying STOP to a text, using the unsubscribe link in an email, or contacting us directly. Some information may be retained where we are legally required to keep it.",
  },
  {
    heading: "Changes",
    body: "If we update this policy, we will revise the date above and post the new version on this page.",
  },
  {
    heading: "Contact",
    body: <>Questions about this policy or your information? Email {contactLine}</>,
  },
];

export const TERMS_SECTIONS = [
  {
    heading: "Agreement",
    body: "By using this website or subscribing to our services, you agree to these terms. If you are accepting on behalf of a business, you confirm you are authorised to bind that business.",
  },
  {
    heading: "The service",
    body: "We provide a communications and workflow platform for professional practices, together with the setup, configuration and support described in your order. We may improve or change features over time; we will not materially reduce core functionality during a paid term without notice.",
  },
  {
    heading: "Your responsibilities",
    checklist: [
      "Keep account credentials secure and control who on your team has access.",
      "Use calling, texting and email features in line with applicable law, including consent and opt-out requirements for automated and marketing messages.",
      "Maintain your own professional obligations to your clients, including confidentiality and any regulatory duties that apply to your practice.",
    ],
  },
  {
    heading: "Professional advice",
    body: "The platform is software. It does not prepare returns, give tax advice, or assume any professional duty owed by you to your clients. Responsibility for the accuracy of work produced using the platform remains yours.",
  },
  {
    heading: "Fees and usage charges",
    body: "Subscription fees are as set out in your order. Telephony, messaging and AI usage are billed against your own payment method based on your actual usage. Specific rates, billing cycles and cancellation terms are stated in your order and confirmed in writing before your subscription begins.",
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
    heading: "Availability and liability",
    body: "We work to keep the service available and supported, but we do not warrant uninterrupted or error-free operation. To the fullest extent permitted by law, our liability arising out of the service is limited as set out in your order.",
  },
  {
    heading: "Governing law",
    body: "These terms are governed by the laws of the State of New York, without regard to conflict-of-law principles.",
  },
  {
    heading: "Contact",
    body: <>Questions about these terms? Email {contactLine}</>,
  },
];
