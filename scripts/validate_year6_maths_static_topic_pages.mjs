#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const failures = [];
const topicFiles = fs.readdirSync(path.join(root, 'year6/maths'), {withFileTypes: true})
  .filter(entry => entry.isDirectory() && /^ac9m6/i.test(entry.name))
  .map(entry => `year6/maths/${entry.name}/index.html`)
  .filter(file => fs.existsSync(path.join(root, file)))
  .sort();
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const exists = file => fs.existsSync(path.join(root, file));
const routeFile = href => {
  const route = String(href || '').split(/[?#]/, 1)[0].replace(/^\//, '');
  return route.endsWith('/') ? `${route}index.html` : route;
};
const hrefs = html => [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)].map(match => match[1]);

if (topicFiles.length !== 24) failures.push(`Expected 24 Year 6 Maths topic pages; found ${topicFiles.length}`);

for (const topicFile of topicFiles) {
  const html = read(topicFile);
  const code = path.basename(path.dirname(topicFile)).split('-')[0].toUpperCase();
  const lowerCode = code.toLowerCase();
  const expectedCanonical = `https://skillrhub.com/${path.dirname(topicFile)}/`;
  const text = html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '');

  if (!/<meta\b[^>]*name=["']robots["'][^>]*content=["']index,\s*follow["']/i.test(html)) failures.push(`${code}: topic page must be index,follow`);
  if (!html.includes(`<link rel="canonical" href="${expectedCanonical}">`)) failures.push(`${code}: topic page must self-canonicalise to clean folder URL`);
  if (!/<main\b[^>]*class=["'][^"']*\b(?:curriculum-layout|static-topic-grid)\b/i.test(html)) failures.push(`${code}: topic page must keep the shared static layout wrapper`);
  if (!/<details\b/i.test(html) || !/<summary\b/i.test(html)) failures.push(`${code}: topic page must keep native details/summary teaching sections`);
  if (/id=["'](?:topicRoot|year6Topic)["'][^>]*>\s*(?:<p[^>]*>)?\s*Loading/i.test(html) || /year6-curriculum-render\.js|topic-modules-render|lesson-render/i.test(html)) failures.push(`${code}: topic page must not depend on runtime curriculum rendering`);
  if (!/What students learn|Learning intention|Learning goal|Key concept|Curriculum coverage/i.test(text)) failures.push(`${code}: static teaching content marker missing`);

  const links = hrefs(html);
  for (const route of [`/quiz/year-6/math/${lowerCode}/practice/`, `/quiz/year-6/math/${lowerCode}/test/`]) {
    if (!links.includes(route)) failures.push(`${code}: missing protected journey link ${route}`);
    if (!exists(routeFile(route))) failures.push(`${code}: broken protected journey route ${route}`);
  }
  if (!links.some(href => /^(?:\.\/)?teacher-slides\/$/i.test(href))) failures.push(`${code}: topic page must link to clean local teacher-slides/ viewer`);
  if (links.some(href => /\/worksheets\/year6\/maths\/teacher-slides\/viewer\//i.test(href))) failures.push(`${code}: topic page must not point Teacher Slides at shared viewer route`);

  const teacherViewer = path.posix.join(path.posix.dirname(topicFile), 'teacher-slides/index.html');
  if (!exists(teacherViewer)) failures.push(`${code}: missing clean teacher-slides viewer`);
  else {
    const viewer = read(teacherViewer);
    if (!/<meta\b[^>]*name=["']robots["'][^>]*content=["']noindex,\s*follow["']/i.test(viewer)) failures.push(`${code}: teacher-slides viewer must be noindex,follow`);
    if (!/Teacher Display Page/i.test(viewer) || !/data-single-open/i.test(viewer)) failures.push(`${code}: teacher-slides viewer must use the Year 4-style static Teacher Display Page`);
    if (/href=["'][^"']+\.(?:pptx|pdf)(?:[?#][^"']*)?["']/i.test(viewer)) failures.push(`${code}: teacher-slides viewer must not expose PPTX/PDF downloads`);
  }
}

const css = read('assets/year6-curriculum.css');
if (!css.includes(`.static-topic-page:has(.breadcrumb a[href="/year6/curriculum/maths/"]) .static-topic-grid`)) failures.push('assets/year6-curriculum.css: missing Year 6 Maths single-column layout selector');
if (!css.includes(`.static-topic-page:has(.breadcrumb a[href="/year6/curriculum/maths/"]) .static-topic-sidebar`) || !css.includes('{display:none}')) failures.push('assets/year6-curriculum.css: Year 6 Maths sidebar must be hidden for single-column reading');

if (failures.length) {
  console.error('Year 6 Maths static topic-page validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('PASS Year 6 Maths static topic pages: 24/24 single-column, indexable, self-canonical, static and journey-safe.');
