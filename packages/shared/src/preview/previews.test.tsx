import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { extractDesignFrontMatter, type DesignTokens } from "../content/front-matter";
import { googleFontsUrl, resolvePreviewFamily } from "./fonts";
import {
  ComponentTokenTable,
  MiniPalette,
  PalettePreview,
  RadiusPreview,
  SpacingPreview,
  TypeScalePreview,
  dimensionToPx,
} from "./previews";

function loadFixture(file: string): DesignTokens {
  const markdown = readFileSync(join(__dirname, "fixtures", file), "utf8");
  const tokens = extractDesignFrontMatter(markdown);
  if (!tokens) throw new Error(`Fixture ${file} has no parseable front matter`);
  return tokens;
}

const official = loadFixture("official.design.md");
const brandLook = loadFixture("brand-look.design.md");

/** Full renderer snapshot per fixture (checklist: 2 fixture DESIGN.md files). */
function renderAll(tokens: DesignTokens): string {
  return renderToStaticMarkup(
    <div>
      <PalettePreview colors={tokens.colors ?? {}} />
      <TypeScalePreview typography={tokens.typography ?? {}} />
      <SpacingPreview spacing={tokens.spacing ?? {}} />
      <RadiusPreview rounded={tokens.rounded ?? {}} />
      <ComponentTokenTable components={tokens.components ?? {}} />
      <MiniPalette
        colors={tokens.colors ?? {}}
        name={tokens.name ?? "?"}
        displayFontFamily="IBM Plex Sans"
      />
    </div>,
  );
}

describe("preview renderer", () => {
  it("renders the Official fixture stably", () => {
    expect(renderAll(official)).toMatchSnapshot();
  });

  it("renders the Brand Look fixture stably", () => {
    expect(renderAll(brandLook)).toMatchSnapshot();
  });

  it("shows real hex values and role names in the palette", () => {
    const html = renderToStaticMarkup(<PalettePreview colors={official.colors ?? {}} />);
    expect(html).toContain("#0F62FE");
    expect(html).toContain("primary");
  });

  it("clamps oversized display specimens", () => {
    const html = renderToStaticMarkup(<TypeScalePreview typography={brandLook.typography ?? {}} />);
    // 3rem = 48px would overflow the card; the specimen clamps to 40px.
    expect(html).toContain("font-size:40px");
  });

  it("emits no <script> or event handlers (pure server markup)", () => {
    for (const html of [renderAll(official), renderAll(brandLook)]) {
      expect(html).not.toMatch(/<script/i);
      expect(html).not.toMatch(/ on[a-z]+=/i);
    }
  });
});

describe("font resolution", () => {
  it("keeps Google-hosted families and substitutes proprietary ones", () => {
    expect(resolvePreviewFamily("IBM Plex Sans")).toBe("IBM Plex Sans");
    expect(resolvePreviewFamily("Mona Sans")).toBe("Mona Sans");
    expect(resolvePreviewFamily("SF Pro Display")).toBe("Inter");
    expect(resolvePreviewFamily("Totally Unknown Font")).toBeNull();
    expect(resolvePreviewFamily("system-ui")).toBeNull();
  });

  it("builds a css2 URL only when something is loadable", () => {
    const url = googleFontsUrl(["IBM Plex Sans", "SF Pro Text", "Unknown"]);
    expect(url).toContain("fonts.googleapis.com/css2");
    expect(url).toContain("IBM+Plex+Sans");
    expect(url).toContain("Inter");
    expect(googleFontsUrl(["Unknown Font"])).toBeNull();
  });
});

describe("dimensionToPx", () => {
  it("parses px and rem, rejects junk", () => {
    expect(dimensionToPx("8px")).toBe(8);
    expect(dimensionToPx("1.5rem")).toBe(24);
    expect(dimensionToPx(12)).toBe(12);
    expect(dimensionToPx("auto")).toBeNull();
  });
});
