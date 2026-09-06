// Test-only dependency: jsdom@26.1.0 (may be supplied through NODE_PATH).
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {JSDOM,VirtualConsole}=require('jsdom');
const root=path.resolve(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
const slug='numbers-place-value-to-120',version='20260906-y1-number-drill-r1';
const route=`quiz/year-1/daily-drills/math/${slug}/`;
const production=`quiz/assets/daily-drills/year1-daily-drills-math-${slug}-production.js`;
const bank=JSON.parse(read(`assets/daily-drill-banks/year1/math/${slug}.json`)).items;
const sandbox={window:{}};vm.runInNewContext(read(production),sandbox);
assert.equal(JSON.stringify(sandbox.window.SkillrDailyProductionBanks['1'].math[slug]),JSON.stringify(bank),'source/runtime parity');
assert.equal(bank.length,80);
assert.equal(new Set(bank.map(q=>q.question)).size,80);
assert.equal(new Set(bank.map(q=>q.question.toLowerCase().replace(/\d+/g,'#'))).size,80,'number-swap duplicates');
assert.equal(new Set(bank.map(q=>q.id)).size,80);
const rank={1:1,2:2,3:3};
for(const code of ['AC9M1N01','AC9M1N02']){
 const group=bank.filter(q=>q.curriculumCode===code);assert.equal(group.length,40);
 assert.equal(new Set(group.map(q=>q.editorialReview.coverageComponent)).size,code==='AC9M1N01'?6:5);
 const counts=[0,1,2].map(n=>group.filter(q=>q.type==='single'&&q.correct===n).length);
 assert(Math.max(...counts)-Math.min(...counts)<=1,'per-code key balance');
 const existing={window:{}};
 for(const mode of ['practice','test']){
  vm.runInNewContext(read(`quiz/year-1/math/${code.toLowerCase()}/${mode}/questions.js`),existing);
  const previous=existing.window[mode==='practice'?'skillrPracticeQuestions':'skillrTestQuestions'];
  assert(!group.some(q=>previous.some(old=>old.question===q.question)),'duplicate of Practice/Test');
 }
}
assert.deepEqual([0,1,2].map(n=>bank.filter(q=>q.type==='single'&&q.correct===n).length),[15,15,15]);
assert.equal(bank.filter(q=>q.type==='number').length,35);
assert.equal(bank.filter(q=>q.visualHtml).length,24);
for(const q of bank){
 assert.equal(q.source,version);assert.equal(q.audioPrompt,q.question);assert(q.hint.length>20);assert(q.explanation.length>35);
 assert(q.editorialReview.misconception.length>15);assert(Object.hasOwn(rank,q.difficulty));
 assert(!/Which response would|This is correct because it matches|first and third|class sorts objects|prime-composite|factors-divisibility/i.test(JSON.stringify(q)));
 if(q.type==='single') {assert.equal(q.answers.length,3);assert.equal(new Set(q.answers).size,3);assert(Number.isInteger(q.correct)&&q.correct>=0&&q.correct<3);}
 else {assert.equal(q.type,'number');assert(Number.isInteger(q.correct)&&q.correct>=0&&q.correct<=120);assert.equal(q.tolerance,0);}
 const eq=q.question.match(/(\d+) = (\d+) \+ ___/);if(eq)assert.equal(q.correct,+eq[1]-eq[2]);
 if(q.visualHtml){
  const dom=new JSDOM(q.visualHtml,{contentType:'image/svg+xml'}),d=dom.window.document;
  assert.equal(d.documentElement.localName,'svg');assert(d.querySelector('title')?.textContent.length>10);
  assert(!d.querySelector('script,foreignObject,image,use'));
  const m=q.visualModel;
  if(m.kind==='blocks'&&q.type==='number') assert.equal(q.correct,m.hundreds*100+m.tens*10+m.ones,'model value '+q.id);
  if(m.kind==='ten-frame')assert.equal(q.correct,10-m.filled);
  if(m.kind==='counters'&&q.type==='number')assert.equal(q.correct,m.left+m.right);
  if(m.kind==='parts'&&q.type==='number'&&m.right==='?')assert.equal(q.correct,m.whole-m.left);
  if(m.kind==='line'&&m.labels.includes('?')){
   const i=m.labels.indexOf('?'),a=Number(m.labels[i-1]),b=Number(m.labels[i+1]);
   assert.equal(q.correct,(a+b)/2,'equal line steps '+q.id);
  }
  dom.window.close();
 }
}
const html=read(route+'index.html');assert(html.includes(version));assert(html.includes('id="bankCount">80'));assert(!/240-question|30 attempts/.test(html));
const tick=()=>new Promise(resolve=>setImmediate(resolve));
const roundKey=`skillr-daily-v4-1-math-${slug}-question-round`;
async function page(saved={}){
 const errors=[],vc=new VirtualConsole();vc.on('jsdomError',e=>{if(!/Not implemented: navigation/.test(e.message))errors.push(e.message);});
 const dom=new JSDOM(html,{url:'https://skillrhub.com/'+route,runScripts:'outside-only',virtualConsole:vc}),w=dom.window;
 w.matchMedia=()=>({matches:true,addEventListener(){},removeEventListener(){}});w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=()=>{};w.HTMLCanvasElement.prototype.getContext=()=>null;
 w.gtag=()=>{};w.alert=m=>{throw Error(m);};
 w.Audio=class extends w.EventTarget{play(){queueMicrotask(()=>this.dispatchEvent(new w.Event('ended')));return Promise.resolve();}pause(){}};
 for(const[k,v]of Object.entries(saved))w.localStorage.setItem(k,v);
 w.SKILLR_DAILY_YEAR='1';w.SKILLR_DAILY_SUBJECT='math';w.SKILLR_DAILY_SKILL=slug;
 for(const f of ['quiz/assets/daily-drills/catalog.js','quiz/assets/daily-drills/math-quick-review.js',production,'quiz/assets/daily-drills/daily-drill-selector.js','quiz/assets/script-runtime-v115.js'])w.eval(read(f));
 await tick();await tick();return{dom,w,d:w.document,errors};
}
const save=w=>Object.fromEntries(Array.from({length:w.localStorage.length},(_,i)=>{let k=w.localStorage.key(i);return[k,w.localStorage.getItem(k)];}));
(async()=>{
 let saved={[roundKey]:JSON.stringify({version:1,signature:'obsolete-bank',round:1,remainingIds:['retired-question'],inProgressIds:[],completedIds:[]})};
 let p=await page(saved);assert.equal(p.w.quizQuestions.length,8);const interrupted=p.w.quizQuestions.map(q=>q.id).sort();saved=save(p.w);p.dom.window.close();
 p=await page(saved);assert.equal(JSON.stringify(p.w.quizQuestions.map(q=>q.id).sort()),JSON.stringify(interrupted),'interrupted drill returns its questions');saved=save(p.w);p.dom.window.close();
 const seen=new Set();let rendered=0,correctTotal=0,visuals=0;
 for(let attempt=0;attempt<10;attempt++){
  const {dom,w,d,errors}=await page(saved);assert.equal(w.skillrDailyDrillMeta.bankSize,80);
  d.getElementById('startButton').click();assert.equal(w.skillrActiveQuestions.length,8);
  let last=-1,expectedScore=0;
  for(const q of w.skillrActiveQuestions){
   assert(!seen.has(q.id),'repeat before full round');seen.add(q.id);assert(rank[q.difficulty]>=last,'instructional order');last=rank[q.difficulty];
   assert.equal(d.getElementById('questionText').textContent,q.question);
   assert(d.getElementById('submitButton').disabled,'blank answer must not submit');
   if(q.visualHtml){assert(d.querySelector('#questionVisual svg'),'missing question diagram');visuals++;}
   const good=rendered%5!==0;
   if(q.type==='single'){
    const buttons=d.querySelectorAll('#answerList .answer-option');assert.equal(buttons.length,3);
    buttons[good?q.correct:(q.correct+1)%3].click();
   }else{const input=d.getElementById('numberAnswer');assert(input);input.value=String(q.correct+(good?0:1));input.dispatchEvent(new w.Event('input'));}
   d.getElementById('submitButton').click();
   assert(d.getElementById('feedback').classList.contains(good?'correct':'incorrect'),q.id);
   assert(d.getElementById('feedback').textContent.includes(q.explanation),'teaching explanation missing');
   if(good){expectedScore++;correctTotal++;}
   d.getElementById('nextButton').click();rendered++;
  }
  await tick();assert.equal(+d.getElementById('finalScore').textContent,expectedScore);
  saved=save(w);const state=JSON.parse(saved[roundKey]);assert.equal(state.completedIds.length,(attempt+1)*8);assert.equal(state.inProgressIds.length,0);
  assert.deepEqual(errors,[]);dom.window.close();
 }
 assert.equal(seen.size,80);assert.equal(visuals,24);assert.equal(correctTotal,64);
 p=await page(saved);assert.equal(p.w.skillrDailyDrillMeta.round,2);assert.equal(p.w.quizQuestions.length,8);p.dom.window.close();
 // The same shared selector retains normal shuffling on an unrelated live bank.
 const other={window:{},document:{querySelector(){return true;},addEventListener(){},getElementById(){return null;}},console,localStorage:{getItem(){return null;},setItem(){}}};
 other.window.SKILLR_DAILY_YEAR='1';other.window.SKILLR_DAILY_SUBJECT='math';other.window.SKILLR_DAILY_SKILL='addition-subtraction-to-20';
 for(const f of ['quiz/assets/daily-drills/catalog.js','quiz/assets/daily-drills/year1-daily-drills-math-addition-subtraction-to-20-production.js','quiz/assets/daily-drills/daily-drill-selector.js'])vm.runInNewContext(read(f),other);
 assert.equal(other.window.quizConfig.shuffleQuestions,true);
 console.log('PASS: 80 original drills; 40 per code; 45 balanced choices + 35 number entries; 24 SVGs; 10 full runtime attempts; correct/incorrect marking; explanations; interrupted resume; complete no-repeat rotation; next round; unrelated selector behaviour.');
})().catch(e=>{console.error(e);process.exitCode=1;});
