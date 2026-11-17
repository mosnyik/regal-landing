# Regal Cyber Academy: Enrollment & Payments Platform

A production-grade landing page and enrollment funnel for **Regal Cyber Academy**, a US-focused Governance, Risk and Compliance (GRC) training academy. It turns visitors into paying students: they discover the program, enroll, **pay through Stripe Checkout**, and are confirmed automatically through signed Stripe webhooks.

Built with **Next.js 16 (App Router, Cache Components)**, **React 19**, **TypeScript** and **Stripe**.

> Designed, built and integrated end to end by **Nyikwagh Moses**: UI design system, server architecture, payment flow and operational tooling.

---

## Highlights

- 💳 **Stripe Checkout integration**, from form submission to verified payment confirmation
- 🔐 **Signed webhook processing** with idempotent updates and async payment support
- 🎛️ **A single enrollment switch** that controls every call-to-action on the site
- 🧾 **Three server-validated forms** (enrollment, waitlist, contact) with spam protection
- 🛡️ **Security-first backend**: no card data stored, constant-time token checks, CSV injection protection
- 📱 **Fully responsive, accessible UI** with a custom design system and reduced-motion support
- ⚡ **Static-first performance**: the marketing page is prerendered, and only the payment and admin endpoints run on demand

---

## Payment Integration (Stripe)

The payment flow is the core of this project. It is built so that **no enrollment is ever lost**, even if the learner abandons checkout, the network drops or Stripe retries an event.

### Flow

```
 Learner                 Next.js (Server Action)            Stripe                  Webhook (/api/stripe/webhook)
    │  submit form  ───────────►│                               │                                │
    │                           │ validate + spam check         │                                │
    │                           │ save enrollment: "pending"    │                                │
    │                           │ notify academy by email       │                                │
    │                           │ create Checkout Session ─────►│                                │
    │◄──── redirect to Checkout ┤                               │                                │
    │  pay (card, wallet…) ────────────────────────────────────►│                                │
    │◄──────────── redirect to /enroll/success ─────────────────┤                                │
    │                           │                               │ checkout.session.completed ───►│
    │                           │                               │                  verify signature
    │                           │                               │            mark "paid" (once only)
    │                           │                               │          email payment receipt to staff
```

### What makes it robust

| Concern | How it's handled |
|---|---|
| **Abandoned checkouts** | The enrollment is saved as `pending` *before* redirecting to Stripe, so staff can follow up on incomplete sign-ups. Expired sessions are marked `abandoned`. |
| **Trusting the payment** | Payment status is only ever set from a **signature-verified webhook** (`constructEventAsync`). The success page re-checks the session with Stripe and never trusts URL parameters. |
| **Duplicate events** | Stripe retries webhooks. The "paid" transition is **idempotent**: it only applies once, so staff are notified exactly once. |
| **Delayed payment methods** | Handles `async_payment_succeeded` / `async_payment_failed` for methods that settle later, not just instant card payments. |
| **Reconciliation** | Each enrollment is linked to Stripe through `client_reference_id`, session metadata and payment-intent metadata, and stores the session ID, amount and currency. |
| **Failure handling** | Webhook handler errors return `500` so Stripe retries. If Checkout can't be created, the learner keeps their saved details and gets a clear message. |
| **Configuration safety** | If Stripe keys are missing, the form fails gracefully ("payment temporarily unavailable") instead of breaking. |
| **PCI scope** | Card details are entered only on Stripe-hosted Checkout. No card data touches this server. |

Extras: promotion codes enabled, the learner's email prefilled on Checkout, and a clear payment description in the Stripe Dashboard (`Regal Cyber Academy: <cohort>`).

**Key files:** [`lib/stripe.ts`](lib/stripe.ts) · [`app/actions.ts`](app/actions.ts) · [`app/api/stripe/webhook/route.ts`](app/api/stripe/webhook/route.ts) · [`app/enroll/success/page.tsx`](app/enroll/success/page.tsx)

---

## Features

### Enrollment state machine
One setting (`ENROLMENT_STATUS=open|closed`) drives the whole site:

- **Open:** every button reads **"Enroll Now"** and opens the enrollment form, and the cohort card shows dates and deadlines.
- **Closed:** every button switches to **"Join the Waitlist"** and the cohort card shows the waitlist message. The server **also refuses** enrollment submissions, so the rule can't be bypassed from the browser.

This covers 7 buttons across the header, hero, cohort section, final call-to-action, footer and mobile action bar.

### Forms
| Form | Highlights |
|---|---|
| **Enrollment** | Required and optional fields, email and phone validation, SMS/email consent capture, saved before payment, staff notification, Stripe handoff |
| **Waitlist** | Duplicate-email prevention, signed one-click **unsubscribe links** (HMAC), export and delete-on-request |
| **Contact inquiry** | Validation, staff email with reply-to set to the visitor, success and error states |

All forms use **React 19 Server Actions** with `useActionState`, keep field values after errors, and show accessible inline errors (`aria-invalid`, `aria-describedby`, `role="alert"`).

### Spam protection (no CAPTCHA friction)
A hidden honeypot field, a minimum time-to-submit check and per-IP rate limiting. Bots get a fake success response, so they learn nothing.

### Admin API
A token-protected endpoint for staff to export and manage data:

```bash
# JSON or CSV export
curl -H "Authorization: Bearer $ADMIN_TOKEN" "https://site/api/admin/enrollments?format=csv"
# Delete a waitlist entry on request
curl -X DELETE -H "Authorization: Bearer $ADMIN_TOKEN" "https://site/api/admin/waitlist?email=jane@example.com"
```

It uses constant-time token comparison and guards CSV exports against **formula injection**.

### Content without code changes
Cohort dates, events, testimonials, tools and contact details all live in [`content/site.ts`](content/site.ts). Past events are labeled **"Completed"** automatically, with dates shown in US Eastern Time.

---

## Design

A bold "printed course flyer" design system in the **Teal Trust** palette:

| Token | Hex |
|---|---|
| Primary (Teal) | `#028090` |
| Secondary (Seafoam) | `#00A896` |
| Accent (Mint) | `#02C39A` |
| Dark | `#0B2E33` |
| Light card | `#F0F6F6` |

- Condensed display type (Anton) paired with Archivo body text, loaded through `next/font`
- Hard offset shadows, rotated sticker labels, a scrolling topics ticker, an animated risk heat map and a live cohort countdown
- A sticky header with an accessible mobile menu, a native `<dialog>` modal for forms, and a mobile action bar
- Respects `prefers-reduced-motion`, with keyboard focus states throughout

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Cache Components, Turbopack) |
| UI | React 19, TypeScript, hand-written CSS design system |
| Payments | Stripe Checkout + webhooks (`stripe` v23) |
| Forms | Server Actions + `useActionState` |
| Email | Resend HTTP API (logs to the console in development) |
| Storage | Pluggable storage layer (`lib/store.ts`), JSON files by default |

---

## Getting Started

```bash
pnpm install
cp .env.example .env.local   # fill in the values below
pnpm dev
```

### Environment variables

| Variable | Purpose |
|---|---|
| `SITE_URL` | Public URL, used for Stripe redirects and unsubscribe links |
| `ENROLMENT_STATUS` | `open` or `closed` |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_PRICE_ID` | One-time USD tuition price |
| `STRIPE_WEBHOOK_SECRET` | Signing secret for `/api/stripe/webhook` |
| `RESEND_API_KEY`, `MAIL_FROM` | Email notifications |
| `ADMIN_TOKEN` | Admin API access |
| `UNSUBSCRIBE_SECRET` | Signs waitlist unsubscribe links |

### Testing payments locally

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook   # prints a whsec_… secret
```

Use Stripe test card `4242 4242 4242 4242` with any future expiry date and any CVC.

### Stripe Dashboard setup
1. Create a product with a one-time **USD** price and copy its `price_…` ID.
2. Add a webhook endpoint at `https://<domain>/api/stripe/webhook` listening to:
   `checkout.session.completed`, `checkout.session.async_payment_succeeded`, `checkout.session.async_payment_failed`, `checkout.session.expired`.

---

## Project Structure

```
app/
  actions.ts                  Server Actions: enrollment → Stripe, waitlist, inquiry, unsubscribe
  api/stripe/webhook/         Signed Stripe webhook handler
  api/admin/[collection]/     Token-protected export/delete API
  enroll/success/             Post-payment confirmation (verified with Stripe)
  page.tsx                    Landing page
components/                   Header, enroll modal + forms, events, countdown, icons
content/site.ts               All editable content and cohort settings
lib/                          stripe, store, mail, spam, tokens, validation
```

---

## Deployment Notes

The storage layer writes JSON files by default, which suits a VPS or other long-running Node server. For serverless hosting (Vercel, Netlify), swap `lib/store.ts` for a hosted database such as Postgres or Supabase. The rest of the app depends only on its small API (`insert`, `update`, `remove`, `readAll`).

---

## About the Developer

**Nyikwagh Moses** is a full-stack developer specializing in **Next.js, TypeScript and payment integrations**. This project shows:

- End-to-end **Stripe** integration: Checkout, webhooks, idempotency and reconciliation
- Secure server-side design: validation, rate limiting, signed tokens, least-exposure data handling
- Turning a written business blueprint into a polished, conversion-focused product
- Modern React and Next.js patterns: Server Actions, Cache Components, accessible client components

*Available for freelance and contract work. Let's build your next payment-enabled product.*
