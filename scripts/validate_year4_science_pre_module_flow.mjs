#!/usr/bin/env node

import { validatePreModuleFlow } from "./validate_pre_module_flow.mjs";
import fs from 'node:fs';
import path from 'node:path';
import { validateRetiredActivity } from './lib/published_activity_navigation.mjs';

const codes = [
  "AC9S4H01",
  "AC9S4H02",
  "AC9S4I01",
  "AC9S4I02",
  "AC9S4I03",
  "AC9S4I04",
  "AC9S4I05",
  "AC9S4I06",
  "AC9S4U01",
  "AC9S4U02",
  "AC9S4U03",
  "AC9S4U04"
];

const root = path.resolve(import.meta.dirname, '..');
const launches = codes.flatMap(code => ['practice', 'test'].map(mode => ({
  code, mode, html: fs.readFileSync(path.join(root, `quiz/year-4/science/${code.toLowerCase()}/${mode}/index.html`), 'utf8')
})));
const retired = launches.filter(launch => /data-legacy-quiz-retired=/.test(launch.html));
if (retired.length) {
  if (retired.length !== launches.length) throw new Error('Mixed active/retired Year 4 Science launches require an explicit flow review');
  const errors = retired.flatMap(launch => validateRetiredActivity(launch.html, launch.code, root));
  if (errors.length) throw new Error(errors.join('\n'));
  console.log(`PASS: all ${retired.length} retired Practice/Test routes retain exact published redirects, HTML fallbacks, noindex and no legacy player. No old-player browser or app submission test is claimed.`);
} else validatePreModuleFlow({
  label: "Year 4 Science",
  codes,
  noteAsset: "quiz/assets/year4-science-pre-module-notes.js",
  routePrefix: "/quiz/year-4/science",
  expectedQuestionCounts: { practice: 5, test: 5 },
  expectedQuestionCycle: false,
  mobileChecks: [
    {
      code: "AC9S4H01",
      mode: "practice",
      viewport: { width: 375, height: 812, deviceScaleFactor: 1, mobile: true }
    },
    {
      code: "AC9S4U04",
      mode: "test",
      viewport: { width: 320, height: 568, deviceScaleFactor: 1, mobile: true }
    }
  ]
}).catch((error) => {
  console.error(`FAIL ${error.stack || error.message}`);
  process.exitCode = 1;
});
