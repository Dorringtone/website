// Prepare a WhatsApp enquiry with the visitor’s preferred reply method.
import { emailError, requiredText, setUpValidation, textLength } from "./form-validation.js";

const enquiryForm = document.getElementById("enquiry-form");
const enquiryName = document.getElementById("enquiry-name");
const enquiryLocation = document.getElementById("enquiry-location");
const enquiryMessage = document.getElementById("enquiry-message");
const enquiryStatus = document.getElementById("enquiry-status");

const replyPhone = document.getElementById("reply-phone");
const replyEmail = document.getElementById("reply-email");
const phoneGroup = document.getElementById("reply-phone-group");
const emailGroup = document.getElementById("reply-email-group");

// Show and require only the relevant reply contact field.
function updateReplyFields() {
  const method = enquiryForm.querySelector(
    'input[name="contact-method"]:checked'
  ).value;

  const useEmail = method === "Email";

  emailGroup.hidden = !useEmail;
  replyEmail.disabled = !useEmail;
  replyEmail.required = useEmail;

  phoneGroup.hidden = useEmail;
  replyPhone.disabled = useEmail;
  replyPhone.required = !useEmail;
}

enquiryForm.querySelectorAll(
  'input[name="contact-method"]'
).forEach(function (radio) {
  radio.addEventListener("change", updateReplyFields);
});

updateReplyFields();

const validate = setUpValidation(enquiryForm, new Map([
  [enquiryName, requiredText("your name", 80)],
  [enquiryLocation, textLength(160)],
  [replyPhone, field => {
    if (!field.value.trim()) return "Enter your phone number.";
    return field.validity.patternMismatch
      ? "Enter a Kenyan phone number such as 0712345678 or +254712345678, without spaces."
      : "";
  }],
  [replyEmail, emailError],
  [enquiryMessage, requiredText("your message", 1000)]
]));

// The form prepares a message for the visitor to review and send in WhatsApp.
enquiryForm.addEventListener("submit", function (event) {
  event.preventDefault();
  enquiryStatus.textContent = "";

  if (!validate()) return;

  const preferredMethod = enquiryForm.querySelector(
    'input[name="contact-method"]:checked'
  ).value;

  const replyDetails = preferredMethod === "Email"
    ? replyEmail.value.trim()
    : replyPhone.value.trim();

  const message = [
    "Hello Mama Mboga Fresh, I have an enquiry:",
    "",
    `Name: ${enquiryName.value.trim()}`,
    `Location: ${enquiryLocation.value.trim() || "Not provided"}`,
    `Preferred reply method: ${preferredMethod}`,
    `Reply contact: ${replyDetails}`,
    "",
    enquiryMessage.value.trim()
  ].join("\n");

  const url =
    "https://wa.me/254755559107?text=" +
    encodeURIComponent(message);

  window.open(url, "_blank", "noopener,noreferrer");

  enquiryStatus.textContent =
    "WhatsApp was requested in a new tab. " +
    "If it did not open, allow pop-ups and try again. " +
    "Review the message and press Send in WhatsApp.";
});

document.getElementById("enquiry-button").disabled = false;
