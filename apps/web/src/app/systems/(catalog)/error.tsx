"use client";

import Link from "next/link";

/** Error state for the catalog (F-1). Client boundary as Next.js requires. */
export default function SystemsError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto max-w-[1200px] px-6 py-16">
      <div className="flex flex-col items-start gap-4 rounded-lg border border-border p-10">
        <p className="font-mono text-[0.8125rem] uppercase tracking-[0.04em] text-error">
          something went wrong loading the catalog
        </p>
        <p className="max-w-[60ch] text-sm leading-relaxed text-on-surface-variant">
          The error has been logged. You can retry, or head back home.
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-md bg-primary px-4 py-2 font-mono text-[0.8125rem] uppercase tracking-[0.04em] text-on-primary transition-colors duration-150 ease-out hover:bg-accent hover:text-on-accent"
          >
            retry
          </button>
          <Link
            href="/"
            className="rounded-md border border-border px-4 py-2 font-mono text-[0.8125rem] uppercase tracking-[0.04em] text-primary transition-colors duration-150 ease-out hover:border-accent hover:text-accent"
          >
            home
          </Link>
        </div>
      </div>
    </div>
  );
}
