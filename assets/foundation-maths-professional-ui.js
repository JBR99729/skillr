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

  const BLOCKS_VISUAL = {
    src: "https://images.pexels.com/photos/8535193/pexels-photo-8535193.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Children using colourful wooden blocks for hands-on learning",
    caption: "Use real blocks or counters so children can move, see and explain the quantity themselves.",
    credit: "Ksenia Chernaya / Pexels",
    creditUrl: "https://www.pexels.com/photo/children-playing-with-colorful-wooden-blocks-8535193/"
  };

  const ADDITION_VISUAL = {
    src: "https://images.pexels.com/photos/12585860/pexels-photo-12585860.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Child using colourful number and addition blocks",
    caption: "Act out the story with objects first, then connect the action to the number idea.",
    credit: "BOOM Photography / Pexels",
    creditUrl: "https://www.pexels.com/photo/hand-of-a-child-playing-with-educational-toy-blocks-12585860/"
  };

  const SHAPES_VISUAL = {
    src: "https://images.unsplash.com/photo-1575881737088-a5a2bbf44e85?auto=format&fit=crop&q=80&w=900",
    alt: "Colourful wooden shape pieces for early learning",
    caption: "Let children handle, sort and rearrange real shapes or pattern pieces before explaining what they notice.",
    credit: "Michał Bożek / Unsplash",
    creditUrl: "https://unsplash.com/photos/assorted-color-shape-toy-lot-Cl2DhalcsO0"
  };

  const ACTIVITY_VISUALS = {
    AC9MFN01: BLOCKS_VISUAL,
    AC9MFN02: BLOCKS_VISUAL,
    AC9MFN03: BLOCKS_VISUAL,
    AC9MFN04: BLOCKS_VISUAL,
    AC9MFN05: ADDITION_VISUAL,
    AC9MFN06: BLOCKS_VISUAL,
    AC9MFA01: SHAPES_VISUAL,
    AC9MFSP01: SHAPES_VISUAL,
    AC9MFSP02: BLOCKS_VISUAL,
    AC9MFST01: BLOCKS_VISUAL
  };

  function currentCurriculumCode() {
    const pathMatch = window.location.pathname.match(/(ac9mf[a-z0-9]+)/i);
    if (pathMatch) return pathMatch[1].toUpperCase();
    const queryCode = new URLSearchParams(window.location.search).get("code");
    return queryCode && /^ac9mf[a-z0-9]+$/i.test(queryCode) ? queryCode.toUpperCase() : null;
  }

  function teacherSlideUrl() {
    const code = currentCurriculumCode();
    return code
      ? `/worksheets/foundation/maths/teacher-slides/live.html?code=${code}`
      : null;
  }

  function worksheetUrl() {
    const code = currentCurriculumCode();
    return code
      ? `/quiz/grade-k/math/${code.toLowerCase()}/worksheet/`
      : null;
  }

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
    const url = teacherSlideUrl();
    if (!url) return;

    document.querySelectorAll(".topic-action-row a").forEach((link) => {
      if (/^teacher slide$/i.test((link.textContent || "").trim())) {
        link.href = url;
        link.target = "_blank";
        link.rel = "noopener";
      }
    });

    document.querySelectorAll('a[href*="teacher-slide.html"], a[href*="teacher-slides/live.html"]').forEach((link) => {
      if (link.closest("#teacher-slide") || /teacher slide/i.test(link.textContent || "")) {
        link.href = url;
        link.target = "_blank";
        link.rel = "noopener";
      }
    });
  }

  function rewriteWorksheetLinks() {
    if (!isFoundationMathsTopic) return;
    const url = worksheetUrl();
    if (!url) return;

    document.querySelectorAll("a").forEach((link) => {
      const text = (link.textContent || "").trim();
      const href = link.getAttribute("href") || "";
      if (/^worksheet$/i.test(text) || /\/worksheet\/?$/i.test(href)) {
        link.href = url;
        link.target = "_blank";
        link.rel = "noopener";
        link.removeAttribute("download");
      }
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
    const url = teacherSlideUrl();

    if (heading && heading.textContent.trim() !== headingText) heading.textContent = headingText;
    if (paragraph && paragraph.textContent.trim() !== paragraphText) paragraph.textContent = paragraphText;
    if (link) {
      if (link.textContent.trim() !== linkText) link.textContent = linkText;
      if (url) link.href = url;
      link.target = "_blank";
      link.rel = "noopener";
    }
  }

  function ensureActivityVisualStyles() {
    if (document.getElementById("skillr-foundation-activity-visual-style")) return;
    const style = document.createElement("style");
    style.id = "skillr-foundation-activity-visual-style";
    style.textContent = `
      .skillr-activity-visual{display:grid;grid-template-columns:minmax(150px,220px) 1fr;gap:12px;align-items:center;margin:0 0 10px;border:1px solid #dbe4ef;border-radius:12px;overflow:hidden;background:#f8fbff}
      .skillr-activity-visual img{display:block;width:100%;height:122px;object-fit:cover}
      .skillr-activity-visual figcaption{padding:10px 12px 10px 0;font-size:.88rem;line-height:1.4;color:#405570}
      .skillr-activity-visual strong{display:block;margin-bottom:3px;color:#173968}
      .skillr-activity-credit{display:block;margin-top:5px;font-size:.68rem;color:#718096}
      .skillr-activity-credit a{color:inherit}
      .skillr-teacher-activity-visual{display:grid;grid-template-columns:160px 1fr;gap:9px;align-items:center;margin:0 0 7px;border:1px solid #dbe4ef;border-radius:9px;overflow:hidden;background:#f8fbff;position:relative;z-index:1}
      .skillr-teacher-activity-visual img{display:block;width:100%;height:88px;object-fit:cover}
      .skillr-teacher-activity-visual div{padding:6px 8px 6px 0;font-size:.7rem;line-height:1.3;color:#405570}
      .skillr-teacher-activity-visual strong{display:block;color:#173968;margin-bottom:2px}
      @media(max-width:680px){.skillr-activity-visual{grid-template-columns:1fr}.skillr-activity-visual img{height:180px}.skillr-activity-visual figcaption{padding:0 10px 10px}}
    `;
    document.head.appendChild(style);
  }

  function addTopicActivityVisual() {
    if (!isFoundationMathsTopic) return;
    const code = currentCurriculumCode();
    const visual = ACTIVITY_VISUALS[code];
    if (!visual) return;

    const trySection = [...document.querySelectorAll("#teaching-lesson .lesson-part")].find((section) =>
      /^try it$/i.test((section.querySelector("h3")?.textContent || "").trim())
    );
    if (!trySection || trySection.querySelector(".skillr-activity-visual")) return;

    ensureActivityVisualStyles();
    const figure = document.createElement("figure");
    figure.className = "skillr-activity-visual";
    figure.innerHTML = `<img src="${visual.src}" alt="${visual.alt}" loading="lazy"><figcaption><strong>Hands-on activity</strong>${visual.caption}<span class="skillr-activity-credit">Photo: <a href="${visual.creditUrl}" target="_blank" rel="nofollow noopener">${visual.credit}</a></span></figcaption>`;
    const grid = trySection.querySelector(".mini-grid-3");
    if (grid) trySection.insertBefore(figure, grid);
    else trySection.appendChild(figure);
  }

  function addTeacherActivityVisual() {
    if (!isFoundationTeacherSlide) return;
    const code = currentCurriculumCode();
    const visual = ACTIVITY_VISUALS[code];
    if (!visual) return;
    const sheet = document.querySelector(".sheet");
    if (!sheet || sheet.querySelector(".skillr-teacher-activity-visual")) return;

    ensureActivityVisualStyles();
    const panel = document.createElement("div");
    panel.className = "skillr-teacher-activity-visual";
    panel.innerHTML = `<img src="${visual.src}" alt="${visual.alt}"><div><strong>Hands-on activity</strong>${visual.caption}</div>`;
    const flow = sheet.querySelector(".flow");
    if (flow) flow.insertAdjacentElement("afterend", panel);
    else sheet.prepend(panel);
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
    rewriteWorksheetLinks();
    rewriteTeacherResource();
    addTopicActivityVisual();
    addTeacherActivityVisual();
    addTeacherWatermark();
  }

  apply();

  const observer = new MutationObserver(() => apply());
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
