#!/usr/bin/env node
// Production PDF QA, not a replacement renderer or a content-approval gate.
// Usage: node scripts/validate_year4_english_la01_pdf.mjs <jspdf-umd> <linkedom-worker> <scratch-output-dir> [AC9E4LA01–LA12 | AC9E4LE01–LE05 | AC9E4LY01]
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';
import {pathToFileURL} from 'node:url';
import {createRequire} from 'node:module';
import {resolveObjectURL} from 'node:buffer';

const root = path.resolve(import.meta.dirname, '..');
const [jspdfPath, domPath, outputDir, code = 'AC9E4LA01'] = process.argv.slice(2);
assert(/^AC9E4(?:LA(?:0[1-9]|1[0-2])|LE0[1-5]|LY01)$/.test(code), 'Only authored LA01–LA12, LE01–LE05 and LY01 supported.');
const slug = code.toLowerCase();
assert(jspdfPath && domPath && outputDir, 'Supply jsPDF, linkedom worker and scratch output directory.');
const {DOMParser} = await import(pathToFileURL(path.resolve(domPath)));
const pagePath = `quiz/year-4/english/${slug}/worksheet/index.html`;
const bankPath = `quiz/year-4/english/${slug}/worksheet/worksheet-questions.js`;
const sourcePath = 'quiz/assets/worksheet-pdf.js';
const html = fs.readFileSync(path.join(root, pagePath), 'utf8');
const document = new DOMParser().parseFromString(html, 'text/html');
Object.defineProperty(document, 'readyState', {value: 'loading'});
assert.equal(document.body.getAttribute('data-skillr-authored-worksheet'), 'true');
const failures = [];
const rasterRecords = [];
let canvasBackend;
// Optional real native canvas dependency, required only for visual worksheets.
// PDF_CANVAS_PATH can point to an installed @napi-rs/canvas package. Production
// printableSvg/rasteriseSvg remain unchanged and receive browser-like APIs.
async function installRasterBackend() {
  const require = createRequire(import.meta.url);
  const candidates = [process.env.PDF_CANVAS_PATH,
    process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES && path.join(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES, '@napi-rs/canvas'),
    '@napi-rs/canvas'].filter(Boolean);
  let native;
  const errors = [];
  for (const candidate of candidates) {
    try { native = require(candidate); canvasBackend = candidate; break; }
    catch (error) { errors.push(`${candidate}: ${error.code || error.message}`); }
  }
  assert(native?.createCanvas && native?.loadImage, `Real SVG raster backend required; install @napi-rs/canvas or set PDF_CANVAS_PATH. ${errors.join('; ')}`);
  const {createCanvas, loadImage} = native;
  class BrowserImage {
    set src(value) {
      this.source = value;
      Promise.resolve().then(async () => {
        const blob = resolveObjectURL(value);
        assert(blob, 'Production Image must receive its actual Blob URL');
        this.decoded = await loadImage(Buffer.from(await blob.arrayBuffer()));
        this.naturalWidth = this.decoded.naturalWidth;
        this.naturalHeight = this.decoded.naturalHeight;
        assert(this.naturalWidth > 0 && this.naturalHeight > 0, 'SVG has no rendered dimensions');
        this.onload?.();
      }).catch(error => { this.error = error; this.onerror?.(error); });
    }
    get src() { return this.source; }
  }
  context.Image = BrowserImage;
  context.XMLSerializer = class { serializeToString(node) { return node.toString(); } };
  const createElement = document.createElement.bind(document);
  document.createElement = name => {
    if (String(name).toLowerCase() !== 'canvas') return createElement(name);
    const canvas = createCanvas(1, 1);
    const ctx = canvas.getContext('2d');
    const draw = ctx.drawImage.bind(ctx);
    ctx.drawImage = (picture, ...args) => draw(picture.decoded || picture, ...args);
    const toDataURL = canvas.toDataURL.bind(canvas);
    canvas.toDataURL = type => {
      const data = toDataURL(type);
      const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let nonWhitePixels = 0;
      for (let i = 0; i < pixels.length; i += 4) {
        if (pixels[i + 3] && (pixels[i] < 245 || pixels[i + 1] < 245 || pixels[i + 2] < 245)) nonWhitePixels++;
      }
      assert(nonWhitePixels > 0, 'SVG raster is blank; do not substitute a blank image');
      const bytes = Buffer.from(data.split(',')[1], 'base64');
      rasterRecords.push({width: canvas.width, height: canvas.height, nonWhitePixels,
        sha256: crypto.createHash('sha256').update(bytes).digest('hex')});
      return data;
    };
    return canvas;
  };
  return {createCanvas, loadImage};
}
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
  return {ok: true, text: async () => bytes.toString('utf8'), blob: async () => new Blob([bytes]),
    arrayBuffer: async () => bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength)};
};
vm.createContext(context);
const configScripts = [...document.querySelectorAll('script:not([src])')].filter(s => s.textContent.includes('window.quizConfig'));
assert.equal(configScripts.length, 1, 'One actual page configuration required');
vm.runInContext(configScripts[0].textContent, context);
assert.equal(context.quizConfig.skillCode, code);
assert.equal(context.quizConfig.worksheetQuestionLimit, 8);
const bankSource = fs.readFileSync(path.join(root, bankPath), 'utf8');
vm.runInContext(bankSource, context);
assert.equal(context.skillrWorksheetQuestions.length, 8);
assert.equal(new Set(context.skillrWorksheetQuestions.map(q => q.id)).size, 8);
assert(context.skillrWorksheetQuestions.every(q => q.type === 'self-check' && q.curriculumCode === code));
const visualTasks = context.skillrWorksheetQuestions.filter(q => q.visualHtml || q.image);
assert(visualTasks.every(q => (q.visualHtml && /^\s*<svg\b/.test(q.visualHtml)) || /\.svg(?:[?#]|$)/i.test(q.image || '')), 'This visual harness requires actual SVG sources; unsupported image forms fail closed.');
const rasterBackend = visualTasks.length ? await installRasterBackend() : null;
vm.runInContext(fs.readFileSync(jspdfPath, 'utf8'), context);
const NativePDF = context.jspdf.jsPDF;
const results = [];
fs.mkdirSync(outputDir, {recursive: true});
context.jspdf.jsPDF = function (options) {
  const doc = new NativePDF(options), drawn = [], images = [], responseLines = {};
  let currentTask, printedStem, answerGuide = false;
  const originalLine = doc.line.bind(doc);
  doc.line = (x1, y1, x2, y2, ...rest) => {
    // Production response rules are horizontal at the writing position;
    // continuation-header and page-footer rules have fixed excluded positions.
    if (!answerGuide && printedStem && y1 === y2 && y1 !== 20 && y1 !== doc.internal.pageSize.getHeight() - 15) {
      if (!currentTask) {
        // Distinct tasks may share their first wrapped line. Identify the full
        // actually printed prompt before attributing any response rules.
        const printed = context.la01PdfQA.normaliseText(printedStem.join(' ')).replace(/\s+/g, ' ');
        const matches = context.skillrWorksheetQuestions.filter(q => printed.startsWith(context.la01PdfQA.normaliseText(q.question).replace(/\s+/g, ' ')));
        assert.equal(matches.length, 1, 'Complete printed task must uniquely match its authored worksheet prompt');
        currentTask = matches[0].id;
      }
      responseLines[currentTask] = (responseLines[currentTask] || 0) + 1;
    }
    return originalLine(x1, y1, x2, y2, ...rest);
  };
  const originalImage = doc.addImage.bind(doc);
  doc.addImage = (data, type, x, y, width, height, ...rest) => {
    const sha256 = crypto.createHash('sha256').update(Buffer.from(data.split(',')[1], 'base64')).digest('hex');
    assert(rasterRecords.some(r => r.sha256 === sha256), 'PDF image must be an actual recorded production raster');
    assert(width > 0 && height > 0 && x >= 13 && y > 0 && x + width <= doc.internal.pageSize.getWidth() - 13 && y + height < doc.internal.pageSize.getHeight(), 'Image outside page or margins');
    images.push({sha256, x, y, width, height, page: doc.internal.getCurrentPageInfo().pageNumber});
    return originalImage(data, type, x, y, width, height, ...rest);
  };
  const originalText = doc.text.bind(doc);
  doc.text = (text, x, y, opts) => {
    if (text === 'Answer guide') { answerGuide = true; currentTask = null; printedStem = null; }
    if (!answerGuide && /^\d+\. /.test(String(text)) && (!printedStem || currentTask)) {
      printedStem = [String(text).replace(/^\d+\. /, '')];
      currentTask = null;
    } else if (!answerGuide && printedStem && !(y === 17 && String(text).startsWith('SkillrHub · '))) {
      printedStem.push(String(text));
    }
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
    assert.equal(images.length, visualTasks.length, 'Every visual task must embed its actual rendered image');
    for (const task of context.skillrWorksheetQuestions) {
      const count = /^AC9E4(?:LA(?:0[7-9]|1[0-2])|LE0[1-5]|LY01)$/.test(code) && Number.isInteger(task.responseLines) && task.responseLines >= 4 && task.responseLines <= 12 ? task.responseLines : 4;
      assert.equal(responseLines[task.id], count, `Actual production response-line count: ${task.id}`);
    }
    results.push({file: output, pages: doc.getNumberOfPages(), images, responseLines, sha256: crypto.createHash('sha256').update(bytes).digest('hex'), drawn});
  };
  return doc;
};
const source = fs.readFileSync(path.join(root, sourcePath), 'utf8');
const inputHashes = Object.fromEntries([[pagePath, html], [bankPath, bankSource], [sourcePath, source],
  ['scripts/validate_year4_english_la01_pdf.mjs', fs.readFileSync(import.meta.filename, 'utf8')]]
  .map(([name, contents]) => [name, crypto.createHash('sha256').update(contents).digest('hex')]));
assert(/\}\)\(\);\s*$/.test(source));
vm.runInContext(source.replace(/\}\)\(\);\s*$/, 'window.la01PdfQA = {createPdf, downloadWorksheet, getPrintableQuestions, normaliseText, printableSvg, rasteriseSvg};})();'), context);
// Exercise the unchanged production resolver and rasteriser, including a real
// <use> expansion and missing-symbol failure, before accepting visual output.
let visualControls;
if (rasterBackend) {
  const probe = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 40"><defs><symbol id="qa-red" viewBox="0 0 50 40"><rect width="50" height="40" fill="#ff0000"/></symbol></defs><use href="#qa-red" x="0" y="0" width="50" height="40"/><rect x="50" width="50" height="40" fill="#0000ff"/></svg>';
  const resolved = await context.la01PdfQA.printableSvg(probe);
  assert(!/<use\b/.test(resolved), 'Production resolver must expand the actual symbol');
  const png = await context.la01PdfQA.rasteriseSvg(probe);
  const decoded = await rasterBackend.loadImage(Buffer.from(png.split(',')[1], 'base64'));
  const canvas = rasterBackend.createCanvas(decoded.width, decoded.height), ctx = canvas.getContext('2d');
  ctx.drawImage(decoded, 0, 0);
  assert.deepEqual([...ctx.getImageData(30, 30, 1, 1).data], [255, 0, 0, 255], 'Resolved symbol must produce real red pixels');
  assert.deepEqual([...ctx.getImageData(240, 30, 1, 1).data], [0, 0, 255, 255], 'Second shape must produce real blue pixels');
  await assert.rejects(context.la01PdfQA.rasteriseSvg('<svg xmlns="http://www.w3.org/2000/svg"><use href="#missing"/></svg>'), /missing its labelled shape/);
  visualControls = {resolvedSymbol: true, redAndBluePixels: true, missingSymbolRejected: true};
  rasterRecords.length = 0;
}
// First run uses the actual download handler, production selection and page configuration.
await context.la01PdfQA.downloadWorksheet();
assert.deepEqual(failures, []);
assert.equal(results.length, 1);
if (code === 'AC9E4LE05') {
  assert.deepEqual(Object.keys(results[0].responseLines), Array.from({length: 8}, (_, i) => `ac9e4le05-w-${String(i + 1).padStart(3, '0')}`),
    'Actual LE05 download must draw its linked plan-to-revision tasks in authored order');
}
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
const report = {status: 'PASS', scope: 'Two actual production PDFs; complete text, margins and actual SVG raster embedding where present. Every rendered page still needs independent visual review; native canvas simulation is not live browser verification.',
  canvasBackend: canvasBackend || null, visualControls: visualControls || null, rasters: rasterRecords,
  inputs: inputHashes,
  outputs: results.map(({drawn, ...r}) => r)};
fs.writeFileSync(path.join(outputDir, 'production-pdf-results.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
