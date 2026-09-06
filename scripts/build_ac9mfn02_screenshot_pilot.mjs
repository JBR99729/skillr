#!/usr/bin/env node
import fs from 'node:fs';

const file = 'foundation/maths/ac9mfn02-and-name-the-number-of-objects-within-a-collection-up/teacher-slides/index.html';
let html = fs.readFileSync(file, 'utf8');

const visualSlides = [
  ['Recognise a quantity with a quick look', 'topic-example-01.png', 'E1 topic-page teaching example'],
  ['Match, compare and order arrangements', 'topic-example-02.png', 'E2 topic-page teaching example'],
].map(([title, image, alt], index) => `<figure class="fixed-slide-viewer__slide" data-slide data-slide-kind="topic-screenshot" hidden><header><p>Foundation Maths • AC9MFN02</p><span>${6 + index} / 12</span></header><div class="slide-content screenshot-content"><h2>${title}</h2><div class="topic-screenshot"><img src="${image}" alt="${alt}"></div></div><footer>AC9MFN02 • Topic-page screenshot • SkillrHub</footer></figure>`).join('');

html = html.replace(/(<figure class="fixed-slide-viewer__slide" data-slide data-slide-kind="important-questions")/, `${visualSlides}$1`);
let number = 0;
html = html.replace(/(<header><p>Foundation Maths • AC9MFN02<\/p><span>)\d+ \/ \d+(<\/span>)/g, (_, before, after) => `${before}${++number} / 12${after}`);
html = html.replace(/<span data-slide-counter>1 \/ \d+<\/span>/, '<span data-slide-counter>1 / 12</span>');
html = html.replace('.slide-content{position:relative;', '.slide-content{color:#17243a;background:#fff;position:relative;');
html = html.replace('.slide-content h2{', '.slide-content p,.slide-content li,.slide-content dd{color:#17243a}.slide-content h2{');
html = html.replace('</style>', '.screenshot-content{padding-top:28px}.topic-screenshot{height:430px;display:grid;place-items:center;border:2px solid #c7d5e8;border-radius:15px;overflow:hidden;background:#f8fbff}.topic-screenshot img{display:block;max-width:100%;max-height:100%;width:auto;height:auto}</style>');
html = html.replace('<script src="/assets/teacher-slide-viewer.js?v=1"></script>', `<script>(()=>{const root=document.querySelector('[data-fixed-slide-viewer]'),slides=[...root.querySelectorAll('[data-slide]')],previous=root.querySelector('[data-slide-previous]'),next=root.querySelector('[data-slide-next]'),counter=root.querySelector('[data-slide-counter]'),fullscreen=root.querySelector('[data-slide-fullscreen]');let index=0;const show=value=>{index=Math.max(0,Math.min(slides.length-1,value));slides.forEach((slide,i)=>slide.hidden=i!==index);previous.disabled=index===0;next.disabled=index===slides.length-1;counter.textContent=(index+1)+' / '+slides.length};previous.addEventListener('click',()=>show(index-1));next.addEventListener('click',()=>show(index+1));fullscreen.addEventListener('click',async()=>{try{if(!document.fullscreenElement)await root.requestFullscreen();else await document.exitFullscreen()}catch{}});document.addEventListener('keydown',event=>{if(['ArrowLeft','PageUp'].includes(event.key))show(index-1);if(['ArrowRight','PageDown',' '].includes(event.key))show(index+1)});show(0)})();</script>`);

fs.writeFileSync(file, html);
console.log('Built AC9MFN02 screenshot pilot: 12 slides, 2 topic screenshots');
