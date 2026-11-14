const loginPage = document.getElementById("login-form");
const status = document.getElementById(loginPage ? "login-status" : "register-status");

try {
  if (loginPage) await import("./login.js");
  else await import("./register.js");
} catch {
  const loading = document.getElementById("auth-loading");
  if (loading) loading.hidden = true;
  status.classList.add("status-error");
  status.textContent =
    "The account service could not load. Check your internet connection and refresh.";
}
