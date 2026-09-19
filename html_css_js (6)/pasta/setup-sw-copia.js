const CACHE_NAME = 'setup-dashboard-v1';
const urlsToCache = [
  '/',
    '/setup-dashboard.html',
      '/setup-dashboard.css',
        '/setup-dashboard.js',
          '/manifest.json',
          ];

          // ===== INSTALL =====
          self.addEventListener('install', event => {
            event.waitUntil(
                caches.open(CACHE_NAME).then(cache => {
                      console.log('✅ Cache criado');
                            return cache.addAll(urlsToCache).catch(err => {
                                    console.log('⚠️ Alguns arquivos não foram cacheados:', err);
                                          });
                                              })
                                                );
                                                  self.skipWaiting();
                                                  });

                                                  // ===== ACTIVATE =====
                                                  self.addEventListener('activate', event => {
                                                    event.waitUntil(
                                                        caches.keys().then(cacheNames => {
                                                              return Promise.all(
                                                                      cacheNames.map(cacheName => {
                                                                                if (cacheName !== CACHE_NAME) {
                                                                                            console.log('🗑️ Cache antigo deletado:', cacheName);
                                                                                                        return caches.delete(cacheName);
                                                                                                                  }
                                                                                                                          })
                                                                                                                                );
                                                                                                                                    })
                                                                                                                                      );
                                                                                                                                        self.clients.claim();
                                                                                                                                        });

                                                                                                                                        // ===== FETCH =====
                                                                                                                                        self.addEventListener('fetch', event => {
                                                                                                                                          event.respondWith(
                                                                                                                                              caches.match(event.request).then(response => {
                                                                                                                                                    if (response) {
                                                                                                                                                            return response;
                                                                                                                                                                  }

                                                                                                                                                                        return fetch(event.request).then(response => {
                                                                                                                                                                                if (!response || response.status !== 200 || response.type !== 'basic') {
                                                                                                                                                                                          return response;
                                                                                                                                                                                                  }

                                                                                                                                                                                                          const responseToCache = response.clone();
                                                                                                                                                                                                                  caches.open(CACHE_NAME).then(cache => {
                                                                                                                                                                                                                            cache.put(event.request, responseToCache);
                                                                                                                                                                                                                                    });

                                                                                                                                                                                                                                            return response;
                                                                                                                                                                                                                                                  }).catch(() => {
                                                                                                                                                                                                                                                          return caches.match('/setup-dashboard.html');
                                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                                    })
                                                                                                                                                                                                                                                                      );
                                                                                                                                                                                                                                                                      });
                                                                                                                                                                                                                                                                      