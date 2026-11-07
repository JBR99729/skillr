const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { JSDOM, ResourceLoader, VirtualConsole } = require('jsdom');
const { ROOT, ORIGIN } = require('./consolidate-pages.cjs');
const targets = require('./worksheet-targets.json');
const normal = value => String(value || '').replace(/\s+/g,' ').trim();
const esc = value => String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const sha = value => crypto.createHash('sha256').update(value).digest('hex');
const wait = ms => new Promise(resolve=>setTimeout(resolve,ms));
const marker = /<!-- skillr-static-worksheet:start -->[\s\S]*?<!-- skillr-static-worksheet:end -->/;
const sourceFiles = new Map();
class LocalResources extends ResourceLoader {
  constructor(missing) {super();this.missing=missing;}
  fetch(url) {
    const target = new URL(url);
    if(target.origin!==ORIGIN || !/\.js$/i.test(target.pathname)) return null;
    if(/\/(?:pwa-register|geo-schema|seo-routing|display-only|report-issue|access|learning-stats|share-button|resource-links|app-funnel|qa-complete[^/]*|loader)\.js$/i.test(target.pathname)) return null;
    const relative=target.pathname.slice(1),file=path.join(ROOT,relative);
    if(!fs.existsSync(file)){this.missing.add(relative);return null;}
    const content=fs.readFileSync(file);sourceFiles.set(relative,sha(content));
    return Promise.resolve(content);
  }
}
function bankFor(w, code) {
  const groups = [w.SkillrFoundationEnglishWorksheetData,w.SkillrFoundationScienceWorksheetData,w.SkillrFoundationWorksheetData,w.SkillrYear2MathsWorksheetData,w.SkillrYear5ScienceWorksheetData];
  const bank=groups.map(x=>x?.[code]).find(Boolean);
  if(bank) return bank.commercial_master?.questions || bank.questions;
  return w.quizQuestions;
}
async function render(source, relative, suffix='') {
  const missing=new Set(),errors=[],vc=new VirtualConsole();
  vc.on('jsdomError',e=>errors.push(e.message));vc.on('error',(...args)=>errors.push(args.join(' ')));
  const url=ORIGIN+'/'+relative.replace(/index.html$/,'')+suffix;
  const dom=new JSDOM(source,{url,runScripts:'dangerously',resources:new LocalResources(missing),pretendToBeVisual:true,virtualConsole:vc,beforeParse(w){
    // The build reads repository assets only. Analytics and external services never run.
    w.fetch=async value=>{
      const u=new URL(value,w.location.href);if(u.origin!==ORIGIN) throw Error('External build fetch blocked');
      let file=path.join(ROOT,u.pathname);
      if(fs.existsSync(file)&&fs.statSync(file).isDirectory()) file=path.join(file,'index.html');
      if(!fs.existsSync(file)) return {ok:false,status:404,text:async()=>'',json:async()=>({})};
      const body=fs.readFileSync(file,'utf8');return {ok:true,status:200,text:async()=>body,json:async()=>JSON.parse(body)};
    };
  }});
  await Promise.race([new Promise(resolve=>dom.window.addEventListener('load',resolve,{once:true})),wait(4000)]);
  await wait(150);
  // The shared production loader reloads the Foundation English topic modules
  // after page-specific legacy banks. Capture that final public bank, rather
  // than the transient ten-question bank rendered earlier during page load.
  if (/^quiz\/grade-k\/english\//.test(relative)) {
    const loaderPath='assets/pwa-register-legacy.js';
    const loader=fs.readFileSync(path.join(ROOT,loaderPath),'utf8');
    sourceFiles.set(loaderPath,sha(loader));
    const modules=loader.match(/const foundationEnglishWorksheetModules = \[([\s\S]*?)\];/);
    if(!modules)throw Error('Production Foundation English module list was not found');
    // Browsers ignore document.write from the asynchronously injected scripts.
    // JSDOM otherwise executes those writes and restores obsolete legacy banks.
    const originalWrite=dom.window.document.write;
    dom.window.document.write=()=>{};
    try {
      for(const match of modules[1].matchAll(/"([^"]+)"/g)) {
        const relativeAsset=new URL(match[1],ORIGIN).pathname.slice(1);
        const body=fs.readFileSync(path.join(ROOT,relativeAsset),'utf8');
        sourceFiles.set(relativeAsset,sha(body));
        dom.window.eval(body);
      }
      await dom.window.SkillrFoundationEnglishWorksheetPageInit();
      await wait(150);
    } finally {dom.window.document.write=originalWrite;}
  }
  if(missing.size){dom.window.close();throw Error(`Missing local worksheet assets: ${[...missing].join(', ')}`);}
  const {window:w}=dom,d=w.document,code=relative.match(/ac9[a-z0-9]+/i)[0].toUpperCase();
  let questions=bankFor(w,code);
  if(!Array.isArray(questions)||questions.length<8){dom.window.close();throw Error(`${code}: authored question bank did not load. ${errors.join('; ')}`);}
  questions=JSON.parse(JSON.stringify(bankFor(w,code)));
  const main=d.querySelector('main');
  const styles=[...d.head.querySelectorAll('style')].map(x=>x.textContent);
  const links=[...d.head.querySelectorAll('link[rel="stylesheet"]')].map(x=>x.getAttribute('href'));
  const result={dom,w,d,code,questions,main,styles,links,errors};
  return result;
}
function retargetLinks(markup) {
  return markup.replace(/href="([^"#]+)"/g,(all,href)=>{
    let u;try{u=new URL(href.replace(/&amp;/g,'&'),ORIGIN);}catch{return all;}
    if(u.origin!==ORIGIN)return all;
    const hub=u.pathname.match(/^\/(foundation|year\d+)\/(?:curriculum\/)?(maths|science|english)\/$/);
    if(hub){const year=hub[1]==='foundation'?0:hub[1].slice(4);return `href="/learn/?year=${year}&amp;subject=${hub[2]}"`;}
    const topic=u.pathname.match(/^\/(foundation|year\d+)\/(maths|science|english)\/(ac9[a-z0-9]+)[^/]*\/(teacher-slides\/)?$/i);
    if(topic){
      const dir=path.join(ROOT,topic[1],topic[2]);
      const slugs=fs.readdirSync(dir).filter(x=>x.startsWith(topic[3].toLowerCase()+'-'));
      for(const slug of slugs){const p=path.join(dir,slug,'index.html');if(fs.existsSync(p)&&!/<meta[^>]+name="robots"[^>]+noindex/i.test(fs.readFileSync(p,'utf8'))){return `href="/${topic[1]}/${topic[2]}/${slug}/${topic[4]||''}"`;}}
    }
    return all;
  });
}
function alternateIds(markup, code) {
  const ids=[...markup.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]);
  for(const id of ids){
    const replacement=`static-second-${code.toLowerCase()}-${id}`;
    markup=markup.replaceAll(`id="${id}"`,`id="${replacement}"`).replaceAll(`href="#${id}"`,`href="#${replacement}"`).replaceAll(`url(#${id})`,`url(#${replacement})`);
  }
  return markup;
}
async function prepare(relative) {
  let source=fs.readFileSync(path.join(ROOT,relative),'utf8');
  if(/<meta[^>]+name="robots"[^>]+noindex/i.test(source)) throw Error(`Refuse to publish retired worksheet ${relative}`);
  // Ignore the previous snapshot while exercising the current authored renderer.
  const clean=source.replace(marker,'').replace(/<script\b[^>]*id="skillr-static-worksheet-questions"[^>]*>[\s\S]*?<\/script>/,'').replace(/<script[^>]*src="\/assets\/static-worksheet-print\.js[^>]*><\/script>/,'');
  const first=await render(clean,relative),{code}=first;
  if(relative.startsWith('quiz/grade-k/english/')) source=source.replace(/(?:9|10) (curriculum-aligned )?questions/g,`${first.questions.length} $1questions`);
  let questions=first.questions,content,alternate;
  if(first.main && first.main.querySelectorAll('.question-prompt').length) {
    content=first.main.innerHTML;
    const missing=questions.filter(q=>!normal(first.main.textContent).includes(normal(q.question)));
    if(missing.length && relative.includes('/grade-k/')) alternate=await render(clean,relative,'topic-practice-2/');
    else if(missing.length && relative.includes('/year-5/')) alternate=await render(clean,relative,'?sheet=topic-practice-2');
    if(alternate){content+=`<section id="static-topic-practice-2" aria-label="Topic Practice 2">${alternateIds(alternate.main.innerHTML,code)}</section>`;}
  } else {
    throw Error(`${code}: no published on-page worksheet questions to preserve`);
  }
  const staticDom=new JSDOM(`<main>${content}</main>`),text=normal(staticDom.window.document.querySelector('main').textContent);
  for(const q of questions) if(!text.includes(normal(q.question)))throw Error(`${code}: source question omitted: ${q.question}`);
  content=retargetLinks(content);
  const original=new JSDOM(source),d=original.window.document,main=d.querySelector('main');
  if(!main)throw Error(`${code}: missing original main`);
  let originalMain=main.innerHTML.replace(marker,'');
  // Remove the loading placeholder, retaining pre-existing authored help in the same main.
  originalMain=originalMain.replace(/<(h1|h2|p|section)\b[^>]*>\s*Loading[^<]*(?:<[^>]+>[^<]*)*?<\/\1>/gi, (_,tag)=>tag.toLowerCase()==='h1' ? `<h1>${esc(first.d.querySelector('h1')?.textContent || code+' worksheet')}</h1>` : '');
  const snapshot=`<!-- skillr-static-worksheet:start --><div data-static-worksheet="${code}" data-static-question-count="${questions.length}" data-source-question-sha="${sha(JSON.stringify(questions))}">${content}</div><!-- skillr-static-worksheet:end -->`;
  const mainOpening=main.outerHTML.slice(0,main.outerHTML.indexOf('>')+1);
  const replacement=mainOpening+originalMain+snapshot+'</main>';
  source=source.replace(/<main\b[^>]*>[\s\S]*?<\/main>/i,()=>replacement);
  source=source.replace(/\/quiz\/assets\/ac9efla01-worksheet-alignment\.js\?[^"']*/g,'/quiz/assets/ac9efla01-worksheet-alignment.js?v=20261107-static-content');
  const extraStyles=[...new Set([...first.styles,...(alternate?.styles||[])])].filter(value=>value.trim()&&!source.includes(value));
  const extraLinks=[...new Set([...first.links,...(alternate?.links||[])])].filter(href=>!source.includes(`href="${href}"`)&&!source.includes(`href="${esc(href)}"`));
  if(extraStyles.length||extraLinks.length)source=source.replace('</head>',extraLinks.map(href=>`<link rel="stylesheet" href="${esc(href)}">`).join('')+extraStyles.map(value=>`<style data-static-worksheet-style>${value}</style>`).join('')+'</head>');
  const record={path:relative,code,questions:questions.length,sourceQuestionSha:sha(JSON.stringify(questions))};
  for(const result of [first,alternate].filter(Boolean)) result.dom.window.close();original.window.close();staticDom.window.close();
  return {relative,source,record};
}
async function build({write=true}={}) {
  const results=[];
  for(const relative of targets){results.push(await prepare(relative));if(results.length%10===0)console.log(`Prepared ${results.length}/${targets.length} worksheets`);}
  // All source banks and snapshots must pass before writing any worksheet.
  for(const result of results){const file=path.join(ROOT,result.relative);if(fs.readFileSync(file,'utf8')!==result.source&&write)fs.writeFileSync(file,result.source);}
  if(write)fs.writeFileSync(path.join(__dirname,'worksheet-manifest.json'),JSON.stringify({version:1,worksheets:results.map(x=>x.record),sources:Object.fromEntries([...sourceFiles].sort())},null,2)+'\n');
  console.log(`Embedded existing questions in ${results.length} worksheets (${results.reduce((n,x)=>n+x.record.questions,0)} questions).`);
  return results;
}
module.exports={build,prepare,render};
if(require.main===module)build().catch(error=>{console.error(error);process.exitCode=1;});
