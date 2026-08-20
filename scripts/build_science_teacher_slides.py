#!/usr/bin/env python3
"""Generate aligned F-10 Science teacher-slide HTML decks.

This builder keeps existing teacher-slide URLs stable and replaces thin one-image
wrappers with teachable classroom decks. It intentionally writes HTML slides only;
existing PNG/PDF assets are left untouched so rollback is simple.
"""

from __future__ import annotations

import argparse
import html
import json
import re
from pathlib import Path
from typing import Any

SITE_ORIGIN = "https://skillrhub.com"
SUPPORT_EMAIL = "skillrhublearning@gmail.com"


def clean(value: Any) -> str:
    text = html.unescape(str(value or ""))
    text = re.sub(r"<[^>]+>", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def esc(value: Any) -> str:
    return html.escape(clean(value), quote=True)


def short(value: str, words: int = 13) -> str:
    parts = clean(value).split()
    return " ".join(parts[:words]).rstrip(",;:")


def sentence(value: str) -> str:
    value = clean(value).rstrip(". ")
    return value[:1].upper() + value[1:] + "." if value else ""


def year_depth(year: int) -> dict[str, Any]:
    if year <= 2:
        return {"count": 4, "mode": "observe", "language": "simple observations, everyday examples and one clear practice thought"}
    if year <= 5:
        return {"count": 5, "mode": "explain", "language": "patterns, comparisons, evidence and one short explanation"}
    if year == 6:
        return {"count": 6, "mode": "reason", "language": "connected cause-effect reasoning and a model or evidence check"}
    if year <= 8:
        return {"count": 7, "mode": "transfer", "language": "models, mechanisms, evidence, misconception checking and unfamiliar transfer"}
    return {"count": 7, "mode": "evaluate", "language": "analysis, limitations, assumptions, evidence quality and multi-step transfer"}


def strand_kind(unit: dict[str, Any]) -> str:
    code = unit["code"]
    if "U" in code:
        return "Science understanding"
    if "H" in code:
        return "Science as a human endeavour"
    return "Science inquiry"


def visual_for(unit: dict[str, Any]) -> tuple[str, str, list[str]]:
    text = f"{unit.get('title','')} {unit.get('description','')}".lower()
    code = unit["code"]
    if any(w in text for w in ["classification", "organism", "species", "living", "plant", "animal", "cell", "body", "ecosystem"]):
        return "biology", "🌿", ["Observe features", "Group by evidence", "Explain the pattern"]
    if any(w in text for w in ["earth", "rock", "moon", "sun", "weather", "season", "plate", "carbon", "geological"]):
        return "earth", "🌏", ["Observe system", "Trace change", "Predict effect"]
    if any(w in text for w in ["force", "energy", "light", "sound", "electric", "motion", "heat", "wave"]):
        return "physical", "⚡", ["Define system", "Track cause", "Explain outcome"]
    if any(w in text for w in ["matter", "substance", "particle", "mixture", "chemical", "reaction", "element", "compound"]):
        return "chemical", "⚗️", ["Represent particles", "Compare substances", "Use evidence"]
    if "i" in code.lower():
        return "inquiry", "🔎", ["Ask", "Measure", "Explain with evidence"]
    return "science", "🔬", ["Observe", "Connect", "Explain"]


def bulletise(texts: list[str], limit: int = 4) -> str:
    return "".join(f"<li>{esc(t)}</li>" for t in texts[:limit] if clean(t))


def split_elaborations(unit: dict[str, Any]) -> list[str]:
    return [clean(e.get("text", "")) for e in unit.get("elaborations", []) if clean(e.get("text", ""))]


def misconception_lines(unit: dict[str, Any], year: int) -> list[str]:
    title = unit.get("title", "this idea")
    if year <= 2:
        return ["Looking is not the same as explaining.", "One example does not show every case."]
    if year <= 5:
        return ["A description needs evidence before it becomes an explanation.", "A pattern can have exceptions or limits."]
    if year <= 8:
        return ["A model is useful, but it is not a perfect copy of reality.", "The best answer connects observation, mechanism and evidence."]
    return ["A confident claim still needs evidence and limitations.", "Changing the system boundary can change the interpretation."]


def slide(title: str, body: str, visual: str = "", cls: str = "") -> str:
    return f"""<article class="science-slide {cls}" data-slide>
  <div class="science-slide__content">
    <h2>{esc(title)}</h2>
    {body}
  </div>
  {visual}
</article>"""


def visual_card(icon: str, labels: list[str]) -> str:
    items = "".join(f"<span>{esc(label)}</span>" for label in labels[:4])
    return f"""<aside class="science-visual" aria-hidden="true">
  <div class="science-visual__icon">{icon}</div>
  <div class="science-visual__flow">{items}</div>
</aside>"""


def build_deck(unit: dict[str, Any]) -> str:
    code = unit["code"]
    year = int(unit.get("yearNumber", 0))
    label = unit.get("levelLabel") or ("Foundation" if year == 0 else f"Year {year}")
    title = unit.get("title") or unit.get("description") or code
    description = clean(unit.get("description"))
    elaborations = split_elaborations(unit)
    depth = year_depth(year)
    _, icon, visual_labels = visual_for(unit)
    actions = [short(e, 12) for e in elaborations[:3]] or [short(description, 12)]
    must_teach = [description, *elaborations[:3]]
    misconception = misconception_lines(unit, year)

    slides = [
        slide(
            f"{code}: {title}",
            f"<p class='lead'>{esc(sentence(description))}</p><p class='mini'>Today students learn through {esc(depth['language'])}.</p>",
            visual_card(icon, visual_labels),
            "title-slide",
        ),
        slide(
            "Core idea in one minute",
            f"<ul>{bulletise([sentence(description), *[sentence(a) for a in actions[:2]]], 4)}</ul>",
            visual_card("💡", ["Main idea", "Evidence", "Explanation"]),
        ),
        slide(
            "Teach the important parts",
            f"<ul>{bulletise([short(item, 18) for item in must_teach], 4)}</ul>",
            visual_card(icon, visual_labels),
        ),
    ]

    if elaborations:
        slides.append(slide(
            "Curriculum elaboration check",
            f"<p>These are the curriculum examples this lesson should touch, without turning the slide deck into a textbook.</p><ul>{bulletise([short(e, 18) for e in elaborations], 5)}</ul>",
            visual_card("✅", ["Coverage", "Example", "Boundary"]),
        ))

    if year >= 6:
        slides.append(slide(
            "Model, evidence or mechanism",
            f"<p>Ask students to connect what they observe to why it happens.</p><div class='think-box'><strong>Prompt:</strong> What evidence supports the explanation, and what does the model leave out?</div>",
            visual_card("🧩", ["Observe", "Model", "Explain", "Limit"]),
        ))

    slides.extend([
        slide(
            "Common trap to avoid",
            f"<ul>{bulletise(misconception, 3)}</ul><div class='think-box'><strong>Teacher move:</strong> Ask for one reason, not just the correct word.</div>",
            visual_card("⚠️", ["Misconception", "Evidence", "Fix"]),
        ),
        slide(
            "Student practice thought",
            f"<p>Before Practice, students should answer this in one or two sentences.</p><div class='practice-question'>{esc(practice_prompt(unit, year))}</div><p class='mini'>Then open Practice or the worksheet for independent work.</p>",
            visual_card("✍️", ["Think", "Explain", "Practise"]),
            "practice-slide",
        ),
    ])

    total = len(slides)
    numbered = "".join(s.replace("<article", f"<article aria-label='Slide {i} of {total}'", 1) for i, s in enumerate(slides, 1))
    dots = "".join(f"<button type='button' data-slide-dot='{i-1}' aria-label='Go to slide {i}'>{i}</button>" for i in range(1, total + 1))
    return page_html(unit, numbered, dots, total)


def practice_prompt(unit: dict[str, Any], year: int) -> str:
    desc = clean(unit.get("description"))
    if year <= 2:
        return f"What can you notice, and what can you say about {short(desc, 8).lower()}?"
    if year <= 5:
        return f"Give one example and one piece of evidence for {short(desc, 10).lower()}."
    if year <= 8:
        return f"Use a model or example to explain {short(desc, 12).lower()} in an unfamiliar situation."
    return f"Make a claim about {short(desc, 12).lower()}, support it with evidence, and state one limitation."


def page_html(unit: dict[str, Any], slides: str, dots: str, total: int) -> str:
    code = unit["code"]
    label = unit.get("levelLabel", "Science")
    back = "../"
    return f"""<!doctype html>
<html lang="en-AU">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="robots" content="noindex,follow">
  <title>{esc(code)} Teacher Slides | SkillrHub</title>
  <link rel="stylesheet" href="/style.css">
  <style>
    :root{{--navy:#17324d;--teal:#0f766e;--sky:#e0f2fe;--mint:#f0fdfa;--amber:#f59e0b;--paper:#fff;--ink:#172033}}
    body{{margin:0;background:#eef6ff;color:var(--ink);font-family:Arial,Helvetica,sans-serif}}
    .main-nav{{padding:12px 20px;background:#fff;border-bottom:1px solid #dbe7f3}}
    .deck-shell{{max-width:1180px;margin:0 auto;padding:clamp(12px,3vw,30px)}}
    .deck-head{{display:flex;justify-content:space-between;gap:18px;align-items:flex-end;margin-bottom:16px}}
    .deck-head h1{{margin:.2rem 0;font-size:clamp(1.5rem,3vw,2.4rem);color:var(--navy)}}
    .deck-head p{{margin:0;color:#52616f}}
    .science-deck{{position:relative;background:#0f2544;border-radius:24px;padding:16px;box-shadow:0 18px 42px rgba(20,48,80,.18)}}
    .science-slide{{display:none;min-height:560px;background:linear-gradient(135deg,#ffffff 0%,#f8fdff 100%);border-radius:18px;padding:clamp(28px,5vw,58px);grid-template-columns:1.15fr .85fr;gap:34px;align-items:center}}
    .science-slide.is-active{{display:grid}}
    .science-slide h2{{font-size:clamp(2rem,4vw,3.7rem);line-height:1.02;color:var(--navy);margin:0 0 24px}}
    .science-slide .lead{{font-size:clamp(1.25rem,2vw,1.75rem);line-height:1.35}}
    .science-slide li{{font-size:clamp(1.1rem,1.8vw,1.55rem);line-height:1.35;margin:.55rem 0}}
    .mini{{font-size:1rem;color:#52616f}}
    .science-visual{{background:var(--mint);border:4px solid #b7ede2;border-radius:22px;min-height:320px;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:24px}}
    .science-visual__icon{{font-size:5rem;margin-bottom:22px}}
    .science-visual__flow{{display:flex;flex-direction:column;gap:12px;width:100%}}
    .science-visual__flow span{{background:#fff;border:2px solid #b7d9ee;border-radius:999px;padding:12px 16px;font-size:1.2rem;font-weight:700;color:var(--navy)}}
    .think-box,.practice-question{{background:#fff7ed;border-left:8px solid var(--amber);border-radius:14px;padding:18px 20px;font-size:clamp(1.15rem,2vw,1.55rem);line-height:1.35;margin-top:18px}}
    .practice-question{{background:#f0fdfa;border-left-color:var(--teal);font-weight:700}}
    .deck-controls{{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-top:14px;color:#fff}}
    .deck-controls button{{border:0;border-radius:999px;padding:10px 16px;font-weight:700;background:#fff;color:var(--navy);cursor:pointer}}
    .slide-dots{{display:flex;gap:6px;flex-wrap:wrap}}
    .slide-dots button{{padding:7px 10px;opacity:.72}}
    .slide-dots button.is-active{{background:var(--amber);opacity:1}}
    @media(max-width:820px){{.science-slide{{grid-template-columns:1fr;min-height:auto}}.science-visual{{min-height:220px}}}}
    @media print{{.main-nav,.deck-controls{{display:none!important}}.science-slide{{display:grid!important;page-break-after:always;box-shadow:none}}body{{background:#fff}}}}
  </style>
</head>
<body>
<nav class="main-nav"><a href="{back}">Topic Guide</a></nav>
<main class="deck-shell">
  <header class="deck-head">
    <div><p>{esc(label)} Science • SkillrHub</p><h1>{esc(code)} Teacher Slides</h1></div>
    <p>{total} classroom slides</p>
  </header>
  <section class="science-deck" data-science-deck>
    {slides}
    <div class="deck-controls">
      <button type="button" data-prev>Previous</button>
      <div class="slide-dots">{dots}</div>
      <button type="button" data-next>Next</button>
    </div>
  </section>
</main>
<script>
(() => {{
  const root = document.querySelector('[data-science-deck]');
  const slides = [...root.querySelectorAll('[data-slide]')];
  const dots = [...root.querySelectorAll('[data-slide-dot]')];
  let index = 0;
  function show(next) {{
    index = (next + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('is-active', i === index));
    dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
  }}
  root.querySelector('[data-prev]').addEventListener('click', () => show(index - 1));
  root.querySelector('[data-next]').addEventListener('click', () => show(index + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => show(i)));
  document.addEventListener('keydown', event => {{ if(event.key === 'ArrowRight') show(index + 1); if(event.key === 'ArrowLeft') show(index - 1); }});
  show(0);
}})();
</script>
</body>
</html>
"""


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--repo-root", type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument("--manifest", type=Path, default=None)
    parser.add_argument("--code", default=None, help="Generate one curriculum code only")
    args = parser.parse_args()
    root = args.repo_root.resolve()
    manifest = (args.manifest or root / "data" / "curriculum-units.json").resolve()
    payload = json.loads(manifest.read_text(encoding="utf-8"))
    units = payload.get("units", [])
    selected = [u for u in units if u.get("learningArea") == "Science"]
    if args.code:
        selected = [u for u in selected if u.get("code", "").lower() == args.code.lower()]
    count = 0
    for unit in selected:
        output = root / unit["yearFolder"] / unit["subjectSlug"] / unit["unitSlug"] / "teacher-slides" / "index.html"
        output.parent.mkdir(parents=True, exist_ok=True)
        output.write_text(build_deck(unit), encoding="utf-8")
        count += 1
    print(json.dumps({"generated": count, "subject": "Science", "code": args.code or "all"}, indent=2))


if __name__ == "__main__":
    main()
