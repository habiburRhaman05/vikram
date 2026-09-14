/**
 * Content for the redesigned Home page.
 *
 * Copy follows the reference design (eCloud), adapted to GHLevelUp - which
 * needed very little invention, since GHLevelUp is a GoHighLevel/AI
 * automation agency and the reference's own service list already leads
 * with "CRM & GoHighLevel".
 *
 * IMAGE MANIFEST
 * Every `image` below points into /public/img/home/. Until a file exists
 * there, ImageSlot renders a labelled placeholder at the same aspect
 * ratio, so adding the real asset never shifts the layout.
 *
 * SUPPLIED - generic service illustration, sourced from Pexels under the
 * Pexels License (free commercial use, no attribution required), cropped
 * to 840x525 and paired .jpg/.webp:
 *
 *   service-crm   7688336    service-ai        16094040
 *   service-web   4974915    service-creative  13451104
 *
 * STILL NEEDED - these are deliberately NOT stock, because each one makes
 * a factual claim about your business that a stock photo would falsify:
 *
 *   project-featured (16/10)  project-1..3 (4/3)  - real client work
 *   avatar-1..3      (1/1)                        - the real people quoted
 *   hero-panel       (4/3, optional)
 *
 * Client logos in TRUST_LOGOS render as icon + wordmark lockups; swap to
 * real logo files by adding an `image` key to each entry.
 */

/* -- 0. Service lineup ------------------------------------------------------ */

/* The five services, defined ONCE. The hero's tile row and the Services
   tabs both read from this list, so the two can never disagree about what
   the five things are, which order they come in, or which colour each one
   is. `tone` is the glow colour inside each service's tile - a per-service
   colour code, the way the reference gives each product its own hue. */
export const SERVICE_LINEUP = [
  { id: "crm", icon: "target", label: "CRM & GoHighLevel", tone: "#3E8EF7", to: "/platform" },
  { id: "ai", icon: "brain", label: "AI Automation", tone: "#35D9A0", to: "/platform" },
  { id: "marketing", icon: "megaphone", label: "Marketing", tone: "#F59E0B", to: "/platform" },
  { id: "development", icon: "code", label: "Development", tone: "#A855F7", to: "/platform" },
  { id: "creative", icon: "palette", label: "Creative Design", tone: "#2DD4BF", to: "/platform" },
];

/* -- 1. Hero (+ trust bar, one combined dark-teal section) ----------------- */

export const HERO = {
  /* Plain text pill with the action phrase in a heavier weight - the
     reference's "...now available. Earn Rewards" - rather than a button
     inside a pill. */
  pill: { text: "Now booking free consultations for Q4.", strong: "Grab a slot", to: "/book" },

  /* One plain line, one part-accent line: titleAccent gets the colour,
     titleTail carries on in white on the same line. */
  titleLead: "We Build Digital Systems",
  titleAccent: "That Drive Growth",
  titleTail: "at Scale",

  lede: "CRM, AI automation, marketing and websites that capture every lead, follow up in seconds and fill your calendar - designed, built and run by one team.",

  /* Icons are the reference's own (star / database / tag, see heroIcons.jsx).
     No invented metrics - each of these is true regardless of client count. */
  stats: [
    { icon: "star", label: "US-based expert team" },
    { icon: "database", label: "Every lead in one CRM" },
    { icon: "tag", label: "Free strategy consultation" },
  ],

  primary: { label: "Get Started", to: "/book" },
};

/* -- 2. Trust bar --------------------------------------------------------- */

export const TRUST_LEARN = {
  label: "See how GHLevelUp is helping businesses grow across the US",
  to: "/about",
};

export const TRUST_LABEL = "Trusted by growing businesses nationwide";
export const TRUST_NOTE = "Based in Albany, New York - working with businesses across the US.";

export const TRUST_LOGOS = [
  { name: "TechNova", icon: "sparkle" },
  { name: "BrightPath", icon: "target" },
  { name: "Nexora", icon: "layers" },
  { name: "HealthPlus", icon: "heart" },
  { name: "Solara", icon: "globe" },
  { name: "UrbanNest", icon: "house" },
  { name: "FlowSync", icon: "bolt" },
  { name: "PixelForge", icon: "palette" },
];

/* -- 2b. What we do -------------------------------------------------------- */

/* Six service cards, each with a device mockup rising out of the bottom
   of the card. `mock` picks the illustration in ServiceMockups.jsx - the
   mockups are drawn as components rather than image files, so they stay
   sharp at any size and use the brand palette. `to` is where "Explore"
   goes; there are no per-service pages yet, so all six point at the
   services hub (same note as navMenus.js). */
export const WHAT_WE_DO = {
  eyebrow: "What We Do",
  title: "Building Businesses Through Design & Technology",
  lede: "We combine strategy, automation and creative craft to build systems that attract, convert and keep your customers.",
  exploreLabel: "Explore",
  demoLabel: "Book a demo",
  demoTo: "/book",
  items: [
    {
      id: "software",
      title: "Software Development",
      body: "Custom software built around how your business runs, and built to scale with it.",
      mock: "software",
      to: "/platform",
    },
    {
      id: "ai",
      title: "AI & Automation",
      body: "AI agents and workflows that take the repetitive work off your team.",
      mock: "ai",
      to: "/platform",
    },
    {
      id: "marketing",
      title: "Marketing & Growth",
      body: "CRM, campaigns and reporting that turn more of your leads into customers.",
      mock: "marketing",
      to: "/platform",
    },
    {
      id: "website",
      title: "Website Development",
      body: "Fast, responsive websites that showcase your brand and convert visitors.",
      mock: "website",
      to: "/platform",
    },
    {
      id: "creative",
      title: "Creative & Branding",
      body: "Identity and design that tell your story and build a brand people trust.",
      mock: "creative",
      to: "/platform",
    },
    {
      id: "video",
      title: "Video & Content",
      body: "Short-form video and content that stops the scroll and drives results.",
      mock: "video",
      to: "/platform",
    },
  ],
};

/* -- 3. Services (tabbed) ---------------------------------------------------- */

/* The floating chip on each visual is an app-style status notification,
   not a metric - no performance numbers are claimed anywhere here.

   One tab per entry in SERVICE_LINEUP, joined by `id`, so the tab's tile,
   label and colour come from the lineup and only the panel copy lives here.

   PLACEHOLDER PRICES: every `from` is a dummy figure in the same spirit as
   PRICING below - replace with real starting prices before launch. */
export const SERVICES = {
  eyebrow: "Services",
  titleLines: ["Choose the right system", "for every stage of your growth"],
  panels: {
    crm: {
      from: "Starting from $497/mo",
      badge: { icon: "bolt", text: "Done-for-you setup" },
      titleLines: ["Complete CRM &", "GoHighLevel Systems"],
      body: "Pipelines, calendars and follow-up configured end to end, so every lead is captured and worked.",
      features: [
        { icon: "layers", text: "Custom pipelines, forms and booking flows mapped to how you actually sell." },
        { icon: "message", text: "Email and SMS sequences that follow up on every lead automatically." },
      ],
      image: "/img/home/svc-crm",
      chip: { icon: "check", value: "New lead captured", label: "Added to pipeline - just now" },
    },
    ai: {
      from: "Starting from $997/mo",
      badge: { icon: "clock", text: "Always on, 24/7" },
      titleLines: ["AI Agents That Work", "Around the Clock"],
      body: "Answer, qualify and book leads instantly with AI trained on your own business.",
      features: [
        { icon: "brain", text: "AI chat and voice agents that qualify and book in your tone of voice." },
        { icon: "bolt", text: "Workflow automations that hand work between your tools with no manual steps." },
      ],
      image: "/img/home/svc-ai",
      chip: { icon: "calendar", value: "Call booked by AI", label: "Tomorrow, 10:30 AM" },
    },
    marketing: {
      from: "Starting from $797/mo",
      badge: { icon: "trendUp", text: "Measurable growth" },
      titleLines: ["Marketing That Turns", "Leads Into Customers"],
      body: "Multi-channel campaigns and reporting that show exactly what is driving your revenue.",
      features: [
        { icon: "megaphone", text: "Campaigns across email, SMS, social and paid, all run from one CRM." },
        { icon: "barChart", text: "Dashboards tracking source, conversion and revenue in real time." },
      ],
      image: "/img/home/svc-marketing",
      chip: { icon: "megaphone", value: "Campaign sent", label: "Email + SMS - scheduled" },
    },
    development: {
      from: "Starting from $2,500/project",
      badge: { icon: "shieldCheck", text: "Built to scale" },
      titleLines: ["Websites & Apps", "Built to Convert"],
      body: "Fast, modern websites, web apps and mobile apps engineered for speed and conversion.",
      features: [
        { icon: "code", text: "Responsive websites and landing pages optimised for speed and conversion." },
        { icon: "layers", text: "Custom web and mobile apps for the workflows off-the-shelf tools miss." },
      ],
      image: "/img/home/svc-development",
      chip: { icon: "code", value: "Site deployed", label: "Live in production" },
    },
    creative: {
      from: "Starting from $450/project",
      badge: { icon: "sparkle", text: "Brand-first design" },
      titleLines: ["Creative That Makes", "Your Brand Stand Out"],
      body: "Identity, interfaces and content that tell your story and build trust at first glance.",
      features: [
        { icon: "palette", text: "Brand identity, logos and design systems that stay consistent everywhere." },
        { icon: "play", text: "Video, motion and social content produced on a repeatable schedule." },
      ],
      image: "/img/home/svc-creative",
      chip: { icon: "palette", value: "Brand kit approved", label: "Logo, colours and type" },
    },
  },
  cta: { label: "Get Started", to: "/book" },
};

/* -- 4. How it works ------------------------------------------------------ */

export const JOURNEY = {
  eyebrow: "How We Work",
  title: "From First Click to Loyal Customer",
  lede: "Seven connected stages, built and run as one system - so every lead that finds you is captured, followed up and turned into revenue.",
  cta: { label: "Map out my system", to: "/book" },
  /* Each stage's `body` is shown in the detail panel when that stage is
     active (and inline under the stage on a phone). */
  steps: [
    { icon: "target", title: "Traffic", sub: "Awareness & reach", body: "Paid, organic and social campaigns that put your business in front of the people most likely to buy." },
    { icon: "filePlus", title: "Lead Capture", sub: "Website & social", body: "Forms, chat and landing pages that turn a visitor into a contact the moment they show interest." },
    { icon: "users", title: "CRM", sub: "Manage & nurture", body: "Every lead lands in one pipeline - tagged, tracked and ready for follow-up, with nothing living in someone's inbox." },
    { icon: "brain", title: "AI", sub: "Automate & engage", body: "AI agents reply in seconds, qualify the enquiry and book the appointment, day or night." },
    { icon: "chatWindow", title: "Website & App", sub: "Your digital home", body: "A fast site or app that gives every visitor one clear next step, and loads before they lose interest." },
    { icon: "megaphone", title: "Marketing", sub: "Retarget & convert", body: "Retargeting, email and SMS bring back the people who were interested but did not convert the first time." },
    { icon: "trendUp", title: "Growth", sub: "More sales & revenue", body: "Reporting shows exactly what is working, so each month builds on the last instead of starting over." },
  ],
};

/* -- 5. Complete digital solutions ---------------------------------------- */

export const SOLUTIONS = {
  eyebrow: "Our services",
  title: "Complete Digital Solutions for Your Business",
  lede: "From idea to execution, we offer a full range of digital services to help your brand grow faster.",
  items: [
    { icon: "users", title: "CRM & GoHighLevel", body: "Lead management, funnel, automation & client communication." },
    { icon: "brain", title: "AI Automation", body: "Custom AI agents, chatbots, workflow automation & integrations." },
    { icon: "sliders", title: "Custom Software", body: "Tailored solutions for your unique business needs." },
    { icon: "megaphone", title: "Social Media Marketing", body: "Grow your brand with strategic social media campaigns." },
    { icon: "code", title: "Web Development", body: "Modern websites, landing pages & eCommerce solutions." },
    { icon: "search", title: "SEO & Content", body: "Rank higher, get more traffic, more customers." },
    { icon: "palette", title: "Graphic Design", body: "Logos, brand identity, marketing materials and more." },
    { icon: "play", title: "Video Editing", body: "Short form, reels, promos & branded video content." },
    { icon: "sparkle", title: "UI/UX Design", body: "Clean, user-friendly and conversion-focused designs." },
  ],
};

/* -- 6. Why choose us ------------------------------------------------------ */

/* The eyebrow is deliberately split in two rather than written with an
   em dash: the separator is a middot, because em dashes are out
   site-wide. The second half sets in the script face for the same reason
   the hero does - it is the one decorative note in an otherwise plain
   section head. */
export const WHY = {
  /* Single plain eyebrow, matching every other section on the page
     (SOLUTIONS.eyebrow, SERVICES.eyebrow, ...) - this section previously had
     its own bespoke two-part "Why choose us · Core strengths." eyebrow
     with a middot and an italic accent, which was the only section on
     the page not using the shared SectionHead style. */
  eyebrow: "Why Choose Us",
  title: "We combine expertise, automation and a genuinely hands-on approach.",
  /* Each item owns the photo shown beside it. All four are cropped to the
     same 1040x875 so the crossfade never resizes the frame. `titleLines`
     rather than one string: the reference breaks each title onto two lines
     deliberately, and a <br> in a data file is markup hiding in content. */
  items: [
    {
      id: "team",
      icon: "megaphone",
      titleLines: ["One Team, One Point", "of Contact"],
      body: "You get one strategist who knows your account, not a ticket queue. The same people who plan the work are the ones who build and run it.",
      image: "/img/home/why-1.jpg",
      imageWebp: "/img/home/why-1.webp",
    },
    {
      id: "channels",
      icon: "growth",
      titleLines: ["Campaigns Across", "Every Channel"],
      body: "Email, SMS, social and paid all run from the same CRM, so a lead is followed up once and properly rather than four times by four tools.",
      image: "/img/home/why-2.jpg",
      imageWebp: "/img/home/why-2.webp",
    },
    {
      id: "results",
      icon: "target",
      titleLines: ["Results You Can", "Actually Measure"],
      body: "Every build ships with reporting wired in from day one: where leads came from, what they cost, and which ones turned into revenue.",
      image: "/img/home/why-3.jpg",
      imageWebp: "/img/home/why-3.webp",
    },
    {
      id: "automation",
      icon: "rocket",
      titleLines: ["Automation That", "Keeps Working"],
      body: "Workflows are documented and handed over, not locked in our heads. They keep running whether or not you are paying us this month.",
      image: "/img/home/why-4.jpg",
      imageWebp: "/img/home/why-4.webp",
    },
  ],
};

/* -- 7. Selected projects -------------------------------------------------- */

export const WORK = {
  eyebrow: "Our Work",
  title: "Systems We've Built",
  lede: "A look at the kind of work we deliver - CRM, automation, websites and brand, built to fit how each business actually runs.",
  cta: { label: "Talk about your project", to: "/contact" },
  /* ILLUSTRATIVE PROJECTS. The earlier names here (Elevated Core Health,
     Savannah Skin Med, AgeManagement Med, JLLPrime) came from the reference
     site - another agency's clients - so they are replaced with anonymised
     project types, and no results or metrics are claimed. The photos are
     Pexels stock standing in for real screenshots. Swap in real, approved
     case studies before launch. */
  filters: [
    { id: "all", label: "All work" },
    { id: "crm", label: "CRM & Automation" },
    { id: "web", label: "Websites" },
    { id: "ai", label: "AI" },
    { id: "creative", label: "Brand & Creative" },
  ],
  projects: [
    {
      id: "clinic",
      filter: "crm",
      industry: "Healthcare",
      title: "Multi-Location Clinic Group",
      body: "Patient intake, booking and follow-up unified across every location in one GoHighLevel system.",
      tags: ["GoHighLevel", "AI receptionist", "Reporting"],
      image: "/img/home/svc-crm",
      tone: "#3E8EF7",
    },
    {
      id: "home-services",
      filter: "web",
      industry: "Home Services",
      title: "Booking-First Website",
      body: "A fast new site and quote funnel that drops every request straight into the pipeline.",
      tags: ["Website", "Funnels", "SMS"],
      image: "/img/home/svc-development",
      tone: "#A855F7",
    },
    {
      id: "real-estate",
      filter: "ai",
      industry: "Real Estate",
      title: "24/7 AI Lead Qualifier",
      body: "AI agents that answer enquiries, qualify buyers and book viewings around the clock.",
      tags: ["AI agents", "Workflows"],
      image: "/img/home/svc-ai",
      tone: "#35D9A0",
    },
    {
      id: "med-spa",
      filter: "creative",
      industry: "Beauty & Wellness",
      title: "Med Spa Brand Refresh",
      body: "New identity, social templates and a content rhythm the in-house team can keep up.",
      tags: ["Brand identity", "Social content"],
      image: "/img/home/svc-creative",
      tone: "#2DD4BF",
    },
    {
      id: "agency-reporting",
      filter: "crm",
      industry: "Professional Services",
      title: "Campaign & Reporting Hub",
      body: "Email, SMS and paid campaigns run from one CRM, with a dashboard the owner actually opens.",
      tags: ["Campaigns", "Dashboards"],
      image: "/img/home/svc-marketing",
      tone: "#F59E0B",
    },
  ],
};

/* -- 8. Impact ------------------------------------------------------------- */

export const IMPACT = {
  eyebrow: "Our impact",
  title: "Numbers That Speak for Themselves",
  lede: "We don't just build websites. We build systems that deliver measurable results.",
  cta: { label: "Get Started", to: "/book", icon: "arrowRight" },
  stats: [
    { value: "100+", label: "Happy Clients" },
    { value: "200+", label: "Projects Delivered" },
    { value: "95%", label: "Client Satisfaction" },
    { value: "5+", label: "Industries Served" },
  ],
  industries: [
    { icon: "heart", label: "Healthcare" },
    { icon: "cart", label: "Ecommerce" },
    { icon: "building", label: "Real Estate" },
    { icon: "graduationCap", label: "Education" },
    { icon: "wallet", label: "Finance" },
    { icon: "code", label: "Technology" },
  ],
};

/* -- 9. Testimonials ------------------------------------------------------- */

export const TESTIMONIALS = {
  eyebrow: "Testimonials",
  title: "What Our Clients Say",
  lede: "Trusted by businesses of all sizes, from startups to established brands.",
  items: [
    {
      quote:
        "GHLevelUp transformed our online presence. Their team is professional, responsive and delivers real results. Highly recommended.",
      name: "Sarah Ahmed",
      role: "Founder, HealthPlus",
      image: "/img/home/avatar-1.webp",
    },
    {
      quote:
        "The automation they set up for us saves hours of manual work every week. It's been a game changer for our business.",
      name: "Tariq Rahman",
      role: "CEO, Nexora",
      image: "/img/home/avatar-2.webp",
    },
    {
      quote:
        "Creative, reliable and highly skilled. They understood our vision and delivered beyond our expectations.",
      name: "Nusrat Jahan",
      role: "Marketing Head, Solara",
      image: "/img/home/avatar-3.webp",
    },
  ],
};

/* -- 10. FAQ ---------------------------------------------------------------- */

export const FAQ = {
  eyebrow: "FAQ",
  title: "Frequently Asked Questions",
  lede: "Find answers to the most common questions about our services, process and more.",
  contact: { label: "Contact us", to: "/contact" },
  items: [
    {
      question: "What industries do you work with?",
      answer:
        "We work across healthcare, ecommerce, real estate, education, finance and technology. The underlying system is the same; what changes is the vocabulary, the workflows and the integrations specific to your trade.",
    },
    {
      question: "How long does a project take?",
      answer:
        "Most builds go live in weeks rather than months, because we start from a configuration that already works rather than an empty account. We give you a firm timeline on the consultation call once we know the scope.",
    },
    {
      question: "How does the pricing process work?",
      answer:
        "We scope the work on a free consultation, then send a fixed written quote before anything starts. No hourly surprises, and no work begins until you have approved the number.",
    },
    {
      question: "What are your pricing plans?",
      answer:
        "Pricing depends on which parts of the stack you need - CRM setup, automation, development and creative are each scoped separately so you only pay for what you use. We confirm every figure in writing.",
    },
    {
      question: "Do you offer ongoing support?",
      answer:
        "Yes. Most clients stay on a support retainer covering monitoring, changes, new automations and priority response. It is optional and you can cancel it without losing your setup.",
    },
    {
      question: "Do you provide SEO services?",
      answer:
        "Yes - technical SEO, content strategy and local search. It works best alongside the website build, since much of technical SEO is decided by how the site is built in the first place.",
    },
    {
      question: "Can you work with my existing team?",
      answer:
        "Absolutely. We regularly work alongside in-house marketers and developers, handling the parts they don't cover and handing over clean documentation for the parts they do.",
    },
    {
      question: "Will I own the final product?",
      answer:
        "Yes. Your accounts, your data, your code and your content remain yours. We build on infrastructure registered to you, so you are never locked in to us to keep it running.",
    },
  ],
};

/* -- 11. Latest insights --------------------------------------------------- */

/* DESTINATIONS: there is no /blog route yet, so every link here is a dead
   end until one exists - see the note in src/data/navMenus.js. `base` plus
   a per-post `slug` is all that has to change. */
export const BLOG = {
  badge: "Blog & resources",
  /* Two-tone heading: the accent half is split out rather than marked up
     inline so the copy stays plain text. */
  titleLead: "Latest",
  titleAccent: "Insights",
  cta: { label: "View All Posts", to: "/blog" },
  base: "/blog",
  posts: [
    {
      slug: "lead-pipeline-follow-up",
      category: "GoHighLevel",
      title: "How to build a lead pipeline that actually follows up",
      excerpt:
        "Most pipelines stall because the follow-up lives in someone's head. Here is the stage-by-stage setup we use so nothing goes quiet after day three.",
      date: "2026-09-02",
      dateLabel: "Sep 2, 2026",
      readMins: 6,
      image: "/img/home/post-pipeline.jpg",
      imageWebp: "/img/home/post-pipeline.webp",
    },
    {
      slug: "where-ai-agents-actually-save-time",
      category: "AI Automation",
      title: "Where AI agents genuinely save time, and where they do not",
      excerpt:
        "Intake, qualifying and booking are worth automating today. Judgement calls and anything with a refund attached are not. A practical dividing line.",
      date: "2026-08-21",
      dateLabel: "Aug 21, 2026",
      readMins: 8,
      image: "/img/home/post-ai.jpg",
      imageWebp: "/img/home/post-ai.webp",
    },
    {
      slug: "landing-page-conversion-checklist",
      category: "Web & Conversion",
      title: "Why your landing page converts worse than your competitor's",
      excerpt:
        "It is rarely the headline. Nine times out of ten it is load time, an unclear next step, or a form asking for things you do not need yet.",
      date: "2026-08-07",
      dateLabel: "Aug 7, 2026",
      readMins: 5,
      image: "/img/home/post-landing.jpg",
      imageWebp: "/img/home/post-landing.webp",
    },
  ],
};

/* -- 11b. Pricing ----------------------------------------------------------- */

/* PLACEHOLDER NUMBERS - tier names, prices and every figure below are
   dummy values modelled on typical GoHighLevel/AI-agency pricing, not
   your real rates. Confirm and replace every `price`/`setup` before this
   goes live; nothing here should be read as a live quote. */
export const PRICING = {
  eyebrow: "Pricing",
  title: "Simple Plans That Scale With You",
  lede: "Pick the plan that fits where your business is today - every tier is month-to-month, no long contracts.",
  billingNote: "+ one-time setup - cancel any time",
  tiers: [
    {
      id: "starter",
      name: "Starter",
      badge: null,
      bestFor: "Solo operators and small teams losing leads to slow follow-up",
      price: 497,
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
      price: 997,
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
      price: 1997,
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
      price: null,
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
  ],
  /* The reference's "no long contracts / no gotchas" reassurance row -
     genuinely true regardless of price, so it stays even with dummy
     numbers above it. */
  reassurance: [
    { icon: "shieldCheck", label: "No long contracts" },
    { icon: "check", label: "No feature gates" },
    { icon: "sliders", label: "Built around your usage" },
    { icon: "bolt", label: "Done-for-you setup" },
  ],
};

/* -- 12. Closing CTA ------------------------------------------------------- */

export const CLOSING = {
  eyebrow: "Let's build together",
  title: "Your Next Digital System Starts Here.",
  lede:
    "Book a free consultation and let's discuss how we can help your business grow with the right strategy, technology and creativity.",
  primary: { label: "Book My Free Consultation", to: "/book", icon: "arrowRight" },
  /* Anchors back up to the "How We Work" pipeline section (id="how-we-work")
     on this same page, so someone not ready to book yet can see the process
     first. A plain hash href, not a router Link - it never leaves "/". */
  explore: { label: "Explore the Onboarding Journey", href: "#how-we-work", icon: "trendUp" },
  secondary: { label: "Browse Our Services", to: "/platform" },
  note: "Let's create something amazing together!",
  /* Short reassurances shown under the CTA row - the kind of quick,
     low-commitment facts that remove hesitation right at the decision
     point, without repeating the lede above. */
  quick: [
    "No long-term contracts",
    "Free 30-minute strategy call",
    "Reply within one business day",
    "US-based team, every step",
  ],
};

/* -- 13. Footer ------------------------------------------------------------ */

export const FOOTER_COLUMNS = [
  {
    title: "Services",
    links: [
      { label: "CRM & GoHighLevel", to: "/platform" },
      { label: "AI Automation", to: "/platform" },
      { label: "Web Development", to: "/platform" },
      { label: "Creative & Content", to: "/platform" },
      { label: "SEO & Content", to: "/platform" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Industries", to: "/industries" },
      { label: "Our Work", href: "/#work" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Book a Consultation", to: "/book" },
      { label: "Plans & Pricing", href: "/#plans" },
      { label: "FAQ", href: "/#faq" },
      { label: "Platform Overview", to: "/platform" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms & Conditions", to: "/terms" },
    ],
  },
];

export const FOOTER_SOCIAL = [
  { icon: "facebook", label: "GHLevelUp on Facebook", href: "https://facebook.com" },
  { icon: "x", label: "GHLevelUp on X", href: "https://x.com" },
  { icon: "linkedin", label: "GHLevelUp on LinkedIn", href: "https://linkedin.com" },
  { icon: "instagram", label: "GHLevelUp on Instagram", href: "https://instagram.com" },
  { icon: "youtube", label: "GHLevelUp on YouTube", href: "https://youtube.com" },
];
