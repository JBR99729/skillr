#!/usr/bin/env python3
"""Finish the remaining Year 10 English and Science Inquiry topic pages.

The approved Year 10 English Language pages already live on this branch and are
left untouched. This script re-authors only English Literature/Literacy and
Science Inquiry pages that still contain the legacy generic topic-guide copy.
Canonical URLs and resource routes are preserved.
"""
from __future__ import annotations

import html
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def clean(value: str) -> str:
    value = html.unescape(str(value or ""))
    value = re.sub(r"<[^>]+>", " ", value)
    return re.sub(r"\s+", " ", value).strip()


def esc(value: str) -> str:
    return html.escape(str(value), quote=True)


def extract(source: str, pattern: str, default: str = "") -> str:
    match = re.search(pattern, source, re.I | re.S)
    return clean(match.group(1)) if match else default


def content_description(source: str) -> str:
    return extract(source, r"<strong>Content description:</strong>\s*(.*?)</li>") or extract(
        source, r"<p class=\"curriculum-hero__lead\">(.*?)</p>"
    )


def elaborations(source: str) -> list[str]:
    return [clean(x) for x in re.findall(r"<strong>E\d+:</strong>\s*(.*?)</li>", source, re.I | re.S)]


def canonical_for(path: Path) -> str:
    return "https://skillrhub.com/" + path.parent.relative_to(ROOT).as_posix().strip("/") + "/"


def curriculum_elaborations(items: list[str], mode: str) -> str:
    if not items:
        return "<p>No separate elaboration text is stored for this code; teach the exact content description as the required target.</p>"
    rows = []
    for i, item in enumerate(items, 1):
        if mode == "english":
            guidance = "Use a short original text or comparison to make this curriculum example visible, then require evidence and an explanation of effect."
        else:
            guidance = "Use this as a curriculum breadth example: identify the evidence or method involved, explain why it matters, and keep the conclusion within the limits of the data."
        if "First Nations" in item or "Country/Place" in item:
            guidance += " Where First Nations knowledge, heritage or Country/Place is involved, follow the relevant authority, permissions and cultural protocols rather than inventing a classroom substitute."
        rows.append(
            f'<article class="curriculum-worked-example"><h3>E{i}</h3><p><strong>Australian Curriculum elaboration:</strong> {esc(item)}</p><p><strong>Teaching use:</strong> {esc(guidance)}</p></article>'
        )
    return "".join(rows)


ENGLISH = {
    "AC9E10LE01": {
        "title": "Representations of People, Groups and Places",
        "lead": "Representations are constructed through selection: what a text names, foregrounds, omits, frames and allows an audience to see.",
        "toolkit": ["Identify the representation", "Locate precise evidence", "Explain the values or assumptions carried by the choice", "Compare an alternative representation"],
        "examples": [
            ("Naming", "Calling a group 'protesters' rather than 'community advocates' frames the same people through different values."),
            ("Setting", "Describing a suburb only through abandoned buildings can construct decline while excluding ordinary community life."),
            ("Focalisation", "A scene viewed through one character's fear can make another group appear threatening even when the narrator has incomplete knowledge."),
            ("Selection", "A profile that quotes only officials can marginalise the people directly affected by the issue."),
            ("Image framing", "A tightly cropped photograph can remove the surrounding context that would change how an event is interpreted."),
            ("Stereotype", "Repeatedly linking one social group with a single trait reduces complex individuals to a simplified representation."),
            ("Counter-representation", "A later text can challenge an earlier stereotype by giving the represented group voice, history and agency."),
            ("Place imagery", "A landscape described as 'empty' can erase existing cultural connections and human presence."),
            ("Agency", "Compare 'residents organised the campaign' with 'a campaign happened'; the first gives people agency."),
            ("Comparison", "Two texts about the same event may differ because audience, purpose, medium and context shape what each foregrounds."),
        ],
        "mistakes": ["Treating a representation as a neutral mirror of reality", "Retelling what is represented without analysing how it is constructed", "Assuming omission is always accidental", "Making a claim about bias without precise evidence"],
    },
    "AC9E10LE02": {
        "title": "Extend and Evaluate Interpretations of Texts",
        "lead": "Strong interpretation is evidence-based and responsive: students test their own reading against other plausible readings and refine it when the text supports a better explanation.",
        "toolkit": ["State an interpretation", "Select the strongest evidence", "Consider an alternative reading", "Refine or defend the interpretation"],
        "examples": [
            ("Ambiguous motive", "A character's silence might signal fear, resistance or uncertainty; the surrounding actions decide which reading is strongest."),
            ("Alternative reading", "A symbol of water may suggest renewal in one scene but danger in another; interpretation depends on pattern and context."),
            ("Evidence weighting", "One unusual word matters less than a repeated motif supported across the text."),
            ("Context", "Historical context can extend a reading, but it should not replace evidence from the text itself."),
            ("Counter-evidence", "A strong interpretation acknowledges details that complicate the claim rather than ignoring them."),
            ("Reader position", "Different readers may notice different values, but plausible interpretations still need textual support."),
            ("Development", "An interpretation can change after a later scene reveals that an earlier narrator was unreliable."),
            ("Comparison", "Two critics may agree on the evidence but disagree about its significance; evaluate which explanation accounts for more of the text."),
            ("Qualification", "Use language such as 'suggests', 'primarily' or 'at this point' when the evidence supports a qualified rather than absolute claim."),
            ("Synthesis", "A mature response can combine two compatible readings when both explain different layers of the text."),
        ],
        "mistakes": ["Treating every interpretation as equally valid", "Changing an interpretation without explaining why", "Using context as a substitute for textual evidence", "Rejecting counter-evidence instead of accounting for it"],
    },
    "AC9E10LE03": {
        "title": "Aesthetic Effects of Text Structure and Language",
        "lead": "Aesthetic quality comes from patterned choices in structure, rhythm, imagery, sound, syntax and pacing, and from how those choices work together.",
        "toolkit": ["Identify the patterned choice", "Describe the sensory or emotional effect", "Connect the effect to meaning", "Evaluate why the choice is effective here"],
        "examples": [
            ("Repetition", "Repeating a phrase at the start of several sentences can create rhythm and intensify an idea."),
            ("Fragmentation", "A sequence of short fragments can imitate shock, uncertainty or rapid perception."),
            ("Cumulative syntax", "A long sentence that adds detail clause by clause can create abundance, pressure or momentum."),
            ("Imagery", "Concrete sensory imagery can make an abstract emotion physically vivid."),
            ("Sound pattern", "Alliteration or internal rhyme can make a line memorable while also shaping tone."),
            ("White space", "A sudden isolated line on a page can slow the reader and give the moment visual emphasis."),
            ("Pacing", "Withholding key information can create suspense; revealing it abruptly can produce shock."),
            ("Contrast", "Placing calm description beside violent action can make the violence more disturbing."),
            ("Motif", "A recurring image can accumulate meaning each time it reappears."),
            ("Closure", "A circular ending can create a sense of completion or, if the problem remains, a sense of entrapment."),
        ],
        "mistakes": ["Calling a feature 'beautiful' without analysing how it works", "Listing techniques instead of explaining their combined effect", "Assuming one device always creates the same effect", "Ignoring structure when analysing language"],
    },
    "AC9E10LE04": {
        "title": "Social, Moral and Ethical Positions in Literature",
        "lead": "Texts position audiences toward social, moral and ethical questions through viewpoint, consequences, characterisation, framing and competing values.",
        "toolkit": ["Identify the position or value conflict", "Trace how the text constructs it", "Examine whose perspective is privileged", "Evaluate complexity, tension and consequence"],
        "examples": [
            ("Competing duties", "A character choosing between loyalty to a friend and honesty to a community creates a genuine ethical tension rather than a simple right/wrong choice."),
            ("Consequences", "A text may criticise an action by showing its long-term effects even if no narrator explicitly condemns it."),
            ("Narrative sympathy", "Giving one character detailed interior thought can invite sympathy without proving that character is morally correct."),
            ("Omission", "If a conflict is shown only from the powerful group's perspective, the ethical framing is narrowed."),
            ("Irony", "A narrator's praise can be ironic, prompting readers to question the values being voiced."),
            ("Symbolic choice", "A repeated locked door can represent exclusion while the plot tests who controls access."),
            ("Ambiguity", "An unresolved ending can leave readers weighing competing moral responsibilities."),
            ("Context", "A text can reflect values from its historical context while still inviting modern readers to question them."),
            ("Countervoice", "A marginalised character's testimony can challenge the dominant moral account inside the text."),
            ("Evaluation", "A sophisticated judgement explains how effectively the text makes the ethical issue complex, not merely whether the student agrees with it."),
        ],
        "mistakes": ["Replacing analysis with personal moral opinion", "Assuming a protagonist always represents the author's values", "Treating complex ethical conflicts as simple binaries", "Ignoring who is denied voice or agency"],
    },
    "AC9E10LE05": {
        "title": "How Literary Choices Shape Interpretation",
        "lead": "Interpretation develops from the interaction of text structure, language features and literary devices, not from isolated technique spotting.",
        "toolkit": ["Name the structural or language choice", "Select evidence", "Explain how it shapes interpretation", "Connect multiple choices into a pattern"],
        "examples": [
            ("Non-linear structure", "Moving between present action and fragmented memories can make readers reconstruct cause and consequence."),
            ("Foreshadowing", "A minor warning early in a text changes how later danger is interpreted."),
            ("Symbolism", "A recurring cracked mirror can suggest a divided identity when the pattern is supported by character development."),
            ("Metaphor", "Describing a city as a machine can foreground control, repetition and dehumanisation."),
            ("Unreliable narration", "Contradictions between a narrator's claims and observed events invite readers to question the narrator's interpretation."),
            ("Juxtaposition", "Placing celebration beside private grief can produce an interpretation about public appearance and hidden experience."),
            ("Dialogue", "Repeated evasive answers can reveal a power imbalance without directly naming it."),
            ("Patterned diction", "A shift from formal to fractured language can mark psychological or relational change."),
            ("Motif", "A repeated sound or object can link separate scenes into one thematic pattern."),
            ("Ending", "An open ending can make readers continue evaluating unresolved motives or consequences."),
        ],
        "mistakes": ["Technique spotting without interpretation", "Giving a symbolic meaning with no pattern of evidence", "Ignoring how structural and language choices interact", "Assuming author intention can be known without textual support"],
    },
    "AC9E10LE06": {
        "title": "Voice as a Literary Device",
        "lead": "Voice is the distinctive presence created through diction, syntax, rhythm, attitude, perspective and patterns of judgement across a text.",
        "toolkit": ["Describe the voice precisely", "Identify the language patterns creating it", "Explain how voice positions the reader", "Evaluate changes or tensions in voice"],
        "examples": [
            ("Conversational voice", "Contractions, direct address and informal idiom can create intimacy with the reader."),
            ("Detached voice", "Abstract nouns and impersonal syntax can create distance or institutional authority."),
            ("Unreliable voice", "Confident claims that conflict with events can make the voice seem self-deceiving or manipulative."),
            ("Collective voice", "Repeated 'we' can construct a community identity, though it may also erase differences within the group."),
            ("Ironic voice", "A surface statement of praise can communicate criticism when context makes the praise impossible to take literally."),
            ("Rhythmic voice", "Parallel sentence structures can make a voice sound controlled, ceremonial or persuasive."),
            ("Shifting voice", "A move from witty detachment to fragmented syntax can reveal loss of control."),
            ("Lexical pattern", "Repeated technical vocabulary can establish expertise while restricting emotional access."),
            ("Focalised voice", "A close first-person voice filters the world through one character's knowledge and assumptions."),
            ("Sustained voice", "In student writing, consistent diction, sentence pattern and attitude keep a narrator recognisable across scenes."),
        ],
        "mistakes": ["Using 'voice' as a synonym for first person", "Describing tone with one adjective and no evidence", "Ignoring how syntax contributes to voice", "Missing deliberate shifts in voice"],
    },
    "AC9E10LE07": {
        "title": "Evaluate the Aesthetic Qualities of Texts",
        "lead": "Aesthetic evaluation explains how form and language create a distinctive reading experience and judges the effectiveness of those choices with evidence.",
        "toolkit": ["Identify the aesthetic pattern", "Explain the experience it creates", "Connect form to meaning", "Make an evidence-based evaluation"],
        "examples": [
            ("Economy", "A spare description can make a scene feel restrained and force readers to infer emotion."),
            ("Lush imagery", "Dense sensory detail can create immersion but may also deliberately overwhelm."),
            ("Rhythm", "Alternating long and short sentences can shape pace and emotional pressure."),
            ("Pattern", "Repeated images of light may evolve from safety to exposure across the text."),
            ("Sound", "Harsh consonants can support an abrasive mood when combined with violent imagery."),
            ("Visual form", "Line breaks and white space can become part of meaning in poetry or multimodal texts."),
            ("Ambiguity", "A deliberately unresolved image can sustain multiple interpretations after the ending."),
            ("Contrast", "Beauty beside damage can produce an unsettling aesthetic tension."),
            ("Cohesion", "A recurring motif can make distant scenes feel structurally connected."),
            ("Evaluation", "An effective aesthetic judgement explains why the pattern suits this text's purpose and meaning rather than claiming universal beauty."),
        ],
        "mistakes": ["Equating aesthetic quality with personal liking", "Using praise words without evidence", "Ignoring form and structure", "Assuming complex language is automatically more effective"],
    },
    "AC9E10LE08": {
        "title": "Create and Edit Literary Texts with Sustained Voice",
        "lead": "Effective literary composition sustains a deliberate voice while controlling structure, imagery, syntax, dialogue and detail for a chosen effect.",
        "toolkit": ["Choose a purposeful voice", "Select consistent language patterns", "Shape structure and pacing", "Edit for precision and coherence"],
        "examples": [
            ("Voice plan", "A guarded narrator might use clipped syntax, limited disclosure and precise observation."),
            ("Opening", "Begin with a detail that establishes the narrator's attitude rather than explaining the whole backstory."),
            ("Diction", "Choose recurring vocabulary that suits the narrator's age, context and worldview."),
            ("Syntax", "Vary sentence length deliberately to control pace and emphasis."),
            ("Dialogue", "Give speakers distinctive patterns without relying on stereotypes or excessive phonetic spelling."),
            ("Imagery", "Use a recurring image only when each recurrence develops meaning rather than decorating the prose."),
            ("Scene selection", "Include scenes that change the conflict, relationship or reader understanding; cut scenes that merely repeat information."),
            ("Cohesion", "Echo a meaningful detail from the opening in the ending to create structural connection."),
            ("Editing", "Replace vague verbs and redundant modifiers with precise choices that fit the sustained voice."),
            ("Revision", "Read a paragraph aloud: if a sentence sounds like a different narrator, revise diction or syntax to restore consistency."),
        ],
        "mistakes": ["Confusing sustained voice with never varying sentence length", "Adding figurative language that does not fit the narrator", "Editing only spelling and punctuation", "Explaining character emotion instead of showing it through selected detail"],
    },
    "AC9E10LY01": {
        "title": "Analyse Representations Across Texts",
        "lead": "Literacy analysis compares how people, places, events and concepts are represented for different audiences, purposes and contexts.",
        "toolkit": ["Identify what is represented", "Compare selection and framing", "Explain audience and purpose", "Evaluate the effect of differences"],
        "examples": [
            ("News headline", "'City paralysed by protest' and 'Thousands rally for reform' construct the same event differently."),
            ("Profile", "A biography may foreground achievement; a critical feature may foreground controversy."),
            ("Data visual", "A graph beginning at 90 rather than 0 can visually exaggerate a small difference."),
            ("Photograph", "Camera distance and cropping influence which people or consequences become salient."),
            ("Documentary", "Music, editing and interview selection can guide interpretation while still using factual material."),
            ("Social post", "A short post may simplify a complex issue because platform, audience and purpose reward immediacy."),
            ("Institutional text", "A policy may use impersonal language to construct an issue as administrative rather than personal."),
            ("Advertisement", "A product can be represented through lifestyle imagery rather than through evidence about performance."),
            ("Historical account", "Accounts written at different times may foreground different causes or groups."),
            ("Evaluation", "A comparison should explain which representation is more useful for a particular purpose, not simply which one is 'better'."),
        ],
        "mistakes": ["Summarising two texts separately instead of comparing", "Calling a representation biased without evidence", "Ignoring medium and audience", "Assuming factual texts do not construct representations"],
    },
    "AC9E10LY02": {
        "title": "Listen Critically to Spoken Texts",
        "lead": "Critical listening tracks purpose, evidence, emphasis, vocal delivery, interaction and audience positioning rather than recording words alone.",
        "toolkit": ["Identify purpose and audience", "Track claims and evidence", "Notice vocal and interaction choices", "Evaluate the effect"],
        "examples": [
            ("Pace", "A speaker slowing before a key claim can signal importance and invite attention."),
            ("Stress", "Emphasising one word can change the implied contrast in a sentence."),
            ("Pause", "A deliberate pause can create suspense or give an audience time to process evidence."),
            ("Tone", "A calm tone can build credibility, but it does not make weak evidence stronger."),
            ("Repetition", "Repeating a slogan can make a claim memorable without adding evidence."),
            ("Interaction", "Interruptions and turn-taking reveal relationships and control in interviews or discussions."),
            ("Evidence cue", "Listen for where the speaker shifts from claim to example, statistic or source."),
            ("Hedging", "Words such as 'likely' and 'may' can show appropriate uncertainty rather than weakness."),
            ("Multimodal support", "Slides or visuals can clarify a spoken explanation but can also distract or oversimplify."),
            ("Evaluation", "Judge how spoken choices support purpose while separately judging the quality of reasoning and evidence."),
        ],
        "mistakes": ["Equating confident delivery with reliable evidence", "Taking notes without identifying purpose", "Ignoring pauses, stress and interaction", "Evaluating accent rather than communicative choices"],
    },
    "AC9E10LY03": {
        "title": "Evaluate Language Features in Texts",
        "lead": "Language features shape response through patterns of evaluation, modality, evidence, imagery, syntax, register and rhetorical choice.",
        "toolkit": ["Identify the feature", "Quote or describe precise evidence", "Explain the likely response", "Evaluate effectiveness in context"],
        "examples": [
            ("Modality", "'Must' creates stronger obligation than 'could', changing the pressure placed on the audience."),
            ("Evaluation", "'A reckless decision' embeds judgement inside the noun phrase."),
            ("Evidence language", "'According to the published dataset' signals a source, but the source still needs evaluation."),
            ("Rhetorical question", "A question can position the audience toward an assumed answer without proving the claim."),
            ("Metaphor", "Calling a policy a 'lifeline' frames it as rescue and makes alternatives seem risky."),
            ("Nominalisation", "'The displacement of residents' can compress information and distance the sentence from human actors."),
            ("Pronouns", "'We' can create solidarity or manufacture consensus depending on context."),
            ("Syntax", "Front-loading a consequence can make it more salient than the cause."),
            ("Register", "Technical vocabulary can create precision for experts but reduce accessibility for a general audience."),
            ("Evaluation", "Effectiveness depends on audience, purpose and evidence—not on the number of techniques used."),
        ],
        "mistakes": ["Naming techniques without explaining response", "Assuming persuasive language is automatically misleading", "Ignoring context and audience", "Using vague effects such as 'makes the reader interested'"],
    },
    "AC9E10LY04": {
        "title": "How Authors Organise Ideas for Effect",
        "lead": "Organisation controls what audiences encounter first, how evidence accumulates, where contrasts appear and how conclusions are framed.",
        "toolkit": ["Map the sequence of ideas", "Identify structural turning points", "Explain cohesion and emphasis", "Evaluate the organisation for purpose"],
        "examples": [
            ("Problem-solution", "A text can establish a problem, explain causes, compare responses and then recommend action."),
            ("Cause-effect", "Grouping effects after each cause may make relationships clearer than listing all causes first."),
            ("Comparative structure", "Alternating between two options can create direct contrast; block structure can allow deeper treatment of each."),
            ("Priority", "Placing the strongest evidence first can establish authority; saving it for the end can create culmination."),
            ("Counterargument", "Introducing and answering an opposing view can strengthen reasoning when the response is fair and evidence-based."),
            ("Chronology", "Chronological order is useful for process or development but may hide thematic connections."),
            ("Headings", "Descriptive headings help navigation; evaluative headings can also frame interpretation."),
            ("Paragraph order", "Each paragraph should advance the line of reasoning rather than repeat the previous claim."),
            ("Multimodal sequence", "Placing a chart immediately after a claim can let evidence verify the statement at the point of need."),
            ("Conclusion", "A strong conclusion synthesises the reasoning and implications rather than simply repeating the introduction."),
        ],
        "mistakes": ["Describing structure without explaining effect", "Assuming chronological order is always best", "Using headings as decoration", "Repeating ideas instead of developing a line of reasoning"],
    },
    "AC9E10LY05": {
        "title": "Integrate Advanced Comprehension Strategies",
        "lead": "Year 10 comprehension integrates prediction, questioning, monitoring, inference, visualising, summarising and critical evaluation as the text becomes more complex.",
        "toolkit": ["Set a reading purpose", "Monitor understanding", "Infer and verify", "Synthesize across the whole text"],
        "examples": [
            ("Prediction", "Use a heading and opening paragraph to predict direction, then revise the prediction when the text changes course."),
            ("Questioning", "Ask what evidence would be needed to support a claim before accepting it."),
            ("Inference", "Combine a character's action, dialogue and context to infer motive; distinguish inference from certainty."),
            ("Monitoring", "Notice when a pronoun, technical term or reference is unclear and reread the relevant sentence or paragraph."),
            ("Visualising", "Translate a spatial or procedural description into a mental or sketched model to check relationships."),
            ("Summarising", "Compress a paragraph into its main claim and essential support rather than copying sentences."),
            ("Connecting", "Link a later example back to an earlier concept to build a whole-text understanding."),
            ("Comparing", "Track where two sources agree, differ and use different evidence."),
            ("Evaluating", "Distinguish the author's claim, the evidence supplied and the assumptions connecting them."),
            ("Synthesis", "After reading, state the text's overall position and explain how multiple sections work together to establish it."),
        ],
        "mistakes": ["Using one comprehension strategy mechanically", "Treating inference as guesswork", "Summarising by copying", "Finishing reading without checking whether the overall interpretation still fits"],
    },
    "AC9E10LY06": {
        "title": "Plan, Create, Edit and Publish Written and Multimodal Texts",
        "lead": "Effective composition aligns purpose, audience, structure, evidence, language, design and editing decisions from planning through publication.",
        "toolkit": ["Define purpose and audience", "Plan structure and evidence", "Draft with deliberate language and design", "Edit and publish for the chosen medium"],
        "examples": [
            ("Purpose", "A public information page prioritises clarity and action; an analytical essay prioritises a sustained evidence-based argument."),
            ("Audience", "Define what the audience already knows so background information is neither missing nor repetitive."),
            ("Planning", "Map the claim, major reasons, evidence and counterargument before drafting a persuasive text."),
            ("Paragraphing", "Use topic focus, evidence and explanation to make each paragraph advance the purpose."),
            ("Evidence", "Integrate data or quotation with explanation rather than dropping it into the text without interpretation."),
            ("Multimodality", "Use a chart when relationships are easier to understand visually; do not add visuals that repeat the same words."),
            ("Cohesion", "Use reference, lexical links and logical transitions to connect ideas without overusing formulaic connectives."),
            ("Sentence editing", "Vary sentence structure to improve emphasis and clarity, not simply for variety."),
            ("Precision", "Replace vague words and unsupported intensifiers with exact nouns, verbs and qualifiers."),
            ("Publishing", "Check accessibility, layout, attribution, captions and platform conventions before release."),
        ],
        "mistakes": ["Drafting before purpose and audience are clear", "Adding visuals without communicative purpose", "Editing only surface errors", "Using evidence without explaining its relevance"],
    },
    "AC9E10LY07": {
        "title": "Create and Deliver Spoken and Multimodal Presentations",
        "lead": "Strong presentations coordinate spoken language, structure, evidence, delivery and visual design for a specific audience and purpose.",
        "toolkit": ["Plan a clear through-line", "Select evidence and examples", "Rehearse vocal and visual delivery", "Adapt to audience response"],
        "examples": [
            ("Opening", "Begin with a clear question, claim or relevant scenario that establishes purpose without unnecessary throat-clearing."),
            ("Structure", "Signpost major stages so listeners can follow the argument without rereading."),
            ("Evidence", "Explain what a statistic shows instead of reading the number from a slide."),
            ("Slide design", "One meaningful diagram can support understanding better than a dense slide of sentences."),
            ("Pace", "Slow for a complex explanation and pause after an important conclusion."),
            ("Emphasis", "Use stress and intonation to highlight key contrasts rather than speaking every sentence with equal weight."),
            ("Eye line", "Use notes as support while maintaining audience connection; do not read continuously from the screen."),
            ("Rehearsal", "Time the full presentation and revise sections that are rushed rather than simply speaking faster."),
            ("Questions", "Anticipate likely audience questions and prepare evidence-based responses."),
            ("Adaptation", "If the audience appears confused, restate the relationship with a simpler example rather than repeating the same sentence."),
        ],
        "mistakes": ["Treating slides as a script", "Using volume instead of meaningful emphasis", "Overloading the introduction", "Rehearsing words but not timing, visuals or transitions"],
    },
    "AC9E10LY08": {
        "title": "Use the Spelling System for Complex Words",
        "lead": "Advanced spelling draws on morphology, etymology, phonology, word families and proofreading strategies rather than memorising every word in isolation.",
        "toolkit": ["Break the word into meaningful parts", "Use word-family evidence", "Check origin and spelling convention", "Proofread in context"],
        "examples": [
            ("Morpheme", "In 'unpredictable', un- + predict + -able reveals stable meaningful parts even when pronunciation shifts."),
            ("Word family", "'Sign' helps explain the silent g in 'signature' even though the vowel sound changes."),
            ("Suffix", "When adding -ion, a base may change form: 'decide' → 'decision'."),
            ("Greek root", "Knowing 'bio' relates to life helps connect biology, biography and biodegradable."),
            ("Latin root", "The root 'spect' supports inspect, spectator and perspective."),
            ("Double consonant", "Stress and suffix rules help decide forms such as 'preferred' versus 'offered'."),
            ("Homophone", "Use grammar and meaning to choose 'principal' or 'principle', not sound alone."),
            ("Technical term", "Break long scientific or academic words into known roots and affixes before checking a dictionary."),
            ("Proofreading", "Search specifically for a learner's recurring pattern of errors rather than rereading only for meaning."),
            ("Verification", "Use a trusted dictionary to confirm uncertainty, then record the word family or rule that will help next time."),
        ],
        "mistakes": ["Relying only on sound", "Memorising a corrected word without noticing its family", "Applying one suffix rule to every word", "Using spellcheck without checking whether the suggested word fits the sentence"],
    },
}

SCIENCE = {
    "AC9S10I01": {
        "title": "Develop Testable Questions, Predictions and Hypotheses",
        "lead": "A strong inquiry begins with a measurable relationship and an explanatory idea that can generate a reasoned prediction.",
        "concepts": ["observation", "investigable question", "independent and dependent variables", "hypothesis", "mechanism", "prediction", "conditions", "correlation versus causation", "model testing", "revision after evidence"],
        "examples": [
            "Observation: a trolley accelerates differently when the applied force changes. Question: how does net force affect acceleration when mass is held constant?",
            "A hypothesis adds reasoning: increasing net force will increase acceleration because a larger net force produces a larger change in motion for the same mass.",
            "A prediction states an expected pattern under conditions: doubling the force should approximately double acceleration if mass and friction are controlled.",
            "A question about whether two naturally occurring variables are associated may be investigable without claiming one causes the other.",
            "A climate-data inquiry can test whether the frequency of an event changes with a measured climate index while recognising confounding influences.",
            "For reaction rate, identify one changed factor such as temperature while defining what 'rate' will be measured as.",
            "A model-based prediction should be traceable to the model: if particles collide more often at higher concentration, rate should increase under otherwise similar conditions.",
            "A negative result can still be useful because it may reject, limit or refine the original hypothesis.",
            "A question is too broad if the variables, population, conditions or measurable outcome are unclear.",
            "After evidence is collected, generate a follow-up question that tests the explanation under a new condition rather than repeating the same trial."],
        "mistakes": ["Treating a prediction and a hypothesis as identical", "Writing a question with no measurable variables", "Claiming causation from correlation alone", "Keeping a hypothesis unchanged when repeated evidence contradicts it"],
    },
    "AC9S10I02": {
        "title": "Plan Valid and Reproducible Investigations",
        "lead": "Validity comes from matching the method to the question, controlling relevant variables and managing risk, ethics and cultural responsibilities.",
        "concepts": ["validity", "reproducibility", "variable control", "confounding variables", "sampling", "repeats", "risk assessment", "ethical responsibility", "Country/Place protocols", "transparent method"],
        "examples": [
            "To test force and acceleration, vary force deliberately while holding mass and track conditions constant.",
            "Repeating a biased measurement does not make the design valid; first identify and remove the systematic source of bias.",
            "A method is reproducible when another group can follow the documented procedure and obtain comparable evidence within expected variation.",
            "Choose a sample size that captures meaningful variation rather than using the smallest convenient sample.",
            "Randomise or standardise order when sequence effects could confound the comparison.",
            "A risk assessment links each hazard to likelihood, consequence and a practical control measure.",
            "Animal investigations require welfare and ethical considerations before data collection begins.",
            "Work involving First Nations knowledge, heritage or Country/Place requires the appropriate authority, permissions and protocols; scientific curiosity does not override them.",
            "If an unregistered artefact or heritage item is encountered, stop disturbance and follow the correct reporting process rather than continuing the investigation.",
            "Pilot testing can reveal unclear instructions, unsuitable ranges or uncontrolled variables before the full investigation."],
        "mistakes": ["Assuming more repeats fix a poor design", "Calling a detailed method valid without checking variable control", "Treating safety as a final checklist after planning", "Ignoring ethical or cultural constraints because the data would be useful"],
    },
    "AC9S10I03": {
        "title": "Generate Precise and Replicable Data",
        "lead": "Useful data depends on calibrated equipment, suitable resolution, consistent technique, meaningful sample size and transparent recording.",
        "concepts": ["calibration", "zeroing", "range", "resolution", "precision", "accuracy", "repeatability", "sample size", "independent repeats", "data recording"],
        "examples": [
            "Check and calibrate a sensor before the first run and again if conditions or equipment setup change.",
            "A balance reading to 0.01 g is more precise than one reading to 1 g, but precision alone does not guarantee accuracy.",
            "Choose an instrument whose range includes the expected values without sacrificing unnecessary resolution.",
            "Read analogue scales at eye level to reduce parallax error.",
            "Use the same measurement technique and decision rules across trials so differences are not created by the observer.",
            "Hundreds of digital readings from one continuous run are not the same as hundreds of independent repeats.",
            "Record units with headings so a future analyst can interpret every value correctly.",
            "Keep raw data rather than recording only averages; anomalies and variation may matter later.",
            "Increase sample size when natural variation is large enough that a few observations would be unrepresentative.",
            "Document instrument uncertainty or resolution when it affects the strength of a comparison."],
        "mistakes": ["Equating precision with accuracy", "Treating data points from one run as independent repeats", "Using more decimal places than the instrument supports", "Changing measurement technique between trials"],
    },
    "AC9S10I04": {
        "title": "Select and Construct Scientific Representations",
        "lead": "Tables, graphs, models and diagrams should be chosen because their structure makes the relevant pattern, comparison or mechanism easier to evaluate.",
        "concepts": ["table", "scatter plot", "line graph", "bar chart", "model", "scale", "axes", "uncertainty", "trend", "representation limits"],
        "examples": [
            "Use a scatter plot when both variables are numerical and the question concerns association.",
            "Use a line graph for continuous change over an ordered variable such as time when connecting points has meaning.",
            "Use a bar chart for comparisons among discrete categories rather than forcing categories onto a continuous line.",
            "A table preserves exact values and is useful before choosing a visual representation.",
            "Label axes with quantity and unit; an unlabeled axis makes the graph scientifically ambiguous.",
            "Choose a scale that shows the pattern clearly without visually exaggerating small differences.",
            "Include error bars or another uncertainty representation when uncertainty is part of the evidence being compared.",
            "A particle diagram can show composition and arrangement but not necessarily true scale, motion or force.",
            "A system diagram should make boundaries, inputs, outputs and relationships explicit.",
            "Compare two possible representations and justify which better answers the scientific question."],
        "mistakes": ["Choosing a graph because it looks familiar", "Using connecting lines for unordered categories", "Truncating scales to exaggerate a result without explanation", "Treating a model as a literal copy of reality"],
    },
    "AC9S10I05": {
        "title": "Analyse Data for Patterns, Relationships and Anomalies",
        "lead": "Analysis connects multiple pieces of evidence, quantifies patterns where appropriate and distinguishes genuine relationships from noise or isolated anomalies.",
        "concepts": ["pattern", "trend", "relationship", "correlation", "anomaly", "variation", "comparison", "secondary data", "uncertainty", "evidence synthesis"],
        "examples": [
            "Describe the direction and strength of a visible relationship before proposing an explanation for it.",
            "Compare repeated measurements using centre and spread rather than selecting only the most convenient value.",
            "Investigate an anomaly: check recording, method and plausible mechanism before deciding whether to exclude it.",
            "Two variables rising together show correlation, not automatically causation.",
            "Connect evidence from a graph, table and scientific model when one source alone cannot support the full conclusion.",
            "Use proportional or percentage change when absolute differences would be misleading across different starting values.",
            "Check whether the apparent trend is larger than the measurement uncertainty or natural variation.",
            "When comparing secondary datasets, check that definitions, time periods and collection methods are compatible.",
            "Identify where a relationship changes across a range rather than forcing one trend across all values.",
            "State what the data do not show as part of the analysis."],
        "mistakes": ["Explaining before accurately describing the pattern", "Deleting anomalies automatically", "Calling correlation causation", "Combining datasets without checking whether they measure the same thing"],
    },
    "AC9S10I06": {
        "title": "Evaluate Validity, Reproducibility and Evidence Quality",
        "lead": "Evaluation asks whether the method and evidence are strong enough for the conclusion, which limitations matter, and what change would most improve confidence.",
        "concepts": ["validity", "reproducibility", "accuracy", "precision", "random error", "systematic error", "sample representativeness", "method limitation", "claim strength", "improvement"],
        "examples": [
            "A method can be precise but invalid if it consistently measures the wrong quantity.",
            "Random variation can be reduced by useful repeats, while systematic bias requires a change to method or calibration.",
            "A conclusion should be no stronger than the evidence: observational data may support association without demonstrating causation.",
            "Reproducibility improves when procedures, materials, calibration and analysis decisions are documented transparently.",
            "A very small or convenience sample may limit generalisation even when measurements are accurate.",
            "An improvement should target the largest relevant source of uncertainty rather than adding equipment for its own sake.",
            "If two groups obtain different results, compare methods and conditions before assuming one group made a mistake.",
            "Secondary evidence should be evaluated for source quality, method, date and relevance to the current question.",
            "A model can explain a pattern well while still having known limits outside the tested conditions.",
            "A strong evaluation separates limitations that could change the conclusion from minor imperfections that would not."],
        "mistakes": ["Writing 'human error' without identifying a mechanism", "Assuming more repeats remove systematic error", "Listing limitations without judging their impact", "Suggesting improvements unrelated to the main weakness"],
    },
    "AC9S10I07": {
        "title": "Construct Scientific Arguments from Evidence",
        "lead": "A scientific argument links a defensible claim to relevant evidence through explicit reasoning and responds fairly to uncertainty or competing explanations.",
        "concepts": ["claim", "evidence", "reasoning", "source quality", "counterclaim", "uncertainty", "causal mechanism", "model", "qualification", "conclusion"],
        "examples": [
            "Claim: increasing concentration increased reaction rate in the tested range. Evidence: the measured completion time fell across repeated trials.",
            "Reasoning explains why the evidence matters by connecting the measured pattern to collision frequency or another relevant model.",
            "A counterclaim should be represented accurately before it is evaluated; do not attack a weaker version of it.",
            "Use uncertainty to qualify a claim when two conditions overlap substantially rather than declaring a definite difference.",
            "Prefer evidence directly relevant to the question over a larger quantity of weakly related information.",
            "If a source reports only a conclusion without method or data, its evidential value is limited.",
            "Causal arguments need evidence that alternatives and confounders have been considered, not only a correlation.",
            "A model can support reasoning when its assumptions match the investigated system.",
            "Revise a claim when new evidence changes the balance of support; this is a strength of scientific argumentation.",
            "End with the most defensible conclusion and state the main limitation that affects confidence."],
        "mistakes": ["Restating evidence without reasoning", "Using authority instead of evidence", "Ignoring counter-evidence", "Making an absolute claim from limited or uncertain data"],
    },
    "AC9S10I08": {
        "title": "Communicate Scientific Ideas, Findings and Arguments",
        "lead": "Scientific communication selects structure, vocabulary, evidence and representations for the audience while preserving accuracy, uncertainty and source attribution.",
        "concepts": ["audience", "purpose", "scientific vocabulary", "structure", "evidence", "representation", "uncertainty", "citation", "multimodal communication", "ethical communication"],
        "examples": [
            "A laboratory report and a community information page may communicate the same findings with different structure and vocabulary.",
            "Define technical terms when the audience cannot reasonably be expected to know them.",
            "Place a graph beside the claim it supports and explain the pattern rather than leaving the audience to infer the point.",
            "Report uncertainty and limitations when they materially affect interpretation; do not hide them to make a conclusion sound stronger.",
            "Use headings and logical sequence so methods, results and interpretation are not mixed together confusingly.",
            "Cite data, images and ideas from other sources clearly enough that they can be traced.",
            "Distinguish observation from interpretation in captions and spoken explanations.",
            "Choose an accessible colour, label and text design so the representation can be read without relying on decoration.",
            "When communicating First Nations knowledge or culturally sensitive material, follow authority, permission and attribution requirements rather than assuming all knowledge is public.",
            "Edit for scientific precision: replace exaggerated claims such as 'proves' with language that matches the evidence."],
        "mistakes": ["Writing for the teacher rather than the stated audience", "Using visuals without explaining their evidential role", "Omitting limitations because they weaken the message", "Using sources or cultural knowledge without appropriate attribution or authority"],
    },
}


def practice_for_english(profile: dict) -> list[tuple[str, str]]:
    ex = profile["examples"]
    questions = []
    for i, (name, text) in enumerate(ex, 1):
        if i % 3 == 1:
            q = f"Using a fresh example, explain how {name.lower()} could shape meaning or audience response in this topic."
            a = f"A strong response identifies a specific {name.lower()} choice, gives precise evidence and explains the context-specific effect rather than naming the feature alone."
        elif i % 3 == 2:
            q = f"What evidence would you need before making an analytical claim about {name.lower()}?"
            a = f"Use an exact word, sentence, structural or multimodal choice and connect it to surrounding context; the claim about {name.lower()} must be supported by the text itself."
        else:
            q = f"How could you compare two texts or versions to evaluate {name.lower()} more effectively?"
            a = f"Hold the topic or purpose roughly constant, identify what changes in {name.lower()}, then explain how the changed choice alters meaning, representation, audience position or effectiveness."
        questions.append((q, a))
    return questions[:10]


def practice_for_science(profile: dict) -> list[tuple[str, str]]:
    concepts = profile["concepts"]
    questions = []
    for i, concept in enumerate(concepts, 1):
        if i % 4 == 1:
            q = f"Define {concept} in the context of a Year 10 investigation and give one example of evidence that would show it has been handled well."
            a = f"The response should define {concept} operationally for the investigation and identify a concrete method, measurement, representation or reasoning choice that demonstrates it."
        elif i % 4 == 2:
            q = f"A student says their investigation is strong because it includes {concept}. What extra check is needed before accepting that claim?"
            a = f"Check whether the {concept} choice is actually aligned to the research question, evidence and method; naming the feature is not enough if it does not improve validity or interpretation."
        elif i % 4 == 3:
            q = f"Give one realistic error involving {concept} and explain how it could affect a scientific conclusion."
            a = f"Identify a specific failure involving {concept}, trace how it changes the data or reasoning, and state whether it weakens precision, validity, reproducibility or claim strength."
        else:
            q = f"How would you improve or verify {concept} without changing the scientific question?"
            a = f"Propose a targeted check or method change that directly improves how {concept} is handled while preserving the same underlying question and variables."
        questions.append((q, a))
    return questions[:10]


def render_english(path: Path, source: str, code: str, profile: dict) -> str:
    desc = content_description(source)
    els = elaborations(source)
    canonical = canonical_for(path)
    examples_html = "".join(
        f'<article class="curriculum-worked-example"><h3>{i}. {esc(name)}</h3><p>{esc(text)}</p></article>'
        for i, (name, text) in enumerate(profile["examples"], 1)
    )
    toolkit_html = "".join(f"<li>{esc(x)}</li>" for x in profile["toolkit"])
    mistakes_html = "".join(f"<li>{esc(x)}</li>" for x in profile["mistakes"])
    practice = practice_for_english(profile)
    q_html = "".join(f"<li>{esc(q)}</li>" for q, _ in practice)
    a_html = "".join(f"<li><strong>{i}.</strong> {esc(a)}</li>" for i, (_, a) in enumerate(practice, 1))
    base = f"/quiz/year-10/english/{code.lower()}"
    return f'''<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="google-adsense-account" content="ca-pub-7734963540104771"><title>Year 10 {esc(profile['title'])} | {code}</title><meta name="description" content="Year 10 English {code}: {esc(profile['lead'])} Includes 10 worked examples, misconceptions, practice questions, indicative responses and Australian Curriculum v9 elaborations."><meta name="robots" content="index,follow"><link rel="canonical" href="{canonical}"><link rel="stylesheet" href="/style.css"><link rel="stylesheet" href="/assets/curriculum.css?v=4"><script async src="https://www.googletagmanager.com/gtag/js?id=G-8P22BET45N"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){{dataLayer.push(arguments)}}gtag('js',new Date());gtag('config','G-8P22BET45N');</script><script async src="https://pagead2.googlesyndication.com/pagead/js?client=ca-pub-7734963540104771" crossorigin="anonymous"></script></head><body class="curriculum-shell"><div class="curriculum-page"><nav class="main-nav"><a href="/">Home</a><a href="/year10/curriculum/english/">English</a><a href="/sitemap.html">Sitemap</a><a href="/about.html">About</a><a href="/contact.html">Contact</a></nav><nav aria-label="Breadcrumb" class="breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="/year10/">Year 10</a></li><li><a href="/year10/curriculum/english/">English</a></li><li aria-current="page">{code}</li></ol></nav><header class="curriculum-hero"><p class="curriculum-eyebrow">{code} • Year 10 English</p><h1>{esc(profile['title'])}</h1><p class="curriculum-hero__lead">{esc(profile['lead'])}</p><div class="topic-action-row"><a class="primary" href="#topic-guide">Topic Guide</a><a href="/worksheets/year10/english/teacher-slides/live.html?code={code}" target="_blank" rel="noopener">Teacher Slides</a><a href="{base}/worksheet/">Worksheet</a><a href="{base}/practice/">Practice</a><a href="{base}/test/">Test</a></div></header><main class="curriculum-layout"><div id="topic-guide"><details class="curriculum-topic-section" open><summary><strong>1. Core concepts</strong></summary><div class="curriculum-detail-body"><p><strong>{code}:</strong> {esc(desc)}</p><p>{esc(profile['lead'])}</p><h3>Analysis / composition routine</h3><ol>{toolkit_html}</ol></div></details><details class="curriculum-topic-section" open><summary><strong>2. Ten worked examples</strong></summary><div class="curriculum-detail-body">{examples_html}</div></details><details class="curriculum-topic-section" open><summary><strong>3. Common student misconceptions</strong></summary><div class="curriculum-detail-body"><ul>{mistakes_html}</ul></div></details><details class="curriculum-topic-section"><summary><strong>4. Ten-question practice set</strong></summary><div class="curriculum-detail-body"><ol>{q_html}</ol></div></details><details class="curriculum-topic-section"><summary><strong>Solutions and indicative responses</strong></summary><div class="curriculum-detail-body"><p>English analysis can support more than one interpretation. These responses model the evidence-and-effect reasoning expected; alternative responses are valid when supported precisely.</p><ol>{a_html}</ol></div></details><details class="curriculum-topic-section"><summary><strong>Australian Curriculum v9.0 and elaborations</strong></summary><div class="curriculum-detail-body"><p><strong>Content description:</strong> {esc(desc)}</p>{curriculum_elaborations(els,'english')}</div></details><details class="curriculum-topic-section"><summary><strong>International curriculum alignment</strong></summary><div class="curriculum-detail-body"><p>These are closest alignments, not exact one-to-one equivalents.</p><div class="curriculum-table-wrap"><table class="curriculum-map-table"><thead><tr><th>Region</th><th>Curriculum</th><th>Closest alignment</th></tr></thead><tbody><tr><td>Australia</td><td>Australian Curriculum v9.0</td><td>{code} — exact Skillr outcome.</td></tr><tr><td>Victoria</td><td>Victorian Curriculum F–10 English</td><td>Closest Year 10 English language, literature or literacy alignment.</td></tr><tr><td>NSW</td><td>NSW English</td><td>Closest Stage 5 English alignment for responding, analysis and composing.</td></tr><tr><td>United States</td><td>Common Core ELA/Literacy</td><td>Closest Grades 9–10 Reading, Writing, Speaking and Listening or Language alignment, according to the skill focus.</td></tr><tr><td>England / UK</td><td>Key Stage 4 / GCSE English</td><td>Closest English Language and/or Literature reading, analysis and composition requirement.</td></tr><tr><td>Canada</td><td>Provincial Grade 10 English</td><td>Broad Ontario/BC-style reading, media, oral communication and composition alignment; provincial sequencing varies.</td></tr><tr><td>New Zealand</td><td>Secondary English</td><td>Closest making-meaning and creating-meaning alignment across written, oral and visual texts.</td></tr><tr><td>India</td><td>NCERT / CBSE Class 10 English</td><td>Closest language, reading, literature-response and writing alignment.</td></tr></tbody></table></div></div></details><details class="curriculum-topic-section" open><summary><strong>Resources</strong></summary><div class="curriculum-detail-body"><div class="curriculum-link-row"><a class="curriculum-button primary" href="/worksheets/year10/english/teacher-slides/live.html?code={code}" target="_blank" rel="noopener">Teacher Slides</a><a class="curriculum-button" href="{base}/worksheet/">Worksheet</a><a class="curriculum-button" href="{base}/practice/">Practice</a><a class="curriculum-button" href="{base}/test/">Test</a></div></div></details></div><aside class="curriculum-sidebar"><section class="curriculum-panel"><h2>Year 10 English</h2><p>Study the examples, complete the 10 questions, then compare your reasoning with the indicative responses.</p></section><section class="curriculum-panel"><h2>Curriculum code</h2><p><strong>{code}</strong></p></section></aside></main></div><script>window.skillrPageMeta={{curriculumCode:"{code}",pageType:'topic guide',year:"Year 10",subject:'English'}};window.skillrAccess={{product:"curriculum-topic-guide",accessLevel:"free",requiresLogin:false,requiresPayment:false}};</script><script src="/assets/access.js?v=1"></script><script src="/assets/report-issue.js?v=1"></script><script src="/pwa-register.js"></script></body></html>'''


def render_science(path: Path, source: str, code: str, profile: dict) -> str:
    desc = content_description(source)
    els = elaborations(source)
    canonical = canonical_for(path)
    examples_html = "".join(
        f'<article class="curriculum-worked-example"><h3>{i}. Worked inquiry example</h3><p>{esc(text)}</p></article>'
        for i, text in enumerate(profile["examples"], 1)
    )
    concepts_html = "".join(f"<li>{esc(x)}</li>" for x in profile["concepts"])
    mistakes_html = "".join(f"<li>{esc(x)}</li>" for x in profile["mistakes"])
    practice = practice_for_science(profile)
    q_html = "".join(f"<li>{esc(q)}</li>" for q, _ in practice)
    a_html = "".join(f"<li><strong>{i}.</strong> {esc(a)}</li>" for i, (_, a) in enumerate(practice, 1))
    base = f"/quiz/year-10/science/{code.lower()}"
    return f'''<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="google-adsense-account" content="ca-pub-7734963540104771"><title>Year 10 {esc(profile['title'])} | {code}</title><meta name="description" content="Year 10 Science {code}: {esc(profile['lead'])} Includes 10 worked inquiry examples, misconceptions, practice questions, solutions and Australian Curriculum v9 elaborations."><meta name="robots" content="index,follow"><link rel="canonical" href="{canonical}"><link rel="stylesheet" href="/style.css"><link rel="stylesheet" href="/assets/curriculum.css?v=4"><script async src="https://www.googletagmanager.com/gtag/js?id=G-8P22BET45N"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){{dataLayer.push(arguments)}}gtag('js',new Date());gtag('config','G-8P22BET45N');</script><script async src="https://pagead2.googlesyndication.com/pagead/js?client=ca-pub-7734963540104771" crossorigin="anonymous"></script></head><body class="curriculum-shell"><div class="curriculum-page"><nav class="main-nav"><a href="/">Home</a><a href="/year10/curriculum/science/">Science</a><a href="/sitemap.html">Sitemap</a></nav><nav aria-label="Breadcrumb" class="breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="/year10/">Year 10</a></li><li><a href="/year10/curriculum/science/">Science</a></li><li aria-current="page">{code}</li></ol></nav><header class="curriculum-hero"><p class="curriculum-eyebrow">{code} • Year 10 Science • Science Inquiry</p><h1>{esc(profile['title'])}</h1><p class="curriculum-hero__lead">{esc(profile['lead'])}</p><div class="topic-action-row"><a class="primary" href="#topic-guide">Topic Guide</a><a href="teacher-slides/">Teacher Slides</a><a href="{base}/worksheet/">Practice Sheet</a><a href="{base}/practice/">Practice</a><a href="{base}/test/">Test</a></div></header><main class="curriculum-layout"><div id="topic-guide"><details class="curriculum-topic-section" open><summary><strong>1. Core concepts and inquiry language</strong></summary><div class="curriculum-detail-body"><p><strong>{code}:</strong> {esc(desc)}</p><p>{esc(profile['lead'])}</p><ul>{concepts_html}</ul></div></details><details class="curriculum-topic-section" open><summary><strong>2. Ten worked inquiry examples</strong></summary><div class="curriculum-detail-body">{examples_html}</div></details><details class="curriculum-topic-section" open><summary><strong>3. Common student misconceptions</strong></summary><div class="curriculum-detail-body"><ul>{mistakes_html}</ul></div></details><details class="curriculum-topic-section"><summary><strong>4. Ten-question practice set</strong></summary><div class="curriculum-detail-body"><ol>{q_html}</ol></div></details><details class="curriculum-topic-section"><summary><strong>Solutions and indicative responses</strong></summary><div class="curriculum-detail-body"><ol>{a_html}</ol></div></details><details class="curriculum-topic-section"><summary><strong>Australian Curriculum v9.0 and elaborations</strong></summary><div class="curriculum-detail-body"><p><strong>Content description:</strong> {esc(desc)}</p>{curriculum_elaborations(els,'science')}</div></details><details class="curriculum-topic-section"><summary><strong>International curriculum alignment</strong></summary><div class="curriculum-detail-body"><p>These are closest inquiry/working-scientifically alignments, not exact one-to-one equivalents.</p><div class="curriculum-table-wrap"><table class="curriculum-map-table"><thead><tr><th>Region</th><th>Curriculum</th><th>Closest alignment</th></tr></thead><tbody><tr><td>Australia</td><td>Australian Curriculum v9.0</td><td>{code} — exact Skillr outcome.</td></tr><tr><td>Victoria</td><td>Victorian Curriculum F–10 Science</td><td>Closest Year 10 Science inquiry / science inquiry skills alignment.</td></tr><tr><td>NSW</td><td>NSW Science</td><td>Closest Stage 5 Working Scientifically alignment.</td></tr><tr><td>United States</td><td>NGSS Science and Engineering Practices</td><td>Closest high-school practice in planning investigations, analysing data, arguing from evidence or communicating information according to this code.</td></tr><tr><td>England / UK</td><td>GCSE Science</td><td>Closest Working Scientifically requirement.</td></tr><tr><td>Canada</td><td>Provincial Grade 10 Science</td><td>Broad inquiry, investigation and evidence-evaluation alignment; requirements vary by province.</td></tr><tr><td>New Zealand</td><td>NZC Science</td><td>Closest Nature of Science / investigating in science alignment.</td></tr><tr><td>India</td><td>CBSE / NCERT Class 10 Science</td><td>Closest practical, data-handling and scientific-reasoning alignment.</td></tr></tbody></table></div></div></details><details class="curriculum-topic-section" open><summary><strong>Resources</strong></summary><div class="curriculum-detail-body"><div class="curriculum-link-row"><a class="curriculum-button primary" href="teacher-slides/">Teacher Slides</a><a class="curriculum-button" href="{base}/worksheet/">Practice Sheet</a><a class="curriculum-button" href="{base}/practice/">Practice</a><a class="curriculum-button" href="{base}/test/">Test</a></div></div></details></div><aside class="curriculum-sidebar"><section class="curriculum-panel"><h2>Year 10 Science Inquiry</h2><p>Use the worked examples, then apply the inquiry concept to a new investigation or dataset.</p></section><section class="curriculum-panel"><h2>Curriculum code</h2><p><strong>{code}</strong></p></section></aside></main></div><script>window.skillrPageMeta={{curriculumCode:"{code}",pageType:'topic guide',year:"Year 10",subject:'Science'}};</script><script src="/assets/report-issue.js?v=1"></script><script src="/pwa-register.js"></script></body></html>'''


def main() -> None:
    changed = []
    for path in sorted((ROOT / "year10" / "english").glob("ac9e10*/index.html")):
        source = path.read_text(encoding="utf-8", errors="replace")
        match = re.search(r"AC9E10(?:LE|LY)\d+", source, re.I) or re.search(r"AC9E10(?:LE|LY)\d+", path.as_posix(), re.I)
        if not match:
            continue
        code = match.group(0).upper()
        profile = ENGLISH.get(code)
        if not profile:
            continue
        # Re-author only the legacy generic pages. The approved LA pages are not in this dictionary.
        output = render_english(path, source, code, profile)
        if output != source:
            path.write_text(output, encoding="utf-8")
            changed.append(path.relative_to(ROOT).as_posix())

    for path in sorted((ROOT / "year10" / "science").glob("ac9s10i*/index.html")):
        source = path.read_text(encoding="utf-8", errors="replace")
        match = re.search(r"AC9S10I\d+", source, re.I) or re.search(r"AC9S10I\d+", path.as_posix(), re.I)
        if not match:
            continue
        code = match.group(0).upper()
        profile = SCIENCE.get(code)
        if not profile:
            continue
        output = render_science(path, source, code, profile)
        if output != source:
            path.write_text(output, encoding="utf-8")
            changed.append(path.relative_to(ROOT).as_posix())

    print(f"Finalized {len(changed)} Year 10 topic pages.")
    for item in changed:
        print(item)


if __name__ == "__main__":
    main()
