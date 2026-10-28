/* Analytics only. Lessons, disclosure controls and buying links work without JS. */
(() => {
  'use strict';
  const root = document.querySelector('.topic-learning-page');
  if (!root) return;
  const curriculumCode = window.skillrPageMeta?.curriculumCode || '';
  const track = (name, values) => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', name, { curriculum_code: curriculumCode, ...values });
    }
  };
  root.addEventListener('click', (event) => {
    const link = event.target.closest('a[data-topic-tpt]');
    if (link) track('tpt_outbound_click', {
      placement: link.dataset.topicTpt,
      product_id: link.dataset.productId || '',
      destination: link.href,
    });
    const section = event.target.closest('.topic-section-nav a');
    if (section) track('topic_section_click', { section_id: section.hash.slice(1) });
  });
  root.querySelectorAll('main details[id]').forEach((section) => {
    let wasOpen = section.open;
    section.addEventListener('toggle', () => {
      if (section.open === wasOpen) return;
      wasOpen = section.open;
      if (section.open) track('topic_section_open', { section_id: section.id });
    });
  });
})();

/* Owner-requested routing: only enabled, available app banks replace Practice links.
   A disabled code, failed request or JavaScript-free page retains its original route. */
(async()=>{
 const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),4000);
 try{
  const response=await fetch('https://app.skillrhub.com/api/public-practice',{credentials:'omit',signal:controller.signal});
  if(!response.ok)return;const data=await response.json();const codes=new Set((data.codes||[]).map(c=>String(c.code).toUpperCase()));
  for(const link of document.querySelectorAll('a[href]')){
   const url=new URL(link.href,location.href);if(url.origin!==location.origin)continue;
   const match=url.pathname.match(/^\/quiz\/[^/]+\/[^/]+\/(ac9[a-z0-9]+)\/practice\/?$/i);
   if(!match||!codes.has(match[1].toUpperCase()))continue;
   link.dataset.originalPracticeHref=link.getAttribute('href');
   link.href='https://app.skillrhub.com/?try=1&skill='+encodeURIComponent(match[1].toUpperCase());
  }
 }catch{/* Keep existing Practice links available on network failure. */}finally{clearTimeout(timer);}
})();
