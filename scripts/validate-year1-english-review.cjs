// NODE_PATH may point to an external, test-only jsdom installation.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const {JSDOM, VirtualConsole} = require('jsdom');
const root = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(root,p),'utf8');
const tick = () => new Promise(r=>setImmediate(r));
const batch2 = process.argv.includes('--batch2');
const batch3 = process.argv.includes('--batch3');
const batch4 = process.argv.includes('--batch4');
const batch5 = process.argv.includes('--batch5');
const batch6 = process.argv.includes('--batch6');
const codes = batch6 ? ['ac9e1ly11','ac9e1ly12','ac9e1ly13','ac9e1ly14','ac9e1ly15'] : batch5 ? ['ac9e1ly06','ac9e1ly07','ac9e1ly08','ac9e1ly09','ac9e1ly10'] : batch4 ? ['ac9e1ly01','ac9e1ly02','ac9e1ly03','ac9e1ly04','ac9e1ly05'] : batch3 ? ['ac9e1le01','ac9e1le02','ac9e1le03','ac9e1le04','ac9e1le05'] : batch2 ? ['ac9e1la06','ac9e1la07','ac9e1la08','ac9e1la09','ac9e1la10'] : ['ac9e1la01','ac9e1la02','ac9e1la03','ac9e1la04','ac9e1la05'];
const tag = batch6 ? 'er6' : batch5 ? 'er5' : batch4 ? 'er4' : batch3 ? 'er3' : batch2 ? 'er2' : 'er1';
let rendered = 0, visualCount = 0;
(async()=>{
 for(const code of codes) {
  const canonical=JSON.parse(read(`assets/assessment-banks/year1/english/${code}.json`));
  for(const mode of ['practice','test']) {
   const group=canonical.filter(q=>q.bank===mode && q.grading_mode!=='adult-review');
   const counts=[0,1,2].map(n=>group.filter(q=>q.correct_index===n).length);
   assert(Math.max(...counts)-Math.min(...counts)<=1,'Unbalanced answers: '+code);
  }
  assert.equal(canonical.length,40);
  if(code==='ac9e1le01') assert.equal(canonical.filter(q=>q.visual.type==='svg').length,4);
  if(code==='ac9e1la08') assert.equal(canonical.filter(q=>q.visual.type==='svg').length,8);
  assert.equal(new Set(canonical.map(q=>q.question)).size,40);
  for(const mode of ['practice','test']) {
   const route=`quiz/year-1/english/${code}/${mode}/`;
   const html=read(route+'index.html');
   assert(!/40-question practice bank|40 progressive curriculum-aligned/.test(html),'Stale bank count');
   const cfg=JSON.parse(html.match(/window.quizConfig=(\{.*?\});/s)[1]);
   const source=canonical.filter(q=>q.bank===mode);
   assert.equal(source.length,mode==='practice'?24:16);
   assert(cfg.resultStorageKey.endsWith('English'+tag.toUpperCase()));
   for(const page of ['result','review']) assert(read(route+page+'/index.html').includes(cfg.resultStorageKey));
   assert(html.includes('questions.js?v=20260906-english-'+tag));
   const sandbox={window:{}};vm.runInNewContext(read(route+'questions.js'),sandbox);
   const live=sandbox.window.quizQuestions;
   assert.equal(live.length,source.length);
   if(mode==='practice') {const alias={window:{}};vm.runInNewContext(read(route+'practice-questions.js'),alias);assert.equal(JSON.stringify(alias.window.quizQuestions),JSON.stringify(live));}
   for(let i=0;i<source.length;i++) {
    const q=source[i], published=live[i];
    assert.equal(published.question,q.question);
    if(q.grading_mode==='adult-review') {
     assert.equal(published.type,'self-check'); assert.equal(published.gradingMode,'adult-review');
     assert.equal(published.modelAnswer,q.model_answer); assert.equal(published.acceptanceNote,q.acceptance_note);
     assert.equal(q.answers.length,0); assert(q.model_answer.length>20);
    } else {
     assert.equal(published.answers[published.correct],q.answers[q.correct_index].text);
     assert.equal(q.answers.filter(a=>a.is_correct).length,1);
     assert.equal(new Set(published.answers).size,3);
    }
    assert(q.explanation.summary.length>25);
    assert(!/This matches the task/.test(q.explanation.summary));
    if(!['ac9e1la08','ac9e1le01'].includes(code) || q.visual.type!=='svg') {
     assert.equal(q.visual.type,'none');
     assert.equal(published.visualHtml,'');
     assert.equal(published.visual,'');
    }
    if(q.visual.type==='svg') {
     visualCount++;
     const [asset,symbol]=q.visual.asset_path.slice(1).split('#');
     const doc=new JSDOM(read(asset),{contentType:'image/svg+xml'}).window.document;
     assert(doc.getElementById(symbol),q.id);
     assert(published.visualHtml.includes(q.visual.asset_path));
     assert.equal(published.visual,q.visual.alt_text);
     assert(!doc.querySelector('script,foreignObject'));
     doc.defaultView.close();
    }
   }
   let saved={},seen=new Set();
   for(let round=0;round<(mode==='practice'?3:2);round++) {
    const errors=[],vc=new VirtualConsole();
    vc.on('jsdomError',e=>{if(!e.message.includes('Not implemented: navigation'))errors.push(e.message);});
    const dom=new JSDOM(html,{url:'https://skillrhub.com/'+route,runScripts:'outside-only',virtualConsole:vc}),w=dom.window,d=w.document;
    w.matchMedia=()=>({matches:true,addEventListener(){},removeEventListener(){}});
    w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=()=>{};w.HTMLCanvasElement.prototype.getContext=()=>null;
    w.gtag=()=>{};w.alert=m=>{throw Error(m);};
    w.Audio=class extends w.EventTarget {play(){queueMicrotask(()=>this.dispatchEvent(new w.Event('ended')));return Promise.resolve();}pause(){}};
    for(const [k,v]of Object.entries(saved))w.localStorage.setItem(k,v);
    w.quizConfig=JSON.parse(JSON.stringify(cfg));
    w.eval(read(route+'questions.js'));
    if(cfg.requireAdultReviewSupport) { assert(html.includes('year1-maths-support.js')); w.eval(read('quiz/assets/year1-maths-support.js')); }
    w.eval(read('quiz/assets/production-question-ui.js'));
    w.eval(read('quiz/assets/script-runtime-v115.js'));
    w.eval(read('assets/progress-store.js'));
    await tick();
    const name=d.getElementById('studentName');if(name)name.value='English QA';
    d.getElementById('startButton').click();
    assert.equal(w.skillrActiveQuestions.length,cfg.maxQuestions);
    for(const q of w.skillrActiveQuestions) {
     if(mode==='practice')assert(!seen.has(q.id),'Practice repeated before exhausting bank');
     seen.add(q.id);
     assert.equal(d.getElementById('questionText').textContent,q.question);
     if(q.visualHtml)assert(d.querySelector('#questionVisual svg use'),'Missing evidence visual: '+q.id);
     if(q.gradingMode==='adult-review') {
      assert(d.getElementById('submitButton').disabled);
      assert(!d.querySelector('.self-check-model'));
      const paper=d.getElementById('adultReviewPaper'); assert(paper);paper.checked=true;paper.dispatchEvent(new w.Event('change'));
     } else {
      const buttons=d.querySelectorAll('#answerList .answer-option');assert.equal(buttons.length,3);buttons[q.correct].click();
     }
     d.getElementById('submitButton').click();
     assert(d.getElementById('feedback').classList.contains(q.gradingMode==='adult-review'?'pending':'correct'),q.id);
     d.getElementById('nextButton').click();rendered++;
    }
    await tick();
    const result=JSON.parse(w.sessionStorage.getItem(cfg.resultStorageKey));
    const pending=w.skillrActiveQuestions.filter(q=>q.gradingMode==='adult-review').length;
    assert.equal(result.score,cfg.maxQuestions-pending);assert.equal(result.total,cfg.maxQuestions);
    assert.equal(result.pendingReview,pending); if(pending) assert.equal(result.passed,false);
    assert(result.answers.every(a=>a.questionId.includes('-'+tag+'-')));
    if(pending && round===0) {
     const reviewHtml=read(route+'review/index.html');
     assert(reviewHtml.includes('year1-maths-support.js'));
     const reviewDom=new JSDOM(reviewHtml,{url:'https://skillrhub.com/'+route+'review/',runScripts:'outside-only',virtualConsole:vc}),rw=reviewDom.window;
     rw.sessionStorage.setItem(cfg.resultStorageKey,JSON.stringify(result));
     rw.eval(read('assets/progress-store.js'));rw.eval(read('quiz/assets/year1-maths-support.js'));rw.eval(read('quiz/assets/separate-review.js'));
     await tick();
     const good=rw.document.querySelectorAll('.y1-marking-actions button[data-correct="true"]');
     assert.equal(good.length,pending);
     good[0].click();
     let checked=JSON.parse(rw.sessionStorage.getItem(cfg.resultStorageKey));
     assert.equal(checked.pendingReview,pending-1);assert.equal(checked.score,result.score+1);
     rw.document.querySelector('.y1-marking-actions button[data-correct="false"]').click();
     checked=JSON.parse(rw.sessionStorage.getItem(cfg.resultStorageKey));assert.equal(checked.score,result.score);
     good.forEach(b=>b.click());
     checked=JSON.parse(rw.sessionStorage.getItem(cfg.resultStorageKey));assert.equal(checked.pendingReview,0);assert.equal(checked.score,cfg.maxQuestions);assert(checked.passed);
     reviewDom.window.close();
     const resultDom=new JSDOM(read(route+'result/index.html'),{url:'https://skillrhub.com/'+route+'result/',runScripts:'outside-only',virtualConsole:vc}),pw=resultDom.window;
     pw.sessionStorage.setItem(cfg.resultStorageKey,JSON.stringify(result));pw.eval(read('quiz/assets/separate-result.js'));await tick();
     assert(pw.document.getElementById('resultStatus').textContent.includes('grown-up'));
     assert(!pw.document.getElementById('certificateButton'));
     resultDom.window.close();
    }
    saved=Object.fromEntries(Array.from({length:w.localStorage.length},(_,i)=>{const k=w.localStorage.key(i);return[k,w.localStorage.getItem(k)];}));
    assert.deepEqual(errors,[]);dom.window.close();
   }
   assert.equal(seen.size,source.length,code+' '+mode+' coverage');
  }
 }
 console.log(`PASS: ${codes.length*40} source questions; ${visualCount} visual assets; ${rendered} responses through ${codes.length*5} real-runtime attempts; complete bank coverage; scoring, answer shuffle, rotation, and result-key isolation.`);
})().catch(e=>{console.error(e);process.exitCode=1;});
