#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const failures = [];
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const exists = file => fs.existsSync(path.join(root, file));
const routeFile = href => {
  const route = String(href || '').split(/[?#]/, 1)[0].replace(/^\//, '');
  return route.endsWith('/') ? `${route}index.html` : route;
};
const hrefs = html => [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)].map(match => match[1]);

const units = JSON.parse(read('data/curriculum-units.json')).units
  .filter(unit => unit.yearNumber === 0 && unit.subjectSlug === 'science')
  .sort((a, b) => a.sourceOrder - b.sourceOrder);

if (units.length !== 9) failures.push(`Expected 9 Foundation Science curriculum units; found ${units.length}`);

for (const unit of units) {
  const topicFile = routeFile(unit.url);
  const code = unit.code;
  const lowerCode = code.toLowerCase();
  const expectedCanonical = `https://skillrhub.com${unit.url}`;

  if (!exists(topicFile)) {
    failures.push(`${code}: missing topic page ${topicFile}`);
    continue;
  }

  const html = read(topicFile);
  const text = html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '');

  if (!/<meta\b[^>]*name=["']robots["'][^>]*content=["']index,\s*follow["']/i.test(html)) failures.push(`${code}: topic page must be index,follow`);
  if (!html.includes(`<link rel="canonical" href="${expectedCanonical}">`)) failures.push(`${code}: topic page must self-canonicalise to clean folder URL`);
  if (!/<body\b[^>]*class=["'][^"']*\bfoundation-science-topic\b/i.test(html)) failures.push(`${code}: topic page must keep Foundation Science scope class`);
  if (!/<main\b[^>]*class=["'][^"']*\bcurriculum-layout\b/i.test(html)) failures.push(`${code}: topic page must keep the shared curriculum layout wrapper`);
  if (!/<details\b/i.test(html) && !/<section\b[^>]*class=["'][^"']*\bcurriculum-topic-section\b/i.test(html)) failures.push(`${code}: topic page must keep static teaching sections`);
  if (/id=["'](?:topicRoot|year2Topic)["'][^>]*>\s*(?:<p[^>]*>)?\s*Loading/i.test(html)) failures.push(`${code}: topic page must not depend on runtime curriculum rendering`);
  if (!/What students learn|Learning intention|Learning goal|Teaching Lesson|Key concept|Curriculum coverage|Core idea/i.test(text)) failures.push(`${code}: static teaching content marker missing`);
  if (!/<details\b/i.test(html)) failures.push(`${code}: migrated topic pages must keep native details/summary sections`);

  const links = hrefs(html);
  for (const route of [`/quiz/grade-k/science/${lowerCode}/worksheet/`, `/quiz/grade-k/science/${lowerCode}/practice/`, `/quiz/grade-k/science/${lowerCode}/test/`]) {
    if (!links.includes(route)) failures.push(`${code}: missing protected journey link ${route}`);
    if (!exists(routeFile(route))) failures.push(`${code}: broken protected journey route ${route}`);
  }
  if (!links.some(href => /^(?:\.\/)?teacher-slides\/$/i.test(href))) failures.push(`${code}: topic page must link to clean local teacher-slides/ viewer`);
  if (links.some(href => /\/teacher-deck\/|\/worksheets\/year2\/science\/teacher-slides\/viewer\//i.test(href))) failures.push(`${code}: topic page must not point Teacher Slides at legacy/shared viewer route`);

  const teacherViewer = path.posix.join(path.posix.dirname(topicFile), 'teacher-slides/index.html');
  if (!exists(teacherViewer)) failures.push(`${code}: missing clean teacher-slides viewer`);
  else {
    const viewer = read(teacherViewer);
    if (!/<meta\b[^>]*name=["']robots["'][^>]*content=["']noindex,\s*follow["']/i.test(viewer)) failures.push(`${code}: teacher-slides viewer must be noindex,follow`);
    if (!viewer.includes(`<link rel="canonical" href="${expectedCanonical}">`)) failures.push(`${code}: teacher-slides viewer must canonicalise to parent topic URL`);
    if (/http-equiv=["']refresh["']|location\.replace\(/i.test(viewer)) failures.push(`${code}: teacher-slides viewer must not be a redirect`);
    if (!(/<img\b[^>]+slide-/i.test(viewer) || /\bdata-slide\b/i.test(viewer)) || !/(?:Previous|data-prev|data-slide-previous|id=["']prev["'])/i.test(viewer) || !/(?:Next|data-next|data-slide-next|id=["']next["'])/i.test(viewer)) failures.push(`${code}: teacher-slides viewer must expose fixed slide pages and navigation`);
    if (/href=["'][^"']+\.(?:pptx|pdf)(?:[?#][^"']*)?["']/i.test(viewer)) failures.push(`${code}: teacher-slides viewer must not expose PPTX/PDF downloads`);
  }
}

const css = read('assets/curriculum.css');
if (!css.includes(`.foundation-science-topic .curriculum-layout`)) failures.push('assets/curriculum.css: missing Foundation Science single-column layout selector');
if (!css.includes(`.foundation-science-topic .curriculum-sidebar`) || !css.includes('{display:none}')) failures.push('assets/curriculum.css: Foundation Science sidebar must be hidden for single-column reading');

if (failures.length) {
  console.error('Foundation Science static topic-page validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('PASS Foundation Science static topic pages: 9/9 single-column, indexable, self-canonical, static and journey-safe.');
