"""Scoped text review of Foundation English LA05–LA09."""
from pathlib import Path
from html import escape
from lxml import html
import json,re
R=Path(__file__).resolve().parents[1]
LESSONS={
'AC9EFLA05':[
('Meaning comes first','Adult: read “The wet dog” and “The wet dog shook.” Which tells a whole idea?','The second tells what the dog did. The first names the dog but leaves the intended idea unfinished. Adding a full stop alone does not supply the missing meaning.'),
('Same words, different event','Compare “The girl follows the duck.” and “The duck follows the girl.” Act out each sentence.','Both are complete sentences, but changing the word order changes who follows whom. Check meaning by pointing to the one doing the following.'),
('Short can be complete','Compare “Rain falls.” with “The very tall green tree”. Which is complete?','Rain falls is complete even though it is shorter. Sentence length does not decide completeness; the longer group still needs something said about the tree.'),
('Make and check','Finish “Our bus” with a whole idea. Ask a partner what your sentence tells.','For example, Our bus stopped at school. Accept another sensible completion. Support: offer two possible endings. Extend: change the event while keeping Our bus.')],
'AC9EFLA06':[
('Keep related words together','Read “The spotted dog carried a stick.” Which words name the dog? Which word tells its action?','The spotted dog names the animal; carried tells the action. Spotted describes dog. Use these everyday explanations without requiring formal grammar labels.'),
('Change a description','Change spotted to muddy in “The spotted dog carried a stick.” What changes? What stays the same?','The description of the dog changes. The animal still carries a stick. A describing word helps build the naming group rather than telling the action.'),
('Change a place group','Compare “My bag is beside the door.” and “My bag is under the table.”','My bag stays the same. Beside the door changes to under the table, so the location changes. Read each complete sentence to check that its groups work together.'),
('Build, then explain','Make a sentence about a bird. Include what it does and where. Point to the words doing each job.','For example, The bird rests in a tree. The bird names what it is about; rests tells what happens; in a tree tells where. Support: supply word cards. Extend: change one group and explain the new meaning.')],
'AC9EFLA07':[
('Use a real page','Choose an illustrated story page already available at home or school. Adult: cover the words and ask what the image shows; then read the words.','Record one visible detail and one detail stated in words. This activity needs the actual page: a written picture description alone cannot show how a child interprets an image.'),
('Find the evidence','On that story page, name something known from the words, something seen in the picture, and something both tell.','Accept answers supported by the selected page. Ask the child to point to each clue. A character name may come from words while clothing or position may come from the image; do not assume every page has all three kinds.'),
('Try an information page','Use an existing labelled photograph or diagram from an information book. Read the caption or labels, then ask what the image adds.','The image might show appearance, position or parts; words may name a part or give a fact not visible. Check the actual page rather than accepting a guessed fact.'),
('Check a guess','Ask: “Does this picture tell us the character’s name?” How could we check?','A picture of a person alone does not establish their name. Look for words or labels that name them. Support: compare two clear clues. Extend: explain how removing either words or image would change understanding.')],
'AC9EFLA08':[
('Choose a word in context','A cup can break easily. Would fragile or sturdy describe it? Explain.','Fragile means easily broken or damaged; sturdy means strong and solid. The clue can break easily supports fragile. Ask for another familiar example.'),
('Similar does not mean identical','Replace small in “We saw a small insect” with tiny. Is the main idea similar?','Both describe a small size, but tiny suggests very small. Words with similar meanings may add different detail; choose the word that fits what you mean.'),
('Give a topic word a job','In a pretend shop, use price in a question and receipt in a reply.','For example: What is the price of this apple? Here is your receipt. Explain that price tells the cost and a receipt records a purchase. Accept other meaningful exchanges.'),
('Use a new word again','Choose a word from today’s school topic or a personal interest. Explain it, give an example and use it in a new sentence.','Judge meaning and use, not spelling or word length. Support: offer a familiar object or two meanings to choose from. Extend: give an example where the word would not fit and explain why.')],
'AC9EFLA09':[
('Show the writing','Read “We met Ava.” Find the capital at the sentence beginning, the capital in the name and the ending mark.','W begins the sentence; A begins Ava’s name; the full stop ends the telling sentence. Ava needs its capital even though the name is not the first word.'),
('Repair the visible example','The writer means a telling sentence: “we saw ben”. Write it with the capitals and ending mark it needs.','We saw Ben. Change w to W, change b to B and add a full stop. Adult: let the learner point out the three repairs before writing if handwriting is a barrier.'),
('Letters and marks have different jobs','In “Is it Mia?” point to a capital letter and a punctuation mark. What does each do?','I begins the sentence, M begins a name, and the question mark ends the question. Capitals are letter forms; the question mark is not a letter used to spell a word.'),
('Choose for the message','Write “The dog is here” as a calm statement and “Where is the dog” as a question.','The dog is here. Where is the dog? Support: offer a full stop and question mark to choose from. Extend: explain why a new printed line does not automatically begin a new sentence.')]
}
EDITS={
'AC9EFLA05':{
0:{'answers':['The frog jumps.','The frog near the pond','The little green frog']},
3:{'answers':['A sentence must have two words.','It communicates a whole idea.','A full stop makes any words complete.']},
6:{'question':'Compare “The boy follows the dog.” and “The dog follows the boy.” Explain how changing the word order changes the idea.','answer':'In the first sentence the boy follows; in the second the dog follows, so the same words in a different order describe different events.','hint':'Name who does the following in each sentence.'}},
'AC9EFLA06':{
4:{'question':'Start with “My red hat is on the hook.” Keep “My red hat” and change the other words so the hat is in a new place.'},
6:{'question':'Change black to white in “The black cat slept.” Which word does white describe, and what stays the same?','answer':'White describes cat; the colour changes, but the cat still slept.','hint':'Compare what the cat looks like with what it does.'},
7:{'question':'A child groups “The playful kitten chased the ribbon” as “The playful” then “kitten chased” then “the ribbon”. Regroup it to keep who and what happened together.'}},
'AC9EFLA07':{
0:{'question':'Read the picture description below with the words “The puppy hid.” What extra detail does the described picture give?'},
3:{'question':'Words: “Frogs hatch from eggs.” Picture description: a labelled diagram shows eggs, a tadpole and an adult frog in order. What does this described diagram add?','answers':['Visible stages from egg to frog','Only the same words about eggs','The name of one particular frog']},
8:{'question':'With an adult, choose a real illustrated story page. Point to one detail shown in its picture and one detail told by its words. Explain how they help together.','answer':'Answers depend on the page; accept one accurately identified image detail, one text detail and an explanation of their combined meaning.','hint':'Cover and reveal the words while keeping the same picture visible.'}},
'AC9EFLA08':{
0:{'question':'A pumpkin is much bigger than all the others. Which word best describes its size?'},
3:{'answers':['stem','leaf','root']},
7:{'question':'“The seed is small.” Replace small with tiny. Explain whether the meaning is similar, then use tiny in a new sentence.','answer':'The meaning is similar, but tiny suggests very small; for example, A tiny ant crossed the path.','hint':'Describe the size in both versions before trying your own example.'}},
'AC9EFLA09':{
4:{'question':'The writer means a telling sentence: “we saw tom”. Rewrite it correctly and name the three changes.'},
5:{'matchLeft':['We found it (calm telling)','Where is Dad (asking)','Watch out (urgent warning)'],'answer':'We found it (calm telling) → full stop; Where is Dad (asking) → question mark; Watch out (urgent warning) → exclamation mark'},
6:{'answers':['It organises written meaning instead of helping spell a word.','It is a small lower-case letter.','It represents a sound in the word before it.']}}
}
for code,items in LESSONS.items():
 p=next((R/'foundation/english').glob(code.lower()+'*/index.html'));d=html.fromstring(p.read_text())
 # Remove exact repeated worked models, preserving the original model and elaborations.
 for article in d.xpath('//article[contains(@class,"curriculum-worked-example")]'):
  parent=article.getparent();earlier=' '.join(' '.join(x.itertext()) for x in list(parent)[:list(parent).index(article)])
  model=article.xpath('.//p[contains(.,"Model answer:")]')
  if (model and ' '.join(model[-1].itertext()).strip() in earlier) or ' '.join(' '.join(article.itertext()).split()) in ' '.join(earlier.split()):parent.remove(article)
 body=d.xpath('//main/div')[0]
 for old in body.xpath('./details[@data-language-review]'):body.remove(old)
 content=''.join('<article><h3>'+escape(h)+'</h3><p>'+escape(q)+'</p><details><summary>Answer and teaching guidance</summary><p>'+escape(a)+'</p></details></article>' for h,q,a in items)
 body.insert(3,html.fragment_fromstring('<details class="curriculum-topic-section" data-language-review="true"><summary><strong>Explain and apply</strong></summary><div class="curriculum-detail-body">'+content+'</div></details>'))
 p.write_text('<!DOCTYPE html>\n'+html.tostring(d,encoding='unicode',method='html')+'\n')
asset=R/'quiz/assets/foundation-english-la05-la09-review.js'
asset.write_text('''// Authored worksheet review; runs after the compatibility enhancer on these routes.
(() => {
 const edits = '''+json.dumps(EDITS,ensure_ascii=False)+''';
 for (const [code, changes] of Object.entries(edits)) {
  const unit = window.SkillrFoundationEnglishWorksheetData?.[code];
  if (!unit) continue;
  for (const [index, edit] of Object.entries(changes)) {
   const q = unit.questions[Number(index)];
   Object.assign(q, edit);
   q.summary = `Check the answer: ${q.alignment.method}.`;
  }
 }
})();
''')
# Capture the reviewed authored banks before the compatibility replacement, then restore
# only these banks before the worksheet renderer runs, as in the prior sound review.
balance=R/'quiz/assets/foundation-english-topic-module-balance-v2.js'
s=balance.read_text();marker='// Preserve authored LA05–LA09 worksheet banks for the scoped review.'
if marker in s:s=s[:s.index(marker)]
s+='\n'+marker+'\nwindow.SkillrFoundationEnglishLanguageReview = Object.fromEntries('+json.dumps(list(LESSONS))+'.map(code => [code, JSON.parse(JSON.stringify(window.SkillrFoundationEnglishWorksheetData[code]))]));\n'
balance.write_text(s)
for code in LESSONS:
 for p in (R/'quiz/grade-k/english'/code.lower()/'worksheet').glob('**/index.html'):
  s=p.read_text()
  s=re.sub(r'foundation-english-topic-module-balance-v2.js\?[^" ]+','foundation-english-topic-module-balance-v2.js?v=20260814-foundation-english-topic2&review=20260906-language',s)
  if 'foundation-english-la05-la09-review.js' not in s:
   pattern=r'(<script src="[^" ]*foundation-english-topic-module-balance-v2.js[^" ]*"></script>)'
   s,n=re.subn(pattern,r'\1<script>Object.assign(window.SkillrFoundationEnglishWorksheetData, window.SkillrFoundationEnglishLanguageReview);</script><script src="/quiz/assets/foundation-english-la05-la09-review.js?v=20260906"></script>',s)
   assert n==1,p
  p.write_text(s)
