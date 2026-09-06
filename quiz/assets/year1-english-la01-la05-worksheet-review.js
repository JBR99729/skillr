// Worksheet-only review for Year 1 English LA01-LA05. Practice and Test banks stay unchanged.
(() => {
 const edits = {"AC9E1LA01": {"ac9e1la01-er1-p-007": {"question": "A child points to an empty chair and says, 'You can sit here.' What does the gesture help show?", "explanation": "The gesture shows which chair here means. Words and gesture work together."}, "ac9e1la01-er1-p-009": {"question": "Which question is open and invites a longer answer?", "explanation": "An open question asks for ideas or explanation, not just yes or no."}, "ac9e1la01-er1-p-021": {"question": "A student wants a turn with the scissors. Write a request using suitable words, voice or gesture.", "explanation": "A good response uses request wording and a calm interaction choice."}}, "AC9E1LA02": {"ac9e1la02-er1-p-001": {"question": "Which sentence gives a preference and a reason?", "explanation": "A preference names the chosen option, and because introduces the reason."}, "ac9e1la02-er1-p-004": {"question": "Which sentence is a preference rather than a fact?", "explanation": "A preference tells a personal choice that another person may not share."}, "ac9e1la02-er1-p-021": {"question": "Write a polite preference that disagrees with a friend's choice and gives a reason.", "explanation": "The answer should state the speaker's preference respectfully and explain it."}}, "AC9E1LA03": {"ac9e1la03-er1-p-001": {"question": "Which text would usually use time words such as first, next and finally?", "explanation": "Time words organise events or steps in order."}, "ac9e1la03-er1-p-005": {"question": "A report about frogs has headings for body, food and habitat. Why are headings useful?", "explanation": "Headings group related information so readers can find facts quickly."}, "ac9e1la03-er1-p-022": {"question": "Choose a text purpose and name one organisation feature that would help that purpose.", "explanation": "The feature should match the job of the text, such as steps for instructions or headings for information."}}, "AC9E1LA04": {"ac9e1la04-er1-p-001": {"question": "Which word best completes the rhyme: The cat sat near the mat and looked at a ____.", "explanation": "Hat rhymes because it has the same spoken ending as cat and mat."}, "ac9e1la04-er1-p-006": {"question": "A chant repeats the line The rain came down. What does the repeated line help do?", "explanation": "The repeated line links the parts and helps listeners hear the pattern."}, "ac9e1la04-er1-p-023": {"question": "Add one new line to a chant that keeps either the repeated words or the rhyme.", "explanation": "The new line should imitate a sound pattern from the chant."}}, "AC9E1LA05": {"ac9e1la05-er1-p-001": {"question": "Which print feature helps you find a section quickly in a book?", "explanation": "A table of contents lists sections and page numbers."}, "ac9e1la05-er1-p-005": {"question": "On a screen, which feature usually moves the reader to the next part?", "explanation": "A Next button or forward arrow moves to the next screen or section."}, "ac9e1la05-er1-p-022": {"question": "Compare one book feature and one screen feature. Explain how each helps the reader.", "explanation": "A good answer names each feature and explains its navigation or organisation job."}}};
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
