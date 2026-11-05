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
const hrefs = html => [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)]
  .map(match => match[1].replaceAll('&amp;', '&'));
const appBanks = new Map(JSON.parse(read('data/app-question-banks.json')).codes
  .map(bank => [bank.code, bank]));

const units = JSON.parse(read('data/curriculum-units.json')).units
  .filter(unit => unit.yearNumber === 2 && unit.subjectSlug === 'maths')
  .sort((a, b) => a.sourceOrder - b.sourceOrder);

if (units.length !== 18) failures.push(`Expected 18 Year 2 Maths curriculum units; found ${units.length}`);

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
  const text = html.replace(/<!--[\s\S]*?-->|<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, '');

  if (!/<meta\b[^>]*name=["']robots["'][^>]*content=["']index,\s*follow["']/i.test(html)) failures.push(`${code}: topic page must be index,follow`);
  if (!html.includes(`<link rel="canonical" href="${expectedCanonical}">`)) failures.push(`${code}: topic page must self-canonicalise to clean folder URL`);
  if (!/<main\b[^>]*class=["'][^"']*\bcurriculum-layout\b/i.test(html)) failures.push(`${code}: topic page must keep the shared curriculum layout wrapper`);
  if (!/<details\b/i.test(html) && !/<section\b[^>]*class=["'][^"']*\bcurriculum-topic-section\b/i.test(html)) failures.push(`${code}: topic page must keep static teaching sections`);
  if (/id=["'](?:topicRoot|year2Topic)["'][^>]*>\s*(?:<p[^>]*>)?\s*Loading/i.test(html)) failures.push(`${code}: topic page must not depend on runtime curriculum rendering`);
  if (!/What students learn|Learning intention|Learning goal|Key concept|Curriculum coverage|Core idea/i.test(text)) failures.push(`${code}: static teaching content marker missing`);

  const links = hrefs(text);
  const worksheet = `/quiz/year-2/math/${lowerCode}/worksheet/`;
  if (!links.includes(worksheet) || !exists(routeFile(worksheet))) failures.push(`${code}: missing or broken free worksheet`);
  const bank = appBanks.get(code);
  if (!bank) failures.push(`${code}: missing app availability record`);
  const practice = `https://app.skillrhub.com/?${bank?.guestPractice ? 'try' : 'login'}=1&skill=${code}`;
  const assessment = `https://app.skillrhub.com/?assessment=${code}`;
  const floating = [...text.matchAll(/<a\b[^>]*\bdata-floating-practice=["']([^"']+)["'][^>]*>/gi)];
  if (bank?.practice) {
    if (floating.length !== 1 || floating[0][1] !== code || hrefs(floating[0][0])[0] !== practice) {
      failures.push(`${code}: expected one floating Practice link to ${practice}`);
    }
  } else if (floating.length || links.includes(practice)) {
    failures.push(`${code}: links to unavailable app practice`);
  }
  if (Boolean(bank?.assessment) !== links.includes(assessment)) failures.push(`${code}: assessment link does not match app availability`);
  if (links.some(href => new RegExp(`^/quiz/year-2/math/${lowerCode}/(?:practice|test)/`).test(href))) {
    failures.push(`${code}: topic links to a retired quiz or test route`);
  }
  if (!links.some(href => /^(?:\.\/)?teacher-slides\/$/i.test(href))) failures.push(`${code}: topic page must link to clean local teacher-slides/ viewer`);
  if (links.some(href => /\/teacher-deck\/|\/worksheets\/year2\/maths\/teacher-slides\/viewer\//i.test(href))) failures.push(`${code}: topic page must not point Teacher Slides at legacy/shared viewer route`);

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

const compatibilityFile = 'year2/maths/addition-substraction-daily/index.html';
if (exists(compatibilityFile)) {
  const html = read(compatibilityFile);
  if (!/<meta\b[^>]*name=["']robots["'][^>]*content=["']noindex,\s*follow["']/i.test(html)) failures.push(`${compatibilityFile}: compatibility/practice page must remain noindex,follow`);
  if (!html.includes('<link rel="canonical" href="https://app.skillrhub.com/">') || !hrefs(html).includes('https://app.skillrhub.com/')) {
    failures.push(`${compatibilityFile}: retired daily-practice page must point to the app`);
  }
}

const css = read('assets/curriculum.css');
if (!css.includes(`.curriculum-page:has(.breadcrumb a[href="/year2/curriculum/maths/"]) .curriculum-layout`)) failures.push('assets/curriculum.css: missing Year 2 Maths single-column layout selector');
if (!css.includes(`.curriculum-page:has(.breadcrumb a[href="/year2/curriculum/maths/"]) .curriculum-sidebar`) || !css.includes('{display:none}')) failures.push('assets/curriculum.css: Year 2 Maths sidebar must be hidden for single-column reading');

if (failures.length) {
  console.error('Year 2 Maths static topic-page validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('PASS Year 2 Maths static topic pages: 18/18 single-column, indexable, self-canonical, static and journey-safe; compatibility page stays noindex.');
