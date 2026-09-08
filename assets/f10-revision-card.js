(() => {
  "use strict";
  const match = location.pathname.match(/^\/quiz\/(grade-k|year-(?:[1-9]|10))\/(math|maths|science|english)\/(ac9[a-z0-9]+)\/(practice|test)\/?$/i);
  if (!match) return;
  const mode = match[4].toLowerCase();
  const card = document.querySelector("#startScreen .start-card");
  if (!card) return;
  // Preserve independently authored/reviewed preparation where it already exists.
  if (card.querySelector('[data-skillr-authored-preparation="true"]')) return;

  const clean = (value) => String(value || "").replace(/\s+/g, " ").trim();
  const clip = (value, max) => { const s = clean(value); return s.length > max ? `${s.slice(0,max-1).replace(/\s+\S*$/,"")}…` : s; };
  const subject = match[2].toLowerCase() === "math" ? "maths" : match[2].toLowerCase();
  const topicLink = [...document.querySelectorAll('.quiz-breadcrumb a[href]')].reverse().find(a => /\/ac9/i.test(a.getAttribute('href') || ''));
  const fallbackTitle = clean(document.getElementById('quizTitle')?.textContent);

  const style = document.createElement('style');
  style.textContent = `#startScreen .skillr-revision-card{margin:12px 0 14px;padding:14px 15px;border:1px solid #cfdced;border-radius:14px;background:#f8fbff;text-align:left}#startScreen .skillr-revision-card h2{margin:0 0 9px;font-size:1.05rem;color:#173968}#startScreen .skillr-revision-card p{margin:7px 0;font-size:.86rem;line-height:1.46}#startScreen .skillr-revision-card strong{color:#173968}`;
  document.head.appendChild(style);

  function fromTopic(doc) {
    const sectionText = (selector) => clean(doc.querySelector(selector)?.textContent);
    const firstText = (selectors) => {
      for (const selector of selectors) {
        const el = doc.querySelector(selector);
        if (el && clean(el.textContent)) return clean(el.textContent);
      }
      return '';
    };
    let remember = firstText([
      '#teaching .curriculum-detail-body p', '#learn .curriculum-detail-body li',
      '#teaching-lesson .lesson-part p', '.combined-lesson-content .lesson-part p',
      '.curriculum-hero__lead'
    ]);
    let example = firstText([
      '#examples .curriculum-worked-example', '#examples .worked-example',
      '#examples .curriculum-detail-body article', '#worked-examples article',
      '.worked-example', '.example-card'
    ]);
    let mistake = firstText([
      '#misconceptions .curriculum-detail-body li', '#common-mistakes li',
      '.misconceptions li', '.common-mistakes li'
    ]);
    if (!remember) remember = sectionText('#learn .curriculum-detail-body') || fallbackTitle;
    if (!example) example = firstText(['#guided-practice .curriculum-detail-body li','#assessment .curriculum-detail-body li']);
    if (!mistake) mistake = firstText(['.review-hint','#assessment .review-hint']);
    return {remember:clip(remember, mode === 'test' ? 210 : 280), example:clip(example, mode === 'test' ? 230 : 340), mistake:clip(mistake,210)};
  }

  function fallback() {
    const existing = [...card.querySelectorAll('.pre-read-notes li')].map(li=>clean(li.textContent)).filter(Boolean);
    return {
      remember: clip(existing.find(x=>/core idea|remember|key idea|rule|focus/i.test(x)) || fallbackTitle, 240),
      example: clip(existing.find(x=>/solved example|worked example|example:/i.test(x)) || `Use the method from the ${fallbackTitle} lesson on one example before you begin.`, 300),
      mistake: clip(existing.find(x=>/mistake|mix-up|watch|trap/i.test(x)) || `Check the full question, notation, units or evidence before committing to an answer.`, 190)
    };
  }

  function render(data) {
    if (card.querySelector('.skillr-revision-card')) return;
    const generic = [...card.querySelectorAll('.pre-read-notes')].filter(n => !n.hasAttribute('data-skillr-authored-preparation'));
    generic.forEach(n=>n.remove());
    const box = document.createElement('section');
    box.className='pre-read-notes skillr-revision-card';
    box.dataset.skillrRevisionCard='true';
    box.innerHTML = `<h2>${mode === 'test' ? 'Quick test cheat sheet' : '60-second revision'}</h2><p><strong>Remember this:</strong> ${data.remember}</p><p><strong>Worked example:</strong> ${data.example}</p><p><strong>Don’t lose marks here:</strong> ${data.mistake}</p><p><strong>Ready?</strong> ${mode === 'test' ? 'Start the Test and work independently.' : 'Start Practice and use the feedback to correct any weak spot.'}</p>`;
    const summary=card.querySelector('.quiz-summary');
    summary ? card.insertBefore(box,summary) : card.appendChild(box);
  }

  if (!topicLink) { render(fallback()); return; }
  fetch(topicLink.href,{credentials:'same-origin'}).then(r=>r.ok?r.text():Promise.reject()).then(html=>{
    const doc=new DOMParser().parseFromString(html,'text/html');
    const data=fromTopic(doc);
    if (!data.remember || !data.example) render(fallback()); else render(data);
  }).catch(()=>render(fallback()));
})();
