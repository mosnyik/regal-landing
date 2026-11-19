import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  audience,
  cohort,
  curriculum,
  enrolmentStatus,
  faqs,
  heroPoints,
  instructor,
  roles,
  site,
  testimonial,
  webinars,
} from "@/content/site";
import { ContactForm } from "./ContactForm";
import { EnrolButton } from "./Enroll";
import { Icons } from "./Icons";
import { WebinarCard } from "./Webinar";

/*
 * Every page section lives here so the pages (Home, Programmes, Events &
 * Webinars, FAQ, Contact) can be assembled from the same building blocks.
 */

const fmt = (iso: string) =>
  new Intl.DateTimeFormat("en-US", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(iso),
  );

const isOpen = enrolmentStatus === "open";
const starts = fmt(cohort.trainingStarts);
export const showWebinars = webinars.enabled && webinars.items.length > 0;

const APPROACH = [
  {
    icon: Icons.video,
    title: "Live Instructor-Led Sessions",
    body: "Learn in real time with an instructor who explains, discusses and answers your questions. No pre-recorded video library.",
  },
  {
    icon: Icons.terminal,
    title: "Hands-On Practical Labs",
    body: "Apply each concept in guided exercises, so you practise the work instead of only reading about it.",
  },
  {
    icon: Icons.award,
    title: "Capstone Project",
    body: "Bring it all together in a practical project you can present to employers as proof of skill.",
  },
];

const AUDIENCE_ICONS = [Icons.briefcase, Icons.scale, Icons.governance, Icons.monitor, Icons.calculator];
const CURRICULUM_ICONS = [Icons.cyber, Icons.compliance, Icons.thirdParty, Icons.ai, Icons.risk, Icons.policy];

/** Title band at the top of the inner pages. */
export function PageHeader({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <header className="page-head">
      <div className="wrap">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {children && <p className="sub">{children}</p>}
      </div>
    </header>
  );
}

export function Hero() {
  return (
    <section className={`hero${showWebinars ? " has-aside" : ""}`} aria-labelledby="hero-title">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="hero-eyebrow rise">
            {site.name}
            {isOpen && <span> · Next cohort starts {starts}</span>}
          </p>
          <h1 id="hero-title" className="rise" style={{ ["--d" as string]: 1 }}>
            GRC Academy
          </h1>
          <p className="hero-promise rise" style={{ ["--d" as string]: 2 }}>
            Governance, Risk and Compliance
          </p>
          <p className="hero-lede rise" style={{ ["--d" as string]: 3 }}>
            Regal Cyber Academy teaches GRC through a focused curriculum, real-world enterprise scenarios and
            hands-on labs, led by experienced professionals. Built for career changers, early-career professionals
            and anyone moving into cybersecurity.
          </p>
          <div className="hero-actions rise" style={{ ["--d" as string]: 4 }}>
            <Link className="btn btn-lg btn-outline" href="/programmes">
              See the curriculum {Icons.arrowRight}
            </Link>
            <EnrolButton className="btn btn-lg" icon={Icons.arrowRight} />
          </div>
          <ul className="hero-points rise" style={{ ["--d" as string]: 5 }}>
            {heroPoints.map((p) => (
              <li key={p}>
                <span className="tick" aria-hidden="true">
                  {Icons.check}
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>

        {showWebinars && (
          <div className="hero-aside rise" style={{ ["--d" as string]: 3 }}>
            <WebinarCard items={webinars.items} />
          </div>
        )}
      </div>
    </section>
  );
}

export function Roles() {
  return (
    <section className="roles" aria-labelledby="roles-title">
      <div className="wrap roles-inner">
        <h2 id="roles-title" className="eyebrow">
          Roles this prepares you for
        </h2>
        <ul className="pills">
          {roles.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Approach() {
  return (
    <section className="section approach" aria-labelledby="approach-title">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">Our Programme Approach</p>
          <h2 id="approach-title">
            Taught live. Practised hands-on.
            <br />
            Proven with real work.
          </h2>
        </div>
        <ul className="grid-3">
          {APPROACH.map((c) => (
            <li key={c.title} className="card card-soft">
              <span className="icon-tile">{c.icon}</span>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function WhoItsFor() {
  return (
    <section className="section who dark" id="who" aria-labelledby="who-title">
      <div className="wrap who-grid">
        <div className="section-head who-head">
          <h2 id="who-title">Who Is This For?</h2>
          <p className="sub">{audience.intro}</p>
        </div>
        <div className="who-list">
          <ul>
            {audience.backgrounds.map((b, i) => (
              <li key={b}>
                <span className="icon-tile">{AUDIENCE_ICONS[i % AUDIENCE_ICONS.length]}</span>
                {b}
              </li>
            ))}
          </ul>
          <p className="who-closing">
            <span className="icon-tile">{Icons.spark}</span>
            {audience.closing}
          </p>
        </div>
      </div>
    </section>
  );
}

/** Pass `as="h1"` when this is the main section of the page. */
export function Curriculum({ as: Heading = "h2" }: { as?: "h1" | "h2" }) {
  return (
    <section className="section learn" id="curriculum" aria-labelledby="learn-title">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">The programme</p>
          <Heading id="learn-title">What You Will Learn</Heading>
          <p className="sub">{curriculum.intro}</p>
        </div>
        <ol className="grid-3">
          {curriculum.areas.map((a, i) => (
            <li key={a.title} className="card card-line area">
              <div className="area-top">
                <span className="icon-tile">{CURRICULUM_ICONS[i % CURRICULUM_ICONS.length]}</span>
                <span className="area-num">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3>{a.title}</h3>
              <p>{a.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Instructor() {
  return (
    <section className="section instructor" id="instructor" aria-labelledby="instructor-name">
      <div className="wrap">
        <article className="instructor-card">
          <div className="instructor-photo">
            {instructor.photo ? (
              <Image src={instructor.photo} alt={instructor.name} fill sizes="(max-width: 820px) 92vw, 460px" />
            ) : (
              <span className="photo-placeholder">
                {Icons.user}
                <span>[Instructor photo]</span>
              </span>
            )}
          </div>
          <div className="instructor-body">
            <p className="eyebrow">Your lead instructor</p>
            <h2 id="instructor-name">{instructor.name}</h2>
            <p className="muted">{instructor.role}</p>
            <ul className="tags">
              <li>{instructor.credential}</li>
              <li>{instructor.experience}</li>
            </ul>
          </div>
        </article>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="section testimonial" id="testimonials" aria-labelledby="testimonials-title">
      <div className="wrap">
        <h2 id="testimonials-title" className="center">
          Testimonials
        </h2>
        <figure className="quote">
          <blockquote>
            <p>&ldquo;{testimonial.quote}&rdquo;</p>
          </blockquote>
          <figcaption>
            <span className="avatar" aria-hidden="true">
              {testimonial.initials}
            </span>
            <span>
              <strong>{testimonial.name}</strong>
              <small>{testimonial.detail}</small>
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export function Cohort() {
  return (
    <section className="section cohort dark" id="enroll" aria-labelledby="cohort-title">
      <div className="wrap">
        <div className="section-head">
          <h2 id="cohort-title">Your GRC Journey Starts Here.</h2>
          <p className="sub">
            Our program runs twice a year, with a Spring cohort and a Fall cohort. Enroll in the upcoming cohort to
            start building practical GRC skills.
          </p>
        </div>

        <article className="cohort-card" id="upcoming-cohorts">
          <header>
            <h3>{cohort.name}</h3>
            <span className={`status-pill${isOpen ? "" : " is-closed"}`}>
              {isOpen ? "Now enrolling" : "Enrollment closed"}
            </span>
          </header>
          <dl>
            <div>
              <dt>Training starts</dt>
              <dd>{starts}</dd>
            </div>
            <div>
              <dt>Duration</dt>
              <dd>{cohort.duration}</dd>
            </div>
            <div>
              <dt>Late enrollment closes</dt>
              <dd>{fmt(cohort.lateEnrolmentCloses)}</dd>
            </div>
            <div>
              <dt>Format</dt>
              <dd>{cohort.format}</dd>
            </div>
          </dl>
          <footer className="cohort-cta">
            <div className="cohort-actions">
              <EnrolButton className="btn btn-lg" icon={Icons.arrowRight} />
              <Link className="btn btn-lg btn-outline" href="/contact">
                Talk to us first
              </Link>
            </div>
          </footer>
        </article>
      </div>
    </section>
  );
}

/** Pass `as="h1"` when this is the main section of the page. */
export function Faq({ as: Heading = "h2" }: { as?: "h1" | "h2" }) {
  return (
    <section className="section faq" id="faq" aria-labelledby="faq-title">
      <div className="wrap faq-grid">
        <div className="faq-intro">
          <p className="eyebrow">FAQ</p>
          <Heading id="faq-title">Questions before you enroll</Heading>
          <p className="sub">
            Can&apos;t find your answer? <Link href="/contact">Message us</Link> and we&apos;ll reply by email.
          </p>
        </div>
        <div className="faq-list">
          {faqs.map((f, i) => (
            <details key={f.q} name="faq" open={i === 0}>
              <summary>
                {f.q}
                <span className="faq-toggle" aria-hidden="true">
                  {Icons.plus}
                </span>
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section className="section contact" id="contact" aria-label="Contact us">
      <div className="wrap contact-stack">
        <div className="contact-info">
          <a className="mail-card" href={`mailto:${site.contactEmail}`}>
            <span className="icon-tile">{Icons.mail}</span>
            <span>
              <small>Email</small>
              <strong>{site.contactEmail}</strong>
            </span>
          </a>
        </div>
        <div className="contact-form">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

/** Sticky enroll bar shown on phones. */
export function ActionBar() {
  return (
    <div className="actionbar">
      <span>
        <b>{isOpen ? cohort.name : "Enrollment closed"}</b>
        <br />
        {isOpen ? `Starts ${starts}` : "Join the waitlist"}
      </span>
      <EnrolButton className="btn btn-sm" />
    </div>
  );
}
