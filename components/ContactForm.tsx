"use client";

import { useActionState } from "react";
import { submitEnquiry } from "@/app/actions";
import { initialFormState } from "@/lib/validation";
import { Field, FormMessage, SpamGuard, SubmitButton } from "./FormBits";

const SUBJECTS = [
  "Is this programme right for me?",
  "Programme content and schedule",
  "Fees and payment",
  "Upcoming cohorts",
  "Partnerships",
  "Something else",
];

export function ContactForm() {
  const [state, action] = useActionState(submitEnquiry, initialFormState);

  if (state.status === "success") {
    return (
      <div className="form-success" role="status">
        <span className="kicker">Message sent</span>
        <h3 className="form-title">Thank you.</h3>
        <p>
          Thank you for contacting Regal Cyber Academy. A real person on our team will get back to you
          by email.
        </p>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="form">
      <div className="form-head">
        <h3 className="form-title">Send us a message</h3>
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
      <Field id="ct-subject" name="subject" label="Subject / Enquiry Type" state={state} required>
        {({ defaultValue, ...p }) => (
          <select {...p} defaultValue={defaultValue ?? SUBJECTS[0]}>
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
      <SubmitButton pendingLabel="Sending…" className="btn btn-dark btn-block">
        Send
      </SubmitButton>
    </form>
  );
}
