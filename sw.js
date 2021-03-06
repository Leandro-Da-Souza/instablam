let CACHE_STATIC_NAME = 'static-v24';
let CACHE_DYNAMIC_NAME = 'dynamic-v1';

self.addEventListener('install', (event) => {
    console.log('Service Worker Installed');
    caches.open(CACHE_STATIC_NAME).then((cache) => {
        cache.addAll([
            '/',
            '/index.html',
            '/offline.html',
            '/css/css.css',
            '/js/js.js',
            '/img/security-camera-64x64.png',
            '/img/security-camera-128x128.png',
            '/img/security-camera-256x256.png',
            'https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:ital,wght@0,300;0,700;1,300&display=swap',
        ]);
    });
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker Activated');
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(
                keyList.map((key) => {
                    if (
                        key !== CACHE_STATIC_NAME &&
                        key !== CACHE_DYNAMIC_NAME
                    ) {
                        console.log('[Service Worker] Removing Old Cache', key);
                        caches.delete(key);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    console.log('Service Worker Fetch');
    event.respondWith(
        caches.match(event.request).then((res) => {
            if (res) {
                return res;
            } else {
                return fetch(event.request)
                    .then((response) => {
                        return caches.open(CACHE_DYNAMIC_NAME).then((cache) => {
                            cache.put(event.request.url, response.clone());
                            return response;
                        });
                    })
                    .catch((err) => {
                        return caches.open(CACHE_STATIC_NAME).then((cache) => {
                            return cache.match('/offline.html');
                        });
                    });
            }
        })
    );
});
