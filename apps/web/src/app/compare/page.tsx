import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import type { DesignTokens, SystemDetail, SystemListItem, TokenSummary } from "@agentds/shared";
import {
  PalettePreview,
  SpacingPreview,
  TypeScalePreview,
  googleFontsUrl,
} from "@agentds/shared/preview";
import { SpecimenFonts } from "../../components/specimen-fonts";
import { fetchCatalogOptions, fetchSystem } from "../../lib/api";

export const metadata: Metadata = {
  title: "Compare design systems",
  description:
    "Compare the palettes, typography, and spacing of two or three agent-ready design systems.",
  alternates: { canonical: "/compare" },
};

export const revalidate = 300;

type SearchParams = Record<string, string | string[] | undefined>;

function requestedSlugs(params: SearchParams): string[] {
  const value = params["systems"];
  const values = Array.isArray(value) ? value : value ? [value] : [];
  return [...new Set(values.map((slug) => slug.trim()).filter(Boolean))].slice(0, 3);
}

function typographyTokens(summary: TokenSummary): NonNullable<DesignTokens["typography"]> {
  return Object.fromEntries(
    Object.entries(summary.typography).map(([name, level]) => [
      name,
      Object.fromEntries(Object.entries(level).filter((entry) => entry[1] !== undefined)),
    ]),
  );
}

function gridColumns(count: number): CSSProperties {
  const columnCount = Math.max(count, 2);
  return {
    gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
    minWidth: `${columnCount * 272 + (columnCount - 1) * 24}px`,
  };
}

function SelectionForm({ options, selected }: { options: SystemListItem[]; selected: string[] }) {
  const fields = [
    { label: "first system", required: true },
    { label: "second system", required: true },
    { label: "third system", required: false },
  ] as const;

  return (
    <form action="/compare" method="get" className="rounded-lg border border-border p-6">
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end">
        {fields.map((field, index) => (
          <label key={field.label} className="flex min-w-0 flex-col gap-1">
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.04em] text-on-surface-variant">
              {field.label}
            </span>
            <select
              name="systems"
              required={field.required}
              defaultValue={selected[index] ?? ""}
              className="w-full min-w-0 max-w-full rounded-md border border-border bg-surface px-3 py-2.5 text-sm text-on-surface"
            >
              <option value="">{field.required ? "choose a system" : "none"}</option>
              {options.map((system) => (
                <option key={system.slug} value={system.slug}>
                  {system.name} — {system.path === "official" ? "Official" : "Brand Look"}
                </option>
              ))}
            </select>
          </label>
        ))}
        <button
          type="submit"
          className="w-full rounded-md bg-primary px-5 py-2.5 font-mono text-[0.8125rem] uppercase tracking-[0.04em] text-on-primary transition-colors duration-150 ease-out hover:bg-accent hover:text-on-accent lg:w-auto"
        >
          compare
        </button>
      </div>
    </form>
  );
}

function SystemHeading({ system }: { system: SystemDetail }) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border bg-surface-variant p-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-sm border border-border bg-surface px-2.5 py-1 font-mono text-[0.6875rem] tracking-[0.04em] text-on-surface-variant">
          {system.path === "official" ? "official system" : "brand look"}
        </span>
        {system.restricted ? (
          <span className="rounded-full bg-warning px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.04em] text-surface">
            restricted
          </span>
        ) : null}
      </div>
      <div>
        <h2 className="font-display text-2xl font-semibold text-primary">{system.name}</h2>
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.04em] text-on-surface-variant">
          {system.maker}
        </p>
      </div>
      <p className="text-sm leading-relaxed text-on-surface-variant">{system.summary}</p>
      {system.restricted ? (
        <p className="text-sm leading-relaxed text-warning">
          {system.restricted_reason ?? "Reference-only; file actions remain unavailable."}
        </p>
      ) : null}
      <Link
        href={`/systems/${system.slug}`}
        className="mt-auto font-mono text-[0.8125rem] uppercase tracking-[0.04em] text-accent hover:underline"
      >
        open system →
      </Link>
    </div>
  );
}

function EmptyTokens({ system }: { system: SystemDetail }) {
  return (
    <div className="rounded-lg border border-border p-6">
      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.04em] text-on-surface-variant">
        {system.name} has no preview tokens available
      </p>
    </div>
  );
}

function ComparisonLedger({ systems }: { systems: SystemDetail[] }) {
  const fontsHref = googleFontsUrl(
    systems.flatMap((system) => system.token_summary?.fonts ?? []).filter(Boolean),
  );
  const columns = gridColumns(systems.length);

  return (
    <section aria-labelledby="comparison-heading" className="flex min-w-0 flex-col gap-8">
      {fontsHref ? <SpecimenFonts href={fontsHref} /> : null}
      <h2 id="comparison-heading" className="sr-only">
        Token comparison
      </h2>
      <div className="min-w-0 overflow-x-auto pb-2">
        <div className="grid w-full gap-6" style={columns}>
          {systems.map((system) => (
            <SystemHeading key={system.slug} system={system} />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="font-mono text-[0.8125rem] font-medium uppercase tracking-[0.04em] text-on-surface-variant">
          colors:
        </h3>
        <div className="min-w-0 overflow-x-auto pb-2">
          <div className="grid w-full gap-6" style={columns}>
            {systems.map((system) =>
              system.token_summary && Object.keys(system.token_summary.colors).length > 0 ? (
                <div
                  key={system.slug}
                  className="rounded-lg border border-border bg-surface-variant p-6"
                >
                  <PalettePreview colors={system.token_summary.colors} limit={8} />
                </div>
              ) : (
                <EmptyTokens key={system.slug} system={system} />
              ),
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="font-mono text-[0.8125rem] font-medium uppercase tracking-[0.04em] text-on-surface-variant">
          typography:
        </h3>
        <div className="min-w-0 overflow-x-auto pb-2">
          <div className="grid w-full gap-6" style={columns}>
            {systems.map((system) =>
              system.token_summary && Object.keys(system.token_summary.typography).length > 0 ? (
                <div
                  key={system.slug}
                  className="rounded-lg border border-border bg-surface-variant p-6"
                >
                  <TypeScalePreview
                    typography={typographyTokens(system.token_summary)}
                    specimen={system.name}
                  />
                </div>
              ) : (
                <EmptyTokens key={system.slug} system={system} />
              ),
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="font-mono text-[0.8125rem] font-medium uppercase tracking-[0.04em] text-on-surface-variant">
          spacing:
        </h3>
        <div className="min-w-0 overflow-x-auto pb-2">
          <div className="grid w-full gap-6" style={columns}>
            {systems.map((system) =>
              system.token_summary && Object.keys(system.token_summary.spacing).length > 0 ? (
                <div
                  key={system.slug}
                  className="rounded-lg border border-border bg-surface-variant p-6"
                >
                  <SpacingPreview spacing={system.token_summary.spacing} />
                </div>
              ) : (
                <EmptyTokens key={system.slug} system={system} />
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const requested = requestedSlugs(params);
  const catalog = await fetchCatalogOptions();
  const available = new Set(catalog.items.map((system) => system.slug));
  const selected = requested.filter((slug) => available.has(slug));
  const unavailable = requested.filter((slug) => !available.has(slug));
  const systems = (await Promise.all(selected.map((slug) => fetchSystem(slug)))).filter(
    (system): system is SystemDetail => system !== null,
  );
  const ready = systems.length >= 2;

  return (
    <div className="mx-auto flex min-w-0 max-w-[1200px] flex-col gap-10 px-6 py-16">
      <header className="flex flex-col gap-3">
        <p className="font-mono text-[0.8125rem] font-medium uppercase tracking-[0.04em] text-accent">
          ## compare systems
        </p>
        <h1 className="max-w-[18ch] font-display text-[3.25rem] font-semibold leading-[1.08] tracking-[-0.02em] text-primary">
          Read the tokens side by side.
        </h1>
        <p className="max-w-[72ch] text-lg leading-[1.65] text-on-surface-variant">
          Choose two or three systems. Their source-grounded colors, type scales, and spacing stay
          aligned so the differences are visible before you install a file.
        </p>
        {!catalog.live ? (
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.04em] text-on-surface-variant">
            api unreachable — comparing files bundled with this build
          </p>
        ) : null}
      </header>

      <SelectionForm options={catalog.items} selected={selected} />

      {unavailable.length > 0 ? (
        <div className="rounded-lg border border-warning p-6" role="status">
          <p className="font-mono text-[0.8125rem] uppercase tracking-[0.04em] text-warning">
            one or more requested systems are unavailable
          </p>
          <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
            Choose published systems from the selectors and compare again.
          </p>
        </div>
      ) : null}

      {ready ? (
        <ComparisonLedger systems={systems} />
      ) : (
        <section className="flex flex-col items-start gap-4 rounded-lg border border-border p-10">
          <p className="font-mono text-[0.8125rem] uppercase tracking-[0.04em] text-on-surface-variant">
            {systems.length === 1 ? "choose one more system" : "choose systems to compare"}
          </p>
          <p className="max-w-[60ch] text-sm leading-relaxed text-on-surface-variant">
            Start with two systems; add a third when you need a wider reference set.
          </p>
          <Link
            href="/compare?systems=carbon&systems=material-3"
            className="rounded-md border border-border px-4 py-2 font-mono text-[0.8125rem] uppercase tracking-[0.04em] text-primary transition-colors duration-150 ease-out hover:border-accent hover:text-accent"
          >
            try Carbon + Material 3
          </Link>
        </section>
      )}
    </div>
  );
}
