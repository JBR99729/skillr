const {chromium} = require('@playwright/test');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const path = require('node:path');
const inventory = JSON.parse(fs.readFileSync('docs/qa/year10-science-topic-pages-batch2-20261109/inventory.json'));
const origin = process.env.QA_ORIGIN || 'http://127.0.0.1:8765';
const out = 'artifacts/year10-science-topic-pages-batch2-browser';
fs.mkdirSync(out, {recursive:true});
(async () => {
  const browser = await chromium.launch({executablePath:process.env.CHROME_BIN || '/usr/bin/google-chrome', headless:true});
  const results = [], problems = [];
  try {
    for (const width of [1440,768,390]) {
      console.log(`Checking ${inventory.length} pages at ${width}px`);
      const context = await browser.newContext({viewport:{width,height:1000}, javaScriptEnabled:false, colorScheme:'light'});
      await context.route('**/*', route => new URL(route.request().url()).origin === origin ? route.continue() : route.abort());
      const page = await context.newPage();
      page.setDefaultTimeout(5000);page.setDefaultNavigationTimeout(15000);
      for (const item of inventory) {
        console.log('Page',item.code,width);
        const failures = [];
        const listener = response => { if (response.url().startsWith(origin) && response.status() >= 400) failures.push(response.url()); };
        page.on('response',listener);
        try {
        const response = await page.goto(origin+'/'+item.path.replace(/index\.html$/,''), {waitUntil:'networkidle'});
        assert.equal(response.status(),200,item.code);
        assert.equal(await page.locator('.hero .kicker').textContent(),'YEAR 10 SCIENCE',item.code+': visible year label');
        // Exercise the retained native lesson and its lazy artwork at every viewport.
        const retained = page.locator('#topic-guide');
        await retained.evaluate(e=>{e.open=true;e.querySelectorAll('details').forEach(d=>d.open=true)});
        for(const img of await retained.locator('img').all()){
          await img.evaluate(e=>e.scrollIntoView({block:'center',behavior:'instant'}));
          await img.evaluate(e=>e.loading='eager');
          await img.evaluate(e=>e.complete && e.naturalWidth ? Promise.resolve() : new Promise((resolve,reject)=>{e.addEventListener('load',resolve,{once:true});e.addEventListener('error',()=>reject(new Error('Retained image failed: '+e.src)),{once:true})}));
        }
        assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,item.code+': expanded retained teaching overflows');
        if(width<600){
          for(const figure of await page.locator('.concept-figure, .retained-teaching .science-premium-diagram:has(img[src$="-corrected.svg"])').all()){
            const result=await figure.evaluate(e=>{const art=e.querySelector('svg,img');return {width:art.getBoundingClientRect().width,focusable:e.tabIndex===0,scrollable:e.scrollWidth>e.clientWidth,initial:e.scrollLeft}});
            assert(result.width>=600 && result.focusable && result.scrollable,item.code+': phone diagram must remain readable and scrollable');
            await figure.evaluate(e=>e.scrollLeft=e.scrollWidth);assert(await figure.evaluate(e=>e.scrollLeft>0),item.code+': diagram scroll');await figure.evaluate(e=>e.scrollLeft=0);
            console.log('Keyboard pan begin',item.code);
            await figure.focus();await page.keyboard.press('ArrowRight');
            for(let attempt=0;attempt<20;attempt++){
              if(await figure.evaluate(e=>e.scrollLeft>0))break;
              await new Promise(resolve=>setTimeout(resolve,50));
            }
            const keyboardPan=await figure.evaluate(e=>({scroll:e.scrollLeft,active:document.activeElement===e}));
            console.log('Keyboard pan result',item.code,JSON.stringify(keyboardPan));
            assert(keyboardPan.scroll>0,item.code+': keyboard diagram pan');
            await figure.evaluate(e=>{e.blur();e.scrollTo({left:0,behavior:'instant'})});
          }
        }

        let htmlIndex=0;
        for(const model of await retained.locator('div.science-flow[role=img]').all()){await model.evaluate(e=>e.scrollIntoView({block:'center',behavior:'instant'}));await model.screenshot({path:path.join(out,`${item.code}-${width}-native-${++htmlIndex}.png`)});}
        let retainedIndex=0;
        for(const svg of await retained.locator('svg').all()){
          await svg.evaluate(e=>e.scrollIntoView({block:'center',behavior:'instant'}));
          await svg.locator('..').screenshot({path:path.join(out,`${item.code}-${width}-retained-${++retainedIndex}.png`)});
        }
        if(width<600){
          for(const table of await page.locator('.wide-evidence').all()){
            const result=await table.evaluate(e=>({focusable:e.tabIndex===0,width:e.querySelector('table').getBoundingClientRect().width,scrollable:e.scrollWidth>e.clientWidth}));
            assert(result.focusable&&result.width>=520&&result.scrollable,item.code+': wide data table must remain readable and scrollable');
            await table.evaluate(e=>e.scrollLeft=e.scrollWidth);assert(await table.evaluate(e=>e.scrollLeft>0),item.code+': data table scroll');await table.evaluate(e=>e.scrollLeft=0);
          }
        }
        await retained.evaluate(e=>{e.open=false;e.querySelectorAll('details').forEach(d=>d.open=false)});
        await page.locator('h1').evaluate(e=>e.scrollIntoView({block:'center',behavior:'instant'}));
        const check = await page.evaluate(() => ({
          overflow:document.documentElement.scrollWidth > innerWidth + 1,
          broken:[...document.images].filter(e => e.currentSrc.startsWith(location.origin) && (!e.complete || !e.naturalWidth)).map(e=>e.src),
          main:document.querySelectorAll('main').length,
          heading:document.querySelectorAll('h1').length,
          app:document.querySelectorAll('#skillr-topic-practice-now').length,
          button: (()=>{const r=document.querySelector('#skillr-topic-practice-now').getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,right:r.right,bottom:r.bottom}})()
        }));
        if(width<600){
          const trail=await page.locator('.crumb').boundingBox();
          const nav=await page.locator('.shortcuts').boundingBox();
          assert(trail.height<=110,item.code+': compact phone breadcrumb');
          assert(nav.height<=120,item.code+': compact phone shortcuts');
        }
        assert.equal(check.main,1,item.code); assert.equal(check.heading,1,item.code);assert.equal(check.app,1,item.code);
        assert.equal(check.overflow,false,`${item.code} at ${width}px: page overflows`);
        assert.deepEqual(check.broken,[],`${item.code}: broken images`); assert.deepEqual(failures,[],`${item.code}: failed local requests`);
        assert(check.button.height>=44 && check.button.x>=0 && check.button.right<=width && check.button.bottom<=1000,`${item.code}: app button touch target/placement`);
        if(width<=1000){
          // Read both rectangles in one browser task: keyboard scrolling can still
          // move the viewport between two separate Playwright boundingBox calls.
          const [first,second]=await page.locator('.steps > article').evaluateAll(elements=>elements.slice(0,2).map(e=>{
            const r=e.getBoundingClientRect();return {x:r.x,y:r.y,height:r.height};
          }));
          assert(first && second && Math.abs(first.x-second.x)<1 && second.y>=first.y+first.height-1,item.code+': teaching focuses must stack for tablet/mobile readability '+JSON.stringify({first,second}));
        }
        const summaries=page.locator('.steps article details > summary');
        assert.equal(await summaries.count(),3,item.code);
        await summaries.nth(0).focus();await page.keyboard.press('Space');
        assert(await summaries.nth(0).evaluate(e=>e.parentElement.open),item.code+': keyboard answer open');
        await page.keyboard.press('Enter');assert.equal(await summaries.nth(0).evaluate(e=>e.parentElement.open),false,item.code+': keyboard answer close');
        for(let i=0;i<3;i++){
          // A learner scrolls an answer above the fixed app entrance before tapping.
          await summaries.nth(i).evaluate(e=>e.scrollIntoView({block:'center',behavior:'instant'}));
          assert((await summaries.nth(i).boundingBox()).height >= 44, item.code+': answer touch target');
          await summaries.nth(i).click({timeout:5000});
          assert(await summaries.nth(i).evaluate(e=>e.parentElement.open),item.code);
          // A learner scrolls an answer above the fixed app entrance before tapping.
          await summaries.nth(i).evaluate(e=>e.scrollIntoView({block:'center',behavior:'instant'}));
          assert((await summaries.nth(i).boundingBox()).height >= 44, item.code+': answer touch target');
          await summaries.nth(i).click({timeout:5000});
          assert.equal(await summaries.nth(i).evaluate(e=>e.parentElement.open),false,item.code);
        }
        if (true) {
          await page.locator('h1').evaluate(e=>e.scrollIntoView({block:'center',behavior:'instant'}));
          await page.screenshot({path:path.join(out,`${item.code}-${width}-top.png`)});
          await page.locator('.mini-lesson').evaluate(e=>e.scrollIntoView({block:'center',behavior:'instant'}));
          await page.screenshot({path:path.join(out,`${item.code}-${width}-lesson.png`)});
        }
        results.push({code:item.code,width,...check});
        } catch (error) {
          problems.push({code:item.code,width,error:error.message});
          console.error(item.code, width, error.message);
          await page.screenshot({path:path.join(out,`${item.code}-${width}-failure.png`)});
          const overflow = await page.evaluate(()=>[...document.querySelectorAll('main *')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&(r.right>innerWidth+1||r.left < -1)}).slice(0,25).map(e=>({tag:e.tagName,class:e.className,text:e.textContent.slice(0,100),right:e.getBoundingClientRect().right})));
          fs.writeFileSync(path.join(out,`${item.code}-${width}-failure.json`),JSON.stringify(overflow,null,2));
        } finally {page.off('response',listener);}
      }
      await context.close();
    }
    const context=await browser.newContext({viewport:{width:1440,height:1000}});
    await context.route('**/*',route=>new URL(route.request().url()).origin===origin?route.continue():route.abort());
    const page=await context.newPage();const errors=[];page.on('pageerror',error=>errors.push(error.message));
    for(const item of inventory){await page.goto(origin+'/'+item.path.replace(/index\.html$/,''),{waitUntil:'networkidle'});assert.equal(await page.locator('#skillr-topic-practice-now').count(),1,item.code);}
    assert.deepEqual(errors,[],'page JavaScript errors');await context.close();
    fs.writeFileSync(path.join(out,'results.json'),JSON.stringify({pages:inventory.length,viewports:[1440,768,390],javascriptDisabled:true,javascriptEnabledSmoke:inventory.length,keyboardAnswers:true,keyboardPhoneDiagramPan:true,results,problems},null,2));
    assert.deepEqual(problems,[], 'Rendered science page failures');
    console.log(`PASS ${inventory.length} Year 10 batch 2 Science pages at desktop, tablet and mobile; native answer toggles, images, app targets and JavaScript smoke.`);
  } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1});
