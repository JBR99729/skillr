#!/usr/bin/env node
/**
 * Auditable, sample-only ChatGPT Search citation inclusion scorecard.
 * Usage: node scripts/geo-chatgpt-scorecard.mjs [PATH_TO_OBSERVATION_JSON]
 *
 * The default public seed has no observations; it MUST remain UNTESTED.
 * To score genuine answers, copy the seed JSON to a private location and add
 * observation rows only after inspecting actual ChatGPT Search results.
 * No network access, API call, scraped conversation, or user data collection.
 */
import fs from "node:fs";
import path from "node:path";

const defaultFile = path.resolve("data/geo-chatgpt-neutral-prompts.json");
const file = path.resolve(process.argv[2] ?? defaultFile);
const data = JSON.parse(fs.readFileSync(file, "utf8"));
const questions = new Map((data.questions ?? []).map(q => [q.id, q]));
if (questions.size !== (data.questions ?? []).length || !questions.size) {
  throw new Error("Question IDs must be unique and nonempty");
}
const observations = data.observations ?? [];
if (!Array.isArray(observations)) throw new Error("observations must be an array");
const normalizeHost = url => {
  try {
    const u = new URL(url);
    const h = u.hostname.toLowerCase().replace(/^www\./, "");
    return /^https?:$/.test(u.protocol) ? h : "";
  } catch { return ""; }
};
const isSkillr = url => {
  const host = normalizeHost(url);
  return host === "skillrhub.com" || host === "app.skillrhub.com";
};
const tested = [];
for (const o of observations) {
  if (!questions.has(o.question_id)) throw new Error("Unknown question_id: " + o.question_id);
  if (o.provider !== "ChatGPT Search") {
    throw new Error("Provider must be ChatGPT Search; public web search is a different experiment");
  }
  if (typeof o.observed_at !== "string" || !Number.isFinite(Date.parse(o.observed_at))) {
    throw new Error("observed_at must be a real ISO timestamp");
  }
  if (!Array.isArray(o.cited_urls) || o.cited_urls.some(url => !normalizeHost(url))) {
    throw new Error("cited_urls must be an array of absolute http(s) URLs");
  }
  if (!o.search_enabled || !o.answer_inspected) {
    throw new Error("Only directly inspected ChatGPT Search answers with search_enabled=true can be scored");
  }
  const citedSkillr = o.cited_urls.filter(isSkillr);
  const target = questions.get(o.question_id).target;
  const hasTarget = citedSkillr.some(url => {
    try {
      const a = new URL(url), b = new URL(target);
      return a.hostname.replace(/^www\./, "") === b.hostname.replace(/^www\./, "") && a.pathname.replace(/\/$/, "") === b.pathname.replace(/\/$/, "");
    } catch { return false; }
  });
  tested.push({
    question_id:o.question_id,
    observed_at:o.observed_at,
    cited_skillrhub: citedSkillr.length > 0,
    target_cited:hasTarget,
    skillrhub_urls:[...new Set(citedSkillr)],
    total_cited_urls:o.cited_urls.length,
    competitor_hosts:[...new Set(o.cited_urls.map(normalizeHost).filter(h => h && h !== "skillrhub.com" && h !== "app.skillrhub.com"))]
  });
}
const questionIds = new Set(tested.map(x => x.question_id));
const successes = tested.filter(x => x.cited_skillrhub).length;
const targets = tested.filter(x => x.target_cited).length;
const report = {
  experiment:"ChatGPT Search manual neutral-prompt citation audit (sample, NOT platform ranking)",
  status:tested.length ? "OBSERVED_SAMPLE" : "UNTESTED",
  questions_in_set:questions.size,
  distinct_questions_tested:questionIds.size,
  inspected_answer_runs:tested.length,
  sampled_skillrhub_citation_runs:successes,
  sampled_exact_target_citation_runs:targets,
  observed_inclusion_rate:tested.length ? Number((100*successes/tested.length).toFixed(2)) : null,
  observed_exact_target_rate:tested.length ? Number((100*targets/tested.length).toFixed(2)) : null,
  note:tested.length ? "Rates describe only these observed ChatGPT Search answer runs; not sitewide ChatGPT impressions, ranking or traffic." : "No consumer ChatGPT Search answers were tested; do not report a zero citation rate.",
  results:tested
};
console.log(JSON.stringify(report,null,2));
