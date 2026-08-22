(() => {
  "use strict";
  if (window.__skillrTopicModuleV2RegistryLoaded) return;
  window.__skillrTopicModuleV2RegistryLoaded = true;

  const modules = new Map();
  function register(module) {
    if (!module || module.schemaVersion !== "2.0" || !module.identity?.code) {
      throw new Error("Invalid SkillrHub topic-module v2 payload.");
    }
    modules.set(module.identity.code.toUpperCase(), Object.freeze(module));
  }

  window.SkillrTopicModulesV2 = {
    register,
    get(code) { return modules.get(String(code || "").toUpperCase()); },
    all() { return [...modules.values()]; }
  };

  // Single-page prototype: moderated Questions & Discussion for AC9M7N06 only.
  const meta = window.skillrPageMeta || {};
  if (String(meta.curriculumCode || "").toUpperCase() !== "AC9M7N06" || meta.pageType !== "topic guide") return;
  if (window.__skillrDiscussionAC9M7N06Loaded) return;
  window.__skillrDiscussionAC9M7N06Loaded = true;

  const style = document.createElement("style");
  style.textContent = `
    .skillr-discussion{margin:0 0 1rem;border:1px solid #cad8e7;border-radius:16px;background:#fff;overflow:hidden;box-shadow:0 8px 24px rgba(25,55,95,.07)}
    .skillr-discussion__head{padding:1rem;background:#f6f9ff;border-bottom:1px solid #dbe5f0}
    .skillr-discussion__head h2{font-size:1.15rem;margin:.12rem 0 .35rem}.skillr-discussion__head p{font-size:.92rem;margin:.25rem 0;color:#4b5f79}
    .skillr-discussion__count{display:inline-flex;gap:.35rem;align-items:center;font-size:.84rem;font-weight:800;color:#1a3a72;background:#e8f0ff;border-radius:999px;padding:.3rem .6rem;margin-top:.45rem}
    .skillr-discussion__body{padding:1rem}.skillr-discussion__panel{border-top:1px solid #e3eaf2;padding-top:.9rem;margin-top:.9rem}.skillr-discussion__panel:first-child{border-top:0;padding-top:0;margin-top:0}
    .skillr-discussion label{display:block;font-size:.9rem;font-weight:700;margin:.65rem 0 .28rem}.skillr-discussion input,.skillr-discussion select,.skillr-discussion textarea{width:100%;box-sizing:border-box;border:1px solid #b9c9da;border-radius:9px;padding:.62rem;font:inherit;background:#fff}.skillr-discussion textarea{min-height:88px;resize:vertical}
    .skillr-discussion button{border:0;border-radius:9px;padding:.62rem .8rem;font-weight:800;cursor:pointer}.skillr-discussion__submit{width:100%;background:#2457d6;color:#fff;margin-top:.75rem}.skillr-discussion__note{font-size:.78rem;line-height:1.4;color:#5d6f83;background:#f7f9fc;border-radius:9px;padding:.65rem;margin-top:.7rem}
    .skillr-thread__meta{display:flex;gap:.35rem;flex-wrap:wrap;align-items:center;font-size:.78rem;color:#607086}.skillr-thread__tag,.skillr-thread__status{border-radius:999px;padding:.18rem .48rem;font-weight:700}.skillr-thread__tag{background:#edf3ff;color:#244a93}.skillr-thread__status{background:#e9f8ef;color:#17643b}.skillr-thread h3{font-size:.96rem;line-height:1.35;margin:.42rem 0}.skillr-thread p{font-size:.88rem;line-height:1.45;margin:.32rem 0}.skillr-thread__answer{margin-top:.65rem;padding:.7rem;border-left:4px solid #2457d6;background:#f5f8ff;border-radius:8px}.skillr-thread__pending{background:#fff9e8;color:#7f5b12}
    .skillr-thread__actions{display:flex;align-items:center;gap:.45rem;margin-top:.7rem}.skillr-thread__helpful{display:inline-flex;align-items:center;gap:.3rem!important;padding:.45rem .6rem!important;border:1px solid #c8d5e5!important;background:#fff!important;color:#315274!important;font-size:.82rem}.skillr-thread__helpful[aria-pressed="true"]{background:#e9f2ff!important;border-color:#8eb4ef!important;color:#194f9c!important}.skillr-thread__helpful-count{font-size:.78rem;color:#68798d}
    .skillr-discussion__success{display:none;margin-top:.7rem;padding:.65rem;border-radius:9px;background:#edf9f1;color:#1c653d;font-size:.84rem;font-weight:700}
    .skillr-discussion__categories{display:grid;grid-template-columns:1fr;gap:.35rem;margin:.7rem 0}.skillr-discussion__category{font-size:.84rem;padding:.45rem .55rem;border-radius:9px;background:#f5f8ff;color:#315274;font-weight:700}
    @media(min-width:900px){.curriculum-sidebar .skillr-discussion{position:sticky;top:1rem}}
  `;
  document.head.appendChild(style);

  const section = document.createElement("section");
  section.className = "skillr-discussion";
  section.id = "questions-discussion";
  section.innerHTML = `
    <div class="skillr-discussion__head">
      <p class="curriculum-eyebrow">Topic support</p>
      <h2>Questions &amp; Discussion</h2>
      <p>Help improve this topic. Everything is reviewed before it appears publicly.</p>
      <div class="skillr-discussion__categories" aria-label="Ways to contribute">
        <span class="skillr-discussion__category">💬 Ask a question</span>
        <span class="skillr-discussion__category">💡 Suggest an improvement</span>
        <span class="skillr-discussion__category">⚠️ Report an error</span>
      </div>
      <span class="skillr-discussion__count">1 answered question</span>
    </div>
    <div class="skillr-discussion__body">
      <div class="skillr-discussion__panel" data-thread-list>
        <div class="skillr-thread" data-approved-thread="why-flip-divisor">
          <div class="skillr-thread__meta"><span class="skillr-thread__tag">Question</span><span class="skillr-thread__status">Answered</span><span>Student</span></div>
          <h3>Why do we flip only the second fraction when dividing?</h3>
          <div class="skillr-thread__answer"><strong>SkillrHub answer</strong><p>Division asks how many groups of the divisor fit into the first quantity. Multiplying by the divisor's reciprocal gives the same grouping result, so only the divisor changes.</p></div>
          <div class="skillr-thread__actions"><button class="skillr-thread__helpful" type="button" data-helpful="why-flip-divisor" aria-pressed="false">👍 Helpful</button><span class="skillr-thread__helpful-count" data-helpful-count="why-flip-divisor">Was this helpful?</span></div>
        </div>
      </div>
      <form class="skillr-discussion__panel" data-discussion-form>
        <h3>Contribute</h3>
        <label for="skillr-discussion-type">Type</label>
        <select id="skillr-discussion-type" name="type"><option>Question</option><option>Suggestion</option><option>Report an error</option></select>
        <label for="skillr-discussion-name">Display name</label>
        <input id="skillr-discussion-name" name="name" maxlength="30" placeholder="Student, Parent, Teacher or nickname" autocomplete="nickname">
        <label for="skillr-discussion-message">Message</label>
        <textarea id="skillr-discussion-message" name="message" maxlength="800" required placeholder="What would you like to ask or improve?"></textarea>
        <button class="skillr-discussion__submit" type="submit">Submit for review</button>
        <div class="skillr-discussion__success" data-discussion-success>Saved as pending review in this prototype.</div>
        <p class="skillr-discussion__note"><strong>Prototype:</strong> submissions and Helpful reactions stay only in this browser for now. Do not include your full name, school, email, phone number or other personal information.</p>
      </form>
    </div>`;

  function mountDiscussion() {
    const sidebar = document.querySelector(".curriculum-sidebar");
    const layout = document.querySelector("main.curriculum-layout");
    if (sidebar) {
      if (section.parentElement !== sidebar) sidebar.prepend(section);
      return true;
    }
    if (layout && !section.isConnected) {
      layout.insertAdjacentElement("afterend", section);
      return true;
    }
    return false;
  }
  mountDiscussion();

  const key = "skillr-discussion-prototype-ac9m7n06";
  const helpfulKey = "skillr-discussion-helpful-ac9m7n06";
  const list = section.querySelector("[data-thread-list]");
  const form = section.querySelector("[data-discussion-form]");
  const success = section.querySelector("[data-discussion-success]");

  function renderPending(item) {
    const article = document.createElement("div");
    article.className = "skillr-thread";
    article.style.marginTop = ".8rem";
    article.style.paddingTop = ".8rem";
    article.style.borderTop = "1px solid #edf1f5";
    const metaRow = document.createElement("div"); metaRow.className = "skillr-thread__meta";
    const tag = document.createElement("span"); tag.className = "skillr-thread__tag"; tag.textContent = item.type;
    const status = document.createElement("span"); status.className = "skillr-thread__status skillr-thread__pending"; status.textContent = "Pending review";
    const name = document.createElement("span"); name.textContent = item.name || "Anonymous";
    metaRow.append(tag,status,name);
    const title = document.createElement("h3"); title.textContent = item.type === "Question" ? "Your submitted question" : "Your submitted feedback";
    const message = document.createElement("p"); message.textContent = item.message;
    article.append(metaRow,title,message);
    list.appendChild(article);
  }

  try { (JSON.parse(localStorage.getItem(key) || "[]")).forEach(renderPending); } catch (_) {}

  let helpful = {};
  try { helpful = JSON.parse(localStorage.getItem(helpfulKey) || "{}"); } catch (_) {}
  section.querySelectorAll("[data-helpful]").forEach((button) => {
    const id = button.dataset.helpful;
    const label = section.querySelector(`[data-helpful-count="${id}"]`);
    const apply = () => {
      const active = Boolean(helpful[id]);
      button.setAttribute("aria-pressed", active ? "true" : "false");
      button.textContent = active ? "👍 Helpful · Thanks" : "👍 Helpful";
      if (label) label.textContent = active ? "You found this helpful" : "Was this helpful?";
    };
    apply();
    button.addEventListener("click", () => {
      helpful[id] = !helpful[id];
      try { localStorage.setItem(helpfulKey, JSON.stringify(helpful)); } catch (_) {}
      apply();
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const item = {
      type:String(data.get("type") || "Question"),
      name:String(data.get("name") || "").trim().slice(0,30),
      message:String(data.get("message") || "").trim().slice(0,800),
      createdAt:new Date().toISOString()
    };
    if (!item.message) return;
    let saved = [];
    try { saved = JSON.parse(localStorage.getItem(key) || "[]"); } catch (_) {}
    saved.push(item);
    try { localStorage.setItem(key, JSON.stringify(saved.slice(-10))); } catch (_) {}
    renderPending(item);
    form.reset();
    success.style.display = "block";
  });

  let mountQueued = false;
  const remountObserver = new MutationObserver(() => {
    if (mountQueued || section.isConnected) return;
    mountQueued = true;
    queueMicrotask(() => {
      mountQueued = false;
      if (!section.isConnected) mountDiscussion();
    });
  });
  remountObserver.observe(document.body, {childList:true, subtree:true});
  window.setTimeout(() => mountDiscussion(), 4000);
  window.setTimeout(() => remountObserver.disconnect(), 10000);
})();
