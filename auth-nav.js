const accountLink = document.querySelector('#main-menu a[href="log-in.html"]');

// Keep the account link and guest shopping available when Firebase cannot load.
try {
  const [{ auth }, { onAuthStateChanged }] = await Promise.all([
    import("./firebase-config.js"),
    import("https://www.gstatic.com/firebasejs/13.2.0/firebase-auth.js")
  ]);
  onAuthStateChanged(auth, (user) => {
    const firstName = user?.displayName?.trim().split(/\s+/)[0];
    accountLink.textContent = firstName ? `Account: ${firstName}` : user ? "My account" : "Log in";
  }, () => {});
} catch {
  // The original navigation label stays visible.
}
