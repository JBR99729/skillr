#!/usr/bin/env python3
"""Check every canonical topic's static, code-aware app entrance."""
import html,json,re
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse,parse_qs
from sync_topic_bank_links import ROOT,TOPIC,COMMENTS,rewrite
from topic_practice_journey import INLINE,SECONDARY,LessonSlot,protected_codes

class Page(HTMLParser):
 def __init__(self,source):
  super().__init__();self.links=[];self.inline=[];self.canonical='';self.skip=False;self.styles=[];self.feed(source)
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='meta' and (a.get('http-equiv','').lower()=='refresh' or (a.get('name','').lower()=='robots' and 'noindex' in a.get('content','').lower())):self.skip=True
  if tag=='link' and a.get('rel')=='canonical':self.canonical=a.get('href','')
  if tag=='link' and a.get('rel')=='stylesheet':self.styles.append(a.get('href',''))
  if tag=='a' and a.get('id')=='skillr-topic-practice-now':self.links.append(a)
  if tag=='a' and 'skillr-inline-practice' in (a.get('class') or '').split():self.inline.append(a)

def validate(root=ROOT):
 banks={b['code']:b for b in json.loads((root/'data/app-question-banks.json').read_text())['codes']}
 counts={'topics':0,'published':0,'catalogue':0,'inline':0,'protected':0,'no_slot':0,'inline_account_required':0};failures=[]
 for base in ['foundation',*[f'year{i}' for i in range(1,11)]]:
  for path in sorted((root/base).glob('*/ac9*/index.html')):
   rel=path.relative_to(root).as_posix();match=TOPIC.fullmatch(rel)
   if not match:continue
   source=path.read_text();page=Page(source)
   if page.skip:continue
   code=match[3].upper();bank=banks.get(code);published=bool(bank and bank.get('practice'))
   counts['topics']+=1;counts['published' if published else 'catalogue']+=1
   try:
    assert len(page.links)==1,'expected one static app button'
    link=page.links[0];url=urlparse(link['href']);params=parse_qs(url.query)
    assert url.scheme=='https' and url.netloc=='app.skillrhub.com' and url.path=='/','wrong app destination'
    assert 'data-topic-app-link' in link and link.get('data-curriculum-code')==code,'missing code-aware marker'
    assert params.get('returnTo')==[page.canonical] and page.canonical.startswith('https://skillrhub.com/'),'missing exact topic return'
    assert any(s.startswith('/assets/topic-practice-link.css?') for s in page.styles),'missing button styling'
    if published:
     assert params.get('skill')==[code],'wrong published skill'
     assert params.get('try' if bank.get('guestPractice') else 'login')==['1'],'wrong access route'
    else:
     assert not params.get('skill') and not params.get('assessment'),'unpublished skill advertised'
     assert params.get('try')==['1'] and params.get('year')==['0' if match[1]=='foundation' else match[1][4:]] and params.get('subject')==[match[2]],'wrong catalogue filters'
     assert '<small>Choose available ' in source,'missing catalogue explanation'
    expected_floating='Try 5 questions · No account needed' if params.get('starter')==['5'] else 'Practise this on the app →'
    assert expected_floating in source,'wrong button label'
    protected=code in protected_codes()
    clean=INLINE.sub('',source).replace(SECONDARY,'')
    slot=published and not protected and bool(LessonSlot(clean).ends)
    counts['protected']+=protected
    counts['no_slot']+=published and not protected and not slot
    assert len(page.inline)==int(slot),'wrong number of worked-example actions'
    assert len(INLINE.findall(source))==int(slot),'wrong number of generated regions'
    if slot:
     counts['inline']+=1
     counts['inline_account_required']+=not bank.get('guestPractice')
     inline=page.inline[0]
     assert inline['href']==link['href'],'inline path differs from the verified floating path'
     assert 'data-skillr-app-cta' in inline and inline.get('data-funnel-location')=='after_worked_example','missing click tracking placement'
     marker=INLINE.search(source)
     assert len(source[:marker.start()].replace(SECONDARY,''))==min(LessonSlot(clean).ends),'practice action is not directly after first visible worked example'
     assert ('No account needed' if bank.get('guestPractice') else 'Free account required') in marker[0],'missing truthful account notice'
    else:
     assert SECONDARY not in source,'worksheet marked secondary without practice action'
    assert rewrite(source,code,bank)==source,'synchronizer is not idempotent'
   except AssertionError as error:failures.append(f'{rel}: {error}')
 assert counts['topics']>0,'No canonical topics inspected'
 if failures:raise SystemExit('\n'.join(failures))
 print(json.dumps(counts))
 return counts
if __name__=='__main__':validate()
