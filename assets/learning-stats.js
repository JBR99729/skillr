const endpoint = 'https://pkmdzbmygbqgdrzqiids.supabase.co/rest/v1/rpc/public_learning_activity_summary';
const key = 'sb_publishable_hLEut429BJkYV-k5jksjhA_23IYBa75';
let cached = null, pending = null;
const format = value => value.toLocaleString('en-AU');
function valid(data) {
 return ['learning_work_v1','learning_work_guest_v2'].includes(data?.source) && Number.isSafeInteger(data.total_answered) && data.total_answered>=0 && Number.isFinite(Date.parse(data.generated_at));
}
async function summary(force) {
 if (!force && cached && Date.now()-cached.at<180000) return cached.data;
 if (!pending) pending = (async()=>{
  const controller = new AbortController(), timer = setTimeout(()=>controller.abort(),10000);
  try {
   const response = await fetch(endpoint,{method:'POST',headers:{apikey:key,'Content-Type':'application/json'},body:'{}',credentials:'omit',signal:controller.signal});
   if (!response.ok) throw Error('Statistics unavailable');
   const data = await response.json(); if (!valid(data)) throw Error('Statistics unavailable');
   cached={at:Date.now(),data}; return data;
  } finally { clearTimeout(timer); pending=null; }
 })();
 return pending;
}
export async function mountLearningStats(root=document,force=false) {
 const hosts=[...root.querySelectorAll('[data-learning-stats]')];
 if (!hosts.length) return;
 for(const host of hosts){const b=host.querySelector('[data-stats-refresh]');b.disabled=true;}
 try {
  const data=await summary(force);
  for (const host of hosts) {
   const el=name=>host.querySelector(`[data-stat="${name}"]`);
   el('total').textContent=format(data.total_answered);
   const total=data.total_answered,remaining=Math.max(0,1000000-total);
   const proportion=Math.min(100,total/10000);
   el('milestone').textContent=remaining?format(remaining)+' more genuinely submitted answers towards 1,000,000 ('+proportion.toFixed(2)+'%).':'One million genuinely submitted answers reached!';
   const bar=host.querySelector('[data-free-progress]');if(bar){bar.value=Math.min(1000000,total);bar.setAttribute('aria-valuetext',format(total)+' of 1,000,000 submitted answers');}
   el('status').textContent=`Updated ${new Date(data.generated_at).toLocaleString('en-AU',{timeZone:'Australia/Sydney',dateStyle:'medium',timeStyle:'short'})} (Sydney time). ${data.source==='learning_work_guest_v2'?'Registered and no-login submitted answers':'Registered submissions only (guest tracking upgrade pending)'}; test accounts excluded. This measures answer events, not unique learners or mastery.`;
  }
 } catch {
  for(const host of hosts){host.querySelector('[data-stat="status"]').textContent='Statistics are temporarily unavailable. Please try again.';}
 } finally {
  for(const host of hosts)host.querySelector('[data-stats-refresh]').disabled=false;
 }
}
document.addEventListener('click',event=>{const button=event.target.closest('[data-stats-refresh]');if(button&&!button.disabled){event.stopPropagation();mountLearningStats(button.closest('.learning-promise'),true);}},true);
setInterval(()=>{if(!document.hidden)mountLearningStats(document,true);},180000);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)mountLearningStats(document,false);});
mountLearningStats();
