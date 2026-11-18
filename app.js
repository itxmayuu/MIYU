// Estado global de la aplicación
const state = {
  currentScreen: 'welcome', // 'welcome' | 'chooseTopic' | 'train'
  ejerciciosData: null,
  selectedGroup: 'piernas',
  selectedPhase: 'calentamiento' // 'calentamiento' (Before) | 'estiramiento' (After)
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

  if (screenName === 'welcome' && screenWelcome) {
    screenWelcome.classList.add('active');
    document.body.style.backgroundColor = '#000000';
  } else if (screenName === 'chooseTopic' && screenChooseTopic) {
    screenChooseTopic.classList.add('active');
    document.body.style.backgroundColor = '#fefefe';
  } else if (screenName === 'train' && screenTrain) {
    screenTrain.classList.add('active');
    document.body.style.backgroundColor = '#fefefe';
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
  const trainPhaseDesc = document.getElementById('trainPhaseDesc');
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
  if (trainPhaseDesc) {
    trainPhaseDesc.textContent = groupData.descripcion || '';
  }

  if (trainExerciseList) {
    trainExerciseList.innerHTML = '';

    exercises.forEach((ex, index) => {
      const num = String(index + 1).padStart(2, '0');
      const seg = ex.duracionSegundos || 30;

      const item = document.createElement('div');
      item.className = 'exercise-item';
      item.innerHTML = `
        <div class="exercise-row">
          <div class="exercise-num">${num}</div>
          <div class="exercise-main">
            <div class="exercise-name">${ex.nombre}</div>
            <div class="exercise-muscle">${ex.musculoObjetivo || ''}</div>
          </div>
          <div class="exercise-badge">${seg} SEG</div>
        </div>
        <div class="exercise-details">
          <div>${ex.instrucciones || ''}</div>
          <div class="exercise-detail-tip">
            <strong>Meta:</strong> ${ex.repsOTiempo || `${seg}s`}<br>
            <strong>Tip:</strong> ${ex.consejo || ''}
          </div>
        </div>
      `;

      item.addEventListener('click', () => {
        item.classList.toggle('expanded');
      });

      trainExerciseList.appendChild(item);
    });
  }
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

  // Cargar la base de datos al iniciar
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
      state.selectedPhase = 'calentamiento'; // Siempre inicia en Before

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

  // Botón START ROUTINE (listo para conectar la Pantalla 4: Reproductor con temporizador)
  if (btnStartRoutine) {
    btnStartRoutine.addEventListener('click', () => {
      const groupData = getSelectedGroupData();
      const phaseName = state.selectedPhase === 'estiramiento' ? 'After (Estiramiento)' : 'Before (Calentamiento)';
      const title = groupData ? groupData.subtitulo : state.selectedGroup;
      alert(`🚀 ¡Listo para iniciar ${title} — ${phaseName}!\n\nEn el siguiente paso conectaremos la Pantalla 4 (Reproductor guiado con temporizador y audio).`);
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
