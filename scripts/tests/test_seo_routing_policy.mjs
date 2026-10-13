import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const source = fs.readFileSync(new URL('../../assets/seo-routing.js', import.meta.url), 'utf8');

function run(path, content, canonicalPath = path) {
  const robots = { content };
  const canonical = { href: 'https://skillrhub.com' + canonicalPath };
  const location = { pathname: path, href: 'https://skillrhub.com' + path };
  const document = {
    querySelector(selector) {
      if (selector === 'meta[name="robots"]') return robots;
      if (selector === 'link[rel="canonical"]') return canonical;
      return null;
    },
    head: { appendChild() {} },
    createElement() { return {}; }
  };
  vm.runInNewContext(source, { document, location, window: { location }, URL });
  return { robots, canonical };
}

test('legacy routing respects explicitly indexable self-canonical activities', () => {
  for (const mode of ['practice', 'test', 'quiz']) {
    const path = `/quiz/year-1/math/ac9m1a02/${mode}/`;
    const result = run(path, 'index, follow');
    assert.equal(result.robots.content, 'index, follow');
    assert.equal(result.canonical.href, 'https://skillrhub.com' + path);
  }
});

test('legacy exclusions remain excluded', () => {
  const result = run('/quiz/year-1/math/ac9m1a02/practice/', 'noindex, follow');
  assert.equal(result.robots.content, 'noindex,follow');
  assert.equal(result.canonical.href, 'https://skillrhub.com/year-1-maths/patterning/');
});

test('a non-self-canonical alias is not promoted', () => {
  const result = run('/quiz/year-1/math/ac9m1a02/practice/', 'index, follow', '/year-1-maths/patterning/');
  assert.equal(result.robots.content, 'noindex,follow');
});
