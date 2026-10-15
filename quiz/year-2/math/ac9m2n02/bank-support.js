"use strict";
(() => {
  document.documentElement.classList.add('n02-bank');
  const isPractice = /\/practice\/(?:index\.html)?$/.test(location.pathname);
  const all = window.skillrPracticeQuestions || window.skillrTestQuestions || [];
  const params = new URLSearchParams(location.search);
  const focuses = {PN:'Partition and rename numbers',EX:'Make equal exchanges',ZR:'Explain zero’s role'};
  const focus = Object.hasOwn(focuses, params.get('focus')) ? params.get('focus') : '';
  if (isPractice) {
    const label = document.createElement('label');label.className='n02-focus';label.textContent='Practice focus';
    const select=document.createElement('select');select.id='n02Focus';
    for(const [value,title] of [['','All three focuses'],...Object.entries(focuses)]){
      const option=document.createElement('option');option.value=value;option.textContent=title;option.selected=value===focus;select.append(option);
    }
    label.append(select);document.querySelector('#startButton').before(label);
    select.addEventListener('change',()=>{const url=new URL(location.href);if(select.value)url.searchParams.set('focus',select.value);else url.searchParams.delete('focus');location.assign(url.href);});
    const pool=focus?all.filter(q=>q.focus===focus):all;
    window.quizQuestions=pool;window.skillrPracticeQuestions=pool;
    window.quizConfig.storageKey += ':'+(focus||'all');
  }
})();
