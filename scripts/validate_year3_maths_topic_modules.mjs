import fs from "node:fs";import path from "node:path";import vm from "node:vm";
const root=process.cwd(),ctx={window:{}},CACHE_VERSION="4";vm.createContext(ctx);
for(const f of ["base","n1","n2","n3","a","m1","m2","sp","st","p"])vm.runInContext(fs.readFileSync(path.join(root,`assets/year3-maths-data-${f}.js`),"utf8"),ctx,{filename:f});
const units=ctx.window.SkillrYear3MathsData||{}, errors=[];
const manifest=JSON.parse(fs.readFileSync(path.join(root,"curriculum-question-banks/manifest.json"),"utf8"));
const valid=manifest.units.filter(x=>x.level==="Year 3"&&x.subject==="Mathematics").map(x=>x.code).sort();
const fail=(c,m)=>errors.push(`${c}: ${m}`);
if(valid.length!==23)fail("registry",`expected 23 codes, got ${valid.length}`);
for(const code of valid){const u=units[code];if(!u){fail(code,"missing canonical module");continue;}
  const master=u.commercial_master,topicId=`year3-mathematics-${code.toLowerCase()}`;
  if(!master||master.schema!=="topic-module-export-v1"||master.year!==3||master.subject!=="Mathematics"||master.code!==code||master.topic_id!==topicId)fail(code,"commercial-master identity invalid");
  if(master?.slides?.length!==4||master.slides.map(x=>x.role).join("|")!=="learning-intention|concept-refresher|guided-example|quick-check")fail(code,"commercial-master slide roles invalid");
  if(master?.slides?.some((x,i)=>x.id!==`${topicId}-slide-${i+1}`))fail(code,"commercial-master slide IDs unstable");
  if(!master?.slides?.[1]?.visual_alt||!master?.slides?.[2]?.example?.alt)fail(code,"commercial-master slide visual alt missing");
  if(master?.sheets?.length!==2||master.sheets[0].title!=="Topic Practice 1"||master.sheets[1].title!=="Topic Practice 2"||master.sheets[0].questions.length!==5||master.sheets[1].questions.length!==4)fail(code,"commercial-master sheets invalid");
  const exportedQuestions=master?.sheets?.flatMap(x=>x.questions)||[];
  if(new Set(exportedQuestions.map(x=>x.id)).size!==9||exportedQuestions.some((x,i)=>!x.id||!x.sheet_id||!x.answer||!x.summary||!x.hint||!x.alignment))fail(code,"commercial-master question identity/content invalid");
  if(/skillrhub|skillr f.?10|logo|watermark|icon-192/i.test(JSON.stringify(master)))fail(code,"public branding leaked into commercial-master instructional data");
  if(u.deep_dive?.length!==2||u.deep_dive.some(x=>x.length<70))fail(code,"deep dive must contain two substantial paragraphs");
  if(u.vocabulary?.length<3||u.vocabulary.some(x=>x.length!==2||!x[0]||!x[1]))fail(code,"vocabulary invalid");
  if(![2,3].includes(u.mistakes?.length)||u.mistakes.some(x=>!x[0]||!x[1]))fail(code,"misconceptions invalid");
  if(u.worked_examples?.length!==2||u.worked_examples.some(x=>x.steps?.length<3||!x.alt||!x.visual_html))fail(code,"worked examples invalid");
  if(!u.slides?.learning_intention||u.slides.success_criteria?.length<3||!u.slides.quick_check||!u.slides.expected_response||!u.slides.remediation)fail(code,"slide roles incomplete");
  const q=u.worksheet||[],dist=Object.fromEntries(["warm-up","core","extension"].map(t=>[t,q.filter(x=>x.tier===t).length]));
  if(q.length!==9||dist["warm-up"]!==3||dist.core!==4||dist.extension!==2)fail(code,`worksheet tiers ${JSON.stringify(dist)}`);
  const sheet1=q.slice(0,5),sheet2=q.slice(5),allPrompts=q.map(x=>x.question),splitPrompts=[...sheet1,...sheet2].map(x=>x.question);
  if(sheet1.length!==5||sheet2.length!==4)fail(code,"topic-practice split must be 5/4");
  if(new Set(splitPrompts).size!==9||new Set(allPrompts).size!==9||splitPrompts.some(x=>!allPrompts.includes(x)))fail(code,"questions are duplicated, deleted or not an exact partition");
  const splitDist=[...sheet1,...sheet2].reduce((a,x)=>(a[x.tier]=(a[x.tier]||0)+1,a),{});
  if(splitDist["warm-up"]!==3||splitDist.core!==4||splitDist.extension!==2)fail(code,"partition does not preserve 3/4/2 tiers");
  if(q.some(x=>!x.question||!x.answer||!x.summary||!x.hint))fail(code,"worksheet feedback incomplete");
  for(const item of q.filter(x=>x.type==="single"))if(!item.answers.includes(item.answer))fail(code,`MCQ answer is not an option: ${item.question}`);
  if(q.filter(x=>x.type==="fill-blank").some(x=>/complete the blank|makes the statement true/i.test(x.answer)))fail(code,"unresolved fill-blank answer");
  const taught={concept:new Set([u.title]),vocabulary:new Set(u.vocabulary.map(x=>x[0])),model:new Set(u.worked_examples.map(x=>x.title)),misconception:new Set(u.mistakes.map(x=>x[0]))};
  for(const item of q){if(!taught[item.alignment?.kind]?.has(item.alignment?.target))fail(code,`untaught or invalid alignment for: ${item.question}`)}
  for(const kind of ["concept","vocabulary","misconception"])if(!q.some(x=>x.alignment.kind===kind))fail(code,`worksheet does not cover ${kind}`);
  for(const model of taught.model)if(!q.some(x=>x.alignment.kind==="model"&&x.alignment.target===model))fail(code,`worksheet does not cover worked model: ${model}`);
  const topic=path.join(root,"year3/maths",u.slug,"index.html"), sheet=path.join(root,"quiz/year-3/math",code.toLowerCase(),"worksheet/index.html");
  const direct1=path.join(root,"quiz/year-3/math",code.toLowerCase(),"worksheet/topic-practice-1/index.html"),direct2=path.join(root,"quiz/year-3/math",code.toLowerCase(),"worksheet/topic-practice-2/index.html");
  if(!fs.existsSync(topic)||!fs.readFileSync(topic,"utf8").includes(`year3-maths-render.js?v=${CACHE_VERSION}`))fail(code,"topic route not wired at current cache version");
  if(!fs.existsSync(sheet)||!fs.readFileSync(sheet,"utf8").includes(`year3-maths-worksheet-page.js?v=${CACHE_VERSION}`))fail(code,"worksheet route not wired at current cache version");
  if(!fs.existsSync(path.join(root,"worksheets/year3/maths/teacher-slides",`${code.toLowerCase()}-teacher-slide.pdf`)))fail(code,"legacy PDF missing");
  for(const target of [
    topic,sheet,direct1,direct2,path.join(root,"quiz/year-3/math",code.toLowerCase(),"practice/index.html"),path.join(root,"quiz/year-3/math",code.toLowerCase(),"test/index.html"),
    path.join(root,"worksheets/year3/maths/teacher-slides/live.html"),path.join(root,"worksheets/year3/maths/teacher-slides",`${code.toLowerCase()}-teacher-slide.pdf`)
  ])if(!fs.existsSync(target))fail(code,`link target missing: ${path.relative(root,target)}`);
  const topicHtml=fs.readFileSync(topic,"utf8"),sheetHtml=fs.readFileSync(sheet,"utf8");
  const topicAssets=["data-base","data-n1","data-n2","data-n3","data-a","data-m1","data-m2","data-sp","data-st","data-p","render"];
  for(const asset of topicAssets)if(!topicHtml.includes(`year3-maths-${asset}.js?v=${CACHE_VERSION}`))fail(code,`topic cache version missing for ${asset}`);
  if(/year3-maths-(?:data-[a-z0-9]+|render)\.js\?v=(?!4\b)\d+/.test(topicHtml))fail(code,"topic contains stale Year 3 Maths asset version");
  if(!sheetHtml.includes(`year3-maths-worksheet-page.js?v=${CACHE_VERSION}`))fail(code,"worksheet does not load current connected renderer");
  for(const [number,direct] of [[1,direct1],[2,direct2]]){const html=fs.readFileSync(direct,"utf8");if(!html.includes(`Topic Practice ${number}`)||!html.includes(`/worksheet/topic-practice-${number}/`))fail(code,`direct Topic Practice ${number} route identity invalid`);if(!html.includes(`year3-maths-worksheet-page.js?v=${CACHE_VERSION}`)||/year3-maths-worksheet-page\.js\?v=(?!4\b)\d+/.test(html))fail(code,`direct Topic Practice ${number} cache version invalid`)}
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
const slideRoute=fs.readFileSync(path.join(root,"worksheets/year3/maths/teacher-slides/live.html"),"utf8");
for(const asset of ["data-base","data-n1","data-n2","data-n3","data-a","data-m1","data-m2","data-sp","data-st","data-p","slide"])if(!slideRoute.includes(`year3-maths-${asset}.js?v=${CACHE_VERSION}`))fail("cache",`slide route cache version missing for ${asset}`);
if(/year3-maths-(?:data-[a-z0-9]+|slide)\.js\?v=(?!4\b)\d+/.test(slideRoute))fail("cache","slide route contains stale asset version");
for(const asset of ["data-base","data-n1","data-n2","data-n3","data-a","data-m1","data-m2","data-sp","data-st","data-p"])if(!sheetRender.includes(`year3-maths-${asset}.js?v=${CACHE_VERSION}`))fail("cache",`worksheet loader cache version missing for ${asset}`);
if(/year3-maths-data-[a-z0-9]+\.js\?v=(?!4\b)\d+/.test(sheetRender))fail("cache","worksheet loader contains stale data version");
for(const token of ["Teacher slide","Topic Practice 1","Topic Practice 2","Practice","Test","topic-practice-1","topic-practice-2"])if(!topicRender.includes(token))fail("links",`topic missing ${token} link`);
for(const token of ["Back to topic","Teacher slides","Open Practice","Open Test","topic-practice-1","topic-practice-2","worksheet-tabs"])if(!sheetRender.includes(token))fail("links",`worksheet missing ${token} link`);
if(!slide.includes("legacy PDF")||!slide.includes("back.href"))fail("links","slides missing topic or legacy-PDF link");
if(!sheetRender.includes("@page{size:A4 portrait")||!sheetRender.includes('format:"a4"'))fail("print","A4 setup missing");
if(!sheetRender.includes('/icons/icon-192.png')||!fs.existsSync(path.join(root,"icons/icon-192.png")))fail("print","logo asset missing");
if(!sheetRender.includes("SkillrHub")||!topicRender.includes("Skillr"))fail("public-brand","public renderer branding missing");
for(const guard of ["overflow-wrap:anywhere","break-inside:avoid","page-break-inside:avoid","max-width:186mm"])if(!sheetRender.includes(guard))fail("print",`overflow safeguard missing: ${guard}`);
if(!sheetRender.includes("answer-key")||!sheetRender.includes("Answer Key"))fail("print","print answer key missing");
for(const token of ['all.slice(0,5)','all.slice(5)','selected.map(({question:q,index})','Topic Practice ${practiceNumber}','Only questions from this sheet'])if(!sheetRender.includes(token))fail("partition",`renderer missing ${token}`);
for(const token of ["grid-auto-flow:column","grid-auto-columns:minmax(0,1fr)","@media(max-width:650px)","flex-wrap:wrap","@media print"])if(!sheetRender.includes(token))fail("options",`horizontal/responsive option CSS missing ${token}`);
for(const f of ["assets/year3-maths-data-base.js","assets/year3-maths-render.js","assets/year3-maths-slide.js","assets/year3-maths-worksheet-page.js"]){try{new vm.Script(fs.readFileSync(path.join(root,f),"utf8"),{filename:f});}catch(e){fail(f,e.message)}}
if(errors.length){console.error(errors.join("\n"));process.exit(1)}console.log(`PASS Year 3 Maths commercial-master-ready retrofit: ${valid.length}/23 codes; stable year/subject/code/topic, 92 slide and 46 sheet IDs; 207 unique keyed questions partitioned 5/4; cache v${CACHE_VERSION} verified across 23 topics, 23 compatible entries, 46 direct sheets, slide route and dynamic data loader; brand-neutral exports/public branding, URLs, horizontal options, A4 print and legacy gates pass.`);
