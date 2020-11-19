const CACHE_NAME = 'cinejump-v01';
const CACHE_FILES = [
    '/index.html',
    '/main.js',
    '/bundle.js',
    '/src/assets/Logo-white.svg'
];

self.addEventListener('install', (evt) => {
    evt.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Cache opened');
                return cache.addAll(CACHE_FILES);
            })
    )
});

self.addEventListener('fetch', (evt) => {
    evt.respondWith(caches.match(evt.request)
        .then((response) => {
            const isOnline = navigator.onLine;

            if (response && !isOnline) {
                return response;
            } else {
                return fetch(evt.request)
                    .then((response) => {
                        let responseClone = response.clone();

                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(evt.request, responseClone);
                            });

                        return response;
                    });
            }
        })
    );
});
