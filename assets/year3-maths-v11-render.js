(() => {
  "use strict";

  const q = (selector, root = document) => root.querySelector(selector);
  const qa = (selector, root = document) => [...root.querySelectorAll(selector)];
  const esc = (value) => String(value ?? "").replace(/[&<>\"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[char]));
  const text = (value) => String(value ?? "").replace(/<br\s*\/?>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();

  function ensureCss() {
    if (q("#skillr-foundation-v11-css")) return;
    const style = document.createElement("style");
    style.id = "skillr-foundation-v11-css";
    style.textContent = `
      :root{--v11-navy:#173968;--v11-blue:#2457d6;--v11-blue-soft:#eef5ff;--v11-amber:#f59e0b;--v11-red:#b42318;--v11-green:#13795b;--v11-line:#d8e2ef;--v11-ink:#203047;--v11-muted:#5d6c80;--v11-paper:#fff}
      .v11-hero h1{font-size:clamp(1.75rem,4vw,2.4rem);margin-bottom:.22rem}.v11-hero__subtitle{margin:0 0 .4rem;font-size:clamp(1rem,2vw,1.15rem);font-weight:800}.v11-hero__goal{max-width:820px;margin:0}.v11-layout{align-items:start}.v11-stack{display:grid;gap:12px}.v11-panel{border:1px solid #dfe6f2;border-radius:15px;background:#fff;box-shadow:0 3px 12px rgba(26,58,114,.05);overflow:hidden}.v11-panel>summary{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 16px;cursor:pointer;list-style:none;font-weight:900;color:var(--v11-navy)}.v11-panel>summary::-webkit-details-marker{display:none}.v11-panel>summary::after{content:'+';display:grid;width:27px;height:27px;place-items:center;border-radius:50%;background:#f0f4fa;color:var(--v11-blue)}.v11-panel[open]>summary::after{content:'−'}.v11-panel__body{padding:0 16px 16px}.v11-panel--lesson>summary{cursor:default}.v11-panel--lesson>summary::after{display:none}.v11-lesson{display:grid;gap:18px}.v11-section{padding:0 0 17px;border-bottom:1px solid #e5eaf1}.v11-section:last-child{padding-bottom:0;border-bottom:0}.v11-section-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px}.v11-section-head h2,.v11-section-head h3{margin:0;color:var(--v11-navy);font-size:1.08rem}.v11-badge{display:inline-flex;align-items:center;border:1px solid #d7e3fb;border-radius:999px;padding:4px 8px;background:var(--v11-blue-soft);color:#244a87;font-size:.74rem;font-weight:900}.v11-callout{padding:11px 13px;border:1px solid #d9e6fa;border-radius:12px;background:#f7faff}.v11-glance{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.v11-glance article,.v11-card{padding:12px;border:1px solid #dce5f0;border-radius:12px;background:#fbfcfe}.v11-glance h3,.v11-card h3,.v11-card h4{margin:0 0 6px;color:var(--v11-navy)}.v11-glance p,.v11-card p{margin:5px 0}.v11-success{margin:7px 0 0;padding-left:1.2rem}.v11-success li{margin:4px 0}.v11-boundary{margin-top:10px;border:1px solid #e0e6ee;border-radius:11px;background:#fff}.v11-boundary summary{padding:9px 11px;cursor:pointer;font-weight:800;color:var(--v11-navy)}.v11-boundary-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;padding:0 10px 10px}.v11-boundary-grid div{padding:9px;border-radius:9px;background:#f7f9fc}.v11-boundary-grid strong{display:block;margin-bottom:3px;color:var(--v11-navy)}.v11-progression{display:grid;grid-template-columns:repeat(auto-fit,minmax(135px,1fr));gap:8px}.v11-step{position:relative;padding:34px 10px 10px;border:1px solid #d8e3f1;border-radius:11px;background:#fff}.v11-step span{position:absolute;top:8px;left:9px;display:grid;width:22px;height:22px;place-items:center;border-radius:50%;background:var(--v11-navy);color:#fff;font-size:.75rem;font-weight:900}.v11-step strong{color:var(--v11-navy)}.v11-model{overflow:hidden;border:1px solid #d4e1f0;border-radius:13px;background:#fff}.v11-model__title{padding:9px 12px;border-bottom:1px solid #dce5f0;background:#f6f9fd;color:var(--v11-navy);font-weight:900}.v11-model__body{padding:12px}.v11-model__body .model{margin:6px 0;padding:10px;border:1px dashed #b9c9dc;border-radius:9px;background:#f7f9fc;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;white-space:pre-wrap;overflow-x:auto}.v11-model__body .triple,.v11-model__body .english-card-row{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px}.v11-model__body .triple>div,.v11-model__body .english-card-row>span{padding:10px;border:1px solid #dce5ef;border-radius:10px;background:#fbfcfe}.v11-model__body .big{font-size:2rem;font-weight:900;color:var(--v11-navy)}.v11-context-flow{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}.v11-context-stage{position:relative;min-height:96px;padding:10px;border:1px solid #d5e2f1;border-radius:10px;background:#f9fbfe}.v11-context-stage:not(:last-child)::after{content:'→';position:absolute;right:-17px;top:50%;transform:translateY(-50%);color:var(--v11-blue);font-size:1.35rem;font-weight:900}.v11-context-stage strong{display:block;margin-bottom:5px;color:var(--v11-blue);font-size:.76rem;text-transform:uppercase;letter-spacing:.04em}.v11-context-stage p{margin:0;font-size:.84rem;line-height:1.35}.v11-photo-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px;margin-bottom:10px}.v11-photo{overflow:hidden;border:1px solid #dce5ef;border-radius:11px;background:#fff}.v11-photo img{display:block;width:100%;height:160px;object-fit:cover;background:#eef2f7}.v11-photo figcaption{padding:8px;font-size:.82rem}.v11-photo strong{display:block;color:var(--v11-navy)}.v11-photo small{display:block;margin-top:4px;color:var(--v11-muted)}.v11-elaboration-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:11px}.v11-elaboration{display:grid;align-content:start;gap:8px;padding:12px;border:1px solid #d8e4f2;border-radius:13px;background:#fbfcfe}.v11-elaboration__head{display:flex;align-items:center;gap:8px}.v11-elaboration__code{display:grid;min-width:35px;height:35px;padding:0 6px;place-items:center;border-radius:9px;background:var(--v11-navy);color:#fff;font-size:.76rem;font-weight:900}.v11-elaboration h3{margin:0;color:var(--v11-navy);font-size:1rem}.v11-curriculum-wording{margin:0;padding:8px 10px;border-left:4px solid var(--v11-amber);border-radius:7px;background:#fff9ed;font-size:.84rem}.v11-teacher-action{padding:9px 10px;border-left:4px solid var(--v11-blue);border-radius:8px;background:var(--v11-blue-soft);font-size:.87rem}.v11-checkpoint{padding:9px 10px;border:1px solid #cfe5d5;border-radius:9px;background:#f2faf4;font-size:.87rem}.v11-checkpoint summary{cursor:pointer;font-weight:900;color:var(--v11-green)}.v11-checkpoint dl{display:grid;grid-template-columns:max-content 1fr;gap:5px 8px;margin:8px 0 0}.v11-checkpoint dt{font-weight:900}.v11-checkpoint dd{margin:0}.v11-three{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px}.v11-misconception{border-top:4px solid var(--v11-red)}.v11-misconception .v11-fix{padding:8px;border-radius:8px;background:#eef8f0;color:#1d5130}.v11-diff--support{border-top:4px solid var(--v11-blue)}.v11-diff--core{border-top:4px solid var(--v11-green)}.v11-diff--extend{border-top:4px solid var(--v11-amber)}.v11-master-list{display:grid;gap:8px;counter-reset:master}.v11-master-item{counter-increment:master;padding:10px 12px;border:1px solid #dce5ef;border-radius:10px;background:#fff}.v11-master-item>strong::before{content:counter(master) '. ';color:var(--v11-blue)}.v11-master-item details{margin-top:7px}.v11-master-item summary{cursor:pointer;color:var(--v11-green);font-weight:800}.v11-slide-preview{position:relative;width:100%;aspect-ratio:16/9;overflow:hidden;border:2px solid var(--v11-navy);border-radius:13px;background:#eef3f9}.v11-slide-preview iframe{display:block;width:100%;height:100%;border:0}.v11-resource-row{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}.v11-resource-row a{display:inline-flex;align-items:center;justify-content:center;padding:9px 12px;border:1px solid #cbd8e8;border-radius:9px;background:#fff;color:var(--v11-blue);font-weight:800;text-decoration:none}.v11-resource-row a.primary{background:var(--v11-blue);border-color:var(--v11-blue);color:#fff}.v11-related{columns:2;gap:24px}.v11-related li{break-inside:avoid;margin:5px 0}
      .v11-model__body>svg{display:block;width:100%;height:auto;max-height:270px}.v11-elaboration .v11-context-flow{grid-template-columns:1fr;gap:18px}.v11-elaboration .v11-context-stage{min-height:0}.v11-elaboration .v11-context-stage:not(:last-child)::after{content:'↓';right:50%;top:auto;bottom:-19px;transform:translateX(50%)}
      .v11-slide-body{margin:0;background:#edf2f8;color:var(--v11-ink);font-family:Arial,Helvetica,sans-serif}.v11-slide-app{min-height:100vh}.v11-slide-toolbar{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:9px 12px;background:#fff;border-bottom:1px solid var(--v11-line);position:sticky;top:0;z-index:50}.v11-slide-toolbar__group{display:flex;align-items:center;gap:7px;min-width:0}.v11-slide-toolbar a,.v11-slide-toolbar button,.v11-slide-toolbar select{min-height:38px;border:1px solid #cbd8e8;border-radius:9px;background:#fff;color:var(--v11-navy);font-weight:800;padding:7px 10px}.v11-slide-toolbar a{text-decoration:none;display:inline-flex;align-items:center}.v11-slide-toolbar button:not(:disabled){cursor:pointer}.v11-slide-toolbar button:disabled{opacity:.45}.v11-slide-count{white-space:nowrap;color:var(--v11-muted);font-size:.85rem;font-weight:800}.v11-stage-wrap{max-width:1280px;margin:12px auto;padding:0 12px}.v11-stage{position:relative;width:100%;aspect-ratio:16/9;overflow:hidden;border:1px solid #cfdbe9;border-radius:15px;background:#fff;box-shadow:0 10px 30px rgba(23,57,104,.12)}.v11-slide{position:absolute;inset:0;display:grid;grid-template-rows:auto 1fr auto;padding:clamp(16px,2.4vw,34px);background:#fff}.v11-slide[hidden]{display:none}.v11-slide-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;padding-bottom:10px;border-bottom:3px solid var(--v11-blue)}.v11-slide-kicker{margin:0 0 3px;color:var(--v11-blue);font-size:clamp(.7rem,1.15vw,.95rem);font-weight:900;text-transform:uppercase;letter-spacing:.04em}.v11-slide h1{margin:0;color:var(--v11-navy);font-size:clamp(1.55rem,3vw,2.7rem);line-height:1.05}.v11-slide-purpose{max-width:38%;margin:0;text-align:right;color:var(--v11-muted);font-size:clamp(.68rem,1.05vw,.93rem);font-weight:700}.v11-slide-content{min-height:0;display:grid;align-items:center;gap:14px;padding:12px 0}.v11-slide-content--two{grid-template-columns:minmax(0,1.2fr) minmax(260px,.8fr)}.v11-slide .v11-model{max-height:100%;overflow:auto}.v11-slide .v11-model__body{padding:clamp(8px,1.25vw,16px);font-size:clamp(.72rem,1.14vw,1rem)}.v11-slide .v11-model__body .model{font-size:clamp(.68rem,1vw,.94rem)}.v11-slide .v11-photo-grid{grid-template-columns:repeat(3,minmax(0,1fr));margin:0}.v11-slide .v11-photo img{height:clamp(90px,15vh,175px)}.v11-slide-card{padding:clamp(10px,1.4vw,18px);border:1px solid #d8e3f0;border-radius:13px;background:#f8fbff}.v11-slide-card h2,.v11-slide-card h3{margin:0 0 7px;color:var(--v11-navy);font-size:clamp(1rem,1.7vw,1.45rem)}.v11-slide-card p,.v11-slide-card li{font-size:clamp(.72rem,1.15vw,1.02rem)}.v11-slide-card p{margin:5px 0}.v11-slide-prompt{padding:10px 12px;border-left:5px solid var(--v11-green);border-radius:9px;background:#eef8f0;font-size:clamp(.78rem,1.25vw,1.1rem);font-weight:900}.v11-slide-footer{display:flex;justify-content:space-between;gap:10px;padding-top:8px;border-top:1px solid #dce5ef;color:var(--v11-muted);font-size:clamp(.62rem,.9vw,.8rem);font-weight:800}.v11-slide-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px}.v11-slide-grid--two{grid-template-columns:repeat(2,minmax(0,1fr))}.v11-slide-grid .v11-card{padding:clamp(8px,1.1vw,13px);font-size:clamp(.68rem,1vw,.9rem)}.v11-notes{max-width:1280px;margin:0 auto 20px;padding:0 12px}.v11-notes details{border:1px solid #d5e0ed;border-radius:12px;background:#fff}.v11-notes summary{padding:11px 13px;cursor:pointer;color:var(--v11-navy);font-weight:900}.v11-notes-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;padding:0 12px 12px}.v11-note{padding:9px;border-radius:9px;background:#f6f9fd;font-size:.8rem}.v11-note strong{display:block;margin-bottom:4px;color:var(--v11-blue)}.v11-note--fix{background:#fff7ef}.v11-note--check{grid-column:1/-1;background:#f1f9f3}.v11-embed .v11-slide-toolbar,.v11-embed .v11-notes{display:none}.v11-embed .v11-stage-wrap{margin:0;padding:0;max-width:none}.v11-embed .v11-stage{border:0;border-radius:0;box-shadow:none}.v11-embed .v11-slide{padding:clamp(10px,2vw,24px)}
      @media(max-width:900px){.v11-layout{grid-template-columns:1fr!important}.curriculum-sidebar{order:-1}.v11-elaboration-grid{grid-template-columns:1fr}.v11-three{grid-template-columns:1fr}.v11-slide-content--two{grid-template-columns:1fr}.v11-slide-purpose{display:none}.v11-notes-grid{grid-template-columns:1fr 1fr}.v11-note--check{grid-column:1/-1}.v11-stage{aspect-ratio:auto;min-height:72vh}.v11-slide{position:relative;min-height:72vh}.v11-slide .v11-photo-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.v11-slide .v11-context-flow{grid-template-columns:1fr;gap:18px}.v11-slide .v11-context-stage:not(:last-child)::after{content:'↓';right:50%;top:auto;bottom:-19px;transform:translateX(50%)}}
      @media(max-width:650px){.v11-glance,.v11-boundary-grid,.v11-model__body .triple,.v11-model__body .english-card-row,.v11-photo-grid,.v11-slide-grid,.v11-slide-grid--two,.v11-slide .v11-photo-grid{grid-template-columns:1fr}.v11-related{columns:1}.v11-slide-toolbar{align-items:flex-start;flex-wrap:wrap}.v11-slide-toolbar__group{width:100%;justify-content:space-between}.v11-slide-toolbar select{min-width:0;max-width:60%}.v11-stage-wrap{padding:0 6px}.v11-slide{padding:14px}.v11-slide h1{font-size:1.45rem}.v11-notes-grid{grid-template-columns:1fr}.v11-note--check{grid-column:auto}}
      @media print{.v11-slide-toolbar,.v11-notes{display:none!important}.v11-stage-wrap{margin:0;padding:0;max-width:none}.v11-stage{border:0;box-shadow:none}.v11-slide[hidden]{display:none!important}.v11-slide{position:relative;aspect-ratio:16/9;break-after:page}.v11-slide-body{background:#fff}}
    `;
    document.head.appendChild(style);
  }

  function modelById(spec, id) {
    return spec.models.find((model) => model.id === id);
  }

  function renderPhotos(unit, limit = 3) {
    const visuals = (unit.visuals || []).slice(0, limit);
    if (!visuals.length) return "";
    return `<div class="v11-photo-grid">${visuals.map((visual) => `<figure class="v11-photo"><img src="${esc(visual.src)}" alt="${esc(visual.alt)}" loading="lazy"><figcaption><strong>${esc(visual.title)}</strong>${esc(visual.body)}<small>${esc(visual.credit || "")} ${visual.source ? `• <a href="${esc(visual.source)}" target="_blank" rel="nofollow noopener">Source</a>` : ""}</small></figcaption></figure>`).join("")}</div>`;
  }

  function renderModel(spec, unit, id) {
    const model = modelById(spec, id);
    if (!model) return "";
    const flow = /curriculumContextFlow$/.test(model.component)
      ? `<div class="v11-context-flow" role="img" aria-label="${esc(model.accessibleDescription)}">${(model.parameters?.stages || []).map((stage) => `<div class="v11-context-stage"><strong>${esc(stage.label)}</strong><p>${esc(stage.text)}</p></div>`).join("")}</div>`
      : "";
    const parameterModel = !model.parameters?.displayHtml && !flow && model.parameters?.Given
      ? `<div class="v11-context-flow" role="img" aria-label="${esc(model.accessibleDescription)}"><div class="v11-context-stage"><strong>Given</strong><p>${esc(model.parameters.Given)}</p></div><div class="v11-context-stage"><strong>Model</strong><p>${esc(model.parameters.Model)}</p></div><div class="v11-context-stage"><strong>Result</strong><p>${esc(model.parameters.Result)}</p></div></div>` : "";
    const html = model.parameters?.displayHtml || flow || parameterModel;
    const photos = model.component === "foundationScienceEvidence" ? renderPhotos(unit) : "";
    return `<div class="v11-model" data-model-id="${esc(model.id)}" role="img" aria-label="${esc(model.accessibleDescription)}"><div class="v11-model__title">${esc(model.purpose)}</div><div class="v11-model__body">${photos}${html || `<p>${esc(model.accessibleDescription)}</p>`}</div></div>`;
  }

  function checkpointById(spec, id) {
    return spec.masteryItems.find((item) => item.id === id);
  }

  function renderCheckpoint(item, label = "20–30 second checkpoint") {
    if (!item) return "";
    return `<details class="v11-checkpoint"><summary>${esc(label)}: ${esc(item.prompt)}</summary><dl><dt>Expected</dt><dd>${esc(item.expectedAnswer)}</dd><dt>Accept</dt><dd>${esc(item.acceptableRepresentations.join(", "))}</dd><dt>Look for</dt><dd>${esc(item.evidenceOfMastery)}</dd><dt>Likely error</dt><dd>${esc(item.likelyMisconception)}</dd><dt>Respond</dt><dd>${esc(item.remediation)}</dd></dl></details>`;
  }

  function renderElaboration(spec, unit, elaboration) {
    const checkpoint = checkpointById(spec, elaboration.checkpointIds[0]);
    return `<article class="v11-elaboration" data-elaboration-id="${esc(elaboration.id)}"><div class="v11-elaboration__head"><span class="v11-elaboration__code">${esc(elaboration.id)}</span><h3>${esc(elaboration.teachingPurpose)}</h3></div><p class="v11-curriculum-wording"><strong>Curriculum context:</strong> ${esc(elaboration.curriculumWording)}${elaboration.teachingContext ? " (teaching context)" : ""}</p><p><strong>Plain-language idea:</strong> ${esc(elaboration.plainLanguageConcept)}</p>${elaboration.modelIds.map((id) => renderModel(spec, unit, id)).join("")}<div class="v11-teacher-action"><strong>Teacher does:</strong> ${esc(elaboration.teacherDoes)}<br><strong>Teacher asks:</strong> ${esc(elaboration.teacherSaysOrAsks)}<br><strong>Student does:</strong> ${esc(elaboration.studentDoes)}</div>${renderCheckpoint(checkpoint)}</article>`;
  }

  function legacySection(title) {
    const heading = qa("h2").find((element) => element.textContent.trim().toLowerCase() === title.toLowerCase());
    return heading?.closest("section")?.innerHTML || "";
  }

  function hasAuthoredExpandedTopic() {
    return Boolean(q('main a[href*="teacher-deck/"]')) && qa("main h2").length >= 5;
  }

  function relatedLinks(data, order, config) {
    return order.map((code) => data[code]).filter(Boolean).map((unit, index) => `<li><a href="/year3/maths/${esc(unit.slug)}/">${esc(order[index])}: ${esc(unit.title)}</a></li>`).join("");
  }

  function referenceHtml(spec) {
    return `<p><strong>Content description:</strong> ${esc(spec.contentDescription)}</p>${spec.elaborations.length ? `<ul>${spec.elaborations.map((item) => `<li><strong>${esc(item.id)}:</strong> ${esc(item.curriculumWording)}${item.teachingContext ? " <em>(teaching context)</em>" : ""}</li>`).join("")}</ul>` : `<p>No separate elaborations are listed for this content description. The central model teaches the complete description.</p>`}`;
  }

  function ensureSpec(data, code, config) {
    const unit = data[code];
    if (!unit) return null;
    if (!unit.canonical) window.SkillrYear3MathsCanonical.build(code, unit);
    return unit.canonical;
  }

  function topicCode(data) {
    const meta = window.skillrPageMeta?.curriculumCode;
    if (meta && data[meta]) return meta;
    const match = location.pathname.match(/(ac9[a-z0-9]+)/i);
    const code = match?.[1]?.toUpperCase();
    return code && data[code] ? code : null;
  }

  function renderTopic({ data, order, config }) {
    ensureCss();
    const code = topicCode(data);
    const unit = code && data[code];
    const spec = code && ensureSpec(data, code, config);
    const hero = q(".curriculum-hero");
    const main = q("main.curriculum-layout");
    if (!unit || !spec || !hero || !main) return false;
    if (document.body.dataset.skillrPreserveTopic === "true" || hasAuthoredExpandedTopic()) return enhanceStaticTopic({ data, order, config, code, unit, spec });

    const international = legacySection("International curriculum mapping");
    const official = legacySection("Official curriculum references");
    const index = order.indexOf(code);
    const previous = order[index - 1];
    const next = order[index + 1];
    document.title = `${code} ${unit.title} | Year 3 ${spec.subject}`;
    const metaDescription = q('meta[name="description"]');
    if (metaDescription) metaDescription.content = `Teach ${code} ${unit.title} with an aligned Year 3 ${spec.subject} topic guide, selectable teacher slides, visual elaborations, Practice Sheet, Practice and Test.`;

    hero.classList.add("v11-hero");
    hero.innerHTML = `<p class="curriculum-eyebrow">${esc(code)} • Year 3 ${esc(spec.subject)}</p><h1>${esc(unit.title)}</h1><p class="v11-hero__subtitle">${esc(unit.subtitle)}</p><p class="v11-hero__goal">${esc(spec.learningIntention)}</p><div class="topic-action-row"><a class="primary" href="#teaching-lesson">Topic Guide</a><a href="${esc(spec.resourceLinks.slide)}" target="_blank" rel="noopener">Teacher Slides</a><a href="${esc(spec.resourceLinks.worksheet)}" target="_blank" rel="noopener">Practice Sheet</a><a href="${esc(spec.resourceLinks.practice)}">Practice</a><a href="${esc(spec.resourceLinks.test)}">Test</a></div><button class="report-issue-button" type="button" data-report-issue>Report issue</button>`;

    const glance = `<section class="v11-section"><div class="v11-section-head"><h2>Lesson at a glance</h2><span class="v11-badge">${esc(spec.lessonTime)}</span></div><div class="v11-glance"><article><h3>Learning intention</h3><p>${esc(spec.learningIntention)}</p><h3>Success criteria</h3><ul class="v11-success">${spec.successCriteria.map((item) => `<li>${esc(item)}</li>`).join("")}</ul></article><article><h3>Materials</h3><p>${esc(spec.materials.join(", "))}</p><h3>Teaching sequence</h3><p>${esc(spec.teachingProgression.name)}</p></article></div><details class="v11-boundary"><summary>Teacher concept boundary</summary><div class="v11-boundary-grid"><div><strong>Must teach</strong>${esc(spec.conceptBoundary.mustTeach.join(" "))}</div><div><strong>Prerequisite</strong>${esc(spec.conceptBoundary.prerequisites.join(" "))}</div><div><strong>May support informally</strong>${esc(spec.conceptBoundary.maySupportInformally.join(" "))}</div><div><strong>Must not overteach</strong>${esc(spec.conceptBoundary.mustNotOverteach.join(" "))}</div></div></details></section>`;
    const progression = `<section class="v11-section"><div class="v11-section-head"><h2>Teaching progression</h2><span class="v11-badge">Why this order works</span></div><p>${esc(spec.teachingProgression.reason)}</p><div class="v11-progression">${spec.teachingProgression.steps.map((step, stepIndex) => `<div class="v11-step"><span>${stepIndex + 1}</span><strong>${esc(step.purpose)}</strong><p>${esc(step.studentAction)}</p></div>`).join("")}</div></section>`;
    const mainModel = `<section class="v11-section"><div class="v11-section-head"><h2>Central teaching model</h2><span class="v11-badge">Same model in slides</span></div>${renderModel(spec, unit, "main-model")}${renderCheckpoint(checkpointById(spec, "checkpoint-model"))}</section>`;
    const workedExamples = `<section class="v11-section"><div class="v11-section-head"><h2>Two worked examples</h2><span class="v11-badge">Explain every step</span></div><div class="v11-elaboration-grid">${spec.workedExamples.map((example) => `<article class="v11-card"><h3>${esc(example.title)}</h3>${example.modelIds.map((id) => renderModel(spec, unit, id)).join("")}<ol>${example.steps.map((step) => `<li>${esc(step)}</li>`).join("")}</ol><p><strong>Teacher language:</strong> ${esc(example.teacherLanguage)}</p></article>`).join("")}</div>${renderCheckpoint(checkpointById(spec, "checkpoint-application"))}</section>`;
    const elaborations = `<section class="v11-section"><div class="v11-section-head"><h2>Teach every curriculum elaboration</h2><span class="v11-badge">${spec.elaborations.length || "No separate"} elaboration${spec.elaborations.length === 1 ? "" : "s"}</span></div>${spec.elaborations.length ? `<div class="v11-elaboration-grid">${spec.elaborations.map((item) => renderElaboration(spec, unit, item)).join("")}</div>` : `<div class="v11-callout">This code has no separately listed elaborations. Teach and assess the complete content description through the central and application models above.</div>`}</section>`;
    const vocabulary = `<section class="v11-section"><div class="v11-section-head"><h2>Key vocabulary</h2><span class="v11-badge">Say it • show it • use it</span></div><div class="v11-three">${spec.vocabulary.map((item) => `<article class="v11-card"><h3>${esc(item.term)}</h3><p>${esc(item.definition)}</p></article>`).join("")}</div></section>`;
    const misconceptions = `<section class="v11-section"><div class="v11-section-head"><h2>Misconceptions and rapid fixes</h2><span class="v11-badge">Respond to the cause</span></div><div class="v11-three">${spec.misconceptions.map((item) => `<article class="v11-card v11-misconception"><h3>${esc(item.title)}</h3><p>${esc(item.cause)}</p><p class="v11-fix"><strong>Rapid fix:</strong> ${esc(item.rapidFix)}</p></article>`).join("")}</div></section>`;
    const activity = `<section class="v11-section"><div class="v11-section-head"><h2>Five-minute activity and differentiation</h2><span class="v11-badge">Ready to use</span></div><div class="v11-callout"><strong>${esc(spec.warmUp.title)}</strong><p>${esc(spec.warmUp.steps.join(" "))}</p></div><div class="v11-three" style="margin-top:10px"><article class="v11-card v11-diff--support"><h3>Support</h3><p>${esc(spec.differentiation.support.adaptation)}</p></article><article class="v11-card v11-diff--core"><h3>Core</h3><p>${esc(spec.differentiation.core.adaptation)}</p></article><article class="v11-card v11-diff--extend"><h3>Extend</h3><p>${esc(spec.differentiation.extend.adaptation)}</p></article></div></section>`;
    const finalItems = spec.masteryItems.filter((item) => item.type !== "formative" || item.id === "checkpoint-model").slice(0, 4);
    const mastery = `<section class="v11-section"><div class="v11-section-head"><h2>Quick mastery check</h2><span class="v11-badge">Answers and remediation included</span></div><div class="v11-master-list">${finalItems.map((item) => `<div class="v11-master-item"><strong>${esc(item.prompt)}</strong><details><summary>Teacher answer and response</summary><p><strong>Expected:</strong> ${esc(item.expectedAnswer)}</p><p><strong>Evidence:</strong> ${esc(item.evidenceOfMastery)}</p><p><strong>If incorrect:</strong> ${esc(item.remediation)}</p></details></div>`).join("")}</div></section>`;
    const preview = `<section class="v11-section"><div class="v11-section-head"><h2>Matching teacher-slide sequence</h2><span class="v11-badge">${spec.slides.length} selectable slides</span></div><p>The slides use this same lesson specification, examples, terminology, models, misconceptions and checks.</p><div class="v11-slide-preview"><iframe title="${esc(code)} teacher-slide preview" src="${esc(spec.resourceLinks.slide)}&embed=1" loading="lazy"></iframe></div><div class="v11-resource-row"><a class="primary" href="${esc(spec.resourceLinks.slide)}" target="_blank" rel="noopener">Open Teacher Slides</a><a href="${esc(spec.resourceLinks.worksheet)}" target="_blank" rel="noopener">Practice Sheet</a><a href="${esc(spec.resourceLinks.practice)}">Practice</a><a href="${esc(spec.resourceLinks.test)}">Test</a></div></section>`;

    main.className = "curriculum-layout v11-layout";
    main.innerHTML = `<div class="v11-stack"><details class="v11-panel v11-panel--lesson" id="teaching-lesson" open><summary>Teach the complete curriculum code</summary><div class="v11-panel__body v11-lesson">${glance}${vocabulary}${progression}${mainModel}${workedExamples}${elaborations}${misconceptions}${activity}${mastery}${preview}</div></details><details class="v11-panel"><summary>Australian Curriculum description and elaborations</summary><div class="v11-panel__body">${referenceHtml(spec)}</div></details><details class="v11-panel" id="teacher-slide"><summary>Teacher resource</summary><div class="v11-panel__body"><h3>Selectable classroom slides</h3><p>One teaching purpose per 16:9 slide, with teacher actions and checkpoints available below the projector view.</p><div class="v11-resource-row"><a class="primary" href="${esc(spec.resourceLinks.slide)}" target="_blank" rel="noopener">Open Teacher Slides</a></div></div></details><details class="v11-panel"><summary>International curriculum mapping</summary><div class="v11-panel__body">${international || "<p>Use the Australian Curriculum code as the exact reference and map it to the closest local Year 3 outcome.</p>"}</div></details><details class="v11-panel"><summary>Related Year 3 ${esc(spec.subject)} topics</summary><div class="v11-panel__body"><ul class="v11-related">${relatedLinks(data, order, config)}</ul></div></details><details class="v11-panel"><summary>Official references</summary><div class="v11-panel__body">${official || '<p><a href="https://www.australiancurriculum.edu.au/" target="_blank" rel="nofollow noopener">Australian Curriculum Version 9.0</a></p>'}</div></details></div><aside class="curriculum-sidebar"><section class="curriculum-panel"><h2>Next step</h2><div class="curriculum-link-row"><a class="curriculum-button primary" href="${esc(spec.resourceLinks.practice)}">Practice</a><a class="curriculum-button" href="${esc(spec.resourceLinks.worksheet)}" target="_blank" rel="noopener">Practice Sheet</a><a class="curriculum-button" href="${esc(spec.resourceLinks.test)}">Test</a></div></section><section class="curriculum-panel"><h2>Learning path</h2><div class="curriculum-link-row">${next ? `<a href="/year3/maths/${esc(data[next].slug)}/">Next ${esc(spec.subject)} unit</a>` : ""}${previous ? `<a href="/year3/maths/${esc(data[previous].slug)}/">Previous ${esc(spec.subject)} unit</a>` : ""}<a href="/year4/">Next year</a></div></section></aside>`;
    document.documentElement.dataset.year3MathsV11 = code;
    window.skillrPageMeta = { ...(window.skillrPageMeta || {}), curriculumCode: code, title: unit.title, subject: spec.subject, lessonSchema: "1.1" };
    return true;
  }

  function enhanceStaticTopic({ spec, code }) {
    if (q("#v11-static-alignment")) return true;
    qa("a").forEach((link) => {
      if (/teacher slide/i.test(link.textContent || "")) { link.href = spec.resourceLinks.slide; link.target = "_blank"; link.rel = "noopener"; link.textContent = /open/i.test(link.textContent || "") ? "Open Teacher Slides" : "Teacher Slides"; }
      if (/^worksheet$/i.test((link.textContent || "").trim())) link.textContent = "Practice Sheet";
    });
    const stack = q(".lesson-stack") || q("main.curriculum-layout>div") || q("main");
    if (!stack) return false;
    const checks = spec.masteryItems.filter((item) => item.type === "mastery").slice(0, 3);
    const alignment = document.createElement("details");
    alignment.className = "v11-panel";
    alignment.id = "v11-static-alignment";
    alignment.open = true;
    alignment.innerHTML = `<summary>Canonical lesson guidance</summary><div class="v11-panel__body"><div class="v11-glance"><article><h3>Concept boundary</h3><p><strong>Must teach:</strong> ${esc(spec.conceptBoundary.mustTeach.join(" "))}</p><p><strong>Must not overteach:</strong> ${esc(spec.conceptBoundary.mustNotOverteach.join(" "))}</p></article><article><h3>Support / Core / Extend</h3><p><strong>Support:</strong> ${esc(spec.differentiation.support.adaptation)}</p><p><strong>Core:</strong> ${esc(spec.differentiation.core.adaptation)}</p><p><strong>Extend:</strong> ${esc(spec.differentiation.extend.adaptation)}</p></article></div><div class="v11-master-list" style="margin-top:10px">${checks.map((item) => `<div class="v11-master-item"><strong>${esc(item.prompt)}</strong><details><summary>Answer and remediation</summary><p>${esc(item.expectedAnswer)}</p><p><strong>If incorrect:</strong> ${esc(item.remediation)}</p></details></div>`).join("")}</div></div>`;
    const teacherResource = q("#teacher-slide");
    stack.insertBefore(alignment, teacherResource || null);
    const preview = document.createElement("section");
    preview.className = "v11-section";
    const embedUrl = `${spec.resourceLinks.slide}${spec.resourceLinks.slide.includes("?") ? "&" : "?"}embed=1`;
    preview.innerHTML = `<div class="v11-section-head"><h2>Matching teacher-slide sequence</h2><span class="v11-badge">${spec.slides.length} selectable slides</span></div><div class="v11-slide-preview"><iframe title="${esc(code)} teacher-slide preview" src="${esc(embedUrl)}" loading="lazy"></iframe></div><div class="v11-resource-row"><a class="primary" href="${esc(spec.resourceLinks.slide)}" target="_blank" rel="noopener">Open Teacher Slides</a></div>`;
    alignment.insertAdjacentElement("afterend", preview);
    document.documentElement.dataset.year3MathsV11 = code;
    window.skillrPageMeta = { ...(window.skillrPageMeta || {}), lessonSchema: "1.1" };
    return true;
  }

  function slideContent(slide, spec, unit) {
    const models = slide.display.modelIds.map((id) => renderModel(spec, unit, id)).join("");
    if (slide.display.type === "intro") return `<div class="v11-slide-content v11-slide-content--two"><div class="v11-slide-card"><h2>Learning intention</h2><p>${esc(spec.learningIntention)}</p><h3>Success looks like</h3><ul>${spec.successCriteria.slice(0, 4).map((item) => `<li>${esc(item)}</li>`).join("")}</ul></div><div class="v11-slide-card"><h2>Materials</h2><p>${esc(spec.materials.join(", "))}</p><h3>Lesson sequence</h3><p>${esc(spec.teachingProgression.name)}</p><h3>Time</h3><p>${esc(spec.lessonTime)}</p></div></div>`;
    if (slide.display.type === "model" || slide.display.type === "application") return `<div class="v11-slide-content v11-slide-content--two"><div>${models}</div><div class="v11-slide-card"><h2>Think and show</h2><p>${esc(slide.display.studentPrompt)}</p><div class="v11-slide-prompt">Explain what in the model proves your answer.</div></div></div>`;
    if (slide.display.type === "elaboration") {
      const elaboration = spec.elaborations.find((item) => slide.elaborationIds.includes(item.id));
      return `<div class="v11-slide-content v11-slide-content--two"><div>${models}</div><div class="v11-slide-card"><span class="v11-badge">${esc(elaboration.id)} curriculum context</span><h2>Student-friendly idea</h2><p>${esc(elaboration.plainLanguageConcept)}</p><div class="v11-slide-prompt">${esc(slide.display.studentPrompt)}</div></div></div>`;
    }
    if (slide.display.type === "misconceptions") return `<div class="v11-slide-content"><div class="v11-slide-grid">${spec.misconceptions.map((item) => `<article class="v11-card v11-misconception"><h3>${esc(item.title)}</h3><p>${esc(item.evidence)}</p><p class="v11-fix"><strong>Fix:</strong> ${esc(item.rapidFix)}</p></article>`).join("")}</div><div class="v11-slide-prompt">${esc(slide.display.studentPrompt)}</div></div>`;
    if (slide.display.type === "activity") return `<div class="v11-slide-content v11-slide-content--two"><div class="v11-slide-card"><h2>Five-minute activity</h2><p><strong>${esc(spec.warmUp.title)}</strong></p><ol>${spec.warmUp.steps.map((step) => `<li>${esc(step)}</li>`).join("")}</ol></div><div class="v11-slide-grid" style="grid-template-columns:1fr"><article class="v11-card v11-diff--support"><h3>Support</h3><p>${esc(spec.differentiation.support.adaptation)}</p></article><article class="v11-card v11-diff--core"><h3>Core</h3><p>${esc(spec.differentiation.core.adaptation)}</p></article><article class="v11-card v11-diff--extend"><h3>Extend</h3><p>${esc(spec.differentiation.extend.adaptation)}</p></article></div></div>`;
    return `<div class="v11-slide-content"><div class="v11-slide-grid v11-slide-grid--two">${spec.masteryItems.filter((item) => item.type === "mastery").slice(0, 4).map((item, index) => `<article class="v11-slide-card"><h2>${index + 1}</h2><p>${esc(item.prompt)}</p></article>`).join("")}</div><div class="v11-slide-prompt">Show your answer, then explain the evidence.</div></div>`;
  }

  function notesHtml(slide, spec) {
    const checkpoints = slide.checkpointIds.map((id) => checkpointById(spec, id)).filter(Boolean);
    const layer = slide.teacherLayer;
    return `<details open><summary>Teacher actions and formative guidance for this slide</summary><div class="v11-notes-grid"><div class="v11-note"><strong>Teacher does</strong>${esc(layer.teacherDoes)}</div><div class="v11-note"><strong>Teacher says / asks</strong>${esc(layer.teacherSaysOrAsks)}</div><div class="v11-note"><strong>Student does</strong>${esc(layer.studentDoes)}</div><div class="v11-note"><strong>What to look for</strong>${esc(layer.whatToLookFor)}</div><div class="v11-note v11-note--fix"><strong>If incorrect</strong>${esc(layer.ifIncorrect)}</div>${checkpoints.map((item) => `<div class="v11-note v11-note--check"><strong>20–30 second checkpoint</strong>${esc(item.prompt)} <b>Expected:</b> ${esc(item.expectedAnswer)} <b>Decision:</b> Continue when ${esc(item.decision.continueWhen.toLowerCase())}; reteach when ${esc(item.decision.reteachWhen.toLowerCase())}</div>`).join("")}</div></details>`;
  }

  function renderSlides({ data, config }) {
    ensureCss();
    const code = String(new URLSearchParams(location.search).get("code") || "").toUpperCase();
    const unit = data[code];
    const spec = unit && ensureSpec(data, code, config);
    if (!unit || !spec) { document.body.innerHTML = "<p>Choose a valid Year 3 Maths curriculum code.</p>"; return false; }
    const embed = new URLSearchParams(location.search).get("embed") === "1";
    document.title = `${code} ${unit.title} Teacher Slides | SkillrHub`;
    document.body.className = `v11-slide-body${embed ? " v11-embed" : ""}`;
    document.body.innerHTML = `<div class="v11-slide-app"><nav class="v11-slide-toolbar" aria-label="Teacher slide controls"><div class="v11-slide-toolbar__group"><a href="${esc(spec.resourceLinks.topic)}">Back to Topic Guide</a><button type="button" data-slide-prev aria-label="Previous slide">Previous</button><button type="button" data-slide-next aria-label="Next slide">Next</button></div><div class="v11-slide-toolbar__group"><label for="v11-slide-select" class="v11-slide-count">Slide <span data-slide-number>1</span> of ${spec.slides.length}</label><select id="v11-slide-select" aria-label="Choose slide">${spec.slides.map((slide, index) => `<option value="${index}">${slide.sequenceRole === "core" ? "Core" : "Optional"} ${index + 1}. ${esc(slide.title)}</option>`).join("")}</select><button type="button" data-slide-fullscreen>Full screen</button></div></nav><div class="v11-stage-wrap"><main class="v11-stage" aria-live="polite">${spec.slides.map((slide, index) => `<section class="v11-slide" data-slide-index="${index}"${index ? " hidden" : ""}><header class="v11-slide-head"><div><p class="v11-slide-kicker">${esc(code)} • Year 3 ${esc(spec.subject)} • ${slide.sequenceRole === "core" ? "Core slide" : "Optional extension"} ${index + 1}</p><h1>${esc(slide.title)}</h1></div><p class="v11-slide-purpose">${esc(slide.purpose)}</p></header>${slideContent(slide, spec, unit)}<footer class="v11-slide-footer"><span>SkillrHub • ${esc(spec.teachingProgression.name)}</span><span>${index + 1} / ${spec.slides.length}</span></footer></section>`).join("")}</main></div><aside class="v11-notes" data-slide-notes>${notesHtml(spec.slides[0], spec)}</aside></div>`;

    let current = 0;
    const slides = qa("[data-slide-index]");
    const select = q("#v11-slide-select");
    const previous = q("[data-slide-prev]");
    const next = q("[data-slide-next]");
    const number = q("[data-slide-number]");
    const notes = q("[data-slide-notes]");
    function show(index) {
      current = Math.max(0, Math.min(spec.slides.length - 1, index));
      slides.forEach((slide, slideIndex) => { slide.hidden = slideIndex !== current; });
      select.value = String(current);
      number.textContent = String(current + 1);
      previous.disabled = current === 0;
      next.disabled = current === spec.slides.length - 1;
      if (notes) notes.innerHTML = notesHtml(spec.slides[current], spec);
      history.replaceState(null, "", `${location.pathname}?code=${encodeURIComponent(code)}${embed ? "&embed=1" : ""}#slide-${current + 1}`);
    }
    previous.addEventListener("click", () => show(current - 1));
    next.addEventListener("click", () => show(current + 1));
    select.addEventListener("change", () => show(Number(select.value)));
    q("[data-slide-fullscreen]")?.addEventListener("click", async () => { if (!document.fullscreenElement) await q(".v11-slide-app")?.requestFullscreen?.(); else await document.exitFullscreen?.(); });
    document.addEventListener("keydown", (event) => {
      if (["ArrowRight", "PageDown"].includes(event.key)) { event.preventDefault(); show(current + 1); }
      if (["ArrowLeft", "PageUp"].includes(event.key)) { event.preventDefault(); show(current - 1); }
      if (event.key === "Home") show(0);
      if (event.key === "End") show(spec.slides.length - 1);
    });
    const hashSlide = Number((location.hash.match(/slide-(\d+)/) || [])[1]);
    show(Number.isFinite(hashSlide) && hashSlide > 0 ? hashSlide - 1 : 0);
    document.documentElement.dataset.year3MathsV11 = code;
    return true;
  }

  window.SkillrYear3MathsV11Renderer = { renderTopic, renderSlides, enhanceStaticTopic, ensureCss };
})();

if (document.readyState === "loading") {
  document.write('<script src="/assets/foundation-classroom-rollout.js?v=20260813-foundation2"><\/script>');
}
