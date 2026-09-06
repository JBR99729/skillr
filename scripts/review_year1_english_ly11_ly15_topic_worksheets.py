"""Scoped Year 1 English topic-page and printable worksheet review for LY11-LY15."""
from pathlib import Path
from html import escape
from lxml import html
import json
import re

ROOT = Path(__file__).resolve().parents[1]
CODES = ["AC9E1LY11", "AC9E1LY12", "AC9E1LY13", "AC9E1LY14", "AC9E1LY15"]
ASSET_NAME = "year1-english-ly11-ly15-worksheet-review.js"

TOPIC_ACTIVITIES = {
    "AC9E1LY11": [
        ("Find a digraph", "Read: ship, chip, sip. Which word has sh?", "ship has sh. The two letters sh work together to make one sound at the start of the word."),
        ("Hear both blend sounds", "Read: fog, frog, drum. Which word has the blend fr?", "frog has fr. In a consonant blend, both sounds are heard: /f/ then /r/."),
        ("Long vowel pattern", "Choose the word with ai: ran, rain, red.", "rain has ai. The letters ai commonly make the long a sound in one-syllable words."),
        ("Blend a two-syllable word", "Read sunset by parts: sun-set. How can you blend it?", "Read each syllable, then join them: sun-set becomes sunset. This builds from sound work into fluent word reading."),
    ],
    "AC9E1LY12": [
        ("Count vowel sounds", "Clap cat. How many syllables do you hear?", "cat has one syllable because it has one vowel sound."),
        ("Letter, two sounds", "Compare gem and go. What changes about the letter g?", "The letter g can represent a soft sound in gem and a hard sound in go."),
        ("Clap two parts", "Clap sunset. How many syllables do you hear?", "sunset has two syllables: sun-set. Each syllable has a vowel sound."),
        ("Sort by vowel sound", "Sort these words: cat, cake, bed, he. Which words have a short vowel sound?", "cat and bed have short vowel sounds. cake and he have long vowel sounds."),
    ],
    "AC9E1LY13": [
        ("Check each syllable", "Write rabbit. Which spelling keeps the two parts clear: rab-bit?", "rabbit is correct. Hearing the two syllables helps students check the middle letters."),
        ("Build a compound word", "Join sun and set. What word do you make?", "sun and set make sunset. Students can spell the word by writing both smaller words in order."),
        ("Choose a digraph spelling", "Which spelling matches chicken: chikin, chicken or chiken?", "chicken is correct. It begins with ch and uses the common ck pattern after a short vowel sound."),
        ("Proofread by pattern", "A student writes picnik. Which letter pattern should they check?", "picnic is correct. Students should check the final /k/ spelling pattern in the second syllable."),
    ],
    "AC9E1LY14": [
        ("Complete the sentence", "Choose the high-frequency word: Mia was/were/be happy.", "was completes the sentence. Students should read the whole sentence and check that it sounds right."),
        ("Read without guessing", "Read: The dog is small. Which word must be recognised quickly?", "The is a high-frequency word. Recognising it automatically helps students read the sentence smoothly."),
        ("Choose the right word", "Complete: Can you/your/yes help me?", "you is correct. The sentence is asking another person for help."),
        ("Write from memory", "Write the sentence: I have some apples. Which word might need extra practice?", "some is a high-frequency word that may not be easy to spell by sound alone, so it should be practised as a known word."),
    ],
    "AC9E1LY15": [
        ("Add an ending", "Add -ing to play. What word do you make?", "playing is made from the base word play plus the ending -ing."),
        ("Show one action now", "Which word means the action is happening now: help, helping or helps?", "helping means the action is happening now. The ending -ing changes how the word works in the sentence."),
        ("Find the base word", "What is the base word in reading?", "read is the base word. The ending -ing has been added to make reading."),
        ("Make a word family", "List three words in the play family.", "play, plays and playing belong to the same word family because they share the base word play."),
    ],
}

WORKSHEET_EDITS = {
    "AC9E1LY11": {
        "ac9e1ly11-p-001": {
            "question": "Which word has the digraph sh?",
            "explanation": "ship has sh. The two letters sh work together to make one sound."
        },
        "ac9e1ly11-p-003": {
            "question": "Which word has the consonant blend fr?",
            "explanation": "frog has fr. In the blend fr, both /f/ and /r/ can be heard."
        },
        "ac9e1ly11-p-005": {
            "question": "Which word has the long-vowel pattern ai?",
            "explanation": "rain has ai. The letters ai commonly make the long a sound."
        },
    },
    "AC9E1LY12": {
        "ac9e1ly12-p-001": {
            "question": "Clap cat. How many syllables does it have?",
            "explanation": "cat has one syllable because it has one vowel sound."
        },
        "ac9e1ly12-p-002": {
            "question": "In which pair does the letter g make two different sounds?",
            "explanation": "gem and go is correct. The letter g has a soft sound in gem and a hard sound in go."
        },
        "ac9e1ly12-p-003": {
            "question": "Clap sunset. How many syllables does it have?",
            "explanation": "sunset has two syllables: sun-set. Each syllable has a vowel sound."
        },
    },
    "AC9E1LY13": {
        "ac9e1ly13-p-001": {
            "question": "Which spelling correctly writes the two-syllable word rabbit?",
            "explanation": "rabbit is correct. Say the parts rab-bit, then check each syllable."
        },
        "ac9e1ly13-p-002": {
            "question": "Which spelling correctly joins sun and set?",
            "explanation": "sunset is correct. It is made by writing sun then set."
        },
        "ac9e1ly13-p-003": {
            "question": "Which spelling correctly writes chicken?",
            "explanation": "chicken is correct. It starts with ch and uses the common ck pattern after a short vowel sound."
        },
    },
    "AC9E1LY14": {
        "ac9e1ly14-p-001": {
            "question": "Which high-frequency word completes the sentence? Mia ___ happy.",
            "explanation": "was completes the sentence. Read the whole sentence to check that it sounds right."
        },
        "ac9e1ly14-p-003": {
            "question": "Which high-frequency word completes the sentence? Can ___ help me?",
            "explanation": "you completes the sentence because the speaker is asking another person for help."
        },
        "ac9e1ly14-p-005": {
            "question": "Which high-frequency word completes the sentence? Please ___ here.",
            "explanation": "come completes the sentence. come is a high-frequency word students should read quickly and spell from memory."
        },
    },
    "AC9E1LY15": {
        "ac9e1ly15-p-001": {
            "question": "Add -ing to play. Which word do you make?",
            "explanation": "playing is made from the base word play plus the ending -ing."
        },
        "ac9e1ly15-p-003": {
            "question": "Which pair belongs to the same word family?",
            "explanation": "look and looking belong together because they share the base word look."
        },
        "ac9e1ly15-p-007": {
            "question": "What is the base word in reading?",
            "explanation": "read is the base word. The ending -ing has been added to make reading."
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
        "// Worksheet-only review for Year 1 English LY11-LY15. Practice and Test banks stay unchanged.\n"
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
    report = ROOT / "docs/year1-english-ly11-ly15-topic-worksheet-review-2026-09-06.md"
    report.write_text(
        "# Year 1 English LY11-LY15 topic and worksheet review\n\n"
        "Text-only review of AC9E1LY11, AC9E1LY12, AC9E1LY13, AC9E1LY14 and AC9E1LY15. "
        "Practice and Test banks were not changed in this pass; printable worksheets now use a worksheet-only review layer.\n\n"
        "## What changed\n\n"
        "- Added 20 Explain and apply teaching activities across the five topic pages.\n"
        "- Added a worksheet-only review asset that curates each printable worksheet from the existing practice bank and sharpens selected prompts.\n"
        "- Reworked selected worksheet explanations so they teach the reason: digraphs, blends, vowel sounds, syllables, spelling patterns, high-frequency words and morphemes.\n"
        "- Updated the five worksheet pages with reviewed worksheet metadata and the review asset.\n\n"
        "## IXL benchmark notes\n\n"
        "The IXL Australia Year 1 English alignment strongly maps AC9E1LY11 to short vowels, long vowels, blends, digraphs and syllable work; AC9E1LY12 to letter-sound variation and vowel/syllable recognition; AC9E1LY13 to one- and two-syllable spelling patterns; and AC9E1LY14 to sight-word and sentence-completion fluency. "
        "AC9E1LY15 is treated as morphology-led: base word, ending, word family and meaning-change checks use the same compact, explicit standard while keeping all wording original.\n"
    )


if __name__ == "__main__":
    add_topic_sections()
    write_worksheet_asset()
    wire_worksheet_pages()
    write_report()
