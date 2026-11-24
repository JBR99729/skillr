#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT = fileURLToPath(import.meta.url);
const ROOT = path.join(path.dirname(SCRIPT), '..');
const readJson = (name) => JSON.parse(fs.readFileSync(path.join(ROOT, 'data', name), 'utf8'));
const { pages } = readJson('us-ccss-disclosure-references.json');
const population = readJson('us-ccss-experiment-20261123.json').population;
// Also preserve the existing Year 6 no-visual comparison guides.
const visualComparisonCodes = ['AC9M6N02', 'AC9M6N04'];
const protectedCodes = new Set([...population.map(({ code }) => code), ...visualComparisonCodes]);
const protectedPaths = new Set(population.map(({ path }) => path));
const references = new Map();
const paths = new Set();
const START = '<!-- skillr-us-ccss-disclosure:start -->';
const END = '<!-- skillr-us-ccss-disclosure:end -->';
const MARKED = /<!-- skillr-us-ccss-disclosure:start -->[\s\S]*?<!-- skillr-us-ccss-disclosure:end -->/g;
const USA_ROW = /<tr><th scope="row">United States \(USA\)<\/th><td>[\s\S]*?<\/td><td>([\s\S]*?)<\/td><\/tr>/g;
const ALLOWED_DISCLOSURES = /^(?:curriculum-equivalents|official-references|resource-review-AC9[ME][A-Z0-9]+)$/;
const MATH = /^(?:K|[1-8])\.[A-Z]+\.[A-Z]\.\d+(?:\.[a-z])?$/;
const ENGLISH = /^[A-Z]+\.(?:K|[1-9]|1[0-2])\.\d+(?:\.[a-z])?$/;
const escapeHtml = (value) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');

for (const page of pages) {
  const { code, path: file, disclosure_id: id } = page;
  if (!/^AC9[ME](?:F|10|[1-9])[A-Z]+\d{2}$/.test(code) ||
    !/^(?:foundation|year(?:10|[1-9]))\/(?:maths|english)\/[a-z0-9-]+\/index\.html$/.test(file) ||
    !file.split('/')[2].startsWith(code.toLowerCase() + '-') ||
    !ALLOWED_DISCLOSURES.test(id) || (id.startsWith('resource-review-') && id !== 'resource-review-' + code) ||
    references.has(code) || paths.has(file) || protectedCodes.has(code) || protectedPaths.has(file)) {
    throw new Error(`Invalid, duplicate, or protected curriculum page: ${code} (${file})`);
  }
  if (!page.references.length || new Set(page.references.map((row) => row.code)).size !== page.references.length)
    throw new Error(`${code}: missing or duplicate US references`);
  for (const row of page.references) {
    const math = code.startsWith('AC9M');
    const expected = 'https://www.thecorestandards.org/' + (math ? 'Math/Content/' : 'ELA-Literacy/') + row.code.replaceAll('.', '/') + '/';
    if (!(math ? MATH : ENGLISH).test(row.code) || row.source !== expected || !row.lesson_evidence.trim() || !row.overlap.trim())
      throw new Error(`${code}: invalid official reference ${row.code}`);
  }
  references.set(code, page);
  paths.add(file);
}

function render(page) {
  const links = page.references.map(({ code, source }) => {
    // The grade is from the US standard, not from the Australian topic.
    // Maths encodes it first; English encodes it after the strand.
    const grade = code.split('.')[page.code.startsWith('AC9E') ? 1 : 0];
    const label = `US ${grade === 'K' ? 'Kindergarten' : `Grade ${grade}`}: ${code}`;
    return `<a href="${escapeHtml(source)}" rel="nofollow noopener">${escapeHtml(label)}</a>`;
  }).join('; ');
  return `${START}<p>This skill also relates to similar expectations in the US Common Core (${links}). Sequences and wording differ between curricula.</p>${END}`;
}

// Reused by the general equivalents generator when an allowlisted page owns an
// existing table. Do not add an exact row to experiment pages or duplicate a
// reference that already belongs in one of the other disclosures.
export function renderCcssTableCell(code) {
  const page = references.get(code);
  return page?.disclosure_id === 'curriculum-equivalents' ? render(page) : null;
}

function locateDisclosure(html, id) {
  // Preserve offsets when ignoring archived HTML in comments.
  const active = html.replace(/<!--[\s\S]*?-->/g, (comment) => ' '.repeat(comment.length));
  const tags = /<details\b[^>]*>|<\/details\s*>/gi;
  const idAttribute = new RegExp(`\\sid=(?:"${id}"|'${id}')(?=[\\s>])`);
  const open = [...active.matchAll(tags)].filter((tag) => idAttribute.test(tag[0]));
  if (open.length !== 1 || /\sopen(?:[=>\s])/i.test(open[0][0])) throw new Error(`Expected one live collapsed details#${id}`);
  const offset = open[0].index;
  tags.lastIndex = offset;
  let depth = 0;
  for (let tag = tags.exec(active); tag; tag = tags.exec(active)) {
    depth += tag[0].startsWith('</') ? -1 : 1;
    if (!depth) return [offset, tags.lastIndex];
  }
  throw new Error(`Unclosed details#${id}`);
}

function apply(html, page) {
  const id = page.disclosure_id;
  const [start, end] = locateDisclosure(html, id);
  const old = html.slice(start, end);
  const count = (s, token) => s.split(token).length - 1;
  if (count(html, START) > 1 || count(html, START) !== count(html, END) || count(html, START) !== count(old, START))
    throw new Error(`${page.code}: duplicate, incomplete or misplaced CCSS reference block`);
  const lesson = html.replace(/<!--[\s\S]*?-->|<script\b[\s\S]*?<\/script>/gi, '');
  const plain = lesson.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  for (const { lesson_evidence: evidence } of page.references) {
    if (!plain.includes(evidence)) throw new Error(`${page.code}: missing reviewed lesson evidence: ${evidence}`);
  }
  const block = render(page);
  let updated;
  if (id === 'curriculum-equivalents') {
    if ([...old.matchAll(USA_ROW)].length !== 1) throw new Error(`${page.code}: missing or duplicate US table row`);
    updated = old.replace(USA_ROW, (row, oldCell) => row.slice(0, row.length - '</td></tr>'.length - oldCell.length) + block + '</td></tr>');
  } else {
    const clean = old.replace(MARKED, '');
    const close = id.startsWith('resource-review-') ? /<\/div>\s*<\/details\s*>$/i : /<\/details\s*>$/i;
    if (!close.test(clean)) throw new Error(`${page.code}: unexpected disclosure body layout`);
    updated = clean.replace(close, (tail) => block + tail);
  }
  return html.slice(0, start) + updated + html.slice(end);
}

function swapOriginalRegion(html, before, page) {
  const id = page.disclosure_id;
  if (id !== 'curriculum-equivalents') return html.replace(MARKED, '');
  const [start, end] = locateDisclosure(html, id);
  const [beforeStart, beforeEnd] = locateDisclosure(before, id);
  const originalRow = [...before.slice(beforeStart, beforeEnd).matchAll(USA_ROW)][0]?.[0];
  if (!originalRow) throw new Error(`${page.code}: missing original US table row`);
  return html.slice(0, start) + html.slice(start, end).replace(USA_ROW, () => originalRow) + html.slice(end);
}

function git(args) {
  return execFileSync('git', args, { cwd: ROOT, encoding: 'utf8' });
}

function checkScope(base) {
  const bootstrapFiles = new Set([
    'data/us-ccss-disclosure-references.json',
    'docs/US_CCSS_DISCLOSURE_REFERENCES.md',
    'scripts/apply_us_ccss_disclosure_references.mjs',
    'scripts/apply_curriculum_equivalents.mjs',
  ]);
  for (const changed of git(['diff', '--name-status', base, '--']).trim().split('\n').filter(Boolean)) {
    const [type, file] = changed.split('\t');
    if (!['A', 'M'].includes(type) || !(paths.has(file) || bootstrapFiles.has(file)) || protectedPaths.has(file) || visualComparisonCodes.some((code) => file.includes('/' + code.toLowerCase() + '-')))
      throw new Error(`Unexpected scope change: ${changed}`);
  }
  for (const page of pages) {
    const before = git(['show', `${base}:${page.path}`]);
    const after = fs.readFileSync(path.join(ROOT, page.path), 'utf8');
    if (swapOriginalRegion(after, before, page) !== before) throw new Error(`${page.code}: changes outside the approved disclosure region`);
  }
  console.log(`Scope verified against ${base}; all ${population.length} CCSS experiment pages and ${visualComparisonCodes.length} Year 6 visual comparisons unchanged.`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === SCRIPT) {
  const args = process.argv.slice(2);
  const baseIndex = args.indexOf('--verify-base');
  if (baseIndex !== -1 && (!args[baseIndex + 1] || args[baseIndex + 1].startsWith('-')))
    throw new Error('Provide a Git ref after --verify-base');
  const write = args.includes('--write');
  if (write && args.includes('--check')) throw new Error('Choose --write or --check, not both');
  const plan = pages.map((page) => {
    const file = path.join(ROOT, page.path);
    const original = fs.readFileSync(file, 'utf8');
    const updated = apply(original, page);
    return { file, original, updated };
  });
  const changed = plan.filter(({ original, updated }) => original !== updated);
  if (write) for (const { file, updated } of changed) fs.writeFileSync(file, updated);
  if (!write && changed.length) throw new Error(`${changed.length} pages need the reviewed disclosure patch; use --write`);
  if (baseIndex !== -1) checkScope(args[baseIndex + 1]);
  console.log(`${pages.length} topic guides and ${pages.reduce((n, page) => n + page.references.length, 0)} partial, source-linked references; ${write ? changed.length + ' updated' : 'idempotent'}.`);
}
