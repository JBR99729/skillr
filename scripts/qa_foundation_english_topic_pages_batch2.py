#!/usr/bin/env python3
"""Scoped public-page checks; no app-bank or linked-product certification."""
from pathlib import Path
from lxml import html
from urllib.parse import urljoin,urlparse,parse_qs,unquote
import json,hashlib,re,subprocess,sys,copy
R=Path(__file__).resolve().parents[1];Q=R/'docs/qa/foundation-english-topic-pages-batch2-20261109';base=sys.argv[1]
inv=json.loads((Q/'inventory.json').read_text());assert len(inv)==10
adds=json.loads((Q/'retained-additions.json').read_text());repairs=json.loads((Q/'retained-corrections.json').read_text());plan=json.loads((Q/'retained-inventory-plan.json').read_text())
normalize=lambda e:' '.join(e.text_content().split())
banks={x['code']:x for x in json.loads((R/'data/app-question-banks.json').read_text())['codes']}
tracked=set(subprocess.check_output(['git','ls-tree','-r','--name-only',base],cwd=R,text=True).splitlines());sections=fields=disclosures=0
for x in inv:
 c=x['code'];src=(R/x['path']).read_text();now=html.fromstring(src);old=html.fromstring(subprocess.check_output(['git','show',base+':'+x['path']],cwd=R,text=True))
 assert len(now.xpath('//main'))==len(now.xpath('//h1'))==1,c+' main/h1'
 assert c in now.xpath('string(//h1)') and now.xpath('string(//div[@class="hero"]//p[@class="kicker"])')=='FOUNDATION ENGLISH',c+' hero'
 assert len(now.xpath('//script[contains(@src,"/pwa-register.js")]'))==1,c+' shared loader'
 assert [dict(e.attrib)for e in now.xpath('//head/meta')]==[dict(e.attrib)for e in old.xpath('//head/meta')],c+' all meta'
 assert now.xpath('string(//head/title)')==old.xpath('string(//head/title)'),c+' title'
 assert now.xpath('//link[@rel="canonical"]/@href')==old.xpath('//link[@rel="canonical"]/@href'),c+' canonical'
 assert [json.loads(e.text)for e in now.xpath('//script[@type="application/ld+json"]')]==[json.loads(e.text)for e in old.xpath('//script[@type="application/ld+json"]')],c+' structured metadata'
 current=now.xpath('//div[@class="retained-teaching"]/details');assert len(current)==x['retained_section_count']
 assert [normalize(e.find('summary'))for e in current]==x['retained_sections']==next(i['retained_sections']for i in plan['codes']if i['code']==c)
 for label,e in zip(x['retained_sections'],current):
  prev=next(e for e in old.xpath('//main//details[not(ancestor::details)]')if normalize(e.find('summary'))==label)
  for nav in prev.xpath('.//*[@data-learning-navigation-links]'):nav.getparent().remove(nav)
  for a in adds:
   if a['code']==c and a['section']==label:prev.append(html.fromstring(a['html']))
  expected=normalize(prev)
  for p in repairs:
   if p['code']==c and p['section']==label:
    assert expected.count(p['before'])==1,c+' correction identity';expected=expected.replace(p['before'],p['after'])
  assert normalize(e)==expected,c+' preserved teaching '+label;sections+=1
 previous=old.xpath('//section[contains(@class,"lesson-preview")]//div[@class="lesson-preview-example"]')[0]
 expected=' '.join(' '.join(normalize(e)for e in previous if e.tag!='h2').split())
 earlier=now.xpath('//section[@class="earlier-worked-model"]')[0]
 assert ' '.join(normalize(e)for e in earlier if e.tag!='h3')==expected,c+' earlier model text'
 def svg_identity(e):
  e=copy.deepcopy(e)
  for node in e.iter():
   attrs={k.lower():v.replace('retained-'+c.lower()+'-','')for k,v in node.attrib.items()};node.attrib.clear();node.attrib.update(sorted(attrs.items()))
  return html.tostring(e,encoding='unicode',method='html',with_tail=False)
 assert [svg_identity(e)for e in previous.xpath('.//svg')]==[svg_identity(e)for e in now.xpath('//section[@class="earlier-worked-model"]//svg')],c+' earlier exact SVG geometry'
 assert len(now.xpath('//div[@class="steps"]/article'))==3 and len(now.xpath('//section[contains(@class,"tricky-questions")]/details'))==3,c+' teaching focuses'
 ids=now.xpath('//@id');assert len(ids)==len(set(ids)),c+' duplicate ids'
 for e in now.xpath('//details'):assert len(e.xpath('./summary'))==1,c+' disclosure name';disclosures+=1
 for e in now.xpath('//*[@aria-labelledby or @aria-describedby]'):
  for attr in ['aria-labelledby','aria-describedby']:
   for ident in e.get(attr,'').split():assert ident in ids,c+' ARIA target '+ident
 for a in now.xpath('//a[@href]'):
  u=urlparse(urljoin(x['canonical'],a.get('href')))
  if u.netloc in ['skillrhub.com','www.skillrhub.com']:
   p=unquote(u.path.lstrip('/'))+('index.html'if u.path.endswith('/')else '')
   assert (R/p).is_file() or p in tracked,c+' broken local route '+p
   if u.path==urlparse(x['canonical']).path and u.fragment:assert unquote(u.fragment)in ids,c+' fragment '+u.fragment
  if u.path=='/learn/':assert parse_qs(u.query)=={'year':['0'],'subject':['english']},c+' year/subject return'
 for img in now.xpath('//img'):
  assert img.get('alt','').strip(),c+' alt';u=urlparse(urljoin(x['canonical'],img.get('src')))
  if u.netloc=='skillrhub.com':assert (R/u.path.lstrip('/')).is_file(),c+' image asset'
 app=now.xpath('//a[@id="skillr-topic-practice-now"]');assert len(app)==1,c+' one app entrance'
 u=urlparse(app[0].get('href'));bank=banks.get(c);published=bool(bank and bank.get('practice'));expected=({'try'if bank.get('guestPractice')else'login':['1'],'skill':[c],'returnTo':[x['canonical']]} if published else {'try':['1'],'year':['0'],'subject':['english'],'returnTo':[x['canonical']]})
 assert app[0].get('data-practice-availability')==('published' if published else 'catalogue'),c+' availability label'
 assert u.netloc=='app.skillrhub.com' and parse_qs(u.query)==expected,c+' exact existing code/access/return'
 assert len(now.xpath('//a[contains(@href,"app.skillrhub.com")]'))==1,c+' competing app actions'
 assert len(now.xpath('//*[@data-learning-navigation-links]'))==1,c+' return block'
 assert len(now.xpath('//a[contains(@href,"teacher-slides/")]'))==1,c+' one fixed teacher route'
 assert not now.xpath('//a[contains(@href,".pptx")]'),c+' source deck link'
 assert not now.xpath('//*[contains(@class,"lesson-preview-offer")] | //details[@id="resource-facts" or @id="curriculum-equivalents"]'),c+' legacy outer panel'
 assert hashlib.sha256(src.encode()).hexdigest()==x['sha256'],c+' current fingerprint'
 def strings(v):
  if isinstance(v,str):yield v
  elif isinstance(v,list):
   for a in v:yield from strings(a)
  elif isinstance(v,dict):
   for a in v.values():yield from strings(a)
 author=next(i for i in json.loads((Q/'page-content.json').read_text())if i['code']==c);t=normalize(now)
 for field in strings(author):assert ' '.join(field.split())in t,c+' absent author field '+field[:60];fields+=1
art=json.loads((Q/'artwork-and-evidence.json').read_text())
for x in inv:
 src=(R/x['path']).read_text();doc=html.fromstring(src);models=re.findall(r'<svg\b.*?</svg>',src,re.S);records=[m for m in art['models']if m['code']==x['code']]
 assert len(models)==len(records),x['code']+' exact SVG inventory'
 for literal,record in zip(models,records):assert hashlib.sha256(literal.encode()).hexdigest()==record['literal_svg_sha256'],x['code']+' SVG literal identity'
 natives=doc.xpath('//figure[@role="img"] | //figure[@class="english-model"]');records=[m for m in art['native_models']if m['code']==x['code']]
 assert len(natives)==len(records),x['code']+' native model inventory'
 for e,record in zip(natives,records):assert hashlib.sha256(html.tostring(e,encoding='unicode',method='html').encode()).hexdigest()==record['html_sha256'],x['code']+' native model identity'
for p in ['CNAME','index.html','data/app-question-banks.json','assets/learning-navigation.js']:
 assert not subprocess.check_output(['git','diff','--name-only',base,'--',p],cwd=R,text=True).strip(),p+' changed unexpectedly'
print(f'PASS 10 Foundation English pages: {fields}authorfields/{sections}retainedsections/{disclosures}nativedisclosures: exactmetadata,earliermodels,localresources,code/access/appreturns; no app bank certification.')
