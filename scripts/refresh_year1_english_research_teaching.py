"""Scoped source-backed teaching supplement; preserve authored topics and resource links."""
from pathlib import Path
import json,re,html
ROOT=Path(__file__).resolve().parents[1]
units=json.loads((ROOT/'data/curriculum-units.json').read_text())['units']
data=json.loads((ROOT/'data/year1-english-research-teaching.json').read_text())
esc=html.escape
STYLE='<link rel="stylesheet" href="/assets/css/year1-english-research-teaching.css">'
START='<!-- skillr-research-teaching:start -->';END='<!-- skillr-research-teaching:end -->'
FIXES={
 'AC9E1LA01': [('Change the words, voice and gesture for a classroom request.','Make a clear, respectful classroom request using speech, signing or AAC. Add a suitable gesture if helpful.'),('A strong repair uses polite request language, a calm voice and a gesture such as waiting with an open hand.','A strong repair makes the request clear and respectful through speech, signing or AAC. A suitable gesture may help. Check the response rather than requiring a particular voice or gesture.')],
 'AC9E1LA02': [('Use comparison words such as better and faster to show how strongly you prefer something.','Use comparison words such as better and faster to help explain a preference.'),('I can use comparison words such as better and faster to show how strongly I prefer something.','I can use comparison words such as better and faster to help explain a preference.')],
 'AC9E1LA03': [('What features prove it?','What features give clues?'),('What purpose uses first, next, finally?','How can time words help organise a recount or instructions?')],
 'AC9E1LA04': [('The rhythm or beat should stay steady enough for listeners to hear the pattern.','The beat is a steady pulse; rhythm is how the word sounds are timed. Model the timing rather than treating beat and rhythm as the same thing.')],
 'AC9E1LA06': [('Question: Is “ran to school” a complete sentence? No. It tells an action but does not say who ran.','Question: In a recount, is “ran to school” a complete statement? No. Add who ran: “The child ran to school.” Commands such as “Run to school.” can have an understood you.')],
 'AC9E1LA07': [('Sort word cards by job.','Read words in short sentences, then sort them by their job.'),('>Change Omar waved. Omar smiled. so the repeated name is replaced without losing meaning.','>Omar uses they. Change Omar waved. Omar smiled. so the repeated name is replaced without losing meaning.'),('Omar waved. He smiled. He refers back to Omar, so the reader still knows who smiled.','Omar waved. They smiled. They refers back to Omar, whose pronouns were supplied, so the reader still knows who smiled.')]
}
def block(code,d):
 body='<p class="research-teaching__intro">Work through these six teaching focuses in short sessions. Read, model, try and explain; return to any focus that needs more support.</p><p><strong>Words to teach:</strong> '+esc(d['vocabulary'])+'</p>'
 for i,f in enumerate(d['focuses'],1):
  model=f['model']
  if code=='AC9E1LA04' and i==3:
   display='<div class="research-teaching__beats" role="group" aria-label="Four equally spaced beats. Two quicker sounds of little fit inside the third beat.">'+''.join('<span>'+esc(x)+'</span>' for x in ['tap','tap','lit-tle','tap'])+'</div><p>'+esc(model)+'</p>'
  else:display='<p>'+esc(model)+'</p>'
  body+='<article class="research-teaching__focus"><h3>'+str(i)+'. '+esc(f['title'])+'</h3><p>'+esc(f['teach'])+'</p><div class="research-teaching__model"><p class="research-teaching__label">Model together</p>'+display+'</div><p><strong>Your turn:</strong> '+esc(f['prompt'])+'</p><details class="year1-example-answer"><summary>Answer and teaching guidance</summary><p>'+esc(f['answer'])+'</p></details></article>'
 teaching='<details class="curriculum-topic-section research-teaching" id="research-teaching"><summary><strong>Teach it step by step</strong></summary><div class="curriculum-detail-body">'+body+'</div></details>'
 guidance='<details class="curriculum-topic-section research-teaching" id="research-teaching-check"><summary><strong>Support, extend and check learning</strong></summary><div class="curriculum-detail-body"><h3>Watch for this</h3><p>'+esc(d['watch'])+'</p><h3>Support</h3><p>'+esc(d['support'])+'</p><h3>Extend within this skill</h3><p>'+esc(d['extend'])+'</p><h3>Quick check</h3><p>'+esc(d['check'])+'</p><details class="year1-example-answer"><summary>Expected evidence and next step</summary><p>'+esc(d['answer'])+'</p><p>If the explanation is unclear, model a different example and try again. Record what the child can explain or do, and the support used; a paper score alone does not establish an observed speaking or performance skill.</p></details><p class="research-teaching__access">An adult can read the directions and explain taught terms. Accept spoken, signed, pointed, AAC or scribed responses when these preserve the skill being checked. Short directions do not assume every child can independently decode all the words.</p></div></details>'
 return START+teaching+guidance+END
for code,d in data.items():
 unit=next(u for u in units if u['code']==code);topic=ROOT/unit['url'].strip('/')/'index.html'
 for path in [topic,topic.parent/'teacher-slides/index.html']:
  s=path.read_text();s=re.sub(re.escape(START)+'.*?'+re.escape(END),'',s,flags=re.S).replace(STYLE,'')
  for old,new in FIXES.get(code,[]):s=s.replace(old,new)
  new=block(code,d)
  if path==topic:
   start=s.index('<div id="topic-guide">');m=re.search(r'<details\b[^>]*\bopen\b[^>]*>.*?</details>',s[start:],re.S);assert m,code
   anchor=start+m.end()
  else:
   # Copy the same authored topic supplement into the existing static Classroom View.
   marker='<div class="section-stack" data-single-open>';assert marker in s,code
   anchor=s.index(marker)+len(marker);new=new.replace('<details class="curriculum-topic-section research-teaching"','<details name="lesson" class="curriculum-topic-section research-teaching"')
  s=s[:anchor]+new+s[anchor:];s=s.replace('</head>',STYLE+'</head>',1);path.write_text(s)
print('Strengthened seven topic guides and copied their teaching into seven existing Classroom Views.')
