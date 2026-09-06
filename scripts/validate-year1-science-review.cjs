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
const codes = batch4 ? ['ac9s1i06'] : batch3 ? ['ac9s1i03','ac9s1i04','ac9s1i05'] : batch2 ? ['ac9s1h01','ac9s1i01','ac9s1i02'] : ['ac9s1u01','ac9s1u02','ac9s1u03'];
const tag = batch4 ? 'r4' : batch3 ? 'r3' : batch2 ? 'r2' : 'r1';
let rendered = 0, visualCount = 0;
(async()=>{
 for(const code of codes) {
  const canonical=JSON.parse(read(`assets/assessment-banks/year1/science/${code}.json`));
  assert.equal(canonical.length,40);
  assert.equal(new Set(canonical.map(q=>q.question)).size,40);
  for(const mode of ['practice','test']) {
   const route=`quiz/year-1/science/${code}/${mode}/`;
   const html=read(route+'index.html');
   const cfg=JSON.parse(html.match(/window.quizConfig=(\{.*?\});/s)[1]);
   const source=canonical.filter(q=>q.bank===mode);
   assert.equal(source.length,mode==='practice'?24:16);
   assert(cfg.resultStorageKey.endsWith('Science'+tag.toUpperCase()));
   for(const page of ['result','review']) assert(read(route+page+'/index.html').includes(cfg.resultStorageKey));
   assert(html.includes('questions.js?v=20260906-science-'+tag));
   const sandbox={window:{}};vm.runInNewContext(read(route+'questions.js'),sandbox);
   const live=sandbox.window.quizQuestions;
   assert.equal(live.length,source.length);
   for(let i=0;i<source.length;i++) {
    const q=source[i], published=live[i];
    assert.equal(published.question,q.question);
    assert.equal(published.answers[published.correct],q.answers[q.correct_index].text);
    assert.equal(q.answers.filter(a=>a.is_correct).length,1);
    assert.equal(new Set(published.answers).size,3);
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
    w.eval(read('quiz/assets/production-question-ui.js'));
    w.eval(read('quiz/assets/script-runtime-v115.js'));
    w.eval(read('assets/progress-store.js'));
    await tick();
    const name=d.getElementById('studentName');if(name)name.value='Science QA';
    d.getElementById('startButton').click();
    assert.equal(w.skillrActiveQuestions.length,cfg.maxQuestions);
    for(const q of w.skillrActiveQuestions) {
     if(mode==='practice')assert(!seen.has(q.id),'Practice repeated before exhausting bank');
     seen.add(q.id);
     assert.equal(d.getElementById('questionText').textContent,q.question);
     if(q.visualHtml)assert(d.querySelector('#questionVisual svg use'),'Missing evidence visual: '+q.id);
     const buttons=d.querySelectorAll('#answerList .answer-option');assert.equal(buttons.length,3);
     buttons[q.correct].click();d.getElementById('submitButton').click();
     assert(d.getElementById('feedback').classList.contains('correct'),q.id);
     d.getElementById('nextButton').click();rendered++;
    }
    await tick();
    const result=JSON.parse(w.sessionStorage.getItem(cfg.resultStorageKey));
    assert.equal(result.score,cfg.maxQuestions);assert.equal(result.total,cfg.maxQuestions);
    assert(result.answers.every(a=>a.questionId.includes('-'+tag+'-')));
    saved=Object.fromEntries(Array.from({length:w.localStorage.length},(_,i)=>{const k=w.localStorage.key(i);return[k,w.localStorage.getItem(k)];}));
    assert.deepEqual(errors,[]);dom.window.close();
   }
   assert.equal(seen.size,source.length,code+' '+mode+' coverage');
  }
 }
 console.log(`PASS: ${codes.length*40} source questions; ${visualCount} visual assets; ${rendered} answers through ${codes.length*5} real-runtime attempts; complete bank coverage; scoring, answer shuffle, rotation, and result-key isolation.`);
})().catch(e=>{console.error(e);process.exitCode=1;});
