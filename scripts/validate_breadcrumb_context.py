#!/usr/bin/env python3
"""Validate complete topic breadcrumbs and preservation of all original content."""
import argparse
import collections
import json
import re
import subprocess
from pathlib import Path
from lxml import html
from audit_topic_navigation import ROOT, audit, schemas

def cleaned(source):
    doc=html.fromstring(source)
    for node in doc.xpath('//details[@id="curriculum-context"] | //div[@class="verified-curriculum-context"] | //nav[contains(translate(@aria-label,"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"breadcrumb")]'):
        node.drop_tree()
    return doc

def words(doc):return ' '.join(' '.join(doc.itertext()).split())

def main():
    ap=argparse.ArgumentParser();ap.add_argument('baseline');args=ap.parse_args()
    snapshot=audit();topics=[r for r in snapshot['pages'] if 'code' in r]
    assert len(topics)==676,len(topics)
    assert not snapshot['summary']['eligible_navigation_findings'],snapshot['summary']
    assert not snapshot['summary']['excluded_navigation_findings'],snapshot['summary']
    assert not snapshot['summary']['topics_with_under_two_related'],snapshot['summary']
    for row in topics:
        source=(ROOT/row['path']).read_text();doc=html.fromstring(source)
        expected=['/',f'/{row["year"]}/',f'/{row["year"]}/curriculum/{row["subject"]}/']
        crumbs=doc.xpath('//nav[contains(translate(@aria-label,"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"breadcrumb")]')
        assert len(crumbs)==1,row['code']
        actual=crumbs[0].xpath('.//a/@href')
        positions=[actual.index(h) for h in expected]
        assert positions==sorted(positions),(row['code'],actual)
        lists=[]
        for node in doc.xpath('//script[@type="application/ld+json"]'):
            lists.extend(schemas(json.loads(node.text or '{}')))
        assert len(lists)==1,row['code']
        items=lists[0]['itemListElement']
        assert [x['position'] for x in items]==list(range(1,len(items)+1)),row['code']
        urls=[x.get('item',{}).get('@id') if isinstance(x.get('item'),dict) else x.get('item') for x in items]
        full=['https://skillrhub.com'+h for h in expected]
        canonical=doc.xpath('string(//head/link[@rel="canonical"]/@href)')
        # A real strand level between subject and topic is useful and valid.
        assert urls[:3]==full and urls[-1]==canonical,(row['code'],urls)
        for intermediate in urls[3:-1]:
            assert intermediate.startswith(full[-1]+'#'),(row['code'],intermediate)
            hub=html.parse(str(ROOT/expected[-1].strip('/')/'index.html'))
            assert hub.xpath('//*[@id=$id]',id=intermediate.split('#',1)[1]),(row['code'],intermediate)
    changed=subprocess.check_output(['git','diff','--name-only',args.baseline],cwd=ROOT,text=True).splitlines()
    checked=0
    for rel in changed:
        if not any(r['path']==rel for r in topics):continue
        original=subprocess.check_output(['git','show',args.baseline+':'+rel],cwd=ROOT,text=True)
        candidate=(ROOT/rel).read_text()
        before=cleaned(original);after=cleaned(candidate)
        assert words(before)==words(after),'Teaching text changed: '+rel
        assert before.xpath('//h1/text()')==after.xpath('//h1/text()'),'H1 changed: '+rel
        assert before.xpath('//head/title/text()')==after.xpath('//head/title/text()'),'Title changed: '+rel
        for xpath in ['//details/summary','//h2','//h3']:
            assert [words(n) for n in before.xpath(xpath)]==[words(n) for n in after.xpath(xpath)],'Section inventory changed: '+rel
        links=lambda d:collections.Counter((a.get('href'),words(a)) for a in d.xpath('//a[@href]'))
        assert links(before)==links(after),'Existing activity/resource links changed: '+rel
        for xpath in ['//head/link[@rel="canonical"]/@href','//head/meta[@name="robots"]/@content','//script[@src]/@src']:
            assert before.xpath(xpath)==after.xpath(xpath),'Metadata/runtime changed: '+rel
        checked+=1
    context=json.loads((ROOT/'data/verified-curriculum-context.json').read_text())
    for code in context['topics']:
        row=next(r for r in topics if r['code']==code)
        d=html.parse(str(ROOT/row['path']))
        assert len(d.xpath('//div[@class="verified-curriculum-context"]'))==1,code
    print(json.dumps({'topics':len(topics),'content_preservation_pages':checked,'comparison_notes':len(context['topics']),'navigation_findings':0,'breadcrumb_hierarchies_and_schemas':'pass','protected_content_and_activity_links':'pass'},indent=2))

if __name__=='__main__':main()
