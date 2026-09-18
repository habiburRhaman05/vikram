/**
 * /services/social-media-marketing - all page copy.
 *
 * Kept out of the page component for the same reason the other service data
 * files are - see the note atop serviceWebsitesLanding.jsx.
 *
 * NO INVENTED NUMBERS, NO INVENTED CLIENT CLAIMS: same rule as every other
 * service data file. WORK.items describe the shape of engagements of this
 * kind, not named clients or measured results - see WORK.note. Nothing here
 * claims a follower count, an engagement rate or a "posts per week" average
 * we have not actually measured.
 */

/* -- 1. Hero ----------------------------------------------------------------- */

export const SM_HERO = {
  eyebrow: "Social media marketing",
  titleLead: "A content calendar that",
  titleAccent: "runs itself every week.",
  lede:
    "Planned, written, designed and posted on a schedule you set once - so your feed keeps moving even on the weeks you don't have time to think about it.",

  primary: { label: "Get Free Consultation", to: "/book", icon: "arrowRight" },
  secondary: { label: "See What's Included", href: "#pillars" },

  /* The three post-mockup cards fanned in the hero. Content is written to
     read as a realistic sample post, not a real client's - see the "sample"
     label rendered with each card in the Hero component. */
  posts: [
    {
      platform: "instagram",
      handle: "@yourbusiness",
      kind: "Carousel",
      caption: "Behind the scenes of our Tuesday install - swipe for the before/after.",
      stat: "Scheduled for 9:00 AM",
    },
    {
      platform: "facebook",
      handle: "Your Business",
      kind: "Update",
      caption: "We're now booking for next month. Comment or DM to grab a slot.",
      stat: "Scheduled for 12:30 PM",
    },
    {
      platform: "linkedin",
      handle: "Your Business",
      kind: "Article share",
      caption: "Three questions to ask before you sign with any provider.",
      stat: "Scheduled for 4:00 PM",
    },
  ],
};

/* -- 2. Intro ----------------------------------------------------------------- */

export const SM_INTRO = {
  eyebrow: "The short version",
  title: "Consistency beats a viral post",
  quote: {
    text: "The account that posts three times a week for a year beats the one that goes viral once and goes quiet for two months.",
    attribution: "Algorithms reward the accounts that show up on a schedule.",
  },
  body: [
    "Most small-business social accounts fail for the same boring reason: nobody owns the calendar. A post goes up when someone remembers, the account goes quiet for three weeks, and the algorithm stops showing it to anyone - including the people who already followed. Then someone asks why social \"doesn't work\" for the business, when the honest answer is that it was never actually run.",
    "Running an account is a production schedule, not a creative burst. It means knowing what you're posting two weeks out, having the photos and captions ready before the day arrives, and publishing at the times your audience is actually online - then answering the comments and messages that come back, because a post nobody replies to reads as a business that isn't paying attention.",
    "We plan the calendar, produce the content, publish it on schedule, and monitor the replies - so the account keeps a pulse without it depending on someone in your business remembering to open the app.",
  ],
  facts: [
    { num: "Weekly", label: "Publishing cadence", sub: "Set once, held every week after" },
    { num: "5", label: "Platforms we run", sub: "Facebook, Instagram, LinkedIn, X, YouTube" },
    { num: "Planned", label: "Content, not improvised", sub: "Every post scheduled two weeks ahead" },
    { num: "Monitored", label: "Comments and DMs", sub: "Checked on a daily cadence, not left unread" },
  ],
};

/* -- 3. Content pillars (bento grid) ------------------------------------------ */

export const SM_PILLARS = {
  eyebrow: "What we post",
  title: "Six Kinds of Content, Not One",
  lede:
    "An account that only ever sells reads as an ad feed and gets muted. We build the calendar from a mix, so the account earns attention as well as spending it.",
  items: [
    {
      icon: "star",
      title: "Proof of work",
      body: "Before/after shots, finished jobs, real results - the content that answers \"can they actually do this.\"",
      big: true,
    },
    {
      icon: "users",
      title: "Behind the scenes",
      body: "The team, the process, the day-to-day - the posts that make a business feel like people, not a logo.",
    },
    {
      icon: "message",
      title: "Answers to real questions",
      body: "The things customers actually ask, turned into posts so the answer exists before the question does.",
    },
    {
      icon: "megaphone",
      title: "Offers and announcements",
      body: "New availability, seasonal offers, launches - timed and worded to drive an action, not just an impression.",
    },
    {
      icon: "star",
      title: "Reviews and testimonials",
      body: "Real feedback turned into a post, with permission - social proof doing the convincing instead of a claim.",
    },
    {
      icon: "sparkle",
      title: "Trends and timely posts",
      body: "The relevant moment or format, adapted to your business rather than copied wholesale.",
    },
  ],
};

/* -- 4. Platforms ------------------------------------------------------------- */

export const SM_PLATFORMS = {
  eyebrow: "Where we post",
  title: "The Platforms We Actually Run",
  lede:
    "Not every platform earns a place in your calendar. We pick the ones your customers are actually on, and run those properly instead of spreading thin across all of them.",
  items: [
    { icon: "facebook", name: "Facebook", body: "Community updates, local reach, and the reviews most customers check first." },
    { icon: "instagram", name: "Instagram", body: "Visual proof of work - photos, carousels and short-form video." },
    { icon: "linkedin", name: "LinkedIn", body: "B2B credibility, hiring posts, and the professional audience other platforms don't reach." },
    { icon: "x", name: "X", body: "Fast updates, customer service replies, and industry conversation in real time." },
    { icon: "youtube", name: "YouTube", body: "Longer-form video - walkthroughs, explainers and the content worth keeping findable." },
  ],
  note: "We recommend which of these to run in the first call, based on where your customers actually spend time - not all five by default.",
};

/* -- 5. Weekly sprint-board process -------------------------------------------- */

export const SM_PROCESS = {
  eyebrow: "How a week runs",
  title: "The Same Five Steps, Every Week",
  lede:
    "The same production line runs every week whether or not anyone at your business thinks about it - that's the point of hiring it out.",
  steps: [
    { num: "01", day: "Mon", icon: "target", title: "Plan", body: "The week's posts mapped against your offers, your calendar and what performed last week." },
    { num: "02", day: "Tue", icon: "pen", title: "Create", body: "Photos, video and copy produced or sourced for every post on the week's list." },
    { num: "03", day: "Wed", icon: "calendar", title: "Schedule", body: "Every post queued at the time your audience is actually online, not just when it was finished." },
    { num: "04", day: "Daily", icon: "message", title: "Engage", body: "Comments, DMs and mentions checked and answered so the account looks attended, not automated." },
    { num: "05", day: "Fri", icon: "lineChart", title: "Report", body: "What went up, what it did, and what changes for next week's plan." },
  ],
  cta: { label: "Get Free Consultation", to: "/book", icon: "arrowRight" },
};

/* -- 6. What's included --------------------------------------------------------- */

export const SM_DETAILS = {
  eyebrow: "The detail",
  title: "What's actually included",
  lede: "The parts of running an account that don't show up in a single screenshot.",
  groups: [
    {
      icon: "pen",
      title: "Content production",
      items: [
        "Captions written in your business's own voice, not a generic template",
        "Photos and graphics sized correctly per platform",
        "A content calendar you can see and approve ahead of time",
        "Hashtag and keyword research kept current per platform",
      ],
    },
    {
      icon: "calendar",
      title: "Scheduling & publishing",
      items: [
        "Posts queued to publish at the times your audience is active",
        "Platform-specific formatting - carousel, reel, article, thread",
        "A consistent cadence held even during busy weeks",
        "A shared calendar so you always know what's going out and when",
      ],
    },
    {
      icon: "message",
      title: "Community management",
      items: [
        "Comments and DMs checked and answered on a daily cadence",
        "Reviews and mentions flagged so nothing goes unanswered",
        "Spam and bad-faith comments filtered before they sit publicly",
        "Enquiries that come in through social routed to your CRM",
      ],
    },
    {
      icon: "lineChart",
      title: "Reporting",
      items: [
        "A monthly summary of what was posted and what it did",
        "Follower and reach trends tracked over time, not one post at a time",
        "What's working flagged so the next month's plan builds on it",
        "A direct line to ask questions about the numbers, not just receive them",
      ],
    },
  ],
};

/* -- 7. Who it's for -------------------------------------------------------------- */

export const SM_USECASES = {
  eyebrow: "Who it's for",
  title: "The Six Accounts We're Asked to Run",
  lede: "Different businesses, same underlying need: a calendar that runs whether or not anyone remembers to open the app.",
  items: [
    { icon: "house", title: "Local service businesses", body: "Proof of work and community trust in the feed people check before they call." },
    { icon: "building", title: "Professional practices", body: "Credibility content for accountants, clinics and advisers, paced for a professional audience." },
    { icon: "cart", title: "Retail & eCommerce", body: "Product content and offers timed to inventory and seasonal demand." },
    { icon: "chatWindow", title: "Franchises & multi-location", body: "One consistent voice held across every location's account." },
    { icon: "graduationCap", title: "Coaches & consultants", body: "Authority content that turns expertise into a following that actually converts." },
    { icon: "usersTwo", title: "Businesses relaunching a dormant account", body: "An account that's gone quiet, brought back on a schedule instead of a single catch-up burst." },
  ],
};

/* -- 8. Representative work -------------------------------------------------------- */

export const SM_WORK = {
  eyebrow: "What running an account looks like",
  title: "Three representative engagements",
  lede: "Each one started with an account that had gone quiet, or had never had a real calendar behind it.",
  note:
    "These describe the shape of work of this kind, not named client engagements - we do not publish client details or performance figures without written sign-off.",
  items: [
    {
      tag: "Local service",
      title: "The account that had gone quiet for months",
      problem: "The last post was four months old, and the account had no consistent voice or schedule.",
      built: [
        "A weekly content calendar built around proof-of-work and reviews",
        "A consistent posting cadence across Facebook and Instagram",
        "Comments and DMs monitored daily instead of left unread",
      ],
      outcome: "The account now publishes on a set schedule, and enquiries that arrive through comments and DMs get a same-day reply.",
    },
    {
      tag: "Relaunch",
      title: "A LinkedIn presence built from nothing",
      problem: "The business had no LinkedIn presence at all, despite most of its referrals coming from other businesses.",
      built: [
        "A posting cadence aimed at a B2B, referral-driven audience",
        "Authority content drawn from the team's own expertise",
        "A connection and engagement routine to grow the right audience",
      ],
      outcome: "The account went from nonexistent to an active, regularly-posting presence in the channel referrals actually come from.",
    },
    {
      tag: "Multi-platform",
      title: "One voice held across three platforms",
      problem: "Facebook, Instagram and X were run inconsistently by whoever had time that week, with three different tones.",
      built: [
        "A single content calendar covering all three platforms",
        "Captions and visuals adapted per platform from one shared plan",
        "One person accountable for the cadence across the board",
      ],
      outcome: "All three accounts now read as one business, on a schedule that holds whether or not anyone in-house has time that week.",
    },
  ],
};

/* -- 9. Benefits --------------------------------------------------------------- */

export const SM_BENEFITS = {
  eyebrow: "The results",
  title: "What a managed account gives you",
  lede: "Six things you can check for yourself after the first month.",
  items: [
    { icon: "calendar", title: "It posts on a schedule", body: "Not when someone remembers - every week, on a plan." },
    { icon: "pen", title: "It sounds like your business", body: "Written in your voice, not a generic template." },
    { icon: "message", title: "Comments get answered", body: "Checked daily, so the account looks attended." },
    { icon: "star", title: "Proof of work gets shown", body: "The content that actually builds trust, not just noise." },
    { icon: "lineChart", title: "You can see what it's doing", body: "A monthly report, not a black box." },
    { icon: "target", title: "It feeds the rest of the pipeline", body: "Enquiries from social routed straight to your CRM." },
  ],
};

/* -- 10. Enquiry form ------------------------------------------------------------ */

export const SM_ENQUIRY = {
  service: "Social Media Marketing",
  eyebrow: "Get started",
  title: "What should your account actually post?",
  lede:
    "Tell us which platforms you're on now and what's not working. We'll come back with a proposed calendar and what it would cost to run.",
  points: [
    "A recommendation on which platforms are actually worth running",
    "A sample week of content before you commit to anything",
    "No obligation, and no retainer to sign before you see the plan",
  ],
};

/* -- 11. FAQ ---------------------------------------------------------------------- */

export const SM_FAQ = {
  eyebrow: "FAQ",
  title: "Questions About Social Media Marketing",
  lede: "What businesses ask before handing over the calendar.",
  items: [
    {
      question: "Do you write the captions, or do we?",
      answer:
        "We write them, in your business's own voice, and send the week's calendar for a quick approval before anything goes live - so you always see it before your audience does.",
    },
    {
      question: "Where do the photos and video come from?",
      answer:
        "A mix: content you send us from the field, photos we take or source, and simple on-site shoots for businesses that want more original video. We'll say what mix makes sense on the first call.",
    },
    {
      question: "Which platforms should we actually be on?",
      answer:
        "Usually two or three, not five. We recommend the platforms your customers are actually active on rather than running every account by default - a well-run pair beats five neglected ones.",
    },
    {
      question: "Do you handle the comments and messages too?",
      answer:
        "Yes - checked and answered on a daily cadence. Anything that needs a business decision or looks like a real enquiry gets flagged to you or routed straight into your CRM.",
    },
    {
      question: "Can you fix an account that's gone quiet?",
      answer:
        "That's one of the most common calls we get. We rebuild the calendar and bring the cadence back on a schedule rather than posting a single catch-up burst and going quiet again.",
    },
    {
      question: "How is this different from paid ads?",
      answer:
        "This is the organic account - the calendar, the posts, the replies. Paid ads are a separate spend on top of it. Plenty of businesses run this on its own; some add ads once the account has a consistent base.",
    },
  ],
  card: {
    eyebrow: "Let's talk",
    title: "What's your account missing right now?",
    body: "Tell us what platforms you're on and how long it's been since the last real post. We'll say what a working calendar would look like.",
    cta: { label: "Get Free Consultation", to: "/book", icon: "arrowRight" },
  },
};
