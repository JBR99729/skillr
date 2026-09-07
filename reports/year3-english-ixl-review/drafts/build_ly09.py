"""Original multisyllabic decoding and spelling applications, not a dictation test."""
import json
from pathlib import Path
items=[]
def base(b,q):
 n=sum(x['bank']==b for x in items)+1
 return dict(id=f'AC9E3LY09-{b[0].upper()}-{n:03d}',subject='english',year_level='Year 3',curriculum_code='AC9E3LY09',bank=b,skill='Read and write multisyllabic words',question=q,audio_prompt=q,visual={'type':'none'})
def mc(b,q,c,w,why):
 x=base(b,q);p=sum(a['bank']==b and a.get('grading_mode')!='adult-review' for a in items)%4;o=w.split('~');o.insert(p,c);x.update(answers=[{'text':s,'is_correct':j==p} for j,s in enumerate(o)],correct_index=p,explanation={'summary':why,'hint':'Look through every part of the word, then blend the parts and check the meaning.'});items.append(x)
rows='''practice|A reader says rabbit as rab-it, then joins the parts. Which is the conventional spelling of the animal?|rabbit|rabit~rabbet~rabbt|Rabbit has two b letters and two spoken syllables; keep all its letters when writing.
practice|The word sunset joins sun and set. Which instruction helps read the whole word?|Blend sun and set without losing the n or the s.|Read only sun.~Change set to seat.~Add another vowel between the parts.|The two familiar parts join as sunset; the consonants at their boundary both remain.
practice|A child writes the word for a small horse as ponee. Which conventional spelling should replace it?|pony|ponny~poneyy~poni|Pony ends in y for the final vowel sound; the first syllable has a long o sound.
practice|Which spelling completes the sentence: We ate our lunch at the picnic ___?|table|tabel~tabble~tabl|Table ends in the consonant-l-e pattern ble; its first vowel is long.
practice|The word bedroom is printed on a door. A learner reads only bed. What should happen next?|Read the remaining part, room, then blend bedroom.|Remove the d.~Change bed to bad.~Add an s after room.|Bedroom contains bed and room. The reader must include both parts, then blend the whole word.
practice|Which pair of written chunks joins exactly to make window?|win + dow|wind + owf~wi + ndo~win + doo|Win and dow retain every letter in window in order; the final ow has a long o sound here.
practice|The printed word is basket, but a reader says bas. What is missing?|The second syllable, ket.|An extra first syllable.~A silent word after basket.~A plural s at the end.|Basket has two syllables; stopping after bas leaves out ket.
practice|Which word has three spoken syllables when said normally?|banana|boat~milk~green|Banana has three spoken vowel beats. The other choices each have one.
practice|Choose the spelling that keeps the two parts rain and coat.|raincoat|rancoat~raincot~raincoot|Raincoat combines rain and coat; ai and oa remain in their original parts.
practice|A reader sees napkin but says pumpkin. Which response follows the printed letters?|Read nap, then kin, and blend napkin.|Keep pumpkin because it is a familiar word.~Ignore the first three letters.~Replace the printed word with a food name.|The print begins nap, not pump. Read the actual chunks before checking meaning.
practice|Which spelling fits: A ___ is a small stone.|pebble|peble~pebbel~pebbl|Pebble has double b and the final ble pattern; its first vowel is short.
practice|Which word keeps both printed parts correctly: green + house?|greenhouse|grenhouse~greenhous~greenhowse|Greenhouse retains green and house. The ee belongs to green; house keeps ou.
test|Which spelling joins the parts tooth and brush correctly?|toothbrush|toothbrsh~tothbrush~toothbush|Toothbrush keeps every letter in tooth and brush, including r in brush.
test|The printed word is kitten. A reader says kit and stops. What should happen next?|Read ten and blend both syllables.|Add the word cat.~Change the first vowel to a.~Ignore the last three letters.|Kitten has two syllables, kit and ten; the reader needs the whole word.
test|Which spelling fits: The ___ gently rocked on the water.|canoe|cano~cannoo~canew|Canoe has two spoken syllables and ends in oe in its conventional spelling.
test|Which pair of chunks joins exactly to make thunder?|thun + der|tun + der~thun + dar~thum + der|Thun and der keep the th, n and final er in thunder.'''
for row in rows.splitlines():mc(*row.split('|'))
def perform(b,words,context,focus,model):
 q=f'{context}\n\nWord work: {words}. Read the words aloud to an adult. {focus} Then write a new sentence using both words. Read your sentence aloud and check the spelling of both words against the printed words.'
 x=base(b,q);x.update(grading_mode='adult-review',answers=[],correct_index=None,model_answer=model,acceptance_note='Hear the learner blend and read both whole words, and view the written sentence. Check that every word part is retained and both spellings are correct after checking. This is supported reading-and-writing practice, not unseen dictation. Accept sensible different sentences and natural accent differences. Give time to segment and reblend; do not impose a speed score.',response_instructions='Say the parts, blend each whole word, and write your own sentence on paper. An adult checks your reading and writing. You may record the sentence or the adult’s notes here.',completion_label='I have read and written; an adult still needs to check.',explanation={'summary':model,'hint':'Try a syllable or familiar letter group at a time. Rejoin the parts without adding or dropping sounds.'});items.append(x)
practice='''robin, rocket|A robin landed near a toy rocket.|Say the two syllables in each word before blending.|Hear rob-in and rock-et as whole words. Both target spellings must appear in a meaningful sentence.
tulip, music|A tulip stood beside the music room.|Listen for the long first vowel in each word.|Check two-syllable reading of tulip and music, then written tu-lip and mu-sic parts in order.
paper, tiger|A paper tiger decorated the wall.|Say the first vowel clearly, then finish each word.|Hear pa-per and ti-ger, then check the complete spellings in the learner’s sentence.
lemon, melon|A lemon and a melon were on the bench.|Compare the beginning and ending of these similar words.|The order of letters differs: lemon is not melon. Check both reading and written order.
magnet, plastic|A magnet stuck to metal but not to plastic.|Tap the two spoken syllables in each word.|Hear mag-net and plas-tic, retaining the consonant group in plastic; check both spellings.
bubble, little|A little bubble floated above the cup.|Look closely at the final consonant-l-e letters.|Check bubble and little, including double consonants and final le; accept varied sensible sentences.
puddle, middle|A puddle formed in the middle of the path.|Say the final syllable, then notice how it is written.|Hear both whole words and check dd in puddle and middle, followed by le.
candle, handle|A candle stood beside a drawer handle.|Blend the first part with the final consonant-l-e part.|Check can-dle and han-dle without dropping d; writing keeps dle in both words.
jungle, bundle|The story’s explorer carried a bundle through the jungle.|Pay attention to the consonants before final le.|Hear both whole words naturally; check the different written groups ngl in jungle and ndl in bundle.
needle, beetle|A picture showed a needle beside a beetle.|Find the ee group before reading each whole word.|Hear the long ee vowel and final syllable in both words; check needle and beetle spellings.
playground, sailboat|Our model playground had a tiny sailboat.|Read each familiar part, then join the parts.|Check play-ground and sail-boat, retaining ay, ou, ai and oa in writing.
moonlight, teaspoon|Moonlight fell across a teaspoon on the table.|Locate the two vowel groups in each word.|Hear moon-light and tea-spoon; check oo/igh and ea/oo in the sentence.
snowflake, rainbow|The painting showed a snowflake below a rainbow.|Read each compound as one whole word after saying its parts.|Check snow-flake and rain-bow, keeping ow, silent e and ai patterns.
weekend, seaweed|At the weekend, we drew seaweed beside the beach.|Notice the shared long vowel sound with different spellings.|Hear week-end and sea-weed; check ee in weekend and ea plus ee in seaweed.
waiting, painting|The children were waiting while the painting dried.|Find ai and then read the ending.|Hear wait-ing and paint-ing, retaining t and nt before ing; check complete written forms.
shouting, counting|The story mentions shouting during a counting game.|Keep the ou group together before adding the ending aloud.|Hear shout-ing and count-ing with all consonants; check ou in both spellings.
spider, silent|A silent spider crossed the page of the storybook.|Say each first syllable with its long vowel.|Hear spi-der and si-lent, then check complete spellings and meaningful use.
pilot, hotel|The pilot stayed at a hotel in the story.|Notice that the stronger beat falls in different places.|Hear both words naturally; accept accent variation, while retaining both syllables and conventional spelling.
finish, visit|Please finish the card before our visit.|Blend short-vowel syllables without changing their order.|Check fin-ish and vis-it and correct spelling in a new sentence.
velvet, helmet|A velvet bag held a toy helmet.|Listen for the two vowel beats and keep the final t.|Check vel-vet and hel-met, including l and m in their correct positions.
butterfly, basketball|A butterfly landed beside a basketball.|Say three syllables in each word, then blend smoothly.|Hear but-ter-fly and bas-ket-ball, then check all written parts.
pelican, hospital|The picture book had a pelican near an animal hospital.|Read the three syllables in order.|Check pel-i-can and hos-pi-tal without omissions; conventional full spelling matters.
animal, holiday|The animal story begins during a holiday.|Try three spoken parts, then say the words naturally.|Hear all syllables of animal and holiday; check letters after the first syllable carefully.
dinosaur, yesterday|Yesterday we built a dinosaur from blocks.|Keep every spoken part when you blend.|Hear the complete words with natural accent; check dinosaur and yesterday against print after writing.
remember, November|Remember to label the November page.|Say the middle syllable clearly in each word.|Check three-syllable whole-word reading and complete spellings, including capital N for the month.
umbrella, vanilla|An umbrella shaded the vanilla plant in a story.|Find the doubled consonant in each printed word.|Hear all three syllables; check ll in umbrella and vanilla in the written sentence.
triangle, rectangle|We drew a triangle beside a rectangle.|Read the ending angle as part of each whole word.|Hear tri-angle and rect-angle as whole words; check all letters rather than replacing the ending with angel.
together, tomorrow|We will work together tomorrow.|Read past the first syllable in both words.|Check complete three-syllable reading and together/tomorrow spelling, especially rr in tomorrow.
beautiful, colourful|The class made a beautiful, colourful mural.|Look closely at the vowel letters and the final ful.|Hear whole words naturally; check beautiful and Australian colourful, with one l in ful.
cucumber, computer|A computer picture showed a cucumber growing.|Compare the middle letters before reading these similar-looking words.|Check cu-cum-ber and com-pu-ter, not substitution of one word for the other; view both written spellings.
adventure, important|An important clue began the adventure.|Blend the consonant groups and finish each word.|Hear ad-ven-ture and im-por-tant with all parts; spelling must match the separate words.
telephone, microphone|A telephone and a microphone were on the desk.|Find ph and say its sound in each word.|Hear ph as f in both whole words; check telephone and microphone spellings.
seashore, sunshine|Sunshine lit the seashore.|Keep sh together as you blend the word parts.|Check sea-shore and sun-shine with sh retained and correct vowel patterns.
children, chicken|The children watched a chicken in the yard.|Read beyond ch to distinguish the words.|Hear chil-dren and chick-en; check dr versus ck and all letters in writing.
mountain, fountain|A fountain stood below the painted mountain.|Say both parts and compare their first letters.|Check whole-word reading with natural final syllables; preserve mountain/fountain spelling.
market, carpet|A rolled carpet stood beside the market stall.|Notice the ar letters in each first syllable.|Hear mar-ket and car-pet; check final ket/pet difference and ar spelling.'''
for row in practice.splitlines():perform('practice',*row.split('|'))
test='''dolphin, cactus|A book page showed a dolphin beside a cactus drawing.|Say the syllables and explain which letters make the f sound.|Hear dol-phin and cac-tus; ph represents f in dolphin. Check both complete written spellings.
marble, purple|A purple marble rolled under the chair.|Look at each final consonant-l-e group.|Check mar-ble and pur-ple, including bl versus pl in reading and writing.
notebook, oatmeal|A notebook lay beside a bowl of oatmeal.|Blend the familiar parts, keeping their vowel spellings.|Hear note-book and oat-meal; check silent e, oo, oa and ea in the full words.
railway, thunderstorm|The story’s railway closed during a thunderstorm.|Read the compound parts and then the whole words.|Check rail-way and thun-der-storm without dropped consonants; view both spellings.
journey, chimney|The journey ended beside a cottage chimney.|Pay attention to each word’s first vowel spelling and final y.|Hear whole words naturally; check journey and chimney, including ney endings.
October, discover|In October, we hope to discover a new walking track.|Blend the three spoken syllables in order.|Check all syllables and letters, with capital O in October; accept a different meaningful sentence.
exercise, alphabet|The alphabet exercise used large cards.|Read the complete words without stopping after the first part.|Hear exercise and alphabet accurately; check x, ph and all remaining letters in writing.
Saturday, astronaut|On Saturday, we read about an astronaut.|Compare the three spoken parts in each word.|Hear both complete words and check Saturday/astronaut, including capital S and au in astronaut.
attic, tennis|A tennis bag was stored in the attic.|Find the double consonants before you blend.|Check at-tic and ten-nis and tt/nn in writing.
harbour, farmer|The farmer drove towards the harbour.|Read each word naturally in your accent.|Check two-syllable whole-word reading and Australian harbour spelling; no penalty for whether an accent pronounces r.
festival, visitor|A visitor arrived for the festival.|Read the three syllables, then say each word smoothly.|Check fes-ti-val and vis-i-tor in reading and complete conventional spelling.
package, message|A message was tucked inside the package.|Notice the different middle consonants and the shared ending.|Hear both complete words; check package versus message, including ck/ss and final age.'''
for row in test.splitlines():perform('test',*row.split('|'))
assert len(items)==64 and sum(x['bank']=='practice' for x in items)==48
Path(__file__).with_name('ac9e3ly09.json').write_text(json.dumps(items,ensure_ascii=False,indent=2)+'\n')
