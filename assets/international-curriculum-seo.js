(function(){
  'use strict';
  function yearLabels(meta){
    var y=(meta.year||'').toLowerCase();
    if(y==='foundation') return {vic:'Victorian Foundation',nsw:'NSW Early Stage 1',us:'US Kindergarten',uk:'England Reception'};
    var m=y.match(/year\s*(\d+)/); if(!m)return null; var n=Number(m[1]);
    return {vic:'Victorian Year '+n,nsw:'NSW '+(n<=2?'Stage 1':n<=4?'Stage 2':n<=6?'Stage 3':n<=8?'Stage 4':'Stage 5'),us:'US Grade '+n,uk:'England Year '+n};
  }
  function subjectTopic(meta){var s=(meta.subject||'').toLowerCase(),t=meta.title||'';if(s==='maths')return t+' maths';if(s==='science')return t+' science';if(s==='english')return t+' English';return t;}
  function init(){var meta=window.skillrPageMeta;if(!meta||!meta.curriculumCode||!meta.title)return;var labels=yearLabels(meta);if(!labels)return;var main=document.querySelector('.curriculum-layout > div, main');if(!main)return;if(document.getElementById('international-alignment'))return;
    var topic=subjectTopic(meta);var section=document.createElement('section');section.className='curriculum-topic-section';section.id='international-alignment';section.innerHTML='<h2>Also relevant to other curricula</h2><p>This SkillrHub topic follows <strong>'+meta.curriculumCode+'</strong> in the Australian Curriculum. The same learning idea is also useful for students working on comparable topics internationally.</p><ul class="curriculum-check-list"><li><strong>Victoria:</strong> '+labels.vic+' — '+topic+'</li><li><strong>New South Wales:</strong> '+labels.nsw+' — '+topic+'</li><li><strong>United States:</strong> '+labels.us+' — '+topic+'</li><li><strong>England:</strong> '+labels.uk+' — '+topic+'</li></ul><p><small>Curricula organise learning differently. These are topic-level alignments for teachers and families, not claims that curriculum codes are identical. Exact VIC or NSW codes are shown separately where SkillrHub has verified a direct or close match.</small></p>';
    var related=Array.from(main.querySelectorAll('.curriculum-topic-section')).find(function(el){return /related/i.test((el.querySelector('h2')||{}).textContent||'');});if(related)main.insertBefore(section,related);else main.appendChild(section);
    var desc=document.querySelector('meta[name="description"]');if(desc&&!/Victoria|NSW|Kindergarten|Grade/i.test(desc.content)){var extra=' Also useful for '+labels.vic+', '+labels.nsw+', '+labels.us+' and '+labels.uk+' topic alignment.';desc.content=(desc.content+extra).slice(0,300);}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
