(() => {
  "use strict";
  if (!window.SkillrYear4MathsRegister) throw new Error("Year 4 Maths base data is not loaded.");
  window.SkillrYear4MathsRegister({
    AC9M4SP01: {
      slug:"ac9m4sp01-represent-and-approximate-composite-shapes-and-objects-in-the",
      title:"Composite Shapes and Objects",
      subtitle:"Decompose environmental forms into familiar two- and three-dimensional components",
      desc:"represent and approximate composite shapes and objects in the environment, using combinations of familiar shapes and objects",
      routine:"Observe whole → Identify familiar components → Decompose → Represent → Approximate dimensions/position → Check resemblance",
      learn:"Complex shapes and objects can be represented by combining familiar shapes. A useful approximation preserves the important structure and proportions without copying every detail.",
      model_title:"Decompose a playground structure",
      model_visual:{type:"composite",parts:[["rectangle",8,48,84,38],["triangle",22,10,56,42],["circle",15,68,14,18],["circle",71,68,14,18]],label:"triangle roof + rectangle body + circular openings"},
      model_note:"The representation identifies components and their relative positions. Approximation is judged by how well the model communicates the important form.",
      apply_title:"Build a three-dimensional composite object",
      apply_visual:{type:"table",rows:[["Environmental object","Component approximations"],["water tower","cylinder tank + prism supports"],["house","rectangular prism + triangular prism roof"],["rocket model","cylinder + cone + triangular fins"],["bridge","prisms + cylinders + arches"]]},
      apply_note:"Choose components based on observable faces, edges, curved surfaces and arrangement. More components are not automatically better if they add irrelevant detail.",
      quick_visual:{type:"cards",items:["decompose","combine","approximate","proportion","relative position","2D vs 3D"]},
      activities:[
        {title:"Shape photograph markup",text:"Trace familiar component shapes over a photograph of a building, vehicle or playground object.",visual:{type:"composite",parts:[["rectangle",10,35,80,50],["triangle",25,5,50,35],["circle",20,58,12,16],["circle",68,58,12,16]],label:"identify and label components"}},
        {title:"Block-model challenge",text:"Use cubes, prisms, cylinders and cones to approximate a chosen environmental object, then justify each component.",visual:{type:"cards",items:["cube","rectangular prism","cylinder","cone","triangular prism"]}},
        {title:"Different decompositions",text:"Compare two ways to decompose the same object and evaluate which communicates its structure more clearly.",visual:{type:"compare",items:["few large components","more detailed components","different proportions"],note:"evaluate purpose and clarity"}}
      ],
      mistakes:[
        ["Naming only the outline","Identify internal components and how they combine."],
        ["2D and 3D objects confused","A drawing may use 2D shapes to represent a 3D object, but name both appropriately."],
        ["Proportions ignored","Relative size and position help the model resemble the object."],
        ["Approximation treated as exact copy","A model intentionally simplifies while preserving important features."]
      ],
      quick:["Decompose a house into familiar shapes/objects.","Explain approximation versus exact copy.","Name components of a water tower.","Why do proportions matter?","Compare two decompositions."],
      mastery:["Identify components","Decompose composite forms","Combine familiar shapes/objects","Use proportion/position","Evaluate approximations"],
      worksheet:[
        {type:"single",question:"Which components could approximate a simple house?",answers:["rectangular prism and triangular prism","sphere only","one line segment","cylinder only"]},
        {type:"fill-blank",question:"Complete the decomposition.",template:"A water tower can be approximated by a {{blank}} tank and prism or cylinder supports."},
        {type:"single",question:"Which feature most improves a composite-shape approximation?",answers:["accurate relative size and position of components","using the greatest possible number of shapes","copying only the colour","ignoring the overall structure"]},
        {type:"text",question:"Describe how to represent a playground slide using familiar 2D shapes and 3D objects."},
        {type:"match",question:"Match the object to a useful component combination.",matchLeft:["rocket","house","canopy"],matchRight:["cylinder + cone + fins","rectangular prism + roof prism","posts + flat or curved roof surface"]},
        {type:"fill-blank",question:"Complete the modelling principle.",template:"An approximation should preserve important structure and relative {{blank}}."},
        {type:"text",question:"Compare a 2D drawing and a block model of the same object. What information can each represent well?"},
        {type:"text",question:"A student models a long bus using one small cube. Explain why the component choice and proportions are weak."},
        {type:"text",question:"Choose a complex object in the environment. Create two different decompositions using familiar shapes, then evaluate which is more effective for a builder and which is more effective for a map symbol.",enrichment:true},
        {type:"text",question:"Design a composite structure using at least five familiar 3D objects. Describe front, side and top representations and explain how the views connect.",enrichment:true}
      ]
    },
    AC9M4SP02: {
      slug:"ac9m4sp02-and-interpret-grid-reference-systems-using-grid-references-and",
      title:"Grid References, Directions and Pathways",
      subtitle:"Create and interpret grid systems using coordinates, orientation and ordered movement",
      desc:"create and interpret grid reference systems using grid references and directions to locate and describe positions and pathways",
      routine:"Orient grid → Read horizontal reference → Read vertical reference → Locate cell/point → Follow ordered directions → Verify endpoint",
      learn:"Grid references identify positions consistently. A system must define how letters, numbers or coordinates are read, and pathway instructions must use a fixed orientation and clear sequence.",
      model_title:"Locate landmarks using letter–number references",
      model_visual:{type:"grid-ref",rows:5,cols:5,marks:[[5,1,"Gate"],[4,3,"Lake"],[2,2,"Library"],[1,5,"Oval"]]},
      model_note:"In a letter–number grid, state the column then row, such as C4 for the lake. The chosen convention must be declared and used consistently.",
      apply_title:"Describe a pathway with directions and distance",
      apply_visual:{type:"flow",items:["start A5","move 2 cells east","move 3 cells south","turn west","finish B2"]},
      apply_note:"Directions must be interpreted relative to the grid orientation. A path can be checked by tracing each move and confirming the final reference.",
      quick_visual:{type:"cards",items:["column then row","north-up orientation","ordered steps","distance in cells","start/end reference","verify route"]},
      activities:[
        {title:"Landmark grid",text:"Create a 6 × 6 map with a key and at least eight landmarks, then write references for each.",visual:{type:"grid-ref",rows:5,cols:5,marks:[[5,2,"Tree"],[3,4,"Pond"],[2,1,"Cafe"],[1,3,"Hall"]]}},
        {title:"Route exchange",text:"Write a route using compass directions and cell counts; a partner follows it and reports the endpoint.",visual:{type:"cards",items:["N 2","E 3","S 1","W 2","endpoint?"]}},
        {title:"Convention comparison",text:"Compare cell references such as B3 with point coordinates and explain why the systems cannot be mixed casually.",visual:{type:"table",rows:[["System","What is located"],["B3 cell","an area/square"],["(2,3) coordinate","a point under a defined convention"]]}}
      ],
      mistakes:[
        ["Row and column order switched","State and follow the convention, usually column then row for letter–number cells."],
        ["North changes during route","Grid orientation remains fixed even after turns."],
        ["Moves counted by lines instead of cells","Define whether a move crosses cells or grid intervals and apply consistently."],
        ["Cell reference and point coordinate mixed","They locate different features unless the system defines otherwise."]
      ],
      quick:["Locate C4 on a grid.","Follow E2, west 2, north 1.","Explain column-then-row.","Why must orientation stay fixed?","Compare a cell and coordinate point."],
      mastery:["Read grid references","Create reference systems","Use compass directions","Describe pathways","Check conventions/endpoints"],
      worksheet:[
        {type:"single",question:"In a letter–number grid using column then row, what does C4 identify?",answers:["column C, row 4","row C, column 4","three cells north and four west","the fourth letter only"]},
        {type:"fill-blank",question:"Complete the route.",template:"From B2, move 3 cells east to column {{blank}}."},
        {type:"single",question:"If north is at the top of the page, which direction is right?",answers:["east","west","south","north"]},
        {type:"text",question:"Create a 5 × 5 grid with four landmarks and write an unambiguous reference for each."},
        {type:"match",question:"Match the movement to the direction change.",matchLeft:["north","east","south"],matchRight:["down on a north-up grid","up on a north-up grid","right on a north-up grid"]},
        {type:"fill-blank",question:"Complete the endpoint.",template:"Start D5, move 2 cells west and 3 cells south: finish at {{blank}}."},
        {type:"text",question:"Explain why a route must state the starting reference and orientation."},
        {type:"text",question:"A student reads B4 as row B, column 4 on a column-letter/row-number grid. Explain the convention error."},
        {type:"text",question:"Design two different routes between the same landmarks. Compare distance, number of turns and clarity of instructions.",enrichment:true},
        {type:"text",question:"Create a grid system that uses coordinates at points rather than cell references. Explain how its convention differs from a letter–number cell grid and prevent ambiguity.",enrichment:true}
      ]
    },
    AC9M4SP03: {
      slug:"ac9m4sp03-line-and-rotational-symmetry-of-shapes-and-create-symmetrical",
      title:"Line and Rotational Symmetry",
      subtitle:"Identify symmetry, determine rotational order and create invariant patterns",
      desc:"recognise line and rotational symmetry of shapes and create symmetrical patterns and pictures, using dynamic geometric software where appropriate",
      routine:"Identify possible transformation → Test reflection/rotation → Check exact match → Count axes/order → Create and verify",
      learn:"Line symmetry occurs when reflection across an axis maps a figure onto itself. Rotational symmetry occurs when a turn less than 360° maps the figure onto itself; rotational order counts matching positions in one full turn.",
      model_title:"Test line and rotational symmetry",
      model_visual:{type:"symmetry",shape:"kite",axis:"vertical",order:2},
      model_note:"A visual guess is not enough. Fold, trace, reflect or rotate to test whether every point maps to a matching point.",
      apply_title:"Compare symmetry properties of familiar shapes",
      apply_visual:{type:"table",rows:[["Shape","Lines of symmetry","Rotational order"],["square","4","4"],["rectangle (not square)","2","2"],["equilateral triangle","3","3"],["non-square kite","1","1"],["parallelogram","0","2"]]},
      apply_note:"Line symmetry and rotational symmetry are different properties. A parallelogram may have rotational symmetry without any line symmetry.",
      quick_visual:{type:"cards",items:["reflection","axis","exact overlap","rotation < 360°","order","orientation"]},
      activities:[
        {title:"Mirror and tracing test",text:"Use mirrors or tracing paper to test proposed lines of symmetry and record counterexamples.",visual:{type:"symmetry",shape:"kite",axis:"horizontal",order:1}},
        {title:"Rotational order wheel",text:"Rotate shapes through equal fractions of a full turn and count matching positions.",visual:{type:"flow",items:["square","90° match","180° match","270° match","360° match","order 4"]}},
        {title:"Dynamic pattern design",text:"Create a repeated motif using reflection or rotation, then state the transformation and verify invariance.",visual:{type:"cards",items:["motif","reflect","rotate 90°","repeat","verify overlap"]}}
      ],
      mistakes:[
        ["Near match accepted","Symmetry requires exact correspondence."],
        ["Every diagonal is an axis","Only lines that map the entire shape onto itself count."],
        ["360° counted as the only rotational match","Order includes all matching positions during one full turn, including the starting orientation."],
        ["Line and rotational symmetry assumed together","A shape can have one without the other."]
      ],
      quick:["State symmetry of a square.","Does a parallelogram have line symmetry?","Find rotational order of an equilateral triangle.","Explain exact overlap.","Create a reflected motif."],
      mastery:["Test line symmetry","Count axes","Test rotational symmetry","Determine order","Create and verify patterns"],
      worksheet:[
        {type:"single",question:"How many lines of symmetry does a square have?",answers:["4","2","1","0"]},
        {type:"fill-blank",question:"Complete the rotational property.",template:"A rectangle that is not a square has rotational order {{blank}}."},
        {type:"single",question:"Which shape can have rotational symmetry but no line symmetry?",answers:["a general parallelogram","a circle","a square","an equilateral triangle"]},
        {type:"text",question:"Explain how tracing paper can test whether a proposed rotation maps a shape onto itself."},
        {type:"match",question:"Match each shape to a symmetry property.",matchLeft:["square","non-square kite","parallelogram"],matchRight:["one line of symmetry","rotational order 2 with no line symmetry","four lines and rotational order 4"]},
        {type:"fill-blank",question:"Complete the turn.",template:"A shape with rotational order 4 matches every {{blank}}°."},
        {type:"text",question:"Compare the line and rotational symmetry of a rectangle and a square."},
        {type:"text",question:"A student draws a line through a shape and calls it an axis because it cuts the area approximately in half. Explain why this is insufficient."},
        {type:"text",question:"Create a pattern with rotational order 4 but no extra lines of symmetry. Describe how you would test the design.",enrichment:true},
        {type:"text",question:"Investigate how adding one asymmetric mark to a highly symmetrical shape changes its line symmetry and rotational order. Explain every change.",enrichment:true}
      ]
    }
  }, ["AC9M4SP01","AC9M4SP02","AC9M4SP03"]);
})();
