// Scoped smoke/preservation check. NODE_PATH may select a test-only jsdom install.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {execFileSync} = require('node:child_process');
const {JSDOM} = require('jsdom');
const root = path.resolve(__dirname, '..');
const recordRoot = path.join(root, 'docs/qa/year2-science-topic-pages-20261107');
const inventory = JSON.parse(fs.readFileSync(path.join(recordRoot, 'inventory.json')));
const base = process.argv[2];
assert(base, 'Pass the unchanged baseline commit for the preservation comparison.');
let disclosures = 0, images = 0, preservedFocuses = 0;
const clean = element => element.textContent.replace(/\s+/g, ' ').trim();
for (const item of inventory) {
  const file = path.join(root, item.path);
  const source = fs.readFileSync(file, 'utf8');
  const oldSource = execFileSync('git', ['show', `${base}:${item.path}`], {cwd: root, encoding: 'utf8'});
  const dom = new JSDOM(source, {url: `https://skillrhub.com/${item.path.replace(/index\.html$/, '')}`});
  const old = new JSDOM(oldSource);
  const doc = dom.window.document, baseline = old.window.document;
  assert.equal(doc.querySelectorAll('h1').length, 1, item.code);
  for (const selector of ['title', 'meta[name="description"]', 'meta[name="robots"]', 'link[rel="canonical"]']) {
    const current = doc.querySelector(selector), before = baseline.querySelector(selector);
    assert.equal(current.outerHTML, before.outerHTML, `${item.code}: ${selector}`);
  }
  const oldSections = [...baseline.querySelectorAll('main details')].filter(el => !el.parentElement.closest('details'));
  const newSections = [...doc.querySelectorAll('.retained-teaching > details')];
  assert.equal(newSections.length, item.retained_section_count, `${item.code}: retained section count`);
  for (let i = 0; i < newSections.length; i++) {
    const label = item.retained_sections[i];
    const before = oldSections.find(el => clean(el.querySelector(':scope > summary')) === label);
    assert(before, `${item.code}: missing baseline section ${label}`);
    assert.equal(clean(newSections[i]), clean(before), `${item.code}: teaching text changed in ${label}`);
  }
  preservedFocuses += newSections.length;
  const oldLd = [...baseline.querySelectorAll('script[type="application/ld+json"]')].map(el => JSON.parse(el.textContent));
  const newLd = [...doc.querySelectorAll('script[type="application/ld+json"]')].map(el => JSON.parse(el.textContent));
  assert.equal(oldLd.length, newLd.length, `${item.code}: structured data count`);
  oldLd.forEach((entry, i) => { if (entry['@type'] !== 'BreadcrumbList') assert.deepEqual(newLd[i], entry, `${item.code}: structured data`); });
  for (const table of doc.querySelectorAll('table')) assert(table.querySelector('thead th[scope="col"]'), `${item.code}: table headers`);
  assert.equal(doc.querySelectorAll('.steps > article').length, 3, `${item.code}: teaching steps`);
  assert.equal(doc.querySelectorAll('.tricky-questions > details').length, 3, `${item.code}: tricky questions`);
  const ids = [...doc.querySelectorAll('[id]')].map(el => el.id);
  assert.equal(new Set(ids).size, ids.length, `${item.code}: duplicate IDs`);
  for (const img of doc.images) {
    assert(img.alt.trim(), `${item.code}: missing alt`);
    const imageUrl = new URL(img.src);
    if (imageUrl.origin === 'https://skillrhub.com') assert(fs.existsSync(path.join(root, imageUrl.pathname)), `${item.code}: image ${img.src}`);
    else assert([...baseline.images].some(oldImage => oldImage.getAttribute('src') === img.getAttribute('src')), `${item.code}: unexpected new external image`);
    images++;
  }
  for (const el of doc.querySelectorAll('a[href]')) {
    const url = new URL(el.href);
    if (url.origin !== 'https://skillrhub.com') continue;
    let target = path.join(root, url.pathname);
    if (url.pathname.endsWith('/')) target = path.join(target, 'index.html');
    assert(fs.existsSync(target), `${item.code}: broken link ${url.pathname}`);
    if (url.pathname === new URL(dom.window.location).pathname && url.hash) assert(doc.getElementById(url.hash.slice(1)));
  }
  const actions = [...doc.querySelectorAll('a[href*="app.skillrhub.com"]')].filter(el => new URL(el.href).searchParams.has('skill'));
  assert.equal(actions.length, item.publishedPractice ? 1 : 0, `${item.code}: published practice entrance`);
  if (item.publishedPractice) assert.equal(new URL(actions[0].href).searchParams.get('skill'), item.code);
  else assert.equal(doc.querySelector('.practice-float').href, 'https://app.skillrhub.com/');
  assert.equal(doc.querySelectorAll('.practice-float').length, 1);
  for (const details of doc.querySelectorAll('details')) {
    const summary = details.querySelector(':scope > summary');
    assert(summary, `${item.code}: unnamed disclosure`);
    const initiallyOpen = details.open;
    summary.click();
    assert.equal(details.open, !initiallyOpen, `${item.code}: opening answer`);
    summary.click();
    assert.equal(details.open, initiallyOpen, `${item.code}: closing answer`);
    disclosures++;
  }
  const learningText = doc.querySelector('main').textContent;
  assert(learningText.includes('Learning intention') && learningText.includes('Three tricky questions'));
  dom.window.close(); old.window.close();
}
console.log(`PASS ${inventory.length} pages: ${preservedFocuses} teaching sections preserved, ${images} image references, ${disclosures} native disclosure open/close checks. DOM smoke only; no browser layout claim.`);
