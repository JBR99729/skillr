"use strict";

// Support for the authored Year 1 bank. Other years retain their existing rules.
(() => {
  const VERSION = "20260906-y1-original-v1";
  const escape = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

  function visualMarkup(v) {
    if (!v) return "";
    let html = "";
    const caption = v.caption || v.label || "";
    const rows = v.rows || [];
    if (v.type === "table" || v.type === "grid") {
      html = '<table class="y1-model">';
      if (v.headers?.length) html += '<thead><tr>' + v.headers.map(h => `<th scope="col">${escape(h)}</th>`).join("") + '</tr></thead>';
      html += '<tbody>' + rows.map(row => '<tr>' + row.map(cell => `<td>${escape(cell)}</td>`).join("") + '</tr>').join("") + '</tbody></table>';
    } else if (v.type === "pattern") {
      html = rows.map((row, i) => `<div class="y1-pattern"><span>${escape(v.labels?.[i] || "")}</span><span class="y1-symbols">${row.map(escape).join(" ")}</span></div>`).join("");
    } else if (v.type === "groups") {
      html = '<div class="y1-groups">' + v.groups.map(n => `<span class="y1-group" role="img" aria-label="${Number(n)} counters">${'<i aria-hidden="true"></i>'.repeat(Math.max(0, Math.min(120, Number(n) || 0)))}</span>`).join("") + '</div>';
    } else if (v.type === "bars") {
      const maximum = Math.max(...v.bars.map(b => Number(b.units)));
      const width = Math.max(390, 130 + maximum * 22), height = 15 + v.bars.length * 40;
      html = `<svg class="y1-bars" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escape(caption || 'Equal-unit bars')}">`;
      v.bars.forEach((b, i) => {
        html += `<text x="5" y="${i*40+25}" font-size="18">${escape(b.label)}</text>`;
        for (let j=0; j<Math.min(120,Number(b.units)); j++) html += `<rect x="${110+j*22}" y="${i*40+5}" width="22" height="25"/>`;
      });
      html += '</svg>';
    } else if (v.type === "tiles") {
      html = `<svg class="y1-tiles" viewBox="0 0 ${20+90*Math.max(...rows.map(r=>r.length))} ${20+90*rows.length}" role="img" aria-label="${escape(caption || 'Joined equal square tiles')}">`;
      rows.forEach((r,i)=>r.forEach((_,j)=>{html+=`<rect x="${10+j*90}" y="${10+i*90}" width="90" height="90"/>`;}));
      html += '</svg>';
    } else if (v.type === "shapes") {
      const shapes = {
        circle:'<circle cx="65" cy="58" r="35"/>', oval:'<ellipse cx="65" cy="58" rx="50" ry="29"/>',
        square:'<rect x="30" y="22" width="70" height="70"/>', rectangle:'<rect x="15" y="30" width="100" height="55"/>',
        triangle:'<polygon points="65,15 115,95 15,95"/>', pentagon:'<polygon points="65,13 112,47 94,98 36,98 18,47"/>',
        hexagon:'<polygon points="40,18 90,18 115,60 90,102 40,102 15,60"/>'
      };
      html = `<svg class="y1-shapes" viewBox="0 0 ${150*v.items.length} 145" role="img" aria-label="${escape(caption || 'Labelled shapes')}">`;
      v.items.forEach((s,i)=>{html+=`<g transform="translate(${150*i},0)">${shapes[s.shape] || ''}</g><text x="${150*i+65}" y="130" text-anchor="middle" font-size="18">${escape(s.label)}</text>`;});
      html += '</svg>';
    }
    return `<figure class="y1-visual">${html}${caption ? `<figcaption>${escape(caption)}</figcaption>` : ''}</figure>`;
  }

  function normaliseAnswer(value, format) {
    let text = String(value ?? "").toLowerCase().trim().replace(/[−–]/g, "-");
    if (format === "equation") return text.replace(/\s+/g, "");
    if (format === "number-sequence" || format === "number-parts") {
      text = text.replace(/\b(?:and|then)\b/g, ",").replace(/→/g, ",");
      if (format === "number-parts") text = text.replace(/\+/g, ",");
      // Do not discard signs, digits, units or unrelated words when checking a sequence.
      if (!/^\d+(?:[\s,;]+\d+)*[\s,;]*$/.test(text)) return text;
      return text.match(/\d+/g).map(Number).join(",");
    }
    if (format === "word-sequence") text = text.replace(/\b(?:and|then)\b/g, " ").replace(/[,;.]/g, " ");
    return text.replace(/\s+/g, " ").replace(/[.!]$/, "").trim();
  }

  function summarise(answers, passMark=75) {
    const pendingReview = answers.filter(a => a.pendingReview).length;
    const markedTotal = answers.length - pendingReview;
    const score = answers.filter(a => a.isCorrect === true && !a.pendingReview).length;
    return {score, total:answers.length, markedTotal, pendingReview,
      percentage:markedTotal ? Math.round(score/markedTotal*100) : 0,
      passed:pendingReview === 0 && markedTotal > 0 && score/markedTotal*100 >= passMark};
  }

  function renderAdultResponse(question, container, submit) {
    const instructions = document.createElement("p");
    instructions.textContent = question.responseInstructions || "Write your answer here, or do the task on paper or with objects. A grown-up will check this task after you finish.";
    const label = document.createElement("label");
    label.htmlFor = "adultReviewAnswer"; label.textContent = "Your answer or explanation";
    const input = document.createElement("textarea");
    input.id = "adultReviewAnswer"; input.className = "quiz-input"; input.rows = 4;
    const paper = document.createElement("label"); paper.className = "y1-paper-confirmation";
    const checkbox = document.createElement("input"); checkbox.id = "adultReviewPaper"; checkbox.type = "checkbox";
    paper.append(checkbox, question.completionLabel || "I have done the task on paper or with objects.");
    const update = () => {submit.disabled = !input.value.trim() && !checkbox.checked;};
    input.addEventListener("input", update); checkbox.addEventListener("change", update);
    container.append(instructions, label, input, paper); submit.textContent = "Save response";
  }

  function evaluateAdultResponse(question) {
    const input = document.getElementById("adultReviewAnswer");
    const paper = document.getElementById("adultReviewPaper");
    return {isCorrect:null, pendingReview:true,
      selectedAnswer: [input?.value.trim(), paper?.checked ? (question.completionLabel || "Completed on paper or with objects; please check the work.") : ""].filter(Boolean).join("\n"),
      correctAnswer:question.modelAnswer || question.correct};
  }

  function addAdultMarking(card, answer, index, data, key, status) {
    if (answer.gradingMode !== "adult-review") return;
    const guidance = document.createElement("p");
    guidance.textContent = "For a parent or teacher: check the child's response and any work on paper against the model and marking guidance.";
    const controls = document.createElement("div"); controls.className = "y1-marking-actions";
    const updateStatus = () => {
      status.textContent = answer.pendingReview ? "Waiting for a grown-up to check" : answer.isCorrect ? "Checked by a grown-up: correct" : "Checked by a grown-up: needs practice";
      card.className = `card review-item ${answer.pendingReview ? 'is-pending' : answer.isCorrect ? 'is-correct' : 'is-incorrect'}`;
      controls.querySelectorAll("button").forEach(b=>b.setAttribute("aria-pressed", String(!answer.pendingReview && answer.isCorrect === (b.dataset.correct === "true"))));
    };
    [true,false].forEach(correct=>{
      const button = document.createElement("button");button.type="button";
      button.className="button button-secondary";button.dataset.correct=String(correct);
      button.textContent=correct ? "Meets the task" : "Needs more practice";
      button.addEventListener("click",()=>{
        answer.pendingReview=false;answer.isCorrect=correct;answer.reviewedBy="adult";
        Object.assign(data,summarise(data.answers,data.passingPercent));
        try {
          sessionStorage.setItem(key,JSON.stringify(data));
          window.SkillrProgress?.recordAttempt({...data,reviewUpdate:true});
          if (data.bestStorageKey && window.SkillrProgress) {
            const markedAttempts = window.SkillrProgress.read().attempts.filter(a =>
              a.bankVersion === data.bankVersion && a.curriculumCode === data.curriculumCode && a.mode === data.mode && !a.pendingReview);
            localStorage.setItem(data.bestStorageKey, String(Math.max(0, ...markedAttempts.map(a=>a.score))));
          }
          updateStatus();
          document.getElementById("y1ReviewStatus").textContent = data.pendingReview ? `${data.pendingReview} task${data.pendingReview===1?'':'s'} still need a grown-up's check.` : "All tasks checked. Open the result page to see the updated score.";
        } catch (_) { document.getElementById("y1ReviewStatus").textContent="The check could not be saved. Keep this page open and try again."; }
      });
      controls.appendChild(button);
    });
    card.append(guidance,controls);updateStatus();
  }

  window.SkillrYear1Maths = {VERSION, visualMarkup, normaliseAnswer, summarise, renderAdultResponse, evaluateAdultResponse, addAdultMarking};
  if (window.quizConfig?.bankVersion === VERSION) {
    document.documentElement.classList.add("year1-maths-bank");
    const bank = window.skillrPracticeQuestions || window.skillrTestQuestions || window.quizQuestions || [];
    bank.forEach(q=>{if(q.visualModel) q.visualHtml=visualMarkup(q.visualModel);});
  }
})();
