#!/usr/bin/env node
import { execSync } from 'node:child_process';
import fs from 'node:fs';

const base = process.env.GITHUB_BASE_REF ? `origin/${process.env.GITHUB_BASE_REF}` : 'HEAD~1';
let changed = [];
try {
  changed = execSync(`git diff --name-only ${base}...HEAD`, { encoding: 'utf8' }).split(/\r?\n/).filter(Boolean);
} catch {
  changed = execSync('git diff --name-only HEAD~1 HEAD', { encoding: 'utf8' }).split(/\r?\n/).filter(Boolean);
}

const topicPath = /^(foundation|year(?:[1-9]|10))\/(maths|science|english)\/[^/]+\/index\.html$/;
const teacherViewerPath = /(?:\/teacher-deck\/index\.html$|\/teacher-slides\/live\.html$|\/teacher-slides\/index\.html$|\/teacher-slides\/[^/]+\/index\.html$)/;
const errors = [];
const publicDownload = /href=["'][^"']+\.(?:pptx|pdf)(?:[?#][^"']*)?["']/i;
const runtimeDeck = /(?:teachingSlides|\.slides\.forEach|render.*slide|lower-materials-render|year\d+.*slides\.js|topic-modules-render|lesson-render)/i;

for (const file of changed) {
  if (!fs.existsSync(file)) continue;
  if (topicPath.test(file)) {
    const html = fs.readFileSync(file, 'utf8');
    if (!/<details\b/i.test(html) || !/<summary\b/i.test(html)) errors.push(`${file}: migrated topic pages must use native <details>/<summary> sections`);
    if (/id=["'](?:topicRoot|year\d+Topic|slideRoot)["'][^>]*>\s*(?:<p[^>]*>)?\s*Loading/i.test(html)) errors.push(`${file}: curriculum teaching content cannot be a runtime Loading shell`);
    if (/(?:year\d+-(?:maths|science|english)-(?:render|topic)|topic-modules-render|lesson-render|lower-materials-render|foundation-.*render)\.js/i.test(html)) errors.push(`${file}: canonical topic teaching content must not depend on a curriculum renderer`);
    const text = html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '');
    if (!/What students learn|Key concept|Learning intention|Learning goal/i.test(text)) errors.push(`${file}: static teaching content appears to be missing`);
    if (publicDownload.test(html)) errors.push(`${file}: Teacher Slides must not expose direct PPTX/PDF download links`);
    if (!/href=["'][^"']*(?:teacher-deck|teacher-slides)[^"']*\/(?:[?#][^"']*)?["']/i.test(html)) errors.push(`${file}: migrated topic page must link to a fixed page-by-page Teacher Slides viewer`);
  }

  if (teacherViewerPath.test(file)) {
    const html = fs.readFileSync(file, 'utf8');
    if (runtimeDeck.test(html)) errors.push(`${file}: Teacher Slides viewer must not assemble curriculum slides at runtime`);
    if (publicDownload.test(html) || /download\s*=|download\s+(?:pptx|pdf)/i.test(html)) errors.push(`${file}: Teacher Slides viewer must not expose PPTX/PDF download controls`);
    if (!/<img\b[^>]*(?:slide|teacher)/i.test(html) && !/data-slide-(?:src|image)/i.test(html)) errors.push(`${file}: Teacher Slides viewer must present pre-rendered fixed slide pages/images`);
    if (!/(?:Previous|Next|aria-label=["']Next slide|data-next-slide)/i.test(html)) errors.push(`${file}: Teacher Slides viewer must support page-by-page navigation`);
  }
}

const year7RouterPath = 'assets/year7-router.js';
if (fs.existsSync(year7RouterPath)) {
  const router = fs.readFileSync(year7RouterPath, 'utf8');
  if (/year7-curriculum-render\.js/i.test(router)) {
    errors.push(`${year7RouterPath}: canonical Year 7 topic pages must not load a curriculum-content renderer`);
  }
}

if (errors.length) {
  console.error('Static Curriculum Architecture v2 validation failed:\n');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`Static Curriculum Architecture v2: PASS (${changed.length} changed files inspected)`);
