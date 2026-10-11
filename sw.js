const V='vg-v3',FILES=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(FILES.map(u=>fetch(u,{cache:'reload'}).then(r=>{if(!r.ok)throw new Error(u);return c.put(u,r)})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  const u=new URL(r.url),page=r.mode==='navigate'||u.pathname.endsWith('/index.html')||u.pathname.endsWith('/');
  if(page){
    e.respondWith(fetch(r.url,{cache:'no-cache'}).then(res=>{if(res.ok){const cp=res.clone();caches.open(V).then(c=>c.put(r.mode==='navigate'?'index.html':r,cp))}return res}).catch(()=>caches.match('index.html')));
  }else e.respondWith(caches.match(r,{ignoreSearch:true}).then(x=>x||fetch(r)));
});
