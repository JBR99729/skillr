import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('../../assets/geo-schema.js', import.meta.url), 'utf8');
function run(pathname, authored) {
  const scripts = new Map();
  const list = { children: authored ? [{}, {}, {}] : [], innerHTML: 'authored breadcrumb', appendChild(node) { this.children.push(node); } };
  if (authored) scripts.set('skillrhub-breadcrumb-jsonld', { textContent: 'authored schema with strand' });
  const document = {
    readyState: 'complete', title: 'AC9SFI01 Questions and predictions',
    getElementById: id => scripts.get(id),
    querySelector: selector => selector === 'nav[aria-label="Breadcrumb"]' ? { querySelector: () => list } : null,
    createElement: () => ({ children: [], setAttribute() {}, appendChild(node) { this.children.push(node); } }),
    head: { appendChild(node) { scripts.set(node.id, node); } }
  };
  vm.runInNewContext(source, { document, window: { location: { pathname } } });
  return { list, schema: scripts.get('skillrhub-breadcrumb-jsonld').textContent };
}

test('shared helper preserves compact authored HTML and static strand schema', () => {
  for (const path of ['/foundation/science/ac9sfi01-example/', '/year3/maths/ac9m3n01-example/', '/year5/curriculum/english/']) {
    const result = run(path, true);
    assert.equal(result.list.innerHTML, 'authored breadcrumb');
    assert.equal(result.list.children.length, 3);
    assert.equal(result.schema, 'authored schema with strand');
  }
});

test('missing legacy breadcrumbs fall back to Learn for every year and subject', () => {
  for (let year = 0; year <= 10; year++) {
    const folder = year ? `year${year}` : 'foundation';
    for (const subject of ['maths', 'science', 'english']) {
      for (const hub of [false, true]) {
        const path = hub ? `/${folder}/curriculum/${subject}/` : `/${folder}/${subject}/ac9example/`;
        const result = run(path, false);
        const items = JSON.parse(result.schema).itemListElement;
        assert.equal(items[1].item, `https://skillrhub.com/learn/?year=${year}${hub ? `&subject=${subject}` : ''}`);
        assert.equal(items[2].item, hub ? `https://skillrhub.com${path}` : `https://skillrhub.com/learn/?year=${year}&subject=${subject}`);
        assert.equal(result.list.children.length, hub ? 3 : 4);
      }
    }
  }
});
