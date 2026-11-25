import * as fs from "node:fs";
import * as path from "node:path";

// One-Line Office Jokes — entry program.
// Writes the single-line office joke to /output/entry.txt.
// Sealed gate: UTF-8 text, 1-199 characters, not only whitespace, one line.
const LINE =
  "Our 9:15 standup has run to 10:40 for six weeks, and Kevin still opens with 'quick update' before reading an entire spreadsheet aloud.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = path.join(outDir, "entry.txt");

if ([...LINE].length < 1 || [...LINE].length > 199) {
  console.error(`entry is ${[...LINE].length} chars, outside the 1-199 limit`);
  process.exit(1);
}
if (LINE.trim().length === 0 || LINE.includes("\n") || LINE.includes("\r")) {
  console.error("entry must be a single non-blank line");
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outPath, LINE + "\n", "utf8");

// Read-back check: the file on disk must be exactly the line plus one newline.
const written = fs.readFileSync(outPath, "utf8");
if (written !== LINE + "\n") {
  console.error("read-back mismatch: entry.txt does not match the line");
  process.exit(1);
}
if ([...written.trim()].length > 199) {
  console.error("written entry exceeds 199 characters");
  process.exit(1);
}
console.log(`wrote ${outPath} (${[...LINE].length} chars)`);
