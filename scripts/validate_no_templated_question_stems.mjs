#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = path.resolve(import.meta.dirname, "..");
const LEGACY_MAX = 9567;

const ROOTS = [
  "assets/assessment-banks",
  "quiz",
  "curriculum-question-banks/banks",
];

const ALLOWED_EXTENSIONS = new Set([".json", ".js", ".mjs", ".md", ".html"]);

const BANNED = [
  { name: "year-student generic stem", re: /A (?:Foundation|Year \d+) student is solving a problem involving\b/i },
  { name: "generic valid-option stem", re: /Which option is (?:mathematically|scientifically|linguistically) valid\?/i },
  { name: "check-when-using stem", re: /What should you check when using\b/i },
  { name: "important-when-using stem", re: /What is important when using\b/i },
  { name: "descriptor description stem", re: /Which statement correctly describes\b/i },
  { name: "descriptor valid-example stem", re: /Which statement gives (?:a )?valid example of\b/i },
  { name: "descriptor example stem", re: /Which statement gives an example of\b/i },
  { name: "descriptor applies stem", re: /Which description correctly applies\b/i },
  { name: "response applies stem", re: /Which response correctly applies\b/i },
  { name: "response uses stem", re: /Which response correctly uses\b/i },
  { name: "statement explains stem", re: /Which statement correctly explains\b/i },
  { name: "description accurate stem", re: /Which description is accurate for\b/i },
  { name: "statement identifies stem", re: /Which statement correctly identifies\b/i },
  { name: "choice describes stem", re: /Which choice best describes\b/i },
  { name: "correct-use-requirement stem", re: /What does correct use require for\b/i },
  { name: "statement true-about stem", re: /Which statement is true about\b/i },
  { name: "correct-way-to-apply stem", re: /What is the correct way to apply\b/i },
  { name: "application-requirement stem", re: /What does correct application require for\b/i },
  { name: "claim-accurate stem", re: /Which claim is accurate about\b/i },
  { name: "when-would-you-use stem", re: /When would you use\b/i },
  { name: "choice-demonstrates stem", re: /Which choice demonstrates\b/i },
  { name: "checked-when-applying stem", re: /What should be checked when applying\b/i },
  { name: "required-to-apply stem", re: /What is required to apply\b/i },
];

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (ALLOWED_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) files.push(full);
  }
  return files;
}

function changedQuestionFiles() {
  const base = (process.env.BASE_SHA || "").trim();
  if (!base || /^0+$/.test(base)) return new Set();
  try {
    const output = execFileSync("git", ["diff", "--name-only", base, "HEAD", "--", ...ROOTS], {
      cwd: ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });
    return new Set(output.split(/\r?\n/).map(x => x.trim()).filter(Boolean));
  } catch {
    return new Set();
  }
}

const findings = [];
for (const relativeRoot of ROOTS) {
  for (const file of walk(path.join(ROOT, relativeRoot))) {
    const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);
    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i];
      for (const rule of BANNED) {
        if (rule.re.test(line)) {
          findings.push({
            file: path.relative(ROOT, file).split(path.sep).join("/"),
            line: i + 1,
            rule: rule.name,
            text: line.trim().slice(0, 260),
          });
        }
      }
    }
  }
}

const changed = changedQuestionFiles();
const changedFindings = findings.filter(f => changed.has(f.file));
const failures = [];

if (findings.length > LEGACY_MAX) {
  failures.push(`Legacy templated-question debt increased from ${LEGACY_MAX} to ${findings.length}.`);
}
if (changedFindings.length) {
  failures.push(`${changedFindings.length} banned templated-question references remain in question-bank files changed by this commit.`);
}

console.log(`Question-quality ratchet: ${findings.length} legacy banned references remain; ceiling is ${LEGACY_MAX}.`);
if (findings.length < LEGACY_MAX) {
  console.log(`Improvement: legacy debt decreased by ${LEGACY_MAX - findings.length}. Keep reducing it as banks are reauthored.`);
}

if (failures.length) {
  for (const failure of failures) console.error(`FAIL: ${failure}`);
  const sample = changedFindings.length ? changedFindings : findings.slice(0, 50);
  for (const finding of sample.slice(0, 250)) {
    console.error(`${finding.file}:${finding.line} [${finding.rule}] ${finding.text}`);
  }
  console.error("\nStrict rule for new/touched work: Foundation to Year 10 questions must be genuinely authored for the curriculum code and grade level. Existing legacy debt is grandfathered only until that bank is touched, and the site-wide count may never increase.");
  process.exit(1);
}

if (findings.length === 0) {
  console.log("PASS: no banned templated-question stems remain across Foundation–Year 10 assessment content.");
} else {
  console.log("PASS WITH LEGACY DEBT: no new/touched templated stems were introduced and the historic backlog did not increase.");
}
