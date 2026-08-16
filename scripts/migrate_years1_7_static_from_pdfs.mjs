#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT=process.cwd();
const subjects=['maths','english','science'];
const read=p=>fs.existsSync(p)?fs.readFileSync(p,'utf8'):'';
const write=(p,c)=>{fs.mkdirSync(path.dirname(p),{recursive:true});fs.writeFileSync(p,c);};
const anchors=html=>[...html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)].map(m=>({full:m[0],href:m[1],text:m[2].replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim()}));
const escapeHtml=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function codePattern(year,subject){return subject==='maths'?new RegExp(`AC9M${year}[A-Z][0-9]{2}`,'gi'):subject==='english'?new RegExp(`AC9E${year}[A-Z]{2}[0-9]{2}`,'gi'):new RegExp(`AC9S${year}[A-Z][0-9]{2}`,'gi');}
function findTopic(year,subject,code){const root=path.join(ROOT,`year${year}`,subject);if(!fs.existsSync(root))return null;const dirs=fs.readdirSync(root,{withFileTypes:true}).filter(d=>d.isDirectory()).map(d=>d.name);const hits=dirs.filter(d=>d.toLowerCase()===code.toLowerCase()||d.toLowerCase().startsWith(code.toLowerCase()+'-'));return hits.length===1?path.join(root,hits[0]):null;}
function teacherPdf(html){return anchors(html).find(a=>/\.pdf(?:[?#]|$)/i.test(a.href)&&/teacher|slide|deck/i.test(`${a.text} ${a.href}`));}
function hasGoodLocalViewer(topicDir){const v=path.join(topicDir,'teacher-slides','index.html');if(!fs.existsSync(v))return false;const h=read(v);return /(?:Previous|Next|data-slide-(?:previous|next))/i.test(h)&&/<img\b[^>]+src=["'][^"']+\.(?:png|jpe?g|webp|svg)/i.test(h)&&!/(?:lower-materials-render|topic-modules-render|lesson-render|teachingSlides|\.slides\.forEach)/i.test(h);}
function convertSections(html){
  if(/<details\b/i.test(html)&&/<summary\b/i.test(html))return html;
  return html.replace(/<section\b([^>]*class=["'][^"']*curriculum-topic-section[^"']*["'][^>]*)>([\s\S]*?)<\/section>/gi,(all,attrs,body)=>{
    const h=body.match(/<h2\b[^>]*>([\s\S]*?)<\/h2>/i); if(!h)return all;
    const title=h[1].replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
    const rest=body.replace(h[0],'');
    return `<details ${attrs}><summary><strong>${escapeHtml(title)}</strong></summary><div class="curriculum-detail-body">${rest}</div></details>`;
  });
}
function viewer(code,year,subject,count){
  const figures=Array.from({length:count},(_,i)=>`<figure class="fixed-slide-viewer__slide" data-slide${i?' hidden':''}><img src="slide-${String(i+1).padStart(2,'0')}.png" alt="${code} teacher slide ${i+1} of ${count}" draggable="false"></figure>`).join('');
  return `<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><title>${code} Teacher Slides | SkillrHub</title><link rel="stylesheet" href="/style.css"><link rel="stylesheet" href="/assets/teacher-slide-viewer.css?v=1"><style>@media print{body>*{display:none!important}body:before{content:'SkillrHub Teacher Slides are available for live classroom display.';display:block;padding:32px;font:700 20pt Arial}}</style></head><body oncontextmenu="return false"><nav class="main-nav"><a href="../">Topic Guide</a></nav><main style="padding:clamp(12px,3vw,32px)"><h1>${code} Teacher Slides</h1><p>Year ${year} ${escapeHtml(subject[0].toUpperCase()+subject.slice(1))} • SkillrHub • skillrhub.com</p><section class="fixed-slide-viewer" data-fixed-slide-viewer tabindex="0"><div class="fixed-slide-viewer__stage">${figures}</div><div class="fixed-slide-viewer__controls"><button type="button" data-slide-previous>Previous</button><span class="fixed-slide-viewer__counter" data-slide-counter>1 / ${count}</span><button type="button" data-slide-next>Next</button><button type="button" data-slide-fullscreen>Fullscreen</button></div></section></main><script src="/assets/teacher-slide-viewer.js?v=1"></script><script>document.addEventListener('dragstart',e=>e.preventDefault());</script></body></html>\n`;
}
function rasterise(pdfPath,outDir){
  fs.mkdirSync(outDir,{recursive:true});
  for(const f of fs.readdirSync(outDir))if(/^slide-\d+\.(?:png|jpe?g|webp|svg)$/i.test(f))fs.rmSync(path.join(outDir,f));
  const prefix=path.join(outDir,'page');
  execFileSync('pdftoppm',['-png','-r','144',pdfPath,prefix],{stdio:'inherit'});
  const pages=fs.readdirSync(outDir).filter(f=>/^page-\d+\.png$/i.test(f)).sort((a,b)=>Number(a.match(/\d+/)[0])-Number(b.match(/\d+/)[0]));
  pages.forEach((f,i)=>fs.renameSync(path.join(outDir,f),path.join(outDir,`slide-${String(i+1).padStart(2,'0')}.png`)));
  return pages.length;
}

let migrated=0,slides=0,skippedGood=0,unresolved=[];
for(let year=1;year<=7;year++)for(const subject of subjects){
  const idxPath=path.join(ROOT,`year${year}`,'curriculum',subject,'index.html'); if(!fs.existsSync(idxPath))continue;
  const codes=[...new Set((read(idxPath).match(codePattern(year,subject))||[]).map(x=>x.toUpperCase()))].sort();
  for(const code of codes){
    const topicDir=findTopic(year,subject,code); if(!topicDir){unresolved.push(`${code}: topic directory`);continue;}
    const topicFile=path.join(topicDir,'index.html'), original=read(topicFile); if(!original){unresolved.push(`${code}: topic html`);continue;}
    if(hasGoodLocalViewer(topicDir)&&/<details\b/i.test(original)){skippedGood++;continue;}
    const pdf=teacherPdf(original);
    if(!pdf){
      if(/\/worksheets\/year[1-7]\/(?:maths|science|english)\/teacher-slides\/viewer\//i.test(original)&&/<details\b/i.test(original)){skippedGood++;continue;}
      unresolved.push(`${code}: no source Teacher Slide PDF`);continue;
    }
    let repoPdf=pdf.href.split(/[?#]/)[0].replace(/^\//,'');
    const pdfPath=path.join(ROOT,repoPdf); if(!fs.existsSync(pdfPath)){unresolved.push(`${code}: missing source PDF ${repoPdf}`);continue;}
    const outDir=path.join(topicDir,'teacher-slides'); const count=rasterise(pdfPath,outDir); if(!count){unresolved.push(`${code}: PDF produced no pages`);continue;}
    write(path.join(outDir,'index.html'),viewer(code,year,subject,count));
    let html=convertSections(original);
    html=html.replace(/<script\b[^>]*src=["'][^"']*(?:lower-materials-render|topic-modules-render|lesson-render)[^"']*["'][^>]*><\/script>\s*/gi,'');
    html=html.replace(/<script\b[^>]*src=["'][^"']*lower-materials-lessons[^"']*["'][^>]*><\/script>\s*/gi,'');
    html=html.replace(pdf.full,pdf.full.replace(pdf.href,'teacher-slides/').replace(/target=["']_blank["']/i,'').replace(/Open[^<]*(?:PDF|slide)[^<]*/i,'Open Teacher Slides'));
    if(!/href=["']teacher-slides\/["']/i.test(html))html=html.replace(/(<a\b[^>]*href=["']#topic-guide["'][^>]*>[^<]*<\/a>)/i,`$1<a href="teacher-slides/">Teacher Slides</a>`);
    write(topicFile,html); migrated++; slides+=count;
  }
}
console.log(`MIGRATED ${migrated} Years 1-7 topic guides from existing Teacher Slide PDFs; generated ${slides} fixed slide pages; already-good ${skippedGood}.`);
console.log(`UNRESOLVED ${unresolved.length}`); for(const u of unresolved)console.log(`- ${u}`);
if(!migrated)throw new Error('No pages migrated');
