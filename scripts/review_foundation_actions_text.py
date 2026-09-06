"""Scoped text-only maintenance: AC9MFN05, AC9MFN06, AC9MFA01."""
from pathlib import Path
from html import escape
import re,json
R=Path(__file__).resolve().parents[1]
LESSONS={
'AC9MFN05':[
('Act before choosing a calculation','Build the starting collection, perform the action and count or recognise the result. Children may explain with objects and spoken words; a formal number sentence is not the starting requirement.'),
('Same numbers, different actions','There are 6 toy birds. In one story 2 more arrive; in another, 2 fly away. Show both stories. Do they end with the same number?','No. Joining gives 8; separating leaves 4. The action determines what happens, even though both stories use 6 and 2.'),
('Check the model','A story says 7 buttons are on a mat and 3 are removed. A child puts 3 more buttons on the mat. What must change?','Start with 7 and move 3 away, leaving 4. Adding buttons models a different action.'),
('Are there enough?','There are 5 children and 3 paintbrushes. Each child needs one brush. How many more brushes are needed?','2 more. Match a brush to each child; two children have none. Add two and check all five have one.'),
('Ready to move on','Give the child 4 counters. Ask them to show 2 joining, then begin again with 4 and show 2 leaving.','The results are 6 and 2. Look for the correct starting group and action, not only a remembered answer. Use smaller groups if needed.')],
'AC9MFN06':[
('Sharing and grouping ask different questions','Share 8 counters equally between 2 mats: find how many on each mat. Then make groups of 2 from 8 counters: find how many groups. The same collection can answer different questions.'),
('Name what the answer counts','Share 8 between 2 mats. Then arrange 8 in groups of 2. What does 4 mean in each case?','Sharing: 4 counters on each mat. Grouping: 4 groups, with 2 counters in each. Say the unit with the answer.'),
('Repair an unequal share','One mat has 4 counters and another has 2. Move counters to make equal shares without changing the total.','Move one from the group of 4 to the group of 2. Each mat now has 3, and the total stays 6.'),
('Notice a leftover','Share 5 whole counters between 2 mats, one at a time. Can you use all five and give both mats the same number?','No. Two on each mat leaves one counter. Moving that last counter between mats does not make equal shares. Keep counters whole; fractions are not required.'),
('Ready to move on','Use 6 counters. Show equal shares between 3 people, then make groups of 3.','Each person gets 2 in the sharing task. There are 2 groups of 3 in the grouping task. Check both the number of groups and the number in each.')],
'AC9MFA01':[
('Repeat the whole unit','Copy a pattern first, then identify the smallest group that repeats in the same order. Practise patterns made from objects, spoken sounds and movements; letters such as A and B are optional shorthand.'),
('Continue more than one step','The repeating unit is clap, clap, stamp. Continue: clap, clap, stamp, clap, clap, stamp. Say the next three actions.','clap, clap, stamp. Repeat the entire three-action unit, not only its final action.'),
('Repair against a stated rule','The intended rule is red, blue repeating. The sequence is red, blue, red, blue, blue, blue. Which item needs changing?','The fifth item should be red. This restores three repeats of red, blue. State the intended rule before judging a finite sequence incorrect.'),
('Keep the structure','Change red, red, blue, red, red, blue into a movement pattern using clap for red and stamp for blue.','clap, clap, stamp, clap, clap, stamp. The repeated structure stays the same even though the representation changes.'),
('Ready to move on','Make a pattern with spoon, cup repeating three times. Ask the child to copy it, name the smallest unit and add the next two items.','The unit is spoon, cup; the next two items are spoon, cup. If needed, separate the existing pattern into pairs before continuing.')]
}
ELABS={
'AC9MFN05':['Act out 6 birds with 2 arriving, then a separate story with 2 leaving. Keep the starting collection visible and record each result.','Match 3 brushes to 5 children to find how many are missing. In a separate pretend shop, pay a whole-dollar price using the matching number of $1 tokens.','Use a locally appropriate, authorised telling of the named story. Model only additive events actually present in that source and respect cultural authority.','Use an authorised account of the named Warlpiri game. Follow its actual actions and permissions rather than inventing a generic cultural game.'],
'AC9MFN06':['Deal 8 cards to 4 players, one each in turn. Count every share to verify that each player receives 2.','Share 9 beads between 3 mats, then separately make groups of 3. Ask what each answer counts: beads per mat or number of groups.','Use an authorised explanation of Yangamini from the Tiwi Peoples. Follow the source and permissions when exploring its sharing actions.'],
'AC9MFA01':['Copy clap, clap, stamp twice. Name the whole repeating unit and continue it with the next three actions.','Set out spoon, cup, spoon, cup for pretend places. Name the repeating pair and prepare the next place with the same order.','Examine an existing digital pattern image. Point to a repeated unit and check its order throughout; a generated image may contain an error.','Use a locally appropriate, community-approved example from named Peoples and Country/Place. Describe observable repetition without inventing cultural meanings or reproducing restricted designs.']}
ANS={
'AC9MFN05':[
('The collection gets larger because objects join it.','Act out the joining action with counters.'),('5; three and two make five.','Build the starting group and add the new objects.'),('2 more arrive → joining; 3 hop away → separating; 1 is added → joining.','Describe the action before matching.'),('5 remain because three of the eight are removed.','Move the removed counters away from the group.'),('For example, 5 birds are on a fence and 2 arrive, making 7.','Show the starting amount, action and result.'),('5; seven with two removed leaves five.','Keep track of the counters that remain.'),('4 then 3 more → joining to make 7; 7 then 3 removed → separating; 5 then 1 more → joining to make 6.','Match the action and result, not just one number.'),('Joining 2 to 6 gives 8; removing 2 from 6 leaves 4.','Begin each story with a new collection of six.'),('No. In “How many more brushes are needed?”, match the 3 brushes to 5 children to find the missing 2.','Use the situation and objects instead of choosing an action from one word.')],
'AC9MFN06':[
('2 counters each. Three equal shares of two use all six.','Deal one counter to each child in turn.'),('4 in each group. Two groups of four use all eight.','Check that both groups have the same number.'),('6 → 3 groups of 2; 8 → 2 groups of 4; 9 → 3 groups of 3.','Count the groups and the items in each group.'),('No. Three counters and two counters are different amounts.','Compare the number in each share.'),('Deal one card to each of four players in turn; repeat once. Each gets 2.','Check that all eight cards are used.'),('3 objects in each group.','Make three equal groups using all nine objects.'),('number of groups → how many groups; group size → objects in each group; fair share → everyone gets the same amount.','Say what each number describes.'),('Move one counter from the group of 4 to the group of 2. Both then have 3.','Keep the total of six unchanged.'),('Three groups of 3 use 9 counters, leaving 1. The groups are equal, but they do not include all 10.','Count the grouped counters and the leftover separately.')],
'AC9MFA01':[
('triangle. The repeating unit is triangle, circle.','Repeat the pair in the same order.'),('red. The red-blue pair repeats.','Read the whole pattern from the start.'),('red blue; clap stamp; A B C are the respective smallest units.','Find the shortest unit that repeats to make each shown pattern.'),('square circle square circle shows two repeats of the same pair.','Look for a whole unit shown again in the same order.'),('For example, clap, stamp, clap, stamp; the unit is clap, stamp.','Show at least two complete repeats.'),('B. The unit A, B, C repeats.','Check the place between A and C.'),('copy → make the same pattern; continue → add the next correct items; repair → fix the wrong item.','Decide what action is being requested.'),('clap, clap, stamp, clap, clap, stamp. The repeated order is unchanged.','Replace each red with clap and each blue with stamp.'),('The fifth item should be red. Then red, blue repeats three times.','Use the stated red-blue rule to check each position.')]
}
PROMPTS={'AC9MFN05':{7:'Use 6 counters for each story: 2 join; 2 leave. Show and explain the two results.',8:'There are 5 children and 3 brushes. How many more brushes are needed for one each? Does the word “more” tell you to add 5 and 3?'},'AC9MFN06':{7:'One mat has 4 counters and another has 2. Move counters to make equal shares. Explain what you moved.'},'AC9MFA01':{3:'Which sequence shows the same whole unit repeated at least twice?',7:'Change red, red, blue, red, red, blue into actions: use clap for red and stamp for blue. Say the new pattern.'}}
for code,items in LESSONS.items():
 p=next((R/'foundation/maths').glob(code.lower()+'*/index.html'));s=p.read_text()
 content=''.join('<article class="mini-card"><h3>'+escape(i[0])+'</h3><p>'+escape(i[1])+'</p>'+ ('<details><summary>Answer and teaching guidance</summary><p>'+escape(i[2])+'</p></details>' if len(i)>2 else '')+'</article>' for i in items)
 block='<!-- actions-text-review:start --><details class="topic-menu"><summary><span>Explain, check and apply</span><span class="menu-badge">Reason</span></summary><div class="menu-content">'+content+'</div></details><!-- actions-text-review:end -->'
 s=re.sub(r'<!-- actions-text-review:start -->.*?<!-- actions-text-review:end -->','',s,flags=re.S)
 pos=s.index('</details>')+len('</details>');s=s[:pos]+block+s[pos:]
 empty='<article class="mini-card"><h3>1. </h3><p></p></article><article class="mini-card"><h3>2. </h3><p></p></article><article class="mini-card"><h3>3. </h3><p></p></article>'
 s=s.replace(empty,''.join('<article class="mini-card"><h3>'+str(n)+'. '+escape(i[0])+'</h3><p>'+escape(i[1])+'</p></article>' for n,i in enumerate(items[1:4],1)))
 it=iter(ELABS[code]);s=re.sub(r'<p><strong>Learning connection:</strong>.*?</p>',lambda m:'<p><strong>Teaching example:</strong> '+next(it)+'</p>',s)
 if code=='AC9MFN06':
  s=s.replace('Move one object or start again by dealing one at a time.','With 5 whole objects, give 2 to each person and leave 1 aside. Moving one between the shares cannot use all 5 and make the shares equal.')
  s=s.replace('GROUP 9 INTO 3','GROUP 9 IN GROUPS OF 3')
 p.write_text(s)

data={code:[{'prompt':PROMPTS.get(code,{}).get(i),'answer':a,'hint':h} for i,(a,h) in enumerate(rows)] for code,rows in ANS.items()}
js='''\n// Scoped text review: joining/separating, equal groups and repeating patterns.
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
'''.replace('DATA',json.dumps(data,ensure_ascii=False))
p=R/'quiz/assets/foundation-maths-topic-module-data-v2.js';s=p.read_text();marker='// Scoped text review: joining/separating, equal groups and repeating patterns.'
if marker in s:s=s[:s.index(marker)]
p.write_text(s.rstrip()+'\n'+js)
for code in LESSONS:
 for p in (R/'quiz/grade-k/math'/code.lower()/'worksheet').glob('**/index.html'):
  s=p.read_text();s=re.sub(r'foundation-maths-topic-module-data-v2.js\?[^" ]+', 'foundation-maths-topic-module-data-v2.js?v=20260906-actions-review',s)
  s=re.sub(r'<script src="/assets/foundation-maths-worksheet-elaborations-[^"]+"></script>','',s)
  p.write_text('\n'.join(l.rstrip() for l in s.splitlines())+'\n')
