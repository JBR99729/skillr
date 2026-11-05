import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const script = fileURLToPath(new URL('../inject_static_breadcrumb_schema.mjs', import.meta.url));
test('breadcrumb checks preserve valid strands and unrelated resource schemas', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'skillr-crumbs-'));
  try {
    for (const route of ['', 'year1', 'year1/curriculum/maths', 'year1/maths/ac9m1n01-numbers']) {
      fs.mkdirSync(path.join(dir, route), { recursive: true });
      fs.writeFileSync(path.join(dir, route, 'index.html'), '<html><head></head><body></body></html>');
    }
    const urls = ['/', '/year1/', '/year1/curriculum/maths/', '/year1/curriculum/maths/#number', '/year1/maths/ac9m1n01-numbers/'];
    const schema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: urls.map((url, i) => ({ '@type': 'ListItem', position: i + 1, name: `Step ${i + 1}`, item: 'https://skillrhub.com' + url })) };
    const resource = '<script type="application/ld+json">{"@context":"https://schema.org","@type":"LearningResource","name":"Keep this authored resource"}</script>';
    const topic = path.join(dir, 'year1/maths/ac9m1n01-numbers/index.html');
    const html = `<html><head><title>AC9M1N01</title>${resource}<script type="application/ld+json">${JSON.stringify(schema)}</script></head><body><h1>Numbers</h1></body></html>`;
    fs.writeFileSync(topic, html);
    // The subject hub is also eligible, so initialise its missing breadcrumb.
    assert.equal(spawnSync(process.execPath, [script], { cwd: dir }).status, 0);
    assert.equal(fs.readFileSync(topic, 'utf8'), html);
    assert.equal(spawnSync(process.execPath, [script, '--check'], { cwd: dir }).status, 0);
    fs.writeFileSync(topic, html.replace(JSON.stringify(schema), JSON.stringify({ ...schema, itemListElement: schema.itemListElement.map((item, i) => ({ ...item, position: i + 2 })) })));
    assert.equal(spawnSync(process.execPath, [script, '--check'], { cwd: dir }).status, 1);
    assert.equal(spawnSync(process.execPath, [script], { cwd: dir }).status, 0);
    assert.ok(fs.readFileSync(topic, 'utf8').includes(resource));
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
});
