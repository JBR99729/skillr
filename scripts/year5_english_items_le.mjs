const split = text => text.trim().split("\n").map(line => line.trim()).filter(Boolean).map(line => line.split("|"));

const build = (rows, make) => rows.map((row, index) => {
  const item = make(row, index);
  return {
    question: item.question,
    correct: item.correct,
    wrongs: item.wrongs,
    summary: item.summary,
    hint: item.hint,
    focus: item.focus,
    visualKind: item.visualKind || "evidence-cards",
    visualDescription: item.visualDescription || `Evidence card for ${row[0]}`
  };
});

const preference = split(`
The Last Lantern|a delayed reveal explains why the lantern keeps flashing|suspense|the reveal rewards careful clue-finding
River Rescue|short action sentences speed up the dangerous crossing|pace|the quick rhythm makes the rescue urgent
Mina's Map|Mina admits her mistake and redraws the route|character growth|her honest change feels convincing
The Clockmaker's Cat|the cat misunderstands every mechanical sound|humour|the repeated mistakes create a playful pattern
Cloud Country|blue-grey watercolour spreads across wide empty pages|visual mood|the open space feels lonely and calm
The Secret Seed|a tiny seed returns in each chapter before it finally grows|structure|the recurring detail builds anticipation
Grandpa's Radio|first-person memories connect songs with family events|viewpoint|the personal voice creates warmth
The Paper Dragon|precise folding details make the imaginary dragon believable|description|concrete details help readers picture the magic
Night at Pelican Bay|the narrator notices footprints but dismisses them|inference|readers predict danger before the narrator does
The Unlikely Team|two rivals solve the problem by combining different skills|theme|cooperation develops through their actions
Mooncake Mix-Up|formal announcements contrast with chaotic kitchen scenes|humour|the contrast makes the disaster funnier
Under the Fig Tree|sensory details connect the setting with belonging|setting|the place carries emotional meaning
The Borrowed Bicycle|each failed repair creates a harder choice|plot|the linked consequences sustain interest
Song for the Reef|repeated wave-like lines slow the reading pace|rhythm|the pattern echoes gentle water
The Glass Mountain|the hero succeeds by listening rather than fighting|character|the unexpected choice makes the hero thoughtful
Letters from Camp|dated letters reveal confidence growing over a week|structure|the sequence makes change easy to trace
The Mango Thief|readers know the possum's plan but the gardener does not|dramatic irony|the knowledge gap creates amused anticipation
Storm Bird|sharp verbs and dark silhouettes make the storm threatening|language and image|both modes intensify danger
The Long Walk Home|small acts of help matter more than the final prize|theme|the events make kindness memorable
Museum After Midnight|ordinary exhibits are described as if they are waking|imagery|the transformation makes the setting mysterious
The Kite Contest|alternating viewpoints show why both cousins feel cheated|viewpoint|both perspectives complicate blame
The Quiet Goal|crowd noise disappears during the deciding kick|pacing|the pause focuses attention on one moment
Turtle Track|factual details are woven into a hatchling's journey|information in story|readers learn while caring about the character
The Red Umbrella|the final image echoes the opening but changes its meaning|ending|the echo gives satisfying closure
TEST The Hidden Platform|clues in station signs lead to a surprising but logical reveal|mystery structure|the ending can be inferred from evidence
TEST A Place for Niko|the new student compares unfamiliar places with home|connection|the comparisons make adjustment relatable
TEST The Rain Jar|the jar's changing sound marks each stage of the drought|motif|the repeated object tracks tension
TEST Saturday Robots|technical words are mixed with sibling banter|voice|the blend makes invention lively and believable
TEST The Coral Door|bright foreground shapes hide a shadow in the distance|visual suspense|the hidden detail invites close viewing
TEST Three Wishes Left|each wish solves one problem but causes another|plot|cause and consequence keep choices meaningful
TEST The Baker's Comet|warm food imagery contrasts with the cold night sky|imagery|the contrast creates wonder and comfort
TEST Home Team|a boastful captain gradually begins asking teammates for advice|character arc|changed actions show earned growth
TEST The Whispering Steps|repeated soft consonants accompany a cautious climb|sound pattern|the quiet rhythm supports tension
TEST Postcard from Mars|a child narrator treats extraordinary sights as everyday|viewpoint|the casual voice creates humour
TEST The Empty Chair|conversation avoids naming the absent person until the end|revelation|withheld information creates emotion
TEST Market Morning|crowded panels become wider as the child finds family|visual sequence|layout mirrors movement from worry to relief
TEST The Second Key|two possible explanations remain supported at the ending|open ending|evidence lets readers debate both possibilities
TEST Lanterns on the Lake|shared preparation matters more than winning|theme|actions develop community values
TEST The Wind Collector|invented comparisons follow one clear weather image|figurative pattern|coherent imagery makes the fantasy vivid
TEST One More Over|match commentary is interrupted by the player's private thoughts|structure|outer action and inner worry build tension`);

const soundVisual = split(`
forest warning|whispering leaves, widening shadows|unease|sound and image make danger seem closer
busy workshop|clink, clatter, bright diagonal tools|energy|rhythm and angled shapes suggest rapid work
sleepy harbour|slow repeated waves, pale horizontal lines|calm|both choices create a gentle pace
approaching train|rumble grows louder, train fills each panel|anticipation|sound and scale show approach
summer storm|crack, jagged white line on black cloud|shock|the sudden sound and contrast startle readers
secret meeting|hushed repeated h sounds, figures framed through a doorway|secrecy|quiet sound and narrow framing make readers feel hidden
celebration|drumbeat repetition, warm circles around dancers|joy|rhythm and colour create shared excitement
lonely journey|long vowels, tiny traveller in wide snow|isolation|slow sound and scale emphasise distance
comic chase|boing and bump, tilted panels|humour|exaggerated sounds and angles make movement playful
reef poem|swishing s sounds, curved schools of fish|flow|sound and lines mimic water movement
angry argument|clipped phrases, red figures facing apart|conflict|sharp rhythm and spacing show division
morning garden|buzz and flutter, close-up yellow flowers|liveliness|sound words and salience focus busy life
memory scene|soft refrain, faded border|nostalgia|repetition and muted colour suggest the past
giant entrance|thud repeated, low-angle view|power|heavy sound and angle make the giant dominant
lost child|call echoed, maze-like overhead view|confusion|echo and layout stress uncertainty
winning moment|heartbeat slows, close-up on hands|focus|sound and framing narrow attention
night river|lapping rhythm, moon reflection broken across panels|mystery|pattern and fragmented light unsettle the calm
market poem|rhyming calls, overlapping signs|bustle|sound and crowded composition create activity
bird escape|fluttering consonants, figure crossing panel borders|freedom|sound and layout suggest quick release
cave discovery|drip then silence, torch circle on wall|suspense|pause and spotlight delay the reveal
sad farewell|repeated name, cool empty platform|loss|repetition and space hold attention on absence
race finish|short beats, narrowing panels|speed|rhythm and sequence accelerate the ending
campfire tale|crackling words, faces lit below|tension|sound and lighting make the story eerie
city sunrise|rising rhythm, colour shifts grey to gold|hope|sound and colour show awakening
TEST mountain warning|low repeated boom, dark peak above tiny tents|threat|sound and scale make nature powerful
TEST robot dance|metallic clicks, repeated square poses|precision|sound and shapes create mechanical rhythm
TEST underwater dream|muffled refrain, floating translucent layers|dreaminess|soft repetition and layers blur reality
TEST door opening|creak stretches, narrow strip of light widens|suspense|sound duration and changing light delay knowledge
TEST playground rush|chant speeds up, curved motion lines overlap|excitement|pace and movement build shared energy
TEST quiet protest|one phrase repeats, still figures fill the foreground|determination|repetition and salience give the group strength
TEST owl flight|soft whoosh, wings form a frame around the moon|grace|sound and composition guide a smooth movement
TEST broken machine|splutter then stop, gears scatter across panels|failure|interrupted sound and sequence show collapse
TEST desert heat|hissing wind, wavering horizon|discomfort|sound and distorted line suggest harsh heat
TEST surprise party|silence followed by a burst, page turns from dark to bright|surprise|contrast across the page turn creates the reveal
TEST tense countdown|numbers repeat, close-ups alternate between clock and eyes|pressure|repetition and cuts make time feel urgent
TEST peaceful ending|lullaby refrain, circular image returns to home|closure|sound and shape settle the story
TEST crowded bus|overlapping chatter, compressed figures|confinement|sound and spacing create discomfort
TEST magical tree|leaves chime, gold branch is central and brightest|wonder|sound and salience mark the tree as extraordinary
TEST chase reversal|heavy footsteps become light taps, pursuer shrinks in panels|relief|sound and scale show danger fading
TEST remembered song|one melody line returns, old and new scenes share blue tones|connection|repetition and colour link past with present`);

const representation = split(`
arrival at a new town|a child notices unfamiliar street names before friendly faces|uncertain then hopeful|selection follows the child's changing comfort
bushfire recovery|community members repair a hall together|resilient and collective|actions emphasise cooperation rather than helplessness
river journey|the river is described as a guide with remembered pathways|knowledgeable place|personification connects place and memory
school race|the event is narrated by the runner who finishes last|personally meaningful|viewpoint values persistence over winning
historic voyage|a diary records fear while an official notice declares success|contested|contrasting sources reveal different experiences
city park|close-ups show insects beneath busy walkers|layered habitat|visual angle reveals life people overlook
family feast|each speaker remembers the same recipe differently|shared but varied|multiple viewpoints prevent one fixed memory
storm evacuation|a child focuses on carrying the family photo album|emotional|selected detail shows what feels valuable
football final|the substitute observes teamwork from the sideline|analytical|distance helps the narrator notice relationships
remote landscape|specific plants, tracks and seasonal changes shape travel|active and detailed|precise evidence avoids an empty backdrop
market dispute|two stallholders describe the same accident differently|uncertain|viewpoint shapes blame
first day|humorous comparisons soften an intimidating classroom|manageable|language reflects the narrator's coping response
old bridge|different generations attach different stories to it|contested memory|voices show place has multiple meanings
festival|preparation and quiet responsibilities appear before spectacle|community work|selection values unseen contribution
lost dog search|an overhead map shows paths the narrator cannot see|dramatic perspective|image gives readers broader knowledge
coastal change|before-and-after descriptions show dunes moving|dynamic setting|time comparison presents place as changing
leader's decision|private doubts contrast with confident public speech|complex character|inside and outside views resist a simple label
power outage|neighbours' small choices become the main events|resourceful community|ordinary actions construct resilience
museum object|the object's imagined voice challenges its display label|questioned authority|viewpoint invites readers to reconsider ownership
migration story|food smells trigger memories without explaining every feeling|layered identity|sensory detail suggests connection indirectly
rain event|farmer, child and frog experience the same rain differently|multiple impact|parallel viewpoints show perspective depends on needs
playground conflict|the scene begins after the argument|incomplete|omitted causes make early judgement unreliable
mountain climb|low-angle images become eye-level after help arrives|changing power|camera angle tracks vulnerability and support
harbour morning|workers are named through precise tasks and dialogue|skilled community|specific portrayal avoids a faceless crowd
TEST flood account|news headline and resident's letter emphasise different details|contrasting|genre and purpose shape representation
TEST forest meeting|animals describe a clearing as home, food source or danger|plural place|viewpoints construct different meanings
TEST invention story|mistakes and revisions receive more space than success|persistent inventor|selection values process
TEST ancient event|present-day narrator admits gaps in the family account|limited memory|qualification avoids claiming complete knowledge
TEST team conflict|captain's narration omits a teammate's earlier warning|biased event|omission changes reader judgement
TEST island setting|weather, routes and local names influence every decision|active place|setting shapes events rather than decorating them
TEST public ceremony|backstage workers appear in silent visual panels|expanded focus|images represent contribution absent from speech
TEST classroom debate|each child uses different evidence for the same proposal|diverse reasoning|dialogue distinguishes viewpoints respectfully
TEST rescue|rescued character plans and signals before help arrives|capable|actions avoid representing the person as passive
TEST neighbourhood change|old photographs are placed beside current voices|layered time|modes connect change and continuity
TEST famous victory|losing side's letter focuses on courage and cost|reframed event|alternative viewpoint complicates celebration
TEST country visit|named local guide explains one family's relationship to place|specific perspective|attribution avoids cultural generalisation
TEST factory closure|adult narrator recalls what a child misunderstood|reinterpreted memory|time distance changes meaning
TEST ocean crossing|map route contrasts with a passenger's cramped view|scale contrast|modes show official journey and lived experience
TEST council decision|young speaker is quoted directly instead of summarised|agency|voice positions the child as a participant
TEST winter town|warm windows and shared routines counter harsh weather|connected community|visual and action choices resist a bleak stereotype`);

const creation = split(`
isolation|a child misses the last ferry|wide empty harbour|compare the fog to a closing curtain
determination|a cyclist repairs a chain during a race|steep roadside|repeat precise action verbs
hidden danger|friends enter an abandoned greenhouse|cracked glass and vines|return to one warning shadow
belonging|a newcomer joins a rooftop garden|crowded city roof|use plant growth as a sustained image
jealousy|two inventors compete for attention|messy workshop|show feelings through clipped dialogue
courage|a swimmer hears a distress call|rough beach|contrast trembling hands with decisive action
regret|a child breaks a borrowed model|silent classroom|make the damage echo the friendship
wonder|siblings find glowing fungi|night forest|use controlled light imagery
trust|partners cross a rope bridge|windy gorge|let one action answer earlier doubt
patience|a baker waits for difficult dough|warm kitchen|use slow sensory detail
responsibility|a pet escapes during a storm|flooded yard|link each choice to a consequence
relief|a lost hiker sees a trail marker|darkening bush track|shift imagery from tangled to open
friendship|rivals shelter from hail|small bus stop|change dialogue from accusation to cooperation
grief|a gardener tends a grandparent's tree|dry backyard|use one recurring leaf image
curiosity|a student opens a sealed box|dusty archive|pace the reveal with short observations
pride|a musician performs an original song|school stage|show confidence through changing posture
fairness|players challenge an unfair rule|sports field|give opposing characters believable motives
homesickness|a camper cooks a family dish|mountain camp|connect scent with memory
resourcefulness|children redirect rainwater|parched garden|make setting pressure drive the plan
forgiveness|friends repair a torn costume|backstage|let repair become a metaphor
loyalty|a dog waits outside a hospital|busy entrance|repeat a small waiting action
independence|a child navigates a train trip|changing stations|use signs as both help and pressure
hope|neighbours relight a community hall|blackout|build a pattern of growing light
honesty|a goalkeeper admits touching the ball|tense final|slow the decision before the confession
TEST empathy|a student notices a rival hiding disappointment|awards hall|show understanding through action, not explanation
TEST persistence|a kite maker tests three failed designs|windy oval|vary failure while repeating the goal
TEST suspense|a phone rings inside an empty house|rainy street|delay entry with sensory clues
TEST reconciliation|siblings rebuild a model bridge|shared bedroom|make construction mirror their relationship
TEST awe|a child watches turtles hatch|moonlit beach|use restrained scale comparisons
TEST uncertainty|a team waits for a cave guide|underground chamber|limit viewpoint to partial sounds
TEST generosity|a market seller saves food for a late family|closing market|contrast abundance with one careful choice
TEST resilience|a dancer adapts after a costume tears|festival stage|turn the problem into part of the performance
TEST guilt|a student hides a damaged library book|quiet library|let the book recur as an uncomfortable image
TEST cooperation|neighbours move a fallen branch|blocked lane|coordinate actions through purposeful verbs
TEST discovery|friends decode marks on a jetty|tidal inlet|make the changing tide a deadline
TEST acceptance|a child releases an injured bird|rehabilitation garden|shift from holding to opening imagery
TEST moral choice|a winner notices a scoring error|robotics final|connect the decision with an earlier value
TEST protection|an older cousin guides children through smoke|campground|use setting details as obstacles and clues
TEST gratitude|a traveller returns a repaired compass|coastal village|echo the opening object with changed meaning
TEST confidence|a quiet speaker addresses the council|crowded chamber|move from fragmented to flowing sentences`);

const structures = split(`
missing trophy|begin with the empty display case|then reveal yesterday's careless handover|flashback signal: The afternoon before
storm rescue|open at the helicopter arrival|return to the first warning signs|time marker: Six hours earlier
friendship argument|alternate each friend's account|show one misunderstood message|label sections with each name
family mystery|frame the story with an unopened letter|tell the grandparent's memory inside|return to the letter at the end
race preparation|present events chronologically|show training causing improvement|use clear weekly transitions
forest warning|begin with the climax at a fallen bridge|reveal ignored clues gradually|repeat the snapped-twig motif
school concert|alternate backstage and audience scenes|create dramatic irony about a missing prop|use location headings
lost key|end with two supported possibilities|plant evidence for both|resolve the search but not ownership
new town|open with a confident present-day narrator|flash back to an anxious first day|echo the opening street image
robot contest|parallel two teams' preparation|bring plots together at judging|repeat a countdown heading
camping mistake|tell the event through diary entries|let later entries revise early assumptions|date every section
ocean journey|shift from passenger to lighthouse keeper|show each missing the other's knowledge|signal voice through distinct diction
secret garden|start at discovery|move backwards through three clues|use precise time transitions
grand final|slow one decisive second|insert brief memories between actions|return clearly to the ongoing kick
family recipe|frame past scenes around present cooking|connect generations through repeated words|return to the kitchen
power cut|use a circular structure|end with the same candle image changed|make the change in meaning clear
animal rescue|alternate child and ranger viewpoints|create different priorities|keep pronouns and voices stable
museum night|begin after an unexplained alarm|reconstruct events from objects|order clues logically
mountain choice|use two parallel possible paths|show consequences of each|mark alternatives with headings
returned parcel|delay the sender's identity|place fair clues in each section|reveal only after evidence accumulates
play rehearsal|use scene-like sections|jump between performance and preparation|identify place and time
flood memory|adult narrator interrupts childhood scenes|correct earlier misunderstanding|control past and present tense
neighbour dispute|present three witness accounts|allow contradictions to remain visible|name every speaker
train departure|count backwards to departure|compress paragraphs near zero|keep cause and sequence clear
TEST hidden room|open inside the room|flash back to finding the map|signal earlier time immediately
TEST two inventors|alternate notebooks|let readers combine partial clues|date and name entries
TEST farewell|frame memories around packing|return after each object|use repeated object transitions
TEST mystery caller|withhold identity until the end|plant voice and timing clues|avoid unfair missing information
TEST river race|run parallel plots upstream and downstream|converge at a broken jetty|use location cues
TEST apology|begin with the repaired object|move backward through the argument|mark each earlier step
TEST festival day|use chronological sections|accelerate toward performance|shorten later paragraphs
TEST cave echo|shift viewpoint at a section break|reveal the sound's source to readers first|make both voices distinct
TEST old photograph|use a frame narrative|enter the pictured event|echo the photograph on return
TEST difficult decision|offer two imagined outcomes|return to the real choice|label imagined sequences clearly
TEST missing dog|alternate searcher and dog viewpoints|create near meetings|use repeated landmarks
TEST competition result|open with silence after announcement|delay whether it means joy or shock|reveal through character action
TEST winter journey|insert one purposeful flashback|explain the traveller's fear|use tense and time markers
TEST community garden|use seasonal jumps|show gradual shared change|name each season
TEST final message|end openly after resolving the main danger|leave sender's future uncertain|provide evidence for likely outcomes
TEST homecoming|circle back to an opening doorway|change who is waiting there|repeat wording with meaningful variation`);

const explain = (rows, focus) => build(rows, ([title,evidence,effect,reason], i) => ({
  question:`For “${title.replace(/^TEST /, "")}”, which explanation best connects the evidence “${evidence}” with its effect?`,
  correct:`It creates ${effect} because ${reason}.`,
  wrongs:[`It creates ${effect} only because the title is short.`,`It has no effect because readers always respond in the same way.`],
  summary:`The evidence creates ${effect}: ${reason}.`, hint:"Name the specific choice, then explain what it invites readers to notice, feel or infer.", focus,
  visualKind:i%3===0?"text-evidence":"evidence-cards", visualDescription:`A card pairs evidence from ${title.replace(/^TEST /, "")} with the reader effect ${effect}.`
}));

export const LE_ITEMS = {
  AC9E5LE01: explain(preference,"reasoned literary preference"),
  AC9E5LE02: explain(soundVisual,"sound and visual meaning"),
  AC9E5LE03: explain(representation,"representation through viewpoint and selection"),
  AC9E5LE04: build(creation, ([rawMood,event,setting,craft],i)=>{const mood=rawMood.replace(/^TEST /, "");return {question:`You are drafting a story in which ${event}. The setting is described as ${setting}. Which plan best develops ${mood}?`,correct:`${craft}, and make the character's choices change what happens.`,wrongs:[`Add unrelated comparisons to every sentence and leave events unchanged.`,`Describe ${setting} once, then make the character change without a cause.`],summary:`The plan develops ${mood} by linking ${craft} with motivated action and consequence.`,hint:"Connect character goal, setting pressure, a deliberate language pattern and a consequence.",focus:"creating and revising literary texts",visualKind:i%2?"story-map":"revision-flow",visualDescription:`A story-planning card connects ${mood}, the event, ${setting} and the craft choice.`};}),
  AC9E5LE05: build(structures, ([rawStory,opening,middle,signal],i)=>{const story=rawStory.replace(/^TEST /, "");return {question:`A writer is structuring a story about ${story}. Which revision creates a purposeful, coherent sequence?`,correct:`${opening}; ${middle}; ${signal}.`,wrongs:[`Put scenes in random order and give readers no time or viewpoint signals.`,`Keep every event in one paragraph so the structural changes are hidden.`],summary:`The structure is purposeful because it uses ${opening}, then ${middle}, with clear reader guidance.`,hint:"Choose the intended effect first, then signal every change in time, place or viewpoint.",focus:"experimenting with literary structure",visualKind:i%2?"timeline":"structure-flow",visualDescription:`A sequence diagram for the ${story} story shows the opening, structural move and cohesion signal.`};})
};

for (const [code, items] of Object.entries(LE_ITEMS)) {
  if (items.length !== 40) throw new Error(`${code} must contain 40 items`);
  if (new Set(items.map(item => item.question)).size !== 40) throw new Error(`${code} has duplicate prompts`);
  for (const item of items) {
    if (Object.keys(item).join(",") !== "question,correct,wrongs,summary,hint,focus,visualKind,visualDescription") throw new Error(`${code} item shape mismatch`);
    if (item.wrongs.length !== 2 || new Set([item.correct, ...item.wrongs]).size !== 3) throw new Error(`${code} choices invalid`);
    if (/_{2,}|\.\.\.|\/(?:[a-z])\//i.test([item.question,item.correct,...item.wrongs].join(" "))) throw new Error(`${code} contains TTS-unsafe notation`);
  }
}
