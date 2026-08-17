#!/usr/bin/env node
'use strict';

const fs = require('fs');
const { spawnSync } = require('child_process');

const sourcePath = 'scripts/audit-all-curriculum-resources.js';
const tempPath = 'scripts/.audit-all-curriculum-resources.corrected.tmp.js';
let source = fs.readFileSync(sourcePath, 'utf8');

const broadIndexedCandidate = "if(t.file && t.file.toLowerCase().includes(item.code.toLowerCase())) byIndex.push(t.file);";
const topicOnlyCandidate = "if(t.file && topicCandidates(item).includes(t.file)) byIndex.push(t.file);";
if (!source.includes(broadIndexedCandidate)) throw new Error('Audit topic-candidate logic changed; apply the correction deliberately.');
source = source.replace(broadIndexedCandidate, topicOnlyCandidate);

const anchorOnlyReport = "const report=anchors(html).some(a=>/Report Issue/i.test(a.text)&&a.href&&!/^javascript:\\s*void/i.test(a.href));";
const reportControl = "const report=anchors(html).some(a=>/Report Issue/i.test(a.text)&&a.href&&!/^javascript:\\s*void/i.test(a.href)) || /<button\\b[^>]*data-report-issue[^>]*>[\\s\\S]*?Report Issue[\\s\\S]*?<\\/button>/i.test(html);";
if (!source.includes(anchorOnlyReport)) throw new Error('Audit report-control logic changed; apply the correction deliberately.');
source = source.replace(anchorOnlyReport, reportControl);

fs.writeFileSync(tempPath, source);
try {
  const result = spawnSync(process.execPath, [tempPath], { stdio: 'inherit' });
  process.exitCode = result.status ?? 1;
} finally {
  fs.rmSync(tempPath, { force: true });
}
