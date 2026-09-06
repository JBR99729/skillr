import fs from 'node:fs/promises';
import {Workbook} from '@oai/artifact-tool';
const root='/workspace/scratch/8496182049af/skillr-year2-review';
const headers=['skill_code','skill_title','bank','question_id','question','options','correct_answer','explanation','response_type','acceptance_note'];
const escape=v=>'"'+String(v??'').replaceAll('"','""')+'"';
const serial=rows=>'\ufeff'+rows.map(r=>r.map(escape).join(',')).join('\r\n')+'\r\n';
const wb=Workbook.create(),combined=[headers];
for(let n=1;n<=5;n++){
 const code='ac9e2la0'+n,base=`${root}/assets/assessment-banks/year2/english/${code}`;
 const items=JSON.parse(await fs.readFile(base+'.json','utf8'));
 const title=JSON.parse(await fs.readFile(base+'-qa-log.json','utf8')).title;
 const matrix=[headers,...items.map(q=>[q.curriculum_code,title,q.bank,q.id,q.question,q.grading_mode?'':q.answers.map((a,i)=>`${String.fromCharCode(65+i)}. ${a.text}`).join(' | '),q.model_answer??q.answers[q.correct_index].text,q.explanation.summary+' Hint: '+q.explanation.hint,q.grading_mode??'multiple-choice',q.acceptance_note??''])];
 const s=wb.worksheets.add(code.toUpperCase());s.getRange('A1:J41').values=matrix;
 const actual=s.getRange('A1:J41').values;
 if(JSON.stringify(actual)!==JSON.stringify(matrix))throw Error(code+' export mismatch');
 await fs.writeFile(base+'.csv',serial(actual));combined.push(...actual.slice(1));
 console.log(code,actual.length-1,'CSV rows verified');
}
await fs.writeFile('/workspace/scratch/8496182049af/deliverables/SkillrHub-Year2-English-LA01-LA05.csv',serial(combined));
