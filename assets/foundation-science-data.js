(() => {
  "use strict";

  const IMG = {
    plant: {src:"https://images.unsplash.com/photo-1728399818501-88271908292e?auto=format&fit=crop&q=82&w=1200",source:"https://unsplash.com/photos/1RBNLdftvkU",credit:"Eileen Kummer",alt:"Plant showing green leaves and visible roots"},
    bird: {src:"https://images.unsplash.com/photo-1673434524408-22e6ef86a1ef?auto=format&fit=crop&q=82&w=1200",source:"https://unsplash.com/photos/3o7S38ZEKiE",credit:"David Clode",alt:"Close view of colourful bird feathers"},
    fish: {src:"https://images.unsplash.com/photo-1722542186120-17b4248100ad?auto=format&fit=crop&q=82&w=1200",source:"https://unsplash.com/photos/8Wc7HEjDbXQ",credit:"Ivan Lopatin",alt:"Close view of a fish showing scales and eye"},
    marbles: {src:"https://images.unsplash.com/photo-1518844234258-bbe1cd06bd75?auto=format&fit=crop&q=82&w=1200",source:"https://unsplash.com/photos/assorted-marble-toys-QqN25A3iF9w",credit:"Sharon Pittaway",alt:"Assorted glass marbles showing round shapes"},
    wood: {src:"https://images.unsplash.com/photo-1669232248619-eba5000964d7?auto=format&fit=crop&q=82&w=1200",source:"https://unsplash.com/photos/a-group-of-wooden-blocks-bJkWEZS9KI4",credit:"Tim Mossholder",alt:"Close view of plain wooden blocks"},
    fabric: {src:"https://images.unsplash.com/photo-1615799998603-7c6270a45196?auto=format&fit=crop&q=82&w=1200",source:"https://unsplash.com/photos/plain-white-woven-textile-texture-MS9Tnh3if1o",credit:"Kiwihug",alt:"Close view of woven fabric texture"},
    woodMetal: {src:"https://images.unsplash.com/photo-1673208125356-5a33e4818c35?auto=format&fit=crop&q=82&w=1200",source:"https://unsplash.com/photos/a-close-up-of-a-metal-object-with-a-wooden-surface-oeVz6Qag3Hw",credit:"Andrew Dawes",alt:"Close view showing wood and metal surfaces"},
    magnify: {src:"https://images.unsplash.com/photo-1547057740-4b18aac8eed2?auto=format&fit=crop&q=82&w=1200",source:"https://unsplash.com/photos/magnifying-glass-mq8QogEBy00",credit:"Steven Wright",alt:"Magnifying glass used to inspect the natural world"},
    seedling: {src:"https://images.unsplash.com/photo-1767457108672-79c6dd48a165?auto=format&fit=crop&q=82&w=1200",source:"https://unsplash.com/photos/a-young-green-seedling-growing-from-dark-soil-4KnaYSLHnAI",credit:"Pranav Gavali",alt:"Young green seedling emerging from dark soil"}
  };

  window.SkillrFoundationScienceData = {
    AC9SFU01: {
      slug:"ac9sfu01-observe-external-features-of-plants-and-animals-and-describe",
      title:"Living Things and External Features",
      subtitle:"Observe visible features and group living things using clear rules",
      desc:"observe external features of plants and animals and describe ways they can be grouped based on these features",
      routine:"Observe → Name features → Compare → Group → Explain",
      learn:"Look closely at what can be seen on the outside of plants and animals, name those external features and use visible evidence to compare and group living things.",
      model_title:"Look closely at external features",
      model_html:"<div class=\"model\">Plant: roots • stem • leaves<br>Bird: feathers • wings • beak • legs<br>Fish: scales • fins • tail • eyes</div>",
      apply_title:"Group by an observable rule",
      apply_html:"<div class=\"model\">body covering → feathers / fur / scales<br>movement feature → wings / fins / legs<br>plant feature → flowers / no flowers</div><p>More than one sensible grouping rule can be correct if the rule uses visible evidence.</p>",
      vocabulary:[
        {term:"external feature",definition:"A part or characteristic visible on the outside of a plant or animal."},
        {term:"observe",definition:"Look closely and describe what can actually be seen."},
        {term:"compare",definition:"Notice how visible features are the same or different."},
        {term:"group",definition:"Put living things together because they share an observable feature."},
        {term:"grouping rule",definition:"The visible feature used to decide what belongs in a group."},
        {term:"evidence",definition:"The feature you can point to that supports an observation or grouping."}
      ],
      elaborations:[
        {
          label:"E1",title:"Identify fruits and vegetables as plant parts",
          idea:"A fruit or vegetable can be identified by the plant part it comes from, using visible features rather than where it is sold or how it is eaten.",
          teach:"Observe fruits and vegetables and identify visible plant parts",
          steps:["Display a whole carrot with leaves, a lettuce leaf and a tomato attached to a stem or clear photographs of them.","Point to the visible evidence and label carrot as a root, lettuce as a leaf and tomato as a fruit."],
          say:"Which plant part is this? What visible evidence supports your answer?",
          check:"The learner identifies a root, leaf, flower or fruit and points to a relevant visible feature.",
          fix:"Return to a whole plant diagram or specimen and trace the item back to its position on the plant.",
          worked:"Carrot has fine side roots and grows below the stem, so we identify it as a root. Lettuce is a broad flat leaf.",
          mistake:"Classifying only by food group, taste or supermarket category.",
          visual:"<div class=\"model\">carrot → root<br>lettuce → leaf<br>tomato → fruit<br>broccoli → flower buds</div>"
        },
        {
          label:"E2",title:"Compare humans with other animals",
          idea:"Humans are animals. Human external features can be compared with those of other animals by naming visible similarities and differences.",
          teach:"Recognise humans as animals and compare external features",
          steps:["Place a photograph or outline of a person beside a familiar animal.","Name only visible features, then record one similarity and one difference."],
          say:"What external feature do both have? What visible feature is different?",
          check:"The learner states that humans are animals and gives an observable similarity and difference.",
          fix:"Use a two-column Same/Different chart and ask the learner to point before explaining.",
          worked:"A person and a dog both have eyes and legs. The person has skin with some hair; the dog has fur over most of its body.",
          mistake:"Treating humans as separate from animals or comparing behaviour instead of external features.",
          visual:"<div class=\"model\">person + dog<br>SAME → eyes • legs<br>DIFFERENT → skin / fur • 2 legs / 4 legs</div>"
        },
        {
          label:"E3",title:"Use tools to observe more detail",
          idea:"A magnifying glass or digital camera can reveal small external features while the observation remains based on visible evidence.",
          teach:"Use a simple tool to identify external features",
          steps:["Observe a leaf or safe animal photograph first without a tool.","Observe again with a magnifying glass or zoomed photograph and add one newly visible detail."],
          say:"What could you see before? What extra external feature or detail can you see now?",
          check:"The learner names a specific new visible detail revealed by the tool.",
          fix:"Focus the tool on one small area and offer precise choices such as veins, hairs, edges or scales.",
          worked:"Without the magnifier I saw a green leaf. With it I can see branching veins and tiny hairs along the edge.",
          mistake:"Naming what the tool is rather than reporting the detail it reveals.",
          visual:"<div class=\"model\">eyes only → leaf shape<br>magnifying glass → veins • tiny hairs • edge detail<br>camera zoom → close evidence to compare</div>"
        },
        {
          label:"E4",title:"Sort animals using different visible rules",
          idea:"The same collection of animals can be grouped in more than one correct way when each grouping uses a clear observable rule.",
          teach:"Sort model animals and explain the grouping strategy",
          steps:["Sort bird, fish, dog and person cards first by body covering.","Resort the same cards by movement features or number of visible legs and state the new rule."],
          say:"What is your grouping rule? Where does each animal belong, and what feature proves it?",
          check:"Every animal is placed consistently and the learner states one visible rule that explains all placements.",
          fix:"Complete the sentence ‘I grouped them by…’ before moving any cards, then check each card against that rule.",
          worked:"By body covering: bird has feathers, fish has scales, dog has fur and person has mostly visible skin. A different valid sort can use wings, fins or legs.",
          mistake:"Changing the rule between animals or grouping by preference.",
          visual:"<div class=\"model\">RULE 1: body covering → feathers / scales / fur / skin<br>RULE 2: movement feature → wings / fins / legs<br>same animals • different valid rules</div>"
        },
        {
          label:"E5-E6",title:"Learn from local First Nations classifications",
          idea:"First Nations Australians hold detailed, place-based knowledge of living things. Local names and groupings should be taught through an appropriate local source rather than invented or generalised.",
          teach:"Connect observable features with a locally authorised First Nations classification",
          steps:["Use a local Aboriginal or Torres Strait Islander community-approved resource about familiar living things.","Identify the observable features used in the named or grouping system and acknowledge the source and Country or Place."],
          say:"Which visible features are important in this local classification? Who is the source of this knowledge?",
          check:"The learner links a visible feature to the supplied local classification without claiming one system represents all First Nations groups.",
          fix:"Return to the authorised local source, name the specific community or Country, and avoid substituting a generic example.",
          worked:"Use the exact example and terminology supplied by the local community-approved resource, then point to the external features it identifies.",
          mistake:"Presenting a generic or invented ‘First Nations’ grouping as universal.",
          visual:"<div class=\"model\">local approved source → observe named features → record the local grouping → acknowledge community and Country or Place</div>"
        }
      ],
      visuals:[
        {...IMG.plant,title:"Plant features",body:"Look for roots, stems and leaves. Flowers, fruits and seeds may also be visible."},
        {...IMG.bird,title:"Bird features",body:"Feathers, wings, beak, eyes and legs are external features."},
        {...IMG.fish,title:"Fish features",body:"Scales, fins, eyes, mouth and tail are visible external features."}
      ],
      activities:[
        {title:"Leaf detective",text:"Observe a real leaf or plant. Name three features you can see.",visual:0},
        {title:"Bird and fish compare",text:"Use the photos to name one visible similarity and two visible differences.",visual:1},
        {title:"Sort by a feature",text:"Sort four animal pictures by body covering, legs, wings or fins. Explain the rule.",visual:2}
      ],
      mistakes:[["Guessing unseen features","Describe what can actually be observed on the outside."],["Grouping without a rule","Finish the sentence: “I grouped them by …”"],["Colour only","Also notice structural features such as leaves, wings, scales, legs or body covering."]],
      quick:["Name two external features visible on a plant.","Which is a body covering: feathers, beak or wing?","Give one rule for grouping a bird, fish and dog.","Why can the same animals be grouped in more than one sensible way?"],
      mastery:["Observe carefully","Name external features","Compare visible features","Group by a feature","Explain the grouping rule"]
    },
    AC9SFU02: {
      slug:"ac9sfu02-how-objects-move-and-how-factors-including-their-size-shape",
      title:"How Objects Move",
      subtitle:"Describe movement and notice how size, shape and material can change it",
      desc:"describe how objects move and how factors including their size, shape or material influence their movement",
      routine:"Observe → Move → Describe → Change one feature → Compare",
      learn:"Objects can move in different ways such as rolling, sliding, spinning and bouncing. Their size, shape and material can affect how they move.",
      model_title:"Shape can change the movement",
      model_html:"<div class=\"model\">round marble → rolls easily<br>flat block → tends to slide<br>spinning top → turns around one point</div>",
      apply_title:"Make a fair movement comparison",
      apply_html:"<div class=\"model\">Same surface + same start → change ONE feature</div><p>Compare two objects fairly by keeping the start and surface the same.</p>",
      visuals:[
        {...IMG.marbles,title:"Round objects",body:"Marbles are round, so they can roll. Watch the direction and distance they travel."},
        {...IMG.wood,title:"Shape and surface",body:"A block has flat faces and edges. Compare whether it rolls, slides or stays still."}
      ],
      activities:[
        {title:"Roll or slide?",text:"Test a marble and a block on the same surface. Describe how each moves.",visual:0},
        {title:"Ramp test",text:"Release two objects from the same starting point on a simple ramp. Compare the movement.",visual:1},
        {title:"Change one feature",text:"Change only size, shape or material and say what changed about the movement.",visual:0}
      ],
      mistakes:[["Changing two things at once","Change only one feature so the comparison is fair."],["Only saying fast or slow","Also describe the kind of movement: roll, slide, spin or bounce."],["Assuming bigger always moves farther","Observe and compare instead of guessing from size alone."]],
      quick:["Name two ways an object can move.","Why is a marble likely to roll?","What should stay the same in a fair ramp test?","How could material affect movement?"],
      mastery:["Name movement types","Notice shape effects","Compare fairly","Change one feature","Describe evidence"]
    },
    AC9SFU03: {
      slug:"ac9sfu03-that-objects-can-be-composed-of-different-materials-and-describe",
      title:"Materials and Their Properties",
      subtitle:"Identify materials and describe what you can observe about them",
      desc:"recognise that objects can be composed of different materials and describe the observable properties of those materials",
      routine:"Observe object → Name material → Describe property → Compare → Match to use",
      learn:"Objects can be made from one or more materials. Materials can be described using observable properties such as hard, soft, smooth, rough, bendy, stiff, shiny or dull.",
      model_title:"Object, material and property are different ideas",
      model_html:"<div class=\"model\">chair → wood → hard / stiff<br>cloth → fabric → soft / bendy<br>spoon → metal → hard / shiny</div>",
      apply_title:"Choose a material because of its properties",
      apply_html:"<div class=\"model\">towel → absorbent fabric<br>window → transparent glass<br>raincoat → water-resistant material</div><p>Describe the property you can observe or test.</p>",
      visuals:[
        {...IMG.wood,title:"Wood",body:"Wood is often hard and stiff. Its grain and surface can be observed."},
        {...IMG.fabric,title:"Fabric",body:"Fabric may be soft, flexible, woven and absorbent."},
        {...IMG.woodMetal,title:"Compare materials",body:"Different materials can have different textures, hardness and shine."}
      ],
      activities:[
        {title:"Material hunt",text:"Find three classroom objects. Name the material and one observable property of each.",visual:0},
        {title:"Touch and compare",text:"Compare wood and fabric using words such as hard, soft, rough, smooth, bendy or stiff.",visual:1},
        {title:"Best material",text:"Choose a suitable material for a towel, spoon or raincoat and explain using a property.",visual:2}
      ],
      mistakes:[["Object = material","Say the object name first, then the material it is made from."],["Using only colour","Use material properties such as hard, soft, rough, smooth, bendy or stiff."],["Guessing without observing","Touch, look or perform a safe simple test before describing the property."]],
      quick:["Name one material used to make classroom objects.","Which word describes a property: soft or chair?","Why might fabric suit a towel?","Can one object be made from more than one material?"],
      mastery:["Name materials","Describe observable properties","Compare materials","Separate object from material","Match property to use"]
    },
    AC9SFH01: {
      slug:"ac9sfh01-the-ways-people-make-and-use-observations-and-questions-to",
      title:"Observing and Asking About Nature",
      subtitle:"Use careful observations and useful questions to learn about the natural world",
      desc:"explore the ways people make and use observations and questions to learn about the natural world",
      routine:"Notice → Observe closely → Describe → Ask → Learn more",
      learn:"Science often begins by noticing something, observing it carefully and asking a question that can help us learn more about the natural world.",
      model_title:"Observation and question are different",
      model_html:"<div class=\"model\">Observation: “The seedling has 4 leaves.”<br>Question: “Will it grow more leaves next week?”</div>",
      apply_title:"Use tools to notice more detail",
      apply_html:"<div class=\"model\">eyes + magnifying glass + simple photos → closer observation</div><p>Describe what you actually notice before asking what you want to find out.</p>",
      visuals:[
        {...IMG.magnify,title:"Observe closely",body:"A magnifying glass can help us notice details that are easy to miss."},
        {...IMG.seedling,title:"Ask from what you notice",body:"A careful observation can lead to a useful science question about change or growth."}
      ],
      activities:[
        {title:"Nature notice",text:"Choose a leaf, rock or plant. Say three things you can actually observe.",visual:0},
        {title:"Turn noticing into a question",text:"Use one observation to make a question beginning with what, how, which or will.",visual:1},
        {title:"Look again",text:"Use a magnifying glass or close photo. Add one new detail to your observation.",visual:0}
      ],
      mistakes:[["Opinion instead of observation","Use words that describe what can be seen, heard, felt or otherwise safely sensed."],["Question with no link to evidence","Start from something you observed first."],["Guessing instead of looking","Observe before deciding what is happening."]],
      quick:["What is an observation?","Turn “The leaf has spots” into a science question.","How can a magnifying glass help?","Why should we observe before we explain?"],
      mastery:["Make observations","Describe evidence","Ask useful questions","Use simple tools","Connect questions to observations"]
    },
    AC9SFI01: {
      slug:"ac9sfi01-questions-and-make-predictions-based-on-experiences",
      title:"Questions and Predictions",
      subtitle:"Ask a testable question and make a sensible prediction from experience",
      desc:"pose questions and make predictions based on experiences",
      routine:"Notice → Ask → Think about experience → Predict → Test later",
      learn:"A science question asks what we want to find out. A prediction says what we think might happen, using what we already know or have experienced.",
      model_title:"Question first, prediction second",
      model_html:"<div class=\"model\">Question: Which marble will roll farther?<br>Prediction: I think the smooth marble will roll farther because I have seen smooth round objects roll easily.</div>",
      apply_title:"Predictions do not have to be correct",
      apply_html:"<p>A prediction is a sensible idea before the test. After observing, we compare what happened with what we predicted.</p>",
      visuals:[
        {...IMG.marbles,title:"Ask about movement",body:"Marbles can prompt questions about rolling, distance, size and surface."},
        {...IMG.seedling,title:"Predict change",body:"A seedling can prompt questions and predictions about growth over time."}
      ],
      activities:[
        {title:"Ask a question",text:"Look at the marbles and ask one question that could be explored.",visual:0},
        {title:"Make a prediction",text:"Predict what might happen and give one reason from experience.",visual:0},
        {title:"Growth prediction",text:"Look at the seedling and predict one change you might observe later.",visual:1}
      ],
      mistakes:[["Prediction stated as a fact","Use “I think … because …” before the investigation."],["Random guess","Connect the prediction to something you have seen or experienced."],["Question too broad","Ask one clear thing you can observe or compare."]],
      quick:["What is a prediction?","Write one question about a rolling marble.","Why should a prediction include a reason?","Can a useful prediction turn out to be wrong?"],
      mastery:["Pose a clear question","Make a prediction","Give a reason","Use prior experience","Know predictions can change"]
    },
    AC9SFI02: {
      slug:"ac9sfi02-engage-in-investigations-safely-and-make-observations-using",
      title:"Safe Science Investigations",
      subtitle:"Follow simple safety rules and use senses carefully to make observations",
      desc:"engage in investigations safely and make observations using their senses",
      routine:"Listen → Check safety → Investigate → Observe → Report",
      learn:"Foundation scientists follow instructions, use equipment carefully and make safe observations with senses such as sight, hearing, touch and smell when a teacher says it is safe.",
      model_title:"Use senses safely",
      model_html:"<div class=\"model\">LOOK → colour / shape / movement<br>LISTEN → loud / soft / tapping<br>TOUCH → only when told it is safe<br>SMELL → only when told it is safe<br>TASTE → never unless specifically part of a safe food activity</div>",
      apply_title:"Stop and check before investigating",
      apply_html:"<p>Ask: What are the instructions? What equipment is safe to touch? Which senses are safe to use?</p>",
      visuals:[
        {...IMG.magnify,title:"Use tools carefully",body:"Simple tools can help observation when they are handled safely and as instructed."},
        {...IMG.fabric,title:"Safe touch observation",body:"A safe classroom material can be compared by touch when the teacher says it is appropriate."}
      ],
      activities:[
        {title:"Safety sort",text:"Sort actions into safe / ask first / not safe for a simple classroom investigation.",visual:0},
        {title:"Sense words",text:"Observe a safe object and describe it using sight and, if permitted, touch.",visual:1},
        {title:"Tool check",text:"Practise carrying and using a magnifying glass carefully, then report one detail you noticed.",visual:0}
      ],
      mistakes:[["Using every sense automatically","Only use a sense when the activity instructions say it is safe."],["Touching before listening","Wait for instructions before handling materials or equipment."],["Observation without evidence","Say what you actually noticed with a safe sense."]],
      quick:["Name two senses that can help an observation.","When should you touch a science material?","Why should we follow instructions first?","What should you do if you are unsure whether something is safe?"],
      mastery:["Follow safety instructions","Use senses safely","Handle simple tools","Describe observations","Ask when unsure"]
    },
    AC9SFI03: {
      slug:"ac9sfi03-represent-observations-in-provided-templates-and-identify",
      title:"Recording Observations and Finding Patterns",
      subtitle:"Record what you notice in a simple template and look for a repeated pattern",
      desc:"represent observations in provided templates and identify patterns with guidance",
      routine:"Observe → Record → Look across results → Notice pattern → Describe",
      learn:"We can record observations using pictures, marks, words or simple tables. Looking across the records can help us notice a pattern.",
      model_title:"Record observations so they can be compared",
      model_html:"<div class=\"model\">Day 1: 2 leaves<br>Day 3: 3 leaves<br>Day 5: 4 leaves<br>Pattern: the number of leaves increased.</div>",
      apply_title:"A pattern must come from the records",
      apply_html:"<p>Point to the observations that support the pattern. Do not choose a pattern just because it sounds likely.</p>",
      visuals:[
        {...IMG.seedling,title:"Observe change",body:"A seedling can be observed more than once and recorded in a simple growth table."},
        {...IMG.marbles,title:"Sort and record",body:"Objects can be sorted by a feature, then recorded with pictures, tally marks or numbers."}
      ],
      activities:[
        {title:"Picture record",text:"Draw a simple before-and-after observation of a plant or object.",visual:0},
        {title:"Simple table",text:"Record one observation in each box of a teacher-provided table.",visual:0},
        {title:"Find the pattern",text:"Look across the records and complete: “I notice that …”",visual:1}
      ],
      mistakes:[["Changing the record after seeing the answer","Record what was actually observed at the time."],["Pattern not supported by data","Point to at least two observations that show the pattern."],["Too much detail","Use the provided simple template and record the important feature only."]],
      quick:["Name one way to record an observation.","What is a pattern?","Why use the same template each time?","What evidence should support a pattern statement?"],
      mastery:["Record observations","Use a provided template","Compare records","Notice a simple pattern","Support pattern with evidence"]
    },
    AC9SFI04: {
      slug:"ac9sfi04-observations-with-predictions-with-guidance",
      title:"Comparing Predictions and Observations",
      subtitle:"Compare what you thought would happen with what you actually observed",
      desc:"compare observations with predictions with guidance",
      routine:"Recall prediction → Observe result → Compare → Say same/different → Learn",
      learn:"After an investigation, compare the prediction with the observation. A different result is useful because it helps us update our thinking.",
      model_title:"Prediction and observation have different jobs",
      model_html:"<div class=\"model\">Prediction: “The large marble will roll farther.”<br>Observation: “The small marble rolled farther.”<br>Compare: The observation was different from the prediction.</div>",
      apply_title:"Use evidence, not embarrassment",
      apply_html:"<p>We do not change the prediction after the test. We keep it, record the observation and explain whether they matched.</p>",
      visuals:[
        {...IMG.marbles,title:"Compare movement results",body:"A rolling-object investigation can produce an observation that matches or differs from the prediction."},
        {...IMG.seedling,title:"Compare growth predictions",body:"A later plant observation can be compared with an earlier prediction about growth."}
      ],
      activities:[
        {title:"Match or different?",text:"Read a prediction and an observation. Decide whether they match.",visual:0},
        {title:"Evidence sentence",text:"Complete: “I predicted ____. I observed ____. They were the same/different.”",visual:0},
        {title:"Update thinking",text:"Say one thing you learned from a result that was different from your prediction.",visual:1}
      ],
      mistakes:[["Changing the old prediction","Keep the original prediction so the comparison is honest."],["Calling a wrong prediction a failure","A different result still gives useful evidence."],["Comparing without stating the observation","Say what actually happened before deciding whether it matched."]],
      quick:["What do we compare after an investigation?","Can a prediction be different from the observation?","Why keep the original prediction?","Write a sentence comparing a prediction and result."],
      mastery:["Recall prediction","State observation","Compare same/different","Use evidence","Update thinking"]
    },
    AC9SFI05: {
      slug:"ac9sfi05-share-questions-predictions-observations-and-ideas-with-others",
      title:"Sharing Science Ideas",
      subtitle:"Share questions, predictions and observations clearly with others",
      desc:"share questions, predictions, observations and ideas with others",
      routine:"Think → Choose evidence → Say/show → Listen → Respond",
      learn:"Scientists share what they asked, predicted and observed so other people can understand the investigation and discuss the evidence.",
      model_title:"Share a short science story",
      model_html:"<div class=\"model\">Question → What did we want to find out?<br>Prediction → What did I think would happen?<br>Observation → What actually happened?<br>Idea → What do I think now?</div>",
      apply_title:"Use a picture, object, words or simple record",
      apply_html:"<p>Foundation students can share by speaking, pointing to a drawing, showing a simple table or demonstrating with an object.</p>",
      visuals:[
        {...IMG.magnify,title:"Show what you observed",body:"A photo or object can help you point to evidence while you explain what you noticed."},
        {...IMG.seedling,title:"Use evidence in your explanation",body:"A simple observation record can help you explain how a plant changed over time."}
      ],
      activities:[
        {title:"Show and tell evidence",text:"Point to a photo, drawing or object and say one observation clearly.",visual:0},
        {title:"Question-prediction-result",text:"Share one short sentence for each part of an investigation.",visual:1},
        {title:"Listen and respond",text:"Listen to a partner, then say one thing you heard or one question you still have.",visual:0}
      ],
      mistakes:[["Only saying the answer","Share the observation or evidence that supports the idea."],["Mixing prediction and result","Use separate sentences for what you thought and what you observed."],["Not listening to others","Science sharing includes listening and responding respectfully."]],
      quick:["Name two ways a Foundation student can share an observation.","What should come after a prediction in a science story?","Why show evidence while explaining?","How can you respond after listening to a partner?"],
      mastery:["Share a question","Share a prediction","Share an observation","Use evidence","Listen and respond"]
    }
  };
})();
