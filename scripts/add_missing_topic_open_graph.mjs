#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const YEAR_DIRECTORIES = fs.readdirSync(ROOT).filter((name) => /^year\d+$/.test(name));
const SUBJECTS = ['maths', 'english', 'science'];

const match = (html, pattern, label, file) => {
  const value = html.match(pattern)?.[1];
  if (!value) throw new Error(`${file}: missing ${label}`);
  return value;
};

const files = [];
for (const year of YEAR_DIRECTORIES) {
  for (const subject of SUBJECTS) {
    const directory = path.join(ROOT, year, subject);
    if (!fs.existsSync(directory)) continue;
    for (const slug of fs.readdirSync(directory)) {
      const file = path.join(directory, slug, 'index.html');
      if (fs.existsSync(file)) files.push(file);
    }
  }
}

let updated = 0;
let skipped = 0;
for (const file of files) {
  let html = fs.readFileSync(file, 'utf8');
  const robots = html.match(/<meta\s+name=["']robots["']\s+content=["']([^"']*)/i)?.[1] || '';
  if (/\bnoindex\b/i.test(robots) || !/\bindex\b/i.test(robots)) {
    skipped += 1;
    continue;
  }
  html = html.replaceAll('&amp;amp;#x27;', '&#x27;');
  if (/<meta\s+property=["']og:title["']/i.test(html)) {
    fs.writeFileSync(file, html);
    skipped += 1;
    continue;
  }
  const title = match(html, /<title[^>]*>([\s\S]*?)<\/title>/i, 'title', file);
  const description = match(html, /<meta\s+name=["']description["']\s+content=["']([^"']*)/i, 'description', file);
  const canonical = match(html, /<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)/i, 'canonical URL', file);
  const tags = [
    `<meta property="og:title" content="${title}">`,
    `<meta property="og:description" content="${description}">`,
    `<meta property="og:url" content="${canonical}">`,
    '<meta property="og:type" content="website">',
    '<meta property="og:locale" content="en_AU">',
  ].join('');
  html = html.replace(/<\/head>/i, `${tags}</head>`);
  fs.writeFileSync(file, html);
  updated += 1;
}

console.log(`Open Graph metadata: ${updated} topic pages updated; ${skipped} skipped.`);
