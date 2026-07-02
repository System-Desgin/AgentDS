export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-6 px-6 py-16">
      <p className="font-mono text-sm uppercase tracking-widest text-accent">## AgentDS</p>
      <h1 className="font-display text-5xl font-semibold leading-tight text-primary">
        Agent-ready design systems.
      </h1>
      <p className="max-w-prose text-lg leading-relaxed text-on-surface-variant">
        A free, curated catalog of design system files (<code>DESIGN.md</code> + tokens) with visual
        previews, purpose guidance, and a public fetch API — so any coding agent builds UI that
        follows a real design system instead of generic defaults.
      </p>
      <div className="w-fit rounded-md bg-code-bg px-4 py-3 font-mono text-sm text-code-accent">
        npx skills add System-Design/AgentDS --skill design-systems
      </div>
      <p className="font-mono text-xs uppercase tracking-widest text-on-surface-variant">
        Phase 0 — foundation. Catalog, previews, and API arrive in later phases.
      </p>
    </main>
  );
}
