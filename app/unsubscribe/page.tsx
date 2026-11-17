import type { Metadata } from "next";
import { Suspense } from "react";
import { UnsubscribeForm } from "./UnsubscribeForm";

export const metadata: Metadata = {
  title: "Unsubscribe | Regal Cyber Academy",
  robots: { index: false },
};

export default function UnsubscribePage() {
  return (
    <main id="top" className="legal">
      <div className="wrap">
        <p className="kicker">Waitlist emails</p>
        <h1>Unsubscribe</h1>
        <Suspense fallback={<p>Loading…</p>}>
          <UnsubscribeForm />
        </Suspense>
      </div>
    </main>
  );
}
