(function(){
"use strict";
const d=window.SkillrFoundationWorksheetData;if(!d)return;
const labels={AC9MFN01:["E1","E2","E5","E5","E2","E2","E5","E5","E4","E3"],AC9MFN06:["E1","E1","E1","E1","E2","E2","E2","E2","E3","E3"],AC9MFA01:["E1","E1","E1","E1","E2","E2","E3","E3","E4","E4"],AC9MFM01:["E1","E1","E2","E2","E2","E3","E3","E4","E4","E4"]};
for(const [code,list] of Object.entries(labels)){const u=d[code];if(!u?.questions)continue;u.questions.forEach((q,i)=>{if(list[i]&&!/^E\d\s—/.test(q.question))q.question=`${list[i]} — ${q.question}`})}
}());
