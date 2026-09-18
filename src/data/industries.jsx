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
export const INDUSTRY_DETAILS = [
  { 
    name: "Tax Preparation", icon: "calculator", tone: "#3E8EF7",
    body: "1040s through 1120S, with a document checklist per return type and filing-season reminders.",
    modal: {
      problem: "Tax season means endless chasing for documents and answering basic status questions.",
      solution: "We build automated pipelines that collect W-2s, ping clients for missing forms, and update them on filing status—so you actually have time to prepare returns.",
      features: ["Automated Document Collection", "Missing Info Reminders", "Status Updates", "e-Sign Workflows"],
      roi: "Save 10+ hours per week per preparer during peak season.",
      services: ["CRM Setup & Management", "Workflow Automation", "Email & SMS Marketing", "Website & Landing Pages"]
    }
  },
  { 
    name: "Accounting", icon: "barChart", tone: "#0EA46B",
    body: "Month-end milestones, recurring engagements and client comms out of one inbox.",
    modal: {
      problem: "Juggling multiple recurring engagements and losing track of month-end close progress.",
      solution: "A unified system that tracks all recurring engagements, automates client requests, and centralizes communication.",
      features: ["Month-end Workflows", "Unified Inbox", "Client Portal", "Automated Follow-ups"],
      roi: "Reduce client response times by 50%.",
      services: ["CRM Setup & Management", "Workflow Automation", "Reporting Dashboards", "White-Label Solutions"]
    }
  },
  { 
    name: "Bookkeeper", icon: "book", tone: "#F59E0B",
    body: "Monthly document collection, bank-feed chasing and clean onboarding for new clients.",
    modal: {
      problem: "Chasing clients every month for bank statements and uncategorized expenses.",
      solution: "Automated monthly requests and reminders that don't rely on your memory.",
      features: ["Statement Requests", "Categorization Follow-ups", "Client Onboarding", "Secure Uploads"],
      roi: "Close books 5 days faster.",
      services: ["CRM Setup & Management", "Workflow Automation", "Reporting Dashboards", "Email & SMS Marketing"]
    }
  },
  { 
    name: "Notary", icon: "penTool", tone: "#7C5CFC",
    body: "Scheduling, travel areas and ID or witness details captured before you leave the office.",
    modal: {
      problem: "Arriving at a signing only to find missing IDs or missing witnesses.",
      solution: "Pre-appointment qualification forms that ensure all requirements are met before you travel.",
      features: ["Smart Scheduling", "ID Verification Checklists", "Location Logic", "Automated Reminders"],
      roi: "Eliminate wasted trips and double bookings.",
      services: ["Workflow Automation", "Website & Landing Pages", "Email & SMS Marketing", "CRM Setup & Management"]
    }
  },
  { 
    name: "Mortgage Broker", icon: "house", tone: "#E83A59",
    body: "Loan stages, a checklist per loan programme and follow-up on rate shoppers.",
    modal: {
      problem: "Leads go cold because of slow follow-up, and loans stall due to missing documents.",
      solution: "Instant lead engagement and automated borrower portals that guide them through the loan stages.",
      features: ["Speed-to-Lead Automation", "Borrower Portal", "Milestone Updates", "Re-engagement Campaigns"],
      roi: "Increase application pull-through rates by 20%.",
      services: ["CRM Setup & Management", "Funnel Builds", "Workflow Automation", "Email & SMS Marketing"]
    }
  },
  { 
    name: "Realtor", icon: "house", tone: "#3E8EF7",
    body: "Speed-to-lead, showing bookings and nurture that runs for months rather than days.",
    modal: {
      problem: "Zillow leads expect instant answers, and past clients are forgotten.",
      solution: "Immediate AI response to inquiries and long-term nurture campaigns that keep you top of mind.",
      features: ["Instant Lead Response", "Long-term Nurture", "Showing Automation", "Review Generation"],
      roi: "Never lose a lead to a faster agent again.",
      services: ["AI Voice & Chat Agents", "CRM Setup & Management", "Funnel Builds", "Social Media Management"]
    }
  },
  { 
    name: "Insurance Agent", icon: "shield", tone: "#0EA46B",
    body: "Quote requests, renewal reminders and policy documents in one place.",
    modal: {
      problem: "Missed renewals and unorganized policy documents.",
      solution: "Automated renewal reminders sent weeks in advance, and a streamlined quote request flow.",
      features: ["Renewal Automation", "Cross-sell Campaigns", "Quote Workflows", "Document Storage"],
      roi: "Boost retention and cross-sell policies.",
      services: ["CRM Setup & Management", "Workflow Automation", "Email & SMS Marketing", "Funnel Builds"]
    }
  },
  { 
    name: "Financial Advisor", icon: "trendUp", tone: "#F59E0B",
    body: "Meeting scheduling, a review cadence and follow-up that never misses a date.",
    modal: {
      problem: "Struggling to maintain a consistent review cadence with a growing client book.",
      solution: "Automated meeting scheduling and review reminders that run in the background.",
      features: ["Annual Review Automation", "Meeting Booking", "Client Birthday Nurture", "Compliance Logging"],
      roi: "Deliver high-touch service at scale.",
      services: ["CRM Setup & Management", "Workflow Automation", "Email & SMS Marketing", "Website & Landing Pages"]
    }
  },
  { 
    name: "Investment Banker", icon: "building", tone: "#7C5CFC",
    body: "Deal document collection, counterparty follow-up and a pipeline that reports itself.",
    modal: {
      problem: "Tracking deal stages across dozens of emails and spreadsheets.",
      solution: "A visual deal pipeline that automatically tracks stage progression and counterparty tasks.",
      features: ["Deal Pipeline", "Counterparty Management", "Document Checklists", "Automated Reporting"],
      roi: "Keep deals moving without the admin overhead.",
      services: ["CRM Setup & Management", "Workflow Automation", "Reporting Dashboards", "API Integrations"]
    }
  },
  { 
    name: "Credit Specialist", icon: "creditCard", tone: "#E83A59",
    body: "Dispute timelines, client document rounds and status updates that answer themselves.",
    modal: {
      problem: "Clients constantly calling for status updates on their disputes.",
      solution: "Automated milestone updates and secure document portals that keep clients informed.",
      features: ["Status Update Automation", "Dispute Timelines", "Document Portals", "Review Generation"],
      roi: "Cut inbound support calls in half.",
      services: ["CRM Setup & Management", "Funnel Builds", "Workflow Automation", "AI Voice & Chat Agents"]
    }
  },
  { 
    name: "Consultant", icon: "briefcase", tone: "#3E8EF7",
    body: "Discovery intake, proposal follow-up and engagement reporting without spreadsheets.",
    modal: {
      problem: "Spending too much time qualifying bad leads and writing custom proposals.",
      solution: "Pre-qualification funnels and automated proposal follow-ups.",
      features: ["Lead Qualification", "Proposal Nurture", "Engagement Tracking", "Feedback Loops"],
      roi: "Close higher-ticket clients with less effort.",
      services: ["Funnel Builds", "Website & Landing Pages", "CRM Setup & Management", "Workflow Automation"]
    }
  },
  { 
    name: "Attorney", icon: "scale", tone: "#0EA46B",
    body: "Intake screening, conflict details and matter milestones tracked from the first call.",
    modal: {
      problem: "Inefficient intake processes and lost leads who called outside business hours.",
      solution: "24/7 AI-driven intake that screens leads and books consultations automatically.",
      features: ["Automated Intake", "Conflict Checks", "Matter Milestones", "Client Portals"],
      roi: "Capture every lead, even on weekends.",
      services: ["AI Voice & Chat Agents", "CRM Setup & Management", "Workflow Automation", "Website & Landing Pages"]
    }
  },
  { 
    name: "CPA", icon: "calculator", tone: "#F59E0B",
    body: "Filing deadlines, client document rounds and advisory follow-up on a calendar you can see.",
    modal: {
      problem: "Managing multiple deadlines across different tax entities.",
      solution: "A centralized deadline tracker with automated client pings.",
      features: ["Deadline Tracking", "Client Pings", "Advisory Nurture", "Secure Sharing"],
      roi: "Never miss a deadline or a signature.",
      services: ["CRM Setup & Management", "Workflow Automation", "Reporting Dashboards", "Email & SMS Marketing"]
    }
  },
  { 
    name: "Roofer", icon: "hammer", tone: "#7C5CFC",
    body: "Estimate scheduling, weather-delay updates and post-job review requests.",
    modal: {
      problem: "Losing bids because competitors answered the phone faster after a storm.",
      solution: "Instant SMS response to missed calls and automated estimate scheduling.",
      features: ["Missed-Call Text Back", "Estimate Booking", "Weather Updates", "Review Requests"],
      roi: "Turn missed calls into booked estimates.",
      services: ["AI Voice & Chat Agents", "CRM Setup & Management", "Email & SMS Marketing", "Website & Landing Pages"]
    }
  },
  { 
    name: "Retailer", icon: "store", tone: "#E83A59",
    body: "Loyalty programs, flash sale SMS campaigns and foot-traffic tracking.",
    modal: {
      problem: "Relying purely on foot traffic without a way to bring customers back.",
      solution: "Digital loyalty programs and SMS marketing to drive repeat visits.",
      features: ["SMS Marketing", "Loyalty Program", "Flash Sales", "Review Generation"],
      roi: "Increase repeat customer visits by 30%.",
      services: ["Email & SMS Marketing", "Social Media Management", "Funnel Builds", "CRM Setup & Management"]
    }
  },
  { 
    name: "Medical", icon: "activity", tone: "#3E8EF7",
    body: "Bilingual reception, appointment scheduling, intake forms and recall reminders.",
    modal: {
      problem: "Front desk is overwhelmed with scheduling calls and intake paperwork.",
      solution: "Automated booking, digital intake forms, and recall reminders.",
      features: ["Automated Scheduling", "Digital Intake", "Recall Reminders", "No-show Prevention"],
      roi: "Reduce no-shows and free up the front desk.",
      services: ["AI Voice & Chat Agents", "Workflow Automation", "CRM Setup & Management", "Email & SMS Marketing"]
    }
  },
  { 
    name: "Marketing Agency", icon: "megaphone", tone: "#F59E0B",
    body: "Client onboarding, campaign approvals and monthly reporting automated.",
    modal: {
      problem: "Messy onboarding processes that delay campaign launches.",
      solution: "Structured onboarding funnels that collect all assets and approvals upfront.",
      features: ["Onboarding Funnels", "Asset Collection", "Approval Workflows", "Reporting Reminders"],
      roi: "Launch client campaigns 2 weeks faster.",
      services: ["White-Label Solutions", "Funnel Builds", "Workflow Automation", "Reporting Dashboards"]
    }
  },
  { 
    name: "Logistics", icon: "truck", tone: "#0EA46B",
    body: "Coverage across dispatch hours, carrier follow-up, and rate confirmations.",
    modal: {
      problem: "Managing rate confirmations and carrier tracking across fragmented systems.",
      solution: "Automated document workflows and load tracking pipelines.",
      features: ["Rate Confirmations", "Carrier Tracking", "Dispatch Updates", "Invoice Automation"],
      roi: "Scale operations without adding dispatchers.",
      services: ["API Integrations", "Workflow Automation", "CRM Setup & Management", "Reporting Dashboards"]
    }
  }
];

export const ROLLOUT_STEPS = [
  { num: "NOW", title: "Tax preparers", body: "Live and onboarding for the coming filing season.", on: true },
  { num: "NEXT", title: "Bookkeeping", body: "Closest neighbour to tax - much of the build carries over.", on: true },
  { num: "THEN", title: "Real estate", body: "Speed-to-lead and long-horizon nurture.", on: false },
  { num: "LATER", title: <>Medical &amp; freight</>, body: "In design, informed by the earlier builds.", on: false },
];
