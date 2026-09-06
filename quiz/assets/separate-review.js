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
  if (data.bankVersion && window.SkillrYear1Maths) {
    document.documentElement.classList.add("y1-review");
    const reviewStatus = document.createElement("p");
    reviewStatus.id = "y1ReviewStatus";
    reviewStatus.setAttribute("role", "status");
    reviewStatus.textContent = data.pendingReview ? `${data.pendingReview} tasks need a grown-up's check.` : "All answers have been checked.";
    const resultsLink = document.createElement("a");
    resultsLink.href = "../result/"; resultsLink.textContent = "View updated result";
    list.before(reviewStatus, resultsLink);
  }
  data.answers.forEach((answer, index) => {
    const card = document.createElement("article");
    card.className = `card review-item ${answer.pendingReview ? "is-pending" : answer.isCorrect ? "is-correct" : "is-incorrect"}`;
    const heading = document.createElement("h2");
    heading.textContent = `Question ${index + 1}: ${answer.question || "Review"}`;
    const status = document.createElement("p");
    status.textContent = answer.pendingReview ? "Waiting for a grown-up to check" : answer.isCorrect ? "Correct" : "Needs another look";
    const selected = document.createElement("p");
    const selectedLabel = document.createElement("strong");
    selectedLabel.textContent = "Your answer: ";
    selected.append(selectedLabel, formatReviewAnswer(answer.selectedAnswer));
    const correct = document.createElement("p");
    const correctLabel = document.createElement("strong");
    correctLabel.textContent = answer.gradingMode === "adult-review" ? "Example response: " : "Correct answer: ";
    correct.append(correctLabel, formatReviewAnswer(answer.correctAnswer));
    const explanation = document.createElement("p");
    explanation.textContent = answer.explanation || "Review the topic guide and try again.";
    card.append(heading, status);
    if (answer.visualModel && window.SkillrYear1Maths) {
      const model = document.createElement("div");
      model.innerHTML = window.SkillrYear1Maths.visualMarkup(answer.visualModel);
      card.appendChild(model);
    }
    card.append(selected, correct, explanation);
    if (answer.acceptanceNote) {
      const marking = document.createElement("p");
      marking.textContent = `Marking guidance: ${answer.acceptanceNote}`;
      card.appendChild(marking);
    }
    if (data.bankVersion && window.SkillrYear1Maths) {
      window.SkillrYear1Maths.addAdultMarking(card, answer, index, data, key, status);
    }
    list.appendChild(card);
  });
});
