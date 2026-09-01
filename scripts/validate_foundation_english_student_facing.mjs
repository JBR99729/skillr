#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = process.cwd();
const expected = [
  ...Array.from({length:8},(_,i)=>`AC9EFLA${String(i+2).padStart(2,'0')}`),
  ...Array.from({length:5},(_,i)=>`AC9EFLE${String(i+1).padStart(2,'0')}`),
  ...Array.from({length:15},(_,i)=>`AC9EFLY${String(i+1).padStart(2,'0')}`)
];
const context = vm.createContext({
  window: {},
  document: { getElementById:()=>null, querySelectorAll:()=>[] },
  location: { pathname: '/' },
  console
});
for (const file of [
  'assets/foundation-english-student-facing-core.js',
  'assets/foundation-english-student-facing-la.js',
  'assets/foundation-english-student-facing-le.js',
  'assets/foundation-english-student-facing-ly1.js',
  'assets/foundation-english-student-facing-ly2.js'
]) {
  new vm.Script(fs.readFileSync(path.join(root,file),'utf8'), { filename:file }).runInContext(context);
}
const api = context.window.SkillrFoundationEnglishStudentFacing;
if (!api || !api.version) throw new Error('Student-facing API did not load or has no version.');
const actual = Object.keys(api.configs).sort();
const wanted = [...expected].sort();
if (JSON.stringify(actual) !== JSON.stringify(wanted)) throw new Error(`Expected ${wanted.length} codes, found ${actual.length}.`);
const banned = /award\s+\d+\s+mark|rubric|teacher-facing|learning intention/i;
for (const code of expected) {
  const cfg = api.configs[code];
  if (!cfg.childGoal || !cfg.bigIdea || !Array.isArray(cfg.routine) || cfg.routine.length !== 4) throw new Error(`${code}: incomplete teaching config.`);
  if (!Array.isArray(cfg.seeds) || cfg.seeds.length !== 10) throw new Error(`${code}: expected exactly 10 authored seed scenarios.`);
  for (const [i,s] of cfg.seeds.entries()) {
    for (const key of ['q','a','w1','w2','why']) if (!String(s[key]||'').trim()) throw new Error(`${code} seed ${i+1}: missing ${key}.`);
    if (new Set([s.a,s.w1,s.w2]).size !== 3) throw new Error(`${code} seed ${i+1}: duplicate answer options.`);
    if (banned.test([s.q,s.a,s.w1,s.w2,s.why].join(' '))) throw new Error(`${code} seed ${i+1}: teacher/rubric language detected.`);
  }
  const practice = api.buildPractice(code);
  if (!Array.isArray(practice) || practice.length !== 40) throw new Error(`${code}: practice bank must contain 40 questions.`);
  if (practice.some(q=>q.type !== 'single' || q.answers?.length !== 3 || !Number.isInteger(q.correct) || q.correct < 0 || q.correct > 2)) throw new Error(`${code}: malformed practice MCQ.`);
  if (new Set(practice.map(q=>q.id)).size !== 40) throw new Error(`${code}: duplicate practice ids.`);
  if (new Set(practice.map(q=>q.correct)).size !== 3) throw new Error(`${code}: correct options must appear across A, B and C.`);
  const stageCounts = practice.reduce((m,q)=>(m[q.stage]=(m[q.stage]||0)+1,m),{});
  for (const stage of ['recognise','explain','discriminate','apply']) if (stageCounts[stage] !== 10) throw new Error(`${code}: expected 10 ${stage} questions.`);
  const worksheet = api.buildWorksheet(code);
  if (!worksheet || worksheet.questions?.length !== 10) throw new Error(`${code}: worksheet must contain 10 questions.`);
  if (worksheet.questions.filter(q=>q.enrichment).length !== 2) throw new Error(`${code}: worksheet must contain 8 core + 2 extension questions.`);
}
console.log(`Validated ${expected.length} remaining Foundation English codes: 1,120 practice MCQs and 280 worksheet questions generated from 280 authored seed scenarios.`);
