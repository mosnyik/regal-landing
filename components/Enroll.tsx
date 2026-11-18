"use client";

import Link from "next/link";
import {
  createContext,
  useActionState,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { joinWaitlist, submitEnrolment } from "@/app/actions";
import { cohort, type EnrolmentStatus } from "@/content/site";
import { initialFormState } from "@/lib/validation";
import { Consent, Field, FormMessage, SpamGuard, SubmitButton } from "./FormBits";

type Ctx = { status: EnrolmentStatus; open: () => void };
const EnrolCtx = createContext<Ctx | null>(null);

export function useEnrol() {
  const ctx = useContext(EnrolCtx);
  if (!ctx) throw new Error("useEnrol must be used inside <EnrolProvider>");
  return ctx;
}

export function enrolLabel(status: EnrolmentStatus) {
  return status === "open" ? "Enrol Now" : "Join the Waitlist";
}

/**
 * Single source of truth for every enroll button on the site. The status decides
 * both the label and which form opens — when closed, the enrollment form can
 * never be opened.
 */
export function EnrolProvider({ status, children }: { status: EnrolmentStatus; children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  // Remount the form each time the dialog opens so state resets.
  const [session, setSession] = useState(0);

  const open = useCallback(() => {
    setSession((s) => s + 1);
    dialogRef.current?.showModal();
  }, []);

  const close = useCallback(() => dialogRef.current?.close(), []);

  return (
    <EnrolCtx.Provider value={{ status, open }}>
      {children}
      <dialog
        ref={dialogRef}
        className="modal"
        aria-labelledby="modal-title"
        onClick={(e) => {
          // Click on the backdrop closes the dialog.
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="modal-sheet">
          <button type="button" className="modal-close" onClick={close} aria-label="Close">
            ×
          </button>
          {session > 0 &&
            (status === "open" ? <EnrolForm key={session} /> : <WaitlistForm key={session} />)}
        </div>
      </dialog>
    </EnrolCtx.Provider>
  );
}

export function EnrolButton({
  className = "btn",
  label,
  icon,
}: {
  className?: string;
  /** Override only the open-state text; closed always reads "Join the Waitlist". */
  label?: string;
  icon?: ReactNode;
}) {
  const { status, open } = useEnrol();
  return (
    <button type="button" className={className} onClick={open} aria-haspopup="dialog">
      {status === "open" ? (label ?? "Enrol Now") : "Join the Waitlist"}
      {icon}
    </button>
  );
}

/** Plain-link variant for the footer "Quick Links". */
export function EnrolLink({ className = "linklike" }: { className?: string }) {
  const { status, open } = useEnrol();
  return (
    <button type="button" className={className} onClick={open} aria-haspopup="dialog">
      {enrolLabel(status)} &rarr;
    </button>
  );
}

/* ------------------------------------------------------------------ */

function EnrolForm() {
  const [state, action] = useActionState(submitEnrolment, initialFormState);

  useEffect(() => {
    if (state.status === "success" && state.redirectTo) {
      const t = setTimeout(() => window.location.assign(state.redirectTo!), 2200);
      return () => clearTimeout(t);
    }
  }, [state]);

  if (state.status === "success") {
    return (
      <div className="form-success" role="status">
        <span className="kicker">Details received</span>
        <h2 id="modal-title">Thank you.</h2>
        <p>
          Your details have been received. You will now be taken to the payment page to complete your
          enrolment.
        </p>
        {state.redirectTo && (
          <a className="btn" href={state.redirectTo}>
            Continue to payment
          </a>
        )}
      </div>
    );
  }

  return (
    <form action={action} noValidate className="form">
      <div className="form-head">
        <span className="kicker">{cohort.name}</span>
        <h2 id="modal-title">Enrol in Regal Cyber Academy</h2>
        <p className="sub">
          Complete the form below to enrol in the upcoming Regal Cyber Academy GRC cohort. After you submit
          your details, you will be taken to Stripe to pay securely and complete your enrolment.
        </p>
      </div>
      <FormMessage state={state} />
      <Field id="en-name" name="fullName" label="Full Name" state={state} required autoComplete="name" />
      <div className="field-row">
        <Field
          id="en-email"
          name="email"
          label="Email Address"
          type="email"
          inputMode="email"
          state={state}
          required
          autoComplete="email"
        />
        <Field
          id="en-phone"
          name="phone"
          label="Phone Number"
          type="tel"
          inputMode="tel"
          state={state}
          required
          autoComplete="tel"
          hint="e.g. (555) 555-0123"
        />
      </div>
      <Field id="en-exp" name="experience" label="Work Experience, if any" state={state}>
        {(p) => <textarea {...p} rows={3} placeholder="e.g. 3 years in IT support, internal audit…" />}
      </Field>
      <Field
        id="en-industry"
        name="industry"
        label="Current or Previous Professional Industry"
        state={state}
        autoComplete="organization-title"
      />
      <Consent id="en-consent" state={state}>
        By checking this box, I consent to Regal Cyber Academy contacting me by email and text message about
        the program, including enrolment, class schedules, updates and reminders. I understand that I can
        opt out at any time by following the unsubscribe link in emails or by replying STOP to text messages.
        I have read the{" "}
        <Link href="/privacy" target="_blank">
          Privacy Policy
        </Link>
        .
      </Consent>
      <SpamGuard />
      <SubmitButton>Submit and Continue to Payment</SubmitButton>
    </form>
  );
}

function WaitlistForm() {
  const [state, action] = useActionState(joinWaitlist, initialFormState);

  if (state.status === "success") {
    return (
      <div className="form-success" role="status">
        <span className="kicker">You&apos;re on the list</span>
        <h2 id="modal-title">Thank you.</h2>
        <p>
          Thank you for joining the Regal Cyber Academy waitlist. We will email you when enrolment opens for
          the next cohort.
        </p>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="form">
      <div className="form-head">
        <span className="kicker">Enrolment closed</span>
        <h2 id="modal-title">Join the Waitlist</h2>
        <p className="sub">
          Leave your details below and we will email you when enrolment opens for the next Regal Cyber Academy
          cohort.
        </p>
      </div>
      <FormMessage state={state} />
      <Field id="wl-name" name="fullName" label="Full Name" state={state} required autoComplete="name" />
      <Field
        id="wl-email"
        name="email"
        label="Email Address"
        type="email"
        inputMode="email"
        state={state}
        required
        autoComplete="email"
      />
      <Consent id="wl-consent" state={state}>
        I agree to receive emails from Regal Cyber Academy about enrolment for the next cohort. I can
        unsubscribe at any time. I have read the{" "}
        <Link href="/privacy" target="_blank">
          Privacy Policy
        </Link>
        .
      </Consent>
      <SpamGuard />
      <SubmitButton>Join the Waitlist</SubmitButton>
    </form>
  );
}
