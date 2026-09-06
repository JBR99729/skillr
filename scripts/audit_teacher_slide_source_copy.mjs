#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const YEAR_ROOTS = ['foundation', ...Array.from({ length: 10 }, (_, i) => `year${i + 1}`)];
const WRITE_REPORT = process.argv.includes('--write-report');

const clean = (value = '') => String(value)
  .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;|&#160;/gi, ' ')
  .replace(/&amp;/gi, '&')
  .replace(/&lt;/gi, '<')
  .replace(/&gt;/gi, '>')
  .replace(/&quot;|&#34;/gi, '"')
  .replace(/&#39;|&apos;/gi, "'")
  .replace(/\s+/g, ' ')
  .trim();

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function details(html) {
  return [...html.matchAll(/<details\b[^>]*>([\s\S]*?)<\/details>/gi)].map((match) => {
    const source = match[1];
    const heading = clean(source.match(/<summary\b[^>]*>([\s\S]*?)<\/summary>/i)?.[1]);
    return { heading, source };
  });
}

function listItems(source) {
  return [...source.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)].map((match) => clean(match[1])).filter(Boolean);
}

function articles(source) {
  return [...source.matchAll(/<article\b[^>]*>([\s\S]*?)<\/article>/gi)].map((match) => {
    const body = match[1];
    return {
      title: clean(body.match(/<h[2-4]\b[^>]*>([\s\S]*?)<\/h[2-4]>/i)?.[1]),
      text: clean(body),
    };
  }).filter((item) => item.text);
}

function qaPairs(html) {
  const pairs = [];
  for (const dl of html.matchAll(/<dl\b[^>]*>([\s\S]*?)<\/dl>/gi)) {
    const source = dl[1];
    const pattern = /<dt\b[^>]*>([\s\S]*?)<\/dt>\s*<dd\b[^>]*>([\s\S]*?)<\/dd>/gi;
    for (const pair of source.matchAll(pattern)) {
      const question = clean(pair[1]);
      const answer = clean(pair[2]);
      if (question && answer) pairs.push({ question, answer, source: 'dt/dd' });
    }
  }
  for (const section of details(html)) {
    const question = clean(section.source.match(/<strong\b[^>]*>\s*(?:Quick check|Question)\s*:\s*<\/strong>\s*([\s\S]*?)(?=<\/p>)/i)?.[1]);
    const answer = clean(section.source.match(/<strong\b[^>]*>\s*(?:Expected response|Answer|Model answer)\s*:\s*<\/strong>\s*([\s\S]*?)(?=<\/p>)/i)?.[1]);
    if (question && answer) pairs.push({ question, answer, source: 'labelled pair' });
  }
  return pairs;
}

function inspect(file) {
  const html = fs.readFileSync(file, 'utf8');
  const code = html.match(/\bAC9[A-Z0-9]{5,12}\b/i)?.[0]?.toUpperCase() || '';
  const title = clean(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1])
    || clean(html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1]);
  const sections = details(html);
  const curriculumSections = sections.filter((item) => /curriculum (?:alignment|coverage)|coverage (?:and|&) elaborations|official curriculum/i.test(item.heading));
  const curriculumItems = curriculumSections.flatMap((item) => listItems(item.source));
  const description = curriculumItems.find((item) => /^(?:content description|curriculum description)\s*:/i.test(item))
    || clean(curriculumSections[0]?.source);
  const elaborations = curriculumItems.filter((item) => /^(?:E\d+|Elaboration\s*\d*)\s*:/i.test(item));
  const elaborationSections = curriculumSections.filter((item) => /elaboration/i.test(item.heading));
  const learningSections = sections.filter((item) => /learning goal|what students learn|learning intention|success looks/i.test(item.heading));
  const exampleSections = sections.filter((item) => /worked|modelled|example/i.test(item.heading));
  const examples = exampleSections.flatMap((item) => articles(item.source));
  const questionAnswerSections = sections.filter((item) => /important questions and answers|questions.*answers|check answer/i.test(item.heading));
  const assessmentSections = sections.filter((item) => /assessment-style questions and review hints|assessment.*review hint/i.test(item.heading));
  const exitSections = sections.filter((item) => /exit ticket|mastery check/i.test(item.heading));
  const missing = [];
  if (!code) missing.push('curriculum code');
  if (!title) missing.push('topic title');
  if (!description) missing.push('content description');
  if (!learningSections.length) missing.push('learning intention section');
  if (!elaborations.length && !elaborationSections.length) missing.push('explicit elaborations');
  if (!examples.length && !exampleSections.some((item) => clean(item.source))) missing.push('worked/modelled examples');
  if (!questionAnswerSections.length) missing.push('important questions and answers section');
  if (!assessmentSections.length) missing.push('assessment-style questions and review hints section');
  if (!exitSections.length) missing.push('exit ticket section');
  return {
    file: path.relative(ROOT, file).split(path.sep).join('/'),
    code,
    title,
    description,
    learningSectionCount: learningSections.length,
    elaborationCount: elaborations.length,
    exampleCount: examples.length,
    questionAnswerSectionCount: questionAnswerSections.length,
    assessmentSectionCount: assessmentSections.length,
    exitTicketSectionCount: exitSections.length,
    eligible: missing.length === 0,
    missing,
  };
}

const topicFiles = [];
for (const root of YEAR_ROOTS) {
  for (const file of walk(path.join(ROOT, root))) {
    const relative = path.relative(ROOT, file).split(path.sep).join('/');
    if (!relative.endsWith('/index.html')) continue;
    if (/\/(?:teacher-slides|teacher-deck|curriculum)\//i.test(relative)) continue;
    if (!/^ac9/i.test(path.basename(path.dirname(file)))) continue;
    const head = fs.readFileSync(file, 'utf8').slice(0, 24000);
    if (!/\bAC9[A-Z0-9]{5,12}\b/i.test(head)) continue;
    topicFiles.push(file);
  }
}

const topics = topicFiles.map(inspect);
const eligible = topics.filter((item) => item.eligible);
const blocked = topics.filter((item) => !item.eligible);
const missingCounts = {};
for (const item of blocked) for (const reason of item.missing) missingCounts[reason] = (missingCounts[reason] || 0) + 1;
const report = {
  generatedAt: new Date().toISOString(),
  rule: 'Copy only from each static topic page; never author missing slide content.',
  totalTopics: topics.length,
  eligibleTopics: eligible.length,
  blockedTopics: blocked.length,
  missingCounts,
  blocked,
};

if (WRITE_REPORT) {
  const target = path.join(ROOT, 'reports', 'teacher-slide-source-copy-audit.json');
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`Wrote ${path.relative(ROOT, target)}`);
}

console.log(`Teacher-slide source-copy audit: ${blocked.length ? 'BLOCKED' : 'PASS'}`);
console.log(`Topic pages: ${topics.length}`);
console.log(`Eligible for deterministic copy-only rebuild: ${eligible.length}`);
console.log(`Blocked by missing source structure: ${blocked.length}`);
for (const [reason, count] of Object.entries(missingCounts).sort((a, b) => b[1] - a[1])) console.log(`- ${reason}: ${count}`);
if (blocked.length) process.exitCode = 1;
