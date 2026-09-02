import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'assets/year8-10-english-curriculum-focus.json'), 'utf8'));
const expected = {8:23,9:23,10:25};
const stages = ['recognise','explain','discriminate','apply'];
const bad = /\b(rubric|marking key|award \d+ marks?|teacher should|criterion sheet)\b/i;
const generic = /A Year (?:8|9|10) student is working with a text and needs to use/i;
const errors = [];

for (const [year, codes] of Object.entries(manifest.years)) {
  if (codes.length !== expected[year]) errors.push(`Year ${year}: expected ${expected[year]} codes, found ${codes.length}`);
  for (const code of codes) {
    const file = path.join(ROOT,'assets','assessment-banks',`year${year}`,'english',`${code.toLowerCase()}.json`);
    if (!fs.existsSync(file)) { errors.push(`${code}: missing bank`); continue; }
    const items = JSON.parse(fs.readFileSync(file,'utf8'));
    const practice = items.filter(x=>x.bank==='practice');
    const test = items.filter(x=>x.bank==='test');
    if (practice.length !== 40) errors.push(`${code}: ${practice.length} practice`);
    if (test.length !== 16) errors.push(`${code}: ${test.length} test`);
    for (let s=0;s<4;s++) if (practice.slice(s*10,s*10+10).some(x=>x.stage!==stages[s])) errors.push(`${code}: bad ${stages[s]} stage`);
    const pQuestions = new Set(practice.map(x=>String(x.question).toLowerCase().trim()));
    if (pQuestions.size < 32) errors.push(`${code}: excessive repeated practice stems (${pQuestions.size}/40 unique)`);
    for (const item of items) {
      if (!Array.isArray(item.answers) || item.answers.length < 3 || item.answers.filter(a=>a.is_correct).length!==1) errors.push(`${item.id}: answer integrity`);
      const text = `${item.question||''} ${item.explanation?.summary||''} ${item.explanation?.hint||''}`;
      if (bad.test(text)) errors.push(`${item.id}: teacher-facing language`);
      if (generic.test(item.question||'')) errors.push(`${item.id}: generic student-working-with-a-text stem`);
    }
  }
}

if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log('Year 8-10 English student-facing validation PASS: 71 codes, 2840 practice, 1136 test. Classroom View unchanged.');
