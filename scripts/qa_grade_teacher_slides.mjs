#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const args = Object.fromEntries(process.argv.slice(2).map((arg) => {
  const [key, ...rest] = arg.replace(/^--/, '').split('=');
  return [key, rest.join('=') || true];
}));

const grade = String(args.grade || '').toLowerCase();
const subject = String(args.subject || '').toLowerCase();
if (!/^(foundation|year(?:[1-9]|10))$/.test(grade) || !/^(maths|science|english)$/.test(subject)) {
  console.error('Usage: node scripts/qa_grade_teacher_slides.mjs --grade=year2 --subject=science');
  process.exit(2);
}

const gradeRoot = path.join(ROOT, grade, subject);
if (!fs.existsSync(gradeRoot)) {
  console.error(`Missing grade/subject root: ${grade}/${subject}`);
  process.exit(2);
}

const errors = [];
const notes = [];
const topicDirs = fs.readdirSync(gradeRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && /^ac9/i.test(entry.name))
  .map((entry) => path.join(gradeRoot, entry.name))
  .sort();

const read = (file) => fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
const rel = (file) => path.relative(ROOT, file).replaceAll('\\', '/');

for (const topicDir of topicDirs) {
  const topicPage = path.join(topicDir, 'index.html');
  const deckPage = path.join(topicDir, 'teacher-slides', 'index.html');
  const topicHtml = read(topicPage);
  const deckHtml = read(deckPage);

  if (!topicHtml) {
    errors.push(`${rel(topicPage)}: missing topic page`);
    continue;
  }
  if (!deckHtml) {
    errors.push(`${rel(deckPage)}: missing static teacher deck`);
    continue;
  }

  // Regression: malformed Teacher Slides anchors previously produced scattered/broken pages.
  if (/rel=["']noOpen Teacher Slides/i.test(topicHtml) || /<a\b[^>]*href=["'][^"']*teacher-slides\/["'][^>]*[^>]Open Teacher Slides<\/a>/i.test(topicHtml)) {
    errors.push(`${rel(topicPage)}: malformed Teacher Slides anchor`);
  }
  if (!/href=["'](?:\.\/)?teacher-slides\/["'][^>]*>\s*(?:Open\s+)?Teacher Slides?\s*<\/a>/i.test(topicHtml)) {
    errors.push(`${rel(topicPage)}: no valid direct Teacher Slides link to the static deck`);
  }
  if (/teacher-slides\/live\.html|teacher-deck\/index\.html/i.test(topicHtml)) {
    errors.push(`${rel(topicPage)}: legacy/dynamic Teacher Slides route remains`);
  }

  const slideCount = (deckHtml.match(/\bdata-slide\b/g) || []).length;
  if (slideCount < 5) {
    errors.push(`${rel(deckPage)}: expected at least 5 fixed slides, found ${slideCount}`);
  }
  if (/\bteachingSlides\b|\.slides\.forEach|renderSlides\s*\(|slideRoot|teacher-slides\/live\.html/i.test(deckHtml)) {
    errors.push(`${rel(deckPage)}: runtime or legacy slide assembly detected`);
  }
  if (!/teacher-slide-viewer\.js/i.test(deckHtml)) {
    notes.push(`${rel(deckPage)}: no shared lightweight viewer script (navigation may be inline)`);
  }
}

// Step Up regression: any progression target into this completed grade should go directly to its static teacher deck.
const progressionFiles = [
  path.join(ROOT, 'assets', 'teacher-slide-viewer.js'),
  path.join(ROOT, 'assets', 'curriculum-progression.js'),
].filter(fs.existsSync);
const gradePrefix = `/${grade}/${subject}/`;
for (const file of progressionFiles) {
  const src = read(file);
  const targetRegex = /\bup\s*:\s*["']([^"']+)["']/g;
  for (const match of src.matchAll(targetRegex)) {
    const target = match[1];
    if (!target.startsWith(gradePrefix)) continue;
    const local = path.join(ROOT, target.replace(/^\//, '').replace(/\?.*$/, ''));
    const deckTarget = target.endsWith('/teacher-slides/') ? local : path.join(local, 'teacher-slides');
    const deckIndex = path.join(deckTarget, 'index.html');
    if (fs.existsSync(deckIndex) && !target.endsWith('/teacher-slides/')) {
      errors.push(`${rel(file)}: Step Up target ${target} bypasses an existing static teacher deck; use ${target.replace(/\/$/, '')}/teacher-slides/`);
    }
  }
}

console.log(`Grade Teacher Slides regression: ${grade}/${subject}`);
console.log(`Topic codes checked: ${topicDirs.length}`);
console.log(`Errors: ${errors.length}`);
for (const error of errors) console.error(`- ${error}`);
for (const note of notes) console.log(`NOTE ${note}`);
if (errors.length) process.exit(1);
console.log('PASS: static decks, valid Teacher Slides links, and Step Up routing are clean.');
