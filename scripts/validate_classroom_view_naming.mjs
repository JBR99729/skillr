import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const curriculumRoots = ['foundation', ...Array.from({ length: 10 }, (_, i) => `year${i + 1}`)];
const failures = [];
let displayCount = 0;
let teacherLinkCount = 0;

const walkFiles = (dir, predicate) => {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkFiles(full, predicate));
    else if (predicate(full)) out.push(full);
  }
  return out;
};

const stripTags = (value) => value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

for (const curriculumRoot of curriculumRoots) {
  const base = path.join(root, curriculumRoot);
  for (const file of walkFiles(base, (name) => name.endsWith('.html'))) {
    const rel = path.relative(root, file);
    const html = fs.readFileSync(file, 'utf8');

    for (const anchor of html.match(/<a\b[^>]*>[\s\S]*?<\/a>/gi) || []) {
      const open = anchor.match(/^<a\b[^>]*>/i)?.[0] || '';
      if (!/href\s*=\s*["'][^"']*teacher-slides[^"']*["']/i.test(open)) continue;
      teacherLinkCount++;
      const label = stripTags(anchor);
      if (/Teacher\s+(?:Slides|Display(?:\s+Page)?)/i.test(label)) {
        failures.push(`${rel}: teacher-slides link still uses old visible label "${label}"`);
      }
    }

    if (!/[\\/]teacher-slides[\\/]index\.html$/i.test(file) || !html.includes('class="display-board"')) continue;
    displayCount++;

    const code = (rel.match(/[\\/](ac9[a-z0-9]+)[^\\/]*[\\/]teacher-slides[\\/]index\.html$/i)?.[1] || '').toUpperCase();
    const required = [
      ['<h1 id="page-title">Classroom View</h1>', 'Classroom View page heading'],
      ['<small>Ready to project and teach</small>', 'project-and-teach description'],
      ['class="display-topic-title"', 'retained topic-title line'],
      ['aria-label="Classroom View navigation"', 'Classroom View navigation label'],
      ['<!-- Teacher Display Page -->', 'hidden compatibility marker'],
    ];
    for (const [needle, label] of required) {
      if (!html.includes(needle)) failures.push(`${rel}: missing ${label}`);
    }

    if (code) {
      if (!html.includes(`<title>${code} Classroom View | SkillrHub</title>`)) {
        failures.push(`${rel}: document title is not ${code} Classroom View`);
      }
      const topicTitle = html.match(/<p class="display-topic-title">([\s\S]*?)<\/p>/i)?.[1] || '';
      if (!topicTitle.toUpperCase().includes(code)) failures.push(`${rel}: retained topic-title line does not contain ${code}`);
    }

    if (/<small>[^<]*Teacher Display/i.test(html)) failures.push(`${rel}: old Teacher Display wording remains visibly in the small description`);
  }
}

if (!displayCount) failures.push('No static Classroom View pages were found');
if (!teacherLinkCount) failures.push('No teacher-slides links were found to validate');

if (failures.length) {
  console.error(`Classroom View naming validation FAILED (${failures.length} issues)`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Classroom View naming validation PASS: ${displayCount} display pages and ${teacherLinkCount} teacher-slides links checked.`);
