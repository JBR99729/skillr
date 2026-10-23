from html.parser import HTMLParser
from html import unescape
import re
class Parts(HTMLParser):
 def __init__(self,s):
  super().__init__(convert_charrefs=False);self.s=s;self.stack=[];self.nodes=[];self.offsets=[0]
  for m in re.finditer('\n',s):self.offsets.append(m.end())
  self.feed(s)
 def pos(self):
  row,col=self.getpos();return self.offsets[row-1]+col
 def handle_starttag(self,tag,attrs):
  n={'tag':tag,'attrs':dict(attrs),'start':self.pos(),'openend':self.pos()+len(self.get_starttag_text()),'parent':self.stack[-1] if self.stack else None}
  self.nodes.append(n)
  if tag not in ('area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'):self.stack.append(n)
  else:n['close']=n['end']=n['openend']
 def handle_startendtag(self,tag,attrs):
  self.handle_starttag(tag,attrs)
  if self.stack and self.stack[-1]['tag']==tag:
   n=self.stack.pop();n['close']=n['end']=n['openend']
 def handle_endtag(self,tag):
  for i in range(len(self.stack)-1,-1,-1):
   if self.stack[i]['tag']==tag:
    n=self.stack[i];n['close']=self.pos();n['end']=self.s.find('>',self.pos())+1;self.stack=self.stack[:i];break
 def outer(self,n):return self.s[n['start']:n['end']]
 def inner(self,n):return self.s[n['openend']:n['close']]
 def find(self,tag=None,**attrs):return next((n for n in self.nodes if (not tag or n['tag']==tag) and all(n['attrs'].get(k)==v for k,v in attrs.items())),None)
 def section(self,label):
  for n in self.nodes:
   if n['tag']=='summary' and label in text(self.inner(n)):
    p=n['parent']
    if p and p['tag']=='details':return p
def text(s):return unescape(re.sub(r'\s+',' ',re.sub(r'<[^>]+>',' ',s))).strip()
