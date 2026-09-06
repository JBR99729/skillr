(() => {
  "use strict";

  const banks = window.SkillrFoundationEnglishWorksheetData || {};
  const normalise = (value) => String(value ?? "")
    .trim()
    .replace(/\s+/g, " ");
  const softNormalise = (value) => normalise(value).toLowerCase().replace(/[.!?]+$/g, "");
  const nextPosition = new Map();

  for (const [code, bank] of Object.entries(banks)) {
    for (const question of bank.questions || []) {
      if (question.type !== "single" || !Array.isArray(question.answers) || question.answers.length < 3) continue;
      let correct = question.answers.findIndex((answer) => normalise(answer) === normalise(question.answer));
      if (correct < 0) {
        const candidates = question.answers
          .map((answer, index) => softNormalise(answer) === softNormalise(question.answer) ? index : -1)
          .filter((index) => index >= 0);
        if (candidates.length === 1) [correct] = candidates;
      }
      if (correct < 0) continue;
      const [answer] = question.answers.splice(correct, 1);
      const hasAudioAnswers = Array.isArray(question.audio_answers) && question.audio_answers.length === question.answers.length + 1;
      const audioAnswer = hasAudioAnswers ? question.audio_answers.splice(correct, 1)[0] : null;
      const optionCount = question.answers.length + 1;
      const target = (nextPosition.get(optionCount) || 0) % optionCount;
      question.answers.splice(target, 0, answer);
      if (hasAudioAnswers) question.audio_answers.splice(target, 0, audioAnswer);
      nextPosition.set(optionCount, (nextPosition.get(optionCount) || 0) + 1);
    }
  }

  window.SkillrFoundationEnglishWorksheetBalanced = true;

  if (/\/quiz\/grade-k\/english\/ac9ef(?:la|le|ly)\d{2}\/worksheet\//i.test(location.pathname)) {
    document.write('<script src="/assets/foundation-english-student-facing-core.js?v=20260902"><\/script>');
    document.write('<script src="/assets/foundation-english-student-facing-la.js?v=20260902"><\/script>');
    document.write('<script src="/assets/foundation-english-student-facing-le.js?v=20260902"><\/script>');
    document.write('<script src="/assets/foundation-english-student-facing-ly1.js?v=20260902"><\/script>');
    document.write('<script src="/assets/foundation-english-student-facing-ly2.js?v=20260902"><\/script>');
    document.write('<script>window.SkillrFoundationEnglishStudentFacing?.enhanceWorksheet();<\/script>');
  }
})();




// Scoped English sound review: AC9EFLY09-11.
(() => { const edits={"AC9EFLY09": {"0": {"question": "Adult: say “hat, sun, mat”. Which word does not rhyme with the other two?", "answers": ["hat", "mat", "sun", "They all rhyme"], "answer": "sun", "hint": "Repeat the words aloud and compare their endings."}, "2": {"question": "Adult: say “banana” naturally. How many syllables does the child hear?", "hint": "Let the child clap the spoken beats before counting; do not supply the count first."}}, "AC9EFLY10": {"1": {"question": "Adult: say the beginning sounds of moon, apple and top separately. Ask the child to blend the sounds into a word.", "hint": "Say the speech sounds in order, without adding an extra vowel to consonants."}, "8": {"question": "Adult: say “The rabbit hops.” Count its words. Then say “shop” and count its speech sounds. Explain what each counter represents.", "answer": "The sentence has three words. Shop has three speech sounds; the two letters sh represent one sound. The first task counts words and the second counts sounds within one word.", "hint": "Keep both tasks oral; use a fresh set of counters for the second task."}}, "AC9EFLY11": {"0": {"question": "Match each upper-case letter to its lower-case partner. Say the letter names.", "matchLeft": ["A", "D", "G"], "matchRight": ["g", "a", "d"]}, "3": {"question": "Match each printed vowel to its short-sound cue word. Adult: name the cue words aloud.", "matchLeft": ["e", "i", "o"]}, "7": {"question": "Pair these letters: B, d, D, g, G, b. Name each pair and explain why the letters belong together."}}}; const fixes={"the short middle sound in apple": "the short vowel sound at the beginning of apple", "the humming final sound in nest": "the humming sound at the beginning of nest", "the short middle sound in insect": "the short vowel sound at the beginning of insect", "the popping final sound in pig": "the popping sound at the beginning of pig", "Insect middle": "Insect beginning"};

 for(const code of ['AC9EFLY09','AC9EFLY10','AC9EFLY11']) {
  const unit=window.SkillrFoundationEnglishWorksheetData?.[code]; if(!unit)continue;
  unit.questions.forEach((q,i)=>{
   for(const key of ['question','answer','summary','hint'])if(typeof q[key]==='string')for(const [a,b] of Object.entries(fixes))q[key]=q[key].split(a).join(b);
   const edit=edits[code]?.[i];if(edit){Object.assign(q,edit);q.summary=`To check the answer, ${q.alignment.method}.`;}
  });
 }
 window.SkillrFoundationEnglishSoundReview = Object.fromEntries(['AC9EFLY09','AC9EFLY10','AC9EFLY11'].map(code => [code, JSON.parse(JSON.stringify(window.SkillrFoundationEnglishWorksheetData[code]))]));
 if (location.pathname.includes("/worksheet/")) document.write('<script>Object.assign(window.SkillrFoundationEnglishWorksheetData, window.SkillrFoundationEnglishSoundReview);<\/script>');
})();
