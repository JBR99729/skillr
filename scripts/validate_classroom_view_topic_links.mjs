import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const curriculumRoots = ["foundation", ...Array.from({ length: 10 }, (_, i) => `year${i + 1}`)];

const findFiles = (dir) => {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...findFiles(full));
    else if (entry.isFile() && full.endsWith(`${path.sep}teacher-slides${path.sep}index.html`)) out.push(full);
  }
  return out;
};

const errors = [];
const pages = curriculumRoots
  .flatMap((dir) => findFiles(path.join(root, dir)))
  .map((file) => ({ file, html: fs.readFileSync(file, "utf8") }))
  .filter(({ html }) => /<h1 id="page-title">Classroom View<\/h1>/i.test(html));

for (const { file, html } of pages) {
  const rel = path.relative(root, file).replace(/\\/g, "/");
  const [year, subject] = rel.split("/");
  const topicTitle = html.match(/<p class="display-topic-title">([\s\S]*?)<\/p>/i)?.[1] ?? "";
  const code = topicTitle.match(/\bAC9[A-Z0-9]+\b/i)?.[0]?.toUpperCase() ?? "";
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1] ?? "";
  const related = html.match(/<details class="classroom-related" data-classroom-related>([\s\S]*?)<\/details>/i)?.[1] ?? "";

  if (!/meta name="robots" content="noindex,follow"/i.test(html)) errors.push(`${rel}: Classroom View must stay noindex,follow`);
  if (!canonical || /\/teacher-slides\//i.test(canonical)) errors.push(`${rel}: canonical must point to the indexable topic page`);
  if (!related) {
    errors.push(`${rel}: missing Related Classroom Views section`);
    continue;
  }

  const canonicalLinks = [...related.matchAll(/<a href="(https:\/\/skillrhub\.com\/(?:foundation|year\d+)\/(?:english|maths|science)\/[^"#?]+\/)"><strong>(AC9[A-Z0-9]+)<\/strong>/gi)]
    .map((match) => ({ url: match[1], code: match[2].toUpperCase() }));
  const classroomLinks = [...related.matchAll(/<a href="(https:\/\/skillrhub\.com\/(?:foundation|year\d+)\/(?:english|maths|science)\/[^"#?]+\/teacher-slides\/)">Classroom View →<\/a>/gi)]
    .map((match) => match[1]);

  if (canonicalLinks.length < 3 || canonicalLinks.length > 4) errors.push(`${rel}: expected 3-4 related canonical topic links, found ${canonicalLinks.length}`);
  if (classroomLinks.length !== canonicalLinks.length) errors.push(`${rel}: canonical/Classroom View related-link counts differ`);
  const uniqueCodes = new Set(canonicalLinks.map((item) => item.code));
  if (uniqueCodes.size !== canonicalLinks.length) errors.push(`${rel}: duplicate related curriculum codes`);
  if (code && uniqueCodes.has(code)) errors.push(`${rel}: Related Classroom Views must not self-link ${code}`);

  for (const item of canonicalLinks) {
    const url = new URL(item.url);
    const pieces = url.pathname.split("/").filter(Boolean);
    if (pieces[0] !== year || pieces[1] !== subject) errors.push(`${rel}: unrelated cross-cluster canonical link ${item.url}`);
  }
  for (const urlText of classroomLinks) {
    const url = new URL(urlText);
    const pieces = url.pathname.split("/").filter(Boolean);
    if (pieces[0] !== year || pieces[1] !== subject) errors.push(`${rel}: unrelated cross-cluster Classroom View link ${urlText}`);
  }

  const expectedHub = `https://skillrhub.com/${year}/curriculum/${subject}/`;
  if (!related.includes(`href="${expectedHub}"`)) errors.push(`${rel}: missing year/subject curriculum hub link`);
}

const byCode = new Map();
for (const page of pages) {
  const title = page.html.match(/<p class="display-topic-title">([\s\S]*?)<\/p>/i)?.[1] ?? "";
  const code = title.match(/\bAC9[A-Z0-9]+\b/i)?.[0]?.toUpperCase();
  if (code && !byCode.has(code)) byCode.set(code, page.html);
}

const requirePair = (from, to) => {
  const html = byCode.get(from);
  if (!html) return;
  const related = html.match(/<details class="classroom-related" data-classroom-related>([\s\S]*?)<\/details>/i)?.[1] ?? "";
  if (!related.includes(`<strong>${to}</strong>`)) errors.push(`${from}: GSC-priority cluster should link ${to}`);
};

requirePair("AC9M3M03", "AC9M3M04");
requirePair("AC9M3M04", "AC9M3M03");
requirePair("AC9M1N04", "AC9M1N05");
requirePair("AC9M1N05", "AC9M1N04");
requirePair("AC9S8I06", "AC9S8I05");
requirePair("AC9S8I06", "AC9S8I07");
requirePair("AC9S7I06", "AC9S7I05");
requirePair("AC9S7I06", "AC9S7I07");

if (pages.length < 700) errors.push(`Expected at least 700 Classroom View pages, found ${pages.length}`);

if (errors.length) {
  console.error(`Classroom View topical-link validation FAIL (${errors.length} issues)`);
  for (const issue of errors.slice(0, 100)) console.error(`- ${issue}`);
  process.exit(1);
}

console.log(`Classroom View topical-link validation PASS: ${pages.length} Classroom View pages checked.`);
