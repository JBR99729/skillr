/* Ben & Vani: the single source for identity, age bands and guidance policy. */
(function (root) {
  'use strict';
  const config = {
    version: '20260909-1',
    enabled: true,
    storageKey: 'skillr.companions.visible.v1',
    atlas: '/assets/companions/approved-characters.png',
    artworkSize: [1024, 1536],
    // CSS windows into the approved artwork; original pixels remain untouched.
    portraits: [
      { ben: [55, 672, 130, 182], vani: [180, 675, 132, 185] },
      { ben: [374, 647, 130, 182], vani: [510, 650, 130, 182] },
      { ben: [707, 645, 130, 182], vani: [850, 647, 130, 182] },
      { ben: [198, 1024, 130, 182], vani: [332, 1040, 130, 182] },
      { ben: [594, 1024, 130, 182], vani: [737, 1033, 130, 182] }
    ],
    characters: { ben: { name: 'Ben', colour: '#087e8b' }, vani: { name: 'Vani', colour: '#f5b928' } },
    bands: [
      { maxYear: 2, row: 0, label: 'Foundation–Year 2', intro: 'We’re Ben and Vani. Let’s try one small step together.' },
      { maxYear: 4, row: 1, label: 'Years 3–4', intro: 'We’re Ben and Vani. Explore the lesson with us, one step at a time.' },
      { maxYear: 6, row: 2, label: 'Years 5–6', intro: 'Work through the examples with Ben and Vani, then try the skill yourself.' },
      { maxYear: 8, row: 3, label: 'Years 7–8', intro: 'Ben and Vani can help you navigate the examples and check your reasoning.' },
      { maxYear: 12, row: 4, label: 'Years 9–12', intro: 'Use Ben and Vani’s optional study guidance, or work independently.' }
    ],
    // Presentation rules do not restrict curriculum access or change year placement.
    topics: {
      AC9S9U02: {
        presentation: 'quiet',
        note: 'This Year 9 science lesson includes reproductive cells, organs and scientific diagrams. Use accurate scientific terms and respectful discussion. Teachers and parents can preview the material; students can ask a trusted adult about anything they find unclear.'
      }
    },
    sensitiveTitle: /\b(reproductive|reproduction|puberty|sexual health|menstruation|fertilisation|fertilization)\b/i,
    sensitiveNote: 'This lesson discusses body development or reproduction using scientific language. Teachers and parents can preview the material. Ask a trusted adult if you would like help understanding it.',
    prompts: {
      learn: 'Start with the main idea. Take your time before moving on.',
      vocabulary: 'Look at the key words, then find one in an example.',
      example: 'Follow the worked thinking. What does each step show?',
      practice: 'Try this part yourself before opening any answers.',
      review: 'Explain your thinking. Which part would you like to revisit?',
      misconception: 'Check this common mix-up against the example.',
      next: 'Read this part carefully. Move on when you are ready.',
      complete: 'You’ve reached the end of the guided route. Try the practice independently, or revisit a step.',
      correct: 'Read the explanation and check how it matches your thinking.',
      incorrect: 'Let’s check the feedback. Find the step you would change next time.',
      pending: 'Your response is ready for an adult to review with you.',
      independent: 'Take your time and use your own reasoning. The guide will step back during the test.'
    },
    subjectHints: {
      maths: 'What is the question asking you to find? Choose a model or method from the lesson and show your first step.',
      science: 'What can you observe, and what does the question ask you to explain? Use the evidence provided.',
      english: 'Read the wording carefully. Look for a word, sentence or detail in the text that supports your response.',
      general: 'Read the question again. Identify what you need to do, then try one small step.'
    },
    siteMessages: {
      '/about.html': { title: 'Meet Ben and Vani', message: 'We’re SkillrHub’s fictional learning companions. We grow with your year level and help you build the confidence to work independently.' },
      '/updates.html': { title: 'Explore what’s new with Ben and Vani', message: 'Find the latest improvements below, then try them in your next lesson. Your feedback helps SkillrHub keep improving.' },
      '/contact.html': { title: 'Help make the next lesson clearer', message: 'Tell the SkillrHub team which page needs attention and what could be clearer. A teacher or parent can help younger students send feedback.' },
      '/how-to-use-skillr.html': { title: 'Let’s find your first step', message: 'Choose your year and topic. Read the lesson, follow a worked example, then try Practice and Test at your own pace.' }
    }
  };
  config.context = function (path, title) {
    const code = (path.match(/\b(ac9[a-z0-9]+)(?=-|\/|$)/i) || [])[1]?.toUpperCase() || '';
    const yearMatch = path.match(/(?:^|\/)(?:year-?|grade-)(\d{1,2})(?=\/|-|$)/i);
    const codeYear = code.match(/^AC9[EMS](\d{1,2}|F)/i);
    const year = yearMatch ? Number(yearMatch[1]) : codeYear ? (codeYear[1] === 'F' ? 0 : Number(codeYear[1])) : /(?:foundation|grade-k)/i.test(path) ? 0 : 4;
    const subjectMatch = path.match(/\/(maths?|science|english)(?:\/|-)/i);
    const subject = subjectMatch ? subjectMatch[1].replace(/^math$/, 'maths') : 'general';
    const cleanPath = path.replace(/index\.html$/i, '').replace(/\/$/, '');
    const classroom = /\/(teacher-slides|teacher-deck)(\/|$)/i.test(path) || /^\/teacher-slides\//i.test(path);
    const test = /\/test(?:\/|$)/i.test(path);
    const activity = /\/(practice|test|retake|review)(?:\/|$)/i.test(path) || /daily-drills/i.test(path);
    const worksheet = /\/(worksheet|homework)(?:\/|$)/i.test(path);
    const topic = !!code && !activity && !worksheet && !classroom;
    const policy = config.topics[code] || {};
    const sensitive = !!policy.note || config.sensitiveTitle.test(title || '');
    return { code, year, subject, classroom, test, activity, worksheet, topic, home: cleanPath === '',
      band: config.bands.find(b => year <= b.maxYear) || config.bands.at(-1),
      quiet: sensitive || year >= 9,
      note: policy.note || (sensitive ? config.sensitiveNote : ''), sensitive };
  };
  root.SkillrCompanionConfig = config;
  if (typeof module !== 'undefined' && module.exports) module.exports = config;
}(typeof window !== 'undefined' ? window : globalThis));
