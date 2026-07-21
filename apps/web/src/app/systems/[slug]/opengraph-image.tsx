import { ImageResponse } from "next/og";
import { fetchSystem } from "../../../lib/api";

/** Per-system share card generated from real tokens (F-2): name + palette. */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "System palette and name";

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const system = await fetchSystem(slug);
  const palette = Object.entries(system?.token_summary?.colors ?? {}).slice(0, 6);

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
        ## AgentDS — agent-ready design systems
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", fontSize: 84, fontWeight: 600 }}>{system?.name ?? slug}</div>
        <div style={{ color: "#57503F", display: "flex", fontSize: 32 }}>
          {system ? `${system.maker} · ${system.path} · DESIGN.md` : "DESIGN.md"}
        </div>
      </div>
      <div style={{ display: "flex", gap: 16 }}>
        {palette.map(([name, value]) => (
          <div key={name} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div
              style={{
                backgroundColor: value,
                border: "1px solid #E3DBC9",
                borderRadius: 12,
                display: "flex",
                height: 96,
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
