"""Apply the scoped text-only topic review; worksheet edits live in their data file."""
from pathlib import Path
from html import escape
import re

ROOT=Path(__file__).resolve().parents[1]
REVIEWS={
'ac9mfn01':[
('Connect the number to its meaning','An empty tray is labelled 0. A full ten-frame and 6 extra counters show 16. Say each number, build it and choose its numeral. A bus labelled 16 does not have to contain 16 passengers: the numeral can identify the bus.'),
('Order and explain','Put 18, 8, 0 and 13 in order from smallest to largest. Explain where 0 belongs.','0, 8, 13, 18. Zero represents no objects and comes before 1. Use the existing number line to check the order.'),
('Check the direction','A child says the number before 12 is 13. Is that correct?','No. 11 is before 12; 13 is after 12. Point to 12 and move one step towards 0 to find the number before it.'),
('Position needs a starting point','Place three toys in a row. Mark the left end as the start. Which toy is first? Now mark the right end as the start. Does the first toy change?','Yes. First means the first position from the marked starting end. The toys stay in place, but reversing the start changes which toy is first.'),
('Ready to move on','Ask the child to build 17, choose its numeral and place it between 16 and 18. Then ask them to show 0.','Look for a matching collection, numeral and position, plus an empty collection for 0. If needed, work within 0–5 before returning to teen numbers.')],
'ac9mfn02':[
('Use a quick look, not a speed race','Briefly show an existing dot card, then cover it. Ask how many and what arrangement the child noticed. A correct answer after counting every dot is useful counting evidence, but does not yet demonstrate subitising. Give another supported look when needed; do not score children on speed.'),
('Explain what the eyes noticed','Use the existing four-dot arrangement. Show it briefly, cover it and ask how many. Ask what helped the child see the total.','4. Accept seeing the whole familiar arrangement at once, or recognising two groups of 2. Do not require a spoken partition when the child recognised the whole immediately.'),
('Same amount, different arrangement','Make 4 with counters. Move the same counters into a different arrangement without adding or removing any. Does the quantity change?','No. There are still 4. Arrange the counters in familiar small groups to help the child recognise the quantity again.'),
('Make the method visible','One child says “5” after pointing to every dot. Another says “5” after recognising a familiar arrangement. Are both totals correct? Which response shows subitising?','Both totals are correct. Recognising the arrangement without counting each dot shows subitising. Invite the first child to practise with a familiar arrangement of 2 or 3.'),
('Ready to move on','Use several existing cards with 1–5 objects in different arrangements. Briefly show each, cover it and ask for the total.','Look for reliable recognition across more than one arrangement. Accept naming the whole immediately or describing recognised small parts. Use smaller collections if the child relies on one-by-one counting.')],
'ac9mfn04':[
('Keep the same whole','Build 8 counters. Split them into 5 and 3. Move one counter from the group of 5 to the group of 3: now the parts are 4 and 4. No counter was added or removed, so the whole stays 8. Let children show and say the relationship before recording a number sentence.'),
('Find the missing part','There are 10 counters altogether. You can see 6 and the rest are covered. How many are covered? Explain how you know.','4. Six and four make ten. Build 10, leave 6 visible and cover the remaining 4 to check.'),
('Check an incorrect partition','A child splits a collection of 8 into parts labelled 5 and 4. Can both labels be right?','No. Five and four make 9. If the whole is 8 and one part is 5, the other part must be 3. Recombine the counters to check.'),
('Can a part be zero?','Put all 6 counters on one mat and none on the other. What are the two parts and the whole?','The parts are 6 and 0; the whole is 6. An empty part does not add any counters.'),
('Ready to move on','Ask the child to split 7 in two ways, name the parts and recombine each pair.','For example, 5 and 2, then 4 and 3. Both pairs make 7. Look for use of the same collection and recognition of small parts; use a whole of 4 if support is needed.')]
}

for code,items in REVIEWS.items():
 p=next((ROOT/'foundation/maths').glob(code+'*/index.html'));s=p.read_text()
 s=re.sub(r'<!-- number-text-review:start -->.*?<!-- number-text-review:end -->','',s,flags=re.S)
 body=''
 for item in items:
  body+='<article class="mini-card"><h3>'+escape(item[0])+'</h3><p>'+escape(item[1])+'</p>'
  if len(item)==3:body+='<details><summary>Answer and teaching guidance</summary><p>'+escape(item[2])+'</p></details>'
  body+='</article>'
 section='<!-- number-text-review:start --><details class="curriculum-topic-section"><summary><strong>Explain, check and apply</strong></summary><div class="curriculum-detail-body">'+body+'</div></details><!-- number-text-review:end -->'
 first_end=s.index('</details>')+len('</details>')
 s=s[:first_end]+section+s[first_end:]
 if code=='ac9mfn04':
  s=s.replace('<article class="mini-card"><h3>1. </h3><p></p></article><article class="mini-card"><h3>2. </h3><p></p></article><article class="mini-card"><h3>3. </h3><p></p></article>', '<article class="mini-card"><h3>1. Split and name</h3><p>Build 6 counters. Split them into two parts and name each part without recounting every counter where possible.</p></article><article class="mini-card"><h3>2. Change the parts</h3><p>Move one counter between the parts. Name the new parts and check that the whole remains 6.</p></article><article class="mini-card"><h3>3. Hide a part</h3><p>Build 8. Leave 3 visible and cover the rest. Predict the hidden part, then uncover and check.</p></article>')
  replacements=[
   'Use the existing model of 7. Recognise 5 and 2 as parts, say “5 and 2 make 7”, then check by recombining.',
   'Split 6 counters into 4 and 2, then 5 and 1, then 3 and 3. Keep the same six counters throughout and name each pair of parts.',
   'Use an existing domino or dot arrangement with a total up to 10. Name the small parts recognised at a glance and explain how they form the whole.',
   'Use a locally appropriate, community-approved example from a named First Nations counting system. Follow the authorised explanation of its groupings; do not invent a universal counting system.'
  ]
  pattern=r'<p><strong>Learning connection:</strong>.*?</p>'
  it=iter(replacements)
  s=re.sub(pattern,lambda m:'<p><strong>Teaching example:</strong> '+next(it)+'</p>',s)
 p.write_text(s)
