#!/usr/bin/env node
import fs from 'node:fs';

function update(path, transform) {
  const before = fs.readFileSync(path, 'utf8');
  const after = transform(before);
  if (after === before) {
    console.log(`No change: ${path}`);
    return false;
  }
  fs.writeFileSync(path, after);
  console.log(`Updated: ${path}`);
  return true;
}

let changed = 0;

for (const year of [7, 8, 9, 10]) {
  const path = `year${year}/curriculum/english/index.html`;
  changed += update(path, (html) => {
    const homeworkHref = new RegExp(`href="/quiz/year-${year}/english/([a-z0-9]+)/homework/"`, 'g');
    const matches = [...html.matchAll(homeworkHref)];
    if (!matches.length) throw new Error(`${path}: expected homework links were not found`);
    let out = html.replace(homeworkHref, `href="/quiz/year-${year}/english/$1/worksheet/"`);
    out = out.replaceAll('>Homework</a>', '>Worksheet</a>');
    out = out.replaceAll('homework worksheet', 'worksheet');
    console.log(`${path}: repaired ${matches.length} homework routes`);
    return out;
  }) ? 1 : 0;
}

changed += update('year3/curriculum/science/index.html', (html) => {
  const oldAnchor = '<a href="/year3/science/ac9s3u04-investigate-the-observable-properties-of-solids-and-liquids-and/teacher-deck/">Teacher slides</a>';
  const newAnchor = '<a href="/worksheets/year3/science/teacher-slides/ac9s3u04-teacher-slide.pdf" target="_blank" rel="noopener">Teacher slide</a>';
  if (!html.includes(oldAnchor)) throw new Error('Year 3 AC9S3U04 stale teacher-deck link not found');
  return html.replace(oldAnchor, newAnchor);
}) ? 1 : 0;

const scienceRepairs = [
  {
    path: 'year7/science/ac9s7i02-plan-and-conduct-reproducible-investigations-to-answer/index.html',
    from: '/year7/science/ac9s7i03-select-and-use-equipment-to-generate-and-record/',
    to: '/year7/science/ac9s7i03-select-and-use-equipment-to-generate-and-record-data-with/'
  },
  {
    path: 'year7/science/ac9s7i03-select-and-use-equipment-to-generate-and-record-data-with/index.html',
    from: '/year7/science/ac9s7i04-select-and-construct-appropriate-representations-to-organise-and-process-data-and-information/',
    to: '/year7/science/ac9s7i04-select-and-construct-appropriate-representations-including/'
  },
  {
    path: 'year7/science/ac9s7u04-investigate-and-represent-balanced-and-unbalanced-forces/index.html',
    from: '/year7/science/ac9s7u05-use-particle-theory-to-describe-the-arrangement-of-particles-in-a/',
    to: '/year7/science/ac9s7u05-particle-theory-to-describe-the-arrangement-of-particles-in-a/'
  }
];

for (const repair of scienceRepairs) {
  changed += update(repair.path, (html) => {
    if (!html.includes(repair.from)) throw new Error(`${repair.path}: stale adjacent-topic link not found`);
    return html.replaceAll(repair.from, repair.to);
  }) ? 1 : 0;
}

console.log(`Route repair complete; changed files: ${changed}`);
