#!/usr/bin/env python3
"""Upgrade canonical English F–10 topic pages while preserving URLs/resources."""
from __future__ import annotations
import html, re
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
ROOTS = [ROOT / "foundation", *[ROOT / f"year{n}" for n in range(1, 11)]]

def clean(s): return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", s))).strip()
def esc(s): return html.escape(str(s), quote=True)
def year_of(p):
    x=next(x for x in p.parts if x=="foundation" or re.fullmatch(r"year\d+",x)); return 0 if x=="foundation" else int(x[4:])
def code_of(s): return re.search(r"AC9E[A-Z0-9]+",s).group(0)
def description_of(s):
    m=re.search(r"<strong>Content description:</strong>\s*(.*?)</li>",s,re.I|re.S) or re.search(r'<p class="curriculum-hero__lead">(.*?)</p>',s,re.I|re.S)
    return clean(m.group(1))
def elaborations_of(s):
    b=re.search(r"<h2>Curriculum coverage and elaborations</h2>(.*?)</section>",s,re.I|re.S)
    return [] if not b else [clean(x) for x in re.findall(r"<strong>E\d+:</strong>\s*(.*?)</li>",b.group(1),re.I|re.S)]
def terms(d,e):
    t=" ".join([d,*e]).lower(); c=["audience","purpose","context","language","vocabulary","pronouns","values","text structure","paragraph","sentence","syntax","punctuation","image","visual","multimodal","representation","voice","character","theme","literary","rhetorical","evidence","argument","perspective","cohesion","modality","tone","spelling","phoneme","grapheme","morpheme","reading","writing","speaking","listening"]
    return list(dict.fromkeys(x for x in c if x in t))[:6] or ["meaning","language choices","audience"]
def overview(d,e,y):
    k=", ".join(terms(d,e))
    if y<=2: return f"Students learn to {d.rstrip('.')}. Teach the target through short, familiar oral, visual and written examples. Useful lesson language includes {k}. Students should demonstrate the skill in a fresh example, not only repeat a model."
    if y<=5: return f"Students learn to {d.rstrip('.')}. They connect a text or language feature to meaning and explain why a writer, speaker or text uses it. Key concepts include {k}. Success requires a specific example or evidence."
    return f"Students learn to {d.rstrip('.')}. They move beyond feature spotting by identifying a precise language, structural, literary or multimodal choice, selecting evidence, and explaining or evaluating how it shapes meaning, representation, audience response or purpose. Key concepts include {k}."
def examples(d,e,y):
    t=" ".join([d,*e]).lower()
    if "inclusive" in t or "exclusive" in t or "empower" in t:
        return [("Audience alignment",'Compare “Obviously, we all want a safer school” with “One proposal is to improve school safety.” The first assumes agreement and pressures the reader to join the position.'),("Pronoun choice",'“We can solve this together” creates shared identity; “you people never listen” distances and labels a group.'),("Shared values",'“As responsible members of our community” appeals to a value the writer expects the audience to share.'),("Inclusive and marginalising labels",'Compare “students who need language support” with a dismissive label. Word choice can grant dignity and agency or reduce people to a stereotype.')]
    if "text structure" in t or "structures" in t or "paragraph" in t:
        return [("Structure follows purpose","A review may open with an overall judgement then group evidence by acting, plot and design; a news report often foregrounds the most important information first."),("Paragraph focus","A paragraph that develops one claim with evidence is more cohesive than one that jumps between unrelated ideas."),("Mode changes structure","A print article may use paragraphs and subheadings; an online version may add navigation, video and hyperlinks. Evaluate how those choices help or distract."),("Explain effect",'Do not stop at “there is a heading”. Explain how the heading predicts content, guides navigation or frames interpretation.')]
    if "sentence" in t or "syntax" in t or "punctuation" in t:
        return [("Syntax and emphasis",'“The storm destroyed the pier” foregrounds the storm; “The pier was destroyed” foregrounds the damage and can omit the agent.'),("Sentence length",'A long cumulative sentence can build detail; a short sentence after it can create emphasis: “The warnings continued for hours. Nobody moved.”'),("Punctuation and meaning",'Compare “Wait, Sam.” with “Wait Sam!” Punctuation helps shape rhythm, emphasis and relationships.'),("Evaluate effectiveness","Judge a sentence choice in relation to purpose, audience and surrounding context; there is no universally best sentence form.")]
    if "image" in t or "visual" in t or "multimodal" in t:
        return [("Framing","A close-up can make an expression dominant; a wide shot can emphasise setting or isolation. Explain what the viewer is directed to notice."),("Angle and power","A low camera angle can make a subject appear powerful, while a high angle may make the same subject appear vulnerable."),("Salience","Size, placement, contrast and empty space guide attention. Identify the most salient element and explain how it shapes representation."),("Modes work together","In video, image, spoken words, music and captions can reinforce or complicate one another. Analyse the combined effect.")]
    if "vocabulary" in t or "morpheme" in t or "word" in t:
        return [("Precision",'Replace a broad word such as “thing” with a precise noun that identifies the concept, object or process.'),("Meaning from parts","Use roots, prefixes and suffixes to test an unfamiliar word, then confirm meaning from context."),("Register",'“Kids got heaps of problems” may suit informal speech; an academic response might use “adolescents experienced multiple challenges”.'),("Vocabulary in context","Choose the word whose meaning, connotation and formality fit the sentence, not merely a dictionary synonym.")]
    if y<=2: return [("Notice","Model one short example and identify the sound, word, sentence feature or text clue named in the outcome."),("Compare","Choose which of two examples matches and explain the clue."),("Make one together","Jointly create a sentence, oral response or text example using the feature."),("Try a new example","Independently recognise or use the same feature in a fresh familiar context.")]
    f=terms(d,e)[0]; return [("Identify precisely",f"Locate the language or text choice that demonstrates {f}."),("Use evidence","Point to a specific word, sentence, structural choice, visual feature or moment."),("Explain effect","Connect the evidence to meaning, audience, purpose, representation or response."),("Transfer","Apply the reasoning to a new text or deliberately use the feature in your own composition.")]
def misconceptions(d,e,y):
    t=" ".join([d,*e]).lower()
    if y<=2:return [("Naming without showing","Ask students to point to, say or demonstrate the exact feature."),("One memorised example","Change the word, picture or sentence and check the same skill again."),("Guessing","Ask: What did you hear or see that proves it?")]
    if "image" in t or "visual" in t or "multimodal" in t:return [("Feature spotting","Naming a camera angle, colour or sound is not analysis; explain its effect."),("One fixed effect","Interpret the feature in context and alongside other modes."),("Separate-mode lists","Explain how image, words and sound reinforce, contradict or qualify one another."),("Retelling","Analyse how the representation was constructed, not only what it shows.")]
    if "inclusive" in t or "exclusive" in t or "empower" in t:return [("Positive equals inclusive","Inclusion concerns how language positions people and groups."),("Ignoring power","Ask who is allowed to speak, belong, decide or be represented."),("Neutral pronouns","We, us, you and they can create solidarity or distance."),("No evidence","Identify exact wording and explain its social effect.")]
    return [("Feature spotting","Explain how the feature shapes meaning or response."),("Retelling","Select precise evidence and analyse it."),("Automatic effect","Interpret choices through audience, purpose, context and surrounding text."),("Vague metalanguage",'Replace “this makes it better” with the exact feature, evidence and likely effect.')]
def steps(d,e,y):
    f=", ".join(terms(d,e)[:3])
    if y<=2:return [("Step 1: Explicit Teaching & Modelling",f"Name the target in child-friendly language and model one short example connected to {f}."),("Step 2: Guided Analysis","Compare two short examples. Students point to or say the clue."),("Step 3: Collaborative / Independent Practice","Create one example together, then try a fresh familiar example independently."),("Step 4: Formative Assessment","Use a one-minute check with a new example; require an observable clue rather than a guess.")]
    return [("Step 1: Explicit Teaching & Modelling",f"Define the outcome-specific metalanguage ({f}) and model: identify the feature, select evidence, explain its effect or purpose."),("Step 2: Guided Analysis","Analyse a second example together: What is the choice? Where is the evidence? What does it do here?"),("Step 3: Collaborative / Independent Practice","Students annotate or compare a new example, then apply the concept independently in analysis, editing, speaking or composition."),("Step 4: Formative Assessment","Use an unseen micro-text or creation task. Require precise evidence plus a justified explanation or deliberate crafting choice.")]
def mappings(y,code,d):
    stage="Early Stage 1" if y==0 else "Stage 1" if y<=2 else "Stage 2" if y<=4 else "Stage 3" if y<=6 else "Stage 4" if y<=8 else "Stage 5"
    vic="Foundation" if y==0 else f"Year {y}"; us="Kindergarten" if y==0 else (f"Grade {y}" if y<=8 else "Grades 9–10")
    ks="Early Years / Key Stage 1" if y==0 else "Key Stage 1" if y<=2 else "Key Stage 2" if y<=6 else "Key Stage 3" if y<=9 else "Key Stage 4 / GCSE"
    nz=1 if y<=2 else 2 if y<=4 else 3 if y<=6 else 4 if y<=8 else 5; ind="Foundational / early primary" if y==0 else f"Class {y}"
    return [("Australia","Australian Curriculum v9.0",f"{code} — {d}"),("Victoria","Victorian Curriculum F-10 English",f"{vic} English — closest Language, Literature or Literacy alignment; verify the local outcome when planning assessment."),("NSW","NSW English syllabus",f"{stage} English — closest outcome alignment; use as a planning comparison, not an exact equivalence."),("United States","Common Core ELA/Literacy",f"CCSS ELA {us} — closest alignment across RL/RI, RF where applicable, W, SL or L according to the outcome focus."),("England / UK","English / GCSE English Language & Literature",f"{ks} English — closest reading, writing, spoken-language, grammar or literary-analysis alignment."),("Canada","English Language Arts",f"{'Kindergarten' if y==0 else 'Grade '+str(y)} ELA — broad Ontario/BC-style closest alignment; curricula vary by province."),("New Zealand","New Zealand Curriculum English",f"NZC English Level {nz} — closest oral, written and visual language alignment."),("India","NCERT / CBSE English Language and Literature",f"{ind} English — closest language, reading, writing or literature alignment.")]
def cards(items):return "".join(f'<article><h3>{esc(a)}</h3><p>{esc(b)}</p></article>' for a,b in items)
def bullets(items):return "".join(f'<li><strong>{esc(a)}:</strong> {esc(b)}</li>' for a,b in items)
def mapping_table(rows):return "".join(f"<tr><td>{esc(a)}</td><td>{esc(b)}</td><td>{esc(c)}</td></tr>" for a,b,c in rows)
def replacement(code,d,e,y):
    cov="".join(f"<li><strong>E{i+1}:</strong> {esc(x)}</li>" for i,x in enumerate(e)) or "<li>Use the exact content description above as the required learning target.</li>"
    return f'''<section class="curriculum-topic-section" id="topic-guide"><h2>1. Outcome Overview &amp; Core Concepts</h2><p>{esc(overview(d,e,y))}</p><p><strong>Learning target:</strong> {esc(d)}</p></section>
<section class="curriculum-topic-section"><h2>2. Subject-Specific Content &amp; Key Examples</h2><div class="unit-activity-grid">{cards(examples(d,e,y))}</div></section>
<section class="curriculum-topic-section"><h2>3. Common Student Misconceptions</h2><ul>{bullets(misconceptions(d,e,y))}</ul></section>
<section class="curriculum-topic-section"><h2>4. 4-Step Instructional Sequence</h2><div class="unit-activity-grid">{cards(steps(d,e,y))}</div></section>
<section class="curriculum-topic-section"><h2>Curriculum Coverage &amp; Elaborations</h2><p>The content description is the required target. The elaborations below are taught as examples and contexts, not as disconnected checklist wording.</p><ul>{cov}</ul></section>
<section class="curriculum-topic-section"><h2>5. Accurate International Curriculum Mapping</h2><p>These are closest English/ELA alignments for planning and search, not exact one-to-one equivalences.</p><div class="curriculum-table-wrap"><table class="curriculum-map-table"><thead><tr><th>Region</th><th>English / ELA curriculum</th><th>Closest alignment</th></tr></thead><tbody>{mapping_table(mappings(y,code,d))}</tbody></table></div></section>'''
def update_meta(s,code,d,y):
    label="Foundation" if y==0 else f"Year {y}"; desc=f"{code} {label} English lesson: {d.rstrip('.')}. Includes examples, misconceptions, a four-step teaching sequence and English/ELA curriculum alignment."
    s=re.sub(r'<meta name="description" content="[^"]*">',f'<meta name="description" content="{esc(desc)}">',s,count=1,re.I)
    s=re.sub(r'<meta property="og:description" content="[^"]*">',f'<meta property="og:description" content="{esc(desc)}">',s,count=1,re.I)
    return s
def upgrade(p):
    s=p.read_text(encoding="utf-8"); code=code_of(s); d=description_of(s); e=elaborations_of(s); y=year_of(p)
    start=s.find('<section class="curriculum-topic-section" id="topic-guide">'); end=s.find('<section class="curriculum-topic-section">\n        <h2>Related ',start)
    if start<0 or end<0: raise ValueError(f"body anchors not found: {p}")
    out=update_meta(s[:start]+replacement(code,d,e,y)+"\n\n      "+s[end:],code,d,y)
    if out!=s:p.write_text(out,encoding="utf-8");return True
    return False
def main():
    pages=[]
    for r in ROOTS:
        d=r/"english"
        if d.is_dir():pages += [p for p in d.glob("*/index.html") if p.parent.name.lower().startswith("ac9e")]
    changed=0
    for p in sorted(pages):
        try: changed += int(upgrade(p))
        except Exception as exc: raise RuntimeError(f"{p.relative_to(ROOT)}: {exc}") from exc
    print(f"Upgraded {changed} of {len(pages)} English topic pages.")
if __name__=="__main__":main()
