import { ROUTINES_DATA } from './data.js';
import { sounds } from './audio.js';

// Estado global de la aplicación
const state = {
  activeMode: 'warmup', // 'warmup' (dinámico) o 'cooldown' (estático)
  routines: ROUTINES_DATA,
  settings: {
    speech: true,
    sound: true,
    warmupDuration: 30,
    cooldownDuration: 35,
    transitionDuration: 5
  },
  player: {
    active: false,
    routine: null,
    exercises: [],
    currentIndex: 0,
    timeLeft: 0,
    totalDuration: 0,
    isPaused: false,
    isTransition: false,
    timerId: null,
    wakeLock: null
  }
};

// Cargar ajustes guardados de localStorage si existen
function loadSavedSettings() {
  try {
    const saved = localStorage.getItem('gymwarm_settings');
    if (saved) {
      state.settings = { ...state.settings, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.warn("Error loading settings:", e);
  }
  sounds.speechEnabled = state.settings.speech;
  sounds.soundEnabled = state.settings.sound;
}

function saveSettings() {
  try {
    localStorage.setItem('gymwarm_settings', JSON.stringify(state.settings));
  } catch (e) {}
}

// Elementos del DOM
const tabWarmup = document.getElementById('tabWarmup');
const tabCooldown = document.getElementById('tabCooldown');
const modeBanner = document.getElementById('modeBanner');
const bannerBadge = document.getElementById('bannerBadge');
const bannerText = document.getElementById('bannerText');
const routinesContainer = document.getElementById('routinesContainer');

// Player DOM
const playerModal = document.getElementById('playerModal');
const playerCloseBtn = document.getElementById('playerCloseBtn');
const playerMuteBtn = document.getElementById('playerMuteBtn');
const playerRoutineName = document.getElementById('playerRoutineName');
const playerRoutineMode = document.getElementById('playerRoutineMode');
const playerProgressFill = document.getElementById('playerProgressFill');
const playerStepLabel = document.getElementById('playerStepLabel');
const playerExerciseTitle = document.getElementById('playerExerciseTitle');
const playerTargetBadge = document.getElementById('playerTargetBadge');
const timerProgressCircle = document.getElementById('timerProgressCircle');
const playerTimerSeconds = document.getElementById('playerTimerSeconds');
const playerTimerUnit = document.getElementById('playerTimerUnit');
const playerRepsLabel = document.getElementById('playerRepsLabel');
const playerExerciseDetail = document.getElementById('playerExerciseDetail');
const playerExerciseTip = document.getElementById('playerExerciseTip');
const playerUpNext = document.getElementById('playerUpNext');
const playerPrevBtn = document.getElementById('playerPrevBtn');
const playerPlayPauseBtn = document.getElementById('playerPlayPauseBtn');
const playerNextBtn = document.getElementById('playerNextBtn');

// Settings DOM
const btnSettings = document.getElementById('btnSettings');
const settingsModal = document.getElementById('settingsModal');
const settingsCloseBtn = document.getElementById('settingsCloseBtn');
const toggleSpeech = document.getElementById('toggleSpeech');
const toggleSound = document.getElementById('toggleSound');
const selectWarmupDuration = document.getElementById('selectWarmupDuration');
const selectCooldownDuration = document.getElementById('selectCooldownDuration');
const selectTransitionDuration = document.getElementById('selectTransitionDuration');

const CIRCUMFERENCE = 597; // 2 * PI * 95

// Renderizar tarjetas de rutinas
function renderRoutines() {
  routinesContainer.innerHTML = '';

  state.routines.forEach((routine) => {
    const section = routine[state.activeMode];
    const isWarmup = state.activeMode === 'warmup';
    const totalTimeEst = Math.round((section.exercises.length * (isWarmup ? state.settings.warmupDuration : state.settings.cooldownDuration)) / 60);

    const card = document.createElement('div');
    card.className = 'routine-card';
    card.style.borderColor = `${routine.color}25`;

    card.innerHTML = `
      <div class="card-header" data-id="${routine.id}">
        <div class="card-main-info">
          <div class="card-icon" style="background: ${routine.color}15; border-color: ${routine.color}35;">
            ${routine.icon}
          </div>
          <div class="card-text">
            <h3>${routine.name}</h3>
            <p>${routine.subtitle}</p>
          </div>
        </div>
        <div class="card-meta">
          <span class="meta-pill">~${totalTimeEst} min</span>
          <button class="btn-start" data-start-id="${routine.id}">
            ▶ Iniciar
          </button>
          <button class="btn-expand" data-expand-id="${routine.id}" title="Ver ejercicios">
            ▼
          </button>
        </div>
      </div>
      
      <div class="card-details" id="details-${routine.id}">
        <p class="routine-desc">${routine.description}</p>
        <div class="exercise-list">
          ${section.exercises.map((ex, idx) => `
            <div class="exercise-item">
              <span class="exercise-num">${idx + 1}</span>
              <div class="exercise-info">
                <h4>${ex.name}</h4>
                <p>${ex.detail}</p>
                <span class="target-badge">🎯 ${ex.target}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // Eventos
    const startBtn = card.querySelector(`[data-start-id="${routine.id}"]`);
    startBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      startWorkout(routine);
    });

    const header = card.querySelector('.card-header');
    const details = card.querySelector(`#details-${routine.id}`);
    const expandBtn = card.querySelector(`[data-expand-id="${routine.id}"]`);

    header.addEventListener('click', () => {
      const isVisible = details.classList.contains('visible');
      details.classList.toggle('visible');
      expandBtn.classList.toggle('expanded', !isVisible);
    });

    routinesContainer.appendChild(card);
  });
}

// Cambiar entre modo Calentamiento y Estiramiento
function setMode(newMode) {
  state.activeMode = newMode;
  if (newMode === 'warmup') {
    tabWarmup.classList.add('active');
    tabCooldown.classList.remove('active');
    bannerBadge.textContent = 'DINÁMICO';
    bannerBadge.style.color = '#f97316';
    bannerBadge.style.background = 'rgba(249, 115, 22, 0.2)';
    bannerText.textContent = `${state.settings.warmupDuration}s o 15 reps por ejercicio. Activa la articulación y prepara el SNC.`;
  } else {
    tabCooldown.classList.add('active');
    tabWarmup.classList.remove('active');
    bannerBadge.textContent = 'ESTÁTICO';
    bannerBadge.style.color = '#38bdf8';
    bannerBadge.style.background = 'rgba(56, 189, 248, 0.2)';
    bannerText.textContent = `${state.settings.cooldownDuration}s por ejercicio. Vuelta a la calma, descomprime fascias y relaja.`;
  }
  renderRoutines();
}

// INICIAR WORKOUT PLAYER
async function startWorkout(routine) {
  sounds.init();
  const section = routine[state.activeMode];
  state.player.routine = routine;
  state.player.exercises = section.exercises;
  state.player.currentIndex = 0;
  state.player.isPaused = false;
  state.player.isTransition = false;
  state.player.active = true;

  playerRoutineName.textContent = routine.name;
  playerRoutineMode.textContent = state.activeMode === 'warmup' ? 'Calentamiento Dinámico' : 'Estiramiento Estático';

  // WakeLock: mantener la pantalla del iPhone encendida
  requestWakeLock();

  playerModal.classList.add('active');
  setupCurrentExercise();
}

// Solicitar Wake Lock para que el iPhone no bloquee la pantalla en el gym
async function requestWakeLock() {
  if ('wakeLock' in navigator) {
    try {
      state.player.wakeLock = await navigator.wakeLock.request('screen');
    } catch (err) {
      console.warn("WakeLock error:", err);
    }
  }
}

function releaseWakeLock() {
  if (state.player.wakeLock) {
    try {
      state.player.wakeLock.release();
    } catch (e) {}
    state.player.wakeLock = null;
  }
}

// Configurar el ejercicio actual en el player
function setupCurrentExercise() {
  clearInterval(state.player.timerId);

  const ex = state.player.exercises[state.player.currentIndex];
  const isWarmup = state.activeMode === 'warmup';
  const duration = isWarmup ? state.settings.warmupDuration : state.settings.cooldownDuration;

  state.player.totalDuration = duration;
  state.player.timeLeft = duration;
  state.player.isTransition = false;

  // Actualizar textos UI
  playerStepLabel.textContent = `Ejercicio ${state.player.currentIndex + 1} de ${state.player.exercises.length}`;
  playerExerciseTitle.textContent = ex.name;
  playerTargetBadge.textContent = `🎯 ${ex.target}`;
  playerExerciseDetail.textContent = ex.detail;
  playerExerciseTip.innerHTML = `<span class="tip-strong">Tip:</span> ${ex.tip}`;
  playerRepsLabel.textContent = ex.repsOrTime;

  // Próximo ejercicio
  const nextEx = state.player.exercises[state.player.currentIndex + 1];
  if (nextEx) {
    playerUpNext.innerHTML = `Siguiente: <strong>${nextEx.name}</strong>`;
    playerUpNext.style.display = 'block';
  } else {
    playerUpNext.innerHTML = `🏁 <strong>Último ejercicio de la rutina</strong>`;
  }

  // Barra de progreso general
  const progressPct = ((state.player.currentIndex) / state.player.exercises.length) * 100;
  playerProgressFill.style.width = `${progressPct}%`;

  // Actualizar temporizador
  updateTimerDisplay();

  // Reproducir sonido y hablar
  sounds.playNext();
  sounds.speak(ex.name);

  // Iniciar cuenta regresiva
  runTimer();
}

function runTimer() {
  clearInterval(state.player.timerId);
  playerPlayPauseBtn.textContent = '⏸';

  state.player.timerId = setInterval(() => {
    if (state.player.isPaused) return;

    state.player.timeLeft -= 1;
    updateTimerDisplay();

    // Sonido a los 3, 2, 1
    if (state.player.timeLeft <= 3 && state.player.timeLeft > 0) {
      sounds.playCountdown();
    }

    if (state.player.timeLeft <= 0) {
      clearInterval(state.player.timerId);
      handleExerciseFinished();
    }
  }, 1000);
}

function updateTimerDisplay() {
  playerTimerSeconds.textContent = state.player.timeLeft;
  const ratio = state.player.timeLeft / state.player.totalDuration;
  const offset = CIRCUMFERENCE * (1 - ratio);
  timerProgressCircle.style.strokeDashoffset = offset;
}

// Cuando termina un ejercicio
function handleExerciseFinished() {
  const hasNext = state.player.currentIndex < state.player.exercises.length - 1;

  if (hasNext) {
    if (state.settings.transitionDuration > 0 && !state.player.isTransition) {
      // Iniciar transición breve
      state.player.isTransition = true;
      state.player.totalDuration = state.settings.transitionDuration;
      state.player.timeLeft = state.settings.transitionDuration;
      
      const nextEx = state.player.exercises[state.player.currentIndex + 1];
      playerStepLabel.textContent = "Prepárate";
      playerExerciseTitle.textContent = `Acomódate: ${nextEx.name}`;
      playerTimerUnit.textContent = "cambio de postura";
      playerRepsLabel.textContent = "Respira y prepárate";
      sounds.speak("Cambio de postura");

      runTimer();
    } else {
      state.player.currentIndex += 1;
      playerTimerUnit.textContent = "segundos";
      setupCurrentExercise();
    }
  } else {
    // ¡Rutina completada!
    completeWorkout();
  }
}

function completeWorkout() {
  clearInterval(state.player.timerId);
  playerProgressFill.style.width = `100%`;
  sounds.playComplete();
  sounds.speak("Rutina completada. ¡Excelente trabajo!");

  playerStepLabel.textContent = "¡Completado!";
  playerExerciseTitle.textContent = "🎉 ¡Misión Cumplida!";
  playerTargetBadge.textContent = "Rutina finalizada con éxito";
  playerExerciseDetail.textContent = state.activeMode === 'warmup' 
    ? "Tus articulaciones y músculos están listos para dar el 100% en las pesas."
    : "Has facilitado la recuperación muscular y reducido el dolor post-entreno.";
  playerExerciseTip.innerHTML = `<span class="tip-strong">Excelente:</span> Mantente hidratado y a romperla en el gimnasio.`;
  playerTimerSeconds.textContent = "✓";
  playerTimerUnit.textContent = "listo";
  playerRepsLabel.textContent = "";
  playerUpNext.style.display = 'none';

  playerPlayPauseBtn.textContent = '✓';
  setTimeout(() => {
    closePlayer();
  }, 4500);
}

function closePlayer() {
  clearInterval(state.player.timerId);
  releaseWakeLock();
  state.player.active = false;
  playerModal.classList.remove('active');
}

function togglePlayPause() {
  state.player.isPaused = !state.player.isPaused;
  playerPlayPauseBtn.textContent = state.player.isPaused ? '▶' : '⏸';
  if (!state.player.isPaused) {
    sounds.init();
  }
}

function prevExercise() {
  if (state.player.currentIndex > 0) {
    state.player.currentIndex -= 1;
    setupCurrentExercise();
  }
}

function nextExercise() {
  if (state.player.currentIndex < state.player.exercises.length - 1) {
    state.player.currentIndex += 1;
    setupCurrentExercise();
  } else {
    completeWorkout();
  }
}

// EVENT LISTENERS
tabWarmup.addEventListener('click', () => setMode('warmup'));
tabCooldown.addEventListener('click', () => setMode('cooldown'));

playerCloseBtn.addEventListener('click', closePlayer);
playerPlayPauseBtn.addEventListener('click', togglePlayPause);
playerPrevBtn.addEventListener('click', prevExercise);
playerNextBtn.addEventListener('click', nextExercise);

playerMuteBtn.addEventListener('click', () => {
  sounds.soundEnabled = !sounds.soundEnabled;
  sounds.speechEnabled = sounds.soundEnabled;
  playerMuteBtn.textContent = sounds.soundEnabled ? '🔊' : '🔇';
});

// Settings Events
btnSettings.addEventListener('click', () => {
  toggleSpeech.checked = state.settings.speech;
  toggleSound.checked = state.settings.sound;
  selectWarmupDuration.value = state.settings.warmupDuration;
  selectCooldownDuration.value = state.settings.cooldownDuration;
  selectTransitionDuration.value = state.settings.transitionDuration;
  settingsModal.classList.add('active');
});

settingsCloseBtn.addEventListener('click', () => {
  settingsModal.classList.remove('active');
});

settingsModal.addEventListener('click', (e) => {
  if (e.target === settingsModal) {
    settingsModal.classList.remove('active');
  }
});

toggleSpeech.addEventListener('change', (e) => {
  state.settings.speech = e.target.checked;
  sounds.speechEnabled = e.target.checked;
  saveSettings();
});

toggleSound.addEventListener('change', (e) => {
  state.settings.sound = e.target.checked;
  sounds.soundEnabled = e.target.checked;
  saveSettings();
});

selectWarmupDuration.addEventListener('change', (e) => {
  state.settings.warmupDuration = parseInt(e.target.value, 10);
  saveSettings();
  renderRoutines();
});

selectCooldownDuration.addEventListener('change', (e) => {
  state.settings.cooldownDuration = parseInt(e.target.value, 10);
  saveSettings();
  renderRoutines();
});

selectTransitionDuration.addEventListener('change', (e) => {
  state.settings.transitionDuration = parseInt(e.target.value, 10);
  saveSettings();
});

// Registro de Service Worker para funcionamiento Offline
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch((err) => {
      console.log('SW registration note:', err);
    });
  });
}

// Inicialización
loadSavedSettings();
renderRoutines();
