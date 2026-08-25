/* Serviceworker: legt die App im Gerätespeicher ab, damit sie ohne Netz startet.
   Version bei jeder neuen Fassung hochzählen, sonst behalten die Geräte die alte. */
const VERSION = "mondtal-v28";
const DATEIEN = ["./", "./index.html", "./manifest.webmanifest",
                 "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png", "./favicon-64.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(DATEIEN)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

/* Erst aus dem Netz, bei Fehlschlag aus dem Speicher: so kommen Updates an, offline läuft es trotzdem. */
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request)
      .then(r => { const copia = r.clone(); caches.open(VERSION).then(c => c.put(e.request, copia)); return r; })
      .catch(() => caches.match(e.request).then(r => r || caches.match("./index.html")))
  );
});
