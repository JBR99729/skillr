"use strict";

document.addEventListener("DOMContentLoaded", () => {
  function getResultActionUrl(action, storedUrl) {
    const match = window.location.pathname.match(
      /^(.*\/(?:practice|test)\/)result(?:\/index\.html|\/?)$/i
    );

    if (match) {
      return `${match[1]}${action}/`;
    }

    return storedUrl || `../${action}/`;
  }

  function copyLink(value) {
    if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(value);
    const input = document.createElement("textarea");
    input.value = value;
    input.setAttribute("readonly", "");
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    input.remove();
    return Promise.resolve();
  }

  function addSharePrompt(data) {
    if (data.pendingReview) return;
    const isSuccessfulTest = /test/i.test(String(data.quizLabel || "")) && Boolean(data.passed);
    if (Number(data.percentage) !== 100 && !isSuccessfulTest) return;

    const actions = document.querySelector("#savedResult .result-actions");
    if (!actions || document.getElementById("resultSharePrompt")) return;

    const url = String(data.attemptUrl || window.location.href);
    const text = "SkillrHub offers free F–10 practice, tests and printable worksheets with no learner login required.";
    const prompt = document.createElement("section");
    const buttons = document.createElement("div");
    const status = document.createElement("p");
    prompt.id = "resultSharePrompt";
    prompt.className = "result-share-prompt";
    prompt.innerHTML = "<p aria-hidden=\"true\">🌟</p><div><h2>Help another classroom or parent</h2><p>Know a teacher or parent who would value this free learning activity?</p></div>";
    buttons.className = "result-share-actions";
    status.className = "result-share-status";
    status.setAttribute("role", "status");

    const nativeButton = document.createElement("button");
    nativeButton.type = "button";
    nativeButton.textContent = "📲 Share";
    nativeButton.addEventListener("click", async () => {
      if (navigator.share) {
        try { await navigator.share({ title: data.quizTitle || document.title, text, url }); return; }
        catch (error) { if (error?.name === "AbortError") return; }
      }
      await copyLink(url);
      status.textContent = "Link copied.";
    });

    const whatsapp = document.createElement("a");
    whatsapp.href = `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`;
    whatsapp.target = "_blank";
    whatsapp.rel = "noopener noreferrer";
    whatsapp.textContent = "WhatsApp";

    const facebook = document.createElement("a");
    facebook.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    facebook.target = "_blank";
    facebook.rel = "noopener noreferrer";
    facebook.textContent = "Facebook";

    const copy = document.createElement("button");
    copy.type = "button";
    copy.textContent = "📋 Copy link";
    copy.addEventListener("click", async () => {
      await copyLink(url);
      status.textContent = "Link copied.";
    });

    buttons.append(nativeButton, whatsapp, facebook, copy);
    prompt.append(buttons, status);
    actions.insertAdjacentElement("beforebegin", prompt);
  }

  function celebrateProficientResult(data) {
    if (data.pendingReview) return;
    const percentage = Number(data.percentage) || 0;
    const isProficient = Boolean(data.passed) || percentage >= 75;

    if (!isProficient) {
      return;
    }

    document.querySelector(".quiz-celebration")?.remove();

    const isDailyDrill =
      /daily-drill/i.test(String(data.quizLabel || "")) ||
      String(data.attemptUrl || "").includes("/daily-drills/");

    const message = isDailyDrill
      ? "Congratulations — you are proficient! Great work — you are building strong daily fluency."
      : "Congratulations — you are proficient!";

    const celebration = document.createElement("div");
    celebration.className = "quiz-celebration";
    celebration.setAttribute("role", "status");
    celebration.setAttribute("aria-live", "polite");
    celebration.innerHTML = `<strong>🎉 ${message}</strong><span>${percentage}% result</span>`;

    document.body.appendChild(celebration);
    window.setTimeout(() => celebration.remove(), 5200);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const colours = ["#2457d6", "#12a06a", "#f3a712", "#8b5cf6", "#ef476f"];

    for (let index = 0; index < 36; index += 1) {
      const piece = document.createElement("i");
      piece.className = "quiz-confetti";
      piece.style.setProperty("--confetti-x", `${5 + Math.random() * 90}vw`);
      piece.style.setProperty("--confetti-delay", `${Math.random() * 0.35}s`);
      piece.style.setProperty("--confetti-colour", colours[index % colours.length]);
      document.body.appendChild(piece);
      window.setTimeout(() => piece.remove(), 2600);
    }
  }

  const key = document.body.dataset.resultKey || "skillrQuizResult";
  let data = null;
  try { data = JSON.parse(sessionStorage.getItem(key) || "null"); } catch (error) { console.error(error); }
  const empty = document.getElementById("emptyResult");
  const result = document.getElementById("savedResult");
  if (!data) { empty?.classList.remove("is-hidden"); return; }
  result?.classList.remove("is-hidden");
  document.getElementById("resultScore").textContent = data.pendingReview
    ? `${data.score} out of ${data.markedTotal} checked answers (${data.total} tasks completed)`
    : `${data.score} out of ${data.total}`;
  document.getElementById("resultPercent").textContent = `${data.percentage}%`;
  document.getElementById("resultStatus").textContent = data.pendingReview
    ? `${data.pendingReview} task${data.pendingReview === 1 ? "" : "s"} need a grown-up's check. The percentage covers checked answers only. Open Review answers to finish marking.`
    : data.passed ? "Passed" : "Keep practising";
  const name = document.getElementById("studentResultName");
  if (name && data.studentName) name.textContent = data.studentName;
  const review = document.getElementById("resultReviewLink");
  const retake = document.getElementById("resultRetakeLink");
  if (review) review.href = getResultActionUrl("review", data.reviewUrl);
  if (retake) retake.href = getResultActionUrl("retake", data.retakeUrl);

  celebrateProficientResult(data);
  addSharePrompt(data);
});
