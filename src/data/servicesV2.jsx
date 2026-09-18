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
  lede: "From CRM and automation to marketing, websites and reporting, we offer everything you need to attract, engage and convert more customers - all in one place.",

  learnLabel: "Learn more",

  /* Each card's art: a real photo, its own tone, and the icon that goes on
     the plate over the photo. The photos are decorative (the card's own
     title and body name the service), so they are rendered with alt="" -
     the reason is in Services.jsx, beside the markup. */
  items: [
    {
      icon: "target",
      title: "CRM & Sub-account Setup",
      body: "Leads, pipelines and calendars configured end to end, with numbers, domains and A2P registration handled for you.",
      to: "/services/crm-sub-account-setup",
      tone: "#3E8EF7",
      image: "/img/home/svc-crm.jpg",
      imageWebp: "/img/home/svc-crm.webp",
    },
    {
      icon: "sliders",
      title: "Workflow Automation",
      body: "Hand-offs between your tools that keep running once they're configured, so the repeat work stops landing on a person.",
      to: "/services/workflow-automation",
      tone: "#0EA46B",
      image: "/img/home/why-4.jpg",
      imageWebp: "/img/home/why-4.webp",
    },
    {
      icon: "brain",
      title: "AI Agents & Chatbots",
      body: "Answer, qualify and book around the clock, in your own tone of voice, with every conversation written back to the CRM.",
      to: "/services/ai-agents-chatbots",
      tone: "#7C5CFC",
      image: "/img/home/svc-ai.jpg",
      imageWebp: "/img/home/svc-ai.webp",
    },
    {
      icon: "layers",
      title: "Funnel Design & Builds",
      body: "High-converting funnels and landing pages mapped to your offer and your pipeline stages.",
      to: "/services/funnel-design-builds",
      tone: "#F59E0B",
      image: "/img/home/post-landing.jpg",
      imageWebp: "/img/home/post-landing.webp",
    },

    {
      icon: "lineChart",
      title: "Reporting Dashboards",
      body: "Source, conversion and revenue visible in one place, without anyone exporting a spreadsheet to find out.",
      to: "/services/reporting-dashboards",
      tone: "#14B8A6",
      image: "/img/home/why-3.jpg",
      imageWebp: "/img/home/why-3.webp",
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
