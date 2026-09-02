self.addEventListener("install", event => {
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("push", event => {
  let dados = {};

  try {
    dados = event.data ? event.data.json() : {};
  } catch (e) {
    dados = {};
  }

  const titulo = dados.title || "💰 Meta de R$ 100 mil";
  const opcoes = {
    body: dados.body || "🔔 Não esqueça do seu depósito de hoje: R$ 75,75.",
    icon: "./icon-192.png",
    badge: "./icon-192.png"
  };

  event.waitUntil(
    self.registration.showNotification(titulo, opcoes)
  );
});

self.addEventListener("notificationclick", event => {
  event.notification.close();

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true })
      .then(clientes => {
        for (const cliente of clientes) {
          if ("focus" in cliente) {
            return cliente.focus();
          }
        }

        if (self.clients.openWindow) {
          return self.clients.openWindow("./");
        }
      })
  );
});
