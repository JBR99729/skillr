#!/usr/bin/env python3
"""Create an operational eight-question learning path for every curriculum unit."""

from __future__ import annotations

import html
import json
import re
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
SITE = "https://skillrhub.com"
GA_ID = "G-8P22BET45N"
ADSENSE = "ca-pub-7734963540104771"


def esc(value: str) -> str:
    return html.escape(str(value), quote=True)


def trim(value: str, limit: int = 78) -> str:
    value = re.sub(r"\s+", " ", value).strip().rstrip(".;")
    return value if len(value) <= limit else value[:limit].rsplit(" ", 1)[0] + "…"


def disk_path(url: str) -> Path:
    return ROOT / urlparse(url).path.strip("/")


def head(
    title: str,
    description: str,
    path: str,
    *,
    robots: str = "index, follow",
    ads: bool = True,
) -> str:
    adsense_meta = f'<meta name="google-adsense-account" content="{ADSENSE}">' if ads else ""
    adsense_script = (
        f'<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client={ADSENSE}" crossorigin="anonymous"></script>'
        if ads
        else ""
    )
    return f'''<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">{adsense_meta}<meta name="theme-color" content="#2457d6"><title>{esc(title)}</title><meta name="description" content="{esc(description)}"><meta name="robots" content="{esc(robots)}"><link rel="canonical" href="{SITE}{esc(path)}"><link rel="manifest" href="/manifest.webmanifest"><link rel="apple-touch-icon" href="/icons/apple-touch-icon.png"><link rel="stylesheet" href="/style.css"><link rel="stylesheet" href="/quiz/assets/style.css?v=112"><script async src="https://www.googletagmanager.com/gtag/js?id={GA_ID}"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){{dataLayer.push(arguments)}}gtag("js",new Date());gtag("config","{GA_ID}");</script>{adsense_script}</head>'''


def breadcrumb(unit: dict) -> str:
    label = unit["levelLabel"]
    subject = "Maths" if unit["learningArea"] == "Mathematics" else unit["learningArea"]
    return f'''<nav class="quiz-breadcrumb" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="/{esc(unit['yearFolder'])}/curriculum/">{esc(label)} curriculum</a></li><li><a href="{esc(unit['url'])}">{esc(unit['code'])} {esc(subject)}</a></li></ol></nav>'''


def choices(correct: str, distractors: list[str], correct_index: int) -> tuple[list[str], int]:
    correct = trim(correct)
    pool = []
    seen = {correct.casefold()}
    for distractor in distractors:
        candidate = trim(distractor)
        key = candidate.casefold()
        if not candidate or key in seen:
            continue
        seen.add(key)
        pool.append(candidate)
    fallbacks = (
        "Use an unrelated skill without checking the learning goal",
        "Repeat a task from a different curriculum topic",
        "Choose an activity that does not practise this skill",
    )
    for fallback in fallbacks:
        if len(pool) >= 3:
            break
        if fallback.casefold() not in seen:
            pool.append(fallback)
            seen.add(fallback.casefold())
    answers = pool[:3]
    answers.insert(correct_index % 4, correct)
    return answers, correct_index % 4


def make_questions(unit: dict, peer_units: list[dict]) -> list[dict]:
    code = unit["code"].lower()
    description = trim(unit["description"])
    eligible = [trim(e["text"]) for e in unit.get("elaborations", []) if e.get("questionEligible")]
    if not eligible:
        eligible = [description]
    peer_desc = [trim(p["description"]) for p in peer_units if p["code"] != unit["code"]]
    peer_elabs = [trim(e["text"]) for p in peer_units if p["code"] != unit["code"] for e in p.get("elaborations", []) if e.get("questionEligible")]
    distractors = peer_desc + peer_elabs
    prompts = [
        ("Which option best describes the skill being practised?", description),
        ("Which task gives the best practice for this skill?", eligible[0]),
        ("Which example gives useful evidence of this learning?", eligible[min(1, len(eligible)-1)]),
        ("A student is ready to show this skill. Which task should they try?", eligible[min(2, len(eligible)-1)]),
        ("Which statement best summarises this topic?", description),
        ("Which task would give useful extra practice?", eligible[min(3, len(eligible)-1)]),
        ("Which option stays focused on the curriculum goal?", eligible[min(4, len(eligible)-1)]),
        ("What should students be able to explain or demonstrate after this unit?", description),
    ]
    questions = []
    for index, (prompt, correct) in enumerate(prompts, 1):
        start = (index * 3) % max(1, len(distractors))
        rotated = distractors[start:] + distractors[:start]
        answers, correct_index = choices(correct, rotated, (index - 1) % 4)
        questions.append({
            "id": f"{code}-{index:02d}", "type": "single", "question": prompt,
            "answers": answers, "correct": correct_index,
            "explanation": f"This matches {unit['code']}: {description}."
        })
    return questions


def quick_notes(unit: dict) -> str:
    eligible = [trim(e["text"], 150) for e in unit.get("elaborations", []) if e.get("questionEligible")]
    points = [trim(unit["description"], 150)] + eligible[:2]
    while len(points) < 3:
        points.append("Explain your choice and check that it matches the skill being practised")
    return "".join(f"<li>{esc(point)}</li>" for point in points[:3])


def attempt(unit: dict, mode: str, bank_url: str) -> str:
    label = "Practice" if mode == "practice" else "Test"
    path = unit[f"{mode}Url"]
    key = f"skillr{unit['code']}{label}Result"
    config = {"storageKey": f"{unit['code']}{label}Best", "skillCode": unit["code"], "maxQuestions": 8, "shuffleQuestions": False, "shuffleAnswers": True, "questionCycle": False, "requireStudentName": mode == "test", "certificateOnPass": mode == "test", "passingPercent": 75, "resultStorageKey": key, "resultUrl": "result/", "reviewUrl": "../review/", "retakeUrl": "../retake/"}
    practice_summary = trim(unit["description"], 150)
    preparation = (
        f'<p class="intro-text">{esc(practice_summary)}</p>'
        if mode == "practice"
        else f'<p class="intro-text">Read the quick preparation notes, then start when you are ready.</p><section class="pre-read-notes"><h2>Quick preparation</h2><ul>{quick_notes(unit)}</ul></section>'
    )
    certificate_summary = (
        '<div><span class="summary-number">75%</span><span class="summary-label">For certificate</span></div>'
        if mode == "test"
        else ""
    )
    summary_class = "quiz-summary" if mode == "test" else "quiz-summary is-practice-summary"
    return f'''<!DOCTYPE html><html lang="en-AU">{head(f"{unit['code']} {unit['title']} {label}", f"Complete an 8-question {unit['levelLabel']} {label.lower()} for {unit['code']}.", path)}<body>{breadcrumb(unit)}<main class="quiz-app" id="quizApp"><section class="screen start-screen is-active" id="startScreen"><div class="card start-card"><p class="eyebrow">{esc(unit['code'])} • {label}</p><h1 id="quizTitle">{esc(unit['title'])}</h1>{preparation}<div class="{summary_class}"><div><span class="summary-number" id="questionCount">8</span><span class="summary-label">Questions</span></div>{certificate_summary}<div><span class="summary-number" id="bestScore">0</span><span class="summary-label">Best score</span></div></div><button class="button button-primary" id="startButton">Start {label.lower()}</button></div></section><section class="screen quiz-screen" id="quizScreen"><header class="quiz-header"><div><p id="progressText"></p><div class="progress-track"><div class="progress-bar" id="progressBar"></div></div></div><p>Score: <strong id="liveScore">0</strong></p></header><article class="card question-card"><p id="questionNumber"></p><h2 id="questionText"></h2><div id="answerList" class="answer-list"></div><div id="feedback" class="feedback" aria-live="polite"></div><div class="actions"><button class="button button-primary" id="submitButton" disabled>Check answer</button><button class="button button-primary is-hidden" id="nextButton">Next question</button></div></article></section><section class="screen result-screen" id="resultScreen"><div class="card"><h2 id="resultTitle">Opening result…</h2><span id="percentageScore"></span><span id="finalScore"></span><span id="finalTotal"></span><p id="resultMessage"></p><div class="result-actions"><button id="restartButton">Retake</button><button id="reviewButton">Review</button></div></div></section></main><script>window.quizConfig={json.dumps(config, separators=(',', ':'))};</script><script src="{esc(bank_url)}"></script><script src="/quiz/assets/script.js?v=113"></script><script src="/pwa-register.js"></script></body></html>'''


def secondary_page(unit: dict, mode: str, kind: str) -> str:
    label = "Practice" if mode == "practice" else "Test"
    base = unit[f"{mode}Url"]
    path = f"{base}{kind}/"
    key = f"skillr{unit['code']}{label}Result"
    if kind == "result":
        certificate = '<button class="button button-secondary" id="certificateButton" onclick="window.print()">Print certificate</button>' if mode == "test" else ""
        body = f'''<body data-result-key="{key}">{breadcrumb(unit)}<main class="quiz-app"><section class="card result-card"><p class="eyebrow">{esc(unit['code'])} • {label}</p><h1>{label} result</h1><p>Use the result to choose your next step: review each answer, revisit the unit focus or begin a fresh attempt.</p><section class="pre-read-notes"><h2>Unit focus</h2><ul>{quick_notes(unit)}</ul></section><div id="savedResult" class="is-hidden"><p id="studentResultName"></p><div class="result-circle"><span id="resultPercent"></span></div><p>You scored <strong id="resultScore"></strong>.</p><p id="resultStatus"></p><div class="result-actions"><a class="button button-secondary" id="resultReviewLink" href="../review/">Review answers</a><a class="button button-primary" id="resultRetakeLink" href="../retake/">Retake</a>{certificate}</div></div><div id="emptyResult" class="is-hidden"><p>Complete the {label.lower()} first to record a score and unlock the answer review.</p><a class="button button-primary" href="../">Start {label.lower()}</a></div></section></main><script src="/quiz/assets/separate-result.js?v=2"></script></body>'''
    elif kind == "review":
        body = f'''<body data-result-key="{key}">{breadcrumb(unit)}<main class="quiz-app"><p class="eyebrow">{esc(unit['code'])} • {label}</p><h1>Review {label.lower()} answers</h1><p>Compare each response with the correct answer and explanation, then revisit the topic guide or try the eight questions again.</p><section class="pre-read-notes"><h2>Unit focus</h2><ul>{quick_notes(unit)}</ul></section><div id="answerReviewList"></div><section id="emptyReview" class="card is-hidden"><p>No completed attempt was found. Complete the {label.lower()} to see every response, correct answer and explanation here.</p><a class="button button-primary" href="../">Start {label.lower()}</a></section><a class="button button-primary" href="../retake/">Retake {label.lower()}</a></main><script src="/quiz/assets/separate-review.js?v=2"></script></body>'''
    else:
        body = f'''<body>{breadcrumb(unit)}<main class="quiz-app"><section class="card start-card"><p class="eyebrow">Fresh attempt • {esc(unit['code'])}</p><h1>Retake {label.lower()}: {esc(unit['title'])}</h1><p>Try the same eight curriculum questions again in a newly shuffled answer order. Use the focus points below to prepare before you restart.</p><section class="pre-read-notes"><h2>Before you restart</h2><ul>{quick_notes(unit)}</ul></section><a class="button button-primary" href="../">Start fresh {label.lower()}</a><a class="button button-secondary" href="{esc(unit['url'])}">Topic guide</a></section></main></body>'''
    body = body.replace("</body>", '<script src="/pwa-register.js"></script></body>')
    return f'''<!DOCTYPE html><html lang="en-AU">{head(f"{unit['code']} {label} {kind.title()}", f"{kind.title()} the {unit['code']} {label.lower()} activity.", path, robots="noindex, follow", ads=True)}{body}</html>'''


def worksheet(unit: dict, bank_url: str) -> str:
    path = unit["worksheetUrl"]
    return f'''<!DOCTYPE html><html lang="en-AU">{head(f"{unit['code']} Printable Worksheet", f"Generate an 8-question worksheet for {unit['code']}.", path)}<body>{breadcrumb(unit)}<main class="quiz-app"><section class="card start-card"><p class="eyebrow">{esc(unit['code'])} • Worksheet</p><h1 id="quizTitle">{esc(unit['title'])} worksheet</h1><p>Download a worksheet containing the same eight questions used in Practice and Test.</p><button class="button button-primary" id="downloadPdfButton" type="button">Download PDF worksheet</button><a class="button button-secondary" href="{esc(unit['practiceUrl'])}">Open practice</a></section></main><script>window.quizConfig={{skillCode:{json.dumps(unit['code'])},worksheetQuestionLimit:8}};</script><script src="{esc(bank_url)}"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script><script src="/quiz/assets/worksheet-pdf.js?v=17"></script><script src="/pwa-register.js"></script></body></html>'''


def activity_hub(unit: dict, path: str) -> str:
    subject = "Maths" if unit["learningArea"] == "Mathematics" else unit["learningArea"]
    return f'''<!DOCTYPE html><html lang="en-AU">{head(f"{unit['code']} {unit['title']} Activities", f"Open the topic guide and access the teacher slide, worksheet, Practice and Test for {unit['code']}.", path, robots="noindex, follow", ads=True)}<body>{breadcrumb(unit)}<main class="quiz-app"><section class="card start-card"><p class="eyebrow">{esc(unit['code'])} • {esc(unit['levelLabel'])} {esc(subject)}</p><h1>{esc(unit['title'])}</h1><p>{esc(unit['description'])}</p><p>Choose a learning activity. Worksheet, Practice and Test use the same eight-question unit bank.</p><section class="pre-read-notes"><h2>Unit focus</h2><ul>{quick_notes(unit)}</ul></section><div class="result-actions"><a class="button button-primary" href="{esc(unit['url'])}">Topic guide</a><a class="button button-secondary" href="{esc(unit['url'])}#teacher-slide">Teacher slide</a><a class="button button-secondary" href="{esc(unit['worksheetUrl'])}">Worksheet</a><a class="button button-secondary" href="{esc(unit['practiceUrl'])}">Practice</a><a class="button button-secondary" href="{esc(unit['testUrl'])}">Test</a></div></section></main><script src="/pwa-register.js"></script></body></html>'''


def write_page(url: str, content: str) -> None:
    output = disk_path(url) / "index.html"
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(content, encoding="utf-8")


def main() -> None:
    manifest = json.loads((ROOT / "data/curriculum-units.json").read_text(encoding="utf-8"))
    units = manifest["units"]
    groups: dict[tuple[str, str], list[dict]] = {}
    for unit in units:
        groups.setdefault((unit["level"], unit["learningArea"]), []).append(unit)
    for unit in units:
        bank_dir = disk_path(unit["practiceUrl"])
        bank_dir.mkdir(parents=True, exist_ok=True)
        reviewed_bank = bank_dir / "practice-questions.js"
        if reviewed_bank.exists():
            bank_file = reviewed_bank
        else:
            bank_file = bank_dir / "questions.js"
            questions = make_questions(unit, groups[(unit["level"], unit["learningArea"])])
            bank_file.write_text('"use strict";\nwindow.quizQuestions = ' + json.dumps(questions, ensure_ascii=False, indent=2) + ';\n', encoding="utf-8")
        bank_url = "/" + bank_file.relative_to(ROOT).as_posix()
        activity_url = unit["practiceUrl"].removesuffix("practice/")
        write_page(activity_url, activity_hub(unit, activity_url))
        write_page(unit["practiceUrl"], attempt(unit, "practice", bank_url))
        write_page(unit["testUrl"], attempt(unit, "test", bank_url))
        write_page(unit["worksheetUrl"], worksheet(unit, bank_url))
        for mode in ("practice", "test"):
            for kind in ("result", "review", "retake"):
                write_page(f"{unit[mode + 'Url']}{kind}/", secondary_page(unit, mode, kind))
    print(json.dumps({"units": len(units), "questions": len(units) * 8, "pages": len(units) * 10}, indent=2))


if __name__ == "__main__":
    main()
