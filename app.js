// Estado global de la aplicación
const state = {
  currentScreen: 'welcome', // 'welcome' | 'chooseTopic'
  ejerciciosData: null,
  selectedGroup: null
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

  const screenWelcome = document.getElementById('screenWelcome');
  const screenChooseTopic = document.getElementById('screenChooseTopic');

  if (!screenWelcome || !screenChooseTopic) return;

  screenWelcome.classList.remove('active');
  screenChooseTopic.classList.remove('active');

  if (screenName === 'welcome') {
    screenWelcome.classList.add('active');
    document.body.style.backgroundColor = '#000000';
  } else if (screenName === 'chooseTopic') {
    screenChooseTopic.classList.add('active');
    document.body.style.backgroundColor = '#fefefe';
  }

  // Desplazar arriba suavemente
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Inicializar eventos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  const btnGetStarted = document.getElementById('btnGetStarted');
  const btnBackToWelcome = document.getElementById('btnBackToWelcome');
  const workoutCards = document.querySelectorAll('.workout-card');

  if (btnGetStarted) {
    btnGetStarted.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('🔘 Clic en GET STARTED');
      showScreen('chooseTopic');
    });
  }

  if (btnBackToWelcome) {
    btnBackToWelcome.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('🔘 Clic en Volver');
      showScreen('welcome');
    });
  }

  // Click en tarjetas de entrenamiento
  workoutCards.forEach((card) => {
    card.addEventListener('click', () => {
      const groupId = card.getAttribute('data-group-id');
      const cardTitle = card.querySelector('.card-title')?.textContent || groupId;
      state.selectedGroup = groupId;
      console.log(`🏋️ Seleccionaste el grupo: ${groupId}`);
      
      if ('vibrate' in navigator) {
        try { navigator.vibrate(30); } catch (e) {}
      }

      alert(`Has seleccionado: ${cardTitle}.\n\n¡En el siguiente paso conectaremos la Pantalla 3 (Train) con sus 15 dinámicos y 15 estáticos!`);
    });
  });

  // Intentar cargar la base de datos
  loadExercisesDatabase();
});

// Registro de Service Worker para PWA Offline (solo activo bajo protocolo http/https)
if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch((err) => {
      console.log('SW registration note:', err);
    });
  });
}
