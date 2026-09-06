#!/usr/bin/env python3
"""Build authored Year 1 English Literature Pass 1 question banks."""

from __future__ import annotations

from year1_bank_builder import write_banks


def bank(code: str, description: str, quick_read: list[tuple[str, str]], items: list[tuple[str, str, str, str]]) -> dict[str, object]:
    return {
        "code": code,
        "subject": "English",
        "description": description,
        "quick_read": quick_read,
        "items": items,
    }


SPECS = {
    "AC9E1LE01": bank(
        "AC9E1LE01",
        "discuss how language and images are used to create characters, settings and events in literature by wide-ranging Australian and world authors and illustrators",
        [
            ("Rule", "Authors use naming words, actions, dialogue and description; illustrators use colour, line, size, position and detail. Together these choices build characters, settings and events."),
            ("Worked example", "‘Niko crept past the rattling gate’ suggests caution through crept, while a close-up of wide eyes can strengthen the feeling."),
            ("Discussion clue", "Name the exact word or visible detail, then explain what it suggests rather than only saying the text is interesting."),
            ("Visual interaction", "Use original story snippets and fully described images with spoken, tap, keyboard and paper response choices."),
            ("Common trap", "An image may add information not stated in the words, but readers should point to evidence before inferring."),
        ],
        [
            ("Find a character clue", "In ‘Tara tucked the injured bird gently into a box’, which word best shows how Tara acts?", "Gently; it suggests care (2 marks).", "Using verb or adverb choice to discuss character."),
            ("Match choices and effects", "Match jagged lines, tiny figure and warm golden light to danger/tension, feeling alone and comfort/warmth.", "Each visual choice matches its likely literary effect (1 mark each).", "Interpreting illustration techniques."),
            ("Perform dialogue clues", "Say ‘I can do it’ once confidently and once nervously. Explain how voice creates two versions of the character.", "Uses clearly different voice and explains confidence versus uncertainty (3 marks).", "Exploring how spoken delivery develops character."),
            ("Describe a setting", "The words say ‘Wind whistled between the empty sheds.’ What setting feeling do they create, and which words help?", "A plausible lonely/eerie/windy feeling, supported by whistled and empty (2 marks).", "Discussing language used to create setting."),
            ("Order event clues", "Order: muddy footprints appear; Jo follows them; the missing puppy is found; rain begins.", "A logical narrative order beginning with rain/footprints and ending with puppy found; explanation accepts rain first then prints (2 marks).", "Sequencing events from causal clues."),
            ("Draw an added detail", "Draw a simple illustration for ‘The boat entered the bay’ that makes the event feel dangerous. Label two visual choices.", "Uses two relevant choices such as dark waves, tilted boat or looming rocks and labels their effect (3 marks).", "Creating visual mood for an event."),
            ("Compare word and image", "Words call a room ‘quiet’, but the picture shows open cupboards and a broken vase. What extra idea might the image add?", "Something may have happened before the quiet moment; cites disorder as evidence and keeps inference tentative (2 marks).", "Combining verbal and visual evidence."),
            ("Discuss two character portrayals", "One character is described as ‘bounding ahead’; another ‘waited and checked the map’. Compare what these choices suggest.", "First seems energetic/impulsive; second careful/thoughtful, supported by exact actions (3 marks).", "Comparing characterisation through actions."),
            ("Interpret image position", "An illustration places a small child at the bottom of a very tall staircase. What might scale and position suggest?", "The staircase/challenge feels large and the child may feel small, uncertain or overwhelmed (2 marks).", "Inferring meaning from visual scale and placement."),
            ("Match fresh language clues", "Match whispered, burst through and curled beside the fire to secrecy/caution, sudden energetic event and comfort/rest.", "All three language choices matched to supported effects (1 mark each).", "Interpreting verbs and phrases in literature."),
            ("Sequence a visual event", "Order the described panels: empty nest; bird carrying twig; half-built nest; completed nest with eggs.", "Empty/start → twig carried → half-built → completed with eggs (2 marks).", "Using images to reconstruct event development."),
            ("Explain a colour change", "A story moves from grey pictures during a search to bright pictures when a friend is found. What does the change contribute?", "Signals a shift from worry/sadness to relief/happiness and highlights the event's emotional change (2 marks).", "Discussing visual colour across events."),
            ("Demonstrate character movement", "Act or describe how an illustrator might show a rushed character and a calm character without words.", "Gives distinct pose/line/movement details for both and connects them to pace/feeling (3 marks).", "Representing character through visual action."),
            ("Draw paired settings", "Draw the same park as welcoming and as mysterious. Label two changed details.", "Two recognisable versions with at least two purposeful changes such as light, viewpoint, shadows or activity (4 marks).", "Comparing how visual choices create setting mood."),
            ("Correct an unsupported claim", "A reader says a character is cruel only because their coat is black. Explain why stronger evidence is needed.", "Clothing colour alone does not prove personality; use actions, words, expressions and events as evidence (3 marks).", "Evaluating character inferences."),
            ("Analyse a multimodal moment", "Snippet: ‘Ari lifted the lid slowly.’ Image description: Ari leans back, one hand covers their mouth, and pale light escapes the box. Explain how language and image work together to build character, setting and event.", "Slowly builds suspense; posture/hand suggest caution or surprise; light makes box/event mysterious; connects evidence across all three elements (6 marks).", "Integrating language and image evidence in literary discussion."),
        ],
    ),
    "AC9E1LE02": bank(
        "AC9E1LE02",
        "discuss literary texts and share responses by making connections with students’ own experiences",
        [
            ("Rule", "A text-to-self connection links a character, event, place or feeling with an experience or knowledge from your life. Explain both the similarity and any difference."),
            ("Worked example", "‘The character felt nervous on the first day. I also felt nervous at a new club, but a friend helped me sooner.’"),
            ("Discussion language", "Use This reminds me of…, Both…, Unlike…, and I understand the character because…. Listen respectfully because experiences differ."),
            ("Visual interaction", "Use original story-event cards and optional experience prompt cards; students may speak, draw or write without revealing private details."),
            ("Common trap", "A connection must help discuss the text; sharing an unrelated memory does not explain character or event."),
        ],
        [
            ("Name a connection", "A story character learns to ride a scooter. Give a relevant type of personal connection a reader might make.", "Learning a new skill, practising, falling safely or receiving help; connection relates to the event (1 mark).", "Recognising a relevant text-to-self connection."),
            ("Match events and connections", "Match losing a library book, welcoming a new student and caring for a seedling to losing something, meeting someone new and caring for a living thing.", "Each story event matches its relevant experience category (1 mark each).", "Connecting literary events with experience."),
            ("Share a safe oral response", "Choose an invented character feeling—excited, worried or proud—and give a non-private experience or imagined example that helps explain it.", "Names feeling, gives appropriate connection and explains the link (3 marks).", "Using experience to discuss character feeling."),
            ("Complete a connection sentence", "Finish: ‘The rainy-day story reminds me of __ because __.’", "A coherent event and reason connected to rain/indoor activity or feeling (2 marks).", "Expressing a connection with explanation."),
            ("Order a thoughtful response", "Order: name text event; state own experience; explain similarity/difference; return to what this shows about character.", "Text event → experience → compare → insight about character (2 marks).", "Sequencing an evidence-connected literary response."),
            ("Draw text and self panels", "Draw one panel of a character helping a lost animal and one safe imagined/personal helping event. Label a similarity.", "Both panels are clear and one meaningful similarity is labelled (3 marks).", "Representing a text-to-self connection visually."),
            ("Check relevance", "A story is about sharing lunch. A reader talks only about a new video game. What would make the response more relevant?", "Connect to sharing, hunger, friendship or a comparable choice and explain how it helps understand the story (2 marks).", "Evaluating relevance of a personal connection."),
            ("Respect a different response", "Two readers connect differently to a character moving house. Explain how both responses can be useful.", "Experiences and feelings differ; each response is useful if connected to text evidence and shared respectfully (3 marks).", "Recognising diversity in literary responses."),
            ("Infer through experience", "A character practises a song many times before performing. How could experience with practice help a reader understand the character?", "It can explain effort, nerves, improvement or pride, linked to repeated practice (2 marks).", "Using experience to deepen character understanding."),
            ("Match response starters", "Match ‘Both…’, ‘Unlike…’ and ‘This helps me understand…’ to similarity, difference and insight.", "Both ↔ similarity; Unlike ↔ difference; helps understand ↔ insight (1 mark each).", "Using comparative language in literary discussion."),
            ("Sequence an empathetic reply", "Order: listen; refer to the speaker's text connection; acknowledge difference; add own connected idea.", "Listen → refer/acknowledge → note difference respectfully → add idea (2 marks).", "Participating respectfully in literary discussion."),
            ("Explain changed understanding", "A reader once felt left out of a game. How might that connection change their understanding of a lonely character?", "May notice the character's feelings/need for inclusion and interpret actions with empathy; stays linked to story (2 marks).", "Explaining how experience shapes response."),
            ("Demonstrate two connections", "Give one connection to a setting and one to a character feeling from an original class story.", "Two distinct, relevant connections with brief explanations (3 marks).", "Connecting with different literary elements."),
            ("Draw similarity and difference", "Draw a story picnic and a different meal experience. Label one shared feature and one difference.", "Meaningful shared feature and contrast are clearly tied to the two events (3 marks).", "Comparing a literary event with experience."),
            ("Repair an overclaim", "A reader says, ‘The character must feel exactly as I did.’ Explain why this is too certain.", "Connection suggests possibilities, but character evidence and different circumstances matter; use may/might and cite text (3 marks).", "Limiting inference when using personal experience."),
            ("Build a complete response", "For a story where a child keeps trying to fix a kite, write or say a response naming the event, a safe connection, one similarity, one difference and what the connection reveals.", "All five elements are present and relevant; insight concerns persistence, frustration, help or success supported by event (5 marks).", "Developing an extended text-to-self literary response."),
        ],
    ),
    "AC9E1LE03": bank(
        "AC9E1LE03",
        "discuss plot, character and setting, which are features of stories",
        [
            ("Rule", "Characters are who the story is about; setting is where and when it happens; plot is the connected sequence of events, often including a problem and resolution."),
            ("Worked example", "In a story about Bea searching a night market for her lost scarf, Bea is the character, the night market is the setting, and the search-and-find events form the plot."),
            ("Discussion strategy", "Name the feature, cite a word or event, and explain how it matters to the story."),
            ("Visual interaction", "Use original character, setting and plot-event cards with spoken, drag/tap, keyboard and paper alternatives."),
            ("Common trap", "A topic is not the plot; ‘friendship’ is an idea, while the plot tells what happens."),
        ],
        [
            ("Identify the setting", "‘At sunrise, Kian waits beside the river.’ State the setting.", "Beside the river at sunrise (2 marks).", "Identifying place and time in setting."),
            ("Match features", "Match character, setting and plot to who, where/when and connected events.", "Character ↔ who; setting ↔ where/when; plot ↔ events (1 mark each).", "Recognising core story features."),
            ("Act a character goal", "A character wants to reach a high shelf safely. Demonstrate or explain one action that could move the plot toward the goal.", "Gives a safe, character-led action such as asking an adult, linked to goal (2 marks).", "Connecting character goal with plot action."),
            ("Find the problem", "Mara brings a picnic, but wind blows away the map. What is the story problem?", "The map is blown away/lost, making navigation difficult (1 mark).", "Identifying a plot problem."),
            ("Order a mini-plot", "Order: key is found under a pot; gate is locked; friends search; they enter the garden.", "Gate locked → search → key found → enter garden (2 marks).", "Sequencing problem, attempts and resolution."),
            ("Draw a setting clue", "Draw a setting for a story at night in a train station. Label two details showing where or when.", "Two clear location/time clues such as platform, tracks, clock, darkness or lights (3 marks).", "Representing setting through visual detail."),
            ("Explain character effect", "How might a very patient character act differently from an impatient character when a bus is late?", "Patient character waits/checks calmly; impatient character may complain/rush, affecting subsequent events (2 marks).", "Discussing how traits influence plot."),
            ("Connect all three features", "Create a one-sentence story idea naming a character, setting and a problem that starts the plot.", "All three features are explicit and logically connected (3 marks).", "Generating a coherent story premise."),
            ("Name the resolution", "A puppy cannot cross a puddle; the character places a safe board bridge and the puppy crosses. What is the resolution?", "The safe board bridge lets the puppy cross (1 mark).", "Identifying how a plot problem is resolved."),
            ("Match characters to goals", "Match lost cyclist, hungry magpie and curious child to find path, find food and discover a sound's source.", "Each character matches the logical goal (1 mark each).", "Connecting characters with plot motivations."),
            ("Sequence setting change", "Order: storm begins; family enters cabin; morning sun appears; they continue walking.", "Storm → cabin shelter → morning sun → continue walk (2 marks).", "Sequencing plot through a changing setting."),
            ("Compare two settings", "How would a chase plot change if it happened in an open field rather than a crowded market?", "Gives one relevant difference in obstacles, visibility, movement or tension (2 marks).", "Explaining how setting shapes events."),
            ("Demonstrate character response", "Show or describe how a brave but careful character responds to a strange noise behind a door.", "Response combines courage with checking/seeking help rather than unsafe action (3 marks).", "Expressing character traits through plot behaviour."),
            ("Draw plot mountain", "Draw four boxes for opening, problem, attempt and resolution for a story about a broken toy wheel.", "Four logical, connected stages with problem addressed in resolution (4 marks).", "Representing basic plot structure."),
            ("Correct a setting mix-up", "A story says it is midday at the beach, but every detail shows stars and snow-covered streets. Explain the mismatch and revise two details.", "Identifies inconsistent time/place and changes at least two details to create one coherent setting (3 marks).", "Evaluating consistency of setting clues."),
            ("Analyse an original story", "‘In a quiet library, Omar hears a kitten behind a shelf. He asks the librarian, they move a box safely, and the kitten is reunited with its owner.’ Identify character, setting, problem, two events and resolution.", "Omar/librarian/kitten as characters; library setting; trapped/hidden kitten problem; two accurate actions; reunion resolution (6 marks).", "Analysing plot, character and setting together."),
        ],
    ),
    "AC9E1LE04": bank(
        "AC9E1LE04",
        "listen to and discuss poems, chants, rhymes and songs, and imitate and invent sound patterns including alliteration and rhyme",
        [
            ("Rule", "Rhyme matches ending sounds; alliteration repeats starting sounds in nearby words. Poets also use beat, repetition and sound words for effect."),
            ("Worked example", "‘Busy bees buzz by’ repeats /b/ for alliteration. ‘Bee/tree’ rhyme because their final sounds match."),
            ("Listening strategy", "Listen for a repeated sound, name it, quote or repeat the relevant words, then describe whether it feels playful, quick, soft or strong."),
            ("Visual interaction", "Use original audio/read-aloud lines plus sound cards and mouth/sound cues with paper alternatives."),
            ("Common trap", "Alliteration uses sound, not just a repeated written letter: city and cat start with different sounds."),
        ],
        [
            ("Find alliteration", "Which pair uses alliteration: silver snake or silver moon?", "Silver snake; both begin with /s/ (1 mark).", "Recognising repeated initial sounds."),
            ("Match sound patterns", "Match goat/boat, wild wind and tick-tock to rhyme, alliteration and sound word/repetition.", "Goat/boat ↔ rhyme; wild wind ↔ alliteration; tick-tock ↔ sound word/pattern (1 mark each).", "Classifying literary sound devices."),
            ("Perform a line", "Say ‘Softly, slowly, snowflakes spin’ and emphasise the repeated starting sound.", "Performs clearly and identifies /s/ repetition (2 marks).", "Demonstrating alliteration in oral literature."),
            ("Invent a rhyme", "Add a second line to ‘I see a bright red kite’ ending in a word that rhymes with kite.", "A meaningful line ending in night, light, flight or another true rhyme (2 marks).", "Creating a rhyming line."),
            ("Order a chant", "Order these phrases into two repeating sound units: clap-clap-stomp, clap-clap-stomp.", "Two identical clap-clap-stomp units (1 mark).", "Sequencing an imitated chant pattern."),
            ("Draw sound images", "Draw two quick images for ‘pitter-patter’ rain and ‘boom’ thunder. Label how each word sounds.", "Images match soft repeated rain and sudden loud thunder; sound qualities labelled (3 marks).", "Connecting sound words with imagery."),
            ("Discuss effect", "What feeling or pace might ‘Quick quails quiver and quake’ create? Use one sound clue.", "Plausible quick/nervous/playful effect supported by repeated /qu/ and short words (2 marks).", "Discussing the effect of alliteration."),
            ("Invent a sound pattern", "Create a four-word phrase with at least three words beginning with the same sound.", "At least three initial sounds match and phrase remains understandable (2 marks).", "Inventing alliteration."),
            ("Hear end sounds", "Do moon and spoon rhyme? State the shared ending sound.", "Yes; both end with /oon/ (2 marks).", "Explaining rhyme through phonological evidence."),
            ("Match lines and mood", "Match ‘hush, hush, sleepy night’, ‘bang-clang-crash’ and ‘bouncy bears bound’ to calm, noisy and lively.", "Each line matches a supported sound-created mood (1 mark each).", "Connecting sound pattern with mood."),
            ("Sequence a rhyme scheme", "Order cat, moon, hat, spoon into an A-B-A-B ending pattern.", "Cat, moon, hat, spoon (2 marks).", "Arranging alternating rhymes."),
            ("Complete alliteration", "Replace big in ‘big fox’ to create alliteration with fox while keeping meaning sensible.", "Example: fast fox, furry fox or friendly fox (1 mark).", "Selecting words for repeated initial sounds."),
            ("Demonstrate imitation", "Listen to or read ‘tap-tap-pause’ and reproduce it twice, then invent a one-step change.", "Accurately imitates twice and creates a clearly stated variation (3 marks).", "Imitating and adapting an oral sound pattern."),
            ("Draw rhyme pairs", "Draw and label two original rhyme pairs, avoiding pairs that only look alike in spelling.", "Two pairs have matching spoken end sounds and labels (4 marks).", "Generating rhymes with visual support."),
            ("Correct false alliteration", "A child says ‘giant goat’ alliterates because both start with g. Explain using sounds.", "Giant starts /j/ while goat starts /g/, so initial sounds differ (3 marks).", "Distinguishing letter repetition from sound repetition."),
            ("Create and discuss a verse", "Write or perform two short lines containing alliteration, one rhyme pair and a repeated beat or phrase. Explain each feature.", "All three features are present, accurately named and contribute to a coherent mini-verse (6 marks).", "Inventing and discussing combined sound patterns."),
        ],
    ),
    "AC9E1LE05": bank(
        "AC9E1LE05",
        "orally retell or adapt a familiar story using plot and characters, language features including vocabulary, and structure of a familiar text, through role-play, writing, drawing or digital tools",
        [
            ("Rule", "A retell keeps the important characters and main plot in order. An adaptation deliberately changes one element while keeping the story understandable."),
            ("Worked example", "Original: a mouse finds a key and opens a garden gate. Adaptation: a robot finds a code and opens a space station, while the find-and-open plot remains."),
            ("Retelling plan", "Name characters and setting, tell beginning/problem, important attempts and ending, and use clear sequence words and topic vocabulary."),
            ("Visual interaction", "Use original class-story cards, storyboard frames and role cards with speech, drawing, keyboard and paper alternatives."),
            ("Common trap", "A retell is not every tiny detail, and an adaptation should not change so much that the plot loses its connection."),
        ],
        [
            ("Name essential content", "For a retell, which matters more: the main problem or the colour of an unimportant cup? Explain.", "Main problem; it drives the plot, while incidental cup colour can be omitted (2 marks).", "Selecting important story information."),
            ("Match retell parts", "Match beginning, middle and ending to introduce, face/solve problem and show resolution.", "Beginning ↔ introduce; middle ↔ problem/attempts; ending ↔ resolution (1 mark each).", "Connecting story structure with retell stages."),
            ("Retell three events", "Using cards about a bird losing, searching for and finding a ribbon, orally retell the events in order.", "Includes character and all three events in logical order with sequence words (3 marks).", "Orally retelling a simple plot."),
            ("Choose an adaptation", "Change a forest setting to an underwater setting. Name one character or object detail that must also change logically.", "Example bird becomes fish/diver, path becomes reef route, or fire becomes safe underwater obstacle (2 marks).", "Adapting details consistently with setting."),
            ("Order a storyboard", "Order: problem appears; character introduced; solution tried; ending shows result.", "Character introduced → problem → attempt/solution → ending/result (2 marks).", "Sequencing a retell structure."),
            ("Draw four retell frames", "Draw beginning, problem, attempt and resolution for an original story about a missing lunchbox.", "Four coherent frames preserve character and causal plot order (4 marks).", "Representing a retell through storyboard images."),
            ("Use precise story words", "Replace went in ‘The rabbit went through the grass’ with a verb showing how it moves.", "Suitable verb such as hopped, bounded or crept, preserving meaning (1 mark).", "Selecting vocabulary for vivid retelling."),
            ("Explain what to keep", "When adapting a character from child to alien, name two plot relationships or events that could stay the same.", "Any two important goals, problems, helpers, attempts or resolution links remain recognisable (3 marks).", "Maintaining plot coherence in adaptation."),
            ("Summarise an opening", "Original opening: ‘At dawn, Suri packed water, checked the map and left to find the missing goat.’ Retell the essential opening in one sentence.", "Suri leaves at dawn prepared to search for a missing goat, retaining character, setting/time and goal (2 marks).", "Condensing an opening without losing main information."),
            ("Match delivery modes", "Match role-play, drawing and digital slides to act dialogue, show visual sequence and combine images/text/audio.", "Each mode matches its useful retelling affordance (1 mark each).", "Selecting modes for retell and adaptation."),
            ("Sequence linking words", "Choose and order four linking words suitable for a retell: first, next, then, finally.", "First → next → then → finally (1 mark).", "Using temporal cohesion in oral retelling."),
            ("Adapt the problem", "A character's bridge breaks before they cross a stream. Change the story to a city setting with an equivalent problem.", "Plausible equivalent such as bus cancellation/closed crossing blocks journey, while goal and problem role remain (2 marks).", "Transferring plot function to a new setting."),
            ("Demonstrate character voice", "Retell one event twice: once as a worried character and once as a confident character.", "Vocabulary, voice or gesture clearly distinguishes both while event stays recognisable (3 marks).", "Adapting character voice in role-play."),
            ("Draw original and adapted plots", "Draw two four-frame strips with the same plot shape but different characters and settings. Label the shared problem and resolution pattern.", "Both strips have recognisably parallel problem/attempt/resolution despite changed details (5 marks).", "Comparing original and adapted story structures."),
            ("Repair a confusing retell", "A retell gives the ending first, omits the problem and introduces a new character without explanation. Describe three repairs.", "Restore logical order, include main problem, introduce/connect or remove new character; any three clear fixes (3 marks).", "Evaluating coherence and completeness of a retell."),
            ("Deliver a complete adaptation", "Adapt this original plot: ‘A child follows clues to return a lost parcel.’ Give a new character and setting, then orally outline beginning, problem, two events and resolution using sequence language.", "Distinct but connected adaptation includes all six requested elements, logical causality and clear sequence vocabulary (7 marks).", "Creating and structuring an extended oral adaptation."),
        ],
    ),
}


def main() -> None:
    written = write_banks(SPECS)
    print(f"Wrote {len(written)} Year 1 English Literature banks")


if __name__ == "__main__":
    main()
