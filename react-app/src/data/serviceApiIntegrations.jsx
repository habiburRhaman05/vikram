/**
 * /services/api-tool-integrations - all page copy.
 *
 * Kept out of the page component for the same reason the other service data
 * files are. Section order here mirrors the order the page renders them in.
 *
 * NO INVENTED NUMBERS. Everything stated here is either a product fact
 * (which platforms we connect, that credentials are stored rather than
 * pasted, that failed runs retry) or something the reader can check on a
 * call. Nothing counts clients or claims a saving.
 *
 * ASSETS - provenance, so these can be re-sourced or replaced knowingly:
 *   /img/services/api-build.jpg|webp
 *     Pexels #33572895 (same license). A two monitor desk with code on
 *     screen. 1240x930, used by the build process section.
 *   /img/integrations/*.png
 *     Each vendor's own mark, fetched once for /services and reused here.
 *     Trademarks belong to their owners; they appear only to name the
 *     platforms we connect to.
 */

/* -- 1. Hero --------------------------------------------------------------- */

export const API_HERO = {
  eyebrow: "API & tool integrations",
  titleLead: "Your tools, finally",
  titleAccent: "reading from one record.",
  lede:
    "Most businesses are not short of software. They are short of the joins between it. We connect the platforms you already run on so a booking, a payment or a new enquiry is written everywhere it matters, once, with nobody re-typing it.",

  primary: { label: "Get Free Consultation", to: "/book", icon: "arrowRight" },
  /* Fragment link down to the connection grid, offset by
     html { scroll-padding-top } in legacy/styles.css. */
  secondary: { label: "See What We Connect", href: "#connected" },

};

/* -- 2. One source of truth ---------------------------------------------- */

export const API_TRUTH = {
  eyebrow: "One source of truth",
  title: "What It Means When Your Tools Talk",
  lede:
    "A connection is not a one-off export. It is a standing agreement about which tool owns which field, which direction each change travels, and what happens when one of them is down. Get that wrong and you have two systems disagreeing; get it right and the question goes away.",

  checks: [
    "One record per person, not one per tool",
    "Changes written back, not just read",
    "Failed runs retried and reported",
    "Your tools stay your tools",
  ],

  cta: { label: "Get Free Consultation", to: "/book" },

  /* The platforms this build connects most often. Same list the /services
     page shows, because it is the same work. */
  platforms: [
    { name: "GoHighLevel", logo: "gohighlevel" },
    { name: "Twilio", logo: "twilio" },
    { name: "Google Calendar", logo: "google-calendar" },
    { name: "Zocdoc", logo: "zocdoc" },
    { name: "OptiMantra", logo: "optimantra" },
    { name: "Clarity", logo: "clarity" },
  ],

  caption: "And anything else with an API worth reading",
  note: "Same record, every screen",
};

/* -- 3. What we connect --------------------------------------------------- */

export const API_GRID = {
  eyebrow: "What we connect",
  title: "The Joins We Build Most Often",
  subtitle: "Six connections that remove the most copy and paste.",
  lede:
    "Where a platform has a ready made connector we use it. Where it does not, we build against its API and document what we built, so the connection can be maintained rather than guessed at later.",

  items: [
    {
      icon: "layers",
      title: "CRM and pipeline",
      body: "GoHighLevel, Salesforce and the rest: one contact record with its stages, owners and notes written from wherever the change happened.",
    },
    {
      icon: "calendar",
      title: "Calendars and scheduling",
      body: "Live availability in both directions, so a booking made in one place blocks the slot in the other and nothing gets double booked.",
    },
    {
      icon: "phone",
      title: "Telephony, SMS and email",
      body: "Calls, messages and replies logged against the contact, with the transcripts and recordings attached where the platform allows it.",
    },
    {
      icon: "creditCard",
      title: "Billing and payments",
      body: "Invoices, subscriptions and failed payments visible next to the work they paid for, instead of in a second system nobody checks.",
    },
    {
      icon: "globe",
      title: "Websites, forms and checkout",
      body: "Form submissions and orders arriving with their source attached, so the marketing report and the pipeline agree about where a lead came from.",
    },
    {
      icon: "fileCheck",
      title: "Booking and practice platforms",
      body: "Practice management, booking and intake tools joined to the CRM, which is where most clinics and offices lose the thread.",
    },
  ],

  cta: { label: "Get Free Consultation", to: "/book" },
};

/* -- 4. How a connection gets built -------------------------------------- */

export const API_PROCESS = {
  eyebrow: "Our process",
  title: "How a Connection Gets Built",
  subtitle: "Four steps, and you approve the map before anything is written.",
  lede:
    "The mapping step is the one worth taking slowly. Half of a failed integration project is a field that two systems both think they own.",

  image: "/img/services/api-build.jpg",
  imageWebp: "/img/services/api-build.webp",
  imageAlt: "A desk with two monitors showing code, a keyboard and headphones",
  steps: [
    {
      num: "01",
      icon: "search",
      title: "Audit the stack",
      body: "We list every tool holding customer data, who uses it, and which one the team actually treats as the truth.",
    },
    {
      num: "02",
      icon: "layers",
      title: "Agree the direction",
      body: "Field by field: which system owns it, which one receives it, and which changes travel back the other way.",
    },
    {
      num: "03",
      icon: "code",
      title: "Build and authenticate",
      body: "We build the connection, store credentials properly, and handle the rate limits and duplicate events that break naive integrations.",
    },
    {
      num: "04",
      icon: "shieldCheck",
      title: "Monitor and maintain",
      body: "Runs are logged, failures retry, and an alert reaches you when a connection needs attention instead of losing the record.",
    },
  ],


  /* Floating chips over the build photo, as the reference layout does. */
  chips: [
    { icon: "key", label: "Credentials stored" },
    { icon: "bolt", label: "Retries on failure" },
    { icon: "lineChart", label: "Every run logged" },
    { icon: "usersTwo", label: "One record per person" },
  ],

  cta: { label: "Talk Through Your Stack", to: "/book", icon: "arrowRight" },
};

/* -- 5. What changes ------------------------------------------------------ */

export const API_EFFECT = {
  eyebrow: "What changes",
  title: "What You Notice Once They Talk",
  lede: "None of this is visible in a screenshot. It shows up in the week after launch, in the things that stop needing a person.",

  items: [
    {
      icon: "layers",
      title: "One version of the truth",
      body: "The same name, number and stage wherever anyone looks, including the report at the end of the month.",
    },
    {
      icon: "pen",
      title: "No more re-typing",
      body: "What arrives in one tool is already in the next one, without a spreadsheet in between.",
    },
    {
      icon: "target",
      title: "Fewer dropped leads",
      body: "Nothing depends on a copy and paste happening on a busy afternoon.",
    },
    {
      icon: "lineChart",
      title: "Reporting you can argue with",
      body: "One dataset behind the numbers, so a disagreement is about the business rather than about the export.",
    },
    {
      icon: "clock",
      title: "Faster onboarding",
      body: "A new tool gets connected to the system, instead of being worked around by the people using it.",
    },
    {
      icon: "wallet",
      title: "Billing that matches the work",
      body: "Invoices and payments sit beside the jobs they belong to, which makes the chasing conversation easier.",
    },
  ],

  cta: { label: "Get Free Consultation", to: "/book" },
};

/* -- 6. FAQ + contact card ------------------------------------------------ */

export const API_FAQ = {
  eyebrow: "FAQ",
  title: "Questions About Integrations",
  lede: "What businesses ask before their tools are joined up.",

  items: [
    {
      question: "Our platform has no official integration. Does that rule it out?",
      answer:
        "No. If it has an API we can usually build against it, and if it does not we look at what the platform can export or email on a schedule. Where neither exists we will say so on the call rather than sell you a workaround that needs babysitting.",
    },
    {
      question: "Which system ends up holding the master record?",
      answer:
        "Usually the CRM, because that is where the work is managed. Occasionally a practice or booking platform has to own a clinical or scheduling field, and then the CRM mirrors it. Either way it is decided field by field in the mapping step, in writing.",
    },
    {
      question: "What happens if a connection breaks?",
      answer:
        "Failed runs are logged and retried, and an alert reaches the people who need it, with the payload attached so the record can be replayed. Silent failure is the thing we design against.",
    },
    {
      question: "Is it safe to connect our payment and practice systems?",
      answer:
        "Connections use each platform's own authentication and API scopes, with the minimum access the job needs. Credentials are stored in the platform's credential store rather than in a document, and you can revoke access from the vendor side at any time.",
    },
    {
      question: "Do we need to change the tools we use?",
      answer:
        "No. The point of the work is to keep the tools your team already knows and remove the joins between them. If a tool is genuinely not worth keeping, we will say so, and that becomes a separate conversation rather than a condition of the integration.",
    },
  ],

  card: {
    eyebrow: "Let's talk",
    title: "Which two systems refuse to speak to each other?",
    body: "Tell us which tools hold your customer data. We will map how a record should move between them, and where the joins are missing today.",
    cta: { label: "Get Free Consultation", to: "/book", icon: "arrowRight" },
  },
};

/* -- 7. Intro -------------------------------------------------------------- */

export const API_INTRO = {
  eyebrow: "The short version",
  title: "What an integration really buys you",
  quote: {
    text: "If two systems both hold a customer's phone number, one of them is wrong. You just do not know which yet.",
    attribution: "An integration is deciding which system is right, and making the others follow it.",
  },
  body: [
    "An integration is not a button that syncs everything to everything. It is a decision about where the truth lives. One system owns the customer record, one owns the calendar, one owns the money - and every other tool reads from those rather than keeping its own slightly different copy.",
    "Without that decision you get the thing most businesses actually live with: three versions of the same customer, a booking that exists in the calendar but not the CRM, a payment that reconciles on Friday because somebody exports a spreadsheet. None of it is broken enough to fix, and all of it costs a few minutes several hundred times a month.",
    "What we build is the map and the plumbing: which system is authoritative for what, which events move a record between them, what happens when a call to another service fails, and where you look when something does not arrive. It is unglamorous and it is the difference between software that reports reality and software everyone quietly works around.",
  ],
  facts: [
    { num: "1", label: "Record per customer", sub: "Not one per tool that happens to hold them" },
    { num: "Live", label: "How data moves", sub: "On the event, not on a nightly export" },
    { num: "Every", label: "Call that gets logged", sub: "Including the ones that failed and retried" },
    { num: "1-2 wks", label: "Typical time to live", sub: "Mapped, built, tested, documented" },
  ],
};

/* -- 8. The detail --------------------------------------------------------- */

export const API_DETAILS = {
  eyebrow: "The detail",
  title: "What's actually included",
  lede:
    "Integrations fail in boring, specific ways - a token expires, a field is renamed, a webhook arrives twice. These are the parts that decide whether yours survives that.",
  groups: [
    {
      icon: "layers",
      title: "The map, written down",
      items: [
        "Which system is authoritative for each field, decided explicitly",
        "The events that move a record, and the direction each one flows",
        "Field-level mapping, including the ones that need transforming",
        "A diagram you keep, so the next person does not have to guess",
      ],
    },
    {
      icon: "key",
      title: "Credentials and access",
      items: [
        "API keys and tokens stored properly, never in a spreadsheet",
        "Token refresh handled before it silently expires",
        "Least-privilege scopes rather than full-access keys",
        "Your accounts, your ownership - we are not the single point of failure",
      ],
    },
    {
      icon: "shieldCheck",
      title: "When a call fails",
      items: [
        "Retries with backoff on transient failures",
        "Idempotency, so a webhook delivered twice does not double-book",
        "A named person alerted when something genuinely needs a human",
        "Failed payloads kept, so nothing is lost while it is being fixed",
      ],
    },
    {
      icon: "lineChart",
      title: "Visibility",
      items: [
        "Every run logged with its payload, result and timing",
        "A place to look when someone asks why a record did not arrive",
        "Alerting on volume dropping to zero, not just on hard errors",
        "Documentation handed over, with a walkthrough recording",
      ],
    },
  ],
};

/* -- 9. Who it is for ------------------------------------------------------ */

export const API_USECASES = {
  eyebrow: "Who it's for",
  title: "The joins we are asked for most",
  lede:
    "Almost every request is one of these six. The tools differ; the shape of the problem does not.",
  items: [
    { icon: "calendar", title: "CRM and calendar", body: "A booking made anywhere shows up everywhere, with the right owner and the right reminders attached." },
    { icon: "creditCard", title: "Payments and invoicing", body: "A payment marks the record paid, fires the receipt and stops the chase sequence, without a Friday reconciliation." },
    { icon: "phone", title: "Telephony and CRM", body: "Calls, recordings and outcomes written to the contact, so the history is not split across two systems." },
    { icon: "cart", title: "Checkout and fulfilment", body: "An order creates the customer, the job and the follow-up in one pass rather than three manual ones." },
    { icon: "fileCheck", title: "Industry platforms", body: "The practice, dispatch or filing software you actually work in, joined to the CRM your team lives in." },
    { icon: "barChart", title: "Reporting and dashboards", body: "One source for the numbers, so marketing spend and revenue can finally be compared honestly." },
  ],
};

/* -- 10. Representative work ---------------------------------------------- */

export const API_WORK = {
  eyebrow: "What a build looks like",
  title: "Three representative builds",
  lede:
    "Each of these starts as the same complaint - the data is in the wrong place - and ends as a map plus the plumbing to match it.",
  note:
    "These describe the shape of work of this kind, not named client engagements - we do not publish client details or performance figures without written sign-off.",
  items: [
    {
      tag: "Double entry",
      title: "One record, not three",
      problem: "The same customer existed in the CRM, the booking tool and the accounting system, with three different phone numbers.",
      built: [
        "The CRM named as authoritative for contact details",
        "Two-way sync on the fields that matter, one-way on the rest",
        "A de-duplication pass before go-live, with a reviewed merge list",
      ],
      outcome: "One record per customer, and a documented answer to which system wins when two disagree.",
    },
    {
      tag: "Payments",
      title: "Paid means paid, everywhere",
      problem: "Payments landed in the payment processor and were reconciled against the CRM by hand each week.",
      built: [
        "Webhook from the processor marking the record paid on receipt",
        "Idempotency keys so a replayed webhook cannot double-count",
        "Chase sequences cancelled automatically the moment payment lands",
      ],
      outcome: "The CRM reflects what has actually been paid, and nobody spends Friday afternoon matching rows.",
    },
    {
      tag: "Custom connection",
      title: "The platform with no integration",
      problem: "A core industry platform had no off-the-shelf connector, so data moved by CSV export.",
      built: [
        "A small custom service against the platform's API, with retries",
        "Scheduled reconciliation to catch anything the live path missed",
        "Run logs and alerting so a silent failure cannot go unnoticed",
      ],
      outcome: "The export step is gone, and the two systems agree without anyone maintaining a spreadsheet.",
    },
  ],
};

/* -- 11. Benefits ---------------------------------------------------------- */

export const API_BENEFITS = {
  eyebrow: "The results",
  title: "What changes once the joins exist",
  lede: "Six things that stop being anybody's job.",
  items: [
    { icon: "clock", title: "No more re-typing", body: "A record entered once appears everywhere it is needed." },
    { icon: "shieldCheck", title: "One version of the truth", body: "Two systems can no longer quietly disagree about a customer." },
    { icon: "trendUp", title: "Faster follow-up", body: "Automations fire on real events instead of waiting for an import." },
    { icon: "barChart", title: "Reporting you trust", body: "Numbers come from one place, so they can actually be compared." },
    { icon: "usersTwo", title: "Less tribal knowledge", body: "The map is written down rather than held by one person." },
    { icon: "bolt", title: "Failures are visible", body: "Something not arriving raises an alert instead of a mystery." },
  ],
};

/* -- 12. Enquiry form ------------------------------------------------------ */

export const API_ENQUIRY = {
  service: "API & Tool Integrations",
  eyebrow: "Get started",
  title: "Which systems are not talking?",
  lede:
    "List the tools that hold your customer data and what each one is used for. We will come back with where the truth should live, which joins are worth building, and what it would take.",
  points: [
    "A map of how a record should move between your tools",
    "An honest view of which joins are not worth building",
    "No obligation, and no retainer to sign before you see the plan",
  ],
};
