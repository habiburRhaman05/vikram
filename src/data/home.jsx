export const INBOX_MESSAGES = [
  {
    active: true,
    icon: "phone",
    iconVariant: "aqua",
    name: "Maria Delgado",
    time: "7:42 PM",
    text: "Call answered - needs an appointment for the 1040",
    tag: "AI receptionist · booked",
  },
  {
    icon: "file",
    iconVariant: "violet",
    name: "Jordan Ellis",
    time: "6:15 PM",
    text: "Uploaded W-2, 1099-INT and last year's return",
  },
  {
    icon: "calendar",
    iconVariant: "amber",
    name: "Priya Raman",
    time: "4:58 PM",
    text: "Consultation booked - Thu 10:30 AM, confirmed by text",
  },
  {
    icon: "message",
    name: "Website chat",
    time: "3:20 PM",
    text: `"Do you file multi-state returns?" - answered, lead captured`,
  },
];

export const TRUST_ITEMS = [
  { icon: "shield", text: "Bank-level document security" },
  { icon: "globe", text: <>English &amp; Spanish, natively</> },
  { icon: "pen", text: "Unlimited e-signatures" },
  { icon: "usersTwo", text: "Unlimited staff seats" },
];

export const PROBLEM_CARDS = [
  {
    title: "Calls go to voicemail",
    body: "A new client who reaches voicemail in February calls the next preparer on the list. Nights, weekends and the two weeks before the deadline are exactly when they call.",
  },
  {
    title: "Documents arrive in pieces",
    body: `W-2s by text, a 1099 as a photo, the prior-year return "somewhere in email." Reassembling a single client file eats hours you never bill for.`,
  },
  {
    title: `Nobody can answer "where's mine?"`,
    body: "Without one shared view of every return in progress, status questions interrupt the people who are supposed to be preparing returns.",
  },
];

export const PLATFORM_CARDS = [
  { index: "01", title: "Dedicated business line", body: "Your own local number for calls and texts, separate from your personal phone, with every conversation logged to the client record." },
  { index: "02", title: "One unified inbox", body: "Calls, SMS, email, website chat and WhatsApp land in a single thread per client - so anyone on your team can pick up where the last person left off." },
  { index: "03", title: "Bilingual AI receptionist", body: "Answers around the clock in English or Spanish, qualifies the caller, books the consultation and flags anything that needs a human." },
  { index: "04", title: "Secure client portal", body: "Clients upload their documents against a checklist. You see at a glance what has arrived and what is still outstanding." },
  { index: "05", title: "Preparer pipeline", body: "Every return moves through clear stages from new lead to filed and paid, with the whole board visible to your team." },
  { index: "06", title: <>E-sign, invoicing &amp; reviews</>, body: "Send engagement letters for signature, collect prep fees online, and request a review automatically once the return is filed." },
];

export const RECEPTION_CHECKLIST = [
  "Answers overflow calls when your team is with a client, and every call after hours",
  "Switches between English and Spanish based on how the caller speaks",
  "Books straight into your live calendar and sends the confirmation text",
  "Writes a summary to the client record, and escalates anything it should not handle",
];

export const RECEPTION_CHAT = [
  { from: "them", text: "Hi, are you still accepting new clients for this year's taxes?" },
  { from: "us", text: "Of course. I can book you a free 30 minute consultation. Does Thursday at 10:30 in the morning work for you?" },
  { from: "them", text: "Yes, perfect." },
  { from: "us", text: "Done - I just sent you the confirmation by text message with the list of documents to bring." },
];

export const PORTAL_CHECKLIST = [
  "A required-document checklist per return type, no  upload box",
  "Automatic reminders for whatever is still missing, by text and email",
  "Phone-camera uploads, so clients never need a scanner",
  "One place to look when you need to know why a return is stalled",
];

export const PORTAL_DOC_ROWS = [
  { done: true, name: "Photo ID", meta: "Uploaded" },
  { done: true, name: "Form W-2", meta: "Uploaded" },
  { done: true, name: "Prior-year return", meta: "Uploaded" },
  { done: false, name: "Form 1095-A", meta: "Reminder sent" },
  { done: false, name: "Bank routing details", meta: "Waiting" },
];

export const ONBOARDING_STEPS = [
  { icon: "phone", num: "STEP 01", title: <>Demo &amp; scope</>, children: "Twenty minutes on how your office actually runs today - your services, your languages, your busy-season bottlenecks." },
  { icon: "sliders", num: "STEP 02", title: "We configure it", children: "We build your number, portal, pipeline, calendar, templates and automations to match your practice." },
  { icon: "check", num: "STEP 03", title: <>Review &amp; train</>, children: "You walk the finished setup with us, we adjust what you want changed, and we train your staff on it." },
  { icon: "bolt", num: "STEP 04", title: "Go live", children: "Your line goes on, the receptionist starts answering, and your clients begin uploading." },
];

export const INDUSTRIES_CHECKLIST = [
  "Trade-specific configuration, not a generic CRM you have to assemble yourself",
  "Built and proven on the industry that's live today, before the next one starts",
  "One underlying platform, fluent in a different trade's language for each one",
  "A new industry only ships once the last one is genuinely finished",
];

export const INDUSTRIES_FEATURES = [
  {
    icon: "fileCheck",
    iconVariant: "live",
    title: "Tax preparers & EROs",
    titleExtra: (
      <span className="status-pill" style={{ marginLeft: 8, verticalAlign: "2px" }}>
        Live now
      </span>
    ),
    children: "Individual, business, estate and multi-state practices.",
  },
  { icon: "trendUp", title: <>Bookkeeping &amp; payroll firms</>, children: "Recurring client comms, month-end chasing and document intake." },
  { icon: "house", title: "Real estate agents", children: "Speed-to-lead calling, showing bookings and follow-up that never lapses." },
  { icon: "plus", title: <>Medical &amp; dental practices</>, children: "Bilingual reception, scheduling and intake forms without added front-desk cost." },
  { icon: "truck", title: <>Freight &amp; trucking brokers</>, children: "Dispatch-hours coverage and carrier follow-up. In development." },
];

export const PLANS = [
  {
    name: "Solo Preparer",
    for: "One preparer, seasonal volume",
    price: "Talk to us",
    priceNote: "Confirmed in writing before you commit",
    items: [
      <>Dedicated business line &amp; unified inbox</>,
      <>Website, lead capture &amp; booking calendar</>,
      <>Client document upload &amp; reminders</>,
      "Unlimited e-signatures",
    ],
    cta: { to: "/book", variant: "outline", icon: "calendar", label: "Book a demo" },
  },
  {
    badge: "Most chosen",
    featured: true,
    name: "Growing Firm",
    for: "A team, year-round work",
    price: "Talk to us",
    priceNote: "Confirmed in writing before you commit",
    items: [
      "Everything in Solo Preparer",
      "Bilingual AI receptionist on your line",
      "Branded client portal with status visibility",
      <>Invoicing, payments &amp; review requests</>,
      "Unlimited staff seats",
    ],
    cta: { to: "/book", variant: "accent", icon: "calendar", label: "Book a demo" },
  },
  {
    name: "Multi-Office",
    for: "Several locations or brands",
    price: "Talk to us",
    priceNote: "Confirmed in writing before you commit",
    items: [
      "Everything in Growing Firm",
      "A separate workspace per location",
      <>Cross-office reporting &amp; capacity view</>,
      "Custom builds where the platform stops",
    ],
    cta: { to: "/contact", variant: "outline", icon: "message", label: "Talk to us" },
  },
];

export const FAQ_ITEMS = [
  {
    question: "Does the AI receptionist replace my front desk?",
    answer: `No - it covers the calls your team cannot take. It answers when everyone is with a client, after you close, at weekends, and through the deadline weeks. Anything it should not handle gets escalated to a person with the full call summary attached.`,
  },
  {
    question: "Do I have to change my phone number?",
    answer: `No. You can take a new local number for the practice, or port your existing number across. Either way, calls and texts route into the same inbox, and your personal phone stops being your business line.`,
  },
  {
    question: "Am I charged per staff member?",
    answer: `No. Plans are priced per office, and seats are unlimited. Adding a seasonal preparer in February should not change your bill, so you never have to ration logins during the exact weeks you need them most.`,
  },
  {
    question: "How are calls, texts and AI usage billed?",
    answer: `Your subscription covers the platform. Telephony and AI usage run on your own billing profile with your own card on file, so the costs are transparently yours and tied to your own volume - never pooled with another firm's. We walk you through exactly how this is set up before you go live.`,
  },
  {
    question: "How long does setup take?",
    answer: `Days rather than months. Because we start from a configuration already built for tax practices, most of the work is tailoring it to your services, hours and languages rather than building from an empty account.`,
  },
  {
    question: "What if I need something the platform doesn't do?",
    answer: `We build it. Our team does full-stack engineering as well as platform configuration, so when an off-the-shelf tool runs out of road - a custom client portal, a bespoke integration - we develop it and connect it to the rest of your setup.`,
  },
];
