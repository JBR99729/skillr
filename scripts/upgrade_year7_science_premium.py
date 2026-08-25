from __future__ import annotations

from pathlib import Path
from html import escape
from PIL import Image, ImageDraw, ImageFont
import re

ROOT = Path(__file__).resolve().parents[1]
ASSET_DIR = ROOT / "assets" / "illustrations" / "science"
ASSET_DIR.mkdir(parents=True, exist_ok=True)

PAGES = {
    "AC9S7U01": "year7/science/ac9s7u01-investigate-the-role-of-classification-in-ordering-and/index.html",
    "AC9S7U02": "year7/science/ac9s7u02-models-including-food-webs-to-represent-matter-and-energy-flow/index.html",
    "AC9S7U03": "year7/science/ac9s7u03-model-cyclic-changes-in-the-relative-positions-of-the-earth/index.html",
    "AC9S7U04": "year7/science/ac9s7u04-investigate-and-represent-balanced-and-unbalanced-forces/index.html",
    "AC9S7U05": "year7/science/ac9s7u05-particle-theory-to-describe-the-arrangement-of-particles-in-a/index.html",
    "AC9S7U06": "year7/science/ac9s7u06-a-particle-model-to-describe-differences-between-pure/index.html",
    "AC9S7H01": "year7/science/ac9s7h01-explain-how-new-evidence-or-different-perspectives-can-lead-to/index.html",
    "AC9S7H02": "year7/science/ac9s7h02-investigate-how-cultural-perspectives-and-world-views-influence/index.html",
    "AC9S7H03": "year7/science/ac9s7h03-examine-how-proposed-scientific-responses-to-contemporary/index.html",
    "AC9S7H04": "year7/science/ac9s7h04-the-role-of-science-communication-in-informing-individual/index.html",
    "AC9S7I01": "year7/science/ac9s7i01-develop-investigable-questions-reasoned-predictions-and/index.html",
    "AC9S7I02": "year7/science/ac9s7i02-plan-and-conduct-reproducible-investigations-to-answer/index.html",
    "AC9S7I03": "year7/science/ac9s7i03-select-and-use-equipment-to-generate-and-record-data-with/index.html",
    "AC9S7I04": "year7/science/ac9s7i04-select-and-construct-appropriate-representations-including/index.html",
    "AC9S7I05": "year7/science/ac9s7i05-analyse-data-and-information-to-describe-patterns-trends-and/index.html",
    "AC9S7I06": "year7/science/ac9s7i06-analyse-methods-conclusions-and-claims-for-assumptions-possible/index.html",
    "AC9S7I07": "year7/science/ac9s7i07-construct-evidence-based-arguments-to-support-conclusions-or/index.html",
    "AC9S7I08": "year7/science/ac9s7i08-and-create-texts-to-communicate-ideas-findings-and-arguments-for/index.html",
}

CONTENT = {
    "AC9S7U01": {
        "title": "Classification turns biodiversity into testable patterns",
        "intro": "Classification groups organisms using shared characteristics so scientists can identify, compare and communicate about biodiversity. A dichotomous key works by making one evidence-based choice at a time until only one identification remains.",
        "diagram": "classification-tree.webp",
        "alt": "Dichotomous classification tree separating four organisms using observable characteristics",
        "caption": "A useful key uses observable, mutually exclusive choices and follows one branch at each step.",
        "explain": "Read from the top. Each split asks a yes-or-no style question about an observable feature. The final label is reached by evidence, not by guessing which organism looks most similar overall.",
        "worked": "An unknown animal has a backbone, feathers and a beak. Follow the vertebrate branch, then the feathered branch: the key identifies it as a bird. Record the features used so another person can reproduce the identification.",
        "misconception": "Classification is not a ranking from ‘simple’ to ‘advanced’. Groups represent shared features and relationships, not worth or progress.",
        "exam": "When asked to evaluate a key, check that every choice is observable, mutually exclusive and leads to exactly one next step.",
        "retrieval": "Why is ‘lives near water’ usually a weaker first key choice than ‘has six legs’?"
    },
    "AC9S7U02": {
        "title": "Food-web arrows show transfer, not who chases whom",
        "intro": "A food web is a model of connected feeding pathways. Arrows point from the food source to the consumer receiving matter and chemical energy, while decomposers connect to dead material and waste from many trophic levels.",
        "diagram": "food-web-energy-flow.webp",
        "alt": "Food web showing grass feeding rabbit and grasshopper, grasshopper feeding frog, and rabbit and frog feeding a fox",
        "caption": "Trace arrows from the energy source toward consumers; then consider indirect effects when one population changes.",
        "explain": "If grass decreases, organisms that depend directly on grass may decline first. Predators can then be affected indirectly because less prey is available. The web helps predict pathways, but population data are needed to test the prediction.",
        "worked": "Suppose rabbit numbers fall after disease. Foxes may have less rabbit prey and switch to frogs, increasing pressure on frogs. A strong prediction states both the direct effect and a plausible indirect pathway.",
        "misconception": "Energy is not recycled through ecosystems. Matter can cycle; usable energy flows through food pathways and is progressively dissipated as heat.",
        "exam": "For population-change questions, write: change → direct interaction → indirect interaction → conditional prediction.",
        "retrieval": "A predator is removed. Give one likely short-term effect and one possible longer-term indirect effect."
    },
    "AC9S7U03": {
        "title": "Position and alignment explain predictable Earth–Sun–Moon patterns",
        "intro": "Eclipses, tides and seasons are explained by models of relative position, motion and alignment. The key is to connect the geometry of the model to the observed phenomenon rather than memorising isolated facts.",
        "diagram": "earth-sun-moon-alignment.webp",
        "alt": "Earth Sun Moon alignment diagram showing solar eclipse and lunar eclipse positions",
        "caption": "Solar eclipse: Moon between Sun and Earth. Lunar eclipse: Earth between Sun and Moon.",
        "explain": "The diagram shows why eclipses require near alignment. They do not happen every month because the Moon’s orbit is tilted relative to Earth’s orbital plane, so the shadows usually pass above or below the other body.",
        "worked": "If the Moon is between Earth and the Sun but not close to an orbital node, a new moon occurs without a solar eclipse because the three bodies are not aligned closely enough for the Moon’s shadow to cross Earth.",
        "misconception": "Seasons are not caused by Earth being much closer to the Sun in summer. They are mainly caused by Earth’s axial tilt changing Sun angle and day length through the year.",
        "exam": "Use position words precisely: between, aligned, tilted, rotates, revolves. A labelled sketch can earn clarity when your written explanation is brief.",
        "retrieval": "Why can a full moon occur without a lunar eclipse?"
    },
    "AC9S7U04": {
        "title": "Net force links force diagrams to changes in motion",
        "intro": "Forces have both magnitude and direction. Balanced forces produce zero net force; unbalanced forces produce a non-zero net force and therefore a change in velocity, such as speeding up, slowing down or changing direction.",
        "diagram": "balanced-unbalanced-forces.webp",
        "alt": "Force diagrams comparing equal opposite balanced forces with a larger rightward force producing a rightward net force",
        "caption": "Compare vector size and direction before deciding whether forces are balanced.",
        "explain": "Equal opposite arrows cancel in the first model, so net force is zero. In the second model the rightward force is larger, so the net force points right. The object’s motion changes in the direction of the net force.",
        "worked": "A trolley has 18 N forward and 11 N backward. Net force = 18 − 11 = 7 N forward. If its mass stays constant, it accelerates forward; the diagram should show the forward arrow longer than the backward arrow.",
        "misconception": "Zero net force does not mean an object must be stationary. It can move at constant velocity when forces are balanced.",
        "exam": "Always state direction with a net force. ‘7 N’ is incomplete; write ‘7 N forward’ or an equivalent direction.",
        "retrieval": "A cyclist moves at constant speed in a straight line. What does that imply about the net force?"
    },
    "AC9S7U05": {
        "title": "Particle arrangement, motion and attraction explain observable properties",
        "intro": "The particle model explains states of matter by describing how particles are arranged, how they move and how strongly they attract one another. Macroscopic properties such as shape, flow and compressibility follow from these microscopic differences.",
        "diagram": "particle-states.webp",
        "alt": "Particle model comparing closely packed ordered solid particles, close disordered liquid particles and widely spaced gas particles",
        "caption": "The particles themselves do not change size between states; their arrangement and motion change.",
        "explain": "Solid particles vibrate around fixed positions, liquid particles remain close but move past one another, and gas particles are much farther apart and move freely. Heating increases average particle kinetic energy.",
        "worked": "When a liquid is heated, its particles move faster on average. At boiling, particles can overcome attractions sufficiently to separate into the gas state; the substance has not become a different chemical substance.",
        "misconception": "Particles in a solid are not motionless. They vibrate, even though the solid keeps a fixed shape.",
        "exam": "Explain a property with a three-part chain: particle arrangement/motion → interaction → observable property.",
        "retrieval": "Why is a gas much easier to compress than a liquid?"
    },
    "AC9S7U06": {
        "title": "Particle models and physical properties guide mixture separation",
        "intro": "Pure substances contain one substance with characteristic properties; mixtures contain two or more substances physically combined. Separation methods work because components differ in physical properties such as particle size, solubility, boiling point or magnetic behaviour.",
        "diagram": "mixture-separation.webp",
        "alt": "Mixture separation flow diagram choosing filtration, evaporation or distillation based on particle size, solubility and boiling point",
        "caption": "Choose a separation method by identifying the property difference you can exploit.",
        "explain": "Filtration separates an insoluble solid from a liquid using particle size. Evaporation can recover a dissolved solid, while distillation can recover a solvent or separate liquids using boiling-point differences.",
        "worked": "For sand and salt water: filter first to remove insoluble sand, then evaporate or distil the filtrate. One method is not enough because the mixture contains components with different relevant properties.",
        "misconception": "Dissolved salt has not disappeared. Its particles are dispersed through the solution and can be recovered by a physical separation process.",
        "exam": "Name the method and the property difference: ‘Use filtration because sand is insoluble and its particles are retained by the filter.’",
        "retrieval": "Why would filtration fail to separate dissolved salt from water?"
    },
    "AC9S7H01": {
        "title": "Scientific knowledge changes when evidence changes the best explanation",
        "intro": "Science is reliable because claims are tested, compared with evidence and open to revision. A new idea is not accepted merely because it is new; it must explain the evidence at least as well as, and usually better than, the previous account.",
        "worked": "Older classifications often relied strongly on visible features. If DNA evidence shows that two look-alike organisms are not close relatives, scientists compare the genetic and anatomical evidence and may revise the grouping.",
        "misconception": "Changing a scientific explanation does not show that science ‘failed’. Revision in response to stronger evidence is part of how science becomes more accurate.",
        "exam": "Use a causal chain: previous understanding → new evidence/perspective → comparison/testing → revised understanding → why the revision is better supported.",
        "retrieval": "What makes new evidence strong enough to influence an established scientific explanation?"
    },
    "AC9S7H02": {
        "title": "Culture and world view can shape questions, observations and interpretations",
        "intro": "Scientific knowledge develops within societies. Cultural perspectives can influence which questions are asked, what observations are valued and how knowledge is applied, while evidence and transparent reasoning remain central to scientific evaluation.",
        "worked": "A land-management investigation may combine community-held seasonal knowledge with contemporary measurements of fuel load, vegetation recovery and species presence. Each source contributes different information, and conclusions should respect cultural authority and evidence quality.",
        "misconception": "A cultural perspective is not the same as an unsupported opinion. Knowledge systems can contain systematic observation, testing, practice and intergenerational refinement.",
        "exam": "Avoid saying one knowledge system simply ‘replaces’ another. Explain what each perspective contributes and how it influences investigation or understanding.",
        "retrieval": "Give one way a world view can influence the development of scientific knowledge without changing the underlying evidence."
    },
    "AC9S7H03": {
        "title": "Scientific responses must be evaluated beyond ‘does it work?’",
        "intro": "A proposed scientific response to a contemporary issue can have benefits, limitations and trade-offs. Evaluation should consider scientific evidence alongside ethical, environmental, social and economic consequences.",
        "worked": "A new pest-control method may reduce crop damage but also affect non-target species. A balanced evaluation compares effectiveness, ecological risk, cost, fairness and who carries the benefits or harms before recommending a response.",
        "misconception": "The most scientifically effective option is not automatically the best social decision; decisions can involve values, equity, cost and acceptable risk.",
        "exam": "For ‘evaluate’ questions, include evidence for benefits, evidence for limitations/trade-offs and a justified judgement linked to criteria.",
        "retrieval": "Why might two communities make different decisions even when they agree on the same scientific evidence?"
    },
    "AC9S7H04": {
        "title": "Science communication connects evidence with public decisions",
        "intro": "Science communication translates evidence for different audiences. Clear communication can inform personal choices and policy, but the quality of a message depends on accuracy, uncertainty, source credibility and whether claims match the evidence.",
        "worked": "A public-health graph shows risk falling after an intervention. A responsible communicator states what was measured, the size of the change, relevant uncertainty and whether the evidence shows correlation or supports causation.",
        "misconception": "A confident or viral message is not necessarily a reliable scientific message. Popularity is not evidence quality.",
        "exam": "When evaluating communication, check source, evidence, missing context, uncertainty, audience and whether the conclusion overstates the data.",
        "retrieval": "What two details would you look for before trusting a science claim shared on social media?"
    },
    "AC9S7I01": {
        "title": "Good investigations begin with questions that can be answered using evidence",
        "intro": "An investigable question identifies variables or observations that can be measured. A prediction states an expected outcome, while a hypothesis gives a testable explanation that links variables using scientific reasoning.",
        "worked": "Question: ‘How does water temperature affect the time for a sugar cube to dissolve?’ Prediction: ‘Higher temperature will reduce dissolving time.’ A stronger hypothesis adds why: faster particle motion increases the rate of interactions with the sugar.",
        "misconception": "‘What is the best drink?’ is not directly investigable until ‘best’ is operationally defined with a measurable criterion.",
        "exam": "Write questions in a variable form: ‘How does [independent variable] affect [dependent variable] when [key controls] are kept constant?’",
        "retrieval": "Turn ‘Do plants like music?’ into an investigable question with a measurable dependent variable."
    },
    "AC9S7I02": {
        "title": "Reproducible investigations control variables and document methods clearly",
        "intro": "A reproducible investigation gives enough detail for another person to repeat the method. Planning includes the independent and dependent variables, controlled variables, repeats, safety, equipment range and a method for recording data.",
        "worked": "To test light intensity and photosynthesis, vary lamp distance, measure oxygen production for the same time, keep plant species and temperature controlled, repeat each distance and record units consistently.",
        "misconception": "Repeating a measurement does not fix a biased method. Repeats improve confidence in random variation, while design changes are needed to reduce systematic bias.",
        "exam": "Method marks often come from precision: quantities, units, timing, repeats and exactly how the dependent variable is measured.",
        "retrieval": "Why is ‘keep everything else the same’ weaker than naming the important controlled variables?"
    },
    "AC9S7I03": {
        "title": "Choose equipment by matching range, precision and safety to the measurement",
        "intro": "Measurement quality depends on selecting equipment that can measure the required quantity safely and with suitable resolution. Data should be recorded with units and a precision consistent with the instrument.",
        "worked": "For 23–27 mL volumes, a measuring cylinder is generally more appropriate than a kitchen cup because its scale has smaller divisions. Read the liquid level at eye height to reduce parallax error.",
        "misconception": "More decimal places do not automatically mean more accurate data. Recorded precision should reflect the instrument’s scale and method.",
        "exam": "Justify equipment choices using ‘range + resolution + suitability’, not simply ‘it is more accurate’.",
        "retrieval": "What error can occur if you read a measuring cylinder from above rather than at eye level?"
    },
    "AC9S7I04": {
        "title": "Representations should make the pattern easier to see, not merely decorate the data",
        "intro": "Tables, graphs, diagrams and models serve different purposes. Choose a representation based on the type of variables and the relationship you need to communicate, then label it so another reader can interpret it without guessing.",
        "worked": "For temperature measured every minute, a line graph is useful because time is continuous and the trend matters. Put the independent variable on the horizontal axis, dependent variable on the vertical axis, include units and use a sensible scale.",
        "misconception": "Joining points is not always appropriate. A line graph suits ordered/continuous change; categories usually need a column/bar display rather than a continuous line.",
        "exam": "Before drawing, identify variable type, axis choice, units, scale and whether a line of best fit or point-to-point connection is justified.",
        "retrieval": "Why is a pie chart usually unsuitable for showing temperature change over time?"
    },
    "AC9S7I05": {
        "title": "Analysis turns data into evidence by identifying patterns and relationships",
        "intro": "Data analysis describes what the evidence shows before explaining why. Look for trends, clusters, outliers and relationships, and use specific values or comparisons rather than vague phrases such as ‘it went up a lot’.",
        "worked": "If reaction time falls from 42 s at 20 °C to 19 s at 40 °C, describe the pattern quantitatively first. Then connect the trend to a scientific explanation; do not invent causation that the design did not test.",
        "misconception": "An outlier should not be deleted automatically. Check for recording or method errors and consider whether it may be genuine variation.",
        "exam": "A high-quality trend statement includes direction, evidence from values and any important exception or uncertainty.",
        "retrieval": "What is the difference between describing a trend and explaining a trend?"
    },
    "AC9S7I06": {
        "title": "Evaluate whether the method and evidence actually support the claim",
        "intro": "Critical analysis looks for assumptions, sources of error, bias, sample limitations and whether the conclusion matches the data. Reliability, validity and accuracy describe different aspects of evidence quality.",
        "worked": "If a claim about all Year 7 students is based on 12 volunteers from one class, the measurements may be repeatable but the sample may not represent the wider group. The conclusion should be narrowed or the sampling improved.",
        "misconception": "A large data table does not guarantee a valid conclusion. Poor sampling or uncontrolled variables can still undermine the claim.",
        "exam": "Link each limitation to its consequence and improvement: problem → how it affects evidence → specific fix.",
        "retrieval": "Why can a result be reliable but still invalid?"
    },
    "AC9S7I07": {
        "title": "Evidence-based arguments connect a claim to relevant evidence through reasoning",
        "intro": "A scientific argument is more than an opinion. It states a claim, selects relevant evidence and explains how that evidence supports the claim using scientific concepts; counter-evidence or limitations should be addressed when important.",
        "worked": "Claim: insulation reduced heat loss. Evidence: after 15 minutes, the insulated cup was 8 °C warmer than the control across three repeats. Reasoning: insulation slows energy transfer to the surroundings, so the temperature difference supports the claim.",
        "misconception": "Quoting data without explaining its relevance is not complete scientific reasoning.",
        "exam": "Use CER: Claim → Evidence → Reasoning. Add a limitation when the question asks you to evaluate strength.",
        "retrieval": "What makes evidence relevant to a claim rather than merely related to the topic?"
    },
    "AC9S7I08": {
        "title": "Scientific texts change with purpose, audience and evidence",
        "intro": "Communicating science requires selecting accurate content, appropriate representations and a structure suited to the audience. Findings should distinguish observations from interpretations and acknowledge uncertainty where it matters.",
        "worked": "A lab report for a teacher can include detailed method, table and uncertainty. A public infographic about the same investigation may use one clear graph and a short evidence-based conclusion, while still avoiding exaggerated claims.",
        "misconception": "Simplifying language for a general audience does not justify simplifying the evidence into a misleading certainty.",
        "exam": "Match form to purpose: report methods for reproducibility, graphs for patterns, and concise evidence-based conclusions for communication.",
        "retrieval": "How would you change the same scientific finding for a Year 7 class versus a specialist audience?"
    },
}

DIAGRAM_CODES = {k for k, v in CONTENT.items() if v.get("diagram")}


def font(size: int, bold: bool = False):
    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/liberation2/LiberationSans-Regular.ttf",
    ]
    for item in candidates:
        if Path(item).exists():
            return ImageFont.truetype(item, size=size)
    return ImageFont.load_default()


def arrow(draw, a, b, width=5, fill=(35, 82, 140)):
    draw.line([a, b], fill=fill, width=width)
    import math
    angle = math.atan2(b[1]-a[1], b[0]-a[0])
    length = 14
    for delta in (2.6, -2.6):
        p = (b[0] + length * math.cos(angle + delta), b[1] + length * math.sin(angle + delta))
        draw.line([b, p], fill=fill, width=width)


def box(draw, xy, text, fill=(241, 247, 254), outline=(103, 133, 168), fs=22):
    draw.rounded_rectangle(xy, radius=12, fill=fill, outline=outline, width=2)
    f = font(fs, True)
    l, t, r, b = draw.textbbox((0, 0), text, font=f)
    x1, y1, x2, y2 = xy
    draw.text(((x1+x2-(r-l))/2, (y1+y2-(b-t))/2-2), text, font=f, fill=(28, 54, 86))


def make_diagram(code: str, filename: str):
    img = Image.new("RGB", (640, 360), "white")
    d = ImageDraw.Draw(img)
    title = font(25, True)
    small = font(18)
    d.text((24, 16), CONTENT[code]["title"], font=title, fill=(23, 57, 104))

    if code == "AC9S7U01":
        box(d, (245, 70, 395, 112), "Unknown")
        box(d, (70, 155, 235, 202), "Backbone")
        box(d, (405, 155, 570, 202), "No backbone")
        box(d, (30, 270, 175, 318), "Feathers → bird", fs=18)
        box(d, (190, 270, 335, 318), "Fur → mammal", fs=18)
        box(d, (355, 270, 500, 318), "6 legs → insect", fs=18)
        box(d, (510, 270, 620, 318), "8 legs", fs=18)
        arrow(d, (300,112),(155,155)); arrow(d,(340,112),(485,155)); arrow(d,(140,202),(100,270)); arrow(d,(175,202),(260,270)); arrow(d,(470,202),(425,270)); arrow(d,(510,202),(565,270))
        d.text((82, 215), "one observable choice at each split", font=small, fill=(69,91,119))
    elif code == "AC9S7U02":
        coords = {"Grass":(35,245,150,295),"Grasshopper":(210,235,365,290),"Rabbit":(210,125,335,175),"Frog":(410,235,520,285),"Fox":(475,105,590,155)}
        for name, xy in coords.items(): box(d,xy,name,fs=18)
        arrow(d,(150,260),(210,260)); arrow(d,(150,240),(230,175)); arrow(d,(365,260),(410,260)); arrow(d,(335,150),(475,130)); arrow(d,(520,235),(520,155))
        d.text((32,315), "arrows: food source → consumer receiving matter and energy", font=small, fill=(69,91,119))
    elif code == "AC9S7U03":
        d.ellipse((35,120,125,210), fill=(246,188,54), outline=(180,125,20), width=3); d.text((52,215),"Sun",font=small,fill=(70,70,70))
        d.ellipse((300,135,360,195), fill=(205,213,225), outline=(94,107,126), width=2); d.text((306,200),"Moon",font=small,fill=(70,70,70))
        d.ellipse((505,115,600,210), fill=(92,154,205), outline=(40,93,135), width=3); d.text((525,215),"Earth",font=small,fill=(70,70,70))
        arrow(d,(125,165),(300,165),3,(180,140,55)); arrow(d,(360,165),(505,165),3,(180,140,55)); d.text((195,92),"solar eclipse alignment",font=font(20,True),fill=(23,57,104))
        d.text((115,292),"Lunar eclipse: Sun → Earth → Moon",font=font(21,True),fill=(23,57,104)); d.text((115,324),"Alignment must be close; the Moon's orbit is tilted.",font=small,fill=(69,91,119))
    elif code == "AC9S7U04":
        d.text((55,82),"Balanced",font=font(22,True),fill=(23,57,104)); box(d,(235,70,405,125),"object",fs=19); arrow(d,(235,98),(95,98)); arrow(d,(405,98),(545,98)); d.text((230,135),"net force = 0 N",font=small,fill=(69,91,119))
        d.text((55,218),"Unbalanced",font=font(22,True),fill=(23,57,104)); box(d,(235,205,405,260),"object",fs=19); arrow(d,(235,233),(145,233)); arrow(d,(405,233),(590,233)); d.text((225,273),"net force → right",font=small,fill=(69,91,119))
    elif code == "AC9S7U05":
        labels=[("Solid",35),("Liquid",235),("Gas",435)]
        for label,x in labels:
            d.text((x+55,72),label,font=font(21,True),fill=(23,57,104)); d.rounded_rectangle((x,110,x+170,295),10,outline=(150,170,190),width=2)
        for row in range(4):
            for col in range(4): d.ellipse((55+col*32,130+row*32,75+col*32,150+row*32),fill=(64,118,176))
        pts=[(255,135),(300,130),(350,150),(270,185),(330,190),(375,210),(250,240),(305,245),(355,255)]
        for x,y in pts:d.ellipse((x,y,x+20,y+20),fill=(64,118,176))
        pts=[(455,130),(555,145),(490,210),(575,255),(455,270),(540,220)]
        for x,y in pts:d.ellipse((x,y,x+20,y+20),fill=(64,118,176))
        d.text((47,315),"ordered + close",font=small,fill=(69,91,119)); d.text((245,315),"close + mobile",font=small,fill=(69,91,119)); d.text((455,315),"far apart",font=small,fill=(69,91,119))
    elif code == "AC9S7U06":
        box(d,(220,70,420,120),"Mixture",fs=22); box(d,(25,205,190,260),"insoluble solid?",fs=18); box(d,(238,205,402,260),"dissolved solid?",fs=18); box(d,(450,205,615,260),"liquids?",fs=18)
        arrow(d,(285,120),(115,205)); arrow(d,(320,120),(320,205)); arrow(d,(355,120),(530,205)); d.text((65,280),"filtration",font=font(19,True),fill=(23,57,104)); d.text((270,280),"evaporation",font=font(19,True),fill=(23,57,104)); d.text((480,280),"distillation",font=font(19,True),fill=(23,57,104)); d.text((108,318),"Choose the property difference that the method can exploit.",font=small,fill=(69,91,119))

    out = ASSET_DIR / filename
    img.save(out, "WEBP", quality=35, method=6)
    size = out.stat().st_size
    if size > 60 * 1024:
        img.save(out, "WEBP", quality=30, method=6)
    assert out.stat().st_size <= 60 * 1024, f"{out} exceeds 60 KB"


def block(code: str) -> str:
    c = CONTENT[code]
    fig = ""
    if c.get("diagram"):
        fig = f'''<figure class="science-premium-diagram"><img src="/assets/illustrations/science/{escape(c['diagram'])}" alt="{escape(c['alt'])}" width="640" height="360" loading="lazy" decoding="async"><figcaption>{escape(c['caption'])}</figcaption></figure>'''
        explanation = f'''<article class="science-premium-card"><h3>Read the diagram</h3><p>{escape(c['explain'])}</p></article>'''
        grid = f'''<div class="science-premium-grid"><article class="science-premium-card"><h2>{escape(c['title'])}</h2><p>{escape(c['intro'])}</p></article>{fig}</div>{explanation}'''
    else:
        grid = f'''<article class="science-premium-card"><h2>{escape(c['title'])}</h2><p>{escape(c['intro'])}</p></article>'''
    return f'''<!-- science-premium-layer:{code} --><section class="science-premium-layer curriculum-topic-section" aria-labelledby="premium-{code.lower()}"><div id="premium-{code.lower()}">{grid}<div class="science-premium-cue"><article><h3>Worked example</h3><p>{escape(c['worked'])}</p></article><article><h3>Common misconception</h3><p>{escape(c['misconception'])}</p></article><article><h3>Exam tip</h3><p>{escape(c['exam'])}</p></article></div><div class="science-premium-retrieval"><strong>Retrieval question:</strong> {escape(c['retrieval'])}</div></div></section>'''


def preserve_snapshot(text: str):
    canonical = re.search(r'<link[^>]+rel=["\']canonical["\'][^>]+href=["\']([^"\']+)', text, re.I)
    return {
        "canonical": canonical.group(1) if canonical else None,
        "teacher": text.lower().count("teacher"),
        "homework": text.lower().count("homework"),
        "practice": text.lower().count("practice"),
        "test": text.lower().count("test"),
        "report": text.lower().count("report"),
        "victoria": text.lower().count("victoria"),
        "nsw": text.lower().count("nsw"),
        "structured": text.count('application/ld+json'),
    }


def upgrade_page(code: str, rel: str):
    path = ROOT / rel
    if not path.exists():
        raise FileNotFoundError(path)
    before = path.read_text(encoding="utf-8")
    if f"science-premium-layer:{code}" in before:
        return
    snap = preserve_snapshot(before)
    css = '<link rel="stylesheet" href="/assets/year7-science-premium.css?v=1">'
    text = before
    if "/assets/year7-science-premium.css" not in text:
        text = text.replace("</head>", css + "</head>", 1)
    insert = block(code)
    anchors = [
        '<main class="curriculum-layout"><div>',
        '<main class="curriculum-layout">\n    <div>',
        '<main class="curriculum-layout">\n<div>',
    ]
    inserted = False
    for anchor in anchors:
        if anchor in text:
            text = text.replace(anchor, anchor + insert, 1)
            inserted = True
            break
    if not inserted:
        m = re.search(r'(<main\b[^>]*>)', text, re.I)
        if not m:
            raise RuntimeError(f"No main element in {rel}")
        text = text[:m.end()] + insert + text[m.end():]
    after = preserve_snapshot(text)
    for key in snap:
        if after[key] != snap[key]:
            raise AssertionError(f"Preservation failure {code}: {key}: {snap[key]!r} -> {after[key]!r}")
    path.write_text(text, encoding="utf-8")


def validate_outputs():
    for code, rel in PAGES.items():
        text = (ROOT / rel).read_text(encoding="utf-8")
        assert text.count(f"science-premium-layer:{code}") == 1, code
        assert "/assets/year7-science-premium.css?v=1" in text, code
        for required in ("Worked example", "Common misconception", "Exam tip", "Retrieval question"):
            assert required in text, f"{code} missing {required}"
        if code in DIAGRAM_CODES:
            c = CONTENT[code]
            expected = f'<img src="/assets/illustrations/science/{c["diagram"]}" alt="{escape(c["alt"])}" width="640" height="360" loading="lazy" decoding="async">'
            assert expected in text, f"{code} image attributes"
    assets = list(ASSET_DIR.glob("*.webp"))
    expected_names = {CONTENT[c]["diagram"] for c in DIAGRAM_CODES}
    for name in expected_names:
        p = ASSET_DIR / name
        assert p.exists(), name
        assert 0 < p.stat().st_size <= 60 * 1024, name
    print(f"PASS: {len(PAGES)}/{len(PAGES)} Year 7 Science pages upgraded")
    print(f"PASS: {len(expected_names)} reusable WebP diagrams, all <= 60 KB")


def main():
    for code in DIAGRAM_CODES:
        make_diagram(code, CONTENT[code]["diagram"])
    for code, rel in PAGES.items():
        upgrade_page(code, rel)
    validate_outputs()


if __name__ == "__main__":
    main()
