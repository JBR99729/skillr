import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root=path.resolve(import.meta.dirname,"..");
const errors=[];
const expected={8:[27,110],9:[23,104],10:[21,100]};
const required=["schemaVersion","code","year","subject","slug","strand","title","subtitle","contentDescription","lessonTime","learningIntention","successCriteria","materials","conceptBoundary","teachingProgression","models","elaborations","workedExamples","misconceptions","warmUp","differentiation","slides","masteryItems","references","resourceLinks","review","teachingSlides"];
const noteKeys=["teacherDoes","teacherAsks","studentDoes","expectedEvidence","ifIncorrect","shortCheck"];
const teacherKeys=["teacherDoes","teacherSaysOrAsks","studentDoes","whatToLookFor","ifIncorrect"];
const projected=[];
let codeTotal=0,elaborationTotal=0;
const allData={};

const load=year=>{
  const src=fs.readFileSync(path.join(root,`assets/year${year}-maths-data.js`),"utf8");
  const box={window:{}};vm.runInNewContext(src,box);
  return box.window.SkillrUpperMathsData||box.window.SkillrYear8MathsData;
};
const blank=value=>value==null||value===""||(Array.isArray(value)&&!value.length);

for(const year of [8,9,10]){
  const data=load(year),codes=Object.keys(data||{});
  Object.assign(allData,data);
  const [wantedCodes,wantedElabs]=expected[year];
  if(codes.length!==wantedCodes)errors.push(`Year ${year}: expected ${wantedCodes} codes; found ${codes.length}`);
  let yearElabs=0;
  const live=path.join(root,`worksheets/year${year}/maths/teacher-slides/live.html`);
  if(!fs.existsSync(live))errors.push(`Year ${year}: missing live teacher-slide shell`);
  const hubPath=path.join(root,`year${year}/curriculum/maths/index.html`);
  const hub=fs.readFileSync(hubPath,"utf8");
  for(const [code,u] of Object.entries(data||{})){
    codeTotal++;yearElabs+=u.elaborations?.length||0;
    for(const key of required)if(blank(u[key]))errors.push(`${code}: missing ${key}`);
    if(u.schemaVersion!=="1.1")errors.push(`${code}: schemaVersion is not 1.1`);
    if(u.year!==year||u.code!==code)errors.push(`${code}: year/code mismatch`);
    const slideCounts=[u.models?.length,u.slides?.length,u.masteryItems?.length,u.teachingSlides?.length];
    if(new Set(slideCounts).size!==1)errors.push(`${code}: model/slide/checkpoint counts differ (${slideCounts.join("/")})`);
    const elaborationsById=new Map(u.elaborations.map(elaboration=>[elaboration.id,elaboration]));
    if(new Set(u.teachingSlides.map(s=>s.heading)).size!==u.teachingSlides.length)errors.push(`${code}: repeated projected heading`);
    if(new Set(u.teachingSlides.map(s=>s.highlight)).size!==u.teachingSlides.length)errors.push(`${code}: repeated mathematical model`);
    if(new Set(u.teachingSlides.map(s=>s.ask)).size!==u.teachingSlides.length)errors.push(`${code}: repeated class prompt`);
    const modelIds=new Set(u.models.map(m=>m.id));
    for(const [index,s] of u.teachingSlides.entries()){
      projected.push(s.heading,s.lead,s.highlight,s.ask,s.answer);
      if(s.heading.length>82)errors.push(`${code}/${s.id}: heading too long (${s.heading.length})`);
      if(s.lead.length>240||s.highlight.length>210||s.ask.length>190||s.answer.length>360)errors.push(`${code}/${s.id}: projected text exceeds density limit`);
      if(!s.visual?.type||!s.visual?.label)errors.push(`${code}/${s.id}: missing labelled visual component`);
      for(const key of noteKeys)if(blank(s.notes?.[key]))errors.push(`${code}/${s.id}: missing note ${key}`);
      const canonical=u.slides[index];
      for(const key of teacherKeys)if(blank(canonical?.teacherLayer?.[key]))errors.push(`${code}/${canonical?.id}: missing teacher layer ${key}`);
      const elaboration=elaborationsById.get(s.elaborationId);
      if(!elaboration)errors.push(`${code}/${s.id}: elaboration parity mismatch`);
      if(elaboration?.modelIds?.some(id=>!modelIds.has(id)))errors.push(`${code}/${s.id}: unresolved model id`);
      const checkpoint=u.masteryItems[index];
      for(const key of ["prompt","expectedAnswer","acceptableRepresentations","evidenceOfMastery","likelyMisconception","remediation","decision"])if(blank(checkpoint?.[key]))errors.push(`${code}/${checkpoint?.id}: missing mastery field ${key}`);
      if(blank(checkpoint?.decision?.continueWhen)||blank(checkpoint?.decision?.reteachWhen))errors.push(`${code}/${checkpoint?.id}: incomplete continue/reteach decision`);
    }
    for(const model of u.models){
      if(blank(model.accessibleDescription)||blank(model.usedBy)||model.usedBy.length<3)errors.push(`${code}/${model.id}: incomplete model contract`);
    }
    const topic=path.join(root,u.resourceLinks.topic.replace(/^\//,""),"index.html");
    if(!fs.existsSync(topic))errors.push(`${code}: missing topic page`);
    if(!hub.includes(`live.html?code=${code}`))errors.push(`${code}: hub not linked to live slides`);
    if(hub.includes(`${code.toLowerCase()}-teacher-slide.pdf`))errors.push(`${code}: legacy one-page slide still linked`);
  }
  if(yearElabs!==wantedElabs)errors.push(`Year ${year}: expected ${wantedElabs} elaborations; found ${yearElabs}`);
  elaborationTotal+=yearElabs;
}

const forbidden=/\bE\d+\b|curriculum elaboration|\\(?:frac|sqrt|times|div|pi|mathrm)|\{[^}]+\}/i;
for(const value of projected)if(forbidden.test(String(value)))errors.push(`Projected text contains authoring/LaTeX artefact: ${String(value).slice(0,120)}`);
for(const asset of ["assets/year8-maths-render.js","assets/year8-maths-slides.js"]){
  const source=fs.readFileSync(path.join(root,asset),"utf8");
  for(const component of ["numberline","equation","graph","table","geometry","measurement","data","probability","algorithm","network","ratio","timeline","relationship"]){
    if(!source.includes(`${component}:`)&&!source.includes(`===\"${component}\"`))errors.push(`${asset}: missing renderer for ${component}`);
  }
}
const renderSource=fs.readFileSync(path.join(root,"assets/year8-maths-render.js"),"utf8");
const slideSource=fs.readFileSync(path.join(root,"assets/year8-maths-slides.js"),"utf8");
for(const [code,u] of Object.entries(allData)){
  const topicRoot={innerHTML:""};
  const topicBox={window:{SkillrUpperMathsData:{[code]:u},skillrPageMeta:{curriculumCode:code}},document:{getElementById:id=>id==="year8Topic"?topicRoot:null}};
  vm.runInNewContext(renderSource,topicBox);
  if(!topicRoot.innerHTML||topicRoot.innerHTML.includes("undefined"))errors.push(`${code}: topic renderer runtime/parity failure`);
  if((topicRoot.innerHTML.match(/class="concept-visual/g)||[]).length!==u.teachingSlides.length)errors.push(`${code}: topic visual count mismatch`);
  const slideRoot={innerHTML:"",querySelectorAll:()=>Array.from({length:u.teachingSlides.length+2},()=>({classList:{toggle(){}}})),querySelector:()=>({textContent:"",onclick:null})};
  const backLink={href:""};
  const slideBox={window:{SkillrUpperMathsData:{[code]:u}},location:{search:`?code=${code}`},document:{title:"",body:{classList:{toggle(){}}},getElementById:id=>id==="slideRoot"?slideRoot:id==="backLink"?backLink:null,addEventListener(){}},URLSearchParams};
  vm.runInNewContext(slideSource,slideBox);
  if(!slideRoot.innerHTML||slideRoot.innerHTML.includes("undefined"))errors.push(`${code}: slide renderer runtime/parity failure`);
  if((slideRoot.innerHTML.match(/<section class="slide">/g)||[]).length!==u.teachingSlides.length+2)errors.push(`${code}: teacher-slide count mismatch`);
}
if(codeTotal!==71||elaborationTotal!==314)errors.push(`Total mismatch: ${codeTotal} codes and ${elaborationTotal} elaborations`);
if(errors.length){console.error([...new Set(errors)].join("\n"));process.exit(1)}
console.log(`PASS: ${codeTotal} Year 8–10 Maths codes; ${elaborationTotal} elaborations mapped one-to-one across canonical v1.1 topic, slide, model and checkpoint records.`);
