/**
 * /services/email-sms-campaigns - all page copy.
 *
 * Kept out of the page component for the same reason the other service data
 * files are - see the note atop serviceWebsitesLanding.jsx.
 *
 * NO INVENTED NUMBERS, NO INVENTED CLIENT CLAIMS: same rule as every other
 * service data file. WORK.items describe the shape of engagements of this
 * kind, not named clients or measured open/click rates - see WORK.note.
 */

/* -- 1. Hero ----------------------------------------------------------------- */

export const ES_HERO = {
  eyebrow: "Email & SMS campaigns",
  titleLead: "The follow-up that never",
  titleAccent: "forgets to send itself.",
  lede:
    "Sequences that text and email every lead automatically - so a follow-up never depends on someone remembering to do it at 5pm on a Friday.",

  primary: { label: "Get Free Consultation", to: "/book", icon: "arrowRight" },
  secondary: { label: "See a Sample Sequence", href: "#preview" },

  /* The hero's sample SMS thread and email preview used to live here, for
     two coded mock panels. Both are now in the hero artwork itself - see
     ServiceEmailSmsCampaigns.jsx. The sample sequence further down the
     page (ES_PREVIEW) is unaffected and is still real page copy. */
};

/* -- 2. Intro ----------------------------------------------------------------- */

export const ES_INTRO = {
  eyebrow: "The short version",
  title: "Most leads aren't lost. They're just never followed up.",
  quote: {
    text: "A lead that doesn't hear back in the first hour is, in practical terms, a lead you didn't get.",
    attribution: "Speed is the single biggest factor in whether a lead becomes a customer.",
  },
  body: [
    "The instinct is to blame the lead for going cold. The more common reason is simpler: nobody followed up, or the follow-up happened three days later once someone finally had time. A form fills in, it sits in an inbox, and by the time anyone replies the person has already booked with whoever answered first.",
    "A sequence fixes the timing problem, not the sales problem. The first message goes out within minutes, not whenever someone next checks their inbox. The next few are spaced to answer the objections that actually stop people - price, timing, whether you cover their area - without a human having to draft each one individually.",
    "Text and email work differently, so we run both: SMS for the fast, immediate reply that gets read in minutes; email for the longer message with more to say. Which one leads depends on the enquiry, not a fixed rule.",
  ],
  facts: [
    { num: "Minutes", label: "Time to first reply", sub: "Not hours, not whenever someone checks the inbox" },
    { num: "2", label: "Channels run together", sub: "SMS for speed, email for detail" },
    { num: "Branching", label: "Sequences, not one blast", sub: "What happens next depends on what they do" },
    { num: "CRM-linked", label: "Every reply tracked", sub: "Booked calls and replies land in one pipeline" },
  ],
};

/* -- 3. Channels: SMS vs Email side by side ------------------------------------ */

export const ES_CHANNELS = {
  eyebrow: "Two channels, one sequence",
  title: "SMS and Email Do Different Jobs",
  lede:
    "Neither channel replaces the other. We build the sequence around what each one is actually good at, so a lead gets the right message on the right channel.",
  sms: {
    icon: "phone",
    title: "SMS",
    tagline: "Read in minutes, not hours",
    points: [
      "The fastest way to reach someone who just enquired",
      "Short, direct messages - confirmations, reminders, quick replies",
      "Two-way: a reply comes straight back into your inbox",
      "Best for appointment reminders and time-sensitive follow-up",
    ],
  },
  email: {
    icon: "mail",
    title: "Email",
    tagline: "Room to make the case",
    points: [
      "Space for detail SMS can't carry - pricing, proof, full explanations",
      "Designed to match your brand, not a plain-text blast",
      "Better for nurture sequences that run over days or weeks",
      "Trackable opens and clicks that show what a lead is actually reading",
    ],
  },
};

/* -- 4. Automation flow (branching diagram) ------------------------------------ */

export const ES_FLOW = {
  eyebrow: "How a sequence runs",
  title: "It Branches on What They Actually Do",
  lede:
    "A real sequence isn't one message sent to everyone. It reacts - a reply changes the path, silence changes the path, a booked call ends it.",
  trigger: { icon: "bolt", label: "New lead comes in", sub: "Form, call, chat or DM - any source, one entry point" },
  branches: [
    {
      label: "Replies right away",
      icon: "message",
      steps: ["Instant SMS reply", "Handed to a human to close"],
      outcome: "Booked",
    },
    {
      label: "Goes quiet",
      icon: "clock",
      steps: ["Follow-up SMS at 1 hour", "Value email at day 1", "Check-in text at day 3"],
      outcome: "Re-engaged or booked",
    },
    {
      label: "Opens but doesn't reply",
      icon: "mail",
      steps: ["A second, more specific email", "A direct SMS with a clear next step"],
      outcome: "Booked or nurtured long-term",
    },
  ],
};

/* -- 5. Audience segmentation (tag cluster) ------------------------------------- */

export const ES_SEGMENTS = {
  eyebrow: "Who gets what",
  title: "Not Everyone Gets the Same Message",
  lede:
    "A new lead, a past customer and someone who asked about pricing six months ago don't need the same sequence. We segment the list so each one gets a message that's actually relevant.",
  groups: [
    { tag: "New lead", icon: "sparkle", body: "The speed-first sequence - fast first reply, objection-handling follow-ups." },
    { tag: "Past customer", icon: "star", body: "Re-engagement and repeat-business sequences, not a cold-lead pitch." },
    { tag: "Quoted, no answer", icon: "clock", body: "A shorter, more direct nudge sequence aimed at the specific quote given." },
    { tag: "Booked appointment", icon: "calendar", body: "Reminders and confirmations, not sales messaging." },
    { tag: "No-show", icon: "phoneOff", body: "A dedicated win-back sequence, distinct from a fresh lead's." },
    { tag: "Referral", icon: "usersTwo", body: "A warmer opening message that acknowledges how they found you." },
  ],
};

/* -- 6. Message preview (real drip sequence sample) ----------------------------- */

export const ES_PREVIEW = {
  eyebrow: "What it actually looks like",
  title: "A Sample Five-Day Sequence",
  lede:
    "An illustrative example of the shape a sequence takes - not a live client sequence, and not a guarantee of any particular result.",
  timeline: [
    { when: "Minute 2", channel: "sms", body: "Thanks for reaching out! Quick question so we can help - what's the best time to reach you?" },
    { when: "Hour 1", channel: "email", body: "A full breakdown of what you asked about, with pricing and next steps." },
    { when: "Day 1", channel: "sms", body: "Just checking in - did that email come through okay? Happy to answer anything directly." },
    { when: "Day 3", channel: "email", body: "A short case for why now is a good time to move forward, with a direct booking link." },
    { when: "Day 5", channel: "sms", body: "Last check-in from us for now - here any time you're ready." },
  ],
  note: "Timing and wording are set per sequence based on what you sell and how people actually buy it - this is a sample shape, not a fixed template.",
};

/* -- 7. What's included --------------------------------------------------------- */

export const ES_DETAILS = {
  eyebrow: "The detail",
  title: "What's actually included",
  lede: "The parts of a working sequence that don't show up in a single message.",
  groups: [
    {
      icon: "pen",
      title: "Sequence design",
      items: [
        "Messages written for your business, not a generic template",
        "Branching logic based on replies, opens and silence",
        "Timing set to match how your leads actually decide",
        "A/B tested subject lines and openers where volume supports it",
      ],
    },
    {
      icon: "sliders",
      title: "Setup & compliance",
      items: [
        "A2P 10DLC registration handled for SMS sending",
        "Opt-in and opt-out (STOP/HELP) handled automatically",
        "CAN-SPAM compliant footers and unsubscribe links on every email",
        "Sender reputation and deliverability monitored, not assumed",
      ],
    },
    {
      icon: "target",
      title: "Segmentation",
      items: [
        "Lists split by lead source, status and past behaviour",
        "Different sequences for new leads, past customers and no-shows",
        "Tags updated automatically as a contact's status changes",
        "No single blast sent to an entire, unsegmented list",
      ],
    },
    {
      icon: "lineChart",
      title: "Tracking & reporting",
      items: [
        "Opens, clicks and replies visible in one dashboard",
        "Every reply routed into your CRM, not left in a separate inbox",
        "A monthly summary of what sent, what got replies, what to adjust",
        "Booked calls and closed deals traced back to the sequence that produced them",
      ],
    },
  ],
};

/* -- 8. Who it's for -------------------------------------------------------------- */

export const ES_USECASES = {
  eyebrow: "Who it's for",
  title: "The Six Sequences We're Asked to Build",
  lede: "Different moments in the customer relationship, same underlying job: reply before the window closes.",
  items: [
    { icon: "bolt", title: "New lead speed-to-lead", body: "The first-minutes sequence that answers before a competitor does." },
    { icon: "calendar", title: "Appointment reminders", body: "Confirmations and reminders that cut down on no-shows." },
    { icon: "clock", title: "Quote follow-up", body: "A nudge sequence for the quotes that went quiet." },
    { icon: "usersTwo", title: "Win-back campaigns", body: "Re-engaging past customers who haven't booked in a while." },
    { icon: "star", title: "Review requests", body: "A timed ask for a review once a job is actually finished." },
    { icon: "megaphone", title: "Seasonal & offer campaigns", body: "Announcements sent to the right segment, not the whole list at once." },
  ],
};

/* -- 9. Representative work -------------------------------------------------------- */

export const ES_WORK = {
  eyebrow: "What building a sequence looks like",
  title: "Three representative builds",
  lede: "Each one started with leads going cold in an inbox nobody was checking fast enough.",
  note:
    "These describe the shape of work of this kind, not named client engagements, and no open or click figures are attached to them - we do not publish client details or performance figures without written sign-off.",
  items: [
    {
      tag: "Speed to lead",
      title: "Replies that used to take a day, now take minutes",
      problem: "Web form leads sat in a shared inbox and often weren't answered until the next business day.",
      built: [
        "An instant SMS acknowledgement the moment a form is submitted",
        "A branching follow-up sequence for leads who don't reply right away",
        "Every reply routed straight into the CRM pipeline",
      ],
      outcome: "Leads get a reply within minutes instead of a day later, and nothing sits unanswered in a shared inbox.",
    },
    {
      tag: "No-shows",
      title: "A reminder sequence built to cut no-shows",
      problem: "Booked appointments were confirmed once, with no reminder before the day arrived.",
      built: [
        "A confirmation text sent immediately on booking",
        "A reminder sequence at 24 hours and 2 hours before",
        "An easy reschedule link built into every reminder",
      ],
      outcome: "Appointments get two reminders by default, with a reschedule option that doesn't require a phone call.",
    },
    {
      tag: "Win-back",
      title: "Past customers brought back with one sequence",
      problem: "A list of past customers existed but had never been sent anything beyond the original job confirmation.",
      built: [
        "A segmented win-back sequence separate from the new-lead sequence",
        "A staged email-then-SMS approach over two weeks",
        "A simple offer positioned as a thank-you, not a hard sell",
      ],
      outcome: "A previously untouched list is now on a recurring re-engagement cadence instead of sitting unused.",
    },
  ],
};

/* -- 10. Benefits --------------------------------------------------------------- */

export const ES_BENEFITS = {
  eyebrow: "The results",
  title: "What a working sequence gives you",
  lede: "Six things you can check for yourself once it's live.",
  items: [
    { icon: "bolt", title: "Faster first replies", body: "Sent in minutes, not whenever someone checks the inbox." },
    { icon: "sliders", title: "It branches", body: "A reply changes the path - it isn't one message to everyone." },
    { icon: "target", title: "The right message to the right list", body: "New leads, past customers and no-shows treated differently." },
    { icon: "shieldCheck", title: "Compliant by default", body: "A2P registration, opt-outs and unsubscribes handled properly." },
    { icon: "lineChart", title: "Tracked in one place", body: "Opens, clicks and replies visible, not scattered across tools." },
    { icon: "calendar", title: "Fewer no-shows", body: "Reminder sequences built in, not left to a single confirmation." },
  ],
};

/* -- 11. Enquiry form ------------------------------------------------------------ */

export const ES_ENQUIRY = {
  service: "Email & SMS Campaigns",
  eyebrow: "Get started",
  title: "What's your follow-up missing right now?",
  lede:
    "Tell us how a lead is followed up today - and how long it usually takes. We'll come back with the sequence we'd build and what it would cost.",
  points: [
    "A review of how fast (or slow) your current follow-up actually is",
    "A2P registration and compliance handled as part of the build",
    "No obligation, and no retainer to sign before you see the plan",
  ],
};

/* -- 12. FAQ ---------------------------------------------------------------------- */

export const ES_FAQ = {
  eyebrow: "FAQ",
  title: "Questions About Email & SMS Campaigns",
  lede: "What businesses ask before handing over their follow-up.",
  items: [
    {
      question: "Do you write the messages, or do we?",
      answer:
        "We draft the full sequence - subject lines, SMS copy, timing - and send it for review before it goes live, so it reads as your business rather than a template.",
    },
    {
      question: "What is A2P 10DLC and do I need it?",
      answer:
        "It's the registration process US carriers require before a business can send SMS at volume. We handle the registration as part of the build - it's a compliance step, not something you have to figure out yourself.",
    },
    {
      question: "Will this feel spammy to my customers?",
      answer:
        "Not if it's built properly - which is the point of segmenting the list and branching the sequence. A relevant, well-timed message reads as good service. An unsegmented blast to everyone reads as spam, and we don't build those.",
    },
    {
      question: "Can this work alongside our existing email tool?",
      answer:
        "Usually it runs from your CRM directly so replies, bookings and follow-up live in one place - migrating an existing list in is part of the setup, not a separate project.",
    },
    {
      question: "How long does it take to launch?",
      answer:
        "A first sequence is typically live within one to two weeks, with A2P registration running in parallel since carrier approval can take a few business days.",
    },
    {
      question: "Do you handle unsubscribes and opt-outs?",
      answer:
        "Yes - STOP/HELP handling for SMS and unsubscribe links for email are built in from the first send, not added later.",
    },
  ],
  card: {
    eyebrow: "Let's talk",
    title: "How fast does a lead hear back from you today?",
    body: "Tell us what happens after someone fills out a form or calls. We'll say where the gap is and what a sequence would close.",
    cta: { label: "Get Free Consultation", to: "/book", icon: "arrowRight" },
  },
};
