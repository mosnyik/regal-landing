import "server-only";
import Stripe from "stripe";

/**
 * Stripe Checkout for enrollment payments.
 *
 * Env:
 *   STRIPE_SECRET_KEY      – sk_live_… / sk_test_…
 *   STRIPE_PRICE_ID        – price_… for the cohort tuition (create it in the Stripe Dashboard, USD)
 *   STRIPE_WEBHOOK_SECRET  – whsec_… from the webhook endpoint pointing at /api/stripe/webhook
 *   SITE_URL               – e.g. https://regalcyberacademy.com (used for success/cancel URLs)
 */

let client: Stripe | null = null;

export function stripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  client ??= new Stripe(key);
  return client;
}

export function isStripeConfigured() {
  return Boolean(process.env.STRIPE_SECRET_KEY && process.env.STRIPE_PRICE_ID);
}

function siteUrl() {
  return (process.env.SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
}

export async function createEnrollmentCheckout(opts: {
  enrollmentId: string;
  email: string;
  fullName: string;
  cohort: string;
}) {
  const session = await stripe().checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],
    customer_email: opts.email,
    client_reference_id: opts.enrollmentId,
    metadata: { enrollmentId: opts.enrollmentId, cohort: opts.cohort, fullName: opts.fullName },
    payment_intent_data: {
      description: `Regal Cyber Academy: ${opts.cohort}`,
      metadata: { enrollmentId: opts.enrollmentId, cohort: opts.cohort },
    },
    allow_promotion_codes: true,
    success_url: `${siteUrl()}/enroll/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl()}/?payment=cancelled#enrol`,
  });
  if (!session.url) throw new Error("Stripe did not return a Checkout URL");
  return session;
}
