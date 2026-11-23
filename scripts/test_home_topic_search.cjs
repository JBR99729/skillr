const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'assets/home-topic-search.js'), 'utf8');
const json = filename => JSON.parse(fs.readFileSync(path.join(root, filename), 'utf8'));
const catalogue = {
  '/assets/site-search-index.json': json('assets/site-search-index.json'),
  '/data/app-question-banks.json': json('data/app-question-banks.json'),
  '/data/print-and-go-products.json': json('data/print-and-go-products.json'),
};

function element() {
  return {
    value: '', hidden: true, children: [], dataset: {}, classList: { add() {} },
    listeners: {},
    addEventListener(type, listener) { this.listeners[type] = listener; },
    append(...children) { this.children.push(...children.flatMap(child => child.isFragment ? child.children : [child])); },
    replaceChildren() { this.children = []; },
    setAttribute() {},
    focus() { this.focused = true; },
    get lastElementChild() { return this.children.at(-1); },
  };
}

async function setup(query, data = catalogue) {
  const settle = () => new Promise(resolve => setImmediate(resolve));
  const elements = new Map();
  const find = id => {
    if (!elements.has(id)) elements.set(id, element());
    return elements.get(id);
  };
  vm.runInNewContext(source, {
    document: {
      getElementById: () => ({ querySelector: find, querySelectorAll: () => [] }),
      createElement: element,
      createDocumentFragment: () => Object.assign(element(), { isFragment: true }),
    },
    location: { search: query }, URL, URLSearchParams,
    fetch: async url => {
      const payload = data[url.split('?')[0]];
      return { ok: Boolean(payload), json: async () => await payload };
    },
  });
  await settle();
  return {
    find, settle,
    rows: () => find('#site-search-list').children.map(row => ({
    title: row.children[0].textContent, focused: row.children[0].focused,
    guide: row.children[2].children.find(link => link.textContent === 'Read the guide')?.href,
    meta: row.children[1].textContent,
    actions: row.children[2].children.map(link => link.href),
    labels: row.children[2].children.map(link => link.textContent),
    })),
  };
}

async function search(query, data) {
  return (await setup(query, data)).rows();
}

test('Year 1 Maths preset includes the published Numbers to 120 practice', async () => {
  const rows = await search('?year=1&subject=maths');
  assert.ok(rows.length > 8);
  assert.equal(new Set(rows.map(row => row.guide)).size, rows.length);
  assert.ok(rows.every(row => row.meta.startsWith('Year 1 · Maths · ')));
  const firstSkill = rows.find(row => row.meta.endsWith('AC9M1N01'));
  assert.ok(firstSkill.actions.includes('https://app.skillrhub.com/?try=1&skill=AC9M1N01'));
});

test('Exact code and topic text show the same confirmed paid worksheet', async () => {
  const exact = await search('?q=ac9-m1-n01');
  const topic = await search('?q=numbers+to+120&year=1&subject=maths');
  assert.equal(exact.length, 1);
  const match = topic.find(row => row.guide === exact[0].guide);
  assert.ok(match);
  assert.ok(exact[0].actions.some(link => link.endsWith('-17864634')));
  assert.deepEqual(match.actions, exact[0].actions);
});

test('Unavailable banks and untrusted product URLs yield only a topic guide', async () => {
  const rows = await search('?q=AC9M1N01', {
    ...catalogue,
    '/data/app-question-banks.json': { codes: [{ code: 'AC9M1N01', guestPractice: true }] },
    '/data/print-and-go-products.json': [
      { tptUrl: 'https://example.com/worksheet.pdf', listingConfirmedAt: '2026-11-03' },
      { tptUrl: 'https://www.teacherspayteachers.com/Product/Unconfirmed-123456' },
      { tptUrl: '/downloads/paid-answer-key.pdf', listingConfirmedAt: '2026-11-03' },
    ].map(product => ({
      ...product, available: true, hasPrintables: true, curriculumCodes: ['AC9M1N01'],
    })),
  });
  assert.equal(rows.length, 1);
  assert.deepEqual(rows[0].labels, ['Read the guide']);
});


test('Highlights direct fraction topics and expands all matching Year 4 results', async () => {
  const view = await setup('?q=fractions&year=4');
  const rows = view.rows();
  assert.equal(rows.length, 8);
  assert.deepEqual(new Set(rows.slice(0, 2).map(row => row.title)), new Set([
    'Equivalent fractions and decimals', 'Count and locate fractions on number lines',
  ]));
  const fraction = rows.find(row => row.meta.endsWith('AC9M4N03'));
  assert.deepEqual(fraction.labels.slice(0, 2), ['Practise online', 'Read the guide']);
  assert.ok(fraction.labels.some(label => /^Printable .+ \(TpT, paid\)$/.test(label)));
  const all = view.find('#site-search-show-all');
  const count = Number(all.textContent.match(/\d+/)[0]);
  assert.ok(count > 8);
  all.listeners.click();
  assert.equal(view.rows().length, count);
  assert.equal(view.rows()[8].focused, true);
  assert.equal(all.hidden, true);
  assert.equal(view.find('#site-search-status').textContent, count + ' matching topics.');
});

test('Search submits an empty state and reports unmatched queries', async () => {
  const view = await setup('');
  view.find('#home-topic-search').listeners.submit({ preventDefault() {} });
  assert.equal(view.find('#site-search-status').textContent, 'Enter a topic or choose a year or subject.');
  view.find('#site-search-input').value = 'unfindabletopicxyz';
  view.find('#site-search-input').listeners.input();
  await view.settle();
  assert.equal(view.find('#site-search-status').textContent, 'No matching topics. Try fewer words or a curriculum code.');
  assert.equal(view.rows().length, 0);
  assert.equal(view.find('#site-search-show-all').hidden, true);
});

test('Shows the verified practice and guide before the optional paid catalogue', async () => {
  let finish;
  const products = new Promise(resolve => { finish = resolve; });
  const view = await setup('?q=AC9M4N03', { ...catalogue, '/data/print-and-go-products.json': products });
  assert.equal(view.rows().length, 1);
  assert.ok(view.rows()[0].actions.includes('https://app.skillrhub.com/?try=1&skill=AC9M4N03'));
  assert.ok(view.rows()[0].labels.includes('Read the guide'));
  assert.ok(!view.rows()[0].labels.some(label => label.includes('TpT')));
  finish(catalogue['/data/print-and-go-products.json']);
  await view.settle();
  assert.ok(view.rows()[0].labels.some(label => label.includes('TpT')));
});
