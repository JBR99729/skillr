const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const crypto=require('node:crypto');
const {JSDOM}=require('jsdom');
const {ROOT,ORIGIN,GUIDE,aliases,fileFor,products}=require('./consolidate-pages.cjs');
const sha=value=>crypto.createHash('sha256').update(value).digest('hex');
const read=relative=>fs.readFileSync(path.join(ROOT,relative),'utf8');
const dom=relative=>new JSDOM(read(relative));
function validate() {
  for(const [old,target] of Object.entries(aliases)){
    const page=dom(fileFor(old)),d=page.window.document;
    assert.match(d.querySelector('meta[name="robots"]').content,/noindex/);
    assert.equal(d.querySelector('link[rel="canonical"]').href,ORIGIN+target.split('#')[0]);
    assert.equal(d.querySelector('meta[http-equiv="refresh"]').content,'0; url='+target);
    const destination=dom(fileFor(target)),canonical=destination.window.document.querySelector('link[rel="canonical"]');
    assert.equal(canonical.href,ORIGIN+target.split('#')[0]);
    assert.ok(!/noindex/.test(destination.window.document.querySelector('meta[name="robots"]').content));
    if(target.includes('#'))assert.ok(destination.window.document.getElementById(target.split('#')[1]));
    page.window.close();destination.window.close();
  }
  const guide=dom(fileFor(GUIDE)),g=guide.window.document;
  assert.equal(g.querySelectorAll('h1').length,1);
  assert.equal(g.querySelectorAll('section[id^="class-"]').length,5);
  assert.ok(g.querySelectorAll('a[href*="/ac9"]').length>=15);
  for(const a of g.querySelectorAll('main a[href]')){
    const href=a.getAttribute('href');if(href.startsWith('#'))continue;
    const file=fileFor(href.split('?')[0]);assert.ok(fs.existsSync(path.join(ROOT,file)),href);
  }
  guide.window.close();
  const manifest=JSON.parse(read('scripts/seo-maintenance/worksheet-manifest.json'));
  assert.equal(manifest.worksheets.length,60);
  let questions=0;
  for(const row of manifest.worksheets){
    const page=dom(row.path),d=page.window.document,staticSheet=d.querySelector('[data-static-worksheet]');
    assert.equal(staticSheet?.getAttribute('data-static-worksheet'),row.code,row.path);
    assert.equal(Number(staticSheet.getAttribute('data-static-question-count')),row.questions);
    if(['AC9EFLA01','AC9EFLA02'].includes(row.code))assert.equal(row.questions,9,`Use the final public two-sheet bank: ${row.path}`);
    assert.equal(staticSheet.getAttribute('data-source-question-sha'),row.sourceQuestionSha);
    assert.ok(staticSheet.textContent.trim().split(/\s+/).length>120,row.path);
    assert.equal(d.querySelectorAll('h1').length,1,row.path);
    const ids=[...d.querySelectorAll('[id]')].map(node=>node.id);
    assert.equal(new Set(ids).size,ids.length,`Repeated element IDs: ${row.path}`);
    assert.ok(!/\bLoading\b/.test(d.querySelector('main').textContent),row.path);
    assert.equal(d.querySelector('link[rel="canonical"]').href,ORIGIN+'/'+row.path.replace(/index.html$/,''));
    assert.ok(!/noindex/.test(d.querySelector('meta[name="robots"]')?.content || ''));
    questions+=row.questions;page.window.close();
  }
  for(const [relative,digest] of Object.entries(manifest.sources))assert.equal(sha(fs.readFileSync(path.join(ROOT,relative))),digest,`Source changed since worksheet generation: ${relative}`);
  const catalogue=JSON.parse(read('data/print-and-go-products.json'));
  for(const target of Object.values(products))assert.ok(catalogue.some(p=>p.url===target));
  const sitemap=read('sitemap-site.xml');
  for(const old of Object.keys(aliases))assert.ok(!sitemap.includes(`<loc>${ORIGIN}${old}</loc>`),`Alias still in sitemap: ${old}`);
  for(const relative of require('./worksheet-portals.json')) {
    const page=dom(relative),d=page.window.document,code=relative.match(/ac9[a-z0-9]+/i)[0].toUpperCase();
    assert.match(d.querySelector('meta[name="robots"]').content,/noindex/);
    assert.equal(d.querySelector('[data-worksheet-portal]')?.getAttribute('data-worksheet-portal'),code);
    assert.equal(d.querySelector('#downloadPdfButton').href,`https://app.skillrhub.com/?worksheet=${code}`);
    assert.ok(!d.querySelector('script[src*="worksheet-pdf"]'));
    assert.ok(!sitemap.includes(`<loc>${ORIGIN}/${relative.replace(/index.html$/,'')}</loc>`));
    page.window.close();
  }
  console.log(`Validated 8 direct redirects, 5 class sections, and ${manifest.worksheets.length} static worksheets with ${questions} unchanged authored questions.`);
}
module.exports={validate};
if(require.main===module)validate();
