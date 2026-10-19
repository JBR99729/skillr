import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('../../assets/year3-maths-practice-quick-read.js', import.meta.url), 'utf8');

async function render(mode, authored) {
  const title = { textContent: 'Authored title' };
  const intro = { textContent: 'Authored introduction' };
  const notes = { innerHTML: '<h2>Authored preparation</h2>', dataset: {} };
  const authoredSection = authored ? notes : null;
  const card = {
    querySelector(selector) {
      return {
        '[data-skillr-authored-preparation="true"]': authoredSection,
        '.skillr-quiz-brandbar': {},
        '#quizTitle': title,
        '.intro-text': intro,
        '.pre-read-notes': notes
      }[selector] ?? null;
    }
  };
  const document = {
    styleSheets: [{ href: '/assets/year3-maths-visuals.css' }],
    getElementById() { return {}; },
    querySelector(selector) { return selector === '#startScreen .start-card' ? card : null; }
  };
  const sandbox = {
    window: {
      SkillrYear3MathsRegister: true,
      SkillrYear3MathsData: {
        AC9M3ST03: { title: 'Generated title', learn: 'Generated core idea', model_title: 'Model', apply_title: 'Apply', quick_visuals: [] }
      }
    },
    location: { pathname: `/quiz/year-3/math/ac9m3st03/${mode}/` },
    document,
    console,
    setTimeout
  };
  vm.runInNewContext(source, sandbox, { filename: 'year3-maths-practice-quick-read.js', timeout: 1000 });
  await new Promise(setImmediate);
  return { title, intro, notes };
}

for (const mode of ['practice', 'test']) {
  test(`authored ${mode} keeps preparation, title and introduction`, async () => {
    const { title, intro, notes } = await render(mode, true);
    assert.equal(title.textContent, 'Authored title');
    assert.equal(intro.textContent, 'Authored introduction');
    assert.equal(notes.innerHTML, '<h2>Authored preparation</h2>');
    assert.equal(notes.dataset.skillrYear3MathsQuickRead, undefined);
  });

  test(`legacy ${mode} still receives generated Quick Read notes`, async () => {
    const { title, intro, notes } = await render(mode, false);
    assert.equal(title.textContent, 'Generated title');
    assert.match(intro.textContent, /Review the 60-second visual notes/);
    assert.match(notes.innerHTML, /Generated core idea/);
    assert.equal(notes.dataset.skillrYear3MathsQuickRead, `AC9M3ST03-${mode}`);
  });
}
