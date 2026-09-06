// Worksheet-only review for Year 1 English LY06-LY10. Practice and Test banks stay unchanged.
(() => {
 const edits = {"AC9E1LY06": {"ac9e1ly06-p-001": {"question": "Which sentence clearly reports a fact about a cat?", "explanation": "A cat needs food is a fact sentence. It tells information rather than a personal opinion."}, "ac9e1ly06-p-004": {"question": "Read and edit: kim has a book", "explanation": "Kim has a book. is correct because the name starts with a capital letter and the sentence ends with a full stop."}, "ac9e1ly06-p-008": {"question": "Which sentence is easiest to read as a complete idea?", "explanation": "The goat sat on the mat is easiest to read because the words are in a sensible order and spaced correctly."}}, "AC9E1LY07": {"ac9e1ly07-p-001": {"question": "Which opening clearly tells the topic of a short talk?", "explanation": "Today I will talk about cats tells the audience what the talk will be about."}, "ac9e1ly07-p-005": {"question": "Which order is best for a short presentation?", "explanation": "Opening, facts, ending is best because a talk needs a beginning, middle and conclusion."}, "ac9e1ly07-p-008": {"question": "Which sentence gives one learnt fact for a talk?", "explanation": "A goat needs water gives a factual detail that can belong in the middle of a learnt-topic talk."}}, "AC9E1LY08": {"ac9e1ly08-p-001": {"question": "Which is the lower-case letter for A?", "correct": 2, "explanation": "a is the lower-case form of A."}, "ac9e1ly08-p-002": {"question": "Which is the upper-case letter for b?", "correct": 1, "explanation": "B is the upper-case form of b."}, "ac9e1ly08-p-005": {"question": "Choose the correctly written name.", "correct": 1, "explanation": "Ava is correct because a name begins with a capital letter and the other letters are lower case."}}, "AC9E1LY09": {"ac9e1ly09-p-001": {"question": "Say ship. Which option shows its separate sounds?", "explanation": "/sh/ /i/ /p/ is correct because sh makes one sound."}, "ac9e1ly09-p-002": {"question": "Say frog. Which option shows its separate sounds?", "explanation": "/f/ /r/ /o/ /g/ is correct because the blend has two consonant sounds."}, "ac9e1ly09-p-004": {"question": "Say nest. Which option shows all the sounds?", "explanation": "/n/ /e/ /s/ /t/ is correct because both final cluster sounds are heard."}}, "AC9E1LY10": {"ac9e1ly10-p-001": {"question": "Say cat. Change /c/ to /h/. What word do you make?", "explanation": "Changing the first sound /c/ to /h/ makes hat."}, "ac9e1ly10-p-003": {"question": "Say sit. Change /i/ to /a/. What word do you make?", "explanation": "Changing the middle vowel sound /i/ to /a/ makes sat."}, "ac9e1ly10-p-005": {"question": "Say cup. Change /p/ to /t/. What word do you make?", "explanation": "Changing the final sound /p/ to /t/ makes cut."}}};
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
