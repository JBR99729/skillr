"""Scoped Year 1 English topic-page and printable worksheet review for LA01-LA05."""
from pathlib import Path
from html import escape
from lxml import html
import json
import re

ROOT = Path(__file__).resolve().parents[1]
CODES = ["AC9E1LA01", "AC9E1LA02", "AC9E1LA03", "AC9E1LA04", "AC9E1LA05"]

TOPIC_ACTIVITIES = {
    "AC9E1LA01": [
        ("Match words to purpose", "Sort each line as a question, offer, request, command or exclamation: Can I help? Please wait. Look out! Where is the library?", "The learner should name what the words are doing in the interaction, then explain the clue in the sentence."),
        ("Add face and gesture", "Say You can sit here while pointing to an empty chair. What extra meaning does the gesture give?", "The pointing gesture makes here clear. This helps students see that body language can carry part of the message."),
        ("Open or closed question", "Compare Are you ready? and What made the story exciting? Which one invites a longer answer?", "What made the story exciting? is open because it asks for an explanation. Are you ready? is closed because yes or no can answer it."),
        ("Repair the interaction", "A student shouts Give it! when they want a turn. Change the words, voice and gesture for a classroom request.", "A strong repair uses polite request language, a calm voice and a gesture such as waiting with an open hand."),
    ],
    "AC9E1LA02": [
        ("Preference plus reason", "Choose a favourite between reading outside and drawing inside. Give the preference and the reason.", "The answer should name the choice and use because to explain why the speaker prefers it."),
        ("Fact or opinion", "Compare The apple is red and I like red apples best. Which sentence gives a personal preference?", "I like red apples best is a preference because another person could choose differently."),
        ("Give a clear reason", "A learner says I dislike the game because it is hard to join. What does the reason explain?", "The reason explains the dislike. It gives listeners more information than I dislike the game by itself."),
        ("Disagree respectfully", "Your partner prefers soccer; you prefer skipping. Share your view without making their choice wrong.", "A suitable response begins with I prefer and gives a reason, while still accepting that the partner has a different preference."),
    ],
    "AC9E1LA03": [
        ("Purpose decides organisation", "Compare a recount, report and instruction. What order would each one usually use?", "A recount often follows time order, a report groups information, and instructions use steps in order."),
        ("Find the organising clue", "A page has First, Next and Finally. What purpose might those words support?", "Those words support a sequence, often recounting an event or explaining instructions."),
        ("Match text to job", "Which text would use facts under headings: a report about frogs or a personal recount of recess?", "A report about frogs is more likely to group facts under headings. The organisation fits the purpose to inform."),
        ("Explain the choice", "Complete: This text is organised with ____ because it is made to ____.", "The learner should connect a feature such as headings, time words or steps to a purpose such as inform, recount, explain or instruct."),
    ],
    "AC9E1LA04": [
        ("Hear the repeated line", "In a chant, The rain came down is repeated after each verse. How does that help the poem hold together?", "Repetition links the parts and helps listeners predict the pattern."),
        ("Choose the rhyming word", "Complete: The cat sat near the mat. It looked at a little ____.", "A rhyming answer such as hat fits because it shares the spoken ending with cat and mat."),
        ("Tap the rhythm", "Clap the beat while saying a short chant. What should stay steady?", "The rhythm or beat should stay steady enough for listeners to hear the pattern."),
        ("Invent a matching line", "Write or say a new chant line that repeats a key word or keeps the rhyme.", "The new line should imitate the sound pattern rather than changing the chant into unrelated prose."),
    ],
    "AC9E1LA05": [
        ("Feature has a job", "Find a title, heading, page number, contents page, link or button. What does it help the reader do?", "Each print or screen feature should be tied to a job: name, locate, move, hear, open or organise information."),
        ("Use the contents page", "Where would you look to find a section quickly in a book?", "The table of contents helps because it lists sections and page numbers."),
        ("Navigate a screen", "A page has a Home link, Next button and speaker icon. Which feature moves forward?", "The Next button moves forward. The speaker icon usually plays audio and the Home link returns to the main page."),
        ("Compare book and screen", "How is turning a printed page like tapping Next on a screen?", "Both actions move the reader to the next part of the text, even though one uses a physical page and the other uses a digital control."),
    ],
}

WORKSHEET_EDITS = {
    "AC9E1LA01": {
        "ac9e1la01-er1-p-007": {
            "question": "A child points to an empty chair and says, 'You can sit here.' What does the gesture help show?",
            "explanation": "The gesture shows which chair here means. Words and gesture work together."
        },
        "ac9e1la01-er1-p-009": {
            "question": "Which question is open and invites a longer answer?",
            "explanation": "An open question asks for ideas or explanation, not just yes or no."
        },
        "ac9e1la01-er1-p-021": {
            "question": "A student wants a turn with the scissors. Write a request using suitable words, voice or gesture.",
            "explanation": "A good response uses request wording and a calm interaction choice."
        },
    },
    "AC9E1LA02": {
        "ac9e1la02-er1-p-001": {
            "question": "Which sentence gives a preference and a reason?",
            "explanation": "A preference names the chosen option, and because introduces the reason."
        },
        "ac9e1la02-er1-p-004": {
            "question": "Which sentence is a preference rather than a fact?",
            "explanation": "A preference tells a personal choice that another person may not share."
        },
        "ac9e1la02-er1-p-021": {
            "question": "Write a polite preference that disagrees with a friend's choice and gives a reason.",
            "explanation": "The answer should state the speaker's preference respectfully and explain it."
        },
    },
    "AC9E1LA03": {
        "ac9e1la03-er1-p-001": {
            "question": "Which text would usually use time words such as first, next and finally?",
            "explanation": "Time words organise events or steps in order."
        },
        "ac9e1la03-er1-p-005": {
            "question": "A report about frogs has headings for body, food and habitat. Why are headings useful?",
            "explanation": "Headings group related information so readers can find facts quickly."
        },
        "ac9e1la03-er1-p-022": {
            "question": "Choose a text purpose and name one organisation feature that would help that purpose.",
            "explanation": "The feature should match the job of the text, such as steps for instructions or headings for information."
        },
    },
    "AC9E1LA04": {
        "ac9e1la04-er1-p-001": {
            "question": "Which word best completes the rhyme: The cat sat near the mat and looked at a ____.",
            "explanation": "Hat rhymes because it has the same spoken ending as cat and mat."
        },
        "ac9e1la04-er1-p-006": {
            "question": "A chant repeats the line The rain came down. What does the repeated line help do?",
            "explanation": "The repeated line links the parts and helps listeners hear the pattern."
        },
        "ac9e1la04-er1-p-023": {
            "question": "Add one new line to a chant that keeps either the repeated words or the rhyme.",
            "explanation": "The new line should imitate a sound pattern from the chant."
        },
    },
    "AC9E1LA05": {
        "ac9e1la05-er1-p-001": {
            "question": "Which print feature helps you find a section quickly in a book?",
            "explanation": "A table of contents lists sections and page numbers."
        },
        "ac9e1la05-er1-p-005": {
            "question": "On a screen, which feature usually moves the reader to the next part?",
            "explanation": "A Next button or forward arrow moves to the next screen or section."
        },
        "ac9e1la05-er1-p-022": {
            "question": "Compare one book feature and one screen feature. Explain how each helps the reader.",
            "explanation": "A good answer names each feature and explains its navigation or organisation job."
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
    asset = ROOT / "quiz/assets/year1-english-la01-la05-worksheet-review.js"
    asset.write_text(
        "// Worksheet-only review for Year 1 English LA01-LA05. Practice and Test banks stay unchanged.\n"
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
        path = ROOT / "quiz/year-1/english" / code.lower() / "worksheet/index.html"
        source = path.read_text()
        if "year1-english-la01-la05-worksheet-review.js" not in source:
            source = source.replace(
                f'<script src="/quiz/year-1/english/{code.lower()}/practice/questions.js"></script>',
                f'<script src="/quiz/year-1/english/{code.lower()}/practice/questions.js"></script><script src="/quiz/assets/year1-english-la01-la05-worksheet-review.js?v=20260906"></script>',
            )
        source = source.replace(
            f"<title>{code} ",
            f"<title>{code} Reviewed ",
        )
        source = re.sub(
            r'<meta name="description" content="Generate an 8-question worksheet for ' + code + r'\.">',
            f'<meta name="description" content="Reviewed 8-question printable worksheet for {code}, using Year 1 English prompts aligned to the topic guide and practice bank.">',
            source,
        )
        path.write_text(source)


def write_report():
    report = ROOT / "docs/year1-english-la01-la05-topic-worksheet-review-2026-09-06.md"
    report.write_text(
        "# Year 1 English LA01-LA05 topic and worksheet review\n\n"
        "Text-only review of AC9E1LA01, AC9E1LA02, AC9E1LA03, AC9E1LA04 and AC9E1LA05. "
        "Practice and Test banks were not changed in this pass; printable worksheets now use a worksheet-only review layer.\n\n"
        "## What changed\n\n"
        "- Added 20 Explain and apply teaching activities across the five topic pages.\n"
        "- Added a worksheet-only review asset that curates each printable worksheet from the already-reviewed practice bank and sharpens selected prompts.\n"
        "- Updated the five worksheet pages with reviewed worksheet metadata and the review asset.\n\n"
        "## IXL benchmark notes\n\n"
        "This batch follows the selected IXL-style standard already used in the Year 1 English bank review: short prompts, clear answer choices, one assessable idea at a time and original wording. "
        "LA04 has the closest public IXL match through rhyme and poem-completion practice; LA01, LA02, LA03 and LA05 were strengthened against the curriculum target and related IXL task style.\n"
    )


if __name__ == "__main__":
    add_topic_sections()
    write_worksheet_asset()
    wire_worksheet_pages()
    write_report()
