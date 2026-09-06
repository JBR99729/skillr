#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.cwd());
const yearFolders = ['foundation', ...Array.from({length:10}, (_, i) => `year${i + 1}`)];
const subjects = ['maths', 'science', 'english'];
const issues = [];
let cards = 0;
let pages = 0;

const decode = (text) => text
  .replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'")
  .replace(/<[^>]+>/g, '')
  .replace(/\s+/g, ' ')
  .trim();

function add(file, code, title, problem) {
  issues.push({ file: path.relative(root, file), code, title, problem });
}

for (const year of yearFolders) {
  for (const subject of subjects) {
    const file = path.join(root, year, 'curriculum', subject, 'index.html');
    if (!fs.existsSync(file)) continue;
    pages += 1;
    const html = fs.readFileSync(file, 'utf8');
    const cardRe = /<article class="curriculum-unit-card"[\s\S]*?<span class="curriculum-badge">([^<]+)<\/span>[\s\S]*?<h3>([\s\S]*?)<\/h3>[\s\S]*?<\/article>/g;
    for (const match of html.matchAll(cardRe)) {
      cards += 1;
      const code = decode(match[1]);
      const title = decode(match[2]);
      if (!title) add(file, code, title, 'empty title');
      if (/\\(?:frac|sqrt|times|div|cdot|leq|geq|theta|pi|text)\b/i.test(title)) add(file, code, title, 'raw LaTeX/math command');
      if (/\.{3}|…/.test(title)) add(file, code, title, 'truncated/ellipsis title');
      if (/<|>|\{\}|\[object Object\]|undefined|null/i.test(title)) add(file, code, title, 'HTML/code artefact');
      if (/^(?:and|or|with|using|including|involving|that|which)\b/i.test(title)) add(file, code, title, 'awkward leading connector');
      if (title.length > 190) add(file, code, title, `excessively long title (${title.length} chars)`);
    }
  }
}

console.log(JSON.stringify({ pagesChecked: pages, cardsChecked: cards, issues }, null, 2));
if (issues.length) process.exitCode = 1;
