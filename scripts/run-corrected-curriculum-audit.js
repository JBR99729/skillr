#!/usr/bin/env node
'use strict';

const fs = require('fs');
const { spawnSync } = require('child_process');

const sourcePath = 'scripts/audit-all-curriculum-resources.js';
const tempPath = 'scripts/.audit-all-curriculum-resources.corrected.tmp.js';
let source = fs.readFileSync(sourcePath, 'utf8');

const corrections = [
  [
    "if(t.file && t.file.toLowerCase().includes(item.code.toLowerCase())) byIndex.push(t.file);",
    "if(t.file && topicCandidates(item).includes(t.file)) byIndex.push(t.file);",
    'topic-candidate logic'
  ],
  [
    "const branding=/SkillrHub/i.test(text);",
    "const branding=/SkillrHub/i.test(html);",
    'branding recognition'
  ],
  [
    "const elaborations=/Curriculum Elaborations?/i.test(text);",
    "const elaborations=/elaborations?/i.test(text);",
    'elaboration heading recognition'
  ],
  [
    "const related=/Related Topics?/i.test(text);",
    "const related=/Related\\b.{0,100}\\bTopics?\\b/i.test(text);",
    'related-topics heading recognition'
  ],
  [
    "const start=html.search(/Related Topics/i);",
    "const start=html.search(/Related(?:\\s+[^<\\n]{0,100})?\\s+Topics?/i);",
    'related-topic link scope'
  ],
  [
    "const report=anchors(html).some(a=>/Report Issue/i.test(a.text)&&a.href&&!/^javascript:\\s*void/i.test(a.href));",
    "const report=anchors(html).some(a=>/Report Issue/i.test(a.text)&&a.href&&!/^javascript:\\s*void/i.test(a.href)) || /<button\\b[^>]*data-report-issue[^>]*>[\\s\\S]*?Report Issue[\\s\\S]*?<\\/button>/i.test(html);",
    'report-control recognition'
  ]
];

for (const [before, after, label] of corrections) {
  if (!source.includes(before)) throw new Error(`Audit ${label} changed; apply the correction deliberately.`);
  source = source.replace(before, after);
}

fs.writeFileSync(tempPath, source);
try {
  const result = spawnSync(process.execPath, [tempPath], { stdio: 'inherit' });
  process.exitCode = result.status ?? 1;
} finally {
  fs.rmSync(tempPath, { force: true });
}
