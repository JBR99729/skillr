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

  function roundedRect(context, x, y, width, height, radius) {
    context.beginPath();
    context.moveTo(x + radius, y);
    context.lineTo(x + width - radius, y);
    context.quadraticCurveTo(x + width, y, x + width, y + radius);
    context.lineTo(x + width, y + height - radius);
    context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    context.lineTo(x + radius, y + height);
    context.quadraticCurveTo(x, y + height, x, y + height - radius);
    context.lineTo(x, y + radius);
    context.quadraticCurveTo(x, y, x + radius, y);
    context.closePath();
    context.fill();
  }

  byId("saveSnapshot").addEventListener("click", () => {
    const state = window.SkillrProgress.read();
    const attempts = state.attempts.filter(inSelectedRange);
    const questions = attempts.reduce((sum, item) => sum + (Number(item.total) || 0), 0);
    const correct = attempts.reduce((sum, item) => sum + (Number(item.score) || 0), 0);
    const accuracy = questions ? Math.round(correct / questions * 100) : 0;
    const skills = new Set(attempts.map((item) => item.curriculumCode || item.quizTitle).filter(Boolean));
    const drills = attempts.filter((item) => item.mode === "daily-drill").length;
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 675;
    const context = canvas.getContext("2d");
    const gradient = context.createLinearGradient(0, 0, 1200, 675);
    gradient.addColorStop(0, "#eef6ff");
    gradient.addColorStop(1, "#f3ecff");
    context.fillStyle = gradient;
    context.fillRect(0, 0, 1200, 675);
    context.fillStyle = "#17335f";
    context.font = "800 34px system-ui, sans-serif";
    context.fillText("SkillrHub Progress Snapshot", 70, 82);
    context.font = "700 48px system-ui, sans-serif";
    context.fillText(state.profile.name || "Learner", 70, 150);
    context.font = "500 22px system-ui, sans-serif";
    context.fillStyle = "#52647d";
    context.fillText(`Saved locally • ${new Date().toLocaleDateString("en-AU")}`, 70, 188);
    const cards = [
      ["Questions", questions], ["Accuracy", `${accuracy}%`],
      ["Skills covered", skills.size], ["Daily drills", drills]
    ];
    cards.forEach(([label, value], index) => {
      const x = 70 + index * 270;
      context.fillStyle = "rgba(255,255,255,.9)";
      roundedRect(context, x, 245, 235, 150, 24);
      context.fillStyle = "#17335f";
      context.font = "800 42px system-ui, sans-serif";
      context.fillText(String(value), x + 24, 310);
      context.fillStyle = "#66758a";
      context.font = "600 19px system-ui, sans-serif";
      context.fillText(label, x + 24, 355);
    });
    context.fillStyle = "#17335f";
    context.font = "700 22px system-ui, sans-serif";
    context.fillText("Recent learning", 70, 470);
    context.fillStyle = "#52647d";
    context.font = "500 19px system-ui, sans-serif";
    const recent = [...attempts].sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt)).slice(0, 3);
    if (!recent.length) context.fillText("No completed activities in this date range yet.", 70, 515);
    recent.forEach((item, index) => {
      const title = activityTitle(item).slice(0, 82);
      context.fillText(`• ${title} — ${item.percentage}%`, 70, 515 + index * 38);
    });
    context.fillStyle = "#2457d6";
    context.font = "700 18px system-ui, sans-serif";
    context.fillText("skillrhub.com • No learner account required", 70, 630);
    const link = document.createElement("a");
    link.download = `SkillrHub-Progress-${new Date().toISOString().slice(0, 10)}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    byId("dashboardToolMessage").textContent = "Progress snapshot saved to this device.";
  });

  byId("saveProgress").addEventListener("click",()=>window.SkillrProgress.exportBackup());
  byId("loadProgress").addEventListener("change",async(event)=>{ try { await window.SkillrProgress.importBackup(event.target.files[0]); byId("backupMessage").textContent="Progress loaded successfully."; render(); } catch(error) { byId("backupMessage").textContent=error.message; } event.target.value=""; });
  addEventListener("beforeinstallprompt",(event)=>{ event.preventDefault(); deferredPrompt=event; });
  byId("installButton").addEventListener("click",async()=>{ if(deferredPrompt){ deferredPrompt.prompt(); await deferredPrompt.userChoice; deferredPrompt=null; } else { byId("installMessage").textContent="On iPhone or iPad, tap Share then Add to Home Screen. On desktop, use the install icon in your browser address bar."; } });
  addEventListener("skillr:progress-changed",render);
  render();
  loadCurriculumTitles();
})();
