/**
 * /services/reporting-dashboards - all page copy.
 *
 * Kept out of the page component for the same reason the other service data
 * files are - see the note atop serviceWebsitesLanding.jsx.
 *
 * NO INVENTED NUMBERS, NO INVENTED CLIENT CLAIMS: same rule as every other
 * service data file. HERO.dash is a coded UI mockup of a dashboard, not a
 * screenshot of a real account or real performance - every number in it is
 * placeholder sample data, labelled "Sample dashboard" on the page itself,
 * the same way the Social Media and Email & SMS pages label their sample
 * post/message mockups. WORK.items describe the shape of engagements of
 * this kind, not named clients or measured results - see WORK.note.
 */

/* -- 1. Hero ----------------------------------------------------------------- */

export const RD_HERO = {
  eyebrow: "Reporting dashboards",
  titleLead: "Every number in one place,",
  titleAccent: "updated as it happens.",
  lede:
    "Source, conversion and revenue visible on one screen - so nobody has to export a spreadsheet to find out what's actually working.",

  primary: { label: "Get Free Consultation", to: "/book", icon: "arrowRight" },
  secondary: { label: "See What Gets Tracked", href: "#widgets" },

  /* Coded dashboard mockup shown in the hero - sample data, not a real
     account. See the file header note above. */
  dash: {
    tabs: ["Overview", "Sources", "Revenue"],
    kpis: [
      { label: "New leads", value: "128", delta: "+12%" },
      { label: "Booked calls", value: "54", delta: "+8%" },
      { label: "Cost / lead", value: "$19", delta: "-6%" },
    ],
    sources: [
      { icon: "search", label: "Organic search", pct: 38 },
      { icon: "megaphone", label: "Paid ads", pct: 27 },
      { icon: "instagram", label: "Social", pct: 19 },
      { icon: "mail", label: "Email & SMS", pct: 16 },
    ],
  },
};

/* -- 2. Intro ----------------------------------------------------------------- */

export const RD_INTRO = {
  eyebrow: "The short version",
  title: "If you can't see it, you can't fix it",
  quote: {
    text: "A dashboard nobody reads is just a prettier spreadsheet. The point was never the chart - it's the decision it changes.",
    attribution: "The best dashboards answer one question: what do we do next.",
  },
  body: [
    "Most businesses can answer \"how many leads did we get\" but not much past it. Which channel actually produced them, what they cost, how many turned into a booked call, how many of those became revenue - that chain lives across a CRM, an ad account, a calendar and someone's memory, and nobody has the time to reconcile it every week. So the honest answer to \"is marketing working\" is usually a shrug.",
    "A dashboard fixes the visibility problem, not the marketing problem. It doesn't make a bad campaign good - it makes it obvious which one is bad, in time to actually change something, instead of finding out at the end of the quarter when the spend is already gone.",
    "We connect the sources, define what each number actually means so it's consistent across every chart, and build the views around the decisions you actually make - not a generic template with sixty widgets nobody opens.",
  ],
  facts: [
    { icon: "lineChart", num: "Live", label: "Data refresh", sub: "Numbers update as new activity comes in" },
    { icon: "layers", num: "1", label: "Place for every number", sub: "Leads, calls and revenue - one dashboard, not five tools" },
    { icon: "shieldCheck", num: "Role-based", label: "Access", sub: "Owners see everything; staff see only what's theirs" },
    { icon: "calendar", num: "Monthly", label: "Reviewed with you", sub: "A walkthrough of what the numbers actually mean" },
  ],
};

/* -- 3. What's on the dashboard (widget grid) --------------------------------- */

export const RD_WIDGETS = {
  eyebrow: "What's on the dashboard",
  title: "Six Views Into the Business",
  lede:
    "Not sixty widgets nobody opens - the views that actually get checked, built around the decisions they inform.",
  items: [
    {
      icon: "search",
      type: "Bar chart",
      title: "Lead sources",
      body: "Every channel a lead can arrive from, compared side by side instead of guessed at.",
    },
    {
      icon: "target",
      type: "Funnel",
      title: "Funnel & conversion",
      body: "Lead to booked call to closed deal, with the drop-off between each stage visible.",
    },
    {
      icon: "wallet",
      type: "Line chart",
      title: "Revenue & lifetime value",
      body: "Revenue tracked over time, tied back to the source and campaign that produced it.",
    },
    {
      icon: "phone",
      type: "Table",
      title: "Call & booking activity",
      body: "Every call and booking logged, with who handled it and how quickly.",
    },
    {
      icon: "megaphone",
      type: "Bar chart",
      title: "Campaign performance",
      body: "Spend, leads and cost per lead compared across every campaign currently running.",
    },
    {
      icon: "users",
      type: "Line chart",
      title: "Team & response time",
      body: "How fast leads get a first reply, broken out by who's answering.",
    },
  ],
};

/* -- 4. How it gets built (data pipeline) -------------------------------------- */

export const RD_PROCESS = {
  eyebrow: "How it gets built",
  title: "From Scattered Tools to One Screen",
  lede: "The same four stages regardless of how many tools your data currently lives in.",
  steps: [
    { num: "01", icon: "key", title: "Connect the sources", body: "Your CRM, ad accounts, calendar and forms linked so the data starts flowing into one place." },
    { num: "02", icon: "sliders", title: "Model the data", body: "Leads, calls, revenue and cost mapped to a shared structure, so numbers from different tools can actually be compared." },
    { num: "03", icon: "lineChart", title: "Build the dashboard", body: "Charts and tables built around the decisions you actually make, not a generic template." },
    { num: "04", icon: "calendar", title: "Review it monthly", body: "A walkthrough of what changed and what it means, not just a link to a page nobody opens." },
  ],
  cta: { label: "Get Free Consultation", to: "/book", icon: "arrowRight" },
};

/* -- 5. What's included --------------------------------------------------------- */

export const RD_DETAILS = {
  eyebrow: "The detail",
  title: "What's actually included",
  lede: "The parts of a working dashboard that don't show up in a single screenshot.",
  groups: [
    {
      icon: "key",
      title: "Data & connections",
      items: [
        "CRM, ad accounts, calendar and forms connected as sources",
        "Historical data brought in, not just data from launch day forward",
        "A clear owner for what happens if a connection breaks",
        "New sources added as you pick up new channels",
      ],
    },
    {
      icon: "lineChart",
      title: "Dashboard build",
      items: [
        "Views built around your decisions, not a generic template",
        "Charts chosen for what they're actually good at - no decoration for its own sake",
        "Role-based access so staff see only what's relevant to them",
        "Mobile-friendly, so the numbers are checkable from a phone",
      ],
    },
    {
      icon: "shieldCheck",
      title: "Accuracy & governance",
      items: [
        "Every metric defined once, so \"a lead\" means the same thing on every chart",
        "Duplicate and test records filtered out of the numbers",
        "Changes to definitions documented, not made silently",
        "A single source of truth instead of five tools disagreeing",
      ],
    },
    {
      icon: "calendar",
      title: "Ongoing support",
      items: [
        "A monthly walkthrough of what changed and what to do about it",
        "Dashboards updated as your offers, team or channels change",
        "A direct line to ask what a number actually means",
        "Adjustments made as you learn which views you actually use",
      ],
    },
  ],
};

/* -- 6. Who it's for -------------------------------------------------------------- */

export const RD_USECASES = {
  eyebrow: "Who it's for",
  title: "The Six Businesses We Build This For",
  lede: "Different reasons to want visibility, same underlying need: one place to check instead of five.",
  items: [
    { icon: "house", title: "Local service businesses", body: "Which channel actually produces booked jobs, not just form fills." },
    { icon: "building", title: "Multi-location businesses", body: "One dashboard comparing every location instead of five separate spreadsheets." },
    { icon: "megaphone", title: "Businesses running paid ads", body: "Cost per lead and cost per booking, visible per campaign, not estimated at month end." },
    { icon: "usersTwo", title: "Growing teams", body: "Response time and booking rate visible per team member, without a manual audit." },
    { icon: "graduationCap", title: "Coaches & consultants", body: "Which content and channel actually turns into paying clients." },
    { icon: "cart", title: "Retail & eCommerce", body: "Revenue and repeat purchase rate tracked alongside the marketing that drove it." },
  ],
};

/* -- 7. Representative work -------------------------------------------------------- */

export const RD_WORK = {
  eyebrow: "What building a dashboard looks like",
  title: "Three representative builds",
  lede: "Each one started with the numbers scattered across tools that didn't talk to each other.",
  note:
    "These describe the shape of work of this kind, not named client engagements - we do not publish client details or performance figures without written sign-off.",
  items: [
    {
      tag: "Multi-channel",
      title: "Five spreadsheets replaced by one screen",
      problem: "Lead source, ad spend and booking data lived in three separate tools, reconciled by hand once a month.",
      built: [
        "CRM, ad accounts and calendar connected as live sources",
        "A single dashboard comparing every channel side by side",
        "Cost per lead and cost per booking visible per campaign",
      ],
      outcome: "What used to take a half-day of manual reconciliation is now a screen that's already up to date.",
    },
    {
      tag: "Multi-location",
      title: "One view across locations that used to report separately",
      problem: "Each location tracked its own numbers differently, so comparing them meant three separate conversations.",
      built: [
        "A shared data model so every location's numbers mean the same thing",
        "One dashboard with a per-location filter instead of three reports",
        "A monthly review comparing all locations on the same screen",
      ],
      outcome: "Locations are now genuinely comparable, and the monthly review is one conversation instead of three.",
    },
    {
      tag: "Team visibility",
      title: "Response time made visible for the first time",
      problem: "Nobody could say how fast leads were actually getting a first reply, or from whom.",
      built: [
        "Call and message timestamps tied back to each lead's record",
        "A response-time view broken out by team member",
        "An alert when a lead has gone unanswered past a set window",
      ],
      outcome: "Response time is now a number the team can see and manage, not a guess raised in a meeting.",
    },
  ],
};

/* -- 8. Benefits --------------------------------------------------------------- */

export const RD_BENEFITS = {
  eyebrow: "The results",
  title: "What a working dashboard gives you",
  lede: "Six things you can check for yourself once it's live.",
  items: [
    { icon: "lineChart", title: "One place to check", body: "Not five tools and a spreadsheet stitched together by hand." },
    { icon: "search", title: "Sources compared honestly", body: "Every channel measured the same way, side by side." },
    { icon: "wallet", title: "Revenue tied to its source", body: "Not just spend and leads - what actually closed and from where." },
    { icon: "shieldCheck", title: "Numbers you can trust", body: "Defined once, so every chart agrees with every other chart." },
    { icon: "phone", title: "Visible from a phone", body: "Checkable between appointments, not just at a desk." },
    { icon: "calendar", title: "A monthly review, not silence", body: "A walkthrough of what changed, not just a login." },
  ],
};

/* -- 9. Enquiry form ------------------------------------------------------------ */

export const RD_ENQUIRY = {
  service: "Reporting Dashboards",
  eyebrow: "Get started",
  title: "What would you actually want to see?",
  lede:
    "Tell us where your numbers currently live and what you wish you could answer in one look. We'll come back with what a dashboard would show and what it would cost to build.",
  points: [
    "A review of what's currently trackable versus what's guesswork",
    "A proposed set of views before you commit to anything",
    "No obligation, and no retainer to sign before you see the plan",
  ],
};

/* -- 10. FAQ ---------------------------------------------------------------------- */

export const RD_FAQ = {
  eyebrow: "FAQ",
  title: "Questions About Reporting Dashboards",
  lede: "What businesses ask before connecting their data.",
  items: [
    {
      question: "What sources can actually be connected?",
      answer:
        "Your CRM, ad accounts, calendar, forms and call tracking are the common ones - most tools with an API or export can be brought in. We'll say specifically what's possible on the first call once we know your stack.",
    },
    {
      question: "Can you pull in historical data, or only from launch day forward?",
      answer:
        "Usually historical data can be brought in too, so the dashboard has context from day one rather than starting from a blank chart. How far back depends on what your existing tools kept.",
    },
    {
      question: "Who can see what?",
      answer:
        "Role-based access is part of the build - an owner sees everything, while staff typically see only the numbers relevant to their own work.",
    },
    {
      question: "What happens if a connection breaks?",
      answer:
        "We monitor for that and fix it - a silently broken connection producing wrong numbers is worse than no dashboard at all, so catching that is part of the ongoing support.",
    },
    {
      question: "Do the numbers update automatically?",
      answer:
        "Yes - once connected, sources refresh on their own rather than needing anyone to re-export or re-upload anything.",
    },
    {
      question: "Do you just build it and leave, or is there ongoing support?",
      answer:
        "Both are available. Most clients keep a monthly review to walk through what changed and adjust the views as the business does - a dashboard nobody explains tends to go unopened.",
    },
  ],
  card: {
    eyebrow: "Let's talk",
    title: "What can't you currently answer in one look?",
    body: "Tell us what's scattered across tools right now. We'll say what a dashboard would need to pull together to fix that.",
    cta: { label: "Get Free Consultation", to: "/book", icon: "arrowRight" },
  },
};
