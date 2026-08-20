#!/usr/bin/env python3
"""Upgrade only legacy/generic English F-10 topic pages.

Rich existing pages are preserved. A page is rewritten only when it still contains
known generic boilerplate or cross-subject mapping contamination. The replacement
is static HTML, keeps the canonical URL and reuses the page's existing resource
routes.
"""
from __future__ import annotations

import html
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ROOTS = [ROOT / "foundation", *[ROOT / f"year{n}" for n in range(1, 11)]]

GENERIC_MARKERS = (
    "The goal is not to memorise one answer pattern",
    "Use concrete examples, pictures, oral explanation and short written responses before moving to independent practice",
    "Finish with a mixed activity so students must choose the correct strategy rather than copy the last example",
    "Answering from memory without using clues from the text, sentence or image",
    "Knowing the idea orally but not transferring it into reading, writing or speaking",
    "Missing punctuation, word order or vocabulary clues that change meaning",
    "Common Core Mathematics/ELA",
    "Next Generation Science Standards",
    "nextgenscience.org",
)


def clean(value: str) -> str:
    value = html.unescape(str(value or ""))
    value = re.sub(r"<[^>]+>", " ", value)
    return re.sub(r"\s+", " ", value).strip()


def esc(value: str) -> str:
    return html.escape(str(value), quote=True)


def year_of(path: Path) -> int:
    for part in path.parts:
        if part == "foundation":
            return 0
        if re.fullmatch(r"year\d+", part):
            return int(part[4:])
    raise ValueError(path)


def code_of(source: str, path: Path) -> str:
    match = re.search(r"AC9E[A-Z0-9]+", source, re.I) or re.search(r"ac9e[a-z0-9]+", path.as_posix(), re.I)
    if not match:
        raise ValueError(f"No AC9E code: {path}")
    return match.group(0).upper()


def description_of(source: str) -> str:
    match = re.search(r"<strong>Content description:</strong>\s*(.*?)</li>", source, re.I | re.S)
    if match:
        return clean(match.group(1))
    match = re.search(r'<p class="curriculum-hero__lead">(.*?)</p>', source, re.I | re.S)
    if match:
        return clean(match.group(1))
    raise ValueError("Content description not found")


def elaborations_of(source: str) -> list[str]:
    return [clean(x) for x in re.findall(r"<strong>E\d+:</strong>\s*(.*?)</li>", source, re.I | re.S)]


def href_for(source: str, kind: str, fallback: str) -> str:
    patterns = {
        "teacher": r'href=["\']([^"\']*(?:teacher-slides|teacher-slide)[^"\']*)["\']',
        "worksheet": r'href=["\']([^"\']*/worksheet/)["\']',
        "practice": r'href=["\']([^"\']*/practice/)["\']',
        "test": r'href=["\']([^"\']*/test/)["\']',
    }
    match = re.search(patterns[kind], source, re.I)
    return html.unescape(match.group(1)) if match else fallback


def family_for(text: str, year: int) -> str:
    t = text.lower()
    if any(x in t for x in ("phoneme", "grapheme", "syllable", "rhyme", "sound", "letter")) and year <= 3:
        return "phonics"
    if any(x in t for x in ("spell", "morpheme", "prefix", "suffix", "word origin", "vocabulary", "academic vocabulary")):
        return "words"
    if any(x in t for x in ("image", "visual", "multimodal", "camera", "salience", "layout")):
        return "multimodal"
    if any(x in t for x in ("sentence", "syntax", "clause", "punctuation", "paragraph", "cohesion", "text structure")):
        return "structure"
    if any(x in t for x in ("listen", "spoken", "speaking", "oral", "presentation", "interaction")):
        return "oral"
    if any(x in t for x in ("create", "write", "writing", "edit", "publish", "compose", "plan")):
        return "composition"
    if any(x in t for x in ("literary", "character", "theme", "voice", "aesthetic", "representation", "point of view", "interpret")):
        return "literature"
    if any(x in t for x in ("comprehension", "read", "reading", "inference", "summar", "analyse", "evaluate", "evidence")):
        return "reading"
    if any(x in t for x in ("inclusive", "exclusive", "audience", "purpose", "register", "language features", "modality", "evaluation")):
        return "language"
    return "language"


def example_bank(family: str, year: int) -> list[tuple[str, str]]:
    early = year <= 2
    banks = {
        "phonics": [
            ("Hear the sound", "Say a short familiar word and identify the target sound before looking at the spelling."),
            ("Match sound and letter", "Compare two written words and point to the letter or letter group representing the same sound."),
            ("Initial sound", "Sort words by their first sound, then explain the clue aloud."),
            ("Final sound", "Listen for the ending sound and compare words that do and do not share it."),
            ("Blend", "Combine separately spoken sounds to make a whole word."),
            ("Segment", "Break a spoken word into its component sounds before writing or selecting letters."),
            ("Rhyme", "Compare word endings and decide whether the words rhyme by sound rather than spelling alone."),
            ("One change", "Change one sound in a familiar word and notice how the word meaning changes."),
            ("Read in context", "Use the sentence meaning as a check after decoding the word."),
            ("Transfer", "Apply the same sound-letter knowledge to a new short word rather than repeating the model word."),
        ],
        "words": [
            ("Meaningful parts", "Break a word into a base and affixes, then use those parts to predict meaning."),
            ("Word family", "Compare related words and notice which spelling pattern remains stable."),
            ("Context", "Test a possible word meaning against the sentence rather than relying on a dictionary synonym alone."),
            ("Register", "Choose between an everyday and a more formal word according to audience and purpose."),
            ("Precision", "Replace a vague word with a noun or verb that names the exact idea or action."),
            ("Connotation", "Compare two near-synonyms and explain the different attitude or association each carries."),
            ("Technical vocabulary", "Define a subject-specific term briefly before using it in an explanation for a new audience."),
            ("Spelling from morphology", "Use a known base or word family to check a complex spelling."),
            ("Proofread", "Search specifically for a recurring word-pattern error rather than rereading only for meaning."),
            ("Transfer", "Use the new word accurately in a fresh sentence where its meaning and register both fit."),
        ],
        "multimodal": [
            ("Framing", "Compare a close-up with a wide shot and explain what each makes most noticeable."),
            ("Salience", "Identify which element attracts attention first through size, position, contrast or focus."),
            ("Angle", "Explain how a high, eye-level or low viewpoint changes the relationship between viewer and subject."),
            ("Colour", "Connect a deliberate colour choice to mood, grouping or emphasis rather than naming the colour alone."),
            ("Layout", "Trace the intended reading path through headings, image placement and spacing."),
            ("Caption", "Compare an image with two different captions and explain how wording changes interpretation."),
            ("Sound and image", "In a moving text, explain how music or sound reinforces or complicates what the image shows."),
            ("Sequence", "Reorder two images or panels and notice how the implied story or argument changes."),
            ("Representation", "Ask whose viewpoint is foregrounded and what information remains outside the frame."),
            ("Evaluate", "Judge whether the visual choice supports the intended audience and purpose, using precise evidence."),
        ],
        "structure": [
            ("Sentence focus", "Compare two sentence structures and identify which idea receives the strongest emphasis."),
            ("Clause relationship", "Join ideas using a clause structure that makes cause, contrast or condition explicit."),
            ("Sentence length", "Use a short sentence after a longer one when a deliberate point needs emphasis."),
            ("Punctuation", "Compare two punctuation choices and explain how rhythm or grouping changes."),
            ("Paragraph focus", "Check that every sentence in a paragraph develops the same controlling idea."),
            ("Cohesion", "Use reference, repetition of key terms and logical transitions to connect ideas clearly."),
            ("Text structure", "Choose chronological, problem-solution, comparison or another structure because it suits the purpose."),
            ("Headings", "Use headings to predict and organise content, not merely decorate the page."),
            ("Revision", "Move one sentence and evaluate whether the logic becomes clearer or weaker."),
            ("Transfer", "Apply the same structural decision to a new topic rather than copying the sample wording."),
        ],
        "oral": [
            ("Purpose", "Identify whether a speaker is informing, explaining, persuading, entertaining or negotiating."),
            ("Listening evidence", "Record the exact words or spoken feature that supports an interpretation."),
            ("Turn-taking", "Notice how questions, interruptions or pauses affect participation and power."),
            ("Pace", "Slow down for a difficult explanation and pause after an important idea."),
            ("Stress and intonation", "Use vocal emphasis to highlight a contrast rather than speaking every word with equal weight."),
            ("Audience", "Choose vocabulary and examples the intended listeners can understand."),
            ("Structure", "Signpost the beginning, major points and conclusion so listeners can follow without rereading."),
            ("Visual support", "Use one useful visual to clarify a relationship rather than displaying a script."),
            ("Response", "Answer a question by addressing the point first, then adding relevant evidence."),
            ("Reflection", "After rehearsal, revise the content or delivery choice that most affected clarity."),
        ],
        "composition": [
            ("Purpose and audience", "State who the text is for and what it should achieve before drafting."),
            ("Plan", "Map the main ideas and evidence so each section has a clear job."),
            ("Opening", "Begin with information or a scene that establishes purpose without unnecessary background."),
            ("Evidence", "Integrate an example or source and explain why it matters."),
            ("Paragraphing", "Give each paragraph a clear focus and develop rather than repeat the previous point."),
            ("Language choice", "Select vocabulary, tone and sentence structure deliberately for the intended audience."),
            ("Cohesion", "Use reference and logical links so ideas build across the whole text."),
            ("Multimodality", "Add an image, chart or other mode only when it communicates something useful."),
            ("Editing", "Revise meaning, structure and precision before correcting surface errors."),
            ("Publish", "Check layout, accessibility, attribution and conventions for the chosen medium."),
        ],
        "literature": [
            ("Characterisation", "Use action, dialogue and description as evidence for a character interpretation."),
            ("Viewpoint", "Ask whose perspective filters the event and what that perspective cannot know."),
            ("Setting", "Explain how selected setting details contribute to mood, values or conflict."),
            ("Imagery", "Connect a recurring image to a developing idea rather than assigning a fixed symbolic meaning immediately."),
            ("Voice", "Identify patterns of diction and syntax that make the narrator or speaker distinctive."),
            ("Structure", "Notice how sequencing, contrast, withholding or repetition shapes interpretation."),
            ("Theme", "State a theme as an idea the text explores, then support it with a pattern of evidence."),
            ("Representation", "Analyse how people, groups or places are constructed through selection and framing."),
            ("Alternative reading", "Consider another plausible interpretation and test which reading accounts for more evidence."),
            ("Evaluate", "Judge the effectiveness of a literary choice in this text rather than claiming one device always has one effect."),
        ],
        "reading": [
            ("Purpose", "Set a reason for reading so attention is directed to the most relevant information."),
            ("Predict", "Use title and opening information to predict direction, then revise the prediction when evidence changes."),
            ("Question", "Ask what evidence would be needed before accepting an important claim."),
            ("Infer", "Combine textual clues with relevant knowledge and keep the inference separate from certainty."),
            ("Monitor", "Notice when understanding breaks down and reread, slow down or clarify a key term."),
            ("Summarise", "State the main idea and essential support without copying whole sentences."),
            ("Connect", "Link a later example back to an earlier idea to build whole-text understanding."),
            ("Compare", "Track where two sources agree, differ and use different evidence."),
            ("Evaluate", "Separate claim, evidence and assumption before judging reliability or reasoning."),
            ("Synthesize", "Combine information across the text or sources into one justified conclusion."),
        ],
        "language": [
            ("Audience", "Compare two versions of the same message for different audiences and explain what language changes."),
            ("Purpose", "Identify how vocabulary, sentence structure or modality supports the text's purpose."),
            ("Pronouns", "Explain how 'we', 'you' or 'they' can create solidarity, distance or pressure depending on context."),
            ("Evaluation", "Find the word or phrase that carries judgement rather than treating the sentence as neutral."),
            ("Modality", "Compare 'may', 'should' and 'must' to evaluate differences in certainty or obligation."),
            ("Register", "Choose a level of formality that suits relationship, situation and medium."),
            ("Rhetorical choice", "Explain what a rhetorical question or repetition positions the audience to consider."),
            ("Evidence", "Quote the exact language choice before describing its effect."),
            ("Context", "Check how speaker, audience, setting and power relationship alter the effect of the same wording."),
            ("Evaluate", "Judge whether the language is effective for this audience and purpose, not whether it uses many techniques."),
        ],
    }
    bank = banks[family]
    if early:
        # Keep the same concepts but simplify the explanation language for early years.
        return [(title, re.sub(r"\b(evaluate|interpretation|audience|purpose)\b", lambda m: {"evaluate":"check", "interpretation":"meaning", "audience":"listener or reader", "purpose":"job"}[m.group(0)], text, flags=re.I)) for title, text in bank]
    return bank


def mistakes_for(family: str, year: int) -> list[str]:
    if year <= 2:
        return ["Guessing without pointing to or saying the clue", "Repeating one memorised example", "Naming a feature without showing it", "Moving to writing before the oral idea is secure"]
    common = {
        "phonics": ["Relying on letter names instead of sounds", "Assuming the same spelling always has one sound", "Guessing from the picture without decoding", "Practising one model word only"],
        "words": ["Choosing a synonym without checking context", "Relying only on sound for spelling", "Ignoring word families and morphology", "Using technical vocabulary without precision"],
        "multimodal": ["Feature spotting without explaining effect", "Treating images as neutral", "Analysing modes separately when they interact", "Ignoring audience and context"],
        "structure": ["Naming a structure without explaining why it suits the purpose", "Using connectives mechanically", "Changing sentence length only for variety", "Editing punctuation without checking meaning"],
        "oral": ["Equating confidence with strong evidence", "Reading slides aloud", "Ignoring turn-taking or vocal choices", "Rehearsing words but not timing and structure"],
        "composition": ["Drafting before purpose and audience are clear", "Using evidence without explanation", "Editing only spelling and punctuation", "Adding visuals that do not communicate anything new"],
        "literature": ["Retelling plot instead of analysing", "Naming a device without evidence and effect", "Treating one interpretation as automatic", "Assuming a protagonist or narrator always represents the author's values"],
        "reading": ["Using one strategy mechanically", "Treating inference as guessing", "Summarising by copying", "Accepting a claim without checking evidence"],
        "language": ["Feature spotting without explaining effect", "Assuming intention and effect are identical", "Ignoring audience and context", "Making vague claims without exact wording as evidence"],
    }
    return common[family]


def practice_from_examples(examples: list[tuple[str, str]], year: int) -> list[tuple[str, str]]:
    out = []
    for i, (title, body) in enumerate(examples, 1):
        if year <= 2:
            q = f"Show or say one new example of {title.lower()}. What clue tells you it fits?"
            a = f"A correct response gives a new example of {title.lower()} and points to, says or demonstrates the observable language/text clue."
        elif i % 2:
            q = f"Apply {title.lower()} to a new text, sentence or speaking situation. What exact evidence would you use?"
            a = f"The response identifies a precise example of {title.lower()}, uses exact evidence and explains the meaning, effect, purpose or communication choice in context."
        else:
            q = f"A student names {title.lower()} but gives no explanation. What should they add to make the response complete?"
            a = f"They should add the relevant evidence or example and explain why the {title.lower()} choice matters for meaning, audience, purpose, structure or response."
        out.append((q, a))
    return out[:10]


def sequence_for(family: str, year: int) -> list[tuple[str, str]]:
    if year <= 2:
        return [
            ("1. Explicit teaching and modelling", "Name the target in simple language and model one short oral, visual or written example."),
            ("2. Guided analysis", "Compare two short examples and have students point to or say the clue."),
            ("3. Collaborative / independent practice", "Make one example together, then try a fresh familiar example independently."),
            ("4. Formative assessment", "Use a new one-minute example and require an observable clue rather than a guess."),
        ]
    return [
        ("1. Explicit teaching and modelling", "Define the outcome-specific metalanguage and model the full thinking or crafting process using precise evidence."),
        ("2. Guided analysis", "Analyse a second example together: identify the choice, locate evidence and explain why it matters here."),
        ("3. Collaborative / independent practice", "Students annotate, compare, edit or create a fresh example and justify their choices."),
        ("4. Formative assessment", "Use an unseen micro-text or creation task that requires independent evidence plus explanation."),
    ]


def mappings(year: int, code: str, desc: str) -> list[tuple[str, str, str]]:
    stage = "Early Stage 1" if year == 0 else "Stage 1" if year <= 2 else "Stage 2" if year <= 4 else "Stage 3" if year <= 6 else "Stage 4" if year <= 8 else "Stage 5"
    vic = "Foundation" if year == 0 else f"Year {year}"
    us = "Kindergarten" if year == 0 else (f"Grade {year}" if year <= 8 else "Grades 9–10")
    ks = "Early Years / Key Stage 1" if year == 0 else "Key Stage 1" if year <= 2 else "Key Stage 2" if year <= 6 else "Key Stage 3" if year <= 9 else "Key Stage 4 / GCSE"
    nz = 1 if year <= 2 else 2 if year <= 4 else 3 if year <= 6 else 4 if year <= 8 else 5
    india = "Foundational / early primary" if year == 0 else f"Class {year}"
    return [
        ("Australia", "Australian Curriculum v9.0", f"{code} — {desc}"),
        ("Victoria", "Victorian Curriculum F–10 English", f"{vic} English — closest Language, Literature or Literacy alignment; verify the local outcome for formal assessment."),
        ("NSW", "NSW English syllabus", f"{stage} English — closest outcome alignment; use as a planning comparison, not an exact equivalence."),
        ("United States", "Common Core ELA/Literacy", f"{us} — closest RL/RI, RF where applicable, W, SL or L alignment according to the outcome focus."),
        ("England / UK", "English / GCSE English", f"{ks} — closest reading, writing, spoken-language, grammar or literary-analysis alignment."),
        ("Canada", "English Language Arts", f"{'Kindergarten' if year == 0 else 'Grade '+str(year)} ELA — broad Ontario/BC-style closest alignment; curricula vary by province."),
        ("New Zealand", "New Zealand Curriculum English", f"NZC English Level {nz} — closest oral, written and visual language alignment."),
        ("India", "NCERT / CBSE English", f"{india} English — closest language, reading, writing or literature alignment."),
    ]


def render_mapping(rows: list[tuple[str, str, str]]) -> str:
    return "".join(f"<tr><td>{esc(a)}</td><td>{esc(b)}</td><td>{esc(c)}</td></tr>" for a, b, c in rows)


def needs_upgrade(source: str) -> bool:
    lower = source.lower()
    return any(marker.lower() in lower for marker in GENERIC_MARKERS)


def upgrade(path: Path) -> bool:
    source = path.read_text(encoding="utf-8", errors="replace")
    if not needs_upgrade(source):
        return False
    code = code_of(source, path)
    year = year_of(path)
    desc = description_of(source)
    els = elaborations_of(source)
    family = family_for(" ".join([desc, *els]), year)
    examples = example_bank(family, year)
    mistakes = mistakes_for(family, year)
    practice = practice_from_examples(examples, year)
    sequence = sequence_for(family, year)
    label = "Foundation" if year == 0 else f"Year {year}"
    canonical = "https://skillrhub.com/" + path.parent.relative_to(ROOT).as_posix().strip("/") + "/"
    quiz_year = "foundation" if year == 0 else f"year-{year}"
    base = f"/quiz/{quiz_year}/english/{code.lower()}"
    teacher = href_for(source, "teacher", f"/worksheets/{'foundation' if year == 0 else 'year'+str(year)}/english/teacher-slides/live.html?code={code}")
    worksheet = href_for(source, "worksheet", base + "/worksheet/")
    practice_href = href_for(source, "practice", base + "/practice/")
    test = href_for(source, "test", base + "/test/")

    examples_html = "".join(f'<article class="curriculum-worked-example"><h3>{i}. {esc(title)}</h3><p>{esc(body)}</p></article>' for i, (title, body) in enumerate(examples, 1))
    mistakes_html = "".join(f"<li>{esc(x)}</li>" for x in mistakes)
    seq_html = "".join(f'<article><h3>{esc(a)}</h3><p>{esc(b)}</p></article>' for a, b in sequence)
    q_html = "".join(f"<li>{esc(q)}</li>" for q, _ in practice)
    a_html = "".join(f"<li><strong>{i}.</strong> {esc(a)}</li>" for i, (_, a) in enumerate(practice, 1))
    coverage = "".join(f'<article class="curriculum-worked-example"><h3>E{i}</h3><p><strong>Australian Curriculum elaboration:</strong> {esc(e)}</p><p><strong>Teaching use:</strong> Use a short original example to make this elaboration visible, then require the learner to identify the relevant clue and explain or demonstrate the outcome skill.</p></article>' for i, e in enumerate(els, 1)) or "<p>Teach the exact content description as the required target; no separate elaboration text is stored for this page.</p>"

    replacement = f'''<section class="curriculum-topic-section" id="topic-guide"><h2>1. Core concepts</h2><p><strong>{code}:</strong> {esc(desc)}</p><p>This {label} English lesson teaches the outcome through direct examples, evidence and transfer rather than curriculum wording alone.</p></section>
<section class="curriculum-topic-section"><h2>2. Ten worked examples</h2>{examples_html}</section>
<section class="curriculum-topic-section"><h2>3. Common student misconceptions</h2><ul>{mistakes_html}</ul></section>
<section class="curriculum-topic-section"><h2>4. Four-step instructional sequence</h2><div class="unit-activity-grid">{seq_html}</div></section>
<section class="curriculum-topic-section"><h2>5. Ten-question practice set</h2><ol>{q_html}</ol><h3>Solutions / indicative responses</h3><ol>{a_html}</ol></section>
<section class="curriculum-topic-section"><h2>Australian Curriculum v9.0 coverage and elaborations</h2><p><strong>Content description:</strong> {esc(desc)}</p>{coverage}</section>
<section class="curriculum-topic-section"><h2>Accurate international curriculum mapping</h2><p>These are closest English/ELA alignments for planning, not exact one-to-one equivalents.</p><div class="curriculum-table-wrap"><table class="curriculum-map-table"><thead><tr><th>Region</th><th>English / ELA curriculum</th><th>Closest alignment</th></tr></thead><tbody>{render_mapping(mappings(year,code,desc))}</tbody></table></div></section>
<section class="curriculum-topic-section teacher-resource"><h2>Resources</h2><div class="curriculum-link-row"><a class="curriculum-button primary" href="{esc(teacher)}" target="_blank" rel="noopener">Teacher Slides</a><a class="curriculum-button" href="{esc(worksheet)}">Worksheet</a><a class="curriculum-button" href="{esc(practice_href)}">Practice</a><a class="curriculum-button" href="{esc(test)}">Test</a></div></section>'''

    start = source.find('<section class="curriculum-topic-section" id="topic-guide">')
    end_match = re.search(r'<section class="curriculum-topic-section">\s*<h2>Related ', source[start:], re.I | re.S) if start >= 0 else None
    if start < 0 or not end_match:
        raise ValueError(f"Could not locate replacement anchors in {path.relative_to(ROOT)}")
    end = start + end_match.start()
    output = source[:start] + replacement + "\n\n      " + source[end:]
    meta = f"{code} {label} English lesson: {desc.rstrip('.')}. Includes 10 worked examples, misconceptions, a four-step teaching sequence, practice questions, solutions and English/ELA curriculum alignment."
    output = re.sub(r'<meta name="description" content="[^"]*">', f'<meta name="description" content="{esc(meta)}">', output, count=1, flags=re.I)
    output = re.sub(r'<meta property="og:description" content="[^"]*">', f'<meta property="og:description" content="{esc(meta)}">', output, count=1, flags=re.I)
    # Ensure the canonical is retained exactly.
    output = re.sub(r'<link rel="canonical" href="[^"]*">', f'<link rel="canonical" href="{canonical}">', output, count=1, flags=re.I)
    path.write_text(output, encoding="utf-8")
    return True


def main() -> None:
    pages = []
    for root in ROOTS:
        folder = root / "english"
        if folder.is_dir():
            pages.extend(p for p in folder.glob("ac9e*/index.html") if p.is_file())
    changed = []
    for path in sorted(pages):
        if upgrade(path):
            changed.append(path.relative_to(ROOT).as_posix())
    print(f"Selective English upgrade changed {len(changed)} of {len(pages)} canonical English pages.")
    for item in changed:
        print(item)


if __name__ == "__main__":
    main()
