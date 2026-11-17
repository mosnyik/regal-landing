"use client";

import { useEffect, useState } from "react";

function parts(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return {
    Days: Math.floor(s / 86400),
    Hours: Math.floor((s % 86400) / 3600),
    Mins: Math.floor((s % 3600) / 60),
    Secs: s % 60,
  };
}

/** Countdown to training start. Renders zeros until mounted to avoid hydration mismatch. */
export function Countdown({ to }: { to: string }) {
  const target = new Date(to).getTime();
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setLeft(target - Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  if (left !== null && left <= 0) return null;
  const p = parts(left ?? 0);

  return (
    <div className="countdown" role="timer" aria-label="Time until training starts">
      {Object.entries(p).map(([label, v]) => (
        <div key={label}>
          <span>{left === null ? "--" : String(v).padStart(2, "0")}</span>
          <small>{label}</small>
        </div>
      ))}
    </div>
  );
}
