#!/usr/bin/env python3
"""Build AC9M1N01 practice/test attempt, result, review and retake pages."""

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BASE = ROOT / "quiz/year-1/math/ac9m1n01"
SITE = "https://skillrhub.com"


def head(title, description, path):
    return f'''<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>{title}</title><meta name="description" content="{description}"><meta name="robots" content="index, follow"><link rel="canonical" href="{SITE}{path}"><link rel="stylesheet" href="/style.css"><link rel="stylesheet" href="/quiz/assets/style.css?v=111"></head>'''


def nav():
    return '''<nav class="quiz-breadcrumb" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="/year1/curriculum/maths/">Year 1 Maths</a></li><li><a href="/year1/maths/ac9m1n01-numbers-to-120/">AC9M1N01</a></li></ol></nav>'''


def attempt(mode):
    label = "Practice" if mode == "practice" else "Test"
    bank = "practice-questions.js" if mode == "practice" else "../practice/practice-questions.js"
    key = f"skillrAC9M1N01{label}Result"
    path = f"/quiz/year-1/math/ac9m1n01/{mode}/"
    config = f'''window.quizConfig={{storageKey:"AC9M1N01{label}Best",maxQuestions:8,shuffleQuestions:true,shuffleAnswers:true,questionCycle:true,preReadSeconds:60,requireStudentName:{str(mode == 'test').lower()},certificateOnPass:{str(mode == 'test').lower()},passingPercent:75,resultStorageKey:"{key}",resultUrl:"result/",reviewUrl:"../review/",retakeUrl:"../retake/"}};'''
    return f'''<!DOCTYPE html><html lang="en-AU">{head(f"AC9M1N01 Numbers to 120 {label}", f"Complete an 8-question Year 1 numbers to 120 {label.lower()} activity aligned to AC9M1N01.", path)}<body>{nav()}<main class="quiz-app" id="quizApp"><section class="screen start-screen is-active" id="startScreen"><div class="card start-card"><p class="eyebrow">AC9M1N01 • {label}</p><h1 id="quizTitle">Numbers to 120</h1><p class="intro-text">Read the short preparation notes, then complete 8 questions.</p><div class="quiz-summary"><div><span class="summary-number" id="questionCount">0</span><span class="summary-label">Questions</span></div><div><span class="summary-number">75%</span><span class="summary-label">Pass mark</span></div><div><span class="summary-number" id="bestScore">0</span><span class="summary-label">Best score</span></div></div><button class="button button-primary" id="startButton">Start {label.lower()}</button></div></section><section class="screen quiz-screen" id="quizScreen"><header class="quiz-header"><div><p id="progressText"></p><div class="progress-track"><div class="progress-bar" id="progressBar"></div></div></div><p>Score: <strong id="liveScore">0</strong></p></header><article class="card question-card"><p id="questionNumber"></p><h2 id="questionText"></h2><div id="answerList" class="answer-list"></div><div id="feedback" class="feedback" aria-live="polite"></div><div class="actions"><button class="button button-primary" id="submitButton" disabled>Check answer</button><button class="button button-primary is-hidden" id="nextButton">Next question</button></div></article></section><section class="screen result-screen" id="resultScreen"><div class="card"><h2 id="resultTitle">Opening result…</h2><span id="percentageScore"></span><span id="finalScore"></span><span id="finalTotal"></span><p id="resultMessage"></p><div class="result-actions"><button id="restartButton">Retake</button><button id="reviewButton">Review</button></div></div></section></main><script>{config}</script><script src="{('../practice/practice-questions.js' if mode == 'practice' else '../../practice/practice-questions.js')}"></script><script src="/quiz/assets/script.js?v=111"></script></body></html>'''


def result(mode):
    label = "Practice" if mode == "practice" else "Test"
    key = f"skillrAC9M1N01{label}Result"
    path = f"/quiz/year-1/math/ac9m1n01/{mode}/result/"
    return f'''<!DOCTYPE html><html lang="en-AU">{head(f"AC9M1N01 {label} Result", f"View the score from your AC9M1N01 numbers to 120 {label.lower()} attempt.", path)}<body data-result-key="{key}">{nav()}<main class="quiz-app"><section class="card result-card"><h1>{label} result</h1><div id="savedResult" class="is-hidden"><p id="studentResultName"></p><div class="result-circle"><span id="resultPercent"></span></div><p>You scored <strong id="resultScore"></strong>.</p><p id="resultStatus"></p><div class="result-actions"><a class="button button-secondary" id="resultReviewLink" href="../review/">Review answers</a><a class="button button-primary" id="resultRetakeLink" href="../retake/">Retake</a><button class="button button-secondary" id="certificateButton" onclick="window.print()">Print certificate</button></div></div><div id="emptyResult" class="is-hidden"><p>Complete the {label.lower()} first to see a result.</p><a class="button button-primary" href="../">Start {label.lower()}</a></div></section></main><script src="/quiz/assets/separate-result.js?v=1"></script></body></html>'''


def review(mode):
    label = "Practice" if mode == "practice" else "Test"
    key = f"skillrAC9M1N01{label}Result"
    path = f"/quiz/year-1/math/ac9m1n01/{mode}/review/"
    return f'''<!DOCTYPE html><html lang="en-AU">{head(f"Review AC9M1N01 {label} Answers", f"Review answers and explanations from the AC9M1N01 {label.lower()} activity.", path)}<body data-result-key="{key}">{nav()}<main class="quiz-app"><h1>Review {label.lower()} answers</h1><div id="answerReviewList"></div><section id="emptyReview" class="card is-hidden"><p>No completed attempt was found.</p><a class="button button-primary" href="../">Start {label.lower()}</a></section><a class="button button-primary" href="../retake/">Retake {label.lower()}</a></main><script src="/quiz/assets/separate-review.js?v=1"></script></body></html>'''


def retake(mode):
    label = "Practice" if mode == "practice" else "Test"
    path = f"/quiz/year-1/math/ac9m1n01/{mode}/retake/"
    return f'''<!DOCTYPE html><html lang="en-AU">{head(f"Retake AC9M1N01 {label}", f"Start a new non-repeating AC9M1N01 numbers to 120 {label.lower()} set.", path)}<body>{nav()}<main class="quiz-app"><section class="card start-card"><p class="eyebrow">Fresh question set</p><h1>Retake {label.lower()}</h1><p>Your next set draws from questions not yet used in the current cycle.</p><a class="button button-primary" href="../">Start a new {label.lower()} set</a><a class="button button-secondary" href="/year1/maths/ac9m1n01-numbers-to-120/">Topic guide</a></section></main></body></html>'''


for mode in ("practice", "test"):
    for relative, content in (("index.html", attempt(mode)), ("result/index.html", result(mode)), ("review/index.html", review(mode)), ("retake/index.html", retake(mode))):
        output = BASE / mode / relative
        output.parent.mkdir(parents=True, exist_ok=True)
        output.write_text(content, encoding="utf-8")
