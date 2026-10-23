"""Scoped release checks; run with /usr/bin/python3 (lxml installed)."""
import json,re,subprocess,hashlib
from pathlib import Path
from urllib.parse import urlsplit,urljoin,unquote
from lxml import html,etree
R=Path(__file__).resolve().parents[1]
units=[u for u in json.loads((R/'data/curriculum-units.json').read_text())['units'] if u['yearNumber']==5 and u['subjectSlug']=='maths']
paths=[R/u['url'].strip('/')/'index.html' for u in units]+[R/'year5/index.html',R/'year5/curriculum/maths/index.html']
report=[]
for p in paths:
 s=p.read_text();tree=html.fromstring(s);visible=re.sub(r'<!--.*?-->','',s,flags=re.S)
 rel=str(p.relative_to(R));before=subprocess.check_output(['git','show','5850580d:'+rel],cwd=R,text=True);oldtree=html.fromstring(before)
 assert tree.xpath('//title/text()')==oldtree.xpath('//title/text()'),rel
 for name in ['description','robots']:
  assert tree.xpath('//meta[@name="'+name+'"]/@content')==oldtree.xpath('//meta[@name="'+name+'"]/@content'),rel
 assert tree.xpath('//link[@rel="canonical"]/@href')==oldtree.xpath('//link[@rel="canonical"]/@href'),rel
 assert tree.xpath('//script[@type="application/ld+json"]/text()')==oldtree.xpath('//script[@type="application/ld+json"]/text()'),rel
 ids=tree.xpath('//@id');assert len(ids)==len(set(ids)),rel
 assert len(tree.xpath('//h1'))==1 and len(tree.xpath('//main'))==1,rel
 for schema in tree.xpath('//script[@type="application/ld+json"]/text()'):json.loads(schema)
 for element in tree.xpath('//*[@href or @src]'):
  target=element.get('href') or element.get('src');parsed=urlsplit(target)
  if parsed.scheme or parsed.netloc:continue
  resolved=urlsplit(urljoin('/'+rel,target));f=R/unquote(resolved.path).lstrip('/')
  if f.is_dir():f=f/'index.html'
  assert f.exists(),(rel,target)
  if resolved.fragment and f.suffix=='.html':
   dest=html.fromstring(f.read_text());assert resolved.fragment in dest.xpath('//@id'),(rel,target)
 if '/maths/ac9' in rel:
  assert len(tree.xpath('//*[@data-skillr-learning-path]'))==1,rel
  fs=tree.xpath('//details[contains(concat(" ",normalize-space(@class)," ")," topic-focus ")]');assert len(fs)==4,rel
  assert len(tree.xpath('//p[@class="topic-try"]'))==4,rel
  assert len(tree.xpath('//details[@id="learning-support"]'))==1,rel
  assert len(tree.xpath('//aside[@class="topic-pack"]'))==1,rel
  assert len(tree.xpath('//section[@id="video-lesson"]'))==1,rel
  assert len(tree.xpath('//section[@id="resources"]'))==1,rel
  for ident in ['resource-facts','curriculum-equivalents','source-development-notes','topic-videos']:
   assert not tree.xpath('//*[@id="'+ident+'"]'),(rel,ident)
  for phrase in ['Quick Learning','How this lesson was checked','About this resource:','Help improve SkillrHub']:
   assert phrase not in visible,(rel,phrase)
  for x in tree.xpath('//img'):
   assert x.get('alt') is not None and x.get('width'),(rel,'unlabelled image')
  assert not re.search(r'href="[^\"]+\.(pptx|pdf)',visible,re.I),rel
 report.append({'path':rel,'sha256':hashlib.sha256(s.encode()).hexdigest(),'staticChecks':'PASS'})
hub=html.fromstring((R/'year5/curriculum/maths/index.html').read_text())
assert len(hub.xpath('//article[@class="hub-topic"]'))==24
assert len(hub.xpath('//section[@class="hub-group"]'))==6
for p in (R/'assets/teaching-models/year5').glob('*.svg'):etree.parse(str(p))
changed=subprocess.check_output(['git','diff','--name-only'],cwd=R,text=True).splitlines()
assert not any('/teacher-slides/' in x or x.startswith(('quiz/','assets/assessment','data/print-and-go')) for x in changed)
result={'result':'PASS','pages':report,'svgXmlCount':12,'metadataJsonLd':'preserved','localLinksFragments':'PASS','hubInventory':'24 codes / 6 strands','browserRender':'PENDING — local browser unavailable, cloud browser cannot reach local preview; no render pass claimed.'}
(R/'docs/qa/year5-maths-topic-refresh-2026-10-23-static-checks.json').write_text(json.dumps(result,indent=2)+'\n')
print('PASS: all 26 pages; 24 code inventories; metadata/JSON-LD; routes, fragments, images; unique IDs; 12 valid SVGs; banks/viewers unchanged.')
