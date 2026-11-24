import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';

// Exercise the shipped script and its asynchronous catalogue request with a small DOM.
class Element {
  constructor(tag) { this.tagName = tag; this.children = []; this.dataset = {}; this._text = ''; this.classList = {add() {}}; }
  append(...nodes) { for (const node of nodes) { node.parent = this; this.children.push(node); } }
  appendChild(node) { this.append(node); return node; }
  prepend(node) { node.parent = this; this.children.unshift(node); }
  remove() { if (this.parent) this.parent.children = this.parent.children.filter(n => n !== this); }
  setAttribute(name, value) { this[name] = value; }
  addEventListener() {}
  set textContent(value) { this._text = value; }
  get textContent() { return this._text + this.children.map(n => n.textContent).join(' '); }
}
const descendants = node => [node, ...node.children.flatMap(descendants)];
const source = readFileSync('assets/resource-links.js', 'utf8');
const catalogue = JSON.parse(readFileSync('data/print-and-go-products.json', 'utf8'));
async function render(products, code = 'AC9M5SP03') {
  const body = new Element('body'), head = new Element('head'), panel = new Element('div');
  body.append(panel);
  const document = {
    body, head, readyState: 'complete', addEventListener() {},
    createElement: tag => new Element(tag),
    querySelector: selector => selector === '[data-teaching-resources] .content-block' ? panel : null,
    getElementById: id => descendants(body).find(n => n.id === id) || null
  };
  const window = {location: {pathname: `/year5/maths/${code.toLowerCase()}-topic/teacher-slides/`}};
  runInNewContext(source, {window, document, URL, fetch: async () => ({ok: true, json: async () => products})});
  await new Promise(setImmediate);
  return panel;
}
test('live price-free catalogue retains matching resource and bundle purchase actions', async () => {
  const panel = await render(catalogue);
  const links = descendants(panel).filter(n => n.tagName === 'a');
  assert.ok(links.length >= 2, 'the reported Year 5 teaching-slide route retains resource and bundle links');
  assert.equal(links[0].textContent, 'View price on TpT');
  for (const link of links) {
    const url = new URL(link.href);
    assert.equal(url.hostname, 'www.teacherspayteachers.com');
    assert.equal(url.searchParams.get('utm_source'), 'skillrhub');
    assert.equal(url.searchParams.get('utm_content').split('_')[0], 'AC9M5SP03');
  }
  assert.doesNotMatch(panel.textContent, /US\$|\$\d/);
});
test('free, inactive, unverified and non-TpT resources cannot become paid offers', async () => {
  const base = {id: 'example', available: true, free: false, curriculumCodes: ['AC9M5SP03'], tptUrl: 'https://www.teacherspayteachers.com/Product/example-123'};
  for (const product of [{...base, free: true}, {...base, available: false}, {...base, free: undefined}, {...base, tptUrl: 'https://example.com/123'}]) {
    assert.equal((await render([product])).children.length, 0);
  }
  const panel = await render([{...base, price: 5, bundlePrice: 9, bundleTptUrl: 'https://www.teacherspayteachers.com/Product/bundle-456'}]);
  assert.equal(descendants(panel).filter(n => n.tagName === 'a').length, 2);
  assert.doesNotMatch(panel.textContent, /US\$|\$\d/);
});
