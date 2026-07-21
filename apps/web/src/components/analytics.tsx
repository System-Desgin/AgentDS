import Script from "next/script";

/**
 * Self-hosted Umami (cookieless, aggregate-only — CLAUDE.md rule 15). Renders
 * nothing until both env vars are configured, so dev/preview stay script-free.
 */
export function Analytics() {
  const src = process.env["NEXT_PUBLIC_UMAMI_SRC"];
  const websiteId = process.env["NEXT_PUBLIC_UMAMI_WEBSITE_ID"];
  if (!src || !websiteId) return null;
  return <Script src={src} data-website-id={websiteId} strategy="lazyOnload" />;
}
