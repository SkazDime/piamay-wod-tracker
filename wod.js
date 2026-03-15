const programStart = new Date("2026-03-16")

function getProgramDay(){

const today = new Date()

const diff = Math.floor((today-programStart)/(1000*60*60*24))

const week = Math.floor(diff/7)+1
const day = (diff%6)+1

return {week,day}

}

const runningProgression = {

1:{easy:"1.5 mi", intervals:"4 x 400m", tempo:"1 easy + 1 tempo"},
2:{easy:"1.5 mi", intervals:"4 x 400m", tempo:"1 easy + 1 tempo"},
3:{easy:"2 mi", intervals:"4 x 400m", tempo:"1 easy + 1 tempo"},
4:{easy:"2 mi", intervals:"4 x 400m", tempo:"1 easy + 1 tempo"},

5:{easy:"2 mi", intervals:"5 x 400m", tempo:"2 tempo"},
6:{easy:"2 mi", intervals:"5 x 400m", tempo:"2 tempo"},
7:{easy:"2.5 mi", intervals:"5 x 400m", tempo:"2 tempo"},
8:{easy:"2.5 mi", intervals:"5 x 400m", tempo:"2 tempo"},

9:{easy:"2.5 mi", intervals:"6 x 400m", tempo:"2 tempo"},
10:{easy:"2.5 mi", intervals:"4 x 800m", tempo:"2 tempo"},
11:{easy:"3 mi", intervals:"6 x 400m", tempo:"2.5 tempo"},
12:{easy:"3 mi", intervals:"4 x 800m", tempo:"2.5 tempo"},
13:{easy:"3 mi", intervals:"6 x 400m", tempo:"2.5 tempo"},
14:{easy:"3 mi", intervals:"4 x 800m", tempo:"2.5 tempo"},

15:{easy:"3 mi", intervals:"6 x 400m", tempo:"race pace"},
16:{easy:"3 mi", intervals:"8 x 400m", tempo:"race pace"},
17:{easy:"2.5 mi", intervals:"6 x 400m", tempo:"race pace"},
18:{easy:"2.5 mi", intervals:"8 x 400m", tempo:"race pace"},
19:{easy:"2 mi", intervals:"6 x 400m", tempo:"race pace"},
20:{easy:"2 mi", intervals:"4 x 400m", tempo:"test prep"}

}

function generateWorkout(week,day){

const run = runningProgression[week]

if(day===1){

return `Upper Body + Intervals

Warmup
5 min jog
arm circles x15

Strength 3 rounds
Pushups 12
DB rows 12
Shoulder press 10
Plank 30 sec

Run Intervals
${run.intervals}

Rest 90 sec between intervals
`

}

if(day===2){

return `Lower Body + Core

3 rounds
Bodyweight squats 12
Reverse lunges 10 each
Glute bridge 15
Dead bugs 10 each
Side plank 20 sec
`

}

if(day===3){

return `Easy Run

Distance
${run.easy}

Goal
Conversational pace
Build aerobic endurance
`

}

if(day===4){

return `Pushup Situp Volume

4 rounds
Pushups 12
Situps 15
Plank 30 sec

Rest 60 sec
`

}

if(day===5){

return `Tempo Run

Warmup
5 min jog

Run
${run.tempo}

Goal
Moderate pace near test effort
`

}

if(day===6){

return `Recovery Day

Options
30 min walk
mobility work
light cycling
foam rolling
`

}

}

function loadWOD(){

const p = getProgramDay()

document.getElementById("weekDisplay").innerText =
"Week "+p.week+" of 20"

document.getElementById("dayDisplay").innerText =
"Day "+p.day

document.getElementById("wodContainer").innerText =
generateWorkout(p.week,p.day)

}

loadWOD()
