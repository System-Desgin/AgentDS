import { codeToHtml } from "shiki";
import { CopyButton } from "./copy-button";

/**
 * Shiki theme built from the project's own code-register tokens (DESIGN.md:
 * code-bg / code-fg / code-accent) — no invented colors; comments reuse
 * code-fg at reduced alpha.
 */
const AGENTDS_CODE_THEME = {
  name: "agentds-code",
  type: "dark" as const,
  colors: {
    "editor.background": "#201D14",
    "editor.foreground": "#F1EADA",
  },
  settings: [
    { settings: { background: "#201D14", foreground: "#F1EADA" } },
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: { foreground: "#F1EADA80" },
    },
    {
      scope: [
        "entity.name.tag",
        "support.type.property-name",
        "keyword",
        "markup.heading",
        "punctuation.definition.heading",
        "string",
      ],
      settings: { foreground: "#D9A054" },
    },
  ],
};

/**
 * Raw DESIGN.md viewer (F-2): syntax-highlighted, collapsible via <details>
 * (zero client JS), copy button in the summary row.
 */
export async function DesignMdViewer({ slug, markdown }: { slug: string; markdown: string }) {
  const html = await codeToHtml(markdown, {
    lang: "markdown",
    theme: AGENTDS_CODE_THEME,
  });

  return (
    <details className="group rounded-md bg-code-bg">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 font-mono text-[0.8125rem] uppercase tracking-[0.04em] text-code-accent [&::-webkit-details-marker]:hidden">
        <span>
          <span
            aria-hidden="true"
            className="mr-2 inline-block transition-transform duration-150 ease-out group-open:rotate-90"
          >
            ›
          </span>
          DESIGN.md — view raw file
        </span>
        <CopyButton
          text={markdown}
          label="copy file"
          eventSlug={slug}
          eventType="copy"
          className="rounded-md border border-code-fg/30 px-3 py-1.5 font-mono text-[0.75rem] uppercase tracking-[0.04em] text-code-fg transition-colors duration-150 ease-out hover:border-code-accent hover:text-code-accent"
        />
      </summary>
      <div
        className="max-h-[36rem] overflow-auto px-6 pb-6 font-mono text-sm leading-[1.7] [&_pre]:!bg-transparent"
        // Shiki output is generated server-side from our own content.
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </details>
  );
}
