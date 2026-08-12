(function(){
"use strict";
const d=window.SkillrFoundationWorksheetData;if(!d)return;
const labels={AC9MFM02:["E1","E1","E1","E2","E3","E4","E4","E2","E2","E5"],AC9MFSP01:["E4","E4","E4","E4","E1","E4","E1","E4","E2","E3"],AC9MFSP02:["E1","E1","E1","E1","E1","E1","E2","E2","E2","E3"]};
for(const [code,list] of Object.entries(labels)){const u=d[code];if(!u?.questions)continue;u.questions.forEach((q,i)=>{if(list[i]&&!/^E\d\s—/.test(q.question))q.question=`${list[i]} — ${q.question}`})}
const additions={
 AC9MFSP01:{type:"text",enrichment:true,question:"E5 — Using an appropriately sourced local example, describe one shape observed on Country or Place and explain how its features determine its sorting group."},
 AC9MFSP02:{type:"text",enrichment:true,question:"E4 — After an accurately sourced First Nations instructive game, describe one movement and the resulting position relative to a person, object or location."}
};
for(const [code,q] of Object.entries(additions)){const u=d[code];if(u?.questions&&!u.questions.some(item=>item.question===q.question))u.questions.push(q)}
}());
