// Repeatable no-JavaScript public-page checks at phone and desktop widths.
const {chromium} = require('playwright');
const {spawn} = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const server = spawn('python3', ['-m', 'http.server', '8768', '--bind', '127.0.0.1'], {cwd: root, stdio: 'ignore'});
(async () => {
  let browser;
  const failures = [];
  try {
    for (let attempt = 0; attempt < 50; attempt++) {
      try {if ((await fetch('http://127.0.0.1:8768/')).ok) break;} catch {}
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    browser = await chromium.launch({headless: true});
    fs.mkdirSync(path.join(root, 'artifacts/priority-seo'), {recursive: true});
    for (const width of [390, 1440]) {
      const page = await browser.newPage({viewport: {width, height: 1000}, javaScriptEnabled: false});
      for (const route of ['/', '/about.html', '/faq.html', '/products/tpt-18319518/', '/products/tpt-18318601/', '/worksheets/year4/english/', '/worksheets/year4/maths/']) {
        const response = await page.goto('http://127.0.0.1:8768' + route, {waitUntil: 'domcontentloaded'});
        if (response.status() !== 200) throw Error('HTTP failure: ' + route);
        if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)) {
          console.log(await page.evaluate(() => [...document.querySelectorAll('body *')].map(el => ({tag: el.tagName, class: el.className, text: el.textContent.slice(0,80), right: el.getBoundingClientRect().right})).filter(el => el.right > innerWidth + 1).slice(0,20)));
          await page.screenshot({path: path.join(root, 'artifacts/priority-seo', 'overflow-' + width + route.replace(/[^a-z0-9]/gi, '-') + '.png'), fullPage: true});
          failures.push('Horizontal overflow: ' + width + route);
        }
        if (['/', '/about.html'].includes(route)) {
          await page.locator('#online-access summary').click();
          if (!await page.locator('#online-access').innerText().then(t => t.includes('20 questions a day as a guest') && t.includes('No card needed.'))) throw Error('Access details missing');
        }
        const previews = page.locator('.product-page-previews img');
        for (let index = 0; index < await previews.count(); index++) {
          await previews.nth(index).scrollIntoViewIfNeeded();
          await page.waitForFunction(img => img.complete && img.naturalWidth > 0, await previews.nth(index).elementHandle());
        }
        if (route.startsWith('/products/')) {
          if (await previews.count() !== 3) throw Error('Three actual page previews required');
          await page.screenshot({path: path.join(root, 'artifacts/priority-seo', route.split('/')[2] + '-' + width + '.png'), fullPage: true});
        }
        console.log(JSON.stringify({width, route, previews: await previews.count(), passed: true}));
      }
      await page.close();
    }
    const legacy = await browser.newPage({viewport: {width: 390, height: 1000}});
    await legacy.goto('http://127.0.0.1:8768/product.html?id=tpt-17892705', {waitUntil: 'domcontentloaded'});
    await legacy.locator('.product-facts dd').first().waitFor();
    if (!await legacy.locator('.product-facts').innerText().then(t => /Slides|Pages|Practice questions/.test(t))) throw Error('Verified facts missing from legacy product route');
    if (await legacy.evaluate(() => document.documentElement.scrollWidth > innerWidth)) throw Error('Legacy product route overflows');
    await legacy.close();
    if (failures.length) throw Error(failures.join('\n'));
  } finally {
    if (browser) await browser.close();
    server.kill();
  }
})().catch(error => {console.error(error); process.exitCode = 1;});
