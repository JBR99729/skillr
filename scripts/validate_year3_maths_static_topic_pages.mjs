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
  .filter(unit => unit.yearNumber === 3 && unit.subjectSlug === 'maths')
  .sort((a, b) => a.sourceOrder - b.sourceOrder);

if (units.length !== 23) failures.push(`Expected 23 Year 3 Maths curriculum units; found ${units.length}`);

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
  const legacyStaticSectionPage = code === 'AC9M3M03';

  if (!/<meta\b[^>]*name=["']robots["'][^>]*content=["']index,\s*follow["']/i.test(html)) failures.push(`${code}: topic page must be index,follow`);
  if (!html.includes(`<link rel="canonical" href="${expectedCanonical}">`)) failures.push(`${code}: topic page must self-canonicalise to clean folder URL`);
  if (!/<main\b[^>]*class=["'][^"']*\bcurriculum-layout\b/i.test(html)) failures.push(`${code}: topic page must keep the shared curriculum layout wrapper`);
  if (!/<details\b/i.test(html) && !/<section\b[^>]*class=["'][^"']*\bcurriculum-topic-section\b/i.test(html)) failures.push(`${code}: topic page must keep static teaching sections`);
  if (/id=["'](?:topicRoot|year3Topic)["'][^>]*>\s*(?:<p[^>]*>)?\s*Loading/i.test(html)) failures.push(`${code}: topic page must not depend on runtime curriculum rendering`);
  if (!/What students learn|Learning intention|Learning goal|Key concept|Curriculum coverage|Core idea/i.test(text)) failures.push(`${code}: static teaching content marker missing`);
  if (!legacyStaticSectionPage && !/\/assets\/year3-maths-visuals\.css\?v=\d+/i.test(html)) failures.push(`${code}: missing Year 3 Maths visuals stylesheet`);

  const links = hrefs(html);
  for (const route of [`/quiz/year-3/math/${lowerCode}/worksheet/`, `/quiz/year-3/math/${lowerCode}/practice/`, `/quiz/year-3/math/${lowerCode}/test/`]) {
    if (!links.includes(route)) failures.push(`${code}: missing protected journey link ${route}`);
    if (!exists(routeFile(route))) failures.push(`${code}: broken protected journey route ${route}`);
  }
  if (!links.some(href => /^(?:\.\/)?teacher-slides\/$/i.test(href))) failures.push(`${code}: topic page must link to clean local teacher-slides/ viewer`);
  if (links.some(href => /\/teacher-deck\/|\/worksheets\/year3\/maths\/teacher-slides\/viewer\//i.test(href))) failures.push(`${code}: topic page must not point Teacher Slides at legacy/shared viewer route`);

  const teacherViewer = path.posix.join(path.posix.dirname(topicFile), 'teacher-slides/index.html');
  if (!exists(teacherViewer)) failures.push(`${code}: missing clean teacher-slides viewer`);
  else {
    const viewer = read(teacherViewer);
    if (!/<meta\b[^>]*name=["']robots["'][^>]*content=["']noindex,\s*follow["']/i.test(viewer)) failures.push(`${code}: teacher-slides viewer must be noindex,follow`);
    if (!viewer.includes(`<link rel="canonical" href="${expectedCanonical}">`)) failures.push(`${code}: teacher-slides viewer must canonicalise to parent topic URL`);
    if (!viewer.includes('Teacher Display Page')) failures.push(`${code}: teacher-slides viewer must be the plain HTML Teacher Display Page`);
    if (!viewer.includes('data-single-open')) failures.push(`${code}: teacher display page must use single-open collapsible sections`);
    if (!viewer.includes('class="example-board"') || !viewer.includes('class="example-card"')) failures.push(`${code}: teacher display page must include readable visual example cards`);
    if (/class=["'][^"']*\bexample-icon\b[^"']*["']/i.test(viewer)) failures.push(`${code}: teacher display page must not include generated filler example icons`);
    if (!viewer.includes('skillrhublearning@gmail.com')) failures.push(`${code}: teacher display page must include SkillrHub contact ending`);
    if (/teacher-slide-viewer|fixed-slide-viewer|data-fixed-slide-viewer|data-slide-previous|data-slide-next|data-slide-fullscreen|id=["']prev["']|id=["']next["']|@media\s+print/i.test(viewer)) failures.push(`${code}: teacher display page must not expose legacy slide navigation or print styling`);
    if (/href=["'][^"']+\.(?:pptx|pdf)(?:[?#][^"']*)?["']/i.test(viewer)) failures.push(`${code}: teacher-slides viewer must not expose PPTX/PDF downloads`);
  }
}

const css = read('assets/year3-maths-visuals.css');
if (!css.includes(`.curriculum-page:has(.breadcrumb a[href="/year3/curriculum/maths/"]) .curriculum-layout`)) failures.push('assets/year3-maths-visuals.css: missing Year 3 Maths single-column layout selector');
if (!css.includes(`.curriculum-page:has(.breadcrumb a[href="/year3/curriculum/maths/"]) .curriculum-sidebar`) || !css.includes('{display:none}')) failures.push('assets/year3-maths-visuals.css: Year 3 Maths sidebar must be hidden for single-column reading');

if (failures.length) {
  console.error('Year 3 Maths static topic-page validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('PASS Year 3 Maths static topic pages: 23/23 single-column, indexable, self-canonical, static and journey-safe.');