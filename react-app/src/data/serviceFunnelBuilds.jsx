/**
 * /services/funnel-design-builds - all page copy.
 *
 * Kept out of the page component for the same reason the other service data
 * files are. Section order here mirrors the order the page renders them in.
 *
 * NO INVENTED NUMBERS. This page is the easiest place in the site to invent
 * a conversion rate, so it deliberately does not: the stage list describes
 * what each stage has to do, and the leak list describes what goes wrong,
 * neither of which needs a figure to be true.
 *
 * ASSETS - provenance, so these can be re-sourced or replaced knowingly:
 *   /img/services/funnel-sketch.jpg|webp
 *     Pexels #3471423 (same license). A designer sketching a mobile screen
 *     at a desk. 1240x930, used by the build process section.
 */

/* -- 1. Hero --------------------------------------------------------------- */

export const FNL_HERO = {
  eyebrow: "Funnel design & builds",
  titleLead: "A page for one offer,",
  titleAccent: "and one action to take.",
  lede:
    "Most pages try to explain the whole business and end up asking for nothing. We design and build the funnel around a single offer: the promise, the page, the form, the booking, and the follow-up after the click.",

  primary: { label: "Get Free Consultation", to: "/book", icon: "arrowRight" },
  /* Fragment link down to the anatomy section, offset by
     html { scroll-padding-top } in legacy/styles.css. */
  secondary: { label: "See How a Funnel Works", href: "#anatomy" },

};

/* -- 2. Anatomy of a funnel ---------------------------------------------- */

export const FNL_ANATOMY = {
  eyebrow: "Anatomy",
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

/* -- 3. What we build ----------------------------------------------------- */

export const FNL_GRID = {
  eyebrow: "What we build",
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

/* -- 4. Design, build, test, launch -------------------------------------- */

export const FNL_PROCESS = {
  eyebrow: "Our process",
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
    },
    {
      num: "02",
      icon: "pen",
      title: "Wireframe and copy",
      body: "The page laid out as a wireframe with the words written into it, so the argument is settled before the styling starts.",
    },
    {
      num: "03",
      icon: "code",
      title: "Build and connect",
      body: "Built responsive, connected to your CRM and calendar, with the tracking and the follow-up sequences wired in.",
    },
    {
      num: "04",
      icon: "shieldCheck",
      title: "Test and launch",
      body: "Forms, booking and mobile checked on real devices before it goes live, then adjusted as the first traffic arrives.",
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

/* -- 5. Where funnels leak ------------------------------------------------ */

export const FNL_FIX = {
  eyebrow: "Where funnels leak",
  title: "Four Things That Cost You the Booking",
  lede:
    "These are the same four problems on almost every funnel we are asked to look at, and none of them are about design taste.",

  rows: [
    {
      problem: "The page restates the whole business",
      fix: "One promise above the fold, and everything that does not support it moved or cut",
    },
    {
      problem: "The form asks for everything at once",
      fix: "Two or three fields to start, the qualification collected after they have decided",
    },
    {
      problem: "The calendar appears with no context",
      fix: "Slot, length and what happens next on one screen, so booking is not a second decision",
    },
    {
      problem: "Nothing happens after the click",
      fix: "Confirmation, reminder and follow-up written and scheduled before launch",
    },
  ],

  cta: { label: "Get Your Funnel Reviewed", to: "/book", icon: "arrowRight" },
};

/* -- 6. FAQ + contact card ------------------------------------------------ */

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

/* -- 7. Intro -------------------------------------------------------------- */

export const FNL_INTRO = {
  eyebrow: "The short version",
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

/* -- 8. The detail --------------------------------------------------------- */

export const FNL_DETAILS = {
  eyebrow: "The detail",
  title: "What's actually included",
  lede:
    "A funnel is a chain, and it is only as good as its weakest link. These are the links most builds get wrong.",
  groups: [
    {
      icon: "target",
      title: "The offer and the message",
      items: [
        "One offer, one audience and one action, agreed before design starts",
        "The objection that has to be answered, answered above the fold",
        "Proof that is honest - no invented figures or stock testimonials",
        "A headline that says what it is, not what it feels like",
      ],
    },
    {
      icon: "layers",
      title: "The page itself",
      items: [
        "Built mobile-first, because most of the traffic will be",
        "Load time checked on a real connection, not just a fast one",
        "Accessible forms with real labels and visible error messages",
        "No carousel, no autoplay, nothing competing with the one action",
      ],
    },
    {
      icon: "calendar",
      title: "What happens on submit",
      items: [
        "Booking straight onto a live calendar with genuine availability",
        "Instant confirmation by text and email, not just a thank-you page",
        "The lead in your CRM with its source and campaign attached",
        "A follow-up sequence for anyone who starts and does not finish",
      ],
    },
    {
      icon: "lineChart",
      title: "Tracking that tells the truth",
      items: [
        "Conversion tracking verified with real test submissions",
        "Source and campaign carried through to the booked appointment",
        "A dashboard showing cost per booked call, not just per click",
        "Events named consistently, so the data is still usable in a year",
      ],
    },
  ],
};

/* -- 9. Who it is for ------------------------------------------------------ */

export const FNL_USECASES = {
  eyebrow: "Who it's for",
  title: "When a funnel beats a website page",
  lede:
    "A funnel earns its place when there is one specific thing you want a specific person to do. These are the six cases we build most.",
  items: [
    { icon: "calendar", title: "Booked consultations", body: "One service, one calendar, one action. The most common build and the easiest to measure." },
    { icon: "megaphone", title: "Paid traffic landing pages", body: "A page that matches the ad it came from, so the spend is not wasted on a confused visitor." },
    { icon: "filePlus", title: "Lead magnets", body: "Something genuinely useful in exchange for an email, then a sequence that earns the next step." },
    { icon: "play", title: "Webinar and event signup", body: "Registration, reminders and the replay follow-up, built as one path rather than three tasks." },
    { icon: "cart", title: "Single-product checkout", body: "One product, one decision, with the upsell handled after the purchase rather than before it." },
    { icon: "house", title: "Local service quotes", body: "Area-aware forms that qualify before they book, so the diary fills with jobs worth doing." },
  ],
};

/* -- 10. Representative work ---------------------------------------------- */

export const FNL_WORK = {
  eyebrow: "What a build looks like",
  title: "Three representative builds",
  lede:
    "Each of these began with the same conversation: traffic was arriving and not converting, and nobody could say where it was being lost.",
  note:
    "These describe the shape of work of this kind, not named client engagements - we do not publish client details or performance figures without written sign-off.",
  items: [
    {
      tag: "Consultation funnel",
      title: "From ad click to booked call",
      problem: "Paid traffic landed on the homepage, where visitors had eleven things to choose from and chose none.",
      built: [
        "A dedicated page matching the ad's promise, with one action",
        "Qualifying questions before the calendar, to filter out time-wasters",
        "Confirmation and reminder sequence to cut no-shows",
      ],
      outcome: "The spend lands on a page with one job, and every booking carries the campaign that produced it.",
    },
    {
      tag: "Lead magnet",
      title: "An email list that was worth having",
      problem: "A download form collected emails that were never followed up, so the list aged into nothing.",
      built: [
        "A single-field form, because the email was all that was needed",
        "Immediate delivery, then a five-touch sequence earning the next step",
        "Tagging by which magnet they took, so follow-up could be relevant",
      ],
      outcome: "Downloads turn into conversations instead of a list nobody has a reason to email.",
    },
    {
      tag: "Leak fix",
      title: "Finding where the traffic went",
      problem: "The funnel converted far below expectation and the cause was assumed to be the copy.",
      built: [
        "Tracking rebuilt and verified with real end-to-end submissions",
        "The form tested on real devices, where a required field was failing silently",
        "Load time cut on mobile, where most of the traffic was arriving",
      ],
      outcome: "The leak turned out to be mechanical, not persuasive - and it was measurable once tracking was honest.",
    },
  ],
};

/* -- 11. Benefits ---------------------------------------------------------- */

export const FNL_BENEFITS = {
  eyebrow: "The results",
  title: "What a funnel gives you that a page does not",
  lede: "Six things that come from having one job per page.",
  items: [
    { icon: "target", title: "One decision", body: "Nowhere else to click means the action is the only option." },
    { icon: "lineChart", title: "Measurable spend", body: "Cost per booked call, not cost per click you cannot act on." },
    { icon: "bolt", title: "Faster to test", body: "One variable at a time, on a page built to be changed." },
    { icon: "phone", title: "Works on a phone", body: "Built mobile-first, where most paid traffic actually arrives." },
    { icon: "calendar", title: "Books itself", body: "The action completes on the page instead of becoming an email." },
    { icon: "trendUp", title: "Follow-up included", body: "The ones who hesitate get a sequence, not silence." },
  ],
};

/* -- 12. Enquiry form ------------------------------------------------------ */

export const FNL_ENQUIRY = {
  service: "Funnel Design & Builds",
  eyebrow: "Get started",
  title: "What is the one thing you want them to do?",
  lede:
    "Tell us the offer, who it is for and where the traffic comes from. We will come back with what the funnel should ask, what it should leave out, and what it would cost.",
  points: [
    "A clear view of the one action the page should drive",
    "An honest answer on whether a funnel or a page is right",
    "No obligation, and no retainer to sign before you see the plan",
  ],
};
