import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const topicRoot = path.join(root, "year3/maths");
const entries = {};
const clean = (value) => String(value || "")
  .replace(/<[^>]+>/g, " ")
  .replace(/&amp;/g, "&")
  .replace(/&nbsp;/g, " ")
  .replace(/&#39;/g, "'")
  .replace(/&quot;/g, '"')
  .replace(/\s+/g, " ")
  .trim();

for (const directory of fs.readdirSync(topicRoot, { withFileTypes: true }).filter((item) => item.isDirectory())) {
  const file = path.join(topicRoot, directory.name, "index.html");
  if (!fs.existsSync(file)) continue;
  const html = fs.readFileSync(file, "utf8");
  const code = (html.match(/What students learn in (AC9M3[A-Z0-9]+)/i) || [])[1]?.toUpperCase();
  const section = (html.match(/<h2>Curriculum coverage and elaborations<\/h2>([\s\S]*?)<\/section>/i) || [])[1] || "";
  if (!code || !section) continue;
  const rows = [...section.matchAll(/<li><strong>(Content description|E\d+):<\/strong>\s*([\s\S]*?)<\/li>/gi)]
    .map((match) => ({ id: match[1], wording: clean(match[2]) }));
  const description = rows.find((row) => /content/i.test(row.id))?.wording;
  const elaborations = rows.filter((row) => /^E/i.test(row.id)).map((row) => ({
    id: row.id.toUpperCase(),
    curriculumWording: row.wording,
    teachingContext: false
  }));
  if (!description || !elaborations.length) throw new Error(`${code}: curriculum section is incomplete`);
  entries[code] = { contentDescription: description, elaborations };
}

if (Object.keys(entries).length !== 23) throw new Error(`Expected 23 Year 3 Maths codes, found ${Object.keys(entries).length}`);
const output = `(() => {\n  "use strict";\n  window.SkillrYear3MathsElaborationMap = ${JSON.stringify(entries, null, 2)};\n})();\n`;
fs.writeFileSync(path.join(root, "assets/year3-maths-elaboration-map.js"), output);
console.log(`Built Year 3 Maths v1.1 elaboration map for ${Object.keys(entries).length} codes and ${Object.values(entries).reduce((sum, item) => sum + item.elaborations.length, 0)} elaborations.`);
