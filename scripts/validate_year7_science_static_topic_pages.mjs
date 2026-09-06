#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const units = JSON.parse(fs.readFileSync(path.join(root, 'data/curriculum-units.json'), 'utf8')).units
  .filter(unit => unit.yearNumber === 7 && unit.subject === 'Science');
const failures = [];
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const exists = file => fs.existsSync(path.join(root, file));
const routeFile = href => {
  const route = String(href || '').split(/[?#]/, 1)[0].replace(/^\//, '');
  return route.endsWith('/') ? `${route}index.html` : route;
};
const hrefs = html => [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)].map(match => match[1]);

if (units.length !== 18) failures.push(`Expected 18 active Year 7 Science units; found ${units.length}`);

for (const unit of units) {
  const topicFile = routeFile(unit.url);
  if (!exists(topicFile)) {
    failures.push(`${unit.code}: missing topic page ${topicFile}`);
    continue;
  }

  const html = read(topicFile);
  const text = html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '');
  const expectedCanonical = `https://skillrhub.com${unit.url}`;
  const lowerCode = unit.code.toLowerCase();

  if (!/<meta\b[^>]*name=["']robots["'][^>]*content=["']index,\s*follow["']/i.test(html)) failures.push(`${unit.code}: topic page must be index,follow`);
  if (!html.includes(`<link rel="canonical" href="${expectedCanonical}">`)) failures.push(`${unit.code}: topic page must self-canonicalise to clean folder URL`);
  if (!/<main\b[^>]*class=["'][^"']*\bcurriculum-layout\b/i.test(html)) failures.push(`${unit.code}: topic page must keep the shared curriculum layout wrapper`);
  if (!/<details\b/i.test(html) || !/<summary\b/i.test(html)) failures.push(`${unit.code}: topic page must keep native details/summary teaching sections`);
  if (!html.includes(`science-premium-layer:${unit.code}`)) failures.push(`${unit.code}: missing premium static layer marker`);
  if (!/\/assets\/year7-science-premium\.css\?v=\d+/i.test(html)) failures.push(`${unit.code}: missing Year 7 Science premium stylesheet`);
  if (/id=["'](?:topicRoot|year7Topic)["'][^>]*>\s*(?:<p[^>]*>)?\s*Loading/i.test(html) || /year7-curriculum-render\.js|topic-modules-render|lesson-render/i.test(html)) failures.push(`${unit.code}: topic page must not depend on runtime curriculum rendering`);
  if (!/Key concept|Core idea|Worked example|Common misconception|Exam tip|Retrieval question/i.test(text)) failures.push(`${unit.code}: static teaching content marker missing`);

  const links = hrefs(html);
  for (const route of [`/quiz/year-7/science/${lowerCode}/practice/`, `/quiz/year-7/science/${lowerCode}/test/`]) {
    if (!links.includes(route)) failures.push(`${unit.code}: missing protected journey link ${route}`);
    if (!exists(routeFile(route))) failures.push(`${unit.code}: broken protected journey route ${route}`);
  }

  if (!links.some(href => /^(?:\.\/)?teacher-slides\/$/i.test(href))) failures.push(`${unit.code}: topic page must link to clean local teacher-slides/ viewer`);
  const teacherViewer = path.posix.join(path.posix.dirname(topicFile), 'teacher-slides/index.html');
  if (!exists(teacherViewer)) failures.push(`${unit.code}: missing clean teacher-slides viewer`);
  else {
    const viewer = read(teacherViewer);
    if (!/<meta\b[^>]*name=["']robots["'][^>]*content=["']noindex,\s*follow["']/i.test(viewer)) failures.push(`${unit.code}: teacher-slides viewer must be noindex,follow`);
    if (!/Teacher Display Page/i.test(viewer) || !/data-single-open/i.test(viewer)) failures.push(`${unit.code}: teacher-slides viewer must use the Year 4-style static Teacher Display Page`);
    if (/href=["'][^"']+\.(?:pptx|pdf)(?:[?#][^"']*)?["']/i.test(viewer)) failures.push(`${unit.code}: teacher-slides viewer must not expose PPTX/PDF downloads`);
  }
}

const css = read('assets/year7-curriculum.css');
if (!css.includes('.curriculum-page:has(.breadcrumb a[href="/year7/curriculum/science/"]) .curriculum-layout')) failures.push('assets/year7-curriculum.css: missing Year 7 Science single-column layout selector');
if (!/\.curriculum-page:has\(\.breadcrumb a\[href="\/year7\/curriculum\/science\/"\]\) \.curriculum-layout>\.curriculum-sidebar\{display:none\}/.test(css)) failures.push('assets/year7-curriculum.css: Year 7 Science sidebar must be hidden for single-column reading');

if (failures.length) {
  console.error('Year 7 Science static topic-page validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('PASS Year 7 Science static topic pages: 18/18 single-column, indexable, self-canonical, static and journey-safe.');
