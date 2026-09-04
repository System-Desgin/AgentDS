"use client";

import Link from "next/link";

export default function CategoryError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto max-w-[1200px] px-6 py-16">
      <div className="flex flex-col items-start gap-4 rounded-lg border border-border p-10">
        <p className="font-mono text-[0.8125rem] text-error">category failed to load</p>
        <p className="max-w-[60ch] text-sm leading-relaxed text-on-surface-variant">
          Retry this category or return to the full catalog.
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-md bg-primary px-4 py-2 font-mono text-[0.8125rem] uppercase tracking-[0.04em] text-on-primary transition-colors duration-150 ease-out hover:bg-accent hover:text-on-accent"
          >
            retry
          </button>
          <Link
            href="/systems"
            className="rounded-md border border-border px-4 py-2 font-mono text-[0.8125rem] uppercase tracking-[0.04em] text-primary transition-colors duration-150 ease-out hover:border-accent hover:text-accent"
          >
            catalog
          </Link>
        </div>
      </div>
    </div>
  );
}
