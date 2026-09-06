"""Scoped Year 1 English topic-page and printable worksheet review for LE01-LE05."""
from pathlib import Path
from html import escape
from lxml import html
import json
import re

ROOT = Path(__file__).resolve().parents[1]
CODES = ["AC9E1LE01", "AC9E1LE02", "AC9E1LE03", "AC9E1LE04", "AC9E1LE05"]

TOPIC_ACTIVITIES = {
    "AC9E1LE01": [
        ("Image and words build character", "The words say Mia waited by the gate. The picture shows Mia biting her lip. What does each part tell you?", "The words tell the event and place; the image suggests Mia may feel worried or nervous. The answer should use both kinds of evidence."),
        ("Find the setting clues", "Look at a story page. Point to one word clue and one image clue that show where the story happens.", "A strong answer names a setting such as beach, classroom, bush track or kitchen and gives evidence from words or images."),
        ("Respect the selected text", "Discuss a story by a named First Nations Australian author or illustrator. What character, setting or event is shown in this text?", "Keep the response anchored to the selected text. Avoid turning one story into a statement about all communities or storytellers."),
        ("Explain how meaning is made", "Complete: I know ____ because the words show ____ and the image shows ____.", "This structure makes students connect language and image evidence instead of giving a guess."),
    ],
    "AC9E1LE02": [
        ("Connect to experience", "A character feels shy on the first day. When have you felt something similar?", "A suitable connection names the story feeling and one personal experience that is similar or different."),
        ("Feeling plus reason", "Say: I felt ____ when ____ because ____.", "The reason should connect to the story event, character action or student's own experience."),
        ("Different responses can work", "Two students respond differently to the same story event. How can both responses be fair?", "Both can be fair when each response uses evidence from the text or a real connection."),
        ("Share respectfully", "Use I noticed, This reminds me of, or I felt to discuss a literary text with a partner.", "These frames keep discussion clear, respectful and tied to the text."),
    ],
    "AC9E1LE03": [
        ("Find plot problem and solution", "Read: Mia lost a hat. At last, Mia found it. What was the problem and how was it solved?", "The problem is the lost hat; the solution is that Mia found it. Students should separate what went wrong from how it ended."),
        ("Character and setting", "In A dog slept under a tree, who is the character and where is the setting?", "The dog is the character; under a tree is the setting clue. This matches IXL-style short evidence questions."),
        ("Actions show character", "A character shares the last apple. What could that action suggest about the character?", "The action may suggest the character is kind or generous. The answer needs the action as evidence."),
        ("Story feature map", "Choose a short story and map its character, setting, problem, main event and ending.", "The map should use details from the selected story, not invented details from a different text."),
    ],
    "AC9E1LE04": [
        ("Complete the rhyme", "Finish: I see a bee in a ____.", "A rhyming answer such as tree fits because it shares the spoken ending sound. This is the closest IXL match for the code."),
        ("Hear alliteration", "Which line repeats a beginning sound: Big bears bounce or The frog jumps?", "Big bears bounce repeats the beginning /b/ sound. The decision is made by listening."),
        ("Clap rhythm", "Clap the beat while saying Run to the beach. Which word comes last?", "Students track spoken rhythm and word order, then identify the final word."),
        ("Invent a sound pattern", "Make a new chant line that uses rhyme, repetition or alliteration.", "The new line should imitate a sound feature from poems, chants, rhymes or songs."),
    ],
    "AC9E1LE05": [
        ("Retell in order", "Retell: Mia found a seed. Mia planted it. A flower grew. What happened first, second and last?", "The retell should keep the plot order so listeners recognise the familiar story."),
        ("Use characters and plot", "If you act as the fox in a story, what words or actions help the audience know who you are?", "A strong answer uses character behaviour, voice, gesture or a simple prop tied to the plot."),
        ("Adapt one part", "Change the setting of a familiar story while keeping the main character and problem.", "The adaptation should change one clear feature while preserving enough structure to remain recognisable."),
        ("Compare versions", "Complete: In the original story ____. In my adapted story ____.", "The comparison shows what stayed the same and what changed in the retell or adaptation."),
    ],
}

WORKSHEET_EDITS = {
    "AC9E1LE01": {
        "ac9e1le01-p-001": {
            "question": "The words say Mia waited by the gate. The picture shows Mia smiling. What does the picture add?",
            "explanation": "The words give the event and place; the picture adds a clue about Mia's feeling."
        },
        "ac9e1le01-p-005": {
            "question": "The picture shows Ava running. What story information can the image show?",
            "explanation": "The image can show an action, which helps build the event in the story."
        },
        "ac9e1le01-p-021": {
            "question": "Choose a story page. Name one thing the words tell and one thing the image shows about a character, setting or event.",
            "explanation": "A strong answer uses evidence from both the words and the image."
        },
    },
    "AC9E1LE02": {
        "ac9e1le02-p-001": {
            "question": "Read: Mia felt shy on the first day. Which response makes a connection to your own experience?",
            "explanation": "A connection links a story feeling or event with something from the reader's life."
        },
        "ac9e1le02-p-004": {
            "question": "Read: The children played at the beach. Which connection stays close to the story event?",
            "explanation": "The best connection uses the beach or playing event rather than a new unrelated topic."
        },
        "ac9e1le02-p-021": {
            "question": "Choose one story moment and share a response using I noticed, I felt or This reminds me of.",
            "explanation": "The response should name a story clue and a connected thought, feeling or experience."
        },
    },
    "AC9E1LE03": {
        "ac9e1le03-p-001": {
            "question": "Read: Mia lost a hat. At last, Mia found it. What was the problem?",
            "explanation": "The problem is what goes wrong in the plot: Mia lost the hat."
        },
        "ac9e1le03-p-003": {
            "question": "Read: Sam played by the pond. Which words show the setting?",
            "explanation": "By the pond tells where the story event happens."
        },
        "ac9e1le03-p-007": {
            "question": "Read: The fish could not cross. Zoe made a bridge. How was the problem solved?",
            "explanation": "Zoe solved the problem by making a bridge."
        },
    },
    "AC9E1LE04": {
        "ac9e1le04-p-001": {
            "question": "Which word rhymes with cat?",
            "explanation": "A rhyming word has the same spoken ending sound as cat."
        },
        "ac9e1le04-p-005": {
            "question": "Finish the rhyme: I see a bee in a ____.",
            "explanation": "Tree rhymes with bee because the spoken ending sound matches."
        },
        "ac9e1le04-p-008": {
            "question": "Which line uses alliteration by repeating the beginning sound?",
            "explanation": "Alliteration repeats the beginning sound in nearby words."
        },
    },
    "AC9E1LE05": {
        "ac9e1le05-p-001": {
            "question": "Retell: Mia found a seed. Mia planted it. A flower grew. What happened second?",
            "explanation": "Planting the seed is the second event in the plot."
        },
        "ac9e1le05-p-003": {
            "question": "Which sentence could change the setting while keeping the story recognisable?",
            "explanation": "A clear adaptation changes one part, such as setting, while keeping the main story structure."
        },
        "ac9e1le05-p-007": {
            "question": "To adapt a familiar story, what may you change while keeping the story recognisable?",
            "explanation": "You may change a character, setting, event or ending if enough of the familiar story remains."
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
    asset = ROOT / "quiz/assets/year1-english-le01-le05-worksheet-review.js"
    asset.write_text(
        "// Worksheet-only review for Year 1 English LE01-LE05. Practice and Test banks stay unchanged.\n"
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
        if "year1-english-le01-le05-worksheet-review.js" not in source:
            source = source.replace(
                f'<script src="/quiz/year-1/english/{lower}/practice/questions.js"></script>',
                f'<script src="/quiz/year-1/english/{lower}/practice/questions.js"></script><script src="/quiz/assets/year1-english-le01-le05-worksheet-review.js?v=20260906"></script>',
            )
        source = source.replace(f"<title>{code} ", f"<title>{code} Reviewed ")
        source = re.sub(
            r'<meta name="description" content="Generate an 8-question worksheet for ' + code + r'\.">',
            f'<meta name="description" content="Reviewed 8-question printable worksheet for {code}, using Year 1 English prompts aligned to the topic guide and IXL-standard review.">',
            source,
        )
        path.write_text(source)


def write_report():
    report = ROOT / "docs/year1-english-le01-le05-topic-worksheet-review-2026-09-06.md"
    report.write_text(
        "# Year 1 English LE01-LE05 topic and worksheet review\n\n"
        "Text-only review of AC9E1LE01, AC9E1LE02, AC9E1LE03, AC9E1LE04 and AC9E1LE05. "
        "Practice and Test banks were not changed in this pass; printable worksheets now use a worksheet-only review layer.\n\n"
        "## What changed\n\n"
        "- Added 20 Explain and apply teaching activities across the five topic pages.\n"
        "- Added a worksheet-only review asset that curates each printable worksheet from the existing practice bank and sharpens selected prompts.\n"
        "- Updated the five worksheet pages with reviewed worksheet metadata and the review asset.\n\n"
        "## IXL benchmark notes\n\n"
        "The IXL Australia Year 1 English alignment maps AC9E1LE03 to picture meaning and character evidence, and AC9E1LE04 to rhyme and poem-completion skills. "
        "AC9E1LE01, AC9E1LE02 and AC9E1LE05 have no direct mapped IXL skill in the public alignment, so this pass applies the same standard through short prompts, explicit text evidence, clear response frames and original wording.\n"
    )


if __name__ == "__main__":
    add_topic_sections()
    write_worksheet_asset()
    wire_worksheet_pages()
    write_report()
