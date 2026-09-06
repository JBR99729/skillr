#!/usr/bin/env node

import { validatePreModuleFlow } from "./validate_pre_module_flow.mjs";

const codes = [
  "AC9MFA01",
  "AC9MFM01",
  "AC9MFM02",
  "AC9MFN01",
  "AC9MFN02",
  "AC9MFN03",
  "AC9MFN04",
  "AC9MFN05",
  "AC9MFN06",
  "AC9MFSP01",
  "AC9MFSP02",
  "AC9MFST01"
];

validatePreModuleFlow({
  label: "Foundation Maths",
  codes,
  noteAsset: "quiz/assets/foundation-maths-pre-module-notes.js",
  routePrefix: "/quiz/grade-k/math",
  expectedQuestionCounts: { practice: 8, test: 12 },
  mobileChecks: [
    {
      code: "AC9MFN01",
      mode: "practice",
      viewport: { width: 375, height: 812, deviceScaleFactor: 1, mobile: true }
    },
    {
      code: "AC9MFST01",
      mode: "test",
      viewport: { width: 320, height: 568, deviceScaleFactor: 1, mobile: true }
    }
  ]
}).catch((error) => {
  console.error(`FAIL ${error.stack || error.message}`);
  process.exitCode = 1;
});
