import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const ROOT = path.resolve(import.meta.dirname, '..');
const BANK_ROOT = path.join(ROOT, 'assets', 'assessment-banks', 'year7', 'english');
const QUIZ_ROOT = path.join(ROOT, 'quiz', 'year-7', 'english');
const STAGES = ['recognise', 'explain', 'discriminate', 'apply'];

const PRACTICE_CONTEXTS = [
  'school podcast', 'local history display', 'science expo', 'library newsletter', 'student council proposal',
  'sports club notice', 'museum exhibit', 'community garden report', 'class debate', 'environmental campaign',
  'excursion briefing', 'book-club discussion', 'school website', 'arts festival program', 'peer feedback session',
  'technology showcase', 'canteen survey', 'school assembly speech', 'media review', 'geography field report'
];
const TEST_CONTEXTS = [
  'youth radio interview', 'coastal restoration article', 'public transport campaign', 'regional museum audio guide',
  'wildlife rescue webpage', 'local council consultation', 'heritage trail brochure', 'community theatre review',
  'water-quality report', 'regional sports commentary', 'astronomy exhibition', 'farmers market profile',
  'emergency-preparedness video', 'cycling safety infographic', 'river-health podcast', 'town festival website'
];

const captured = { units: {}, order: [] };
const sandbox = { window: {
  SkillrYear7Register(subject, specs, order) {
    if (subject !== 'english') return;
    Object.assign(captured.units, specs);
    captured.order.push(...order);
  }
} };
vm.createContext(sandbox);
for (const file of ['assets/year7-english-data-la.js','assets/year7-english-data-le.js','assets/year7-english-data-ly.js']) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, file), 'utf8'), sandbox, { filename: file });
}
const codes = [...new Set(captured.order)];
const units = captured.units;
if (codes.length !== 24) throw new Error(`Expected 24 Year 7 English codes, found ${codes.length}`);

const clean = (v) => String(v ?? '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const sentence = (v) => clean(v).replace(/[.!?]+$/, '');
const cap = (v) => { const s = sentence(v); return s ? s[0].toUpperCase() + s.slice(1) : s; };
const slug = (v) => clean(v).toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
const norm = (v) => clean(v).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

function rows(visual) {
  const data = visual?.data;
  if (!Array.isArray(data)) return [];
  if (!data.every(Array.isArray)) return data.map((v, i) => [`step ${i + 1}`, clean(v), '']);
  const out = data.map(r => r.map(clean)).filter(r => r.some(Boolean));
  if (!out.length) return [];
  const first = out[0].map(x => x.toLowerCase());
  const headerWords = ['context','language','text','type','feature','technique','device','problem','purpose','relationship','mode','stage','criterion','version','structure','section','clause','term','step','element','example'];
  if (first.some(x => headerWords.some(h => x === h || x.includes(h)))) return out.slice(1);
  return out;
}

function distinct(values, exclude = []) {
  const blocked = new Set(exclude.map(norm));
  const seen = new Set();
  return values.map(clean).filter(Boolean).filter(v => {
    const k = norm(v);
    if (!k || blocked.has(k) || seen.has(k)) return false;
    seen.add(k); return true;
  });
}

function choiceSet(correct, candidates, correctIndex) {
  const fallbacks = [
    'It makes a broader claim than the evidence supports.',
    'It names a feature but does not match what the example shows.',
    'It ignores the relationship between language, purpose and audience.',
    'It confuses a possible effect with a guaranteed effect.'
  ];
  const wrongs = distinct(candidates, [correct]);
  for (const f of fallbacks) if (wrongs.length < 3 && !wrongs.some(w => norm(w) === norm(f))) wrongs.push(f);
  const result = wrongs.slice(0, 3).map(text => ({ text, is_correct: false }));
  result.splice(correctIndex, 0, { text: clean(correct), is_correct: true });
  return result;
}

function sourcePool(unit) {
  const terms = (unit.terms || []).map(([name, definition]) => ({ kind:'term', name:clean(name), definition:clean(definition) }));
  const mistakes = (unit.mistakes || []).map(([wrong, repair]) => ({ kind:'repair', wrong:clean(wrong), repair:clean(repair) }));
  const model = rows(unit.modelVisual).map((r, i) => ({ kind:'model', label:r[0] || `example ${i+1}`, example:r[1] || r[0], effect:r[2] || unit.modelNote || unit.core || unit.desc }));
  const apply = rows(unit.applyVisual).map((r, i) => ({ kind:'apply', label:r[0] || `example ${i+1}`, example:r[1] || r[0], effect:r[2] || unit.applyNote || unit.core || unit.desc }));
  return { terms, mistakes, model, apply };
}

function recogniseItem(unit, pool, i) {
  const mode = i % 5;
  if (mode === 0 && pool.terms.length) {
    const x = pool.terms[i % pool.terms.length];
    const others = pool.terms.filter(t => t !== x).map(t => t.name);
    return {
      skill:x.name,
      question:`Which term best matches this meaning: “${sentence(x.definition)}”?`,
      correct:x.name,
      wrongs:others,
      summary:`${cap(x.name)} means ${sentence(x.definition)}. The strongest answer matches the whole meaning, not just one familiar word.`,
      hint:`Match the definition to the most precise term used in ${unit.title}.`
    };
  }
  if ((mode === 1 || mode === 3) && pool.model.length) {
    const x = pool.model[i % pool.model.length];
    const others = pool.model.filter(v => v !== x).map(v => v.label);
    return {
      skill:x.label,
      question:`Read this example: “${sentence(x.example)}.” Which description fits it best?`,
      correct:x.label,
      wrongs:others,
      summary:`The example matches ${x.label}. ${cap(x.effect)}`,
      hint:`Identify the feature that is actually present before deciding what it does.`
    };
  }
  if (mode === 2 && pool.apply.length) {
    const x = pool.apply[i % pool.apply.length];
    const others = pool.apply.filter(v => v !== x).map(v => v.label);
    return {
      skill:x.label,
      question:`Which label most accurately describes “${sentence(x.example)}”?`,
      correct:x.label,
      wrongs:others,
      summary:`“${sentence(x.example)}” is best described as ${x.label}.`,
      hint:`Use the wording in the example, not the length or complexity of the options.`
    };
  }
  if (pool.mistakes.length) {
    const x = pool.mistakes[i % pool.mistakes.length];
    const others = pool.mistakes.filter(v => v !== x).map(v => v.wrong);
    return {
      skill:'misconception repair',
      question:`Which response best corrects this claim: “${sentence(x.wrong)}”?`,
      correct:cap(x.repair),
      wrongs:others,
      summary:`${cap(x.repair)} This corrects the overgeneralisation in the original claim.`,
      hint:`Choose the response that keeps the useful idea but fixes what is inaccurate.`
    };
  }
  return {
    skill:unit.title,
    question:`Which statement best captures the key idea in ${unit.title}?`,
    correct:cap(unit.core || unit.desc),
    wrongs:['The feature always has the same effect in every context.','The feature matters only when a text is formal.','The feature can be identified without considering meaning or purpose.'],
    summary:cap(unit.core || unit.desc),
    hint:'Choose the statement that allows for context, purpose and evidence.'
  };
}

function explainItem(unit, pool, i) {
  const combined = [...pool.model, ...pool.apply];
  if (combined.length) {
    const x = combined[i % combined.length];
    const correct = x.effect && norm(x.effect) !== norm(x.example)
      ? cap(x.effect)
      : `It shows ${x.label} in a way that supports the text's purpose.`;
    const wrongs = [
      `It is effective simply because it contains the words “${sentence(x.example).split(' ').slice(0,3).join(' ')}”.`,
      `It guarantees the same effect for every audience and context.`,
      `It matters only because the example is longer than a simpler sentence.`
    ];
    const stems = [
      `Why does “${sentence(x.example)}” illustrate ${x.label}?`,
      `What is the best explanation of how “${sentence(x.example)}” works?`,
      `Which explanation connects the feature in “${sentence(x.example)}” to its effect most clearly?`,
      `What should a careful reader notice about “${sentence(x.example)}”?`,
      `How does the example “${sentence(x.example)}” contribute to meaning?`
    ];
    return {
      skill:x.label,
      question:stems[i % stems.length],
      correct,
      wrongs,
      summary:`A strong explanation identifies the feature and then explains its effect in context. ${cap(correct)}`,
      hint:'Do not stop at naming the feature; connect it to the meaning, audience or purpose.'
    };
  }
  const x = pool.terms[i % Math.max(1,pool.terms.length)];
  const name = x?.name || unit.title;
  const def = x?.definition || unit.core || unit.desc;
  return {
    skill:name,
    question:`Why is ${name} important when analysing a text?`,
    correct:`Because it helps explain how ${sentence(def)} affects meaning in context.`,
    wrongs:['Because every text must use it in exactly the same way.','Because naming a term is enough without using evidence.','Because it makes a text automatically more sophisticated.'],
    summary:`The term matters when it helps explain a real language or text choice and its effect.`,
    hint:'Link the concept to what a reader, viewer or listener actually experiences.'
  };
}

function discriminateItem(unit, pool, i) {
  if (pool.mistakes.length) {
    const x = pool.mistakes[i % pool.mistakes.length];
    const otherRepairs = pool.mistakes.filter(v => v !== x).map(v => cap(v.repair));
    const stems = [
      `A claim says, “${sentence(x.wrong)}.” Which response makes the most accurate distinction?`,
      `What is the main problem with this statement: “${sentence(x.wrong)}”?`,
      `Which correction avoids the misconception in “${sentence(x.wrong)}”?`,
      `Two readers disagree about “${sentence(x.wrong)}.” Which response is better supported?`,
      `Which idea should replace “${sentence(x.wrong)}” so the analysis stays accurate?`
    ];
    return {
      skill:'discriminate misconception',
      question:stems[i % stems.length],
      correct:cap(x.repair),
      wrongs:[x.wrong, ...otherRepairs],
      summary:`${cap(x.repair)} The original statement is too broad, incomplete or inaccurate.`,
      hint:'Look for the answer that keeps important qualifications instead of turning a useful pattern into an absolute rule.'
    };
  }
  const combined = [...pool.model, ...pool.apply];
  const a = combined[i % combined.length];
  const b = combined[(i + 1) % combined.length];
  return {
    skill:a?.label || unit.title,
    question:`Which comparison between “${sentence(a?.example)}” and “${sentence(b?.example)}” is most precise?`,
    correct:`The first shows ${a?.label}; the second shows ${b?.label}, so their functions should not be treated as identical.`,
    wrongs:['They must have exactly the same effect because they appear in the same topic.','The longer example is automatically more effective.','There is no need to consider context once a feature has been named.'],
    summary:'Discrimination means noticing the exact difference that matters rather than treating related features as interchangeable.',
    hint:'Compare the feature, the evidence and the effect in each example.'
  };
}

function applicationChoices(unit, pool, i, context, test=false) {
  const correctExample = clean(unit.correctExample || unit.core || unit.desc);
  const mistake = pool.mistakes[i % Math.max(1,pool.mistakes.length)];
  const model = pool.model[i % Math.max(1,pool.model.length)];
  const apply = pool.apply[i % Math.max(1,pool.apply.length)];
  const term = pool.terms[i % Math.max(1,pool.terms.length)];
  const n = i % 5;
  if (n === 0 && correctExample) {
    return {
      skill:unit.title,
      question:`A ${context} needs a concise example of ${unit.title}. Which choice best fits?`,
      correct:cap(correctExample),
      wrongs:[mistake?.wrong, model?.label ? `Simply name ${model.label} without showing it in context.` : '', 'Use a broad claim that ignores audience and purpose.'],
      summary:`The strongest choice demonstrates the concept itself: ${cap(correctExample)}`,
      hint:`Choose the option that actually applies the idea rather than merely naming it.`
    };
  }
  if (n === 1 && mistake) {
    return {
      skill:'revision',
      question:`In a ${context}, someone writes, “${sentence(mistake.wrong)}.” Which revision would make the analysis more accurate?`,
      correct:cap(mistake.repair),
      wrongs:[mistake.wrong, 'Keep the claim but add “always” to make it sound certain.', 'Remove the evidence and replace it with a personal preference.'],
      summary:`${cap(mistake.repair)} The revision fixes the misconception without losing the useful part of the original idea.`,
      hint:'Prefer qualified, evidence-based wording over an absolute claim.'
    };
  }
  if (n === 2 && model) {
    return {
      skill:model.label,
      question:`A ${context} includes “${sentence(model.example)}.” Which analysis is strongest?`,
      correct:model.effect ? cap(model.effect) : `It is an example of ${model.label} and should be interpreted in relation to the audience and purpose.`,
      wrongs:[`It is important only because it is an example of ${model.label}.`,'Its effect is guaranteed no matter who the audience is.','It should be judged only by whether the reader personally likes it.'],
      summary:`The strongest analysis connects the evidence to its function: ${cap(model.effect || model.label)}`,
      hint:'Use a feature → evidence → effect chain.'
    };
  }
  if (n === 3 && apply) {
    return {
      skill:apply.label,
      question:`Which interpretation of “${sentence(apply.example)}” would be most useful in a ${context}?`,
      correct:apply.effect ? cap(apply.effect) : `It demonstrates ${apply.label} and should be linked to the text's purpose.`,
      wrongs:[`It proves that ${apply.label} always has one fixed effect.`,'It can be analysed without referring to the actual wording.','It is automatically better because it sounds more formal.'],
      summary:`The interpretation uses the specific evidence and keeps the effect tied to context.`,
      hint:'Avoid automatic rules; explain what this example does here.'
    };
  }
  if (term) {
    return {
      skill:term.name,
      question:`A ${context} uses the idea “${sentence(term.definition)}.” Which term would make the analysis most precise?`,
      correct:term.name,
      wrongs:pool.terms.filter(t => t !== term).map(t => t.name),
      summary:`${cap(term.name)} is the precise term for ${sentence(term.definition)}.`,
      hint:'Select the term that matches the whole definition and then check it against the context.'
    };
  }
  return {
    skill:unit.title,
    question:`Which comment about a ${context} best applies ${unit.title}?`,
    correct:cap(unit.core || unit.desc),
    wrongs:['The same effect can be assumed in every context.','Naming the feature is enough; evidence is unnecessary.','The most formal-sounding option is always the best analysis.'],
    summary:cap(unit.core || unit.desc),
    hint:'Use the concept with evidence and context, not as a slogan.'
  };
}

function testItem(unit, pool, i, context) {
  const base = applicationChoices(unit, pool, i + 7, context, true);
  const variants = [
    q => q,
    q => `Read the new context carefully. ${q}`,
    q => `Which answer is best supported in this new situation? ${q}`,
    q => `Use the evidence in this ${context}. ${q}`,
    q => `Choose the most precise analysis for this unfamiliar example. ${q}`,
    q => `Which response would hold up under close reading? ${q}`,
    q => `What is the strongest conclusion from the wording given? ${q}`,
    q => `Which choice uses the concept without overgeneralising? ${q}`
  ];
  return { ...base, question:variants[i % variants.length](base.question) };
}

function makeItem(code, bank, stage, item, index) {
  const ci = (index + codes.indexOf(code) + (bank === 'test' ? 1 : 0)) % 4;
  const q = clean(item.question).replace(/\?+$/, '') + '?';
  return {
    id:`${code.toLowerCase()}-${bank === 'practice' ? 'p' : 't'}-${String(index + 1).padStart(3,'0')}`,
    curriculum_code:code,
    year_level:'Year 7',
    subject:'english',
    bank,
    ...(stage ? { stage } : {}),
    skill:slug(item.skill || code),
    question:q,
    audio_prompt:q,
    visual:{ type:'none', alt_text:'' },
    answers:choiceSet(item.correct, item.wrongs || [], ci),
    correct_index:ci,
    explanation:{ summary:clean(item.summary), hint:clean(item.hint) },
    difficulty:stage === 'recognise' ? 1 : stage === 'apply' || bank === 'test' ? 3 : 2,
    difficulty_tier:stage || 'test',
    sequence_priority:index + 1,
    quality_schema:'skillr-actual-v4'
  };
}

function toJs(item) {
  return {
    id:item.id,
    curriculumCode:item.curriculum_code,
    bank:item.bank,
    skill:item.skill.replaceAll('_',' '),
    printable:true,
    type:'single',
    question:item.question,
    audioPrompt:item.audio_prompt,
    visual:'',
    visualHtml:'',
    visualMeta:item.visual,
    answers:item.answers.map(a => a.text),
    correct:item.correct_index,
    explanation:`${item.explanation.summary}\nHint: ${item.explanation.hint}`,
    structuredExplanation:item.explanation,
    qualitySchema:item.quality_schema
  };
}

function writeQuiz(code, practice, test) {
  const dir = path.join(QUIZ_ROOT, code.toLowerCase());
  if (!fs.existsSync(dir)) throw new Error(`${code}: quiz directory missing`);
  const p = `"use strict";\nwindow.skillrPracticeQuestions = ${JSON.stringify(practice.map(toJs), null, 2)};\nwindow.quizQuestions = window.skillrPracticeQuestions;\n`;
  const t = `"use strict";\nwindow.skillrTestQuestions = ${JSON.stringify(test.map(toJs), null, 2)};\nwindow.skillrExamQuestions = window.skillrTestQuestions;\nwindow.quizQuestions = window.skillrTestQuestions;\n`;
  fs.writeFileSync(path.join(dir, 'practice', 'questions.js'), p);
  const legacy = path.join(dir, 'practice', 'practice-questions.js');
  if (fs.existsSync(legacy)) fs.writeFileSync(legacy, p);
  fs.writeFileSync(path.join(dir, 'test', 'questions.js'), t);
}

fs.mkdirSync(BANK_ROOT, { recursive:true });
for (const code of codes) {
  const unit = units[code];
  if (!unit) throw new Error(`${code}: curriculum unit missing`);
  const pool = sourcePool(unit);
  const practice = [];
  for (let i=0;i<10;i++) practice.push(makeItem(code,'practice','recognise',recogniseItem(unit,pool,i),i));
  for (let i=0;i<10;i++) practice.push(makeItem(code,'practice','explain',explainItem(unit,pool,i),i+10));
  for (let i=0;i<10;i++) practice.push(makeItem(code,'practice','discriminate',discriminateItem(unit,pool,i),i+20));
  for (let i=0;i<10;i++) practice.push(makeItem(code,'practice','apply',applicationChoices(unit,pool,i,PRACTICE_CONTEXTS[(codes.indexOf(code)*3+i)%PRACTICE_CONTEXTS.length]),i+30));
  const test = Array.from({length:16},(_,i) => makeItem(code,'test',null,testItem(unit,pool,i,TEST_CONTEXTS[(codes.indexOf(code)*5+i)%TEST_CONTEXTS.length]),i));
  fs.writeFileSync(path.join(BANK_ROOT,`${code.toLowerCase()}.json`),JSON.stringify([...practice,...test],null,2)+'\n');
  writeQuiz(code,practice,test);
}
console.log(`Year 7 English actual banks rebuilt: ${codes.length} codes, ${codes.length*40} Practice, ${codes.length*16} Test, ${codes.length*56} total.`);
