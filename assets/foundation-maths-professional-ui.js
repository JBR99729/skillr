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
    "✅", "❌", "📘", "🧑‍🏫", "🌏", "🔗", "📚", "▶️", "▶", "🧭"
  ];

  function cleanText(text) {
    let value = text;
    for (const icon of ICONS) value = value.split(icon).join("");
    return value.replace(/[ \t]{2,}/g, " ");
  }

  function removeHelperHint() {
    document.querySelectorAll(".micro-hero__hint").forEach((node) => {
      if (/teaching lesson stays open/i.test(node.textContent || "")) node.remove();
    });
  }

  function cleanDecorativeIcons() {
    if (!document.body) return;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      const parent = node.parentElement;
      if (!parent || parent.closest("script,style,noscript")) return;
      const next = cleanText(node.nodeValue || "");
      if (next !== node.nodeValue) node.nodeValue = next;
    });
  }

  function rewriteTeacherLink() {
    if (!isFoundationMathsTopic) return;
    document.querySelectorAll('a[href*="ac9mfn01-teacher-slide.html"]').forEach((link) => {
      link.href = "/worksheets/foundation/maths/teacher-slides/live.html?code=AC9MFN01";
    });
  }

  function rewriteTeacherResource() {
    if (!isFoundationMathsTopic) return;
    const resource = document.getElementById("teacher-slide");
    if (!resource) return;

    const content = resource.querySelector(".menu-content") || resource;
    const heading = content.querySelector("h3, h2");
    const paragraph = content.querySelector("p");
    const link = content.querySelector("a.curriculum-button, a[href*='teacher-slide'], a[href*='teacher-slides']");

    const headingText = "Classroom teaching slide";
    const paragraphText = "Open this classroom teaching slide for direct display on a school projector, interactive board, laptop or student device.";
    const linkText = "Open teaching slide";

    if (heading && heading.textContent.trim() !== headingText) heading.textContent = headingText;
    if (paragraph && paragraph.textContent.trim() !== paragraphText) paragraph.textContent = paragraphText;
    if (link && link.textContent.trim() !== linkText) link.textContent = linkText;
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

    if (!document.getElementById("skillr-repeat-watermark-style")) {
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
  }

  function apply() {
    removeHelperHint();
    cleanDecorativeIcons();
    rewriteTeacherLink();
    rewriteTeacherResource();
    addTeacherWatermark();
  }

  apply();

  const observer = new MutationObserver(() => apply());
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
