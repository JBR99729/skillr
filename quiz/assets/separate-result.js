"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const escapeCertificateText = (value) => String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  function printCertificate(data) {
    const certificateWindow = window.open("", "_blank");
    if (!certificateWindow) {
      window.alert("Please allow pop-ups to print the certificate.");
      return;
    }

    certificateWindow.document.write(`<!DOCTYPE html>
      <html lang="en-AU"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
      <title>SkillrHub Completion Certificate</title>
      <style>
        @page{size:Letter portrait;margin:.35in}
        *{box-sizing:border-box}
        html,body{margin:0;padding:0;font-family:Arial,sans-serif;color:#1f2937;background:#fff}
        .certificate{width:7.8in;min-height:9.75in;margin:0 auto;padding:.55in;display:flex;flex-direction:column;justify-content:center;border:8px solid #1a3a72;background:#fff;text-align:center;break-inside:avoid;page-break-inside:avoid;overflow:hidden}
        p{margin:.12in 0}.brand{color:#1a3a72;font-weight:800;letter-spacing:.08em;text-transform:uppercase}
        h1{margin:.2in 0;font-size:34px}.student{margin:.2in 0;font-size:30px;font-weight:800;overflow-wrap:anywhere}
        h2{margin:.16in 0;font-size:24px;line-height:1.2;overflow-wrap:anywhere}.score{font-size:20px}
        @media print{html,body{width:7.8in;height:10.3in}.certificate{width:7.8in;min-height:9.75in;max-height:10.3in}}
      </style></head><body><section class="certificate">
        <p class="brand">SkillrHub Learning</p><h1>Completion Certificate</h1><p>This certifies that</p>
        <p class="student">${escapeCertificateText(data.studentName || "Student")}</p><p>successfully completed</p>
        <h2>${escapeCertificateText(data.quizTitle || data.quizLabel || "SkillrHub test")}</h2>
        <p class="score">Score: ${Number(data.percentage) || 0}%</p><p>skillrhub.com</p>
      </section></body></html>`);
    certificateWindow.document.close();
    certificateWindow.focus();
    certificateWindow.print();
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
    const isSuccessfulTest = /test/i.test(String(data.quizLabel || "")) && Boolean(data.passed);
    if (Number(data.percentage) !== 100 && !isSuccessfulTest) return;

    const actions = document.querySelector("#savedResult .result-actions");
    if (!actions || document.getElementById("resultSharePrompt")) return;

    const url = String(data.attemptUrl || window.location.href);
    const text = "SkillrHub offers free F–10 practice, drills and printable worksheets with no learner login required.";
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

  const certificateButton = document.getElementById("certificateButton");
  if (certificateButton) {
    const certificateEligible = Number(data.percentage) > 75;
    const certificateNote = document.createElement("p");
    certificateNote.className = "certificate-eligibility-note";
    certificateNote.textContent = certificateEligible
      ? "Certificate unlocked — use Print certificate below."
      : "Print certificate is available when you score above 75%.";
    certificateButton.closest(".result-actions")?.insertAdjacentElement(
      "beforebegin",
      certificateNote
    );

    if (!certificateEligible) {
      certificateButton.remove();
    } else {
      certificateButton.removeAttribute("onclick");
      certificateButton.addEventListener("click", () => printCertificate(data));
    }
  }

  addSharePrompt(data);
});
