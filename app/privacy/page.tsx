import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Privacy Policy | Regal Cyber Academy" };

// TODO: replace with the academy's approved Privacy Policy before launch.
export default function PrivacyPage() {
  return (
    <main id="top" className="legal">
      <div className="wrap">
        <p className="kicker">Legal</p>
        <h1>Privacy Policy</h1>
        <p className="notice">
          Placeholder: this page outlines how the website handles data. The academy&apos;s final, legally reviewed
          policy should replace this text before launch.
        </p>
        <h2>What we collect</h2>
        <ul>
          <li>Inquiries: your name, email address, subject and message.</li>
          <li>Enrollments: your name, email address, phone number, and optionally your work experience and industry.</li>
          <li>Waitlist: your name and email address.</li>
        </ul>
        <h2>How we use it</h2>
        <p>
          We use your details only to respond to your inquiry, process your enrollment, or tell you when enrollment
          opens, depending on what you asked for. Payments are processed securely by Stripe; we do
          not store card details.
        </p>
        <h2>Who can access it</h2>
        <p>Submissions are stored securely and are only accessible to authorized Regal Cyber Academy administrators.</p>
        <h2>Your choices</h2>
        <p>
          You can unsubscribe from emails at any time using the link in any email, reply STOP to text messages,
          or ask us to delete your details by emailing{" "}
          <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
        </p>
      </div>
    </main>
  );
}
