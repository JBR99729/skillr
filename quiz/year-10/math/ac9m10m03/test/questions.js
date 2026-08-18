"use strict";
const Q=(id,n,s,q,a,c,e)=>({id,curriculumCode:"AC9M10M03",bank:"test",section:s,sourceNumber:n,skill:s,printable:true,type:"single",question:q,answers:a,correct:c,explanation:e,structuredExplanation:{summary:e,hint:"Draw the right triangle, label the bearing/elevation angle, then choose the correct trig ratio."},qualitySchema:"production-v1"});
window.skillrTestQuestions=[
Q("ac9m10m03-t-001",25,"Elevation and depression","A drone is 50 m above the ground. The angle of depression to a target is 40°. Approximate the horizontal distance to the target.",["40 m","50 m","59.6 m","70 m"],2,"Distance=50/tan40°≈59.6 m."),
Q("ac9m10m03-t-002",26,"Elevation and depression","A hill rises at an angle of 12°. Over a horizontal distance of 200 m, what height is gained, to 1 decimal place?",["40.0 m","42.5 m","45.0 m","50.0 m"],1,"Height=200tan12°≈42.5 m."),
Q("ac9m10m03-t-003",27,"Elevation and depression","A building is 25 m tall. From a point on level ground, the angle of elevation to the top is 30°. Approximate the horizontal distance to the building.",["40.0 m","43.3 m","45.0 m","50.0 m"],1,"Distance=25/tan30°≈43.3 m."),
Q("ac9m10m03-t-004",28,"Elevation and depression","A plane is 300 m horizontally from a runway point and descends along a line making an 8° angle with the horizontal. Approximate its height above the runway point.",["40.0 m","42.2 m","45.0 m","50.0 m"],1,"Height=300tan8°≈42.2 m."),
Q("ac9m10m03-t-005",29,"Elevation and depression","A tower is 60 m tall. The angle of elevation to its top is 45°. What is the horizontal distance from the observer to the tower?",["50 m","55 m","60 m","65 m"],2,"Distance=60/tan45°=60 m."),
Q("ac9m10m03-t-006",30,"Elevation and depression","A cliff is 80 m tall. The angle of depression from the top to a boat is 30°. Approximate the horizontal distance to the boat.",["120.0 m","138.6 m","140.0 m","160.0 m"],1,"Distance=80/tan30°≈138.6 m."),
Q("ac9m10m03-t-007",31,"Bearings","A three-figure bearing is measured:",["Anticlockwise from north","Clockwise from north","From east","From south"],1,"Bearings are measured clockwise from north."),
Q("ac9m10m03-t-008",32,"Bearings","A bearing of 090° points:",["North","East","South","West"],1,"090° is due east."),
Q("ac9m10m03-t-009",33,"Bearings","A bearing of 180° points:",["North","East","South","West"],2,"180° is due south."),
Q("ac9m10m03-t-010",34,"Bearings","A ship travels 40 km on a bearing of 030°. What is its northward component, to 1 decimal place?",["20.0 km","30.0 km","34.6 km","40.0 km"],2,"North component=40cos30°≈34.6 km."),
Q("ac9m10m03-t-011",35,"Bearings","For the same 40 km trip on bearing 030°, what is the eastward component?",["10 km","15 km","20 km","25 km"],2,"East component=40sin30°=20 km."),
Q("ac9m10m03-t-012",36,"Bearings","A plane flies 100 km on a bearing of 060°. What is its northward component?",["50.0 km","60.0 km","70.0 km","80.0 km"],0,"North component=100cos60°=50 km."),
Q("ac9m10m03-t-013",37,"Bearings","For the same 100 km trip on bearing 060°, what is the eastward component, to 1 decimal place?",["50.0 km","60.0 km","70.0 km","86.6 km"],3,"East component=100sin60°≈86.6 km."),
Q("ac9m10m03-t-014",38,"Bearings","A hiker walks 12 km on a bearing of 330°. What is the northward component, to 1 decimal place?",["6.0 km","8.0 km","10.4 km","12.0 km"],2,"330° is 30° west of north, so north component=12cos30°≈10.4 km."),
Q("ac9m10m03-t-015",39,"Bearings","For the same 12 km trip on bearing 330°, what is the westward component?",["6 km","8 km","10 km","12 km"],0,"West component=12sin30°=6 km."),
Q("ac9m10m03-t-016",40,"Bearings","A boat travels 50 km on a bearing of 300°. What is its northward component?",["25 km","30 km","35 km","40 km"],0,"300° is 60° west of north, so north component=50cos60°=25 km.")];
window.skillrExamQuestions=window.skillrTestQuestions;window.quizQuestions=window.skillrTestQuestions;
