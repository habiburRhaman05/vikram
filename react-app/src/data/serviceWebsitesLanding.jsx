/**
 * /services/websites-landing-pages - all page copy.
 *
 * Kept out of the page component for the same reason the other service data
 * files are. Section order here mirrors the order the page renders them in,
 * which is the order specified for this page:
 *
 *   1. hero            - top overview
 *   2. overview        - the detailed overview, with facts
 *   3. anatomy         - detail about the service, with a visual
 *   4. includes        - what includes section
 *   5. process         - how it works, with proof-of-work steps + a visual
 *   6. journey         - the follow-through after launch
 *   7. who             - who we work with
 *   8. why             - why GHLevelUp
 *   9. faq             - FAQs
 *  10. review          - a client review
 *  11. closing         - contact-us band + contact page form
 *
 * The section set matches the Funnel page's so the two read as one family;
 * the layouts are deliberately different (see service-webdev.css). This
 * page's own character: the six decisions a build gets right, the web
 * standards angle (Core Web Vitals, WCAG 2.1 AA), and the six build shapes.
 *
 * NO INVENTED NUMBERS, same rule as the other service pages: the checklist
 * describes what a build has to pass before launch, and the process steps
 * describe what happens, neither of which needs a figure to be true. The
 * load-time and accessibility lines are standards (Core Web Vitals and
 * WCAG 2.1 AA), not claims about our results.
 *
 * ASSETS - provenance, so these can be re-sourced or replaced knowingly:
 *   /img/services/web-build.jpg|webp
 *     Pexels #574071. Code and a live page side by side on one monitor.
 *     1240x930, used by the how-it-works section.
 */

/* -- 1. Hero: the top overview --------------------------------------------- */

export const WEB_HERO = {
  eyebrow: "Websites & landing pages",
  titleLead: "Built to be judged",
  titleAccent: "in the first three seconds.",
  lede:
    "A visitor decides whether your business looks credible before they read a word. We design and build fast, responsive websites and landing pages that earn that decision - then route every form and booking straight into your CRM.",

  primary: { label: "Get Free Consultation", to: "/book", icon: "arrowRight" },
  /* Fragment link down to the detailed overview, offset by
     html { scroll-padding-top } in legacy/styles.css. */
  secondary: { label: "See What a Build Includes", href: "#overview" },

  /* The overview repeated as scannable chips - the top overview a first
     visitor can absorb without reading a paragraph. */
  chips: [
    { icon: "bolt", label: "Core Web Vitals in the green" },
    { icon: "users", label: "WCAG 2.1 AA checked" },
    { icon: "layers", label: "Wired to CRM, calendar, analytics" },
    { icon: "phone", label: "Tested on real devices" },
  ],
};

/* -- 2. The detailed overview ---------------------------------------------- */

export const WEB_OVERVIEW = {
  eyebrow: "Overview",
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

/* -- 3. Detail + visual: the six decisions ---------------------------------- */

export const WEB_ANATOMY = {
  eyebrow: "The anatomy",
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

/* -- 4. What's included ------------------------------------------------------ */

export const WEB_INCLUDES = {
  eyebrow: "What's included",
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

/* -- 5. How it works: process + proof --------------------------------------- */

export const WEB_PROCESS = {
  eyebrow: "How it works",
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
      proof: "A goals brief you approve before a single page is drawn.",
    },
    {
      num: "02",
      title: "Wireframe and copy",
      body: "The pages laid out as wireframes with the words written in, so the argument is settled before the styling starts.",
      proof: "One wireframe round with copy in it, not separate design and copy reviews.",
    },
    {
      num: "03",
      title: "Build and connect",
      body: "Built responsive and accessible, connected to your CRM, calendar and analytics, with the follow-up sequences wired in.",
      proof: "Every form and booking path tested against your live CRM, not a staging stand-in.",
    },
    {
      num: "04",
      title: "Test and launch",
      body: "Forms, speed and mobile checked on real devices before launch, then adjusted as the first real traffic arrives.",
      proof: "Speed measured on a throttled connection and the launch checklist walked end to end.",
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

/* -- 6. Journey: what happens after launch ---------------------------------- */

export const WEB_JOURNEY = {
  eyebrow: "The journey",
  title: "From First Search to Booked Job",
  lede:
    "A site is one link in a chain that has to keep working after the launch. This is the path a visitor travels on the sites we build - each stage wired to the next so nothing stops halfway.",

  /* The six steps a visitor takes, in order. `detail` is the one line that
     says what we built to make that step hold. */
  steps: [
    {
      icon: "search",
      title: "Find",
      detail: "Titles, headings and structured data written per page.",
    },
    {
      icon: "target",
      title: "Judge",
      detail: "What you do, who for, and proof of it in the first screen.",
    },
    {
      icon: "arrowUpRight",
      title: "Act",
      detail: "One obvious next step, repeated where the decision happens.",
    },
    {
      icon: "file",
      title: "Enquire",
      detail: "Forms with real labels, honest errors and no silent failures.",
    },
    {
      icon: "layers",
      title: "Route",
      detail: "Every enquiry lands in the CRM with its source attached.",
    },
    {
      icon: "trendUp",
      title: "Convert",
      detail: "Follow-up sequences pick up anyone the phone missed.",
    },
  ],

  cta: { label: "Review My Site", to: "/book", icon: "arrowRight" },
};

/* -- 7. Who we work with ----------------------------------------------------- */

export const WEB_WHO = {
  eyebrow: "Who we work with",
  title: "The Six Builds We Are Asked For",
  lede:
    "Different shapes, same discipline: fast, clear, accessible, and wired to something that captures the enquiry.",

  items: [
    {
      icon: "house",
      title: "Local service businesses",
      body: "Areas covered, services priced where possible, and a phone number that is never more than a thumb away.",
    },
    {
      icon: "building",
      title: "Professional practices",
      body: "Credibility first for accountants, clinics and advisers - then intake that does not require a phone call.",
    },
    {
      icon: "target",
      title: "Campaign marketers",
      body: "Single landing pages: one offer, one action, built for paid traffic and measured properly.",
    },
    {
      icon: "cart",
      title: "Small eCommerce",
      body: "A catalogue that loads fast, a checkout that does not lose people, and post-purchase follow-up.",
    },
    {
      icon: "pen",
      title: "Content and SEO sites",
      body: "A structure search engines can read and a reading experience that keeps people on the page.",
    },
    {
      icon: "layers",
      title: "Rebuilds and rescues",
      body: "An existing site that is slow, unmanageable or invisible, rebuilt without losing what already ranks.",
    },
  ],
};

/* -- 8. Why GHLevelUp --------------------------------------------------------- */

export const WEB_WHY = {
  eyebrow: "Why GHLevelUp",
  title: "Why Have Us Build It",
  lede: "Four things a build from us does that a template cannot.",

  items: [
    {
      icon: "bolt",
      title: "Speed as a requirement",
      body: "Core Web Vitals are checked on real devices and throttled connections before launch, not offered as an upgrade afterwards.",
    },
    {
      icon: "users",
      title: "Everyone can use it",
      body: "Keyboard, screen reader and contrast are part of the build. A site that quietly excludes people loses the enquiries those people would have sent.",
    },
    {
      icon: "layers",
      title: "Wired to the pipeline",
      body: "Forms, bookings and chats write to your CRM with their source attached, so an enquiry becomes a follow-up instead of an unread inbox.",
    },
    {
      icon: "pen",
      title: "Yours to run",
      body: "You own the site outright, with the logins and the records to prove it, and routine copy changes do not need a developer on standby.",
    },
  ],

  cta: { label: "Get Free Consultation", to: "/book", icon: "arrowRight" },
};

/* -- 9. FAQ -------------------------------------------------------------------- */

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

/* -- 10. A client review ---------------------------------------------------------- */

export const WEB_REVIEW = {
  eyebrow: "Client review",
  quote:
    "The old site looked fine and did nothing. GHLevelUp rebuilt it around what our customers actually came to do - check coverage, see the price, book the visit. It loads instantly on a phone, the form tells you it worked, and every enquiry arrives in the CRM already labelled with where it came from.",
  name: "Tariq Rahman",
  role: "CEO, Nexora",
  image: "/img/home/avatar-2.webp",
  cta: { label: "Get Free Consultation", to: "/book", icon: "arrowRight" },
};

/* -- 11. Closing contact ----------------------------------------------------------- */

export const WEB_CLOSING = {
  title: "What should your site actually do?",
  body:
    "Send what you sell and what is wrong with the site you have. We will come back with what to build, what to keep, and what it would cost - or just call and ask.",
  actions: [
    { label: "Get Free Consultation", to: "/book", icon: "calendar", variant: "accent" },
  ],
  note: "Replies within one business day - the contact form lands in the same inbox we read.",
};
