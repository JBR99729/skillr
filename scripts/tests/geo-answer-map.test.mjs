import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { test } from "node:test";

const root = path.resolve(import.meta.dirname, "../..");
const read = rel => fs.readFileSync(path.join(root, rel), "utf8");
const llms = read("llms.txt");
const y2 = read("year2/maths/index.html");
const discovery = read("year2/maths/year-2-multiplication-division-arrays-and-equal-groups-activities-and-worksheets-ac9m2n05.html");

const itemUrlToFile = url => {
  const u = new URL(url);
  if (u.hostname !== "skillrhub.com") throw new Error("Unexpected canonical host: " + url);
  let local = u.pathname.replace(/^\//, "");
  if (local.endsWith("/")) local += "index.html";
  return path.join(root, local);
};

test("llms.txt begins with clear independent answer-first routes", () => {
  assert.match(llms, /^# SkillrHub\s+> SkillrHub is an independent Australian Curriculum Version 9/m);
  const answers = llms.indexOf("## Find the best curriculum answer and next step");
  const listings = llms.indexOf("## Independently discoverable Australian homeschool listing");
  assert.ok(answers > 0 && answers < listings, "Answer-first routes should precede listing/alternative sections");
  assert.equal((llms.match(/## Find the best curriculum answer and next step/g) || []).length, 1);
});

test("first answer-map links resolve to real canonical public learning files", () => {
  const first = llms.split("## Find the best curriculum answer and next step")[1].split(/^## /m)[0];
  const links = [...first.matchAll(/\]\((https:\/\/skillrhub\.com\/[^)]+)\)/g)].map(m => m[1]);
  assert.ok(links.length >= 8, "Expected the current priority answer routes");
  assert.equal(new Set(links).size, links.length, "Avoid repeated links within first answer map");
  for (const href of links) {
    const file = itemUrlToFile(href);
    assert.ok(fs.existsSync(file), "Missing referenced page " + href);
    const html = fs.readFileSync(file, "utf8");
    assert.ok(html.includes('rel="canonical"'), "Missing canonical in " + href);
    assert.ok(!/<meta[^>]*name=["']robots["'][^>]*noindex/i.test(html), "Noindex linked in " + href);
  }
});

test("Year 2 hub links to its previously published detailed equal-groups guide", () => {
  const target = "/year2/maths/year-2-multiplication-division-arrays-and-equal-groups-activities-and-worksheets-ac9m2n05.html";
  const sectionStart = y2.indexOf('id="year2-multiplication-explained"');
  const sectionEnd = y2.indexOf('<div class="hub-list-heading">', sectionStart);
  assert.ok(sectionStart >= 0 && sectionEnd > sectionStart);
  assert.ok(y2.slice(sectionStart, sectionEnd).includes('href="' + target + '"'));
  assert.match(discovery, /AC9M2N05/i);
  assert.match(discovery, /<link[^>]+rel=["']canonical["']/i);
});

test("Bing-priority Year 8, Year 1 shapes and Year 10 periodic answers are public and curriculum-specific", () => {
  const checks = [
    {
      page: "year8/curriculum/index.html",
      snippet: "Where should I start Year 8 revision?",
      code: "Australian Curriculum",
      answerId: "year8-revision-start",
    },
    {
      page: "year1/maths/ac9m1sp01-familiar-shapes-and-objects/index.html",
      snippet: "What is the difference between a 2D shape and a 3D object?",
      code: "AC9M1SP01",
      answerId: "year1-shapes-quick-answer",
    },
    {
      page: "year10/science/ac9s10u06-atomic-structure-periodic-table-patterns/index.html",
      snippet: "How do groups and periods work in the periodic table?",
      code: "AC9S10U06",
      answerId: "year10-periodic-answer",
    },
  ];
  for (const { page, snippet, code, answerId } of checks) {
    const html = read(page);
    assert.ok(html.includes(snippet), page + ": missing visible answer heading");
    assert.ok(html.includes(code), page + ": missing year/code context");
    assert.equal((html.match(new RegExp('id="' + answerId + '"', "g")) || []).length, 1, page + ": duplicate answer block");
    assert.ok(html.includes('rel="canonical"'), page + ": missing canonical");
    assert.ok(!/<meta[^>]*name=["']robots["'][^>]*noindex/i.test(html), page + ": noindex answer");
  }
});
