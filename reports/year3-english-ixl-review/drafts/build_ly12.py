"""Original high-frequency recognition, contextual homophones and written spelling."""
import json
from pathlib import Path
items=[]
def base(b,q):
 n=sum(x['bank']==b for x in items)+1
 return dict(id=f'AC9E3LY12-{b[0].upper()}-{n:03d}',subject='english',year_level='Year 3',curriculum_code='AC9E3LY12',bank=b,skill='High-frequency words and homophones',question=q,audio_prompt=q,visual={'type':'none'},source={'creator':'SkillrHub original word context'})
def mc(b,q,c,w,why):
 x=base(b,q);p=sum(a['bank']==b and a.get('grading_mode')!='adult-review' for a in items)%4;o=w.split('~');o.insert(p,c);x.update(answers=[{'text':s,'is_correct':i==p} for i,s in enumerate(o)],correct_index=p,explanation={'summary':why,'hint':'Read the whole sentence and check what the missing word must mean.'});items.append(x)
def write(b,q,word,why):
 x=base(b,q+' Supply the missing word.');model=word+'. '+why
 x.update(grading_mode='adult-review',answers=[],correct_index=None,model_answer=model,acceptance_note='Check the actual written target: '+word+'. Accept upper- or lower-case letters unless a capital is needed to begin a supplied sentence. Require the whole correct spelling, including any apostrophe. '+why+' If another word fits the sentence, use the additional clue to discuss the intended word before checking its spelling. A copied model is practice, not independent spelling evidence.',response_instructions='Use the sentence and clue to work out the word. Record your response using the box or paper. View the example only after finishing. An adult checks correct spelling and meaning.',completion_label='My spelling response is ready for an adult to check.',explanation={'summary':model,'hint':'Think of the word first, then check its letters. Same-sounding words can have different meanings.'});items.append(x)
mc('practice','Which word correctly completes this invitation? “Would you like to ___ to our picnic?”','come','cum~comm~coom','Come is the standard spelling. Its o does not have the long vowel sound in home.')
mc('practice','The children hung up ___ coats. Which word shows that the coats belong to them?','their',"there~they're~theirs",'Their comes before coats to show belonging. There indicates a place; they’re means they are; theirs is not used before a noun here.')
mc('practice','Choose the missing word: “Put the books over ___, beside the window.”','there',"their~they're~theirs",'There points to the place where the books should go.')
mc('practice','Complete the sentence with the contraction for “they are”: “___ making a model.”',"They're","Their~There~Theirs",'They’re uses an apostrophe to replace the missing a in they are.')
mc('practice','Which spelling completes “We found ___ shells on the sand”? The number is one more than one.','two','too~to~tow','Two is the number. To and too have other uses; tow means pull along.')
mc('practice','“I want a turn, ___,” said Lily. Which word means also?','too','to~two~tow','Too can mean also. It has two o letters.')
mc('practice','Which spelling completes “I ___ the answer yesterday”? The word means already had the knowledge.','knew','new~know~now','Knew is the past form of know. New means not old.')
mc('practice','Select the correct spelling: “The ___ class worked together.” Use the word meaning all of it.','whole','hole~whol~hoal','Whole means all or complete. Hole means an opening.')
mc('practice','Complete the note: “Your bag is ___ the table.” Choose the correctly spelt word meaning lower than.','under','undar~undder~undur','Under is spelt u-n-d-e-r. Its unstressed final syllable retains er.')
mc('practice','Which word is spelt correctly in “I ___ if the parcel has arrived”?','wonder','wunder~wondar~wondder','Wonder is the standard spelling; keep o in the first syllable and er at the end.')
mc('practice','Choose the correctly spelt word: “The gate is ___, so we can go in.”','open','opun~oppen~openn','Open has one p and ends en. The first syllable has a long o sound.')
mc('practice','Complete “We will leave ___ lunch.” Choose the correctly spelt word meaning later than.','after','aftar~affter~aftur','After has one f and ends er.')
P='''“Please ___ here until the bell rings.” Use the four-letter word meaning remain in this place, beginning st.|stay|Stay ends ay. The sentence asks someone to remain, not to go away.
“___ you help me carry this?” Use the five-letter polite request word beginning c and ending ld.|could|Could keeps ou and silent l before d. Do not replace the middle with a spelling based only on its sound.
“I ___ like a turn when you finish.” Use the five-letter polite request word beginning w and ending ld.|would|Would contains ou and silent l; keep the ending ld.
“You ___ check the door before leaving.” Use the six-letter word beginning sh that gives advice.|should|Should begins sh and keeps ou and silent l before d.
“Can I have ___ slice?” Use the seven-letter word meaning one more, beginning an.|another|Another is one word and contains th. Check all its syllables and letters rather than omitting any.
“___ child brought a hat.” Use the five-letter word meaning all the children, considered one at a time, beginning ev.|every|Every is spelt with one e after v; do not insert an extra syllable into the spelling.
“I ___ put on my seatbelt before the car moves.” Use the six-letter word meaning at all times, beginning al.|always|Always contains al and ends ways. Retain both a letters.
“The box is ___ enough for both toys.” Use the five-letter word meaning very big, beginning l.|large|Large ends ge. The final e belongs in the spelling.
“A few ___ came to watch the play.” Use the six-letter word meaning persons, beginning pe.|people|People keeps eo and ends ple; the full spelling is not predictable from a simple one-letter-per-sound approach.
“The red bag is mine. Is the blue one ___?” Use the five-letter word meaning belonging to you, beginning y.|yours|Yours is written without an apostrophe when it shows ownership in this sentence.
“Please put the plate ___ the cup.” Use the six-letter word meaning next to, beginning be and ending de.|beside|Beside is one word, ending side. It means next to in this sentence.
“Wash your hands ___ lunch.” Use the six-letter word meaning earlier than, beginning be.|before|Before begins be and ends fore. Check both parts in the whole spelling.
“I could not ___ the bell over the loud music.” Use the four-letter word for noticing sound, beginning h.|hear|Hear names listening or noticing sound. Here names a place.
“Come and sit ___ next to me.” Use the four-letter place word that sounds like the word for noticing sound.|here|Here indicates a place. Hear is the sound-related word.
“The gardener planted a ___ beside the path.” Use the four-letter word for a woody plant with a trunk, beginning tr.|tree|Tree keeps the tr blend and ends ee.
“The water was ___ after standing in the sun.” Use the four-letter word meaning gently hot, beginning w.|warm|Warm keeps ar. Say it naturally in your accent; its spelling stays the same.
“We found the ball ___ the chair.” Use the six-letter word meaning at its back, beginning be.|behind|Behind begins be and ends hind. Both parts are needed in the spelling.
“The ___ week begins tomorrow.” Use the four-letter word meaning the one coming immediately after this, beginning n.|next|Next keeps x and ends t. Do not omit the last consonant.
“The balloon floated ___ the roof.” Use the five-letter word meaning higher than, beginning a.|above|Above ends ve, and its middle vowel is written o.
“The two socks are the ___.” Use the four-letter word meaning not different, beginning s.|same|Same uses a-consonant-e; final e is needed in this spelling.
“We had to ___ at the red light.” Use the four-letter word meaning cease moving, beginning st.|stop|Stop keeps the st blend and a single final p.
“The sun shone ___ the clouds.” Use the seven-letter word meaning from one side to the other, beginning th.|through|Through begins th and ends ough. The ending represents the vowel sound in this word; gh is not pronounced separately.
“Please ___ the door gently.” Use the five-letter verb meaning shut, beginning c and ending se.|close|Close ends se. In this verb its last sound is voiced, like the last sound in nose.
“We ___ our lunches in the shade.” Use the three-letter past-tense word for eating that often sounds like the number after seven.|ate|Ate is the past form of eat. Eight is the number.
“The ___ was calm beside the beach.” Use the three-letter word for a large area of salt water, beginning s, that sounds like the verb for using your eyes.|sea|Sea refers to salt water. See refers to looking or noticing with your eyes.
“I can ___ the rainbow now.” Use the three-letter seeing word that sounds like the place where ocean waves roll.|see|See ends ee. Sea is the water-place spelling.
“I have ___ apples and one pear.” Use the number word for 4.|four|Four is the number. For has other uses and is not the number spelling.
“___ a red ribbon around the box.” Use the three-letter verb meaning fasten with a knot, beginning t.|tie|Tie ends ie. Do not reverse those vowel letters.
“The puppy hurt ___ paw.” Use the three-letter word meaning belonging to it.|its|Its shows belonging and has no apostrophe. It’s means it is or it has.
“___ time to go home.” Use the four-character contraction meaning it is.|It's|It’s needs the apostrophe for the missing letter in it is. Use a capital at the start of this sentence; straight or curly apostrophes are acceptable.
“Please ___ your name at the top.” Use the five-letter verb meaning put words on paper, beginning wr.|write|Write starts wr with silent w. Right has a different meaning.
“Turn ___ at the corner, not left.” Use the five-letter direction word that sounds like the verb for putting words on paper.|right|Right is the direction. Write is the writing verb; right contains igh.
“Kim ___ the ball to the bowler.” Use the five-letter past-tense throwing word that sounds like through.|threw|Threw ends ew and is the past form of throw. Through has a different spelling and meaning.
“The bird has a long ___.” Use the four-letter body-part word that sounds like a word meaning a story.|tail|Tail is the body part. Tale means a story.
“Tell us a fairy ___.” Use the four-letter word meaning a story that sounds like an animal’s rear body part.|tale|Tale means a story and uses a-consonant-e. Tail is the body-part spelling.
“The window is made of ___.” Use the five-letter material name beginning gl and ending ss.|glass|Glass has double s at the end. The spelling stays the same across accent differences.'''
for row in P.splitlines():write('practice',*row.split('|'))
mc('test','Complete “We bought fresh ___ for the sandwiches.” Choose the correctly spelt food word.','bread','bred~bredd~breade','Bread is the food, with ea. Bred is the past form of breed.')
mc('test','“___ going to rain,” said Dad. Which contraction means it is?',"It's","Its~Its'~It",'It’s means it is here. Its without an apostrophe shows belonging.')
mc('test','Which word completes “I have ___ finished my puzzle; may I start another?”','already','allready~alredy~allredy','Already means before now or by now. It has one l and keeps ready as its final letters.')
mc('test','Complete “Mum ___ the story aloud last night.” Choose the past-tense reading word, not a colour.','read','red~reed~readd','Read is the past-tense reading word; it sounds like red here but keeps the spelling read.')
T='''“The card is ___ our whole class.” Use the four-letter word showing who sent it, beginning f.|from|From keeps o in the middle and ends m.
“The puppy came ___ the room.” Use the four-letter word meaning to the inside, beginning in.|into|Into is one word in this sentence. It ends to.
“We ___ ready when the bus arrived.” Use the four-letter past-tense word beginning w that goes with we, rather than was.|were|Were is the past-tense form used with we here. It ends ere; do not spell it only as it sounds.
“___ is the bus coming?” Use the four-letter question word asking at what time, beginning wh.|when|When begins wh and ends en. Preserve wh regardless of accent.
“We stayed home ___ it was raining.” Use the seven-letter word introducing the reason, beginning be.|because|Because contains cause after be. Check the middle au and the ending se.
“Can you ___ me the way?” Use the four-letter verb meaning let me see, beginning sh.|show|Show starts sh and ends ow for the vowel sound in this word.
“The ___ of shoes cost ten dollars.” Use the four-letter word meaning a matching set of two that sounds like the name of a fruit.|pair|Pair is a set of two and uses ai. Pear is the fruit.
“Jo packed a ripe ___ for lunch.” Use the four-letter fruit name that sounds like a set of two.|pear|Pear is the fruit and uses ea. Pair means a set of two.
“The washing blew in the ___.” Use the three-letter word for the mixture around us that we breathe, beginning a.|air|Air is spelt a-i-r. It is not the same spelling as heir, a person who inherits.
“We will ___ some milk at the shop.” Use the three-letter word meaning purchase that sounds like a farewell.|buy|Buy means purchase. Bye is a farewell and by has other uses.
“Say ___ before you leave.” Use the three-letter short farewell that sounds like the verb meaning purchase.|bye|Bye is the short farewell, with final e. Buy means purchase.
“The ___ shell was empty.” Use the three-letter word meaning a single shell that sounds like the past tense of win.|one|One is the number. Won is the past form of win.'''
for row in T.splitlines():write('test',*row.split('|'))
assert len(items)==64,len(items)
assert sum(x['bank']=='practice' for x in items)==48
Path(__file__).with_name('ac9e3ly12.json').write_text(json.dumps(items,ensure_ascii=False,indent=2)+'\n')
print('LY12: 64 tasks (16 MCQ, 48 written responses).')
