"use client";

import { useSyncExternalStore } from "react";
import { site, type Webinar } from "@/content/site";
import { Icons } from "./Icons";

const noopSubscribe = () => () => {};
const TWO_HOURS = 2 * 60 * 60 * 1000;

const endOf = (w: Webinar) => (w.end ? new Date(w.end).getTime() : new Date(w.start).getTime() + TWO_HOURS);

/**
 * The next webinar that hasn't finished. "Now" is only read in the browser so
 * the statically-built page never goes stale; the server renders the earliest one.
 */
function useNextWebinar(items: Webinar[]) {
  const now = useSyncExternalStore(
    noopSubscribe,
    () => Math.floor(Date.now() / 60_000) * 60_000,
    () => null,
  );
  const sorted = [...items].sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
  return now === null ? sorted[0] : sorted.find((w) => endOf(w) > now);
}

const dateFmt = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  timeZone: site.timeZone,
});
const shortFmt = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: site.timeZone });
const monthFmt = new Intl.DateTimeFormat("en-US", { month: "short", timeZone: site.timeZone });
const dayFmt = new Intl.DateTimeFormat("en-US", { day: "numeric", timeZone: site.timeZone });

/** Slim announcement bar above the header. */
export function WebinarBar({ items }: { items: Webinar[] }) {
  const w = useNextWebinar(items);
  if (!w) return null;
  return (
    <a className="webinar-bar" href={w.registrationUrl}>
      <span className="webinar-bar-tag">{w.label ?? "Webinar"}</span>
      <span className="webinar-bar-text">
        {w.title} · {shortFmt.format(new Date(w.start))}
      </span>
      <span className="webinar-bar-cta">
        Register {Icons.arrowRight}
      </span>
    </a>
  );
}

/** Prominent webinar card for the homepage hero. */
export function WebinarCard({ items }: { items: Webinar[] }) {
  const w = useNextWebinar(items);
  if (!w) return null;
  const d = new Date(w.start);
  return (
    <article className="webinar-card" id="webinars" aria-labelledby="webinar-title">
      <p className="webinar-tag">
        <span className="badge-dot" aria-hidden="true" />
        {w.label ?? "Upcoming webinar"}
      </p>
      <div className="webinar-main">
        <div className="webinar-date" aria-hidden="true">
          <span>{monthFmt.format(d)}</span>
          <strong>{dayFmt.format(d)}</strong>
        </div>
        <div>
          <h2 id="webinar-title">{w.title}</h2>
          <p className="webinar-when">
            <time dateTime={w.start}>{dateFmt.format(d)}</time> · {w.timeLabel}
          </p>
        </div>
      </div>
      <p className="webinar-desc">{w.description}</p>
      <a className="btn btn-white btn-block" href={w.registrationUrl}>
        Register for free {Icons.arrowRight}
      </a>
    </article>
  );
}
