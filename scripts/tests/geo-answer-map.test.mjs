import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { test } from "node:test";

const root = path.resolve(import.meta.dirname, "../..");
const read = rel => fs.readFileSync(path.join(root, rel), "utf8");
const llms = read("llms.txt");
const catalogue = read("learn/index.html");
const answerMap = JSON.parse(read("data/geo-answer-routes.json"));
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

test("Year 2 discovery retains the detailed equal-groups guide and a native catalogue topic link", () => {
  const target = "/year2/maths/year-2-multiplication-division-arrays-and-equal-groups-activities-and-worksheets-ac9m2n05.html";
  assert.ok(answerMap.routes.some(r => r.id === "Y2MULT" && new URL(r.url).pathname === target));
  assert.match(catalogue, /href="\/year2\/maths\/ac9m2n05-[^"]+"/);
  assert.match(discovery, /AC9M2N05/i);
  assert.match(discovery, /<link[^>]+rel=["']canonical["']/i);
});

test("Bing-priority Year 8, Year 1 shapes and Year 10 periodic answers are public and curriculum-specific", () => {
  const checks = [
    {
      page: "blogs/year8-science-curriculum-australia-guide.html",
      snippet: "How can I revise Year 8 Science with examples?",
      code: "Australian Curriculum",
      answerId: "year8-science-faq",
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

test("structured answer routes and neutral benchmark targets resolve to current indexable canonical pages", () => {
  const aiIndex = JSON.parse(read("ai-index.json"));
  assert.deepEqual(aiIndex.answer_routes, answerMap.routes);
  assert.equal(new Set(answerMap.routes.map(r => r.id)).size, answerMap.routes.length);
  assert.equal(new Set(answerMap.routes.map(r => r.url)).size, answerMap.routes.length);
  const targets = [...answerMap.routes.map(r => r.url), ...JSON.parse(read("data/geo-chatgpt-neutral-prompts.json")).questions.map(q => q.target)];
  for (const href of targets) {
    const url = new URL(href);
    const html = fs.readFileSync(itemUrlToFile(href), "utf8");
    const canonical = html.match(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)/i)?.[1];
    assert.equal(canonical, url.origin + url.pathname, "Incorrect canonical for " + href);
    assert.ok(!/<meta[^>]*name=["']robots["'][^>]*noindex/i.test(html), "Noindex target " + href);
    assert.ok(!/http-equiv=["']refresh/i.test(html), "Redirect target " + href);
    if (url.pathname === "/learn/") {
      assert.ok(Number(url.searchParams.get("year")) >= 0 && Number(url.searchParams.get("year")) <= 10);
      assert.ok([null, "maths", "science", "english"].includes(url.searchParams.get("subject")));
    }
  }
});

test("active discovery files no longer link to retired learning hubs", () => {
  for (const name of ["llms.txt", "llms-full.txt", "ai-site-map.md", "ai-index.json"]) {
    const urls = [...read(name).matchAll(/https:\/\/skillrhub\.com\/[^\s<>"\)\]\|,]+/g)].map(m => m[0]);
    for (const href of urls) {
      const file = itemUrlToFile(href);
      if (!fs.existsSync(file) || !file.endsWith(".html")) continue;
      assert.ok(!read(path.relative(root, file)).includes("data-learning-hub-retired="), name + ": stale hub " + href);
    }
  }
});

test("Year 8 Science FAQ schema matches its native visible answers", () => {
  const html = read("blogs/year8-science-curriculum-australia-guide.html");
  const faq = html.split('id="year8-science-faq"')[1].split("</section>")[0];
  const schema = JSON.parse(html.match(/<script[^>]*id="skillrhub-faq-jsonld"[^>]*>([\s\S]*?)<\/script>/)[1]);
  const pairs = [...faq.matchAll(/<summary>(.*?)<\/summary><p>(.*?)<\/p>/g)];
  assert.equal(pairs.length, 3);
  assert.equal(schema.mainEntity.length, pairs.length);
  for (const [i, pair] of pairs.entries()) {
    assert.equal(schema.mainEntity[i].name, pair[1]);
    assert.equal(schema.mainEntity[i].acceptedAnswer.text, pair[2]);
  }
});
