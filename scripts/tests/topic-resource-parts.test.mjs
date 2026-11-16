import test from 'node:test';
import assert from 'node:assert/strict';
import { topicResourceParts } from '../lib/published_activity_navigation.mjs';

const code = 'AC9M3M03';
const canonical = 'https://skillrhub.com/year3/maths/duration/';
const banks = new Map([[code, { practice: true, assessment: true, guestPractice: true }]]);

test('current published app links and teacher viewer replace retired route metadata', () => {
  const html = `<a href="https://app.skillrhub.com/?try=1&amp;skill=${code}">Practise</a>
    <a href="https://app.skillrhub.com/?try=1&amp;skill=${code}&amp;returnTo=x">Practise again</a>
    <a href="https://app.skillrhub.com/?assessment=${code}">Assessment</a>
    <a href="teacher-slides/index.html">Teacher slides</a>
    <a href="/quiz/year-3/math/ac9m3m03/worksheet/">Retired worksheet</a>
    <a href="/quiz/year-3/math/ac9m3m03/practice/">Retired practice</a>`;
  const parts = topicResourceParts(html, code, canonical, banks);
  assert.deepEqual(parts.map(p => p.learningResourceType), ['Practice', 'Assessment', 'Teacher resource']);
  assert.equal(parts[0].url, `https://app.skillrhub.com/?try=1&skill=${code}`);
  assert.ok(parts.every(p => !p.url.includes('/quiz/')));
});

test('wrong skills, unpublished activities, paid packs and commented links stay out', () => {
  const html = `<a href="https://app.skillrhub.com/?try=1&skill=AC9M1N01">Other skill</a>
    <a href="https://app.skillrhub.com/?assessment=${code}">Unpublished assessment</a>
    <a href="https://app.skillrhub.com.evil.example/?try=1&skill=${code}">Wrong host</a>
    <a href="/products/time-worksheet/">Paid pack</a>
    <!-- <a href="https://app.skillrhub.com/?try=1&skill=${code}">Old link</a> -->`;
  assert.deepEqual(topicResourceParts(html, code, canonical, new Map()), []);
});

test('account-only practice is not described using a guest link', () => {
  const accountBanks = new Map([[code, { practice: true, guestPractice: false }]]);
  const html = `<a href="https://app.skillrhub.com/?try=1&skill=${code}">Guest</a>
    <a href="https://app.skillrhub.com/?login=1&skill=${code}">Account practice</a>`;
  assert.deepEqual(topicResourceParts(html, code, canonical, accountBanks).map(p => p.url),
    [`https://app.skillrhub.com/?login=1&skill=${code}`]);
});
