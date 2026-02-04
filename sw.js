const cacheName = 'ongc-v3'; // <--- Increment this every time you update code
const assets = ['./', './index.html', './style.css', './app.js', './data.js', './manifest.json'];

self.addEventListener('install', e => {
    self.skipWaiting(); // Forces the waiting service worker to become active
    e.waitUntil(caches.open(cacheName).then(cache => cache.addAll(assets)));
});

self.addEventListener('activate', e => {
    // Clean up old caches
    e.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => { if (key !== cacheName) return caches.delete(key); })
        ))
    );
});

self.addEventListener('fetch', e => {
    e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});
