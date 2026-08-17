(() => {
  'use strict';

  const PROGRESSION = {
    AC9MFN01: { practice:'/quiz/grade-k/math/ac9mfn01/practice/', up:'/year1/maths/ac9m1n01-numbers-to-120/', upTitle:'Year 1: Numbers to 120', upText:'Extend number representation and ordering from 0–20 to at least 120.' },
    AC9MFN02: { practice:'/quiz/grade-k/math/ac9mfn02/practice/', up:'/year1/maths/ac9m1n02-partitioning-tens-and-ones/', upTitle:'Year 1: Partitioning numbers', upText:'Use the parts you can see inside small quantities to partition larger numbers in different ways.' },
    AC9MFN03: { practice:'/quiz/grade-k/math/ac9mfn03/practice/', up:'/year1/maths/ac9m1n03-skip-counting-and-equal-groups/', upTitle:'Year 1: Quantifying larger sets', upText:'Build from counting and comparing collections to organising larger collections into equal groups.' },
    AC9MFN04: { practice:'/quiz/grade-k/math/ac9mfn04/practice/', up:'/year1/maths/ac9m1n04-addition-and-subtraction-within-20/', upTitle:'Year 1: Addition and subtraction within 20', upText:'Use part–part–whole knowledge to calculate with numbers within 20.' },
    AC9MFN05: { practice:'/quiz/grade-k/math/ac9mfn05/practice/', up:'/year1/maths/ac9m1n05-additive-problem-solving-and-money/', upTitle:'Year 1: Additive problem solving', upText:'Move from acting out addition and subtraction to modelling and solving practical additive problems.' },
    AC9MFN06: { practice:'/quiz/grade-k/math/ac9mfn06/practice/', up:'/year1/maths/ac9m1n06-equal-sharing-and-grouping/', upTitle:'Year 1: Equal sharing and grouping', upText:'Extend fair-sharing and grouping models into mathematical problem solving.' },
    AC9MFA01: { practice:'/quiz/grade-k/math/ac9mfa01/practice/', up:'/year1/maths/ac9m1a02-repeating-patterns/', upTitle:'Year 1: Repeating patterns', upText:'Create repeating patterns and identify the repeating unit explicitly.' },
    AC9MFM01: { practice:'/quiz/grade-k/math/ac9mfm01/practice/', up:'/year1/maths/ac9m1m01-comparing-length-mass-capacity-and-duration/', upTitle:'Year 1: Comparing and ordering measurements', upText:'Extend direct comparison to direct and indirect comparison and ordering.' },
    AC9MFM02: { practice:'/quiz/grade-k/math/ac9mfm02/practice/', up:'/year1/maths/ac9m1m03-time-years-months-weeks-days-and-hours/', upTitle:'Year 1: Time and event sequences', upText:'Extend days and times of day into years, months, weeks, days and hours.' },
    AC9MFSP01: { practice:'/quiz/grade-k/math/ac9mfsp01/practice/', up:'/year1/maths/ac9m1sp01-familiar-shapes-and-objects/', upTitle:'Year 1: Compare and classify shapes', upText:'Build from recognising familiar shapes to comparing and classifying them by features.' },
    AC9MFSP02: { practice:'/quiz/grade-k/math/ac9mfsp02/practice/', up:'/year1/maths/ac9m1sp02-directions-and-location/', upTitle:'Year 1: Directions and location', upText:'Extend position words into directions, movement and more precise location language.' },
    AC9MFST01: { practice:'/quiz/grade-k/math/ac9mfst01/practice/', up:'/year1/maths/ac9m1st01-collecting-categorical-data/', upTitle:'Year 1: Collecting categorical data', upText:'Build from sorting and comparing familiar data to collecting categorical data for questions.' },
    AC9EFLA01: { practice:'/quiz/grade-k/english/ac9efla01/practice/', up:'/year1/english/ac9e1la01-how-language-facial-expressions-and-gestures-are-used-to/', upTitle:'Year 1: Language for interacting', upText:'Extend context-sensitive language into asking, offering, requesting, commanding and responding.' },
    AC9EFLA02: { practice:'/quiz/grade-k/english/ac9efla02/practice/', up:'/year1/english/ac9e1la02-language-to-provide-reasons-for-likes-dislikes-and-preferences/', upTitle:'Year 1: Give reasons for preferences', upText:'Extend likes, dislikes and preferences by explaining reasons more deliberately.' },
    AC9EFLA03: { practice:'/quiz/grade-k/english/ac9efla03/practice/', up:'/year1/english/ac9e1la03-how-texts-are-organised-according-to-their-purpose-such-as/', upTitle:'Year 1: Text purpose and organisation', upText:'Move from recognising different text forms to exploring how texts are organised for different purposes.' },
    AC9EFLA04: { practice:'/quiz/grade-k/english/ac9efla04/practice/', up:'/year1/english/ac9e1la05-how-print-and-screen-texts-are-organised-using-features-such/', upTitle:'Year 1: Print and screen navigation', upText:'Extend basic book and screen conventions into headings, contents, links, swipes and navigation features.' },
    AC9EFLA05: { practice:'/quiz/grade-k/english/ac9efla05/practice/', up:'/year1/english/ac9e1la06-that-a-simple-sentence-consists-of-a-single-independent-clause/', upTitle:'Year 1: Simple sentences', upText:'Build from recognising a whole idea to understanding a simple sentence as one independent clause.' },
    AC9EFLA06: { practice:'/quiz/grade-k/english/ac9efla06/practice/', up:'/year1/english/ac9e1la07-that-words-can-represent-people-places-and-things-nouns/', upTitle:'Year 1: Jobs words do', upText:'Extend meaningful word groups by recognising words that name, act, describe and add detail.' },
    AC9EFLA07: { practice:'/quiz/grade-k/english/ac9efla07/practice/', up:'/year1/english/ac9e1la08-how-images-in-different-types-of-texts-contribute-to-meaning/', upTitle:'Year 1: Compare image meaning', upText:'Move from combining picture and word clues to comparing how images contribute across text types.' },
    AC9EFLA08: { practice:'/quiz/grade-k/english/ac9efla08/practice/', up:'/year1/english/ac9e1la09-the-vocabulary-of-learning-area-topics/', upTitle:'Year 1: Learning-area vocabulary', upText:'Extend familiar-context vocabulary into recognising and using words that belong to school learning topics.' },
    AC9EFLA09: { practice:'/quiz/grade-k/english/ac9efla09/practice/', up:'/year1/english/ac9e1la10-that-written-language-uses-punctuation-such-as-full-stops/', upTitle:'Year 1: Punctuation and capitals', upText:'Extend sentence-start capitals and ending punctuation to a wider range of familiar proper nouns and sentence purposes.' },
    AC9EFLE01: { practice:'/quiz/grade-k/english/ac9efle01/practice/', up:'/year1/english/ac9e1le02-literary-texts-and-share-responses-by-making-connections-with/', upTitle:'Year 1: Discuss literature and make connections', upText:'Extend simple similar/different text-to-self connections into fuller discussion of literary texts and personal experiences.' },
    AC9EFLE02: { practice:'/quiz/grade-k/english/ac9efle02/practice/', up:'/year1/english/ac9e1le02-literary-texts-and-share-responses-by-making-connections-with/', upTitle:'Year 1: Discuss literature and make connections', upText:'Extend feelings and thoughts about characters and events into richer supported literary responses and connections.' },
    AC9EFLE03: { practice:'/quiz/grade-k/english/ac9efle03/practice/', up:'/year1/english/ac9e1le03-plot-character-and-setting-which-are-features-of-stories/', upTitle:'Year 1: Plot, character and setting', upText:'Build from identifying characters, events, beginnings and endings to discussing plot, character and setting.' },
    AC9EFLE04: { practice:'/quiz/grade-k/english/ac9efle04/practice/', up:'/year1/english/ac9e1le04-poems-chants-rhymes-and-songs-and-imitate-and-invent-sound/', upTitle:'Year 1: Invent sound patterns', upText:'Move from copying beat, rhyme and sound patterns to discussing, imitating and inventing rhyme and alliteration.' },
    AC9EFLE05: { practice:'/quiz/grade-k/english/ac9efle05/practice/', up:'/year1/english/ac9e1le05-retell-or-adapt-a-familiar-story-using-plot-and-characters/', upTitle:'Year 1: Retell and adapt stories', upText:'Extend ordered retelling and one-part adaptation into retells using plot, characters, vocabulary and familiar text structure.' },
    AC9EFLY01: { practice:'/quiz/grade-k/english/ac9efly01/practice/', up:'/year1/english/ac9e1ly01-different-texts-and-identify-some-features-that-indicate-their/', upTitle:'Year 1: Text features and purpose', upText:'Move from naming familiar text purposes to identifying features that show why different texts were made.' },
    AC9EFLY02: { practice:'/quiz/grade-k/english/ac9efly02/practice/', up:'/year1/english/ac9e1ly02-interaction-skills-including-turn-taking-speaking-clearly-using/', upTitle:'Year 1: Interaction skills', upText:'Extend listening, turn-taking and suitable volume into active listening, clear speaking, questions and connected contributions.' },
    AC9EFLY03: { practice:'/quiz/grade-k/english/ac9efly03/practice/', up:'/year1/english/ac9e1ly03-some-similarities-and-differences-between-imaginative/', upTitle:'Year 1: Compare text types', upText:'Extend imaginative and informative text distinctions by comparing similarities and differences and adding persuasive texts.' },
    AC9EFLY04: { practice:'/quiz/grade-k/english/ac9efly04/practice/', up:'/year1/english/ac9e1ly04-decodable-and-authentic-texts-using-developing-phonic-knowledge/', upTitle:'Year 1: Developing reading fluency', upText:'Build from phonics-first decoding and meaning checks to reading longer decodable and authentic texts with developing phrasing and fluency.' },
    AC9EFLY05: { practice:'/quiz/grade-k/english/ac9efly05/practice/', up:'/year1/english/ac9e1ly05-comprehension-strategies-such-as-visualising-predicting/', upTitle:'Year 1: Comprehension strategies', upText:'Extend predicting and summarising into visualising, connecting, questioning and building literal and inferred meaning.' },
    AC9EFLY06: { practice:'/quiz/grade-k/english/ac9efly06/practice/', up:'/year1/english/ac9e1ly06-and-re-read-to-edit-short-written-and-or-multimodal-texts-to/', upTitle:'Year 1: Create and edit short texts', upText:'Move from shared sentence drafting and editing to creating and rereading short written or multimodal texts for several purposes.' },
    AC9EFLY07: { practice:'/quiz/grade-k/english/ac9efly07/practice/', up:'/year1/english/ac9e1ly07-and-deliver-short-oral-and-or-multimodal-presentations-on/', upTitle:'Year 1: Oral and multimodal presentations', upText:'Extend short spoken reports into presentations with an opening, middle, conclusion, topic vocabulary and controlled delivery.' },
    AC9EFLY08: { practice:'/quiz/grade-k/english/ac9efly08/practice/', up:'/year1/english/ac9e1ly08-words-using-unjoined-lower-case-and-upper-case-letters/', upTitle:'Year 1: Write words with clear letter formation', upText:'Build from forming most letters correctly to writing complete words using unjoined lower- and upper-case letters.' },
    AC9EFLY09: { practice:'/quiz/grade-k/english/ac9efly09/practice/', up:'/year1/english/ac9e1ly09-words-into-separate-phonemes-sounds-including-consonant-blends/', upTitle:'Year 1: Segment phonemes and blends', upText:'Extend rhyme, syllables and simple sound awareness into segmenting words with consonant blends and clusters.' },
    AC9EFLY10: { practice:'/quiz/grade-k/english/ac9efly10/practice/', up:'/year1/english/ac9e1ly10-manipulate-phonemes-in-spoken-words-by-addition-deletion-and/', upTitle:'Year 1: Manipulate phonemes', upText:'Build from oral blending and simple sound changes to adding, deleting and substituting phonemes in spoken words.' },
    AC9EFLY11: { practice:'/quiz/grade-k/english/ac9efly11/practice/', up:'/year1/english/ac9e1ly12-that-a-letter-can-represent-more-than-one-sound-and/', upTitle:'Year 1: Letters can represent more than one sound', upText:'Extend letter names and common sound correspondences by learning that letters can represent different sounds and syllables contain vowel sounds.' },
    AC9EFLY12: { practice:'/quiz/grade-k/english/ac9efly12/practice/', up:'/year1/english/ac9e1ly11-short-vowels-common-long-vowels-consonant-blends-and-digraphs-to/', upTitle:'Year 1: Broader phonics for reading and writing', upText:'Extend CVC sound-to-letter mapping and blending to short and long vowels, blends, digraphs and one- to two-syllable words.' },
    AC9EFLY13: { practice:'/quiz/grade-k/english/ac9efly13/practice/', up:'/year1/english/ac9e1ly13-one-and-two-syllable-words-with-common-letter-patterns/', upTitle:'Year 1: Spell common letter patterns', upText:'Extend sound-based spelling into one- and two-syllable words with common letter patterns.' },
    AC9EFLY14: { practice:'/quiz/grade-k/english/ac9efly14/practice/', up:'/year1/english/ac9e1ly14-and-write-an-increasing-number-of-high-frequency-words/', upTitle:'Year 1: More high-frequency words', upText:'Build from a small bank of familiar high-frequency words to reading and writing an increasing number automatically.' },
    AC9EFLY15: { practice:'/quiz/grade-k/english/ac9efly15/practice/', up:'/year1/english/ac9e1ly15-and-know-how-to-use-grammatical-morphemes-to-create-word/', upTitle:'Year 1: Build word families with morphemes', upText:'Extend awareness of meaningful word parts into recognising and using grammatical morphemes to create related word families.' }
  };

  const getCode = () => {
    const metaCode = window.skillrPageMeta?.curriculumCode;
    if (metaCode) return String(metaCode).toUpperCase();
    const match = `${document.title} ${document.querySelector('h1')?.textContent || ''}`.match(/AC9[A-Z0-9]+/i);
    return match ? match[0].toUpperCase() : '';
  };

  const createLink = (href, text, className = 'curriculum-button') => {
    const link = document.createElement('a');
    link.href = href;
    link.className = className;
    link.textContent = text;
    return link;
  };

  function injectTopicProgression(code, config) {
    if (!window.skillrPageMeta || document.querySelector('.skillr-progression-section')) return;
    const topic = document.querySelector('#topic-guide');
    if (!topic) return;
    const details = document.createElement('details');
    details.className = 'curriculum-topic-section skillr-progression-section';
    details.open = true;
    const summary = document.createElement('summary');
    summary.innerHTML = '<strong>Choose your next learning step</strong>';
    const body = document.createElement('div');
    body.className = 'curriculum-detail-body';
    if (config.down) {
      const downText = document.createElement('p');
      downText.innerHTML = `<strong>Feeling too difficult? Step down.</strong> ${config.downText || 'Review the earlier idea first, then come back when it feels comfortable.'}`;
      body.appendChild(downText);
    }
    if (config.up) {
      const upText = document.createElement('p');
      upText.innerHTML = `<strong>Want to learn more? Step up.</strong> ${config.upText || 'Continue to the next stage of this idea.'}`;
      body.appendChild(upText);
    }
    const links = document.createElement('div');
    links.className = 'curriculum-link-row';
    if (config.down) links.appendChild(createLink(config.down, `← Step down: ${config.downTitle || 'previous level'}`));
    if (config.up) links.appendChild(createLink(config.up, `Step up: ${config.upTitle || 'next level'} →`, 'curriculum-button primary'));
    body.appendChild(links);
    details.append(summary, body);
    const resources = Array.from(topic.querySelectorAll('details.curriculum-topic-section')).find((item) => item.querySelector('summary')?.textContent?.trim().toLowerCase() === 'resources');
    if (resources) topic.insertBefore(details, resources);
    else topic.appendChild(details);
  }

  function injectSlideProgression(code, config) {
    const root = document.querySelector('[data-fixed-slide-viewer]');
    if (!root || root.querySelector('[data-skillr-slide-progression]')) return;
    const nav = document.createElement('div');
    nav.className = 'fixed-slide-viewer__learning-links';
    nav.dataset.skillrSlideProgression = 'true';
    nav.hidden = true;
    if (config.down) nav.appendChild(createLink(config.down, '← Feeling too difficult? Step down', 'fixed-slide-viewer__learning-link'));
    nav.appendChild(createLink(config.practice, 'Practice this topic →', 'fixed-slide-viewer__learning-link fixed-slide-viewer__learning-link--primary'));
    if (config.up) nav.appendChild(createLink(config.up, 'Want to learn more? Step up →', 'fixed-slide-viewer__learning-link'));
    root.appendChild(nav);
    const update = () => {
      const slides = Array.from(root.querySelectorAll('[data-slide]'));
      const activeIndex = slides.findIndex((slide) => !slide.hidden);
      nav.hidden = activeIndex !== slides.length - 1;
    };
    document.addEventListener('skillr:slidechange', (event) => {
      if (event.detail?.root && event.detail.root !== root) return;
      update();
    });
    update();
  }

  const code = getCode();
  const config = PROGRESSION[code];
  if (!config) return;
  injectTopicProgression(code, config);
  injectSlideProgression(code, config);
  window.skillrCurriculumProgression = PROGRESSION;
})();
