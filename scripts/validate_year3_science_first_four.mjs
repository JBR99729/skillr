import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
const baseline = process.argv[2] || 'origin/main';
const report = [];
const read = file => fs.readFileSync(file, 'utf8');
function bankFrom(js, name) { const context = { window: {} }; vm.runInNewContext(js, context); return context.window[name]; }
for (const suffix of ['01','02','03','04']) {
  const code = `ac9s3u${suffix}`;
  const sourceFile = `assets/assessment-banks/year3/science/${code}.json`;
  execFileSync(process.execPath, ['scripts/validate_production_question_bank.mjs', sourceFile]);
  const source = JSON.parse(read(sourceFile));
  const oldSource = JSON.parse(execFileSync('git', ['show', `${baseline}:${sourceFile}`], { encoding: 'utf8' }));
  for (const old of oldSource) {
    const current = source.find(q => q.id === old.id);
    assert(current, `Missing existing ID ${old.id}`);
    for (const key of ['curriculum_code','curriculumCode','bank','subject','year_level','quality_schema','qualitySchema']) assert.deepEqual(current[key], old[key], `${old.id}: changed ${key}`);
    for (const key of Object.keys(old)) assert(key in current, `${old.id}: removed source field ${key}`);
  }
  for (const bank of ['practice','test']) {
    const base = `quiz/year-3/science/${code}/${bank}`;
    const global = bank === 'practice' ? 'skillrPracticeQuestions' : 'skillrTestQuestions';
    const live = bankFrom(read(`${base}/questions.js`), global);
    const original = bankFrom(execFileSync('git',['show',`${baseline}:${base}/questions.js`],{encoding:'utf8'}),global);
    const chosen = source.filter(q => q.bank === bank);
    assert.equal(live.length, bank === 'practice' ? 48 : 16);
    if (bank === 'practice') assert.equal(read(`${base}/questions.js`),read(`${base}/practice-questions.js`));
    assert.equal(new Set(live.map(q=>q.id)).size,live.length);
    for (const q of live) {
      const s = chosen.find(item=>item.id===q.id);assert(s,`Unknown runtime ID ${q.id}`);
      const old = original.find(item=>item.id===q.id) || original[0];
      assert.deepEqual(Object.keys(q).sort(),Object.keys(old).sort(),`${q.id}: runtime schema changed`);
      assert.equal(q.qualitySchema,old.qualitySchema);
      assert.equal(q.question,s.question);assert.equal(q.audioPrompt,s.audio_prompt);
      assert.deepEqual(Array.from(q.answers),s.answers.map(a=>a.text));assert.equal(q.correct,s.correct_index);
      assert.equal(q.structuredExplanation.summary,s.explanation.summary);assert.equal(q.structuredExplanation.hint,s.explanation.hint);
      assert.equal(q.visualHtml,s.visualHtml);assert.equal(q.visual,s.visual.alt_text);
      if(s.visual.type==='svg') {
        const svg=read(s.visual.asset_path.replace(/^\//,''));
        assert(svg.includes(`id="${s.visual.symbol_id}"`),`${q.id}: missing SVG symbol`);
        assert(q.visualHtml.includes(`${s.visual.asset_path}#${s.visual.symbol_id}`));
        assert(!/<script|<foreignObject|onload=/i.test(svg),'Unsafe SVG');
      }
    }
    const html = read(`${base}/index.html`);
    const scripts=[...html.matchAll(/<script[^>]*src="([^"]+)"/g)].map(m=>m[1]);
    const owner=scripts.findIndex(s=>s.startsWith(`/${base}/questions.js?`));
    const filter=scripts.findIndex(s=>s.startsWith('/quiz/assets/production-question-ui.js'));
    const runtime=scripts.findIndex(s=>s.startsWith('/quiz/assets/script.js'));
    assert(owner>=0 && owner<filter && filter<runtime,`${base}: incorrect loading order`);
    assert.equal(scripts.filter(s=>s.includes('/questions.js')).length,1);
    assert(!scripts.some(s=>s.includes('experience-teacher-questions')));
    assert(scripts[owner].includes('20260907-science-strict-v1'));
    // Exercise the actual shared loader, including its global ownership decision.
    const writes=[];const context={window:{[global]:live,quizConfig:{reviewUrl:'../review/',retakeUrl:'../retake/'},location:{pathname:`/${base}/`}},document:{write:s=>writes.push(s)}};
    context.document.createElement = () => ({});
    context.document.head = { appendChild() {} };
    context.document.addEventListener = () => {};
    vm.runInNewContext(read('quiz/assets/production-question-ui.js'),context);
    assert.equal(context.window[global].length,live.length,'Production filter removed questions');
    vm.runInNewContext(read('quiz/assets/script.js'),context);
    assert.deepEqual(Array.from(context.window.quizQuestions,q=>q.id),Array.from(live,q=>q.id),'Loader selected a different bank');
    assert(writes.some(s=>s.includes('script-runtime-v115.js')));
    assert.equal(context.window.quizConfig.reviewUrl,`/${base}/review/`);
    report.push({code:code.toUpperCase(),bank,count:live.length,visuals:chosen.filter(q=>q.visual.type==='svg').length,status:'PASS'});
  }
}
console.log(JSON.stringify({baseline,checks:report,status:'PASS'},null,2));
