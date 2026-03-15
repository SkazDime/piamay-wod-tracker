// ============================================
// WORKOUT OF THE DAY (WOD)
// wod.js - 20-Week Automated Training Program
// ============================================

// Program starts on January 1, 2024
const programStart = new Date(2026, 2, 16);

// 20-week training program with daily workouts
const trainingProgram = [
    // WEEK 1
    {
        week: 1,
        day: 1,
        focus: "Easy Run",
        description: "2 miles easy pace, focus on form",
        distance: "2 mi",
        duration: "18-20 min",
        intensity: "Zone 1-2"
    },
    {
        week: 1,
        day: 2,
        focus: "Strength",
        description: "3x10 Push-ups, 3x10 Sit-ups, 2x5 Pull-ups",
        duration: "25 min",
        intensity: "Moderate"
    },
    {
        week: 1,
        day: 3,
        focus: "Intervals",
        description: "Warm-up 1 mi, 6x400m at 5K pace (2min rest), Cool-down 1 mi",
        distance: "2.5 mi",
        duration: "25-30 min",
        intensity: "Zone 3-4"
    },
    {
        week: 1,
        day: 4,
        focus: "Recovery",
        description: "Active recovery walk or easy jog 2 miles",
        distance: "2 mi",
        duration: "20-25 min",
        intensity: "Zone 1"
    },
    {
        week: 1,
        day: 5,
        focus: "Tempo Run",
        description: "1 mi warm-up, 2 mi at tempo pace, 1 mi cool-down",
        distance: "4 mi",
        duration: "35-40 min",
        intensity: "Zone 3"
    },
    {
        week: 1,
        day: 6,
        focus: "Long Run",
        description: "Steady easy run",
        distance: "5 mi",
        duration: "45-50 min",
        intensity: "Zone 1-2"
    },
    {
        week: 1,
        day: 7,
        focus: "Rest",
        description: "Complete rest day or light stretching",
        intensity: "Rest"
    },

    // WEEK 2
    {
        week: 2,
        day: 1,
        focus: "Easy Run",
        description: "2.5 miles easy pace",
        distance: "2.5 mi",
        duration: "22-25 min",
        intensity: "Zone 1-2"
    },
    {
        week: 2,
        day: 2,
        focus: "Strength",
        description: "4x10 Push-ups, 4x10 Sit-ups, 3x5 Pull-ups",
        duration: "30 min",
        intensity: "Moderate"
    },
    {
        week: 2,
        day: 3,
        focus: "Intervals",
        description: "Warm-up 1 mi, 8x400m at 5K pace (90sec rest), Cool-down 1 mi",
        distance: "3 mi",
        duration: "30-35 min",
        intensity: "Zone 3-4"
    },
    {
        week: 2,
        day: 4,
        focus: "Recovery",
        description: "Easy 2.5 miles, focus on cadence",
        distance: "2.5 mi",
        duration: "22-25 min",
        intensity: "Zone 1"
    },
    {
        week: 2,
        day: 5,
        focus: "Tempo Run",
        description: "1 mi warm-up, 2.5 mi at tempo pace, 1 mi cool-down",
        distance: "4.5 mi",
        duration: "40-45 min",
        intensity: "Zone 3"
    },
    {
        week: 2,
        day: 6,
        focus: "Long Run",
        description: "Steady easy run, build to 6 miles",
        distance: "6 mi",
        duration: "54-60 min",
        intensity: "Zone 1-2"
    },
    {
        week: 2,
        day: 7,
        focus: "Rest",
        description: "Complete rest day",
        intensity: "Rest"
    },

    // WEEK 3
    {
        week: 3,
        day: 1,
        focus: "Easy Run",
        description: "3 miles easy, building base",
        distance: "3 mi",
        duration: "27-30 min",
        intensity: "Zone 1-2"
    },
    {
        week: 3,
        day: 2,
        focus: "Strength",
        description: "5x10 Push-ups, 5x10 Sit-ups, 4x5 Pull-ups, add weights if possible",
        duration: "35 min",
        intensity: "Moderate-Hard"
    },
    {
        week: 3,
        day: 3,
        focus: "Intervals",
        description: "Warm-up 1 mi, 10x400m at 5K pace (75sec rest), Cool-down 1 mi",
        distance: "3.5 mi",
        duration: "35-40 min",
        intensity: "Zone 4"
    },
    {
        week: 3,
        day: 4,
        focus: "Recovery",
        description: "Easy 3 miles, very relaxed effort",
        distance: "3 mi",
        duration: "27-30 min",
        intensity: "Zone 1"
    },
    {
        week: 3,
        day: 5,
        focus: "Threshold",
        description: "1 mi warm-up, 3 mi at threshold pace, 1 mi cool-down",
        distance: "5 mi",
        duration: "45-50 min",
        intensity: "Zone 3-4"
    },
    {
        week: 3,
        day: 6,
        focus: "Long Run",
        description: "Steady build to 7 miles",
        distance: "7 mi",
        duration: "63-70 min",
        intensity: "Zone 1-2"
    },
    {
        week: 3,
        day: 7,
        focus: "Rest",
        description: "Complete rest, prepare for week 4",
        intensity: "Rest"
    },

    // WEEKS 4-20 (Abbreviated - you can expand this pattern)
    // Each week increases volume and intensity slightly
    {
        week: 4,
        day: 1,
        focus: "Easy Run",
        description: "3.5 miles easy",
        distance: "3.5 mi",
        duration: "30-35 min",
        intensity: "Zone 1-2"
    },
    {
        week: 4,
        day: 2,
        focus: "Strength",
        description: "Max effort day - 5x8 Push-ups, 5x8 Sit-ups with weights, 5x3 Pull-ups",
        duration: "40 min",
        intensity: "Hard"
    },
    {
        week: 4,
        day: 3,
        focus: "Speed Work",
        description: "1 mi warm-up, 12x400m at 5K pace (60sec rest), cool-down 1 mi",
        distance: "4 mi",
        duration: "40-45 min",
        intensity: "Zone 4-5"
    },
    {
        week: 4,
        day: 4,
        focus: "Recovery",
        description: "Easy jog 3.5 miles",
        distance: "3.5 mi",
        duration: "30-35 min",
        intensity: "Zone 1"
    },
    {
        week: 4,
        day: 5,
        focus: "Threshold",
        description: "1 mi warm-up, 3.5 mi threshold pace, 1 mi cool-down",
        distance: "5.5 mi",
        duration: "50-55 min",
        intensity: "Zone 3-4"
    },
    {
        week: 4,
        day: 6,
        focus: "Long Run",
        description: "Steady 8 miles - focus on pace consistency",
        distance: "8 mi",
        duration: "70-80 min",
        intensity: "Zone 1-2"
    },
    {
        week: 4,
        day: 7,
        focus: "Rest",
        description: "Complete rest day - deload week 5",
        intensity: "Rest"
    }
];

// Calculate current day of program
function getCurrentProgramDay() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    programStart.setHours(0, 0, 0, 0);
    
    const diff = Math.floor((today - programStart) / (1000 * 60 * 60 * 24));
    return Math.max(0, diff);
}

// Get current week and day
function getCurrentWeekAndDay() {
    const dayNumber = getCurrentProgramDay();
    const week = Math.floor(dayNumber / 7) + 1;
    const day = (dayNumber % 7) + 1;
    
    return { week: Math.min(week, 20), day };
}

// Find workout for current day
function getTodayWorkout() {
    const { week, day } = getCurrentWeekAndDay();
    const workout = trainingProgram.find(w => w.week === week && w.day === day);
    
    return workout || {
        week: week,
        day: day,
        focus: "Rest Day",
        description: "No planned workout",
        intensity: "Rest"
    };
}

// Load and display WOD on page load
function loadWOD() {
    const workout = getTodayWorkout();
    const { week, day } = getCurrentWeekAndDay();
    
    const wodContainer = document.getElementById('wodContainer');
    if (!wodContainer) return;

    let html = `
        <div class="wod-header">
            <h2>🏃 Today's Workout</h2>
            <p class="wod-date">Week ${workout.week} | Day ${day}</p>
            <p class="program-progress">Program Day: ${getCurrentProgramDay()} / 140</p>
        </div>

        <div class="wod-main">
            <div class="wod-focus">
                <h3>${workout.focus}</h3>
                <p class="wod-intensity">Intensity: <strong>${workout.intensity}</strong></p>
            </div>

            <div class="wod-details">
                <p>${workout.description}</p>
                ${workout.distance ? `<p><strong>Distance:</strong> ${workout.distance}</p>` : ''}
                ${workout.duration ? `<p><strong>Duration:</strong> ${workout.duration}</p>` : ''}
            </div>

            <div class="wod-actions">
                <button onclick="logTodayWorkout()" class="btn btn-primary">Log This Workout</button>
                <button onclick="viewWeekSchedule()" class="btn btn-secondary">View Week</button>
            </div>
        </div>
    `;

    wodContainer.innerHTML = html;
}

// View full week schedule
function viewWeekSchedule() {
    const { week } = getCurrentWeekAndDay();
    const weekWorkouts = trainingProgram.filter(w => w.week === week);
    
    let html = `
        <div class="schedule-container">
            <h2>Week ${week} Schedule</h2>
            <table class="schedule-table">
                <thead>
                    <tr>
                        <th>Day</th>
                        <th>Focus</th>
                        <th>Description</th>
                        <th>Distance</th>
                        <th>Duration</th>
                        <th>Intensity</th>
                    </tr>
                </thead>
                <tbody>
    `;

    weekWorkouts.forEach(workout => {
        html += `
            <tr>
                <td>Day ${workout.day}</td>
                <td>${workout.focus}</td>
                <td>${workout.description}</td>
                <td>${workout.distance || '-'}</td>
                <td>${workout.duration || '-'}</td>
                <td>${workout.intensity}</td>
            </tr>
        `;
    });

    html += `
                </tbody>
            </table>
            <button onclick="loadWOD()" class="btn btn-secondary">Back to Today</button>
        </div>
    `;

    const wodContainer = document.getElementById('wodContainer');
    if (wodContainer) {
        wodContainer.innerHTML = html;
    }
}

// Log today's workout (redirect to main dashboard)
function logTodayWorkout() {
    alert('Switch to Dashboard tab and log your workout!');
    window.parent.document.querySelector('.tab-btn').click();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadWOD();
});
