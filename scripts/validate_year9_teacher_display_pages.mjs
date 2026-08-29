import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const subjects = ['english', 'maths', 'science'];
const failures = [];
const counts = {};
let total = 0;

for (const subject of subjects) {
  const base = path.join(root, 'year9', subject);
  if (!fs.existsSync(base)) {
    failures.push(`${subject}: missing Year 9 subject directory`);
    continue;
  }

  const topics = fs.readdirSync(base, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && /^ac9/i.test(entry.name))
    .map((entry) => entry.name)
    .filter((topic) => fs.existsSync(path.join(base, topic, 'teacher-slides', 'index.html')))
    .sort();

  counts[subject] = topics.length;
  if (!topics.length) failures.push(`${subject}: found no slide-owning topic routes`);

  for (const topic of topics) {
    const topicFile = path.join(base, topic, 'index.html');
    const displayFile = path.join(base, topic, 'teacher-slides', 'index.html');
    if (!fs.existsSync(topicFile)) {
      failures.push(`${subject}/${topic}: missing topic index.html`);
      continue;
    }

    const html = fs.readFileSync(displayFile, 'utf8');
    const code = ((topic.match(/^(ac9[a-z0-9]+)/i) || [])[1] || '').toUpperCase();
    total++;

    const required = [
      ['Teacher Display Page', 'Teacher Display Page marker'],
      ['class="display-board"', 'display board'],
      ['data-single-open', 'single-open section behaviour'],
      ['Need teaching slides or worksheets?', 'contact section'],
      ['href="../"', 'Topic Guide return link'],
      ['Worked examples', 'worked-examples section'],
      ['>Practice</a>', 'Practice navigation'],
      ['>Test</a>', 'Test navigation'],
    ];
    for (const [needle, label] of required) {
      if (!html.includes(needle)) failures.push(`${subject}/${topic}: missing ${label}`);
    }

    if (code && !html.includes(code)) failures.push(`${subject}/${topic}: display does not contain ${code}`);
    if (code && !html.includes(`<title>${code} Classroom View | SkillrHub</title>`)) failures.push(`${subject}/${topic}: document title is not ${code} Classroom View`);
    if (code && !html.includes(`<h1 id="page-title">Classroom View</h1>`)) failures.push(`${subject}/${topic}: display heading is not Classroom View`);

    const forbidden = [
      ['fixed-slide-viewer', 'legacy fixed-slide viewer'],
      ['data-slide', 'legacy slide runtime markup'],
      ['teacher-slide-viewer.js', 'legacy slide-viewer runtime'],
      ['teacher-slide-viewer.css', 'legacy slide-viewer stylesheet'],
      ['example-icon', 'generic example-icon filler visual'],
      ['src="slide-', 'legacy slide SVG image reference'],
      ['fetch(', 'runtime content fetch'],
    ];
    for (const [needle, label] of forbidden) {
      if (html.includes(needle)) failures.push(`${subject}/${topic}: contains ${label}`);
    }

    const contactAt = html.lastIndexOf('Need teaching slides or worksheets?');
    const assessmentAt = html.indexOf('Assessment and review');
    if (assessmentAt >= 0 && contactAt >= 0 && contactAt < assessmentAt) failures.push(`${subject}/${topic}: contact section is not last`);
  }
}

if (!total) failures.push('no Year 9 Teacher Display pages were validated');

if (failures.length) {
  console.error('Year 9 Teacher Display validation FAILED');
  console.error(`Counts: English ${counts.english ?? 0}, Maths ${counts.maths ?? 0}, Science ${counts.science ?? 0}, total ${total}`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Year 9 Teacher Display validation PASS (${total} pages: English ${counts.english}, Maths ${counts.maths}, Science ${counts.science})`);
