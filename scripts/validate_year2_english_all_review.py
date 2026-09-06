import json,re,sys
from pathlib import Path
root=Path.cwd(); asset=root/'assets/assessment-banks/year2/english'; quiz=root/'quiz/year-2/english'
bad=[]; total=adult=0
codes=[p.stem for p in sorted(asset.glob('ac9e2*.json')) if not p.name.endswith('-qa-log.json')]
if len(codes)!=27: bad.append(f'expected 27 banks got {len(codes)}')
for code in codes:
    data=json.load(open(asset/f'{code}.json',encoding='utf-8'))
    total+=len(data); adult+=sum(q.get('response_type')=='adult_review' for q in data)
    pc=sum(q['bank']=='practice' for q in data); tc=sum(q['bank']=='test' for q in data)
    if (pc,tc)!=(24,16): bad.append(f'{code} counts {pc}/{tc}')
    for bank,expect,var,file in [('practice',24,'skillrPracticeQuestions',quiz/code/'practice/questions.js'),('test',16,'skillrTestQuestions',quiz/code/'test/questions.js')]:
        if not file.exists(): bad.append(f'missing {file}'); continue
        text=file.read_text(encoding='utf-8')
        m=re.search(r'window\.'+var+r' = (.*);\s*$',text,re.S)
        if not m: bad.append(f'bad js {file}'); continue
        dec=json.JSONDecoder(); arr,_=dec.raw_decode(m.group(1))
        if len(arr)!=expect: bad.append(f'{file} len {len(arr)}')
        page = file.parent / 'index.html'
        if page.exists() and all(q.get('responseType') == 'multiple_choice' and q.get('gradingMode') == 'auto' for q in arr):
            if 'data-adult-review-note' in page.read_text(encoding='utf-8'):
                bad.append(f'stale adult-review instructions {page}')
        ids={q['id'].lower() for q in data if q['bank']==bank}
        if {q['id'] for q in arr}!=ids: bad.append(f'id parity {file}')
    for q in data:
        if q.get('grading_mode') == 'adult-review':
            if q.get('answers') != [] or q.get('correct_index') is not None: bad.append(f'adult task has choices {q["id"]}')
            if not all(q.get(k) for k in ['model_answer','acceptance_note','response_instructions']): bad.append(f'adult guidance {q["id"]}')
        else:
            if len(q.get('answers',[]))!=3 or sum(1 for a in q['answers'] if a.get('is_correct'))!=1: bad.append(f'answers {q.get("id")}')
            if q['answers'][q['correct_index']]['is_correct'] is not True: bad.append(f'correct index {q["id"]}')
            if any(a.get('text') in ['Adult review required','Response not yet reviewed','Revise with an adult'] for a in q.get('answers',[])): bad.append(f'review status used as answer {q["id"]}')
    for required in [quiz/code/'index.html',quiz/code/'practice/index.html',quiz/code/'test/index.html',quiz/code/'practice/review/index.html',quiz/code/'test/review/index.html',quiz/code/'practice/result/index.html',quiz/code/'test/result/index.html']:
        if not required.exists(): bad.append(f'missing page {required}')
    for html in (quiz/code).rglob('*.html'):
        txt=html.read_text(encoding='utf-8')
        for href in re.findall(r'href="([^"]+)"',txt):
            if href.startswith('/quiz/year-2/english/'):
                target=root/href.lstrip('/').split('#')[0]
                if not target.exists(): bad.append(f'bad href {html}: {href}')
        for src in re.findall(r'src="([^"]+)"',txt):
            if src.startswith('/quiz/year-2/english/'):
                target=root/src.split('?')[0].lstrip('/')
                if not target.exists(): bad.append(f'bad src {html}: {src}')
print(json.dumps({'status':'PASS' if not bad else 'FAIL','codes':len(codes),'questions':total,'adultReviewTasks':adult,'bad':bad[:50]},indent=2))
sys.exit(1 if bad else 0)
