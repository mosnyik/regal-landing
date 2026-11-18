import type { Metadata } from "next";
import { cohort, site } from "@/content/site";

export const metadata: Metadata = { title: "Terms and Conditions | Regal Cyber Academy" };

// TODO: replace with the academy's approved Terms and Conditions before launch.
export default function TermsPage() {
  return (
    <main id="top" className="legal">
      <div className="wrap">
        <p className="kicker">Legal</p>
        <h1>Terms and Conditions</h1>
        <p className="notice">
          Placeholder: the academy&apos;s Terms and Conditions (enrollment, payment, refunds, attendance and
          conduct) should be added here before launch.
        </p>
        <h2 id="refunds">Refund policy</h2>
        <p>{cohort.refundNote}</p>
        <h2>Questions</h2>
        <p>
          For any questions about these terms, email{" "}
          <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
        </p>
      </div>
    </main>
  );
}
