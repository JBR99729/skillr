#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const YEAR_ROOTS = ['foundation', ...Array.from({ length: 10 }, (_, i) => `year${i + 1}`)];
const SUBJECTS = new Set(['maths', 'science', 'english']);
const violations = [];
const totals = {
  topicPages: 0,
  teacherHosts: 0,
  runtimeTopicPages: 0,
  nonDropdownTopicPages: 0,
  runtimeTeacherHosts: 0,
  directTeacherDownloads: 0,
};

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function rel(file) {
  return path.relative(ROOT, file).split(path.sep).join('/');
}

function add(type, file, detail) {
  violations.push({ type, file: rel(file), detail });
}

function isTopicPage(file) {
  const parts = rel(file).split('/');
  return parts.length === 4 && YEAR_ROOTS.includes(parts[0]) && SUBJECTS.has(parts[1]) && parts[3] === 'index.html';
}

function isTeacherHost(file) {
  const p = rel(file);
  return /\/teacher-deck\/index\.html$/i.test(p) || /\/teacher-slides\/live\.html$/i.test(p) || /\/teacher-slides\/[^/]+\/index\.html$/i.test(p);
}

const runtimeTopicPatterns = [
  /\bLoading(?:…|\.\.\.)/i,
  /id=["'](?:topicRoot|year\d+Topic)["']/i,
  /(?:topic-modules-render|lesson-render|lower-materials-render|foundation-[^"']*render|year\d+-(?:maths|science|english)-(?:render|topic))\.js/i,
];

const runtimeDeckPatterns = [
  /<main[^>]+class=["'][^"']*(?:deck|slide)/i,
  /id=["']slideRoot["']/i,
  /\bteachingSlides\b/i,
  /\.slides\.forEach/i,
  /(?:lower-materials-render|foundation-[^"']*render|year\d+[^"']*slides)\.js/i,
];

for (const year of YEAR_ROOTS) {
  for (const file of walk(path.join(ROOT, year))) {
    if (!file.endsWith('.html')) continue;
    const html = fs.readFileSync(file, 'utf8');

    if (isTopicPage(file)) {
      totals.topicPages++;
      if (!/<details\b/i.test(html) || !/<summary\b/i.test(html)) {
        totals.nonDropdownTopicPages++;
        add('topic-no-native-dropdowns', file, 'Topic teaching sections are not yet native <details>/<summary>.');
      }
      if (runtimeTopicPatterns.some((pattern) => pattern.test(html))) {
        totals.runtimeTopicPages++;
        add('topic-runtime-renderer', file, 'Canonical topic teaching content still depends on a runtime renderer/loading shell.');
      }
      if (/href=["'][^"']+\.(?:pptx|pdf)(?:[?#][^"']*)?["']/i.test(html) && /teacher/i.test(html)) {
        totals.directTeacherDownloads++;
        add('teacher-direct-download-link', file, 'Topic page exposes a direct teacher PPTX/PDF file link instead of the protected slide viewer.');
      }
    }

    if (isTeacherHost(file)) {
      totals.teacherHosts++;
      if (runtimeDeckPatterns.some((pattern) => pattern.test(html))) {
        totals.runtimeTeacherHosts++;
        add('teacher-runtime-renderer', file, 'Teacher resource still assembles curriculum slides in the browser.');
      }
      if (/href=["'][^"']+\.(?:pptx|pdf)(?:[?#][^"']*)?["']/i.test(html)) {
        totals.directTeacherDownloads++;
        add('teacher-direct-download-link', file, 'Teacher host exposes a direct PPTX/PDF link.');
      }
    }
  }
}

const byType = Object.fromEntries(
  [...new Set(violations.map((item) => item.type))].sort().map((type) => [type, violations.filter((item) => item.type === type).length]),
);

const report = {
  generatedAt: new Date().toISOString(),
  scope: 'Foundation-Year 10 Maths, English and Science',
  totals,
  byType,
  violationCount: violations.length,
  violations,
};

const output = process.argv.find((arg) => arg.startsWith('--json='));
if (output) {
  const target = output.slice('--json='.length);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, `${JSON.stringify(report, null, 2)}\n`);
}

console.log(`Static curriculum site audit`);
console.log(`Topic pages: ${totals.topicPages}`);
console.log(`Teacher hosts: ${totals.teacherHosts}`);
console.log(`Runtime topic pages: ${totals.runtimeTopicPages}`);
console.log(`Topic pages without dropdowns: ${totals.nonDropdownTopicPages}`);
console.log(`Runtime teacher hosts: ${totals.runtimeTeacherHosts}`);
console.log(`Direct teacher file links: ${totals.directTeacherDownloads}`);
console.log(`Total violations: ${violations.length}`);
for (const [type, count] of Object.entries(byType)) console.log(`- ${type}: ${count}`);

if (process.argv.includes('--fail-on-violations') && violations.length) process.exit(1);
