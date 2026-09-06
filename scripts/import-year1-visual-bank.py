"""One-time, scoped import of the owner-requested 600-question Year 1 bank.

Run with the approved bank-data.json path. Never rebuilds topic guides or slides.
The canonical CSV/JSON preserves the editorial questions and visual models.
"""
from pathlib import Path
import csv, hashlib, itertools, json, re, subprocess, sys

ROOT=Path(__file__).resolve().parents[1]
VERSION='20260906-y1-original-v1'
CODES=[f'AC9M1N{i:02}' for i in range(1,7)]+['AC9M1A01','AC9M1A02','AC9M1M01','AC9M1M02','AC9M1M03','AC9M1SP01','AC9M1SP02','AC9M1ST01','AC9M1ST02']
DATA=json.loads(Path(sys.argv[1]).read_text())
QS=DATA['questions']
assert len(QS)==600 and {q['skill_code'] for q in QS}==set(CODES)
AUTO={}

def add(code, ids, answers, fmt='plain'):
    for qid,ans in zip(ids.split(),answers):
        AUTO['AC9M1'+code+'-'+qid]=(ans if isinstance(ans,list) else [str(ans)],fmt)

def words(n):
    small=['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen']
    if n<20:return small[n]
    if n<100:return ['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'][n//10]+('-'+small[n%10] if n%10 else '')
    return 'one hundred'+(' and '+words(n-100) if n>100 else '')

def nums(code, entries):
    for qid,n,unit in entries:
        aliases=[str(n),words(n),words(n).replace('-',' ')]
        if unit:aliases += [f'{n} {unit}',f'{words(n)} {unit}',f'{words(n).replace("-"," ")} {unit}']
        add(code,qid,[list(dict.fromkeys(aliases))])

nums('N01',[(i,n,'') for i,n in [('P04',46),('P12',108),('P16',103),('T04',119),('T16',118)]])
add('N01','P08 P24 T12',['40,48,84','101,109,110,120','105,95,85'],'number-sequence')
add('N01','P20',[['91,92','91,93','92,93']],'number-sequence')
add('N01','T08',[[str(n) for n in (113,114,115)]])
nums('N02',[(i,n,'') for i,n in [('P12',5),('P16',16),('P24',17),('T08',12),('T16',4)]])
add('N02','P04',[[f'{a},{6-a}' for a in range(1,6)]],'number-parts')
add('N02','T04',[[f'{a},{7-a}' for a in range(1,7)]],'number-parts')
add('N02','P08',[['40,6','6,40']],'number-parts')
for qid,a,b in [('P20',[70,2],[60,12]),('T12',[20,4],[10,14])]:
    aliases=[','.join(map(str,x+y)) for x in [a,a[::-1]] for y in [b,b[::-1]]]
    aliases += [','.join(s.split(',')[2:]+s.split(',')[:2]) for s in aliases[:]]
    add('N02',qid,[aliases],'number-parts')
nums('N03',[(i,n,'') for i,n in [('P04',16),('P08',94),('P12',47),('P16',110),('P20',86),('P24',117),('T04',58),('T08',29),('T12',120)]])
nums('N04',[('P04',4,'')])
add('N04','P16',[['11+3=14','3+11=14','14=11+3','14=3+11']],'equation')
add('N04','P24',[[f'{a}+{18-a}=18' for a in range(1,18) if a!=9]+[f'18={a}+{18-a}' for a in range(1,18) if a!=9]],'equation')
add('N04','T16',[[f'{a}-{a-6}=6' for a in range(11,21)]+[f'6={a}-{a-6}' for a in range(11,21)]],'equation')
add('N05','P16',[['9+6=15','6+9=15','15=9+6','15=6+9']],'equation')
add('A01','P04 P08 P16 T04',['8,10','5,10,15','18,20','13,15,17'],'number-sequence')
nums('A01',[('P12',8,''),('T12',20,'')])
add('A01','P24',[['0,10,20,30','10,20,30,40','20,30,40,50']],'number-sequence')
add('A01','T16',[['0,5,10,15','5,10,15,20','10,15,20,25']],'number-sequence')
add('A02','P12 T08',['4,4,7','2,2,5,2,2,5,2,2,5'],'number-sequence')
add('M01','P04 P08 T04 T08',[['b','car b'],['puzzle','the puzzle','jo',"jo's puzzle"],['game','the game'],'Ari'])
add('M01','P12',[['red blue green','red car blue car green car']],'word-sequence')
add('M01','P20',[['a b c','ribbon a ribbon b ribbon c']],'word-sequence')
nums('M02',[('P04',6,'tiles'),('P08',6,'cubes'),('P12',3,'cubes'),('P20',2,'blocks'),('T04',3,'cubes'),('T12',3,'cubes')])
add('M02','T08',[['8 blocks','eight blocks']])
add('M03','P04',['morning afternoon evening'],'word-sequence')
add('M03','P08 P20 T04',['March',['week','weeks'],'November'])
nums('M03',[('P12',7,'days'),('T12',3,'hours')])
add('M03','P16',[['1 hour 1 day 1 week','hour day week','one hour one day one week']],'word-sequence')
add('M03','T08',[['1 year 1 month 1 day','year month day','one year one month one day']],'word-sequence')
add('ST01','P16',[[ ' '.join(p) for terms in itertools.product(['book','books'],['ball','balls'],['block','blocks']) for p in itertools.permutations(terms)]],'word-sequence')

def convert(q):
    key=q['skill_code']+'-'+q['question_id']
    d=dict(id=key, questionId=q['question_id'], curriculumCode=q['skill_code'],bank=q['bank'],bankVersion=VERSION,
      question=q['question'], explanation=q['explanation'], skill=q['question_type'],responseType=q['response_type'],
      difficulty={'recognise':1,'apply':2,'reason':3,'create':3}[q['cognitive_demand']],cognitiveDemand=q['cognitive_demand'],
      visualModel=q['visual'],acceptanceNote=q['acceptance_note'],printable=True)
    if q['response_type']=='mcq':
        d.update(type='single',answers=list(q['options'].values()),correct=list(q['options']).index(q['correct_answer']))
    elif key in AUTO:
        aliases,fmt=AUTO[key]
        d.update(type='text',correct=q['answer'],acceptedAnswers=aliases,answerFormat=fmt)
        if fmt.startswith('number-'):d['placeholder']='Write the numbers in order, separated by commas' if fmt=='number-sequence' else 'Write the parts'
        if all(re.fullmatch(r'\d+',a) for a in aliases):d['inputMode']='numeric'
    else:
        d.update(type='self-check',gradingMode='adult-review',correct=q['answer'],modelAnswer=q['answer'])
    return d

canonical=ROOT/'curriculum-question-banks/banks/year-1/mathematics/year1-original-20260906'
canonical.mkdir(parents=True,exist_ok=True)
baseline_file=canonical/'import-baseline.json'
if not baseline_file.exists():
    baseline=dict(commit=subprocess.check_output(['git','rev-parse','HEAD'],cwd=ROOT,text=True).strip(),pages={},worksheetBanks={})
    for code in CODES:
        base='quiz/year-1/math/'+code.lower()+'/'
        for mode in ['practice','test']:
            file=base+mode+'/index.html'
            old=subprocess.check_output(['git','show','HEAD:'+file],cwd=ROOT,text=True)
            baseline['pages'][file]=dict(title=re.search(r'<title>(.*?)</title>',old,re.S)[1],canonical=re.search(r'<link rel="canonical" href="([^"]+)"',old)[1],breadcrumbs=re.findall(r'<a href="([^"]+)"',re.search(r'<nav class="quiz-breadcrumb".*?</nav>',old,re.S)[0]))
        old=subprocess.check_output(['git','show','HEAD:'+base+'practice/questions.js'],cwd=ROOT)
        baseline['worksheetBanks'][base+'worksheet/questions.js']=hashlib.sha256(old).hexdigest()
    baseline_file.write_text(json.dumps(baseline,indent=2)+'\n')
for q in QS:q['qa_status']='owner_requested_import'
(canonical/'bank-data.json').write_text(json.dumps(DATA,ensure_ascii=False,indent=2)+'\n')
fields=['skill_code','skill_title','bank','question_id','question','options','correct_answer','explanation','response_type','question_type','cognitive_demand','acceptance_note','visual','ixl_reference_url','curriculum_source','qa_status']
with (canonical/'year1-maths-bank.csv').open('w',newline='',encoding='utf-8-sig') as f:
    w=csv.DictWriter(f,fieldnames=fields,lineterminator='\n');w.writeheader()
    for q in QS:w.writerow({k:json.dumps(q[k],ensure_ascii=False) if k in ('options','visual') else q[k] for k in fields})

for code in CODES:
    base=ROOT/'quiz/year-1/math'/code.lower()
    landing=base/'index.html'
    if landing.exists():
        s=landing.read_text()
        intro='Practice has 24 questions, with 8 in each set. Test has a separate set of 16 questions. A grown-up checks drawings, explanations and practical tasks.'
        s,count=re.subn(r'<p(?:\s[^>]*)?>[^<]*(?:Practice|practice)[^<]*Test[^<]*</p>',lambda _: '<p>'+intro+'</p>',s,count=1)
        assert count==1,landing
        landing.write_text(s)
    for bank,size in [('practice',24),('test',16)]:
        authored=[q for q in QS if q['skill_code']==code and q['bank']==bank]
        assert len(authored)==size
        assert sum(q['response_type']=='short_answer' for q in authored)==size//4
        target=base/bank/'questions.js'
        # Worksheet generation has a separate, single-page legacy layout. Preserve
        # its existing bank until that renderer is updated for full visual prompts.
        if bank=='practice' and (base/'worksheet/index.html').exists():
            worksheet_bank=base/'worksheet/questions.js'
            if not worksheet_bank.exists():worksheet_bank.write_text(target.read_text())
            p=base/'worksheet/index.html';s=p.read_text()
            s=re.sub(r'/quiz/year-1/math/'+code.lower()+r'/practice/questions\.js(?:\?[^"<]*)?',f'/quiz/year-1/math/{code.lower()}/worksheet/questions.js?v=20260906-preserved',s)
            p.write_text(s)
        target.write_text('"use strict";\n// '+VERSION+' - generated from the canonical Year 1 bank.\nwindow.skillr'+bank.title()+'Questions = '+json.dumps([convert(q) for q in authored],ensure_ascii=False,indent=2)+';\n')
        p=base/bank/'index.html';s=p.read_text()
        match=re.search(r'window.quizConfig\s*=\s*(\{.*?\});',s,re.S);assert match,p
        cfg=json.loads(match[1]);newkey=f'skillr{code}{bank.title()}Result:{VERSION}'
        cfg.update(bankVersion=VERSION,storageKey=f'{code}{bank.title()}Best:{VERSION}',resultStorageKey=newkey,
          maxQuestions=8 if bank=='practice' else 16,questionCycle=bank=='practice',shuffleQuestions=bank=='practice',
          preserveQuestionOrder=bank=='test',responseMix=bank=='practice',progressiveDifficulty=bank=='practice',
          avoidSameCorrectPosition=True,questionCycleStorageKey=f'{code}:{bank}:{VERSION}',
          resultUrl='result/',reviewUrl='review/',retakeUrl='retake/')
        s=s[:match.start()]+'window.quizConfig='+json.dumps(cfg,separators=(',',':'))+';'+s[match.end():]
        s=re.sub(r'(/quiz/year-1/math/'+code.lower()+'/'+bank+r'/questions\.js)(?:\?[^"<]*)?',r'\1?v='+VERSION,s)
        s=s.replace('/quiz/assets/script.js?v=115','/quiz/assets/script.js?v='+VERSION)
        support=f'<script src="/quiz/assets/year1-maths-support.js?v={VERSION}"></script>'
        if support not in s:s=s.replace('<script src="/quiz/assets/production-question-ui.js',support+'<script src="/quiz/assets/production-question-ui.js')
        css=f'<link rel="stylesheet" href="/quiz/assets/year1-maths-bank.css?v={VERSION}">'
        if css not in s:s=s.replace('</head>',css+'</head>')
        # Correct only verified obsolete question counts and introductory bank copy.
        s=re.sub(r'(<span\b[^>]*\bid="questionCount"[^>]*>)\d+(</span>)',lambda m:m[1]+str(cfg['maxQuestions'])+m[2],s)
        s=re.sub(r'(<span class="summary-number">)\d+(</span><span class="summary-label">Question bank</span>)',lambda m:m[1]+str(size)+m[2],s)
        s=re.sub(r'\b\d+-question\b',lambda m:('8-question' if bank=='practice' else '16-question') if int(m[0].split('-')[0])<17 else ('24-question' if bank=='practice' else '16-question'),s)
        s=s.replace('a 8-question','an 8-question')
        intro='Practise 8 questions at a time from 24 questions: 6 choices and 2 written or practical tasks. Complete three sets to cover the bank.' if bank=='practice' else 'Try all 16 questions: 12 choices and 4 written or practical tasks. A grown-up checks drawings and explanations after the test.'
        introductions=iter([intro]+['']*10)
        s=re.sub(r'<p class="intro-text">.*?</p>',lambda m:('<p class="intro-text">'+text+'</p>') if (text:=next(introductions,'')) else '',s,flags=re.S)
        assessment='Each Practice set has 8 questions from the 24-question bank, with choices and short tasks. Review the explanations together.' if bank=='practice' else 'The Test contains all 16 questions. A grown-up checks practical tasks and explanations before a final score or certificate is awarded.'
        s=re.sub(r'(<strong>Assessment guidance:</strong>).*?(</li>)',lambda m:m[1]+' '+assessment+m[2],s,flags=re.S)
        p.write_text(s)
        for action,script in [('result','separate-result'),('review','separate-review')]:
            p=base/bank/action/'index.html';s=p.read_text()
            s=re.sub(r'data-result-key="[^"]+"',f'data-result-key="{newkey}"',s)
            if css not in s:s=s.replace('</head>',css+'</head>')
            s=s.replace('/quiz/assets/'+script+'.js?v=1','/quiz/assets/'+script+'.js?v='+VERSION)
            if support not in s:s=s.replace('<script src="/quiz/assets/'+script,support+'<script src="/quiz/assets/'+script)
            if action=='review' and '/assets/progress-store.js' not in s:s=s.replace(support,f'<script src="/assets/progress-store.js?v={VERSION}"></script>'+support)
            p.write_text(s)
        p=base/bank/'retake/index.html';s=p.read_text()
        text='Start another set of 8 Practice questions. Completed sets rotate through the 24-question bank before repeating.' if bank=='practice' else 'Try the 16 Test questions again. Review your previous answers and explanations before restarting.'
        s=re.sub(r'(<h1>.*?</h1>)<p>.*?</p>',lambda m:m[1]+'<p>'+text+'</p>',s,count=1,flags=re.S)
        p.write_text(s)

converted=[convert(q) for q in QS]
counts={kind:sum(q['type']==kind for q in converted) for kind in ['single','text','self-check']}
(canonical/'README.md').write_text(f'''# Year 1 Maths original bank

Owner-requested one-time import, 6 September 2026. Version: `{VERSION}`.

600 independently authored questions across all 15 Year 1 Maths curriculum codes.
Each code has 24 Practice questions and a separate 16-question Test.
There are 450 multiple-choice questions, 150 short tasks and 205 semantic visuals.
Of the short tasks, {counts['text']} have explicit automatic acceptance rules and
{counts['self-check']} require an adult to check the requested evidence.

`bank-data.json` and `year1-maths-bank.csv` are the editorial source snapshot.
`scripts/import-year1-visual-bank.py` performs the explicitly scoped import.
The runtime keeps six MCQs and two short tasks per eight-question Practice set,
with unseen-question rotation and progressively ordered difficulty.

Drawings, models and explanations are saved for adult review. They do not award
correctness for completion. The Review answers page provides the model, marking
guidance and adult marking controls. Pending tasks are excluded from accuracy;
a Test cannot pass or unlock a certificate until every task has been marked.
Best scores, attempt results and question rotation use the new bank version.
Historical dashboard attempts remain available and carry their original version.

The existing single-page worksheet generator has its prior bank preserved in
each code's `worksheet/questions.js`; it cannot yet render these full visual
prompts without truncation. Topic Guides, Teacher Slides and worksheets keep
their existing routes. The separate US Letter workbook contains the full new
bank with answers and explanations at the back; it is not published here.

IXL references record representative format observations, not copied questions
or an adaptive-bank scrape. Curriculum and reference links remain editorial
metadata and are not presented as product affiliation or endorsement.
''')
print(json.dumps({'questions':len(converted),'codes':len(CODES),'visuals':sum(bool(q['visualModel']) for q in converted),'types':counts},indent=2))
