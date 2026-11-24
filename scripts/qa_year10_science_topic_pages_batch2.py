#!/usr/bin/env python3
"""Scoped static/preservation QA for the nine illustrated Year 10 Science pages."""
import sys,json,re,subprocess,hashlib
from pathlib import Path
from urllib.parse import urljoin,urlparse,parse_qs,unquote
from lxml import html
ROOT=Path(__file__).resolve().parents[1];Q=ROOT/'docs/qa/year10-science-topic-pages-batch2-20261109';inventory=json.loads((Q/'inventory.json').read_text());base=sys.argv[1]
assert len(inventory)==9
tracked=set(subprocess.check_output(['git','ls-tree','-r','--name-only',base],cwd=ROOT,text=True).splitlines())
clean=lambda e:' '.join(e.text_content().split())
count=0;images=0;disclosures=0
for item in inventory:
 code=item['code'];path=item['path'];source=(ROOT/path).read_text();doc=html.fromstring(source);before=html.fromstring(subprocess.check_output(['git','show',base+':'+path],cwd=ROOT,text=True))
 assert len(doc.xpath('//script[contains(@src,"/pwa-register.js")]'))==1,code+' shared loader';assert len(doc.xpath('//main'))==1,code+' main';assert len(doc.xpath('//h1'))==1,code+' h1';assert code in doc.xpath('//h1')[0].text_content()
 for selector,attr in [('title',None),('meta[@name="description"]','content'),('meta[@name="robots"]','content'),('link[@rel="canonical"]','href')]:
  a=doc.xpath('//head/'+selector)[0];b=before.xpath('//head/'+selector)[0];assert (a.text if attr is None else a.get(attr))==(b.text if attr is None else b.get(attr)),code+' '+selector
 oldld=[json.loads(e.text) for e in before.xpath('//script[@type="application/ld+json"]')];newld=[json.loads(e.text) for e in doc.xpath('//script[@type="application/ld+json"]')];assert oldld==newld,code+' structured metadata'
 baseline=before.xpath('//main//details[not(ancestor::details)]');sections=doc.xpath('//*[contains(concat(" ",@class," ")," retained-teaching ")]/details');assert len(sections)==item['retained_section_count']
 for label,current in zip(item['retained_sections'],sections):
  previous=next(e for e in baseline if clean(e.find('summary'))==label)
  for nav in previous.xpath('.//*[@data-learning-navigation-links]'):nav.getparent().remove(nav)
  for addition in json.loads((Q/'retained-additions.json').read_text()):
   if addition['code']==code and addition['section']==label:previous.append(html.fromstring(addition['html']))
  expected=clean(previous)
  for repair in json.loads((Q/'retained-corrections.json').read_text()):
   if repair['code']==code and repair['section']==label:
    assert expected.count(repair['before'])==1,code+' repair identity'
    expected=expected.replace(repair['before'],repair['after'])
  assert clean(current)==expected,code+' teaching preservation: '+label;count+=1
  old_images=previous.xpath('.//img');new_images=current.xpath('.//img');assert len(old_images)==len(new_images),code+' retained image count'
  for old_img,new_img in zip(old_images,new_images):
   expected_attributes=dict(old_img.attrib)
   for repair in json.loads((Q/'retained-visual-corrections.json').read_text()):
    if repair['code']==code and repair['old']==old_img.get('src'):
     expected_attributes.update(src=repair['new'],alt=repair['alt'])
   expected_attributes['class']=(expected_attributes.get('class','')+' art').strip()
   assert dict(new_img.attrib)==expected_attributes,code+' retained visual identity: '+old_img.get('src')
 assert len(doc.xpath('//div[@class="steps"]/article'))==3,code+' steps'
 assert clean(doc.xpath('//div[@class="hero"]//p[@class="kicker"]')[0])=='YEAR 10 SCIENCE',code+' visible year label'
 assert len(doc.xpath('//section[contains(@class,"tricky-questions")]/details'))==3,code+' tricky questions'
 ids=doc.xpath('//@id');assert len(ids)==len(set(ids)),code+' duplicate ids'
 for value in doc.xpath('//@*')+doc.xpath('//style/text()'):
  for target in re.findall(r'url\(#([^)]*)\)',value):assert target in ids,code+' missing SVG/style reference '+target
 for e in doc.xpath('//*[@aria-labelledby or @aria-describedby]'):
  for attr in ['aria-labelledby','aria-describedby']:
   for target in e.get(attr,'').split():assert target in ids,code+' missing ARIA '+target
 for e in doc.xpath('//details'):
  assert len(e.xpath('./summary'))==1,code+' unnamed disclosure';disclosures+=1
 for a in doc.xpath('//a[@href]'):
  u=urlparse(urljoin(item['canonical'],a.get('href')))
  if u.path=='/learn/':assert parse_qs(u.query)=={'year':['10'],'subject':['science']},code+' wrong catalogue navigation'
  if u.hostname in ['skillrhub.com','www.skillrhub.com']:
   f=unquote(u.path.lstrip('/'))+('index.html' if u.path.endswith('/') else '')
   assert (ROOT/f).is_file() or f in tracked,code+' broken route '+f
   if u.path==urlparse(item['canonical']).path and u.fragment:assert unquote(u.fragment) in ids,code+' broken fragment '+u.fragment
 for img in doc.xpath('//img'):
  assert img.get('alt','').strip(),code+' missing alt';u=urlparse(urljoin(item['canonical'],img.get('src')))
  if u.hostname=='skillrhub.com':assert (ROOT/u.path.lstrip('/')).is_file(),code+' missing image '+u.path
  images+=1
 entrance=doc.xpath('//a[@id="skillr-topic-practice-now"]');assert len(entrance)==1
 u=urlparse(entrance[0].get('href'));params=parse_qs(u.query)
 assert u.netloc=='app.skillrhub.com' and params=={'try':['1'],'year':['10'],'subject':['science'],'returnTo':[item['canonical']]},code+' catalogue destination'
 assert not doc.xpath('//a[contains(@href,"skill=") or contains(@href,"assessment=")]'),code+' unpublished bank advertised'
 assert len(doc.xpath('//*[@data-learning-navigation-links]'))==1,code+' return navigation'
 assert hashlib.sha256((ROOT/path).read_bytes()).hexdigest()==item['sha256'],code+' fingerprint'
 assert not doc.xpath('//details[@id="resource-facts" or @id="curriculum-equivalents"]'),code+' legacy panel'
plan=json.loads((Q/'retained-inventory-plan.json').read_text())
for item in inventory:
 doc=html.fromstring((ROOT/item['path']).read_text())
 expected=plan['retained_sections'][item['code']]
 actual=[clean(e.find('summary')) for e in doc.xpath('//div[@class="retained-teaching"]/details | //details[@id="topic-guide"]/details')]
 assert actual==expected,item['code']+' approved retained-section inventory'
 assert len(doc.xpath('//main//details[@class="curriculum-topic-section"]'))==16,item['code']+' exactly16 locked macro sections'
# Check the reviewed authoring record against the actual shipped text, not counts alone.
def strings(value):
 if isinstance(value,str):yield value
 elif isinstance(value,dict):
  for child in value.values():yield from strings(child)
 elif isinstance(value,list):
  for child in value:yield from strings(child)
for authored in json.loads((Q/'page-content.json').read_text()):
 item=next(x for x in inventory if x['code']==authored['code']);doc=html.fromstring((ROOT/item['path']).read_text());text=clean(doc)
 for field in strings(authored):
  expected=clean(html.fromstring('<div>'+field+'</div>')) if '<' in field else ' '.join(field.split())
  assert expected in text,authored['code']+' authored field absent from HTML: '+field[:70]
 baseline=html.fromstring(subprocess.check_output(['git','show',base+':'+item['path']],cwd=ROOT,text=True))
 assert [dict(e.attrib) for e in doc.xpath('//head/meta')]==[dict(e.attrib) for e in baseline.xpath('//head/meta')],authored['code']+' all meta attribute preservation'
for code,path in [(i['code'],i['path']) for i in inventory]:
 source=(ROOT/path).read_text();models=re.findall(r'<svg\b.*?</svg>',source,re.S)
 records=[m for m in json.loads((Q/'artwork-and-evidence.json').read_text())['models'] if m['code']==code]
 assert len(models)==len(records),code+' model manifest count'
 for i,m in enumerate(models):assert hashlib.sha256(m.encode()).hexdigest()==records[i]['literal_svg_sha256'],code+' literal model identity'
def svg_identity(svg):
 import copy
 e=copy.deepcopy(svg)
 for n in e.iter():
  n.tag=n.tag.lower();attrs={k.lower():v.replace('retained-','') for k,v in n.attrib.items()};n.attrib.clear();n.attrib.update(sorted(attrs.items()))
 return html.tostring(e,encoding='unicode',method='html')
for item in inventory:
 current=html.fromstring((ROOT/item['path']).read_text());baseline=html.fromstring(subprocess.check_output(['git','show',base+':'+item['path']],cwd=ROOT,text=True))
 old=baseline.xpath('//main//svg');new=current.xpath('//*[contains(concat(" ",@class," ")," retained-teaching ")]//svg');assert len(old)==len(new)
 for a,b in zip(old,new):
  repairs=[r for r in json.loads((Q/'retained-svg-corrections.json').read_text()) if r['code']==item['code'] and r['label']==a.get('aria-labelledby')]
  if repairs:
   assert hashlib.sha256(html.tostring(a,encoding='unicode',method='html').encode()).hexdigest()==repairs[0]['original_literal_svg_sha256'];a=html.fromstring(repairs[0]['after_svg'])
  assert svg_identity(a)==svg_identity(b),item['code']+' retained SVG identity'
html_records=json.loads((Q/'artwork-and-evidence.json').read_text())['html_models']
assert len(html_records)==0
for record in html_records:
 item=next(x for x in inventory if x['code']==record['code']);src=(ROOT/item['path']).read_text();literal=re.findall(r'<div class="science-flow"[^>]*>.*?</div>',src,re.S)[record['index']]
 assert hashlib.sha256(literal.encode()).hexdigest()==record['literal_html_sha256'],'native HTML model identity'
 old=html.fromstring(subprocess.check_output(['git','show',base+':'+item['path']],cwd=ROOT,text=True)).xpath('//div[@class="science-flow"]')[record['index']]
 assert html.tostring(old,encoding='unicode',method='html')==literal,'retained native model changed'
for alias in json.loads((Q/'canonical-aliases.json').read_text()):
 assert hashlib.sha256((ROOT/alias['preserved_redirect_path']).read_bytes()).hexdigest()==alias['sha256'],'compatibility redirect changed'
 assert subprocess.check_output(['git','show',base+':'+alias['preserved_redirect_path']],cwd=ROOT)==(ROOT/alias['preserved_redirect_path']).read_bytes(),'baseline compatibility redirect changed'
for forbidden in ['CNAME','index.html','assets/learning-navigation.js','data/app-question-banks.json']:
 assert not subprocess.check_output(['git','diff','--name-only',base,'--',forbidden],cwd=ROOT,text=True).strip(),forbidden+' unexpectedly changed'
print(f'PASS 9 pages: {count} educational sections preserved; {images} image references; {disclosures} named native disclosures; exact metadata, routes and app returns.')
