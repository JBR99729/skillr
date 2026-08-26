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
  .filter(unit => unit.yearNumber === 1 && unit.subjectSlug === 'maths')
  .sort((a, b) => a.sourceOrder - b.sourceOrder);

if (units.length !== 15) failures.push(`Expected 15 Year 1 Maths curriculum units; found ${units.length}`);

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
  if (!/<main\b[^>]*class=["'][^"']*\bcurriculum-layout\b/i.test(html)) failures.push(`${code}: topic page must keep the shared curriculum layout wrapper`);
  if (!/<details\b/i.test(html) && !/<section\b[^>]*class=["'][^"']*\bcurriculum-topic-section\b/i.test(html)) failures.push(`${code}: topic page must keep static teaching sections`);
  if (/id=["'](?:topicRoot|year2Topic)["'][^>]*>\s*(?:<p[^>]*>)?\s*Loading/i.test(html)) failures.push(`${code}: topic page must not depend on runtime curriculum rendering`);
  if (!/What students learn|Learning intention|Learning goal|Key concept|Curriculum coverage|Core idea/i.test(text)) failures.push(`${code}: static teaching content marker missing`);

  const links = hrefs(html);
  for (const route of [`/quiz/year-1/math/${lowerCode}/worksheet/`, `/quiz/year-1/math/${lowerCode}/practice/`, `/quiz/year-1/math/${lowerCode}/test/`]) {
    if (!links.includes(route)) failures.push(`${code}: missing protected journey link ${route}`);
    if (!exists(routeFile(route))) failures.push(`${code}: broken protected journey route ${route}`);
  }
  if (!links.some(href => /^(?:\.\/)?teacher-slides\/$/i.test(href))) failures.push(`${code}: topic page must link to clean local teacher-slides/ viewer`);
  if (links.some(href => /\/teacher-deck\/|\/worksheets\/year1\/maths\/teacher-slides\/viewer\//i.test(href))) failures.push(`${code}: topic page must not point Teacher Slides at legacy/shared viewer route`);

  const teacherViewer = path.posix.join(path.posix.dirname(topicFile), 'teacher-slides/index.html');
  if (!exists(teacherViewer)) failures.push(`${code}: missing clean teacher-slides viewer`);
  else {
    const viewer = read(teacherViewer);
    if (!/<meta\b[^>]*name=["']robots["'][^>]*content=["']noindex,\s*follow["']/i.test(viewer)) failures.push(`${code}: teacher-slides viewer must be noindex,follow`);
    if (!viewer.includes(`<link rel="canonical" href="${expectedCanonical}">`)) failures.push(`${code}: teacher-slides viewer must canonicalise to parent topic URL`);
    if (!(/<img\b[^>]+slide-/i.test(viewer) || /\bdata-slide\b/i.test(viewer)) || !/(?:Previous|data-prev|data-slide-previous|id=["']prev["'])/i.test(viewer) || !/(?:Next|data-next|data-slide-next|id=["']next["'])/i.test(viewer)) failures.push(`${code}: teacher-slides viewer must expose fixed slide pages and navigation`);
    if (/href=["'][^"']+\.(?:pptx|pdf)(?:[?#][^"']*)?["']/i.test(viewer)) failures.push(`${code}: teacher-slides viewer must not expose PPTX/PDF downloads`);
  }
}

const css = read('assets/curriculum.css');
if (!css.includes(`.curriculum-page:has(.breadcrumb a[href="/year1/curriculum/maths/"]) .curriculum-layout`)) failures.push('assets/curriculum.css: missing Year 1 Maths single-column layout selector');
if (!css.includes(`.curriculum-page:has(.breadcrumb a[href="/year1/curriculum/maths/"]) .curriculum-sidebar`) || !css.includes('{display:none}')) failures.push('assets/curriculum.css: Year 1 Maths sidebar must be hidden for single-column reading');

if (failures.length) {
  console.error('Year 1 Maths static topic-page validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('PASS Year 1 Maths static topic pages: 15/15 single-column, indexable, self-canonical, static and journey-safe.');
