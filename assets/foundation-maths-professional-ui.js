(() => {
  "use strict";

  if (window.__skillrFoundationMathsProfessionalUiLoaded) return;
  window.__skillrFoundationMathsProfessionalUiLoaded = true;

  const isFoundationMathsTopic = /^\/foundation\/maths\/ac9mf/i.test(window.location.pathname);
  const isFoundationTeacherSlide =
    window.location.pathname.includes("/worksheets/foundation/maths/teacher-slides/");

  if (!isFoundationMathsTopic && !isFoundationTeacherSlide) return;

  const ICONS = [
    "🧠", "🎯", "🎨", "🔎", "🖐️", "🖐", "⚠️", "⚠", "✏️", "✏",
    "✅", "📘", "🧑‍🏫", "🌏", "🔗", "📚", "▶️", "▶", "🧭"
  ];

  function stripLeadingIcon(element) {
    if (!element) return;
    let text = element.textContent || "";
    let changed = false;
    for (const icon of ICONS) {
      if (text.trimStart().startsWith(icon)) {
        text = text.trimStart().slice(icon.length).trimStart();
        changed = true;
        break;
      }
    }
    if (changed) element.textContent = text;
  }

  function removeHelperHint() {
    document.querySelectorAll(".micro-hero__hint").forEach((node) => {
      if (/teaching lesson stays open/i.test(node.textContent || "")) node.remove();
    });
  }

  function cleanDecorativeIcons() {
    const selectors = [
      ".menu-title",
      ".lesson-part__head h3",
      ".curriculum-panel h2",
      ".flow span",
      ".tag"
    ];
    document.querySelectorAll(selectors.join(",")).forEach(stripLeadingIcon);
  }

  function addTeacherWatermark() {
    if (!isFoundationTeacherSlide) return;
    const sheet = document.querySelector(".sheet");
    if (!sheet || sheet.querySelector(".skillr-repeat-watermark")) return;

    const old = sheet.querySelector(".watermark");
    if (old) old.style.display = "none";

    const overlay = document.createElement("div");
    overlay.className = "skillr-repeat-watermark";
    overlay.setAttribute("aria-hidden", "true");
    overlay.innerHTML = Array.from({ length: 15 }, () =>
      "<span>SkillrHub F–10 • skillrhub.com</span>"
    ).join("");
    sheet.appendChild(overlay);

    const style = document.createElement("style");
    style.id = "skillr-repeat-watermark-style";
    style.textContent = `
      .sheet{position:relative!important}
      .skillr-repeat-watermark{
        position:absolute;
        inset:0;
        z-index:20;
        display:grid;
        grid-template-columns:repeat(3,minmax(0,1fr));
        grid-template-rows:repeat(5,minmax(0,1fr));
        align-items:center;
        justify-items:center;
        overflow:hidden;
        pointer-events:none;
        user-select:none;
      }
      .skillr-repeat-watermark span{
        display:block;
        transform:rotate(-24deg);
        white-space:nowrap;
        font:800 16px/1 Arial,Helvetica,sans-serif;
        letter-spacing:.03em;
        color:rgba(36,87,214,.075);
      }
      @media(max-width:700px){
        .skillr-repeat-watermark{grid-template-columns:repeat(2,minmax(0,1fr))}
        .skillr-repeat-watermark span{font-size:13px}
      }
    `;
    document.head.appendChild(style);
  }

  function apply() {
    removeHelperHint();
    cleanDecorativeIcons();
    addTeacherWatermark();
  }

  apply();

  const observer = new MutationObserver(() => apply());
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
