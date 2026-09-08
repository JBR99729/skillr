(() => {
  "use strict";
  const match = location.pathname.match(/^\/quiz\/(grade-k|year-(?:[1-9]|10))\/(math|maths|science|english)\/(ac9[a-z0-9]+)\/(practice|test)\/?$/i);
  if (!match) return;
  const mode = match[4].toLowerCase();
  const code = match[3].toUpperCase();
  const subject = match[2].toLowerCase() === "math" ? "maths" : match[2].toLowerCase();
  const card = document.querySelector("#startScreen .start-card");
  if (!card || card.querySelector('[data-skillr-authored-preparation="true"]')) return;

  const clean = (value) => String(value || "").replace(/\s+/g, " ").trim();
  const clip = (value, max) => { const s=clean(value); return s.length>max ? `${s.slice(0,max-1).replace(/\s+\S*$/,"")}…` : s; };
  const esc = (value) => String(value ?? "").replace(/[&<>\"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c]));
  const fallbackTitle = clean(document.getElementById('quizTitle')?.textContent);

  const style=document.createElement('style');
  style.textContent=`#startScreen .skillr-revision-card{margin:12px 0 14px;padding:14px 15px;border:1px solid #cfdced;border-radius:14px;background:#f8fbff;text-align:left}#startScreen .skillr-revision-card h2{margin:0 0 6px;font-size:1.05rem;color:#173968}#startScreen .skillr-revision-card p{margin:7px 0;font-size:.86rem;line-height:1.46}#startScreen .skillr-revision-card strong{color:#173968}#startScreen .skillr-revision-card__why{margin:0 0 10px!important;color:#52657e;font-size:.8rem!important}#startScreen .skillr-revision-card__visual{margin:9px 0 11px;padding:8px;border:1px solid #d7e3f2;border-radius:12px;background:#fff;overflow:hidden}#startScreen .skillr-revision-card__visual figure{margin:0}#startScreen .skillr-revision-card__visual svg,#startScreen .skillr-revision-card__visual img{display:block;max-width:100%;width:auto;max-height:190px;margin:auto}#startScreen .skillr-revision-card__visual figcaption{margin-top:5px;font-size:.74rem;line-height:1.35;color:#52657e;text-align:center}@media(max-width:620px){#startScreen .skillr-revision-card__visual svg,#startScreen .skillr-revision-card__visual img{max-height:160px}}`;
  document.head.appendChild(style);

  function loadMap(){
    if(window.SkillrF10RevisionCards) return Promise.resolve();
    return new Promise((resolve,reject)=>{
      const s=document.createElement('script');
      s.src='/assets/f10-revision-cards-data.js?v=20260909-1';
      s.async=false;s.onload=resolve;s.onerror=reject;document.head.appendChild(s);
    });
  }

  function fallback(){
    const existing=[...card.querySelectorAll('.pre-read-notes li')].map(li=>clean(li.textContent)).filter(Boolean);
    return {remember:clip(existing.find(x=>/core idea|remember|key idea|rule|focus/i.test(x))||fallbackTitle,240),example:clip(existing.find(x=>/solved example|worked example|example:/i.test(x))||`Use the method from the ${fallbackTitle} lesson on one example before you begin.`,300),mistake:clip(existing.find(x=>/mistake|mix-up|watch|trap/i.test(x))||'Check the exact wording, notation, units or evidence before choosing your final answer.',190),topicPath:'',visualSelector:''};
  }

  function visualFrom(doc,entry){
    if(!/^(maths|science)$/.test(subject) || !doc) return '';
    const selectors=[entry.visualSelector,'#examples figure','#teaching figure','.math-concept-diagram','.science-diagram','.concept-diagram','figure','svg'].filter(Boolean);
    let source=null; for(const sel of selectors){try{source=doc.querySelector(sel);}catch(_){source=null;} if(source) break;}
    if(!source) return '';
    const clone=source.cloneNode(true);
    clone.querySelectorAll('script,style,iframe,video,button,a').forEach(el=>el.remove());
    clone.querySelectorAll('[id]').forEach(el=>el.removeAttribute('id'));
    clone.querySelectorAll('img').forEach(img=>{const raw=img.getAttribute('src')||'';if(raw)img.src=new URL(raw,entry.topicPath||location.href).href;img.removeAttribute('srcset');img.removeAttribute('sizes');img.loading='eager';img.decoding='async';});
    return clone.outerHTML;
  }

  function render(entry,doc){
    if(card.querySelector('.skillr-revision-card')) return;
    [...card.querySelectorAll('.pre-read-notes')].filter(n=>!n.hasAttribute('data-skillr-authored-preparation')).forEach(n=>n.remove());
    const remember=clip(entry.remember||fallbackTitle,mode==='test'?210:285);
    const example=clip(entry.example||fallback().example,mode==='test'?235:350);
    const mistake=clip(entry.mistake||fallback().mistake,210);
    const visual=visualFrom(doc,entry);
    const why=mode==='test'?'Read this before you start: these are the ideas, representations and traps most likely to prevent avoidable test errors.':'Read this first: the Practice questions use these same ideas, representations and common traps, so this 60-second review should make your answers more accurate.';
    const box=document.createElement('section');box.className='pre-read-notes skillr-revision-card';box.dataset.skillrRevisionCard='true';box.dataset.skillrRevisionCode=code;
    box.innerHTML=`<h2>${mode==='test'?'Quick test cheat sheet':'60-second revision'}</h2><p class="skillr-revision-card__why">${why}</p>${visual?`<div class="skillr-revision-card__visual" aria-label="Quick visual">${visual}</div>`:''}<p><strong>Remember this:</strong> ${esc(remember)}</p><p><strong>Worked example:</strong> ${esc(example)}</p><p><strong>Don’t lose marks here:</strong> ${esc(mistake)}</p><p><strong>Ready?</strong> ${mode==='test'?'Start the Test and work independently.':'Start Practice and use the feedback to correct any weak spot.'}</p>`;
    const summary=card.querySelector('.quiz-summary');summary?card.insertBefore(box,summary):card.appendChild(box);
  }

  loadMap().then(()=>{
    const entry=window.SkillrF10RevisionCards?.[code]||fallback();
    if(!entry.topicPath){render(entry,null);return;}
    fetch(entry.topicPath,{credentials:'same-origin'}).then(r=>r.ok?r.text():Promise.reject()).then(html=>render(entry,new DOMParser().parseFromString(html,'text/html'))).catch(()=>render(entry,null));
  }).catch(()=>render(fallback(),null));
})();
