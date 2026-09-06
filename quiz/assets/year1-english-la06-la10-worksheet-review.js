// Worksheet-only review for Year 1 English LA06-LA10. Practice and Test banks stay unchanged.
(() => {
 const edits = {"AC9E1LA06": {"ac9e1la06-er2-p-001": {"question": "Which group of words gives one complete idea?", "explanation": "A simple sentence can stand alone when it tells one clear idea."}, "ac9e1la06-er2-p-006": {"question": "Beside the pond. What is missing if this is meant to stand alone as a sentence?", "explanation": "The fragment gives a place but does not tell who or what is there, or what happens."}, "ac9e1la06-er2-p-010": {"question": "Which repair makes The little boat a complete sentence?", "explanation": "A repair must add what happens so the words express a complete idea."}}, "AC9E1LA07": {"ac9e1la07-er2-p-001": {"question": "In The ducks paddle, which word tells the action?", "explanation": "Paddle tells what the ducks do."}, "ac9e1la07-er2-p-003": {"question": "In A soft blanket covered me, which word describes the blanket?", "explanation": "Soft describes the quality of the blanket."}, "ac9e1la07-er2-p-010": {"question": "Replace the repeated name: Omar waved. Omar smiled.", "explanation": "A pronoun can replace the repeated name when the reader still knows who it means."}}, "AC9E1LA08": {"ac9e1la08-er2-p-001": {"question": "Look at the two book images. Which image helps a reader name parts of a plant?", "explanation": "A labelled plant image helps identify the plant parts named in an information text."}, "ac9e1la08-er2-p-006": {"question": "A story says, The room was empty. The picture shows a kitten under a chair. What extra information does the picture add?", "explanation": "The picture adds that a kitten is hidden in the room, so it changes the reader's understanding."}, "ac9e1la08-er2-p-010": {"question": "A comic uses a thought bubble. A science diagram uses label lines. What does each image feature help the reader understand?", "explanation": "A thought bubble shows a character's thinking, while label lines identify parts or features."}}, "AC9E1LA09": {"ac9e1la09-er2-p-001": {"question": "In a plant lesson, which word names the part usually growing into the soil?", "explanation": "Root is the plant-topic word for the part that usually grows into soil."}, "ac9e1la09-er2-p-007": {"question": "An animal's habitat is the place where it lives. Which phrase describes a habitat?", "explanation": "A habitat is an animal's living place, so the answer should describe where it lives."}, "ac9e1la09-er2-p-008": {"question": "In a science lesson, observe the shell means what?", "explanation": "Observe means look carefully and notice details."}}, "AC9E1LA10": {"ac9e1la10-er2-p-001": {"question": "Which mark ends the direct question Where is my hat?", "explanation": "A direct question needs a question mark."}, "ac9e1la10-er2-p-004": {"question": "Which word needs a capital in We visit the park on tuesday?", "explanation": "Tuesday is the name of a day, so it needs a capital letter."}, "ac9e1la10-er2-p-007": {"question": "A dog's name is patch. Which version writes the name correctly?", "explanation": "Patch begins with a capital letter because it is a name."}}};
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
