/**
 * /services/websites-landing-pages - all page copy.
 *
 * Kept out of the page component for the same reason the other service data
 * files are. Section order here mirrors the order the page renders them in.
 *
 * NO INVENTED NUMBERS, same rule as the other service pages: the checklist
 * describes what a build has to pass before launch, and the problem/fix
 * pairs describe what goes wrong, neither of which needs a figure to be
 * true. The load-time and accessibility lines are standards (Core Web
 * Vitals and WCAG 2.1 AA), not claims about our results.
 *
 * ASSETS - provenance, so these can be re-sourced or replaced knowingly:
 *   /img/services/web-build.jpg|webp
 *     Pexels #574071 (same license). Code and a live page side by side on
 *     one monitor. 1240x930, used by the build process section.
 */

/* -- 1. Hero --------------------------------------------------------------- */

export const WEB_HERO = {
  eyebrow: "Websites & landing pages",
  titleLead: "Built to be judged",
  titleAccent: "in the first three seconds.",
  lede:
    "A visitor decides whether your business looks credible before they read a word. We design and build fast, responsive websites and landing pages that earn that decision - then route every form and booking straight into your CRM.",

  primary: { label: "Get Free Consultation", to: "/book", icon: "arrowRight" },
  /* Fragment link down to the anatomy section, offset by
     html { scroll-padding-top } in legacy/styles.css. */
  secondary: { label: "See What a Build Includes", href: "#anatomy" },

};

/* -- 2. What a build includes --------------------------------------------- */

export const WEB_ANATOMY = {
  eyebrow: "What a build includes",
  title: "Six Decisions Every Page Has to Get Right",
  lede:
    "A website is a sequence of judgements, not a template with your logo on it. These are the six we make deliberately on every build - and the test each one has to pass before the page ships.",

  stages: [
    {
      num: "01",
      icon: "target",
      title: "The first screen",
      body: "What a visitor sees without scrolling: what you do, who for, and the one action worth taking.",
      want: "Understood in three seconds",
    },
    {
      num: "02",
      icon: "file",
      title: "The structure",
      body: "The order pages and sections appear in, set by how a buyer decides rather than by an org chart.",
      want: "One obvious next step",
    },
    {
      num: "03",
      icon: "pen",
      title: "The words",
      body: "Copy written for the visitor's decision, not the company's history, and reviewed with you before styling.",
      want: "Says it in their words",
    },
    {
      num: "04",
      icon: "layers",
      title: "The look",
      body: "Type, spacing and colour from one system, so the site reads as one business rather than ten pages.",
      want: "Credible at a glance",
    },
    {
      num: "05",
      icon: "code",
      title: "The build",
      body: "Responsive, accessible markup on a fast stack, connected to your CRM, calendar and analytics.",
      want: "Wired to the pipeline",
    },
    {
      num: "06",
      icon: "shieldCheck",
      title: "The proof",
      body: "Tested on real phones, real connections and real screen readers before anything goes live.",
      want: "Checked, not assumed",
    },
  ],

  cta: { label: "Get Free Consultation", to: "/book" },
  note: "Decided deliberately",
};

/* -- 3. What we build ------------------------------------------------------ */

export const WEB_GRID = {
  eyebrow: "What we build",
  title: "Sites, Pages and Everything Behind Them",
  subtitle: "On your domain, on your stack, with your CRM on the other end.",
  lede:
    "Every build starts from what the page has to do - win a click, win a call, win a booking - and the engineering follows the job rather than leading it.",

  items: [
    {
      icon: "globe",
      title: "Business websites",
      body: "Multi-page sites that explain the whole business without burying the action, built to be found and to be believed.",
    },
    {
      icon: "layers",
      title: "Campaign landing pages",
      body: "One page per offer, with one promise and one action, so paid traffic lands somewhere built to convert it.",
    },
    {
      icon: "chatWindow",
      title: "Chat and lead widgets",
      body: "An AI agent or a plain form in the corner of the page, answering questions and capturing details around the clock.",
    },
    {
      icon: "calendar",
      title: "Booking and contact flows",
      body: "Calendars, quotes and qualification questions connected to the pipeline, so an enquiry becomes a scheduled call.",
    },
    {
      icon: "bolt",
      title: "Speed and accessibility",
      body: "Core Web Vitals and WCAG 2.1 AA treated as launch requirements, checked on real devices and connections.",
    },
    {
      icon: "lineChart",
      title: "Analytics and tracking",
      body: "Source, page and outcome connected, so you can see which page and which campaign produced which booking.",
    },
  ],

  cta: { label: "Get Free Consultation", to: "/book" },
};

/* -- 4. Design, build, test, launch --------------------------------------- */

export const WEB_PROCESS = {
  eyebrow: "Our process",
  title: "Design, Build, Test, Launch",
  lede:
    "The audience and the action come first, because a beautiful site aimed at nobody is an expensive way to learn nothing.",

  image: "/img/services/web-build.jpg",
  imageWebp: "/img/services/web-build.webp",
  imageAlt: "A code editor and a live web page side by side on one monitor",
  steps: [
    {
      num: "01",
      title: "Goals and audience",
      body: "We pin down what the site has to do, who it has to do it for, and what proof they need to see.",
    },
    {
      num: "02",
      title: "Wireframe and copy",
      body: "The pages laid out as wireframes with the words written in, so the argument is settled before the styling starts.",
    },
    {
      num: "03",
      title: "Build and connect",
      body: "Built responsive and accessible, connected to your CRM, calendar and analytics, with the follow-up sequences wired in.",
    },
    {
      num: "04",
      title: "Test and launch",
      body: "Forms, speed and mobile checked on real devices before launch, then adjusted as the first real traffic arrives.",
    },
  ],


  /* Floating chips over the build photo, as the reference layout does. */
  chips: [
    { icon: "phone", label: "Mobile first" },
    { icon: "bolt", label: "Load time checked" },
    { icon: "users", label: "Accessibility pass" },
    { icon: "lineChart", label: "Tracking verified" },
  ],

  cta: { label: "Start With the Goal", to: "/book", icon: "arrowRight" },
};

/* -- 5. Where sites lose the visitor -------------------------------------- */

export const WEB_FIX = {
  eyebrow: "Where sites lose the visitor",
  title: "Four Things That Cost You the Enquiry",
  lede:
    "These are the same four problems on almost every site we are asked to review, and none of them are about design taste.",

  rows: [
    {
      problem: "Nobody can tell what you do in three seconds",
      fix: "One promise above the fold, in the words your customers actually use",
    },
    {
      problem: "The next step is a menu, not an action",
      fix: "One obvious action per page, repeated where the decision actually happens",
    },
    {
      problem: "It loads slowly on the phone they are holding",
      fix: "Image, script and font budgets set at design time and checked at launch",
    },
    {
      problem: "The form lands in an inbox nobody watches",
      fix: "Every enquiry written to the CRM, routed and followed up automatically",
    },
  ],

  cta: { label: "Get Your Site Reviewed", to: "/book", icon: "arrowRight" },
};

/* -- 6. FAQ + contact card ------------------------------------------------- */

export const WEB_FAQ = {
  eyebrow: "FAQ",
  title: "Questions About Websites",
  lede: "What businesses ask before they commit to a build.",

  items: [
    {
      question: "Do you build on WordPress, Webflow or something else?",
      answer:
        "Whichever suits the way you will actually run it. Most of our builds sit on GoHighLevel or a modern static stack; if your team already maintains a WordPress site, we build where your team can keep it alive.",
    },
    {
      question: "Can you work with our existing site?",
      answer:
        "Often, yes. Sometimes that means a landing page or a section rebuilt on top of what works, rather than a full rebuild - the review will say which one your site actually needs.",
    },
    {
      question: "How long does a build take?",
      answer:
        "A campaign landing page is usually live in weeks; a multi-page site depends on how quickly copy and assets come together. The wireframe-and-copy stage is where schedules are won or lost, and we keep that stage short.",
    },
    {
      question: "Who writes the copy?",
      answer:
        "We draft it, written into the wireframe before any styling, and you review it until it sounds like your business rather than a template.",
    },
    {
      question: "Is hosting and maintenance included?",
      answer:
        "Hosting and monitoring are part of the plans; a build hands you a site you own outright, with the logins and the records to prove it. Ask on the call and we will spell out which is which.",
    },
    {
      question: "Will the site be fast and accessible?",
      answer:
        "That is a launch requirement, not an upgrade: Core Web Vitals checked on real devices and connections, WCAG 2.1 AA for the parts of the standard a marketing site can meet.",
    },
  ],

  card: {
    eyebrow: "Let's talk",
    title: "What should your site actually do?",
    body: "Tell us what you sell and who you sell it to. We will say what the site should ask for, and what it should leave out.",
    cta: { label: "Get Free Consultation", to: "/book", icon: "arrowRight" },
  },
};

/* -- 7. Intro -------------------------------------------------------------- */

export const WEB_INTRO = {
  eyebrow: "The short version",
  title: "A site is a tool, not a brochure",
  quote: {
    text: "Nobody visits your website to admire it. They visit to find out whether you can solve their problem, and how quickly.",
    attribution: "Everything else on the page is competing with that.",
  },
  body: [
    "Most small-business websites are built to look finished rather than to do a job. They open with a stock photo and a slogan, bury the phone number, hide the prices, and leave the visitor to work out for themselves whether they are in the right place. Then the traffic arrives and nothing happens.",
    "A site that works is mostly restraint. It says what you do and who for in the first screen. It makes the next step obvious and repeats it as you scroll. It answers the two or three questions that actually stop people getting in touch - what does it cost, how long does it take, do you cover my area - instead of leaving them to guess or email.",
    "The rest is engineering discipline: it loads fast on a mid-range phone on mobile data, the forms submit and say so, it is navigable by keyboard and screen reader, and the tracking is honest enough that you can tell which traffic is worth paying for. None of that shows up in a screenshot, and all of it decides whether the site earns anything.",
  ],
  facts: [
    { num: "Mobile", label: "What we build for first", sub: "Where most of your traffic actually arrives" },
    { num: "3", label: "Devices tested on", sub: "Real phone, tablet and desktop before launch" },
    { num: "WCAG", label: "Accessibility standard", sub: "Contrast, keyboard and labels checked, not assumed" },
    { num: "2-4 wks", label: "Typical time to live", sub: "Depending on page count and content readiness" },
  ],
};

/* -- 8. The detail --------------------------------------------------------- */

export const WEB_DETAILS = {
  eyebrow: "The detail",
  title: "What's actually included",
  lede:
    "The parts that do not appear in a design mockup and decide whether the site works in the real world.",
  groups: [
    {
      icon: "bolt",
      title: "Speed and build quality",
      items: [
        "Images sized, compressed and served in modern formats",
        "Load time measured on a throttled mobile connection, not just desktop",
        "No layout shift as fonts and images arrive",
        "Built to be edited later without a developer for routine changes",
      ],
    },
    {
      icon: "users",
      title: "Accessibility",
      items: [
        "Colour contrast checked against WCAG AA, including on brand colours",
        "Every interactive element reachable and usable by keyboard",
        "Real form labels and error messages, not placeholder text alone",
        "Alt text that describes meaning, and empty alt where it is decorative",
      ],
    },
    {
      icon: "target",
      title: "Conversion basics",
      items: [
        "What you do and who for, answered in the first screen",
        "One obvious next step, repeated as the page gets longer",
        "Pricing, timelines and coverage answered rather than hidden",
        "Forms that submit to your CRM with the source attached",
      ],
    },
    {
      icon: "search",
      title: "SEO and tracking",
      items: [
        "Titles, descriptions and headings structured per page",
        "Sitemap, robots and canonical URLs set correctly",
        "Structured data where it genuinely applies to your business",
        "Analytics and conversion events verified with real submissions",
      ],
    },
  ],
};

/* -- 9. Who it is for ------------------------------------------------------ */

export const WEB_USECASES = {
  eyebrow: "Who it's for",
  title: "The six builds we are asked for",
  lede:
    "Different shapes, same discipline: fast, clear, accessible, and wired to something that captures the enquiry.",
  items: [
    { icon: "house", title: "Local service sites", body: "Areas covered, services priced where possible, and a phone number that is never more than a thumb away." },
    { icon: "building", title: "Professional practices", body: "Credibility first for accountants, clinics and advisers - then intake that does not require a phone call." },
    { icon: "target", title: "Single landing pages", body: "One offer, one action, built for paid traffic and measured properly." },
    { icon: "cart", title: "Small eCommerce", body: "A catalogue that loads fast, a checkout that does not lose people, and post-purchase follow-up." },
    { icon: "pen", title: "Content and SEO sites", body: "A structure search engines can read and a reading experience that keeps people on the page." },
    { icon: "layers", title: "Rebuilds and rescues", body: "An existing site that is slow, unmanageable or invisible, rebuilt without losing what already ranks." },
  ],
};

/* -- 10. Representative work ---------------------------------------------- */

export const WEB_WORK = {
  eyebrow: "What a build looks like",
  title: "Three representative builds",
  lede:
    "Each one started with traffic that was arriving and not converting, and a site nobody could edit without help.",
  note:
    "These describe the shape of work of this kind, not named client engagements - we do not publish client details or performance figures without written sign-off.",
  items: [
    {
      tag: "Local service",
      title: "The phone number people could find",
      problem: "The site looked smart and buried the phone number three scrolls down on mobile.",
      built: [
        "Service and coverage area stated in the first screen",
        "A persistent call and book action on mobile",
        "Enquiry forms writing to the CRM with the page as the source",
      ],
      outcome: "The next step is obvious on every screen, and every enquiry records which page produced it.",
    },
    {
      tag: "Rebuild",
      title: "A slow site made fast without losing rankings",
      problem: "A page-builder site took eight seconds to load on mobile and could not be edited safely.",
      built: [
        "Rebuilt with images compressed and served in modern formats",
        "URLs preserved and redirected so existing rankings survived",
        "A content structure the team can edit without breaking layout",
      ],
      outcome: "The site loads in a fraction of the time and routine copy changes no longer need a developer.",
    },
    {
      tag: "Accessibility",
      title: "A site everyone could actually use",
      problem: "Brand colours failed contrast checks and the forms could not be completed with a keyboard.",
      built: [
        "Palette adjusted to pass WCAG AA without abandoning the brand",
        "Focus states, labels and error messages added throughout",
        "Every path retested with keyboard only and with a screen reader",
      ],
      outcome: "The site is usable by people the previous build silently excluded, and the brand still looks like itself.",
    },
  ],
};

/* -- 11. Benefits ---------------------------------------------------------- */

export const WEB_BENEFITS = {
  eyebrow: "The results",
  title: "What a site built this way gives you",
  lede: "Six things you can check for yourself after launch.",
  items: [
    { icon: "bolt", title: "It loads fast", body: "Measured on mobile data, not on your office broadband." },
    { icon: "phone", title: "It works on a phone", body: "Built mobile-first, tested on real devices." },
    { icon: "users", title: "Everyone can use it", body: "Keyboard, screen reader and contrast all checked." },
    { icon: "target", title: "It asks for something", body: "One clear next step rather than a dead end." },
    { icon: "search", title: "It can be found", body: "Structure, metadata and sitemap done properly." },
    { icon: "pen", title: "You can edit it", body: "Routine changes without a developer on standby." },
  ],
};

/* -- 12. Enquiry form ------------------------------------------------------ */

export const WEB_ENQUIRY = {
  service: "Websites & Landing Pages",
  eyebrow: "Get started",
  title: "What should your site actually do?",
  lede:
    "Tell us what you sell, who you sell it to and what is wrong with the site you have. We will come back with what to build, what to keep, and what it would cost.",
  points: [
    "An honest view of whether you need a rebuild or a few fixes",
    "Rankings and existing content protected, not thrown away",
    "No obligation, and no retainer to sign before you see the plan",
  ],
};
