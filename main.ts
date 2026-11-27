// NusaStat entrypoint — hands the site in for the make.fun national statistics bounty.
// Copies app/ and screenshots/ from this repository to the output directory and
// writes /output/dossier.json with buildDossier from vendor/makefun-frontend.ts.
// Node 22 standard library only; no network, no install, deterministic output.
import { cpSync, mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-frontend.ts";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

mkdirSync(outDir, { recursive: true });
cpSync(join(repoRoot, "app"), join(outDir, "app"), { recursive: true });
cpSync(join(repoRoot, "screenshots"), join(outDir, "screenshots"), { recursive: true });

const dossier = buildDossier(outDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
});
writeFileSync(join(outDir, "dossier.json"), dossier);

if (!existsSync(join(outDir, "app", "index.html"))) {
  throw new Error("hand-in failed: app/index.html missing from output");
}
console.log("hand-in complete: app/, screenshots/ and dossier.json written to " + outDir);
