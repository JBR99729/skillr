"""Scoped text review of Foundation English LE01–LE05 topic pages and worksheets."""
from pathlib import Path
from html import escape
from lxml import html
import json
import re

ROOT = Path(__file__).resolve().parents[1]
CODES = ["AC9EFLE01", "AC9EFLE02", "AC9EFLE03", "AC9EFLE04", "AC9EFLE05"]

TOPIC_ACTIVITIES = {
    "AC9EFLE01": [
        ("Notice one experience", "After hearing a story or poem, name one experience in the text: travelling, sharing food, playing a game, caring for Country or spending time with family.", "Keep the first answer close to the text. The learner should point to words or images before adding a personal connection. Accept oral, drawn or acted responses."),
        ("Connect without judging", "Say whether the text experience is similar to or different from your own life. Use respectful words such as In this story or In my family.", "The value is in the comparison, not in deciding which experience is better. Encourage neutral wording when the text comes from a culture or community different from the learner's own."),
        ("Use a literature image", "Look at an illustration by a named author or illustrator. What idea can you share from one visible clue?", "A valid idea must be supported by an observable detail such as a place, object, person, action, colour or repeated image. This keeps image talk evidence based."),
        ("Build a two-part response", "Complete: The text shows ____. That is similar to or different from my experience because ____.", "Support: offer two event cards from the text. Extend: include both one similarity and one difference while staying respectful and specific."),
    ],
    "AC9EFLE02": [
        ("Name the moment", "Choose one event from a story before saying a feeling or thought. For example: The fox finds the gate open.", "Young learners often jump straight to a feeling. Naming the event first makes the response traceable to the text."),
        ("Feeling plus clue", "Say: I felt ____ because ____. The because part must use a story clue, not a guess about a different story.", "Accept a range of feelings when the evidence fits. Two readers can respond differently if each uses a relevant clue."),
        ("Thought about a character", "Finish: I think the character is ____ because they ____.", "The second blank should be an action from the story. This separates a supported character thought from a simple preference."),
        ("Respond in more than one way", "Draw, act or tell the same response. Make sure the event, feeling or thought, and clue are all included.", "This makes the task Foundation-friendly while still requiring evidence. The response can be oral if writing load would hide the literature thinking."),
    ],
    "AC9EFLE03": [
        ("Sort the literary type", "Compare a story, poem and rhyme. Which one has characters and events? Which one uses lines or repeated sound?", "The learner is identifying features, not memorising labels. A poem can also tell events, so ask what evidence in the selected text supports the choice."),
        ("Find who and what happened", "On a short story page, point to the character and say one event.", "Character answers name who or what takes part. Event answers tell what happens. Keep these two jobs separate."),
        ("Beginning and ending", "Retell the first important event and the final important event. Explain how they work like bookends.", "The beginning starts the action or situation; the ending shows where the selected text finishes. Use picture cards if needed."),
        ("Picture-about check", "Look at a literature picture and answer: What is this picture mostly about? Which clue shows that?", "This closely matches the IXL-style picture-comprehension move while keeping it tied to literary features and evidence."),
    ],
    "AC9EFLE04": [
        ("Listen for rhyme", "Say moon, spoon and fish. Which two words have the same spoken ending?", "Rhyme is heard at the end of words. Do not judge by the last letter alone; say the words aloud."),
        ("Keep the beat", "Tap a steady beat while saying a short rhyme or chant. What stays even under the words?", "The beat is the pulse. Learners can tap, clap or step so the rhythm is physical as well as spoken."),
        ("Copy the pattern", "Repeat: red bird, blue bird, hop-hop-stop. Use the same action for each repeated part.", "The voice pattern and action pattern should match. If a word changes, the action can change in the same position."),
        ("Add one matching line", "Add a new line that keeps the rhythm and ends with a rhyming word.", "Support: give two rhyming choices. Extend: ask the learner to explain why the final word rhymes by sound."),
    ],
    "AC9EFLE05": [
        ("Retell before adapting", "Tell the familiar text in three parts: first, next and finally.", "A clear adaptation starts with an accurate retell. Keep the main events in order so listeners recognise the original."),
        ("Change one clear part", "Change the character, setting, object or ending, then say what stayed the same.", "The adaptation should keep enough anchors from the familiar text. Changing everything makes it a new story rather than an adapted version."),
        ("Use play or performance", "Show one event as a freeze-frame, puppet scene or role-play. Ask a partner which event it shows.", "This lets learners demonstrate sequence through action. A partner's answer checks whether the event is clear."),
        ("Compare both versions", "After the adaptation, complete: In both versions ____. In my new version ____.", "The comparison makes the creative change purposeful and visible. Accept oral, image or writing responses."),
    ],
}

WORKSHEET_EDITS = {
    "AC9EFLE01": {
        0: {
            "question": "A story shows Leila singing with her family after dinner. Which response connects the story event to the reader's life?",
            "answers": ["My family sings together too, so that experience is similar to mine.", "The story has twelve pages.", "Dinner is a word."],
        },
        5: {
            "question": "After viewing an attributed story by a First Nations Australian storyteller, which response stays close to this one text?",
            "answers": ["I noticed the repeated journey image, and it reminded me of travelling with my family.", "All First Nations stories use the same images.", "I can tell what every community believes from one story."],
        },
        8: {
            "question": "Respond to a story family celebration. Include one similarity, one difference and one clue from the selected text.",
            "answer": "A valid response gives one supported similarity, one supported difference and one clue from the selected story, image or poem.",
            "hint": "Use: The text shows ____. My experience is similar because ____. It is different because ____.",
        },
    },
    "AC9EFLE02": {
        0: {
            "question": "Niko loses a boot in the rain. Which response gives a feeling and a story clue?",
            "answers": ["I felt worried because Niko could not find the boot in the rain.", "Niko has a boot.", "Rain is wet."],
        },
        5: {
            "question": "Mara is nervous before a race. Which sentence tells the reader's feeling about Mara's race?",
            "answers": ["I felt hopeful that Mara would finish the race.", "Mara felt nervous.", "Mara stood at the start."],
        },
        7: {
            "question": "Two readers respond when a fox escapes. One feels relieved; one feels worried. Give a story clue that could support each response.",
            "answer": "Relieved can be supported by the fox becoming free; worried can be supported by the fox entering danger. Other relevant evidence-based clues are acceptable.",
            "hint": "Use one clue for relieved and a different clue for worried.",
        },
    },
    "AC9EFLE03": {
        0: {
            "question": "Mina finds a shining shell, listens to it and returns it to the beach. Who is the character in this literary text?",
            "answers": ["Mina", "finding the shell", "the ending"],
        },
        3: {
            "question": "A short text has line breaks, rhythm and a bird that wakes, flies and lands. What literary type could it be?",
            "answers": ["a story poem", "an exit sign", "a shopping label"],
        },
        8: {
            "question": "Make a feature map for a short literary text: name its type, one character, two events, the beginning and the ending.",
            "answer": "A valid map identifies a literary type, character, two connected events, first event and final event from the chosen text.",
            "hint": "Use the headings Type, Who, Events, Beginning and Ending.",
        },
    },
    "AC9EFLE04": {
        0: {
            "question": "Adult: say each pair aloud. Which pair rhymes?",
            "answers": ["moon and spoon", "moon and fish", "spoon and cat"],
        },
        3: {
            "question": "Complete the rhyme: Bright star, shining light. I can see you in the ____.",
            "answers": ["night", "sky", "tree"],
        },
        6: {
            "question": "Why do blue and you rhyme even though their spellings look different?",
            "answers": ["Their spoken end sounds match.", "They begin with the same letter.", "They have the same number of letters."],
        },
    },
    "AC9EFLE05": {
        1: {
            "question": "What should a clear retell keep so listeners recognise the familiar text?",
            "answers": ["the main events in story order", "every colour on every page", "a completely unrelated ending"],
            "answer": "the main events in story order",
        },
        3: {
            "question": "Which choice clearly adapts Tama's seed story while keeping it recognisable?",
            "answers": ["Tama still plants and waters, but a tall bean vine grows instead of a yellow flower.", "A spaceship races three robots on the Moon.", "The page is printed in blue ink."],
        },
        8: {
            "question": "Create a three-part retell of a familiar literary text. Adapt its ending and say exactly what stayed the same.",
            "answer": "A valid response sequences three main events, changes the ending and identifies the retained characters, setting or earlier events.",
            "hint": "Plan First, Next and Finally. Replace only the Finally part, then compare both versions.",
        },
    },
}


def normalise_text(value: str) -> str:
    return " ".join(value.split())


def improve_topic_pages():
    for code, activities in TOPIC_ACTIVITIES.items():
        path = next((ROOT / "foundation/english").glob(code.lower() + "*/index.html"))
        doc = html.fromstring(path.read_text())
        body = doc.xpath("//main/div")[0]
        for old in body.xpath('./details[@data-literature-review="true"]'):
            body.remove(old)

        # Remove exact repeated worked-example cards only; keep the first instance and all distinct elaborations.
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
            '<details class="curriculum-topic-section" data-literature-review="true">'
            '<summary><strong>Explain and apply</strong></summary>'
            '<div class="curriculum-detail-body">' + articles + '</div></details>'
        )
        body.insert(3, section)
        path.write_text("<!DOCTYPE html>\n" + html.tostring(doc, encoding="unicode", method="html") + "\n")


def write_review_asset():
    asset = ROOT / "quiz/assets/foundation-english-le01-le05-review.js"
    asset.write_text(
        "// Authored Literature worksheet review; runs after the compatibility enhancer on these routes.\n"
        "(() => {\n"
        " const edits = " + json.dumps(WORKSHEET_EDITS, ensure_ascii=False) + ";\n"
        " for (const [code, changes] of Object.entries(edits)) {\n"
        "  const unit = window.SkillrFoundationEnglishWorksheetData?.[code];\n"
        "  if (!unit) continue;\n"
        "  for (const [index, edit] of Object.entries(changes)) {\n"
        "   const q = unit.questions[Number(index)];\n"
        "   if (!q) continue;\n"
        "   Object.assign(q, edit);\n"
        "   q.summary = `Check the answer: ${q.alignment.method}.`;\n"
        "  }\n"
        " }\n"
        "})();\n"
    )


def preserve_reviewed_banks():
    balance = ROOT / "quiz/assets/foundation-english-topic-module-balance-v2.js"
    source = balance.read_text()
    marker = "// Preserve authored LE01–LE05 worksheet banks for the scoped literature review."
    if marker in source:
        source = source[:source.index(marker)]
    source += "\n" + marker + "\n"
    source += "window.SkillrFoundationEnglishLiteratureReview = Object.fromEntries("
    source += json.dumps(CODES)
    source += ".map(code => [code, JSON.parse(JSON.stringify(window.SkillrFoundationEnglishWorksheetData[code]))]));\n"
    balance.write_text(source)


def wire_worksheet_pages():
    for code in CODES:
        worksheet_dir = ROOT / "quiz/grade-k/english" / code.lower() / "worksheet"
        for path in worksheet_dir.glob("**/index.html"):
            source = path.read_text()
            source = re.sub(
                r'foundation-english-topic-module-balance-v2.js\?[^" ]+',
                'foundation-english-topic-module-balance-v2.js?v=20260814-foundation-english-topic2&review=20260906-literature',
                source,
            )
            restore = '<script>Object.assign(window.SkillrFoundationEnglishWorksheetData, window.SkillrFoundationEnglishLiteratureReview);</script><script src="/quiz/assets/foundation-english-le01-le05-review.js?v=20260906"></script>'
            if "foundation-english-le01-le05-review.js" not in source:
                pattern = r'(<script src="[^" ]*foundation-english-topic-module-balance-v2.js[^" ]*"></script>)'
                source, count = re.subn(pattern, r'\1' + restore, source)
                if count != 1:
                    raise RuntimeError(f"Could not wire worksheet review asset in {path}")
            path.write_text(source)


def write_report():
    report = ROOT / "docs/foundation-english-le01-le05-review-2026-09-06.md"
    report.write_text(
        "# Foundation English LE01–LE05 topic and worksheet review\n\n"
        "Text-only review of AC9EFLE01, AC9EFLE02, AC9EFLE03, AC9EFLE04 and AC9EFLE05. "
        "No classroom-view, Practice or Test content changed.\n\n"
        "## What changed\n\n"
        "- Added 20 Explain and apply teaching activities across the five topic pages.\n"
        "- Tuned 15 worksheet questions across the base worksheet, Topic Practice 1 and Topic Practice 2 routes.\n"
        "- Preserved the existing nine-question worksheet structure and warm-up/core/challenge spread.\n"
        "- Removed only exact duplicate worked-example cards where present.\n\n"
        "## IXL benchmark notes\n\n"
        "The IXL Australia Foundation English alignment maps AC9EFLE03 to picture-about comprehension and AC9EFLE04 to rhyme skills. "
        "Those two pages were benchmarked against short, evidence-based IXL-style prompts. AC9EFLE01, AC9EFLE02 and AC9EFLE05 have no direct mapped IXL skill in the public alignment, so their updates focus on the same instructional standard: clear prompt, evidence from the text, and a Foundation-appropriate oral, play, drawing or writing response. All examples and wording are original.\n"
    )


if __name__ == "__main__":
    improve_topic_pages()
    write_review_asset()
    preserve_reviewed_banks()
    wire_worksheet_pages()
    write_report()
