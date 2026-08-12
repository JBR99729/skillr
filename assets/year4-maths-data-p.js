(() => {
  "use strict";
  if (!window.SkillrYear4MathsRegister) throw new Error("Year 4 Maths base data is not loaded.");
  window.SkillrYear4MathsRegister({
    AC9M4P01: {
      slug:"ac9m4p01-possible-everyday-events-and-the-possible-outcomes-of-chance",
      title:"Likelihood, Outcomes and Independent or Dependent Events",
      subtitle:"Order chance events and explain when one event changes another",
      desc:"describe possible everyday events and the possible outcomes of chance experiments and order outcomes or events based on their likelihood of occurring; identify independent or dependent events",
      routine:"Define experiment → List complete outcomes → Compare favourable outcomes → Order likelihood → Check replacement/conditions → Classify dependence",
      learn:"Likelihood depends on the possible outcomes and conditions. Events are independent when one result does not change the chance of the next; they are dependent when the first event changes the available outcomes or conditions.",
      model_title:"Order outcomes on a likelihood scale",
      model_visual:{type:"chance-scale",items:[["impossible",0],["unlikely",20],["even chance",50],["likely",80],["certain",100]]},
      model_note:"Place events by reasoning from outcomes and conditions, not personal preference. Likely is not certain, and unlikely is not impossible.",
      apply_title:"Compare replacement and no-replacement events",
      apply_visual:{type:"chance-tree",start:"Bag: 2 red, 1 blue",first:[["red, replace",["2 red, 1 blue again","next chance unchanged"]],["red, no replacement",["1 red, 1 blue remain","next chance changes"]]]},
      apply_note:"With replacement, the composition returns to its original state and successive draws can be independent. Without replacement, the first draw changes the next probabilities, so events are dependent.",
      quick_visual:{type:"cards",items:["outcome set","favourable outcomes","certain/impossible","likely/unlikely","with replacement","without replacement","independent/dependent"]},
      activities:[
        {title:"Likelihood ordering",text:"Order everyday and experimental events from impossible to certain, then defend any close placements.",visual:{type:"cards",items:["roll 7 on a die","roll even","sun rises tomorrow","pick red from 9 red + 1 blue","rain next week"]}},
        {title:"Replacement investigation",text:"Compare two-draw outcome trees with and without replacement and explain which branch probabilities change.",visual:{type:"chance-tree",start:"first draw",first:[["replace",["same composition","independent possibility"]],["do not replace",["composition changes","dependent"]]]}},
        {title:"Outcome completeness",text:"List every ordered outcome for two coin tosses or spinner turns and check none are missing or duplicated.",visual:{type:"cards",items:["HH","HT","TH","TT"]}}
      ],
      mistakes:[
        ["Likely confused with certain","A likely event can still fail to occur."],
        ["Outcome list incomplete","Use a systematic table or tree to include all ordered outcomes."],
        ["Independent means different","Independence concerns whether one event changes the chance of another."],
        ["Replacement condition ignored","State whether items are returned before the next draw."]
      ],
      quick:["Order impossible, unlikely, likely and certain events.","List outcomes for two coin tosses.","Explain replacement.","Classify two draws without replacement.","Give independent everyday events."],
      mastery:["List complete outcomes","Order likelihood","Use evidence/conditions","Identify independence","Identify dependence"],
      worksheet:[
        {type:"single",question:"Which event is impossible on a standard six-sided die?",answers:["rolling 8","rolling an even number","rolling less than 7","rolling 1"]},
        {type:"fill-blank",question:"Complete the outcome set for two coin tosses.",template:"HH, HT, TH, {{blank}}"},
        {type:"single",question:"Two counters are drawn from a bag without replacement. What is usually true?",answers:["The events are dependent because the composition changes","The events are always independent","The second draw happens first","The outcome set disappears"]},
        {type:"text",question:"Order these events from least to most likely and justify: roll a 7, roll a 6, roll an even number, roll a number less than 7."},
        {type:"match",question:"Match the condition to the event relationship.",matchLeft:["draw then replace","draw without replacement","two separate fair coin tosses"],matchRight:["independent trials","dependent draws","composition restored, so next draw can be independent"]},
        {type:"fill-blank",question:"Complete the dependence statement.",template:"Without replacement, the first draw changes the possible outcomes for the {{blank}} draw."},
        {type:"text",question:"List all ordered outcomes when a coin is tossed and a die is classified as odd or even."},
        {type:"text",question:"A student says two events are independent because their outcomes are different colours. Correct the definition."},
        {type:"text",question:"Create two versions of the same two-draw experiment—one independent and one dependent. Draw outcome trees and explain the change in conditions.",enrichment:true},
        {type:"text",question:"Design five chance events whose likelihoods are close enough to require careful reasoning. Order them and state every assumption used.",enrichment:true}
      ]
    },
    AC9M4P02: {
      slug:"ac9m4p02-conduct-repeated-chance-experiments-to-observe-relationships",
      title:"Repeated Chance Experiments and Variation",
      subtitle:"Compare observed frequencies, sample sizes and emerging relationships",
      desc:"conduct repeated chance experiments to observe relationships between outcomes; identify and describe the variation in results",
      routine:"Define outcomes → Predict → Conduct consistent trials → Record frequencies → Repeat/aggregate → Compare proportions → Describe variation",
      learn:"Repeated experiments show variation: identical chance conditions can produce different short-run results. Larger combined samples often give a more stable picture of outcome relationships, but exact frequencies are not guaranteed.",
      model_title:"Compare repeated sets of 20 trials",
      model_visual:{type:"trial-compare",sets:[["Set 1",12,8],["Set 2",9,11],["Set 3",14,6],["Combined",35,25]]},
      model_note:"Each set varies, even under the same conditions. Combining 60 trials gives more evidence about the long-run relationship than any single set of 20.",
      apply_title:"Compare observed frequencies with device structure",
      apply_visual:{type:"table",rows:[["Spinner sections","Expected relationship","Observed after 100"],["3 red, 1 blue","red about 3 times blue","red 73, blue 27"],["2 green, 2 yellow","roughly equal","green 47, yellow 53"]]},
      apply_note:"Use proportional language such as about, roughly or close to. Observed frequencies need not exactly match the structural ratio, especially in small samples.",
      quick_visual:{type:"bargraph",labels:["red","blue"],values:[73,27]},
      activities:[
        {title:"Class trial sets",text:"Each group conducts the same 20-trial experiment, then the class compares variation and combines results.",visual:{type:"trial-compare",sets:[["A",11,9],["B",8,12],["C",13,7],["D",10,10]]}},
        {title:"Sample-size comparison",text:"Compare outcome proportions after 10, 50 and 200 digital simulations and discuss stability.",visual:{type:"table",rows:[["Trials","Red proportion"],["10","0.60"],["50","0.54"],["200","0.51"]]}},
        {title:"Fairness audit",text:"Check that the device, procedure and recording stay consistent across all trials.",visual:{type:"cards",items:["same spinner","full spin","record immediately","fixed number of trials","no discarded results"]}}
      ],
      mistakes:[
        ["Equal chance means equal every run","Small samples can vary considerably."],
        ["Result changed to match prediction","Record every valid trial, including surprising outcomes."],
        ["Frequencies compared without sample size","Use proportions or equal totals when comparing sets."],
        ["One trial used to judge fairness","Repeated evidence is needed; even then conclusions should be cautious."]
      ],
      quick:["Explain variation across trial sets.","Why combine class results?","Compare 12/20 and 30/50.","What does 3 red:1 blue suggest?","Name one procedural control."],
      mastery:["Conduct consistent trials","Record frequencies","Compare proportions","Discuss sample size","Describe variation cautiously"],
      worksheet:[
        {type:"single",question:"Why can two groups obtain different results from the same fair coin experiment?",answers:["Chance results vary between samples","One group must be dishonest","Fair coins always give identical sequences","The outcomes change names"]},
        {type:"fill-blank",question:"Complete the combined total.",template:"12 red and 8 blue make {{blank}} trials."},
        {type:"single",question:"Which comparison is fairest when trial totals differ?",answers:["compare proportions or percentages","compare raw frequencies only","ignore sample size","choose the larger number"]},
        {type:"text",question:"Compare Set A: 12 red, 8 blue and Set B: 30 red, 20 blue. Explain the relationship despite different totals."},
        {type:"match",question:"Match each concept to its meaning.",matchLeft:["frequency","variation","sample size"],matchRight:["number of trials or observations","difference between repeated results","number of times an outcome occurs"]},
        {type:"fill-blank",question:"Complete the structural expectation.",template:"A spinner with 3 red and 1 blue equal sections should produce red about {{blank}} times as often as blue over many trials."},
        {type:"text",question:"Explain why 7 heads in 10 tosses is not strong evidence that a coin is unfair."},
        {type:"text",question:"A student discards three blue results because they do not match the prediction. Explain how this biases the experiment."},
        {type:"text",question:"Plan a digital and physical version of the same 200-trial experiment. Compare controls, recording methods and possible sources of variation.",enrichment:true},
        {type:"text",question:"Construct three trial sets that have different frequencies but nearly the same proportions. Explain why proportions reveal the relationship more clearly.",enrichment:true}
      ]
    }
  }, ["AC9M4P01","AC9M4P02"]);
})();
