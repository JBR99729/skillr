#!/usr/bin/env node

import { validatePreModuleFlow } from "./validate_pre_module_flow.mjs";

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

validatePreModuleFlow({
  label: "Year 4 Science",
  codes,
  noteAsset: "quiz/assets/year4-science-pre-module-notes.js",
  routePrefix: "/quiz/year-4/science",
  expectedQuestionCounts: { practice: 8, test: 12 },
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
