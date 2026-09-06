"""Scoped Year 1 English topic-page and printable worksheet review for LA06-LA10."""
from pathlib import Path
from html import escape
from lxml import html
import json
import re

ROOT = Path(__file__).resolve().parents[1]
CODES = ["AC9E1LA06", "AC9E1LA07", "AC9E1LA08", "AC9E1LA09", "AC9E1LA10"]

TOPIC_ACTIVITIES = {
    "AC9E1LA06": [
        ("Check the complete idea", "Compare The little boat and The little boat floated. Which one can stand alone as a sentence?", "The little boat floated is complete because it gives one idea: who or what, and what happened."),
        ("Find naming and action parts", "In Our teacher smiled, point to who the sentence is about and what happened.", "Our teacher names who the sentence is about; smiled tells the action or event."),
        ("Repair a fragment", "Add words to Beside the pond so it becomes a complete sentence.", "For example: The frog sat beside the pond. The repair adds the missing participant and action."),
        ("Keep it one event", "Write a simple sentence about a puppy that tells one clear event.", "A strong answer has one independent idea, such as The puppy slept. Extend by changing the action while keeping the same naming part."),
    ],
    "AC9E1LA07": [
        ("Name the word job", "In The ducks paddle, which word names a thing and which word tells an action?", "Ducks names animals; paddle tells what happens. Use the job in the sentence, not just a memorised label."),
        ("Describe the noun", "In A soft blanket covered me, what does soft do?", "Soft describes blanket, so it gives a quality of the thing being named."),
        ("Use a pronoun clearly", "Change Omar waved. Omar smiled. so the repeated name is replaced without losing meaning.", "Omar waved. He smiled. He refers back to Omar, so the reader still knows who smiled."),
        ("Add when, where or how", "Expand The puppy waited with one detail that tells where, when or how.", "For example: The puppy waited outside. The extra word gives a useful detail about the action."),
    ],
    "AC9E1LA08": [
        ("Image adds meaning", "A story says The child opened the gift. The picture shows a grin. What does the image add?", "The picture adds the child's feeling. The words tell the event; the image gives extra meaning."),
        ("Match image to purpose", "Which image helps an information page about plant parts: a labelled plant diagram or a birthday party picture?", "The labelled plant diagram fits because it helps the reader identify parts of a plant."),
        ("Compare two image jobs", "A map image shows a path; a recipe image shows folding dough. What does each image help readers do?", "The map helps with location and direction. The recipe image helps explain an action in a procedure."),
        ("Check image evidence", "A picture shows a kitten under a chair, but the words say The room was empty. What should the reader notice?", "The image adds information that changes the reader's understanding, so words and images must be read together."),
    ],
    "AC9E1LA09": [
        ("Use topic context", "In science, root means the plant part usually growing into soil. How is that different from a root in maths?", "The subject area changes the meaning. Learners should use the lesson topic to choose the right meaning."),
        ("Explain a learning word", "In a weather lesson, what does rainfall refer to?", "Rainfall means the rain that falls over a place or time. The clue comes from the weather context."),
        ("Sort by subject", "Match habitat, total and rhythm to science, maths and music.", "Habitat belongs with science, total with maths and rhythm with music. Each word has value inside a learning area."),
        ("Use the word accurately", "Write a sentence using observe in a science lesson.", "A valid sentence uses observe to mean look carefully, notice and record details."),
    ],
    "AC9E1LA10": [
        ("Choose the end mark", "Which mark ends Where is my hat?", "A question mark ends a direct question. Read the sentence purpose before choosing the mark."),
        ("Capitalise proper nouns", "Repair We visit the park on tuesday.", "Tuesday needs a capital letter because it is the name of a day: We visit the park on Tuesday."),
        ("Name needs a capital", "A dog's name is patch. How should the name be written in a sentence?", "Patch begins with a capital because it is a proper noun, even though dog does not."),
        ("Explain the job", "Why does Stop! use an exclamation mark?", "The exclamation mark shows a strong feeling, warning or urgent command. It is chosen for meaning, not decoration."),
    ],
}

WORKSHEET_EDITS = {
    "AC9E1LA06": {
        "ac9e1la06-er2-p-001": {
            "question": "Which group of words gives one complete idea?",
            "explanation": "A simple sentence can stand alone when it tells one clear idea."
        },
        "ac9e1la06-er2-p-006": {
            "question": "Beside the pond. What is missing if this is meant to stand alone as a sentence?",
            "explanation": "The fragment gives a place but does not tell who or what is there, or what happens."
        },
        "ac9e1la06-er2-p-010": {
            "question": "Which repair makes The little boat a complete sentence?",
            "explanation": "A repair must add what happens so the words express a complete idea."
        },
    },
    "AC9E1LA07": {
        "ac9e1la07-er2-p-001": {
            "question": "In The ducks paddle, which word tells the action?",
            "explanation": "Paddle tells what the ducks do."
        },
        "ac9e1la07-er2-p-003": {
            "question": "In A soft blanket covered me, which word describes the blanket?",
            "explanation": "Soft describes the quality of the blanket."
        },
        "ac9e1la07-er2-p-010": {
            "question": "Replace the repeated name: Omar waved. Omar smiled.",
            "explanation": "A pronoun can replace the repeated name when the reader still knows who it means."
        },
    },
    "AC9E1LA08": {
        "ac9e1la08-er2-p-001": {
            "question": "Look at the two book images. Which image helps a reader name parts of a plant?",
            "explanation": "A labelled plant image helps identify the plant parts named in an information text."
        },
        "ac9e1la08-er2-p-006": {
            "question": "A story says, The room was empty. The picture shows a kitten under a chair. What extra information does the picture add?",
            "explanation": "The picture adds that a kitten is hidden in the room, so it changes the reader's understanding."
        },
        "ac9e1la08-er2-p-010": {
            "question": "A comic uses a thought bubble. A science diagram uses label lines. What does each image feature help the reader understand?",
            "explanation": "A thought bubble shows a character's thinking, while label lines identify parts or features."
        },
    },
    "AC9E1LA09": {
        "ac9e1la09-er2-p-001": {
            "question": "In a plant lesson, which word names the part usually growing into the soil?",
            "explanation": "Root is the plant-topic word for the part that usually grows into soil."
        },
        "ac9e1la09-er2-p-007": {
            "question": "An animal's habitat is the place where it lives. Which phrase describes a habitat?",
            "explanation": "A habitat is an animal's living place, so the answer should describe where it lives."
        },
        "ac9e1la09-er2-p-008": {
            "question": "In a science lesson, observe the shell means what?",
            "explanation": "Observe means look carefully and notice details."
        },
    },
    "AC9E1LA10": {
        "ac9e1la10-er2-p-001": {
            "question": "Which mark ends the direct question Where is my hat?",
            "explanation": "A direct question needs a question mark."
        },
        "ac9e1la10-er2-p-004": {
            "question": "Which word needs a capital in We visit the park on tuesday?",
            "explanation": "Tuesday is the name of a day, so it needs a capital letter."
        },
        "ac9e1la10-er2-p-007": {
            "question": "A dog's name is patch. Which version writes the name correctly?",
            "explanation": "Patch begins with a capital letter because it is a name."
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
    asset = ROOT / "quiz/assets/year1-english-la06-la10-worksheet-review.js"
    asset.write_text(
        "// Worksheet-only review for Year 1 English LA06-LA10. Practice and Test banks stay unchanged.\n"
        "(() => {\n"
        " const edits = " + json.dumps(WORKSHEET_EDITS, ensure_ascii=False) + ";\n"
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
        if "year1-english-la06-la10-worksheet-review.js" not in source:
            source = source.replace(
                f'<script src="/quiz/year-1/english/{lower}/practice/questions.js"></script>',
                f'<script src="/quiz/year-1/english/{lower}/practice/questions.js"></script><script src="/quiz/assets/year1-english-la06-la10-worksheet-review.js?v=20260906"></script>',
            )
        source = source.replace(f"<title>{code} ", f"<title>{code} Reviewed ")
        source = re.sub(
            r'<meta name="description" content="Generate an 8-question worksheet for ' + code + r'\.">',
            f'<meta name="description" content="Reviewed 8-question printable worksheet for {code}, using Year 1 English prompts aligned to the topic guide and reviewed practice bank.">',
            source,
        )
        path.write_text(source)


def write_report():
    report = ROOT / "docs/year1-english-la06-la10-topic-worksheet-review-2026-09-06.md"
    report.write_text(
        "# Year 1 English LA06-LA10 topic and worksheet review\n\n"
        "Text-only review of AC9E1LA06, AC9E1LA07, AC9E1LA08, AC9E1LA09 and AC9E1LA10. "
        "Practice and Test banks were not changed in this pass; printable worksheets now use a worksheet-only review layer.\n\n"
        "## What changed\n\n"
        "- Added 20 Explain and apply teaching activities across the five topic pages.\n"
        "- Added a worksheet-only review asset that curates each printable worksheet from the already-reviewed practice bank and sharpens selected prompts.\n"
        "- Updated the five worksheet pages with reviewed worksheet metadata and the review asset.\n\n"
        "## IXL benchmark notes\n\n"
        "This batch follows the reviewed Year 1 English bank references for simple sentences, word roles, images and meaning, learning-area vocabulary and punctuation. "
        "The topic and worksheet updates use short prompts, clear evidence, direct answer choices and original wording.\n"
    )


if __name__ == "__main__":
    add_topic_sections()
    write_worksheet_asset()
    wire_worksheet_pages()
    write_report()
