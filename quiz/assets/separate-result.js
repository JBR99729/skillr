"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const key = document.body.dataset.resultKey || "skillrQuizResult";
  let data = null;
  try { data = JSON.parse(sessionStorage.getItem(key) || "null"); } catch (error) { console.error(error); }
  const empty = document.getElementById("emptyResult");
  const result = document.getElementById("savedResult");
  if (!data) { empty?.classList.remove("is-hidden"); return; }
  result?.classList.remove("is-hidden");
  document.getElementById("resultScore").textContent = `${data.score} out of ${data.total}`;
  document.getElementById("resultPercent").textContent = `${data.percentage}%`;
  document.getElementById("resultStatus").textContent = data.passed ? "Passed" : "Keep practising";
  const name = document.getElementById("studentResultName");
  if (name && data.studentName) name.textContent = data.studentName;
  const review = document.getElementById("resultReviewLink");
  const retake = document.getElementById("resultRetakeLink");
  if (review) review.href = data.reviewUrl;
  if (retake) retake.href = data.retakeUrl;
  if (!data.passed) document.getElementById("certificateButton")?.remove();
});
