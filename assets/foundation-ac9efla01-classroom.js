(() => {
  "use strict";

  const CODE = "AC9EFLA01";
  const spec = window.SkillrAC9EFLA01Lesson;
  const baseRenderer = window.SkillrFoundationV11Renderer;
  if (!spec || !baseRenderer) return;

  const q = (selector, root = document) => root.querySelector(selector);
  const qa = (selector, root = document) => [...root.querySelectorAll(selector)];
  const esc = (value) => String(value ?? "").replace(/[&<>\"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[character]));
  const modelById = (id) => spec.models.find((item) => item.id === id);
  const sceneById = (id) => spec.scenes[id];
  const checkpointById = (id) => spec.masteryItems.find((item) => item.id === id);

  function topicCode(data) {
    const fromMeta = String(window.skillrPageMeta?.curriculumCode || "").toUpperCase();
    if (fromMeta && data?.[fromMeta]) return fromMeta;
    return String((location.pathname.match(/ac9[a-z0-9]+/i) || [""])[0]).toUpperCase();
  }

  function isPrototypeTopic(data) {
    return topicCode(data) === CODE;
  }

  function isPrototypeSlides() {
    return String(new URLSearchParams(location.search).get("code") || "").toUpperCase() === CODE;
  }

  function ensureCss() {
    if (q("#skillr-ac9efla01-classroom-css")) return;
    const style = document.createElement("style");
    style.id = "skillr-ac9efla01-classroom-css";
    style.textContent = `
      :root{--a01-navy:#15345f;--a01-blue:#2457d6;--a01-blue-soft:#eef5ff;--a01-green:#13795b;--a01-green-soft:#eef9f4;--a01-amber:#f2a413;--a01-amber-soft:#fff7df;--a01-pink:#d74f70;--a01-purple:#7550a8;--a01-ink:#18304d;--a01-muted:#58697d;--a01-line:#d6e1ee;--a01-paper:#fff;--a01-shadow:0 12px 32px rgba(21,52,95,.12)}
      .a01-free-badge{display:inline-flex;align-items:center;gap:7px;width:max-content;max-width:100%;padding:7px 12px;border:2px solid #c68a00;border-radius:999px;background:#fff7d7;color:#6b4a00;font-size:.82rem;font-weight:900;letter-spacing:.02em}.a01-free-badge::before{content:'★';font-size:1rem}
      .a01-topic-hero{position:relative;isolation:isolate;overflow:hidden;border-radius:24px;background:linear-gradient(135deg,#15345f 0%,#2457d6 64%,#3976e8 100%);color:#fff;padding:clamp(24px,5vw,58px);box-shadow:var(--a01-shadow)}.a01-topic-hero::after{content:'SkillrHub';position:absolute;z-index:-1;right:-2%;bottom:-18%;color:rgba(255,255,255,.13);font-size:clamp(5rem,15vw,12rem);font-weight:1000;line-height:1;transform:rotate(-7deg);white-space:nowrap}.a01-topic-hero h1{max-width:900px;margin:14px 0 8px;color:#fff;font-size:clamp(2rem,5.2vw,4.1rem);line-height:1.02}.a01-topic-hero__lead{max-width:850px;margin:0 0 8px;font-size:clamp(1.08rem,2.1vw,1.42rem);font-weight:800}.a01-topic-hero__goal{max-width:820px;margin:0;color:#eaf2ff;font-size:1.02rem}.a01-topic-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:18px}.a01-topic-actions a{display:inline-flex;min-height:43px;align-items:center;justify-content:center;padding:9px 13px;border:2px solid rgba(255,255,255,.65);border-radius:11px;background:rgba(255,255,255,.08);color:#fff;font-weight:900;text-decoration:none}.a01-topic-actions a.primary{border-color:#fff;background:#fff;color:var(--a01-blue)}
      .a01-topic-layout{display:grid;grid-template-columns:minmax(0,1fr) 270px;gap:18px;align-items:start;margin-top:18px}.a01-topic-stack{display:grid;gap:16px}.a01-topic-section,.a01-topic-panel{position:relative;overflow:hidden;border:1px solid var(--a01-line);border-radius:18px;background:#fff;padding:clamp(17px,2.7vw,28px);box-shadow:0 5px 18px rgba(21,52,95,.06)}.a01-topic-section h2,.a01-topic-section h3,.a01-topic-panel h2{color:var(--a01-navy)}.a01-topic-section h2{margin:0;font-size:clamp(1.35rem,2.5vw,1.85rem)}.a01-section-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:12px}.a01-section-head p{margin:3px 0 0;color:var(--a01-muted)}.a01-section-tag{flex:none;padding:5px 9px;border-radius:999px;background:var(--a01-blue-soft);color:var(--a01-blue);font-size:.76rem;font-weight:900}.a01-at-glance{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.a01-at-glance article{padding:14px;border:1px solid #dbe5f0;border-radius:13px;background:#f9fbfe}.a01-at-glance h3{margin:0 0 6px}.a01-at-glance p,.a01-at-glance li{line-height:1.48}.a01-success-list{margin:6px 0 0;padding-left:1.2rem}.a01-success-list li{margin:5px 0}.a01-boundary{margin-top:12px;border:1px solid #dce5ef;border-radius:12px;background:#fbfcfe}.a01-boundary summary,.a01-reference summary,.a01-answer summary{cursor:pointer;padding:10px 12px;color:var(--a01-navy);font-weight:900}.a01-boundary__body{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px;padding:0 11px 11px}.a01-boundary__body div{padding:10px;border-radius:9px;background:#f0f5fb}.a01-boundary__body strong{display:block;margin-bottom:4px;color:var(--a01-blue)}
      .a01-progression{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:9px}.a01-step{position:relative;padding:42px 11px 12px;border:1px solid #d9e4f1;border-radius:13px;background:#fbfcfe}.a01-step__number{position:absolute;top:10px;left:10px;display:grid;width:25px;height:25px;place-items:center;border-radius:50%;background:var(--a01-navy);color:#fff;font-weight:900}.a01-step strong{display:block;color:var(--a01-navy)}.a01-step p{margin:5px 0 0;font-size:.9rem;line-height:1.4}
      .a01-model{display:grid;gap:10px}.a01-model-purpose{display:flex;align-items:center;gap:8px;color:var(--a01-navy);font-weight:900}.a01-model-purpose::before{content:'LOOK';display:inline-flex;padding:4px 7px;border-radius:7px;background:var(--a01-blue);color:#fff;font-size:.68rem;letter-spacing:.06em}.a01-purpose-banner{display:flex;align-items:center;justify-content:center;gap:7px;padding:8px 12px;border:2px solid #e2b343;border-radius:11px;background:var(--a01-amber-soft);color:#704d00;font-weight:900}.a01-purpose-banner::before{content:'Same purpose:';font-size:.76rem;text-transform:uppercase;letter-spacing:.05em}
      .a01-scene-grid{display:grid;grid-template-columns:repeat(var(--scene-count,1),minmax(0,1fr));gap:11px}.a01-scene{position:relative;display:grid;grid-template-rows:auto auto minmax(105px,1fr);gap:8px;min-width:0;padding:11px;border:2px solid #d5e2f0;border-radius:16px;background:linear-gradient(#fff,#f7faff);box-shadow:0 3px 10px rgba(21,52,95,.05)}.a01-scene__labels{display:flex;align-items:center;justify-content:space-between;gap:7px;min-width:0}.a01-relationship{display:inline-flex;align-items:center;gap:5px;padding:4px 8px;border-radius:999px;background:var(--a01-navy);color:#fff;font-size:.76rem;font-weight:900}.a01-setting{min-width:0;color:var(--a01-muted);font-size:.74rem;font-weight:800;text-align:right}.a01-speech{position:relative;margin:0;padding:11px 12px;border:3px solid var(--a01-navy);border-radius:18px;background:#fff;color:var(--a01-ink);font-size:clamp(.92rem,1.6vw,1.22rem);font-weight:900;line-height:1.25;text-align:center}.a01-speech::after{content:'';position:absolute;left:22%;bottom:-12px;width:17px;height:17px;border-right:3px solid var(--a01-navy);border-bottom:3px solid var(--a01-navy);background:#fff;transform:rotate(45deg)}.a01-speech mark{border-radius:5px;background:#ffe27f;color:#4d3500;padding:1px 3px}.a01-people{position:relative;display:grid;grid-template-columns:minmax(70px,1fr) auto minmax(70px,1fr);align-items:end;gap:5px;padding-top:4px}.a01-person{display:grid;justify-items:center;gap:2px;min-width:0}.a01-person svg{display:block;width:clamp(55px,8vw,82px);height:auto}.a01-person strong{max-width:100%;color:var(--a01-navy);font-size:.78rem;text-align:center;overflow-wrap:anywhere}.a01-person small{color:var(--a01-muted);font-size:.68rem;text-align:center}.a01-talks-to{align-self:center;color:var(--a01-blue);font-size:.68rem;font-weight:900;text-align:center}.a01-talks-to span{display:block;font-size:1.25rem;line-height:1}.a01-prop{position:absolute;right:8px;bottom:7px;display:grid;place-items:center;min-width:48px;min-height:37px;padding:4px;border:1px solid #cfdbea;border-radius:8px;background:rgba(255,255,255,.92);color:var(--a01-navy);font-size:.62rem;font-weight:900;text-align:center}.a01-prop__blocks{display:flex;align-items:end;gap:2px}.a01-prop__blocks i{display:block;width:11px;height:11px;border-radius:2px;background:#ef5d5d}.a01-prop__blocks i:nth-child(2){height:18px;background:#3a75dc}.a01-prop__blocks i:nth-child(3){background:#f2b233}.a01-prop__board{width:38px;height:25px;border:3px solid #8a5d2b;background:#2e7555;color:#fff;font-size:.48rem}.a01-prop__apples{display:flex;gap:2px}.a01-prop__apples i{display:block;width:12px;height:12px;border-radius:50%;background:#df334d;box-shadow:inset 0 2px #ff8193}.a01-prop__pencil{width:36px;height:8px;border-radius:3px;background:linear-gradient(90deg,#ed5c70 0 12%,#f6cc45 12% 85%,#d4bd9a 85%);transform:rotate(-12deg)}.a01-prop__pictures{display:flex;gap:3px}.a01-prop__pictures i{display:block;width:22px;height:28px;border:3px solid #fff;outline:1px solid #a7b8cb;background:linear-gradient(#5da0ec 0 58%,#6bb56b 58%)}.a01-prop__pictures i+ i{background:linear-gradient(#f0a7be 0 58%,#7eb36f 58%)}
      .a01-sort-board{display:grid;gap:11px}.a01-phrase-tray{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;padding:11px;border:2px dashed #aebfd3;border-radius:13px;background:#f8fbff}.a01-phrase-card{display:grid;place-items:center;min-height:68px;padding:9px;border:2px solid var(--a01-blue);border-radius:12px;background:#fff;color:var(--a01-navy);font-weight:900;text-align:center;box-shadow:0 3px 8px rgba(36,87,214,.08)}.a01-listener-bins{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}.a01-listener-bin{display:grid;justify-items:center;gap:4px;min-height:83px;padding:9px;border:2px solid #d8c18b;border-radius:12px;background:var(--a01-amber-soft);color:#5d4305;font-weight:900;text-align:center}.a01-listener-icon{display:grid;width:38px;height:38px;place-items:center;border-radius:50%;background:#fff;border:2px solid #d8c18b;font-size:1.15rem}.a01-choice-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px}.a01-choice-card{display:grid;align-content:start;gap:8px;padding:10px;border:2px solid #d8e3ef;border-radius:13px;background:#f9fbfe}.a01-choice-card__picture{display:flex;align-items:center;justify-content:center;gap:6px;min-height:63px}.a01-choice-card__picture .a01-listener-icon{border-color:#b9cae0}.a01-choice-card strong{color:var(--a01-navy);font-size:.92rem;text-align:center}
      .a01-teacher-script{margin-top:11px;padding:12px 14px;border-left:5px solid var(--a01-blue);border-radius:10px;background:var(--a01-blue-soft);color:var(--a01-ink)}.a01-teacher-script strong{color:var(--a01-blue)}.a01-question-box{display:grid;gap:7px;margin-top:11px;padding:12px;border:2px solid #b9d9c7;border-radius:12px;background:var(--a01-green-soft)}.a01-question-box strong{color:var(--a01-green)}.a01-answer{border:1px solid #c9ddcf;border-radius:9px;background:#fff}.a01-answer__body{padding:0 11px 11px}.a01-answer__body p{margin:5px 0}.a01-misconceptions,.a01-differentiation{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px}.a01-mix-card,.a01-diff-card{padding:12px;border:1px solid #dce5ef;border-radius:12px;background:#fbfcfe}.a01-mix-card{border-top:5px solid #c94b43}.a01-diff-card:nth-child(1){border-top:5px solid var(--a01-blue)}.a01-diff-card:nth-child(2){border-top:5px solid var(--a01-green)}.a01-diff-card:nth-child(3){border-top:5px solid var(--a01-amber)}.a01-mix-card h3,.a01-diff-card h3{margin:0 0 6px;font-size:1rem}.a01-mix-card p,.a01-diff-card p{margin:5px 0;font-size:.9rem;line-height:1.42}.a01-mastery-list{display:grid;gap:8px}.a01-mastery-item{border:1px solid #d9e4ef;border-radius:11px;background:#fbfcfe;padding:11px}.a01-mastery-item>strong{color:var(--a01-navy)}.a01-mastery-item details{margin-top:7px}.a01-slide-preview{position:relative;overflow:hidden;width:100%;aspect-ratio:16/9;border:3px solid var(--a01-navy);border-radius:15px;background:#eef3f9}.a01-slide-preview iframe{display:block;width:100%;height:100%;border:0}.a01-resource-links{display:flex;flex-wrap:wrap;gap:8px}.a01-resource-links a{display:inline-flex;min-height:42px;align-items:center;justify-content:center;padding:8px 12px;border:2px solid #c9d7e7;border-radius:10px;background:#fff;color:var(--a01-blue);font-weight:900;text-decoration:none}.a01-resource-links a.primary{border-color:var(--a01-blue);background:var(--a01-blue);color:#fff}.a01-reference{border:1px solid #dce5ef;border-radius:13px;background:#fbfcfe}.a01-reference__body{padding:0 13px 13px}.a01-reference__body li{margin:7px 0}.a01-topic-sidebar{position:sticky;top:12px;display:grid;gap:12px}.a01-topic-panel h2{margin:0 0 8px;font-size:1.15rem}.a01-topic-panel p{line-height:1.45}.a01-topic-footer{position:relative;overflow:hidden;margin-top:20px;padding:17px;border-radius:15px;background:var(--a01-navy);color:#fff;text-align:center;font-weight:800}.a01-topic-footer strong{font-size:1.08rem}.a01-topic-footer span{display:block;margin-top:3px;color:#dce9fb;font-size:.82rem}.a01-topic-footer::after{content:'SkillrHub';position:absolute;right:2%;bottom:-23px;color:rgba(255,255,255,.1);font-size:4.2rem;font-weight:1000}
      .a01-slide-body{margin:0;background:#e9eff6;color:var(--a01-ink);font-family:Arial,Helvetica,sans-serif}.a01-slide-app{min-height:100vh}.a01-toolbar{position:sticky;z-index:80;top:0;display:flex;align-items:center;justify-content:space-between;gap:9px;padding:9px 12px;border-bottom:1px solid var(--a01-line);background:#fff}.a01-toolbar__group{display:flex;align-items:center;gap:7px;min-width:0}.a01-toolbar a,.a01-toolbar button,.a01-toolbar select{min-height:39px;padding:7px 10px;border:1px solid #c7d5e5;border-radius:9px;background:#fff;color:var(--a01-navy);font-weight:900}.a01-toolbar a{display:inline-flex;align-items:center;text-decoration:none}.a01-toolbar button:not(:disabled){cursor:pointer}.a01-toolbar button:disabled{opacity:.45}.a01-slide-count{color:var(--a01-muted);font-size:.84rem;font-weight:900;white-space:nowrap}.a01-toolbar select{max-width:360px;white-space:normal}.a01-stage-wrap{max-width:1440px;margin:12px auto;padding:0 12px}.a01-stage{position:relative;overflow:hidden;width:100%;aspect-ratio:16/9;border:2px solid #c9d7e7;border-radius:18px;background:#fff;box-shadow:var(--a01-shadow)}.a01-slide{position:absolute;inset:0;display:grid;grid-template-rows:auto minmax(0,1fr) auto;gap:8px;padding:clamp(15px,1.8vw,29px);background:linear-gradient(140deg,#fff 0%,#fff 73%,#f4f8ff 100%)}.a01-slide[hidden]{display:none}.a01-slide__watermark{position:absolute;z-index:0;right:-1%;bottom:2%;color:rgba(36,87,214,.07);font-size:clamp(4.5rem,11vw,10rem);font-weight:1000;line-height:1;transform:rotate(-8deg);pointer-events:none}.a01-slide-header,.a01-pattern,.a01-slide-footer{position:relative;z-index:1}.a01-slide-header{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;padding-bottom:8px;border-bottom:4px solid var(--a01-blue)}.a01-slide-header h1{min-width:0;margin:0;color:var(--a01-navy);font-size:clamp(1.55rem,2.75vw,2.85rem);line-height:1.03;overflow-wrap:anywhere}.a01-slide .a01-free-badge{flex:none;padding:5px 9px;font-size:clamp(.6rem,.82vw,.78rem)}.a01-pattern{display:grid;grid-template-rows:auto minmax(0,1fr) auto;gap:7px;min-height:0}.a01-pattern__meaning{display:grid;grid-template-columns:max-content 1fr;align-items:center;gap:9px;padding:7px 10px;border-radius:11px;background:var(--a01-blue-soft);font-size:clamp(.77rem,1.08vw,1.08rem);font-weight:800}.a01-pattern-label{display:inline-flex;align-items:center;justify-content:center;padding:4px 8px;border-radius:8px;background:var(--a01-navy);color:#fff;font-size:clamp(.58rem,.73vw,.72rem);font-weight:1000;letter-spacing:.05em;text-transform:uppercase}.a01-pattern__picture{display:grid;align-content:center;gap:5px;min-height:0;overflow:hidden}.a01-pattern__picture>.a01-pattern-label{justify-self:start}.a01-pattern__bottom{display:grid;grid-template-columns:1fr 1fr;gap:8px}.a01-slide-ask,.a01-slide-check{display:grid;align-content:start;gap:5px;min-width:0;padding:8px 10px;border-radius:11px}.a01-slide-ask{border:2px solid #b8d6c4;background:var(--a01-green-soft)}.a01-slide-check{border:2px solid #e1c06f;background:var(--a01-amber-soft)}.a01-slide-ask strong{color:#0b5c40;font-size:clamp(.82rem,1.13vw,1.13rem)}.a01-check-button{justify-self:start;min-height:31px;padding:4px 8px;border:0;border-radius:7px;background:#755000;color:#fff;font-size:clamp(.65rem,.8vw,.8rem);font-weight:900;cursor:pointer}.a01-check-answer{color:#573e00;font-size:clamp(.7rem,.94vw,.94rem);font-weight:900;line-height:1.27}.a01-check-answer[hidden]{display:none}.a01-slide-footer{display:flex;align-items:center;justify-content:space-between;gap:9px;padding-top:7px;border-top:2px solid #d7e2ee;color:var(--a01-navy);font-size:clamp(.56rem,.75vw,.76rem);font-weight:900}.a01-slide-footer__brand{display:flex;flex-wrap:wrap;gap:5px;align-items:center}.a01-slide-footer__brand strong{font-size:1.08em}.a01-slide-footer__brand span+span::before{content:'•';margin-right:5px;color:var(--a01-amber)}
      .a01-slide .a01-model{gap:5px}.a01-slide .a01-model-purpose{display:none}.a01-slide .a01-purpose-banner{padding:4px 8px;font-size:clamp(.62rem,.84vw,.82rem)}.a01-slide .a01-scene-grid{gap:7px}.a01-slide .a01-scene{grid-template-rows:auto auto minmax(66px,1fr);gap:4px;padding:6px 7px;border-radius:12px}.a01-slide .a01-scene__labels{gap:4px}.a01-slide .a01-relationship{padding:3px 6px;font-size:clamp(.5rem,.67vw,.66rem)}.a01-slide .a01-setting{font-size:clamp(.47rem,.62vw,.61rem)}.a01-slide .a01-speech{padding:7px 8px;border-width:2px;border-radius:13px;font-size:clamp(.67rem,1.06vw,1.02rem);line-height:1.18}.a01-slide .a01-speech::after{bottom:-8px;width:11px;height:11px;border-width:0 2px 2px 0}.a01-slide .a01-people{grid-template-columns:minmax(44px,1fr) auto minmax(44px,1fr);gap:2px;padding-top:1px}.a01-slide .a01-person{gap:0}.a01-slide .a01-person svg{width:clamp(40px,5.3vw,68px)}.a01-slide .a01-person strong{font-size:clamp(.48rem,.65vw,.64rem)}.a01-slide .a01-person small{font-size:clamp(.43rem,.55vw,.54rem)}.a01-slide .a01-talks-to{font-size:clamp(.42rem,.54vw,.53rem)}.a01-slide .a01-talks-to span{font-size:.92rem}.a01-slide .a01-prop{right:4px;bottom:3px;min-width:35px;min-height:27px;transform:scale(.78);transform-origin:right bottom}.a01-slide .a01-phrase-tray{gap:5px;padding:6px}.a01-slide .a01-phrase-card{min-height:46px;padding:5px;font-size:clamp(.58rem,.85vw,.82rem)}.a01-slide .a01-listener-bins{gap:5px}.a01-slide .a01-listener-bin{min-height:53px;padding:5px;font-size:clamp(.55rem,.75vw,.73rem)}.a01-slide .a01-listener-icon{width:27px;height:27px;font-size:.85rem}.a01-slide .a01-choice-grid{gap:5px}.a01-slide .a01-choice-card{gap:4px;padding:6px}.a01-slide .a01-choice-card__picture{min-height:35px}.a01-slide .a01-choice-card strong{font-size:clamp(.55rem,.78vw,.76rem)}
      .a01-notes{max-width:1440px;margin:0 auto 22px;padding:0 12px}.a01-notes details{overflow:hidden;border:1px solid #cfdbe9;border-radius:13px;background:#fff}.a01-notes summary{cursor:pointer;padding:11px 13px;color:var(--a01-navy);font-weight:900}.a01-notes-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;padding:0 12px 12px}.a01-note{padding:9px;border-radius:9px;background:#f5f8fc;font-size:.79rem;line-height:1.4}.a01-note strong{display:block;margin-bottom:4px;color:var(--a01-blue)}.a01-note--evidence{background:var(--a01-green-soft)}.a01-note--fix{background:#fff4ed}.a01-note--checkpoint{grid-column:1/-1;border:1px solid #c7dfcf;background:#f1f9f3}.a01-note--checkpoint b{color:var(--a01-green)}.a01-embed .a01-toolbar,.a01-embed .a01-notes{display:none}.a01-embed .a01-stage-wrap{max-width:none;margin:0;padding:0}.a01-embed .a01-stage{border:0;border-radius:0;box-shadow:none}
      .a01-stage-wrap:fullscreen{display:grid;place-items:center;width:100vw;height:100vh;padding:0;background:#fff}.a01-stage-wrap:fullscreen .a01-stage{width:100vw;height:100vh;aspect-ratio:auto;border:0;border-radius:0;box-shadow:none}
      @media(max-width:980px){.a01-topic-layout{grid-template-columns:1fr}.a01-topic-sidebar{position:static;grid-template-columns:repeat(2,minmax(0,1fr))}.a01-progression{grid-template-columns:repeat(2,minmax(0,1fr))}.a01-misconceptions,.a01-differentiation{grid-template-columns:1fr}.a01-stage{aspect-ratio:auto;min-height:78vh}.a01-slide{position:relative;min-height:78vh}.a01-notes-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.a01-note--checkpoint{grid-column:1/-1}}
      @media(max-width:720px){.a01-topic-hero{border-radius:17px}.a01-topic-layout{gap:12px}.a01-topic-section,.a01-topic-panel{border-radius:14px;padding:15px}.a01-at-glance,.a01-boundary__body,.a01-progression{grid-template-columns:1fr}.a01-topic-sidebar{grid-template-columns:1fr}.a01-scene-grid,.a01-phrase-tray,.a01-listener-bins,.a01-choice-grid{grid-template-columns:1fr!important}.a01-scene{grid-template-rows:auto auto minmax(120px,1fr)}.a01-toolbar{align-items:flex-start;flex-wrap:wrap}.a01-toolbar__group{width:100%;justify-content:space-between}.a01-toolbar select{min-width:0;max-width:62%}.a01-stage-wrap{padding:0 6px}.a01-slide{padding:13px}.a01-slide-header{align-items:flex-start}.a01-slide-header h1{font-size:1.46rem}.a01-slide .a01-free-badge{font-size:.56rem}.a01-pattern{grid-template-rows:auto auto auto}.a01-pattern__meaning{grid-template-columns:1fr;gap:5px}.a01-pattern__picture{overflow:visible}.a01-pattern__bottom{grid-template-columns:1fr}.a01-slide .a01-scene-grid,.a01-slide .a01-phrase-tray,.a01-slide .a01-listener-bins,.a01-slide .a01-choice-grid{grid-template-columns:1fr!important}.a01-slide .a01-scene{grid-template-rows:auto auto minmax(95px,1fr)}.a01-slide .a01-person svg{width:60px}.a01-notes-grid{grid-template-columns:1fr}.a01-note--checkpoint{grid-column:auto}.a01-slide-footer{align-items:flex-start;flex-direction:column}}
      @media print{.a01-toolbar,.a01-notes{display:none!important}.a01-stage-wrap{max-width:none;margin:0;padding:0}.a01-stage{border:0;border-radius:0;box-shadow:none}.a01-slide[hidden]{display:none!important}.a01-slide{position:relative;width:100%;aspect-ratio:16/9;break-after:page}.a01-slide-body{background:#fff}}
    `;
    document.head.appendChild(style);
  }

  function highlightedSpeech(scene) {
    let parts = [{ text: scene.speech, marked: false }];
    (scene.highlights || []).forEach((highlight) => {
      parts = parts.flatMap((part) => {
        if (part.marked) return [part];
        const index = part.text.toLowerCase().indexOf(highlight.toLowerCase());
        if (index < 0) return [part];
        return [
          { text: part.text.slice(0, index), marked: false },
          { text: part.text.slice(index, index + highlight.length), marked: true },
          { text: part.text.slice(index + highlight.length), marked: false }
        ].filter((item) => item.text);
      });
    });
    return parts.map((part) => part.marked ? `<mark>${esc(part.text)}</mark>` : esc(part.text)).join("");
  }

  function personSvg(person) {
    const isAdult = person.kind === "adult";
    const height = isAdult ? 110 : 96;
    const bodyY = isAdult ? 45 : 48;
    const bodyHeight = isAdult ? 53 : 43;
    const skin = person.role === "teacher" ? "#8b5b3f" : person.role === "shopkeeper" ? "#d59a71" : person.name === "Mia" ? "#7e4b35" : "#c9825b";
    const hair = person.name === "Mia" ? "#252334" : person.role === "teacher" ? "#252334" : person.role === "shopkeeper" ? "#6b3b27" : "#3a2a28";
    return `<svg viewBox="0 0 86 ${height}" aria-hidden="true" focusable="false"><circle cx="43" cy="26" r="21" fill="${skin}"/><path d="M22 26C22 8 33 3 44 3c14 0 21 9 21 23-7-8-14-11-22-11-8 0-14 4-21 11Z" fill="${hair}"/><circle cx="36" cy="27" r="2" fill="#1c2838"/><circle cx="50" cy="27" r="2" fill="#1c2838"/><path d="M37 36c4 4 8 4 12 0" fill="none" stroke="#8b3d3d" stroke-width="2.4" stroke-linecap="round"/><path d="M22 ${bodyY + bodyHeight}V${bodyY + 22}c0-12 9-20 21-20s21 8 21 20v${bodyHeight - 22}Z" fill="${person.colour}"/><path d="M22 ${bodyY + 18} 9 ${bodyY + 39}M64 ${bodyY + 18} 77 ${bodyY + 39}" fill="none" stroke="${skin}" stroke-width="9" stroke-linecap="round"/>${isAdult ? `<path d="M31 ${bodyY + bodyHeight}v9M55 ${bodyY + bodyHeight}v9" stroke="#26364a" stroke-width="9" stroke-linecap="round"/>` : ""}</svg>`;
  }

  function propHtml(prop) {
    if (prop === "blocks") return `<div class="a01-prop"><span class="a01-prop__blocks"><i></i><i></i><i></i></span><span>blocks</span></div>`;
    if (prop === "board") return `<div class="a01-prop"><span class="a01-prop__board">HELP</span><span>board</span></div>`;
    if (prop === "apples") return `<div class="a01-prop"><span class="a01-prop__apples"><i></i><i></i><i></i></span><span>apples</span></div>`;
    if (prop === "pencil" || prop === "pencilCup") return `<div class="a01-prop"><span class="a01-prop__pencil"></span><span>pencil</span></div>`;
    if (prop === "pictures") return `<div class="a01-prop"><span class="a01-prop__pictures"><i></i><i></i></span><span>pictures</span></div>`;
    return "";
  }

  function sceneHtml(sceneId) {
    const scene = sceneById(sceneId);
    if (!scene) return "";
    return `<figure class="a01-scene" role="img" aria-label="${esc(scene.accessibleDescription)}"><div class="a01-scene__labels"><span class="a01-relationship">${esc(scene.relationship)}</span><span class="a01-setting">${esc(scene.setting)}</span></div><blockquote class="a01-speech">${highlightedSpeech(scene)}</blockquote><div class="a01-people"><div class="a01-person">${personSvg(scene.speaker)}<strong>${esc(scene.speaker.name)}</strong><small>speaker</small></div><div class="a01-talks-to"><span>→</span>talks to</div><div class="a01-person">${personSvg(scene.listener)}<strong>${esc(scene.listener.name)}</strong><small>${esc(scene.listener.role)}</small></div>${propHtml(scene.prop)}</div></figure>`;
  }

  function listenerIcon(name) {
    if (name === "Friend") return "👧";
    if (name === "Teacher") return "🧑‍🏫";
    return "🧑‍💼";
  }

  function modelHtml(modelId, options = {}) {
    const item = modelById(modelId);
    if (!item) return "";
    const showPurpose = options.showPurpose !== false;
    const purpose = showPurpose ? `<div class="a01-model-purpose">${esc(item.purpose)}</div>` : "";
    if (item.component === "relationshipSpeechScene" || item.component === "relationshipComparison") {
      const ids = item.parameters.sceneIds || [];
      const same = item.parameters.samePurpose ? `<div class="a01-purpose-banner">${esc(item.parameters.samePurpose)}</div>` : "";
      return `<div class="a01-model" data-model-id="${esc(item.id)}">${purpose}${same}<div class="a01-scene-grid" style="--scene-count:${ids.length}">${ids.map(sceneHtml).join("")}</div></div>`;
    }
    if (item.component === "relationshipPhraseSort") {
      return `<div class="a01-model" data-model-id="${esc(item.id)}">${purpose}<div class="a01-sort-board" role="img" aria-label="${esc(item.accessibleDescription)}"><div class="a01-phrase-tray">${item.parameters.cards.map((card) => `<div class="a01-phrase-card">${esc(card.text)}</div>`).join("")}</div><div class="a01-listener-bins">${item.parameters.destinations.map((destination) => `<div class="a01-listener-bin"><span class="a01-listener-icon" aria-hidden="true">${listenerIcon(destination)}</span>${esc(destination)}</div>`).join("")}</div></div></div>`;
    }
    if (item.component === "relationshipChoiceCheck") {
      return `<div class="a01-model" data-model-id="${esc(item.id)}">${purpose}<div class="a01-choice-grid" role="img" aria-label="${esc(item.accessibleDescription)}">${item.parameters.checks.map((check) => {
        const scene = sceneById(check.sceneId);
        const picture = scene
          ? `<span class="a01-listener-icon" aria-hidden="true">${listenerIcon(scene.relationship === "Teacher and class" ? "Teacher" : scene.relationship)}</span><span>${esc(scene.relationship)}</span>`
          : `<span class="a01-listener-icon" aria-hidden="true">👧</span><span>Friend</span><strong>↔</strong><span class="a01-listener-icon" aria-hidden="true">🧑‍🏫</span><span>Teacher</span>`;
        return `<div class="a01-choice-card"><div class="a01-choice-card__picture">${picture}</div><strong>${esc(check.prompt)}</strong></div>`;
      }).join("")}</div></div>`;
    }
    return "";
  }

  function checkpointDetails(item, label = "Check the response") {
    if (!item) return "";
    return `<details class="a01-answer"><summary>${esc(label)}</summary><div class="a01-answer__body"><p><strong>Expected answer:</strong> ${esc(item.expectedAnswer)}</p><p><strong>Accept:</strong> ${esc(item.acceptableRepresentations.join(", "))}</p><p><strong>Look for:</strong> ${esc(item.evidenceOfMastery)}</p><p><strong>If unsure or incorrect:</strong> ${esc(item.remediation)}</p></div></details>`;
  }

  function sectionHead(title, description, tag = "") {
    return `<div class="a01-section-head"><div><h2>${esc(title)}</h2>${description ? `<p>${esc(description)}</p>` : ""}</div>${tag ? `<span class="a01-section-tag">${esc(tag)}</span>` : ""}</div>`;
  }

  function renderTopic(options) {
    ensureCss();
    const hero = q(".curriculum-hero");
    const main = q("main.curriculum-layout");
    if (!hero || !main) return false;
    const unit = options.data[CODE];
    if (unit) unit.canonical = spec;

    document.title = `${CODE} Words That Fit Who We Are Talking To | Foundation English Topic Guide`;
    const description = q('meta[name="description"]');
    if (description) description.content = "A classroom-ready Foundation English lesson with picture scenes showing how requests, questions and opinions change with friends, teachers and shopkeepers.";

    hero.className = "curriculum-hero a01-topic-hero";
    hero.innerHTML = `<span class="a01-free-badge">Free Teacher Resource.</span><h1>${esc(spec.title)}</h1><p class="a01-topic-hero__lead">${esc(spec.subtitle)}</p><p class="a01-topic-hero__goal"><strong>Learning goal:</strong> ${esc(spec.learningIntention)}</p><div class="a01-topic-actions"><a class="primary" href="#a01-lesson">Topic Guide</a><a href="${esc(spec.resourceLinks.slide)}" target="_blank" rel="noopener">Teacher Slides</a><a href="${esc(spec.resourceLinks.worksheet)}" target="_blank" rel="noopener">Practice Sheet</a><a href="${esc(spec.resourceLinks.practice)}">Practice</a><a href="${esc(spec.resourceLinks.test)}">Test</a></div>`;

    const atGlance = `<section class="a01-topic-section" id="a01-lesson">${sectionHead("Lesson at a Glance", "Everything needed to teach this lesson directly.", spec.lessonTime)}<div class="a01-at-glance"><article><h3>Learning goal</h3><p>${esc(spec.learningIntention)}</p><h3>Success looks like</h3><ul class="a01-success-list">${spec.successCriteria.map((item) => `<li>${esc(item)}</li>`).join("")}</ul></article><article><h3>Materials</h3><p>${esc(spec.materials.join(", "))}</p><h3>Teaching pattern</h3><p>${esc(spec.teachingProgression.name)}</p></article></div><details class="a01-boundary"><summary>Teacher concept boundary</summary><div class="a01-boundary__body"><div><strong>Must teach</strong>${esc(spec.conceptBoundary.mustTeach.join(" "))}</div><div><strong>Prerequisite</strong>${esc(spec.conceptBoundary.prerequisites.join(" "))}</div><div><strong>May support informally</strong>${esc(spec.conceptBoundary.maySupportInformally.join(" "))}</div><div><strong>Must not overteach</strong>${esc(spec.conceptBoundary.mustNotOverteach.join(" "))}</div></div></details></section>`;

    const progression = `<section class="a01-topic-section">${sectionHead("Teach in Four Clear Moves", spec.teachingProgression.reason)}<div class="a01-progression">${spec.teachingProgression.steps.map((step, index) => `<article class="a01-step"><span class="a01-step__number">${index + 1}</span><strong>${esc(step.purpose)}</strong><p>${esc(step.studentAction)}</p></article>`).join("")}</div></section>`;

    const meaning = `<section class="a01-topic-section">${sectionHead("What It Means", "The words can change while the purpose stays the same.", "Start here")}${modelHtml("meaning-comparison")}<div class="a01-teacher-script"><strong>Teacher says:</strong> Ari asks for help in both pictures. The listener changes, so some words change.</div><div class="a01-question-box"><strong>Ask the class: What changed?</strong>${checkpointDetails(checkpointById("checkpoint-meaning"), "Check together")}</div></section>`;

    const relationships = `<section class="a01-topic-section">${sectionHead("Meet Three Listeners", "Read each complete speech bubble. No extra example is needed.")}<div class="a01-topic-stack">${modelHtml("friend-help-scene")}${modelHtml("teacher-help-scene")}${modelHtml("shopkeeper-scene")}</div><div class="a01-question-box"><strong>Ask the class: Which words suit a teacher?</strong>${checkpointDetails(checkpointById("checkpoint-teacher"), "Check together")}</div></section>`;

    const samePurpose = `<section class="a01-topic-section">${sectionHead("Same Purpose, Different Relationships", "Compare a friend, teacher and shopkeeper.")}${modelHtml("same-purpose-three")}<div class="a01-teacher-script"><strong>Teacher says:</strong> All three speakers ask for help. The relationship changes, so the words change.</div><div class="a01-question-box"><strong>Ask the class: What changed? What stayed the same?</strong>${checkpointDetails(checkpointById("checkpoint-same-purpose"), "Check together")}</div></section>`;

    const pencil = `<section class="a01-topic-section">${sectionHead("Ask for a Pencil in Two Ways", "Keep the object and purpose the same. Change the listener.")}${modelHtml("pencil-two-ways")}<div class="a01-question-box"><strong>Ask the class: Now ask for a pencil in both ways.</strong>${checkpointDetails(checkpointById("checkpoint-pencil"), "Check together")}</div></section>`;

    const opinion = `<section class="a01-topic-section">${sectionHead("Share an Opinion in Two Ways", "An opinion tells what you think. A class response may add a reason.")}${modelHtml("opinion-two-ways")}<div class="a01-question-box"><strong>Ask the class: What changed?</strong>${checkpointDetails(checkpointById("checkpoint-opinion"), "Check together")}</div></section>`;

    const worked = `<section class="a01-topic-section">${sectionHead("Worked Teaching Examples", "Use the exact pictures, wording and model answers shown in the slides.")}<div class="a01-topic-stack">${spec.workedExamples.map((example) => `<article class="a01-topic-panel"><h3>${esc(example.title)}</h3>${example.displayModelIds.map((id) => modelHtml(id, { showPurpose: false })).join("")}<div class="a01-teacher-script"><strong>Teacher says:</strong> ${esc(example.teacherLanguage)}</div><details class="a01-answer"><summary>Model answer</summary><div class="a01-answer__body"><p>${esc(example.expectedAnswer)}</p></div></details></article>`).join("")}</div></section>`;

    const activity = `<section class="a01-topic-section">${sectionHead("Match the Phrase to the Listener", "Children point, hold up a relationship card or move a printed phrase card.", spec.warmUp.time)}${modelHtml("phrase-sort")}<div class="a01-teacher-script"><strong>Teacher does:</strong> ${esc(spec.warmUp.steps.join(" "))}</div><div class="a01-question-box"><strong>Ask the class: Who is listening? Which phrase fits?</strong>${checkpointDetails(checkpointById("mastery-sort"), "Reveal the matches")}</div></section>`;

    const misconceptions = `<section class="a01-topic-section">${sectionHead("Common Mix-Ups and Rapid Fixes", "Correct the cause without teaching a fixed social rule.")}<div class="a01-misconceptions">${spec.misconceptions.map((item) => `<article class="a01-mix-card"><h3>${esc(item.title)}</h3><p>${esc(item.cause)}</p><p><strong>Rapid fix:</strong> ${esc(item.rapidFix)}</p></article>`).join("")}</div></section>`;

    const differentiation = `<section class="a01-topic-section">${sectionHead("Support, Core and Extend", "Keep every child inside the same language-and-relationship idea.")}<div class="a01-differentiation">${["support", "core", "extend"].map((level) => `<article class="a01-diff-card"><h3>${level.charAt(0).toUpperCase() + level.slice(1)}</h3><p>${esc(spec.differentiation[level].adaptation)}</p></article>`).join("")}</div></section>`;

    const mastery = `<section class="a01-topic-section">${sectionHead("Quick Mastery Check", "Ask aloud, then open the model answer and response guidance.")}<div class="a01-mastery-list">${[checkpointById("checkpoint-pencil"), checkpointById("mastery-sort"), checkpointById("mastery-final")].map((item) => `<article class="a01-mastery-item"><strong>${esc(item.prompt)}</strong>${checkpointDetails(item, "Answer and next step")}</article>`).join("")}</div></section>`;

    const preview = `<section class="a01-topic-section">${sectionHead("Matching Teacher Slides", "The slides use the same scenes, speech bubbles, questions and model answers.", `${spec.slides.length} selectable slides`)}<div class="a01-slide-preview"><iframe src="${esc(spec.resourceLinks.slide)}&embed=1" title="Matching classroom slide preview" loading="lazy"></iframe></div><div class="a01-resource-links" style="margin-top:11px"><a class="primary" href="${esc(spec.resourceLinks.slide)}" target="_blank" rel="noopener">Open Teacher Slides</a></div></section>`;

    const reference = `<section class="a01-topic-section">${sectionHead("Optional Curriculum Reference", "Formal wording is kept here so it does not interrupt classroom teaching.")}<details class="a01-reference"><summary>Open the Australian Curriculum wording</summary><div class="a01-reference__body"><p><strong>${esc(spec.code)}</strong></p><p><strong>Content description:</strong> ${esc(spec.contentDescription)}</p><ul>${spec.elaborations.map((item) => `<li><strong>${esc(item.id)}:</strong> ${esc(item.curriculumWording)}</li>`).join("")}</ul><p><a href="${esc(spec.references[0].url)}" target="_blank" rel="nofollow noopener">${esc(spec.references[0].title)}</a></p></div></details></section>`;

    const resources = `<section class="a01-topic-section">${sectionHead("Continue Learning", "Use the existing resources when children are ready.")}<div class="a01-resource-links"><a class="primary" href="${esc(spec.resourceLinks.slide)}" target="_blank" rel="noopener">Teacher Slides</a><a href="${esc(spec.resourceLinks.worksheet)}" target="_blank" rel="noopener">Practice Sheet</a><a href="${esc(spec.resourceLinks.practice)}">Practice</a><a href="${esc(spec.resourceLinks.test)}">Test</a></div></section>`;

    main.className = "a01-topic-layout";
    main.innerHTML = `<div class="a01-topic-stack">${atGlance}${progression}${meaning}${relationships}${samePurpose}${pencil}${opinion}${worked}${misconceptions}${activity}${differentiation}${mastery}${preview}${reference}${resources}</div><aside class="a01-topic-sidebar"><section class="a01-topic-panel"><span class="a01-free-badge">Free Teacher Resource.</span><h2 style="margin-top:10px">Teach directly</h2><p>Open the slides full screen. Every picture, question and model answer is already provided.</p><div class="a01-resource-links"><a class="primary" href="${esc(spec.resourceLinks.slide)}" target="_blank" rel="noopener">Teacher Slides</a></div></section><section class="a01-topic-panel"><h2>Lesson language</h2><p><strong>Same purpose</strong><br>Different listener<br>Different words</p><p>Different languages, dialects and family ways of speaking can all be valid. Choose words for this listener, purpose and place.</p></section></aside>`;

    let footer = q(".curriculum-footer-meta");
    if (!footer) {
      footer = document.createElement("footer");
      document.querySelector(".curriculum-page")?.appendChild(footer);
    }
    footer.className = "a01-topic-footer";
    footer.innerHTML = `<strong>SkillrHub</strong> · skillrhub.com · Free Teacher Resource.<span>© 2026 SkillrHub · Free classroom use · ${CODE}</span>`;
    document.documentElement.dataset.foundationV11 = CODE;
    document.documentElement.dataset.ac9efla01Prototype = "true";
    window.skillrPageMeta = { ...(window.skillrPageMeta || {}), curriculumCode: CODE, title: spec.title, subject: spec.subject, lessonSchema: "1.1" };
    return true;
  }

  function slidePattern(slide) {
    return `<div class="a01-pattern"><div class="a01-pattern__meaning"><span class="a01-pattern-label">What it means</span><span>${esc(slide.display.meaning)}</span></div><div class="a01-pattern__picture"><span class="a01-pattern-label">Look at the picture</span>${slide.display.modelIds.map((id) => modelHtml(id, { showPurpose: false })).join("")}</div><div class="a01-pattern__bottom"><div class="a01-slide-ask"><span class="a01-pattern-label">Ask the class</span><strong>${esc(slide.display.studentPrompt)}</strong></div><div class="a01-slide-check"><button class="a01-check-button" type="button" data-reveal-answer aria-expanded="false">Check together</button><div class="a01-check-answer" data-check-answer hidden>${esc(slide.display.checkTogether)}</div></div></div></div>`;
  }

  function notesHtml(slide) {
    const layer = slide.teacherLayer;
    const checkpoints = slide.checkpointIds.map(checkpointById).filter(Boolean);
    return `<details open><summary>Teacher guidance for this slide</summary><div class="a01-notes-grid"><div class="a01-note"><strong>Teacher does.</strong>${esc(layer.teacherDoes)}</div><div class="a01-note"><strong>Teacher says/asks.</strong>${esc(layer.teacherSaysOrAsks)}</div><div class="a01-note"><strong>Student does.</strong>${esc(layer.studentDoes)}</div><div class="a01-note a01-note--evidence"><strong>Expected answer or observable evidence.</strong>${esc(layer.whatToLookFor)}</div><div class="a01-note a01-note--fix"><strong>What to do if the student is unsure or incorrect.</strong>${esc(layer.ifIncorrect)}</div>${checkpoints.map((item) => `<div class="a01-note a01-note--checkpoint"><strong>Short check</strong>${esc(item.prompt)} <b>Expected:</b> ${esc(item.expectedAnswer)} <b>Continue when:</b> ${esc(item.decision.continueWhen)}. <b>Reteach when:</b> ${esc(item.decision.reteachWhen)}.</div>`).join("")}</div></details>`;
  }

  function renderSlides(options) {
    ensureCss();
    const unit = options.data[CODE];
    if (unit) unit.canonical = spec;
    const embed = new URLSearchParams(location.search).get("embed") === "1";
    document.title = `${CODE} ${spec.title} Teacher Slides | SkillrHub`;
    document.body.className = `a01-slide-body${embed ? " a01-embed" : ""}`;
    document.body.innerHTML = `<div class="a01-slide-app"><nav class="a01-toolbar" aria-label="Teacher slide controls"><div class="a01-toolbar__group"><a href="${esc(spec.resourceLinks.topic)}">Back to Topic Guide</a><button type="button" data-slide-prev aria-label="Previous slide">Previous</button><button type="button" data-slide-next aria-label="Next slide">Next</button></div><div class="a01-toolbar__group"><label class="a01-slide-count" for="a01-slide-select">Slide <span data-slide-number>1</span> of ${spec.slides.length}</label><select id="a01-slide-select" aria-label="Choose a slide">${spec.slides.map((slide, index) => `<option value="${index}">${index + 1}. ${esc(slide.title)}</option>`).join("")}</select><button type="button" data-slide-fullscreen>Full screen</button></div></nav><div class="a01-stage-wrap"><main class="a01-stage" aria-live="polite">${spec.slides.map((slide, index) => `<section class="a01-slide" data-slide-index="${index}"${index ? " hidden" : ""}><div class="a01-slide__watermark" aria-hidden="true">SkillrHub</div><header class="a01-slide-header"><h1>${esc(slide.title)}</h1><span class="a01-free-badge">Free Teacher Resource.</span></header>${slidePattern(slide)}<footer class="a01-slide-footer"><div class="a01-slide-footer__brand"><strong>SkillrHub</strong><span>skillrhub.com</span><span>© 2026</span><span>Free classroom use</span><span>${CODE}</span></div><span>${index + 1} / ${spec.slides.length}</span></footer></section>`).join("")}</main></div><aside class="a01-notes" data-slide-notes>${notesHtml(spec.slides[0])}</aside></div>`;

    let current = 0;
    const slides = qa("[data-slide-index]");
    const select = q("#a01-slide-select");
    const previous = q("[data-slide-prev]");
    const next = q("[data-slide-next]");
    const number = q("[data-slide-number]");
    const notes = q("[data-slide-notes]");

    function bindReveal(root = document) {
      qa("[data-reveal-answer]", root).forEach((button) => {
        if (button.dataset.bound === "true") return;
        button.dataset.bound = "true";
        button.addEventListener("click", () => {
          const answer = button.parentElement.querySelector("[data-check-answer]");
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
      notes.innerHTML = notesHtml(spec.slides[current]);
      const query = `${location.pathname}?code=${encodeURIComponent(CODE)}${embed ? "&embed=1" : ""}#slide-${current + 1}`;
      history.replaceState(null, "", query);
      bindReveal(slides[current]);
    }

    previous.addEventListener("click", () => show(current - 1));
    next.addEventListener("click", () => show(current + 1));
    select.addEventListener("change", () => show(Number(select.value)));
    q("[data-slide-fullscreen]").addEventListener("click", async () => {
      const stageWrap = q(".a01-stage-wrap");
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
    document.documentElement.dataset.foundationV11 = CODE;
    document.documentElement.dataset.ac9efla01Prototype = "true";
    return true;
  }

  window.SkillrAC9EFLA01ClassroomRenderer = { renderTopic, renderSlides, modelHtml };
  window.SkillrFoundationV11Renderer = {
    ...baseRenderer,
    renderTopic(options) {
      return isPrototypeTopic(options.data) ? renderTopic(options) : baseRenderer.renderTopic(options);
    },
    renderSlides(options) {
      return isPrototypeSlides() ? renderSlides(options) : baseRenderer.renderSlides(options);
    }
  };
})();
