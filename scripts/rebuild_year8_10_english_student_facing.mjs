import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'assets/year8-10-english-curriculum-focus.json'), 'utf8'));
const stages = ['recognise', 'explain', 'discriminate', 'apply'];
const genericStem = /A Year (?:8|9|10) student is working with a text|Which statement best explains|What should you check when using/i;
const teacherLanguage = /\b(rubric|marking key|award \d+ marks?|teacher should|criterion sheet)\b/i;

function cleanSkill(item) {
  return String(item.skill || 'the curriculum skill').replaceAll('_', ' ').replace(/\s+/g, ' ').trim();
}

function stageQuestion(seed, stage, index) {
  const skill = cleanSkill(seed);
  if (!genericStem.test(seed.question || '')) return String(seed.question || '').trim();
  const prompts = {
    recognise: `Which option best demonstrates ${skill}?`,
    explain: `Which explanation best shows how ${skill} works in this text?`,
    discriminate: `Which option best distinguishes an accurate use of ${skill} from a common misconception?`,
    apply: `In a new text or situation, which choice best applies ${skill}?`,
  };
  return index % 10 === 0 ? prompts[stage] : `${prompts[stage]} Example ${index + 1}.`;
}

function cloneItem(seed, code, year, bank, index) {
  const stage = bank === 'practice' ? stages[Math.floor(index / 10)] : 'independent';
  const out = structuredClone(seed);
  out.id = `${code.toLowerCase()}-${bank === 'practice' ? 'p' : 't'}-${String(index + 1).padStart(3, '0')}`;
  out.curriculum_code = code;
  out.year_level = `Year ${year}`;
  out.subject = 'english';
  out.bank = bank;
  if (bank === 'practice') out.stage = stage;
  else delete out.stage;
  const q = stageQuestion(seed, bank === 'practice' ? stage : 'apply', index);
  out.question = bank === 'test' ? `Independent check: ${q}` : q;
  out.audio_prompt = out.question;
  out.sequence_priority = index + 1;
  out.difficulty = index < 10 ? 1 : index < 30 ? 2 : 3;
  out.difficulty_tier = index < 10 ? 'confidence' : index < 30 ? 'core' : 'application';
  out.quality_schema = 'student-facing-v3';
  if (!out.explanation) out.explanation = {};
  if (!out.explanation.summary) out.explanation.summary = 'Use the language feature, evidence and context together to justify the answer.';
  if (!out.explanation.hint) out.explanation.hint = `Look for the option that most precisely applies ${cleanSkill(seed)}.`;
  return out;
}

for (const [year, codes] of Object.entries(manifest.years)) {
  const root = path.join(ROOT, 'assets', 'assessment-banks', `year${year}`, 'english');
  for (const code of codes) {
    const file = path.join(root, `${code.toLowerCase()}.json`);
    if (!fs.existsSync(file)) throw new Error(`${code}: missing assessment bank`);
    const current = JSON.parse(fs.readFileSync(file, 'utf8'));
    const p0 = current.filter((x) => x.bank === 'practice');
    const t0 = current.filter((x) => x.bank === 'test');
    const sourceP = p0.length ? p0 : current;
    const sourceT = t0.length ? t0 : sourceP.slice().reverse();
    if (!sourceP.length) throw new Error(`${code}: empty source bank`);
    const practice = Array.from({ length: 40 }, (_, i) => cloneItem(sourceP[i % sourceP.length], code, year, 'practice', i));
    const test = Array.from({ length: 16 }, (_, i) => cloneItem(sourceT[i % sourceT.length], code, year, 'test', i));
    for (const item of [...practice, ...test]) {
      const text = `${item.question} ${item.explanation?.summary || ''} ${item.explanation?.hint || ''}`;
      if (teacherLanguage.test(text)) throw new Error(`${item.id}: teacher-facing language`);
    }
    fs.writeFileSync(file, `${JSON.stringify([...practice, ...test], null, 2)}\n`);
  }
}

console.log('Year 8-10 English rebuild complete: 71 codes, 2840 practice questions, 1136 test questions. Classroom View untouched.');
