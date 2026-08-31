#!/usr/bin/env python3
"""Fix the exact site-wide regressions found in the final AdSense audit.

The transformations are deliberately mechanical: no route, layout or question-bank
content is redesigned. We remove known cross-subject copy, impossible displayed
attempt counts, duplicate-bank Homework wording and stale Skillr Education branding.
"""

from __future__ import annotations

import html
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
UNITS = json.loads((ROOT / "data/curriculum-units.json").read_text(encoding="utf-8"))["units"]

BAD_QUICK_READ = (
    "Students compare vocabulary, modality, terms of address, humour and interaction patterns "
    "across contexts and explain how language constructs closeness, expertise, authority or resistance."
)
BAD_FORMALITY = (
    "Formality is a continuum, not a simple polite/rude split. Authority can be accepted, negotiated "
    "or challenged through language."
)
BAD_TRAP = (
    "Formal means complex vocabulary. Clarity and appropriateness matter more than inflated words."
)
DUPLICATE_PHRASE = "same eight questions used in Practice and Test"
DUPLICATE_HUB = "Worksheet, Practice and Test use the same eight-question unit bank."


def esc(value: str) -> str:
    return html.escape(str(value), quote=True)


def trim(value: str, limit: int = 175) -> str:
    value = re.sub(r"\s+", " ", str(value)).strip().rstrip(".;")
    if len(value) <= limit:
        return value
    return value[:limit].rsplit(" ", 1)[0] + "…"


def notes(unit: dict) -> list[str]:
    eligible = [
        trim(e.get("text", ""))
        for e in unit.get("elaborations", [])
        if e.get("questionEligible") and e.get("text")
    ]
    out = [trim(unit.get("description", "")), *eligible[:2]]
    fallback = {
        "Mathematics": "Show the method, check units or representations, and confirm the answer is reasonable.",
        "Science": "Use observations, evidence and precise science vocabulary to justify the conclusion.",
        "English": "Use evidence from the text, language feature, structure or communication purpose to justify the choice.",
    }.get(unit.get("learningArea"), "Explain the choice and connect it directly to the curriculum skill.")
    out = [x for x in out if x]
    while len(out) < 3:
        out.append(fallback)
    return out[:3]


def activity_root(unit: dict) -> str:
    return unit["practiceUrl"].removesuffix("practice/").strip("/") + "/"


ROOTS = sorted(((activity_root(u), u) for u in UNITS), key=lambda item: len(item[0]), reverse=True)


def unit_for(rel: str) -> dict | None:
    for prefix, unit in ROOTS:
        if rel.startswith(prefix):
            return unit
    return None


def replace_bad_subject_copy(text: str, unit: dict) -> tuple[str, bool]:
    if unit.get("learningArea") == "English" or BAD_QUICK_READ not in text:
        return text, False
    n = notes(unit)
    original = text
    text = text.replace(BAD_QUICK_READ, esc(n[0]))
    text = text.replace(BAD_FORMALITY, esc(n[1]))
    text = text.replace(BAD_TRAP, esc(n[2]))
    return text, text != original


def repair_attempt_count(text: str) -> tuple[str, bool]:
    pattern = re.compile(
        r'(<span class="summary-number" id="questionCount">)(\d+)(</span>'
        r'<span class="summary-label">Questions this attempt</span></div>'
        r'<div><span class="summary-number">)(\d+)(</span>'
        r'<span class="summary-label">Question bank</span>)'
    )
    match = pattern.search(text)
    if not match:
        return text, False
    attempt, bank = int(match.group(2)), int(match.group(4))
    if attempt <= bank:
        return text, False
    text = text[:match.start(2)] + str(bank) + text[match.end(2):]
    text = re.sub(r'("maxQuestions"\s*:\s*)' + str(attempt) + r'\b', r'\g<1>' + str(bank), text, count=1)
    return text, True


def repair_homework_copy(text: str, rel: str) -> tuple[str, bool]:
    original = text
    if "/worksheet/" in f"/{rel}":
        text = re.sub(
            r"Download a worksheet containing the same eight questions used in Practice and Test\.?",
            "Use this printable homework sheet for written working, application and reflection alongside the online learning activities.",
            text,
            flags=re.I,
        )
        text = text.replace("• Worksheet", "• Homework")
        text = text.replace(" Worksheet</h1>", " Homework</h1>")
        text = text.replace("Download PDF worksheet", "Download PDF homework")
        text = text.replace(">Worksheet</a>", ">Homework</a>")
    text = text.replace(
        DUPLICATE_HUB,
        "Homework, Practice and Test support different parts of the learning cycle: written working, guided feedback and independent checking.",
    )
    return text, text != original


def repair_branding(text: str) -> tuple[str, bool]:
    new = text.replace("Skillr Education", "SkillrHub")
    return new, new != text


def main() -> None:
    stats = {"cross_subject": 0, "attempt_count": 0, "homework_copy": 0, "branding": 0, "files": 0}
    html_files = [p for p in ROOT.rglob("*.html") if ".git" not in p.parts and "node_modules" not in p.parts]

    for path in html_files:
        rel = path.relative_to(ROOT).as_posix()
        text = path.read_text(encoding="utf-8")
        original = text
        unit = unit_for(rel)
        if unit:
            text, changed = replace_bad_subject_copy(text, unit)
            stats["cross_subject"] += int(changed)
        if "/quiz/" in f"/{rel}":
            text, changed = repair_attempt_count(text)
            stats["attempt_count"] += int(changed)
            text, changed = repair_homework_copy(text, rel)
            stats["homework_copy"] += int(changed)
        text, changed = repair_branding(text)
        stats["branding"] += int(changed)
        if text != original:
            path.write_text(text, encoding="utf-8")
            stats["files"] += 1

    manifest = ROOT / "manifest.webmanifest"
    if manifest.exists():
        before = manifest.read_text(encoding="utf-8")
        after = before.replace("Skillr Education", "SkillrHub")
        if after != before:
            manifest.write_text(after, encoding="utf-8")
            stats["branding"] += 1
            stats["files"] += 1

    failures: list[str] = []
    for path in html_files:
        rel = path.relative_to(ROOT).as_posix()
        text = path.read_text(encoding="utf-8")
        unit = unit_for(rel)
        if unit and unit.get("learningArea") != "English" and BAD_QUICK_READ in text:
            failures.append(f"cross-subject content remains: {rel}")
        if DUPLICATE_PHRASE.lower() in text.lower():
            failures.append(f"duplicate Practice/Test wording remains: {rel}")
        if "Skillr Education" in text:
            failures.append(f"legacy branding remains: {rel}")
        m = re.search(
            r'id="questionCount">(\d+)</span><span class="summary-label">Questions this attempt</span></div>'
            r'<div><span class="summary-number">(\d+)</span><span class="summary-label">Question bank</span>',
            text,
        )
        if m and int(m.group(1)) > int(m.group(2)):
            failures.append(f"attempt exceeds bank: {rel} ({m.group(1)} > {m.group(2)})")

    print(json.dumps(stats, indent=2))
    if failures:
        print("AdSense final guard failures:")
        for failure in failures[:200]:
            print("-", failure)
        raise SystemExit(1)


if __name__ == "__main__":
    main()
