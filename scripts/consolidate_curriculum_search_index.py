#!/usr/bin/env python3
"""Consolidate curriculum search indexing around one authoritative topic page per code.

Run from repository root:
  python3 scripts/consolidate_curriculum_search_index.py

This deliberately changes only HTML under quiz/ and topic teacher-slides directories.
It never deletes learning resources. Supporting app surfaces remain crawlable via links
but receive noindex,follow. Curriculum topic pages, hubs, products, Print & Go,
editorial pages and other standalone search destinations are untouched.
"""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
QUIZ = ROOT / "quiz"
TOPIC_ROOTS = [ROOT / "foundation"] + [ROOT / f"year{i}" for i in range(1, 11)]

ROBOTS_RE = re.compile(r'<meta\s+name=["\']robots["\']\s+content=["\'][^"\']*["\']\s*/?>', re.I)
HEAD_RE = re.compile(r'<head\b[^>]*>', re.I)

def set_noindex(path: Path) -> bool:
    text = path.read_text(encoding="utf-8")
    desired = '<meta name="robots" content="noindex,follow">'
    if ROBOTS_RE.search(text):
        updated = ROBOTS_RE.sub(desired, text, count=1)
    else:
        updated = HEAD_RE.sub(lambda m: m.group(0) + desired, text, count=1)
    if updated == text:
        return False
    path.write_text(updated, encoding="utf-8")
    return True

def quiz_satellites():
    if not QUIZ.exists():
        return
    for p in QUIZ.rglob("*.html"):
        # Every quiz route is an operational satellite of a curriculum/topic page.
        yield p

def classroom_satellites():
    for root in TOPIC_ROOTS:
        if not root.exists():
            continue
        for p in root.rglob("teacher-slides/*.html"):
            yield p
        for p in root.rglob("teacher-slides/**/*.html"):
            yield p

def main():
    targets = sorted(set(quiz_satellites()) | set(classroom_satellites()))
    changed = 0
    for p in targets:
        changed += int(set_noindex(p))
    report = ROOT / "reports" / "seo" / "curriculum-index-consolidation.md"
    report.parent.mkdir(parents=True, exist_ok=True)
    report.write_text(
        "# Curriculum search index consolidation\n\n"
        "Policy: one authoritative curriculum topic landing page per AC9 code.\n\n"
        "- Curriculum topic pages remain indexable.\n"
        "- Year/subject hubs remain indexable.\n"
        "- Product, Print & Go and editorial/search destinations remain unchanged.\n"
        "- Quiz, worksheet/homework, practice, test, retake, review and result HTML routes are noindex,follow.\n"
        "- Topic Classroom View / teacher-slides HTML routes are noindex,follow.\n"
        "- No resources are deleted and navigation remains unchanged.\n\n"
        f"HTML satellite files inspected: {len(targets)}\n"
        f"Files changed on this run: {changed}\n",
        encoding="utf-8",
    )
    print(f"Inspected {len(targets)} satellite HTML files; changed {changed}.")

if __name__ == "__main__":
    main()
