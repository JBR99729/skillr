#!/usr/bin/env node
// Scoped implementation regression; no browser, publication or PDF rendering.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(import.meta.dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const worksheet = 'assets/year4-subject-worksheet-page.js';
const quick = 'assets/year4-subject-quick-read.js';
const visual = 'assets/curriculum-visual-layer-interactive.js';
const retention = 'assets/year4-english-authored-preparation.js';
const legacyCodes = Array.from({length: 12}, (_, i) => `AC9E4LA${String(i + 1).padStart(2, '0')}`);
const nextCodes = ['AC9E4LE01','AC9E4LE02','AC9E4LE03','AC9E4LE04','AC9E4LE05','AC9E4LY01'];
const authoredCodes = [...legacyCodes, ...nextCodes];
let checks = 0;

// A sentinel at the first legacy data access proves controls still enter that
// path. Authored cases must return before any legacy access or DOM mutation.
function guardCase(file, route, marked, expectGuard) {
  const sentinel = new Error('legacy path reached');
  const note = {textContent: 'Original approved teaching'};
  const body = {innerHTML: 'Original eight-task worksheet', getAttribute: () => marked === true ? 'true' : typeof marked === 'string' ? marked : null};
  const window = new Proxy({}, {
    get(target, key) {
      if (/^SkillrYear\d+.+Data$/.test(String(key))) throw sentinel;
      return target[key];
    },
    ownKeys() { throw sentinel; }
  });
  const context = {window, location: {pathname: route, search: ''},
    document: {body, querySelector: () => marked === true ? note : null}, URLSearchParams};
  let enteredLegacy = false;
  try { vm.runInNewContext(read(file), context, {filename: file}); }
  catch (error) { if (error !== sentinel) throw error; enteredLegacy = true; }
  assert.equal(enteredLegacy, !expectGuard, `${file}: ${route}, marked=${marked}`);
  assert.equal(body.innerHTML, 'Original eight-task worksheet');
  assert.equal(note.textContent, 'Original approved teaching');
  checks++;
}

for (const file of [worksheet, quick, visual]) {
  const modes = file === worksheet ? ['worksheet'] : file === quick ? ['practice', 'test'] : ['practice', 'test', 'worksheet'];
  for (const mode of modes) {
    for (const trailing of ['', '/']) {
      for (const code of authoredCodes.map(code => code.toLowerCase())) {
        guardCase(file, `/quiz/year-4/english/${code}/${mode}${trailing}`, true, true);
        guardCase(file, `/quiz/year-4/english/${code}/${mode}${trailing}`, false, false);
        guardCase(file, `/quiz/year-4/english/${code}/${mode}${trailing}`, 'false', false);
        guardCase(file, `/quiz/year-4/english/${code}/${mode}${trailing}`, 'yes', false);
      }
      guardCase(file, `/quiz/year-4/english/ac9e4la01/${mode}${trailing}`, false, false);
      guardCase(file, `/quiz/year-4/english/ac9e4la13/${mode}${trailing}`, true, false);
      guardCase(file, `/quiz/year-4/english/ac9e4la00/${mode}${trailing}`, true, false);
      for (const code of ['ac9e4le00','ac9e4le06','ac9e4ly00','ac9e4ly02','ac9e4le011','ac9e4ly010'])
        guardCase(file, `/quiz/year-4/english/${code}/${mode}${trailing}`, true, false);
      guardCase(file, `/quiz/year-4/science/ac9s4i01/${mode}${trailing}`, true, true);
      guardCase(file, `/quiz/year-4/science/ac9s4i01/${mode}${trailing}`, false, false);
    }
  }
}
guardCase(visual, '/quiz/year-4/math/ac9m4n06/practice/', true, true);
guardCase(visual, '/quiz/year-4/math/ac9m4n06/practice/', false, false);

// Execute the production runtime's actual Practice cleanup block, then the
// retention listener, in DOMContentLoaded registration order. Minimal DOM
// models make identity, order, duplicate prevention and absent-node cases clear.
const runtime = read('quiz/assets/script-runtime-v115.js');
const cleanup = runtime.match(/const preparationNotes\s*=\s*document\.querySelector\("\.pre-read-notes"\);[\s\S]*?preparationNotes\?\.remove\(\);/)?.[0];
assert(cleanup, 'Production Practice cleanup block must be explicitly retested if changed.');
for (const code of authoredCodes.map(code => code.toLowerCase())) for (const mode of ['practice', 'test']) {
  for (const suffix of ['', '/', '/index.html']) for (const withSummary of [true, false]) {
    const listeners = [];
    const summary = {kind: 'summary'};
    const note = {textContent: 'Formality is a continuum. Original reviewed wording.', querySelector: () => null};
    const card = {
      children: withSummary ? [note, summary] : [note],
      contains(node) { return this.children.includes(node); },
      querySelector() { return withSummary ? summary : null; },
      insertBefore(node, before) { this.children.splice(this.children.indexOf(before), 0, node); },
      appendChild(node) { this.children.push(node); }
    };
    note.remove = () => { card.children = card.children.filter(node => node !== note); };
    const document = {
      readyState: 'loading',
      querySelector(selector) {
        if (selector === '#startScreen .start-card') return card;
        if (selector === '.intro-text') return null;
        return card.contains(note) ? note : null;
      },
      addEventListener(event, callback, options) {
        assert.equal(event, 'DOMContentLoaded'); assert.equal(options.once, true);
        listeners.push(callback);
      }
    };
    const context = vm.createContext({document, location: {pathname: `/quiz/year-4/english/${code}/${mode}${suffix}`}, config: {bankVersion: 'qa'}});
    if (mode === 'practice') listeners.push(() => vm.runInContext(cleanup, context));
    vm.runInContext(read(retention), context);
    // A duplicate utility inclusion must still preserve the same node once.
    vm.runInContext(read(retention), context);
    assert.equal(listeners.length, mode === 'practice' ? 3 : 2, `Retention must initialise on ${mode}${suffix}`);
    for (const callback of listeners) callback();
    assert.equal(card.children.filter(node => node === note).length, 1);
    assert.equal(card.children[0], note);
    assert.equal(note.textContent, 'Formality is a continuum. Original reviewed wording.');
    assert.equal(card.children.length, withSummary ? 2 : 1);
    checks++;
  }
}
for (const route of [
  '/quiz/year-4/english/ac9e4la13/practice/',
  '/quiz/year-4/english/ac9e4le06/practice/',
  '/quiz/year-4/english/ac9e4ly02/test/index.html',
  '/quiz/year-4/english/ac9e4la00/test/',
  '/quiz/year-4/english/ac9e4la01/worksheet/',
  '/quiz/year-4/science/ac9s4i01/practice/',
  '/quiz/year-4/english/ac9e4la13/practice/index.html',
  '/quiz/year-4/english/ac9e4la13/test/index.html',
  '/quiz/year-4/english/ac9e4la01/worksheet/index.html',
  '/quiz/year-4/science/ac9s4i01/practice/index.html',
  '/quiz/year-4/english/ac9e4la01/practice/review/index.html',
  '/quiz/year-4/english/ac9e4la01/test/result/index.html',
  '/quiz/year-4/english/ac9e4la01/practice/index.html/extra'
]) {
  vm.runInNewContext(read(retention), {location: {pathname: route}, document: new Proxy({}, {get() { throw new Error('Out-of-scope retention touched DOM'); }})});
  checks++;
}
for (const code of authoredCodes) for (const absent of ['note', 'card']) {
  const document = {querySelector: selector => selector.includes('data-skillr') ? (absent === 'note' ? null : {}) : (absent === 'card' ? null : {}), addEventListener() { throw new Error('Incomplete resource must not install retention'); }};
  vm.runInNewContext(read(retention), {location: {pathname: `/quiz/year-4/english/${code.toLowerCase()}/practice/`}, document});
  checks++;
}

// Evaluate the exact production PDF allocation expression without generating
// a substitute document or claiming visual QA. English's opt-in cannot affect
// unmarked pages, other codes, Practice items or malformed worksheet IDs.
const pdf = read('quiz/assets/worksheet-pdf.js');
const allocation = pdf.match(/const keepWrittenWorkspace\s*=[\s\S]*?const writingAllowance\s*=\s*keepWrittenWorkspace\s*\?\s*responseLineCount \* 9 \+ 10\s*:\s*28;/)?.[0];
assert(allocation, 'Production PDF reservation changed: update and inspect its regression.');
assert(pdf.includes('else writingLines(type === "self-check" ? responseLineCount : 2);'), 'Self-check drawing must use the validated response count.');
function allowance(code, {marked = true, itemCode = code, id = `${code.toLowerCase()}-w-001`, type = 'self-check', responseLines} = {}) {
  const result = vm.runInNewContext(`${allocation}\nwritingAllowance`, {
    question: {id, curriculumCode: itemCode, type, responseLines}, getSkillCode: () => code,
    document: {body: {getAttribute: () => marked === true ? 'true' : typeof marked === 'string' ? marked : null}}
  });
  checks++; return result;
}
for (const code of authoredCodes) {
  assert.equal(allowance(code), 46);
  assert.equal(allowance(code, {marked: false}), 28);
  assert.equal(allowance(code, {id: `${code.toLowerCase()}-p-001`}), 28);
}
assert.equal(allowance('AC9E4LA01', {marked: false}), 28);
assert.equal(allowance('AC9E4LA01', {itemCode: 'AC9E4LA02'}), 28);
assert.equal(allowance('AC9E4LA01', {id: 'ac9e4la01-p-001'}), 28);
assert.equal(allowance('AC9E4LA01', {id: 'ac9e4la01-w-1'}), 28);
assert.equal(allowance('AC9E4LA01', {type: 'single'}), 28);
for (const code of ['AC9E4LA13', 'AC9E4LA00', 'AC9E4LE00', 'AC9E4LE06', 'AC9E4LY00', 'AC9E4LY02']) assert.equal(allowance(code), 28);
for (const code of ['AC9S4U01', 'AC9S4H02', 'AC9S4I01', 'AC9S4I06', 'AC9M4N06', 'AC9M4P02']) {
  assert.equal(allowance(code), 46);
  assert.equal(allowance(code, {marked: false}), 46);
}

// Optional line counts apply only to marked, same-code next-six self-check
// homework. All older English, unrelated resources and invalid values retain
// their original reservation. The exact production expression is evaluated.
for (const code of [...legacyCodes.slice(6), ...nextCodes]) {
  for (const count of [4, 8, 12]) assert.equal(allowance(code, {responseLines: count}), count * 9 + 10);
  for (const value of [undefined, null, 3, 13, -1, 4.5, '8', NaN, Infinity, true]) assert.equal(allowance(code, {responseLines: value}), 46);
  assert.equal(allowance(code, {responseLines: 8, marked: false}), 28);
  assert.equal(allowance(code, {responseLines: 8, marked: 'false'}), 28);
  assert.equal(allowance(code, {responseLines: 8, marked: 'yes'}), 28);
  assert.equal(allowance(code, {responseLines: 8, id: `${code.toLowerCase()}-w-1`}), 28);
  assert.equal(allowance(code, {responseLines: 8, itemCode: 'AC9E4LA01'}), 28);
  assert.equal(allowance(code, {responseLines: 8, id: `${code.toLowerCase()}-p-001`}), 28);
  assert.equal(allowance(code, {responseLines: 8, type: 'single'}), 28);
}
for (const code of ['AC9E4LA01','AC9E4LA02','AC9E4LA03','AC9E4LA04','AC9E4LA05','AC9E4LA06','AC9S4I06','AC9M4N06']) assert.equal(allowance(code, {responseLines: 8}), 46);
for (const code of ['AC9E4LA13','AC9E4LE06','AC9E4LY02']) assert.equal(allowance(code, {responseLines: 8}), 28);

// Execute the full actual production selector. Only the marked, exact dedicated
// LE05 linked sequence may bypass shuffling; controls must call the legacy path.
const selector = pdf.match(/function getPrintableQuestions\(\) \{[\s\S]*?(?=\n  function setText)/)?.[0];
assert(selector, 'Production worksheet selector changed: review its full regression.');
function selectionCase({code = 'AC9E4LE05', configCode = code, marker = 'true', limit = 8,
  poolSize = 8, dedicated = true, itemCode = code, type = 'self-check', wrongId = false,
  foreignPool = false, splitSelection = false} = {}, keepOrder = false) {
  const bank = Array.from({length: poolSize}, (_, i) => ({id: `${code.toLowerCase()}-w-${String(i + 1).padStart(3, '0')}`, curriculumCode: itemCode, type}));
  if (wrongId) bank[0].id = `${code.toLowerCase()}-p-001`;
  const pool = foreignPool ? bank.map(q => ({...q})) : bank;
  let shuffled = 0;
  const context = {window: {quizConfig: {skillCode: configCode === 'absent' ? undefined : configCode,
      worksheetPracticeSelection: splitSelection ? 4 : 0, worksheetExamSelection: splitSelection ? 4 : 0},
    skillrWorksheetQuestions: dedicated ? bank : undefined},
    document: {body: {getAttribute: () => marker === 'absent' ? undefined : marker}}, WORKSHEET_LIMIT: limit,
    getSkillCode: () => code, getWorksheetQuestionBank: () => pool,
    getGlobalQuestionArray: name => splitSelection && name === 'skillrPracticeQuestions' ? bank.slice(0, 4)
      : splitSelection && name === 'skillrExamQuestions' ? bank.slice(4) : [],
    uniqueQuestions: rows => [...new Set(rows)], isPaperFriendly: () => true,
    shuffleArray: rows => { shuffled++; return [...rows].reverse(); }};
  const chosen = vm.runInNewContext(`${selector}\ngetPrintableQuestions()`, context);
  assert.equal(shuffled, keepOrder ? 0 : splitSelection ? 2 : 1, JSON.stringify({code, marker, limit, poolSize, dedicated, itemCode, type, wrongId, foreignPool, splitSelection}));
  if (keepOrder) { assert.deepEqual([...chosen], bank); assert.notEqual(chosen, bank); }
  checks++;
}
selectionCase({}, true);
for (const code of authoredCodes.filter(code => code !== 'AC9E4LE05').concat(['AC9E4LE06','AC9E4LY02','AC9S4I01','AC9M4N06'])) selectionCase({code});
for (const marker of [null, 'absent', '', 'false', 'yes']) selectionCase({marker});
for (const limit of [4, 7, 9]) selectionCase({limit});
for (const poolSize of [7, 9]) selectionCase({poolSize});
for (const configCode of ['AC9E4LE04', 'absent', '']) selectionCase({configCode});
for (const options of [{dedicated: false}, {itemCode: 'AC9E4LE04'}, {type: 'single'}, {wrongId: true}, {foreignPool: true}, {splitSelection: true}]) selectionCase(options);

console.log(JSON.stringify({status: 'PASS', checks, scope: 'LA01–LA12, LE01–LE05 and LY01 marked authored guards, legacy control paths, actual runtime cleanup/node retention, production PDF workspace allocation; no browser or PDF render claim'}, null, 2));
