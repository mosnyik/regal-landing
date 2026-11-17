import "server-only";

/**
 * Sends notification emails through Resend's HTTP API when RESEND_API_KEY is
 * set. Without a key (local development) the email is logged instead, so the
 * forms still work end to end.
 *
 * Env:
 *   RESEND_API_KEY   – API key from resend.com
 *   MAIL_FROM        – verified sender, e.g. "Regal Cyber Academy <no-reply@yourdomain.com>"
 */

type Mail = { to: string; subject: string; text: string; replyTo?: string };

export async function sendMail({ to, subject, text, replyTo }: Mail): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.info(`[mail:dev] to=${to} subject="${subject}"\n${text}`);
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.MAIL_FROM ?? "Regal Cyber Academy <onboarding@resend.dev>",
      to: [to],
      subject,
      text,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });

  if (!res.ok) {
    throw new Error(`Mail send failed: ${res.status} ${await res.text()}`);
  }
}

export function formatFields(fields: Record<string, string | boolean | undefined>) {
  return Object.entries(fields)
    .map(([k, v]) => `${k}: ${v === undefined || v === "" ? "—" : String(v)}`)
    .join("\n");
}
