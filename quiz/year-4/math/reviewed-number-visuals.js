"use strict";

// Keep the authored mathematics models visible when a learner revisits an answer.
// This adapter is loaded only by the scoped N01–N09, A01–A02 and M01–M04 pages.
document.addEventListener("DOMContentLoaded", () => {
  const code = location.pathname.match(/\/math\/(ac9m4(?:n0[1-9]|a0[12]|m0[1-4]))\//)?.[1];
  const bank = window.quizQuestions;
  if (!code || !Array.isArray(bank)) return;
  let result;
  try {
    result = JSON.parse(sessionStorage.getItem(document.body.dataset.resultKey) || "null");
  } catch {
    return;
  }
  if (!Array.isArray(result?.answers) || !document.body.dataset.bankVersion || result.bankVersion !== document.body.dataset.bankVersion) return;
  const byId = new Map(bank.map(item => [String(item.id).toLowerCase(), item]));
  const namespace = "http://www.w3.org/2000/svg";
  document.querySelectorAll("#answerReviewList .review-item").forEach((card, index) => {
    const answer = result.answers[index];
    const item = byId.get(String(answer?.questionId || "").toLowerCase());
    // A saved attempt may belong to an older bank. Do not attach a newer,
    // unrelated model just because a question ID has been reused.
    if (!item || item.question !== answer.question || item.explanation !== answer.explanation) return;
    const correct = item.gradingMode === "adult-review" ? item.modelAnswer : item.answers?.[item.correct];
    if (correct !== answer.correctAnswer) return;
    const visual = item.visualMeta;
    const localModel = new RegExp(`^/assets/assessment-visuals/year4/math/${code}(?:/[a-zA-Z0-9_-]+)*\\.svg#[a-zA-Z0-9_-]+$`);
    if (visual?.type !== "svg" || !localModel.test(visual.asset_path || "")) return;
    const heading = card.querySelector("h2");
    if (!heading || card.querySelector(".reviewed-number-model")) return;
    const svg = document.createElementNS(namespace, "svg");
    svg.classList.add("reviewed-number-model");
    svg.setAttribute("viewBox", "0 0 640 300");
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", visual.alt_text || "");
    svg.style.cssText = "display:block;width:100%;max-width:640px;height:auto;margin:1rem auto;";
    const use = document.createElementNS(namespace, "use");
    use.setAttribute("href", visual.asset_path);
    svg.appendChild(use);
    heading.after(svg);
  });
});
