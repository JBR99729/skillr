#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const subjects = ['maths','english','science'];
const rows = [];
const failures = [];
const read = p => fs.existsSync(p) ? fs.readFileSync(p,'utf8') : '';
const norm = p => p.split(path.sep).join('/');

function anchors(html){
  return [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)].map(m=>({href:m[1],text:m[2].replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim()}));
}
function teacherDownload(html){
  return anchors(html).some(a=>/\.(?:pdf|pptx)(?:[?#]|$)/i.test(a.href) && /teacher|slide|deck/i.test(`${a.text} ${a.href}`));
}
function findViewer(topicDir, html){
  const local = [path.join(topicDir,'teacher-slides','index.html'),path.join(topicDir,'teacher-deck','index.html')].filter(fs.existsSync);
  if (local.length === 1) return {type:'local',file:local[0]};
  if (local.length > 1) return {type:'ambiguous',files:local};
  const links = anchors(html).filter(a=>/teacher|slide|deck/i.test(`${a.text} ${a.href}`));
  const fixedShared = links.find(a=>/\/worksheets\/year[1-7]\/(?:maths|science|english)\/teacher-slides\/viewer\//i.test(a.href));
  return fixedShared ? {type:'shared-fixed',href:fixedShared.href} : null;
}
function localAssets(viewerFile, viewer){
  const dir = path.dirname(viewerFile);
  const files = fs.existsSync(dir) ? fs.readdirSync(dir) : [];
  return files.filter(f=>/^slide[-_]?\d+\.(?:png|jpe?g|webp|svg)$/i.test(f));
}

for (let year=1; year<=7; year++) for (const subject of subjects) {
  const curriculumIndex = path.join(`year${year}`,'curriculum',subject,'index.html');
  if (!fs.existsSync(curriculumIndex)) { failures.push(`MISSING curriculum index: ${curriculumIndex}`); continue; }
  const idx = read(curriculumIndex);
  const re = subject==='maths' ? new RegExp(`AC9M${year}[A-Z][0-9]{2}`,'gi') : subject==='english' ? new RegExp(`AC9E${year}[A-Z]{2}[0-9]{2}`,'gi') : new RegExp(`AC9S${year}[A-Z][0-9]{2}`,'gi');
  const codes = [...new Set((idx.match(re)||[]).map(x=>x.toUpperCase()))].sort();
  if (!codes.length) failures.push(`NO curriculum codes found: ${curriculumIndex}`);
  const root = path.join(`year${year}`,subject);
  const dirs = fs.existsSync(root) ? fs.readdirSync(root,{withFileTypes:true}).filter(x=>x.isDirectory()).map(x=>x.name) : [];

  for (const code of codes) {
    const issues=[];
    const matches=dirs.filter(d=>d.toLowerCase()===code.toLowerCase()||d.toLowerCase().startsWith(code.toLowerCase()+'-'));
    let topicFile='', viewerDesc='', slideCount=0;
    if(matches.length!==1){issues.push(`expected exactly one topic directory, found ${matches.length}`);} else {
      const topicDir=path.join(root,matches[0]); topicFile=path.join(topicDir,'index.html');
      if(!fs.existsSync(topicFile)) issues.push('missing Topic Guide index.html'); else {
        const html=read(topicFile); const text=html.replace(/<script[\s\S]*?<\/script>/gi,'').replace(/<style[\s\S]*?<\/style>/gi,'');
        if(!/<details\b/i.test(html)||!/<summary\b/i.test(html)) issues.push('Topic Guide is not native dropdown HTML');
        if(/\bLoading(?:…|\.\.\.)/i.test(text)||/id=["'](?:topicRoot|year\d+Topic)["']/i.test(html)) issues.push('Topic Guide is a runtime Loading shell');
        if(/(?:year\d+-(?:maths|science|english)-(?:render|topic)|topic-modules-render|lesson-render|lower-materials-render|foundation-[^"']*render)\.js/i.test(html)) issues.push('Topic Guide depends on a curriculum renderer');
        if(!/What students learn|Key concept|Learning intention|Learning goal|Curriculum coverage/i.test(text)) issues.push('Topic Guide appears to lack static teaching content');
        if(teacherDownload(html)) issues.push('Topic Guide exposes a direct Teacher Slide PDF/PPTX');
        const found=findViewer(topicDir,html);
        if(!found) issues.push('no Teacher Slide viewer link found');
        else if(found.type==='ambiguous') issues.push(`multiple local Teacher Slide viewers found (${found.files.length})`);
        else if(found.type==='shared-fixed') {
          viewerDesc=found.href;
          if(!/[?&]code=AC9/i.test(found.href)) issues.push('shared fixed viewer link does not identify curriculum code');
        } else {
          const viewerFile=found.file, viewer=read(viewerFile), assets=localAssets(viewerFile,viewer); viewerDesc=norm(viewerFile); slideCount=assets.length;
          if(!assets.length && !/<img\b[^>]+src=["'][^"']+\.(?:png|jpe?g|webp|svg)/i.test(viewer)) issues.push('Teacher Slide viewer has no fixed pre-rendered slide images');
          if(!/(?:Previous|Next|data-slide-(?:previous|next)|aria-label=["']Next slide)/i.test(viewer)) issues.push('Teacher Slide viewer lacks page-by-page navigation');
          if(/(?:lower-materials-render|topic-modules-render|lesson-render|teachingSlides|\.slides\.forEach|render\w*slide)/i.test(viewer)) issues.push('Teacher Slides are assembled at runtime');
          if(teacherDownload(viewer)||/\bdownload\s*=/i.test(viewer)) issues.push('Teacher Slide viewer exposes PDF/PPTX download');
        }
      }
    }
    rows.push({year,subject,code,topic:norm(topicFile),viewer:viewerDesc,slides:slideCount,issues});
    for(const issue of issues) failures.push(`${code}: ${issue}`);
  }
}

console.log(`DISCOVERED ${rows.length} unique curriculum codes across Years 1-7.`);
for(let y=1;y<=7;y++){
  const yr=rows.filter(r=>r.year===y), bad=yr.filter(r=>r.issues.length);
  const bySub=subjects.map(s=>`${s}:${yr.filter(r=>r.subject===s).length}`).join(' ');
  console.log(`Year ${y}: ${yr.length} codes (${bySub}); pass ${yr.length-bad.length}, fail ${bad.length}`);
}
console.log(`PASS ${rows.filter(r=>!r.issues.length).length}; FAIL ${rows.filter(r=>r.issues.length).length}.`);
if(failures.length){console.error(`ISSUES ${failures.length}:`);for(const f of failures)console.error(`- ${f}`);process.exit(1);}
console.log('YEARS 1-7 CURRICULUM RESOURCE AUDIT: PASS');
