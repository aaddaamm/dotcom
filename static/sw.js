// Simple service worker for caching static assets
const CACHE_NAME = 'adamrobinson-v1';
const urlsToCache = [
  '/',
  '/fonts/Inter-VariableFont_slnt,wght.woff2',
  '/icon.svg',
  '/logo-dark.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});