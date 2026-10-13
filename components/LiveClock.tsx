"use client";

import { useSyncExternalStore } from "react";

const timeZone = "Asia/Jakarta";

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short",
  timeZone,
});

const timeFormat = new Intl.DateTimeFormat("id-ID", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone,
});

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 15_000);
  return () => clearInterval(id);
}

export function LiveClock({ withDate = false }: { withDate?: boolean }) {
  const text = useSyncExternalStore(
    subscribe,
    () => {
      const now = new Date();
      const time = timeFormat.format(now);
      return withDate ? `${dateFormat.format(now)}  ${time}` : time;
    },
    () => "",
  );

  return (
    <time className="whitespace-pre tabular-nums">
      {text}
    </time>
  );
}
