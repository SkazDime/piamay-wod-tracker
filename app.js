// ============================================
// MILITARY FITNESS COACHING DASHBOARD
// app.js - Main Application Logic
// ============================================

const STORAGE_KEY = 'fitnessWorkouts';

// Initialize date field to today
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').value = today;
    loadWorkouts();
    updateMetrics();
    renderCharts();
});

// Form submission handler
document.getElementById('workoutForm').addEventListener('submit', function(e) {
    e.preventDefault();
    addWorkout();
});

// Add new workout to localStorage
function addWorkout() {
    const workout = {
        id: Date.now(),
        date: document.getElementById('date').value,
        week: parseInt(document.getElementById('week').value),
        workoutType: document.getElementById('workoutType').value,
        duration: parseInt(document.getElementById('duration').value) || 0,
        meps: parseInt(document.getElementById('meps').value) || 0,
        avgHR: parseInt(document.getElementById('avgHR').value) || 0,
        peakHR: parseInt(document.getElementById('peakHR').value) || 0,
        zone1: parseInt(document.getElementById('zone1').value) || 0,
        zone2: parseInt(document.getElementById('zone2').value) || 0,
        zone3: parseInt(document.getElementById('zone3').value) || 0,
        zone4: parseInt(document.getElementById('zone4').value) || 0,
        zone5: parseInt(document.getElementById('zone5').value) || 0,
        pushups: parseInt(document.getElementById('pushups').value) || 0,
        situps: parseInt(document.getElementById('situps').value) || 0,
        runDistance: parseFloat(document.getElementById('runDistance').value) || 0,
        runTime: parseInt(document.getElementById('runTime').value) || 0,
        bodyweight: parseFloat(document.getElementById('bodyweight').value) || 0,
        waist: parseFloat(document.getElementById('waist').value) || 0
    };

    let workouts = getWorkouts();
    workouts.push(workout);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(workouts));

    document.getElementById('workoutForm').reset();
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').value = today;

    loadWorkouts();
    updateMetrics();
    renderCharts();
};

// Get all workouts from localStorage
function getWorkouts() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

// Load and display workouts in table
function loadWorkouts() {
    const workouts = getWorkouts();
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    workouts.sort((a, b) => new Date(b.date) - new Date(a.date));

    workouts.forEach(workout => {
        const row = document.createElement('tr');
        const pace = workout.runDistance > 0 ? (workout.runTime / workout.runDistance).toFixed(2) : 'N/A';
        
        row.innerHTML = `
            <td>${workout.date}</td>
            <td>${workout.week}</td>
            <td>${workout.workoutType}</td>
            <td>${workout.duration} min</td>
            <td>${workout.meps}</td>
            <td>${workout.avgHR}</td>
            <td>${workout.peakHR}</td>
            <td>${workout.runDistance.toFixed(1)}</td>
            <td>${workout.runTime}</td>
            <td>${workout.bodyweight > 0 ? workout.bodyweight.toFixed(1) : '-'}</td>
            <td>${workout.waist > 0 ? workout.waist.toFixed(1) : '-'}</td>
            <td><button class="btn btn-small" onclick="deleteWorkout(${workout.id})">Delete</button></td>
        `;
        tableBody.appendChild(row);
    });
}

// Delete a workout entry
function deleteWorkout(id) {
    if (!confirm('Delete this workout?')) return;
    let workouts = getWorkouts();
    workouts = workouts.filter(w => w.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(workouts));
    loadWorkouts();
    updateMetrics();
    renderCharts();
}

// Calculate and display weekly metrics
function updateMetrics() {
    const workouts = getWorkouts();

    if (workouts.length === 0) {
        document.getElementById('weeklyMEPs').textContent = '0';
        document.getElementById('avgHRMetric').textContent = '0 bpm';
        document.getElementById('totalRunMileage').textContent = '0.0 mi';
        document.getElementById('weightChange').textContent = '0 lbs';
        document.getElementById('waistChange').textContent = '0 in';
        document.getElementById('pacePredictor').textContent = '--:--';
        return;
    }

    const today = new Date();
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const weeklyWorkouts = workouts.filter(w => new Date(w.date) >= sevenDaysAgo);

    // Weekly MEPs
    const weeklyMEPs = weeklyWorkouts.reduce((sum, w) => sum + w.meps, 0);
    document.getElementById('weeklyMEPs').textContent = weeklyMEPs;

    // Average HR
    const avgHRMetric = weeklyWorkouts.length > 0 
        ? Math.round(weeklyWorkouts.reduce((sum, w) => sum + w.avgHR, 0) / weeklyWorkouts.length)
        : 0;
    document.getElementById('avgHRMetric').textContent = avgHRMetric + ' bpm';

    // Total Run Mileage
    const totalRunMileage = weeklyWorkouts.reduce((sum, w) => sum + w.runDistance, 0);
    document.getElementById('totalRunMileage').textContent = totalRunMileage.toFixed(1) + ' mi';

    // Weight change (first vs last in week)
    let weightChange = 0;
    const weightsThisWeek = weeklyWorkouts.filter(w => w.bodyweight > 0);
    if (weightsThisWeek.length >= 2) {
        const firstWeight = weightsThisWeek[weightsThisWeek.length - 1].bodyweight;
        const lastWeight = weightsThisWeek[0].bodyweight;
        weightChange = (lastWeight - firstWeight).toFixed(1);
    }
    document.getElementById('weightChange').textContent = (weightChange >= 0 ? '+' : '') + weightChange + ' lbs';

    // Waist change
    let waistChange = 0;
    const waistsThisWeek = weeklyWorkouts.filter(w => w.waist > 0);
    if (waistsThisWeek.length >= 2) {
        const firstWaist = waistsThisWeek[waistsThisWeek.length - 1].waist;
        const lastWaist = waistsThisWeek[0].waist;
        waistChange = (lastWaist - firstWaist).toFixed(1);
    }
    document.getElementById('waistChange').textContent = (waistChange >= 0 ? '+' : '') + waistChange + ' in';

    // Run pace predictor (2-mile time based on recent runs)
    const recentRuns = workouts
        .filter(w => w.runDistance > 0 && w.runTime > 0)
        .slice(-5);
    
    if (recentRuns.length > 0) {
        const avgPacePerMile = recentRuns.reduce((sum, w) => sum + (w.runTime / w.runDistance), 0) / recentRuns.length;
        const predictedTime = Math.round(avgPacePerMile * 2);
        const minutes = Math.floor(predictedTime / 60);
        const seconds = predictedTime % 60;
        document.getElementById('pacePredictor').textContent = 
            `${minutes}:${seconds.toString().padStart(2, '0')} (2-mi)`;
    }
}

// Export data to CSV
function exportToCSV() {
    const workouts = getWorkouts();
    if (workouts.length === 0) {
        alert('No data to export');
        return;
    }

    let csv = 'Date,Week,Type,Duration,MEPs,AvgHR,PeakHR,Zone1,Zone2,Zone3,Zone4,Zone5,PushUps,SitUps,RunDist,RunTime,Bodyweight,Waist\n';

    workouts.forEach(w => {
        csv += `${w.date},${w.week},${w.workoutType},${w.duration},${w.meps},${w.avgHR},${w.peakHR},${w.zone1},${w.zone2},${w.zone3},${w.zone4},${w.zone5},${w.pushups},${w.situps},${w.runDistance},${w.runTime},${w.bodyweight},${w.waist}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fitness-log-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Initialize charts
let charts = {};

function renderCharts() {
    const workouts = getWorkouts();
    if (workouts.length === 0) return;

    // MEPs Chart
    renderMEPChart(workouts);
    
    // Weight Chart
    renderWeightChart(workouts);
    
    // Waist Chart
    renderWaistChart(workouts);
    
    // Run Pace Chart
    renderRunChart(workouts);
    
    // HR Zone Distribution Chart
    renderZoneChart(workouts);
}

function renderMEPChart(workouts) {
    const ctx = document.getElementById('mepChart')?.getContext('2d');
    if (!ctx) return;

    const sortedWorkouts = [...workouts].sort((a, b) => new Date(a.date) - new Date(b.date));
    const labels = sortedWorkouts.map(w => w.date);
    const data = sortedWorkouts.map(w => w.meps);

    if (charts.mep) charts.mep.destroy();
    charts.mep = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'MEPs (Push-ups)',
                data: data,
                borderColor: '#2196F3',
                backgroundColor: 'rgba(33, 150, 243, 0.1)',
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: { legend: { display: true } },
            scales: { y: { beginAtZero: true } }
        }
    });
}

function renderWeightChart(workouts) {
    const ctx = document.getElementById('weightChart')?.getContext('2d');
    if (!ctx) return;

    const sortedWorkouts = [...workouts]
        .filter(w => w.bodyweight > 0)
        .sort((a, b) => new Date(a.date) - new Date(b.date));
    
    if (sortedWorkouts.length === 0) return;

    const labels = sortedWorkouts.map(w => w.date);
    const data = sortedWorkouts.map(w => w.bodyweight);

    if (charts.weight) charts.weight.destroy();
    charts.weight = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Bodyweight (lbs)',
                data: data,
                borderColor: '#FF6F00',
                backgroundColor: 'rgba(255, 111, 0, 0.1)',
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: { legend: { display: true } },
            scales: { y: { beginAtZero: false } }
        }
    });
}

function renderWaistChart(workouts) {
    const ctx = document.getElementById('waistChart')?.getContext('2d');
    if (!ctx) return;

    const sortedWorkouts = [...workouts]
        .filter(w => w.waist > 0)
        .sort((a, b) => new Date(a.date) - new Date(b.date));
    
    if (sortedWorkouts.length === 0) return;

    const labels = sortedWorkouts.map(w => w.date);
    const data = sortedWorkouts.map(w => w.waist);

    if (charts.waist) charts.waist.destroy();
    charts.waist = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Waist (inches)',
                data: data,
                borderColor: '#4CAF50',
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: { legend: { display: true } },
            scales: { y: { beginAtZero: false } }
        }
    });
}

function renderRunChart(workouts) {
    const ctx = document.getElementById('runChart')?.getContext('2d');
    if (!ctx) return;

    const sortedWorkouts = [...workouts]
        .filter(w => w.runDistance > 0 && w.runTime > 0)
        .sort((a, b) => new Date(a.date) - new Date(b.date));
    
    if (sortedWorkouts.length === 0) return;

    const labels = sortedWorkouts.map(w => w.date);
    const data = sortedWorkouts.map(w => {
        const pacePerMile = w.runTime / w.runDistance;
        return pacePerMile;
    });

    if (charts.run) charts.run.destroy();
    charts.run = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Pace (min/mile)',
                data: data,
                borderColor: '#9C27B0',
                backgroundColor: 'rgba(156, 39, 176, 0.1)',
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: { legend: { display: true } },
            scales: { y: { beginAtZero: false } }
        }
    });
}

function renderZoneChart(workouts) {
    const ctx = document.getElementById('zoneChart')?.getContext('2d');
    if (!ctx) return;

    const totalZone1 = workouts.reduce((sum, w) => sum + w.zone1, 0);
    const totalZone2 = workouts.reduce((sum, w) => sum + w.zone2, 0);
    const totalZone3 = workouts.reduce((sum, w) => sum + w.zone3, 0);
    const totalZone4 = workouts.reduce((sum, w) => sum + w.zone4, 0);
    const totalZone5 = workouts.reduce((sum, w) => sum + w.zone5, 0);

    if (charts.zone) charts.zone.destroy();
    charts.zone = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Zone 1', 'Zone 2', 'Zone 3', 'Zone 4', 'Zone 5'],
            datasets: [{
                data: [totalZone1, totalZone2, totalZone3, totalZone4, totalZone5],
                backgroundColor: ['#90EE90', '#87CEEB', '#FFD700', '#FF8C00', '#FF0000']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: { legend: { display: true } }
        }
    });
}

// Tab switching functionality
function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Deactivate all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    
    // Activate button
    event.target.classList.add('active');
}
