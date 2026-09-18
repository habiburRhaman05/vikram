/**
 * /services/gohighlevel-sub-accounts - all page copy.
 *
 * Kept out of the page component for the same reason the other service data
 * files are. Section order here mirrors the order the page renders it in.
 *
 * NO INVENTED NUMBERS. The setup list is a list of decisions made during a
 * build (timezone, sender identity, A2P registration, permission scopes),
 * not a count of anything we have done. There is no "clients served" or
 * "hours saved" claim on this page for that reason.
 *
 * ASSETS - provenance, so these can be re-sourced or replaced knowingly:
 *   /img/services/ghl-numbers.jpg|webp
 *     Pexels #6016348 (same license). Two people reading a growth chart
 *     off a laptop in an office. 1240x930, used by the process section.
 */

/* -- 1. Hero --------------------------------------------------------------- */

export const GHL_HERO = {
  eyebrow: "GoHighLevel sub-accounts",
  titleLead: "Your whole platform,",
  titleAccent: "set up properly.",
  lede:
    "A sub-account is where the CRM, calendars, pipelines, automations and numbers actually live. We build it end to end, in the order that avoids rework, with the compliance steps filed early and the settings that cause trouble later decided deliberately instead of by default.",

  primary: { label: "Get Free Consultation", to: "/book", icon: "arrowRight" },
  /* Fragment link down to the configuration list, offset by
     html { scroll-padding-top } in legacy/styles.css. */
  secondary: { label: "See What Gets Configured", href: "#setup" },

};

/* -- 2. What gets configured ---------------------------------------------- */

export const GHL_SETUP = {
  eyebrow: "What gets configured",
  title: "Everything a Sub-account Needs, in One Build",
  lede:
    "Most of the trouble inside GoHighLevel is a setting nobody decided: the timezone on a calendar, the name a message is sent from, the number a text leaves on. The list below is what we configure and write down, so none of it gets discovered later at the worst possible moment.",

  image: "/img/services/desk.jpg",
  imageWebp: "/img/services/desk.webp",
  imageAlt: "A laptop, plant and coffee on a wooden desk",
  checks: [
    "Account, timezone and business details",
    "Custom domain, SSL and sending identity",
    "Local numbers, A2P registration and SMS consent",
    "Calendars, availability, buffers and booking pages",
    "Pipelines, stages and deal values",
    "Forms, surveys and intake questions",
    "Users, roles and permission scopes",
    "Email and SMS templates in your own words",
    "Workflows, triggers and the exceptions they handle",
    "Snapshots, so the next account starts from this one",
    "Reporting views the owner will actually open",
    "Integration credentials stored and documented",
  ],

  cta: { label: "Get Free Consultation", to: "/book" },


  note: "Decided once, recorded, and yours",
};

/* -- 3. What we set up ---------------------------------------------------- */

export const GHL_GRID = {
  eyebrow: "The build",
  title: "Six Areas We Cover",
  subtitle: "From the domain through to the reporting the owner opens.",
  lede:
    "The order matters more than it looks. Compliance has a waiting period, permissions have to exist before the people arrive, and a snapshot built before the configuration settles just copies the mess forward.",

  items: [
    {
      icon: "globe",
      title: "Account and domain",
      body: "Business details, timezone, custom domain with SSL, and a sending identity your recipients recognise.",
    },
    {
      icon: "phone",
      title: "Numbers and compliance",
      body: "Local numbers, A2P registration and consent language handled so text messaging works and keeps working.",
    },
    {
      icon: "calendar",
      title: "Calendars and booking",
      body: "Availability, buffers, lead time and booking pages that match how appointments actually get made.",
    },
    {
      icon: "sliders",
      title: "Pipelines and workflows",
      body: "Stages, forms, triggers and the exceptions, tested with real sample contacts rather than assumed.",
    },
    {
      icon: "usersTwo",
      title: "Users and permissions",
      body: "Seats, roles and scopes set so the team sees their own work, and only what they need to see.",
    },
    {
      icon: "layers",
      title: "Snapshots and handover",
      body: "The configuration saved as a snapshot, then handed over with a walkthrough and the settings written down.",
    },
  ],

  cta: { label: "Get Free Consultation", to: "/book" },
};

/* -- 4. How the build runs ------------------------------------------------ */

export const GHL_PROCESS = {
  eyebrow: "Our process",
  title: "How the Build Runs",
  lede:
    "Five steps, in this order for a reason. Step three has a waiting period attached to it, which is why it does not sit at the end.",

  image: "/img/services/ghl-numbers.jpg",
  imageWebp: "/img/services/ghl-numbers.webp",
  imageAlt: "Two colleagues looking at a growth chart on a laptop in an office",
  steps: [
    {
      num: "01",
      icon: "search",
      title: "Kickoff and access",
      body: "We agree who owns the account, get the right level of access, and confirm the details that appear on every message you send.",
    },
    {
      num: "02",
      icon: "layers",
      title: "Base configuration",
      body: "Domain, senders, calendars, pipelines and users set in the order that avoids going back over them.",
    },
    {
      num: "03",
      icon: "phone",
      title: "Numbers and compliance",
      body: "Numbers bought, A2P registration filed and consent handled, filed early because approval takes time.",
    },
    {
      num: "04",
      icon: "sliders",
      title: "Workflows and testing",
      body: "Automations built and run with test contacts, including the paths where a lead goes quiet or books twice.",
    },
    {
      num: "05",
      icon: "shieldCheck",
      title: "Handover and support",
      body: "A walkthrough for your team, a recorded session to keep, and ongoing changes handled by the people who built it.",
    },
  ],


  /* Floating chips over the process photo, as the reference layout does. */
  chips: [
    { icon: "key", label: "Access arranged first" },
    { icon: "fileCheck", label: "Compliance filed early" },
    { icon: "play", label: "Walkthrough recorded" },
    { icon: "usersTwo", label: "Same team after launch" },
  ],

  cta: { label: "Book the Kickoff Call", to: "/book", icon: "arrowRight" },
};

/* -- 5. Who it is for ----------------------------------------------------- */

export const GHL_WHO = {
  eyebrow: "Who it is for",
  title: "Three Kinds of Business We Build This For",
  lede:
    "The configuration is similar; what changes is who has to live in it afterwards, and which parts of the platform matter most to them.",

  groups: [
    {
      icon: "building",
      title: "Agencies onboarding clients",
      body: "Stand a client account up the same way every time, then hand it over with the configuration already documented.",
      points: ["Repeatable build from a snapshot", "Client logins scoped properly", "Your agency account stays yours"],
    },
    {
      icon: "usersTwo",
      title: "In-house teams leaving spreadsheets",
      body: "One place for leads, follow-up and reporting, without rebuilding the process every time somebody leaves.",
      points: ["Existing data moved in and checked", "The team trained on their own queues", "Owner reporting they will open"],
    },
    {
      icon: "heart",
      title: "Clinics and offices with a front desk",
      body: "Bookings, reminders and intake joined to the record, so the patient conversation and the admin record match.",
      points: ["Front desk booking connected", "Reminders sent without a list", "Intake forms mapped to the record"],
    },
  ],

  cta: { label: "Get Free Consultation", to: "/book" },
};

/* -- 6. FAQ + contact card ------------------------------------------------ */

export const GHL_FAQ = {
  eyebrow: "FAQ",
  title: "Questions About Sub-accounts",
  lede: "What businesses ask before they hand over the platform.",

  items: [
    {
      question: "Do we need our own GoHighLevel account first?",
      answer:
        "Either way works. If you already have one we build inside it and set your permissions; if you do not, we help you choose the right plan and set the account up in the order the platform expects.",
    },
    {
      question: "Who owns the account and the data?",
      answer:
        "You do. It is set up in your business name, with your billing, and your team holds the owner login. We work with delegated access, and that access can be revoked at any time without breaking anything we built.",
    },
    {
      question: "What is A2P registration, and why does it take time?",
      answer:
        "It is the carrier registration that lets a business send application to person texts in the United States. It has a waiting period and needs correct business details, which is why we file it early rather than at the end of a build.",
    },
    {
      question: "Can you move our current data in?",
      answer:
        "Yes. Contacts, pipelines and templates can be brought across and checked, though it is worth being selective: most crowded CRMs are carrying years of duplicates that are better cleaned during the move than after it.",
    },
    {
      question: "What happens to the setup if we stop working together?",
      answer:
        "It stays exactly where it is. The account is yours, the configuration is documented, and a snapshot is saved so the build can be understood or repeated without us in the room.",
    },
  ],

  card: {
    eyebrow: "Let's talk",
    title: "Ready to get the platform set up properly?",
    body: "Tell us what you sell and who books with you. We will map the sub-account, the numbers and the compliance steps onto your business.",
    cta: { label: "Get Free Consultation", to: "/book", icon: "arrowRight" },
  },
};

/* -- 7. Intro -------------------------------------------------------------- */

export const GHL_INTRO = {
  eyebrow: "The short version",
  title: "Why setup is the whole job",
  quote: {
    text: "GoHighLevel arrives empty. Every hour you spend learning to configure it is an hour you did not spend running your business.",
    attribution: "The platform is not the product. A platform configured for your business is.",
  },
  body: [
    "A GoHighLevel sub-account out of the box is a set of very capable, entirely blank tools. No number, no calendar, no pipeline, no compliance registration, no automations - and a list of settings that assumes you already know what A2P, LC Phone and a snapshot are.",
    "Most businesses that buy it alone end up using about a tenth of it, because the gap between signing up and having something useful is measured in weeks of self-teaching. The features were never the problem; the configuration was. That is the part we do.",
    "We set up the sub-account the way it should have arrived: your number registered and compliant, your domain connected, your calendars matching how you actually book, your pipeline named the way your team already talks, and the automations that carry a lead from first contact to booked and paid. Then we walk you through all of it on a call, and record it so the next person you hire can watch it too.",
  ],
  facts: [
    { num: "1", label: "Sub-account, fully configured", sub: "Not a template you finish yourself" },
    { num: "A2P", label: "Registration filed for you", sub: "Before it blocks your first campaign" },
    { num: "All", label: "Of it handed over", sub: "Walkthrough recorded, documentation included" },
    { num: "1-2 wks", label: "Typical time to live", sub: "Faster if access is ready on day one" },
  ],
};

/* -- 8. The detail --------------------------------------------------------- */

export const GHL_DETAILS = {
  eyebrow: "The detail",
  title: "What's actually included",
  lede:
    "The settings that take a week to work out on your own, and the ones that quietly break a launch if they are skipped.",
  groups: [
    {
      icon: "phone",
      title: "Numbers and messaging",
      items: [
        "A local number provisioned, with call forwarding and recording set",
        "A2P 10DLC brand and campaign registration filed properly",
        "Sender reputation and opt-out handling configured from the start",
        "Voicemail, missed-call-to-text and business-hours routing",
      ],
    },
    {
      icon: "globe",
      title: "Domains and calendars",
      items: [
        "Your domain or subdomain connected, with DNS verified",
        "Email sending authenticated - SPF, DKIM and DMARC records",
        "Calendars matching real availability, durations and buffers",
        "Round-robin or per-service routing where you need it",
      ],
    },
    {
      icon: "sliders",
      title: "Pipeline and automations",
      items: [
        "Stages named the way your team already names them",
        "Lead capture writing to the pipeline with its source attached",
        "The core sequences: acknowledge, remind, follow up, re-engage",
        "Internal notifications so hand-offs do not depend on memory",
      ],
    },
    {
      icon: "usersTwo",
      title: "Team and handover",
      items: [
        "User seats and permissions set per role, not all-admin",
        "A recorded walkthrough of everything we configured",
        "Plain-language documentation of what fires and when",
        "The same team on support afterwards, not a ticket queue",
      ],
    },
  ],
};

/* -- 9. Who it is for ------------------------------------------------------ */

export const GHL_USECASES = {
  eyebrow: "Who it's for",
  title: "Five situations this solves",
  lede:
    "Almost everyone who asks for this is in one of these positions. The fix is the same: configuration, done once, properly.",
  items: [
    { icon: "plus", title: "Brand new to GoHighLevel", body: "You have bought it, opened it, and found a very capable empty box. We fill it in and show you how it works." },
    { icon: "clock", title: "Bought it months ago", body: "It is still half-configured because the day job kept winning. We finish it rather than start again." },
    { icon: "phoneOff", title: "Blocked by compliance", body: "Messages are not delivering because A2P was never registered properly. We file it and get sending working." },
    { icon: "layers", title: "Migrating from another CRM", body: "Contacts, pipelines and history moved across without losing the record of who came from where." },
    { icon: "graduationCap", title: "Agencies onboarding clients", body: "A repeatable sub-account build you can clone per client, white-labelled under your own brand." },
    { icon: "users", title: "Growing past spreadsheets", body: "The jump from a shared inbox and a spreadsheet to one system that holds the whole pipeline." },
  ],
};

/* -- 10. Representative work ---------------------------------------------- */

export const GHL_WORK = {
  eyebrow: "What a build looks like",
  title: "Three representative builds",
  lede:
    "The specifics change with the trade. The order of work almost never does: access, compliance, configuration, then handover.",
  note:
    "These describe the shape of work of this kind, not named client engagements - we do not publish client details or performance figures without written sign-off.",
  items: [
    {
      tag: "From scratch",
      title: "An empty sub-account made useful",
      problem: "The platform had been paid for two months and nothing had been configured beyond the login.",
      built: [
        "Number provisioned and A2P registration filed on day one",
        "Calendars, pipeline stages and lead capture built around the real workflow",
        "Core automations for acknowledgement, reminders and follow-up",
      ],
      outcome: "A sub-account that does the job it was bought for, with a recorded walkthrough of every part of it.",
    },
    {
      tag: "Unblocking",
      title: "Messages that would not deliver",
      problem: "Texts were failing silently because the A2P brand and campaign had never been completed.",
      built: [
        "Brand and campaign registration completed and resubmitted correctly",
        "Opt-in language and opt-out handling corrected across every form",
        "Sending reputation rebuilt with a controlled ramp rather than a blast",
      ],
      outcome: "Messaging delivers, and the compliance paperwork behind it is filed rather than half-done.",
    },
    {
      tag: "Agency clone",
      title: "One build, repeatable per client",
      problem: "Each new client was being configured by hand, slightly differently, by whoever had time.",
      built: [
        "A reference sub-account built as the standard, then snapshotted",
        "A documented onboarding checklist covering access and compliance",
        "White-label domain and branding so it is the agency's product",
      ],
      outcome: "New clients launch from a known-good starting point instead of somebody's best guess that week.",
    },
  ],
};

/* -- 11. Benefits ---------------------------------------------------------- */

export const GHL_BENEFITS = {
  eyebrow: "The results",
  title: "What you get out of a proper setup",
  lede: "Six things that are true on the day you go live.",
  items: [
    { icon: "bolt", title: "Live in weeks, not months", body: "No self-teaching phase before the platform earns anything." },
    { icon: "shieldCheck", title: "Compliant from day one", body: "A2P filed properly, so campaigns are not blocked later." },
    { icon: "sliders", title: "Configured to your words", body: "Stages and services named the way your team already talks." },
    { icon: "usersTwo", title: "Your team can use it", body: "Permissions per role and a walkthrough they can rewatch." },
    { icon: "key", title: "You own it", body: "Your accounts, your data, your sub-account - not ours." },
    { icon: "layers", title: "Ready to build on", body: "A clean base for automations, funnels and AI agents next." },
  ],
};

/* -- 12. Enquiry form ------------------------------------------------------ */

export const GHL_ENQUIRY = {
  service: "GoHighLevel Sub-accounts",
  eyebrow: "Get started",
  title: "Tell us where the setup stalled",
  lede:
    "Whether it is brand new, half-finished or blocked on compliance - tell us where you are and we will come back with what is left to do and what it costs.",
  points: [
    "A straight answer on what is missing and what order to fix it in",
    "Compliance handled properly rather than left to chance",
    "No obligation, and no retainer to sign before you see the plan",
  ],
};
