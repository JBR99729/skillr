import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { execFileSync } from 'node:child_process';

// Scoped publisher: retain the established Science runtime schema and all IDs.
// Source review is a prerequisite; the switch is intentionally explicit.
if (!process.argv.includes('--reviewed')) throw new Error('Requires --reviewed after the documented source/content review.');
const root = path.resolve(import.meta.dirname, '..');
const version = '20260907-science-final-three-v1';
for (const suffix of ['i04', 'i05', 'i06']) {
  const code = `ac9s3${suffix}`;
  const sourcePath = `assets/assessment-banks/year3/science/${code}.json`;
  execFileSync(process.execPath, ['scripts/validate_production_question_bank.mjs', sourcePath], { cwd: root, stdio: 'inherit' });
  const source = JSON.parse(fs.readFileSync(path.join(root, sourcePath), 'utf8'));
  for (const bank of ['practice', 'test']) {
    const directory = path.join(root, 'quiz/year-3/science', code, bank);
    const file = path.join(directory, 'questions.js');
    const global = bank === 'practice' ? 'skillrPracticeQuestions' : 'skillrTestQuestions';
    const context = { window: {} };
    vm.runInNewContext(fs.readFileSync(file, 'utf8'), context);
    const existing = context.window[global];
    if (bank === 'test') existing.forEach(q => { delete q.stage; });
    const selected = source.filter(q => q.bank === bank);
    const byId = new Map(existing.map(q => [q.id, q]));
    if (existing.some(q => !selected.some(s => s.id === q.id))) throw new Error(`${code}: an existing ID would be lost`);
    const output = selected.map(q => ({
      ...(byId.get(q.id) || existing[0]),
      id: q.id, curriculumCode: q.curriculum_code, bank: q.bank,
      skill: q.skill, printable: q.printable, type: q.type,
      question: q.question, audioPrompt: q.audio_prompt,
      visual: q.visual.alt_text || '', visualHtml: q.visualHtml || '', visualMeta: q.visual,
      answers: q.answers.map(a => a.text), correct: q.correct_index,
      explanation: `${q.explanation.summary}\nHint: ${q.explanation.hint}`,
      structuredExplanation: q.explanation, ...(bank === 'practice' ? { stage: q.stage } : {}),
      difficulty: q.difficulty, difficultyTier: q.difficultyTier, sequencePriority: q.sequencePriority
    }));
    const js = `"use strict";\nwindow.${global} = ${JSON.stringify(output, null, 2)};\n`;
    fs.writeFileSync(file, js);
    if (bank === 'practice') fs.writeFileSync(path.join(directory, 'practice-questions.js'), js);
    const htmlPath = path.join(directory, 'index.html');
    const html = fs.readFileSync(htmlPath, 'utf8');
    if (/experience-teacher-questions\.js/.test(html)) throw new Error(`${code}: legacy override is loaded`);
    const pattern = new RegExp(`(${code}/${bank}/questions\\.js)(?:\\?[^"']*)?`);
    if (!pattern.test(html)) throw new Error(`${code}: expected bank script not found`);
    fs.writeFileSync(htmlPath, html.replace(pattern, `$1?v=${version}`));
  }
  // AGENTS.md requires recording immediately after specialised publication.
  execFileSync(process.execPath, ['scripts/update_content_verification_status.mjs', '--record', code.toUpperCase()], { cwd: root, stdio: 'inherit' });
}
