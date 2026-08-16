#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const subjects = ['maths','english','science'];
const failures = [];
const rows = [];

function read(p){ return fs.existsSync(p) ? fs.readFileSync(p,'utf8') : ''; }
function unique(a){ return [...new Set(a)]; }

for (let year=1; year<=7; year++) {
  for (const subject of subjects) {
    const curriculumIndex = path.join(`year${year}`,'curriculum',subject,'index.html');
    if (!fs.existsSync(curriculumIndex)) {
      failures.push(`MISSING curriculum index: ${curriculumIndex}`);
      continue;
    }
    const idx = read(curriculumIndex);
    const codePattern = subject === 'maths' ? new RegExp(`AC9M${year}[A-Z][0-9]{2}`,'gi') : subject === 'english' ? new RegExp(`AC9E${year}[A-Z]{2}[0-9]{2}`,'gi') : new RegExp(`AC9S${year}[A-Z][0-9]{2}`,'gi');
    const codes = unique(idx.match(codePattern) || []).map(x=>x.toUpperCase()).sort();
    if (!codes.length) failures.push(`NO curriculum codes found: ${curriculumIndex}`);

    const topicRoot = path.join(`year${year}`,subject);
    const dirs = fs.existsSync(topicRoot) ? fs.readdirSync(topicRoot,{withFileTypes:true}).filter(d=>d.isDirectory()).map(d=>d.name) : [];

    for (const code of codes) {
      const prefix = code.toLowerCase();
      const matches = dirs.filter(d=>d.toLowerCase().startsWith(prefix+'-') || d.toLowerCase()===prefix);
      if (matches.length !== 1) {
        failures.push(`${code}: expected exactly one topic directory under ${topicRoot}, found ${matches.length}`);
        continue;
      }
      const topicDir = path.join(topicRoot,matches[0]);
      const topicFile = path.join(topicDir,'index.html');
      if (!fs.existsSync(topicFile)) {
        failures.push(`${code}: missing Topic Guide ${topicFile}`);
        continue;
      }
      const html = read(topicFile);
      const hasDetails = /<details\b/i.test(html) && /<summary\b/i.test(html);
      const loadingShell = /id=["'](?:topicRoot|year\d+Topic|slideRoot)["'][^>]*>\s*(?:<p[^>]*>)?\s*Loading/i.test(html);
      const runtimeRenderer = /(?:year\d+-(?:maths|science|english)-(?:render|topic)|topic-modules-render|lesson-render|lower-materials-render|foundation-.*render)\.js/i.test(html);
      const directDeck = /href=["'][^"']+\.(?:pptx|pdf)(?:[?#][^"']*)?["']/i.test(html);
      const staticTeaching = /What students learn|Key concept|Learning intention|Learning goal/i.test(html.replace(/<script[\s\S]*?<\/script>/gi,''));
      if (!hasDetails) failures.push(`${code}: Topic Guide is not native dropdown HTML (<details>/<summary>)`);
      if (loadingShell) failures.push(`${code}: Topic Guide is still a runtime Loading shell`);
      if (runtimeRenderer) failures.push(`${code}: Topic Guide still depends on a curriculum renderer`);
      if (!staticTeaching) failures.push(`${code}: Topic Guide appears to lack static teaching content`);
      if (directDeck) failures.push(`${code}: Topic Guide exposes direct PDF/PPTX download`);

      const viewerCandidates = [
        path.join(topicDir,'teacher-slides','index.html'),
        path.join(topicDir,'teacher-deck','index.html')
      ].filter(fs.existsSync);
      if (viewerCandidates.length !== 1) {
        failures.push(`${code}: expected one fixed Teacher Slide viewer, found ${viewerCandidates.length}`);
        continue;
      }
      const viewerFile = viewerCandidates[0];
      const viewerDir = path.dirname(viewerFile);
      const viewer = read(viewerFile);
      const pngs = fs.readdirSync(viewerDir).filter(f=>/^slide-\d+\.png$/i.test(f));
      if (!pngs.length) failures.push(`${code}: Teacher Slide viewer has no pre-rendered slide PNG pages`);
      if (!/<img\b[^>]*(?:slide|teacher)/i.test(viewer) && !/data-slide-(?:src|image)/i.test(viewer)) failures.push(`${code}: Teacher Slide viewer does not reference fixed slide images`);
      if (!/(?:Previous|Next|aria-label=["']Next slide|data-next-slide)/i.test(viewer)) failures.push(`${code}: Teacher Slide viewer lacks page-by-page navigation`);
      if (/(?:teachingSlides|\.slides\.forEach|render.*slide|lower-materials-render|year\d+.*slides\.js|topic-modules-render|lesson-render)/i.test(viewer)) failures.push(`${code}: Teacher Slides are assembled at runtime`);
      if (/href=["'][^"']+\.(?:pptx|pdf)(?:[?#][^"']*)?["']/i.test(viewer) || /download\s*=/i.test(viewer)) failures.push(`${code}: Teacher Slide viewer exposes direct PDF/PPTX download`);
      if (!html.includes('teacher-slides/') && !html.includes('teacher-deck/')) failures.push(`${code}: Topic Guide does not link to its fixed Teacher Slide viewer`);

      rows.push({year,subject,code,topic:topicFile,viewer:viewerFile,slides:pngs.length});
    }
  }
}

console.log(`AUDITED ${rows.length} curriculum codes across Years 1-7.`);
for (let y=1;y<=7;y++) {
  const yr=rows.filter(r=>r.year===y);
  const bySub=subjects.map(s=>`${s}:${yr.filter(r=>r.subject===s).length}`).join(' ');
  console.log(`Year ${y}: ${yr.length} codes (${bySub})`);
}
if (failures.length) {
  console.error(`FAILURES ${failures.length}:`);
  for (const f of failures) console.error(`- ${f}`);
  process.exit(1);
}
console.log('YEARS 1-7 CURRICULUM RESOURCE AUDIT: PASS');
