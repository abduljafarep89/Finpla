// Bump BUILD on every release (and the ?v= numbers in index.html) so phones fetch the new files.
const BUILD = '1';
const C = 'fp3-v' + BUILD;
const FILES = ['./', 'index.html', 'style.css', 'app.js', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'icon-512-maskable.png', 'apple-touch-icon.png', 'favicon.png',
  'fonts/poppins-400.woff', 'fonts/poppins-500.woff', 'fonts/poppins-700.woff', 'fonts/lora-400.woff', 'fonts/lora-700.woff'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(C).then(c => Promise.allSettled(FILES.map(u => c.add(u).catch(() => {})))).then(() => self.skipWaiting()));
});
// Only ever touches FinPlan's own caches (fp3-*), never Fintrak's.
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('fp3-') && k !== C).map(k => caches.delete(k)))).then(() => clients.claim()));
});
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== location.origin) return;
  e.respondWith(caches.match(r, { ignoreSearch: true }).then(cached => {
    const net = fetch(r).then(res => {
      if (res && res.status === 200) { const copy = res.clone(); caches.open(C).then(c => c.put(r, copy)); }
      return res;
    }).catch(() => cached || (r.mode === 'navigate' ? caches.match('index.html') : undefined));
    return cached || net;
  }));
});
