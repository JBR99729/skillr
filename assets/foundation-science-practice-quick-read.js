(() => {
  "use strict";

  const match = location.pathname.match(/^\/quiz\/grade-k\/science\/(ac9s[a-z0-9]+)\/practice\/?$/i);
  if (!match) return;
  const code = match[1].toUpperCase();

  function loadData(){
    return new Promise((resolve,reject)=>{
      if (window.SkillrFoundationScienceData?.[code]) return resolve();
      const existing=[...document.scripts].find(s=>s.src.includes('/assets/foundation-science-data.js'));
      if(existing){existing.addEventListener('load',resolve,{once:true});setTimeout(resolve,200);return;}
      const s=document.createElement('script');s.src='/assets/foundation-science-data.js?v=1';s.async=false;s.onload=resolve;s.onerror=reject;document.head.appendChild(s);
    });
  }

  function esc(v){return String(v??'').replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]));}

  function apply(){
    const u=window.SkillrFoundationScienceData?.[code];
    const card=document.querySelector('#startScreen .start-card');
    if(!u||!card) return false;

    if(!document.getElementById('skillr-science-practice-quick-read-style')){
      const style=document.createElement('style');style.id='skillr-science-practice-quick-read-style';style.textContent=`
        #startScreen .start-card{max-width:820px;padding:24px 26px;text-align:left}
        #startScreen #quizTitle{font-size:clamp(1.45rem,3vw,2rem);line-height:1.16;margin:8px 0 8px}
        #startScreen .intro-text{font-size:.9rem;line-height:1.45;margin:0 0 10px}
        #startScreen .pre-read-notes{margin:10px 0 14px;padding:12px;border:1px solid #dce5ef;border-radius:12px;background:#fbfcfe}
        #startScreen .pre-read-notes h2{font-size:1.02rem;line-height:1.2;margin:0 0 8px}
        #startScreen .pre-read-notes ul{margin:7px 0 0;padding-left:1.15rem}
        #startScreen .pre-read-notes li{font-size:.84rem;line-height:1.4;margin:4px 0}
        .science-quick-visuals{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:7px;margin:0 0 8px}
        .science-quick-visuals.two{grid-template-columns:repeat(2,minmax(0,1fr))}
        .science-quick-visual{overflow:hidden;border:1px solid #dce5ef;border-radius:9px;background:#fff}
        .science-quick-visual img{display:block;width:100%;height:82px;object-fit:cover}
        .science-quick-visual span{display:block;padding:5px 6px;color:#173968;font-size:.7rem;font-weight:800;text-align:center}
        #startScreen .quiz-summary{margin:14px 0;gap:8px}
        #startScreen .quiz-summary>div{padding:10px 8px}
        #startScreen .summary-number{font-size:1.25rem}
        #startScreen .button{min-height:42px;padding:9px 16px}
        @media(max-width:620px){#startScreen .start-card{padding:18px}.science-quick-visuals,.science-quick-visuals.two{grid-template-columns:repeat(2,minmax(0,1fr))}.science-quick-visual img{height:76px}}
      `;document.head.appendChild(style);
    }

    const title=card.querySelector('#quizTitle');if(title)title.textContent=u.title;
    const intro=card.querySelector('.intro-text');if(intro)intro.textContent='Review the same key ideas and visuals from the lesson, then start Practice.';

    let notes=card.querySelector('.pre-read-notes');
    if(!notes){notes=document.createElement('section');notes.className='pre-read-notes';const summary=card.querySelector('.quiz-summary');if(summary)card.insertBefore(notes,summary);else card.appendChild(notes);}
    const visuals=u.visuals.slice(0,3).map(v=>`<div class="science-quick-visual"><img src="${esc(v.src)}" alt="${esc(v.alt)}"><span>${esc(v.title)}</span></div>`).join('');
    const first=u.mistakes?.[0];
    notes.innerHTML=`<h2>60-second Quick Read</h2><div class="science-quick-visuals${u.visuals.length===2?' two':''}">${visuals}</div><ul><li><strong>Core idea:</strong> ${esc(u.learn)}</li><li><strong>Use it:</strong> ${esc(u.apply_title)}.</li>${first?`<li><strong>Common mix-up:</strong> ${esc(first[0])} — ${esc(first[1])}</li>`:''}</ul>`;
    notes.dataset.skillrTopicSynced='true';
    return true;
  }

  loadData().then(()=>{apply();const observer=new MutationObserver(()=>apply());observer.observe(document.documentElement,{childList:true,subtree:true});}).catch(err=>console.error('Skillr Foundation Science Quick Read failed:',err));
})();
