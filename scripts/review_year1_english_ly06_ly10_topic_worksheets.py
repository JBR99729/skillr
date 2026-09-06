"""Scoped Year 1 English topic-page and printable worksheet review for LY06-LY10."""
from pathlib import Path
from html import escape
from lxml import html
import json
import re

ROOT = Path(__file__).resolve().parents[1]
CODES = ["AC9E1LY06", "AC9E1LY07", "AC9E1LY08", "AC9E1LY09", "AC9E1LY10"]
ASSET_NAME = "year1-english-ly06-ly10-worksheet-review.js"

TOPIC_ACTIVITIES = {
    "AC9E1LY06": [
        ("Report, opinion or recount", "Read: I saw three ducks at the pond. Is this reporting, giving an opinion or recounting an event?", "It reports or recounts an observed event. Students should name the text job and use the sentence as evidence."),
        ("Edit sentence boundaries", "Fix: kim has a book", "The edited sentence is Kim has a book. It needs a capital letter for the name and a full stop at the end."),
        ("Stay on topic", "Topic: My kite. Which sentence belongs: My kite has a red tail or I like soup?", "My kite has a red tail stays on the topic. The other sentence changes to a new topic."),
        ("Reread to improve", "Write one sentence about a pet. Reread it and check capital letter, full stop and sense.", "A useful edit checks whether the sentence is complete, readable and linked to the purpose."),
    ],
    "AC9E1LY07": [
        ("Open the talk", "Choose an opening for a short talk about bees.", "A strong opening names the topic, such as Today I will talk about bees."),
        ("Middle facts", "Add two learnt facts in the middle of a talk about ducks.", "The middle should give topic-specific facts, not an unrelated story."),
        ("Finish clearly", "Which ending suits a talk: Thank you for listening or And then?", "Thank you for listening gives a clear concluding statement."),
        ("Voice and gesture", "What should a speaker do so the audience can hear and follow?", "Face the audience, speak clearly, use helpful gestures and keep a steady pace."),
    ],
    "AC9E1LY08": [
        ("Match upper and lower case", "Which letters match: B and b, B and d, or B and p?", "B and b match because they are the upper-case and lower-case forms of the same letter."),
        ("Capital for names", "Edit the name ava.", "The correct form is Ava because a name begins with a capital letter."),
        ("Readable unjoined letters", "Write the word sun using separate lower-case letters.", "Letters should be unjoined, correctly shaped and easy to recognise."),
        ("Check letter direction", "Which letters are easy to reverse: b and d, m and n, or c and o?", "b and d are often confused, so students should check the stick and circle direction."),
    ],
    "AC9E1LY09": [
        ("Segment a digraph word", "Say ship. Which sounds do you hear?", "The sounds are /sh/ /i/ /p/. The two letters sh represent one sound."),
        ("Segment a blend word", "Say frog. Which separate sounds do you hear?", "The sounds are /f/ /r/ /o/ /g/. The blend has two consonant sounds."),
        ("Final cluster check", "Say nest. What sounds come at the end?", "The final sounds are /s/ and /t/. Students should hear both sounds in the final cluster."),
        ("Tap the sounds", "Tap once for each sound in clap.", "Clap has four sounds: /c/ /l/ /a/ /p/. This matches IXL-style sound segmentation."),
    ],
    "AC9E1LY10": [
        ("Substitute first sound", "Change cat by replacing /c/ with /h/.", "The new word is hat. Only the first sound changes."),
        ("Substitute middle sound", "Change sit by replacing /i/ with /a/.", "The new word is sat. The middle vowel sound changes."),
        ("Substitute final sound", "Change cup by replacing /p/ with /t/.", "The new word is cut. The final sound changes."),
        ("Explain the change", "What changed from fish to dish?", "The first sound changed from /f/ to /d/. The rest of the word stayed the same."),
    ],
}

WORKSHEET_EDITS = {
    "AC9E1LY06": {
        "ac9e1ly06-p-001": {
            "question": "Which sentence clearly reports a fact about a cat?",
            "explanation": "A cat needs food is a fact sentence. It tells information rather than a personal opinion."
        },
        "ac9e1ly06-p-004": {
            "question": "Read and edit: kim has a book",
            "explanation": "Kim has a book. is correct because the name starts with a capital letter and the sentence ends with a full stop."
        },
        "ac9e1ly06-p-008": {
            "question": "Which sentence is easiest to read as a complete idea?",
            "explanation": "The goat sat on the mat is easiest to read because the words are in a sensible order and spaced correctly."
        },
    },
    "AC9E1LY07": {
        "ac9e1ly07-p-001": {
            "question": "Which opening clearly tells the topic of a short talk?",
            "explanation": "Today I will talk about cats tells the audience what the talk will be about."
        },
        "ac9e1ly07-p-005": {
            "question": "Which order is best for a short presentation?",
            "explanation": "Opening, facts, ending is best because a talk needs a beginning, middle and conclusion."
        },
        "ac9e1ly07-p-008": {
            "question": "Which sentence gives one learnt fact for a talk?",
            "explanation": "A goat needs water gives a factual detail that can belong in the middle of a learnt-topic talk."
        },
    },
    "AC9E1LY08": {
        "ac9e1ly08-p-001": {
            "question": "Which is the lower-case letter for A?",
            "correct": 2,
            "explanation": "a is the lower-case form of A."
        },
        "ac9e1ly08-p-002": {
            "question": "Which is the upper-case letter for b?",
            "correct": 1,
            "explanation": "B is the upper-case form of b."
        },
        "ac9e1ly08-p-005": {
            "question": "Choose the correctly written name.",
            "correct": 1,
            "explanation": "Ava is correct because a name begins with a capital letter and the other letters are lower case."
        },
    },
    "AC9E1LY09": {
        "ac9e1ly09-p-001": {
            "question": "Say ship. Which option shows its separate sounds?",
            "explanation": "/sh/ /i/ /p/ is correct because sh makes one sound."
        },
        "ac9e1ly09-p-002": {
            "question": "Say frog. Which option shows its separate sounds?",
            "explanation": "/f/ /r/ /o/ /g/ is correct because the blend has two consonant sounds."
        },
        "ac9e1ly09-p-004": {
            "question": "Say nest. Which option shows all the sounds?",
            "explanation": "/n/ /e/ /s/ /t/ is correct because both final cluster sounds are heard."
        },
    },
    "AC9E1LY10": {
        "ac9e1ly10-p-001": {
            "question": "Say cat. Change /c/ to /h/. What word do you make?",
            "explanation": "Changing the first sound /c/ to /h/ makes hat."
        },
        "ac9e1ly10-p-003": {
            "question": "Say sit. Change /i/ to /a/. What word do you make?",
            "explanation": "Changing the middle vowel sound /i/ to /a/ makes sat."
        },
        "ac9e1ly10-p-005": {
            "question": "Say cup. Change /p/ to /t/. What word do you make?",
            "explanation": "Changing the final sound /p/ to /t/ makes cut."
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
        "// Worksheet-only review for Year 1 English LY06-LY10. Practice and Test banks stay unchanged.\n"
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
    report = ROOT / "docs/year1-english-ly06-ly10-topic-worksheet-review-2026-09-06.md"
    report.write_text(
        "# Year 1 English LY06-LY10 topic and worksheet review\n\n"
        "Text-only review of AC9E1LY06, AC9E1LY07, AC9E1LY08, AC9E1LY09 and AC9E1LY10. "
        "Practice and Test banks were not changed in this pass; printable worksheets now use a worksheet-only review layer.\n\n"
        "## What changed\n\n"
        "- Added 20 Explain and apply teaching activities across the five topic pages.\n"
        "- Added a worksheet-only review asset that curates each printable worksheet from the existing practice bank and sharpens selected prompts.\n"
        "- Corrected selected worksheet-only answer keys for LY08 letter-case items where the source bank answer index and explanation disagreed.\n"
        "- Updated the five worksheet pages with reviewed worksheet metadata and the review asset.\n\n"
        "## IXL benchmark notes\n\n"
        "The IXL Australia Year 1 English alignment maps AC9E1LY06 to sentence editing, spelling patterns and complete-sentence choices, AC9E1LY09 to syllables, rhyme and beginning/ending sounds, and AC9E1LY10 to blending, identifying and manipulating sounds. "
        "AC9E1LY07 and AC9E1LY08 have no direct mapped IXL skill in the public alignment, so this pass applies the same standard through concise prompts, clear presentation routines, handwriting/case decisions and original wording.\n"
    )


if __name__ == "__main__":
    add_topic_sections()
    write_worksheet_asset()
    wire_worksheet_pages()
    write_report()
