importScripts('cache-polyfill.js');

self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('pdf_embed').then(function(cache) {
     return cache.addAll([
       '/',
       'index.html',
       'sample-3pp.pdf',
       'pdf.js',
       'pdf.worker.js',
       'main.js',
       'style.css'
     ]);
   })
 );
});

self.addEventListener('fetch', function(event) {
 console.log(event.request.url);

 event.respondWith(
   caches.match(event.request).then(function(response) {
     return response || fetch(event.request);
   })
 );
});
