import Link from "next/link";
import type { SystemListItem } from "@agentds/shared";
import { MiniPalette } from "@agentds/shared/preview";

/** Catalog card (F-1): mini palette + initial, badges, summary, category chips. */
export function SystemCard({ system }: { system: SystemListItem }) {
  return (
    <Link
      href={`/systems/${system.slug}`}
      className="group flex flex-col gap-4 rounded-lg border border-border bg-surface-variant p-6 transition-colors duration-150 ease-out hover:border-accent"
    >
      <MiniPalette
        colors={Object.fromEntries(system.palette.map((value, index) => [String(index), value]))}
        name={system.name}
        {...(system.display_font ? { displayFontFamily: system.display_font } : {})}
      />
      <div>
        <h3 className="font-display text-2xl font-semibold text-primary group-hover:text-accent">
          {system.name}
        </h3>
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.04em] text-on-surface-variant">
          {system.maker} · {system.path === "official" ? "official system" : "brand look"}
        </p>
      </div>
      <p className="text-sm leading-relaxed text-on-surface-variant">{system.summary}</p>
      <div className="mt-auto flex flex-wrap gap-2">
        {system.restricted ? (
          <span className="rounded-full bg-warning px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.04em] text-surface">
            restricted
          </span>
        ) : null}
        {system.categories.slice(0, 3).map((category) => (
          <span
            key={category}
            className="rounded-sm border border-border bg-surface px-2.5 py-1 font-mono text-[0.6875rem] tracking-[0.04em] text-on-surface-variant"
          >
            {category}
          </span>
        ))}
      </div>
    </Link>
  );
}
