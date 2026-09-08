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
let checks = 0;

// A sentinel at the first legacy data access proves controls still enter that
// path. Authored cases must return before any legacy access or DOM mutation.
function guardCase(file, route, marked, expectGuard) {
  const sentinel = new Error('legacy path reached');
  const note = {textContent: 'Original approved teaching'};
  const body = {innerHTML: 'Original eight-task worksheet', getAttribute: () => marked ? 'true' : null};
  const window = new Proxy({}, {
    get(target, key) {
      if (/^SkillrYear\d+.+Data$/.test(String(key))) throw sentinel;
      return target[key];
    },
    ownKeys() { throw sentinel; }
  });
  const context = {window, location: {pathname: route, search: ''},
    document: {body, querySelector: () => marked ? note : null}, URLSearchParams};
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
      for (const code of Array.from({length: 12}, (_, i) => `ac9e4la${String(i + 1).padStart(2, '0')}`)) {
        guardCase(file, `/quiz/year-4/english/${code}/${mode}${trailing}`, true, true);
        guardCase(file, `/quiz/year-4/english/${code}/${mode}${trailing}`, false, false);
      }
      guardCase(file, `/quiz/year-4/english/ac9e4la01/${mode}${trailing}`, false, false);
      guardCase(file, `/quiz/year-4/english/ac9e4la13/${mode}${trailing}`, true, false);
      guardCase(file, `/quiz/year-4/english/ac9e4la00/${mode}${trailing}`, true, false);
      guardCase(file, `/quiz/year-4/english/ac9e4le01/${mode}${trailing}`, true, false);
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
for (const code of Array.from({length: 12}, (_, i) => `ac9e4la${String(i + 1).padStart(2, '0')}`)) for (const mode of ['practice', 'test']) {
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
  '/quiz/year-4/english/ac9e4le01/practice/',
  '/quiz/year-4/english/ac9e4le01/test/index.html',
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
for (const absent of ['note', 'card']) {
  const document = {querySelector: selector => selector.includes('data-skillr') ? (absent === 'note' ? null : {}) : (absent === 'card' ? null : {}), addEventListener() { throw new Error('Incomplete resource must not install retention'); }};
  vm.runInNewContext(read(retention), {location: {pathname: '/quiz/year-4/english/ac9e4la01/practice/'}, document});
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
    document: {body: {getAttribute: () => marked ? 'true' : null}}
  });
  checks++; return result;
}
for (const code of Array.from({length: 12}, (_, i) => `AC9E4LA${String(i + 1).padStart(2, '0')}`)) {
  assert.equal(allowance(code), 46);
  assert.equal(allowance(code, {marked: false}), 28);
  assert.equal(allowance(code, {id: `${code.toLowerCase()}-p-001`}), 28);
}
assert.equal(allowance('AC9E4LA01', {marked: false}), 28);
assert.equal(allowance('AC9E4LA01', {itemCode: 'AC9E4LA02'}), 28);
assert.equal(allowance('AC9E4LA01', {id: 'ac9e4la01-p-001'}), 28);
assert.equal(allowance('AC9E4LA01', {id: 'ac9e4la01-w-1'}), 28);
assert.equal(allowance('AC9E4LA01', {type: 'single'}), 28);
for (const code of ['AC9E4LA13', 'AC9E4LA00', 'AC9E4LE01', 'AC9E4LY01']) assert.equal(allowance(code), 28);
for (const code of ['AC9S4U01', 'AC9S4H02', 'AC9S4I01', 'AC9S4I06', 'AC9M4N06', 'AC9M4P02']) {
  assert.equal(allowance(code), 46);
  assert.equal(allowance(code, {marked: false}), 46);
}

// Optional line counts apply only to marked, same-code next-six self-check
// homework. All older English, unrelated resources and invalid values retain
// their original reservation. The exact production expression is evaluated.
for (const code of ['AC9E4LA07','AC9E4LA08','AC9E4LA09','AC9E4LA10','AC9E4LA11','AC9E4LA12']) {
  for (const count of [4, 8, 12]) assert.equal(allowance(code, {responseLines: count}), count * 9 + 10);
  for (const value of [undefined, null, 3, 13, -1, 4.5, '8', NaN, Infinity, true]) assert.equal(allowance(code, {responseLines: value}), 46);
  assert.equal(allowance(code, {responseLines: 8, marked: false}), 28);
  assert.equal(allowance(code, {responseLines: 8, itemCode: 'AC9E4LA01'}), 28);
  assert.equal(allowance(code, {responseLines: 8, id: `${code.toLowerCase()}-p-001`}), 28);
  assert.equal(allowance(code, {responseLines: 8, type: 'single'}), 28);
}
for (const code of ['AC9E4LA01','AC9E4LA02','AC9E4LA03','AC9E4LA04','AC9E4LA05','AC9E4LA06','AC9S4I06','AC9M4N06']) assert.equal(allowance(code, {responseLines: 8}), 46);
for (const code of ['AC9E4LA13','AC9E4LE01']) assert.equal(allowance(code, {responseLines: 8}), 28);

console.log(JSON.stringify({status: 'PASS', checks, scope: 'LA01–LA12 marked authored guards, legacy control paths, actual runtime cleanup/node retention, production PDF workspace allocation; no browser or PDF render claim'}, null, 2));
