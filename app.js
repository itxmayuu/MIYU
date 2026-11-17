// Estado global de la aplicación
const state = {
  currentScreen: 'welcome', // 'welcome' | 'chooseTopic'
  ejerciciosData: null,
  selectedGroup: null
};

// Elementos del DOM
const screenWelcome = document.getElementById('screenWelcome');
const screenChooseTopic = document.getElementById('screenChooseTopic');
const btnGetStarted = document.getElementById('btnGetStarted');
const btnBackToWelcome = document.getElementById('btnBackToWelcome');
const workoutCards = document.querySelectorAll('.workout-card');

// Cargar la base de datos oficial ejercicios.json
async function loadExercisesDatabase() {
  try {
    const res = await fetch('./ejercicios.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    state.ejerciciosData = await res.json();
    console.log('✅ Base de datos cargada con éxito:', state.ejerciciosData);
  } catch (err) {
    console.warn('⚠️ No se pudo cargar ejercicios.json vía fetch, usando fallback:', err);
  }
}

// Navegación entre pantallas
function showScreen(screenName) {
  state.currentScreen = screenName;

  screenWelcome.classList.remove('active');
  screenChooseTopic.classList.remove('active');

  if (screenName === 'welcome') {
    screenWelcome.classList.add('active');
    document.body.style.backgroundColor = '#000000';
  } else if (screenName === 'chooseTopic') {
    screenChooseTopic.classList.add('active');
    document.body.style.backgroundColor = '#fefefe';
  }

  // Scroll arriba
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Event Listeners
btnGetStarted.addEventListener('click', () => {
  showScreen('chooseTopic');
});

btnBackToWelcome.addEventListener('click', () => {
  showScreen('welcome');
});

// Click en tarjetas de entrenamiento
workoutCards.forEach((card) => {
  card.addEventListener('click', () => {
    const groupId = card.getAttribute('data-group-id');
    state.selectedGroup = groupId;
    console.log(`🏋️ Seleccionaste el grupo: ${groupId}`);
    
    // Feedback táctil suave si el dispositivo lo soporta
    if ('vibrate' in navigator) {
      try { navigator.vibrate(30); } catch (e) {}
    }

    // Aquí se conectará en el siguiente paso la Pantalla 3 (Train / Lista de ejercicios)
    alert(`Has seleccionado: ${card.querySelector('.card-title').textContent}. ¡En el siguiente paso conectaremos la Pantalla 3 (Train) con sus 15 dinámicos y 15 estáticos!`);
  });
});

// Registro de Service Worker para PWA Offline
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch((err) => {
      console.log('SW registration note:', err);
    });
  });
}

// Inicialización
loadExercisesDatabase();
