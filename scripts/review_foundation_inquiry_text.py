"""Scoped inquiry review: AC9SFI01, AC9SFI02, AC9SFI03."""
from pathlib import Path
from html import escape
import json,re
R=Path(__file__).resolve().parents[1]
LESSONS={
'AC9SFI01':[
('Predict before observing the result','A question says what you want to find out. A prediction says what you think may happen, with a reason from something you have experienced. Keep the original prediction so you can compare it with the observation later.'),
('Choose a relevant reason','A child predicts a ball will bounce because a similar ball bounced yesterday. Another predicts it will bounce because blue is their favourite colour. Which reason helps?','The earlier bounce is relevant experience. Liking a colour does not give evidence about bouncing. A prediction with a relevant reason can still turn out differently.'),
('Ask about a familiar object','You have used both a wooden spoon and a metal spoon. Ask one question about a new spoon before looking closely at it.','For example, “What material is this spoon made from?” Accept a clear question linked to the familiar objects, rather than a statement such as “I like spoons”.'),
('Use experience outdoors','Yesterday you saw birds near the school garden. Before today’s visit, predict one animal you might see and give a reason.','For example, “I think we may see birds because I saw birds near this garden yesterday.” Do not require certainty or invent a guaranteed result.'),
('Ready to move on','An empty tube rolled on its curved side yesterday. Before trying it again, ask a question and make a prediction with a reason.','For example: “Will it roll on this ramp? I think it may roll because it rolled before on its curved side.” Check that the question and prediction concern the same event.')],
'AC9SFI02':[
('Choose safe observations','Follow the adult’s instructions before handling objects or tools. Use sight and hearing at a safe distance; touch or smell only as directed. Do not taste investigation materials. Stop and ask when unsure.'),
('Make a safe decision','You find an unfamiliar berry during a plant walk. A friend suggests tasting it to learn about it. What should you do instead?','Do not taste it. Leave it alone and tell the adult. You can describe its visible colour and shape from a safe distance when directed.'),
('Match a sense to evidence','An adult provides a safe wooden block. You see a brown surface and, when allowed to touch it, feel a rough edge. Which sense supports each observation?','Sight supports brown; touch supports rough. Name the sense that supplied the evidence. Colour alone does not tell you how the surface feels.'),
('Use a tool without causing harm','You want to see a leaf’s tiny lines with a magnifying glass. How should you use it?','Follow adult guidance, carry it carefully and observe the leaf without damaging it. Never look at the Sun through it or focus sunlight onto objects or skin.'),
('Ready to move on','With an adult-approved object, state one safety instruction, make two safe observations and record one using a drawing, marks or words.','Accept observations actually made. Check that the child follows instructions and asks before using an uncertain sense or tool. A detailed observation does not need a long written answer.')],
'AC9SFI03':[
('Use the supplied structure','Record what was actually observed in the given boxes or rows. Use drawings, marks or words. With guidance, compare the completed records to identify a shared feature or a pattern in what happened.'),
('Fill the correct group','Use two headings: feathers / no feathers. Cards show a duck with feathers, a pigeon with feathers and a dog with fur. Where does each card go?','Duck and pigeon go under feathers; dog goes under no feathers. The feature named in the headings determines the grouping.'),
('Keep the record accurate','The observation says a ball rolled, but its row says slid. Should you keep the entry because it makes the rows look alike?','No. Correct the copying error to rolled so the record matches the observation. Do not change a genuine result simply to create an expected pattern.'),
('Describe only what the records support','A table records a ball rolling, a toy car rolling and a block sliding. What do the first two have in common? Can you say every object rolls?','The ball and toy car both rolled in these observations. Not every object rolled: the block slid. Point to the entries that support both parts of the answer.'),
('Ready to move on','Use the provided headings Object / Material. Observations: spoon—metal; key—metal; block—wood. Fill the rows, then identify a shared material.','The spoon and key are both recorded as metal; the block is wood. This pattern concerns these samples, not every spoon, key or block.')]
}
ELABS={
'AC9SFI01':['Recall seeing a ball bounce and ask how a different ball might bounce. Help the child distinguish the question from a predicted outcome.','After handling safe familiar objects, ask what a new object may be made from. Connect the question to an earlier experience.','Before a school-ground visit, predict a plant or animal that might be seen and explain a reason from an earlier visit.','Before releasing an unusual-shaped safe object down a low ramp, predict its movement using experience with similar objects. Keep the prediction to compare later.'],
'AC9SFI02':['Agree on boundaries, sun protection, careful walking with equipment and no tasting of investigation materials before an outdoor activity.','Discuss an unfamiliar berry: observe from a safe distance, do not taste or touch it, and ask an adult. Choose senses according to the instructions.','Use a magnifying glass on a leaf with adult guidance, or binoculars for a distant bird. Never look at the Sun through optical tools.','Record an actual observation with a labelled drawing, dots or an adult-assisted voice recording. Say which safe sense provided the information.'],
'AC9SFI03':['Supply headings feathers and no feathers. Help children place observed animal pictures consistently and explain the shared feature.','Provide Object and Material headings. Link samples or labelled drawings to the objects actually observed rather than guessing their materials.','Compare the observed bird cards for a shared covering of feathers. Keep the statement tied to visible features in the examples.','Provide an object-and-movement table for a ball, block and toy car. Record the actual trials and identify any repeated movement with guidance.','Compare recorded material examples such as a metal spoon and key. Identify shared material use without claiming that every such object uses that material.']}
ANS={
'AC9SFI01':[
('How high will this ball bounce? It asks something that can be explored.','Distinguish a question from a preference or statement.'),
('I think the rubber ball will bounce higher because I have seen rubber balls bounce. This predicts an outcome using experience.','The prediction is not a guarantee of the result.'),
('question → what I want to find out; prediction → what I think may happen; experience → what I have seen before.','Connect each word to its role before an investigation.'),
('For example, “the tube may roll” because I saw a tube roll before.','Accept a plausible prediction with a relevant experience in the reason.'),
('For example, “Is the carrot a root?” or “Which part of the plant is this spinach?”','Accept a question about a familiar food’s plant part.'),
('For example, “I think the empty tube may roll because a tube rolled when it lay on its curved side before.”','Accept other plausible predictions tied to relevant experience; do not mark only by the later outcome.'),
('experiences; prior observations is also acceptable.','Use something relevant that you have encountered before.'),
('Which animals might we see outside? → question; I think we will see birds. → prediction; What material is this object made from? → question.','A question asks; a prediction suggests an outcome.'),
('Seeing a similar ball bounce is the relevant reason. A favourite colour does not explain likely bouncing.','Judge whether the experience connects to the event being predicted.'),
('For example: “Will we see birds in the garden? I think we may, because I saw them there yesterday.”','The question and prediction should concern the same school-ground observation.')],
'AC9SFI02':[
('Follow the teacher’s instructions. Check before using equipment.','Listen before touching or moving tools.'),
('taste. Do not taste materials during these science investigations.','Keep food tasting separate from this investigation.'),
('sight → green; hearing → quiet; touch → rough.','Identify the sense that can provide each observation safely.'),
('ask. Stop and ask the adult or teacher.','Uncertainty is a reason to check, not to try it first.'),
('For example, walk while carrying equipment and do not taste materials.','Accept two relevant safety rules for the actual activity.'),
('For example, sight: the block is brown; permitted touch: its edge feels rough.','Accept actual observations and ensure touch is adult-approved.'),
('observations. A tool can reveal smaller visible details.','Name a detail the tool helps you observe.'),
('unknown material → do not taste; magnifying glass → use carefully; outdoor investigation → be sun safe.','Match each situation to the protective action.'),
('Do not taste or touch the unfamiliar berry. Ask the adult; describe its visible colour or shape from a safe distance if directed.','Choose an observation that does not require unsafe contact.'),
('Follow adult instructions; carry the tool carefully; stay in the agreed area; protect plants; never look at the Sun through the glass or focus sunlight.','Accept a short relevant checklist, including careful tool use and outdoor safety.')],
'AC9SFI03':[
('a simple table. It provides a structure for the observations.','Use the supplied headings and rows.'),
('a pattern: the grouped bird pictures share feathers.','Point to the observed shared feature.'),
('fish pictures → common animal features; rolling balls → similar movement; wooden objects → similar material use.','Connect each record to the comparison it supports.'),
('template. It gives a place to record observations.','Use the provided structure rather than inventing results.'),
('Feathers: duck and pigeon. No feathers: dog.','Apply the given headings to all three described cards.'),
('The ball and toy car both rolled; the block slid.','Use the supplied observations rather than suggesting an unobserved result.'),
('recorded; made is also acceptable.','A pattern needs evidence from actual observations.'),
('glass → many window panes; metal → many spoons; wood → many blocks or furniture parts.','These are common uses, not claims that every object has that material.'),
('No. The ball and toy car rolled, but the block slid, so “all three rolled” contradicts the record.','Use the block’s entry as evidence against the claim.'),
('Ball—rolled; block—slid; toy car—rolled. The ball and car shared a rolling movement in this trial.','Fill the supplied organiser first, then compare its entries with guidance.')]
}
PROMPTS={
'AC9SFI01':{8:'One child predicts bouncing because a similar ball bounced yesterday. Another uses their favourite colour as the reason. Which reason is relevant? Explain.'},
'AC9SFI02':{8:'During a plant walk you find an unfamiliar berry. Someone suggests tasting it. What should you do, and what could you safely observe instead?'},
'AC9SFI03':{4:'Use the headings feathers / no feathers. A duck and pigeon have feathers; a dog has fur. Put each animal under a heading.',5:'Recorded observations: ball—rolled; block—slid; toy car—rolled. Name one movement shared by two objects.',8:'The record says ball—rolled, block—slid, toy car—rolled. A child says all three rolled. Does the record support this? Explain.',9:'Fill this organiser: ball—____; block—____; toy car—____. Observations: the ball and car rolled; the block slid. With an adult, describe one shared movement.'}}
for code,items in LESSONS.items():
 p=next((R/'foundation/science').glob(code.lower()+'*/index.html'));s=p.read_text()
 content=''.join('<article class="mini-card"><h3>'+escape(i[0])+'</h3><p>'+escape(i[1])+'</p>'+ ('<details><summary>Answer and teaching guidance</summary><p>'+escape(i[2])+'</p></details>' if len(i)>2 else '')+'</article>' for i in items)
 block='<!-- science-inquiry-review:start --><details class="topic-menu"><summary><span>Explain, check and apply</span><span class="menu-badge">Reason</span></summary><div class="menu-content">'+content+'</div></details><!-- science-inquiry-review:end -->'
 s=re.sub(r'<!-- science-inquiry-review:start -->.*?<!-- science-inquiry-review:end -->','',s,flags=re.S)
 pos=s.index('</details>')+len('</details>');s=s[:pos]+block+s[pos:]
 it=iter(ELABS[code]);s=re.sub(r'<p><strong>Learning connection:</strong>.*?</p>',lambda m:'<p><strong>Teaching example:</strong> '+next(it)+'</p>',s)
 if code=='AC9SFI02':s=s.replace('TASTE → never unless specifically part of a safe food activity','TASTE → do not taste investigation materials')
 p.write_text(s)
# Keep the existing student worksheet renderer and its 8 core / 2 enrichment split.
marker='// Scoped text review: Foundation inquiry questions, safety and records.'
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
  s=p.read_text();s=re.sub(r'foundation-science-worksheet-data.js\?[^" ]+','foundation-science-worksheet-data.js?v=20260906-science-inquiry',s)
  s=re.sub(r'<!-- science-answer-guide:start -->.*?<!-- science-answer-guide:end -->','',s,flags=re.S)
  guide='<section class="worksheet-paper science-answer-guide" aria-label="Answer guide"><h2>'+code+' — Answer guide</h2><p>SkillrHub · Adult copy. Read directions aloud if needed; accept spoken explanations grounded in the examples.</p><button class="science-guide-print" type="button" onclick="document.body.classList.add(\'science-answers-only\');window.print();document.body.classList.remove(\'science-answers-only\')">Print answer guide</button><ol>'
  guide+=''.join('<li><p>'+escape(a)+'</p><p><strong>Teaching hint:</strong> '+escape(h)+'</p></li>' for a,h in rows)
  guide+='</ol><footer>'+code+' · SkillrHub · skillrhub.com</footer></section>'
  s=s.replace('<main id="worksheetRoot"></main>','<main id="worksheetRoot"></main><!-- science-answer-guide:start -->'+guide+'<!-- science-answer-guide:end -->')
  if 'foundation-science-answer-guide.css' not in s:s=s.replace('</head>','<link rel="stylesheet" href="/assets/foundation-science-answer-guide.css?v=20260906"></head>')
  p.write_text(s)
