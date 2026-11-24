const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {execFileSync}=require('node:child_process'),{JSDOM}=require('jsdom');
const inventory=JSON.parse(fs.readFileSync('docs/qa/science-release-20261107/foundation-inventory.json'));
const clean=e=>e.textContent.replace(/\s+/g,' ').trim();let sections=0,disclosures=0;
for(const item of inventory){
 const source=fs.readFileSync(item.path,'utf8');
 const old=execFileSync('git',['show',`ed41ed63cda8005bfe7a73c84c38f21956b60fb3:${item.path}`],{encoding:'utf8'});
 const dom=new JSDOM(source,{url:'https://skillrhub.com/'+item.path.replace(/index\.html$/,'')}),before=new JSDOM(old),doc=dom.window.document;
 assert.equal(doc.querySelectorAll('main').length,1,item.code);assert.equal(doc.querySelectorAll('h1').length,1,item.code);
 const ids=[...doc.querySelectorAll('[id]')].map(e=>e.id);assert.equal(new Set(ids).size,ids.length,item.code);
 const retained=[...doc.querySelectorAll('.retained-teaching > details')];assert.equal(retained.length,item.retained_sections.length,item.code);
 for(const section of retained){const label=clean(section.querySelector(':scope > summary'));const previous=[...before.window.document.querySelectorAll('details')].find(e=>clean(e.querySelector(':scope > summary'))===label);assert(previous,item.code+label);assert.equal(clean(section),clean(previous),item.code+label);sections++;}
 for(const selector of ['title','meta[name="description"]','meta[name="robots"]','link[rel="canonical"]'])assert.equal(doc.querySelector(selector).outerHTML,before.window.document.querySelector(selector).outerHTML,item.code+selector);
 for(const img of doc.images){assert(img.alt.trim(),item.code);if(new URL(img.src).origin==='https://skillrhub.com')assert(fs.existsSync(path.join(process.cwd(),new URL(img.src).pathname)),img.src);}
 for(const a of doc.querySelectorAll('a[href]')){const u=new URL(a.href);if(u.origin==='https://skillrhub.com'){let file=path.join(process.cwd(),u.pathname,u.pathname.endsWith('/')?'index.html':'');assert(fs.existsSync(file),item.code+u.pathname);if(u.pathname===new URL(dom.window.location).pathname&&u.hash)assert(doc.getElementById(u.hash.slice(1)),item.code+u.hash);}}
 assert.equal(doc.querySelectorAll('[data-learning-navigation-links]').length,1,item.code);
 assert.equal(doc.querySelectorAll('#skillr-topic-practice-now').length,1,item.code);
 const target=new URL(doc.querySelector('#skillr-topic-practice-now').href);assert.equal(target.searchParams.get('returnTo'),doc.querySelector('link[rel="canonical"]').href);
 assert.equal(target.searchParams.has('skill'),item.publishedPractice,item.code);if(item.publishedPractice)assert.equal(target.searchParams.get('skill'),item.code);
 for(const e of doc.querySelectorAll('details')){const s=e.querySelector(':scope > summary');assert(s,item.code);const state=e.open;s.click();assert.equal(e.open,!state);s.click();assert.equal(e.open,state);disclosures++;}
 dom.window.close();before.window.close();
}
console.log(`PASS 9 Foundation pages; ${sections} reviewed educational sections retained; ${disclosures} native disclosure checks; source/DOM only.`);
