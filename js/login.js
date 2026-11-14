// Handle email and password sign-in, reset links, email verification and sign-out.
import { emailError, setUpValidation } from "./form-validation.js";
import { auth } from "./firebase-config.js";

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  signOut,
  reload
} from "https://www.gstatic.com/firebasejs/13.2.0/firebase-auth.js";

const loading = document.getElementById("auth-loading");
const signedOut = document.getElementById("signed-out");
const signedIn = document.getElementById("signed-in");

const loginForm = document.getElementById("login-form");
const emailInput = document.getElementById("login-email");
const passwordInput = document.getElementById("login-password");

const status = document.getElementById("login-status");
const greeting = document.getElementById("account-greeting");
const accountEmail = document.getElementById("account-email");
const verificationStatus = document.getElementById("verification-status");

const verifyButton = document.getElementById("verify-email");
const checkButton = document.getElementById("check-verification");

const buttons = document.querySelectorAll("main button");
let busy = false;
const validate = setUpValidation(loginForm, new Map([
  [emailInput, emailError],
  [passwordInput, field => field.value ? "" : "Enter your password."]
]));

// Display a message and apply error styling only when needed.
function showMessage(message, isError = false) {
  status.classList.toggle("status-error", isError);
  status.textContent = message;
}

// Prevent repeated requests while an account action is running.
function setBusy(value) {
  busy = value;

  if (value) {
    status.classList.remove("status-error");
  }

  buttons.forEach(function (button) {
    button.disabled = value;
  });
}

function showAccount(user) {
  loading.hidden = true;
  signedOut.hidden = Boolean(user);
  signedIn.hidden = !user;

  if (!user) {
    greeting.textContent = "";
    accountEmail.textContent = "";
    verificationStatus.textContent = "";
    return;
  }

  greeting.textContent = user.displayName
    ? `Welcome, ${user.displayName}.`
    : "You are logged in.";

  accountEmail.textContent = user.email ?? "";

  verificationStatus.textContent = user.emailVerified
    ? "Your email address is verified."
    : "Your email address has not been verified yet.";

  verifyButton.hidden = user.emailVerified;
  checkButton.hidden = user.emailVerified;
}

// Give customers readable messages instead of technical error details.
function errorMessage(error) {
  switch (error.code) {
    case "auth/invalid-credential":
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/user-disabled":
      return "Check your email and password, or reset your password.";

    case "auth/invalid-email":
      return "Please enter a valid email address.";

    case "auth/too-many-requests":
      return "Too many attempts. Please wait a while before trying again.";

    case "auth/network-request-failed":
      return "Could not connect. Check your internet connection and try again.";

    default:
      return "The account request could not be completed. Please try again.";
  }
}

// Update the page when Firebase restores, starts or ends a login session.
onAuthStateChanged(
  auth,
  function (user) {
    showAccount(user);
  },
  function () {
    loading.hidden = true;

    showMessage(
      "The account service could not load. Please refresh and try again.",
      true
    );
  }
);

loginForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  if (busy) return;
  showMessage("");
  if (!validate()) return;

  setBusy(true);
  showMessage("Logging in…");

  try {
    await signInWithEmailAndPassword(
      auth,
      emailInput.value.trim(),
      passwordInput.value
    );

    passwordInput.value = "";
    document.getElementById("account-title").focus();
    showMessage("You have logged in successfully.");
  } catch (error) {
    showMessage("Login failed: " + errorMessage(error), true);
  } finally {
    setBusy(false);
  }
});

document.getElementById("reset-password").addEventListener(
  "click",
  async function () {
    if (busy) {
      return;
    }

    emailInput.value = emailInput.value.trim();

    // Resetting a password requires the email address only.
    showMessage("");
    if (!validate([emailInput])) return;

    setBusy(true);
    showMessage("Requesting a password reset email…");

    const resetMessage =
      "If an account exists for that email address, " +
      "you will receive password reset instructions. " +
      "Check your inbox and spam folder.";

    try {
      await sendPasswordResetEmail(auth, emailInput.value);
      showMessage(resetMessage);
    } catch (error) {
      // Keep the response neutral if Firebase reports an unknown email.
      if (error.code === "auth/user-not-found") {
        showMessage(resetMessage);
      } else {
        showMessage(errorMessage(error), true);
      }
    } finally {
      setBusy(false);
    }
  }
);

verifyButton.addEventListener("click", async function () {
  if (busy || !auth.currentUser) {
    return;
  }

  setBusy(true);
  showMessage("Sending verification email…");

  try {
    await sendEmailVerification(auth.currentUser);

    showMessage(
      "Verification email sent. Check your inbox and spam folder. " +
      "Open the verification link, then return here and select “Check email verification”."
    );
  } catch (error) {
    showMessage(errorMessage(error), true);
  } finally {
    setBusy(false);
  }
});

checkButton.addEventListener("click", async function () {
  if (busy || !auth.currentUser) {
    return;
  }

  setBusy(true);
  showMessage("Checking email verification…");

  try {
    await reload(auth.currentUser);
    showAccount(auth.currentUser);

    if (auth.currentUser?.emailVerified) {
      showMessage("Your email verification is confirmed.");
    } else {
      showMessage(
        "Your email is still unverified. " +
        "Open the link in your verification email first.",
        true
      );
    }
  } catch (error) {
    showMessage(errorMessage(error), true);
  } finally {
    setBusy(false);
  }
});

document.getElementById("logout-button").addEventListener(
  "click",
  async function () {
    if (busy) {
      return;
    }

    setBusy(true);
    showMessage("Logging out…");

    try {
      await signOut(auth);
      loginForm.reset();
      showAccount(null);
      emailInput.focus();
      showMessage("You have logged out.");
    } catch (error) {
      showMessage(errorMessage(error), true);
    } finally {
      setBusy(false);
    }
  }
);
