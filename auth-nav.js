import { auth } from "./firebase-config.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/13.2.0/firebase-auth.js";

const accountLink = document.querySelector(
  'nav[aria-label="Main navigation"] a[href="log-in.html"]'
);

if (accountLink) {
  onAuthStateChanged(auth, function (user) {
    if (user) {
      const firstName = user.displayName
        ?.trim()
        .split(/\s+/)[0];

      accountLink.textContent = firstName
        ? `Account: ${firstName}`
        : "My account";

      accountLink.setAttribute(
        "aria-label",
        "Your account — currently logged in"
      );
    } else {
      accountLink.textContent = "Log in";
      accountLink.removeAttribute("aria-label");
    }
  });
}