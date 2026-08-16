(function () {
  "use strict";
  const byId = (id) => document.getElementById(id);
  let deferredPrompt = null;
  let nameSaveTimer = null;
  let curriculumTitles = new Map();

  function activityTitle(item) {
    const code = String(item.curriculumCode || "").trim();
    const storedTitle = String(item.quizTitle || "").trim();
    const mappedTitle = curriculumTitles.get(code);
    const isDrill = code.startsWith("DRILL:");
    const isTruncated = /(?:\.\.\.|…)$/.test(storedTitle);
    const readableTitle = mappedTitle || (isTruncated && !isDrill ? "Curriculum activity" : storedTitle) || "SkillrHub activity";
    return code && !isDrill ? `${code}: ${readableTitle}` : readableTitle;
  }

  async function loadCurriculumTitles() {
    try {
      const response = await fetch("/data/curriculum-units.json?v=3", { cache: "force-cache" });
      if (!response.ok) return;
      const payload = await response.json();
      curriculumTitles = new Map((payload.units || []).map((unit) => {
        if (String(unit.code).startsWith("AC9MF")) return [unit.code, unit.title];
        if (unit.code === "AC9M10P01") {
          return [unit.code, "Conditional probability language: if-then, given, of and knowing that"];
        }
        const description = String(unit.description || unit.title || "").trim().replace(/[ .]+$/, "");
        return [unit.code, description ? description[0].toUpperCase() + description.slice(1) : "Curriculum activity"];
      }));
      render();
    } catch (error) {
      console.error("Could not load curriculum titles:", error);
    }
  }

  function selectedRange() {
    const preset = byId("datePreset").value;
    const now = new Date();
    let from = null;
    let to = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
    if (preset === "7" || preset === "30") from = new Date(now.getFullYear(), now.getMonth(), now.getDate() - Number(preset) + 1);
    if (preset === "year") from = new Date(now.getFullYear(), 0, 1);
    if (preset === "custom") {
      from = byId("dateFrom").value ? new Date(`${byId("dateFrom").value}T00:00:00`) : null;
      to = byId("dateTo").value ? new Date(`${byId("dateTo").value}T23:59:59`) : to;
    }
    return { from, to };
  }

  function inSelectedRange(item) {
    const { from, to } = selectedRange();
    const date = new Date(item.completedAt);
    return (!from || date >= from) && date <= to;
  }

  function formatTime(seconds) {
    const minutes = Math.floor((Number(seconds) || 0) / 60);
    const hours = Math.floor(minutes / 60);
    return hours ? `${hours}h ${minutes % 60}m` : `${minutes}m`;
  }

  function render() {
    const state = window.SkillrProgress.read();
    const allAttempts = [...state.attempts].sort((a,b) => new Date(b.completedAt) - new Date(a.completedAt));
    const attempts = allAttempts.filter(inSelectedRange);
    const practice = attempts.filter((item) => item.mode === "practice");
    const dailyDrills = attempts.filter((item) => item.mode === "daily-drill");
    const tests = attempts.filter((item) => item.mode === "test");
    const totalQuestions = attempts.reduce((sum,item) => sum + (Number(item.total)||0),0);
    const correct = attempts.reduce((sum,item) => sum + (Number(item.score)||0),0);
    const percentage = totalQuestions ? Math.round(correct / totalQuestions * 100) : 0;
    const skills = new Map();
    attempts.forEach((item) => {
      const code = item.curriculumCode || item.quizTitle;
      const current = skills.get(code) || { mastered: false };
      if (item.mode === "test" && item.passed) current.mastered = true;
      skills.set(code, current);
    });
    const mastered = [...skills.values()].filter((item) => item.mastered).length;
    const avatar = state.profile.avatar || { type: "preset", value: "⭐" };
    byId("profileAvatar").textContent = avatar.type === "preset" ? avatar.value : "";
    byId("profileAvatar").style.backgroundImage = avatar.type === "image" ? `url(${avatar.value})` : "";
    if (document.activeElement !== byId("learnerName")) byId("learnerName").value = state.profile.name || "";
    const learnerName = state.profile.name || "Learner";
    byId("learnerNameDisplay").textContent = learnerName;
    byId("editName").setAttribute("aria-label", `Edit learner name. Current name: ${learnerName}`);
    byId("activeTime").textContent = formatTime(state.activeSeconds);
    byId("questionsPractised").textContent = [...practice, ...dailyDrills].reduce((sum,item)=>sum+(Number(item.total)||0),0);
    byId("skillsCovered").textContent = skills.size;
    byId("skillsMastered").textContent = mastered;
    byId("skillsPending").textContent = skills.size - mastered;
    byId("dailyDrillsTaken").textContent = dailyDrills.length;
    byId("testsTaken").textContent = tests.length;
    byId("accuracy").textContent = totalQuestions ? `${percentage}%` : "0%";
    const result = byId("overallResult");
    result.className = "overall-result";
    if (!totalQuestions) {
      result.classList.add("overall-result--empty");
      byId("overallLevel").textContent = "No activity yet";
      byId("overallDescription").textContent = "Complete a Daily Drill, Practice or Test to see accuracy across activities.";
      byId("overallPercentage").textContent = "—";
    } else if (percentage < 60) {
      result.classList.add("overall-result--beginner");
      byId("overallLevel").textContent = "Building accuracy";
      byId("overallDescription").textContent = `${percentage}% across ${attempts.length} completed ${attempts.length === 1 ? "activity" : "activities"}. Mastered skills are counted separately from passed Tests.`;
      byId("overallPercentage").textContent = `${percentage}%`;
    } else if (percentage <= 80) {
      result.classList.add("overall-result--proficient");
      byId("overallLevel").textContent = "Proficient accuracy";
      byId("overallDescription").textContent = `${percentage}% across ${attempts.length} completed ${attempts.length === 1 ? "activity" : "activities"}. Mastered skills are counted separately from passed Tests.`;
      byId("overallPercentage").textContent = `${percentage}%`;
    } else {
      result.classList.add("overall-result--mastery");
      byId("overallLevel").textContent = "Mastery accuracy";
      byId("overallDescription").textContent = `${percentage}% across ${attempts.length} completed ${attempts.length === 1 ? "activity" : "activities"}. Mastered skills are counted separately from passed Tests.`;
      byId("overallPercentage").textContent = `${percentage}%`;
    }
    byId("recentActivity").innerHTML = attempts.length ? attempts.slice(0,8).map((item) => `<div class="activity-item"><div><strong>${escapeHtml(activityTitle(item))}</strong><small>${item.mode === "test" ? "Test" : item.mode === "daily-drill" ? "Daily Drill" : "Practice"} · ${new Date(item.completedAt).toLocaleDateString("en-AU")}</small></div><span class="activity-score">${item.percentage}%</span></div>`).join("") : '<div class="empty-state">Complete a Daily Drill, Practice or Test and it will appear here.</div>';
  }

  function escapeHtml(value) { const node=document.createElement("span"); node.textContent=String(value||""); return node.innerHTML; }
  function saveLatestName() {
    clearTimeout(nameSaveTimer);
    window.SkillrProgress.setName(byId("learnerName").value);
  }
  function closeNameEditor({ save = true } = {}) {
    if (save) saveLatestName();
    else render();
    byId("profileNameEditor").hidden = true;
    byId("editName").focus();
  }
  byId("editName").addEventListener("click", () => {
    byId("profileNameEditor").hidden = false;
    byId("learnerName").focus();
    byId("learnerName").select();
  });
  byId("saveName").addEventListener("click", () => closeNameEditor());
  byId("learnerName").addEventListener("input", () => {
    clearTimeout(nameSaveTimer);
    nameSaveTimer = setTimeout(saveLatestName, 500);
  });
  byId("learnerName").addEventListener("change", saveLatestName);
  byId("learnerName").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      closeNameEditor();
    }
    if (event.key === "Escape") {
      event.preventDefault();
      closeNameEditor({ save: false });
    }
  });
  addEventListener("pagehide", saveLatestName);
  byId("changeAvatar").addEventListener("click",()=>{ byId("avatarPanel").hidden=false; });
  byId("closeAvatar").addEventListener("click",()=>{ byId("avatarPanel").hidden=true; });
  document.querySelectorAll("[data-avatar]").forEach((button)=>button.addEventListener("click",()=>{ window.SkillrProgress.setAvatar({type:"preset",value:button.dataset.avatar}); byId("avatarPanel").hidden=true; render(); }));
  byId("avatarUpload").addEventListener("change",(event)=>{
    const file=event.target.files[0];
    if(!file) return;
    if(!["image/png","image/jpeg","image/webp"].includes(file.type) || file.size>5*1024*1024){ byId("avatarMessage").textContent="Choose a PNG, JPG or WebP image smaller than 5 MB."; return; }
    const image=new Image();
    image.onload=()=>{ const canvas=document.createElement("canvas"); canvas.width=160; canvas.height=160; const context=canvas.getContext("2d"); const side=Math.min(image.width,image.height); context.drawImage(image,(image.width-side)/2,(image.height-side)/2,side,side,0,0,160,160); window.SkillrProgress.setAvatar({type:"image",value:canvas.toDataURL("image/jpeg",.82)}); URL.revokeObjectURL(image.src); byId("avatarPanel").hidden=true; render(); };
    image.onerror=()=>{ byId("avatarMessage").textContent="That image could not be opened."; URL.revokeObjectURL(image.src); };
    image.src=URL.createObjectURL(file); event.target.value="";
  });
  byId("datePreset").addEventListener("change",()=>{ byId("customDates").hidden=byId("datePreset").value!=="custom"; render(); });
  byId("dateFrom").addEventListener("change",render); byId("dateTo").addEventListener("change",render);

  function warmupUrl() {
    const state = window.SkillrProgress.read();
    const latest = [...state.attempts]
      .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
      .find((item) => item.attemptUrl || item.curriculumCode);
    if (latest?.attemptUrl) {
      try {
        const url = new URL(latest.attemptUrl, window.location.origin);
        if (url.origin === window.location.origin && url.pathname.startsWith("/quiz/")) {
          url.searchParams.set("warmup", "1");
          return `${url.pathname}${url.search}`;
        }
      } catch (_) {}
    }
    const code = String(latest?.curriculumCode || "").toUpperCase();
    const drill = code.match(/^DRILL:(FOUNDATION|YEAR\s*-?\s*\d+|GRADE-K)/);
    if (drill) {
      const year = drill[1] === "FOUNDATION" || drill[1] === "GRADE-K" ? "grade-k" : `year-${drill[1].replace(/\D/g, "")}`;
      return `/quiz/${year}/daily-drills/?warmup=1`;
    }
    const match = code.match(/^AC9([MES])([F\d])/);
    if (match) {
      const subject = match[1] === "M" ? "math" : match[1] === "S" ? "science" : "english";
      const year = match[2] === "F" ? "grade-k" : `year-${match[2]}`;
      return `/quiz/${year}/${subject}/${code.toLowerCase()}/practice/?warmup=1`;
    }
    return "/quiz/grade-k/math/ac9mfn01/practice/?warmup=1";
  }

  byId("quickWarmup").addEventListener("click", () => {
    window.location.href = warmupUrl();
  });

  async function dashboardQrDataUrl(url) {
    if (!window.QRCode) {
      await new Promise((resolve, reject) => {
        const existing = document.querySelector("script[data-dashboard-qr]");
        if (existing) {
          existing.addEventListener("load", resolve, { once: true });
          existing.addEventListener("error", reject, { once: true });
          return;
        }
        const script = document.createElement("script");
        script.src = "/assets/vendor/qrcode.min.js?v=1";
        script.dataset.dashboardQr = "true";
        script.addEventListener("load", resolve, { once: true });
        script.addEventListener("error", reject, { once: true });
        document.head.appendChild(script);
      });
    }
    const holder = document.createElement("div");
    new window.QRCode(holder, { text: url, width: 180, height: 180, colorDark: "#173968", colorLight: "#ffffff", correctLevel: window.QRCode.CorrectLevel.M });
    await new Promise((resolve) => requestAnimationFrame(resolve));
    return holder.querySelector("canvas")?.toDataURL("image/png") || holder.querySelector("img")?.src || "";
  }

  async function printProgressCertificate() {
    const certificateWindow = window.open("", "SkillrHubProgressCertificate", "width=1120,height=820");
    if (!certificateWindow) {
      byId("dashboardToolMessage").textContent = "Please allow pop-ups to prepare the certificate.";
      return;
    }
    certificateWindow.document.write("<!doctype html><title>Preparing SkillrHub certificate</title><p style='font:18px system-ui;padding:32px'>Preparing certificate...</p>");
    try {
      const state = window.SkillrProgress.read();
      const attempts = state.attempts.filter(inSelectedRange);
      const questions = attempts.reduce((sum, item) => sum + (Number(item.total) || 0), 0);
      const correct = attempts.reduce((sum, item) => sum + (Number(item.score) || 0), 0);
      const accuracy = questions ? Math.round(correct / questions * 100) : 0;
      const skills = new Set(attempts.map((item) => item.curriculumCode || item.quizTitle).filter(Boolean));
      const tests = attempts.filter((item) => item.mode === "test").length;
      const activeTime = formatTime(state.activeSeconds);
      const recent = [...attempts].sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt)).slice(0, 3);
      const qrDataUrl = await dashboardQrDataUrl("https://skillrhub.com/");
      const issuedDate = new Date().toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });
      const recentMarkup = recent.length
        ? recent.map((item) => `<li><span>${escapeHtml(activityTitle(item))}</span><strong>${Number(item.percentage) || 0}%</strong></li>`).join("")
        : "<li><span>No completed activities in this date range yet</span><strong>-</strong></li>";
      certificateWindow.document.open();
      certificateWindow.document.write(`<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>SkillrHub Progress Certificate</title><style>
        @page{size:A4 landscape;margin:10mm}*{box-sizing:border-box}body{margin:0;background:#edf3f8;color:#17335f;font-family:Georgia,"Times New Roman",serif}.sheet{position:relative;width:277mm;min-height:190mm;margin:10mm auto;padding:13mm 15mm 11mm;overflow:hidden;border:2px solid #173968;background:#fff;box-shadow:0 12px 36px #17396822}.sheet:before{content:"";position:absolute;inset:5mm;border:1px solid #cf9d35;pointer-events:none}.header{position:relative;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #cad6e5;padding-bottom:5mm}.brand{display:flex;align-items:center;gap:4mm;font-family:Arial,sans-serif;font-size:24px;font-weight:900}.mark{display:grid;width:14mm;height:14mm;place-items:center;border-radius:4mm;background:#173968;color:#fff;font-size:24px}.brand small{display:block;color:#66758a;font-size:9px;letter-spacing:.16em;text-transform:uppercase}.date{color:#52647d;font:12px Arial,sans-serif;text-align:right}.main{position:relative;text-align:center;padding:7mm 0 4mm}.eyebrow{margin:0;color:#9a6914;font:800 10px Arial,sans-serif;letter-spacing:.24em;text-transform:uppercase}h1{margin:2mm 0 3mm;font-size:32px;font-weight:normal}h2{margin:0;color:#173968;font-size:29px}.recognition{margin:2mm 0 0;color:#52647d;font:15px Arial,sans-serif}.metrics{position:relative;display:grid;grid-template-columns:repeat(5,1fr);gap:3mm;margin:4mm 0}.metric{padding:4mm 2mm;border:1px solid #cad6e5;background:#f7faff;text-align:center}.metric strong{display:block;color:#173968;font:900 24px Arial,sans-serif}.metric span{color:#52647d;font:700 9px Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase}.details{position:relative;display:grid;grid-template-columns:1fr 62mm;gap:6mm}.learning{padding:4mm 5mm;border:1px solid #cad6e5}.learning h3{margin:0 0 2mm;font:800 11px Arial,sans-serif;text-transform:uppercase;letter-spacing:.1em}.learning ul{list-style:none;margin:0;padding:0}.learning li{display:grid;grid-template-columns:1fr auto;gap:5mm;padding:1.5mm 0;border-top:1px solid #e4eaf1;font:11px Arial,sans-serif}.learning li:first-child{border-top:0}.share{display:grid;grid-template-columns:24mm 1fr;gap:4mm;align-items:center;padding:4mm;border:1px solid #cf9d35;background:#fffaf0}.share img{width:24mm;height:24mm}.share strong,.share span{display:block;font-family:Arial,sans-serif}.share strong{margin-bottom:1.5mm;font-size:12px}.share span{color:#52647d;font-size:9.5px;line-height:1.4}.footer{position:relative;display:flex;justify-content:space-between;margin-top:4mm;padding-top:3mm;border-top:1px solid #cad6e5;color:#52647d;font:9px Arial,sans-serif}.footer strong{color:#173968}.screen-note{text-align:center;font:13px Arial,sans-serif}@media print{body{background:#fff}.sheet{width:auto;min-height:190mm;margin:0;box-shadow:none}.screen-note{display:none}}
      </style></head><body><section class="sheet"><header class="header"><div class="brand"><span class="mark">S</span><span>SkillrHub<small>Learn &amp; Grow</small></span></div><div class="date">Presented on<br><strong>${issuedDate}</strong></div></header><main class="main"><p class="eyebrow">Certificate of Learning Progress</p><h1>This certificate recognises</h1><h2>${escapeHtml(state.profile.name || "Learner")}</h2><p class="recognition">for committed learning and continued growth with SkillrHub.</p></main><section class="metrics"><div class="metric"><strong>${activeTime}</strong><span>Active learning time</span></div><div class="metric"><strong>${questions}</strong><span>Questions</span></div><div class="metric"><strong>${accuracy}%</strong><span>Accuracy</span></div><div class="metric"><strong>${skills.size}</strong><span>Skills covered</span></div><div class="metric"><strong>${tests}</strong><span>Tests completed</span></div></section><section class="details"><div class="learning"><h3>Recent learning</h3><ul>${recentMarkup}</ul></div><div class="share">${qrDataUrl ? `<img src="${qrDataUrl}" alt="QR code to SkillrHub">` : ""}<div><strong>Share free learning</strong><span>Scan to visit skillrhub.com. Share SkillrHub with families and teachers looking for free Australian Curriculum learning resources.</span></div></div></section><footer class="footer"><span><strong>SkillrHub</strong> - Free F-10 Australian Curriculum learning</span><span>skillrhub.com - No learner login required</span></footer></section><p class="screen-note">Choose Print or Save as PDF in the print dialog.</p></body></html>`);
      certificateWindow.addEventListener("load", () => {
        certificateWindow.focus();
        certificateWindow.print();
      }, { once: true });
      certificateWindow.document.close();
      byId("dashboardToolMessage").textContent = "Progress certificate prepared with a SkillrHub QR code.";
    } catch (error) {
      certificateWindow.close();
      console.error("Dashboard certificate failed:", error);
      byId("dashboardToolMessage").textContent = "The certificate could not be prepared right now.";
    }
  }

  byId("printScores").addEventListener("click", () => { void printProgressCertificate(); });

  function closeResetPanel() {
    byId("resetPanel").hidden = true;
    byId("openReset").setAttribute("aria-expanded", "false");
    byId("resetCode").value = "";
    byId("resetMessage").textContent = "";
  }

  byId("openReset").addEventListener("click", () => {
    const opening = byId("resetPanel").hidden;
    byId("resetPanel").hidden = !opening;
    byId("openReset").setAttribute("aria-expanded", String(opening));
    if (opening) byId("resetCode").focus();
  });
  byId("cancelReset").addEventListener("click", closeResetPanel);
  byId("confirmReset").addEventListener("click", () => {
    if (byId("resetCode").value !== "1234") {
      byId("resetMessage").textContent = "Incorrect reset code. Progress has not been changed.";
      byId("resetCode").select();
      return;
    }
    window.SkillrProgress.reset();
    closeResetPanel();
    byId("dashboardToolMessage").textContent = "Dashboard reset. A fresh daily practice record has started.";
  });
  byId("resetCode").addEventListener("keydown", (event) => {
    if (event.key === "Enter") byId("confirmReset").click();
    if (event.key === "Escape") closeResetPanel();
  });

  byId("saveProgress").addEventListener("click",()=>window.SkillrProgress.exportBackup());
  byId("loadProgress").addEventListener("change",async(event)=>{ try { await window.SkillrProgress.importBackup(event.target.files[0]); byId("backupMessage").textContent="Progress loaded successfully."; render(); } catch(error) { byId("backupMessage").textContent=error.message; } event.target.value=""; });
  addEventListener("beforeinstallprompt",(event)=>{ event.preventDefault(); deferredPrompt=event; });
  byId("installButton").addEventListener("click",async()=>{ if(deferredPrompt){ deferredPrompt.prompt(); await deferredPrompt.userChoice; deferredPrompt=null; } else { byId("installMessage").textContent="On iPhone or iPad, tap Share then Add to Home Screen. On desktop, use the install icon in your browser address bar."; } });
  addEventListener("skillr:progress-changed",render);
  render();
  loadCurriculumTitles();
})();
