// Manually authored Year 7 Mathematics topic-module content for Space,
// Statistics and Probability. These overrides deliberately retain the useful
// concepts and visual models in assets/year7-maths-data-spstp.js while making
// every example, slide and practice question concrete and self-contained.

export const year7MathsSpaceStatsProbabilityConfigs = {
  AC9M7SP01: {
    learningIntention: "We are learning to represent three-dimensional objects in two dimensions and judge which representation is fit for a stated purpose.",
    successCriteria: [
      "I can connect front, top and side views to the dimensions of one three-dimensional object.",
      "I can explain what an orthographic, isometric, net or cross-sectional representation shows and hides.",
      "I can use more than one view to resolve ambiguity and justify a representation choice."
    ],
    deepDive: [
      "Every two-dimensional representation selects information about a three-dimensional object, so it can communicate some spatial relationships clearly while hiding or distorting others. A front orthographic view shows width and height, a top view shows width and depth, and a side view shows depth and height; the views must agree because they describe the same object.",
      "Orthographic views are drawn as if the observer looks squarely at each face, which makes labelled dimensions reliable but hides depth in any single view. An isometric sketch makes the overall form easier to imagine, yet sloping lines and apparent lengths are not evidence of exact measurements unless a scale and dimensions are supplied.",
      "Nets are useful when faces must be cut and folded, while cross-sections reveal the shape made by a specified cutting plane. Selecting a representation therefore begins with the purpose, and combining consistent views is often the strongest way to communicate both shape and size."
    ],
    vocabulary: [
      {term: "orthographic view", definition: "An orthographic view is a two-dimensional view seen squarely from the front, top or side of an object."},
      {term: "isometric sketch", definition: "An isometric sketch is a three-dimensional-looking drawing in which parallel edges are drawn along consistent sloping directions."},
      {term: "net", definition: "A net is a flat arrangement of connected faces that can be folded to form a three-dimensional object."},
      {term: "cross-section", definition: "A cross-section is the two-dimensional shape exposed when an object is cut by a stated plane."}
    ],
    misconceptions: [
      {idea: "A single front view always determines the whole three-dimensional object.", correction: "Different objects can share the same front view, so another view or extra information may be necessary."},
      {idea: "A length measured along a perspective or isometric sketch must be the object's true length.", correction: "Apparent lengths can be distorted, so exact dimensions require labels or a reliable scale."},
      {idea: "The most realistic-looking drawing is always the most useful representation.", correction: "Fitness for purpose matters, so a simple dimensioned view can be more useful than a realistic sketch."}
    ],
    workedExamples: [
      {
        title: "Selecting dimensioned views for a storage unit.",
        steps: [
          "A rectangular storage unit is 120 centimetres wide, 80 centimetres high and 40 centimetres deep, and a carpenter needs drawings that show every construction dimension.",
          "Draw the front view as a 120-centimetre by 80-centimetre rectangle because the front shows width and height.",
          "Draw the top view as a 120-centimetre by 40-centimetre rectangle and the side view as a 40-centimetre by 80-centimetre rectangle.",
          "Choose the three dimensioned orthographic views as the main representation, and add an isometric sketch only as a supporting picture of the overall form."
        ],
        answer: "The carpenter needs consistent front 120 by 80, top 120 by 40 and side 40 by 80 centimetre orthographic views, with an optional isometric sketch for orientation.",
        check: "Each dimension appears in exactly two compatible views, because width links front to top, height links front to side, and depth links top to side."
      },
      {
        title: "Showing why one block view can be ambiguous.",
        steps: [
        "Object A has 2 cubes in the front row, while Object B has 2 cubes in diagonal front-left and back-right positions.",
        "Looking from the front hides depth, so both objects appear as 2 adjacent columns that are each 1 cube high.",
          "Looking from above distinguishes them because Object A has two adjacent squares in the front row while Object B has two squares in diagonal positions.",
          "Use both the front and top views to communicate which object is intended."
        ],
        answer: "The shared front view is insufficient, but the different top views distinguish Object A's adjacent front-row cubes from Object B's diagonal cubes.",
        check: "Reconstructing the cube positions from both views produces only the stated arrangement for each object."
      }
    ],
    slides: {
      learning: {
        body: [
          "We are learning to represent three-dimensional objects in two dimensions and evaluate each representation for a purpose.",
          "I can connect dimensions across views, identify hidden information and justify when more than one view is needed."
        ],
        teacherNotes: "Use a familiar box and physically change the viewing direction before naming the front, top and side views.",
        expectedResponse: "Students explain that each view shows two dimensions and hides the third dimension.",
        misconceptionResponse: "A front view does not by itself show depth or guarantee a unique object.",
        remediation: "Ask students to match width, height and depth labels across a real box and three simple rectangles.",
        visualIds: ["ac9m7sp01-model"]
      },
      refresher: {
        body: [
          "A front view shows width and height, a top view shows width and depth, and a side view shows depth and height.",
          "Orthographic views support measurement, isometric sketches support visualisation, nets support folding, and cross-sections reveal a slice.",
          "The best representation is the one that communicates the information required for the task."
        ],
        teacherNotes: "Reveal each representation purpose separately and ask which dimension or feature is unavailable in that view.",
        expectedResponse: "Students choose a representation by linking what it shows to the stated audience and purpose.",
        misconceptionResponse: "Visual realism is not the same as measurement accuracy.",
        remediation: "Compare a realistic perspective drawing with a plain dimensioned elevation of the same object.",
        visualIds: ["ac9m7sp01-model", "ac9m7sp01-application"]
      },
      guided: {
        title: "Guided example: choose views for a storage unit.",
        body: [
          "The unit measures 120 centimetres wide, 80 centimetres high and 40 centimetres deep.",
          "The front view is 120 by 80 centimetres because it shows width and height.",
          "The top view is 120 by 40 centimetres, and the side view is 40 by 80 centimetres.",
          "Use all three dimensioned orthographic views for construction and an isometric sketch only to support orientation."
        ],
        teacherNotes: "Trace the repeated dimensions between pairs of views so students see that all views describe one object.",
        expectedResponse: "The correct set is front 120 by 80, top 120 by 40 and side 40 by 80 centimetres.",
        misconceptionResponse: "The top view uses width and depth, not width and height.",
        remediation: "Place the real box below eye level and ask which two edges remain visible from above.",
        visualIds: ["ac9m7sp01-model"]
      },
      quickCheck: {
        body: [
          "A box is 30 centimetres wide, 20 centimetres high and 12 centimetres deep; state the dimensions of its top view.",
          "Tell a partner which dimension is hidden in the top view."
        ],
        teacherNotes: "Allow 30 seconds of silent reasoning, then ask partners to name both the visible dimensions and the hidden dimension.",
        expectedResponse: "The top view is 30 centimetres by 12 centimetres, and the hidden dimension is the 20-centimetre height.",
        misconceptionResponse: "A 30 by 20 rectangle is the front view because it combines width and height.",
        remediation: "Use the phrase 'looking down' and have the student point to width and depth on a box.",
        visualIds: []
      }
    },
    questions: [
      {tier: 1, prompt: "A parcel is 50 centimetres wide, 30 centimetres high and 20 centimetres deep; what dimensions appear in its front view?", answer: "The front view is a 50-centimetre by 30-centimetre rectangle.", summary: "A front view shows width and height while depth is hidden.", hint: "Select the width and height measurements and ignore the depth measurement."},
      {tier: 1, prompt: "Which representation should a packaging designer use to show the connected faces that will be cut out and folded into a cube?", answer: "The designer should use a net of the cube.", summary: "A net shows how flat faces are connected before they are folded into an object.", hint: "Think of the representation that can be printed flat and then folded."},
      {tier: 1, prompt: "State one limitation of using only an isometric sketch to manufacture a cabinet accurately.", answer: "An isometric sketch may show the cabinet's form but does not provide reliable exact lengths unless dimensions or a scale are supplied.", summary: "A three-dimensional-looking sketch supports visualisation but can distort apparent length.", hint: "Separate what the sketch helps you see from what a builder needs to measure."},
      {tier: 2, prompt: "A tank is 90 centimetres long, 50 centimetres wide and 40 centimetres high; give the dimensions of its top, front and side orthographic views.", answer: "The top view is 90 by 50 centimetres, the front view is 90 by 40 centimetres, and the side view is 50 by 40 centimetres.", summary: "Each orthographic view pairs the two dimensions perpendicular to the viewing direction.", hint: "Pair length with width for the top, length with height for the front, and width with height for the side."},
      {tier: 2, prompt: "Two one-layer cube arrangements have the same front view of three adjacent squares; explain why this does not prove that their three-dimensional arrangements are identical.", answer: "The cubes could occupy different depths while forming the same three visible columns, so a top view is needed to distinguish their positions.", summary: "A single view can hide depth and therefore represent more than one object.", hint: "Imagine moving one cube backwards without changing the column seen from the front."},
      {tier: 2, prompt: "A manufacturer must cut one piece of card that folds into a triangular prism; which representation is most useful, and what must it show?", answer: "A dimensioned net is most useful because it must show the two triangular faces, three rectangular faces and their connected edges at the correct sizes.", summary: "A net communicates every face and connection needed for cutting and folding.", hint: "Choose the flat representation that preserves faces and shared edges."},
      {tier: 2, prompt: "A solid circular cylinder is cut by a plane parallel to its circular base; what cross-sectional shape is produced, and what information does that representation omit?", answer: "The cross-section is a circle, and that single slice omits the cylinder's total height and most of its external form.", summary: "A cross-section reveals one specified slice rather than the entire object.", hint: "Picture the exposed face after a straight horizontal cut through the cylinder."},
      {tier: 3, prompt: "An architect gives a builder only a perspective sketch of a stepped platform with no scale or dimensions; evaluate the problem and recommend a sufficient representation set.", answer: "The sketch communicates the general form but cannot support exact construction, so the architect should add dimensioned front, top and side views, including hidden or stepped features where necessary.", summary: "A construction set must combine spatial clarity with consistent measurable dimensions.", hint: "List the information the builder cannot measure and choose views that reveal each missing dimension."},
      {tier: 3, prompt: "Design a minimal representation set for a two-level cube model whose rear cubes are hidden from the front, and justify why every selected view is necessary.", answer: "Use a front view to show column heights and a top view with height labels in each occupied position to show the footprint and hidden rear cubes; a side view is needed only if the labelled top view does not determine depth-height relationships uniquely.", summary: "A minimal set is sufficient only when its combined views determine both the footprint and every column height.", hint: "Ask whether another model could satisfy all your chosen views, and add a view or label if ambiguity remains."}
    ]
  },

  AC9M7SP02: {
    learningIntention: "We are learning to classify triangles, quadrilaterals and other polygons from defining side and angle properties.",
    successCriteria: [
      "I can use inclusive definitions to place a shape in every class it satisfies.",
      "I can classify triangles by both side properties and angle properties.",
      "I can justify a classification with necessary properties instead of relying on appearance."
    ],
    deepDive: [
      "A polygon belongs to a class because it satisfies the class's defining properties, not because it resembles a familiar prototype. Rotating, enlarging or reflecting a shape does not change its side lengths, angle measures, parallel relationships or class membership.",
      "Inclusive definitions create a hierarchy of quadrilaterals. Every square is a rectangle because it has four right angles, every square is a rhombus because it has four equal sides, and both rectangles and rhombuses are parallelograms because they have two pairs of parallel opposite sides.",
      "Triangle classifications can overlap because side properties and angle properties answer different questions. A triangle with two equal sides and one right angle is both isosceles and right-angled, while a regular polygon must have all sides equal and all interior angles equal."
    ],
    vocabulary: [
      {term: "defining property", definition: "A defining property is a condition that every member of a geometric class must satisfy."},
      {term: "inclusive definition", definition: "An inclusive definition allows a more specific class to remain inside every broader class whose properties it satisfies."},
      {term: "regular polygon", definition: "A regular polygon has all sides equal in length and all interior angles equal in measure."},
      {term: "concave polygon", definition: "A concave polygon has at least one interior angle greater than 180 degrees."}
    ],
    misconceptions: [
      {idea: "A square is not a rectangle because rectangles are longer than they are wide.", correction: "A rectangle is defined by four right angles, so a square is a special rectangle."},
      {idea: "Turning a diamond-shaped quadrilateral changes whether it is a square or rhombus.", correction: "Orientation is not a defining property, so classification depends on marked sides, angles and parallel lines."},
      {idea: "An isosceles triangle must have exactly two equal sides.", correction: "Under an inclusive definition, at least two equal sides are required, so an equilateral triangle also satisfies the isosceles condition."}
    ],
    workedExamples: [
      {
        title: "Classifying a square through an inclusive hierarchy.",
        steps: [
          "Begin with a quadrilateral that has 4 equal sides and 4 right angles of 90 degrees.",
          "The 4 right angles satisfy the definition of a rectangle, while the 4 equal sides satisfy the definition of a rhombus.",
          "Both a rectangle and a rhombus have two pairs of parallel opposite sides, so the shape is also a parallelogram.",
          "List every valid class from most specific to broadest: square, rectangle, rhombus, parallelogram and quadrilateral."
        ],
        answer: "The shape is simultaneously a square, rectangle, rhombus, parallelogram and quadrilateral.",
        check: "Testing the defining properties of each listed class confirms every inclusion without using the shape's orientation or apparent proportions."
      },
      {
        title: "Classifying a triangle by sides and angles.",
        steps: [
          "A triangle has angle measures 45 degrees, 45 degrees and 90 degrees, and the sides opposite the two 45-degree angles are equal.",
          "The two equal sides satisfy the isosceles definition.",
          "The 90-degree angle satisfies the right-angled triangle definition.",
          "The angle sum is 45 plus 45 plus 90, which equals 180 degrees and confirms that the measurements are possible for a triangle."
        ],
        answer: "The triangle is both isosceles and right-angled.",
        check: "The classification is supported independently by the equal-side condition and the one-right-angle condition."
      }
    ],
    slides: {
      learning: {
        body: [
          "We are learning to classify polygons from defining side and angle properties.",
          "I can use an inclusive hierarchy, give every valid class and justify each class with a required property."
        ],
        teacherNotes: "Display several rotated and non-prototypical quadrilaterals so students attend to markings rather than appearance.",
        expectedResponse: "Students name a class and cite the side, angle or parallel-line property that proves membership.",
        misconceptionResponse: "A change in orientation does not change any defining geometric property.",
        remediation: "Cover the shape outline and reveal only its property markings before asking for a classification.",
        visualIds: ["ac9m7sp02-model"]
      },
      refresher: {
        body: [
          "A square is inside both the rectangle and rhombus classes, and all three are inside the parallelogram class.",
          "Triangles can receive one side-based name and one angle-based name at the same time.",
          "A regular polygon requires equal sides and equal angles, while one condition alone is insufficient."
        ],
        teacherNotes: "Trace inclusion from the specific square class outward and use the phrase 'all squares are, but not all rectangles are.'",
        expectedResponse: "Students explain inclusion as satisfying every required property of the broader class.",
        misconceptionResponse: "A broader class does not have to satisfy the extra properties of its subclasses.",
        remediation: "Compare the definitions line by line and circle only the conditions required by the broader class.",
        visualIds: ["ac9m7sp02-model", "ac9m7sp02-application"]
      },
      guided: {
        title: "Guided example: classify a square inclusively.",
        body: [
          "The shape has four equal sides and four right angles.",
          "Four right angles make it a rectangle, and four equal sides make it a rhombus.",
          "Its opposite sides are parallel, so it is also a parallelogram.",
          "The complete classification is square, rectangle, rhombus, parallelogram and quadrilateral."
        ],
        teacherNotes: "Point to each row of the hierarchy as its defining property is verified.",
        expectedResponse: "The shape belongs to all five classes because it satisfies every defining condition for each class.",
        misconceptionResponse: "Being a square does not exclude the shape from broader classes such as rectangle.",
        remediation: "Ask whether four right angles stop being right angles when all four sides are also equal.",
        visualIds: ["ac9m7sp02-model"]
      },
      quickCheck: {
        body: [
          "A quadrilateral has four equal sides and four right angles; name every class in the displayed hierarchy that contains it.",
          "Tell a partner one defining property that proves each inclusion."
        ],
        teacherNotes: "Listen for the complete inclusive list rather than accepting only the most specific name.",
        expectedResponse: "It is a square, rectangle, rhombus, parallelogram and quadrilateral.",
        misconceptionResponse: "The answer 'square only' ignores the inclusive definitions of the broader classes.",
        remediation: "Move outward from square in the hierarchy and test the definition at each level.",
        visualIds: []
      }
    },
    questions: [
      {tier: 1, prompt: "A quadrilateral has four right angles, but its adjacent sides have different lengths; which most specific class is guaranteed?", answer: "The quadrilateral is a rectangle.", summary: "Four right angles are the defining property of a rectangle, while equal adjacent sides are not required.", hint: "Classify from the angle information before considering the side lengths."},
      {tier: 1, prompt: "A triangle has side lengths 6 centimetres, 6 centimetres and 9 centimetres; how is it classified by its sides?", answer: "The triangle is isosceles because it has at least two equal sides.", summary: "An isosceles triangle is identified by two or more equal side lengths.", hint: "Compare the three given lengths and count how many are equal."},
      {tier: 1, prompt: "State the two conditions that make a polygon regular.", answer: "A regular polygon has all sides equal and all interior angles equal.", summary: "Regularity requires equality of both sides and angles.", hint: "Check one condition about side lengths and one condition about angle measures."},
      {tier: 2, prompt: "A quadrilateral has four equal sides but no right angles; list every class that is guaranteed under the inclusive hierarchy.", answer: "The shape is a rhombus, parallelogram and quadrilateral, but it is not guaranteed to be a rectangle or square.", summary: "Four equal sides guarantee a rhombus, whose opposite sides are parallel, without guaranteeing right angles.", hint: "Move from the equal-side definition to broader classes and do not invent right angles."},
      {tier: 2, prompt: "A triangle has angles 30 degrees, 60 degrees and 90 degrees and three different side lengths; classify it by angles and by sides.", answer: "The triangle is right-angled and scalene.", summary: "One 90-degree angle makes it right-angled, and three different side lengths make it scalene.", hint: "Give one name from the angle information and one name from the side information."},
      {tier: 2, prompt: "A student says that a rotated square is a rhombus but no longer a rectangle; explain and correct the error.", answer: "Rotation preserves the four right angles and four equal sides, so the shape remains a square, rectangle and rhombus.", summary: "Orientation is not a defining property and rigid rotation preserves lengths and angles.", hint: "Check whether turning the shape changes any side length or angle measure."},
      {tier: 2, prompt: "A pentagon has five equal sides but two of its interior angles differ; is it regular, and why?", answer: "It is not regular because a regular polygon requires all interior angles as well as all sides to be equal.", summary: "Equal side lengths alone are insufficient to prove that a polygon is regular.", hint: "Test both parts of the definition of a regular polygon."},
      {tier: 3, prompt: "A quadrilateral has two pairs of parallel opposite sides and one right angle; prove the most specific class that is guaranteed.", answer: "The shape is a rectangle because parallel opposite sides make adjacent interior angles supplementary, so the right angle forces all four angles to be 90 degrees; equal sides are not given, so a square is not guaranteed.", summary: "Parallelogram angle relationships extend one right angle to four right angles.", hint: "Use the consequences of opposite sides being parallel before deciding whether equal side lengths are known."},
      {tier: 3, prompt: "Create the shortest yes-or-no decision sequence that distinguishes a general parallelogram, rectangle, rhombus and square once two pairs of opposite sides are known to be parallel.", answer: "Ask whether all angles are right angles and whether all sides are equal; no-no gives a general parallelogram, yes-no gives a rectangle, no-yes gives a rhombus, and yes-yes gives a square.", summary: "Two independent defining-property questions separate the four possible subclasses efficiently.", hint: "Use one question about angles and one question about side lengths, then consider all four answer combinations."}
    ]
  },

  AC9M7SP03: {
    learningIntention: "We are learning to describe translations, reflections and rotations of point sets using coordinate rules in the Cartesian plane.",
    successCriteria: [
      "I can apply one transformation rule to every vertex of a shape.",
      "I can specify the vector, mirror line or centre, angle and direction needed to define a transformation.",
      "I can compare an object with its image and identify preserved lengths, angles and area."
    ],
    deepDive: [
      "A coordinate transformation maps every point of an object to an image according to one consistent rule. A translation adds the same horizontal and vertical changes to every point, a reflection reverses position across a stated mirror line, and a rotation turns every point through the same angle around a stated centre.",
      "Common origin-centred rules include reflection in the y-axis, which maps (x, y) to (−x, y), reflection in the x-axis, which maps (x, y) to (x, −y), a 90-degree anticlockwise rotation, which maps (x, y) to (−y, x), and a 180-degree rotation, which maps (x, y) to (−x, −y). The rule must be applied to every vertex, not just one convenient point.",
      "Translations, reflections and rotations are rigid transformations, so corresponding lengths, angle measures and area remain invariant and the image is congruent to the original. A reflection reverses orientation, while a translation and rotation preserve cyclic orientation; these properties provide checks on calculated coordinates."
    ],
    vocabulary: [
      {term: "image", definition: "An image is the transformed result after a rule has been applied to an original point or shape."},
      {term: "invariant", definition: "An invariant is a property, such as length or angle measure, that remains unchanged by a transformation."},
      {term: "translation vector", definition: "A translation vector states the horizontal and vertical movement applied to every point."},
      {term: "centre of rotation", definition: "The centre of rotation is the fixed point around which every point turns through the stated angle and direction."}
    ],
    misconceptions: [
      {idea: "Transforming one vertex is enough to transform the entire polygon.", correction: "Every vertex must be mapped by the same rule before the image can be drawn."},
      {idea: "The instruction 'rotate 90 degrees' completely determines an image.", correction: "A rotation also requires a centre and direction unless they are already fixed by convention or context."},
      {idea: "Reflecting in the y-axis changes the y-coordinate.", correction: "Reflection in the y-axis changes the sign of x while leaving y unchanged."}
    ],
    workedExamples: [
      {
        title: "Reflecting a triangle in the y-axis.",
        steps: [
          "Triangle ABC has vertices A(1, 1), B(4, 1) and C(2, 3), and the mirror line is the y-axis.",
          "Apply (x, y) to (−x, y) to A, giving A′(−1, 1), and to B, giving B′(−4, 1).",
          "Apply the same rule to C, giving C′(−2, 3), and join the image vertices in corresponding order.",
          "Check that each point and its image are the same horizontal distance from the y-axis and that corresponding side lengths agree."
        ],
        answer: "The reflected triangle has vertices A′(−1, 1), B′(−4, 1) and C′(−2, 3).",
        check: "The x-coordinates have opposite signs, the y-coordinates are unchanged, and the reflected triangle is congruent with reversed orientation."
      },
      {
        title: "Rotating a right triangle 90 degrees anticlockwise.",
        steps: [
          "Triangle PQR has vertices P(2, −1), Q(4, −1) and R(4, 2), and it is rotated 90 degrees anticlockwise about the origin.",
          "Apply (x, y) to (−y, x) to P, giving P′(1, 2).",
          "Apply the rule to Q and R, giving Q′(1, 4) and R′(−2, 4).",
          "Compare PQ, which is 2 units, with P′Q′, which is also 2 units, and compare QR, which is 3 units, with Q′R′, which is also 3 units."
        ],
        answer: "The rotated triangle has vertices P′(1, 2), Q′(1, 4) and R′(−2, 4).",
        check: "The image preserves the 2-unit and 3-unit perpendicular sides and therefore preserves shape, area and angle measures."
      }
    ],
    slides: {
      learning: {
        body: [
          "We are learning to transform sets of coordinates by translation, reflection and rotation.",
          "I can state the complete transformation, map every point and use invariants to check the image."
        ],
        teacherNotes: "Emphasise that a transformation is a rule for all points, not a drawing move applied approximately by eye.",
        expectedResponse: "Students state a complete rule and produce one image coordinate for every original coordinate.",
        misconceptionResponse: "A rotation without its centre and direction is not fully specified.",
        remediation: "Use one point at a time and mark its equal distance from the mirror line or centre before mapping the whole shape.",
        visualIds: ["ac9m7sp03-model"]
      },
      refresher: {
        body: [
          "Translation by (a, b) maps (x, y) to (x + a, y + b).",
          "Reflection in the x-axis maps (x, y) to (x, −y), while reflection in the y-axis maps (x, y) to (−x, y).",
          "A 90-degree anticlockwise rotation about the origin maps (x, y) to (−y, x), and a 180-degree rotation maps (x, y) to (−x, −y)."
        ],
        teacherNotes: "Pair each symbolic rule with a verbal description of what changes and what stays fixed.",
        expectedResponse: "Students choose a rule that matches the named transformation and apply it consistently.",
        misconceptionResponse: "Swapping coordinates without controlling signs does not represent every rotation or reflection.",
        remediation: "Test the rule on (1, 0) and use the expected image direction to diagnose the sign error.",
        visualIds: ["ac9m7sp03-model", "ac9m7sp03-application"]
      },
      guided: {
        title: "Guided example: reflect triangle ABC in the y-axis.",
        body: [
          "Start with A(1, 1), B(4, 1) and C(2, 3).",
          "Use the rule (x, y) to (−x, y), so only the sign of each x-coordinate changes.",
          "The image coordinates are A′(−1, 1), B′(−4, 1) and C′(−2, 3).",
          "Check that corresponding points are equally far from the y-axis and corresponding side lengths are equal."
        ],
        teacherNotes: "Map and label every vertex before joining them, then compare orientation and one side length.",
        expectedResponse: "The reflected vertices are A′(−1, 1), B′(−4, 1) and C′(−2, 3).",
        misconceptionResponse: "Changing the y-coordinate would reflect the triangle in the x-axis instead.",
        remediation: "Highlight the y-axis as the fixed mirror line and count equal horizontal distances on both sides.",
        visualIds: ["ac9m7sp03-model"]
      },
      quickCheck: {
        body: [
          "Reflect the point (3, −2) in the y-axis and state the coordinate rule you used.",
          "Tell a partner which coordinate changes and which coordinate remains invariant."
        ],
        teacherNotes: "Require both the coordinate and the rule so a correct guess does not hide a misconception.",
        expectedResponse: "The image is (−3, −2) because (x, y) maps to (−x, y).",
        misconceptionResponse: "The answer (3, 2) is a reflection in the x-axis, not the y-axis.",
        remediation: "Count the point's horizontal distance from the y-axis and place its image the same distance on the other side.",
        visualIds: []
      }
    },
    questions: [
      {tier: 1, prompt: "Translate the point (−2, 5) by the vector (4, −3).", answer: "The translated point is (2, 2).", summary: "Adding 4 to x and subtracting 3 from y maps (−2, 5) to (2, 2).", hint: "Add the vector's first component to x and its second component to y."},
      {tier: 1, prompt: "Reflect the point (−6, 4) in the x-axis.", answer: "The reflected point is (−6, −4).", summary: "Reflection in the x-axis keeps x fixed and changes the sign of y.", hint: "Use the rule (x, y) to (x, −y)."},
      {tier: 1, prompt: "Rotate the point (3, −1) through 180 degrees about the origin.", answer: "The rotated point is (−3, 1).", summary: "A 180-degree origin rotation changes the sign of both coordinates.", hint: "Use the rule (x, y) to (−x, −y)."},
      {tier: 2, prompt: "Triangle ABC has A(0, 1), B(3, 1) and C(1, 4); translate every vertex by (−2, 3).", answer: "The image vertices are A′(−2, 4), B′(1, 4) and C′(−1, 7).", summary: "The same horizontal and vertical changes must be added to every vertex.", hint: "Apply x minus 2 and y plus 3 separately to A, B and C."},
      {tier: 2, prompt: "Triangle PQR has P(1, 2), Q(5, 2) and R(3, 4); reflect it in the y-axis.", answer: "The image vertices are P′(−1, 2), Q′(−5, 2) and R′(−3, 4).", summary: "Reflection in the y-axis reverses every x-coordinate and preserves every y-coordinate.", hint: "Change the sign of x for all three points and leave y unchanged."},
      {tier: 2, prompt: "A point moves from (−1, 4) to (5, 1) under a translation; determine the translation vector.", answer: "The translation vector is (6, −3).", summary: "The coordinate changes are 5 minus −1 equals 6 horizontally and 1 minus 4 equals −3 vertically.", hint: "Subtract each original coordinate from its corresponding image coordinate."},
      {tier: 2, prompt: "A student rotates only one vertex of a quadrilateral and then redraws the other three by eye; explain the error and give the correct method.", answer: "The student has not applied one transformation consistently, so every original vertex must be mapped by the stated coordinate rule before the image is joined.", summary: "A transformation of a point set requires the same exact rule at every point.", hint: "Write an image coordinate beside each original vertex before drawing any image edges."},
      {tier: 3, prompt: "Rotate triangle A(1, 1), B(4, 1), C(2, 3) by 90 degrees anticlockwise about the origin and state two invariant properties.", answer: "The image is A′(−1, 1), B′(−1, 4), C′(−3, 2), and its side lengths, angle measures and area are invariant, so any two of these are valid.", summary: "The rule (x, y) to (−y, x) produces a congruent image under a rigid rotation.", hint: "Map all three coordinates first, then name properties that rigid motion cannot change."},
      {tier: 3, prompt: "Point P(2, −3) is translated by (4, 1) and then reflected in the x-axis; find the final coordinate and explain why reversing the order gives a different result.", answer: "Translation gives (6, −2) and reflection gives (6, 2), while reflecting first gives (2, 3) and then translating gives (6, 4), so the order changes the final y-coordinate.", summary: "A sequence of transformations must be applied in the stated order because the second rule acts on the first image.", hint: "Write the intermediate coordinate for each order before comparing the final points."}
    ]
  },

  AC9M7SP04: {
    learningIntention: "We are learning to design precise spatial algorithms that use ordered steps, decisions, repetition and stopping conditions.",
    successCriteria: [
      "I can state the input, transformation details and order of steps in a reproducible spatial algorithm.",
      "I can trace iterations and decision branches to predict an algorithm's geometric output.",
      "I can identify ambiguity or a faulty stopping rule and repair the algorithm."
    ],
    deepDive: [
      "A spatial algorithm is a finite set of precise instructions for constructing, transforming or navigating a geometric object. Its input and coordinate system must be stated, and a translation needs a vector, a reflection needs a mirror line, and a rotation needs a centre, angle and direction.",
      "Iteration repeats a defined block of steps, but the algorithm must say whether each new transformation acts on the original object or the latest image. A counter or geometric condition controls repetition, and a stopping condition prevents an endless loop or an unwanted duplicate image.",
      "Decision branches make the next action depend on a test such as whether a point lies inside a boundary. A reliable algorithm gives an action for every possible result, can be traced manually on a small input, and produces the same output whenever the same input and conditions are used."
    ],
    vocabulary: [
      {term: "algorithm", definition: "An algorithm is a finite, ordered set of instructions that produces a reproducible result."},
      {term: "iteration", definition: "An iteration is one repetition of a specified group of steps."},
      {term: "decision branch", definition: "A decision branch selects the next step according to whether a stated condition is true or false."},
      {term: "stopping condition", definition: "A stopping condition is the test that ends a repeated process at the required output."}
    ],
    misconceptions: [
      {idea: "The instruction 'rotate the triangle' is precise enough for a computer or another person to follow.", correction: "A rotation must specify the centre, angle, direction and which image is rotated."},
      {idea: "A repeated geometric process will stop when the design looks finished.", correction: "A reproducible algorithm needs a measurable stopping condition such as an image count."},
      {idea: "Testing only the first iteration proves that an algorithm works for all later iterations.", correction: "Later values can trigger a different branch or reveal a faulty loop, so boundary and stopping cases must also be traced."}
    ],
    visuals: [
      {
        id: "ac9m7sp04-model",
        type: "legacyHtml",
        html: "<div class=\"y7-board\"><div class=\"y7-sequence\"><div><i>1</i><strong>Input</strong><span>Record the original triangle and set image count to 1.</span></div><div><i>2</i><strong>Decision</strong><span>If image count equals 6, output the design and stop.</span></div><div><i>3</i><strong>Transform</strong><span>Otherwise rotate the latest triangle 60 degrees anticlockwise about the origin.</span></div><div><i>4</i><strong>Repeat</strong><span>Record the image, add 1 to the count and return to the decision.</span></div></div></div>",
        alt: "A four-step sixfold-pattern algorithm records the original triangle, tests whether six images exist, rotates the latest image 60 degrees anticlockwise about the origin when needed, and stops after six images."
      },
      {
        id: "ac9m7sp04-application",
        type: "legacyHtml",
        html: "<div class=\"y7-board\"><div class=\"y7-table\" style=\"grid-template-columns:repeat(2,minmax(0,1fr))\"><span>Ambiguous instruction</span><span>Precise repair</span><span>Move the shape over.</span><span>Translate every vertex by the vector (4, −2).</span><span>Repeat until it looks complete.</span><span>Repeat until exactly 8 images have been recorded.</span><span>If it leaves the grid, do something.</span><span>If any vertex leaves the grid, stop; otherwise record the image.</span></div></div>",
        alt: "A comparison table replaces ambiguous spatial instructions with precise translation vectors, image counts and complete boundary decisions."
      }
    ],
    workedExamples: [
      {
        title: "Writing a finite algorithm for a sixfold rotation design.",
        steps: [
          "Input one triangle, record it as the first image, and set image_count to 1.",
          "Test whether image_count equals 6; if it does, output the design and stop.",
          "If image_count is less than 6, rotate the latest image 60 degrees anticlockwise about the origin, record the new image and add 1 to image_count.",
          "Return to the decision, producing images at 0, 60, 120, 180, 240 and 300 degrees without adding a duplicate at 360 degrees."
        ],
        answer: "The algorithm records exactly six equally spaced images and stops when image_count reaches 6.",
        check: "Tracing the counter gives five rotations after the original, and one further rotation would reproduce the original position, so the stopping condition is correct."
      },
      {
        title: "Tracing and debugging a repeated translation.",
        steps: [
          "Start with triangle A(0, 0), B(2, 0), C(1, 2), record it, and set triangle_count to 1.",
          "While triangle_count is less than 4, translate every vertex of the latest image by (3, 0), record the image and add 1 to triangle_count.",
          "The next A-vertices are (3, 0), (6, 0) and (9, 0), with the B- and C-vertices changing by the same vector each time.",
          "Stop at triangle_count equals 4, because using 'repeat until the row looks long enough' would not give a reproducible output."
        ],
        answer: "The output contains four congruent triangles whose A-vertices are (0, 0), (3, 0), (6, 0) and (9, 0).",
        check: "Every corresponding coordinate differs by the fixed vector (3, 0), and the counter ends at exactly four recorded triangles."
      }
    ],
    slides: {
      learning: {
        body: [
          "We are learning to design and debug spatial algorithms with exact transformations, decisions and stopping conditions.",
          "I can trace the output, explain every branch and revise an ambiguous instruction so another person or digital tool can reproduce it."
        ],
        teacherNotes: "Ask students to act out one vague and one precise movement instruction before connecting precision to coordinates and digital tools.",
        expectedResponse: "Students include complete transformation details, a stated repeat target and an action for each decision outcome.",
        misconceptionResponse: "An instruction that depends on what 'looks complete' is not reproducible.",
        remediation: "Use the sentence frame 'If the condition is true, do this; otherwise, do that.'",
        visualIds: ["ac9m7sp04-model"]
      },
      refresher: {
        body: [
          "State the input and coordinate system before giving spatial instructions.",
          "Specify a vector for translation, a mirror line for reflection, or a centre, angle and direction for rotation.",
          "A loop needs a precise repeated action and stopping condition, while a decision needs complete true and false branches."
        ],
        teacherNotes: "Have students identify the missing parameter in each ambiguous instruction before revealing the precise repair.",
        expectedResponse: "Students can explain why the repaired instructions produce one predictable geometric output.",
        misconceptionResponse: "Digital output does not validate an algorithm unless its inputs, rules and boundary cases have been checked.",
        remediation: "Trace one point through each instruction and record its coordinates after every step.",
        visualIds: ["ac9m7sp04-application"]
      },
      guided: {
        title: "Guided example: generate six images without duplicating the original.",
        body: [
          "Record the original triangle and set image_count to 1.",
          "If image_count equals 6, output the design and stop.",
          "Otherwise, rotate the latest image 60 degrees anticlockwise about the origin, record it and add 1 to image_count.",
          "The recorded orientations are 0, 60, 120, 180, 240 and 300 degrees, so a duplicate 360-degree image is not added."
        ],
        teacherNotes: "Track the counter and angle in two columns and test the decision before performing each rotation.",
        expectedResponse: "The algorithm produces six images and stops when image_count reaches 6 after five rotations.",
        misconceptionResponse: "Completing six rotations after recording the original would add the original position again at 360 degrees.",
        remediation: "Write the original as image 1 at 0 degrees, then enumerate each new image before deciding how many rotations are required.",
        visualIds: ["ac9m7sp04-model"]
      },
      quickCheck: {
        body: [
          "An algorithm says, 'Reflect the triangle and repeat until the picture looks complete'; name two details that must be added to make the instruction reproducible.",
          "Tell a partner how one of your additions removes ambiguity."
        ],
        teacherNotes: "Accept any two essential omissions if the student explains their role, but listen especially for mirror line and stopping condition.",
        expectedResponse: "The algorithm must state the mirror line and a measurable stopping condition, and it should also identify whether each reflection uses the original or latest image.",
        misconceptionResponse: "A visual judgement such as 'looks complete' cannot serve as a consistent stopping condition.",
        remediation: "Prompt with 'reflect in which line?' and 'stop after what exact count or condition?'",
        visualIds: []
      }
    },
    questions: [
      {tier: 1, prompt: "State the missing information in the instruction 'Rotate point P by 90 degrees.'", answer: "The instruction must state the centre of rotation and whether the turn is clockwise or anticlockwise.", summary: "An angle alone does not uniquely define a rotation.", hint: "Ask where the point turns around and in which direction it moves."},
      {tier: 1, prompt: "A loop records the original square as image 1 and adds one translated image each time until image_count equals 5; how many translations are performed?", answer: "The loop performs 4 translations.", summary: "The original is already counted, so four new images are needed to reach a total of five.", hint: "Count the additional images needed after image 1."},
      {tier: 1, prompt: "Explain the purpose of a stopping condition in a spatial algorithm.", answer: "A stopping condition ends repetition when the required geometric output has been produced.", summary: "A measurable stopping rule makes the algorithm finite and reproducible.", hint: "Consider what would happen if a loop had no instruction telling it when to end."},
      {tier: 2, prompt: "Start at point (1, 2) and repeat the translation (3, −1) twice; what are the coordinates after each iteration?", answer: "After the first iteration the point is (4, 1), and after the second iteration it is (7, 0).", summary: "Each iteration adds the same vector to the latest image coordinate.", hint: "Use the first image, not the original point, as the input to the second iteration."},
      {tier: 2, prompt: "Repair the instruction 'Move every vertex to the right and down' so it defines one exact coordinate transformation.", answer: "One valid repair is 'Translate every vertex by the vector (4, −2), so add 4 to x and subtract 2 from y.'", summary: "A numerical vector replaces vague direction words with a reproducible movement.", hint: "Choose and state an exact horizontal change and an exact vertical change."},
      {tier: 2, prompt: "An algorithm tests whether any transformed vertex has x greater than 10; write complete actions for both outcomes so the design remains inside the grid.", answer: "If any vertex has x greater than 10, discard that image and stop; otherwise, record the image and continue to the next iteration.", summary: "A complete decision specifies distinct actions for both the true and false results.", hint: "Write one instruction for when the boundary is crossed and one for when it is not."},
      {tier: 2, prompt: "An algorithm reflects the latest image in the y-axis repeatedly and is meant to make two distinct images; identify an appropriate stopping condition.", answer: "Record the original, reflect it once in the y-axis, record the image, and stop when image_count equals 2.", summary: "A second reflection would return to the original position and create a duplicate.", hint: "Trace the effect of applying the same reflection twice."},
      {tier: 3, prompt: "Trace this algorithm: begin with P(1, 0), set count to 0, and while count is less than 3 rotate the latest point 90 degrees anticlockwise about the origin and add 1 to count; list every new coordinate.", answer: "The three new coordinates are (0, 1), (−1, 0) and (0, −1), after which count equals 3 and the loop stops.", summary: "Repeated 90-degree anticlockwise rotations apply (x, y) to (−y, x) to the latest point three times.", hint: "Record the coordinate and counter value after each rotation before testing the loop again."},
      {tier: 3, prompt: "Design an algorithm that creates a row of four congruent triangles from A(0, 0), B(2, 0), C(1, 2) using translation by (3, 0), and include an explicit decision and stopping rule.", answer: "Record the original and set count to 1; if count equals 4, output and stop, otherwise translate every vertex of the latest triangle by (3, 0), record it, add 1 to count and return to the decision, producing A-vertices at (0, 0), (3, 0), (6, 0) and (9, 0).", summary: "The algorithm combines a fixed transformation with a counter-controlled loop that outputs exactly four triangles.", hint: "Count the original as the first triangle and test the count before adding each new image."}
    ]
  },

  AC9M7ST01: {
    learningIntention: "We are learning to acquire discrete and continuous numerical data and interpret measures of centre and spread.",
    successCriteria: [
      "I can distinguish a count from a measurement and record numerical data with suitable units and precision.",
      "I can calculate mean, median, mode and range accurately from an ordered data set.",
      "I can select and interpret summaries by considering outliers, variation and the data-collection context."
    ],
    deepDive: [
      "Discrete numerical data come from counts with separated possible values, such as the number of messages received, while continuous numerical data come from measurements on a scale, such as reaction time or mass. Rounding a measurement for recording does not change the underlying variable from continuous to discrete.",
      "The mean is the sum divided by the number of values and uses every observation, the median is the middle of the ordered data, and the mode is the most frequent value. The range is maximum minus minimum, so it describes total spread rather than centre.",
      "No single summary tells the whole story. Extreme values can move the mean and range substantially while leaving the median almost unchanged, and data quality depends on consistent units, sensible precision, credible sources and checks for missing, duplicated or impossible values before digital calculations are interpreted."
    ],
    vocabulary: [
      {term: "discrete numerical variable", definition: "A discrete numerical variable is produced by counting and has separated possible numerical values."},
      {term: "continuous numerical variable", definition: "A continuous numerical variable is measured and can take values anywhere within an interval."},
      {term: "median", definition: "The median is the middle value of ordered data, or the mean of the two middle values when the count is even."},
      {term: "range", definition: "The range is the maximum value minus the minimum value and measures the total spread."}
    ],
    misconceptions: [
      {idea: "The median can be found from the middle position before the data are ordered.", correction: "The values must be arranged in numerical order before the middle position is identified."},
      {idea: "A measurement recorded to the nearest whole unit becomes a discrete variable.", correction: "The underlying quantity remains continuous even when its recorded value is rounded."},
      {idea: "The mean is always the best description of a typical value.", correction: "An extreme value can distort the mean, so the median and the distribution must also be considered."
      }
    ],
    workedExamples: [
      {
        title: "Calculating centre and spread for five observations.",
        steps: [
          "Use the ordered data set 4, 5, 5, 7 and 9, whose sum is 30 and whose count is 5.",
          "Calculate the mean as 30 divided by 5, which equals 6.",
          "Identify the middle value 5 as the median and the repeated value 5 as the mode.",
          "Calculate the range as maximum 9 minus minimum 4, which equals 5."
        ],
        answer: "The data have mean 6, median 5, mode 5 and range 5.",
        check: "Multiplying the mean 6 by the count 5 returns the total 30, and the ordered positions and endpoints confirm the other summaries."
      },
      {
        title: "Judging the effect of an extreme reaction time.",
        steps: [
          "Five reaction times in seconds are 0.42, 0.45, 0.47, 0.49 and 1.20, and they total 3.03 seconds.",
          "Calculate the mean as 3.03 divided by 5, which equals 0.606 seconds, and identify the median as 0.47 seconds.",
          "Calculate the range as 1.20 minus 0.42, which equals 0.78 seconds, and recognise 1.20 seconds as an extreme value relative to the other four.",
          "Use the median to describe the typical recorded reaction time and report the extreme value and range rather than hiding the variation."
        ],
        answer: "The median of 0.47 seconds is more representative of the main cluster than the mean of 0.606 seconds, while the 0.78-second range reveals the extreme result.",
        check: "Removing the 1.20-second value changes the mean to 0.4575 seconds but changes the median of the remaining four values only to 0.46 seconds."
      }
    ],
    slides: {
      learning: {
        body: [
          "We are learning to collect numerical data and interpret centre and spread.",
          "I can identify variable type, calculate mean, median, mode and range, and explain which summaries are meaningful in context."
        ],
        teacherNotes: "Begin with examples of counts and measurements from the classroom and require units for every continuous variable.",
        expectedResponse: "Students distinguish counting from measuring and interpret each statistic as a feature of the data rather than a detached calculation.",
        misconceptionResponse: "Rounding a measured time to whole seconds does not turn time into a count.",
        remediation: "Ask whether a more precise measuring instrument could record values between the displayed numbers.",
        visualIds: ["ac9m7st01-application"]
      },
      refresher: {
        body: [
          "Mean equals the sum divided by the number of values, and median requires ordered data.",
          "Mode identifies the most frequent value, while range equals maximum minus minimum.",
          "An outlier can affect mean and range much more than median, so interpret several distribution features together."
        ],
        teacherNotes: "Link each statistic to a different question about the same data set before performing calculations.",
        expectedResponse: "Students explain that measures of centre describe location while range describes spread.",
        misconceptionResponse: "Range is not a typical value because it is a difference between endpoints.",
        remediation: "Mark the centre values and endpoint values in different positions on an ordered number line.",
        visualIds: ["ac9m7st01-model", "ac9m7st01-application"]
      },
      guided: {
        title: "Guided example: summarise 4, 5, 5, 7 and 9.",
        body: [
          "The ordered data total 30 across 5 observations.",
          "The mean is 30 divided by 5, which equals 6.",
          "The median is the middle value 5, and the mode is the repeated value 5.",
          "The range is 9 minus 4, which equals 5."
        ],
        teacherNotes: "Keep the ordered data visible and point to the values used in each calculation.",
        expectedResponse: "The mean is 6, the median is 5, the mode is 5 and the range is 5.",
        misconceptionResponse: "The range is 5 rather than 9 because spread is maximum minus minimum.",
        remediation: "Write the range calculation explicitly beneath the two endpoint values.",
        visualIds: ["ac9m7st01-model"]
      },
      quickCheck: {
        body: [
          "For the data 6, 7, 7, 8 and 12, calculate the mean, median, mode and range.",
          "Tell a partner which statistic is most affected by the value 12."
        ],
        teacherNotes: "Look for an ordered-data method and listen for a distinction between the effect on mean or range and the stable median.",
        expectedResponse: "The mean is 8, the median is 7, the mode is 7 and the range is 6; the value 12 has a strong effect on the mean and range.",
        misconceptionResponse: "The median is 7 because it is the third ordered value, not the arithmetic average of all five values.",
        remediation: "Circle the middle position for the median and separately add all values for the mean.",
        visualIds: []
      }
    },
    questions: [
      {tier: 1, prompt: "Classify the number of siblings each student has as a discrete or continuous numerical variable.", answer: "The number of siblings is a discrete numerical variable.", summary: "Siblings are counted in separated whole-number outcomes.", hint: "Decide whether the value is counted or measured on a scale."},
      {tier: 1, prompt: "Classify each student's arm span measured in centimetres as a discrete or continuous numerical variable.", answer: "Arm span is a continuous numerical variable, even if it is rounded to the nearest centimetre.", summary: "Length is measured and can take values between recorded whole centimetres.", hint: "Ask whether a more precise instrument could produce a value such as 151.4 centimetres."},
      {tier: 1, prompt: "Find the median and range of 3, 8, 5, 11 and 8.", answer: "After ordering the data as 3, 5, 8, 8, 11, the median is 8 and the range is 8.", summary: "The middle ordered value gives the median and 11 minus 3 gives the range.", hint: "Order the five values before selecting the middle and subtracting the endpoints."},
      {tier: 2, prompt: "Calculate the mean, median, mode and range of 2, 4, 4, 6, 9 and 11.", answer: "The mean is 6, the median is 5, the mode is 4 and the range is 9.", summary: "The sum 36 divided by 6 gives 6, the middle pair averages to 5, 4 repeats, and 11 minus 2 gives 9.", hint: "Use separate lines for total and count, middle pair, frequency and endpoints."},
      {tier: 2, prompt: "The waiting times 3, 4, 4, 5 and 19 minutes include one extreme value; compare the mean and median and choose the better typical value.", answer: "The mean is 7 minutes and the median is 4 minutes, so the median better represents the cluster from 3 to 5 minutes while 19 should be reported as an extreme value.", summary: "The high value pulls the mean away from most observations but does not move the middle ordered value as far.", hint: "Calculate both centres and compare each with the four closely grouped times."},
      {tier: 2, prompt: "A spreadsheet contains masses recorded as 42 grams, 0.045 kilograms, 47 grams, a blank cell and 44 grams; identify two data-cleaning actions required before calculating a mean.", answer: "Convert all masses to one unit and investigate or mark the missing value rather than treating the blank as zero.", summary: "Consistent units and explicit handling of missing data are necessary for a meaningful calculation.", hint: "Check whether every entry uses the same scale and whether every participant has a valid measurement."},
      {tier: 2, prompt: "A class's daily message counts have mean 12 and range 20; explain what each statistic communicates and one fact it does not reveal.", answer: "The mean communicates an average of 12 messages and the range communicates a 20-message gap between maximum and minimum, but neither reveals the complete distribution or where values cluster.", summary: "Centre and spread answer different questions and do not replace the original distribution.", hint: "Describe one location feature, one endpoint difference and one pattern that both summaries omit."},
      {tier: 3, prompt: "Construct two five-value data sets that both have mean 6 and range 8 but have different medians, and verify the conditions.", answer: "One valid pair is 2, 4, 6, 8, 10 and 2, 3, 5, 10, 10; both total 30 for mean 6, both have range 10 minus 2 equals 8, and their medians are 6 and 5 respectively.", summary: "Equal mean and range do not force equal middle positions, as the verified totals, endpoints and medians show.", hint: "Fix the endpoints at 2 and 10, make all five values total 30, and change the third ordered value."},
      {tier: 3, prompt: "Plan how to acquire reliable continuous data about Year 7 reaction times, including units, precision and two quality checks before calculating summaries.", answer: "Use the same digital timer and procedure for every student, record reaction time in seconds to the same precision, repeat or flag impossible readings, check missing and duplicate entries, and then calculate and interpret centre and spread with the sample size stated.", summary: "A standard measurement procedure and transparent cleaning protect the meaning of later numerical summaries.", hint: "Specify how every measurement is made and how you will detect inconsistent, missing or impossible values."}
    ]
  },

  AC9M7ST02: {
    learningIntention: "We are learning to construct and compare numerical data displays, including stem-and-leaf plots, and interpret distributions in context.",
    successCriteria: [
      "I can construct a stem-and-leaf plot with ordered leaves, a title and an unambiguous key.",
      "I can recover original values and calculate centre and spread from a numerical display.",
      "I can compare two distributions using evidence about centre, spread, clusters, gaps and extreme values."
    ],
    deepDive: [
      "A numerical data display should make the distribution visible without changing the values it represents. A stem-and-leaf plot separates each value into a leading stem and a final leaf, preserves individual observations, and requires ordered leaves and a key such as 4 | 7 = 47 so the scale cannot be misread.",
      "Centre describes where a distribution is located, spread describes how widely its values vary, and shape includes clusters, gaps, symmetry or a longer tail. Reading only a median or only the tallest stack can hide important differences between distributions.",
      "A comparison must use the same variable, units and scale and must connect numerical evidence to context. Two groups can have the same median but very different ranges or clustering, so a strong conclusion cites at least one measure of centre and one feature of spread or shape."
    ],
    vocabulary: [
      {term: "distribution", definition: "A distribution is the pattern formed by all values of a numerical variable, including its centre, spread and shape."},
      {term: "stem-and-leaf plot", definition: "A stem-and-leaf plot separates leading digits from final digits while preserving each original numerical value."},
      {term: "cluster", definition: "A cluster is a region of a distribution where several values are concentrated."},
      {term: "skew", definition: "Skew is asymmetry in a distribution with a longer tail towards lower or higher values."}
    ],
    misconceptions: [
      {idea: "Leaves can be written in the order in which the data were collected.", correction: "Leaves should be ordered within each stem so that the median, gaps and shape can be read reliably."},
      {idea: "A stem-and-leaf plot does not need a key because the digits are visible.", correction: "A key is essential because the same marks could represent ones, tenths or another place-value scale."},
      {idea: "Two distributions with the same median must be practically the same.", correction: "Equal medians can occur with very different ranges, clusters, gaps and extreme values."
      }
    ],
    workedExamples: [
      {
        title: "Reading centre and spread from a stem-and-leaf plot.",
        steps: [
          "Use the key 4 | 7 = 47 and read the ordered rows 3 | 2 5 8, 4 | 1 3 3 7 9, 5 | 0 4 6 and 6 | 2 as twelve values.",
          "The sixth and seventh values are 43 and 47, so the median is their mean, 45.",
          "The minimum is 32 and the maximum is 62, so the range is 62 minus 32, which equals 30.",
          "The value 43 occurs twice while every other value occurs once, and most observations lie in the 40s and 50s."
        ],
        answer: "The distribution has median 45, range 30, mode 43 and a concentration of values in the 40s and 50s.",
        check: "Reconstructing all twelve values in order confirms the middle pair, endpoints and repeated value."
      },
      {
        title: "Comparing groups with equal medians but different spread.",
        steps: [
          "Group A has values 32, 40, 45, 47, 47, 50 and 62, while Group B has 40, 44, 46, 47, 48, 50 and 54.",
          "Both groups have seven values and the fourth value is 47, so both medians are 47.",
          "Group A has range 62 minus 32 equals 30, while Group B has range 54 minus 40 equals 14.",
          "Conclude that the groups share the same centre by median, but Group B is more tightly clustered and Group A is much more variable."
        ],
        answer: "Both medians are 47, but Group A has range 30 and greater spread, whereas Group B has range 14 and stronger clustering around the high 40s.",
        check: "The comparison uses the complete ordered values and reports both a centre feature and a spread feature in the same units."
      }
    ],
    slides: {
      learning: {
        body: [
          "We are learning to construct numerical displays and compare distributions using evidence.",
          "I can make and read a keyed stem-and-leaf plot and describe centre, spread and shape in context."
        ],
        teacherNotes: "Build one stem row from unsorted data and ask why ordering leaves changes readability without changing the data.",
        expectedResponse: "Students reconstruct values correctly and support comparisons with more than one distribution feature.",
        misconceptionResponse: "A display is not complete when its scale or units cannot be recovered from a key and labels.",
        remediation: "Ask the student to read one plotted mark as a full value and add the information needed to make that reading unambiguous.",
        visualIds: ["ac9m7st02-model"]
      },
      refresher: {
        body: [
          "Write stems in order, place every leaf beside the correct stem, order the leaves and include a key.",
          "Use median or mean for centre and range plus clusters, gaps or extremes for spread and shape.",
          "Compare distributions only after checking that variable, units and display scale are compatible."
        ],
        teacherNotes: "Use the comparison table to model a sentence that includes both similarity and difference.",
        expectedResponse: "Students state that equal centre does not imply equal spread or shape.",
        misconceptionResponse: "One shared statistic cannot establish that two full distributions are alike.",
        remediation: "Cover the medians and ask students to compare the endpoints and concentration of values first.",
        visualIds: ["ac9m7st02-model", "ac9m7st02-application"]
      },
      guided: {
        title: "Guided example: interpret the displayed stem-and-leaf plot.",
        body: [
          "The key 4 | 7 = 47 shows that stems are tens and leaves are ones.",
          "There are twelve values, so average the sixth value 43 and seventh value 47 to obtain median 45.",
          "Subtract minimum 32 from maximum 62 to obtain range 30, and identify 43 as the mode.",
          "Most values lie in the 40s and 50s, so report that concentration together with the numerical summaries."
        ],
        teacherNotes: "Number the ordered leaves cumulatively so the two middle positions are visible and then return to the contextual distribution language.",
        expectedResponse: "The plot has median 45, range 30, mode 43 and most values in the 40s and 50s.",
        misconceptionResponse: "With twelve observations, the median is the mean of positions six and seven rather than either one alone.",
        remediation: "Rewrite the leaves as one ordered list and mark the two central positions.",
        visualIds: ["ac9m7st02-model"]
      },
      quickCheck: {
        body: [
          "A stem-and-leaf plot has key 2 | 1 = 21 and rows 2 | 1 4 8 and 3 | 0 5; find its median.",
          "Tell a partner how the key determines the five original values."
        ],
        teacherNotes: "Require students to reconstruct 21, 24, 28, 30 and 35 before naming the median.",
        expectedResponse: "The median is 28 because the ordered values are 21, 24, 28, 30 and 35.",
        misconceptionResponse: "The middle leaf 8 represents 28 rather than 8 because it must be combined with stem 2.",
        remediation: "Write each stem beside each of its leaves to rebuild the full values.",
        visualIds: []
      }
    },
    questions: [
      {tier: 1, prompt: "In a stem-and-leaf plot with key 4 | 7 = 47, what value is represented by 5 | 3?", answer: "The entry 5 | 3 represents 53.", summary: "The stem gives the tens digit and the leaf gives the ones digit under the stated key.", hint: "Use the example key to combine stem 5 with leaf 3 in the same place-value pattern."},
      {tier: 1, prompt: "Write the values represented by the row 3 | 2 5 8 when the key is 3 | 2 = 32.", answer: "The row represents 32, 35 and 38.", summary: "Each leaf is paired with the common stem to reconstruct one original value.", hint: "Keep the stem digit 3 and attach each leaf in turn."},
      {tier: 1, prompt: "A student leaves each stem's leaves in collection order. Explain why the leaves should instead be ordered.", answer: "Ordered leaves allow the data to be read in numerical order so the median, clusters, gaps and extremes can be identified accurately.", summary: "Ordering improves interpretation without changing any observation.", hint: "Think about which distribution features depend on knowing the order of values."},
      {tier: 2, prompt: "Construct a stem-and-leaf plot for 21, 24, 24, 29, 31, 35 and 38 using tens as stems, and include a key.", answer: "The plot has rows 2 | 1 4 4 9 and 3 | 1 5 8, with a valid key such as 2 | 1 = 21.", summary: "Every value appears once with ordered leaves beside its tens stem and an unambiguous key.", hint: "Group values by tens digit, order each set of ones digits and then state how one mark is read."},
      {tier: 2, prompt: "For the ordered stem-and-leaf values 12, 15, 18, 21, 23, 23, 27 and 30, calculate the median, mode and range.", answer: "The median is 22, the mode is 23 and the range is 18.", summary: "The median averages 21 and 23, the repeated value is 23, and 30 minus 12 equals 18.", hint: "There are eight values, so use the middle pair before checking repetitions and endpoints."},
      {tier: 2, prompt: "Class A has median 47 and range 30, while Class B has median 47 and range 14 for the same test; write a supported comparison.", answer: "The classes have the same centre by median, but Class B's scores are less spread out because its range is 16 points smaller.", summary: "A sound comparison distinguishes the shared centre from the different spread.", hint: "Use one sentence for the equal medians and another clause for the ranges."},
      {tier: 2, prompt: "A student creates the row 4 | 9 1 7 3 with key 4 | 1 = 41; identify the presentation error and correct the row.", answer: "The leaves are unordered, so the corrected row is 4 | 1 3 7 9.", summary: "Leaves must increase from left to right within a stem.", hint: "Arrange the ones digits in numerical order while keeping the same stem."},
      {tier: 3, prompt: "Compare Group A values 32, 40, 45, 47, 47, 50, 62 with Group B values 40, 44, 46, 47, 48, 50, 54 using centre, spread and clustering.", answer: "Both groups have median 47, but Group A has range 30 and widely separated endpoints, whereas Group B has range 14 and is more tightly clustered from 40 to 54.", summary: "The groups share a median but differ substantially in variability and concentration.", hint: "Find the fourth value and endpoint difference for each group before describing where most values sit."},
      {tier: 3, prompt: "Two stem-and-leaf plots use identical rows, but Plot X has key 2 | 5 = 25 centimetres and Plot Y has key 2 | 5 = 2.5 metres; explain why their numerical patterns cannot be compared responsibly without conversion.", answer: "The keys use different scales and units, so every value must be converted to a common unit before centre, spread or contextual magnitude is compared.", summary: "Similar-looking marks can represent different quantities when keys and units differ.", hint: "Read one mark from each key as a full measurement and express both measurements in the same unit."}
    ]
  },

  AC9M7ST03: {
    learningIntention: "We are learning to plan and conduct statistical investigations and communicate findings that are justified by the sampled data.",
    successCriteria: [
      "I can write a statistical question and define its population, sample and numerical variable.",
      "I can select a feasible sampling and data-collection method while identifying possible bias and nonresponse.",
      "I can analyse a distribution and write a contextual conclusion with appropriate limitations."
    ],
    deepDive: [
      "A statistical investigation begins with a question that anticipates variation, identifies the population of interest and defines a measurable numerical variable. The sample, measurement procedure and units must match that question so the collected data can actually address it.",
      "A representative sample depends on selection method rather than size alone. Simple random or carefully implemented systematic sampling can reduce selection bias, while convenience and voluntary-response samples often over-represent accessible or strongly motivated people; nonresponse can introduce further bias.",
      "After collection, data are checked, displayed and summarised by centre, spread and shape before a conclusion is written in context. The conclusion should distinguish the observed sample from the broader population, disclose limitations and avoid causal language unless the investigation design supports cause."
    ],
    vocabulary: [
      {term: "population", definition: "The population is the complete group about which an investigation seeks information."},
      {term: "sample", definition: "A sample is the subset of the population from which data are actually collected."},
      {term: "sampling bias", definition: "Sampling bias is systematic over-representation or under-representation caused by the way a sample is selected or responds."},
      {term: "statistical question", definition: "A statistical question is a question that expects variable data from a group or repeated process."}
    ],
    misconceptions: [
      {idea: "A very large convenience sample must represent the population well.", correction: "Increasing a biased sample's size does not repair the systematic exclusion or over-representation created by its selection method."},
      {idea: "The sample and population are interchangeable because both refer to people in the study.", correction: "Data are observed from the sample and used cautiously as evidence about the larger population."},
      {idea: "An association found in a survey proves that one variable caused the other.", correction: "An observational association can be influenced by other variables and does not by itself establish causation."}
    ],
    workedExamples: [
      {
        title: "Planning an investigation of Year 7 travel times.",
        steps: [
          "Ask, 'How long does it usually take students in our Year 7 cohort to travel to school?' and define the population as all Year 7 students at the school.",
          "Select a random sample from every Year 7 home group so that one accessible class does not dominate, and record travel time in minutes using the same wording and reference day.",
          "Check missing, impossible and duplicate entries, then display the continuous numerical data and calculate an appropriate centre and spread.",
          "If the sample has median 18 minutes, range 52 minutes and a longer upper tail, conclude that a typical sampled journey was about 18 minutes but travel times varied widely, without claiming an exact result for every student."
        ],
        answer: "The investigation links a variable statistical question to a distributed random sample, consistent collection, distribution analysis and a qualified conclusion about Year 7 travel times.",
        check: "Every conclusion refers to the sampled travel-time data, reports variation and avoids extending the result beyond the defined school population."
      },
      {
        title: "Evaluating a biased survey of physical activity.",
        steps: [
          "A student surveys 120 members of school sports clubs to estimate weekly activity for all 600 Year 7 students.",
          "Although the sample is large, club membership makes highly active students more likely to be included, so the sample is a convenience sample with selection bias.",
          "Improve the design by randomly selecting students from the full Year 7 roll, or by randomly sampling the same proportion from each home group, and follow up nonresponses consistently.",
          "Report the sample size, response rate, activity distribution and remaining limitations before generalising cautiously to the Year 7 population."
        ],
        answer: "The sports-club survey cannot represent all Year 7 activity reliably, and a random sample from the full cohort with transparent nonresponse reporting is stronger.",
        check: "The revised sampling frame gives every Year 7 student a known opportunity for selection rather than restricting selection to sports-club members."
      }
    ],
    slides: {
      learning: {
        body: [
          "We are learning to plan, conduct and communicate a complete statistical investigation.",
          "I can connect the question, population, sample, variable, collection method, distribution and qualified conclusion."
        ],
        teacherNotes: "Keep the investigation cycle visible and require students to explain how a weakness in one stage limits the later claim.",
        expectedResponse: "Students identify a valid population and variable, select a defensible sample and communicate findings no more broadly than the evidence allows.",
        misconceptionResponse: "A larger sample improves precision only when its selection process is not systematically biased.",
        remediation: "Ask who had no realistic opportunity to enter the sample and how their exclusion could change the data.",
        visualIds: ["ac9m7st03-model"]
      },
      refresher: {
        body: [
          "Define the statistical question, population and numerical variable before selecting a sample.",
          "Collect consistently, clean transparently and analyse centre, spread and shape in context.",
          "Conclude with evidence, scope and limitations, and do not turn an observed association into an unsupported causal claim."
        ],
        teacherNotes: "Compare the sampling-method table by asking whose experiences are likely to be over-represented or absent in each method.",
        expectedResponse: "Students evaluate sampling methods through representativeness, feasibility and likely sources of bias.",
        misconceptionResponse: "A census can still have missing or inaccurate responses, while a well-selected sample can provide useful evidence.",
        remediation: "Separate the number invited, number responding and method of selection in a simple audit table.",
        visualIds: ["ac9m7st03-model", "ac9m7st03-application"]
      },
      guided: {
        title: "Guided example: investigate Year 7 travel times.",
        body: [
          "Ask how long students in the school's Year 7 cohort usually take to travel to school, and define travel time in minutes as the variable.",
          "Randomly sample students across every home group and use one consistent question and reference day.",
          "Clean the data, then display and summarise centre, spread and shape.",
          "A median of 18 minutes and range of 52 minutes support a conclusion about a typical sampled journey and wide variation, with sampling limits stated."
        ],
        teacherNotes: "At each stage, ask how the decision supports the original question and what limitation remains.",
        expectedResponse: "The conclusion is that the sampled students typically travelled about 18 minutes but showed wide variation, and it is cautiously applied to the school's Year 7 cohort.",
        misconceptionResponse: "A median of 18 minutes does not mean every student or even most students travelled for exactly 18 minutes.",
        remediation: "Return to the distribution and distinguish a centre summary from the full set of observed values.",
        visualIds: ["ac9m7st03-model"]
      },
      quickCheck: {
        body: [
          "A student asks only people waiting at the salad bar to name their favourite school lunch; identify the population, sample and likely bias, then propose one improvement.",
          "Tell a partner why your improved selection method better matches the target population."
        ],
        teacherNotes: "Listen for a distinction between all relevant students and the salad-bar customers who were actually approached.",
        expectedResponse: "If the target population is all school students, the sample is the salad-bar queue and it is biased towards students already choosing that food area; randomly sampling students across year groups would improve representation.",
        misconceptionResponse: "Asking everyone in one queue is still biased even if every person in that queue responds.",
        remediation: "Circle the words 'all school students' and list which groups could never appear in the queue-based sample.",
        visualIds: []
      }
    },
    questions: [
      {tier: 1, prompt: "Which is a statistical question: 'How many minutes do Year 7 students at this school spend reading on a weekday?' or 'How many minutes did Amira read yesterday?', and why?", answer: "The Year 7 question is statistical because it expects varying numerical responses from a group, while the question about Amira seeks one fixed value.", summary: "A statistical question anticipates variation across a population or repeated process.", hint: "Choose the question that would produce a distribution rather than one answer."},
      {tier: 1, prompt: "In a survey of 80 randomly selected students from all 620 students at a school, identify the population and sample.", answer: "The population is all 620 students at the school, and the sample is the 80 randomly selected students.", summary: "The population is the target group and the sample is the subset that supplies data.", hint: "Separate the group the conclusion concerns from the group actually surveyed."},
      {tier: 1, prompt: "A study records each student's journey time to school in minutes; classify the variable as discrete or continuous and justify your answer.", answer: "Journey time is continuous because time is measured on a scale, even if the recorded minutes are rounded.", summary: "Measurement remains continuous when reported to limited precision.", hint: "Ask whether a more precise clock could record values between whole minutes."},
      {tier: 2, prompt: "A school surveys the first 100 students entering the library about weekly reading time; identify the likely sampling bias.", answer: "The convenience sample is likely to over-represent students who use the library and may read more than students who do not enter it.", summary: "The selection location systematically changes which students can enter the sample.", hint: "Identify who is easy to reach and who has no chance to be selected."},
      {tier: 2, prompt: "Put these investigation stages in a defensible order: analyse the distribution, define the question and population, collect data consistently, select a sample, clean the data, and communicate a conclusion.", answer: "The order is define the question and population, select a sample, collect data consistently, clean the data, analyse the distribution, and communicate a conclusion.", summary: "Each stage supplies trustworthy information needed by the next stage.", hint: "Begin with what you want to know and end with what the evidence allows you to say."},
      {tier: 2, prompt: "A random sample of 50 Year 7 students has median travel time 16 minutes and range 48 minutes; write a cautious contextual conclusion.", answer: "For the sampled students, a typical travel time was about 16 minutes and travel times varied widely across a 48-minute range, but sampling uncertainty means the exact values may differ for the whole Year 7 cohort.", summary: "The conclusion interprets centre and spread while keeping its claim within the evidence's scope.", hint: "Mention both median and range and include language that distinguishes sample from population."},
      {tier: 2, prompt: "A voluntary online survey receives 400 responses from 2,000 students; explain why the large response count does not remove possible bias.", answer: "Students who chose to respond may differ systematically from nonresponders, so voluntary-response bias can remain even with 400 responses.", summary: "Sample size does not correct a selection process that over-represents motivated respondents.", hint: "Compare people who decided to participate with those who ignored the survey."},
      {tier: 3, prompt: "Design a feasible investigation of Year 7 sleep duration that states a statistical question, population, sample, variable, collection method and one limitation.", answer: "Ask 'How many hours do students in our Year 7 cohort usually sleep on a school night?', define all Year 7 students as the population, randomly sample students from every home group, collect self-reported hours for the same specified night, analyse the distribution, and acknowledge that recall and self-reporting may be inaccurate.", summary: "The plan aligns every investigation component and identifies a realistic measurement limitation.", hint: "Write one clause for each required component and make the reference night consistent for every sampled student."},
      {tier: 3, prompt: "A survey finds that students reporting more exercise also report higher wellbeing; evaluate the claim 'exercise caused the higher wellbeing' and write a justified alternative conclusion.", answer: "The survey shows an association but cannot establish causation because other variables and self-selection may affect both measures, so a justified conclusion is that higher reported exercise was associated with higher reported wellbeing in this sample.", summary: "Observational survey evidence supports an association rather than an unqualified causal claim.", hint: "State exactly what the data move together with and identify what the study did not control or manipulate."}
    ]
  },

  AC9M7P01: {
    learningIntention: "We are learning to identify sample spaces for single-stage chance events, assign probabilities and predict relative frequencies.",
    successCriteria: [
      "I can list every possible elementary outcome without omissions or duplication.",
      "I can assign and combine outcome probabilities, including for outcomes that are not equally likely.",
      "I can calculate a complement and use probability to predict an expected frequency while recognising chance variation."
    ],
    deepDive: [
      "A sample space lists every possible elementary outcome of one chance action. When elementary outcomes are equally likely, an event's probability is its favourable outcome count divided by the total outcome count; when sectors, objects or rules have different weights, probabilities must come from those weights rather than from the number of labels.",
      "An event is a subset of the sample space, so its probability is the sum of the probabilities of its mutually exclusive elementary outcomes. All elementary outcome probabilities must total 1, and the complement rule P(not A) = 1 − P(A) accounts for every outcome outside an event.",
      "Expected frequency equals probability multiplied by the number of trials and predicts the long-run count for planning or comparison. It is not a guarantee for one run, because observed relative frequency can vary even when the probability model is correct."
    ],
    vocabulary: [
      {term: "sample space", definition: "A sample space is the set of all possible elementary outcomes of a chance action."},
      {term: "event", definition: "An event is a specified subset of outcomes from the sample space."},
      {term: "complement", definition: "The complement of an event contains every sample-space outcome that is not in that event."},
      {term: "expected frequency", definition: "Expected frequency is the probability of an event multiplied by the planned number of trials."}
    ],
    misconceptions: [
      {idea: "Three colour labels on a spinner must each have probability one-third.", correction: "Probabilities depend on sector size, so labels are equally likely only when their total sectors are equal in size."},
      {idea: "A multi-outcome event can be counted as though it were one elementary outcome.", correction: "The probabilities of all mutually exclusive elementary outcomes in the event must be added."},
      {idea: "An expected frequency is the exact number that must occur in the next set of trials.", correction: "Expected frequency is a long-run prediction, and an observed count can differ through chance variation."}
    ],
    visuals: [
      {
        id: "ac9m7p01-model",
        type: "legacyHtml",
        html: "<div class=\"y7-board\"><div class=\"y7-table\" style=\"grid-template-columns:repeat(3,minmax(0,1fr))\"><span>Spinner outcome</span><span>Sector share</span><span>Probability</span><span>Red</span><span>One half</span><span>1/2</span><span>Blue</span><span>One quarter</span><span>1/4</span><span>Green</span><span>One quarter</span><span>1/4</span><span>Total</span><span>Whole spinner</span><span>1</span></div></div>",
        alt: "A weighted-spinner table shows red occupying one half and blue and green each occupying one quarter, so the outcome probabilities one half, one quarter and one quarter total one."
      },
      {
        id: "ac9m7p01-application",
        type: "legacyHtml",
        html: "<div class=\"y7-board\"><div class=\"y7-table\" style=\"grid-template-columns:repeat(3,minmax(0,1fr))\"><span>Event</span><span>Probability</span><span>Expected in 200 spins</span><span>Red</span><span>1/2</span><span>100</span><span>Blue</span><span>1/4</span><span>50</span><span>Green</span><span>1/4</span><span>50</span><span>Red or blue</span><span>3/4</span><span>150</span></div></div>",
        alt: "An expected-frequency table shows that in 200 spins, red predicts 100 outcomes, blue and green predict 50 each, and red or blue predicts 150."
      }
    ],
    workedExamples: [
      {
        title: "Assigning probabilities to a weighted spinner.",
        steps: [
          "A spinner has red covering one half of its area, blue covering one quarter and green covering one quarter, so the colour sample space is {red, blue, green}.",
          "Assign P(red) = 1/2, P(blue) = 1/4 and P(green) = 1/4 from sector size rather than giving each label one-third.",
          "Check 1/2 + 1/4 + 1/4 = 1, and add outcomes to find P(red or blue) = 1/2 + 1/4 = 3/4.",
          "For 200 spins, calculate the expected red-or-blue frequency as 200 × 3/4 = 150."
        ],
        answer: "The weighted outcome probabilities are 1/2, 1/4 and 1/4, and red or blue has probability 3/4 with expected frequency 150 in 200 spins.",
        check: "The elementary probabilities total 1 and the expected colour counts 100, 50 and 50 total all 200 planned spins."
      },
      {
        title: "Building probabilities from objects in a bag.",
        steps: [
          "A bag contains 3 red counters, 2 blue counters and 5 yellow counters, making 10 equally likely individual counters.",
          "Assign P(red) = 3/10, P(blue) = 2/10 and P(yellow) = 5/10.",
          "The event 'not yellow' contains red or blue, so P(not yellow) = 3/10 + 2/10 = 5/10 = 1/2, which also equals 1 − 5/10.",
          "In 40 draws with replacement, predict an expected not-yellow frequency of 40 × 1/2 = 20."
        ],
        answer: "The probability of not drawing yellow is 1/2, so its expected frequency in 40 replacement draws is 20.",
        check: "The red, blue and yellow probabilities total 10/10, and the complement and addition methods both give 1/2 for not yellow."
      }
    ],
    slides: {
      learning: {
        body: [
          "We are learning to build complete sample spaces, assign probabilities and predict relative frequencies.",
          "I can check that outcome probabilities total 1, combine outcomes for an event and explain why an expected count is not guaranteed."
        ],
        teacherNotes: "Contrast a fair three-section spinner with the weighted spinner so students separate label count from sector size.",
        expectedResponse: "Students derive probabilities from the chance mechanism and verify that all elementary outcomes account for the whole sample space.",
        misconceptionResponse: "Equal-looking labels do not establish equal likelihood when their sectors or object counts differ.",
        remediation: "Partition the chance device into equal-sized units and count how many units belong to each outcome.",
        visualIds: ["ac9m7p01-model"]
      },
      refresher: {
        body: [
          "List all elementary outcomes and assign probability from equal units, counts or stated weights.",
          "Add mutually exclusive outcome probabilities for an event, and use P(not A) = 1 − P(A) for a complement.",
          "Expected frequency equals probability multiplied by trials and remains a prediction rather than a promise."
        ],
        teacherNotes: "Use the final total row to make the sample-space check visible before moving to expected frequencies.",
        expectedResponse: "Students connect each event calculation to named outcomes and the whole probability of 1.",
        misconceptionResponse: "An event containing two colours can have greater probability than either colour alone because it combines their mutually exclusive outcomes.",
        remediation: "Shade all sectors that satisfy the event and add their labelled fractions.",
        visualIds: ["ac9m7p01-model", "ac9m7p01-application"]
      },
      guided: {
        title: "Guided example: analyse a half-quarter-quarter spinner.",
        body: [
          "The sample space is {red, blue, green}, but the differently sized sectors are not equally likely.",
          "Assign P(red) = 1/2, P(blue) = 1/4 and P(green) = 1/4, which total 1.",
          "Add red and blue to obtain P(red or blue) = 3/4.",
          "Multiply 200 by 3/4 to predict 150 red-or-blue outcomes in 200 spins."
        ],
        teacherNotes: "Point to sector share, fraction and expected count in sequence, and label expected count explicitly as a prediction.",
        expectedResponse: "Red or blue has probability 3/4 and expected frequency 150 in 200 spins.",
        misconceptionResponse: "Giving every colour probability one-third ignores the unequal sector areas and makes the model inconsistent.",
        remediation: "Rewrite one half as two quarters and count four equal quarters across the whole spinner.",
        visualIds: ["ac9m7p01-model"]
      },
      quickCheck: {
        body: [
          "A bag contains 2 red, 3 blue and 5 green counters; find P(red or blue) and its expected frequency in 60 replacement draws.",
          "Tell a partner why the expected frequency need not equal the observed count."
        ],
        teacherNotes: "Listen for a favourable count of five out of ten before students multiply by 60.",
        expectedResponse: "P(red or blue) = 5/10 = 1/2, so the expected frequency is 30 in 60 draws, although chance variation can change the observed count.",
        misconceptionResponse: "There are two favourable colours but five favourable counters, so the probability is not two-thirds.",
        remediation: "Count individual equally likely counters for the numerator and denominator before simplifying.",
        visualIds: []
      }
    },
    questions: [
      {tier: 1, prompt: "List the sample space for one roll of a standard six-sided die.", answer: "The sample space is {1, 2, 3, 4, 5, 6}.", summary: "The six faces list every possible elementary outcome exactly once.", hint: "Write every face value that could appear after one roll."},
      {tier: 1, prompt: "A spinner has one half red, one quarter blue and one quarter green; find P(blue).", answer: "P(blue) = 1/4.", summary: "Probability follows the blue sector's one-quarter share of the spinner.", hint: "Use sector area rather than the number of colour labels."},
      {tier: 1, prompt: "If P(rain) = 0.37, find P(no rain).", answer: "P(no rain) = 1 − 0.37 = 0.63.", summary: "Complementary events together have probability 1.", hint: "Subtract the stated event probability from 1."},
      {tier: 2, prompt: "A bag contains 3 red, 2 blue and 5 yellow counters; find P(red or blue) for one draw.", answer: "P(red or blue) = (3 + 2)/10 = 5/10 = 1/2.", summary: "The event combines five favourable counters among ten equally likely counters.", hint: "Add the red and blue counts before dividing by the total count."},
      {tier: 2, prompt: "A fair die is rolled once; find the probability of an outcome greater than 4.", answer: "The favourable outcomes are {5, 6}, so the probability is 2/6 = 1/3.", summary: "Two of the six equally likely die outcomes satisfy the event.", hint: "List values in the sample space that are strictly greater than 4."},
      {tier: 2, prompt: "An event has probability 0.35; predict its expected frequency in 80 trials.", answer: "The expected frequency is 80 × 0.35 = 28.", summary: "Multiplying trial count by event probability gives the predicted count.", hint: "Calculate probability multiplied by the number of planned trials."},
      {tier: 2, prompt: "A spinner has three labels A, B and C, but A covers half the spinner while B and C each cover one quarter; correct the claim that every label has probability one-third.", answer: "The correct probabilities are P(A) = 1/2, P(B) = 1/4 and P(C) = 1/4 because likelihood follows sector size rather than label count.", summary: "Named outcomes are not equally likely when their areas differ.", hint: "Compare the fraction of the whole spinner occupied by each label."},
      {tier: 3, prompt: "Design a fair six-sector spinner with events A, B and C having probabilities 1/2, 1/3 and 1/6 respectively, and justify the design.", answer: "Label 3 equal sectors A, 2 equal sectors B and 1 equal sector C; the probabilities are 3/6 = 1/2, 2/6 = 1/3 and 1/6, and they total 1.", summary: "Allocating six equal sectors in the ratio 3:2:1 realises the required probabilities exactly.", hint: "Express every target probability with denominator 6 and assign that many equal sectors."},
      {tier: 3, prompt: "A game outcome has probability 3/8 and is played 160 times; calculate the expected frequency and explain why observing 55 outcomes would not by itself disprove the probability model.", answer: "The expected frequency is 160 × 3/8 = 60, and an observed count of 55 can occur through chance variation, so repeated evidence is needed before judging the model.", summary: "Expected frequency is a long-run prediction rather than an exact requirement for one run.", hint: "Find the predicted count first, then distinguish a difference of five from proof of an incorrect model."}
    ]
  },

  AC9M7P02: {
    learningIntention: "We are learning to conduct repeated chance experiments and digital simulations and compare observed with expected frequencies.",
    successCriteria: [
      "I can calculate and compare relative frequency, theoretical probability and expected frequency.",
      "I can explain random variation and why larger samples usually give more stable estimates.",
      "I can design or audit a reproducible simulation so its random process matches the intended probability model."
    ],
    deepDive: [
      "Relative frequency is the observed event count divided by the total number of trials, so it allows results from different sample sizes to be compared fairly. Expected frequency is theoretical probability multiplied by trial count, and the difference between observed and expected counts records what happened in one run rather than automatically proving an error.",
      "Random variation means repeated samples from the same valid chance process can produce different proportions. As the number of independent trials grows, relative frequency usually becomes more stable around theoretical probability, but it need not approach the target steadily or equal it exactly at any particular trial count.",
      "A digital simulation must reproduce the intended outcome probabilities, generate trials independently where required, record every valid result and disclose its trial count and settings. A small manual trace, total-count check and comparison across repeated runs help detect coding, weighting or recording errors."
    ],
    vocabulary: [
      {term: "relative frequency", definition: "Relative frequency is an event's observed count divided by the total number of trials."},
      {term: "simulation", definition: "A simulation uses a random process or digital model to imitate a chance experiment."},
      {term: "expected frequency", definition: "Expected frequency is theoretical probability multiplied by the number of trials."},
      {term: "random variation", definition: "Random variation is the natural difference between results from repeated samples generated by the same chance process."}
    ],
    misconceptions: [
      {idea: "A fair coin must produce exactly half heads in every set of tosses.", correction: "Half is the theoretical probability, while finite observed proportions vary randomly around it."},
      {idea: "Relative frequency must move closer to theoretical probability after every additional trial.", correction: "The estimate can move towards or away on individual steps even though larger samples are usually more stable overall."},
      {idea: "A digital random result is automatically valid because a computer produced it.", correction: "The programmed outcomes, weights, independence and recording process must be checked against the intended chance model."}
    ],
    workedExamples: [
      {
        title: "Comparing observed and expected coin-toss frequencies.",
        steps: [
          "A fair-coin simulation records 103 heads in 200 independent tosses.",
          "Calculate the observed relative frequency as 103 divided by 200, which equals 0.515.",
          "Calculate the expected heads frequency as 200 × 0.5 = 100 and the observed-minus-expected difference as 103 − 100 = 3.",
          "Conclude that 0.515 is close to the theoretical probability 0.5 and that three extra heads are plausible random variation rather than evidence that the coin is unfair."
        ],
        answer: "The observed relative frequency is 0.515, compared with theoretical probability 0.5 and expected frequency 100 heads, so the difference is 3 heads.",
        check: "The observed counts 103 heads and 97 tails total all 200 trials, and 0.515 + 0.485 = 1."
      },
      {
        title: "Designing and interpreting a 30-percent simulation.",
        steps: [
          "Generate a random integer from 1 to 10 independently on each trial and define success as an output of 1, 2 or 3, giving theoretical probability 3/10 = 0.3.",
          "Run 500 trials and record 163 successes, then calculate relative frequency as 163/500 = 0.326.",
          "Calculate expected frequency as 500 × 0.3 = 150 and compare the observed count, which is 13 above expected.",
          "Repeat the 500-trial simulation and inspect the generator settings before deciding whether 0.326 reflects ordinary variation or a persistent model problem."
        ],
        answer: "The simulation has intended probability 0.3, expected frequency 150 and observed relative frequency 0.326 from 163 successes.",
        check: "Three of the ten equally likely generator outputs are successes, all 500 trials are counted, and repeated runs can test whether the difference persists."
      }
    ],
    slides: {
      learning: {
        body: [
          "We are learning to compare repeated chance results with a probability model.",
          "I can calculate relative and expected frequencies, explain variation and audit whether a simulation represents the intended chance process."
        ],
        teacherNotes: "Display several short coin runs rather than only one so variation between valid samples is visible from the outset.",
        expectedResponse: "Students compare proportions rather than raw counts and interpret differences as evidence to investigate rather than automatic errors.",
        misconceptionResponse: "A fair process describes the generating probability, not an exact balance in every finite sample.",
        remediation: "Run several ten-trial samples and record their different head counts before pooling the results.",
        visualIds: ["ac9m7p02-model"]
      },
      refresher: {
        body: [
          "Relative frequency equals observed event count divided by total trials.",
          "Expected frequency equals theoretical probability multiplied by total trials.",
          "Larger samples usually stabilise a proportion, but every valid run can differ and every simulation still needs an audited probability rule."
        ],
        teacherNotes: "Move between count, proportion and theoretical probability in separate labelled columns.",
        expectedResponse: "Students can state whether they are comparing counts or proportions and can identify the trial total supporting each result.",
        misconceptionResponse: "Raw counts from different trial totals cannot be compared without converting them to relative frequencies.",
        remediation: "Divide each event count by its own total before deciding which observed event rate is larger.",
        visualIds: ["ac9m7p02-model", "ac9m7p02-application"]
      },
      guided: {
        title: "Guided example: interpret 103 heads in 200 simulated tosses.",
        body: [
          "Calculate observed relative frequency as 103/200 = 0.515.",
          "Calculate expected frequency under a fair-coin model as 200 × 0.5 = 100 heads.",
          "The observed count is 3 above expected, and the observed proportion is 0.015 above theoretical probability.",
          "Treat the small difference as plausible random variation and use repeated larger runs if the model needs stronger evaluation."
        ],
        teacherNotes: "Point to the 200-trial row and distinguish the displayed observed proportion from the separate theoretical reference value.",
        expectedResponse: "The relative frequency is 0.515, the expected count is 100 and the observed difference is 3 heads.",
        misconceptionResponse: "The result does not need to equal exactly 0.5 for the simulation to be consistent with a fair coin.",
        remediation: "Translate 0.5 into 100 expected heads and compare the size of the three-head difference with the total 200 trials.",
        visualIds: ["ac9m7p02-model"]
      },
      quickCheck: {
        body: [
          "An event with theoretical probability 0.75 occurs 84 times in 120 trials; find its relative frequency, expected frequency and observed-minus-expected difference.",
          "Tell a partner whether this one result proves that the simulation is incorrect."
        ],
        teacherNotes: "Require all three quantities before interpreting the six-event difference.",
        expectedResponse: "The relative frequency is 84/120 = 0.70, the expected frequency is 120 × 0.75 = 90, and the observed-minus-expected difference is −6; one run does not by itself prove an incorrect model.",
        misconceptionResponse: "The relative frequency is 0.70 rather than 0.75 because 0.75 is the theoretical probability used to find the expected count.",
        remediation: "Label one calculation 'observed divided by total' and the other 'probability multiplied by total.'",
        visualIds: []
      }
    },
    questions: [
      {tier: 1, prompt: "An event occurs 18 times in 30 trials; calculate its relative frequency.", answer: "The relative frequency is 18/30 = 0.6.", summary: "Relative frequency divides the observed event count by the total trial count.", hint: "Write observed count over total trials and simplify or convert to a decimal."},
      {tier: 1, prompt: "An event has theoretical probability 0.4; calculate its expected frequency in 250 trials.", answer: "The expected frequency is 250 × 0.4 = 100.", summary: "Expected count is theoretical probability multiplied by the planned number of trials.", hint: "Multiply 250 by the stated probability rather than using an observed count."},
      {tier: 1, prompt: "Experiment A records 42 successes in 60 trials and Experiment B records 132 successes in 200 trials; which observed relative frequency is greater?", answer: "Experiment A has relative frequency 42/60 = 0.70, while Experiment B has 132/200 = 0.66, so Experiment A's is greater.", summary: "Converting both counts to proportions permits a fair comparison across different totals.", hint: "Divide each success count by its own trial count before comparing."},
      {tier: 2, prompt: "A fair-coin simulation produces 54 heads in 100 tosses; compare observed relative frequency, theoretical probability and expected frequency.", answer: "The observed relative frequency is 0.54, the theoretical probability is 0.5 and the expected frequency is 50 heads, so the observed count is 4 above expected.", summary: "Observed and theoretical values can differ slightly through random variation.", hint: "Calculate 54/100 for the observation and 100 × 0.5 for the expectation."},
      {tier: 2, prompt: "Two runs of the same simulation record 27 successes in 50 trials and 63 successes in 100 trials; find the pooled relative frequency.", answer: "The pooled relative frequency is (27 + 63)/(50 + 100) = 90/150 = 0.6.", summary: "Pooling combines both event counts and both trial counts before division.", hint: "Add numerators and denominators separately rather than averaging the two proportions without weights."},
      {tier: 2, prompt: "Design a random-integer simulation for an event with probability 3/8 and state which outputs represent success.", answer: "Generate an integer from 1 to 8 with equal probability on every trial and let 1, 2 or 3 represent success.", summary: "Three successful outputs among eight equally likely outputs model probability 3/8.", hint: "Use eight equal generator outcomes and label exactly three as successes."},
      {tier: 2, prompt: "A program simulates a fair coin by choosing an integer from 1 to 5 and calling 1, 2 or 3 heads; identify the flaw and repair it.", answer: "The program gives heads probability 3/5 rather than 1/2, so use an even number of equally likely outputs, such as integers 1 to 10 with 1 to 5 as heads and 6 to 10 as tails.", summary: "A valid simulation must assign equal total probability to heads and tails.", hint: "Count the successful generator outputs and compare that fraction with one-half."},
      {tier: 3, prompt: "A fair coin gives 14 heads in 20 tosses and 104 heads in 200 tosses; compare the estimates and explain which is generally more reliable without claiming certainty.", answer: "The relative frequencies are 0.70 and 0.52, and the 200-toss estimate is generally more reliable because a larger independent sample usually has smaller proportional fluctuations, although no finite run is guaranteed to be closest.", summary: "Sample size affects stability, while chance variation remains present in both runs.", hint: "Convert both counts to proportions and compare each sample size with the theoretical probability 0.5."},
      {tier: 3, prompt: "Plan a reproducible 1,000-trial simulation for a spinner with probabilities red 1/2, blue 1/4 and green 1/4, including two validity checks and the summaries to report.", answer: "Generate independent integers 1 to 4, map 1 and 2 to red, 3 to blue and 4 to green, run exactly 1,000 trials, check that every output is recorded and that the mapping gives probabilities 2/4, 1/4 and 1/4, then report each count, relative frequency, expected frequency and observed-minus-expected difference across repeated runs.", summary: "The plan aligns generator weights with the spinner and makes both implementation and results auditable.", hint: "Specify equal random outputs, map the correct number to each colour and state how totals and expected values will be checked."}
    ]
  }
};
