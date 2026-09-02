(() => {
"use strict";
const units=window.SkillrYear3EnglishData||{};
const F={
AC9E3LA01:["Use collaborative language to start, negotiate and build on ideas in group talk.","Choose turn-taking language to suit informal and more formal situations.","Recognise that First Nations Australian cultural protocols can shape ways of interacting and speaking."],
AC9E3LA02:["Use modal verbs such as might, could, should and must to change force.","Notice how adverbs, nouns and verbs evaluate characters and events.","Build precise vocabulary for emotions, positions and judgements."],
AC9E3LA03:["Match text structure and language features to purpose.","Recognise stages in arguments, recounts, reports, narratives, responses, explanations and poetry."],
AC9E3LA04:["Group related information into paragraphs.","Recognise topic sentences and supporting details in informative paragraphs.","Understand that narrative paragraphs can vary in length and structure."],
AC9E3LA05:["Explain how headings, subheadings, chapter headings and hyperlinks help readers navigate print and digital texts."],
AC9E3LA06:["Find clauses by locating verbs and the words linked to them.","Make singular subjects agree with singular verbs and plural subjects agree with plural verbs."],
AC9E3LA07:["Distinguish verbs for doing, saying, sensing and relating.","Explain how different verb types shape meaning in a clause."],
AC9E3LA08:["Use verb tense and time adverbials to show when events happen.","Recognise irregular tense changes such as catch and caught."],
AC9E3LA09:["Explain how character position, distance, size, gaze, facial expression and gesture extend meaning in images.","Explain how gaze and camera distance can change the viewer's relationship with an image."],
AC9E3LA10:["Use technical and topic-specific vocabulary precisely.","Recognise words whose meanings change with context.","Build related words with prefixes and suffixes."],
AC9E3LA11:["Use apostrophes for missing letters in contractions.","Use apostrophes for singular and plural possession."],
AC9E3LE01:["Compare how different authors portray characters, events and settings.","Discuss characters' relationships with Country/Place and family in First Nations Australian literature.","Compare variations in familiar storylines and Australian settings."],
AC9E3LE02:["Connect character experiences with relevant personal experiences and prior knowledge.","Explain preferences for texts using clear reasons."],
AC9E3LE03:["Explain how descriptive language and illustrations create characters, settings and mood.","Use actions, motivations and description as evidence about characters."],
AC9E3LE04:["Explain effects of rhythm, onomatopoeia and imagery.","Ask useful questions about why an author or poet chose a literary device."],
AC9E3LE05:["Create imaginative texts using ideas from literature.","Adapt a familiar text by changing a setting, ending, character or other feature while keeping the new text coherent."],
AC9E3LY01:["Explain how texts with the same purpose change for different audiences.","Compare language, detail and design choices for adult and child audiences."],
AC9E3LY02:["Build on and connect other people's ideas in discussion.","Listen for specific information and respond with comments or summaries.","Use speaking and listening behaviours that suit group roles and situations."],
AC9E3LY03:["Identify audience and purpose using language and image clues.","Recognise persuasive features, including advertisements aimed at children.","Explain the purpose of imaginative texts such as fables."],
AC9E3LY04:["Combine phonics, word knowledge, vocabulary and grammar to read accurately and fluently.","Re-read and self-correct when meaning breaks down."],
AC9E3LY05:["Predict using topic knowledge, vocabulary and experience with similar texts.","Find important ideas, events and details.","Ask questions, compare texts and draw inferences using evidence and prior knowledge.","Judge whether a text is relevant for a task."],
AC9E3LY06:["Plan and organise ideas into an appropriate text structure and simple paragraphs.","Use simple and compound sentences, mostly consistent tense and topic vocabulary.","Edit spelling, homophones and apostrophes using dictionaries, spellcheck and meaning."],
AC9E3LY07:["Research and sequence ideas for a short presentation.","Use precise vocabulary, useful visual features and details to elaborate ideas.","Adjust tone, pace, pitch and volume for purpose and audience."],
AC9E3LY08:["Form joined letters clearly and keep letter size consistent."],
AC9E3LY09:["Use sound-letter relationships, syllables, blending and segmenting to read and write multisyllabic words.","Read and write complex consonant blends and digraphs that can represent different sounds."],
AC9E3LY10:["Use base words, prefixes and suffixes to read and understand multimorphemic words.","Apply common spelling generalisations when adding suffixes."],
AC9E3LY11:["Use sound-letter relationships and less common patterns such as dge to spell words.","Spell words containing three-letter consonant blends."],
AC9E3LY12:["Read and write most high-frequency words accurately.","Use sentence meaning and grammar to choose the correct homophone, such as brake/break or ate/eight."]};
for(const [code,focus] of Object.entries(F)){const u=units[code];if(!u)continue;u.studentFacingFocus=focus;u.childGoal=`I can ${String(u.learn||u.desc||u.title).replace(/^I can\s+/i,"").replace(/[.]$/,"").replace(/^./,c=>c.toLowerCase())}.`;u.subtitle=u.childGoal;u.learn=u.childGoal;u.mastery=focus.map(x=>`I can ${x.replace(/[.]$/,"").replace(/^./,c=>c.toLowerCase())}.`);}
window.SkillrYear3EnglishStudentFacing={focus:F,version:"2026-09-02-year3-student-facing"};
})();
