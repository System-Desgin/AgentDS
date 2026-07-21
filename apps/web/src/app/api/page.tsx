import type { Metadata } from "next";
import { CopyButton } from "../../components/copy-button";
import { API_URL } from "../../lib/site";

export const metadata: Metadata = {
  title: "API",
  description:
    "The AgentDS public fetch API: read-only JSON + raw-file endpoints for every published design system.",
};

const ENDPOINTS = [
  {
    path: "/v1/systems",
    returns: "Paginated list — filters: path, category, q, license, sort, page, limit (max 100)",
  },
  { path: "/v1/systems/{slug}", returns: "Full metadata + parsed token summary" },
  { path: "/v1/systems/{slug}/design.md", returns: "Raw markdown (text/markdown)" },
  { path: "/v1/systems/{slug}/tokens.json", returns: "W3C DTCG tokens" },
  { path: "/v1/systems/{slug}/tailwind.css", returns: "Tailwind v4 @theme CSS" },
  { path: "/v1/systems/{slug}/bundle.zip", returns: "Zip of the above + LICENSE-NOTICE.txt" },
  { path: "/v1/categories", returns: "Purpose taxonomy with counts" },
  { path: "/v1/health", returns: "Liveness/readiness" },
] as const;

export default function ApiPage() {
  const example = `curl -fsSL ${API_URL}/v1/systems/carbon/design.md`;
  return (
    <article className="mx-auto flex max-w-[720px] flex-col gap-8 px-6 py-16">
      <header className="flex flex-col gap-4">
        <p className="font-mono text-[0.8125rem] font-medium uppercase tracking-[0.04em] text-accent">
          ## api
        </p>
        <h1 className="font-display text-[2.25rem] font-semibold leading-[1.15] text-primary">
          Public fetch API
        </h1>
        <p className="max-w-[64ch] text-lg leading-[1.65] text-on-surface-variant">
          Read-only, no keys, open CORS. Rate limits: 60 requests/min per IP (file endpoints 120).
          Responses use a <code className="font-mono text-base">{"{ data, meta }"}</code> envelope;
          raw files ship correct content types, ETags, and cache headers. Restricted entries answer{" "}
          <code className="font-mono text-base">451</code> with a JSON reason.
        </p>
      </header>

      <div className="flex items-center gap-3">
        <pre className="flex-1 overflow-x-auto rounded-md bg-code-bg px-4 py-3 font-mono text-sm text-code-accent">
          {example}
        </pre>
        <CopyButton text={example} label="copy" />
      </div>

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border">
              <th
                scope="col"
                className="px-4 py-3 text-left font-mono text-[0.6875rem] uppercase tracking-[0.04em] text-on-surface-variant"
              >
                endpoint
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left font-mono text-[0.6875rem] uppercase tracking-[0.04em] text-on-surface-variant"
              >
                returns
              </th>
            </tr>
          </thead>
          <tbody>
            {ENDPOINTS.map((endpoint) => (
              <tr key={endpoint.path} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-mono text-[0.8125rem] text-primary">
                  GET {endpoint.path}
                </td>
                <td className="px-4 py-3 leading-relaxed text-on-surface-variant">
                  {endpoint.returns}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-sm leading-relaxed text-on-surface-variant">
        Interactive OpenAPI docs live at{" "}
        <a
          href={`${API_URL.replace("/v1", "")}/docs`}
          rel="noopener noreferrer"
          className="text-accent underline"
        >
          {API_URL}/docs
        </a>
        . Base URL: <code className="font-mono">{API_URL}</code>. Breaking changes will ship under{" "}
        <code className="font-mono">/v2</code> — <code className="font-mono">/v1</code> is stable.
      </p>
    </article>
  );
}
