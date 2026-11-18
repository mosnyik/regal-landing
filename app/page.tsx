import Image from "next/image";
import {
  cohort,
  enrolmentStatus,
  faqs,
  frameworks,
  included,
  instructor,
  roles,
  site,
  testimonial,
} from "@/content/site";
import { ContactForm } from "@/components/ContactForm";
import { EnrolButton } from "@/components/Enroll";
import { Icons } from "@/components/Icons";

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
    icon: Icons.exam,
    title: "Real Exams",
    body: "Check your progress with exam-style assessments.",
    // TODO: confirm exam format with the academy
    todo: "[Confirm exam format]",
  },
  {
    icon: Icons.award,
    title: "Capstone Project",
    body: "Bring it all together in a practical project you can present to employers as proof of skill.",
  },
];

const MODULES = [
  {
    icon: Icons.governance,
    title: "Corporate Governance",
    body: "How organisations are directed and overseen: the principles, structures and accountability behind good decisions.",
  },
  {
    icon: Icons.compliance,
    title: "Regulations and Compliance",
    body: "Map regulatory obligations and track how an organisation meets the standards that apply to it.",
  },
  {
    icon: Icons.risk,
    title: "Risk Management",
    body: "Identify, assess and treat the risks that threaten an organisation's objectives, operations and reputation.",
  },
  {
    icon: Icons.cyber,
    title: "Cybersecurity Risk",
    body: "Translate cyber threats into business impact that leaders can understand and act on.",
  },
  {
    icon: Icons.it,
    title: "IT Governance, Risk and Compliance",
    body: "Govern technology, manage IT-related risk and keep systems compliant with the requirements that apply.",
  },
  {
    icon: Icons.ai,
    title: "AI Risk",
    body: "Assess how organisations use AI for accountability, data and compliance risks, and manage them responsibly.",
  },
  {
    icon: Icons.thirdParty,
    title: "Third-Party Risk",
    body: "Assess vendors, suppliers and partners before their risks become your organisation's risks.",
  },
];

/** 5×5 heat map: level rises with likelihood (up) and impact (right). Outlined cells are "flagged" risks. */
const HEAT = Array.from({ length: 25 }, (_, i) => {
  const row = Math.floor(i / 5);
  const col = i % 5;
  return { level: 4 - row + col, flagged: (row === 0 && col === 4) || (row === 2 && col === 2) || (row === 4 && col === 1) };
});

const RISKS = [
  { name: "Third-party data access", status: "Assessing" },
  { name: "AI model governance", status: "Mitigating" },
  { name: "Regulatory compliance", status: "Monitored" },
];

export default function Home() {
  const isOpen = enrolmentStatus === "open";
  const starts = fmt(cohort.trainingStarts);

  return (
    <main id="top">
      {/* ---------------------------------------------------------- HERO */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="badge rise">
              <span className="badge-dot" aria-hidden="true" />
              GRC Academy · {isOpen ? `Next cohort starts ${starts}` : "Next cohort coming soon"}
            </p>
            <h1 id="hero-title" className="rise" style={{ ["--d" as string]: 1 }}>
              Go from beginner to work-ready in <span className="accent">Governance, Risk and Compliance.</span>
            </h1>
            <p className="hero-lede rise" style={{ ["--d" as string]: 2 }}>
              A {cohort.duration.replace(" weeks", "-week")}, live instructor-led programme with hands-on labs,
              real-world examples and a capstone project you can show employers.
            </p>
            <div className="hero-actions rise" style={{ ["--d" as string]: 3 }}>
              <EnrolButton className="btn btn-lg" icon={Icons.arrowRight} />
              <a className="btn btn-lg btn-outline-light" href="#programmes">
                See the curriculum {Icons.arrowDown}
              </a>
            </div>
            <div className="instructor-chip rise" style={{ ["--d" as string]: 4 }}>
              <span className="avatar" aria-hidden="true">
                {instructor.initials}
              </span>
              <span>
                <strong>
                  Taught live by {instructor.name}, {instructor.credential}
                </strong>
                <small>{instructor.experienceLong}</small>
              </span>
            </div>
          </div>

          <div className="hero-visual rise" style={{ ["--d" as string]: 2 }}>
            <figure className="register">
              <div className="register-head">
                <div>
                  <p className="eyebrow">Risk register</p>
                  <p className="register-title">Enterprise risk heat map</p>
                </div>
                <span className="register-dots" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
              </div>
              <div
                className="heat"
                role="img"
                aria-label="Illustration: a five by five risk heat map of likelihood against impact"
              >
                <span className="heat-y">Likelihood</span>
                <div className="heat-grid">
                  {HEAT.map((c, i) => (
                    <span key={i} className={`l${c.level}${c.flagged ? " is-flagged" : ""}`} />
                  ))}
                </div>
                <span className="heat-x">Impact</span>
              </div>
              <ul className="register-rows">
                {RISKS.map((r) => (
                  <li key={r.name}>
                    {r.name}
                    <span className="status">{r.status}</span>
                  </li>
                ))}
              </ul>
              <figcaption>The kind of work you&apos;ll do in labs and your capstone.</figcaption>
            </figure>
            <ul className="checks">
              <li>{Icons.check} Live classes, not recordings</li>
              <li>{Icons.check} No GRC background needed</li>
              <li>{Icons.check} Portfolio-ready capstone</li>
            </ul>
          </div>
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

      {/* -------------------------------------------- HOW LEARNING WORKS */}
      <section className="section approach" aria-labelledby="approach-title">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">How learning works</p>
            <h2 id="approach-title">
              Taught live. Practised hands-on.
              <br />
              Proven with real work.
            </h2>
          </div>
          <ul className="grid-4">
            {APPROACH.map((c) => (
              <li key={c.title} className="card card-soft">
                <span className="icon-tile icon-dark">{c.icon}</span>
                <h3>{c.title}</h3>
                <p>
                  {c.body}
                  {c.todo && (
                    <>
                      {" "}
                      <mark className="todo">{c.todo}</mark>
                    </>
                  )}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------ ABOUT */}
      <section className="section about" id="about" aria-labelledby="about-title">
        <div className="wrap about-grid">
          <div className="about-copy">
            <p className="eyebrow eyebrow-mint">Who&apos;s behind Regal Cyber</p>
            <h2 id="about-title">More Than Learning. Building Practical GRC Competence.</h2>
            <p>
              GRC is learned by doing, not by memorising theory. That&apos;s why every module pairs structured
              instruction with practical exercises, industry tools and real-world scenarios.
            </p>
            <p className="about-commit">
              Our commitment: GRC knowledge that is practical, accessible and relevant to the work you&apos;ll
              actually do.
            </p>
            <Image
              className="about-photo"
              src="/brand/building-sign.jpg"
              alt="Regal Cyber Academy sign on the front of a building"
              width={1137}
              height={372}
              sizes="(max-width: 960px) 92vw, 520px"
            />
          </div>

          <article className="instructor-card" aria-labelledby="instructor-name">
            <div className="instructor-photo">
              {instructor.photo ? (
                <Image src={instructor.photo} alt={instructor.name} fill sizes="(max-width: 960px) 92vw, 480px" />
              ) : (
                <span className="photo-placeholder">
                  {Icons.user}
                  <span>[Instructor photo]</span>
                </span>
              )}
            </div>
            <div className="instructor-body">
              <p className="eyebrow">Your lead instructor</p>
              <h3 id="instructor-name">{instructor.name}</h3>
              <p className="muted">{instructor.role}</p>
              <ul className="tags">
                <li>{instructor.credential}</li>
                <li>{instructor.experience}</li>
              </ul>
            </div>
          </article>
        </div>
      </section>

      {/* ---------------------------------------------- WHAT YOU WILL LEARN */}
      <section className="section learn" id="programmes" aria-labelledby="learn-title">
        <div className="wrap">
          <div className="learn-head">
            <div className="section-head">
              <p className="eyebrow">The programme</p>
              <h2 id="learn-title" className="h2-xl">
                What You Will Learn
              </h2>
              <p className="sub">Seven modules covering the areas employers expect a GRC professional to understand.</p>
            </div>
            <span className="pill pill-white">7 modules · {cohort.duration}</span>
          </div>
          <ol className="grid-4">
            {MODULES.map((m, i) => (
              <li key={m.title} className="card card-white module">
                <div className="module-top">
                  <span className="icon-tile icon-light">{m.icon}</span>
                  <span className="module-num">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3>{m.title}</h3>
                <p>{m.body}</p>
              </li>
            ))}
            <li className="card card-dark tools-card">
              <p className="eyebrow eyebrow-mint">Tools and frameworks</p>
              <h3>Work hands-on with what GRC teams use</h3>
              <ul className="tags tags-dark" aria-label="Tools and frameworks">
                {frameworks.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </li>
          </ol>
        </div>
      </section>

      {/* ----------------------------------------------- TESTIMONIAL */}
      <section className="section testimonial" id="testimonials" aria-label="What our learners say">
        <figure className="wrap quote">
          <span className="quote-mark" aria-hidden="true">
            &rdquo;
          </span>
          <blockquote>
            <p>{testimonial.quote}</p>
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
      </section>

      {/* ---------------------------------------------- COHORT / ENROLMENT */}
      <section className="section cohort" id="enrol" aria-labelledby="cohort-title">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Upcoming cohort</p>
            <h2 id="cohort-title">Your GRC Journey Starts Here.</h2>
            <p className="sub">
              Cohorts run twice a year, in Spring and Fall. {cohort.season} is below; {cohort.nextSeason} dates
              will be announced soon.
            </p>
          </div>

          <div className="cohort-grid">
            <article className="cohort-card" id="upcoming-cohorts">
              <header>
                <h3>{cohort.name}</h3>
                <span className={`status-pill${isOpen ? "" : " is-closed"}`}>
                  <span className="badge-dot" aria-hidden="true" />
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
              {!isOpen && (
                <p className="cohort-note">
                  Enrolment for this cohort is closed. Join the waitlist and we&apos;ll email you when enrolment opens
                  for {cohort.nextSeason}.
                </p>
              )}
            </article>

            <article className="price-card" aria-labelledby="price-title">
              <p className="eyebrow">Programme fee</p>
              <p className="price" id="price-title">
                {cohort.price}
              </p>
              <ul className="included">
                {included.map((x) => (
                  <li key={x}>
                    {Icons.check}
                    {x}
                  </li>
                ))}
              </ul>
              <EnrolButton className="btn btn-lg btn-block" />
              <ul className="fine">
                <li>{Icons.lock} Secure payment via Stripe</li>
                <li>
                  {Icons.refund} {cohort.refundNote}
                </li>
              </ul>
            </article>
          </div>
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

      {/* ------------------------------------------------ FINAL CTA */}
      <section className="final" aria-labelledby="final-title">
        <div className="wrap">
          <div className="final-card">
            <div className="final-copy">
              <h2 id="final-title">Ready to Start Your GRC Journey?</h2>
              <p>
                Twelve weeks from now, you could be applying for GRC roles with real projects to show for it.{" "}
                {isOpen ? `The next cohort starts ${starts}.` : "Join the waitlist to hear when the next cohort opens."}
              </p>
              <div className="final-actions">
                <EnrolButton className="btn btn-white" />
                <a className="btn btn-outline-light" href="#contact">
                  Talk to us first
                </a>
              </div>
            </div>
            <div className="final-photo">
              <Image
                src="/brand/mockup-polo.jpg"
                alt="Regal Cyber Academy logo embroidered on a green polo shirt"
                fill
                sizes="(max-width: 960px) 92vw, 380px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- CONTACT */}
      <section className="section contact" id="contact" aria-labelledby="contact-title">
        <div className="wrap contact-grid">
          <div className="contact-info">
            <p className="eyebrow">Contact us</p>
            <h2 id="contact-title">Have a Question? Let&apos;s Talk.</h2>
            <p className="sub">
              Ask about the programme, the next cohort or whether it&apos;s right for you. A real person on our team
              will reply.
            </p>
            <a className="mail-card" href={`mailto:${site.contactEmail}`}>
              <span className="icon-tile icon-dark">{Icons.mail}</span>
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
