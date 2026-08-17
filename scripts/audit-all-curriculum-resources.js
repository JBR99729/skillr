#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const CODE_RE = /\bAC9[A-Z][A-Z0-9]{3,10}\b/gi;
const HTML_EXT = /\.html?$/i;
const VOID = new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);
const files = [];

function walk(dir='.') {
  for (const ent of fs.readdirSync(dir,{withFileTypes:true})) {
    if (['.git','node_modules'].includes(ent.name)) continue;
    const p = path.join(dir,ent.name);
    if (ent.isDirectory()) walk(p); else files.push(norm(p));
  }
}
function norm(p){ return p.split(path.sep).join('/').replace(/^\.\//,''); }
function read(p){ try { return fs.readFileSync(path.join(ROOT,p),'utf8'); } catch { return ''; } }
function existsFile(p){ return !!p && fs.existsSync(path.join(ROOT,p)) && fs.statSync(path.join(ROOT,p)).isFile(); }
function stripQuery(s){ return s.split('#')[0].split('?')[0]; }
function cleanText(s){ return String(s||'').replace(/<script\b[\s\S]*?<\/script>/gi,' ').replace(/<style\b[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ').replace(/&[a-z0-9#]+;/gi,' ').replace(/\s+/g,' ').trim(); }
function anchors(html){ return [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)].map(m=>{const h=m[1].match(/\bhref\s*=\s*["']([^"']+)["']/i);return {href:h?h[1]:'',text:cleanText(m[2]),raw:m[0]};}); }
function attrs(html,tag,attr){ const out=[]; const re=new RegExp(`<${tag}\\b[^>]*\\b${attr}\\s*=\\s*["']([^"']+)["'][^>]*>`,'gi'); for(const m of html.matchAll(re)) out.push(m[1]); return out; }
function uniq(a){ return [...new Set(a.filter(Boolean))]; }

walk('.');
const fileSet = new Set(files);

// The authoritative inventory is discovered from every static Australian Curriculum index.
const curriculumIndexes = files.filter(p=>/^(foundation|year\d+)\/curriculum\/[^/]+\/index\.html$/i.test(p));
const discovered = new Map();
for (const indexPath of curriculumIndexes) {
  const html = read(indexPath);
  const year = indexPath.split('/')[0];
  const subject = indexPath.split('/')[2];
  const codeSet = uniq((html.match(CODE_RE)||[]).map(x=>x.toUpperCase()));
  for (const code of codeSet) {
    if (!discovered.has(code)) discovered.set(code,{code,year,subject,indexes:new Set(),indexLinks:new Set()});
    const item=discovered.get(code); item.indexes.add(indexPath);
    for (const a of anchors(html)) if (`${a.text} ${a.href}`.toUpperCase().includes(code)) item.indexLinks.add(a.href);
  }
}

function sameSitePath(url){
  if(!url) return '';
  if(/^(mailto:|tel:|javascript:|data:|#)/i.test(url)) return '';
  try {
    if(/^https?:\/\//i.test(url)) {
      const u=new URL(url); if(!/(^|\.)skillrhub\.com$/i.test(u.hostname)) return '';
      return decodeURIComponent(u.pathname).replace(/^\//,'');
    }
  } catch { return '__INVALID__'; }
  return stripQuery(url).replace(/^\//,'');
}
function resolveLocal(fromFile,href){
  const raw=sameSitePath(href); if(!raw || raw==='__INVALID__') return raw;
  const p = href.startsWith('/') || /^https?:\/\//i.test(href) ? raw : norm(path.join(path.dirname(fromFile),raw));
  return p.replace(/\/$/,'');
}
function resolveTarget(fromFile,href){
  const p=resolveLocal(fromFile,href); if(!p || p==='__INVALID__') return {path:p,exists:p!=='__INVALID__',file:''};
  const candidates=[p,`${p}.html`,`${p}/index.html`];
  const file=candidates.find(x=>fileSet.has(x));
  return {path:p,exists:!!file,file:file||''};
}
function topicCandidates(item){
  const root=`${item.year}/${item.subject}`.toLowerCase();
  const code=item.code.toLowerCase();
  return files.filter(p=>p.toLowerCase().startsWith(root+'/') && p.toLowerCase().endsWith('/index.html') && p.toLowerCase().split('/').some(seg=>seg===code || seg.startsWith(code+'-')) && !/\/(teacher-slides|teacher-deck|practice|test)\//i.test(p));
}
function preferredTopic(item){
  const byIndex=[];
  for(const href of item.indexLinks){
    for(const idx of item.indexes){ const t=resolveTarget(idx,href); if(t.file && t.file.toLowerCase().includes(item.code.toLowerCase())) byIndex.push(t.file); }
  }
  const indexed=uniq(byIndex); if(indexed.length===1) return {file:indexed[0],duplicates:[]};
  const candidates=uniq(topicCandidates(item));
  if(indexed.length>1) return {file:indexed[0],duplicates:indexed.slice(1)};
  return {file:candidates[0]||'',duplicates:candidates.slice(1)};
}
function findLink(html,kind){
  const tests={
    slides:/teacher\s*slides?|teacher\s*deck|slide\s*deck/i,
    worksheet:/worksheet/i,
    practice:/practice/i,
    test:/(^|\b)test(\b|$)|assessment/i
  };
  return anchors(html).find(a=>a.href && tests[kind].test(`${a.text} ${a.href}`));
}
function expectedQuiz(item,kind){
  const n=(item.year.match(/\d+/)||[])[0]; if(!n) return '';
  const sub=item.subject.toLowerCase()==='maths'?'math':item.subject.toLowerCase();
  return `quiz/year-${n}/${sub}/${item.code.toLowerCase()}/${kind}/index.html`;
}
function htmlStructure(html){
  if(!/^\s*<!doctype\s+html/i.test(html) || !/<html\b/i.test(html) || !/<head\b/i.test(html) || !/<body\b/i.test(html) || !/<\/html>\s*$/i.test(html.trim())) return false;
  if(/\b(?:href|src|class|id)\s*=\s*["'][^"'>]*>[\s\S]{0,20}["']/i.test(html)) return false;
  return true;
}
function staticTopic(html){
  const text=cleanText(html);
  return !(/\bLoading(?:…|\.\.\.)/i.test(text) || /id=["'](?:topicRoot|year\d+Topic)["']/i.test(html) || /(?:year\d+-(?:maths|science|english)-(?:render|topic)|topic-modules-render|lesson-render|lower-materials-render|foundation-[^"']*render)\.js/i.test(html));
}
function staticSlides(html){ return !/(?:lower-materials-render|topic-modules-render|lesson-render|teachingSlides|\.slides\.forEach|render\w*slide)/i.test(html); }
function canonicalOk(topicFile,html){
  const m=html.match(/<link\b[^>]*rel=["'][^"']*canonical[^"']*["'][^>]*href=["']([^"']+)["']/i)||html.match(/<link\b[^>]*href=["']([^"']+)["'][^>]*rel=["'][^"']*canonical/i);
  if(!m) return false; try{const u=new URL(m[1]); if(!/(^|\.)skillrhub\.com$/i.test(u.hostname)) return false; const local=u.pathname.replace(/^\//,'').replace(/\/$/,''); const expected=topicFile.replace(/\/index\.html$/i,''); return local.toLowerCase()===expected.toLowerCase();}catch{return false;}
}
function localRefsOk(file,html,onlyRelated=false){
  let list=anchors(html);
  if(onlyRelated){
    const start=html.search(/Related Topics/i); if(start<0)return false; const chunk=html.slice(start,start+12000); list=anchors(chunk);
  }
  for(const a of list){
    if(!a.href || /^(#|mailto:|tel:|javascript:|data:)/i.test(a.href)) continue;
    const local=sameSitePath(a.href); if(!local) continue;
    if(!resolveTarget(file,a.href).exists) return false;
  }
  return true;
}
function assetRefsOk(file,html){
  const refs=uniq([...attrs(html,'script','src'),...attrs(html,'link','href')]);
  for(const r of refs){
    if(/^(https?:\/\/|data:|#)/i.test(r)) continue;
    if(!resolveTarget(file,r).exists) return false;
  }
  return true;
}
function slidesResult(topicFile,html){
  const link=findLink(html,'slides');
  if(!link) return {ok:false,file:'',reason:'missing link'};
  const t=resolveTarget(topicFile,link.href);
  if(!t.exists) return {ok:false,file:t.path,reason:'broken link'};
  let viewer=t.file;
  // Shared fixed viewer links are permitted only when the repository contains the static viewer.
  if(!viewer && /teacher-slides\/viewer/i.test(link.href)) viewer=files.find(p=>/teacher-slides\/viewer\/index\.html$/i.test(p))||'';
  if(!viewer) return {ok:false,file:t.path,reason:'missing static viewer'};
  const v=read(viewer);
  const hasSlides=/<img\b[^>]+src=["'][^"']+\.(?:png|jpe?g|webp|svg)/i.test(v) || /teacher-slides\/viewer/i.test(link.href);
  return {ok:htmlStructure(v)&&staticSlides(v)&&hasSlides,file:viewer,reason:'invalid static slides'};
}
function routeResult(item,topicFile,html,kind){
  const link=findLink(html,kind);
  if(link){const t=resolveTarget(topicFile,link.href); if(t.exists)return {ok:true,file:t.file};}
  if(kind==='practice'||kind==='test') { const expected=expectedQuiz(item,kind); return {ok:fileSet.has(expected),file:expected}; }
  return {ok:false,file:link?resolveLocal(topicFile,link.href):''};
}

const rows=[];
const totals={topic:0,slides:0,worksheet:0,practice:0,test:0,brokenLinks:0,elaborations:0,vic:0,nsw:0,intl:0,related:0,official:0,report:0,malformed:0,runtime:0};
const failures=[];

for(const code of [...discovered.keys()].sort()){
  const item=discovered.get(code); const pick=preferredTopic(item); const topic=pick.file; const html=read(topic); const text=cleanText(html); const issues=[];
  const topicOk=!!topic && htmlStructure(html); if(topicOk)totals.topic++; else {totals.malformed++;issues.push('Topic Page missing or malformed');}
  if(pick.duplicates.length){issues.push(`duplicate/conflicting Topic Pages: ${[topic,...pick.duplicates].join(', ')}`);}
  const staticOk=topicOk&&staticTopic(html); if(!staticOk){totals.runtime++;issues.push('runtime Topic Page architecture violation');}
  const branding=/SkillrHub/i.test(text); if(!branding)issues.push('SkillrHub branding missing');
  const codeOk=new RegExp(`\\b${code}\\b`,'i').test(text); if(!codeOk)issues.push('curriculum code missing from Topic Page');
  const contentOk=/<h1\b[^>]*>[\s\S]*?<\/h1>/i.test(html)&&/(What students learn|Key concept|Learning intention|Learning goal|Curriculum coverage|Australian Curriculum)/i.test(text); if(!contentOk)issues.push('curriculum title/content missing');
  const elaborations=/Curriculum Elaborations?/i.test(text); if(!elaborations){totals.elaborations++;issues.push('Curriculum Elaborations missing');}
  const vic=/(Victoria|Victorian Curriculum|VCAA)/i.test(text); if(!vic){totals.vic++;issues.push('VIC mapping missing');}
  const nsw=/(NSW|New South Wales|NESA)/i.test(text); if(!nsw){totals.nsw++;issues.push('NSW mapping missing');}
  const intl=/(International Curriculum|International mapping|Common Core|England|Singapore|New Zealand)/i.test(text); if(!intl){totals.intl++;issues.push('International mapping missing');}
  const related=/Related Topics?/i.test(text); if(!related){totals.related++;issues.push('Related Topics missing');}
  const relatedLinks=related&&localRefsOk(topic,html,true); if(related&&!relatedLinks){totals.brokenLinks++;issues.push('Related Topic link broken');}
  const official=/Official Curriculum References?/i.test(text); if(!official){totals.official++;issues.push('Official Curriculum References missing');}
  const report=anchors(html).some(a=>/Report Issue/i.test(a.text)&&a.href&&!/^javascript:\s*void/i.test(a.href)); if(!report){totals.report++;issues.push('Report Issue missing/non-functional');}
  const crumbs=/(breadcrumb|aria-label=["']breadcrumb)/i.test(html); if(!crumbs)issues.push('breadcrumbs/navigation missing');
  const canon=topicOk&&canonicalOk(topic,html); if(!canon)issues.push('canonical URL invalid');
  const internal=topicOk&&localRefsOk(topic,html); if(!internal){totals.brokenLinks++;issues.push('broken internal link');}
  const assets=topicOk&&assetRefsOk(topic,html); if(!assets){totals.brokenLinks++;issues.push('broken shared CSS/JS asset');}
  const slides=topicOk?slidesResult(topic,html):{ok:false,file:''}; if(slides.ok)totals.slides++; else issues.push(`Teacher Slides ${slides.reason||'missing'}`);
  const ws=topicOk?routeResult(item,topic,html,'worksheet'):{ok:false,file:''}; if(ws.ok)totals.worksheet++; else issues.push('Worksheet route missing/broken');
  const practice=topicOk?routeResult(item,topic,html,'practice'):{ok:false,file:''}; if(practice.ok)totals.practice++; else issues.push('Practice route missing/broken');
  const test=topicOk?routeResult(item,topic,html,'test'):{ok:false,file:''}; if(test.ok)totals.test++; else issues.push('Test route missing/broken');
  const curriculum=branding&&codeOk&&contentOk&&elaborations&&official;
  const mappings=vic&&nsw&&intl;
  const links=related&&relatedLinks&&report&&crumbs&&canon&&internal&&assets&&!pick.duplicates.length;
  const overall=topicOk&&staticOk&&slides.ok&&ws.ok&&practice.ok&&test.ok&&curriculum&&mappings&&links;
  rows.push({code,item,topic,slides,ws,practice,test,curriculum,mappings,links,overall,issues});
  if(!overall) failures.push(...issues.map(x=>`${code}: ${x}`));
}

const total=rows.length, pass=rows.filter(r=>r.overall).length, fail=total-pass;
console.log('CODE | TOPIC | SLIDES | WORKSHEET | PRACTICE | TEST | CURRICULUM | MAPPINGS | LINKS | OVERALL');
for(const r of rows) console.log(`${r.code} | ${r.topic&&htmlStructure(read(r.topic))?'PASS':'FAIL'} | ${r.slides.ok?'PASS':'FAIL'} | ${r.ws.ok?'PASS':'FAIL'} | ${r.practice.ok?'PASS':'FAIL'} | ${r.test.ok?'PASS':'FAIL'} | ${r.curriculum?'PASS':'FAIL'} | ${r.mappings?'PASS':'FAIL'} | ${r.links?'PASS':'FAIL'} | ${r.overall?'PASS':'FAIL'}`);
console.log('\nAUTHORITATIVE INVENTORY');
for(const r of rows) console.log(`${r.code} | ${r.item.year} | ${r.item.subject} | ${r.topic||'-'} | ${r.slides.file||'-'} | ${r.ws.file||'-'} | ${r.practice.file||'-'} | ${r.test.file||'-'}`);
console.log('\nTOTALS');
console.log(`Total curriculum codes discovered: ${total}`);
console.log(`Full PASS: ${pass}`);
console.log(`FAIL: ${fail}`);
console.log(`Missing Topic Pages: ${total-totals.topic}`);
console.log(`Missing Teacher Slides: ${total-totals.slides}`);
console.log(`Missing Worksheets: ${total-totals.worksheet}`);
console.log(`Missing Practice routes: ${total-totals.practice}`);
console.log(`Missing Test routes: ${total-totals.test}`);
console.log(`Broken internal links: ${totals.brokenLinks}`);
console.log(`Missing Curriculum Elaborations: ${totals.elaborations}`);
console.log(`Missing VIC mappings: ${totals.vic}`);
console.log(`Missing NSW mappings: ${totals.nsw}`);
console.log(`Missing International mappings: ${totals.intl}`);
console.log(`Missing Related Topics: ${totals.related}`);
console.log(`Missing Official References: ${totals.official}`);
console.log(`Missing Report Issue: ${totals.report}`);
console.log(`malformed HTML: ${totals.malformed}`);
console.log(`runtime architecture violations: ${totals.runtime}`);
if(!total){ console.error('No curriculum codes discovered.'); process.exit(1); }
if(failures.length){ console.error(`\nFAILURES (${failures.length})`); for(const f of failures)console.error(`- ${f}`); process.exit(1); }
console.log('\nALL DISCOVERED CURRICULUM CODES = PASS');
