#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const write = process.argv.includes('--write');
const plan = JSON.parse(fs.readFileSync(path.join(root, 'data/reviewed-page-titles.json'), 'utf8'));
const decode = value => value.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const escape = value => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
let changed = 0;
const pending = [];
for (const row of plan.pages) {
  const file = path.resolve(root, row.path);
  if (!file.startsWith(root) || !row.path.endsWith('.html')) throw new Error(`Invalid path: ${row.path}`);
  const html = fs.readFileSync(file, 'utf8');
  const head = html.match(/<head\b[^>]*>[\s\S]*?<\/head>/i);
  if (!head) throw new Error(`Missing head: ${row.path}`);
  // Consolidated aliases keep their migration title and canonical destination.
  if (/<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(head[0])
    || /http-equiv=["']refresh["']/i.test(head[0])) continue;
  const title = head[0].match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);
  const current = title && decode(title[1]).trim();
  if (![row.previousTitle, row.title].includes(current)) throw new Error(`Title changed since review: ${row.path}`);
  let next = head[0].replace(title[0], `<title>${escape(row.title)}</title>`);
  next = next.replace(/<meta\b[^>]*>/gi, tag => {
    const attributes = Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(["'])([\s\S]*?)\2/g)].map(m => [m[1].toLowerCase(), decode(m[3])]));
    const key = (attributes.name || attributes.property || '').toLowerCase();
    let value = attributes.content;
    if (['og:title', 'twitter:title'].includes(key)) value = row.title;
    else if (row.previousTopic && ['description', 'og:description', 'twitter:description'].includes(key) && value?.includes(row.previousTopic)) {
      value = value.replace(row.previousTopic, row.topic);
    } else return tag;
    return tag.replace(/\bcontent\s*=\s*(["'])([\s\S]*?)\1/i, `content="${escape(value)}"`);
  });
  const output = html.replace(head[0], () => next);
  if (output !== html) pending.push({ file, output, row });
}
// Validate every reviewed file before making any writes.
for (const { file, output, row } of pending) {
  changed++;
  if (write) fs.writeFileSync(file, output);
  console.log(`${row.path}: ${row.title}`);
}
console.log(`Reviewed page metadata: reviewed=${plan.pages.length} changed=${changed} mode=${write ? 'write' : 'check'}`);
if (!write && changed) process.exitCode = 1;
