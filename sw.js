const CACHE_NAME = 'miyu-app-v4';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './audio.js',
  './ejercicios.json',
  './manifest.json',
  './assets/miyu/apple-touch-icon.png',
  './assets/miyu/miyu-icon.svg',
  './assets/miyu/miyu-welcome.svg',
  './assets/topics/leg.svg',
  './assets/topics/arm.svg',
  './assets/topics/chest.svg',
  './assets/topics/back.svg',
  './assets/topics/abs.svg',
  './assets/topics/cardio.svg',
  './assets/train/leg.svg',
  './assets/train/arm.svg',
  './assets/train/chest.svg',
  './assets/train/back.svg',
  './assets/train/abs.svg',
  './assets/train/cardio.svg'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Estrategia Network-First: siempre trae mejoras nuevas si hay internet y funciona offline en el gym
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then((networkRes) => {
        if (networkRes && networkRes.status === 200) {
          const clone = networkRes.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
        }
        return networkRes;
      })
      .catch(() => caches.match(e.request).then((res) => res || caches.match('./index.html')))
  );
});
