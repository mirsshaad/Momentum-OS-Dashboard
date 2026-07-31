/* ==========================================================================
   MOMENTUM OS — APPLICATION ENGINE & REAL-TIME INTERACTION CONTROLLER
   ========================================================================== */

(function () {
    'use strict';

    const STORAGE_KEY = 'MOMENTUM_OS_STATE_V2';

    // Default State
    const DEFAULT_STATE = {
        activeView: 'dashboard',
        user: {
            name: 'Architect',
            level: 14,
            xp: 7450,
            xpMax: 10000,
            streak: 28,
            mission: 'Master AWS Architecture & Build Scalable Distributed Systems',
            soundEnabled: true
        },
        rings: {
            workout: { current: 45, max: 60, unit: 'min' },
            protein: { current: 165, max: 180, unit: 'g' },
            water: { current: 3.2, max: 4.0, unit: 'L' },
            sleep: { current: 7.5, max: 8.0, unit: 'hrs' },
            study: { current: 2.0, max: 2.5, unit: 'hrs' },
            productivity: { current: 7.5, max: 8.0, unit: 'hrs' }
        },
        checklist: [
            { id: 'task-1', title: 'Wake up at 06:00 AM', tag: 'Routine', completed: true },
            { id: 'task-2', title: 'Morning Skincare Routine', tag: 'Health', completed: true },
            { id: 'task-3', title: 'Workout (1 Hr Hypertrophy)', tag: 'Fitness', completed: true },
            { id: 'task-4', title: 'Hit Protein Goal (180g)', tag: 'Nutrition', completed: true },
            { id: 'task-5', title: 'AWS Study (Solutions Architect)', tag: 'Learning', completed: true },
            { id: 'task-6', title: 'Read 20 Pages (Stoicism/Design)', tag: 'Mindset', completed: true },
            { id: 'task-7', title: 'Journal & Evening Reflection', tag: 'Mindset', completed: true },
            { id: 'task-8', title: 'Night Skincare Protocol', tag: 'Health', completed: false },
            { id: 'task-9', title: 'Wind Down & Sleep by 01:00 AM', tag: 'Recovery', completed: false }
        ],
        stats: {
            weight: 78.5,
            calories: 2450,
            caloriesMax: 2800,
            protein: 165,
            proteinMax: 180,
            water: 3.2,
            waterMax: 4.0,
            sleep: 7.5,
            mood: '⚡ Flow'
        },
        goals: [
            { id: 'g1', title: 'Pass AWS Certified Solutions Architect', category: 'Certification', progress: 85, dueDate: 'Aug 15, 2026' },
            { id: 'g2', title: 'Achieve 12% Body Fat & 80kg Lean Mass', category: 'Physical Peak', progress: 70, dueDate: 'Sep 30, 2026' },
            { id: 'g3', title: 'Launch Momentum OS Production App', category: 'Engineering', progress: 95, dueDate: 'Aug 05, 2026' }
        ],
        quotes: [
            { text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "— Aristotle" },
            { text: "He who has a why to live can bear almost any how.", author: "— Friedrich Nietzsche" },
            { text: "You have power over your mind - not outside events. Realize this, and you will find strength.", author: "— Marcus Aurelius" },
            { text: "Discipline is choosing between what you want now and what you want most.", author: "— Abraham Lincoln" },
            { text: "Simplicity is the ultimate sophistication.", author: "— Leonardo da Vinci" }
        ],
        currentQuoteIndex: 0,
        
        transformation: {
            body: { weight: 78.5, bodyFat: 13.2, muscleMass: 38.5, waist: 31.5, chest: 43.0, shoulders: 50.5, arms: 16.2, legs: 24.0 },
            skin: { score: 88, acne: 'Clear', pigmentation: 'Minimal', texture: '92% Smooth', glow: 92 },
            hair: { density: '94% Thick', growthRate: '+0.5 in/mo', lastWashed: 'Today', wasWashedToday: true },
            beard: { stage: '15mm Tailored Heavy Stubble', density: '96% Uniform', nextTrimDays: 3 },
            wishlist: [
                { id: 'w1', item: 'Tailored Cashmere Overcoat', price: '$420', category: 'Outerwear', acquired: true },
                { id: 'w2', item: 'Minimalist Black Leather Watch', price: '$280', category: 'Accessories', acquired: true },
                { id: 'w3', item: 'Handcrafted Italian Chelsea Boots', price: '$350', category: 'Footwear', acquired: false },
                { id: 'w4', item: 'Custom Fit Heavyweight Raw Denim', price: '$190', category: 'Pants', acquired: false }
            ]
        },

        gym: {
            activeSplit: 'push',
            restTargetSec: 90,
            prs: [
                { id: 'pr-1', lift: 'Bench Press', weight: 120.0, reps: 5, date: 'Jul 28, 2026' },
                { id: 'pr-2', lift: 'Barbell Back Squat', weight: 160.0, reps: 5, date: 'Jul 24, 2026' },
                { id: 'pr-3', lift: 'Conventional Deadlift', weight: 200.0, reps: 3, date: 'Jul 20, 2026' },
                { id: 'pr-4', lift: 'Weighted Pull-Up', weight: 30.0, reps: 6, date: 'Jul 22, 2026' },
                { id: 'pr-5', lift: 'Overhead Press', weight: 80.0, reps: 5, date: 'Jul 26, 2026' }
            ],
            routines: {
                push: {
                    title: 'Push Day — Chest, Shoulders & Triceps',
                    badge: 'ACTIVE SPLIT: PUSH DAY A',
                    exercises: [
                        {
                            id: 'ex-1',
                            name: 'Barbell Bench Press',
                            targetMuscle: 'Chest / Triceps',
                            pr: '120.0 kg x 5',
                            sets: [
                                { setNum: 1, reps: 8, weight: 100.0, completed: true, notes: 'Warmup set clean' },
                                { setNum: 2, reps: 8, weight: 105.0, completed: true, notes: 'Solid RPE 8' },
                                { setNum: 3, reps: 6, weight: 110.0, completed: true, notes: 'Explosive drive' },
                                { setNum: 4, reps: 5, weight: 115.0, completed: false, notes: 'Target PR attempt' }
                            ]
                        },
                        {
                            id: 'ex-2',
                            name: 'Incline Dumbbell Press',
                            targetMuscle: 'Upper Chest',
                            pr: '42.0 kg x 8',
                            sets: [
                                { setNum: 1, reps: 10, weight: 36.0, completed: true, notes: 'Deep stretch' },
                                { setNum: 2, reps: 8, weight: 40.0, completed: false, notes: '' },
                                { setNum: 3, reps: 8, weight: 40.0, completed: false, notes: '' }
                            ]
                        },
                        {
                            id: 'ex-3',
                            name: 'Standing Overhead Press (OHP)',
                            targetMuscle: 'Deltoids',
                            pr: '80.0 kg x 5',
                            sets: [
                                { setNum: 1, reps: 8, weight: 65.0, completed: true, notes: 'Strict form' },
                                { setNum: 2, reps: 6, weight: 72.5, completed: false, notes: '' },
                                { setNum: 3, reps: 5, weight: 75.0, completed: false, notes: '' }
                            ]
                        },
                        {
                            id: 'ex-4',
                            name: 'Cable Lateral Raises',
                            targetMuscle: 'Lateral Delts',
                            pr: '18.0 kg x 12',
                            sets: [
                                { setNum: 1, reps: 15, weight: 14.0, completed: false, notes: '' },
                                { setNum: 2, reps: 12, weight: 16.0, completed: false, notes: '' }
                            ]
                        },
                        {
                            id: 'ex-5',
                            name: 'Tricep Rope Pushdowns',
                            targetMuscle: 'Triceps Lateral Head',
                            pr: '45.0 kg x 12',
                            sets: [
                                { setNum: 1, reps: 12, weight: 35.0, completed: false, notes: '' },
                                { setNum: 2, reps: 12, weight: 40.0, completed: false, notes: '' }
                            ]
                        }
                    ]
                },
                pull: {
                    title: 'Pull Day — Back, Lats & Biceps',
                    badge: 'ROUTINE: PULL DAY A',
                    exercises: [
                        {
                            id: 'ex-p1',
                            name: 'Weighted Pull-Ups',
                            targetMuscle: 'Lats & Upper Back',
                            pr: '+30.0 kg x 6',
                            sets: [
                                { setNum: 1, reps: 8, weight: 15.0, completed: false, notes: '' },
                                { setNum: 2, reps: 6, weight: 25.0, completed: false, notes: '' }
                            ]
                        },
                        {
                            id: 'ex-p2',
                            name: 'Barbell Bent-Over Rows',
                            targetMuscle: 'Rhomboids & Lats',
                            pr: '110.0 kg x 8',
                            sets: [
                                { setNum: 1, reps: 10, weight: 85.0, completed: false, notes: '' },
                                { setNum: 2, reps: 8, weight: 95.0, completed: false, notes: '' }
                            ]
                        }
                    ]
                },
                legs: {
                    title: 'Leg Day — Quads, Hamstrings & Calves',
                    badge: 'ROUTINE: LEGS DAY A',
                    exercises: [
                        {
                            id: 'ex-l1',
                            name: 'Barbell Back Squat',
                            targetMuscle: 'Quads & Glutes',
                            pr: '160.0 kg x 5',
                            sets: [
                                { setNum: 1, reps: 8, weight: 125.0, completed: false, notes: '' },
                                { setNum: 2, reps: 6, weight: 140.0, completed: false, notes: '' }
                            ]
                        }
                    ]
                },
                upper: {
                    title: 'Upper Body — Power Compound Strength',
                    badge: 'ROUTINE: UPPER POWER',
                    exercises: [
                        {
                            id: 'ex-u1',
                            name: 'Incline Barbell Press',
                            targetMuscle: 'Upper Chest',
                            pr: '100.0 kg x 6',
                            sets: [
                                { setNum: 1, reps: 8, weight: 80.0, completed: false, notes: '' }
                            ]
                        }
                    ]
                },
                lower: {
                    title: 'Lower Body — Hypertrophy & Unilateral',
                    badge: 'ROUTINE: LOWER HYPERTROPHY',
                    exercises: [
                        {
                            id: 'ex-lw1',
                            name: 'Bulgarian Split Squats',
                            targetMuscle: 'Quads & Glutes',
                            pr: '36.0 kg DBs x 10',
                            sets: [
                                { setNum: 1, reps: 10, weight: 28.0, completed: false, notes: '' }
                            ]
                        }
                    ]
                }
            }
        }
    };

    const SCHEDULE_BLOCKS = [
        { time: '06:00 AM', name: 'Wake Up & Hydration Protocol', sub: '500ml Water + Morning Sunlight' },
        { time: '06:30 AM', name: 'Morning Skincare & Cold Shower', sub: 'Reset Nervous System' },
        { time: '07:30 AM', name: 'AWS Deep Work Study', sub: 'Solutions Architect Module 4' },
        { time: '10:00 AM', name: 'High Protein Meal #1', sub: '60g Protein + Micronutrients' },
        { time: '11:30 AM', name: 'Engineering & OS Architecture', sub: 'Focused Coding Session' },
        { time: '04:30 PM', name: 'Hypertrophy Training', sub: 'Push Day: Chest & Shoulders' },
        { time: '06:30 PM', name: 'Post-Workout Fuel & Meal #2', sub: 'Carbs + 70g Protein' },
        { time: '08:30 PM', name: 'Reading & Daily Journaling', sub: 'Marcus Aurelius Meditations' },
        { time: '10:30 PM', name: 'Night Skincare & Wind Down', sub: 'Dim Lights + Magnesium' },
        { time: '01:00 AM', name: 'Sleep & Full Recovery', sub: '8.0 Hours Target' }
    ];

    let state = loadState();
    let audioCtx = null;

    let workoutTimerSeconds = 2535;
    let workoutTimerInterval = null;
    let isWorkoutTimerRunning = false;

    let restTimerSeconds = 90;
    let restTimerInterval = null;
    let isRestTimerRunning = false;

    let lifeChartInstance = null;
    let vitalsChartInstance = null;
    let bodyProgressionChartInstance = null;
    let strengthChartInstance = null;

    function loadState() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                return {
                    ...DEFAULT_STATE,
                    ...parsed,
                    transformation: { ...DEFAULT_STATE.transformation, ...(parsed.transformation || {}) },
                    gym: { ...DEFAULT_STATE.gym, ...(parsed.gym || {}) }
                };
            }
        } catch (e) {
            console.error('Failed to load state', e);
        }
        return JSON.parse(JSON.stringify(DEFAULT_STATE));
    }

    function saveState() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (e) {
            console.error('Failed to save state', e);
        }
    }

    function initAudio() {
        if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    function playSound(type) {
        if (!state.user.soundEnabled) return;
        try {
            initAudio();
            if (!audioCtx) return;

            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            const now = audioCtx.currentTime;

            if (type === 'check') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(587.33, now);
                osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
                gain.gain.setValueAtTime(0.15, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
                osc.start(now);
                osc.stop(now + 0.12);
            } else if (type === 'rest-alarm') {
                [880, 1174.66].forEach((freq, idx) => {
                    const o = audioCtx.createOscillator();
                    const g = audioCtx.createGain();
                    o.connect(g);
                    g.connect(audioCtx.destination);
                    o.type = 'sine';
                    o.frequency.value = freq;
                    g.gain.setValueAtTime(0.2, now + idx * 0.15);
                    g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.15 + 0.3);
                    o.start(now + idx * 0.15);
                    o.stop(now + idx * 0.15 + 0.3);
                });
            } else if (type === 'complete') {
                [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
                    const o = audioCtx.createOscillator();
                    const g = audioCtx.createGain();
                    o.connect(g);
                    g.connect(audioCtx.destination);
                    o.type = 'triangle';
                    o.frequency.value = freq;
                    g.gain.setValueAtTime(0.1, now + idx * 0.08);
                    g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.4);
                    o.start(now + idx * 0.08);
                    o.stop(now + idx * 0.08 + 0.4);
                });
            }
        } catch (e) {
            console.warn('Audio error', e);
        }
    }

    // MAIN INITIALIZATION
    document.addEventListener('DOMContentLoaded', () => {
        if (window.lucide) window.lucide.createIcons();

        setupLiveClock();
        setupViewSwitching();
        setupTimers();
        setupEventListeners();
        setupBeforeAfterSlider();
        renderAll();
        initCharts();
    });

    // View Navigation Handler
    function setupViewSwitching() {
        const navTabs = document.querySelectorAll('.nav-tab');
        const viewPanes = document.querySelectorAll('.view-pane');

        function switchView(targetView) {
            state.activeView = targetView;
            saveState();

            navTabs.forEach(tab => {
                const isTarget = tab.dataset.view === targetView;
                tab.classList.toggle('active', isTarget);
            });

            viewPanes.forEach(pane => {
                const isTarget = pane.id === `${targetView}-view`;
                pane.classList.toggle('active', isTarget);
            });

            if (targetView === 'transformation' && bodyProgressionChartInstance) {
                bodyProgressionChartInstance.update();
            } else if (targetView === 'gym' && strengthChartInstance) {
                strengthChartInstance.update();
            }
        }

        document.addEventListener('click', (e) => {
            const navBtn = e.target.closest('.nav-tab');
            if (navBtn) {
                switchView(navBtn.dataset.view);
            }
        });

        switchView(state.activeView || 'dashboard');
    }

    // Clock Engine
    function setupLiveClock() {
        const timeEl = document.getElementById('live-time');
        const dateEl = document.getElementById('live-date');
        const greetingEl = document.getElementById('time-greeting');

        function updateClock() {
            const now = new Date();
            const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
            if (timeEl) timeEl.textContent = timeStr;

            const dateStr = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
            if (dateEl) dateEl.textContent = dateStr;

            const hour = now.getHours();
            let greeting = 'Good Morning, ';
            if (hour >= 12 && hour < 17) greeting = 'Good Afternoon, ';
            else if (hour >= 17 && hour < 22) greeting = 'Good Evening, ';
            else if (hour >= 22 || hour < 5) greeting = 'Late Shift Focus, ';

            if (greetingEl) greetingEl.textContent = greeting + state.user.name;

            updateScheduleHighlight(now);
        }

        updateClock();
        setInterval(updateClock, 1000);
    }

    function updateScheduleHighlight(nowDate) {
        const container = document.getElementById('timeline-container');
        if (!container) return;

        if (container.children.length === 0) {
            container.innerHTML = SCHEDULE_BLOCKS.map(b => `
                <div class="timeline-block" data-time="${b.time}">
                    <span class="time-badge">${b.time}</span>
                    <div class="timeline-details">
                        <span class="timeline-event-name">${b.name}</span>
                        <span class="timeline-event-sub">${b.sub}</span>
                    </div>
                </div>
            `).join('');
        }

        const blocks = container.querySelectorAll('.timeline-block');
        blocks.forEach((block, idx) => {
            block.classList.remove('active-now');
            if (idx === 4) block.classList.add('active-now');
        });
    }

    // TIMERS CONTROLLER
    function setupTimers() {
        const timerDisplay = document.getElementById('workout-timer-display');
        const toggleBtn = document.getElementById('btn-toggle-workout-timer');
        const resetBtn = document.getElementById('btn-reset-workout-timer');

        function formatStopwatch(sec) {
            const h = Math.floor(sec / 3600);
            const m = Math.floor((sec % 3600) / 60);
            const s = sec % 60;
            return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
        }

        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                if (isWorkoutTimerRunning) {
                    clearInterval(workoutTimerInterval);
                    isWorkoutTimerRunning = false;
                    toggleBtn.innerHTML = '<i data-lucide="play"></i> Start';
                } else {
                    workoutTimerInterval = setInterval(() => {
                        workoutTimerSeconds++;
                        if (timerDisplay) timerDisplay.textContent = formatStopwatch(workoutTimerSeconds);
                    }, 1000);
                    isWorkoutTimerRunning = true;
                    toggleBtn.innerHTML = '<i data-lucide="pause"></i> Pause';
                }
                if (window.lucide) window.lucide.createIcons();
            });
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                clearInterval(workoutTimerInterval);
                isWorkoutTimerRunning = false;
                workoutTimerSeconds = 0;
                if (timerDisplay) timerDisplay.textContent = '00:00:00';
                if (toggleBtn) toggleBtn.innerHTML = '<i data-lucide="play"></i> Start';
                if (window.lucide) window.lucide.createIcons();
            });
        }

        document.addEventListener('click', (e) => {
            const presetBtn = e.target.closest('.preset-rest-btn');
            if (presetBtn) {
                document.querySelectorAll('.preset-rest-btn').forEach(b => b.classList.remove('active'));
                presetBtn.classList.add('active');
                state.gym.restTargetSec = parseInt(presetBtn.dataset.sec) || 90;
                saveState();
                triggerRestTimer(state.gym.restTargetSec);
            }
        });
    }

    function triggerRestTimer(seconds) {
        clearInterval(restTimerInterval);
        restTimerSeconds = seconds;
        const display = document.getElementById('rest-timer-display');
        const ringFill = document.getElementById('rest-ring-fill');
        const circumference = 264;

        function updateRestUI() {
            if (display) display.textContent = `${restTimerSeconds}s`;
            if (ringFill) {
                const pct = restTimerSeconds / (state.gym.restTargetSec || 90);
                ringFill.style.strokeDashoffset = circumference - (pct * circumference);
            }
        }

        updateRestUI();
        isRestTimerRunning = true;

        restTimerInterval = setInterval(() => {
            restTimerSeconds--;
            if (restTimerSeconds <= 0) {
                clearInterval(restTimerInterval);
                isRestTimerRunning = false;
                if (display) display.textContent = '0s';
                if (ringFill) ringFill.style.strokeDashoffset = circumference;
                playSound('rest-alarm');
                if (window.confetti) window.confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
            } else {
                updateRestUI();
            }
        }, 1000);
    }

    // MASTER RENDER
    function renderAll() {
        renderHero();
        renderRings();
        renderChecklist();
        renderQuickStats();
        renderGoals();
        renderQuote();
        renderTransformation();
        renderGymOS();
    }

    function renderHero() {
        document.getElementById('user-level-num').textContent = state.user.level;
        document.getElementById('xp-text').textContent = `${state.user.xp.toLocaleString()} / ${state.user.xpMax.toLocaleString()} XP`;
        document.getElementById('xp-fill').style.width = `${Math.min(100, (state.user.xp / state.user.xpMax) * 100)}%`;
        document.getElementById('mission-display').textContent = state.user.mission;
        document.getElementById('streak-count-val').textContent = `${state.user.streak} Days`;

        const completedTasks = state.checklist.filter(t => t.completed).length;
        const totalTasks = state.checklist.length;
        const taskPct = totalTasks > 0 ? (completedTasks / totalTasks) : 0;

        let ringsTotalPct = 0, ringCount = 0;
        for (const key in state.rings) {
            ringsTotalPct += Math.min(1, state.rings[key].current / state.rings[key].max);
            ringCount++;
        }
        const ringsAvg = ringCount > 0 ? (ringsTotalPct / ringCount) : 0;
        const calculatedScore = Math.round((taskPct * 0.6 + ringsAvg * 0.4) * 100);
        document.getElementById('life-score-val').textContent = calculatedScore;

        const ringFill = document.getElementById('score-ring-fill');
        if (ringFill) {
            ringFill.style.strokeDashoffset = 440 - (calculatedScore / 100) * 440;
        }

        const soundIcon = document.getElementById('sound-icon');
        if (soundIcon) {
            soundIcon.setAttribute('data-lucide', state.user.soundEnabled ? 'volume-2' : 'volume-x');
            if (window.lucide) window.lucide.createIcons();
        }
    }

    function renderRings() {
        const circumference = 301.5;
        for (const metric in state.rings) {
            const r = state.rings[metric];
            const valEl = document.getElementById(`val-${metric}`);
            const ringEl = document.getElementById(`ring-${metric}`);
            if (valEl) valEl.textContent = r.current;
            if (ringEl) {
                ringEl.style.strokeDashoffset = circumference - (Math.min(1, r.current / r.max) * circumference);
            }
        }
    }

    function renderChecklist(filter = 'all') {
        const container = document.getElementById('checklist-container');
        const metaEl = document.getElementById('checklist-progress-text');
        if (!container) return;

        const completedCount = state.checklist.filter(t => t.completed).length;
        if (metaEl) metaEl.textContent = `${completedCount}/${state.checklist.length} Completed`;

        let filtered = state.checklist;
        if (filter === 'pending') filtered = state.checklist.filter(t => !t.completed);
        else if (filter === 'completed') filtered = state.checklist.filter(t => t.completed);

        container.innerHTML = filtered.map(item => `
            <li class="task-item ${item.completed ? 'completed' : ''}" data-id="${item.id}">
                <div class="task-left">
                    <div class="custom-checkbox" data-action="toggle">
                        <i data-lucide="check"></i>
                    </div>
                    <span class="task-title">${item.title}</span>
                </div>
                <div class="task-right" style="display:flex; align-items:center; gap:10px;">
                    <span class="task-tag">${item.tag || 'Protocol'}</span>
                    <button class="task-delete-btn" data-action="delete"><i data-lucide="trash-2"></i></button>
                </div>
            </li>
        `).join('');

        if (window.lucide) window.lucide.createIcons();
    }

    function renderQuickStats() {
        document.getElementById('stat-weight').textContent = state.stats.weight;
        document.getElementById('stat-calories').textContent = state.stats.calories.toLocaleString();
        document.getElementById('stat-protein').textContent = state.stats.protein;
        document.getElementById('stat-water').textContent = state.stats.water;
        document.getElementById('stat-sleep').textContent = state.stats.sleep;
        document.getElementById('stat-mood').textContent = state.stats.mood;

        document.getElementById('stat-bar-calories').style.width = `${Math.min(100, (state.stats.calories / state.stats.caloriesMax) * 100)}%`;
        document.getElementById('stat-bar-protein').style.width = `${Math.min(100, (state.stats.protein / state.stats.proteinMax) * 100)}%`;
        document.getElementById('stat-bar-water').style.width = `${Math.min(100, (state.stats.water / state.stats.waterMax) * 100)}%`;
    }

    function renderGoals() {
        const container = document.getElementById('goals-container');
        if (!container) return;

        container.innerHTML = state.goals.map(g => `
            <div class="goal-card glass-card">
                <div class="goal-header">
                    <h4 class="goal-title">${g.title}</h4>
                    <span class="goal-cat">${g.category}</span>
                </div>
                <div class="goal-progress-group">
                    <div class="goal-progress-meta">
                        <span style="color:var(--text-muted)">Progress</span>
                        <span class="goal-pct">${g.progress}%</span>
                    </div>
                    <div class="goal-bar-track">
                        <div class="goal-bar-fill" style="width:${g.progress}%"></div>
                    </div>
                </div>
                <div class="goal-footer">
                    <span>Target: ${g.dueDate}</span>
                    <span class="gold-text">High Priority</span>
                </div>
            </div>
        `).join('');
    }

    function renderQuote() {
        const q = state.quotes[state.currentQuoteIndex || 0];
        if (q) {
            document.getElementById('quote-text').textContent = `"${q.text}"`;
            document.getElementById('quote-author').textContent = q.author;
        }
    }

    function renderTransformation() {
        const tb = state.transformation.body;
        if (tb) {
            document.getElementById('trans-weight').textContent = tb.weight;
            document.getElementById('trans-fat').textContent = tb.bodyFat;
            document.getElementById('trans-muscle').textContent = tb.muscleMass;

            document.getElementById('meas-waist').textContent = `${tb.waist} in`;
            document.getElementById('meas-chest').textContent = `${tb.chest} in`;
            document.getElementById('meas-shoulders').textContent = `${tb.shoulders} in`;
            document.getElementById('meas-arms').textContent = `${tb.arms} in`;
            document.getElementById('meas-legs').textContent = `${tb.legs} in`;
        }

        const washValEl = document.getElementById('hair-wash-val');
        if (washValEl) {
            washValEl.textContent = state.transformation.hair.wasWashedToday ? 'Washed Today' : 'Wash Recommended';
            washValEl.className = state.transformation.hair.wasWashedToday ? 'hair-val green-text' : 'hair-val gold-text';
        }

        const wishlistContainer = document.getElementById('wishlist-container');
        const wishlistBadge = document.getElementById('wishlist-count-badge');

        if (wishlistContainer && state.transformation.wishlist) {
            const list = state.transformation.wishlist;
            if (wishlistBadge) wishlistBadge.textContent = `${list.filter(w => w.acquired).length}/${list.length} Acquired`;

            wishlistContainer.innerHTML = list.map(item => `
                <li class="wishlist-item ${item.acquired ? 'acquired' : ''}" data-id="${item.id}">
                    <div style="display:flex; align-items:center; gap:12px;">
                        <div class="custom-checkbox" data-action="toggle-wish">
                            <i data-lucide="check"></i>
                        </div>
                        <span class="wish-title">${item.item}</span>
                    </div>
                    <div style="display:flex; align-items:center; gap:12px;">
                        <span class="task-tag">${item.category}</span>
                        <span class="wish-price">${item.price}</span>
                        <button class="task-delete-btn" data-action="delete-wish"><i data-lucide="trash-2"></i></button>
                    </div>
                </li>
            `).join('');

            if (window.lucide) window.lucide.createIcons();
        }
    }

    function renderGymOS() {
        const activeSplit = state.gym.activeSplit || 'push';
        const routine = state.gym.routines[activeSplit];

        if (routine) {
            document.getElementById('active-split-badge').textContent = routine.badge;
            document.getElementById('gym-workout-title').innerHTML = `${routine.title.split('—')[0]} — <span class="gold-gradient-text">${routine.title.split('—')[1] || ''}</span>`;
            document.getElementById('target-ex-count').textContent = `${routine.exercises.length} Exercises`;

            const container = document.getElementById('exercises-container');
            if (container) {
                container.innerHTML = routine.exercises.map(ex => `
                    <div class="exercise-card glass-card" data-ex-id="${ex.id}">
                        <div class="ex-card-header">
                            <div class="ex-title-group">
                                <h4>${ex.name}</h4>
                                <span class="task-tag">${ex.targetMuscle}</span>
                            </div>
                            <span class="pr-badge-sm"><i data-lucide="award"></i> PR: ${ex.pr}</span>
                        </div>
                        <table class="sets-table">
                            <thead>
                                <tr>
                                    <th>SET</th>
                                    <th>REPS</th>
                                    <th>WEIGHT (KG)</th>
                                    <th>COMPLETED</th>
                                    <th>NOTES</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${ex.sets.map(s => `
                                    <tr class="set-row ${s.completed ? 'completed-set' : ''}" data-set-num="${s.setNum}">
                                        <td><span class="set-num-badge">SET ${s.setNum}</span></td>
                                        <td><input type="number" class="set-input input-reps" value="${s.reps}"></td>
                                        <td><input type="number" step="0.5" class="set-input input-weight" value="${s.weight}"></td>
                                        <td>
                                            <div class="custom-checkbox ${s.completed ? 'checked' : ''}" data-action="toggle-set">
                                                <i data-lucide="check"></i>
                                            </div>
                                        </td>
                                        <td><input type="text" class="set-notes-input" placeholder="Notes..." value="${s.notes || ''}"></td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                `).join('');
            }
        }

        const prsContainer = document.getElementById('prs-container');
        if (prsContainer && state.gym.prs) {
            prsContainer.innerHTML = state.gym.prs.map(pr => `
                <div class="pr-card glass-card">
                    <div class="pr-icon-top">
                        <div class="pr-trophy-box"><i data-lucide="trophy"></i></div>
                        <span class="pr-reps-sub">${pr.reps} Reps</span>
                    </div>
                    <span class="pr-lift-name">${pr.lift}</span>
                    <span class="pr-weight-val">${pr.weight} kg</span>
                    <span style="font-size:0.72rem; color:var(--text-muted);">${pr.date}</span>
                </div>
            `).join('');
        }

        if (window.lucide) window.lucide.createIcons();
    }

    function setupBeforeAfterSlider() {
        const container = document.getElementById('slider-container');
        const afterLayer = document.getElementById('after-layer');
        const handle = document.getElementById('slider-handle');

        if (!container || !afterLayer || !handle) return;

        let isDragging = false;

        function updateSliderPosition(clientX) {
            const rect = container.getBoundingClientRect();
            let x = clientX - rect.left;
            x = Math.max(0, Math.min(x, rect.width));
            const percentage = (x / rect.width) * 100;
            afterLayer.style.width = `${percentage}%`;
            handle.style.left = `${percentage}%`;
        }

        container.addEventListener('mousedown', (e) => {
            isDragging = true;
            updateSliderPosition(e.clientX);
        });

        window.addEventListener('mousemove', (e) => {
            if (isDragging) updateSliderPosition(e.clientX);
        });

        window.addEventListener('mouseup', () => { isDragging = false; });

        container.addEventListener('touchstart', (e) => {
            isDragging = true;
            if (e.touches[0]) updateSliderPosition(e.touches[0].clientX);
        });

        window.addEventListener('touchmove', (e) => {
            if (isDragging && e.touches[0]) updateSliderPosition(e.touches[0].clientX);
        });

        window.addEventListener('touchend', () => { isDragging = false; });
    }

    function setupEventListeners() {
        const soundBtn = document.getElementById('sound-toggle-btn');
        if (soundBtn) {
            soundBtn.addEventListener('click', () => {
                state.user.soundEnabled = !state.user.soundEnabled;
                saveState();
                renderHero();
            });
        }

        const resetBtn = document.getElementById('reset-data-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                if (confirm('Reset Momentum OS data back to factory defaults?')) {
                    state = JSON.parse(JSON.stringify(DEFAULT_STATE));
                    saveState();
                    renderAll();
                    updateChartsData();
                }
            });
        }

        const refreshQuoteBtn = document.getElementById('refresh-quote-btn');
        if (refreshQuoteBtn) {
            refreshQuoteBtn.addEventListener('click', () => {
                state.currentQuoteIndex = (state.currentQuoteIndex + 1) % state.quotes.length;
                saveState();
                renderQuote();
            });
        }

        // Split Selector Buttons
        document.addEventListener('click', (e) => {
            const splitBtn = e.target.closest('.split-pill');
            if (splitBtn) {
                document.querySelectorAll('.split-pill').forEach(p => p.classList.remove('active'));
                splitBtn.classList.add('active');
                state.gym.activeSplit = splitBtn.dataset.split;
                saveState();
                renderGymOS();
            }
        });

        // Ring Increments & Decrements
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.ring-btn');
            if (btn) {
                const target = btn.dataset.target;
                const isInc = btn.classList.contains('increment');
                if (target && state.rings[target]) {
                    const step = target === 'water' || target === 'sleep' || target === 'study' || target === 'productivity' ? 0.5 : 5;
                    if (isInc) {
                        state.rings[target].current = parseFloat((state.rings[target].current + step).toFixed(1));
                        addXP(50);
                    } else {
                        state.rings[target].current = Math.max(0, parseFloat((state.rings[target].current - step).toFixed(1)));
                    }
                    saveState();
                    renderHero();
                    renderRings();
                }
            }
        });

        // Checklist Interactions
        const checklistContainer = document.getElementById('checklist-container');
        if (checklistContainer) {
            checklistContainer.addEventListener('click', (e) => {
                const itemEl = e.target.closest('.task-item');
                if (!itemEl) return;
                const taskId = itemEl.dataset.id;
                const actionBtn = e.target.closest('[data-action]');
                const action = actionBtn ? actionBtn.dataset.action : 'toggle';

                const task = state.checklist.find(t => t.id === taskId);
                if (!task) return;

                if (action === 'delete') {
                    state.checklist = state.checklist.filter(t => t.id !== taskId);
                } else {
                    task.completed = !task.completed;
                    if (task.completed) {
                        playSound('check');
                        addXP(100);
                        if (state.checklist.every(t => t.completed) && window.confetti) {
                            playSound('complete');
                            window.confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
                        }
                    } else {
                        playSound('uncheck');
                    }
                }
                saveState();
                renderHero();
                renderChecklist();
            });
        }

        const addTaskForm = document.getElementById('add-task-form');
        if (addTaskForm) {
            addTaskForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const input = document.getElementById('task-input');
                const title = input.value.trim();
                if (title) {
                    state.checklist.push({ id: 'task-' + Date.now(), title: title, tag: 'Custom', completed: false });
                    input.value = '';
                    saveState();
                    renderHero();
                    renderChecklist();
                }
            });
        }

        document.addEventListener('click', (e) => {
            const filterBtn = e.target.closest('.filter-btn');
            if (filterBtn) {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                filterBtn.classList.add('active');
                renderChecklist(filterBtn.dataset.filter);
            }
        });

        const resetWashBtn = document.getElementById('reset-wash-btn');
        if (resetWashBtn) {
            resetWashBtn.addEventListener('click', () => {
                state.transformation.hair.wasWashedToday = true;
                saveState();
                renderTransformation();
                playSound('check');
            });
        }

        // Wishlist Interactions
        const wishlistContainer = document.getElementById('wishlist-container');
        if (wishlistContainer) {
            wishlistContainer.addEventListener('click', (e) => {
                const itemEl = e.target.closest('.wishlist-item');
                if (!itemEl) return;
                const itemId = itemEl.dataset.id;
                const actionBtn = e.target.closest('[data-action]');
                const action = actionBtn ? actionBtn.dataset.action : 'toggle-wish';

                const wishItem = state.transformation.wishlist.find(w => w.id === itemId);
                if (!wishItem) return;

                if (action === 'delete-wish') {
                    state.transformation.wishlist = state.transformation.wishlist.filter(w => w.id !== itemId);
                } else {
                    wishItem.acquired = !wishItem.acquired;
                    if (wishItem.acquired) playSound('check');
                }
                saveState();
                renderTransformation();
            });
        }

        // Gym Set Completion & Input Handler
        const exContainer = document.getElementById('exercises-container');
        if (exContainer) {
            exContainer.addEventListener('click', (e) => {
                const toggleBox = e.target.closest('[data-action="toggle-set"]');
                if (!toggleBox) return;

                const exCard = e.target.closest('.exercise-card');
                const setRow = e.target.closest('.set-row');
                if (!exCard || !setRow) return;

                const exId = exCard.dataset.exId;
                const setNum = parseInt(setRow.dataset.setNum);

                const activeSplit = state.gym.activeSplit || 'push';
                const routine = state.gym.routines[activeSplit];
                const exercise = routine ? routine.exercises.find(x => x.id === exId) : null;
                const setObj = exercise ? exercise.sets.find(s => s.setNum === setNum) : null;

                if (setObj) {
                    setObj.completed = !setObj.completed;
                    if (setObj.completed) {
                        playSound('check');
                        addXP(75);
                        triggerRestTimer(state.gym.restTargetSec || 90);
                    }
                    saveState();
                    renderGymOS();
                    renderHero();
                }
            });

            // Live input changes for reps, weights, notes
            exContainer.addEventListener('change', (e) => {
                const input = e.target;
                const exCard = input.closest('.exercise-card');
                const setRow = input.closest('.set-row');
                if (!exCard || !setRow) return;

                const exId = exCard.dataset.exId;
                const setNum = parseInt(setRow.dataset.setNum);
                const activeSplit = state.gym.activeSplit || 'push';
                const routine = state.gym.routines[activeSplit];
                const exercise = routine ? routine.exercises.find(x => x.id === exId) : null;
                const setObj = exercise ? exercise.sets.find(s => s.setNum === setNum) : null;

                if (setObj) {
                    if (input.classList.contains('input-reps')) {
                        setObj.reps = parseInt(input.value) || setObj.reps;
                    } else if (input.classList.contains('input-weight')) {
                        setObj.weight = parseFloat(input.value) || setObj.weight;
                    } else if (input.classList.contains('set-notes-input')) {
                        setObj.notes = input.value;
                    }
                    saveState();
                }
            });
        }

        // Strength Chart Tabs
        document.addEventListener('click', (e) => {
            const chartTab = e.target.closest('.pr-chart-tabs .chart-tab');
            if (chartTab) {
                document.querySelectorAll('.pr-chart-tabs .chart-tab').forEach(t => t.classList.remove('active'));
                chartTab.classList.add('active');
                updateStrengthChart(chartTab.dataset.prlift);
            }
        });

        // Modals Setup
        setupModal('edit-mission-btn', 'mission-modal', 'close-mission-modal', 'cancel-mission-modal', 'mission-form', () => {
            state.user.mission = document.getElementById('input-mission').value.trim();
            saveState();
            renderHero();
        });

        setupModal('open-edit-stats-modal', 'stats-modal', 'close-stats-modal', 'cancel-stats-modal', 'stats-form', () => {
            state.stats.weight = parseFloat(document.getElementById('input-weight').value) || state.stats.weight;
            state.stats.calories = parseInt(document.getElementById('input-calories').value) || state.stats.calories;
            state.stats.protein = parseInt(document.getElementById('input-protein').value) || state.stats.protein;
            state.stats.water = parseFloat(document.getElementById('input-water').value) || state.stats.water;
            state.stats.sleep = parseFloat(document.getElementById('input-sleep').value) || state.stats.sleep;
            state.stats.mood = document.getElementById('input-mood').value;

            state.transformation.body.weight = state.stats.weight;
            saveState();
            renderQuickStats();
            renderTransformation();
            renderHero();
        });

        setupModal('add-goal-btn', 'goal-modal', 'close-goal-modal', 'cancel-goal-modal', 'goal-form', () => {
            const title = document.getElementById('in-goal-title').value.trim();
            const cat = document.getElementById('in-goal-cat').value.trim();
            const date = document.getElementById('in-goal-date').value.trim();

            if (title) {
                state.goals.push({ id: 'g-' + Date.now(), title: title, category: cat || 'Target', progress: 10, dueDate: date || 'Soon' });
                saveState();
                renderGoals();
            }
        });

        setupModal('open-log-trans-modal', 'trans-log-modal', 'close-trans-modal', 'cancel-trans-modal', 'trans-log-form', () => {
            const tb = state.transformation.body;
            tb.weight = parseFloat(document.getElementById('in-trans-weight').value) || tb.weight;
            tb.bodyFat = parseFloat(document.getElementById('in-trans-fat').value) || tb.bodyFat;
            tb.muscleMass = parseFloat(document.getElementById('in-trans-muscle').value) || tb.muscleMass;
            tb.waist = parseFloat(document.getElementById('in-trans-waist').value) || tb.waist;
            tb.chest = parseFloat(document.getElementById('in-trans-chest').value) || tb.chest;
            tb.arms = parseFloat(document.getElementById('in-trans-arms').value) || tb.arms;

            state.stats.weight = tb.weight;
            saveState();
            renderTransformation();
            renderQuickStats();
            renderHero();
        });

        setupModal('open-wishlist-modal', 'wishlist-modal', 'close-wishlist-modal', 'cancel-wishlist-modal', 'wishlist-form', () => {
            const item = document.getElementById('in-wish-item').value.trim();
            const price = document.getElementById('in-wish-price').value.trim();
            const cat = document.getElementById('in-wish-cat').value.trim();

            if (item) {
                state.transformation.wishlist.push({
                    id: 'w-' + Date.now(),
                    item: item,
                    price: price || '$100',
                    category: cat || 'Style',
                    acquired: false
                });
                saveState();
                renderTransformation();
            }
        });

        setupModal('open-log-pr-modal', 'pr-modal', 'close-pr-modal', 'cancel-pr-modal', 'pr-form', () => {
            const lift = document.getElementById('in-pr-lift').value;
            const weight = parseFloat(document.getElementById('in-pr-weight').value) || 100;
            const reps = parseInt(document.getElementById('in-pr-reps').value) || 5;

            if (lift && weight) {
                const existing = state.gym.prs.find(p => p.lift.toLowerCase().includes(lift.toLowerCase().split(' ')[0]));
                if (existing) {
                    existing.weight = weight;
                    existing.reps = reps;
                    existing.date = 'Today';
                } else {
                    state.gym.prs.push({ id: 'pr-' + Date.now(), lift: lift, weight: weight, reps: reps, date: 'Today' });
                }
                saveState();
                renderGymOS();
                playSound('complete');
                if (window.confetti) window.confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
            }
        });

        setupModal('open-add-ex-modal', 'add-ex-modal', 'close-add-ex-modal', 'cancel-add-ex-modal', 'add-ex-form', () => {
            const name = document.getElementById('in-ex-name').value.trim();
            const muscle = document.getElementById('in-ex-muscle').value.trim();
            const setsCount = parseInt(document.getElementById('in-ex-sets').value) || 3;

            if (name) {
                const activeSplit = state.gym.activeSplit || 'push';
                const sets = [];
                for (let i = 1; i <= setsCount; i++) {
                    sets.push({ setNum: i, reps: 10, weight: 50.0, completed: false, notes: '' });
                }
                state.gym.routines[activeSplit].exercises.push({
                    id: 'ex-' + Date.now(),
                    name: name,
                    targetMuscle: muscle || 'General',
                    pr: '50.0 kg x 10',
                    sets: sets
                });
                saveState();
                renderGymOS();
            }
        });
    }

    function setupModal(openBtnId, modalId, closeBtnId, cancelBtnId, formId, onSubmit) {
        const openBtn = document.getElementById(openBtnId);
        const modal = document.getElementById(modalId);
        const closeBtn = document.getElementById(closeBtnId);
        const cancelBtn = document.getElementById(cancelBtnId);
        const form = document.getElementById(formId);

        if (openBtn && modal) {
            openBtn.addEventListener('click', () => modal.classList.add('active'));
        }
        [closeBtn, cancelBtn].forEach(b => {
            if (b) b.addEventListener('click', () => modal.classList.remove('active'));
        });
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                onSubmit();
                modal.classList.remove('active');
            });
        }
    }

    function addXP(amount) {
        state.user.xp += amount;
        if (state.user.xp >= state.user.xpMax) {
            state.user.level += 1;
            state.user.xp = state.user.xp - state.user.xpMax;
            playSound('complete');
            if (window.confetti) window.confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
        }
        saveState();
        renderHero();
    }

    // Chart.js Engine
    function initCharts() {
        if (!window.Chart) return;

        const ctx1 = document.getElementById('lifeScoreChart');
        if (ctx1) {
            const gradient1 = ctx1.getContext('2d').createLinearGradient(0, 0, 0, 200);
            gradient1.addColorStop(0, 'rgba(212, 175, 55, 0.4)');
            gradient1.addColorStop(1, 'rgba(212, 175, 55, 0.0)');

            lifeChartInstance = new Chart(ctx1, {
                type: 'line',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'Life Score',
                        data: [88, 90, 85, 94, 91, 95, 92],
                        borderColor: '#D4AF37',
                        borderWidth: 3,
                        fill: true,
                        backgroundColor: gradient1,
                        tension: 0.4,
                        pointBackgroundColor: '#F3E5AB',
                        pointBorderColor: '#D4AF37',
                        pointRadius: 5
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#8E8E93' } },
                        y: { min: 70, max: 100, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#8E8E93' } }
                    }
                }
            });
        }

        const ctx2 = document.getElementById('vitalsChart');
        if (ctx2) {
            vitalsChartInstance = new Chart(ctx2, {
                type: 'bar',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [
                        { label: 'Water (L)', data: [3.5, 4.0, 3.2, 3.8, 4.0, 3.6, 3.2], backgroundColor: 'rgba(59, 130, 246, 0.7)', borderRadius: 6 },
                        { label: 'Protein (g/10)', data: [17, 18, 16.5, 18, 17.5, 18, 16.5], backgroundColor: 'rgba(239, 68, 68, 0.7)', borderRadius: 6 }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { labels: { color: '#9A9AA0' } } },
                    scales: {
                        x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#8E8E93' } },
                        y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#8E8E93' } }
                    }
                }
            });
        }

        const ctx3 = document.getElementById('bodyProgressionChart');
        if (ctx3) {
            const gradientBody = ctx3.getContext('2d').createLinearGradient(0, 0, 0, 200);
            gradientBody.addColorStop(0, 'rgba(52, 211, 153, 0.3)');
            gradientBody.addColorStop(1, 'rgba(52, 211, 153, 0.0)');

            bodyProgressionChartInstance = new Chart(ctx3, {
                type: 'line',
                data: {
                    labels: ['Wk 1', 'Wk 3', 'Wk 6', 'Wk 9', 'Wk 12'],
                    datasets: [
                        { label: 'Weight (kg)', data: [87.0, 84.5, 82.0, 79.8, 78.5], borderColor: '#D4AF37', borderWidth: 2, tension: 0.3, yAxisID: 'y' },
                        { label: 'Body Fat %', data: [22.0, 19.5, 17.2, 14.8, 13.2], borderColor: '#34D399', borderWidth: 2, fill: true, backgroundColor: gradientBody, tension: 0.3, yAxisID: 'y1' }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { labels: { color: '#9A9AA0' } } },
                    scales: {
                        x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#8E8E93' } },
                        y: { position: 'left', grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#D4AF37' } },
                        y1: { position: 'right', grid: { drawOnChartArea: false }, ticks: { color: '#34D399' } }
                    }
                }
            });
        }

        const ctx4 = document.getElementById('strengthChart');
        if (ctx4) {
            const gradientStrength = ctx4.getContext('2d').createLinearGradient(0, 0, 0, 240);
            gradientStrength.addColorStop(0, 'rgba(212, 175, 55, 0.4)');
            gradientStrength.addColorStop(1, 'rgba(212, 175, 55, 0.0)');

            strengthChartInstance = new Chart(ctx4, {
                type: 'line',
                data: {
                    labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Current'],
                    datasets: [{
                        label: 'Estimated 1RM (kg)',
                        data: [95.0, 102.5, 107.5, 112.5, 117.5, 120.0],
                        borderColor: '#D4AF37',
                        borderWidth: 3,
                        fill: true,
                        backgroundColor: gradientStrength,
                        tension: 0.3,
                        pointBackgroundColor: '#F3E5AB',
                        pointBorderColor: '#D4AF37',
                        pointRadius: 6
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#8E8E93' } },
                        y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#D4AF37' } }
                    }
                }
            });
        }
    }

    function updateStrengthChart(liftKey) {
        if (!strengthChartInstance) return;

        const titleEl = document.getElementById('pr-chart-title');
        const prEl = document.getElementById('pr-chart-alltime');

        let data = [];
        let title = '';
        let pr = '';

        if (liftKey === 'squat') {
            title = 'Barbell Back Squat (1RM Progression)';
            pr = '160.0 kg';
            data = [120, 130, 140, 150, 155, 160];
        } else if (liftKey === 'deadlift') {
            title = 'Conventional Deadlift (1RM Progression)';
            pr = '200.0 kg';
            data = [150, 165, 175, 185, 195, 200];
        } else if (liftKey === 'pullup') {
            title = 'Weighted Pull-Up (+kg Weight Added)';
            pr = '+30.0 kg';
            data = [10, 15, 20, 22.5, 27.5, 30];
        } else {
            title = 'Bench Press (1RM Progression)';
            pr = '120.0 kg';
            data = [95, 102.5, 107.5, 112.5, 117.5, 120];
        }

        if (titleEl) titleEl.textContent = title;
        if (prEl) prEl.innerHTML = `All-Time PR: <strong>${pr}</strong>`;

        strengthChartInstance.data.datasets[0].data = data;
        strengthChartInstance.update();
    }

    function updateChartsData() {
        if (lifeChartInstance) lifeChartInstance.update();
        if (vitalsChartInstance) vitalsChartInstance.update();
        if (bodyProgressionChartInstance) bodyProgressionChartInstance.update();
        if (strengthChartInstance) strengthChartInstance.update();
    }

})();
