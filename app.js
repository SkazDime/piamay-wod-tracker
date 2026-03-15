let entries = JSON.parse(localStorage.getItem("entries")) || []

document.getElementById("workoutForm").addEventListener("submit",function(e){

e.preventDefault()

const entry = {

date:date.value,
week:Number(week.value||0),
type:type.value,
duration:Number(duration.value||0),
meps:Number(meps.value||0),
avgHR:Number(avgHR.value||0),
distance:Number(distance.value||0),
runtime:Number(runtime.value||0),
pushups:Number(pushups.value||0),
situps:Number(situps.value||0),
weight:Number(weight.value||0),
waist:Number(waist.value||0),
notes:notes.value

}

entries.push(entry)

localStorage.setItem("entries",JSON.stringify(entries))

render()

})

function render(){

renderTable()
renderCharts()
renderMetrics()

}

function renderTable(){

const tbody=document.querySelector("#logTable tbody")

tbody.innerHTML=""

entries.forEach(e=>{

tbody.innerHTML+=`

<tr>

<td>${e.date}</td>
<td>${e.week}</td>
<td>${e.type}</td>
<td>${e.meps}</td>
<td>${e.pushups}</td>
<td>${e.situps}</td>
<td>${e.distance}</td>
<td>${e.weight}</td>

</tr>

`

})

}

function renderMetrics(){

let weeklyMEP=0

entries.forEach(e=> weeklyMEP+=e.meps)

document.getElementById("weeklyMEP").innerText =
"Total Training Load (MEPs): "+weeklyMEP

let readiness="Good"

if(weeklyMEP>250) readiness="High Load — monitor recovery"

if(weeklyMEP<80) readiness="Low Load — increase activity"

document.getElementById("readiness").innerText =
"Training Readiness: "+readiness


let lastRun = entries.slice().reverse().find(e=>e.distance)

if(lastRun){

let pace = lastRun.runtime/lastRun.distance

let predicted = pace*2

document.getElementById("runPrediction").innerText =
"Predicted 2-Mile Time: "+predicted.toFixed(2)+" minutes"

}


let maxPush = Math.max(...entries.map(e=>e.pushups||0))

let maxSit = Math.max(...entries.map(e=>e.situps||0))

document.getElementById("pushPrediction").innerText =
"Push-up Projection: "+maxPush

document.getElementById("sitPrediction").innerText =
"Sit-up Projection: "+maxSit


let weights = entries.map(e=>e.weight).filter(w=>w>0)

if(weights.length>1){

let start=weights[0]
let latest=weights[weights.length-1]

let loss=start-latest

let weeksRemaining=20-entries.length/4

let projected=latest-(loss/weeksRemaining)

document.getElementById("fatLossProjection").innerText =
"Weight Projection Trend: "+projected.toFixed(1)+" lb"

}


let score=0

if(maxPush>=40) score+=15
if(maxSit>=56) score+=15

if(lastRun){

let pace = lastRun.runtime/lastRun.distance

let predicted = pace*2

if(predicted<=19) score+=40

}

document.getElementById("testScore").innerText =
"Estimated Test Score: "+score

}

function renderCharts(){

let weeks={}
let weights=[]
let dates=[]
let runPace=[]

entries.forEach(e=>{

if(!weeks[e.week]) weeks[e.week]=0
weeks[e.week]+=e.meps

if(e.weight){

weights.push(e.weight)
dates.push(e.date)

}

if(e.distance){

runPace.push(e.runtime/e.distance)

}

})

new Chart(mepChart,{
type:"line",
data:{
labels:Object.keys(weeks),
datasets:[{
label:"Weekly MEPs",
data:Object.values(weeks)
}]
}
})

new Chart(weightChart,{
type:"line",
data:{
labels:dates,
datasets:[{
label:"Weight",
data:weights
}]
}
})

new Chart(runChart,{
type:"line",
data:{
labels:runPace.map((_,i)=>i+1),
datasets:[{
label:"Run Pace",
data:runPace
}]
}
})

}

function exportCSV(){

let csv="Date,Week,Workout,MEPs,Pushups,Situps,Distance,Weight\n"

entries.forEach(e=>{

csv+=`${e.date},${e.week},${e.type},${e.meps},${e.pushups},${e.situps},${e.distance},${e.weight}\n`

})

const blob=new Blob([csv],{type:"text/csv"})
const url=URL.createObjectURL(blob)

const a=document.createElement("a")

a.href=url
a.download="training_log.csv"

a.click()

}

render()