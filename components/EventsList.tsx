"use client";

import { useSyncExternalStore } from "react";
import { site, type EventItem } from "@/content/site";

const noopSubscribe = () => () => {};

const dateFmt = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: site.timeZone,
});
const monthFmt = new Intl.DateTimeFormat("en-US", { month: "short", timeZone: site.timeZone });
const dayFmt = new Intl.DateTimeFormat("en-US", { day: "numeric", timeZone: site.timeZone });

/**
 * Events are sorted upcoming-first; past ones are labelled "Completed".
 * "Past" is decided in the browser (after mount) so the static page never goes stale.
 */
export function EventsList({ events }: { events: EventItem[] }) {
  // null on the server / during hydration, the current minute in the browser.
  const now = useSyncExternalStore(
    noopSubscribe,
    () => Math.floor(Date.now() / 60_000) * 60_000,
    () => null,
  );

  const isDone = (e: EventItem) => e.completed || (now !== null && new Date(e.start).getTime() < now);

  const sorted = [...events].sort((a, b) => {
    const da = isDone(a), db = isDone(b);
    if (da !== db) return da ? 1 : -1;
    const ta = new Date(a.start).getTime(), tb = new Date(b.start).getTime();
    return da ? tb - ta : ta - tb;
  });

  if (!sorted.length) {
    return <p className="sub">New events will be announced soon. Check back shortly.</p>;
  }

  return (
    <ul className="event-grid">
      {sorted.map((e) => {
        const done = isDone(e);
        const d = new Date(e.start);
        return (
          <li key={e.id} className={`event${done ? " is-done" : ""}`}>
            <div className="event-date" aria-hidden="true">
              <span>{monthFmt.format(d)}</span>
              <strong>{dayFmt.format(d)}</strong>
            </div>
            <div className="event-body">
              {done && <span className="event-flag">Completed</span>}
              {e.format && !done && <span className="event-format">{e.format}</span>}
              <h3>{e.title}</h3>
              <p>{e.description}</p>
              <dl className="event-meta">
                <div>
                  <dt>Date</dt>
                  <dd>
                    <time dateTime={e.start}>{dateFmt.format(d)}</time>
                  </dd>
                </div>
                <div>
                  <dt>Time</dt>
                  <dd>{e.timeLabel}</dd>
                </div>
                {e.format && (
                  <div>
                    <dt>Format</dt>
                    <dd>{e.format}</dd>
                  </div>
                )}
              </dl>
              {done ? (
                <span className="btn btn-sm btn-ghost is-disabled" aria-disabled="true">
                  Event completed
                </span>
              ) : (
                <a className="btn btn-sm" href={e.registrationUrl} target="_blank" rel="noopener noreferrer">
                  Register Now
                  <span className="sr-only"> for {e.title} (opens in a new tab)</span>
                </a>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
