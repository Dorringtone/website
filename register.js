import { emailError, requiredText, setUpValidation, textLength } from "./form-validation.js";
import { auth } from "./firebase-config.js";

import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/13.2.0/firebase-auth.js";

const form = document.getElementById("register-form");
const nameInput = document.getElementById("register-name");
const emailInput = document.getElementById("register-email");
const passwordInput = document.getElementById("register-password");
const confirmInput = document.getElementById("register-confirm");

const button = document.getElementById("register-button");
const status = document.getElementById("register-status");
const accountNext = document.getElementById("account-next");

let busy = false;

// Check whether the customer is already logged in.
onAuthStateChanged(
  auth,
  function (user) {
    // Registration itself also signs the customer in.
    // Let the submit handler finish its profile and email steps first.
    if (busy) {
      return;
    }

    form.hidden = Boolean(user);
    accountNext.hidden = !user;
    button.disabled = false;

    status.textContent = user
      ? "You are already logged in. You can visit your account below."
      : "";
  },
  function () {
    status.textContent =
      "The account service could not load. Please refresh and try again.";
  }
);

const validate = setUpValidation(form, new Map([
  [nameInput, requiredText("your full name", 80)],
  [emailInput, emailError],
  [passwordInput, field => {
    if (!field.value) return "Choose a password.";
    if (field.value.length < 8) return "Use at least eight characters.";
    return textLength(128)(field);
  }],
  [confirmInput, field => {
    if (!field.value) return "Enter your password again.";
    return field.value === passwordInput.value ? "" : "Your passwords do not match.";
  }]
]));

function registrationError(error) {
  switch (error.code) {
    case "auth/email-already-in-use":
      return "An account could not be created with this email. " +
        "Try logging in or resetting your password.";

    case "auth/invalid-email":
      return "Please enter a valid email address.";

    case "auth/weak-password":
    case "auth/password-does-not-meet-requirements":
      return "Please choose a stronger password that meets the account password requirements.";

    case "auth/too-many-requests":
      return "Too many attempts. Please wait a while before trying again.";

    case "auth/network-request-failed":
      return "Could not connect. Check your internet connection and try again.";

    default:
      return "Your account could not be created. Please try again.";
  }
}

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  if (busy) {
    return;
  }

  status.textContent = "";
  status.classList.remove("status-error");
  if (!validate()) return;

  busy = true;
  button.disabled = true;
  status.textContent = "Creating your account…";

  try {
    const credential = await createUserWithEmailAndPassword(
      auth,
      emailInput.value.trim(),
      passwordInput.value
    );

    // The account now exists, even if a later step fails.
    const user = credential.user;
    const fullName = nameInput.value.trim();

    form.reset();
    form.hidden = true;
    accountNext.hidden = false;

    let profileSaved = true;
    let verificationSent = true;

    try {
      await updateProfile(user, {
        displayName: fullName
      });
    } catch {
      profileSaved = false;
    }

    try {
      await sendEmailVerification(user);
    } catch {
      verificationSent = false;
    }

    const messages = [
      "Your account has been created, and you are logged in."
    ];

    if (!profileSaved) {
      messages.push(
        "Your name could not be saved, but your email and password account is ready."
      );
    }

    messages.push(
      verificationSent
        ? "A verification email has been sent. Check your inbox and spam folder, then open the verification link."
        : "The verification email could not be sent. Go to your account and select “Send verification email” to try again."
    );

    status.textContent = messages.join(" ");
  } catch (error) {
    status.textContent = registrationError(error);
  } finally {
    busy = false;
    button.disabled = false;
  }
});