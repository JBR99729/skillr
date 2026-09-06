#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const gradeRoots = ['foundation', 'year1', 'year2', 'year3', 'year4', 'year5', 'year6'];
const changed = [];
const errors = [];

function topicPages(root) {
  const scienceRoot = path.join(ROOT, root, 'science');
  if (!fs.existsSync(scienceRoot)) return [];
  return fs.readdirSync(scienceRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && /^ac9/i.test(entry.name))
    .map((entry) => path.join(scienceRoot, entry.name, 'index.html'))
    .filter(fs.existsSync);
}

for (const file of gradeRoots.flatMap(topicPages)) {
  const topicDir = path.dirname(file);
  const deckIndex = path.join(topicDir, 'teacher-slides', 'index.html');
  if (!fs.existsSync(deckIndex)) continue;

  let html = fs.readFileSync(file, 'utf8');
  const before = html;

  // Repair malformed CTA emitted by an older topic-page generator.
  html = html.replace(
    /<a\b[^>]*href=["']teacher-slides\/["'][^>]*rel=["']noOpen Teacher Slides<\/a>/gi,
    '<a class="curriculum-button primary" href="teacher-slides/" rel="noopener">Open Teacher Slides</a>'
  );
  html = html.replace(
    /<a\b[^>]*class=["'][^"']*curriculum-button[^"']*primary[^"']*["'][^>]*href=["']teacher-slides\/["'][\s\S]*?Open Teacher Slides<\/a>/gi,
    '<a class="curriculum-button primary" href="teacher-slides/" rel="noopener">Open Teacher Slides</a>'
  );

  // Retire legacy live/deck routes whenever a fixed per-topic static deck exists.
  html = html.replace(
    /href=["'][^"']*\/teacher-deck\/?(?:index\.html)?(?:\?[^"']*)?["']/gi,
    'href="teacher-slides/"'
  );
  html = html.replace(
    /href=["'][^"']*teacher-slides\/live\.html(?:\?[^"']*)?["']/gi,
    'href="teacher-slides/"'
  );

  if (html !== before) {
    fs.writeFileSync(file, html);
    changed.push(path.relative(ROOT, file).replaceAll('\\', '/'));
  }
}

for (const file of gradeRoots.flatMap(topicPages)) {
  const topicDir = path.dirname(file);
  const deckIndex = path.join(topicDir, 'teacher-slides', 'index.html');
  if (!fs.existsSync(deckIndex)) continue;
  const rel = path.relative(ROOT, file).replaceAll('\\', '/');
  const html = fs.readFileSync(file, 'utf8');

  if (/rel=["']noOpen Teacher Slides/i.test(html)) {
    errors.push(`${rel}: malformed Teacher Slides anchor remains`);
  }
  if (/href=["'][^"']*(?:teacher-deck\/|teacher-slides\/live\.html)/i.test(html)) {
    errors.push(`${rel}: legacy/live Teacher Slides route remains`);
  }

  const hasFixedDeck = /<a\b[^>]*href=["'](?:\.\/)?teacher-slides\/["'][^>]*>/i.test(html);
  const hasStaticPdf = /<a\b[^>]*href=["'][^"']*teacher-slide[^"']*\.pdf(?:\?[^"']*)?["'][^>]*>/i.test(html);
  if (!hasFixedDeck && !hasStaticPdf) {
    errors.push(`${rel}: no static Teacher Slides resource link found`);
  }
}

console.log(`K-6 Science topic pages repaired: ${changed.length}`);
for (const item of changed) console.log(`CHANGED ${item}`);
if (errors.length) {
  for (const error of errors) console.error(`VIOLATION ${error}`);
  process.exit(1);
}
console.log('PASS: K-6 Science Teacher Slides routes are static and valid.');
