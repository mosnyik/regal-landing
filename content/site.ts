/**
 * Regal Cyber Academy — site content.
 *
 * Everything the academy is expected to change (enrollment status, cohort dates,
 * events, testimonials, contact email) lives in this one file so it can later be
 * moved to a CMS without touching any components.
 *
 * Anything marked TODO is a placeholder from the blueprint ("[TO BE PROVIDED]")
 * or sample content that MUST be replaced before launch.
 */

export type EnrolmentStatus = "open" | "closed";

/**
 * Site-wide enrollment switch. Controls every enroll button (header, hero,
 * Section 5, final CTA, footer). Can be overridden per deployment with the
 * ENROLMENT_STATUS env var ("open" | "closed") without a code change.
 */
export const enrolmentStatus: EnrolmentStatus =
  process.env.ENROLMENT_STATUS === "closed"
    ? "closed"
    : process.env.ENROLMENT_STATUS === "open"
      ? "open"
      : "open";

export const site = {
  name: "Regal Cyber Academy",
  shortName: "Regal",
  description:
    "Practical Governance, Risk and Compliance training through live instructor-led sessions, hands-on labs, real-world examples and practical projects.",
  // TODO: [TO BE PROVIDED] official academy email
  contactEmail: "info@regalcyberacademy.com",
  // TODO: [TO BE PROVIDED] enrollment notification email
  enrolmentEmail: "enroll@regalcyberacademy.com",
  /** Event and cohort times are shown in this time zone. */
  timeZone: "America/New_York",
  // Payment: Stripe Checkout — configured with env vars, see lib/stripe.ts.
};

export const cohort = {
  name: "Spring 2027 Cohort",
  enrolmentOpens: null as string | null, // TODO: [TO BE PROVIDED] e.g. "2026-10-01"
  regularDeadline: null as string | null, // TODO: [TO BE PROVIDED]
  lateEnrolmentCloses: "2027-02-20",
  trainingStarts: "2027-01-25",
  trainingStartsAt: "2027-01-25T23:00:00Z", // 6:00 PM ET — used by the countdown
  duration: "12 weeks",
  seats: 40, // shown on the hero seal; set to null to hide
};

/** Tools & frameworks ticker (Section 4). TODO: confirm the exact list with the academy. */
export const tools = [
  "NIST CSF 2.0",
  "ISO/IEC 27001",
  "NIST AI RMF",
  "SOC 2",
  "COBIT",
  "NIST SP 800-53",
  "PCI DSS",
  "SOX",
  "HIPAA",
  "ISO 31000",
  "GRC Platforms",
  "Risk Registers",
  "Vendor Questionnaires",
];

export type EventItem = {
  id: string;
  title: string;
  description: string;
  /** ISO date-time of the start, used to auto-label past events "Completed". */
  start: string;
  /** Human readable time + time zone, e.g. "7:00 PM – 8:30 PM ET". */
  timeLabel: string;
  format?: string;
  registrationUrl: string;
  /** Force an event to show as completed regardless of date. */
  completed?: boolean;
};

/** TODO: sample events — replace with real ones. Add, edit or remove entries here. */
export const events: EventItem[] = [
  {
    id: "grc-career-paths",
    title: "Breaking into GRC: Career Paths and Skills",
    description:
      "A live session on what GRC professionals actually do, the roles available and how to build the skills employers look for.",
    start: "2026-12-13T00:00:00Z", // Dec 12, 7:00 PM ET
    timeLabel: "7:00 PM – 8:30 PM ET",
    format: "Live online webinar",
    registrationUrl: "https://example.com/register/grc-career-paths",
  },
  {
    id: "ai-risk-101",
    title: "AI Risk 101: Governing AI Responsibly",
    description:
      "An introduction to the governance, accountability and compliance questions organizations face when adopting AI.",
    start: "2027-01-09T18:00:00Z", // Jan 9, 1:00 PM ET
    timeLabel: "1:00 PM – 2:00 PM ET",
    format: "Live online webinar",
    registrationUrl: "https://example.com/register/ai-risk-101",
  },
  {
    id: "info-session-fall",
    title: "Fall Cohort Information Session",
    description:
      "Meet the instructors, see how the program runs and get your questions about enrollment answered.",
    start: "2026-09-05T16:00:00Z", // Sep 5, 12:00 PM ET
    timeLabel: "12:00 PM – 1:00 PM ET",
    format: "Live online",
    registrationUrl: "https://example.com/register/info-session",
  },
];

export type Testimonial = {
  name: string;
  quote: string;
  program?: string;
  /** Optional — only include with the learner's permission. Path under /public. */
  photo?: string;
};

/** TODO: SAMPLE testimonials — replace with real learner feedback before launch. */
export const testimonials: Testimonial[] = [
  {
    name: "Sample Learner A",
    program: "Fall 2026 Cohort",
    quote:
      "The live sessions made the frameworks click for me. Working through the labs meant I could talk about risk assessments with real confidence in interviews.",
  },
  {
    name: "Sample Learner B",
    program: "Fall 2026 Cohort",
    quote:
      "I came from an operations background with no GRC experience. The capstone project gave me something concrete to show employers.",
  },
  {
    name: "Sample Learner C",
    program: "Spring 2026 Cohort",
    quote:
      "Third-party and AI risk were the modules I didn't know I needed. The instructors connected every topic back to how organizations actually work.",
  },
];
