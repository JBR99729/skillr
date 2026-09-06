"use strict";

window.SkillrFoundationScienceWorksheetData = Object.assign(
  window.SkillrFoundationScienceWorksheetData || {},
  {
    AC9SFU01: {
      subject: "Foundation Science",
      title: "Living Things and External Features",
      questions: [
        {
          type: "single",
          question: "Which is an external feature you can see on a bird?",
          answers: ["Feathers", "Heartbeat", "Thoughts", "Hunger"]
        },
        {
          type: "single",
          question: "Which is a body covering you can observe on a fish?",
          answers: ["Scales", "Roots", "Fur", "Leaves"]
        },
        {
          type: "match",
          question: "Match each living thing to a visible external feature.",
          matchLeft: ["Plant", "Bird", "Fish"],
          matchRight: ["scales", "leaves", "feathers"]
        },
        {
          type: "fill-blank",
          question: "Complete the sentence about a fair grouping rule.",
          template: "I grouped them by a feature I can {{blank}}."
        },
        {
          type: "text",
          question: "Name two external features you could observe on a plant."
        },
        {
          type: "text",
          question: "Compare a bird and a fish. Write one visible similarity and one visible difference."
        },
        {
          type: "fill-blank",
          question: "Complete the science idea.",
          template: "An external feature is something we can see on the {{blank}} of a living thing."
        },
        {
          type: "text",
          question: "A bird, dog and fish are shown. Choose one visible feature to sort them into groups. State your grouping rule."
        },
        {
          type: "text",
          enrichment: true,
          question: "Sam groups animals by body covering. Mia groups the same animals by how many legs they have. Can both grouping rules be sensible? Explain why."
        },
        {
          type: "text",
          enrichment: true,
          question: "Use these descriptions: bird — feathers and wings; fish — scales and fins; dog — fur and legs; cat — fur and legs. Make two different sensible grouping rules and explain each rule."
        }
      ]
    }
  }
);
