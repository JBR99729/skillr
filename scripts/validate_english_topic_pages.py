#!/usr/bin/env python3
"""Validate non-negotiable English F–10 topic-page quality rules.

This gate deliberately checks structural/cross-curriculum regressions that can be
verified mechanically. Teacher review remains required for conceptual depth,
examples, misconceptions and curriculum fit before pages are marked frozen.
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
YEAR_ROOTS = [ROOT / "foundation", *[ROOT / f"year{year}" for year in range(1, 11)]]

GENERIC_FILLER = (
    "The goal is not to memorise one answer pattern",
    "Use concrete examples, pictures, oral explanation and short written responses before moving to independent practice",
    "Finish with a mixed activity so students must choose the correct strategy rather than copy the last example",
    "Answering from memory without using clues from the text, sentence or image",
    "Knowing the idea orally but not transferring it into reading, writing or speaking",
    "Missing punctuation, word order or vocabulary clues that change meaning",
)

CROSS_SUBJECT = (
    "Next Generation Science Standards",
    "nextgenscience.org",
    "NGSS science",
    "Common Core Mathematics/ELA",
    "Common Core Mathematics",
)

REQUIRED_MAPPING_TERMS = (
    "Australian Curriculum v9.0",
    "Victorian Curriculum F-10",
    "NSW",
    "Common Core",
    "Key Stage",
    "Canada",
    "New Zealand",
    "NCERT / CBSE",
)


def english_pages() -> list[Path]:
    pages: list[Path] = []
    for year_root in YEAR_ROOTS:
        english = year_root / "english"
        if not english.is_dir():
            continue
        for page in english.glob("*/index.html"):
            if re.match(r"ac9e", page.parent.name, re.I):
                pages.append(page)
    return sorted(pages)


def main() -> None:
    errors: list[str] = []
    pages = english_pages()
    if not pages:
        print("FAIL: no canonical English topic pages found.")
        sys.exit(1)

    for page in pages:
        source = page.read_text(encoding="utf-8", errors="replace")
        rel = page.relative_to(ROOT)

        for phrase in GENERIC_FILLER:
            if phrase in source:
                errors.append(f"{rel}: generic English boilerplate remains: {phrase}")

        for phrase in CROSS_SUBJECT:
            if phrase.lower() in source.lower():
                errors.append(f"{rel}: cross-subject curriculum mapping/reference remains: {phrase}")

        if "International curriculum mapping" not in source:
            errors.append(f"{rel}: missing international curriculum mapping section")
        else:
            for term in REQUIRED_MAPPING_TERMS:
                if term.lower() not in source.lower():
                    errors.append(f"{rel}: mapping is missing expected English/ELA jurisdiction marker: {term}")

        if "Common mistakes" not in source and "Student misconceptions" not in source:
            errors.append(f"{rel}: missing misconceptions section")

        if "Explicit Teaching" not in source or "Formative Assessment" not in source:
            errors.append(f"{rel}: missing four-step English instructional sequence")

        if "Subject-Specific Content" not in source and "Key Examples" not in source:
            errors.append(f"{rel}: missing subject-specific examples section")

        if "rel=\"canonical\"" not in source and "rel='canonical'" not in source:
            errors.append(f"{rel}: missing canonical link")

        for href in ("/worksheet/", "/practice/", "/test/"):
            if href not in source:
                errors.append(f"{rel}: missing resource link containing {href}")

    if errors:
        for error in errors[:300]:
            print(error)
        if len(errors) > 300:
            print(f"...and {len(errors) - 300} more")
        print(f"FAIL: {len(errors)} English topic-page quality errors across {len(pages)} pages.")
        sys.exit(1)

    print(f"PASS: {len(pages)} English topic pages satisfy the locked structural and cross-curriculum quality gate.")


if __name__ == "__main__":
    main()
