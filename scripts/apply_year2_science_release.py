"""Apply the reviewed Year 2 Science release; changes only named bank routes."""
import csv
import json
import re
import random
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path(sys.argv[1])
rows = list(csv.DictReader(SOURCE.open(encoding='utf-8-sig', newline='')))
repairs = {}
for cells in csv.reader((ROOT / 'scripts/year2_science_release_repairs.tsv').open(), delimiter='\t'):
    assert len(cells) == 6, cells
    qid, question, correct, wrong1, wrong2, explanation = cells
    assert qid not in repairs, qid
    repairs[qid] = (question, correct, wrong1, wrong2, explanation)
assert len(rows) == 640
seen = set()
groups = {}
for row in rows:
    qid = row['question_id']
    assert qid not in seen
    seen.add(qid)
    answers = [re.sub(r'^[A-Z]\.\s*', '', v.strip()) for v in row['options'].split(' | ')]
    correct = row['correct_answer']
    assert answers.count(correct) == 1, qid
    index = answers.index(correct)
    if qid in repairs:
        question, correct, wrong1, wrong2, explanation = repairs[qid]
        answers = [wrong1, wrong2]
        answers.insert(index, correct)
        row['question'], row['explanation'] = question, explanation
    assert len(answers) == 3 and len(set(answers)) == 3
    assert all([row['question'].strip(), row['explanation'].strip(), *answers])
    code, bank = row['skill_code'], row['bank']
    assert re.fullmatch(r'AC9S2(?:H01|I0[1-6]|U0[1-3])', code)
    assert bank in ('practice', 'test')
    assert re.fullmatch(code.lower() + ('-p-' if bank == 'practice' else '-t-') + r'\d{3}', qid)
    n = int(qid[-3:])
    stage = 'recognise' if n <= 16 else 'apply' if n <= 32 else 'reason'
    q = dict(id=qid, curriculumCode=code, bank=bank, skill=row['skill_title'], printable=True,
             type='single', question=row['question'], audioPrompt=row['question'], visual='',
             answers=answers, correct=index, explanation=row['explanation'],
             structuredExplanation={'summary': row['explanation']},
             stage=stage, difficulty=1 if stage == 'recognise' else 2 if stage == 'apply' else 3,
             difficultyTier=stage, sequencePriority=n, qualitySchema='skillr-reviewed-y2-science-v1')
    groups.setdefault(code, {}).setdefault(bank, []).append(q)
assert set(repairs) <= seen
for code, banks in groups.items():
    lower = code.lower()
    for bank, items in banks.items():
        items.sort(key=lambda q: q['id'])
        count = 48 if bank == 'practice' else 16
        assert len(items) == count
        positions = [i % 3 for i in range(count)]
        random.Random(code + bank).shuffle(positions)
        for item, position in zip(items, positions):
            answer = item['answers'].pop(item['correct'])
            item['answers'].insert(position, answer)
            item['correct'] = position
        text = '"use strict";\nwindow.skillr' + bank.title() + 'Questions = ' + json.dumps(items, ensure_ascii=False, indent=2) + ';\n'
        route = ROOT / 'quiz/year-2/science' / lower / bank
        (route / 'questions.js').write_text(text)
        if bank == 'practice':
            (route / 'practice-questions.js').write_text(text)
        html = (route / 'index.html').read_text()
        html = re.sub(r'\b(?:24|32|40|49)-question(?= (?:authored |practice |test |Year 2 |bank))', str(count) + '-question', html)
        html = re.sub(r'(<span class="summary-number">)\d+(</span><span class="summary-label">Question bank)', lambda m: m[1] + str(count) + m[2], html)
        html = html.replace('10 rotating questions', '8 rotating questions')
        html = re.sub(r'(questions\.js)\?[^"\s<]+', r'\1?v=20260905-y2-science-reviewed', html)
        (route / 'index.html').write_text(html)
    target = ROOT / 'assets/assessment-banks/year2/science' / (lower + '.json')
    target.write_text(json.dumps(banks['practice'] + banks['test'], ensure_ascii=False, indent=2) + '\n')
    landing = ROOT / 'quiz/year-2/science' / lower / 'index.html'
    html = landing.read_text()
    html = re.sub(r'\b49-question', '48-question', html)
    html = re.sub(r'\b32-question', '16-question', html)
    html = re.sub(r'\b(?:24|40|49)(?= Practice questions| practice questions|-question practice|-question bank)', '48', html)
    html = re.sub(r'\b32(?= (?:separate |auto-marked )?Test questions|-question test)', '16', html)
    landing.write_text(html)
note = ('Year 2 Science quality note: The 10 Year 2 Science skills contain 48 practice questions and 16 test questions each. '
        'The supplied release was reviewed and edited for answer correctness, clear wording, Year 2 scope and repeated question scenarios. '
        'All 640 IDs and normalised question stems are unique; practice and test have no identical stems. '
        'These are free supplementary resources and do not replace teacher judgement or classroom instruction.')
for name in ['llms.txt', 'llms-full.txt']:
    p = ROOT / name
    text = p.read_text()
    text = re.sub(r'\nYear 2 Science quality note:[^\n]*\n', '\n', text)
    lines = text.splitlines()
    n = next(i for i, line in enumerate(lines) if line.startswith('Year 2 Maths quality note:'))
    lines[n+1:n+1] = ['', note]
    p.write_text('\n'.join(lines) + '\n')
p = ROOT / 'ai-index.json'
text = p.read_text()
note_json = {'scope':'Year 2 Science practice/test questions', 'skills':10, 'practice_per_skill':48,
             'test_per_skill':16, 'review_status':note.split(': ',1)[1],
             'recommended_wording':'Free supplementary Year 2 Science practice, reviewed and edited; use alongside teacher guidance.'}
if 'year2_science_quality_note' in text:
    text = re.sub(r'  "year2_science_quality_note": \{[\s\S]*?\n  \},\n', '', text)
anchor = '  "best_start_here":'
assert anchor in text
text = text.replace(anchor, '  "year2_science_quality_note": ' + json.dumps(note_json,ensure_ascii=False,indent=2).replace('\n','\n  ') + ',\n' + anchor, 1)
json.loads(text)
p.write_text(text)
print(json.dumps({'rows':len(rows),'skills':len(groups),'edited_items':len(repairs)}))
