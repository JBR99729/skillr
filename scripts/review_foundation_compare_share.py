"""Scoped text review: AC9SFI04 and AC9SFI05."""
from pathlib import Path
from html import escape
import json,re
R=Path(__file__).resolve().parents[1]
LESSONS={
'AC9SFI04':[
('Keep both parts of the comparison','With adult guidance, put the original prediction beside the observation. Say what was expected, what was actually noticed and whether they match. A different result is useful; do not rewrite the prediction to make it correct.'),
('Compare the same feature','Prediction: the plant will have a flower. Observation: the plant has green leaves. Is that enough to decide whether the prediction matched?','Not yet. The observation does not say whether a flower was present. Look at the plant and record the feature named in the prediction before comparing.'),
('A different result is still evidence','Before a garden visit, a child predicts three birds on a branch. They observe one bird. What should go in the comparison?','Predicted three birds; observed one bird; different. Keep both records. Do not add imagined birds to the observation or erase the original prediction.'),
('Some parts can match','Prediction: the plant will have four leaves and a flower. Observation: four leaves and no flower. What matched, and what differed?','The leaf count matched. The flower prediction did not match. With guidance, compare each feature separately rather than calling the whole prediction right or wrong.'),
('Ready to move on','Use the supplied sentence: “I predicted ____. I observed ____. They matched/differed because ____.” Prediction: two birds. Observation: two birds.','The number matched: two were predicted and two observed. Accept a spoken or drawn response with adult recording. For a new example, change the observation and compare again.')],
'AC9SFI05':[
('Make the evidence understandable','Share what you asked, predicted, observed or think. Point to a drawing, record or object that helps the listener follow. Foundation children can speak, point, draw or model; a long written report is not required.'),
('Separate prediction from observation','A child predicted three leaves but observed two. They tell a partner only, “There were three.” How could they make the message accurate?','Say, “I thought there would be three leaves, but I observed two.” Show the observation record so the partner can see which number describes the result.'),
('Choose a useful representation','You observed a leaf with three holes. Would an accurate labelled drawing or an unrelated colourful picture help a partner understand? Why?','The labelled drawing shows the observed leaf and holes. Useful evidence matters more than decoration. Do not add details that were not observed.'),
('Listen and ask about the evidence','A partner says, “This toy rolled.” What could you ask to understand the observation better?','For example, “Can you show me how it moved?” or “What surface was it on?” Listen to the response and refer to what the partner actually shared.'),
('Ready to move on','Show a simple observation record to a partner. Say what you noticed, then listen and respond to one question.','Look for an accurate observation, a matching record and a relevant response. If the listener is confused, add a label, point to a feature or demonstrate safely rather than inventing a new result.')]
}
ELABS={
'AC9SFI04':['Place the original prediction beside the observation. With guidance, compare the named feature and keep both records even when they differ.','Before and after a garden visit, record the predicted and observed number of birds. Compare only what was actually observed during the stated visit.','Provide Prediction / Observation / Match or different headings. Children draw or dictate each entry; help them explain the comparison using the recorded feature.'],
'AC9SFI05':['In a circle discussion, share a question, prediction or observation with a matching object or drawing. Invite a partner to ask about the evidence.','Recount a real gardening or nature experience and distinguish what was noticed from what the child still wants to find out.','Use an authorised example from named Peoples and Country/Place to discuss how plant or animal features are communicated. Respect permissions and do not reproduce restricted designs or assign invented meanings.','Safely demonstrate a toy rolling or sliding, describe the movement and respond to a partner’s question about what happened.','Role-play using a magnifying glass or camera, naming what the tool helps observe and showing a relevant record.','Make a simple model of an observed plant or animal feature. Point to the represented part and explain what the model shows and leaves out.','Use a provided storyboard with Question / Prediction / Observation boxes. Draw or dictate each part and check that the observation matches the actual evidence.']}
ANS={
'AC9SFI04':[
('the observation with the prediction. Compare what was noticed with what was expected.','Keep the two records side by side.'),
('say they are different and keep the evidence.','A result does not have to match the prediction to be useful.'),
('prediction → I think I will see three birds; observation → I saw two birds; comparison → They were different.','Separate what was expected, noticed and compared.'),
('same. The two records both say two birds.','Use the given numbers as evidence for the comparison.'),
('Keeping the original prediction lets us compare what we expected with what we actually observed.','Do not change a prediction after seeing the result.'),
('I predicted a flower, but observed no flower, so they were different.','Compare the flower feature in both records.'),
('observation. The table keeps the two records together.','Use the observation column for what was actually noticed.'),
('predicted 2 birds, observed 2 → same; predicted flower, observed no flower → different; predicted 4 legs, observed 4 → same.','Compare the same feature within each pair.'),
('The four-leaf prediction matched; the flower prediction differed because no flower was observed.','Compare the two features separately with guidance.'),
('Not enough information yet. Green leaves do not tell us whether the plant has a flower. Check and record flower present or absent.','An observation must address the predicted feature before it can confirm or differ from it.')],
'AC9SFI05':[
('describe what you observed in a discussion.','Share actual observations so others can understand them.'),
('drawing or poster. A visual can help explain the idea.','Speaking, pointing and models are also useful when suited to the evidence.'),
('question → what I want to find out; prediction → what I think may happen; observation → what actually happened.','Use separate wording for the three parts.'),
('poster; model or display is also acceptable.','Choose a way to communicate the actual idea or observation.'),
('For example, “The leaf has three holes.” Accept a specific observation from a real or supplied example.','Avoid replacing observed detail with a preference such as “It is nice”.'),
('For example, safely roll a ball along a clear surface and describe its movement to the listener.','A labelled sequence of drawings or a suitable recording can also show movement.'),
('respond. Listen and give a relevant response or question.','Refer to what the other person actually shared.'),
('poster → pictures and labels; model → clay animal showing features; discussion → talking in a circle group.','Match each method to how the information is shared.'),
('“I predicted three leaves, but I observed two.” Show a record with two leaves.','Keep the prediction and actual observation distinct when sharing.'),
('For example, use a labelled drawing of the observed leaf with its three holes. It lets the listener see the detail being described.','Accept a suitable drawing, model or display with a reason tied to the observation.')]
}
PROMPTS={
'AC9SFI04':{3:'Prediction: two birds. Observation: two birds. Complete the comparison sentence.',5:'Prediction: the plant will have a flower. Observation: no flower was present. Say how they compare.',8:'Prediction: four leaves and a flower. Observation: four leaves and no flower. Explain what matched and what differed.',9:'Prediction: the plant will have a flower. Observation: the leaves are green. Is there enough information to compare? What should be checked?'},
'AC9SFI05':{8:'A child predicted three leaves but observed two. They tell a partner only “There were three.” Rewrite the message so both parts are clear.'}}
for code,items in LESSONS.items():
 p=next((R/'foundation/science').glob(code.lower()+'*/index.html'));s=p.read_text()
 content=''.join('<article class="mini-card"><h3>'+escape(i[0])+'</h3><p>'+escape(i[1])+'</p>'+ ('<details><summary>Answer and teaching guidance</summary><p>'+escape(i[2])+'</p></details>' if len(i)>2 else '')+'</article>' for i in items)
 block='<!-- science-compare-share-review:start --><details class="topic-menu"><summary><span>Explain, check and apply</span><span class="menu-badge">Reason</span></summary><div class="menu-content">'+content+'</div></details><!-- science-compare-share-review:end -->'
 s=re.sub(r'<!-- science-compare-share-review:start -->.*?<!-- science-compare-share-review:end -->','',s,flags=re.S)
 pos=s.index('</details>')+len('</details>');s=s[:pos]+block+s[pos:]
 it=iter(ELABS[code]);s=re.sub(r'<p><strong>Learning connection:</strong>.*?</p>',lambda m:'<p><strong>Teaching example:</strong> '+next(it)+'</p>',s)
 p.write_text(s)
# Keep the existing student worksheet renderer and its 8 core / 2 enrichment split.
marker='// Scoped text review: Foundation comparing and sharing.'
data={c:[{'prompt':PROMPTS.get(c,{}).get(i),'answer':a,'hint':h} for i,(a,h) in enumerate(rows)] for c,rows in ANS.items()}
p=R/'quiz/assets/foundation-science-worksheet-data.js';s=p.read_text()
if marker in s:s=s[:s.index(marker)]
s=s.rstrip()+'\n'+marker+'\n(() => { const edits = '+json.dumps(data,ensure_ascii=False)+''';
 for (const [code, rows] of Object.entries(edits)) {
  const unit=window.SkillrFoundationScienceWorksheetData[code];
  unit.questions.forEach((q,i)=>{const r=rows[i];if(r.prompt)q.question=r.prompt;q.answer=r.answer;q.hint=r.hint;});
 }
})();
''';p.write_text(s)
for code,rows in ANS.items():
 for p in (R/'quiz/grade-k/science'/code.lower()/'worksheet').glob('**/index.html'):
  s=p.read_text();s=re.sub(r'foundation-science-worksheet-data.js\?[^" ]+','foundation-science-worksheet-data.js?v=20260906-compare-share',s)
  s=re.sub(r'<!-- science-answer-guide:start -->.*?<!-- science-answer-guide:end -->','',s,flags=re.S)
  guide='<section class="worksheet-paper science-answer-guide" aria-label="Answer guide"><h2>'+code+' — Answer guide</h2><p>SkillrHub · Adult copy. Read directions aloud if needed; accept spoken explanations grounded in the examples.</p><button class="science-guide-print" type="button" onclick="document.body.classList.add(\'science-answers-only\');window.print();document.body.classList.remove(\'science-answers-only\')">Print answer guide</button><ol>'
  guide+=''.join('<li><p>'+escape(a)+'</p><p><strong>Teaching hint:</strong> '+escape(h)+'</p></li>' for a,h in rows)
  guide+='</ol><footer>'+code+' · SkillrHub · skillrhub.com</footer></section>'
  s=s.replace('<main id="worksheetRoot"></main>','<main id="worksheetRoot"></main><!-- science-answer-guide:start -->'+guide+'<!-- science-answer-guide:end -->')
  if 'foundation-science-answer-guide.css' not in s:s=s.replace('</head>','<link rel="stylesheet" href="/assets/foundation-science-answer-guide.css?v=20260906"></head>')
  p.write_text(s)
