import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const root = new URL('../', import.meta.url);
const adapter = fs.readFileSync(new URL('quiz/year-4/math/reviewed-number-visuals.js', root), 'utf8');
const version = '20260908-year4-final-eight';
const codes = [
  ...Array.from({length: 9}, (_, n) => `ac9m4n0${n + 1}`),
  'ac9m4a01', 'ac9m4a02',
  ...Array.from({length: 4}, (_, n) => `ac9m4m0${n + 1}`),
  'ac9m4sp01', 'ac9m4sp02', 'ac9m4sp03',
  'ac9m4st01', 'ac9m4st02', 'ac9m4st03', 'ac9m4p01', 'ac9m4p02'
];
const question = (id, file) => ({id, question: 'Which fraction is marked?', answers: ['3/4', '1/4', '1/2', '1'], correct: 0, explanation: 'Three of four equal intervals.\nHint: Count intervals.', visualMeta: {type: 'svg', asset_path: `/assets/assessment-visuals/year4/math/ac9m4n04/${file}.svg#model`, alt_text: 'Four equal intervals with the third marked.'}});
const first = question('ac9m4n04-p-001', 'one');
const second = question('ac9m4n04-p-002', 'two');
const response = q => ({questionId: q.id, question: q.question, correctAnswer: q.gradingMode === 'adult-review' ? q.modelAnswer : q.answers[q.correct], explanation: q.explanation});
const current = answers => ({bankVersion: version, answers});
function render(bank, result, route = '/quiz/year-4/math/ac9m4n04/practice/review/', options = {}) {
  const models = [];
  let callback;
  const cards = (result?.answers || [{}]).map(() => ({querySelector: selector => selector === 'h2' ? (options.missingHeading ? null : {after: svg => models.push(svg)}) : selector === '.reviewed-number-model' && options.existingModel ? {} : null}));
  const document = {
    body: {dataset: {resultKey: 'result', bankVersion: options.pageVersion ?? version}},
    addEventListener: (_, fn) => {callback = fn;},
    querySelectorAll: () => cards,
    createElementNS: (_, tag) => ({tag, attributes: {}, children: [], style: {}, classList: {add() {}}, setAttribute(k, v) {this.attributes[k] = v;}, appendChild(el) {this.children.push(el);}})
  };
  vm.runInNewContext(adapter, {window: {quizQuestions: bank}, location: {pathname: route}, document, sessionStorage: {getItem: () => typeof result === 'string' ? result : JSON.stringify(result)}});
  callback();
  return models;
}
assert.equal(render([first, second], current([response(second)]))[0].children[0].attributes.href, second.visualMeta.asset_path, 'Duplicate prompts must use the saved question ID');
assert.equal(render([first], current([{...response(first), questionId: 'unknown'}])).length, 0, 'A prompt match cannot replace a missing saved ID');
assert.equal(render([first], {bankVersion: 'older', answers: [response(first)]}).length, 0, 'Do not illustrate a historical bank with current models');
assert.equal(render([first], current([response(first)]), undefined, {pageVersion: ''}).length, 0, 'Require an explicit page bank version');
for (const changed of [{question: 'An older prompt'}, {correctAnswer: '1/2'}, {explanation: 'An older explanation'}]) {
  assert.equal(render([first], current([{...response(first), ...changed}])).length, 0, 'Do not reuse a model for changed saved content');
}
for (const source of [
  '/assets/assessment-visuals/year4/math/ac9m4n05/one.svg#model',
  'https://example.com/one.svg#model',
  '//example.com/one.svg#model',
  '/assets/assessment-visuals/year4/math/ac9m4n04/../secret.svg#model',
  '/assets/assessment-visuals/year4/math/ac9m4n04/%2e%2e/secret.svg#model',
  '/assets/assessment-visuals/year4/math/ac9m4n04-model.svg',
  '/assets/assessment-visuals/year4/math/ac9m4n04-model.svg?other=1#model'
]) {
  const q = {...first, visualMeta: {...first.visualMeta, asset_path: source}};
  assert.equal(render([q], current([response(q)])).length, 0, `Reject unrelated, external or malformed model: ${source}`);
}
for (const result of [null, '{broken', {}, {bankVersion: version, answers: null}]) assert.equal(render([first], result).length, 0);
assert.equal(render(null, current([response(first)])).length, 0);
assert.equal(render([{...first, visualMeta: {type: 'none'}}], current([response(first)])).length, 0);
assert.equal(render([first], current([response(first)]), undefined, {missingHeading: true}).length, 0);
assert.equal(render([first], current([response(first)]), undefined, {existingModel: true}).length, 0, 'Do not append duplicate review models');
assert.equal(render([first], current([response(first)]), '/quiz/year-4/math/ac9m4n06/practice/review/').length, 0, 'Route code must isolate its own visual paths');

// All 23 currently authorised Year 4 Maths codes, including the previously released A02/M01–M04.
for (const code of codes) {
  const q = {...first, id: `${code}-p-001`, visualMeta: {...first.visualMeta, asset_path: `/assets/assessment-visuals/year4/math/${code}/model.svg#model`}};
  assert.equal(render([q], current([response(q)]), `/quiz/year-4/math/${code}/practice/review/`).length, 1, `${code}: retain the matching in-scope model`);
}
for (const code of ['ac9m4n10', 'ac9m4a03', 'ac9m4m05', 'ac9m4sp04', 'ac9m4st04', 'ac9m4p03', 'ac9m5sp01']) {
  const q = {...first, id: `${code}-p-001`, visualMeta: {...first.visualMeta, asset_path: `/assets/assessment-visuals/year4/math/${code}/model.svg#model`}};
  assert.equal(render([q], current([response(q)]), `/quiz/year-4/math/${code}/practice/review/`).length, 0, `${code}: reject beyond authorised scope`);
}

// Exercise the actual final-eight published questions: native root SVGs and sprite symbols.
let actualModels = 0;
const kinds = new Set();
for (const code of codes.slice(-8)) {
  const path = `quiz/year-4/math/${code}/practice/questions.js`;
  const context = {window: {}};
  vm.runInNewContext(fs.readFileSync(new URL(path, root), 'utf8'), context);
  const bank = context.window.skillrPracticeQuestions;
  const q = bank.find(item => item.visualMeta?.type === 'svg');
  assert.ok(q, `${code}: an actual visual fixture is required`);
  const [asset, fragment] = q.visualMeta.asset_path.split('#');
  const svg = fs.readFileSync(new URL(asset.slice(1), root), 'utf8');
  assert.match(svg, new RegExp(`id=["']${fragment}["']`), `${code}: published fragment exists`);
  kinds.add(/<svg\b[^>]*\bid=["']model["']/.test(svg) ? 'native' : 'sprite');
  for (const mode of ['practice', 'test']) {
    const route = `/quiz/year-4/math/${code}/${mode}/review/`;
    const rendered = render(bank, current([response(q)]), route);
    assert.equal(rendered.length, 1, `${code}/${mode}: actual saved model renders`);
    assert.equal(rendered[0].children[0].attributes.href, q.visualMeta.asset_path);
    assert.equal(rendered[0].attributes['aria-label'], q.visualMeta.alt_text);
    for (const changed of [{correctAnswer: 'Changed answer'}, {question: 'Changed prompt'}, {explanation: 'Changed explanation'}]) assert.equal(render(bank, current([{...response(q), ...changed}]), route).length, 0, `${code}/${mode}: reject changed identity`);
    assert.equal(render(bank, {bankVersion: 'previous-batch', answers: [response(q)]}, route).length, 0, `${code}/${mode}: reject stale version`);
    const wrong = {...q, visualMeta: {...q.visualMeta, asset_path: '/assets/assessment-visuals/year4/math/ac9m4n04.svg#model'}};
    assert.equal(render([wrong], current([response(wrong)]), route).length, 0, `${code}/${mode}: reject another code's sprite`);
    const external = {...q, visualMeta: {...q.visualMeta, asset_path: 'https://example.com/model.svg#model'}};
    assert.equal(render([external], current([response(external)]), route).length, 0, `${code}/${mode}: reject external SVG`);
  }
  actualModels++;
}
assert.deepEqual([...kinds].sort(), ['native', 'sprite'], 'Both current SVG delivery formats must be exercised');

// Adult-review models compare the saved model answer, not an absent multiple-choice key.
const adult = {...first, answers: [], gradingMode: 'adult-review', modelAnswer: 'Draw matching halves.'};
assert.equal(render([adult], current([response(adult)])).length, 1);
assert.equal(render([adult], current([{...response(adult), correctAnswer: 'An older rubric'}])).length, 0);
console.log(`PASS Year 4 saved review models: ${codes.length} authorised codes; ${actualModels} actual final-eight native/sprite fixtures; identity/version/answer/explanation, adult rubric and source-isolation regression checks.`);
