/* SUMAMOS Plan de acogida · funcionamiento sin conexión
   Solo atiende a la página del protocolo: no afecta a las demás guías de la carpeta GUIAS. */
const CACHE = 'sumamos-plan-acogida-v8';
const PAGE = './b1-proto-incorporacion-curso.html';
const FILES = [PAGE, './b1-proto-incorporacion-curso.webmanifest', './b1-proto-incorporacion-curso-icon-192.png', './b1-proto-incorporacion-curso-icon-512.png', './b1-proto-incorporacion-curso-icon-maskable-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x.startsWith('sumamos-plan-acogida') && x !== CACHE).map(x => caches.delete(x)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const u = new URL(e.request.url);
  if (!u.pathname.includes('b1-proto-incorporacion-curso')) return;
  e.respondWith(fetch(e.request).then(r => { const cp = r.clone(); caches.open(CACHE).then(c => c.put(e.request, cp)).catch(() => {}); return r; })
    .catch(() => caches.match(e.request, { ignoreSearch: true }).then(r => r || caches.match(PAGE))));
});
