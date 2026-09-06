"""Scoped text maintenance: AC9MFSP02 and AC9MFST01."""
from pathlib import Path
from html import escape
import re,json
R=Path(__file__).resolve().parents[1]
LESSONS={
'AC9MFSP02':[
('Name the reference object','Say where an object is in relation to something else: inside the box, under the table or beside the chair. Point to both objects to check that the listener understands the relationship.'),
('Use two location clues','There are two boxes: one beside the chair and one beside the door. The ball is inside the box beside the chair. Which clues identify its location?','Inside tells where the ball is relative to its box; beside the chair identifies which box. Saying only “in the box” leaves two possible locations.'),
('Describe the new position','A toy starts inside a basket. Move it out and place it next to the basket. What description must change?','The toy is now beside or next to the basket, not inside it. Describe the current position after each move.'),
('One object, two relationships','A toy is inside a box. The box and toy are under a table. Can the toy be both inside and under?','Yes. It is inside the box and under the table. The two words describe its relationship to different reference objects.'),
('Ready to move on','Place a toy under a chair, then beside the chair. Ask the child to describe each position and give you an instruction to put it back.','Look for a correct position word and a named reference object. If the child says “there”, ask “Where in relation to the chair?” and model the full sentence.')],
'AC9MFST01':[
('Start with a question and a rule','For “Do more of these toys have wheels or no wheels?”, place each toy in exactly one of the two groups. Use one counter or picture for each toy, then compare the groups.'),
('Check the display against the collection','A collection has 3 toys with wheels and 2 without wheels. A display shows 3 counters for wheels and 3 for no wheels. What needs fixing?','Remove one counter from the no-wheels group. Match each counter to one toy to check that all five toys are represented exactly once.'),
('Spacing does not change the count','One row has 4 counters close together. Another has 3 counters spread far apart. Does the wider row have more responses?','No. The first row has 4 and the second has 3. Use equal-sized counters, equal spacing and a shared start for easy visual comparison, or count each row.'),
('Use evidence, including a tie','A class display has 4 votes for apples and 4 for bananas, with one counter per vote. A child says apples won because they like apples. What does the display show?','The categories have the same number of votes: 4 each. A personal preference does not change the recorded responses.'),
('Ready to move on','Give a small collection of toys. Ask the child to sort by wheels or no wheels, show one counter for each toy and say which group has more, fewer or the same.','Check every toy has one place and one matching counter. Accept the actual comparison, including a tie. Ask the child to point to the display as evidence.')]
}
ELABS={
'AC9MFSP02':['Hide an item in one of two boxes and give a complete clue, such as inside the box beside the door. Ask which part of the clue identifies the correct box.','Move a ball from under a bench to beside it. Describe its position before and after the move using the bench as the reference.','Move a toy car beside a chair and then under a desk. Pause after each move to describe where it is relative to the furniture.','Use an authorised, locally appropriate account of Thapumpan. Follow the named source and permissions when describing participant positions; do not invent cultural rules or actions.'],
'AC9MFST01':['Sort a small toy collection by a clear observable rule, such as wheels or no wheels. Check each toy appears once and compare the groups.','Ask each participating child for one yes/no response to a familiar question. Use one counter per response and pair counters across groups to compare.','Make a sticker chart with one equal-sized sticker per response. Label the groups and check the chart against the responses before interpreting it.','Give a pretend sorting robot the rule wheels or no wheels. Deliberately misplace one toy and ask the class to use the rule to correct it.','Role-play a mystery-object guesser. Record answers to observable yes/no questions, such as has wheels, and use the evidence to narrow the possibilities. Explain that this is a simplified classroom model.','After reading an available story, collect observations from its actual pictures. Choose a specified page or set of pages, count consistently and compare the observed animal groups without inventing story counts.','Use a community-approved account from named Peoples and Country/Place to explore observations used in local weather knowledge. Describe what the source records without treating one example as universal.']}
ANS={
'AC9MFSP02':[
('inside. The ball is in the box.','Use the box as the reference object.'),
('under. The toy is directly below the chair seat.','Name both the position and the chair.'),
('inside → in the box; under → below the table; beside → next to the chair.','Match each word to its relationship with the named object.'),
('Put it beside the desk. This names a position and a reference object.','Look for information that helps someone find the intended place.'),
('For example, “Put the toy under the chair.”','Accept an instruction that clearly names the toy, position and chair.'),
('on top of; “on” is also acceptable. The pencil rests on the book’s upper cover.','Use the location described in the question.'),
('go forward → move ahead; turn left → change direction left; stop beside the table → finish next to the table.','Use the moving person’s viewpoint for left and forward.'),
('Inside tells where the ball is in its box; beside the chair identifies which of the two boxes.','Use both clues to select the location.'),
('“Over there” gives no named reference. “Inside the box beside the chair” identifies the container and where to find it.','Explain how the listener can locate the object without guessing.')],
'AC9MFST01':[
('Cats. Four counters represent cats and two represent dogs.','Use one counter per response and count each category.'),
('1. Pair three apple responses with the three banana responses; one apple response remains.','Match the groups one to one.'),
('collect → gather responses; sort → put responses into categories; compare → look for more, less or same.','Connect each word to the step it describes.'),
('So comparison is fair and easy. Equal-sized counters with equal spacing and a shared start make the counts easier to compare.','Spacing can change how long a row looks without changing its count.'),
('For example, toys with wheels and toys with no wheels. Every toy goes in one group.','Choose a clear rule that places every toy exactly once.'),
('same. Both groups have five votes.','Equal counts mean neither category has more.'),
('6 vs 3 → first has more; 2 vs 5 → first has fewer; 4 vs 4 → same.','Compare the first count with the second in each pair.'),
('No. Four counters represent more responses than three, even when the three are spread farther apart.','Count the counters or line them up with equal spacing to check.'),
('The toy is counted twice, so the display can overstate the total. Apply the rule and remove its extra entry so the toy appears once.','Check that each object has one matching representation.')]
}
PROMPTS={
'AC9MFSP02':{1:'A toy is directly below a chair seat, between the chair legs.',5:'The pencil rests on the upper cover of a closed book. Complete the location sentence.',7:'There are two boxes: one beside the chair and one beside the door. The ball is inside the box beside the chair. Explain how both clues help you find it.'},
'AC9MFST01':{0:'Each counter represents one response. Which category has more responses?',7:'Each counter represents one vote. One row has 4 close together; another has 3 spread far apart. Does the wider row have more votes? Explain.'}}
for code,items in LESSONS.items():
 p=next((R/'foundation/maths').glob(code.lower()+'*/index.html'));s=p.read_text()
 content=''.join('<article class="mini-card"><h3>'+escape(i[0])+'</h3><p>'+escape(i[1])+'</p>'+ ('<details><summary>Answer and teaching guidance</summary><p>'+escape(i[2])+'</p></details>' if len(i)>2 else '')+'</article>' for i in items)
 block='<!-- position-data-review:start --><details class="topic-menu"><summary><span>Explain, check and apply</span><span class="menu-badge">Reason</span></summary><div class="menu-content">'+content+'</div></details><!-- position-data-review:end -->'
 s=re.sub(r'<!-- position-data-review:start -->.*?<!-- position-data-review:end -->','',s,flags=re.S)
 pos=s.index('</details>')+len('</details>');s=s[:pos]+block+s[pos:]
 empty='<article class="mini-card"><h3>1. </h3><p></p></article><article class="mini-card"><h3>2. </h3><p></p></article><article class="mini-card"><h3>3. </h3><p></p></article>'
 s=s.replace(empty,''.join('<article class="mini-card"><h3>'+str(n)+'. '+escape(i[0])+'</h3><p>'+escape(i[1])+'</p></article>' for n,i in enumerate(items[1:4],1)))
 it=iter(ELABS[code]);s=re.sub(r'<p><strong>Learning connection:</strong>.*?</p>',lambda m:'<p><strong>Teaching example:</strong> '+next(it)+'</p>',s)
 p.write_text(s)
data={code:[{'prompt':PROMPTS.get(code,{}).get(i),'answer':a,'hint':h} for i,(a,h) in enumerate(rows)] for code,rows in ANS.items()}
marker='// Scoped text review: position and data.'
js='''\nMARKER
(() => {
 const edits = DATA;
 for (const [code, rows] of Object.entries(edits)) {
  const unit = window.SkillrFoundationWorksheetData?.[code];
  if (!unit || unit.questions.length !== rows.length) continue;
  unit.questions.forEach((q,i) => {
   const r=rows[i]; q.question=r.prompt || q.question.replace(/^E\\d\\s*[—-]\\s*/, "");
   q.answer=r.answer; q.hint=r.hint; q.summary=`${r.answer} ${r.hint}`;
   q.alignment.method=r.hint;
  });
 }
})();
'''.replace('MARKER',marker).replace('DATA',json.dumps(data,ensure_ascii=False))
p=R/'quiz/assets/foundation-maths-topic-module-data-v2.js';s=p.read_text()
if marker in s:s=s[:s.index(marker)]
p.write_text(s.rstrip()+'\n'+js)
for code in LESSONS:
 for p in (R/'quiz/grade-k/math'/code.lower()/'worksheet').glob('**/index.html'):
  s=p.read_text();s=re.sub(r'foundation-maths-topic-module-data-v2.js\?[^" ]+', 'foundation-maths-topic-module-data-v2.js?v=20260906-position-data',s)
  s=re.sub(r'<script src="/assets/foundation-maths-worksheet-elaborations-[^"]+"></script>','',s)
  p.write_text('\n'.join(l.rstrip() for l in s.splitlines())+'\n')
