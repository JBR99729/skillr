#!/usr/bin/env python3
"""Audit SkillrHub HTML for search-quality risks.

This is intentionally conservative. It does not change page indexability.
It surfaces pages that deserve human/product review before they are promoted
through XML sitemaps.
"""
from __future__ import annotations
import json,re
from collections import Counter,defaultdict
from html.parser import HTMLParser
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/"data"/"search-quality-audit.json"
SKIP_PARTS={".git","node_modules","teacher-slides","screenshots","test-results","playwright-report"}
SKIP_TAGS={"script","style","svg","noscript","template"}
GENERIC_PHRASES=(
    "choice → context → effect",
    "try the free resources first",
    "large question bank",
    "this is a real working beta",
    "become part of the qa team",
)

class Parser(HTMLParser):
    def __init__(self):
        super().__init__(); self.skip=0; self.parts=[]
    def handle_starttag(self,tag,attrs):
        if tag in SKIP_TAGS:self.skip+=1
    def handle_endtag(self,tag):
        if tag in SKIP_TAGS and self.skip:self.skip-=1
    def handle_data(self,data):
        if not self.skip:self.parts.append(data)

def visible(source):
    p=Parser(); p.feed(source)
    return re.sub(r"\s+"," "," ".join(p.parts)).strip()

def robots(source):
    m=re.search(r'<meta[^>]+name=["\']robots["\'][^>]+content=["\']([^"\']+)',source,re.I)
    return (m.group(1).lower() if m else "index,follow")

def canonical(source):
    m=re.search(r'<link[^>]+rel=["\'][^"\']*canonical[^"\']*["\'][^>]+href=["\']([^"\']+)',source,re.I)
    return m.group(1) if m else None

rows=[]
phrase_pages=defaultdict(list)
for path in sorted(ROOT.rglob("*.html")):
    if any(part in SKIP_PARTS for part in path.parts): continue
    rel=path.relative_to(ROOT).as_posix()
    src=path.read_text(encoding="utf-8",errors="replace")
    if "noindex" in robots(src): continue
    text=visible(src)
    words=re.findall(r"[A-Za-z0-9’'-]+",text)
    phrases=[p for p in GENERIC_PHRASES if p.lower() in text.lower()]
    for p in phrases: phrase_pages[p].append(rel)
    reasons=[]
    if len(words)<220: reasons.append("thin_visible_text")
    if len(words)<350 and ("/curriculum/" in rel or rel.startswith("blogs/")): reasons.append("thin_search_landing")
    if phrases: reasons.append("repeated_template_phrase")
    if rel.startswith("blogs/") and "curriculum" in rel and len(words)<700: reasons.append("shallow_curriculum_blog")
    rows.append({
        "path":rel,
        "words":len(words),
        "canonical":canonical(src),
        "reasons":reasons,
        "phrases":phrases,
    })

flagged=[r for r in rows if r["reasons"]]
summary={
    "pages_scanned":len(rows),
    "pages_flagged":len(flagged),
    "reason_counts":Counter(reason for r in flagged for reason in r["reasons"]),
    "repeated_phrase_counts":{k:len(v) for k,v in phrase_pages.items() if len(v)>1},
}
OUT.parent.mkdir(parents=True,exist_ok=True)
OUT.write_text(json.dumps({"summary":summary,"flagged":flagged},indent=2,ensure_ascii=False)+"\n",encoding="utf-8")
print(json.dumps(summary,indent=2,default=dict))
