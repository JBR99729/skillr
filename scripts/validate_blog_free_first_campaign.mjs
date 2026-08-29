import fs from "node:fs";
import path from "node:path";

const BLOG_DIR = "blogs";
const START = "<!-- BLOG_FREE_FIRST_CAMPAIGN_START -->";
const END = "<!-- BLOG_FREE_FIRST_CAMPAIGN_END -->";
const REQUIRED = [
  "Try the free resources first",
  "monthly or yearly learning subscription",
  "does not guarantee that a student will use it consistently",
  "Learn → Practice → Test",
  "compare paid options for that specific need",
  "data-free-first-campaign",
];
const FORBIDDEN = [
  /paid (?:apps|platforms|services) are worse/i,
  /better than paid/i,
  /same value as (?:a )?paid/i,
  /same as (?:a )?paid/i,
  /never (?:pay|subscribe)/i,
  /guarantee(?:d|s)? (?:better|higher|improved) (?:results|outcomes|marks|scores)/i,
];

const files = fs.readdirSync(BLOG_DIR, { withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name.endsWith(".html") && entry.name !== "index.html")
  .map((entry) => path.join(BLOG_DIR, entry.name))
  .sort();

const failures = [];
for (const file of files) {
  const html = fs.readFileSync(file, "utf8");
  const start = html.indexOf(START);
  const end = html.indexOf(END);
  if (start < 0 || end < 0 || end < start) {
    failures.push(`${file}: missing or invalid campaign markers`);
    continue;
  }
  if (html.indexOf(START, start + START.length) >= 0 || html.indexOf(END, end + END.length) >= 0) {
    failures.push(`${file}: duplicate campaign block`);
  }
  const block = html.slice(start, end + END.length);
  for (const text of REQUIRED) {
    if (!block.includes(text)) failures.push(`${file}: campaign block missing required wording: ${text}`);
  }
  if (!/href="\/(?:foundation|year(?:10|[1-9])|#curriculum)/.test(block) && !block.includes('href="/#curriculum"')) {
    failures.push(`${file}: campaign block missing free curriculum link`);
  }
  if (!block.includes('href="/dashboard/"')) failures.push(`${file}: campaign block missing progress link`);
  for (const pattern of FORBIDDEN) {
    if (pattern.test(block)) failures.push(`${file}: campaign block contains overstrong claim: ${pattern}`);
  }
}

if (failures.length) {
  console.error(`Blog free-first campaign validation FAIL (${failures.length} issues across ${files.length} articles)`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log(`Blog free-first campaign validation PASS: ${files.length} articles checked.`);