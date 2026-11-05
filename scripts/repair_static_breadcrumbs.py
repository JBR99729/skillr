#!/usr/bin/env python3
"""Complete static curriculum breadcrumb paths, preserving all teaching content."""
import argparse
import json
import re
from pathlib import Path
from lxml import html
from audit_topic_navigation import ROOT, audit

def without_comments(source):
    return re.sub(r'<!--[\s\S]*?-->',lambda m:re.sub(r'[^\n]',' ',m.group()),source)

def main():
    ap=argparse.ArgumentParser();ap.add_argument('--write',action='store_true');ap.add_argument('--evidence',required=True);args=ap.parse_args()
    topics=[r for r in audit()['pages'] if 'code' in r]
    changed=[]
    for row in topics:
        code=row['code'];p=ROOT/row['path'];original=p.read_text();source=original
        d=html.fromstring(source)
        nodes=d.xpath('//nav[contains(translate(@aria-label,"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"breadcrumb")]')
        expected=['/',f'/{row["year"]}/',f'/{row["year"]}/curriculum/{row["subject"]}/']
        current=[a.get('href') for n in nodes for a in n.xpath('.//a[@href]')]
        if not all(h in current for h in expected) or len(nodes)!=1:
            assert len(nodes)<=1,code
            year='Foundation' if row['year']=='foundation' else 'Year '+row['year'][4:]
            crumb=(f'<nav class="breadcrumb skillr-topic-breadcrumb" aria-label="Breadcrumb"><ol>'
                   f'<li><a href="/">Home</a></li><li><a href="/{row["year"]}/">{year}</a></li>'
                   f'<li><a href="{expected[2]}">{row["subject"].capitalize()}</a></li>'
                   f'<li aria-current="page">{code}</li></ol></nav>')
            if nodes:
                pattern=r'<nav\b(?=[^>]*aria-label=["\']Breadcrumb["\'])[^>]*>[\s\S]*?</nav>'
                matches=list(re.finditer(pattern,without_comments(source),re.I))
                assert len(matches)==1,code
                m=matches[0];source=source[:m.start()]+crumb+source[m.end():]
            else:
                m=re.search(r'</header>',without_comments(source),re.I)
                assert m,code
                source=source[:m.end()]+'\n'+crumb+source[m.end():]
        if source!=original:
            css='/assets/css/topic-learning-paths.css'
            if css not in source:
                source=re.sub(r'</head>',lambda _:f'<link rel="stylesheet" href="{css}">\n</head>',source,count=1,flags=re.I)
            assert html.fromstring(source).xpath('string(//head/title)')==row['title'],code
            changed.append({'code':code,'path':row['path'],'added_visible_breadcrumb':not nodes})
            if args.write:p.write_text(source)
    result={'mode':'write' if args.write else 'check','changes':changed}
    Path(args.evidence).write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps({'mode':result['mode'],'changed_pages':len(changed),'new_visible_breadcrumbs':sum(r['added_visible_breadcrumb'] for r in changed)},indent=2))

if __name__=='__main__':main()
