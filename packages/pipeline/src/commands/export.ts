import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import JSZip from "jszip";
import pc from "picocolors";
import { buildLicenseNotice, parseMetaYaml } from "@agentds/shared";
import { findEntryDir } from "../lib/paths";
import { exportDesignMd } from "../lib/design-md";

/**
 * Export an entry's derived artifacts from its DESIGN.md: tokens.json (DTCG),
 * tailwind.css (Tailwind v4 @theme), and bundle.zip (all of the above +
 * meta.yaml + LICENSE-NOTICE.txt). Uses the official exporter (F-6).
 */
export async function runExport(slug: string): Promise<void> {
  const entry = findEntryDir(slug);
  if (!entry) {
    console.error(pc.red(`No entry found for slug "${slug}" under content/.`));
    process.exitCode = 1;
    return;
  }

  const designPath = join(entry.dir, "DESIGN.md");
  const metaPath = join(entry.dir, "meta.yaml");
  if (!existsSync(designPath)) {
    console.error(pc.red(`DESIGN.md not found for "${slug}" — run generate first.`));
    process.exitCode = 1;
    return;
  }

  const meta = parseMetaYaml(await readFile(metaPath, "utf8"));

  const tokensJson = exportDesignMd(designPath, "dtcg");
  const tailwindCss = exportDesignMd(designPath, "css-tailwind");
  await writeFile(join(entry.dir, "tokens.json"), tokensJson, "utf8");
  await writeFile(join(entry.dir, "tailwind.css"), tailwindCss, "utf8");

  const notice = buildLicenseNotice(meta);
  const zip = new JSZip();
  zip.file("DESIGN.md", await readFile(designPath, "utf8"));
  zip.file("tokens.json", tokensJson);
  zip.file("tailwind.css", tailwindCss);
  zip.file("meta.yaml", await readFile(metaPath, "utf8"));
  zip.file("LICENSE-NOTICE.txt", notice);
  const buffer = await zip.generateAsync({ type: "nodebuffer" });
  await writeFile(join(entry.dir, "bundle.zip"), buffer);

  console.log(pc.green(`${slug}: exported`), pc.dim("tokens.json, tailwind.css, bundle.zip"));
}
