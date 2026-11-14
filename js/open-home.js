// Preserve links to home-page sections and avoid a redirect loop in browser history.
const storefrontHome = new URL("pages/index.html", window.location.href);
storefrontHome.search = window.location.search;
storefrontHome.hash = window.location.hash;
window.location.replace(storefrontHome);
