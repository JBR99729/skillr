/* On-page AC9MFN01 preview. These original questions match the reviewed
   public practice bank, and do not write learner progress or trigger extra drills. */
(() => {
  'use strict';
  const section=document.getElementById('try-questions');
  const form=document.getElementById('direct-question-form');
  if (!section || !form || section.dataset.curriculumCode !== 'AC9MFN01') return;
  const questions=[{"id":"ac9mfn01-p-001","question":"Mia is counting on a number track: 0, ___. What number comes next?","choices":["1","0","2"],"correct":0,"explanation":"Counting on one from 0 gives 1, so 1 is the next number in the sequence."},{"id":"ac9mfn01-p-005","question":"Zoe reads the number word eighteen. Which numeral matches it?","choices":["16","18","19"],"correct":1,"explanation":"eighteen is written as 18, so the numeral and number word show the same number."},{"id":"ac9mfn01-p-007","question":"Lina compares 3 and 12. Which number is greater?","choices":["12","3","11"],"correct":0,"explanation":"12 is greater because it comes later when counting to 20."}];
  // Number-line labels and hints explain these exact existing reviewed questions.
  // Educational support only; questions, choices and answer keys are unchanged.
  const models=[{"ticks":[0,1,2,3,4,5],"label":"Counting number line with consecutive values zero to five","hint":"Point to zero on the line. Count forward by one step.","steps":["Start at 0 on the number line.","Moving one equal step right gives 1. That is the number immediately after 0."]},{"ticks":[15,16,17,18,19,20],"label":"Counting number line showing the numerals fifteen through twenty","hint":"Say the word eighteen slowly. Think of ten and eight more.","steps":["Eighteen means one ten and eight ones.","Write 1 followed by 8 to make the numeral 18."]},{"ticks":[0,3,6,9,12,15],"label":"Number line with zero, three, six, nine, twelve and fifteen in increasing order","hint":"On a number line, the number farther right is greater.","steps":["Locate 3 and 12 on the number line.","12 is farther to the right than 3, so 12 is the greater number."]}];
  const visual=document.getElementById('direct-question-visual');
  const hint=document.getElementById('direct-question-hint');
  const hintText=document.getElementById('direct-question-hint-text');
  const worked=document.getElementById('direct-question-solution');
  const workedSteps=document.getElementById('direct-question-solution-steps');
  const fieldset=document.getElementById('direct-question-fieldset');
  const legend=document.getElementById('direct-question-title');
  const options=document.getElementById('direct-question-options');
  const counter=document.getElementById('direct-question-counter');
  const check=document.getElementById('direct-question-check');
  const next=document.getElementById('direct-question-next');
  const feedback=document.getElementById('direct-question-feedback');
  const score=document.getElementById('direct-questions-preview-score');
  const previewBar=document.getElementById('direct-preview-progress');
  const previewFraction=document.getElementById('direct-preview-fraction');
  if (![fieldset,legend,options,counter,check,next,feedback,score,previewBar,previewFraction,visual,hint,hintText,worked,workedSteps].every(Boolean)) return;
  let index=0, checked=0, correct=0, marked=false;
  function report(event, data) {
    if(typeof window.gtag==='function')window.gtag('event',event,{curriculum_code:'AC9MFN01',placement:'topic_inline_preview',...data});
  }
  function draw(){
    const q=questions[index], model=models[index];
    legend.textContent=q.question;
    visual.replaceChildren();
    model.ticks.forEach(n=>{
      const tick=document.createElement('span');
      tick.textContent=String(n);
      visual.append(tick);
    });
    visual.setAttribute('aria-label',model.label);
    hint.open=false;
    hintText.textContent=model.hint;
    worked.hidden=true;
    workedSteps.replaceChildren();
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
    workedSteps.replaceChildren();
    models[index].steps.forEach(step=>{
      const item=document.createElement('li');
      item.textContent=step;
      workedSteps.append(item);
    });
    worked.hidden=false;
    fieldset.disabled=true;
    check.hidden=true;
    feedback.hidden=false;
    feedback.classList.toggle('is-incorrect',!isCorrect);
    feedback.textContent=(isCorrect?'Correct! ':'Not quite. The correct answer is '+q.choices[q.correct]+'. ')+q.explanation;
    previewBar.value=checked;
    previewFraction.textContent=checked+' / '+questions.length;
    score.textContent='Preview: '+checked+' of '+questions.length+' checked · '+correct+' correct (not saved)';
    next.hidden=index===questions.length-1;
    if(index===questions.length-1){
      counter.textContent='All '+questions.length+' preview questions checked';
      feedback.textContent+=' Preview complete: '+correct+' of '+questions.length+' correct. Open free practice to save new answers on your learner dashboard.';
      const primary=section.querySelector('[data-preview-destination=practice]');
      if(primary)primary.textContent='Continue with free questions →';
    }
    report('topic_preview_answer',{question_id:q.id,correct:isCorrect});
  });
  next.addEventListener('click',()=>{if(!marked || index>=questions.length-1)return;index+=1;draw();legend.focus();});
  for(const link of section.querySelectorAll('a[data-preview-destination]')){
    link.addEventListener('click',()=>report('topic_preview_navigation',{destination:link.dataset.previewDestination}));
  }
  draw();
})();
