"""Original LY11 spelling production and pattern discrimination, not dictation."""
import json
from pathlib import Path
items=[]
def base(b,q):
 n=sum(x['bank']==b for x in items)+1
 return dict(id=f'AC9E3LY11-{b[0].upper()}-{n:03d}',subject='english',year_level='Year 3',curriculum_code='AC9E3LY11',bank=b,skill='Less common spelling patterns',question=q,audio_prompt=q,visual={'type':'none'},source={'creator':'SkillrHub original spelling task'})
def mc(b,q,c,w,why):
 x=base(b,q);p=sum(a['bank']==b and a.get('grading_mode')!='adult-review' for a in items)%4;o=w.split('~');o.insert(p,c);x.update(answers=[{'text':s,'is_correct':i==p} for i,s in enumerate(o)],correct_index=p,explanation={'summary':why,'hint':'Match the spelling to the meaning and the sound or letter pattern.'});items.append(x)
def write(b,q,word,why):
 x=base(b,q+' Supply the complete missing word, then underline or name the spelling part that needs care.');model=word+'. '+why
 x.update(grading_mode='adult-review',answers=[],correct_index=None,model_answer=model,acceptance_note='Check the learner’s written word: '+word+'. Accept upper- or lower-case letters. Require the correct whole spelling and identification of a relevant letter pattern; the pattern explanation need not use technical terms. '+why+' If the learner gives a different sensible word, discuss the clue before asking for this target; do not treat vocabulary uncertainty as proof of a spelling error.',response_instructions='Work out the word from the sentence and clue. Write it here or on paper before viewing the example. An adult checks the actual spelling and the letter pattern you noticed.',completion_label='My spelling and pattern response are ready for an adult to check.',explanation={'summary':model,'hint':'Say the word you have worked out, think about its sounds, and check any unusual letters.'});items.append(x)
mc('practice','A spelling note says: in the word phone, two letters together represent the first sound. Which note is accurate?','ph represents the /f/ sound.','p and h each make a separate sound.~one represents the /f/ sound.~The word starts with a /p/ sound.','In phone, ph spells the first sound /f/. The letters work together.')
mc('practice','Complete the label for a small rough drawing: a quick ___.','sketch','skech~skettsh~sketsh','Sketch ends in tch, a spelling of the /ch/ sound.')
mc('practice','Which word uses gh without a spoken /g/ or /h/ sound?','bright','ghost~goat~hat','In bright, igh spells the long i sound; gh is not pronounced separately. In ghost, g is pronounced.')
mc('practice','A learner writes “nife” for the sharp tool used to cut food. Which correctly spelt correction restores the silent initial letter?','knife','kniffe~nif~nifee','Knife begins with kn. The k is silent; the first spoken sound is /n/.')
mc('practice','Choose the correct spelling: We watched a baby ___ climb a branch. The word names an animal with a long tail.','monkey','munkee~monkee~munkey','Monkey ends in ey, which represents the final sound heard in happy. The whole spelling is monkey.')
mc('practice','In the word bridge, which letters spell the final /j/ sound?','dge','br~i~gei','The ending dge represents the /j/ sound in bridge.')
mc('practice','A young sheep is a ___. Choose the spelling that retains its silent final letter.','lamb','lam~lamn~lamm','Lamb has a silent b after m. There is no separate /b/ sound at the end.')
mc('practice','Which spelling correctly completes “The bird has a soft ___”? The word means one of the light parts covering a bird.','feather','feether~fether~feathar','Feather uses ea for the short vowel sound heard in bed. Do not assume ea always has the same sound.')
mc('practice','The word wheel begins with which written letter pair?','wh','hw~ww~hh','Wheel begins wh. Keep both letters in spelling; speakers may pronounce wh differently.')
mc('practice','Choose the correctly spelt word for the room where food is prepared.','kitchen','kichen~kitchin~kitshen','Kitchen retains tch in the middle and en at the end. Saying its two syllables can support checking.')
mc('practice','Which pair shows that the same written vowel team can have different sounds?','bread and bead','seed and need~rain and train~boat and coat','Bread has the vowel sound in bed; bead has the vowel sound in see. Both contain ea.')
mc('practice','Complete the note: The dog buried a bone in the ___. Use the word that rhymes with boil.','soil','soyl~soile~soll','Soil uses oi to represent the vowel sound also heard in boil.')
P='''A ___ tells you that someone has asked something and wants an answer. It begins qu and ends with the same letters as action.|question|In question, qu is retained and the ending is tion; do not replace the whole ending with shun.
Mum tied the parcel with brown paper and string, making a neat ___ on top. The missing word rhymes with not and begins with a silent letter.|knot|Knot begins kn: k is silent and n represents the first spoken sound.
Please ___ the towel tightly to squeeze out the water. The word rhymes with ring and begins with a silent letter.|wring|Wring begins wr; w is silent and r represents the first spoken sound.
A repairer used a ___ to turn the nut. Use the six-letter tool name beginning wr.|wrench|Wrench keeps the silent w in wr and ends in ch.
The brave rider in armour was a ___. Use the word that sounds like night but names a person.|knight|Knight begins with silent k; igh represents the long i sound and t the final sound.
A small garden creature carries a shell on its back. It is a ___. The vowel sound is the same as in rain.|snail|Snail uses ai for the long a sound and retains the initial sn blend.
In the story, a ___ floated through the wall. Use the five-letter word beginning gh.|ghost|Ghost begins gh, but the initial spoken sound is /g/; h is silent in this word.
A performer was dressed as a ___. The circus character had a red nose and enormous shoes. Use the word that rhymes with town.|clown|Clown uses ow for the vowel sound heard in town; ow does not always have the sound in snow.
The bottle holds enough water for the ___. Fill the gap with the word for a long trip that begins j and ends ey.|journey|Journey ends ey; its first syllable keeps our. Check both parts instead of spelling only by sound.
We saw an ___ use its long trunk to lift food. The animal name contains ph.|elephant|Elephant uses ph for /f/. Check the middle ph as well as the beginning ele and ending ant.
A ___ rested on the fence and flashed its black-and-white feathers. The Australian bird’s name ends in pie.|magpie|Magpie contains ie for the long i sound in its second part; retain the g before p.
The end of my finger is near my ___. Write the name of the short thick digit beside the fingers. It has a silent final letter.|thumb|Thumb begins th and ends mb with a silent b.
The story's soldier carried a ___. Use the five-letter weapon name beginning sw; its w is silent.|sword|Sword retains w even though it is not pronounced separately.
The beekeeper poured sweet ___ from the hive into a jar. Use the substance whose name begins h and ends ey.|honey|Honey ends ey and keeps o in the first syllable; the o does not have the vowel sound in hot.
Dad put a ___ over the hole in the sleeve. The word rhymes with match and begins p.|patch|Patch uses tch for the final /ch/ sound after its short vowel.
After summer comes ___. Use the six-letter season name ending mn.|autumn|Autumn ends mn, with a silent n after m.
In a car, the ___ turns to help it move. Use the round part’s five-letter name beginning wh.|wheel|Wheel begins wh and contains ee. Preserve wh in spelling regardless of the speaker's pronunciation.
Use the seven-letter word for a two-wheeled vehicle with pedals: ___. Its opening letters are bi.|bicycle|Bicycle keeps c in both cycle positions; the first c in cycle represents /s/ and the second /k/.
The new puppy was very ___. Use the word for lively happiness that begins ch and ends ful.|cheerful|Cheerful begins ch, contains eer and ends ful with one l.
The baker measured the ___ for the dough. Use the ingredient that sounds like flower but is ground grain.|flour|Flour and flower sound alike for many speakers but flour is the ingredient, with our.
Grandad sat on a garden ___. Use the five-letter seat name ending nch.|bench|Bench ends nch: n is followed by ch for /ch/.
The children walked past a ___ with a pointed roof and a bell. Use the six-letter building name with ch at both ends.|church|Church retains ch at the beginning and end and ur in the middle.
The dog followed a strong ___. Use the five-letter word meaning smell that begins sc.|scent|Scent begins sc, pronounced /s/ here; keep c even though it adds no separate spoken sound.
We took a ___ of the group with a camera. Use the short five-letter word beginning ph.|photo|Photo begins ph for /f/ and ends o. It is the common shortened form of photograph.
The swimmer stood on the ___ before diving into the pool. Use the word that rhymes with hedge and begins with a vowel.|edge|Edge ends dge for /j/ after the short e sound.
A tiny ___ was curled inside the seed. Use the five-letter word naming a young plant that begins s and ends t.|shoot|Shoot uses oo for its long vowel sound and sh for its first sound.
Please take the ___ loaf, not just a slice. Use the five-letter word that means all of it and sounds like hole.|whole|Whole starts wh with silent w and retains final e.
The stage show made us ___ loudly. Use the five-letter verb beginning l that means make a happy ha-ha sound.|laugh|Laugh ends gh, which represents /f/ in this word; it does not have the same job as gh in night.
A ___ is the part of your leg between your thigh and your lower leg. The four-letter word begins with a silent k.|knee|Knee begins kn with silent k, followed by ee for the vowel sound.
The sign shows an arrow pointing ___. Use the opposite of left, a five-letter word ending ght.|right|Right contains igh for the long i sound; gh is not pronounced separately.
The shop’s opening was marked by a long ___ tied across the doorway. Use the six-letter word beginning rib.|ribbon|Ribbon has double b and ends on; spelling both syllables helps preserve the unstressed ending.
A storm flashed and the sudden ___ lit the clouds. Use the five-letter noun beginning l and ending ght.|light|Light contains igh and final t. The gh has no separate /g/ or /h/ sound.
Maya fastened her coat with a ___. Use the six-letter object name beginning but.|button|Button keeps double t and the ending on even when the final vowel is weak in speech.
A watch can be worn around your ___. Use the five-letter body-part name starting wr.|wrist|Wrist starts wr with silent w and ends in the st consonant cluster.
A flower can have a sweet ___. Use the five-letter Australian spelling of a word meaning smell that begins o.|odour|Odour uses the Australian ending our. Odor is a different regional spelling, so practise odour for this task.
The sticky ___ held the envelope shut. Use the four-letter word beginning gl and ending in two vowel letters.|glue|Glue ends ue for the vowel sound; it does not end oo.'''
for row in P.splitlines():write('practice',*row.split('|'))
mc('test','A spelling correction changes “ritten” to “written”. What does the added first letter do?','It restores silent w in wr.','It adds a separate /w/ sound.~It changes the first vowel to a long sound.~It makes the word plural.','Written starts wr with silent w. The correction restores its spelling without adding a separate sound.')
mc('test','Select the correct spelling for a small white mark left after a cut has healed.','scar','skar~scarrh~skare','Scar begins sc, representing the /s/ and /k/ sounds in this word. It does not need an extra final e.')
mc('test','Choose the correct spelling for a person who repairs leaking pipes.','plumber','plumer~plummer~plumbr','Plumber retains silent b after m and ends er.')
mc('test','Which word ends with letters that spell /f/, rather than a separately spoken /g/ and /h/?','cough','high~sigh~though','Cough ends gh pronounced /f/. The other words do not have a final /f/ sound.')
T='''The child gave a ___ when the long wait was over. Use the four-letter noun that rhymes with my and means a long outward breath.|sigh|Sigh ends igh for the long i sound; gh is not pronounced separately.
The sheep’s thick ___ kept it warm. Use the six-letter noun beginning f.|fleece|Fleece uses ee for the vowel sound and ce for final /s/.
The kite reached a great ___. Use the six-letter noun meaning how high something is.|height|Height retains eigh before t. In this word the vowel sound is long i, unlike the sound in eight.
We carried the little boat across the ___ to the sea. Use the five-letter place name for sandy land beside the sea, beginning b and ending ch.|beach|Beach uses ea for the long e sound and ch for its final consonant sound.
The parcel was not light; it was ___. Use the five-letter word beginning h and ending y.|heavy|Heavy uses ea for the vowel sound heard in bed and final y for the ending sound.
A small sailing boat is a ___. Use the five-letter boat name starting y.|yacht|Yacht retains ch even though those letters have no separate sound in this word.
A little garden ornament with a pointed hat is a ___. Use the five-letter name that begins with a silent letter.|gnome|Gnome starts gn with silent g; its o-consonant-e pattern supports the long o sound.
Mia heard a ___ at the door: tap, tap. Use the five-letter word that begins with a silent letter.|knock|Knock begins kn with silent k and ends ck for /k/.
We could see our faces in the ___. Use the six-letter object name beginning mir.|mirror|Mirror keeps double r in the middle and or at the end; the final vowel may be weak in speech.
The team earned a ___ for winning the final. Use the six-letter award name beginning tr and ending y.|trophy|Trophy uses ph for /f/ and final y for its ending vowel sound.
A careful gardener removed a sharp ___ from the rose stem. Use the five-letter word that rhymes with born.|thorn|Thorn begins th and keeps or before n. Do not add a separate vowel between th and the rest.
The teacher used white ___ on the blackboard. Use the five-letter writing material beginning ch.|chalk|Chalk starts ch and retains l before k even where no separate /l/ is heard.'''
for row in T.splitlines():write('test',*row.split('|'))
assert len(items)==64,len(items)
assert sum(x['bank']=='practice' for x in items)==48
Path(__file__).with_name('ac9e3ly11.json').write_text(json.dumps(items,ensure_ascii=False,indent=2)+'\n')
print('LY11: 64 tasks (16 MCQ, 48 written responses).')
