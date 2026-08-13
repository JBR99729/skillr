(() => {
  "use strict";

  const baseRenderer = window.SkillrFoundationV11Renderer;
  if (!baseRenderer || window.SkillrFoundationClassroomRollout) return;

  const q = (selector, root = document) => root.querySelector(selector);
  const qa = (selector, root = document) => [...root.querySelectorAll(selector)];
  const esc = (value) => String(value ?? "").replace(/[&<>\"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[char]));
  const plain = (value) => String(value ?? "")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();

  function ensureSpec(data, code, config) {
    const unit = data[code];
    if (!unit) return null;
    if (!unit.canonical) window.SkillrFoundationCanonical.buildCollection(data, config);
    return unit.canonical;
  }

  function topicCode(data) {
    const meta = window.skillrPageMeta?.curriculumCode;
    if (meta && data[meta]) return meta;
    const match = location.pathname.match(/(ac9[a-z0-9]+)/i);
    const code = match?.[1]?.toUpperCase();
    return code && data[code] ? code : null;
  }

  function titleCase(value) {
    const small = new Set(["a", "an", "and", "as", "at", "by", "for", "from", "in", "of", "on", "or", "the", "to", "with"]);
    return String(value).split(/\s+/).map((word, index) => {
      if (!word) return word;
      if (index && small.has(word.toLowerCase())) return word.toLowerCase();
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(" ");
  }

  function cleanText(value) {
    return plain(value)
      .replace(/…|\.\.\./g, "")
      .replace(/\bE\d+(?:-E?\d+)?\b\s*/gi, "")
      .replace(/^visual teaching\s*:\s*/i, "")
      .replace(/\s+([,.;:?])/g, "$1")
      .replace(/\s+/g, " ")
      .trim();
  }

  function cleanModelHtml(value) {
    return String(value || "")
      .replace(/…|\.\.\./g, "→")
      .replace(/\bE\d+(?:-E?\d+)?\b\s*/gi, "")
      .replace(/visual teaching\s*:\s*/gi, "")
      .replace(/>\s*guided check\s*</gi, ">Guided check<");
  }

  function introHeading(unit) {
    const choices = [
      `Today We Will Learn About ${titleCase(unit.title)}`,
      `Today We Will ${titleCase(unit.subtitle)}`,
      `Today's Idea: ${titleCase(cleanText(unit.model_title))}`
    ];
    return choices.find((value) => value.length <= 78) || choices[2];
  }

  function classroomHeading(elaboration, unit, index) {
    const existing = cleanText(elaboration.shortTitle || "");
    if (existing && !/[,:;]\s*$/.test(existing) && existing.length <= 68 && !/\b(?:a|an|and|as|at|between|by|for|from|in|of|on|or|such|the|to|with|that|which)$/i.test(existing)) {
      return titleCase(existing);
    }

    let value = cleanText(elaboration.curriculumWording || existing);
    const lower = value.toLowerCase();
    if (/sentence fragment/.test(lower)) return "Tell a Sentence from a Sentence Fragment";
    if (/first nations australian storytellers/.test(lower)) return "View Stories by First Nations Storytellers";
    if (/australian family life/.test(lower)) return "Explore Stories About Australian Family Life";
    if (/features of culture/.test(lower)) return "Find Culture in Stories";
    if (/digital camera.*objects/.test(lower)) return "Photograph and Group Everyday Objects";
    if (/different parts of everyday objects/.test(lower)) return "Match Materials to Parts of an Object";
    if (/questions about everyday objects.*materials/.test(lower)) return "Ask Questions About Objects and Materials";
    if (/conduct investigations safely/.test(lower)) return "Investigate Safely";
    if (/tables or graphic organisers.*sort images/.test(lower)) return "Sort Pictures in a Table";
    if (/external features of animals and plants/.test(lower)) return "Show Plant and Animal Features";
    value = value
      .replace(/\b(?:for example|such as|including|which may involve)\b[\s\S]*$/i, "")
      .replace(/^Recognising\b/i, "Notice")
      .replace(/^Identifying\b/i, "Find")
      .replace(/^Observing\b/i, "Observe")
      .replace(/^Exploring\b/i, "Explore")
      .replace(/^Investigating\b/i, "Investigate")
      .replace(/^Learning\b/i, "Learn")
      .replace(/^Understanding\b/i, "Understand")
      .replace(/^Engaging\b/i, "Explore")
      .replace(/^Viewing\b/i, "View")
      .replace(/^Sharing\b/i, "Share")
      .replace(/^Exchanging\b/i, "Exchange")
      .replace(/^Showing\b/i, "Show")
      .replace(/^Altering\b/i, "Change")
      .replace(/^Navigating\b/i, "Navigate")
      .replace(/^Attempting\b/i, "Try")
      .replace(/^Sequencing\b/i, "Put in Order")
      .replace(/^Comparing\b/i, "Compare")
      .replace(/^Using\b/i, "Use")
      .replace(/^Creating\b/i, "Create")
      .replace(/^Suggesting\b/i, "Suggest")
      .replace(/^Discussing\b/i, "Discuss")
      .replace(/^Revisiting\b/i, "Check")
      .replace(/^Posing\b/i, "Ask")
      .replace(/^Making\b/i, "Make")
      .replace(/^Recording\b/i, "Record")
      .replace(/^Collaborating\b/i, "Work Together")
      .replace(/^First Nations Australian contexts for/i, "First Nations Ways of")
      .replace(/\s+/g, " ")
      .replace(/[.;:,\s]+$/, "")
      .trim();

    const firstComma = value.split(/,\s+/)[0];
    if (firstComma.length >= 22 && firstComma.length <= 70) value = firstComma;
    if (value.length > 70) {
      const firstAnd = value.split(/\s+and\s+/i)[0];
      if (firstAnd.length >= 22 && firstAnd.length <= 70) value = firstAnd;
    }
    if (value.length > 70) {
      const activity = unit.activities?.[index % Math.max(1, unit.activities?.length || 1)];
      const activityTitle = cleanText(typeof activity === "string" ? "" : activity?.title || "");
      if (activityTitle && !/^(teacher model|student try|explain)$/i.test(activityTitle)) value = activityTitle;
    }
    if (value.length > 70) {
      const words = value.split(/\s+/).slice(0, 10);
      while (/^(?:a|an|and|as|at|by|for|from|in|of|on|or|the|to|with|that|which)$/i.test(words.at(-1) || "")) words.pop();
      value = words.join(" ");
    }
    return titleCase(value || `${unit.model_title} Example`);
  }

  function lessonIcon(unit, extra = "") {
    const value = `${unit.title} ${unit.subtitle} ${unit.model_title} ${extra}`.toLowerCase();
    if (/number|count|quantity|addition|subtraction|part.part|equal shar/.test(value)) return "🔢";
    if (/shape|position|location|route/.test(value)) return "🔷";
    if (/pattern/.test(value)) return "🟦";
    if (/length|mass|capacity|duration|time|day|week/.test(value)) return "📏";
    if (/data|sort|category|graph/.test(value)) return "📊";
    if (/plant|leaf|fruit|vegetable/.test(value)) return "🌿";
    if (/animal|bird|fish|living/.test(value)) return "🐦";
    if (/move|roll|slide|spin|bounce/.test(value)) return "⚽";
    if (/material|property|hard|soft|rough|smooth/.test(value)) return "🧱";
    if (/safe|safety/.test(value)) return "🦺";
    if (/observe|question|predict|investigat/.test(value)) return "🔎";
    if (/record|table|template/.test(value)) return "📝";
    if (/share|speak|listen|language|relationship/.test(value)) return "💬";
    if (/preference|like|dislike|feeling|emotion/.test(value)) return "🙂";
    if (/book|story|liter|text|read|comprehension/.test(value)) return "📖";
    if (/image|picture|screen|sign/.test(value)) return "🖼️";
    if (/letter|sound|phonic|rhyme|syllable|word|spell|sentence|punctuation|writing/.test(value)) return "🔤";
    return "💡";
  }

  function ensureCss() {
    if (q("#skillr-foundation-classroom-css")) return;
    const style = document.createElement("style");
    style.id = "skillr-foundation-classroom-css";
    style.textContent = `
      :root{--fcr-navy:#15345f;--fcr-blue:#2457d6;--fcr-blue-soft:#eef5ff;--fcr-green:#13795b;--fcr-green-soft:#eef9f4;--fcr-amber:#f2a413;--fcr-amber-soft:#fff7df;--fcr-red:#b64136;--fcr-red-soft:#fff1ee;--fcr-ink:#18304d;--fcr-muted:#56687e;--fcr-line:#d6e1ee;--fcr-shadow:0 12px 32px rgba(21,52,95,.12)}
      .fcr-free{display:inline-flex;align-items:center;gap:7px;width:max-content;max-width:100%;padding:7px 12px;border:2px solid #c68a00;border-radius:999px;background:#fff7d7;color:#6b4a00;font-size:.82rem;font-weight:900}.fcr-free::before{content:'★'}
      .fcr-topic-hero,.fcr-topic-hero *,.fcr-topic-layout,.fcr-topic-layout *,.fcr-slide,.fcr-slide *{box-sizing:border-box}.fcr-topic-hero{position:relative;isolation:isolate;overflow:hidden;border-radius:24px;background:linear-gradient(135deg,#15345f,#2457d6 64%,#3976e8);padding:clamp(24px,5vw,58px);color:#fff;box-shadow:var(--fcr-shadow)}.fcr-topic-hero::after{content:'SkillrHub';position:absolute;z-index:-1;right:-2%;bottom:-18%;color:rgba(255,255,255,.13);font-size:clamp(5rem,15vw,12rem);font-weight:1000;line-height:1;transform:rotate(-7deg);white-space:nowrap}.fcr-topic-hero h1{max-width:920px;margin:14px 0 8px;color:#fff;font-size:clamp(2rem,5vw,4rem);line-height:1.03}.fcr-topic-hero__lead{max-width:850px;margin:0;color:#eef5ff;font-size:clamp(1.08rem,2.1vw,1.42rem);font-weight:800}.fcr-actions,.fcr-links{display:flex;flex-wrap:wrap;gap:8px;margin-top:17px}.fcr-actions a,.fcr-links a{display:inline-flex;min-height:42px;align-items:center;justify-content:center;padding:8px 12px;border:2px solid #c9d7e7;border-radius:10px;background:#fff;color:var(--fcr-blue);font-weight:900;text-decoration:none}.fcr-actions a{border-color:rgba(255,255,255,.65);background:rgba(255,255,255,.08);color:#fff}.fcr-actions a.primary,.fcr-links a.primary{border-color:#fff;background:#fff;color:var(--fcr-blue)}.fcr-links a.primary{border-color:var(--fcr-blue);background:var(--fcr-blue);color:#fff}
      .fcr-topic-layout{display:grid;grid-template-columns:minmax(0,1fr) 270px;gap:18px;align-items:start;margin-top:18px}.fcr-topic-stack,.fcr-topic-side{display:grid;gap:16px}.fcr-topic-side{position:sticky;top:12px}.fcr-section,.fcr-side-card{overflow:hidden;border:1px solid var(--fcr-line);border-radius:18px;background:#fff;padding:clamp(17px,2.7vw,28px);box-shadow:0 5px 18px rgba(21,52,95,.06)}.fcr-section h2,.fcr-section h3,.fcr-side-card h2{color:var(--fcr-navy)}.fcr-section h2{margin:0;font-size:clamp(1.35rem,2.5vw,1.85rem)}.fcr-section-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:12px}.fcr-section-head p{margin:3px 0 0;color:var(--fcr-muted)}.fcr-badge{flex:none;padding:5px 9px;border-radius:999px;background:var(--fcr-blue-soft);color:var(--fcr-blue);font-size:.76rem;font-weight:900}.fcr-glance,.fcr-two,.fcr-three{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:11px}.fcr-three{grid-template-columns:repeat(3,minmax(0,1fr))}.fcr-card{padding:13px;border:1px solid #dbe5f0;border-radius:13px;background:#f9fbfe}.fcr-card h3{margin:0 0 7px}.fcr-card p{margin:6px 0;line-height:1.45}.fcr-success{margin:6px 0 0;padding-left:1.2rem}.fcr-success li{margin:5px 0}.fcr-boundary,.fcr-reference,.fcr-answer{margin-top:11px;border:1px solid #dce5ef;border-radius:12px;background:#fbfcfe}.fcr-boundary summary,.fcr-reference summary,.fcr-answer summary{cursor:pointer;padding:10px 12px;color:var(--fcr-navy);font-weight:900}.fcr-boundary-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px;padding:0 11px 11px}.fcr-boundary-grid div{padding:10px;border-radius:9px;background:#eef4fb}.fcr-boundary-grid strong{display:block;margin-bottom:4px;color:var(--fcr-blue)}.fcr-reference__body,.fcr-answer__body{padding:0 13px 13px}.fcr-reference__body li{margin:7px 0}
      .fcr-model{display:grid;gap:8px}.fcr-model-title{display:flex;align-items:center;gap:8px;color:var(--fcr-navy);font-weight:900}.fcr-model-title span{display:grid;width:34px;height:34px;place-items:center;border-radius:50%;background:var(--fcr-blue-soft);font-size:1.35rem}.fcr-model-body{overflow:hidden;padding:12px;border:2px solid #d5e2f0;border-radius:15px;background:linear-gradient(#fff,#f7faff);color:var(--fcr-ink);font-size:clamp(1rem,1.7vw,1.28rem);font-weight:800}.fcr-model-body .model{margin:4px 0;padding:11px;border:2px dashed #b9c9dc;border-radius:10px;background:#fff;white-space:pre-wrap}.fcr-model-body .triple,.fcr-model-body .english-card-row{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px}.fcr-model-body .triple>div,.fcr-model-body .english-card-row>span{display:grid;min-height:82px;place-items:center;padding:10px;border:2px solid #cddbea;border-radius:12px;background:#fff;text-align:center}.fcr-model-body .big{font-size:2.1rem;font-weight:1000;color:var(--fcr-navy)}.fcr-model-body mark{border-radius:5px;background:#ffe27f;color:#4d3500;padding:1px 3px}.fcr-photo-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px;margin-top:9px}.fcr-photo{overflow:hidden;margin:0;border:2px solid #d5e2f0;border-radius:12px;background:#fff}.fcr-photo img{display:block;width:100%;height:150px;object-fit:cover;background:#eef3f8}.fcr-photo figcaption{padding:8px;font-size:.82rem}.fcr-photo strong{display:block;color:var(--fcr-navy)}.fcr-example-scene{display:grid;grid-template-columns:minmax(100px,.34fr) 1fr;align-items:center;gap:12px;min-height:120px;padding:12px;border:2px solid #d5e2f0;border-radius:15px;background:linear-gradient(135deg,#f5f9ff,#fff)}.fcr-example-scene__icon{display:grid;min-height:96px;place-items:center;border-radius:13px;background:#fff;font-size:4rem;box-shadow:0 4px 12px rgba(21,52,95,.08)}.fcr-example-scene strong{display:block;color:var(--fcr-navy);font-size:1.08rem}.fcr-example-scene p{margin:6px 0 0;font-size:1rem;line-height:1.4}.fcr-check{display:grid;gap:7px;margin-top:11px;padding:12px;border:2px solid #b9d9c7;border-radius:12px;background:var(--fcr-green-soft)}.fcr-check>strong{color:var(--fcr-green)}.fcr-elaboration-grid{display:grid;gap:12px}.fcr-elaboration-card{padding:14px;border:1px solid #dbe5f0;border-radius:14px;background:#fbfcfe}.fcr-elaboration-card h3{margin:0 0 9px}.fcr-before-after{display:grid;grid-template-columns:1fr auto 1fr;align-items:stretch;gap:9px}.fcr-before,.fcr-after{padding:12px;border-radius:12px;font-weight:800}.fcr-before{border:2px solid #e3aca6;background:var(--fcr-red-soft)}.fcr-after{border:2px solid #abd0bd;background:var(--fcr-green-soft)}.fcr-arrow{display:grid;place-items:center;color:var(--fcr-blue);font-size:1.6rem;font-weight:1000}.fcr-steps{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px}.fcr-step{padding:11px;border:2px solid #d7e2ef;border-radius:12px;background:#fff}.fcr-step span{display:grid;width:32px;height:32px;place-items:center;margin-bottom:7px;border-radius:50%;background:var(--fcr-navy);color:#fff;font-weight:1000}.fcr-topic-footer{position:relative;overflow:hidden;margin-top:20px;padding:17px;border-radius:15px;background:var(--fcr-navy);color:#fff;text-align:center;font-weight:800}.fcr-topic-footer span{display:block;margin-top:3px;color:#dce9fb;font-size:.82rem}.fcr-topic-footer::after{content:'SkillrHub';position:absolute;right:2%;bottom:-23px;color:rgba(255,255,255,.1);font-size:4.2rem;font-weight:1000}
      .fcr-slide-body{margin:0;background:#e9eff6;color:var(--fcr-ink);font-family:Arial,Helvetica,sans-serif}.fcr-slide-app{min-height:100vh}.fcr-toolbar{position:sticky;z-index:80;top:0;display:flex;align-items:center;justify-content:space-between;gap:9px;padding:9px 12px;border-bottom:1px solid var(--fcr-line);background:#fff}.fcr-toolbar__group{display:flex;align-items:center;gap:7px;min-width:0}.fcr-toolbar a,.fcr-toolbar button,.fcr-toolbar select{min-height:39px;padding:7px 10px;border:1px solid #c7d5e5;border-radius:9px;background:#fff;color:var(--fcr-navy);font-weight:900}.fcr-toolbar a{display:inline-flex;align-items:center;text-decoration:none}.fcr-toolbar button:not(:disabled){cursor:pointer}.fcr-toolbar button:disabled{opacity:.45}.fcr-slide-count{color:var(--fcr-muted);font-size:.84rem;font-weight:900;white-space:nowrap}.fcr-toolbar select{max-width:390px;white-space:normal}.fcr-stage-wrap{max-width:1440px;margin:12px auto;padding:0 12px}.fcr-stage{position:relative;overflow:hidden;width:100%;aspect-ratio:16/9;border:2px solid #c9d7e7;border-radius:18px;background:#fff;box-shadow:var(--fcr-shadow)}.fcr-slide{position:absolute;inset:0;display:grid;grid-template-rows:auto minmax(0,1fr) auto;gap:8px;padding:clamp(15px,1.8vw,29px);background:linear-gradient(140deg,#fff 0%,#fff 73%,#f4f8ff 100%)}.fcr-slide[hidden]{display:none}.fcr-watermark{position:absolute;z-index:0;right:-1%;bottom:1%;color:rgba(36,87,214,.07);font-size:clamp(4.5rem,11vw,10rem);font-weight:1000;line-height:1;transform:rotate(-8deg);pointer-events:none}.fcr-url-watermark{position:absolute;z-index:0;left:50%;top:51%;color:rgba(21,52,95,.065);font-size:clamp(2.3rem,5.8vw,6rem);font-weight:1000;line-height:1;transform:translate(-50%,-50%) rotate(-16deg);white-space:nowrap;pointer-events:none}.fcr-slide-head,.fcr-pattern,.fcr-slide-footer{position:relative;z-index:1}.fcr-slide-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;padding-bottom:8px;border-bottom:4px solid var(--fcr-blue)}.fcr-slide-head h1{min-width:0;margin:0;color:var(--fcr-navy);font-size:clamp(1.55rem,2.75vw,2.85rem);line-height:1.03;overflow-wrap:anywhere}.fcr-slide .fcr-free{flex:none;padding:5px 9px;font-size:clamp(.6rem,.82vw,.78rem)}.fcr-pattern{display:grid;grid-template-rows:auto minmax(0,1fr) auto;gap:7px;min-height:0}.fcr-meaning{display:grid;grid-template-columns:max-content 1fr;align-items:center;gap:9px;padding:7px 10px;border-radius:11px;background:var(--fcr-blue-soft);font-size:clamp(.77rem,1.08vw,1.08rem);font-weight:800}.fcr-label{display:inline-flex;align-items:center;justify-content:center;width:max-content;padding:4px 8px;border-radius:8px;background:var(--fcr-navy);color:#fff;font-size:clamp(.58rem,.73vw,.72rem);font-weight:1000;letter-spacing:.05em;text-transform:uppercase}.fcr-picture{display:grid;align-content:center;gap:5px;min-height:0;overflow:hidden}.fcr-picture .fcr-model-body{padding:7px;font-size:clamp(.8rem,1.15vw,1.15rem)}.fcr-picture .fcr-model-body .triple>div,.fcr-picture .fcr-model-body .english-card-row>span{min-height:58px;padding:6px}.fcr-picture .fcr-photo img{height:92px}.fcr-picture .fcr-example-scene{min-height:82px;padding:7px}.fcr-picture .fcr-example-scene__icon{min-height:68px;font-size:3rem}.fcr-picture .fcr-example-scene p{font-size:clamp(.72rem,.9vw,.9rem)}.fcr-bottom{display:grid;grid-template-columns:1fr 1fr;gap:8px}.fcr-ask,.fcr-together{display:grid;align-content:start;gap:5px;min-width:0;padding:8px 10px;border-radius:11px}.fcr-ask{border:2px solid #b8d6c4;background:var(--fcr-green-soft)}.fcr-together{border:2px solid #e1c06f;background:var(--fcr-amber-soft)}.fcr-ask strong{color:#0b5c40;font-size:clamp(.82rem,1.13vw,1.13rem)}.fcr-reveal{justify-self:start;min-height:31px;padding:4px 8px;border:0;border-radius:7px;background:#755000;color:#fff;font-size:clamp(.65rem,.8vw,.8rem);font-weight:900;cursor:pointer}.fcr-answer-text{color:#573e00;font-size:clamp(.7rem,.94vw,.94rem);font-weight:900;line-height:1.27}.fcr-answer-text[hidden]{display:none}.fcr-slide .fcr-model{gap:4px}.fcr-slide .fcr-model-title{display:none}.fcr-slide .fcr-before-after{gap:5px}.fcr-slide .fcr-before,.fcr-slide .fcr-after{padding:7px;font-size:clamp(.67rem,.93vw,.93rem)}.fcr-slide .fcr-arrow{font-size:1.2rem}.fcr-slide .fcr-steps{gap:5px}.fcr-slide .fcr-step{padding:7px;font-size:clamp(.63rem,.86vw,.86rem)}.fcr-slide .fcr-step span{width:25px;height:25px;margin-bottom:4px}.fcr-slide-footer{display:flex;align-items:center;justify-content:space-between;gap:9px;padding-top:7px;border-top:2px solid #d7e2ee;color:var(--fcr-navy);font-size:clamp(.56rem,.75vw,.76rem);font-weight:900}.fcr-footer-brand{display:flex;flex-wrap:wrap;align-items:center;gap:5px}.fcr-footer-brand span+span::before{content:'•';margin-right:5px;color:var(--fcr-amber)}
      .fcr-notes{max-width:1440px;margin:0 auto 22px;padding:0 12px}.fcr-notes details{overflow:hidden;border:1px solid #cfdbe9;border-radius:13px;background:#fff}.fcr-notes summary{cursor:pointer;padding:11px 13px;color:var(--fcr-navy);font-weight:900}.fcr-notes-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;padding:0 12px 12px}.fcr-note{padding:9px;border-radius:9px;background:#f5f8fc;font-size:.79rem;line-height:1.4}.fcr-note strong{display:block;margin-bottom:4px;color:var(--fcr-blue)}.fcr-note--evidence{background:var(--fcr-green-soft)}.fcr-note--fix{background:#fff4ed}.fcr-note--check{grid-column:1/-1;border:1px solid #c7dfcf;background:#f1f9f3}.fcr-embed .fcr-toolbar,.fcr-embed .fcr-notes{display:none}.fcr-embed .fcr-stage-wrap{max-width:none;margin:0;padding:0}.fcr-embed .fcr-stage{border:0;border-radius:0;box-shadow:none}.fcr-stage-wrap:fullscreen{display:grid;place-items:center;width:100vw;height:100vh;padding:0;background:#fff}.fcr-stage-wrap:fullscreen .fcr-stage{width:100vw;height:100vh;aspect-ratio:auto;border:0;border-radius:0;box-shadow:none}
      @media(max-width:980px){.fcr-topic-layout{grid-template-columns:1fr}.fcr-topic-side{position:static;grid-template-columns:repeat(2,minmax(0,1fr))}.fcr-stage{aspect-ratio:auto;min-height:78vh}.fcr-slide{position:relative;min-height:78vh}.fcr-notes-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.fcr-note--check{grid-column:1/-1}}
      @media(max-width:720px){.fcr-topic-hero{border-radius:17px}.fcr-topic-layout{gap:12px}.fcr-section,.fcr-side-card{padding:15px;border-radius:14px}.fcr-glance,.fcr-two,.fcr-three,.fcr-boundary-grid,.fcr-model-body .triple,.fcr-model-body .english-card-row,.fcr-photo-grid,.fcr-steps{grid-template-columns:1fr}.fcr-topic-side{grid-template-columns:1fr}.fcr-example-scene{grid-template-columns:1fr}.fcr-toolbar{align-items:flex-start;flex-wrap:wrap}.fcr-toolbar__group{width:100%;justify-content:space-between}.fcr-toolbar select{min-width:0;max-width:62%}.fcr-stage-wrap{padding:0 6px}.fcr-slide{padding:13px}.fcr-slide-head h1{font-size:1.46rem}.fcr-slide .fcr-free{font-size:.56rem}.fcr-pattern{grid-template-rows:auto auto auto}.fcr-meaning{grid-template-columns:1fr;gap:5px}.fcr-picture{overflow:visible}.fcr-bottom{grid-template-columns:1fr}.fcr-before-after{grid-template-columns:1fr}.fcr-arrow{transform:rotate(90deg)}.fcr-notes-grid{grid-template-columns:1fr}.fcr-note--check{grid-column:auto}.fcr-slide-footer{align-items:flex-start;flex-direction:column}}
      @media print{.fcr-toolbar,.fcr-notes{display:none!important}.fcr-stage-wrap{max-width:none;margin:0;padding:0}.fcr-stage{border:0;border-radius:0;box-shadow:none}.fcr-slide[hidden]{display:none!important}.fcr-slide{position:relative;width:100%;aspect-ratio:16/9;break-after:page}}
    `;
    document.head.appendChild(style);
  }

  function modelById(spec, id) {
    return spec.models.find((model) => model.id === id);
  }

  function photoGrid(unit, limit = 3) {
    const visuals = (unit.visuals || []).slice(0, limit);
    if (!visuals.length) return "";
    return `<div class="fcr-photo-grid">${visuals.map((visual) => `<figure class="fcr-photo"><img src="${esc(visual.src)}" alt="${esc(visual.alt)}"><figcaption><strong>${esc(visual.title)}</strong>${esc(visual.body)}</figcaption></figure>`).join("")}</div>`;
  }

  function rawModel(spec, unit, id, extra = "") {
    const model = modelById(spec, id);
    if (!model) return "";
    const displayHtml = cleanModelHtml(model.parameters?.displayHtml || "");
    if (displayHtml) {
      return `<div class="fcr-model"><div class="fcr-model-title"><span aria-hidden="true">${lessonIcon(unit, extra || model.purpose)}</span>${esc(cleanText(model.purpose))}</div><div class="fcr-model-body">${displayHtml}${id === "main-model" && spec.subject === "Science" ? photoGrid(unit) : ""}</div></div>`;
    }
    return "";
  }

  function activityAt(unit, index) {
    const activities = unit.activities || [];
    return activities[index % Math.max(1, activities.length)] || null;
  }

  function activityExample(unit, index) {
    const activity = activityAt(unit, index);
    if (!activity) return { title: unit.model_title, text: plain(unit.model_html), visual: "" };
    if (typeof activity === "string") return { title: unit.model_title, text: cleanText(activity), visual: "" };
    const visual = typeof activity.visual === "string" ? cleanText(activity.visual) : "";
    return { title: cleanText(activity.title || unit.model_title), text: cleanText(activity.text || ""), visual };
  }

  function elaborationVisual(spec, unit, elaboration, index) {
    const modelHtml = elaboration.modelIds.map((id) => rawModel(spec, unit, id, elaboration.shortTitle)).join("");
    if (modelHtml) return modelHtml;
    const activity = activityExample(unit, index);
    const visualIndex = typeof activityAt(unit, index)?.visual === "number" ? activityAt(unit, index).visual : null;
    const scienceVisual = Number.isInteger(visualIndex) ? unit.visuals?.[visualIndex] : null;
    return `<div class="fcr-example-scene"><div class="fcr-example-scene__icon" aria-hidden="true">${lessonIcon(unit, `${elaboration.shortTitle} ${activity.title}`)}</div><div><strong>${esc(activity.title || classroomHeading(elaboration, unit, index))}</strong>${activity.visual ? `<p class="fcr-card" style="font-size:1.18rem">${esc(activity.visual)}</p>` : ""}${scienceVisual ? `<figure class="fcr-photo"><img src="${esc(scienceVisual.src)}" alt="${esc(scienceVisual.alt)}"><figcaption><strong>${esc(scienceVisual.title)}</strong>${esc(scienceVisual.body)}</figcaption></figure>` : `<p>${esc(activity.text || elaboration.whatToLookFor)}</p>`}</div></div>`;
  }

  function checkpointById(spec, id) {
    return spec.masteryItems.find((item) => item.id === id);
  }

  function conciseAnswer(value) {
    return cleanText(value)
      .replace(/^A response that accurately states the lesson idea:\s*/i, "")
      .replace(/^A relevant example that follows the approved model:\s*/i, "For example: ")
      .replace(/^Expected outcome:\s*/i, "")
      .replace(/^The learner\s+/i, "Look for a child who ");
  }

  function elaborationAnswer(spec, unit, elaboration, index) {
    const activity = activityExample(unit, index);
    if (activity.visual) return `For example: ${activity.visual}`;
    const worked = conciseAnswer(elaboration.workedExample || "");
    if (worked && worked.length <= 190) return worked;
    const checkpoint = checkpointById(spec, elaboration.checkpointIds[0]);
    return conciseAnswer(checkpoint?.expectedAnswer || elaboration.whatToLookFor);
  }

  function slideView(spec, unit, slide, index) {
    const type = slide.display.type;
    const checkpoints = slide.checkpointIds.map((id) => checkpointById(spec, id)).filter(Boolean);
    const checkpoint = checkpoints[0];
    if (type === "intro") {
      return {
        heading: introHeading(unit),
        meaning: unit.learn,
        question: "What are we learning today?",
        answer: `We are learning to ${unit.subtitle.charAt(0).toLowerCase()}${unit.subtitle.slice(1)}.`,
        visual: `<div class="fcr-example-scene"><div class="fcr-example-scene__icon" aria-hidden="true">${lessonIcon(unit)}</div><div><strong>${esc(unit.subtitle)}</strong><p>${esc(unit.learn)}</p></div></div>`
      };
    }
    if (type === "model") {
      return {
        heading: titleCase(cleanText(unit.model_title)),
        meaning: unit.learn,
        question: cleanText(unit.quick?.[0] || slide.display.studentPrompt),
        answer: conciseAnswer(checkpoint?.expectedAnswer || unit.learn),
        visual: rawModel(spec, unit, "main-model")
      };
    }
    if (type === "application") {
      const answerItem = spec.masteryItems.find((item) => item.type === "mastery") || spec.masteryItems[1];
      return {
        heading: titleCase(cleanText(unit.apply_title)),
        meaning: `The same idea works in this new example: ${cleanText(unit.apply_title)}.`,
        question: cleanText(unit.quick?.[1] || slide.display.studentPrompt),
        answer: conciseAnswer(answerItem?.expectedAnswer || plain(unit.apply_html)),
        visual: rawModel(spec, unit, "application-model")
      };
    }
    if (type === "elaboration") {
      const elaboration = spec.elaborations.find((item) => slide.elaborationIds.includes(item.id));
      const elaborationIndex = Math.max(0, spec.elaborations.indexOf(elaboration));
      const heading = classroomHeading(elaboration, unit, elaborationIndex);
      const plainIdea = cleanText(elaboration.plainLanguageConcept || "");
      return {
        heading,
        meaning: /^This elaboration makes/i.test(plainIdea) ? `We can ${heading.charAt(0).toLowerCase()}${heading.slice(1)}.` : plainIdea,
        question: `What do you notice in this ${unit.title.toLowerCase()} example?`,
        answer: elaborationAnswer(spec, unit, elaboration, elaborationIndex),
        visual: elaborationVisual(spec, unit, elaboration, elaborationIndex)
      };
    }
    if (type === "misconceptions") {
      const item = spec.misconceptions[0];
      return {
        heading: "Spot and Fix a Mix-Up",
        meaning: `A useful answer must match the ${cleanText(unit.model_title).toLowerCase()} model.`,
        question: "What needs fixing?",
        answer: conciseAnswer(item?.rapidFix || slide.teacherLayer.ifIncorrect),
        visual: `<div class="fcr-before-after"><div class="fcr-before"><strong>Before</strong><p>${esc(cleanText(item?.title || "This answer does not match the model."))}</p></div><div class="fcr-arrow" aria-hidden="true">→</div><div class="fcr-after"><strong>After</strong><p>${esc(cleanText(item?.rapidFix || slide.teacherLayer.ifIncorrect))}</p></div></div>`
      };
    }
    if (type === "activity") {
      const steps = (unit.activities || []).slice(0, 3).map((activity, stepIndex) => {
        const data = typeof activity === "string" ? { title: `Step ${stepIndex + 1}`, text: activity } : activity;
        const visual = typeof data.visual === "string" ? `<strong>${esc(cleanText(data.visual))}</strong>` : "";
        return `<div class="fcr-step"><span>${stepIndex + 1}</span>${visual}<p>${esc(cleanText(data.text || data.title))}</p></div>`;
      }).join("");
      return {
        heading: cleanText(typeof unit.activities?.[0] === "object" ? unit.activities[0].title : spec.warmUp.title),
        meaning: unit.subtitle,
        question: "What will you do first?",
        answer: conciseAnswer(typeof unit.activities?.[0] === "object" ? unit.activities[0].text : spec.warmUp.steps[0]),
        visual: `<div class="fcr-steps">${steps}</div>`
      };
    }
    const mastery = spec.masteryItems.filter((item) => item.type === "mastery");
    const item = mastery.at(-1) || spec.masteryItems.at(-1);
    return {
      heading: "Show What You Know",
      meaning: `Show the ${unit.title.toLowerCase()} idea and explain what proves it.`,
      question: cleanText(item?.prompt || unit.quick?.at(-1)),
      answer: conciseAnswer(item?.expectedAnswer || item?.evidenceOfMastery || unit.learn),
      visual: `<div class="fcr-three">${mastery.slice(0, 3).map((check, checkIndex) => `<div class="fcr-card"><span class="fcr-badge">${checkIndex + 1}</span><p>${esc(cleanText(check.prompt))}</p></div>`).join("")}</div>`
    };
  }

  function patternHtml(view) {
    return `<div class="fcr-pattern"><div class="fcr-meaning"><span class="fcr-label">What it means</span><span>${esc(cleanText(view.meaning))}</span></div><div class="fcr-picture"><span class="fcr-label">Look at the picture</span>${view.visual}</div><div class="fcr-bottom"><div class="fcr-ask"><span class="fcr-label">Ask the class</span><strong>${esc(cleanText(view.question))}</strong></div><div class="fcr-together"><button class="fcr-reveal" type="button" data-fcr-reveal aria-expanded="false">Check together</button><div class="fcr-answer-text" data-fcr-answer hidden>${esc(cleanText(view.answer))}</div></div></div></div>`;
  }

  function notesHtml(slide, spec) {
    const layer = slide.teacherLayer;
    const checkpoints = slide.checkpointIds.map((id) => checkpointById(spec, id)).filter(Boolean);
    return `<details open><summary>Teacher guidance for this slide</summary><div class="fcr-notes-grid"><div class="fcr-note"><strong>Teacher does.</strong>${esc(cleanText(layer.teacherDoes))}</div><div class="fcr-note"><strong>Teacher says/asks.</strong>${esc(cleanText(layer.teacherSaysOrAsks))}</div><div class="fcr-note"><strong>Student does.</strong>${esc(cleanText(layer.studentDoes))}</div><div class="fcr-note fcr-note--evidence"><strong>Expected answer or observable evidence.</strong>${esc(cleanText(layer.whatToLookFor))}</div><div class="fcr-note fcr-note--fix"><strong>What to do if the student is unsure or incorrect.</strong>${esc(cleanText(layer.ifIncorrect))}</div>${checkpoints.map((item) => `<div class="fcr-note fcr-note--check"><strong>Short check</strong>${esc(cleanText(item.prompt))} <b>Expected:</b> ${esc(conciseAnswer(item.expectedAnswer))} <b>Continue when:</b> ${esc(cleanText(item.decision.continueWhen))} <b>Reteach when:</b> ${esc(cleanText(item.decision.reteachWhen))}</div>`).join("")}</div></details>`;
  }

  function sectionHead(title, description, badge = "") {
    return `<div class="fcr-section-head"><div><h2>${esc(title)}</h2>${description ? `<p>${esc(description)}</p>` : ""}</div>${badge ? `<span class="fcr-badge">${esc(badge)}</span>` : ""}</div>`;
  }

  function answerDetails(prompt, answer) {
    return `<div class="fcr-check"><strong>${esc(cleanText(prompt))}</strong><details class="fcr-answer"><summary>Check together</summary><div class="fcr-answer__body">${esc(cleanText(answer))}</div></details></div>`;
  }

  function absorbSharedReference() {
    const referenceBody = q(".fcr-reference__body");
    if (!referenceBody) return;
    ["#international-alignment", "#v11-static-alignment"].forEach((selector) => {
      const section = q(selector);
      if (!section || referenceBody.contains(section)) return;
      const wrapper = document.createElement("div");
      wrapper.dataset.fcrSharedReference = "true";
      wrapper.innerHTML = section.innerHTML;
      referenceBody.appendChild(wrapper);
      section.remove();
    });
  }

  function renderTopic({ data, order, config }) {
    ensureCss();
    const code = topicCode(data);
    const unit = code && data[code];
    const spec = code && ensureSpec(data, code, config);
    const hero = q(".curriculum-hero");
    const main = q("main.curriculum-layout");
    if (!unit || !spec || !hero || !main) return false;

    document.title = `${code} ${unit.title} | Foundation ${spec.subject}`;
    const description = q('meta[name="description"]');
    if (description) description.content = `Teach ${unit.title} with a classroom-ready Foundation ${spec.subject} Topic Guide and matching selectable Teacher Slides.`;
    hero.className = "curriculum-hero fcr-topic-hero";
    hero.innerHTML = `<span class="fcr-free">Free Teacher Resource.</span><h1>${esc(titleCase(unit.title))}</h1><p class="fcr-topic-hero__lead">${esc(unit.subtitle)}</p><div class="fcr-actions"><a class="primary" href="#fcr-lesson">Topic Guide</a><a href="${esc(spec.resourceLinks.slide)}" target="_blank" rel="noopener">Teacher Slides</a><a href="${esc(spec.resourceLinks.worksheet)}" target="_blank" rel="noopener">Practice Sheet</a><a href="${esc(spec.resourceLinks.practice)}">Practice</a><a href="${esc(spec.resourceLinks.test)}">Test</a></div>`;

    const mainView = slideView(spec, unit, spec.slides.find((slide) => slide.display.type === "model"), 1);
    const applyView = slideView(spec, unit, spec.slides.find((slide) => slide.display.type === "application"), 2);
    const glance = `<section class="fcr-section" id="fcr-lesson">${sectionHead("Lesson at a Glance", "Everything needed to teach this lesson directly.", spec.lessonTime)}<div class="fcr-glance"><article class="fcr-card"><h3>Learning goal</h3><p>${esc(unit.subtitle)}</p><h3>Success looks like</h3><ul class="fcr-success">${spec.successCriteria.map((item) => `<li>${esc(cleanText(item))}</li>`).join("")}</ul></article><article class="fcr-card"><h3>Materials</h3><p>${esc(spec.materials.join(", "))}</p><h3>Teaching pattern</h3><p>What it means → Look at the picture → Ask the class → Check together</p></article></div><details class="fcr-boundary"><summary>Teacher concept boundary</summary><div class="fcr-boundary-grid"><div><strong>Must teach</strong>${esc(spec.conceptBoundary.mustTeach.join(" "))}</div><div><strong>Prerequisite</strong>${esc(spec.conceptBoundary.prerequisites.join(" "))}</div><div><strong>May support informally</strong>${esc(spec.conceptBoundary.maySupportInformally.join(" "))}</div><div><strong>Must not overteach</strong>${esc(spec.conceptBoundary.mustNotOverteach.join(" "))}</div></div></details></section>`;
    const meaning = `<section class="fcr-section">${sectionHead("What It Means", unit.learn, "Start here")}${mainView.visual}${answerDetails(mainView.question, mainView.answer)}</section>`;
    const application = `<section class="fcr-section">${sectionHead(cleanText(unit.apply_title), "Use the same idea in a second complete example.")}${applyView.visual}${answerDetails(applyView.question, applyView.answer)}</section>`;
    const elaborations = `<section class="fcr-section">${sectionHead("More Ways to Show the Idea", "Each example is also used in the matching Teacher Slides.", `${spec.elaborations.length} examples`)}<div class="fcr-elaboration-grid">${spec.elaborations.map((item, index) => { const slide = spec.slides.find((candidate) => candidate.elaborationIds.includes(item.id)); const view = slideView(spec, unit, slide, index + 3); return `<article class="fcr-elaboration-card"><h3>${esc(view.heading)}</h3><p>${esc(cleanText(view.meaning))}</p>${view.visual}${answerDetails(view.question, view.answer)}</article>`; }).join("")}</div></section>`;
    const mixups = `<section class="fcr-section">${sectionHead("Spot and Fix Common Mix-Ups", "Show the incorrect idea beside the exact correction.")}<div class="fcr-elaboration-grid">${spec.misconceptions.map((item) => `<div class="fcr-before-after"><div class="fcr-before"><strong>Mix-up</strong><p>${esc(cleanText(item.title))}</p></div><div class="fcr-arrow" aria-hidden="true">→</div><div class="fcr-after"><strong>Fix</strong><p>${esc(cleanText(item.rapidFix))}</p></div></div>`).join("")}</div></section>`;
    const activitySlide = spec.slides.find((slide) => slide.display.type === "activity");
    const activityView = slideView(spec, unit, activitySlide, spec.slides.indexOf(activitySlide));
    const activity = `<section class="fcr-section">${sectionHead(activityView.heading, "Children can point, move, say, draw or sort using the exact prompts shown.")}${activityView.visual}${answerDetails(activityView.question, activityView.answer)}<div class="fcr-three" style="margin-top:12px"><article class="fcr-card"><h3>Support</h3><p>${esc(spec.differentiation.support.adaptation)}</p></article><article class="fcr-card"><h3>Core</h3><p>${esc(spec.differentiation.core.adaptation)}</p></article><article class="fcr-card"><h3>Extend</h3><p>${esc(spec.differentiation.extend.adaptation)}</p></article></div></section>`;
    const checks = spec.masteryItems.filter((item) => item.type === "mastery").slice(0, 4);
    const mastery = `<section class="fcr-section">${sectionHead("Ask and Check", "Use the short questions and open each model answer.")}<div class="fcr-elaboration-grid">${checks.map((item) => answerDetails(item.prompt, item.expectedAnswer)).join("")}</div></section>`;
    const preview = `<section class="fcr-section">${sectionHead("Matching Teacher Slides", "The same lesson specification, examples, visuals, questions and answers appear in both resources.", `${spec.slides.length} selectable slides`)}<div style="overflow:hidden;width:100%;aspect-ratio:16/9;border:3px solid var(--fcr-navy);border-radius:15px;background:#eef3f9"><iframe src="${esc(spec.resourceLinks.slide)}&embed=1" title="Matching classroom slide preview" loading="lazy" style="display:block;width:100%;height:100%;border:0"></iframe></div><div class="fcr-links"><a class="primary" href="${esc(spec.resourceLinks.slide)}" target="_blank" rel="noopener">Open Teacher Slides</a></div></section>`;
    const reference = `<section class="fcr-section">${sectionHead("Optional Curriculum Reference", "Formal curriculum wording is kept inside this collapsed teacher reference.")}<details class="fcr-reference"><summary>Open the Australian Curriculum wording</summary><div class="fcr-reference__body"><p><strong>${esc(code)}</strong></p><p><strong>Content description:</strong> ${esc(spec.contentDescription)}</p><ul>${spec.elaborations.map((item) => `<li><strong>${esc(item.id)}:</strong> ${esc(item.curriculumWording)}</li>`).join("")}</ul><p><a href="${esc(spec.references[0].url)}" target="_blank" rel="nofollow noopener">${esc(spec.references[0].title)}</a></p></div></details></section>`;
    const resources = `<section class="fcr-section">${sectionHead("Continue Learning", "Use the existing resources when children are ready.")}<div class="fcr-links"><a class="primary" href="${esc(spec.resourceLinks.slide)}" target="_blank" rel="noopener">Teacher Slides</a><a href="${esc(spec.resourceLinks.worksheet)}" target="_blank" rel="noopener">Practice Sheet</a><a href="${esc(spec.resourceLinks.practice)}">Practice</a><a href="${esc(spec.resourceLinks.test)}">Test</a></div></section>`;

    main.className = "fcr-topic-layout";
    main.innerHTML = `<div class="fcr-topic-stack">${glance}${meaning}${application}${elaborations}${mixups}${activity}${mastery}${preview}${reference}${resources}</div><aside class="fcr-topic-side"><section class="fcr-side-card"><span class="fcr-free">Free Teacher Resource.</span><h2 style="margin-top:10px">Teach directly</h2><p>Open the slides full screen. The pictures, examples, questions and model answers are already provided.</p><div class="fcr-links"><a class="primary" href="${esc(spec.resourceLinks.slide)}" target="_blank" rel="noopener">Teacher Slides</a></div></section><section class="fcr-side-card"><h2>Lesson language</h2><p>${esc(unit.learn)}</p></section></aside>`;

    let footer = q(".curriculum-footer-meta");
    if (!footer) {
      footer = document.createElement("footer");
      q(".curriculum-page")?.appendChild(footer);
    }
    footer.className = "fcr-topic-footer";
    footer.innerHTML = `<strong>SkillrHub</strong> · skillrhub.com · Free Teacher Resource.<span>© 2026 SkillrHub · Free classroom use · ${esc(code)}</span>`;
    [0, 250, 1000, 2500].forEach((delay) => window.setTimeout(absorbSharedReference, delay));
    document.documentElement.dataset.foundationV11 = code;
    document.documentElement.dataset.foundationClassroom = "true";
    window.skillrPageMeta = { ...(window.skillrPageMeta || {}), curriculumCode: code, title: unit.title, subject: spec.subject, lessonSchema: "1.1" };
    return true;
  }

  function renderSlides({ data, config }) {
    ensureCss();
    const code = String(new URLSearchParams(location.search).get("code") || "").toUpperCase();
    const unit = data[code];
    const spec = unit && ensureSpec(data, code, config);
    if (!unit || !spec) {
      document.body.innerHTML = "<p>Choose a valid Foundation curriculum code.</p>";
      return false;
    }
    const embed = new URLSearchParams(location.search).get("embed") === "1";
    const views = spec.slides.map((slide, index) => slideView(spec, unit, slide, index));
    document.title = `${code} ${unit.title} Teacher Slides | SkillrHub`;
    document.body.className = `fcr-slide-body${embed ? " fcr-embed" : ""}`;
    document.body.innerHTML = `<div class="fcr-slide-app"><nav class="fcr-toolbar" aria-label="Teacher slide controls"><div class="fcr-toolbar__group"><a href="${esc(spec.resourceLinks.topic)}">Back to Topic Guide</a><button type="button" data-fcr-prev aria-label="Previous slide">Previous</button><button type="button" data-fcr-next aria-label="Next slide">Next</button></div><div class="fcr-toolbar__group"><label class="fcr-slide-count" for="fcr-slide-select">Slide <span data-fcr-number>1</span> of ${spec.slides.length}</label><select id="fcr-slide-select" aria-label="Choose a slide">${views.map((view, index) => `<option value="${index}">${index + 1}. ${esc(view.heading)}</option>`).join("")}</select><button type="button" data-fcr-fullscreen>Full screen</button></div></nav><div class="fcr-stage-wrap"><main class="fcr-stage" aria-live="polite">${spec.slides.map((slide, index) => `<section class="fcr-slide" data-fcr-slide="${index}"${index ? " hidden" : ""}><div class="fcr-watermark" aria-hidden="true">SkillrHub</div><div class="fcr-url-watermark" aria-hidden="true">https://skillrhub.com</div><header class="fcr-slide-head"><h1>${esc(views[index].heading)}</h1><span class="fcr-free">Free Teacher Resource.</span></header>${patternHtml(views[index])}<footer class="fcr-slide-footer"><div class="fcr-footer-brand"><strong>SkillrHub</strong><span>skillrhub.com</span><span>© 2026</span><span>Free classroom use</span><span>${esc(code)}</span></div><span>${index + 1} / ${spec.slides.length}</span></footer></section>`).join("")}</main></div><aside class="fcr-notes" data-fcr-notes>${notesHtml(spec.slides[0], spec)}</aside></div>`;

    let current = 0;
    const slides = qa("[data-fcr-slide]");
    const select = q("#fcr-slide-select");
    const previous = q("[data-fcr-prev]");
    const next = q("[data-fcr-next]");
    const number = q("[data-fcr-number]");
    const notes = q("[data-fcr-notes]");

    function bindReveal(root = document) {
      qa("[data-fcr-reveal]", root).forEach((button) => {
        if (button.dataset.bound === "true") return;
        button.dataset.bound = "true";
        button.addEventListener("click", () => {
          const answer = button.parentElement.querySelector("[data-fcr-answer]");
          const reveal = answer.hasAttribute("hidden");
          answer.toggleAttribute("hidden", !reveal);
          button.setAttribute("aria-expanded", String(reveal));
          button.textContent = reveal ? "Hide answer" : "Check together";
        });
      });
    }

    function show(index) {
      current = Math.max(0, Math.min(spec.slides.length - 1, index));
      slides.forEach((slide, slideIndex) => { slide.hidden = slideIndex !== current; });
      select.value = String(current);
      number.textContent = String(current + 1);
      previous.disabled = current === 0;
      next.disabled = current === spec.slides.length - 1;
      notes.innerHTML = notesHtml(spec.slides[current], spec);
      history.replaceState(null, "", `${location.pathname}?code=${encodeURIComponent(code)}${embed ? "&embed=1" : ""}#slide-${current + 1}`);
      bindReveal(slides[current]);
    }

    previous.addEventListener("click", () => show(current - 1));
    next.addEventListener("click", () => show(current + 1));
    select.addEventListener("change", () => show(Number(select.value)));
    q("[data-fcr-fullscreen]").addEventListener("click", async () => {
      const stageWrap = q(".fcr-stage-wrap");
      if (!document.fullscreenElement) await stageWrap.requestFullscreen?.();
      else await document.exitFullscreen?.();
    });
    document.addEventListener("keydown", (event) => {
      if (["ArrowRight", "PageDown"].includes(event.key)) { event.preventDefault(); show(current + 1); }
      if (["ArrowLeft", "PageUp"].includes(event.key)) { event.preventDefault(); show(current - 1); }
      if (event.key === "Home") show(0);
      if (event.key === "End") show(spec.slides.length - 1);
    });
    const hashSlide = Number((location.hash.match(/slide-(\d+)/) || [])[1]);
    show(Number.isFinite(hashSlide) && hashSlide > 0 ? hashSlide - 1 : 0);
    document.documentElement.dataset.foundationV11 = code;
    document.documentElement.dataset.foundationClassroom = "true";
    return true;
  }

  window.SkillrFoundationClassroomRollout = {
    renderTopic,
    renderSlides,
    classroomHeading,
    slideView,
    ensureCss
  };
  window.SkillrFoundationV11Renderer = {
    ...baseRenderer,
    renderTopic,
    renderSlides
  };
})();
