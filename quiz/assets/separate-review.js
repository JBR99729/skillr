"use strict";

function formatReviewAnswer(value) {
  if (value === null || value === undefined || value === "") return "No answer recorded";
  if (Array.isArray(value)) return value.map(formatReviewAnswer).join(", ");
  if (typeof value === "object") return Object.values(value).map(formatReviewAnswer).join(", ");
  return String(value);
}

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
    const selected = document.createElement("p");
    const selectedLabel = document.createElement("strong");
    selectedLabel.textContent = "Your answer: ";
    selected.append(selectedLabel, formatReviewAnswer(answer.selectedAnswer));
    const correct = document.createElement("p");
    const correctLabel = document.createElement("strong");
    correctLabel.textContent = "Correct answer: ";
    correct.append(correctLabel, formatReviewAnswer(answer.correctAnswer));
    const explanation = document.createElement("p");
    explanation.textContent = answer.explanation || "Review the topic guide and try again.";
    card.append(heading, status, selected, correct, explanation);
    list.appendChild(card);
  });
});
