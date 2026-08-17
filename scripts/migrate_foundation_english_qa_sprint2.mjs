#!/usr/bin/env node
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';

const source = 'scripts/migrate_foundation_english_static.mjs';
const temp = 'scripts/.migrate_foundation_english_qa_sprint2.tmp.mjs';
const first12 = "const QA_SPRINT_1 = new Set(['AC9EFLA01','AC9EFLA02','AC9EFLA03','AC9EFLA04','AC9EFLA05','AC9EFLA06','AC9EFLA07','AC9EFLA08','AC9EFLA09','AC9EFLE01','AC9EFLE02','AC9EFLE03']);";
const first24 = "const QA_SPRINT_1 = new Set(['AC9EFLA01','AC9EFLA02','AC9EFLA03','AC9EFLA04','AC9EFLA05','AC9EFLA06','AC9EFLA07','AC9EFLA08','AC9EFLA09','AC9EFLE01','AC9EFLE02','AC9EFLE03','AC9EFLE04','AC9EFLE05','AC9EFLY01','AC9EFLY02','AC9EFLY03','AC9EFLY04','AC9EFLY05','AC9EFLY06','AC9EFLY07','AC9EFLY08','AC9EFLY09','AC9EFLY10']);";

const original = fs.readFileSync(source, 'utf8');
if (!original.includes(first12)) throw new Error('Foundation English QA sprint marker changed; update sprint-2 wrapper deliberately.');
fs.writeFileSync(temp, original.replace(first12, first24));
try {
  const run = spawnSync(process.execPath, [temp], { stdio: 'inherit' });
  if (run.status !== 0) process.exit(run.status ?? 1);
} finally {
  fs.rmSync(temp, { force: true });
}
