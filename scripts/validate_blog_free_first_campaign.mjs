import fs from "node:fs";
import path from "node:path";

const BLOG_DIR = "blogs";
const START = "<!-- BLOG_FREE_FIRST_CAMPAIGN_START -->";
const END = "<!-- BLOG_FREE_FIRST_CAMPAIGN_END -->";
const DOWNLOAD_MARKER = "data-free-download";
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
  // Practical homeschool articles use the current printable-to-adult-tracker pathway.
  if (html.includes("data-homeschool-practical-guide")) {
    const required = ['href="/worksheets/"', 'href="/print-and-go.html#curriculum-resource-directory"', 'href="https://app.skillrhub.com/"', 'data-email-signup="homeschool-blog"', 'method="POST"', 'name="EMAIL" type="email"', 'Subscribe now', 'https://www.facebook.com/1139028835969651'];
    for (const text of required) if (!html.includes(text)) failures.push(`${file}: practical homeschool article missing ${text}`);
    const body = html.match(/<div class="article-body">([\s\S]*?)<\/div>/)?.[1] || "";
    const words = body.replace(/<[^>]*>/g, " ").trim().split(/\s+/).length;
    if (words < 1000) failures.push(`${file}: practical homeschool article below 1000 words`);
    continue;
  }
  if (html.includes(DOWNLOAD_MARKER)) {
    const requiredDownloadElements = [
      'href="/downloads/free-resources/',
      'src="/assets/free-resources/',
      "Topic Guide",
      "Teacher Slides",
      "Worksheet",
      "Practice",
      "Test",
      "Related",
    ];
    for (const element of requiredDownloadElements) {
      if (!html.includes(element)) failures.push(`${file}: free-download article missing: ${element}`);
    }
    continue;
  }
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
console.log(`Blog CTA validation PASS: ${files.length} articles checked (generic campaign or resource-specific download).`);
