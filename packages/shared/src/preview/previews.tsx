import type { CSSProperties, ReactElement } from "react";
import type { DesignTokens } from "../content/front-matter";
import { previewFontStack } from "./fonts";

/**
 * Token-preview renderer (Phase 3, F-2): pure server-rendered markup built
 * from parsed DESIGN.md front matter. No client JS, no external styling
 * dependency — everything is inline styles derived from the tokens themselves,
 * so previews are portable across consumers. The AgentDS site provides the
 * surrounding card chrome.
 */

const MONO = "var(--font-mono, ui-monospace, monospace)";
const HAIRLINE = "1px solid var(--color-border, #E3DBC9)";
const MUTED = "var(--color-on-surface-variant, #57503F)";

const labelStyle: CSSProperties = {
  fontFamily: MONO,
  fontSize: "0.6875rem",
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  color: MUTED,
};

const valueStyle: CSSProperties = {
  fontFamily: MONO,
  fontSize: "0.75rem",
  color: MUTED,
};

/** Parse a CSS dimension to px (rem = 16px); null when unparseable. */
export function dimensionToPx(value: string | number): number | null {
  if (typeof value === "number") return value;
  const match = /^(-?\d*\.?\d+)(px|rem|em)$/.exec(value.trim());
  if (!match) return null;
  const n = Number(match[1]);
  return match[2] === "px" ? n : n * 16;
}

/** Color palette: swatch + role name + real hex (the DESIGN.md ornament rule). */
export function PalettePreview({
  colors,
  limit,
}: {
  colors: Record<string, string>;
  limit?: number;
}): ReactElement {
  const entries = Object.entries(colors).slice(0, limit);
  return (
    <ul
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(132px, 1fr))",
        gap: 12,
        listStyle: "none",
        margin: 0,
        padding: 0,
      }}
    >
      {entries.map(([name, value]) => (
        <li key={name}>
          <div
            aria-hidden="true"
            style={{
              backgroundColor: value,
              border: HAIRLINE,
              borderRadius: 6,
              height: 56,
            }}
          />
          <div style={{ ...labelStyle, marginTop: 6 }}>{name}</div>
          <div style={valueStyle}>{value}</div>
        </li>
      ))}
    </ul>
  );
}

/** Typography scale: one specimen line per level, set in the (loadable) family. */
export function TypeScalePreview({
  typography,
  specimen = "Agile gray foxes quote 39 vivid hex jokes",
}: {
  typography: NonNullable<DesignTokens["typography"]>;
  specimen?: string;
}): ReactElement {
  return (
    <ul style={{ display: "grid", gap: 20, listStyle: "none", margin: 0, padding: 0 }}>
      {Object.entries(typography).map(([level, style]) => {
        const fontFamily = typeof style["fontFamily"] === "string" ? style["fontFamily"] : "";
        const rawSize = style["fontSize"] ?? "1rem";
        const sizePx = dimensionToPx(rawSize) ?? 16;
        const weight = style["fontWeight"] ?? 400;
        const lineHeight = style["lineHeight"];
        return (
          <li key={level}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 4 }}>
              <span style={labelStyle}>{level}</span>
              <span style={valueStyle}>
                {fontFamily || "system"} · {String(rawSize)} · {String(weight)}
                {lineHeight !== undefined ? ` · lh ${String(lineHeight)}` : ""}
              </span>
            </div>
            <div
              style={{
                fontFamily: previewFontStack(fontFamily),
                // Clamp display sizes so specimens stay in the card.
                fontSize: Math.min(sizePx, 40),
                fontWeight: Number(weight) || 400,
                lineHeight: typeof lineHeight === "number" ? lineHeight : 1.3,
                overflowWrap: "anywhere",
              }}
            >
              {specimen}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/** Spacing scale: labeled bars at true pixel widths. */
export function SpacingPreview({
  spacing,
}: {
  spacing: NonNullable<DesignTokens["spacing"]>;
}): ReactElement {
  return (
    <ul style={{ display: "grid", gap: 8, listStyle: "none", margin: 0, padding: 0 }}>
      {Object.entries(spacing).map(([name, value]) => {
        const px = dimensionToPx(value);
        return (
          <li key={name} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ ...labelStyle, width: 64, flexShrink: 0 }}>{name}</span>
            {px !== null ? (
              <span
                aria-hidden="true"
                style={{
                  backgroundColor: "var(--color-accent, #BC4A26)",
                  borderRadius: 2,
                  display: "inline-block",
                  height: 8,
                  width: Math.min(px, 320),
                }}
              />
            ) : null}
            <span style={valueStyle}>{String(value)}</span>
          </li>
        );
      })}
    </ul>
  );
}

/** Corner radius samples. */
export function RadiusPreview({
  rounded,
}: {
  rounded: NonNullable<DesignTokens["rounded"]>;
}): ReactElement {
  return (
    <ul
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 16,
        listStyle: "none",
        margin: 0,
        padding: 0,
      }}
    >
      {Object.entries(rounded).map(([name, value]) => {
        const px = dimensionToPx(value);
        return (
          <li key={name} style={{ textAlign: "center" }}>
            <div
              aria-hidden="true"
              style={{
                border: HAIRLINE,
                borderRadius: px !== null ? Math.min(px, 32) : 0,
                height: 56,
                width: 72,
              }}
            />
            <div style={{ ...labelStyle, marginTop: 6 }}>{name}</div>
            <div style={valueStyle}>{String(value)}</div>
          </li>
        );
      })}
    </ul>
  );
}

/** Component tokens as a key/value table ({token.ref} values shown verbatim). */
export function ComponentTokenTable({
  components,
}: {
  components: NonNullable<DesignTokens["components"]>;
}): ReactElement {
  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          {["component", "property", "value"].map((heading) => (
            <th
              key={heading}
              scope="col"
              style={{
                ...labelStyle,
                borderBottom: HAIRLINE,
                padding: "6px 12px 6px 0",
                textAlign: "left",
              }}
            >
              {heading}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Object.entries(components).flatMap(([component, properties]) =>
          Object.entries(properties).map(([property, value], index) => (
            <tr key={`${component}.${property}`}>
              <td style={{ ...valueStyle, padding: "6px 12px 6px 0", verticalAlign: "top" }}>
                {index === 0 ? component : ""}
              </td>
              <td style={{ ...valueStyle, padding: "6px 12px 6px 0" }}>{property}</td>
              <td style={{ ...valueStyle, padding: "6px 12px 6px 0", overflowWrap: "anywhere" }}>
                {String(value)}
              </td>
            </tr>
          )),
        )}
      </tbody>
    </table>
  );
}

/** The 5-swatch mini palette + display-font initial for catalog cards (F-1). */
export function MiniPalette({
  colors,
  name,
  displayFontFamily,
}: {
  colors: Record<string, string>;
  name: string;
  displayFontFamily?: string;
}): ReactElement {
  const swatches = Object.values(colors).slice(0, 5);
  return (
    <div style={{ alignItems: "center", display: "flex", gap: 12 }}>
      <span
        aria-hidden="true"
        style={{
          alignItems: "center",
          border: HAIRLINE,
          borderRadius: 6,
          display: "inline-flex",
          fontFamily: displayFontFamily ? previewFontStack(displayFontFamily) : "inherit",
          fontSize: "1.375rem",
          fontWeight: 600,
          height: 40,
          justifyContent: "center",
          width: 40,
        }}
      >
        {name.charAt(0).toUpperCase()}
      </span>
      <span aria-hidden="true" style={{ display: "inline-flex", gap: 4 }}>
        {swatches.map((value, index) => (
          <span
            key={`${value}-${index}`}
            style={{
              backgroundColor: value,
              border: HAIRLINE,
              borderRadius: 4,
              display: "inline-block",
              height: 20,
              width: 20,
            }}
          />
        ))}
      </span>
    </div>
  );
}
