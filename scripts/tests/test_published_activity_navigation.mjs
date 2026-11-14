import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { validateTopicActivities, validateRetiredActivity } from '../lib/published_activity_navigation.mjs';

const code = 'AC9M1N01';
const practice = '<a href="https://app.skillrhub.com/?try=1&amp;skill=AC9M1N01">Practice now</a>';
test('topic return links preserve the exact canonical topic and verified access', () => {
  const canonical = 'https://skillrhub.com/year1/maths/ac9m1n01-number/';
  const head = `<link rel="canonical" href="${canonical}">`;
  const returned = practice.replace('skill=AC9M1N01', `skill=AC9M1N01&amp;returnTo=${encodeURIComponent(canonical)}`);
  assert.deepEqual(validateTopicActivities(head + returned, code), []);
  for (const invalid of [returned, head + returned.replace('try=1', 'login=1'), head + returned.replace('number%2F', 'other%2F'), head + returned.replace('returnTo=', 'unrecognised=')]) {
    assert.ok(validateTopicActivities(invalid, code).length);
  }
});
test('published navigation enforces matching code, guest access and availability', () => {
  assert.deepEqual(validateTopicActivities(practice, code), []);
  for (const invalid of [
    `<!--${practice}-->`,
    practice.replace(code, 'AC9M1N02'),
    practice.replace('try=1', 'login=1'),
    practice + '<a href="/quiz/year-1/math/ac9m1n01/test/">Old test</a>',
  ]) assert.ok(validateTopicActivities(invalid, code).length);
  assert.ok(validateTopicActivities('<a href="https://app.skillrhub.com/?try=1&amp;skill=AC9MFN02">Practice</a>', 'AC9MFN02').length);
  assert.deepEqual(validateTopicActivities('<a href="https://app.skillrhub.com/">Browse practice</a>', 'AC9MFN02'), []);
});

test('retired launches keep both HTML and script redirects aligned and cannot reactivate the player', () => {
  const html = fs.readFileSync('quiz/year-1/math/ac9m1n01/practice/index.html', 'utf8');
  assert.deepEqual(validateRetiredActivity(html, code, "practice"), []);
  for (const invalid of [
    html.replace('noindex,follow', 'index,follow'),
    html.replace('try=1&amp;skill=AC9M1N01', 'try=1&amp;skill=AC9M1N02'),
    html.replace('location.replace(', 'location.assign('),
    html.replace('</body>', '<script src="/quiz/assets/script.js"></script></body>'),
  ]) assert.ok(validateRetiredActivity(invalid, code, "practice").length);
});

test('retired tests use assessment availability independently of practice access', () => {
  const route = 'quiz/year-1/math/ac9m1n01';
  const assessment = fs.readFileSync(`${route}/test/index.html`, 'utf8');
  const practice = fs.readFileSync(`${route}/practice/index.html`, 'utf8');
  assert.deepEqual(validateRetiredActivity(assessment, code, 'test'), []);
  assert.ok(validateRetiredActivity(practice, code, 'test').length);
  assert.ok(validateRetiredActivity(assessment, code, 'practice').length);
});
