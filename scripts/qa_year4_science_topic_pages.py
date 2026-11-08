#!/usr/bin/env python3
"""Scoped static/preservation QA for the twelve illustrated Year 4 Science pages."""
import sys,json,re,subprocess,hashlib
from pathlib import Path
from urllib.parse import urljoin,urlparse,parse_qs,unquote
from lxml import html
ROOT=Path(__file__).resolve().parents[1];Q=ROOT/'docs/qa/year4-science-topic-pages-20261108';inventory=json.loads((Q/'inventory.json').read_text());base=sys.argv[1]
assert len(inventory)==12
tracked=set(subprocess.check_output(['git','ls-tree','-r','--name-only',base],cwd=ROOT,text=True).splitlines())
clean=lambda e:' '.join(e.text_content().split())
count=0;images=0;disclosures=0
for item in inventory:
 code=item['code'];path=item['path'];source=(ROOT/path).read_text();doc=html.fromstring(source);before=html.fromstring(subprocess.check_output(['git','show',base+':'+path],cwd=ROOT,text=True))
 assert len(doc.xpath('//main'))==1,code+' main';assert len(doc.xpath('//h1'))==1,code+' h1';assert code in doc.xpath('//p[@class="kicker"]')[0].text_content()
 for selector,attr in [('title',None),('meta[@name="description"]','content'),('meta[@name="robots"]','content'),('link[@rel="canonical"]','href')]:
  a=doc.xpath('//head/'+selector)[0];b=before.xpath('//head/'+selector)[0];assert (a.text if attr is None else a.get(attr))==(b.text if attr is None else b.get(attr)),code+' '+selector
 oldld=[json.loads(e.text) for e in before.xpath('//script[@type="application/ld+json"]')];newld=[json.loads(e.text) for e in doc.xpath('//script[@type="application/ld+json"]')];assert oldld==newld,code+' structured metadata'
 baseline=before.xpath('//main//details[not(ancestor::details)]');sections=doc.xpath('//*[contains(concat(" ",@class," ")," retained-teaching ")]/details');assert len(sections)==item['retained_section_count']
 for label,current in zip(item['retained_sections'],sections):
  previous=next(e for e in baseline if clean(e.find('summary'))==label)
  for nav in previous.xpath('.//*[@data-learning-navigation-links]'):nav.getparent().remove(nav)
  assert clean(current)==clean(previous),code+' teaching preservation: '+label;count+=1
 assert len(doc.xpath('//div[@class="steps"]/article'))==3,code+' steps'
 assert len(doc.xpath('//section[contains(@class,"tricky-questions")]/details'))==3,code+' tricky questions'
 ids=doc.xpath('//@id');assert len(ids)==len(set(ids)),code+' duplicate ids'
 for e in doc.xpath('//*[@aria-labelledby or @aria-describedby]'):
  for attr in ['aria-labelledby','aria-describedby']:
   for target in e.get(attr,'').split():assert target in ids,code+' missing ARIA '+target
 for e in doc.xpath('//details'):
  assert len(e.xpath('./summary'))==1,code+' unnamed disclosure';disclosures+=1
 for a in doc.xpath('//a[@href]'):
  u=urlparse(urljoin(item['canonical'],a.get('href')))
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
 assert u.netloc=='app.skillrhub.com' and params=={'try':['1'],'year':['4'],'subject':['science'],'returnTo':[item['canonical']]},code+' catalogue destination'
 assert not doc.xpath('//a[contains(@href,"skill=") or contains(@href,"assessment=")]'),code+' unpublished bank advertised'
 assert len(doc.xpath('//*[@data-learning-navigation-links]'))==1,code+' return navigation'
 assert hashlib.sha256((ROOT/path).read_bytes()).hexdigest()==item['sha256'],code+' fingerprint'
 assert not doc.xpath('//details[@id="resource-facts" or @id="curriculum-equivalents"]'),code+' legacy panel'
for forbidden in ['CNAME','index.html','assets/learning-navigation.js','data/app-question-banks.json']:
 assert not subprocess.check_output(['git','diff','--name-only','--',forbidden],cwd=ROOT,text=True).strip(),forbidden+' unexpectedly changed'
print(f'PASS 12 pages: {count} educational sections preserved; {images} image references; {disclosures} named native disclosures; exact metadata, routes and app returns.')
