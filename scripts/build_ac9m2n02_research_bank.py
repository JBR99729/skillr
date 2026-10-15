import json,re,html,shutil,hashlib
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
SOURCE=ROOT/'docs/question-bank-reviews/2026-10-15-ac9m2n02'
candidate=json.loads((SOURCE/'candidate.items.json').read_text())
approved=json.loads((SOURCE/'teacher-approval.json').read_text())
digest=hashlib.sha256((SOURCE/'candidate.items.json').read_bytes()).hexdigest()
assert approved['candidateSHA256']==digest and approved['approved'] is True
# Internal provenance labels stay in the approved source, outside public metadata.
VERSION=candidate['version'].replace('-research-', '-');ROUTE=ROOT/'quiz/year-2/math/ac9m2n02'
esc=lambda s:html.escape(str(s),quote=True)

def diagram(v):
 kind=v['kind'];label=v['label']
 if kind=='chart':
  return '<figure class="n02-visual"><figcaption>'+esc(label)+'</figcaption><table class="n02-chart"><thead><tr><th>Hundreds</th><th>Tens</th><th>Ones</th></tr></thead><tbody><tr>'+''.join('<td>'+esc(x)+'</td>' for x in v['values'])+'</tr></tbody></table></figure>'
 if kind=='parts':
  return '<figure class="n02-visual"><figcaption>'+esc(label)+'</figcaption><div class="n02-parts">'+''.join('<p>'+esc(x)+'</p>' for x in v['values'])+'</div></figure>'
 assert kind=='blocks'
 counts=[v['hundreds'],v['tens'],v['ones']]
 alt=f"{label}: {counts[0]} hundred flats, {counts[1]} ten rods and {counts[2]} one cubes."
 markup='<figure class="n02-visual"><figcaption>'+esc(label)+'</figcaption><div class="n02-blocks">'
 for group,(name,count) in enumerate(zip(['Hundreds','Tens','Ones'],counts)):
  rows=(count+([3,8,8][group])-1)//([3,8,8][group])
  height=max(52,rows*([65,71,32][group])+12)
  markup+='<section class="n02-unit"><h3>'+name+'</h3><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 204 '+str(height)+'" role="img" aria-label="'+str(count)+' '+name.lower()+' pieces">'
  for i in range(count):
   if group==0:
    x=12+(i%3)*63;y=6+(i//3)*65
    markup+=f'<g data-unit="hundred"><rect x="{x}" y="{y}" width="55" height="55" fill="#d9ecef" stroke="#1d5864" stroke-width="1.5"/>'
    for k in range(1,10):markup+=f'<path d="M{x+k*5.5} {y}v55 M{x} {y+k*5.5}h55" stroke="#4c7985" stroke-width=".55"/>'
    markup+='</g>'
   elif group==1:
    x=12+(i%8)*24;y=6+(i//8)*71
    markup+=f'<g data-unit="ten"><rect x="{x}" y="{y}" width="13" height="62" fill="#d9eee5" stroke="#205e4d" stroke-width="1.4"/>'
    for k in range(1,10):markup+=f'<path d="M{x} {y+k*6.2}h13" stroke="#397b66" stroke-width=".7"/>'
    markup+='</g>'
   else:
    x=15+(i%8)*23;y=8+(i//8)*32
    markup+=f'<rect data-unit="one" x="{x}" y="{y}" width="15" height="15" fill="#eac66e" stroke="#7f5b12" stroke-width="1.3"/>'
  markup+='</svg></section>'
 return markup+'</div><p class="n02-key">Hundred flat = 100 · Ten rod = 10 · One cube = 1</p></figure>'

live=[];canonical=[]
for n,q in enumerate(candidate['items']):
 visual=diagram(q['visualSpec'])
 alt=(q['visualSpec']['label']+': '+', '.join(map(str,q['visualSpec'].get('values',[])))) if q['visualSpec']['kind']!='blocks' else q['visualSpec']['label']+f": {q['visualSpec']['hundreds']} hundred flats, {q['visualSpec']['tens']} ten rods, {q['visualSpec']['ones']} one cubes."
 item={'id':q['id'].lower(),'curriculumCode':'AC9M2N02','bank':q['bank'],'skill':q['focusTitle'],'focus':q['focus'],'concept':q['concept'],'type':q['type'],
 'question':q['question'],'audioPrompt':q['question'],'correct':q['correct'],'answers':q.get('answers',[]),
 'explanation':q['explanation'],'structuredExplanation':{'summary':q['explanation'],'hint':q['hint']},'visual':alt,'visualHtml':visual,
 'visualMeta':{'type':q['visualSpec']['kind'],'alt_text':alt},'difficulty':q['difficulty'],'difficultyTier':['understand','apply','reason'][q['difficulty']-1],
 'sequencePriority':n+1,'qualitySchema':'authored-v2','printable':True}
 if q['type']=='fill-blank':item.update(template=q['template'],acceptedAnswers=[[str(a)] for a in q['correct']])
 if q['type']=='number':item.update(step='1',tolerance=0)
 if q['type']=='self-check':
  for field in ['gradingMode','modelAnswer','acceptanceNote','responseInstructions','completionLabel']:item[field]=q[field]
 live.append(item)
 canonical.append({'id':q['id'],'curriculum_code':'AC9M2N02','subject':'math','year_level':'Year 2','bank':q['bank'],'strand':q['focusTitle'],'concept':q['concept'],
  'question':q['question'],'audio_prompt':q['question'],'type':q['type'],'correct':q['correct'],'answers':[{'text':a,'is_correct':i==q['correct']} for i,a in enumerate(q.get('answers',[]))],
  'explanation':{'summary':q['explanation'],'hint':q['hint']},'visual':{'type':'html','html':visual,'alt_text':alt},'difficulty':q['difficulty'],'quality_schema':'authored-v2','version':VERSION,
  **({k:q[k] for k in ['gradingMode','modelAnswer','acceptanceNote','responseInstructions','completionLabel']} if q['type']=='self-check' else {}),
  **({'template':q['template'],'acceptedAnswers':[[str(a)] for a in q['correct']]} if q['type']=='fill-blank' else {})})
(ROOT/'assets/assessment-banks/year2/math/ac9m2n02.json').write_text(json.dumps(canonical,ensure_ascii=False,indent=2)+'\n')
for bank,globalname,targets in [('practice','skillrPracticeQuestions',['practice/questions.js','practice/practice-questions.js','questions.js']),('test','skillrTestQuestions',['test/questions.js'])]:
 data=[q for q in live if q['bank']==bank]
 source='"use strict";\nwindow.'+globalname+' = '+json.dumps(data,ensure_ascii=False,indent=2)+';\n'
 if bank=='test':source+='window.skillrExamQuestions = window.'+globalname+';\n'
 source+='window.quizQuestions = window.'+globalname+';\n'
 for target in targets:(ROUTE/target).write_text(source)

teaching=candidate['teaching'];nested=teaching['nestedTensModel']
teaching_html='<section class="pre-read-notes n02-preparation" data-skillr-authored-preparation="true"><h2>'+esc(teaching['title'])+'</h2><p>'+esc(teaching['unitKey'])+'</p><ul>'+''.join('<li>'+esc(x)+'</li>' for x in teaching['notes'])+'</ul><details><summary>Worked examples and learning support</summary>'+''.join('<p>'+esc(x)+'</p>' for x in teaching['examples'])+'<div class="n02-equal-models">'+diagram(nested['before'])+diagram(nested['after'])+'</div><p>'+esc(nested['caption'])+'</p></details></section>'
for mode in ['practice','test']:
 p=ROUTE/mode/'index.html';s=p.read_text()
 # Replace the complete preparation region, including nested model sections.
 # The next summary is a stable sibling boundary; first-closing-section is unsafe.
 s,n=re.subn(r'<section class="pre-read-notes(?: n02-preparation)?"[^>]*>.*?(?=<div class="quiz-summary">)',teaching_html,s,count=1,flags=re.S)
 assert n==1, f'Missing preparation boundary: {p}' 
 s=re.sub(r'<section class="pre-read-notes adsense-learning-support".*?</section>','',s,count=1,flags=re.S)
 s=s.replace('<p class="intro-text">SkillrHub quiz practice is built for curriculum-aligned revision with answer feedback and a clear review path.</p>','')
 s=s.replace('Read the quick preparation notes, then start when you are ready.','Practise partitioning, equal exchanges and zero. Some tasks ask you to build, draw or explain; a grown-up checks those responses.')
 match=re.search(r'window.quizConfig=(\{.*?\});',s);config=json.loads(match.group(1));count=10 if mode=='practice' else 16
 config.update(bankVersion=VERSION,requireAdultReviewSupport=True,preserveQuestionVisuals=True,authoredAttemptCount=count,maxQuestions=count,passingPercent=100,avoidSameCorrectPosition=True)
 config['storageKey']='AC9M2N02'+mode.title()+'Best:'+VERSION;config['resultStorageKey']='skillrAC9M2N02'+mode.title()+'Result:'+VERSION
 config['reviewUrl']='review/';config['retakeUrl']='retake/'
 s=s[:match.start(1)]+json.dumps(config,separators=(',',':'))+s[match.end(1):]
 s=re.sub(r'(id="questionCount">)\d+',r'\g<1>'+str(count),s)
 if '/quiz/year-2/math/ac9m2n02/bank.css' not in s:s=s.replace('</head>','<link rel="stylesheet" href="/quiz/year-2/math/ac9m2n02/bank.css?v=3"></head>')
 if '/quiz/year-2/math/ac9m2n02/bank-support.js' not in s:s=s.replace('<script src="/quiz/assets/script.js','<script src="/quiz/assets/year1-maths-support.js?v=20260906"></script><script src="/quiz/year-2/math/ac9m2n02/bank-support.js?v=2"></script><script src="/quiz/assets/script.js')
 s=re.sub(r'(/quiz/year-2/math/ac9m2n02/(?:practice|test)/questions.js)\?[^"<]+',r'\1?v='+VERSION,s)
 s=s.replace('/quiz/assets/script.js?v=117','/quiz/assets/script.js?v=20261015-authored-count')
 s=s.replace('bank.css?v=2','bank.css?v=3')
 p.write_text(s)
 for suffix in ['result','review']:
  p=ROUTE/mode/suffix/'index.html';s=p.read_text();s=re.sub(r'data-result-key="[^"]+"','data-result-key="'+esc(config['resultStorageKey'])+'"',s)
  if '/quiz/year-2/math/ac9m2n02/bank.css' not in s:s=s.replace('</head>','<link rel="stylesheet" href="/quiz/assets/year1-maths-bank.css"><link rel="stylesheet" href="/quiz/year-2/math/ac9m2n02/bank.css?v=3"></head>')
  if '/quiz/assets/year1-maths-support.js' not in s:s=s.replace('<script src="/quiz/assets/separate-','<script src="/quiz/assets/year1-maths-support.js?v=20260906"></script><script src="/quiz/assets/separate-')
  if suffix=='review' and '/assets/progress-store.js' not in s:
   s=s.replace('<script src="/quiz/assets/year1-maths-support.js','<script src="/assets/progress-store.js?v=3"></script><script src="/quiz/assets/year1-maths-support.js')
  if suffix=='review':s=re.sub(r'/quiz/assets/separate-review\.js\?[^"<]+','/quiz/assets/separate-review.js?v=20261015-n02-visuals',s)
  s=s.replace('bank.css?v=2','bank.css?v=3')
  p.write_text(s)

runtime=ROOT/'quiz/assets/script-runtime-v115.js';s=runtime.read_text();old='  const standardAttemptQuestionCount = 5;'
new='''  // Authored banks may opt into a complete, reviewed sitting; legacy pages keep five.
  const authoredCount = Number(config.authoredAttemptCount);
  const standardAttemptQuestionCount = Number.isInteger(authoredCount) && authoredCount > 0
    ? Math.min(50, authoredCount)
    : 5;'''
assert s.count(old)==1 or new in s;s=s.replace(old,new);runtime.write_text(s)
loader=ROOT/'quiz/assets/script.js';s=loader.read_text();s=s.replace('script-runtime-v115.js?v=20261013-authored-preparation','script-runtime-v115.js?v=20261015-authored-count');loader.write_text(s)

internal=ROOT/'docs/question-bank-reviews/2026-10-15-ac9m2n02';internal.mkdir(parents=True,exist_ok=True)
for name in ['candidate.items.json','legacy-bank.json','legacy-dispositions.md','teacher-review-v2.md','teacher-approval.json','teacher-recheck-v2.md']:
 src=SOURCE/name
 if src.exists() and src.resolve()!=(internal/name).resolve():shutil.copy2(src,internal/name)
print(json.dumps({'practice':30,'test':16,'candidateSHA256':digest,'written':'JBR99729/skillr skillr-dev','adultReview':sum(q['type']=='self-check' for q in live)}))
