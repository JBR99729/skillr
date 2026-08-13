import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root=process.cwd(),failures=[];
const assert=(ok,msg)=>{if(!ok)failures.push(msg)};
const load=file=>{const context={window:{SkillrUpperScienceData:{}}};vm.runInNewContext(fs.readFileSync(path.join(root,file),"utf8"),context,{filename:file});return Object.keys(context.window.SkillrUpperScienceData||{}).length?context.window.SkillrUpperScienceData:(context.window.SkillrYear8ScienceData||{})};
const all={...load("assets/year8-science-ac9s8u01-data.js"),...load("assets/year8-science-full-data.js"),...load("assets/year9-science-full-data.js"),...load("assets/year10-science-full-data.js")};
const required=["schemaVersion","code","year","subject","title","subtitle","contentDescription","lessonTime","learningIntention","successCriteria","materials","conceptBoundary","teachingProgression","models","elaborations","workedExamples","misconceptions","warmUp","differentiation","slides","masteryItems","references","resourceLinks","review"];
const teacherFields=["teacherDoes","teacherSaysOrAsks","studentDoes","whatToLookFor","ifIncorrect"];
const masteryFields=["expectedAnswer","acceptableRepresentations","evidenceOfMastery","likelyMisconception","remediation","decision"];
const boundaryFields=["mustTeach","prerequisites","maySupportInformally","mustNotOverteach"];
const filler=["Which learning goal best matches this topic?","Which classroom activity best practises this topic?","Use concrete examples, pictures, oral explanation","The goal is not to memorise one answer pattern"];

assert(Object.keys(all).length===57,`Expected 57 specifications, found ${Object.keys(all).length}`);
for(const year of [8,9,10])assert(Object.values(all).filter(x=>x.year===year).length===19,`Year ${year} does not contain 19 codes`);

for(const [code,u] of Object.entries(all)){
  for(const field of required)assert(u[field]!==undefined,`${code}: missing ${field}`);
  assert(u.schemaVersion==="1.1",`${code}: wrong schema version`);
  assert(u.code===code,`${code}: identity mismatch`);assert(u.subject==="Science",`${code}: wrong subject`);
  if(code==="AC9S8U01"){assert(u.elaborations.length===6,"AC9S8U01: expected 6 elaborations");assert(u.slides.length===8,"AC9S8U01: expected 8 slides");continue;}
  for(const f of boundaryFields)assert(Array.isArray(u.conceptBoundary?.[f])&&u.conceptBoundary[f].length,`${code}: empty concept boundary ${f}`);
  assert(u.teachingProgression?.steps?.length>=4,`${code}: progression too short`);
  assert(u.models?.length===u.elaborations.length+1,`${code}: expected central plus one model per focus`);
  const modelIds=new Set(u.models.map(x=>x.id));assert(modelIds.size===u.models.length,`${code}: duplicate model ID`);
  for(const model of u.models){
    assert(model.accessibleDescription,`${code}/${model.id}: missing accessible description`);
    assert(model.reviewed?.conceptAccurate&&model.reviewed?.labelsClear&&model.reviewed?.noOverlap,`${code}/${model.id}: model review incomplete`);
    const p=model.parameters||{};assert(Array.isArray(p.labels)&&p.labels.length>=3&&p.labels.length<=6,`${code}/${model.id}: invalid labels`);assert(Number.isInteger(p.focusIndex)&&p.focusIndex>=-1&&p.focusIndex<p.labels.length,`${code}/${model.id}: invalid focus index`);
  }
  const itemIds=new Set(u.masteryItems.map(x=>x.id));
  for(const el of u.elaborations){
    assert(el.plainLanguageConcept&&el.teachingPurpose,`${code}/${el.id}: missing teaching interpretation`);
    assert(el.modelIds.length&&el.modelIds.every(x=>modelIds.has(x)),`${code}/${el.id}: unresolved model`);
    assert(el.checkpointIds.length&&el.checkpointIds.every(x=>itemIds.has(x)),`${code}/${el.id}: unresolved checkpoint`);
    for(const f of teacherFields)assert(el[f],`${code}/${el.id}: missing ${f}`);
    assert(el.masteryEvidence,`${code}/${el.id}: missing mastery evidence`);
  }
  assert(u.slides.length===u.elaborations.length+3,`${code}: slide count does not cover intro, focuses, worked example and mastery`);
  for(const slide of u.slides){
    assert(slide.title.length<=105,`${code}/${slide.id}: projected title too long (${slide.title.length})`);
    assert(!/\b(the|a|an|of|in|to|for|with|and|or|by|as|from|on)$/.test(slide.title),`${code}/${slide.id}: projected title ends mid-phrase`);
    for(const f of teacherFields)assert(slide.teacherLayer?.[f],`${code}/${slide.id}: missing teacher ${f}`);
    assert(slide.display?.modelIds?.every(x=>modelIds.has(x)),`${code}/${slide.id}: unresolved slide model`);
    assert(Array.isArray(slide.differentiationRefs)&&slide.differentiationRefs.length===3,`${code}/${slide.id}: differentiation refs incomplete`);
  }
  for(const item of u.masteryItems)for(const f of masteryFields)assert(item[f],`${code}/${item.id}: missing ${f}`);
  for(const level of ["support","core","extend"])assert(u.differentiation?.[level]?.adaptation&&u.differentiation[level].boundaryCheck,`${code}: incomplete ${level} differentiation`);
  assert(u.review?.conceptAccurate&&u.review?.elaborationsComplete&&u.review?.topicSlideParity&&u.review?.visualsApproved,`${code}: release review incomplete`);
  const joined=JSON.stringify(u);for(const text of filler)assert(!joined.includes(text),`${code}: generic filler found: ${text}`);
  const topic=path.join(root,u.resourceLinks.topic,"index.html");assert(fs.existsSync(topic),`${code}: topic route missing`);
  if(fs.existsSync(topic)){const html=fs.readFileSync(topic,"utf8");assert(html.includes(`data-science-code="${code}"`)||code==="AC9S8U01",`${code}: topic does not select canonical data`);assert(!html.includes("teacher-slide.pdf"),`${code}: legacy PDF link remains`);}
  for(const key of ["worksheet","practice","test"]){const local=path.join(root,u.resourceLinks[key],"index.html");assert(fs.existsSync(local),`${code}: missing ${key} route ${u.resourceLinks[key]}`);}
}

for(const year of [8,9,10]){
  const hub=fs.readFileSync(path.join(root,`year${year}/curriculum/science/index.html`),"utf8");
  assert((hub.match(/<article class="curriculum-unit-card">/g)||[]).length===19,`Year ${year} hub does not show 19 units`);
  assert(!hub.includes("teacher-slide.pdf"),`Year ${year} hub still links legacy PDF slides`);
  assert((hub.match(new RegExp(`/worksheets/year${year}/science/teacher-slides/live\\.html\\?code=AC9S${year}`,"g"))||[]).length===19,`Year ${year} hub does not link all live slide sequences`);
  assert(!hub.includes(">Worksheet</a>"),`Year ${year} hub still uses Worksheet label`);
  for(const u of Object.values(all).filter(x=>x.year===year&&x.code!=="AC9S8U01")){const card=(hub.match(new RegExp(`<span class="curriculum-badge">${u.code}</span>[\\s\\S]*?</article>`))||[])[0]||"",shown=Number((card.match(/<span class="curriculum-chip">(\d+) elaborations/)||[])[1]),actual=u.elaborations.filter(x=>!x.isTeachingFocus).length;assert(shown===actual,`${u.code}: hub shows ${shown} elaborations but canonical source has ${actual}`)}
  const live=fs.readFileSync(path.join(root,`worksheets/year${year}/science/teacher-slides/live.html`),"utf8");assert(live.includes(`year${year}-science-full-data.js`),`Year ${year} live slides missing year data`);
}
const slideCss=fs.readFileSync(path.join(root,"assets/upper-science-slides.css"),"utf8");assert(slideCss.includes("2.35rem"),"Compact slide heading cap is missing");assert(slideCss.includes("font-size:.73rem"),"Compact teacher-note typography is missing");
for(const css of ["assets/upper-science.css","assets/upper-science-slides.css"]){const text=fs.readFileSync(path.join(root,css),"utf8");assert((text.match(/{/g)||[]).length===(text.match(/}/g)||[]).length,`${css}: unbalanced braces`)}

if(failures.length){console.error(failures.map(x=>`FAIL: ${x}`).join("\n"));process.exit(1)}
console.log(`PASS: 57 canonical v1.1 Science units; 19 each in Years 8, 9 and 10; ${Object.values(all).reduce((n,x)=>n+x.elaborations.length,0)} visual curriculum focuses and ${Object.values(all).reduce((n,x)=>n+x.slides.length,0)} selectable slides validated.`);
