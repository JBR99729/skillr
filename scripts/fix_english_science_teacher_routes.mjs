#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const subjects = new Set(['english','science']);
const changed = [];
const migrated = [];
const repairedTopics = [];
const unresolved = [];

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

const allFiles = walk(ROOT);
const curriculumFiles = allFiles.filter((file) => /(?:^|\/)curriculum\/(english|science)\/index\.html$/i.test(file.replaceAll('\\','/')));
const topicFiles = allFiles.filter((file) => /(?:^|\/)(?:foundation|year\d+)\/(english|science)\/ac9[^/]+\/index\.html$/i.test(file.replaceAll('\\','/')));

for (const file of curriculumFiles) {
  const rel = path.relative(ROOT, file).replaceAll('\\','/');
  const subjectMatch = rel.match(/curriculum\/(english|science)\/index\.html$/i);
  if (!subjectMatch || !subjects.has(subjectMatch[1].toLowerCase())) continue;
  let html = fs.readFileSync(file, 'utf8');
  const before = html;

  html = html.replace(/<article\b[\s\S]*?<\/article>/gi, (card) => {
    const topic = card.match(/href=["'](\/(?:foundation|year\d+)\/(english|science)\/[^"']+\/)["'][^>]*>\s*Topic\s*guide/i);
    if (!topic) return card;
    const topicHref = topic[1];
    const viewerFile = path.join(ROOT, topicHref.replace(/^\//,''), 'teacher-slides', 'index.html');
    const legacy = /href=["'][^"']*teacher-slides\/(?:live\.html|teacher-deck\/index\.html)(?:\?[^"']*)?["']/i;
    if (!legacy.test(card)) return card;
    if (!fs.existsSync(viewerFile)) {
      unresolved.push(`${rel} -> ${topicHref}teacher-slides/`);
      return card;
    }
    migrated.push(`${rel} -> ${topicHref}teacher-slides/`);
    return card.replace(/href=["'][^"']*teacher-slides\/(?:live\.html|teacher-deck\/index\.html)(?:\?[^"']*)?["']/gi, `href="${topicHref}teacher-slides/"`);
  });

  if (html !== before) {
    fs.writeFileSync(file, html);
    changed.push(rel);
  }
}

for (const file of topicFiles) {
  const rel = path.relative(ROOT, file).replaceAll('\\','/');
  const deckFile = path.join(path.dirname(file), 'teacher-slides', 'index.html');
  if (!fs.existsSync(deckFile)) continue;
  let html = fs.readFileSync(file, 'utf8');
  const before = html;

  // Historical generator bug produced: rel="noOpen Teacher Slides</a>
  html = html.replace(
    /<a\b[^>]*class=["'][^"']*curriculum-button[^"']*primary[^"']*["'][^>]*href=["']teacher-slides\/["'][\s\S]*?Open Teacher Slides<\/a>/gi,
    '<a class="curriculum-button primary" href="teacher-slides/" rel="noopener">Open Teacher Slides</a>'
  );
  html = html.replace(
    /<a\b[^>]*href=["']teacher-slides\/["'][^>]*rel=["']noOpen Teacher Slides<\/a>/gi,
    '<a class="curriculum-button primary" href="teacher-slides/" rel="noopener">Open Teacher Slides</a>'
  );

  // If a fixed per-topic deck now exists, retire old live/teacher-deck topic routes.
  html = html.replace(
    /href=["'](?:\/[^"']+)?\/teacher-deck\/?(?:index\.html)?(?:\?[^"']*)?["']/gi,
    'href="teacher-slides/"'
  );
  html = html.replace(
    /href=["'][^"']*teacher-slides\/live\.html(?:\?[^"']*)?["']/gi,
    'href="teacher-slides/"'
  );

  if (html !== before) {
    fs.writeFileSync(file, html);
    repairedTopics.push(rel);
    changed.push(rel);
  }
}

console.log(`English/Science curriculum indexes scanned: ${curriculumFiles.length}`);
console.log(`English/Science topic pages scanned: ${topicFiles.length}`);
console.log(`Legacy routes migrated to fixed viewers: ${migrated.length}`);
console.log(`Topic Teacher Slides links repaired: ${repairedTopics.length}`);
console.log(`Files changed: ${changed.length}`);
for (const item of changed) console.log(`CHANGED ${item}`);
if (unresolved.length) {
  console.log(`Legacy routes without fixed topic viewer: ${unresolved.length}`);
  for (const item of unresolved) console.log(`NEEDS_MIGRATION ${item}`);
}

let violations = 0;
for (const file of curriculumFiles) {
  const rel = path.relative(ROOT, file).replaceAll('\\','/');
  const html = fs.readFileSync(file, 'utf8');
  for (const card of html.match(/<article\b[\s\S]*?<\/article>/gi) || []) {
    const topic = card.match(/href=["'](\/(?:foundation|year\d+)\/(english|science)\/[^"']+\/)["'][^>]*>\s*Topic\s*guide/i);
    if (!topic) continue;
    const viewerFile = path.join(ROOT, topic[1].replace(/^\//,''), 'teacher-slides', 'index.html');
    if (fs.existsSync(viewerFile) && /teacher-slides\/(?:live\.html|teacher-deck\/index\.html)/i.test(card)) {
      console.error(`VIOLATION ${rel}: fixed viewer exists but legacy teacher-slide route remains for ${topic[1]}`);
      violations++;
    }
  }
}

for (const file of topicFiles) {
  const rel = path.relative(ROOT, file).replaceAll('\\','/');
  const deckFile = path.join(path.dirname(file), 'teacher-slides', 'index.html');
  if (!fs.existsSync(deckFile)) continue;
  const html = fs.readFileSync(file, 'utf8');
  if (/rel=["']noOpen Teacher Slides/i.test(html)) {
    console.error(`VIOLATION ${rel}: malformed Teacher Slides anchor remains`);
    violations++;
  }
  if (/href=["'][^"']*(?:teacher-deck\/|teacher-slides\/live\.html)/i.test(html)) {
    console.error(`VIOLATION ${rel}: legacy/live Teacher Slides route remains despite fixed deck`);
    violations++;
  }
  const hasFixedDeckLink = /<a\b[^>]*href=["'](?:\.\/)?teacher-slides\/["'][^>]*>/i.test(html);
  const hasStaticPdfLink = /<a\b[^>]*href=["'][^"']*teacher-slide[^"']*\.pdf(?:\?[^"']*)?["'][^>]*>/i.test(html);
  if (!hasFixedDeckLink && !hasStaticPdfLink) {
    console.error(`VIOLATION ${rel}: fixed deck exists but no static Teacher Slides resource link was found`);
    violations++;
  }
}

if (violations) process.exit(1);
