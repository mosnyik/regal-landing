import {
  audience,
  cohort,
  curriculum,
  enrolmentStatus,
  faqs,
  heroPoints,
  roles,
  site,
  testimonial,
  webinars,
} from "@/content/site";
import { ContactForm } from "@/components/ContactForm";
import { EnrolButton } from "@/components/Enroll";
import { Icons } from "@/components/Icons";
import { WebinarCard } from "@/components/Webinar";

const fmt = (iso: string) =>
  new Intl.DateTimeFormat("en-US", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(iso),
  );

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

export default function Home() {
  const isOpen = enrolmentStatus === "open";
  const starts = fmt(cohort.trainingStarts);
  const showWebinar = webinars.enabled && webinars.items.length > 0;

  return (
    <main id="top">
      {/* ---------------------------------------------------------- HERO */}
      <section className={`hero${showWebinar ? " has-aside" : ""}`} aria-labelledby="hero-title">
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
              <a className="btn btn-lg btn-outline" href="#programmes">
                See the curriculum {Icons.arrowDown}
              </a>
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

          {showWebinar && (
            <div className="hero-aside rise" style={{ ["--d" as string]: 3 }}>
              <WebinarCard items={webinars.items} />
            </div>
          )}
        </div>
      </section>

      {/* --------------------------------------------------------- ROLES */}
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

      {/* ------------------------------------------- PROGRAMME APPROACH */}
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

      {/* ------------------------------------------------ WHO IS THIS FOR */}
      <section className="section who dark" id="who" aria-labelledby="who-title">
        <div className="wrap who-grid">
          <div className="section-head who-head">
            <p className="eyebrow">Who it&apos;s for</p>
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

      {/* ---------------------------------------------- WHAT YOU WILL LEARN */}
      <section className="section learn" id="programmes" aria-labelledby="learn-title">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">The programme</p>
            <h2 id="learn-title">What You Will Learn</h2>
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

      {/* ----------------------------------------------- TESTIMONIALS */}
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

      {/* ---------------------------------------------- COHORT / ENROLMENT */}
      <section className="section cohort dark" id="enrol" aria-labelledby="cohort-title">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Upcoming cohort</p>
            <h2 id="cohort-title">Your GRC Journey Starts Here.</h2>
            <p className="sub">
              Cohorts run twice a year, in Spring and Fall. The {cohort.season} cohort is below; {cohort.nextSeason}{" "}
              dates will be announced soon.
            </p>
          </div>

          <article className="cohort-card" id="upcoming-cohorts">
            <header>
              <h3>{cohort.name}</h3>
              <span className={`status-pill${isOpen ? "" : " is-closed"}`}>
                {isOpen ? "Enrolment open" : "Enrolment closed"}
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
                <dt>Late enrolment closes</dt>
                <dd>{fmt(cohort.lateEnrolmentCloses)}</dd>
              </div>
              <div>
                <dt>Format</dt>
                <dd>{cohort.format}</dd>
              </div>
            </dl>
            <footer className="cohort-cta">
              <div>
                <h3>Ready to Start Your GRC Journey?</h3>
                <p>
                  {isOpen
                    ? "Twelve weeks from now, you could be applying for GRC roles with real projects to show for it."
                    : `Enrolment for this cohort is closed. Join the waitlist and we'll email you when enrolment opens for the ${cohort.nextSeason} cohort.`}
                </p>
              </div>
              <div className="cohort-actions">
                <a className="btn btn-lg btn-outline" href="#contact">
                  Talk to us first
                </a>
                <EnrolButton className="btn btn-lg" icon={Icons.arrowRight} />
              </div>
            </footer>
          </article>
        </div>
      </section>

      {/* ---------------------------------------------------------- FAQ */}
      <section className="section faq" id="faq" aria-labelledby="faq-title">
        <div className="wrap faq-grid">
          <div className="faq-intro">
            <p className="eyebrow">FAQ</p>
            <h2 id="faq-title">Questions before you enrol</h2>
            <p className="sub">Can&apos;t find your answer? Message us and we&apos;ll reply by email.</p>
            <a className="btn btn-sm btn-outline" href="#contact">
              Ask a question
            </a>
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

      {/* -------------------------------------------------- CONTACT */}
      <section className="section contact" id="contact" aria-labelledby="contact-title">
        <div className="wrap contact-stack">
          <div className="contact-info">
            <h2 id="contact-title" className="eyebrow">
              Contact us
            </h2>
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

      {/* Mobile action bar */}
      <div className="actionbar">
        <span>
          <b>{isOpen ? cohort.name : "Enrolment closed"}</b>
          <br />
          {isOpen ? `Starts ${starts}` : "Join the waitlist"}
        </span>
        <EnrolButton className="btn btn-sm" />
      </div>
    </main>
  );
}
