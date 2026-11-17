import Image from "next/image";
import { cohort, enrolmentStatus, events, site, testimonials, tools } from "@/content/site";
import { ContactForm } from "@/components/ContactForm";
import { Countdown } from "@/components/Countdown";
import { EnrolButton } from "@/components/Enroll";
import { EventsList } from "@/components/EventsList";
import { Icons } from "@/components/Icons";

const fmt = (iso: string | null) =>
  iso
    ? new Intl.DateTimeFormat("en-US", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
        new Date(iso),
      )
    : "To be announced";

const shortDate = (iso: string) =>
  new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(
    new Date(iso),
  );

const APPROACH = [
  {
    icon: Icons.live,
    title: "Live Instructor-Led Sessions",
    body: "Participate in live learning sessions where concepts are explained, discussed and explored. This is instructor-led learning, not a library of recorded lessons.",
    tag: "Not recorded",
  },
  {
    icon: Icons.lab,
    title: "Hands-On Practical Labs",
    body: "Work through practical exercises designed to help you apply GRC concepts rather than only learning theory.",
  },
  {
    icon: Icons.capstone,
    title: "Real Exams and Capstone Project",
    body: "Complete a practical project that allows you to apply the knowledge and skills developed throughout the learning experience.",
  },
  {
    icon: Icons.scenario,
    title: "Real-World Examples",
    body: "Learn through scenarios drawn from how organizations actually operate, so every concept connects to the work you will do.",
  },
];

const AREAS = [
  {
    icon: Icons.governance,
    title: "Corporate Governance",
    body: "Understand the principles, structures and processes organizations use to direct, manage and oversee their operations.",
  },
  {
    icon: Icons.compliance,
    title: "Regulations and Compliance",
    body: "Explore regulatory requirements, compliance obligations and how organizations work toward meeting applicable standards.",
  },
  {
    icon: Icons.risk,
    title: "Risk Management",
    body: "Learn how to identify, assess and manage risks that affect an organization's objectives, operations and reputation.",
  },
  {
    icon: Icons.cyber,
    title: "Cybersecurity Risk",
    body: "Understand cybersecurity risks, their potential business impact and the importance of managing them effectively.",
  },
  {
    icon: Icons.it,
    title: "IT Governance, Risk and Compliance",
    body: "Explore how organizations govern IT, manage technology-related risks and maintain compliance with relevant requirements.",
  },
  {
    icon: Icons.ai,
    title: "AI Risk",
    body: "Understand the risks that come with using artificial intelligence, including governance, accountability, data and compliance concerns, and how organizations work to manage them responsibly.",
  },
  {
    icon: Icons.thirdParty,
    title: "Third-Party Risk",
    body: "Learn how organizations identify, assess and manage the risks that come from working with vendors, suppliers and other external partners.",
  },
];

// Likelihood × impact for the hero heat map (1 = low, 5 = critical).
const HEAT = [
  [3, 4, 4, 5, 5],
  [2, 3, 4, 4, 5],
  [2, 2, 3, 4, 4],
  [1, 2, 2, 3, 4],
  [1, 1, 2, 2, 3],
];

export default function Home() {
  const isOpen = enrolmentStatus === "open";
  const seal = `REGAL CYBER ACADEMY • ${cohort.name.toUpperCase()} • `;

  return (
    <main id="top">
      {/* ---------------------------------------------------------- HERO */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-wordmark" aria-hidden="true">
          <div>GOVERNANCE RISK COMPLIANCE GOVERNANCE RISK COMPLIANCE</div>
          <div>REGAL CYBER ACADEMY REGAL CYBER ACADEMY REGAL CYBER</div>
          <div>GOVERNANCE RISK COMPLIANCE GOVERNANCE RISK COMPLIANCE</div>
        </div>

        <div className="sheet hero-sheet">
          <div className="hero-copy">
            <p className="kicker rise">Regal Cyber Academy</p>
            <h1 id="hero-title" className="headline rise" style={{ ["--d" as string]: 1 }}>
              <span className="headline-line">Governance,</span>
              <span className="headline-line">Risk and</span>
              <span className="headline-line">Compliance</span>
              <span className="headline-tag">(GRC) Academy</span>
            </h1>

            <p className="promise rise" style={{ ["--d" as string]: 2 }}>
              Build Practical GRC Skills.{" "}
              <span className="circled">
                Become Industry-Ready.
                <svg viewBox="0 0 300 80" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M12 46C30 12 140 4 230 10c60 4 70 24 58 40-18 22-150 30-230 18C10 60 2 40 40 22" />
                </svg>
              </span>
            </p>

            <div className="torn rise" style={{ ["--d" as string]: 3 }}>
              <span>{cohort.name}</span>
              <span className="torn-pin">{cohort.duration}</span>
            </div>

            <p className="lede rise" style={{ ["--d" as string]: 4 }}>
              Regal Cyber Academy equips learners with practical knowledge and skills in Governance, Risk and
              Compliance through live instructor-led sessions, hands-on labs, real-world examples and practical
              projects.
            </p>

            <div className="hero-actions rise" style={{ ["--d" as string]: 5 }}>
              <EnrolButton className="btn btn-lg" />
              <a className="textlink" href="#programs">
                See what you will learn
              </a>
            </div>

            {isOpen && (
              <div className="rise" style={{ ["--d" as string]: 6 }}>
                <p className="countdown-label">Training starts {fmt(cohort.trainingStarts)}</p>
                <Countdown to={cohort.trainingStartsAt} />
              </div>
            )}
          </div>

          <figure className="hero-visual rise" style={{ ["--d" as string]: 3 }}>
            <div className="heat" role="img" aria-label="Illustration: a five by five risk heat map of likelihood against impact">
              <div className="heat-head">
                <span>Risk Register</span>
                <span className="heat-dot">Live lab</span>
              </div>
              <div className="heat-body">
                <span className="heat-axis heat-y">Likelihood</span>
                <div className="heat-grid">
                  {HEAT.flat().map((v, i) => (
                    <span key={i} className={`h${v}`} />
                  ))}
                </div>
                <span className="heat-axis heat-x">Impact</span>
              </div>
              <ul className="heat-rows">
                <li>
                  <b>R-014</b> Third-party data access <em className="sev s5">Critical</em>
                </li>
                <li>
                  <b>R-022</b> Unmanaged AI tooling <em className="sev s4">High</em>
                </li>
                <li>
                  <b>R-031</b> Policy review overdue <em className="sev s2">Low</em>
                </li>
              </ul>
            </div>
            <figcaption>
              <strong>Hands-on</strong>
              <span>Real-world GRC labs</span>
            </figcaption>
            <svg className="seal" viewBox="0 0 200 200" aria-hidden="true">
              <defs>
                <path id="seal-c" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
              </defs>
              <circle cx="100" cy="100" r="96" />
              <text>
                <textPath href="#seal-c">{seal}</textPath>
              </text>
              <text className="seal-mid" x="100" y="112" textAnchor="middle">
                GRC
              </text>
              <text className="seal-sub" x="100" y="138" textAnchor="middle">
                {cohort.duration.toUpperCase()}
              </text>
            </svg>
          </figure>
        </div>
      </section>

      {/* -------------------------------------------------------- TICKER */}
      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[0, 1].map((k) => (
            <div key={k}>
              {AREAS.map((a) => (
                <span key={a.title}>{a.title}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* -------------------------------------------- HOW LEARNING WORKS */}
      <section className="approach" aria-labelledby="approach-title">
        <div className="wrap">
          <div className="section-head">
            <p className="kicker">How learning works</p>
            <h2 id="approach-title">
              Taught live. <span className="hl">Practiced</span> hands-on.
            </h2>
            <p className="sub">
              Our learning approach combines instructor-led teaching with practical application.
            </p>
          </div>
          <ul className="card-grid">
            {APPROACH.map((c, i) => (
              <li key={c.title} className={`card card-${i + 1}`}>
                <span className="card-icon">{c.icon}</span>
                {c.tag && <span className="card-tag">{c.tag}</span>}
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </li>
            ))}
          </ul>
          <div className="cta-band">
            <p>
              <strong>{cohort.name}</strong> starts {fmt(cohort.trainingStarts)}. {cohort.duration} of live,
              practical GRC training.
            </p>
            <EnrolButton className="btn btn-dark" />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------- WHAT YOU WILL LEARN */}
      <section className="learn" id="programs" aria-labelledby="learn-title">
        <div className="wrap learn-grid">
          <div className="section-head">
            <p className="kicker kicker-light">What you will learn</p>
            <h2 id="learn-title">Build a Foundation in the Core Disciplines of GRC.</h2>
            <p className="sub">
              Develop an understanding of the key areas that support effective governance, risk management and
              compliance.
            </p>
            <p className="learn-count" aria-hidden="true">
              07
              <span>learning areas</span>
            </p>
          </div>
          <ol className="areas">
            {AREAS.map((a, i) => (
              <li key={a.title}>
                <span className="area-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="area-icon">{a.icon}</span>
                <div>
                  <h3>{a.title}</h3>
                  <p>{a.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* -------------------------------------------------- TOOLS */}
      <section className="tools" aria-labelledby="tools-title">
        <div className="tools-rings" aria-hidden="true" />
        <div className="wrap tools-grid">
          <div className="section-head">
            <p className="kicker kicker-light">Industry tools and practical exposure</p>
            <h2 id="tools-title">Learn with Industry-Relevant Tools and Frameworks.</h2>
          </div>
          <div className="tools-body">
            <p>
              Learners will gain practical exposure to tools and frameworks used in GRC-related work.
            </p>
            <p className="tools-turn">
              The focus is on understanding how these resources support governance, risk management, compliance
              and cybersecurity activities.
            </p>
          </div>
        </div>
        <div className="wrap">
          <ul className="chips" aria-label="Examples of tools and frameworks">
            {tools.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------------------------------------- COHORT / ENROLLMENT */}
      <section className="cohort" id="enroll" aria-labelledby="cohort-title">
        <div className="wrap">
          <div className="section-head">
            <p className="kicker">Upcoming cohort</p>
            <h2 id="cohort-title">Your GRC Journey Starts Here.</h2>
            <p className="sub">
              Take the next step toward developing practical Governance, Risk and Compliance skills. Enroll in an
              upcoming Regal Cyber Academy cohort. Classes run twice a year, in the Spring and the Fall.
            </p>
          </div>

          <div className="cohort-grid">
            {isOpen ? (
              <article className="ticket">
                <span className="ticket-flag">Enrollment open</span>
                <p className="kicker kicker-light">Cohort</p>
                <h3>{cohort.name}</h3>
                <dl className="ticket-dates">
                  <div>
                    <dt>Enrollment opens</dt>
                    <dd>{fmt(cohort.enrolmentOpens)}</dd>
                  </div>
                  <div>
                    <dt>Regular enrollment deadline</dt>
                    <dd>{fmt(cohort.regularDeadline)}</dd>
                  </div>
                  <div>
                    <dt>Training starts</dt>
                    <dd>{fmt(cohort.trainingStarts)}</dd>
                  </div>
                  <div>
                    <dt>Late enrollment closes</dt>
                    <dd>{fmt(cohort.lateEnrolmentCloses)}</dd>
                  </div>
                  <div>
                    <dt>Duration</dt>
                    <dd>{cohort.duration}</dd>
                  </div>
                </dl>
                <EnrolButton className="btn btn-light btn-lg btn-block" />
              </article>
            ) : (
              <article className="ticket ticket-closed">
                <span className="ticket-flag">Enrollment closed</span>
                <h3>Next cohort coming soon</h3>
                <p className="ticket-msg">
                  Enrollment for this cohort is closed. Join the waitlist and we will email you when enrollment
                  opens for the next cohort.
                </p>
                <EnrolButton className="btn btn-light btn-lg btn-block" />
              </article>
            )}

            <div className="seasons">
              <div className="season">
                <span className="season-big">Spring</span>
                <span>Cohort one</span>
              </div>
              <div className="season season-alt">
                <span className="season-big">Fall</span>
                <span>Cohort two</span>
              </div>
              <div className="callout">
                <span className="callout-tag">Good to know</span>
                <p>Classes run twice a year. Missed this cohort? The waitlist is open whenever enrollment is closed.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- EVENTS */}
      <section className="events" id="events" aria-labelledby="events-title">
        <div className="wrap">
          <div className="section-head">
            <p className="kicker">Events and webinars</p>
            <h2 id="events-title">Events, Webinars and Learning Opportunities.</h2>
            <p className="sub">
              Stay informed about upcoming events, webinars and learning opportunities organized by Regal Cyber
              Academy.
            </p>
          </div>
          <EventsList events={events} />
        </div>
      </section>

      {/* ----------------------------------------------- TESTIMONIALS */}
      <section className="voices" id="testimonials" aria-labelledby="voices-title">
        <div className="wrap">
          <div className="voices-head">
            <div className="section-head">
              <p className="kicker kicker-light">Testimonials</p>
              <h2 id="voices-title">What Our Learners Say.</h2>
              <p className="sub">Feedback from learners who have participated in Regal Cyber Academy programs.</p>
            </div>
            <span className="quote-mark" aria-hidden="true">
              &ldquo;
            </span>
          </div>
          <ul className="quotes">
            {testimonials.map((t) => (
              <li key={t.name} className="quote">
                <blockquote>
                  <p>&ldquo;{t.quote}&rdquo;</p>
                </blockquote>
                <div className="quote-by">
                  {t.photo ? (
                    <Image src={t.photo} alt="" width={56} height={56} className="avatar" />
                  ) : (
                    <span className="avatar avatar-initials" aria-hidden="true">
                      {t.name
                        .split(" ")
                        .map((w) => w[0])
                        .slice(0, 2)
                        .join("")}
                    </span>
                  )}
                  <div>
                    <strong>{t.name}</strong>
                    {t.program && <span>{t.program}</span>}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------ ABOUT */}
      <section className="about" id="about" aria-labelledby="about-title">
        <div className="wrap about-grid">
          <figure className="about-photo">
            <Image
              src="/brand/mockup-polo.jpg"
              alt="Regal Cyber Academy logo embroidered on a teal polo shirt"
              width={1792}
              height={2400}
              sizes="(max-width: 960px) 88vw, 420px"
            />
            <span className="about-sticker">Practical first</span>
          </figure>
          <div className="about-copy">
            <p className="kicker">About us</p>
            <h2 id="about-title">
              More Than Learning. <span className="about-sub">Building Practical GRC Competence.</span>
            </h2>
            <p className="about-lead">
              At Regal Cyber Academy, we believe that understanding GRC requires more than theoretical knowledge.
            </p>
            <p>
              Our training approach combines structured instruction with practical exercises, industry-relevant
              tools and real-world scenarios to help learners understand how governance, risk and compliance
              operate within modern organizations.
            </p>
            <p className="about-turn">
              We are committed to making GRC knowledge practical, accessible and relevant to the professional
              world.
            </p>
            <dl className="stats">
              <div>
                <dt>07</dt>
                <dd>Core GRC disciplines</dd>
              </div>
              <div>
                <dt>{cohort.duration.split(" ")[0]}</dt>
                <dd>Weeks of live training</dd>
              </div>
              <div>
                <dt>02</dt>
                <dd>Cohorts every year</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ FINAL CTA */}
      <section className="final" aria-labelledby="final-title">
        <div className="sheet final-sheet">
          <p className="kicker">{isOpen ? `${cohort.name} · starts ${shortDate(cohort.trainingStarts)}` : "Enrollment closed"}</p>
          <h2 id="final-title">Ready to Start Your GRC Journey?</h2>
          <p>
            Build practical GRC knowledge, develop relevant skills and take the next step in your professional
            journey with Regal Cyber Academy.
          </p>
          <EnrolButton className="btn btn-lg" />
        </div>
      </section>

      {/* -------------------------------------------------- CONTACT */}
      <section className="contact" id="contact" aria-labelledby="contact-title">
        <div className="wrap contact-grid">
          <div className="contact-info">
            <p className="kicker">Contact us</p>
            <h2 id="contact-title">Have a Question? Let&apos;s Talk.</h2>
            <p className="sub">
              Would you like to know more about Regal Cyber Academy, our programs or upcoming cohorts? Get in
              touch and our team will reply by email.
            </p>
            <a className="mail-card" href={`mailto:${site.contactEmail}`}>
              <span className="mail-icon">{Icons.mail}</span>
              <span>
                <small>Email us directly</small>
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
          {isOpen ? (
            <>
              <b>{cohort.name}</b>
              <br />
              Starts {shortDate(cohort.trainingStarts)}
            </>
          ) : (
            <>
              <b>Enrollment closed</b>
              <br />
              Next cohort soon
            </>
          )}
        </span>
        <EnrolButton className="btn btn-sm btn-light" />
      </div>
    </main>
  );
}
