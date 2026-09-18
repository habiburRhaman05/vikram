/**
 * /pricing - all page copy.
 *
 * TIERS, PRICES, SETUP FEES AND FEATURES come straight from
 * data/pricingPlans.json - the one source of truth for what each plan
 * costs and includes. Don't hand-edit numbers here; edit the JSON and
 * this file's mapping picks them up everywhere the tiers render (this
 * page and the home page's "Plans" section in homeV2.jsx).
 *
 * The JSON has no annual pricing, so this page shows monthly pricing only
 * - no billing-period toggle. It also carries one flat `features` list per
 * tier (each higher tier opening with "Everything in <tier below>") rather
 * than a fixed set of comparable rows, so there is no cross-tier
 * feature-matrix table here - each tier's full list renders on its own
 * card instead.
 *
 * ADD-ONS pricing is illustrative in the same sense the old placeholder
 * data was: plausible, round, clearly a placeholder shape - not confirmed
 * rates. The JSON doesn't cover add-ons.
 *
 * NO INVENTED POLICY: the risk-reversal section does not promise a free
 * trial or a money-back guarantee, because neither is a real policy
 * anywhere else on this site. It uses what the business already commits to
 * elsewhere - month-to-month with no long contract, and no retainer before
 * you've seen a written plan (see billingNote below and every service
 * page's enquiry form).
 */

import pricingData from "./pricingPlans.json";

export const PRICING_NOTE = pricingData.pricingNote;

export const PRICING_HERO = {
  eyebrow: "Pricing",
  title: "Simple Plans That Scale With You",
  lede: "Pick the plan that fits where your business is today. Every tier is month-to-month, with no long contracts.",
  billingNote: "+ one-time setup - cancel any time",
};

/* -- Tiers ------------------------------------------------------------------
   Mapped 1:1 from pricingPlans.json: `price` -> monthly, `setupFee` -> setup
   (0 means no setup fee, null means custom/quoted), `description` -> bestFor,
   `features` -> the full feature list (not a trimmed teaser). No tier
   carries a "Most Popular" badge - the JSON doesn't flag one, so none is
   invented here. */
export const PRICING_TIERS = pricingData.pricingPlans.map((plan) => ({
  id: plan.name.toLowerCase(),
  name: plan.name,
  badge: null,
  bestFor: plan.description,
  monthly: plan.price,
  setup: plan.setupFee,
  cta:
    plan.billing === "custom"
      ? { label: "Contact Us", to: "/contact" }
      : { label: "Get Started", to: "/book" },
  features: plan.features,
}));

/* -- Add-ons ------------------------------------------------------------------ */

export const PRICING_ADDONS = {
  eyebrow: "Add-ons",
  title: "Optional Extras, Added When You Need Them",
  lede: "None of these are bundled by default - add them to any plan once you actually need them, not before.",
  items: [
    { icon: "key", title: "Additional sub-account", price: "$197/mo", body: "A second GoHighLevel sub-account for a new location or brand, configured the same way as your first." },
    { icon: "phone", title: "Extra AI voice line", price: "$97/mo", body: "An additional phone number with its own AI receptionist and call routing." },
    { icon: "layers", title: "Extra pipeline", price: "$47/mo", body: "A dedicated pipeline for a second offer or business line, kept separate from your main one." },
    { icon: "code", title: "Custom integration build", price: "From $750", body: "A one-time build connecting a platform that isn't covered by a ready-made connector." },
    { icon: "bolt", title: "Rush setup (48 hours)", price: "$500", body: "Your account configured and live within two business days instead of the standard five." },
    { icon: "message", title: "Dedicated support channel", price: "$147/mo", body: "A shared Slack or SMS channel with a same-day response commitment." },
  ],
};

/* -- FAQ ------------------------------------------------------------------------ */

export const PRICING_FAQ = {
  eyebrow: "FAQ",
  title: "Questions About Billing & Plans",
  lede: "What businesses ask before picking a plan.",
  items: [
    {
      question: "Is there a contract?",
      answer:
        "No. Every plan is month-to-month - you can cancel any time. The one-time setup fee covers the initial build and isn't refunded if you cancel afterward, but there's no ongoing commitment beyond that.",
    },
    {
      question: "What does the one-time setup fee cover?",
      answer:
        "On Starter, it's the initial build: your GoHighLevel sub-account configured, your domain and calendar connected, and A2P registration submitted before you're asked to pay for a first full month. Growth and Premium carry no separate setup fee.",
    },
    {
      question: "Can I change plans later?",
      answer:
        "Yes - upgrading takes effect on your next billing date, and we'll tell you upfront whether an upgrade needs any additional setup work. Downgrading is the same process in reverse.",
    },
    {
      question: "Are there any costs beyond the plan price?",
      answer: PRICING_NOTE,
    },
    {
      question: "Do I own what you build?",
      answer:
        "Yes. Your GoHighLevel account, your domain, your data - all of it is yours. If you ever leave, you take it with you.",
    },
    {
      question: "What if I'm not sure which plan fits?",
      answer:
        "That's what the free consultation is for - tell us what you're trying to fix and we'll say which plan actually covers it, including if the honest answer is a smaller plan than you were about to pick.",
    },
  ],
};

/* -- Risk-reversal closing CTA -------------------------------------------------
   No invented trial or guarantee - see the file header note. This closes
   on the commitments the business already makes elsewhere on the site.
   `steps` is the same three-step promise, shown as a "how it works" card
   beside the copy instead of only as a bullet list, so the trust claim is
   a concrete, checkable sequence rather than an abstract line - the same
   twenty-minute-call-then-written-plan sequence described on /book and in
   the FAQ above, not a new promise. */

export const PRICING_CLOSING = {
  eyebrow: "Before you commit",
  title: "See Your Exact Plan and Price Before You Sign Up for Anything.",
  lede:
    "Every plan is month-to-month and cancellable any time. Nobody gets asked for a retainer before seeing, in writing, what it costs and what they get.",
  points: [
    "Month-to-month on every plan - cancel any time, no long contract",
    "A free consultation before you commit to anything",
    "A written plan and price before you're asked to sign up",
  ],
  steps: [
    {
      title: "Book a free call",
      body: "Twenty minutes, screen shared, no slide deck - tell us how your business runs today.",
    },
    {
      title: "Get it in writing",
      body: "The exact plan, price and setup fee for your business, before anything is signed.",
    },
    {
      title: "You decide",
      body: "Start on your terms, ask more questions, or walk away - no pressure either way.",
    },
  ],
  primary: { label: "Get Free Consultation", to: "/book", icon: "arrowRight" },
  secondary: { label: "Talk to us first", to: "/contact" },
};
