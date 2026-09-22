const CACHE_NAME = 'obrin-ia-cache-v1';
const urlsToCache = [
  './',
  './demo.html',
  './manifest.json'
];

// Al instalar, guardamos los archivos estáticos y forzamos a que el nuevo Service Worker tome el control inmediatamente
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
            .then(() => self.skipWaiting())
    );
});

// Al activarse, borramos cualquier caché antiguo que haya quedado "pegado"
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});

// Estrategia "Network First": Siempre pide los datos nuevos al servidor.
// Si el cliente no tiene internet, entonces le muestra la versión guardada en caché.
self.addEventListener('fetch', (event) => {
    // Excluir peticiones de la API y de Firebase del caché
    if (event.request.url.includes('firestore.googleapis.com') || 
        event.request.url.includes('workers.dev')) {
        return;
    }

    event.respondWith(
        fetch(event.request)
            .then((response) => {
                // Si la red responde bien, guardamos una copia fresca en el caché
                const responseClone = response.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseClone);
                });
                return response;
            })
            .catch(() => {
                // Si falla la red (sin internet), buscamos la versión guardada
                return caches.match(event.request);
            })
    );
});
