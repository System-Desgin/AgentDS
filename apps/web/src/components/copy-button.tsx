"use client";

import { useState } from "react";
import type { EventType } from "@agentds/shared";
import { API_URL } from "../lib/site";

/**
 * The site's one interactive primitive: copy text to the clipboard and
 * (optionally) report an aggregate usage event (F-3 — fire-and-forget, no
 * PII, no cookies). Client component by necessity; everything around it stays
 * server-rendered.
 */
export function CopyButton({
  text,
  label,
  eventSlug,
  eventType,
  className,
}: {
  text: string;
  label: string;
  eventSlug?: string;
  eventType?: EventType;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (permissions/http) — quietly do nothing.
    }
    if (eventSlug && eventType) {
      void fetch(`${API_URL}/v1/events`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ slug: eventSlug, type: eventType }),
        keepalive: true,
      }).catch(() => undefined);
    }
  }

  return (
    <button
      type="button"
      onClick={() => void copy()}
      className={
        className ??
        "rounded-md border border-border bg-surface px-4 py-2 font-mono text-[0.8125rem] uppercase tracking-[0.04em] text-primary transition-colors duration-150 ease-out hover:border-accent hover:text-accent"
      }
      aria-live="polite"
    >
      {copied ? "copied" : label}
    </button>
  );
}
