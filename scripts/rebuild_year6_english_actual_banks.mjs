import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const R=path.resolve(import.meta.dirname,'..');
const BANK=path.join(R,'assets/assessment-banks/year6/english');
const QUIZ=path.join(R,'quiz/year-6/english');
const captured={units:{},order:[]};
const sandbox={window:{SkillrYear6Register(subject,specs,order){if(subject==='english'){Object.assign(captured.units,specs);captured.order.push(...order);}}}};
vm.createContext(sandbox);
for(const f of ['assets/year6-english-data-la.js','assets/year6-english-data-le.js','assets/year6-english-data-ly.js']) vm.runInContext(fs.readFileSync(path.join(R,f),'utf8'),sandbox,{filename:f});
const units=captured.units,codes=[...new Set(captured.order)];
if(codes.length!==23) throw Error(`Expected 23 Year 6 English codes, found ${codes.length}`);

const PRACTICE_CONTEXTS=['class podcast','school newsletter','science investigation','community garden proposal','sports-club discussion','library display','museum caption','student council meeting','local-history article','environmental campaign','book-club discussion','excursion briefing','design project','weather report','school assembly','peer feedback session','cooking demonstration','arts review','technology presentation','playground consultation'];
const TEST_CONTEXTS=['community radio segment','wildlife-centre report','regional youth forum','coastal-monitoring update','heritage trail guide','public-transport survey','festival review','emergency-preparedness talk','water-saving brochure','local council submission','marine-research diary','farmers market profile','astronomy exhibition','river-restoration update','cycling-safety campaign','neighbourhood history podcast'];
const stages=['recognise','explain','discriminate','apply'];
const clean=v=>String(v??'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
const sentence=v=>clean(v).replace(/[.!?]+$/,'');
const slug=v=>clean(v).toLowerCase().replace(/[^a-z0-9]+/g,'_').replace(/^_|_$/g,'');
const rows=v=>{const d=v?.data;if(!Array.isArray(d))return[];if(d.every(Array.isArray)){const body=d.length>1&&d[0].every(x=>typeof x==='string')?d.slice(1):d;return body.map(r=>r.map(clean)).filter(r=>r.some(Boolean));}return d.map(x=>[clean(x)]).filter(r=>r[0]);};
const unique=(xs,exclude='')=>[...new Set(xs.map(clean).filter(x=>x&&x.toLowerCase()!==clean(exclude).toLowerCase()))];
const correctOf=choice=>choice?.[1]?.[0]||'';
const wrongsOf=choice=>choice?.[1]?.slice(1)||[];
function answers(correct,wrongs,index){let ws=unique(wrongs,correct);const fallback=['It does not match the evidence in the example.','It confuses this feature with a different one.','It makes a claim the text does not support.','It ignores the purpose and context.'];for(const f of fallback)if(ws.length<3&&!ws.includes(f)&&f!==correct)ws.push(f);const out=ws.slice(0,3).map(text=>({text,is_correct:false}));out.splice(index%4,0,{text:clean(correct),is_correct:true});return out;}
function make(code,bank,number,stage,skill,question,correct,wrongs,summary,hint,ci){const ans=answers(correct,wrongs,ci);return{id:`${code}-${bank==='practice'?'P':'T'}-${String(number).padStart(3,'0')}`,curriculum_code:code,year_level:'Year 6',subject:'english',bank,stage,skill:slug(skill||code),question:clean(question),audio_prompt:clean(question),answers:ans,correct_index:ans.findIndex(a=>a.is_correct),explanation:{summary:clean(summary),hint:clean(hint)},difficulty:stage==='recognise'?1:stage==='explain'?2:3,difficulty_tier:stage,sequence_priority:number,quality_schema:'skillr-authored-v1'};}
function misconception(unit,i){const m=unit.mistakes||[];return m[i%m.length]||['A familiar-looking answer is always correct','Check the whole example and the exact language clue before deciding.'];}
function term(unit,i){const t=unit.terms||[];return t[i%t.length]||[unit.title,'the main idea being practised'];}
function model(unit,i){const r=rows(unit.modelVisual);return r[i%Math.max(1,r.length)]||[unit.title,unit.questions?.choice1?.[1]?.[0]||unit.title,unit.modelNote||unit.learn];}
function applyRow(unit,i){const r=rows(unit.applyVisual);return r[i%Math.max(1,r.length)]||model(unit,i+1);}
function rowLabelPool(unit){return unique([...rows(unit.modelVisual),...rows(unit.applyVisual)].map(r=>r[0]));}
function rowExample(r){return r[1]||r[0];}
function rowEffect(r){return r[2]||'';}
function wrongPool(unit,correct){const terms=(unit.terms||[]).map(t=>t[0]);const labels=rowLabelPool(unit);const mistakes=(unit.mistakes||[]).map(m=>m[0]);return unique([...labels,...terms,...mistakes,...wrongsOf(unit.questions?.choice1),...wrongsOf(unit.questions?.choice2)],correct);}
function explainOptions(unit,good){const [bad,repair]=misconception(unit,0);return unique([`It matches the purpose and the language clue in the example.`,clean(unit.modelNote),clean(unit.applyNote),`It works only because it sounds more complicated.`,`It proves that ${sentence(bad).toLowerCase()}.`,`It is correct whenever the same word appears.`],good);
}
function buildPractice(code,unit){const out=[];for(let i=0;i<10;i++){
 const r=model(unit,i),[name,definition]=term(unit,i),choice=i%2?unit.questions?.choice2:unit.questions?.choice1,c=correctOf(choice),ctx=PRACTICE_CONTEXTS[i%PRACTICE_CONTEXTS.length],ci=(i+codes.indexOf(code))%4;
 let q,correct,wrongs,summary,hint,skill;
 if(i%5===0&&c){q=`In a ${ctx}, ${sentence(choice[0]).replace(/^./,m=>m.toLowerCase())}?`;correct=c;wrongs=wrongsOf(choice);summary=`“${c}” is the strongest choice because it matches the language feature and the situation.`;hint=unit.modelNote;skill=unit.quick?.[i%Math.max(1,unit.quick.length)]||unit.title;}
 else if(i%5===1){q=`Which term best matches this meaning: “${sentence(definition)}”?`;correct=name;wrongs=(unit.terms||[]).map(t=>t[0]);summary=`${name} means ${sentence(definition)}.`;hint=`Match the definition precisely; do not choose a nearby term just because it is familiar.`;skill=name;}
 else if(i%5===2){q=`Read this example from a ${ctx}: “${rowExample(r)}”. Which label best describes what the language is doing?`;correct=r[0];wrongs=wrongPool(unit,r[0]);summary=rowEffect(r)?`“${rowExample(r)}” is an example of ${r[0]}; here it ${sentence(rowEffect(r)).toLowerCase()}.`:`“${rowExample(r)}” is an example of ${r[0]}.`;hint=unit.modelNote;skill=r[0];}
 else if(i%5===3){const [bad,repair]=misconception(unit,i);q=`Which correction best fixes this idea: “${sentence(bad)}”?`;correct=repair;wrongs=(unit.mistakes||[]).map(m=>m[0]);summary=`${repair} This fixes the misconception without creating a new rule that is too broad.`;hint=`Check the actual language evidence rather than relying on an absolute rule.`;skill='misconception repair';}
 else{q=`Which example would be most useful when explaining ${unit.title.toLowerCase()} in a ${ctx}?`;correct=rowExample(r);wrongs=unique([...rows(unit.modelVisual),...rows(unit.applyVisual)].map(rowExample),rowExample(r));summary=`This example directly demonstrates ${r[0]} and can be explained using the language clue in the text.`;hint=unit.learn;skill=r[0];}
 out.push(make(code,'practice',i+1,'recognise',skill,q,correct,wrongs,summary,hint,ci));
 }
 for(let i=0;i<10;i++){
 const n=11+i,r=model(unit,i+2),ctx=PRACTICE_CONTEXTS[(i+6)%PRACTICE_CONTEXTS.length],ci=(i+1+codes.indexOf(code))%4,[bad,repair]=misconception(unit,i),effect=rowEffect(r),good=effect?`It ${sentence(effect).toLowerCase()} and supports the purpose of the text.`:`It makes the intended language choice clear in context.`;
 const q=i%2===0?`A ${ctx} includes “${rowExample(r)}”. Why is this an effective example of ${r[0]}?`:`Why is “${repair}” a better rule than “${bad}” when reading a ${ctx}?`;
 const correct=i%2===0?good:`Because it keeps the useful distinction without turning it into an absolute rule.`;
 const wrongs=i%2===0?explainOptions(unit,correct):[`Because the longest rule is always the best one.`,`Because exceptions never matter in English.`,`Because a rule is correct whenever it uses technical words.`];
 const summary=i%2===0?`${rowExample(r)} works because ${effect?sentence(effect).toLowerCase():'its language choice fits the purpose and context'}.`:`“${repair}” is more accurate because it responds to context and evidence instead of overgeneralising.`;
 const hint=i%2===0?`Name the exact language choice, then explain its effect.`:`Be suspicious of rules using words such as always, never or every.`;
 out.push(make(code,'practice',n,'explain',i%2===0?r[0]:'misconception repair',q,correct,wrongs,summary,hint,ci));
 }
 for(let i=0;i<10;i++){
 const n=21+i,a=model(unit,i),b=applyRow(unit,i+1),ctx=PRACTICE_CONTEXTS[(i+11)%PRACTICE_CONTEXTS.length],ci=(i+2+codes.indexOf(code))%4,[bad,repair]=misconception(unit,i+1);
 let q,correct,wrongs,summary,hint,skill;
 if(i%2===0){q=`A ${ctx} could use either “${rowExample(a)}” or “${rowExample(b)}”. Which comparison is most accurate?`;correct=`“${rowExample(a)}” shows ${a[0]}, while “${rowExample(b)}” shows ${b[0]}.`;wrongs=[`Both examples must show exactly the same feature because they appear in one text.`,`The longer example is automatically more formal and therefore better.`,`Neither example can be analysed unless the writer explains the answer.`];summary=`The important difference is the language function: ${a[0]} versus ${b[0]}.`;hint=`Compare what each wording choice does, not which one sounds more impressive.`;skill='discriminate language choices';}
 else{q=`Which statement would help you reject the tempting rule “${bad}” in a ${ctx}?`;correct=repair;wrongs=(unit.mistakes||[]).map(m=>m[0]);summary=`${repair} The tempting rule fails because it ignores context or makes the pattern absolute.`;hint=unit.applyNote||unit.modelNote;skill='discriminate misconception';}
 out.push(make(code,'practice',n,'discriminate',skill,q,correct,wrongs,summary,hint,ci));
 }
 for(let i=0;i<10;i++){
 const n=31+i,r=applyRow(unit,i),ctx=PRACTICE_CONTEXTS[(i+3)%PRACTICE_CONTEXTS.length],choice=i%3===0?unit.questions?.choice2:unit.questions?.choice1,c=correctOf(choice),ci=(i+3+codes.indexOf(code))%4;
 let q,correct,wrongs,summary,hint,skill;
 if(c&&i%3===0){q=`You are editing a ${ctx}. ${sentence(choice[0])}?`;correct=c;wrongs=wrongsOf(choice);summary=`“${c}” best fits the purpose and the language evidence in this new situation.`;hint=unit.applyNote||unit.modelNote;skill=unit.quick?.[(i+2)%Math.max(1,unit.quick.length)]||unit.title;}
 else if(i%3===1){q=`A ${ctx} needs a clear example of ${r[0]}. Which wording should you choose?`;correct=rowExample(r);wrongs=unique([...rows(unit.applyVisual),...rows(unit.modelVisual)].map(rowExample),rowExample(r));summary=`“${rowExample(r)}” is the best choice because it demonstrates ${r[0]} in context.`;hint=`Choose the wording that performs the required job, not merely one that sounds fluent.`;skill=r[0];}
 else{const [name,definition]=term(unit,i+1);q=`While revising a ${ctx}, you need language that matches “${sentence(definition)}”. Which concept should guide your choice?`;correct=name;wrongs=(unit.terms||[]).map(t=>t[0]);summary=`${name} is the concept that matches ${sentence(definition).toLowerCase()}.`;hint=`Use the definition to guide the decision, then check it against the sentence.`;skill=name;}
 out.push(make(code,'practice',n,'apply',skill,q,correct,wrongs,summary,hint,ci));
 }
 return out;
}
function buildTest(code,unit){const out=[];for(let i=0;i<16;i++){
 const ctx=TEST_CONTEXTS[i],r=applyRow(unit,i+2),[name,definition]=term(unit,i+2),choice=i%2?unit.questions?.choice2:unit.questions?.choice1,c=correctOf(choice),ci=(i+1+codes.indexOf(code))%4,[bad,repair]=misconception(unit,i+2);
 let q,correct,wrongs,summary,hint,skill;
 switch(i%4){
  case 0:q=`A ${ctx} includes “${rowExample(r)}”. Which description best fits this wording?`;correct=r[0];wrongs=wrongPool(unit,r[0]);summary=rowEffect(r)?`The wording is ${r[0]} because it ${sentence(rowEffect(r)).toLowerCase()}.`:`The wording best matches ${r[0]}.`;hint=`Identify the language choice first, then check its effect in this context.`;skill=r[0];break;
  case 1:q=`In a ${ctx}, which term matches this meaning: “${sentence(definition)}”?`;correct=name;wrongs=(unit.terms||[]).map(t=>t[0]);summary=`${name} is the precise term for ${sentence(definition).toLowerCase()}.`;hint=`Distinguish closely related terms by their definitions.`;skill=name;break;
  case 2:if(c){q=`For a ${ctx}, ${sentence(choice[0]).replace(/^./,m=>m.toLowerCase())}?`;correct=c;wrongs=wrongsOf(choice);summary=`“${c}” is supported by the language evidence and purpose of the text.`;hint=unit.applyNote||unit.modelNote;skill=unit.title;}else{q=`Which wording from a ${ctx} best demonstrates ${r[0]}?`;correct=rowExample(r);wrongs=unique(rows(unit.modelVisual).map(rowExample),rowExample(r));summary=`“${rowExample(r)}” demonstrates ${r[0]}.`;hint=unit.applyNote||unit.modelNote;skill=r[0];}break;
  default:q=`A writer preparing a ${ctx} says, “${bad}”. Which response is most accurate?`;correct=repair;wrongs=(unit.mistakes||[]).map(m=>m[0]);summary=`${repair} This response corrects the overgeneralisation and keeps the decision tied to evidence.`;hint=`Check whether the statement makes an unjustified always/never rule.`;skill='independent misconception check';
 }
 out.push(make(code,'test',i+1,i<8?'verify':'apply',skill,q,correct,wrongs,summary,hint,ci));
 }
 return out;
}
function js(item){return{id:item.id,curriculumCode:item.curriculum_code,bank:item.bank,stage:item.stage,skill:item.skill.replaceAll('_',' '),printable:true,type:'single',question:item.question,audioPrompt:item.audio_prompt,visual:'',visualHtml:'',visualMeta:{type:'none',alt_text:''},answers:item.answers.map(a=>a.text),correct:item.correct_index,explanation:`${item.explanation.summary}\nHint: ${item.explanation.hint}`,structuredExplanation:item.explanation,qualitySchema:item.quality_schema};}
function publish(code,p,t){const d=path.join(QUIZ,code.toLowerCase());if(!fs.existsSync(d))throw Error(`${code}: quiz route missing`);const ps=`"use strict";\nwindow.skillrPracticeQuestions = ${JSON.stringify(p.map(js),null,2)};\nwindow.quizQuestions = window.skillrPracticeQuestions;\n`;const ts=`"use strict";\nwindow.skillrTestQuestions = ${JSON.stringify(t.map(js),null,2)};\nwindow.skillrExamQuestions = window.skillrTestQuestions;\nwindow.quizQuestions = window.skillrTestQuestions;\n`;fs.writeFileSync(path.join(d,'practice/questions.js'),ps);const legacy=path.join(d,'practice/practice-questions.js');if(fs.existsSync(legacy))fs.writeFileSync(legacy,ps);fs.writeFileSync(path.join(d,'test/questions.js'),ts);}
for(const code of codes){const unit=units[code];if(!unit)throw Error(`${code}: curriculum unit missing`);const p=buildPractice(code,unit),t=buildTest(code,unit);if(p.length!==40||t.length!==16)throw Error(`${code}: bad counts`);fs.writeFileSync(path.join(BANK,`${code.toLowerCase()}.json`),JSON.stringify([...p,...t],null,2)+'\n');publish(code,p,t);}
console.log(`Year 6 English actual banks rebuilt: ${codes.length} codes, ${codes.length*40} Practice, ${codes.length*16} Test.`);
