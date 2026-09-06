(() => {
  "use strict";

  const match = location.pathname.match(/^\/foundation\/science\/(ac9s[a-z0-9]+)/i);
  if (!match) return;
  const code = match[1].toUpperCase();

  function apply() {
    const data = window.SkillrFoundationScienceData?.[code];
    const lesson = document.querySelector("#teaching-lesson .combined-lesson-content");
    if (!data || !lesson || document.getElementById("skillr-science-curriculum-focus")) return false;

    if (!document.getElementById("skillr-science-curriculum-focus-style")) {
      const style = document.createElement("style");
      style.id = "skillr-science-curriculum-focus-style";
      style.textContent = `
        .science-curriculum-focus{border:1px solid #bfd0ea;background:#f4f8ff;border-radius:11px;padding:10px 12px;color:#203047}
        .science-curriculum-focus strong{color:#173968}
        .science-curriculum-focus p{margin:4px 0;font-size:.9rem;line-height:1.45}
        .science-curriculum-focus .scope-note{color:#5d6c80;font-size:.8rem}
      `;
      document.head.appendChild(style);
    }

    const section = document.createElement("section");
    section.className = "lesson-part";
    section.id = "skillr-science-curriculum-focus";
    section.innerHTML = `<div class="science-curriculum-focus"><strong>Australian Curriculum focus — ${code}</strong><p>${data.desc}</p><p class="scope-note">This focused Foundation lesson teaches this curriculum code directly. The visuals and activities support this content description and its curriculum elaborations.</p></div>`;
    lesson.insertBefore(section, lesson.firstChild);
    return true;
  }

  apply();
  const observer = new MutationObserver(() => apply());
  observer.observe(document.documentElement, {childList:true,subtree:true});
})();
