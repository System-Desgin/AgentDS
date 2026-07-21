import { ImageResponse } from "next/og";

/**
 * Default share card for pages without a per-system image (home, catalog,
 * static pages). Static markup from the site's own DESIGN.md tokens — same
 * visual language as the per-system card.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "AgentDS — agent-ready design systems";

const SITE_PALETTE: [string, string][] = [
  ["primary", "#17150F"],
  ["accent", "#BC4A26"],
  ["code-accent", "#D9A054"],
  ["surface-variant", "#F1EBDF"],
  ["success", "#3F6B42"],
  ["border", "#E3DBC9"],
];

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "flex-start",
        backgroundColor: "#FAF7F2",
        color: "#17150F",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
        padding: 72,
        width: "100%",
      }}
    >
      <div style={{ color: "#BC4A26", display: "flex", fontSize: 28 }}>
        ## agent-ready design systems
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", fontSize: 96, fontWeight: 600 }}>AgentDS</div>
        <div style={{ color: "#57503F", display: "flex", fontSize: 32, maxWidth: 900 }}>
          A free catalog of DESIGN.md files — real design systems, ready for any coding agent.
        </div>
        <div
          style={{
            backgroundColor: "#201D14",
            borderRadius: 10,
            color: "#D9A054",
            display: "flex",
            fontSize: 24,
            marginTop: 8,
            padding: "14px 20px",
          }}
        >
          npx skills add System-Desgin/AgentDS --skill design-systems
        </div>
      </div>
      <div style={{ display: "flex", gap: 16 }}>
        {SITE_PALETTE.map(([name, value]) => (
          <div key={name} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div
              style={{
                backgroundColor: value,
                border: "1px solid #E3DBC9",
                borderRadius: 12,
                display: "flex",
                height: 72,
                width: 128,
              }}
            />
            <div style={{ color: "#57503F", display: "flex", fontSize: 18 }}>{value}</div>
          </div>
        ))}
      </div>
    </div>,
    size,
  );
}
