#!/usr/bin/env python3
"""Synchronise topic app entrances and verified published bank navigation.

No teaching content is generated. Update data/app-question-banks.json from the
production bank/catalogue, then use --code CODE for a single bank release.
--all is reserved for an explicitly authorised topic-navigation rollout.
"""
import argparse,html,json,re
from pathlib import Path
from urllib.parse import urlparse,parse_qs,urlencode
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
 # Main-card visibility is shared CSS. Preserve every existing supporting link.
 def part(text):
  if text.startswith('<!--'):return text
  text=re.sub(r'<a\b(?=[^>]*\bid=["\']skillr-topic-practice-now["\'])[^>]*>[\s\S]*?</a>\n?', '', text, flags=re.I)
  # A verified unavailable bank must not retain hidden/native action links.
  # Preserve teaching, slides, worksheets, comments and every unrelated code.
  if bank is not None:
   def available_action(match):
    anchor=match.group(0)
    if not activity(anchor,code):return anchor
    u=urlparse(href(anchor));params=parse_qs(u.query)
    assessment='assessment' in params or bool(re.search(r'/test/?(?:index\.html)?$',u.path,re.I))
    return anchor if bank.get('assessment' if assessment else 'practice') else ''
   text=ANCHOR.sub(available_action,text)
  return text
 out=''.join(part(p) for p in COMMENTS.split(source))
 # Every topic has an app entrance. Only verified banks get a direct skill link.
 match=re.match(r'^AC9([MES])(F|\d+)',code)
 if not match:raise ValueError('Unsupported curriculum code: '+code)
 year='0' if match[2]=='F' else match[2]
 subject={'M':'maths','E':'english','S':'science'}[match[1]]
 published=bool(bank and bank.get('practice'))
 entry='try' if not published or bank.get('guestPractice') else 'login'
 params={entry:'1'}
 if published:params['skill']=code
 else:params.update(year=year,subject=subject)
 canonical=re.search(r'<link\b[^>]*rel=["\']canonical["\'][^>]*href=["\']([^"\']+)',source,re.I)
 if canonical:params['returnTo']=html.unescape(canonical[1])
 target='https://app.skillrhub.com/?'+urlencode(params)
 bar=re.search(r'<div class="(?:compact-topic-bar|cb-lesson-bar numbers-bar)">[\s\S]*?</strong>',out)
 compact=bar and 'compact-topic-bar' in bar.group()
 css_class='compact-topic-practice' if compact else 'skillr-topic-practice-now'
 placement='lesson_bar' if bar else 'floating_button'
 year_label='Foundation' if year=='0' else 'Year '+year
 note='' if published else '<small>Choose available '+year_label+' '+subject.title()+' practice</small>'
 label='Practise this on the app →'
 link=f'<a id="skillr-topic-practice-now" class="{css_class}" data-topic-app-link data-skillr-app-cta data-floating-practice="{code}" data-practice-placement="{placement}" data-funnel-location="{placement}" data-curriculum-code="{code}" data-curriculum-subject="{subject}" data-practice-availability="{"published" if published else "catalogue"}" href="{html.escape(target,quote=True)}"><span>{label}</span>{note}</a>'
 if bar:out=out[:bar.end()]+link+out[bar.end():]
 else:
  if not re.search(r'</body>',out,re.I):raise ValueError('Topic has no body: '+code)
  out=re.sub(r'</body>',lambda m:link+'\n'+m.group(),out,count=1,flags=re.I)
 css='<link rel="stylesheet" href="/assets/topic-practice-link.css?v=20261107-all-topics">'
 if css not in out:out=re.sub(r'</head>',lambda m:css+'\n'+m.group(),out,count=1,flags=re.I)

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
   if re.search(r'<meta\b[^>]*name=[\"\']robots[\"\'][^>]*content=[\"\'][^\"\']*noindex',active,re.I):continue
   if selected and code not in selected:continue
   checked+=1;out=rewrite(source,code,banks.get(code))
   if out!=source:
    changed.append(rel)
    if args.write:path.write_text(out)
 print(json.dumps({'checked':checked,'changed':len(changed),'write':args.write,'paths':changed}))
 if changed and not args.write:raise SystemExit(1)
if __name__=='__main__':main()


