#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const topicDir='year7/maths/ac9m7n06-the-4-operations-with-positive-rational-numbers-including';
const deckDir=path.join(topicDir,'teacher-deck');
const deckFile=path.join(deckDir,'index.html');
const topicFile=path.join(topicDir,'index.html');
const legacySlides=path.join(topicDir,'teacher-slides');
const original=fs.readFileSync(deckFile,'utf8');

const decode=s=>String(s||'').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#39;|&apos;/g,"'").replace(/&ne;|≠/g,'≠').replace(/&times;|×/g,'×').replace(/&divide;|÷/g,'÷').replace(/&rarr;|→/g,'→').replace(/&ndash;/g,'–').replace(/&mdash;/g,'—');
const strip=s=>decode(String(s||'').replace(/<br\s*\/?>/gi,' ').replace(/<[^>]+>/g,' ')).replace(/\s+/g,' ').trim();
const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
function wrap(text,max=70){const words=String(text||'').split(/\s+/).filter(Boolean),out=[];let line='';for(const w of words){const n=line?`${line} ${w}`:w;if(n.length>max&&line){out.push(line);line=w}else line=n}if(line)out.push(line);return out;}
function chunks(a,n){const out=[];for(let i=0;i<a.length;i+=n)out.push(a.slice(i,i+n));return out;}

const sections=[...original.matchAll(/<section\b[^>]*class=["'][^"']*\bslide\b[^"']*["'][^>]*>([\s\S]*?)<\/section>/gi)].map(m=>m[1]);
if(sections.length<10) throw new Error(`Expected expanded deck, found only ${sections.length} slides`);
const pages=[];
for(const section of sections){
  const titleMatch=section.match(/<h[12]\b[^>]*>([\s\S]*?)<\/h[12]>/i);
  const title=strip(titleMatch?.[1]||'Rational Number Operations');
  let body=section.replace(titleMatch?.[0]||'','');
  const blocks=[];
  for(const m of body.matchAll(/<(?:p|li|h3)\b[^>]*>([\s\S]*?)<\/(?:p|li|h3)>/gi)){
    const t=strip(m[1]); if(t) blocks.push(t);
  }
  if(!blocks.length){const t=strip(body);if(t)blocks.push(t);}
  const lines=[];
  for(const block of blocks){lines.push(...wrap(block,68));}
  const groups=chunks(lines.length?lines:[''],12);
  groups.forEach((g,i)=>pages.push({title:i?`${title} — continued`:title,lines:g}));
}

for(const f of fs.readdirSync(deckDir)) if(/^slide-\d+\.(?:svg|png|jpe?g|webp)$/i.test(f)) fs.rmSync(path.join(deckDir,f));
function svg(page,index,total){
  const titleLines=wrap(page.title,46).slice(0,2);
  const bodyY=titleLines.length>1?240:195;
  const font=page.lines.length>9?29:32;
  const lineGap=font+17;
  const titleSvg=titleLines.map((t,i)=>`<text x="86" y="${145+i*58}" font-family="Arial,Helvetica,sans-serif" font-size="48" font-weight="800" fill="#173968">${esc(t)}</text>`).join('');
  const bodySvg=page.lines.map((t,i)=>`<text x="104" y="${bodyY+i*lineGap}" font-family="Arial,Helvetica,sans-serif" font-size="${font}" font-weight="520" fill="#203b55">${esc(t)}</text>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900"><rect width="1600" height="900" fill="#f8fbff"/><rect width="1600" height="84" fill="#173968"/><text x="72" y="55" font-family="Arial,Helvetica,sans-serif" font-size="28" font-weight="700" fill="#fff">AC9M7N06 • Year 7 Maths • SkillrHub</text><text x="1528" y="55" text-anchor="end" font-family="Arial,Helvetica,sans-serif" font-size="23" fill="#dbeafe">${index+1} / ${total}</text>${titleSvg}<rect x="72" y="${bodyY-48}" width="1456" height="${Math.min(535,Math.max(180,page.lines.length*lineGap+70))}" rx="24" fill="#fff" stroke="#c5d8ea" stroke-width="3"/>${bodySvg}<text x="800" y="770" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="70" font-weight="800" fill="#173968" opacity="0.05">SKILLRHUB.COM</text><line x1="72" y1="822" x2="1528" y2="822" stroke="#c7d8e8" stroke-width="2"/><text x="72" y="860" font-family="Arial,Helvetica,sans-serif" font-size="23" font-weight="700" fill="#173968">AC9M7N06 • SkillrHub • skillrhub.com</text><text x="1528" y="860" text-anchor="end" font-family="Arial,Helvetica,sans-serif" font-size="20" fill="#607991">Fixed classroom display • ${index+1}/${total}</text></svg>`;
}
pages.forEach((p,i)=>fs.writeFileSync(path.join(deckDir,`slide-${String(i+1).padStart(2,'0')}.svg`),svg(p,i,pages.length)));
const figures=pages.map((_,i)=>`<figure class="fixed-slide-viewer__slide" data-slide${i?' hidden':''}><img src="slide-${String(i+1).padStart(2,'0')}.svg" alt="AC9M7N06 teacher slide ${i+1} of ${pages.length}" draggable="false"></figure>`).join('');
fs.writeFileSync(deckFile,`<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><title>AC9M7N06 Teacher Slides | SkillrHub</title><link rel="stylesheet" href="/style.css"><link rel="stylesheet" href="/assets/teacher-slide-viewer.css?v=1"><style>@media print{body>*{display:none!important}body:before{content:'SkillrHub Teacher Slides are for live classroom display.';display:block;padding:32px;font:700 20pt Arial}}</style></head><body oncontextmenu="return false"><nav class="main-nav"><a href="../">Topic Guide</a></nav><main style="padding:clamp(12px,3vw,32px)"><h1>AC9M7N06 Teacher Slides</h1><p>Year 7 Maths • SkillrHub • skillrhub.com</p><section class="fixed-slide-viewer" data-fixed-slide-viewer tabindex="0"><div class="fixed-slide-viewer__stage">${figures}</div><div class="fixed-slide-viewer__controls"><button type="button" data-slide-previous>Previous</button><span data-slide-counter>1 / ${pages.length}</span><button type="button" data-slide-next>Next</button><button type="button" data-slide-fullscreen>Fullscreen</button></div></section></main><script src="/assets/teacher-slide-viewer.js?v=1"></script><script>document.addEventListener('dragstart',e=>e.preventDefault());</script></body></html>\n`);

let topic=fs.readFileSync(topicFile,'utf8');
topic=topic.replace(/<p>The original one-page PDF remains\. The expanded deck adds explicit instruction, worked examples, strategy comparisons, real-life contexts, misconceptions and an exit ticket\.<\/p>/i,'<p>Open the complete fixed teaching sequence with explicit instruction, worked examples, strategy comparisons, real-life contexts, misconceptions and an exit ticket.</p>');
topic=topic.replace(/<a\b[^<]*href=["']teacher-slides\/["'][\s\S]*?<\/a>/gi,'');
topic=topic.replace(/>Teacher deck</gi,'>Teacher Slides<');
topic=topic.replace(/Open expanded teacher deck/gi,'Open Teacher Slides');
fs.writeFileSync(topicFile,topic);
fs.rmSync(legacySlides,{recursive:true,force:true});
console.log(`AC9M7N06: preserved ${sections.length} authored sections as ${pages.length} fixed branded slide pages; removed one-page duplicate viewer.`);
