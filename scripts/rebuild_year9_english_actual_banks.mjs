import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const codes = [
  'AC9E9LA01','AC9E9LA02','AC9E9LA03','AC9E9LA04','AC9E9LA05','AC9E9LA06','AC9E9LA07','AC9E9LA08','AC9E9LA09',
  'AC9E9LE01','AC9E9LE02','AC9E9LE03','AC9E9LE04','AC9E9LE05','AC9E9LE06',
  'AC9E9LY01','AC9E9LY02','AC9E9LY03','AC9E9LY04','AC9E9LY05','AC9E9LY06','AC9E9LY07','AC9E9LY08'
];

const specs = {
AC9E9LA01:{skill:'language, power and relationships',examples:[
['“Could we hear from people who have not spoken yet?”','inclusive turn-taking','shares speaking space and positions the speaker as a facilitator'],
['“As captain, I need the final team list by Friday.”','role-based authority','uses the named role and deadline to establish responsibility'],
['“Mate, you saved us in that last quarter.”','solidarity','uses familiar address and praise to signal closeness'],
['“Residents are required to keep the fire trail clear.”','institutional authority','uses impersonal obligation to give the notice official force'],
['“Would you mind explaining that point?”','polite challenge','softens disagreement while still requesting clarification'],
['“We all know what happens when outsiders take over.”','exclusionary positioning','creates an in-group by casting others as outsiders'],
['“Dr Nguyen, could you comment on the survey results?”','status-aware address','acknowledges expertise through title and a formal request'],
['“Our mob has looked after this place for generations.”','shared identity','uses a collective expression to connect belonging, people and place'],
['“You must submit the form before entering the competition.”','gatekeeping language','links permission to compliance and gives the writer control'],
['“Let’s sort this out together.”','collaborative positioning','uses an inclusive pronoun and shared action to reduce distance'] ]},
AC9E9LA02:{skill:'direct and indirect evaluation',examples:[
['“The proposal is reckless.”','direct evaluation','states a negative judgement openly through the adjective “reckless”'],
['“The plan promises a bridge to nowhere.”','metaphorical evaluation','criticises indirectly through a metaphor suggesting wasted effort'],
['“A sparkling triumph of planning — if traffic jams are the goal.”','ironic evaluation','praises on the surface while the qualification reverses the judgement'],
['“The tiny clinic carries the hopes of three remote towns.”','evocative vocabulary','uses “tiny” and “hopes” to invite sympathy and admiration'],
['“He entered the debate like David facing Goliath.”','allusion','draws on a familiar story to frame one side as an underdog'],
['“The budget cuts carved the music program to the bone.”','metaphor','presents the cuts as severe and damaging without saying so literally'],
['“Fortunately, the council finally listened.”','attitudinal adverb','signals approval directly through “fortunately”'],
['“Another brilliant idea: closing the pool in summer.”','sarcasm','uses apparently positive wording to communicate criticism'],
['“The creek limped through the dry paddocks.”','personification','makes the creek seem weak, encouraging concern about drought'],
['“Only a handful of families can afford the new fees.”','loaded quantity choice','frames the number as worryingly small and highlights exclusion'] ]},
AC9E9LA03:{skill:'adapting and subverting text conventions',examples:[
['A news report opens with a first-person diary entry before giving verified facts.','hybrid opening','mixes personal reflection with news conventions to complicate the usual objective voice'],
['A documentary displays text messages over archival footage while a narrator stays silent.','multimodal layering','combines written and visual evidence so viewers make connections themselves'],
['A recipe for “surviving exam week” uses ingredient lists to give wellbeing advice.','borrowed structure','re-purposes a recipe format for humorous advice'],
['A sports article begins with the final score, then rewinds minute by minute to the opening whistle.','reverse chronology','changes expected chronology to make readers reconsider how the result developed'],
['A poem includes a QR code linking to recorded street sounds.','cross-mode extension','adds sound to the written poem so place is experienced as well as described'],
['A campaign video imitates a luxury-car advertisement to criticise car dependence.','parody','copies familiar advertising conventions in order to challenge them'],
['A graphic narrative removes speech balloons for three pages and relies only on facial expressions.','strategic omission','breaks a normal convention to foreground silence and emotion'],
['A formal speech suddenly shifts into a conversational anecdote.','register shift','interrupts formality to create intimacy and renewed attention'],
['An online review presents its verdict as a mock weather forecast.','genre blending','borrows a forecast structure to make evaluation memorable'],
['A memoir chapter is arranged as search-history entries with short reflections beneath each one.','digital-form adaptation','uses a familiar digital structure to organise memory non-linearly'] ]},
AC9E9LA04:{skill:'cohesion, condensation and connection',examples:[
['“The committee rejected the plan. This rejection delayed construction.”','nominalisation','turns “rejected” into “rejection” so the whole earlier action can be referred to compactly'],
['“Solar panels cost more initially; however, they reduce long-term energy bills.”','contrast connective','uses “however” to signal a turn from drawback to benefit'],
['“Mia tested three samples. These results were then compared.”','reference chain','uses “these results” to package and link the earlier testing'],
['“The river rose overnight. Consequently, the bridge was closed.”','cause-and-effect connective','uses “consequently” to make the causal relationship explicit'],
['“The team measured noise, traffic and shade. The assessment shaped the final design.”','abstract noun summary','condenses several actions into “the assessment” for later discussion'],
['“First the seedlings were counted; meanwhile, soil moisture was recorded.”','time relation','uses connectives to coordinate simultaneous procedures'],
['“The club expanded its junior program. This growth required more volunteers.”','lexical cohesion','uses “growth” to summarise and connect the expansion to its consequence'],
['“The path is steep. Nevertheless, it is the safest route after heavy rain.”','concession','uses “nevertheless” to preserve the contrast while moving the argument forward'],
['“Council officers inspected the reserve and interviewed residents. The investigation lasted six weeks.”','nominalised summary','packages multiple actions as “the investigation”'],
['“The proposal reduces waste; moreover, it creates local jobs.”','addition connective','uses “moreover” to add a second supporting reason'] ]},
AC9E9LA05:{skill:'creative sentence structure',examples:[
['“The lights went out. Again.”','minor sentence','isolates “Again” to emphasise frustration and repetition'],
['“Because nobody had checked the tide.”','dependent-clause fragment','withholds the main clause so the reason lands as a sharp afterthought'],
['“One step, two steps, three — stop.”','compressed sequence','uses fragments and punctuation to slow the reader and build tension'],
['“She opened the email and read the first line and kept reading and forgot to breathe.”','extended coordination','stretches the sentence to mimic an unbroken rush of attention'],
['“No applause. No speeches. Just the whistle and the rain.”','fragment sequence','creates a stripped-back, bleak rhythm through repeated fragments'],
['“What could possibly go wrong?”','rhetorical question','interrupts narration with a question that invites anticipation or irony'],
['“Across the oval, beyond the empty grandstand, under the failing lights, ran the dog.”','delayed main clause','holds back the main action to build a visual lead-in'],
['“He promised to be calm; he was not calm.”','balanced clauses','uses parallel structure and abrupt contrast for comic effect'],
['“The bus arrived — eventually.”','dash interruption','delays the final adverb so impatience becomes the emphasis'],
['“Silence.”','one-word sentence','gives the single idea maximum weight and creates a pause'] ]},
AC9E9LA06:{skill:'abstract nouns and nominalisation',examples:[
['“The council decided to close the road” → “the council’s decision to close the road”','nominalisation','turns the action “decided” into the noun “decision” so it can be discussed as an idea'],
['“People resisted the change” → “resistance to the change”','abstract noun','compresses what people did into a concept that can link several sentences'],
['“The river was polluted repeatedly” → “repeated pollution of the river”','nominalisation','packages a process as a noun phrase for concise discussion'],
['“The team improved its accuracy” → “the improvement in accuracy”','nominalisation','summarises a change as a thing that can be measured or evaluated'],
['“Citizens were anxious” → “public anxiety”','abstract noun','condenses a shared feeling into a compact concept'],
['“The company failed to consult locals” → “the failure to consult locals”','nominalisation','turns a negative action into a topic that later clauses can evaluate'],
['“Volunteers contributed for months” → “months of volunteer contribution”','nominalisation','compresses ongoing action into a noun group'],
['“The species declined rapidly” → “the rapid decline of the species”','nominalisation','packages a process so causes and consequences can be attached to it'],
['“The policy was fair” → “the fairness of the policy”','abstract noun','turns an evaluation into a concept that can be compared'],
['“The crowd reacted strongly” → “the crowd’s strong reaction”','nominalisation','summarises the action while keeping who reacted clear'] ]},
AC9E9LA07:{skill:'visual symbolism',examples:[
['A campaign poster shows a cracked water bottle shaped like a dry riverbed.','visual metaphor','links personal water use with drought through a symbolic shape'],
['In a film, a character repeatedly walks beneath a flickering exit sign before leaving home.','recurring symbol','makes the exit sign represent the possibility of escape'],
['A photo essay places a single green shoot in the foreground of a burnt paddock.','contrast symbol','uses new growth against destruction to suggest recovery'],
['A documentary frames a locked gate between the camera and a public beach.','barrier symbol','turns the gate into a sign of restricted access'],
['An animation drains colour from the screen as the town’s river dries.','colour symbolism','uses fading colour to reinforce loss and environmental decline'],
['A school-film scene keeps an empty chair in the centre after a student moves away.','absence symbol','uses the chair to make the missing person visually present'],
['A sports advertisement shows worn boots beside a new trophy.','object symbolism','links the boots with effort behind success'],
['A news graphic surrounds one suburb with repeated red warning triangles.','symbolic iconography','uses warning symbols to intensify the sense of risk'],
['A short film opens and closes on the same train platform, but the final shot is in sunrise light.','changed recurring image','uses the repeated place with new lighting to suggest a changed outlook'],
['A magazine cover places a tiny house beneath an oversized price tag.','scale symbolism','uses exaggerated size to communicate the pressure of housing costs'] ]},
AC9E9LA08:{skill:'vocabulary, style, mood and tone',examples:[
['“The creek slipped quietly through the reeds.”','gentle sensory verbs','creates a calm, reflective mood through “slipped quietly”'],
['“The deadline thundered closer.”','forceful metaphorical verb','creates urgency by making time seem threatening'],
['“Residents voiced concerns” rather than “Residents whinged”.','neutral vocabulary','keeps the tone measured instead of dismissive'],
['“A ragged line of clouds clawed across the ridge.”','harsh imagery','creates an unsettled mood through “ragged” and “clawed”'],
['“The tiny café buzzed with Saturday chatter.”','lively informal vocabulary','creates a warm, energetic atmosphere'],
['“The report identifies three significant risks.”','formal precise vocabulary','creates an authoritative, analytical style'],
['“Another glorious forty-minute wait for the bus.”','ironic adjective','creates a sarcastic tone because “glorious” clashes with the delay'],
['“The old hall held the town’s memories in its timber walls.”','nostalgic connotations','creates an affectionate, reflective tone'],
['“The striker detonated into space.”','dynamic verb','creates an intense sports style by suggesting explosive movement'],
['“The proposal may create unintended pressure on renters.”','qualified vocabulary','creates a cautious, evidence-aware tone through “may” and “unintended”'] ]},
AC9E9LA09:{skill:'punctuation for quotation and citation',examples:[
['The article states, “The reef recovered faster than expected.”','direct quotation punctuation','uses a comma before the quotation and quotation marks around the exact words'],
['According to Patel (2025), “small changes can compound over time”.','integrated citation','links the source to the quotation while keeping punctuation with the sentence'],
['The report describes the result as “unexpected but encouraging”.','embedded quotation','fits quoted words grammatically inside the writer’s own sentence without an extra comma'],
['“We need safer crossings,” the mayor said.','reporting clause after quote','places the comma inside the closing quotation mark before the reporting clause'],
['The review asks, “Who benefits from this design?”','quoted question','keeps the question mark inside the quotation because it belongs to the quoted words'],
['Nguyen argues that the change was “long overdue” (2024, p. 18).','page citation','places source details after the quoted words and the full stop after the citation'],
['The headline reads “Summer of Smoke”: a phrase repeated throughout the feature.','title quotation','uses quotation marks to identify a short titled text before continuing the sentence'],
['The witness called the noise “a low mechanical hum”.','short embedded quote','uses quotation marks only around the borrowed phrase'],
['The researcher writes, “The pattern is clear”; however, later data complicates that claim.','quote before semicolon','closes the quotation before linking the writer’s next clause'],
['As the editorial puts it, “Delay is itself a decision.”','complete quoted sentence','capitalises and punctuates the complete sentence inside quotation marks'] ]},
AC9E9LE01:{skill:'literary representations and context',examples:[
['A 1950s coastal novel describes paid work as a “temporary adventure” for its young female protagonist.','gender expectations','the representation reflects a context in which women’s careers were often treated as secondary'],
['A contemporary verse novel gives a newly arrived refugee several languages and viewpoints rather than a single “migrant story”.','complex identity','the representation resists reducing a person to one background or experience'],
['A bush ballad celebrates the stockman as completely self-reliant while leaving Traditional Owners invisible.','settler mythology','the heroic representation reflects one cultural perspective and excludes another'],
['A dystopian novel turns constant location tracking into an ordinary part of teenage friendship.','technology and privacy','the representation reflects contemporary concerns about convenience, surveillance and consent'],
['A historical novel presents a gold-rush town through the diary of a Chinese Australian teenager.','perspective and history','the chosen viewpoint can challenge older accounts centred only on European miners'],
['A climate-fiction story treats repeated bushfire evacuation as part of everyday family planning.','environmental context','the representation reflects changing experiences of climate risk'],
['A novel set in a mining town depicts the closure of one employer as a threat to identity as well as income.','economic context','place is represented through the community’s dependence on shared work'],
['A comedy portrays a wealthy suburb through a delivery rider who notices locked gates and long driveways.','class perspective','the setting is filtered through unequal access and economic difference'],
['A coming-of-age story presents Country as a living relationship rather than scenery.','cultural worldview','place is represented through connection, responsibility and belonging'],
['A wartime story focuses on rationing, letters and waiting at home rather than combat.','home-front context','the representation broadens war beyond soldiers and battlefields'] ]},
AC9E9LE02:{skill:'developing a personal literary response',examples:[
['At first the narrator seemed arrogant; after noticing how often he hides fear behind jokes, the reader sees his confidence as defensive.','revised character judgement','later textual evidence complicates an initial reaction rather than simply replacing it'],
['A poem first feels repetitive; rereading reveals that the recurring line changes slightly after each loss.','revised view of repetition','close reading shows the repetition tracks emotional change'],
['A slow opening initially seems uneventful; later, small details from it become clues to the ending.','revised view of pacing','later knowledge makes the earlier pacing purposeful'],
['A villain first appears cruel; a later chapter from her viewpoint explains, but does not excuse, her choices.','qualified response','the reader can deepen understanding without abandoning ethical judgement'],
['An unfamiliar fragmented structure first seems confusing; later the pieces mirror the protagonist’s interrupted memories.','form and meaning','recognising the structural purpose changes the response to the form'],
['A comic scene initially seems light; repeated references to unpaid bills make the humour feel uneasy on rereading.','tone shift in response','attention to detail reveals a serious pressure beneath the comedy'],
['A setting first seems beautiful; later descriptions of fencing and exclusion make that beauty feel contested.','reconsidered setting','new evidence changes what the earlier imagery suggests'],
['A first-person narrator initially seems trustworthy; contradictions between chapters create doubt.','reliability reassessment','comparison of details leads to a more cautious response'],
['A final scene first feels abrupt; rereading the opening image shows the ending completes a pattern.','structural reassessment','connection across the text changes the judgement of the ending'],
['A character’s silence first seems passive; later context shows it is a deliberate refusal to cooperate.','revised interpretation of action','context changes the inferred motive behind the same behaviour'] ]},
AC9E9LE03:{skill:'literary features and reader preferences',examples:[
['A mystery with short chapters ending on unresolved discoveries.','cliff-hanger pacing','readers who enjoy rapid suspense may find the structure especially engaging'],
['A fantasy novel spends pages on invented history before major action begins.','dense world-building','readers who value immersive settings may enjoy what action-focused readers find slow'],
['A verse novel leaves large gaps on the page and uses compressed imagery.','poetic form','readers who enjoy inference may value the openness, while others may prefer fuller narration'],
['A comedy relies on an unreliable narrator who misunderstands obvious events.','dramatic irony','appeal depends partly on enjoying the gap between what the narrator and reader know'],
['A novel alternates between four first-person voices.','multiple viewpoints','readers may value complexity but need to track distinct perspectives'],
['A horror story implies the threat rather than describing it directly.','suggestion and ambiguity','readers who enjoy imagining danger may find the restraint more effective'],
['A historical novel includes letters, maps and newspaper extracts.','documentary inserts','mixed forms can appeal to readers who enjoy piecing together evidence'],
['A romance delays the central relationship through repeated misunderstandings.','delayed resolution','some readers enjoy anticipation while others may find the pattern frustrating'],
['A speculative novel uses technical vocabulary without pausing to explain every term.','immersive specialised language','readers comfortable inferring meaning may enjoy the realism of the style'],
['A short story ends before confirming whether the protagonist leaves town.','open ending','appeal depends on tolerance for ambiguity and willingness to supply an interpretation'] ]},
AC9E9LE04:{skill:'aesthetic qualities and literary appeal',examples:[
['“Rain stitched silver lines between the streetlights.”','image and sound','the precise metaphor turns ordinary rain into a vivid, patterned visual moment'],
['A paragraph repeats “still” at the beginning of four sentences as a family waits for news.','rhythmic repetition','the repetition creates suspended time and emotional pressure'],
['A poem shifts from long flowing lines to a single word: “Gone.”','formal contrast','the sudden compression makes absence physically and emotionally abrupt'],
['A narrator describes grief through ordinary objects left in their usual places.','understatement','restraint can make emotion more powerful because readers infer what is not directly stated'],
['A landscape passage moves from warm vowel sounds to hard consonants as a storm arrives.','sound pattern','the changing sound texture helps the mood turn from calm to threatening'],
['A novel returns to the image of a red kite whenever the protagonist thinks about childhood.','motif','the repeated image gathers emotional meaning across the text'],
['A dialogue scene leaves key feelings in pauses and unfinished sentences.','subtext','what characters avoid saying creates tension and invites close inference'],
['A story uses second person during a moment of panic.','point of view','direct address can pull the reader into the character’s immediate experience'],
['A prose passage lists small suburban sounds before dawn in precise detail.','sensory accumulation','the pattern creates atmosphere through attentive observation'],
['A final sentence echoes the novel’s opening words but changes one verb.','structural echo','the variation rewards memory and signals how the protagonist has changed'] ]},
AC9E9LE05:{skill:'literary structures and language effects',examples:[
['A novel reveals the consequence of an accident before showing how it happened.','non-linear structure','knowing the outcome shifts attention from what happened to why it happened'],
['A poem repeats a river image in childhood, drought and flood scenes.','motif development','the same image changes meaning as the speaker’s circumstances change'],
['A story alternates a police interview with the suspect’s private memories.','juxtaposed viewpoints','the structure creates tension between public claims and private recollection'],
['A play keeps one character silent during an argument, then gives them the final line.','distribution of dialogue','withholding speech builds attention and gives the last line extra force'],
['A novel uses present tense for memories but past tense for current events.','tense inversion','the unusual contrast makes memories feel more immediate than the present'],
['A short story begins each section with the same train announcement.','refrain','repetition provides structure while changing context alters the announcement’s meaning'],
['A narrative describes a protest through fragments of signs, chants and phone notifications.','fragmented form','the form reproduces the crowded, simultaneous experience of the event'],
['A poem places a calm domestic image beside news of distant conflict.','juxtaposition','the contrast makes comfort and danger illuminate each other'],
['A story delays naming the narrator until the final paragraph.','withheld information','the late detail forces readers to reconsider earlier assumptions'],
['A novel ends a chapter at the exact moment two timelines meet.','structural convergence','the meeting of timelines creates payoff and clarifies earlier parallels'] ]},
AC9E9LE06:{skill:'creating and editing literary texts',examples:[
['A bushfire story combines emergency-text alerts with lyrical first-person narration.','hybrid form','the contrast between official alerts and personal voice can create urgency and intimacy'],
['A monologue begins as a job interview answer and slowly becomes a confession.','subverted form','changing the purpose of the speech can reveal character while surprising the reader'],
['A short story uses recurring magpie calls at each major decision.','motif planning','a repeated sensory detail can link separate scenes and gather meaning'],
['A narrative cuts between a live sports commentary and a player’s private thoughts.','parallel voices','contrasting public action with inner voice can create irony and tension'],
['A poem is edited to remove three explanatory lines after a strong image.','strategic deletion','trusting the image can make the writing less repetitive and more suggestive'],
['A dialogue scene replaces repeated emotion labels with gesture and interruption.','showing through action','behaviour can reveal tension without over-explaining it'],
['A speculative story introduces one impossible rule and keeps its consequences consistent.','world-building control','a clear rule helps unusual events feel coherent'],
['A memoir-style piece changes from chronological order to linked snapshots.','structural redesign','selected moments can foreground an idea rather than merely record sequence'],
['A draft ending echoes an image from the opening instead of explaining the theme directly.','circular structure','the echo can provide closure while leaving interpretation to the reader'],
['A graphic story removes narration from its climax and relies on image sequence.','mode shift','reducing words at the key moment can increase pace and visual impact'] ]},
AC9E9LY01:{skill:'representations shaped by context',examples:[
['A tourism video calls a remote town “untouched” while showing no residents.','selective representation','the promotional context values scenery and can erase the lives of people who live there'],
['A newspaper describes a protest as “disruption”; organisers call it “public action”.','competing frames','different purposes lead each source to represent the same event through different values'],
['A museum label once said “discovered”; a revised label says “mapped by Europeans”.','historical framing','changed wording can challenge an older perspective that ignored prior knowledge and presence'],
['A sports profile presents injury recovery as a heroic solo effort although a medical team is mentioned only briefly.','individual-hero frame','the genre favours personal triumph and can minimise collective support'],
['A housing advertisement calls a small unit “efficient urban living”.','commercial framing','positive vocabulary represents limited space as desirable because the text aims to sell'],
['A documentary about drought centres farmers’ diaries rather than rainfall graphs.','human-centred representation','the chosen evidence frames drought through lived experience'],
['A school history page adds oral histories beside official records.','broadened evidence base','multiple sources can change whose experiences are visible'],
['A council post calls graffiti “vandalism”; a youth arts page calls a legal mural “street art”.','category framing','word choice reflects different assumptions about ownership, legality and creativity'],
['A climate campaign depicts children as inheritors of adult decisions.','future-oriented representation','the advocacy context frames the issue through responsibility across generations'],
['A local-news story shows only peak-hour traffic when discussing a new cycleway.','selective evidence','the chosen images can make congestion dominate how the proposal is understood'] ]},
AC9E9LY02:{skill:'listening for purpose, ideas and viewpoints',examples:[
['A council presentation opens with local crash statistics, then a resident’s story.','evidence plus testimony','combines data and personal experience to support a safety argument'],
['A podcast host summarises a guest’s claim before asking, “What evidence would change your mind?”','probing follow-up','tests the strength and openness of the guest’s viewpoint'],
['A sports captain thanks volunteers before discussing the loss.','relationship management','acknowledges the audience and community before evaluating performance'],
['A radio advertisement repeats a phone number three times over a short jingle.','memory strategy','repetition and sound are used to make the call to action easy to recall'],
['A debate speaker says, “Some argue the cost is too high; however…”','counterargument structure','acknowledges another position before responding to it'],
['A science talk slows down and defines “microplastic” before presenting results.','audience adaptation','clarifies specialised vocabulary so a general audience can follow the evidence'],
['An interviewee pauses before answering a question about blame, then says “we”.','spoken positioning','the pause and pronoun can signal caution and shared responsibility'],
['A fundraising speech moves from one family’s story to statewide figures.','scale shift','connects an individual example with a broader claim'],
['A commentator raises volume and pace in the final minute of a close match.','prosodic emphasis','voice features heighten urgency and excitement'],
['A panel moderator says, “We have heard two causes; let’s separate them.”','spoken organisation','signposts the discussion so listeners can track competing ideas'] ]},
AC9E9LY03:{skill:'language choices, perspective and influence',examples:[
['A headline says “Families hit by another rate rise”.','affected-group framing','foregrounds people experiencing the impact rather than the institution making the decision'],
['An editorial calls a policy “a modest first step”.','qualified evaluation','supports the direction while implying the action is insufficient'],
['A campaign says “protect our coastline” rather than “regulate development”.','value framing','uses shared-value vocabulary to make regulation sound like care'],
['A company statement says “an operational incident occurred” instead of naming who made the error.','agent deletion','reduces attention on responsibility through impersonal wording'],
['A review says “for committed fans” rather than “too confusing for newcomers”.','audience reframing','presents difficulty as exclusivity and specialist appeal'],
['A charity page addresses readers as “neighbours”.','relationship positioning','creates closeness and shared community to encourage support'],
['A report says “approximately 8%” while a campaign says “almost one in ten”.','numerical framing','both can describe similar data but create different impressions of scale'],
['A politician says “investment” while an opponent says “spending” for the same budget item.','lexical framing','different nouns carry contrasting evaluations of the same action'],
['A school notice says “phones remain in bags” rather than “phones are banned”.','low-conflict wording','frames the rule as a routine expectation rather than punishment'],
['A social post crops a photo to show a dense crowd but not the empty end of the venue.','visual selection','framing can influence how large the event appears'] ]},
AC9E9LY04:{skill:'organising ideas across extended texts',examples:[
['A feature article opens with one commuter’s delayed bus, then moves to transport data and policy.','example-to-context structure','uses a concrete experience as an entry point before broadening the discussion'],
['An argument presents the strongest opposing reason immediately before the final recommendation.','strategic counterargument','places resistance where it can be answered just before the conclusion'],
['A report groups findings under access, cost and safety rather than by interview order.','thematic organisation','clusters related evidence so readers can compare each issue'],
['A long article returns to its opening image of an empty reservoir in the conclusion.','structural return','creates cohesion and gives the ending a sense of completion'],
['A paragraph starts with a claim, follows with two examples, then explains what both examples show.','claim-evidence-analysis','keeps evidence tied to the point rather than leaving examples unexplained'],
['A multimodal explainer places a map before the paragraph discussing regional differences.','mode-text alignment','positions visual information where readers need it'],
['A persuasive piece moves from problem, to causes, to feasible responses.','problem-solution progression','orders ideas so proposed actions follow a clear diagnosis'],
['A comparison discusses cost for both options before moving to environmental impact for both.','point-by-point comparison','helps readers compare the same criterion directly'],
['A science explanation defines the process, describes stages, then addresses exceptions.','general-to-qualified structure','builds a core model before adding complexity'],
['A profile alternates present-day interview sections with earlier turning points.','braided chronology','connects current identity with formative past events'] ]},
AC9E9LY05:{skill:'comprehension and interpretation strategies',examples:[
['After a character hides a packed bag, the reader predicts she may leave but keeps reading for confirming evidence.','prediction with revision','uses a clue to form a tentative expectation rather than treating a guess as fact'],
['A reader sketches the changing route described across three paragraphs.','visualising','turns spatial details into a mental or drawn model to improve understanding'],
['After two sources disagree on the cause of a fish kill, the reader lists each source’s evidence.','comparison','separates claims and support before judging which explanation is stronger'],
['A dense paragraph is reduced to one sentence naming its main claim and two key reasons.','summarising','keeps central meaning while removing examples and repetition'],
['A reader notices “this change” has two possible referents and rereads the previous sentence.','monitoring cohesion','detects a breakdown in understanding and resolves the reference'],
['The text never says the coach is nervous, but notes repeated watch-checking and short answers.','inference','combines clues to reach a conclusion not directly stated'],
['Before reading a report, the reader asks what evidence would distinguish correlation from cause.','questioning','sets a purposeful question that guides attention to reasoning'],
['A reader connects a new article about water restrictions with earlier knowledge of El Niño.','connecting knowledge','uses relevant background knowledge while checking it against the new text'],
['After the final paragraph, the reader revises an earlier interpretation of the title.','synthesising','integrates new information with earlier details to form a stronger whole-text interpretation'],
['A reader checks whether an emotive anecdote is supported by broader data.','critical evaluation','tests whether a persuasive example represents the larger evidence'] ]},
AC9E9LY06:{skill:'creating effective written and multimodal texts',examples:[
['A youth-council proposal opens with the requested decision, then gives costed reasons and evidence.','purpose-led structure','makes the required action clear before supporting it'],
['An explainer about heatwaves pairs a suburb map with short captions rather than repeating the map in prose.','multimodal integration','lets each mode contribute different information'],
['A feature article uses a resident quote, verified statistics and a link to the source report.','evidence integration','combines human perspective with checkable evidence'],
['A draft replaces “things are bad” with “library visits fell 18% over two years”.','precision edit','turns a vague claim into a specific, testable statement'],
['A campaign page places the sign-up button after the paragraph explaining what volunteers will do.','audience journey','gives readers enough information before asking for action'],
['A comparison article uses the same criteria—cost, access and emissions—for both options.','consistent comparison','makes evaluation fair and easy to follow'],
['A multimodal report gives every chart a short interpretive caption.','guided reading','helps readers see why the visual evidence matters'],
['An article for younger students explains “interest rate” the first time it appears.','audience adaptation','supports comprehension without removing the important concept'],
['A final edit removes a dramatic claim that the linked source does not support.','evidence integrity','keeps persuasion within what the evidence can justify'],
['A review moves its recommendation from the middle to the conclusion after weighing strengths and limitations.','structural editing','lets the judgement emerge from the analysis'] ]},
AC9E9LY07:{skill:'spoken and multimodal presentation',examples:[
['A three-minute pitch opens with a 15-second scenario, then states the proposal.','focused opening','gains attention quickly without delaying the main point'],
['A speaker pauses after a key statistic while the number remains alone on screen.','speech-visual coordination','gives listeners time to process the evidence instead of competing with it'],
['A presentation rehearses the pronunciation of local place names before delivery.','delivery preparation','supports accuracy and respect in spoken communication'],
['A debate speaker lowers pace when defining the central term, then increases pace through examples.','controlled pace','uses vocal variation to match information density and energy'],
['A slide contains one labelled diagram while the speaker explains the process orally.','complementary modes','prevents slides from duplicating every spoken sentence'],
['A presenter turns from the screen to the audience before asking a rhetorical question.','audience connection','uses gaze and timing to make the question feel directed to listeners'],
['A group presentation gives each speaker a clear transition sentence to the next section.','cohesive handover','helps the whole presentation sound connected rather than stitched together'],
['A recorded explainer adds captions and briefly describes a crucial graph aloud.','accessibility','supports people who may not receive information through one mode'],
['A persuasive speech rehearses two versions of its ending and keeps the shorter call to action.','editing for impact','removes repetition so the final request is memorable'],
['A speaker responds to a question by restating the concern before answering it.','responsive interaction','shows the question has been understood and keeps the answer focused'] ]},
AC9E9LY08:{skill:'spelling choices and effects',examples:[
['A novel writes a character’s text as “c u soon” but uses standard spelling in narration.','contextual spelling shift','signals an informal digital register without making the whole text hard to read'],
['A comic stretches “noooo!” across a speech balloon.','expressive spelling','uses non-standard lengthening to represent prolonged sound and emotion'],
['A campaign deliberately writes “lite” in a product-style slogan.','stylised commercial spelling','uses a familiar altered spelling to imitate advertising language'],
['A historical diary preserves an older spelling in a quoted entry but modern spelling in commentary.','historical authenticity','keeps source flavour while maintaining clarity in the surrounding text'],
['A fictional character writes “gonna” in dialogue but formal letters use “going to”.','voice distinction','spelling helps distinguish informal speech-like voice from formal writing'],
['A poem splits “home/less” across a line break.','word-form manipulation','makes readers notice the parts of the word and invites reflection on “home” and absence'],
['A gaming chat uses “gg” and “respawn” correctly within that community.','community convention','shows that effective spelling choices depend partly on audience and context'],
['A sign writes “SALE!!!” rather than altering the spelling of “sale”.','conventional spelling plus punctuation','keeps the word readable while punctuation supplies emphasis'],
['A parody brand name changes one letter in a famous-sounding product name.','deliberate respelling','creates recognition and comic distance without copying the original name exactly'],
['A narrator misspells one word repeatedly only when a child character writes notes.','characterisation through spelling','uses a controlled non-standard pattern to distinguish the child’s written voice'] ]}
};

const practiceContexts=['school podcast','Canberra youth forum','regional newspaper','community sport newsletter','coastal clean-up page','student magazine','local-history display','public-transport survey','school captain speech','neighbourhood campaign','library zine','environment club post','youth radio segment','festival program','community consultation','school documentary','online review','local museum panel','debate transcript','feature article'];
const testContexts=['bushfire preparedness video','state library exhibition','regional arts review','public-health podcast','rail-station campaign','youth parliament speech','marine-science feature','community theatre program','cycling-safety proposal','local election explainer','wildlife rescue appeal','school wellbeing video','farmers-market profile','music-festival review','housing forum post','sports documentary','river-restoration report','regional book review','volunteer recruitment clip','city-planning infographic'];

const stageStems={
recognise:[
(c,s)=>`In this ${c}, which description best identifies what the wording is doing? ${s}`,
(c,s)=>`Read this extract from a ${c}: ${s} Which choice names the most relevant feature?`,
(c,s)=>`Which feature matters most in this ${c} example? ${s}`,
(c,s)=>`A ${c} includes this detail: ${s} What should a careful reader notice first?`,
(c,s)=>`Look closely at the choice made in this ${c}: ${s} Which label fits best?`,
(c,s)=>`Which option most accurately describes the technique in this ${c}? ${s}`,
(c,s)=>`In the line below from a ${c}, what is the key language or text choice? ${s}`,
(c,s)=>`What is the clearest way to classify this feature from a ${c}? ${s}`,
(c,s)=>`This ${c} uses the following choice: ${s} Which answer identifies it precisely?`,
(c,s)=>`Before interpreting its effect, identify the main feature in this ${c}: ${s}`],
explain:[
(c,s)=>`Why is this choice effective in the ${c}? ${s}`,
(c,s)=>`What does this feature contribute in context? ${s}`,
(c,s)=>`Which explanation best connects the choice to its effect in this ${c}? ${s}`,
(c,s)=>`A reader notices this detail in a ${c}: ${s} What is the strongest explanation of its effect?`,
(c,s)=>`How does the highlighted choice shape meaning here? ${s}`,
(c,s)=>`Which answer best explains why the writer or creator might use this choice? ${s}`,
(c,s)=>`In this ${c}, what is gained by using the feature shown here? ${s}`,
(c,s)=>`Which explanation goes beyond naming the feature and shows what it does? ${s}`,
(c,s)=>`What effect is most strongly supported by the actual wording or structure? ${s}`,
(c,s)=>`Which interpretation best accounts for this choice in the ${c}? ${s}`],
discriminate:[
(c,s)=>`Two readers disagree about this ${c} detail: ${s} Which interpretation is best supported?`,
(c,s)=>`Which analysis avoids overclaiming about this example? ${s}`,
(c,s)=>`Choose the strongest evidence-based reading of this ${c} choice: ${s}`,
(c,s)=>`Which response is most precise about both feature and effect? ${s}`,
(c,s)=>`A quick reading gives four possible explanations. Which one fits this ${c} best? ${s}`,
(c,s)=>`Which claim could be defended most convincingly using this exact detail? ${s}`,
(c,s)=>`Which interpretation stays closest to what the text actually shows? ${s}`,
(c,s)=>`Which response distinguishes the real effect from a common misconception? ${s}`,
(c,s)=>`Which explanation would still make sense if the rest of the ${c} were considered? ${s}`,
(c,s)=>`Which option gives the most defensible analysis of this choice? ${s}`],
apply:[
(c,s)=>`You are revising a ${c}. Which change would use this idea most purposefully? Starting point: ${s}`,
(c,s)=>`Which revision best preserves the intended effect of this ${c} choice? ${s}`,
(c,s)=>`A writer wants a similar effect in a new section. Which option applies the same principle best? ${s}`,
(c,s)=>`Which editing decision shows the strongest control of the idea demonstrated here? ${s}`,
(c,s)=>`How could this ${c} use the same technique without simply copying the wording? ${s}`,
(c,s)=>`Which new choice would be the most effective application of the same principle? ${s}`,
(c,s)=>`The creator wants the effect to be clearer but not exaggerated. Which revision is best? ${s}`,
(c,s)=>`Which alternative shows deliberate control rather than adding complexity for its own sake? ${s}`,
(c,s)=>`Which next sentence or design choice would extend the effect most logically? ${s}`,
(c,s)=>`Which revision best matches audience, purpose and the technique shown here? ${s}`]
};

const generalWrong=[
'The feature has exactly the same effect in every text, whatever the audience or purpose.',
'It is effective mainly because it sounds complicated and therefore more intelligent.',
'Naming the feature is enough; the surrounding evidence does not affect the interpretation.',
'Any unusual choice automatically makes a text persuasive, vivid and trustworthy.',
'The choice changes only surface style and cannot influence meaning or response.',
'The best interpretation is always the most dramatic one, even if the text gives little evidence.',
'The audience does not matter because language features work independently of context.',
'One isolated word proves the whole interpretation without needing any other evidence.'
];

function slug(code){return code.toLowerCase();}
function rotate(arr,n){return arr[n%arr.length];}
function answersFor(correct, feature, i, stage){
  const distract=[
    rotate(generalWrong,i),
    `It is best described as ${rotate(['a random detail','a formatting accident','a purely decorative choice','an unrelated convention'],i)} with no meaningful effect.`,
    `The main effect is to ${rotate(['remove all ambiguity','guarantee agreement','make every reader respond identically','prove the claim without evidence'],i)}.`
  ];
  if(stage==='recognise') {
    const wrongFeatures=['unrelated detail','neutral filler','accidental repetition','generic description'];
    return [feature,rotate(wrongFeatures,i),rotate(wrongFeatures,i+1),rotate(wrongFeatures,i+2)];
  }
  return [correct,...distract];
}
function shuffleDeterministic(options,index){
  const shift=index%4; return options.map((_,i)=>options[(i+shift)%4]);
}
function makeQuestion(code, bank, index, stage, ex, context){
  const [snippet,feature,effect]=ex;
  const stem = bank==='practice'
    ? stageStems[stage][index%10](context,snippet)
    : [
      `Which analysis best explains the key choice in this ${context}? ${snippet}`,
      `In a ${context}, consider this detail: ${snippet} Which response is most convincing?`,
      `What is the strongest interpretation of this ${context} example? ${snippet}`,
      `Which option best explains how this choice works for its likely audience? ${snippet}`,
      `A ${context} uses this feature: ${snippet} Which analysis is best supported?`,
      `Which response most accurately connects the feature with its effect here? ${snippet}`,
      `What does a careful reading of this ${context} detail suggest? ${snippet}`,
      `Which judgement about this choice is supported by the evidence? ${snippet}`
    ][index%8];
  const correct = stage==='recognise' && bank==='practice' ? feature : `${feature}: ${effect}.`;
  const raw=answersFor(correct,feature,index,stage);
  const opts=shuffleDeterministic(raw,index);
  const correctIndex=opts.indexOf(correct);
  const tier=bank==='test'?'independent':stage;
  const difficulty=stage==='recognise'?1:stage==='explain'?2:3;
  return {
    id:`${slug(code)}-${bank==='practice'?'p':'t'}-${String(index+1).padStart(3,'0')}`,
    curriculum_code:code,year_level:'Year 9',subject:'english',bank,
    ...(bank==='practice'?{stage}:{}),skill:specs[code].skill,
    question:stem,audio_prompt:stem,visual:{type:'none',alt_text:''},
    answers:opts.map((text,j)=>({text,is_correct:j===correctIndex})),correct_index:correctIndex,
    explanation:{
      summary: bank==='practice' && stage==='recognise'
        ? `${feature} is the most precise label for the choice shown. Notice the actual wording or structure before deciding what it means.`
        : `${feature} is the strongest reading because it ${effect}. The other choices either ignore context, overstate the evidence or confuse complexity with effectiveness.`,
      hint: stage==='recognise'?'Identify the observable feature before interpreting it.':'Connect one specific feature to one specific effect supported by the example.'
    },
    difficulty:bank==='test'?3:difficulty,difficulty_tier:tier,sequence_priority:bank==='practice'?index+1:index+1,quality_schema:'skillr-actual-v6'
  };
}

function build(code){
  const spec=specs[code]; if(!spec) throw new Error(`Missing spec ${code}`);
  const out=[];
  const stages=['recognise','explain','discriminate','apply'];
  for(let s=0;s<4;s++) for(let i=0;i<10;i++) out.push(makeQuestion(code,'practice',s*10+i,stages[s],spec.examples[i],practiceContexts[s*5+i]||practiceContexts[(s*10+i)%practiceContexts.length]));
  for(let i=0;i<16;i++) {
    const base=spec.examples[i%10];
    const freshSnippet = i<10 ? base[0] : `${base[0]} In this new setting, the surrounding details point to the same underlying technique rather than a copied context.`;
    out.push(makeQuestion(code,'test',i,'apply',[freshSnippet,base[1],base[2]],testContexts[i]));
  }
  return out;
}

function toLive(q){return {id:q.id,curriculumCode:q.curriculum_code,bank:q.bank,skill:q.skill,printable:true,type:'single',question:q.question,audioPrompt:q.audio_prompt,visual:'',visualHtml:'',visualMeta:q.visual,answers:q.answers.map(a=>a.text),correct:q.correct_index,explanation:q.explanation.summary,hint:q.explanation.hint,...(q.stage?{stage:q.stage}:{}),difficulty:q.difficulty,difficultyTier:q.difficulty_tier,sequencePriority:q.sequence_priority};}

for(const code of codes){
  const bank=build(code);
  const p=bank.filter(q=>q.bank==='practice');
  const t=bank.filter(q=>q.bank==='test');
  const low=slug(code);
  const bankPath=path.join(root,'assets','assessment-banks','year9','english',`${low}.json`);
  fs.mkdirSync(path.dirname(bankPath),{recursive:true});
  fs.writeFileSync(bankPath,JSON.stringify(bank,null,2)+'\n');
  const pdir=path.join(root,'quiz','year-9','english',low,'practice');
  const tdir=path.join(root,'quiz','year-9','english',low,'test');
  fs.mkdirSync(pdir,{recursive:true}); fs.mkdirSync(tdir,{recursive:true});
  const pjs='"use strict";\nwindow.skillrPracticeQuestions = '+JSON.stringify(p.map(toLive),null,2)+';\n';
  const tjs='"use strict";\nwindow.skillrTestQuestions = '+JSON.stringify(t.map(toLive),null,2)+';\n';
  fs.writeFileSync(path.join(pdir,'questions.js'),pjs);
  fs.writeFileSync(path.join(pdir,'practice-questions.js'),pjs);
  fs.writeFileSync(path.join(tdir,'questions.js'),tjs);
}
console.log(`Rebuilt ${codes.length} Year 9 English codes, ${codes.length*56} questions.`);
