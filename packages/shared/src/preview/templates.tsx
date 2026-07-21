import type { CSSProperties, ReactElement, ReactNode } from "react";
import type { DesignTokens } from "../content/front-matter";
import { previewFontStack } from "./fonts";
import { dimensionToPx } from "./previews";

/**
 * Sample-screen templates ("Preview as an app"): full app screens rendered
 * purely from a system's DESIGN.md tokens. Same constraints as the preview
 * cards — server-rendered inline styles, no client JS. Every visual value
 * traces to a token via deriveTheme; nothing is invented beyond neutral
 * fallbacks when a role is absent.
 */

export interface SampleTemplate {
  id: string;
  name: string;
  description: string;
}

export const SAMPLE_TEMPLATES: SampleTemplate[] = [
  {
    id: "dashboard",
    name: "Admin dashboard",
    description: "Sidebar navigation, stat tiles, a chart, and a data table.",
  },
  {
    id: "login",
    name: "Login & sign-up",
    description: "Split auth screen: brand panel plus form fields and actions.",
  },
  {
    id: "settings",
    name: "Settings & profile",
    description: "Form sections, toggles, and a destructive-action zone.",
  },
];

/* ---------------------------------------------------------------- theme -- */

function hexToRgb(hex: string): [number, number, number] | null {
  const m = /^#([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return null;
  const v = m[1] as string;
  return [parseInt(v.slice(0, 2), 16), parseInt(v.slice(2, 4), 16), parseInt(v.slice(4, 6), 16)];
}

function luminance(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 1;
  const [r, g, b] = rgb.map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  }) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Black or white, whichever reads on the given background. */
function textOn(bg: string): string {
  return luminance(bg) > 0.35 ? "#161616" : "#FFFFFF";
}

function pick(colors: Record<string, string>, names: string[]): string | null {
  for (const name of names) {
    const v = colors[name];
    if (typeof v === "string" && hexToRgb(v)) return v;
  }
  return null;
}

export interface SampleTheme {
  surface: string;
  surfaceAlt: string;
  text: string;
  textMuted: string;
  border: string;
  primary: string;
  onPrimary: string;
  link: string;
  success: string;
  warning: string;
  error: string;
  radiusSm: number;
  radiusMd: number;
  radiusLg: number;
  unit: number;
  bodyFont: string;
  displayFont: string;
  monoFont: string;
  displayWeight: number;
}

/** Resolve a system's token vocabulary onto the roles the templates use. */
export function deriveTheme(tokens: DesignTokens): SampleTheme {
  const colors = (tokens.colors ?? {}) as Record<string, string>;
  const surface = pick(colors, ["surface", "background", "canvas", "backdrop"]) ?? "#FFFFFF";
  const dark = luminance(surface) < 0.35;
  const surfaceAlt =
    pick(colors, [
      "surface-variant",
      "surface-panel",
      "surface-raised",
      "surface-deep",
      "layer",
      "tile",
      "fill",
      "card",
    ]) ?? (dark ? "#262626" : "#F4F4F4");
  const text =
    pick(colors, ["on-surface", "text", "foreground", "content-primary", "ink"]) ?? textOn(surface);
  const textMuted =
    pick(colors, [
      "on-surface-variant",
      "text-secondary",
      "muted",
      "helper",
      "content-secondary",
      "subdued",
    ]) ?? text;
  const border =
    pick(colors, ["border", "border-subtle", "outline", "divider", "border-weak", "hairline"]) ??
    surfaceAlt;
  const primary = pick(colors, ["primary", "accent", "brand", "action"]) ?? "#0F62FE";
  const onPrimary = pick(colors, ["on-primary", "on-accent", "on-brand"]) ?? textOn(primary);
  const link =
    pick(colors, ["link", "accent", "primary-bright", "interactive", "action"]) ?? primary;
  const success =
    pick(colors, ["success", "positive", "ok", "green"]) ?? (dark ? "#42BE65" : "#24A148");
  const warning =
    pick(colors, ["warning", "attention", "caution"]) ?? (dark ? "#F1C21B" : "#B36200");
  const error =
    pick(colors, ["error", "danger", "negative", "critical"]) ?? (dark ? "#FA4D56" : "#DA1E28");

  const rounded = (tokens.rounded ?? {}) as Record<string, string | number>;
  const radius = (names: string[], fallback: number): number => {
    for (const n of names) {
      const px = rounded[n] !== undefined ? dimensionToPx(rounded[n] as string | number) : null;
      if (px !== null && px < 100) return px;
    }
    return fallback;
  };
  const radiusSm = radius(["sm", "xs", "small"], 4);
  const radiusMd = radius(["md", "medium", "sm"], radiusSm);
  const radiusLg = radius(["lg", "large", "md"], radiusMd);

  const spacing = (tokens.spacing ?? {}) as Record<string, string | number>;
  const unitRaw =
    spacing["md"] !== undefined ? dimensionToPx(spacing["md"] as string | number) : null;
  const unit = unitRaw !== null && unitRaw >= 8 && unitRaw <= 32 ? unitRaw : 16;

  const typography = (tokens.typography ?? {}) as Record<string, Record<string, string | number>>;
  const family = (levels: string[], fallback: string): string => {
    for (const level of levels) {
      const f = typography[level]?.["fontFamily"];
      if (typeof f === "string" && f) return previewFontStack(f);
    }
    return fallback;
  };
  const bodyFont = family(["body", "body-md", "body-sm"], "system-ui, sans-serif");
  const displayFont = family(["display", "heading-lg", "heading", "headline-lg"], bodyFont);
  const monoFont = family(["code", "mono"], "ui-monospace, monospace");
  const displayWeightRaw =
    typography["display"]?.["fontWeight"] ?? typography["heading"]?.["fontWeight"];
  const displayWeight = Number(displayWeightRaw) || 600;

  return {
    surface,
    surfaceAlt,
    text,
    textMuted,
    border,
    primary,
    onPrimary,
    link,
    success,
    warning,
    error,
    radiusSm,
    radiusMd,
    radiusLg,
    unit,
    bodyFont,
    displayFont,
    monoFont,
    displayWeight,
  };
}

/* ------------------------------------------------------------- building -- */

interface Tpl {
  t: SampleTheme;
  name: string;
}

function Button({
  t,
  children,
  kind = "primary",
}: Tpl & { children: ReactNode; kind?: "primary" | "secondary" | "danger" }) {
  const base: CSSProperties = {
    borderRadius: t.radiusSm,
    display: "inline-block",
    fontFamily: t.bodyFont,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1,
    padding: `${t.unit * 0.75}px ${t.unit}px`,
  };
  if (kind === "primary")
    return (
      <span style={{ ...base, backgroundColor: t.primary, color: t.onPrimary }}>{children}</span>
    );
  if (kind === "danger")
    return (
      <span style={{ ...base, backgroundColor: t.error, color: textOn(t.error) }}>{children}</span>
    );
  return (
    <span style={{ ...base, border: `1px solid ${t.border}`, color: t.text }}>{children}</span>
  );
}

function Field({
  t,
  label,
  value,
  focus,
}: Tpl & { label: string; value: string; focus?: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ color: t.textMuted, fontSize: 12, letterSpacing: "0.02em" }}>{label}</span>
      <span
        style={{
          backgroundColor: t.surfaceAlt,
          border: `1px solid ${focus ? t.primary : t.border}`,
          borderRadius: t.radiusSm,
          boxShadow: focus ? `0 0 0 2px ${t.primary}33` : undefined,
          color: t.text,
          fontSize: 14,
          padding: `${t.unit * 0.65}px ${t.unit * 0.75}px`,
        }}
      >
        {value}
      </span>
    </div>
  );
}

function Badge({
  t,
  tone,
  children,
}: Tpl & { tone: "success" | "warning" | "error"; children: ReactNode }) {
  const bg = tone === "success" ? t.success : tone === "warning" ? t.warning : t.error;
  return (
    <span
      style={{
        backgroundColor: bg,
        borderRadius: 999,
        color: textOn(bg),
        fontSize: 11,
        fontWeight: 600,
        padding: "3px 10px",
      }}
    >
      {children}
    </span>
  );
}

function Toggle({ t, on }: Tpl & { on: boolean }) {
  return (
    <span
      style={{
        backgroundColor: on ? t.primary : t.border,
        borderRadius: 999,
        display: "inline-flex",
        height: 20,
        justifyContent: on ? "flex-end" : "flex-start",
        padding: 2,
        width: 36,
      }}
    >
      <span style={{ backgroundColor: "#FFFFFF", borderRadius: 999, height: 16, width: 16 }} />
    </span>
  );
}

/* ------------------------------------------------------------ templates -- */

const BARS = [42, 58, 50, 74, 66, 88, 79, 96, 84, 70, 90, 100];
const ROWS: [string, string, string, "success" | "warning" | "error"][] = [
  ["Aurora rollout", "$52,140", "2 hours ago", "success"],
  ["Billing migration", "$48,700", "5 hours ago", "success"],
  ["APAC expansion", "$27,600", "Yesterday", "warning"],
  ["Legacy sunset", "$12,300", "2 days ago", "error"],
  ["Q3 forecast", "$96,410", "3 days ago", "success"],
];

export function DashboardTemplate({
  tokens,
  name,
}: {
  tokens: DesignTokens;
  name: string;
}): ReactElement {
  const t = deriveTheme(tokens);
  const nav = ["Overview", "Reports", "Customers", "Billing", "Settings"];
  return (
    <div
      style={{
        backgroundColor: t.surface,
        color: t.text,
        display: "grid",
        fontFamily: t.bodyFont,
        gridTemplateColumns: "220px 1fr",
        minHeight: 640,
      }}
    >
      <aside
        style={{
          borderRight: `1px solid ${t.border}`,
          display: "flex",
          flexDirection: "column",
          gap: t.unit * 1.5,
          padding: t.unit * 1.25,
        }}
      >
        <div style={{ alignItems: "center", display: "flex", gap: 10 }}>
          <span
            style={{ backgroundColor: t.primary, borderRadius: t.radiusSm, height: 22, width: 22 }}
          />
          <span style={{ fontFamily: t.displayFont, fontSize: 15, fontWeight: t.displayWeight }}>
            {name}
          </span>
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {nav.map((item, i) => (
            <span
              key={item}
              style={{
                backgroundColor: i === 0 ? t.surfaceAlt : undefined,
                borderLeft: i === 0 ? `3px solid ${t.primary}` : "3px solid transparent",
                borderRadius: t.radiusSm,
                color: i === 0 ? t.text : t.textMuted,
                fontSize: 14,
                padding: `${t.unit * 0.5}px ${t.unit * 0.75}px`,
              }}
            >
              {item}
            </span>
          ))}
        </nav>
        <div style={{ borderTop: `1px solid ${t.border}`, marginTop: "auto", paddingTop: t.unit }}>
          <span style={{ color: t.textMuted, fontSize: 12 }}>help@example.com</span>
        </div>
      </aside>

      <main
        style={{
          display: "flex",
          flexDirection: "column",
          gap: t.unit * 1.5,
          padding: t.unit * 1.5,
        }}
      >
        <header style={{ alignItems: "center", display: "flex", justifyContent: "space-between" }}>
          <div>
            <div style={{ color: t.textMuted, fontSize: 12, marginBottom: 4 }}>
              Analytics / Revenue
            </div>
            <h1
              style={{
                fontFamily: t.displayFont,
                fontSize: 24,
                fontWeight: t.displayWeight,
                margin: 0,
              }}
            >
              Revenue dashboard
            </h1>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <Button t={t} name={name} kind="secondary">
              Export
            </Button>
            <Button t={t} name={name}>
              Create report
            </Button>
          </div>
        </header>

        <div style={{ display: "grid", gap: t.unit, gridTemplateColumns: "repeat(4, 1fr)" }}>
          {[
            ["Revenue", "$128.4K", "▲ 12.5%", t.success],
            ["Customers", "2,847", "▲ 8.1%", t.success],
            ["Average order", "$45.10", "▲ 3.2%", t.success],
            ["Churn", "1.9%", "▲ 0.2%", t.error],
          ].map(([label, value, delta, tone]) => (
            <div
              key={label}
              style={{ backgroundColor: t.surfaceAlt, borderRadius: t.radiusMd, padding: t.unit }}
            >
              <div style={{ color: t.textMuted, fontSize: 12 }}>{label}</div>
              <div
                style={{
                  fontFamily: t.displayFont,
                  fontSize: 26,
                  fontWeight: t.displayWeight,
                  marginTop: 8,
                }}
              >
                {value}
              </div>
              <div style={{ color: tone, fontSize: 12, marginTop: 8 }}>{delta} vs last month</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gap: t.unit, gridTemplateColumns: "3fr 2fr" }}>
          <section
            style={{ border: `1px solid ${t.border}`, borderRadius: t.radiusMd, padding: t.unit }}
          >
            <h2 style={{ fontSize: 14, fontWeight: 600, margin: `0 0 ${t.unit}px` }}>
              Monthly performance
            </h2>
            <div
              style={{
                alignItems: "flex-end",
                borderBottom: `1px solid ${t.border}`,
                display: "flex",
                gap: 8,
                height: 170,
              }}
            >
              {BARS.map((h, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: i === BARS.length - 1 ? t.primary : `${t.primary}99`,
                    borderRadius: `${t.radiusSm}px ${t.radiusSm}px 0 0`,
                    flex: 1,
                    height: `${h}%`,
                  }}
                />
              ))}
            </div>
            <div
              style={{
                color: t.textMuted,
                display: "flex",
                fontSize: 11,
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <span>Jan</span>
              <span>Jun</span>
              <span>Dec</span>
            </div>
          </section>

          <section
            style={{ border: `1px solid ${t.border}`, borderRadius: t.radiusMd, padding: t.unit }}
          >
            <h2 style={{ fontSize: 14, fontWeight: 600, margin: `0 0 ${t.unit}px` }}>
              Recent activity
            </h2>
            <table style={{ borderCollapse: "collapse", fontSize: 13, width: "100%" }}>
              <tbody>
                {ROWS.slice(0, 4).map(([label, value, when, tone]) => (
                  <tr key={label}>
                    <td style={{ borderBottom: `1px solid ${t.border}`, padding: "9px 4px" }}>
                      <div>{label}</div>
                      <div style={{ color: t.textMuted, fontSize: 11 }}>{when}</div>
                    </td>
                    <td
                      style={{
                        borderBottom: `1px solid ${t.border}`,
                        fontFamily: t.monoFont,
                        padding: "9px 4px",
                      }}
                    >
                      {value}
                    </td>
                    <td
                      style={{
                        borderBottom: `1px solid ${t.border}`,
                        padding: "9px 4px",
                        textAlign: "right",
                      }}
                    >
                      <Badge t={t} name={name} tone={tone}>
                        {tone === "success"
                          ? "On track"
                          : tone === "warning"
                            ? "At risk"
                            : "Blocked"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop: t.unit * 0.75 }}>
              <span style={{ color: t.link, fontSize: 13 }}>View all activity →</span>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export function LoginTemplate({
  tokens,
  name,
}: {
  tokens: DesignTokens;
  name: string;
}): ReactElement {
  const t = deriveTheme(tokens);
  return (
    <div
      style={{
        alignItems: "center",
        backgroundColor: t.surfaceAlt,
        display: "flex",
        fontFamily: t.bodyFont,
        justifyContent: "center",
        minHeight: 640,
        padding: t.unit * 2,
      }}
    >
      <div
        style={{
          backgroundColor: t.surface,
          border: `1px solid ${t.border}`,
          borderRadius: t.radiusLg,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          maxWidth: 860,
          overflow: "hidden",
          width: "100%",
        }}
      >
        <div
          style={{
            backgroundColor: t.primary,
            color: t.onPrimary,
            display: "flex",
            flexDirection: "column",
            gap: t.unit,
            justifyContent: "flex-end",
            padding: t.unit * 2,
          }}
        >
          <span
            style={{
              backgroundColor: t.onPrimary,
              borderRadius: t.radiusSm,
              height: 28,
              opacity: 0.9,
              width: 28,
            }}
          />
          <div
            style={{
              fontFamily: t.displayFont,
              fontSize: 28,
              fontWeight: t.displayWeight,
              lineHeight: 1.2,
            }}
          >
            Ship on-system UI from day one.
          </div>
          <div style={{ fontSize: 14, opacity: 0.85 }}>
            One account for every workspace, report, and integration in {name}.
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: t.unit, padding: t.unit * 2 }}>
          <div>
            <h1
              style={{
                fontFamily: t.displayFont,
                fontSize: 22,
                fontWeight: t.displayWeight,
                margin: 0,
              }}
            >
              Sign in
            </h1>
            <div style={{ color: t.textMuted, fontSize: 13, marginTop: 6 }}>
              New here? <span style={{ color: t.link }}>Create an account</span>
            </div>
          </div>
          <Field t={t} name={name} label="Email" value="ada@example.com" />
          <Field t={t} name={name} label="Password" value="••••••••••" focus />
          <div style={{ alignItems: "center", display: "flex", justifyContent: "space-between" }}>
            <span style={{ alignItems: "center", display: "inline-flex", gap: 8 }}>
              <Toggle t={t} name={name} on />
              <span style={{ color: t.textMuted, fontSize: 13 }}>Remember me</span>
            </span>
            <span style={{ color: t.link, fontSize: 13 }}>Forgot password?</span>
          </div>
          <Button t={t} name={name}>
            Sign in
          </Button>
          <div style={{ alignItems: "center", display: "flex", gap: 12 }}>
            <span style={{ backgroundColor: t.border, flex: 1, height: 1 }} />
            <span style={{ color: t.textMuted, fontSize: 12 }}>or</span>
            <span style={{ backgroundColor: t.border, flex: 1, height: 1 }} />
          </div>
          <Button t={t} name={name} kind="secondary">
            Continue with SSO
          </Button>
          <div style={{ color: t.textMuted, fontSize: 12, lineHeight: 1.5 }}>
            Protected by two-factor authentication. By continuing you agree to the terms of service.
          </div>
        </div>
      </div>
    </div>
  );
}

export function SettingsTemplate({
  tokens,
  name,
}: {
  tokens: DesignTokens;
  name: string;
}): ReactElement {
  const t = deriveTheme(tokens);
  const tabs = ["Profile", "Workspace", "Notifications", "Billing", "API"];
  return (
    <div
      style={{
        backgroundColor: t.surface,
        color: t.text,
        fontFamily: t.bodyFont,
        minHeight: 640,
        padding: t.unit * 1.5,
      }}
    >
      <div style={{ margin: "0 auto", maxWidth: 760 }}>
        <div style={{ color: t.textMuted, fontSize: 12, marginBottom: 4 }}>{name} / Settings</div>
        <h1
          style={{
            fontFamily: t.displayFont,
            fontSize: 24,
            fontWeight: t.displayWeight,
            margin: 0,
          }}
        >
          Account settings
        </h1>

        <div
          style={{
            borderBottom: `1px solid ${t.border}`,
            display: "flex",
            gap: 4,
            marginTop: t.unit,
          }}
        >
          {tabs.map((tab, i) => (
            <span
              key={tab}
              style={{
                borderBottom: i === 0 ? `2px solid ${t.primary}` : "2px solid transparent",
                color: i === 0 ? t.text : t.textMuted,
                fontSize: 14,
                fontWeight: i === 0 ? 600 : 400,
                padding: `${t.unit * 0.6}px ${t.unit * 0.75}px`,
              }}
            >
              {tab}
            </span>
          ))}
        </div>

        <section
          style={{
            display: "flex",
            flexDirection: "column",
            gap: t.unit,
            paddingTop: t.unit * 1.25,
          }}
        >
          <div style={{ alignItems: "center", display: "flex", gap: t.unit }}>
            <span
              style={{
                alignItems: "center",
                backgroundColor: t.surfaceAlt,
                border: `1px solid ${t.border}`,
                borderRadius: 999,
                color: t.textMuted,
                display: "inline-flex",
                fontFamily: t.displayFont,
                fontSize: 22,
                fontWeight: t.displayWeight,
                height: 56,
                justifyContent: "center",
                width: 56,
              }}
            >
              A
            </span>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600 }}>Ada Lovelace</div>
              <div style={{ color: t.textMuted, fontSize: 13 }}>Owner · joined March 2025</div>
            </div>
            <span style={{ marginLeft: "auto" }}>
              <Button t={t} name={name} kind="secondary">
                Change avatar
              </Button>
            </span>
          </div>

          <div style={{ display: "grid", gap: t.unit, gridTemplateColumns: "1fr 1fr" }}>
            <Field t={t} name={name} label="Full name" value="Ada Lovelace" />
            <Field t={t} name={name} label="Email" value="ada@example.com" />
            <Field t={t} name={name} label="Role" value="Owner" />
            <Field t={t} name={name} label="Timezone" value="UTC+03:00 — Riyadh" />
          </div>

          <div
            style={{
              backgroundColor: t.surfaceAlt,
              borderRadius: t.radiusMd,
              display: "flex",
              flexDirection: "column",
              gap: t.unit * 0.75,
              padding: t.unit,
            }}
          >
            {[
              ["Product updates", "Release notes and new catalog entries", true],
              ["Usage reports", "Weekly summary of fetches and installs", true],
              ["Security alerts", "Sign-ins from new devices", false],
            ].map(([title, sub, on]) => (
              <div
                key={title as string}
                style={{ alignItems: "center", display: "flex", gap: t.unit }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{title}</div>
                  <div style={{ color: t.textMuted, fontSize: 12 }}>{sub}</div>
                </div>
                <Toggle t={t} name={name} on={on as boolean} />
              </div>
            ))}
          </div>

          <div
            style={{
              border: `1px solid ${t.error}`,
              borderRadius: t.radiusMd,
              display: "flex",
              gap: t.unit,
              justifyContent: "space-between",
              padding: t.unit,
            }}
          >
            <div>
              <div style={{ color: t.error, fontSize: 14, fontWeight: 600 }}>Delete workspace</div>
              <div style={{ color: t.textMuted, fontSize: 12, marginTop: 4 }}>
                Removes every report and API key. This cannot be undone.
              </div>
            </div>
            <Button t={t} name={name} kind="danger">
              Delete
            </Button>
          </div>

          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Button t={t} name={name} kind="secondary">
              Cancel
            </Button>
            <Button t={t} name={name}>
              Save changes
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}

export const TEMPLATE_COMPONENTS: Record<
  string,
  (props: { tokens: DesignTokens; name: string }) => ReactElement
> = {
  dashboard: DashboardTemplate,
  login: LoginTemplate,
  settings: SettingsTemplate,
};
