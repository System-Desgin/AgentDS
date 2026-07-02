import { access, mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import pc from "picocolors";
import { stringify as toYaml } from "yaml";
import { SYSTEM_PATHS, slugSchema, type SystemPath } from "@agentds/shared";
import { contentDirFor } from "../lib/paths";
import { buildMetaTemplate } from "../templates/meta-template";
import { buildQaTemplate } from "../templates/qa-template";

async function exists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

function isSystemPath(value: string): value is SystemPath {
  return (SYSTEM_PATHS as readonly string[]).includes(value);
}

/**
 * Scaffold a new catalog entry: `content/<dir>/<slug>/` with a schema-valid
 * `meta.yaml` draft and a `QA.md` checklist. Refuses to overwrite an existing
 * entry.
 */
export async function runNew(slug: string, pathOption: string): Promise<void> {
  const parsedSlug = slugSchema.safeParse(slug);
  if (!parsedSlug.success) {
    console.error(pc.red(`Invalid slug "${slug}": must be kebab-case (a-z, 0-9, hyphens).`));
    process.exitCode = 1;
    return;
  }

  if (!isSystemPath(pathOption)) {
    console.error(
      pc.red(`Invalid --path "${pathOption}": expected one of ${SYSTEM_PATHS.join(", ")}.`),
    );
    process.exitCode = 1;
    return;
  }

  const dir = contentDirFor(pathOption, slug);
  if (await exists(dir)) {
    console.error(pc.red(`Entry already exists: ${dir}`));
    process.exitCode = 1;
    return;
  }

  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, "meta.yaml"), toYaml(buildMetaTemplate(slug, pathOption)), "utf8");
  await writeFile(join(dir, "QA.md"), buildQaTemplate(slug, pathOption), "utf8");

  console.log(pc.green(`Created ${pathOption} entry:`), pc.dim(dir));
  console.log(pc.dim("Next: fill meta.yaml, then run extract → generate → validate → export."));
}
