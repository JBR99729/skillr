"use strict";
const Q=(id,n,s,q,a,c,e)=>({id,curriculumCode:"AC9M10M03",bank:"practice",section:s,sourceNumber:n,skill:s,printable:true,type:"single",question:q,answers:a,correct:c,explanation:e,structuredExplanation:{summary:e,hint:"Identify the right triangle, choose Pythagoras or SOH-CAH-TOA, then check units and rounding."},qualitySchema:"production-v1"});
window.skillrPracticeQuestions=[
Q("ac9m10m03-p-001",1,"Pythagoras","A right triangle has legs 3 m and 4 m. What is the hypotenuse?",["5 m","6 m","7 m","8 m"],0,"√(3²+4²)=5 m."),
Q("ac9m10m03-p-002",2,"Pythagoras","A right triangle has hypotenuse 13 cm and one leg 5 cm. What is the other leg?",["8 cm","10 cm","12 cm","14 cm"],2,"√(13²-5²)=√144=12 cm."),
Q("ac9m10m03-p-003",3,"Pythagoras","A ladder 10 m long reaches 6 m up a wall. How far is its foot from the wall?",["6 m","8 m","10 m","12 m"],1,"√(10²-6²)=8 m."),
Q("ac9m10m03-p-004",4,"Pythagoras","A rectangular field has diagonal 25 m and length 15 m. What is its width?",["10 m","15 m","20 m","25 m"],2,"√(25²-15²)=20 m."),
Q("ac9m10m03-p-005",5,"Pythagoras","A right triangle has legs 7 cm and 24 cm. What is the hypotenuse?",["25 cm","26 cm","27 cm","30 cm"],0,"√(7²+24²)=25 cm."),
Q("ac9m10m03-p-006",6,"Pythagoras","A square has diagonal 10 cm. What is its side length?",["5√2 cm","10√2 cm","2√5 cm","5 cm"],0,"s√2=10, so s=10/√2=5√2 cm."),
Q("ac9m10m03-p-007",7,"Pythagoras","A right triangle has hypotenuse 17 m and one leg 15 m. What is the other leg?",["8 m","10 m","12 m","16 m"],0,"√(17²-15²)=8 m."),
Q("ac9m10m03-p-008",8,"Pythagoras","A ramp rises 1.5 m over a horizontal distance of 4 m. What is its length, to 1 decimal place?",["4.3 m","4.5 m","4.7 m","5.0 m"],0,"√(1.5²+4²)=√18.25≈4.3 m."),
Q("ac9m10m03-p-009",9,"Pythagoras","A right triangle has hypotenuse 50 cm and one leg 14 cm. What is the other leg?",["36 cm","48 cm","49 cm","50 cm"],1,"√(50²-14²)=48 cm."),
Q("ac9m10m03-p-010",10,"Pythagoras","A rectangle has diagonal 26 cm and one side 10 cm. What is the other side?",["16 cm","20 cm","24 cm","25 cm"],2,"√(26²-10²)=24 cm."),
Q("ac9m10m03-p-011",11,"Trigonometry","In a right triangle, opposite=6 and hypotenuse=10. What is sin θ?",["0.4","0.5","0.6","0.7"],2,"sin θ=6/10=0.6."),
Q("ac9m10m03-p-012",12,"Trigonometry","In a right triangle, adjacent=8 and hypotenuse=10. What is cos θ?",["0.6","0.7","0.8","0.9"],2,"cos θ=8/10=0.8."),
Q("ac9m10m03-p-013",13,"Trigonometry","In a right triangle, opposite=9 and adjacent=12. What is tan θ?",["0.5","0.6","0.75","1.33"],2,"tan θ=9/12=0.75."),
Q("ac9m10m03-p-014",14,"Trigonometry","A right triangle has opposite=5 and hypotenuse=13. Find θ to 1 decimal place.",["22.6°","23.0°","25.0°","30.0°"],0,"θ=sin⁻¹(5/13)≈22.6°."),
Q("ac9m10m03-p-015",15,"Trigonometry","A right triangle has adjacent=7 and hypotenuse=10. Find θ to 1 decimal place.",["40.5°","45.6°","49.0°","55.0°"],1,"θ=cos⁻¹(0.7)≈45.6°."),
Q("ac9m10m03-p-016",16,"Trigonometry","A right triangle has opposite=12 and adjacent=5. Find θ to 1 decimal place.",["67.4°","68.0°","69.0°","71.0°"],0,"θ=tan⁻¹(12/5)≈67.4°."),
Q("ac9m10m03-p-017",17,"Trigonometry","Evaluate sin 30°.",["0.5","0.6","0.7","1.0"],0,"sin30°=0.5."),
Q("ac9m10m03-p-018",18,"Trigonometry","Evaluate cos 60°.",["0.2","0.3","0.5","1.0"],2,"cos60°=0.5."),
Q("ac9m10m03-p-019",19,"Trigonometry","Evaluate tan 45°.",["0","0.5","1","2"],2,"tan45°=1."),
Q("ac9m10m03-p-020",20,"Trigonometry","A right triangle has hypotenuse 20 m and angle θ=30°. What is the side opposite θ?",["5 m","10 m","15 m","20 m"],1,"20sin30°=10 m."),
Q("ac9m10m03-p-021",21,"Elevation and depression","For an angle of elevation, the observer looks:",["Downwards","Upwards","Horizontally","Backwards"],1,"An angle of elevation is measured upward from the horizontal."),
Q("ac9m10m03-p-022",22,"Elevation and depression","For an angle of depression, the observer looks:",["Downwards","Upwards","Horizontally","Backwards"],0,"An angle of depression is measured downward from the horizontal."),
Q("ac9m10m03-p-023",23,"Elevation and depression","A person sees the top of a building at an angle of elevation of 35°. They are 40 m horizontally from the base. Approximate the building height.",["20 m","28 m","35 m","40 m"],1,"40tan35°≈28.0 m."),
Q("ac9m10m03-p-024",24,"Elevation and depression","A lighthouse is 30 m tall. From a boat, the angle of elevation to the top is 20°. Approximate the horizontal distance to the lighthouse.",["60 m","82 m","90 m","100 m"],1,"30/tan20°≈82.4 m.")];
window.quizQuestions=window.skillrPracticeQuestions;
