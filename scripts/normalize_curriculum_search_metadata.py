#!/usr/bin/env python3
"""Normalize canonical curriculum topic metadata against the exact curriculum descriptor.

Search Console evidence (six months to 2026-09-28) shows SkillrHub is most often
tested for:
1. exact curriculum codes plus near-verbatim content descriptions;
2. Year + subject + worksheets;
3. Year + subject + curriculum/topics.

This post-build pass keeps the exact Australian Curriculum v9 wording authoritative
while using the description tag to capture the observed worksheet/practice/topic intent.
Only self-canonical, indexable curriculum topic pages are changed. Legacy/noindex
alternate routes are deliberately ignored.
"""

from __future__ import annotations

import html
import json
import re
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
SITE = "https://skillrhub.com"
MANIFEST = ROOT / "data" / "curriculum-units.json"
REPORT = ROOT / "reports" / "curriculum-search-metadata-audit.json"

CODE_RE = re.compile(r"^(ac9[a-z0-9]+)", re.I)
TITLE_RE = re.compile(r"<title[^>]*>[\s\S]*?</title>", re.I)
DESC_RE = re.compile(r'<meta\s+name=["\']description["\']\s+content=["\'][^"\']*["\']\s*/?>', re.I)
ROBOTS_RE = re.compile(r'<meta\s+name=["\']robots["\']\s+content=["\']([^"\']*)["\']', re.I)
CANONICAL_RE = re.compile(r'<link\s+rel=["\']canonical["\']\s+href=["\']([^"\']+)["\']\s*/?>', re.I)
H1_RE = re.compile(r"<h1([^>]*)>[\s\S]*?</h1>", re.I)
OG_TITLE_RE = re.compile(r'<meta\s+property=["\']og:title["\']\s+content=["\'][^"\']*["\']\s*/?>', re.I)
OG_DESC_RE = re.compile(r'<meta\s+property=["\']og:description["\']\s+content=["\'][^"\']*["\']\s*/?>', re.I)

SUBJECT_LABEL = {"maths": "Maths", "english": "English", "science": "Science"}


def esc(value: str) -> str:
    return html.escape(value, quote=True)


def canonical_path(url: str) -> str:
    return urlparse(url).path.rstrip("/") + "/"


def topic_candidates():
    roots = [ROOT / "foundation", *[ROOT / f"year{n}" for n in range(1, 11)]]
    for base in roots:
        if not base.exists():
            continue
        for subject in ("maths", "english", "science"):
            sroot = base / subject
            if not sroot.exists():
                continue
            for folder in sroot.iterdir():
                if not folder.is_dir():
                    continue
                m = CODE_RE.match(folder.name)
                page = folder / "index.html"
                if m and page.exists():
                    yield m.group(1).upper(), base.name, subject, page


def expected_self_path(page: Path) -> str:
    rel = page.relative_to(ROOT).parent.as_posix()
    return "/" + rel.rstrip("/") + "/"


def is_primary(html_text: str, page: Path) -> tuple[bool, str]:
    robots = ROBOTS_RE.search(html_text)
    if robots and "noindex" in robots.group(1).lower():
        return False, "noindex"
    can = CANONICAL_RE.search(html_text)
    if not can:
        return False, "missing canonical"
    if canonical_path(can.group(1)) != expected_self_path(page):
        return False, "canonical points elsewhere"
    return True, "primary"


def seo_title(code: str, descriptor: str, year_label: str, subject_label: str) -> str:
    return f"{code} | {descriptor} | {year_label} {subject_label}"


def seo_description(code: str, descriptor: str, year_label: str, subject_label: str) -> str:
    return (
        f"{code}: {descriptor}. {year_label} {subject_label} Australian Curriculum v9 "
        f"topic guide with free worksheet, practice and test."
    )


def year_label(folder: str) -> str:
    if folder == "foundation":
        return "Foundation"
    return folder.replace("year", "Year ")


def replace_or_insert_meta(text: str, regex: re.Pattern[str], replacement: str) -> str:
    if regex.search(text):
        return regex.sub(replacement, text, count=1)
    return text.replace("</title>", "</title>\n  " + replacement, 1)


def main():
    units = {u["code"].upper(): u for u in json.loads(MANIFEST.read_text(encoding="utf-8"))["units"]}
    changed = []
    skipped = []
    missing_manifest = []
    h1_not_static = []

    seen_primary = set()
    for code, folder, subject, page in topic_candidates():
        raw = page.read_text(encoding="utf-8", errors="ignore")
        primary, reason = is_primary(raw, page)
        if not primary:
            skipped.append({"code": code, "page": str(page.relative_to(ROOT)), "reason": reason})
            continue
        if code not in units:
            missing_manifest.append({"code": code, "page": str(page.relative_to(ROOT))})
            continue

        unit = units[code]
        descriptor = str(unit.get("description") or "").strip().rstrip(".")
        if not descriptor:
            missing_manifest.append({"code": code, "page": str(page.relative_to(ROOT)), "reason": "empty descriptor"})
            continue

        y = year_label(folder)
        s = SUBJECT_LABEL[subject]
        title = seo_title(code, descriptor, y, s)
        description = seo_description(code, descriptor, y, s)

        out = raw
        out = TITLE_RE.sub(f"<title>{esc(title)}</title>", out, count=1)
        out = replace_or_insert_meta(out, DESC_RE, f'<meta name="description" content="{esc(description)}">')
        out = replace_or_insert_meta(out, OG_TITLE_RE, f'<meta property="og:title" content="{esc(title)}">')
        out = replace_or_insert_meta(out, OG_DESC_RE, f'<meta property="og:description" content="{esc(description)}">')

        # Keep the visible main heading aligned where the page owns a static H1.
        if H1_RE.search(out):
            out = H1_RE.sub(lambda m: f"<h1{m.group(1)}>{esc(code)}: {esc(descriptor)}</h1>", out, count=1)
        else:
            h1_not_static.append({"code": code, "page": str(page.relative_to(ROOT))})

        if out != raw:
            page.write_text(out, encoding="utf-8")
            changed.append({
                "code": code,
                "page": str(page.relative_to(ROOT)),
                "title": title,
                "description": description,
                "descriptor": descriptor,
            })
        seen_primary.add(code)

    report = {
        "strategy": {
            "source_of_truth": "data/curriculum-units.json workbook-derived Australian Curriculum v9 content description",
            "search_console_window": "2026-03-29 to 2026-09-28",
            "observed_query_patterns": [
                "exact curriculum code + near-verbatim descriptor",
                "Year + subject + worksheets",
                "Year + subject + curriculum",
                "Year + subject + topics",
            ],
            "rule": "exact descriptor in title/H1; worksheet/practice/topic intent in meta description",
        },
        "summary": {
            "manifest_codes": len(units),
            "primary_codes_seen": len(seen_primary),
            "pages_changed": len(changed),
            "legacy_or_nonprimary_skipped": len(skipped),
            "missing_manifest": len(missing_manifest),
            "dynamic_h1_pages": len(h1_not_static),
        },
        "changed": changed,
        "skipped": skipped,
        "missing_manifest": missing_manifest,
        "dynamic_h1_pages": h1_not_static,
    }
    REPORT.parent.mkdir(parents=True, exist_ok=True)
    REPORT.write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(json.dumps(report["summary"], indent=2))


if __name__ == "__main__":
    main()
