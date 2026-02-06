const CACHE_NAME = "speedtv-v2";
const API_BASE = "https://speedtv.x44bet.com";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./player-pc.html",
  "./player-mobile.html",
  "./manifest.json",
  "./css/styles.css",
  "./js/api.js",
  "./js/player.js"
];

// Instalar service worker
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE).catch(err => {
        console.log('Cache addAll failed:', err);
      });
    })
  );
  self.skipWaiting();
});

// Ativar service worker
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Interceptar requisições
self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);
  
  // Não cachear requisições da API
  if (url.hostname === new URL(API_BASE).hostname) {
    event.respondWith(
      fetch(event.request).catch(() => {
        // Se falhar, retornar erro
        return new Response(JSON.stringify({ error: "Offline" }), {
          status: 503,
          headers: { "Content-Type": "application/json" }
        });
      })
    );
    return;
  }

  // Para outros recursos, usar cache com fallback para network
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).then(fetchResponse => {
        // Cachear apenas recursos estáticos
        if (event.request.method === 'GET' && 
            (event.request.url.endsWith('.html') || 
             event.request.url.endsWith('.css') || 
             event.request.url.endsWith('.js') ||
             event.request.url.endsWith('.json'))) {
          const responseToCache = fetchResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }
        return fetchResponse;
      }).catch(() => {
        // Se offline e não tiver no cache, retornar página offline básica
        if (event.request.destination === 'document') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
