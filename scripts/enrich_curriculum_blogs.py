#!/usr/bin/env python3
"""Enrich the 33 Foundation-Year 10 subject curriculum blogs from the exact curriculum manifest.

Preserves existing editorial copy and injects one substantial, unique curriculum-code
section per year/subject guide. The section uses the exact code, descriptor, strand
and canonical topic URL already maintained in data/curriculum-units.json.
"""

from __future__ import annotations

import html
import json
import re
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "data" / "curriculum-units.json"
START = "<!-- BLOG_CURRICULUM_CODE_GUIDE_START -->"
END = "<!-- BLOG_CURRICULUM_CODE_GUIDE_END -->"

SUBJECT_LABEL = {"maths": "Maths", "english": "English", "science": "Science"}

def esc(v):
    return html.escape(str(v), quote=True)

def blog_path(unit):
    if unit["yearNumber"] == 0:
        return ROOT / "blogs" / f"foundation-{unit['subjectSlug']}-curriculum-australia-guide.html"
    return ROOT / "blogs" / f"year{unit['yearNumber']}-{unit['subjectSlug']}-curriculum-australia-guide.html"

def remove_marked(text):
    a = text.find(START)
    if a < 0:
        return text
    b = text.find(END, a)
    if b < 0:
        raise RuntimeError("curriculum code guide marker missing end")
    return text[:a] + text[b + len(END):]

def insertion_point(text):
    for marker in ("<!-- BLOG_FREE_FIRST_CAMPAIGN_START -->", "</article>", "</main>"):
        i = text.find(marker)
        if i >= 0:
            return i
    return len(text)

def group_label(unit):
    return unit.get("subStrand") or unit.get("strand") or unit.get("subject") or "Curriculum topics"

def build_section(units, level_label, subject_label):
    grouped = defaultdict(list)
    for u in units:
        grouped[group_label(u)].append(u)

    nav = "".join(
        f'<li><a href="#blog-curriculum-{i}">{esc(name)}</a></li>'
        for i, name in enumerate(grouped)
    )

    blocks = []
    for i, (name, items) in enumerate(grouped.items()):
        cards = []
        for u in items:
            title = str(u.get("title") or "").strip()
            descriptor = str(u.get("description") or "").strip().rstrip(".")
            cards.append(
                '<article class="curriculum-blog-code">'
                f'<h3><a href="{esc(u["url"])}"><strong>{esc(u["code"])}</strong>'
                + (f' — {esc(title)}' if title else '') +
                '</a></h3>'
                f'<p>{esc(descriptor)}.</p>'
                f'<p><a href="{esc(u["url"])}">Open the {esc(u["code"])} topic guide</a></p>'
                '</article>'
            )
        blocks.append(
            f'<section id="blog-curriculum-{i}" class="curriculum-blog-strand">'
            f'<h3>{esc(name)}</h3>'
            + "".join(cards) +
            '</section>'
        )

    return (
        f'{START}<section class="content-section curriculum-code-guide" id="curriculum-codes-at-a-glance">'
        f'<p class="eyebrow">Australian Curriculum v9</p>'
        f'<h2>{esc(level_label)} {esc(subject_label)} curriculum codes at a glance</h2>'
        f'<p>This guide is linked to the exact Australian Curriculum v9 content descriptions used by SkillrHub. '
        f'There are <strong>{len(units)} {esc(level_label)} {esc(subject_label)} curriculum codes</strong> in this subject. '
        f'Use the code list below to move from the broad year-level overview to the exact skill a student is learning.</p>'
        f'<nav aria-label="{esc(level_label)} {esc(subject_label)} curriculum strands"><ul>{nav}</ul></nav>'
        + "".join(blocks) +
        f'<p><small>Curriculum descriptions are reproduced from the curriculum data used to organise SkillrHub resources. '
        f'The Australian Curriculum remains the authority for official wording and scope.</small></p>'
        f'</section>{END}'
    )

def update_meta(text, level_label, subject_label, count):
    # Keep titles readable while adding the high-value curriculum/worksheet intent seen in Search Console.
    title = f"{level_label} {subject_label} Curriculum Australia | {count} Codes, Topics & Worksheets | SkillrHub"
    description = (
        f"Explore all {count} {level_label} {subject_label} Australian Curriculum v9 codes with exact content descriptions, "
        f"topic guides, worksheets, practice and tests."
    )
    text = re.sub(r"<title>[\s\S]*?</title>", f"<title>{esc(title)}</title>", text, count=1, flags=re.I)
    if re.search(r'<meta\s+name=["\']description["\']', text, re.I):
        text = re.sub(
            r'<meta\s+name=["\']description["\']\s+content=["\'][^"\']*["\']\s*/?>',
            f'<meta name="description" content="{esc(description)}">',
            text, count=1, flags=re.I
        )
    return text

def main():
    payload = json.loads(MANIFEST.read_text(encoding="utf-8"))
    units = payload["units"]

    buckets = defaultdict(list)
    for u in units:
        buckets[(u["yearNumber"], u["subjectSlug"])].append(u)

    changed = []
    missing = []

    for (year, subject), items in sorted(buckets.items()):
        items.sort(key=lambda u: u.get("sourceOrder", 0))
        level_label = "Foundation" if year == 0 else f"Year {year}"
        subject_label = SUBJECT_LABEL[subject]
        page = blog_path(items[0])
        if not page.exists():
            missing.append(str(page.relative_to(ROOT)))
            continue

        raw = page.read_text(encoding="utf-8", errors="ignore")
        clean = remove_marked(raw)
        clean = update_meta(clean, level_label, subject_label, len(items))
        block = build_section(items, level_label, subject_label)
        i = insertion_point(clean)
        out = clean[:i] + block + clean[i:]

        # Keep structured-data freshness aligned with the current editorial update.
        out = re.sub(r'"dateModified":"[^"]+"', '"dateModified":"2026-09-29"', out)

        if out != raw:
            page.write_text(out, encoding="utf-8")
            changed.append({
                "page": str(page.relative_to(ROOT)),
                "year": level_label,
                "subject": subject_label,
                "codes": len(items),
            })

    report = {
        "summary": {
            "expected_guides": len(buckets),
            "guides_changed": len(changed),
            "missing_guides": len(missing),
            "curriculum_codes_represented": sum(x["codes"] for x in changed),
        },
        "changed": changed,
        "missing": missing,
    }
    report_path = ROOT / "reports" / "curriculum-blog-enrichment.json"
    report_path.parent.mkdir(exist_ok=True)
    report_path.write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(report["summary"], indent=2))

if __name__ == "__main__":
    main()
