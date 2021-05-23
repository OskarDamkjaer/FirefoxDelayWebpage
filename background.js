const registered = [];

//@ts-ignore, author of types hasn't updated yet
browser.permissions.onAdded.addListener((permissions) => {
  if (permissions.origins) {
    permissions.origins.forEach((origin) => {
      const handle = browser.contentScripts.register({
        matches: [origin],
        js: [{ file: "./delay.js" }],
        runAt: "document_start",
      });
      registered.push([origin, handle]);
    });
  }
});

//@ts-ignore, author of types hasn't updated yet
browser.permissions.onRemoved.addListener((permissions) => {
  const removedOrigins = permissions.origins;
  if (removedOrigins) {
    registered.forEach(([origin, handle]) => {
      if (removedOrigins.includes(origin)) {
        handle.then((r) => r.unregister());
      }
    });
  }
});
