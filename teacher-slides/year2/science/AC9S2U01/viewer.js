(()=>{
  'use strict';
  const c=window.skillrTeacherSlides;
  if(!c)return;
  const $=(s)=>document.querySelector(s);
  const image=$('#teacherSlideImage');
  const counter=$('#teacherSlideCounter');
  const label=$('#teacherSlideLabel');
  const progress=$('#teacherSlideProgress');
  const prev=$('#teacherSlidePrev');
  const next=$('#teacherSlideNext');
  const full=$('#teacherSlideFullscreen');
  const print=$('#teacherSlidePrint');
  const frame=$('#teacherSlideFrame');
  const printDeck=$('#teacherSlidePrintDeck');
  let i=0,touchX=null;
  const count=Math.max(1,Number(c.count)||1);
  const pad=(n)=>String(n).padStart(2,'0');
  const src=(idx)=>Array.isArray(c.slides)&&c.slides[idx]?c.slides[idx]:`${c.slideBase||'slides/'}slide-${pad(idx+1)}.webp`;
  const title=(idx)=>Array.isArray(c.labels)&&c.labels[idx]?c.labels[idx]:`Slide ${idx+1}`;
  const preload=(idx)=>{if(idx<0||idx>=count)return;const p=new Image();p.src=src(idx)};
  const fromHash=()=>{const m=location.hash.match(/slide-(\d+)/);return m?Number(m[1])-1:0};
  function render(idx){
    i=Math.max(0,Math.min(count-1,idx));
    image.src=src(i);
    image.alt=`${c.code||''} ${title(i)} — slide ${i+1} of ${count}`.trim();
    counter.textContent=`Slide ${i+1} of ${count}`;
    label.textContent=title(i);
    progress.style.width=`${((i+1)/count)*100}%`;
    prev.disabled=i===0;
    next.disabled=i===count-1;
    history.replaceState(null,'',`#slide-${i+1}`);
    preload(i-1);preload(i+1);
  }
  prev.addEventListener('click',()=>render(i-1));
  next.addEventListener('click',()=>render(i+1));
  document.addEventListener('keydown',(e)=>{
    if(['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName))return;
    if(e.key==='ArrowLeft'||e.key==='PageUp'){e.preventDefault();render(i-1)}
    else if(e.key==='ArrowRight'||e.key==='PageDown'||e.key===' '){e.preventDefault();render(i+1)}
    else if(e.key==='Home'){e.preventDefault();render(0)}
    else if(e.key==='End'){e.preventDefault();render(count-1)}
  });
  frame.addEventListener('touchstart',(e)=>{touchX=e.changedTouches[0]?.clientX??null},{passive:true});
  frame.addEventListener('touchend',(e)=>{if(touchX===null)return;const dx=(e.changedTouches[0]?.clientX??touchX)-touchX;touchX=null;if(Math.abs(dx)<45)return;render(i+(dx<0?1:-1))},{passive:true});
  full.addEventListener('click',async()=>{try{if(!document.fullscreenElement)await frame.requestFullscreen?.();else await document.exitFullscreen?.()}catch(_){}});
  function buildPrintDeck(){
    if(printDeck.dataset.ready)return;
    const frag=document.createDocumentFragment();
    for(let n=0;n<count;n++){
      const page=document.createElement('section');page.className='tsv-print-page';
      const img=document.createElement('img');img.src=src(n);img.alt=`${c.code||''} ${title(n)}`.trim();
      page.appendChild(img);frag.appendChild(page);
    }
    printDeck.appendChild(frag);printDeck.dataset.ready='1';
  }
  window.addEventListener('beforeprint',buildPrintDeck);
  print.addEventListener('click',()=>{buildPrintDeck();setTimeout(()=>window.print(),80)});
  window.addEventListener('hashchange',()=>render(fromHash()));
  render(fromHash());
})();
