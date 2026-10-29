#!/usr/bin/env python3
"""Synchronise only topic navigation with verified published app banks.

No teaching content is generated. Update data/app-question-banks.json from the
production bank/catalogue, then use --code CODE for a single bank release.
--all is reserved for an explicitly authorised topic-navigation rollout.
"""
import argparse,html,json,re
from pathlib import Path
from urllib.parse import urlparse,parse_qs
ROOT=Path(__file__).resolve().parents[1]
TOPIC=re.compile(r'^(foundation|year(?:[1-9]|10))/(maths|science|english)/(ac9[a-z0-9]+)[^/]*/index\.html$',re.I)
ANCHOR=re.compile(r'<a\b[^>]*>[\s\S]*?</a>',re.I)
COMMENTS=re.compile(r'(<!--[\s\S]*?-->)')

def href(anchor):
 m=re.search(r'\bhref\s*=\s*([\"\'])(.*?)\1',anchor,re.I|re.S)
 return html.unescape(m.group(2)) if m else ''

def activity(anchor,code):
 u=urlparse(href(anchor))
 if u.netloc in ('','skillrhub.com','www.skillrhub.com'):
  m=re.fullmatch(r'/quiz/[^/]+/[^/]+/(ac9[a-z0-9]+)/(practice|test|quiz)/?(?:index\.html)?',u.path,re.I)
  if m and m[1].upper()==code:return True
 if u.netloc=='app.skillrhub.com':
  p=parse_qs(u.query)
  if p.get('skill',[None])[0]==code or p.get('assessment',[None])[0]==code:return True
 return False

def rewrite(source,code,bank):
 def part(text):
  if text.startswith('<!--'):return text
  text=ANCHOR.sub(lambda m:'' if activity(m.group(),code) else m.group(),text)
  return re.sub(r'<li\b[^>]*>\s*</li>','',text,flags=re.I)
 out=''.join(part(p) for p in COMMENTS.split(source))
 # One pair of actions, directly in the authored HTML, including without JS.
 m=re.search(r'<(?:div|nav)\b[^>]*class=[\"\'][^\"\']*(?:topic-hero__actions|static-topic-actions|resource-actions|curriculum-actions)[^\"\']*[\"\'][^>]*>',out,re.I)
 if bank and bank.get('practice'):
  modern=bool(m and 'topic-hero__actions' in m.group())
  cls='topic-button topic-button--outline' if modern else 'primary'
  query='try=1&amp;skill='+code if bank.get('guestPractice') else 'login=1&amp;skill='+code
  links=f'<a class="{cls}" data-free-practice="{code}" data-guest-practice="{code}" href="https://app.skillrhub.com/?{query}">Free practice</a>'
  if bank.get('assessment'):
   links+=f'<a class="'+('topic-button topic-button--outline' if modern else '')+f'" data-assessment="{code}" href="https://app.skillrhub.com/?assessment={code}">Assessment</a>'
  if m:out=out[:m.end()]+links+out[m.end():]
  else:
   h=re.search(r'</h1>',out,re.I)
   if not h:raise ValueError('Topic has no heading: '+code)
   out=out[:h.end()]+f'<nav class="static-topic-actions" aria-label="Learning activities">{links}</nav>'+out[h.end():]
 return out

def main():
 ap=argparse.ArgumentParser();ap.add_argument('--code',action='append');ap.add_argument('--all',action='store_true');ap.add_argument('--write',action='store_true');args=ap.parse_args()
 if not args.code and not args.all:ap.error('Choose --code CODE or explicitly authorised --all')
 banks={c['code']:c for c in json.loads((ROOT/'data/app-question-banks.json').read_text())['codes']}
 selected={c.upper() for c in args.code or []};changed=[];checked=0
 for base in ['foundation',*[f'year{i}' for i in range(1,11)]]:
  for path in sorted((ROOT/base).glob('*/ac9*/index.html')):
   rel=path.relative_to(ROOT).as_posix();m=TOPIC.fullmatch(rel)
   if not m:continue
   code=m[3].upper();source=path.read_text();active=COMMENTS.sub('',source)
   if re.search(r'http-equiv=[\"\']refresh',active,re.I):continue
   if selected and code not in selected:continue
   if not selected and not (m[2]=='maths' and (m[1]=='foundation' or int(m[1][4:])<=6)) and code not in banks:continue
   checked+=1;out=rewrite(source,code,banks.get(code))
   if out!=source:
    changed.append(rel)
    if args.write:path.write_text(out)
 print(json.dumps({'checked':checked,'changed':len(changed),'write':args.write,'paths':changed}))
 if changed and not args.write:raise SystemExit(1)
if __name__=='__main__':main()
