const cacheName='v1';

const cacheAssests = [
	"../../css/style.css",
	"images/about.svg",
	"images/grow.svg",
"../"
	
	// '/views/image.hbs',
	// '/views/index.hbs'
];
self.addEventListener('install',e=>{
    console.log("SW: Install");
    e.waitUntil(
        caches
        .open(cacheName)
        .then(cache=>{
            
            cache.addAll(cacheAssests);
        })
        .then(()=>self.skipWaiting())
    );
});

self.addEventListener("activate", e => {
    console.log("SW: Activated");
    e.waitUntil(
        caches.keys().then(cacheNames=>{
            return Promise.all(
                cacheNames.map(cache=>{
                    if(cache!==cacheName){
                        console.log(`clearing old cache`);
                        return caches.delete(cache);
                    }
                })
            )
        })
    )
});

self.addEventListener('fetch',e=>{
    console.log("featching service worker");
    e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));
})