"use strict";

window.SkillrFoundationScienceWorksheetData = Object.assign(
  window.SkillrFoundationScienceWorksheetData || {},
  {
    AC9SFU01: {
      title: "Living Things and External Features",
      questions: [
        {
          type: "single",
          question: "Which list contains only external features that can be seen on a plant?",
          answers: ["roots, stem, leaves", "soil, rain, sunlight", "water, air, warmth", "pot, label, table"]
        },
        {
          type: "fill-blank",
          question: "Complete the sentence about a bird.",
          template: "A bird's {{blank}} are a body covering."
        },
        {
          type: "match",
          question: "Match each living thing to an external feature you can observe.",
          matchLeft: ["bird", "fish", "plant"],
          matchRight: ["leaves", "scales", "feathers"]
        },
        {
          type: "single",
          question: "Which is the clearest observable rule for grouping a bird, fish and dog?",
          answers: ["body covering", "which one I like", "their names", "where I first saw them"]
        },
        {
          type: "text",
          question: "Compare a bird and a fish. Write one visible feature they both have and one visible feature that is different."
        },
        {
          type: "fill-blank",
          question: "Complete the science explanation.",
          template: "I grouped these living things by their {{blank}}."
        },
        {
          type: "match",
          question: "Match the animal to its body covering.",
          matchLeft: ["dog", "bird", "fish"],
          matchRight: ["scales", "fur", "feathers"]
        },
        {
          type: "text",
          question: "Look closely at a familiar plant. Name three external features you could observe without pulling the plant apart."
        },
        {
          type: "text",
          enrichment: true,
          question: "A bird, a fish and a dog can be grouped in more than one sensible way. Describe two different grouping rules that use visible external features."
        },
        {
          type: "text",
          enrichment: true,
          question: "Kai groups animals only by colour. Give a stronger science grouping rule using external features, and explain why your rule gives better evidence."
        }
      ]
    }
  }
);
