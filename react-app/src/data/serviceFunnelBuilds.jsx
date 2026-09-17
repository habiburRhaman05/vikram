/**
 * /services/funnel-design-builds - all page copy.
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
 * NO INVENTED NUMBERS. This page is the easiest place in the site to invent
 * a conversion rate, so it deliberately does not: the stage list describes
 * what each stage has to do, and the process steps describe what happens,
 * neither of which needs a figure to be true.
 *
 * ASSETS - provenance, so these can be re-sourced or replaced knowingly:
 *   /img/services/funnel-hero.jpg|webp
 *     Pexels #196645. 880x1100 portrait, used by the hero's photo panel.
 *   /img/services/funnel-sketch.jpg|webp
 *     Pexels #3471423. A designer sketching a mobile screen at a desk.
 *     1240x930, used by the how-it-works section.
 */

/* -- 1. Hero: the top overview --------------------------------------------- */

export const FNL_HERO = {
  eyebrow: "Funnel design & builds",
  titleLead: "A page for one offer,",
  titleAccent: "and one action to take.",
  lede:
    "Most pages try to explain the whole business and end up asking for nothing. We design and build the funnel around a single offer: the promise, the page, the form, the booking, and the follow-up after the click.",

  primary: { label: "Get Free Consultation", to: "/book", icon: "arrowRight" },
  /* Fragment link down to the detailed overview, offset by
     html { scroll-padding-top } in legacy/styles.css. */
  secondary: { label: "See How a Funnel Works", href: "#overview" },

  /* The overview repeated as scannable chips - the top overview a first
     visitor can absorb without reading a paragraph. */
  chips: [
    { icon: "target", label: "One offer, one action" },
    { icon: "layers", label: "Page, form, booking, follow-up" },
    { icon: "calendar", label: "Wired to your CRM and calendar" },
    { icon: "phone", label: "Tested on real devices" },
  ],
};

/* -- 2. The detailed overview ---------------------------------------------- */

export const FNL_OVERVIEW = {
  eyebrow: "Overview",
  title: "What a funnel is, and what it is not",
  quote: {
    text: "A funnel is not a prettier website. It is one page with one job, and everything that does not serve that job removed.",
    attribution: "Which is why the hardest part is deciding what to leave out, not what to add.",
  },
  body: [
    "A website answers every question a visitor might have. A funnel answers one, for one audience, and asks for one thing. That is the whole difference, and it is why a funnel converts where a homepage does not: there is nowhere else to go and nothing else to think about.",
    "The work is mostly decisions, not design. What is the single offer? Who is it for? What is the one action - book, call, buy, download? What objection has to be answered before they will take it? What proof do we have that is honest? Get those right and the page almost writes itself. Get them wrong and no amount of layout rescues it.",
    "Then it has to actually work: the form submits, the booking lands on a real calendar, the follow-up fires whether or not anyone is watching, and the tracking tells you which half of the traffic was worth buying. A funnel that looks right and leaks at the form is worse than no funnel, because you will keep spending on it.",
  ],
  facts: [
    { num: "1", label: "Offer per funnel", sub: "One audience, one action, nothing else" },
    { num: "3", label: "Devices tested on", sub: "Real phone, tablet and desktop before launch" },
    { num: "0", label: "Untested forms at launch", sub: "Every path submitted end to end first" },
    { num: "2-3 wks", label: "Typical time to live", sub: "Offer decided, built, tested, tracked" },
  ],
};

/* -- 3. Detail + visual: the five stages ------------------------------------ */

export const FNL_ANATOMY = {
  eyebrow: "The anatomy",
  title: "Five Stages, Each With One Job",
  lede:
    "A funnel is not a website with a form on it. It is a sequence where each stage has one job and hands a specific person to the next stage. If a stage cannot say what it hands over, it is a decoration and it comes out.",

  stages: [
    {
      num: "01",
      icon: "target",
      title: "The promise",
      body: "What the visitor is being offered, said in their words, in one line.",
      want: "One outcome, one audience",
    },
    {
      num: "02",
      icon: "layers",
      title: "The page",
      body: "Short, fast and built around that one promise, with the reason to act visible without scrolling.",
      want: "Proof where it is needed",
    },
    {
      num: "03",
      icon: "file",
      title: "The capture",
      body: "The two or three fields worth asking for now, with the rest collected after they have decided.",
      want: "Short enough to finish",
    },
    {
      num: "04",
      icon: "calendar",
      title: "The booking",
      body: "The slot, the length and what happens next on one screen, so choosing a time is not a second decision.",
      want: "No dead ends",
    },
    {
      num: "05",
      icon: "clock",
      title: "The follow-up",
      body: "The confirmation, the reminder and the message that goes out when somebody hesitates.",
      want: "Written before launch",
    },
  ],

  cta: { label: "Get Free Consultation", to: "/book" },
  note: "One job per stage",
};

/* -- 4. What's included ------------------------------------------------------ */

export const FNL_INCLUDES = {
  eyebrow: "What's included",
  title: "The Pieces We Put Together",
  subtitle: "Built on your site, or on ours, whichever suits your stack.",
  lede:
    "Every build starts from the offer and works outward, which is why copy and layout are not separate conversations here. The page is written to do a job, then built to match.",

  items: [
    {
      icon: "layers",
      title: "Landing pages",
      body: "Purpose built pages for a campaign or an offer, with one promise, one action and nothing competing with it.",
    },
    {
      icon: "fileCheck",
      title: "Lead forms and qualification",
      body: "The questions worth asking up front, mapped to the pipeline stage the answer belongs to.",
    },
    {
      icon: "calendar",
      title: "Booking flows",
      body: "Availability, time zones, reminders and reschedules, connected to the calendar your team already works in.",
    },
    {
      icon: "cart",
      title: "Upsells and order bumps",
      body: "The second offer presented at the moment it makes sense, priced and delivered without a second checkout.",
    },
    {
      icon: "mail",
      title: "Thank you pages and nurture",
      body: "What happens immediately after the click: confirmation, expectation, and the sequence that follows if nothing is booked.",
    },
    {
      icon: "barChart",
      title: "Tracking and reporting",
      body: "Source, page and outcome connected, so you can see which campaign produced which booking rather than guessing.",
    },
  ],

  cta: { label: "Get Free Consultation", to: "/book" },
};

/* -- 5. How it works: process + proof --------------------------------------- */

export const FNL_PROCESS = {
  eyebrow: "How it works",
  title: "Design, Build, Test, Launch",
  lede:
    "The offer and the audience come first, because a beautiful page aimed at nobody is an expensive way to learn nothing.",

  image: "/img/services/funnel-sketch.jpg",
  imageWebp: "/img/services/funnel-sketch.webp",
  imageAlt: "A designer sketching a mobile screen layout on paper at a desk",

  steps: [
    {
      num: "01",
      icon: "search",
      title: "Offer and audience",
      body: "We pin down what is being sold, to whom, and what they need to believe before they act.",
      proof: "A written brief you sign off before any design starts.",
    },
    {
      num: "02",
      icon: "pen",
      title: "Wireframe and copy",
      body: "The page laid out as a wireframe with the words written into it, so the argument is settled before the styling starts.",
      proof: "The wireframe is the copy review - one document, not two rounds.",
    },
    {
      num: "03",
      icon: "code",
      title: "Build and connect",
      body: "Built responsive, connected to your CRM and calendar, with the tracking and the follow-up sequences wired in.",
      proof: "Every form and trigger tested against your live CRM, not a sandbox.",
    },
    {
      num: "04",
      icon: "shieldCheck",
      title: "Test and launch",
      body: "Forms, booking and mobile checked on real devices before it goes live, then adjusted as the first traffic arrives.",
      proof: "A launch checklist walked on phone, tablet and desktop, end to end.",
    },
  ],

  /* Floating chips over the build photo, as the reference layout does. */
  chips: [
    { icon: "phone", label: "Mobile first" },
    { icon: "bolt", label: "Load time checked" },
    { icon: "target", label: "Forms tested" },
    { icon: "lineChart", label: "Tracking verified" },
  ],

  cta: { label: "Start With the Offer", to: "/book", icon: "arrowRight" },
};

/* -- 6. Journey: what happens after launch ---------------------------------- */

export const FNL_JOURNEY = {
  eyebrow: "The journey",
  title: "From First Click to Booked Call",
  lede:
    "The launch is the middle of the story, not the end. This is the path a visitor travels on the funnel we build - and the one we set up to run without anyone watching.",

  /* The six steps a visitor takes, in order. `detail` is the one line that
     says what we built to make that step hold. */
  steps: [
    {
      icon: "megaphone",
      title: "Click",
      detail: "The ad's promise and the page's promise are the same sentence.",
    },
    {
      icon: "target",
      title: "Land",
      detail: "One offer above the fold, with proof where the objection sits.",
    },
    {
      icon: "file",
      title: "Submit",
      detail: "Two or three fields, real labels, errors that say what to fix.",
    },
    {
      icon: "calendar",
      title: "Book",
      detail: "Live availability on one screen, with time zones handled.",
    },
    {
      icon: "mail",
      title: "Confirm",
      detail: "Text and email go out instantly, before anyone is involved.",
    },
    {
      icon: "trendUp",
      title: "Return",
      detail: "Anyone who hesitates gets a sequence instead of silence.",
    },
  ],

  cta: { label: "Map My Funnel", to: "/book", icon: "arrowRight" },
};

/* -- 7. Who we work with ----------------------------------------------------- */

export const FNL_WHO = {
  eyebrow: "Who we work with",
  title: "The Businesses Funnels Work Best For",
  lede:
    "A funnel earns its place when there is one specific thing you want a specific person to do. These are the six cases we build most.",

  items: [
    {
      icon: "calendar",
      title: "Booked consultations",
      body: "One service, one calendar, one action. The most common build and the easiest to measure.",
    },
    {
      icon: "megaphone",
      title: "Paid-traffic campaigns",
      body: "A page that matches the ad it came from, so the spend is not wasted on a confused visitor.",
    },
    {
      icon: "filePlus",
      title: "Lead-magnet builders",
      body: "Something genuinely useful in exchange for an email, then a sequence that earns the next step.",
    },
    {
      icon: "play",
      title: "Webinar and event hosts",
      body: "Registration, reminders and the replay follow-up, built as one path rather than three tasks.",
    },
    {
      icon: "cart",
      title: "Single-product sellers",
      body: "One product, one decision, with the upsell handled after the purchase rather than before it.",
    },
    {
      icon: "house",
      title: "Local service quotes",
      body: "Area-aware forms that qualify before they book, so the diary fills with jobs worth doing.",
    },
  ],
};

/* -- 8. Why GHLevelUp --------------------------------------------------------- */

export const FNL_WHY = {
  eyebrow: "Why GHLevelUp",
  title: "Why Have Us Build It",
  lede: "Four reasons that survive the first week after launch.",

  items: [
    {
      icon: "target",
      title: "One team, one owner",
      body: "The strategist who plans the funnel is the person who builds it and the one who answers the phone afterwards. Nothing is handed between departments.",
    },
    {
      icon: "code",
      title: "Built where you run",
      body: "We build inside the CRM and calendar your team already uses, so the funnel is an extension of how you work rather than a second system to check.",
    },
    {
      icon: "shieldCheck",
      title: "Tested, not assumed",
      body: "Every form, booking path and follow-up is submitted end to end on real devices before launch. If it can fail quietly, we find it before your traffic does.",
    },
    {
      icon: "lineChart",
      title: "Honest measurement",
      body: "Cost per booked call, not cost per click. Tracking verified with real submissions, so the numbers you see are numbers you can act on.",
    },
  ],

  cta: { label: "Get Free Consultation", to: "/book", icon: "arrowRight" },
};

/* -- 9. FAQ -------------------------------------------------------------------- */

export const FNL_FAQ = {
  eyebrow: "FAQ",
  title: "Questions About Funnels",
  lede: "What businesses ask before they commit to a build.",

  items: [
    {
      question: "Do we need a new website to run a funnel?",
      answer:
        "No. A funnel usually runs alongside your existing site rather than replacing it: a dedicated page for a campaign or an offer, built to convert, with your site left to do what it already does well.",
    },
    {
      question: "Who writes the copy?",
      answer:
        "We do, and it is written into the wireframe before any styling, because the words are what the page has to get right. You review it and we adjust it until it sounds like your business rather than a template.",
    },
    {
      question: "How do you decide which offer the funnel is built around?",
      answer:
        "That is the first conversation. Usually it is the service that is already the easiest to sell, or the one worth the most over time, rather than the newest thing you would like to push.",
    },
    {
      question: "Can it connect to the CRM and calendar we already use?",
      answer:
        "Yes, and it should. A funnel that books into a calendar your team does not use creates a second diary to check, which is worse than no booking flow at all.",
    },
    {
      question: "What happens after launch?",
      answer:
        "We watch the first traffic with you, fix what the real behaviour exposes, and test the headline, the offer presentation and the form as the data arrives. The build itself stays yours.",
    },
  ],

  card: {
    eyebrow: "Let's talk",
    title: "Which offer deserves its own page?",
    body: "Tell us what you sell and who you sell it to. We will say what the funnel should ask for, and what it should leave out.",
    cta: { label: "Get Free Consultation", to: "/book", icon: "arrowRight" },
  },
};

/* -- 10. A client review ---------------------------------------------------------- */

export const FNL_REVIEW = {
  eyebrow: "Client review",
  quote:
    "GHLevelUp rebuilt our booking funnel around one offer instead of the five we were trying to promote at once. The page said one thing, the form asked for less, and the reminders went out on their own. It is the first time our ad spend and our calendar were actually connected.",
  name: "Sarah Ahmed",
  role: "Founder, HealthPlus",
  image: "/img/home/avatar-1.webp",
  cta: { label: "Get Free Consultation", to: "/book", icon: "arrowRight" },
};

/* -- 11. Closing contact ----------------------------------------------------------- */

export const FNL_CLOSING = {
  title: "Which offer deserves its own page?",
  body:
    "Send the offer and where its traffic comes from. We will come back with what the funnel should ask for, what it should leave out, and what it would cost - or just call and ask.",
  actions: [
    { label: "Get Free Consultation", to: "/book", icon: "calendar", variant: "accent" },
  ],
  note: "Replies within one business day - the contact form lands in the same inbox we read.",
};
