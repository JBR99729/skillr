import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const root = new URL('../../', import.meta.url);
const source = name => fs.readFileSync(new URL(name, root), 'utf8');
const renderer = source('assets/year2-science-quiz-page.js');
const loader = source('assets/year2-science-bank-loader.js');

function render(pathname) {
  const loads = [];
  const document = {
    title: 'Authored page',
    body: {innerHTML: '<main>Authored content</main>', appendChild: node => loads.push(node.src)},
    createElement: () => ({src: ''}),
  };
  const window = {};
  vm.runInNewContext(renderer, {document, window, location: {pathname}});
  return {document, window, loads};
}

test('legacy renderer leaves every current Year 2 Science activity mode intact', () => {
  for (const code of ['ac9s2u01','ac9s2u02','ac9s2u03','ac9s2h01','ac9s2i01','ac9s2i02','ac9s2i03','ac9s2i04','ac9s2i05','ac9s2i06']) {
    for (const mode of ['practice','test','worksheet']) {
      const result = render(`/quiz/year-2/science/${code}/${mode}/`);
      assert.equal(result.document.body.innerHTML, '<main>Authored content</main>');
      assert.equal(result.document.title, 'Authored page');
      assert.deepEqual(result.loads, []);
      assert.equal(result.window.quizConfig, undefined);
    }
  }
});

test('legacy extra quiz still renders and retains its own bank and storage identity', () => {
  const result = render('/quiz/year-2/science/ac9s2i01/quiz/');
  assert.match(result.document.body.innerHTML, /Start quiz/);
  assert.equal(result.window.skillrYear2ScienceBankConfig.bank, 'quiz');
  assert.equal(result.window.quizConfig.storageKey, 'AC9S2I01QuizBest');
  assert.equal(result.window.quizConfig.maxQuestions, 5);
  assert.equal(result.loads.length, 1);
});

test('authored reviewed and production banks survive a later legacy loader', () => {
  for (const qualitySchema of ['production-v2','skillr-reviewed-y2-science-v2']) {
    const authored = [{id:'authored-1', qualitySchema}];
    const old = [{id:'legacy-1'}];
    const window = {
      quizQuestions: authored,
      skillrYear2ScienceBankConfig: {code:'AC9S2I01',bank:'test'},
      SkillrYear2ScienceBanks: {AC9S2I01:{test:old}},
    };
    vm.runInNewContext(loader, {window});
    assert.equal(window.quizQuestions, authored);
  }
});

test('legacy routes without an authored bank still load their selected questions', () => {
  for (const bank of ['practice','test','quiz']) {
    const questions = [{id:bank+'-1'}];
    const window = {
      skillrYear2ScienceBankConfig: {code:'AC9S2I01',bank},
      SkillrYear2ScienceBanks: {AC9S2I01:{[bank]:questions}},
    };
    vm.runInNewContext(loader, {window});
    assert.equal(window.quizQuestions, questions);
  }
});

test('real AC9S2I01 production Practice and Test banks retain all authored questions', () => {
  for (const [mode,count] of [['practice',24],['test',16]]) {
    const window = {};
    vm.runInNewContext(source(`quiz/year-2/science/ac9s2i01/${mode}/questions.js`), {window});
    const authored = window.quizQuestions;
    assert.equal(authored.length, count);
    window.skillrYear2ScienceBankConfig = {code:'AC9S2I01',bank:mode};
    window.SkillrYear2ScienceBanks = {AC9S2I01:{[mode]:[{id:'older-bank'}]}};
    vm.runInNewContext(loader, {window});
    assert.equal(window.quizQuestions, authored);
    assert.equal(window.quizQuestions.length, count);
  }
});
