import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {runInNewContext} from 'node:vm';
import {parseHTML} from 'linkedom';

test('homepage leads with free value, year shortcuts and installation, with sales only in footer',async()=>{
 const {document}=parseHTML(await readFile('index.html','utf8'));
 const hero=document.querySelector('main>section');assert(hero.classList.contains('home-free-practice'));
 assert.match(hero.textContent,/20 free/);assert.equal(hero.querySelectorAll('.home-practice-years a').length,6);
 for(const a of hero.querySelectorAll('.home-practice-years a')){const u=new URL(a.href);assert.equal(u.searchParams.get('quick'),'1');assert.match(u.searchParams.get('year'),/^[0-5]$/);}
 assert(hero.querySelector('a[href*="install=1"]'));assert.equal(document.querySelector('main .home-product-proof'),null);assert.equal(document.querySelector('main .home-samples'),null);
 assert.equal(document.querySelectorAll('main a[href*="product.html"],main a[href*="teacherspayteachers"],main a[href="/print-and-go.html"]').length,0);
 assert(document.querySelector('footer a[href*="teacherspayteachers"]'));assert(!document.querySelector('header a[href="/print-and-go.html"]'));
});
async function topic(path,enabled=[]){
 const {document,window}=parseHTML('<html><head></head><body><div class="curriculum-page"><nav class="breadcrumb">Home / Topic</nav><a class="topic-skip">Skip</a><section class="topic-video-lesson">Existing video</section><main><h1>Existing lesson</h1><p>Keep this teaching.</p><a href="/quiz/year-1/math/ac9m1n01/practice/">Legacy Practice</a></main></div></body></html>');
 window.__skillrResourceLinks=false;window.__skillrCompanionLoaderRequested=false;window.location={pathname:path};let requests=0;
 const context={window,document,AbortController,setTimeout,clearTimeout,URL,CustomEvent:window.CustomEvent,fetch:async()=>{requests++;return {ok:true,json:async()=>({codes:enabled.map(code=>({code}))})};}};
 const source=await readFile('assets/resource-links.js','utf8');runInNewContext(source,context);await new Promise(setImmediate);
 return {document,window,context,source,requests};
}
test('topic entry sits before the video and retains the exact topic code and original learning',async()=>{
 const h=await topic('/year1/maths/ac9m1n01-numbers-to-120/',['AC9M1N01']);const p=h.document.querySelector('#skillr-topic-practice-entry');assert(p);assert.equal(p.nextElementSibling.className,'topic-video-lesson');
 const link=p.querySelector('[data-practice-placement]');assert.equal(new URL(link.href).searchParams.get('skill'),'AC9M1N01');assert.match(link.textContent,/Practise this topic/);assert.match(h.document.querySelector('main').textContent,/Keep this teaching/);assert(h.document.querySelector('main a[href^="/quiz/"]'));
 runInNewContext(h.source,h.context);assert.equal(h.document.querySelectorAll('#skillr-topic-practice-entry').length,1);
});
test('unavailable topic keeps a truthful bank entry; teacher slides and non-topic pages get no injected panel',async()=>{
 const unknown=await topic('/year10/science/ac9s10u01-example/');assert.equal(unknown.document.querySelector('[data-practice-placement]').textContent,'Start free practice →');
 for(const path of ['/','/year1/curriculum/maths/','/year1/maths/ac9m1n01-numbers-to-120/teacher-slides/']){const h=await topic(path);assert.equal(h.document.querySelector('#skillr-topic-practice-entry'),null);}
});

test('sticky bar is green practice navigation, dismissible for the session and stays dismissed after fullscreen',async()=>{
 const h=await topic('/year1/maths/ac9m1n01-numbers-to-120/',['AC9M1N01']),bar=h.document.querySelector('.skillr-practice-bar');assert(bar);assert.equal(bar.querySelectorAll('a').length,1);assert.match(bar.querySelector('a').href,/skill=AC9M1N01/);assert.equal(bar.querySelector('[data-practice-placement]').dataset.practicePlacement,'sticky_bar');
 bar.querySelector('button').click();assert(bar.hidden);h.document.dispatchEvent(new h.window.Event('fullscreenchange'));assert(bar.hidden);
});
