from common import *
A=[['Gate','Tree','Slide','Tap'],['Bench','Pond','Sand','Shed'],['Path','Flowers','Table','Bin'],['Door','Mat','Steps','Wall']]
B=[['Books','Desk','Art','Sink'],['Rug','Plants','Blocks','Door'],['Bags','Table','Shelf','Window']]
def grid(rows,title):
    s=txt(320,26,title,22)+txt(320,51,'Directions mean on this page',16);h=220/len(rows)
    for r,row in enumerate(rows):
        for c,label in enumerate(row):s+=rect(40+c*140,65+r*h,140,h)+txt(110+c*140,65+r*h+h*.6,label,18)
    return s
V={'park':(grid(A,'Playground plan'),'Four-by-four playground grid. Rows from top: Gate, Tree, Slide, Tap; Bench, Pond, Sand, Shed; Path, Flowers, Table, Bin; Door, Mat, Steps, Wall.'),'room':(grid(B,'Classroom plan'),'Three-by-four classroom grid. Rows from top: Books, Desk, Art, Sink; Rug, Plants, Blocks, Door; Bags, Table, Shelf, Window.')}
P=[
q('locate','Which place is in the top-left square?','Gate','Door','Tap','The top row and leftmost column meet at Gate.','park'),
q('relative','Which place is directly below Tree?','Pond','Slide','Flowers','Move one square down from Tree to Pond.','park'),
q('between','Which place is between Flowers and Bin in their row?','Table','Sand','Steps','The row reads Path, Flowers, Table, Bin.','park'),
q('right','Which place is immediately to the right of Pond?','Sand','Bench','Flowers','In the second row, Sand is one square right of Pond.','park'),
q('single_move','Start at Gate and move 2 squares right. Where do you arrive?','Slide','Tree','Tap','Gate to Tree is one step; Tree to Slide is the second.','park'),
q('down_move','Start at Tap and move 3 squares down. Where do you finish?','Wall','Bin','Shed','Follow Tap, Shed, Bin, Wall: three moves.','park'),
q('path','Start at Door. Move 2 right, then 1 up. Where are you?','Table','Sand','Steps','Two right reaches Steps; one up reaches Table.','park'),
q('left_path','Start at Shed. Move 1 down, then 2 left. Where do you finish?','Flowers','Path','Table','Shed to Bin, then Table, then Flowers.','park'),
q('instruction','Which instruction takes you from Pond to Tree?','Move 1 square up','Move 1 square left','Move 2 squares up','Tree is directly above Pond.','park'),
q('two_step_route','Which route takes you from Gate to Sand?','2 right, then 1 down','1 right, then 2 down','2 down, then 1 left','Two right reaches Slide; one down reaches Sand.','park'),
q('start_matters','You follow “1 square right”. What else must you know to find the destination?','The starting square','The colour of the page','The time of day','The same move leads to different destinations from different starts.'),
q('count_moves','From Path, follow 1 right, 1 up, 1 right. How many moves do you make?','3','2','4','There are three one-square moves.','park'),
q('trace','From Path, follow 1 right, 1 up, 1 right. Which place do you pass through second, after leaving Path?','Pond','Flowers','Sand','The successive places are Flowers, Pond and Sand.','park'),
q('reverse','You travel from Mat to Flowers by moving up once. How do you return?','Move down once','Move up once','Move left once','Reverse the upward move with a downward move.','park'),
q('reverse_sequence','A route goes 2 right, then 1 up. Which route retraces it from the finish?','1 down, then 2 left','2 left, then 1 down','2 right, then 1 down','Undo the last move first, then undo the earlier rightward moves.'),
q('obstacle','The Pond square is closed. Which route gets from Bench to Sand without entering Pond?','1 up, 2 right, 1 down','2 right','1 right, 1 up, 1 right, 1 down','The first route goes through Gate, Tree and Slide, avoiding Pond.','park'),
q('same_finish','From Gate, compare “2 right then 1 down” with “1 down then 2 right”. Do they end at the same place if all squares are open?','Yes; both finish at Sand','No; one finishes at Pond','No; changing order always changes the finish','Both routes make the same total moves right and down, though they pass different places.','park'),
q('map_view','A plan shows where tables and doors are from above. What does it help you do?','Locate places and follow routes','Know the exact colour of the ceiling','Find the age of every table','A plan represents positions within the space.'),
q('boundary','Start at Tap. Can you move 1 square right and remain inside this plan?','No; Tap is at the right edge','Yes; you reach Gate','Yes; you reach Shed','There is no square to the right of Tap.','park'),
q('missing_move','Start at Gate. Move 1 down, then ___ right to reach Sand. How many squares go in the gap?','2','1','3','From Bench, two rightward moves pass Pond and reach Sand.','park'),
q('relative_not_facing','The plan says “move right on the page”. Should the direction change when a toy turns to face another way?','No; page-right stays the same','Yes; it always follows the toy’s face','Yes; it becomes up','These directions use the fixed page, not the toy’s changing orientation.'),
task('trace_route','Copy the plan and draw a route from Door to Tap. Use only up/down/left/right moves and write your instructions.','Any valid connected route within the grid from Door to Tap, with matching directions.','One example is 3 up, then 3 right. Check the learner’s actual route rather than requiring that example.','park'),
task('avoid_pond','Draw a route from Bench to Sand that avoids Pond. Write each move in order.','For example, up 1, right 2, down 1.','Accept any valid route remaining inside the grid and never entering Pond; directions must match.','park'),
task('familiar_plan','Draw a simple plan of a familiar room with a door and two named objects. Mark a route from the door to one object and describe it.','A recognisable overhead arrangement with named positions and a route whose directions match the drawing.','Adult checks the chosen familiar space and the consistency of directions; artistic detail is not assessed.')]
T=[
q('locate','What is in the bottom-right square of the classroom plan?','Window','Sink','Bags','The bottom row meets the rightmost column at Window.','room'),
q('relative','Which place is directly above Blocks?','Art','Shelf','Desk','Art is in the same column, one row above Blocks.','room'),
q('between','What lies between Rug and Blocks in their row?','Plants','Table','Desk','The middle row begins Rug, Plants, Blocks.','room'),
q('move','Start at Books. Move 3 squares right. Where do you finish?','Sink','Art','Door','The three moves reach Desk, Art and Sink.','room'),
q('two_moves','Start at Window. Move 2 left, then 1 up. Where do you arrive?','Plants','Desk','Rug','Two left reaches Table; one up reaches Plants.','room'),
q('route_select','Which route goes from Bags to Art?','2 up, then 2 right','2 right, then 1 up','1 up, then 3 right','From Bags, two up reaches Books and two right reaches Art.','room'),
q('destination','From Door, move 1 left and 1 down. Where are you?','Shelf','Table','Blocks','Door to Blocks, then down to Shelf.','room'),
q('reverse','A route from Desk to Table is 2 squares down. How do you return along it?','2 squares up','2 squares right','1 square up','Reverse both downward moves.','room'),
q('boundary','Which move from Books leaves the plan?','1 square left','1 square right','1 square down','Books is at the left boundary.','room'),
q('blocked','Plants is blocked. Which route from Rug to Blocks avoids it?','1 up, 2 right, 1 down','2 right','1 right, 1 down, 1 right, 1 up','The first route goes via Books, Desk and Art.','room'),
q('missing','From Bags, move 1 right and then ___ up to reach Desk.','2 squares','1 square','3 squares','One right reaches Table, and Desk is two rows above Table.','room'),
q('order','Why might the order of moves matter even when two routes share a destination?','One route might pass through a blocked square','The page’s right edge changes','Each route must have different totals','Different intermediate positions can encounter different obstacles.'),
q('starting','Someone says “Go up to the shelf”, but the plan has Shelf in the bottom row. What should you clarify first?','Where the person starts and which direction system they mean','The shelf’s colour','How many books are on it','Clear starting position and direction reference are needed to follow instructions.','room'),
task('route','Draw a route from Sink to Bags and write the steps in order.','For example, 3 left then 2 down, staying within the plan.','Accept other valid routes; verify the drawing and written steps have the same start and finish.','room'),
task('reverse_route','Trace Books to Desk to Plants to Blocks. Write instructions to retrace it from Blocks back to Books.','Left 1, up 1, left 1.','The reverse route must visit Plants, Desk and Books in that order.','room'),
task('describe_position','Use this plan to describe the position of Table in two different ways.','For example, Table is below Plants and between Bags and Shelf.','Accept two accurate spatial relationships, not two repeated names for the same relation.','room')]
write('AC9M2SP02',P,T,V)
