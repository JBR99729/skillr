#!/usr/bin/env python3
"""Add original lesson examples and connect F-10 resources to their canonical help.

Run --topics first; review/commit those sources before --resources. This is additive:
it never regenerates an existing topic or infers curriculum answers. Requires lxml.
"""
import argparse
import html as escaping
import json
import re
from pathlib import Path
from lxml import html

ROOT = Path(__file__).resolve().parents[1]
UNITS = json.loads((ROOT / 'data/curriculum-units.json').read_text())['units']
ADDITIONS = json.loads((ROOT / 'content-quality/lesson-additions.json').read_text())
ADDITIONS.update(json.loads((ROOT / 'content-quality/english-lesson-additions.json').read_text()))
ELABORATIONS = json.loads((ROOT / 'content-quality/year1-elaboration-checks.json').read_text())
CSS = '<link rel="stylesheet" href="/assets/lesson-support.css?v=20260906">'
esc = escaping.escape

def put(path, source):
    if path.read_text() != source:
        path.write_text(source)

def with_css(source):
    return source if '/assets/lesson-support.css' in source else source.replace('</head>', CSS + '\n</head>', 1)

def canonical_unit(unit):
    unit = dict(unit)
    original_classroom = unit['url']+'teacher-slides/'
    visited = set()
    while unit['url'] not in visited:
        visited.add(unit['url'])
        source = (ROOT/unit['url'].strip('/')/'index.html').read_text()
        doc = html.fromstring(source)
        refresh = doc.xpath('//meta[translate(@http-equiv,"REFSH","refsh")="refresh"]/@content')
        if not refresh:
            classroom = unit['url']+'teacher-slides/'
            unit['classroomUrl'] = classroom if (ROOT/classroom.strip('/')/'index.html').exists() else original_classroom
            return unit
        match = re.search(r'url\s*=\s*([^\s]+)', refresh[0], re.I)
        if not match or not match[1].startswith('/'): raise ValueError('Unexpected topic redirect: '+unit['code'])
        unit['url'] = match[1].strip('"\'')
    raise ValueError('Topic redirect loop: '+unit['code'])

def elaboration_checks(source, code, canonical_source=None):
    if code not in ELABORATIONS: return source
    def rewrite(match):
        block, number = match[0], match[2]
        marker = 'elaboration-check:'+code+'-'+number
        old = r'(?:<!-- '+marker+r':start -->[\s\S]*?<!-- '+marker+r':end -->)|(?:<p><strong>Learning connection:</strong>[\s\S]*?</p>)'
        if canonical_source is not None:
            copied = re.search(r'<!-- '+marker+r':start -->[\s\S]*?<!-- '+marker+r':end -->',canonical_source)
            replacement = copied[0] if copied else ''
        elif number in ELABORATIONS[code]:
            question, answer = ELABORATIONS[code][number]
            replacement = '<!-- '+marker+':start --><section class="elaboration-check"><p><strong>Try and explain:</strong> '+esc(question)+'</p><details><summary>Answer and teaching point</summary><p>'+esc(answer)+'</p></details></section><!-- '+marker+':end -->'
        else:
            # Keep the cultural elaboration's source text; it is not an
            # automatically generated assessment question in this repository.
            replacement = ''
        return re.sub(old,lambda _:replacement,block,count=1)
    if canonical_source is None:
        pattern = r'(<article class="curriculum-worked-example"><h3>)(E\d+)</h3>[\s\S]*?</article>'
    else:
        pattern = r'(<div class="nested-block"><h3>)(E\d+)</h3>[\s\S]*?(?:<!-- elaboration-check:[^>]+:end -->)?</div>'
    return re.sub(pattern,rewrite,source)

def model_visual(code):
    if code == 'AC9E3LA09':
        return ('<figure><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 580 290" role="img" aria-labelledby="creek-map-title creek-map-desc">'
            '<title id="creek-map-title">Picnic area and bridge</title><desc id="creek-map-desc">A creek runs from the top to the bottom of the map. A picnic area is on its left bank. A dotted walking route leads upstream from the picnic area to a bridge crossing the creek.</desc>'
            '<rect x="1" y="1" width="578" height="288" rx="12" fill="#f5faf3" stroke="#91a784"/>'
            '<path d="M310 20 C280 100 335 175 305 270" fill="none" stroke="#92cbe5" stroke-width="48"/>'
            '<path d="M300 175 L303 207 M295 198 L303 209 L312 199" fill="none" stroke="#225c79" stroke-width="3"/>'
            '<path d="M135 210 L135 83 L357 83" fill="none" stroke="#785116" stroke-width="5" stroke-dasharray="8 6"/>'
            '<rect x="269" y="66" width="75" height="34" fill="#d9bea0" stroke="#62442b" stroke-width="3"/>'
            '<path d="M279 69 V97 M291 69 V97 M303 69 V97 M315 69 V97 M327 69 V97" stroke="#62442b" stroke-width="2"/>'
            '<circle cx="135" cy="210" r="8" fill="#32713d"/>'
            '<g fill="#17243a" font-family="Arial, sans-serif" font-size="17"><text x="28" y="242">Picnic area</text><text x="350" y="83">Bridge</text><text x="351" y="178">Creek</text><text x="352" y="201">Water flows down</text><text x="28" y="37">Dotted line: walking route</text></g></svg>'
            '<figcaption>The words locate the picnic area. The map adds a route to a crossing.</figcaption></figure>')
    if code == 'AC9M1SP01':
        return ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 185" role="img" aria-labelledby="square-turn-title">'
            '<title id="square-turn-title">The same square before and after turning. Its four equal sides and four square corners stay the same.</title>'
            '<rect x="65" y="35" width="85" height="85" fill="#dceafe" stroke="#2457d6" stroke-width="3"/>'
            '<rect x="290" y="35" width="85" height="85" fill="#dceafe" stroke="#2457d6" stroke-width="3" transform="rotate(35 332.5 77.5)"/>'
            '<g fill="#17243a" font-family="Arial, sans-serif" font-size="18"><text x="64" y="164">Before turning</text><text x="283" y="164">After turning</text></g></svg>')
    tables = {
        'AC9M1N01': ('Place values', ['Number', 'Hundreds', 'Tens', 'Ones'], [['97','0','9','7'],['103','1','0','3']]),
        'AC9M1N02': ('Two ways to show 46', ['Representation','Tens','Ones','Total'], [['Before regrouping','4','6','46'],['After opening one ten','3','16','46']]),
        'AC9M1A01': ('Separate stages of the growing pattern', ['Stage','Pairs of blocks','Total'], [['1','●●','2'],['2','●●  ●●','4'],['3','●●  ●●  ●●','6'],['4','●●  ●●  ●●  ●●','8']]),
        'AC9M1N06': ('Twelve counters shared equally', ['Mat 1','Mat 2','Mat 3'], [['● ● ● ●','● ● ● ●','● ● ● ●']]),
        'AC9M1ST01': ('Favourite game responses', ['Game','Tally','Count'], [['Tag','| | |','3'],['Hide-and-seek','|','1'],['Ball game','|','1']]),
        'AC9M1ST02': ('Travel to school: each circle represents one child', ['Method','Children'], [['Walking','● ● ● ●'],['Cycling','● ●']]),
        'AC9S1I04': ('Recorded observations', ['Surface','Distance in equal blocks'], [['Rug','4'],['Board','9']]),
        'AC9S1I05': ('Recorded observations', ['Surface','Distance in equal blocks'], [['Board','8'],['Rug','5']])
    }
    if code not in tables: return ''
    caption, heads, rows = tables[code]
    return '<table><caption>' + esc(caption) + '</caption><thead><tr>' + ''.join('<th scope="col">'+esc(h)+'</th>' for h in heads) + '</tr></thead><tbody>' + ''.join('<tr>'+''.join('<td>'+esc(v)+'</td>' for v in row)+'</tr>' for row in rows) + '</tbody></table>'

def lab(code, a):
    checks = ''.join('<li><p>'+esc(q)+'</p><details><summary>Hint</summary><p>'+esc(h)+'</p></details><details><summary>Answer and explanation</summary><p>'+esc(ans)+'</p></details></li>' for q,h,ans in a['checks'])
    return ('<!-- learning-lab:start -->\n<section class="lesson-lab" id="reasoning-lab" data-lesson-code="'+code+'">'
      '<h3>'+esc(a['title'])+'</h3><p>'+esc(a['goal'])+'</p><div class="lesson-model"><h4>Worked example</h4><p>'+esc(a['model'])+'</p>'+model_visual(code)+'<ol>'+''.join('<li>'+esc(s)+'</li>' for s in a['steps'])+'</ol></div>'
      '<p class="lesson-mistake"><strong>Watch for this mistake:</strong> '+esc(a['mistake'])+'</p><h4>Try it, then explain</h4><ol>'+checks+'</ol></section>\n<!-- learning-lab:end -->')

def insert_at_model(source, addition, code):
    # The 25 explicit additions all have this existing static section. Insert only
    # inside its authored body, without serialising or replacing the full page.
    match = re.search(r'<details\b[^>]*>\s*<summary\b[^>]*>(?:<strong>)?Concept model and worked application(?:</strong>)?</summary>[\s\S]*?</details>',source)
    if not match:
        if code.startswith('AC9E'):
            # Add a bounded authored section; preserve the established lesson.
            return source.replace('</main>','<details class="curriculum-topic-section"><summary><strong>Worked example and reasoning checks</strong></summary><div class="curriculum-detail-body">'+addition+'</div></details>\n</main>',1)
        raise ValueError('Missing expected Year 1 model section: '+code)
    pos = match.end()-len('</details>')
    return source[:pos]+addition+source[pos:]

def choose_help(source):
    doc = html.fromstring(source)
    if doc.xpath('//*[@id="reasoning-lab"]'): return 'reasoning-lab', 'Worked example and reasoning checks'
    candidates = []
    for el in doc.xpath('//main//details | //main//section | //main//article'):
        heading = el.xpath('./summary | ./h2 | ./h3')
        if not heading: continue
        title = ' '.join(heading[0].itertext()).strip()
        if re.search(r'worked|modelled|concept model|key examples|teach it|see the numbers|explicit teaching',title,re.I):
            candidates.append((el,title))
    if not candidates:
        return '', 'Topic explanation'
    el,title = candidates[0]
    return el.get('id') or '', title

def support(unit, source):
    anchor,title = choose_help(source)
    goal = ADDITIONS.get(unit['code'],{}).get('goal')
    if not goal:
        doc=html.fromstring(source)
        for el in doc.xpath('//main//details'):
            heading=' '.join(el.xpath('./summary//text()')).lower()
            if re.search('what.*learn|learning goal|key concept|outcome overview',heading):
                for p in el.xpath('.//p'):
                    t=' '.join(' '.join(p.itertext()).split())
                    if 45<=len(t)<=380 and not re.search('routine|curriculum code|learning target',t,re.I): goal=t;break
                if goal:break
    if not goal: goal=unit['description'].rstrip('.')+'.'
    href=unit['url']+('#'+anchor if anchor else '')
    return ('<!-- lesson-support:start --><aside class="lesson-support" id="lesson-support" data-lesson-code="'+unit['code']+'" aria-label="Help for this skill"><p><strong>'+unit['code']+' · Before you begin</strong></p><p>'+esc(goal)+'</p><p><a href="'+href+'">'+esc(title)+'</a> · <a href="'+unit['classroomUrl']+'">Classroom View</a></p></aside><!-- lesson-support:end -->')

def worksheet(unit):
    a=ADDITIONS[unit['code']]
    pairs=[(q,ans) for q,h,ans in a['checks']]+a['homework']
    questions=''.join('<article class="question"><h3>'+str(i+1)+'. '+('Try the skill' if i<2 else 'Apply and explain')+'</h3><p>'+esc(q)+'</p><div class="response-space" aria-label="Space for your answer"></div></article>' for i,(q,ans) in enumerate(pairs))
    key=''.join('<li>'+esc(ans)+'</li>' for q,ans in pairs)
    instruction='Show your thinking with objects, drawings or words. An adult may read the instructions aloud.' if unit['yearNumber']<=2 else 'Explain your choices using evidence from the example. Give reasons where requested.'
    return ('<!-- lesson-practice:start --><section class="lesson-practice" id="lesson-practice" data-lesson-code="'+unit['code']+'"><p><strong>SkillrHub · '+unit['code']+' · '+unit['levelLabel']+'</strong></p><h2>'+esc(a['title'])+'</h2><p class="print-name">Name: __________________________ Date: ______________</p><p>'+instruction+'</p><div class="screen-only"><button type="button" data-print-lesson="questions">Print lesson practice</button><button type="button" data-print-lesson="answers">Print with answer guide</button><p>Use the first two questions in class and the last two for homework or independent practice.</p></div>'+questions+'<details class="answer-key"><summary>Check answers and explanations</summary><h2>Answer guide · '+unit['code']+'</h2><ol>'+key+'</ol><p><strong>If help is needed:</strong> '+esc(a['mistake'])+'</p></details></section><!-- lesson-practice:end -->')

def main():
    parser=argparse.ArgumentParser();parser.add_argument('--topics',action='store_true');parser.add_argument('--resources',action='store_true');args=parser.parse_args()
    rows=[]; updated=0
    for u in UNITS:
        u=canonical_unit(u)
        p=ROOT/u['url'].strip('/')/'index.html';s=p.read_text()
        if args.topics and u['code'] in ADDITIONS:
            addition=lab(u['code'],ADDITIONS[u['code']])
            if '<!-- learning-lab:start -->' in s: s=re.sub(r'<!-- learning-lab:start -->[\s\S]*?<!-- learning-lab:end -->',lambda _:addition,s)
            else: s=insert_at_model(s,addition,u['code'])
            if u['code']=='AC9M1N01':s=s.replace('Read the tens first, then ones.','Compare the largest place first: hundreds, then tens, then ones.')
            if u['code']=='AC9S1I05':s=s.replace('<span>same object</span><span>same surface</span><span>same start</span><span>change one thing</span>','<span>choose what changes</span><span>keep other relevant conditions alike</span><span>compare what happens</span>')
            if u['code']=='AC9M1A01':
                s=s.replace('Patterns can use numbers, symbols, shapes or objects if the rule repeats.','Growing patterns can use numbers, symbols, shapes or objects. Show the same increase between each stage.')
                s=s.replace('<strong>Model:</strong> ●●  ●●  ●●</p>','<strong>Model:</strong> Stage 1: ●●; Stage 2: ●● ●●; Stage 3: ●● ●● ●●</p>')
            s=elaboration_checks(s,u['code'])
            put(p,with_css(s));updated+=1
        if not args.resources: continue
        # Classroom content is copied only from the committed topic source.
        v=ROOT/u['classroomUrl'].strip('/')/'index.html'
        if u['code'] in ADDITIONS:
            source_match=re.search(r'<!-- learning-lab:start -->[\s\S]*?<!-- learning-lab:end -->',s)
            if not source_match:raise ValueError('Run/commit --topics first: '+u['code'])
            vs=v.read_text(); addition=source_match[0]
            if '<!-- learning-lab:start -->' in vs:vs=re.sub(r'<!-- learning-lab:start -->[\s\S]*?<!-- learning-lab:end -->',lambda _:addition,vs)
            else:
                m=re.search(r'<details[^>]*><summary><span>Elaboration examples</span>[\s\S]*?</details>',vs)
                if not m:
                    if not u['code'].startswith('AC9E'): raise ValueError('Missing authored classroom examples: '+u['code'])
                    m=re.search(r'<details[^>]*><summary><span>[^<]*(?:example|Example|Teach|Learning)[^<]*</span>[\s\S]*?</details>',vs)
                if m:
                    pos=m.end()-len('</details>');vs=vs[:pos]+addition+vs[pos:]
                else:
                    vs=vs.replace('</main>','<details><summary><span>Worked example and reasoning checks</span></summary><div class="panel">'+addition+'</div></details></main>',1)
            if u['code']=='AC9M1N01':vs=vs.replace('Read the tens first, then ones.','Compare the largest place first: hundreds, then tens, then ones.')
            if u['code']=='AC9S1I05':vs=vs.replace('<span>same object</span><span>same surface</span><span>same start</span><span>change one thing</span>','<span>choose what changes</span><span>keep other relevant conditions alike</span><span>compare what happens</span>')
            if u['code']=='AC9M1A01':
                vs=vs.replace('Patterns can use numbers, symbols, shapes or objects if the rule repeats.','Growing patterns can use numbers, symbols, shapes or objects. Show the same increase between each stage.')
                # The committed source already contains the complete replacement.
                vs=vs.replace('<strong>Model:</strong> ●●  ●●  ●●</p>','<strong>Model:</strong> Stage 1: ●●; Stage 2: ●● ●●; Stage 3: ●● ●● ●●</p>')
            vs=elaboration_checks(vs,u['code'],s)
            put(v,with_css(vs))
        w=ROOT/u['worksheetUrl'].strip('/')/'index.html'
        resources=[w];h=w.parent.parent/'homework/index.html'
        if h.exists():resources.append(h)
        for resource in resources:
            rs=resource.read_text(); block=support(u,s)
            rs=re.sub(r'<!-- lesson-support:start -->[\s\S]*?<!-- lesson-support:end -->','',rs)
            # Must precede scripts: some legacy worksheet renderers replace the
            # body synchronously and preserve this authored fragment first.
            rs=re.sub(r'(<body\b[^>]*>)',lambda m:m[1]+block,rs,count=1)
            if resource==w and u['code'] in ADDITIONS:
                ws=worksheet(u)
                if '<!-- lesson-practice:start -->' in rs:rs=re.sub(r'<!-- lesson-practice:start -->[\s\S]*?<!-- lesson-practice:end -->',lambda _:ws,rs)
                else:rs=rs.replace('</main>',ws+'</main>',1)
                rs=re.sub(r'<script defer src="/assets/lesson-practice-print\.js[^\"]*"></script>','',rs)
                rs=rs.replace('</head>','<script defer src="/assets/lesson-practice-print.js?v=20260906"></script></head>',1)
            put(resource,with_css(rs))
        rows.append({'code':u['code'],'year':u['yearNumber'],'subject':u['subjectSlug'],'topic':str(p.relative_to(ROOT)),'classroom':str(v.relative_to(ROOT)),'resources':[str(r.relative_to(ROOT)) for r in resources],'newAuthoredLesson':u['code'] in ADDITIONS,'reviewScope':'resource structure and source links; new additions checked separately; not a full IXL-equivalence or curriculum-content certification'})
    if args.resources:
        report=ROOT/'reports/learning-quality-rollout.json';report.parent.mkdir(exist_ok=True)
        report.write_text(json.dumps({'topicsInventoried':len(rows),'newAuthoredLessons':len(ADDITIONS),'newElaborationChecks':sum(map(len,ELABORATIONS.values())),'resourcesConnected':sum(len(x['resources']) for x in rows),'rows':rows},indent=2)+'\n')
    print(json.dumps({'topic_additions':updated,'resources_audited':len(rows)}))

if __name__=='__main__':main()
