"use strict";

(() => {
  const BANNED_STUDENT_CONTENT = [
    /\bthe current page is practicing\b/i,
    /\baustralian curriculum descriptor\b/i,
    /\bhere is (?:a|an) (?:clear )?(?:multiple-choice )?question\b/i,
    /\bdesigned for this topic\b/i,
    /\bpython code\b/i,
    /\bgenerates? similar practice questions\b/i,
    /\bdynamically generate(?:s|d)?\b/i,
    /\bas an ai\b/i,
    /\blanguage model\b/i,
    /^A (?:Foundation|Year \d+) student is solving a problem involving\b/i,
    /Which option is (?:mathematically|scientifically|linguistically) valid\?/i,
    /^What should you check when using\b/i,
    /^What is important when using\b/i,
    /^Which response correctly uses\b/i,
    /^When would you use\b/i,
    /^What is the correct way to apply\b/i
  ];

  function studentFacingText(question) {
    return [
      question?.question,
      question?.audioPrompt,
      question?.audio_prompt,
      question?.explanation,
      question?.structuredExplanation?.summary,
      question?.structuredExplanation?.hint
    ].filter(Boolean).join(" ");
  }

  function isContaminated(question) {
    const text = studentFacingText(question);
    return BANNED_STUDENT_CONTENT.some((pattern) => pattern.test(text));
  }

  const ac9m9a06Fallback = [
    ["For the graph y = (x - 4)², where is the vertex?", ["(4, 0)", "(-4, 0)", "(0, 4)", "(0, -4)"], 0, "In vertex form y = a(x - h)² + k, the vertex is (h, k)."],
    ["Compared with y = x², what does y = (x + 3)² do?", ["Moves 3 units left", "Moves 3 units right", "Moves 3 units up", "Moves 3 units down"], 0, "Because x + 3 = x - (-3), the parabola moves 3 units left."],
    ["Compared with y = x², what does y = x² + 5 do?", ["Moves 5 units up", "Moves 5 units down", "Moves 5 units left", "Moves 5 units right"], 0, "The +5 is outside the square, so it moves the graph 5 units up."],
    ["What happens to y = x² when it becomes y = -x²?", ["It is reflected in the x-axis", "It is reflected in the y-axis", "It moves 1 unit down", "It becomes narrower only"], 0, "A negative coefficient reflects the parabola across the x-axis."],
    ["Which graph is narrower than y = x²?", ["y = 3x²", "y = ½x²", "y = (x - 3)²", "y = x² + 3"], 0, "When |a| > 1, the parabola is vertically stretched and appears narrower."],
    ["Which graph is wider than y = x²?", ["y = ¼x²", "y = 4x²", "y = (x + 4)²", "y = x² - 4"], 0, "When 0 < |a| < 1, the parabola is vertically compressed and appears wider."],
    ["What is the vertex of y = 2(x - 1)² - 3?", ["(1, -3)", "(-1, -3)", "(1, 3)", "(-1, 3)"], 0, "The vertex is (h, k) = (1, -3)."],
    ["Consider y = -2(x + 3)² + 5. Which description is correct?", ["Reflected in the x-axis, vertically stretched by 2, moved 3 left and 5 up", "Reflected in the x-axis, vertically compressed by 2, moved 3 right and 5 up", "Vertically stretched by 2, moved 3 right and 5 down", "Reflected in the y-axis, vertically stretched by 2, moved 3 left and 5 down"], 0, "Here a = -2, h = -3 and k = 5." ]
  ].map((row, index) => ({
    id: `ac9m9a06-clean-${index + 1}`,
    curriculumCode: "AC9M9A06",
    bank: "practice",
    skill: "quadratic transformations",
    printable: true,
    type: "single",
    question: row[0],
    audioPrompt: row[0],
    answers: row[1],
    correct: row[2],
    explanation: row[3],
    difficulty: index < 7 ? 1 : 2,
    difficultyTier: "confidence",
    sequencePriority: 1,
    qualitySchema: "student-safe-v1"
  }));

  if (Array.isArray(window.quizQuestions)) {
    const clean = window.quizQuestions.filter((question) => !isContaminated(question));
    const code = String(window.quizConfig?.skillCode || window.quizQuestions[0]?.curriculumCode || "").toUpperCase();
    if (code === "AC9M9A06" && clean.length < 8) {
      window.quizQuestions = ac9m9a06Fallback;
      window.skillrPracticeQuestions = ac9m9a06Fallback;
    } else {
      window.quizQuestions = clean;
      if (Array.isArray(window.skillrPracticeQuestions)) {
        window.skillrPracticeQuestions = window.skillrPracticeQuestions.filter((question) => !isContaminated(question));
      }
      if (Array.isArray(window.skillrTestQuestions)) {
        window.skillrTestQuestions = window.skillrTestQuestions.filter((question) => !isContaminated(question));
      }
    }
  }

  const style = document.createElement("style");
  style.textContent = `
    .question-visual.production-question-visual{padding:.8rem;background:#f7fbff;border:1px solid #b8ddf2;border-radius:18px}
    .question-visual.production-question-visual svg{display:block;width:min(100%,640px);height:auto;margin:auto}
    .production-read-aloud{display:inline-flex;align-items:center;gap:.45rem;margin:.65rem 0;padding:.58rem .9rem;border:1px solid #1a91c7;border-radius:999px;background:#effaff;color:#124f70;font:700 .95rem/1 system-ui,sans-serif;cursor:pointer}
    .production-read-aloud:hover,.production-read-aloud:focus-visible{background:#dff5ff;outline:3px solid rgba(26,145,199,.22);outline-offset:2px}
    .feedback{white-space:pre-line}
  `;
  document.head.appendChild(style);

  function addReadAloudButton() {
    const heading = document.getElementById("questionText");
    if (!heading || !heading.textContent.trim()) return;
    document.querySelector(".production-read-aloud")?.remove();
    const button = document.createElement("button");
    button.type = "button";
    button.className = "production-read-aloud";
    button.setAttribute("aria-label", "Read this question aloud");
    button.textContent = "🔊 Read aloud";
    button.addEventListener("click", () => {
      if (!("speechSynthesis" in window)) return;
      window.speechSynthesis.cancel();
      const visualDescription = document.getElementById("questionVisual")?.getAttribute("aria-label") || "";
      const utterance = new SpeechSynthesisUtterance([heading.textContent.trim(), visualDescription].filter(Boolean).join(" "));
      utterance.lang = "en-AU";
      window.speechSynthesis.speak(utterance);
    });
    const visual = document.getElementById("questionVisual");
    (visual || heading).insertAdjacentElement("afterend", button);
  }

  document.addEventListener("DOMContentLoaded", () => {
    const heading = document.getElementById("questionText");
    if (!heading) return;
    new MutationObserver(() => queueMicrotask(addReadAloudButton)).observe(heading, { childList: true, characterData: true, subtree: true });
    const app = document.getElementById("quizApp");
    if (app) {
      new MutationObserver(() => {
        const visual = document.getElementById("questionVisual");
        if (!visual || visual.dataset.productionReady) return;
        visual.dataset.productionReady = "true";
        visual.classList.add("production-question-visual");
        const svg = visual.querySelector("svg[aria-label]");
        if (svg) visual.setAttribute("aria-label", svg.getAttribute("aria-label"));
      }).observe(app, { childList: true, subtree: true });
    }
  });
})();
