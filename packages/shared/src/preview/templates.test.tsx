import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { extractDesignFrontMatter, type DesignTokens } from "../content/front-matter";
import {
  DashboardTemplate,
  LoginTemplate,
  SettingsTemplate,
  SAMPLE_TEMPLATES,
  TEMPLATE_COMPONENTS,
  deriveTheme,
} from "./templates";

function loadFixture(file: string): DesignTokens {
  const markdown = readFileSync(join(__dirname, "fixtures", file), "utf8");
  const tokens = extractDesignFrontMatter(markdown);
  if (!tokens) throw new Error(`Fixture ${file} has no parseable front matter`);
  return tokens;
}

const official = loadFixture("official.design.md");
const brandLook = loadFixture("brand-look.design.md");

describe("sample templates", () => {
  it("registry covers every declared template", () => {
    expect(Object.keys(TEMPLATE_COMPONENTS).sort()).toEqual(
      SAMPLE_TEMPLATES.map((t) => t.id).sort(),
    );
  });

  it("derives a complete theme from both fixtures", () => {
    for (const tokens of [official, brandLook]) {
      const theme = deriveTheme(tokens);
      for (const value of [theme.surface, theme.text, theme.primary, theme.onPrimary]) {
        expect(value).toMatch(/^#/);
      }
      expect(theme.unit).toBeGreaterThanOrEqual(8);
      expect(theme.bodyFont.length).toBeGreaterThan(0);
    }
  });

  it("renders every template for the official fixture (snapshot)", () => {
    const html = renderToStaticMarkup(
      <div>
        <DashboardTemplate tokens={official} name="Fixture" />
        <LoginTemplate tokens={official} name="Fixture" />
        <SettingsTemplate tokens={official} name="Fixture" />
      </div>,
    );
    expect(html).toMatchSnapshot();
  });

  it("renders every template for the brand-look fixture (snapshot)", () => {
    const html = renderToStaticMarkup(
      <div>
        <DashboardTemplate tokens={brandLook} name="Fixture" />
        <LoginTemplate tokens={brandLook} name="Fixture" />
        <SettingsTemplate tokens={brandLook} name="Fixture" />
      </div>,
    );
    expect(html).toMatchSnapshot();
  });

  it("emits no <script> or event handlers (pure server markup)", () => {
    const html = renderToStaticMarkup(
      <div>
        <DashboardTemplate tokens={official} name="Fixture" />
        <LoginTemplate tokens={brandLook} name="Fixture" />
        <SettingsTemplate tokens={official} name="Fixture" />
      </div>,
    );
    expect(html).not.toMatch(/<script/i);
    expect(html).not.toMatch(/ on[a-z]+=/i);
  });

  it("renders with empty tokens without crashing (fallback theme)", () => {
    const html = renderToStaticMarkup(<DashboardTemplate tokens={{}} name="Empty" />);
    expect(html.length).toBeGreaterThan(500);
  });
});
