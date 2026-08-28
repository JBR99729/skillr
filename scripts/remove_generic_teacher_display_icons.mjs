import fs from "node:fs";
import path from "node:path";

// Teacher Display examples may use meaningful topic-derived visuals or no visual at all;
// generated decorative/filler example icons are intentionally forbidden.
const root = process.cwd();
const curriculumRoots = ["foundation", "year1", "year2", "year3", "year4", "year5", "year6", "year7"];
const generatorFiles = [
  "scripts/add_foundation_display_visual_boards.mjs",
  "scripts/convert_year2_teacher_slides_to_display_pages.mjs",
  "scripts/convert_year3_teacher_slides_to_display_pages.mjs",
  "scripts/convert_year4_teacher_slides_to_display_pages.mjs",
  "scripts/convert_year5_teacher_slides_to_display_pages.mjs",
  "scripts/convert_year6_teacher_slides_to_display_pages.mjs",
  "scripts/convert_year7_teacher_slides_to_display_pages.mjs",
];

const walk = (dir) => {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.isFile()) out.push(full);
  }
  return out;
};

const cleanExamplePresentation = (source) => source
  // Remove only the generated filler SVG container used by Teacher Display example cards.
  .replace(/<div class="example-icon">\s*<svg\b[\s\S]*?<\/svg>\s*<\/div>/g, "")
  // Prevent converters from re-emitting generated filler icons on future rebuilds.
  .replace(/<div class="example-icon">\$\{[^}]+\}<\/div>/g, "")
  // Once the filler icon is gone, the copied example text should use the full card width.
  .replace(/\.example-row\{display:grid;grid-template-columns:[^}]*\}/g, ".example-row{display:block}")
  // Remove now-unused filler-icon presentation rules. Topic-derived visual/model classes are untouched.
  .replace(/\.example-icon(?: svg)?\{[^}]*\}/g, "");

let changedDecks = 0;
let changedGenerators = 0;
let scannedDecks = 0;

for (const curriculumRoot of curriculumRoots) {
  const files = walk(path.join(root, curriculumRoot));
  for (const file of files) {
    if (!file.endsWith(`${path.sep}teacher-slides${path.sep}index.html`)) continue;
    scannedDecks += 1;
    const before = fs.readFileSync(file, "utf8");
    if (!before.includes("example-icon")) continue;
    const after = cleanExamplePresentation(before);
    if (after !== before) {
      fs.writeFileSync(file, after);
      changedDecks += 1;
    }
  }
}

for (const relativePath of generatorFiles) {
  const file = path.join(root, relativePath);
  if (!fs.existsSync(file)) continue;
  const before = fs.readFileSync(file, "utf8");
  const after = cleanExamplePresentation(before);
  if (after !== before) {
    fs.writeFileSync(file, after);
    changedGenerators += 1;
  }
}

const remainingDecks = [];
for (const curriculumRoot of curriculumRoots) {
  for (const file of walk(path.join(root, curriculumRoot))) {
    if (!file.endsWith(`${path.sep}teacher-slides${path.sep}index.html`)) continue;
    const html = fs.readFileSync(file, "utf8");
    if (/class="example-icon"/.test(html)) remainingDecks.push(path.relative(root, file));
  }
}

const remainingGenerators = generatorFiles.filter((relativePath) => {
  const file = path.join(root, relativePath);
  if (!fs.existsSync(file)) return false;
  return /<div class="example-icon">\$\{[^}]+\}<\/div>/.test(fs.readFileSync(file, "utf8"));
});

console.log(`Scanned ${scannedDecks} Foundation-Year 7 Teacher Display pages.`);
console.log(`Removed generic filler visuals from ${changedDecks} generated display pages.`);
console.log(`Updated ${changedGenerators} display-page generator source files.`);

if (remainingDecks.length || remainingGenerators.length) {
  console.error("Generic Teacher Display filler visuals remain:");
  for (const item of remainingDecks) console.error(`- ${item}`);
  for (const item of remainingGenerators) console.error(`- generator: ${item}`);
  process.exit(1);
}

console.log("PASS: no generated .example-icon filler visuals remain in Foundation-Year 7 Teacher Display pages or converter output templates.");
