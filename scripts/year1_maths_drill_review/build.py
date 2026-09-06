"""Authored, scoped replacement for the Year 1 number/place-value daily drill.
No Practice/Test banks, topic guides, worksheets or teacher slides are rebuilt.
"""
import json
from pathlib import Path
from html import escape

ROOT = Path(__file__).resolve().parents[2]
SLUG = 'numbers-place-value-to-120'
VERSION = '20260906-y1-number-drill-r1'
items = []
positions = {'AC9M1N01': 0, 'AC9M1N02': 0}
code = 'AC9M1N01'

def svg(title, body, width=440, height=190):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" role="img" aria-label="{escape(title, quote=True)}" style="width:100%;max-width:{width}px;height:auto"><title>{escape(title)}</title><g font-family="Arial,sans-serif" font-size="18" fill="#16324f" stroke-width="1.5">{body}</g></svg>'

def text(x,y,t,size=18):
    return f'<text x="{x}" y="{y}" font-size="{size}" text-anchor="middle">{escape(str(t))}</text>'

def model(tens, ones, hundreds=0):
    body=text(220,24,'Each long bar is 10. Each small square is 1.',16)
    x=15
    if hundreds:
        body+=text(65,45,'100',16)
        for r in range(10):
            for c in range(10): body+=f'<rect x="{15+c*9}" y="{55+r*9}" width="9" height="9" fill="#c7e6f4" stroke="#16324f"/>'
        x=130
    for t in range(tens):
        for r in range(10):body+=f'<rect x="{x+t*17}" y="{55+r*9}" width="11" height="9" fill="#c7e6f4" stroke="#16324f"/>'
    start=x+tens*17+15
    for o in range(ones):body+=f'<rect x="{start+(o%5)*15}" y="{60+(o//5)*20}" width="11" height="11" fill="#f7db91" stroke="#16324f"/>'
    alt=f'{hundreds} hundreds, {tens} bars of ten and {ones} single squares.'
    return {'kind':'blocks','tens':tens,'ones':ones,'hundreds':hundreds,'alt':alt,'html':svg(alt,body)}

def line(labels, marks=None):
    body='<line x1="30" y1="70" x2="410" y2="70" stroke="#16324f"/>'
    step=380/(len(labels)-1)
    for i,label in enumerate(labels):
        x=30+i*step
        body+=f'<line x1="{x}" y1="61" x2="{x}" y2="79" stroke="#16324f"/>'+text(x,106,label)
        if marks and i in marks:body+=f'<circle cx="{x}" cy="70" r="5" fill="#16324f"/>'+text(x,47,marks[i])
    alt='Equally spaced number-line ticks: '+', '.join(map(str,labels))+'.'
    if marks:alt+=' Marked points: '+', '.join(f'{v} at tick {i+1}' for i,v in marks.items())+'.'
    return {'kind':'line','labels':labels,'marks':marks or {},'alt':alt,'html':svg(alt,body,height=130)}

def chart(rows):
    body=''
    for r,row in enumerate(rows):
        for c,value in enumerate(row):
            body+=f'<rect x="{10+c*42}" y="{10+r*38}" width="42" height="38" fill="#fff" stroke="#16324f"/>'+text(31+c*42,36+r*38,value,16)
    alt='Number chart rows: '+'; '.join(', '.join(map(str,r)) for r in rows)+'.'
    return {'kind':'chart','rows':rows,'alt':alt,'html':svg(alt,body,height=25+len(rows)*38)}

def counters(left,right):
    body=''
    for group,(n,x0) in enumerate([(left,12),(right,228)]):
        body+=f'<rect x="{x0}" y="20" width="200" height="125" rx="8" fill="none" stroke="#16324f"/>'
        for i in range(n):body+=f'<circle cx="{x0+25+(i%5)*36}" cy="{48+(i//5)*34}" r="10" fill="{["#b9dded","#f7db91"][group]}" stroke="#16324f"/>'
    alt=f'Two separate mats hold {left} and {right} counters.'
    return {'kind':'counters','left':left,'right':right,'alt':alt,'html':svg(alt,body,height=165)}

def parts(whole,left,right):
    body='<path d="M220 63 L115 112 M220 63 L325 112" fill="none" stroke="#16324f"/>'
    for x,y,v in [(220,38,whole),(115,134,left),(325,134,right)]:
        body+=f'<ellipse cx="{x}" cy="{y}" rx="52" ry="25" fill="#fff" stroke="#16324f"/>'+text(x,y+6,v)
    alt=f'Part-whole diagram. Whole: {whole}. Parts: {left} and {right}.'
    return {'kind':'parts','whole':whole,'left':left,'right':right,'alt':alt,'html':svg(alt,body,height=175)}

def frame(filled):
    body=''
    for i in range(10):
        x=70+(i%5)*60;y=25+(i//5)*60
        body+=f'<rect x="{x}" y="{y}" width="60" height="60" fill="#fff" stroke="#16324f"/>'
        if i<filled:body+=f'<circle cx="{x+30}" cy="{y+30}" r="17" fill="#b9dded" stroke="#16324f"/>'
    alt=f'A two-row ten-frame with {filled} counters, placed from left to right.'
    return {'kind':'ten-frame','filled':filled,'alt':alt,'html':svg(alt,body,height=165)}

def q(area,task,level,prompt,answer,wrong,why,hint,misconception,visual=None):
    n=1+sum(x['curriculumCode']==code for x in items)
    item={'id':f'daily-y1-{code.lower()}-r1-{n:03}', 'year':'1','subject':'math','skill':SLUG,
          'curriculumCode':code,'learningArea':f'{code}:{area}','bank':'daily-drill',
          'difficulty':{'recognition':1,'application':2,'reasoning':3}[level],'question':prompt,'audioPrompt':prompt,'explanation':why,'hint':hint,
          'source':VERSION,'printable':True,
          'editorialReview':{'status':'reviewed','date':'2026-09-06','version':VERSION,
            'coverageComponent':area,'taskType':task,'cognitiveDemand':level,
            'misconception':misconception,'reviewRecord':'docs/question-bank-reviews/2026-09-06-year1-maths-drills-n01-n02.md'}}
    if wrong is None:
        item.update(type='number',correct=answer,tolerance=0,placeholder='Type a number')
    else:
        options=[str(answer),*map(str,wrong)]
        assert len(options)==len(set(options))==3
        p=sum(positions.values())%3;positions[code]+=1
        options.insert(p,options.pop(0))
        item.update(type='single',answers=options,correct=p)
    if visual:item.update(visual=visual['alt'],visualHtml=visual['html'],visualModel={k:v for k,v in visual.items() if k not in ['html','alt']})
    items.append(item)

# AC9M1N01: recognition -> application -> reasoning; every row is authored.
q('number-names','words-to-numeral','recognition','Write sixty-seven using digits.',67,None,'Sixty is 60 and seven is 7. Together they make 67.','Find the tens part, then the ones part.','Reversing the tens and ones.')
q('number-names','numeral-to-name','recognition','Choose the name for 90.','ninety',['nineteen','nine'],'The 9 in 90 means nine tens. Nine tens is ninety.','Check whether the 9 is in the tens or ones place.','Confusing a teen number with a multiple of ten.')
q('number-names','teen-name','recognition','The number card says nineteen. Which numeral belongs on its back?','19',['90','91'],'Nineteen is one ten and nine ones, so its numeral is 19.','A teen number has one ten.','Treating nineteen as ninety or reversing 19.')
q('number-names','hundred-name','recognition','Write one hundred and five using digits.',105,None,'One hundred and five has 1 hundred, 0 tens and 5 ones: 105.','Keep a place for the zero tens.','Omitting the zero in a three-digit number.')
q('models','read-two-digit-model','recognition','How many squares does this model represent?',36,None,'Three bars represent 30 squares. The 6 single squares make 36 altogether.','Count the bars as tens, then count the single squares.','Counting each bar as one.',model(3,6))
q('models','read-boundary-model','recognition','Write the number shown by the hundred square and the two tens bars.',120,None,'The hundred square represents 100. Two tens add 20, so the model represents 120.','Combine the hundred with the two tens.','Reading two tens as two ones.',model(2,0,1))
q('models','match-numeral-to-materials','recognition','Which collection represents 48?','4 bundles of ten and 8 loose sticks',['8 bundles of ten and 4 loose sticks','4 bundles of ten and 7 loose sticks'],'Four tens make 40. Eight more make 48; swapping the parts would make 84.','Use the value of each bundle, not just the number of bundles.','Reversing digits or counting one short.')
q('models','zero-tens-representation','recognition','A tub holds 100 buttons. Which extra buttons make the total 107?','7 loose buttons',['7 bundles of ten','1 bundle of ten and 7 loose buttons'],'107 is 100 and 7 more. Adding a ten as well would make 117.','Read the tens digit in 107.','Adding a ten where the numeral has zero tens.')
q('number-names','distinguish-hundred-names','application','A label reads 110. Which name should you read aloud?','one hundred and ten',['one hundred and one','eleven'],'110 is one hundred plus one ten. It has no extra ones.','Read the hundreds, tens and ones in order.','Confusing 110, 101 and 11.')
q('models','place-value-table','application','A place-value chart has 1 in Hundreds, 1 in Tens and 7 in Ones. Write the number.',117,None,'The chart shows 100 + 10 + 7, which is 117.','Give each digit the value of its column.','Adding the digits instead of their values.')
q('models','zero-ones','application','Six bundles each hold ten straws. There are no loose straws. Which number label fits?','60',['6','16'],'Six groups of ten make 60. The zero shows there are no loose ones.','Count 10 for each bundle.','Counting the bundles as six individual straws.')
q('comparison','reversed-digits','application','Which is greater: 93 or 39?','93',['39','They are equal'],'93 has nine tens; 39 has only three tens. Compare the tens before the ones.','The same digits can have different place values.','Thinking digit order does not change a number.')
q('comparison','tens-before-ones','application','Why is 52 greater than 49?','Five tens are more than four tens.',['The 2 is greater than the 9.','52 has more digits than 49.'],'52 has five tens. Even with nine ones, 49 has not reached five tens.','Compare the tens before looking at the ones.','Comparing only ones or counting digits unnecessarily.')
q('comparison','equal-different-models','application','One tray has 4 bundles of ten and 2 loose beads. Another has 3 bundles of ten and 12 loose beads. Compare the totals.','Both have 42 beads.',['The first has more beads.','The second has more beads.'],'Both models represent 42. One ten in the second model is shown as 10 loose beads.','Work out each total before comparing.','Judging by the number of pieces instead of their value.')
q('comparison','symbol-direction','application','Choose the sign for 86 □ 68.','>',['<','='],'86 has eight tens and 68 has six tens, so 86 is greater. The sign opens towards 86.','Find the greater number before choosing the sign.','Reversing the comparison sign.')
q('comparison','equality','application','Fill the gap: 101 is ___ 101.','equal to',['less than','greater than'],'The two numerals name the same quantity. Neither number is more or less.','Compare all three places.','Assuming every comparison needs a bigger and smaller number.')
q('comparison','context-fewer','application','A library has 72 storybooks and 27 information books. Which type has fewer books?','information books',['storybooks','Both types have the same number.'],'27 is less than 72 because two tens are fewer than seven tens. There are fewer information books.','Fewer means a smaller number.','Choosing the larger quantity when asked for fewer.')
q('ordering','three-numerals','application','Choose the list that goes from smallest to greatest.','43, 46, 64',['64, 46, 43','43, 64, 46'],'43 and 46 both have four tens, so compare their ones. Both come before 64, which has six tens.','Compare the tens; use ones to break a tie.','Reversing the direction or misplacing a number with different tens.')
q('number-lines','missing-unit-tick','application','What number belongs at the question mark?',68,None,'Each tick increases by 1. After 67 comes 68, then 69.','Use both neighbours of the missing label.','Skipping a number or counting the first tick twice.',line([66,67,'?',69,70]))
q('number-lines','read-marked-point','application','What number does point A show?',96,None,'Point A is on the tick labelled 96. Every neighbouring tick changes by 1.','Match the point to the tick directly below it.','Reading a nearby label instead of the marked tick.',line([94,95,96,97,98],{2:'A'}))
q('number-lines','compare-marked-points','application','Which marked point shows the greater number?','B',['A','They show the same number.'],'B is at 118, to the right of A at 115. Numbers increase as you move right on this line.','Use position on the line to compare.','Treating left as the greater direction.',line([114,115,116,117,118,119],{1:'A',4:'B'}))
q('charts','missing-chart-cell','application','Write the missing number in this chart.',74,None,'The row counts 71, 72, 73, 74, 75. The missing cell is also directly below 64.','Count across by ones or down by tens.', 'Confusing a move of one with a move of ten.',chart([list(range(61,71)),[71,72,73,'?',75,76,77,78,79,80]]))
q('charts','vertical-step','application','On this chart, which number is directly below 58?','68',['59','48'],'A move down one row adds one ten. The number below 58 is 68.','Stay in the same column.','Moving sideways or upwards instead of down.',chart([list(range(51,61)),list(range(61,71))]))
q('charts','row-boundary','application','Read the chart. What number comes immediately after 100?',101,None,'After the last number in the 91–100 row, counting continues at 101 on the next row.','Continue at the left of the next row.','Jumping to 110 or restarting at 1.',chart([list(range(91,101)),list(range(101,111))]))
q('charts','repair-chart','reasoning','One label is wrong in this row. Which number should replace 87?',97,None,'The row counts on by ones from 91 to 100. Between 96 and 98 belongs 97, not 87.','Check the labels on both sides of the mistake.','Keeping the right ones digit but using the wrong tens.',chart([[91,92,93,94,95,96,87,98,99,100]]))
q('ordering','cross-ten-boundary','reasoning','A ticket number is between 109 and 111. Write the number.',110,None,'Counting by ones gives 109, 110, 111. The middle number is 110.','Count on one from the smaller number.','Writing 101 when crossing from 109 to 110.')
q('number-lines','backwards-through-hundred','reasoning','Start at 101 and move three ticks to the left. Where do you land?',98,None,'The three moves land on 100, then 99, then 98. The starting point is not a move.','Count moves, not the starting tick.','Counting the starting position as the first move.',line([97,98,99,100,101,102]))
q('number-names','missing-zero-error','reasoning','A child writes 18 for one hundred and eight. What is missing?','A zero in the tens place.',['A zero after the 8.','Another 1 before the 8.'],'One hundred and eight is 108: 1 hundred, no tens and 8 ones. A zero holds the tens place.','Show hundreds, tens and ones separately.','Placing a zero at the end instead of in the empty place.')
q('ordering','construct-smallest','reasoning','Use the digits 2 and 8 once each. Write the smaller two-digit number.',28,None,'Putting 2 in the tens place makes 28. Reversing the digits makes 82, which has more tens.','Give the smaller digit the greater place value.','Putting the larger digit in the tens place.')
q('ordering','constrained-construction','reasoning','Use 1, 2 and 0 once each. Which number can go on a chart from 1 to 120?','120',['201','210'],'120 is on the chart. Both 201 and 210 are greater than its last number, 120.','Check each number against the chart limit.','Choosing a rearrangement without checking the range.')
q('number-names','name-error','reasoning','A card shows 35, but its name says fifty-three. Which part of the name must change?','It should say thirty-five.',['It should say thirty.','It should say fifty-five.'],'35 has three tens and five ones. The number name must keep those place values in that order.','Read the tens digit first.','Reversing the number name or dropping the ones.')
q('ordering','insert-number','reasoning','The cards 107, 110 and 112 are in order. Where does 109 belong?','Between 107 and 110.',['Before 107.','Between 110 and 112.'],'109 is greater than 107 but less than 110, so it fits between them.','Compare the new card with both neighbours.','Comparing the last digit without its place value.')
q('ordering','strict-between','reasoning','Choose a number greater than 65 and less than 68.','66',['65','68'],'66 meets both conditions. The words greater than and less than leave out 65 and 68.','Check both ends of the range.','Including an endpoint in a strict range.')
q('number-lines','infer-hidden-label','reasoning','The labels 52 and 54 are two equal steps apart. What number is at the middle tick?',53,None,'Two unit steps take you from 52 to 54. The middle tick is one step after 52, at 53.','Use the equal spacing and both labelled ends.','Jumping two numbers at a single tick.',line([51,52,'?',54,55]))
q('number-lines','ten-step-scale','reasoning','This line goes up by tens. Write the missing label.',110,None,'The labels increase by 10: 80, 90, 100, 110, 120. One step after 100 is 110.','Check the size of each step before counting.','Assuming every number line goes up by one.',line([80,90,100,'?',120]))
q('charts','read-position-above-hundred','reasoning','Find 119 in this chart. Which number sits immediately above it?','109',['118','120'],'The number above 119 is in the same column, one ten less: 109.','Keep the column and move one row up.','Confusing a vertical neighbour with a horizontal neighbour.',chart([list(range(101,111)),list(range(111,121))]))
q('models','representation-over-ten-ones','reasoning','Nine bundles hold ten buttons each. There are also 18 loose buttons. Write the total.',108,None,'Nine tens make 90. Ten of the loose buttons complete 100, leaving 8 more: 108.','Use ten loose buttons to complete a hundred.','Joining the written counts as 918 instead of combining their values.')
q('charts','use-two-directions','reasoning','A chart cell is covered. It is below 94 and just before 105. What number is covered?',104,None,'The number one ten after 94 is 104. It is also one less than 105, so both clues agree.','Use the row clue and the column clue.','Using only one clue or changing the wrong place.')
q('models','quantity-after-rearrangement','reasoning','A collection has 61 shells. The shells are spread out without adding or removing any. Which number label still fits?','61',['60','62'],'Moving the shells changes their spacing, not how many there are. The collection still has 61 shells.','Ask whether any shells were added or removed.','Thinking a spread-out collection contains more.')
q('number-lines','read-five-step-interval','reasoning','The ticks are equally spaced. Which number belongs at A?','95',['91','99'],'There are two equal steps from 90 to 100, so each step is 5. A is one step after 90, at 95.','Share the gap from 90 to 100 into two equal steps.','Assuming an unlabelled tick must be one more.',line([90,'A',100,105,110]))

code = 'AC9M1N02'
q('single-digit-parts','read-split-collection','recognition','How many counters are on the two mats altogether?',7,None,'The parts are 3 and 4. Joining those parts makes a whole of 7.','Count each mat, then combine the two parts.','Reporting just one part as the whole.',counters(3,4))
q('single-digit-parts','missing-part','recognition','Nine counters are split into two parts. One part has 6. How many are in the other part?',3,None,'Six and three make nine. The missing part is 3, not the whole of 9.','Count on from 6 until you reach 9.','Repeating the whole or the known part.',parts(9,6,'?'))
q('single-digit-parts','choose-parts','recognition','Which two parts make a whole of 8?','5 and 3',['8 and 5','4 and 3'],'Five counters and three counters make eight. The two parts together must equal the whole.','Combine both parts before choosing.','Using the whole as an extra part or stopping one short.')
q('single-digit-parts','alternative-partition','recognition','Six counters are split as 1 and 5. Choose another split of all 6 counters.','2 and 4',['2 and 5','1 and 4'],'2 and 4 also make 6. Both splits keep the same total of counters.','The parts can change while the whole stays the same.','Changing the whole when changing the parts.')
q('single-digit-parts','empty-part','recognition','All 7 counters are on one mat. The other mat is empty. Which split shows this?','7 and 0',['7 and 1','0 and 0'],'An empty mat has 0 counters. Seven and zero still make a whole of seven.','Use zero for a part with nothing in it.','Treating an empty part as one or ignoring the non-empty part.',counters(7,0))
q('single-digit-parts','move-between-parts','application','Eight counters are split as 2 and 6. Move one counter from the group of 6 to the group of 2. What are the new parts?','3 and 5',['3 and 6','1 and 7'],'One part gains a counter and the other loses one: 3 and 5. The whole stays 8.','Change both parts when a counter moves between them.','Increasing one part without decreasing the other.')
q('single-digit-parts','three-parts','application','Which three parts can be joined to make 10?','4, 3 and 3',['4, 3 and 2','4, 4 and 4'],'4 and 3 make 7; three more make 10. A whole can have more than two parts.','Combine all three parts.','Leaving out a part or assuming parts must all be equal.')
q('single-digit-parts','complete-ten-frame','application','The frame has 10 places. Four hold counters. How many more counters would fill it?',6,None,'The whole frame holds 10 counters. Four are already there, so the missing part is 6. Four and six make ten.','Count the empty places, not the counters already shown.','Reporting the filled part instead of the missing part.',frame(4))
q('teen-parts','ten-and-extra','recognition','Complete the split: 16 = 10 + ___.',6,None,'One ten and six ones make sixteen. The missing part is six.','Use the ones left after making a ten.','Writing the whole number as the missing part.')
q('teen-parts','non-ten-teen-split','application','Each mat has 9 counters. Which whole is split across them?','18',['19','9'],'Nine and nine make eighteen. Neither part has to be ten for the whole to be a teen number.','Combine both groups of nine.','Counting one group only or adding an extra counter.',counters(9,9))
q('teen-parts','equation-from-parts','application','A whole of 13 is split into parts of 10 and 3. Which number sentence records the split?','13 = 10 + 3',['13 + 10 = 3','13 = 1 + 3'],'The two parts, 10 and 3, join to make the whole, 13. The equals sign shows both sides have the same value.','Put the whole on one side and its combined parts on the other.','Treating a tens part as one or reversing part and whole.')
q('teen-parts','whole-from-unfamiliar-parts','application','A tray has two sections: 7 counters in one and 8 in the other. Write the whole number of counters.',15,None,'Move 3 from the group of 8 to the group of 7 to make 10 and 5. The whole is 15.','You can rearrange the parts to make a ten.','Counting only the larger part.')
q('standard-place-value','number-of-tens','recognition','In the usual tens-and-ones split of 47, how many tens are there?',4,None,'47 splits into 4 tens and 7 ones. Four tens have a value of 40.','The tens digit counts groups of ten.','Answering the value 40 when asked for the number of tens.')
q('standard-place-value','zero-ones','recognition','Which is the usual tens-and-ones split of 70?','7 tens and 0 ones',['0 tens and 7 ones','7 tens and 1 one'],'Seven tens make 70. The zero ones digit means there are no extra ones.','Look at both places, including the zero.','Ignoring the zero or reversing the two places.')
q('standard-place-value','value-of-tens-part','application','Split 82 into its tens value and its ones: 82 = ___ + 2.',80,None,'The 8 in the tens place is worth 80. The parts are 80 and 2.','Write the value of eight tens.','Writing 8 instead of the value of 8 tens.')
q('standard-place-value','combine-model-parts','recognition','Join the tens and ones in this model. Write the whole.',29,None,'Two tens are worth 20. Nine ones make the whole 29.','Count tens first, then add the single ones.','Joining the number of pieces rather than their values.',model(2,9))
q('standard-place-value','digit-value','application','In 56, what is the value of the digit 5?',50,None,'The 5 is in the tens place. It represents five tens, or 50.','A digit in the tens place counts tens.','Giving the digit rather than its value.')
q('standard-place-value','expanded-parts','application','Which two parts make 26 using tens and ones?','20 and 6',['2 and 6','60 and 2'],'Two tens are 20. Combine 20 and 6 to make 26.','Write the value of each place.','Adding the face values of the digits or reversing places.')
q('flexible-parts','non-standard-model','application','This model has more than 9 single squares. What whole number does it represent?',34,None,'Two tens make 20. The 14 ones make another ten and four ones, so the whole is 34.','Make a new ten from ten of the single squares.','Reading 2 tens and 14 ones as 214.',model(2,14))
q('flexible-parts','exchange-ten-for-ones','application','A model of 62 has 6 tens and 2 ones. Exchange one ten for ones. Which parts will you have?','5 tens and 12 ones',['5 tens and 2 ones','6 tens and 12 ones'],'The exchange removes one ten and adds ten ones. Five tens and twelve ones still make 62.','Both parts change, but the total must stay 62.','Losing or creating ten during an exchange.')
q('flexible-parts','bundle-extra-ones','application','A collection has 3 tens and 17 ones. Make as many tens as you can. How many tens will there be?',4,None,'Ten of the 17 ones make one new ten. There are now 4 tens and 7 ones.','Bundle ten loose ones into one ten.','Counting all 17 ones as a new ten without keeping the remainder.')
q('standard-place-value','materials-constraint','reasoning','You are making 59 with tens bundles. Why do you also need loose ones?','Five tens make 50, so 9 ones are still needed.',['Five tens already make 59.','Nine tens and five ones make 59.'],'Tens alone make numbers ending in zero. To make 59 from 50, add nine loose ones.','Compare 59 with the nearest lower multiple of ten.','Thinking tens bundles can represent any final digit without ones.')
q('flexible-parts','exchange-two-tens','reasoning','Seven tens and 20 ones are all bundled into tens. How many tens are there now?',9,None,'Twenty ones make two tens. Add those to the seven tens to get nine tens.','There are two full groups of ten among the loose ones.','Bundling 20 ones as only one ten.')
q('flexible-parts','non-standard-additive-part','application','A whole of 68 is split into 40 and another part. What is the other part?',28,None,'40 and 20 make 60; another 8 makes 68. The missing part is 28.','Keep the whole 68 while using 40 as one part.','Keeping only the ones digit for every missing part.',parts(68,40,'?'))
q('flexible-parts','two-non-tens-parts','reasoning','Which split keeps the whole at 31?','16 and 15',['16 and 14','30 and 2'],'16 and 14 would make 30. One more in the second part makes 16 and 15 equal to 31.','Compare a proposed split with a nearby whole you know.','Stopping at the nearest ten rather than the given whole.')
q('flexible-parts','whole-left-missing-part','application','Find the covered part: 54 = 20 + ___.',34,None,'54 can be split into 20 and 34. Two tens and three tens make five tens, with 4 ones left.','Separate the tens already used from the tens still needed.','Subtracting digits independently without keeping place values.')
q('conservation','repair-failed-exchange','reasoning','A model shows 52. After an exchange it has only 4 tens and 2 ones. What needs to be put back?','10 ones',['1 one','2 ones'],'Four tens and two ones make 42. The removed ten should have been replaced by ten ones to keep 52.','An exchange must not change the whole.','Removing a ten without replacing its value.')
q('standard-place-value','diagnose-face-value-error','reasoning','A child writes 43 = 4 + 3. What change makes the split correct?','Change 4 to 40.',['Change 3 to 30.','Swap the 4 and the 3.'],'The 4 in 43 means four tens, or 40. The correct split is 43 = 40 + 3.','Check the value of the tens digit.','Using both digits as ones.')
q('standard-place-value','model-reversal-check','reasoning','This model is labelled 73. Write the number that should replace the label.',37,None,'The model has 3 tens and 7 ones, so it represents 37. The label has reversed the places.','Let the bars decide the tens digit.','Reversing the labels for tens and ones.',model(3,7))
q('flexible-parts','compare-two-non-standard-splits','reasoning','Which statement about 75 is true?','Both 6 tens + 15 ones and 5 tens + 25 ones make 75.',['Only 6 tens + 15 ones makes 75.','Only 5 tens + 25 ones makes 75.'],'60 + 15 and 50 + 25 both make 75. Using one fewer ten needs ten more ones.','Find the value of each split.','Believing there can be only one correct non-standard split.')
q('flexible-parts','three-place-value-parts','reasoning','Choose three parts that make 92.','50, 40 and 2',['50, 4 and 2','90, 2 and 2'],'50 and 40 combine to 90. With 2 more, the whole is 92.','Combine the tens parts before adding the ones.','Losing a ten-place value or counting the ones twice.')
q('single-digit-parts','hidden-subcollection','reasoning','There are 9 counters altogether. Seven are visible and the rest are under a cup. How many are hidden?',2,None,'Seven and two make nine. The hidden part must be 2 to keep the whole at 9.','Use the whole and the visible part.','Counting only what can be seen.')
q('single-digit-parts','systematic-parts','reasoning','Eight is split in order: 0 + 8, 1 + 7, 2 + □, 3 + 5. Write the missing part.',6,None,'The first part increases by 1 while the second decreases by 1. Two and six keep the whole at eight.','Check how both parts change from one split to the next.','Increasing both parts or keeping the second part unchanged.')
q('conservation','change-both-parts','reasoning','56 is split into 30 and 26. The first part becomes 40. What must the other part become?','16',['26','36'],'The first part gains 10, so the other must lose 10. Then 40 and 16 still make 56.','Keep the whole fixed while changing both parts.','Increasing both parts or changing only one.')
q('flexible-parts','normalise-near-hundred','reasoning','Which usual tens-and-ones split matches 8 tens and 17 ones?','9 tens and 7 ones',['8 tens and 7 ones','9 tens and 17 ones'],'Ten of the 17 ones become a new ten. That leaves nine tens and seven ones, making 97.','Keep the seven ones left after bundling a ten.','Changing a part without conserving the whole.')
q('teen-parts','partition-whole-ten','reasoning','A whole of 20 has to be shown with exactly one tens bar. Which ones should go with it?','10 ones',['0 ones','20 ones'],'The bar is worth 10. Ten more ones are needed to keep the whole at 20.','Work out the part not shown by the one bar.','Assuming every model must have fewer than ten loose ones.')
q('flexible-parts','sort-by-whole','reasoning','The 24 mat already holds 20 + 4. Which extra label belongs on that same mat?','10 + 14',['40 + 2','20 + 14'],'10 and 14 also make 24. The other labels make 42 and 34, so they belong to different wholes.','Match totals, not the order of digits.','Matching similar-looking digits without finding the whole.')
q('teen-parts','equal-parts-without-half-notation','reasoning','The two parts each have 7 counters. Which whole should label the diagram?','14',['7','17'],'Seven and seven combine to fourteen. The whole counts the counters in both parts.','Include both equal parts.','Counting one part only or treating the second seven as ten.',counters(7,7))
q('conservation','different-correct-diagrams','reasoning','One diagram splits 45 into 20 and 25. Another splits it into 40 and 5. Can both diagrams be correct?','Yes. Both pairs of parts join to make 45.',['No. Only 40 and 5 can make 45.','No. Only equal-sized parts can make 45.'],'20 + 25 and 40 + 5 both equal 45. Parts do not need to be equal or be the usual tens and ones.','Check the whole represented by each diagram.','Treating the standard partition as the only valid one.')
q('flexible-parts','infer-loose-ones','reasoning','A model of 55 uses 4 tens bars. How many single squares must it also have?',15,None,'Four tens account for 40. Ten more reach 50 and five more reach 55, so 15 ones are needed.','Find the part of 55 not represented by four tens.','Using only the ones digit even when one ten is unbundled.')

assert len(items)==80, len(items)
assert all(sum(q['curriculumCode']==c for q in items)==40 for c in positions)
# Exact and number-normalised duplicate stems are blockers, not a volume target.
import re
normalised=[re.sub(r'\d+','#',q['question']).lower() for q in items]
assert len(normalised)==len(set(normalised)), 'Duplicate question structure'
assert len({q['id'] for q in items})==80
source={'version':VERSION,'year':1,'subject':'math','topic':SLUG,'bank':'daily-drill',
        'description':'Original short retrieval tasks for AC9M1N01 and AC9M1N02. This is separate from the curriculum Practice and Test banks.',
        'items':items}
out=ROOT/'assets/daily-drill-banks/year1/math'/f'{SLUG}.json'
out.parent.mkdir(parents=True,exist_ok=True)
out.write_text(json.dumps(source,indent=2,ensure_ascii=False)+'\n')
runtime=ROOT/'quiz/assets/daily-drills'/f'year1-daily-drills-math-{SLUG}-production.js'
runtime.write_text('/* Original authored drill. Source: assets/daily-drill-banks/year1/math/'+SLUG+'.json. Rebuild: python3 scripts/year1_maths_drill_review/build.py */\n'+
 'window.SkillrDailyProductionBanks=window.SkillrDailyProductionBanks||{};\n'+
 'window.SkillrDailyProductionBanks["1"]=window.SkillrDailyProductionBanks["1"]||{};\n'+
 'window.SkillrDailyProductionBanks["1"].math=window.SkillrDailyProductionBanks["1"].math||{};\n'+
 'window.SkillrDailyProductionBanks["1"].math['+json.dumps(SLUG)+']='+json.dumps(items,indent=2,ensure_ascii=False)+';\n')
print(json.dumps({'items':len(items),'codes':{c:sum(q['curriculumCode']==c for q in items) for c in positions},'single':sum(q['type']=='single' for q in items),'number':sum(q['type']=='number' for q in items),'visuals':sum('visualHtml' in q for q in items)}))
