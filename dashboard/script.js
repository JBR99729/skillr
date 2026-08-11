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
    byId("welcomeHeading").textContent = state.profile.name ? `Welcome, ${state.profile.name}!` : "Welcome!";
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
  byId("saveName").addEventListener("click", saveLatestName);
  byId("learnerName").addEventListener("input", () => {
    clearTimeout(nameSaveTimer);
    nameSaveTimer = setTimeout(saveLatestName, 500);
  });
  byId("learnerName").addEventListener("change", saveLatestName);
  byId("learnerName").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      saveLatestName();
      byId("learnerName").blur();
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
  byId("saveProgress").addEventListener("click",()=>window.SkillrProgress.exportBackup());
  byId("loadProgress").addEventListener("change",async(event)=>{ try { await window.SkillrProgress.importBackup(event.target.files[0]); byId("backupMessage").textContent="Progress loaded successfully."; render(); } catch(error) { byId("backupMessage").textContent=error.message; } event.target.value=""; });
  addEventListener("beforeinstallprompt",(event)=>{ event.preventDefault(); deferredPrompt=event; });
  byId("installButton").addEventListener("click",async()=>{ if(deferredPrompt){ deferredPrompt.prompt(); await deferredPrompt.userChoice; deferredPrompt=null; } else { byId("backupMessage").textContent="On iPhone or iPad, tap Share then Add to Home Screen. On desktop, use the install icon in your browser address bar."; } });
  addEventListener("skillr:progress-changed",render);
  render();
  loadCurriculumTitles();
})();
