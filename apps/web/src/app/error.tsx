"use client";

/** Route-level error boundary (500-class) — DESIGN.md states rule (F-1/F-2). */
export default function RootError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto flex max-w-[720px] flex-col gap-6 px-6 py-24">
      <p className="font-mono text-[0.8125rem] font-medium uppercase tracking-[0.04em] text-accent">
        ## error
      </p>
      <h1 className="font-display text-[2.25rem] font-semibold leading-[1.15] text-primary">
        Something broke on our side.
      </h1>
      <p className="max-w-[64ch] text-lg leading-[1.65] text-on-surface-variant">
        The page hit an unexpected error. It is not you — try again, and if it keeps happening the
        catalog files are still directly reachable through the API.
      </p>
      <div>
        <button
          type="button"
          onClick={reset}
          className="rounded-md bg-primary px-5 py-3 text-on-primary transition-colors duration-150 ease-out hover:bg-accent"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
