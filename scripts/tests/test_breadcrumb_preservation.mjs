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
    for (const route of ['', 'learn', 'year1', 'year1/curriculum/maths', 'year1/maths/ac9m1n01-numbers']) {
      fs.mkdirSync(path.join(dir, route), { recursive: true });
      fs.writeFileSync(path.join(dir, route, 'index.html'), '<html><head></head><body></body></html>');
    }
    const urls = ['/', '/year1/', '/year1/curriculum/maths/', '/year1/curriculum/maths/#number', '/year1/maths/ac9m1n01-numbers/'];
    const schema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: urls.map((url, i) => ({ '@type': 'ListItem', position: i + 1, name: `Step ${i + 1}`, item: 'https://skillrhub.com' + url })) };
    const resource = '<script type="application/ld+json">{"@context":"https://schema.org","@type":"LearningResource","name":"Keep this authored resource"}</script>';
    const topic = path.join(dir, 'year1/maths/ac9m1n01-numbers/index.html');
    const html = `<html><head><title>AC9M1N01</title>${resource}<script type="application/ld+json">${JSON.stringify(schema)}</script></head><body><main><nav aria-label="Breadcrumb"><a href="/year1/">Year 1</a><a href="/year1/curriculum/maths/">Maths</a></nav><h1>Numbers</h1></main></body></html>`;
    fs.writeFileSync(topic, html);
    // The subject hub is also eligible, so initialise its missing breadcrumb.
    assert.equal(spawnSync(process.execPath, [script], { cwd: dir }).status, 0);
    const migrated = fs.readFileSync(topic, 'utf8');
    assert.ok(migrated.includes(resource));
    assert.ok(migrated.includes('href="/learn/?year=1&amp;subject=maths"'));
    const updated = JSON.parse(migrated.match(/<script type="application\/ld\+json">({"@context":"https:\/\/schema.org","@type":"BreadcrumbList"[\s\S]*?)<\/script>/)[1]);
    assert.deepEqual(updated.itemListElement.map(item => item.item), [
      'https://skillrhub.com/',
      'https://skillrhub.com/learn/?year=1',
      'https://skillrhub.com/learn/?year=1&subject=maths',
      'https://skillrhub.com/learn/?year=1&subject=maths#number',
      'https://skillrhub.com/year1/maths/ac9m1n01-numbers/',
    ]);
    assert.equal(spawnSync(process.execPath, [script, '--check'], { cwd: dir }).status, 0);
    fs.writeFileSync(topic, html.replace(JSON.stringify(schema), JSON.stringify({ ...schema, itemListElement: schema.itemListElement.map((item, i) => ({ ...item, position: i + 2 })) })));
    assert.equal(spawnSync(process.execPath, [script, '--check'], { cwd: dir }).status, 1);
    assert.equal(spawnSync(process.execPath, [script], { cwd: dir }).status, 0);
    assert.ok(fs.readFileSync(topic, 'utf8').includes(resource));
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
});

test('all years and subjects return to Learn in static HTML and nested breadcrumb metadata', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'skillr-crumb-routes-'));
  try {
    fs.mkdirSync(path.join(dir, 'learn'), { recursive: true });
    fs.writeFileSync(path.join(dir, 'learn/index.html'), '<html></html>');
    fs.writeFileSync(path.join(dir, 'index.html'), '<html></html>');
    const fixtures = [];
    for (let year = 0; year <= 10; year += 1) {
      for (const subject of ['maths', 'science', 'english']) {
        const folder = year === 0 ? 'foundation' : `year${year}`;
        const route = `/${folder}/${subject}/example/`;
        const hubFile = path.join(dir, folder, 'curriculum', subject, 'index.html');
        fs.mkdirSync(path.dirname(hubFile), { recursive: true });
        fs.writeFileSync(hubFile, `<html><head><title>Subject hub</title></head><body><main><nav class="hub-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><a href="/${folder}/">Year</a><span aria-current="page">${subject}</span></nav></main></body></html>`);
        const url = `https://skillrhub.com${route}`;
        const items = ['/', `/${folder}/`, `/${folder}/curriculum/${subject}/`, route];
        const graph = { '@graph': [
          { '@type': 'LearningResource', name: 'Preserve this exact lesson' },
          { '@type': 'BreadcrumbList', itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: `Step ${i}`, item: { '@id': 'https://skillrhub.com' + item } })) },
        ] };
        const crumb = subject === 'english' ? '' : subject === 'science' ? '<nav aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li aria-current="page">Current topic</li></ol></nav>' : `<nav class="crumb"><a href="https://skillrhub.com/${folder}/">Year</a><a href="/${folder}/curriculum/${subject}/">Subject</a></nav>`;
        const file = path.join(dir, route, 'index.html');
        fs.mkdirSync(path.dirname(file), { recursive: true });
        fs.writeFileSync(file, `<html><head><title>Example</title><script type="application/ld+json">${JSON.stringify(graph)}</script></head><body><main>${crumb}<h1>Keep all teaching content</h1></main></body></html>`);
        fixtures.push({ file, year, subject, url });
      }
    }
    const legacy = path.join(dir, 'foundation/maths/legacy-topic.html');
    fs.writeFileSync(legacy, '<html><head><title>AC9MFN01</title></head><body><main><nav class="breadcrumb"><a href="../../">Home</a><a href="../">Foundation</a><a href="./">Maths</a></nav><h1>Legacy lesson</h1></main></body></html>');
    const excluded = path.join(dir, 'foundation/maths/retired.html');
    const excludedHtml = '<html><head><meta name="robots" content="noindex,follow"></head><body>Retired route</body></html>';
    fs.writeFileSync(excluded, excludedHtml);
    assert.equal(spawnSync(process.execPath, [script, '--check'], { cwd: dir }).status, 1);
    const migration = spawnSync(process.execPath, [script], { cwd: dir, encoding: 'utf8' });
    assert.equal(migration.status, 0, migration.stdout + migration.stderr);
    for (const { file, year, subject, url } of fixtures) {
      const html = fs.readFileSync(file, 'utf8');
      assert.ok(html.includes(`href="/learn/?year=${year}&amp;subject=${subject}"`), file);
      assert.ok(html.includes('<h1>Keep all teaching content</h1>'));
      const data = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
      assert.equal(data['@graph'][0].name, 'Preserve this exact lesson');
      const items = data['@graph'][1].itemListElement;
      assert.equal(items[2].item['@id'], `https://skillrhub.com/learn/?year=${year}&subject=${subject}`);
      assert.equal(items.at(-1).item['@id'], url);
      const folder = year === 0 ? 'foundation' : `year${year}`;
      const hubHtml = fs.readFileSync(path.join(dir, folder, 'curriculum', subject, 'index.html'), 'utf8');
      assert.ok(hubHtml.includes(`href="/learn/?year=${year}&amp;subject=${subject}"`));
    }
    assert.ok(fs.readFileSync(legacy, 'utf8').includes('href="/learn/?year=0&amp;subject=maths"'));
    assert.ok(fs.readFileSync(legacy, 'utf8').includes('href="/learn/?year=0"'));
    assert.ok(fs.readFileSync(legacy, 'utf8').includes('href="../../">Home</a>'));
    assert.equal(fs.readFileSync(excluded, 'utf8'), excludedHtml);
    assert.equal(spawnSync(process.execPath, [script, '--check'], { cwd: dir }).status, 0);
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
});
