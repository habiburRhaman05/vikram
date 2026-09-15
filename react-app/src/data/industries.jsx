export const TAX_TAGS = [
  "1040", "Schedule C", "1065", "1120", "1120S", "1041", "990", "706", "709",
  "940 / 941 payroll", "1099-NEC", "1099-MISC", "Multi-state", "Audit response",
];

export const TAX_CHECKLIST = [
  "Individual and business returns - 1040 and Schedule C through 1065, 1120, 1120S and 1041",
  "Estate and gift work - 706 and 709 - with their own document requirements",
  "Bilingual reception for practices serving Spanish-speaking clients",
  "Seasonal staff added without a per-seat charge",
];

export const ROADMAP_CARDS = [
  { icon: "trendUp", title: <>Bookkeeping &amp; payroll firms</>, body: "Month-end close chasing, recurring document collection, and client comms that don't depend on one person's memory. Payroll filings tracked alongside the books." },
  { icon: "house", title: <>Real estate agents &amp; teams</>, body: "Speed-to-lead matters more here than anywhere: the agent who answers first usually wins the listing. Showing bookings, follow-up sequences and nurture that runs for months." },
  { icon: "plus", title: <>Medical &amp; dental practices</>, body: "Bilingual reception, appointment scheduling, intake forms and recall reminders - without adding front-desk headcount to cover the phones." },
  { icon: "truck", title: <>Freight &amp; trucking brokers</>, body: "Coverage across dispatch hours, carrier follow-up, and document collection for rate confirmations and paperwork. In development." },
];

/* The "What is your Profession or Service?" picker.
 *
 * One entry per trade, each with its own glyph and a single line about the
 * thing that actually decides whether a system is useful in that trade -
 * not a restatement of the profession's name. Kept as data (not markup in
 * the page) because the same 13 labels are the option list the section is
 * built from; a new trade is one line here, nothing else.
 *
 * Icons are all names registered in components/common/Icon.jsx - none of
 * them repeat, so no two cards look like the same trade at a glance. */
export const PROFESSIONS = [
  { icon: "fileCheck", label: "Tax Preparation", body: "1040s through 1120S, with a document checklist per return type and filing-season reminders." },
  { icon: "barChart", label: "Accounting", body: "Month-end milestones, recurring engagements and client comms out of one inbox." },
  { icon: "layers", label: "Bookkeeper", body: "Monthly document collection, bank-feed chasing and clean onboarding for new clients." },
  { icon: "pen", label: "Notary", body: "Scheduling, travel areas and ID or witness details captured before you leave the office." },
  { icon: "building", label: "Mortgage Broker", body: "Loan stages, a checklist per loan programme and follow-up on rate shoppers." },
  { icon: "house", label: "Realtor", body: "Speed-to-lead, showing bookings and nurture that runs for months rather than days." },
  { icon: "shield", label: "Insurance Agent", body: "Quote requests, renewal reminders and policy documents in one place." },
  { icon: "trendUp", label: "Financial Advisor", body: "Meeting scheduling, a review cadence and follow-up that never misses a date." },
  { icon: "wallet", label: "Investment Banker", body: "Deal document collection, counterparty follow-up and a pipeline that reports itself." },
  { icon: "creditCard", label: "Credit Specialist", body: "Dispute timelines, client document rounds and status updates that answer themselves." },
  { icon: "target", label: "Consultant", body: "Discovery intake, proposal follow-up and engagement reporting without spreadsheets." },
  { icon: "file", label: "Attorney", body: "Intake screening, conflict details and matter milestones tracked from the first call." },
  { icon: "graduationCap", label: "CPA", body: "Filing deadlines, client document rounds and advisory follow-up on a calendar you can see." },
];

export const ROLLOUT_STEPS = [
  { num: "NOW", title: "Tax preparers", body: "Live and onboarding for the coming filing season.", on: true },
  { num: "NEXT", title: "Bookkeeping", body: "Closest neighbour to tax - much of the build carries over.", on: true },
  { num: "THEN", title: "Real estate", body: "Speed-to-lead and long-horizon nurture.", on: false },
  { num: "LATER", title: <>Medical &amp; freight</>, body: "In design, informed by the earlier builds.", on: false },
];
