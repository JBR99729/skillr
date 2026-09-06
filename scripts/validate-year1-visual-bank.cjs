/* Run with NODE_PATH pointing to a test-only installation of jsdom. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM, VirtualConsole } = require('jsdom');
const { createHash } = require('node:crypto');
const root = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(root,p),'utf8');
const data = JSON.parse(read('curriculum-question-banks/banks/year-1/mathematics/year1-original-20260906/bank-data.json'));
const baseline = JSON.parse(read('curriculum-question-banks/banks/year-1/mathematics/year1-original-20260906/import-baseline.json'));
const tick = () => new Promise(resolve=>setImmediate(resolve));
const bankVersion = '20260906-y1-original-v1';
let rendered=0, visuals=0, attempts=0;

function auditRoutes() {
  for(const m of data.mapping){
    const base=`quiz/year-1/math/${m.skill_code.toLowerCase()}/`;
    for(const mode of ['practice','test']){
      const file=base+mode+'/index.html', html=read(file);
      const doc=new JSDOM(html).window.document;
      const cfg=JSON.parse(html.match(/window.quizConfig\s*=\s*(\{.*?\});/s)[1]);
      assert.equal(Number(doc.getElementById('questionCount').textContent),mode==='practice'?8:16);
      assert.equal(doc.querySelectorAll('.intro-text').length,1);
      for(const match of html.matchAll(/(\d+)-question/g))assert((mode==='practice'?[8,24]:[16]).includes(Number(match[1])),file+' obsolete count');
      for(const action of ['result','review','retake']){
        const supporting=read(base+mode+'/'+action+'/index.html');
        if(action!=='retake')assert(supporting.includes(cfg.resultStorageKey));
      }
      for(const tag of doc.querySelectorAll('script[src],link[href]')){
        const url=(tag.getAttribute('src')||tag.getAttribute('href')).split('?')[0];
        if(url.startsWith('/')&&!url.startsWith('//'))assert(fs.existsSync(path.join(root,url)),url);
      }
      const previous=baseline.pages[file];
      assert.equal(doc.title,previous.title);
      assert.equal(doc.querySelector('link[rel=canonical]').href,previous.canonical);
      for(const href of previous.breadcrumbs)assert(doc.querySelector(`a[href="${href}"]`));
      doc.defaultView.close();
    }
    assert.equal(createHash('sha256').update(read(base+'worksheet/questions.js')).digest('hex'),baseline.worksheetBanks[base+'worksheet/questions.js']);
  }
}

async function page(route, session, local, skipSupport=false) {
  const html=read(route+'index.html'), errors=[];
  const vc=new VirtualConsole();
  vc.on('jsdomError',e=>{if(!e.message.includes('Not implemented: navigation'))errors.push(e.message);});
  vc.on('error',(...a)=>errors.push(a.join(' ')));
  const dom=new JSDOM(html,{url:'https://skillrhub.com/'+route,runScripts:'outside-only',virtualConsole:vc});
  const w=dom.window;
  w.matchMedia=()=>({matches:true,addEventListener(){},removeEventListener(){}});
  w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=()=>{};w.alert=message=>{throw Error(message);};
  // Canvas is an optional platform capability (celebration/font support),
  // unrelated to the semantic HTML/SVG models being verified here.
  w.HTMLCanvasElement.prototype.getContext=()=>null;
  w.gtag=()=>{};
  w.Audio=class extends w.EventTarget {play(){queueMicrotask(()=>this.dispatchEvent(new w.Event('ended')));return Promise.resolve();}pause(){}};
  if(session)for(const [k,v] of Object.entries(session))w.sessionStorage.setItem(k,v);
  if(local)for(const [k,v] of Object.entries(local))w.localStorage.setItem(k,v);
  const config=html.match(/window.quizConfig\s*=\s*(\{.*?\});/s);
  if(config)w.quizConfig=JSON.parse(config[1]);
  const tags=[...w.document.querySelectorAll('script[src]')];
  for(const tag of tags){
    const src=new URL(tag.src).pathname.slice(1);
    if(skipSupport && src==='quiz/assets/year1-maths-support.js')continue;
    if(!src.startsWith('quiz/')&&!src.startsWith('assets/progress-store'))continue;
    assert(fs.existsSync(path.join(root,src)),src);
    if(src==='quiz/assets/script.js'){
      w.quizQuestions=w.skillrPracticeQuestions || w.skillrTestQuestions;
      const base='/'+route;
      w.quizConfig.reviewUrl=base+'review/';w.quizConfig.retakeUrl=base+'retake/';
      w.eval(read('quiz/assets/script-runtime-v115.js'));
    } else w.eval(read(src));
  }
  if(config){
    // Exercise the real progress store synchronously; production can lazy-load it.
    w.eval(read('assets/progress-store.js'));
  }
  await tick();
  return {dom,w,errors};
}

function stored(storage){return Object.fromEntries(Array.from({length:storage.length},(_,i)=>{const k=storage.key(i);return[k,storage.getItem(k)];}));}

async function complete(w,code,bank,round){
  const d=w.document;
  const name=d.getElementById('studentName');if(name)name.value='QA learner';
  if(round)d.getElementById('restartButton').click();
  d.getElementById('startButton').click();
  const qs=w.skillrActiveQuestions;
  assert.equal(qs.length,bank==='practice'?8:16,code+' '+bank);
  if(bank==='practice'){
    assert.equal(qs.filter(q=>q.responseType==='mcq').length,6);
    assert.equal(qs.filter(q=>q.responseType==='short_answer').length,2);
    assert(qs.every((q,i)=>i===0||q.difficulty>=qs[i-1].difficulty));
  } else assert.deepEqual(Array.from(qs,q=>q.questionId),Array.from({length:16},(_,i)=>'T'+String(i+1).padStart(2,'0')));
  for(const q of qs){
    assert.equal(d.getElementById('questionText').textContent,q.question,`${code} ${bank} round ${round} ${q.id}`);
    if(q.visualModel){
      assert(d.querySelector('#questionVisual .y1-visual'),q.id+' visual missing');visuals++;
      assert(!d.getElementById('questionVisual').textContent.includes('[object Object]'));
      if(q.visualModel.type==='groups')assert.equal(d.querySelectorAll('.y1-group i').length,q.visualModel.groups.reduce((a,b)=>a+b,0));
      if(q.visualModel.type==='tiles')for(const r of d.querySelectorAll('.y1-tiles rect'))assert.equal(r.getAttribute('width'),r.getAttribute('height'));
    }
    if(q.type==='single'){
      const buttons=d.querySelectorAll('#answerList .answer-option');assert.equal(buttons.length,3);buttons[q.correct].click();
    }else if(q.type==='text'){
      const input=d.getElementById('typedAnswer');assert(input,q.id+' text input missing');
      input.value=q.acceptedAnswers[0];input.dispatchEvent(new w.Event('input'));
    }else{
      assert.equal(q.gradingMode,'adult-review');
      assert(d.getElementById('submitButton').disabled,'Blank open response must be disabled');
      assert(!d.querySelector('.self-check-model'),'Model must not appear before response submission');
      const paper=d.getElementById('adultReviewPaper');paper.checked=true;paper.dispatchEvent(new w.Event('change'));
    }
    assert(!d.getElementById('submitButton').disabled,q.id+' submit disabled');
    d.getElementById('submitButton').click();
    if(q.gradingMode==='adult-review')assert(d.getElementById('feedback').classList.contains('pending'));
    else assert(d.getElementById('feedback').classList.contains('correct'),q.id+' expected answer rejected');
    d.getElementById('nextButton').click();rendered++;
  }
  await tick();attempts++;
  const result=JSON.parse(w.sessionStorage.getItem(w.quizConfig.resultStorageKey));
  assert(result,'No stored result');
  const pending=qs.filter(q=>q.gradingMode==='adult-review').length;
  assert.equal(result.pendingReview,pending);assert.equal(result.score,qs.length-pending);
  assert.equal(result.total,qs.length);assert.equal(result.markedTotal,qs.length-pending);
  assert.equal(result.passed,pending===0);
  assert(result.answers.every((a,i)=>a.questionId===qs[i].id));
  assert.equal(result.bankVersion,bankVersion);
  const progress=w.SkillrProgress.read().attempts.at(-1);
  assert.equal(progress.pendingReview,pending);assert.equal(progress.bankVersion,bankVersion);assert.equal(progress.passed,pending===0);
  return {ids:Array.from(qs,q=>q.id),result};
}

(async()=>{
  if(process.argv.includes('--legacy')){
    const {dom,w,errors}=await page('quiz/year-2/math/ac9m2n01/practice/');
    const d=w.document;d.getElementById('startButton').click();
    for(const q of w.skillrActiveQuestions){
      assert.equal(q.type,'single');
      d.querySelectorAll('#answerList .answer-option')[q.correct].click();
      d.getElementById('submitButton').click();d.getElementById('nextButton').click();
    }
    await tick();
    const result=JSON.parse(w.sessionStorage.getItem(w.quizConfig.resultStorageKey));
    assert.equal(result.pendingReview,0);assert.equal(result.score,result.total);assert.equal(result.percentage,100);assert(result.passed);
    assert.equal(result.bankVersion,'');assert.deepEqual(errors,[]);dom.window.close();
    const missing=await page('quiz/year-1/math/ac9m1n06/test/',null,null,true);
    assert(missing.w.document.getElementById('startButton').disabled);
    assert(missing.w.document.querySelector('[role=alert]').textContent.includes('Refresh'));
    assert.deepEqual(missing.errors,[]);missing.dom.window.close();
    console.log('Legacy Year 2 quiz regression passed; missing Year 1 support safely prevents incorrect fallback marking.');return;
  }
  auditRoutes();
  let scenario;
  for(const m of data.mapping){
    for(const bank of ['practice','test']){
      const route=`quiz/year-1/math/${m.skill_code.toLowerCase()}/${bank}/`;
      let {dom,w,errors}=await page(route);
      assert.equal(w.quizConfig.bankVersion,bankVersion);
      const source=bank==='practice'?w.skillrPracticeQuestions:w.skillrTestQuestions;
      const authored=data.questions.filter(q=>q.skill_code===m.skill_code&&q.bank===bank);
      assert.equal(source.length,authored.length);
      for(let i=0;i<source.length;i++){
        assert.equal(source[i].question,authored[i].question);
        assert.equal(source[i].explanation,authored[i].explanation);
        assert.deepEqual(JSON.parse(JSON.stringify(source[i].visualModel)),authored[i].visual);
        if(source[i].type==='single')assert.equal(source[i].answers[source[i].correct],authored[i].answer);
        if(source[i].type==='text'){
          const normal=w.SkillrYear1Maths.normaliseAnswer;
          assert(Array.from(source[i].acceptedAnswers,a=>normal(a,source[i].answerFormat)).includes(normal(authored[i].answer,source[i].answerFormat)),source[i].id+' rejects the canonical answer');
        }
      }
      const ids=[];
      for(let round=0;round<(bank==='practice'?3:1);round++){
        if(round){
          const savedLocal=stored(w.localStorage);
          assert.deepEqual(errors,[],route+' errors');dom.window.close();
          ({dom,w,errors}=await page(route,null,savedLocal));
        }
        const done=await complete(w,m.skill_code,bank,0);ids.push(...done.ids);
        if(m.skill_code==='AC9M1SP01'&&bank==='test')scenario={route,result:done.result,session:stored(w.sessionStorage),local:stored(w.localStorage)};
      }
      assert.equal(new Set(ids).size,bank==='practice'?24:16,'Cycle repeated before covering bank');
      assert.deepEqual(errors,[],route+' errors');dom.window.close();
    }
  }
  assert.equal(rendered,600);assert.equal(visuals,205);
  // End-to-end review: the four practical tasks must remain unmarked, then
  // update the same dashboard attempt when an adult checks the evidence.
  let {dom,w,errors}=await page(scenario.route+'result/',scenario.session,scenario.local);
  assert(w.document.getElementById('resultStatus').textContent.includes('grown-up'));
  assert(!w.document.getElementById('certificateButton'));
  assert.equal(w.document.getElementById('resultReviewLink').getAttribute('href'),'/'+scenario.route+'review/');
  assert.deepEqual(errors,[]);dom.window.close();
  ({dom,w,errors}=await page(scenario.route+'review/',scenario.session,scenario.local));
  assert.equal(w.document.querySelectorAll('.review-item').length,16);
  assert.equal(w.document.querySelectorAll('.y1-marking-actions').length,4);
  const buttons=w.document.querySelectorAll('.y1-marking-actions button[data-correct="true"]');
  buttons.forEach(b=>b.click());
  const key=w.document.body.dataset.resultKey,marked=JSON.parse(w.sessionStorage.getItem(key));
  assert.equal(marked.pendingReview,0);assert.equal(marked.score,16);assert(marked.passed);
  let state=w.SkillrProgress.read();assert.equal(state.attempts.length,1,'Review duplicated the attempt');assert.equal(state.attempts[0].score,16);
  // Correct an adult mark: totals must go down and no duplicate attempt may appear.
  w.document.querySelector('.y1-marking-actions button[data-correct="false"]').click();
  const revised=JSON.parse(w.sessionStorage.getItem(key));assert.equal(revised.score,15);assert.equal(revised.percentage,94);
  state=w.SkillrProgress.read();assert.equal(state.attempts.length,1);assert.equal(state.attempts[0].score,15);
  assert.equal(w.localStorage.getItem(revised.bestStorageKey),'15','A revised adult mark must correct the best score');
  scenario.session=stored(w.sessionStorage);scenario.local=stored(w.localStorage);
  assert.deepEqual(errors,[]);dom.window.close();
  ({dom,w,errors}=await page(scenario.route+'result/',scenario.session,scenario.local));
  assert.equal(w.document.getElementById('resultScore').textContent,'15 out of 16');
  assert.equal(w.document.getElementById('resultStatus').textContent,'Passed');
  assert(w.document.getElementById('certificateButton'));
  // Reject malformed numeric submissions without discarding their meaning.
  const normal=w.SkillrYear1Maths.normaliseAnswer;
  assert.equal(normal('8 ; 10','number-sequence'),normal('8,10','number-sequence'));
  assert.notEqual(normal('8,100','number-sequence'),normal('8,10','number-sequence'));
  assert.notEqual(normal('40 - 6','number-parts'),normal('40 + 6','number-parts'));
  assert.notEqual(normal('91,91','number-sequence'),normal('91,93','number-sequence'));
  assert.notEqual(normal('11-3=14','equation'),normal('11+3=14','equation'));
  assert.deepEqual(errors,[]);dom.window.close();
  console.log(JSON.stringify({questionsRendered:rendered,visualsRendered:visuals,attemptsCompleted:attempts,practiceCycle:'all 24 without repetition, 6 MCQ + 2 short per set',adultReview:'pending, marked, revised, persisted, certificate gating verified'},null,2));
})().catch(error=>{console.error(error);process.exit(1);});
