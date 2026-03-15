// ---------------------- wod.js ----------------------

// wod.js
const WOD_VERSION = "V1.01"; // YYYYMMDD or v2, etc.
console.log("WOD script version:", WOD_VERSION);

// Default program start date (fallback)
let programStart = new Date(2026, 2, 16); // March 16, 2026 (month 0-indexed)

// Load saved program start date from localStorage
if(localStorage.getItem("programStart")){
    const saved = localStorage.getItem("programStart");
    programStart = parseDateMMDDYYYY(saved) || programStart;
}

// Parse MM/DD/YYYY safely
function parseDateMMDDYYYY(str){
    if(!str) return null;
    const parts = str.split("/");
    if(parts.length !== 3) return null;
    const mm = parseInt(parts[0],10);
    const dd = parseInt(parts[1],10);
    const yyyy = parseInt(parts[2],10);
    if(isNaN(mm) || isNaN(dd) || isNaN(yyyy)) return null;
    return new Date(yyyy, mm-1, dd); // monthIndex 0-based
}

// ----------------- Calculate program week/day -----------------
function getProgramDay(){
    const today = new Date();
    const todayNoTime = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const programStartNoTime = new Date(programStart.getFullYear(), programStart.getMonth(), programStart.getDate());

    if(todayNoTime < programStartNoTime){
        return {week:0, day:0};
    }

    const diffDays = Math.floor((todayNoTime - programStartNoTime)/(1000*60*60*24));
    const week = Math.floor(diffDays/6) + 1; // 6-day training week
    const day = (diffDays % 6) + 1; // Day 1-6
    return {week, day};
}

// ---------------- Running progression ----------------
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

// ---------------- Generate WOD text ----------------
function generateWorkout(week, day){
    if(week < 1 || week > 20) return "Program has not started or has finished.";
    const run = runningProgression[week];
    switch(day){
        case 1: return `Upper Body + Intervals\n\nWarmup\n5 min jog\nArm circles x15\n\nStrength 3 rounds\nPushups 12\nDB rows 12\nShoulder press 10\nPlank 30 sec\n\nRun Intervals\n${run.intervals}\n\nRest 90 sec between intervals`;
        case 2: return `Lower Body + Core\n\n3 rounds\nBodyweight squats 12\nReverse lunges 10 each\nGlute bridge 15\nDead bugs 10 each\nSide plank 20 sec`;
        case 3: return `Easy Run\n\nDistance: ${run.easy}\n\nGoal: Conversational pace\nBuild aerobic endurance`;
        case 4: return `Pushup Situp Volume\n\n4 rounds\nPushups 12\nSitups 15\nPlank 30 sec\n\nRest 60 sec`;
        case 5: return `Tempo Run\n\nWarmup 5 min jog\n\nRun: ${run.tempo}\n\nGoal: Moderate pace near test effort`;
        case 6: return `Recovery Day\n\nOptions:\n30 min walk\nMobility work\nLight cycling\nFoam rolling`;
        default: return "Rest or program not scheduled for today.";
    }
}

// ---------------- Load WOD ----------------
function loadWOD(){
    const p = getProgramDay();
    const weekEl = document.getElementById("weekDisplay");
    const dayEl = document.getElementById("dayDisplay");
    const wodEl = document.getElementById("wodContainer");

    if(p.week === 0){
        weekEl.innerText = "Program has not started yet.";
        dayEl.innerText = "";
        wodEl.innerText = "Please set a valid start date (MM/DD/YYYY) above.";
        return;
    }

    weekEl.innerText = "Week " + p.week + " of 20";
    dayEl.innerText = "Day " + p.day;
    wodEl.innerText = generateWorkout(p.week, p.day);
}

// ---------------- Set program start ----------------
function setProgramStart(){
    const input = document.getElementById("programStartInput").value;
    const parsed = parseDateMMDDYYYY(input);
    if(parsed){
        programStart = parsed;
        localStorage.setItem("programStart", input);
        loadWOD();
        alert("Program start date set to " + input);
    } else {
        alert("Invalid date. Use MM/DD/YYYY format.");
    }
}

// ---------------- Pre-fill input ----------------
window.onload = () => {
    const inputEl = document.getElementById("programStartInput");
    const mm = String(programStart.getMonth()+1).padStart(2,'0');
    const dd = String(programStart.getDate()).padStart(2,'0');
    const yyyy = programStart.getFullYear();
    if(inputEl) inputEl.value = `${mm}/${dd}/${yyyy}`;
    loadWOD();
};
