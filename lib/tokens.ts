import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

/** Signed, non-guessable unsubscribe tokens for waitlist emails. */

function secret() {
  const s = process.env.UNSUBSCRIBE_SECRET;
  if (!s && process.env.NODE_ENV === "production") {
    throw new Error("UNSUBSCRIBE_SECRET must be set in production");
  }
  return s ?? "dev-only-unsubscribe-secret";
}

export function unsubscribeToken(email: string) {
  return createHmac("sha256", secret()).update(email.toLowerCase()).digest("base64url");
}

export function verifyUnsubscribeToken(email: string, token: string) {
  const expected = Buffer.from(unsubscribeToken(email));
  const given = Buffer.from(token);
  return expected.length === given.length && timingSafeEqual(expected, given);
}

export function unsubscribeUrl(email: string) {
  const base = process.env.SITE_URL ?? "http://localhost:3000";
  const q = new URLSearchParams({ email: email.toLowerCase(), token: unsubscribeToken(email) });
  return `${base}/unsubscribe?${q}`;
}

/** Constant-time admin token check for the admin API. */
export function isAdmin(header: string | null) {
  const token = process.env.ADMIN_TOKEN;
  if (!token || !header?.startsWith("Bearer ")) return false;
  const a = Buffer.from(header.slice(7));
  const b = Buffer.from(token);
  return a.length === b.length && timingSafeEqual(a, b);
}
