#!/usr/bin/env python3
"""Connect the authored Foundation Maths banks to the live quiz routes."""

from __future__ import annotations

import html
import json
import re
from pathlib import Path

from build_foundation_maths_full_units import UNIT_GUIDANCE


ROOT = Path(__file__).resolve().parents[1]
BANK_PATH = ROOT / "data" / "foundation-maths-full-units.json"
QUIZ_ROOT = ROOT / "quiz" / "grade-k" / "math"


def compact_json(value: object) -> str:
    return json.dumps(value, ensure_ascii=False, separators=(",", ":"))


def accepted_answers(answer: str) -> list[str]:
    answer = str(answer).strip()
    candidates = [answer, answer.rstrip(".")]
    first_sentence = re.split(r"(?<=[.!?])\s+", answer, maxsplit=1)[0].rstrip(".")
    candidates.append(first_sentence)
    first_clause = re.split(r"[;:]", answer, maxsplit=1)[0].strip().rstrip(".")
    candidates.append(first_clause)
    number = re.match(r"^\$?(-?\d+(?:\.\d+)?)", answer)
    if number:
        candidates.append(number.group(1))
        candidates.append(f"${number.group(1)}")
    yes_no = re.match(r"^(yes|no)\b", answer, flags=re.I)
    if yes_no:
        candidates.append(yes_no.group(1))
    return list(dict.fromkeys(item for item in candidates if item))


def needs_self_check(question: dict) -> bool:
    if question.get("format") == "Extended Response":
        return True
    prompt = question.get("prompt", "").lower()
    answer = str(question.get("answer", ""))
    return bool(
        len(answer) > 80
        or re.search(
            r"\b(explain|justify|draw|build|make|create|act out|show your|show how|describe how|"
            r"sort|order|arrange|record|demonstrate|use objects|use a drawing)\b",
            prompt,
        )
    )


def convert_question(code: str, bank_name: str, question: dict) -> dict:
    result = {
        "id": f"{code.lower()}-{bank_name[0]}-{question['number']:03d}",
        "curriculumCode": code,
        "bank": bank_name,
        "question": question["prompt"],
        "explanation": question.get("marking") or question.get("answer", ""),
        "printable": True,
    }
    if question.get("format") == "MCQ":
        result.update(
            type="single",
            answers=question["options"],
            correct=question["correct_index"],
        )
    elif needs_self_check(question):
        result.update(
            type="self-check",
            modelAnswer=f"{question.get('answer', '')} {question.get('marking', '')}".strip(),
            correct=question.get("answer", "Check with a teacher."),
        )
    else:
        result.update(
            type="text",
            acceptedAnswers=accepted_answers(question.get("answer", "")),
            correct=question.get("answer", ""),
        )
    return result


def write_question_file(path: Path, global_name: str, questions: list[dict]) -> None:
    payload = json.dumps(questions, ensure_ascii=False, indent=2)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(
        '"use strict";\n'
        f"window.{global_name} = {payload};\n"
        f"window.quizQuestions = window.{global_name};\n",
        encoding="utf-8",
    )


def quick_read(guide: dict, include_review: bool) -> str:
    items = [
        f"<li><strong>Method:</strong> {html.escape(guide['sequence'][0])}</li>",
        f"<li><strong>Worked example:</strong> {html.escape(guide['activities'][0])}</li>",
        f"<li><strong>Remember:</strong> {html.escape(guide['check'])}</li>",
        f"<li><strong>Common trap:</strong> {html.escape(guide['support'])}</li>",
    ]
    if include_review:
        items.append("<li>After the attempt, open <strong>Review answers</strong> to learn from every question.</li>")
    return '<section class="pre-read-notes"><h2>60-second Quick Read</h2><ul>' + "".join(items) + "</ul></section>"


def replace_quick_read(source: str, replacement: str) -> str:
    pattern = r'<section class="pre-read-notes">.*?</section>'
    if not re.search(pattern, source, flags=re.S):
        raise ValueError("Quick Read section not found")
    return re.sub(pattern, replacement, source, count=1, flags=re.S)


def update_quiz_page(path: Path, code: str, title: str, bank_name: str, guide: dict) -> None:
    source = path.read_text(encoding="utf-8")
    source = re.sub(r'<h1 id="quizTitle">.*?</h1>', f'<h1 id="quizTitle">{html.escape(title)}</h1>', source, count=1)
    source = replace_quick_read(source, quick_read(guide, bank_name == "practice"))
    is_practice = bank_name == "practice"
    config = {
        "storageKey": f"{code}{'Practice' if is_practice else 'Test'}Best",
        "skillCode": code,
        "maxQuestions": 8,
        "shuffleQuestions": True,
        "shuffleAnswers": True,
        "avoidSameCorrectPosition": True,
        "questionCycle": True,
        "questionCycleStorageKey": f"{code}:{bank_name}:unseen-cycle-v2",
        "preReadSeconds": 60 if is_practice else 0,
        "requireStudentName": not is_practice,
        "certificateOnPass": not is_practice,
        "passingPercent": 75,
        "resultStorageKey": f"skillr{code}{'Practice' if is_practice else 'Test'}Result",
        "resultUrl": "result/",
        "reviewUrl": "../review/",
        "retakeUrl": "../retake/",
    }
    source = re.sub(
        r"<script>window\.quizConfig=.*?</script>",
        f"<script>window.quizConfig={compact_json(config)};</script>",
        source,
        count=1,
        flags=re.S,
    )
    expected_question_script = f"/quiz/grade-k/math/{code.lower()}/{bank_name}/questions.js"
    source = re.sub(
        rf'<script src="/quiz/grade-k/math/{code.lower()}/(?:practice|test)/questions\.js"></script>',
        f'<script src="{expected_question_script}"></script>',
        source,
        count=1,
    )
    source = re.sub(r'/quiz/assets/script\.js\?v=\d+', '/quiz/assets/script.js?v=113', source)
    path.write_text(source, encoding="utf-8")


def update_worksheet(path: Path, code: str, title: str) -> None:
    source = path.read_text(encoding="utf-8")
    source = re.sub(r'<h1 id="quizTitle">.*?</h1>', f'<h1 id="quizTitle">{html.escape(title)} worksheet</h1>', source, count=1)
    source = re.sub(
        r"<p>Download a worksheet.*?</p>",
        "<p>Download 10 questions selected from the full banks: 8 Practice and 2 Test.</p>",
        source,
        count=1,
    )
    config = {
        "skillCode": code,
        "worksheetQuestionLimit": 10,
        "worksheetPracticeSelection": 8,
        "worksheetExamSelection": 2,
    }
    source = re.sub(
        r"<script>window\.quizConfig=.*?</script>",
        f"<script>window.quizConfig={compact_json(config)};</script>",
        source,
        count=1,
        flags=re.S,
    )
    practice_script = f'<script src="/quiz/grade-k/math/{code.lower()}/practice/questions.js"></script>'
    test_script = f'<script src="/quiz/grade-k/math/{code.lower()}/test/questions.js"></script>'
    if test_script not in source:
        source = source.replace(practice_script, practice_script + test_script, 1)
    source = re.sub(r'/quiz/assets/worksheet-pdf\.js\?v=\d+', '/quiz/assets/worksheet-pdf.js?v=18', source)
    path.write_text(source, encoding="utf-8")


def update_support_pages(unit_root: Path, old_title: str, title: str) -> None:
    for path in unit_root.glob("**/index.html"):
        if path.parent.name in {"practice", "test", "worksheet"}:
            continue
        source = path.read_text(encoding="utf-8")
        source = source.replace(old_title, title)
        source = source.replace("same eight curriculum questions", "a fresh set from the full curriculum bank")
        path.write_text(source, encoding="utf-8")


def main() -> None:
    bank = json.loads(BANK_PATH.read_text(encoding="utf-8"))
    manifest = json.loads((ROOT / "data" / "curriculum-units.json").read_text(encoding="utf-8"))
    units = {unit["code"]: unit for unit in manifest["units"] if unit.get("yearFolder") == "foundation" and unit.get("learningArea") == "Mathematics"}
    totals = {"practice": 0, "test": 0}

    for unit_bank in bank["units"]:
        code = unit_bank["code"]
        guide = UNIT_GUIDANCE[code]
        title = guide["title"]
        unit_root = QUIZ_ROOT / code.lower()
        practice = [convert_question(code, "practice", item) for item in unit_bank["practice"]]
        test = [convert_question(code, "test", item) for item in unit_bank["test"]]
        if len(practice) != 56 or len(test) != 24:
            raise ValueError(f"{code}: expected 56 Practice and 24 Test questions")

        write_question_file(unit_root / "practice" / "questions.js", "skillrPracticeQuestions", practice)
        write_question_file(unit_root / "test" / "questions.js", "skillrExamQuestions", test)
        update_quiz_page(unit_root / "practice" / "index.html", code, title, "practice", guide)
        update_quiz_page(unit_root / "test" / "index.html", code, title, "test", guide)
        update_worksheet(unit_root / "worksheet" / "index.html", code, title)
        update_support_pages(unit_root, units[code]["title"], title)
        totals["practice"] += len(practice)
        totals["test"] += len(test)

    print(json.dumps({"units": len(bank["units"]), **totals, "worksheet_split": "8+2"}, indent=2))


if __name__ == "__main__":
    main()
