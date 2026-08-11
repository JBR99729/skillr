#!/usr/bin/env python3
"""Validate staged Markdown question banks without touching the live quiz tree."""

from __future__ import annotations

import argparse
import json
import re
import sys
from difflib import SequenceMatcher
from pathlib import Path


FRONT_MATTER_RE = re.compile(r"\A---\n(.*?)\n---\n", re.DOTALL)
QUESTION_RE = re.compile(r"^### ([PE])(\d{2})\b", re.MULTILINE)
BANNED_RE = re.compile(
    r"\b(?:First Nations|Aboriginal|Torres Strait Islander|badge|level up)\b",
    re.IGNORECASE,
)
ALLOWED_TYPES = {
    "Multiple choice",
    "Short response",
    "Extended response",
    "Matching",
    "Sequencing",
    "Oral response",
    "Demonstration",
    "Drawing response",
}


def parse_front_matter(text: str, path: Path) -> dict[str, str]:
    match = FRONT_MATTER_RE.search(text)
    if not match:
        raise ValueError(f"{path}: missing front matter")
    metadata: dict[str, str] = {}
    for line in match.group(1).splitlines():
        if ":" not in line:
            raise ValueError(f"{path}: invalid front-matter line: {line}")
        key, value = line.split(":", 1)
        metadata[key.strip()] = value.strip()
    return metadata


def normalise(value: str) -> str:
    value = re.sub(r"[^a-z0-9 ]+", " ", value.lower())
    return re.sub(r"\s+", " ", value).strip()


def question_blocks(text: str) -> list[tuple[str, str]]:
    matches = list(QUESTION_RE.finditer(text))
    blocks: list[tuple[str, str]] = []
    for index, match in enumerate(matches):
        end = matches[index + 1].start() if index + 1 < len(matches) else len(text)
        blocks.append((f"{match.group(1)}{match.group(2)}", text[match.start():end]))
    return blocks


def field(block: str, label: str) -> str:
    match = re.search(
        rf"^\*\*{re.escape(label)}:\*\*\s*(.+?)(?=\n\*\*[A-Z]|\n[A-D]\. |\n### |\Z)",
        block,
        re.MULTILINE | re.DOTALL,
    )
    return match.group(1).strip() if match else ""


def section_range(text: str, heading: str, next_heading: str | None) -> tuple[int, int] | None:
    start = text.find(heading)
    if start < 0:
        return None
    if next_heading is None:
        return start, len(text)
    end = text.find(next_heading, start + len(heading))
    if end < 0:
        return None
    return start, end


def identifier_positions(text: str) -> dict[str, int]:
    return {
        f"{match.group(1)}{match.group(2)}": match.start()
        for match in QUESTION_RE.finditer(text)
    }


def validate_file(path: Path, manifest_codes: set[str]) -> list[str]:
    errors: list[str] = []
    text = path.read_text(encoding="utf-8")
    try:
        metadata = parse_front_matter(text, path)
    except ValueError as exc:
        return [str(exc)]

    code = metadata.get("curriculum_code", "")
    if code not in manifest_codes:
        errors.append(f"{path}: curriculum code {code!r} is not in scope")
    if code.startswith("AC9MF"):
        errors.append(f"{path}: Foundation Mathematics must not be generated")
    if metadata.get("batch") != "1":
        errors.append(f"{path}: this validator currently expects pass/batch 1")
    if metadata.get("review_status") not in {"authored", "qa-passed"}:
        errors.append(f"{path}: missing or invalid review_status")

    banned = BANNED_RE.search(text)
    if banned:
        errors.append(f"{path}: banned phrase found: {banned.group(0)!r}")

    blocks = question_blocks(text)
    ids = [identifier for identifier, _ in blocks]
    try:
        practice_count = int(metadata.get("practice_questions", "0"))
        exam_count = int(metadata.get("exam_questions", "0"))
    except ValueError:
        errors.append(f"{path}: invalid practice_questions/exam_questions metadata")
        practice_count = exam_count = 0
    if practice_count < 8:
        errors.append(f"{path}: Pass 1 requires at least 8 Practice questions")
    if exam_count < 8:
        errors.append(f"{path}: Pass 1 requires at least 8 Exam questions")
    expected_ids = [f"P{i:02d}" for i in range(1, practice_count + 1)] + [
        f"E{i:02d}" for i in range(1, exam_count + 1)
    ]
    if ids != expected_ids:
        errors.append(f"{path}: IDs do not match declared question counts; found {ids}")

    positions = identifier_positions(text)
    launch_value = metadata.get("launch_practice_ids", "")
    launch_practice_ids = (
        [value.strip() for value in launch_value.split(",") if value.strip()]
        if launch_value
        else [f"P{i:02d}" for i in range(1, 9)]
    )
    if len(launch_practice_ids) != 8 or len(set(launch_practice_ids)) != 8:
        errors.append(f"{path}: launch_practice_ids must contain 8 unique IDs")
    missing_launch = [identifier for identifier in launch_practice_ids if identifier not in positions]
    if missing_launch:
        errors.append(f"{path}: launch Practice IDs not found: {missing_launch}")

    tier_headings = [
        "## Tier 1 — Knowledge and terms",
        "## Tier 2 — Core skill practice",
        "## Tier 3 — Guided application",
        "## Tier 4 — Problem solving and reasoning",
    ]
    tier_ranges: list[tuple[int, int] | None] = []
    for index, heading in enumerate(tier_headings):
        next_heading = (
            tier_headings[index + 1]
            if index + 1 < len(tier_headings)
            else "## Exam questions"
        )
        tier_ranges.append(section_range(text, heading, next_heading))
    if any(value is None for value in tier_ranges):
        errors.append(f"{path}: missing or out-of-order Practice tier headings")
    elif not missing_launch:
        tier_counts = [
            sum(start <= positions[identifier] < end for identifier in launch_practice_ids)
            for start, end in tier_ranges  # type: ignore[misc]
        ]
        if tier_counts != [2, 2, 2, 2]:
            errors.append(
                f"{path}: launch Practice distribution must be 2 per tier; found {tier_counts}"
            )

    section_headings = [
        "## Section A — Core knowledge",
        "## Section B — Application and problem solving",
        "## Section C — Extended response and analysis",
    ]
    section_ranges: list[tuple[int, int] | None] = []
    for index, heading in enumerate(section_headings):
        next_heading = section_headings[index + 1] if index + 1 < 3 else None
        section_ranges.append(section_range(text, heading, next_heading))
    if any(value is None for value in section_ranges):
        errors.append(f"{path}: missing or out-of-order Exam section headings")
    else:
        exam_ids = [f"E{i:02d}" for i in range(1, 9)]
        section_counts = [
            sum(start <= positions[identifier] < end for identifier in exam_ids)
            for start, end in section_ranges  # type: ignore[misc]
        ]
        if section_counts != [3, 3, 2]:
            errors.append(
                f"{path}: Exam distribution must be 3/3/2; found {section_counts}"
            )

    prompts: list[tuple[str, str]] = []
    mcq_answer_letters: list[str] = []
    for identifier, block in blocks:
        item_type = field(block, "Type")
        prompt = field(block, "Question")
        coverage = field(block, "Coverage")
        if not item_type:
            errors.append(f"{path} {identifier}: missing Type")
        elif item_type not in ALLOWED_TYPES:
            errors.append(f"{path} {identifier}: unsupported Type {item_type!r}")
        if not prompt:
            errors.append(f"{path} {identifier}: missing Question")
        else:
            prompts.append((identifier, normalise(prompt)))
        if not coverage:
            errors.append(f"{path} {identifier}: missing Coverage")

        if item_type == "Multiple choice":
            option_values: list[str] = []
            for option in "ABCD":
                option_match = re.search(rf"^{option}\. (.+)", block, re.MULTILINE)
                if not option_match:
                    errors.append(f"{path} {identifier}: missing option {option}")
                else:
                    option_values.append(
                        re.sub(r"\s+", " ", option_match.group(1)).strip()
                    )
            if len(option_values) == 4 and len(set(option_values)) != 4:
                errors.append(f"{path} {identifier}: duplicate option text")
            answer = field(block, "Correct answer")
            if not re.match(r"^[A-D]\b", answer):
                errors.append(f"{path} {identifier}: invalid Correct answer")
            else:
                mcq_answer_letters.append(answer[0])
        elif not (field(block, "Marking key") or field(block, "Correct answer")):
            errors.append(f"{path} {identifier}: missing Marking key/Correct answer")

    if len(mcq_answer_letters) >= 2:
        minimum_distinct = min(3, len(mcq_answer_letters))
        if len(set(mcq_answer_letters)) < minimum_distinct:
            errors.append(
                f"{path}: MCQ answer positions are too predictable: {mcq_answer_letters}"
            )
        most_common = max(mcq_answer_letters.count(letter) for letter in "ABCD")
        if most_common > (len(mcq_answer_letters) + 1) // 2:
            errors.append(
                f"{path}: one MCQ answer position is overused: {mcq_answer_letters}"
            )

    for index, (left_id, left_prompt) in enumerate(prompts):
        for right_id, right_prompt in prompts[index + 1 :]:
            if left_prompt == right_prompt:
                errors.append(f"{path}: exact duplicate prompts {left_id}/{right_id}")
            elif len(left_prompt) > 35 and len(right_prompt) > 35:
                similarity = SequenceMatcher(None, left_prompt, right_prompt).ratio()
                if similarity >= 0.88:
                    errors.append(
                        f"{path}: near-duplicate prompts {left_id}/{right_id} ({similarity:.2f})"
                    )
    return errors


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("root", type=Path)
    args = parser.parse_args()

    manifest_path = args.root / "manifest.json"
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    manifest_codes = {
        unit["code"] for unit in manifest["units"] if unit["scope"] == "generate"
    }
    bank_files = sorted((args.root / "banks").rglob("batch-1.md"))
    errors: list[str] = []
    seen_codes: dict[str, Path] = {}
    for path in bank_files:
        text = path.read_text(encoding="utf-8")
        try:
            code = parse_front_matter(text, path).get("curriculum_code", "")
        except ValueError:
            code = ""
        if code in seen_codes:
            errors.append(f"Duplicate bank for {code}: {seen_codes[code]} and {path}")
        elif code:
            seen_codes[code] = path
        errors.extend(validate_file(path, manifest_codes))

    if errors:
        print("\n".join(f"ERROR: {error}" for error in errors))
        return 1
    authored_questions = sum(
        len(question_blocks(path.read_text(encoding="utf-8"))) for path in bank_files
    )
    print(
        f"Validated {len(bank_files)} Pass 1 bank files "
        f"({len(bank_files) * 16} launch questions; {authored_questions} authored including reserve)."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
