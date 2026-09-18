/**
 * Static option lists and step metadata for the /onboarding wizard
 * (src/pages/Onboarding.jsx). Kept separate from the page component so the
 * long picker lists don't crowd the logic that actually drives the form.
 *
 * World lists (countries, currencies, languages, time zones, states and
 * cities) live in locations.js - they're derived from ISO data or hand-
 * curated datasets rather than authored here, and the validation rules that
 * pair with them live in src/lib/onboardingValidation.js.
 *
 * `Services Wanted` mirrors what the site actually sells (see WHAT_WE_DO in
 * data/homeV2.jsx): an onboarding form offering something the team can't
 * build is a support ticket waiting to happen.
 */

/* Each description says out loud how much of its section is optional. Most of
   this form now is, and a step that doesn't say so reads as four steps of
   paperwork - which is what it used to be, and what made people stop in the
   middle of it. */
export const STEP_META = [
  {
    key: "business-info",
    tabLabel: "General Business Info",
    icon: "building",
    heading: "Section 1: General Business Info",
    description: "The essentials about your business. Everything marked Optional can be left blank.",
  },
  {
    key: "registration",
    tabLabel: "Business Registration",
    icon: "file",
    heading: "Section 2: Business Registration",
    description: "Optional: registration details and the person we should speak to, if you have them to hand.",
  },
  {
    key: "services",
    tabLabel: "Services & Integrations",
    icon: "sliders",
    heading: "Section 3: Services & Integrations",
    description: "Tell us which services you want and which tools we should connect. The tool list is optional.",
  },
  {
    key: "credentials",
    tabLabel: "Access & Credentials",
    icon: "key",
    heading: "Section 4: Access & Credentials",
    description: "Entirely optional: login details for anything we need to configure on your behalf.",
  },
];

export const BUSINESS_NICHES = [
  "Tax Preparation & E-Filing",
  "Accounting & Bookkeeping",
  "Insurance",
  "Mortgage & Lending",
  "Financial Advisory",
  "Legal Services",
  "Notary Services",
  "Real Estate",
  "Property Management",
  "HVAC",
  "Plumbing",
  "Electrical",
  "Roofing",
  "Solar & Energy",
  "General Contracting",
  "Home Cleaning Services",
  "Landscaping & Lawn Care",
  "Pest Control",
  "Medical & Dental",
  "Chiropractic & Physio",
  "Veterinary",
  "Beauty & Wellness",
  "Salon & Spa",
  "Fitness & Gyms",
  "Automotive Services",
  "Trucking & Logistics",
  "Retail & eCommerce",
  "Restaurants & Hospitality",
  "Travel & Tourism",
  "Education & Coaching",
  "Childcare & Education",
  "Pet Services",
  "Staffing & Recruitment",
  "Event Planning",
  "Photography & Creative",
  "Construction",
  "Manufacturing",
  "SaaS & Software",
  "Nonprofit",
  "Government & Public Sector",
  "Other",
];

export const BUSINESS_TYPES = [
  "Co-operative",
  "Corporation",
  "LLC or Sole-Proprietorship",
  "Non-profit Corporation",
  "Partnership",
];

export const JOB_TITLES = [
  "Owner",
  "Co-Owner / Partner",
  "CEO / President",
  "Director",
  "Marketing Manager",
  "Sales Manager",
  "Operations Manager",
  "Office Manager",
  "Practice Manager",
  "IT / Systems Administrator",
  "Consultant",
  "Other",
];

export const SERVICES_WANTED = [
  "CRM Setup & Management",
  "AI Voice Agents",
  "AI Workflow Automation",
  "Funnel & Website Builds",
  "Social Media Management",
  "Paid Ads (Google & Meta)",
  "Email & SMS Campaigns",
  "SEO & Content",
  "Reporting & Dashboards",
  "Reputation & Reviews",
  "White-Label Platform",
  "Not sure yet",
];

export const INTEGRATIONS = [
  "Calendly",
  "Cal.com",
  "Acuity",
  "Square",
  "Stripe",
  "PayPal",
  "QuickBooks",
  "Xero",
  "FreshBooks",
  "ServiceTitan",
  "Housecall Pro",
  "Jobber",
  "Massagebook.com",
  "Shopify",
  "WooCommerce",
  "WordPress",
  "Webflow",
  "Mailchimp",
  "ActiveCampaign",
  "Klaviyo",
  "HubSpot",
  "Salesforce",
  "Zoho",
  "Pipedrive",
  "Zapier",
  "Make",
  "Slack",
  "Notion",
  "Airtable",
  "Meta Ads",
  "Google Ads",
  "Twilio",
  "WhatsApp Business",
  "Zendesk",
  "Intercom",
  "DocuSign",
  "Mindbody",
  "Vagaro",
];

export const CRM_CONNECTIONS = [
  "Facebook Page",
  "Instagram",
  "Google Calendar",
  "Google Business Profile",
  "LinkedIn",
  "TikTok",
  "YouTube",
  "No social accounts yet",
];

export const WEBSITE_NEEDS = ["Yes", "No"];

/** Two rows pre-filled by name only (matching the reference flow) - the
 *  visitor fills in the credentials, not the platform names, for the two
 *  accesses we always need. */
export const DEFAULT_CREDENTIALS = [
  { id: "meta", platformName: "Meta Business Access", username: "", password: "" },
  { id: "domain", platformName: "Domain Access", username: "", password: "" },
];

/** A fresh object every call - INITIAL_FORM_DATA used to be a plain shared
 *  object, which meant every credential row edit mutated the same array
 *  every future page load (and every step-reset) read back from. */
export function createInitialFormData() {
  return {
    ...INITIAL_FORM_DATA_SHAPE,
    servicesWanted: [],
    integrations: [],
    connectCrm: [],
    credentials: DEFAULT_CREDENTIALS.map((row) => ({ ...row })),
  };
}

const INITIAL_FORM_DATA_SHAPE = {
  // Step 1 - General Business Info
  friendlyBusinessName: "",
  legalBusinessName: "",
  businessEmail: "",
  businessPhone: "",
  /* The dial code lives beside the number rather than inside it: validation
     and the webhook payload both need the region to read the digits. */
  businessPhoneCountry: "",
  businessNiche: "",
  /* No field on the form - set from the country the visitor picks (see
     handleCountryChange in pages/Onboarding.jsx) and reported from here. */
  businessCurrency: "",
  timeZone: "",
  streetAddress: "",
  city: "",
  stateRegion: "",
  postalZip: "",
  country: "",
  platformLanguage: "",
  outboundCommLanguage: "",

  // Step 2 - Business Registration
  businessType: "",
  registrationIdType: "",
  registrationNumber: "",
  notRegistered: false,
  repFirstName: "",
  repLastName: "",
  repEmail: "",
  repJobTitle: "",
  repPhone: "",
  repPhoneCountry: "",

  // Step 3 - Services & Integrations
  servicesWanted: [],
  goalsDescription: "",
  integrations: [],
  otherTool: "",
  needsNewWebsite: "",
  connectCrm: [],

  // Step 4 - Access & Credentials
  credentials: DEFAULT_CREDENTIALS,
};
