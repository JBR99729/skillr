#!/usr/bin/env python3
"""Make legacy Practice-backed Homework safe for search/AdSense and fix its generator.

Authored Homework pages are preserved. Only legacy worksheet/homework shells that load
Practice question JavaScript are de-indexed and stripped of AdSense until they are
replaced with independently authored Homework.
"""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
UNITS = json.loads((ROOT / "data/curriculum-units.json").read_text(encoding="utf-8"))["units"]


def subject_label(unit: dict) -> str:
    return "Maths" if unit.get("learningArea") == "Mathematics" else unit.get("learningArea", "")


def activity_root(unit: dict) -> str:
    return unit["practiceUrl"].removesuffix("practice/").strip("/") + "/"


ROOTS = sorted(((activity_root(unit), unit) for unit in UNITS), key=lambda item: len(item[0]), reverse=True)


def unit_for(rel: str) -> dict | None:
    for prefix, unit in ROOTS:
        if rel.startswith(prefix):
            return unit
    return None


def is_legacy_practice_backed_homework(text: str, rel: str) -> bool:
    if "/worksheet/" not in f"/{rel}":
        return False
    return bool(
        re.search(r'<script\s+src="[^"]*/practice/(?:practice-questions|questions)\.js[^"?]*[^\"]*"', text, re.I)
        or (
            ("worksheetQuestionLimit" in text or "homeworkQuestionLimit" in text)
            and re.search(r'<script\s+src="[^"]*/practice/[^"]+\.js', text, re.I)
        )
    )


def strip_ads_and_noindex(text: str) -> str:
    text = re.sub(
        r'<meta\s+name="google-adsense-account"\s+content="[^"]+"\s*/?>',
        "",
        text,
        flags=re.I,
    )
    text = re.sub(
        r'<script\s+async\s+src="https://pagead2\.googlesyndication\.com/pagead/js/adsbygoogle\.js\?client=[^"]+"\s+crossorigin="anonymous"></script>',
        "",
        text,
        flags=re.I,
    )
    if re.search(r'<meta\s+name="robots"\s+content="[^"]*"\s*/?>', text, re.I):
        text = re.sub(
            r'<meta\s+name="robots"\s+content="[^"]*"\s*/?>',
            '<meta name="robots" content="noindex, follow">',
            text,
            count=1,
            flags=re.I,
        )
    else:
        text = text.replace("</title>", '</title><meta name="robots" content="noindex, follow">', 1)
    return text


def fix_breadcrumb_subject(text: str, unit: dict) -> str:
    code = re.escape(unit["code"])
    expected = subject_label(unit)
    return re.sub(
        rf'(>{code}\s+)(?:Maths|Mathematics|Science|English)(</a>)',
        rf'\g<1>{expected}\2',
        text,
        count=1,
    )


def patch_generator() -> bool:
    path = ROOT / "scripts/build_all_unit_activities.py"
    text = path.read_text(encoding="utf-8")
    original = text

    old_worksheet = '''def worksheet(unit: dict, bank_url: str) -> str:\n    path = unit["worksheetUrl"]\n    title = TITLE_OVERRIDES.get(unit["code"], unit["title"])\n    marker = "".join(f"<p>{esc(item)}</p>" for item in EXTRA_MARKERS.get(unit["code"], []))\n    return f\'\'\'<!DOCTYPE html><html lang="en-AU">{head(f"{unit['code']} {title} Worksheet", f"Generate an 8-question worksheet for {unit['code']}.", path)}<body>{breadcrumb(unit)}<main class="quiz-app"><section class="card start-card"><p class="eyebrow">{esc(unit['code'])} • Worksheet</p><h1 id="quizTitle">{esc(title)} Worksheet</h1><p>Download a worksheet containing the same eight questions used in Practice and Test.</p>{marker}<button class="button button-primary" id="downloadPdfButton" type="button">Download PDF worksheet</button><a class="button button-secondary" href="{esc(unit['practiceUrl'])}">Open practice</a></section></main><script>window.quizConfig={{skillCode:{json.dumps(unit['code'])},worksheetQuestionLimit:8}};</script><script src="{esc(bank_url)}"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script><script src="/quiz/assets/worksheet-pdf.js?v=17"></script><script src="/pwa-register.js"></script></body></html>\'\'\'\n'''
    new_worksheet = '''def worksheet(unit: dict, bank_url: str) -> str:\n    path = unit["worksheetUrl"]\n    title = TITLE_OVERRIDES.get(unit["code"], unit["title"])\n    marker = "".join(f"<p>{esc(item)}</p>" for item in EXTRA_MARKERS.get(unit["code"], []))\n    # Legacy generated Homework currently reuses the Practice bank. Keep the route useful\n    # but do not index or monetise it until independently authored Homework replaces it.\n    return f\'\'\'<!DOCTYPE html><html lang="en-AU">{head(f"{unit['code']} {title} Homework", f"Printable homework companion for {unit['code']}.", path, robots="noindex, follow", ads=False)}<body>{breadcrumb(unit)}<main class="quiz-app"><section class="card start-card"><p class="eyebrow">{esc(unit['code'])} • Homework</p><h1 id="quizTitle">{esc(title)} Homework</h1><p>Use this printable homework companion for written working and revision alongside the topic guide.</p>{marker}<button class="button button-primary" id="downloadPdfButton" type="button">Download PDF homework</button><a class="button button-secondary" href="{esc(unit['practiceUrl'])}">Open practice</a></section></main><script>window.quizConfig={{skillCode:{json.dumps(unit['code'])},worksheetQuestionLimit:8}};</script><script src="{esc(bank_url)}"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script><script src="/quiz/assets/worksheet-pdf.js?v=17"></script><script src="/pwa-register.js"></script></body></html>\'\'\'\n'''
    if old_worksheet in text:
        text = text.replace(old_worksheet, new_worksheet)

    text = text.replace(
        "<p>Choose a learning activity. Worksheet, Practice and Test use the same eight-question unit bank.</p>",
        "<p>Choose the resource that matches your next learning step: topic teaching, written Homework, guided Practice or an independent Test.</p>",
    )
    text = text.replace(
        '<a class="button button-secondary" href="{esc(unit[\'worksheetUrl\'])}">Worksheet</a>',
        '<a class="button button-secondary" href="{esc(unit[\'worksheetUrl\'])}">Homework</a>',
    )

    # Use a distinct Test bank whenever one exists. Do not overwrite a Test with the\n    # Practice bank merely because an older unit has no separate Test bank yet.
    old_main = '''        bank_url = "/" + bank_file.relative_to(ROOT).as_posix()\n        activity_url = unit["practiceUrl"].removesuffix("practice/")\n        write_page(activity_url, activity_hub(unit, activity_url))\n        write_page(unit["practiceUrl"], attempt(unit, "practice", bank_url))\n        write_page(unit["testUrl"], attempt(unit, "test", bank_url))\n        write_page(unit["worksheetUrl"], worksheet(unit, bank_url))\n'''
    new_main = '''        practice_bank_url = "/" + bank_file.relative_to(ROOT).as_posix()\n        test_dir = disk_path(unit["testUrl"])\n        test_bank_file = test_dir / "questions.js"\n        activity_url = unit["practiceUrl"].removesuffix("practice/")\n        write_page(activity_url, activity_hub(unit, activity_url))\n        write_page(unit["practiceUrl"], attempt(unit, "practice", practice_bank_url))\n        # Preserve an existing authored Test unless a genuinely separate Test bank exists.\n        if test_bank_file.exists() and test_bank_file.resolve() != bank_file.resolve():\n            test_bank_url = "/" + test_bank_file.relative_to(ROOT).as_posix()\n            write_page(unit["testUrl"], attempt(unit, "test", test_bank_url))\n        write_page(unit["worksheetUrl"], worksheet(unit, practice_bank_url))\n'''
    if old_main in text:
        text = text.replace(old_main, new_main)

    if text != original:
        path.write_text(text, encoding="utf-8")
        return True
    return False


def main() -> None:
    stats = {"legacy_homework_protected": 0, "breadcrumbs_fixed": 0, "generator_patched": 0}
    html_files = [p for p in ROOT.rglob("*.html") if ".git" not in p.parts and "node_modules" not in p.parts]

    for path in html_files:
        rel = path.relative_to(ROOT).as_posix()
        text = path.read_text(encoding="utf-8")
        original = text
        unit = unit_for(rel)
        if unit:
            text = fix_breadcrumb_subject(text, unit)
        if text != original:
            stats["breadcrumbs_fixed"] += 1

        if is_legacy_practice_backed_homework(text, rel):
            protected = strip_ads_and_noindex(text)
            if protected != text:
                text = protected
                stats["legacy_homework_protected"] += 1

        if text != original:
            path.write_text(text, encoding="utf-8")

    stats["generator_patched"] = int(patch_generator())

    failures: list[str] = []
    for path in html_files:
        rel = path.relative_to(ROOT).as_posix()
        text = path.read_text(encoding="utf-8")
        unit = unit_for(rel)
        if unit:
            expected = subject_label(unit)
            wrong = {"Maths", "Science", "English"} - {expected}
            for label in wrong:
                if f'>{unit["code"]} {label}</a>' in text:
                    failures.append(f"wrong breadcrumb subject: {rel}")
                    break
        if is_legacy_practice_backed_homework(text, rel):
            if not re.search(r'<meta\s+name="robots"\s+content="noindex,\s*follow"', text, re.I):
                failures.append(f"legacy Practice-backed Homework is indexable: {rel}")
            if "pagead2.googlesyndication.com" in text or "google-adsense-account" in text:
                failures.append(f"legacy Practice-backed Homework is monetised: {rel}")

    generator = (ROOT / "scripts/build_all_unit_activities.py").read_text(encoding="utf-8")
    if "same eight questions used in Practice and Test" in generator:
        failures.append("generator still emits duplicate-bank Homework wording")
    if "Worksheet, Practice and Test use the same eight-question unit bank" in generator:
        failures.append("generator activity hub still advertises shared bank")
    if 'robots="noindex, follow", ads=False' not in generator:
        failures.append("generator does not protect legacy generated Homework")
    if 'test_bank_file = test_dir / "questions.js"' not in generator:
        failures.append("generator does not select a separate Test bank")

    print(json.dumps(stats, indent=2))
    if failures:
        print("Legacy Homework safety failures:")
        for failure in failures[:200]:
            print("-", failure)
        raise SystemExit(1)


if __name__ == "__main__":
    main()
