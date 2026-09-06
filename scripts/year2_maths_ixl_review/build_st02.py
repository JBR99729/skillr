from common import *
def bars(labels,values,title):
    s=txt(320,25,title,22)+txt(65,54,'Count',16)
    for n in range(9):
        y=250-n*23;s+=line(105,y,565,y,'#cad6df',1)+txt(85,y+6,n,16)
    for i,(label,n) in enumerate(zip(labels,values)):
        x=140+i*140;s+=rect(x,250-n*23,80,n*23,'#83c6ee')+txt(x+40,280,label,17)
    return s
def pictures(labels,values,title):
    s=txt(320,28,title,21)
    for i,(label,n) in enumerate(zip(labels,values)):
        y=65+i*65;s+=txt(85,y+24,label,18)
        for j in range(n):s+=f'<circle cx="{185+j*43}" cy="{y+18}" r="13" fill="#087fa5"/>'
    return s+'<circle cx="195" cy="278" r="9" fill="#087fa5"/>'+txt(350,284,'= 1 vote (key)',17)
def table(labels,values,title):
    s=txt(320,30,title,22)
    for i,(label,n) in enumerate(zip(['Choice']+labels,['Votes']+values)):
        y=55+i*53;s+=rect(140,y,200,53)+rect(340,y,160,53)+txt(240,y+33,label,19)+txt(420,y+33,n,19)
    return s
L=['Catch','Tag','Skip'];A=[3,6,2];B=['Red','Blue','Gold'];D=[5,2,5]
V={'bar':(bars(L,A,'Favourite game'),'Bar graph: Catch 3, Tag 6, Skip 2; count scale 0 to 8 in ones.'),'pic':(pictures(L,A,'Favourite game'),'Picture graph: Catch 3 circles, Tag 6, Skip 2; one circle is one vote.'),'tab':(table(L,A,'Favourite game'),'Table: Catch 3, Tag 6, Skip 2 votes.'),'bad':(bars(L,[6,3,2],'Favourite game'),'Bar graph: Catch 6, Tag 3, Skip 2; scale in ones.'),'testbar':(bars(B,D,'Favourite badge colour'),'Bar graph: Red 5, Blue 2, Gold 5; count scale in ones.'),'testpic':(pictures(B,D,'Favourite badge colour'),'Picture graph: Red 5 circles, Blue 2, Gold 5; one circle is one vote.'),'testtab':(table(B,D,'Favourite badge colour'),'Table: Red 5, Blue 2, Gold 5 votes.')}
P=[
q('read_bar','Which game received the most votes?','Tag','Catch','Skip','The Tag bar reaches 6, higher than the other bars.','bar'),
q('read_picture','How many votes did Skip receive?','2','3','6','The Skip row has two circles and the key makes each circle one vote.','pic'),
q('table_to_graph','A graph is made from this table. How high should its Catch bar reach?','3','6','2','The Catch row records three votes.','tab'),
q('key','What does one circle mean in this picture graph?','One vote','One game','One child in every category','The key assigns one vote to each circle.','pic'),
q('difference','How many more votes did Tag receive than Catch?','3','9','2','Read 6 and 3, then subtract: 6 minus 3 is 3.','bar'),
q('total','How many votes are represented altogether?','11','9','6','Add all category counts: 3 plus 6 plus 2 is 11.','tab'),
q('labels','What do the labels Catch, Tag and Skip tell you?','Which game each bar represents','How many centimetres tall the graph is','When the games were played','Category labels connect each bar to its game.','bar'),
q('zero','A fourth game receives no votes. How should a picture graph record it?','Label its row and put no vote symbols in it','Put one symbol there to show the label','Copy the largest row','A zero category has a label but no count symbols.'),
q('same_data','The table says Catch 3, Tag 6, Skip 2. This graph is meant to show the same data. What needs fixing?','The Catch and Tag bar heights are swapped','The Skip bar should be removed','Every bar should reach 6','The displayed bars assign 6 to Catch and 3 to Tag, reversing those two counts.','bad'),
q('different_forms','A bar graph and picture graph both show Catch 3, Tag 6, Skip 2. What do they share?','The count for each game','The shape of every mark','The same way of drawing each vote','They represent the same category counts using different visual forms.'),
q('distinct_feature','How does a one-to-one picture graph differ from a bar graph?','It uses a separate symbol for each vote','It cannot show category names','It must have different totals','A picture graph uses repeated symbols; a bar represents quantity by its length or height.'),
q('order','Two graphs list the same games in different orders. Can both represent the same votes?','Yes, if each game keeps its correct count','No, category order changes the votes','Only if every count is equal','Compare labels with counts, not only the positions of bars.'),
q('equal_icons','Why should vote symbols have the same size and spacing?','So rows can be compared fairly','So every category gets the same count','So the title can be left out','Unequal symbol sizes or gaps can make equal counts look different.'),
q('baseline','A count bar graph starts every bar from zero. Why is that useful?','Bar heights can be compared from the same starting point','It makes every vote equal zero','It removes the need for category labels','A shared zero baseline makes heights reflect counts fairly.'),
q('update','One more person votes for Skip. What should change in the picture graph?','Add one circle to Skip','Add one circle to every row','Remove one circle from Tag','Only Skip gains a vote. Its count changes from 2 to 3.','pic'),
q('two_categories','How many votes did Catch and Skip receive together?','5','9','8','Catch has 3 and Skip has 2; together they have 5.','bar'),
q('misread_key','A child counts the circle in the key as another vote. What should they do?','Count only circles in the category rows','Count the title as a vote too','Ignore every circle','The key explains the symbols; its example is not part of the data.','pic'),
q('title','Which title matches a graph of children’s votes for Catch, Tag and Skip?','Favourite playground game','Number of rainy days','Lengths of pencils','The title should identify the question the data answer.'),
q('digital_creation','A digital graph swaps category names but leaves their counts in place. What should you check?','That each count remains linked to the correct category','Only the graph colour','Only the title size','Correct category-count pairing matters even when software makes the graph.'),
q('evidence_limit','Does this graph tell us why Tag was chosen most often?','No; it records how many votes, not the reasons','Yes; it proves Tag is easiest','Yes; it tells every child’s reason','The graph shows counts; reasons were not included in these data.','bar'),
q('same_total_not_enough','Two graphs have 11 votes altogether. Must they show the same results for each game?','No; the category counts could differ','Yes; equal totals prove all counts match','Yes; all graphs have equal categories','The same total can be split among categories in different ways.'),
task('create_picture','Use the table to draw a picture graph. Include a title, all three game labels and a one-vote key.','Catch 3 symbols; Tag 6; Skip 2, with equal-sized symbols and a key meaning one vote each.','Check all category counts and readable labels, title and key. Accept another consistent symbol.','tab'),
task('create_compare','Use the table to draw a bar graph, using graphing software with adult help if available. Explain one difference between your bar graph and a picture graph of the same votes.','Bars at 3, 6 and 2 from zero, labelled Catch, Tag, Skip. Bar heights replace repeated vote symbols.','Check uniform scale, shared baseline and correct counts. Paper is acceptable if software is unavailable.','tab'),
task('compare_representations','Make a simple count table from this picture graph. State one fact that stays the same in both displays.','Catch 3, Tag 6, Skip 2. For example, Tag has the most votes in both.','Check every converted count and a true shared fact.','pic')]
T=[
q('read','Which colour received the fewest votes?','Blue','Red','Gold','Blue has 2; Red and Gold each have 5.','testbar'),
q('tie','Which statement is supported by the picture graph?','Red and Gold have equal votes','Blue has the most votes','Gold has fewer votes than Red','The Red and Gold rows each contain five vote symbols.','testpic'),
q('sum','How many votes were cast?','12','10','7','Five plus two plus five is twelve.','testtab'),
q('difference','How many more votes did Gold receive than Blue?','3','7','2','Five minus two is three.','testbar'),
q('convert','How many symbols belong in the Blue row of a one-symbol-per-vote graph?','2','5','12','The table records two Blue votes.','testtab'),
q('category_order','A second graph lists Gold, Red, Blue with counts 5, 5, 2. Does it match this table?','Yes; each colour keeps its count','No; Gold must be last','No; equal counts cannot be graphed','Different category order does not alter the data.','testtab'),
q('graph_features','Which feature tells you that each picture represents one vote?','The key','The title alone','The number of rows','A key specifies the value of a symbol.','testpic'),
q('add_vote','One additional vote is recorded for Blue. Which new set of counts is correct?','Red 5; Blue 3; Gold 5','Red 6; Blue 3; Gold 6','Red 5; Blue 1; Gold 5','Add one only to Blue’s count of two.','testtab'),
q('graph_error','A bar graph made from this table has heights Red 5, Blue 5, Gold 2. What is wrong?','Blue and Gold have the wrong heights','Red needs a height of 2','The total must be 15','Blue should be 2 and Gold should be 5.','testtab'),
q('fair_symbols','Red has five small symbols and Gold five very large symbols, each worth one vote. What is true?','Their counts are equal, but the sizes may mislead','Gold must have more votes','Red must have more votes','Five one-vote symbols represent five votes whatever their size; consistent size is clearer.'),
q('common_feature','Which feature should a table and graph of the same colour survey both preserve?','Each colour’s number of votes','The same type of border','The same height on the page','Changing representation must not change category counts.'),
q('conclusion','Can this graph tell which colour every child in the whole school prefers?','No; it shows only the recorded survey votes','Yes; every survey includes the whole school','Yes; a tall bar proves everyone agrees','Do not claim the data represent people who were not included.','testbar'),
q('software_check','A graphing tool draws a bar to 4 although its source table says 5. What should you do?','Correct the graph to match the source count','Change the source count to 4 without checking','Hide the axis numbers','The display must represent the recorded data accurately.'),
task('draw_graph','Create a picture graph from this table, including a title, labels and key.','Red 5, Blue 2, Gold 5 equal-sized symbols; one symbol means one vote.','Check exact counts and a stated one-to-one key.','testtab'),
task('bar_from_picture','Create a bar graph from this picture graph, on paper or using software.','Red, Blue, Gold bars with counts 5, 2, 5, a uniform count scale beginning at zero and labels.','Require the category counts to match the source; accept horizontal or vertical bars.','testpic'),
task('compare','Compare a bar graph and picture graph of Red 5, Blue 2, Gold 5. Give one similarity and one difference.','Both show Red and Gold tied and Blue lowest. One uses bar lengths/heights; the other repeats symbols.','Accept another valid shared data fact and a genuine representational difference.')]
write('AC9M2ST02',P,T,V)
