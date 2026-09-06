import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const R=path.resolve(import.meta.dirname,'..');
const D=path.join(R,'assets/assessment-banks/year5/english');
const codes=fs.readdirSync(D).filter(f=>/^ac9e5(?:la|le|ly)\d+\.json$/.test(f)).map(f=>f.slice(0,-5).toUpperCase()).sort();
if(codes.length!==24) throw Error(`Expected 24 Year 5 English codes, found ${codes.length}`);
const norm=s=>String(s||'').replace(/\s+/g,' ').trim();
const lower=s=>norm(s).replace(/^./,m=>m.toLowerCase());
const qmark=s=>/[?]$/.test(norm(s))?norm(s):norm(s)+'?';
const correct=x=>x.answers[x.correct_index]?.text||x.answers.find(a=>a.is_correct)?.text;
const wrong=x=>x.answers.filter(a=>!a.is_correct).map(a=>a.text);
const answerSet=(c,w,ci)=>{const z=[...w.slice(0,2)];while(z.length<2)z.push('This choice does not match the meaning in the example.');z.splice(ci,0,c);return z.map((text,i)=>({text,is_correct:i===ci}));};
const stagePrompts={
 recognise:[
  s=>s,
  s=>`Read carefully: ${s}`,
  s=>`Which answer makes the most sense here? ${s}`,
  s=>`Look at the wording and meaning. ${s}`,
  s=>`Choose the option that fits the situation best. ${s}`,
  s=>`Which choice is accurate in this example? ${s}`,
  s=>`Focus on the key clue. ${s}`,
  s=>`What works best in this situation? ${s}`,
  s=>`Which option matches what is happening? ${s}`,
  s=>`Use the details in the example. ${s}`],
 explain:[
  (s,c)=>`Why is “${c}” the strongest answer to this question: ${s}`,
  (s,c)=>`What makes “${c}” work in this example? ${s}`,
  (s,c)=>`Which reason best explains why “${c}” fits? ${s}`,
  (s,c)=>`How does “${c}” match the meaning of this example? ${s}`,
  (s,c)=>`Why does “${c}” suit this situation better than the other choices? ${s}`,
  (s,c)=>`What clue in the example supports “${c}”? ${s}`,
  (s,c)=>`Which explanation shows why “${c}” is correct here? ${s}`,
  (s,c)=>`Why would “${c}” make sense to a careful reader? ${s}`,
  (s,c)=>`What is the best reason for choosing “${c}”? ${s}`,
  (s,c)=>`Which explanation connects “${c}” to the key clue? ${s}`],
 discriminate:[
  (s,c,w)=>`“${w}” might seem possible at first. What should you notice before answering this question: ${s}`,
  (s,c,w)=>`Why is “${w}” not the best choice here? ${s}`,
  (s,c,w)=>`Compare “${w}” with “${c}”. What important difference matters in this example? ${s}`,
  (s,c,w)=>`Which clue rules out “${w}” in this situation? ${s}`,
  (s,c,w)=>`A quick reader might choose “${w}”. What would a closer reading show? ${s}`,
  (s,c,w)=>`What makes “${c}” more precise than “${w}” here? ${s}`,
  (s,c,w)=>`Which detail helps you reject “${w}”? ${s}`,
  (s,c,w)=>`What is the problem with choosing “${w}” for this example? ${s}`,
  (s,c,w)=>`Which comparison best separates “${c}” from “${w}”? ${s}`,
  (s,c,w)=>`What should you check so you do not confuse “${w}” with the correct answer? ${s}`],
 apply:[
  s=>`Apply what you know to this example: ${s}`,
  s=>`Use the skill independently. ${s}`,
  s=>`Work out the answer from the details given. ${s}`,
  s=>`Now use the idea in context. ${s}`,
  s=>`Choose carefully using meaning, not just a familiar word. ${s}`,
  s=>`Which answer still works when you consider the whole example? ${s}`,
  s=>`Use all the clues in this situation. ${s}`,
  s=>`Decide which option is most precise. ${s}`,
  s=>`Which choice best shows your understanding here? ${s}`,
  s=>`Read the full example before deciding. ${s}`]
};
for(const code of codes){
 const file=path.join(D,code.toLowerCase()+'.json');
 const old=JSON.parse(fs.readFileSync(file,'utf8'));
 const p=old.filter(x=>x.bank==='practice'),t=old.filter(x=>x.bank==='test');
 if(p.length<20||t.length!==16) throw Error(`${code}: unexpected source counts ${p.length}/${t.length}`);
 const practice=[];
 for(let i=0;i<40;i++){
  const stage=['recognise','explain','discriminate','apply'][Math.floor(i/10)];
  const src=p[(i*7+Math.floor(i/10)*3)%p.length];
  const c=correct(src),w=wrong(src),ci=(i+codes.indexOf(code))%3;
  let question,opts,summary,hint;
  if(stage==='recognise'||stage==='apply'){
   question=qmark(stagePrompts[stage][i%10](norm(src.question)));
   opts=answerSet(c,w,ci);
   summary=`“${c}” fits the meaning and the language clue in this example. ${norm(src.explanation?.summary||'')}`;
   hint=norm(src.explanation?.hint||'Use the whole example, not one familiar word.');
  }else if(stage==='explain'){
   question=qmark(stagePrompts.explain[i%10](norm(src.question),c));
   const good=`It matches the key clue and meaning in the example.`;
   opts=answerSet(good,[`It is correct because it is the longest option.`,`It is correct because familiar words are always safest.`],ci);
   summary=`The answer works because it matches the specific clue and meaning, not because of its length or familiarity. ${norm(src.explanation?.summary||'')}`;
   hint=`Find the exact clue that makes “${c}” fit.`;
  }else{
   const bad=w[0]||'the tempting answer';
   question=qmark(stagePrompts.discriminate[i%10](norm(src.question),c,bad));
   const good=`Check the whole example: “${c}” matches the key clue, while “${bad}” does not.`;
   opts=answerSet(good,[`Keep “${bad}” because it contains a familiar word.`,`Ignore the context and choose whichever answer sounds most complex.`],ci);
   summary=`A tempting answer can share vocabulary with the question but still miss the meaning. Compare each option with the exact clue in context.`;
   hint=`Ask what makes “${bad}” fail and “${c}” succeed.`;
  }
  practice.push({id:`${code}-P-${String(i+1).padStart(3,'0')}`,curriculum_code:code,year_level:'Year 5',subject:'english',bank:'practice',stage,skill:src.skill||code,question,audio_prompt:question,answers:opts,correct_index:ci,explanation:{summary:norm(summary),hint:norm(hint)}});
 }
 const test=t.map((src,i)=>{
  const c=correct(src),w=wrong(src),ci=(i+codes.indexOf(code)+1)%3;
  const leads=[
   s=>s,
   s=>`Read this new example closely. ${s}`,
   s=>`Which answer is most accurate here? ${s}`,
   s=>`Use the details in this new situation. ${s}`,
   s=>`Choose the answer supported by the whole example. ${s}`,
   s=>`Which option best fits the meaning? ${s}`,
   s=>`Work this out independently. ${s}`,
   s=>`What is the best answer in this context? ${s}`,
   s=>`Which choice is supported by the evidence given? ${s}`,
   s=>`Read for meaning before you choose. ${s}`,
   s=>`Which option is the most precise? ${s}`,
   s=>`Use every clue in the example. ${s}`,
   s=>`Which answer holds up when you check the full context? ${s}`,
   s=>`Decide which option best matches what the text shows. ${s}`,
   s=>`Which choice best demonstrates the skill in this new example? ${s}`,
   s=>`Make your final choice from the evidence in the question. ${s}`];
  const question=qmark(leads[i](norm(src.question)));
  return{id:`${code}-T-${String(i+1).padStart(3,'0')}`,curriculum_code:code,year_level:'Year 5',subject:'english',bank:'test',stage:i<8?'verify':'apply',skill:src.skill||code,question,audio_prompt:question,answers:answerSet(c,w,ci),correct_index:ci,explanation:{summary:norm(src.explanation?.summary||`“${c}” best matches the evidence in the example.`),hint:norm(src.explanation?.hint||'Check the whole context before choosing.')}};
 });
 const pq=new Set(practice.map(x=>lower(x.question))),tq=new Set(test.map(x=>lower(x.question)));
 if(pq.size!==40||tq.size!==16)throw Error(`${code}: duplicate stems`);
 if([...tq].some(q=>pq.has(q)))throw Error(`${code}: Practice/Test overlap`);
 fs.writeFileSync(file,JSON.stringify([...practice,...test],null,2)+'\n');
}
execFileSync(process.execPath,['scripts/publish_year5_english_quality_banks.mjs'],{cwd:R,stdio:'inherit'});
console.log(`Year 5 English actual banks rebuilt: ${codes.length} codes, ${codes.length*40} Practice, ${codes.length*16} Test.`);
