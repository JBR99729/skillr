(() => {
  "use strict";
  // The legacy /worksheet/ URL is an alias for Topic Practice 1. Stop the
  // asynchronously injected Year 7 worksheet router from replacing this
  // canonical two-sheet renderer after it has loaded.
  if (/\/worksheet\/?$/i.test(location.pathname)) window.__skillrYear7RouterLoaded = true;
  const match = location.pathname.match(/(ac9[mse]\d{1,2}[a-z0-9]+)/i);
  const module = window.SkillrTopicModulesV2?.get(match?.[1]);
  if (!module) return;
  const e = value => String(value ?? "").replace(/[&<>\"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[char]));
  const params=new URLSearchParams(location.search);
  const pathSheet=location.pathname.match(/topic-practice-([12])\/?$/i)?.[1];
  const querySheet=params.get("sheet")||params.get("topicPractice")||params.get("practiceSheet");
  const sheetNumber=String(pathSheet||querySheet)==="2"?2:1;
  const sheetIndices=sheetNumber===1?[0,1,2,3,4]:[5,6,7,8];
  const allQuestions=module.practiceSheet.questions;
  const questions=sheetIndices.map(index=>({question:allQuestions[index],index})).filter(entry=>entry.question);
  const worksheetBase=module.links.practiceSheet.replace(/worksheet\/?$/i,"");
  const sheetLinks={
    1:module.links.topicPractice1||`${worksheetBase}topic-practice-1/`,
    2:module.links.topicPractice2||`${worksheetBase}topic-practice-2/`
  };
  const labels={1:"Tier 1: Warm-Up",2:"Tier 2: Core Practice",3:"Tier 3: Extension / Challenge"};
  const optionRow=q=>Array.isArray(q.options)&&q.options.length?`<div class="tmv2-options" role="group" aria-label="Answer options">${q.options.map((option,index)=>`<span><span class="tmv2-option-marker" aria-hidden="true">${String.fromCharCode(65+index)}</span>${e(option?.text??option)}</span>`).join("")}</div>`:"";
  const groups=[1,2,3].map(tier=>{const tierQuestions=questions.filter(entry=>entry.question.tier===tier);return tierQuestions.length?`<section class="tmv2-tier" data-tier="${tier}"><h2>${labels[tier]}</h2>${tierQuestions.map(({question:q,index})=>`<article><h3>${index+1}. ${e(q.prompt)}</h3>${optionRow(q)}<div class="tmv2-lines" aria-label="Working space for question ${index+1}"></div></article>`).join("")}</section>`:"";}).join("");
  const key=questions.map(({question:q,index})=>`<article><h3>${index+1}. ${e(q.answer)}</h3><p><strong>Summary:</strong> ${e(q.summary)}</p><p><strong>Hint:</strong> ${e(q.hint)}</p></article>`).join("");
  const title=`Topic Practice ${sheetNumber}`;
  document.title=`${module.identity.code} ${title} | SkillrHub`;
  document.body.innerHTML=`<div class="tmv2-sheet-shell"><nav class="tmv2-screen-nav" aria-label="Topic practice navigation"><a href="${e(module.links.topic)}">Back to topic</a><a href="${e(module.links.practice)}">Open Practice</a><a class="tmv2-sheet-tab" href="${e(sheetLinks[1])}"${sheetNumber===1?' aria-current="page"':''}>Topic Practice 1</a><a class="tmv2-sheet-tab" href="${e(sheetLinks[2])}"${sheetNumber===2?' aria-current="page"':''}>Topic Practice 2</a><button type="button" onclick="window.print()">Print or save PDF</button></nav><main><section class="tmv2-paper"><header><div><img src="/icons/skillrhub-mark.svg" alt="SkillrHub logo" width="46" height="46"><strong>SkillrHub <span>F–10</span></strong></div><p>${e(module.identity.code)} • Year ${e(module.identity.year)} ${e(module.identity.subject)}</p><h1>${title}</h1><p class="tmv2-topic-title">${e(module.practiceSheet.title)}</p><p>Name: ______________________________ Date: ______________</p></header>${groups}<footer>SkillrHub F–10 • skillrhub.com • ${e(module.identity.code)} • ${title}</footer></section><section class="tmv2-paper tmv2-answer-key"><header><div><img src="/icons/skillrhub-mark.svg" alt="SkillrHub logo" width="46" height="46"><strong>SkillrHub <span>F–10</span></strong></div><p>${e(module.identity.code)} • ${title} teacher answer key</p><h1>Answers, summaries and hints</h1></header>${key}<footer>SkillrHub F–10 • skillrhub.com • ${e(module.identity.code)} • ${title}</footer></section></main></div>`;
})();
