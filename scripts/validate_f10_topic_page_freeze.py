#!/usr/bin/env python3
"""Validate the final F-10 Maths/English/Science topic-page freeze gate."""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
YEAR_ROOTS = [ROOT / "foundation", *[ROOT / f"year{n}" for n in range(1, 11)]]

GENERIC_ENGLISH = (
    "The goal is not to memorise one answer pattern",
    "Use concrete examples, pictures, oral explanation and short written responses before moving to independent practice",
    "Finish with a mixed activity so students must choose the correct strategy rather than copy the last example",
    "Answering from memory without using clues from the text, sentence or image",
    "Knowing the idea orally but not transferring it into reading, writing or speaking",
    "Missing punctuation, word order or vocabulary clues that change meaning",
    "Common Core Mathematics/ELA",
    "Next Generation Science Standards",
    "nextgenscience.org",
)

GENERIC_SCIENCE_INQUIRY = (
    "Use the shared model to foreground",
    "We are learning to explain develop",
    "We are learning to explain design",
    "We are learning to explain collect",
    "make the role of",
)

EXTERNAL_MATH_RENDERERS = (
    "mathjax",
    "katex",
    "tex-mml-chtml",
    "cdn.jsdelivr.net/npm/katex",
)


def canonical_pages() -> list[Path]:
    pages: list[Path] = []
    for root in YEAR_ROOTS:
        for subject in ("maths", "science", "english"):
            folder = root / subject
            if not folder.is_dir():
                continue
            for page in folder.glob("*/index.html"):
                if re.match(r"ac9[mes]", page.parent.name, re.I):
                    pages.append(page)
    return sorted(pages)


def code_from(path: Path, source: str) -> str:
    match = re.search(r"AC9[MES][A-Z0-9]+", source, re.I) or re.search(r"ac9[mes][a-z0-9]+", path.as_posix(), re.I)
    return match.group(0).upper() if match else "UNKNOWN"


def require_resource_links(source: str, rel: str, errors: list[str]) -> None:
    if "/worksheet/" not in source:
        errors.append(f"{rel}: missing Worksheet/Practice Sheet route")
    if "/practice/" not in source:
        errors.append(f"{rel}: missing Practice route")
    if "/test/" not in source:
        errors.append(f"{rel}: missing Test route")
    if "teacher-slide" not in source.lower():
        errors.append(f"{rel}: missing Teacher Slides route")


def main() -> None:
    errors: list[str] = []
    warnings: list[str] = []
    pages = canonical_pages()
    if len(pages) < 600:
        errors.append(f"Expected a full F-10 curriculum surface; found only {len(pages)} Maths/English/Science topic pages")

    counts = {"maths": 0, "science": 0, "english": 0}
    for page in pages:
        source = page.read_text(encoding="utf-8", errors="replace")
        rel = page.relative_to(ROOT).as_posix()
        code = code_from(page, source)
        subject = "maths" if "/maths/" in f"/{rel}" else "science" if "/science/" in f"/{rel}" else "english"
        counts[subject] += 1

        if 'rel="canonical"' not in source and "rel='canonical'" not in source:
            errors.append(f"{rel}: missing canonical URL")
        for bad in EXTERNAL_MATH_RENDERERS:
            if bad in source.lower():
                errors.append(f"{rel}: external math renderer found: {bad}")
        require_resource_links(source, rel, errors)

        if subject == "english":
            for marker in GENERIC_ENGLISH:
                if marker.lower() in source.lower():
                    errors.append(f"{rel}: legacy generic English content remains: {marker}")
            if "Common Core Mathematics" in source or "NGSS" in source and "Common Core ELA" not in source:
                errors.append(f"{rel}: cross-subject English curriculum mapping remains")

        if code.startswith("AC9E10"):
            has_examples = "10 important examples" in source or "Ten worked examples" in source or "Ten worked examples" in source or "2. Ten worked examples" in source
            has_questions = "10 important questions" in source or "Ten-question practice" in source or "Ten-question practice set" in source
            has_answers = "Indicative responses" in source or "Solutions and indicative responses" in source or "Solutions / indicative responses" in source
            if not has_examples:
                errors.append(f"{rel}: Year 10 English page lacks 10 worked examples")
            if not has_questions:
                errors.append(f"{rel}: Year 10 English page lacks 10-question practice")
            if not has_answers:
                errors.append(f"{rel}: Year 10 English page lacks solutions/indicative responses")
            if "international curriculum" not in source.lower():
                errors.append(f"{rel}: Year 10 English page lacks international English/ELA mapping")

        if code.startswith("AC9S10I"):
            for marker in GENERIC_SCIENCE_INQUIRY:
                if marker.lower() in source.lower():
                    errors.append(f"{rel}: generic Science Inquiry content remains: {marker}")
            if "Ten worked inquiry examples" not in source:
                errors.append(f"{rel}: Science Inquiry page lacks 10 worked examples")
            if "Ten-question practice set" not in source:
                errors.append(f"{rel}: Science Inquiry page lacks 10-question practice")
            if "Solutions and indicative responses" not in source:
                errors.append(f"{rel}: Science Inquiry page lacks solutions")
            if "International curriculum alignment" not in source:
                errors.append(f"{rel}: Science Inquiry page lacks international inquiry mapping")

        # Non-blocking content heuristics for final human review.
        if subject in ("maths", "science") and len(re.sub(r"<[^>]+>", " ", source).split()) < 180:
            warnings.append(f"{rel}: unusually short topic page; inspect manually")

    print(f"Audited {len(pages)} topic pages: Maths={counts['maths']} English={counts['english']} Science={counts['science']}")
    if warnings:
        print(f"WARNINGS ({len(warnings)}):")
        for warning in warnings[:100]:
            print("-", warning)
        if len(warnings) > 100:
            print(f"... and {len(warnings)-100} more warnings")
    if errors:
        print(f"FAIL: {len(errors)} freeze-gate errors")
        for error in errors[:400]:
            print("-", error)
        if len(errors) > 400:
            print(f"... and {len(errors)-400} more errors")
        sys.exit(1)
    print("PASS: F-10 topic-page freeze gate")


if __name__ == "__main__":
    main()
