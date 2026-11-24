const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('@playwright/test');

const root = path.resolve(__dirname, '../..');
const origin = process.env.SEO_PREVIEW_ORIGIN || 'http://127.0.0.1:8765';
const levels = Array.from({ length: 11 }, (_, year) => ({
  year, level: year ? `year${year}` : 'foundation'
}));

(async () => {
  // Old category URLs must retain the exact year/subject instead of returning
  // 404, creating duplicate indexed hubs, or sending everyone to one default.
  for (const { year, level } of levels) {
    for (const subject of ['maths', 'english', 'science']) {
      const file = path.join(root, level, subject, 'index.html');
      const source = fs.readFileSync(file, 'utf8');
      assert.match(source, /name="robots" content="noindex,\s*follow"/);
      assert.match(source, /rel="canonical" href="https:\/\/skillrhub.com\/learn\/"/);
      assert.ok(source.includes(`0;url=https://skillrhub.com/learn/?year=${year}&amp;subject=${subject}`), file);
      const worksheet = fs.readFileSync(path.join(root, 'worksheets', level, subject, 'index.html'), 'utf8');
      assert.ok(worksheet.includes(`rel="canonical" href="https://skillrhub.com/worksheets/${level}/${subject}/"`));
      assert.ok(!/name="robots" content="noindex/.test(worksheet));
    }
  }
  const browser = await chromium.launch({ headless: true });
  try {
    for (const width of [390, 768, 1440]) {
      const context = await browser.newContext({ viewport: { width, height: 900 } });
      // Keep analytics and the production practice app out of QA traffic.
      await context.route('**/*', route => {
        const url = new URL(route.request().url());
        if (url.origin === origin) return route.continue();
        return route.abort();
      });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(origin + '/', { waitUntil: 'networkidle' });
      for (const label of ['Maths by year', 'English by year', 'Science by year']) {
        await page.getByText(label, { exact: true }).click();
      }
      const links = await page.locator('.clean-resource-discovery li a').evaluateAll(nodes => nodes.map(node => node.getAttribute('href')));
      // Home also contains curated teaching-topic links; category count is 33.
      // Check the category set rather than treating extra editorial links as an error.
      assert.equal(new Set(links).size, links.length, 'duplicate homepage resource links');
      const categoryLinks = links.filter(link => link.startsWith('/worksheets/'));
      assert.equal(categoryLinks.length, 33, '11 year levels x 3 worksheet subject categories');
      for (const link of links) assert.ok(fs.existsSync(path.join(root, link, 'index.html')), link);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `homepage overflow at ${width}`);
      await page.screenshot({ path: `test-results/seo-home-${width}.png`, fullPage: true });
      const search = page.locator('#topic-search');
      await search.getByLabel('Year level').selectOption('4');
      await search.getByRole('searchbox').fill('fractions');
      const showAll = search.getByRole('button', { name: /Show all \d+ results/ });
      await showAll.waitFor();
      const resultHeadings = search.locator('#site-search-list h3');
      assert.deepEqual(new Set((await resultHeadings.allTextContents()).slice(0, 2)), new Set([
        'Equivalent fractions and decimals', 'Count and locate fractions on number lines',
      ]));
      assert.equal(await search.getByRole('link', {name: 'Practise online: Equivalent fractions and decimals', exact: true}).getAttribute('href'), 'https://app.skillrhub.com/?try=1&skill=AC9M4N03');
      const count = Number((await showAll.innerText()).match(/\d+/)[0]);
      await showAll.focus();
      await page.keyboard.press('Enter');
      assert.equal(await resultHeadings.count(), count);
      assert.equal(await resultHeadings.nth(8).evaluate(heading => document.activeElement === heading), true);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `search overflow at ${width}`);
      await page.goto(origin + '/learn/?year=3&subject=maths', { waitUntil: 'networkidle' });
      assert.deepEqual(await page.locator('.cb-group:visible h2').allTextContents(), ['Year 3 Maths']);
      assert.match(await page.title(), /Australian Curriculum Maths, English & Science F–10/);
      assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'), 'https://skillrhub.com/learn/');
      await page.getByRole('button', { name: 'English', exact: true }).click();
      assert.deepEqual(await page.locator('.cb-group:visible h2').allTextContents(), ['Year 3 English']);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `catalogue overflow at ${width}`);
      await page.screenshot({ path: `test-results/seo-learn-${width}.png`, fullPage: true });
      assert.deepEqual(errors, [], `browser errors at ${width}`);
      await context.close();
    }
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto(origin + '/');
    await page.getByText('Maths by year', { exact: true }).click();
    const worksheets = page.locator('.clean-resource-discovery');
    assert.equal(await worksheets.getByRole('link', { name: 'Year 3 Maths', exact: true }).isVisible(), true);
    const browse = page.getByRole('navigation', { name: 'Browse by year and subject' });
    await browse.getByText('English', { exact: true }).click();
    const year4 = browse.getByRole('link', { name: 'Year 4 English' });
    assert.equal(await year4.isVisible(), true);
    assert.equal(await year4.getAttribute('href'), '/learn/?year=4&subject=english');
    await page.goto(origin + '/learn/');
    assert.equal(await page.locator('.cb-group').count(), 33);
    await context.close();
    console.log('PASS: 33 category destinations; 33 native worksheet links; 390/768/1440px layouts, search ranking and keyboard expansion, subject switching and no-JavaScript discovery.');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
