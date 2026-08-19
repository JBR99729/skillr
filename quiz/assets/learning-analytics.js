"use strict";

(() => {
  if (window.__skillrLearningAnalyticsInstalled) return;
  if (document.querySelector('script[src*="/quiz/assets/production-question-ui.js"]')) return;

  const path = window.location.pathname.toLowerCase();
  if (!/^\/quiz\/(?:grade-k|year-\d+)\/(?:math|science|english)\/[^/]+\/(?:practice|test)\/?$/.test(path)) return;

  window.__skillrLearningAnalyticsInstalled = true;

  const state = {
    started: false,
    completed: false,
    answered: 0,
    correct: 0,
    startedAt: 0,
    lastQuestionId: ""
  };

  function quizMode() {
    return path.includes("/test/") ? "test" : "practice";
  }

  function normalise(text) {
    return String(text || "").replace(/\s+/g, " ").trim();
  }

  function compactHash(text) {
    let hash = 0;
    const value = normalise(text);
    for (let i = 0; i < value.length; i += 1) hash = ((hash << 5) - hash + value.charCodeAt(i)) | 0;
    return Math.abs(hash).toString(36);
  }

  function allQuestions() {
    const sources = [
      window.quizQuestions,
      window.skillrPracticeQuestions,
      window.skillrTestQuestions,
      window.skillrExamQuestions
    ];
    const seen = new Set();
    const result = [];
    sources.forEach((items) => {
      if (!Array.isArray(items)) return;
      items.forEach((item) => {
        const id = String(item?.id || item?.questionId || item?.question || "");
        if (seen.has(id)) return;
        seen.add(id);
        result.push(item);
      });
    });
    return result;
  }

  function currentQuestion() {
    const text = normalise(document.getElementById("questionText")?.textContent);
    if (!text) return null;
    const exact = allQuestions().find((item) => normalise(item?.question) === text);
    if (exact) return exact;
    const code = String(window.quizConfig?.skillCode || "unknown").toUpperCase();
    return {
      id: `rendered-${code.toLowerCase()}-${compactHash(text)}`,
      curriculumCode: code,
      question: text
    };
  }

  function questionIdentity(question) {
    return String(question?.id || question?.questionId || question?.question || "unknown");
  }

  function curriculumCode(question) {
    return String(question?.curriculumCode || question?.curriculum_code || window.quizConfig?.skillCode || "unknown").toUpperCase();
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

  function correctIndex(question) {
    if (!question) return -1;
    if (Number.isInteger(question.correct)) return question.correct;
    if (Number.isInteger(question.correctIndex)) return question.correctIndex;
    if (Number.isInteger(question.correct_index)) return question.correct_index;
    if (Array.isArray(question.answers)) {
      const found = question.answers.findIndex((answer) => answer?.is_correct === true);
      if (found >= 0) return found;
    }
    if (Array.isArray(question.correctValues) && question.correctValues.length === 1 && Array.isArray(question.options)) {
      return question.options.findIndex((option) => String(option?.value ?? option) === String(question.correctValues[0]));
    }
    return -1;
  }

  function send(name, params = {}) {
    const payload = {
      curriculum_code: String(window.quizConfig?.skillCode || "unknown").toUpperCase(),
      quiz_mode: quizMode(),
      page_path: window.location.pathname,
      ...params
    };
    let attempts = 0;
    const trySend = () => {
      if (typeof window.gtag === "function") {
        window.gtag("event", name, payload);
        return;
      }
      attempts += 1;
      if (attempts < 10) window.setTimeout(trySend, 300);
    };
    trySend();
  }

  function start() {
    if (state.started) return;
    state.started = true;
    state.completed = false;
    state.answered = 0;
    state.correct = 0;
    state.startedAt = Date.now();
    state.lastQuestionId = "";
    send(quizMode() === "test" ? "test_start" : "practice_start", {
      session_question_count: Number(window.quizConfig?.maxQuestions) || 0,
      bank_question_count: allQuestions().length
    });
  }

  function answer() {
    if (!state.started || state.completed) return;
    const question = currentQuestion();
    if (!question) return;
    const id = questionIdentity(question);
    if (!id || id === state.lastQuestionId) return;
    const selected = selectedAnswerIndex();
    const expected = correctIndex(question);
    const isCorrect = selected >= 0 && expected >= 0 ? selected === expected : undefined;
    state.lastQuestionId = id;
    state.answered += 1;
    if (isCorrect === true) state.correct += 1;
    send("question_answered", {
      question_id: id,
      question_number: state.answered,
      is_correct: isCorrect === undefined ? "unknown" : isCorrect ? "true" : "false"
    });
  }

  function visibleScore() {
    const score = Number(document.getElementById("finalScore")?.textContent || document.getElementById("liveScore")?.textContent || state.correct || 0);
    const total = Number(document.getElementById("finalTotal")?.textContent || window.quizConfig?.maxQuestions || state.answered || 0);
    return {
      score: Number.isFinite(score) ? score : 0,
      total: Number.isFinite(total) ? total : 0
    };
  }

  function complete() {
    if (!state.started || state.completed) return;
    state.completed = true;
    const { score, total } = visibleScore();
    send(quizMode() === "test" ? "test_complete" : "practice_complete", {
      score,
      total,
      percentage: total > 0 ? Math.round((score / total) * 100) : 0,
      questions_answered: state.answered,
      duration_seconds: Math.max(0, Math.round((Date.now() - state.startedAt) / 1000))
    });
  }

  function abandon() {
    if (!state.started || state.completed || state.answered <= 0) return;

    // A finished final question must never become an abandon simply because the
    // shared quiz runtime navigates to a separate result page on pagehide.
    const target = Number(window.quizConfig?.maxQuestions) || 0;
    if (target > 0 && state.answered >= target) {
      complete();
      return;
    }

    send(quizMode() === "test" ? "test_abandon" : "practice_abandon", {
      questions_answered: state.answered,
      duration_seconds: Math.max(0, Math.round((Date.now() - state.startedAt) / 1000))
    });
  }

  function nextSet() {
    if (!state.completed) return;
    send(quizMode() === "test" ? "test_next_set" : "practice_next_set", {
      previous_questions_answered: state.answered
    });
    state.started = false;
    state.completed = false;
    window.setTimeout(start, 0);
  }

  function voteKey(question) {
    return `skillrQuestionVote:${curriculumCode(question)}:${questionIdentity(question)}`;
  }

  function readVote(question) {
    try { return localStorage.getItem(voteKey(question)) || ""; } catch { return ""; }
  }

  function saveVote(question, vote) {
    try { localStorage.setItem(voteKey(question), vote); } catch {}
  }

  function sendVote(question, vote, previousVote) {
    send("question_feedback", {
      curriculum_code: curriculumCode(question),
      question_id: questionIdentity(question),
      quiz_mode: quizMode(),
      vote,
      previous_vote: previousVote || "none"
    });
  }

  function ensureFeedbackStyle() {
    if (document.getElementById("skillr-question-feedback-style")) return;
    const style = document.createElement("style");
    style.id = "skillr-question-feedback-style";
    style.textContent = `
      .question-quality-feedback{display:flex;flex-wrap:wrap;align-items:center;gap:.45rem .6rem;margin:.8rem 0 .25rem;padding:.65rem .75rem;border:1px solid #d9e2ec;border-radius:14px;background:#fff}
      .question-quality-feedback p{flex:1 1 230px;margin:0;font-size:.9rem;color:#475569}
      .question-quality-feedback button{border:1px solid #cbd5e1;border-radius:999px;background:#fff;padding:.48rem .72rem;cursor:pointer;font-weight:700;font-size:.9rem}
      .question-quality-feedback button:hover{background:#f8fafc}
      .question-quality-feedback button[aria-pressed="true"]{border-color:#1a91c7;background:#effaff;color:#124f70}
      .question-quality-feedback .feedback-thanks{flex-basis:100%;font-size:.82rem;color:#64748b}
    `;
    document.head.appendChild(style);
  }

  function renderFeedback() {
    const heading = document.getElementById("questionText");
    const answerList = document.getElementById("answerList");
    const quizScreen = document.getElementById("quizScreen");
    if (!heading || !answerList || !normalise(heading.textContent)) return;
    if (quizScreen && !quizScreen.classList.contains("is-active")) return;

    const question = currentQuestion();
    if (!question) return;

    const existing = document.querySelector(".question-quality-feedback");
    if (existing?.dataset.questionId === questionIdentity(question)) return;
    existing?.remove();

    ensureFeedbackStyle();
    const box = document.createElement("div");
    box.className = "question-quality-feedback";
    box.dataset.questionId = questionIdentity(question);
    box.setAttribute("aria-label", "Question quality feedback");

    const label = document.createElement("p");
    label.textContent = "Was this question useful?";

    const like = document.createElement("button");
    like.type = "button";
    like.textContent = "👍 Like";
    like.setAttribute("aria-label", "Like this question");

    const dislike = document.createElement("button");
    dislike.type = "button";
    dislike.textContent = "👎 Dislike";
    dislike.setAttribute("aria-label", "Dislike this question");

    const thanks = document.createElement("span");
    thanks.className = "feedback-thanks";

    const refresh = () => {
      const vote = readVote(question);
      like.setAttribute("aria-pressed", vote === "up" ? "true" : "false");
      dislike.setAttribute("aria-pressed", vote === "down" ? "true" : "false");
      thanks.textContent = vote ? "Thanks — your feedback helps improve Skillr." : "";
    };

    const castVote = (value) => {
      const previous = readVote(question);
      if (previous === value) return;
      saveVote(question, value);
      sendVote(question, value, previous);
      refresh();
    };

    like.addEventListener("click", () => castVote("up"));
    dislike.addEventListener("click", () => castVote("down"));
    box.append(label, like, dislike, thanks);
    answerList.insertAdjacentElement("afterend", box);
    refresh();
  }

  function scheduleFeedback() {
    window.setTimeout(renderFeedback, 0);
    window.setTimeout(renderFeedback, 100);
    window.setTimeout(renderFeedback, 300);
  }

  function init() {
    const startButton = document.getElementById("startButton");
    const submitButton = document.getElementById("submitButton");
    if (!startButton || !submitButton) return;

    startButton.addEventListener("click", () => {
      start();
      scheduleFeedback();
    });
    submitButton.addEventListener("click", () => {
      window.setTimeout(answer, 0);
      scheduleFeedback();
    });
    document.getElementById("nextButton")?.addEventListener("click", scheduleFeedback);
    document.getElementById("restartButton")?.addEventListener("click", () => {
      nextSet();
      scheduleFeedback();
    });
    window.addEventListener("pagehide", abandon);

    const resultScreen = document.getElementById("resultScreen");
    if (resultScreen) {
      new MutationObserver(() => {
        if (resultScreen.classList.contains("is-active")) complete();
      }).observe(resultScreen, { attributes: true, attributeFilter: ["class"] });
      if (resultScreen.classList.contains("is-active")) complete();
    }

    const heading = document.getElementById("questionText");
    if (heading) {
      new MutationObserver(scheduleFeedback).observe(heading, { childList: true, characterData: true, subtree: true });
    }
    scheduleFeedback();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();