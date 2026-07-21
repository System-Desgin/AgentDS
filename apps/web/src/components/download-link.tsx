"use client";

import type { EventType } from "@agentds/shared";
import { API_URL } from "../lib/site";

/**
 * Download/action link that reports an aggregate usage counter on click
 * (F-3 — fire-and-forget, no PII). The navigation itself is a plain <a>.
 */
export function DownloadLink({
  href,
  label,
  eventSlug,
  eventType = "download",
}: {
  href: string;
  label: string;
  eventSlug: string;
  eventType?: EventType;
}) {
  function report() {
    void fetch(`${API_URL}/v1/events`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ slug: eventSlug, type: eventType }),
      keepalive: true,
    }).catch(() => undefined);
  }

  return (
    <a
      href={href}
      onClick={report}
      className="rounded-md border border-border bg-surface px-4 py-2 font-mono text-[0.8125rem] uppercase tracking-[0.04em] text-primary transition-colors duration-150 ease-out hover:border-accent hover:text-accent"
    >
      {label}
    </a>
  );
}
