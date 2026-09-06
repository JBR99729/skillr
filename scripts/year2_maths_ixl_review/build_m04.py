from common import *
V={}
def c(h,m):
    k=f'{h}:{m:02d}';V[k]=(clock(h,m),f'Analogue clock: short hand at the position for {h}:{m:02d}; long hand at {12 if m==0 else m//5}.');return k
P=[
q('whole_hour','Read the clock. What time is shown?','4:00','12:20','4:30','The short hand points to 4 and the long hand to 12, so it is four o’clock.',c(4,0)),
q('hand_roles','Which hand shows the minutes on this clock?','The longer blue hand','The shorter dark hand','Both hands show only hours','The longer hand shows minutes; the shorter hand shows the hour.',c(8,15)),
q('half_hour','Which time matches this clock?','Half past 2','Half past 3','2 o’clock','The short hand is halfway from 2 to 3 and the long hand points to 6.',c(2,30)),
q('quarter_past','Read the clock in words.','Quarter past 7','Quarter to 7','Half past 7','The long hand at 3 shows a quarter-hour after 7.',c(7,15)),
q('quarter_to','Which time is shown on this clock?','Quarter to 6','Quarter past 5','Quarter to 5','The long hand at 9 leaves a quarter-hour until 6; the short hand is approaching 6.',c(5,45)),
q('digital_match','Choose the digital time for this clock.','9:30','9:06','10:30','The long hand at 6 means 30 minutes, not 6 minutes. The hour already passed is 9.',c(9,30)),
q('quarter_digital','What digital time matches the hands?','11:15','11:03','3:55','The long hand at 3 means 15 minutes; the short hand is just past 11.',c(11,15)),
q('twelve','Both hands point to 12. What is the time?','12 o’clock','Half past 12','Quarter to 12','At twelve o’clock both hands point to 12.',c(12,0)),
q('hour_between','At half past 8, where should the short hand be?','Halfway between 8 and 9','Exactly on 8','Exactly on 9','The hour hand moves steadily and is halfway to the next hour at half past.'),
q('minute_position','At quarter past 10, which number does the long hand point to?','3','10','6','A quarter-hour is 15 minutes, shown by the long hand at 3.'),
q('quarter_to_hour','Read this clock. Which hour comes next?','1 o’clock','12 o’clock','2 o’clock','It is 12:45; the short hand is approaching 1.',c(12,45)),
q('midnight_no_context','This clock shows 6:00. Can its hands alone tell you whether it is morning or evening?','No; the hands look the same at both times','Yes; morning uses the long hand','Yes; evening puts the short hand on 12','An ordinary 12-hour clock repeats the same hand positions twice each day.',c(6,0)),
q('read_quarter_to','A child calls this “quarter to 10”. What should they say?','Quarter to 11','Quarter past 10','Half past 10','The short hand is between 10 and 11, nearly at 11. Quarter to names the next hour.',c(10,45)),
q('minutes_not_numeral','Why does the long hand at 6 mean half past?','It has travelled halfway round the clock','It means 6 minutes have passed','The short hand has reached the next hour','Half a circle is half an hour, or 30 minutes.'),
q('same_words','Which phrase means 3:45?','Quarter to 4','Quarter past 3','Quarter to 3','At 3:45, a quarter-hour remains until 4 o’clock.'),
q('hour_not_nearest','The short hand is between 7 and 8, nearer 8. The long hand is on 9. What time is it?','7:45','8:45','7:15','The hour hand has not reached 8. The long hand at 9 shows 45 minutes after 7.'),
q('read_half_twelve','Read the clock.','Half past 12','Half past 1','12 o’clock','The short hand is halfway between 12 and 1, so the hour already passed is 12.',c(12,30)),
q('select_words','Which label belongs under this clock?','Quarter past 1','Quarter to 1','Half past 1','The short hand is just after 1 and the long hand at 3 shows a quarter past.',c(1,15)),
q('quarter_fraction','The long hand moves from 12 to 3. What fraction of an hour passes?','One quarter','One half','One whole','The long hand moves through one of four equal quarters of its circle.'),
q('repair_hands','A drawing labelled 4:30 has its long hand on 6 and short hand exactly on 4. What needs fixing?','Move the short hand halfway towards 5','Move the long hand to 3','Move the short hand to 6','At half past, the hour hand must also have moved half the distance to the next hour.'),
q('read_reverse_roles','A clock has its short hand at 3 and long hand at 12. A child says 12:15. What is the time?','3:00','12:03','3:15','The short hand gives the hour, 3; the long hand at 12 gives zero minutes.'),
q('read_near_twelve','What time does this clock show?','Quarter to 12','Quarter past 11','Quarter to 11','The long hand at 9 and short hand approaching 12 show 11:45.',c(11,45)),
task('draw_half','Draw an analogue clock showing half past 5. Use hands of different lengths.','Long hand at 6; short hand halfway between 5 and 6.','Accept a clear numbered clock with these positions; the hour hand must not remain exactly on 5.'),
task('explain_reading','Read this clock aloud or write its time. Explain what each hand tells you.','Quarter to 3, or 2:45. Long hand at 9; short hand between 2 and 3, approaching 3.','Accept either time form with both hand roles correctly explained.',c(2,45))]
T=[
q('whole','What is the time on this clock?','8:00','12:40','8:30','The short hand is at 8; the long hand is at 12.',c(8,0)),
q('half','Which label matches the clock?','Half past 6','Half past 7','6 o’clock','The short hand is halfway from 6 to 7; the long hand is at 6.',c(6,30)),
q('past','Read the clock in words.','Quarter past 4','Quarter to 4','Quarter past 3','The long hand is at 3 and the short hand is just past 4.',c(4,15)),
q('to','Which phrase describes this clock?','Quarter to 9','Quarter past 8','Quarter to 8','The next hour is 9, with a quarter-hour still to go.',c(8,45)),
q('digital','Which digital time shows the same time?','10:30','10:06','11:30','The hour already passed is 10 and the minute hand shows 30.',c(10,30)),
q('twelve_past','What time is shown?','12:15','1:15','12:03','The short hand is just past 12; the long hand at 3 means 15 minutes.',c(12,15)),
q('hour_position','At quarter to 5, where is the short hand?','Between 4 and 5, nearer 5','Exactly on 5','Between 5 and 6','Quarter to 5 is 4:45; the hour hand approaches 5.'),
q('minute_role','At 7:30, which number does the long hand point to?','6','7','3','Thirty minutes is halfway round from 12 to 6.'),
q('read_to','A child says this clock is 4:45. What is the correct reading?','3:45','4:15','3:30','The short hand has passed 3 but not reached 4; the long hand is at 9.',c(3,45)),
q('matching_phrase','Which time means quarter past 9?','9:15','9:45','9:30','A quarter-hour after 9 is 15 minutes after 9.'),
q('whole_or_half','How do the minute hands differ at 2:00 and 2:30?','They point to 12 and 6','They point to 2 and 3','They both point to 2','Zero minutes is shown at 12; thirty minutes is shown at 6.'),
q('boundary_to','This clock is a quarter-hour before which whole hour?','7 o’clock','6 o’clock','8 o’clock','It shows 6:45, which is quarter to 7.',c(6,45)),
q('explain_minutes','A learner reads the long hand on 3 as 3 minutes. What should they use for a quarter-past time?','15 minutes','30 minutes','45 minutes','The numeral 3 marks a quarter of the minute hand’s full journey.'),
q('draw_error','A clock labelled 11:15 has the long hand at 3. Which short-hand position is correct?','A little past 11','Exactly on 3','Halfway between 11 and 12','At quarter past, the hour hand has moved a quarter of the way to the next numeral.'),
task('read_explain','Write the time shown and explain why the hour is not 6.','5:30, or half past 5. The short hand is between 5 and 6 and has not reached 6.','Require the correct time and a valid explanation using the hour hand.',c(5,30)),
task('draw_quarter_to','Draw a clock showing quarter to 2. Explain the long hand’s position.','Long hand at 9; short hand between 1 and 2, nearer 2. The time is 1:45.','Check both hands. Accept an explanation that one quarter-hour remains until 2.')]
write('AC9M2M04',P,T,V)
