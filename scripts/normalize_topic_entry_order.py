#!/usr/bin/env python3
"""Keep authored topic intros/actions before optional videos without rewriting content."""
from html.parser import HTMLParser
from pathlib import Path
import argparse, re, json
ROOT=Path(__file__).resolve().parents[1]
VOID={'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}
class Elements(HTMLParser):
 def __init__(self,s):
  super().__init__(convert_charrefs=False); self.s=s; self.lines=[0]+[m.end() for m in re.finditer('\n',s)]; self.stack=[]; self.nodes=[]; self.feed(s)
 def pos(self):
  l,c=self.getpos();return self.lines[l-1]+c
 def handle_starttag(self,t,a):
  n={'tag':t,'attrs':dict(a),'start':self.pos(),'open_end':self.pos()+len(self.get_starttag_text()),'end':None,'parents':self.stack.copy()};self.nodes.append(n)
  if t not in VOID:self.stack.append(n)
 def handle_startendtag(self,t,a):
  self.handle_starttag(t,a)
  if t not in VOID:self.stack.pop()['end']=self.pos()+len(self.get_starttag_text())
 def handle_endtag(self,t):
  for i in range(len(self.stack)-1,-1,-1):
   if self.stack[i]['tag']==t:
    n=self.stack[i];n['end']=self.s.index('>',self.pos())+1;self.stack=self.stack[:i];break

def video_ranges(s):
 nodes=Elements(s).nodes;out=[]
 for m in re.finditer(r'<!-- skillr-topic-videos:start -->.*?<!-- skillr-topic-videos:end -->',s,re.S):out.append((m.start(),m.end()))
 for n in nodes:
  cl=n['attrs'].get('class','').split()
  if n['end'] and ('topic-video-lesson' in cl or 'skillr-topic-videos' in cl):
   a,b=n['start'],n['end']
   if not any(x<=a and b<=y for x,y in out):out.append((a,b))
 return sorted(out)

def reorder(s):
 ranges=video_ranges(s)
 if not ranges:return s
 blocks=[s[a:b] for a,b in ranges]
 clean=s
 for a,b in reversed(ranges):clean=clean[:a]+clean[b:]
 p=Elements(clean); h=next((n for n in p.nodes if n['tag']=='h1'),None)
 if not h:raise ValueError('Missing topic H1')
 heroes=[n for n in h['parents'] if n['end'] and ('curriculum-hero' in n['attrs'].get('class','').split() or 'topic-hero' in n['attrs'].get('class','').split())]
 hero=heroes[-1] if heroes else next((n for n in reversed(h['parents']) if n['tag']=='header' and n['end']),None)
 point=hero['end'] if hero else h['end']
 if not point:raise ValueError('Unclosed topic heading')
 if not hero:
  # Older topics: retain their immediately following intro and resource actions.
  for n in p.nodes:
   if n['start']<point or not n['end']:continue
   gap=clean[point:n['start']]
   if re.sub(r'<!--.*?-->','',gap,flags=re.S).strip():break
   cl=n['attrs'].get('class','').split()
   if n['tag']=='p' or n['tag']=='nav' or any(x in cl for x in ['topic-action-row','topic-section-nav','skillr-quick-learning']):point=n['end']
   else:break
 # Preserve the compact section navigation immediately after an authored hero.
 for n in p.nodes:
  if n['start']>=point and n['end'] and n['tag']=='nav' and 'topic-section-nav' in n['attrs'].get('class','').split() and not clean[point:n['start']].strip():
   point=n['end'];break
 result=clean[:point]+''.join(blocks)+clean[point:]
 # Moving blocks must preserve every byte of the remainder and every video.
 remainder=result
 for a,b in reversed(video_ranges(result)):remainder=remainder[:a]+remainder[b:]
 assert remainder==clean
 return result

def pages():
 return sorted(p for p in ROOT.glob('*/**/index.html') if re.fullmatch(r'(foundation|year\d+)/(maths|science|english)/[^/]+/index.html',p.relative_to(ROOT).as_posix()))
def main():
 ap=argparse.ArgumentParser();ap.add_argument('--write',action='store_true');a=ap.parse_args();changed=[];checked=0
 for p in pages():
  s=p.read_text(); nodes=Elements(s).nodes
  if any(n['tag']=='meta' and n['attrs'].get('http-equiv','').lower()=='refresh' for n in nodes):continue
  if not video_ranges(s):continue
  checked+=1;t=reorder(s)
  assert reorder(t)==t, p
  if t!=s:
   changed.append(str(p.relative_to(ROOT)))
   if a.write:p.write_text(t)
 print(json.dumps({'checked':checked,'changed':len(changed),'paths':changed},indent=2))
 return 0 if a.write or not changed else 1
if __name__=='__main__':raise SystemExit(main())
