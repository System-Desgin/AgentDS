import Link from "next/link";

const NAV_ITEMS = [
  { href: "/systems", label: "catalog" },
  { href: "/what-is-design-md", label: "what-is-design-md" },
  { href: "/api", label: "api" },
  { href: "/about", label: "about" },
] as const;

export function SiteHeader() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-x-6 gap-y-2 px-6 py-4">
        <Link
          href="/"
          className="font-mono text-sm font-medium tracking-[0.04em] text-primary transition-colors duration-150 ease-out hover:text-accent"
        >
          ## AgentDS
        </Link>
        <nav aria-label="Main" className="flex flex-wrap items-center gap-x-5 gap-y-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-[0.8125rem] uppercase tracking-[0.04em] text-on-surface-variant transition-colors duration-150 ease-out hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
