"use strict";
const Q=(n,question,answers,correct,explanation,skill="reasoning with triangle and polygon angles")=>({id:`ac9m7m05-t-${String(n).padStart(3,"0")}`,curriculumCode:"AC9M7M05",bank:"test",skill,printable:true,type:"single",question,audioPrompt:question,visual:"",visualHtml:"",visualMeta:{type:"none",alt_text:""},answers,correct,explanation,structuredExplanation:{summary:explanation,hint:"Choose the correct angle-sum model before calculating."},qualitySchema:"production-v1"});
window.skillrTestQuestions=[
Q(1,"A triangle has angles (x+10)°, 2x° and 3x°. Find x.",["20°","25°","28.3°","30°"],2,"(x+10)+2x+3x=180 gives 6x=170, so x≈28.3°."),
Q(2,"An isosceles triangle has a vertex angle of 38°. What is each base angle?",["71°","72°","76°","142°"],0,"The two equal base angles share 180−38=142°, so each is 71°."),
Q(3,"A triangle has one angle twice a second angle. The third angle is 45°. If the smaller of the first two angles is x°, find x.",["35°","40°","45°","50°"],2,"x+2x+45=180, so 3x=135 and x=45°."),
Q(4,"A triangle has angles in the ratio 2:3:4. What is the largest angle?",["40°","60°","80°","90°"],2,"There are 9 parts, so each part is 20°. The largest angle is 4×20=80°."),
Q(5,"Which statement best explains why tearing the corners from several different triangles is useful?",["It proves all triangles are congruent","It shows the 180° result is not limited to one triangle shape","It shows all angles are equal","It measures side lengths"],1,"Using different triangle shapes supports the general observation that their three interior angles form a straight angle."),
Q(6,"A quadrilateral is divided by one diagonal. How many triangles are formed?",["1","2","3","4"],1,"One diagonal from a vertex divides a quadrilateral into 2 triangles."),
Q(7,"A heptagon is decomposed into triangles from one vertex. How many triangles are formed?",["4","5","6","7"],1,"An n-gon forms n−2 triangles, so a heptagon forms 5 triangles."),
Q(8,"Which expression gives the interior angle sum of a 12-gon?",["180×10","180×12","360×10","180×14"],0,"For n=12, use 180(n−2)=180×10."),
Q(9,"The interior angle sum of a polygon is 1620°. How many sides does it have?",["9","10","11","12"],2,"180(n−2)=1620 gives n−2=9, so n=11."),
Q(10,"The interior angle sum of a polygon is 1980°. How many sides does it have?",["11","12","13","14"],2,"180(n−2)=1980 gives n−2=11, so n=13."),
Q(11,"A pentagon has angles 90°, 110°, 125°, 95° and x°. Find x.",["100°","110°","120°","130°"],2,"The pentagon sum is 540°. Known angles total 420°, so x=120°."),
Q(12,"A hexagon has four angles of 120°, one angle of 110°, and one angle x°. Find x.",["110°","120°","130°","140°"],2,"A hexagon totals 720°. Known angles total 590°, so x=130°."),
Q(13,"A quadrilateral has angles x°, 2x°, 3x° and 4x°. Find the largest angle.",["108°","120°","144°","160°"],2,"10x=360, so x=36°. The largest angle is 4x=144°."),
Q(14,"A pentagon has angles x°, x°, x°, 120° and 150°. Find x.",["80°","90°","100°","110°"],1,"3x+270=540, so 3x=270 and x=90°."),
Q(15,"A regular polygon has an interior angle of 120°. Which polygon is it?",["Pentagon","Hexagon","Heptagon","Octagon"],1,"A regular hexagon has interior angle 120° because 720÷6=120°."),
Q(16,"A regular polygon has an interior angle of 135°. Which polygon is it?",["Hexagon","Heptagon","Octagon","Nonagon"],2,"A regular octagon has interior angle 1080÷8=135°."),
Q(17,"Which pair of facts is enough to find a missing angle in a triangle?",["Its perimeter and one side","Two interior angles","Its area and base","One side and one angle"],1,"Two interior angles determine the third because the total must be 180°."),
Q(18,"A student says a quadrilateral has angle sum 180° because it can be split into triangles. What is the error?",["A quadrilateral cannot be split into triangles","It splits into 2 triangles, so the total is 360°","Triangles total 360°","The formula works only for regular polygons"],1,"A quadrilateral splits into 2 triangles, contributing 2×180=360°."),
Q(19,"Why does the polygon formula use n−2 rather than n?",["Two sides are always parallel","An n-gon can be decomposed into n−2 triangles from one vertex","Two angles are exterior","Every polygon loses two vertices"],1,"The number n−2 counts the triangles formed from one vertex."),
Q(20,"A triangle has angles 4x°, 5x° and 6x°. Find the smallest angle.",["36°","48°","60°","72°"],1,"15x=180 gives x=12°, so the smallest angle is 4x=48°."),
Q(21,"A regular decagon has equal interior angles. What is each angle?",["140°","144°","150°","160°"],1,"The decagon sum is 1440°. Divide by 10 to get 144°."),
Q(22,"A polygon has 15 sides. What is its interior angle sum?",["2160°","2340°","2520°","2700°"],1,"180(15−2)=180×13=2340°."),
Q(23,"A quadrilateral has three equal angles of 85°. What is the fourth angle?",["95°","100°","105°","110°"],2,"Three angles total 255°. The fourth is 360−255=105°."),
Q(24,"A pentagon has angles 2x°, 2x°, 3x°, 4x° and 4x°. Find x.",["30°","32°","36°","40°"],2,"15x=540, so x=36°.")
];
window.skillrExamQuestions=window.skillrTestQuestions;
window.quizQuestions=window.skillrTestQuestions;