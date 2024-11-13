const CACHE_NAME = 'fortnite-cosmetics-v1';

self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('fortnite-api.com')) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          const fetchPromise = fetch(event.request).then((networkResponse) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
          return response || fetchPromise;
        });
      })
    );
  }
}); 