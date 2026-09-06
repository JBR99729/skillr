#!/usr/bin/env node

import { validatePreModuleFlow } from "./validate_pre_module_flow.mjs";

const codes = [
  "AC9M3A01",
  "AC9M3A02",
  "AC9M3A03",
  "AC9M3M01",
  "AC9M3M02",
  "AC9M3M03",
  "AC9M3M04",
  "AC9M3M05",
  "AC9M3M06",
  "AC9M3N01",
  "AC9M3N02",
  "AC9M3N03",
  "AC9M3N04",
  "AC9M3N05",
  "AC9M3N06",
  "AC9M3N07",
  "AC9M3P01",
  "AC9M3P02",
  "AC9M3SP01",
  "AC9M3SP02",
  "AC9M3ST01",
  "AC9M3ST02",
  "AC9M3ST03"
];

validatePreModuleFlow({
  label: "Year 3 Maths",
  codes,
  noteAsset: "quiz/assets/year3-maths-pre-module-notes.js",
  routePrefix: "/quiz/year-3/math",
  expectedQuestionCounts: { practice: 8, test: 12 },
  mobileChecks: [
    {
      code: "AC9M3N01",
      mode: "practice",
      viewport: { width: 375, height: 812, deviceScaleFactor: 1, mobile: true }
    },
    {
      code: "AC9M3ST03",
      mode: "test",
      viewport: { width: 320, height: 568, deviceScaleFactor: 1, mobile: true }
    }
  ]
}).catch((error) => {
  console.error(`FAIL ${error.stack || error.message}`);
  process.exitCode = 1;
});
