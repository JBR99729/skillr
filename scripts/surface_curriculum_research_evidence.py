#!/usr/bin/env python3
"""Surface real code-specific research evidence on canonical curriculum pages.

This is intentionally evidence-gated: a page is changed only when the repository
contains a research/review record that explicitly mentions that curriculum code.
No "human-written" or "expert-reviewed" claim is invented.
"""

from __future__ import annotations

import html
import json
import re
from collections import defaultdict
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "data" / "curriculum-units.json"
REPORT = ROOT / "reports" / "curriculum-research-evidence-surface.json"

START = "<!-- skillr-source-evidence:start -->"
END = "<!-- skillr-source-evidence:end -->"
LEGACY_START = "<!-- skillr-research-evidence:start -->"
LEGACY_END = "<!-- skillr-research-evidence:end -->"
CODE_RE = re.compile(r"\bAC9[EMS](?:F|\d+)[A-Z]+\d{2}\b", re.I)
ROBOTS_RE = re.compile(r'<meta\s+name=["\']robots["\']\s+content=["\']([^"\']*)["\']', re.I)
CANONICAL_RE = re.compile(r'<link\s+rel=["\']canonical["\']\s+href=["\']([^"\']+)["\']', re.I)

TEXT_EXTS = {".md", ".txt", ".json", ".js", ".mjs", ".py"}
ROOT_MASTER_RE = re.compile(r"(Research_Master|Content_Verification_Master)", re.I)
RESEARCH_PATH_RE = re.compile(
    r"^(reports/|docs/question-bank-reviews/|docs/research/|content-quality/)|"
    r"(SOURCES|AUTHOR|REVIEW|READINESS|VALIDATION|RESEARCH|AUDIT)",
    re.I,
)

CATEGORY_RULES = [
    ("Source review", re.compile(r"SOURCE|SOURCES", re.I)),
    ("Independent review", re.compile(r"INDEPENDENT", re.I)),
    ("Authoring record", re.compile(r"AUTHOR", re.I)),
    ("Validation record", re.compile(r"VALIDATION|RELEASE", re.I)),
    ("Benchmark / coverage review", re.compile(r"IXL|KHAN|READINESS|COVERAGE", re.I)),
    ("Curriculum research master", re.compile(r"Research_Master", re.I)),
    ("Content verification", re.compile(r"Content_Verification", re.I)),
    ("Quality audit", re.compile(r"AUDIT|QUALITY", re.I)),
]

def esc(v: str) -> str:
    return html.escape(str(v), quote=True)

def canonical_path(url: str) -> str:
    return urlparse(url).path.rstrip("/") + "/"

def remove_pair(text: str, start: str, end: str) -> str:
    a = text.find(start)
    if a < 0:
        return text
    b = text.find(end, a)
    if b < 0:
        raise RuntimeError(f"{start} without matching end marker")
    return text[:a] + text[b + len(end):]

def remove_marked(text: str) -> str:
    text = remove_pair(text, LEGACY_START, LEGACY_END)
    return remove_pair(text, START, END)

def is_primary(page: Path, raw: str) -> bool:
    robots = ROBOTS_RE.search(raw)
    if robots and "noindex" in robots.group(1).lower():
        return False
    can = CANONICAL_RE.search(raw)
    if not can:
        return False
    expected = "/" + page.parent.relative_to(ROOT).as_posix().rstrip("/") + "/"
    return canonical_path(can.group(1)) == expected

def research_files():
    for p in ROOT.rglob("*"):
        if not p.is_file() or p.suffix.lower() not in TEXT_EXTS:
            continue
        rel = p.relative_to(ROOT).as_posix()
        if ROOT_MASTER_RE.search(p.name) or RESEARCH_PATH_RE.search(rel):
            yield p

def build_research_index():
    by_code = defaultdict(list)
    for p in research_files():
        try:
            text = p.read_text(encoding="utf-8", errors="ignore")
        except OSError:
            continue
        codes = set(m.group(0).upper() for m in CODE_RE.finditer(text))
        # code in filename/path is also evidence even if a binary-like export has sparse text
        codes.update(m.group(0).upper() for m in CODE_RE.finditer(p.relative_to(ROOT).as_posix()))
        for code in codes:
            by_code[code].append(p)
    return by_code

def public_records(paths):
    """Only expose substantive curriculum/source/review records to users."""
    allow = re.compile(
        r"(SOURCES|SOURCE-REVIEW|INDEPENDENT|AUTHOR|VALIDATION|RELEASE|READINESS|COVERAGE|"
        r"Research_Master|Content_Verification|QUESTION-BANK-REVIEW|quality-audit|curriculum-components)",
        re.I,
    )
    deny = re.compile(
        r"(preview|asset|runtime|migration|workflow|sitemap|manifest|generated|export|cache|"
        r"question[s]?\.js$|bank\.json$|assessment-banks/)",
        re.I,
    )
    chosen = []
    for p in paths:
        rel = p.relative_to(ROOT).as_posix()
        if allow.search(rel) and not deny.search(rel):
            chosen.append(p)
    return chosen

def categories(paths):
    found = []
    joined = "\n".join(p.relative_to(ROOT).as_posix() for p in paths)
    for label, rx in CATEGORY_RULES:
        if rx.search(joined):
            found.append(label)
    return found[:5] or ["Code-specific research record"]

def bank_counts(code: str):
    code_lower = code.lower()
    candidates = list((ROOT / "assets" / "assessment-banks").rglob(f"{code_lower}.json")) if (ROOT / "assets" / "assessment-banks").exists() else []
    for p in candidates:
        try:
            data = json.loads(p.read_text(encoding="utf-8"))
        except Exception:
            continue
        if isinstance(data, list):
            practice = sum(1 for x in data if str(x.get("bank", "")).lower() == "practice")
            test = sum(1 for x in data if str(x.get("bank", "")).lower() == "test")
            return practice, test
    return None, None

def insert_block(raw: str, block: str) -> str:
    # Prefer immediately before existing curriculum-equivalence material.
    markers = [
        "<!-- skillr-curriculum-equivalents:start -->",
        "<!-- skillr-facebook-feedback:start -->",
        "</main>",
        "</body>",
    ]
    for marker in markers:
        i = raw.find(marker)
        if i >= 0:
            return raw[:i] + block + raw[i:]
    return raw + block

def make_block(unit, paths):
    code = unit["code"]
    cats = categories(paths)
    practice, test = bank_counts(code)
    visible_paths = public_records(paths)
    record_count = len(visible_paths)
    descriptor = str(unit.get("description") or "").strip().rstrip(".")
    examples = sorted({p.name for p in visible_paths})[:3]

    cats = categories(visible_paths)
    evidence_bits = "".join(f"<li>{esc(x)}</li>" for x in cats)
    file_bits = "".join(f"<li><code>{esc(x)}</code></li>" for x in examples)
    assessment = ""
    if practice is not None or test is not None:
        assessment = f"<li><strong>Assessment bank:</strong> {practice or 0} Practice items and {test or 0} Test items are currently stored for this code.</li>"

    return (
        f"{START}<details class=\"curriculum-topic-section source-development-notes\" id=\"source-development-notes\">"
        f"<summary><strong>Sources &amp; curriculum development</strong></summary><div class=\"curriculum-detail-body\">"
        f"<h2>Sources used for {esc(code)}</h2>"
        f"<p>This topic is aligned to the Australian Curriculum v9 content description: <q>{esc(descriptor)}</q>.</p>"
        f"<h3>Source and quality checks</h3><ul>{evidence_bits}{assessment}</ul>"
        f"<h3>Example source records</h3><ul>{file_bits}</ul>"
        f"<p><small>These source records document curriculum interpretation, source checking, authoring or validation used to develop this topic. "
        f"The official curriculum remains the authority for the curriculum description.</small></p>"
        f"</div></details>{END}"
    )

def main():
    units = {u["code"].upper(): u for u in json.loads(MANIFEST.read_text(encoding="utf-8"))["units"]}
    by_code = build_research_index()
    changed = []
    skipped = []

    for code, unit in units.items():
        url = unit.get("url")
        if not url:
            continue
        page = ROOT / str(url).lstrip("/") / "index.html"
        if not page.exists():
            skipped.append({"code": code, "reason": "topic page missing"})
            continue
        raw = page.read_text(encoding="utf-8", errors="ignore")
        if not is_primary(page, raw):
            skipped.append({"code": code, "reason": "not canonical/indexable primary"})
            continue

        cleaned = remove_marked(raw)
        records = by_code.get(code, [])
        if not public_records(records):
            # If an old generated block exists but the evidence disappeared, remove it.
            if cleaned != raw:
                page.write_text(cleaned, encoding="utf-8")
            skipped.append({"code": code, "reason": "no explicit research record"})
            continue

        out = insert_block(cleaned, make_block(unit, records))
        if out != raw:
            page.write_text(out, encoding="utf-8")
            changed.append({
                "code": code,
                "page": page.relative_to(ROOT).as_posix(),
                "source_records": len(public_records(records)),
                "evidence_types": categories(public_records(records)),
                "sample_records": [p.relative_to(ROOT).as_posix() for p in sorted(public_records(records))[:3]],
            })

    report = {
        "method": "Evidence-gated visible source section; no page receives a source/development claim without an explicit code-specific repository record.",
        "summary": {
            "curriculum_codes": len(units),
            "codes_with_research_evidence": sum(1 for c in units if by_code.get(c)),
            "canonical_pages_changed": len(changed),
            "skipped": len(skipped),
        },
        "changed": changed,
        "skipped": skipped,
    }
    REPORT.parent.mkdir(parents=True, exist_ok=True)
    REPORT.write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(json.dumps(report["summary"], indent=2))

if __name__ == "__main__":
    main()
