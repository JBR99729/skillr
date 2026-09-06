// Worksheet-only review for Year 1 English LY01-LY05. Practice and Test banks stay unchanged.
(() => {
 const edits = {"AC9E1LY01": {"ac9e1ly01-p-001": {"question": "Read: First we mixed the flour. Then we baked the cake. Which feature shows the text is a recount or sequence?", "explanation": "First and then show events in order, so the reader can follow what happened."}, "ac9e1ly01-p-003": {"question": "Read: I think the farm is best because it is fun. What is the writer giving?", "explanation": "The writer gives an opinion and a reason, which helps show a persuasive purpose."}, "ac9e1ly01-p-008": {"question": "Read: Please choose our new map. It is the best! What is the writer trying to do?", "explanation": "The writer is trying to persuade the reader to choose the map."}}, "AC9E1LY02": {"ac9e1ly02-p-001": {"question": "Kim is speaking during a group task. What should Mia do before sharing her idea?", "explanation": "Mia should listen, wait for a turn and then respond clearly."}, "ac9e1ly02-p-004": {"question": "Zoe says, I like the beach. Which reply connects to Zoe's contribution?", "explanation": "A connected reply stays on the beach idea or asks Zoe for more detail."}, "ac9e1ly02-p-005": {"question": "Which question helps a discussion continue after someone shares an idea?", "explanation": "A helpful question asks for more information, a reason or an example."}}, "AC9E1LY03": {"ac9e1ly03-p-004": {"question": "Read: The tiny fox flew to the moon. What kind of text is this most likely to be?", "explanation": "It is imaginative because the event is made up and could not happen in real life."}, "ac9e1ly03-p-007": {"question": "Read: Rain falls from clouds. Is this fact or opinion?", "explanation": "It is a fact because it gives information that can be checked."}, "ac9e1ly03-p-008": {"question": "Read: Please choose our new map. It is the best! What is the writer trying to do?", "explanation": "The writer is trying to persuade, using a request and an opinion."}}, "AC9E1LY04": {"ac9e1ly04-p-001": {"question": "Blend the sounds /c/ /a/ /t/. Which word do they make?", "explanation": "Blending /c/ /a/ /t/ makes cat."}, "ac9e1ly04-p-007": {"question": "Read aloud: Zoe sees a fish. Where should your voice pause?", "explanation": "A good reader pauses after the whole idea, not between every word."}, "ac9e1ly04-p-008": {"question": "If The goat can fly does not make sense, what should you do?", "explanation": "Reread and check the sounds, words and meaning so you can self-correct."}}, "AC9E1LY05": {"ac9e1ly05-p-001": {"question": "Read: Dark clouds filled the sky. Mia took an umbrella. What may happen next?", "explanation": "It may rain. The clouds and umbrella are clues for the prediction."}, "ac9e1ly05-p-005": {"question": "Read: Ava heard a bark at the gate. What useful question could you ask?", "explanation": "A useful question asks about the text, such as who barked or why the sound came from the gate."}, "ac9e1ly05-p-008": {"question": "Read: Max smiled after opening the gift. How did Max probably feel?", "explanation": "Max probably felt happy or pleased. The smile is the clue."}}};
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
