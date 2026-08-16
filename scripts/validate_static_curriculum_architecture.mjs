#!/usr/bin/env node
import { execSync } from 'node:child_process';
import fs from 'node:fs';

const base = process.env.GITHUB_BASE_REF ? `origin/${process.env.GITHUB_BASE_REF}` : 'HEAD~1';
let changed = [];
try {
  changed = execSync(`git diff --name-only ${base}...HEAD`, { encoding: 'utf8' })
    .split(/\r?\n/).filter(Boolean);
} catch {
  changed = execSync('git diff --name-only HEAD~1 HEAD', { encoding: 'utf8' })
    .split(/\r?\n/).filter(Boolean);
}

const topicPath = /^(foundation|year(?:[1-9]|10))\/(maths|science|english)\/[^/]+\/index\.html$/;
const teacherDeckPath = /\/teacher-deck\/index\.html$/;
const errors = [];

for (const file of changed) {
  if (!fs.existsSync(file)) continue;
  if (topicPath.test(file)) {
    const html = fs.readFileSync(file, 'utf8');
    if (!/<details\b/i.test(html) || !/<summary\b/i.test(html)) {
      errors.push(`${file}: migrated topic pages must use native <details>/<summary> sections`);
    }
    if (/id=["'](?:topicRoot|year\d+Topic|slideRoot)["'][^>]*>\s*(?:<p[^>]*>)?\s*Loading/i.test(html)) {
      errors.push(`${file}: curriculum teaching content cannot be a runtime Loading shell`);
    }
    if (/(?:year\d+-(?:maths|science|english)-(?:render|topic)|topic-modules-render|lesson-render)\.js/i.test(html)) {
      errors.push(`${file}: canonical topic teaching content must not depend on a curriculum renderer`);
    }
    const text = html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '');
    if (!/What students learn|Key concept|Learning intention|Learning goal/i.test(text)) {
      errors.push(`${file}: static teaching content appears to be missing`);
    }
  }

  if (teacherDeckPath.test(file)) {
    const html = fs.readFileSync(file, 'utf8');
    if (/(?:slideRoot|deck)["']?[^>]*>\s*<\/|teachingSlides|\.slides\.forEach|render.*slide/i.test(html)) {
      errors.push(`${file}: new/modified teacher-deck HTML must not assemble curriculum slides at runtime; link/embed a fixed PDF instead`);
    }
  }
}

if (errors.length) {
  console.error('Static Curriculum Architecture v2 validation failed:\n');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Static Curriculum Architecture v2: PASS (${changed.length} changed files inspected)`);
