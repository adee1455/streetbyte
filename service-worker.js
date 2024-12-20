self.addEventListener('install', function(event) {
    // Cache static assets 
    event.waitUntil(
      caches.open('static-cache').then(cache => {
        return cache.addAll([
          '/',
          '/style.css',
          '/script.js'
        ]);
      })
    );
  });