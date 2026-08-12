(() => {
  "use strict";
  if (!window.SkillrYear6Register) throw new Error("Year 6 curriculum base is not loaded.");

  const S = {
    AC9M6SP01: {
      slug:"ac9m6sp01-the-parallel-cross-sections-of-objects-and-recognise-their",
      title:"Parallel Cross-sections of Three-dimensional Objects",
      subtitle:"Predict and recognise how slices relate to an object’s structure",
      desc:"recognise and describe the parallel cross-sections of objects and recognise their relationships to the object’s base and shape",
      learn:"Students visualise and construct slices parallel to a base, identify when cross-sections remain congruent and compare prisms, cylinders, pyramids and cones.",
      modelTitle:"Slice a prism parallel to its base",
      modelVisual:{type:"cross-section",shape:"prism",section:"rectangle",label:"Every parallel slice of a right rectangular prism is a congruent rectangle"},
      modelNote:"For a prism or cylinder, cross-sections parallel to the base keep the base shape and size. For a pyramid or cone, parallel sections keep the shape but change size.",
      applyTitle:"Compare constant and changing cross-sections",
      applyVisual:{type:"table",data:[["object","base","parallel cross-section"],["rectangular prism","rectangle","congruent rectangle"],["triangular prism","triangle","congruent triangle"],["cylinder","circle","congruent circle"],["square pyramid","square","smaller/larger similar square"],["cone","circle","smaller/larger circle"]]},
      applyNote:"A non-parallel cut can produce a different shape. The orientation of the cutting plane is part of the description.",
      terms:[["cross-section","two-dimensional shape exposed by slicing a solid"],["parallel","remaining the same distance apart and never meeting"],["base","reference face or surface used to describe a solid"]],
      mistakes:[["Every slice matches the base","Only slices parallel to the base have the stated relationship."],["Prism and pyramid treated alike","Prism sections stay congruent; pyramid sections scale."],["Cross-section called a face of the original object","It is created by the cut."],["Orientation omitted","State the cutting plane’s direction."]],
      quick:["Predict a prism slice.","Compare prism/pyramid.","Identify a cone section.","Explain parallel.","Describe a non-parallel cut."],
      questions:{
        choice1:["What is a cross-section parallel to the base of a triangular prism?",["A congruent triangle","A circle","A smaller square","Always a rectangle"]],
        fill1:["Complete the prism relationship.","Parallel cross-sections of a prism are {{blank}} to its base."],
        choice2:["How do parallel cross-sections of a square pyramid change toward the apex?",["They remain square but become smaller","They remain congruent","They become circles","They grow larger only"]],
        fill2:["Complete the orientation condition.","The cut must be {{blank}} to the chosen base."],
        apply:"Describe parallel and non-parallel cross-sections of a cylinder and explain why they differ.",
        enrichment1:"Design a solid whose parallel cross-sections follow a specified sequence of sizes and explain possible limitations.",
        enrichment2:"Compare two solids that share the same base shape but have different parallel cross-section behaviour."
      }
    },
    AC9M6SP02: {
      slug:"ac9m6sp02-locate-points-in-the-4-quadrants-of-a-cartesian-plane",
      title:"Coordinates in Four Quadrants",
      subtitle:"Locate, transform and reason about points across the Cartesian plane",
      desc:"locate points in the 4 quadrants of a Cartesian plane; describe changes to the coordinates when a point is moved to a different position",
      learn:"Students plot ordered pairs with positive and negative coordinates, identify quadrants and explain coordinate changes under horizontal, vertical and symmetric movement.",
      modelTitle:"Plot one point in each quadrant",
      modelVisual:{type:"coordinate",min:-4,max:4,points:[[3,2,"A"],[-3,2,"B"],[-3,-2,"C"],[3,-2,"D"]]},
      modelNote:"Quadrants are numbered anticlockwise from the upper right. The signs follow (+,+), (−,+), (−,−), (+,−).",
      applyTitle:"Describe coordinate changes and symmetry",
      applyVisual:{type:"table",data:[["movement","coordinate rule"],["4 right","(x,y) → (x+4,y)"],["3 down","(x,y) → (x,y−3)"],["reflect in y-axis","(x,y) → (−x,y)"],["reflect in x-axis","(x,y) → (x,−y)"],["half-turn about origin","(x,y) → (−x,−y)"]]},
      applyNote:"State the transformation or displacement, then verify distance and orientation on the grid.",
      terms:[["quadrant","one of four regions divided by the coordinate axes"],["ordered pair","coordinates written x first, then y"],["axis","reference line used to locate coordinates"]],
      mistakes:[["Coordinate order reversed","Read x then y."],["Negative direction ignored","Left and down are negative on a standard plane."],["Point on an axis assigned a quadrant","Axis points are not inside a quadrant."],["Reflection rule guessed","Identify which coordinate changes sign."]],
      quick:["Plot (−3,2).","Name Quadrant IV.","Translate a point.","Reflect in y-axis.","Identify an axis point."],
      questions:{
        choice1:["Which point lies in Quadrant III?",["(−4,−2)","(4,−2)","(−4,2)","(4,2)"]],
        fill1:["Complete the translation.","(−2,3) moved 5 right becomes ({{blank}},3)."],
        choice2:["What is the reflection of (3,−4) in the y-axis?",["(−3,−4)","(3,4)","(−3,4)","(4,−3)"]],
        fill2:["Complete the quadrant sign pattern.","Quadrant II has coordinates ({{blank}}, +)."],
        apply:"Plot a quadrilateral with vertices in all four quadrants, reflect it in the x-axis and compare coordinates and orientation.",
        enrichment1:"Create a coordinate puzzle using translations and reflections whose final point is uniquely determined.",
        enrichment2:"Investigate which sequences of reflections are equivalent to a half-turn or translation for selected points."
      }
    },
    AC9M6SP03: {
      slug:"ac9m6sp03-and-use-combinations-of-transformations-to-create-tessellations",
      title:"Transformations and Tessellations",
      subtitle:"Combine translations, rotations and reflections without gaps or overlaps",
      desc:"recognise and use combinations of transformations to create tessellations and patterns, using digital tools where appropriate",
      learn:"Students analyse how repeated congruent shapes cover a plane, describe the transformation sequence and use angle relationships to test whether vertices fit around a point.",
      modelTitle:"Build a repeating tessellation",
      modelVisual:{type:"tessellation",label:"A repeated shape covers the plane without gaps or overlaps"},
      modelNote:"A tessellation preserves congruence under rigid transformations. Around each vertex, the meeting angles total 360°.",
      applyTitle:"Use transformations to explain the pattern",
      applyVisual:{type:"table",data:[["move","description"],["translation","slide motif by a fixed vector"],["rotation","turn motif about a vertex"],["reflection","flip motif across a line"],["glide reflection","reflect, then translate along the line"],["vertex test","meeting angles total 360°"]]},
      applyNote:"Digital tools can repeat precise transformations, but students should identify the generating motif and transformation rule.",
      terms:[["tessellation","covering of a plane without gaps or overlaps"],["motif","repeated unit or design element"],["rigid transformation","movement preserving size and shape"]],
      mistakes:[["Pattern with gaps called tessellation","The plane must be covered continuously."],["Shape resized during repetition","Rigid transformations preserve congruence."],["Transformation described vaguely as move","Name direction, distance, centre, angle or line."],["Vertex angle condition ignored","Use 360° to test feasibility."]],
      quick:["Identify a tessellation.","Name the motif.","Describe a translation.","Use a vertex-angle test.","Combine transformations."],
      questions:{
        choice1:["What must be true of a tessellation?",["It covers without gaps or overlaps","Every tile is a circle","Shapes must change size","Only translations are allowed"]],
        fill1:["Complete the vertex condition.","Angles meeting at a point total {{blank}}°."],
        choice2:["Which transformation preserves size and shape?",["rotation","enlargement","stretching","non-uniform scaling"]],
        fill2:["Complete the glide reflection.","reflect across a line, then {{blank}} along that line."],
        apply:"Design a tessellation using one quadrilateral motif and describe the complete transformation sequence.",
        enrichment1:"Determine which regular polygons tessellate alone by using interior angles and the 360° vertex condition.",
        enrichment2:"Create two tessellations from the same motif using different transformation combinations and compare symmetry."
      }
    },
    AC9M6ST01: {
      slug:"ac9m6st01-interpret-and-compare-data-sets-for-ordinal-and-nominal",
      title:"Comparing Categorical and Numerical Data Sets",
      subtitle:"Interpret distributions using mode, shape, spread and context",
      desc:"interpret and compare data sets for ordinal and nominal categorical, discrete and continuous numerical variables using appropriate displays; compare distributions in terms of mode, range and shape",
      learn:"Students identify variable type, read displays accurately and compare centre, mode, range, clusters, gaps, skew and possible extremes without claiming causes unsupported by the data.",
      modelTitle:"Compare two numerical distributions",
      modelVisual:{type:"table",data:[["feature","Class A","Class B"],["mode","12","12 and 15"],["range","9","5"],["shape","clustered 11–14, one high value","more even 11–16"],["variation","greater","smaller"]]},
      modelNote:"One statistic does not describe a full distribution. Use several features and connect them to the measured context.",
      applyTitle:"Match display to variable type",
      applyVisual:{type:"compare",data:[["nominal categories","column graph or table"],["ordinal ratings","ordered columns"],["discrete numerical","dot plot or column graph"],["continuous numerical","grouped display or line-related context"],["two distributions","same scale and aligned categories"]]},
      applyNote:"Comparisons require consistent scales and definitions. Avoid interpreting an association as a causal explanation.",
      terms:[["nominal data","categories without inherent order"],["ordinal data","categories with meaningful order"],["distribution shape","pattern of concentration, gaps, symmetry or skew"]],
      mistakes:[["Ordinal categories treated as equal numerical intervals","Order is meaningful, spacing may not be."],["Range used as complete description","Also discuss concentration and shape."],["Different graph scales compared visually","Read actual values."],["Cause inferred from group difference","Data comparison alone does not establish cause."]],
      quick:["Classify a variable.","Find mode/range.","Describe shape.","Compare two groups.","Check graph scale."],
      questions:{
        choice1:["Which variable is ordinal categorical?",["satisfaction: low, medium, high","favourite colour","height in cm","number of siblings"]],
        fill1:["Complete the range.","maximum 18 − minimum 9 = {{blank}}."],
        choice2:["Which comparison is strongest?",["Class A has a larger range and a high extreme, while modes are similar","Class A is better","The taller graph proves causation","Both sets are identical"]],
        fill2:["Complete the limitation.","A difference between groups does not by itself prove a {{blank}} relationship."],
        apply:"Create or analyse two dot-plot data sets with the same mode but different spread and shape.",
        enrichment1:"Construct two distributions with the same range and mode but clearly different shapes. Explain the comparison.",
        enrichment2:"Audit a media graph comparing groups with inconsistent scales and rebuild a responsible display."
      }
    },
    AC9M6ST02: {
      slug:"ac9m6st02-statistically-informed-arguments-presented-in-traditional-and",
      title:"Evaluating Statistically Informed Arguments",
      subtitle:"Check data sources, samples, displays, summaries and claims",
      desc:"analyse statistically informed arguments presented in traditional and digital media; discuss and critique how data are represented and used to support claims",
      learn:"Students inspect question wording, sample selection, missing context, graph scale, selected statistics and causal language before deciding how strongly data support a claim.",
      modelTitle:"Audit a media statistics claim",
      modelVisual:{type:"sequence",data:[["Claim","‘9 in 10 prefer Brand A’"],["Source","Who conducted and funded it?"],["Sample","How many, selected how, from where?"],["Question","Was wording leading?"],["Display","Are scales and categories complete?"],["Statistic","Count, percentage, mean, mode?"],["Conclusion","What is actually supported?"]]},
      modelNote:"A numerical statement can be accurate yet misleading if the sample, denominator, comparison or omitted categories are unclear.",
      applyTitle:"Identify common representation tactics",
      applyVisual:{type:"table",data:[["tactic","risk"],["truncated axis","exaggerates visual difference"],["small voluntary sample","selection bias"],["percentage without denominator","hides sample size"],["average without distribution","hides spread or extremes"],["association phrased as cause","overstates evidence"]]},
      applyNote:"Critique the argument, not the people. State what additional information would allow a stronger judgement.",
      terms:[["sample","subset observed to learn about a larger population"],["bias","systematic influence producing unrepresentative evidence"],["denominator","total on which a fraction or percentage is based"]],
      mistakes:[["Any percentage treated as strong evidence","Check denominator and sample."],["Graph style trusted without values","Read axes and labels."],["Mean considered typical automatically","Inspect distribution and outliers."],["Correlation described as cause","Causal claims need stronger design and reasoning."]],
      quick:["Ask who/whom/how many.","Check denominator.","Spot truncated axis.","Question causal language.","Request missing evidence."],
      questions:{
        choice1:["What information is essential for interpreting ‘90% agreed’?",["The sample size and selection method","The font colour","The page number","The author’s favourite result"]],
        fill1:["Complete the percentage check.","A percentage needs a clear numerator and {{blank}}."],
        choice2:["What is a risk of a truncated vertical axis?",["It can exaggerate small differences","It always changes the data values","It proves causation","It increases sample size"]],
        fill2:["Complete the causal caution.","An association does not necessarily show {{blank}}."],
        apply:"Critique an advertisement claiming ‘users improved by 40%’ when no baseline, sample or comparison group is given.",
        enrichment1:"Create a technically accurate but misleading data display, then annotate every misleading choice and repair it.",
        enrichment2:"Compare two statistical arguments using the same data but different summaries. Decide which is fairer and why."
      }
    },
    AC9M6ST03: {
      slug:"ac9m6st03-plan-and-conduct-statistical-investigations-by-posing-and",
      title:"Planning and Conducting Statistical Investigations",
      subtitle:"Pose questions, collect representative data and communicate justified findings",
      desc:"plan and conduct statistical investigations by posing questions, collecting or accessing data, selecting and creating displays and interpreting results in context",
      learn:"Students define a statistical question and population, choose sampling and measurement methods, clean data, select displays, compare distributions and report findings with limitations.",
      modelTitle:"Use a complete investigation cycle",
      modelVisual:{type:"cycle",data:["pose statistical question","define population/variables","plan sample/method","collect and clean","represent","analyse","conclude","evaluate and communicate"]},
      modelNote:"The question determines the data and display. A strong conclusion is proportionate to the sample and method.",
      applyTitle:"Plan sampling and data quality",
      applyVisual:{type:"table",data:[["decision","quality question"],["population","Who or what is the conclusion about?"],["sample","How can selection be fair and practical?"],["variable","Categorical, discrete or continuous?"],["measurement","Unit, precision and consistency?"],["cleaning","Duplicates, missing values, categories?"],["report","Finding, uncertainty and limitation?"]]},
      applyNote:"Digital tools support collection and analysis, but they cannot repair a leading question or biased sample automatically.",
      terms:[["statistical question","question anticipating variation in data"],["population","complete group of interest"],["representative sample","sample reflecting relevant population characteristics"]],
      mistakes:[["Question has one fixed answer","Statistical questions expect variability."],["Convenience sample generalised broadly","State selection limitations."],["Data cleaned by changing inconvenient values","Correct only documented errors."],["Conclusion written before analysis","Let evidence guide it."]],
      quick:["Write a statistical question.","Define population/sample.","Choose variable type.","Plan a display.","State a limitation."],
      questions:{
        choice1:["Which is a statistical question?",["How long do Year 6 students spend travelling to school?","What is 4 + 6?","Is this ruler 30 cm?","What is one student’s name?"]],
        fill1:["Complete the investigation cycle.","question → sample → collect → represent → analyse → {{blank}}."],
        choice2:["Which sample is most likely representative of a whole year level?",["A random or stratified selection across classes","Only the first five volunteers","Only one friendship group","Only students absent from class"]],
        fill2:["Complete the conclusion limit.","Generalise only as far as the sample and method can {{blank}}."],
        apply:"Plan an investigation comparing travel time across two groups. Include sampling, measurement, displays and ethical privacy considerations.",
        enrichment1:"Compare random, systematic, stratified and convenience sampling for one school question and recommend a method.",
        enrichment2:"Design a digital investigation with validation rules and an audit trail while preserving respondent privacy."
      }
    },
    AC9M6P01: {
      slug:"ac9m6p01-that-probabilities-lie-on-numerical-scales-of-0-1",
      title:"Probability on a Scale from 0 to 1",
      subtitle:"Compare events using fractions, decimals and percentages",
      desc:"recognise that probabilities lie on numerical scales from 0 to 1 and use fractions, decimals and percentages to compare the likelihood of events",
      learn:"Students place impossible, unlikely, even-chance, likely and certain events on a numerical scale and convert among equivalent probability forms.",
      modelTitle:"Locate probability values on one scale",
      modelVisual:{type:"scale",items:[["impossible 0",0],["unlikely 0.2",20],["even 0.5",50],["likely 0.8",80],["certain 1",100]]},
      modelNote:"Probability 0 means impossible under the model and 1 means certain. Values between express relative likelihood, not a guarantee of short-run frequency.",
      applyTitle:"Connect fractions, decimals and percentages",
      applyVisual:{type:"table",data:[["fraction","decimal","percentage"],["1/4","0.25","25%"],["1/2","0.5","50%"],["3/5","0.6","60%"],["4/5","0.8","80%"],["1","1.0","100%"]]},
      applyNote:"Compare probabilities in a common representation and ensure the event and chance model are clearly defined.",
      terms:[["probability","numerical measure of event likelihood"],["certain event","event with probability 1"],["impossible event","event with probability 0"]],
      mistakes:[["Probability treated as a count","It is a relative value from 0 to 1."],["80% written as 80","Write 0.8 on the probability scale."],["Likely confused with certain","A likely event can fail."],["Context assumptions omitted","State the chance model."]],
      quick:["Place 0.35 on scale.","Convert 3/5.","Compare 45% and 0.5.","Name impossible/certain.","Explain likelihood not guarantee."],
      questions:{
        choice1:["Which probability represents an even chance?",["0.5","0","1","1.5"]],
        fill1:["Complete the equivalent form.","3/5 = 0.6 = {{blank}}%."],
        choice2:["Which event is more likely?",["0.72","65%","2/3","0.6"]],
        fill2:["Complete the valid range.","0 ≤ P(event) ≤ {{blank}}."],
        apply:"Order 3/8, 42%, 0.6 and 7/10 from least to most likely, showing a common representation.",
        enrichment1:"Create four distinct chance situations with probability 0.75 and explain each sample space.",
        enrichment2:"Analyse how changing assumptions can move an everyday event to a different point on the probability scale."
      }
    },
    AC9M6P02: {
      slug:"ac9m6p02-conduct-repeated-chance-experiments-and-run-simulations-with-an",
      title:"Repeated Chance Experiments and Simulations",
      subtitle:"Compare observed frequency with expected probability and sample size",
      desc:"conduct repeated chance experiments and run simulations with an increasing number of trials; compare observed frequencies with expected frequencies and explain variation",
      learn:"Students calculate expected frequency, conduct physical and digital trials, compare relative frequencies across sample sizes and discuss why results vary while often becoming more stable.",
      modelTitle:"Compare trial counts for a fair coin",
      modelVisual:{type:"table",data:[["trials","heads","relative frequency"],["10","7","0.70"],["50","27","0.54"],["200","103","0.515"],["1 000","498","0.498"],["expected","","0.5"]]},
      modelNote:"Larger samples often stabilise relative frequency near the model probability, but no trial count guarantees an exact match.",
      applyTitle:"Audit a simulation and expected frequency",
      applyVisual:{type:"compare",data:[["P(red)=0.3, 200 trials","expected red = 60"],["physical trial","check device and consistent procedure"],["digital simulation","check probability settings and trial count"],["comparison","use relative frequency when totals differ"],["variation","describe difference without changing data"]]},
      applyNote:"A simulation is only as valid as its probability model and implementation. Verify settings before interpreting output.",
      terms:[["expected frequency","probability multiplied by number of trials"],["relative frequency","observed count divided by trial total"],["simulation","modelled repetition of a chance process"]],
      mistakes:[["Expected frequency treated as guaranteed","It is a long-run prediction."],["Raw counts compared across unequal totals","Use proportions."],["Unwanted outcomes deleted","Record all valid trials."],["Simulation settings assumed correct","Audit the model."]],
      quick:["Calculate expected count.","Find relative frequency.","Compare 10/50/200 trials.","Explain variation.","Check simulation settings."],
      questions:{
        choice1:["If P(red)=0.3, what is the expected red frequency in 200 trials?",["60","30","200","0.3"]],
        fill1:["Complete the relative frequency.","27 heads in 50 tosses = {{blank}}."],
        choice2:["Why do observed frequencies differ from expected values?",["Chance variation","Expected values are commands","Probability is invalid","All devices are biased"]],
        fill2:["Complete the expected-frequency formula.","expected frequency = probability × number of {{blank}}."],
        apply:"Plan a 500-trial digital simulation and a 100-trial physical experiment for the same spinner, then compare evidence quality.",
        enrichment1:"Construct three data sets with different trial totals but nearly identical relative frequencies and compare evidential strength.",
        enrichment2:"Investigate how quickly relative frequency stabilises across multiple independent simulation runs."
      }
    }
  };

  window.SkillrYear6Register("maths", S, Object.keys(S));
})();
