(function () {
  "use strict";

  var KEY = "skillrhubOnboardingSeen";

  function seen() {
    try { return localStorage.getItem(KEY) === "1"; } catch (e) { return false; }
  }

  function remember() {
    try { localStorage.setItem(KEY, "1"); } catch (e) {}
  }

  function addStyles() {
    if (document.getElementById("skillr-first-visit-styles")) return;
    var style = document.createElement("style");
    style.id = "skillr-first-visit-styles";
    style.textContent = ".skillr-first-visit{position:fixed;inset:0;z-index:10000;display:grid;place-items:center;padding:16px;background:rgba(9,24,48,.72);backdrop-filter:blur(6px)}.skillr-first-visit[hidden]{display:none}.skillr-first-visit__panel{width:min(620px,100%);max-height:calc(100vh - 32px);overflow:auto;background:#fff;color:#17335f;border-radius:24px;padding:28px;box-shadow:0 24px 80px rgba(0,0,0,.3);position:relative}.skillr-first-visit__close{position:absolute;right:14px;top:10px;border:0;background:none;font-size:28px;color:#49627e;cursor:pointer}.skillr-first-visit__eyebrow{margin:0 42px 8px 0;color:#2457d6;font-weight:800;text-transform:uppercase;letter-spacing:.08em;font-size:.78rem}.skillr-first-visit h2{margin:0 42px 16px 0;font-size:clamp(1.7rem,4vw,2.3rem);line-height:1.1}.skillr-first-visit__nologin{display:flex;gap:12px;align-items:center;padding:14px 16px;margin:0 0 18px;border:2px solid #2457d6;border-radius:16px;background:#eef4ff}.skillr-first-visit__tick{display:grid;place-items:center;width:34px;height:34px;flex:0 0 34px;border-radius:50%;background:#2457d6;color:#fff;font-weight:900}.skillr-first-visit__nologin strong{display:block;font-size:1.12rem}.skillr-first-visit ol{list-style:none;margin:0;padding:0;display:grid;gap:10px}.skillr-first-visit li{display:grid;grid-template-columns:34px 1fr;gap:12px;padding:10px 0;border-bottom:1px solid #e5edf8}.skillr-first-visit li:last-child{border-bottom:0}.skillr-first-visit__step{display:grid;place-items:center;width:32px;height:32px;border-radius:50%;background:#f4b740;font-weight:900}.skillr-first-visit li strong{display:block;margin-bottom:2px}.skillr-first-visit li span:last-child{color:#49627e;line-height:1.45}.skillr-first-visit__privacy{color:#49627e;font-size:.93rem;line-height:1.45}.skillr-first-visit__actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:18px}.skillr-first-visit__start,.skillr-first-visit__dismiss{min-height:48px;border-radius:12px;padding:12px 18px;font:inherit;font-weight:800;cursor:pointer}.skillr-first-visit__start{flex:1 1 260px;border:2px solid #2457d6;background:#2457d6;color:#fff}.skillr-first-visit__dismiss{border:2px solid #cbd8ea;background:#fff;color:#17335f}@media(max-width:560px){.skillr-first-visit__panel{padding:24px 20px 20px}.skillr-first-visit__actions{display:grid}.skillr-first-visit__start,.skillr-first-visit__dismiss{width:100%}}";
    document.head.appendChild(style);
  }

  function build() {
    var existing = document.getElementById("skillr-first-visit");
    if (existing) return existing;
    addStyles();
    var wrap = document.createElement("div");
    wrap.id = "skillr-first-visit";
    wrap.className = "skillr-first-visit";
    wrap.hidden = true;
    wrap.innerHTML = '<section class="skillr-first-visit__panel" role="dialog" aria-modal="true" aria-labelledby="skillr-first-visit-title"><button class="skillr-first-visit__close" type="button" aria-label="Close instructions">×</button><p class="skillr-first-visit__eyebrow">Welcome to SkillrHub</p><h2 id="skillr-first-visit-title">Start learning in three simple steps</h2><div class="skillr-first-visit__nologin"><span class="skillr-first-visit__tick" aria-hidden="true">✓</span><span><strong>No login required</strong>Start immediately — no student account, email address or password needed.</span></div><ol><li><span class="skillr-first-visit__step">1</span><span><strong>Choose a year level</strong>Select Foundation to Year 10, then choose Maths, Science or English.</span></li><li><span class="skillr-first-visit__step">2</span><span><strong>Choose how to learn</strong>Use Topic Guides, Daily Drills, Practice, printable worksheets or Tests.</span></li><li><span class="skillr-first-visit__step">3</span><span><strong>Review and improve</strong>Get instant feedback and use the Dashboard to view progress saved on this device.</span></li></ol><p class="skillr-first-visit__privacy"><strong>Privacy:</strong> learner progress is stored locally on this device. SkillrHub does not require a learner account.</p><div class="skillr-first-visit__actions"><button class="skillr-first-visit__start" type="button">Start learning — no sign-in</button><button class="skillr-first-visit__dismiss" type="button">Close instructions</button></div></section>';
    document.body.appendChild(wrap);

    function close() {
      remember();
      wrap.hidden = true;
      document.body.style.overflow = "";
    }

    wrap.querySelector(".skillr-first-visit__close").addEventListener("click", close);
    wrap.querySelector(".skillr-first-visit__dismiss").addEventListener("click", close);
    wrap.querySelector(".skillr-first-visit__start").addEventListener("click", function () {
      close();
      var target = document.getElementById("choose-year") || document.querySelector(".site-search__input");
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
    if (!nav || nav.querySelector("[data-skillr-onboarding-open]")) return;
    var link = document.createElement("a");
    link.href = "#how-to-use-skillrhub";
    link.textContent = "How to use SkillrHub";
    link.setAttribute("data-skillr-onboarding-open", "");
    link.addEventListener("click", function (event) { event.preventDefault(); open(); });
    nav.appendChild(link);
  }

  function init() {
    if (location.pathname !== "/" && location.pathname !== "/index.html") return;
    build();
    addReopenLink();
    if (!seen()) setTimeout(open, 350);
  }

  window.SkillrOnboarding = { open: open };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
