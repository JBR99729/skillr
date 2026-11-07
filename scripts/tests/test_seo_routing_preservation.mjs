import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('../../assets/seo-routing.js', import.meta.url), 'utf8');
function render(pathname, robotsValue, canonicalValue) {
  const robots = { content: robotsValue };
  const canonical = { href: canonicalValue };
  const document = { querySelector(selector) { return selector.includes('robots') ? robots : canonical; } };
  const location = { pathname, href: `https://skillrhub.com${pathname}` };
  vm.runInNewContext(source, { document, window: { location }, location, URL });
  return { robots: robots.content, canonical: canonical.href };
}
test('authored indexable worksheet and activity directives survive shared routing', () => {
  for (const mode of ['worksheet', 'practice', 'test', 'quiz']) {
    const path = `/quiz/year-2/math/ac9m2n01/${mode}/`;
    const canonical = `https://skillrhub.com${path}`;
    assert.deepEqual(render(path, 'index, follow', canonical), { robots: 'index, follow', canonical });
  }
});
test('retired aliases retain their noindex and canonical destination', () => {
  const canonical = 'https://skillrhub.com/year-2-maths/place-value-worksheets/';
  assert.deepEqual(render('/quiz/year-2/math/ac9m2n01/worksheet/', 'noindex, follow', canonical), { robots: 'noindex,follow', canonical });
});
