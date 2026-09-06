// Worksheet-only review for Year 1 English LY11-LY15. Practice and Test banks stay unchanged.
(() => {
 const edits = {"AC9E1LY11": {"ac9e1ly11-p-001": {"question": "Which word has the digraph sh?", "explanation": "ship has sh. The two letters sh work together to make one sound."}, "ac9e1ly11-p-003": {"question": "Which word has the consonant blend fr?", "explanation": "frog has fr. In the blend fr, both /f/ and /r/ can be heard."}, "ac9e1ly11-p-005": {"question": "Which word has the long-vowel pattern ai?", "explanation": "rain has ai. The letters ai commonly make the long a sound."}}, "AC9E1LY12": {"ac9e1ly12-p-001": {"question": "Clap cat. How many syllables does it have?", "explanation": "cat has one syllable because it has one vowel sound."}, "ac9e1ly12-p-002": {"question": "In which pair does the letter g make two different sounds?", "explanation": "gem and go is correct. The letter g has a soft sound in gem and a hard sound in go."}, "ac9e1ly12-p-003": {"question": "Clap sunset. How many syllables does it have?", "explanation": "sunset has two syllables: sun-set. Each syllable has a vowel sound."}}, "AC9E1LY13": {"ac9e1ly13-p-001": {"question": "Which spelling correctly writes the two-syllable word rabbit?", "explanation": "rabbit is correct. Say the parts rab-bit, then check each syllable."}, "ac9e1ly13-p-002": {"question": "Which spelling correctly joins sun and set?", "explanation": "sunset is correct. It is made by writing sun then set."}, "ac9e1ly13-p-003": {"question": "Which spelling correctly writes chicken?", "explanation": "chicken is correct. It starts with ch and uses the common ck pattern after a short vowel sound."}}, "AC9E1LY14": {"ac9e1ly14-p-001": {"question": "Which high-frequency word completes the sentence? Mia ___ happy.", "explanation": "was completes the sentence. Read the whole sentence to check that it sounds right."}, "ac9e1ly14-p-003": {"question": "Which high-frequency word completes the sentence? Can ___ help me?", "explanation": "you completes the sentence because the speaker is asking another person for help."}, "ac9e1ly14-p-005": {"question": "Which high-frequency word completes the sentence? Please ___ here.", "explanation": "come completes the sentence. come is a high-frequency word students should read quickly and spell from memory."}}, "AC9E1LY15": {"ac9e1ly15-p-001": {"question": "Add -ing to play. Which word do you make?", "explanation": "playing is made from the base word play plus the ending -ing."}, "ac9e1ly15-p-003": {"question": "Which pair belongs to the same word family?", "explanation": "look and looking belong together because they share the base word look."}, "ac9e1ly15-p-007": {"question": "What is the base word in reading?", "explanation": "read is the base word. The ending -ing has been added to make reading."}}};
 const code = String(window.quizConfig?.skillCode || '').toUpperCase();
 const codeEdits = edits[code];
 if (!codeEdits || !Array.isArray(window.skillrPracticeQuestions)) return;
 const editedIds = Object.keys(codeEdits);
 const selectedIds = [...editedIds];
 for (const q of window.skillrPracticeQuestions) {
  if (selectedIds.length >= 8) break;
  if (!selectedIds.includes(q.id)) selectedIds.push(q.id);
 }
 const selected = new Set(selectedIds);
 window.skillrWorksheetQuestions = window.skillrPracticeQuestions.filter(q => selected.has(q.id)).sort((a, b) => selectedIds.indexOf(a.id) - selectedIds.indexOf(b.id)).map(q => {
  const edit = codeEdits[q.id];
  if (!edit) return q;
  const next = {...q, ...edit};
  if (edit.explanation) next.structuredExplanation = {...(q.structuredExplanation || {}), summary: edit.explanation};
  return next;
 });
})();
