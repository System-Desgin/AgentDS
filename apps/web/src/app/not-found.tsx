import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-[1200px] flex-col items-start gap-6 px-6 py-24">
      <p className="font-mono text-[0.8125rem] font-medium uppercase tracking-[0.04em] text-accent">
        ## 404
      </p>
      <h1 className="font-display text-4xl font-semibold text-primary">
        No such file in the catalog.
      </h1>
      <p className="max-w-[60ch] leading-relaxed text-on-surface-variant">
        The system you&apos;re looking for doesn&apos;t exist or isn&apos;t published yet. Every
        entry ships only after a zero-error lint pass and human QA.
      </p>
      <Link
        href="/systems"
        className="rounded-md bg-primary px-5 py-2.5 font-mono text-[0.8125rem] uppercase tracking-[0.04em] text-on-primary transition-colors duration-150 ease-out hover:bg-accent hover:text-on-accent"
      >
        browse the catalog
      </Link>
    </div>
  );
}
