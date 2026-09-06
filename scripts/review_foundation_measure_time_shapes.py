"""Scoped text maintenance: AC9MFM01, AC9MFM02, AC9MFSP01."""
from pathlib import Path
from html import escape
import re,json
R=Path(__file__).resolve().parents[1]
LESSONS={
'AC9MFM01':[
('Choose what to compare','Name the attribute first: length, mass, capacity or duration. Compare two real objects or events directly and explain what the comparison shows. Standard units and measuring scales are not required.'),
('Repair a length comparison','Two ribbons lie side by side, but their starting ends do not line up. One finishes farther along the table. Can you tell which is longer?','Not yet. Straighten the ribbons without stretching them and align one end of each. Then compare the other ends; they may also be equal in length.'),
('Use the pouring evidence','Fill cup A to the brim and pour all its water into empty cup B without spilling. B still has space. Which cup holds more?','B holds more. It holds all of A’s full amount with room left over. A taller-looking cup does not necessarily have the greater capacity.'),
('Compare duration fairly','Two children start packing identical sets of blocks at the same signal. One finishes while the other is still packing. Which task took longer?','The task that finished later took longer because both started together. Finishing later alone is not enough evidence when starting times differ.'),
('Ready to move on','Compare a long empty cardboard tube and a short stone. Which is longer? How will you find which is heavier?','Align the objects to compare length; heft them or use a balance to compare mass. Accept the observed result. Being longer does not by itself mean being heavier.')],
'AC9MFM02':[
('Connect time words to events','Order familiar events using morning, lunchtime, afternoon and night time. Explain the order using when the events occur. Families may have different routines; clock reading is not required.'),
('The week keeps going','A class chart ends with Sunday. A child says there is no next day on the chart. What should come next, and why?','Monday follows Sunday. The seven-day sequence repeats even when the chart has an edge. Arrange day cards in a loop to show this.'),
('Read a simple roster','The watering roster says Monday: Noor; Tuesday: Eli; Wednesday: Ava. Today is Tuesday. Who watered yesterday, and whose turn is tomorrow?','Noor watered yesterday; Ava waters tomorrow. Find Tuesday first, then move one day back or forward.'),
('Fix a daily sequence','A story says: in the morning we plant seeds; at lunchtime we eat; in the afternoon we water them. A child puts watering first. How should the events be ordered?','Plant seeds, eat lunch, then water seeds. Use the time words in this story to justify the order, rather than choosing a favourite activity first.'),
('Ready to move on','Today is Monday. Name yesterday and tomorrow, then describe something you do in the morning and something at night.','Yesterday was Sunday; tomorrow is Tuesday. Accept plausible personal routines with a clear time-of-day connection. Revisit the week loop if Sunday is missed.')],
'AC9MFSP01':[
('Use features to explain','Name a familiar shape and trace its boundary. Notice straight sides, curved boundaries and corners. Turning it, changing its colour or making a larger copy does not change its shape.'),
('Keep the sorting rule','Sort a red triangle, a blue triangle and a red circle into shapes with three straight sides and shapes without three straight sides. Where does each go?','Both triangles go together; the circle goes in the other group. Colour does not determine membership for this rule. Sorting by colour is valid when colour is the stated rule.'),
('Compare and turn shapes','Compare a square with a rectangle that has two long sides and two short sides. What is the same and what is different? Then turn the square.','Both have four straight sides and four square corners. The square has four equal sides; the other rectangle does not. Turning the square leaves these features unchanged.'),
('Create a shape picture','Use familiar shapes to make a pretend vehicle. Name two shapes you chose and explain how you used them.','For example, a rectangle can form the body and circles can form the wheels. Accept other designs when the child correctly names and explains the shapes.'),
('Ready to move on','Find a circle-like part and a rectangle-like part of objects nearby. Trace or point to each part and explain your choice.','For example, a round lid has a circular outline and a book cover has a rectangular outline. Name the part being described; the whole three-dimensional object is not a flat shape.')]
}
ELABS={
'AC9MFM01':['Compare two ribbons using longer or shorter, then two containers using holds more or less. Ask children to name the attribute each time.','Line up one end of a spoon and a fork before comparing the other ends. Explain why shifting one object along the table gives a misleading comparison.','Start two familiar actions at the same signal and observe which finishes first. Explain which takes longer using the shared starting point.','Heft a sealed tin and a light food packet, then compare their lengths separately. Describe each result without assuming that the longer object is heavier.'],
'AC9MFM02':['Arrange pictures of waking, eating lunch, afternoon play and bedtime. Explain each placement using a part-of-day word and allow reasonable personal routines.','Arrange all seven day cards in a loop. Identify the usual school days and weekend days, then trace Sunday to Monday without stopping.','Retell three events from a shared story using first, next and last. Use evidence from the story when two proposed orders disagree.','Read a three-day watering roster. Mark today, then identify who watered yesterday and whose turn comes tomorrow.','Draw one familiar event for each of several named days. Read the diary in day order and discuss any repeated activities.'],
'AC9MFSP01':['Sort the same shape collection first by colour, then by number of straight sides. State the new rule before moving any shape.','Make a vehicle picture with traced shapes. Name the shapes and explain which vehicle parts they represent.','With space and adult guidance, form a circle as a group. Compare its continuous curved outline with the straight sides and corners of a large triangle made from rope.','Find a circular wheel outline and a rectangular panel on familiar objects. Point to the particular part rather than naming the whole object as a flat shape.','Observe accessible natural objects on Country/Place with local guidance. Sketch observable outlines and sort by shape without collecting protected objects or assigning invented cultural meanings.']}
ANS={
'AC9MFM01':[
('longer. It describes a comparison of length.','Ask whether you are comparing how long, how heavy, how much it holds or how long it takes.'),
('longer. A reaches farther when the starting ends are aligned.','Compare the far ends only after lining up the starting ends.'),
('heavier → mass; holds more → capacity; takes longer → duration.','Say what changes in each comparison.'),
('Line up the same starting point. Then compare the other ends.','Keep both spoons straight and side by side.'),
('Fill A to the brim, then pour into empty B without spilling. Space left in B means B holds more; overflow means B holds less; exactly full means equal capacity.','Start with one full container and one empty container.'),
('longer. B finishes later after the shared start.','Use both the starting and finishing information.'),
('use a balance → mass; pour between containers → capacity; align endpoints → length.','Choose the method that directly tests the named attribute.'),
('The shorter, wider cup holds more: it holds all the tall cup’s full amount and still has space.','Use the pouring result rather than height alone.'),
('Size alone is not enough. Heft the empty box and the book, or put them on a balance to compare their mass.','Do not predict the result from appearance; report what the comparison shows.')],
'AC9MFM02':[
('morning, in the familiar morning-to-night routine.','Think about the start of a usual waking day.'),
('afternoon. It follows lunchtime and comes before night in this sequence.','Say all four parts of the sequence in order.'),
('breakfast → morning; lunch → lunchtime; bedtime → night.','These are likely routine times; personal routines can differ.'),
('Monday. The weekly sequence continues after Sunday.','Continue around the week rather than stopping at the chart’s edge.'),
('wake up, eat lunch, go to bed.','Connect each event to morning, lunchtime or night.'),
('Yesterday: Tuesday. Tomorrow: Thursday.','Start at Wednesday; move back one day for yesterday and forward one for tomorrow.'),
('yesterday → the day before today; today → the current day; tomorrow → the day after today.','Anchor both directions to today.'),
('Noor watered yesterday; Ava waters tomorrow.','Locate Tuesday on the roster, then look one day before and one day after.'),
('For example: wake in the morning, eat at lunchtime, play in the afternoon, go to bed at night. The time words explain the order.','Accept a sensible four-event personal routine with reasons based on when events happen.')],
'AC9MFSP01':[
('triangle. It has three straight sides meeting at three corners.','Trace all the way around the boundary.'),
('4. A square has four corners.','Count each corner once as you trace around it.'),
('triangle → 3 straight sides; circle → curved boundary, no corners; square → 4 equal straight sides.','Match the listed features; a square also has four square corners.'),
('still a square. Turning it does not change its sides or corners.','Imagine turning the cut-out back without bending it.'),
('For example, a rectangle for the body and circles for the wheels; name and explain both choices.','Accept any vehicle drawing using two correctly named familiar shapes.'),
('0. Its boundary curves continuously without corners.','Trace the circle and look for a point where straight sides meet.'),
('has 3 corners → triangle; has no corners → circle; has 4 corners → square and rectangle.','Use the stated number-of-corners rule for every shape.'),
('For example, a lid’s outline is circular with no corners; a book cover is rectangular with four straight sides and four square corners.','Name the specific part of each object and give a feature as evidence.'),
('Both triangles belong in the three-straight-sides group, even if one is blue and one is red.','Apply the stated shape rule; colour matters only when colour is the sorting rule.')]
}
PROMPTS={
'AC9MFM01':{7:'A full tall cup is poured into an empty shorter, wider cup without spilling. There is still space in the wider cup. Which holds more? Explain.',8:'A large empty box and a small book look different in size. Why is size alone not enough to tell which is heavier? How could you test it?'},
'AC9MFM02':{0:'In a familiar morning-to-night routine, which of these comes first?',7:'Watering roster: Monday—Noor; Tuesday—Eli; Wednesday—Ava. Today is Tuesday. Who watered yesterday? Whose turn is tomorrow?'},
'AC9MFSP01':{4:'Draw a pretend vehicle using two familiar shapes. Name the shapes and explain what each represents.',7:'Name a circle-like part and a rectangle-like part of everyday objects. Give a feature that supports each choice.',8:'The rule is “three straight sides”. A child puts a red triangle in the group but leaves a blue triangle out. Explain how to fix the sorting.'}}
for code,items in LESSONS.items():
 p=next((R/'foundation/maths').glob(code.lower()+'*/index.html'));s=p.read_text()
 content=''.join('<article class="mini-card"><h3>'+escape(i[0])+'</h3><p>'+escape(i[1])+'</p>'+ ('<details><summary>Answer and teaching guidance</summary><p>'+escape(i[2])+'</p></details>' if len(i)>2 else '')+'</article>' for i in items)
 block='<!-- measure-time-shapes-review:start --><details class="topic-menu"><summary><span>Explain, check and apply</span><span class="menu-badge">Reason</span></summary><div class="menu-content">'+content+'</div></details><!-- measure-time-shapes-review:end -->'
 s=re.sub(r'<!-- measure-time-shapes-review:start -->.*?<!-- measure-time-shapes-review:end -->','',s,flags=re.S)
 pos=s.index('</details>')+len('</details>');s=s[:pos]+block+s[pos:]
 empty='<article class="mini-card"><h3>1. </h3><p></p></article><article class="mini-card"><h3>2. </h3><p></p></article><article class="mini-card"><h3>3. </h3><p></p></article>'
 s=s.replace(empty,''.join('<article class="mini-card"><h3>'+str(n)+'. '+escape(i[0])+'</h3><p>'+escape(i[1])+'</p></article>' for n,i in enumerate(items[1:4],1)))
 it=iter(ELABS[code]);s=re.sub(r'<p><strong>Learning connection:</strong>.*?</p>',lambda m:'<p><strong>Teaching example:</strong> '+next(it)+'</p>',s)
 if code=='AC9MFSP01':
  s=s.replace('<strong>Sorts by colour instead of feature:</strong> Repeat the sorting rule before placing each item.','<strong>Uses a different sorting rule:</strong> Colour is a valid rule when chosen. If the rule is sides or corners, apply that rule to every shape.')
 p.write_text(s)
data={code:[{'prompt':PROMPTS.get(code,{}).get(i),'answer':a,'hint':h} for i,(a,h) in enumerate(rows)] for code,rows in ANS.items()}
marker='// Scoped text review: measurement, time sequences and familiar shapes.'
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
  s=p.read_text();s=re.sub(r'foundation-maths-topic-module-data-v2.js\?[^" ]+', 'foundation-maths-topic-module-data-v2.js?v=20260906-measure-time-shapes',s)
  s=re.sub(r'<script src="/assets/foundation-maths-worksheet-elaborations-[^"]+"></script>','',s)
  p.write_text('\n'.join(l.rstrip() for l in s.splitlines())+'\n')
