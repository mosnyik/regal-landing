/**
 * Regal Cyber Academy — site content.
 *
 * Everything the academy is expected to change (enrolment status, cohort dates,
 * price, FAQ, testimonial, contact email) lives in this one file so it can later
 * be moved to a CMS without touching any components.
 *
 * Values in [square brackets] are placeholders from the design that MUST be
 * replaced before launch. They are rendered as-is so they're easy to spot.
 */

export type EnrolmentStatus = "open" | "closed";

/**
 * Site-wide enrolment switch. Controls every enrol button (header, hero,
 * cohort card, final CTA, footer). Can be overridden per deployment with the
 * ENROLMENT_STATUS env var ("open" | "closed") without a code change.
 */
export const enrolmentStatus: EnrolmentStatus = process.env.ENROLMENT_STATUS === "closed" ? "closed" : "open";

export const site = {
  name: "Regal Cyber Academy",
  shortName: "Regal",
  description:
    "Live, practical Governance, Risk and Compliance training that takes beginners to work-ready in 12 weeks.",
  contactEmail: "admin@regalcyberacademy.com",
  // TODO: confirm the enrolment notification email
  enrolmentEmail: "admin@regalcyberacademy.com",
  /** Cohort times are shown in this time zone. */
  timeZone: "America/New_York",
  // Payment: Stripe Checkout — configured with env vars, see lib/stripe.ts.
};

export const cohort = {
  /** Shown on the site. Kept year-free so it can be reused each cycle — just update the dates below. */
  name: "Spring Cohort",
  season: "Spring",
  nextSeason: "Fall",
  lateEnrolmentCloses: "2027-02-20",
  trainingStarts: "2027-01-25",
  duration: "12 weeks",
  format: "Live online",};

/**
 * Internal cohort label for enrolment records and Stripe metadata. Includes the
 * year (from trainingStarts) so records from different years stay distinct.
 */
export const cohortRecordLabel = `${cohort.name} ${cohort.trainingStarts.slice(0, 4)}`;

/** Lead instructor card. */
export const instructor = {
  name: "Debbie Ibinayo",
  role: "Lead Instructor",
  credential: "CRISC",
  experience: "10 years in GRC",
  /** Path under /public, e.g. "/brand/debbie.jpg". Leave null to show the placeholder. */
  photo: null as string | null,
};

/* ------------------------------------------------------------------ */
/* Webinars & events                                                   */
/* ------------------------------------------------------------------ */

export type Webinar = {
  id: string;
  title: string;
  description: string;
  /** ISO date-time of the start (UTC), e.g. "2026-12-12T00:00:00Z" = Dec 11, 7:00 PM ET. */
  start: string;
  /** Optional ISO end. Defaults to 2 hours after start. Used to hide the webinar once it's over. */
  end?: string;
  /** Human-readable time, e.g. "7:00 PM – 8:30 PM ET". */
  timeLabel: string;
  /** Where people sign up (Zoom, Eventbrite, Google Form…). */
  registrationUrl: string;
  /** Short label above the title. */
  label?: string;
};

/**
 * Webinar promotion — shows a banner at the top of every page, a card in the
 * hero and a "Webinars" link in the menu. The next upcoming webinar is shown;
 * past ones hide themselves automatically.
 *
 * Turn it all off by setting `enabled: false`, or without a code change by
 * setting the WEBINARS env var to "off" in Vercel and redeploying.
 */
export const webinars = {
  enabled: process.env.WEBINARS === "off" ? false : true,
  // TODO: SAMPLE webinar — replace title, date, time and registration link with the real one.
  items: [
    {
      id: "breaking-into-grc",
      label: "Free live webinar",
      title: "Breaking into GRC: Career Paths and Skills",
      description:
        "What GRC professionals actually do, the roles available and how to build the skills employers look for.",
      start: "2026-12-12T00:00:00Z",
      timeLabel: "7:00 PM – 8:30 PM ET",
      registrationUrl: "/#webinars",
    },
  ] as Webinar[],
};

/* ------------------------------------------------------------------ */

/** Short points under the hero buttons. */
export const heroPoints = [
  "Live classes, not recordings",
  "No GRC background required",
  "Portfolio-ready capstone project",
  "Resume and interview preparation",
];

export const roles = ["GRC Analyst", "Compliance Analyst", "Risk Analyst", "Security Analyst", "And other GRC related roles"];

/** "Who Is This For?" section. */
export const audience = {
  intro: "People come into GRC from many different backgrounds. Some of the most familiar include:",
  backgrounds: [
    "Project managers and business analysts",
    "Legal and compliance officers",
    "Banking and healthcare professionals",
    "IT support and other IT professionals",
    "Accountants and auditors",
  ],
  closing: "And anyone with an interest in ensuring compliance and improving processes.",
};

/** "What You Will Learn" section. */
export const curriculum = {
  intro:
    "Our curriculum gives you a clear, practical grounding in the core areas employers expect of a GRC professional.",
  areas: [
    {
      title: "Cyber/IT Governance, Risk, and Compliance",
      body: "Understand how organizations direct and oversee their IT and cybersecurity, manage technology-related risks, and meet legal, regulatory, and internal requirements.",
    },
    {
      title: "Regulations and Frameworks",
      body: "Explore the laws and regulations organizations must follow, and the standards and frameworks, including NIST and ISO 27001, they use to guide security and compliance.",
    },
    {
      title: "Third-Party Risk",
      body: "Learn how organizations identify, assess, monitor, and manage the risks that come from vendors, suppliers, and other external partners who access their systems, data, or services.",
    },
    {
      title: "AI Risk Management",
      body: "Understand how the risks of using artificial intelligence, including bias, security, privacy, and accountability concerns, are identified, assessed, and managed.",
    },
    {
      title: "Internal Risk Assessment and Risk Treatment",
      body: "Learn how to identify, analyze, and evaluate risks within an organization, then choose and apply a response: reduce, transfer, avoid, or accept the risk.",
    },
    {
      title: "Policy and Controls",
      body: "Understand how organizations develop policies and procedures, and how they implement, test, and monitor controls to reduce risk and meet compliance requirements.",
    },
  ],
};

/** TODO: replace with a real learner result. Only use a photo/name with permission. */
export const testimonial = {
  quote:
    "[A specific result in the learner's words: e.g. what they could do, or the role they landed, after the programme.]",
  name: "[Learner name]",
  initials: "LN",
  detail: "[Now: job title, company] · [Cohort]",
};

export type Faq = { q: string; a: string };

/** FAQ — wording from the website blueprint. */
export const faqs: Faq[] = [
  {
    q: "Do I need technical or GRC background?",
    a: "No. You don’t need a technical or GRC background, and people move into GRC from many fields, including finance, healthcare, legal, and project management.",
  },
  {
    q: "I’m a recent graduate. Can I enroll?",
    a: "Yes. Work experience is optional on the enrollment form.",
  },
  {
    q: "How long is the program?",
    a: "The program runs 12 weeks.",
  },
  {
    q: "How often do cohorts run?",
    a: "Twice a year, with a Spring cohort and a Fall cohort.",
  },
  {
    q: "Are classes live or recorded?",
    a: "Classes are live and taught by instructors. They are not recorded lessons.",
  },
  {
    q: "What if enrollment is closed?",
    a: "Join the waitlist and we’ll email you when enrollment opens for the next cohort.",
  },
  {
    q: "What is the capstone project?",
    a: "It’s a practical project where you apply what you’ve learned throughout the program, and you finish with work you can show employers.",
  },
];
