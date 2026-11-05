#!/usr/bin/env python3
"""Add source-linked, explicitly partial curriculum comparisons to reviewed pages."""
import argparse
import json
import re
from html import escape
from pathlib import Path
from audit_topic_navigation import ROOT, audit
from repair_static_breadcrumbs import without_comments
from lxml import html

START='<!-- skillr-verified-curriculum-context:start -->'
END='<!-- skillr-verified-curriculum-context:end -->'

def before_main_end(source, block, code):
    matches=list(re.finditer(r'</main>',without_comments(source),re.I))
    assert matches and len(html.fromstring(source).xpath('//main'))==1,code
    original_text=' '.join(' '.join(html.fromstring(source).xpath('//main')[0].itertext()).split())
    for match in reversed(matches):
        pos=match.start();updated=source[:pos]+block+source[pos:]
        parsed=html.fromstring(updated);added=parsed.xpath('//main//div[@class="verified-curriculum-context"]')
        if len(added)!=1:continue
        section=added[0]
        if section.getparent().get('id')=='curriculum-context':section=section.getparent()
        elif section.getparent().getparent() is not None and section.getparent().getparent().get('id')=='curriculum-context':section=section.getparent().getparent()
        section.drop_tree()
        remaining=' '.join(' '.join(parsed.xpath('//main')[0].itertext()).split())
        if remaining==original_text:return updated
    raise AssertionError('No content-preserving insertion point: '+code)

def main():
    ap=argparse.ArgumentParser();ap.add_argument('--write',action='store_true');args=ap.parse_args()
    evidence=json.loads((ROOT/'data/verified-curriculum-context.json').read_text())
    topics={r['code']:r for r in audit()['pages'] if 'code' in r}
    changed=[]
    for code,item in evidence['topics'].items():
        assert code in topics,code
        row=topics[code];p=ROOT/row['path'];source=p.read_text()
        assert code.startswith('AC9M'),code
        url=evidence['sources'][item['source']]+f'#page={item["page"]}'
        legacy=', '.join(item['v84'])
        paragraphs=[f'<p><strong>Australian Curriculum v8.4 to v9.0:</strong> '+
            (f'Related v8.4 content: {escape(legacy)}. ' if legacy else '')+
            escape(item['note'])+f' <a data-curriculum-reference="true" href="{escape(url,quote=True)}">Read QCAA’s year-level comparison</a>.</p>']
        for page in item.get('additional_pages',[]):
            extra=evidence['sources'][item['source']]+f'#page={page}'
            paragraphs.append(f'<p><a data-curriculum-reference="true" href="{escape(extra,quote=True)}">QCAA implementation considerations, page {page}</a>.</p>')
        for mapping in item.get('international',[]):
            paragraphs.append(f'<p><strong>{escape(mapping["label"])}:</strong> {escape(mapping["note"])} '
                f'<a href="{escape(evidence["sources"][mapping["source"]],quote=True)}">Official curriculum reference</a>.</p>')
        paragraphs.append('<p>These references support planning across curricula. They do not mean that every requirement, teaching method or assessment is identical. This lesson follows its Australian Curriculum v9.0 code.</p>')
        block=START+'\n<div class="verified-curriculum-context">'+''.join(paragraphs)+'</div>\n'+END
        if START in source:
            updated,n=re.subn(re.escape(START)+r'[\s\S]*?'+re.escape(END),lambda _:block,source,count=1)
            assert n==1,code
        else:
            # Extend an existing active mapping disclosure when present; historical
            # HTML preserved in comments is deliberately ignored.
            pattern=r'<details\b[^>]*\bid=["\']curriculum-equivalents["\'][^>]*>[\s\S]*?</summary>'
            found=re.search(pattern,without_comments(source),re.I)
            if found:
                pos=found.end();updated=source[:pos]+'\n'+block+source[pos:]
            else:
                disclosure='<details class="curriculum-topic-section" id="curriculum-context"><summary><strong>Curriculum versions and related standards</strong></summary><div class="curriculum-detail-body">'+block+'</div></details>'
                updated=before_main_end(source,'\n'+disclosure+'\n',code)
        stylesheet='/assets/css/topic-learning-paths.css'
        if stylesheet not in updated:
            updated=re.sub(r'</head>',lambda _:f'<link rel="stylesheet" href="{stylesheet}">\n</head>',updated,count=1,flags=re.I)
        if updated!=source:
            changed.append(code)
            if args.write:p.write_text(updated)
    print(json.dumps({'mode':'write' if args.write else 'check','changed_pages':len(changed),'codes':changed},indent=2))

if __name__=='__main__':main()
