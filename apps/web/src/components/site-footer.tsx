import Link from "next/link";
import { CONTACT_EMAIL, GITHUB_URL } from "../lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-6 py-10 text-sm text-on-surface-variant">
        <p className="max-w-[72ch] leading-relaxed">
          Code Apache-2.0 · catalog content CC BY 4.0 with per-entry upstream notices. Brand Looks
          are independent analyses of publicly observable design patterns — not affiliated with,
          endorsed by, or sponsored by the named makers. All trademarks belong to their owners.
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-1 font-mono text-[0.8125rem] uppercase tracking-[0.04em]">
          <a
            href={GITHUB_URL}
            rel="noopener noreferrer"
            className="transition-colors duration-150 ease-out hover:text-accent"
          >
            github
          </a>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="transition-colors duration-150 ease-out hover:text-accent"
          >
            contact
          </a>
          <Link href="/about" className="transition-colors duration-150 ease-out hover:text-accent">
            legal
          </Link>
        </div>
      </div>
    </footer>
  );
}
