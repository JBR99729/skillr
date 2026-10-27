/* Discovery uses a published-question availability snapshot, never generated questions. */
(()=>{
 const form=document.getElementById('free-practice-selector');
 if(!form)return;
 const year=document.getElementById('free-practice-year'),skill=document.getElementById('free-practice-skill');
 const start=document.getElementById('free-practice-start'),status=document.getElementById('free-practice-availability');
 const base='https://app.skillrhub.com/';
 let codes=[];
 const cleanYear=value=>/^[0-6]$/.test(String(value))?String(value):'0';
 const fallback=()=>{
  const url=new URL(base);url.searchParams.set('try','1');url.searchParams.set('year',cleanYear(year.value));
  const match=codes.find(c=>c.code===skill.value&&String(c.year)===year.value);
  if(match)url.searchParams.set('skill',match.code);
  // Retain campaign channel for aggregate attribution, not click/user IDs.
  const params=new URLSearchParams(location.search);
  for(const key of ['utm_source','utm_medium','utm_campaign']){
   const value=params.get(key);
   if(value&&/^[a-zA-Z0-9_-]{1,64}$/.test(value))url.searchParams.set(key,value);
  }
  start.href=url.toString();
 };
 function showSkills(){
  const available=codes.filter(c=>String(c.year)===year.value);
  skill.replaceChildren();
  if(!available.length){
   skill.append(new Option('No published Maths practice yet',''));
   status.textContent='No verified practice skills are available for this year yet. Choose another year or browse the app.';
  }else{
   skill.append(new Option('Choose a Maths skill',''));
   for(const c of available)skill.append(new Option(c.title+' ('+c.code+')',c.code));
   status.textContent=available.length+' approved Maths '+(available.length===1?'skill':'skills')+' available for this year. No login or payment.';
  }
  fallback();
 }
 form.addEventListener('submit',event=>{event.preventDefault();location.assign(start.href);});
 year.addEventListener('change',()=>{
  try{localStorage.setItem('skillrHomeFreeYear',year.value);}catch{}
  showSkills();
 });
 skill.addEventListener('change',fallback);
 start.addEventListener('click',()=>{if(Array.isArray(window.dataLayer))window.dataLayer.push({event:'skillr_free_practice_click',year:cleanYear(year.value),skill_code:skill.value||null});});
 try{
  const params=new URLSearchParams(location.search);
  year.value=cleanYear(params.get('year')||localStorage.getItem('skillrHomeFreeYear')||'0');
 }catch{year.value='0';}
 fallback();
 fetch('/assets/free-maths-skills.json',{cache:'no-cache'}).then(r=>{if(!r.ok)throw Error('Unavailable');return r.json();})
  .then(data=>{
   codes=(data.skills||[]).filter(c=>typeof c.code==='string'&&typeof c.title==='string'&&Number(c.question_count)>0&&Number(c.year)>=0&&Number(c.year)<=6);
   showSkills();
   const preferred=new URLSearchParams(location.search).get('skill');
   if(preferred&&codes.some(c=>c.code===preferred&&String(c.year)===year.value)){skill.value=preferred;fallback();}
  }).catch(()=>{
   skill.replaceChildren(new Option('Choose skills in the app',''));
   status.textContent='Skills can be chosen in the app. No login required.';
   fallback();
  });
})();
