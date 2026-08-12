#!/usr/bin/env python3
"""Build Foundation Science worksheet pages from authored topic-aligned worksheet data."""

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
QUIZ_ROOT = ROOT / "quiz" / "grade-k" / "science"

UNITS = {
    "AC9SFU01": ("Living Things and External Features", "ac9sfu01-observe-external-features-of-plants-and-animals-and-describe"),
    "AC9SFU02": ("How Objects Move", "ac9sfu02-how-objects-move-and-how-factors-including-their-size-shape"),
    "AC9SFU03": ("Materials and Their Properties", "ac9sfu03-that-objects-can-be-composed-of-different-materials-and-describe"),
    "AC9SFH01": ("Observing and Asking About Nature", "ac9sfh01-the-ways-people-make-and-use-observations-and-questions-to"),
    "AC9SFI01": ("Questions and Predictions", "ac9sfi01-questions-and-make-predictions-based-on-experiences"),
    "AC9SFI02": ("Safe Science Investigations", "ac9sfi02-engage-in-investigations-safely-and-make-observations-using"),
    "AC9SFI03": ("Recording Observations and Finding Patterns", "ac9sfi03-represent-observations-in-provided-templates-and-identify"),
    "AC9SFI04": ("Comparing Predictions and Observations", "ac9sfi04-observations-with-predictions-with-guidance"),
    "AC9SFI05": ("Sharing Science Ideas", "ac9sfi05-share-questions-predictions-observations-and-ideas-with-others"),
}

TEMPLATE = '''<!DOCTYPE html>
<html lang="en-AU">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="google-adsense-account" content="ca-pub-7734963540104771">
  <meta name="theme-color" content="#2457d6">
  <title>{code} {title} Worksheet | SkillrHub</title>
  <meta name="description" content="{code} Foundation Science worksheet with 8 core and 2 enrichment questions authored from the {title} topic lesson.">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://skillrhub.com/quiz/grade-k/science/{code_lower}/worksheet/">
  <link rel="manifest" href="/manifest.webmanifest">
  <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png">
  <link rel="stylesheet" href="/style.css">
  <link rel="stylesheet" href="/quiz/assets/foundation-authored-worksheet.css?v=2">
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-8P22BET45N"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){{dataLayer.push(arguments)}}gtag("js",new Date());gtag("config","G-8P22BET45N");</script>
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7734963540104771" crossorigin="anonymous"></script>
</head>
<body>
  <div class="worksheet-shell">
    <nav class="worksheet-nav" aria-label="Breadcrumb"><a href="/">Home</a><a href="/foundation/curriculum/science/">Foundation Science</a><a href="/foundation/science/{slug}/">{code} topic</a></nav>
    <header class="worksheet-hero">
      <div class="brandbar"><div class="brandmark">SkillrHub <span>F–10</span></div><small>Foundation Science • Student Worksheet</small></div>
      <p class="eyebrow">{code} • Foundation Science</p>
      <h1>{title} Worksheet</h1>
      <div class="worksheet-meta"><span>10 questions</span><span>8 core</span><span>2 enrichment</span><span>US Letter portrait • 1 page when possible</span></div>
      <div class="worksheet-actions"><button class="primary" id="previewPdfButton" type="button">Preview PDF worksheet</button><a href="/foundation/science/{slug}/">Back to topic</a><a href="/quiz/grade-k/science/{code_lower}/practice/">Open practice</a></div>
      <div class="worksheet-print-tip">Printing tip: if this worksheet uses 2 pages, choose double-sided (duplex) printing to use one sheet per student.</div>
    </header>
    <main id="worksheetRoot"></main>
  </div>
  <script src="/quiz/assets/foundation-science-worksheet-data.js?v=2"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
  <script src="/quiz/assets/foundation-maths-authored-worksheet.js?v=4"></script>
  <script src="/pwa-register.js"></script>
</body>
</html>
'''


def main() -> None:
    for code, (title, slug) in UNITS.items():
        path = QUIZ_ROOT / code.lower() / "worksheet" / "index.html"
        path.write_text(TEMPLATE.format(code=code, code_lower=code.lower(), title=title, slug=slug), encoding="utf-8")
    print(f"Updated {len(UNITS)} Foundation Science worksheet pages")


if __name__ == "__main__":
    main()
