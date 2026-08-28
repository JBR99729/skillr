#!/usr/bin/env node
import fs from 'node:fs';

const errors = [];
const read = file => fs.readFileSync(file, 'utf8');

const pwaPath = 'pwa-register.js';
const pwa = read(pwaPath);
if (!/STATIC_CURRICULUM_TOPIC_GUARD/.test(pwa)) {
  errors.push(`${pwaPath}: missing locked static-topic guard`);
}
if (!/isCanonicalCurriculumTopic/.test(pwa) || !/foundation\|year/.test(pwa)) {
  errors.push(`${pwaPath}: canonical Foundation-Year 10 topic detection is missing`);
}
if (!/pwa-register-legacy\.js/.test(pwa)) {
  errors.push(`${pwaPath}: shared non-curriculum PWA utilities must remain delegated to the internal legacy utility asset`);
}
if (!/blockedCurriculumAsset/.test(pwa) || !/curriculum-visual-layer/.test(pwa) || !/year\(\?:\[1-9\]\|10\)-/.test(pwa)) {
  errors.push(`${pwaPath}: canonical topic pages are not protected from dynamic curriculum asset loading`);
}
if (!pwa.includes('normaliseTeacherSlideLinks') || !pwa.includes('teacher-slides') || !pwa.includes('target.pathname += "index.html"')) {
  errors.push(`${pwaPath}: canonical topic Teacher Slides links must resolve to the concrete static index.html viewer file`);
}

const legacyPwaPath = 'assets/pwa-register-legacy.js';
const legacyPwa = read(legacyPwaPath);
if (!/ac9e2la0\[1-3\]\\\/quiz/.test(legacyPwa)) {
  errors.push(`${legacyPwaPath}: delegated Year 2 LA01-03 Quiz loader route is missing`);
}

const visualPath = 'assets/curriculum-visual-layer.js';
const visual = read(visualPath);
if (!/STATIC_CURRICULUM_TOPIC_GUARD/.test(visual)) {
  errors.push(`${visualPath}: missing locked static-topic guard`);
}
if (!/const topicMatch\s*=/.test(visual) || !/if\s*\(topicMatch\)\s*return\s*;/.test(visual)) {
  errors.push(`${visualPath}: canonical topic pages must exit before any visual/data renderer can run`);
}
if (!/curriculum-visual-layer-interactive\.js/.test(visual)) {
  errors.push(`${visualPath}: interactive-resource implementation must remain separated from canonical topic pages`);
}

for (const required of [legacyPwaPath, 'assets/curriculum-visual-layer-interactive.js']) {
  if (!fs.existsSync(required)) errors.push(`${required}: required internal interactive utility asset is missing`);
}

if (errors.length) {
  console.error('Static topic loader guard validation failed:\n');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Static topic loader guards: PASS (canonical F-10 topic pages stay static and Teacher Slides resolve to fixed index.html viewers).');
