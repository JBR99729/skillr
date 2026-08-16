#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const subjects = new Set(['english','science']);
const changed = [];
const migrated = [];
const unresolved = [];

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

const files = walk(ROOT).filter((file) => /(?:^|\/)curriculum\/(english|science)\/index\.html$/i.test(file.replaceAll('\\','/')));

for (const file of files) {
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

console.log(`English/Science curriculum indexes scanned: ${files.length}`);
console.log(`Legacy routes migrated to fixed viewers: ${migrated.length}`);
console.log(`Indexes changed: ${changed.length}`);
for (const item of changed) console.log(`CHANGED ${item}`);
if (unresolved.length) {
  console.log(`Legacy routes without fixed topic viewer: ${unresolved.length}`);
  for (const item of unresolved) console.log(`NEEDS_MIGRATION ${item}`);
}

// Guard: once a fixed topic viewer exists, curriculum indexes must not link to a legacy shared host.
let violations = 0;
for (const file of files) {
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
if (violations) process.exit(1);
