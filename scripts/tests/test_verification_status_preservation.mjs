import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

test('verification maintenance uses canonical inventory without restoring archived badges or optional summaries', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'skillr-verification-'));
  try {
    fs.mkdirSync(path.join(dir, 'scripts'));
    fs.copyFileSync(new URL('../update_content_verification_status.mjs', import.meta.url), path.join(dir, 'scripts/status.mjs'));
    for (const name of ['data', 'year1/curriculum/maths']) fs.mkdirSync(path.join(dir, name), { recursive: true });
    const write = (name, data) => fs.writeFileSync(path.join(dir, name), typeof data === 'string' ? data : JSON.stringify(data, null, 2));
    write('data/curriculum-units.json', { units: [{ code: 'AC9M1N01', yearNumber: 1, subjectSlug: 'maths' }] });
    write('data/content-verification-status.json', { reviewedCodes: ['AC9M1N01'] });
    const hub = '<header class="curriculum-hero"><h1>Year 1 Maths</h1></header><a class="new-card">AC9M1N01</a><!-- archived: <a class="curriculum-verified-label">old badge</a> -->';
    write('year1/curriculum/maths/index.html', hub);
    for (const name of ['about.html', 'editorial-standards.html']) write(name, '<p>Current authored information</p>');
    for (const name of ['llms.txt', 'llms-full.txt']) write(name, '# SkillrHub\n\nCurrent authored resource descriptions.\n');
    write('ai-index.json', { foundation_quality_note: { scope: '', review_status: '' }, year1_quality_note: { scope: '', review_status: '' } });
    const run = (...args) => spawnSync(process.execPath, [path.join(dir, 'scripts/status.mjs'), ...args], { cwd: dir, encoding: 'utf8' });
    assert.equal(run().status, 0);
    assert.equal(fs.readFileSync(path.join(dir, 'year1/curriculum/maths/index.html'), 'utf8'), hub);
    assert.equal(fs.readFileSync(path.join(dir, 'llms.txt'), 'utf8'), '# SkillrHub\n\nCurrent authored resource descriptions.\n');
    assert.deepEqual(JSON.parse(fs.readFileSync(path.join(dir, 'ai-index.json'))).content_verification.verified_learning_areas, ['Year 1 Mathematics']);
    assert.equal(run('--check').status, 0);
    write('data/content-verification-status.json', { reviewedCodes: [] });
    assert.equal(run('--check').status, 1);
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
});
