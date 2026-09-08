#!/usr/bin/env node
// Production PDF QA, not a replacement renderer or a content-approval gate.
// Usage: node scripts/validate_year4_english_la01_pdf.mjs <jspdf-umd> <linkedom-worker> <scratch-output-dir>
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';
import {pathToFileURL} from 'node:url';

const root = path.resolve(import.meta.dirname, '..');
const [jspdfPath, domPath, outputDir] = process.argv.slice(2);
assert(jspdfPath && domPath && outputDir, 'Supply jsPDF, linkedom worker and scratch output directory.');
const {DOMParser} = await import(pathToFileURL(path.resolve(domPath)));
const pagePath = 'quiz/year-4/english/ac9e4la01/worksheet/index.html';
const bankPath = 'quiz/year-4/english/ac9e4la01/worksheet/worksheet-questions.js';
const sourcePath = 'quiz/assets/worksheet-pdf.js';
const html = fs.readFileSync(path.join(root, pagePath), 'utf8');
const document = new DOMParser().parseFromString(html, 'text/html');
Object.defineProperty(document, 'readyState', {value: 'loading'});
assert.equal(document.body.getAttribute('data-skillr-authored-worksheet'), 'true');
const failures = [];
const context = {console, document, DOMParser, Blob, URL, Uint8Array, ArrayBuffer,
  navigator: {userAgent: 'SkillrHub production PDF QA'},
  atob: value => Buffer.from(value, 'base64').toString('binary'),
  btoa: value => Buffer.from(value, 'binary').toString('base64'),
  alert: message => failures.push(message)};
context.window = context;
context.self = context;
context.fetch = async url => {
  const file = path.resolve(root, String(url).replace(/^\//, ''));
  assert(file.startsWith(root + path.sep), 'Unexpected resource path');
  const bytes = fs.readFileSync(file);
  return {ok: true, arrayBuffer: async () => bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength)};
};
vm.createContext(context);
const configScripts = [...document.querySelectorAll('script:not([src])')].filter(s => s.textContent.includes('window.quizConfig'));
assert.equal(configScripts.length, 1, 'One actual page configuration required');
vm.runInContext(configScripts[0].textContent, context);
assert.equal(context.quizConfig.skillCode, 'AC9E4LA01');
assert.equal(context.quizConfig.worksheetQuestionLimit, 8);
vm.runInContext(fs.readFileSync(path.join(root, bankPath), 'utf8'), context);
assert.equal(context.skillrWorksheetQuestions.length, 8);
assert.equal(new Set(context.skillrWorksheetQuestions.map(q => q.id)).size, 8);
assert(context.skillrWorksheetQuestions.every(q => q.type === 'self-check' && q.curriculumCode === 'AC9E4LA01'));
assert(context.skillrWorksheetQuestions.every(q => !q.visualHtml), 'Add real visual rendering support before using this harness with diagrams.');
vm.runInContext(fs.readFileSync(jspdfPath, 'utf8'), context);
const NativePDF = context.jspdf.jsPDF;
const results = [];
fs.mkdirSync(outputDir, {recursive: true});
context.jspdf.jsPDF = function (options) {
  const doc = new NativePDF(options), drawn = [];
  const originalText = doc.text.bind(doc);
  doc.text = (text, x, y, opts) => {
    drawn.push({text, x, y, width: doc.getTextWidth(text), page: doc.internal.getCurrentPageInfo().pageNumber, align: opts?.align});
    return originalText(text, x, y, opts);
  };
  doc.save = filename => {
    const output = path.join(outputDir, `${results.length + 1}-${filename}`);
    const bytes = Buffer.from(doc.output('arraybuffer'));
    fs.writeFileSync(output, bytes);
    for (const line of drawn) {
      assert(line.y > 0 && line.y < doc.internal.pageSize.getHeight(), 'Text outside page');
      assert((line.align === 'right' ? line.x : line.x + line.width) <= doc.internal.pageSize.getWidth() - 13, `Text exceeds margin: ${line.text}`);
    }
    results.push({file: output, pages: doc.getNumberOfPages(), sha256: crypto.createHash('sha256').update(bytes).digest('hex'), drawn});
  };
  return doc;
};
const source = fs.readFileSync(path.join(root, sourcePath), 'utf8');
assert(/\}\)\(\);\s*$/.test(source));
vm.runInContext(source.replace(/\}\)\(\);\s*$/, 'window.la01PdfQA = {createPdf, downloadWorksheet, getPrintableQuestions, normaliseText};})();'), context);
// First run uses the actual download handler, production selection and page configuration.
await context.la01PdfQA.downloadWorksheet();
assert.deepEqual(failures, []);
assert.equal(results.length, 1);
// A second order explicitly challenges layout with the longest stems first.
await context.la01PdfQA.createPdf([...context.skillrWorksheetQuestions].sort((a, b) => b.question.length - a.question.length));
for (const record of results) {
  // Continuation headers may legitimately interrupt a paragraph across pages.
  // Exclude only the production running header/footer, never task/body text.
  const bodyLines = record.drawn.filter(x => !(x.y === 17 && String(x.text).startsWith('SkillrHub · '))
    && x.text !== 'www.skillrhub.com' && !/^Page \d+ of \d+$/.test(x.text));
  const printed = context.la01PdfQA.normaliseText(bodyLines.map(x => x.text).join(' ')).replace(/\s+/g, ' ');
  for (const task of context.skillrWorksheetQuestions) {
    for (const field of ['question', 'correct', 'explanation']) {
      const expected = context.la01PdfQA.normaliseText(task[field]).replace(/\s+/g, ' ');
      assert(expected && printed.includes(expected), `Missing complete ${field}: ${task.id}`);
    }
  }
}
const report = {status: 'PASS', scope: 'Two actual production PDFs; text completeness and margins only. Every rendered page still needs independent visual review.',
  inputs: Object.fromEntries([pagePath, bankPath, sourcePath].map(p => [p, crypto.createHash('sha256').update(fs.readFileSync(path.join(root, p))).digest('hex')])),
  outputs: results.map(({drawn, ...r}) => r)};
fs.writeFileSync(path.join(outputDir, 'production-pdf-results.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
