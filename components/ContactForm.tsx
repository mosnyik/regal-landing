"use client";

import { useActionState } from "react";
import { submitEnquiry } from "@/app/actions";
import { initialFormState } from "@/lib/validation";
import { Field, FormMessage, SpamGuard, SubmitButton } from "./FormBits";

const SUBJECTS = [
  "Program information",
  "Enrollment and payment",
  "Upcoming cohorts",
  "Events and webinars",
  "Partnerships",
  "Other",
];

export function ContactForm() {
  const [state, action] = useActionState(submitEnquiry, initialFormState);

  if (state.status === "success") {
    return (
      <div className="form-success" role="status">
        <span className="kicker">Inquiry sent</span>
        <h3>Thank you.</h3>
        <p>
          Thank you for contacting Regal Cyber Academy. Your inquiry has been submitted successfully. Our team
          will get back to you by email.
        </p>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="form">
      <div className="form-head">
        <h3>Send Us an Inquiry.</h3>
        <p className="sub">Leave us a message below and our team will get back to you by email.</p>
      </div>
      <FormMessage state={state} />
      <div className="field-row">
        <Field id="ct-name" name="fullName" label="Full Name" state={state} required autoComplete="name" />
        <Field
          id="ct-email"
          name="email"
          label="Email Address"
          type="email"
          inputMode="email"
          state={state}
          required
          autoComplete="email"
        />
      </div>
      <Field id="ct-subject" name="subject" label="Subject / Inquiry Type" state={state} required>
        {({ defaultValue, ...p }) => (
          <select {...p} defaultValue={defaultValue ?? ""}>
            <option value="" disabled>
              Choose one…
            </option>
            {SUBJECTS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        )}
      </Field>
      <Field id="ct-message" name="message" label="Message" state={state} required>
        {(p) => <textarea {...p} rows={5} />}
      </Field>
      <SpamGuard />
      <SubmitButton pendingLabel="Sending…">Submit Inquiry</SubmitButton>
    </form>
  );
}
