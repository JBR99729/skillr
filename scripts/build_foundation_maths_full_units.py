#!/usr/bin/env python3
"""Build complete Foundation Maths teaching units without changing quiz pages."""

from __future__ import annotations

import argparse
import html
import json
import re
from collections import Counter, defaultdict
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


UNIT_GUIDANCE = {
    "AC9MFN01": {
        "title": "Numbers to 20",
        "vocabulary": ["zero", "number", "numeral", "quantity", "before", "after", "between", "more", "less", "first", "last"],
        "sequence": ["Match spoken number names, numerals and collections.", "Count forwards and backwards with objects and number tracks.", "Find one more, one less, before, after and between.", "Order numeral cards and use ordinal language.", "Read, write and label quantities with numerals.", "Apply the ideas in mixed practical and reasoning tasks."],
        "activities": ["Build numeral–quantity matching trays.", "Make a floor number track from 0 to 20.", "Hide one card and identify the missing number.", "Order classroom collections and explain the order."],
        "support": "Work within 0–5 or 0–10 first; use ten-frames, counters and a visible number track.",
        "extension": "Use teen numbers, backwards counting and more than one possible ordering clue.",
        "check": "Can the student name, represent, read, write and order numbers to at least 20 without relying on one fixed arrangement?",
    },
    "AC9MFN02": {
        "title": "Subitising to 5",
        "vocabulary": ["subitise", "dot pattern", "quantity", "same", "different", "more", "fewer", "part", "whole"],
        "sequence": ["Recognise one to three objects instantly.", "Recognise familiar dice and five-frame patterns.", "See the same quantity in different arrangements.", "Describe a quantity as smaller parts, such as 3 and 2.", "Compare two small collections without counting every object.", "Apply subitising in games and quick-image tasks."],
        "activities": ["Flash dot cards for two seconds.", "Match different dot patterns showing the same total.", "Build five in two different ways.", "Play a quick-look more-or-fewer sort."],
        "support": "Begin with structured patterns and allow a longer look before gradually shortening display time.",
        "extension": "Ask students to explain the parts they saw and create several patterns for the same total.",
        "check": "Can the student identify up to five without one-by-one counting and explain how the parts make the whole?",
    },
    "AC9MFN03": {
        "title": "Counting and comparing collections",
        "vocabulary": ["count", "collection", "one-to-one", "total", "more", "fewer", "same", "compare", "match"],
        "sequence": ["Touch or move each object once while counting.", "Use the final count to state how many.", "Rearrange a collection and confirm its quantity stays the same.", "Compare collections by counting.", "Compare collections by one-to-one matching.", "Explain which collection has more, fewer or the same."],
        "activities": ["Count-and-move classroom collections.", "Match two rows one to one.", "Spread and bunch equal collections.", "Collect enough materials for a group."],
        "support": "Use small, movable collections and counting mats that give each object one place.",
        "extension": "Use collections to 20 in irregular arrangements and ask for two comparison methods.",
        "check": "Can the student count each item once, state the total and justify a comparison?",
    },
    "AC9MFN04": {
        "title": "Part–part–whole to 10",
        "vocabulary": ["part", "whole", "partition", "combine", "split", "altogether", "number bond", "equal"],
        "sequence": ["Build a whole collection to 5.", "Split the whole into two visible parts.", "Recombine the parts and confirm the whole is unchanged.", "Record different partitions with pictures or numbers.", "Find a missing part when the whole is known.", "Generalise part–part–whole relationships to 10."],
        "activities": ["Shake-and-spill two-colour counters.", "Hide one part under a cup.", "Sort a collection into two hoops.", "Create every way to make a target number."],
        "support": "Use totals to 5 and keep both parts visible before introducing a hidden part.",
        "extension": "Find all partitions of a number and explain how to know none are missing.",
        "check": "Can the student partition and recombine a collection and identify either part or the whole?",
    },
    "AC9MFN05": {
        "title": "Addition and subtraction situations",
        "vocabulary": ["add", "subtract", "join", "separate", "altogether", "left", "more", "fewer", "model", "number story"],
        "sequence": ["Act out joining stories with objects.", "Act out separating stories with objects.", "Represent each story with a drawing.", "Connect the action to spoken mathematical language.", "Find the unknown result in practical situations.", "Explain why a model matches a story."],
        "activities": ["Tell and act out toy stories.", "Draw before-and-after pictures.", "Choose whether a story joins or separates.", "Create a story for a given model."],
        "support": "Keep quantities small and let the student physically perform every action.",
        "extension": "Put the unknown at the start or in the change and compare two solution strategies.",
        "check": "Can the student model a practical joining or separating situation and explain the result?",
    },
    "AC9MFN06": {
        "title": "Equal sharing and grouping",
        "vocabulary": ["share", "group", "equal", "same", "fair", "each", "left over", "collection"],
        "sequence": ["Decide what makes a share fair.", "Share objects one at a time between recipients.", "Check that every share is equal.", "Make equal-sized groups from a collection.", "Identify leftovers and explain what they mean.", "Compare sharing and grouping situations."],
        "activities": ["Share counters between toy animals.", "Pack objects into equal groups.", "Find and fix an unfair share.", "Draw the result of a practical grouping task."],
        "support": "Use two recipients and small even totals before introducing more groups or leftovers.",
        "extension": "Ask whether a total can be shared equally in several ways and justify each result.",
        "check": "Can the student make, check and explain equal shares and equal groups?",
    },
    "AC9MFA01": {
        "title": "Repeating patterns",
        "vocabulary": ["pattern", "repeat", "unit", "copy", "continue", "core", "same", "different", "missing"],
        "sequence": ["Notice repetition in movement and sound.", "Copy an AB pattern with objects.", "Identify the smallest repeating unit.", "Continue patterns represented in different ways.", "Find and repair a missing or incorrect element.", "Create and explain an original repeating pattern."],
        "activities": ["Copy clap-and-stamp patterns.", "Build bead or block patterns.", "Circle the repeating unit.", "Translate a colour pattern into movements."],
        "support": "Start with clear AB patterns and physically separate each repeat.",
        "extension": "Use ABC, AAB or ABB units and translate the same structure across materials.",
        "check": "Can the student identify the repeating unit, continue the pattern and justify what comes next?",
    },
    "AC9MFM01": {
        "title": "Comparing measurable attributes",
        "vocabulary": ["length", "mass", "capacity", "duration", "longer", "shorter", "heavier", "lighter", "holds more", "takes longer"],
        "sequence": ["Name the attribute being compared.", "Compare two objects directly for length.", "Compare mass by hefting or balance.", "Compare capacity by filling and pouring.", "Compare event duration using familiar routines.", "Explain why the comparison method is fair."],
        "activities": ["Line up objects at the same endpoint.", "Use a balance to compare classroom objects.", "Pour between containers to compare capacity.", "Order familiar events by duration."],
        "support": "Compare only two objects and focus on one attribute at a time.",
        "extension": "Order three or more items and identify misleading visual cues or unfair comparisons.",
        "check": "Can the student select the relevant attribute, compare directly and use accurate comparison language?",
    },
    "AC9MFM02": {
        "title": "Days, routines and time of day",
        "vocabulary": ["day", "week", "morning", "afternoon", "evening", "before", "after", "yesterday", "today", "tomorrow"],
        "sequence": ["Sequence familiar events within one day.", "Use morning, afternoon and evening accurately.", "Learn the repeating order of days of the week.", "Identify the day before and after a given day.", "Connect yesterday, today and tomorrow.", "Interpret and create a simple weekly routine."],
        "activities": ["Order daily routine cards.", "Build a class week strip.", "Move a today marker each morning.", "Plan a simple week of familiar events."],
        "support": "Use personal routine photos and keep a complete labelled week visible.",
        "extension": "Reason across the weekend and solve clues involving several before/after steps.",
        "check": "Can the student sequence daily events and use the days of the week cyclically?",
    },
    "AC9MFSP01": {
        "title": "Sorting, naming and creating shapes",
        "vocabulary": ["shape", "side", "corner", "curved", "straight", "circle", "triangle", "rectangle", "square", "sort"],
        "sequence": ["Notice shapes in familiar objects.", "Name common two-dimensional shapes.", "Describe shapes using observable features.", "Sort shapes and state the sorting rule.", "Recognise a shape after it is turned or resized.", "Create and combine shapes in pictures and models."],
        "activities": ["Run a classroom shape hunt.", "Sort a mixed shape collection.", "Make shapes with sticks or playdough.", "Create a picture from cut-out shapes."],
        "support": "Use clear examples and non-examples, then trace sides and corners physically.",
        "extension": "Use unfamiliar orientations and ask for more than one valid sorting rule.",
        "check": "Can the student name, describe, sort and create familiar shapes regardless of orientation?",
    },
    "AC9MFSP02": {
        "title": "Position, location and movement",
        "vocabulary": ["position", "location", "above", "below", "beside", "between", "inside", "outside", "near", "far", "move"],
        "sequence": ["Describe position relative to the student.", "Describe one object's position relative to another.", "Follow one-step positional instructions.", "Follow and give a short movement sequence.", "Use several spatial words to describe one scene.", "Check whether instructions lead to the intended location."],
        "activities": ["Place a toy from spoken instructions.", "Create a classroom obstacle route.", "Describe a hidden object's location.", "Draw a scene from positional clues."],
        "support": "Use one spatial word at a time with real objects and model the movement.",
        "extension": "Use multi-step routes, changing viewpoints and precise relational descriptions.",
        "check": "Can the student follow, give and explain position and movement instructions?",
    },
    "AC9MFST01": {
        "title": "Collecting, sorting and comparing data",
        "vocabulary": ["data", "question", "collect", "category", "sort", "display", "most", "least", "same", "compare"],
        "sequence": ["Ask a simple question with clear response categories.", "Collect one response or object from each participant.", "Sort the data consistently.", "Represent categories with objects or images.", "Compare categories using most, least and same.", "Answer the original question using the display."],
        "activities": ["Run a class preference survey.", "Sort found objects by an agreed feature.", "Build an object graph in rows.", "Ask and answer questions about a picture display."],
        "support": "Use two visually distinct categories and align objects one-to-one in rows.",
        "extension": "Let students choose categories, identify ambiguous data and pose new comparison questions.",
        "check": "Can the student collect, sort, represent and compare simple categorical data?",
    },
}


def esc(value: object) -> str:
    return html.escape(str(value), quote=True)


def question_type(question: dict) -> str:
    prompt = question["prompt"].lower()
    original = question["format"]
    if original == "MCQ":
        return "Multiple choice"
    if original == "Extended Response" or re.search(r"\b(explain|justify|how (?:do|did|would) you know|show your thinking|reason)\b", prompt):
        return "Reasoning and explanation"
    if "___" in prompt or re.search(r"\b(complete|missing|fill)\b", prompt):
        return "Fill in the blank"
    if re.search(r"\b(put .*order|order |arrange|sequence|sort)\b", prompt):
        return "Ordering and sorting"
    if re.search(r"\b(draw|make|build|create|show how|act out|use objects|describe a pattern)\b", prompt):
        return "Drawing and practical task"
    if re.search(r"\b(is .* correct|is .* fair|are .* equal|can each|does .* have|true or false|yes or no)\b", prompt):
        return "Yes or no"
    if re.search(r"\b(match|which .* belongs|which .* group|same number|same shape|category)\b", prompt):
        return "Matching and classifying"
    return "Short answer"


def split_questions(code_record: dict) -> tuple[list[dict], list[dict]]:
    questions = []
    for index, source in enumerate(code_record["questions"], 1):
        question = dict(source)
        question["number"] = index
        question["original_format"] = question["format"]
        question["question_type"] = question_type(question)
        question["bank"] = "practice" if index <= 56 else "test"
        questions.append(question)
    return questions[:56], questions[56:]


def grouped_counts(questions: list[dict]) -> dict[str, int]:
    order = ["Multiple choice", "Fill in the blank", "Yes or no", "Matching and classifying", "Ordering and sorting", "Drawing and practical task", "Short answer", "Reasoning and explanation"]
    counts = Counter(q["question_type"] for q in questions)
    return {name: counts[name] for name in order if counts[name]}


def render_question(question: dict, display_number: int) -> str:
    options = ""
    if question.get("options"):
        options = '<ol class="unit-question-options" type="A">' + "".join(f"<li>{esc(option)}</li>" for option in question["options"]) + "</ol>"
    return f'''<article class="unit-question-card">
  <p class="unit-question-meta">Question {display_number} <span>{esc(question['question_type'])}</span> <span>{question.get('marks', 1)} mark{'s' if question.get('marks', 1) != 1 else ''}</span></p>
  <h4>{esc(question['prompt'])}</h4>
  {options}
  <details class="unit-answer"><summary>Answer and marking guide</summary><p><strong>Answer:</strong> {esc(question.get('answer', 'Teacher assessed'))}</p><p><strong>Marking:</strong> {esc(question.get('marking', 'Check the student response against the learning intention.'))}</p></details>
</article>'''


def render_bank(label: str, questions: list[dict]) -> str:
    grouped: dict[str, list[dict]] = defaultdict(list)
    for question in questions:
        grouped[question["question_type"]].append(question)
    sections = []
    display_number = 0
    for category, count in grouped_counts(questions).items():
        cards = []
        for question in grouped[category]:
            display_number += 1
            cards.append(render_question(question, display_number))
        sections.append(f'''<details class="unit-question-group"><summary><strong>{esc(category)}</strong><span>{count} question{'s' if count != 1 else ''}</span></summary><div class="unit-question-list">{''.join(cards)}</div></details>''')
    return f'''<section class="unit-bank" id="{label.lower()}-question-bank">
  <div class="unit-bank-heading"><div><p class="curriculum-eyebrow">{len(questions)} questions</p><h3>{label} question bank</h3></div><p>Questions are grouped by response type. Open a group to view the questions, answers and marking guidance.</p></div>
  {''.join(sections)}
</section>'''


def render_full_unit(unit: dict, code_record: dict, practice: list[dict], test: list[dict]) -> str:
    guide = UNIT_GUIDANCE[unit["code"]]
    intentions = [unit["description"]] + [e["text"] for e in unit.get("elaborations", []) if e.get("questionEligible")][:3]
    return f'''<section class="curriculum-topic-section full-unit" id="full-unit">
  <p class="curriculum-eyebrow">Complete teaching unit</p>
  <h2>{esc(guide['title'])}: complete Foundation Maths unit</h2>
  <p>This unit combines explicit teaching, hands-on learning, differentiation and assessment for <strong>{esc(unit['code'])}</strong>. Keep the topic page focused on teaching; use the linked Practice, Test and Worksheet pages for student tasks.</p>
  <div class="unit-summary-grid"><div><strong>Guide</strong><span>Teaching sequence</span></div><div><strong>Print</strong><span>Worksheet page</span></div><div><strong>Assess</strong><span>Practice and test pages</span></div></div>

  <h3>Learning intentions</h3>
  <ul class="curriculum-check-list">{''.join(f'<li>{esc(item)}</li>' for item in intentions)}</ul>

  <h3>Success criteria</h3>
  <ul><li>I can show the skill using objects, pictures, actions or numbers.</li><li>I can use the key vocabulary accurately.</li><li>I can answer a new example without copying the previous one.</li><li>I can explain or demonstrate how I know.</li></ul>

  <h3>Key vocabulary</h3>
  <div class="unit-vocabulary">{''.join(f'<span>{esc(word)}</span>' for word in guide['vocabulary'])}</div>

  <h3>Recommended teaching sequence</h3>
  <ol class="unit-sequence">{''.join(f'<li><span>{index}</span><p>{esc(step)}</p></li>' for index, step in enumerate(guide['sequence'], 1))}</ol>

  <h3>Hands-on activities</h3>
  <div class="unit-activity-grid">{''.join(f'<article><h4>Activity {index}</h4><p>{esc(activity)}</p></article>' for index, activity in enumerate(guide['activities'], 1))}</div>

  <h3>Differentiation</h3>
  <div class="unit-differentiation"><article><h4>Support</h4><p>{esc(guide['support'])}</p></article><article><h4>Extension</h4><p>{esc(guide['extension'])}</p></article></div>

  <h3>Assessment plan</h3>
  <ol><li><strong>Before teaching:</strong> use a few practical prompts to check prior knowledge.</li><li><strong>During teaching:</strong> use the Practice page when students are ready for supported feedback.</li><li><strong>Readiness check:</strong> {esc(guide['check'])}</li><li><strong>After teaching:</strong> use the Test page for assessment.</li></ol>

  <div class="unit-bank-tabs" aria-label="Activity links"><a href="{esc(unit['worksheetUrl'])}">Worksheet</a><a href="{esc(unit['practiceUrl'])}">Practice</a><a href="{esc(unit['testUrl'])}">Test</a></div>
</section>'''


def update_page(path: Path, section: str, unit: dict, guide: dict) -> None:
    source = path.read_text(encoding="utf-8")
    source = re.sub(r'<section class="curriculum-topic-section full-unit" id="full-unit">.*?</section>\s*(?=<section class="curriculum-topic-section">\s*<h2>Curriculum coverage)', '', source, flags=re.S)
    marker = '      <section class="curriculum-topic-section">\n        <h2>Curriculum coverage and elaborations</h2>'
    if marker not in source:
        raise ValueError(f"Could not find curriculum marker in {path}")
    source = source.replace(marker, "      " + section.replace("\n", "\n      ") + "\n\n" + marker, 1)
    source = source.replace('<a class="primary" href="#topic-guide">Topic guide</a>', '<a class="primary" href="#full-unit">Full unit</a>')
    source = source.replace('These three activities use the same eight-question unit bank.', 'Use the linked Worksheet, Practice and Test pages when students are ready for tasks.')
    source = source.replace('"learningResourceType": "Topic guide"', '"learningResourceType": "Complete teaching unit"')
    source = source.replace(unit["title"], guide["title"])
    source = source.replace("Foundation Maths topic guide", "Foundation Maths complete unit")
    source = source.replace("Foundation Maths Topic Guide", "Foundation Maths Complete Unit")
    description = f"Complete {unit['code']} Foundation Maths teaching unit for {guide['title']}, with lesson sequence, differentiation and links to worksheet, practice and test pages."
    source = re.sub(r'<meta name="description" content="[^"]*">', f'<meta name="description" content="{esc(description)}">', source, count=1)
    source = re.sub(r'<meta property="og:description" content="[^"]*">', f'<meta property="og:description" content="{esc(description)}">', source, count=1)
    source = "\n".join(line.rstrip() for line in source.splitlines()) + "\n"
    path.write_text(source, encoding="utf-8")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("question_bank", type=Path)
    args = parser.parse_args()
    bank = json.loads(args.question_bank.read_text(encoding="utf-8"))
    manifest = json.loads((ROOT / "data" / "curriculum-units.json").read_text(encoding="utf-8"))
    units = {u["code"]: u for u in manifest["units"] if u["yearFolder"] == "foundation" and u["learningArea"] == "Mathematics"}
    output = {"year_level": "Foundation", "subject": "Mathematics", "practice_per_unit": 56, "test_per_unit": 24, "units": []}
    for code_record in bank["codes"]:
        code = code_record["code"]
        if code not in units:
            raise ValueError(f"No Foundation Maths manifest unit found for {code}")
        practice, test = split_questions(code_record)
        if len(practice) != 56 or len(test) != 24:
            raise ValueError(f"{code}: expected 56 Practice and 24 Test questions")
        output["units"].append({"code": code, "description": code_record["description"], "practice": practice, "test": test, "practice_type_counts": grouped_counts(practice), "test_type_counts": grouped_counts(test)})
        page = ROOT / units[code]["url"].strip("/") / "index.html"
        update_page(page, render_full_unit(units[code], code_record, practice, test), units[code], UNIT_GUIDANCE[code])
    (ROOT / "data" / "foundation-maths-full-units.json").write_text(json.dumps(output, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"units": len(output["units"]), "practice": sum(len(u["practice"]) for u in output["units"]), "test": sum(len(u["test"]) for u in output["units"])}, indent=2))


if __name__ == "__main__":
    main()
