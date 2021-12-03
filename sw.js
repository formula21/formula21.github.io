// const OFFLINE_URL = '/offline.html';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {return cache.addAll([]);})
  );
});

self.addEventListener('activate', (event) => {
    console.log('👷', 'activate', event);
    return self.clients.claim();
});
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            // Cache hit - return response
            if (response) {
                return response;
            }
            return fetch(event.request).then(
                function(response) {
                    // Check if we received a valid response
                    if (!response || response.status !==
                        200 || response.type !== 'basic') {
                        return response;
                    }
                    return response;
                }
            ).catch(
                // () => caches.match(OFFLINE_URL));
                (e) => console.log(e));
        })
    );
});
