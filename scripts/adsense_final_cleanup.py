#!/usr/bin/env python3
"""Patch known AdSense-risk regressions without changing routes or layout.

This script is intentionally narrow. It fixes only the exact patterns found in the
live audit: cross-subject Quick Read text, impossible attempt/bank counts, visible
Worksheet legacy wording on quiz homework pages, and stale Skillr Education branding.
It then fails if any of those signatures remain in user-facing HTML.
"""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
UNITS_PATH = ROOT / "data" / "curriculum-units.json"

BAD_QUICK_READ = (
    "Students compare vocabulary, modality, terms of address, humour and interaction "
    "patterns across contexts and explain how language constructs closeness, expertise, "
    "authority or resistance."
)
BAD_FORMALITY = (
    "Formality is a continuum, not a simple polite/rude split. Authority can be accepted, "
    "negotiated or challenged through language."
)
BAD_TRAP = (
    "Formal means complex vocabulary. Clarity and appropriateness matter more than inflated words."
)


def esc(text: str) -> str:
    return (
        str(text)
        .replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
    )


def trim(text: str, limit: int = 170) -> str:
    text = re.sub(r"\s+", " ", str(text)).strip().rstrip(".;")
    if len(text) <= limit:
        return text
    cut = text[:limit].rsplit(" ", 1)[0]
    return cut + "…"


def unit_notes(unit: dict) -> list[str]:
    eligible = [
        trim(item.get("text", ""))
        for item in unit.get("elaborations", [])
        if item.get("questionEligible") and item.get("text")
    ]
    notes = [trim(unit.get("description", ""))] + eligible[:2]
    subject = unit.get("learningArea", "")
    fallback = {
        "Mathematics": "Show enough working to make the mathematical reasoning clear and check the answer is reasonable.",
        "Science": "Use observations, evidence and precise science vocabulary to justify the conclusion.",
        "English": "Use evidence from the text, language feature, structure or communication purpose to justify the choice.",
    }.get(subject, "Explain the choice and connect it directly to the curriculum skill.")
    notes = [n for n in notes if n]
    while len(notes) < 3:
        notes.append(fallback)
    return notes[:3]


def replace_bad_quick_read(text: str, unit: dict) -> tuple[str, bool]:
    if BAD_QUICK_READ not in text:
        return text, False
    items = "".join(f"<li>{esc(note)}</li>" for note in unit_notes(unit))
    replacement = f'<section class="pre-read-notes"><h2>60-second Quick Read</h2><ul>{items}</ul></section>'
    pattern = re.compile(
        r'<section class="pre-read-notes"><h2>60-second Quick Read</h2><ul>.*?</ul></section>',
        re.S,
    )
    new_text, count = pattern.subn(replacement, text, count=1)
    if count:
        return new_text, True

    # Fallback for older shells whose heading differs slightly.
    pattern = re.compile(r'<section class="pre-read-notes">.*?</section>', re.S)
    new_text, count = pattern.subn(replacement, text, count=1)
    return new_text, bool(count)


def repair_attempt_bank_mismatch(text: str) -> tuple[str, bool]:
    changed = False
    summary = re.search(
        r'<span class="summary-number" id="questionCount">(\d+)</span>'
        r'<span class="summary-label">Questions this attempt</span></div>'
        r'<div><span class="summary-number">(\d+)</span>'
        r'<span class="summary-label">Question bank</span>',
        text,
    )
    if not summary:
        return text, changed
    attempt = int(summary.group(1))
    bank = int(summary.group(2))
    if attempt <= bank:
        return text, changed

    text = text[: summary.start(1)] + str(bank) + text[summary.end(1) :]
    text, n = re.subn(r'("maxQuestions"\s*:\s*)' + str(attempt), r'\g<1>' + str(bank), text, count=1)
    changed = True or bool(n)
    return text, changed


def homework_wording(text: str) -> tuple[str, bool]:
    original = text
    replacements = {
        "Download a worksheet containing the same eight questions used in Practice and Test.":
            "Use this printable homework sheet for written practice, working and reflection before or after the online activities.",
        "Worksheet, Practice and Test use the same eight-question unit bank.":
            "Homework, Practice and Test support different parts of the learning cycle: written working, guided feedback and independent checking.",
        "• Worksheet": "• Homework",
        " Worksheet</h1>": " Homework</h1>",
        "Download PDF worksheet": "Download PDF homework",
        ">Worksheet</a>": ">Homework</a>",
    }
    for old, new in replacements.items():
        text = text.replace(old, new)
    return text, text != original


def branding(text: str) -> tuple[str, bool]:
    new_text = text.replace("Skillr Education", "SkillrHub")
    return new_text, new_text != text


def main() -> None:
    data = json.loads(UNITS_PATH.read_text(encoding="utf-8"))
    units = data.get("units", [])
    by_path: dict[str, dict] = {}
    for unit in units:
        for key in ("practiceUrl", "testUrl"):
            url = unit.get(key)
            if url:
                by_path[url.strip("/") + "/index.html"] = unit

    stats = {
        "quick_read": 0,
        "attempt_bank": 0,
        "homework_wording": 0,
        "branding": 0,
        "files_changed": 0,
    }

    html_files = [p for p in ROOT.rglob("*.html") if ".git" not in p.parts and "node_modules" not in p.parts]
    for path in html_files:
        rel = path.relative_to(ROOT).as_posix()
        text = path.read_text(encoding="utf-8")
        original = text

        unit = by_path.get(rel)
        if unit and ("/math/" in f"/{rel}" or "/science/" in f"/{rel}"):
            text, changed = replace_bad_quick_read(text, unit)
            stats["quick_read"] += int(changed)

        if "/quiz/" in f"/{rel}" and ("/practice/" in f"/{rel}" or "/test/" in f"/{rel}"):
            text, changed = repair_attempt_bank_mismatch(text)
            stats["attempt_bank"] += int(changed)

        if "/quiz/" in f"/{rel}" and ("/worksheet/" in f"/{rel}" or rel.count("/") <= 6):
            text, changed = homework_wording(text)
            stats["homework_wording"] += int(changed)

        text, changed = branding(text)
        stats["branding"] += int(changed)

        if text != original:
            path.write_text(text, encoding="utf-8")
            stats["files_changed"] += 1

    # Also clean branding in the web app manifest if present.
    manifest = ROOT / "manifest.webmanifest"
    if manifest.exists():
        text = manifest.read_text(encoding="utf-8")
        new_text = text.replace("Skillr Education", "SkillrHub")
        if new_text != text:
            manifest.write_text(new_text, encoding="utf-8")
            stats["branding"] += 1
            stats["files_changed"] += 1

    failures: list[str] = []
    for path in html_files:
        text = path.read_text(encoding="utf-8")
        rel = path.relative_to(ROOT).as_posix()
        if BAD_QUICK_READ in text and ("/math/" in f"/{rel}" or "/science/" in f"/{rel}"):
            failures.append(f"cross-subject Quick Read remains: {rel}")
        if "same eight questions used in Practice and Test" in text:
            failures.append(f"duplicate-bank wording remains: {rel}")
        if "Skillr Education" in text:
            failures.append(f"legacy branding remains: {rel}")

        mismatch = re.search(
            r'id="questionCount">(\d+)</span><span class="summary-label">Questions this attempt</span></div>'
            r'<div><span class="summary-number">(\d+)</span><span class="summary-label">Question bank</span>',
            text,
        )
        if mismatch and int(mismatch.group(1)) > int(mismatch.group(2)):
            failures.append(
                f"attempt exceeds bank in {rel}: {mismatch.group(1)} > {mismatch.group(2)}"
            )

    print(json.dumps(stats, indent=2))
    if failures:
        print("AdSense cleanup guard failures:")
        for failure in failures[:100]:
            print(f"- {failure}")
        raise SystemExit(1)


if __name__ == "__main__":
    main()
