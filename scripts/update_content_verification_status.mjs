import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const STATUS_FILE = path.join(ROOT, "data/content-verification-status.json");
const args = process.argv.slice(2);
const checkOnly = args.includes("--check");
const recordIndex = args.indexOf("--record");
const recordCode = recordIndex >= 0 ? String(args[recordIndex + 1] || "").toUpperCase() : null;

if (recordIndex >= 0 && !recordCode) {
  throw new Error("Usage: node scripts/update_content_verification_status.mjs --record AC9...");
}
if (checkOnly && recordCode) throw new Error("Use either --check or --record, not both.");

const status = JSON.parse(fs.readFileSync(STATUS_FILE, "utf8"));
const reviewed = new Set(status.reviewedCodes || []);
const yearDirectories = ["foundation", ...Array.from({ length: 10 }, (_, index) => `year${index + 1}`)];
const subjectMeta = {
  maths: { label: "Mathematics", route: "math" },
  science: { label: "Science", route: "science" },
  english: { label: "English", route: "english" }
};

function unique(values) {
  return [...new Set(values)];
}

function displayYear(directory) {
  return directory === "foundation" ? "Foundation" : `Year ${directory.replace("year", "")}`;
}

function findGroups() {
  const groups = [];
  for (const yearDirectory of yearDirectories) {
    for (const [subject, meta] of Object.entries(subjectMeta)) {
      const hub = path.join(ROOT, yearDirectory, "curriculum", subject, "index.html");
      if (!fs.existsSync(hub)) continue;
      const html = fs.readFileSync(hub, "utf8");
      const codes = unique([...html.matchAll(/<span class="curriculum-badge">([^<]+)<\/span>/g)].map((match) => match[1].trim().toUpperCase()));
      if (!codes.length) continue;
      groups.push({ yearDirectory, yearLabel: displayYear(yearDirectory), subject, subjectLabel: meta.label, subjectRoute: meta.route, hub, codes });
    }
  }
  return groups;
}

const groups = findGroups();
const codeToGroup = new Map(groups.flatMap((group) => group.codes.map((code) => [code, group])));

function publishedFiles(group, code) {
  const yearRoute = group.yearDirectory === "foundation" ? "grade-k" : `year-${group.yearDirectory.replace("year", "")}`;
  const base = path.join(ROOT, "quiz", yearRoute, group.subjectRoute, code.toLowerCase());
  return [path.join(base, "practice", "questions.js"), path.join(base, "test", "questions.js")];
}

if (recordCode) {
  const group = codeToGroup.get(recordCode);
  if (!group) throw new Error(`${recordCode} is not listed on a curriculum subject hub.`);
  const missing = publishedFiles(group, recordCode).filter((file) => !fs.existsSync(file));
  if (missing.length) throw new Error(`Cannot mark ${recordCode} reviewed; missing published file(s):\n${missing.map((file) => path.relative(ROOT, file)).join("\n")}`);
  reviewed.add(recordCode);
  status.reviewedCodes = [...reviewed].sort();
  fs.writeFileSync(STATUS_FILE, `${JSON.stringify(status, null, 2)}\n`);
}

const completed = groups.filter((group) => group.codes.every((code) => reviewed.has(code)));
const completedKeys = new Set(completed.map((group) => `${group.yearDirectory}/${group.subject}`));
const startMarker = "<!-- skillr-verification-badge:start -->";
const endMarker = "<!-- skillr-verification-badge:end -->";

function replaceMarked(source, start, end, replacement) {
  const pattern = new RegExp(`${start.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${end.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`);
  return pattern.test(source) ? source.replace(pattern, replacement) : source;
}

function desiredHub(group, source) {
  const key = `${group.yearDirectory}/${group.subject}`;
  const complete = completedKeys.has(key);
  const hasManagedBadge = source.includes(startMarker);
  const hasLegacyBadge = source.includes('class="curriculum-verified-label"');
  if (!complete && !hasManagedBadge && !hasLegacyBadge) return source;
  const label = `${group.yearLabel} ${group.subjectLabel}`;
  const badge = complete
    ? `${startMarker}<p><a class="curriculum-verified-label" href="/editorial-standards.html#verified-status" aria-label="${label} content verification details">✓ Content Verified</a></p>${endMarker}`
    : `${startMarker}${endMarker}`;
  let output = source.replace(/<!-- skillr-verification-badge:start -->[\s\S]*?<!-- skillr-verification-badge:end -->/, badge);
  if (output === source && !source.includes(startMarker)) {
    output = source.replace(/(<header class="curriculum-hero">[\s\S]*?<h1>[^<]+<\/h1>)(?:<p><a class="curriculum-verified-label"[\s\S]*?<\/a><\/p>)?/, `$1${badge}`);
  }
  return output;
}

const generated = new Map();
for (const group of groups) {
  const source = fs.readFileSync(group.hub, "utf8");
  generated.set(group.hub, desiredHub(group, source));
}

const verifiedLabels = completed.map((group) => `${group.yearLabel} ${group.subjectLabel}`);
const readableList = verifiedLabels.length < 2
  ? (verifiedLabels[0] || "No learning areas")
  : `${verifiedLabels.slice(0, -1).join(", ")} and ${verifiedLabels.at(-1)}`;

const aboutFile = path.join(ROOT, "about.html");
let about = fs.readFileSync(aboutFile, "utf8");
const aboutBlock = `<!-- skillr-verification-summary:start --><p><strong>Content Verified:</strong> ${readableList} question banks have completed our documented review for Australian Curriculum v9 alignment, year-level suitability, answer accuracy, explanation quality and meaningful question variety.</p><p>Review is continuing across other subjects and year levels. A verified label is shown only for a learning area that has completed this process.</p><!-- skillr-verification-summary:end -->`;
if (about.includes("<!-- skillr-verification-summary:start -->")) {
  about = replaceMarked(about, "<!-- skillr-verification-summary:start -->", "<!-- skillr-verification-summary:end -->", aboutBlock);
} else {
  about = about.replace(/<p><strong>Content Verified:<\/strong>[\s\S]*?<p>Review is continuing[\s\S]*?<\/p>/, aboutBlock);
}
generated.set(aboutFile, about);

const standardsFile = path.join(ROOT, "editorial-standards.html");
let standards = fs.readFileSync(standardsFile, "utf8");
const rows = completed.map((group) => `<tr><th scope="row">${group.yearLabel} ${group.subjectLabel}</th><td><span class="info-verified">✓ Content Verified</span></td></tr>`).join("");
const tableBody = `<!-- skillr-verification-rows:start -->${rows}<tr><th scope="row">Other learning areas</th><td>Quality review in progress</td></tr><!-- skillr-verification-rows:end -->`;
if (standards.includes("<!-- skillr-verification-rows:start -->")) {
  standards = replaceMarked(standards, "<!-- skillr-verification-rows:start -->", "<!-- skillr-verification-rows:end -->", tableBody);
} else {
  standards = standards.replace(/(<table class="info-status-table"><thead>[\s\S]*?<tbody>)[\s\S]*?(<\/tbody><\/table>)/, `$1${tableBody}$2`);
}
generated.set(standardsFile, standards);

for (const llmName of ["llms.txt", "llms-full.txt"]) {
  const file = path.join(ROOT, llmName);
  let text = fs.readFileSync(file, "utf8");
  const line = `Verified learning areas: ${readableList}. These learning areas have completed SkillrHub's documented content review. All other learning areas remain in quality review until every curriculum code in that year-and-subject group is published and recorded as reviewed.`;
  const block = `<!-- skillr-verification-summary:start -->\n${line}\n<!-- skillr-verification-summary:end -->`;
  if (text.includes("<!-- skillr-verification-summary:start -->")) {
    text = replaceMarked(text, "<!-- skillr-verification-summary:start -->", "<!-- skillr-verification-summary:end -->", block);
  } else {
    text = text.replace(/(^#[^\n]+\n\n[^\n]+\n)/, `$1\n${block}\n`);
  }
  generated.set(file, text);
}

const aiIndexFile = path.join(ROOT, "ai-index.json");
let aiIndex = fs.readFileSync(aiIndexFile, "utf8");
const verificationObject = {
  rule: "A learning area is verified only after every curriculum code listed on its year-and-subject hub has published Practice and Test banks and is recorded as reviewed.",
  verified_learning_areas: verifiedLabels,
  status_page: "https://skillrhub.com/editorial-standards.html#verified-status"
};
const verificationJson = JSON.stringify(verificationObject, null, 2).split("\n").map((line, index) => index ? `  ${line}` : line).join("\n");
const verificationProperty = `  "content_verification": ${verificationJson},\n`;
if (/  "content_verification": \{[\s\S]*?\n  \},\n  "foundation_quality_note":/.test(aiIndex)) {
  aiIndex = aiIndex.replace(/  "content_verification": \{[\s\S]*?\n  \},\n(?=  "foundation_quality_note":)/, verificationProperty);
} else {
  aiIndex = aiIndex.replace(/(?=  "foundation_quality_note":)/, verificationProperty);
}

function subjectStatus(yearDirectory, yearName) {
  const yearGroups = groups.filter((group) => group.yearDirectory === yearDirectory);
  const done = yearGroups.filter((group) => completedKeys.has(`${group.yearDirectory}/${group.subject}`)).map((group) => group.subjectLabel);
  const pending = yearGroups.filter((group) => !completedKeys.has(`${group.yearDirectory}/${group.subject}`)).map((group) => group.subjectLabel);
  const doneText = done.length ? done.join(" and ") : "No learning areas";
  const doneVerb = done.length === 1 ? "has" : "have";
  const pendingText = pending.length ? `${pending.join(" and ")} ${pending.length === 1 ? "remains" : "remain"} in progress.` : "All listed learning areas have completed review.";
  return {
    scope: `${yearName} ${doneText} question banks`,
    review_status: `${doneText} ${doneVerb} completed SkillrHub's documented review for Australian Curriculum v9 alignment, year-level suitability, answer accuracy, explanation quality and meaningful question variety. ${pendingText}`
  };
}

for (const [property, yearDirectory, yearName] of [["foundation_quality_note", "foundation", "Foundation/Kindergarten"], ["year1_quality_note", "year1", "Year 1"]]) {
  const values = subjectStatus(yearDirectory, yearName);
  const pattern = new RegExp(`("${property}": \\{[\\s\\S]*?"scope": )"[^"]*"([\\s\\S]*?"review_status": )"[^"]*"`);
  aiIndex = aiIndex.replace(pattern, `$1${JSON.stringify(values.scope)}$2${JSON.stringify(values.review_status)}`);
}
JSON.parse(aiIndex);
generated.set(aiIndexFile, aiIndex);

const drift = [];
for (const [file, desired] of generated) {
  const current = fs.readFileSync(file, "utf8");
  if (current === desired) continue;
  if (checkOnly) drift.push(path.relative(ROOT, file));
  else fs.writeFileSync(file, desired);
}

if (drift.length) {
  console.error(`Verification status is out of date:\n${drift.join("\n")}`);
  process.exit(1);
}

const target = recordCode ? codeToGroup.get(recordCode) : null;
const targetComplete = target ? target.codes.every((code) => reviewed.has(code)) : null;
console.log(JSON.stringify({
  recorded: recordCode,
  completedLearningAreas: verifiedLabels,
  ...(target ? { learningArea: `${target.yearLabel} ${target.subjectLabel}`, reviewed: target.codes.filter((code) => reviewed.has(code)).length, required: target.codes.length, badgeActivated: targetComplete } : {}),
  status: checkOnly ? "CURRENT" : "UPDATED"
}, null, 2));
