import pc from "picocolors";

/**
 * Placeholder for pipeline commands landing in Phase 1 (extract, generate,
 * validate, export). Exits non-zero so scripts don't mistake a stub for success.
 */
export function notImplemented(command: string): void {
  console.error(
    pc.yellow(`\`${command}\` is implemented in Phase 1 — see docs/03-DEV-CHECKLIST.md.`),
  );
  process.exitCode = 1;
}
