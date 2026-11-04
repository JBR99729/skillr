/* On-page AC9MFN01 preview. These original questions match the reviewed
   public practice bank, and do not write learner progress or trigger extra drills. */
(() => {
  'use strict';
  const section=document.getElementById('try-questions');
  const form=document.getElementById('direct-question-form');
  if (!section || !form || section.dataset.curriculumCode !== 'AC9MFN01') return;
  const questions=[{"id":"ac9mfn01-p-001","question":"Mia is counting on a number track: 0, ___. What number comes next?","choices":["1","0","2"],"correct":0,"explanation":"Counting on one from 0 gives 1, so 1 is the next number in the sequence."},{"id":"ac9mfn01-p-005","question":"Zoe reads the number word eighteen. Which numeral matches it?","choices":["16","18","19"],"correct":1,"explanation":"eighteen is written as 18, so the numeral and number word show the same number."},{"id":"ac9mfn01-p-007","question":"Lina compares 3 and 12. Which number is greater?","choices":["12","3","11"],"correct":0,"explanation":"12 is greater because it comes later when counting to 20."}];
  const fieldset=document.getElementById('direct-question-fieldset');
  const legend=document.getElementById('direct-question-title');
  const options=document.getElementById('direct-question-options');
  const counter=document.getElementById('direct-question-counter');
  const check=document.getElementById('direct-question-check');
  const next=document.getElementById('direct-question-next');
  const feedback=document.getElementById('direct-question-feedback');
  const score=document.getElementById('direct-questions-preview-score');
  if (![fieldset,legend,options,counter,check,next,feedback,score].every(Boolean)) return;
  let index=0, checked=0, correct=0, marked=false;
  function report(event, data) {
    if(typeof window.gtag==='function')window.gtag('event',event,{curriculum_code:'AC9MFN01',placement:'topic_inline_preview',...data});
  }
  function draw(){
    const q=questions[index];
    legend.textContent=q.question;
    counter.textContent='Question '+(index+1)+' of '+questions.length;
    options.replaceChildren();
    q.choices.forEach((choice,i)=>{
      const label=document.createElement('label');
      const input=document.createElement('input');
      input.type='radio';input.name='preview-answer';input.value=String(i);input.required=true;
      label.append(input,document.createTextNode(' '+choice));
      options.append(label);
    });
    marked=false;
    fieldset.disabled=false;
    check.hidden=false;
    check.disabled=false;
    next.hidden=true;
    feedback.hidden=true;
    feedback.classList.remove('is-incorrect');
    feedback.textContent='';
  }
  function finish(){
    fieldset.disabled=true;
    check.hidden=true;
    next.hidden=true;
    feedback.hidden=false;
    feedback.classList.remove('is-incorrect');
    feedback.textContent='Preview complete: '+correct+' of '+questions.length+' correct. Continue free practice in the app to record your learning on the dashboard.';
    counter.textContent='All '+questions.length+' preview questions checked';
    score.textContent='Preview: '+correct+' correct out of '+questions.length+' (not saved)';
    const primary=section.querySelector('[data-preview-destination=practice]');
    primary?.focus();
  }
  form.addEventListener('submit',event=>{
    event.preventDefault();
    if(marked)return;
    const selected=options.querySelector('input[name="preview-answer"]:checked');
    if(!selected){feedback.hidden=false;feedback.textContent='Choose an answer before checking.';return;}
    const q=questions[index];
    const chosen=Number(selected.value);
    const isCorrect=chosen===q.correct;
    checked+=1;if(isCorrect)correct+=1;
    marked=true;
    fieldset.disabled=true;
    check.hidden=true;
    feedback.hidden=false;
    feedback.classList.toggle('is-incorrect',!isCorrect);
    feedback.textContent=(isCorrect?'Correct! ':'Not quite. The correct answer is '+q.choices[q.correct]+'. ')+q.explanation;
    score.textContent='Preview: '+checked+' of '+questions.length+' checked · '+correct+' correct (not saved)';
    next.hidden=index===questions.length-1;
    if(index===questions.length-1){
      counter.textContent='Question '+questions.length+' of '+questions.length+' checked';
      check.hidden=true;
      const primary=section.querySelector('[data-preview-destination=practice]');
      if(primary)primary.textContent='Continue with free questions →';
    }
    report('topic_preview_answer',{question_id:q.id,correct:isCorrect});
  });
  next.addEventListener('click',()=>{if(!marked || index>=questions.length-1)return;index+=1;draw();legend.focus?.();});
  for(const link of section.querySelectorAll('a[data-preview-destination]')){
    link.addEventListener('click',()=>report('topic_preview_navigation',{destination:link.dataset.previewDestination}));
  }
  draw();
})();
