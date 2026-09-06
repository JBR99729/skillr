"use strict";

(() => {
  if (window.__skillrDailyDrillAnalyticsInstalled) return;
  if (!/\/daily-drills\//i.test(window.location.pathname)) return;
  window.__skillrDailyDrillAnalyticsInstalled = true;

  const state = {
    started: false,
    completed: false,
    answered: 0,
    correct: 0,
    startedAt: 0,
    lastQuestionId: ""
  };

  const meta = () => window.skillrDailyDrillMeta || {};
  const activeQuestions = () => Array.isArray(window.skillrActiveQuestions)
    ? window.skillrActiveQuestions
    : Array.isArray(window.quizQuestions)
      ? window.quizQuestions
      : [];

  function normalise(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function compactHash(text) {
    let hash = 0;
    const value = normalise(text);
    for (let i = 0; i < value.length; i += 1) hash = ((hash << 5) - hash + value.charCodeAt(i)) | 0;
    return Math.abs(hash).toString(36);
  }

  function questionId(question) {
    return String(question?.id || question?.questionId || question?.question || "unknown");
  }

  function currentQuestion() {
    const text = normalise(document.getElementById("questionText")?.textContent);
    if (!text) return null;
    const exact = activeQuestions().find((question) => normalise(question?.question) === text);
    if (exact) return exact;
    const drill = meta();
    return {
      id: `daily-${drill.year || "x"}-${drill.subject || "x"}-${drill.skill || "x"}-${compactHash(text)}`,
      question: text
    };
  }

  function curriculumCode(question) {
    const direct = question?.curriculumCode || question?.curriculum_code || question?.code;
    if (direct) return String(direct).toUpperCase();
    const drill = meta();
    return `DAILY-${String(drill.year || "X").toUpperCase()}-${String(drill.subject || "X").toUpperCase()}-${String(drill.skill || "X").toUpperCase()}`;
  }

  function basePayload(question) {
    const drill = meta();
    return {
      curriculum_code: curriculumCode(question),
      quiz_mode: "daily_drill",
      page_path: window.location.pathname,
      drill_year: String(drill.year || window.SKILLR_DAILY_YEAR || ""),
      drill_subject: String(drill.subject || window.SKILLR_DAILY_SUBJECT || ""),
      drill_skill: String(drill.skill || window.SKILLR_DAILY_SKILL || "")
    };
  }

  function send(name, params = {}, question = null) {
    const payload = { ...basePayload(question), ...params };
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

  function selectedAnswerIndex() {
    const checked = document.querySelector('#answerList input[type="radio"]:checked');
    if (checked) {
      const radios = [...document.querySelectorAll('#answerList input[type="radio"]')];
      return radios.indexOf(checked);
    }
    const selected = document.querySelector('#answerList .answer-option[aria-pressed="true"], #answerList .answer-option.is-selected, #answerList .selected');
    if (!selected) return -1;
    const options = [...document.querySelectorAll('#answerList .answer-option')];
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
    return -1;
  }

  function start() {
    if (state.started) return;
    state.started = true;
    state.completed = false;
    state.answered = 0;
    state.correct = 0;
    state.startedAt = Date.now();
    state.lastQuestionId = "";
    send("drill_start", {
      session_question_count: activeQuestions().length,
      bank_question_count: Number(meta().bankSize) || 0
    });
  }

  function trackAnswer() {
    if (!state.started || state.completed) return;
    const question = currentQuestion();
    if (!question) return;
    const id = questionId(question);
    if (!id || state.lastQuestionId === id) return;

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
    }, question);
  }

  function visibleScore() {
    const score = Number(document.getElementById("finalScore")?.textContent || document.getElementById("liveScore")?.textContent || state.correct || 0);
    const total = Number(document.getElementById("finalTotal")?.textContent || activeQuestions().length || state.answered || 0);
    return {
      score: Number.isFinite(score) ? score : 0,
      total: Number.isFinite(total) ? total : 0
    };
  }

  function complete() {
    if (!state.started || state.completed) return;
    state.completed = true;
    const { score, total } = visibleScore();
    send("drill_complete", {
      score,
      total,
      percentage: total > 0 ? Math.round((score / total) * 100) : 0,
      questions_answered: state.answered,
      duration_seconds: Math.max(0, Math.round((Date.now() - state.startedAt) / 1000))
    });
  }

  function abandon() {
    if (!state.started || state.completed || state.answered <= 0) return;
    send("drill_abandon", {
      questions_answered: state.answered,
      duration_seconds: Math.max(0, Math.round((Date.now() - state.startedAt) / 1000))
    });
  }

  function nextSet() {
    if (!state.completed) return;
    send("drill_next_set", { previous_questions_answered: state.answered });
    state.started = false;
    state.completed = false;
    window.setTimeout(start, 0);
  }

  function voteKey(question) {
    return `skillrQuestionVote:${curriculumCode(question)}:${questionId(question)}`;
  }

  function readVote(question) {
    try { return localStorage.getItem(voteKey(question)) || ""; } catch { return ""; }
  }

  function saveVote(question, vote) {
    try { localStorage.setItem(voteKey(question), vote); } catch {}
  }

  function sendVote(question, vote, previousVote) {
    send("question_feedback", {
      question_id: questionId(question),
      vote,
      previous_vote: previousVote || "none"
    }, question);
  }

  function ensureStyle() {
    if (document.getElementById("skillr-daily-feedback-style")) return;
    const style = document.createElement("style");
    style.id = "skillr-daily-feedback-style";
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
    const quizScreen = document.getElementById("quizScreen");
    const answerList = document.getElementById("answerList");
    const heading = document.getElementById("questionText");
    if (!answerList || !heading || !normalise(heading.textContent)) return;
    if (quizScreen && !quizScreen.classList.contains("is-active") && quizScreen.hidden) return;

    const question = currentQuestion();
    if (!question) return;
    const id = questionId(question);
    const existing = document.querySelector(".question-quality-feedback");
    if (existing?.dataset.questionId === id) return;
    existing?.remove();

    ensureStyle();
    const box = document.createElement("div");
    box.className = "question-quality-feedback";
    box.dataset.questionId = id;
    box.setAttribute("aria-label", "Question quality feedback");

    const label = document.createElement("p");
    label.textContent = "Was this question useful?";
    const like = document.createElement("button");
    const dislike = document.createElement("button");
    const thanks = document.createElement("span");
    like.type = dislike.type = "button";
    like.textContent = "👍 Like";
    dislike.textContent = "👎 Dislike";
    like.setAttribute("aria-label", "Like this question");
    dislike.setAttribute("aria-label", "Dislike this question");
    thanks.className = "feedback-thanks";

    const refresh = () => {
      const vote = readVote(question);
      like.setAttribute("aria-pressed", vote === "up" ? "true" : "false");
      dislike.setAttribute("aria-pressed", vote === "down" ? "true" : "false");
      thanks.textContent = vote ? "Thanks — your feedback helps improve Skillr." : "";
    };

    const cast = (value) => {
      const previous = readVote(question);
      if (previous === value) return;
      saveVote(question, value);
      sendVote(question, value, previous);
      refresh();
    };

    like.addEventListener("click", () => cast("up"));
    dislike.addEventListener("click", () => cast("down"));
    box.append(label, like, dislike, thanks);
    answerList.insertAdjacentElement("afterend", box);
    refresh();
  }

  function scheduleFeedback() {
    window.setTimeout(renderFeedback, 0);
    window.setTimeout(renderFeedback, 80);
    window.setTimeout(renderFeedback, 250);
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
      trackAnswer();
      scheduleFeedback();
    });
    document.getElementById("nextButton")?.addEventListener("click", scheduleFeedback);
    document.getElementById("restartButton")?.addEventListener("click", () => {
      nextSet();
      scheduleFeedback();
    });

    document.addEventListener("skillr:quiz-complete", complete);
    window.addEventListener("pagehide", abandon);

    const resultScreen = document.getElementById("resultScreen");
    if (resultScreen) {
      new MutationObserver(() => {
        if (resultScreen.classList.contains("is-active") || !resultScreen.hidden) complete();
      }).observe(resultScreen, { attributes: true, attributeFilter: ["class", "hidden"] });
    }

    const heading = document.getElementById("questionText");
    if (heading) new MutationObserver(scheduleFeedback).observe(heading, { childList: true, characterData: true, subtree: true });
    scheduleFeedback();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
