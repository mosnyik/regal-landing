import "server-only";

/**
 * Lightweight spam protection, no third-party service required:
 *  1. Honeypot field ("company_website") hidden from humans.
 *  2. Minimum fill time — bots submit instantly.
 *  3. Per-IP rate limit (in-memory, per server instance).
 *
 * For stronger protection, add Cloudflare Turnstile or hCaptcha and verify the
 * token here.
 */

const MIN_FILL_MS = 2500;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 8;

const hits = new Map<string, number[]>();

export type SpamCheck = { ok: true } | { ok: false; silent: boolean };

export function checkSpam(fd: FormData, ip: string): SpamCheck {
  const honeypot = fd.get("company_website");
  if (typeof honeypot === "string" && honeypot.length > 0) {
    // Pretend success so bots don't learn anything.
    return { ok: false, silent: true };
  }

  const startedAt = Number(fd.get("form_started"));
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS) {
    return { ok: false, silent: true };
  }

  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) return { ok: false, silent: false };
  recent.push(now);
  hits.set(ip, recent);

  return { ok: true };
}
