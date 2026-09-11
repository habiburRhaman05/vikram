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

export const ROLLOUT_STEPS = [
  { num: "NOW", title: "Tax preparers", body: "Live and onboarding for the coming filing season.", on: true },
  { num: "NEXT", title: "Bookkeeping", body: "Closest neighbour to tax - much of the build carries over.", on: true },
  { num: "THEN", title: "Real estate", body: "Speed-to-lead and long-horizon nurture.", on: false },
  { num: "LATER", title: <>Medical &amp; freight</>, body: "In design, informed by the earlier builds.", on: false },
];
