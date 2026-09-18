/**
 * /services/white-label-support - all page copy.
 *
 * Kept out of the page component for the same reason every other service
 * data file is: the component decides how a section looks, this file
 * decides what it says, and copy changes never go near layout code.
 *
 * NOT THE SAME SERVICE AS /services/white-label-platform. That page is
 * about the software wearing your brand - custom domain, rebranded app,
 * your logo on the login screen. This one is about the PEOPLE behind it:
 * a helpdesk staffed by us, answering as you. The two cross-link rather
 * than compete - see serviceLinks.js, and the third FAQ answer below,
 * which is the one a reader who found both pages will look for.
 *
 * NUMBERS THAT NEED SIGN-OFF BEFORE LAUNCH
 * Every other service data file in here carries a "no invented numbers"
 * rule, and it applies to this one too. Three values below are commercial
 * claims about how this desk is staffed and how fast it answers, and they
 * came from the brief rather than from anything measured in this repo:
 *
 *   WLS_HERO.stats  "< 2 hr"  average first response time
 *   WLS_HERO.stats  "4+ yrs"  average GoHighLevel experience per agent
 *   WLS_WHY.points  "Under 2-hour average first response ..."
 *   WLS_FAQ         the same two-hour figure, in answer 2
 *
 * They are stated plainly rather than hedged because they describe the
 * offer, not a testimonial - but confirm them against the real rota
 * before this page is indexed. The other two stats are definitional
 * (what the plan sells, what a client pays to raise a ticket) and are
 * safe as written.
 *
 * The ticket rows in WLS_HERO.desk are sample data - realistic
 * GoHighLevel questions, not a real queue. The page labels that panel
 * "Sample queue" so it can never be read as a screenshot of live work.
 */

/* -- 1. Hero ----------------------------------------------------------------- */

export const WLS_HERO = {
  crumb: "White-Label Support",
  eyebrow: "White-Label Support",
  titleLead: "24/7 GoHighLevel Support,",
  titleAccent: "Under Your Brand.",
  lede:
    "Your clients expect fast, expert answers, but staffing a round-the-clock helpdesk is brutal. GHLevelUp becomes your support team - certified GoHighLevel specialists handling chat, email and calls under your name, so your clients never wait and never know we exist.",

  primary: { label: "Get Free Consultation", to: "/book", icon: "arrowRight" },
  secondary: { label: "See What We Cover", href: "#included" },

  /* Short proof chips under the buttons. Each is a fact about the offer
     rather than a measured result. */
  badges: [
    { icon: "clock", label: "24/7/365" },
    { icon: "shieldCheck", label: "GHL Certified" },
    { icon: "key", label: "Your brand only" },
    { icon: "globe", label: "US / CA / UK / AU" },
  ],

  /* The hero's visual: a branded helpdesk queue. Sample data - see the
     file header note. */
  desk: {
    brand: "YourBrand Support",
    status: "Online - 3 agents active",
    note: "Your clients see your brand name here, never ours.",
    tickets: [
      { id: "#1024", subject: "How do I trigger a workflow from Zapier?", tag: "Automation", state: "resolved", age: "2m ago" },
      { id: "#1025", subject: "Twilio SMS not sending on form submit", tag: "Setup", state: "resolved", age: "8m ago" },
      { id: "#1026", subject: "Sub-account user can't log in", tag: "Access", state: "open", age: "just now" },
      { id: "#1027", subject: "AI agent not responding on WhatsApp", tag: "AI agent", state: "resolved", age: "14m ago" },
      { id: "#1028", subject: "How do I set up A2P compliance?", tag: "Compliance", state: "resolved", age: "31m ago" },
    ],
    meters: [
      { label: "Avg response", value: "47 min" },
      { label: "Resolved today", value: "23" },
      { label: "CSAT", value: "98%" },
      { label: "Agents online", value: "3" },
    ],
  },

  /* The band across the bottom of the hero. See the sign-off note above. */
  stats: [
    { value: "24/7/365", label: "Coverage across four time zones" },
    { value: "< 2 hr", label: "Average first response time" },
    { value: "4+ yrs", label: "Average GoHighLevel experience per agent" },
    { value: "$0", label: "Cost to your clients to reach support" },
  ],
};

/* -- 2. Overview ------------------------------------------------------------- */

export const WLS_OVERVIEW = {
  eyebrow: "How it works",
  title: "What Is White-Label GoHighLevel Support?",

  paras: [
    "White-label support means we answer your clients' questions as though we were your in-house team. Every chat, email and call goes out under your brand, your logo and your support address - your clients only ever see your agency. You get a full helpdesk of certified GoHighLevel admins without hiring, training or scheduling a single person.",
    "It is not a generic call centre reading scripts. Our specialists work in GoHighLevel every day, so they fix the funnel, the workflow, the calendar or the integration instead of escalating everything back to you.",
    "We plug into your sub-accounts, deflect the repetitive questions with an AI agent that answers first, and hand the rest up with full documentation when they genuinely need your sign-off.",
  ],

  cta: { label: "Book a free consultation", to: "/book", icon: "arrowRight" },

  /* The section's visual: one ticket, two views. The whole point of the
     service is that these two views never meet, so the panel shows them
     beside each other once and the page never has to explain it twice. */
  split: {
    ticketLabel: "One ticket",
    ticket: "My calendar is double-booking clients.",
    client: {
      label: "What your client sees",
      brand: "YourBrand Support",
      rows: [
        "A reply from help@yourbrand.com",
        "Your logo, your chat widget, your tone of voice",
        "“Hi Dana - looking at your calendar now.”",
        "Resolved and closed by YourBrand",
      ],
    },
    us: {
      label: "What actually happens",
      brand: "Our desk",
      rows: [
        "Ticket lands in your branded helpdesk",
        "A certified admin opens the sub-account",
        "Finds the overlapping availability window",
        "Fixes it, documents it, updates the ticket",
      ],
    },
  },
};

/* -- 3. What is included ------------------------------------------------------ */

export const WLS_INCLUDED = {
  eyebrow: "What is included",
  title: "White-Label Support: What We Deliver",
  lede:
    "Eight lanes of work, all of it under your name. Most agencies start with the first four and add the rest as their client count grows.",

  items: [
    {
      icon: "chatWindow",
      title: "Live Chat & Email Coverage",
      body: "We staff your live chat and inbox under your brand, answering client questions in real time across every time zone - fast, accurate replies that keep your CSAT high without you touching the keyboard.",
    },
    {
      icon: "usersTwo",
      title: "New-Client Onboarding",
      body: "We walk your new clients through their GoHighLevel account, snapshots and first workflows so they start strong. A smooth onboarding cuts early churn and the support load that follows it.",
    },
    {
      icon: "sliders",
      title: "Technical GHL Troubleshooting",
      body: "Broken funnels, failed automations, calendar conflicts, domain and email deliverability - our certified team diagnoses and fixes the actual GoHighLevel problem instead of logging it and waiting.",
    },
    {
      icon: "fileCheck",
      title: "Ticket Handling & Resolution",
      body: "Every request is triaged, tracked and resolved inside your helpdesk with clear status updates. Nothing falls through the cracks, and your clients always know where their ticket stands.",
    },
    {
      icon: "phone",
      title: "Call & Screen-Share Support",
      body: "For issues that are faster to talk through, we hop on a branded call or screen-share. Real human help on your line, scheduled or on demand, so complex problems get solved in one session.",
    },
    {
      icon: "activity",
      title: "Account Health Monitoring",
      body: "We watch client accounts for failed automations, paused campaigns and broken integrations. Catching an issue before the client notices turns support into a retention engine.",
    },
    {
      icon: "arrowUpRight",
      title: "Escalation With Documentation",
      body: "When something needs your sign-off or a developer, we hand it up with a full write-up - steps taken, root cause and a recommended next move. You get context, not a vague help request.",
    },
    {
      icon: "barChart",
      title: "Weekly Reporting",
      body: "A weekly snapshot of ticket volume, response and resolution times, the issues that keep recurring and the CSAT trend - so you can see exactly what your support layer is absorbing.",
    },
  ],
};

/* -- 4. The process ----------------------------------------------------------- */

export const WLS_PROCESS = {
  eyebrow: "The process",
  title: "How It Works",
  lede: "From the first call to a branded desk answering at 2am, without running a hiring round.",

  steps: [
    {
      num: "01",
      title: "Discovery & Scope",
      body: "We learn your client base, your common issues, the tools you run and your brand voice, then map the coverage hours and response targets you actually need.",
      meta: "Same-day reply · ~30 min · No commitment",
    },
    {
      num: "02",
      title: "White-Label Onboarding",
      body: "We set up your branded helpdesk, chat widget and support address, then build a knowledge base from your snapshots and SOPs so every answer stays consistent.",
      meta: "Live in days, not weeks",
    },
    {
      num: "03",
      title: "Go Live Under Your Brand",
      body: "Your support channels go live. Clients chat, email and call your brand - our certified team handles every conversation behind it, around the clock.",
      meta: "24/7/365 coverage",
    },
    {
      num: "04",
      title: "Monitor, Report, Improve",
      body: "We track the metrics, send the weekly report and tune the knowledge base as patterns emerge, so resolution times keep dropping instead of plateauing.",
      meta: "Weekly reporting included",
    },
  ],
};

/* -- 5. Who we work with ------------------------------------------------------ */

export const WLS_WHO = {
  eyebrow: "Who we work with",
  title: "Who Hires Us for White-Label Support?",
  lede: "Four situations where a branded desk pays for itself inside the first month.",

  items: [
    {
      icon: "trendUp",
      title: "Growing Marketing Agencies",
      body: "You signed more clients than your team can support and answers are slipping. We add a full helpdesk overnight, so service quality scales with your client count instead of against it.",
    },
    {
      icon: "clock",
      title: "Agencies Needing After-Hours Cover",
      body: "Your clients message at night and at weekends, but your team works business hours. We cover the gaps, so nobody waits until Monday morning for help.",
    },
    {
      icon: "layers",
      title: "GoHighLevel SaaS Resellers",
      body: "You resell GoHighLevel under your own brand and need expert support your clients can trust. We become the certified team behind your reseller offer.",
    },
    {
      icon: "users",
      title: "Solo Operators & Small Teams",
      body: "You are wearing every hat and support is eating the day. We take the tickets off your plate so you can spend it on sales and delivery instead of the inbox.",
    },
  ],
};

/* -- 6. Why GHLevelUp --------------------------------------------------------- */

export const WLS_WHY = {
  eyebrow: "Why GHLevelUp",
  title: "Why Hire Us for White-Label Support?",
  lede:
    "Hiring and training your own round-the-clock support team is expensive and slow, and most helpdesks have no real GoHighLevel expertise. You get certified admins answering under your brand from day one, with no contract and no setup fee.",

  points: [
    "Fully white-labelled - your clients never learn we exist",
    "24/7/365 coverage across the US, Canada, the UK and Australia",
    "Certified GoHighLevel admins, not a scripted call centre",
    "Under 2-hour average first response across chat and email",
    "AI ticket deflection, so simple questions are answered instantly",
    "No contract, no setup fee - scale coverage up or down anytime",
  ],

  cta: { label: "Talk through your coverage", to: "/book", icon: "arrowRight" },
};

/* -- 7. FAQ ------------------------------------------------------------------- */

export const WLS_FAQ = {
  eyebrow: "FAQ",
  title: "Frequently Asked Questions",
  lede: "How white-label support works, what your clients see, the channels we cover and how it is priced.",

  items: [
    {
      question: "What does white-label GoHighLevel support actually mean?",
      answer:
        "It means we answer your clients as your in-house team. Every chat, email and call uses your brand, your logo and your support address, so clients only ever see your agency. We work invisibly behind your helpdesk, fixing GoHighLevel issues under your name - your clients never learn we are involved.",
    },
    {
      question: "What channels and hours do you cover?",
      answer:
        "Live chat, email, phone and screen-share calls, all under your brand. Coverage runs 24/7/365 across the US, Canada, the UK and Australia, so your clients get expert help at 2pm or 2am. Average first response is under two hours, and the exact hours are tailored to your plan.",
    },
    {
      question: "How is this different from your white-label platform service?",
      answer:
        "The platform service puts your brand on the software - your domain, your logo, your app icon. This one puts your brand on the people. Most agencies eventually want both: the client logs into your platform, and when they need help, they are answered by your support team. Neither service requires the other.",
    },
    {
      question: "Will my clients know they are talking to GHLevelUp?",
      answer:
        "No. The service is fully white-labelled. We use your brand voice, your support email and your chat widget, so every interaction looks like it came from your team. We never identify ourselves to your clients - you stay the trusted brand while we do the work behind it.",
    },
    {
      question: "Can you actually fix GoHighLevel problems, not just log tickets?",
      answer:
        "Yes. The team are certified GoHighLevel admins working in the platform daily, so they resolve funnels, workflows, calendars, integrations and deliverability issues directly. We escalate to you only when a request needs your sign-off or custom development, and even then it comes up with full documentation.",
    },
    {
      question: "How much does it cost, and is there a contract?",
      answer:
        "Pricing is based on coverage hours and ticket volume, with no setup fee and no long-term contract. You can scale support up or down as your client base changes. Most plans are scoped and priced on the free discovery call.",
    },
  ],
};

/* -- 8. Enquiry form ---------------------------------------------------------- */

export const WLS_ENQUIRY = {
  service: "White-Label Support",
  eyebrow: "Get started",
  title: "Tell us what your clients keep asking",
  lede:
    "Send over your client count, the channels you want covered and the hours that hurt most. We will come back with a coverage plan and a price on the call - no contract attached.",
  points: [
    "A coverage plan mapped to your hours and ticket volume",
    "A walk-through of exactly what your clients would see",
    "A straight answer on price, with no setup fee",
  ],
};

/* -- 9. Closing CTA ----------------------------------------------------------- */

export const WLS_CLOSING = {
  eyebrow: "Ready when you are",
  title: "Give Your Clients Support That Never Sleeps.",
  lede: "We become your round-the-clock helpdesk under your brand. You keep the credit - we do the work.",
  primary: { label: "Get Free Consultation", to: "/book", icon: "arrowRight" },
  secondary: { label: "See all services", to: "/services" },
};
