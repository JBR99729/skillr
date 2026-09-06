"""Scoped Year 1 English topic-page and printable worksheet review for LY01-LY05."""
from pathlib import Path
from html import escape
from lxml import html
import json
import re

ROOT = Path(__file__).resolve().parents[1]
CODES = ["AC9E1LY01", "AC9E1LY02", "AC9E1LY03", "AC9E1LY04", "AC9E1LY05"]
ASSET_NAME = "year1-english-ly01-ly05-worksheet-review.js"

TOPIC_ACTIVITIES = {
    "AC9E1LY01": [
        ("Match feature to purpose", "A page has a title, numbered steps and a picture of ingredients. What is the text probably for?", "These features suggest an instruction text because the reader is being shown what to do in order."),
        ("Notice opinion clues", "Read: Our class should plant more trees because they give shade. What is the writer trying to do?", "The writer is trying to persuade. The word should and the reason because they give shade are useful clues."),
        ("Find information clues", "Read: Frogs lay eggs in water. Which feature shows this text is giving information?", "It gives a fact about frogs. Informative texts teach the reader about a topic."),
        ("Choose the best text", "Which text would help you make a paper hat: a story, a poster or steps with pictures?", "Steps with pictures are best because they show the order and actions needed to make something."),
    ],
    "AC9E1LY02": [
        ("Take a fair turn", "A partner is explaining an idea. What should you do before you add your idea?", "Look at the speaker, listen to the idea and wait for a suitable turn before speaking."),
        ("Build on an idea", "Sam says, I think the map is useful. Which reply builds on Sam's idea?", "A strong reply links to Sam's idea, such as I agree because it helps us find the library."),
        ("Ask a helpful question", "A speaker says, I chose this animal for my report. What question would help the discussion continue?", "A helpful question asks for more detail, such as Why did you choose that animal?"),
        ("Speak clearly", "What can you change if classmates cannot hear your answer?", "Use a clear voice, face the group and say the idea in a complete sentence."),
    ],
    "AC9E1LY03": [
        ("Real or imagined", "Read: A dragon carried a lunchbox to school. Could this happen in real life?", "No. Dragons and the event make it imaginative. This matches the IXL-style real-life check."),
        ("Information or persuasion", "Read: Bees make honey. Read: You should protect bees. How are the texts different?", "The first gives information. The second tries to persuade the reader to do something."),
        ("Same topic, different purpose", "Two texts are about dogs. One tells dog facts and one says dogs make the best pets. Which one gives an opinion?", "Dogs make the best pets is an opinion and has a persuasive purpose."),
        ("Compare features", "Name one feature of a story and one feature of an information text.", "A story often has characters and events. An information text often gives facts, labels or topic words."),
    ],
    "AC9E1LY04": [
        ("Blend and check meaning", "Read: The frog sat on a log. Which two words rhyme and how does the sentence help you read them?", "Frog and log rhyme. The sentence also makes sense, so the reader can monitor meaning."),
        ("Use phonics first", "You see the word shop. Which sounds help you read it?", "The digraph sh and the sounds /o/ and /p/ help the reader blend the word."),
        ("Read in phrases", "Where is a good pause: The little dog / ran home or The / little dog ran home?", "The little dog / ran home keeps words in meaningful phrases and supports fluency."),
        ("Self-correct", "You read The goat can fly, but the picture shows a bird. What should you do?", "Stop, reread and use the words, picture and meaning to check whether the reading makes sense."),
    ],
    "AC9E1LY05": [
        ("Predict from clues", "Read: Dark clouds filled the sky. Mia took an umbrella. What may happen next?", "It may rain. The dark clouds and umbrella are clues for the prediction."),
        ("Visualise a detail", "Read: The dog curled up on a soft mat. What can you picture?", "A suitable image includes the dog, its curled body and the soft mat."),
        ("Ask a useful question", "Read: Ava heard a bark at the gate. What question could help you understand more?", "A useful question asks about the text, such as Who is barking? or Why is it at the gate?"),
        ("Infer a feeling", "Read: Max smiled after opening the gift. How did Max probably feel?", "Max probably felt happy or pleased. The smile is the clue."),
    ],
}

WORKSHEET_EDITS = {
    "AC9E1LY01": {
        "ac9e1ly01-p-001": {
            "question": "Read: First we mixed the flour. Then we baked the cake. Which feature shows the text is a recount or sequence?",
            "explanation": "First and then show events in order, so the reader can follow what happened."
        },
        "ac9e1ly01-p-003": {
            "question": "Read: I think the farm is best because it is fun. What is the writer giving?",
            "explanation": "The writer gives an opinion and a reason, which helps show a persuasive purpose."
        },
        "ac9e1ly01-p-008": {
            "question": "Read: Please choose our new map. It is the best! What is the writer trying to do?",
            "explanation": "The writer is trying to persuade the reader to choose the map."
        },
    },
    "AC9E1LY02": {
        "ac9e1ly02-p-001": {
            "question": "Kim is speaking during a group task. What should Mia do before sharing her idea?",
            "explanation": "Mia should listen, wait for a turn and then respond clearly."
        },
        "ac9e1ly02-p-004": {
            "question": "Zoe says, I like the beach. Which reply connects to Zoe's contribution?",
            "explanation": "A connected reply stays on the beach idea or asks Zoe for more detail."
        },
        "ac9e1ly02-p-005": {
            "question": "Which question helps a discussion continue after someone shares an idea?",
            "explanation": "A helpful question asks for more information, a reason or an example."
        },
    },
    "AC9E1LY03": {
        "ac9e1ly03-p-004": {
            "question": "Read: The tiny fox flew to the moon. What kind of text is this most likely to be?",
            "explanation": "It is imaginative because the event is made up and could not happen in real life."
        },
        "ac9e1ly03-p-007": {
            "question": "Read: Rain falls from clouds. Is this fact or opinion?",
            "explanation": "It is a fact because it gives information that can be checked."
        },
        "ac9e1ly03-p-008": {
            "question": "Read: Please choose our new map. It is the best! What is the writer trying to do?",
            "explanation": "The writer is trying to persuade, using a request and an opinion."
        },
    },
    "AC9E1LY04": {
        "ac9e1ly04-p-001": {
            "question": "Blend the sounds /c/ /a/ /t/. Which word do they make?",
            "explanation": "Blending /c/ /a/ /t/ makes cat."
        },
        "ac9e1ly04-p-007": {
            "question": "Read aloud: Zoe sees a fish. Where should your voice pause?",
            "explanation": "A good reader pauses after the whole idea, not between every word."
        },
        "ac9e1ly04-p-008": {
            "question": "If The goat can fly does not make sense, what should you do?",
            "explanation": "Reread and check the sounds, words and meaning so you can self-correct."
        },
    },
    "AC9E1LY05": {
        "ac9e1ly05-p-001": {
            "question": "Read: Dark clouds filled the sky. Mia took an umbrella. What may happen next?",
            "explanation": "It may rain. The clouds and umbrella are clues for the prediction."
        },
        "ac9e1ly05-p-005": {
            "question": "Read: Ava heard a bark at the gate. What useful question could you ask?",
            "explanation": "A useful question asks about the text, such as who barked or why the sound came from the gate."
        },
        "ac9e1ly05-p-008": {
            "question": "Read: Max smiled after opening the gift. How did Max probably feel?",
            "explanation": "Max probably felt happy or pleased. The smile is the clue."
        },
    },
}


def normalise_text(value: str) -> str:
    return " ".join(value.split())


def add_topic_sections():
    for code, activities in TOPIC_ACTIVITIES.items():
        path = next((ROOT / "year1/english").glob(code.lower() + "*/index.html"))
        doc = html.fromstring(path.read_text())
        body = doc.xpath("//main/div[@id='topic-guide']")[0]
        for old in body.xpath('./details[@data-year1-topic-review="true"]'):
            body.remove(old)
        seen = set()
        for article in list(doc.xpath('//article[contains(@class,"curriculum-worked-example")]')):
            key = normalise_text(" ".join(article.itertext())).lower()
            if key in seen:
                article.getparent().remove(article)
            else:
                seen.add(key)
        articles = "".join(
            "<article><h3>" + escape(title) + "</h3><p>" + escape(prompt) + "</p>"
            + "<details><summary>Answer and teaching guidance</summary><p>" + escape(guidance) + "</p></details></article>"
            for title, prompt, guidance in activities
        )
        section = html.fragment_fromstring(
            '<details class="curriculum-topic-section" data-year1-topic-review="true">'
            '<summary><strong>Explain and apply</strong></summary>'
            '<div class="curriculum-detail-body">' + articles + "</div></details>"
        )
        body.insert(3, section)
        path.write_text("<!DOCTYPE html>\n" + html.tostring(doc, encoding="unicode", method="html") + "\n")


def write_worksheet_asset():
    asset = ROOT / "quiz/assets" / ASSET_NAME
    asset.write_text(
        "// Worksheet-only review for Year 1 English LY01-LY05. Practice and Test banks stay unchanged.\n"
        "(() => {\n"
        " const edits = " + json.dumps(WORKSHEET_EDITS, ensure_ascii=True) + ";\n"
        " const code = String(window.quizConfig?.skillCode || '').toUpperCase();\n"
        " const codeEdits = edits[code];\n"
        " if (!codeEdits || !Array.isArray(window.skillrPracticeQuestions)) return;\n"
        " const editedIds = Object.keys(codeEdits);\n"
        " const selectedIds = [...editedIds];\n"
        " for (const q of window.skillrPracticeQuestions) {\n"
        "  if (selectedIds.length >= 8) break;\n"
        "  if (!selectedIds.includes(q.id)) selectedIds.push(q.id);\n"
        " }\n"
        " const selected = new Set(selectedIds);\n"
        " window.skillrWorksheetQuestions = window.skillrPracticeQuestions.filter(q => selected.has(q.id)).sort((a, b) => selectedIds.indexOf(a.id) - selectedIds.indexOf(b.id)).map(q => {\n"
        "  const edit = codeEdits[q.id];\n"
        "  if (!edit) return q;\n"
        "  const next = {...q, ...edit};\n"
        "  if (edit.explanation) next.structuredExplanation = {...(q.structuredExplanation || {}), summary: edit.explanation};\n"
        "  return next;\n"
        " });\n"
        "})();\n"
    )


def wire_worksheet_pages():
    for code in CODES:
        lower = code.lower()
        path = ROOT / "quiz/year-1/english" / lower / "worksheet/index.html"
        source = path.read_text()
        marker = f"/quiz/assets/{ASSET_NAME}"
        if marker not in source:
            source = source.replace(
                f'<script src="/quiz/year-1/english/{lower}/practice/questions.js"></script>',
                f'<script src="/quiz/year-1/english/{lower}/practice/questions.js"></script><script src="{marker}?v=20260906"></script>',
            )
        source = source.replace(f"<title>{code} ", f"<title>{code} Reviewed ")
        source = re.sub(
            r'<meta name="description" content="Generate an 8-question worksheet for ' + code + r'\.">',
            f'<meta name="description" content="Reviewed 8-question printable worksheet for {code}, using Year 1 English prompts aligned to the topic guide and IXL-standard review.">',
            source,
        )
        path.write_text(source)


def write_report():
    report = ROOT / "docs/year1-english-ly01-ly05-topic-worksheet-review-2026-09-06.md"
    report.write_text(
        "# Year 1 English LY01-LY05 topic and worksheet review\n\n"
        "Text-only review of AC9E1LY01, AC9E1LY02, AC9E1LY03, AC9E1LY04 and AC9E1LY05. "
        "Practice and Test banks were not changed in this pass; printable worksheets now use a worksheet-only review layer.\n\n"
        "## What changed\n\n"
        "- Added 20 Explain and apply teaching activities across the five topic pages.\n"
        "- Added a worksheet-only review asset that curates each printable worksheet from the existing practice bank and sharpens selected prompts.\n"
        "- Updated the five worksheet pages with reviewed worksheet metadata and the review asset.\n\n"
        "## IXL benchmark notes\n\n"
        "The IXL Australia Year 1 English alignment maps AC9E1LY03 to distinguishing real-life/imaginative content, AC9E1LY04 to phonics, vowels, blends, digraphs, fluency and meaning checks, and AC9E1LY05 to picture meaning, feelings and prediction. "
        "AC9E1LY01 and AC9E1LY02 have no direct mapped IXL skill in the public alignment, so this pass applies the same standard through short evidence-based prompts, clear classroom response frames and original wording.\n"
    )


if __name__ == "__main__":
    add_topic_sections()
    write_worksheet_asset()
    wire_worksheet_pages()
    write_report()
