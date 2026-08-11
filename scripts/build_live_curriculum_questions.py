#!/usr/bin/env python3
"""Publish authored curriculum banks to the live Practice and Test routes.

The Markdown banks remain the authoring source. This script converts the eight
launch Practice questions and eight Exam questions for each curriculum code
into the JavaScript format used by the existing browser quiz engine. It only
writes question data and updates the question-file loader URL; it does not
change quiz configuration, worksheets, styling, navigation or the quiz engine.
"""

from __future__ import annotations

import argparse
import json
import re
from collections import Counter
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
BANK_ROOT = ROOT / "curriculum-question-banks" / "banks"
LIVE_VERSION = "20260811-authored"

FRONT_MATTER_RE = re.compile(r"\A---\n(.*?)\n---\n", re.DOTALL)
QUESTION_RE = re.compile(r"^### ([PE])(\d{2})\b", re.MULTILINE)
QUESTION_SCRIPT_RE = re.compile(
    r'<script src="[^"]*(?:questions|practice-questions)\.js(?:\?v=[^"]*)?"></script>'
)

SUBJECT_ROUTES = {
    "english": "english",
    "mathematics": "math",
    "science": "science",
}


def parse_front_matter(text: str, path: Path) -> dict[str, str]:
    match = FRONT_MATTER_RE.search(text)
    if not match:
        raise ValueError(f"{path}: missing front matter")
    metadata: dict[str, str] = {}
    for line in match.group(1).splitlines():
        if ":" not in line:
            continue
        key, value = line.split(":", 1)
        metadata[key.strip()] = value.strip().strip('"')
    return metadata


def question_blocks(text: str) -> dict[str, str]:
    matches = list(QUESTION_RE.finditer(text))
    blocks: dict[str, str] = {}
    for index, match in enumerate(matches):
        end = matches[index + 1].start() if index + 1 < len(matches) else len(text)
        blocks[f"{match.group(1)}{match.group(2)}"] = text[match.start():end]
    return blocks


def field(block: str, label: str) -> str:
    match = re.search(
        rf"^\*\*{re.escape(label)}:\*\*\s*(.+?)(?=\n\*\*[A-Z]|\n[A-D]\. |\n### |\Z)",
        block,
        re.MULTILINE | re.DOTALL,
    )
    return re.sub(r"\s+", " ", match.group(1)).strip() if match else ""


def normalise(value: str) -> str:
    value = value.casefold().replace("&", "and")
    value = re.sub(r"[^a-z0-9]+", " ", value)
    return re.sub(r"\s+", " ", value).strip()


def clean_answer(value: str) -> str:
    return re.sub(r"\s+", " ", value).strip().rstrip()


def plain_text(value: str) -> str:
    """Remove authoring-only Markdown while preserving the authored wording."""
    value = re.sub(r"`([^`]*)`", r"\1", value)
    value = re.sub(r"\*\*([^*]+)\*\*", r"\1", value)
    value = re.sub(r"(?<!\*)\*([^*]+)\*(?!\*)", r"\1", value)
    value = re.sub(r"\[([^]]+)]\([^)]+\)", r"\1", value)
    return clean_answer(value)


def answer_core(answer: str) -> str:
    """Extract a markable answer without discarding the full marking guidance."""
    code = re.match(r"^\s*`([^`]+)`", answer)
    if code:
        return plain_text(code.group(1)).rstrip(".;")
    bold = re.match(r"^\s*\*\*([^*]+)\*\*", answer)
    if bold:
        return plain_text(bold.group(1)).rstrip(".;")

    value = plain_text(answer)
    value = re.split(
        r"\s+(?:Award|Accept|Allow|Give)\b|\.\s*\d+\s+marks?\b",
        value,
        maxsplit=1,
        flags=re.IGNORECASE,
    )[0]
    return value.strip().rstrip(".;")


def accepted_answers(answer: str) -> list[str]:
    answer = answer_core(answer)
    candidates = [answer, answer.rstrip(".")]
    number = re.fullmatch(r"-?[\d ]+(?:\.\d+)?", answer)
    if number:
        candidates.extend(
            [
                answer.replace(" ", ""),
                answer.replace(" ", ",", 1) if answer.count(" ") == 1 else answer,
            ]
        )
    yes_no = re.match(r"^(yes|no)\b", answer, flags=re.IGNORECASE)
    if yes_no:
        candidates.append(yes_no.group(1))
    return list(dict.fromkeys(item for item in candidates if item))


def explicit_mcq(block: str, answer: str) -> tuple[list[str], int] | None:
    options: list[str] = []
    for letter in "ABCD":
        match = re.search(rf"^{letter}\.\s+(.+)$", block, re.MULTILINE)
        if not match:
            break
        options.append(plain_text(match.group(1)))
    if len(options) < 2:
        return None

    letter_match = re.match(r"^([A-D])\b", answer)
    if letter_match:
        return options, ord(letter_match.group(1)) - ord("A")

    answer_key = normalise(answer)
    for index, option in enumerate(options):
        option_key = normalise(option)
        if answer_key == option_key or answer_key in option_key or option_key in answer_key:
            return options, index
    return None


def inline_mcq(prompt: str, answer: str) -> tuple[list[str], int] | None:
    if ":" not in prompt:
        return None
    tail = prompt.rsplit(":", 1)[1].strip().rstrip("?").rstrip(".")
    options = [
        plain_text(item)
        for item in re.split(r",\s*|\s+or\s+", tail, flags=re.IGNORECASE)
        if plain_text(item)
    ]
    if not 2 <= len(options) <= 5 or len(set(map(normalise, options))) != len(options):
        return None

    answer_key = normalise(answer)
    for index, option in enumerate(options):
        option_key = normalise(option)
        if answer_key == option_key or answer_key.startswith(option_key) or option_key.startswith(answer_key):
            return options, index
    return None


def ordered_question(prompt: str, answer: str) -> tuple[list[str], list[str]] | None:
    prompt_code = [plain_text(item).rstrip(".") for item in re.findall(r"`([^`]+)`", prompt)]
    answer_code = [plain_text(item).rstrip(".") for item in re.findall(r"`([^`]+)`", answer)]
    if len(prompt_code) >= 3 and len(prompt_code) == len(answer_code):
        prompt_items, answer_items = prompt_code, answer_code
    else:
        if ":" not in prompt or ";" not in answer:
            return None
        prompt_items = [
            plain_text(item).rstrip(".")
            for item in prompt.rsplit(":", 1)[1].rstrip("?.").split(",")
            if plain_text(item)
        ]
        answer_items = [
            plain_text(item).rstrip(".")
            for item in answer.split(";")
            if plain_text(item)
        ]
    if len(prompt_items) < 3 or len(prompt_items) != len(answer_items):
        return None

    by_key = {normalise(item): item for item in prompt_items}
    if set(by_key) != {normalise(item) for item in answer_items}:
        return None
    correct = [by_key[normalise(item)] for item in answer_items]
    return prompt_items, correct


def is_objective_short_answer(item_type: str, answer: str) -> bool:
    if item_type not in {"Short response", "Data display", "Visual selection"}:
        return False
    if re.match(r"^-?\d+(?:\.\d+)?\b", answer):
        return True
    if len(answer) > 70:
        return False
    broad = re.compile(
        r"\b(?:a valid|a logical|a relevant|a correct|responses? (?:may|will)|"
        r"answers? (?:may|will)|should|using evidence|from the visual|student)\b",
        re.IGNORECASE,
    )
    return not broad.search(answer)


def convert_question(code: str, bank_name: str, identifier: str, block: str) -> tuple[dict, str]:
    item_type = field(block, "Type") or "Short response"
    authored_prompt = field(block, "Question")
    authored_answer = field(block, "Correct answer") or field(block, "Marking key")
    authored_visual = field(block, "Visual")
    if not authored_prompt or not authored_answer:
        raise ValueError(f"{code} {identifier}: missing Question or Marking key")

    prompt = plain_text(authored_prompt)
    answer = plain_text(authored_answer)
    visual = plain_text(authored_visual)

    result: dict = {
        "id": f"{code.lower()}-{identifier.lower()}",
        "curriculumCode": code,
        "bank": bank_name,
        "sourceType": item_type,
        "question": prompt,
        "explanation": answer,
        "printable": True,
    }
    if visual:
        result["visual"] = visual
        result["instruction"] = f"Visual brief: {visual}"

    if item_type == "Multiple choice":
        choice = explicit_mcq(block, authored_answer) or inline_mcq(prompt, answer)
        if choice:
            options, correct = choice
            result.update(type="single", answers=options, correct=correct)
            return result, "single"

    if item_type == "Sequencing":
        ordered = ordered_question(authored_prompt, authored_answer)
        if ordered:
            items, correct = ordered
            result.update(type="order", items=items, correct=correct)
            return result, "order"

    if is_objective_short_answer(item_type, answer_core(authored_answer)):
        accepted = accepted_answers(authored_answer)
        result.update(type="text", acceptedAnswers=accepted, correct=accepted[0])
        return result, "text"

    result.update(type="self-check", modelAnswer=answer, correct=answer)
    return result, "self-check"


def quiz_route(bank_path: Path) -> tuple[Path, str, str]:
    relative = bank_path.relative_to(BANK_ROOT)
    year_source, subject_source, code_folder = relative.parts[:3]
    year_route = "grade-k" if year_source == "foundation" else year_source
    subject_route = SUBJECT_ROUTES[subject_source]
    return ROOT / "quiz" / year_route / subject_route / code_folder, year_route, subject_route


def write_question_file(path: Path, global_name: str, questions: list[dict]) -> None:
    payload = json.dumps(questions, ensure_ascii=False, indent=2)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(
        '"use strict";\n'
        f"window.{global_name} = {payload};\n"
        f"window.quizQuestions = window.{global_name};\n",
        encoding="utf-8",
    )


def replace_question_scripts(source: str, scripts: list[str], path: Path) -> str:
    matches = list(QUESTION_SCRIPT_RE.finditer(source))
    if not matches:
        raise ValueError(f"{path}: question script tag not found")
    first_start = matches[0].start()
    last_end = matches[-1].end()
    return source[:first_start] + "".join(scripts) + source[last_end:]


def update_quiz_page(path: Path, route_url: str, mode: str) -> None:
    source = path.read_text(encoding="utf-8")
    question_url = f"{route_url}/{mode}/questions.js?v={LIVE_VERSION}"
    source = replace_question_scripts(source, [f'<script src="{question_url}"></script>'], path)
    path.write_text(source, encoding="utf-8")


def selected_ids(metadata: dict[str, str], prefix: str) -> list[str]:
    if prefix == "P" and metadata.get("launch_practice_ids"):
        values = [item.strip() for item in metadata["launch_practice_ids"].split(",")]
        if len(values) == 8:
            return values
    return [f"{prefix}{index:02d}" for index in range(1, 9)]


def build(dry_run: bool = False) -> dict:
    stats: Counter[str] = Counter()
    bank_files = sorted(BANK_ROOT.rglob("batch-1.md"))
    if not bank_files:
        raise ValueError("No staged curriculum banks found")

    for bank_path in bank_files:
        text = bank_path.read_text(encoding="utf-8")
        metadata = parse_front_matter(text, bank_path)
        blocks = question_blocks(text)
        code = metadata["curriculum_code"].upper()
        if code.startswith("AC9MF"):
            # Foundation Mathematics already has 56 Practice and 24 Test
            # questions per code. Never replace those complete live banks with
            # the smaller pass-1 staging files.
            stats["skipped_complete_foundation_maths_banks"] += 1
            continue
        route, year_route, subject_route = quiz_route(bank_path)
        if not (route / "practice" / "index.html").exists():
            raise ValueError(f"{code}: live Practice route is missing: {route}")

        practice: list[dict] = []
        exam: list[dict] = []
        for bank_name, prefix, destination in (
            ("practice", "P", practice),
            ("test", "E", exam),
        ):
            for identifier in selected_ids(metadata, prefix):
                if identifier not in blocks:
                    raise ValueError(f"{code}: bank is missing {identifier}")
                question, rendered_type = convert_question(
                    code, bank_name, identifier, blocks[identifier]
                )
                destination.append(question)
                stats[f"type:{rendered_type}"] += 1

        if len(practice) != 8 or len(exam) != 8:
            raise ValueError(f"{code}: expected 8 Practice and 8 Test questions")

        route_url = f"/quiz/{year_route}/{subject_route}/{code.lower()}"
        if not dry_run:
            write_question_file(
                route / "practice" / "questions.js",
                "skillrPracticeQuestions",
                practice,
            )
            write_question_file(
                route / "test" / "questions.js",
                "skillrExamQuestions",
                exam,
            )
            update_quiz_page(route / "practice" / "index.html", route_url, "practice")
            update_quiz_page(route / "test" / "index.html", route_url, "test")

        stats["banks"] += 1
        stats["practice_questions"] += len(practice)
        stats["test_questions"] += len(exam)

    return dict(stats)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()
    print(json.dumps(build(dry_run=args.dry_run), indent=2, sort_keys=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
