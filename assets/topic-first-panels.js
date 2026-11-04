/* Static F–10 topic entry: progressive previews only when verified bank data
   was embedded by the repository rollout. Never writes progress or creates
   follow-up questions. The actual app owns saved learner results. */
(() => {
  'use strict';
  const panels=document.querySelectorAll('.skillr-topic-first[data-topic-state="questions"]');
  for(const root of panels){
    const data=root.querySelector('script[data-preview-questions]');
    const form=root.querySelector('form[data-preview-form]');
    if(!data||!form)continue;
    let questions;
    try{questions=JSON.parse(data.textContent);}catch{continue;}
    if(!Array.isArray(questions)||questions.length!==3)continue;
    if(questions.some(q=>!q||!Array.isArray(q.answers)||!Number.isInteger(q.correct)||q.correct<0||q.correct>=q.answers.length))continue;
    const els={
      counter:root.querySelector('[data-counter]'),
      fieldset:root.querySelector('[data-fieldset]'),
      question:root.querySelector('[data-question]'),
      visual:root.querySelector('[data-visual]'),
      choices:root.querySelector('[data-choices]'),
      check:root.querySelector('[data-check]'),
      next:root.querySelector('[data-next]'),
      feedback:root.querySelector('[data-feedback]'),
      hint:root.querySelector('[data-hint]'),
      hintText:root.querySelector('[data-hint-text]'),
      solution:root.querySelector('[data-solution]'),
      explanation:root.querySelector('[data-explanation]'),
      preview:root.querySelector('[data-preview-progress]'),
      progress:root.querySelector('[data-progress]')
    };
    if(Object.values(els).some(el=>!el))continue;
    let index=0,checked=0,correct=0,marked=false;
    const inputName='skillr-topic-answer-'+String(root.dataset.curriculumCode||'code');
    const track=(name,extra={})=>{
      if(typeof window.gtag==='function')window.gtag('event',name,{
        curriculum_code:root.dataset.curriculumCode||'',
        placement:'topic_first_preview',
        ...extra
      });
    };
    function render(){
      const q=questions[index];
      marked=false;
      els.counter.textContent='Question '+(index+1)+' of '+questions.length;
      els.question.textContent=q.question;
      els.visual.textContent=q.visual||'';
      els.visual.hidden=!q.visual;
      els.choices.replaceChildren();
      for(let i=0;i<q.answers.length;i++){
        const label=document.createElement('label');
        const input=document.createElement('input');
        input.type='radio';input.name=inputName;input.value=String(i);
        input.required=true;
        label.append(input,document.createTextNode(' '+q.answers[i]));
        els.choices.append(label);
      }
      els.fieldset.disabled=false;
      els.check.hidden=false;
      els.next.hidden=true;
      els.feedback.hidden=true;
      els.feedback.classList.remove('is-wrong');
      els.feedback.textContent='';
      els.hint.open=false;
      els.hintText.textContent=q.hint;
      els.solution.hidden=true;
      els.explanation.textContent='';
    }
    form.addEventListener('submit',e=>{
      e.preventDefault();
      if(marked)return;
      const selected=els.choices.querySelector('input:checked');
      if(!selected){
        els.feedback.textContent='Choose an answer before checking.';
        els.feedback.hidden=false;
        return;
      }
      const q=questions[index];
      const isCorrect=Number(selected.value)===q.correct;
      checked++;
      if(isCorrect)correct++;
      marked=true;
      els.fieldset.disabled=true;
      els.check.hidden=true;
      els.next.hidden=index===questions.length-1;
      els.feedback.classList.toggle('is-wrong',!isCorrect);
      els.feedback.textContent=isCorrect?'Correct!':'Not quite. The correct answer is '+q.answers[q.correct]+'.';
      els.feedback.hidden=false;
      els.explanation.textContent=q.explanation;
      els.solution.hidden=false;
      els.progress.value=checked;
      els.preview.textContent='Preview: '+checked+' of '+questions.length+' checked · '+correct+' correct';
      if(index===questions.length-1){
        els.counter.textContent='Preview complete: '+correct+' of '+questions.length+' correct';
        els.feedback.textContent+=' These preview answers are not saved. Practise in the app to build your dashboard history.';
      }
      track('topic_first_preview_answer',{question_id:q.id||'',correct:isCorrect});
    });
    els.next.addEventListener('click',()=>{
      if(!marked||index>=questions.length-1)return;
      index++;
      render();
      if(typeof els.question.focus==='function'){
        els.question.tabIndex=-1;
        els.question.focus();
      }
    });
    root.querySelectorAll('a').forEach(a=>{
      if(a.href.includes('app.skillrhub.com')){
        a.addEventListener('click',()=>track('topic_first_cta_click',{destination:a.href}));
      }
    });
    render();
  }
})();