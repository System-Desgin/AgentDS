import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL, GITHUB_URL } from "../../lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why AgentDS exists, how entries are produced and verified, and the legal ground rules for Official Systems and Brand Looks.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <article className="mx-auto flex max-w-[720px] flex-col gap-10 px-6 py-16">
      <header className="flex flex-col gap-4">
        <p className="font-mono text-[0.8125rem] font-medium uppercase tracking-[0.04em] text-accent">
          ## about
        </p>
        <h1 className="font-display text-[2.25rem] font-semibold leading-[1.15] text-primary">
          A catalog you can trust your agent with.
        </h1>
      </header>

      <section className="flex flex-col gap-4 leading-[1.65] text-on-surface">
        <h2 className="font-display text-2xl font-semibold text-primary">Why</h2>
        <p>
          Coding agents ship features fast and invent visual language badly. AgentDS exists so any
          agent can follow a real design system: every entry is a spec-compliant DESIGN.md with
          exact tokens, produced by a repeatable pipeline, linted by the official tooling, and
          reviewed by a human before publication.
        </p>
      </section>

      <section className="flex flex-col gap-4 leading-[1.65] text-on-surface">
        <h2 className="font-display text-2xl font-semibold text-primary">How entries are made</h2>
        <p>
          <strong>Official Systems</strong> are extracted from the systems&apos; own open-source
          token packages at pinned versions (provenance on every page). Prose is written fresh from
          the tokens — never copied from upstream docs. <strong>Brand Looks</strong> are independent
          analyses captured from publicly observable CSS on public pages: no logins, no assets, no
          logos. Both paths pass{" "}
          <code className="font-mono text-base">npx @google/design.md lint</code> with zero errors
          plus a signed human QA checklist before{" "}
          <code className="font-mono text-base">status: published</code>.
        </p>
      </section>

      <section className="flex flex-col gap-4 leading-[1.65] text-on-surface">
        <h2 className="font-display text-2xl font-semibold text-primary">Legal</h2>
        <ul className="flex list-disc flex-col gap-2 pl-5">
          <li>
            Code is Apache-2.0. Catalog content (
            <code className="font-mono text-base">content/</code>) is CC BY 4.0, with each entry
            carrying its upstream license notice — the original system&apos;s license always governs
            the underlying token values.
          </li>
          <li>
            Brand Looks are independent analyses of publicly observable design patterns — not
            affiliated with, endorsed by, or sponsored by the named makers. All trademarks belong to
            their owners. Use them as inspiration for an original system.
          </li>
          <li>
            Proprietary fonts are never served: token values substitute a licensed Google Fonts
            family and name the original in prose only.
          </li>
          <li>
            License-restricted systems (for example government identity systems) appear as
            reference-only entries: metadata is listed, downloads and API access are disabled with
            an explanatory <code className="font-mono text-base">451</code>.
          </li>
        </ul>
      </section>

      <section className="flex flex-col gap-4 leading-[1.65] text-on-surface">
        <h2 className="font-display text-2xl font-semibold text-primary">Privacy</h2>
        <p>
          No accounts, no cookies, no personal data. Usage counters are aggregate-only (a number per
          system per action). Analytics, when enabled, is self-hosted and cookieless.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-display text-2xl font-semibold text-primary">Contact</h2>
        <div className="flex flex-wrap gap-4 font-mono text-[0.8125rem] uppercase tracking-[0.04em]">
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline">
            {CONTACT_EMAIL}
          </a>
          <a href={GITHUB_URL} rel="noopener noreferrer" className="text-accent hover:underline">
            github ↗
          </a>
          <Link href="/systems" className="text-accent hover:underline">
            catalog →
          </Link>
        </div>
        <p className="text-sm leading-relaxed text-on-surface-variant">
          Security reports: email the address above. Takedown or licensing concern? Same address —
          entries are corrected or removed promptly.
        </p>
      </section>
    </article>
  );
}
