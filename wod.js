// ---------------------- wod.js ----------------------

// Default program start date
let programStart = new Date("03/16/2026");

// ---------------- Parse MM/DD/YYYY safely ----------------
function parseDateMMDDYYYY(str) {
    // expects "MM/DD/YYYY"
    const parts = str.split("/");
    if(parts.length !== 3) return null;
    const month = parseInt(parts[0], 10) - 1; // JS months 0–11
    const day = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day); // time defaults to 00:00 local
}

// ---------------- Load saved program start date ----------------
if(localStorage.getItem("programStart")){
    const saved = parseDateMMDDYYYY(localStorage.getItem("programStart"));
    if(saved) programStart = saved;
}

// ---------------- Calculate current program week/day ----------------
function getProgramDay(){
    const today = new Date();
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const start = new Date(programStart.getFullYear(), programStart.getMonth(), programStart.getDate());

    if(todayDate < start){
        return {week:0, day:0};
    }

    const diff = Math.floor((todayDate - start) / (1000*60*60*24));
    const week = Math.floor(diff / 6) + 1; // 6-day training week
    const day = (diff % 6) + 1; // Day 1–6

    return {week, day};
}

// ---------------- Running Progression ----------------
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
};

// ---------------- Generate Workout Text ----------------
function generateWorkout(week, day) {
    if(week < 1 || week > 20){
        return "Program has not started or has finished.";
    }

    const run = runningProgression[week];

    switch(day){
        case 1: return `Upper Body + Intervals

Warmup
5 min jog
Arm circles x15

Strength 3 rounds
Pushups 12
DB rows 12
Shoulder press 10
Plank 30 sec

Run Intervals
${run.intervals}

Rest 90 sec between intervals`;

        case 2: return `Lower Body + Core

3 rounds
Bodyweight squats 12
Reverse lunges 10 each
Glute bridge 15
Dead bugs 10 each
Side plank 20 sec`;

        case 3: return `Easy Run

Distance: ${run.easy}

Goal: Conversational pace
Build aerobic endurance`;

        case 4: return `Pushup Situp Volume

4 rounds
Pushups 12
Situps 15
Plank 30 sec

Rest 60 sec`;

        case 5: return `Tempo Run

Warmup 5 min jog

Run: ${run.tempo}

Goal: Moderate pace near test effort`;

        case 6: return `Recovery Day

Options:
30 min walk
Mobility work
Light cycling
Foam rolling`;

        default: return "Rest or program not scheduled for today.";
    }
}

// ---------------- Load Today's WOD ----------------
function loadWOD() {
    const p = getProgramDay();

    const weekEl = document.getElementById("weekDisplay");
    const dayEl = document.getElementById("dayDisplay");
    const wodEl = document.getElementById("wodContainer");

    if(p.week === 0){
        weekEl.innerText = "Program has not started yet.";
        dayEl.innerText = "";
        wodEl.innerText = "Please set a valid start date (MM/DD/YYYY) on the dashboard.";
        return;
    }

    weekEl.innerText = "Week " + p.week + " of 20";
    dayEl.innerText = "Day " + p.day;
    wodEl.innerText = generateWorkout(p.week, p.day);
}

loadWOD();

// ---------------- Set Program Start Date Dynamically ----------------
function setProgramStart(){
    const input = document.getElementById("programStartInput").value;
    const date = parseDateMMDDYYYY(input);
    if(date){
        programStart = date;
        localStorage.setItem("programStart", input);
        alert("Program start date set to: " + input);
        loadWOD(); // Refresh today's workout
    } else {
        alert("Invalid date! Use MM/DD/YYYY format.");
    }
}

// ---------------- Pre-fill date input ----------------
window.onload = () => {
    if(document.getElementById("programStartInput")){
        const mm = (programStart.getMonth()+1).toString().padStart(2,'0');
        const dd = programStart.getDate().toString().padStart(2,'0');
        const yyyy = programStart.getFullYear();
        document.getElementById("programStartInput").value = `${mm}/${dd}/${yyyy}`;
    }
};
