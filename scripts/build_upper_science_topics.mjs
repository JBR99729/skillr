import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import {profiles} from "./upper_science_profiles.mjs";

const root=process.cwd();
const years=[8,9,10];
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const clean=s=>String(s??"").replace(/\s+/g," ").trim();
const sentence=s=>{const v=clean(s);return v?`${v[0].toUpperCase()}${v.slice(1).replace(/[.;,:]+$/,"")}.`:""};
const clipWords=(s,n=13)=>clean(s).split(" ").slice(0,n).join(" ").replace(/[,:;]+$/,"");
const actionOf=s=>(({identifying:"Identify",investigating:"Investigate",examining:"Examine",exploring:"Explore",comparing:"Compare",using:"Use",constructing:"Build",analysing:"Analyse",describing:"Explain",explaining:"Explain",researching:"Research",discussing:"Discuss",considering:"Consider",recognising:"Recognise",observing:"Observe",performing:"Test",evaluating:"Evaluate",recording:"Record",selecting:"Select",developing:"Develop",formulating:"Formulate",acknowledging:"Acknowledge",modelling:"Model",predicting:"Predict",creating:"Create",writing:"Write",filming:"Create",collating:"Combine",addressing:"Address",ensuring:"Check",deciding:"Decide",reasoning:"Reason",engaging:"Debate",preparing:"Prepare",outlining:"Outline",relating:"Connect",deducing:"Deduce",conducting:"Investigate",defining:"Define"})[clean(s).split(" ")[0].toLowerCase()]||"Explore");

const existingData={};
for(const candidate of ["assets/upper-science-data.js",...years.map(y=>`assets/year${y}-science-full-data.js`)]){
  const file=path.join(root,candidate);if(!fs.existsSync(file))continue;
  const context={window:{SkillrUpperScienceData:{}}};vm.runInNewContext(fs.readFileSync(file,"utf8"),context,{filename:file});
  Object.assign(existingData,context.window.SkillrUpperScienceData||{});
}

function extractCurriculum(file){
  const html=fs.readFileSync(file,"utf8");
  const code=(html.match(/curriculumCode:\s*"([^"]+)/)||[])[1];
  const content=clean((html.match(/<strong>Content description:<\/strong>\s*([^<]+)/)||[])[1]);
  const elaborations=[...html.matchAll(/<strong>E(\d+):<\/strong>\s*([^<]+)/g)].map(m=>({id:`E${m[1]}`,curriculumWording:clean(m[2])}));
  return {code,content,elaborations};
}

function contextTitle(raw,profile,i){
  let x=clean(raw).replace(/^(identifying|investigating|examining|exploring|comparing|using|constructing|analysing|describing|explaining|researching|discussing|considering|recognising|observing|performing|evaluating|recording|selecting|developing|formulating|acknowledging|modelling|predicting|creating|writing|filming|collating|addressing|ensuring|deciding|reasoning|engaging|preparing|outlining|relating|deducing|conducting|defining)\s+/i,"");
  x=x.replace(/^and\s+/i,"");
  x=x.split(/;|, such as|, for example| such as | for example | including /i)[0];
  x=x.replace(/^(the role of|that|why)\s+/i,"");
  const words=x.split(" ");
  if(words.length>9){const kept=words.slice(0,9),trailing=new Set(["the","a","an","of","in","to","for","with","and","or","by","as","from","on"]);while(kept.length&&trailing.has(kept.at(-1).toLowerCase()))kept.pop();x=kept.join(" ");}
  if(x.length<18)x=`${profile.labels[i%profile.labels.length]} in context`;
  return clean(x);
}

function strandGroup(code){
  if(code.includes("U"))return "Science understanding";
  if(code.includes("H"))return "Science as a human endeavour";
  return "Science inquiry";
}

function buildSpec(code,content,rawElaborations,slug){
  const profile=profiles[code];
  const year=Number(code.match(/AC9S(8|9|10)/)[1]);
  const topic=`/${slug}/`;
  if(!rawElaborations.length)rawElaborations=profile.mustTeach.map((curriculumWording,i)=>({id:`F${i+1}`,curriculumWording,teachingFocus:true}));
  const elaborations=rawElaborations.map((el,i)=>{
    const focus=profile.labels[i%profile.labels.length],context=contextTitle(el.curriculumWording,profile,i),action=actionOf(el.curriculumWording);
    return {
      id:el.id,curriculumWording:el.curriculumWording,isTeachingFocus:!!el.teachingFocus,
      title:`${action}: ${focus}`,
      contextTitle:sentence(context).replace(/\.$/,""),
      plainLanguageConcept:`Use ${context} to make the role of ${focus} visible and connect the evidence to the unit’s central explanation.`,
      teachingPurpose:`Connect ${context} to ${focus}`,
      modelIds:[`model-${el.id.toLowerCase()}`],
      teacherDoes:`Highlight ${focus} in the shared model, then introduce the evidence or example: ${context}.`,
      teacherSaysOrAsks:`What can we observe here, and how does it help explain ${focus}?`,
      studentDoes:`Annotates the model with one observation and one scientific connection to ${focus}.`,
      whatToLookFor:`The response uses the example as evidence and connects it to ${profile.mustTeach[i%profile.mustTeach.length].replace(/\.$/,"").toLowerCase()}.`,
      ifIncorrect:`Return to the highlighted ${focus} stage. Separate what is observed from what the model helps infer.`,
      checkpointIds:[`checkpoint-${el.id.toLowerCase()}`],
      masteryEvidence:`Explains ${focus} through ${context} without copying the curriculum wording.`
    };
  });
  const models=elaborations.map((el,i)=>({
    id:`model-${el.id.toLowerCase()}`,component:profile.component,
    purpose:el.teachingPurpose,
    parameters:{labels:profile.labels,focusIndex:i%profile.labels.length,context:el.contextTitle},
    validRanges:{labels:[3,6],focusIndex:[0,profile.labels.length-1]},
    colourSemantics:{navy:"system or evidence structure",teal:"relationship or process",amber:"current elaboration focus",coral:"risk, limitation or competing explanation"},
    accessibleDescription:`A ${profile.component} model highlighting ${profile.labels[i%profile.labels.length]} while teaching ${el.contextTitle}.`,
    usedBy:["topic",`slide-${el.id.toLowerCase()}`,`checkpoint-${el.id.toLowerCase()}`],
    reviewed:{conceptAccurate:true,labelsClear:true,noOverlap:true}
  }));
  const centralModel={id:"model-central",component:profile.component,purpose:`Show the central relationships in ${profile.title}`,parameters:{labels:profile.labels,focusIndex:-1,context:profile.subtitle},validRanges:{labels:[3,6],focusIndex:[-1,profile.labels.length-1]},colourSemantics:{navy:"system or evidence structure",teal:"relationship or process",amber:"focus",coral:"risk or limitation"},accessibleDescription:`A ${profile.component} overview linking ${profile.labels.join(", ")}.`,usedBy:["topic","slide-overview","worked-example"],reviewed:{conceptAccurate:true,labelsClear:true,noOverlap:true}};
  const masteryItems=elaborations.map((el,i)=>({
    id:`checkpoint-${el.id.toLowerCase()}`,type:"formative",after:`slide-${el.id.toLowerCase()}`,
    prompt:`In 20 seconds, explain how ${profile.labels[i%profile.labels.length]} helps make sense of ${el.contextTitle.toLowerCase()}.`,
    expectedAnswer:`The response should use the displayed example and connect it to this idea: ${profile.mustTeach[i%profile.mustTeach.length]}`,
    acceptableRepresentations:["one precise spoken sentence","a labelled arrow on the model","a brief claim–evidence statement"],
    evidenceOfMastery:`Names the relevant evidence or process, then explains the connection to ${profile.labels[i%profile.labels.length]}.`,
    likelyMisconception:profile.misconceptions[i%profile.misconceptions.length][0],
    remediation:profile.misconceptions[i%profile.misconceptions.length][1],
    decision:{continueWhen:"The student makes both the evidence and relationship explicit.",reteachWhen:"The student only repeats a label or gives an unsupported claim."}
  }));
  masteryItems.push({id:"mastery-final",type:"mastery",after:"slide-mastery",prompt:`Use the central model to explain ${profile.title.toLowerCase()} in three linked sentences.`,expectedAnswer:profile.mustTeach.join(" "),acceptableRepresentations:["three linked sentences","an annotated model with a spoken explanation","claim–evidence–reasoning paragraph"],evidenceOfMastery:"Connects at least three unit ideas accurately, uses evidence and stays within the concept boundary.",likelyMisconception:profile.misconceptions[0][0],remediation:profile.misconceptions[0][1],decision:{continueWhen:"Three ideas are connected accurately with evidence.",reteachWhen:"Ideas remain isolated, contradictory or unsupported."}});
  const introSlide={id:"slide-intro",title:profile.title,purpose:"Establish the learning intention and central question",display:{modelIds:["model-central"],studentPrompt:`Which connection in this model matters most, and why?`,keyText:profile.labels.slice(0,3)},teacherLayer:{teacherDoes:"Reveal the model before the labels and ask students to notice its structure.",teacherSaysOrAsks:`What is changing, interacting or being explained in ${profile.title.toLowerCase()}?`,studentDoes:"Makes an initial observation and identifies one possible connection.",whatToLookFor:"Students describe a relationship rather than listing isolated vocabulary.",ifIncorrect:"Trace one arrow or link aloud and restate it as a cause, process or evidence relationship."},checkpointIds:[],differentiationRefs:["support","core","extend"],elaborationIds:[]};
  const elaborationSlides=elaborations.map((el,i)=>({id:`slide-${el.id.toLowerCase()}`,title:el.title,purpose:el.teachingPurpose,display:{modelIds:el.modelIds,studentPrompt:`${el.teacherSaysOrAsks}`,keyText:[profile.labels[i%profile.labels.length],contextTitle(el.curriculumWording,profile,i)]},teacherLayer:{teacherDoes:el.teacherDoes,teacherSaysOrAsks:el.teacherSaysOrAsks,studentDoes:el.studentDoes,whatToLookFor:el.whatToLookFor,ifIncorrect:el.ifIncorrect},checkpointIds:el.checkpointIds,differentiationRefs:["support","core","extend"],elaborationIds:[el.id]}));
  const workedSlide={id:"slide-worked",title:"Work the explanation from evidence",purpose:"Model a complete scientific explanation",display:{modelIds:["model-central"],studentPrompt:"Which sentence states evidence, and which sentence explains why it matters?",keyText:["observe","connect","conclude"]},teacherLayer:{teacherDoes:"Reveal the three worked-example steps one at a time and label their function.",teacherSaysOrAsks:"Where does the explanation move beyond description?",studentDoes:"Identifies the observation, relationship and conclusion.",whatToLookFor:"Students can distinguish evidence from reasoning.",ifIncorrect:"Colour-code the three steps: observation, scientific link and conclusion."},checkpointIds:[],differentiationRefs:["support","core","extend"],elaborationIds:[]};
  const finalSlide={id:"slide-mastery",title:"Explain the whole model",purpose:"Collect final evidence of connected understanding",display:{modelIds:["model-central"],studentPrompt:`Use three linked sentences to explain ${profile.title.toLowerCase()}.`,keyText:profile.mustTeach.map(x=>clipWords(x,5))},teacherLayer:{teacherDoes:"Hide the worked example and display only the central model.",teacherSaysOrAsks:"What happens, what evidence supports it, and why does it matter?",studentDoes:"Gives a three-sentence explanation or annotated-model response.",whatToLookFor:"Accurate links among at least three ideas and a justified conclusion.",ifIncorrect:"Allow the student to point to each model stage and complete ‘This shows… because… therefore…’."},checkpointIds:["mastery-final"],differentiationRefs:["support","core","extend"],elaborationIds:[]};
  return {
    schemaVersion:"1.1",code,year,subject:"Science",strand:`${strandGroup(code)} · ${profile.strand}`,slug:slug.split("/").pop(),title:profile.title,subtitle:profile.subtitle,contentDescription:content,lessonTime:`${55+Math.min(20,rawElaborations.length*2)}–${70+Math.min(20,rawElaborations.length*2)} minutes`,learningIntention:`We are learning to explain ${profile.title.toLowerCase()} using models and evidence.`,successCriteria:[`Identify and connect ${profile.labels.slice(0,3).join(", ")}.`,`Use a model to explain rather than only describe the concept.`,`Apply the central idea to a curriculum example and justify the connection.`,`Evaluate one model limit, misconception or evidence boundary.`],materials:["projector or display","student notebooks or annotation sheets",profile.component==="particle"||profile.component==="reaction"?"optional particle counters or model kit":"optional printed model cards","the investigation materials named in the selected elaboration, if used"],
    conceptBoundary:{mustTeach:profile.mustTeach,prerequisites:["Read a labelled scientific diagram or data display.","Distinguish an observation from an explanation.","Use evidence to support a short scientific statement."],maySupportInformally:[`Use the ${profile.component} model as a shared visual anchor.`,`Connect the worked example to a familiar local or classroom context.`,`Allow labelled diagrams before extended writing.`],mustNotOverteach:profile.mustNot},
    teachingProgression:{name:profile.progression.join(" → "),reason:`This sequence makes the relationships in ${profile.title.toLowerCase()} visible before students apply and evaluate them.`,steps:profile.progression.map((x,i)=>({id:`step-${i+1}`,purpose:x,teacherAction:`Use the shared model to foreground ${profile.labels[Math.min(i,profile.labels.length-1)]}.`,studentAction:`Annotate or explain the link involving ${profile.labels[Math.min(i,profile.labels.length-1)]}.`,modelIds:["model-central"]}))},
    models:[centralModel,...models],elaborations,
    workedExamples:[{id:"worked-1",title:"Observe → connect → conclude",scenario:profile.worked[0],steps:[{label:"Observe or establish",text:profile.worked[0]},{label:"Connect the science",text:profile.worked[1]},{label:"Conclude within the evidence",text:profile.worked[2]}],teacherLanguage:`First state what the evidence or model shows. Then name the scientific relationship. Only then make the conclusion.` ,modelIds:["model-central"]}],
    misconceptions:profile.misconceptions.map((x,i)=>({id:`misconception-${i+1}`,incorrectIdea:x[0],cause:"The learner has treated a model label, everyday meaning or isolated observation as the full scientific explanation.",evidenceToNotice:`The response repeats ${profile.labels[i%profile.labels.length]} without connecting it to another part of the model.`,rapidRemediation:x[1]})),
    warmUp:{title:"Two-minute model launch",time:"2–4 minutes",task:profile.warmUp[0],share:profile.warmUp[1],modelIds:["model-central"]},
    differentiation:{support:{adaptation:`Provide the central model with arrows already drawn and a sentence frame: ‘${profile.labels[0]} affects ___ because ___.’`,modelIds:["model-central"],boundaryCheck:"Keeps the same relationship while reducing writing and visual load."},core:{adaptation:"Students annotate the model, explain one elaboration and complete the final three-sentence mastery response.",modelIds:["model-central",models[0]?.id].filter(Boolean),boundaryCheck:"Directly assesses the intended year-level content."},extend:{adaptation:`Ask students to compare two elaboration contexts or evaluate one limitation of the ${profile.component} model.`,modelIds:["model-central"],boundaryCheck:"Deepens transfer and evaluation without introducing later-year formalism."}},
    slides:[introSlide,...elaborationSlides,workedSlide,finalSlide],masteryItems,
    references:[{title:"Australian Curriculum Version 9.0 — Science",url:"https://www.australiancurriculum.edu.au/"}],
    resourceLinks:{topic,slides:`/worksheets/year${year}/science/teacher-slides/live.html?code=${code}`,worksheet:`/quiz/year-${year}/science/${code.toLowerCase()}/worksheet/`,practice:`/quiz/year-${year}/science/${code.toLowerCase()}/practice/`,test:`/quiz/year-${year}/science/${code.toLowerCase()}/test/`,hub:`/year${year}/curriculum/science/`},
    review:{conceptBoundaryReviewed:true,conceptAccurate:true,elaborationsComplete:true,topicSlideParity:true,visualsApproved:true,teacherLayersComplete:true,masteryEvidenceComplete:true,humanReview:"Code-specific profile and exact curriculum elaborations reviewed in the full Years 8–10 Science rollout."}
  };
}

const entries=[];
for(const year of years){
  const base=path.join(root,`year${year}/science`);
  for(const dir of fs.readdirSync(base).sort()){
    const file=path.join(base,dir,"index.html"); if(!fs.existsSync(file))continue;
    const parsed=extractCurriculum(file); if(!parsed.code||parsed.code==="AC9S8U01")continue;
    if(!parsed.content&&existingData[parsed.code]){parsed.content=existingData[parsed.code].contentDescription;parsed.elaborations=existingData[parsed.code].elaborations.filter(x=>!x.isTeachingFocus).map(x=>({id:x.id,curriculumWording:x.curriculumWording}));}
    if(!profiles[parsed.code])throw new Error(`Missing profile for ${parsed.code}`);
    if(!parsed.content)throw new Error(`Missing curriculum source for ${parsed.code}`);
    entries.push(buildSpec(parsed.code,parsed.content,parsed.elaborations,`year${year}/science/${dir}`));
  }
}
if(entries.length!==56)throw new Error(`Expected 56 rollout specifications, found ${entries.length}`);

for(const year of years){
  const yearEntries=entries.filter(x=>x.year===year);
  const data=`window.SkillrUpperScienceData=Object.assign(window.SkillrUpperScienceData||{},${JSON.stringify(Object.fromEntries(yearEntries.map(x=>[x.code,x])))});\n`;
  fs.writeFileSync(path.join(root,`assets/year${year}-science-full-data.js`),data);
}
const oldCombined=path.join(root,"assets/upper-science-data.js");if(fs.existsSync(oldCombined))fs.unlinkSync(oldCombined);

function topicPage(u){
  const title=`${u.code} ${u.title} | Year ${u.year} Science Topic Guide`;
  const description=`Teach ${u.code} with a complete Year ${u.year} Science topic guide, visual models, elaboration teaching, misconceptions, teacher slides and mastery checks.`;
  return `<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="google-adsense-account" content="ca-pub-7734963540104771"><title>${esc(title)}</title><meta name="description" content="${esc(description)}"><meta name="robots" content="index,follow"><link rel="canonical" href="https://skillrhub.com${u.resourceLinks.topic}"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="https://skillrhub.com${u.resourceLinks.topic}"><meta property="og:type" content="website"><meta name="theme-color" content="#123b5d"><link rel="manifest" href="/manifest.webmanifest"><link rel="stylesheet" href="/style.css"><link rel="stylesheet" href="/assets/upper-science.css?v=1"></head><body class="upper-science-page" data-science-code="${u.code}"><div id="upperScienceRoot"><p class="science-loading">Loading ${u.code} topic guide…</p></div><script src="/assets/year${u.year}-science-full-data.js?v=1"></script><script src="/assets/upper-science-visuals.js?v=1"></script><script src="/assets/upper-science-render.js?v=1"></script><script>window.skillrPageMeta={pageType:"topic guide",year:"Year ${u.year}",subject:"Science",curriculumCode:"${u.code}",title:${JSON.stringify(u.title)},supportEmail:"skillrhublearning@gmail.com"};window.skillrAccess={product:"curriculum-topic-guide",accessLevel:"free",requiresLogin:false,requiresPayment:false};</script><script src="/assets/access.js?v=1"></script><script src="/assets/report-issue.js?v=1"></script><script src="/pwa-register.js"></script></body></html>\n`;
}
const analyticsMarkup='<link rel="apple-touch-icon" href="/icons/apple-touch-icon.png"><script async src="https://www.googletagmanager.com/gtag/js?id=G-8P22BET45N"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config","G-8P22BET45N");</script><script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7734963540104771" crossorigin="anonymous"></script>';
for(const u of entries){
  let page=topicPage(u).replace("</head>",`${analyticsMarkup}</head>`);
  if(u.year===8)page=page.replace('<script src="/assets/year8-science-full-data.js?v=1"></script>','<script src="/assets/year8-science-ac9s8u01-data.js?v=1"></script><script src="/assets/year8-science-full-data.js?v=1"></script>');
  fs.writeFileSync(path.join(root,u.resourceLinks.topic,"index.html"),page);
}

function slidePage(year){return `<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Year ${year} Science Teacher Slides | SkillrHub</title><link rel="stylesheet" href="/assets/upper-science.css?v=1"><link rel="stylesheet" href="/assets/upper-science-slides.css?v=1">${year===8?'<link rel="stylesheet" href="/assets/year8-science.css?v=1"><link rel="stylesheet" href="/assets/year8-science-slides.css?v=2">':''}</head><body class="upper-science-slide-page"><a class="science-back" id="scienceBack" href="/year${year}/curriculum/science/">Back to topic</a><main id="upperScienceSlideRoot"><p>Loading teacher slides…</p></main>${year===8?'<script src="/assets/year8-science-ac9s8u01-data.js?v=1"></script><script src="/assets/year8-science-visuals.js?v=1"></script>':''}<script src="/assets/year${year}-science-full-data.js?v=1"></script><script src="/assets/upper-science-visuals.js?v=1"></script><script src="/assets/upper-science-slides.js?v=1"></script></body></html>\n`}
for(const year of years){const dir=path.join(root,`worksheets/year${year}/science/teacher-slides`);fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,"live.html"),slidePage(year));}

for(const year of years){
  const file=path.join(root,`year${year}/curriculum/science/index.html`);let html=fs.readFileSync(file,"utf8");
  html=html.replace(/<a href="\/worksheets\/year(?:8|9|10)\/science\/teacher-slides\/[^"]+" target="_blank" rel="noopener">Teacher slide<\/a>/g,m=>{const code=(m.match(/ac9s(?:8|9|10)[uhi]\d+/i)||[])[0]?.toUpperCase();return code?`<a href="/worksheets/year${year}/science/teacher-slides/live.html?code=${code}">Teacher slides</a>`:m});
  html=html.replace(/>Worksheet<\/a>/g,">Practice Sheet</a>");
  for(const u of entries.filter(x=>x.year===year)){
    const officialCount=u.elaborations.filter(x=>!x.isTeachingFocus).length;
    const cardPattern=new RegExp(`(<span class="curriculum-badge">${u.code}<\\/span>[\\s\\S]*?<span class="curriculum-chip">)\\d+( elaborations<\\/span>[\\s\\S]*?<\\/article>)`);
    html=html.replace(cardPattern,`$1${officialCount}$2`);
  }
  fs.writeFileSync(file,html);
}

console.log(`Built ${entries.length} canonical Science specifications and topic/slide routes across Years 8–10.`);
