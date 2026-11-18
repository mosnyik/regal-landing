"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useFormStatus } from "react-dom";
import type { FormState } from "@/lib/validation";

/** Hidden anti-spam fields: honeypot + time-to-fill stamp. */
export function SpamGuard() {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.value = String(Date.now());
  }, []);
  return (
    <>
      <input ref={ref} type="hidden" name="form_started" defaultValue="" />
      <div className="hp" aria-hidden="true">
        <label>
          Company website
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
    </>
  );
}

type FieldProps = {
  id: string;
  name: string;
  label: string;
  state: FormState;
  required?: boolean;
  hint?: string;
  children?: (common: {
    id: string;
    name: string;
    "aria-invalid": boolean;
    "aria-describedby"?: string;
    defaultValue?: string;
    required?: boolean;
  }) => ReactNode;
  type?: string;
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel";
};

export function Field({
  id,
  name,
  label,
  state,
  required,
  hint,
  children,
  type = "text",
  autoComplete,
  inputMode,
}: FieldProps) {
  const error = state.errors?.[name];
  const describedBy = [hint ? `${id}-hint` : null, error ? `${id}-err` : null]
    .filter(Boolean)
    .join(" ");
  const common = {
    id,
    name,
    "aria-invalid": Boolean(error),
    "aria-describedby": describedBy || undefined,
    defaultValue: state.values?.[name],
    required,
  };
  return (
    <div className={`field${error ? " has-error" : ""}`}>
      <label htmlFor={id}>
        {label}
        {required ? <span className="req" aria-hidden="true"> *</span> : <span className="opt"> (optional)</span>}
      </label>
      {hint && (
        <p className="field-hint" id={`${id}-hint`}>
          {hint}
        </p>
      )}
      {children ? (
        children(common)
      ) : (
        <input {...common} type={type} autoComplete={autoComplete} inputMode={inputMode} />
      )}
      {error && (
        <p className="field-err" id={`${id}-err`}>
          {error}
        </p>
      )}
    </div>
  );
}

export function Consent({
  id,
  state,
  children,
}: {
  id: string;
  state: FormState;
  children: ReactNode;
}) {
  const error = state.errors?.consent;
  return (
    <div className={`consent${error ? " has-error" : ""}`}>
      <input
        type="checkbox"
        id={id}
        name="consent"
        required
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-err` : undefined}
      />
      <label htmlFor={id}>{children}</label>
      {error && (
        <p className="field-err" id={`${id}-err`}>
          {error}
        </p>
      )}
    </div>
  );
}

export function SubmitButton({
  children,
  pendingLabel = "Submitting…",
  className = "btn btn-lg btn-block",
}: {
  children: ReactNode;
  pendingLabel?: string;
  className?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={className} disabled={pending} aria-disabled={pending}>
      {pending ? pendingLabel : children}
    </button>
  );
}

export function FormMessage({ state }: { state: FormState }) {
  if (state.status !== "error" || !state.message) return null;
  return (
    <p className="form-alert" role="alert">
      {state.message}
    </p>
  );
}
