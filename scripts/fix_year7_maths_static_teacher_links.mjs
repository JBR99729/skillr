#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = path.join(process.cwd(), 'year7', 'maths');
const dirs = fs.readdirSync(root, { withFileTypes:true }).filter((entry) => entry.isDirectory() && /^ac9m7/i.test(entry.name));
let changed = 0;
const errors = [];

for (const entry of dirs) {
  const dir = path.join(root, entry.name);
  const file = path.join(dir, 'index.html');
  if (!fs.existsSync(file)) continue;
  let html = fs.readFileSync(file, 'utf8');
  let teacher = '';
  if (fs.existsSync(path.join(dir, 'teacher-deck', 'index.html'))) teacher = 'teacher-deck/';
  else if (fs.existsSync(path.join(dir, 'teacher-slides', 'index.html'))) teacher = 'teacher-slides/';
  else {
    errors.push(`${entry.name}: no local fixed Teacher Slides viewer`);
    continue;
  }

  const before = html;
  html = html.replace(/<a href="[^"]*">Teacher Slides<\/a>/, `<a href="${teacher}">Teacher Slides</a>`);
  if (!html.includes(`<a href="${teacher}">Teacher Slides</a>`)) errors.push(`${entry.name}: Teacher Slides link was not updated`);
  if (/href=["'][^"']+\.(?:pptx|pdf)(?:[?#][^"']*)?["']/i.test(html)) errors.push(`${entry.name}: direct PPTX/PDF link remains`);
  if (before !== html) {
    fs.writeFileSync(file, html);
    changed += 1;
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Updated ${changed} Year 7 Maths pages to local fixed Teacher Slides viewers.`);
