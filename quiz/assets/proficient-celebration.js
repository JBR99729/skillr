"use strict";

(function () {
  function ensureStyles() {
    if (document.getElementById("skillr-proficient-celebration-styles")) return;
    var style = document.createElement("style");
    style.id = "skillr-proficient-celebration-styles";
    style.textContent = ".skillr-proficient-banner{margin:1rem 0;padding:1rem 1.1rem;border:2px solid #12a06a;border-radius:18px;background:#ecfdf5;color:#14532d;box-shadow:0 12px 32px rgba(18,160,106,.16)}.skillr-proficient-banner strong{display:block;font-size:1.22rem;margin-bottom:.25rem}.skillr-proficient-banner span{display:block;line-height:1.45}.skillr-proficient-confetti{position:fixed;top:-16px;left:var(--confetti-x);z-index:9999;width:10px;height:16px;border-radius:3px;background:var(--confetti-colour);opacity:.95;pointer-events:none;animation:skillrConfettiFall 2.4s ease-in forwards;animation-delay:var(--confetti-delay)}@keyframes skillrConfettiFall{0%{transform:translateY(-20px) rotate(0deg)}100%{transform:translateY(110vh) rotate(700deg);opacity:.1}}@media (prefers-reduced-motion: reduce){.skillr-proficient-confetti{display:none}}";
    document.head.appendChild(style);
  }

  function getThreshold(data) {
    return Number(data && (data.passingPercent || data.passMark)) || 75;
  }

  function isDailyDrill(data) {
    var label = String((data && data.quizLabel) || "");
    var url = String((data && data.attemptUrl) || window.location.href);
    return /daily\s*drill/i.test(label) || /\/daily-drills\//i.test(url);
  }

  function addConfetti() {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var colours = ["#2457d6", "#12a06a", "#f3a712", "#8b5cf6", "#ef476f", "#06b6d4"];
    for (var index = 0; index < 44; index += 1) {
      var piece = document.createElement("i");
      piece.className = "skillr-proficient-confetti";
      piece.style.setProperty("--confetti-x", (4 + Math.random() * 92) + "vw");
      piece.style.setProperty("--confetti-delay", (Math.random() * 0.55) + "s");
      piece.style.setProperty("--confetti-colour", colours[index % colours.length]);
      document.body.appendChild(piece);
      window.setTimeout(function (node) { node.remove(); }, 2900, piece);
    }
  }

  function showBanner(data) {
    ensureStyles();
    document.querySelector(".skillr-proficient-banner")?.remove();
    var actions = document.querySelector("#savedResult .result-actions, .result-screen .result-actions, #resultScreen .result-actions");
    var certificateButton = document.getElementById("certificateButton");
    var banner = document.createElement("section");
    var detail = isDailyDrill(data)
      ? "Great work — you are building strong daily fluency."
      : certificateButton
        ? "You reached the mastery target. Your certificate is unlocked below."
        : "You reached the mastery target for this activity.";
    banner.className = "skillr-proficient-banner";
    banner.setAttribute("role", "status");
    banner.setAttribute("aria-live", "polite");
    banner.innerHTML = "<strong>🎉 Congratulations — you are proficient!</strong><span>" + detail + "</span>";
    if (actions && actions.parentNode) actions.insertAdjacentElement("beforebegin", banner);
    else document.body.prepend(banner);
    addConfetti();
  }

  function celebrate(data) {
    var percentage = Number(data && data.percentage) || 0;
    if (percentage < getThreshold(data)) return;
    var status = document.getElementById("resultStatus");
    if (status) status.textContent = "Congratulations — you are proficient!";
    showBanner(data || {});
  }

  document.addEventListener("skillr:quiz-complete", function (event) {
    celebrate(event.detail || {});
  });

  document.addEventListener("DOMContentLoaded", function () {
    var key = document.body && document.body.dataset && document.body.dataset.resultKey || "skillrQuizResult";
    try {
      var data = JSON.parse(sessionStorage.getItem(key) || "null");
      if (data) window.setTimeout(function () { celebrate(data); }, 100);
    } catch (error) {
      console.error("Skillr proficiency celebration failed:", error);
    }
  }, { once: true });

  window.SkillrProficientCelebration = { celebrate: celebrate };
})();
