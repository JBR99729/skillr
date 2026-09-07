"use strict";
// Restore the reviewed bank's illustration beside each saved response.
// Loaded only by AC9E3LA09 review pages, after their matching question bank.
document.addEventListener("DOMContentLoaded", () => {
  const bank = window.quizQuestions;
  if (!Array.isArray(bank)) return;
  const namespace = "http://www.w3.org/2000/svg";
  document.querySelectorAll("#answerReviewList .review-item").forEach(card => {
    const heading = card.querySelector("h2");
    if (!heading) return;
    const question = heading.textContent.replace(/^Question \d+: /, "");
    const item = bank.find(item => item.question === question);
    const visual = item?.visualMeta;
    if (visual?.type !== "svg" || !visual.asset_path) return;
    const svg = document.createElementNS(namespace, "svg");
    svg.setAttribute("viewBox", "0 0 640 300");
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", visual.alt_text);
    svg.style.cssText = "display:block;width:100%;max-width:640px;height:auto;margin:1rem auto;";
    const use = document.createElementNS(namespace, "use");
    use.setAttribute("href", visual.asset_path);
    svg.appendChild(use);
    heading.after(svg);
  });
});
