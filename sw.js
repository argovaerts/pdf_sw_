importScripts('cache-polyfill.js');

self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('pdf_embed_google_docs').then(function(cache) {
     return cache.addAll([
       '/',
       'index.html',
       'Poster-Grid-Abstract-by-Hoogspanningsnet.com_.pdf',
       'pdf.js',
       'pdf.worker.js',
       'main.js'
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
