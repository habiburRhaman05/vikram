/**
 * /services/white-label-platform - all page copy.
 *
 * Kept out of the page component for the same reason the other service data
 * files are - see the note atop serviceWebsitesLanding.jsx history / any
 * sibling service data file.
 *
 * NO INVENTED NUMBERS, NO INVENTED CLIENT CLAIMS: same rule as every other
 * service data file. HERO.mock is a coded UI mockup of a rebranded app, not
 * a screenshot of a real account - every name, number and domain in it is
 * placeholder sample data, labelled "Sample account" on the page itself.
 * WORK.items describe the shape of engagements of this kind, not named
 * clients or measured results - see WORK.note. The capability claims here
 * (custom domain, rebranded mobile app, sender-name control, and so on) are
 * real GoHighLevel agency features this service configures, not marketing
 * numbers, so they are stated plainly rather than hedged like a metric.
 */

/* -- 1. Hero ----------------------------------------------------------------- */

export const WL_HERO = {
  eyebrow: "White-Label Platform",
  titleLead: "Your Brand On Every Screen,",
  titleAccent: "Not Ours.",
  lede:
    "The CRM, the automations, the calendars and the messaging all run on GoHighLevel underneath - but every login, domain, email and app icon your clients see carries your name, not theirs.",

  primary: { label: "Get Free Consultation", to: "/book", icon: "arrowRight" },
  secondary: { label: "See What Gets Branded", href: "#branding" },

  /* Coded "rebranded app" mockup shown in the hero - sample data, not a
     real account. See the file header note above. */
  mock: {
    domain: "app.acmegrowth.com",
    brandName: "Acme Growth",
    navTabs: ["Dashboard", "Contacts", "Pipeline", "Automations"],
    stats: [
      { label: "Active clients", value: "128" },
      { label: "Open deals", value: "34" },
      { label: "MRR", value: "$18.4k" },
    ],
    pipeline: [
      { stage: "New", count: 12 },
      { stage: "Contacted", count: 9 },
      { stage: "Proposal", count: 6 },
      { stage: "Won", count: 7 },
    ],
    pins: [
      { n: 1, label: "Your logo & colors" },
      { n: 2, label: "Your domain" },
      { n: 3, label: "Your app name" },
      { n: 4, label: "Zero GoHighLevel branding" },
    ],
  },
};

/* -- 2. Overview --------------------------------------------------------------- */

export const WL_INTRO = {
  eyebrow: "The short version",
  title: "Your Clients Never Need to Know What's Running Underneath",
  quote: {
    text: "The test we use is simple: would a client ever see the word GoHighLevel? If the answer is yes, the rebrand isn't finished yet.",
    attribution: "Checked screen by screen, not assumed from a settings toggle.",
  },
  body: [
    "GoHighLevel is the engine - the CRM, the automations, the calendars, the messaging. White-labeling changes what a client actually sees: your logo on the login screen, your domain in the address bar, your name on the app icon, and your business at the bottom of every email. Not \"powered by,\" not a small logo in the corner of someone else's product - gone entirely.",
    "For an agency or consultant reselling this as your own platform, that difference is the business model. A client who spots a competitor's brand on the tool they're paying you for starts asking why they need you. A client who only ever sees yours doesn't ask, because as far as they know, you built it.",
    "We handle the full rebrand - domain, app identity, email and SMS sender names, mobile app listing, client portal - configured once, tested against every screen a client could reach, and kept working as GoHighLevel itself changes underneath it.",
  ],
  facts: [
    { icon: "globe", num: "100%", label: "White-labeled", sub: "No GoHighLevel name or logo anywhere a client can see" },
    { icon: "key", num: "1", label: "Your own domain", sub: "app.yourbrand.com, not a shared GoHighLevel subdomain" },
    { icon: "phone", num: "Branded", label: "Mobile app", sub: "Your name and icon in the App Store and Google Play" },
    { icon: "shieldCheck", num: "Ongoing", label: "Rechecked", sub: "Re-verified after GoHighLevel ships platform updates" },
  ],
};

/* -- 3. What gets branded (detail groups) --------------------------------------- */

export const WL_BRANDING = {
  eyebrow: "What gets branded",
  title: "Every Client-Facing Touchpoint, Not Just the Logo",
  lede: "The parts most rebrands miss - checked one at a time, not assumed from a single settings screen.",
  groups: [
    {
      icon: "globe",
      title: "Platform & domain",
      items: [
        "Custom domain (app.yourbrand.com)",
        "SSL and DNS configured and verified",
        "Custom login screen carrying your logo",
        "GoHighLevel's name removed from every visible setting",
      ],
    },
    {
      icon: "phone",
      title: "Mobile app",
      items: [
        "Your app name and icon in the App Store and Google Play",
        "Push notifications sent under your brand",
        "A client-facing app, not the generic default listing",
        "Updates published under your own developer account",
      ],
    },
    {
      icon: "mail",
      title: "Communications",
      items: [
        "Email sender name and reply-to address set to yours",
        "SMS sender ID shows your business name",
        "Notification templates rebranded, not just recolored",
        "No GoHighLevel footer text in any client-facing email",
      ],
    },
    {
      icon: "usersTwo",
      title: "Client portal & support",
      items: [
        "Client-facing portal styled to match your brand",
        "Your support contact shown, never GoHighLevel's",
        "Invoices and receipts carry your business details",
        "Nothing in the experience that would send a client searching",
      ],
    },
  ],
};

/* -- 4. How it works (process) --------------------------------------------------- */

export const WL_PROCESS = {
  eyebrow: "How it works",
  title: "From Your Logo to a Live Brand in Four Steps",
  lede: "The same sequence regardless of how many clients or brands you plan to run under it.",
  steps: [
    { num: "01", icon: "pen", title: "Send us your brand", body: "Logo, colors, domain and business name - assets you already have, nothing new to design." },
    { num: "02", icon: "sliders", title: "We configure every touchpoint", body: "Domain, app identity, email sender, mobile app listing and client portal, set up and connected." },
    { num: "03", icon: "shieldCheck", title: "We test it end to end", body: "Every screen a client could reach, checked for anything still showing GoHighLevel's name." },
    { num: "04", icon: "checkCircle", title: "You go live", body: "Clients log in to your brand from day one - the platform underneath stays invisible." },
  ],
  cta: { label: "Get Free Consultation", to: "/book", icon: "arrowRight" },
};

/* -- 5. Who it's for -------------------------------------------------------------- */

export const WL_USECASES = {
  eyebrow: "Who it's for",
  title: "Built for Anyone Reselling a Platform Under Their Own Name",
  lede: "Different reasons to want the branding invisible, same underlying need.",
  items: [
    { icon: "megaphone", title: "Marketing agencies", body: "Resell a CRM and automation platform as your own product, not a tool you recommend." },
    { icon: "graduationCap", title: "Coaches & consultants", body: "Give retainer clients a branded portal instead of sending them to a third-party login." },
    { icon: "building", title: "Multi-brand operators", body: "Run several brands from one back end without any of them looking related." },
    { icon: "usersTwo", title: "SaaS resellers", body: "Package the platform's engine under your own product name and pricing." },
    { icon: "target", title: "Franchises & multi-location groups", body: "One branded platform every location logs into, with your name on it." },
    { icon: "key", title: "Agencies onboarding their own clients", body: "A repeatable, branded build you can clone per client instead of configuring each one from scratch." },
  ],
};

/* -- 6. Representative work -------------------------------------------------------- */

export const WL_WORK = {
  eyebrow: "What a rebrand looks like",
  title: "Three representative builds",
  lede: "Each one started with the underlying platform's name showing up somewhere a client could see it.",
  note:
    "These describe the shape of work of this kind, not named client engagements - we do not publish client details or performance figures without written sign-off.",
  items: [
    {
      tag: "Marketing agency",
      title: "A reseller launched under its own name",
      problem: "The agency was reselling the platform directly - clients saw its default branding on every login, and several asked why they needed the agency at all.",
      built: [
        "Custom domain and a full login-screen rebrand",
        "Mobile app republished under the agency's own name",
        "Every client email and SMS re-sent under the agency's identity",
      ],
      outcome: "Clients now log in to the agency's own platform - the question of why they need the agency stopped coming up.",
    },
    {
      tag: "Coaching practice",
      title: "A client portal that stopped looking outsourced",
      problem: "A coaching business ran client check-ins through a generic-looking portal that undercut the premium price they were charging.",
      built: [
        "Client portal restyled to match the coach's own site",
        "Branded email sequences replacing the default templates",
        "A custom domain matching their existing website",
      ],
      outcome: "The portal now reads as part of the coach's own service, not a bolted-on tool.",
    },
    {
      tag: "Multi-brand agency",
      title: "Three brands, one back end, zero overlap",
      problem: "One agency ran three distinct brands from a single account, and clients of one brand could see hints of the others.",
      built: [
        "Three separate white-labeled domains and app identities",
        "Brand-specific email and SMS sender names",
        "Access separated so no client saw another brand's activity",
      ],
      outcome: "Each brand now looks, and operates, as if it runs on its own independent platform.",
    },
  ],
};

/* -- 7. Benefits --------------------------------------------------------------- */

export const WL_BENEFITS = {
  eyebrow: "The results",
  title: "What a Full Rebrand Gives You",
  lede: "Six things you can check for yourself once it's live.",
  items: [
    { icon: "shieldCheck", title: "Zero GoHighLevel branding", body: "Not hidden - removed. Nothing in the client experience points back to the platform underneath." },
    { icon: "trendUp", title: "Perceived value goes up", body: "A branded platform reads as something you built, not a tool you resell." },
    { icon: "key", title: "You own the relationship", body: "Support requests, logins and questions come to you, not to a third party." },
    { icon: "layers", title: "Scales across clients or brands", body: "The same rebrand approach works whether it's one business or twenty." },
    { icon: "phone", title: "Consistent on mobile too", body: "The app in a client's pocket carries your name, not a generic default." },
    { icon: "sliders", title: "Maintained, not one-and-done", body: "Rechecked as the platform changes, so a brand doesn't quietly slip through in an update." },
  ],
};

/* -- 8. Enquiry form ------------------------------------------------------------ */

export const WL_ENQUIRY = {
  service: "White-Label Platform",
  eyebrow: "Get started",
  title: "What does your brand need to look like?",
  lede:
    "Tell us your domain, your app name and where clients currently see anything that isn't yours. We'll come back with exactly what needs configuring and what it costs.",
  points: [
    "A review of every place the underlying platform currently shows through",
    "A proposed rebrand plan before you commit to anything",
    "No obligation, and no retainer to sign before you see the plan",
  ],
};

/* -- 9. FAQ ---------------------------------------------------------------------- */

export const WL_FAQ = {
  eyebrow: "FAQ",
  title: "Questions About White-Labeling",
  lede: "What agencies and consultants ask before rebranding the platform.",
  items: [
    {
      question: "Will my clients ever see the GoHighLevel name?",
      answer:
        "No - that's the standard we test against. Domain, login screen, mobile app, emails, SMS and the client portal are all checked and rebranded; if the platform's name would be visible anywhere in that path, it isn't finished.",
    },
    {
      question: "Does this need a developer or any code?",
      answer:
        "No. Domain, app identity and email/SMS branding are configured through settings the platform already provides - we handle the setup, DNS and verification directly.",
    },
    {
      question: "Can I run more than one brand?",
      answer:
        "Yes - each brand gets its own domain, app identity and sender names, kept separate so clients of one brand never see another.",
    },
    {
      question: "What happens when the platform updates?",
      answer:
        "We recheck the rebrand after major platform updates, since a new setting or feature occasionally ships without your branding applied by default - catching that is part of the ongoing setup.",
    },
    {
      question: "Do I need an existing logo and brand, or can you help build one?",
      answer:
        "You'll need a logo and basic brand assets already - this service applies an existing brand to the platform, it isn't a design service. Tell us if you need a logo built first and we'll point you in the right direction.",
    },
    {
      question: "How is this different from GoHighLevel Sub-account Setup?",
      answer:
        "Sub-account setup configures one client's CRM - pipelines, calendars, numbers. White-labeling configures how the whole platform presents itself, across every client and sub-account underneath it. Most agencies need both.",
    },
  ],
  card: {
    eyebrow: "Let's talk",
    title: "Where does your brand currently stop and the platform's start?",
    body: "Tell us what you're working with. We'll say exactly what needs to change before a client would never know the difference.",
    cta: { label: "Get Free Consultation", to: "/book", icon: "arrowRight" },
  },
};
