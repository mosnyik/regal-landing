"use server";

import { headers } from "next/headers";
import { cohortRecordLabel, enrolmentStatus, site } from "@/content/site";
import { createEnrollmentCheckout, isStripeConfigured } from "@/lib/stripe";
import { checkSpam } from "@/lib/spam";
import { insert, insertUniqueEmail, update } from "@/lib/store";
import { formatFields, sendMail } from "@/lib/mail";
import { unsubscribeUrl, verifyUnsubscribeToken } from "@/lib/tokens";
import { type FieldErrors, type FormState, isEmail, isPhone, str } from "@/lib/validation";

async function clientIp() {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
}

const GENERIC_ERROR =
  "Sorry, something went wrong and your submission was not sent. Please try again, or email us directly.";

function invalid(errors: FieldErrors, values: Record<string, string>): FormState {
  return {
    status: "error",
    message: "Please correct the highlighted fields.",
    errors,
    values,
  };
}

/* ------------------------------------------------------------------ */
/* Contact inquiry                                                     */
/* ------------------------------------------------------------------ */

export async function submitEnquiry(_prev: FormState, fd: FormData): Promise<FormState> {
  const values = {
    fullName: str(fd, "fullName", 120),
    email: str(fd, "email", 254),
    subject: str(fd, "subject", 160),
    message: str(fd, "message", 5000),
  };

  const errors: FieldErrors = {};
  if (!values.fullName) errors.fullName = "Please enter your full name.";
  if (!values.email) errors.email = "Please enter your email address.";
  else if (!isEmail(values.email)) errors.email = "Please enter a valid email address.";
  if (!values.subject) errors.subject = "Please choose a subject.";
  if (values.message.length < 10) errors.message = "Please enter a message (at least 10 characters).";
  if (Object.keys(errors).length) return invalid(errors, values);

  const spam = checkSpam(fd, await clientIp());
  if (!spam.ok) {
    return spam.silent
      ? { status: "success" }
      : { status: "error", message: "Too many submissions. Please try again later.", values };
  }

  try {
    await insert("inquiries", values);
    await sendMail({
      to: site.contactEmail,
      replyTo: values.email,
      subject: `Website inquiry: ${values.subject}`,
      text: formatFields(values),
    });
    return { status: "success" };
  } catch (err) {
    console.error("[inquiry]", err);
    return { status: "error", message: GENERIC_ERROR, values };
  }
}

/* ------------------------------------------------------------------ */
/* Enrollment                                                           */
/* ------------------------------------------------------------------ */

export async function submitEnrolment(_prev: FormState, fd: FormData): Promise<FormState> {
  if (enrolmentStatus !== "open") {
    return {
      status: "error",
      message: "Enrollment for this cohort is closed. Please join the waitlist instead.",
    };
  }

  const values = {
    fullName: str(fd, "fullName", 120),
    email: str(fd, "email", 254),
    phone: str(fd, "phone", 30),
    experience: str(fd, "experience", 1000),
    industry: str(fd, "industry", 160),
  };
  const consent = fd.get("consent") === "on";

  const errors: FieldErrors = {};
  if (!values.fullName) errors.fullName = "Please enter your full name.";
  if (!values.email) errors.email = "Please enter your email address.";
  else if (!isEmail(values.email)) errors.email = "Please enter a valid email address.";
  if (!values.phone) errors.phone = "Please enter your phone number.";
  else if (!isPhone(values.phone))
    errors.phone = "Please enter a valid phone number, e.g. (555) 555-0123.";
  if (!consent) errors.consent = "Please check the consent box to continue.";
  if (Object.keys(errors).length) return invalid(errors, values);

  const spam = checkSpam(fd, await clientIp());
  if (!spam.ok) {
    return spam.silent
      ? { status: "success" }
      : { status: "error", message: "Too many submissions. Please try again later.", values };
  }

  if (!isStripeConfigured()) {
    console.error("[enrollment] Stripe is not configured (STRIPE_SECRET_KEY / STRIPE_PRICE_ID)");
    return {
      status: "error",
      message: "Online payment is temporarily unavailable. Please email us to complete your enrollment.",
      values,
    };
  }

  let record;
  try {
    // Saved before payment so incomplete enrollments can be followed up.
    record = await insert("enrollments", {
      ...values,
      consent: true,
      cohort: cohortRecordLabel,
      paymentStatus: "pending",
    });
  } catch (err) {
    console.error("[enrollment]", err);
    return { status: "error", message: GENERIC_ERROR, values };
  }

  try {
    await sendMail({
      to: site.enrolmentEmail,
      replyTo: values.email,
      subject: `New enrollment: ${values.fullName}`,
      text: `A new enrollment was submitted (payment pending).\n\nid: ${record.id}\n${formatFields(values)}`,
    });
  } catch (mailErr) {
    // The enrollment is saved; don't block the learner from paying.
    console.error("[enrollment:mail]", mailErr);
  }

  try {
    const session = await createEnrollmentCheckout({
      enrollmentId: record.id,
      email: values.email,
      fullName: values.fullName,
      cohort: cohortRecordLabel,
    });
    await update("enrollments", (r) => r.id === record.id, { stripeSessionId: session.id });
    return { status: "success", redirectTo: session.url! };
  } catch (err) {
    console.error("[enrollment:stripe]", err);
    return {
      status: "error",
      message:
        "Your details were saved, but we couldn't open the payment page. Please try again, or email us and we'll help you complete your enrollment.",
      values,
    };
  }
}

/* ------------------------------------------------------------------ */
/* Waitlist                                                            */
/* ------------------------------------------------------------------ */

export async function joinWaitlist(_prev: FormState, fd: FormData): Promise<FormState> {
  if (enrolmentStatus !== "closed") {
    return { status: "error", message: "Enrollment is currently open. Please use the enrollment form." };
  }

  const values = { fullName: str(fd, "fullName", 120), email: str(fd, "email", 254) };
  const consent = fd.get("consent") === "on";

  const errors: FieldErrors = {};
  if (!values.fullName) errors.fullName = "Please enter your full name.";
  if (!values.email) errors.email = "Please enter your email address.";
  else if (!isEmail(values.email)) errors.email = "Please enter a valid email address.";
  if (!consent) errors.consent = "Please check the consent box to join the waitlist.";
  if (Object.keys(errors).length) return invalid(errors, values);

  const spam = checkSpam(fd, await clientIp());
  if (!spam.ok) {
    return spam.silent
      ? { status: "success" }
      : { status: "error", message: "Too many submissions. Please try again later.", values };
  }

  try {
    const record = await insertUniqueEmail("waitlist", {
      ...values,
      consent: true,
      subscribed: true,
    });
    if (!record) {
      return {
        status: "error",
        message: "This email address is already on the waitlist. We will email you when enrollment opens.",
        values,
      };
    }
    try {
      await sendMail({
        to: site.contactEmail,
        subject: `New waitlist sign-up: ${values.fullName}`,
        text: `${formatFields(values)}\nunsubscribe link: ${unsubscribeUrl(values.email)}`,
      });
    } catch (mailErr) {
      console.error("[waitlist:mail]", mailErr);
    }
    return { status: "success" };
  } catch (err) {
    console.error("[waitlist]", err);
    return { status: "error", message: GENERIC_ERROR, values };
  }
}

/* ------------------------------------------------------------------ */
/* Unsubscribe                                                         */
/* ------------------------------------------------------------------ */

export async function unsubscribe(_prev: FormState, fd: FormData): Promise<FormState> {
  const email = str(fd, "email", 254).toLowerCase();
  const token = str(fd, "token", 200);
  if (!email || !token || !verifyUnsubscribeToken(email, token)) {
    return {
      status: "error",
      message: "This unsubscribe link is invalid or has expired. Please email us and we will remove you.",
    };
  }
  try {
    await update("waitlist", (r) => String(r.email).toLowerCase() === email, {
      subscribed: false,
      unsubscribedAt: new Date().toISOString(),
    });
    return { status: "success" };
  } catch (err) {
    console.error("[unsubscribe]", err);
    return { status: "error", message: GENERIC_ERROR };
  }
}
