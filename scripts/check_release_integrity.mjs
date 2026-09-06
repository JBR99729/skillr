#!/usr/bin/env node
import { execFileSync } from 'node:child_process';

// Compare complete Git trees, never a changed-files list.
const [base, candidate] = process.argv.slice(2);
if (!base || !candidate) {
  console.error('Usage: node scripts/check_release_integrity.mjs BASE CANDIDATE');
  process.exit(2);
}
const git = (...args) => execFileSync('git', args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
const files = ref => new Set(git('ls-tree', '-r', '--name-only', ref).trim().split('\n'));
const before = files(base), after = files(candidate);
const deleted = [...before].filter(path => !after.has(path));
const critical = ['index.html', 'CNAME', '.nojekyll', '404.html', 'AGENTS.md', 'sitemap.xml', 'robots.txt'];
const missing = critical.filter(path => !after.has(path));
const failures = [];
if (deleted.length) failures.push(`Unexpected deletions (${deleted.length}):\n${deleted.slice(0, 30).join('\n')}`);
if (missing.length) failures.push(`Missing core files: ${missing.join(', ')}`);
if (after.has('CNAME') && git('show', `${candidate}:CNAME`).trim() !== 'skillrhub.com') failures.push('Custom domain changed.');
if (failures.length) {
  console.error(`RELEASE BLOCKED\n${failures.join('\n')}\nRestore omitted files. Intentional deletions require a separately reviewed maintenance change.`);
  process.exit(1);
}
console.log(`Release integrity passed: ${before.size} → ${after.size} files; no deletions; core files and domain preserved.`);
