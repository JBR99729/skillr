(() => {
  "use strict";
  const match = location.pathname.match(/^\/quiz\/(grade-k|year-(?:[1-9]|10))\/(math|maths|science|english)\/(ac9[a-z0-9]+)\/(practice|test)\/?$/i);
  if (!match) return;
  const mode = match[4].toLowerCase();
  const card = document.querySelector("#startScreen .start-card");
  if (!card) return;
  if (card.querySelector('[data-skillr-authored-preparation="true"]')) return;

  const clean = (value) => String(value || "").replace(/\s+/g, " ").trim();
  const clip = (value, max) => { const s = clean(value); return s.length > max ? `${s.slice(0,max-1).replace(/\s+\S*$/,"")}…` : s; };
  const subject = match[2].toLowerCase() === "math" ? "maths" : match[2].toLowerCase();
  const topicLink = [...document.querySelectorAll('.quiz-breadcrumb a[href]')].reverse().find(a => /\/ac9/i.test(a.getAttribute('href') || ''));
  const fallbackTitle = clean(document.getElementById('quizTitle')?.textContent);

  const style = document.createElement('style');
  style.textContent = `#startScreen .skillr-revision-card{margin:12px 0 14px;padding:14px 15px;border:1px solid #cfdced;border-radius:14px;background:#f8fbff;text-align:left}#startScreen .skillr-revision-card h2{margin:0 0 6px;font-size:1.05rem;color:#173968}#startScreen .skillr-revision-card p{margin:7px 0;font-size:.86rem;line-height:1.46}#startScreen .skillr-revision-card strong{color:#173968}#startScreen .skillr-revision-card__why{margin:0 0 10px!important;color:#52657e;font-size:.8rem!important}#startScreen .skillr-revision-card__visual{margin:9px 0 11px;padding:8px;border:1px solid #d7e3f2;border-radius:12px;background:#fff;overflow:hidden}#startScreen .skillr-revision-card__visual figure{margin:0}#startScreen .skillr-revision-card__visual svg,#startScreen .skillr-revision-card__visual img{display:block;max-width:100%;width:auto;max-height:190px;margin:auto}#startScreen .skillr-revision-card__visual figcaption{margin-top:5px;font-size:.74rem;line-height:1.35;color:#52657e;text-align:center}#startScreen .skillr-revision-card__visual .math-flow{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:5px;font-size:.78rem}#startScreen .skillr-revision-card__visual article,#startScreen .skillr-revision-card__visual p:not(figcaption){display:none}@media(max-width:620px){#startScreen .skillr-revision-card__visual svg,#startScreen .skillr-revision-card__visual img{max-height:160px}}`;
  document.head.appendChild(style);

  function safeVisual(doc) {
    if (!/^(maths|science)$/.test(subject)) return '';
    const candidates = [
      '#examples figure', '#teaching figure', '.math-concept-diagram', '.science-concept-diagram',
      '.curriculum-detail-body figure', '.lesson-part figure', '.concept-visual', '.worked-example svg'
    ];
    let source = null;
    for (const selector of candidates) { source = doc.querySelector(selector); if (source) break; }
    if (!source) return '';
    const clone = source.cloneNode(true);
    clone.querySelectorAll('script,style,iframe,video,button,a').forEach(el=>el.remove());
    clone.querySelectorAll('[id]').forEach(el=>el.removeAttribute('id'));
    clone.querySelectorAll('img').forEach(img=>{
      const raw=img.getAttribute('src')||'';
      if (raw) img.src=new URL(raw,topicLink.href).href;
      img.removeAttribute('srcset'); img.removeAttribute('sizes');
      img.loading='eager'; img.decoding='async';
    });
    return clone.outerHTML;
  }

  function fromTopic(doc) {
    const sectionText = (selector) => clean(doc.querySelector(selector)?.textContent);
    const firstText = (selectors) => {
      for (const selector of selectors) {
        const el = doc.querySelector(selector);
        if (el && clean(el.textContent)) return clean(el.textContent);
      }
      return '';
    };
    let remember = firstText(['#teaching .curriculum-detail-body p','#learn .curriculum-detail-body li','#teaching-lesson .lesson-part p','.combined-lesson-content .lesson-part p','.curriculum-hero__lead']);
    let example = firstText(['#examples .curriculum-worked-example','#examples .worked-example','#examples .curriculum-detail-body article','#worked-examples article','.worked-example','.example-card']);
    let mistake = firstText(['#misconceptions .curriculum-detail-body li','#common-mistakes li','.misconceptions li','.common-mistakes li']);
    if (!remember) remember = sectionText('#learn .curriculum-detail-body') || fallbackTitle;
    if (!example) example = firstText(['#guided-practice .curriculum-detail-body li','#assessment .curriculum-detail-body li']);
    if (!mistake) mistake = firstText(['.review-hint','#assessment .review-hint']);
    return {remember:clip(remember,mode==='test'?210:280),example:clip(example,mode==='test'?230:340),mistake:clip(mistake,210),visual:safeVisual(doc)};
  }

  function fallback() {
    const existing=[...card.querySelectorAll('.pre-read-notes li')].map(li=>clean(li.textContent)).filter(Boolean);
    return {remember:clip(existing.find(x=>/core idea|remember|key idea|rule|focus/i.test(x))||fallbackTitle,240),example:clip(existing.find(x=>/solved example|worked example|example:/i.test(x))||`Use the method from the ${fallbackTitle} lesson on one example before you begin.`,300),mistake:clip(existing.find(x=>/mistake|mix-up|watch|trap/i.test(x))||`Check the full question, notation, units or evidence before committing to an answer.`,190),visual:''};
  }

  function render(data) {
    if (card.querySelector('.skillr-revision-card')) return;
    [...card.querySelectorAll('.pre-read-notes')].filter(n=>!n.hasAttribute('data-skillr-authored-preparation')).forEach(n=>n.remove());
    const box=document.createElement('section');
    box.className='pre-read-notes skillr-revision-card'; box.dataset.skillrRevisionCard='true';
    const why=mode==='test' ? 'Read this before you start: these are the ideas, representations and traps most likely to save you from avoidable test errors.' : 'Read this first: Practice questions build directly from these ideas, representations and common traps, so this quick revision will make your answers more accurate.';
    const visual=data.visual ? `<div class="skillr-revision-card__visual" aria-label="Quick visual">${data.visual}</div>` : '';
    box.innerHTML=`<h2>${mode==='test'?'Quick test cheat sheet':'60-second revision'}</h2><p class="skillr-revision-card__why">${why}</p>${visual}<p><strong>Remember this:</strong> ${data.remember}</p><p><strong>Worked example:</strong> ${data.example}</p><p><strong>Don’t lose marks here:</strong> ${data.mistake}</p><p><strong>Ready?</strong> ${mode==='test'?'Start the Test and work independently.':'Start Practice and use the feedback to correct any weak spot.'}</p>`;
    const summary=card.querySelector('.quiz-summary'); summary?card.insertBefore(box,summary):card.appendChild(box);
  }

  if (!topicLink) { render(fallback()); return; }
  fetch(topicLink.href,{credentials:'same-origin'}).then(r=>r.ok?r.text():Promise.reject()).then(html=>{const doc=new DOMParser().parseFromString(html,'text/html');const data=fromTopic(doc);(!data.remember||!data.example)?render(fallback()):render(data);}).catch(()=>render(fallback()));
})();
