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
  eyebrow: "Your digital growth partner",
  titleLead: "We Build Digital Systems That",
  titleScript: "Grow",
  titleTail: "Your Business",
  lede:
    "From CRM and AI automation to web development, marketing and creative - we help you build modern digital systems that attract, engage and convert.",
  primary: { label: "Get a Free Consultation", to: "/book", icon: "arrowRight" },
  secondary: { label: "Explore Our Services", to: "/platform" },
  proofPoints: [
    { icon: "target", label: "Strategy Consultation" },
    { icon: "sliders", label: "Custom Solutions" },
    { icon: "shieldCheck", label: "Ongoing Support" },
  ],
  /* The floating constellation around the central cloud mark. `emphasis`
     marks the three that survive into the condensed mobile layout. */
  cards: [
    { icon: "users", title: "CRM", sub: "Manage Leads & Customers", emphasis: true },
    { icon: "brain", title: "AI Automation", sub: "Save Time, Work Smarter", emphasis: true },
    { icon: "bolt", title: "Automation", sub: "Connect Apps & Workflows" },
    { icon: "megaphone", title: "Social Media", sub: "Build Your Brand" },
    { icon: "code", title: "Web Development", sub: "Modern Websites & Apps", emphasis: true },
    { icon: "palette", title: "Creative Design", sub: "Graphics & Branding" },
    { icon: "play", title: "Video Editing", sub: "Engage Your Audience" },
  ],
  stat: { value: "+248%", label: "Business Growth" },
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

/* -- 6. Selected projects -------------------------------------------------- */

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

/* -- 7. Impact ------------------------------------------------------------- */

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

/* -- 8. Testimonials ------------------------------------------------------- */

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

/* -- 9. FAQ ---------------------------------------------------------------- */

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

/* -- 10. Closing CTA ------------------------------------------------------- */

export const CLOSING = {
  eyebrow: "Let's build together",
  title: "Your Next Digital System Starts Here.",
  lede:
    "Book a free consultation and let's discuss how we can help your business grow with the right strategy, technology and creativity.",
  primary: { label: "Get a Free Consultation", to: "/book", icon: "arrowRight" },
  secondary: { label: "View Our Services", to: "/platform" },
  note: "Let's create something amazing together!",
};

/* -- 11. Footer ------------------------------------------------------------ */

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
