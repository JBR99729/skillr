import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';

// Publication parity and resource checks supplement the independent content reviews.
const root=path.resolve(import.meta.dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const version='20260908-year4-first-five';
const load=p=>{const c={window:{}};vm.runInNewContext(read(p),c,{filename:p,timeout:1000});return c.window;};
const scripts=html=>[...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map(m=>m[1]);
const results=[];
const units=JSON.parse(read('data/curriculum-units.json')).units;
const ledger=new Set(JSON.parse(read('data/content-verification-status.json')).reviewedCodes);
for(let n=1;n<=5;n++){
  const code=`AC9M4N0${n}`,lower=code.toLowerCase();
  const sourcePath=`assets/assessment-banks/year4/math/${lower}.json`;
  execFileSync(process.execPath,['scripts/validate_production_question_bank.mjs',sourcePath],{cwd:root,stdio:'pipe'});
  const source=JSON.parse(read(sourcePath));
  const sha256=createHash('sha256').update(read(sourcePath)).digest('hex');
  const review=read(`reports/year4-maths-ixl-review/${code}-INDEPENDENT-REVIEW.md`);
  assert(review.includes(sha256),`${code}: independent review does not identify final bank bytes`);
  assert(/Status:\s*(?:\*\*)?PASS\b/i.test(review),`${code}: independent review is not marked PASS`);
  assert(ledger.has(code),`${code}: missing review ledger entry`);
  let visualCount=0;
  for(const q of source){
    assert.equal(q.curriculum_code,code);
    assert.equal(q.year_level,'Year 4');
    assert.equal(q.subject,'math');
    if(q.visual.type==='svg'){
      visualCount++;
      const [file,symbol]=q.visual.asset_path.split('#');
      assert(file&&symbol,`${q.id}: external symbol path required`);
      const svg=read(file.replace(/^\//,''));
      assert(svg.includes(`id="${symbol}"`),`${q.id}: SVG symbol missing`);
      assert(!/<script\b|\bonload=|\bonerror=/i.test(svg),`${q.id}: active SVG content`);
    }
  }
  for(const mode of ['practice','test']){
    const route=`quiz/year-4/math/${lower}/${mode}`;
    const html=read(`${route}/index.html`),refs=scripts(html);
    const questionRefs=refs.filter(s=>/questions\.js/.test(s));
    assert.deepEqual(questionRefs,[`/${route}/questions.js?v=${version}`]);
    assert(refs.findIndex(s=>s.includes('/production-question-ui.js'))<refs.findIndex(s=>s.startsWith('/quiz/assets/script.js')));
    assert(refs.some(s=>s.includes('/production-question-ui.js')));
    const config=JSON.parse(html.match(/window.quizConfig=(\{.*?\});<\/script>/s)[1]);
    assert.equal(config.maxQuestions,5);assert(config.shuffleQuestions&&config.shuffleAnswers);
    assert.equal(config.bankVersion,version);assert.equal(config.skillCode,code);
    const w=load(`${route}/questions.js`);
    const expected=source.filter(q=>q.bank===mode),actual=w.quizQuestions;
    if(expected.some(q=>q.grading_mode==='adult-review')){
      assert(config.requireAdultReviewSupport,`${code} ${mode}: adult response support is required`);
      assert(refs.some(s=>s.includes('/year1-maths-support.js')),`${code} ${mode}: response evaluator missing`);
      for(const page of ['result','review'])assert(read(`${route}/${page}/index.html`).includes('/quiz/assets/year1-maths-support.js'),`${code} ${mode}: adult marking missing on ${page}`);
    }
    assert.equal(actual.length,expected.length);
    assert.strictEqual(actual,w[mode==='practice'?'skillrPracticeQuestions':'skillrTestQuestions']);
    if(mode==='test')assert.strictEqual(actual,w.skillrExamQuestions);
    for(const q of expected){
      const live=actual.find(a=>a.id===q.id.toLowerCase());assert(live,`${q.id}: missing live item`);
      assert.equal(live.question,q.question);assert.equal(live.audioPrompt,q.audio_prompt);
      assert.equal(live.curriculumCode,code);assert.equal(live.bank,mode);
      assert.deepEqual(Array.from(live.answers),q.answers.map(a=>a.text));
      assert.equal(live.correct,q.grading_mode==='adult-review'?q.model_answer:q.correct_index);
      assert.deepEqual(JSON.parse(JSON.stringify(live.structuredExplanation)),q.explanation);
      assert.equal(live.visual,q.visual.alt_text||'');
      assert.deepEqual(JSON.parse(JSON.stringify(live.visualMeta)),q.visual);
      if(q.visual.type==='svg')assert(live.visualHtml.includes(q.visual.asset_path));else assert.equal(live.visualHtml,'');
    }
    if(mode==='practice')assert.equal(read(`${route}/questions.js`),read(`${route}/practice-questions.js`));
    for(const page of ['result','review','retake'])assert(fs.existsSync(path.join(root,route,page,'index.html')));
    const reviewHtml=read(`${route}/review/index.html`),reviewRefs=scripts(reviewHtml);
    assert(reviewHtml.includes(`data-bank-version="${version}"`));
    assert(reviewRefs.indexOf(`/${route}/questions.js?v=${version}`)>=0);
    assert(reviewRefs.findIndex(s=>s.includes('separate-review.js'))<reviewRefs.findIndex(s=>s.includes('reviewed-number-visuals.js')));
  }
  const unit=units.find(u=>u.code===code&&u.yearNumber===4&&u.subjectSlug==='maths');assert(unit);
  const topic=unit.url.replace(/^\//,'')+'index.html';
  const topicHtml=read(topic),classroom=read(path.posix.join(path.posix.dirname(topic),'teacher-slides/index.html'));
  assert(topicHtml.includes('teacher-slides/'));assert(classroom.includes(code));
  for(const mode of ['worksheet','practice','test']){
    const href=`/quiz/year-4/math/${lower}/${mode}/`;assert(topicHtml.includes(href));
    assert(read(href.slice(1)+'index.html').includes(code));
  }
  const sheetRoute=`quiz/year-4/math/${lower}/worksheet`;
  const sheetRefs=scripts(read(`${sheetRoute}/index.html`));
  const sheetSource=sheetRefs.find(s=>/\/worksheet\/worksheet-questions\.js/.test(s));
  assert(sheetSource,`${code}: separately authored worksheet questions missing`);
  const sheet=load(sheetSource.split('?')[0].replace(/^\//,'')).skillrWorksheetQuestions;
  assert(Array.isArray(sheet)&&sheet.length>=8,`${code}: insufficient authored worksheet questions`);
  assert.equal(new Set(sheet.map(q=>q.id)).size,sheet.length,`${code}: duplicate worksheet IDs`);
  for(const q of sheet){assert(q.question&&q.explanation,`${code} worksheet: missing question or explanation`);assert(q.correct!==undefined||q.modelAnswer,`${q.id}: worksheet answer missing`);}
  results.push({code,practice:source.filter(q=>q.bank==='practice').length,test:source.filter(q=>q.bank==='test').length,visualQuestions:visualCount,sha256,status:'PASS'});
}
const year4Codes=units.filter(u=>u.yearNumber===4&&u.subjectSlug==='maths').map(u=>u.code);
assert.equal(year4Codes.length,23);
assert.equal(year4Codes.filter(c=>ledger.has(c)).length,5,'Only the first five codes are approved in this release');
assert(!read('year4/curriculum/maths/index.html').includes('✓ Content Verified'),'Year 4 badge must remain pending');
assert(read('year3/curriculum/english/index.html').includes('✓ Content Verified'),'Preserve completed Year 3 English badge');
execFileSync(process.execPath,['scripts/update_content_verification_status.mjs','--check'],{cwd:root,stdio:'pipe'});
const output={status:'PASS',version,reviewed:5,totalCodes:23,badgeActivated:false,results};
fs.mkdirSync(path.join(root,'reports/year4-maths-ixl-review'),{recursive:true});
fs.writeFileSync(path.join(root,'reports/year4-maths-ixl-review/FIRST-FIVE-VALIDATION.json'),JSON.stringify(output,null,2)+'\n');
console.log(JSON.stringify(output,null,2));
