"""Text-only review for AC9SFU01, AC9SFU02 and AC9SFH01."""
from pathlib import Path
from html import escape
import json,re
R=Path(__file__).resolve().parents[1]
LESSONS={
'AC9SFU01':[
('Observe the visible part','Point to the feature you name on a real plant or animal picture. Roots are external plant parts, but they may be hidden by soil. Say “not visible here” rather than assuming a hidden part is absent.'),
('Plant parts in familiar foods','Look at a carrot root, a spinach leaf and a whole apple. Which plant part is each?','Carrot: root; spinach: leaf; apple: fruit. These familiar foods come from different parts of plants. Use real samples or familiar pictures; tasting is not needed.'),
('Compare humans and other animals','Humans are animals too. Compare a person and a dog using external features. Name one similarity and one difference.','Both have eyes and ears. A dog has a tail and a fur-covered body; a person has hands and no external tail. Accept accurate visible comparisons without inferring hidden features.'),
('Use one rule, then another','Picture cards show a duck with feathers and wings, a butterfly with wings, and a dog with fur. Group by wings, then by feathers.','Wings: duck and butterfly together, dog separately. Feathers: duck separately from butterfly and dog. The same cards can form different groups when the stated rule changes.'),
('Ready to move on','Look at two plants or two animal pictures. Name a visible feature they share, one difference and a rule for grouping them.','Accept accurate evidence from the actual examples. Ask the child to point to the feature. Colour can be a valid observable rule; also practise structural features such as leaves, wings or body covering.')],
'AC9SFU02':[
('Describe the motion you observe','Use roll, slide, spin or bounce to describe what happens, not only fast or slow. An object can move in more than one way. Observe each trial rather than assigning one permanent movement to an object.'),
('Same object, different starting position','With adult guidance, put an empty tube on its curved side on a low ramp, then try it resting on a flat end. What changes?','On its curved side it may roll; on a flat end it may slide, remain still or tip. Record the actual result. Its material has not changed, but how its shape meets the surface has changed.'),
('Use the evidence, not a size rule','Two balls of different sizes are released from the same low ramp. The smaller one travels farther in this trial. Does the bigger ball always travel farther?','No. This result does not support “bigger always goes farther”. Other differences, such as material, can matter too. Describe these objects and this trial without claiming size alone caused the result.'),
('Compare materials with guidance','Compare similar-sized rubber and foam balls on the same surface. Release each from the same low height without pushing. What could you observe?','Observe whether and how they bounce, and which rises higher in repeated trials. Keep the start and surface alike; report the result rather than assuming every rubber or foam ball behaves identically.'),
('Ready to move on','Move two safe objects. Name how each moves and describe one visible feature that may help explain the difference.','For example, a round ball rolls while a block slides on a flat face. Accept actual observations. Formal force laws, speed calculations and independent experimental design are not required.')],
'AC9SFH01':[
('People use observations to learn','A gardener notices leaf edges have changed and asks what might be happening. Careful observations, questions and records help people learn about nature. The first observation may not tell them the cause.'),
('Observation or explanation?','A child sees a leaf with holes and says, “An insect ate it.” What was directly observed, and what is still an idea to investigate?','The holes were observed. An insect eating the leaf is a possible explanation, not something established by the holes alone. Ask what more the child could observe.'),
('Choose a useful record','A naturalist wants to compare the same seedling today and next week. How could a record help?','A dated drawing or photograph showing the leaves gives something to compare later. Include actual visible detail and identify the same plant; memory alone may miss changes.'),
('Look closer with a purpose','A child notices tiny marks on a leaf. What tool could help, and what question could they ask?','A magnifying glass may show the marks more clearly. A connected question is “What do the marks look like close up?” Observe without damaging the plant; use tools with adult guidance.'),
('Ready to move on','Describe something a person could observe outdoors, ask a connected question and choose a way to record it.','For example: “There are two birds on the branch. Do more visit later?” A dated drawing or photograph records the sighting. Accept other linked examples grounded in what is actually observed.')]
}
ELABS={
'AC9SFU02':['Observe safe toys in motion and group by what happened, such as rolling or sliding. Allow a toy to show different movements in different trials.','Try an empty tube on its curved side and on a flat end on a low ramp. Describe actual rolling, sliding, tipping or remaining still.','Compare different-sized balls with adult guidance. Keep the release point and surface alike, and notice when material also differs so size alone cannot explain the result.','Release similar-sized balls of different materials from the same low height onto the same surface. Compare observed bouncing and repeat before describing a pattern.','Use an authorised account of a named traditional instructive toy. Observe or discuss its documented movement and respect local permissions rather than inventing cultural designs.'],
'AC9SFH01':['Compare what can be seen on a leaf unaided and with a magnifying glass. Explain which extra detail the tool helped reveal.','Compare a labelled drawing and a photograph of the same natural object. Discuss what each record preserves; use permissioned cultural records in their proper context.','Use a community-approved account from named Peoples and Country/Place to discuss how careful observations inform local knowledge of food, water or land. Do not generalise one account to all communities.','Use an age-appropriate account of a scientist already named in the curriculum. Identify the observations, questions and recording methods actually shown in that source.','Pause an appropriate nature documentary when someone asks a question. Identify the observation behind it and suggest one related question children could explore safely.']}
ANS={
'AC9SFU01':[
('roots, stem, leaves. These are plant parts; roots may need to be exposed to be visible.','Point to each part on a suitable plant or picture.'),
('scales. The question describes a fish with visible overlapping scales.','Describe this observed fish; not every fish has obvious scales.'),
('bird → feathers; fish → scales; plant → leaves.','Match the familiar examples to their observed features.'),
('see. The rule uses a visible feature.','State which feature you looked at.'),
('For example, stem and leaves; accept any two external features visible in the chosen example.','Do not claim that hidden roots or absent flowers are visible.'),
('Both have eyes; the bird has feathers and wings while the fish has fins and visible scales.','Accept a different accurate similarity and difference for the examples used.'),
('outside. External means on the outside.','Distinguish a body feature from the surroundings.'),
('dog → fur; bird → feathers; fish → scales.','Use the familiar pictured or described examples.'),
('Wings: duck and butterfly together, dog separately. Feathers: duck separately, butterfly and dog together.','Apply each rule to all three described cards before changing rules.'),
('Colour is an observable feature, so it can be a valid rule. Another rule is feathers or no feathers, applied consistently.','A different rule need not make the first one wrong.')],
'AC9SFU02':[
('rolls. A marble turns over and over as it moves along a surface.','Describe the kind of movement.'),
('a flat block, resting on a flat face.','Its flat face can slide along the surface rather than roll.'),
('roll → marble moving; slide → book moving flat; bounce → ball moving up after hitting the floor.','Look for turning over, sliding along or rising again after contact.'),
('same. Use the same surface and starting point.','A similar start makes the observations easier to compare.'),
('For example, roll and bounce. Slide and spin are also acceptable.','Name movements rather than only fast or slow.'),
('A marble has a curved surface that allows rolling; a block on a flat face tends to slide or stay still.','Report what happens on the actual slope; a block can also tumble.'),
('material. What an object is made from can influence its movement.','Think about similar-shaped balls made from different materials.'),
('shape → round or flat; size → large or small; material → rubber or foam.','Name the difference being compared.'),
('No. The smaller ball went farther in this trial. Size alone cannot explain it because the balls also differ in material.','Describe the observed result and notice the other difference.'),
('With adult guidance, release both from the same low height onto the same surface without pushing. Observe and repeat their bouncing.','Keep starting conditions alike and compare what actually happens.')],
'AC9SFH01':[
('The leaf has three brown spots. This describes something visible.','Separate observable detail from liking or hoping.'),
('magnifying glass. It can make small details easier to see.','Use the tool to answer an observation question.'),
('sense → sight; tool → magnifying glass; record → labelled drawing.','Notice the difference between observing and recording.'),
('questions. People ask questions to learn more from their observations.','Connect the question to something noticed.'),
('For example, the leaf is green and has a jagged edge; accept two actual visible details.','Use sight, or touch only when an adult says the object is safe.'),
('For example, “Will this seedling have more leaves next week?”','Keep the question connected to the observed seedling and leaves.'),
('notes; words or tables are also acceptable simple records.','A record should preserve what was actually observed.'),
('The bird has a long beak → observation; Why is its beak long? → question; a photo → record.','Identify what is noticed, asked and saved.'),
('The holes are the observation. An insect making them is a possible explanation that needs more evidence.','Do not turn a possible cause into something directly observed.'),
('For example: “This leaf has three spots.” Ask “Will more spots appear?” Make a dated drawing or photograph of the same leaf.','Accept any observation, linked question and suitable record; do not invent an outcome.')]
}
PROMPTS={
'AC9SFU01':{1:'A fish has visible overlapping scales. Which word names its body covering?',8:'Cards show a duck with feathers and wings, a butterfly with wings, and a dog with fur. Group by wings, then by feathers.',9:'Kai groups animals by their visible colours. Can this be a sensible rule? Give another visible-feature rule.'},
'AC9SFU02':{1:'Which object, resting on a flat face on a slope, is most likely to slide rather than roll?',8:'A small rubber ball rolls farther than a large foam ball in one trial. Does this show bigger balls always go farther? Can size alone explain the result?'},
'AC9SFH01':{8:'A child sees holes in a leaf and says an insect made them. Which part is observed? Which part needs more evidence?'}}
for code,items in LESSONS.items():
 p=next((R/'foundation/science').glob(code.lower()+'*/index.html'));s=p.read_text()
 content=''.join('<article class="mini-card"><h3>'+escape(i[0])+'</h3><p>'+escape(i[1])+'</p>'+ ('<details><summary>Answer and teaching guidance</summary><p>'+escape(i[2])+'</p></details>' if len(i)>2 else '')+'</article>' for i in items)
 block='<!-- science-first-review:start --><details class="topic-menu"><summary><span>Explain, check and apply</span><span class="menu-badge">Reason</span></summary><div class="menu-content">'+content+'</div></details><!-- science-first-review:end -->'
 s=re.sub(r'<!-- science-first-review:start -->.*?<!-- science-first-review:end -->','',s,flags=re.S)
 if code=='AC9SFU01':
  s=s.replace('</main>',block+'</main>',1)
  s=s.replace('Colour only','Using only one feature')
 else:
  pos=s.index('</details>')+len('</details>');s=s[:pos]+block+s[pos:]
  it=iter(ELABS[code]);s=re.sub(r'<p><strong>Learning connection:</strong>.*?</p>',lambda m:'<p><strong>Teaching example:</strong> '+next(it)+'</p>',s)
 p.write_text(s)
# Keep the existing student worksheet renderer and its 8 core / 2 enrichment split.
marker='// Scoped text review: Foundation science features, movement and observation.'
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
  s=p.read_text();s=re.sub(r'foundation-science-worksheet-data.js\?[^" ]+','foundation-science-worksheet-data.js?v=20260906-science-first',s)
  s=re.sub(r'<!-- science-answer-guide:start -->.*?<!-- science-answer-guide:end -->','',s,flags=re.S)
  guide='<section class="worksheet-paper science-answer-guide" aria-label="Answer guide"><h2>'+code+' — Answer guide</h2><p>SkillrHub · Adult copy. Read directions aloud if needed; accept spoken explanations grounded in the examples.</p><button class="science-guide-print" type="button" onclick="document.body.classList.add(\'science-answers-only\');window.print();document.body.classList.remove(\'science-answers-only\')">Print answer guide</button><ol>'
  guide+=''.join('<li><p>'+escape(a)+'</p><p><strong>Teaching hint:</strong> '+escape(h)+'</p></li>' for a,h in rows)
  guide+='</ol><footer>'+code+' · SkillrHub · skillrhub.com</footer></section>'
  s=s.replace('<main id="worksheetRoot"></main>','<main id="worksheetRoot"></main><!-- science-answer-guide:start -->'+guide+'<!-- science-answer-guide:end -->')
  if 'foundation-science-answer-guide.css' not in s:s=s.replace('</head>','<link rel="stylesheet" href="/assets/foundation-science-answer-guide.css?v=20260906"></head>')
  p.write_text(s)
