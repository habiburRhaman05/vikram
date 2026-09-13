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

/* -- 1. Hero -------------------------------------------------------------- */

export const HERO = {
  eyebrow: "CRM. Automation. AI. Web. Creative.",
  /* Two short lines with the accent word in the script face, which is the
     shape the reference uses.

     HARD LIMIT, measured: the copy column is capped at 36rem (576px) and
     the display size reaches 4.4rem at desktop, so a line fits roughly 15
     characters. "Turn traffic into" is 17 and wrapped onto a third line.
     Keep each line at two words plus punctuation, and check the rendered
     height before changing either one.

     The promise is the outcome rather than the activity, because the list
     of services is already on the right of this same screen. */
  lineOne: "Less admin,",
  lineTwoLead: "more",
  lineTwoScript: "revenue.",
  /* Short on purpose: three promises in one sentence, no pile-up of clauses
     to read through before the buttons. */
  lede:
    "CRM, AI automation and websites that capture every lead, follow up in seconds and fill your calendar - built and run by one team.",
  primary: { label: "Book a free consultation", to: "/book" },
  secondary: { label: "See what we build", to: "/platform" },

  /* Trust cluster. The faces are real photographs now (requested), and an
     initial renders in place of one until its file exists - see Face in
     Hero.jsx, which falls back on a failed load rather than leaving a
     broken image. They are decorative (the list is aria-hidden, alt is
     empty): a stock portrait standing next to a company name would be a
     claim about a real person, so the photos must be swapped for real
     customers before this reads as anything other than illustration. */
  faces: [
    { name: "Amara", image: "/img/home/review-1.jpg", imageWebp: "/img/home/review-1.webp" },
    { name: "Daniel", image: "/img/home/review-2.jpg", imageWebp: "/img/home/review-2.webp" },
    { name: "Priya", image: "/img/home/review-3.jpg", imageWebp: "/img/home/review-3.webp" },
    { name: "Marcus", image: "/img/home/review-4.jpg", imageWebp: "/img/home/review-4.webp" },
    { name: "Elena", image: "/img/home/review-5.jpg", imageWebp: "/img/home/review-5.webp" },
  ],
  trustLabel: "Working with teams across the US",
  trustSub: "Albany, New York - remote nationwide",
  footNote: "Based in Albany, New York. Working with businesses nationwide.",

  /* The rotating capability list on the right. One is highlighted at a
     time and the highlight advances on a timer. */
  /* 12 items, not 7 - the reel window only ever shows about 7-8 of them
     at once (see --hv-cap-h / .hv-hero__reel in home-sections.css), so a
     longer list is what keeps a full lap feeling like a real scroll
     instead of an obvious 7-item loop. Every label here is a service the
     page actually sells further down (Stack, Solutions) - nothing is
     invented just to pad the count. */
  marquee: [
    { icon: "target", label: "CRM & GoHighLevel" },
    { icon: "bolt", label: "Workflow Automation" },
    { icon: "brain", label: "AI Agents" },
    { icon: "code", label: "Web Development" },
    { icon: "megaphone", label: "Marketing Campaigns" },
    { icon: "palette", label: "Creative & Content" },
    { icon: "sparkle", label: "Branding" },
    { icon: "search", label: "SEO & Content" },
    { icon: "layers", label: "Sales Funnels" },
    { icon: "shieldCheck", label: "Client Support" },
    { icon: "play", label: "Video Editing" },
    { icon: "barChart", label: "Reporting & Analytics" },
  ],
};

/* -- 2. Trust bar --------------------------------------------------------- */

export const TRUST_LABEL = "Trusted by 100+ businesses worldwide";

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

/* -- 3. The Digital Growth Stack ------------------------------------------ */

export const STACK = {
  eyebrow: "Our services",
  title: "The Digital Growth Stack",
  lede:
    "Everything you need, in one place. We combine strategy, technology and creativity to build digital systems that bring real business results.",
  cta: { label: "View All Services", to: "/platform", icon: "arrowRight" },
  note: "Custom solutions for your unique goals",
  cards: [
    {
      dark: true,
      icon: "target",
      title: "CRM & Marketing",
      body: "Capture leads, manage customers, and run high-converting campaigns across multiple channels.",
      image: "/img/home/service-crm.jpg",
      imageWebp: "/img/home/service-crm.webp",
      imageLabel: "CRM dashboard",
      checks: [
        "GoHighLevel (GHL)",
        "Email & SMS Campaigns",
        "Social Media Marketing",
        "Sales Funnel & Automation",
      ],
      to: "/platform",
    },
    {
      icon: "brain",
      title: "AI Automation",
      body: "Let AI handle repetitive work, so you can focus on what actually matters.",
      image: "/img/home/service-ai.jpg",
      imageWebp: "/img/home/service-ai.webp",
      imageLabel: "AI assistant",
      checks: ["AI Agents & Chatbots", "Workflow Automation", "API Integrations", "AI Content & Strategy"],
      to: "/platform",
    },
    {
      dark: true,
      icon: "code",
      title: "Web & Software Dev",
      body: "Modern, scalable and high-performance web and mobile solutions.",
      image: "/img/home/service-web.jpg",
      imageWebp: "/img/home/service-web.webp",
      imageLabel: "Web & app mockups",
      checks: [
        "Full Stack Web Apps",
        "Next.js / React / Node.js",
        "Mobile Apps (React Native)",
        "Custom Software Development",
      ],
      to: "/platform",
    },
    {
      icon: "palette",
      title: "Creative & Content",
      body: "Stand out with stunning visuals and engaging content.",
      image: "/img/home/service-creative.jpg",
      imageWebp: "/img/home/service-creative.webp",
      imageLabel: "Creative work",
      checks: ["Graphic Design & Branding", "Video Editing & Motion", "Content Creation", "UI/UX Design"],
      to: "/platform",
    },
  ],
};

/* -- 4. How it works ------------------------------------------------------ */

export const JOURNEY = {
  eyebrow: "How it works",
  title: "From Clicks to Customers - We Build the Full Journey",
  lede:
    "Our integrated digital ecosystem works together to bring more leads, automate your processes and grow your revenue.",
  cta: { label: "Get Started", to: "/book", icon: "arrowRight" },
  steps: [
    { icon: "target", title: "Traffic", sub: "Awareness & Reach" },
    { icon: "filePlus", title: "Lead Capture", sub: "Website / Social" },
    { icon: "users", title: "CRM", sub: "Manage & Nurture" },
    { icon: "brain", title: "AI", sub: "Automate & Engage" },
    { icon: "chatWindow", title: "Website / App", sub: "Your Digital Home" },
    { icon: "megaphone", title: "Marketing", sub: "Retarget & Convert" },
    { icon: "trendUp", title: "Growth", sub: "More Sales & Revenue" },
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
     (SOLUTIONS.eyebrow, STACK.eyebrow, ...) - this section previously had
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
  eyebrow: "Our work",
  title: "Selected Projects",
  lede: "Real solutions. Real results. Explore some of our recent work across different industries and platforms.",
  cta: { label: "View All Projects", to: "/contact", icon: "arrowRight" },
  featured: {
    chip: "Featured Project",
    title: "Elevated Core Health",
    sub: "Healthcare Dashboard & Patient Management",
    checks: ["Patient Management", "Role-based Access", "Real-time WebSocket", "SOP & Eligibility Check"],
    cta: { label: "View Case Study", to: "/contact" },
    image: "/img/home/project-featured.webp",
    imageLabel: "Healthcare dashboard",
  },
  projects: [
    { title: "Savannah Skin Med", category: "Website Redesign", image: "/img/home/project-1.webp" },
    { title: "AgeManagement Med", category: "Website Migration", image: "/img/home/project-2.webp" },
    { title: "JLLPrime", category: "Automation & Integration", image: "/img/home/project-3.webp" },
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

/* -- 12. Closing CTA ------------------------------------------------------- */

export const CLOSING = {
  eyebrow: "Let's build together",
  title: "Your Next Digital System Starts Here.",
  lede:
    "Book a free consultation and let's discuss how we can help your business grow with the right strategy, technology and creativity.",
  primary: { label: "Get a Free Consultation", to: "/book", icon: "arrowRight" },
  secondary: { label: "View Our Services", to: "/platform" },
  note: "Let's create something amazing together!",
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
