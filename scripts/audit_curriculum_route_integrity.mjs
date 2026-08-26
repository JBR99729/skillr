#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const YEAR_ROOTS = ['foundation', ...Array.from({ length: 10 }, (_, i) => `year${i + 1}`)];
const SUBJECTS = ['maths', 'science', 'english'];
const LOCAL_HOSTS = new Set(['skillrhub.com', 'www.skillrhub.com']);
const failures = [];
const checked = new Set();
let sourcePages = 0;
let localLinks = 0;

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function rel(file) {
  return path.relative(ROOT, file).split(path.sep).join('/');
}

function anchors(html) {
  return [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>/gi)].map((match) => match[1]);
}

function cleanHref(raw) {
  const href = String(raw || '').trim().replace(/&amp;/g, '&');
  if (!href || href.startsWith('#') || /^(?:mailto|tel|javascript|data|blob):/i.test(href)) return null;
  if (/\$\{|\{\{|\}\}/.test(href)) return null;

  try {
    if (/^https?:\/\//i.test(href) || /^\/\//.test(href)) {
      const url = new URL(href.startsWith('//') ? `https:${href}` : href);
      if (!LOCAL_HOSTS.has(url.hostname.toLowerCase())) return null;
      return decodeURIComponent(url.pathname || '/');
    }
  } catch {
    return null;
  }

  const noFragment = href.split('#', 1)[0];
  const noQuery = noFragment.split('?', 1)[0];
  if (!noQuery) return null;
  try {
    return decodeURIComponent(noQuery);
  } catch {
    return noQuery;
  }
}

function resolveTarget(sourceFile, rawHref) {
  const href = cleanHref(rawHref);
  if (!href) return null;

  const absolute = href.startsWith('/')
    ? path.resolve(ROOT, `.${href}`)
    : path.resolve(path.dirname(sourceFile), href);

  const relative = rel(absolute);
  if (relative.startsWith('../') || relative === '..') return null;

  // This guard is intentionally about curriculum/resource routes, not every
  // marketing or utility link on the site.
  if (!/^(?:foundation|year\d+|quiz|worksheets)\//i.test(relative)) return null;

  return { absolute, relative };
}

function candidateFiles(target) {
  if (fs.existsSync(target)) {
    const stat = fs.statSync(target);
    if (stat.isFile()) return [target];
    if (stat.isDirectory()) return [path.join(target, 'index.html')];
  }
  if (!path.extname(target)) return [`${target}.html`, path.join(target, 'index.html')];
  return [target];
}

function existsAsRoute(target) {
  return candidateFiles(target).some((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
}

function checkPage(file) {
  if (!fs.existsSync(file)) return;
  sourcePages++;
  const html = fs.readFileSync(file, 'utf8');
  for (const rawHref of anchors(html)) {
    const target = resolveTarget(file, rawHref);
    if (!target) continue;
    localLinks++;
    const key = `${rel(file)}\n${target.relative}`;
    if (checked.has(key)) continue;
    checked.add(key);
    if (!existsAsRoute(target.absolute)) {
      failures.push({ source: rel(file), href: rawHref, resolved: target.relative });
    }
  }
}

for (const year of YEAR_ROOTS) {
  for (const subject of SUBJECTS) {
    checkPage(path.join(ROOT, year, 'curriculum', subject, 'index.html'));

    const subjectRoot = path.join(ROOT, year, subject);
    for (const file of walk(subjectRoot)) {
      if (!file.endsWith(`${path.sep}index.html`)) continue;
      const parts = rel(file).split('/');
      if (parts.length !== 4 || parts[0] !== year || parts[1] !== subject) continue;
      checkPage(file);
    }
  }
}

console.log('Curriculum route integrity audit');
console.log(`Source pages checked: ${sourcePages}`);
console.log(`Curriculum/resource links checked: ${localLinks}`);
console.log(`Missing local targets: ${failures.length}`);

for (const failure of failures) {
  console.error(`- ${failure.source}: ${failure.href} -> ${failure.resolved}`);
}

if (failures.length) {
  console.error('\nROUTE INTEGRITY FAILURE: one or more curriculum/resource links point to a missing local target.');
  console.error('Do not rename or regenerate a curriculum slug without updating every inbound link (or preserving the old route).');
  process.exit(1);
}
