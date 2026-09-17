/**
 * /pricing - all page copy.
 *
 * TIERS, ANNUAL PRICING AND SETUP FEES ARE PLACEHOLDER NUMBERS, extended
 * from the same dummy data already live in homeV2.jsx's PRICING export (the
 * home page's "Plans" section) - see the comment there. This page reuses
 * those exact tier names, monthly prices and setup fees rather than
 * inventing a second, conflicting set of numbers; it only adds what that
 * section doesn't carry (annual pricing, the full feature matrix, add-ons).
 * ANNUAL_DISCOUNT and every `annualMonthly` figure below must be confirmed
 * or replaced with real numbers before this page ships - same rule as the
 * home page section.
 *
 * ADD-ONS pricing is illustrative in the same sense: plausible, round,
 * clearly a placeholder shape - not confirmed rates.
 *
 * NO INVENTED POLICY: the risk-reversal section does not promise a free
 * trial or a money-back guarantee, because neither is a real policy
 * anywhere else on this site. It uses what the business already commits to
 * elsewhere - month-to-month with no long contract, and no retainer before
 * you've seen a written plan (see billingNote below and every service
 * page's enquiry form).
 */

export const PRICING_HERO = {
  eyebrow: "Pricing",
  title: "Simple Plans That Scale With You",
  lede: "Pick the plan that fits where your business is today. Every tier is month-to-month, with no long contracts.",
  billingNote: "+ one-time setup - cancel any time",
  annualNote: "Billed annually - 20% off the monthly rate",
  annualDiscount: 20,
};

/* -- Tiers ------------------------------------------------------------------
   Same id/name/monthly price/setup fee as homeV2.jsx's PRICING.tiers -
   annualMonthly is new here (20% off, rounded to a clean number). */
export const PRICING_TIERS = [
  {
    id: "starter",
    name: "Starter",
    badge: null,
    bestFor: "Solo operators and small teams losing leads to slow follow-up",
    monthly: 497,
    annualMonthly: 397,
    setup: 497,
    cta: { label: "Get Started", to: "/book" },
    features: [
      "GoHighLevel sub-account setup",
      "Lead capture forms & booking calendar",
      "Missed-call text-back",
      "Email & SMS follow-up sequences",
      "Single pipeline & CRM",
      "Ready in 5 business days",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    badge: "Most Popular",
    bestFor: "Growing businesses running paid, organic and referral leads at once",
    monthly: 997,
    annualMonthly: 797,
    setup: 1500,
    cta: { label: "Get Started", to: "/book" },
    features: [
      "Everything in Starter",
      "AI chat & voice receptionist",
      "Multi-channel campaigns (SMS, email, social)",
      "Review request automation",
      "Multi-stage pipelines & reporting dashboard",
      "Monthly strategy call",
    ],
  },
  {
    id: "command",
    name: "Command",
    badge: null,
    bestFor: "Established businesses ready to unify every tool into one system",
    monthly: 1997,
    annualMonthly: 1597,
    setup: 3500,
    cta: { label: "Schedule a Call", to: "/book" },
    features: [
      "Everything in Growth",
      "Custom AI workflow automation",
      "Full website or app build",
      "Invoicing & payment collection",
      "Team roles, permissions & reporting",
      "Priority support",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    badge: null,
    bestFor: "Multi-location or franchise operators needing centralised control",
    monthly: null,
    annualMonthly: null,
    setup: null,
    cta: { label: "Contact Us", to: "/contact" },
    features: [
      "Everything in Command",
      "Multi-location management",
      "API & custom integrations",
      "Dedicated account manager",
      "Custom onboarding & training",
      "Volume-based pricing",
    ],
  },
];

/* -- Feature comparison matrix ------------------------------------------------
   One row per feature, one value per tier in PRICING_TIERS order. A value
   is `true` (included), `false` (not included) or a string (a value that
   varies by tier rather than a plain yes/no, e.g. pipeline complexity). */
export const PRICING_MATRIX = {
  eyebrow: "Compare plans",
  title: "Exactly What Each Tier Includes",
  lede: "The same six-tier feature list as the cards above, laid out so every difference between plans is checkable at a glance.",
  groups: [
    {
      label: "Core system",
      rows: [
        { label: "GoHighLevel sub-account setup", values: [true, true, true, true] },
        { label: "Lead capture forms & booking calendar", values: [true, true, true, true] },
        { label: "Missed-call text-back", values: [true, true, true, true] },
        { label: "Email & SMS follow-up sequences", values: [true, true, true, true] },
        { label: "Pipelines", values: ["Single", "Multi-stage", "Multi-stage", "Multi-stage"] },
        { label: "Reporting dashboard", values: [false, true, true, true] },
      ],
    },
    {
      label: "Automation & campaigns",
      rows: [
        { label: "AI chat & voice receptionist", values: [false, true, true, true] },
        { label: "Multi-channel campaigns (SMS, email, social)", values: [false, true, true, true] },
        { label: "Review request automation", values: [false, true, true, true] },
        { label: "Custom AI workflow automation", values: [false, false, true, true] },
      ],
    },
    {
      label: "Build & operations",
      rows: [
        { label: "Website or app build", values: [false, false, true, true] },
        { label: "Invoicing & payment collection", values: [false, false, true, true] },
        { label: "Team roles & permissions", values: [false, false, true, true] },
        { label: "API & custom integrations", values: [false, false, "Add-on", true] },
        { label: "Multi-location management", values: [false, false, false, true] },
      ],
    },
    {
      label: "Support",
      rows: [
        { label: "Monthly strategy call", values: [false, true, true, true] },
        { label: "Priority support", values: [false, false, true, true] },
        { label: "Dedicated account manager", values: [false, false, false, true] },
        { label: "Custom onboarding & training", values: [false, false, false, true] },
      ],
    },
  ],
};

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
        "The initial build: your GoHighLevel sub-account configured, forms and calendars connected, and the automations for your plan turned on and tested before you're asked to pay for a first full month.",
    },
    {
      question: "Can I change plans later?",
      answer:
        "Yes - upgrading takes effect on your next billing date, and we'll tell you upfront whether an upgrade needs any additional setup work. Downgrading is the same process in reverse.",
    },
    {
      question: "What's the difference between monthly and annual billing?",
      answer:
        "The plan and features are identical either way. Annual billing is paid upfront for the year at a reduced monthly rate; monthly billing charges the full rate each month with no commitment beyond that month.",
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
   on the commitments the business already makes elsewhere on the site. */

export const PRICING_CLOSING = {
  eyebrow: "Before you commit",
  title: "No Long Contract. No Retainer Before You See a Plan.",
  lede:
    "Every plan is month-to-month and cancellable any time. And you don't have to pick one blind - a free consultation gets you a written recommendation first.",
  points: [
    "Month-to-month on every plan - cancel any time, no long contract",
    "A free consultation before you commit to anything",
    "A written plan and price before you're asked to sign up",
  ],
  primary: { label: "Get Free Consultation", to: "/book", icon: "arrowRight" },
  secondary: { label: "Talk to us first", to: "/contact" },
};
