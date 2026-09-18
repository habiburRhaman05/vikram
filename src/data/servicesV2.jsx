/**
 * /services - all page copy for the v2 redesign.
 *
 * Kept out of the page component for the same reason homeV2.jsx is: the
 * page is long enough that inlining the copy turns it into a wall of
 * strings with the structure buried inside. Section order here mirrors
 * the order the page renders them in.
 *
 * The layout follows the approved reference design; the content is
 * GHLevelUp's own. Every card links to a real /services/:slug route (see
 * data/navMenus.js) - none of them are decorative.
 *
 * ASSETS - provenance, so these can be re-sourced or replaced knowingly:
 *   /img/services/desk.jpg|webp
 *     Pexels #34803974 (Pexels license - free for commercial use, no
 *     attribution required). Laptop, plant and coffee on a wooden desk.
 *   /img/services/advisor.jpg|webp
 *     Pexels #7163357 (same license). A consultant with a tablet, office
 *     with planting.
 *   /img/home/*.jpg|webp (the service grid's card art)
 *     The home redesign's own supplied set - the same Pexels-licensed
 *     photos homeV2.jsx documents at the top of that file. They are reused
 *     here rather than sourced again, and each card picks the one that
 *     actually depicts its service: the CRM board for CRM setup, the
 *     automation build for workflow automation, and so on. Every card's
 *     photo is tinted with that card's own --tone, so the eight read as one
 *     designed set instead of eight stock photos.
 *
 *   TONES
 *     Each service card and each process step carries a `tone` - one hue
 *     per item, the same pattern homeV2.jsx uses for SERVICE_LINEUP. The
 *     tone is the BRIGHT end of the pair: it is used for fills, tints and
 *     glows only. Anything that has to be read (the icon inside a plate, a
 *     number) is derived from it in CSS with color-mix against the brand
 *     ink, because a bright hue like #F59E0B is 2.2:1 on white and would
 *     fail as text on its own.
 *   /img/integrations/*.png
 *     Each vendor's own favicon at 96px, fetched once from Google's
 *     favicon service (Google Calendar's from Google's own icon file -
 *     the favicon service only returns the generic Google mark for it).
 *     Trademarks belong to their owners; they appear here only to name
 *     the platforms we connect to. If a vendor's mark changes, re-fetch
 *     rather than redrawing it.
 */

/* -- 1. Hero --------------------------------------------------------------- */

export const SVC_HERO = {
  /* The hero is a centred banner - crumb, headline, lede, buttons - with no
     side visual at all, so what used to be the eyebrow pill is now the
     page's place in the site rather than a second label for the sections
     below it. */
  crumb: "Services",
  titleLead: "Powerful Systems.",
  titleAccent: "Real Business Growth.",
  lede: "We build custom CRM, automation, marketing and sales systems that help your business run smarter, save time and generate more revenue - all in one place.",

  primary: { label: "Get Free Consultation", to: "/book", icon: "arrowRight" },
  /* Fragment link down to the service grid - the browser's own smooth
     scroll, offset by html { scroll-padding-top } in legacy/styles.css so
     the section heading doesn't land under the fixed header. */
  secondary: { label: "Explore All Services", href: "#services" },
};

/* -- 2. Why choose us ----------------------------------------------------- */

export const SVC_WHY = {
  eyebrow: "Why choose us",
  titleLines: ["More Than Just Setup -", "We Build Your Growth Engine"],
  lede: "We don't just install tools. We design the system around how your business actually runs, so leads get answered, follow-up happens on time and nothing depends on someone remembering.",

  items: [
    /* Toned to match the service grid and the process steps - one hue per
       item, so the coloured plates are a language across the page and not a
       treatment that stops at one section. */
    {
      icon: "target",
      title: "Tailored Solutions",
      tone: "#3E8EF7",
      body: "Pipelines, forms and automations shaped around your services and your hours.",
    },
    {
      icon: "shieldCheck",
      title: "Proven Results",
      tone: "#0EA46B",
      body: "Success measured in booked calls and closed work, not in features shipped.",
    },
    {
      icon: "phone",
      title: "Expert Support",
      tone: "#7C5CFC",
      body: "The same team that builds your system keeps running it - no handover to a stranger.",
    },
    {
      icon: "usersTwo",
      title: "Long-Term Partnership",
      tone: "#F59E0B",
      body: "We keep tuning the system as you grow, and as the tools around it change.",
    },
  ],

  cta: { label: "Get Free Consultation", to: "/book" },

  image: "/img/services/desk.jpg",
  imageWebp: "/img/services/desk.webp",
  imageAlt: "A laptop, plant and coffee on a wooden desk",
  note: "Simple Tools. Big Results.",
};

/* -- 3. The service grid -------------------------------------------------- */

export const SVC_GRID = {
  eyebrow: "Our services",
  title: "Complete Solutions for Your Business",
  /* Names the four cards below and nothing else. The old line promised
     marketing and websites too, which are real services but are not on this
     grid - a lede that lists things the reader then cannot find reads as a
     page that is missing something. */
  lede: "CRM, automation, AI and the funnels and reporting around them - four builds that cover everything you need to attract, engage and convert more customers, plus a support desk that answers your clients under your own brand.",

  learnLabel: "Learn more",

  /* Each card's art is a drawn mockup of the actual product, not a photo:
     `mock` names a scene in components/home/ServiceMockups.jsx and the card
     renders it live.

       crm     GoHighLevel pipeline board - stages, deal cards, and the
               conversation inbox the pipeline feeds
       ai      the workflow builder canvas - trigger node, action nodes and
               the action settings panel open beside them
       voice   an AI agent mid-conversation, with the live/booked chips
       funnel  the drag-and-drop funnel builder, its conversion rail, and
               the opt-in page it publishes

     The photos these replaced were the problem the whole card had: a team
     round a laptop is a picture of an office, and it was the same picture
     whichever service it sat on. A pipeline board is only a pipeline board.
     The mockups are markup, so they also stay sharp at any size, pick up
     the brand palette, and cost a few hundred bytes instead of ~60KB each.

     Four builds laid out two per row, then White-Label Support across the
     full width beneath them - see .svcs-grid and .svcs-cell--wide. Funnels and
     reporting are one card because they are one engagement: the pages that
     capture the lead and the view that tells you whether they converted.
     Both detail pages still exist; this card opens the funnels one, and
     that page's related shelf carries the reader on to reporting.

     `subs` is what the engagement actually includes. The body says what the
     service is for; the list says what you get, which is the question the
     reader has next and the one a one-line card never answered. */
  items: [
    {
      title: "CRM & Sub-account Setup",
      body: "Your whole account built before you log in - pipeline stages that match how you really sell, calendars that respect your team's actual availability, and contact records that stay clean as the volume grows.",
      subs: [
        "Pipelines & deal stages",
        "Contacts, tags & custom fields",
        "Calendars & booking rules",
        "Numbers, domains & A2P 10DLC",
        "Migration from your old CRM",
        "User roles & permissions",
      ],
      to: "/services/crm-sub-account-setup",
      tone: "#3E8EF7",
      mock: "crm",
    },
    {
      title: "Workflow Automation",
      body: "The hand-offs your team does by hand, rebuilt in the workflow builder - triggers, waits and conditions that keep running on time whether or not anyone remembers.",
      subs: [
        "Trigger & action workflows",
        "Lead routing and assignment",
        "Appointment reminders & no-show follow-up",
        "Review and referral requests",
        "Two-way sync with your other tools",
        "Internal alerts and task creation",
      ],
      to: "/services/workflow-automation",
      tone: "#0EA46B",
      mock: "ai",
    },
    {
      title: "AI Agents & Chatbots",
      body: "An agent that picks up the calls, texts and chats you currently miss - qualifying in your own tone of voice, booking straight into the calendar, and writing every conversation back to the contact record.",
      subs: [
        "Website & Facebook chat widget",
        "SMS and missed-call text-back",
        "Voice AI receptionist",
        "Qualifying questions & lead scoring",
        "Live booking into your calendar",
        "Hand-over to a human on request",
      ],
      to: "/services/ai-agents-chatbots",
      tone: "#7C5CFC",
      mock: "voice",
    },
    {
      title: "Funnels & Reporting Dashboards",
      body: "The pages that capture the lead and the view that tells you whether it worked, built as one job - so every form field lands on a pipeline stage and every stage shows up in the numbers.",
      subs: [
        "Landing pages & opt-in funnels",
        "Order forms, upsells & checkout",
        "Forms, surveys & quizzes",
        "Source and campaign attribution",
        "Conversion & revenue dashboards",
        "Scheduled reports to your inbox",
      ],
      to: "/services/funnel-design-builds",
      tone: "#F59E0B",
      mock: "funnel",
    },
    {
      /* `wide` puts this one across the full row instead of in a half.
         Two reasons, and the layout one is the lesser: five cards in a
         two-column grid leaves a widow. The real reason is that this is
         the only retainer on the grid - the other four are builds with an
         end date, this is a team that answers your clients every day - so
         it reads better as its own band under them than as a fifth peer.
         See .svcs-cell--wide in services.css. */
      wide: true,
      title: "White-Label Support",
      body: "A 24/7 GoHighLevel helpdesk that answers as your agency. Certified specialists on chat, email, phone and screen-share, under your brand and your support address - so your clients never wait, and never learn we exist.",
      subs: [
        "Live chat & email coverage",
        "New-client onboarding",
        "Technical GHL troubleshooting",
        "Call & screen-share support",
        "Account health monitoring",
        "Weekly reporting",
      ],
      to: "/services/white-label-support",
      tone: "#14B8A6",
      mock: "support",
    },
  ],
};

/* -- 4. Platforms & integrations ------------------------------------------ */

export const SVC_INTEGRATIONS = {
  eyebrow: "Platforms & integrations",
  titleLines: ["We Work With the Tools", "You Already Use"],
  lede: "We connect the platforms your business already runs on, so information moves between them on its own instead of being re-typed by hand.",

  items: [
    { name: "GoHighLevel", logo: "gohighlevel" },
    { name: "Twilio", logo: "twilio" },
    { name: "OptiMantra", logo: "optimantra" },
    { name: "Clarity", logo: "clarity" },
    { name: "Zocdoc", logo: "zocdoc" },
    { name: "Headway", logo: "headway" },
    { name: "Grow Therapy", logo: "growtherapy" },
    { name: "Google Calendar", logo: "google-calendar" },
  ],

  /* No /integrations page exists yet, so this asks rather than pointing
     at a page that would 404. Swap to the real route when it ships. */
  cta: { label: "View All Integrations", to: "/contact" },

  /* The hub card - one record moving through the whole system. */
  hub: {
    title: "Every step, once",
    rows: ["New Lead", "Appointment Booked", "SMS Sent", "Follow Up"],
    /* Marks orbiting the hub. GoHighLevel is the system of record; the
       rest are where a lead arrives from or is written back to. */
    logos: ["gohighlevel", "twilio", "google-calendar", "google", "zocdoc"],
  },

  note: "Keep everything in sync",
};

/* -- 5. Industries we serve ------------------------------------------------ */

export const SVC_INDUSTRIES = {
  eyebrow: "Industries We Serve",
  title: "What is your Profession or Service?",
  lede: "We custom-build systems that fit exactly how your business operates. From tracking leads to handling complex follow-ups, we design for your industry.",

  items: [
    { name: "Tax Preparation", icon: "calculator", tone: "#3E8EF7" },
    { name: "Accounting", icon: "barChart", tone: "#0EA46B" },
    { name: "Bookkeeper", icon: "book", tone: "#F59E0B" },
    { name: "Notary", icon: "penTool", tone: "#7C5CFC" },
    { name: "Mortgage Broker", icon: "house", tone: "#E83A59" },
    { name: "Realtor", icon: "house", tone: "#3E8EF7" },
    { name: "Insurance Agent", icon: "shield", tone: "#0EA46B" },
    { name: "Financial Advisor", icon: "trendUp", tone: "#F59E0B" },
    { name: "Investment Banker", icon: "building", tone: "#7C5CFC" },
    { name: "Credit Specialist", icon: "creditCard", tone: "#E83A59" },
    { name: "Consultant", icon: "briefcase", tone: "#3E8EF7" },
    { name: "Attorney", icon: "scale", tone: "#0EA46B" },
    { name: "CPA", icon: "calculator", tone: "#F59E0B" },
    { name: "Roofer", icon: "hammer", tone: "#7C5CFC" },
    { name: "Retailer", icon: "store", tone: "#E83A59" },
    { name: "Medical", icon: "activity", tone: "#3E8EF7" },
    { name: "Marketing Agency", icon: "megaphone", tone: "#F59E0B" },
    { name: "Logistics", icon: "truck", tone: "#0EA46B" },
  ],

  cta: { label: "View All Industries", to: "/industries" },

  hub: {
    title: "Every step, once",
    rows: ["New Lead", "Appointment Booked", "SMS Sent", "Follow Up"],
    logos: ["gohighlevel", "twilio", "google-calendar", "google", "zocdoc"],
  },

  note: "Keep everything in sync",
};

/* -- 5. Process ----------------------------------------------------------- */

export const SVC_PROCESS = {
  eyebrow: "Our process",
  title: "Simple Steps to Get Started",
  lede: "We make the process easy and transparent, so you can focus on what matters - your business.",

  /* One tone per step, in the order the steps run: a cool hue for the
     discovery call, through to the brand green on the last step, so the
     row reads left to right even before the words are read. */
  steps: [
    {
      num: "1",
      icon: "message",
      tone: "#3E8EF7",
      title: "Book a Free Consultation",
      body: "Tell us how your business runs today - the calls you miss, the leads that go cold, the manual steps eating your week.",
    },
    {
      num: "2",
      icon: "target",
      tone: "#7C5CFC",
      title: "Custom Strategy & Plan",
      body: "We map the build to your services, your hours and your pipeline, and confirm scope and cost in writing before anything starts.",
    },
    {
      num: "3",
      icon: "sliders",
      tone: "#F59E0B",
      title: "Build & Setup",
      body: "We configure the CRM, automations and AI, connect every tool you use and test the whole path end to end.",
    },
    {
      num: "4",
      icon: "shieldCheck",
      tone: "#0EA46B",
      title: "Launch & Support",
      body: "You go live with a walkthrough, not a login and a PDF - and the same team keeps improving it from there.",
    },
  ],
};

/* -- 6. The results ------------------------------------------------------- */

export const SVC_RESULTS = {
  eyebrow: "The results",
  title: "Why Businesses Choose Us",
  lede: "We combine technology, strategy and support to help you achieve real, measurable growth.",

  checks: [
    "Increase lead generation and sales",
    "Save hours of manual work",
    "Improve customer engagement and retention",
    "Get a modern, high-performing online presence",
    "Dedicated support and strategy guidance",
  ],

  image: "/img/services/advisor.jpg",
  imageWebp: "/img/services/advisor.webp",
  imageAlt: "A consultant holding a tablet in an open-plan office",

  /* Floating cards over the photo. The middle one reads as a live status,
     so it carries a dot and a state word rather than a number. */
  cards: [
    { tone: "accent", icon: "trendUp", title: "More leads, less chasing", body: "Every enquiry answered in seconds" },
    { tone: "light", icon: "sliders", title: "Automated workflow", body: "Active", live: true },
    { tone: "light", icon: "calendar", title: "Appointment booked", body: "Tomorrow, 10:30 AM" },
  ],
};

/* -- 7. Closing CTA ------------------------------------------------------- */

export const SVC_CLOSING = {
  title: "Ready to Take Your Business to the Next Level?",
  lede: "Let's build the right system for your business. Get a free consultation and see how we can help you grow.",

  primary: { label: "Get Free Consultation", to: "/book", icon: "arrowRight" },
  /* "View Our Services" would be circular on this page, so the second
     action points at the work instead. */
  secondary: { label: "See our work", href: "/#work" },
};

/* -- 8. FAQ --------------------------------------------------------------- */

export const SVC_FAQ = {
  eyebrow: "Frequently asked questions",
  title: "Common Questions",
  lede: "Find answers to the most common questions about our services.",

  items: [
    {
      question: "Do you offer custom solutions for every business?",
      answer:
        "Configuration covers most requests, so yes in most cases. When something genuinely doesn't fit, we write custom software and connect it to the rest of your setup rather than pretending the standard build will do.",
    },
    {
      question: "How long does it take to get started?",
      answer:
        "Most CRM and automation builds are live in one to two weeks. Larger builds - a full website, a multi-stage funnel - are scoped on the call so the timeline is never a guess.",
    },
    {
      question: "Do you provide ongoing support after launch?",
      answer:
        "Yes, and it's the same team that built it. You get a walkthrough at launch, then continued changes and upkeep without having to re-explain your business to someone new each time.",
    },
    {
      question: "Can you integrate with my existing tools?",
      answer:
        "In almost every case. Calendars, telephony, payment, booking and practice platforms all connect, and where there's no native link we build one through the API.",
    },
    {
      question: "What is the pricing structure?",
      answer:
        "It depends on which services you need and how much custom work they involve. Book a call and we'll give you real numbers for your business, confirmed in writing before anything is signed.",
    },
  ],
};
