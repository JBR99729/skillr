(() => {
  "use strict";
  const spec = window.SkillrAC9EFLA01Lesson;
  if (!spec) return;

  const setScene = (id, speech, purpose, description) => {
    const scene = spec.scenes?.[id];
    if (!scene) return;
    scene.speech = speech;
    scene.purpose = purpose;
    scene.accessibleDescription = description;
  };

  setScene("friendHelp", "Can you help me, please?", "make a request to a friend", "A child asks a friend for help using clear, friendly words.");
  setScene("teacherHelp", "Excuse me, can you help me, please?", "make a request to a teacher", "A child politely asks a teacher for help in the classroom.");
  setScene("shopkeeperApples", "Excuse me, where are the apples, please?", "ask a relevant question", "A child asks a shopkeeper a clear and polite question.");
  setScene("friendPencil", "Can I use your pencil when you're finished?", "make a request to a friend", "A child asks a friend to use a pencil after their turn.");
  setScene("teacherPencil", "Excuse me, can I please have a pencil?", "make a request to a teacher", "A child politely asks a teacher for a pencil.");
  setScene("friendOpinion", "I like the blue picture best.", "express an opinion", "A child tells a friend which picture they like best.");
  setScene("teacherOpinion", "I think the blue picture is best because it is easy to see.", "express an opinion to a class", "A child tells the teacher and class an opinion and gives a reason.");

  spec.childFriendlyGoal = "I can choose words that suit who I am talking to.";
  spec.learningRoutine = ["What is happening?", "Who am I talking to?", "What do I want to say?", "Choose words that fit."];
  spec.elaborationFocus = {
    E1: "Ask relevant questions and express requests and opinions in ways that suit the situation.",
    E2: "Change language to suit relationships such as parent and child, teacher and student, siblings, friends, shopkeepers and customers."
  };

  (spec.masteryItems || []).forEach((item) => {
    if (item.id === "checkpoint-meaning") {
      item.prompt = "Who is listening? What words changed?";
      item.expectedAnswer = "The listener changed, so some words changed. The speaker still wanted help.";
      item.evidenceOfMastery = "The child connects the language choice to the person and situation.";
    }
    if (item.id === "checkpoint-teacher") {
      item.prompt = "Which words make this a good request to a teacher?";
      item.expectedAnswer = "Excuse me, can you help me, please?";
    }
    if (item.id === "checkpoint-pencil") {
      item.prompt = "Ask a friend for a pencil. Now ask a teacher.";
      item.expectedAnswer = "Friend: Can I use your pencil when you're finished? Teacher: Excuse me, can I please have a pencil?";
    }
    if (item.id === "checkpoint-opinion") {
      item.prompt = "Which words tell Ari's opinion?";
      item.expectedAnswer = "I like or I think tells what Ari thinks. A reason can be added with because.";
    }
    if (item.id === "mastery-final") {
      item.prompt = "Choose suitable words for a teacher, a friend and a shopkeeper. Then give one opinion.";
      item.expectedAnswer = "Answers should be clear, relevant and suited to the listener; the opinion should tell what the child thinks.";
      item.evidenceOfMastery = "The child independently asks a relevant question, makes a request or gives an opinion using language suited to the relationship.";
    }
  });
})();
