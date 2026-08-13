import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import {year7MathsAuthoredOverrides} from "./year7-maths-topic-v2-authored-configs.mjs";
import {year7MathsNumberA01Overrides,requiredNumberA01OverrideCodes} from "./year7-maths-topic-v2-number-a01-overrides.mjs";
import {year7MathsSpaceStatsProbabilityConfigs} from "./year7-maths-topic-v2-space-stats-probability-configs.mjs";

const root=process.cwd();
const read=file=>fs.readFileSync(path.join(root,file),"utf8");
const sentence=value=>{const text=String(value||"").trim().replace(/[.!?]+$/,"" );return text?`${text}.`:"";};
const modules=new Map();
const context={window:{}};
vm.runInNewContext(read("assets/year7-curriculum-base.js"),context);
for(const file of ["assets/year7-maths-data-n.js","assets/year7-maths-data-am.js","assets/year7-maths-data-spstp.js"])vm.runInNewContext(read(file),context);
const legacy=context.window.SkillrYear7MathsData;
const registry=JSON.parse(read("data/curriculum-units.json")).units.filter(x=>x.yearNumber===7&&x.subject==="Mathematics");
if(registry.length!==30||Object.keys(legacy).length!==30)throw new Error(`Expected 30 registry/legacy units; found ${registry.length}/${Object.keys(legacy).length}`);

function q(id,tier,prompt,answer,summary,hint){return{id,tier,prompt:sentence(prompt),answer:sentence(answer),summary:sentence(summary),hint:sentence(hint)};}
/* Historical production-bank adapter removed from topic-module publishing.
  const workedIndices=authored?.workedExampleSheetIndices||[0,4];
  module.topic.workedExamples=workedIndices.map(sheetIndex=>chosen[sheetIndex]).map((item,index)=>({
    title:`Worked example ${index+1}: ${item.question.replace(/[?]$/,"")}`,
    steps:[sentence(`Problem: ${item.question}`),sentence(`Method cue: ${item.explanation.hint}`),sentence(`Reasoning: ${item.explanation.summary}`),sentence(`Therefore the answer is ${itemAnswer(item)}`)],
    answer:sentence(itemAnswer(item)),
    check:sentence(`Check ${itemAnswer(item)} against the stated conditions: ${item.explanation.summary}`)
  }));
  const guided=module.topic.workedExamples[0],quick=chosen[authored?.quickCheckSheetIndex??7];
  module.slides[2].title=guided.title;module.slides[2].body=guided.steps;module.slides[2].expectedResponse=guided.answer;module.slides[2].remediation=sentence(chosen[0].explanation.hint);
  module.slides[3].body=[sentence(quick.question),"Explain the operation, representation or evidence that makes your answer correct."];module.slides[3].expectedResponse=sentence(`${itemAnswer(quick)} ${quick.explanation.summary}`);module.slides[3].remediation=sentence(quick.explanation.hint);
  return module;
}
*/
function build(unit,row){
  const code=row.code, terms=unit.terms, mistakes=unit.mistakes.slice(0,3), quick=unit.quick;
  const text=html=>String(html||"").replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim();
  const note=html=>sentence((String(html||"").match(/<p>(.*?)<\/p>/g)||[]).at(-1)?.replace(/<[^>]+>/g," ")||text(html));
  unit.core=unit.learn;
  unit.modelNote=note(unit.model_html);
  unit.applyNote=note(unit.apply_html);
  unit.correctExample=unit.worksheet?.[2]?.answers?.[0]||unit.modelNote;
  const extensions=(unit.worksheet||[]).filter(item=>item.enrichment);
  unit.enrichment1=extensions[0]?.question||`Create and verify a new example of ${unit.title.toLowerCase()}`;
  unit.enrichment2=extensions[1]?.question||`Compare two methods for ${unit.title.toLowerCase()} and justify which is stronger`;
  const modelAlt=`A code-specific visual model for ${unit.model_title.toLowerCase()}: ${unit.model_html.replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim()}`;
  const applyAlt=`A code-specific application model for ${unit.apply_title.toLowerCase()}: ${unit.apply_html.replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim()}`;
  const visuals=code==="AC9M7N01"?[
    {id:`${code.toLowerCase()}-model`,type:"squareArray",parameters:{side:12,total:144},alt:"A 12 by 12 square array containing 144 small squares, showing that 12 squared equals 144 and the principal square root of 144 equals 12."},
    {id:`${code.toLowerCase()}-application`,type:"rootBounds",parameters:{lower:64,value:70,upper:81,lowerRoot:8,upperRoot:9},alt:"A number line showing 70 between the perfect squares 64 and 81, so the square root of 70 lies between 8 and 9."}
  ]:[{id:`${code.toLowerCase()}-model`,type:"legacyHtml",html:unit.model_html,alt:sentence(modelAlt)},{id:`${code.toLowerCase()}-application`,type:"legacyHtml",html:unit.apply_html,alt:sentence(applyAlt)}];
  return {schemaVersion:"2.0",identity:{code,year:7,subject:"Mathematics",strand:row.strand||"Mathematics",title:unit.title,description:sentence(row.description),slug:unit.slug},topic:{
    learningIntention:sentence(`We are learning to ${unit.desc}`),
    successCriteria:[sentence(`I can explain ${unit.model_title.toLowerCase()}`),sentence(`I can ${unit.apply_title.toLowerCase()}`),sentence(`I can apply ${unit.title.toLowerCase()} and justify an independent check`)],
    deepDive:[sentence(`${unit.core} This relationship is the organising idea for ${unit.title.toLowerCase()}`),sentence(`${unit.modelNote} The model makes the quantities, conditions and mathematical structure visible before a rule is applied`),sentence(`${unit.applyNote} A complete solution therefore represents the situation, carries out the mathematics, interprets the result and verifies that it is reasonable`)],
    vocabulary:terms.map(([term,definition])=>({term,definition:sentence(definition)})),
    misconceptions:mistakes.map(([idea,correction])=>({idea:sentence(idea),correction:sentence(correction)})),
    workedExamples:[
      {title:unit.model_title,steps:[sentence(`Identify the quantities and condition in ${unit.title.toLowerCase()}`),sentence(`Use the labelled model: ${unit.modelNote}`),sentence(`Apply the central relationship: ${unit.core}`),sentence(`State the result in the original context and verify it`) ],answer:sentence(unit.correctExample||unit.modelNote),check:sentence(`Check the result against this relationship: ${unit.core}`)},
      {title:unit.apply_title,steps:[sentence(`Read the new situation and decide which representation from ${unit.apply_title.toLowerCase()} is useful`),sentence(unit.applyNote),sentence(`Carry out the required comparison or calculation with labels and units`),sentence(`Interpret the result and test it with a second representation, estimate or counterexample`)],answer:sentence(unit.applyNote),check:sentence(`The conclusion must remain consistent with ${unit.core}`)}
    ],
    visuals
  },slides:[
    {role:"learning",title:"Learning intention and success criteria",body:[sentence(`We are learning to ${unit.desc}`),sentence(`Success means explaining ${unit.model_title.toLowerCase()}, applying it and justifying a check`)],visualIds:[`${code.toLowerCase()}-model`],teacherNotes:sentence(`Activate relevant prior knowledge, then introduce ${unit.model_title.toLowerCase()} without hiding its conditions`),expectedResponse:sentence(unit.core),misconceptionResponse:mistakes[0][1],remediation:sentence(`Return to the labelled model and ask the student to connect each quantity to ${terms[0][0]}`)},
    {role:"refresher",title:"Concept refresher and visual clues",body:[sentence(unit.core),sentence(unit.modelNote),sentence(`Key vocabulary: ${terms.map(x=>x[0]).join(", ")}`)],visualIds:[`${code.toLowerCase()}-model`,`${code.toLowerCase()}-application`],teacherNotes:sentence(`Reveal the visual in stages and ask students to name the invariant relationship or deciding condition`),expectedResponse:sentence(unit.modelNote),misconceptionResponse:mistakes[1]?.[1]||mistakes[0][1],remediation:sentence(`Use a smaller or familiar case, then reconnect it to ${unit.title.toLowerCase()}`)},
    {role:"guided",title:`Guided example: ${unit.model_title}`,body:[sentence(`Represent: ${unit.modelNote}`),sentence(`Reason: ${unit.core}`),sentence(`Apply: ${unit.correctExample||unit.applyNote}`),sentence(`Verify with an alternate representation or inverse check`)],visualIds:[`${code.toLowerCase()}-application`],teacherNotes:sentence(`Model each decision aloud and keep the representation connected to the calculation or claim`),expectedResponse:sentence(unit.correctExample||unit.applyNote),misconceptionResponse:mistakes[2]?.[1]||mistakes[0][1],remediation:sentence(`Pause after each step and ask which part of ${unit.core} justifies it`)},
    {role:"quickCheck",title:"60-second Quick Check / Turn and Talk",body:[sentence(quick[3]||quick[0]),sentence(`Explain the deciding relationship and one check to a partner`)],visualIds:[],teacherNotes:sentence(`Give 30 seconds of silent thinking and 30 seconds for partners to compare reasoning`),expectedResponse:sentence(unit.correctExample||unit.core),misconceptionResponse:mistakes[0][1],remediation:sentence(`Use the frame: I represented __; I used __ because __; I checked __`),concealAnswer:true}
  ],practiceSheet:{title:`${unit.title} Practice Sheet`,questions:[
    q(`${code}-PS-W1`,1,`Define ${terms[0][0]} in the context of ${unit.title}`,terms[0][1],`The definition identifies the precise mathematical role of ${terms[0][0]}`,`Use the topic model and describe what ${terms[0][0]} does`),
    q(`${code}-PS-W2`,1,`${unit.title}: write and explain the worked example shown in the central model`,unit.correctExample||unit.modelNote,`The response applies the central ${unit.title.toLowerCase()} relationship`, `Start from ${unit.model_title.toLowerCase()}`),
    q(`${code}-PS-W3`,1,`${unit.title}: explain what the labelled ${unit.model_title.toLowerCase()} shows`,unit.modelNote,`The visual model connects the representation to the required reasoning`, `Label the known quantities before calculating or comparing`),
    q(`${code}-PS-C1`,2,`${unit.title}: explain how to ${unit.apply_title.toLowerCase()} and state the deciding condition`,unit.applyNote,`The application uses the relevant condition and interprets the outcome`, `Identify the deciding condition in ${unit.core}`),
    q(`${code}-PS-C2`,2,`${unit.title}: use ${terms[1][0]} to justify the code-specific worked example`,unit.correctExample||unit.applyNote,`The worked relationship provides a valid code-specific example`, `Use ${terms[1][0]} precisely in your explanation`),
    q(`${code}-PS-C3`,2,`${unit.title}: state the central relationship and describe an independent check`,unit.core,`The check must agree with the central mathematical relationship`, `Try an inverse, estimate, alternate representation or counterexample`),
    q(`${code}-PS-C4`,2,`A student says, “${mistakes[0][0]}” Explain the error and correct it`,mistakes[0][1],`The correction addresses the misconception using the topic relationship`, `Return to the labelled model and test the claim`),
    q(`${code}-PS-E1`,3,unit.enrichment1,`${unit.modelNote} ${unit.core}`,`A complete extension response connects the constructed example to the central model and verifies it`, `Make every condition visible and show an independent check`),
    q(`${code}-PS-E2`,3,unit.enrichment2,`${unit.applyNote} ${unit.core}`,`A strong comparison evaluates strategies against the same mathematical conditions`, `Compare accuracy, efficiency and how clearly each method can be verified`)
  ]},links:{topic:row.url,slides:`/worksheets/year7/maths/teacher-slides/live.html?code=${code}`,practiceSheet:`/quiz/year-7/math/${code.toLowerCase()}/worksheet/`,topicPractice1:`/quiz/year-7/math/${code.toLowerCase()}/topic-practice-1/`,topicPractice2:`/quiz/year-7/math/${code.toLowerCase()}/topic-practice-2/`,practice:`/quiz/year-7/math/${code.toLowerCase()}/practice/`,test:`/quiz/year-7/math/${code.toLowerCase()}/test/`,hub:"/year7/curriculum/maths/"},preservedContent:[
    {source:`assets/year7-maths-data-*.js#${code}`,kind:"lesson model, vocabulary and misconceptions",destination:"v2 topic, slides and practice sheet",note:"Existing code-specific teaching material is retained, corrected through explicit reasoning and expanded into the new connected deliverables."},
    {source:`${row.url}index.html`,kind:"curriculum identity, elaborations, mapping and navigation",destination:"collapsed retained reference layer",note:"The legacy reference remains available on the topic route rather than being deleted."},
    {source:`/worksheets/year7/maths/teacher-slides/${code.toLowerCase()}-teacher-slide.pdf`,kind:"legacy teacher PDF",destination:"preserved legacy file",note:"The PDF remains in the repository while the primary link uses the four-screen live deck."},
    {source:`/quiz/year-7/math/${code.toLowerCase()}/worksheet/`,kind:"print workflow",destination:"v2 branded practice sheet",note:"The printable workflow is retained while assessment-bank reuse is replaced by an independent tiered sheet."}
  ]};
}

const overrideGroups=[year7MathsNumberA01Overrides,year7MathsAuthoredOverrides,year7MathsSpaceStatsProbabilityConfigs];
const authoredOverrides=new Map();
for(const group of overrideGroups){
  for(const [code,override] of Object.entries(group||{})){
    if(authoredOverrides.has(code))throw new Error(`${code}: duplicate authored override`);
    authoredOverrides.set(code,override);
  }
}
for(const code of requiredNumberA01OverrideCodes)if(!year7MathsNumberA01Overrides[code])throw new Error(`${code}: missing required Number/A01 override`);
const registryCodes=new Set(registry.map(row=>row.code));
for(const code of registryCodes)if(!authoredOverrides.has(code))throw new Error(`${code}: no complete authored topic-module override`);
for(const code of authoredOverrides.keys())if(!registryCodes.has(code))throw new Error(`${code}: authored override is not in the current registry`);
if(authoredOverrides.size!==30)throw new Error(`Expected 30 authored overrides; found ${authoredOverrides.size}`);

function applyAuthoredOverride(module,override){
  const topic=module.topic;
  if(override.title){
    module.identity.title=override.title;
    module.practiceSheet.title=`${override.title} Practice Sheet`;
  }
  if(override.learningIntention)topic.learningIntention=override.learningIntention;
  for(const field of ["deepDive","successCriteria","vocabulary","misconceptions","workedExamples","visuals"]){
    if(override[field])topic[field]=override[field];
  }
  if(override.questions){
    module.practiceSheet.questions=override.questions.map((question,index)=>({...question,id:`${module.identity.code}-PS-${String(index+1).padStart(2,"0")}`}));
  }
  module.practiceSheet.sheets=[
    {slug:"topic-practice-1",title:"Topic Practice 1",questionIndices:[0,1,2,3,4]},
    {slug:"topic-practice-2",title:"Topic Practice 2",questionIndices:[5,6,7,8]}
  ];
  const slidesByRole=new Map(module.slides.map(slide=>[slide.role,slide]));
  for(const [role,source] of Object.entries(override.slides||{})){
    const current=slidesByRole.get(role);
    if(!current)throw new Error(`${module.identity.code}: unknown slide role ${role}`);
    const layer={...source};
    if(layer.visualSelection){
      const index=layer.visualSelection==="application"?1:0;
      layer.visualIds=topic.visuals[index]?[topic.visuals[index].id]:[];
      delete layer.visualSelection;
    }
    Object.assign(current,layer);
  }
  slidesByRole.get("quickCheck").concealAnswer=true;
  if(override.preservedContent)module.preservedContent.push(...override.preservedContent);
  return module;
}

for(const row of registry){
  const built=build(legacy[row.code],row);
  modules.set(row.code,applyAuthoredOverride(built,authoredOverrides.get(row.code)));
}
const payload=[...modules.values()].sort((a,b)=>a.identity.code.localeCompare(b.identity.code));
fs.writeFileSync(path.join(root,"assets/year7-maths-topic-modules-v2.js"),`(()=>{\"use strict\";const modules=${JSON.stringify(payload)};modules.forEach(module=>window.SkillrTopicModulesV2.register(module));})();\n`);
const exportDirectory=path.join(root,"data/topic-modules/year7");
fs.mkdirSync(exportDirectory,{recursive:true});
const exportPayload={
  schemaVersion:"2.0",
  traceability:{year:7,subject:"Mathematics",registrySource:"data/curriculum-units.json",publicModuleAsset:"assets/year7-maths-topic-modules-v2.js"},
  modules:payload.map(module=>({identity:module.identity,topic:module.topic,slides:module.slides,practiceSheet:module.practiceSheet,preservedContent:module.preservedContent}))
};
fs.writeFileSync(path.join(exportDirectory,"mathematics.json"),`${JSON.stringify(exportPayload,null,2)}\n`);

const topicScripts=`<script src="/assets/topic-module-v2.js?v=3"></script><script src="/assets/year7-maths-topic-modules-v2.js?v=3"></script><script src="/assets/topic-module-v2-visuals.js?v=3"></script><script src="/assets/topic-module-v2-topic.js?v=3"></script>`;
const practiceRoute=(module,route,title)=>`<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="google-adsense-account" content="ca-pub-7734963540104771"><meta name="theme-color" content="#2457d6"><title>${module.identity.code} ${title} | SkillrHub</title><meta name="description" content="${module.identity.code} ${title}: tiered Year 7 Mathematics practice with complete answers, summaries and hints."><meta name="robots" content="index,follow"><link rel="canonical" href="https://skillrhub.com${route}"><link rel="manifest" href="/manifest.webmanifest"><link rel="apple-touch-icon" href="/icons/apple-touch-icon.png"><link rel="stylesheet" href="/assets/topic-module-v2-practice-sheet.css?v=2"><script async src="https://www.googletagmanager.com/gtag/js?id=G-8P22BET45N"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config","G-8P22BET45N");</script><script async src="https://pagead2.googlesyndication.com/pagead/js?client=ca-pub-7734963540104771" crossorigin="anonymous"></script></head><body><p>Loading ${module.identity.code} ${title}…</p><script src="/assets/topic-module-v2.js?v=2"></script><script src="/assets/year7-maths-topic-modules-v2.js?v=2"></script><script src="/assets/topic-module-v2-practice-sheet.js?v=2"></script><script src="/pwa-register.js"></script></body></html>\n`;
for(const module of payload){
  const topicPath=path.join(root,module.links.topic.replace(/^\//,""),"index.html");let html=fs.readFileSync(topicPath,"utf8");
  if(!html.includes("topic-module-v2.css"))html=html.replace(/<link rel="stylesheet" href="\/assets\/curriculum.css[^"]*">/,match=>`${match}\n  <link rel="stylesheet" href="/assets/topic-module-v2.css?v=1">`);
  if(!html.includes("topic-module-v2-topic.js"))html=html.replace('<script src="/pwa-register.js"></script>',`${topicScripts}\n<script src="/pwa-register.js"></script>`);
  html=html.replace(/\/assets\/(topic-module-v2|year7-maths-topic-modules-v2|topic-module-v2-visuals|topic-module-v2-topic)\.js\?v=\d+/g,"/assets/$1.js?v=3");
  fs.writeFileSync(topicPath,html);
  for(const [route,title] of [[module.links.practiceSheet,"Topic Practice 1"],[module.links.topicPractice1,"Topic Practice 1"],[module.links.topicPractice2,"Topic Practice 2"]]){
    const routePath=path.join(root,route.replace(/^\//,""),"index.html");
    fs.mkdirSync(path.dirname(routePath),{recursive:true});
    fs.writeFileSync(routePath,practiceRoute(module,route,title));
  }
}
console.log(`Built ${payload.length} Year 7 Maths v2 topic modules, 60 stable topic-practice routes and 30 legacy worksheet aliases.`);
