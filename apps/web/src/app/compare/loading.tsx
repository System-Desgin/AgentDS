export default function CompareLoading() {
  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-10 px-6 py-16" aria-busy="true">
      <div className="flex flex-col gap-3">
        <div className="h-4 w-36 rounded-sm bg-surface-variant" />
        <div className="h-28 w-[40rem] max-w-full rounded-sm bg-surface-variant" />
      </div>
      <div className="h-32 rounded-lg border border-border bg-surface-variant" />
      <div className="grid gap-6 md:grid-cols-2">
        <div className="h-72 rounded-lg border border-border bg-surface-variant" />
        <div className="h-72 rounded-lg border border-border bg-surface-variant" />
      </div>
      <span className="sr-only">Loading comparison…</span>
    </div>
  );
}
