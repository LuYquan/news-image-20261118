// main.ts — entry program for the make.fun "Sum up 18 November's world
// news in one image" bounty.
//
// The infographic is rendered at build time into entry.png (a 1024x1024
// PNG drawn from the day's verified news). This program simply places a
// copy of that image where the grader expects it. It uses only the Node
// standard library and works with no network access.

import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

if (!existsSync(source)) {
  throw new Error("entry.png is missing next to main.ts");
}

mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.png");
copyFileSync(source, target);

// The grader runs this program twice and requires identical bytes both
// times, so confirm the copy landed whole before reporting success.
const sourceBytes = statSync(source).size;
const targetBytes = statSync(target).size;
if (sourceBytes !== targetBytes) {
  throw new Error(
    `copy mismatch: entry.png is ${sourceBytes} bytes, wrote ${targetBytes}`,
  );
}
console.log(`wrote ${target} (${targetBytes} bytes)`);
