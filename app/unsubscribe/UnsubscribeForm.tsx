"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { unsubscribe } from "@/app/actions";
import { SubmitButton, FormMessage } from "@/components/FormBits";
import { initialFormState } from "@/lib/validation";

export function UnsubscribeForm() {
  const params = useSearchParams();
  const email = params.get("email") ?? "";
  const token = params.get("token") ?? "";
  const [state, action] = useActionState(unsubscribe, initialFormState);

  if (state.status === "success") {
    return (
      <p className="notice" role="status">
        You have been unsubscribed. You will no longer receive waitlist emails from Regal Cyber Academy.
      </p>
    );
  }

  if (!email || !token) {
    return <p>This unsubscribe link is incomplete. Please use the link from your email.</p>;
  }

  return (
    <form action={action} className="form" style={{ maxWidth: 480 }}>
      <p>
        Stop receiving waitlist emails at <strong>{email}</strong>?
      </p>
      <FormMessage state={state} />
      <input type="hidden" name="email" value={email} />
      <input type="hidden" name="token" value={token} />
      <SubmitButton pendingLabel="Unsubscribing…">Unsubscribe</SubmitButton>
    </form>
  );
}
