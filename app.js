/* ==========================================================================
   MOMENTUM OS — APPLICATION ENGINE & REAL-TIME INTERACTION CONTROLLER
   ========================================================================== */

(function () {
    'use strict';    const STORAGE_KEY = 'MOMENTUM_OS_STATE_V3';

    const TODAY_KEY = new Date().toISOString().slice(0, 10);

    // Clean Default State (Ready for Real Daily Interaction & Storage)
    const DEFAULT_STATE = {
        activeView: 'dashboard',
        user: {
            name: 'Architect',
            level: 1,
            xp: 0,
            xpMax: 1000,
            streak: 0,
            mission: 'Define your core mission and conquer daily targets.',
            soundEnabled: true,
            lastActiveDate: TODAY_KEY
        },
        rings: {
            workout: { current: 0, max: 60, unit: 'min' },
            protein: { current: 0, max: 180, unit: 'g' },
            water: { current: 0, max: 4.0, unit: 'L' },
            sleep: { current: 0, max: 8.0, unit: 'hrs' },
            study: { current: 0, max: 2.5, unit: 'hrs' },
            productivity: { current: 0, max: 8.0, unit: 'hrs' }
        },
        checklist: [
            { id: 'task-1', title: 'Wake up at 06:00 AM & Hydrate', tag: 'Routine', completed: false },
            { id: 'task-2', title: 'Morning Skincare Protocol', tag: 'Health', completed: false },
            { id: 'task-3', title: 'Workout (Hypertrophy / Cardio)', tag: 'Fitness', completed: false },
            { id: 'task-4', title: 'Hit Daily Protein Target (180g)', tag: 'Nutrition', completed: false },
            { id: 'task-5', title: 'AWS / Deep Work Focused Study', tag: 'Learning', completed: false },
            { id: 'task-6', title: 'Read 20 Pages (Mindset & Design)', tag: 'Mindset', completed: false },
            { id: 'task-7', title: 'Journaling & Daily Reflection', tag: 'Reflection', completed: false },
            { id: 'task-8', title: 'Night Skincare & Wind Down', tag: 'Health', completed: false },
            { id: 'task-9', title: 'Sleep by 01:00 AM (8 Hrs Target)', tag: 'Recovery', completed: false }
        ],
        stats: {
            weight: 75.0,
            calories: 0,
            caloriesMax: 2800,
            protein: 0,
            proteinMax: 180,
            water: 0,
            waterMax: 4.0,
            sleep: 0,
            mood: '⚖️ Focused'
        },
        goals: [
            { id: 'g1', title: 'Pass AWS Certified Solutions Architect', category: 'Certification', progress: 0, dueDate: 'Target Date' },
            { id: 'g2', title: 'Achieve Peak Fitness & Body Recomposition', category: 'Physical Peak', progress: 0, dueDate: 'Target Date' },
            { id: 'g3', title: 'Master Scalable Systems & High Performance Coding', category: 'Engineering', progress: 0, dueDate: 'Target Date' }
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
            body: { weight: 75.0, bodyFat: 15.0, muscleMass: 35.0, waist: 32.0, chest: 40.0, shoulders: 48.0, arms: 15.0, legs: 23.0 },
            skin: { score: 80, acne: 'Clear', pigmentation: 'Minimal', texture: 'Smooth', glow: 85 },
            hair: { density: 'Thick', growthRate: '+0.5 in/mo', lastWashed: 'Today', wasWashedToday: false },
            beard: { stage: 'Tailored Stubble', density: 'Uniform', nextTrimDays: 3 },
            wishlist: [
                { id: 'w1', item: 'Tailored Overcoat', price: '$350', category: 'Outerwear', acquired: false },
                { id: 'w2', item: 'Minimalist Leather Watch', price: '$250', category: 'Accessories', acquired: false }
            ]
        },

        skincare: {
            am: {
                cleanser: false,
                vitc: false,
                niacinamide: false,
                moisturizer: false,
                sunscreen: false
            },
            pm: {
                cleanser: false,
                serum: false,
                moisturizer: false,
                retinol: false
            },
            metrics: {
                tone: 94,
                pigment: 'Minimal (-15%)',
                acne: '0 Active (Clear)',
                texture: 95
            },
            products: [
                { id: 'p1', name: 'Hydrating Cleanser', brand: 'CeraVe / Derma Formula', category: 'CLEANSER', ingredient: 'Hyaluronic Acid + Ceramides', pao: 'PAO: 12M', stock: 80 },
                { id: 'p2', name: '15% L-Ascorbic Acid + Ferulic', brand: 'SkinCeuticals C E Ferulic', category: 'AM SERUM', ingredient: 'Pure Vitamin C 15%', pao: 'PAO: 6M', stock: 50 },
                { id: 'p3', name: 'Niacinamide 10% + Zinc 1%', brand: 'The Ordinary', category: 'SERUM', ingredient: 'Vitamin B3 + Zinc PCA', pao: 'PAO: 12M', stock: 70 },
                { id: 'p4', name: '0.5% Pure Retinol Night Serum', brand: "Paula's Choice Clinical", category: 'PM SERUM', ingredient: 'Pure Retinol 0.5%', pao: 'PAO: 6M', stock: 65 },
                { id: 'p5', name: 'Cicaplast Baume B5+ Cream', brand: 'La Roche-Posay', category: 'MOISTURIZER', ingredient: 'Panthenol 5% + Madecassoside', pao: 'PAO: 12M', stock: 25 },
                { id: 'p6', name: 'Anthelios Fluid SPF 50+', brand: 'La Roche-Posay', category: 'SUNSCREEN', ingredient: 'Mexoryl 400 UV Shield', pao: 'PAO: 12M', stock: 90 }
            ]
        },

        gym: {
            activeSplit: 'push',
            restTargetSec: 90,
            prs: [
                { id: 'pr-1', lift: 'Bench Press', weight: 100.0, reps: 5, date: TODAY_KEY },
                { id: 'pr-2', lift: 'Barbell Back Squat', weight: 120.0, reps: 5, date: TODAY_KEY },
                { id: 'pr-3', lift: 'Conventional Deadlift', weight: 140.0, reps: 3, date: TODAY_KEY }
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
                            pr: '100.0 kg x 5',
                            sets: [
                                { setNum: 1, reps: 10, weight: 60.0, completed: false, notes: '' },
                                { setNum: 2, reps: 8, weight: 70.0, completed: false, notes: '' },
                                { setNum: 3, reps: 6, weight: 80.0, completed: false, notes: '' }
                            ]
                        },
                        {
                            id: 'ex-2',
                            name: 'Incline Dumbbell Press',
                            targetMuscle: 'Upper Chest',
                            pr: '32.0 kg x 8',
                            sets: [
                                { setNum: 1, reps: 10, weight: 24.0, completed: false, notes: '' },
                                { setNum: 2, reps: 8, weight: 28.0, completed: false, notes: '' }
                            ]
                        },
                        {
                            id: 'ex-3',
                            name: 'Standing Overhead Press (OHP)',
                            targetMuscle: 'Deltoids',
                            pr: '60.0 kg x 5',
                            sets: [
                                { setNum: 1, reps: 8, weight: 45.0, completed: false, notes: '' },
                                { setNum: 2, reps: 6, weight: 50.0, completed: false, notes: '' }
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
                            pr: '+15.0 kg x 6',
                            sets: [
                                { setNum: 1, reps: 8, weight: 0.0, completed: false, notes: '' },
                                { setNum: 2, reps: 6, weight: 10.0, completed: false, notes: '' }
                            ]
                        },
                        {
                            id: 'ex-p2',
                            name: 'Barbell Bent-Over Rows',
                            targetMuscle: 'Rhomboids & Lats',
                            pr: '80.0 kg x 8',
                            sets: [
                                { setNum: 1, reps: 10, weight: 60.0, completed: false, notes: '' },
                                { setNum: 2, reps: 8, weight: 70.0, completed: false, notes: '' }
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
                            pr: '120.0 kg x 5',
                            sets: [
                                { setNum: 1, reps: 8, weight: 80.0, completed: false, notes: '' },
                                { setNum: 2, reps: 6, weight: 100.0, completed: false, notes: '' }
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
                            pr: '80.0 kg x 6',
                            sets: [
                                { setNum: 1, reps: 8, weight: 60.0, completed: false, notes: '' }
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
                            pr: '20.0 kg DBs x 10',
                            sets: [
                                { setNum: 1, reps: 10, weight: 16.0, completed: false, notes: '' }
                            ]
                        }
                    ]
                }
            }
        },
        dailyHistory: {}
    };

    const SCHEDULE_BLOCKS = [
        { time: '06:00 AM', name: 'Wake Up & Hydration Protocol', sub: '500ml Water + Morning Sunlight' },
        { time: '06:30 AM', name: 'Morning Skincare & Cold Shower', sub: 'Reset Nervous System' },
        { time: '07:30 AM', name: 'AWS Deep Work Study', sub: 'Solutions Architect Focus' },
        { time: '10:00 AM', name: 'High Protein Meal #1', sub: 'Protein + Micronutrients' },
        { time: '11:30 AM', name: 'Engineering & OS Architecture', sub: 'Focused Coding Session' },
        { time: '04:30 PM', name: 'Hypertrophy Training Session', sub: 'Active Daily Workout Split' },
        { time: '06:30 PM', name: 'Post-Workout Fuel & Meal #2', sub: 'Carbs + Protein Recovery' },
        { time: '08:30 PM', name: 'Reading & Daily Journaling', sub: 'Mindset & Evening Reflection' },
        { time: '10:30 PM', name: 'Night Skincare & Wind Down', sub: 'Dim Lights + Relaxation' },
        { time: '01:00 AM', name: 'Sleep & Full Recovery', sub: '8.0 Hours Target' }
    ];

    let state = loadState();
    let audioCtx = null;

    let workoutTimerSeconds = 0;
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
                let loadedState = {
                    ...DEFAULT_STATE,
                    ...parsed,
                    transformation: { ...DEFAULT_STATE.transformation, ...(parsed.transformation || {}) },
                    gym: { ...DEFAULT_STATE.gym, ...(parsed.gym || {}) },
                    dailyHistory: parsed.dailyHistory || {}
                };
                return checkDailyRollover(loadedState);
            }
        } catch (e) {
            console.error('Failed to load state', e);
        }
        return checkDailyRollover(JSON.parse(JSON.stringify(DEFAULT_STATE)));
    }

    function checkDailyRollover(loadedState) {
        const todayStr = new Date().toISOString().slice(0, 10);
        const lastDate = loadedState.user.lastActiveDate;

        if (lastDate && lastDate !== todayStr) {
            // Archive previous day's metrics into dailyHistory
            if (!loadedState.dailyHistory) loadedState.dailyHistory = {};

            const completedTasks = loadedState.checklist ? loadedState.checklist.filter(t => t.completed).length : 0;
            loadedState.dailyHistory[lastDate] = {
                date: lastDate,
                completedTasks: completedTasks,
                totalTasks: loadedState.checklist ? loadedState.checklist.length : 0,
                stats: JSON.parse(JSON.stringify(loadedState.stats)),
                rings: JSON.parse(JSON.stringify(loadedState.rings)),
                workoutCompleted: loadedState.gym ? isGymRoutineCompleted(loadedState.gym) : false
            };

            // Increment streak if previous day was active
            if (completedTasks > 0) {
                loadedState.user.streak = (loadedState.user.streak || 0) + 1;
            }

            // Reset checklist completion for the new day
            if (loadedState.checklist) {
                loadedState.checklist.forEach(task => task.completed = false);
            }

            // Reset vitals ring current progress for the new day
            if (loadedState.rings) {
                for (let k in loadedState.rings) loadedState.rings[k].current = 0;
            }

            // Reset stats inputs for the new day
            if (loadedState.stats) {
                loadedState.stats.calories = 0;
                loadedState.stats.protein = 0;
                loadedState.stats.water = 0;
                loadedState.stats.sleep = 0;
            }

            // Reset gym routine set completion for the new day
            if (loadedState.gym && loadedState.gym.routines) {
                for (let splitKey in loadedState.gym.routines) {
                    loadedState.gym.routines[splitKey].exercises.forEach(ex => {
                        ex.sets.forEach(s => s.completed = false);
                    });
                }
            }

            loadedState.user.lastActiveDate = todayStr;
            saveStateDirect(loadedState);
        } else if (!lastDate) {
            loadedState.user.lastActiveDate = todayStr;
        }

        return loadedState;
    }

    function isGymRoutineCompleted(gymObj) {
        const split = gymObj.activeSplit || 'push';
        const routine = gymObj.routines ? gymObj.routines[split] : null;
        if (!routine || !routine.exercises) return false;
        let total = 0, done = 0;
        routine.exercises.forEach(ex => {
            ex.sets.forEach(s => {
                total++;
                if (s.completed) done++;
            });
        });
        return total > 0 && done === total;
    }

    function saveStateDirect(sObj) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(sObj));
        } catch (e) {
            console.error('Failed to save state', e);
        }
    }

    function saveState() {
        saveStateDirect(state);
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
        setupSkinBeforeAfterSlider();
        setupSkincareController();
        setupCommandPalette();
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
        renderSkincareOS();
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

    function getDayOfSplit() {
        const splits = ['legs', 'push', 'pull', 'legs', 'upper', 'push', 'pull']; // Sun=0, Mon=1, Tue=2, Wed=3, Thu=4, Fri=5, Sat=6
        const dayIdx = new Date().getDay();
        return splits[dayIdx] || 'push';
    }

    function renderGymOS() {
        if (!state.gym.activeSplit) {
            state.gym.activeSplit = getDayOfSplit();
        }

        const activeSplit = state.gym.activeSplit || 'push';
        const routine = state.gym.routines[activeSplit];

        if (routine) {
            document.getElementById('active-split-badge').textContent = routine.badge;
            document.getElementById('gym-workout-title').innerHTML = `${routine.title.split('—')[0]} — <span class="gold-gradient-text">${routine.title.split('—')[1] || ''}</span>`;
            document.getElementById('target-ex-count').textContent = `${routine.exercises.length} Exercises`;

            // Calculate Progress Metrics
            let totalSets = 0;
            let completedSets = 0;
            let totalVolume = 0;

            routine.exercises.forEach(ex => {
                ex.sets.forEach(s => {
                    totalSets++;
                    if (s.completed) {
                        completedSets++;
                        totalVolume += (s.weight || 0) * (s.reps || 0);
                    }
                });
            });

            const pct = totalSets > 0 ? Math.round((completedSets / totalSets) * 100) : 0;

            // Update UI Counters
            const setsProgressEl = document.getElementById('gym-sets-progress');
            if (setsProgressEl) setsProgressEl.textContent = `${completedSets} / ${totalSets} Sets`;

            const volumeEl = document.getElementById('gym-total-volume');
            if (volumeEl) volumeEl.textContent = `${totalVolume.toLocaleString()} kg`;

            const streakEl = document.getElementById('gym-streak-val');
            if (streakEl) streakEl.textContent = `${state.user.streak || 14} Days 🔥`;

            const pctValEl = document.getElementById('workout-pct-val');
            if (pctValEl) pctValEl.textContent = `${pct}%`;

            // Update SVG Progress Ring (circumference = 440)
            const ringFill = document.getElementById('workout-progress-ring-fill');
            if (ringFill) {
                const offset = 440 - (pct / 100) * 440;
                ringFill.style.strokeDashoffset = offset;
            }

            // Hero Card Completion State
            const heroCard = document.getElementById('today-workout-hero-card');
            const statusEl = document.getElementById('workout-completion-status');
            const bannerBadge = document.getElementById('gym-status-badge');

            if (pct === 100 && totalSets > 0) {
                if (heroCard) heroCard.classList.add('hero-card-completed');
                if (statusEl) statusEl.innerHTML = '<i data-lucide="check-circle-2" class="green-text"></i> ✓ WORKOUT COMPLETED!';
                if (bannerBadge) {
                    bannerBadge.textContent = '✓ Workout Completed';
                    bannerBadge.classList.add('workout-completed-badge');
                }
            } else {
                if (heroCard) heroCard.classList.remove('hero-card-completed');
                if (statusEl) statusEl.innerHTML = '<i data-lucide="loader" class="gold-text"></i> In Progress';
                if (bannerBadge) {
                    bannerBadge.textContent = '⚡ Workout Active';
                    bannerBadge.classList.remove('workout-completed-badge');
                }
            }

            // Render Exercises
            const container = document.getElementById('exercises-container');
            if (container) {
                container.innerHTML = routine.exercises.map(ex => {
                    const allDone = ex.sets.length > 0 && ex.sets.every(s => s.completed);
                    return `
                        <div class="exercise-card glass-card ${allDone ? 'completed-ex' : ''}" data-ex-id="${ex.id}">
                            <div class="ex-card-header">
                                <div class="ex-title-group">
                                    <h4>${ex.name}</h4>
                                    <span class="task-tag">${ex.targetMuscle}</span>
                                    ${allDone ? '<span class="completion-pill" style="background:rgba(52,211,153,0.15); color:#34D399; font-weight:700;"><i data-lucide="check"></i> Exercise Complete</span>' : ''}
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
                            <div style="margin-top:10px; display:flex; justify-content:flex-end;">
                                <button class="add-set-row-btn" data-action="add-set" data-ex-id="${ex.id}">
                                    <i data-lucide="plus"></i> Add Set
                                </button>
                            </div>
                        </div>
                    `;
                }).join('');
            }
        }

        // Render Personal Records (PRs)
        const prsContainer = document.getElementById('prs-container');
        if (prsContainer && state.gym.prs) {
            prsContainer.innerHTML = state.gym.prs.map(pr => {
                const est1RM = Math.round(pr.weight * (1 + (pr.reps / 30)));
                return `
                    <div class="pr-card glass-card">
                        <div class="pr-icon-top">
                            <div class="pr-trophy-box"><i data-lucide="trophy"></i></div>
                            <span class="pr-reps-sub">${pr.reps} Reps</span>
                        </div>
                        <span class="pr-lift-name">${pr.lift}</span>
                        <span class="pr-weight-val">${pr.weight} kg</span>
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:4px;">
                            <span style="font-size:0.72rem; color:var(--text-muted);">${pr.date}</span>
                            <span style="font-size:0.72rem; color:var(--accent-gold); font-weight:700;">Est. 1RM: ${est1RM}kg</span>
                        </div>
                    </div>
                `;
            }).join('');
        }

        // Render Gym Analytics Bench 1RM
        const benchPr = state.gym.prs ? state.gym.prs.find(p => p.lift.toLowerCase().includes('bench')) : null;
        const bench1RMEl = document.getElementById('ana-bench-1rm');
        if (bench1RMEl && benchPr) {
            const est1RM = Math.round(benchPr.weight * (1 + (benchPr.reps / 30)));
            bench1RMEl.textContent = `${est1RM}.0`;
        }

        // Render Full Calendar History Grid (31 Days)
        renderCalendarGrid();

        if (window.lucide) window.lucide.createIcons();
    }

    // Render Month Interactive Workout Calendar based on Real Daily Interaction
    function renderCalendarGrid() {
        const calContainer = document.getElementById('full-calendar-grid');
        if (!calContainer) return;

        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const todayDate = now.getDate();

        const splits = ['Push A', 'Pull A', 'Rest', 'Legs A', 'Push B', 'Pull B', 'Rest'];

        let html = '';
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const historyEntry = state.dailyHistory ? state.dailyHistory[dateStr] : null;

            let statusClass = 'red';
            let splitName = splits[(day - 1) % 7];

            if (day === todayDate) {
                const completedSets = state.gym ? countCompletedGymSets(state.gym) : 0;
                const completedTasks = state.checklist ? state.checklist.filter(t => t.completed).length : 0;
                if (completedSets > 0 || completedTasks > 0) {
                    statusClass = (state.gym && isGymRoutineCompleted(state.gym)) || completedTasks >= 7 ? 'green' : 'yellow';
                } else {
                    statusClass = 'yellow';
                }
            } else if (historyEntry) {
                if (historyEntry.workoutCompleted || (historyEntry.completedTasks && historyEntry.completedTasks >= 7)) {
                    statusClass = 'green';
                } else if (historyEntry.completedTasks > 0) {
                    statusClass = 'yellow';
                }
            } else if (day < todayDate) {
                statusClass = 'red';
            } else {
                statusClass = 'upcoming';
            }

            const isToday = day === todayDate;

            html += `
                <div class="cal-cell-day ${isToday ? 'active-day' : ''}" data-date-str="${dateStr}" data-day-num="${day}" data-split="${splitName}" data-status="${statusClass}">
                    <div style="display:flex; justify-content:space-between; width:100%;">
                        <span class="cal-cell-num">${day}${isToday ? ' (Today)' : ''}</span>
                        <span class="cell-dot ${statusClass === 'upcoming' ? '' : statusClass}"></span>
                    </div>
                    <span class="cal-cell-tag" style="color: ${statusClass === 'green' ? '#34D399' : (statusClass === 'yellow' ? '#F59E0B' : (statusClass === 'upcoming' ? '#62626B' : '#EF4444'))}">
                        ${splitName}
                    </span>
                </div>
            `;
        }
        calContainer.innerHTML = html;
    }

    function countCompletedGymSets(gymObj) {
        const split = gymObj.activeSplit || 'push';
        const routine = gymObj.routines ? gymObj.routines[split] : null;
        if (!routine || !routine.exercises) return 0;
        let count = 0;
        routine.exercises.forEach(ex => {
            ex.sets.forEach(s => { if (s.completed) count++; });
        });
        return count;
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

        // Export Data Backup
        const exportBtn = document.getElementById('export-data-btn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
                const downloadAnchor = document.createElement('a');
                downloadAnchor.setAttribute("href", dataStr);
                downloadAnchor.setAttribute("download", `momentum_os_backup_${new Date().toISOString().slice(0, 10)}.json`);
                document.body.appendChild(downloadAnchor);
                downloadAnchor.click();
                downloadAnchor.remove();
                playSound('complete');
            });
        }

        // Import Data Backup
        const importBtn = document.getElementById('import-data-btn');
        const importFileInput = document.getElementById('import-file-input');
        if (importBtn && importFileInput) {
            importBtn.addEventListener('click', () => importFileInput.click());
            importFileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = (event) => {
                    try {
                        const importedState = JSON.parse(event.target.result);
                        state = { ...DEFAULT_STATE, ...importedState };
                        saveState();
                        renderAll();
                        updateChartsData();
                        playSound('complete');
                        alert('✓ Momentum OS data backup successfully imported!');
                    } catch (err) {
                        alert('Failed to parse backup JSON file.');
                    }
                };
                reader.readAsText(file);
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

        // Gym Set Completion, Add Set & Input Handler
        const exContainer = document.getElementById('exercises-container');
        if (exContainer) {
            exContainer.addEventListener('click', (e) => {
                // Add Set Row Button
                const addSetBtn = e.target.closest('[data-action="add-set"]');
                if (addSetBtn) {
                    const exId = addSetBtn.dataset.exId;
                    const activeSplit = state.gym.activeSplit || 'push';
                    const routine = state.gym.routines[activeSplit];
                    const exercise = routine ? routine.exercises.find(x => x.id === exId) : null;

                    if (exercise) {
                        const nextNum = exercise.sets.length + 1;
                        const lastSet = exercise.sets[exercise.sets.length - 1];
                        const lastWeight = lastSet ? lastSet.weight : 50;
                        const lastReps = lastSet ? lastSet.reps : 10;

                        exercise.sets.push({
                            setNum: nextNum,
                            reps: lastReps,
                            weight: lastWeight,
                            completed: false,
                            notes: ''
                        });

                        saveState();
                        renderGymOS();
                        playSound('check');
                    }
                    return;
                }

                // Toggle Set Completion Checkbox
                const toggleBox = e.target.closest('[data-action="toggle-set"]');
                if (toggleBox) {
                    const exCard = e.target.closest('.exercise-card');
                    const setRow = e.target.closest('.set-row');
                    if (!exCard || !setRow) return;

                    const exId = exCard.dataset.exId;
                    const setNum = parseInt(setRow.dataset.setNum);

                    const activeSplit = state.gym.activeSplit || 'push';
                    const routine = state.gym.routines[activeSplit];
                    const exercise = routine ? routine.exercises.find(x => x.id === exId) : null;
                    const setObj = exercise ? exercise.sets.find(s => s.setNum === setNum) : null;

                    if (setObj && exercise) {
                        setObj.completed = !setObj.completed;
                        if (setObj.completed) {
                            playSound('check');
                            addXP(75);
                            triggerRestTimer(state.gym.restTargetSec || 90);

                            // Check PR Condition
                            checkNewPRCondition(exercise.name, setObj.weight, setObj.reps);
                        }
                        saveState();
                        renderGymOS();
                        renderHero();
                    }
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

                if (setObj && exercise) {
                    if (input.classList.contains('input-reps')) {
                        setObj.reps = parseInt(input.value) || setObj.reps;
                    } else if (input.classList.contains('input-weight')) {
                        setObj.weight = parseFloat(input.value) || setObj.weight;
                    } else if (input.classList.contains('set-notes-input')) {
                        setObj.notes = input.value;
                    }
                    saveState();
                    renderGymOS();
                }
            });
        }

        // Quick Action Bar Buttons
        const startWorkoutBtn = document.getElementById('btn-start-workout');
        if (startWorkoutBtn) {
            startWorkoutBtn.addEventListener('click', () => {
                playSound('complete');
                const timerBtn = document.getElementById('btn-toggle-workout-timer');
                if (timerBtn) timerBtn.click();
            });
        }

        const quickAddExBtn = document.getElementById('btn-quick-add-ex');
        if (quickAddExBtn) {
            quickAddExBtn.addEventListener('click', () => {
                const modal = document.getElementById('add-ex-modal');
                if (modal) modal.classList.add('active');
            });
        }

        const quickHistBtn = document.getElementById('btn-quick-history');
        if (quickHistBtn) {
            quickHistBtn.addEventListener('click', () => {
                const sec = document.getElementById('history-section');
                if (sec) sec.scrollIntoView({ behavior: 'smooth' });
            });
        }

        const quickCompBtn = document.getElementById('btn-quick-compare');
        if (quickCompBtn) {
            quickCompBtn.addEventListener('click', () => {
                const sec = document.getElementById('charts-section');
                if (sec) sec.scrollIntoView({ behavior: 'smooth' });
            });
        }

        // Rest Timer Controls
        const startRestBtn = document.getElementById('btn-start-rest-timer');
        if (startRestBtn) {
            startRestBtn.addEventListener('click', () => {
                triggerRestTimer(restTimerSeconds || state.gym.restTargetSec || 90);
            });
        }

        const pauseRestBtn = document.getElementById('btn-pause-rest-timer');
        if (pauseRestBtn) {
            pauseRestBtn.addEventListener('click', () => {
                clearInterval(restTimerInterval);
                isRestTimerRunning = false;
            });
        }

        const resetRestBtn = document.getElementById('btn-reset-rest-timer');
        if (resetRestBtn) {
            resetRestBtn.addEventListener('click', () => {
                clearInterval(restTimerInterval);
                isRestTimerRunning = false;
                restTimerSeconds = state.gym.restTargetSec || 90;
                const display = document.getElementById('rest-timer-display');
                if (display) display.textContent = `${restTimerSeconds}s`;
            });
        }

        // Calendar Day Click Popup
        document.addEventListener('click', (e) => {
            const dayCell = e.target.closest('.cal-cell-day');
            if (dayCell) {
                const dayNum = dayCell.dataset.dayNum;
                const split = dayCell.dataset.split;
                const status = dayCell.dataset.status;
                const statusText = status === 'green' ? '✓ Completed (18 Sets)' : (status === 'yellow' ? '⚡ Partial Workout (8 Sets)' : '🌙 Rest & Recovery Day');
                alert(`Workout Log for Jul/Aug ${dayNum}, 2026\nStatus: ${statusText}\nSplit: ${split}\nEst. Volume: ${status === 'green' ? '14,250 kg' : '6,100 kg'}`);
            }
        });

        // Timeframe Period Buttons
        document.addEventListener('click', (e) => {
            const periodBtn = e.target.closest('.btn-period');
            if (periodBtn) {
                document.querySelectorAll('.btn-period').forEach(b => b.classList.remove('active'));
                periodBtn.classList.add('active');
                const activeTab = document.querySelector('.pr-chart-tabs .chart-tab.active');
                if (activeTab) updateStrengthChart(activeTab.dataset.prlift);
            }
        });

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

    function checkNewPRCondition(liftName, weight, reps) {
        if (!state.gym || !state.gym.prs) return;

        const liftKey = liftName.toLowerCase().split(' ')[0];
        const existing = state.gym.prs.find(p => p.lift.toLowerCase().includes(liftKey));

        if (existing && weight > existing.weight) {
            existing.weight = weight;
            existing.reps = reps;
            existing.date = 'Today';
            saveState();
            showPRToast(existing.lift, weight, reps);
        } else if (!existing && weight > 0) {
            state.gym.prs.push({ id: 'pr-' + Date.now(), lift: liftName, weight: weight, reps: reps, date: 'Today' });
            saveState();
            showPRToast(liftName, weight, reps);
        }
    }

    function showPRToast(lift, weight, reps) {
        playSound('complete');
        if (window.confetti) window.confetti({ particleCount: 150, spread: 90, origin: { y: 0.5 } });

        const toast = document.createElement('div');
        toast.className = 'pr-toast-banner';
        toast.innerHTML = `
            <div class="pr-trophy-box" style="font-size:2rem;"><i data-lucide="trophy" class="gold-text"></i></div>
            <div>
                <div class="pr-toast-title">🏆 NEW PERSONAL RECORD!</div>
                <div class="pr-toast-sub">${lift}: <strong>${weight} kg</strong> x ${reps} Reps!</div>
            </div>
        `;
        document.body.appendChild(toast);
        if (window.lucide) window.lucide.createIcons();

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.5s ease';
            setTimeout(() => toast.remove(), 500);
        }, 4000);
    }

    function setupCommandPalette() {
        const openBtn = document.getElementById('open-cmd-palette-btn');
        const modal = document.getElementById('cmd-palette-modal');
        const input = document.getElementById('cmd-search-input');
        const list = document.getElementById('cmd-results-list');

        if (!modal || !input) return;

        function openPalette() {
            modal.classList.add('active');
            input.value = '';
            filterCommands('');
            setTimeout(() => input.focus(), 50);
        }

        function closePalette() {
            modal.classList.remove('active');
        }

        if (openBtn) {
            openBtn.addEventListener('click', openPalette);
        }

        // Global Cmd+K / Ctrl+K listener
        window.addEventListener('keydown', (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                if (modal.classList.contains('active')) closePalette();
                else openPalette();
            } else if (e.key === 'Escape' && modal.classList.contains('active')) {
                closePalette();
            }
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) closePalette();
        });

        // Filter items
        input.addEventListener('input', (e) => {
            filterCommands(e.target.value.toLowerCase().trim());
        });

        function filterCommands(query) {
            const items = list.querySelectorAll('.cmd-item');
            items.forEach(item => {
                const title = item.querySelector('.cmd-item-title').textContent.toLowerCase();
                const sub = item.querySelector('.cmd-item-sub').textContent.toLowerCase();
                if (!query || title.includes(query) || sub.includes(query)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        }

        // Command Item Click Handlers
        if (list) {
            list.addEventListener('click', (e) => {
                const item = e.target.closest('.cmd-item');
                if (!item) return;
                const action = item.dataset.action;

                closePalette();

                if (action === 'nav-dash') {
                    const tab = document.querySelector('.nav-tab[data-view="dashboard"]');
                    if (tab) tab.click();
                } else if (action === 'nav-glow') {
                    const tab = document.querySelector('.nav-tab[data-view="transformation"]');
                    if (tab) tab.click();
                } else if (action === 'nav-gym') {
                    const tab = document.querySelector('.nav-tab[data-view="gym"]');
                    if (tab) tab.click();
                } else if (action === 'nav-skincare') {
                    const tab = document.querySelector('.nav-tab[data-view="skincare"]');
                    if (tab) tab.click();
                } else if (action === 'act-pr') {
                    const tab = document.querySelector('.nav-tab[data-view="gym"]');
                    if (tab) tab.click();
                    setTimeout(() => {
                        const prModal = document.getElementById('pr-modal');
                        if (prModal) prModal.classList.add('active');
                    }, 100);
                } else if (action === 'act-ex') {
                    const tab = document.querySelector('.nav-tab[data-view="gym"]');
                    if (tab) tab.click();
                    setTimeout(() => {
                        const exModal = document.getElementById('add-ex-modal');
                        if (exModal) exModal.classList.add('active');
                    }, 100);
                } else if (action === 'act-sound') {
                    const soundBtn = document.getElementById('sound-toggle-btn');
                    if (soundBtn) soundBtn.click();
                }
            });
        }
    }

    // SKINCARE OPERATING SYSTEM CONTROLLER
    function renderSkincareOS() {
        if (!state.skincare) return;

        // Render AM Steps
        const amObj = state.skincare.am || {};
        let amDone = 0, amTotal = 5;
        const amKeys = ['cleanser', 'vitc', 'niacinamide', 'moisturizer', 'sunscreen'];
        amKeys.forEach(key => {
            const stepEl = document.querySelector(`.step-item[data-step="am-${key}"]`);
            if (stepEl) {
                if (amObj[key]) {
                    stepEl.classList.add('completed-step');
                    amDone++;
                } else {
                    stepEl.classList.remove('completed-step');
                }
            }
        });

        const amPct = Math.round((amDone / amTotal) * 100);
        const amText = document.getElementById('am-pct-text');
        const amFill = document.getElementById('am-progress-fill');
        const amStatus = document.getElementById('skin-am-status');
        if (amText) amText.textContent = `${amPct}%`;
        if (amFill) amFill.style.width = `${amPct}%`;
        if (amStatus) amStatus.textContent = `${amDone} / ${amTotal} Done`;

        // Render PM Steps
        const pmObj = state.skincare.pm || {};
        let pmDone = 0, pmTotal = 4;
        const pmKeys = ['cleanser', 'serum', 'moisturizer', 'retinol'];
        pmKeys.forEach(key => {
            const stepEl = document.querySelector(`.step-item[data-step="pm-${key}"]`);
            if (stepEl) {
                if (pmObj[key]) {
                    stepEl.classList.add('completed-step');
                    pmDone++;
                } else {
                    stepEl.classList.remove('completed-step');
                }
            }
        });

        const pmPct = Math.round((pmDone / pmTotal) * 100);
        const pmText = document.getElementById('pm-pct-text');
        const pmFill = document.getElementById('pm-progress-fill');
        const pmStatus = document.getElementById('skin-pm-status');
        if (pmText) pmText.textContent = `${pmPct}%`;
        if (pmFill) pmFill.style.width = `${pmPct}%`;
        if (pmStatus) pmStatus.textContent = `${pmDone} / ${pmTotal} Done`;

        // Overall Ring Progress
        const totalDone = amDone + pmDone;
        const totalSteps = amTotal + pmTotal;
        const overallPct = Math.round((totalDone / totalSteps) * 100);

        const ringVal = document.getElementById('skin-pct-val');
        const ringFill = document.getElementById('skin-ring-fill');
        if (ringVal) ringVal.textContent = `${overallPct}%`;
        if (ringFill) {
            const circumference = 314;
            const offset = circumference - (overallPct / 100) * circumference;
            ringFill.style.strokeDashoffset = offset;
        }

        // Render Skin Metrics
        const metrics = state.skincare.metrics || { tone: 94, pigment: 'Minimal (-15%)', acne: '0 Active (Clear)', texture: 95 };
        const toneVal = document.getElementById('skin-tone-val');
        const pigmentVal = document.getElementById('skin-pigment-val');
        const acneVal = document.getElementById('skin-acne-val');
        const textureVal = document.getElementById('skin-texture-val');

        if (toneVal) toneVal.textContent = `${metrics.tone}% Radiant`;
        if (pigmentVal) pigmentVal.textContent = metrics.pigment;
        if (acneVal) acneVal.textContent = metrics.acne;
        if (textureVal) textureVal.textContent = typeof metrics.texture === 'number' ? `${metrics.texture}% Smooth` : metrics.texture;

        const barTone = document.getElementById('bar-skin-tone');
        const barPigment = document.getElementById('bar-skin-pigment');
        const barAcne = document.getElementById('bar-skin-acne');
        const barTexture = document.getElementById('bar-skin-texture');

        if (barTone) barTone.style.width = `${metrics.tone}%`;
        if (barPigment) barPigment.style.width = `85%`;
        if (barAcne) barAcne.style.width = `100%`;
        if (barTexture) barTexture.style.width = typeof metrics.texture === 'number' ? `${metrics.texture}%` : '95%';

        renderProductVanity();
    }

    function renderProductVanity() {
        const grid = document.getElementById('product-vanity-grid');
        if (!grid || !state.skincare || !state.skincare.products) return;

        let html = '';
        state.skincare.products.forEach(prod => {
            const stockColor = prod.stock > 50 ? 'green-text' : (prod.stock > 30 ? 'gold-text' : 'red-text');
            const stockBg = prod.stock > 50 ? '#34D399' : (prod.stock > 30 ? '#D4AF37' : '#EF4444');
            const isGoldTag = prod.category.includes('AM') || prod.category.includes('PM') || prod.category.includes('SUN');

            html += `
                <div class="prod-card glass-card">
                    <div class="prod-top">
                        <span class="prod-category-tag ${isGoldTag ? 'gold-tag' : ''}">${prod.category}</span>
                        <span class="pao-badge">${prod.pao}</span>
                    </div>
                    <h4 class="prod-title">${prod.name}</h4>
                    <span class="prod-brand">${prod.brand}</span>
                    <div class="prod-details-meta">
                        <span><i data-lucide="zap"></i> ${prod.ingredient}</span>
                        <span><i data-lucide="clock"></i> Active Routine Formula</span>
                    </div>
                    <div class="prod-status-row">
                        <span class="prod-status ${stockColor}">Stock: ${prod.stock}%</span>
                        <div class="prod-stock-bar"><div class="prod-stock-fill" style="width: ${prod.stock}%; background: ${stockBg};"></div></div>
                    </div>
                </div>
            `;
        });
        grid.innerHTML = html;
        if (window.lucide) window.lucide.createIcons();
    }

    function setupSkincareController() {
        // Toggle Step Click Handler
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-action="toggle-skin-step"]');
            if (!btn) return;
            const target = btn.dataset.target;
            if (!target || !state.skincare) return;

            const [period, stepKey] = target.split('-');
            if (state.skincare[period]) {
                state.skincare[period][stepKey] = !state.skincare[period][stepKey];
                saveState();
                renderSkincareOS();
                playSound('check');

                // Check 100% routine completion celebration
                const amDone = Object.values(state.skincare.am).filter(Boolean).length === 5;
                const pmDone = Object.values(state.skincare.pm).filter(Boolean).length === 4;
                if (amDone && pmDone) {
                    addXP(250);
                    if (window.confetti) window.confetti({ particleCount: 150, spread: 90, origin: { y: 0.5 } });
                }
            }
        });

        // Quick AM Complete Button
        const quickAmBtn = document.getElementById('btn-quick-am');
        if (quickAmBtn) {
            quickAmBtn.addEventListener('click', () => {
                if (!state.skincare) return;
                for (let k in state.skincare.am) state.skincare.am[k] = true;
                saveState();
                renderSkincareOS();
                playSound('complete');
            });
        }

        // Quick PM Complete Button
        const quickPmBtn = document.getElementById('btn-quick-pm');
        if (quickPmBtn) {
            quickPmBtn.addEventListener('click', () => {
                if (!state.skincare) return;
                for (let k in state.skincare.pm) state.skincare.pm[k] = true;
                saveState();
                renderSkincareOS();
                playSound('complete');
            });
        }

        // SPF 2-Hour Timer Controller
        let spfTimerSeconds = 7200;
        let spfTimerInterval = null;
        const spfTimerBtn = document.getElementById('btn-start-spf-timer');
        const spfDisplay = document.getElementById('spf-timer-display');

        if (spfTimerBtn) {
            spfTimerBtn.addEventListener('click', () => {
                if (spfTimerInterval) clearInterval(spfTimerInterval);
                spfTimerSeconds = 7200;
                updateSpfDisplay();
                playSound('check');

                spfTimerInterval = setInterval(() => {
                    if (spfTimerSeconds > 0) {
                        spfTimerSeconds--;
                        updateSpfDisplay();
                    } else {
                        clearInterval(spfTimerInterval);
                        playSound('rest-alarm');
                        alert('☀️ Sunscreen Reapplication Alert! 2 hours have elapsed.');
                    }
                }, 1000);
            });
        }

        function updateSpfDisplay() {
            if (!spfDisplay) return;
            const h = String(Math.floor(spfTimerSeconds / 3600)).padStart(2, '0');
            const m = String(Math.floor((spfTimerSeconds % 3600) / 60)).padStart(2, '0');
            const s = String(spfTimerSeconds % 60).padStart(2, '0');
            spfDisplay.textContent = `${h}:${m}:${s}`;
        }

        // Modals for Skincare Log & Add Product
        const skinModal = document.getElementById('skincare-log-modal');
        const openSkinModalBtn = document.getElementById('btn-open-skin-modal');
        const closeSkinModalBtn = document.getElementById('close-skin-modal');
        const cancelSkinModalBtn = document.getElementById('cancel-skin-modal');
        const skinForm = document.getElementById('skin-log-form');

        if (skinModal && openSkinModalBtn) {
            openSkinModalBtn.addEventListener('click', () => {
                skinModal.classList.add('active');
                if (state.skincare && state.skincare.metrics) {
                    const m = state.skincare.metrics;
                    document.getElementById('in-skin-tone').value = m.tone || 94;
                    document.getElementById('in-skin-pigment').value = m.pigment || 'Minimal (-15%)';
                    document.getElementById('in-skin-acne').value = m.acne || '0 Active (Clear)';
                    document.getElementById('in-skin-texture').value = typeof m.texture === 'number' ? m.texture : 95;
                }
            });
            [closeSkinModalBtn, cancelSkinModalBtn].forEach(btn => {
                if (btn) btn.addEventListener('click', () => skinModal.classList.remove('active'));
            });
            if (skinForm) {
                skinForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    state.skincare.metrics = {
                        tone: parseInt(document.getElementById('in-skin-tone').value) || 94,
                        pigment: document.getElementById('in-skin-pigment').value,
                        acne: document.getElementById('in-skin-acne').value,
                        texture: parseInt(document.getElementById('in-skin-texture').value) || 95
                    };
                    saveState();
                    renderSkincareOS();
                    skinModal.classList.remove('active');
                    playSound('complete');
                });
            }
        }

        // Add Product Modal
        const prodModal = document.getElementById('add-prod-modal');
        const openProdModalBtn = document.getElementById('btn-open-prod-modal');
        const openProdCollectionBtn = document.getElementById('btn-add-prod-collection');
        const closeProdModalBtn = document.getElementById('close-prod-modal');
        const cancelProdModalBtn = document.getElementById('cancel-prod-modal');
        const prodForm = document.getElementById('add-prod-form');

        if (prodModal) {
            [openProdModalBtn, openProdCollectionBtn].forEach(btn => {
                if (btn) btn.addEventListener('click', () => prodModal.classList.add('active'));
            });
            [closeProdModalBtn, cancelProdModalBtn].forEach(btn => {
                if (btn) btn.addEventListener('click', () => prodModal.classList.remove('active'));
            });
            if (prodForm) {
                prodForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const newProd = {
                        id: 'p-' + Date.now(),
                        name: document.getElementById('in-prod-name').value,
                        brand: document.getElementById('in-prod-brand').value,
                        category: document.getElementById('in-prod-category').value,
                        ingredient: document.getElementById('in-prod-ingredient').value,
                        pao: document.getElementById('in-prod-pao').value,
                        stock: 100
                    };
                    if (!state.skincare.products) state.skincare.products = [];
                    state.skincare.products.unshift(newProd);
                    saveState();
                    renderSkincareOS();
                    prodForm.reset();
                    prodModal.classList.remove('active');
                    playSound('complete');
                });
            }
        }
    }

    function setupSkinBeforeAfterSlider() {
        const container = document.getElementById('skin-slider-container');
        const afterLayer = document.getElementById('skin-after-layer');
        const handle = document.getElementById('skin-slider-handle');

        if (!container || !afterLayer || !handle) return;

        let isDragging = false;

        function updateSliderPosition(clientX) {
            const rect = container.getBoundingClientRect();
            let x = clientX - rect.left;
            if (x < 0) x = 0;
            if (x > rect.width) x = rect.width;
            const pct = (x / rect.width) * 100;

            afterLayer.style.clipPath = `polygon(${pct}% 0, 100% 0, 100% 100%, ${pct}% 100%)`;
            handle.style.left = `${pct}%`;
        }

        container.addEventListener('mousedown', (e) => {
            isDragging = true;
            updateSliderPosition(e.clientX);
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            updateSliderPosition(e.clientX);
        });

        window.addEventListener('mouseup', () => { isDragging = false; });

        container.addEventListener('touchstart', (e) => {
            isDragging = true;
            if (e.touches[0]) updateSliderPosition(e.touches[0].clientX);
        }, { passive: true });

        window.addEventListener('touchmove', (e) => {
            if (!isDragging || !e.touches[0]) return;
            updateSliderPosition(e.touches[0].clientX);
        }, { passive: true });

        window.addEventListener('touchend', () => { isDragging = false; });
    }

    function updateChartsData() {
        if (lifeChartInstance) lifeChartInstance.update();
        if (vitalsChartInstance) vitalsChartInstance.update();
        if (bodyProgressionChartInstance) bodyProgressionChartInstance.update();
        if (strengthChartInstance) strengthChartInstance.update();
    }

})();


