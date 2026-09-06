"""Eight small evidence pairs; no decorative hint cards."""
import html

def text(x,y,s,size=23):
 return f'<text x="{x}" y="{y}" font-family="Arial,sans-serif" font-size="{size}" fill="#17324d">{html.escape(s)}</text>'
def line(x,y,a,b):return f'<path d="M{x} {y} L{a} {b}" fill="none" stroke="#17324d" stroke-width="3"/>'
def face(x,y,sad=False):
 return f'<circle cx="{x}" cy="{y}" r="38" fill="#f8d5ad" stroke="#17324d" stroke-width="3"/><circle cx="{x-13}" cy="{y-7}" r="3"/><circle cx="{x+13}" cy="{y-7}" r="3"/>'+f'<path d="M{x-15} {y+17} Q{x} {y+(0 if sad else 33)} {x+15} {y+17}" fill="none" stroke="#17324d" stroke-width="3"/>'+ (f'<path d="M{x+27} {y+3} q-10 14 0 14 q10 0 0-14" fill="#4897c4"/>' if sad else '')
def bubble(s):return '<rect x="35" y="57" width="240" height="45" rx="15" fill="white" stroke="#17324d" stroke-width="2"/>'+text(54,87,s)
def plant(x,tree=False):
 stem=line(x,155,x,244)+line(x,230,x-25,264)+line(x,230,x+25,264)
 if tree:return stem+f'<circle cx="{x}" cy="140" r="44" fill="#80b982" stroke="#17324d" stroke-width="2"/>'
 return stem+f'<ellipse cx="{x-23}" cy="190" rx="25" ry="12" fill="#80b982"/><circle cx="{x}" cy="140" r="26" fill="#eeb06c" stroke="#17324d" stroke-width="2"/>'
def pair(left,right,alt):
 body='<rect width="640" height="300" fill="white"/>'+line(320,15,320,285)+text(20,35,'Image A',27)+text(340,35,'Image B',27)+left+right
 return body,alt
V={}
V[1]=pair(bubble('Good morning!')+plant(155)+face(155,141),plant(440)+line(459,141,515,110)+text(518,111,'flower',20)+line(440,211,515,200)+text(518,205,'stem',20)+line(445,250,515,259)+text(518,265,'roots',20),'Image A: a flower with a smiling face and a speech bubble saying Good morning. Image B: a plant with lines labelling flower, stem and roots.')
house='<path d="M70 170 L150 110 L230 170 V265 H70Z" fill="#f3d2a0" stroke="#17324d" stroke-width="3"/>'
V[5]=pair(bubble('Welcome, friend!')+house+face(150,210),'<rect x="350" y="200" width="45" height="60" fill="#d2c1a7"/>'+text(345,285,'Gate',20)+'<ellipse cx="560" cy="120" rx="55" ry="32" fill="#a9d6ed" stroke="#17324d"/>'+text(534,125,'Pond',20)+'<path d="M385 230 L455 230 L455 120 L500 120" fill="none" stroke="#17324d" stroke-width="5"/><path d="M490 110 L505 120 L490 130" fill="none" stroke="#17324d" stroke-width="4"/>','Image A: a house with a smiling face saying Welcome, friend. Image B: a gate, a pond and a line with an arrow leading from the gate to the pond.')
V[9]=pair(bubble('I can sing!')+plant(155,True)+face(155,144),plant(440,True)+line(477,137,520,110)+text(523,110,'leaves',20)+line(440,209,520,200)+text(523,205,'trunk',20)+line(450,250,520,260)+text(523,264,'roots',20),'Image A: a tree with a smiling face saying I can sing. Image B: a tree diagram with leaves, trunk and roots labelled.')
V[13]=pair(face(150,175,True)+text(53,260,'A story character',22),face(420,175)+line(433,168,506,135)+text(510,139,'eye',20)+line(434,192,506,224)+text(510,230,'mouth',20),'Image A: a story face with a downturned mouth and a tear. Image B: a face diagram with an eye and mouth labelled.')
cloud='<ellipse cx="150" cy="170" rx="72" ry="40" fill="#c8d9e7" stroke="#17324d"/>'
V[17]=pair(bubble('Time for a shower!')+cloud+face(150,174),'<rect x="425" y="88" width="68" height="180" fill="white" stroke="#17324d" stroke-width="3"/><rect x="428" y="186" width="62" height="79" fill="#9fcfe9"/>'+line(490,186,515,186)+text(520,193,'10 mm',20)+text(378,65,'Rain gauge',24),'Image A: a smiling cloud saying Time for a shower. Image B: a rain gauge whose water level is marked 10 mm.')
boat='<path d="M70 204 H240 L209 250 H101Z" fill="#e8b783" stroke="#17324d" stroke-width="3"/>'
V[21]=pair(bubble('Hello, waves!')+boat+text(125,235,':)',25),'<path d="M355 190 H480 L459 225 H375Z" fill="#e8b783" stroke="#17324d" stroke-width="3"/>'+line(475,145,588,145)+'<path d="M573 131 L590 145 L573 159" fill="none" stroke="#17324d" stroke-width="4"/>'+text(388,110,'Travel direction',23),'Image A: a boat with a face saying Hello, waves. Image B: a boat with an arrow pointing right labelled Travel direction.')
def butterfly(x):return f'<ellipse cx="{x-26}" cy="185" rx="28" ry="46" fill="#d4b2e1" stroke="#17324d"/><ellipse cx="{x+26}" cy="185" rx="28" ry="46" fill="#d4b2e1" stroke="#17324d"/><ellipse cx="{x}" cy="185" rx="7" ry="45" fill="#17324d"/>'
V[25]=pair(bubble('Shall we explore?')+butterfly(155),butterfly(435)+line(462,170,525,125)+text(529,131,'wing',22),'Image A: a butterfly with a speech bubble saying Shall we explore. Image B: a butterfly diagram with a wing labelled.')
V[29]=pair(bubble('Hello, world!')+'<circle cx="155" cy="186" r="52" fill="#f4d078"/>'+face(155,186),text(345,88,'Morning',22)+text(485,88,'Afternoon',22)+'<circle cx="398" cy="145" r="30" fill="#f4d078" stroke="#17324d"/><ellipse cx="550" cy="145" rx="45" ry="28" fill="#c8d9e7" stroke="#17324d"/>'+''.join(line(x,182,x-7,204) for x in [525,550,575]),'Image A: a smiling sun saying Hello, world. Image B: a morning panel with a sun and an afternoon panel with a cloud and falling rain.')
