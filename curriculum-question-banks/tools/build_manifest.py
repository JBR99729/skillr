#!/usr/bin/env python3
"""Build a complete curriculum coverage manifest for staged question banks.

The supplied structure file intentionally omits question-ineligible cultural
references.  Some English content descriptions contain both an excluded
reference and otherwise assessable curriculum content, so this builder audits
the structure against the site's canonical unit data and restores any omitted
content codes with a sanitised assessment description.
"""

from __future__ import annotations

import argparse
import json
import re
from collections import Counter, defaultdict
from pathlib import Path


SUBJECT_RE = re.compile(r"^SUBJECT: ([A-Z]+)")
LEVEL_RE = re.compile(r"^  \[Level: (.+?)\] - (\d+) Unit Codes$")
CODE_RE = re.compile(r"^  Code: (AC9\w+)$")
DESCRIPTION_RE = re.compile(r"^  Description: (.+)$")
SUBJECT_ORDER = {"English": 0, "Mathematics": 1, "Science": 2}
LEVEL_ORDER = {"Foundation Year": 0, **{f"Year {year}": year for year in range(1, 11)}}


def sanitise_description(description: str) -> str:
    """Remove excluded references without discarding the assessable unit."""

    value = re.sub(
        r"First Nations Australian,?\s+(?:and\s+)?",
        "",
        description,
        flags=re.IGNORECASE,
    )
    value = re.sub(r"\s+", " ", value)
    return value.strip(" ,")


def unit_record(
    code: str,
    subject: str,
    level: str,
    description: str,
) -> dict[str, object]:
    excluded = subject == "Mathematics" and level == "Foundation Year"
    return {
        "code": code,
        "subject": subject,
        "level": level,
        "description": sanitise_description(description),
        "scope": (
            "excluded-foundation-mathematics-completed" if excluded else "generate"
        ),
        "target": {
            "practice": 56,
            "exam": 24,
            "total": 80,
        },
        "rollout": {
            "pass1": {"practice": 8, "exam": 8},
            "expansionFuture": {"practice": 48, "exam": 16},
        },
        "worksheet": {
            "total": 10,
            "practiceSelection": 5,
            "examSelection": 5,
            "withoutReplacement": True,
        },
    }


def parse_source(source: Path) -> tuple[list[dict[str, object]], dict[str, int]]:
    units: list[dict[str, object]] = []
    declared: dict[str, int] = {}
    subject: str | None = None
    level: str | None = None
    pending_code: str | None = None

    for line in source.read_text(encoding="utf-8").splitlines():
        match = SUBJECT_RE.match(line)
        if match:
            subject = match.group(1).title()
            continue

        match = LEVEL_RE.match(line)
        if match:
            level = match.group(1)
            if subject is None:
                raise ValueError(f"Level appears before subject: {line}")
            declared[f"{subject}|{level}"] = int(match.group(2))
            continue

        match = CODE_RE.match(line)
        if match:
            pending_code = match.group(1)
            continue

        match = DESCRIPTION_RE.match(line)
        if match and pending_code:
            if subject is None or level is None:
                raise ValueError(f"Code {pending_code} has no subject or level")
            units.append(
                unit_record(
                    pending_code,
                    subject,
                    level,
                    match.group(1).strip(),
                )
            )
            pending_code = None

    return units, declared


def add_missing_canonical_codes(
    units: list[dict[str, object]], canonical_path: Path
) -> tuple[list[dict[str, object]], list[str]]:
    canonical = json.loads(canonical_path.read_text(encoding="utf-8"))
    canonical_units = [
        unit
        for unit in canonical["units"]
        if unit.get("learningArea") in SUBJECT_ORDER
    ]
    existing = {str(unit["code"]) for unit in units}
    added: list[str] = []
    for unit in canonical_units:
        code = str(unit["code"])
        if code in existing:
            continue
        units.append(
            unit_record(
                code,
                str(unit["learningArea"]),
                str(unit["level"]),
                str(unit["description"]),
            )
        )
        existing.add(code)
        added.append(code)

    canonical_order = {
        str(unit["code"]): int(unit.get("sourceOrder", index))
        for index, unit in enumerate(canonical_units)
    }
    units.sort(
        key=lambda unit: (
            LEVEL_ORDER[str(unit["level"])],
            SUBJECT_ORDER[str(unit["subject"])],
            canonical_order.get(str(unit["code"]), 10**9),
            str(unit["code"]),
        )
    )
    return units, added


def validate_source(units: list[dict[str, object]], declared: dict[str, int]) -> None:
    codes = [str(unit["code"]) for unit in units]
    duplicates = [code for code, count in Counter(codes).items() if count > 1]
    if duplicates:
        raise ValueError(f"Duplicate curriculum codes: {', '.join(duplicates)}")

    actual: Counter[str] = Counter(
        f"{unit['subject']}|{unit['level']}" for unit in units
    )
    mismatches = {
        key: (declared_count, actual.get(key, 0))
        for key, declared_count in declared.items()
        if actual.get(key, 0) != declared_count
    }
    if mismatches:
        raise ValueError(f"Declared/parsed count mismatches: {mismatches}")


def build_summary(units: list[dict[str, object]]) -> str:
    grouped: dict[str, Counter[str]] = defaultdict(Counter)
    for unit in units:
        grouped[str(unit["level"])][str(unit["subject"])] += 1

    level_order = ["Foundation Year"] + [f"Year {year}" for year in range(1, 11)]
    total_codes = len(units)
    excluded_codes = sum(unit["scope"] != "generate" for unit in units)
    in_scope_codes = total_codes - excluded_codes
    subject_totals = Counter(str(unit["subject"]) for unit in units)
    lines = [
        "# Curriculum question-bank coverage",
        "",
        f"The audited source contains {total_codes} Australian Curriculum content codes. Foundation",
        f"Mathematics ({excluded_codes} codes) is already completed and excluded, leaving {in_scope_codes} codes",
        "for this staged question-bank build. Codes whose official descriptions include",
        "excluded cultural references remain in scope using their other assessable content.",
        "",
        "| Level | English | Mathematics | Science | In scope | Pass 1 questions | Full target questions |",
        "| --- | ---: | ---: | ---: | ---: | ---: | ---: |",
    ]
    in_scope_total = 0
    for level in level_order:
        english = grouped[level]["English"]
        mathematics = grouped[level]["Mathematics"]
        science = grouped[level]["Science"]
        excluded = mathematics if level == "Foundation Year" else 0
        in_scope = english + mathematics + science - excluded
        in_scope_total += in_scope
        lines.append(
            f"| {level} | {english} | {mathematics} | {science} | {in_scope} | "
            f"{in_scope * 16:,} | {in_scope * 80:,} |"
        )
    lines.extend(
        [
            f"| **Total** | **{subject_totals['English']}** | **{subject_totals['Mathematics']}** | **{subject_totals['Science']}** | **{in_scope_total}** | "
            f"**{in_scope_total * 16:,}** | **{in_scope_total * 80:,}** |",
            "",
            "## Pass completion rule",
            "",
            "- Pass 1 (current): 8 Practice + 8 separate Exam questions per code.",
            "- Each planned worksheet selects 5 Practice + 5 Exam questions.",
            "- Later expansion can reach 56 Practice + 24 Exam questions per code.",
            "",
            "No generated bank may use a Foundation Mathematics code or write into",
            "the live `quiz/` directory.",
            "",
        ]
    )
    return "\n".join(lines)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=Path)
    parser.add_argument("output_directory", type=Path)
    parser.add_argument(
        "--canonical-units",
        type=Path,
        default=Path("data/curriculum-units.json"),
        help="canonical site curriculum data used to audit omitted content codes",
    )
    args = parser.parse_args()

    units, declared = parse_source(args.source)
    validate_source(units, declared)
    units, added_codes = add_missing_canonical_codes(units, args.canonical_units)

    args.output_directory.mkdir(parents=True, exist_ok=True)
    manifest = {
        "title": "Australian Curriculum Question Bank Manifest",
        "source": args.source.name,
        "canonicalAuditSource": args.canonical_units.name,
        "codesRestoredByAudit": added_codes,
        "totalCodes": len(units),
        "excludedCodes": sum(unit["scope"] != "generate" for unit in units),
        "inScopeCodes": sum(unit["scope"] == "generate" for unit in units),
        "units": units,
    }
    (args.output_directory / "manifest.json").write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    (args.output_directory / "coverage-summary.md").write_text(
        build_summary(units), encoding="utf-8"
    )


if __name__ == "__main__":
    main()
