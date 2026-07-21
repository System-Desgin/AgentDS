/** Skeleton state for the catalog (F-1: skeleton/empty/error states). */
export default function SystemsLoading() {
  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-10 px-6 py-16" aria-busy="true">
      <div className="flex flex-col gap-3">
        <div className="h-4 w-24 rounded-sm bg-surface-variant" />
        <div className="h-10 w-96 max-w-full rounded-sm bg-surface-variant" />
      </div>
      <div className="h-9 w-72 max-w-full rounded-full bg-surface-variant" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="h-56 rounded-lg border border-border bg-surface-variant" />
        ))}
      </div>
      <span className="sr-only">Loading catalog…</span>
    </div>
  );
}
