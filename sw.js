importScripts('cache-polyfill.min.js');

self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('pdf_embed').then(function(cache) {
     return cache.addAll([
       '/',
       'index.html',
       'sample-3pp.pdf',
       'pdf.js',
       'pdf.worker.js',
       'main.min.js',
       'style.min.css'
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
