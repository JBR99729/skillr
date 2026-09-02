import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const BANK_ROOT = path.join(ROOT, 'assets', 'assessment-banks', 'year8', 'english');
const QUIZ_ROOT = path.join(ROOT, 'quiz', 'year-8', 'english');
const manifest = JSON.parse(fs.readFileSync(path.join(ROOT,'assets','year8-10-english-curriculum-focus.json'),'utf8'));
const CODES = manifest.years['8'];
const STAGES = ['recognise','explain','discriminate','apply'];

const page = fs.readFileSync(path.join(ROOT,'year8','curriculum','english','index.html'),'utf8');
const topicMeta = {};
for (const code of CODES) {
  const re = new RegExp(`<span class="curriculum-badge">${code}<\\/span>[\\s\\S]*?<h3>([\\s\\S]*?)<\\/h3>[\\s\\S]*?<p class="skill-summary">([\\s\\S]*?)<\\/p>`,'i');
  const m = page.match(re);
  const clean = s => String(s||'').replace(/<[^>]+>/g,' ').replace(/&amp;/g,'&').replace(/&#x27;/g,"'").replace(/&quot;/g,'"').replace(/\s+/g,' ').trim();
  topicMeta[code] = {title: clean(m?.[1] || code), summary: clean(m?.[2] || '')};
}

const practiceContexts = [
  'a school podcast script','a community-news article','a library book-club discussion','a student council speech','a science-expo explanation','a museum caption','a local-sport profile','a school newsletter','a youth radio segment','a bushwalking safety page',
  'a review of an Australian novel','a documentary storyboard','a class debate','a community-festival webpage','a wildlife-centre brochure','a historical display','a persuasive letter to council','a school assembly address','a digital magazine feature','a public-transport campaign',
  'a theatre-program note','a coastal-care poster','a short-story workshop','a media-literacy lesson','a local-history podcast','a school website update','a graphic-novel discussion','a charity campaign','a sports-club announcement','a sustainability report',
  'an exhibition review','a class anthology','a youth forum post','a tourism information page','a spoken presentation','a feature article','a film-review discussion','a community survey summary','a reading-journal entry','a school production program'
];
const testContexts = [
  'a regional newspaper feature','an independent book review','a public-library exhibition','a council youth consultation','an environmental campaign video','a cultural-festival program','a national-park information panel','a radio interview transcript',
  'a digital news explainer','a theatre review','a community-history website','a sports documentary','a literary magazine extract','a public-service announcement','an online museum exhibit','a youth conference presentation'
];

const stageStems = {
  recognise: [
    (c,t)=>`In ${c}, which option most clearly shows ${t}?`,
    (c,t)=>`While reading ${c}, which choice is the clearest example of ${t}?`,
    (c,t)=>`Which option would you identify as an example of ${t} in ${c}?`,
    (c,t)=>`${c[0].toUpperCase()+c.slice(1)} is being edited. Which choice best matches ${t}?`,
    (c,t)=>`Which feature in ${c} best fits the idea of ${t}?`,
    (c,t)=>`Look at the four choices for ${c}. Which one demonstrates ${t} most accurately?`,
    (c,t)=>`Which choice belongs in ${c} if the writer wants to show ${t}?`,
    (c,t)=>`A reader notices a deliberate language choice in ${c}. Which option best identifies ${t}?`,
    (c,t)=>`Which option is the strongest match for ${t} in ${c}?`,
    (c,t)=>`For ${c}, which choice gives the clearest evidence of ${t}?`
  ],
  explain: [
    (c,t)=>`In ${c}, which explanation best shows why ${t} matters?`,
    (c,t)=>`Which option best explains the effect of ${t} in ${c}?`,
    (c,t)=>`A reader is explaining ${t} in ${c}. Which response connects the feature to meaning most clearly?`,
    (c,t)=>`Which explanation of ${t} would make the strongest sense in ${c}?`,
    (c,t)=>`How can ${t} shape the way an audience understands ${c}? Choose the best explanation.`,
    (c,t)=>`Which response goes beyond naming ${t} and explains what it does in ${c}?`,
    (c,t)=>`For ${c}, which statement gives the most precise explanation of ${t}?`,
    (c,t)=>`Which explanation links ${t} to purpose or audience in ${c}?`,
    (c,t)=>`A class is discussing ${c}. Which comment best explains ${t}?`,
    (c,t)=>`Which statement best accounts for the effect of ${t} in ${c}?`
  ],
  discriminate: [
    (c,t)=>`Several comments are made about ${t} in ${c}. Which one avoids the common misconception?`,
    (c,t)=>`Which interpretation of ${t} in ${c} is the most accurate?`,
    (c,t)=>`Which option distinguishes a sound analysis of ${t} from a superficial one in ${c}?`,
    (c,t)=>`A reader has made an overgeneralisation about ${c}. Which choice gives the more careful view of ${t}?`,
    (c,t)=>`Which statement about ${t} in ${c} is supported rather than assumed?`,
    (c,t)=>`Which option uses evidence and context to interpret ${t} in ${c}?`,
    (c,t)=>`Which response to ${c} shows the best judgement about ${t}?`,
    (c,t)=>`Which claim about ${t} in ${c} is precise enough to defend?`,
    (c,t)=>`Which option avoids treating ${t} as a rule that always works the same way?`,
    (c,t)=>`Which reading of ${t} in ${c} is least likely to confuse feature, purpose and effect?`
  ],
  apply: [
    (c,t)=>`You are revising ${c}. Which choice applies ${t} most effectively?`,
    (c,t)=>`Which change would make the strongest use of ${t} in ${c}?`,
    (c,t)=>`To improve ${c}, which option would best apply ${t}?`,
    (c,t)=>`Which choice would you use in ${c} to control ${t} deliberately?`,
    (c,t)=>`A writer wants ${c} to communicate more precisely. Which option best applies ${t}?`,
    (c,t)=>`Which revision to ${c} shows the most purposeful use of ${t}?`,
    (c,t)=>`Which option transfers an understanding of ${t} to ${c} most successfully?`,
    (c,t)=>`For ${c}, which choice uses ${t} in a way that suits audience and purpose?`,
    (c,t)=>`Which decision would strengthen ${c} by applying ${t} rather than merely naming it?`,
    (c,t)=>`Which option is the best practical use of ${t} in ${c}?`
  ]
};
const testStems = [
  (c,t)=>`In ${c}, which interpretation of ${t} is best supported?`,
  (c,t)=>`Which choice applies an accurate understanding of ${t} to ${c}?`,
  (c,t)=>`Which explanation of ${t} best fits ${c}?`,
  (c,t)=>`Which option gives the strongest analysis of ${t} in ${c}?`,
  (c,t)=>`Which choice would be most effective in ${c} if the aim is to use ${t} deliberately?`,
  (c,t)=>`Which statement about ${t} can be defended from the evidence in ${c}?`,
  (c,t)=>`Which response shows the most precise understanding of ${t} in ${c}?`,
  (c,t)=>`Which revision would best control ${t} in ${c}?`
];

function cleanText(s){return String(s||'').replace(/\s+/g,' ').trim().replace(/[.;,:]+$/,'');}
function titlePhrase(meta){
  let t=cleanText(meta.title).replace(/^(Understand|Examine|Investigate|Identify and use|Analyse|Explore|Recognise|Explain)\s+/i,'');
  if(t.length>105)t=t.slice(0,102).replace(/\s+\S*$/,'')+'…';
  return t.charAt(0).toLowerCase()+t.slice(1);
}
function correctOf(x){return x.answers?.find(a=>a.is_correct)?.text || x.answers?.[x.correct_index]?.text || '';}
function concise(s, fallback){
  s=cleanText(s);
  s=s.replace(/^(understanding|exploring|examining|investigating|recognising|identifying) that\s+/i,'');
  s=s.replace(/^(understanding|exploring|examining|investigating|recognising|identifying)\s+/i,'');
  s=s.split(/;\s*for example/i)[0];
  if(s.length>210){
    const cut=s.slice(0,207).replace(/\s+\S*$/,'');
    return cut+'.';
  }
  if(s.length<18)return cleanText(fallback);
  return s.replace(/^./,m=>m.toUpperCase()) + (/[.!?]$/.test(s)?'':'.');
}
function conceptFrom(seed,meta){
  const h=cleanText(seed.explanation?.hint);
  const rawSkill=cleanText(seed.skill).replaceAll('_',' ');
  if(h && h.length<=150)return h.charAt(0).toLowerCase()+h.slice(1).replace(/[.!?]$/,'');
  if(rawSkill && rawSkill.length<=120)return rawSkill;
  return titlePhrase(meta);
}
function candidateCorrect(seed,meta){
  const original=correctOf(seed);
  const hint=seed.explanation?.hint || seed.explanation?.summary || meta.summary;
  return concise(original.length<=220?original:hint,meta.summary);
}
function usefulWrong(s){
  s=cleanText(s);
  if(!s || s.length<12 || s.length>220)return false;
  if(/method can be chosen|same rule and result|every situation without testing/i.test(s))return false;
  if(/formal language is always better/i.test(s))return false;
  return true;
}
const misconceptionBank = [
  'The feature has one fixed effect in every text, regardless of audience or purpose.',
  'It is enough to name the feature; no evidence or explanation of its effect is needed.',
  'The most formal or complicated wording is automatically the most effective choice.',
  'A single word proves the whole interpretation, even when the surrounding context suggests otherwise.',
  'The feature only changes how the text looks or sounds; it does not shape meaning.',
  'Any interpretation is equally strong, even if it cannot be supported with details from the text.',
  'The writer should use the feature as often as possible because more of it always improves a text.',
  'Purpose and audience can be ignored once the feature has been identified.'
];
function sourcePool(items,meta){
  const unique=[]; const seen=new Set();
  for(const x of items){
    const c=candidateCorrect(x,meta); const k=c.toLowerCase();
    if(!seen.has(k)){seen.add(k);unique.push({...x,_correct:c});}
  }
  return unique.length?unique:items.map(x=>({...x,_correct:candidateCorrect(x,meta)}));
}
function optionsFor(seed,pool,index){
  const correct=seed._correct;
  const wrong=[];
  for(const a of seed.answers||[]) if(!a.is_correct && usefulWrong(a.text)) wrong.push(concise(a.text,a.text));
  for(let j=1;j<pool.length && wrong.length<3;j++){
    const other=pool[(index+j)%pool.length]._correct;
    if(other && other.toLowerCase()!==correct.toLowerCase() && !wrong.some(w=>w.toLowerCase()===other.toLowerCase())) wrong.push(other);
  }
  for(let j=0;wrong.length<3;j++){
    const m=misconceptionBank[(index+j)%misconceptionBank.length];
    if(!wrong.some(w=>w.toLowerCase()===m.toLowerCase()))wrong.push(m);
  }
  const arr=wrong.slice(0,3).map(text=>({text,is_correct:false}));
  const ci=index%4; arr.splice(ci,0,{text:correct,is_correct:true});
  return {answers:arr,correct_index:ci};
}
function misconceptionHint(seed,index){
  const hint=concise(seed.explanation?.hint || seed.explanation?.summary || '', 'Check the feature against the surrounding evidence and purpose.');
  const traps=[
    'Do not stop at naming the feature. Ask what meaning it creates here.',
    'Avoid absolute rules. The effect depends on the words, context, audience and purpose.',
    'Check the whole example before choosing; one familiar term can be a distractor.',
    'A strong answer connects a specific feature with a specific effect, not a vague judgement.',
    'Do not assume that longer or more formal language is automatically stronger.',
    'Separate what the text actually shows from what a reader merely prefers.'
  ];
  return `${traps[index%traps.length]} ${hint}`;
}
function makeItem(code,meta,pool,bank,i){
  const stage=bank==='practice'?STAGES[Math.floor(i/10)]:'test';
  const seed=pool[(bank==='practice'?i:(i*3+5))%pool.length];
  const ctx=bank==='practice'?practiceContexts[i]:testContexts[i];
  const topic=conceptFrom(seed,meta);
  const stems=bank==='practice'?stageStems[stage]:testStems;
  const question=stems[i%stems.length](ctx,topic);
  const opts=optionsFor(seed,pool,i+(bank==='test'?17:0));
  const correct=opts.answers[opts.correct_index].text;
  const item={
    id:`${code.toLowerCase()}-${bank==='practice'?'p':'t'}-${String(i+1).padStart(3,'0')}`,
    curriculum_code:code,year_level:'Year 8',subject:'english',bank,
    ...(bank==='practice'?{stage}:{}),
    skill:titlePhrase(meta),question,audio_prompt:question,
    visual:{type:'none',alt_text:''},
    answers:opts.answers,correct_index:opts.correct_index,
    explanation:{
      summary:`${correct} This is the strongest choice because it fits the feature, the evidence and the purpose of the situation.`,
      hint:misconceptionHint(seed,i)
    },
    difficulty:bank==='test'?3:(stage==='recognise'?1:stage==='explain'?2:stage==='discriminate'?2:3),
    difficulty_tier:bank==='test'?'independent':stage,
    sequence_priority:i+1,quality_schema:'skillr-actual-v5'
  };
  return item;
}
function toQuiz(items,code,bank){
  const data=items.map(x=>({
    id:x.id,curriculumCode:code,bank:x.bank,skill:x.skill,printable:true,type:'single',
    question:x.question,audioPrompt:x.audio_prompt,visual:'',visualHtml:'',visualMeta:x.visual,
    answers:x.answers.map(a=>a.text),correct:x.correct_index,
    explanation:x.explanation?.summary||'',hint:x.explanation?.hint||'',
    stage:x.stage,difficulty:x.difficulty,difficultyTier:x.difficulty_tier,sequencePriority:x.sequence_priority
  }));
  const varName=bank==='practice'?'skillrPracticeQuestions':'skillrTestQuestions';
  return `"use strict";\nwindow.${varName} = ${JSON.stringify(data,null,2)};\n`;
}

for(const code of CODES){
  const file=path.join(BANK_ROOT,`${code.toLowerCase()}.json`);
  if(!fs.existsSync(file))throw new Error(`${code}: source bank missing`);
  const existing=JSON.parse(fs.readFileSync(file,'utf8'));
  const meta=topicMeta[code];
  const pool=sourcePool(existing,meta);
  const practice=Array.from({length:40},(_,i)=>makeItem(code,meta,pool,'practice',i));
  const test=Array.from({length:16},(_,i)=>makeItem(code,meta,pool,'test',i));
  fs.writeFileSync(file,JSON.stringify([...practice,...test],null,2)+'\n');
  const qdir=path.join(QUIZ_ROOT,code.toLowerCase());
  const pdir=path.join(qdir,'practice'),tdir=path.join(qdir,'test');
  fs.mkdirSync(pdir,{recursive:true});fs.mkdirSync(tdir,{recursive:true});
  const pjs=toQuiz(practice,code,'practice');
  fs.writeFileSync(path.join(pdir,'questions.js'),pjs);
  if(fs.existsSync(path.join(pdir,'practice-questions.js')))fs.writeFileSync(path.join(pdir,'practice-questions.js'),pjs);
  fs.writeFileSync(path.join(tdir,'questions.js'),toQuiz(test,code,'test'));
}
console.log(`Year 8 English actual banks rebuilt: ${CODES.length} codes, ${CODES.length*40} Practice, ${CODES.length*16} Test, ${CODES.length*56} total.`);
