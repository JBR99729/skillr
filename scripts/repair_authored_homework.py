#!/usr/bin/env python3
"""Replace identified placeholder homework tasks with reviewed, original questions.

Only the 36 explicitly authored entries in homework-repairs.json are eligible.
Existing navigation, metadata, branding and resource support are preserved.
"""
import html
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
units = {u['code']: u for u in json.loads((ROOT/'data/curriculum-units.json').read_text())['units']}
repairs = json.loads((ROOT/'content-quality/homework-repairs.json').read_text())

for code, pairs in repairs.items():
    assert len(pairs) == 8 and all(len(p) == 2 and all(p) for p in pairs), code
    unit = units[code]
    page = ROOT/unit['worksheetUrl'].strip('/')/'../homework/index.html'
    source = page.read_text()
    heading = re.search(r'<h1[^>]*>([\s\S]*?)</h1>', source)
    title = heading[1] if heading else html.escape(unit.get('title') or code)
    questions = ''
    for i, (question, answer) in enumerate(pairs):
        if i in (0, 4):
            questions += '<h2>' + ('Part A · Check the skill' if i == 0 else 'Part B · Apply and reason') + '</h2>'
        space = 'response-space graph-space' if re.search(r'plot|graph|axes', question, re.I) else 'response-space'
        questions += '<article class="question"><h3>Question '+str(i+1)+'</h3><p>'+html.escape(question)+'</p><div class="'+space+'" aria-label="Space for working and explanation"></div></article>'
    answers = ''.join('<li>'+html.escape(answer)+'</li>' for question,answer in pairs)
    block = ('<!-- authored-homework:start --><section class="lesson-practice homework-practice" id="lesson-practice" data-lesson-code="'+code+'">'
        '<p><strong>SkillrHub · '+code+' · '+html.escape(unit['levelLabel'])+' Maths homework</strong></p><h2>'+title+'</h2>'
        '<p class="print-name">Name: __________________________ Date: ______________</p>'
        '<p>Show your working. For explanations, use the numbers, features or evidence in the question. Check your answers before opening the guide.</p>'
        '<div class="screen-only"><button type="button" data-print-lesson="questions">Print questions</button><button type="button" data-print-lesson="answers">Print questions and answer guide</button></div>'
        +questions+'<details class="answer-key"><summary>Check answers and reasoning</summary><h2>Answer guide · '+code+'</h2><p>Other valid methods and well-supported explanations are welcome.</p><ol>'+answers+'</ol></details></section><!-- authored-homework:end -->')
    if '<!-- authored-homework:start -->' in source:
        source = re.sub(r'<!-- authored-homework:start -->[\s\S]*?<!-- authored-homework:end -->',lambda _:block,source)
    else:
        assert any(marker in source for marker in ('Write a full-mark response', 'State where units, exact form or rounding', 'Write the main rule, formula or strategy needed')), code
        pattern = r'<section class="hw-section"><p class="hw-kicker">Part A</p>[\s\S]*?<section class="hw-task">[\s\S]*?</section>'
        source, count = re.subn(pattern,lambda _:block,source,count=1)
        assert count == 1, code
    source = source.replace('with 10 short-answer questions, 10 long-answer questions and one research task.', 'with eight topic-specific questions, applications and an explained answer guide.')
    source = source.replace('<div><strong>10</strong><br>Short-answer questions</div><div><strong>10</strong><br>Long-answer questions</div><div><strong>1</strong><br>Research/application task</div>', '<div><strong>4</strong><br>Skill questions</div><div><strong>4</strong><br>Application and reasoning questions</div><div><strong>8</strong><br>Explained answers</div>')
    if '/assets/lesson-practice-print.js' not in source:
        source = source.replace('</body>','<script defer src="/assets/lesson-practice-print.js?v=20260906"></script></body>',1)
    if '/assets/lesson-support.css' not in source:
        source = source.replace('</head>','<link rel="stylesheet" href="/assets/lesson-support.css?v=20260906"></head>',1)
    if source != page.read_text(): page.write_text(source)

print(json.dumps({'homework_pages_repaired':len(repairs),'questions_with_explanations':sum(map(len,repairs.values()))}))
