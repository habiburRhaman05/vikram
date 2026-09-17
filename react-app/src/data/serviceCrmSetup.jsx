/**
 * /services/crm-sub-account-setup - all page copy.
 *
 * NO INVENTED NUMBERS. Everything here is a product fact about what GHL
 * setup work actually involves (account structure, pipeline design, A2P
 * 10DLC registration, SPF/DKIM/DMARC, snapshots, data migration), a
 * process description, or something the reader can check on a call.
 * Nothing counts clients or claims a measured result.
 *
 * REVIEWS: this page does NOT define its own testimonials. It renders the
 * site's existing TESTIMONIALS export from homeV2.jsx - the same three
 * already live on the home page - rather than inventing a second, different
 * set of client quotes. Those still need replacing with real, approved
 * reviews before launch; see the note in the page component.
 *
 * SCOPE vs /services/gohighlevel-sub-accounts: that page is about getting
 * one platform configured end to end (numbers, domains, calendars, A2P).
 * This page is the CRM-structure side - architecture, pipeline design,
 * migrating off another CRM, and snapshots for repeatable deployment. They
 * cross-link rather than repeat each other (see data/serviceLinks.js).
 */

/* -- 1. Hero (top overview) ------------------------------------------------- */

export const CS_HERO = {
  eyebrow: "CRM & sub-account setup",
  crumb: "CRM & Sub-account Setup",
  titleLead: "Your CRM, structured",
  titleAccent: "before you ever log in.",
  lede:
    "Account architecture, pipelines that match how you actually sell, calendars, compliance and migration - configured, tested and documented, so you inherit a working system instead of an empty account and a tutorial playlist.",

  primary: { label: "Get Free Consultation", to: "/book", icon: "arrowRight" },
  secondary: { label: "See What's Included", href: "#included" },

  /* The architecture tree in the hero - the shape of a properly structured
     account, not a screenshot of one. */
  tree: {
    root: { icon: "building", label: "Agency account" },
    branches: [
      {
        icon: "key",
        label: "Sub-account: Location A",
        children: ["Sales pipeline", "Booking calendar", "A2P registered"],
      },
      {
        icon: "key",
        label: "Sub-account: Location B",
        children: ["Sales pipeline", "Booking calendar", "A2P registered"],
      },
    ],
    snapshot: "Saved as a reusable snapshot",
  },
};

/* -- 2. Overview / the detail ----------------------------------------------- */

export const CS_OVERVIEW = {
  eyebrow: "Overview",
  title: "An empty CRM is not a system",
  body: [
    "Buying GoHighLevel gets you the software. It does not get you a CRM. What arrives is a blank account with every feature switched on and no opinion about how your business runs - no pipeline that matches your sales process, no calendar rules that match your team, no compliance registration, and nothing connected to the tools you already use.",
    "Most accounts that get abandoned were never actually set up. Someone created a pipeline with the default stage names, imported a contact list without de-duplicating it, sent a few test messages that silently failed carrier filtering, and concluded the platform did not work. The platform was fine. The configuration never happened.",
    "Setup is a design job before it is a technical one. Which stages does a deal actually move through? Who owns a lead when it arrives at 9pm? What has to be true before a booking is confirmed? We answer those with you first, write the structure down, then build it - so what you get is a system with a shape, and a document explaining that shape to whoever joins next.",
  ],
  /* Annotated before/after account state. Qualitative by design - see the
     file header note on why there are no percentages here. */
  states: {
    beforeLabel: "A blank account",
    before: [
      "Default pipeline stages nobody uses",
      "One shared calendar, no routing rules",
      "SMS unregistered - messages filtered",
      "Contacts imported with duplicates intact",
      "No record of how any of it was set up",
    ],
    afterLabel: "A configured system",
    after: [
      "Pipeline stages named after your real sales process",
      "Calendars routed by team, service and availability",
      "A2P 10DLC registered and message-tested",
      "Contacts de-duplicated and field-mapped on import",
      "A written structure doc and a walkthrough recording",
    ],
  },
};

/* -- 3. What's included ------------------------------------------------------ */

export const CS_INCLUDED = {
  eyebrow: "What's included",
  title: "Everything That Has to Be Decided",
  lede:
    "Grouped by the order it gets built in. Every line is a decision made deliberately rather than left on its default.",
  groups: [
    {
      id: "architecture",
      icon: "building",
      label: "Architecture",
      title: "Account & sub-account structure",
      items: [
        "Agency and sub-account hierarchy laid out before anything is built",
        "Naming conventions that still make sense at twenty accounts",
        "User roles and permissions scoped to what each person actually needs",
        "Location settings, business profile and timezone configured per account",
      ],
    },
    {
      id: "pipelines",
      icon: "target",
      label: "Pipelines",
      title: "Pipelines & opportunity stages",
      items: [
        "Stages named after your real sales process, not the default template",
        "Entry and exit conditions defined for every stage",
        "Separate pipelines where you genuinely sell differently",
        "Custom fields and tags designed once instead of accumulating",
      ],
    },
    {
      id: "calendars",
      icon: "calendar",
      label: "Calendars",
      title: "Calendars & booking flows",
      items: [
        "Round-robin, team and service-specific calendars as the job requires",
        "Availability, buffers and notice periods set per calendar",
        "Confirmation and reminder sequences attached on creation",
        "Two-way sync with the calendars your team already lives in",
      ],
    },
    {
      id: "compliance",
      icon: "shieldCheck",
      label: "Compliance",
      title: "Deliverability & compliance",
      items: [
        "A2P 10DLC brand and campaign registration filed and tracked",
        "SPF, DKIM and DMARC records set so email authenticates properly",
        "Sending domain and dedicated number provisioned and verified",
        "Live send tests on real devices before anything goes to a customer",
      ],
    },
    {
      id: "migration",
      icon: "layers",
      label: "Migration",
      title: "Data migration & integrations",
      items: [
        "Contacts, notes and deal history brought across from your old CRM",
        "De-duplication pass with a merge list you review before it runs",
        "Field mapping agreed in writing rather than guessed at",
        "Existing tools connected so nothing keeps living in two places",
      ],
    },
    {
      id: "handover",
      icon: "fileCheck",
      label: "Handover",
      title: "Snapshots & documentation",
      items: [
        "The finished configuration saved as a reusable snapshot",
        "A written structure document you keep, not held in our heads",
        "A recorded walkthrough of the account as it was actually built",
        "Your account, your ownership - logins and admin rights are yours",
      ],
    },
  ],
};

/* -- 4. How it works + journey ---------------------------------------------- */

export const CS_PROCESS = {
  eyebrow: "How it works",
  title: "Four Phases, and You Approve the Blueprint",
  lede:
    "The design phase is the one worth taking slowly. Almost every painful setup is a structure decision that got made by default and then built on.",

  /* The journey bar - phase labels with an indicative duration. These are
     the same delivery timelines quoted on the other service pages; nothing
     here is a guarantee, and the FAQ says as much. */
  journey: [
    { label: "Discovery", when: "Day 1" },
    { label: "Blueprint", when: "Days 2-3" },
    { label: "Build", when: "Week 1-2" },
    { label: "Handover", when: "On launch" },
  ],

  /* Each step carries its own proof panel - a coded mock of the artefact
     that phase actually produces, so "what you get" is shown rather than
     claimed. `proof.kind` selects which mock the page renders. */
  steps: [
    {
      num: "01",
      icon: "search",
      title: "Audit & discovery",
      body:
        "A short call mapping how you sell today - the stages a deal really moves through, who owns a lead when, and which tools already hold customer data. If you have an existing account, we review what is in it first.",
      deliverable: "A written scope and a structure recommendation",
      proof: {
        kind: "notes",
        caption: "Discovery output",
        lines: [
          "Sales process: 5 real stages (not 7 defaults)",
          "Lead owners: round-robin, business hours only",
          "Existing CRM: 2,400 contacts to migrate",
          "Tools to connect: calendar, billing, web forms",
        ],
      },
    },
    {
      num: "02",
      icon: "layers",
      title: "Blueprint design",
      body:
        "The account structure written down before anything is built: hierarchy, pipelines and stages, calendar rules, field map and naming conventions. You approve it, and it becomes the spec the build is checked against.",
      deliverable: "An approved structure document",
      proof: {
        kind: "pipeline",
        caption: "Approved pipeline design",
        stages: ["New enquiry", "Qualified", "Quoted", "Booked", "Won"],
      },
    },
    {
      num: "03",
      icon: "sliders",
      title: "Configuration & compliance",
      body:
        "The build itself, in the order that avoids rework: structure, then pipelines and calendars, then compliance registration, then integrations and migration. Compliance is filed early because carrier approval is the one step nobody can rush.",
      deliverable: "A configured account with compliance filed",
      proof: {
        kind: "status",
        caption: "Build status",
        rows: [
          { label: "Sub-account structure", state: "done" },
          { label: "Pipelines & calendars", state: "done" },
          { label: "SPF / DKIM / DMARC", state: "done" },
          { label: "A2P 10DLC registration", state: "pending" },
        ],
      },
    },
    {
      num: "04",
      icon: "fileCheck",
      title: "Testing & handover",
      body:
        "Every path tested end to end with real submissions on real devices - a form that fills in, a booking that lands, a reminder that arrives. Then the snapshot, the structure doc and a recorded walkthrough, so the system outlives the engagement.",
      deliverable: "A tested account, a snapshot and documentation",
      proof: {
        kind: "checks",
        caption: "Pre-launch tests",
        items: [
          "Form submission writes to the right pipeline",
          "Booking confirmation and reminder both arrive",
          "SMS delivers to a real handset, not a simulator",
          "Permissions verified per user role",
        ],
      },
    },
  ],

  cta: { label: "Get Free Consultation", to: "/book", icon: "arrowRight" },
};

/* -- 5. Who we work with ----------------------------------------------------- */

export const CS_WHO = {
  eyebrow: "Who we work with",
  title: "Four Situations We're Usually Called Into",
  lede: "Different starting points, one shared problem: the structure was never decided.",
  items: [
    {
      icon: "graduationCap",
      title: "New to GoHighLevel",
      body:
        "You bought the platform and hit the blank-account wall. We configure it around your business instead of leaving you to reverse-engineer it from tutorials.",
    },
    {
      icon: "usersTwo",
      title: "Agencies onboarding clients",
      body:
        "You need a repeatable setup rather than a bespoke one each time. We build the first account properly and hand you the snapshot that clones it.",
    },
    {
      icon: "trash",
      title: "An account that got messy",
      body:
        "Someone set it up in a hurry and now nobody trusts the data. We audit what is there, keep what works and restructure the rest without starting from zero.",
    },
    {
      icon: "truck",
      title: "Migrating from another CRM",
      body:
        "Coming off HubSpot, Keap, Pipedrive or a spreadsheet. We map the fields, de-duplicate the records and bring the history across rather than the contacts alone.",
    },
  ],
};

/* -- 6. Why GHLevelUp -------------------------------------------------------- */

export const CS_WHY = {
  eyebrow: "Why GHLevelUp",
  title: "What Makes This Different From a Freelancer and a Checklist",
  lede: "Four commitments that decide whether a setup survives its first busy month.",
  items: [
    {
      num: "01",
      icon: "pen",
      title: "The structure gets written down",
      body:
        "You approve a blueprint before anything is built, and you keep it afterwards. A setup that only exists in somebody's head is a setup you cannot hand to a new hire.",
    },
    {
      num: "02",
      icon: "shieldCheck",
      title: "Compliance is filed, not skipped",
      body:
        "A2P 10DLC and email authentication are part of the build, not an upsell discovered when messages start failing. We file early because carrier approval is nobody's to rush.",
    },
    {
      num: "03",
      icon: "key",
      title: "You own everything",
      body:
        "Your account, your domain, your data, your admin rights. We are not the single point of failure, and leaving does not cost you the system.",
    },
    {
      num: "04",
      icon: "check",
      title: "It gets tested before you see it",
      body:
        "Real submissions on real devices - a form that lands in the right pipeline, an SMS that reaches an actual handset. Not a walkthrough of settings screens.",
    },
  ],
};

/* -- 7. FAQ ------------------------------------------------------------------- */

export const CS_FAQ = {
  eyebrow: "FAQ",
  title: "Questions About CRM Setup",
  lede: "What businesses ask before handing over the account.",
  items: [
    {
      question: "How long does a full setup take?",
      answer:
        "A single sub-account is usually live inside a week. A multi-location or multi-pipeline build is typically one to two weeks, and the variable is almost always how quickly the blueprint gets approved rather than how long the building takes. A2P carrier approval runs in parallel and is the one step outside anyone's control.",
    },
    {
      question: "What is A2P 10DLC, and do we actually need it?",
      answer:
        "It is the registration US carriers require before a business can send SMS at volume. Without it, messages get filtered - often silently, which is worse than a hard failure because everything looks like it sent. We file the brand and campaign registration as part of the build.",
    },
    {
      question: "Can you fix an account someone else set up badly?",
      answer:
        "Usually, yes - and it is often cheaper than starting over because the history is worth keeping. We audit what is there first and tell you honestly which parts to keep, which to restructure, and whether a rebuild genuinely is the better option.",
    },
    {
      question: "Will we lose data migrating from our current CRM?",
      answer:
        "That is what the field-mapping and de-duplication steps exist to prevent. You review the merge list before anything runs, and the source system stays untouched until the migration is verified, so there is always something to fall back to.",
    },
    {
      question: "What is a snapshot, and why does it matter?",
      answer:
        "A snapshot is the finished configuration saved as a template you can clone into a new sub-account. For an agency that turns a multi-day setup into an afternoon, which is the whole point of building the first one properly.",
    },
    {
      question: "Do we need to change the tools we already use?",
      answer:
        "No. The aim is to connect what you already run on, not replace it. If a tool genuinely is not worth keeping we will say so, but that is a separate conversation rather than a condition of the setup.",
    },
  ],
};

/* -- 8. Enquiry + contact ---------------------------------------------------- */

export const CS_ENQUIRY = {
  service: "CRM & Sub-account Setup",
  eyebrow: "Get started",
  title: "Tell us how you actually sell",
  lede:
    "Describe your sales process and what you are running on today. We will come back with the structure we would build, what migrates, and what it would take.",
  points: [
    "A structure recommendation before you commit to anything",
    "An honest view on repairing an existing account versus rebuilding",
    "No obligation, and no retainer to sign before you see the plan",
  ],
};

export const CS_CLOSING = {
  eyebrow: "Next step",
  title: "Start With the Blueprint, Not the Build",
  lede:
    "A twenty-minute call is enough to map your sales process and tell you what a properly structured account would look like. No deck, no obligation.",
  primary: { label: "Get Free Consultation", to: "/book", icon: "arrowRight" },
  secondary: { label: "Send a message instead", to: "/contact" },
};
