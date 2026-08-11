#!/usr/bin/env python3
"""Deterministically vary MCQ answer positions without changing option content."""

from __future__ import annotations

import argparse
import re
from pathlib import Path


FRONT_MATTER_RE = re.compile(r"\A---\n(.*?)\n---\n", re.DOTALL)
QUESTION_RE = re.compile(r"^### [PE]\d{2}\b", re.MULTILINE)
OPTION_RE = re.compile(r"^([A-D])\. (.+)$", re.MULTILINE)
ANSWER_RE = re.compile(r"^(\*\*Correct answer:\*\* )([A-D])(\b.*)$", re.MULTILINE)
TARGET_LETTERS = "ABCD"


def curriculum_code(text: str) -> str:
    front_matter = FRONT_MATTER_RE.search(text)
    if not front_matter:
        return ""
    match = re.search(r"^curriculum_code:\s*(\S+)$", front_matter.group(1), re.MULTILINE)
    return match.group(1) if match else ""


def rebalance_block(block: str, target: str) -> tuple[str, bool]:
    if "**Type:** Multiple choice" not in block:
        return block, False
    options = {match.group(1): match.group(2) for match in OPTION_RE.finditer(block)}
    answer_match = ANSWER_RE.search(block)
    if len(options) != 4 or not answer_match:
        return block, False
    current = answer_match.group(2)
    if current == target:
        return block, False

    swapped = dict(options)
    swapped[current], swapped[target] = options[target], options[current]
    block = OPTION_RE.sub(lambda match: f"{match.group(1)}. {swapped[match.group(1)]}", block)
    block = ANSWER_RE.sub(
        lambda match: f"{match.group(1)}{target}{match.group(3)}",
        block,
        count=1,
    )
    return block, True


def rebalance_file(path: Path, write: bool) -> int:
    text = path.read_text(encoding="utf-8")
    code = curriculum_code(text)
    matches = list(QUESTION_RE.finditer(text))
    if not matches:
        return 0

    output: list[str] = [text[: matches[0].start()]]
    changed = 0
    mcq_index = 0
    offset = sum(ord(character) for character in code) % len(TARGET_LETTERS)
    for index, match in enumerate(matches):
        end = matches[index + 1].start() if index + 1 < len(matches) else len(text)
        block = text[match.start() : end]
        if "**Type:** Multiple choice" in block:
            target = TARGET_LETTERS[(offset + mcq_index) % len(TARGET_LETTERS)]
            block, did_change = rebalance_block(block, target)
            changed += int(did_change)
            mcq_index += 1
        output.append(block)

    if changed and write:
        path.write_text("".join(output), encoding="utf-8")
    return changed


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("root", type=Path)
    parser.add_argument("--write", action="store_true")
    args = parser.parse_args()

    changed_files = 0
    changed_questions = 0
    for path in sorted((args.root / "banks").rglob("batch-1.md")):
        changed = rebalance_file(path, args.write)
        if changed:
            changed_files += 1
            changed_questions += changed
    action = "Rebalanced" if args.write else "Would rebalance"
    print(f"{action} {changed_questions} MCQs across {changed_files} bank files.")


if __name__ == "__main__":
    main()
