import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "curriculum-question-banks/manifest.json"), "utf8"));
const units = manifest.units ?? manifest;
const unitByCode = new Map(units.map((unit) => [unit.code.toLowerCase(), unit]));
const badQuickRead = "Students compare vocabulary, modality, terms of address, humour and interaction patterns across contexts";

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const item = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(item) : [item];
  });
}

function topicUrls() {
  const urls = new Map();
  for (const year of fs.readdirSync(root).filter((name) => /^year\d+$/.test(name))) {
    for (const subject of ["science", "english"]) {
      const subjectRoot = path.join(root, year, subject);
      if (!fs.existsSync(subjectRoot)) continue;
      for (const entry of fs.readdirSync(subjectRoot, { withFileTypes: true })) {
        if (!entry.isDirectory()) continue;
        const page = path.join(subjectRoot, entry.name, "index.html");
        if (!fs.existsSync(page)) continue;
        const code = fs.readFileSync(page, "utf8").match(/AC9[A-Z0-9]+/i)?.[0]?.toLowerCase();
        if (code && !urls.has(code)) urls.set(code, `/${path.relative(root, path.dirname(page)).replaceAll(path.sep, "/")}/`);
      }
    }
  }
  return urls;
}

function quickRead(subject, description) {
  const strategy = subject === "english"
    ? "Read the supplied words, image or structure closely. Name a precise choice, then explain its effect on meaning, purpose or audience."
    : "Use observations, models, data or evidence to explain the scientific idea; do not rely on a memorised definition alone.";
  const trap = subject === "english"
    ? "Naming a feature is not analysis: support the interpretation with exact evidence."
    : "Do not confuse a claim with evidence; explain the relationship or mechanism that supports the conclusion.";
  return `<section class="pre-read-notes"><h2>60-second Quick Read</h2><ul><li><strong>Focus:</strong> ${description}</li><li><strong>Approach:</strong> ${strategy}</li><li><strong>Common trap:</strong> ${trap}</li></ul></section>`;
}

const urls = topicUrls();
let repaired = 0;
const unresolved = [];

for (const file of walk(path.join(root, "quiz")).filter((candidate) => candidate.endsWith(".html"))) {
  const relative = path.relative(root, file).replaceAll(path.sep, "/");
  const match = relative.match(/^quiz\/(year-(\d+))\/(science|english)\/(ac9[a-z0-9]+)\//i);
  if (!match) continue;
  let html = fs.readFileSync(file, "utf8");
  if (!html.includes(badQuickRead) && !new RegExp(`${match[4]} Maths</a>`, "i").test(html)) continue;

  const [, , year, subject, code] = match;
  const unit = unitByCode.get(code.toLowerCase());
  const topicUrl = urls.get(code.toLowerCase());
  if (!unit || !topicUrl) {
    unresolved.push(relative);
    continue;
  }
  const subjectName = subject[0].toUpperCase() + subject.slice(1);
  html = html
    .replace(/<section class="pre-read-notes">[\s\S]*?<\/section>/, quickRead(subject, unit.description))
    .replace(new RegExp(`(<a href=")[^"]*(">${code} )Maths</a>`, "i"), `$1${topicUrl}$2${subjectName}</a>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="Year ${year} ${subjectName} ${unit.code}: ${unit.description}">`);
  fs.writeFileSync(file, html);
  repaired += 1;
}

if (unresolved.length) throw new Error(`Could not resolve ${unresolved.length} quiz pages:\n${unresolved.join("\n")}`);
console.log(`Repaired ${repaired} miswired Science/English quiz context pages.`);
