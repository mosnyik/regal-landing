import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { cohort, site } from "@/content/site";
import { stripe } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Enrollment Confirmed | Regal Cyber Academy",
  robots: { index: false },
};

export default function SuccessPage({ searchParams }: PageProps<"/enroll/success">) {
  return (
    <main id="top" className="legal">
      <div className="wrap">
        <p className="kicker">{cohort.name}</p>
        <Suspense fallback={<p>Confirming your payment…</p>}>
          <Status searchParams={searchParams} />
        </Suspense>
        <p>
          Questions? Email <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
        </p>
        <p>
          <Link className="btn" href="/">
            Back to home
          </Link>
        </p>
      </div>
    </main>
  );
}

async function Status({ searchParams }: Pick<PageProps<"/enroll/success">, "searchParams">) {
  const sp = await searchParams;
  const sessionId = typeof sp.session_id === "string" ? sp.session_id : null;

  let paid = false;
  let email: string | null = null;
  if (sessionId?.startsWith("cs_")) {
    try {
      const session = await stripe().checkout.sessions.retrieve(sessionId);
      paid = session.payment_status === "paid";
      email = session.customer_details?.email ?? session.customer_email;
    } catch (err) {
      console.error("[enroll:success]", err);
    }
  }

  if (paid) {
    return (
      <>
        <h1>You&apos;re enrolled.</h1>
        <p className="notice">
          Thank you. Your payment was successful and your place in the {cohort.name} is confirmed.
        </p>
        <p>
          A receipt has been sent{email ? ` to ${email}` : ""}. We will email you before training starts with
          your class schedule and everything you need to get started.
        </p>
      </>
    );
  }

  return (
    <>
      <h1>Almost there.</h1>
      <p className="notice">
        We&apos;re still confirming your payment. This can take a few minutes for some payment methods.
      </p>
      <p>You will receive an email once your enrollment is confirmed.</p>
    </>
  );
}
