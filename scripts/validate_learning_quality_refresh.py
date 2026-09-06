#!/usr/bin/env python3
"""Check source-copy integrity, resource destinations and the authored answer sets."""
import json
import re
import subprocess
import sys
from pathlib import Path
from urllib.parse import urlsplit
from lxml import html
from build_learning_support import canonical_unit

ROOT = Path(__file__).resolve().parents[1]
units = json.loads((ROOT/'data/curriculum-units.json').read_text())['units']
lessons = json.loads((ROOT/'content-quality/lesson-additions.json').read_text())
lessons.update(json.loads((ROOT/'content-quality/english-lesson-additions.json').read_text()))
homework = json.loads((ROOT/'content-quality/homework-repairs.json').read_text())
elaborations = json.loads((ROOT/'content-quality/year1-elaboration-checks.json').read_text())
counts = dict(topics=0, classroom_copies=0, worksheet_support=0, homework_support=0, lesson_questions=0, repaired_homework_questions=0, shared_pdf_pages=0)

def document(path):
    source=path.read_text()
    return source, html.fromstring(source)

def check_links(element):
    for href in element.xpath('.//a/@href'):
        url=urlsplit(href)
        assert not url.netloc, href
        target=ROOT/url.path.strip('/')
        if target.is_dir(): target=target/'index.html'
        assert target.is_file(), href
        if url.fragment:
            assert html.fromstring(target.read_text()).xpath('//*[@id=$id]',id=url.fragment), href

for unit in units:
    unit=canonical_unit(unit)
    code=unit['code']
    topic=ROOT/unit['url'].strip('/')/'index.html'
    classroom=ROOT/unit['classroomUrl'].strip('/')/'index.html'
    source,doc=document(topic)
    assert classroom.exists(), code
    counts['topics']+=1
    if code in lessons:
        blocks=re.findall(r'<!-- learning-lab:start -->[\s\S]*?<!-- learning-lab:end -->',source)
        assert len(blocks)==1, code
        assert classroom.read_text().count(blocks[0])==1, 'Classroom differs from source: '+code
        block=doc.xpath('//*[@id="reasoning-lab"]')[0]
        assert block.get('data-lesson-code')==code
        assert len(block.xpath('.//details'))==4,code
        assert len(lessons[code]['checks'])==2 and len(lessons[code]['homework'])==2,code
        counts['classroom_copies']+=1
        if code in elaborations:
            assert 'Connect the example back' not in source,code
            vs=classroom.read_text()
            for number in elaborations[code]:
                marker='elaboration-check:'+code+'-'+number
                block=re.search(r'<!-- '+marker+r':start -->[\s\S]*?<!-- '+marker+r':end -->',source)
                assert block and vs.count(block[0])==1,marker
            assert 'Connect the example back' not in vs,code
    worksheet=ROOT/unit['worksheetUrl'].strip('/')/'index.html'
    resources=[worksheet]
    hw=worksheet.parent.parent/'homework/index.html'
    if hw.exists(): resources.append(hw)
    for resource in resources:
        rs,rd=document(resource)
        support=rd.xpath('//*[@id="lesson-support"]')
        assert len(support)==1 and support[0].get('data-lesson-code')==code, str(resource)
        check_links(support[0])
        assert '/assets/lesson-support.css' in rs
        counts['worksheet_support' if resource==worksheet else 'homework_support']+=1
        if resource==worksheet and '/quiz/assets/worksheet-pdf.js' in rs:
            assert '/quiz/assets/worksheet-pdf.js?v=18' in rs,code
            counts['shared_pdf_pages']+=1
        if resource==worksheet and code in lessons:
            practice=rd.xpath('//*[@id="lesson-practice"]')
            assert len(practice)==1 and practice[0].get('data-lesson-code')==code,code
            assert len(practice[0].xpath('.//article[@class="question"]'))==4,code
            assert len(practice[0].xpath('.//details[@class="answer-key"]/ol/li'))==4,code
            assert '/assets/lesson-practice-print.js' in rs,code
            for q,h,a in lessons[code]['checks']: assert q in ''.join(practice[0].itertext()) and a in ''.join(practice[0].itertext()),code
            counts['lesson_questions']+=4
        if resource==hw and code in homework:
            practice=rd.xpath('//*[@id="lesson-practice"]')
            assert len(practice)==1,code
            questions=practice[0].xpath('.//article[@class="question"]/p')
            answers=practice[0].xpath('.//details[@class="answer-key"]/ol/li')
            assert len(questions)==len(answers)==8,code
            for (q,a),qe,ae in zip(homework[code],questions,answers):
                assert q==qe.text_content() and a==ae.text_content(),code
            assert not re.search('10 short-answer questions|10 long-answer questions|Write a full-mark response|Write the main rule, formula or strategy needed',rs),code
            counts['repaired_homework_questions']+=8

for script in ('foundation-english-worksheet-page.js','year2-maths-worksheet-page.js','year3-maths-worksheet-page.js','year4-science-worksheet.js','year5-curriculum-worksheet-page.js'):
    source=(ROOT/'assets'/script).read_text()
    assert 'document.body.innerHTML = `${retainedLessonSupport}${retainedLessonPractice}' in source,script

# This refresh must not change accepted assessment banks or quiz behaviour.
baseline=sys.argv[1] if len(sys.argv)>1 else 'ad1d99697b13c03448f8ebb7ab44e3994add5cea'
changed=subprocess.check_output(['git','diff','--name-only',baseline],cwd=ROOT,text=True).splitlines()
assert not [p for p in changed if re.search(r'/practice/|/test/|/questions\.js$|quiz-engine',p)], 'Protected assessment changed'
print(json.dumps(counts,indent=2))
