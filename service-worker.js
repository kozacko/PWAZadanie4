const CACHE_NAME = "app-cache-v4";

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open("app-cache-v4").then((cache) => {
            return Promise.all(
                ["/", "/index.html", "/form.html", "/api.html", "/styles.css", "/app.js"].map(url => 
                    cache.add(url).catch(error => console.error(`❌ Błąd cache dla ${url}:`, error))
                )
            );
        })
    );
});


self.addEventListener("fetch", (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return new Response("Brak internetu. Nie można pobrać danych.", {
                status: 503,
                headers: { "Content-Type": "text/plain" }
            });
        })
    );
});
