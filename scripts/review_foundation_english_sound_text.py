"""Scoped Foundation English topic and worksheet review: LY09-LY11."""
from pathlib import Path
from html import escape
from lxml import html
import json,re
R=Path(__file__).resolve().parents[1]
LESSONS={
'AC9EFLY09':[
('Listen before looking at print','Adult: say the words naturally and repeat if needed. For rhyme, alliteration and syllables, assess what the child hears and says. Reading or spelling the words is not required.'),
('Find the word that does not rhyme','Adult: say “hat, sun, mat”. Which word does not rhyme with the other two? Say a new word that rhymes with hat.','Sun is the odd one out; hat and mat share their spoken ending. Cat or bat is a possible new rhyme. Accept another spoken rhyme in the child’s variety of English.'),
('Beginnings or endings?','Say “sun, sock” and “sun, run”. Which pair shares a beginning sound? Which pair rhymes?','Sun and sock share the beginning sound. Sun and run rhyme. Listen to the requested part of the word instead of treating any matching sound as rhyme.'),
('A beat is not a phoneme','Say “dog”. Clap its syllables, then slowly say its separate speech sounds. Are the counts the same?','Dog has one syllable and three speech sounds. One clap marks a syllable; three counters can represent the smaller sounds. Keep letter names out of this listening task.'),
('Ready to move on','Adult: ask for a rhyme for “hen”, a pair of words beginning like “moon”, and the syllables in “rabbit”.','For example, pen; moon and map; two beats in rabbit. Accept valid alternatives and natural pronunciation. Check each skill separately; reteach the one that needs support.')],
'AC9EFLY10':[
('Keep the task oral','Adult: say the target words and individual sounds; the child listens, speaks or moves counters. Use speech sounds rather than alphabet names, and avoid adding an extra “uh” to consonants.'),
('Words and syllables differ','Say “The rabbit hops.” Move one counter per word. Then clap the beats in rabbit. How do the tasks differ?','The sentence has three words; rabbit has two syllables. The counter task separates the sentence into words, while clapping separates one word into beats.'),
('Check the sound order','Adult: say the beginning sound of sun, the short vowel at the start of insect, then the beginning sound of top. Blend them. What happens if the final sound changes to the beginning of pig?','The sounds blend to sit. Replacing only the final sound makes sip. Keep the first and middle sounds in place.'),
('Add and remove a sound','Say “at”. Add the beginning sound of moon at the start. Now remove that sound again. What words do you say?','Adding the sound makes mat; removing it returns to at. Counters can show the added or removed sound without printed letters.'),
('Ready to move on','Adult: say “shop”. Ask for its separate sounds, then ask the child to change the final sound to the beginning of top.','Shop has three speech sounds: the initial sh sound, short o and p. Changing the final sound gives shot. Count sounds, not the four printed letters.')],
'AC9EFLY11':[
('See the letter, name it, then give a sound','Show the printed letter itself. Ask for its alphabet name separately from a common sound. Use familiar cue words and include both vowels and consonants; a letter can represent different sounds in different words.'),
('Match different-looking partners','Show B, d, D, b. Make two upper-case and lower-case pairs, then name each pair.','B pairs with b; D pairs with d. Each pair shares a letter identity and name even though the two forms look different.'),
('Check name versus sound','Show m. A child says “em” when asked for its common sound. What would answer the sound question?','Em is the letter name. The common sound is the humming sound at the beginning of moon. Model the two questions separately.'),
('Use a familiar name carefully','Show the name Sam. Name its first letter, find its other case form and give its common sound.','S, named ess, pairs with s and commonly represents the beginning sound of sun. Use the printed form rather than assuming every name follows the same sound pattern.'),
('Ready to move on','Show R, e and T. Find each case partner, name the letter and give the common sound using rabbit, egg and top as cues.','R/r: ar, rabbit beginning; E/e: ee, egg beginning; T/t: tee, top beginning. Accept the taught local letter-name pronunciation. Sample the rest of the alphabet over later sessions.')]
}
FIXES={'the short middle sound in apple':'the short vowel sound at the beginning of apple','the humming final sound in nest':'the humming sound at the beginning of nest','the short middle sound in insect':'the short vowel sound at the beginning of insect','the popping final sound in pig':'the popping sound at the beginning of pig','Insect middle':'Insect beginning'}
for code,items in LESSONS.items():
 p=next((R/'foundation/english').glob(code.lower()+'*/index.html'));s=p.read_text()
 for a,b in FIXES.items():s=s.replace(a,b)
 d=html.fromstring(s)
 # The authored model and its exact repeated steps are both present. Remove only repeated copies.
 for article in d.xpath('//article[contains(@class,"curriculum-worked-example")]'):
  parent=article.getparent();earlier=' '.join(' '.join(x.itertext()) for x in list(parent)[:list(parent).index(article)])
  model=article.xpath('.//p[contains(.,"Model answer:")]')
  if model and ' '.join(model[-1].itertext()).strip() in earlier:parent.remove(article)
 body=d.xpath('//main/div')[0]
 for old in body.xpath('./details[@data-sound-review]'):body.remove(old)
 content=''.join('<article><h3>'+escape(i[0])+'</h3><p>'+escape(i[1])+'</p>'+('<details><summary>Answer and teaching guidance</summary><p>'+escape(i[2])+'</p></details>' if len(i)>2 else '')+'</article>' for i in items)
 block=html.fragment_fromstring('<details class="curriculum-topic-section" data-sound-review="true"><summary><strong>Listen, explain and apply</strong></summary><div class="curriculum-detail-body">'+content+'</div></details>');body.insert(3,block)
 p.write_text('<!DOCTYPE html>\n'+html.tostring(d,encoding='unicode',method='html'))
EDITS={
'AC9EFLY09':{0:{'question':'Adult: say “hat, sun, mat”. Which word does not rhyme with the other two?','answers':['hat','mat','sun','They all rhyme'],'answer':'sun','hint':'Repeat the words aloud and compare their endings.'},2:{'question':'Adult: say “banana” naturally. How many syllables does the child hear?','hint':'Let the child clap the spoken beats before counting; do not supply the count first.'}},
'AC9EFLY10':{1:{'question':'Adult: say the beginning sounds of moon, apple and top separately. Ask the child to blend the sounds into a word.','hint':'Say the speech sounds in order, without adding an extra vowel to consonants.'},8:{'question':'Adult: say “The rabbit hops.” Count its words. Then say “shop” and count its speech sounds. Explain what each counter represents.','answer':'The sentence has three words. Shop has three speech sounds; the two letters sh represent one sound. The first task counts words and the second counts sounds within one word.','hint':'Keep both tasks oral; use a fresh set of counters for the second task.'}},
'AC9EFLY11':{0:{'question':'Match each upper-case letter to its lower-case partner. Say the letter names.','matchLeft':['A','D','G'],'matchRight':['g','a','d']},3:{'question':'Match each printed vowel to its short-sound cue word. Adult: name the cue words aloud.','matchLeft':['e','i','o']},7:{'question':'Pair these letters: B, d, D, g, G, b. Name each pair and explain why the letters belong together.'}}
}
marker='// Scoped English sound review: AC9EFLY09-11.'
p=R/'quiz/assets/foundation-english-topic-module-balance-v2.js';s=p.read_text()
if marker in s:s=s[:s.index(marker)]
s+='\n'+marker+'\n(() => { const edits='+json.dumps(EDITS,ensure_ascii=False)+'; const fixes='+json.dumps(FIXES)+';\n'+'''
 for(const code of ['AC9EFLY09','AC9EFLY10','AC9EFLY11']) {
  const unit=window.SkillrFoundationEnglishWorksheetData?.[code]; if(!unit)continue;
  unit.questions.forEach((q,i)=>{
   for(const key of ['question','answer','summary','hint'])if(typeof q[key]==='string')for(const [a,b] of Object.entries(fixes))q[key]=q[key].split(a).join(b);
   const edit=edits[code]?.[i];if(edit){Object.assign(q,edit);q.summary=`To check the answer, ${q.alignment.method}.`;}
  });
 }
 window.SkillrFoundationEnglishSoundReview = Object.fromEntries(['AC9EFLY09','AC9EFLY10','AC9EFLY11'].map(code => [code, JSON.parse(JSON.stringify(window.SkillrFoundationEnglishWorksheetData[code]))]));
 if (location.pathname.includes("/worksheet/")) document.write('<script>Object.assign(window.SkillrFoundationEnglishWorksheetData, window.SkillrFoundationEnglishSoundReview);<\\/script>');
})();
''';p.write_text(s)
for code in LESSONS:
 for p in (R/'quiz/grade-k/english'/code.lower()/'worksheet').glob('**/index.html'):
  s=p.read_text();s=re.sub(r'foundation-english-topic-module-balance-v2.js\?[^" ]+','foundation-english-topic-module-balance-v2.js?v=20260814-foundation-english-topic2&review=20260906-sounds',s);p.write_text(s)
