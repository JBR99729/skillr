#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const ROOT=process.cwd();
const read=p=>fs.readFileSync(path.join(ROOT,p),'utf8');
const write=(p,c)=>{const f=path.join(ROOT,p);fs.mkdirSync(path.dirname(f),{recursive:true});fs.writeFileSync(f,c);};
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
const hesc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function loadLesson(file, pick){
  const sandbox={window:{},console};
  vm.createContext(sandbox);
  vm.runInContext(read(file),sandbox,{filename:file});
  return pick(sandbox.window);
}
function wrap(text,max=64){
  const words=String(text??'').replace(/\s+/g,' ').trim().split(' ').filter(Boolean), lines=[]; let line='';
  for(const w of words){const next=line?`${line} ${w}`:w;if(next.length>max&&line){lines.push(line);line=w}else line=next}if(line)lines.push(line);return lines;
}
function textBlock(lines,x,y,{size=34,weight=500,fill='#173968',line=46}={}){
  return lines.map((t,i)=>`<text x="${x}" y="${y+i*line}" font-family="Arial,Helvetica,sans-serif" font-size="${size}" font-weight="${weight}" fill="${fill}">${esc(t)}</text>`).join('');
}
function svgFor(lesson,slide,index,total){
  const key=Array.isArray(slide.display?.keyText)?slide.display.keyText:[];
  const title=wrap(slide.title,48).slice(0,2);
  const purpose=wrap(slide.purpose,72).slice(0,2);
  const prompt=wrap(slide.display?.studentPrompt||'',66).slice(0,3);
  const teacher=wrap(slide.teacherLayer?.teacherSaysOrAsks||slide.teacherLayer?.teacherDoes||'',78).slice(0,3);
  const keyLines=key.flatMap(k=>wrap(`• ${k}`,58)).slice(0,6);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900" role="img" aria-labelledby="t d">
<title id="t">${esc(lesson.code)} teacher slide ${index+1}: ${esc(slide.title)}</title><desc id="d">${esc(slide.purpose||'')}</desc>
<rect width="1600" height="900" fill="#f7fbff"/><rect x="0" y="0" width="1600" height="86" fill="#173968"/>
<text x="64" y="56" font-family="Arial,Helvetica,sans-serif" font-size="29" font-weight="700" fill="#fff">${esc(lesson.code)} • ${esc(lesson.year)} ${esc(lesson.subject)} • SkillrHub</text>
<text x="1530" y="56" text-anchor="end" font-family="Arial,Helvetica,sans-serif" font-size="24" fill="#dbeafe">${index+1} / ${total}</text>
${textBlock(title,72,150,{size:48,weight:800,fill:'#102f56',line:56})}
${textBlock(purpose,74,260,{size:27,weight:500,fill:'#526a82',line:38})}
<rect x="70" y="345" width="700" height="360" rx="26" fill="#ffffff" stroke="#bad1e7" stroke-width="3"/>
<text x="108" y="399" font-family="Arial,Helvetica,sans-serif" font-size="25" font-weight="800" fill="#173968">KEY IDEAS</text>
${textBlock(keyLines.length?keyLines:['• Observe, compare and explain with evidence'],110,452,{size:30,weight:600,fill:'#173968',line:46})}
<rect x="825" y="345" width="705" height="175" rx="26" fill="#e8f3ff" stroke="#9ec5ea" stroke-width="3"/>
<text x="862" y="398" font-family="Arial,Helvetica,sans-serif" font-size="25" font-weight="800" fill="#173968">ASK STUDENTS</text>
${textBlock(prompt,864,446,{size:29,weight:650,fill:'#102f56',line:40})}
<rect x="825" y="545" width="705" height="160" rx="26" fill="#fff8e8" stroke="#e8c46c" stroke-width="3"/>
<text x="862" y="596" font-family="Arial,Helvetica,sans-serif" font-size="24" font-weight="800" fill="#704d00">TEACHER PROMPT</text>
${textBlock(teacher,864,640,{size:25,weight:550,fill:'#5b4a22',line:34})}
<text x="800" y="785" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="66" font-weight="800" fill="#173968" opacity="0.055">SKILLRHUB.COM</text>
<line x1="70" y1="824" x2="1530" y2="824" stroke="#c7d8e8" stroke-width="2"/>
<text x="72" y="862" font-family="Arial,Helvetica,sans-serif" font-size="23" font-weight="700" fill="#173968">${esc(lesson.code)} • SkillrHub • skillrhub.com</text>
<text x="1528" y="862" text-anchor="end" font-family="Arial,Helvetica,sans-serif" font-size="20" fill="#607991">Fixed classroom display • ${index+1}/${total}</text>
</svg>`;
}
function viewer(lesson,total){
  const figs=Array.from({length:total},(_,i)=>`<figure class="fixed-slide-viewer__slide" data-slide${i?' hidden':''}><img src="slide-${String(i+1).padStart(2,'0')}.svg" alt="${hesc(lesson.code)} teacher slide ${i+1} of ${total}" draggable="false"></figure>`).join('');
  return `<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><title>${hesc(lesson.code)} Teacher Slides | SkillrHub</title><link rel="stylesheet" href="/style.css"><link rel="stylesheet" href="/assets/teacher-slide-viewer.css?v=1"><style>@media print{body>*{display:none!important}body:before{content:'SkillrHub Teacher Slides are for live classroom display.';display:block;padding:32px;font:700 20pt Arial}}</style></head><body oncontextmenu="return false"><nav class="main-nav"><a href="../">Topic Guide</a></nav><main style="padding:clamp(12px,3vw,32px)"><h1>${hesc(lesson.code)} Teacher Slides</h1><p>${hesc(lesson.year)} ${hesc(lesson.subject)} • SkillrHub • skillrhub.com</p><section class="fixed-slide-viewer" data-fixed-slide-viewer tabindex="0"><div class="fixed-slide-viewer__stage">${figs}</div><div class="fixed-slide-viewer__controls"><button type="button" data-slide-previous>Previous</button><span data-slide-counter>1 / ${total}</span><button type="button" data-slide-next>Next</button><button type="button" data-slide-fullscreen>Fullscreen</button></div></section></main><script src="/assets/teacher-slide-viewer.js?v=1"></script><script>document.addEventListener('dragstart',e=>e.preventDefault());</script></body></html>\n`;
}
function dropdownify(html){
  if(/<details\b/i.test(html)&&/<summary\b/i.test(html))return html;
  return html.replace(/<section\b([^>]*class=["'][^"']*curriculum-topic-section[^"']*["'][^>]*)>([\s\S]*?)<\/section>/gi,(all,attrs,body)=>{
    const m=body.match(/<h2\b[^>]*>([\s\S]*?)<\/h2>/i);if(!m)return all;
    const title=m[1].replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
    return `<details ${attrs}><summary><strong>${hesc(title)}</strong></summary><div class="curriculum-detail-body">${body.replace(m[0],'')}</div></details>`;
  });
}

const jobs=[
  {code:'AC9S2U03',topic:'year2/science/ac9s2u03-that-materials-can-be-changed-physically-without-changing-their',source:'assets/lower-materials-lessons.js',pick:w=>w.skillrLowerMaterialsLessons?.AC9S2U03},
  {code:'AC9S3U04',topic:'year3/science/ac9s3u04-investigate-the-observable-properties-of-solids-and-liquids-and',source:'assets/ac9s3u04-lesson.js',pick:w=>w.skillrLesson}
];
for(const job of jobs){
  const lesson=loadLesson(job.source,job.pick);if(!lesson||lesson.code!==job.code)throw new Error(`Unable to load canonical lesson ${job.code}`);
  const deck=`${job.topic}/teacher-deck`;
  for(const f of fs.readdirSync(path.join(ROOT,deck)))if(/^slide-\d+\.(?:svg|png|jpe?g|webp)$/i.test(f))fs.rmSync(path.join(ROOT,deck,f));
  lesson.slides.forEach((s,i)=>write(`${deck}/slide-${String(i+1).padStart(2,'0')}.svg`,svgFor(lesson,s,i,lesson.slides.length)));
  write(`${deck}/index.html`,viewer(lesson,lesson.slides.length));
  let topic=dropdownify(read(`${job.topic}/index.html`));
  topic=topic.replace(/<script\b[^>]*src=["'][^"']*(?:lower-materials-lessons|lower-materials-render|ac9s3u04-lesson|ac9s3u04-render)[^"']*["'][^>]*><\/script>\s*/gi,'');
  write(`${job.topic}/index.html`,topic);
  console.log(`${job.code}: ${lesson.slides.length} canonical slides rendered as fixed branded SVG pages`);
}
console.log('FINAL RUNTIME-ONLY SCIENCE STATIC MIGRATION: PASS');
