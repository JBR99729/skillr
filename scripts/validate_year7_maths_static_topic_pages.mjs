#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const registry = JSON.parse(fs.readFileSync(path.join(root, 'data/curriculum-units.json'), 'utf8')).units
  .filter(unit => unit.yearNumber === 7 && unit.subject === 'Mathematics');
const failures = [];
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const exists = file => fs.existsSync(path.join(root, file));
const routeFile = href => {
  const route = String(href || '').split(/[?#]/, 1)[0].replace(/^\//, '');
  return route.endsWith('/') ? `${route}index.html` : route;
};
const hrefs = html => [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)].map(match => match[1]);

if (registry.length !== 30) failures.push(`Expected 30 active Year 7 Maths units; found ${registry.length}`);

for (const unit of registry) {
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
  if (/id=["'](?:topicRoot|year7Topic)["'][^>]*>\s*(?:<p[^>]*>)?\s*Loading/i.test(html) || /year7-curriculum-render\.js|topic-modules-render|lesson-render/i.test(html)) failures.push(`${unit.code}: topic page must not depend on runtime curriculum rendering`);
  if (!/What students learn|Learning intention|Learning goal|Key concept/i.test(text)) failures.push(`${unit.code}: static teaching content marker missing`);

  const links = hrefs(html);
  const requiredRoutes = [
    `/quiz/year-7/math/${lowerCode}/practice/`,
    `/quiz/year-7/math/${lowerCode}/test/`,
  ];
  for (const route of requiredRoutes) {
    if (!links.includes(route)) failures.push(`${unit.code}: missing protected journey link ${route}`);
    if (!exists(routeFile(route))) failures.push(`${unit.code}: broken protected journey route ${route}`);
  }

  const localSlides = links.find(href => /^(?:\.\/)?teacher-slides\/$/i.test(href));
  if (!localSlides) failures.push(`${unit.code}: topic page must link to clean local teacher-slides/ viewer`);
  const teacherViewer = path.posix.join(path.posix.dirname(topicFile), 'teacher-slides/index.html');
  if (!exists(teacherViewer)) failures.push(`${unit.code}: missing clean teacher-slides viewer`);
  else {
    const viewer = read(teacherViewer);
    if (!/<meta\b[^>]*name=["']robots["'][^>]*content=["']noindex,\s*follow["']/i.test(viewer)) failures.push(`${unit.code}: teacher-slides viewer must be noindex,follow`);
    if (!/<img\b[^>]+slide-/i.test(viewer) || !/Previous/i.test(viewer) || !/Next/i.test(viewer)) failures.push(`${unit.code}: teacher-slides viewer must expose fixed slide pages and navigation`);
    if (/href=["'][^"']+\.(?:pptx|pdf)(?:[?#][^"']*)?["']/i.test(viewer)) failures.push(`${unit.code}: teacher-slides viewer must not expose PPTX/PDF downloads`);
  }
}

const css = read('assets/year7-curriculum.css');
if (!css.includes('.curriculum-page:has(.breadcrumb a[href="/year7/curriculum/maths/"]) .curriculum-layout')) failures.push('assets/year7-curriculum.css: missing Year 7 Maths single-column layout selector');
if (!css.includes(`.curriculum-page:has(.breadcrumb a[href="/year7/curriculum/maths/"]) .curriculum-layout>.curriculum-sidebar`) || !css.includes('{display:none}')) failures.push('assets/year7-curriculum.css: Year 7 Maths sidebar must be hidden for single-column reading');

if (failures.length) {
  console.error('Year 7 Maths static topic-page validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('PASS Year 7 Maths static topic pages: 30/30 single-column, indexable, self-canonical, static and journey-safe.');
