#!/usr/bin/env python3
"""Generate crawl-efficient XML sitemap index + human-readable sitemap."""
from __future__ import annotations
import html,re,subprocess
from collections import defaultdict
from datetime import date
from pathlib import Path
from urllib.parse import quote,unquote,urlparse
ROOT=Path(__file__).resolve().parents[1]; BASE="https://skillrhub.com"
SKIP={"year1/maths/year-2-halves-quarters-and-eighths-in-everyday-life-activities-and-worksheets-ac9m2m02.html","quiz/grade-k/math/vocabulary/voabulary/index.html","quiz/year-2/math/addition-substraction-daily/index.html","year2/maths/addition-substraction-daily/index.html"}
# Functional states have no independent search value. Keep the canonical learning entry points instead.
FUNCTIONAL_PARTS={"result","results","review","retake"}
SECTION_LABELS={"foundation":"Foundation","year1":"Year 1","year2":"Year 2","year3":"Year 3","year4":"Year 4","year5":"Year 5","year6":"Year 6","year7":"Year 7","year8":"Year 8","year9":"Year 9","year10":"Year 10","quiz":"Practice, tests and worksheets","blogs":"Blogs","worksheets":"Worksheets"}
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
 return bool(set(path.parts)&FUNCTIONAL_PARTS)
def git_dates():
 dates={};dirty=set()
 try:
  hist=subprocess.check_output(["git","log","--format=@@%cs","--name-only","--diff-filter=ACMR"],cwd=ROOT,text=True); current=date.today().isoformat()
  for line in hist.splitlines():
   if line.startswith("@@"):current=line[2:]
   elif line and line not in dates:dates[line]=current
  for cmd in (["git","diff","--name-only"],["git","diff","--cached","--name-only"],["git","ls-files","--others","--exclude-standard"]):dirty.update(subprocess.check_output(cmd,cwd=ROOT,text=True).splitlines())
 except (subprocess.CalledProcessError,FileNotFoundError):pass
 return dates,dirty
def modified(path,dates,dirty):return date.today().isoformat() if path.as_posix() in dirty else dates.get(path.as_posix(),date.today().isoformat())
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
  seen.add(url);pages.append((url,page_title(source,rel),modified(rel,dates,dirty)))
 groups=defaultdict(list)
 for item in pages:groups[bucket(item[0])].append(item)
 order=["site","foundation"]+[f"year{i}" for i in range(1,11)]+["practice","worksheets"]
 sitemap_files=[]
 for key in order:
  if not groups[key]:continue
  filename=f"sitemap-{key}.xml";write_urlset(filename,groups[key]);sitemap_files.append((filename,max(x[2] for x in groups[key])))
 idx=['<?xml version="1.0" encoding="UTF-8"?>','<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
 for filename,mod in sitemap_files:idx += ["  <sitemap>",f"    <loc>{BASE}/{filename}</loc>",f"    <lastmod>{mod}</lastmod>","  </sitemap>"]
 idx.append("</sitemapindex>");(ROOT/"sitemap.xml").write_text("\n".join(idx)+"\n",encoding="utf-8")
 sections=defaultdict(list)
 for item in pages:sections[item[0].strip("/").split("/",1)[0] or "site"].append(item)
 html_order=["site","blogs","foundation"]+[f"year{i}" for i in range(1,11)]+["quiz","worksheets"]
 keys=[k for k in html_order if k in sections]+sorted(set(sections)-set(html_order))
 blocks=[]
 for key in keys:
  label="Main pages" if key=="site" else SECTION_LABELS.get(key,key.replace("-"," ").title())
  links="".join(f'<li><a href="{html.escape(u,quote=True)}">{html.escape(t)}</a></li>' for u,t,_ in sections[key])
  blocks.append(f'<section class="sitemap-section"><h2>{html.escape(label)}</h2><ul>{links}</ul></section>')
 doc=f'''<!DOCTYPE html><html lang="en-AU"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Website Sitemap | SkillrHub</title><meta name="description" content="Browse SkillrHub topic guides, worksheets, practice, tests and education blogs by year level and subject."><meta name="robots" content="index,follow"><link rel="canonical" href="{BASE}/sitemap.html"><link rel="stylesheet" href="/style.css"></head><body><div class="container"><nav class="main-nav"><a href="/">Home</a><a href="/blogs/">Blogs</a><a href="/sitemap.html" aria-current="page">Sitemap</a><a href="/about.html">About</a></nav><main><h1>SkillrHub website sitemap</h1><p>Find curriculum topic guides, printable worksheets, practice activities, tests and teaching blogs.</p>{''.join(blocks)}</main><footer><p>&copy; 2026 Skillr Education. All rights reserved.</p></footer></div></body></html>'''
 (ROOT/"sitemap.html").write_text(doc,encoding="utf-8")
 print(f"Generated sitemap index with {len(sitemap_files)} child sitemaps and {len(pages)} canonical indexable URLs.")
if __name__=="__main__":main()
