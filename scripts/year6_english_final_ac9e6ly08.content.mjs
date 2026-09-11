const item = (skill, stage, question, answers, correct, explanation, hint) => ({
  skill, stage, question, answers, correct, explanation, hint
});

const practice = [
  item('alternative graphemes', 'practice', 'Which spelling completes the sentence? The scientist studied the ___ of light through glass.', ['fizics', 'physics', 'phizics', 'fisics'], 1, 'Physics begins with ph for /f/ and uses s for the final /s/.', 'Think of the related word physical.'),
  item('alternative graphemes', 'practice', 'Which word correctly names a short life story written about another person?', ['biograffy', 'biografy', 'biography', 'bighography'], 2, 'Biography uses ph to represent /f/ in the final syllables.', 'The /f/ sound can be written ph in Greek-derived words.'),
  item('alternative graphemes', 'practice', 'Choose the conventional spelling for the adjective meaning “working well and producing the intended result”.', ['effective', 'efective', 'ephfective', 'effictive'], 0, 'Effective has the doubled f spelling after the first vowel.', 'Link it to effect.'),
  item('variable grapheme', 'practice', 'In which word does ch represent /k/?', ['chemist', 'chapter', 'chef', 'machine'], 0, 'In chemist, ch represents /k/. The other choices begin with /ch/ or /sh/.', 'Try each whole word in its familiar pronunciation.'),
  item('variable grapheme', 'practice', 'In which word does ch represent /sh/?', ['orchard', 'echo', 'chalet', 'anchor'], 2, 'In chalet, ch represents /sh/.', 'Blend the whole word rather than assigning ch one fixed sound.'),
  item('variable grapheme', 'practice', 'The sentence says, “The choir rehearsed before assembly.” How is ch read in choir?', ['/ch/', '/k/', '/sh/', '/j/'], 1, 'Choir begins with the /k/ sound even though it is written ch.', 'Use the familiar meaning and pronunciation of the whole word.'),
  item('less common /sh/ spellings', 'practice', 'Which letters represent /sh/ in the word cautious?', ['cau', 'ti', 'ou', 'ous'], 1, 'The letters ti represent /sh/ in the pronounced part /shus/.', 'Say cau-tious and locate the /sh/ sound.'),
  item('less common /sh/ spellings', 'practice', 'Which spelling completes “The mural was painted by a local musi___”?', ['cian', 'shun', 'tion', 'sion'], 0, 'Musician ends in cian, where ci represents /sh/.', 'Build from music + ian.'),
  item('less common /sh/ spellings', 'practice', 'Which word uses si to represent /sh/?', ['tension', 'station', 'special', 'shell'], 0, 'In tension, si represents /sh/. The other choices use ti, ci or sh for that phoneme.', 'Say each whole word and locate the letters aligned with /sh/.'),
  item('digraphs and trigraphs', 'practice', 'Which word contains the trigraph dge representing one final consonant sound?', ['budget', 'bridge', 'dragon', 'danger'], 1, 'Bridge ends with dge representing /j/.', 'A trigraph is three letters working together for one phoneme.'),
  item('digraphs and trigraphs', 'practice', 'In the word earthquake, which two-letter grapheme represents the first consonant sound?', ['ea', 'ar', 'th', 'qu'], 2, 'The digraph th represents the first consonant phoneme in earthquake.', 'Look at the beginning sound, not the first syllable vowel.'),
  item('digraphs and trigraphs', 'practice', 'Which word contains the grapheme tch for the /ch/ phoneme?', ['capture', 'watchful', 'machine', 'chemist'], 1, 'Watchful contains watch + ful, and tch represents /ch/.', 'Find three letters working together before -ful.'),
  item('vowel relationships', 'practice', 'Which word has the same stressed vowel phoneme as coast?', ['broad', 'crowd', 'approach', 'could'], 2, 'The stressed final syllable of approach rhymes with coach and shares the long /o/ phoneme in Australian English.', 'Compare sounds, not just letter patterns.'),
  item('vowel relationships', 'practice', 'Which word has the same vowel phoneme as head?', ['great', 'breadth', 'bead', 'heart'], 1, 'Breadth and head contain the same short /e/ vowel phoneme in standard Australian pronunciation.', 'Say the whole words naturally.'),
  item('vowel relationships', 'practice', 'Which pair uses different spellings for the same vowel phoneme?', ['rain and day', 'food and good', 'break and speak', 'now and snow'], 0, 'Rain and day both contain the long /a/ phoneme, written ai and ay.', 'The question asks about sound sameness and spelling difference.'),
  item('flexible decoding', 'practice', 'The sentence says, “A rough track led through the forest.” Which statement is accurate?', ['ough sounds the same in both words', 'rough rhymes with through', 'rough and through use different pronunciations of ough', 'through has two spoken syllables'], 2, 'Rough ends /uf/, while through ends with a long /oo/ sound.', 'Use sentence meaning to identify each familiar word.'),
  item('flexible decoding', 'practice', 'Which word rhymes with though?', ['cough', 'dough', 'thought', 'through'], 1, 'Dough and though share the long /o/ pronunciation of ough.', 'Do not assume all ough spellings sound alike.'),
  item('flexible decoding', 'practice', 'Read: “The drought reduced the reservoir.” Which word has ough pronounced as in shout?', ['reduced', 'reservoir', 'drought', 'the'], 2, 'Drought contains the /ow/ phoneme represented by ou within ough.', 'Find the word that rhymes with out.'),
  item('syllable segmentation', 'practice', 'Which is the most helpful spoken-syllable split for responsibility?', ['res-pon-si-bil-i-ty', 're-sp-ons-ib-il-ity', 'resp-on-sib-ility', 'respons-ibility'], 0, 'Res-pon-si-bil-i-ty gives six pronounceable beats that can be blended into the word.', 'Clap the natural beats; do not split consonants randomly.'),
  item('syllable segmentation', 'practice', 'Which segmentation best supports decoding biodegradable?', ['bio-de-grad-able', 'bi-o-de-grad-a-ble', 'b-i-od-egr-ad-able', 'bio-d-egradable'], 1, 'Bi-o-de-grad-a-ble marks six spoken syllables and keeps pronounceable chunks.', 'Say it slowly, then blend the chunks naturally.'),
  item('syllable segmentation', 'practice', 'A reader meets “intercontinental”. Which first action is most useful?', ['guess from the first three letters', 'skip the word permanently', 'mark spoken syllables, then blend them', 'pronounce every letter separately'], 2, 'Segmenting in-ter-con-ti-nen-tal reduces the load while preserving the complete word.', 'Long words are read in pronounceable chunks, then recombined.'),
  item('syllable segmentation', 'practice', 'Which word has four spoken syllables in common Australian pronunciation?', ['calculator', 'strengthened', 'thoughtful', 'playground'], 0, 'Calculator is commonly segmented cal-cu-la-tor, four syllables.', 'Count spoken beats, not vowel letters.'),
  item('stress', 'practice', 'In the noun photograph, which syllable normally carries the main stress?', ['first: PHO', 'second: TO', 'third: GRAPH', 'all equally'], 0, 'Photograph normally has first-syllable stress: PHO-to-graph.', 'Say the word naturally in “a photograph”.'),
  item('stress', 'practice', 'Which stress pattern fits photography?', ['first syllable stressed: PHO-to-graph-y', 'second syllable stressed: pho-TOG-ra-phy', 'third syllable stressed: pho-to-GRAPH-y', 'every syllable stressed equally'], 1, 'Photography normally shifts the main stress to the second syllable.', 'Related words can shift stress.'),
  item('stress', 'practice', 'A student reads record in “Please record the result.” Which syllable should be stressed?', ['first, as in the noun REcord', 'second, as in the verb reCORD', 'both equally', 'neither syllable'], 1, 'Here record is a verb, usually stressed on the second syllable.', 'Use the word’s job and sentence meaning.'),
  item('stress', 'practice', 'Which sentence uses present with stress on the second syllable?', ['The present was wrapped.', 'We live in the present.', 'The groups present their findings.', 'Her presence was reassuring.'], 2, 'The verb present is commonly pronounced pre-SENT.', 'Identify the sentence in which the word means show or deliver.'),
  item('schwa', 'practice', 'In banana, which syllables commonly contain a weak schwa vowel?', ['only the stressed middle syllable', 'the first and final syllables', 'all three syllables', 'no syllables'], 1, 'Banana is commonly pronounced bə-NAH-nə; the unstressed outer vowels are schwas.', 'Schwa usually occurs in unstressed syllables.'),
  item('schwa', 'practice', 'Why can sound alone be unreliable when spelling the final syllable of doctor?', ['The final vowel is always silent.', 'The unstressed vowel may reduce to schwa although it is written o.', 'The word has no final syllable.', 'The letters or represent /sh/.'], 1, 'The unstressed written o may be heard as a weak schwa before r.', 'Look for a reduced vowel in an unstressed syllable.'),
  item('schwa', 'practice', 'Which spelling is correct for the word heard as “sep-uh-rate” when it is an adjective?', ['seperate', 'separite', 'separate', 'seprate'], 2, 'Separate keeps a in the unstressed middle syllable even when that vowel is reduced.', 'Use the related word separation to expose the vowel.'),
  item('schwa', 'practice', 'Which related word best helps confirm the hidden vowel in the second syllable of family?', ['familiar', 'famine', 'famous', 'final'], 0, 'Familiar preserves the fam- word family and makes the vowel sequence easier to notice.', 'Choose a genuine relative in meaning and form.'),
  item('morphology support', 'practice', 'Which related word best helps explain the g in sign?', ['signal', 'sine', 'sing', 'sigh'], 0, 'Signal reveals the pronounced /g/ while preserving the sign morpheme spelling.', 'Use a word from the same meaning family.'),
  item('morphology support', 'practice', 'A student is spelling composition. Which word family gives the strongest support?', ['compose and composer', 'compost and composting', 'compare and comparison', 'position and positive'], 0, 'Compose and composer share the relevant base and meaning with composition.', 'A useful relative must match both form and meaning.'),
  item('morphology support', 'practice', 'Which analysis best supports the spelling disagreement?', ['dis + agree + ment', 'di + sag + ree + ment', 'disagree + mint', 'dish + agreement'], 0, 'Disagreement is built from prefix dis-, base agree and suffix -ment.', 'Keep recognisable meaning units intact.'),
  item('morphology support', 'practice', 'Why does muscle keep its c even though many speakers do not pronounce it?', ['Every silent letter is random.', 'The conventional spelling and related muscular provide word-family support.', 'The c marks the stressed syllable.', 'The c represents a vowel.'], 1, 'Muscular makes the /k/ audible and confirms the shared spelling of the morpheme.', 'Search for a related form in which the letter is pronounced.'),
  item('consonant clusters', 'practice', 'Which segmentation identifies the ending sounds of sixth without adding a vowel?', ['/s/ /i/ /k/ /s/ /th/', '/k/ /s/ /th/', '/k/ /uh/ /s/ /th/', '/ks/ as one vowel sound'], 1, 'Sixth ends with the consonant sequence /k/ /s/ /th/.', 'Stretch the ending but do not insert “uh”.'),
  item('consonant clusters', 'practice', 'Which pronunciation strategy is best for glimpsed?', ['say glim-puh-sed', 'omit the /p/', 'build /glimps/ then add /t/', 'turn the ending into a new syllable'], 2, 'Glimpsed is one syllable; building the cluster and adding the past-tense /t/ avoids an extra vowel.', 'Keep the cluster compact.'),
  item('consonant clusters', 'practice', 'Which word begins with a three-phoneme consonant cluster?', ['splash', 'chair', 'phone', 'knight'], 0, 'Splash begins /s/ /p/ /l/ before the vowel.', 'Count phonemes, not letters.'),
  item('consonant clusters', 'practice', 'A reader says “strength” as “streng-uth”. What should be corrected?', ['remove the inserted vowel before th', 'add another syllable', 'change ng to /n/', 'make the word rhyme with lengthen'], 0, 'Strength is normally one syllable; no extra vowel belongs between the final consonants.', 'Blend the final cluster without “uh”.'),
  item('encoding selection', 'practice', 'Which spelling correctly completes “The committee reached a unanimous deci___”?', ['shun', 'tion', 'sion', 'cian'], 2, 'Decision ends in sion after the base decide changes at the boundary.', 'Use decide → decision as the word-family clue.'),
  item('encoding selection', 'practice', 'Choose the conventional spelling for the word meaning “able to be seen”.', ['visable', 'visible', 'vissible', 'vizible'], 1, 'Visible uses the established -ible spelling.', 'Link it to vision and visibility.'),
  item('encoding selection', 'practice', 'Which spelling correctly completes “The weather caused a brief inter___tion to play”?', ['up', 'rup', 'rupt', 'rubt'], 2, 'Interruption is built from interrupt + ion and retains rupt.', 'Think of interrupt.'),
  item('contextual self-correction', 'practice', 'A reader says refuse as the noun REF-yoos in “The council will refuse the request.” What is the best repair?', ['keep it because every letter was sounded', 'try the verb re-FYOOZ and reread the sentence', 'replace the word with rubbish', 'skip the rest of the sentence'], 1, 'The grammar and meaning require the verb refuse, normally pronounced re-FYOOZ.', 'Use the word’s job in the sentence.'),
  item('contextual self-correction', 'practice', 'In “The bass swam beneath the jetty,” a reader says bass like the low musical sound. What should the reader do?', ['reread bass to rhyme with mass because the context names a fish', 'change jetty to guitar', 'keep the music pronunciation', 'spell the word base'], 0, 'Context identifies the fish, so bass rhymes with mass here.', 'Use meaning to select between pronunciations of the same spelling.'),
  item('contextual self-correction', 'practice', 'A reader says “con-serve-AY-shun” for conservation. Which check is most useful?', ['compare conserve, mark con-ser-VA-tion, then reread', 'sound each letter once and stop', 'remove the suffix', 'change the spelling to conservashun'], 0, 'The word family and suffix support the conventional stress and pronunciation.', 'Use morphemes and stress together.'),
  item('pronunciation variation', 'practice', 'Two speakers pronounce data differently but spell it data. Which conclusion is most accurate?', ['one speaker must be careless', 'established accent variation can coexist with one conventional spelling', 'the word must have two spellings', 'pronunciation never varies'], 1, 'English spelling can remain stable across accepted pronunciation variants.', 'Judge decoding knowledge without ranking accents.'),
  item('pronunciation variation', 'practice', 'Which response respectfully handles a classmate’s established pronunciation of either that differs from yours?', ['Call it wrong immediately.', 'Ask whether the word fits the sentence and recognise accepted variation.', 'Change the spelling to match your accent.', 'Refuse to discuss the word.'], 1, 'Meaning, conventional spelling and recognised variation matter more than enforcing one accent.', 'Different does not automatically mean incorrect.'),
  item('integrated decoding', 'practice', 'Read: “The archaeologist examined the fragile vessel.” Which strategy best supports archaeologist?', ['use archaeology + -ist, segment ar-chae-ol-o-gist, then blend', 'read only the first syllable', 'pronounce ch as /ch/ and never revise', 'replace it with a shorter word without checking'], 0, 'Morphology, syllables and flexible grapheme knowledge work together.', 'Use both word parts and pronounceable chunks.'),
  item('integrated encoding', 'practice', 'Which checking chain is strongest for spelling environmentally?', ['write the first spelling that sounds close', 'environment + al + ly; check syllables, morphemes and conventional spelling', 'remove all unstressed vowels', 'spell each phoneme with one letter'], 1, 'The morpheme chain preserves meaning and helps check vowels that may reduce in speech.', 'Build from the known base environment.')
];

const test = [
  item('alternative graphemes', 'test', 'Which conventional spelling names a device that measures temperature?', ['thermometer', 'thurmometer', 'thermometre', 'thermomiter'], 0, 'Thermometer uses th for its initial consonant and the conventional meter ending in this scientific instrument name.', 'Connect therm- with heat and meter with measuring.'),
  item('variable grapheme', 'test', 'In “The mechanic inspected the engine,” what sound does ch represent in mechanic?', ['/ch/', '/sh/', '/k/', '/j/'], 2, 'In mechanic, the grapheme ch represents the /k/ phoneme.', 'Blend the whole word in context.'),
  item('less common /sh/ spelling', 'test', 'Which letter group represents the /sh/ sound in the final syllable of permission?', ['mi', 'ss', 'ssi', 'on'], 2, 'In permission, the letter group ssi represents /sh/ before the final weak vowel and /n/.', 'Say per-mis-sion and locate the letters aligned with the consonant sound.'),
  item('digraphs and trigraphs', 'test', 'Which word contains eigh representing a long /a/ vowel phoneme?', ['height', 'neighbour', 'heifer', 'foreign'], 1, 'Neighbour begins with the long /a/ phoneme represented by eigh.', 'Compare each complete word; identical letters can vary.'),
  item('vowel relationships', 'test', 'Which pair has the same stressed vowel phoneme but different graphemes?', ['key and ski', 'shoe and should', 'steak and speak', 'crown and grown'], 0, 'Key and ski share a long /e/ phoneme, written ey and i.', 'Compare the spoken stressed vowels.'),
  item('flexible decoding', 'test', 'Read: “Although the branch was tough, it bent.” Which statement is correct?', ['although and tough give ough the same sound', 'tough rhymes with cough', 'although ends with a long /o/ sound, while tough ends /uf/', 'tough has two syllables'], 2, 'The same four letters support different pronunciations in these two words.', 'Let sentence meaning identify the words, then compare.'),
  item('syllable segmentation', 'test', 'Which split best supports reading miscommunication?', ['mis-com-mu-ni-ca-tion', 'mi-sco-mmun-ication', 'misc-omm-unic-ation', 'miscommunic-ation'], 0, 'Mis-com-mu-ni-ca-tion gives six pronounceable syllables and preserves the prefix.', 'Keep spoken chunks and useful morphemes visible.'),
  item('stress', 'test', 'In “The permit will expire,” which syllable of permit is normally stressed?', ['first, PER-mit', 'second, per-MIT', 'both equally', 'neither'], 0, 'Permit is a noun in this sentence, commonly stressed on the first syllable.', 'Ask whether permit names a thing or an action.'),
  item('schwa', 'test', 'Why might the first vowel of police sound weak in connected speech?', ['It is in an unstressed syllable and may reduce towards schwa.', 'The p is a vowel.', 'The word has only one syllable.', 'The written o must be deleted.'], 0, 'The first syllable is unstressed, so its vowel may be reduced; the conventional spelling remains police.', 'Stress influences vowel clarity.'),
  item('schwa and encoding', 'test', 'Which spelling correctly completes “The council discussed the prob___”?', ['lem', 'lum', 'ləm', 'lam'], 0, 'Problem is conventionally spelled with e even though its unstressed second vowel may be reduced.', 'Link to problematic, where the vowel is clearer.'),
  item('morphology support', 'test', 'Which relative best supports the otherwise silent b in crumb?', ['crumble', 'cramp', 'crown', 'drum'], 0, 'Crumble is a meaning-relative in which the b is pronounced, supporting the conventional spelling crumb.', 'Choose the genuine word family in both form and meaning.'),
  item('morphology support', 'test', 'Which analysis gives the strongest spelling support for irreplaceable?', ['ir + replace + able', 'irr + eplace + able', 'irreplace + table', 'ire + placeable'], 0, 'Irreplaceable is built from negative ir-, the base replace and suffix -able.', 'Start from the known base replace.'),
  item('consonant clusters', 'test', 'Which instruction best helps a reader pronounce twelfths without adding a syllable?', ['build twelfth, then blend final /s/', 'say twel-fuh-thus', 'omit /f/', 'change th to /t/'], 0, 'Building the base twelfth before the plural /s/ supports the dense final cluster.', 'Do not insert “uh” between consonants.'),
  item('encoding selection', 'test', 'Which spelling correctly completes “Her explanation was suffi___ for the task”?', ['shent', 'cient', 'tient', 'sient'], 1, 'Sufficient ends in cient, with ci contributing the /sh/ sound.', 'Think of sufficient and deficiency as a family pattern.'),
  item('contextual self-correction', 'test', 'In “They wound the rope around the post,” a reader says wound as the injury noun. What is the best correction?', ['use the pronunciation that rhymes with sound because the sentence shows the past of wind', 'keep the injury pronunciation', 'change the word to wounded', 'ignore the sentence meaning'], 0, 'The surrounding action selects wound, past tense of wind, rhyming with sound.', 'Use grammar and meaning to select the pronunciation.'),
  item('integrated decoding and variation', 'test', 'A new student pronounces schedule with an established /sk/ beginning; another uses /sh/. What should a teacher assess?', ['whether each can connect the conventional spelling to a recognised pronunciation and meaning', 'which accent sounds more intelligent', 'whether both change the spelling', 'whether one student stays silent'], 0, 'Both pronunciations are established; accurate word recognition and spelling demonstrate the target knowledge.', 'Respect accent variation while checking the grapheme–word link.')
];

const worksheet = [
  { task: 'Sort these words by the sound represented by ch: chorus, machine, chapter, architect, brochure, orchard.', modelAnswer: '/k/: chorus, architect; /sh/: machine, brochure; /ch/: chapter, orchard.' },
  { task: 'Underline the letters representing /sh/ in station, special, mission and chef. Label each grapheme.', modelAnswer: 'station: ti; special: ci; mission: ssi; chef: ch. Accept established pronunciation variation where relevant.' },
  { task: 'Write the correctly spelled word in each sentence: (a) The ___ was effective. (fizician/physician) (b) We crossed the old ___. (brij/bridge)', modelAnswer: '(a) physician; (b) bridge.' },
  { task: 'Write two columns: SAME SOUND and DIFFERENT SOUND. Place rain/day, food/good, head/breadth, now/snow and scene/machine.', modelAnswer: 'Same sound: rain/day, head/breadth, scene/machine. Different sound: food/good, now/snow.' },
  { task: 'Segment these into spoken syllables, then rewrite each whole word: accessibility, revolutionary, misunderstanding.', modelAnswer: 'Possible common Australian segmentations: ac-ces-si-bil-i-ty; rev-o-lu-tion-ar-y; mis-un-der-stand-ing. Natural pronunciation variation is acceptable if the whole word is accurate.' },
  { task: 'Mark the stressed syllable in each bold word: a REBEL / to REBEL; a CONTEST / to CONTEST. Then use each verb in a sentence.', modelAnswer: 'Nouns: REB-el, CON-test. Verbs: re-BEL, con-TEST. Sentences must use rebel and contest as actions with matching stress.' },
  { task: 'Circle the written vowel that may become schwa in each unstressed syllable: support, pencil, complete, actor. Then copy each conventional spelling.', modelAnswer: 'Typical targets: support first u; pencil i; complete first o; actor o. Accept established pronunciation variation; copied spellings must be support, pencil, complete, actor.' },
  { task: 'Use a related word to explain each underlined spelling: sign (g), muscle (c), bomb (b), compose in composition.', modelAnswer: 'Examples: signal reveals g; muscular reveals c; bombard reveals b; compose identifies the base and supports composition.' },
  { task: 'Build each word from morphemes and spell it: dis + satisfy + ed; environment + al + ly; courage + ous.', modelAnswer: 'dissatisfied; environmentally; courageous.' },
  { task: 'Read silently, then mark the correction: “The sow fed her piglets” and “Farmers sow seed”. Explain how context changes the pronunciation.', modelAnswer: 'Animal sow rhymes with cow; verb sow rhymes with go. The noun piglets and the action seed context identify the intended meanings.' },
  { task: 'Without adding an extra vowel, write sound-building steps for strengths and prompts.', modelAnswer: 'Examples: strength → strengths (/strength/ + /s/); prompt → prompts (/prompt/ + /s/). Steps should preserve the consonant clusters without an inserted schwa.' },
  { task: 'Use this full checking routine on “uncharacteristically”: mark morphemes, segment syllables, mark stress, identify ch, then use the word in a meaningful sentence.', modelAnswer: 'un + character + istic + ally; a common segmentation is un-char-ac-ter-is-ti-cal-ly; main stress commonly falls on IS; ch is /k/. Example: “Uncharacteristically, the nocturnal possum appeared before sunset.” Accept recognised pronunciation variation.' }
];

const topic = {
  title: 'Flexible phonics for increasingly complex words',
  learningIntention: 'Use common and less common grapheme–phoneme relationships flexibly to decode and encode increasingly complex words, then confirm pronunciation, spelling and meaning.',
  sections: [
    { heading: 'One sound, several spellings', content: 'A phoneme can have alternative graphemes: /f/ appears in finite, effective and physical. When encoding, generate plausible choices, use a word family and verify the conventional spelling.' },
    { heading: 'One grapheme, several sounds', content: 'The same grapheme can vary: ch is /ch/ in chapter, /k/ in chorus and /sh/ in machine. Letter patterns such as ough also require whole-word meaning and flexible blending; matching letters do not guarantee matching sounds.' },
    { heading: 'Digraphs, trigraphs and complex vowels', content: 'Two or three letters may represent one phoneme, as in th, tch and dge. Compare actual vowel phonemes rather than calling every adjacent vowel a “vowel team”. Rain/day share a sound with different graphemes; food/good share letters but not the same vowel.' },
    { heading: 'Syllables, stress and schwa', content: 'Segment long words into spoken syllables, blend them, then mark stress. Unstressed vowels can reduce to schwa: banana may be bə-NAH-nə. Schwa is a sound, not a spelling, so related words can reveal the conventional vowel.' },
    { heading: 'Morphology supports phonics', content: 'Prefixes, bases and suffixes preserve meaning and often spelling. Signal helps explain sign; muscular helps explain muscle. Morphology supports sound mapping—it does not replace it.' },
    { heading: 'Clusters, context and self-correction', content: 'Blend dense consonant clusters without inserting /uh/. If a pronunciation does not fit, resegment, try another grapheme pronunciation and reread the sentence. Respect established accent variants such as data or schedule.' }
  ],
  vocabulary: [
    ['phoneme', 'the smallest unit of sound that can distinguish meaning'],
    ['grapheme', 'a letter or letter group representing a phoneme'],
    ['digraph', 'two letters representing one phoneme'],
    ['trigraph', 'three letters representing one phoneme'],
    ['syllable', 'a spoken beat organised around a vowel sound'],
    ['stress', 'extra prominence given to a syllable'],
    ['schwa', 'a weak vowel sound in many unstressed syllables'],
    ['morpheme', 'the smallest meaningful part of a word'],
    ['consonant cluster', 'two or more adjacent consonant phonemes'],
    ['self-correction', 'noticing a mismatch and repairing the reading or spelling']
  ],
  steps: ['Read the complete sentence and locate the complex word.', 'Segment it into useful spoken syllables or morphemes.', 'Map each sound to the likely grapheme, trying recognised alternatives.', 'Blend the complete word with natural stress and no inserted vowels.', 'Check meaning, conventional spelling and any accepted pronunciation variation; revise if needed.']
};

const slides = [
  { page: 1, title: 'Flexible phonics for complex words', content: 'Curriculum focus: use common and less common grapheme–phoneme relationships to read and write increasingly complex words.' },
  { page: 2, title: 'Learning intention and success', content: 'We will decode and encode unfamiliar complex words. Success means mapping sounds and graphemes, segmenting and blending, using stress and schwa knowledge, checking word families and self-correcting in context.' },
  { page: 3, title: 'Decode model: choreography', content: 'Teacher model: read the dance sentence; segment cho-re-og-ra-phy; recognise ch as /k/ and ph as /f/; blend with stress on OG; reread to confirm meaning.' },
  { page: 4, title: 'Encode model: effectiveness', content: 'Say effectiveness; segment ef-fec-tive-ness; build effect + ive + ness; map the doubled ff; write, reread and verify. Do not choose ph merely because it can also spell /f/.' },
  { page: 5, title: 'Same letters do not promise same sound', content: 'Compare though, rough, through and thought in complete sentences. Ask: Which pronunciation makes a known word that fits? Important answer: the whole word and context decide, not visual similarity alone.' },
  { page: 6, title: 'Sound relationships, not loose labels', content: 'Rain/day: different graphemes, same long /a/. Food/good: similar spelling, different vowels. Important question: Are we comparing letters or phonemes? Answer: name both precisely.' },
  { page: 7, title: 'Syllables, stress and schwa', content: 'Model responsibility: res-pon-si-BIL-i-ty. Unstressed vowels may weaken. Ask: Does schwa tell us which vowel to write? Answer: no—use morphology, relatives and verification.' },
  { page: 8, title: 'Morphology as supporting evidence', content: 'Model sign → signal and muscle → muscular. The relative reveals a consonant that is not clear in the target pronunciation. Keep attending to the sounds in the actual target word.' },
  { page: 9, title: 'Clusters and respectful variation', content: 'Blend strengths without an inserted “uh”. Recognise established data, either and schedule variants. Assessment checks accurate mapping, spelling and meaning—not whether a learner copies one accent.' },
  { page: 10, title: 'Important questions and answers', content: 'What if a grapheme has several sounds? Try established alternatives and check the whole sentence. How can I spell schwa? Use the unstressed syllable, a genuine word relative and verification. Why mark stress? Related words can shift stress and vowel clarity. When should I self-correct? When pronunciation, grammar or meaning does not fit.' },
  { page: 10, title: 'Assessment hints', content: 'Read every sentence; compare all four complete words; count phonemes rather than letters; distinguish sound from spelling; use a real meaning-relative; revise when pronunciation and context conflict.' },
  { page: 11, title: 'Guided check', content: 'Decode interdisciplinary: segment in-ter-dis-ci-pli-nar-y, identify morphology inter + discipline + ary, blend, mark stress and explain how context confirms the word.' },
  { page: 12, title: 'Exit ticket', content: 'Decode and encode one unseen complex word. Show syllables, one grapheme–phoneme decision, stress or schwa, one useful morpheme, the final spelling and a context check.' }
];

const placeAnswers = (items, positions) => items.map((entry, index) => {
  const target = positions[index];
  if (entry.correct === target) return entry;
  const answers = [...entry.answers];
  [answers[target], answers[entry.correct]] = [answers[entry.correct], answers[target]];
  return { ...entry, answers, correct: target };
});

const finalPractice = placeAnswers(practice, [1,0,2,2,3,3,2,2,0,3,0,1,1,3,1,3,0,2,0,3,0,2,1,3,3,3,2,2,0,0,0,0,2,1,0,1,1,1,1,2,1,0,1,3,3,2,2,3]);
const finalTest = placeAnswers(test, [2,1,1,0,2,1,3,3,1,3,0,0,0,2,2,3]);
const finalWorksheet = worksheet.map(({ task, modelAnswer }) => ({ question: task, modelAnswer }));
const finalSlides = slides.map(({ title, content }) => ({ title, body: [content] }));

if (finalPractice.length !== 48) throw new Error(`AC9E6LY08 practice count: ${finalPractice.length}`);
if (finalTest.length !== 16) throw new Error(`AC9E6LY08 test count: ${finalTest.length}`);
if (finalWorksheet.length !== 12) throw new Error(`AC9E6LY08 worksheet count: ${finalWorksheet.length}`);

export default {
  code: 'AC9E6LY08',
  descriptor: 'Use phonic knowledge of common and less common grapheme–phoneme relationships to read and write increasingly complex words.',
  title: topic.title,
  learningIntention: topic.learningIntention,
  successCriteria: [
    'I can test alternative grapheme–phoneme relationships while decoding an unfamiliar word.',
    'I can select a conventional spelling by combining sound, syllable, stress and word-family evidence.',
    'I can blend consonant clusters without inserting extra vowels and explain a useful self-correction.',
    'I can recognise schwa in unstressed syllables without treating it as one fixed written vowel.',
    'I can respect established pronunciation variation while checking meaning and conventional spelling.'
  ],
  vocabulary: topic.vocabulary.map(([term, definition]) => ({ term, definition })),
  steps: topic.steps,
  topicSections: topic.sections.map(({ heading, content }) => ({ heading, body: content })),
  misconceptions: [
    { claim: 'A familiar letter pattern must always have one pronunciation.', correction: 'Patterns such as ch and ough have several established pronunciations; blend flexibly and use the whole-word context.' },
    { claim: 'Two adjacent vowel letters always form one vowel team.', correction: 'Describe the actual grapheme–phoneme relationship. Adjacent vowel letters may belong to separate syllables or participate in a wider pattern.' },
    { claim: 'The schwa sound is always written with a.', correction: 'Schwa is a reduced vowel sound and can correspond to several written vowels in unstressed syllables.' },
    { claim: 'Morphology replaces phonics in a long word.', correction: 'Morphemes provide meaning and spelling support while the reader still maps and blends the phonemes in the target word.' },
    { claim: 'Every consonant letter in a dense cluster needs an added vowel.', correction: 'Blend the consonant phonemes continuously without inserting an extra /uh/ syllable.' },
    { claim: 'Only one accent can pronounce an English word correctly.', correction: 'Recognised pronunciation variants can share the same conventional spelling and meaning.' }
  ],
  importantQA: [
    { question: 'What should I do when one grapheme has several possible sounds?', answer: 'Try the established alternatives, blend the complete word and choose the pronunciation that fits the sentence meaning.' },
    { question: 'How do I spell a vowel that sounds like schwa?', answer: 'Identify the unstressed syllable, use a known morpheme or related word to expose the vowel, then verify conventional spelling.' },
    { question: 'Why mark stress in a word family?', answer: 'Stress can shift between related words and change how clearly a vowel is pronounced, even when shared spelling remains useful.' },
    { question: 'When is a related word good spelling evidence?', answer: 'When it genuinely shares meaning and a morpheme with the target, as signal does with sign.' },
    { question: 'How do I know that I should self-correct?', answer: 'Pause when the pronunciation is not a known word, does not fit the grammar or meaning, or does not blend smoothly after accurate segmentation.' }
  ],
  assessmentHints: [
    'Use every word in its complete printed sentence; no item requires audio.',
    'Compare phonemes rather than assuming matching letter strings have matching sounds.',
    'Count spoken syllables and phonemes, not vowel letters.',
    'When encoding, generate plausible graphemes and then justify the conventional selection.',
    'Accept established pronunciation variants while requiring accurate spelling and contextual meaning.',
    'Check that the Test stimulus has not appeared in Practice before administering the Test.'
  ],
  practice: finalPractice,
  test: finalTest,
  worksheet: finalWorksheet,
  slides: finalSlides,
  exitTicket: 'Decode the printed word “incomprehensible” in its sentence, show a useful syllable and morpheme breakdown, identify one less common grapheme–phoneme relationship, then encode it from memory and explain any self-correction.',
  masteryEvidence: 'The student independently decodes and encodes unseen complex words, explains accurate grapheme–phoneme choices, segments and blends without added vowels, uses stress, schwa and morphology as supporting evidence, checks meaning in context and treats established pronunciation variants respectfully.'
};
