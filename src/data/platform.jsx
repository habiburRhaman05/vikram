export const STATS = [
  { num: "24/7", label: "Calls answered - nights, weekends and the deadline crunch" },
  { num: <>EN&nbsp;/&nbsp;ES</>, label: "Every call, text and reminder in your client's language" },
  { num: "1", label: "Inbox for calls, SMS, email, web chat and WhatsApp" },
  { num: <>&infin;</>, label: "Staff seats and e-signatures, on every plan" },
];

export const RECEPTION_CHECKLIST = [
  "Your own number - keep your personal phone out of it, or port your existing line",
  "Answers in English or Spanish, matching how the caller speaks",
  "Qualifies the caller, books the slot and texts the confirmation",
  "Escalates anything it shouldn't handle, with the call summary attached",
];

export const RECEPTION_CALL_LOG = [
  { done: true, name: <>9:12 PM &middot; New client, Spanish</>, meta: "Booked" },
  { done: true, name: <>10:40 PM &middot; Refund status question</>, meta: "Answered" },
  { done: true, name: <>6:05 AM &middot; Business return enquiry</>, meta: "Booked" },
  { done: false, name: <>7:20 AM &middot; IRS notice - needs a preparer</>, meta: "Escalated" },
];

export const INBOX_CARDS = [
  { icon: "message", title: "Every channel merged", body: "Calls, SMS, email, website chat, WhatsApp and social messages arrive in the same place, attached to the same client record." },
  { icon: "users", title: "Shared across the team", body: "Anyone can pick up a conversation without asking who spoke to the client last, or digging through a personal inbox." },
  { icon: "chatWindow", title: "Website chat included", body: "A chat widget on your site answers common questions instantly and captures the visitor as a lead before they leave." },
];

export const PORTAL_CHECKLIST = [
  "Checklists per return type - 1040, Schedule C, 1065, 1120, 1120S, 1041 and more",
  "Camera uploads, so nobody needs a scanner or a desktop",
  "Automatic reminders for what's still outstanding, by text and email",
  `A "what's missing" view across every open return, not just one client`,
];

export const PORTAL_OUTSTANDING = [
  { done: false, name: "M. Delgado - Form 1095-A", meta: "2 reminders" },
  { done: false, name: "J. Ellis - Bank routing", meta: "1 reminder" },
  { done: false, name: <>Raman LLC - 2024 P&amp;L</>, meta: "Requested today" },
  { done: true, name: "K. Osei - all documents in", meta: "Ready" },
];

export const PIPELINE_STAGES = [
  { label: "New lead" },
  { label: "Contacted" },
  { label: "Docs requested", on: true },
  { label: "Docs received" },
  { label: "In preparation", on: true },
  { label: "Review" },
  { label: "Ready to file" },
  { label: "Paid", on: true },
];

export const WORKFLOW_CARDS = [
  { icon: "layers", title: "Automations at each stage", body: "New-lead replies, appointment reminders, missing-document chasers and no-show recovery all fire from the stage the client is in." },
  { icon: "calendar", title: "Booking that fills itself", body: "Clients book online or through the receptionist. Confirmations and reminders go out automatically, cutting no-shows." },
  { icon: "trendUp", title: "Capacity you can see", body: "Returns per preparer, time in each stage, and where the season is backing up - visible before it becomes a problem." },
];

export const BILLING_FEATURES = [
  { icon: "pen", title: "Unlimited e-signature", children: "Engagement letters, authorisation forms and consents sent for signature and returned to the client record - with no per-signature charge." },
  { icon: "creditCard", title: <>Invoicing &amp; card payments</>, children: "Send the prep fee as an invoice, take payment online, and see what is outstanding without exporting anything to a spreadsheet." },
  { icon: "star", title: "Review requests, automatically", children: "Once a return is filed and paid, the system asks for a review at the moment the client is happiest - the single most reliable source of new local clients." },
  { icon: "barChart", title: "Reporting that answers real questions", children: "Where leads came from, how many converted, how long returns sit in each stage, and which preparer is carrying the season." },
  { icon: "chatWindow", title: <>Website &amp; lead capture</>, children: "A fast, mobile-first site with your branding, enquiry forms that create a client record instantly, and the chat widget already wired in." },
];

/** Desktop call-flow diagram node positions/content - percentage-anchored
 * (left/top) exactly as the original inline styles positioned them, so
 * the six-column branching layout lines up with the wires drawn in the
 * accompanying <svg>. See CallFlowDiagram.jsx. */
export const FLOW_NODES = [
  { left: 5.88, top: 55.93, delay: 0, icon: "phone", variant: "trigger", title: "New Call Received", sub: "any channel" },
  { left: 23.53, top: 55.93, delay: 150, icon: "clock", variant: "condition", title: "Business Hours?", sub: "condition" },

  { left: 41.18, top: 23.73, delay: 450, icon: "usersTwo", variant: "a", title: "Team Answers Live", sub: "business hours" },
  { left: 58.82, top: 23.73, delay: 750, icon: "check", variant: "condition", title: "Call Answered?", sub: "condition" },
  { left: 76.47, top: 11.86, delay: 1050, icon: "tick", variant: "end", title: "Client Connected", sub: "yes", strokeWidth: 3 },
  { left: 76.47, top: 35.59, delay: 1050, icon: "message", variant: "a", title: "AI Receptionist Answers", sub: "no answer" },
  { left: 94.12, top: 35.59, delay: 1350, icon: "tick", variant: "end", title: "Consultation Booked", sub: "end", strokeWidth: 3 },

  { left: 41.18, top: 55.93, delay: 450, icon: "message", variant: "b", title: "AI Receptionist Answers", sub: <>after hours &middot; EN/ES</> },
  { left: 58.82, top: 55.93, delay: 750, icon: "calendar", variant: "b", title: "Books Next Slot", sub: "auto-sent link" },
  { left: 76.47, top: 55.93, delay: 1050, icon: "tick", variant: "end", title: "Appointment Confirmed", sub: "end", strokeWidth: 3 },

  { left: 41.18, top: 88.14, delay: 450, icon: "mail", variant: "c", title: "Bilingual Auto-Reply", sub: "weekend" },
  { left: 58.82, top: 88.14, delay: 750, icon: "clock", variant: "c", title: "Queued for Monday", sub: "scheduled" },
  { left: 76.47, top: 88.14, delay: 1050, icon: "tick", variant: "end", title: "Follow-Up Monday AM", sub: "end", strokeWidth: 3 },
];

export const FLOW_WIRES = [
  "M60,300 L360,300",
  "M360,300 C 480,300 480,110 660,110",
  "M360,300 L660,300",
  "M360,300 C 480,300 480,490 660,490",
  "M660,110 L960,110",
  "M660,300 L960,300",
  "M660,490 L960,490",
  "M960,110 C 1080,110 1080,40 1260,40",
  "M960,110 C 1080,110 1080,180 1260,180",
  "M960,300 L1260,300",
  "M960,490 L1260,490",
  "M1260,180 L1560,180",
];
export const FLOW_WIRE_DELAYS = [150, 450, 450, 450, 750, 750, 750, 1050, 1050, 1050, 1050, 1350];
export const FLOW_PULSE_BEGINS = [1.2, 1.5, 1.5, 1.5, 1.9, 1.9, 1.9, 2.3, 2.3, 2.3, 2.3, 2.7];

export const FLOW_MOBILE_BRANCHES = [
  {
    color: "var(--violet-500)",
    label: "Business hours",
    steps: [
      { icon: "usersTwo", title: "Team Answers Live" },
      { icon: "check", title: "Call Answered?" },
      { icon: "tick", title: "Connected or Booked", end: true, children: "Client reaches a person either way" },
    ],
  },
  {
    color: "var(--amber-400)",
    label: "After hours",
    steps: [
      { icon: "message", title: "AI Receptionist Answers", children: "English or Spanish" },
      { icon: "calendar", title: "Books Next Slot" },
      { icon: "tick", title: "Appointment Confirmed", end: true, children: "Texted instantly" },
    ],
  },
  {
    color: "var(--aqua-600)",
    label: "Weekend",
    steps: [
      { icon: "mail", title: "Bilingual Auto-Reply" },
      { icon: "clock", title: "Queued for Monday" },
      { icon: "tick", title: "Follow-Up Monday AM", end: true, children: "First thing, no gap" },
    ],
  },
];
