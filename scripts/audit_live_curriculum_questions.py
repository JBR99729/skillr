#!/usr/bin/env python3
"""Audit the authored curriculum question rollout before it is published."""

from __future__ import annotations

import argparse
import importlib.util
import json
import re
import subprocess
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
BUILDER_PATH = ROOT / "scripts" / "build_live_curriculum_questions.py"
EXPECTED_BANKS = 664
EXPECTED_QUESTIONS_PER_BANK = 8
OLD_PLACEHOLDER = "Which learning goal best matches this topic?"


def load_builder():
    spec = importlib.util.spec_from_file_location("curriculum_builder", BUILDER_PATH)
    if not spec or not spec.loader:
        raise RuntimeError(f"Cannot load {BUILDER_PATH}")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def read_question_file(path: Path) -> list[dict]:
    source = path.read_text(encoding="utf-8")
    match = re.search(
        r"window\.[A-Za-z0-9_]+\s*=\s*(\[.*\]);\s*"
        r"window\.quizQuestions\s*=",
        source,
        flags=re.DOTALL,
    )
    if not match:
        raise ValueError(f"{path}: generated question array not found")
    data = json.loads(match.group(1))
    if not isinstance(data, list):
        raise ValueError(f"{path}: question payload is not a list")
    return data


def validate_question_shape(question: dict, path: Path) -> None:
    question_type = question.get("type")
    if question_type not in {"single", "text", "self-check", "order"}:
        raise ValueError(f"{path}: unsupported generated type {question_type!r}")
    if not str(question.get("question", "")).strip():
        raise ValueError(f"{path}: empty question wording")
    if not str(question.get("explanation", "")).strip():
        raise ValueError(f"{path}: empty marking guidance")
    if "`" in question["question"] or "**" in question["question"]:
        raise ValueError(f"{path}: raw Markdown remains in question wording")

    if question_type == "single":
        answers = question.get("answers")
        correct = question.get("correct")
        if not isinstance(answers, list) or len(answers) < 2:
            raise ValueError(f"{path}: single-choice question has too few answers")
        if len(set(answers)) != len(answers):
            raise ValueError(f"{path}: single-choice question has duplicate answers")
        if not isinstance(correct, int) or not 0 <= correct < len(answers):
            raise ValueError(f"{path}: single-choice correct index is invalid")
    elif question_type == "text":
        accepted = question.get("acceptedAnswers")
        if not isinstance(accepted, list) or not all(
            isinstance(value, str) and value.strip() for value in accepted
        ):
            raise ValueError(f"{path}: text question has invalid accepted answers")
    elif question_type == "self-check":
        if not str(question.get("modelAnswer", "")).strip():
            raise ValueError(f"{path}: self-check question has no model answer")
    elif question_type == "order":
        items = question.get("items")
        correct = question.get("correct")
        if not isinstance(items, list) or not isinstance(correct, list):
            raise ValueError(f"{path}: order question is missing item arrays")
        if len(items) < 3 or len(items) != len(correct) or set(items) != set(correct):
            raise ValueError(f"{path}: order question arrays are incompatible")


def git_show(base_ref: str, path: Path) -> str:
    relative = path.relative_to(ROOT).as_posix()
    return subprocess.check_output(
        ["git", "show", f"{base_ref}:{relative}"],
        cwd=ROOT,
        text=True,
    )


def normalise_loader(source: str, builder) -> str:
    return builder.QUESTION_SCRIPT_RE.sub("<script data-question-loader></script>", source)


def changed_paths() -> list[tuple[str, str]]:
    raw = subprocess.check_output(
        ["git", "status", "--porcelain=v1", "-z", "--untracked-files=all"],
        cwd=ROOT,
    )
    records = []
    for item in raw.split(b"\0"):
        if not item:
            continue
        decoded = item.decode("utf-8")
        records.append((decoded[:2], decoded[3:]))
    return records


def allowed_changed_path(path: str) -> bool:
    if path in {
        "scripts/build_live_curriculum_questions.py",
        "scripts/audit_live_curriculum_questions.py",
    }:
        return True
    if path.startswith("curriculum-question-banks/"):
        return not path.startswith(
            "curriculum-question-banks/banks/foundation/mathematics/"
        )
    if path.startswith("quiz/grade-k/math/"):
        return bool(
            re.fullmatch(
                r"quiz/grade-k/math/ac9mf[^/]+/practice/result/index\.html",
                path,
            )
        )
    return bool(
        re.fullmatch(
            r"quiz/(?:grade-k|year-[1-9]|year-10)/(?:english|math|science)/"
            r"[^/]+/(?:practice|test)/(?:index\.html|questions\.js)",
            path,
        )
    )


def audit(base_ref: str) -> dict[str, int]:
    builder = load_builder()
    bank_files = sorted(builder.BANK_ROOT.rglob("batch-1.md"))
    live_bank_files = []
    for path in bank_files:
        metadata = builder.parse_front_matter(path.read_text(encoding="utf-8"), path)
        if metadata["curriculum_code"].upper().startswith("AC9MF"):
            continue
        live_bank_files.append(path)

    if len(live_bank_files) != EXPECTED_BANKS:
        raise ValueError(
            f"Expected {EXPECTED_BANKS} non-Foundation-Maths banks, "
            f"found {len(live_bank_files)}"
        )

    totals = {
        "banks": 0,
        "duplicate_practice_test_prompts": 0,
        "practice_questions": 0,
        "test_questions": 0,
        "loader_pages": 0,
    }

    for bank_path in live_bank_files:
        text = bank_path.read_text(encoding="utf-8")
        metadata = builder.parse_front_matter(text, bank_path)
        blocks = builder.question_blocks(text)
        code = metadata["curriculum_code"].upper()
        route, year_route, subject_route = builder.quiz_route(bank_path)
        route_url = f"/quiz/{year_route}/{subject_route}/{code.lower()}"

        bank_question_wording: set[str] = set()
        for mode, prefix, global_name in (
            ("practice", "P", "skillrPracticeQuestions"),
            ("test", "E", "skillrExamQuestions"),
        ):
            question_path = route / mode / "questions.js"
            questions = read_question_file(question_path)
            if len(questions) != EXPECTED_QUESTIONS_PER_BANK:
                raise ValueError(
                    f"{question_path}: expected {EXPECTED_QUESTIONS_PER_BANK} questions"
                )

            expected_ids = builder.selected_ids(metadata, prefix)
            for expected_id, question in zip(expected_ids, questions, strict=True):
                validate_question_shape(question, question_path)
                expected_prompt = builder.plain_text(
                    builder.field(blocks[expected_id], "Question")
                )
                expected_answer = builder.plain_text(
                    builder.field(blocks[expected_id], "Correct answer")
                    or builder.field(blocks[expected_id], "Marking key")
                )
                if question.get("id") != f"{code.lower()}-{expected_id.lower()}":
                    raise ValueError(f"{question_path}: wrong question id for {expected_id}")
                if question.get("curriculumCode") != code:
                    raise ValueError(f"{question_path}: wrong curriculum code")
                if question.get("bank") != mode:
                    raise ValueError(f"{question_path}: wrong bank label")
                if question.get("question") != expected_prompt:
                    raise ValueError(
                        f"{question_path}: authored wording changed for {expected_id}"
                    )
                if question.get("explanation") != expected_answer:
                    raise ValueError(
                        f"{question_path}: marking key changed for {expected_id}"
                    )
                if OLD_PLACEHOLDER.casefold() in expected_prompt.casefold():
                    raise ValueError(f"{question_path}: old placeholder prompt remains")
                wording_key = expected_prompt.casefold()
                if wording_key in bank_question_wording:
                    totals["duplicate_practice_test_prompts"] += 1
                bank_question_wording.add(wording_key)

            source = question_path.read_text(encoding="utf-8")
            if f"window.{global_name} =" not in source:
                raise ValueError(f"{question_path}: expected global is missing")

            page_path = route / mode / "index.html"
            page = page_path.read_text(encoding="utf-8")
            expected_loader = (
                f'<script src="{route_url}/{mode}/questions.js?'
                f'v={builder.LIVE_VERSION}"></script>'
            )
            if expected_loader not in page:
                raise ValueError(f"{page_path}: new question loader is missing")
            base_page = git_show(base_ref, page_path)
            if normalise_loader(page, builder) != normalise_loader(base_page, builder):
                raise ValueError(f"{page_path}: changed beyond its question loader")

            totals[f"{mode}_questions"] += len(questions)
            totals["loader_pages"] += 1

        totals["banks"] += 1

    changed = changed_paths()
    deleted = [path for status, path in changed if "D" in status]
    unexpected = [path for _, path in changed if not allowed_changed_path(path)]
    if deleted:
        raise ValueError(f"Unexpected deleted files: {deleted[:5]}")
    if unexpected:
        raise ValueError(f"Unexpected changed files: {unexpected[:5]}")

    subprocess.run(
        [
            "git",
            "diff",
            "--quiet",
            base_ref,
            "--",
            "curriculum-question-banks/banks/foundation/mathematics",
        ],
        cwd=ROOT,
        check=True,
    )

    foundation_question_paths = [
        path.relative_to(ROOT).as_posix()
        for mode in ("practice", "test")
        for name in ("index.html", "questions.js")
        for path in (ROOT / "quiz" / "grade-k" / "math").glob(f"*/{mode}/{name}")
    ]
    subprocess.run(
        ["git", "diff", "--quiet", base_ref, "--", *foundation_question_paths],
        cwd=ROOT,
        check=True,
    )

    certificate_pages = sorted(
        (ROOT / "quiz" / "grade-k" / "math").glob(
            "*/practice/result/index.html"
        )
    )
    if len(certificate_pages) != 12:
        raise ValueError(
            f"Expected 12 Foundation Maths Practice result pages, "
            f"found {len(certificate_pages)}"
        )
    for page in certificate_pages:
        source = page.read_text(encoding="utf-8")
        if source.count('id="certificateButton"') != 1:
            raise ValueError(f"{page}: certificate button is missing or duplicated")
        if "Print certificate" not in source:
            raise ValueError(f"{page}: certificate label is missing")
    result_script = (ROOT / "quiz" / "assets" / "separate-result.js").read_text(
        encoding="utf-8"
    )
    if 'if (!data.passed) document.getElementById("certificateButton")?.remove();' not in result_script:
        raise ValueError("Certificate button is not gated by the 75% pass result")
    subprocess.run(
        ["git", "diff", "--check", base_ref],
        cwd=ROOT,
        check=True,
    )

    totals["changed_files"] = len(changed)
    totals["foundation_maths_question_files_changed"] = 0
    totals["foundation_practice_certificate_pages"] = len(certificate_pages)
    totals["worksheet_changed_files"] = sum(
        1 for _, path in changed if "/worksheet/" in path
    )
    return totals


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--base-ref", default="github/main")
    args = parser.parse_args()
    print(json.dumps(audit(args.base_ref), indent=2, sort_keys=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
