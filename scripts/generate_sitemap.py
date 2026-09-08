#!/usr/bin/env python3
"""Generate crawl-efficient XML sitemap index + human-readable sitemap."""
from __future__ import annotations
import html,json,re,subprocess
import xml.etree.ElementTree as ET
from collections import defaultdict
from datetime import datetime
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import quote,unquote,urlparse
from zoneinfo import ZoneInfo
ROOT=Path(__file__).resolve().parents[1]; BASE="https://skillrhub.com"
SKIP={"year1/maths/year-2-halves-quarters-and-eighths-in-everyday-life-activities-and-worksheets-ac9m2m02.html","quiz/grade-k/math/vocabulary/voabulary/index.html","quiz/year-2/math/addition-substraction-daily/index.html","year2/maths/addition-substraction-daily/index.html"}
# Functional states have no independent search value. Keep the canonical learning entry points instead.
FUNCTIONAL_PARTS={"result","results","review","retake"}
EXCLUDED_FILES={"offline.html","product.html"}
EXCLUDED_PARTS={"teacher-slides"}
EXCLUDED_ROOT_PARTS={"node_modules","playwright-report","test-results","screenshots"}
PAUSED_PARTS={"daily-drills"}
SECTION_LABELS={"site":"Start here","learn":"Learn by year","teach":"Teach by year","products":"Products","homeschooling-australia":"Homeschooling Australia","foundation":"Foundation","year1":"Year 1","year2":"Year 2","year3":"Year 3","year4":"Year 4","year5":"Year 5","year6":"Year 6","year7":"Year 7","year8":"Year 8","year9":"Year 9","year10":"Year 10","mappings":"Curriculum mappings","help":"Help and information","quiz":"Practice, tests and worksheets","blogs":"Blogs","worksheets":"Worksheets"}
HUMAN_SITE_LINKS={"/","/learn/","/teach/","/products/","/homeschooling-australia/","/worksheets/","/blogs/","/updates.html","/why-skillrhub.html","/how-to-use-skillr.html"}
HUMAN_HELP_LINKS={"/faq.html","/about.html","/contact.html","/support-skillrhub.html","/privacy-policy.html"}
HUMAN_MAPPING_LINKS={"/nsw/mathematics/","/nsw/stage-5/mathematics/","/victoria/mathematics/","/victoria/year-10/mathematics/"}
HUMAN_SITE_ORDER=["/","/learn/","/teach/","/products/","/homeschooling-australia/","/worksheets/","/blogs/","/updates.html","/why-skillrhub.html","/how-to-use-skillr.html"]
HUMAN_HELP_ORDER=["/faq.html","/about.html","/contact.html","/support-skillrhub.html","/privacy-policy.html"]
HUMAN_MAPPING_ORDER=["/nsw/mathematics/","/nsw/stage-5/mathematics/","/victoria/mathematics/","/victoria/year-10/mathematics/"]
HUMAN_LINK_LABELS={
 "/":"Foundation to Year 10 learning resources",
 "/learn/":"Learn by year",
 "/teach/":"Teach by year",
 "/products/":"Products and downloads",
 "/homeschooling-australia/":"Homeschooling Australia planner and progress record",
 "/worksheets/":"Free worksheets and homework",
 "/blogs/":"Australian Curriculum guides and learning articles",
 "/updates.html":"Latest SkillrHub updates",
 "/why-skillrhub.html":"Why SkillrHub",
 "/how-to-use-skillr.html":"How to use SkillrHub",
 "/foundation/curriculum/":"Foundation Australian Curriculum",
 "/year1/curriculum/":"Year 1 Australian Curriculum",
 "/year2/curriculum/":"Year 2 Australian Curriculum",
 "/year3/curriculum/":"Year 3 Australian Curriculum",
 "/year4/curriculum/":"Year 4 Australian Curriculum",
 "/year5/curriculum/":"Year 5 Australian Curriculum",
 "/year6/curriculum/":"Year 6 Australian Curriculum",
 "/year7/curriculum/":"Year 7 Australian Curriculum",
 "/year8/curriculum/":"Year 8 Australian Curriculum",
 "/year9/curriculum/":"Year 9 Australian Curriculum",
 "/year10/curriculum/":"Year 10 Australian Curriculum",
 "/nsw/mathematics/":"NSW Mathematics curriculum mapping",
 "/nsw/stage-5/mathematics/":"NSW Stage 5 Mathematics mapping",
 "/victoria/mathematics/":"Victorian Curriculum Mathematics mapping",
 "/victoria/year-10/mathematics/":"Victorian Year 10 Mathematics mapping",
 "/faq.html":"Frequently asked questions",
 "/about.html":"About SkillrHub",
 "/contact.html":"Contact SkillrHub",
 "/support-skillrhub.html":"Support SkillrHub",
 "/privacy-policy.html":"Privacy policy",
}
SEARCH_SKIP_TAGS={"script","style","svg","noscript","template"}
COMMON_FACTOR_RE=re.compile(r"(?:lowest common multiple|highest common factor|greatest common divisor)",re.I)

class VisibleTextParser(HTMLParser):
 def __init__(self):super().__init__();self.skip=0;self.parts=[]
 def handle_starttag(self,tag,attrs):
  if tag in SEARCH_SKIP_TAGS:self.skip+=1
 def handle_endtag(self,tag):
  if tag in SEARCH_SKIP_TAGS and self.skip:self.skip-=1
 def handle_data(self,data):
  if not self.skip:self.parts.append(data)

def search_words(value):
 seen=set();words=[]
 for word in re.findall(r"[a-z0-9]+",html.unescape(value).lower()):
  if len(word)>1 and word not in seen:seen.add(word);words.append(word)
 return " ".join(words)

def visible_search_text(source):
 parser=VisibleTextParser();parser.feed(source)
 return search_words(" ".join(parser.parts))

def write_search_index(pages):
 items=[{"t":title,"u":url,"x":visible_search_text(source)} for url,title,_,source in pages]
 manifest=ROOT/"data"/"curriculum-units.json"
 if manifest.exists():
  units=json.loads(manifest.read_text(encoding="utf-8")).get("units",[])
  for unit in units:
   for elaboration in unit.get("elaborations",[]):
    text=elaboration.get("text","");code=elaboration.get("code") or "_".join(filter(None,(unit.get("code"),elaboration.get("number"))))
    common=bool(COMMON_FACTOR_RE.search(text));aliases="greatest common factor highest common factor greatest common divisor gcf hcf gcd" if common else ""
    title=f"Greatest/Highest Common Factors (GCF/HCF/GCD) — {code}" if common else f"{code} — {text[:120]}"
    searchable=" ".join(filter(None,(code,unit.get("code",""),text,unit.get("title",""),unit.get("levelLabel") or unit.get("level",""),unit.get("subject") or unit.get("learningArea",""),aliases,unit.get("url",""))))
    items.append({"t":title,"u":unit.get("url",""),"x":search_words(searchable),"e":1})
 items=[item for item in items if item["t"] and item["u"]]
 (ROOT/"assets"/"site-search-index.json").write_text(json.dumps({"items":items},ensure_ascii=False,separators=(",",":"))+"\n",encoding="utf-8")
 return len(items)
def route(path):
 v=path.as_posix()
 if v=="index.html": return "/"
 if v.endswith("/index.html"): return "/"+v[:-len("index.html")]
 return "/"+v
def page_title(source,path):
 for tag in ("h1","title"):
  m=re.search(rf"<{tag}[^>]*>(.*?)</{tag}>",source,re.I|re.S)
  if m:
   text=html.unescape(re.sub(r"\s+"," ",re.sub(r"<[^>]+>"," ",m.group(1)))).strip()
   text=re.sub(r"\s*[|–-]\s*(SkillrHub|Skillr Education)\s*$","",text,flags=re.I)
   if text:return text
 return path.stem.replace("-"," ").title()
def is_indexable(source):
 m=re.search(r'<meta[^>]+name=["\']robots["\'][^>]+content=["\']([^"\']+)',source,re.I)
 return not m or "noindex" not in m.group(1).lower()
def canonical_path(source):
 for p in (r'<link[^>]+rel=["\'][^"\']*canonical[^"\']*["\'][^>]+href=["\']([^"\']+)',r'<link[^>]+href=["\']([^"\']+)["\'][^>]+rel=["\'][^"\']*canonical'):
  m=re.search(p,source,re.I)
  if m:return unquote(urlparse(html.unescape(m.group(1))).path)
 return None
def norm(v):
 v="/"+v.lstrip("/")
 return v[:-len("index.html")] if v.endswith("/index.html") else (v or "/")
def is_canonical(source,url):
 t=canonical_path(source); return t is None or norm(t)==norm(url)
def is_functional(path):
 return path.as_posix() in EXCLUDED_FILES or bool(set(path.parts)&(FUNCTIONAL_PARTS|EXCLUDED_PARTS|EXCLUDED_ROOT_PARTS|PAUSED_PARTS))

def human_sitemap_page(url):
 """Keep the browser sitemap useful; XML sitemaps handle deep crawl discovery."""
 parts=[p for p in url.strip("/").split("/") if p]
 if url in HUMAN_SITE_LINKS|HUMAN_HELP_LINKS|HUMAN_MAPPING_LINKS:return True
 if parts[0] in {"learn","teach"}:
  return len(parts)<=2
 if parts[0]=="products":
  return len(parts)==1
 if parts[0]=="homeschooling-australia":
  return len(parts)<=2
 if parts[0] in {"foundation",*[f"year{i}" for i in range(1,11)]}:
  return len(parts)==2 and parts[1]=="curriculum" or (len(parts)==3 and parts[1]=="curriculum" and parts[2] in {"maths","science","english"})
 return False
def human_sitemap_key(url):
 if url in HUMAN_SITE_LINKS:return "site"
 if url in HUMAN_HELP_LINKS:return "help"
 if url in HUMAN_MAPPING_LINKS:return "mappings"
 return url.strip("/").split("/",1)[0] or "site"
def human_sitemap_label(url,title):
 m=re.fullmatch(r"/(foundation|year\d+)/curriculum/(maths|science|english)/",url)
 if m:
  level=SECTION_LABELS[m.group(1)]; subject=m.group(2).title()
  return f"{level} {subject} curriculum resources"
 return HUMAN_LINK_LABELS.get(url,title)
def human_sitemap_sort_key(key,item):
 url=item[0]
 if key=="site":return (HUMAN_SITE_ORDER.index(url) if url in HUMAN_SITE_ORDER else 99,url)
 if key=="help":return (HUMAN_HELP_ORDER.index(url) if url in HUMAN_HELP_ORDER else 99,url)
 if key=="mappings":return (HUMAN_MAPPING_ORDER.index(url) if url in HUMAN_MAPPING_ORDER else 99,url)
 m=re.fullmatch(r"/(foundation|year\d+)/curriculum(?:/(maths|science|english))?/",url)
 if m:
  order={None:0,"maths":1,"science":2,"english":3}
  return (order.get(m.group(2),99),url)
 return (99,url)
def today_iso():
 return datetime.now(ZoneInfo("Australia/Sydney")).date().isoformat()
def git_dates():
 dates={};dirty=set()
 # A shallow boundary looks like every file was newly added. Its commit date
 # is not evidence of a page update: retain the previously published date.
 previous={}
 for key in ["site","foundation",*[f"year{i}" for i in range(1,11)],"practice","worksheets"]:
  sitemap=ROOT/f"sitemap-{key}.xml"
  if not sitemap.exists():continue
  for node in ET.parse(sitemap).getroot().findall("{*}url"):
   loc=node.find("{*}loc");mod=node.find("{*}lastmod")
   if loc is None or mod is None or not loc.text or not mod.text:continue
   path=unquote(urlparse(loc.text).path).lstrip("/")
   if not path or path.endswith("/"):path+="index.html"
   previous.setdefault(path,mod.text)
 try:
  shallow_path=Path(subprocess.check_output(["git","rev-parse","--git-path","shallow"],cwd=ROOT,text=True).strip())
  if not shallow_path.is_absolute():shallow_path=ROOT/shallow_path
  boundaries=set(shallow_path.read_text().splitlines()) if shallow_path.exists() else set()
  hist=subprocess.check_output(["git","log","--format=@@%H %cs","--name-only","--diff-filter=ACMR"],cwd=ROOT,text=True); current=None
  for line in hist.splitlines():
   if line.startswith("@@"):
    sha,day=line[2:].split();current=None if sha in boundaries else day
   elif line and current and line not in dates:dates[line]=current
  for cmd in (["git","diff","--name-only"],["git","diff","--cached","--name-only"],["git","ls-files","--others","--exclude-standard"]):dirty.update(subprocess.check_output(cmd,cwd=ROOT,text=True).splitlines())
 except (subprocess.CalledProcessError,FileNotFoundError):pass
 for path,day in previous.items():dates.setdefault(path,day)
 return dates,dirty
def modified(path,dates,dirty):return today_iso() if path.as_posix() in dirty else dates.get(path.as_posix(),today_iso())
def bucket(url):
 first=url.strip("/").split("/",1)[0] or "site"
 if first=="quiz": return "practice"
 if first=="worksheets": return "worksheets"
 if first in {"foundation",*[f"year{i}" for i in range(1,11)]}: return first
 return "site"
def write_urlset(name,items):
 lines=['<?xml version="1.0" encoding="UTF-8"?>','<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
 for url,_,mod in items:
  lines += ["  <url>",f"    <loc>{BASE}{quote(url,safe='/%-._~')}</loc>",f"    <lastmod>{mod}</lastmod>","  </url>"]
 lines.append("</urlset>"); (ROOT/name).write_text("\n".join(lines)+"\n",encoding="utf-8")
def main():
 pages=[];seen=set();dates,dirty=git_dates()
 for absolute in sorted(ROOT.rglob("*.html")):
  if ".git" in absolute.parts:continue
  rel=absolute.relative_to(ROOT)
  if rel.as_posix() in SKIP or is_functional(rel):continue
  source=absolute.read_text(encoding="utf-8",errors="replace")
  if not is_indexable(source):continue
  url=route(rel)
  if not is_canonical(source,url):continue
  if url in seen:raise ValueError(f"Duplicate sitemap route: {url}")
  seen.add(url);pages.append((url,page_title(source,rel),modified(rel,dates,dirty),source))
 groups=defaultdict(list)
 for item in pages:groups[bucket(item[0])].append(item[:3])
 order=["site","foundation"]+[f"year{i}" for i in range(1,11)]+["practice","worksheets"]
 sitemap_files=[]
 for key in order:
  if not groups[key]:continue
  filename=f"sitemap-{key}.xml";write_urlset(filename,groups[key]);sitemap_files.append((filename,max(x[2] for x in groups[key])))
 idx=['<?xml version="1.0" encoding="UTF-8"?>','<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
 for filename,mod in sitemap_files:
  if filename=="sitemap-practice.xml":continue
  idx += ["  <sitemap>",f"    <loc>{BASE}/{filename}</loc>",f"    <lastmod>{mod}</lastmod>","  </sitemap>"]
 idx.append("</sitemapindex>");(ROOT/"sitemap.xml").write_text("\n".join(idx)+"\n",encoding="utf-8")
 sections=defaultdict(list)
 for item in pages:
  if human_sitemap_page(item[0]):
   sections[human_sitemap_key(item[0])].append((item[0],human_sitemap_label(item[0],item[1]),item[2],item[3]))
 html_order=["site","learn","teach","products","homeschooling-australia","foundation"]+[f"year{i}" for i in range(1,11)]+["mappings","help"]
 keys=[k for k in html_order if k in sections]+sorted(set(sections)-set(html_order))
 blocks=[]
 for key in keys:
  label=SECTION_LABELS.get(key,key.replace("-"," ").title())
  sections[key].sort(key=lambda item:human_sitemap_sort_key(key,item))
  links="".join(f'<li><a href="{html.escape(item[0],quote=True)}">{html.escape(item[1])}</a></li>' for item in sections[key])
  blocks.append(f'<section class="sitemap-section"><h2>{html.escape(label)}</h2><ul>{links}</ul></section>')
 schema=json.dumps({"@context":"https://schema.org","@type":"CollectionPage","name":"SkillrHub Australian Curriculum resources sitemap","url":f"{BASE}/sitemap.html","description":"Browse Foundation to Year 10 Australian Curriculum Maths, Science and English resource hubs, worksheets, guides and curriculum mappings."},separators=(",",":"))
 doc=f'''<!DOCTYPE html>
<html lang="en-AU"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Australian Curriculum F–10 Resources Sitemap | SkillrHub</title>
<meta name="description" content="Browse SkillrHub Foundation to Year 10 Australian Curriculum Maths, Science and English hubs, worksheets, guides and curriculum mappings.">
<meta name="robots" content="index,follow"><link rel="canonical" href="{BASE}/sitemap.html">
<meta property="og:title" content="SkillrHub Australian Curriculum Resources Sitemap"><meta property="og:description" content="Find Foundation to Year 10 Australian Curriculum Maths, Science and English learning resources."><meta property="og:type" content="website"><meta property="og:url" content="{BASE}/sitemap.html">
<link rel="manifest" href="/manifest.webmanifest"><link rel="stylesheet" href="/style.css"><script type="application/ld+json">{schema}</script><meta name="google-adsense-account" content="ca-pub-7734963540104771"><script async src="https://www.googletagmanager.com/gtag/js?id=G-8P22BET45N"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){{dataLayer.push(arguments)}}gtag("js",new Date());gtag("config","G-8P22BET45N");</script><!-- ADSENSE DISABLED PENDING APPROVAL: <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7734963540104771" crossorigin="anonymous"></script> --></head>
<body><div class="container"><nav class="main-nav" aria-label="Primary"><a href="/">Home</a><a href="/blogs/">Blogs</a><a href="/worksheets/">Worksheets</a><a href="/updates.html">Updates</a><a href="/sitemap.html" aria-current="page">Sitemap</a><a href="/about.html">About</a></nav><main><header class="sitemap-hero"><p class="eyebrow">Explore SkillrHub</p><h1>Australian Curriculum learning resources sitemap</h1><p>Jump to a Foundation–Year 10 Maths, Science or English curriculum hub, worksheets, guides or curriculum mappings. Individual topic pages are linked from each subject hub so this directory stays quick to scan.</p></header><div class="sitemap-directory">{''.join(blocks)}</div></main><footer><p>&copy; 2026 Skillr Education. All rights reserved.</p><p><a href="/privacy-policy.html">Privacy</a> · <a href="/contact.html">Contact</a></p></footer></div><script src="/pwa-register.js?v=7"></script></body></html>'''
 (ROOT/"sitemap.html").write_text(doc,encoding="utf-8")
 search_count=write_search_index(pages)
 print(f"Generated sitemap index with {len(sitemap_files)} child sitemaps, {len(pages)} canonical indexable URLs and {search_count} search entries.")
if __name__=="__main__":main()
