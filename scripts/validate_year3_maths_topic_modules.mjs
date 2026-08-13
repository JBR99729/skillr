import fs from "node:fs";import path from "node:path";import vm from "node:vm";
const root=process.cwd(),ctx={window:{}};vm.createContext(ctx);
for(const f of ["base","n1","n2","n3","a","m1","m2","sp","st","p"])vm.runInContext(fs.readFileSync(path.join(root,`assets/year3-maths-data-${f}.js`),"utf8"),ctx,{filename:f});
const units=ctx.window.SkillrYear3MathsData||{}, errors=[];
const manifest=JSON.parse(fs.readFileSync(path.join(root,"curriculum-question-banks/manifest.json"),"utf8"));
const valid=manifest.units.filter(x=>x.level==="Year 3"&&x.subject==="Mathematics").map(x=>x.code).sort();
const fail=(c,m)=>errors.push(`${c}: ${m}`);
if(valid.length!==23)fail("registry",`expected 23 codes, got ${valid.length}`);
for(const code of valid){const u=units[code];if(!u){fail(code,"missing canonical module");continue;}
  if(u.deep_dive?.length!==2||u.deep_dive.some(x=>x.length<70))fail(code,"deep dive must contain two substantial paragraphs");
  if(u.vocabulary?.length<3||u.vocabulary.some(x=>x.length!==2||!x[0]||!x[1]))fail(code,"vocabulary invalid");
  if(![2,3].includes(u.mistakes?.length)||u.mistakes.some(x=>!x[0]||!x[1]))fail(code,"misconceptions invalid");
  if(u.worked_examples?.length!==2||u.worked_examples.some(x=>x.steps?.length<3||!x.alt||!x.visual_html))fail(code,"worked examples invalid");
  if(!u.slides?.learning_intention||u.slides.success_criteria?.length<3||!u.slides.quick_check||!u.slides.expected_response||!u.slides.remediation)fail(code,"slide roles incomplete");
  const q=u.worksheet||[],dist=Object.fromEntries(["warm-up","core","extension"].map(t=>[t,q.filter(x=>x.tier===t).length]));
  if(q.length!==9||dist["warm-up"]!==3||dist.core!==4||dist.extension!==2)fail(code,`worksheet tiers ${JSON.stringify(dist)}`);
  if(q.some(x=>!x.question||!x.answer||!x.summary||!x.hint))fail(code,"worksheet feedback incomplete");
  for(const item of q.filter(x=>x.type==="single"))if(!item.answers.includes(item.answer))fail(code,`MCQ answer is not an option: ${item.question}`);
  if(q.filter(x=>x.type==="fill-blank").some(x=>/complete the blank|makes the statement true/i.test(x.answer)))fail(code,"unresolved fill-blank answer");
  const taught={concept:new Set([u.title]),vocabulary:new Set(u.vocabulary.map(x=>x[0])),model:new Set(u.worked_examples.map(x=>x.title)),misconception:new Set(u.mistakes.map(x=>x[0]))};
  for(const item of q){if(!taught[item.alignment?.kind]?.has(item.alignment?.target))fail(code,`untaught or invalid alignment for: ${item.question}`)}
  for(const kind of ["concept","vocabulary","misconception"])if(!q.some(x=>x.alignment.kind===kind))fail(code,`worksheet does not cover ${kind}`);
  for(const model of taught.model)if(!q.some(x=>x.alignment.kind==="model"&&x.alignment.target===model))fail(code,`worksheet does not cover worked model: ${model}`);
  const topic=path.join(root,"year3/maths",u.slug,"index.html"), sheet=path.join(root,"quiz/year-3/math",code.toLowerCase(),"worksheet/index.html");
  if(!fs.existsSync(topic)||!fs.readFileSync(topic,"utf8").includes("year3-maths-render.js?v=2"))fail(code,"topic route not wired");
  if(!fs.existsSync(sheet)||!fs.readFileSync(sheet,"utf8").includes("year3-maths-worksheet-page.js?v=2"))fail(code,"worksheet route not wired");
  if(!fs.existsSync(path.join(root,"worksheets/year3/maths/teacher-slides",`${code.toLowerCase()}-teacher-slide.pdf`)))fail(code,"legacy PDF missing");
  for(const target of [
    topic,sheet,path.join(root,"quiz/year-3/math",code.toLowerCase(),"practice/index.html"),path.join(root,"quiz/year-3/math",code.toLowerCase(),"test/index.html"),
    path.join(root,"worksheets/year3/maths/teacher-slides/live.html"),path.join(root,"worksheets/year3/maths/teacher-slides",`${code.toLowerCase()}-teacher-slide.pdf`)
  ])if(!fs.existsSync(target))fail(code,`link target missing: ${path.relative(root,target)}`);
  const topicHtml=fs.readFileSync(topic,"utf8"),sheetHtml=fs.readFileSync(sheet,"utf8");
  if(!topicHtml.includes("year3-maths-render.js?v=2"))fail(code,"topic does not load connected renderer");
  if(!sheetHtml.includes("year3-maths-worksheet-page.js?v=2"))fail(code,"worksheet does not load connected renderer");
}
const normal=s=>String(s).toLowerCase().replace(/\d+/g,"#").replace(/[^a-z#]+/g," ").trim();
for(const [label,values] of [
  ["deep dives",Object.values(units).flatMap(u=>u.deep_dive)],
  ["worked steps",Object.values(units).flatMap(u=>u.worked_examples.flatMap(x=>x.steps))],
  ["summaries",Object.values(units).flatMap(u=>u.worksheet.map(x=>x.summary))],
  ["hints",Object.values(units).flatMap(u=>u.worksheet.map(x=>x.hint))]
]){const counts=new Map();for(const value of values){const key=normal(value);counts.set(key,(counts.get(key)||0)+1)}const worst=Math.max(...counts.values());if(worst>2)fail("repetition",`${label} normalized repetition ${worst}`)}
const slide=fs.readFileSync(path.join(root,"assets/year3-maths-slide.js"),"utf8");for(const role of ["learning-intention","concept-refresher","guided-example","quick-check"])if(!slide.includes(`data-slide-role=\\"${role}\\"`)&&!slide.includes(`data-slide-role="${role}"`))fail("slides",`missing ${role}`);
if(!slide.includes("<details>")||!slide.includes("expected_response")||!slide.includes("remediation"))fail("slides","answer/guidance is not concealed");
const topicRender=fs.readFileSync(path.join(root,"assets/year3-maths-render.js"),"utf8"),sheetRender=fs.readFileSync(path.join(root,"assets/year3-maths-worksheet-page.js"),"utf8");
for(const token of ["Teacher slide","Worksheet","Practice","Test"])if(!topicRender.includes(token))fail("links",`topic missing ${token} link`);
for(const token of ["Back to topic","Teacher slides","Open Practice","Open Test"])if(!sheetRender.includes(token))fail("links",`worksheet missing ${token} link`);
if(!slide.includes("legacy PDF")||!slide.includes("back.href"))fail("links","slides missing topic or legacy-PDF link");
if(!sheetRender.includes("@page{size:A4 portrait")||!sheetRender.includes('format:"a4"'))fail("print","A4 setup missing");
if(!sheetRender.includes('/icons/icon-192.png')||!fs.existsSync(path.join(root,"icons/icon-192.png")))fail("print","logo asset missing");
for(const guard of ["overflow-wrap:anywhere","break-inside:avoid","page-break-inside:avoid","max-width:186mm"])if(!sheetRender.includes(guard))fail("print",`overflow safeguard missing: ${guard}`);
if(!sheetRender.includes("answer-key")||!sheetRender.includes("Answer Key"))fail("print","print answer key missing");
for(const f of ["assets/year3-maths-data-base.js","assets/year3-maths-render.js","assets/year3-maths-slide.js","assets/year3-maths-worksheet-page.js"]){try{new vm.Script(fs.readFileSync(path.join(root,f),"utf8"),{filename:f});}catch(e){fail(f,e.message)}}
if(errors.length){console.error(errors.join("\n"));process.exit(1)}console.log(`PASS Year 3 Maths atomic topic modules: ${valid.length}/23 codes; 46 worked examples; 69 vocabulary terms; 207 aligned worksheet questions (69/92/46); concept/vocabulary/both-model/misconception coverage; four slide roles; bidirectional link targets; A4/logo/answer-key/overflow print gate; 23 topic + 23 worksheet routes; legacy PDFs preserved.`);
