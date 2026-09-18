/**
 * /services/ai-agents-chatbots - all page copy.
 *
 * Kept out of the page component for the same reason homeV2.jsx and
 * servicesV2.jsx are: the page is long enough that inlining the copy turns
 * it into a wall of strings with the structure buried inside. Section order
 * here mirrors the order the page renders them in, which is the order the
 * CRM & Sub-account Setup page established:
 *
 *   hero overview -> the overview and what the four offerings are -> what's
 *   included -> how it works (journey, phases, a proof panel per phase,
 *   plus the routing diagram) -> who we work with (and the representative
 *   setups) -> why GHLevelUp -> FAQ -> client reviews -> closing CTA with
 *   the contact details -> enquiry form -> related services.
 *
 * The ORDER is shared with that page; none of the LAYOUT is. The AI page is
 * built in its own visual language (a console/signal-desk one - channel
 * spine, readout panels, transcript mocks) out of its own stylesheet,
 * styles/service-ai-agents.css, and uses no cs- class from the CRM page.
 *
 * This page covers the whole conversational-AI offer - voice receptionist,
 * conversational AI over chat, the website widget and social/SMS DMs - as
 * four named offerings rather than four separate thin pages, because a
 * business shopping for "something to answer the phone" does not yet know
 * which of those four it wants and should not have to guess from the nav.
 *
 * TWO RULES THIS FILE FOLLOWS, deliberately:
 *
 * 1. NO INVENTED CLIENT CLAIMS. There are no client names, logos,
 *    testimonials or outcome percentages anywhere below. AI_WORK describes
 *    REPRESENTATIVE builds - the shape of work of this kind - and says so
 *    in its own on-page label. When real, signed-off case studies exist,
 *    replace AI_WORK.items with them (add `client`, and real figures) and
 *    change AI_WORK.note; nothing else needs to move.
 *
 * 2. NO INVENTED METRICS. Every number that appears is either a product
 *    fact that is true by construction (how many channels one agent
 *    covers, how many languages ship as standard) or a delivery estimate
 *    we already quote elsewhere on the site (1-2 weeks to live). There is
 *    no "98% satisfaction" anywhere, because nobody has measured it.
 *
 * ASSETS - provenance, so these can be re-sourced or replaced knowingly:
 *   /img/services/ai-receptionist.jpg|webp
 *     Pexels #3767421 (Pexels license - free for commercial use, no
 *     attribution required). Smiling woman mid phone call, headphones round
 *     her neck, plain light background. Cropped to 4/5 at 880x1100.
 *   /img/services/desk.jpg|webp
 *     Pexels #34803974 (same license). Reused from /services for the
 *     process section rather than shipping a second near-identical photo.
 */

/* -- 1. Hero --------------------------------------------------------------- */

export const AI_HERO = {
  crumb: "AI Agents & Chatbots",
  eyebrow: "AI agents & chatbots",
  titleLead: "Never miss another",
  titleAccent: "call, chat or lead.",
  lede:
    "A voice and chat agent that answers in seconds, at any hour, in English or Spanish - qualifies the caller, books the appointment into your real calendar, and hands off to a person the moment it should.",

  primary: { label: "Get this service", to: "#enquiry", icon: "arrowRight" },
  secondary: { label: "Hear how it works", href: "#how-it-works" },

  /* The hero's visual: the four doors one agent answers, each showing the
     state it hands on, funnelling into the single contact record they all
     write to. Statuses are process states, not performance figures - see
     rule 2 at the top of this file. */
  spine: {
    caption: "One agent, every door",
    channels: [
      { icon: "phone", label: "Voice call", note: "Your main line, or a number of its own", status: "Answered" },
      { icon: "message", label: "Text & SMS", note: "A missed call becomes a conversation", status: "Replied" },
      { icon: "chatWindow", label: "Website chat", note: "On the pages where people hesitate", status: "Qualified" },
      { icon: "megaphone", label: "Social DMs", note: "Instagram, Facebook and WhatsApp", status: "Booked" },
    ],
    record: {
      icon: "layers",
      label: "One contact record",
      note: "Transcript, recording and outcome land on the same contact in your CRM",
    },
  },
};

/* -- 2. Intro: what this actually is -------------------------------------- */

export const AI_INTRO = {
  eyebrow: "Overview",
  title: "What an AI agent actually is",
  body: [
    "An AI agent is not a phone tree with better wording, and it is not a chatbot that answers three scripted questions before asking someone to email you. It is a trained receptionist that happens to be software: it knows your services, your opening hours, your prices and the handful of exceptions that matter, and it holds a normal conversation about them.",
    "It works the way a good front-desk hire works. It answers on the first ring, asks the questions you would ask, checks the calendar you actually use, books the slot, and sends the confirmation. When a caller wants something it should not decide on its own - a complaint, a quote that needs judgement, a genuine emergency - it stops and puts a person in the loop instead of guessing.",
    "The reason businesses buy it is simpler than the technology suggests: most missed calls are never called back, and most enquiries go to whoever replies first. An agent that answers at 8:42pm on a Tuesday is not a novelty - it is the difference between a booked job and a lead that quietly went to a competitor.",
  ],

  /* The line worth remembering, pulled out of the prose beside it rather
     than repeated as a fourth paragraph. */
  quote: {
    text: "A missed call is not a missed call. It is a customer who rang someone else thirty seconds later.",
    attribution: "Which is the whole argument for answering at 8:42pm - not the technology, just who picks up first.",
  },

  /* Product facts, not performance claims. See rule 2 at the top. */
  facts: [
    { num: "4", label: "Channels one agent covers", sub: "Phone, SMS, web chat and social DMs" },
    { num: "2", label: "Languages as standard", sub: "English and Spanish, more on request" },
    { num: "24/7", label: "Hours it is available", sub: "Including nights, weekends and holidays" },
    { num: "1-2 wks", label: "Typical time to live", sub: "Configured, tested, then walked through" },
  ],
};

/* -- 3. The four offerings ------------------------------------------------- */

export const AI_OFFERINGS = {
  eyebrow: "What we build",
  title: "Four ways it answers",
  lede:
    "Most businesses start with one of these and add the others once they trust it. They share one brain, one calendar and one inbox, so a caller who texts back the next day is not starting over.",

  items: [
    {
      icon: "phone",
      name: "Voice AI receptionist",
      tag: "Phone calls",
      body:
        "A dedicated local number answered live, in a natural voice, with no hold music and no menu tree. It greets the caller, works out what they need, answers from what it knows about your business, and books or transfers.",
      points: [
        "Answers on the first ring, every time",
        "Rings your team first and only steps in if nobody picks up",
        "Warm transfer to a person, with context, when it should",
        "Full transcript and recording on the contact record",
      ],
    },
    {
      icon: "brain",
      name: "Conversational AI",
      tag: "The brain behind it",
      body:
        "The layer that makes the difference between a script and a conversation. It tracks what has already been said, handles interruptions and changes of mind, and knows the difference between a new enquiry and an existing customer chasing an update.",
      points: [
        "Understands intent, not just keywords",
        "Remembers context across the whole conversation",
        "Trained on your services, pricing answers and exceptions",
        "Says honestly when it does not know, instead of guessing",
      ],
    },
    {
      icon: "chatWindow",
      name: "Website chat widget",
      tag: "On your site",
      body:
        "A widget that answers the question instead of collecting a form nobody reads. It carries your branding, greets differently on different pages, and can book straight from the chat window.",
      points: [
        "Answers pricing and availability questions directly",
        "Books appointments without leaving the chat",
        "Different opening line per page, if useful",
        "Hands the thread to a human in office hours",
      ],
    },
    {
      icon: "message",
      name: "SMS & social DMs",
      tag: "Text and social",
      body:
        "The same agent on text, WhatsApp, Instagram and Facebook. A missed call turns into a text conversation automatically, so the enquiry continues instead of going cold.",
      points: [
        "Missed-call-to-text, sent within seconds",
        "Instagram, Facebook and WhatsApp in one inbox",
        "Two-way texting your team can take over any time",
        "Consent and opt-out handled properly",
      ],
    },
  ],
};

/* -- 4. How it works ------------------------------------------------------- */

export const AI_FLOW = {
  eyebrow: "How it works",
  title: "One path, decided the moment a call arrives",
  lede:
    "Nothing in this flow guesses at something it cannot know yet. The first question is always what time it is right now, and everything after that follows from the answer - which is why it behaves the same way on a Tuesday morning as it does at midnight.",

  /* The delivery journey - how long the build itself takes, not the flow a
     call follows. The same indicative timings quoted on the other service
     pages; the FAQ says they are not a guarantee. */
  journey: [
    { label: "Discovery", when: "Day 1" },
    { label: "Build & train", when: "Days 2-6" },
    { label: "Test calls", when: "Week 2" },
    { label: "Live", when: "Week 2, on sign-off" },
  ],

  /* The flow itself. Each phase carries three things beyond its prose: the
     artefact it produces (`deliverable`), and a `proof` panel - a coded
     mock of the thing that artefact looks like, so the section shows the
     work rather than claiming it. `proof.kind` selects which mock the page
     renders; the mocks are the AI page's own (transcript, readout, chips,
     checks), not the CRM page's set. */
  steps: [
    {
      num: "01",
      icon: "phone",
      title: "Contact arrives",
      body: "A call, text, web chat or DM reaches your number or widget. The same agent picks up whichever it is.",
      deliverable: "One number, one widget, one inbox",
      proof: {
        kind: "status",
        caption: "Channels live",
        rows: [
          { label: "Main number answered by voice", state: "done" },
          { label: "Missed-call-to-text armed", state: "done" },
          { label: "Website chat widget online", state: "done" },
          { label: "Social DMs connected", state: "done" },
        ],
      },
    },
    {
      num: "02",
      icon: "clock",
      title: "Business hours are checked",
      body: "In hours, it can ring your team first and wait. Out of hours, it handles the conversation itself rather than sending anyone to voicemail.",
      deliverable: "Your hours, holidays and exceptions loaded",
      proof: {
        kind: "record",
        caption: "Routing rules",
        rows: [
          { label: "In hours", value: "Ring your team first, 15s wait" },
          { label: "Out of hours", value: "Handled end to end by the agent" },
          { label: "Weekends", value: "Covered, same rules" },
          { label: "Holidays", value: "Your own override list" },
        ],
      },
    },
    {
      num: "03",
      icon: "brain",
      title: "Intent is established",
      body: "New enquiry, existing customer, a quick question or something urgent. It works out which before it decides what to say.",
      deliverable: "An approved intent map",
      proof: {
        kind: "transcript",
        caption: "Live, 8:42pm",
        lines: [
          { from: "them", text: "Hi, are you open tomorrow? I need to come in." },
          { from: "us", text: "We are - I have 10:00am or 2:30pm free. Which suits you better?" },
          { from: "note", text: "Intent: new booking · existing customer: no" },
          { from: "them", text: "2:30 works" },
        ],
      },
    },
    {
      num: "04",
      icon: "shieldCheck",
      title: "Qualified or answered",
      body: "It asks the questions your front desk would ask, or answers directly from what it knows about your services and pricing.",
      deliverable: "Your qualifying questions, in your words",
      proof: {
        kind: "checks",
        caption: "Configured behaviour",
        items: [
          "Asks what the job is before offering a slot",
          "Answers pricing from your own approved list",
          "Says plainly when it does not know",
          "Never invents a price, a time or a promise",
        ],
      },
    },
    {
      num: "05",
      icon: "calendar",
      title: "Booked, or handed to a person",
      body: "A confirmed slot on your real calendar and a confirmation text - or a clean transfer with context attached. Never left hanging.",
      deliverable: "A confirmed appointment, or a warm transfer",
      proof: {
        kind: "record",
        caption: "Outcome of the call above",
        rows: [
          { label: "Slot", value: "Tomorrow, 2:30pm - genuinely open" },
          { label: "Calendar", value: "The one your team already uses" },
          { label: "Confirmation", value: "Text and email, sent during the call" },
          { label: "Escalation", value: "Complaints and emergencies to a person" },
        ],
      },
    },
    {
      num: "06",
      icon: "layers",
      title: "Logged and followed up",
      body: "Transcript, recording and outcome land on the contact in your CRM, and any follow-up you have configured queues behind it.",
      deliverable: "The record, and the follow-up it triggers",
      proof: {
        kind: "record",
        caption: "Written to the contact",
        rows: [
          { label: "Transcript", value: "Attached to the contact record" },
          { label: "Recording", value: "Kept to your retention policy" },
          { label: "Pipeline", value: "Stage moved to Booked" },
          { label: "Follow-up", value: "Reminder queued automatically" },
        ],
      },
    },
  ],

  /* The routing decision, drawn beside the steps. Deliberately NOT a stock
     photo: this section is about the choice the system makes, and the
     diagram is that choice. Kept as data so the labels stay with the copy
     they have to agree with. */
  diagram: {
    caption: "How one call is routed",
    start: "Call, text or chat arrives",
    ask: "In business hours?",
    branches: [
      { tag: "Yes", nodes: ["Your team rings first", "No answer? AI steps in"] },
      { tag: "No", nodes: ["AI answers straight away", "In your tone of voice"] },
    ],
    end: "Booked, or transferred with context",
  },
};

/* -- 5. The detail ---------------------------------------------------------- */

export const AI_DETAILS = {
  eyebrow: "The detail",
  title: "What's actually included",
  lede:
    "The parts that decide whether an agent is genuinely useful or merely present. All of it is configured before you go live, and none of it is an add-on.",

  groups: [
    {
      icon: "sliders",
      title: "Configured to your business",
      items: [
        "Your services, durations and prices, with the answers you would give",
        "Opening hours, holidays and the exceptions that override them",
        "Greeting and tone of voice, reviewed by you before launch",
        "The questions worth asking before a booking is allowed",
      ],
    },
    {
      icon: "calendar",
      title: "Booking that actually books",
      items: [
        "Live availability from the calendar your team already uses",
        "Only genuinely open slots offered - no double bookings",
        "Confirmation by text and email the moment it is booked",
        "Reschedules and cancellations handled in conversation",
      ],
    },
    {
      icon: "usersTwo",
      title: "Handoff rules you control",
      items: [
        "Ring your team first, with a configurable wait before it steps in",
        "Named topics that always go to a person - complaints, emergencies",
        "Warm transfer that passes the context, not a cold restart",
        "Out-of-hours messages queued and surfaced first thing",
      ],
    },
    {
      icon: "shieldCheck",
      title: "Compliance and records",
      items: [
        "A2P 10DLC registration filed for messaging, properly",
        "Recording and transcript retention set to your policy",
        "Consent captured and opt-outs honoured automatically",
        "Every conversation written to the contact record in your CRM",
      ],
    },
  ],
};

/* -- 6. Who it is for ------------------------------------------------------ */

export const AI_USECASES = {
  eyebrow: "Who it's for",
  title: "Where it earns its keep fastest",
  lede:
    "The pattern is the same everywhere: a phone that rings while the team is busy doing the actual work, and enquiries that go to whoever answers first.",

  items: [
    {
      icon: "fileCheck",
      title: "Tax & accounting practices",
      body: "Filing season doubles the call volume overnight. The agent handles intake questions and document chasing while the team prepares returns.",
    },
    {
      icon: "truck",
      title: "Trades & home services",
      body: "Nobody answers the phone from a roof or under a sink. Calls get booked into the diary instead of going to voicemail and then to a competitor.",
    },
    {
      icon: "heart",
      title: "Clinics & practices",
      body: "Appointment booking, rescheduling and the same five questions, handled in two languages without tying up the front desk.",
    },
    {
      icon: "house",
      title: "Real estate & brokers",
      body: "Speed-to-lead decides who gets the listing appointment. It replies in seconds at 9pm, then books the viewing.",
    },
    {
      icon: "wallet",
      title: "Insurance & financial advice",
      body: "Quote requests qualified before they reach an adviser, and renewal reminders that actually go out on time.",
    },
    {
      icon: "graduationCap",
      title: "Agencies reselling it",
      body: "The same build white-labelled under your brand, in your own sub-account, for your clients to use as their own.",
    },
  ],
};

/* -- 7. Representative work ------------------------------------------------ */

/**
 * NOT case studies. See rule 1 at the top of this file: these describe the
 * SHAPE of a build of this kind, so a reader can recognise their own
 * situation, without attaching a client name or an outcome figure to
 * anything that has not been measured and signed off. The on-page label
 * says exactly that, so nobody mistakes it for proof.
 */
export const AI_WORK = {
  eyebrow: "What a build looks like",
  title: "Three representative setups",
  lede:
    "Every build starts from the same question: where are enquiries being lost today? These are the three answers we hear most, and what gets configured for each.",
  note:
    "These describe the shape of work of this kind, not named client engagements - we do not publish client details or performance figures without written sign-off.",

  items: [
    {
      tag: "After-hours cover",
      title: "The phone stops going to voicemail",
      problem: "Calls after 5pm and at weekends went to voicemail, and roughly none of them were returned.",
      built: [
        "Voice agent live on the main number outside office hours",
        "Missed-call-to-text so the conversation continues if they hang up",
        "Booking straight into the shared calendar, with confirmation texts",
      ],
      outcome: "Out-of-hours enquiries arrive as booked appointments instead of a voicemail list nobody works through.",
    },
    {
      tag: "Front-desk relief",
      title: "The same five questions, answered without interrupting anyone",
      problem: "The front desk spent most of the day on opening hours, pricing and 'has my paperwork arrived yet'.",
      built: [
        "Agent rings the team first, steps in only when nobody picks up",
        "Trained on the FAQ set that made up most of the call volume",
        "Named topics - complaints, anything urgent - always routed to a person",
      ],
      outcome: "The routine calls are handled in conversation; the team's phone only rings for things that need them.",
    },
    {
      tag: "Speed-to-lead",
      title: "Web enquiries answered before they go cold",
      problem: "Form submissions sat unread for hours, and the leads had already booked with whoever replied first.",
      built: [
        "Chat widget that answers and books without a form",
        "Instant reply on SMS and social DMs from the same agent",
        "Follow-up sequence for anyone who starts and does not finish",
      ],
      outcome: "Enquiries get a real answer in seconds, at whatever hour they arrive, on the channel they used.",
    },
  ],
};

/* -- 8. Benefits ----------------------------------------------------------- */

export const AI_BENEFITS = {
  eyebrow: "The results",
  title: "Why businesses put this on their main number",
  lede: "Six things change the week it goes live.",

  items: [
    { icon: "clock", title: "Round-the-clock cover", body: "Every enquiry is answered the moment it arrives, including the ones at 2am and on public holidays." },
    { icon: "trendUp", title: "More booked work", body: "Speed-to-lead decides most enquiries, and it replies in seconds rather than the next working day." },
    { icon: "usersTwo", title: "A better first impression", body: "Callers reach a conversation instead of a beep, which is the whole of their first impression of you." },
    { icon: "wallet", title: "Lower cost to cover", body: "Out-of-hours coverage without out-of-hours wages, and no agency answering-service per-minute billing." },
    { icon: "layers", title: "Scales with demand", body: "Twenty simultaneous callers is the same as one - useful when a campaign lands or the season turns." },
    { icon: "barChart", title: "Visible in your CRM", body: "Every call, text and chat logged against the contact, so nothing depends on who remembers what." },
  ],
};

/* -- 9. Closing CTA + contact --------------------------------------------- */

/**
 * The page's own closing block - the CTA pair and the contact details the
 * /contact page lists. This is the one place on the page that asks for the
 * work: the FAQ used to carry its own contact card, which competed with
 * both this and the enquiry form at the foot of the page.
 */
export const AI_CLOSING = {
  eyebrow: "Let's talk",
  title: "Put it on the number that rings most",
  lede:
    "Tell us what you keep missing - the calls after five, the texts at the weekend, the questions that eat the front desk's morning - and we will tell you exactly what the agent would answer, what it would book and where it would hand off, then quote it.",
  primary: { label: "Get Free Consultation", to: "/book", icon: "arrowRight" },
  secondary: { label: "Send us a message", to: "/contact" },
};

/* -- 10. Enquiry form ------------------------------------------------------ */

export const AI_ENQUIRY = {
  service: "AI Agents & Chatbots",
  eyebrow: "Get started",
  title: "Tell us what you keep missing",
  lede:
    "Send us the specifics - the calls you miss, the hours nobody covers, the questions that eat the day - and we'll come back with what your agent would answer, what it would book, and what it costs.",
  points: [
    "A straight answer on whether this fits your business",
    "Real numbers, not a per-minute estimate",
    "No obligation, and no retainer to sign before you see the plan",
  ],
};

/* -- 11. FAQ --------------------------------------------------------------- */

export const AI_FAQ = {
  eyebrow: "FAQ",
  title: "Frequently Asked Questions",
  lede: "The things businesses actually ask before putting an AI agent on their main number.",

  items: [
    {
      question: "Does it sound robotic?",
      answer:
        "No - it holds a real conversation, not a phone tree. It handles interruptions, follow-up questions and the caller changing their mind, and it hands off to a person the moment a conversation needs one.",
    },
    {
      question: "Does this replace my front desk during business hours?",
      answer:
        "Only if you want it to. The normal setup rings your team first and lets the AI step in when nobody picks up; after hours and at weekends it handles everything itself, so nothing reaches voicemail.",
    },
    {
      question: "Can it actually book, or does it just take messages?",
      answer:
        "It books in real time against your live calendar, offers only slots that are genuinely open, and sends a confirmation text - the same outcome as if your receptionist had answered.",
    },
    {
      question: "What if someone asks something it doesn't know?",
      answer:
        "It says so plainly and either takes a message or transfers to a person. It is configured not to guess, because a confident wrong answer costs more than an honest handoff.",
    },
    {
      question: "Will callers know they're talking to an AI?",
      answer:
        "That is your call, and we will advise on it. Most businesses have it introduce itself as a virtual assistant - it sets expectations honestly and, in practice, callers mind far less than people expect once it actually answers their question.",
    },
    {
      question: "Does it work on WhatsApp and Instagram too?",
      answer:
        "Yes. The same agent covers phone, SMS, website chat, WhatsApp, Instagram and Facebook, and every channel writes to the same thread on the contact, so a caller who texts back the next day is not starting over.",
    },
    {
      question: "Can you integrate it with the tools we already use?",
      answer:
        "Yes - it is built on GoHighLevel and connects to your calendar, your number and the tools you already run on. If something needs a custom connection, we build that too.",
    },
    {
      question: "How long until it's live?",
      answer:
        "Most businesses are live inside one to two weeks. We configure your services, hours, call flow and handoff rules first, then walk you through it on a call before it takes a single real conversation.",
    },
    {
      question: "What does it cost?",
      answer:
        "A flat monthly fee for the build and support, with telephony and AI usage billed to your own payment method at cost - never pooled with another business's, never marked up. You get real numbers on the first call.",
    },
  ],

};
