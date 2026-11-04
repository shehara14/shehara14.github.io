(() => {
  const { pathname, search, hash } = window.location;
  const cleanPath = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  if (cleanPath === "/shehara" && hash) {
    window.history.replaceState(window.history.state, "", cleanPath + search);
  } else if (cleanPath !== pathname) {
    window.history.replaceState(window.history.state, "", cleanPath + search + hash);
  }
})();
