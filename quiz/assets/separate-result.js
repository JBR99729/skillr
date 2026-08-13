"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const escapeCertificateText = (value) => String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const certificateBrandMark = `<svg class="certificate-mark" viewBox="0 0 96 96" role="img" aria-label="SkillrHub Learn and Grow"><path class="mark-book" d="M12 60V24c14-2 26 2 36 12 10-10 22-14 36-12v36c-14-2-26 2-36 12-10-10-22-14-36-12Z"/><path class="mark-fold" d="M48 36v36"/><path class="mark-s" d="M38 35c-3-4-12-4-14 1-3 8 17 5 14 15-2 7-13 7-18 2"/><path class="mark-h" d="M58 33v22m16-22v22M58 44h16"/></svg>`;

  const certificateFooter = `<footer class="certificate-footer" aria-label="SkillrHub values">
    <div class="footer-item"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5.5c3.5-.8 6.5 0 9 2.3v12c-2.5-2-5.5-2.7-9-2V5.5Zm18 0c-3.5-.8-6.5 0-9 2.3v12c2.5-2 5.5-2.7 9-2V5.5Z"/></svg><span>Educational Focus</span></div>
    <div class="footer-item"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10h16v10H4V10Zm-1-4h18v4H3V6Zm9 0v14M12 6C9 6 7 4.8 7 3.5 7 2.3 8 2 9 2c2 0 3 2.2 3 4Zm0 0c3 0 5-1.2 5-2.5C17 2.3 16 2 15 2c-2 0-3 2.2-3 4Z"/></svg><span>Free Resources</span></div>
    <div class="footer-item"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="8" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M2.5 20c.3-4 2.2-6 5.5-6s5.2 2 5.5 6m0-4.5c.8-1 2-1.5 3.5-1.5 2.8 0 4.2 2 4.5 6h-5.5"/></svg><span>For Everyone</span></div>
    <div class="footer-item"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20S4 15.3 4 9.2C4 4.5 9.8 3 12 7c2.2-4 8-2.5 8 2.2C20 15.3 12 20 12 20Z"/></svg><span>Built with Purpose</span></div>
  </footer>`;

  async function printCertificate(data) {
    const certificateWindow = window.open("", "_blank");
    if (!certificateWindow) {
      window.alert("Please allow pop-ups to print the certificate.");
      return;
    }

    try {
      certificateWindow.document.write(`<!DOCTYPE html>
      <html lang="en-AU"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
      <title>SkillrHub Completion Certificate</title>
      <style>
        @page{size:Letter portrait;margin:.35in}
        *{box-sizing:border-box}
        html,body{margin:0;padding:0;font-family:Arial,sans-serif;color:#1f2937;background:#fff}
        .certificate{width:7.8in;min-height:9.75in;margin:0 auto;padding:.48in .55in .36in;display:flex;flex-direction:column;border:8px solid #1a3a72;background:#fff;text-align:center;break-inside:avoid;page-break-inside:avoid;overflow:hidden}
        .certificate-header{display:flex;align-items:center;justify-content:center;gap:.14in}.certificate-mark{width:.82in;height:.82in}.mark-book{fill:#edf3ff;stroke:#1a3a72;stroke-width:4;stroke-linejoin:round}.mark-fold,.mark-s,.mark-h{fill:none;stroke:#1a3a72;stroke-width:4;stroke-linecap:round;stroke-linejoin:round}.mark-s,.mark-h{stroke:#d68a00}
        .certificate-main{display:flex;flex:1;flex-direction:column;justify-content:center;padding:.12in 0 .24in}
        p{margin:.12in 0}.brand{margin:0;color:#1a3a72;font-size:18px;font-weight:800;letter-spacing:.08em;text-align:left;text-transform:uppercase}.tagline{display:block;color:#58677d;font-size:11px;font-weight:700;letter-spacing:.12em;margin-top:4px}
        h1{margin:.2in 0;font-size:34px}.student{margin:.2in 0;font-size:30px;font-weight:800;overflow-wrap:anywhere}
        h2{margin:.16in 0;font-size:24px;line-height:1.2;overflow-wrap:anywhere}.score{font-size:20px}
        .certificate-footer{display:grid;grid-template-columns:repeat(4,1fr);gap:.08in;padding-top:.18in;border-top:1px solid #aab7ca;color:#1a3a72}.footer-item{display:flex;align-items:center;justify-content:center;gap:6px;min-width:0;font-size:9px;font-weight:700;line-height:1.15}.footer-item svg{width:17px;height:17px;flex:0 0 17px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
        @media print{html,body{width:7.8in;height:10.3in}.certificate{width:7.8in;min-height:9.75in;max-height:10.3in}}
      </style></head><body><section class="certificate">
        <header class="certificate-header">${certificateBrandMark}<p class="brand">SkillrHub<span class="tagline">Learn &amp; Grow</span></p></header><main class="certificate-main"><h1>Completion Certificate</h1><p>This certifies that</p>
        <p class="student">${escapeCertificateText(data.studentName || "Student")}</p><p>successfully completed</p>
        <h2>${escapeCertificateText(data.quizTitle || data.quizLabel || "SkillrHub test")}</h2>
        <p class="score">Score: ${Number(data.percentage) || 0}%</p><p>skillrhub.com</p></main>${certificateFooter}
      </section></body></html>`);
      certificateWindow.document.close();
      certificateWindow.focus();
      certificateWindow.print();
    } catch (error) {
      console.error("Certificate print failed:", error);
      window.alert("The certificate could not be prepared right now.");
    }
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
      certificateButton.addEventListener("click", () => {
        void printCertificate(data);
      });
    }
  }

  addSharePrompt(data);
});
