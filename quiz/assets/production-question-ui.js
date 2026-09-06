"use strict";

(() => {
  const y10GiftedMatch = window.location.pathname.toLowerCase().match(/^\/quiz\/year-10\/math\/(ac9m10[a-z0-9]+)\/(practice|test)\//);
  if (y10GiftedMatch && document.readyState === "loading") {
    document.write(`<script src="/quiz/year-10/math/${y10GiftedMatch[1]}/gifted.js?v=20260819-final"><\/script><script src="/quiz/assets/year10-gifted-runtime.js?v=20260819-final"><\/script>`);
  }

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

  function safeFilter(items) {
    if (!Array.isArray(items) || items.length === 0) return items;
    const clean = items.filter((question) => !isContaminated(question));
    return clean.length > 0 ? clean : items;
  }

  if (Array.isArray(window.quizQuestions)) window.quizQuestions = safeFilter(window.quizQuestions);
  if (Array.isArray(window.skillrPracticeQuestions)) window.skillrPracticeQuestions = safeFilter(window.skillrPracticeQuestions);
  if (Array.isArray(window.skillrTestQuestions)) window.skillrTestQuestions = safeFilter(window.skillrTestQuestions);

  const style = document.createElement("style");
  style.textContent = `
    .question-visual.production-question-visual{padding:.8rem;background:#f7fbff;border:1px solid #b8ddf2;border-radius:18px}
    .question-visual.production-question-visual svg{display:block;width:min(100%,640px);height:auto;margin:auto}
    .production-read-aloud{display:inline-flex;align-items:center;gap:.45rem;margin:.65rem 0;padding:.58rem .9rem;border:1px solid #1a91c7;border-radius:999px;background:#effaff;color:#124f70;font:700 .95rem/1 system-ui,sans-serif;cursor:pointer}
    .production-read-aloud:hover,.production-read-aloud:focus-visible{background:#dff5ff;outline:3px solid rgba(26,145,199,.22);outline-offset:2px}
    .question-quality-feedback{display:flex;flex-wrap:wrap;align-items:center;gap:.45rem .6rem;margin:.8rem 0 .25rem;padding:.65rem .75rem;border:1px solid #d9e2ec;border-radius:14px;background:#fff}
    .question-quality-feedback p{flex:1 1 250px;margin:0;font-size:.9rem;color:#475569}
    .question-quality-feedback button{border:1px solid #cbd5e1;border-radius:999px;background:#fff;padding:.45rem .7rem;cursor:pointer;font-weight:700}
    .question-quality-feedback button[aria-pressed="true"]{border-color:#1a91c7;background:#effaff;color:#124f70}
    .question-quality-feedback .feedback-thanks{flex-basis:100%;font-size:.82rem;color:#64748b}
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

  function normaliseQuestionText(text) {
    return String(text || "").replace(/\s+/g, " ").trim();
  }

  function compactHash(text) {
    let hash = 0;
    const value = normaliseQuestionText(text);
    for (let index = 0; index < value.length; index += 1) {
      hash = ((hash << 5) - hash + value.charCodeAt(index)) | 0;
    }
    return Math.abs(hash).toString(36);
  }

  function currentQuestionFromHeading() {
    const text = normaliseQuestionText(document.getElementById("questionText")?.textContent);
    if (!text) return null;

    const allQuestions = [
      ...(Array.isArray(window.quizQuestions) ? window.quizQuestions : []),
      ...(Array.isArray(window.skillrPracticeQuestions) ? window.skillrPracticeQuestions : []),
      ...(Array.isArray(window.skillrTestQuestions) ? window.skillrTestQuestions : []),
      ...(Array.isArray(window.skillrExamQuestions) ? window.skillrExamQuestions : [])
    ];
    const exact = allQuestions.find((question) => normaliseQuestionText(question?.question) === text);
    if (exact) return exact;

    const code = String(window.quizConfig?.skillCode || "unknown").toUpperCase();
    return {
      id: `rendered-${code.toLowerCase()}-${compactHash(text)}`,
      curriculumCode: code,
      question: text
    };
  }

  function quizMode() {
    const path = window.location.pathname.toLowerCase();
    if (path.includes("/daily-drills/")) return "daily_drill";
    if (path.includes("/test/")) return "test";
    return "practice";
  }

  function questionIdentity(question) { return String(question.id || question.questionId || question.question || "unknown"); }
  function questionVoteKey(question) {
    const code = String(question.curriculumCode || question.curriculum_code || window.quizConfig?.skillCode || "unknown").toUpperCase();
    return `skillrQuestionVote:${code}:${questionIdentity(question)}`;
  }
  function readVote(question) { try { return localStorage.getItem(questionVoteKey(question)) || ""; } catch { return ""; } }
  function saveVote(question, vote) { try { localStorage.setItem(questionVoteKey(question), vote); } catch {} }
  function sendVote(question, vote, previousVote) {
    if (typeof window.gtag !== "function") return;
    window.gtag("event", "question_feedback", {
      curriculum_code: String(question.curriculumCode || question.curriculum_code || window.quizConfig?.skillCode || "unknown").toUpperCase(),
      question_id: questionIdentity(question), quiz_mode: quizMode(), vote, previous_vote: previousVote || "none"
    });
  }

  function addQuestionQualityFeedback() {
    const heading = document.getElementById("questionText");
    const question = currentQuestionFromHeading();
    document.querySelector(".question-quality-feedback")?.remove();
    if (!heading || !question || !normaliseQuestionText(heading.textContent)) return;
    const quizScreen = document.getElementById("quizScreen");
    if (quizScreen && !quizScreen.classList.contains("is-active")) return;

    const box = document.createElement("div");
    box.className = "question-quality-feedback";
    box.setAttribute("aria-label", "Question quality feedback");
    const note = document.createElement("p");
    note.textContent = "Help us improve Skillr: rate this question.";
    box.appendChild(note);
    const up = document.createElement("button"), down = document.createElement("button");
    up.type = down.type = "button";
    up.textContent = "👍 Like";
    down.textContent = "👎 Unlike";
    up.setAttribute("aria-label", "Like this question");
    down.setAttribute("aria-label", "Unlike this question");
    const thanks = document.createElement("span");
    thanks.className = "feedback-thanks";
    function refresh() {
      const vote = readVote(question);
      up.setAttribute("aria-pressed", vote === "up" ? "true" : "false");
      down.setAttribute("aria-pressed", vote === "down" ? "true" : "false");
      thanks.textContent = vote ? "Thanks — your feedback helps us improve the question bank." : "";
    }
    function vote(value) {
      const previous = readVote(question);
      if (previous === value) return;
      saveVote(question, value);
      sendVote(question, value, previous);
      refresh();
    }
    up.addEventListener("click", () => vote("up"));
    down.addEventListener("click", () => vote("down"));
    box.append(up, down, thanks);
    const answerList = document.getElementById("answerList");
    if (answerList?.parentNode) answerList.insertAdjacentElement("afterend", box);
    else heading.insertAdjacentElement("afterend", box);
    refresh();
  }

  const learningAnalytics = {
    started: false,
    completed: false,
    answered: 0,
    correct: 0,
    startedAt: 0,
    lastQuestionId: ""
  };

  function sendLearningEvent(name, params) {
    const payload = {
      curriculum_code: String(window.quizConfig?.skillCode || "unknown").toUpperCase(),
      quiz_mode: quizMode(),
      page_path: window.location.pathname,
      ...(params || {})
    };
    let attempts = 0;
    const send = () => {
      if (typeof window.gtag === "function") {
        window.gtag("event", name, payload);
        return;
      }
      attempts += 1;
      if (attempts < 8) window.setTimeout(send, 350);
    };
    send();
  }

  function selectedAnswerIndex() {
    const checked = document.querySelector('#answerList input[type="radio"]:checked');
    if (checked) {
      const all = [...document.querySelectorAll('#answerList input[type="radio"]')];
      return all.indexOf(checked);
    }
    const selected = document.querySelector('#answerList .answer-option.is-selected, #answerList [aria-checked="true"], #answerList .selected');
    if (!selected) return -1;
    const options = [...document.querySelectorAll('#answerList .answer-option, #answerList [role="radio"], #answerList button')];
    return options.indexOf(selected);
  }

  function questionCorrectIndex(question) {
    if (!question) return -1;
    if (Number.isInteger(question.correct)) return question.correct;
    if (Number.isInteger(question.correctIndex)) return question.correctIndex;
    if (Array.isArray(question.correctValues) && question.correctValues.length === 1 && Array.isArray(question.options)) {
      return question.options.findIndex((option) => String(option?.value ?? option) === String(question.correctValues[0]));
    }
    return -1;
  }

  function markLearningStart() {
    if (learningAnalytics.started) return;
    learningAnalytics.started = true;
    learningAnalytics.completed = false;
    learningAnalytics.answered = 0;
    learningAnalytics.correct = 0;
    learningAnalytics.startedAt = Date.now();
    learningAnalytics.lastQuestionId = "";
    sendLearningEvent(quizMode() === "test" ? "test_start" : "practice_start", {
      session_question_count: Number(window.quizConfig?.maxQuestions) || 0,
      bank_question_count: Array.isArray(window.quizQuestions) ? window.quizQuestions.length : 0
    });
  }

  function trackAnsweredQuestion() {
    if (!learningAnalytics.started || learningAnalytics.completed) return;
    const question = currentQuestionFromHeading();
    if (!question) return;
    const questionId = questionIdentity(question);
    if (!questionId || learningAnalytics.lastQuestionId === questionId) return;
    const selected = selectedAnswerIndex();
    const correctIndex = questionCorrectIndex(question);
    const isCorrect = selected >= 0 && correctIndex >= 0 ? selected === correctIndex : undefined;
    learningAnalytics.lastQuestionId = questionId;
    learningAnalytics.answered += 1;
    if (isCorrect === true) learningAnalytics.correct += 1;
    sendLearningEvent("question_answered", {
      question_id: questionId,
      question_number: learningAnalytics.answered,
      is_correct: isCorrect === undefined ? "unknown" : isCorrect ? "true" : "false"
    });
  }

  function readVisibleScore() {
    const score = Number(document.getElementById("finalScore")?.textContent || document.getElementById("liveScore")?.textContent || 0);
    const total = Number(document.getElementById("finalTotal")?.textContent || window.quizConfig?.maxQuestions || learningAnalytics.answered || 0);
    return { score: Number.isFinite(score) ? score : 0, total: Number.isFinite(total) ? total : 0 };
  }

  function markLearningComplete() {
    if (!learningAnalytics.started || learningAnalytics.completed) return;
    learningAnalytics.completed = true;
    const { score, total } = readVisibleScore();
    const durationSeconds = Math.max(0, Math.round((Date.now() - learningAnalytics.startedAt) / 1000));
    sendLearningEvent(quizMode() === "test" ? "test_complete" : "practice_complete", {
      score,
      total,
      percentage: total > 0 ? Math.round((score / total) * 100) : 0,
      questions_answered: learningAnalytics.answered,
      duration_seconds: durationSeconds
    });
  }

  function markLearningAbandon() {
    if (!learningAnalytics.started || learningAnalytics.completed || learningAnalytics.answered <= 0) return;
    const durationSeconds = Math.max(0, Math.round((Date.now() - learningAnalytics.startedAt) / 1000));
    sendLearningEvent(quizMode() === "test" ? "test_abandon" : "practice_abandon", {
      questions_answered: learningAnalytics.answered,
      duration_seconds: durationSeconds
    });
  }

  function markNextSetStart() {
    if (!learningAnalytics.completed) return;
    sendLearningEvent(quizMode() === "test" ? "test_next_set" : "practice_next_set", {
      previous_questions_answered: learningAnalytics.answered
    });
    learningAnalytics.started = false;
    learningAnalytics.completed = false;
    window.setTimeout(markLearningStart, 0);
  }

  function refreshQuestionExtras() {
    queueMicrotask(() => {
      addReadAloudButton();
      addQuestionQualityFeedback();
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const heading = document.getElementById("questionText");
    if (!heading) return;

    document.getElementById("startButton")?.addEventListener("click", markLearningStart);
    document.getElementById("submitButton")?.addEventListener("click", () => window.setTimeout(trackAnsweredQuestion, 0));
    document.getElementById("restartButton")?.addEventListener("click", markNextSetStart);
    window.addEventListener("pagehide", markLearningAbandon);

    const resultScreen = document.getElementById("resultScreen");
    if (resultScreen) {
      new MutationObserver(() => {
        if (resultScreen.classList.contains("is-active")) markLearningComplete();
      }).observe(resultScreen, { attributes: true, attributeFilter: ["class"] });
    }

    new MutationObserver(refreshQuestionExtras).observe(heading, { childList: true, characterData: true, subtree: true });
    const answerList = document.getElementById("answerList");
    if (answerList) new MutationObserver(refreshQuestionExtras).observe(answerList, { childList: true, subtree: true });
    ["startButton", "nextButton", "submitButton"].forEach((id) => {
      document.getElementById(id)?.addEventListener("click", () => {
        window.setTimeout(refreshQuestionExtras, 0);
        window.setTimeout(refreshQuestionExtras, 80);
        window.setTimeout(refreshQuestionExtras, 250);
      });
    });
    window.setInterval(() => {
      const questionText = normaliseQuestionText(heading.textContent);
      if (questionText && !document.querySelector(".question-quality-feedback")) refreshQuestionExtras();
    }, 1000);
    refreshQuestionExtras();

    const app = document.getElementById("quizApp");
    if (app) new MutationObserver(() => {
      const visual = document.getElementById("questionVisual");
      if (!visual || visual.dataset.productionReady) return;
      visual.dataset.productionReady = "true";
      visual.classList.add("production-question-visual");
      const svg = visual.querySelector("svg[aria-label]");
      if (svg) visual.setAttribute("aria-label", svg.getAttribute("aria-label"));
    }).observe(app, { childList: true, subtree: true });
  });
})();
