import test from "node:test";
import assert from "node:assert/strict";
import { hasStaticCurriculumCoverage } from "../lib/static-curriculum-coverage.mjs";
import { year2EnglishBankProfile, editingChoiceSpeech, needsEditingChoiceSpeech } from "../lib/year2-english-bank.mjs";

const article = '<article><h3>E1: Choose language for the listener</h3><p>Compare a request to a friend with a request to a teacher.</p></article>';
const section = (body) => `<details><summary><strong>Australian Curriculum elaborations</strong></summary>${body}</details>`;

test("static curriculum coverage recognises authored elaborations and the existing description format", () => {
  assert.equal(hasStaticCurriculumCoverage(section(article), 1), true);
  assert.equal(hasStaticCurriculumCoverage('<p><strong>Content description:</strong> Count collections.</p>', 1), true);
});

test("a heading, missing elaboration or script/comment cannot substitute for static teaching content", () => {
  assert.equal(hasStaticCurriculumCoverage(section(""), 1), false);
  assert.equal(hasStaticCurriculumCoverage(section(""), 0), false);
  assert.equal(hasStaticCurriculumCoverage(section(article), 2), false);
  assert.equal(hasStaticCurriculumCoverage(section(article.replace(/<p>.*?<\/p>/, "<p></p>")), 1), false);
  assert.equal(hasStaticCurriculumCoverage(`<!--${section(article)}-->`, 1), false);
  assert.equal(hasStaticCurriculumCoverage(`<script>${section(article)}</script>`, 1), false);
});

test("bank versions have explicit counts and selection rules; metadata and unknown/mixed formats fail", () => {
  const current = year2EnglishBankProfile([{quality_schema:"student-facing-v3"}]);
  assert.equal(current.practiceCount, 40);
  assert.equal(current.testCount, 16);
  assert.equal(current.practiceAttempt, 40);
  assert.equal(current.practiceShuffle, false);
  assert.equal(current.practiceCycle, false);
  const legacy = year2EnglishBankProfile([{}]);
  assert.equal(legacy.practiceCount, 24);
  assert.equal(legacy.practiceAttempt, 8);
  assert.equal(legacy.practiceShuffle, true);
  assert.equal(legacy.practiceCycle, true);
  assert.throws(() => year2EnglishBankProfile({code:"AC9E2LA01",practice:40}), /non-empty JSON array/);
  assert.throws(() => year2EnglishBankProfile([]), /non-empty JSON array/);
  assert.throws(() => year2EnglishBankProfile([{quality_schema:"unknown"}]), /unsupported/);
  assert.throws(() => year2EnglishBankProfile([{}, {quality_schema:"student-facing-v3"}]), /mixed/);
});

test("spoken editing choices distinguish capitals and comma positions without marking correctness", () => {
  assert.match(editingChoiceSpeech("The Lost Puppy"), /Capital words: The, Lost, Puppy\./);
  assert.match(editingChoiceSpeech("the lost puppy"), /There are no capital words\./);
  assert.match(editingChoiceSpeech("We bought apples, pears and grapes."), /Commas come after: apples\./);
  assert.match(editingChoiceSpeech("We, bought, apples pears and grapes."), /Commas come after: We, bought\./);
  assert.match(editingChoiceSpeech("We bought apples pears and grapes."), /There are no commas\./);
  assert.equal(new Set(["The Lost Puppy", "The lost puppy", "the lost puppy"].map(editingChoiceSpeech)).size, 3);
  for (const suffix of ["direct", "discriminate", "apply"]) assert.equal(needsEditingChoiceSpeech({curriculum_code:"AC9E2LA10",skill:`title_${suffix}`}), true);
  assert.equal(needsEditingChoiceSpeech({curriculum_code:"AC9E2LA10",skill:"title_explain"}), false);
});
