(function () {
  "use strict";

  var HOME_KEY = "skillrhubOnboardingSeen";
  var DASHBOARD_KEY = "skillrhubDashboardOnboardingSeen";

  function storageGet(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }

  function storageSet(key, value) {
    try { localStorage.setItem(key, value); } catch (e) {}
  }

  function isHome() {
    return location.pathname === "/" || location.pathname === "/index.html";
  }

  function isDashboard() {
    return /^\/dashboard\/?$/i.test(location.pathname);
  }

  function currentKey() {
    return isDashboard() ? DASHBOARD_KEY : HOME_KEY;
  }

  function seen() {
    return storageGet(currentKey()) === "1";
  }

  function remember() {
    storageSet(currentKey(), "1");
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function addStyles() {
    if (document.getElementById("skillr-first-visit-styles")) return;
    var style = document.createElement("style");
    style.id = "skillr-first-visit-styles";
    style.textContent = ".skillr-first-visit{position:fixed;inset:0;z-index:10000;display:grid;place-items:center;padding:16px;background:rgba(9,24,48,.72);backdrop-filter:blur(6px)}.skillr-first-visit[hidden]{display:none}.skillr-first-visit__panel{width:min(700px,100%);max-height:calc(100vh - 32px);overflow:auto;background:#fff;color:#17335f;border-radius:24px;padding:28px;box-shadow:0 24px 80px rgba(0,0,0,.3);position:relative}.skillr-first-visit__close{position:absolute;right:14px;top:10px;border:0;background:none;font-size:28px;color:#49627e;cursor:pointer}.skillr-first-visit__eyebrow{margin:0 42px 8px 0;color:#2457d6;font-weight:800;text-transform:uppercase;letter-spacing:.08em;font-size:.78rem}.skillr-first-visit h2{margin:0 42px 12px 0;font-size:clamp(1.7rem,4vw,2.35rem);line-height:1.1}.skillr-first-visit__lead{margin:0 0 16px;color:#49627e;line-height:1.55}.skillr-first-visit__highlight{display:flex;gap:12px;align-items:flex-start;padding:14px 16px;margin:0 0 18px;border:2px solid #2457d6;border-radius:16px;background:#eef4ff}.skillr-first-visit__tick{display:grid;place-items:center;width:34px;height:34px;flex:0 0 34px;border-radius:50%;background:#2457d6;color:#fff;font-weight:900}.skillr-first-visit__highlight strong{display:block;font-size:1.1rem}.skillr-first-visit ol{list-style:none;margin:0;padding:0;display:grid;gap:10px}.skillr-first-visit li{display:grid;grid-template-columns:34px 1fr;gap:12px;padding:10px 0;border-bottom:1px solid #e5edf8}.skillr-first-visit li:last-child{border-bottom:0}.skillr-first-visit__step{display:grid;place-items:center;width:32px;height:32px;border-radius:50%;background:#f4b740;font-weight:900}.skillr-first-visit li strong{display:block;margin-bottom:2px}.skillr-first-visit li span:last-child{color:#49627e;line-height:1.45}.skillr-first-visit__privacy{color:#49627e;font-size:.93rem;line-height:1.45}.skillr-first-visit__actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:18px}.skillr-first-visit__start,.skillr-first-visit__dismiss{min-height:48px;border-radius:12px;padding:12px 18px;font:inherit;font-weight:800;cursor:pointer}.skillr-first-visit__start{flex:1 1 260px;border:2px solid #2457d6;background:#2457d6;color:#fff}.skillr-first-visit__dismiss{border:2px solid #cbd8ea;background:#fff;color:#17335f}@media(max-width:560px){.skillr-first-visit__panel{padding:24px 20px 20px}.skillr-first-visit__actions{display:grid}.skillr-first-visit__start,.skillr-first-visit__dismiss{width:100%}}";
    document.head.appendChild(style);
  }

  function homeContent() {
    return {
      eyebrow: "Welcome to SkillrHub",
      title: "Teach, practise, test and track progress",
      lead: "SkillrHub is built for quick home and classroom learning: open a year level, choose a subject, then move through teaching support, worksheets, practice, tests and drills.",
      highlightTitle: "No login required",
      highlightText: "Start immediately — progress is saved locally on this device.",
      steps: [
        ["Choose a year and topic", "Pick Foundation to Year 10, then open Maths, Science or English topic pages."],
        ["Use the learning tools", "Topic Guides, Teacher Slides and printable Worksheets help students learn before they practise."],
        ["Practise, test and revise", "Practice gives feedback, Tests check mastery, Daily Drills keep skills fresh, and some Tests offer certificates after 75% or higher where enabled."],
        ["Track and protect progress", "The Dashboard shows local progress. Use Backup/Export and Restore/Import to keep a copy when supported."],
        ["Install for easier access", "Use the app install option for a faster, app-like experience when your browser supports it."]
      ],
      privacy: "Progress stays on this device unless you choose to export a backup file.",
      start: "Start learning",
      dismiss: "Skip tour",
      target: function () { return document.getElementById("choose-year") || document.querySelector(".site-search__input"); }
    };
  }

  function dashboardContent() {
    return {
      eyebrow: "Dashboard guide",
      title: "Track learning on this device",
      lead: "The Dashboard helps families see what has been practised, which skills are improving, and which areas may need review.",
      highlightTitle: "Progress is private and local",
      highlightText: "SkillrHub saves progress in this browser on this device. No learner account is required.",
      steps: [
        ["Check the snapshot", "See active learning time, questions practised, skills covered, accuracy, tests and Daily Drills."],
        ["Watch mastery", "Passed tests show stronger skills. Pending skills are topics that may need another practice or retake."],
        ["Backup progress", "Use Save My Progress to export a private progress file before changing devices or clearing browser data."],
        ["Restore progress", "Use Load My Progress to bring a saved progress file back into this browser."],
        ["Install app", "Use Install app if available for a smoother, app-like way to return to learning and the Dashboard."]
      ],
      privacy: "Backup files stay under your control. Keep a copy somewhere safe if you want to move progress to another device.",
      start: "View my snapshot",
      dismiss: "Close guide",
      target: function () { return document.getElementById("filterHeading") || document.querySelector(".dashboard-quick-tools"); }
    };
  }

  function getContent() {
    return isDashboard() ? dashboardContent() : homeContent();
  }

  function renderSteps(steps) {
    return steps.map(function (step, index) {
      return '<li><span class="skillr-first-visit__step">' + (index + 1) + '</span><span><strong>' + escapeHtml(step[0]) + '</strong>' + escapeHtml(step[1]) + '</span></li>';
    }).join("");
  }

  function build() {
    var existing = document.getElementById("skillr-first-visit");
    if (existing) return existing;
    addStyles();
    var content = getContent();
    var wrap = document.createElement("div");
    wrap.id = "skillr-first-visit";
    wrap.className = "skillr-first-visit";
    wrap.hidden = true;
    wrap.innerHTML = '<section class="skillr-first-visit__panel" role="dialog" aria-modal="true" aria-labelledby="skillr-first-visit-title"><button class="skillr-first-visit__close" type="button" aria-label="Close instructions">×</button><p class="skillr-first-visit__eyebrow">' + escapeHtml(content.eyebrow) + '</p><h2 id="skillr-first-visit-title">' + escapeHtml(content.title) + '</h2><p class="skillr-first-visit__lead">' + escapeHtml(content.lead) + '</p><div class="skillr-first-visit__highlight"><span class="skillr-first-visit__tick" aria-hidden="true">✓</span><span><strong>' + escapeHtml(content.highlightTitle) + '</strong>' + escapeHtml(content.highlightText) + '</span></div><ol>' + renderSteps(content.steps) + '</ol><p class="skillr-first-visit__privacy"><strong>Privacy:</strong> ' + escapeHtml(content.privacy) + '</p><div class="skillr-first-visit__actions"><button class="skillr-first-visit__start" type="button">' + escapeHtml(content.start) + '</button><button class="skillr-first-visit__dismiss" type="button">' + escapeHtml(content.dismiss) + '</button></div></section>';
    document.body.appendChild(wrap);

    function close(markSeen) {
      if (markSeen !== false) remember();
      wrap.hidden = true;
      document.body.style.overflow = "";
    }

    wrap.querySelector(".skillr-first-visit__close").addEventListener("click", close);
    wrap.querySelector(".skillr-first-visit__dismiss").addEventListener("click", close);
    wrap.querySelector(".skillr-first-visit__start").addEventListener("click", function () {
      close();
      var target = content.target();
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    wrap.addEventListener("click", function (event) { if (event.target === wrap) close(); });
    document.addEventListener("keydown", function (event) { if (event.key === "Escape" && !wrap.hidden) close(); });
    return wrap;
  }

  function open() {
    var wrap = build();
    wrap.hidden = false;
    document.body.style.overflow = "hidden";
    setTimeout(function () { wrap.querySelector(".skillr-first-visit__close").focus(); }, 0);
  }

  function addReopenLink() {
    var nav = document.querySelector("footer .footer-nav");
    if (nav && !nav.querySelector("[data-skillr-onboarding-open]")) {
      var link = document.createElement("a");
      link.href = "#how-to-use-skillrhub";
      link.textContent = "How to use SkillrHub";
      link.setAttribute("data-skillr-onboarding-open", "");
      link.addEventListener("click", function (event) { event.preventDefault(); open(); });
      nav.appendChild(link);
    }

    var dashboardNav = document.querySelector(".dashboard-nav");
    if (dashboardNav && !dashboardNav.querySelector("[data-skillr-onboarding-open]")) {
      var button = document.createElement("button");
      button.type = "button";
      button.textContent = "Dashboard guide";
      button.setAttribute("data-skillr-onboarding-open", "");
      button.style.border = "0";
      button.style.background = "transparent";
      button.style.color = "inherit";
      button.style.font = "inherit";
      button.style.cursor = "pointer";
      button.addEventListener("click", function (event) { event.preventDefault(); open(); });
      dashboardNav.appendChild(button);
    }
  }

  function init() {
    if (!isHome() && !isDashboard()) return;
    build();
    addReopenLink();
    if (!seen()) setTimeout(open, 350);
  }

  window.SkillrOnboarding = { open: open };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
