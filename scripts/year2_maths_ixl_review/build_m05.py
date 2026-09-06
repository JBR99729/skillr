from common import *
V={}
def turn(n,start=0,cw=True):
    k=f'{n}-{start}-{cw}';s=txt(320,27,'Follow the curved arrow',20)
    for a,label in [(0,'Top'),(90,'Right'),(180,'Bottom'),(270,'Left')]:
        r=math.radians(a);s+=txt(320+225*math.sin(r),158-110*math.cos(r),label,18)
    pts=[]
    for j in range(n*20+1):
        a=math.radians(start+(1 if cw else -1)*j*90/20);pts.append((320+83*math.sin(a),150-83*math.cos(a)))
    s+='<polyline points="'+' '.join(f'{x:.1f},{y:.1f}' for x,y in pts)+'" fill="none" stroke="#087fa5" stroke-width="4"/>'
    x,y=pts[-1];u,v=pts[-2];a=math.atan2(y-v,x-u)
    s+=f'<path d="M{x-13*math.cos(a-.5)} {y-13*math.sin(a-.5)}L{x} {y}L{x-13*math.cos(a+.5)} {y-13*math.sin(a+.5)}" fill="none" stroke="#087fa5" stroke-width="4"/>'
    for angle,length,col in [(start+(1 if cw else -1)*n*90,90,'#17324d'),(start,66,'#777')]:
        a=math.radians(angle);s+=line(320,150,320+length*math.sin(a),150-length*math.cos(a),col,5)
    s+=txt(320,287,'Grey = start; dark = finish',17)
    V[k]=(s,f'Turn diagram, grey starting ray at {start} degrees clockwise from top; curved arrow travels {n} quarter-turns '+('clockwise' if cw else 'anticlockwise')+'.');return k
P=[
q('identify_quarter','What amount of turn does the curved arrow show?','A quarter turn','A half turn','A full turn','The arrow travels through one of four equal parts of a full circle.',turn(1)),
q('identify_half','Name the turn shown.','A half turn','A quarter turn','A three-quarter turn','Two quarter-turns take the ray to the opposite direction.',turn(2,90)),
q('identify_three_quarters','Follow the curved arrow. How much does it turn?','Three quarters of a turn','One quarter of a turn','One full turn','The arrow travels around three of the four quarters.',turn(3)),
q('identify_full','The arrow travels all the way around and returns to its starting direction. What is this?','A full turn','A half turn','A quarter turn','One complete rotation is a full turn.',turn(4)),
q('opposite','You face a window. What turn makes you face directly away from it?','A half turn','A full turn','A quarter turn','A half turn changes the direction to its opposite.'),
q('full_return','A toy makes one full turn. Where does it face at the end?','In its original direction','In the opposite direction','Always to the right','A full turn returns the toy to its starting orientation.'),
q('quarter_count','How many equal quarter-turns make one full turn?','4','2','3','Four quarters make a whole turn.'),
q('half_count','How many quarter-turns in the same direction make a half turn?','2','1','4','Two quarters make one half.'),
q('clockwise','An arrow starts pointing to the top of the page and makes a clockwise quarter turn. Where does it point?','Right','Left','Bottom','Clockwise follows the order top, right, bottom, left.'),
q('anticlockwise','An arrow points right. It makes a quarter turn anticlockwise. Where does it point?','Top','Bottom','Left','Anticlockwise goes from right towards the top.'),
q('starting_direction','A dial points to the bottom. After a clockwise quarter turn, where does it point?','Left','Right','Top','From the bottom, the next clockwise quarter leads to the left.'),
q('door','A closed door opens until the door and doorway form a square corner. What is the smaller turn?','A quarter turn','A half turn','A full turn','The two positions form one quarter of a full rotation.'),
q('three_clockwise','An arrow starts pointing left. After a clockwise three-quarter turn, where does it point?','Bottom','Top','Right','Follow left to top, right, then bottom: three quarters.'),
q('three_anticlockwise','An arrow starts at the top and turns three quarters anticlockwise. Where does it finish?','Right','Left','Bottom','Follow top to left, bottom, then right.'),
q('combine','A dancer makes a half turn and then a quarter turn in the same direction. What is the total turn?','A three-quarter turn','A quarter turn','A full turn','A half is two quarters; adding one quarter makes three.'),
q('complete_full','A spinner has turned three quarters of the way around. What more is needed in the same direction for a full turn?','A quarter turn','A half turn','A three-quarter turn','Three quarters plus one quarter completes the circle.'),
q('undo','You turn a quarter clockwise, then a quarter anticlockwise. Where do you face?','In the starting direction','In the opposite direction','A half turn clockwise from the start','The second turn reverses the first.'),
q('same_finish','Two arrows start at the top. One turns a quarter clockwise; the other turns three quarters anticlockwise. Do they finish alike?','Yes; both point right','No; they point opposite ways','Yes; both point left','Different amounts and directions can have the same finishing orientation.'),
q('amount_not_speed','Two children each make a half turn, one slowly and one quickly. Who makes the larger turn?','Neither; the turn amounts are equal','The quicker child','The slower child','Turn amount measures rotation, not speed.'),
q('direction_not_amount','A ray moves from pointing up to pointing down. Can either direction make a half turn?','Yes; clockwise and anticlockwise both can','Only clockwise can','Only anticlockwise can','Half a circle reaches the opposite direction either way.'),
q('arc_matters','The starting and finishing lines form a square corner. Why must you also look at the curved arrow?','It shows whether the turn goes a quarter or three quarters around','It tells how long the line is','It always means a full turn','The same pair of lines can be joined by a short or long rotation.'),
q('two_halves','A wheel makes two half turns in the same direction. What is the total?','One full turn','One quarter turn','Three quarters of a turn','Each half contains two quarters; together they contain four.'),
task('demonstrate','Use a pencil as a pointer. Start it pointing to the top of your page. Show a clockwise quarter turn, then continue another quarter turn. Name the total.','First point right, then bottom; the total is a half turn.','Observe both successive turns; moving the pencil sideways without rotating it is not a turn.'),
task('everyday_turn','Show an adult a half turn and a full turn using a toy or your body. Explain how their ending directions differ.','A half turn ends opposite the start; a full turn returns to the starting direction.','Accept safe physical demonstration with the two amounts correctly distinguished.')]
T=[
q('read_quarter','Which turn is indicated by this curved arrow?','A quarter turn','A half turn','A three-quarter turn','The curved path covers one quarter of a full circle.',turn(1,180,False)),
q('read_half','What fraction of a full turn is shown?','One half','One quarter','Three quarters','The end ray points opposite the start after two quarters.',turn(2,0,False)),
q('read_three','Name the rotation shown by the curved path.','A three-quarter turn','A quarter turn','A half turn','Trace all three quarters of the marked path.',turn(3,90)),
q('read_full','This pointer follows a complete circle. How much does it turn?','One full turn','One half turn','Three quarters of a turn','A complete circle contains four quarter-turns.',turn(4,180,False)),
q('opposite_left','A toy points left, then makes a half turn. Where does it point?','Right','Top','Bottom','Right is opposite left.'),
q('anticlockwise_bottom','A pointer starts at the bottom. Where does a quarter turn anticlockwise take it?','Right','Left','Top','Anticlockwise from bottom goes towards right.'),
q('three_from_right','A pointer faces right and makes three quarter-turns clockwise. Where does it finish?','Top','Bottom','Left','Right to bottom to left to top uses three quarters.'),
q('remaining','A wheel has made one quarter turn. How much more in the same direction completes one rotation?','Three quarters of a turn','One quarter of a turn','One half of a turn','A full rotation has four quarters; three remain.'),
q('compose','Three quarter-turns followed by one more quarter-turn, all clockwise, make what?','A full turn','A half turn','A three-quarter turn','There are four quarter-turns altogether.'),
q('undo_half','A toy turns halfway clockwise and then halfway anticlockwise. Its final direction is what?','The starting direction','The opposite direction','A quarter turn from the start','The second half turn undoes the first.'),
q('same_endpoint','A toy faces the same way before and after moving. Must it have made exactly one full turn?','No; it might not have turned, or made more than one full turn','Yes; that is the only possibility','No; it must have made a half turn','Ending direction alone cannot tell how many complete rotations occurred.'),
q('quarter_directions','A quarter turn clockwise and a quarter turn anticlockwise start at the top. Their end directions are what?','Right and left','Both right','Both bottom','The equal turn amounts travel in opposite directions.'),
q('size_invariant','A long pointer and a short pointer each turn halfway. Which rotates through more of a circle?','Neither; each rotates through one half','The long pointer','The short pointer','Pointer length does not change the fraction of a turn.'),
q('least_turn','A pointer faces down and must face up. Which listed turn achieves this?','A half turn','A quarter turn','A full turn','Up and down are opposite directions.'),
task('demonstrate_three','Start a pointer facing right. Demonstrate a three-quarter turn anticlockwise. Name each direction it passes at quarter-turn stops.','Right to top to left to bottom.','Check three anticlockwise quarter-turns, ending at bottom.'),
task('compare_turns','Draw two turn diagrams from the same starting direction: a half turn and a full turn. Add curved arrows and label them.','Half-turn arrow covers half a circle; full-turn arrow covers a complete circle.','Require arrows showing amount, not only starting and finishing rays; accept either rotation direction.')]
write('AC9M2M05',P,T,V)
