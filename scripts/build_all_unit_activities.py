#!/usr/bin/env python3
"""Create an operational eight-question learning path for every curriculum unit."""

from __future__ import annotations

import html
import json
import re
import shutil
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
SITE = "https://skillrhub.com"
GA_ID = "G-8P22BET45N"
ADSENSE = "ca-pub-7734963540104771"
TITLE_OVERRIDES = {
    "AC9EFLY01": "Familiar Text Types and Their Purposes",
    "AC9M10ST02": "Continuous Distributions and Boxplots",
    "AC9S10H04": "How Society Shapes Research Priorities",
    "AC9S10I03": "Collect Precise, Replicable Data",
    "AC9S10I05": "Connect Evidence Across Data Sets",
    "AC9E6LY09": "Word Origins, Morphemes and Unfamiliar Words",
    "AC9M7N04": "Equivalent Rational Numbers and Number Lines",
    "AC9E8LY04": "Organising Ideas to Shape Meaning",
    "AC9M8N01": "Irrational Numbers in Context",
    "AC9S9H03": "Why Society Adopts Scientific Practices",
}
EXTRA_MARKERS = {
    "AC9EFLY01": ["stories, informative texts, everyday symbols"],
    "AC9M10ST02": ["centre, spread, shape and outliers"],
    "AC9S10H04": ["Funding and infrastructure"],
    "AC9S10I03": ["Calibration and instrument limits affect measurement quality."],
    "AC9S10I05": ["patterns, trends, relationships and anomalies"],
    "AC9M7N04": ["2/3 = 4/6 = 6/9", "fraction, decimal and percentage"],
    "AC9M8N01": ["non-terminating, non-repeating"],
    "AC9E8LY04": ["cause and effect"],
    "AC9S9H03": ["trust, access, cost, values and policy"],
}
GENERIC_PROMPTS = (
    "Which option best describes the skill being practised?",
    "Which task gives the best practice for this skill?",
    "Which example gives useful evidence of this learning?",
    "A student is ready to show this skill. Which task should they try?",
    "Which statement best summarises this topic?",
    "Which task would give useful extra practice?",
    "Which option stays focused on the curriculum goal?",
    "What should students be able to explain or demonstrate after this unit?",
)


def esc(value: str) -> str:
    return html.escape(str(value), quote=True)


def readable(value: str) -> str:
    value = str(value)
    value = re.sub(r"\\frac\{([^{}]+)\}\{([^{}]+)\}", r"\1/\2", value)
    value = re.sub(r"\\frac([0-9]+)([0-9]+)", r"\1/\2", value)
    value = value.replace("\\%", "%")
    return value


def trim(value: str, limit: int = 78) -> str:
    value = readable(value)
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
    return f'''<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">{adsense_meta}<meta name="theme-color" content="#2457d6"><title>{esc(title)}</title><meta name="description" content="{esc(description)}"><meta name="robots" content="{esc(robots)}"><link rel="canonical" href="{SITE}{esc(path)}"><link rel="manifest" href="/manifest.webmanifest"><link rel="apple-touch-icon" href="/icons/apple-touch-icon.png"><link rel="stylesheet" href="/style.css"><link rel="stylesheet" href="/quiz/assets/style.css?v=115"><script async src="https://www.googletagmanager.com/gtag/js?id={GA_ID}"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){{dataLayer.push(arguments)}}gtag("js",new Date());gtag("config","{GA_ID}");</script>{adsense_script}</head>'''


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


def is_generic_bank(bank_file: Path) -> bool:
    if not bank_file.exists():
        return False
    content = bank_file.read_text(encoding="utf-8")
    return all(json.dumps(prompt) in content for prompt in GENERIC_PROMPTS)


def quick_notes(unit: dict) -> str:
    eligible = [trim(e["text"], 150) for e in unit.get("elaborations", []) if e.get("questionEligible")]
    points = [trim(unit["description"], 150)] + eligible[:2]
    while len(points) < 3:
        points.append("Explain your choice and check that it matches the skill being practised")
    return "".join(f"<li>{esc(point)}</li>" for point in points[:3])


def topic_focus(unit: dict) -> list[str]:
    elaborations = [trim(e["text"], 180) for e in unit.get("elaborations", []) if e.get("questionEligible")]
    points = [trim(unit["description"], 180), *elaborations]
    if unit["learningArea"] == "Mathematics":
        points.append("Show the method, not only the final answer, so the reasoning can be checked.")
    elif unit["learningArea"] == "Science":
        points.append("Use observations, evidence and science vocabulary to justify the choice.")
    else:
        points.append("Use evidence from the text, language feature or communication purpose to justify the choice.")
    return points[:4]


def worked_examples(unit: dict) -> list[tuple[str, str]]:
    elaborations = [trim(e["text"], 180) for e in unit.get("elaborations", []) if e.get("questionEligible")]
    subject = unit["learningArea"]
    title = unit["title"].lower()
    if subject == "Mathematics":
        return [
            ("Model the idea", f"Start with the curriculum focus: {trim(unit['description'], 150)}."),
            ("Work a sample", f"Write the known values or representations for {title}, choose the operation or relationship, then check that the answer matches the question."),
            ("Explain the result", "State what the number, pattern, shape or data display shows in a complete sentence."),
        ]
    if subject == "Science":
        evidence = elaborations[0] if elaborations else trim(unit["description"], 150)
        return [
            ("Observe the system", f"Name the feature, change or relationship being investigated: {evidence}."),
            ("Use evidence", "Compare the evidence with each answer choice and reject choices that add unsupported claims."),
            ("Explain the science", f"Finish with the science idea from {unit['code']} using precise vocabulary."),
        ]
    return [
        ("Read for purpose", f"Identify what the text, language feature or communication choice is doing in {title}."),
        ("Use text evidence", "Match the answer to a word, phrase, image, structure or audience clue from the prompt."),
        ("Explain the choice", f"Connect the evidence back to {unit['code']} rather than relying on a vague personal preference."),
    ]


def common_mistakes(unit: dict) -> list[str]:
    subject = unit["learningArea"]
    mistakes = {
        "Mathematics": [
            "Choosing an answer that looks familiar before checking the exact operation, unit or representation.",
            "Skipping the reasonableness check, especially when a diagram, table, graph or estimate is involved.",
            "Giving a final answer without enough working to show the curriculum skill.",
        ],
        "Science": [
            "Picking the most dramatic answer instead of the one supported by the observation or data.",
            "Using everyday wording when the question needs a science term, pattern or cause-and-effect link.",
            "Confusing a prediction, observation, explanation and conclusion.",
        ],
        "English": [
            "Choosing a response that sounds fluent but is not supported by the text or context.",
            "Missing the audience, purpose or language feature being assessed.",
            "Explaining the whole text instead of the specific reading, writing or language choice in the question.",
        ],
    }
    return mistakes.get(subject, mistakes["English"])


def assessment_guidance(unit: dict, mode: str) -> list[str]:
    if mode == "test":
        return [
            "Answer independently first; use the review page only after submitting the test.",
            "A certificate requires at least 75%, so aim for both accuracy and clear reasoning.",
            "If an answer is wrong, record the missing concept and revisit the topic guide before retaking.",
        ]
    return [
        "Use Practice to learn from feedback; a wrong answer is a useful signal, not a final result.",
        "After each question, check whether the explanation names the same idea as the topic guide.",
        "Move to Test when you can explain why the correct option is better than the distractors.",
    ]


def learning_support(unit: dict, mode: str) -> str:
    markers = "".join(f"<p class=\"topic-marker\">{esc(item)}</p>" for item in EXTRA_MARKERS.get(unit["code"], []))
    return f'''<section class="learning-support" aria-label="{esc(unit['code'])} learning support"><h2>What this {mode} checks</h2><p>This page checks the specific {esc(unit['levelLabel'])} {esc(unit['learningArea'])} skill for <strong>{esc(unit['code'])}</strong>: {esc(trim(unit['description'], 220))}.</p>{markers}<div class="support-grid"><section><h3>Topic focus</h3><ul>{''.join(f"<li>{esc(item)}</li>" for item in topic_focus(unit))}</ul></section><section><h3>Worked example pathway</h3><ol>{''.join(f"<li><strong>{esc(title)}:</strong> {esc(body)}</li>" for title, body in worked_examples(unit))}</ol></section><section><h3>Common mistakes</h3><ul>{''.join(f"<li>{esc(item)}</li>" for item in common_mistakes(unit))}</ul></section><section><h3>Assessment guidance</h3><ul>{''.join(f"<li>{esc(item)}</li>" for item in assessment_guidance(unit, mode))}</ul></section></div></section>'''


def attempt(unit: dict, mode: str, bank_url: str) -> str:
    label = "Practice" if mode == "practice" else "Test"
    path = unit[f"{mode}Url"]
    title = TITLE_OVERRIDES.get(unit["code"], unit["title"])
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
    support = learning_support(unit, mode)
    return f'''<!DOCTYPE html><html lang="en-AU">{head(f"{unit['code']} {title} {label}", f"Complete an 8-question {unit['levelLabel']} {label.lower()} for {unit['code']}.", path)}<body>{breadcrumb(unit)}<main class="quiz-app" id="quizApp"><section class="screen start-screen is-active" id="startScreen"><div class="card start-card"><p class="eyebrow">{esc(unit['code'])} • {label}</p><h1 id="quizTitle">{esc(title)}</h1>{preparation}<div class="{summary_class}"><div><span class="summary-number" id="questionCount">8</span><span class="summary-label">Questions</span></div>{certificate_summary}<div><span class="summary-number" id="bestScore">0</span><span class="summary-label">Best score</span></div></div><button class="button button-primary" id="startButton">Start {label.lower()}</button></div>{support}</section><section class="screen quiz-screen" id="quizScreen"><header class="quiz-header"><div><p id="progressText"></p><div class="progress-track"><div class="progress-bar" id="progressBar"></div></div></div><p>Score: <strong id="liveScore">0</strong></p></header><article class="card question-card"><p id="questionNumber"></p><h2 id="questionText"></h2><div id="answerList" class="answer-list"></div><div id="feedback" class="feedback" aria-live="polite"></div><div class="actions"><button class="button button-primary" id="submitButton" disabled>Check answer</button><button class="button button-primary is-hidden" id="nextButton">Next question</button></div></article></section><section class="screen result-screen" id="resultScreen"><div class="card"><h2 id="resultTitle">Opening result…</h2><span id="percentageScore"></span><span id="finalScore"></span><span id="finalTotal"></span><p id="resultMessage"></p><div class="result-actions"><button id="restartButton">Retake</button><button id="reviewButton">Review</button></div></div></section></main><script>window.quizConfig={json.dumps(config, separators=(',', ':'))};</script><script src="{esc(bank_url)}"></script><script src="/quiz/assets/script.js?v=115"></script><script src="/pwa-register.js"></script></body></html>'''


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
    title = TITLE_OVERRIDES.get(unit["code"], unit["title"])
    marker = "".join(f"<p>{esc(item)}</p>" for item in EXTRA_MARKERS.get(unit["code"], []))
    # Legacy generated Homework currently reuses the Practice bank. Keep the route useful
    # but do not index or monetise it until independently authored Homework replaces it.
    return f'''<!DOCTYPE html><html lang="en-AU">{head(f"{unit['code']} {title} Homework", f"Printable homework companion for {unit['code']}.", path, robots="noindex, follow", ads=False)}<body>{breadcrumb(unit)}<main class="quiz-app"><section class="card start-card"><p class="eyebrow">{esc(unit['code'])} • Homework</p><h1 id="quizTitle">{esc(title)} Homework</h1><p>Use this printable homework companion for written working and revision alongside the topic guide.</p>{marker}<button class="button button-primary" id="downloadPdfButton" type="button">Download PDF homework</button><a class="button button-secondary" href="{esc(unit['practiceUrl'])}">Open practice</a></section></main><script>window.quizConfig={{skillCode:{json.dumps(unit['code'])},worksheetQuestionLimit:8}};</script><script src="{esc(bank_url)}"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script><script src="/quiz/assets/worksheet-pdf.js?v=17"></script><script src="/pwa-register.js"></script></body></html>'''


def activity_hub(unit: dict, path: str) -> str:
    subject = "Maths" if unit["learningArea"] == "Mathematics" else unit["learningArea"]
    return f'''<!DOCTYPE html><html lang="en-AU">{head(f"{unit['code']} {unit['title']} Activities", f"Open the topic guide and access the teacher slide, worksheet, Practice and Test for {unit['code']}.", path, robots="noindex, follow", ads=True)}<body>{breadcrumb(unit)}<main class="quiz-app"><section class="card start-card"><p class="eyebrow">{esc(unit['code'])} • {esc(unit['levelLabel'])} {esc(subject)}</p><h1>{esc(unit['title'])}</h1><p>{esc(unit['description'])}</p><p>Choose the resource that matches your next learning step: topic teaching, written Homework, guided Practice or an independent Test.</p><section class="pre-read-notes"><h2>Unit focus</h2><ul>{quick_notes(unit)}</ul></section><div class="result-actions"><a class="button button-primary" href="{esc(unit['url'])}">Topic guide</a><a class="button button-secondary" href="{esc(unit['url'])}#teacher-slide">Teacher slide</a><a class="button button-secondary" href="{esc(unit['worksheetUrl'])}">Homework</a><a class="button button-secondary" href="{esc(unit['practiceUrl'])}">Practice</a><a class="button button-secondary" href="{esc(unit['testUrl'])}">Test</a></div></section></main><script src="/pwa-register.js"></script></body></html>'''


def write_page(url: str, content: str) -> None:
    output = disk_path(url) / "index.html"
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(content, encoding="utf-8")


def main() -> None:
    manifest = json.loads((ROOT / "data/curriculum-units.json").read_text(encoding="utf-8"))
    units = manifest["units"]
    unavailable_paths = []
    published_units = 0
    for unit in units:
        bank_dir = disk_path(unit["practiceUrl"])
        reviewed_bank = bank_dir / "practice-questions.js"
        if reviewed_bank.exists():
            bank_file = reviewed_bank
        else:
            bank_file = bank_dir / "questions.js"
        if not bank_file.exists() or is_generic_bank(bank_file):
            activity_url = unit["practiceUrl"].removesuffix("practice/")
            activity_dir = disk_path(activity_url)
            if activity_dir.exists():
                shutil.rmtree(activity_dir)
            unavailable_paths.append(activity_url)
            continue
        published_units += 1
        practice_bank_url = "/" + bank_file.relative_to(ROOT).as_posix()
        test_dir = disk_path(unit["testUrl"])
        test_bank_file = test_dir / "questions.js"
        activity_url = unit["practiceUrl"].removesuffix("practice/")
        write_page(activity_url, activity_hub(unit, activity_url))
        write_page(unit["practiceUrl"], attempt(unit, "practice", practice_bank_url))
        # Preserve an existing authored Test unless a genuinely separate Test bank exists.
        if test_bank_file.exists() and test_bank_file.resolve() != bank_file.resolve():
            test_bank_url = "/" + test_bank_file.relative_to(ROOT).as_posix()
            write_page(unit["testUrl"], attempt(unit, "test", test_bank_url))
        write_page(unit["worksheetUrl"], worksheet(unit, practice_bank_url))
        for mode in ("practice", "test"):
            for kind in ("result", "review", "retake"):
                write_page(f"{unit[mode + 'Url']}{kind}/", secondary_page(unit, mode, kind))
    manifest = ROOT / "assets" / "unavailable-activity-paths.json"
    manifest.write_text(json.dumps({"paths": unavailable_paths}, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"units": len(units), "publishedUnits": published_units, "hiddenGenericUnits": len(unavailable_paths)}, indent=2))


if __name__ == "__main__":
    main()
