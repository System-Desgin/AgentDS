import type { NextConfig } from "next";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const REPOSITORY_ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");

const API_ORIGIN = new URL(
  process.env["NEXT_PUBLIC_API_URL"] ?? "https://api.agent-ds.oday-bakkour.com",
).origin;

// Umami is env-gated (see components/analytics.tsx); its origin joins the CSP
// only when the script is actually configured.
const UMAMI_SRC = process.env["NEXT_PUBLIC_UMAMI_SRC"];
const UMAMI_ORIGIN = UMAMI_SRC ? new URL(UMAMI_SRC).origin : null;

/**
 * Strict-as-static-allows CSP. App Router prerenders pages with inline
 * bootstrap scripts, so `script-src` needs 'unsafe-inline' unless the whole
 * site moves to per-request nonces (dynamic rendering) — documented trade-off
 * in docs/03-DEV-CHECKLIST.md Phase 5. Everything else is locked down.
 * fonts.googleapis.com/gstatic serve the detail-page type specimens
 * (packages/shared preview loader).
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${UMAMI_ORIGIN ? ` ${UMAMI_ORIGIN}` : ""}`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data:",
  `connect-src 'self' ${API_ORIGIN}${UMAMI_ORIGIN ? ` ${UMAMI_ORIGIN}` : ""}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Consume the workspace shared package directly (compiled JS + types).
  transpilePackages: ["@agentds/shared"],
  poweredByHeader: false,
  // Trace from the monorepo root, but bundle only the two files the graceful
  // API fallback reads. Patterns remain relative to this Next.js project.
  outputFileTracingRoot: REPOSITORY_ROOT,
  outputFileTracingIncludes: {
    "/*": ["../../content/**/meta.yaml", "../../content/**/DESIGN.md"],
  },
  outputFileTracingExcludes: {
    "/*": [
      "../../content/LICENSE",
      "../../content/README.md",
      "../../content/**/bundle.zip",
      "../../content/**/QA.md",
      "../../content/**/lint-report.json",
      "../../content/**/tailwind.css",
      "../../content/**/tokens.json",
      "../../content/**/verify-report.json",
    ],
  },
  headers() {
    return Promise.resolve([{ source: "/(.*)", headers: securityHeaders }]);
  },
};

export default nextConfig;
