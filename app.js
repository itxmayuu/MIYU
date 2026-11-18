// Estado global de la aplicación
const state = {
  currentScreen: 'welcome', // 'welcome' | 'chooseTopic' | 'train' | 'mood'
  ejerciciosData: null,
  selectedGroup: 'piernas',
  selectedPhase: 'calentamiento', // 'calentamiento' (Before) | 'estiramiento' (After)
  player: {
    queue: [],
    currentIndex: 0,
    totalSeconds: 30,
    remainingSeconds: 30,
    isRunning: false,
    intervalId: null,
    audioMuted: false,
    wakeLock: null
  }
};

// Configuración visual Figma por grupo muscular
const GROUP_THEMES = {
  piernas: { color: '#451cdf', art: 'assets/topics/leg.svg',    trainArt: 'assets/train/leg.svg' },
  brazos:  { color: '#8d73ee', art: 'assets/topics/arm.svg',    trainArt: 'assets/train/arm.svg' },
  pecho:   { color: '#6846e8', art: 'assets/topics/chest.svg',  trainArt: 'assets/train/chest.svg' },
  espalda: { color: '#ff6659', art: 'assets/topics/back.svg',   trainArt: 'assets/train/back.svg' },
  abdomen: { color: '#ff958c', art: 'assets/topics/abs.svg',    trainArt: 'assets/train/abs.svg' },
  cardio:  { color: '#f59d0e', art: 'assets/topics/cardio.svg', trainArt: 'assets/train/cardio.svg' }
};

// Cargar la base de datos oficial ejercicios.json de forma segura
async function loadExercisesDatabase() {
  try {
    const res = await fetch('./ejercicios.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    state.ejerciciosData = await res.json();
    console.log('✅ Base de datos cargada con éxito vía fetch');
  } catch (err) {
    console.warn('⚠️ Nota de entorno: fetch local restringido por protocolo file:// (se cargará normal bajo servidor http).');
  }
}

// Navegación fluida entre pantallas
function showScreen(screenName) {
  state.currentScreen = screenName;

  const allScreens = document.querySelectorAll('.screen');
  allScreens.forEach(s => s.classList.remove('active'));

  const screenWelcome = document.getElementById('screenWelcome');
  const screenChooseTopic = document.getElementById('screenChooseTopic');
  const screenTrain = document.getElementById('screenTrain');
  const screenMood = document.getElementById('screenMood');

  if (screenName === 'welcome' && screenWelcome) {
    screenWelcome.classList.add('active');
    document.body.style.backgroundColor = '#000000';
  } else if (screenName === 'chooseTopic' && screenChooseTopic) {
    screenChooseTopic.classList.add('active');
    document.body.style.backgroundColor = '#fefefe';
  } else if (screenName === 'train' && screenTrain) {
    screenTrain.classList.add('active');
    document.body.style.backgroundColor = '#fefefe';
  } else if (screenName === 'mood' && screenMood) {
    screenMood.classList.add('active');
    document.body.style.backgroundColor = '#09090d';
  }

  // Asegurar que el scroll empiece arriba de inmediato
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

// Obtener datos del grupo actual
function getSelectedGroupData() {
  if (!state.ejerciciosData || !Array.isArray(state.ejerciciosData.grupos)) {
    return null;
  }
  return state.ejerciciosData.grupos.find(g => g.id === state.selectedGroup) || null;
}

// Selección aleatoria de N elementos (Fisher-Yates)
function pickRandomExercises(list, count) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, Math.min(count, copy.length));
}

// Renderizar Pantalla 3 (Train) con el grupo y fase (Before/After) seleccionados
function renderTrainScreen() {
  const screenTrain = document.getElementById('screenTrain');
  const groupData = getSelectedGroupData();
  const theme = GROUP_THEMES[state.selectedGroup] || GROUP_THEMES.piernas;

  if (screenTrain) {
    screenTrain.style.setProperty('--group-theme', theme.color);
  }

  const trainGroupLabel = document.getElementById('trainGroupLabel');
  const trainTitle = document.getElementById('trainTitle');
  const trainSummary = document.getElementById('trainSummary');
  const trainHeroImg = document.getElementById('trainHeroImg');
  const trainExerciseList = document.getElementById('trainExerciseList');

  const tabBefore = document.getElementById('tabBefore');
  const tabAfter = document.getElementById('tabAfter');
  const tabIndicator = document.getElementById('trainTabIndicator');

  const isAfter = state.selectedPhase === 'estiramiento';

  if (tabBefore && tabAfter && tabIndicator) {
    tabBefore.classList.toggle('active', !isAfter);
    tabBefore.setAttribute('aria-selected', String(!isAfter));
    tabAfter.classList.toggle('active', isAfter);
    tabAfter.setAttribute('aria-selected', String(isAfter));
    tabIndicator.classList.toggle('is-after', isAfter);
  }

  if (trainHeroImg) {
    trainHeroImg.src = theme.trainArt;
  }

  if (!groupData) {
    if (trainExerciseList) {
      trainExerciseList.innerHTML = `
        <div class="exercise-item">
          <div class="exercise-name">No se pudo cargar ejercicios.json</div>
          <div class="exercise-muscle">Abre la app usando iniciar_app.bat (http://192.168.0.7:3000 o http://localhost:3000)</div>
        </div>
      `;
    }
    return;
  }

  const phaseData = groupData[state.selectedPhase];
  const exercises = (phaseData && Array.isArray(phaseData.ejercicios)) ? phaseData.ejercicios : [];

  if (trainGroupLabel) trainGroupLabel.textContent = groupData.nombre.toUpperCase();
  if (trainTitle) trainTitle.textContent = groupData.subtitulo || groupData.nombre;
  if (trainSummary) {
    const phaseLabel = isAfter ? 'Estiramiento estático' : 'Calentamiento dinámico';
    trainSummary.textContent = `${exercises.length} ejercicios disponibles · ${phaseLabel}`;
  }

  if (trainExerciseList) {
    trainExerciseList.innerHTML = '';

    exercises.forEach((ex) => {
      const seg = ex.duracionSegundos || 30;

      const item = document.createElement('div');
      item.className = 'exercise-item';
      item.innerHTML = `
        <div class="exercise-row">
          <button type="button" class="exercise-play-icon" title="Iniciar solo este ejercicio" aria-label="Iniciar ${ex.nombre}">▶</button>
          <div class="exercise-main">
            <div class="exercise-name">${ex.nombre}</div>
            <div class="exercise-muscle">${ex.musculoObjetivo || ''}</div>
          </div>
          <div class="exercise-badge">${seg} SEG</div>
        </div>
        <div class="exercise-details">
          <div class="exercise-guide-block">
            <span class="detail-tag">GUÍA</span>
            <p class="detail-text">${ex.instrucciones || ''}</p>
          </div>
          ${ex.consejo ? `
          <div class="exercise-tip-block">
            <span class="detail-tag">💡 TIP</span>
            <p class="detail-text">${ex.consejo}</p>
          </div>` : ''}
        </div>
      `;

      // Botón ▶ separado: abre Pantalla 4 con SOLO ese ejercicio
      const playBtn = item.querySelector('.exercise-play-icon');
      if (playBtn) {
        playBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          startWorkoutPlayer([ex]);
        });
      }

      // Tocar el resto de la tarjeta: selecciona e ilumina para ver Guía y Tip
      item.addEventListener('click', () => {
        const wasExpanded = item.classList.contains('expanded');
        trainExerciseList.querySelectorAll('.exercise-item.expanded').forEach(el => {
          el.classList.remove('expanded');
        });
        if (!wasExpanded) {
          item.classList.add('expanded');
        }
      });

      trainExerciseList.appendChild(item);
    });
  }
}

// ==========================================================
// MOTOR DE PANTALLA 4: MOOD / REPRODUCTOR CON TEMPORIZADOR
// ==========================================================
async function requestScreenWakeLock() {
  if ('wakeLock' in navigator && !state.player.wakeLock) {
    try {
      state.player.wakeLock = await navigator.wakeLock.request('screen');
    } catch (e) {}
  }
}

function releaseScreenWakeLock() {
  if (state.player.wakeLock) {
    try {
      state.player.wakeLock.release();
    } catch (e) {}
    state.player.wakeLock = null;
  }
}

function formatTimer(seconds) {
  const safe = Math.max(0, Math.floor(seconds));
  const mins = String(Math.floor(safe / 60)).padStart(2, '0');
  const secs = String(safe % 60).padStart(2, '0');
  return `${mins}:${secs}`;
}

function stopTimerInterval() {
  if (state.player.intervalId) {
    clearInterval(state.player.intervalId);
    state.player.intervalId = null;
  }
  state.player.isRunning = false;
}

function updateTimerUI() {
  const timerDisplay = document.getElementById('moodTimerDisplay');
  const progressFill = document.getElementById('moodProgressFill');
  const btnPlayPause = document.getElementById('btnPlayPause');

  if (timerDisplay) {
    timerDisplay.textContent = formatTimer(state.player.remainingSeconds);
  }
  if (progressFill) {
    const pct = state.player.totalSeconds > 0
      ? (state.player.remainingSeconds / state.player.totalSeconds) * 100
      : 0;
    progressFill.style.width = `${Math.max(0, Math.min(100, pct))}%`;
  }
  if (btnPlayPause) {
    btnPlayPause.innerHTML = state.player.isRunning
      ? `<svg class="mood-play-svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
           <rect x="6" y="5" width="4" height="14" rx="1.5"></rect>
           <rect x="14" y="5" width="4" height="14" rx="1.5"></rect>
         </svg>`
      : `<svg class="mood-play-svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
           <path d="M8 5.5v13l11-6.5-11-6.5z"></path>
         </svg>`;
  }
}

function loadCurrentPlayerExercise(autoAnnounce = true) {
  const { queue, currentIndex } = state.player;
  const ex = queue[currentIndex];
  if (!ex) return;

  const duration = ex.duracionSegundos || 30;
  state.player.totalSeconds = duration;
  state.player.remainingSeconds = duration;

  const stepLabel = document.getElementById('moodStepLabel');
  const phaseLabel = document.getElementById('moodPhaseLabel');
  const zoneEl = document.getElementById('moodExerciseZone');
  const titleEl = document.getElementById('moodExerciseTitle');
  const guideEl = document.getElementById('moodExerciseGuide');
  const seqNav = document.getElementById('moodSequenceNav');
  const prevBtn = document.getElementById('btnPrevExercise');
  const nextBtn = document.getElementById('btnNextExercise');

  if (stepLabel) {
    stepLabel.textContent = queue.length === 1
      ? 'EJERCICIO INDIVIDUAL'
      : `${currentIndex + 1} DE ${queue.length}`;
  }
  if (phaseLabel) {
    const isAfter = state.selectedPhase === 'estiramiento';
    phaseLabel.textContent = isAfter ? 'After · Estiramiento' : 'Before · Calentamiento';
  }
  if (zoneEl) zoneEl.textContent = ex.musculoObjetivo || 'Movilidad general';
  if (titleEl) titleEl.textContent = ex.nombre;
  if (guideEl) guideEl.textContent = ex.instrucciones || '';

  if (seqNav) {
    seqNav.style.display = queue.length > 1 ? 'flex' : 'none';
  }
  if (prevBtn) prevBtn.disabled = currentIndex === 0;
  if (nextBtn) {
    const isLast = currentIndex >= queue.length - 1;
    nextBtn.disabled = false;
    nextBtn.textContent = isLast ? 'Listo ✓' : 'Siguiente →';
    nextBtn.classList.toggle('is-finish', isLast);
  }

  updateTimerUI();

  if (autoAnnounce && !state.player.audioMuted && window.soundManager) {
    window.soundManager.speak(ex.nombre);
  }
}

function showCompletedView() {
  stopTimerInterval();
  releaseScreenWakeLock();

  const activeView = document.getElementById('moodActiveView');
  const completedView = document.getElementById('moodCompletedView');
  const doneTitle = document.getElementById('moodDoneTitle');
  const doneSub = document.getElementById('moodDoneSubtitle');

  if (activeView) activeView.style.display = 'none';
  if (completedView) completedView.style.display = 'flex';

  const isSingle = state.player.queue.length === 1;
  const isAfter = state.selectedPhase === 'estiramiento';
  if (doneTitle) {
    doneTitle.textContent = isSingle ? '¡Ejercicio completado!' : '¡Rutina completada!';
  }
  if (doneSub) {
    if (isSingle) {
      doneSub.textContent = 'Buen trabajo. Puedes repetirlo o volver a elegir otro.';
    } else {
      doneSub.textContent = isAfter
        ? 'Buen trabajo, ya puedes descansar'
        : 'Buen trabajo, ya puedes ir a entrenar';
    }
  }

  if (!state.player.audioMuted && window.soundManager) {
    window.soundManager.playComplete();
  }
}

function startTimerLoop() {
  stopTimerInterval();
  state.player.isRunning = true;
  updateTimerUI();

  state.player.intervalId = setInterval(() => {
    if (state.player.remainingSeconds > 0) {
      state.player.remainingSeconds -= 1;
      updateTimerUI();

      // Avisos sonoros en los últimos 3 segundos
      if (state.player.remainingSeconds > 0 && state.player.remainingSeconds <= 3) {
        if (!state.player.audioMuted && window.soundManager) {
          window.soundManager.playCountdown();
        }
      }

      if (state.player.remainingSeconds === 0) {
        const hasNext = state.player.currentIndex < state.player.queue.length - 1;
        if (hasNext) {
          state.player.currentIndex += 1;
          if (!state.player.audioMuted && window.soundManager) {
            window.soundManager.playNext();
          }
          loadCurrentPlayerExercise(true);
        } else {
          showCompletedView();
        }
      }
    }
  }, 1000);
}

function startWorkoutPlayer(exercisesQueue) {
  if (!exercisesQueue || exercisesQueue.length === 0) return;

  const screenMood = document.getElementById('screenMood');
  const moodArtImg = document.getElementById('moodArtImg');
  const activeView = document.getElementById('moodActiveView');
  const completedView = document.getElementById('moodCompletedView');
  const theme = GROUP_THEMES[state.selectedGroup] || GROUP_THEMES.piernas;

  if (screenMood) {
    screenMood.style.setProperty('--group-theme', theme.color);
  }
  if (moodArtImg) {
    moodArtImg.src = theme.trainArt;
  }
  if (activeView) activeView.style.display = 'flex';
  if (completedView) completedView.style.display = 'none';

  state.player.queue = exercisesQueue;
  state.player.currentIndex = 0;

  if (window.soundManager && !state.player.audioMuted) {
    window.soundManager.init();
  }

  requestScreenWakeLock();
  showScreen('mood');
  loadCurrentPlayerExercise(true);
  startTimerLoop();
}

// Inicializar eventos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', async () => {
  const btnGetStarted = document.getElementById('btnGetStarted');
  const btnBackToWelcome = document.getElementById('btnBackToWelcome');
  const btnBackToTopics = document.getElementById('btnBackToTopics');
  const btnStartRoutine = document.getElementById('btnStartRoutine');
  const tabBefore = document.getElementById('tabBefore');
  const tabAfter = document.getElementById('tabAfter');
  const workoutCards = document.querySelectorAll('.workout-card');

  // Controles de Pantalla 4 (Mood)
  const btnExitMood = document.getElementById('btnExitMood');
  const btnToggleAudio = document.getElementById('btnToggleAudio');
  const btnMinus15 = document.getElementById('btnMinus15');
  const btnPlayPause = document.getElementById('btnPlayPause');
  const btnPlus15 = document.getElementById('btnPlus15');
  const btnPrevExercise = document.getElementById('btnPrevExercise');
  const btnNextExercise = document.getElementById('btnNextExercise');
  const btnRepeatRoutine = document.getElementById('btnRepeatRoutine');
  const btnDoneBackToTrain = document.getElementById('btnDoneBackToTrain');

  await loadExercisesDatabase();

  if (btnGetStarted) {
    btnGetStarted.addEventListener('click', (e) => {
      e.preventDefault();
      showScreen('chooseTopic');
    });
  }

  if (btnBackToWelcome) {
    btnBackToWelcome.addEventListener('click', (e) => {
      e.preventDefault();
      showScreen('welcome');
    });
  }

  if (btnBackToTopics) {
    btnBackToTopics.addEventListener('click', (e) => {
      e.preventDefault();
      showScreen('chooseTopic');
    });
  }

  // Click en tarjetas de entrenamiento -> Abre Pantalla 3 (Train)
  workoutCards.forEach((card) => {
    card.addEventListener('click', async () => {
      const groupId = card.getAttribute('data-group-id');
      state.selectedGroup = groupId;
      state.selectedPhase = 'calentamiento';

      if ('vibrate' in navigator) {
        try { navigator.vibrate(25); } catch (e) {}
      }

      if (!state.ejerciciosData) {
        await loadExercisesDatabase();
      }

      renderTrainScreen();
      showScreen('train');
    });
  });

  // Cambio de pestañas Before / After
  [tabBefore, tabAfter].forEach((tab) => {
    if (!tab) return;
    tab.addEventListener('click', () => {
      const phase = tab.getAttribute('data-phase');
      if (phase && phase !== state.selectedPhase) {
        state.selectedPhase = phase;
        renderTrainScreen();
      }
    });
  });

  // Botón START ROUTINE: selecciona exactamente 5 ejercicios aleatorios de la fase actual
  if (btnStartRoutine) {
    btnStartRoutine.addEventListener('click', () => {
      const groupData = getSelectedGroupData();
      const phaseData = groupData ? groupData[state.selectedPhase] : null;
      const allExercises = (phaseData && Array.isArray(phaseData.ejercicios)) ? phaseData.ejercicios : [];

      if (allExercises.length === 0) return;

      const selectedFive = pickRandomExercises(allExercises, 5);
      startWorkoutPlayer(selectedFive);
    });
  }

  // Eventos del reproductor (Pantalla 4)
  if (btnExitMood) {
    btnExitMood.addEventListener('click', () => {
      stopTimerInterval();
      releaseScreenWakeLock();
      if (window.speechSynthesis) {
        try { window.speechSynthesis.cancel(); } catch (e) {}
      }
      showScreen('train');
    });
  }

  if (btnToggleAudio) {
    btnToggleAudio.addEventListener('click', () => {
      state.player.audioMuted = !state.player.audioMuted;
      btnToggleAudio.textContent = state.player.audioMuted ? '🔇' : '🔊';
      if (window.soundManager) {
        window.soundManager.soundEnabled = !state.player.audioMuted;
        window.soundManager.speechEnabled = !state.player.audioMuted;
      }
      if (state.player.audioMuted && window.speechSynthesis) {
        try { window.speechSynthesis.cancel(); } catch (e) {}
      }
    });
  }

  if (btnPlayPause) {
    btnPlayPause.addEventListener('click', () => {
      if (state.player.isRunning) {
        stopTimerInterval();
        updateTimerUI();
      } else {
        startTimerLoop();
      }
    });
  }

  if (btnMinus15) {
    btnMinus15.addEventListener('click', () => {
      state.player.remainingSeconds = Math.max(5, state.player.remainingSeconds - 15);
      updateTimerUI();
    });
  }

  if (btnPlus15) {
    btnPlus15.addEventListener('click', () => {
      state.player.remainingSeconds += 15;
      if (state.player.remainingSeconds > state.player.totalSeconds) {
        state.player.totalSeconds = state.player.remainingSeconds;
      }
      updateTimerUI();
    });
  }

  if (btnPrevExercise) {
    btnPrevExercise.addEventListener('click', () => {
      if (state.player.currentIndex > 0) {
        state.player.currentIndex -= 1;
        loadCurrentPlayerExercise(true);
        if (state.player.isRunning) startTimerLoop();
      }
    });
  }

  if (btnNextExercise) {
    btnNextExercise.addEventListener('click', () => {
      if (state.player.currentIndex < state.player.queue.length - 1) {
        state.player.currentIndex += 1;
        loadCurrentPlayerExercise(true);
        if (state.player.isRunning) startTimerLoop();
      } else {
        showCompletedView();
      }
    });
  }

  if (btnRepeatRoutine) {
    btnRepeatRoutine.addEventListener('click', () => {
      startWorkoutPlayer([...state.player.queue]);
    });
  }

  if (btnDoneBackToTrain) {
    btnDoneBackToTrain.addEventListener('click', () => {
      stopTimerInterval();
      releaseScreenWakeLock();
      showScreen('train');
    });
  }
});

// Registro de Service Worker para PWA Offline (solo activo bajo protocolo http/https)
if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch((err) => {
      console.log('SW registration note:', err);
    });
  });
}
