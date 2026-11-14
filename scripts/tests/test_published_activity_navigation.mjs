import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { validateTopicActivities, validateRetiredActivity } from '../lib/published_activity_navigation.mjs';

const code = 'AC9M1N01';
// Availability changes with releases. Exercise the unavailable/access guards
// against a fixed fixture instead of treating a real code as permanently absent.
const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'skillr-navigation-'));
fs.mkdirSync(path.join(fixtureRoot, 'data'));
fs.writeFileSync(path.join(fixtureRoot, 'data/app-question-banks.json'), JSON.stringify({ codes: [
  { code, practice: true, assessment: true, guestPractice: true },
  { code: 'AC9M1N02', practice: true, assessment: true, guestPractice: false },
  { code: 'AC9MFN02', practice: false, assessment: false, guestPractice: false },
] }));
test.after(() => fs.rmSync(fixtureRoot, { recursive: true, force: true }));
const topic = (html, target) => validateTopicActivities(html, target, fixtureRoot);
const retired = (html, target) => validateRetiredActivity(html, target, fixtureRoot);
const practice = '<a href="https://app.skillrhub.com/?try=1&amp;skill=AC9M1N01">Practice now</a>';
test('topic return links preserve the exact canonical topic and verified access', () => {
  const canonical = 'https://skillrhub.com/year1/maths/ac9m1n01-number/';
  const head = `<link rel="canonical" href="${canonical}">`;
  const returned = practice.replace('skill=AC9M1N01', `skill=AC9M1N01&amp;returnTo=${encodeURIComponent(canonical)}`);
  assert.deepEqual(topic(head + returned, code), []);
  for (const invalid of [returned, head + returned.replace('try=1', 'login=1'), head + returned.replace('number%2F', 'other%2F'), head + returned.replace('returnTo=', 'unrecognised=')]) {
    assert.ok(topic(invalid, code).length);
  }
});
test('published navigation enforces matching code, guest access and availability', () => {
  assert.deepEqual(topic(practice, code), []);
  for (const invalid of [
    `<!--${practice}-->`,
    practice.replace(code, 'AC9M1N02'),
    practice.replace('try=1', 'login=1'),
    practice + '<a href="/quiz/year-1/math/ac9m1n01/test/">Old test</a>',
  ]) assert.ok(topic(invalid, code).length);
  assert.ok(topic('<a href="https://app.skillrhub.com/?try=1&amp;skill=AC9MFN02">Practice</a>', 'AC9MFN02').length);
  assert.deepEqual(topic('<a href="https://app.skillrhub.com/">Browse practice</a>', 'AC9MFN02'), []);
  assert.deepEqual(topic('<a href="https://app.skillrhub.com/?login=1&amp;skill=AC9M1N02">Practice</a>', 'AC9M1N02'), []);
  assert.ok(topic('<a href="https://app.skillrhub.com/?try=1&amp;skill=AC9M1N02">Practice</a>', 'AC9M1N02').length);
  assert.ok(topic('<a href="https://app.skillrhub.com/?assessment=AC9MFN02">Assessment</a>', 'AC9MFN02').length);
});

test('retired launches keep both HTML and script redirects aligned and cannot reactivate the player', () => {
  const html = fs.readFileSync('quiz/year-1/math/ac9m1n01/practice/index.html', 'utf8');
  assert.deepEqual(retired(html, code), []);
  for (const invalid of [
    html.replace('noindex,follow', 'index,follow'),
    html.replace('try=1&amp;skill=AC9M1N01', 'try=1&amp;skill=AC9M1N02'),
    html.replace('location.replace(', 'location.assign('),
    html.replace('</body>', '<script src="/quiz/assets/script.js"></script></body>'),
  ]) assert.ok(retired(invalid, code).length);
});
