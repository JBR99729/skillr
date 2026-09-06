#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const YEAR_ROOTS = ['foundation', ...Array.from({ length: 10 }, (_, i) => `year${i + 1}`)];
const errors = [];
let staticDecks = 0;
let redirectShims = 0;

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

function fail(file, message) {
  errors.push(`${rel(file)}: ${message}`);
}

function hasTeacherDisplayPage(html) {
  const legacy = /data-single-open/i.test(html) && /(?:Clean visual examples|Worked examples)/i.test(html);
  const topicFirst = /name=["']lesson["']/i.test(html)
    && /id=["']curriculum-mapping["']/i.test(html)
    && /\/assets\/css\/classroom-view\.css/i.test(html)
    && /We do/i.test(html);
  return /Teacher Display Page/i.test(html)
    && (legacy || topicFirst)
    && /<details\b/i.test(html)
    && /<summary\b/i.test(html)
    && !/class=["'][^"']*\bexample-icon\b[^"']*["']/i.test(html)
    && /skillrhublearning@gmail\.com/i.test(html);
}

function inspectStaticDeck(file, html) {
  if (runtimePatterns.some((pattern) => pattern.test(html))) fail(file, 'Teacher Slides must be fixed/static and must not assemble curriculum slide content at runtime');
  const displayPage = hasTeacherDisplayPage(html);
  const hasFixedPages = displayPage || /data-slide\b/i.test(html) || /<img\b[^>]*(?:slide|teacher)/i.test(html) || /<svg\b/i.test(html) || /<(?:section|article|div)\b[^>]*class=["'][^"']*\bslide\b/i.test(html);
  if (!hasFixedPages) fail(file, 'static Teacher Slides host must contain fixed slide pages, images or SVG content');
  const hasNavigation = /data-slide-(?:previous|next)|\bPrevious\b|\bNext\b/i.test(html);
  if (!displayPage && !hasNavigation) fail(file, 'static Teacher Slides host must provide page-by-page navigation');
}

function inspectStaticRedirect(file, html) {
  const candidates = [...html.matchAll(/<(?:a|link)\b[^>]*href=["']([^"']*\/teacher-(?:slides|deck)\/[^"']*)["']/gi)].map((match) => match[1]);
  const target = candidates.find((candidate) => candidate.startsWith('/'))
    || html.match(/url\s*=\s*([^"'\s>]*\/teacher-(?:slides|deck)\/[^"'\s>]*)/i)?.[1];
  if (!target || !target.startsWith('/')) return false;
  const localTarget = path.join(ROOT, target.replace(/^\//, ''), 'index.html');
  if (!fs.existsSync(localTarget)) {
    fail(file, 'Teacher Slides redirect must target an existing fixed local deck');
    return true;
  }
  inspectStaticDeck(localTarget, fs.readFileSync(localTarget, 'utf8'));
  return true;
}

function isTeacherHtml(file) {
  const p = rel(file);
  return /\/teacher-(?:slides|deck)\/.*\.html$/i.test(p) || /\/teacher-(?:slides|deck)\/index\.html$/i.test(p);
}

const runtimePatterns = [
  /\brenderSlides\s*\(/i,
  /\bteachingSlides\b/i,
  /\.slides\.forEach\s*\(/i,
  /foundation-[^"']*render\.js/i,
  /year\d+[^"']*slides\.js/i,
  /lower-materials-render\.js/i,
  /topic-modules-render\.js/i,
  /lesson-render\.js/i,
];

for (const year of YEAR_ROOTS) {
  for (const file of walk(path.join(ROOT, year))) {
    if (!file.endsWith('.html') || !isTeacherHtml(file)) continue;
    const html = fs.readFileSync(file, 'utf8');
    const p = rel(file);

    if (/\/teacher-slides\/live\.html$/i.test(p)) {
      redirectShims++;
      if (!/location\.(?:replace|assign)\s*\(/i.test(html)) fail(file, 'legacy live.html is permitted only as a redirect shim to a static deck');
      if (runtimePatterns.some((pattern) => pattern.test(html))) fail(file, 'redirect shim must not assemble or render slide content');
      continue;
    }

    if (inspectStaticRedirect(file, html)) {
      redirectShims++;
      continue;
    }
    staticDecks++;
    inspectStaticDeck(file, html);
  }
}

for (const file of walk(path.join(ROOT, 'assets'))) {
  if (!/\.(?:js|mjs)$/i.test(file)) continue;
  const source = fs.readFileSync(file, 'utf8');
  if (/teacher-slides\/live\.html\?code=/i.test(source)) fail(file, 'runtime code must not route teacher resources through a legacy live renderer path; link directly to the static deck');
}

if (errors.length) {
  console.error('Static Teacher Slides architecture audit failed:\n');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Static Teacher Slides architecture: PASS`);
console.log(`Static decks checked: ${staticDecks}`);
console.log(`Redirect-only compatibility shims: ${redirectShims}`);
