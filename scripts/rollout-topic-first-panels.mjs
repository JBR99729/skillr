#!/usr/bin/env node
/**
 * Roll out the approved SkillrHub question-first topic layout without changing
 * authored lessons or inventing questions. Uses only verified published app
 * catalogue entries and the repository's own practice questions.
 *
 * Use: node scripts/rollout-topic-first-panels.mjs [--write] [--year=year1]
 * Default is dry-run. Idempotent on repeated runs.
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const ROOT = process.cwd();
const WRITE = process.argv.includes('--write');
const YEAR_ARG = process.argv.find(x => x.startsWith('--year='))?.slice(7);
const YEARS = ['foundation', ...Array.from({length:10},(_,i)=>'year'+(i+1))];
const SUBJECTS = ['maths','science','english'];
if (YEAR_ARG && !YEARS.includes(YEAR_ARG)) throw new Error('Unknown year '+YEAR_ARG);
const catalogue = JSON.parse(fs.readFileSync(path.join(ROOT,'data/app-question-banks.json'),'utf8'));
const available = new Map(catalogue.codes.map(b => [b.code.toUpperCase(),b]));
const startMarker='<!-- skillr-topic-first:start -->';
const endMarker='<!-- skillr-topic-first:end -->';
const version='20261105-uniform-1';
const stylesheet='<link rel="stylesheet" href="/assets/css/topic-first-panels.css?v='+version+'">';
const loader='<script src="/assets/topic-first-panels.js?v='+version+'" defer></script>';
const esc=s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
const plain=s=>String(s||'').replace(/<[^>]*>/g,' ').replace(/&amp;/g,'&').replace(/&nbsp;/g,' ').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/\s+/g,' ').trim();
const safeJson=v=>JSON.stringify(v).replace(/</g,'\\u003c').replace(/>/g,'\\u003e').replace(/&/g,'\\u0026');
const pathFor=(year,subject,code)=>{
  const yearDir=year==='foundation'?'grade-k':'year-'+year.slice(4);
  const subjectDirs=subject==='maths'?['math','maths']:[subject];
  return subjectDirs.map(s=>path.join(ROOT,'quiz',yearDir,s,code.toLowerCase(),'practice','questions.js'));
};
const cache=new Map();
function sample(year,subject,code) {
  const key=year+'|'+subject+'|'+code;
  if(cache.has(key))return cache.get(key);
  let raw=[];
  for(const p of pathFor(year,subject,code)){
    if(!fs.existsSync(p))continue;
    try {
      const sandbox={window:{},console:{warn(){},log(){}}};
      vm.runInNewContext(fs.readFileSync(p,'utf8'),sandbox,{timeout:400,filename:path.basename(p)});
      const bank=sandbox.window.skillrPracticeQuestions||sandbox.window.quizQuestions;
      if(Array.isArray(bank)){raw=bank;break;}
    }catch(err){ /* an unparsed bank cannot be used as a verified inline preview */ }
  }
  const qualified=raw.filter(q=>{
    if(!q||q.bank&&q.bank!=='practice'||q.type&&q.type!=='single')return false;
    if(q.curriculumCode&&String(q.curriculumCode).toUpperCase()!==code)return false;
    if(typeof q.question!=='string'||q.question.trim().length<12||q.question.length>750)return false;
    if(!Array.isArray(q.answers)||q.answers.length<2||q.answers.length>6)return false;
    if(q.answers.some(a=>typeof a!=='string'||!a.trim()||a.length>340))return false;
    if(new Set(q.answers.map(a=>a.trim().toLowerCase())).size!==q.answers.length)return false;
    if(!Number.isInteger(q.correct)||q.correct<0||q.correct>=q.answers.length)return false;
    if(typeof q.explanation!=='string'||q.explanation.trim().length<12)return false;
    // Unsupported images must not be stripped away leaving unanswerable questions.
    if(q.visualHtml&&q.visualHtml.trim())return false;
    if(q.visualMeta?.type==='svg'||q.visualMeta?.type==='image')return false;
    const hasVisualNeed=/\b(picture|photo|image|diagram|graph|picture below|see the model shown|visual shown)\b/i.test(q.question);
    if(hasVisualNeed)return false;
    return true;
  }).sort((a,b)=>(a.sequencePriority||999)-(b.sequencePriority||999));
  const picked=[],skills=new Set();
  for(const q of qualified){
    const skill=String(q.skill||'').toLowerCase().trim();
    if(skill&&skills.has(skill))continue;
    picked.push(q);
    if(skill)skills.add(skill);
    if(picked.length===3)break;
  }
  for(const q of qualified){
    if(picked.length>=3)break;
    if(!picked.includes(q))picked.push(q);
  }
  const answer=picked.slice(0,3).map(q=>({
    id:String(q.id||code+'-question'),
    question:q.question.trim(),
    answers:q.answers.map(a=>a.trim()),
    correct:q.correct,
    hint:String(q.structuredExplanation?.hint||'Read the question carefully and compare each answer.').slice(0,350),
    explanation:String(q.structuredExplanation?.summary||q.explanation).trim().slice(0,1100),
    visual:typeof q.visual==='string'&&q.visual.length<=180&&!q.visual.includes('<')?q.visual.trim():''
  }));
  cache.set(key,answer);
  return answer;
}
function firstPanel({year,subject,code,title,bank,questions}) {
  const grade=year==='foundation'?'Foundation':'Year '+year.slice(4);
  const subjectLabel={maths:'Maths',science:'Science',english:'English'}[subject];
  const hasQuestions=questions.length===3&&bank?.practice===true;
  const hasBank=bank?.practice===true;
  const route='https://app.skillrhub.com/?'+(bank?.guestPractice?'try=1&amp;skill=':'login=1&amp;skill=')+code;
  const label=esc(plain(title).replace(/^AC9[A-Z0-9]+:\s*/i,'').slice(0,150));
  const q=questions[0];
  const link=hasBank?'<a class="skillr-topic-first__secondary" href="'+route+'">'+(bank.guestPractice?'Continue free practice':'Sign in for this topic')+' →</a>':'';
  const questionContents=hasQuestions?
    '<form class="skillr-topic-first__form" data-preview-form novalidate>'+
      '<p class="skillr-topic-first__counter" data-counter>Question 1 of 3</p>'+
      '<fieldset data-fieldset><legend data-question>'+esc(q.question)+'</legend>'+
      (q.visual?'<p class="skillr-topic-first__cue" data-visual>'+esc(q.visual)+'</p>':'<p class="skillr-topic-first__cue" data-visual hidden></p>')+
      '<div data-choices class="skillr-topic-first__choices">'+q.answers.map((a,i)=>'<label><input type="radio" name="preview-'+code+'" value="'+i+'"> '+esc(a)+'</label>').join('')+'</div></fieldset>'+
      '<div class="skillr-topic-first__buttons"><button type="submit" data-check>Check answer</button><button type="button" data-next hidden>Next question →</button></div>'+
      '<p data-feedback class="skillr-topic-first__feedback" role="status" aria-live="polite" hidden></p></form>'+
      '<div class="skillr-topic-first__support"><p class="skillr-topic-first__support-title">A little help when you need it</p>'+
      '<details data-hint><summary>Show a hint</summary><p data-hint-text>'+esc(q.hint)+'</p></details>'+
      '<div data-solution hidden><strong>Worked explanation</strong><p data-explanation></p></div></div>':
      '<div class="skillr-topic-first__pending"><strong>'+(hasBank?'Questions available in the app':'Questions coming soon')+'</strong>'+
      '<p>'+(hasBank?'The live practice bank is available, but this page does not yet have three reviewed, self-contained preview questions. Open the matching app activity instead.':'We are preparing and checking real questions for this curriculum code. The teaching guide and other learning resources remain available below.')+'</p>'+link+'</div>';
  const practiceLink=hasQuestions?link:'';
  const bottom=hasQuestions?
    '<p>Try the questions, then create a free account to save your future practice results and see progress for your learner. Answers to the three questions on this page are not saved.</p>':
    '<p>Browse the teaching guide now and create a free account to track practice in topics where question banks are already available.</p>';
  const data=hasQuestions?'<script type="application/json" data-preview-questions>'+safeJson(questions)+'</script>':'';
  return startMarker+
    '<section class="skillr-topic-first" id="skillr-topic-first" data-curriculum-code="'+esc(code)+'" data-topic-state="'+(hasQuestions?'questions':hasBank?'app-only':'coming-soon')+'" aria-label="'+esc(grade+' '+subjectLabel+' learning and dashboard preview')+'">'+
    '<header class="skillr-topic-first__header"><p class="skillr-topic-first__eyebrow">'+esc(grade+' · '+subjectLabel+' · '+code)+'</p>'+
    '<p class="skillr-topic-first__title">'+(hasQuestions?'Try real questions: ':'Explore this topic: ')+label+'</p>'+
    '<p class="skillr-topic-first__intro">'+(hasQuestions?'Answer three original questions, get feedback and see what a progress dashboard can offer.':'Learn the topic below, and see how free SkillrHub accounts can help organise practice and progress.')+'</p></header>'+
    '<div class="skillr-topic-first__grid"><article class="skillr-topic-first__practice"><p class="skillr-topic-first__eyebrow">LEARN BY DOING</p>'+questionContents+practiceLink+'</article>'+
    '<aside class="skillr-topic-first__dashboard" aria-label="Sample learning dashboard"><div class="skillr-topic-first__sample-label">DASHBOARD PREVIEW · SAMPLE DATA</div>'+
    '<p class="skillr-topic-first__dashboard-title">See your progress grow</p>'+
    '<p class="skillr-topic-first__sample-disclosure">Illustrative figures—not your actual student results.</p>'+
    '<div class="skillr-topic-first__stats"><div><strong>12 min</strong><span>Practice time</span></div><div><strong>3</strong><span>Skills completed</span></div>'+
    '<div><strong>24</strong><span>Questions answered</span></div><div><strong>83%</strong><span>Accuracy</span></div></div>'+
    '<div class="skillr-topic-first__subjects"><strong>Example curriculum progress</strong>'+
    '<div><span>Maths</span><span>35%</span></div><meter min="0" max="100" value="35">35%</meter>'+
    '<div><span>Science</span><span>20%</span></div><meter min="0" max="100" value="20">20%</meter>'+
    '<div><span>English</span><span>45%</span></div><meter min="0" max="100" value="45">45%</meter></div>'+
    (hasQuestions?'<div class="skillr-topic-first__live"><span data-preview-progress>Preview: 0 of 3 checked</span><progress data-progress max="3" value="0">0 of 3</progress><small>Your preview answers are not saved.</small></div>':'')+
    '<a class="skillr-topic-first__dashboard-link" href="https://app.skillrhub.com/learning/">Already have an account? View your dashboard →</a></aside></div>'+
    '<div class="skillr-topic-first__cta"><div><strong>Save and revisit your learning</strong>'+bottom+'</div>'+
    '<a class="skillr-topic-first__signup" href="https://app.skillrhub.com/?signup=1">Create your free account →</a></div>'+data+'</section>'+endMarker;
}
function transform(source,info) {
  if(source.includes(startMarker)||source.includes('id="try-questions"')||source.includes('id="skillr-topic-first"'))return {reason:'already-designed'};
  if(/<meta\b[^>]*http-equiv=["']refresh["']/i.test(source)||/data-legacy-quiz-retired/i.test(source))return {reason:'redirect'};
  if(!/<\/head>/i.test(source)||!/<\/body>/i.test(source)||!/<body\b/i.test(source))return {reason:'not-html-page'};
  const hero=/<header\b[^>]*class=["'][^"']*\bcurriculum-hero\b[^"']*["'][^>]*>/i.exec(source);
  // Some authored F–10 pages use a plain main element rather than the
  // standard hero. Add the same static first-screen panel before main.
  const plainMain=/<main\b[^>]*>/i.exec(source);
  const insertion=hero||plainMain;
  if(!insertion||!/<h1\b/i.test(source))return {reason:'no-page-insertion-point'};
  const bank=available.get(info.code);
  const questions=bank?.practice?sample(info.year,info.subject,info.code):[];
  const mode=questions.length===3&&bank?.practice?'questions':bank?.practice?'app-only':'coming-soon';
  const oldH1=/<h1\b[^>]*>([\s\S]*?)<\/h1>/i.exec(source)?.[1]||'';
  const title=plain(oldH1)||info.code;
  const html=firstPanel({...info,title,bank,questions});
  let out=source.slice(0,insertion.index)+html+source.slice(insertion.index);
  if(!out.includes('topic-first-panels.css'))out=out.replace(/<\/head>/i,stylesheet+'</head>');
  if(!out.includes('topic-first-panels.js'))out=out.replace(/<\/body>/i,loader+'</body>');
  const countIds=txt=>{
    const counts=new Map();
    for(const m of txt.matchAll(/\bid=["']([^"']+)["']/g))counts.set(m[1],(counts.get(m[1])||0)+1);
    return counts;
  };
  const oldIds=countIds(source),newIds=countIds(out);
  // Never add a new duplicate; pre-existing duplicate IDs are recorded
  // separately and are not grounds for withholding a purely additive panel.
  for(const [id,count] of newIds){
    if(count>Math.max(1,oldIds.get(id)||0))return {reason:'new-duplicate-id-conflict'};
  }
  if(!out.includes('<h1')||!out.includes('skillr-topic-first__signup'))return {reason:'structure-check'};
  if(!out.includes('https://app.skillrhub.com/?signup=1'))return {reason:'signup-missing'};
  return {html:out,mode};
}
function topicFiles() {
  const result=[];
  for(const year of YEARS){
    if(YEAR_ARG&&year!==YEAR_ARG)continue;
    for(const subject of SUBJECTS){
      const dir=path.join(ROOT,year,subject);
      if(!fs.existsSync(dir))continue;
      for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
        if(!entry.isDirectory()||!/^ac9[a-z0-9]+(?:-|$)/i.test(entry.name))continue;
        const file=path.join(dir,entry.name,'index.html');
        if(fs.existsSync(file))result.push({file,year,subject,code:entry.name.split('-')[0].toUpperCase()});
      }
    }
  }
  return result.sort((a,b)=>a.file.localeCompare(b.file));
}
const stats={examined:0,updated:0,realQuestions:0,appOnly:0,comingSoon:0,skipped:{},skippedExamples:[],coverage:{total:0,questions:0,appOnly:0,comingSoon:0,existingBlueprint:0},examples:[],byYear:{}};
for(const item of topicFiles()){
  stats.examined++;
  const current=fs.readFileSync(item.file,'utf8');
  const changed=transform(current,item);
  const yr=stats.byYear[item.year]||{examined:0,updated:0,realQuestions:0,appOnly:0,comingSoon:0};
  yr.examined++;
  if(changed.html&&changed.html!==current){
    stats.updated++;yr.updated++;
    if(changed.mode==='questions'){stats.realQuestions++;yr.realQuestions++;}
    else if(changed.mode==='app-only'){stats.appOnly++;yr.appOnly++;}
    else {stats.comingSoon++;yr.comingSoon++;}
    if(stats.examples.length<15)stats.examples.push({path:path.relative(ROOT,item.file).replaceAll(path.sep,'/'),mode:changed.mode});
    if(WRITE)fs.writeFileSync(item.file,changed.html);
  }else{
    const reason=changed.reason||'unchanged';
    stats.skipped[reason]=(stats.skipped[reason]||0)+1;
    if(reason!=='already-designed'&&stats.skippedExamples.length<100){
      stats.skippedExamples.push({path:path.relative(ROOT,item.file).replaceAll(path.sep,'/'),reason});
    }
  }
  const page=changed.html||current;
  if(page.includes(startMarker)){
    stats.coverage.total++;
    const mode=page.match(/data-topic-state=["']([^"']+)["']/)?.[1];
    if(mode==='questions')stats.coverage.questions++;
    else if(mode==='app-only')stats.coverage.appOnly++;
    else if(mode==='coming-soon')stats.coverage.comingSoon++;
  }else if(page.includes('id="try-questions"')){
    stats.coverage.total++;stats.coverage.existingBlueprint++;
  }
  stats.byYear[item.year]=yr;
}
const output=JSON.stringify(stats,null,2);
if(WRITE){
  const report=path.join(ROOT,'docs','qa','2026-11-05-topic-first-panel-rollout.json');
  fs.mkdirSync(path.dirname(report),{recursive:true});
  fs.writeFileSync(report,output+'\n');
}
console.log(output);
