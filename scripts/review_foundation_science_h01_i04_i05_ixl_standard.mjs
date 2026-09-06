import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const BATCH = ["AC9SFH01", "AC9SFI04", "AC9SFI05"];
const STAMP = "20260906-foundation-science-ixl-h01-i04-i05";

const descriptors = {
  AC9SFH01: "explore the ways people make and use observations and questions to learn about the natural world",
  AC9SFI04: "compare observations with predictions with guidance",
  AC9SFI05: "share questions, predictions, observations and ideas with others"
};

const skills = {
  AC9SFH01: "use observations and questions to learn",
  AC9SFI04: "compare predictions with observations",
  AC9SFI05: "share science questions and observations"
};

const titles = {
  AC9SFH01: "Observing and Asking About Nature",
  AC9SFI04: "Compare Predictions and Observations",
  AC9SFI05: "Share Science Ideas"
};

function q(code, n, bank, question, answers, correct, explanation, hint, difficulty = 2) {
  const stem = question.trim();
  return {
    id: `${code.toLowerCase()}-${bank === "practice" ? "p" : "t"}-${String(n).padStart(3, "0")}`,
    curriculumCode: code,
    bank,
    skill: skills[code],
    question: stem,
    explanation,
    printable: true,
    type: "single",
    answers,
    correct,
    audioPrompt: stem,
    structuredExplanation: { summary: explanation, hint },
    difficulty,
    difficultyTier: difficulty === 1 ? "recognise" : difficulty === 2 ? "apply" : "reason",
    sequencePriority: n,
    qualitySchema: "foundation-science-ixl-standard-v2"
  };
}

const bankData = {
  AC9SFH01: {
    practice: [
      ["A child sees tiny lines on a leaf. What helps the child learn more?", ["Look closely with a magnifying glass.", "Guess the leaf is old.", "Paint new lines on it."], 0, "Careful looking, sometimes with a tool, helps us observe real details.", "Choose the action that gathers evidence."],
      ["A class notices ants walking to a tree. Which question comes from that observation?", ["What are the ants carrying?", "Who has the tallest pencil?", "What colour is the classroom wall?"], 0, "The question is linked to what the class noticed in nature.", "Match the question to the observed ants."],
      ["A child wants to learn which birds visit the playground. What should they do first?", ["Watch quietly and record the birds seen.", "Choose a bird from a storybook.", "Tell the birds where to sit."], 0, "Watching quietly gives information about the real birds that visit.", "Science begins with careful observation."],
      ["A seedling has two leaves on Monday and three leaves on Friday. What did the child learn by observing?", ["The seedling changed during the week.", "The seedling can talk.", "The pot changed into a leaf."], 0, "Repeated observations can show change over time.", "Compare the two observations."],
      ["A child says, 'This rock feels rough.' What kind of science work is this?", ["An observation", "A prediction", "A made-up story"], 0, "Feeling a safe rock and describing its surface is an observation.", "An observation tells what was noticed."],
      ["A class smells a flower only after the teacher says it is safe. What are they using?", ["A sense safely", "A ruler for length", "A weather chart"], 0, "Smell is one sense, and it should be used only when safe.", "Think about how the class noticed the flower."],
      ["A child sees a puddle getting smaller. Which question could help them learn more?", ["Does the puddle change during the day?", "Is my hat blue?", "Can the puddle read?"], 0, "The useful question asks about the observed puddle change.", "Keep the question connected to the observation."],
      ["Two children disagree about whether a shell is smooth or bumpy. What should they do?", ["Look and feel safely together.", "Pick the answer said first.", "Hide the shell."], 0, "Checking the shell together helps compare observations with evidence.", "Use the object as evidence."],
      ["A photo shows a beetle with six legs. How can the photo help the class?", ["It keeps an observation to discuss later.", "It proves every beetle is the same size.", "It makes the beetle grow."], 0, "A photo can record visible features for later discussion.", "Think about what a record is for."],
      ["A child asks, 'Why are these leaves curled?' What should happen before explaining?", ["Observe the leaves carefully.", "Choose a favourite answer.", "Throw the leaves away."], 0, "Careful observation should come before an explanation.", "Evidence first, explanation after."],
      ["Which sentence is an observation?", ["The feather is soft.", "The feather will fly tomorrow.", "The feather likes music."], 0, "The sentence describes something that can be noticed.", "Choose what can be sensed."],
      ["Which sentence is a question about the natural world?", ["How does this snail move?", "Where is my lunch box?", "Which game should we play?"], 0, "The snail question can guide an observation about a living thing.", "Look for a nature question."],
      ["A child hears frogs after rain. What could they ask?", ["Do frogs call more after rain?", "Can frogs write numbers?", "Is the chair heavy?"], 0, "The question grows from the child’s observation of frog sounds after rain.", "Use the sound observation."],
      ["A class watches the same shadow in the morning and afternoon. Why observe twice?", ["To notice if it changes.", "To make the shadow vanish.", "To choose the nicest time."], 0, "Observing at two times can show whether something changes.", "Compare the observations."],
      ["A child sees different seeds. What tool could help observe small details?", ["A magnifying glass", "A lunch box", "A whistle"], 0, "A magnifying glass can make small seed details easier to see.", "Choose the observing tool."],
      ["A learner says, 'The shell has stripes.' What would make this observation clearer?", ["Say how many stripes they can see.", "Say the shell is the best.", "Say the sea is far away."], 0, "Adding a count gives clearer observable detail.", "Look for more precise evidence."],
      ["A class wants to learn about clouds today. Which action helps?", ["Look at the sky and describe the clouds.", "Copy yesterday’s picture only.", "Ask the clouds to move."], 0, "Looking at today’s sky gives current observations.", "Observe what is there now."],
      ["A child notices bite marks on a leaf. Which is the best next step?", ["Ask what might have eaten the leaf.", "Rub out the marks.", "Decide the leaf is a toy."], 0, "A question based on the marks can guide more learning.", "Turn the observation into a question."],
      ["A class records animal tracks in wet sand. What can the record help them do?", ["Compare the track shapes later.", "Know every animal’s name for sure.", "Make new tracks appear."], 0, "A record helps people compare observed evidence later.", "Records keep observations."],
      ["Which pair shows science learning?", ["Observe a flower, then ask what insects visit it.", "Close your eyes, then guess everything.", "Choose a flower because it is favourite."], 0, "Observation followed by a related question helps people learn about nature.", "Find observation plus useful question."],
      ["A child watches a worm move on damp soil. Which observation is useful?", ["The worm stretches and shortens its body.", "The soil is in a tray.", "The worm is the best one."], 0, "The useful observation describes visible movement.", "Choose what can be seen."],
      ["A class looks at leaves from two trees. What should they compare?", ["Shape, size and edge details.", "Which tree has a better name.", "Who picked the leaf first."], 0, "Visible features help the class compare leaves scientifically.", "Use observable features."],
      ["A child says, 'I wonder if this plant grows toward the window.' What could they observe?", ["The plant’s position over several days.", "The colour of a book cover.", "The sound of a pencil."], 0, "Observing the plant over days can help answer the question.", "Watch the plant related to the question."],
      ["Why do scientists ask questions after observing?", ["Questions guide what to look for next.", "Questions stop people observing.", "Questions make evidence unnecessary."], 0, "Questions help direct the next observation or investigation.", "Think about how a question helps learning."]
    ],
    test: [
      ["A child notices dark spots on a banana leaf. Which question is linked to the observation?", ["What caused the dark spots?", "Where is my jumper?", "Can the leaf sing?"], 0, "The question asks about the noticed leaf spots.", "Use the observation."],
      ["A class wants to learn whether rain changes a sandpit. What should they compare?", ["The sandpit before and after rain.", "Two storybooks.", "The colour of their shoes."], 0, "Before-and-after observations can show a change.", "Compare evidence from the sandpit."],
      ["Which is a clear observation?", ["The seed is brown and oval.", "The seed is clever.", "The seed will win."], 0, "Brown and oval are observable features.", "Choose what can be seen."],
      ["A child cannot see a tiny insect clearly. What helps them observe safely?", ["Use a magnifying glass without touching it.", "Shake the insect hard.", "Guess its features."], 0, "A magnifying glass can help observe small details safely.", "Choose the careful observing action."],
      ["A class hears birds but cannot see them. What sense are they using?", ["Hearing", "Taste", "Balance"], 0, "They use hearing to notice bird sounds.", "Think about the information they noticed."],
      ["Why might a class draw the same plant each week?", ["To record changes they observe.", "To make the plant change colour.", "To avoid looking at the plant."], 0, "Weekly drawings can record observed changes.", "Records help compare over time."],
      ["A child asks, 'Which rocks are smooth?' What should they do?", ["Observe and sort the rocks by surface.", "Pick the largest rock only.", "Ask which rock is happiest."], 0, "Observing surfaces can answer the smooth-rock question.", "Match the method to the question."],
      ["A child says, 'The cloud looks long and thin.' What is this?", ["An observation", "A safety rule", "A lunch order"], 0, "The child describes a visible cloud feature.", "Observation tells what is noticed."],
      ["A class sees more butterflies near flowers than near the path. What could they ask?", ["Do butterflies visit flowers more often?", "Are paths made of chocolate?", "Which butterfly is the teacher?"], 0, "The question explores the observed pattern.", "Use the butterfly observation."],
      ["Which action helps people learn about the natural world?", ["Watch, describe and ask a question.", "Guess, hide and forget.", "Choose only favourite answers."], 0, "Observation, description and questions are ways to learn scientifically.", "Look for evidence-based learning."],
      ["A child observes a snail trail after rain. What could they record?", ["Where the trail goes.", "What the snail dreamed.", "How old the playground is."], 0, "The trail path is observable evidence.", "Record what can be seen."],
      ["A class compares two feathers. Which detail is useful?", ["One feather is longer and darker.", "One feather is nicer.", "One feather is lucky."], 0, "Length and colour are observable comparison details.", "Choose evidence, not opinion."],
      ["A child asks a question before looking carefully. What should they do next?", ["Observe to gather evidence.", "Stop learning.", "Change the question into a joke."], 0, "Observation helps gather evidence for the question.", "Science questions need evidence."],
      ["A class observes a pond each morning. What might they learn?", ["How the pond changes over time.", "What the pond wants for lunch.", "Which pencil is sharp."], 0, "Repeated observations can reveal changes.", "Think about observing over time."],
      ["Which question can be explored by observing?", ["Which leaf has more spots?", "Which leaf is the kindest?", "Which leaf likes songs?"], 0, "Leaf spots can be observed and compared.", "Choose a question answerable with evidence."],
      ["A family notices shells after a high tide. What useful question could they ask?", ["Are there more shells after high tide?", "Can shells drive cars?", "Is my backpack blue?"], 0, "The question uses the shell observation to learn more.", "Keep the question about the observed shells."]
    ]
  },
  AC9SFI04: {
    practice: [
      ["Prediction: the ice will get smaller. Observation: the ice got smaller. What should the class say?", ["The prediction matched the observation.", "The prediction was about colour.", "The observation is hidden."], 0, "The observed result was the same as the prediction.", "Compare the prediction with what happened."],
      ["Prediction: the seed will sprout. Observation: no sprout appeared. What happened?", ["The observation did not match the prediction.", "The seed became a rock.", "The prediction matched exactly."], 0, "No sprout is different from the prediction that it would sprout.", "Look for same or different."],
      ["Prediction: the ball will roll farther on smooth card. Observation: it rolled farther on smooth card. Which is true?", ["The result matched the prediction.", "The ball did not move.", "The card changed into cloth."], 0, "The observation supports the prediction.", "Check whether the result says the same thing."],
      ["Prediction: more birds will visit in the morning. Observation: fewer birds visited in the morning. What should be recorded?", ["The prediction did not match.", "The birds were guessed correctly.", "The observation should be erased."], 0, "Fewer birds is different from more birds.", "Do not change the real observation."],
      ["A class predicted a wet sponge would feel heavier. It did feel heavier. What matched?", ["Prediction and observation", "Name and colour", "Desk and chair"], 0, "The observation agreed with the prediction.", "Find the two science ideas being compared."],
      ["A child predicted a shadow would be longer after lunch. It was shorter. What should they say?", ["My prediction was different from the observation.", "My prediction must be changed secretly.", "The shadow was not observed."], 0, "The honest comparison says the prediction and observation differed.", "Compare, then report honestly."],
      ["Prediction: the feather will fall slowly. Observation: the feather fell slowly. Did it match?", ["Yes, it matched.", "No, it floated upward.", "Cannot compare anything."], 0, "Both prediction and observation say the feather fell slowly.", "Look for same words and idea."],
      ["Prediction: the paper towel will soak up all 5 drops. Observation: 2 drops stayed on top. What is the best comparison?", ["It did not match fully.", "It matched because water was used.", "The towel was not tested."], 0, "Some water stayed on top, so the prediction did not fully match.", "Use the amount in the observation."],
      ["A child guessed the cup would make a loud sound. The sound was soft. What does this show?", ["The result was different from the prediction.", "The sound was loud.", "The cup was invisible."], 0, "Soft is different from loud.", "Compare the sound words."],
      ["Prediction: the toy car will stop at the line. Observation: it stopped before the line. What should the class choose?", ["Different from the prediction", "Exactly the same as the prediction", "No observation was made"], 0, "Stopping before the line is not the same as stopping at the line.", "Look at the position."],
      ["A seed was predicted to grow one leaf. It grew one leaf. Which statement is correct?", ["The prediction matched.", "The plant grew no leaves.", "The class cannot compare."], 0, "The number of leaves was the same in the prediction and observation.", "Compare the leaf count."],
      ["Prediction: the wet path will dry by afternoon. Observation: the path was still wet. What should be said?", ["The prediction did not match.", "The path dried.", "The path was never observed."], 0, "Still wet is different from dry.", "Use the real observation."],
      ["A class predicted a rock would sink. They observed it sank. What can they say?", ["The prediction matched the observation.", "The rock floated.", "The prediction was about a leaf."], 0, "The predicted and observed result were both sinking.", "Same result means match."],
      ["Prediction: there will be three snails under the pot. Observation: there was one snail. What comparison is correct?", ["The observation was different.", "The numbers matched.", "There were no numbers to compare."], 0, "One snail is different from three snails.", "Compare the numbers."],
      ["A child predicted a dry leaf would crunch. It did crunch. What is the evidence?", ["The leaf made a crunching sound.", "The leaf was a pencil.", "The child liked leaves."], 0, "The sound observed is the evidence for the comparison.", "Find what was noticed."],
      ["Prediction: the magnet will pull the paper clip. Observation: it pulled the paper clip. What happened?", ["Prediction and observation matched.", "The magnet changed colour.", "The clip was not near the magnet."], 0, "The observation agreed with the prediction.", "Compare action with action."],
      ["A class predicted a shell would feel smooth. It felt bumpy. What should they do?", ["Record that the observation was different.", "Change bumpy to smooth.", "Throw away the result."], 0, "Results should be recorded honestly, even when they differ.", "Science keeps real observations."],
      ["Prediction: the plant will be taller on Friday. Observation: it was taller on Friday. What matched?", ["The predicted change", "The pot colour", "The day name only"], 0, "The predicted taller plant was observed.", "Match the change, not an extra detail."],
      ["A child predicted clay would stretch. It broke into pieces. What is the best answer?", ["The observation did not match the prediction.", "The clay stretched as predicted.", "No action happened."], 0, "Breaking is different from stretching.", "Compare the action words."],
      ["Prediction: the torch will make a bright spot on the wall. Observation: a bright spot appeared. Did it match?", ["Yes", "No", "No observation was possible"], 0, "The bright spot was predicted and observed.", "Check if the same effect happened."],
      ["A learner says, 'My prediction was wrong, so I should hide it.' What is better?", ["Compare it with the observation and keep both.", "Hide the prediction.", "Copy someone else’s answer."], 0, "Predictions can be different from observations; both are useful.", "Honest comparison is the goal."],
      ["Prediction: the leaf will float. Observation: the leaf floated for 10 seconds. What can the class say?", ["The observation supported the prediction.", "The leaf sank at once.", "The result cannot be observed."], 0, "Floating matches the prediction.", "Use the observed result."],
      ["A child predicted the ramp car would go farthest on carpet. It went farthest on cardboard. What should be compared?", ["Prediction and observed surface", "Lunch and recess", "The names of the cars only"], 0, "The surface predicted and the surface observed should be compared.", "Compare the science result."],
      ["Why compare predictions with observations?", ["To see whether what happened was the same or different.", "To make every prediction correct.", "To avoid observing."], 0, "Comparison helps learners notice whether the result matched or differed.", "Think about the purpose of comparing."]
    ],
    test: [
      ["Prediction: the cup will make a loud sound. Observation: the sound was loud. What is true?", ["It matched.", "It was different.", "It was not observed."], 0, "The predicted loud sound was observed.", "Compare the sound."],
      ["Prediction: the plant will grow taller. Observation: it stayed the same height. What happened?", ["It did not match.", "It matched exactly.", "It grew taller."], 0, "Staying the same is different from growing taller.", "Use the observation."],
      ["A child predicted a ball would roll left. It rolled right. Which record is honest?", ["Prediction: left; observation: right.", "Prediction: right; observation: right.", "No ball moved."], 0, "The record keeps the real prediction and real observation.", "Do not change the prediction."],
      ["Prediction: the ice will melt in the sun. Observation: it melted. What can be said?", ["The observation matched the prediction.", "The ice grew bigger.", "The prediction was about sound."], 0, "Melting was predicted and observed.", "Same outcome means match."],
      ["Prediction: two birds will visit. Observation: five birds visited. What is the comparison?", ["Different number", "Same number", "No result"], 0, "Five is different from two.", "Compare the counts."],
      ["A child predicted a towel would stay dry. It became wet. What should they say?", ["The observation was different from the prediction.", "The towel stayed dry.", "The prediction disappeared."], 0, "Wet is different from dry.", "Compare the words."],
      ["Prediction: the paper bridge will hold 3 blocks. Observation: it held 3 blocks. Which answer fits?", ["Matched", "Different", "Unsafe to compare"], 0, "The number of blocks was the same.", "Look at the number."],
      ["Prediction: the feather will fall slowly. Observation: it fell quickly. What should be recorded?", ["The prediction did not match.", "The feather fell slowly.", "The result should be guessed again."], 0, "Quickly is different from slowly.", "Use the actual observation."],
      ["A class predicted the longest shadow would be in the morning. Their chart shows the morning shadow is longest. What happened?", ["The chart supports the prediction.", "The chart disagrees with the prediction.", "The chart shows no shadows."], 0, "The charted observation matches the prediction.", "Use the chart result."],
      ["Prediction: smooth stone. Observation: rough stone. What is different?", ["The surface feel", "The stone name only", "The day of the week"], 0, "Smooth and rough are different surface observations.", "Compare the property."],
      ["A child says the result did not match. What must they have compared?", ["Prediction and observation", "Pencil and lunch", "Two favourite colours"], 0, "A match decision comes from comparing prediction with observation.", "Find the science pair."],
      ["Prediction: the sponge will soak up more water than paper. Observation: paper soaked up more. What should the class conclude?", ["The prediction was not supported.", "The prediction was supported.", "The observation should be ignored."], 0, "The result was the opposite of the prediction.", "Compare which material soaked up more."],
      ["Prediction: the toy boat will float. Observation: the toy boat floated. What evidence supports the prediction?", ["The boat floated.", "The boat was red.", "The child smiled."], 0, "The observed floating supports the prediction.", "Choose the result."],
      ["Prediction: the clay will bend. Observation: the clay bent. Did it match?", ["Yes", "No", "Cannot tell"], 0, "The action observed was the action predicted.", "Same action means yes."],
      ["Prediction: the bean will sprout by Friday. Observation: it sprouted on Monday. What is partly different?", ["The day it sprouted", "The fact that it sprouted", "The seed name only"], 0, "It did sprout, but not on the predicted day.", "Look for the detail that changed."],
      ["Why is a different result still useful?", ["It helps improve the next prediction.", "It must be hidden.", "It proves observing is not needed."], 0, "A different result gives evidence for thinking again.", "Science learns from matches and differences."]
    ]
  },
  AC9SFI05: {
    practice: [
      ["A group observed a seed has two leaves. Which sentence shares the observation clearly?", ["The seed has two leaves.", "The seed is nice.", "We did a thing."], 0, "The clear sentence names the observation.", "Choose the sentence with evidence."],
      ["Which drawing would best share a question about a leaf?", ["A leaf drawing with a circled hole and the question 'What made this?'", "A blank page.", "A picture of a lunch box."], 0, "The labelled drawing connects the question to the observation.", "Look for question plus evidence."],
      ["A child predicted a ball would roll far. Which sentence shares the prediction?", ["I think the ball will roll far.", "The ball is blue.", "My friend has a ball."], 0, "A prediction says what the child thinks will happen.", "Find the future science idea."],
      ["A class saw three birds at the feeder. What should they share?", ["We observed three birds at the feeder.", "Birds are always hungry.", "The feeder is famous."], 0, "The clear statement shares the actual observation.", "Use the number and place."],
      ["Which poster would help others understand a shadow observation?", ["A labelled drawing showing the torch, block and shadow.", "A poster with only stars.", "A page saying 'fun' three times."], 0, "Labels show what was observed and where each part is.", "Choose the useful science text."],
      ["A group wants to share what they wondered about shells. Which is a question?", ["Why are some shells smooth?", "The shell is smooth.", "We found shells."], 0, "The question asks what they want to learn.", "Questions often begin with why, what, how or which."],
      ["Which sentence uses everyday and science words well?", ["The feather is soft and fell slowly.", "The feather was a nice colour.", "The feather was on the table."], 0, "Soft and slowly describe observable properties and movement.", "Choose precise observation words."],
      ["A child shares, 'It changed.' What would make the sharing clearer?", ["Say what changed, such as 'The puddle got smaller.'", "Say nothing else.", "Hide the observation."], 0, "Naming the observed change helps others understand.", "Add specific evidence."],
      ["A class made a weather chart. Why share it?", ["So others can see the recorded observations.", "So the weather obeys the chart.", "So no one asks questions."], 0, "A chart communicates observations clearly.", "Think about why records are shared."],
      ["Which title best fits a report about plant growth?", ["How Our Bean Plant Changed", "Best Day Ever", "My Favourite Crayon"], 0, "The title names the science idea being shared.", "Choose the title about the observation."],
      ["A group wants to tell families what they found. Which is clearest?", ["Our sponge soaked up 8 drops.", "The sponge was good.", "Water was around."], 0, "The clear finding includes the object and observed amount.", "Use exact evidence."],
      ["Which label belongs on a drawing of a snail trail?", ["trail", "music", "lunch"], 0, "The label names the observed mark.", "Pick the science label."],
      ["A child asks, 'Will the seed grow in the dark?' How can they share it?", ["Write it as a question for the class.", "Change it into an answer.", "Throw away the seed."], 0, "Writing the question lets others know what will be explored.", "Keep it as a question."],
      ["Which observation is ready to share?", ["The rock is rough and grey.", "The rock is my favourite.", "The rock wants rain."], 0, "Rough and grey are observable details.", "Choose evidence, not opinion."],
      ["A group predicted a cup would make a soft sound. What should their record include?", ["The prediction and the sound they heard.", "Only the cup colour.", "A joke about cups."], 0, "Sharing both prediction and observation helps others follow the investigation.", "Include the science parts."],
      ["Which sentence explains an idea from evidence?", ["The shadow was behind the block because the block stopped the light.", "The shadow was drawn with a pencil.", "The shadow was near the wall."], 0, "The sentence links the observation to a simple science idea.", "Choose evidence plus idea."],
      ["A learner shows a leaf photo but no words. What can improve the sharing?", ["Add labels such as stem, leaf edge and spots.", "Cover the photo.", "Add unrelated stickers only."], 0, "Labels help others understand the observed features.", "Labels make visuals clearer."],
      ["A class counted four worms after rain. Which bar-chart label is useful?", ["Worms seen after rain: 4", "Fun stuff", "Things I like"], 0, "The label states what was counted and the result.", "Use the observation and number."],
      ["Which sentence shares a finding, not just a feeling?", ["The cloth dried faster in the sun.", "The cloth was the best.", "I liked the cloth."], 0, "The sentence reports an observed finding.", "Find evidence, not feeling."],
      ["A group observed that clay bent but the stick snapped. What should they share?", ["Clay bent; stick snapped.", "Clay and stick are words.", "The table was brown."], 0, "The sentence communicates the two observations clearly.", "Compare the observed actions."],
      ["Which audience needs clear labels on a science drawing?", ["Someone who was not there.", "Only the pencil.", "No one ever."], 0, "Labels help another person understand the observation.", "Think about sharing with others."],
      ["A child says, 'My idea is that rain helps the plant.' What should they add?", ["An observation, such as the plant grew after rain.", "A favourite colour.", "A hidden answer."], 0, "An idea is stronger when linked to an observation.", "Connect idea to evidence."],
      ["Which share card is best?", ["Question: Which leaf is longest? Observation: red leaf is 8 cubes long.", "Question: lunch? Observation: pencil.", "Question: none. Observation: none."], 0, "The card clearly shares a question and an observation.", "Look for both science parts."],
      ["Why share science observations?", ["So others can understand and ask more questions.", "So no one can check them.", "So the observation changes."], 0, "Sharing helps people understand, discuss and learn more.", "Think about communication."]
    ],
    test: [
      ["Which sentence clearly shares an observation?", ["The shell has five stripes.", "The shell is my favourite.", "The shell is near the mat."], 0, "Five stripes is an observable detail.", "Choose evidence."],
      ["A group wants to share a prediction. Which sentence works?", ["I think the wet paper will dry by lunch.", "The wet paper is on the tray.", "The tray is square."], 0, "The sentence says what may happen later.", "Find the prediction."],
      ["Which visual best communicates results?", ["A chart with labels and counts.", "A blank sheet.", "A picture with no connection."], 0, "Labels and counts help others read the results.", "Choose the useful record."],
      ["A class observed two butterflies on flowers. Which label is clearest?", ["Butterflies on flowers: 2", "Pretty things", "Outside stuff"], 0, "The clear label names the observation and count.", "Use the evidence."],
      ["Which question is ready to share with the class?", ["Will the ice melt faster in the sun?", "Ice is cold.", "The sun is bright."], 0, "The question tells what could be explored.", "Choose the question form."],
      ["A child says, 'The plant changed.' What detail should be added?", ["It grew two new leaves.", "It is my plant.", "It is near a window."], 0, "The number of new leaves gives clear evidence of change.", "Make it specific."],
      ["Which sentence uses science vocabulary for a sound observation?", ["The sound was loud.", "The sound was wow.", "The sound was my favourite."], 0, "Loud describes the observed sound.", "Use a property word."],
      ["A drawing shows a torch and a shadow. What helps others understand it?", ["Labels for torch, object and shadow.", "No labels.", "A made-up name only."], 0, "Labels identify the parts of the observation.", "Choose labels that explain the visual."],
      ["Which finding is clearest?", ["The sponge held 6 drops of water.", "The sponge did well.", "Water was fun."], 0, "The clear finding gives a measured observation.", "Look for object plus evidence."],
      ["A group observed the feather fell slowly. Which idea matches?", ["Light objects may fall slowly.", "Feathers are lunch.", "Slow means invisible."], 0, "The idea is connected to the observation.", "Use evidence to choose an idea."],
      ["What should a science share include?", ["Question, observation and idea when possible.", "Only favourite colours.", "Only the child’s name."], 0, "Science sharing is clearer when it includes the key science parts.", "Think of what helps others understand."],
      ["A class wants families to repeat an observation. What should they share?", ["What they looked at and what they noticed.", "Only a funny title.", "Nothing about the object."], 0, "Others need the object and observation to understand or repeat it.", "Give enough detail."],
      ["Which sentence is too vague?", ["It was good.", "The leaf is 6 cubes long.", "The rock feels rough."], 0, "It was good does not tell the observation.", "Vague means not enough evidence."],
      ["A child drew a seed with a tiny root. Which label is useful?", ["root", "moon", "chair"], 0, "Root names the observed plant part.", "Pick the label that belongs."],
      ["Which report sentence is honest?", ["We predicted three snails, but observed one snail.", "We predicted three snails, so we wrote three.", "We hid the observation."], 0, "The sentence clearly shares both prediction and observation.", "Keep both science parts."],
      ["Why use everyday words with science words?", ["They help others understand the science idea.", "They hide the observation.", "They make questions impossible."], 0, "Clear language helps people understand what was observed and found.", "Communication should help the audience."]
    ]
  }
};

function rotateAnswers(item, offset) {
  const correctText = item.answers[item.correct];
  const wrong = item.answers.filter((_, i) => i !== item.correct);
  const correct = offset % 3;
  const answers = wrong.slice();
  answers.splice(correct, 0, correctText);
  return { ...item, answers, correct };
}

function writeQuestions(code, bank, items) {
  const varName = bank === "practice" ? "skillrPracticeQuestions" : "skillrTestQuestions";
  const rotated = items.map((parts, index) => rotateAnswers(q(code, index + 1, bank, ...parts), index + (bank === "test" ? 1 : 0)));
  const file = path.join(ROOT, "quiz", "grade-k", "science", code.toLowerCase(), bank, "questions.js");
  fs.writeFileSync(file, `"use strict";\nwindow.${varName} = ${JSON.stringify(rotated, null, 2)};\n`);
}

for (const code of BATCH) {
  writeQuestions(code, "practice", bankData[code].practice);
  writeQuestions(code, "test", bankData[code].test);
}

const svgFiles = {
  "ac9sfh01-observation-question.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" role="img" aria-labelledby="t d"><title id="t">Observation leads to a question</title><desc id="d">A leaf with spots is observed, then a question card asks what made the spots.</desc><rect width="640" height="360" rx="24" fill="#f0fdf4"/><text x="320" y="42" text-anchor="middle" font-family="Arial" font-size="24" font-weight="700" fill="#17324d">Notice → Observe → Ask</text><path d="M120 210c35-95 150-95 190 0-60 40-130 40-190 0z" fill="#86efac" stroke="#166534" stroke-width="6"/><path d="M160 205c40-20 80-20 120 0" fill="none" stroke="#166534" stroke-width="4"/><circle cx="185" cy="170" r="10" fill="#92400e"/><circle cx="235" cy="154" r="8" fill="#92400e"/><circle cx="260" cy="188" r="9" fill="#92400e"/><rect x="370" y="115" width="190" height="145" rx="18" fill="#fff" stroke="#2563eb" stroke-width="5"/><text x="465" y="165" text-anchor="middle" font-family="Arial" font-size="22" font-weight="700" fill="#2563eb">Question</text><text x="465" y="205" text-anchor="middle" font-family="Arial" font-size="19" fill="#17324d">What made</text><text x="465" y="231" text-anchor="middle" font-family="Arial" font-size="19" fill="#17324d">the spots?</text><path d="M315 185h45" stroke="#17324d" stroke-width="6"/><path d="M358 185l-18-14v28z" fill="#17324d"/></svg>`,
  "ac9sfh01-nature-record.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" role="img" aria-labelledby="t d"><title id="t">Nature observation record</title><desc id="d">A simple three-day plant record shows two leaves, two leaves, then three leaves.</desc><rect width="640" height="360" rx="24" fill="#eff6ff"/><text x="320" y="42" text-anchor="middle" font-family="Arial" font-size="24" font-weight="700" fill="#17324d">Look again to learn</text><rect x="80" y="85" width="480" height="215" rx="18" fill="#fff" stroke="#2563eb" stroke-width="5"/><path d="M80 145h480M240 85v215M400 85v215" stroke="#bfdbfe" stroke-width="4"/><text x="160" y="123" text-anchor="middle" font-family="Arial" font-size="18" fill="#17324d">Mon</text><text x="320" y="123" text-anchor="middle" font-family="Arial" font-size="18" fill="#17324d">Wed</text><text x="480" y="123" text-anchor="middle" font-family="Arial" font-size="18" fill="#17324d">Fri</text><g fill="#22c55e" stroke="#166534" stroke-width="3"><path d="M150 245v-45"/><ellipse cx="138" cy="205" rx="18" ry="10"/><ellipse cx="162" cy="205" rx="18" ry="10"/><path d="M310 245v-45"/><ellipse cx="298" cy="205" rx="18" ry="10"/><ellipse cx="322" cy="205" rx="18" ry="10"/><path d="M470 245v-55"/><ellipse cx="458" cy="200" rx="18" ry="10"/><ellipse cx="482" cy="200" rx="18" ry="10"/><ellipse cx="470" cy="178" rx="16" ry="9"/></g><text x="320" y="332" text-anchor="middle" font-family="Arial" font-size="20" fill="#17324d">The record shows a change.</text></svg>`,
  "ac9sfi04-prediction-result.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" role="img" aria-labelledby="t d"><title id="t">Prediction and observation match</title><desc id="d">A card predicts ice will get smaller and an observation card shows the ice got smaller.</desc><rect width="640" height="360" rx="24" fill="#f8fbff"/><text x="320" y="42" text-anchor="middle" font-family="Arial" font-size="24" font-weight="700" fill="#17324d">Compare prediction and observation</text><rect x="70" y="90" width="220" height="190" rx="18" fill="#fff" stroke="#2563eb" stroke-width="5"/><rect x="350" y="90" width="220" height="190" rx="18" fill="#fff" stroke="#16a34a" stroke-width="5"/><text x="180" y="125" text-anchor="middle" font-family="Arial" font-size="20" font-weight="700" fill="#2563eb">Prediction</text><text x="460" y="125" text-anchor="middle" font-family="Arial" font-size="20" font-weight="700" fill="#16a34a">Observation</text><circle cx="180" cy="195" r="42" fill="#dbeafe" stroke="#2563eb" stroke-width="4"/><circle cx="460" cy="205" r="26" fill="#dbeafe" stroke="#16a34a" stroke-width="4"/><text x="180" y="260" text-anchor="middle" font-family="Arial" font-size="18" fill="#17324d">ice will get smaller</text><text x="460" y="260" text-anchor="middle" font-family="Arial" font-size="18" fill="#17324d">ice got smaller</text><path d="M300 185h40" stroke="#17324d" stroke-width="6"/><path d="M340 185l-18-14v28z" fill="#17324d"/><text x="320" y="325" text-anchor="middle" font-family="Arial" font-size="21" font-weight="700" fill="#166534">Match</text></svg>`,
  "ac9sfi04-chart-compare.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" role="img" aria-labelledby="t d"><title id="t">Prediction differs from observation</title><desc id="d">A simple chart compares a prediction of three snails with an observation of one snail.</desc><rect width="640" height="360" rx="24" fill="#fff7ed"/><text x="320" y="42" text-anchor="middle" font-family="Arial" font-size="24" font-weight="700" fill="#17324d">Same or different?</text><rect x="110" y="82" width="420" height="220" rx="18" fill="#fff" stroke="#f97316" stroke-width="5"/><path d="M110 155h420M320 82v220" stroke="#fed7aa" stroke-width="5"/><text x="215" y="128" text-anchor="middle" font-family="Arial" font-size="20" font-weight="700" fill="#9a3412">Prediction</text><text x="425" y="128" text-anchor="middle" font-family="Arial" font-size="20" font-weight="700" fill="#9a3412">Observation</text><g fill="#fde68a" stroke="#92400e" stroke-width="4"><ellipse cx="165" cy="215" rx="23" ry="14"/><circle cx="190" cy="205" r="11"/><path d="M187 194v-16M196 194v-16"/><ellipse cx="215" cy="215" rx="23" ry="14"/><circle cx="240" cy="205" r="11"/><path d="M237 194v-16M246 194v-16"/><ellipse cx="265" cy="215" rx="23" ry="14"/><circle cx="290" cy="205" r="11"/><path d="M287 194v-16M296 194v-16"/><ellipse cx="415" cy="215" rx="25" ry="15"/><circle cx="442" cy="205" r="12"/><path d="M439 193v-17M448 193v-17"/></g><text x="320" y="332" text-anchor="middle" font-family="Arial" font-size="21" font-weight="700" fill="#9a3412">3 is different from 1</text></svg>`,
  "ac9sfi05-share-card.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" role="img" aria-labelledby="t d"><title id="t">Science share card</title><desc id="d">A simple share card includes a question, prediction and observation.</desc><rect width="640" height="360" rx="24" fill="#eef2ff"/><text x="320" y="42" text-anchor="middle" font-family="Arial" font-size="24" font-weight="700" fill="#17324d">Share the science clearly</text><rect x="95" y="82" width="450" height="225" rx="18" fill="#fff" stroke="#4f46e5" stroke-width="5"/><text x="135" y="130" font-family="Arial" font-size="20" font-weight="700" fill="#4f46e5">Question:</text><text x="250" y="130" font-family="Arial" font-size="20" fill="#17324d">Which leaf is longest?</text><text x="135" y="190" font-family="Arial" font-size="20" font-weight="700" fill="#4f46e5">Prediction:</text><text x="260" y="190" font-family="Arial" font-size="20" fill="#17324d">The red leaf.</text><text x="135" y="250" font-family="Arial" font-size="20" font-weight="700" fill="#4f46e5">Observation:</text><text x="270" y="250" font-family="Arial" font-size="20" fill="#17324d">Red leaf = 8 cubes.</text></svg>`,
  "ac9sfi05-labelled-shadow.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" role="img" aria-labelledby="t d"><title id="t">Labelled shadow drawing</title><desc id="d">A labelled drawing shows a torch, block and shadow.</desc><rect width="640" height="360" rx="24" fill="#fefce8"/><text x="320" y="42" text-anchor="middle" font-family="Arial" font-size="24" font-weight="700" fill="#17324d">Labels help others understand</text><circle cx="125" cy="170" r="42" fill="#facc15" stroke="#ca8a04" stroke-width="5"/><text x="125" y="245" text-anchor="middle" font-family="Arial" font-size="18" fill="#854d0e">torch</text><rect x="295" y="145" width="80" height="95" rx="8" fill="#60a5fa" stroke="#2563eb" stroke-width="5"/><text x="335" y="270" text-anchor="middle" font-family="Arial" font-size="18" fill="#17324d">block</text><ellipse cx="485" cy="252" rx="95" ry="24" fill="#94a3b8" opacity=".75"/><text x="485" y="300" text-anchor="middle" font-family="Arial" font-size="18" fill="#17324d">shadow</text><path d="M170 170h115M375 185l95 45" stroke="#facc15" stroke-width="9" stroke-linecap="round"/></svg>`
};

const visualDir = path.join(ROOT, "assets", "quiz-visuals", "foundation-science");
for (const [name, svg] of Object.entries(svgFiles)) fs.writeFileSync(path.join(visualDir, name), `${svg}\n`);

const updates = {
  AC9SFH01: {
    "ac9sfh01-p-001": ["ac9sfh01-observation-question.svg", "A leaf with spots leads to a science question."],
    "ac9sfh01-p-004": ["ac9sfh01-nature-record.svg", "A three-day plant record shows the plant changing."],
    "ac9sfh01-t-001": ["ac9sfh01-observation-question.svg", "A leaf observation card shows spots and a related question."],
    "ac9sfh01-t-006": ["ac9sfh01-nature-record.svg", "A repeated plant record shows observations over time."]
  },
  AC9SFI04: {
    "ac9sfi04-p-001": ["ac9sfi04-prediction-result.svg", "Prediction and observation cards both show ice getting smaller."],
    "ac9sfi04-p-014": ["ac9sfi04-chart-compare.svg", "A chart compares a prediction of three snails with an observation of one snail."],
    "ac9sfi04-t-001": ["ac9sfi04-prediction-result.svg", "A prediction card and observation card show the same result."],
    "ac9sfi04-t-005": ["ac9sfi04-chart-compare.svg", "A chart compares different predicted and observed counts."]
  },
  AC9SFI05: {
    "ac9sfi05-p-005": ["ac9sfi05-labelled-shadow.svg", "A labelled drawing shows torch, block and shadow."],
    "ac9sfi05-p-023": ["ac9sfi05-share-card.svg", "A science share card includes a question, prediction and observation."],
    "ac9sfi05-t-003": ["ac9sfi05-share-card.svg", "A labelled science card communicates results clearly."],
    "ac9sfi05-t-008": ["ac9sfi05-labelled-shadow.svg", "A labelled shadow diagram helps others understand the observation."]
  }
};

for (const code of BATCH) {
  const entries = Object.entries(updates[code]).map(([id, [file, alt]]) => `    "${id}": { image: "/assets/quiz-visuals/foundation-science/${file}", imageAlt: ${JSON.stringify(alt)} }`).join(",\n");
  const js = `(() => {\n  "use strict";\n  const updates = {\n${entries}\n  };\n  const banks = [window.skillrPracticeQuestions, window.skillrTestQuestions, window.skillrExamQuestions, window.quizQuestions];\n  const visited = new Set();\n  banks.forEach((bank) => {\n    if (!Array.isArray(bank) || visited.has(bank)) return;\n    visited.add(bank);\n    bank.forEach((question) => {\n      const update = updates[question?.id];\n      if (!update) return;\n      Object.assign(question, update);\n      delete question.visual;\n    });\n  });\n})();\n`;
  fs.writeFileSync(path.join(visualDir, `${code.toLowerCase()}-visual-overrides.js`), js);
}

for (const code of BATCH) {
  for (const bank of ["practice", "test"]) {
    const htmlPath = path.join(ROOT, "quiz", "grade-k", "science", code.toLowerCase(), bank, "index.html");
    let html = fs.readFileSync(htmlPath, "utf8");
    html = html.replace(new RegExp(`(<script src="/quiz/grade-k/science/${code.toLowerCase()}/${bank}/questions\\.js\\?v=[^"]+"></script>)(?:<script src="/assets/quiz-visuals/foundation-science/${code.toLowerCase()}-visual-overrides\\.js\\?v=[^"]+"></script>)?`), `$1<script src="/assets/quiz-visuals/foundation-science/${code.toLowerCase()}-visual-overrides.js?v=${STAMP}"></script>`);
    html = html.replace(new RegExp(`questions\\.js\\?v=[^"]+`), `questions.js?v=${STAMP}`);
    fs.writeFileSync(htmlPath, html);
  }
}

const report = `# Foundation Science: H01, I04 and I05 IXL-standard review\n\nOwner direction: continue Foundation Science, increase useful simple SVG visuals, and keep the IXL comparison strategy. This batch covers AC9SFH01, AC9SFI04 and AC9SFI05.\n\nOfficial descriptor boundary:\n\n| Code | Descriptor |\n| --- | --- |\n| AC9SFH01 | ${descriptors.AC9SFH01} |\n| AC9SFI04 | ${descriptors.AC9SFI04} |\n| AC9SFI05 | ${descriptors.AC9SFI05} |\n\nIXL benchmark used as a style reference, not copied: Foundation science pages emphasise direct observation, simple choices, concrete visual evidence, immediate feedback and short stage goals. Relevant inspected/reference pages included Foundation Science, weather patterns, shadows, five senses and nature/object classification style tasks. ACARA/QCAA remains the authority for the skill boundary.\n\nChanges made:\n\n- Rebuilt each bank with 24 Practice and 16 Test questions.\n- Replaced thin match/mismatch and vague sharing stems with original items that include the prediction, observation, question or evidence inside the stem.\n- Removed silly distractors and balanced answer positions by rotation.\n- Added 6 simple SVG assets and 12 visual-supported questions across the batch.\n- Added per-code visual override loaders and wired Practice/Test pages after questions.js.\n\nQuality target: Foundation-appropriate language, concrete evidence, no exact IXL wording, no name/object swaps as hidden repeats, and feedback that teaches the science action.\n`;
fs.writeFileSync(path.join(ROOT, "docs", "question-bank-reviews", "2026-09-06-foundation-science-h01-i04-i05.md"), report);

console.log(JSON.stringify({ updated: BATCH, practice: 24, test: 16, visuals: Object.keys(svgFiles).length, stamp: STAMP }, null, 2));
