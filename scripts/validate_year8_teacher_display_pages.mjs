import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const expected = { english: 23, maths: 27, science: 19 };
const failures = [];
let total = 0;

for (const [subject, expectedCount] of Object.entries(expected)) {
  const base = path.join(root, 'year8', subject);
  // Count only topic routes that own a local Teacher Display. Year 8 Science has
  // one alternate AC9S8I01 topic route whose Teacher Slides button deliberately
  // points to the primary AC9S8I01 display, so it must not create a duplicate deck.
  const topics = fs.readdirSync(base, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && /^ac9/i.test(entry.name))
    .map((entry) => entry.name)
    .filter((topic) => fs.existsSync(path.join(base, topic, 'teacher-slides', 'index.html')))
    .sort();
  if (topics.length !== expectedCount) failures.push(`${subject}: expected ${expectedCount} slide-owning topic routes, found ${topics.length}`);

  let subjectDisplays = 0;
  for (const topic of topics) {
    const topicFile = path.join(base, topic, 'index.html');
    const displayFile = path.join(base, topic, 'teacher-slides', 'index.html');
    if (!fs.existsSync(topicFile)) {
      failures.push(`${subject}/${topic}: missing topic index.html`);
      continue;
    }

    const topicHtml = fs.readFileSync(topicFile, 'utf8');
    const html = fs.readFileSync(displayFile, 'utf8');
    const code = (topicHtml.match(/\b(AC9[A-Z0-9]+)\b/) || [])[1] || '';
    subjectDisplays++;
    total++;

    const required = [
      ['Teacher Display Page', 'Teacher Display Page marker'],
      ['class="display-board"', 'display board'],
      ['data-single-open', 'single-open section behaviour'],
      ['Need extra information?', 'contact section'],
      ['href="../"', 'Topic Guide return link'],
      ['Worked examples', 'worked-examples section'],
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

    const contactAt = html.lastIndexOf('Need extra information?');
    const assessmentAt = html.indexOf('Assessment and review');
    if (assessmentAt >= 0 && contactAt >= 0 && contactAt < assessmentAt) failures.push(`${subject}/${topic}: contact section is not last`);
  }
  if (subjectDisplays !== expectedCount) failures.push(`${subject}: expected ${expectedCount} display pages, validated ${subjectDisplays}`);
}

if (total !== 69) failures.push(`expected 69 Year 8 Teacher Display pages, validated ${total}`);

if (failures.length) {
  console.error('Year 8 Teacher Display validation FAILED');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log(`Year 8 Teacher Display validation PASS (${total}/69 pages)`);
