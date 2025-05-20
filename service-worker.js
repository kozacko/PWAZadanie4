const CACHE_NAME = "app-cache-v4";

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll([
                "/",
                "/index.html",
                "/form.html",
                "/api.html",
                "/styles.css",
                "/app.js"
            ]);
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
