import type Stripe from "stripe";
import { site } from "@/content/site";
import { sendMail } from "@/lib/mail";
import { update } from "@/lib/store";
import { stripe } from "@/lib/stripe";

/**
 * Stripe webhook: marks enrollments as paid.
 * In the Stripe Dashboard, add an endpoint for https://<your-domain>/api/stripe/webhook
 * listening to: checkout.session.completed, checkout.session.async_payment_succeeded,
 * checkout.session.async_payment_failed, checkout.session.expired.
 */
export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = req.headers.get("stripe-signature");
  if (!secret || !signature) return new Response("Webhook not configured", { status: 400 });

  let event: Stripe.Event;
  try {
    event = await stripe().webhooks.constructEventAsync(await req.text(), signature, secret);
  } catch (err) {
    console.error("[stripe:webhook] signature verification failed", err);
    return new Response("Invalid signature", { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded": {
        const session = event.data.object;
        if (session.payment_status !== "paid") break; // async methods settle later
        await markPaid(session);
        break;
      }
      case "checkout.session.async_payment_failed": {
        await setStatus(event.data.object, "failed");
        break;
      }
      case "checkout.session.expired": {
        await setStatus(event.data.object, "abandoned");
        break;
      }
    }
  } catch (err) {
    console.error("[stripe:webhook] handler error", err);
    return new Response("Handler error", { status: 500 }); // Stripe will retry
  }

  return Response.json({ received: true });
}

function enrollmentId(session: Stripe.Checkout.Session) {
  return session.client_reference_id ?? session.metadata?.enrollmentId ?? null;
}

async function setStatus(session: Stripe.Checkout.Session, paymentStatus: string) {
  const id = enrollmentId(session);
  if (!id) return 0;
  return update("enrollments", (r) => r.id === id && r.paymentStatus !== "paid", { paymentStatus });
}

async function markPaid(session: Stripe.Checkout.Session) {
  const id = enrollmentId(session);
  if (!id) return;
  // Only the first transition to "paid" sends the notification (webhooks can be retried).
  const changed = await update("enrollments", (r) => r.id === id && r.paymentStatus !== "paid", {
    paymentStatus: "paid",
    paidAt: new Date().toISOString(),
    stripeSessionId: session.id,
    amountPaid: session.amount_total != null ? (session.amount_total / 100).toFixed(2) : undefined,
    currency: session.currency ?? undefined,
  });
  if (changed) {
    try {
      await sendMail({
        to: site.enrolmentEmail,
        subject: `Payment received: ${session.metadata?.fullName ?? session.customer_details?.email ?? id}`,
        text: `Enrollment ${id} has been paid.\nEmail: ${session.customer_details?.email ?? "—"}\nAmount: ${
          session.amount_total != null ? (session.amount_total / 100).toFixed(2) : "—"
        } ${session.currency?.toUpperCase() ?? ""}\nStripe session: ${session.id}`,
      });
    } catch (err) {
      console.error("[stripe:webhook] mail", err);
    }
  }
}
