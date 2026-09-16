/**
 * /services/workflow-automation - all page copy.
 *
 * Kept out of the page component for the same reason servicesV2.jsx and
 * serviceAiAgents.jsx are: the page is long enough that inlining the copy
 * turns it into a wall of strings with the structure buried inside. Section
 * order here mirrors the order the page renders them in.
 *
 * NO INVENTED NUMBERS. The flow section below prints times, and those are
 * the timings this page's build actually configures and tests against - not
 * a claimed average across clients. Nothing here counts clients, revenue or
 * hours saved, because those are claims only the business can make.
 *
 * ASSETS - provenance, so these can be re-sourced or replaced knowingly:
 *   /img/services/workflow-board.jpg|webp
 *     Pexels #7580842 (same license). A whiteboard of sticky notes sorted
 *     into to do, in progress and done. 1240x930, used by the flow section,
 *     where the three columns are the point.
 */

/* -- 1. Hero --------------------------------------------------------------- */

export const WF_HERO = {
  eyebrow: "Workflow automation",
  titleLead: "Set it up once.",
  titleAccent: "It runs the same way every time.",
  lede:
    "Every hand-off your team does by hand today, from the first enquiry to the invoice that follows it, becomes an automation that fires on time, records what it did, and asks for a person only when a person is genuinely needed.",

  primary: { label: "Get Free Consultation", to: "/book", icon: "arrowRight" },
  /* Fragment link down to the capability grid, offset by
     html { scroll-padding-top } in legacy/styles.css. */
  secondary: { label: "See What We Automate", href: "#capabilities" },

};

/* -- 2. The honest comparison --------------------------------------------- */

export const WF_COMPARE = {
  eyebrow: "The honest comparison",
  title: "The work that eats your week, and what replaces it",
  lede:
    "Automation is not a metaphor and it is not a chatbot answering for you. It is the specific list of steps below, moved out of someone's head and into the system, where the timing no longer depends on how busy Tuesday was.",

  columns: { before: "Done by hand today", after: "Running in the system" },

  rows: [
    {
      before: "Someone re-types the enquiry into a spreadsheet",
      after: "The form writes straight to the CRM, tagged by source and assigned by rule",
    },
    {
      before: "Quotes go out when somebody gets to them",
      after: "The quote leaves in minutes, with the follow-up already scheduled behind it",
    },
    {
      before: "Reminders depend on memory",
      after: "Every no-reply gets its next step on a timer, whether or not anyone remembers",
    },
    {
      before: "New staff learn the process by watching someone else do it",
      after: "The process runs in the background, and the queue shows them what to do next",
    },
    {
      before: "Nobody can say where a lead stalled",
      after: "The pipeline shows the last action, the next one, and who owns it",
    },
  ],

  cta: { label: "Get Free Consultation", to: "/book" },
  note: "Out of your week, into the system",
};

/* -- 3. What we automate -------------------------------------------------- */

export const WF_GRID = {
  eyebrow: "What we automate",
  title: "The Hand-Offs Worth Building",
  subtitle: "Six places the repeat work hides in most growing businesses.",
  lede:
    "We build the ones that pay for themselves first, then keep going. Nothing is automated just because it can be: anything that needs judgement on every run stays with a person, with the system making sure the person knows about it.",

  items: [
    {
      icon: "target",
      title: "Lead capture and routing",
      body: "Forms, calls, chat and social messages land in one pipeline, tagged by source and sent to the right person by service, area or value.",
    },
    {
      icon: "clock",
      title: "Follow-up sequences",
      body: "The first reply goes out inside seconds, and the next touches are scheduled without anyone having to keep a list.",
    },
    {
      icon: "file",
      title: "Quotes and documents",
      body: "Templates that merge the client's own details, go out for signature, and file themselves against the record when they come back.",
    },
    {
      icon: "sliders",
      title: "Internal hand-offs",
      body: "The moment a deal moves stage, the next task is created for the right person with a deadline attached to it.",
    },
    {
      icon: "calendar",
      title: "Appointment setting",
      body: "Availability, confirmations and reschedules handled between your calendar and the CRM, with the lead told what to expect.",
    },
    {
      icon: "bolt",
      title: "Alerts and exceptions",
      body: "A notification when something stalls, fails or needs a decision, so the things that go wrong are the things you hear about first.",
    },
  ],

  cta: { label: "Get Free Consultation", to: "/book" },
};

/* -- 4. One lead, start to finish ----------------------------------------- */

export const WF_FLOW = {
  eyebrow: "One lead, start to finish",
  title: "See the Whole Hand-Off Run",
  lede:
    "A representative run from a build of this kind. Each step leaves a record on the contact, so the timeline you see here is the same timeline your team sees on the day.",

  image: "/img/services/workflow-board.jpg",
  imageWebp: "/img/services/workflow-board.webp",
  imageAlt: "A whiteboard of sticky notes sorted into to do, in progress and done columns",
  /* The clock times are the ones this build is configured against. */
  steps: [
    {
      time: "08:41",
      title: "Enquiry arrives",
      body: "A form is submitted. The record is created in the pipeline with its source attached to it.",
    },
    {
      time: "08:41",
      title: "Owner assigned",
      body: "Routing rules pick the right person by service and location, and a task lands in their queue.",
    },
    {
      time: "08:42",
      title: "Reply sent",
      body: "The confirmation text and email go out, carrying the next available appointment times.",
    },
    {
      time: "Day 2",
      title: "Follow-up fires",
      body: "No reply yet, so the second touch goes out and the reminder queues behind it.",
    },
    {
      time: "Day 3",
      title: "Call booked",
      body: "The lead books from the link in the message, and the calendar writes the booking back to the pipeline.",
    },
  ],

  caption: "Every step runs to a column, and nothing sits in the middle without an owner",

  cta: { label: "Talk Through Your Workflow", to: "/book", icon: "arrowRight" },
};

/* -- 5. How we build it --------------------------------------------------- */

export const WF_PROCESS = {
  eyebrow: "Our process",
  title: "How We Build It",
  lede:
    "Same order every time, so nothing gets automated before it is understood, and nothing goes live before we have run the awkward paths ourselves.",

  steps: [
    {
      num: "01",
      icon: "search",
      title: "Audit the manual work",
      body: "We sit with your team, write down what happens today, and mark the steps nobody should be doing.",
    },
    {
      num: "02",
      icon: "layers",
      title: "Map it in the system",
      body: "Each step becomes a stage, a task or an automation, and you approve the map before we build any of it.",
    },
    {
      num: "03",
      icon: "sliders",
      title: "Build and connect",
      body: "Sequences, forms, calendars and the CRM wired together, with the exceptions handled rather than skipped.",
    },
    {
      num: "04",
      icon: "shieldCheck",
      title: "Test the awkward paths",
      body: "Duplicate enquiries, out of hours bookings, leads that go quiet: we run those ourselves before launch.",
    },
    {
      num: "05",
      icon: "usersTwo",
      title: "Hand over and keep tuning",
      body: "A walkthrough at launch, then ongoing changes as your services, hours or pricing move.",
    },
  ],

  cta: { label: "Get Free Consultation", to: "/book" },
};

/* -- 6. FAQ + contact card ------------------------------------------------ */

export const WF_FAQ = {
  eyebrow: "FAQ",
  title: "Questions About Automation",
  lede: "The things businesses ask before they hand the repeat work to a system.",

  items: [
    {
      question: "Which workflow should we automate first?",
      answer:
        "Usually the one that touches money: speed to first reply, quote follow-up, or appointment reminders. We build that one, watch it run for a week, then move to the next. Automating everything at once makes it hard to tell what is working.",
    },
    {
      question: "Will this replace my team?",
      answer:
        "No. It removes the steps that do not need a person, and it makes sure the steps that do need one arrive with the context attached. In practice the team spends more time on the conversations and less on the copying.",
    },
    {
      question: "What happens when an automation fails?",
      answer:
        "Every run is logged, and the important ones carry an alert. When something fails, a task is created with the details rather than the lead quietly disappearing, which is the failure mode of doing this by hand.",
    },
    {
      question: "Does it work with the tools we already use?",
      answer:
        "In almost every case. Your calendar, telephony, payment and booking tools all connect, and where there is no ready made link we build one through the API rather than asking you to change tools.",
    },
    {
      question: "How much of this can we run ourselves afterwards?",
      answer:
        "You get a walkthrough at launch and a written map of what runs where. Some clients then manage their own sequences; others have us keep tuning them. Both are fine, and neither requires a new contract.",
    },
  ],

  card: {
    eyebrow: "Let's talk",
    title: "Which hand-off is costing you the most time?",
    body: "Tell us how the work moves through your business today. We will say which parts are worth automating, which are not, and what it would take.",
    cta: { label: "Get Free Consultation", to: "/book", icon: "arrowRight" },
  },
};

/* -- 7. Intro: what this actually is -------------------------------------- */

export const WF_INTRO = {
  eyebrow: "The short version",
  title: "What workflow automation actually is",
  quote: {
    text: "Most businesses do not have a process problem. They have a process that only exists in one person's head.",
    attribution: "Automation is that process written down somewhere it will run whether or not anyone remembers it.",
  },
  body: [
    "Workflow automation is the unglamorous work of taking the hand-offs your team currently does by hand - re-typing an enquiry, remembering to chase a quote, telling the office that someone has paid - and making them happen on their own, on time, every time.",
    "It is not a robot doing somebody's job. It is the ten-second tasks between the real work: the copy-paste, the reminder, the status update, the internal message that tells the next person they can start. Individually none of them matter. Together they are most of a week, and they are the first things dropped when the week gets busy.",
    "The test of a good automation is that nobody notices it. The enquiry is already assigned when the owner opens their phone. The reminder went out on Saturday. The invoice chased itself twice before anyone would have thought to look. What you feel is not the software - it is the absence of the thing that used to go wrong.",
  ],
  facts: [
    { num: "1", label: "Place the process lives", sub: "Not in someone's memory or a sticky note" },
    { num: "24/7", label: "When automations run", sub: "Including the weekend you are not working" },
    { num: "Every", label: "Run that leaves a record", sub: "What fired, when, and what it decided" },
    { num: "1-2 wks", label: "Typical time to live", sub: "Mapped, built, tested, then handed over" },
  ],
};

/* -- 8. The detail --------------------------------------------------------- */

export const WF_DETAILS = {
  eyebrow: "The detail",
  title: "What's actually included",
  lede:
    "The parts that decide whether an automation survives contact with a real week. All of it is configured before you go live, and none of it is an add-on.",
  groups: [
    {
      icon: "sliders",
      title: "Mapped to how you work",
      items: [
        "Your real stages, named the way your team already names them",
        "Routing rules by service, location, value or owner",
        "The exceptions that override the happy path, written down",
        "Working hours respected, so nothing fires at 3am",
      ],
    },
    {
      icon: "bolt",
      title: "Triggers and timing",
      items: [
        "A form, call, text, payment or stage change as the trigger",
        "Delays measured in minutes, hours or working days",
        "Follow-up that stops the moment someone replies",
        "Re-entry rules, so nobody gets the same sequence twice",
      ],
    },
    {
      icon: "shieldCheck",
      title: "When something goes wrong",
      items: [
        "Retries on transient failures rather than a silent drop",
        "A named person alerted when a run genuinely fails",
        "Every run logged with what it did and what it decided",
        "A manual override on anything that can be forced by hand",
      ],
    },
    {
      icon: "usersTwo",
      title: "Handover and ownership",
      items: [
        "A walkthrough recording of every automation we built",
        "Plain-language documentation of what fires and when",
        "Your team able to pause or edit without calling us",
        "The same team on support afterwards, not a ticket queue",
      ],
    },
  ],
};

/* -- 9. Who it is for ------------------------------------------------------ */

export const WF_USECASES = {
  eyebrow: "Who it's for",
  title: "Where it pays for itself fastest",
  lede:
    "The pattern is always the same: a job that only moves when somebody remembers to move it, repeated a few hundred times a month.",
  items: [
    { icon: "fileCheck", title: "Tax & accounting", body: "Document chasing, engagement letters and deadline reminders that run per client without anyone keeping the list." },
    { icon: "truck", title: "Trades & field service", body: "Job confirmations, on-the-way texts and post-visit review requests, fired by the stage change rather than from the van." },
    { icon: "heart", title: "Clinics & practices", body: "Intake forms, appointment reminders and recall sequences that cut no-shows without adding front-desk work." },
    { icon: "house", title: "Real estate", body: "Enquiry routing by area, viewing follow-up, and nurture for the buyers who are six months out." },
    { icon: "cart", title: "eCommerce & retail", body: "Abandoned checkout recovery, post-purchase sequences and win-back campaigns on a schedule you set once." },
    { icon: "graduationCap", title: "Agencies", body: "Client onboarding, reporting cadence and internal hand-offs, built once and cloned per account." },
  ],
};

/* -- 10. Representative work ---------------------------------------------- */

export const WF_WORK = {
  eyebrow: "What a build looks like",
  title: "Three representative builds",
  lede:
    "Every build starts with the same question: which hand-off breaks when the week gets busy? These are the three answers we hear most.",
  note:
    "These describe the shape of work of this kind, not named client engagements - we do not publish client details or performance figures without written sign-off.",
  items: [
    {
      tag: "Lead routing",
      title: "Enquiries stop sitting in an inbox",
      problem: "Web enquiries landed in a shared inbox and got picked up whenever somebody happened to look.",
      built: [
        "Form and call capture writing straight to the pipeline with its source",
        "Routing by service and area to the right owner, with a task attached",
        "Instant acknowledgement to the enquirer carrying next available times",
      ],
      outcome: "Enquiries are owned within a minute of arriving, and the source of every one of them is attached to the record.",
    },
    {
      tag: "Follow-up",
      title: "Quotes chase themselves",
      problem: "Quotes went out and then depended on somebody remembering to follow them up twice.",
      built: [
        "A three-touch sequence across eight working days after a quote is sent",
        "The sequence stops dead the moment the client replies or books",
        "A task to the owner if the third touch also goes unanswered",
      ],
      outcome: "Every quote gets the same follow-up, and the ones that go quiet surface as a decision rather than disappearing.",
    },
    {
      tag: "Internal hand-offs",
      title: "The next person knows it is their turn",
      problem: "Work stalled between stages because the hand-off was verbal and sometimes did not happen.",
      built: [
        "Stage changes firing internal notifications with the record attached",
        "A checklist per stage, so nothing advances half-finished",
        "A daily digest of anything sitting in one stage too long",
      ],
      outcome: "Nothing waits on a conversation that never happened, and anything stuck too long is visible the next morning.",
    },
  ],
};

/* -- 11. Benefits ---------------------------------------------------------- */

export const WF_BENEFITS = {
  eyebrow: "The results",
  title: "What changes once it is running",
  lede: "Six things you notice inside the first month.",
  items: [
    { icon: "clock", title: "Hours back per week", body: "The ten-second tasks stop adding up to most of an afternoon." },
    { icon: "trendUp", title: "Fewer dropped leads", body: "Follow-up happens on a timer instead of when someone remembers." },
    { icon: "shieldCheck", title: "Consistency", body: "Every client gets the same process, whoever happens to be on shift." },
    { icon: "usersTwo", title: "Easier onboarding", body: "New staff inherit a process that already runs, not folklore." },
    { icon: "barChart", title: "Visible bottlenecks", body: "You can finally see which stage the work actually stalls in." },
    { icon: "layers", title: "Scales without headcount", body: "Twice the volume does not have to mean twice the admin." },
  ],
};

/* -- 12. Enquiry form ------------------------------------------------------ */

export const WF_ENQUIRY = {
  service: "Workflow Automation",
  eyebrow: "Get started",
  title: "Which hand-off is costing you the most?",
  lede:
    "Tell us how the work moves through your business today. We will come back with which parts are worth automating, which genuinely are not, and what it would take.",
  points: [
    "A straight answer on what is worth automating and what is not",
    "Real numbers, not an hourly estimate",
    "No obligation, and no retainer to sign before you see the plan",
  ],
};
