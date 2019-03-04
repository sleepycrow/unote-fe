const scope = require('config').scope;

const cacheName = "uNoteCache";
const filesToCache = [scope, scope + "index.html", scope + "js/main.bundle.js", scope + "js/vendors~main.bundle.js", scope + "js/sw.bundle.js", scope + "img/css.css", scope + "img/modernpics.otf", scope + "img/modernpics.ttf", scope + "img/textile.png"];

self.addEventListener("install", function(event){
    event.waitUntil(
        caches.open(cacheName)
        .then(function(cache){
            cache.addAll(filesToCache);
            console.log("Service worker installed.");
        })
    );
});

self.addEventListener("fetch", function(event){
    event.respondWith(
        caches.open(cacheName)
        .then(function(cache){
            return cache.match(event.request)
            .then(function(cacheResponse){
                
                let fetchPromise = fetch(event.request)
                .then(function(networkResponse){
                    if(cacheResponse)
                        cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                });

                return cacheResponse || fetchPromise;

            });
        })
    );
});