"use strict";
(() => {
  const source = window.__skillrY10GiftedSource;
  if (!source || !Array.isArray(source.data) || source.data.length !== 24) return;
  const path = window.location.pathname.toLowerCase();
  const mode = path.includes("/test/") ? "test" : "practice";
  const target = mode === "test" ? window.skillrTestQuestions : window.skillrPracticeQuestions;
  if (!Array.isArray(target)) return;
  const selected = mode === "test" ? source.data.slice(16, 24) : source.data.slice(0, 16);
  const normalise = (s) => String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, "");
  const numericDistractors = (answer) => {
    const m = String(answer).match(/^([≈~]?\s*)?(-?\d+(?:\.\d+)?)(%|°|\s*[a-zA-Z]+(?:²|³)?)?$/);
    if (!m) return [];
    const value = Number(m[2]); const suffix = m[3] || "";
    return [value + 1, value - 1, value === 0 ? 2 : -value].map(v => `${Number.isInteger(v) ? v : Number(v.toPrecision(3))}${suffix}`);
  };
  const optionsFor = (item, index) => {
    const answer = item[1]; const pool = source.data.map(x => x[1]);
    let candidates = numericDistractors(answer);
    const a = String(answer).toLowerCase();
    if (/linear|exponential/.test(a)) candidates.push("Linear growth","Linear decay","Exponential growth","Exponential decay","Quadratic model");
    if (/independ|depend/.test(a)) candidates.push("Independent","Dependent","Mutually exclusive","Not enough information");
    if (/right.*skew|left.*skew|symmetric/.test(a)) candidates.push("Right skew","Left skew","Approximately symmetric","No conclusion about shape is possible");
    if (/overestimate|underestimate|too short|too long|smaller|larger/.test(a)) candidates.push("Overestimated","Underestimated","No systematic effect","Cannot be determined");
    candidates.push(...pool.filter((_, i) => i !== index));
    const seen = new Set([normalise(answer)]); const distractors = [];
    for (const c of candidates) {
      const n = normalise(c); if (!n || seen.has(n)) continue;
      seen.add(n); distractors.push(String(c)); if (distractors.length === 3) break;
    }
    while (distractors.length < 3) distractors.push(["Not enough information","None of these conclusions follows","A different result is required"][distractors.length]);
    const correct = index % 4; const answers = distractors.slice(0,3); answers.splice(correct,0,String(answer));
    return {answers, correct};
  };
  const gifted = selected.map((item, localIndex) => {
    const sourceNumber = mode === "test" ? localIndex + 17 : localIndex + 1;
    const built = optionsFor(item, sourceNumber - 1);
    return {
      id: `${source.code.toLowerCase()}-gifted-${mode === "test" ? "t" : "p"}-${String(sourceNumber).padStart(3,"0")}`,
      curriculumCode: source.code, bank: mode, section: "Gifted challenge", sourceNumber,
      skill: "gifted challenge", printable: true, type: "single", question: item[0],
      answers: built.answers, correct: built.correct,
      explanation: `${item[1]}. ${item[2]}`,
      structuredExplanation: {summary: item[1], hint: item[2]},
      qualitySchema: "gifted-reviewed-v1", difficulty: "extension", gifted: true
    };
  });
  const existing = new Set(target.map(q => q.id));
  target.push(...gifted.filter(q => !existing.has(q.id)));
  if (mode === "test") window.skillrExamQuestions = target;
  window.quizQuestions = target;
})();
