"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const key = document.body.dataset.resultKey || "skillrQuizResult";
  let data = null;
  try { data = JSON.parse(sessionStorage.getItem(key) || "null"); } catch (error) { console.error(error); }
  const list = document.getElementById("answerReviewList");
  if (!data || !Array.isArray(data.answers)) {
    document.getElementById("emptyReview")?.classList.remove("is-hidden");
    return;
  }
  data.answers.forEach((answer, index) => {
    const card = document.createElement("article");
    card.className = `card review-item ${answer.isCorrect ? "is-correct" : "is-incorrect"}`;
    const heading = document.createElement("h2");
    heading.textContent = `Question ${index + 1}: ${answer.question || "Review"}`;
    const status = document.createElement("p");
    status.textContent = answer.isCorrect ? "Correct" : "Needs another look";
    const explanation = document.createElement("p");
    explanation.textContent = answer.explanation || "Review the topic guide and try again.";
    card.append(heading, status, explanation);
    list.appendChild(card);
  });
});
