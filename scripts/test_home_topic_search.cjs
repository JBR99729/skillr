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
    append(...children) { this.children.push(...children); },
    replaceChildren() { this.children = []; },
    setAttribute() {},
    get lastElementChild() { return this.children.at(-1); },
  };
}

async function search(query, data = catalogue) {
  const elements = new Map();
  const find = id => {
    if (!elements.has(id)) elements.set(id, element());
    return elements.get(id);
  };
  vm.runInNewContext(source, {
    document: {
      getElementById: () => ({ querySelector: find, querySelectorAll: () => [] }),
      createElement: element,
    },
    location: { search: query }, URL, URLSearchParams,
    fetch: async url => {
      const payload = data[url.split('?')[0]];
      return { ok: Boolean(payload), json: async () => payload };
    },
  });
  await new Promise(resolve => setImmediate(resolve));
  return find('#site-search-list').children.map(row => ({
    guide: row.children[0].href,
    meta: row.children[1].textContent,
    actions: row.children[2].children.map(link => link.href),
  }));
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
  assert.deepEqual(rows[0].actions, []);
});
